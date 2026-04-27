# Visual Direction — Contestant 2

## Design Principle

A compliance store, not a research portal. The visual language borrows from: legal-services storefronts (clean, direct, authoritative), deadline-board urgency (airline departure screen energy — facts, not emotion), and professional document services (FedEx Office more than LexisNexis). Not dark-SaaS, not startup-colorful, not law-firm-conservative. Confident mid-register: you know what you sell, you've done it before, the buyer can stop worrying.

---

## Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Navy | `#1e3a5f` | Nav, primary CTAs, headings, trust anchors |
| Accent | Cobalt | `#2563eb` | Links, secondary CTAs, hover states, product card borders |
| Urgency | Deadline Red | `#dc2626` | Deadline badges, penalty callouts, "IN EFFECT" status pills |
| Surface | Off-White | `#f8fafc` | Page background, card backgrounds (replaces pure white) |
| Body Text | Slate | `#1e293b` | Body copy, nav items, secondary text |

**Optional sixth: Amber `#d97706`** — for "EFFECTIVE SOON" status (distinct from both red and neutral). Already exists in current Tailwind usage; keep it.

### Usage Rules

- **Navy** is the authority color. Every CTA button that triggers a purchase is Navy. Not Blue. Not Cobalt. Navy.
- **Cobalt** is for navigation and internal links — it signals "go somewhere" without "buy now" energy.
- **Deadline Red** appears ONLY for: law status badges ("IN EFFECT"), penalty figures, deadline date callouts. Not for decorative use. Red means "this is why you're here."
- **Off-White** replaces the current `bg-white` and `bg-slate-50` pattern. Slight warmth removes the clinical research-portal feel.
- **Slate** for all body copy. Not `text-gray-700` (current) — go darker. Legal documents use near-black body text; it signals authority.

### What the current palette does wrong

The current site uses `bg-slate-900` for the hero and final CTA, `bg-blue-50` for the methodology section, `bg-slate-50` for How It Works, and `bg-white` for FAQ. Every section has a different background — it reads like a SaaS landing page with distinct "blocks." A compliance store should feel like one continuous surface, differentiated by content hierarchy not section color.

---

## Type Pairing

### Display: Inter (Bold / ExtraBold)

Already in use. Keep it. `font-display` classes are correct. Inter Bold at large sizes reads as professional and legible — not decorative. Do not add a serif or a "statement font." The credibility signal comes from the content, not the typeface.

### Body: Inter (Regular / Medium)

Also already in use. Keep it. The body text size should increase from current `text-sm` / `text-base` to `text-base` / `text-lg` on product pages and the homepage. Current body text is undersized for a document that a stressed buyer is trying to read fast.

### Heading sample (H1 in new voice):
```
AI in your hiring? Colorado's deadline is June 30.
```
Rendered at: `text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight`

### Body paragraph sample:
```
SB 24-205 requires businesses deploying AI in consequential decisions to have a documented risk management program, conduct impact assessments, and issue consumer notices. The documents in this package cover each requirement.
```
Rendered at: `text-lg text-slate-200 leading-relaxed max-w-xl`

### Type rules

- **No centered body paragraphs over 2 lines.** Center-aligned long text is a research-resource pattern. Left-align all body copy.
- **Increase product page heading size.** Current H1 on product pages is `text-2xl sm:text-3xl md:text-5xl`. Keep `md:text-5xl` but ensure mobile starts at `text-3xl`, not `text-2xl`.
- **Reduce body text line-length on product pages.** Current `max-w-2xl` is correct; enforce it everywhere on product pages. Wide text blocks are a research-resource pattern.

---

## Hero Pattern

### Layout

**Left-aligned, deadline-board aesthetic.** NOT centered. Centered heroes are soft. Left-aligned heroes are operational.

On desktop: 60% text column / 40% urgency sidebar (vertical list of deadline cards — state, law, date, status pill).
On mobile: full-width text column, urgency sidebar collapses to a horizontal scrolling deadline strip.

### Elements (top to bottom, left column)

1. **Eyebrow line** — `text-sm font-semibold uppercase tracking-widest text-amber-400` — e.g., "Colorado deadline: June 30, 2026" or "Texas TRAIGA: in effect now"
2. **H1** — `text-5xl md:text-6xl font-extrabold text-white leading-tight` — Short. ≤8 words. Uses new voice.
3. **Sub-H1** — `text-lg text-slate-200 max-w-lg leading-relaxed` — 2–3 sentences. Obligation + product + outcome.
4. **Primary CTA button** — `bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-8 py-4 rounded font-bold text-lg` — "Get Your Compliance Documents"
5. **Price signal below button** — `text-sm text-slate-400` — "$49–$697, one-time. No subscription."
6. **Trust strip below price** — 3 items inline: "Built from enacted statute" | "Instant download" | "Attorney-reviewable"

### Right column (deadline sidebar)

Vertical stack of 4–5 law cards:

