# Team 1 Findings: Legal & Liability Audit
## Date: 2026-03-10
## Auditor: Claude Sonnet 4.6 (Expedition Researcher)

---

## Executive Summary

The site has made significant improvements since the 30-day refund guarantee error was identified. The all-sales-final policy is now consistent across all files. However, this audit found **four critical issues**, **four moderate issues**, and **four minor issues** that require attention. The most serious exposures involve a ghost contact reference, a material promise in the FAQ that cannot be kept without human infrastructure, mixed messaging that actively undermines the "not legal advice" disclaimer, and an arbitration clause that names a venue without an accessible mechanism.

---

## Critical Issues

### CRITICAL 1 — Ghost Contact Reference in Terms and Privacy Policy

**What it is:** Both `terms.html` Section 14 and `privacy.html` Section 8 say: *"contact us at the email address listed on our website."* No email address exists anywhere on the website. The site has no contact page, no footer email, and no visible contact mechanism.

**Why it matters:** This creates a double exposure:

- **Contract defect:** The Terms of Service reference a mechanism for exercising contractual rights (disputing charges, raising privacy questions) that does not exist. A court could find the arbitration clause unenforceable if the pre-dispute contact mechanism it implicitly requires is illusory.
- **Stripe SSA violation:** Stripe's Services Agreement explicitly requires merchants to "maintain and make available to Customers a fair and neutral refund and exchange policy, and clearly explain the process by which Customers can receive a Refund." (Source: Stripe Services Agreement — Services Terms, fetched March 2026.) "All sales final" is a permissible refund policy, but it must be clearly communicated. The Terms do explain it. The problem is that the Terms also promise a contact mechanism that would be used to process any dispute — and that mechanism is absent. This creates an argument that the policy is not "clearly explained" as a practical matter.
- **Consumer protection exposure:** Illinois Consumer Fraud and Deceptive Business Practices Act (815 ILCS 505) prohibits deceptive practices. Promising a contact mechanism that does not exist is a deceptive omission regardless of governing law selection.

**Evidence:** terms.html line 66, privacy.html line 63. Confirmed by searching the entire codebase — no email address, contact form, or support link exists anywhere in index.html, terms.html, or privacy.html.

**Constraint note:** The fix does NOT require human customer service. A monitored email address (even one that auto-replies "all sales are final per our terms") satisfies the disclosure requirement. A dead email that generates no response still satisfies more than nothing.

---

### CRITICAL 2 — The "Update" Promise in FAQ Is an Active Obligation Without Infrastructure

**What it is:** index.html FAQ section, "What if the law changes?" answer states: *"We monitor regulatory updates and update our templates accordingly. If a significant change occurs, customers who purchased within the prior 12 months receive updated documents at no additional cost."*

**Why it matters:** This is an express warranty and a material promise. It creates two obligations the current system cannot fulfill:

1. **Ongoing monitoring duty:** The site claims active regulatory monitoring. If the IDHR Subpart J rules are finalized (they are currently in draft as of March 2026 — confirmed via Hinshaw & Culbertson, February 2026), and the templates are not updated, any customer who relied on this promise has a breach of warranty claim.
2. **12-month re-delivery obligation:** The system has no customer database (all generation is client-side), no email capture, and no mechanism to contact prior purchasers. The promise is literally undeliverable. This is not a gray area — promising something you have no mechanism to provide is a deceptive practice under FTC Act Section 5 and Illinois consumer fraud law.

**This is the same class of error as the 30-day refund guarantee.** It is a template-driven promise copied from a SaaS model (which does have customer records) applied to a zero-data-retention product.

**Evidence:** index.html FAQ section, "What if the law changes?" — confirmed by reading the full HTML.

---

### CRITICAL 3 — "Legally-Required" in Meta Description and OG Tags Creates an Implied Warranty

**What it is:** The page `<meta name="description">` and `<meta property="og:description">` both state: *"Generate legally-required AI compliance documentation in minutes. Illinois HB3773 notification templates with all 7 IDHR-required elements."*

**Why it matters:** The phrase "legally-required" combined with "all 7 IDHR-required elements" makes an affirmative claim that the documents satisfy a legal requirement. The hero section badge reinforces this: *"Templates verified current as of March 2026 — all 7 IDHR Subpart J elements included."*

This is legally significant for two reasons:

1. **Express warranty creation:** Under UCC principles applied to software (and consumer protection law more broadly), affirmations of fact that a buyer would reasonably rely on become express warranties. Claiming the documents contain "all 7 IDHR-required elements" is an affirmation that they are legally complete — directly contradicted by the disclaimer that they "may not satisfy all applicable legal or regulatory requirements." Courts have found this tension — strong marketing claims plus boilerplate disclaimers — to be a basis for warranty claims. (Source: Terms.Law, "Can You Disclaim All Warranties? Legal Limits & What Courts Actually Enforce," January 2026.)

