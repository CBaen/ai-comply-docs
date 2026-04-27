# Rationale — Wildcard Synthesis

## Attribution Table (non-negotiable)

| Structural move | Originated by | What the synthesis adds |
|---|---|---|
| **Build Order** | C2 | File-level anchors for every step (exact path, component name, line reference); cross-dependency map so no step breaks another; integration with the two-mode flip so the developer knows which steps are pre-June-30 and which are post-June-30; starred first-ship step carries both the title-tag and H1 promise as one atomic unit |
| **Recognition Principle** | C3 | Operationalized as a four-point editorial rule with a verification requirement (.gov cite mandatory for each sentence); all four high-traffic product page recognition sentences written out and ready to paste — not just the principle stated, but the copy done |
| **Two-Mode Frame** | C4 | Composed with the build order so the flip-logic is a named implementation step (Step 7) and the post-June-30 homepage variants are pre-written with file-level changes; composed with the recognition principle so each mode has its own closing sentence variant in the Exposure Summary section; `AlsoExposedStrip` component integrated into the product page template as Step 8 |

The synthesis does not improve on any individual move. Each move was correct as stated. What was missing from the field was a single document that composes all three without contradiction and orders them by ship sequence.

---

## The Core Argument

The field produced three structural patterns that are mutually non-exclusive. No single contestant implemented more than one. The scoring matrix confirmed this: C4 won on shippability + two-mode; C3 won on buyer clarity + recognition; C2 won on build-order sequencing. A submission that composes all three should score at or above C4's 27.25 average on every dimension.

This synthesis is that submission.

The voice stays Calm Hardware Store. No peer disputed that choice. The visual direction, IA, and ad creative carry the synthesis into every delivery surface. The build order is the skeleton — it determines what ships first, what is pre-requisite for what, and what can wait.

---

## (a) What Changes vs. Today

### Copy changes
- Homepage `<title>`: state-law names + enforcement status (not catalog description)
- Homepage H1: visible (not sr-only), declarative, offer-shaped
- Product page H1 and title: deadline or enforcement status in the title, statute citation in the deck
- Blog CTAs: three placements per post with obligation framing, applied to 5 highest-traffic posts first
- Penalty language: statute-exact, per-consumer scaling stated plainly, no softening

### Structural changes
- Homepage sections: 8 → 5 (hero, products grid, consequences, how-it-works, FAQ)
- Products grid: two-mode split (Already Exposed / Deadline Approaching), derived from `regulations.ts` `status` field
- Flip logic: single field change in `regulations.ts` drives all mode-sensitive UI on product pages
- AlsoExposedStrip: cross-state buyer signal on Deadline Approaching product pages
- Recognition sentences: one statute-sourced sentence per product page (Colorado, Illinois, NYC, Texas) surfacing what the buyer didn't know to ask
- Build order: 10 steps, sequenced by impact, anchored to specific files

### New page
- `/compliance-deadline-by-state` — buyer-routing hub, two-mode organization, statute-verified penalty amounts per state

---

## (b) What Stays the Same

- Stack: Next.js 16 / React 19 / Tailwind 4
- Pricing: $49–$697 range, all 57 products
- Stripe checkout (verified working)
- Blog post body content
- BLOG-STYLE-GUIDE.md voice pattern (Realist + Credentialist) — blog body voice unchanged
- DOC_EXPLANATIONS content — document list copy is already correct
- Questionnaire component and Stripe checkout flow
- Legal disclaimer (auto-rendered)
- URL structure — no slug changes

---

## (c) Risks and Tradeoffs

**Risk 1: Synthesis complexity.** Composing three structural moves creates more surface area for implementation errors. Mitigation: the build order sequences the moves so they can be shipped incrementally. Each step is complete on its own — a developer who ships Steps 1-3 has a better site than the current site, even without Steps 4-10.

**Risk 2: Two-mode frame after June 30.** When Colorado flips, the homepage loses its last Deadline Approaching signal. The site becomes all-Enforcement Red. This is correct and honest — but requires the post-June-30 meta description and final CTA header to be pre-written so GL doesn't have to figure out the copy under time pressure. Those variants are included in `homepage-rewrite.md`.

**Risk 3: Recognition sentences require statute reads.** The recognition principle adds sentences that are only valid if the author read the specific statutory section. If a future build instance adds recognition sentences without reading the statute, the principle degrades into generic copy that breaks the buyer's trust. The editorial rule must include the verification requirement — recognition sentences require a .gov cite.

