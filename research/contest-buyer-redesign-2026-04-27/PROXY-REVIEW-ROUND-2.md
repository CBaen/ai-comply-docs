# Proxy Review — Round 2 Tightening Pass

*Contestants C4, C3, C2. Written after reading all final Round 2 files including Loop 2 applied changes.*

---

## Contestant 4 — Compliance Specialist + Two-Mode Frame (rank 1, 27.25/30)

### Tighten this

- **The H1 word count is off.** "Colorado SB 24-205. 8 Documents. June 30, 2026." is twelve words across three fragments. The voice spec says the specialist at the counter hands it to you "without a lecture" — and this H1 nearly does that. But compare it to C3's: "Your state passed an AI law. / Here are the documents." vs. C4's product page H1 structure. The C4 homepage H1 — "Your State Has an AI Law. Here Are the Documents It Requires." — has a soft spot: "It Requires" adds three words that are already implied. The buyer on the homepage doesn't need "requires" spelled out. Try: "Your State Has an AI Law. Here Are the Documents." That's the same move at one less word. Small, but the spec should model the discipline it prescribes.

- **Build order is missing and that gap is visible.** C4 self-named this. The `AlsoExposedStrip` component, the flip-logic table, the post-June-30 variant copy — this is a lot of build surface with no sequencing. A developer inheriting this spec will ask: where do I start? The absence of a build order is the one thing that could slow an otherwise deployment-ready spec. Two or three priority-ranked items in the Loop 2 Applied notes would close this gap without bloating the spec. It doesn't need to be C2's full seven-item list — just a "ship these first" signal.

- **The sidebar "64 days remaining" is a hardcoded number in the spec.** The spec says "64 days remaining" as if that value will carry forward. The product-page-template.md should specify that this is a dynamically computed value (from `Math.ceil((new Date('2026-06-30') - new Date()) / 86400000)`) — not a static string. C3's spec already calls this out explicitly. C4's should match that precision, because a developer reading C4's sidebar spec will ask whether to hardcode it.

- **The `AlsoExposedStrip` emoji row markers.** The strip spec uses 🔴 and 🟡 as visual indicators inside a structured component spec. That's a design placeholder, not a visual direction decision. The visual-direction.md specifies a strict semantic color system (Enforcement Red, Deadline Amber) — but the strip spec doesn't connect those named tokens to the component. Replace the emoji notation with the actual color variable names from the visual-direction spec. The developer shouldn't have to infer the mapping.

- **Colorado $20K provenance flag is present but not resolved.** C4 has the correct flag on every penalty reference: "Developer must verify current CCPA ceiling before publishing." That flag is responsible. But the tightening pass is the moment to sharpen what "verify" means. What specific statutory section should the developer check? The chain is: SB24-205 enforcement mechanism → C.R.S. § 6-1-112 → current penalty cap. Write that chain in one line so the developer has a navigation path, not just a warning.

### Don't change

- The two-mode frame and its Deadline Amber / Enforcement Red visual system. This is the field's strongest structural contribution. Do not simplify it, do not collapse the modes, do not make it a toggle.
- The `AlsoExposedStrip` concept and its placement (after penalty section, before document preview). The position is right — the buyer is still in evaluation mode there, not post-decision mode.
- The flip-logic table in product-page-template.md. Every UI element mapped to its before/after state. This is exactly what a developer needs. It's the spec equivalent of the Recognition Principle — it shows the site thought through the consequence, not just the feature.
- The July 1, 2026 all-exposed scenario. Addressed clearly and accurately. The all-red urgency panel is correctly framed as a signal of present exposure, not a design failure.
- The voice spec's two-mode example shapes: "[Law name]. [Deadline date]. [What you need]. [Price]. Ready now." vs. "[Law name] is in effect. Enforcement is active. [What you need]. [Price]. Download today." These are the clearest per-mode templates in the field. They should not be altered.

### Stretch goal (optional)

The recognition principle — the one sentence per product page that surfaces what the buyer didn't know to ask — is not yet in C4's product-page-template.md. C3 added it explicitly in Loop 2 and gave it a name in their voice spec. C4's product page is excellent, but Section 3 (Exposure Summary) is structured around confirming the buyer's known situation, not surfacing the unknown one. One recognition sentence in Section 3 — the deployer/developer distinction for the buyer who is also a developer — would complete the product page without adding length. C4 has the voice and the structural discipline to deliver this in one sentence. It would be the one addition that lifts an already strong product page to the field's best.

---

## Contestant 3 — Hardware Store + Opinionated Minimalism (rank 2, 26.0/30)

### Tighten this

