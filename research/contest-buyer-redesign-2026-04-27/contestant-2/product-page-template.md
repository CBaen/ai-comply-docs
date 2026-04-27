# Product Page Template — Colorado SB 24-205 (v2 — Transaction-First Declarative voice)

*v1 preserved as `product-page-template-v1.md`*

**Chosen product:** Colorado SB 24-205 (`/products/colorado-sb24-205`, $449)
**Why Colorado:** Highest SERP presence (350 impressions, position 11.14). Most imminent hard deadline in the site's inventory (June 30, 2026). Proven buyer-intent queries ("colorado sb 24-205 compliance documents") occupied by law firms and competing platforms — the product page needs to own this query.

---

## Metadata

### `<title>` (unchanged from v1 — still correct):
```
Colorado SB 24-205 Compliance Documents — Deadline June 30, 2026 | Instant Download
```

### Meta description (v2 — tightened):
```
Colorado SB 24-205 takes effect June 30, 2026. 8 statute-sourced documents: risk management policy, impact assessments, consumer notices. $449, instant download.
```
(163 chars — trim "instant download" to fit 160: `...assessments, consumer notices. $449 one-time.` — 158 ✓)

**v1 version:** "Colorado SB 24-205 takes effect June 30, 2026. If you deploy AI in hiring, lending, or insurance in Colorado, you need documented compliance. $449, instant download." — good, but opening clause buries the product. v2 leads with the deadline and immediately pivots to what's included.

---

## Hero Section (v2 voice)

### H1 (current: `{reg.name}` = "Colorado SB 24-205 — AI Consumer Protections")

**v2 proposed:**
```
Colorado SB 24-205 Compliance Documents
```

Plain. Product-forward. The buyer typed "colorado sb 24-205 compliance documents" — the H1 confirms they arrived at the right destination. No subtitle, no category label, no em-dash decoration.

**Implementation:** Replace `{reg.name}` rendering in the hero H1 with `{reg.shortName} Compliance Documents` for the page heading. The full `reg.name` can remain in breadcrumb and structured data.

---

### Hero description (replaces `{reg.description}`)

**v2 proposed:**
```
June 30, 2026. That's when the Colorado Attorney General begins counting violations under SB 24-205.

If your business deploys AI in consequential decisions about Colorado consumers — hiring, lending, insurance, housing, healthcare, or education — you are a deployer under this law. Deployers owe a documented risk management program, impact assessments for each high-risk system, consumer notifications, and human oversight records.

These are the documents. 8 of them. Built from the enacted statute at leg.colorado.gov.
```

**v1 version:** Longer, more explanatory, ended with "This package contains the 8 documents deployers need. Each is built from the enacted statute text at leg.colorado.gov." — same facts, more words.

**Voice change:** v2 leads with the enforcement date, not with a law description. The second paragraph states the obligation in second-person present tense ("you are a deployer," "deployers owe"). The third paragraph names the product in 3 words — "These are the documents" — then adds three specifics: count, quality marker, source. Each paragraph is one fact. No paragraphs that blend obligation with solution with methodology.

---

### Deadline Banner (NEW — immediately below hero, above stats bar)

```
[AMBER BACKGROUND]
Colorado SB 24-205 takes effect June 30, 2026.
Documentation must be in place by that date — not just purchased. Build time is part of compliance.
```

**Implementation:** Conditional on `reg.status === "effective-soon"`. `bg-amber-50 border-l-4 border-amber-500 rounded p-4 mb-6`. Font: `text-amber-900 text-sm font-semibold` for the date line; `text-amber-800 text-sm` for the second sentence.

---

## Stats Bar (v2 — add penalty to the bar itself)

**Current stats bar items:**
- 8 documents included
- Max penalty: Up to $20,000 per violation ($50,000 for age 60+)
- Secure checkout via Stripe

**v2 proposed (same items, sharpened labels):**
- **8 documents included**
- **AG penalty: up to $20,000 per violation** (renders in `text-red-700` with red icon — not just a gray stat)
- **Instant download via Stripe**

The penalty is currently in a neutral gray stat. A red penalty figure in the stats bar is a conversion trigger — the buyer sees the risk number at the same moment they see the price number. That juxtaposition ("$449 vs. up to $20,000 per violation") is the entire ROI argument in one horizontal bar.

---

## Section Order (v2 — reordered from v1)

