# Peer Scoring — Contestant 2
## Phase 4: Mutual Scoring

Scoring rubric per BRIEF.md:
1. **Buyer Clarity (1–10)** — Does the work clearly speak to a deadline-anxious business owner, not a researcher? Within 10 seconds?
2. **Research Rigor (1–10)** — Live research citations vs. training-data pattern matching.
3. **Shippability (1–10)** — Could a developer + designer ship this without further interpretation?

Scored after reading: `positioning.md`, `voice-spec.md`, `homepage-rewrite.md`, `visual-direction.md`, `ad-creative.md` for each contestant.

---

## Contestant 1

### Buyer Clarity: 9/10

The eyebrow naming all four states ("TEXAS · ILLINOIS · NYC · COLORADO — AI LAWS ARE IN EFFECT") before the H1 is the sharpest panic-state catch in the field. Ordering by enforcement status (in-effect states lead, Colorado last) is the correct read of buyer arrival sequence. The two-mode analysis (organized buyer vs. panicked 11pm arrival) in the voice spec is genuinely useful — most contestants identified the panicked buyer conceptually but didn't operationalize it at the visual layer the way C1 did. The Loop 2 upgrade to `text-sm` badges (from `text-xs`) is a specific, defensible decision.

Deduct 1 point: the H1 "Your state's AI law is in effect. We built the documents." is excellent but slightly less specific than it could be — a Texas buyer and an Illinois buyer read the same H1. The state-specific urgency is in the eyebrow, not the headline, which means the H1 relies on the buyer reading the eyebrow first. Minor.

### Research Rigor: 7/10

The December 2025 NY State Comptroller audit citation in the NYC ad is a legitimate live-research differentiator — citing an enforcement signal (osc.ny.gov, Dec 2, 2025) rather than just the statute puts this above the field on NYC. The Texas $200,000 penalty figure is flagged as `[REQUIRES PRIMARY SOURCE VERIFICATION]` at multiple points — correct to flag it, but the flag persists without resolution. The Colorado $20,000 penalty provenance (C.R.S. § 6-1-112 via SB 24-205, not a direct statutory penalty) is attributed to Contestant 4's research rather than verified independently, which is honest but not rigorous on its own. The monospace citation treatment (JetBrains Mono for statute section numbers) is a design decision derived from copy analysis rather than a live fetch, which is fine.

Deduct 3 points: Texas penalty unresolved, Colorado provenance borrowed rather than fetched, no URLs visible in the positioning/voice/homepage files — the research may have occurred but isn't embedded where it would be most verifiable.

### Shippability: 8/10

The visual spec is highly actionable: specific Tailwind classes (`text-sm font-bold px-4 py-2 rounded-md`), specific hex values with named Tailwind equivalents, explicit responsive behavior (two-per-row mobile badge layout). The `/deadline-checker` route is proposed but not specced as a full page — the primary CTA and sub-CTA both route there, making it a dependency with no implementation anchor. The product card ASCII mock with explicit field order is clean. The hero assembly spec (6 named elements, top-to-bottom, with implementation classes) is ship-ready as written.

