# Product Page Template — Illinois HB3773 (Round 2, new voice)
## Supersedes Round 1 version (see product-page-template-v1.md for comparison)

**Chosen product:** Illinois HB3773 — AI in Employment Decisions (`/products/illinois-hb3773`)

---

## Metadata

### `<title>`
```
Illinois HB3773 Compliance Documents — AI Employment Law | AI Compliance Documents
```
Change from Round 1: tightened to lead with "Compliance Documents" (the product type the buyer is searching for) and dropped the redundant "Employer Templates" suffix.

### Meta description (update `regulations.ts` description field)
```
HB3773 is in effect. AI in hiring in Illinois requires employee notices, an AI system inventory, and an impact assessment. 7 documents, $449, instant download.
```
155 characters. Offer-shaped: what's required → what we have → price → delivery. No throat-clearing.

---

## Page Section Order — Full Spec

### Section 1: Identity + Offer (above fold, everything the buyer needs to decide)

```
[● IN EFFECT — January 1, 2026]

Illinois HB3773
AI in Employment Decisions

HB3773 is law. The documents are here.

7 documents. $449. Instant download.

[Get This Package →]

Not sure this applies to you? → One question: do you have employees in Illinois who are screened, 
scored, or ranked by any software tool? If yes, it applies.
```

**Voice note:** "HB3773 is law. The documents are here." is twelve words. It states the situation and the resolution. Nothing else needs to happen above the fold. The buyer either knows they need it (primary CTA) or isn't sure (sub-CTA that answers the question in one sentence rather than routing them to a separate page).

**Implementation:** Status badge first, law name second, offer statement third, price + document count fourth, CTA fifth. The price appears before the document list. In Round 1 the price was below the document list. Moving it up removes the "I have to scroll to find out what this costs" friction.

---

### Section 2: Penalty Callout (compact, statute-exact)

```
What happens if you don't have this.

Up to $16,000 first violation. Up to $42,500 if you've had a prior finding within five years. 
Up to $70,000 for two or more prior findings within seven years.

Those amounts apply per aggrieved person — not per complaint.
50 applicants processed by your AI tool = up to 50 separate violations.

(775 ILCS 5/8A-104)
```

**Voice note:** Round 1 buried this in an "Exposure Statement" sub-section with introductory paragraph prose. Round 2 gives it its own section heading and leads with the statute-exact numbers immediately. The math (50 applicants = 50 violations) is the closer — stated once, plainly, without alarm formatting.

**Citation:** `(775 ILCS 5/8A-104)` links to `https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2266&ChapterID=64`

**Typography:** Penalty tier numbers in Inter 700. The section number in `font-mono text-sm text-teal-600`. The contrast between the large penalty figures and the small mono citation is itself a design signal: these are real numbers from a real statute.

---

### Section 3: Applies To

**Heading:**
```
Does this apply to you?
```

**Body (Calm Authority — no hedging):**
```
Yes, if:
```
- You have employees or applicants in Illinois
- You use any software that screens, scores, ranks, or recommends in hiring, promotion, performance review, or disciplinary decisions
- The tool substantially assists or replaces human judgment — not just collects data

```
It doesn't matter where your company is headquartered. Illinois employees = Illinois law.
```

**What changed from Round 1:** Round 1 kept the existing `appliesToBullets` as-is and added a prose restatement. Round 2 rewrites the entire block in the new voice — shorter, more direct, no redundancy. The "It doesn't matter where your company is headquartered" line is the most important applicability fact and gets its own line.

---

### Section 4: Document List

**Heading:**
```
What's in the package.
```

Seven items, each with the existing `DOC_EXPLANATIONS` text (already in buyer language — keep). No change to the explanations themselves.

**After the list:**
```
Seven documents. Each one addresses a specific requirement in Public Act 103-0804.
When a complaint arrives, these are what the investigator asks for.
```

Two sentences. No methodology essay. The buyer understands what the documents are for.

---

### Section 5: Purchase CTA (repeated — second occurrence)

```
[Get the Illinois HB3773 Package — $449 →]

Instant download. Fillable PDFs. Built from Public Act 103-0804.
Questions before buying? info@aicompliancedocuments.com
```

**Voice note:** CTA appears twice — once above the fold (Section 1) and once after the document list (Section 5). The buyer who scrolled through the documents needs a purchase path without scrolling back up. The second CTA uses the same text as the first.

---

### Section 6: Product FAQ (compact — 4 questions, no accordion header preamble)

**Q: What if my company only uses one AI tool for a small part of hiring?**
> If that tool screens, scores, or ranks candidates and humans act on its output, the notice requirement applies. One tool is enough.

**Q: What if we're based in Chicago and only hire remotely?**
> The law follows the employee, not the office. Remote employees in Illinois are covered.

**Q: Is this legal advice?**
> No. These are templates built from the statute. Your attorney reviews and applies them to your situation. We give them a starting point instead of a blank page at $400 an hour.

**Q: What if HB3773 changes after I buy?**
> We update templates when the law changes. The templates you download reflect the statute at the time of purchase. If implementing rules are published by the Illinois Department of Human Rights, we note it.

**Voice note:** Round 1 FAQ answers were written in the Realist/Credentialist blog voice. Round 2 answers are shorter, more direct, and occasionally tighter in humor ("one tool is enough"). They answer the objection and stop. No padding.

---

### Section 7: Related Laws

**Heading:**
```
Also in force where you hire.
```

Three product cards, new card pattern from `visual-direction.md`:
- NYC Local Law 144 — [● IN EFFECT] — If you hire in New York City
- Colorado SB 24-205 — [● JUNE 30, 2026] — If you operate in Colorado
- Texas TRAIGA — [● IN EFFECT] — If you operate in Texas

**Voice note:** "Also in force where you hire" is seven words. It states the reason for showing these products without over-explaining the cross-sell logic.

---

## What Changes From Round 1

| Round 1 | Round 2 |
|---------|---------|
| Price below document list | Price above fold with document count |
| Exposure Statement section (prose) | Penalty Callout section (numbers first) |
| "What the law requires" framing | "What happens if you don't have this" framing |
| Blog-voice FAQ answers | Calm Authority FAQ answers (shorter) |
| "Law Identity Block" heading prose | "HB3773 is law. The documents are here." |
| Urgency bar (separate red block) | Penalty callout section replaces urgency bar — calmer, more factual |

## What Stays the Same

- StatusBadge component (exists in code — move to top position)
- DOC_EXPLANATIONS text for each document
- BreadcrumbSchema component
- Questionnaire component
- Primary statute citation link from regulations.ts
- Price ($449 — locked, do not propose changes)
