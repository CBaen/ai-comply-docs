# Visual Direction — Round 2
## Contestant 1

---

## Design Thesis

The site currently looks like a SaaS knowledge base: dark hero carousel, dense explainer paragraphs, blog grid prominent, screen-reader-only H1. That visual language signals "information resource" before the buyer reads a word.

The new visual direction is **compliance store, not compliance library.** Think: a legal supply company that knows what it stocks and displays it with confidence. Clean. High-contrast. Product-first. Every above-fold pixel earns its place by reducing friction between "I have a deadline" and "I have my documents."

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary / Brand | Navy | `#1B2D4F` | Navigation background, H1 text on light, primary button fill. The authority color. Not black — warmer, more trustworthy. |
| Action / CTA | Signal Blue | `#2563EB` | All primary CTAs, links, active state. High-contrast on white. Tailwind `blue-600`. Already in the site's existing system — keep it for continuity. |
| Urgency | Ember Red | `#DC2626` | Deadline badges ("June 30, 2026"), penalty callout backgrounds, status badges for "IN EFFECT" laws. Not scarlet-alarm — controlled urgency. Tailwind `red-600`. |
| Success / Verified | Verified Teal | `#0D9488` | The ".gov verified" badges, document checkmarks, "BUILT FROM STATUTE" trust signal. Signals precision and integrity, not marketing-green. Tailwind `teal-600`. |
| Surface | Off-White | `#F8FAFC` | Page backgrounds, card surfaces. Not pure white — one degree of warmth. Tailwind `slate-50`. |

**What the palette does:** Navy + Signal Blue owns authority. Ember Red owns urgency — used sparingly so it lands when it appears. Verified Teal owns integrity — the differentiating claim (statute-sourced, .gov verified) gets its own semantic color. Off-White prevents the clinical flatness of pure white on a legal/compliance site.

**What leaves:** The existing gradient overlays and dark hero with opacity-10 background imagery. These read as "tech startup." The new hero is a high-contrast text-first layout on navy.

---

## Type Pairing

**Display (headings H1–H3):** `Inter` — weight 700–800. Already a de-facto standard for authority+legibility. If you want a stronger identity: `DM Sans` at 700 (rounder, slightly less corporate, still high-legibility). Google Fonts, no latency penalty at this traffic volume.

**Body (paragraphs, UI text, labels):** `Inter` at weight 400–500. Same family — reduces font requests. The legal/compliance context rewards legibility over expressiveness. Do not introduce a serif for body; it will read as law firm.

**Mono (statute citations, section numbers):** `JetBrains Mono` or `system-ui` monospace. When a section number appears ("775 ILCS 5/8A-104"), it should render in mono to signal: this is a primary source citation, not marketing copy. One inline style — `font-mono text-sm text-teal-700`.

### Sample heading rendered:

> **June 30, 2026.**
> *Colorado's AI law takes effect. The documents you need are here.*

The period at the end of a date as an H1 is intentional — it signals finality, not an ellipsis.

### Sample body paragraph:

> HB3773 is in effect now. If you use AI in hiring, promotion, or performance reviews in Illinois, you need employee notices, an AI system inventory, and an impact assessment framework. This package has all three — built from Public Act 103-0804, not from a summary of it.

Short sentences. No throat-clearing. Product mentioned in sentence two.

---

## Hero Pattern (Homepage Above the Fold)

**Layout:** Left-aligned text block, 55% width on desktop. Right side: product card cluster (3 cards, stacked at slight angle — suggests a physical file stack without being cliché). On mobile: stacked, text first, cards collapsed to a single featured card.

**Elements in order (top to bottom, left column):**

1. **Eyebrow** — small caps, Ember Red, `text-xs tracking-widest font-semibold uppercase`
   > "AI LAWS ARE IN EFFECT"

2. **H1** — Navy, Inter 800, `text-4xl md:text-6xl leading-tight`
   > "Your state passed an AI law. We built the documents."

3. **Deadline band** — inline pill-stack, tight spacing. Three pills side by side:
   - `[● IN EFFECT]` Ember Red background — Illinois, NYC, Texas
   - `[● JUNE 30, 2026]` Amber background — Colorado

4. **Primary CTA** — Signal Blue button, full-width on mobile, auto on desktop
   > "Get My Compliance Documents →"

5. **Sub-CTA** — underlined text link, smaller
   > "Not sure which law applies? → Find yours"

