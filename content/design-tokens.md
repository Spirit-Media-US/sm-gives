# SM Gives — Design Tokens

Extracted from https://smgives.org/

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| primary-red | #c2000e | Brand red — CTAs, headings, accents |
| light-pink | #ffc0cb | Background accents |
| black | #000000 | Body text |
| white | #ffffff | Background, text on dark |
| off-white | #f5f5f5 | Section backgrounds |
| light-gray | #e6e7e8 | Borders, card backgrounds |
| dark-gray | #616161 | Secondary text |

## Typography

| Token | Font Family | Usage |
|-------|-------------|-------|
| font-heading | Urbanist | Headings, hero text |
| font-body | Montserrat | Body copy |
| font-accent | Rubik | Buttons, labels |
| font-secondary | Open Sans | Fallback / secondary text |

### Font Sizes (Desktop)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero heading | 48–64px | 700 | 1.1 |
| Section heading (h2) | 36–42px | 700 | 1.2 |
| Subheading (h3) | 24–28px | 600 | 1.3 |
| Body | 16px | 400 | 1.6 |
| Small / caption | 14px | 400 | 1.5 |
| Button | 16px | 600 | 1 |

### Font Sizes (Mobile)

| Element | Size |
|---------|------|
| Hero heading | 32–40px |
| Section heading | 28–32px |
| Subheading | 20–24px |
| Body | 16px |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| section-padding-y | 80px (desktop), 48px (mobile) | Vertical section spacing |
| section-padding-x | 64px (desktop), 24px (mobile) | Horizontal section padding |
| container-max-width | 1200px | Content container |
| card-padding | 24px | Card internal padding |
| card-gap | 24px | Grid gap between cards |

## Border & Radius

| Token | Value |
|-------|-------|
| radius-sm | 8px |
| radius-md | 12px |
| radius-lg | 16px |
| radius-full | 9999px (pill buttons) |

## Shadows

| Token | Value |
|-------|-------|
| shadow-card | 0 2px 8px rgba(0,0,0,0.08) |
| shadow-hover | 0 4px 16px rgba(0,0,0,0.12) |

## Navigation

- Type: Sticky header with semi-transparent dark overlay
- Mobile: Hamburger menu (breakpoint ~768px)
- Logo: Left-aligned
- CTA button: "GIVE NOW" — pill shape, primary-red background

## Key Layout Patterns

- Homepage: Single-page with anchor sections
- Hero: Full-width with animated text carousel (cycling 195 country names)
- Values section: Horizontal scrolling cards with background images
- Program cards: 5 cards in grid layout with image + text + Givebutter CTA
- Blog grid: 3-column card grid with featured image, title, excerpt
- Footer: Dark background, centered text, address + phone + email
