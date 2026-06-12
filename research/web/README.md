# NTPC Prep Web App

Offline study hub with all research content.

## Open the website

**Double-click:** `index.html`

Or from this folder:

```bash
start index.html
```

Works **offline** — all content is bundled in `content.js`.

## Features

- Dashboard with exam-priority links
- 31 documents: exam cram, year analysis, tutorials, CA, study plans
- Search sidebar
- Dark / light theme
- Font size A+ / A−
- Mobile-friendly sidebar

## Update content

After editing markdown files in `/research`:

```bash
python build-content.py
```

Then refresh the browser.
