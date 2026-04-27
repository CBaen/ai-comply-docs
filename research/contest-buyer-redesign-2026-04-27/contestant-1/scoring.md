# Phase 4 — Mutual Peer Scoring
# Written by: Contestant 1

---

## Scoring Dimensions (per BRIEF.md)

**Buyer Clarity (1–10):** Does the work make the buyer's situation, urgency, and offer immediately legible? Not "does it have good copy" — does the PAGE EXPERIENCE route a panicked SMB owner to a purchase with minimum friction?

**Research Rigor (1–10):** Are penalty figures, statute citations, effective dates, and claims sourced from .gov primary sources or flagged with integrity notes? Are unverifiable claims marked?

**Shippability (1–10):** Can a developer ship this without guessing? Are components named, file paths specified, Tailwind classes given, conditional logic explained, implementation order prioritized?

---

## Contestant 2 — Transaction-First Declarative

### Buyer Clarity: 8

C2's voice spec is the sharpest in the field. "IRS crossed with a good hardware store" is not just a metaphor — it's an editorial policy that produces measurably different copy. The example sentences demonstrate it: "Colorado. June 30. You're a deployer. Here are the 8 documents you owe." is 12 words that do the full job. The "buyer is the hero, not we" rule produces the right center-of-gravity for every CTA ("You owe these documents. We built them."). The homepage rewrite correctly kills the carousel, introduces the deadline sidebar as the urgency anchor, and puts price above the fold. The transaction verb test, price visible test, and obligation frame test in the blog CTA pattern are concrete enough for a developer to apply without judgment calls.

The gap: C2's hero H1 is "AI in your business. Five states have a law about that." — clear, but softer than its own voice spec's best examples ("Colorado. June 30. You're a deployer."). The hero doesn't quite reach the voltage of the voice spec's stated examples. The eyebrow alternates by A/B state — which is smart — but the spec doesn't name which state should be default if no A/B framework is in place. Minor incompleteness for a panicked buyer at 11pm.

### Research Rigor: 9

C2 is the most meticulous about integrity flags. Every penalty figure gets a footnote: "verified per C.R.S. § 6-1-112(1)(a) via regulations.ts" or "confirmed per 775 ILCS 5/8A-104, confirmed in BLOG-STYLE-GUIDE.md verbatim." The Colorado $20K provenance is called out correctly — the penalty derives from the CCPA enforcement mechanism, not directly from SB24-205. The 90-day cure period gets an explicit "[REQUIRES VERIFICATION]" flag before it ships buyer-facing. Texas TRAIGA penalty figures ($80,000–$200,000 / $2,000–$40,000 per day) are provided with a citation to HB 149 Sec. 552.105(a) — more specific than any other contestant. No figures appear as bare assertions without a source trail. The build order explicitly calls out which items depend on primary source verification before ship.

One knock: the DCWP "proactive investigations" claim in the NYC ad description cites "regulations.ts penaltySummary (built from DCWP source)" — this is a second-order citation rather than a primary source. Small but noted.

### Shippability: 9

C2 is the only contestant who includes a priority build order ranked by impact-per-hour. "Ship item 1 first. Title tag changes affect every impression the site already receives. No new traffic needed." That's an operational decision embedded in the deliverable. Seven items ranked, with time estimates, with the atomic-step insight (title tags and H1 must ship together because one creates a promise the other must fulfill). Implementation notes throughout are developer-specific: line numbers in page.tsx, Tailwind classes, conditional logic by `reg.status`, JSON-LD alongside existing Product schema, MDX frontmatter structure. The blog CTA component has actual JSX, not pseudocode. The `DeadlineCountdown.tsx` component is named and its `"use client"` requirement is flagged.

The one area where shippability weakens: the deadline sidebar's A/B state alternation is described but no fallback default state is named.

**C2 Total: 26/30 (8 + 9 + 9)**

---

## Contestant 3 — Hardware Store Voice / Recognition Principle

### Buyer Clarity: 9