2. **Regulatory accuracy risk:** As of March 2026, the IDHR Subpart J rules are still in draft form and have not been formally adopted. (Source: Hinshaw & Culbertson, February 2026; Workplace Privacy Report, December 2025.) The site claims to include "all IDHR Subpart J required elements" but the final elements have not yet been published for public comment, let alone adopted. The "7 elements" the site references are drawn from the draft rules. Claiming they are definitively "required" before the rules are final is factually premature.

**Evidence:** index.html lines 7, 13 (meta tags), hero section badge text.

---

### CRITICAL 4 — Mixed Messaging Actively Creates UPL and Warranty Risk

**What it is:** The site simultaneously (a) disclaims being legal advice and (b) makes claims that only legal advice can legitimately make.

The FAQ structured data (Schema.org FAQPage) embedded in index.html lines 39-78 includes:

> *"AI Comply Docs generates the same documentation package for $299 using legally-researched templates based on actual IDHR Subpart J requirements."*

This is paired with the "legally-required" meta claims above. The message to a reasonable buyer is: "This is what the law requires, and we give you exactly that." The disclaimer that it's "not legal advice" is buried in a FAQ answer, not visible in the hero section.

**Why this is a UPL risk:** The ABA's March/April 2025 Law Practice Magazine on re-regulating UPL in the AI age identifies the spectrum of risk. Higher risk activities include "tools that tailor advice to a user's specific situation" and "presenting themselves as substitutes for attorney consultation." The site's marketing language ("generates the same documentation package," "all 7 IDHR-required elements," "legally-required") positions the product as a substitute for legal services, not a complement to them. The questionnaire personalizes the output to the user's specific company. This combination — personalized output + legal compliance claims — is where enforcement actions have focused. (Source: ABA, Re-Regulating UPL in the Age of AI, March/April 2025; Above the Law, UPL Risk Mitigation for Legal Tech, January 2024.)

**Note:** This site is almost certainly not UPL under current Illinois law. The key precedent (Parsons Technology/Quicken Family Lawyer) established that document automation software is not UPL in most jurisdictions. LegalZoom operates nationwide. The risk is not criminal UPL prosecution — it is that the marketing language undermines the disclaimer defense if a customer sues for damages claiming the documents were "legally required" and turned out to be wrong.

---

## Moderate Issues

### MODERATE 1 — Arbitration Clause Is Missing a Registration and Is Venue-Locked in a Way That May Fail

**What it is:** terms.html Section 11 specifies mandatory arbitration under AAA rules, conducted in Wyoming, by a single arbitrator.

**Issues found:**

1. **AAA Consumer Clause Registry:** As of May 1, 2025, the AAA's revised Consumer Arbitration Rules require businesses to register their consumer arbitration clauses with the AAA Consumer Clause Registry. The AAA "may decline to accept a Demand for Arbitration" where the clause does not comply with the Consumer Due Process Protocol. (Source: AAA 2025 Consumer Arbitration Rules, effective May 1, 2025; Bradley LLP analysis, May 2025.) There is no indication this clause has been registered.

2. **Wyoming venue for consumer disputes:** Requiring a consumer to arbitrate in Wyoming is a classic unconscionability target. Illinois courts have found class-action waivers unconscionable when they fail to provide "cost-effective mechanisms for obtaining remedies." (Source: Illinois Trial Practice Blog, citing Illinois Supreme Court precedent.) Requiring a $299 dispute to be arbitrated in Wyoming effectively makes arbitration inaccessible for small claims, which courts have used as grounds to void the entire clause.

3. **The clause is workable but exposed:** Clickwrap arbitration clauses are generally enforceable when there is clear notice and affirmative assent. (Source: Lexology, From Clickwrap to the Courtroom, 2025; Massachusetts SJC Good v. Uber analysis.) The site does present Terms at checkout. The clause is not void — it is exposed at the margins.

**What is solid:** The class action waiver is standard and generally enforceable under federal FAA precedent. The specific language is clear. The structural weakness is venue + no AAA registration, not the waiver itself.

---

### MODERATE 2 — "All Sales Final" Policy Is Sound in Terms But Is Not Displayed at Checkout

**What it is:** terms.html Section 7 clearly states all sales are final for digital goods, with good reasoning (instant delivery). The FAQ on index.html also confirms it. This is an improvement.

**Remaining gap:** Stripe's Services Agreement requires merchants to "clearly explain the process by which Customers can receive a Refund" — meaning the policy must be visible before payment, not only in Terms the customer may not read. (Source: Stripe SSA Services Terms, fetched March 2026.)

