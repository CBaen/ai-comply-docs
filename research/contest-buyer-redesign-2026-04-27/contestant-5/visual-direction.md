# Visual Direction — Contestant 5

---

## The Design Signal

The site currently reads as an editorial resource: product carousel with navigation arrows, blog grid as a primary homepage feature, dense prose sections alternating with lifestyle photography. These are information-site patterns. A compliance solutions provider looks different: it looks like the thing is already organized, the price is already clear, the path from "I have a problem" to "I have the documents" takes 5 minutes.

The visual direction is: **professional urgency, not editorial warmth.** Dark urgency zones where deadlines live. Clean white product cards with clear pricing. Minimal decoration. No carousels. No blog-grid above the fold.

---

## Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Slate Navy | `#1E293B` | Primary text, nav background, footer, CTA buttons |
| Accent | Signal Blue | `#2563EB` | Links, active state CTAs, the "get compliant" button |
| Urgency | Deadline Red | `#DC2626` | Deadline date labels, penalty amounts, urgency callout backgrounds (sparingly) |
| Success / Verified | Verified Green | `#16A34A` | "Verified against statute" badges, download confirmation states |
| Surface | Off-White | `#F8FAFC` | Page background, card backgrounds (not pure white — too clinical) |

**Usage rules:**

- `#1E293B` (Slate Navy): the brand's primary weight. Headlines, nav, buttons. Never use it at low opacity on colored backgrounds — it loses the professionalism signal.
- `#2563EB` (Signal Blue): all clickable elements. One CTA per section, never two Signal Blue buttons competing on the same screen zone.
- `#DC2626` (Deadline Red): used ONLY for deadline dates and penalty amounts. Not for headers, not for decorative elements. Its rarity is what makes it land. A red "June 30, 2026" in a sea of navy and off-white reads as urgent without being alarmist.
- `#16A34A` (Verified Green): the trust signal. Appears on the statute-citation badge ("Verified against SB 24-205"), the download confirmation screen, the ESIGN note. Never used for promotional emphasis.
- `#F8FAFC` (Off-White): page background. Not pure `#FFFFFF` — pure white reads as blank/unfinished at full-page scale. The slight warmth in `F8FAFC` reads as deliberate.

**What is not in the palette:** Purple, orange, teal, gradient overlays. The existing site uses some purple-leaning accent shades that signal "tech startup." This is a compliance services provider. The palette is closer to a law firm's secondary brand than a SaaS startup's.

---

## Type Pairing

