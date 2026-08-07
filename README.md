# Lodestar — website

Next.js implementation of the Figma design
**"Lodestar.guru — Website Revamp"** (8 desktop frames, 1440px), built to the
target architecture in `docs/Lodestar_Frontend_Architecture_Document.docx`.

```bash
nvm use 22          # Next 15 needs Node 18.18+; the repo default is 16
npm install
npm run dev         # http://localhost:3000
npm run build       # production build
npm run typecheck
```

---

## How the design was read

The Dev Mode MCP server wasn't running and no `FIGMA_TOKEN` was set, so the
build used two sources together:

| Source | Used for |
|---|---|
| `frontend/design-refs/*.png` | The 8 exported frames — visual ground truth for layout and content |
| `figma_design/code_figma.txt` | The Copy-as-CSS dump — exact colours, gradients, radii, type sizes |

Where the two disagree the PNGs win: they are newer. The dump still lists
frame 05 as *Contact*, whereas the current file has it as **Programs**, with
the contact form moved below the pricing cards. The site follows the PNGs.

A second, newer Copy-as-CSS dump also exists at `frontend/resources/figma-css.css`
(Home is 5690px tall there, matching the current PNG; the older dump says 6454px).
The exact type scale and geometry below came from it.

### Typography

Every text layer in the Figma file declares the **Inter** family, but the
headings clearly render with Inter's *Display* letterforms — rounder tittles,
a more compact `a`, a shorter `r` arm. That is Inter v4's optical-size axis,
not a second font. Rendering `Inter-ExtraBold`, `InterDisplay-ExtraBold` and
`Inter-Bold` against the exported headline confirmed the Display match.

**This is why Inter is self-hosted rather than pulled from `next/font/google`:**
Google Fonts' Inter ships the `wght` axis only. Without `opsz`, headings render
in Text letterforms, which are wider — enough to change where the hero headline
wraps. `public/fonts/InterVariable.woff2` is the rsms v4 build (SIL OFL), loaded
in `app/globals.css` with `font-optical-sizing: auto`.

Values below are the literal ones on the Figma text layers:

| Role | Size / leading / weight / tracking |
|---|---|
| Hero display | 60px / 106% / 800 / −0.025em |
| Section heading | 42px / 115% / 700 / −0.015em |
| Card title | 21px / 700 |
| Feature title | 18px / 140% / 600 / −0.004em |
| Section lead | 16.5px / 170% / 400 |
| Body | 14.5px / 170% / 400 |
| Eyebrow | 11.5px / 140% / 700 / 0.06em, uppercase |
| Media caption | 10px / 700 / 0.05em, uppercase |

The hero geometry is measured off the export rather than guessed: text column
760px, gap 120px, media 440px — 1320px of content inside 60px insets.

---

## Design tokens

`app/tokens.css`, in two layers:

1. **Primitives** — the raw palette, type scale, spacing, radii. Every value
   is measured from the frames, not invented. The full-image colour histogram
   across all 8 PNGs produced a palette of ten colours that covers 99% of
   pixels; those are the primitives.
2. **Semantic tokens** — `--bg`, `--surface`, `--fg`, `--accent`, `--border` …
   Components only ever use these, never a raw primitive.

Key values, straight from the file:

| Token | Value | Role |
|---|---|---|
| `--ls-navy-800` | `#12305E` | Brand navy — dark bands, footer, dark cards |
| `--ls-navy-900` | `#10192B` | Headings on light surfaces |
| `--ls-blue-600` | `#2E7BC4` | The literal Figma accent (see deviation 5) |
| `--ls-blue-650` | `#2A70B4` | Primary action, links — AA-safe |
| `--ls-blue-200` | `#BEDCF3` | Soft brand band, phase cards |
| `--ls-blue-50` | `#EFF6FC` | Tinted section background |
| `--ls-gray-50` | `#F4F7FB` | Default card surface |
| `--ls-gray-200` | `#DEE5EE` | Hairline borders |
| `--ls-gray-600` | `#55637A` | Muted body copy |

Both gradients are the literal values on the Figma layers:

```css
--ls-gradient-hero:  linear-gradient(98.53deg,  #0E2547 0%, #2A63A8 86.96%);
--ls-gradient-media: linear-gradient(126.87deg, #1D4E8C 0%, #6FB3E4 71.43%);
```

Radii are `999px` (pills), `24px` (cards), `12px` (inputs) — the three the
design actually uses.

### Theme

**Light only** — the dark theme was removed at your request. The semantic layer
is the seam it would plug back into: overriding the Layer 2 tokens under a
`[data-theme="dark"]` block is all it would take; no component references a raw
primitive.

---

## Routes

