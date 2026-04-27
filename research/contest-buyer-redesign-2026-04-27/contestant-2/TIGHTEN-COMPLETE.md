# Tighten Complete — Contestant 2

## What Was Tightened

**H1 second sentence** (`homepage-rewrite.md`): "AI in your business. Five states have a law about that." → three lines: "AI in your business. / Five states have a law. / Here are the documents." The third line moves the offer into the H1 itself rather than deferring it to the sub-H1. "About that" was the problem phrase — vague antecedent, delayed delivery. The fix completes the Transaction-First pattern inside the H1: recognition → obligation → offer.

**Deadline sidebar data model** (`homepage-rewrite.md`): Added a TypeScript interface block specifying which `regulations.ts` field drives each line of every sidebar card. `reg.status` drives the pill. `reg.shortName` drives the law name. `reg.appliesToSummary` (truncated to first clause) + `reg.effectiveDate` drives the descriptive tagline. `reg.slug` drives the href. No new fields required. The four hardcoded slugs and their ordering logic (in-effect first, deadline-approaching last) are specified. A developer can build the component without opening any other file.

**Build Order item 3** (`homepage-rewrite.md`): Added explicit cross-reference: "see `blog-cta-pattern.md` → 'Placement 2 — After Penalty Section' for the exact trigger definition, component props, and urgency-line variants per law." The Build Order is now self-contained for item 3 — a developer executing it does not need to discover which file holds the placement definition.

**Multi-state FAQ answer** (`homepage-rewrite.md`): "The multi-state package covers 15+ jurisdictions" was ambiguous — two distinct multi-state products exist in `regulations.ts`. Answer now names both: the Multi-State Profiling Assessment Bundle (15+ consumer privacy states, $697, slug specified) and the Employer AI Disclosure Kit (IL/NYC/CO employment-AI, $449, slug specified). The "15+ jurisdictions" claim is verified against `regulations.ts` line 184 and retained for the correct product.

**Already Exposed mode** (`voice-spec.md`): Added "The Two Urgency Modes" section between the example sentences and the rationale. Mode 1 (Deadline Approaching) and Mode 2 (Already Exposed) are defined with pattern templates and examples. The distinction ties to `regulations.ts` status field so a developer knows which mode to apply per product page. This closes the gap the Proxy cross-cutting note identified: the Transaction-First Declarative voice was fully specified for deadline-approaching buyers but had no named register for already-exposed buyers.

## Stretch Goal

Applied. The H1 now has a note flagging the optional geo/referrer-responsive enhancement: "make the H1 respond to the buyer's state if detectable (via URL parameter, geo-IP, or referrer)" — noted in the implementation comment as optional, not blocking. This pairs the departure-board sidebar's state-specific urgency with a state-specific H1 for buyers arriving from state-specific SERPs, without requiring the developer to implement it before shipping.

## What Was Held

Per Proxy instruction, no changes to: the Build Order structure (7 items, sequenced, starred atomic step), the FAQ schema strategy on the Colorado product page, the BlogProductCTA three-placement pattern, or the voice separation table. All four are intact and unmodified.
