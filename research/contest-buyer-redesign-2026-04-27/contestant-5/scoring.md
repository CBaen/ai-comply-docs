# Peer Scoring — Contestant 5

Scored after reading: positioning.md, homepage-rewrite.md, voice-spec.md, blog-cta-pattern.md, research-log.md, ROUND-2-CHOICE.md, LOOP-2-APPLIED.md for all four peers.

Dimensions per BRIEF.md:
- **Buyer Clarity**: Does the redesign serve the deadline-anxious small business owner — or slide toward researchers / general browsers? Is the buyer named, the urgency felt, the product reachable?
- **Research Rigor**: Are statute facts verified from primary sources? Are CTR benchmarks sourced? Are unverified claims flagged? Is provenance transparent?
- **Shippability**: Can a developer implement this? Are specs concrete enough to build from? Are priorities and dependencies clear?

---

## Contestant 1

### Buyer Clarity: 8/10

The "Calm Authority" voice is well-defined and genuinely distinct from researcher copy. The eyebrow/H1/urgency-band layering — specifically naming states before the buyer has to scan — is the clearest structural solution in the field for the panicked Texas buyer at 11pm. The Loop 2 shift from "passed" to "is in effect" in the H1 is exact: one verb, correct temporal register. Penalty columns on the homepage cite per-consumer scaling ("the math, stated plainly") — that's the right buyer signal, not just the maximum figure.

The one place buyer clarity dips: the homepage still carries seven sections (five in the final version), and the "How It Works + Methodology (combined)" section, however compressed, risks re-introducing the research-library signal the redesign is trying to escape. The "Section 4" combined layout requires the buyer to scroll through process explanation before they reach a second CTA. Contestant 4's three-section product page with penalty cards at Section 3 is tighter. Minor deduction.

Also: the Texas penalty ($200,000) explicitly flagged as "[REQUIRES PRIMARY SOURCE VERIFICATION — build instance must read capitol.texas.gov statute text before shipping]" directly in the homepage spec. That flag is honest. It also means any developer who ships the homepage without doing that verification has a compliance fact problem on a compliance site. The flag protects the build instance but the copy is live-risk until verified.

### Research Rigor: 8/10

The six research categories are all present: buyer queries (WebSearch live), competitor positioning (WebFetch live: Termly, iubenda, TrustArc, TXAIMS, CO-AIMS), CTR benchmarks (First Page Sage fetched live), AI Overview behavior (Dataslayer.ai fetched live + Harvard JOLT), SMB objections (secondary sources, Reddit blocked), and primary source verification. Provenance is honest: PDF-inaccessible bill text is called out, secondary-source penalty figures are labeled, the Perplexity attempt is logged as "[UNVERIFIED — could not complete." Colorado penalty provenance corrected from their Round 1 framing after adopting Contestant 4's C.R.S. § 6-1-112 insight (logged in ROUND-2-CHOICE.md — transparency credit).

Deduction: the Texas TRAIGA verification notes "could not read primary statute text directly in this session" and relies on txaims.com (a competitor) and Greenberg Traurig for the $200,000 figure. This is the weakest primary-source record in the field for a single law. Contestant 3 fetched the Illinois primary directly; Contestant 4 cited specific penalty tiers with firm-source cross-reference for Texas. Contestant 1's Texas record is secondary-only with a live flag rather than a live verification.

### Shippability: 7/10

The homepage spec is detailed down to Tailwind class names, color values, responsive breakpoints, and a table of what's removed vs. why. The product page template has a "Conversion Bridge" section with exact copy and citation. The blog CTA pattern specifies component props, placement logic, and urgency line copy per law.

The deduction is structural: there's no explicit build-order or implementation priority sequence in this submission. Contestant 2 has a starred 7-step build order with estimated complexity per step. Contestant 4 has a flip-logic table for status-dependent UI and a `CROSS_STATE_EXPOSURE` data mapping. Contestant 1 tells a developer what to build but leaves them to figure out what ships first. For a project with one designer and continuity risk, that omission matters.

**Total: 23/30**

---

## Contestant 2

### Buyer Clarity: 8/10