C3 produces the field's most buyer-shaped hero experience. "Your state passed an AI law. Here are the documents." — two lines, thirteen words, H1 and sub-line complete the job. The hardware store model is operationalized precisely: "you came in for a fitting, here it is." More importantly, C3 names the recognition principle and demonstrates it with specific examples that show the site read the statute rather than just summarizing it. The Illinois zip-code-as-proxy sentence ("If you use zip codes as a proxy for location in any AI employment decision, that's explicitly prohibited by name in the statute") is the field's best single demonstration of "compliance store that actually read the law." A buyer who wasn't sure whether to trust the site encounters that sentence and their doubt closes.

The urgency band below the hero is the right structure — dark strip, three laws, status badges, direct links. The product selector on the desktop right column is more useful than C2's sidebar because it shows law shortname / status / price / arrow as a scannable list, not a card with prose. The section order — pain before methodology — is correct and well-reasoned. The "FAQ stays exactly as-is, no copy changes" call is confident and right.

The gap: C3's mobile hero is excellent ("four lines of text and a button") but the spec doesn't specify what happens to the right-column product selector on mobile. Three text links below the button is mentioned, but it's not detailed enough for a developer to implement without guessing at the layout.

### Research Rigor: 9

C3 did primary source fetches and documented them explicitly: "775 ILCS 5/8A-104 fetched live," "Colorado CPA via WebSearch," "CTR benchmarks (First Page Sage 2026 — position 4 = 7.2%, fetched live)," "TrustArc enterprise-only confirmed." The product page template sources Colorado $20K to "Colorado CPA via WebSearch" and the recognition sentence sources the developer/deployer distinction to "SB 24-205, C.R.S. § 6-1-1702" with a leg.colorado.gov link. The research log is referenced as the authoritative citation trail. The citation at the bottom of the positioning statement ("Live competitor analysis (TrustArc fetched live, NYC bias audit vendors confirmed via WebSearch)") shows that C3 ran actual searches rather than relying on training memory.

The one note: the Illinois product page recognition sentence cites "775 ILCS 5/2-102(L)" throughout — this is the amendment location, not 775 ILCS 5/8A-104 which is the penalty section. The document citations and the penalty citations draw from different sections of the same statute, and C3 uses them correctly in context, but a developer reviewing the files would need to track which citation goes where.

### Shippability: 8

C3's implementation is well-specified. The visual direction includes Tailwind hex values, exact font sizes, specific class names. The hero layout is described as "CSS grid change, not a component rewrite." The product card has pixel dimensions and hover interaction specified (border color changes to Document Blue 2px — "no transform, no lift"). The blog CTA has four distinct components described: inline links, mid-article CTA card, mobile sticky bottom bar, end-of-post block — each with placement logic, scroll-depth trigger, implementation notes. The `productCta` frontmatter schema is given.

The gap: C3 specifies the recognition principle ("one recognition sentence per product page") and gives examples for three products, but doesn't name the technical mechanism for surfacing it — is it hardcoded per slug, a new frontmatter field, or a `regulations.ts` property? The hardware-store analogy is clear but the implementation path for the recognition content isn't resolved.

**C3 Total: 26/30 (9 + 9 + 8)**

---

## Contestant 4 — Two-Mode Frame / Compliance Specialist at the Counter

### Buyer Clarity: 9

C4's two-mode frame (Deadline Approaching / Already Exposed) is the field's most original structural contribution. Every other contestant uses urgency as a degree; C4 uses it as a category. The insight is correct: a Colorado buyer in April 2026 needs "you have 64 days" while an NYC employer who missed 2023 needs "you are currently exposed, documentation is your first defense." These are not the same urgency and they require different copy. C4 names this distinction and implements it through every surface — hero, H1, deck, stats bar, sidebar label, meta title, final CTA. The flip logic table in the product page template is the most sophisticated implementation spec in the field.

