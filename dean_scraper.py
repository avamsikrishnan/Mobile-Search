#!/usr/bin/env python3
"""Automatic dean contact scraper from university names."""

from __future__ import annotations

import argparse
import base64
import csv
import json
import re
import sys
import time
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Iterable
from urllib.parse import parse_qs, quote_plus, urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

REQUEST_TIMEOUT = 12
MAX_TEXT_CHARS = 400_000
# Search providers sometimes return bot challenge pages for modern browser UAs.
# A minimal UA string is often more stable for server-side scraping workflows.
DEFAULT_USER_AGENT = "Mozilla/5.0"

EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
DEAN_KEYWORD_RE = re.compile(
    r"\b(dean|interim dean|acting dean|associate dean|vice dean)\b", re.IGNORECASE
)
NAME_AFTER_DEAN_RE = re.compile(
    r"(?i)\bdean(?: of [^,:;\n]+)?\s*[:\-\u2013]?\s*"
    r"((?:Dr\.?|Prof\.?)?\s*[A-Z][A-Za-z'`.-]+(?:\s+[A-Z][A-Za-z'`.-]+){1,3})"
)
NAME_BEFORE_DEAN_RE = re.compile(
    r"(?i)\b((?:Dr\.?|Prof\.?)?\s*[A-Z][A-Za-z'`.-]+(?:\s+[A-Z][A-Za-z'`.-]+){1,3})"
    r"\s*,?\s*(?:is\s+)?(?:the\s+)?(?:interim\s+|acting\s+|associate\s+|vice\s+)?dean\b"
)
ADDRESS_RE = re.compile(
    r"\b(?:\d{1,6}\s+[A-Za-z0-9][A-Za-z0-9.,'#\-/ ]{3,90}\s+"
    r"(?:Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way|Court|Ct|Circle|Cir|Terrace|Ter|Place|Pl)\b"
    r"[A-Za-z0-9.,'#\-/ ]{0,60})",
    re.IGNORECASE,
)
PO_BOX_RE = re.compile(r"\bP\.?\s*O\.?\s*Box\s+\d+\b", re.IGNORECASE)

UNWANTED_HOMEPAGE_DOMAINS = {
    "wikipedia.org",
    "linkedin.com",
    "facebook.com",
    "instagram.com",
    "youtube.com",
    "x.com",
    "twitter.com",
    "usnews.com",
    "niche.com",
}
PRIORITY_LINK_TERMS = (
    "dean",
    "leadership",
    "administration",
    "directory",
    "contact",
    "governance",
    "provost",
    "president",
)
STOPWORDS_FOR_NAME = {
    "office",
    "university",
    "college",
    "school",
    "campus",
    "department",
    "faculty",
    "interim",
    "acting",
    "associate",
    "vice",
    "dean",
    "the",
    "url",
    "source",
    "title",
}


@dataclass
class DeanContact:
    name: str | None = None
    title: str | None = None
    email: str | None = None
    address: str | None = None
    source_url: str | None = None


@dataclass
class UniversityResult:
    university: str
    homepage: str | None = None
    contacts: list[DeanContact] = field(default_factory=list)
    scanned_pages: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


