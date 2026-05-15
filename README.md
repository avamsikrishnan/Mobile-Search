# Mobile-Search

Automatic dean contact extraction pipeline from university names only.

## What this does

Given only university names, this script automatically:

1. Finds likely official university homepages.
2. Discovers dean/leadership/contact pages across the same domain.
3. Extracts dean-related names, titles, email addresses, and mailing addresses.
4. Exports machine-readable results to JSON (and optionally CSV).

## Quickstart

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Usage

### One-off run with inline university names

```bash
python dean_scraper.py \
  "Stanford University" \
  "University of Michigan" \
  --output dean_results.json \
  --csv-output dean_results.csv \
  --verbose
```

By default, the scraper uses `https://r.jina.ai/` as a read-only fallback when a page returns bot-blocking responses (for example `403`), which improves fully automated runs.

### Run from a file

Create `universities.txt` with one university name per line, then:

```bash
python dean_scraper.py \
  --input-file universities.txt \
  --output dean_results.json \
  --csv-output dean_results.csv
```

To disable fallback proxy fetching:

```bash
python dean_scraper.py --input-file universities.txt --no-proxy-fallback
```

## Output format

Each university result includes:

- `university`: input university name
- `homepage`: discovered homepage URL
- `contacts`: list of extracted contacts with
  - `name`
  - `title`
  - `email`
  - `address`
  - `source_url`
- `scanned_pages`: URLs scanned for extraction
- `errors`: extraction/discovery warnings

## Notes and limits

- Extraction is heuristic and website structure dependent.
- Some schools expose only contact forms or directory links (not direct emails).
- Respect each target site's terms and robots policy for production deployments.
- For production accuracy, use this as a baseline and add institution-specific rules.
