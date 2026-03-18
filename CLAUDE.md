# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A personal academic portfolio website for Eric Taw, PhD, built on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) Jekyll template and deployed via GitHub Pages.

## Development Commands

**Local Jekyll (preferred):**
```bash
bundle install
bundle exec jekyll serve -l -H localhost   # live reload at localhost:4000
bundle exec jekyll build                   # production build to _site/
```

**Docker (alternative):**
```bash
chmod -R 777 .
docker compose up   # serves at localhost:4000
```

**JS assets:**
```bash
npm install
npm run build:js    # minify JS
npm run watch:js    # watch for changes
```

## Content Architecture

Content lives in Jekyll collections under `_publications/`, `_talks/`, `_teaching/`, and `_portfolio/`. Each item is a Markdown file with YAML front matter. The Python scripts in `markdown_generator/` generate these Markdown files from structured data (TSV/CSV/BibTeX) — edit the data files there rather than the generated Markdown directly.

**Content generation:**
```bash
python markdown_generator/publications.py   # from publications.tsv
python markdown_generator/talks.py          # from talks.tsv
python markdown_generator/pubsFromBib.py    # from BibTeX
```

**CV data** is stored in `_data/cv.json` and can be regenerated from a Markdown CV:
```bash
./scripts/update_cv_json.sh
```

**Talk geolocation** (`talkmap.ipynb`) runs automatically via GitHub Actions (`.github/workflows/scrape_talks.yml`) when `_talks/` changes.

## Key Files

- `_config.yml` — site title, author info, plugins, collection config
- `_data/navigation.yml` — top navigation links
- `_data/authors.yml` — author metadata
- `_pages/` — static pages (about, cv, publications index, portfolio index, 404)
- `_includes/` / `_layouts/` — HTML templates (modify with care; they come from upstream template)
- `_sass/` — stylesheet source
- `assets/` — compiled CSS/JS/images
