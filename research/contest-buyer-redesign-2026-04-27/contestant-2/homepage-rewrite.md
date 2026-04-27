# Homepage Rewrite — Contestant 2 (v2 — Transaction-First Declarative voice)

*v1 preserved as `homepage-rewrite-v1.md`*

---

## Metadata

### `<title>` tag

**v2 proposed (unchanged from v1 — still correct):**
```
AI Compliance Templates for Colorado, Texas, Illinois & NYC | Instant Download
```

**Rationale:** Same rationale applies. State names + product noun + action signal. 78 characters. No change needed.

---

### Meta Description

**v2 proposed (tightened to new voice):**
```
Colorado AI law: June 30, 2026 deadline. Texas TRAIGA: in effect now. You deploy AI. You owe documents. $49–$697, instant download, built from statute.
```
(151 characters ✓)

**v1 version:** "Colorado AI law takes effect June 30. Texas TRAIGA is already in force. If you use AI in hiring, lending, or consumer decisions, you have obligations now..."

**Voice change:** v1 was explanatory ("If you use AI in hiring... you have obligations"). v2 is declarative ("You deploy AI. You owe documents."). Same facts. Half the words. Stronger signal to the buyer who is scanning a SERP result in 2 seconds.

---

## Hero Copy (v2 — new voice)

### H1 (make visible — remove `sr-only`)

**v2 proposed:**
```
AI in your business. Five states have a law about that.
```

**v1 version:** "You use AI in your business. Three states say you owe documentation. Here's it."

**Voice change:** v1 was three sentences trying to do the work of one. v2 is tighter. "Five states" is accurate (CO/TX/IL/NYC/CA). The implied next sentence — "you need documents" — is handled by the sub-H1 and the deadline sidebar. The H1's job is recognition, not explanation.

**Implementation:** `text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight`

---

### Eyebrow line (NEW — does not exist in current design)

**v2 proposed:**
```
Colorado deadline: June 30, 2026
```

Alternates by A/B state: "Texas TRAIGA: In force now" / "Illinois HB3773: Active since January 1"

**Implementation:** `text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3`
Rendered above the H1. On mobile: same, smaller text size.

---

### Sub-H1

**v2 proposed:**
```
Colorado. Texas. Illinois. NYC. California. Each state has an AI law. Each law requires specific documents. We built them. $49–$697, instant download.
```

**v1 version:** "Colorado SB 24-205 requires businesses using AI in consequential decisions — hiring, lending, insurance, housing, healthcare — to have a risk management program, impact assessments, and consumer notices. Each compliance package is built from the enacted statute text, not summaries..."

**Voice change:** v1 was 60 words of explanation. v2 is 28 words. The v1 sub-H1 explained what the law requires (journalist voice). The v2 sub-H1 names the states, says "each law requires specific documents," then says "we built them." That sequence — obligation → product → transaction signal — is the entire sales argument in one breath. Price is included so the buyer doesn't have to click to find it.

**Implementation:** `text-lg md:text-xl text-slate-200 leading-relaxed max-w-xl mt-4`

---

### Primary CTA Button

**v2 proposed (unchanged from v1):**
```
Get Your Compliance Documents
```

**Implementation:** `bg-[#1e3a5f] hover:bg-[#162d4a] text-white px-8 py-4 rounded font-bold text-lg`

---

### Price signal (below CTA button — NEW element)

**v2 proposed:**
```
$49–$697 · One-time · No subscription
```

**Implementation:** `text-sm text-slate-400 mt-2`

---

### Trust strip (below price — condensed from current trust bar)

**v2 proposed (3 items, inline):**
```
Built from enacted statute  ·  Instant download  ·  Attorney-reviewable
```

**v1 version:** 5-item trust bar with icons — "Multi-State Coverage / Instant Download / Built for the person who just found out this is their job / $49–$997 / Stripe."

**Voice change:** v1 trust bar was a feature list. v2 is three facts. "Built from enacted statute" is the differentiation claim. "Instant download" is the process. "Attorney-reviewable" is the liability scope answer in one word. The "Built for the person who just found out this is their job" line was excellent Realist voice — correct for the blog style guide, too warm for a trust strip that needs to be scannable in 1 second.

