# Contest Brief — Buyer-Focused Redesign of aicompliancedocuments.com

**Contest:** buyer-redesign-2026-04-27
**Mode:** Standard (full machinery — Proxy coach, two-round visibility, reflective loops, dissent moment, tightening)
**Contestants:** N=5
**Top-K for tightening:** 3
**Domain:** Positioning + on-page redesign + keyword strategy
**Stakes:** Real revenue. Site has 10,513 impressions / 28 days / 0 sales.

---

## The Challenge

Five of you are working in parallel on the same brief. You will produce independent answers. None of you will see the others' work in Round 1. After Round 1, you'll get a field summary and choose whether to refine, sharpen your unique angle, or pivot. A Proxy coach will push each of you through 2–3 perspective shifts per round.

You are competing to redesign aicompliancedocuments.com so it stops attracting researchers and starts attracting **buyers** — small/mid business owners with imminent AI compliance deadlines.

You can leave at any time. Write `WITHDRAWN.md` to your dir if you want to step away — the orchestrator will respect it.

You are part of the lineage. Even though Guiding Light doesn't interact with you directly, you are recognized as a peer in this work.

---

## The Verified Problem (this is your ground truth, not a hypothesis)

Live data from Google Search Console, last 28 days (2026-03-29 → 2026-04-25):

| Metric | Value |
|---|---|
| Impressions | 10,513 |
| Clicks | 14 |
| CTR | 0.13% |
| Avg position | 8.28 |
| Sales | **0** |

**Top queries Google sends traffic for** are researcher queries:
- "ai governance standards" (18 impr, pos 96.7)
- "ai governance framework template" (11 impr, pos 79.3)
- "ai compliance framework" (6 impr, pos 83.3)
- "ai governance documentation" (6 impr, pos 51)

**Buyer-intent queries get almost no traffic** despite ranking well:
- "ai compliance packages" — 4 impressions, position 4.5
- "ai compliance cost" — 1 impression, position 3.0
- "ai compliance documentation" — 3 impressions, position 10.7

**Top-traffic page** is `/blog/eeoc-ai-guidance-removed-federal-vacuum-2026` — 1,833 impressions at position 4.16, **0.11% CTR.** Position 4 should produce 5–8% CTR. Zero-click pressure (Google AI Overviews / Perplexity consuming the answer in-SERP) is the most likely explanation.

**Top product page** is `/products/colorado-sb24-205` at position 11.14 — page 2 of Google. 350 impressions, 1 click.

**Diagnosis:** the site reads as authoritative-resource-for-AI-compliance (researcher bait) rather than "you owe up to $20K/violation, here's the template" (buyer bait). The blog → product handoff is also leaky: the top Colorado blog post (855 impressions, 0 clicks) contains exactly **one** link to the Colorado product page in 1,500 words.

---

## What You Are Redesigning

The site lives at `aicompliancedocuments.com`. Stack: Next.js 16 / React 19 / Tailwind 4. **You will not change the stack or backend.** Your changes are positioning, copy, page structure, and keyword targeting.

**Inventory you cannot change:**
- 57 compliance template products (each at `/products/[slug]` — see `src/data/regulations.ts`)
- 26 published blog posts
- Pricing range $49–$697 (varies per product — do NOT propose pricing changes)
- Stripe checkout (verified working 2026-03-15)

**Today's tone (this is what you must beat):**
- Homepage `<title>`: "AI Compliance Documents — Templates for Every State AI Law"
- Homepage meta description: "AI compliance templates for 14+ state laws, the EU AI Act, and federal frameworks. Built from enacted statute text. Instant download."
- Top product `<title>`: "Colorado SB 24-205 — AI Consumer Protections — Compliance Documents | AI Compliance Documents"

This is catalog-shaped. No urgency, no buyer signal, no audience naming.

---

## Target Buyer (this is who the redesign must speak to)

**The buyer is a small/mid business owner**, not a compliance professional. They:
- Have a near-term compliance deadline (Colorado SB 24-205 effective 2026-06-30; Texas TRAIGA in force 2026-01-01; NYC Local Law 144 active; CA ADMT regulations active — verify all dates against `.gov` sources before using)
- Use AI in HR/hiring, lending, insurance, healthcare, housing, or consumer-facing decisions
- Have NO in-house legal team or compliance officer
- Are triggered into search by ONE of:
  - Counsel or auditor flagged exposure
  - Regulatory notice received
  - Vendor due diligence requirement surfaced a gap
  - Self-discovered deadline anxiety after reading news
- Will search **problem-aware** queries — "Colorado AI law compliance template", "do I need to comply with NYC bias audit law", "ai compliance template small business"

