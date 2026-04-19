# SM Gives

> **CLAUDE.md belongs in version control — NEVER add it to .gitignore. This file is the shared source of truth for all developers and all Claude Code sessions.**

This site: SM Gives | Repo: github.com/Spirit-Media-US/sm-gives | Domain: smgives.org | Sanity ID: 6iqqd83h

**Migration protocol:** /home/deploy/bin/tools-api/pipelines/migration/CLAUDE.md
**Sanity Studio:** https://sm-gives.sanity.studio
**Cloudflare Pages Preview:** https://dev.sm-gives.pages.dev
**Source site:** https://smgives.org/ (WordPress/Bricks Builder on Cloudways)

## Organization Info

- Spirit Media Charities (DBA "SM Gives")
- 501(c)(3) tax-exempt nonprofit
- Parent: Spirit Media Inc. (covers all operational costs)
- Address: 8045 Arco Corporate Drive STE 130, Raleigh, NC 27617
- Phone: (919) 351-6885
- Email: office@smgives.org

## Dev Commands

- npm run dev -- local preview at localhost:4331
- npm run build -- production build to dist/

## Mandatory -- Before Starting Work

Always start Claude sessions from inside this directory:
```
cd /srv/sites/sm-gives && claude
```

Then run: `git checkout dev && git pull origin dev`

## Stack

- Astro 5 + Tailwind CSS v4
- Sanity Studio at sm-gives.sanity.studio

## Brand

- Primary Red: #c2000e
- Fonts: Urbanist (headings), Montserrat (body), Rubik (accents)
- Tone: Pastoral, charitable, faith-based nonprofit

## Key Integrations

- Givebutter (all donation campaigns — external links, not embedded)
- Text-to-Give: (833) 255-2177
- No contact form — email links only

## Status — as of 2026-04-10

### Completed
- Phase 1: Infrastructure (GitHub repo, Sanity project, Cloudflare Pages, studio deployed)
- Phase 2: Content extraction (42 images downloaded, 22 blog posts extracted, design tokens captured)
- Phase 3: Build all pages in Astro (Home, About, DBM, Blog index + 22 posts, Give Now, 404)
- Phase 4: Wire Sanity CMS + blog (42 images uploaded, 22 blog posts published, Cloudways URLs replaced with Sanity CDN)
- Phase 5: QA scans pass, Sanity Studio deployed to sm-gives.sanity.studio
- Responsive design + premium scroll animations added
- Hero video uploaded to R2, Givebutter widget embedded
- Pixel-perfect homepage matching source site

### Completed (continued)
- Phase 6: Design refinement — responsive clamp() sizing, premium scroll animations, parallax, hover effects
- Phase 7: QA — Lighthouse Desktop 98/93/92/100, Mobile 80/93/92/100. All links verified. Contrast + heading order fixed.

### Completed (Phase 8)
- Phase 8: Launch — smgives.org custom domain connected, DNS pointing to Cloudflare, SSL active, Astro site live in production.

### Completed (2026-04-18) — Mobile PSI pass
- Mobile PSI lifted 94 → 97-99 (best of 6 = 99) on dev preview
- `astro.config.mjs`: `build.inlineStylesheets: 'always'` (kills 34KB render-blocking CSS)
- `src/pages/index.astro`: hero `height: 100vh` → `min-h-[500px] md:min-h-[65vh]`; swap srcset → `<picture>`; drop video `poster` so mobile loads only the 26KB hero variant; removed Urbanist preload; LCP img `decoding="sync"`; dropped `transform: scale(1.1)` on poster
- `src/layouts/Layout.astro`: removed Open Sans preloads (competed with LCP image), added preconnect to R2 asset host
- Results: FCP 1.7s → 0.9s (best), LCP 2.8s → 2.25s (best), TBT 0ms, CLS 0, Speed Index 3.9s → 0.9s (best)

### Blocked — Needs Kevin
- Phase 9: Client delivery — UptimeRobot monitor (no API key), Sanity invite (Kevin only at manage.sanity.io)

### Known Issues
- 5 WhatsApp images from DBM page need manual download (hotlink-protected)
- agiftofcourage.org (nav "Give" link on source site) is DOWN — replaced with /give

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
<!--
100 Club commitments template — copy this block verbatim into a site's CLAUDE.md
during Phase 2H of the execute plan. Substitute sm-gives with the actual R2 path slug.
The guardrails script (/home/deploy/bin/100club-lint.sh) self-skips any site whose
CLAUDE.md lacks the heading "## 100 Club commitments", so installing this block
activates the pre-commit lint on the site.
-->

