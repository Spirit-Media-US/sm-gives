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

### Blocked — Needs Kevin
- Phase 8: Launch — smgives.org custom domain needs to be connected in Cloudflare Pages. DNS zone needs to be added to our Cloudflare account.
- Phase 9: Client delivery — UptimeRobot monitor (no API key), Sanity invite (Kevin only at manage.sanity.io)

### Known Issues
- 5 WhatsApp images from DBM page need manual download (hotlink-protected)
- agiftofcourage.org (nav "Give" link on source site) is DOWN — replaced with /give

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
