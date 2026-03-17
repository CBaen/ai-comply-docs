# Team 2 Findings: Product Accuracy & Claims Audit
## Date: 2026-03-10

---

## Critical Issues

### CRITICAL-1: "All 7 IDHR required elements" — Number is correct, but element 7 is mischaracterized

**Claim:** The site repeatedly states the package includes "all 7 IDHR Subpart J required elements."

**Finding: The count of 7 is verified correct.** Three authoritative legal sources (Hinshaw & Culbertson, Ogletree Deakins, Workplace Privacy Report — all citing the IDHR draft rules directly) confirm exactly 7 required notice elements.

However, there is a substantive mismatch between what the site calls element 7 and what the regulation actually requires:

| # | Site's Label (index.html, hb3773-notification-sample.html) | Actual IDHR Subpart J Requirement |
|---|---|---|
| 1 | AI product name, developer, and vendor | AI product name and its developer/vendor — MATCHES |
| 2 | Employment decisions influenced | Employment decisions the AI influences or facilitates — MATCHES |
| 3 | Purpose and data categories | AI's purpose and categories of personal/employee data processed — MATCHES |
| 4 | Job positions where AI is used | Types of job postings/positions where AI will be used — MATCHES |
| 5 | Contact person | Point of contact for questions — MATCHES |
| 6 | Accommodation rights | Right to request reasonable accommodation and how to request it — MATCHES |
| 7 | Anti-discrimination statement (no discriminatory effect, no zip codes as proxies) | **Statutory language** — i.e., required verbatim language from 775 ILCS 5/2-102(L) of the Illinois Human Rights Act |

**The problem:** The site frames element 7 as a general anti-discrimination statement that the employer writes themselves. The actual regulation requires *statutory language* — specific text from 775 ILCS 5/2-102(L). The anti-discrimination commitment may be implicit in that statutory language, but the requirement is to reproduce the statutory text, not draft a custom statement.

**Risk:** The generated notification letter (pdf-generator.js, `generateNotificationLetter()`) includes a custom anti-discrimination paragraph written by the developer. It does not cite or reproduce 775 ILCS 5/2-102(L) statutory language. This may leave the document technically non-compliant on element 7.

**Severity:** High. If a buyer relies on the document and an IDHR reviewer expects the statutory verbatim text, the document could be found deficient on this element.

**Recommendation:** Cameron needs a lawyer to confirm whether the generated anti-discrimination section satisfies the "statutory language" requirement or whether 775 ILCS 5/2-102(L) text must be reproduced verbatim. The FAQ and element lists should be updated accordingly.

---

### CRITICAL-2: "Used by Illinois employers" — Unverified social proof

**Claim:** The trust bar on index.html displays: "Used by Illinois employers" as a peer-validation signal.

**Finding:** No evidence of any customers exists anywhere in the codebase — no testimonials, no purchase count, no case studies, no customer names. The site was built as a new product and has no public evidence of any sales. This is a fabricated social proof claim with no verifiable basis.

**Severity:** High. This is potentially an FTC Act Section 5 violation (deceptive trade practice). Unverified social proof claims in marketing have been the subject of FTC enforcement action. This claim must either be substantiated with real customers or removed immediately.

---

### CRITICAL-3: "Customers who purchased within the prior 12 months receive updated documents at no additional cost" — Unfulfillable promise

**Claim (FAQ — "What if the law changes?"):** "We monitor regulatory updates and update our templates accordingly. If a significant change occurs, customers who purchased within the prior 12 months receive updated documents at no additional cost."

**Finding:** The Terms of Service explicitly state all sales are final, and there is no mechanism — email capture, customer database, or delivery system — visible in the codebase to fulfill this promise. The product generates PDFs client-side and sends no email receipt. There is no way to contact past customers.

**Severity:** High. This is a promise Cameron cannot operationally fulfill and that contradicts the Terms. It creates a reasonable consumer expectation that could be actionable. Either remove it or build the infrastructure to back it.

---

## Moderate Issues

### MODERATE-1: Pricing comparison "$299 vs. $5,000–$25,000 at a law firm" — Defensible but framing is misleading

**Claim:** Multiple instances across index.html and hb3773-notification-sample.html state that a law firm would charge "$5,000–$25,000" for what this product provides.

**Finding:** The comparison is directionally defensible but the framing is misleading in a specific way.

- Illinois employment law attorneys average $409/hour (Clio 2025 data). At that rate, 12–61 hours of attorney time = $5,000–$25,000. That is a plausible range for a full compliance engagement that includes legal advice, attorney-client relationship, and ongoing counsel.
- Legal match data confirms complex employment compliance engagements can reach $5,000–$50,000+.
- However, the site frames this as "Employment attorneys typically charge $300–600/hour. A custom HB3773 compliance package...can cost $5,000–$25,000." This implies a direct apples-to-apples comparison: same output, different price.