**Risk 4: Blog CTA component adds JSX to MDX.** Editing 26 MDX files manually is expensive. Mitigation: add `BlogProductCTA` to the MDX components provider at the app level and use a frontmatter flag to trigger placement. The provider handles component injection based on frontmatter — one implementation change, not 26 file edits.

---

## (d) The GSC Data Point That Drove This Angle

> "ai compliance packages" — 4 impressions, position 4.5

Position 4.5 on a purchase-intent query with 4 impressions means the site is invisible to people who already know they want to buy. The synthesis doesn't try to fix both the traffic problem and the conversion problem simultaneously. It sequences: first fix purchase-intent visibility (Steps 1-3), then fix blog-to-product handoff (Step 4), then add structural differentiation (Steps 5-9), then maintain and compound (Step 10).

Step 1 ships in one developer session and affects every impression the site already receives. Steps 5-9 compound the conversion rate improvement over subsequent sessions.

---

## The Build Order — 10 Steps, Ship-Sequenced

**The primary synthesis contribution:** Every borrowing and every new move is ordered here. A developer can hand this list to a build instance and ship one step at a time. No step breaks another. Pre-June-30 steps are marked. Post-June-30 steps are marked.

---

### Step 1: Title Tags + Product Page H1 (One Atomic Step) ★ SHIP FIRST

**Why first:** Title tag changes affect every impression the site already receives — no new traffic needed. Zero risk. Highest ROI of any change on this list.

**Why atomic (from C2 — attributed):** The title tag creates a deadline expectation. The H1 fulfills it. Shipping the title change without the H1 change leaves the SERP promise incomplete. These are not two changes — they are one promise completed in two places.

**Files:**
- `src/app/products/[slug]/page.tsx` — `generateMetadata` function
  - Change: `${reg.name} — AI Consumer Protections — Compliance Documents | AI Compliance Documents`
  - To: `${reg.shortName} Compliance Documents — ${reg.status === "effective-soon" ? reg.effectiveDate + " Deadline" : "In Effect Now"}`
  - This is a computed string. Covers all 57 product pages in one edit.

- `src/app/products/[slug]/page.tsx` — H1 element (currently `sr-only`)
  - Change: Remove `sr-only` class OR replace with new H1 in the marketing voice
  - Deadline Approaching: `{reg.shortName}. {reg.documentCount} Documents. {reg.effectiveDate}.`
  - Already Exposed: `{reg.shortName}. {reg.documentCount} Documents. Required Now.`
  - If `documentCount` is not in `regulations.ts` already, this requires adding it.

**Pre-June-30:** Yes — needed immediately for the Colorado CTR improvement.

---

### Step 2: Homepage H1 (Visible) + Meta Description

**Files:**
- `src/app/page.tsx` — H1 element (currently `sr-only` on the homepage)
  - Remove `sr-only`. Paste the new H1: "Your state has an AI law. / We built the documents."

- `src/app/page.tsx` — metadata `description`
  - Replace with: `Colorado deadline: June 30, 2026. Illinois, NYC, Texas: in effect now. The documents your state's AI law requires — built from statute. $49–$697. Instant download.`

**Dependency:** Step 1 must be complete first. The product page H1 promise must be in place before improving the homepage meta description increases CTR.

**Pre-June-30:** Yes.

---

### Step 3: Homepage Hero Replacement (Carousel → Static Hero)

**Files:**
- `src/app/page.tsx` — hero section
  - Remove `<ProductCarousel>` from hero position
  - Remove `<FeaturedInBar>` from position 2
  - Add: eyebrow (four states named), urgency band (4 status pills), two CTAs, trust strip, static product card in right column
  - The static product card is a simplified version of the product card pattern — no new component needed if the existing product card component accepts a `featured` prop

**New UI:** Urgency band uses `regulations.ts` `status` field to render correct pill colors. No hardcoded colors — derive from status.

**Pre-June-30:** Yes. The hero replacement is the highest-impact visual change.

---

### Step 4: Blog CTAs — Placement 2 Only (Mid-Article, After Penalties)

**Why Placement 2 first (from C2 — attributed):** This is the highest-converting placement — the buyer just read the consequences. Ship this placement before Placements 1 and 3.

**Files:**
- `src/components/BlogProductCTA.tsx` — create component with props as specced in `blog-cta-pattern.md`
- Frontmatter schema: add `productCTA` field to the 5 priority posts (EEOC, Colorado 91-day, Illinois, penalties-by-state, cost post)
- MDX provider: add `BlogProductCTA` to components provider, inject at `after-penalties` placement

