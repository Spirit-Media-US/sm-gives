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

## Status — as of 2026-04-29

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

### Phase 10 — SEO Audit Implementation (in progress, on dev)
Three commits stacked on `dev` from a Phase 1 SEO audit pass. All built, deployed to `dev.sm-gives.pages.dev`. Awaiting Kevin's merge to main.

| Commit | Phase | What |
|---|---|---|
| `78aa6dd` | 1A + 1B | Homepage NonprofitOrganization JSON-LD enrichment: added `nonprofitStatus: "Nonprofit501c3"`; `logo` upgraded from a resize-parameterized URL string to a structured `ImageObject` (canonical 1024×239 PNG, resize params stripped). |
| `58f2f6a` | 1C | `/about/` AboutPage `mainEntity` inner Org block synced with the homepage NonprofitOrganization in five coordinated changes: description verbatim match, added `url` (apex, not `/about`), `nonprofitStatus`, `logo` ImageObject, `parentOrganization`. |
| `6279c78` | 1D | BlogPosting schema enrichment across all 22 posts: `dateModified` from Sanity `_updatedAt`, `mainEntityOfPage` (WebPage with @id), `publisher` upgraded `Organization` → `NonprofitOrganization`, `publisher.logo` ImageObject, parallel `<meta property="article:modified_time">` tag. |

### Wave 2 — SEO Audit Implementation, 2026-05-01 (in progress, on dev)
Two more source-only commits stacked on `dev` continuing the Phase 10 SEO audit pass. Built and deployed to `dev.sm-gives.pages.dev`. Awaiting Kevin's merge to main alongside the existing Wave 1 commits.

| Commit | Phase | What |
|---|---|---|
| `618b743` | 2A | `/blog` `<meta name="keywords">` removed (single-line deletion at `src/pages/blog.astro:34`). The tag was inline inside `<Fragment slot="head">` alongside `<meta name="robots">` and the JSON-LD Blog schema. Net effect: zero `<meta name="keywords">` tags in built output sitewide — this was the only one. (Commit body labels this Phase 4 — renumbered here for cross-site Wave consistency with GHI 2A-2F and 10B 2.1.) |
| `2a5dba9` | 2B | `/blog` ItemList JSON-LD added as a sibling to the existing Blog block. 22 ListItem entries, positions 1–22, each nesting a BlogPosting with headline, url, ISO `datePublished`, description, image, and author Person. `numberOfItems: 22` is computed from `rawSanityPosts.length` so the schema self-updates as posts are added/removed in Sanity. Existing Blog JSON-LD preserved alongside. (Commit body labels this Phase 5 — renumbered here for cross-site Wave consistency with GHI 2A-2F and 10B 2.1.) |

#### Heads-up for future contributors
- **`/blog` schema iterates `rawSanityPosts`, not `sanityPostsFormatted`.** Two arrays exist in `src/pages/blog.astro` for distinct purposes: `rawSanityPosts` keeps Sanity's ISO `YYYY-MM-DD` dates that Schema.org `datePublished` requires; `sanityPostsFormatted` has human-readable display strings (`"February 12, 2025"`) for the visible UI's client-side render. Both Wave 1's BlogPosting enrichment on `/blog/[slug]` (commit `6279c78`, Phase 1D) and Wave 2's ItemList here (`2a5dba9`, Phase 2B) depend on `rawSanityPosts.date` staying ISO. If the GROQ projection ever changes to project formatted dates only, both schemas silently break. Don't merge the two arrays.

#### Findings surfaced during this wave
- **Audit's source-side actionable scope is now substantively complete.** Wave 1 closed the homepage / `/about/` schema-enrichment recommendations and the per-post BlogPosting enrichment; Wave 2's 2A and 2B close the audit's Additional Recommendations targeting `/blog` index. Remaining `/blog` work would be content-side (new posts) or design-side (UI changes), neither audit-driven. The intentionally-deferred Phase 1E (homepage + /about title rewrites) remains the only audit item still in Open Items.

#### Wave 2 status
Source-side audit-actionable work is substantively complete for SM Gives. Remaining items still in **Phase 10 — Open Items Needing Kevin** (below, unchanged from 2026-04-29).

### Phase 10 — Open Items Needing Kevin
- **Social profile URLs missing.** The footer has no social link row, and Sanity `siteSettings` carries no social URLs. Schemas can't populate `sameAs` (Facebook, Instagram, LinkedIn, etc.) until Kevin shares the canonical handles. Once available, `sameAs` would land on the homepage Organization + the `/about/` Org block.
- **501(c)(3) EIN missing.** Schema currently asserts `nonprofitStatus: "Nonprofit501c3"` but does not declare a `taxID`. Adding the EIN would strengthen Google's nonprofit-knowledge-graph signals. Kevin to share the EIN if it should be public.
- **Founder confirmation needed.** Kevin White is the likely founder of Spirit Media Charities, but the schema does not declare a `founder` Person. Parked until confirmed — adding it later is a one-line edit.
- **PROJECT-STATUS.md is stale generic template** — `REPLACE_PROJECT_ID` placeholders, claims Netlify hosting (wrong, production is Cloudflare Pages), all checkboxes unchecked despite the site being live. Separate cleanup, not strict SEO.
- **Phase 1E (homepage + /about title rewrites) deferred.** The pastoral, ministry-branded title voice is intentional — keyword-led rewrites would change tone. Kept for Kevin to direct if/when ranking pressure justifies revisiting.

## Rules

- All work goes to the **dev** branch — never push directly to main
- Only merge dev to main when Kevin says "push to main"