**Implementation:** `text-sm text-slate-400 mt-3 flex gap-4 flex-wrap`

---

### Deadline Sidebar (NEW — right column on desktop, strip below CTA on mobile)

**v2 proposed (right column, 4 law cards):**

```
[RED: IN EFFECT]        NYC Local Law 144
Automated hiring tools. July 2023.    →

[RED: IN EFFECT]        Texas TRAIGA
All AI systems. January 1, 2026.      →

[AMBER: JUNE 30]        Colorado SB 24-205
High-risk AI decisions. June 30, 2026. →

[RED: IN EFFECT]        Illinois HB3773
AI in hiring. January 1, 2026.        →
```

Each card links to its product page. The "→" is a visible click affordance.

**Implementation:** Right column at `w-64 shrink-0 space-y-3 hidden md:block`. Each card: `bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/20 transition cursor-pointer`. Status pill: `text-xs font-bold px-2 py-0.5 rounded` — red for IN EFFECT (`bg-red-500/20 text-red-300`), amber for EFFECTIVE SOON (`bg-amber-500/20 text-amber-300`).

Mobile: collapses to a 2-column grid of cards below the CTA, above the fold. 4 cards, 2 per row, visible without scrolling.

---

## Homepage Section Order (v2)

Per `ia-proposal.md`, the homepage restructures from 8 sections to 7. Here is the copy for each:

### Section 1: Hero
Copy above. New deadline-board hero replaces carousel.

---

### Section 2: Find Your State

**H2 (or no heading — let the cards speak):**
```
Which law applies to you?
```

**5 state cards + 1 multi-state card:**

Each card format:
- State/jurisdiction name in bold
- Law short name
- Deadline or status in red/amber
- Price
- "Get Documents →" button

No paragraph copy between cards. The cards ARE the copy.

---

### Section 3: Product Grid (4 featured products as static cards)

**No heading.** The cards are self-explanatory after the state selector.

If a heading is needed for accessibility: `<h2 class="sr-only">Featured compliance packages</h2>`

---

### Section 4: Why These Documents

**H2 (new voice):**
```
Built from the enacted statute. Not a summary.
```

**3 supporting statements (no bullets, inline paragraphs):**

> Every penalty figure, every deadline, every section number is verified against the primary .gov source — leg.colorado.gov, ilga.gov, capitol.texas.gov, nyc.gov. Not from a compliance platform's interpretation of the law. The law itself.

> Your attorney can review these documents. They're not a black-box output — they're structured templates drafted from statutory language that your legal team can read, verify, and sign off on.

> If implementing rules haven't been published yet, we say so. No false confidence.

**v1 version:** 4-card icon grid ("Read the enacted statute / Verify every citation / Flag what's pending / Templates, not legal opinions").

**Voice change:** v1 was an educational infographic explaining the methodology. v2 is 3 short paragraphs making 3 specific claims. Same facts, different shape. The icon grid is a research-resource pattern — it suggests "learn about us." The paragraphs are a trust-proof pattern — they assert specific things the buyer can verify.

---

### Section 5: Penalty Reality Check

**H2 (new voice):**
```
What these laws cost you if you don't have documentation.
```

**Body (4 law lines, each one sentence):**

> **Texas TRAIGA:** A single uncurable violation: $80,000–$200,000. Continuing violations add $2,000–$40,000 per day. ([HB 149 Sec. 552.105(a)](https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149))

> **Illinois HB3773:** Up to $16,000 for a first violation. Up to $70,000 for repeat offenders within seven years. ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm))

