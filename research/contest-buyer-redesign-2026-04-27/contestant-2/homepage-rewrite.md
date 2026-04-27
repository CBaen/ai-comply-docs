# Homepage Rewrite — Contestant 2

## Metadata

### `<title>` tag

**Proposed:**
```
AI Compliance Templates for Colorado, Texas, Illinois & NYC | Instant Download
```

**Current:**
```
AI Compliance Documents — Templates for Every State AI Law
```

**Rationale:** The current title is catalog-shaped. It names the site, not the buyer's problem. The proposed title leads with "AI Compliance Templates" (the exact product type buyers search for), names the four highest-urgency states by name (buyers search by state), and ends with "Instant Download" (converts anxiety into action signal). Research showed buyers type "Colorado AI law compliance template" — the title must match that query pattern. Each state name is also a top-volume keyword anchor. Length: 71 characters — within title tag display limit.

---

### Meta Description

**Proposed:**
```
Colorado AI law takes effect June 30. Texas TRAIGA is already in force. If you use AI in hiring, lending, or consumer decisions, you have obligations now. Statute-sourced compliance documents: answer a questionnaire, download PDFs. $49–$697, one-time.
```

**Current:**
```
AI compliance templates for 14+ state laws, the EU AI Act, and federal frameworks. Built from enacted statute text. Instant download.
```

**Rationale:** The current description is a catalog inventory list. It answers "what do you have?" not "why do I need this today?" The proposed description uses the urgency hook first (Colorado deadline), names a second active law (TRAIGA), immediately names who it applies to (hiring, lending, consumer decisions), then delivers the product description in plain language. The price range at the end is a strong click signal — it removes the "I don't know if I can afford this" friction before the click. Length: 248 characters — slightly over 160, recommend trimming to: "Colorado AI law takes effect June 30. Texas TRAIGA is in force now. If you use AI in hiring or consumer decisions, you have obligations. Statute-sourced templates, instant download. $49–$697 one-time." (198 characters — trim further if needed for display).

---

## Above-the-Fold Hero Copy

### H1 (currently rendered as `sr-only` — propose making visible)

**Proposed:**
```
You use AI in your business. Three states say you owe documentation. Here's it.
```

**Rationale:** The current H1 is screen-reader-only: "AI Compliance Documents — State AI Compliance Templates." This is a major missed opportunity — the H1 is the loudest copy signal Google reads, and the first thing a visitor with intent encounters. The proposed H1 uses the site's established Pragmatic Realist voice: short sentence, direct address, no softening. "Three states" is a factual claim (Colorado, Texas, Illinois — all active or imminent). "Here's it" closes the loop with a product delivery signal. This is not a welcome headline — it's a condition statement.

**Implementation note:** The current hero renders via `<ProductCarousel>` inside a `<header>`. The H1 appears before the carousel as `sr-only`. This can be made visible at `text-3xl md:text-5xl font-bold text-white` above the carousel, or positioned as the carousel headline.

---

### Sub-H1 (hero deck copy)

**Proposed:**
```
Colorado SB 24-205 requires documentation from every business deploying AI in consequential decisions — effective June 30, 2026. Texas TRAIGA is already in force. Illinois HB3773 has been active since January 1, 2026. These laws have no small-business exemption.

Each compliance package is built from the enacted statute text, not summaries. You answer a questionnaire. You download PDFs. Your attorney reviews them. You're documented.
```

**Rationale:** Paragraph 1 names the laws by their actual citations, names the effective dates, and delivers the line that breaks through the most common objection: "these laws have no small-business exemption." This is verified in the statute for TRAIGA and NYC LL144. Paragraph 2 is the product description in four plain sentences — no jargon, no verbs like "leverage" or "implement," no passive voice. Realist opens, Credentialist validates, Realist closes: the site's exact voice pattern.

---

### Primary CTA

**Proposed:**
```
Get Your Compliance Documents
```

