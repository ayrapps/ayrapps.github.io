# ayrapps.github.io

The site behind <https://ayrapps.github.io/>. Plain HTML and CSS, served by
GitHub Pages from `main` with no build step (`.nojekyll`).

| Path | Page |
|---|---|
| `/` | ayrapps home |
| `/pina-viewer/` | Pina Viewer (English) |
| `/pina-viewer/ja/` | Pina Viewer (Japanese) |

No trackers, analytics or external fonts. The download buttons ask the GitHub
API for the latest release and fall back to the Releases page.

To preview locally:

    python3 -m http.server 8765 --directory .