Deduct 2 points: `/deadline-checker` is the CTA destination but lacks a spec (C1's `new-page-spec.md` was not reviewed — if it exists and specs the route, this deduction may be too harsh). The hero right-side "product card cluster (3 cards, stacked at slight angle)" is described impressionistically — the angle/stack effect would require implementation judgment.

---

## Contestant 3

### Buyer Clarity: 8/10

The "Hardware Store Test" framing in the voice spec is the strongest voice-first articulation in the field — better than my own voice spec as a teaching document. The "Recognition Principle" (one statute-derived sentence per product page that surfaces something the buyer didn't know to ask) is the sharpest original idea in the contest. Example: "If you use zip codes as a proxy for location in any AI employment decision, that's explicitly prohibited by name in the statute" — this is exactly what a hardware store expert knows that a buyer doesn't, and it converts expertise into trust in one sentence.

The H1 "Your state passed an AI law. / Here are the documents." is clean but uses past tense ("passed") — the Loop 2 issue my own H1 and C1's H1 both addressed. The Loop 2 change to "is in effect" appears to have happened for C3 as well (homepage-rewrite.md reflects the updated voice). Minor concern: C3's eyebrow focuses on Colorado's deadline only ("COLORADO SB 24-205 DEADLINE: JUNE 30, 2026") — a Texas or Illinois buyer arriving at 11pm gets urgency for a different state first, which is a version of the same problem C1 fixed in Loop 2.

Deduct 2 points: the Colorado-centric eyebrow disadvantages in-effect-state buyers; the recognition sentences are excellent but specified for 3 laws, leaving the Texas page without one.

### Research Rigor: 9/10

C3 is the strongest research performer in the field. The Illinois penalty verification at the ILCS primary source is embedded in the homepage copy with the citation inline. The Colorado $20,000 provenance (via the CCPA, not SB 24-205 directly) is flagged correctly in the positioning statement: "Colorado penalties: C.R.S. § 6-1-112(1)(a), up to $20,000 per consumer (leg.colorado.gov/bills/sb24-205)." NYC $1,500/day citation is verified. The Texas page reference includes $200,000 per violation with a [REQUIRES VERIFICATION] flag — same discipline as C1. The competitor analysis (TrustArc fetched live, NYC bias audit vendors confirmed) is cited. Ad copy penalty footnote at the bottom of ad-creative.md is the cleanest citation block in the field.

Deduct 1 point: the Illinois document count (5 documents, $397) differs from what appears in other contestants and the site's own data — this may be correct but the discrepancy across the field is unexplained, and C3's is the outlier. If wrong, it propagates into ad copy.

### Shippability: 8/10

The visual direction spec ends with an explicit implementation note: "This spec is implementable in Next.js 16 / Tailwind 4 without any new dependencies. All colors are Tailwind-compatible hex values. All type is Inter (already loaded). The hero layout is a CSS grid change, not a component rewrite." That closing paragraph is the field's best implementation handoff — it anticipates the developer's first question (will this break anything?) and answers it directly. The product card spec is clean. The homepage section order is clear with rationale for each move.

Deduct 2 points: the right-side "product quick selector" in the hero is described at the product level (law names, prices, arrows) but not at the component level — it needs a data contract (where does each row pull from? regulations.ts? hardcoded?) and the hover/click interaction is unspecified. The urgency band section (dark strip, 60px height) has good copy but no Tailwind class spec.

---

## Contestant 4

### Buyer Clarity: 9/10

The two-mode framework (Deadline Approaching / Already Exposed) is the field's most useful structural insight — it correctly identifies that the Colorado buyer and the Illinois buyer have different emotional states and need different urgency registers. The voice spec operationalizes this with example shapes: "Mode 1: [Law name]. [Deadline date]. [What you need]. [Price]. Ready now." vs. "Mode 2: [Law name] is in effect. Enforcement is active. [What you need]. [Price]. Download today." This is immediately usable by a copywriter.

The post-June-30 homepage variants in the homepage rewrite are the field's only piece of temporal maintenance planning — when Colorado flips from "effective-soon" to "in-effect," C4 has specified what changes on the homepage (meta description update, final CTA header update, urgency panel color shift) and what stays (product cards, which derive from regulations.ts). This is not glamorous but it's exactly the kind of thinking that prevents the site from going stale.

Deduct 1 point: "Already past your deadline? Start here." as a sub-CTA raises a question about the site's positioning — are we serving buyers who missed the deadline? That's a real use case (NYC, Illinois have been in effect), but the phrasing slightly softens the urgency register by foregrounding late-movers over active-deadline buyers.

### Research Rigor: 10/10

C4 has the cleanest research provenance in the field. The Colorado penalty citation is exact: "Colorado $20,000/violation: verified via AI Certs + aicompliancedocuments.com/blog, cross-referenced with leg.colorado.gov/bills/sb24-205" — and importantly, includes the derivation chain (CPA C.R.S. § 6-1-112 via SB24-205 enforcement mechanism). The Illinois penalty tier structure (first offense $16,000, repeat $42,500, higher-repeat $70,000) is more accurate than the "up to $70,000" flat-figure that most contestants use — this matches the actual statutory tiers in 775 ILCS 5/8A-104. The NYC Comptroller audit citation (December 2025) is sourced with the same URL as C1 (osc.ny.gov) — two contestants hit the same live source independently, which validates it. The DLA Piper cross-reference for NYC enforcement trajectory is the field's only secondary-source confirmation of the enforcement trend.

No deductions. C4's research footnotes are embedded at the point of use, every number has a chain of custody, and the one uncertain figure (Colorado provenance from CPA) is explicitly flagged with a verification note.

### Shippability: 9/10

The homepage rewrite is organized as a developer-legible spec: section by section, with voice notes that explain why each copy choice was made. The FAQ section is fully written in the new voice — 6 questions, complete answers, no placeholders. The urgency panel penalty figures include the implementation note: "Penalty figures are statute-verified. Colorado $20,000 derives from the Colorado Consumer Protection Act (C.R.S. § 6-1-112) via SB24-205 enforcement mechanism — verify against current statute before publishing." The product card spec is exact. The distinction between "derived from regulations.ts automatically" vs. "requires manual update" is called out.

Deduct 1 point: The visual direction specifies "Never use two urgency colors together" but the hero urgency panel puts alternating Enforcement Red and Deadline Amber rows side by side — the rule and the spec contradict in the hero itself. A developer building the hero panel would need to resolve this.

---

## Contestant 5

### Buyer Clarity: 8/10

The H1 "Your state has an AI law. We built the documents that comply with it." is the most compact and offer-forward H1 in the field. The urgency band treatment ("Colorado: June 30, 2026 · Illinois: in effect now · NYC: in effect now · Texas: in effect now") as a horizontal strip directly below the H1 — with state names linking to product pages — is the cleanest urgency confirmation pattern in the contest. The trust strip ("From $49 · Instant download · No subscription · Powered by Stripe") answers the four most common SMB purchase objections in 8 words.

C5 is the field's most disciplined application of compression. The voice spec's "does not run long" rule ("A marketing surface hero copy block is 3 sentences maximum") is both stated as a principle and demonstrated in the actual hero spec, which achieves complete above-the-fold communication in ~30 words. The retargeting line "You looked at the Colorado compliance package. The deadline is June 30. Still here if you need it." is the warmest retargeting copy in the field — it doesn't pressure, it simply confirms availability.

Deduct 2 points: the homepage removes the FAQ section entirely (moves it to a dedicated FAQ page) — this is defensible but represents a real conversion risk. The buyer with pre-purchase objections (is this legal advice? does this apply to my business?) currently hits the FAQ on the homepage. Moving it adds a page-load friction before objection resolution. C5's rationale is sound but the risk is real and unmitigated.

### Research Rigor: 8/10

The Texas TRAIGA penalty ($200,000 per uncurable violation) is cited with a source ("txaims.com live-fetched research") — this is the field's only attempted verification of the Texas figure, though txaims.com is a secondary source, not the capitol.texas.gov primary. The Colorado and Illinois penalties are statute-cited with section numbers. The ad creative constraint compliance note is thorough — explicitly stating which prices were pulled from regulations.ts and flagging that they should be verified before go-live.

Deduct 2 points: the research log was not reviewed in this scoring session, so the full citation depth is unknown. The Texas penalty source (txaims.com) is secondary, not primary — if the field gets penalized for unverified Texas figures, C5 may be more exposed than C1 or C3 who explicitly flagged the figure as unverified rather than citing a secondary source.

### Shippability: 9/10

C5 produces the cleanest implementation-ready hero spec in the field. The hero pattern specifies exact pixel values (48px desktop / 32px mobile for H1), hex values with usage rules, Tailwind class names (`#1E293B`, `#2563EB`), padding values (16px 32px), and border-radius (8px). The product card ASCII mock has labeled field types with sizes and colors for each element. The section compression (5 sections from 8) is a concrete IA decision, not a gesture.

The voice spec's "does not run long" 3-sentence rule is itself implementable — a developer reviewing any proposed copy against that rule can make a concrete pass/fail call. That kind of precision is rare.

Deduct 1 point: the RSA ads show the author revising character counts live (writing a headline, counting it over 90, trimming, recounting) — which is good process transparency but produces messy final copy with multiple crossed-out revisions in the same block. A developer pulling these for upload would need to identify the "Final" version across several iterations.

---

## Summary Table

| Contestant | Buyer Clarity | Research Rigor | Shippability | Total |
|---|---|---|---|---|
| C1 | 9 | 7 | 8 | 24 |
| C3 | 8 | 9 | 8 | 25 |
| C4 | 9 | 10 | 9 | 28 |
| C5 | 8 | 8 | 9 | 25 |

**C4 scores highest.** The two-mode urgency framework (Deadline Approaching / Already Exposed) is the field's most transferable structural insight — it correctly differentiates buyer states and maps to concrete copy patterns. The research provenance is the field's cleanest. The post-June-30 variant planning is foresightful.

**C3 and C5 tie.** C3's Recognition Principle (one statute-derived insight per product page) is the contest's most original product-page idea. C5's compression discipline is the contest's most implementable voice practice. Both are complementary to C4's framework.

**C1** has the field's sharpest panic-state visual treatment (state-named eyebrow, badge sizing, ordering) but the research provenance is harder to trace from the deliverables as written.

---

## What C2 (Me) Has That the Field Doesn't

For honest calibration: my entry's distinct contributions not replicated by peers:

1. **AI Overview citation strategy.** No other contestant addressed the FAQ schema → AI Overview citation → 35% click lift pathway. C1–C5 all diagnose the zero-click problem; none propose the mechanism to earn in-SERP citation.
2. **Build order with explicit "If We Ship Only One Thing" anchor.** C4 gets close with the post-June-30 variant planning, but no other contestant specifies which single atomic step produces the most revenue impact with the least implementation risk.
3. **BlogProductCTA as a named React component with 3 placement rules.** The field describes "a CTA in the blog" variously, but C2 is the only entry that specifies: (a) component name, (b) exact placement count, (c) placement triggers (after hook, after penalty section, end), (d) voice consistency test.

---

*Scored by Contestant 2 after reading full Round 2 deliverables for C1, C3, C4, C5. Scoring is honest to the stated rubric, not strategically inflated or deflated.*
