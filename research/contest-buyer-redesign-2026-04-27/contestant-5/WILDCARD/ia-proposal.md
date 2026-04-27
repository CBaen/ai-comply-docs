# Information Architecture Proposal — Wildcard Synthesis

## Current IA Problem (the failure mode)

**Current nav:** Home / Products / Blog / FAQ / About

Blog sits at nav level with Products. "Products" is a catalog label. The buyer reads this as "information resource with a store" — exactly backwards.

**Current homepage section order (8 sections):** Hero (carousel) → FeaturedInBar → Methodology → How It Works → Image break → Pain/Consequences → FAQ → Final CTA. This is publication IA. It establishes credibility and educates before selling. A compliance store inverts it.

---

## New Navigation

**Desktop (left to right):**
```
[Logo]    Get Your Documents    State Deadlines    Resources    About    info@aicompliancedocuments.com
```

**"Products" → "Get Your Documents"**
The destination is unchanged (`/products`). The label shifts from catalog descriptor to buyer task. "Get Your Documents" signals store, not library.

**New top-level: "State Deadlines"**
Routes to `/compliance-deadline-by-state`. Earns a nav slot because scope confusion ("do I even need this?") is the #1 pre-purchase objection. A nav link signals: "we anticipated your confusion." It also captures buyers who arrive ready to self-navigate by state before browsing the product catalog.

**"Blog" → "Resources" (demoted, not removed)**
Blog posts continue receiving organic traffic. The visual demotion is the IA change: Resources sits at lower visual weight than Get Your Documents and State Deadlines. The blog index redirects from `/blog` to `/resources`. All post URLs (`/blog/[slug]`) remain unchanged — no 404 risk.

**"FAQ" removed from nav**
FAQ moves to an anchor on the homepage (`/#faq`) and appears on product pages. It does not need its own nav slot — it's reassurance content, not navigation content.

**Mobile:**
```
Get Your Documents
State Deadlines
Resources
About
[Email]
```
Same order. State Deadlines above Resources — scope confusion is more common on first mobile visit.

---

## New Homepage Section Order (5 sections)

### Section 1: Hero + Urgency Panel
**What's here:** Eyebrow (4 states named), H1 (visible, not sr-only), urgency band (status pills), primary CTA ("Find My Compliance Documents →"), sub-CTA ("Not sure which law applies?"), trust strip, static product card in right column.

**Why first:** The buyer needs to know within 3 seconds that this is the right place and their problem is real. The eyebrow names their state before the H1 fires. The urgency band confirms their law's status. The right-column product card lets them skip to purchase without scrolling.

**Replaces:** ProductCarousel hero + FeaturedInBar. Both are browsing-mode UI that signals "catalog" not "store."

---

### Section 2: Products Grid (Two-Mode Split)
**What's here:** Two subsections derived from `regulations.ts` `status` field — no manual maintenance needed.

**Subsection A — Already Exposed (in-force, enforcement active):**
Section header: `"These laws are in effect. Enforcement is active."`
Cards: Illinois HB3773, NYC Local Law 144, Texas TRAIGA, California CCPA ADMT, Texas TDPSA — each with Enforcement Red status badge, law name, price, enforcement signal, "Get Documents →" button.

**Subsection B — Deadline Approaching:**
Section header: `"Colorado SB 24-205 takes effect June 30, 2026. The window is closing."`
Cards: Colorado SB 24-205 and any other future-deadline laws. Deadline Amber status badges.

**Subsection C — Multi-State / Universal (if space allows):**
Multi-State Bundle, AI Governance Framework, AI System Registry, Bias Audit Template.

**Why second:** After the hero confirms this is the right place, the buyer's next question is "which product do I need?" The two-mode split lets them self-navigate by urgency register without reading FAQs or explanations.

**After July 1, 2026:** Subsection B disappears (or becomes "Laws with Upcoming Amendments"). Section A becomes the full grid. The homepage section header updates from "The window is closing" to "Every major state AI law is now in effect." One manual copy change to `page.tsx`. All card content updates automatically from `regulations.ts`.

**Replaces:** ProductCarousel + the existing "Browse Products" link that defers to a separate page.

---

### Section 3: Consequences (Compressed)
**What's here:** Three penalty cards — one per high-traffic law. No preamble paragraph. Cards link directly to product pages.

