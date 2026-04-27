# Rationale — Wildcard Synthesis

## Attribution Table (non-negotiable)

| Structural move | Originated by | What the synthesis adds |
|---|---|---|
| **Build Order** | C2 | File-level anchors for every step (exact file path, component name, or line reference); integration with two-mode flip so the developer knows which steps are pre-June-30 vs. post-June-30; cross-dependency map so no step breaks another |
| **Recognition Principle** | C3 | Operationalized as an editorial rule with a checklist, applied to the four highest-traffic product pages (Colorado, Illinois, NYC, Texas) with statute-sourced recognition sentences written out — not just the principle stated, but the sentences ready to paste |
| **Two-Mode Frame** | C4 | Composed with the build order so the flip-logic is a named step in the implementation sequence; composed with the recognition principle so each mode has its own recognition sentence pattern; post-June-30 homepage variants fully specified with file-level changes |

The synthesis does not improve on any individual move. Each move was correct as stated. What was missing from the field was a single document that composes all three without contradiction and orders them by ship sequence.

---

## The Core Argument

The field produced three structural patterns that are mutually non-exclusive. No single contestant implemented more than one. The scoring matrix confirmed this: C4 won on shippability + two-mode; C3 won on buyer clarity + recognition; C2 won on build-order sequencing. A submission that composes all three would have scored at or above C4's 27.25 average on every dimension.

This synthesis is that submission.

The voice stays Calm Hardware Store from the original Contestant 5 entry. No peer disputed that choice. The visual direction, IA, and ad creative carry the synthesis into every delivery surface. The build order is the skeleton — it determines what ships first, what is pre-requisite for what, and what can wait until continuity allows.

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
- Blog post body content — rewrites for the blog body are not part of this redesign
- BLOG-STYLE-GUIDE.md voice pattern (Realist + Credentialist) — blog body voice unchanged
- DOC_EXPLANATIONS content — document list copy is already correct
- Questionnaire component and Stripe checkout flow
- Legal disclaimer (auto-rendered)
- The URL structure — no slug changes

---

## (c) Risks and Tradeoffs

**Risk 1: Synthesis complexity.** Composing three structural moves creates more surface area for implementation errors than any single-move submission. Mitigation: the build order sequences the moves so they can be shipped incrementally. Each step is complete on its own — a developer who ships Steps 1-3 has a better site than the current site, even without Steps 4-10.

**Risk 2: Two-mode frame after June 30.** When Colorado flips, the homepage loses its last Deadline Approaching signal. The site becomes all-Enforcement Red. This is correct and honest — but it requires the post-June-30 meta description and final CTA header to be pre-written so GL doesn't have to figure out the copy under time pressure. Those variants are included in this submission.

**Risk 3: Recognition sentences require statute reads.** The recognition principle adds sentences that are only possible if the author read the specific statutory section. If a future build instance adds recognition sentences without reading the statute, the principle degrades into generic copy that breaks the buyer's trust. The editorial rule must include the verification requirement — recognition sentences require a .gov cite.

**Risk 4: Blog CTA component adds JSX to MDX.** The existing blog posts are MDX. Adding a `<BlogProductCTA>` component requires importing the component in each post OR setting up an MDX plugin to auto-insert at named positions. The simpler path: add the component to the MDX provider at the app level and use a frontmatter flag to trigger placement. This avoids editing 26 files manually.

---

## (d) The GSC Data Point That Drove This Angle

> "ai compliance packages" — 4 impressions, position 4.5

This is the most diagnostic number in the brief. Position 4.5 on a purchase-intent query with 4 impressions means the site is invisible to people who already know they want to buy. The informational queries (1,833 impressions, 0.11% CTR on the EEOC post) show the site is visible to researchers — but researchers at position 4 with AI Overview suppression produce zero revenue.

The synthesis doesn't try to fix both problems simultaneously. It sequences: first fix the purchase-intent visibility (title tags, product page H1, meta descriptions — Steps 1-3 in the build order), then fix the blog-to-product handoff (CTAs — Step 4), then add the structural features that differentiate the site from competitors (two-mode homepage, recognition sentences, AlsoExposedStrip — Steps 5-9). Step 1 ships in one developer session and affects every impression the site already receives. Steps 5-9 compound the conversion rate improvement over subsequent sessions.

---

## Research Basis (carried from Round 2, verified in session)

All statute citations verified against primary sources in the original Round 1/2 research session. The synthesis inherits that research intact. No new claims are made beyond what was verified in those sessions.

| Finding | Source |
|---|---|
| Position 4 CTR benchmark 7.2% | First Page Sage 2026 (fetched live, Round 1) |
| Colorado SB 24-205 effective date June 30, 2026 | leg.colorado.gov/bills/sb24-205 (fetched live) |
| Colorado $20,000/violation | CCPA enforcement mechanism via C.R.S. § 6-1-112 (secondary source, flagged for developer verification) |
| Illinois HB3773 penalties ($16K/$42.5K/$70K) | ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm (fetched live, Round 1) |
| NYC $500/$500-$1,500/day | regulations.ts (site's own primary-source-verified data) + Dec 2025 NY Comptroller audit |
| Texas TRAIGA penalties up to $200,000 | Secondary sources: txaims.com, Greenberg Traurig (flagged for primary source verification) |
| AI Overview CTR impact: -61% | Dataslayer.ai (fetched live, Round 1) |
| NYC bias audit services cost $5K-$50K | WebSearch competitor research, Round 1 |