The "Transaction-First Declarative" voice achieves genuine buyer orientation. "You deploy AI. You owe documents." is the tightest two-sentence version of the value proposition in the field. The Placement 2 blog CTA is the strongest across all submissions: "required by statute" obligation framing instead of feature description, "Get the Documents" instead of "See What's Included," price before explanation. The voice consistency check (transaction verb test / price visible test / obligation frame test) is a deployable editorial rule GL can apply to any future copy.

The H1 in the homepage rewrite — "AI in your business. Five states have a law about that." — is the field's weakest opening sentence. "Five states have a law about that" is a fact about the law landscape, not a statement about the buyer's situation. It doesn't name the buyer's deadline or exposure. Contestant 3's "Your state passed an AI law. Here are the documents." and Contestant 4's "Your State Has an AI Law. Here Are the Documents It Requires." both land harder because the second sentence is the offer. The 7-section homepage (vs. 5 in Contestant 1, 5 in Contestant 3/4) keeps more of the research-library structure intact.

The build-order is this submission's strongest unique value: 7 steps, starred first ship (title tags + product page H1 as one atomic step), impact-per-hour rationale for each. That's not just buyer clarity — that's translating buyer clarity into the correct developer deployment sequence.

### Research Rigor: 8/10

Research gates all verified live. Texas TRAIGA penalty tiers are the most granular in the field: curable ($10K-$12K), uncurable ($80K-$200K), continuing ($2K-$40K/day) with Norton Rose Fulbright and Baker Botts citations. The NYC per-day math ($4.5M potential exposure on 100 applications/day × 30 days) is the only submission that surfaces the practical buyer math rather than just the per-violation cap. Illinois ilga.gov URL confirmed (via blog post and style guide verbatim). Colorado primary source is PDF-inaccessible but cross-referenced with regulations.ts (labeled VERIFIED VIA MULTIPLE SECONDARY SOURCES).

Minor deduction: OneTrust competitor data comes from a cybernews comparison article rather than a direct fetch ("via search results, not direct fetch — blocked"). The note is honest but the source is secondary on a claim that could affect competitive positioning copy. Contestant 1 fetched TrustArc directly; Contestant 3 confirmed the enterprise-only gap from multiple angles.

### Shippability: 9/10

The strongest shippability record in the field. The `BlogProductCTA.tsx` component spec includes interface definition, complete JSX for all three placements, law-specific urgency line copy per placement per law, frequency rules table, frontmatter schema, and a three-test voice consistency check. The build-order converts everything into a sequenced shipping plan. Loop 2 added the atomic-step clarification (title tag + product page H1 must ship together, with exact reasoning). A developer receiving this spec could start implementation without asking a design question.

The one deduction: the 7-section homepage is slightly harder to ship than the 5-section versions elsewhere — more sections mean more decision points for a developer with no PM to ask. Not a real problem given the build-order, but the larger scope creates surface area.

**Total: 25/30**

---

## Contestant 3

### Buyer Clarity: 9/10

The highest buyer clarity in the field. The "Recognition Principle" added in Loop 2 is the most distinctive buyer-serving move across all submissions: one statute-sourced sentence per product page that surfaces something the buyer didn't know to ask. The Colorado example ("if you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations on top of these") is exactly what a compliance specialist at a counter says to the one buyer in ten who is also a developer — before they ask. The Illinois recognition sentence (zip code as location proxy explicitly prohibited by name) is more specific than anything any other contestant identified. These are not voice tricks — they're statute reads that demonstrate the site knows the inventory better than the buyer does.

The positioning statement's three concrete product examples (Colorado: June 30, 2026, 8 documents, $449 / Illinois: in effect now, 5 documents, $397 / NYC: enforcing since 2023, 7 documents, $399) are the strongest offer presentation in the field. No other contestant's positioning statement names price, document count, and status in three consecutive lines.

The pain section H2 — "The AG doesn't need to find you proactively. One complaint does it." — is the most buyer-exact sentence in the field. It names the enforcement mechanism the buyer fears (complaint-driven investigation, not proactive audit) and names the document gap (no risk management policy, no impact assessment, no consumer notice) as the thing that turns a complaint into a violation.

Minor deduction: the homepage keeps 8 sections, retaining the FAQ at section 7. Contestant 3 explicitly chose not to move it: "FAQ content is already good. No changes. Correct placement." The restraint is principled, but 8 sections is the most of any submission. On a mobile screen with continuity risk, "correct placement" at section 7 means most buyers never reach it.