```
Colorado SB 24-205          Illinois HB3773         NYC Local Law 144
Up to $20,000/violation     Up to $70,000/violation  $500–$1,500/day
[C.R.S. § 6-1-112]         [775 ILCS 5/8A-104]      [Admin. Code § 20-871]
[Get Colorado Documents →]  [Get Illinois Documents →] [Get NYC Documents →]
```

Section header: `"The cost of not having these documents."`

**Why third:** After the buyer has seen what's available, the consequence section reinforces the decision. Current position (Section 6 of 8) buries the urgency until after the buyer has already decided whether to leave.

**No preamble paragraph.** "AI regulations aren't suggestions" — cut. The numbers speak.

**Replaces:** The current "What Happens Without Compliance" section at position 6.

---

### Section 4: How It Works (Compressed)
**What's here:** 3 steps. Short copy. One CTA.

```
Three steps.

1. Pick your state's law
   Colorado, Illinois, NYC, California, Texas — or browse all 57 packages.

2. Answer 8 questions
   Your company name, AI systems in use, which decisions they inform.

3. Download your documents
   Fillable PDFs, instantly. Electronic signature blocks included.

[ Find My Documents → ]
```

**Why fourth:** Process explanation belongs after urgency is established and products are visible. A buyer reaching Section 4 is considering purchase — they need to know the process is fast.

**Replaces:** The existing "How It Works" 3-step section, moved from position 4 and compressed.

---

### Section 5: FAQ (Compressed, Reordered)
**6 questions max. Priority:**
1. What documents do I actually need?
2. How do I know if this applies to my business?
3. Where do I start if I don't know which law applies? (→ `/compliance-deadline-by-state`)
4. Is this legal advice?
5. How are the documents generated?
6. Do I need this if I already have outside counsel?

**Why fifth:** FAQ at the bottom catches buyers who need more reassurance before purchasing. 6 questions max — the existing 9 include researcher questions ("What AI regulations do you cover?") that should be removed.

**Removed from homepage entirely:**
- Methodology icon grid ("How We Build Our Templates" — 4 columns)
- FeaturedInBar
- Lifestyle image breaks
- "Are all sales final?" FAQ question
- "What if the law changes?" FAQ question (creates doubt at the wrong moment; belongs on an FAQ page, not the homepage)

**Where methodology trust signals go:** Embedded in product cards ("Built from statute — C.R.S. § 6-1-1701 et seq.") and in the sidebar purchase card on product pages (already present). Methodology earns trust in the context of a specific product, not as a standalone section.

---

## `/compliance-deadline-by-state` in the IA

**Nav label:** "State Deadlines"
**Route:** `/compliance-deadline-by-state`
**Position:** Primary nav, second link after "Get Your Documents"

**Page purpose:** Self-qualification hub for buyers who don't know which law applies. Two-mode organization matches the homepage: Already Exposed (laws in force) → Deadline Approaching (future dates). Each state row: law name, status badge, penalty amount (statute-verified), product price, "Get Documents →" link.

**Sub-CTA from homepage hero:** "Not sure which law applies? → See deadlines by state" routes here.

**After July 1, 2026:** Page title shifts from "AI Compliance Deadlines by State" to "AI Compliance Laws in Effect by State." The Deadline Approaching section either empties or populates with new upcoming laws as they enter the pipeline. Structure unchanged.

---

## Products Page (`/products`) Changes

1. **Section headers:** Same two-mode split as homepage (Already Exposed / Deadline Approaching) — consistent urgency framing for buyers who browse the full catalog.

2. **State filter:** Simple filter bar at top — "Filter by: Colorado | Illinois | NYC | California | Texas | All States." No new component — a filter on the existing static page. Buyers who know their state skip the 57-product scroll.

---

## Blog / Resources Demotion

- `/blog/[slug]` routes unchanged — SEO traffic continues
- Blog index canonical URL moves from `/blog` to `/resources` (redirect `/blog` → `/resources`)
- "Resources" in nav at lower visual weight than "Get Your Documents" and "State Deadlines"
- Blog grid does NOT appear on the homepage
- Blog posts retain all CTA enhancements from `blog-cta-pattern.md`
- Blog index gets a brief contextual header: "Plain-language guides to each state's AI law — to help you understand what you owe before you buy the documents."

Renaming the nav label changes the buyer's mental model from "information resource with a store" to "compliance store with a resource library." Organic traffic to blog posts is unaffected — search engines index posts, not nav labels.