**The misleading part:** A law firm's $5,000–$25,000 engagement includes legal advice, professional liability, an attorney-client relationship, and legal conclusions a buyer can rely on. This product explicitly disclaims all of those. The comparison table on hb3773-notification-sample.html does acknowledge "Legal advice included: No (AI Comply Docs) / Yes (attorney)" — which is credit. But the pain section ("Reacting to a complaint costs $5,000–$25,000 in legal fees — minimum") conflates reactive litigation defense costs with proactive compliance drafting costs, which is a different thing entirely.

**Verdict:** The range is real. The framing mixes proactive compliance drafting costs and reactive litigation response costs without distinguishing them. This is defensible but should be tightened.

**Recommendation:** Be specific: "Having an employment attorney draft your initial HB3773 compliance documentation typically costs $2,000–$10,000. Responding to an IDHR complaint or lawsuit costs far more." That's more accurate and still compelling.

---

### MODERATE-2: The generated notification does not include all 4 required posting locations as separate deliverables

**Claim:** The product claims to include "Everything required by IDHR Subpart J." The checklist (Document 5) correctly lists all 4 required posting locations (handbooks, physical boards, intranet/website, job postings).

**Finding:** The product generates one notification letter PDF. IDHR Subpart J requires the notice to be posted in all four locations. The single PDF letter is not formatted or adapted for each posting context (e.g., a job posting version vs. a handbook insert vs. an intranet page). The checklist tells the employer they need to post in 4 places but doesn't help them do it.

**This is not a false claim** — the checklist item is accurate — but the product description could be read as implying the buyer is fully set up after downloading 5 PDFs. They still have significant implementation work.

**Recommendation:** Add a note clarifying that the notification letter must be distributed by the buyer to all 4 required channels. Do not imply the 5 PDFs handle posting obligations.

---

### MODERATE-3: "Subpart J rules" referenced as finalized — Status is "draft"

**Claim:** Throughout the site, IDHR Subpart J is referenced as established binding rules: "The Illinois Department of Human Rights has published Subpart J rules specifying exactly what your AI notice must contain."

**Finding:** As of December 2025, IDHR Subpart J rules were in draft/stakeholder-comment status. Multiple law firm articles (Ogletree, Workplace Privacy Report) describe them as "draft rules" shared at stakeholder meetings that had "yet to be formally published for public comment." The statute (HB3773 / IHRA amendment) is in effect as of January 1, 2026 — but the implementing rules under Subpart J may still be in draft form as of March 2026.

**Risk:** The site claims the Subpart J rules are published fact. If the rules are still in proposed/draft status, the "7 elements" count and their specific formulation are based on draft regulatory text, not final rules. The statute requires notice but delegates the specifics to IDHR rulemaking. This creates a gap between what the site presents as settled law and what may be ongoing rulemaking.

**Recommendation:** Update language from "IDHR has published Subpart J rules" to "IDHR's Subpart J rules [draft / proposed rules]" and note that the underlying HB3773 statute is in effect. Confirm with a lawyer whether the draft rules have been finalized as of the current date.

---

### MODERATE-4: "5-minute questionnaire" vs. actual time estimate in How It Works

**Claim:** hb3773-notification-sample.html CTA says: "Answer a 5-minute questionnaire about your AI systems."

**Finding:** index.html's "How It Works" section says: "Takes about 10 minutes." These two pages give contradictory time estimates for the same questionnaire. The questionnaire has 6 steps covering company info, AI systems (with multiple fields per system, repeatable), data inputs, human oversight, contact info, and review. For a company with multiple AI systems, 10 minutes is already optimistic.

**Recommendation:** Standardize to "about 10 minutes" across all pages. The inconsistency looks like an oversight and undermines trust if a buyer notices.

---

## Minor Issues

### MINOR-1: Schema.org structured data is consistent with page content

**Finding:** The FAQPage schema accurately mirrors the visible FAQ content. The SoftwareApplication schema correctly states price: "299" USD, name: "AI Comply Docs", and description matching the product. No discrepancies between schema and visible content found.

---

### MINOR-2: HB3773 effective date — Verified correct

**Claim:** "Illinois HB3773 is in effect NOW" and "effective January 1, 2026."

**Finding:** VERIFIED CORRECT. Multiple authoritative sources confirm January 1, 2026 as the effective date (National Law Review, Illinois State Bar Association, K&L Gates, Seyfarth Shaw, Vensure). The statute is the amendment to 775 ILCS 5/2-102 through House Bill 3773 (Public Act 103-0804), signed into law in 2024, effective January 1, 2026.

