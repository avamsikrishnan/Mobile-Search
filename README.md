# USA Engineering Deans Directory

A lightweight static website to search a directory of engineering deans at U.S.
colleges and universities.

## Features

- Search by institution, dean name, address, city, state, zip, or email
- Filter by state
- Responsive table layout
- Data stored in `data/deans.json`

## Run locally

Because browsers can restrict `fetch` from local files, use a local web server.

### Option 1: Python

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

### Option 2: Node

```bash
npx serve .
```

## Update records

Edit `data/deans.json` and keep the same object shape:

```json
{
  "institution": "University Name",
  "dean": "Dean Name",
  "address": "Street Address",
  "city": "City",
  "state": "ST",
  "zip": "00000",
  "email": "email@university.edu"
}
```

## Important note

The included records are starter samples for demonstration. For production use,
verify current information directly from each official institution website.