The checkout flow redirects to a Stripe Payment Link (`buy.stripe.com/...`). Stripe Payment Links allow merchants to customize displayed policies under "Customize text and policies." If the all-sales-final policy is not displayed on the Stripe Payment Link page itself (not just in terms.html), Stripe's own platform requirements may not be satisfied. This creates chargeback exposure — if a customer disputes as "goods not as described" or "no refund offered," Stripe will look for evidence the policy was prominently disclosed at point of sale.

**Evidence:** stripe-checkout.js line 22 — payment link is hardcoded; terms.html Section 7.

---

### MODERATE 3 — The Privacy Policy Claims to Collect Analytics and Respond to Support Emails But Has No Contact Email

**What it is:** privacy.html Section 1 states: "We may use privacy-respecting analytics (page views, referral source)" and "If you email us for support, we retain that correspondence." Section 5 states: "For payment-related data held by Stripe, contact Stripe directly or email us and we'll assist."

All three of these statements presuppose infrastructure that either may not exist (analytics tool — no tracking script is visible in the codebase) or definitely does not exist (support email). This is not a UPL issue — it is a straightforward accuracy problem. A privacy policy that describes data practices that don't occur, or promises contact mechanisms that don't exist, can itself constitute a deceptive practice under FTC Act Section 5 and Illinois consumer fraud law.

---

### MODERATE 4 — "Verified Current as of March 2026" Is a Time-Stamped Accuracy Claim

**What it is:** The hero section badge states: *"Templates verified current as of March 2026 — all 7 IDHR Subpart J elements included."*

This is a dated accuracy warranty. As of March 2026, the Subpart J rules are still in draft. When they are finalized — possibly with different element counts or requirements — this badge will be factually false. The site has no mechanism to update this badge automatically or to notify customers that the "verified" date is stale.

This is also related to Critical Issue 2 (the update promise). Together they create a compounding exposure: the site promises templates are current AND promises to notify prior customers of changes, but has no data retention to fulfill either promise.

---

## Minor Issues

### MINOR 1 — No Jurisdiction Statement for Where the Product Is Sold

The Terms state Wyoming law governs. The product is marketed for use by Illinois employers — the site is explicitly selling an Illinois compliance product. This creates a choice-of-law conflict: Wyoming governing law is generally respected between sophisticated parties, but Illinois courts can apply Illinois consumer protection law regardless of a contract's choice-of-law clause when the consumer is in Illinois. (Source: Multi-state enforcement research, March 2026 — Illinois consumer protection law applies to transactions with Illinois consumers.) This is a low-probability risk for a $299 product, but the Terms should acknowledge the multi-state nature of the customer base.

---

### MINOR 2 — The Indemnification Clause Is One-Sided in a Way That May Signal Bad Faith

terms.html Section 9 requires customers to indemnify the company for "your failure to obtain appropriate legal counsel." This is unusual. It essentially indemnifies the seller against the consequence of selling a product the seller simultaneously recommends getting legal review for. While indemnification clauses are common, this specific phrasing — indemnifying for not hiring a lawyer after buying a document service — could be used by plaintiff's counsel to argue the seller knew the product required attorney review to be safely used, yet sold it without ensuring that review occurred.

---

### MINOR 3 — No Explicit Statement That Documents Are Templates, Not Final Compliance

The PDF disclaimers in pdf-generator.js are actually strong — the "IMPORTANT NOTICE" box at the top of each document and the footer on every page ("TEMPLATE ONLY — NOT LEGAL ADVICE — CONSULT A LICENSED ATTORNEY") are prominently placed and clearly worded. However, index.html's marketing copy does not contain a visible, prominent disclaimer before payment. The word "template" appears only in the FAQ and in one small line under the pricing section. A reasonable buyer could proceed through the questionnaire, pay $299, and not encounter the word "template" or "not legal advice" until they open the downloaded PDF.

---

### MINOR 4 — Governing Law Clause Has No Exclusion for Mandatory Consumer Protection Laws

terms.html Section 13 states Wyoming law governs "without regard to conflict of law principles." This is standard drafting, but consumer protection statutes are typically non-waivable by contract. A customer in California, New York, or Illinois can assert their state's consumer protection rights regardless of this clause. The clause does not acknowledge this reality, which could create a credibility problem if the terms are scrutinized — courts sometimes view overbroad governing law claims as evidence of overreaching.

---

## Gaps and Unknowns

1. **IDHR Subpart J finalization:** As of March 2026, the Subpart J rules are in draft. If the final rules add, remove, or modify the "7 required elements," the site's specific claims become inaccurate. The timeline for finalization is unknown. This uncertainty is the product's core regulatory risk.

2. **Stripe Payment Link policy display:** This audit cannot verify what the actual Stripe Payment Link page displays. The all-sales-final policy may already be configured in the Stripe dashboard. This should be verified directly.

3. **AAA Consumer Clause Registry:** Whether the arbitration clause has been registered with the AAA is unknown. This is a straightforward administrative task with real enforceability implications.