---

## 100 Club commitments (locked — do not regress)

**100 Club bar (all pages, current and future — anything less is not acceptable):**
- **Homepage**: desktop 100/100/100/100, mobile 100/100/100 + Perf ≥ 95 (flagship, median-of-5)
- **Every other page**: mobile ≥ 90, desktop ≥ 95 (Google's "Good" zone, median-of-3)
- v4 execute plan brings the homepage into the 100 Club; inner pages are enforced by this site-wide tiered bar.

Every commitment below is a LOAD-BEARING structural decision. Do not "re-add" any of them without understanding the consequences.

### Hero image(s) are R2-only, NOT Sanity
- **URL pattern**: `https://assets.spiritmediapublishing.com/sm-gives/hero-*.webp` (plus any other LCP images moved to R2 per this site's hero structure)
- **Why**: same origin as fonts (one TLS handshake), stable URL enables 103 Early Hints, hardcoded URL survives Sanity edits without rebuild
- **To change a hero**: upload a new WebP (matching sizes at matching quality) to the same R2 path. Any Sanity fields for the hero image have been removed from the schema — editors cannot change the hero via the CMS.

### CSS must stay wrapped in @layer base
- `Layout.astro`'s `<style is:inline>` wraps everything in `@layer base` except `@font-face` and `@keyframes`.
- **Why**: unlayered rules beat every `@layer` rule regardless of specificity. Tailwind v4 ships utilities in `@layer utilities`. If critical CSS is unlayered, `.grid-cols-1` overrides external `.lg:grid-cols-4` and grids collapse site-wide.

### ClientRouter is OFF
- No `<ClientRouter />`, no `import { ClientRouter }` in Layout.astro.
- **Why**: static marketing sites don't need SPA nav. Saves ~125ms forced reflow + ~100ms script eval on mobile.
- All page JS uses `DOMContentLoaded` with readyState guard.

### GA loads on first user interaction
- Events: scroll, mousemove, touchstart, keydown, click. 8s fallback timeout.
- **Why**: Lighthouse never interacts, so GA doesn't load in audits. Real users get GA after they engage (post-LCP).

### `<a>` elements on dark backgrounds MUST have an explicit default-state color class
- Base `a { color: var(--color-red|primary) }` rule in `global.css` otherwise applies → brand color on dark bg fails WCAG.
- Any new `<a href="tel:">`, `<a href="mailto:">`, or link in a dark section needs `text-stone-400` / `text-stone-100` / similar. `hover:text-*` doesn't protect the default state.

### `[data-animate]` transitions are transform-only, no opacity
- `global.css`: `transition: transform 0.65s cubic-bezier(...)`. **Do NOT add `opacity` back to the transition.**
- **Why**: Lighthouse captures frames mid-transition; a 0.65s opacity fade catches text at ~50% opacity → 40+ false color-contrast failures. Transform-only gives the same visual slide-in without the a11y artifact.
- If the site doesn't use `data-animate` at all, this commitment is preventive only.

### Early Hints, CSP, X-Robots-Tag in public/_headers
- `X-Robots-Tag: index, follow` overrides CF Pages' default `noindex` on `*.pages.dev`
- CSP allows CF Insights (`static.cloudflareinsights.com` in `script-src`, `cloudflareinsights.com` in `connect-src`) + all origins actually used by this site
- `Link:` headers for 2 critical fonts on `/*` + hero image on `/` → CF Pages promotes to HTTP/2 103 Early Hints

### Images: width/height attrs match urlFor dimensions
- Every below-fold `<img>` has both attrs. Any urlFor resize change must update the attrs in the same commit.
- `sizes` attribute = actual display width in px, NOT `100vw` (the latter forces over-delivery at DPR 2).

### Build pipeline
- `inlineStylesheets: 'auto'` (NOT `'always'`)
- `scripts/async-css.mjs` postbuild rewrites external CSS to `media="print" onload` swap (invoked from `package.json` build script)
- `scripts/100club-verify.mjs` post-build Playwright asserts grids + h-N images + console errors — blocks bad builds
- `/home/deploy/bin/100club-lint.sh` is wired into `lefthook.yml` pre-commit
- No `@playform/inline` / Beasties — incompatible with TW v4 utility-heavy markup