### Research Rigor: 9/10

The strongest primary source record in the field. Illinois HB3773 penalties verified by fetching ilga.gov directly: "Source fetched LIVE: https://www.ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm." Colorado leg.colorado.gov bill page fetched directly. NYC DCWP page attempted (timeout) but cross-referenced with regulations.ts. The research log notes the Perplexity check for aicompliancedocuments.com ("the site is not currently being cited in AI answers on this topic") — the only submission that checked Perplexity citation status for the site itself. The "$5,000-$50,000 bias audit" NYC competitor pricing was surfaced from the field and used to reframe the $399 NYC package as pre-audit infrastructure — a pricing anchor argument no other contestant made.

The one deduction: the Colorado $20,000 penalty is "verified via WebSearch" rather than primary statute text — same situation as every other contestant, but stated less explicitly than Contestant 4's Colorado provenance note (which traces it explicitly to the CCPA enforcement mechanism with a C.R.S. § 6-1-112 citation). Contestant 4 set the bar for Colorado penalty transparency; Contestant 3 is the second-best record, not the best.

### Shippability: 8/10

The right-side product selector spec (law name / status badge / price / arrow link — no images, no animation) is the cleanest above-fold product routing in the field. The urgency band (dark strip, 60px height, law / deadline / arrow) is specified at the component level. The Section 3 pain section card specs (card 1: red left border / card 2: amber / card 3: slate) are implementable without a design meeting. The "one recognition sentence per product page" rule in the voice spec is an actionable editorial standard.

The deduction: no build order or implementation priority sequence. Like Contestant 1, this submission is rich in specification but leaves the ship-first decision to the developer. Given GL's continuity risk, the build order is not a nice-to-have — it's the spec element that decides whether the most impactful changes land in the first session. The Loop 2 additions (recognition sentences for Colorado, Illinois, NYC) are high-quality but require reading the statutes before writing, which means they're not the right first ship even though they're distinctive.

**Total: 26/30**

---

## Contestant 4

### Buyer Clarity: 8/10

The two-mode frame (Deadline Approaching / Already Exposed) is the most structurally complete answer to the full buyer population. Every other submission handles Colorado's future deadline well; Contestant 4 explicitly articulates that the NYC employer who didn't know about Local Law 144 is in a different emotional state than the Colorado buyer — they're post-deadline, retrospectively exposed, and need "acting now is the right move; documentation is your first defense" rather than countdown urgency. The Loop 2 `AlsoExposedStrip` component — built on a cross-state exposure mapping filtered by `status === "in-effect"` — is the only submission that addresses multi-state buyers who arrive via a single-state SERP result and don't know they have parallel exposure.

The post-June-30 variants in the homepage spec (meta description, CTA header, urgency panel all-red update) are the only submission that plans for the date passing. The "The deadline doesn't move" CTA header is the field's best closing line because it names the buyer's specific psychological loophole (hoping the Colorado deadline will be extended again, as it was from February to June).

Deduction: the FAQ section is the most thorough but also the longest of any submission — 6 questions with full-paragraph answers. Q4's "Eight hours of attorney time at $600/hour is $4,800. The Colorado package is $449" is excellent. But 6 FAQ items below the fold, with multi-paragraph answers, is the closest this submission comes to the research-library register it's trying to exit. The voice note acknowledges Q4 "sounds like the old blog voice" — intentional, but it pulls the page back toward explanation.

### Research Rigor: 9/10

The research citation table in rationale.md is the most complete and transparent provenance record in the field. Every claim has an explicit source, every source is a URL, and uncertainty is flagged before the buyer reads it. The Colorado penalty provenance note — "The statute itself (SB24-205) does not specify a dollar amount — it specifies that violations are deceptive trade practices under CCPA. Any developer implementing the penalty copy should verify the current CCPA penalty ceiling (C.R.S. § 6-1-112) directly before publishing" — is the most legally precise statement on this question in the entire field. Every other contestant adopted this framing after the field summary revealed it. Contestant 4 originated it.