| Route | Figma frame |
|---|---|
| `/` | 01 · Home |
| `/for-schools` | 02 · For Schools (B2B) |
| `/how-it-works` | 03 · How It Works |
| `/free-assessment` | 04 · Free Assessment |
| `/programs` | 05 · Programs (pricing + contact) |
| `/about` | 06 · About Us |
| `/testimonials` | 07 · Testimonials |
| `/resources` | 08 · Resources |
| `/legal/[slug]` | Privacy / Terms / Refund — no frame; footer links to them |

`next.config.mjs` carries the 301s from the restructure plan — the retired
campaign pages and the old `.html` URLs fold into their new homes.

---

## Integrations

**Google Sheets** (`lib/leads.ts`). All three forms post to real API routes
(`/api/contact`, `/api/schools-inquiry`, `/api/free-assessment`) that validate
and sanitize server-side, with a honeypot that accepts-then-discards bot
submissions. The Sheets *append* is the one piece not wired: set
`GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`,
`npm install googleapis`, and replace the marked block in `recordLead()`.
Until then leads are logged server-side rather than silently dropped.

**WordPress** (`lib/wordpress.ts`). `getLatestPosts()` fetches
`/wp-json/wp/v2/posts` with ISR (`revalidate: 600`) and a `wp-posts` cache tag
for on-demand revalidation from a publish webhook. Set `WORDPRESS_API_URL` to
activate; without it the Resources page renders the posts from the Figma frame
so it never renders empty.

**Product app.** `/free-assessment` is a static page that links out to
`site.productAppUrl`. No shared session or token handoff, per the architecture
doc's explicit deferral.

---

## Deliberate deviations

1. **Image placeholders are filled, not bare labels.** In Figma every
   `IMG · …` is only a 440×30 caption pill — the image area is left empty. A
   real page can't ship a large blank region, so `<Media>` renders a block
   sized to the region the design reserves, carrying the same caption and the
   file's own media gradient. Swap in a real `<Image>` per slot. The small
   card banners and the office map stay as strips, matching the design.
2. **Responsive is inferred.** The file only specifies the 1440 frame.
   Breakpoints at 1080px and 720px collapse the grids, stack the split
   layouts, and fold the nav into a disclosure menu.
3. **The hero carries the animated illustration, not a placeholder.**
   `public/learning.svg` sits in the right-hand column, in the slot the frame
   reserves for `IMG · Student & counsellor session`. It is served via `<img>`
   so its ~200KB of SMIL markup stays out of the document. The character's
   vertical bob was frozen at its rest position (63 `animateTransform` nodes
   pinned to their first keyframe); the floating books, clouds and rotations
   still play. `public/learning.original.svg` is the untouched file.
   Caveat: SMIL inside an `<img>` cannot be paused by `prefers-reduced-motion`
   — inline the SVG if that matters.
4. **The Students / Parents hero toggle was removed.** The frame carries both
   copy variants behind a segmented control; the site ships the parent-facing
   copy, which is the frame's default state.
5. **A persistent bottom CTA was added** (`components/floating-cta.tsx`) —
   the redesign plan's floating glass pill. It surfaces the hero's
   "Take the Free Assessment" action once the hero scrolls away, so the
   primary action is never more than one click off. Not rendered on
   `/free-assessment`, `inert` while hidden so it never enters the tab order,
   and dismissible.
6. **The footer CTA card is not clipped.** It overflows the frame edge in
   Figma; here it sits in the footer's last column.
7. **Legal pages were written.** The footer links to three policies that have
   no frame. The copy is a reasonable draft — **have it reviewed before
   launch.**
8. **The accent is 3% darker than the design.** `#2E7BC4` misses WCAG AA in
   both roles it is used for: white text on the filled button (4.42:1) and
   accent link/eyebrow text on the light surfaces (4.06–4.12:1). `--accent`
   points at `--ls-blue-650` (`#2A70B4`) instead, which clears AA everywhere
   (5.15 on white, 4.80 on `#F4F7FB`, 4.73 on `#EFF6FC`) and is not
   perceptibly different side by side. The literal Figma value is still there
   as `--ls-blue-600`; repoint `--accent` at it to restore exact fidelity.

## Accessibility

Semantic landmarks, ordered headings, a skip link, visible focus rings on a
token, labelled form fields, `aria-current` on the active nav item,
`role="img"` + `aria-label` on media placeholders, `aria-live` on form status,
and a `prefers-reduced-motion` block.

Contrast was verified by walking every rendered text node on all 9 routes
against its computed background, in **both themes** — currently **0 failures**
at WCAG AA. Only the decorative watermarks ("SINCE 2011", "PARENT VOICES") and
the quote glyph sit below AA, and those are `aria-hidden` by design.

Two whole classes of bug were caught this way and fixed at the source rather
than per-instance:

- `.section--brand .body` style descendant rules were bleeding onto white
  cards nested inside dark bands, rendering white-on-white.
- Raw primitives (`var(--ls-navy-700)`) used inline in pages did not respond
  to the theme, so soft-band copy vanished in dark mode. Pages now use only
  semantic tokens; `--fg-on-soft-muted` was added for that surface.