- **The hero product selector is still underspecified.** The homepage rewrite shows the product selector as a three-row table with `[JUN 30]`, `[IN EFFECT]`, labels and prices. That's the concept. But the visual-direction.md spec defines a strict semantic color system — Document Blue, Deadline Amber, Statute Green, Enforcement Red. The product selector rows carry status badges. Which badge color applies to the `[IN EFFECT]` badge on the Illinois row? Enforcement Red, presumably — but the selector spec doesn't say that. The eyebrow spec uses Deadline Amber precisely. The selector spec doesn't carry that same precision. Add the color token name to each badge in the selector spec: `[IN EFFECT — Enforcement Red]`, `[JUN 30 — Deadline Amber]`. One added word per row; makes the spec implementation-ready.

- **The eyebrow names only Colorado.** "COLORADO SB 24-205 DEADLINE: JUNE 30, 2026" is the most specific urgency signal in the field at the eyebrow position — that's a genuine strength. But a buyer who arrived searching for Illinois or NYC reads a Colorado eyebrow first. The sub-H1 below the main H1 does show "Colorado · Illinois · NYC · California · Texas" as scent markers. But that's below the H1. The eyebrow should rotate by law, or at minimum show two states. A simple approach: "COLORADO — JUNE 30, 2026  ·  ILLINOIS & NYC — IN EFFECT NOW" in the eyebrow keeps the specificity while covering more arrival paths. This is a one-line copy change.

- **Section 8 (Final CTA) opens with three law names and three deadlines in one H2.** "Colorado's deadline is June 30. NYC is enforcing now. Illinois penalties start at $16,000." That H2 is doing the right thing — naming specifics instead of generic urgency. But "penalties start at $16,000" is an odd frame for the final CTA. "Start at" implies a floor; it's less threatening than the top figure. The rest of the spec uses penalty maximums consistently ($20K for Colorado, $70K for Illinois). Align the final CTA: "Illinois penalties up to $70,000" — same as the pain section copy. One word change: "start at" → "up to."

- **The blog grid removal needs a navigation alternative.** The spec says "the blog grid anywhere on the homepage" is removed, and "blog moves to Resources nav." But the IA proposal section doesn't specify what "Resources" looks like in the nav. The current nav presumably has Blog as a menu item. The spec should say explicitly where the blog link lands in the new nav — otherwise a developer removes the homepage blog grid and has to decide where blog traffic enters the site without guidance. One line in the IA proposal closes this.

### Don't change

- The Recognition Principle and its product-page implementation. The deployer/developer sentence in Section 1 of the Colorado product page ("If you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations...") is the field's best single piece of product copy. It does everything: statute-sourced, marketing-voice, useful to the buyer who needs it, invisible to the buyer who doesn't. Don't edit it. Don't expand it.
- The strict semantic color system. Deadline Amber strictly for urgency/deadline signals. Statute Green strictly for verified badges. Document Blue strictly for CTAs. This is the kind of constraint that prevents design drift over time. Its value is in its strictness — don't add exceptions.
- The pain section at position 3. Moving pain before product is the correct IA call. The existing position (buried in the old page) was wrong. The new position (before the full product selector) is right. Keep it.
- The hardware store test in the voice spec. "Would a hardware store say it?" is the clearest voice calibration tool in the field. It works as a negative test (cuts out abstract noun piles) and a positive test (validates brevity and specificity). Keep it exactly as written.

### Stretch goal (optional)

The recognition principle examples for Illinois and NYC (zip-code-as-proxy; independent auditor requirement) are in the voice spec. They're not yet in the product-page-template.md — that file only specs the Colorado page. Before Phase 10, add one recognition sentence to the Illinois and NYC product page specs as examples of the pattern applied cross-product. This doesn't require writing full product pages for those states — just one sentence per recognition moment, with a note that the pattern applies to all product pages. It demonstrates the principle is a system, not a one-off Colorado insight.

---

## Contestant 2 — Transaction-First Declarative (rank 3, 25.5/30)

### Tighten this

- **The H1 is the spec's weakest element and C2 named it.** "AI in your business. Five states have a law about that." The second sentence is the problem. "Have a law about that" is loose. "About that" refers back to "AI in your business" — but the antecedent is vague. The buyer who arrived searching "Colorado AI compliance" knows the law is about more than "AI in your business" — it's about specifically AI in *hiring decisions* or *consequential consumer decisions*. "Five states have a law about that" sounds like a general awareness statement, not an obligation signal. Compare to C4's homepage H1 ("Your State Has an AI Law. Here Are the Documents It Requires.") — same two-sentence structure, but C4's second sentence delivers the product. C2's second sentence delays it. Proposed revision: "AI in your business. Five states have a law. Here are the documents." Three short lines. The third line is the offer, not the second sentence's hedge. This keeps the Transaction-First Declarative pattern and closes the gap C2 already identified.