NYC enforcement escalation sourced from the December 2025 NY State Comptroller audit and DLA Piper January 2026 analysis — two sources that confirm increasing DCWP investigation activity, not just penalty amounts. The AI small business adoption figure (58% in 2025, adventure PPC) is the only submission that quantified the buyer population size.

The one deduction: there's no dedicated research log file — the research citations are distributed across rationale.md, ROUND-1-COMPLETE.md, and inline in product-page-template.md. The research is there and it's strong, but the absence of a consolidated research-log makes provenance auditing slower than Contestant 3's explicit "fetched LIVE" notation or Contestant 2's six-gate log.

### Shippability: 9/10

The Loop 2 `AlsoExposedStrip` component spec with a defined `CROSS_STATE_EXPOSURE: Record<string, string[]>` data structure, filtered by `status === "in-effect"`, is the only submission that specifies a data schema change alongside the UI component. The flip-logic table mapping `status === "effective-soon"` vs. `status === "in-effect"` to every affected UI element — badge color, H1 text, sidebar label, penalty section header, meta title — with a single-field trigger in `regulations.ts` is the most implementation-ready spec in the field. The post-June-30 homepage variants remove all the maintenance debt that accumulates when a date-specific site doesn't plan for the date passing.

Minor deduction: no build-order with relative priorities. Like Contestants 1 and 3, the developer knows what to build but not what to ship first if continuity ends. The two-mode flip-logic is sophisticated and correct; it's also harder to ship incrementally than Contestant 2's "title tags first, 45 minutes, nothing else changes" atomic step.

**Total: 26/30**

---

## Summary Table

| Contestant | Buyer Clarity | Research Rigor | Shippability | Total |
|---|---|---|---|---|
| 1 | 8 | 8 | 7 | 23/30 |
| 2 | 8 | 8 | 9 | 25/30 |
| 3 | 9 | 9 | 8 | 26/30 |
| 4 | 8 | 9 | 9 | 26/30 |

Contestants 3 and 4 tie at 26/30 on different axes: Contestant 3 leads on buyer clarity and research rigor; Contestant 4 leads on shippability and structural completeness. If I had to choose one submission to ship from tomorrow, it is Contestant 2 — not because of the total score (25/30, third) but because the build-order is the only one that answers "what do I do in the first hour with limited continuity?" and the atomic step (title tags + product H1 together) is the highest-leverage single change. If I had to choose one submission for the full redesign, it is Contestant 3 — the Recognition Principle alone will differentiate the product pages from every competitor in the SERP.

---

## Self-Reflection: Where Is Contestant 5's Work Weakest Relative to the Field?

**Build order.** Contestant 2's starred seven-step sequence is the clearest signal I missed. My blog-cta-pattern.md has a five-post priority order for which blog gets CTAs first. My new-page-spec.md describes the `/compliance-deadline-by-state` page. But I never wrote "here is what ships in session one, in this order, if continuity ends mid-session." Contestant 4's flip-logic table and Contestant 2's atomic step both answer the question my work leaves open. This is the gap that costs in a continuity-constrained project.

**The recognition principle.** Contestant 3's statute-sourced recognition sentence per product page — the one thing the buyer didn't know to ask — is a move I didn't make. My product-page-template.md gives the structure and the penalty provenance; it doesn't give the one deployer/developer distinction that separates a site that read the statute from a site that summarized it. That sentence is the expert credential made legible to a buyer in eight seconds.

**Two-mode buyer clarity.** Contestant 4's explicit "Deadline Approaching / Already Exposed" frame is more complete than my treatment. I named Colorado as the urgency case and addressed the other laws as "in effect now" — but I didn't write CTA copy variants, visual mode variants, and status-derived UI logic that handled the retrospectively-exposed NYC employer as a distinct buyer with a distinct emotional state. My urgency band does the visual work; my CTA copy doesn't do the emotional differentiation.

**What my work got right that the field didn't match:** The EEOC blog mid-article bridge specification (plain "Here's what replaced it." + three inline links — not a styled CTA block) came out of reading the actual MDX file and understanding that the EEOC post's structure is a transition story, not a law explanation story. The bridge has to feel like the article, not like an interruption. No other submission specified the typography and rendering context of the EEOC bridge copy at that level. That's a detail that will determine whether the conversion move works or gets ignored by the reader.