6. **Trust strip** — 3 items in a row, small caps, Verified Teal checkmarks:
   - ✓ Built from enacted statute text
   - ✓ .gov primary sources
   - ✓ Instant download — no subscription

**What's NOT in the hero:**
- No carousel (current hero is a product carousel — remove it)
- No background image (current has opacity-10 hero image — remove it)
- No "How We Build Our Templates" section in the hero
- No FeaturedInBar immediately after hero (move to bottom of page or remove)

**Energy:** Dense but not cluttered. Every element earns its place. The H1 is the biggest thing on the page. The deadline pills create urgency without being alarmist. The CTA is one click.

---

## Product Card Pattern

**Current problem:** Cards look like generic CMS tiles — thumbnail, law name, price, buy button. They don't signal urgency or specificity.

**New card pattern:**

```
┌─────────────────────────────────────────────┐
│  [● IN EFFECT]  or  [● JUNE 30, 2026]      │
│                                              │
│  Illinois HB3773                            │
│  AI in Employment Decisions                 │
│                                              │
│  Penalty: Up to $70,000 per person         │
│  Documents: 7   Format: PDF, instant        │
│                                              │
│  $449                                       │
│  [Get This Package ─────────────────── →]  │
└─────────────────────────────────────────────┘
```

**Card rules:**
- Status badge is the first visual element — buyer knows immediately if this law is active
- Law name in Inter 700, 18px — not a marketing headline, the actual law name
- Penalty callout in `text-sm font-mono text-ember-red` — this is a fact, not a scare tactic
- Price prominent, one-time — no "per month," no "starting at"
- CTA: "Get This Package" — specific verb, not generic "Browse" or "Learn More"
- No hero imagery on the card — the law name IS the identity signal

---

## Imagery Direction

**Visual rule:** This site does not sell a lifestyle. It sells documents. Photography should show the physical reality of business documentation — paper, screens, hands, real office environments — without stock-corporate staging (no handshakes, no gavels, no scales of justice, no glowing AI brain).

**5 Unsplash search queries:**

1. `"small business owner desk laptop paperwork"` — for blog post headers. Real desks, real people, ambient work light. Not posed.
2. `"legal document signing office"` — for product page header. The moment of documentation. No courtroom imagery.
3. `"HR manager computer hiring"` — for employment-law product pages (Illinois, NYC). Shows the use case without staging it.
4. `"small business storefront owner"` — for homepage lifestyle section. Ground the buyer identity — this is the person the site serves.
5. `"state capitol building exterior"` — for state-law blog post headers where a building conveys authority without courtroom cliché. Colorado, Texas, Illinois state capitols specifically.

**Photo selection rules:**
- No stock handshakes, no scales of justice, no gavels
- No AI glow / neural network visualizations / circuit board overlays
- No all-white sanitized office environments (they read as enterprise)
- No fal.ai generation — Unsplash only
- People shown should look like mid-size business owners, not Fortune 500 executives
- Natural light preferred over studio lighting
- Photos should be cropped to show context (room, desk, window) not just faces

---

## Anti-Patterns (Visual Patterns This Redesign Does NOT Use)

1. **Homepage hero product carousel** — signals catalog/library. Replace with text-first hero + static product card cluster.
2. **Dense alternating-color info-block sections** — the current homepage has 8 sections with alternating backgrounds (white / blue-50 / slate-50 / white / slate-900). This reads as a SaaS feature page. New IA has fewer sections, tighter visual hierarchy.
3. **Blog grid as homepage feature** — blog posts should not be the visual centerpiece of the homepage. They are not the product. Move blog to a secondary path.
4. **FeaturedInBar immediately post-hero** — a "featured in" bar positioned this high suggests the site's primary value is media coverage, not the product. Move below the fold or to a trust section.
5. **Screen-reader-only H1** — the current H1 is `sr-only`. A page whose only H1 is invisible to the buyer is an information page, not a product page.
6. **Long explainer sections above the fold** — "How We Build Our Templates" as the second homepage section positions the site as a methodology explainer. Methodology belongs in a trust section lower on the page, after the buyer has already committed to looking.
7. **Generic icon grids** — the current "How It Works" uses numbered step icons with generic descriptions. Steps belong on a product page (explaining the purchase process) not on the homepage.
8. **Info-graphic-style penalty section** — the current pain section is three colored cards with icons. This softens what should be a direct statement. Replace with statute-exact prose + citation.