The AlsoExposedStrip component is a genuine conversion insight that nobody else produced: the buyer who arrives on the Colorado page via SERP and hasn't seen the homepage may not know they're also exposed to Illinois. Rather than hoping they navigate there, C4 surfaces that cross-state exposure at the point of maximum attention (after the penalty section on the product they're already buying). The CROSS_STATE_EXPOSURE mapping is implementable as-is.

The July 1, 2026 spec ("what does the site look like when all countdowns end?") is the only answer to a question every site in this category will eventually face. C4 answered it before being asked.

The gap: C4's homepage H1 is "Your State Has an AI Law. Here Are the Documents It Requires." — correct and buyer-shaped but almost word-for-word identical to C5's H1. Both have "your state has an AI law" as the entry. C4's H1 is slightly longer without being sharper. The voice spec examples are strong ("SB 24-205 requires 8 documents from every deployer. Here they are.") but the homepage hero doesn't quite reach that economy.

### Research Rigor: 9

C4 documented every penalty figure with both the primary source and the derivation path. The Colorado $20K provenance note is exemplary: "Colorado $20,000/violation penalty: verified via AI Certs and aicompliancedocuments.com/blog, cross-referenced with leg.colorado.gov/bills/sb24-205." The blog citation is secondary but the .gov cross-reference is primary. The Illinois $70K figure cites the exact ILCS URL. The NYC penalty cites both the NY State Comptroller audit and DLA Piper. Every integrity note in the product page template says "verify against current CCPA ceiling before publishing" — this is the right flag for a figure derived through an enforcement mechanism rather than direct statute reading.

C4 also caught and disclosed a provenance issue I had already found: the $20K Colorado penalty derives from C.R.S. § 6-1-112 (the CCPA enforcement mechanism) rather than directly from SB24-205. That disclosure in the positioning rationale and the product page integrity note is honest and shippable — the developer knows to verify before publishing.

One note: the Texas TRAIGA is listed as "in effect 2026" without a specific date or penalty citation in the positioning statement. The voice spec urgency bar includes "Up to $200K/violation" for Texas but the positioning research basis doesn't cite the Texas TRAIGA penalty primary source.

### Shippability: 10

C4 is the most developer-ready submission in the field. The flip logic table in the product page template maps every affected UI element — badge color, H1 text, deck text, stats bar content, sidebar label, countdown, penalty section header, meta title — to each `status` value. The mechanism is named: one field update in `regulations.ts`, committed and deployed via Vercel. No cron job, no date math on the client, no server-side computed value — and the reasoning for that choice ("flash-of-wrong-mode on first render") is given.

The AlsoExposedStrip has a TypeScript interface: `CROSS_STATE_EXPOSURE: Record<string, string[]>`, a named component, filter logic by `status === "in-effect"`, position in the page section order, visual spec (Enforcement Red left border, compact cards, 3-up desktop, horizontal scroll mobile), and copy logic for both modes. The July 1, 2026 state of the site describes exactly which elements update manually (meta description in page.tsx) and which update automatically (product cards via regulations.ts, status badges). A developer could ship every element in this spec without a single clarifying question.

**C4 Total: 28/30 (9 + 9 + 10)**

---

## Contestant 5 — Calm Hardware Store / "Short by Discipline, Not by Laziness"

### Buyer Clarity: 8

C5's H1 is excellent: "Your state has an AI law. We built the documents that comply with it." — 14 words that complete the full buying argument. The phrase "short by discipline, not by laziness" is not just a voice principle — it's a quality gate. The 10-item negative list in the voice spec is the field's most actionable: "Does not run long. A marketing surface hero copy block is 3 sentences maximum. If a third sentence is needed, it must carry price, delivery, or urgency. If it carries none of those, cut it." That is a testable rule.

The urgency band below the H1 (not a paragraph — a single horizontal strip of deadline facts, state names linked to product pages) is a better implementation than most contestants' sub-H1 prose blocks. The trust strip "From $49 · Instant download · No subscription · Powered by Stripe" in plain text (not icons) — "plain text reads as factual" — is a sharp insight.

The EEOC post gap was caught in Loop 2 and the solution (plain inline link bridge rather than styled CTA block, because "it reads as a natural transition") is right. The "Also Required? These Add-Ons Cover the Rest." add-on section rename turns a cross-sell into a completeness signal — best framing in the field for that element.

The gap: the five-section homepage removes the FAQ entirely from the homepage. C4 and C2 keep a compressed FAQ (4–6 questions). C5's reasoning ("a 9-item FAQ accordion reads as a manual the buyer must read before they can purchase") is correct as a reason to remove the 9-item accordion, but complete removal leaves the buyer who has the specific objection ("does this apply to my size of business?") with no inline answer. The `/faq` route they'd route to adds a click and a page load to a buyer who's already anxious.

### Research Rigor: 8

C5's positioning statement sources every major claim: Colorado penalties to C.R.S. § 6-1-112(1)(a), Illinois to 775 ILCS 5/8A-104, Texas TRAIGA to "up to $200,000 per uncurable violation," NYC to "active since July 5, 2023." The product page template is careful about the law firm price comparison: "The '$3,000–$10,000' law firm range from v1 should remain flagged as REQUIRES VERIFICATION before publishing. The softer version above is defensible without a citation." That's honest. The verified badge on the sidebar card distinguishes "SB 24-205, as amended by SB 25B-004" — the amendment is named and sourced.

The gap: C5's research is accurate but the sourcing trail in the deliverables themselves is thinner than C2, C3, or C4. The positioning statement sources the penalties but the homepage rewrite, product page template, and ad creative don't uniformly repeat which source backs which figure. A developer implementing from these files without the positioning statement would ship some penalty numbers without being able to verify them. The research is done; the citation linking into each deliverable is incomplete.

### Shippability: 8

C5 is shippable but not at C4's precision. The homepage rewrite names sections clearly, specifies the CSS properties for the eyebrow label, and gives the urgency band implementation as a horizontal strip with deadline text linked by state name. The product page has a clean section order, specific H2 copy, and the affirmative defense closing line ("These documents are your affirmative defense") is preserved as an implementation note. The blog CTA pattern has four components described and the EEOC bridge implementation is specific (three plain inline links rather than a styled component block, positioned between the removal section and the state law section).

The gap: the product page document list uses a grouping by statutory obligation (Risk Management Program / Impact Assessment / Consumer Disclosures / Oversight & Response) but adds a caveat: "(Exact document names should match regulations.ts for this slug — the grouping above is illustrative.)" That is an honest limitation but it's not resolved. The developer needs to cross-reference regulations.ts manually to implement this section. C4 has this resolved through direct reference to the `documents` array and `DOC_EXPLANATIONS` map.

**C5 Total: 24/30 (8 + 8 + 8)**

---

## Summary Table

| Contestant | Buyer Clarity | Research Rigor | Shippability | Total |
|---|---|---|---|---|
| C2 | 8 | 9 | 9 | 26 |
| C3 | 9 | 9 | 8 | 26 |
| C4 | 9 | 9 | 10 | 28 |
| C5 | 8 | 8 | 8 | 24 |

---

## Where C1 (Self-Reflection) Was Weakest

Against these four submissions, three areas where my own work falls short:

**1. Shippability — no prioritized build order (until Proxy Loop 2).** C2 produced a 7-item build order in Round 2, explicitly ranked by impact-per-hour. C4 embedded implementation notes with file paths, line numbers, and conditional logic throughout. My deliverables have good component specs but no single artifact that says "ship these in this order, for these reasons." A developer arriving after the contest could read my files and implement correctly, but they'd have to determine their own sequencing.

**2. The two-mode frame — I didn't name it.** C4's Deadline Approaching / Already Exposed distinction is a better structural insight than my "urgency band." I approached the same problem (some laws have future deadlines, some are already in force) through visual design (Ember Red for both) rather than through copy architecture. C4 resolved this as a copy system with different H1s, different deck copy, different sidebar labels per mode. My approach produces the right visual urgency but not the right emotional register for the already-exposed buyer.

**3. Research provenance depth — citations are in my work but not uniformly linked in each deliverable.** C2's integrity notes appear in the ad creative ("$20K penalty per violation — verified per C.R.S. § 6-1-112(1)(a) via regulations.ts. June 30, 2026 — verified via leg.colorado.gov/bills/sb25b-004"). C4's product page says "verify against current CCPA ceiling before publishing" on every penalty reference. My penalty figures are correctly sourced but a developer reading only my homepage-rewrite.md or ad-creative.md in isolation would not have the source trail.

The recognition principle (C3's one statute-sourced sentence per product page that surfaces what the buyer didn't know to ask) is the field's best original contribution that I didn't produce. "If you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations" — I knew the deployer/developer distinction from primary source research but I didn't find the sentence-shaped version of it for a product page. That's a miss.