**Display font:** [Inter](https://fonts.google.com/specimen/Inter) — already available in the Next.js stack, likely in use. Use the semibold (600) and bold (700) weights for all marketing headlines. Inter at 700 reads as professional without the stiffness of serif display faces that would pull toward "law firm parody."

**Body font:** Inter 400 (regular). Consistent with the display stack — avoids the "two-font complexity" that reads as editorial.

**Alternative display if Inter feels too generic:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — slightly more geometric, slightly more distinctive at large headline sizes, still professional. Worth evaluating.

### Heading sample (H1 on homepage hero):

> **Your state has an AI law.**
> **We built the documents that comply with it.**

Rendered at: 48px desktop / 32px mobile, Inter 700, `#1E293B`, line-height 1.1. No text-shadow, no gradient, no decorative stroke.

### Body paragraph sample:

> Colorado SB 24-205 takes effect June 30, 2026. If your business uses AI in employment, housing, credit, healthcare, or insurance decisions in Colorado — you need a risk management program, impact assessment, and consumer notices in place by that date.

Rendered at: 16px, Inter 400, `#334155` (slightly lighter than the headline navy, still readable), line-height 1.65. Max-width 640px for readability.

---

## Hero Pattern (Homepage)

**Layout:** Left-weighted, two-column on desktop (60/40 split). Full-width on mobile. Not centered — centered heroes read as "landing page brochureware." Left-weighted reads as assertive and product-forward.

**What is above the fold on desktop (top to bottom in the 60% left column):**
1. **Eyebrow label** (small, uppercase, tracking-wider): `STATE AI COMPLIANCE DOCUMENTS` — 12px, Signal Blue `#2563EB`, letter-spacing 0.1em
2. **H1** (two lines, Inter 700, 48px): "Your state has an AI law. / We built the documents that comply with it."
3. **Urgency band** (not a sentence, a horizontal strip of deadline facts): `Colorado: June 30, 2026 · Illinois: now · NYC: now · Texas: now` — each state name a link to its product page. 14px, `#DC2626` for the dates, `#1E293B` for the state names. Pill-shaped, no border box needed.
4. **Primary CTA button**: "Find My Compliance Documents →" — Signal Blue `#2563EB`, white text, 18px, padding 16px 32px, border-radius 8px
5. **Trust strip** (below CTA, small text row): `From $49 · Instant download · Statute-verified · No subscription`

**What is in the right 40% column:**
A single product card from the highest-urgency product (Colorado SB 24-205, given the June 30 deadline). Not a carousel — one card, stationary. The card shows: law name, status badge (EFFECTIVE SOON), deadline date in red, price, "Get documents →" button. This is the "aisle 3, bottom shelf" moment. The product is visible immediately without the buyer having to scroll or rotate anything.

**What is above the fold on mobile:**
H1 at 32px. Urgency band (3 states, scrollable if they overflow). Primary CTA. Price trust strip. The product card collapses to a horizontal compact strip below the fold.

**Spacing energy:** Dense, not airy. The current site has generous padding that reads as content-at-leisure. This hero compresses vertical space — the buyer can see the headline, the urgency band, the CTA, and a price in one viewport. No white space that a buyer could interpret as "scroll for more information."

**What is NOT in the hero:**
- No carousel
- No hero background photography (the current 10% opacity landscape photo adds no information and softens the urgency signal)
- No FeaturedInBar component above the hero (currently renders between the nav and the hero, pushing the H1 further down)
- No animated elements

---

## Product Card Pattern

The current product cards (in the carousel / product listing) look like generic CMS cards: title, description text, price, button. They don't signal urgency or specificity.

**New card design spec:**

```
┌─────────────────────────────────────────┐
│ [STATUS BADGE: IN EFFECT / EFFECTIVE    │ ← 12px pill badge, colored per status
│  SOON]                    [STATE]        │   Right: state abbreviation, 12px gray
│                                         │
│ Colorado SB 24-205                      │ ← 18px, Inter 700, #1E293B
│                                         │
│ Deadline: June 30, 2026                 │ ← 14px, #DC2626 (red only for deadline)
│                                         │
│ Risk management program, impact          │ ← 13px, #475569, max 2 lines, truncated
│ assessment, consumer notices            │
│                                         │
│ $449                    7 documents     │ ← Price: 24px bold. Doc count: 13px gray
│                                         │
│ [Get documents →]                       │ ← Signal Blue button, full card width
└─────────────────────────────────────────┘
```

**Key changes from current:**
- Status badge is the first element (urgency signals first)
- Deadline date appears in red on the card itself (not just on the product page)
- Document count is a trust signal, not a feature list (buyers want to know how much they're getting)
- No description paragraph — the card description is replaced by what you get (specific document names in a 2-line truncated list)
- CTA button spans full card width (current cards have small inline links)

---

## Imagery Direction

**The visual rule:** Real people at real work — not staged, not symbolic. No scales of justice, no gavels, no AI-glow network diagrams, no faceless silhouettes "representing" diversity. The buyer is a business owner at a desk. Show that person's world — specific, unglamorous, recognizable.

**5 specific Unsplash search queries:**
1. `"small business owner laptop paperwork"` — the person at a desk with documents, not a MacBook-in-a-coffee-shop shot
2. `"HR director office documents signing"` — the hire/fire/compliance context without the courtroom trapping
3. `"small team meeting documents table"` — 2–3 people, not a 20-person conference room, not all white-collar
4. `"restaurant owner paperwork back office"` — the non-tech SMB who also uses AI tools (hiring software, scheduling apps)
5. `"warehouse manager laptop small business"` — operations-side buyer, not just HR

**What to filter for in Unsplash selection:**
- Natural light or office-standard light — not studio lighting
- Actual documents visible (paper or screens) — not just people looking thoughtful
- People looking at work, not at camera — no posed "I'm a successful business owner" energy
- Diverse subjects — the buyer base is not a homogeneous demographic

**What to avoid:**
- Stock-corporate: handshakes in lobbies, people in suits pointing at whiteboards
- Legal-symbolic: gavels, scales, legal pads with "LAW" written on them
- AI-themed: glowing circuits, robot hands, network diagrams, abstract blue spheres
- Hero-scale lifestyle: full-width photos where the photo IS the content — imagery here is supporting, not leading

---

## Anti-Patterns (what this redesign explicitly does NOT use)

1. **Product carousel with navigation arrows.** The current homepage carousel requires the buyer to interact before they see more than one product. A buyer arriving with a specific state deadline in mind doesn't want to rotate through options — they want to find their state immediately. Replace with a static grid of 4–6 urgency-ordered product cards.

2. **Blog grid as homepage feature.** The current homepage includes a blog section ("What's New in AI Compliance") with 3–4 article cards. This is an information-site pattern. The buyer who lands on the homepage has a compliance deadline, not a reading list. Blog content is demoted to the Resources section in the nav, not featured on the homepage.

3. **FeaturedInBar above the hero.** "Featured in" bars signal credibility, but only after the buyer knows what the site is. Currently the FeaturedInBar renders before the H1, which means the buyer sees logos before they know what they're looking at. Moved below the hero, after the buyer has seen the offer.

4. **Hero background photography.** The current hero uses a landscape photo at 10% opacity behind a dark gradient. This is a visual gesture that adds nothing — the photo is invisible. Either use no hero background (clean dark navy) or use a single, specific product-adjacent image in the 40% right column per the hero pattern spec above. Not both.

5. **8-section homepage scroll depth.** The current homepage has 8 sections before the footer: hero → FeaturedInBar → products → methodology → how it works → pain section → FAQ → final CTA. This is a research-resource architecture — it assumes the buyer wants to learn before they buy. The new IA reduces this to 5 sections (see `ia-proposal.md`).

6. **Gray text on gray backgrounds for trust signals.** The current methodology section has good content but uses gray text on `bg-blue-50` that reads as secondary. Trust signals (statute verification, instant download, Stripe payment) need to be visually equal to the product name and price, not footnoted.

7. **"How It Works" as a full homepage section.** Currently: a 3-step numbered section that explains the process. This is an information-site section. On a solutions-provider site, the process is secondary to the outcome. If it stays, it compresses to 3 icons + 3 short phrases inside the product card or purchase flow — not a standalone homepage section.