> **Colorado SB 24-205:** Up to $20,000 per violation under the Colorado Consumer Protection Act. Up to $50,000 when the affected consumer is 60 or older. ([C.R.S. § 6-1-112](https://leg.colorado.gov/bills/sb24-205))

> **NYC Local Law 144:** $500 first violation. $500–$1,500 per subsequent violation per day. No employee-count threshold. ([NYC Admin. Code § 20-870](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page))

**v1 version:** Paragraph leading with "AI regulations aren't suggestions. They're law, with real enforcement teeth and penalties up to $200,000 per violation..." — then 3 icon cards.

**Voice change:** v1's paragraph was explanatory ("AI regulations aren't suggestions" — the reader already knows this). v2 leads with law names and numbers. No preamble. Each line is one statute and one number. The citations are hyperlinked — the buyer can verify in one click.

---

### Section 6: 4 Inline FAQs

**No accordion. 4 Q/A pairs, plain text.**

```
Does this apply to my size of business?
No size exemption. NYC Local Law 144, Texas TRAIGA, and Illinois HB3773 all apply regardless of employee count or revenue.

What do I get when I buy?
Between 3 and 8 statute-sourced documents depending on the law — risk management policies, impact assessments, consumer notices, bias audit templates. Instant download as PDFs.

Is this legal advice?
No. Templates drafted from enacted statute text. Your attorney reviews and advises on your specific situation.

What if I operate in multiple states?
The multi-state package covers 15+ jurisdictions. Or buy individual state packages — there's no overlap in what each law requires.
```

**v1 version:** 9-question accordion. Research-resource pattern.

**Voice change:** 4 questions, no accordion, in the new voice. Transaction-First Declarative: answer first, no preamble, no "great question."

---

### Section 7: Final CTA

**H2 (new voice):**
```
Your compliance deadline doesn't move.
```

**Body (1 sentence):**
```
The documents are ready.
```

**CTA button:** "Get Your Compliance Documents"

**Below button:** `info@aicompliancedocuments.com` for questions.

**v1 version H2:** "Don't wait for a complaint"

**Voice change:** v1 was a negative imperative (don't do X). v2 is a factual statement (deadline doesn't move) followed by a product availability statement (documents are ready). Same urgency. Less finger-wagging.

---

## Build Order (Proxy-requested addition — Contestant 2 only)

These are the 7 interventions from v1, ranked by impact-per-hour. A build instance with limited continuity should ship in this order:

**1. Title tags + product page H1 (45 minutes — one atomic step)**
Change `${reg.name} — Compliance Documents` pattern to `${reg.name} Compliance Documents — [Deadline] | Instant Download` in `generateMetadata`. Then immediately update the product page H1 to carry the same deadline: for effective-soon products use `{reg.shortName} — {reg.effectiveDate}` (e.g., "Colorado SB 24-205 — June 30, 2026"); for in-effect products use `{reg.shortName} — In Effect Since {reg.effectiveDate}`. These two changes must ship together — the title tag creates a deadline expectation; the H1 fulfills it in the first element the buyer reads. Shipping the title change without the H1 change creates a half-second gap between the SERP promise and the page delivery. These are not two changes — they are one promise completed in two places.

**2. Make H1 visible on homepage (15 minutes)**
Remove `sr-only` from the existing H1 or add the new H1 above the carousel. Single line change in `page.tsx` line 193. Note: this is the *homepage* H1 — separate from the product page H1 handled in item 1.

**3. Blog CTA component — mid-article placement only (2 hours)**
Build `BlogProductCTA.tsx` with Placement 2 (after penalty section) only. This is the highest-converting moment in the blog. Add to the 5 highest-traffic posts first. The other placements come after this is proven.

**4. Penalty callout block on Colorado product page (1 hour)**
Add the visible penalty section with statute citations and per-consumer counting to `/products/colorado-sb24-205`. Colorado has the most imminent deadline and the most SERP presence.

**5. Homepage H1 + sub-H1 copy (1 hour)**
Update the hero copy to v2 voice. Eyebrow, H1, sub-H1, price signal, trust strip.

**6. FAQ schema on Colorado product page (1 hour)**
4 Q/A pairs, structured data. Positions the product page for AI Overview citation on "do I need to comply with Colorado AI law" queries.

**7. `/compliance-deadline-by-state` new page (3–4 hours)**
Highest effort, but also the highest long-term organic value. Build after items 1–6 are shipped. This page is the permanent hub; the earlier items are the immediate wins.

**Star: Ship item 1 first.** Title tag changes affect every impression the site already receives. No new traffic needed. Zero risk. Highest ROI of any change on this list.