**Current:**
```
Browse Products
```

**Rationale:** "Browse Products" signals shopping. "Get Your Compliance Documents" signals acquisition of something specific you need. The word "Your" is load-bearing: it implies these are customized to the buyer's situation (which they are — questionnaire-driven). This CTA should appear twice above the fold: once in the hero and once in the sub-H1 block.

---

### Sub-CTA

**Proposed:**
```
Not sure which law applies to you? →
```

**Rationale:** The most common SMB question (confirmed in research) is "does this apply to me?" Before they can buy, many buyers need to answer this. The sub-CTA routes them to FAQ or a new `/compliance-deadline-by-state` page (see optional new-page-spec.md) without abandoning the purchase path.

---

## Supporting Headers (above the fold or immediately below)

### Trust Bar — Revised Copy

Replace generic trust signals with law-specific ones:

**Current trust bar items:**
- Multi-State Coverage
- Instant Download
- Built for the person who just found out this is their job
- $49–$997, one-time purchase
- Powered by Stripe

**Proposed trust bar items:**
- Colorado deadline: June 30, 2026
- Texas TRAIGA: In force now
- NYC Local Law 144: Active since 2023
- Illinois HB3773: In force since January 1, 2026
- Instant download — no account required
- $49–$697, one-time

**Rationale:** The current trust bar reads like a feature list. The proposed version reads like a deadline board. Each item is a law with a date — every one of them is a reason to act. A buyer from Colorado who sees their law's deadline in the trust bar has confirmation within 3 seconds that the site is relevant to their situation. This is the fastest possible buyer-identification signal.

---

## Pain Section — Proposed Revision

### Current H2:
"What happens if you don't comply?"

### Proposed H2:
"The penalties are real. The deadlines are not flexible."

**Rationale:** The current H2 is a question — it's softer than the answer. The proposed H2 is a statement. The Realist voice does not ask questions about the stakes. It states them.

### Proposed sub-copy (replaces current paragraph):

```
Texas TRAIGA: a single uncurable violation costs between $80,000 and $200,000. Colorado SB 24-205: up to $20,000 per violation. Illinois HB3773: up to $70,000 per violation for repeat offenders. NYC Local Law 144: $500 per first violation, $500–$1,500 per subsequent violation per day — and there is no employee-count threshold. These penalties apply to businesses of every size.
```

**Rationale:** Current copy says "up to $200,000 per violation" without naming the law. The proposed version names each law with its exact penalty in one sentence each. This is the Precise Credentialist voice doing its job — the reader can look up each number. No editorializing. No hedging. No "could face." These are the statute amounts.

---

## Final CTA Section — Proposed Revision

### Current H2:
"Don't wait for a complaint"

### Proposed H2:
"Colorado's deadline is June 30. You need documents before then."

**Rationale:** "Don't wait for a complaint" is true but passive. The proposed H2 names the most imminent hard deadline in the country for AI compliance and tells the buyer what they need. This converts a moral nudge into a specific action requirement.

### Proposed CTA Button:
```
Get Colorado Compliance Documents — $449
```

**Note:** Link to `/products/colorado-sb24-205`. For buyers from other states, secondary CTAs link to TX, IL, NYC products. Price anchor in the CTA button dramatically reduces post-click abandonment — buyer arrives on product page already knowing the price.

---

## Implementation Notes for Developer

1. H1 is currently `sr-only` in `src/app/page.tsx` line 193. Make visible with Tailwind classes: `text-3xl md:text-5xl font-bold text-white mb-4`.
2. Title tag is in `export const metadata` object line 9. Replace the `absolute` title value.
3. Meta description is line 11. Replace string.
4. Trust bar items are hardcoded JSX in the `<div className="bg-white border-b...">` block starting line 207. Edit the `<span>` text content for each item.
5. Pain section H2 is line 349. CTA section H2 is line 506.
6. All copy changes are JSX text nodes — no component changes required.