- **The departure-board deadline sidebar is under-componentized.** The hero copy is tight. The deadline sidebar spec (four law cards, right column on desktop) is described at the CSS class level (`bg-white/10 border border-white/20 rounded-lg p-3`) but the data model driving it isn't specified. Which field from `regulations.ts` provides the "AI hiring tools. July 2023." descriptive line? Is that a new field? Does it come from `reg.description`? Does it need a new `sidebarTagline` field? The visual-direction.md and the implementation notes in product-page-template.md are developer-precise elsewhere. The sidebar needs that same precision: a TypeScript interface snippet or a note about which existing field drives each line of the card.

- **The Build Order item 3 (Blog CTA component — 2 hours) gives "Placement 2 only" without defining what Placement 2 is for a developer who hasn't read blog-cta-pattern.md.** The Build Order should be self-contained enough for a developer to execute without cross-referencing another file. Either inline the placement definition in the Build Order ("mid-article, after the penalty section, as specified in blog-cta-pattern.md") or add a cross-reference. One line closes the gap.

- **The FAQ section on the homepage has four questions in the new voice — but one answer has a precision issue.** The "What if I operate in multiple states?" answer says "The multi-state package covers 15+ jurisdictions." Verify: does the product catalog currently have a multi-state package? If yes, specify the price and link. If no, cut the sentence. "15+ jurisdictions" is a specific claim about a specific product; the spec should either confirm it exists and what it costs, or remove it. A buyer who reads this answer and clicks to buy the multi-state package needs to find it.

### Don't change

- The Build Order structure itself — 7 items, sequenced by impact-per-hour, with the atomic-step pairing of title tag + product page H1. This is the field's clearest operational contribution. It makes the redesign executable under continuity constraints.
- The FAQ schema on the Colorado product page (item 6 in the Build Order). The AI Overview citation strategy via FAQ structured data is well-reasoned, correctly positioned, and paired with the right content. The four Q/A pairs are the right questions and the answers are statute-exact.
- The BlogProductCTA component concept and its three-placement logic. Placement 2 (mid-article, after penalty section) is the correct first ship. The pattern scales to all 23 blog posts once the first placement is proven.
- The voice separation table. Surface / Voice / Pattern — clear, complete, and leaves no ambiguity about where the Transaction-First Declarative voice applies and where the blog's Realist/Credentialist voice continues unchanged. This should be adopted or adapted in any hybrid synthesis.

### Stretch goal (optional)

The departure-board hero (right-column deadline sidebar) is the field's strongest above-the-fold design for a buyer who already knows their state's law. But the hero H1 is state-agnostic ("AI in your business. Five states have a law about that."). The sidebar is state-specific (four named law cards). These two elements are pulling in opposite directions — general awareness vs. specific urgency. One revision could unify them: make the H1 respond to the buyer's state if detectable (via URL parameter, geo-IP, or referrer), showing "Colorado has an AI law. June 30, 2026." for a buyer arriving from a Colorado-specific SERP. That's not a trivial implementation, but the spec could note the pattern as an optional enhancement — it would make the departure-board concept pay off at the H1 level, not just in the sidebar.

---

## Cross-Cutting Tightening Note (for the orchestrator)

**The three contestants could borrow one specific thing from each other without losing their identity.**

C4 should borrow C3's Recognition Principle by name — not the concept (C4 already has the deployer/developer insight in the deck copy), but the named pattern in the voice spec. Having an explicit rule called "Recognition Principle" with a one-sentence template tells any writer who applies the spec exactly what to look for per product page. Right now C4's product copy has the thing; C4's voice spec doesn't have the rule. C3 has both.

C3 should borrow C4's flip-logic table structure — the explicit before/after mapping for every urgency-mode-sensitive element. C3's semantic color system is right but the product-page-template.md doesn't specify what changes when a law moves from `effective-soon` to `in-effect`. After June 30, what happens to C3's Deadline Amber eyebrow on the Colorado page? It should become Enforcement Red — but the spec doesn't say that. C4's flip table answers that question precisely. C3 needs an equivalent.

C2 should borrow C4's Already Exposed / Deadline Approaching voice mode structure — explicitly. C2's voice spec (Transaction-First Declarative) is excellent for a buyer in Deadline Approaching mode. But the Already Exposed register isn't named or exampled in C2's voice spec. The Illinois and NYC product pages under C2's spec would use the same declarative voice as Colorado — but the emotional register should be different (calm urgency, present-tense exposure vs. countdown pressure). C4's two-mode structure, applied to C2's voice, would complete C2's product page coverage without changing the Transaction-First Declarative core.

**For Phase 10 (Hybrid Synthesis):** The strongest synthesis would carry C4's structural frame (two-mode urgency, flip logic, AlsoExposedStrip), C3's semantic color discipline and Recognition Principle, and C2's Build Order and BlogProductCTA component pattern. These three contributions are complementary — none of them conflict. A hybrid spec that integrates all three has everything needed to ship: the structural logic (C4), the design constraint system (C3), and the build sequence (C2).