class DeanScraper:
    def __init__(
        self,
        max_pages: int = 20,
        max_search_results: int = 8,
        delay_seconds: float = 0.4,
        allow_proxy_fallback: bool = True,
        verbose: bool = False,
    ) -> None:
        self.max_pages = max_pages
        self.max_search_results = max_search_results
        self.delay_seconds = delay_seconds
        self.allow_proxy_fallback = allow_proxy_fallback
        self.verbose = verbose
        self.session = requests.Session()
        self.session.headers.update({"User-Agent": DEFAULT_USER_AGENT})

    def _log(self, message: str) -> None:
        if self.verbose:
            print(message, file=sys.stderr)

    def _safe_get(self, url: str) -> str | None:
        self._log(f"GET {url}")
        host = urlparse(url).netloc.lower().replace("www.", "")
        should_proxy_fallback = (
            self.allow_proxy_fallback
            and not host.endswith("bing.com")
            and not host.endswith("duckduckgo.com")
            and not url.startswith("https://r.jina.ai/")
        )
        try:
            response = self.session.get(url, timeout=REQUEST_TIMEOUT)
            if response.status_code >= 400:
                if should_proxy_fallback and response.status_code in {401, 403, 406, 429}:
                    return self._safe_get_via_proxy(url)
                return None
            response.encoding = response.encoding or "utf-8"
            return response.text[:MAX_TEXT_CHARS]
        except requests.RequestException:
            if should_proxy_fallback:
                return self._safe_get_via_proxy(url)
            return None

    def _safe_get_via_proxy(self, url: str) -> str | None:
        proxy_url = f"https://r.jina.ai/{url}"
        self._log(f"GET {proxy_url}")
        try:
            response = self.session.get(proxy_url, timeout=REQUEST_TIMEOUT + 8)
            if response.status_code >= 400:
                return None
            response.encoding = response.encoding or "utf-8"
            return response.text[:MAX_TEXT_CHARS]
        except requests.RequestException:
            return None

    @staticmethod
    def _normalize_url(url: str) -> str:
        parsed = urlparse(url)
        normalized = parsed._replace(fragment="")
        return normalized.geturl().rstrip("/")

    @staticmethod
    def _same_domain(url_a: str, url_b: str) -> bool:
        host_a = urlparse(url_a).netloc.lower().replace("www.", "")
        host_b = urlparse(url_b).netloc.lower().replace("www.", "")
        return host_a == host_b or host_a.endswith(f".{host_b}") or host_b.endswith(f".{host_a}")

    @staticmethod
    def _is_unwanted_domain(url: str) -> bool:
        host = urlparse(url).netloc.lower().replace("www.", "")
        return any(host.endswith(domain) for domain in UNWANTED_HOMEPAGE_DOMAINS)

    def search_web(self, query: str, limit: int | None = None) -> list[str]:
        """Search with provider fallbacks and return canonical URLs."""
        result_limit = limit if limit is not None else self.max_search_results
        urls = self._search_duckduckgo(query, result_limit)
        if not urls:
            urls = self._search_bing(query, result_limit)
        time.sleep(self.delay_seconds)
        return urls

    def _search_duckduckgo(self, query: str, limit: int) -> list[str]:
        search_url = f"https://duckduckgo.com/html/?q={quote_plus(query)}"
        html = self._safe_get(search_url)
        if not html:
            return []

        soup = BeautifulSoup(html, "html.parser")
        urls: list[str] = []
        for link in soup.select("a.result__a"):
            href = link.get("href")
            if not href:
                continue
            cleaned = self._extract_redirect_target(href)
            if cleaned:
                urls.append(cleaned)
            if len(urls) >= limit:
                break
        return list(dict.fromkeys(urls))

    def _search_bing(self, query: str, limit: int) -> list[str]:
        search_url = f"https://www.bing.com/search?q={quote_plus(query)}"
        html = self._safe_get(search_url)
        if not html:
            return []

        soup = BeautifulSoup(html, "html.parser")
        urls: list[str] = []
        for link in soup.select("li.b_algo h2 a"):
            href = link.get("href")
            if not href:
                continue
            cleaned = self._extract_redirect_target(href)
            if cleaned and not self._is_search_engine_internal(cleaned):
                urls.append(cleaned)
            if len(urls) >= limit:
                break

        # Fallback: extract from all anchors because Bing markup differs by locale/query.
        if len(urls) < limit:
            for link in soup.select("a[href]"):
                href = link.get("href")
                if not href:
                    continue
                cleaned = self._extract_redirect_target(href)
                if not cleaned or self._is_search_engine_internal(cleaned):
                    continue
                urls.append(cleaned)
                if len(urls) >= limit:
                    break
        return list(dict.fromkeys(urls))

    @staticmethod
    def _is_search_engine_internal(url: str) -> bool:
        host = urlparse(url).netloc.lower().replace("www.", "")
        return host.endswith("bing.com") or host.endswith("duckduckgo.com")

    @staticmethod
    def _extract_redirect_target(url: str) -> str | None:
        parsed = urlparse(url)
        if parsed.netloc and parsed.scheme in {"http", "https"}:
            if parsed.netloc.lower().endswith("bing.com") and parsed.path.startswith("/ck/"):
                query = parse_qs(parsed.query)
                maybe_encoded = query.get("u", [None])[0]
                if maybe_encoded and maybe_encoded.startswith("a1"):
                    encoded_target = maybe_encoded[2:]
                    padding = "=" * (-len(encoded_target) % 4)
                    try:
                        decoded = base64.b64decode(encoded_target + padding).decode("utf-8")
                    except (ValueError, UnicodeDecodeError):
                        decoded = None
                    if decoded and urlparse(decoded).scheme in {"http", "https"}:
                        return decoded
            return url

        if parsed.path.startswith("/l/"):
            query = parse_qs(parsed.query)
            uddg = query.get("uddg", [None])[0]
            if uddg:
                decoded = unquote(uddg)
                if urlparse(decoded).scheme in {"http", "https"}:
                    return decoded

        return None

    @staticmethod
    def _score_homepage_candidate(url: str, university_name: str) -> int:
        tokens = [token.lower() for token in re.findall(r"[A-Za-z]+", university_name)]
        parsed = urlparse(url)
        host = parsed.netloc.lower()
        path = parsed.path.lower()

        score = 0
        if parsed.scheme == "https":
            score += 8
        if path in {"", "/"}:
            score += 12
        if ".edu" in host:
            score += 30
        if "ac." in host:
            score += 18

        score += sum(8 for token in tokens if token and token in host)
        score += sum(2 for token in tokens if token and token in path)

        if DeanScraper._is_unwanted_domain(url):
            score -= 50
        if any(x in host for x in ("news", "rankings", "admissions")):
            score -= 8

        return score

    def discover_homepage(self, university_name: str) -> str | None:
        queries = [
            f"{university_name} official website",
            f"{university_name} university",
            university_name,
        ]
        candidates: dict[str, int] = {}
        for query in queries:
            for url in self.search_web(query):
                normalized = self._normalize_url(url)
                if self._is_unwanted_domain(normalized):
                    continue
                candidates[normalized] = max(
                    candidates.get(normalized, -999),
                    self._score_homepage_candidate(normalized, university_name),
                )

        if not candidates:
            return None
        return max(candidates.items(), key=lambda item: item[1])[0]

    def discover_candidate_pages(self, homepage: str, university_name: str) -> list[str]:
        urls: list[str] = [homepage]
        seen: set[str] = set(urls)
        parsed_home = urlparse(homepage)
        root = f"{parsed_home.scheme}://{parsed_home.netloc}"

        html = self._safe_get(homepage)
        dynamic_link_cap = max(6, self.max_pages // 2)
        if html:
            soup = BeautifulSoup(html, "html.parser")
            for link in soup.select("a[href]"):
                href = link.get("href", "").strip()
                if not href:
                    continue
                full = self._normalize_url(urljoin(homepage, href))
                if not self._same_domain(homepage, full):
                    continue
                lowered = full.lower()
                if any(term in lowered for term in PRIORITY_LINK_TERMS):
                    if full not in seen:
                        urls.append(full)
                        seen.add(full)
                if len(urls) >= dynamic_link_cap:
                    break

        sitemap_links = self._discover_sitemap_links(root)
        for sitemap_link in sitemap_links:
            normalized = self._normalize_url(sitemap_link)
            if normalized in seen or not self._same_domain(homepage, normalized):
                continue
            lowered = normalized.lower()
            if any(term in lowered for term in PRIORITY_LINK_TERMS):
                urls.append(normalized)
                seen.add(normalized)
            if len(urls) >= self.max_pages:
                break

        host = parsed_home.netloc.replace("www.", "")
        for query in (
            f"site:{host} dean",
            f"site:{host} \"dean\" \"email\"",
            f"site:{host} \"office of the dean\"",
            f"site:{host} \"dean\" \"contact\"",
            f"{university_name} dean contact",
        ):
            for found in self.search_web(query):
                normalized = self._normalize_url(found)
                if self._same_domain(homepage, normalized) and normalized not in seen:
                    urls.append(normalized)
                    seen.add(normalized)
                if len(urls) >= self.max_pages:
                    break
            if len(urls) >= self.max_pages:
                break

        seeded_paths = [
            "/leadership",
            "/administration",
            "/directory",
            "/dean",
            "/contact",
            "/about",
            "/office-of-the-dean",
            "/schools",
        ]
        for path in seeded_paths:
            full = self._normalize_url(urljoin(root, path))
            if full not in seen:
                urls.append(full)
                seen.add(full)
            if len(urls) >= self.max_pages:
                break

        return urls[: self.max_pages]

    def _discover_sitemap_links(self, root_url: str) -> list[str]:
        robots_url = f"{root_url.rstrip('/')}/robots.txt"
        robots = self._safe_get(robots_url)
        sitemaps: list[str] = []
        if robots:
            for line in robots.splitlines():
                if line.lower().startswith("sitemap:"):
                    sitemap_url = line.split(":", 1)[1].strip()
                    if sitemap_url.startswith("http"):
                        sitemaps.append(sitemap_url)

        if not sitemaps:
            sitemaps = [f"{root_url.rstrip('/')}/sitemap.xml"]

        found_links: list[str] = []
        seen_sitemaps: set[str] = set()
        for sitemap in sitemaps[:5]:
            if sitemap in seen_sitemaps:
                continue
            seen_sitemaps.add(sitemap)
            xml = self._safe_get(sitemap)
            if not xml:
                continue
            locs = re.findall(r"<loc>(.*?)</loc>", xml, flags=re.IGNORECASE)
            for loc in locs[:600]:
                clean = self._clean_xml_loc(loc)
                if clean:
                    found_links.append(clean)
            # Nested sitemap index support.
            nested_sitemaps = [
                self._clean_xml_loc(loc)
                for loc in locs[:150]
                if self._clean_xml_loc(loc) and self._clean_xml_loc(loc).endswith(".xml")
            ]
            for nested in nested_sitemaps[:3]:
                nested_xml = self._safe_get(nested)
                if not nested_xml:
                    continue
                nested_locs = re.findall(r"<loc>(.*?)</loc>", nested_xml, flags=re.IGNORECASE)
                for loc in nested_locs[:400]:
                    clean = self._clean_xml_loc(loc)
                    if clean:
                        found_links.append(clean)

        return list(dict.fromkeys(found_links))

    @staticmethod
    def _clean_xml_loc(value: str) -> str | None:
        clean = re.sub(r"\s+", "", value).strip()
        if not clean:
            return None
        clean = clean.replace("&amp;", "&")
        if urlparse(clean).scheme not in {"http", "https"}:
            return None
        return clean

    @staticmethod
    def _clean_line(line: str) -> str:
        return re.sub(r"\s+", " ", line).strip()

    def _extract_contacts_from_text(self, text: str, source_url: str) -> list[DeanContact]:
        raw_lines = [self._clean_line(x) for x in text.splitlines()]
        lines = [line for line in raw_lines if line]
        emails = list(dict.fromkeys(EMAIL_RE.findall(text)))
        addresses = self._extract_addresses(lines, text)

        contacts: list[DeanContact] = []
        for idx, line in enumerate(lines):
            if not DEAN_KEYWORD_RE.search(line):
                continue

            context = " ".join(lines[max(0, idx - 2) : min(len(lines), idx + 3)])
            title = self._extract_title(line) or self._extract_title(context)
            name = self._extract_name(line) or self._extract_name(context)
            email = self._pick_best_email(context, emails)
            address = self._pick_best_address(context, addresses)

            contact = DeanContact(
                name=name,
                title=title,
                email=email,
                address=address,
                source_url=source_url,
            )
            if contact.name or contact.email:
                contacts.append(contact)

        dean_emails = [email for email in emails if "dean" in email.lower()]
        if not contacts and dean_emails:
            contacts.append(
                DeanContact(
                    name=None,
                    title="Dean (inferred)",
                    email=dean_emails[0],
                    address=addresses[0] if addresses else None,
                    source_url=source_url,
                )
            )

        return self._dedupe_contacts(contacts)

    @staticmethod
    def _extract_title(text: str) -> str | None:
        match = re.search(
            r"(?i)\b((?:interim|acting|associate|vice)\s+dean|dean(?:\s+of\s+[A-Za-z& -]{2,40})?)\b",
            text,
        )
        if not match:
            return None
        return match.group(1).strip()

    @staticmethod
    def _extract_name(text: str) -> str | None:
        match = NAME_AFTER_DEAN_RE.search(text)
        if not match:
            match = NAME_BEFORE_DEAN_RE.search(text)
        if not match:
            return None
        name = re.sub(r"\s+", " ", match.group(1)).strip(" ,.-")
        if not DeanScraper._is_plausible_name(name):
            return None
        return name

    @staticmethod
    def _is_plausible_name(name: str) -> bool:
        tokens = [token.strip(".,") for token in name.split() if token.strip(".,")]
        if len(tokens) < 2 or len(tokens) > 5:
            return False
        cleaned_tokens = [token for token in tokens if token.lower() not in {"dr", "dr.", "prof", "prof."}]
        if len(cleaned_tokens) < 2:
            return False
        if any(token.lower() in STOPWORDS_FOR_NAME for token in cleaned_tokens):
            return False
        for idx, token in enumerate(cleaned_tokens):
            if len(token) == 1:
                # Allow middle initials like "Sarah A. Soule".
                if idx in {0, len(cleaned_tokens) - 1} or not token.isupper():
                    return False
                continue
            if len(token) < 2:
                return False
            if not re.match(r"^[A-Z][A-Za-z'`-]*$", token):
                return False
        return True

    @staticmethod
    def _extract_addresses(lines: list[str], full_text: str) -> list[str]:
        addresses = []
        for line in lines:
            if ADDRESS_RE.search(line) or PO_BOX_RE.search(line):
                addresses.append(line)
        for match in ADDRESS_RE.findall(full_text):
            cleaned = re.sub(r"\s+", " ", match).strip()
            addresses.append(cleaned)
        for match in PO_BOX_RE.findall(full_text):
            addresses.append(match)
        return list(dict.fromkeys(addresses))

    @staticmethod
    def _pick_best_email(context: str, all_emails: list[str]) -> str | None:
        context_emails = EMAIL_RE.findall(context)
        if context_emails:
            return context_emails[0]
        for email in all_emails:
            if "dean" in email.lower():
                return email
        return None

    @staticmethod
    def _pick_best_address(context: str, all_addresses: list[str]) -> str | None:
        context_match = ADDRESS_RE.search(context) or PO_BOX_RE.search(context)
        if context_match:
            return context_match.group(0)
        return None

    @staticmethod
    def _dedupe_contacts(contacts: Iterable[DeanContact]) -> list[DeanContact]:
        seen: set[tuple[str, str, str, str]] = set()
        deduped: list[DeanContact] = []
        for contact in contacts:
            key = (
                (contact.name or "").lower(),
                (contact.title or "").lower(),
                (contact.email or "").lower(),
                (contact.address or "").lower(),
            )
            if key in seen:
                continue
            seen.add(key)
            deduped.append(contact)
        return deduped

    def extract_from_url(self, url: str) -> list[DeanContact]:
        html = self._safe_get(url)
        if not html:
            return []
        soup = BeautifulSoup(html, "html.parser")
        text = soup.get_text("\n", strip=True)
        contacts = self._extract_contacts_from_text(text, source_url=url)
        time.sleep(self.delay_seconds)
        return contacts

    def scrape_university(self, university_name: str) -> UniversityResult:
        result = UniversityResult(university=university_name)
        homepage = self.discover_homepage(university_name)
        if not homepage:
            result.errors.append("Could not determine official homepage.")
            return result
        result.homepage = homepage

        candidate_pages = self.discover_candidate_pages(homepage, university_name)
        result.scanned_pages = candidate_pages

        all_contacts: list[DeanContact] = []
        for page in candidate_pages:
            contacts = self.extract_from_url(page)
            all_contacts.extend(contacts)

        deduped = self._dedupe_contacts(all_contacts)
        deduped.sort(
            key=lambda c: (
                0 if c.email else 1,
                0 if c.name else 1,
                0 if c.address else 1,
                len(c.title or ""),
            )
        )
        result.contacts = deduped
        if not result.contacts:
            result.errors.append("No dean contacts found on scanned pages.")
        return result


def read_university_names(input_file: Path | None, inline_names: list[str]) -> list[str]:
    names: list[str] = []
    if input_file:
        if not input_file.exists():
            raise FileNotFoundError(f"Input file not found: {input_file}")
        names.extend(
            line.strip()
            for line in input_file.read_text(encoding="utf-8").splitlines()
            if line.strip() and not line.strip().startswith("#")
        )
    names.extend(name.strip() for name in inline_names if name.strip())
    return list(dict.fromkeys(names))


def write_csv(results: list[UniversityResult], csv_path: Path) -> None:
    with csv_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "university",
                "homepage",
                "name",
                "title",
                "email",
                "address",
                "source_url",
            ],
        )
        writer.writeheader()
        for result in results:
            if not result.contacts:
                writer.writerow(
                    {
                        "university": result.university,
                        "homepage": result.homepage,
                        "name": "",
                        "title": "",
                        "email": "",
                        "address": "",
                        "source_url": "",
                    }
                )
                continue
            for contact in result.contacts:
                writer.writerow(
                    {
                        "university": result.university,
                        "homepage": result.homepage,
                        "name": contact.name or "",
                        "title": contact.title or "",
                        "email": contact.email or "",
                        "address": contact.address or "",
                        "source_url": contact.source_url or "",
                    }
                )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Scrape dean names, emails, and addresses from university names "
            "with automatic website discovery."
        )
    )
    parser.add_argument(
        "universities",
        nargs="*",
        help="University names. You can pass multiple names.",
    )
    parser.add_argument(
        "--input-file",
        type=Path,
        help="Optional text file with one university name per line.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("dean_results.json"),
        help="JSON output path (default: dean_results.json).",
    )
    parser.add_argument(
        "--csv-output",
        type=Path,
        help="Optional CSV output path.",
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=20,
        help="Maximum pages to scan per university (default: 20).",
    )
    parser.add_argument(
        "--max-search-results",
        type=int,
        default=8,
        help="Maximum search results per query (default: 8).",
    )
    parser.add_argument(
        "--delay-seconds",
        type=float,
        default=0.4,
        help="Delay between network requests (default: 0.4).",
    )
    parser.add_argument(
        "--no-proxy-fallback",
        action="store_true",
        help="Disable r.jina.ai fallback for pages that block direct scraping.",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose logs on stderr.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        universities = read_university_names(args.input_file, args.universities)
    except FileNotFoundError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    if not universities:
        print("No university names provided.", file=sys.stderr)
        return 2

    scraper = DeanScraper(
        max_pages=args.max_pages,
        max_search_results=args.max_search_results,
        delay_seconds=args.delay_seconds,
        allow_proxy_fallback=not args.no_proxy_fallback,
        verbose=args.verbose,
    )
    results = [scraper.scrape_university(name) for name in universities]

    args.output.write_text(
        json.dumps([asdict(result) for result in results], indent=2),
        encoding="utf-8",
    )
    if args.csv_output:
        write_csv(results, args.csv_output)

    print(
        f"Processed {len(universities)} universities. "
        f"JSON output: {args.output}"
        + (f", CSV output: {args.csv_output}" if args.csv_output else "")
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
