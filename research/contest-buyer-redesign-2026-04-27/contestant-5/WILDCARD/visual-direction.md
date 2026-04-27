# Visual Direction — Wildcard Synthesis

## Color Palette

The two-mode frame requires two distinct urgency registers in the visual layer. The palette is designed to make mode immediately legible without explanation.

| Name | Hex | Usage |
|---|---|---|
| **Deadline Amber** | `#D97706` | Deadline Approaching mode — banners, badges, countdown labels, status pills for effective-soon laws |
| **Enforcement Red** | `#B91C1C` | Already Exposed mode — banners, badges, AlsoExposedStrip headers, in-effect status pills |
| **Slate Navy** | `#1E293B` | Primary text, H1, body copy, sidebar purchase card background |
| **Signal Blue** | `#2563EB` | Primary CTA buttons, active links, verification badges |
| **Verified Green** | `#16A34A` | "Verified against enacted statute" badge only. Nothing else. Green means one thing: primary source confirmed. |
| **Off-White** | `#F8FAFC` | Page background, card backgrounds |

**Color rules:**
- Deadline Amber (`#D97706`) means one thing: future deadline approaching. Never use for anything else — not for warnings, not for secondary CTAs.
- Enforcement Red (`#B91C1C`) means one thing: law is in force, exposure is current. Never use for general urgency or emphasis.
- Signal Blue (`#2563EB`) is the CTA color. Every primary action button uses this.
- Verified Green (`#16A34A`) is the trust color. It appears only on the "Verified against enacted statute text" badge and the check marks in the sidebar purchase card.
- These rules make the color system legible to a panicked buyer who is scanning for confirmation. When they see amber, they know there's a deadline. When they see red, they know they're already exposed. When they see green, they know a fact was checked.

---

## Typography

**Display / headings:** Inter 700 (Google Fonts). Used for H1, H2, deadline banners, urgency band, product card law names.

**Body:** Inter 400. Used for all body copy, FAQ answers, product descriptions.

**Captions / labels:** Inter 600, uppercase, `tracking-wider`. Used for eyebrows, status badge labels, nav labels, form labels.

**Heading sample (H1):**
```
Your state has an AI law.
We built the documents.
```
Inter 700, `text-4xl md:text-6xl`, Slate Navy `#1E293B`, `leading-tight`.

**Body sample:**
```
Colorado SB 24-205 violations are enforced as deceptive trade practices
under the Colorado Consumer Protection Act. The Attorney General has
exclusive enforcement authority.
```
Inter 400, `text-base`, `#374151`, `leading-relaxed`.

---

## Hero Pattern

**Layout:** Left-weighted, 60/40. Left column: eyebrow + H1 + urgency band + CTAs. Right column: static product card (highest-urgency product — Colorado before June 30, then the in-effect law with the highest buyer volume after).

No carousel. No animation. The right-column card is stationary and shows one product with: status badge (amber or red), law name, price, deadline or enforcement status, and a direct CTA button. The buyer who arrives knowing their state can navigate directly from the hero without scrolling.

**Elements above the fold (desktop, top to bottom in left column):**

1. **Eyebrow** — `text-sm font-semibold uppercase tracking-wider`, Deadline Amber or Enforcement Red depending on which mode leads.
   ```
   COLORADO: JUNE 30, 2026  ·  ILLINOIS: IN EFFECT  ·  NYC: IN EFFECT  ·  TEXAS: IN EFFECT
   ```
   All four states named. The panicked Texas buyer at 11pm reads TEXAS before the H1. State names before any other copy.

2. **H1** (visible — not sr-only) — Inter 700, `text-4xl md:text-6xl leading-tight`, Slate Navy.
   ```
   Your state has an AI law.
   We built the documents.
   ```

3. **Urgency band** — four status pills, two per row on mobile. In-effect states (red) before deadline state (amber). `text-sm font-bold px-4 py-2 rounded-md`.
   ```
   [■ ILLINOIS — IN EFFECT]  [■ NYC — IN EFFECT]
   [■ TEXAS — IN EFFECT]    [■ COLORADO — JUNE 30]
   ```

