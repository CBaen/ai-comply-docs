# Visual Direction — Contestant 4

## The Visual Problem

The current site looks like a compliance information portal — dense explainer sections, a product carousel that rotates through feature-list cards, a methodology section with icon-grid, a blog-style layout pattern. It reads: "This is where you come to understand AI compliance." The buyer needs it to read: "This is where you come to get the documents that comply with a specific AI law, today."

The visual redesign follows the voice spec. Where the voice is short, declarative, offer-shaped — the design is clean, high-contrast, product-forward. Where the voice has two modes (Deadline Approaching / Already Exposed), the design has two urgency registers: countdown red-amber for upcoming deadlines, steady enforcement-signal crimson for laws already in force. The site should feel like a specialized compliance store, not a SaaS information platform.

---

## Color Palette

### Primary Colors

**Midnight Navy** — `#0F172A`
Usage: Background for hero sections, final CTA section, urgency bar, sidebar purchase cards. The current `hero-bg` and `slate-900` sections already trend here — this deepens and unifies them. High contrast with white text. Signals authority and precision, not "tech startup blue."

**Enforcement Red** — `#B91C1C` (Tailwind red-700)
Usage: Already-Exposed mode urgency signals. "In Effect" status badge background, enforcement-active labels, penalty callout borders. Not alarm-red — this is a steady, authoritative signal. Pairs with white text.

**Deadline Amber** — `#D97706` (Tailwind amber-600)
Usage: Deadline-Approaching mode urgency signals. Countdown indicators, "EFFECTIVE SOON" badge, "64 days remaining" text. Amber signals approaching deadline without triggering alarm. Pairs with white or dark text.

**Document White** — `#F8FAFC` (Tailwind slate-50)
Usage: Primary surface color for product cards, document list items, FAQ panels, the "How It Works" section. Clean, uncluttered, high-readability background. Not pure white — the slight warmth reduces harshness.

**Compliance Blue** — `#1E40AF` (Tailwind blue-800)
Usage: Primary action buttons, internal links, CTA buttons, the "Get Documents" primary action. The existing site already uses this well — keep it. It reads as "action" in the compliance and legal visual space.

### Usage Rules

- **Never use two urgency colors together.** Enforcement Red and Deadline Amber should not appear in the same component. Each product belongs to one mode.
- **Body text always on Document White or white backgrounds.** Never dark text on the navy hero — reserve the hero for white text.
- **Compliance Blue is the only button color.** No green "success" buttons, no gradient CTAs. Single action color reduces visual noise.
- **Penalty figures always in Enforcement Red** when appearing in body text — this applies to dollar amounts, violation counts, and enforcement dates. Creates a consistent visual signal that reads "consequence."

---

## Type Pairing

### Display: Inter (Google Fonts)
Used for: H1, H2, H3, product names, CTA buttons, urgency bar text, product card headlines.

**Why Inter:** The current site uses Inter via `font-display`. Keep it. Inter is clean, high-contrast at large sizes, and legible at small sizes — critical for compliance copy where section numbers and penalty amounts must be read accurately. It does not read as either "tech startup" or "law firm" — it reads as "specialist tool."

### Body: System UI stack (native)
`font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
Used for: Body paragraphs, FAQ answers, document list descriptions, legal disclaimers.

**Why system stack:** Fast loading (no additional font request), familiar readability, not competing with Inter for visual attention. The body is content to be read, not displayed.

### Sample heading in new voice:
> **Colorado SB 24-205. 8 Documents. June 30, 2026.**

Rendered as: Inter, 48px (desktop) / 32px (mobile), font-weight 800, Midnight Navy or white depending on background.

### Sample body paragraph:
> If you deploy a high-risk AI system that affects Colorado residents — in employment, housing, credit, healthcare, or insurance — you need these documents before June 30. Each one maps to a specific statutory requirement under C.R.S. § 6-1-1701 et seq. Download instantly after purchase.

Rendered as: System UI, 16px, leading-relaxed, slate-700 on Document White background.

---

## Hero Pattern

### Layout: Full-width, left-aligned, vertically centered. No carousel. No split-image layout.

The current hero is a rotating ProductCarousel with an opacity-10 background image and a screen-reader-only H1. Replace it with a static, text-forward hero. No rotations, no image-primary composition, no "explore our products" passivity.

**Above-the-fold on desktop (1280px):**

```
[Full-width Midnight Navy background — 100vh]

