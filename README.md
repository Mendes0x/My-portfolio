# Mendes0x — Personal Portfolio

A clean, editorial portfolio about the things I build, learn, and experiment with.

**Live website:** [mendes0x.github.io/My-portfolio](https://mendes0x.github.io/My-portfolio/)  
**GitHub profile:** [@Mendes0x](https://github.com/Mendes0x)

## About

A static, bilingual **Portuguese / English** personal website built with semantic HTML, CSS, and vanilla JavaScript. It uses an ultra-minimal, typography-first visual system: off-white background, graphite text, subtle gray-green accents, fine dividers and generous whitespace. No portrait, hero artwork, image cards or decorative graphics.

This repository contains only the front-end website. It requires **no Node.js server, database, API key, build step, or hosting service beyond static files**.

### Highlights

- Ultra-minimal responsive editorial layout with no personal photographs or decorative imagery.
- Portfolio projects linked directly to their current GitHub repositories.
- PT/EN language switch, with the choice saved locally when storage is available.
- Filters for web projects and command-line tools.
- Accessible navigation, visible keyboard focus, skip link, and reduced-motion support.
- Email contact and clipboard button with a manual-copy fallback.
- Updated title, canonical URL, Open Graph metadata, and a favicon.
- Zero trackers, analytics scripts, or third-party JavaScript dependencies.

## Featured projects

| Project | Area |
| --- | --- |
| [MediaDock](https://github.com/Mendes0x/web-site-dowloader-mp3) | Local media studio |
| [Bot Framework Dashboard](https://github.com/Mendes0x/bot-framework-dashboard) | Discord bot management |
| [VPN Manager](https://github.com/Mendes0x/vpn-tor) | Linux and OpenVPN |
| [Network Toolkit](https://github.com/Mendes0x/Network-Toolkit) | Network diagnostics |
| [YouTube Downloader](https://github.com/Mendes0x/youtube-downloader) | Bash media automation |

## Run locally

No installation required: open `index.html` in your browser, or serve the directory with:

```bash
python -m http.server 8000
```

Open [localhost:8000](http://localhost:8000).

For code checks, use Node.js 20+ and run:

```bash
node --check script.js
node --test tests/*.test.mjs
```

## Publish with GitHub Pages

The site is designed for the root of the `main` branch:

1. Open [Settings → Pages](https://github.com/Mendes0x/My-portfolio/settings/pages).
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main**, **/(root)**, and save.
4. The expected public address is **https://mendes0x.github.io/My-portfolio/**.

This was previously linked using the old GitHub username; the updated site uses `Mendes0x` across its canonical URL, metadata, and repository links.

**Note:** GitHub Pages settings and DNS are managed by GitHub. A successful commit alone does not prove the live website is accessible; check the **Actions** and **Pages** tabs for deployment status.

## Customize

- `index.html` — page content, SEO, project cards, semantic layout.
- `style.css` — palette, typography, responsive rules, understated typography and responsive spacing.
- `script.js` — PT/EN text, navigation, filters and contact interaction.
- `favicon.svg` — original monogram.
- `tests/` — offline markup/link checks (no media downloads).

Update both language dictionaries in `script.js` when adding translatable elements.

---

Built by [Mendes0x](https://github.com/Mendes0x). All links should point to content you have permission to share.