4. **Primary CTA** — Signal Blue, `px-8 py-4 text-lg font-bold`.
   ```
   Find My Compliance Documents →
   ```
   Links to `/compliance-deadline-by-state`.

5. **Sub-CTA** — underlined text link, `text-sm`.
   ```
   Not sure which law applies? → See deadlines by state
   ```

6. **Trust strip** — three items, Verified Green checkmarks, `text-sm`.
   ```
   ✓ Built from enacted statute text  ✓ .gov primary sources  ✓ Instant download — no subscription
   ```

**Mobile:** Left column content stacks vertically. Right column product card moves below the CTAs. Urgency band: 2×2 grid, all four pills visible above fold.

---

## Product Card Pattern

Each product card in the homepage grid, product index, and AlsoExposedStrip uses this pattern:

```
┌─────────────────────────────────────────┐
│ [STATUS BADGE]  [LAW NAME]              │
│ ─────────────────────────────────────── │
│ [DEADLINE OR ENFORCEMENT STATUS]        │
│                              [PRICE]    │
│ ─────────────────────────────────────── │
│ [Document count] · [Statute citation]   │
│                                         │
│ [ Get [State] Documents → ]             │
└─────────────────────────────────────────┘
```

- **Status badge:** `text-xs font-bold px-2 py-0.5 rounded` — Deadline Amber for `effective-soon`, Enforcement Red for `in-effect`.
- **Law name:** Inter 700, `text-base`. Abbreviated (SB 24-205, not "Colorado Artificial Intelligence Act").
- **Deadline / enforcement status:** Red for in-effect (`"In Effect Now"`), Amber for deadline (`"June 30, 2026"`). `text-sm font-semibold`.
- **Price:** Inter 700, `text-lg`, Slate Navy. Right-aligned. Visible without hovering.
- **Document count + citation:** `text-xs text-gray-500`. Compact credibility signal.
- **CTA button:** Full-width, Signal Blue, `font-bold`. "Get [State] Documents →".

**What the card does NOT have:**
- No image. No icon. No illustration.
- No description paragraph. The law name and document count are sufficient.
- No "Learn More" link. Every card goes directly to the product page with a transaction verb.

---

## Imagery Direction

The site sells documents, not feelings. Imagery should show working humans in their actual context — not lawyers, not AI visualizations, not scales of justice.

**Five Unsplash search queries:**
1. `"small business owner laptop desk paperwork"`
2. `"HR manager reviewing documents office"`
3. `"hiring manager computer desk employee records"`
4. `"small restaurant owner office paperwork"`
5. `"business owner reviewing forms coffee shop"`

**Image rules:**
- Real people in real work contexts. No stock-corporate models in suits.
- No AI-glow, circuit-board overlays, or "technology" stock imagery.
- No legal symbolism (gavels, scales, courtrooms).
- No staged meeting-room group photos.
- Images are optional on marketing surfaces. Product pages don't need them. The documents and the deadline are the content.

---

## Anti-Patterns (explicitly forbidden in this redesign)

- **Product carousel in the hero.** Replaced by a static product card in the right column.
- **FeaturedInBar above the fold.** Moved below fold or removed. "Featured in media" as position 2 signals information site.
- **Blog grid on the homepage.** Blog moved to Resources in nav. Not featured on homepage.
- **Icon grid for methodology.** "How We Build Our Templates" 4-column icon grid removed. Methodology embedded as trust signal in product cards and sidebar.
- **Screen-reader-only H1.** H1 must be visible. The carousel is not the hero.
- **Generic colored penalty cards.** Replaced by statute-exact penalty columns with citations.
- **Carousel requiring interaction.** Static layouts only. The buyer in a panic state should not have to click through slides to find their state.
- **Dual-color urgency band (red for in-effect, amber for Colorado) without ordering logic.** In-effect states lead the urgency band — they represent current exposure, not future deadline. Colorado/deadline states follow. Never mix the order.
- **"Discover / unlock / explore" verbs anywhere on marketing surfaces.**
