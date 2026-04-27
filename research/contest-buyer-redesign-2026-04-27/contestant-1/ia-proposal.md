# Information Architecture Proposal — Round 2
## Contestant 1

---

## The Core IA Problem

Today's site navigation is: **Home / Products / Blog / FAQ / About**

Blog sits at position 3 — more prominent than it deserves for a site that needs to sell products, not educate researchers. The current homepage has 8 sections arranged in a pattern that looks like a SaaS knowledge base launch page: hero carousel, featured-in bar, product carousel, methodology explainer, how-it-works steps, penalty section, FAQ, final CTA. That is a research-resource architecture. A buyer who lands there is given every reason to read and no immediate path to purchase.

The IA overhaul has two layers:
1. **Navigation** — reorder and relabel to signal "compliance store"
2. **Homepage section order** — reduce to 5 sections, each earning its place

---

## New Navigation Order

### Desktop Nav (left to right):

```
[AI Compliance Documents]    Find My Documents    States    About    [Get Documents →]
```

| Label | Route | Change | Rationale |
|-------|-------|--------|-----------|
| **Find My Documents** | `/deadline-checker` (new) | Replaces "Products" | Transactional verb; the buyer's first question is "which law applies to me" not "browse products" |
| **States** | `/products` filtered by state | Replaces "Products" fallback | Buyers think in states, not in "products." A state-indexed page lets them self-route instantly |
| **About** | `/about` | Same | Moved to 3rd position; not a primary navigation item |
| **[Get Documents →]** | `/deadline-checker` | CTA button in nav | Hard right, blue filled button. Not a dropdown — a transactional entry point |

**What's removed from primary nav:**
- Blog (moved to footer "Resources" section)
- FAQ (content folds into product pages and the /deadline-checker page)

**Blog demotion rationale:** Blog is the site's top traffic driver — but that traffic is informational readers, not buyers. Keeping blog in primary nav reinforces the "information site" brand signal. Moving it to footer Resources doesn't kill the SEO value (Google follows the link regardless of nav position) but it removes the visual signal that this site is primarily a content resource. Buyers who want the blog can find it in Resources. Researchers who were the primary blog audience are not the site's target buyer.

### Mobile Nav:

```
[Find My Documents]
[Colorado — June 30, 2026]
[Illinois — In Effect]
[NYC — In Effect]
[Texas — In Effect]
[More States]
[About]
```

Mobile nav opens to direct state links — because mobile buyers typically know which state they're in. The state dropdown pattern (direct links to the four highest-urgency product pages) eliminates two navigation steps.

---

## Homepage Section Order (New)

**Current: 8 sections.** Hero carousel / FeaturedInBar / ProductCarousel / How We Build Our Templates / How It Works / Pain Section / FAQ / Final CTA

**Proposed: 5 sections.** Every section has one job. No section explains what was already stated in the previous section.

---

### Section 1: Hero (THE only above-fold content)

**Job:** Confirm the buyer is in the right place. Offer the transaction. Nothing else.

**Content:**
- Eyebrow: "AI LAWS ARE IN EFFECT" (Ember Red, small caps)
- H1: "Your state passed an AI law. We built the documents."
- Deadline pills: [● Colorado: June 30, 2026] [● Illinois: In Effect] [● NYC: In Effect] [● Texas: In Effect]
- Primary CTA: "Get My Compliance Documents →" (links to /deadline-checker)
- Sub-CTA: "Not sure which law applies? Find yours →" (also links to /deadline-checker)
- Trust strip (3 items): ✓ Built from enacted statute text / ✓ .gov primary sources / ✓ Instant download

**What's removed vs. today:** Product carousel, FeaturedInBar, background image. The hero is text + pills + buttons + trust strip. No imagery in the hero.

**Why this section is first:** The buyer who lands here has a question: "is this site for me?" The H1 answers it in 11 words. The deadline pills answer "is my state covered?" The CTA answers "what do I do now?" Nothing else needs to be above the fold.

---

### Section 2: Products by State (replaces ProductCarousel + "How It Works")

**Job:** Put the products in front of the buyer, organized the way buyers think — by state.

**Content:**
- Section heading: "Your state. Your documents." (H2, Inter 700)
- State cards in a 2-column grid on desktop (4 columns on large screens), each card using the new product card pattern:
  - Status badge
  - State law name + short name
  - Penalty one-liner
  - Price
  - "Get This Package" CTA
- Order: highest urgency first (Colorado by deadline proximity, then Illinois/Texas/NYC all "in effect," then California, then multi-state bundles)
- "More states →" link at the bottom leading to the full products page

**What's removed vs. today:** The current "How It Works" 3-step section lives here in condensed form as a single inline callout: "Answer 8 questions about your AI use. Pay once. Download immediately." — not a full section, just copy below the first product card.

**Why this section is second:** The buyer came here to buy something. Put the products second, not fourth. Every section before the products is friction.

---

### Section 3: Penalty Reality (replaces the Pain Section)