---

### MINOR-3: FAQ — "This applies to any company using AI tools from third-party vendors too, not just companies that built their own AI."

**Finding:** VERIFIED CORRECT. The statute covers all employers using AI in covered employment decisions, regardless of whether the AI was built internally or sourced from a vendor. Multiple legal summaries confirm this scope.

---

### MINOR-4: Recordkeeping — "4-year retention" claim

**Claim:** The compliance checklist and supporting text state "All records retained for 4 years."

**Finding:** VERIFIED CORRECT in substance. The draft Subpart J rules specify 4-year retention requirements. The FAQ answer on notice posting also states "Records must be retained for 4 years." This is consistent with the draft rules language.

---

### MINOR-5: FAQ — "Is this legal advice?" answer

**Finding:** Correctly and clearly states "No." The disclaim is prominently repeated in the FAQ, on every generated PDF footer, in a red box on each PDF, and in the Terms. The disclaimer infrastructure is strong and consistent.

---

### MINOR-6: No "coming soon" promises for Colorado SB205 or EU AI Act

**Finding:** No such promises appear anywhere in the codebase. The regulation selector in the generator shows only "Illinois HB3773" with an "IN EFFECT" badge. No future regulations are teased or promised. This is clean.

---

### MINOR-7: Terms of Service — "Governing Law: Wyoming" while product is Illinois-specific

**Finding:** Not a product accuracy issue, but worth flagging: the Terms state Wyoming law governs, arbitration is in Wyoming, yet the product serves Illinois employers under Illinois law. This is a legal structure choice (likely for LLC formation reasons) and is Cameron's decision to make with counsel. Not a claim accuracy issue.

---

## Gaps and Unknowns

### GAP-1: Whether IDHR Subpart J rules have been finalized as of March 2026

The most consequential unknown. All external research as of December 2025 described Subpart J rules as "draft" or "proposed." By March 2026, they may have been finalized — or may still be in rulemaking. The "7 elements" count is stable across multiple legal summaries and appears reliable regardless, but the precise formulation of element 7 (statutory language vs. custom anti-discrimination statement) depends on final rule text. Cameron should confirm final rule status through a licensed Illinois employment attorney.

### GAP-2: What "statutory language" in element 7 actually requires verbatim

The three sources consulted describe element 7 as "required statutory language" from 775 ILCS 5/2-102(L). None reproduce the exact statute text in their summaries. The generated documents include a custom anti-discrimination paragraph that may or may not satisfy this requirement. A lawyer must review the actual statute text and the generated paragraph together.

### GAP-3: Whether there are any actual customers

There is no evidence in the codebase of any payment being processed or any customer having generated documents. The "Used by Illinois employers" trust bar claim has no substantiation whatsoever.

### GAP-4: Attorney fee range for proactive HB3773-specific compliance drafting (vs. general compliance)

The $5,000–$25,000 range is real for comprehensive employment law compliance engagements. However, no source found provides a specific price point for HB3773-specific AI notice drafting as a standalone project. A more precise comparison would require quotes from actual Illinois employment law firms for this specific scope.

---

## Synthesis

**Overall accuracy rating: Mixed — core regulatory facts are solid; two claims are materially false or unfulfillable.**

### What is accurate and defensible:
- The count of 7 required IDHR elements is correct, verified by three independent legal sources.
- Elements 1–6 as described match the regulation.
- The January 1, 2026 effective date is correct.
- The scope of who must comply is accurate.
- The 4-year recordkeeping requirement is accurate.
- The penalty exposure description (private right of action, IDHR enforcement, attorney fees) is accurate.
- The disclaimer infrastructure (not legal advice) is thorough and consistent.
- The Schema.org structured data is accurate.
- No false "coming soon" promises for other regulations.

### What must be fixed before this product can be marketed with integrity:

1. **Remove "Used by Illinois employers"** until there are actual customers. This is the most urgent fix — it is a fabricated claim with FTC risk.

2. **Remove or fulfill the "12-month update" promise** in the FAQ. Either build the email/CRM infrastructure to deliver on it or delete the paragraph.

3. **Clarify element 7** — get a lawyer to confirm whether the generated anti-discrimination section satisfies the "statutory language" requirement, and update the element description accordingly.

4. **Confirm Subpart J finalization status** and update site language from "published rules" to the accurate status (draft or final).

5. **Standardize the time estimate** — 5 minutes (hb3773-notification-sample.html) vs. 10 minutes (index.html) must match.

### What is defensible but should be tightened:
- The $5,000–$25,000 pricing comparison. Distinguish proactive compliance drafting from reactive litigation response.
- The "everything required by IDHR" claim should note that the buyer must still implement posting across all 4 channels.