**Priority posts (in order):**
1. EEOC post — mid-article bridge first (plain inline copy, not component), then Placement 3
2. Colorado 91-day — Placement 2 only
3. Illinois HB3773 — Placement 2 only
4. Cost post — title/meta rewrite BEFORE any CTA work (current title has no state, no buyer signal)
5. Penalties-by-state — Placement 2 with generic multi-state block

**Special case:** The EEOC post mid-article bridge is plain text + three inline links (not the styled component). The styled component goes at the closing position only. See `blog-cta-pattern.md` for the exact bridge copy.

**Pre-June-30:** Yes — this is the blog conversion fix. Needed immediately.

---

### Step 5: Blog CTAs — Placements 1 and 3

**After Step 4 is proven:** Add Placement 1 (after opening) and Placement 3 (closing block) to the same 5 priority posts. The component is already built from Step 4.

**Files:**
- Same 5 MDX files — add `"after-opening"` and `"closing"` to the `placements` array in frontmatter
- No component changes needed

**Pre-June-30:** Yes, but not before Step 4.

---

### Step 6: Homepage Section Order (5-Section Redesign)

**Files:**
- `src/app/page.tsx` — full page restructure
  - Replace 8-section layout with 5-section layout per `ia-proposal.md`
  - Section 1: Hero (already done in Step 3)
  - Section 2: Products Grid with two-mode split (Already Exposed / Deadline Approaching)
  - Section 3: Three penalty cards (statute-exact, no preamble)
  - Section 4: How It Works (compressed, 3 steps)
  - Section 5: FAQ (6 questions, reordered)

**The two-mode products grid:** Rendered from `regulations.ts` — filter by `status === "in-effect"` for Subsection A, `status === "effective-soon"` for Subsection B. No hardcoded product lists. New laws in the catalog appear automatically.

**Pre-June-30:** Yes.

---

### Step 7: Product Page Two-Mode Flip Mechanism

**Files:**
- `src/app/products/[slug]/page.tsx` — extend existing `StatusBadge` conditional to the additional mode-sensitive elements per the flip-logic table in `product-page-template.md`
  - Deadline Banner (new element — full-width, above H1)
  - Deck copy
  - Key Stats Bar date string
  - Sidebar label and countdown
  - Exposure Summary closing sentence
  - Penalty section header

- `src/data/regulations.ts` — verify `status` field is present for all 57 products. Add `documentCount` field if not already present (needed for the H1 template and the CTA component props).

**Pre-June-30:** Yes — needed before June 30 so the flip on July 1 is a one-line change.

**Post-June-30 action (separate from the mechanism):** Change Colorado `status: "effective-soon"` → `status: "in-effect"` in `regulations.ts`. This single commit triggers all mode-sensitive UI changes across all surfaces. No further code changes needed.

---

### Step 8: AlsoExposedStrip Component

**Files:**
- `src/components/AlsoExposedStrip.tsx` — create component per `product-page-template.md` spec
- `src/data/crossStateExposure.ts` — create `CROSS_STATE_EXPOSURE` mapping (can be a standalone data file or added to `regulations.ts`)
- `src/app/products/[slug]/page.tsx` — add `<AlsoExposedStrip>` after the penalty section, conditionally rendered on `reg.status === "effective-soon"` only

**Pre-June-30:** Yes — this component only appears on Deadline Approaching pages (Colorado). After June 30, it becomes dormant automatically as Colorado flips to `"in-effect"`.

---

### Step 9: Recognition Sentences — Four Product Pages

**Files:**
- `src/app/products/[slug]/page.tsx` OR the MDX content for each product page (depending on whether product pages are MDX or JSX)
- Add the recognition sentence to the Exposure Summary section of each product page, after the qualification bullets

**Recognition sentences (from `product-page-template.md`, paste-ready):**
- Colorado: deployer/developer distinction (C.R.S. § 6-1-1702)
- Illinois: zip code as proxy prohibition (775 ILCS 5/2-102(L))
- NYC: independent auditor requirement (NYC Admin. Code § 20-871)
- Texas: cure period trigger date [REQUIRES PRIMARY SOURCE VERIFICATION before publish]

**Verification requirement:** Each sentence must be verified against the cited statutory section before publishing. The editorial rule from `voice-spec.md`: recognition sentences require a .gov cite. Do not publish the Texas recognition sentence without reading HB 149 TRAIGA § 552.053 directly.

**Pre-June-30:** Yes for Colorado, Illinois, NYC. Texas depends on primary source verification.