4. **Analytics infrastructure:** The Privacy Policy references analytics but no analytics script (Google Analytics, Plausible, Fathom, etc.) appears in the codebase. If analytics are truly not running, the Privacy Policy needs to be corrected to remove that representation.

5. **Wyoming LLC registered agent:** Whether the Wyoming LLC has a registered agent and a functional address for service of process is unknown. This is not a website issue but is relevant to whether arbitration and legal process can actually be initiated.

6. **Whether a licensed attorney has reviewed this product:** Unknown. The UPL risk is significantly lower if the templates were reviewed by a licensed Illinois employment attorney and that review can be documented.

---

## Synthesis

**Overall legal posture:** Moderate risk, with two fixable critical issues and one structural contradiction that requires a strategic decision.

**What is actually solid:**
- The PDF disclaimers are strong. Every document has a prominent red-bordered TEMPLATE ONLY notice at the top and a two-line footer disclaimer on every page. This is the right approach.
- The Terms' warranty disclaimer, limitation of liability, and assumption of risk language are well-drafted.
- The "all sales final" policy reasoning (instant digital delivery) is sound and legally defensible.
- The arbitration and class action waiver structure is fundamentally usable.
- The product is almost certainly not UPL — document automation serving as a template generator has established precedent.

**What must be fixed (in order of urgency):**

1. **The ghost contact email** (Critical 1) — This breaks the Terms, creates a Stripe policy gap, and constitutes a deceptive omission. Fix: add a real email address, even a simple one. No human response required.

2. **The "customers within 12 months receive updates" promise** (Critical 2) — This promise cannot be kept. It must be removed or replaced with language the system can actually fulfill (e.g., "templates are updated periodically; customers should return to the site to verify they have the current version").

3. **"Legally-required" language in meta/OG tags** (Critical 3) — Soften to "required under" or "designed for compliance with." The word "legally-required" creates an express warranty the disclaimer then contradicts.

4. **Register the arbitration clause with AAA** (Moderate 1) — Straightforward administrative step. Low cost, materially reduces enforceability risk.

5. **Confirm the Stripe Payment Link displays the no-refund policy** (Moderate 2) — Verify in the Stripe dashboard.

**The structural contradiction that requires a decision:**

The product's marketing says "this is what Illinois law requires, and we give you exactly that." The legal documents say "this is a template, we make no warranties, consult a lawyer." This tension cannot be fully resolved by tweaking language — it is a product positioning choice. The current balance leans toward the marketing side, which is why the critical issues cluster around marketing claims. Shifting the balance requires either (a) weakening the marketing claims to match the disclaimer posture, or (b) strengthening the disclaimer posture to be visible before payment, not just in the PDFs. Option (b) is the right answer — a clear, prominent disclaimer on index.html before the purchase CTA would address most of the warranty and UPL mixed-messaging concerns without changing the product's commercial appeal.

---

## Sources Consulted

- Stripe Services Agreement (General Terms): https://stripe.com/legal/ssa
- Stripe Services Agreement (Services Terms): https://stripe.com/legal/ssa-services-terms
- Stripe Restricted Businesses: https://stripe.com/restricted-businesses
- Illinois HB3773 status: https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026
- IDHR Subpart J draft rules: https://www.workplaceprivacyreport.com/2025/12/articles/artificial-intelligence/illinois-draft-ai-notice-regulations-what-employers-need-to-know/
- ABA Re-Regulating UPL in the Age of AI (March/April 2025): https://www.americanbar.org/groups/law_practice/resources/law-practice-magazine/2025/march-april-2025/re-regulating-upl-in-the-age-of-ai/
- UPL Risk Mitigation for Legal Tech (Above the Law, January 2024): https://abovethelaw.com/2024/01/unauthorized-practice-of-law-risk-mitigation-strategies-for-legal-tech-entrepreneurs/
- AAA Consumer Arbitration Rules 2025: https://www.adr.org/news-and-insights/the-aaa-s-2024-2025-arbitration-rule-changes-a-breakdown/
- Bradley LLP on AAA 2025 Updates: https://www.bradley.com/insights/publications/2025/05/aaa-updates-consumer-arbitration-rules-what-businesses-need-to-know
- Clickwrap arbitration enforceability (Lexology): https://www.lexology.com/library/detail.aspx?g=5271c492-63b2-4cc7-a418-14394219ef63
- Warranty disclaimer limits (Terms.Law, January 2026): https://www.terms.law/2025/01/15/the-legal-limits-of-disclaiming-warranties/
- Illinois class action waiver analysis: https://www.illinoistrialpractice.com/2006/10/the_illinois_su.html
- Ogletree on IDHR draft rules: https://ogletree.com/insights-resources/blog-posts/illinois-unveils-draft-notice-rules-on-ai-use-in-employment-ahead-of-discrimination-ban/