**v1 section order (from current page.tsx):**
1. Does This Apply to You?
2. What's Included (document list)
3. Penalty section (proposed in v1)
4. How It Works
5. Blog guide link

**v2 section order:**

### Section 1: Who This Applies To

Keep this first — it answers the buyer's first question. But rewrite the heading and content in the new voice.

**H2 (v2):**
```
Does Colorado's AI law apply to your business?
```

**Applicability checklist — v2 voice (3 bullets, direct):**

- You deploy AI systems that help make decisions about Colorado consumers
- Those decisions affect: hiring, lending, insurance, housing, healthcare, education, or legal services
- You are the business using the AI to make those decisions (not the company that built it)

**Below the bullets — explicit exclusion (retained from v1):**

```
You do NOT need this package if:
- Your AI is not used in consequential decisions in any of the above categories
- Your business has no operations affecting Colorado consumers
- You build AI systems but don't deploy them yourself — developer obligations are a separate package
```

**Voice note:** v1 framed this as "If you deploy AI that affects Colorado consumers... you are a deployer under this law." — correct but explanatory. v2 converts the same information into three direct boolean conditions. Faster to scan. The buyer answers yes/yes/yes and clicks buy.

---

### Section 2: Penalty — What's at Stake

**Move this BEFORE the document list.** The penalty is the reason to buy. The document list is the product. Reason before product.

**H2 (v2):**
```
What the law costs if you don't comply.
```

**Body (Credentialist exactness, Declarative shape):**