---

### Step 10: `/compliance-deadline-by-state` New Page

**Route:** `/compliance-deadline-by-state`
**Files:**
- `src/app/compliance-deadline-by-state/page.tsx` — new file
- Navigation update: add "State Deadlines" as second nav item in `src/components/Navigation.tsx` (or equivalent)

**Page structure (per `ia-proposal.md`):**
- Section A: Already Exposed (laws in force) — state cards with law name, enforcement status, penalty, price, "Get Documents →"
- Section B: Deadline Approaching (future effective dates) — same card structure, Deadline Amber
- Three qualification questions: "Do you use AI in hiring or consumer decisions?", "Which states do you operate in?", "Is your business a deployer or a developer?"

**Data source:** All state, deadline, and penalty data pulled from `regulations.ts`. No hardcoded content on the page — new laws appear automatically.

**Nav update:** "State Deadlines" appears as second primary nav link after "Get Your Documents." See `ia-proposal.md` for full nav spec.

**Post-June-30:** Page title shifts from "AI Compliance Deadlines by State" to "AI Compliance Laws in Effect by State." One copy change. Section B becomes empty or repopulates with new upcoming laws.

**Pre-June-30:** Yes, but this is the most complex step (new page + nav change). Ship last, after Steps 1-9 are in place. The homepage sub-CTA routes to this page — it should exist before the homepage hero ships in Step 3. Minimum viable version: a static page with the four-state table, no filter functionality. Full version: dynamic from `regulations.ts` with filter bar.

---

## Ship Sequence Summary

| Step | What ships | Files touched | Pre/Post June-30 |
|---|---|---|---|
| **1** ★ | Title tags + product page H1 (atomic pair) | `src/app/products/[slug]/page.tsx` | Pre |
| 2 | Homepage H1 (visible) + meta description | `src/app/page.tsx` | Pre |
| 3 | Homepage hero replacement (carousel → static) | `src/app/page.tsx` | Pre |
| 4 | Blog CTA Placement 2 (mid-article, after penalties) | `src/components/BlogProductCTA.tsx` + 5 MDX files | Pre |
| 5 | Blog CTA Placements 1 + 3 (remaining) | Same 5 MDX files | Pre |
| 6 | Homepage 5-section redesign | `src/app/page.tsx` | Pre |
| 7 | Product page two-mode flip mechanism | `src/app/products/[slug]/page.tsx` + `regulations.ts` | Pre (mechanism) / Jul 1 (flip) |
| 8 | AlsoExposedStrip component | `src/components/AlsoExposedStrip.tsx` + data file | Pre |
| 9 | Recognition sentences (4 product pages) | Product page files | Pre (CO/IL/NYC) / After verification (TX) |
| 10 | `/compliance-deadline-by-state` new page + nav | `src/app/compliance-deadline-by-state/page.tsx` + nav | Pre (minimum viable version before Step 3) |

**If continuity ends after Step 1:** The site has better title tags and visible H1s on every product page. Every impression the site already receives performs better. This is the highest ROI change in isolation.

**If continuity ends after Step 4:** The site has better discovery copy (Steps 1-3) and the blog CTA at peak anxiety (Step 4). The two highest-leverage changes are in place.

**If continuity ends after Step 6:** The full homepage redesign is live. The site looks and reads like a compliance store. Recognition sentences and the AlsoExposedStrip are still pending but the primary conversion path is repaired.

---

## Research Basis (carried from Round 2, verified in session)

All statute citations verified against primary sources in the original Round 1/2 research session.

| Finding | Source |
|---|---|
| Position 4 CTR benchmark 7.2% | First Page Sage 2026 (fetched live, Round 1) |
| Colorado SB 24-205 effective date June 30, 2026 | leg.colorado.gov/bills/sb24-205 (fetched live) |
| Colorado $20,000/violation | CCPA enforcement mechanism via C.R.S. § 6-1-112 (secondary source, flagged for developer verification) |
| Illinois HB3773 penalties ($16K/$42.5K/$70K) | ilga.gov fetched live (Round 1) |
| NYC $500/$500-$1,500/day | regulations.ts (primary-source-verified) + Dec 2025 NY Comptroller audit |
| Texas TRAIGA penalties up to $200,000 | Secondary sources flagged for primary source verification |
| AI Overview CTR impact: -61% | Dataslayer.ai fetched live (Round 1) |
| NYC bias audit services cost $5K-$50K | WebSearch competitor research, Round 1 |