[Left column, 55% width]

  [Eyebrow — Deadline Approaching mode:]
  June 30, 2026  |  Colorado SB 24-205
  [Amber pill badge, small caps, Inter]

  [H1 — 48px, white, Inter 800]
  Your State Has an AI Law.
  Here Are the Documents It Requires.

  [Sub-H1 — 20px, slate-300, Inter 400]
  Colorado. Illinois. NYC. California. Texas.
  Instant download. One-time price. Built from statute.

  [Primary CTA button — Compliance Blue, white text, 18px, Inter 700]
  [ Find Your State's Documents → ]

  [Sub-CTA — slate-400, 14px]
  Already past your deadline? Start here. →

[Right column, 45% width]
  [Urgency panel — semi-transparent dark card]
  Three rows, one per law, alternating Enforcement Red (in force) / Deadline Amber (approaching):

  🔴 Illinois HB3773    In Effect Now    Up to $70K/violation   [Get Documents]
  🟡 Colorado SB 24-205  June 30, 2026   Up to $20K/violation   [Get Documents]
  🔴 NYC Local Law 144  In Effect Now    $500–$1,500/day        [Get Documents]
```

**Above-the-fold on mobile (375px):**
- Midnight Navy full-width
- Eyebrow line (state law + date), small
- H1 at 32px, white, 2 lines max
- Single primary CTA button, full-width
- Urgency panel collapses to a scrollable horizontal strip of urgency badges (Colorado / Illinois / NYC — tap to expand)

**Design principle:** The buyer's first question is "does this site have what I need?" The hero answers it in 3 seconds: law name, deadline or enforcement status, get the documents. The right column urgency panel makes the urgency visible without having to read any prose.

---

## Product Card Pattern

**Current pattern:** Generic card with name, short description, price, document count, "View Product" link. Information-resource shaped — reads like a software feature card.

**New pattern:**

```
┌─────────────────────────────────────────┐
│ [Status pill: IN EFFECT 🔴 / EFFECTIVE SOON 🟡]        │
│                                                         │
│ Colorado SB 24-205                    $449              │
│ [Inter 700, 18px]                                       │
│                                                         │
│ June 30, 2026 — 64 days              8 documents        │
│ [amber text, Inter 500, 14px]        [slate, 14px]      │
│                                                         │
│ Impact assessments, risk policy,                        │
│ consumer notices. Built from statute.                   │
│ [System UI, 13px, slate-600, 2 lines max]               │
│                                                         │
│ [ Get Colorado Documents → ]                            │
│ [Compliance Blue button, full card width]               │
└─────────────────────────────────────────┘
```

**Key changes from current:**
- Status pill is the first element (not a mid-card element)
- Price is right-aligned on the same row as the law name — immediately visible
- Deadline or enforcement status is the second data point after the law name
- Document count is secondary (current cards lead with it)
- CTA is a full-width button with directional copy ("Get Colorado Documents") not a link ("View Product")
- No carousel rotation — cards are in a static grid organized by urgency (Already Exposed first, Deadline Approaching second)

---

## Imagery Direction

### Visual Rule

**The site sells compliance documents.** Every image should show a person — not a concept. A real-looking person (not stock-corporate) in a real-looking workplace (not glass-tower office), doing something that relates to having to deal with a regulatory problem: reviewing a document, working at a laptop in a functional office, in a small business environment. No scales of justice, no gavels, no circuit-board/AI-glow overlays, no futuristic interface mockups, no handshakes.

The images should make a buyer feel "that's someone like me" — not "that's the kind of enterprise company that has a compliance department."

### 5 Unsplash Search Queries

1. `"small business owner laptop desk serious"` — for hero/product page backgrounds. Person at a desk, clearly working, slightly stressed but capable. Not smiling at camera.
2. `"hr manager reviewing documents office"` — for Illinois/NYC product pages (employment AI). Real office, real documents, non-posed.
3. `"restaurant owner laptop"` — for blog CTAs and multi-state content. Signals the non-tech-company buyer — someone using AI tools without thinking of themselves as a tech company.
4. `"healthcare worker computer patient records"` — for Colorado/CA product pages (healthcare decision AI). A person navigating systems in a clinical setting.
5. `"small business compliance documents signing"` — for the "What Happens After You Purchase" section. Shows a person doing something with a document — signing, reviewing — not a stock "success" pose.

### Anti-Patterns

- No AI-glow imagery (neural network visuals, glowing nodes, purple-blue tech overlays)
- No scales of justice / gavel / courthouse imagery
- No all-white-background corporate headshots
- No "diverse team celebrating" stock photos
- No abstract data visualization backgrounds
- No imagery where the person is smiling at the camera

---

## Anti-Patterns (Design-Level)

What the redesign explicitly does NOT use:

- **No rotating product carousel as the hero.** Carousels are browsing-mode UI. A compliance-deadline buyer is not browsing. Static urgency grid replaces the carousel.
- **No blog grid on the homepage.** Blog posts currently feature prominently in the homepage IA. In the redesign, blog posts are in a "Resources" section in the nav — not a homepage feature. The homepage is a store, not a publication.
- **No info-graphic/icon-grid methodology blocks.** The current "How We Build Our Templates" section uses a 4-column icon grid with badge labels. This reads as a SaaS product features section. Trust signals on the new homepage are embedded in product copy (primary source citation, statute verification badge) — not in a standalone explainer section.
- **No "featured in" bars with generic media logos.** The current FeaturedInBar is replaced by the urgency panel (law names, dates, penalties). Social proof through media logos signals "information site." Urgency signals through penalty amounts signal "compliance store."
- **No pastel-blue background sections.** The current `bg-blue-50` methodology section and the `bg-blue-50` "Does This Apply to You?" product section read as informational callout boxes — a pattern borrowed from documentation sites. In the redesign, urgency sections use the Midnight Navy / Enforcement Red / Deadline Amber palette. Blue-50 is retired from urgency contexts.
- **No 8-section homepage.** The current homepage has 8 sections. The redesign has 5 max: Hero (with urgency panel), Products Grid (organized by urgency), Pain/Consequences, How It Works (3 steps, compressed), FAQ (reordered). Information density goes down; conversion clarity goes up.
