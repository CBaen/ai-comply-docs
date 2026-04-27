# Visual Direction — Contestant 3

## The Design Principle

The site currently looks like a research library: dense type columns, blog-grid prominence, carousel hero, soft blues and grays everywhere. The new identity is a compliance store — a place of business. The visual language should feel like a clear, well-organized professional office supply store, not a SaaS product page and not a law firm. Everything earns its place. Nothing decorates.

---

## Color Palette

Five colors. Each has one job.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary (action) | Document Blue | `#1E40AF` | All CTAs, links, status badges, primary buttons. This is the "buy" color. |
| Urgency (deadline) | Deadline Amber | `#B45309` | Any urgency signal: deadline dates, penalty amounts, "IN EFFECT" badges, the Colorado countdown. Never for decoration — only when something requires immediate attention. |
| Surface (body) | Off-White | `#F8FAFC` | Page background. Not pure white — slightly cool, reduces eye strain on long compliance docs. |
| Type (primary) | Near Black | `#0F172A` | All body text, headings, labels. Richer than pure black, reads as authoritative. |
| Verified (trust) | Statute Green | `#15803D` | Only one use: the "Built from enacted statute" verification badge. Borrowed from the mental model of a verified checkmark. Never used decoratively. |

**What the current palette does wrong:** The current hero-bg dark gradient reads as generic SaaS. The amber warning colors are used for methodology steps (fine) but also for everything, which dilutes the urgency signal. Blue is everywhere — buttons, trust bars, feature icons — which means nothing is prioritized.

**What the new palette does differently:** Amber is reserved for urgency ONLY. When a buyer sees amber on this site, it means a deadline or a penalty. That semantic constraint makes the urgency real instead of decorative.

---

## Type Pairing

**Display (headings, product names, prices):** Inter — variable weight, system-level legibility, no-nonsense geometric. Same family the site already uses; keep it. Weights: 700 for H1, 600 for H2, 500 for H3. No italic in marketing surfaces.

**Body (paragraph, labels, descriptions):** Inter — same family. 400 weight, 1.6 line-height, 16px base. Marketing surfaces use slightly larger line-spacing than the blog for breathing room.

**Why one family:** The current site already uses Inter for display (`font-display`) and system stack for body. Collapsing to one family (Inter throughout) is a simplification, not a change — it removes the serif/sans mixing that sometimes happens in the blog. In the "compliance store" identity, a single, clear, no-nonsense face signals professionalism and legibility, not visual interest.

**Heading samples (in the new voice):**

H1 (hero): 
```
Your state passed an AI law.
Here are the documents.
```
— 48px / Inter 700 / Near Black `#0F172A` / line-height 1.1 / mobile: 32px

H2 (product section):
```
8 Documents. Built from C.R.S. § 6-1-1702. $449.
```
— 28px / Inter 600 / Near Black / line-height 1.3

Body paragraph:
```
Colorado SB 24-205 requires deployers of high-risk AI to document their risk management, complete an impact assessment, and provide consumer notices. These are the documents that satisfy those requirements.
```
— 16px / Inter 400 / `#374151` (slightly softer than near-black for body) / line-height 1.65

---

## Hero Pattern (Homepage)

**Layout:** Left-aligned text block, right-side product selector card. Two columns on desktop (60/40 split), stacked single-column on mobile with product selector below the text.

**Current problem:** The product carousel is a visual-first element that requires the buyer to scan through cards before understanding what the site is. It signals "browse this catalog" before the buyer knows whether they're in the right place.

**New hero — above the fold, desktop:**

```
[EYEBROW — Deadline Amber, 12px caps, Inter 600]
COLORADO SB 24-205 DEADLINE: JUNE 30, 2026

[H1 — Near Black, 48px, Inter 700, max 2 lines]
Your state passed an AI law.
Here are the documents.

[SUB-H1 — #374151, 18px, Inter 400, max 3 lines]
Colorado, Illinois, and NYC have each enacted AI laws.
We built the compliance documents those laws require.
Instant download. Statute-verified. $49–$697.

[PRIMARY CTA BUTTON — Document Blue bg, white text, 18px Inter 600, 52px height, 24px horizontal padding, border-radius 6px]
Find My Documents

[SECONDARY LINK — Document Blue text, underline, 14px]
Or browse all 57 compliance packages →

[URGENCY BAND — 4px top-border in Deadline Amber, inside the hero]
```

**Right-side card (desktop only, above fold):**
A compact product selector — not a carousel. Three most urgent products listed as clickable rows:

```
Colorado SB 24-205   [JUNE 30]   $449   →
Illinois HB3773      [IN EFFECT]  $397   →
NYC Local Law 144    [IN EFFECT]  $399   →
```

Each row has: law shortname, status badge (amber for deadline, red for in-effect), price, arrow. Clicking goes directly to the product page. No carousel, no animation, no image — just a clean list of what's most urgent.

**Mobile hero (above the fold):**
```
[EYEBROW — Deadline Amber]
COLORADO: JUNE 30, 2026

[H1 — 32px]
AI law documents.
Your state requires them.

[CTA BUTTON — full width]
Find My Documents

[THREE TEXT LINKS below button]
Colorado SB 24-205 →
Illinois HB3773 →
NYC Local Law 144 →
```