```
[RED PILL: IN EFFECT] NYC Local Law 144
Automated employment tools. Since July 2023.

[RED PILL: IN EFFECT] Texas TRAIGA
All AI systems. Since January 1, 2026.

[AMBER PILL: JUNE 30] Colorado SB 24-205
High-risk AI decisions. Deadline approaching.

[RED PILL: IN EFFECT] Illinois HB3773
AI in hiring. Since January 1, 2026.
```

Each card: clickable → links to product page. No decoration beyond the status pill and the law name. This is a departure board, not a feature showcase.

### What's above the fold on mobile

On mobile (< 768px): eyebrow + H1 + sub-H1 (max 2 sentences) + CTA button. The deadline sidebar becomes a horizontal 3-card scroll strip directly below the CTA. The product carousel is removed from mobile hero entirely.

### Spacing energy

**Dense, not airy.** Current hero has generous padding (`py-20` on desktop). New hero: `py-12 md:py-16`. Compliance buyers are not browsers. They don't need breathing room — they need the information fast. Dense signals operational, not decorative.

---

## Product Card Pattern

### Current pattern (problem)

Generic CMS-shaped card: law name, status badge, price, "View Product" button. No penalty visible. No deadline visible. No specificity about what's included. Looks like a template marketplace.

### New pattern

```
┌─────────────────────────────────────────┐
│ [STATE NAME]   [STATUS PILL: IN EFFECT] │
│                                         │
│ SB 24-205                               │ ← Law short name, bold
│ Colorado Consumer Protections           │ ← Law full name, lighter weight
│                                         │
│ Deadline: June 30, 2026                 │ ← In Deadline Red if ≤90 days
│                                         │
│ 8 documents · $449 · Instant download  │ ← Single fact line
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │  Get These Documents →              │ │ ← Navy button, full width
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Card rules:**
- No description paragraph on the card. Description lives on the product page.
- Deadline appears in red if ≤90 days out (or if law is already in effect).
- Price always visible on the card. Not "starting at" — the actual price.
- Document count always visible. Tells buyer what they're getting before they click.
- "Get These Documents" — not "View Product", not "Learn More", not "Buy Now." Transaction verb that names the product.

---

## Imagery Direction

### The Rule

**Real people, real work, no metaphor.** No scales of justice, no gavels, no AI-glow brain graphics, no server rooms, no stock "diverse team meeting" images. The visual register is: small business owner at a desk or in their shop, doing the kind of work where compliance paperwork lands. Slightly unglamorous. Specific. Believable.

### 5 Unsplash Search Queries

1. `small business owner laptop paperwork desk`
2. `restaurant owner reviewing documents`
3. `hiring manager office interview documents`
4. `small business HR manager computer`
5. `retail shop owner working laptop counter`

**Filter rule:** No photos where a person is smiling at the camera. (Smiling-at-camera photos signal marketing. Side-profile or over-shoulder photos signal real work.) No visible brand logos. No photos where the dominant element is a device screen showing a dashboard.

### Hero image treatment

Not a full-bleed background image. The current site's background image fades behind a dark overlay at `opacity-10`. In the new design: **no background image in the hero.** The hero is the deadline sidebar and the H1. The deadline information IS the visual. A background image behind that copy dilutes the visual hierarchy.

If an image is needed for social sharing (OG image), use a dark-navy card with the law name, deadline, and price in white type — no photo. This scans better in social feeds than a photo with overlay text.

### Blog post imagery

Keep the current `/blog/blog-hero-[state].png` pattern. These images work for the blog — landscape photos with colored overlays. No change.

---

## Anti-Patterns

The following visual patterns are explicitly forbidden in the new design:

1. **Product carousels as the hero.** The current homepage hero is a product carousel. Carousels are research-resource patterns — they say "browse our inventory." The new hero is a single strong statement + deadline sidebar. If a carousel is needed, it moves below the fold.

2. **Section-by-section background color alternation.** Current pattern: `bg-blue-50`, `bg-slate-50`, `bg-white`, `bg-slate-900`. This produces a "landing page blocks" visual pattern that reads as SaaS demo page. New pattern: single `bg-[#f8fafc]` surface throughout, with visual differentiation through type weight and spacing, not section background swaps.

3. **Info-graphic blocks.** The current "How We Build Our Templates" section uses 4 icon cards. This reads as educational content — a research resource explaining its methodology. It's correct for an About page. It's wrong for the homepage where the buyer's first 10 seconds should confirm they're in the right place to buy something. Move methodology to an About section; don't feature it in section 2 of the homepage.

4. **Blog grid as a homepage section.** The current homepage does not feature the blog explicitly, but the nav gives it equal weight with Products. In the new IA, blog moves to "Resources" — not removed, but deprioritized visually and navigationally.

5. **FAQ accordion as a homepage section.** 9-question FAQ on the homepage is a research-resource pattern. Move to `/faq` route or `/products#faq`. Replace with 3–4 inline answers in the new voice (not accordions — short paragraph pairs or Q/A inline).

6. **"Browse Products" as a CTA verb.** Already identified in Round 1. No further shopping-mode verbs.

7. **Stock imagery of technology/AI (circuit boards, neural network graphics, abstract data visualizations).** The product is about law compliance, not technology. The visuals should reflect the legal obligation context (paperwork, business operations) not the AI context.