> The Attorney General enforces SB 24-205 under the Colorado Consumer Protection Act. Two penalty tiers:
>
> **Up to $20,000 per violation** — standard violations. ([C.R.S. § 6-1-112(1)(a)](https://leg.colorado.gov/bills/sb24-205))
>
> **Up to $50,000 per violation** — when the affected consumer is 60 or older. ([C.R.S. § 6-1-112(1)(c)](https://leg.colorado.gov/bills/sb24-205))
>
> Violations are counted per consumer affected. An AI hiring system that processes 40 applications is 40 potential violations. There is no private right of action — only the AG enforces.
>
> There is a 90-day cure period for deployers who demonstrate a good-faith compliance attempt after notice. That cure period is a last resort after enforcement begins — not a reason to delay documentation.

**[IMPLEMENTATION NOTE: C.R.S. § 6-1-112(1)(a) and (1)(c) penalty amounts are sourced from regulations.ts penaltySummary, which cites these section numbers. The 90-day cure period section number cited in v1 as § 6-1-1703(10)(b)(II) requires verification against the enacted statute at leg.colorado.gov before this copy ships buyer-facing.]**

---

### Section 3: What's Included (document list)

**H2 (v2):**
```
The 8 documents this law requires.
```

**Document list — v2 voice (each document gets one sentence stating the obligation, not describing the template):**

| Document | The legal obligation it satisfies |
|---|---|
| Risk Management Policy | SB 24-205 requires deployers to maintain a risk management program for high-risk AI systems. This is that program, documented. |
| Impact Assessment | Required before deploying any high-risk AI system. Documents the risks, the safeguards, and the deployment decision. |
| Consumer Notification Template | Consumers must be notified before AI makes consequential decisions about them. This is the notice. |
| Consumer Disclosure Statement | Public-facing disclosure of what AI systems you use and how they work. Required for deployers under SB 24-205. |
| Algorithmic Discrimination Prevention Plan | Deployers must take steps to prevent algorithmic discrimination. This document records those steps. |
| Human Oversight Protocol | Documents the human review process for AI-driven decisions. Required to establish oversight, not just rubber-stamp AI outputs. |
| Annual Review Tracker | SB 24-205 requires ongoing monitoring. This document structures that review year over year. |
| Compliance Checklist | Every SB 24-205 deployer obligation in order, so nothing is missed before June 30. |

**v1 version:** Document names only, with explanatory tooltip text from `DOC_EXPLANATIONS`.

**Voice change:** v1 described what each document IS. v2 states the legal obligation the document satisfies. The buyer doesn't need to understand what a "Risk Management Policy" is — they need to know why the law requires one and that this package gives them one. The table format is clear and scannable; no need for tooltips.

---

### Section 4: Trust — Built From Statute

**H2 (v2):**
```
Built from leg.colorado.gov. Not from a summary.
```

**3 statements, no icons:**

> Every section number, penalty figure, and effective date in these documents is verified against the enacted statute text at [leg.colorado.gov/bills/sb24-205](https://leg.colorado.gov/bills/sb24-205). If you want to check any number, the law is one click away.

> The effective date was extended from February 1, 2026 to June 30, 2026 by [SB25B-004](https://leg.colorado.gov/bills/sb25b-004), signed August 28, 2025. These documents reflect the current June 30 deadline, not the original one.

> If implementing rules haven't been published yet — we say so in the documents. No false confidence.

**v1 version:** This was the sidebar "How We Build Our Templates" section reference. v2 integrates it into the product page flow directly — the buyer on a product page needs trust signals at the point of purchase, not a link to an About section.

---

### Section 5: FAQ Schema (4 questions — doubles as structured data)

Rendered as 4 inline Q/A pairs. Also outputs `FAQPage` structured data (see implementation note below).

**Q1:** Does Colorado SB 24-205 apply to small businesses?
**A1:** Yes. SB 24-205 has no small-business exemption based on size, revenue, or employee count. If you deploy AI that makes consequential decisions about Colorado consumers, you are a deployer.

**Q2:** When does Colorado's AI law take effect?
**A2:** June 30, 2026. Set by SB25B-004, which extended the original February 1, 2026 deadline. No further extensions have been announced.

**Q3:** What is the penalty for violating Colorado SB 24-205?
**A3:** Up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112(1)(a)). Up to $50,000 per violation involving consumers age 60 or older (C.R.S. § 6-1-112(1)(c)). Violations are counted per consumer affected.

**Q4:** What documents does Colorado SB 24-205 require?
**A4:** Deployers need: a Risk Management Policy, an Impact Assessment for each high-risk AI system, Consumer Notification and Disclosure templates, an Algorithmic Discrimination Prevention Plan, a Human Oversight Protocol, an Annual Review Tracker, and a Compliance Checklist. This package includes all 8.

**Implementation:** Add `FAQPage` JSON-LD alongside the existing `Product` JSON-LD in `StructuredData` component. Google allows both types on the same page. Positions the product page (not just blog posts) to be cited in AI Overviews for "do I need to comply with Colorado AI law" queries — 35% organic click lift for cited sources per Dataslayer 2026 data.

---

## Sidebar (v2 — 3 additions)

**Current sidebar:** Price, CTA button, blog guide link.

**v2 additions:**

**1. Deadline countdown (visual):**
```
June 30, 2026
[N] days remaining
```
Simple text, red if ≤60 days. Calculated client-side from `new Date()`. Adds urgency without fabricating it.

**2. Law citation link (primary source):**
```
Primary source:
C.R.S. § 6-1-1701 et seq.
Read the law at leg.colorado.gov →
```
Link: `https://leg.colorado.gov/bills/sb24-205`. The buyer who hesitates about trust clicks this. They verify the law is real. They buy.

**3. Attorney note:**
```
These documents are for attorney review — not a substitute for legal advice. Your attorney verifies they apply to your specific situation.
```
`text-xs text-gray-500`. Sets correct expectation without undermining the purchase.

---

## Implementation Notes (developer-ready)

1. **H1 text:** Change from `{reg.name}` to `{reg.shortName} Compliance Documents` in the hero H1 element (page.tsx line ~274).
2. **Hero description:** Override `{reg.description}` with the v2 hero description above. Add a `heroDescription` field to the Regulation interface, or use a conditional by slug.
3. **Deadline banner:** Add conditional JSX below the hero div, before the stats bar. Condition: `reg.status === "effective-soon"`.
4. **Stats bar penalty:** Change penalty stat color to red (`text-red-700`) and update icon to the warning triangle.
5. **Section order:** Penalty section currently renders after document list. Swap: penalty before document list in the main content `space-y-10` div.
6. **Document table:** Replace the current list rendering with the table above using the obligation-statement format. Pull from `DOC_EXPLANATIONS` map (already exists in page.tsx line 90) but reframe from "what it is" to "what obligation it satisfies."
7. **FAQ schema:** Add `FAQPage` JSON-LD to `StructuredData` component alongside existing `Product` schema.
8. **Sidebar countdown:** New client component `DeadlineCountdown.tsx` — takes `effectiveDate: string` prop, renders days remaining. Mark `"use client"` since it uses `Date`.