No image above the fold on mobile. First paint is pure text and action.

**What this hero does differently from current:**
- H1 is visible, not screen-reader-only
- No carousel — carousels require scanning before comprehension; this requires nothing
- Urgency eyebrow makes the deadline the first thing the buyer reads
- Product selector on desktop lets the buyer who knows their law skip straight to the product page without scrolling
- Mobile is four lines of text and a button — zero friction before the first action

---

## Product Card Pattern

**Current pattern:** Title / short description / price / status badge / doc count — generic CMS card. The card looks like every other SaaS product catalog card. It does not prioritize the buyer's top question: "Is this my law and what does it cost?"

**New card pattern (applies to product catalog pages and homepage product list):**

```
[STATUS BADGE — top right: red "IN EFFECT" or amber "JUN 30" or gray "COMING SOON"]

[LAW SHORTNAME — Near Black, 18px Inter 600]
Colorado SB 24-205

[ONE LINE — #374151, 14px, describing who it covers]
Deployers of high-risk AI in employment, lending, insurance, healthcare

[PRICE — Near Black, 24px Inter 700, with "one-time" in 12px beside it]
$449  one-time

[DOC COUNT — Statute Green, 12px Inter 500]
✓ 8 documents, built from C.R.S. § 6-1-1702

[CTA — Document Blue text, 14px, with →]
Get Documents →
```

**Card proportions:** 280px wide minimum, 180px height on desktop. White background, 1px border `#E2E8F0`, 8px border-radius, 0 box-shadow (cards that don't shadow read as clean, not cheap). On hover: border color changes to Document Blue `#1E40AF`, 2px. That's the full interaction — no transform, no lift.

**What the new card prioritizes:** Price and doc count are high-visibility (they answer the two questions every buyer has before clicking). Status badge is persistent (buyers scan for "in effect" or "deadline" before reading the name). Description is one line, not three — it names who it covers, not what the law is.

---

## Imagery Direction

**The visual rule:** Show people who own businesses, not "compliance professionals." No stock-corporate conference room imagery. No scales of justice, no gavels, no AI-glow visualizations, no abstract data visualizations. No team-of-five-looking-at-a-whiteboard. The buyer is a person running a business who just found out they have a compliance problem — they should see themselves, not a legal department.

**Five Unsplash search queries:**

1. `"small business owner desk paperwork focused"` — A person at a desk working through documents. Real, unglamorous. The target buyer.
2. `"HR manager laptop office window light"` — The employment-decision buyer. Natural office light, person working, not posed.
3. `"Colorado mountains office window view"` — For the Colorado product page hero image. Grounds the state-specific content without being literal.
4. `"restaurant owner office phone serious"` — For the homepage or blog post imagery. A small business owner who is not a lawyer and is not happy about this situation.
5. `"contract document signing desk pen"` — For the product page "What You Get" section. Real documents, real desk, real action. Not a glowing tablet.

**What this imagery does:** Every image shows a person in a working context — not aspirational, not corporate, not abstract. The buyer looking at these images should feel recognized, not inspired. Compliance documents are not an exciting purchase. The imagery acknowledges that.

**What this imagery does NOT do:**
- No AI-glow / circuit board / neural network visuals
- No courtroom / gavel / scales imagery
- No team-of-executives-in-conference-room
- No generic handshake photography
- No diverse-group-smiling-at-laptop

---

## Anti-Patterns

**What the current site does that the redesign explicitly removes:**

1. **Hero product carousel.** Carousels require the buyer to do work before they understand what the site is. Replace with the two-column layout: urgency text left, three-row product quick-selector right.

2. **Screen-reader-only H1.** The H1 is the single most important piece of copy on the page for both buyers and search engines. It must be visible.

3. **Blog grid prominence on the homepage.** The blog is a research resource. It should not be on the homepage. It belongs in a "Resources" section accessible from the nav or footer. Featuring it on the homepage signals "information site."

4. **Dense methodology section above the fold.** "How We Build Our Templates" is important trust content — but it belongs BELOW the first purchase decision moment, not as the third section from the top. Trust content serves conversion; it should appear after the buyer has decided to stay, not before they've decided what the site is.

5. **"Featured In" bar with a single reference.** The current FeaturedInBar appears to reference one or two sources. One bar with one source is not a trust signal — it's a question mark. Either populate it with genuine, verifiable mentions or remove it and put the trust budget into statute citations.

6. **Info-graphic step blocks for "How It Works."** The three-step "Choose / Pay / Download" graphic is fine but positioned incorrectly — it comes before the "What Happens If You Don't Comply" section, which means the buyer sees the happy path before they understand the urgency that motivates the purchase. Move the penalty section above "How It Works."

7. **Lifestyle imagery that generic-ifies.** The current "team-compliance-meeting" and "healthcare-corridor" images on the homepage feel like stock selections for a generic SaaS company. They don't show the actual buyer (a stressed SMB owner, not a compliance department).

---

*This spec is implementable in Next.js 16 / Tailwind 4 without any new dependencies. All colors are Tailwind-compatible hex values. All type is Inter (already loaded). The hero layout is a CSS grid change, not a component rewrite. The product card is a style update to the existing card component.*