**Job:** Make the non-compliance cost concrete. Not to scare — to complete the buyer's risk math.

**Content:**
- Section heading: "This is what non-compliance costs." (H2)
- Three statute-sourced statements, one per column, in the new voice:
  - Illinois: "Up to $70,000 per aggrieved person. Already in effect. ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2266&ChapterID=64))"
  - Colorado: "Up to $20,000 per consumer affected — enforced as a deceptive trade practice under [C.R.S. § 6-1-112](https://leg.colorado.gov/bills/sb24-205). Effective June 30."
  - Texas: "Up to $200,000 per violation. In force since January 1. ([HB149, TRAIGA](https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149)) [UNVERIFIED — requires direct capitol.texas.gov statute read]"
- Below the three columns: "These penalties are per violation — not per incident. If your AI system processed 50 applicants, that's potentially 50 violations."

**What's removed vs. today:** The three colored icon cards ("Employee Complaints / State Enforcement / Cost of Starting from Scratch"). Replace with direct statute quotes.

**Why this section is third:** The products come first (section 2) — the buyer sees the solution before the problem. The penalty section lands harder after the buyer has already seen there's a straightforward resolution available. This is the structure Contestant 4 validated: the solution visible before the consequence.

---

### Section 4: How It Works + Methodology (collapsed from two sections into one)

**Job:** Remove the final objection. Answer "how does this actually work" and "why should I trust this" in one compact section.

**Content:**
- Left column (2/3 width): Three-step process
  1. Choose your state's law (or use the deadline checker)
  2. Answer 8–12 questions about your AI tools and decisions
  3. Pay once, download immediately — PDFs with fillable fields
- Right column (1/3 width): Methodology trust block
  - "Every template is built from the enacted statute text."
  - "Not a summary. The actual law. Fetched from the .gov source."
  - "If implementing rules haven't published yet, we say so. No false confidence."
  - Link: "Read more about our methodology →" (/about)

**What's removed vs. today:** The current "How We Build Our Templates" section with its 4-step grid (Read enacted statute / Verify citations / Flag pending / Templates not legal opinions). Too much process explanation too early. Condense to the right column here.

**Why this section is fourth:** By this point the buyer has seen the products, seen the penalties, and is deciding whether to trust the source. The methodology section answers that question. If it came earlier (current position: section 2 of 8), it feels like defensive justification. If it comes after the products and penalties, it feels like earned credibility.

---

### Section 5: Final CTA (keep, sharpen copy)

**Job:** Close the buyer who scrolled all the way down.

**Content:**
- H2: "June 30 is the next deadline. Your documents are ready."
  (Colorado-specific urgency — update to next nearest deadline as calendar changes)
- Sub-copy: "One-time purchase. Instant download. Built from the statute, not from a summary of it."
- Primary CTA: "Get My Compliance Documents →"

**What stays from today:** Same dark background (slate-900), same CTA button style, same email link for buyers who have questions before purchasing. The copy changes; the visual pattern is sound.

---

## /compliance-deadline-by-state Hub Page

All 4 of 5 contestants proposed this page. The validation is clear. The spec is in my `new-page-spec.md` from Round 1 — the `/deadline-checker` three-question selector. In this IA, it lives at:

**Route:** `/deadline-checker`
**Nav entry:** Primary nav "Find My Documents" button (both desktop and mobile)
**Secondary entry points:**
- Homepage hero sub-CTA "Not sure which law applies? Find yours →"
- Blog post closing sections for multi-law posts
- `/products` page sidebar: "Not sure where to start? →"

The page is NOT a blog post or a static deadline calendar. It is a transactional tool that takes a buyer's state/use-case answers and outputs a specific product recommendation. The distinction matters for the IA: it lives in the nav as a transactional entry point, not in Resources as an informational reference.

---

## What Moves, What Stays, What Goes

| Element | Current Location | New Location | Reason |
|---------|-----------------|--------------|--------|
| H1 | `sr-only` | Visible, above fold | Unanimous field fix |
| Blog nav link | Position 3 in nav | Footer / Resources | Blog is not the product |
| FAQ | Standalone nav + homepage section | Embedded in product pages + /deadline-checker | FAQ is objection-handling, not navigation |
| FeaturedInBar | Immediately post-hero | Footer (or remove) | "Featured in" as position 2 signals media-company not compliance store |
| ProductCarousel | Hero section | Remove | Carousel signals "browse catalog" — replace with product cards in section 2 |
| "How We Build Our Templates" | Section 2 of 8 | Right column of Section 4 | Methodology is trust-building, not hero copy |
| "How It Works" 3-step | Section 3 of 8 | Left column of Section 4 | Compressed with methodology |
| Penalty section | Section 5 of 8 | Section 3 | Moves up — but not above the products |
| Full FAQ accordion | Section 6 of 8 | Product pages + /deadline-checker | Objections belong nearest the purchase decision |
| Final CTA | Section 8 of 8 | Section 5 (same) | Keep, sharpen copy |