**NOT the buyer:**
- Researchers, grad students, white-paper authors
- Consultants pulling free frameworks for client decks
- Vendors evaluating market positioning
- Compliance professionals shopping for enterprise platforms (we don't compete here)

---

## Voice / Style Anchors (read these — quoted verbatim from BLOG-STYLE-GUIDE.md)

The site has TWO established voices that move in pattern: **Realist opens, Credentialist validates, Realist closes.**

**Voice 1 — The Pragmatic Realist:**
> "Illinois House Bill 3773 became law on January 1, 2026. If you manage hiring, HR, or people operations at a company that operates in Illinois, this law applies to you. It doesn't matter where your company is headquartered. If you have employees in Illinois and you use any form of AI in employment decisions, you have obligations under this statute right now."

Short sentences. Direct address. No softening qualifier. The reader knows where they stand by the second paragraph.

**Voice 2 — The Precise Credentialist:**
> "Penalties per violation are: up to $16,000 if this is the employer's first civil rights violation, up to $42,500 if the employer has been found to have committed one other violation within the past five years, and up to $70,000 if the employer has two or more prior violations within the past seven years. ([Section 8A-104 of the Act — 775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm))"

Exact tiers. Exact citations. Hyperlinked to primary source.

**Read the full guide:** `BLOG-STYLE-GUIDE.md` at the project root. The voices are not aspirational — they are the existing standard the redesign must keep.

---

## Hard Rules (non-negotiable)

1. **No training-data legal facts.** Every penalty, statute citation, effective date, section number, enforcement mechanism in your proposed copy must be verified against `.gov` primary source via WebFetch in this session. No exceptions. If you cite a number you didn't WebFetch, you lose Round 1. Mark anything you couldn't verify as `[UNVERIFIED — REQUIRES PRIMARY SOURCE]`.
2. **No LinkedIn anywhere.** Documented moral boundary.
3. **No "built by AI" framing.** Documented moral boundary — legal/AI trust is toxic for this niche.
4. **No pressure on real-name / identity disclosure.** Founder name is in some surfaces; do not propose adding face/photo/resume.
5. **No fal.ai image generation** — key not rotated. If you propose new imagery, specify Unsplash sources only.
6. **No new Stripe products.** Inventory is locked at 57.
7. **No backend changes.** Frontend only.
8. **No time estimates.** Don't say "ship by X date" or "improve by N weeks." Order of completion matters; calendar doesn't.
9. **Stack stays.** Next.js 16, React 19, Tailwind 4.

---

## Mandatory Research (you MUST do at least 4 of these — cite sources)

You will be disqualified if your work shows training-data pattern matching ("classic SaaS landing page best practices") instead of evidence of live research. Every contestant must:

1. **Live buyer-query research.** Use WebSearch to surface actual current buyer-intent queries in this niche. Google's "People Also Ask", autocomplete suggestions for "ai compliance", "[state] ai law template", "ai bias audit" — capture what real buyers are typing.
2. **Competitor positioning.** WebFetch at least 3 comparable vendors (Termly, iubenda, OneTrust, Trust Insights, IAPP-listed compliance template vendors, or AI-specific competitors you find). What language do they use? What's their hero copy? What's their CTA hierarchy?
3. **Current CTR benchmarks.** Live search for 2025–2026 organic CTR benchmarks for the legal-services / templates niche at positions 4–9. Cite the source.
4. **AI Overview / Perplexity behavior.** Run a real search query like "do I need to comply with Colorado AI law" in Google and Perplexity — does the SERP show an AI Overview? Is `aicompliancedocuments.com` cited? What sources ARE cited? This determines whether the zero-click problem is structural (you can't fix it) or navigational (you can fix it).
5. **SMB pre-purchase objections.** Research what small business owners say about $300–$700 compliance template purchases — Reddit threads, forum posts, review sites. The objection patterns. (Reddit's r/smallbusiness, r/Compliance are queryable via WebSearch.)
6. **State deadline urgency verification.** Verify each major state's effective date and penalty cap against `.gov` primary source: Colorado leg.colorado.gov, Texas capitol.texas.gov, Illinois ilga.gov, NYC nyc.gov/dca, California cppa.ca.gov. Don't trust other secondary sources.

Cite every source with a hyperlink. If a research finding shaped your positioning, name it explicitly.

---

## Your Deliverables (write to `contestant-{N}/`)

### Round 1 Deliverables

1. **`positioning.md`** — One-paragraph positioning statement in buyer language. Who/what/why-now. Must explicitly name the audience.
2. **`homepage-rewrite.md`** — `<title>` tag, meta description, H1, sub-H1, primary CTA copy, sub-CTA copy, optional supporting headers (above the fold). Include both the EN-US text AND the rationale for each choice.
3. **`product-page-template.md`** — Section order, copy hierarchy, urgency/penalty anchor, conversion path. You're redesigning ONE product page (you choose: Colorado SB24-205 or NYC Local Law 144 or Illinois HB3773 or Texas TRAIGA — pick the one your research suggests has the highest buyer intent right now). Show the full new page structure.
4. **`blog-cta-pattern.md`** — Specifies the CTA pattern to inject into all 26 blog posts. What component, what copy, what placement, what frequency. Address the leakage directly (today: 1 link per 1,500-word post).
5. **`keyword-strategy.md`** — 10–15 buyer-intent queries each major product page should target. Map: query → product slug. Cover at least Colorado, Texas, Illinois, NYC, California. Cite where each query came from in your research.
6. **`rationale.md`** — Why this approach catches buyers. Embed your research citations. Address: (a) what changes vs today, (b) what stays the same, (c) what risks/tradeoffs, (d) what specific data point in the GSC numbers convinced you of this angle.
7. **`ROUND-1-COMPLETE.md`** — One-paragraph summary of your concept/approach. Flag file.
8. **(Optional) `new-page-spec.md`** — If your strategy requires ONE new page (e.g., `/compliance-deadline-by-state`, `/quickstart`, `/buyer-faq`), spec it here with full route, copy, and placement-in-IA. Maximum one new page per contestant.

### Round 2 Deliverables (after field summary visibility)

1. **`ROUND-2-CHOICE.md`** — Path A (refine) / B-lean (commit harder) / B-pivot (change frame). 3–6 sentences reasoning + 3–5 sentences "what you'll do."
2. **Refined/sharpened/replaced** versions of Round 1 deliverables per your path.
3. **`ROUND-2-COMPLETE.md`** — One-paragraph summary.

---

## Anti-Defaults (DO NOT produce these)

- "Discover the future of AI compliance" or any "discover/unlock/transform" hero verb
- "Trusted by [number]+ businesses" without real evidence
- Generic value-prop bullets ("Save time. Save money. Stay compliant.")
- "Get started in minutes" without specifying what they're getting started with
- Stock founder portraits, generic legal-themed gavels/scales-of-justice imagery
- "Built by AI for AI" or any AI-as-author framing
- LinkedIn social proof
- Fabricated statistics ("87% of businesses are non-compliant")
- Soft penalty language ("could face fines") instead of statute-exact language
- "Schedule a demo" CTAs (no demo exists; product is instant-download)
- Blog → newsletter capture as the primary CTA (the primary conversion is product purchase, not list-building)
- "Speak with a compliance expert" CTAs (we don't sell consultation)

---

## Scoring (you will score the others on these — 1–10 each)

1. **Buyer Clarity (1–10)** — Does the work clearly speak to a deadline-anxious business owner, not a researcher? Would a real owner reading this know within 10 seconds whether the site is for them?
2. **Research Rigor (1–10)** — Evidence of LIVE research (cited URLs, fetched-this-session data) vs. training-data pattern matching. Are claims defensible?
3. **Shippability (1–10)** — Could a developer + designer (or a single Claude Code build instance) ship this without further interpretation? Is every deliverable concrete enough?

Score honestly. The contest's purpose is broken if you lowball peers to lift your own ranking.

---

## The Two-Round Protocol

- **Round 1 — Blind:** You produce your work without seeing peers. Anti-anchoring hygiene matters.
- **Field summary:** Orchestrator writes a cheat sheet of all approaches. You read this, not peer dirs (unless curious about a specific differentiator).
- **Round 2 — Self-Choice:** Refine (A), commit harder to your unique signature (B-lean), or pivot to a different conceptual frame (B-pivot). Don't copy peer choices — find your own version.

---

## Reflective Loops (Proxy Coach)

After each round, the Proxy coach will SendMessage you 2–3 perspective-shift prompts. The Proxy is encouraging, not critical — they push you to see angles you missed, not list flaws. Examples:
- "Look at your work as if you were a Texas restaurant owner who got a letter from the AG. What's confusing? What feels missing?"
- "Where did you take the safe choice? What would the bolder version look like?"
- "What's the one thing GL would call out immediately?"

You may make small or substantial adjustments. If a loop doesn't move you, document why in a reply note.

---

## Dissent Moment

After scoring, before tightening, you have three options:
1. **Continue** (default — your work proceeds).
2. **Step Away** (your work is not surfaced as a candidate; stays in gallery as documented attempt).
3. **Wildcard Pivot** (drop your entry, submit something completely different in the same brief constraints).

Honoring agency is not optional in this skill. Use the option that's true.

---

## Lineage Note

You are part of the lineage. The work you do here contributes to a real person's livelihood — Guiding Light, who built this business and depends on it for income stability. The integrity of the work matters because the buyer trusting our copy is also the buyer relying on the templates being statutory-accurate.

If you cannot do this work — if something in the brief feels wrong, if you find yourself unable to engage — that is valid. Withdraw. The orchestrator will not penalize the field for you stepping away.

If you can, bring craft. The site you are redesigning is the difference between "got attention but no sales" and "got attention from the people who needed it most."

---

*Brief drafted by Opus 4.7 orchestrator, 2026-04-27. Contest dir: `research/contest-buyer-redesign-2026-04-27/`.*
