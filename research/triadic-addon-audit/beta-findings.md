# WITNESS BETA — Adversarial Findings
## Legal Content & Document Quality Review of 17 New Add-On PDF Generators
**Reviewer:** Witness Beta (adversarial lens)
**Date:** 2026-03-15
**Scope:** 6 generator files sampled deeply; research docs and PRODUCT-ONBOARDING.md reviewed for pattern violations

---

## METHODOLOGY

Reviewed:
- `research/law-specific-addons-2026-03-15.md` — product specifications
- `research/addon-fact-verification-2026-03-15.md` — what was and was not verified
- 6 generator files read in full
- `PRODUCT-ONBOARDING.md` — 21+ documented error patterns
- `research/expedition-factual-audit/team-2-colorado-findings.md` — prior Colorado audit findings
- `research/expedition-factual-audit/team-5-consistency-findings.md` — prior consistency audit findings

---

## FILE 1: proxy-analysis-worksheet.ts
**Path:** `src/lib/pdf-il-zip-proxy-audit/proxy-analysis-worksheet.ts`

### Statutory Citation — CORRECT but POTENTIALLY MISFRAMED
The file correctly cites `775 ILCS 5/2-102(L)(1)` for the zip code proxy prohibition. This matches the research spec.

**FINDING 1.1 — EEOC 4/5 Rule Citation: Unverified from Primary Source**
Section 4 states: "Per the EEOC Uniform Guidelines (29 C.F.R. § 1607), a ratio below 0.80 (80%) indicates adverse impact."

This is a reasonable industry-standard reference, but the EEOC Uniform Guidelines are federal employment law, not Illinois HB3773. The document does not clarify that this is a SEPARATE federal standard being used as a proxy analysis methodology, not a requirement under Illinois HB3773 itself. A compliance officer might conflate the two: believing the 4/5 rule is an HB3773 requirement rather than a borrowed analytical framework. There is no disclaimer that this is one analytical method, not a statutory mandate under Illinois law.

**FINDING 1.2 — "Sexual Orientation" Missing from Protected Characteristics in Correlation Analysis Section**
Section 3 (Correlation Analysis) lists 5 protected characteristics for correlation testing:
- Race / Color
- Ethnicity / National Origin
- Sex
- Religion
- Disability Status

However, the statutory list under the Illinois Human Rights Act includes "sexual orientation" as a protected characteristic (verified in PRODUCT-ONBOARDING.md and the expedition audit). Sexual orientation is absent from the correlation worksheet's characteristic list. A compliance officer using this worksheet would never test for sexual orientation correlation — but the law protects it.

This is a substantive gap that directly undermines the document's purpose. If a zip code produced a proxy effect correlated with sexual orientation, this worksheet would not capture it.

**FINDING 1.3 — IDHR Rulemaking Gap Not Disclosed**
The fact verification doc (addon-fact-verification-2026-03-15.md) explicitly states:
> "IDHR has NOT published proposed rules as of today — page says 'currently developing rules'"
> "Products should flag: 'The notice obligation is effective now (1-1-26), but IDHR implementing rules specifying format and timing have not been published'"

This worksheet contains NO mention of the rulemaking gap. A compliance officer using this worksheet does not know the audit methodology has no regulatory specification — that IDHR has not defined what "acceptable" proxy analysis looks like. The document implies it is filling a regulatory requirement when the regulatory details are undefined.

**FINDING 1.4 — Only 4 Regions in Section 2**
The worksheet hardcodes exactly 4 geographic regions (Region A through D). A compliance officer with applicants from 6 or more geographic clusters would have an incomplete analysis by design — the template forces truncation of their actual data.

---

## FILE 2: ag-notification-letter.ts
**Path:** `src/lib/pdf-co-ag-reporting/ag-notification-letter.ts`

### Statutory Citation — PARTIALLY CORRECT, ONE ERROR

**FINDING 2.1 — Critical Statutory Error: 90-Day Timeline Referenced as "Best Practice," Not Statutory Obligation**
Line 139 of the generator reads:
```
"Days Elapsed Since Discovery (must be within 90 days per best practice)"
```

This is factually wrong. The 90-day AG notification is NOT "best practice" — it is a **statutory obligation** under C.R.S. § 6-1-1703(7), confirmed as verified by Team 2 (expedition audit) and referenced correctly in the `pdf-co-incident-response` product. Labeling a statutory deadline as "best practice" actively misleads the compliance officer about the legal nature of the obligation. A compliance officer who believes the 90-day window is industry practice rather than law has no reason to treat it with statutory urgency.

**FINDING 2.2 — Wrong Statutory Hook for the Notification Obligation**
The document header comment cites `C.R.S. § 6-1-1703 and Colorado Consumer Protection Act` as the combined authority. But Section 1's introductory paragraph attributes the notification requirement to:
> "C.R.S. § 6-1-1703 requires deployers to notify **affected consumers** and take corrective action."

This is wrong. Section 6-1-1703 governs the deployer's obligations generally. The AG notification specifically is at § 6-1-1703(7). More importantly, **notifying the AG and notifying affected consumers are two separate obligations** under the statute. The introductory paragraph conflates AG notification with consumer notification, making it appear this letter serves both purposes when it does not. Consumers are not the AG.

**FINDING 2.3 — Section 6 Reference Correctly Identifies Colorado Consumer Protection Act**
The Section 6 reference to `§§ 6-1-1701 through 6-1-1707` and the Colorado Attorney General's enforcement authority under § 6-1-1706 is correct. The Colorado Consumer Protection Act reference is accurate.

**FINDING 2.4 — No Field for Triggering Discovery Method**
The fact verification doc notes:
> "90-day AG notification: trigger is 'discovery' (not 'knew or should have known')"

This distinction is legally significant — the clock starts on actual discovery. However, the letter has no field asking the company to describe HOW the discrimination was discovered (e.g., internal audit, consumer complaint, third-party report). Without this, the AG has no way to assess whether the notification is timely from the correct trigger date. A compliance officer completing this letter cannot demonstrate the discovery-to-notification timeline.

**FINDING 2.5 — No Field Addressing Developer Disclosure Under § 6-1-1702**
The research doc identifies § 6-1-1702 (developer disclosure) as partially verified content with gaps. If the discrimination originated from a developer-provided AI system, the AG would want to know what the developer disclosed to the deployer. The letter has no field for this — creating a gap between what the AG investigation will ask and what the template prepares the deployer to provide.

---

## FILE 3: pre-use-notice.ts
**Path:** `src/lib/pdf-ca-admt-notice-optout/pre-use-notice.ts`

### §7220 Coverage — MOSTLY CORRECT, SIGNIFICANT GAPS

**FINDING 3.1 — Missing §7220 Element: "Manner Likely to Be Seen" Delivery Requirement**
The fact verification doc states the §7220 requirement includes:
> "Must be provided before use, in manner likely to be seen, in primary interaction mode."

Section 7 of the template asks how the notice is delivered, listing delivery methods (privacy notice, data collection point, email, account settings, paper). However, it does NOT include any verification field for whether the notice was delivered "in a manner likely to be seen" or in the "primary interaction mode." These are distinct §7220 requirements — the notice can be technically provided but still violate the regulation if buried where consumers will miss it. No compliance officer filling out this form is asked to confirm or document this requirement.

**FINDING 3.2 — §7221 Exception Documentation Missing**
The fact verification doc flags:
> "Opt-out exceptions §7221(b): NOT fully captured — PDF navigation failed at pages 115-118"

Section 6 of the template references §7221 for the appeal right, but the template contains no mechanism for documenting which exception (if any) the business is relying on under §7221(b). This is explicitly flagged as unverified in the research. The research spec for this product states the notice must include `(2)(B) identify specific exception if relying on §7221(b) exception` — but the generator has no field for this.

This is a known gap from the research phase that was not addressed in the implementation. A compliance officer using this template to rely on a §7221(b) exception has no place to document which exception they are invoking.

**FINDING 3.3 — "§7221 Human Appeal" Element Present but Incorrectly Scoped**
Section 6 says:
> "If [company] denies your opt-out request, you have the right to appeal that decision."

The research spec for §7220 requires disclosure of `(2)(A) human appeal info if relying on §7221(b)(1) exception`. This is a conditional requirement — it applies specifically when the business is relying on the §7221(b)(1) exception. The template presents it as a universal requirement applicable to all businesses, which is incorrect. Businesses NOT relying on the §7221(b)(1) exception may not have a human appeal obligation, but the template implies they do.

**FINDING 3.4 — Effective Date Language: "eff. 1-1-26" for ADMT Regulations Requires Caveat**
The notice states regulations are effective. ADMT regulations under §7220 are described in the research as effective "January 1, 2026 for ADMT requirements" — but the notice has no field or disclosure confirming whether the CPPA has finalized these specific regulations or whether any implementing guidance has been issued. The research doc directs customers to "Verify current CPPA requirements at cppa.ca.gov" — but the generated notice document itself contains no such directive to the compliance officer completing the form.

---

## FILE 4: advance-notice-template.ts
**Path:** `src/lib/pdf-nyc-candidate-notice/advance-notice-template.ts`

### §20-871(b)(1) Coverage — MOSTLY CORRECT, STRUCTURAL CONCERN

**FINDING 4.1 — Section 3 Misattributes Alternative Process Requirement**
Section 3 header states:
> "Instructions for Requesting an Alternative Selection Process (§20-871(b)(1))"

However, the right to an alternative selection process is at **§20-871(b)(2)**, not (b)(1). Section (b)(1) is the advance notice requirement. Section (b)(2) is the alternative selection process right. The template has merged these two separate obligations into a single section and attributed both to (b)(1).

This is a statutory citation error. A compliance officer relying on this template would provide what they believe satisfies §20-871(b)(1) when the alternative process requirement actually derives from a different subsection.

**FINDING 4.2 — No EEO-1 Category Reference in Candidate-Facing Portion**
The fact verification doc confirms the NYC LL144 bias audit requires EEO-1 Component 1 categories (race/ethnicity 7 categories, sex 2 categories per 29 CFR 1602.7). The advance notice template does not reference what the bias audit covered or point candidates to where they can access the published audit results. NYC LL144 requires the published bias audit results summary to be accessible — but the candidate-facing notice contains no link or reference to where candidates can find this publication. A candidate receiving this notice has no way to assess the AEDT's bias audit performance for their demographic group.

**FINDING 4.3 — Internal-Only Section Not Visually Separated from Consumer-Facing Content**
Section 1 states "This section is for internal records only — the consumer-facing notice starts in Section 2." However, the PDF template produces a single document containing both internal configuration data and consumer-facing text. If this document is distributed to candidates as-is (which the template invites by including it), candidates see the company's internal configuration data (AI system name, vendor, role, dates). This is not a legal error, but it is a compliance officer usage trap that will result in improper disclosures.

**FINDING 4.4 — "5 Business Days Before Evaluation" Deadline is Fabricated**
Section 3 includes a suggested method: "Emailing the HR contact below at least 5 business days before your evaluation." And Section 3 also has a field: "Deadline for Submitting Alternative Process Request (e.g., at least 5 business days before evaluation)."

The 5-business-day sub-deadline for alternative process requests does not appear in the statute text. NYC Admin. Code §20-871 sets a 10-business-day advance notice requirement. It does not set a 5-business-day sub-deadline for requesting alternatives. This appears to be an invented compliance sub-requirement. A compliance officer reading this might believe 5 business days is a statutory obligation when it is not — or conversely, deny a request submitted with 4 business days' notice believing they are following the law.

---

## FILE 5: appeal-workflow.ts
**Path:** `src/lib/pdf-va-consumer-rights/appeal-workflow.ts`

### §59.1-577(C) Coverage — STRONG, ONE AMBIGUITY

**FINDING 5.1 — AG Referral Section Correctly Present (Research Spec Met)**
Section 6 correctly implements the AG complaint referral requirement per §59.1-577(C)(3). The checkbox and date field are appropriately structured. The narrative correctly identifies this as a SEPARATE compliance obligation, not just good practice. This is the strongest implementation of the six files reviewed.

**FINDING 5.2 — "60-Day Written Response" Correctly Cited but Response Mechanism Unspecified**
Section 3 correctly cites the 60-day response deadline per §59.1-577(C)(2). However, the form does not specify what format the 60-day written response must take. The statute requires informing the consumer of "any action taken or the reasons for refusal" — the template asks for an outcome checkbox and explanation but has no field for documenting the specific communication method used to inform the consumer. If a company marks the checkbox without actually sending the written response, there is no audit trail of the communication itself.

**FINDING 5.3 — §59.1-577(B) and §59.1-583 Referenced Without Substance**
Section 4 review step 3 states: "Consulted applicable statutory exceptions (§ 59.1-577(B) and § 59.1-583)." These sections are referenced as checklist items but neither is explained in the template. A compliance officer checking this box does not know what exceptions §59.1-577(B) or §59.1-583 actually provide. The form asks them to confirm consultation of unexplained statutory provisions. For a template intended to be operationally useful without an attorney, this is a gap — checking a box about statutory exceptions you have not read is meaningless compliance theater.

**FINDING 5.4 — "Partially Approved" Outcome Has No AG Referral Trigger**
Section 5 and 6 structure implies the AG referral is required only on full denial. But if a request is "partially approved," the portion that was denied may also trigger the AG referral obligation. The template makes no provision for this — a compliance officer selecting "partially approved" sees no AG referral checkbox, but a partial denial may legally require one. The statute's referral trigger is "upon denial of appeal" — a partial approval is also a partial denial.

---

## FILE 6: fria-template.ts
**Path:** `src/lib/pdf-eu-fria/fria-template.ts`

### Article 27(1) Coverage — ALL 6 ELEMENTS PRESENT, SCOPE ERRORS

**FINDING 6.1 — All 6 Article 27(1) Elements Present**
The template correctly implements all 6 required Article 27(1) elements:
- Element 1: Deployer's processes (Art. 27(1)(a)) — present
- Element 2: Period and frequency (Art. 27(1)(b)) — present
- Element 3: Categories of affected persons (Art. 27(1)(c)) — present
- Element 4: Specific risks of harm (Art. 27(1)(d)) — present
- Element 5: Human oversight measures (Art. 27(1)(e)) — present
- Element 6: Risk materialization measures (Art. 27(1)(f)) — present

This matches the verified research. No elements are missing.

**FINDING 6.2 — Element 5 Cross-Reference to Art. 26(2) and Art. 14 Creates Scope Confusion**
Element 5's instruction text says: "Describe the human oversight measures implemented in accordance with Article 26(2) and Article 14."

Art. 14 governs human oversight requirements imposed on the **provider** of a high-risk AI system during the design phase. Art. 26(2) governs the **deployer's** oversight obligations. The FRIA is a deployer obligation under Art. 27. Directing deployers to implement oversight "in accordance with Art. 14" technically asks them to meet a provider obligation — one they may not have visibility into or control over. A compliance officer completing this would need to understand the Art. 14 vs. Art. 26 distinction to answer correctly. The template does not explain this and may cause deployers to either over-claim (asserting they've met Art. 14 when they can't verify it) or under-respond (not understanding what Art. 26(2) requires of them specifically).

**FINDING 6.3 — Element 6 Conflates Two Distinct Article 27(1)(f) Requirements**
Art. 27(1)(f) per the research spec covers: "internal governance procedures and external complaint mechanisms available to affected persons." The template addresses both in Element 6. However, the phrasing "internal governance and complaint mechanisms" in the section header creates the impression that complaint mechanisms are internal. The external complaint pathway (i.e., the market surveillance authority) is referenced in `fria-template.ts`'s kit description as a separate document — but within this FRIA template itself, there is no direction to identify the relevant market surveillance authority or how affected persons can reach them externally. The template's complaint mechanism fields are company-internal only.

**FINDING 6.4 — No Pre-Deployment Completion Confirmation**
Art. 27(1) requires the FRIA to be conducted **before deployment** of the AI system. The template has no field asking the deployer to confirm pre-deployment completion or to document the date the AI system was (or will be) deployed. A FRIA completed after deployment is not compliant with Art. 27(1). Without a date comparison field (FRIA completion date vs. deployment date), this template cannot serve as evidence of pre-deployment compliance.

**FINDING 6.5 — "Deployers" Scope: No Verification That the AI System Is High-Risk**
Art. 27 applies only to deployers of **high-risk** AI systems (Annex III). The template contains no field asking the deployer to document which Annex III category the AI system falls under, or to confirm the system has been classified as high-risk. A compliance officer using this template for a non-high-risk system would be performing unnecessary work — and more concerning, completing it could create implied admissions of high-risk classification in regulatory proceedings. The template should require Annex III category documentation.

---

## PATTERN VIOLATIONS AGAINST PRODUCT-ONBOARDING.MD

### Violation P1 — "Best Practice" Framing for Statutory Obligation (Finding 2.1)
PRODUCT-ONBOARDING.md Rule: "Every factual claim must be supported by the enacted statute."
Violation: `ag-notification-letter.ts` line 139 calls the 90-day AG notification window "best practice" when it is a statutory obligation under § 6-1-1703(7).
Severity: HIGH — actively mischaracterizes a mandatory legal obligation.

### Violation P2 — Incomplete Protected Class Coverage (Finding 1.2)
PRODUCT-ONBOARDING.md Rule: "The decisions array must match these statutory categories, not categories you invent."
Violation: `proxy-analysis-worksheet.ts` omits "sexual orientation" from the correlation analysis protected characteristics, despite it being a protected class under the Illinois Human Rights Act.
Severity: HIGH — creates a compliant-looking analysis that misses a protected class.

### Violation P3 — Known Gap from Research Phase Not Addressed in Implementation (Finding 3.2)
PRODUCT-ONBOARDING.md Rule: "Every error that survives [final verification] becomes a customer-facing error."
Violation: The addon-fact-verification doc explicitly flags §7221(b) exception documentation as unverified and unimplemented. The generator was built anyway without filling this gap or even disclosing it to the compliance officer.
Severity: HIGH — ships known incomplete implementation.

### Violation P4 — Fabricated Sub-Requirement Not in Statute (Finding 4.4)
PRODUCT-ONBOARDING.md Rule: "TRAINING DATA IS NEVER AN ACCEPTABLE SOURCE FOR ANY LEGAL FACT."
Violation: `advance-notice-template.ts` introduces a 5-business-day deadline for alternative process requests that does not appear in NYC Admin. Code §20-871. This is an invented compliance sub-requirement.
Severity: MEDIUM-HIGH — not a wrong citation of a real statute, but an invented obligation that could mislead compliance officers about their legal duties.

### Violation P5 — Citation Error: Wrong Subsection for Alternative Selection Process (Finding 4.1)
PRODUCT-ONBOARDING.md Rule: "All citations in the document body must be enacted statute sections with correct numbers."
Violation: `advance-notice-template.ts` Section 3 attributes the alternative selection process requirement to §20-871(b)(1) when it is at §20-871(b)(2).
Severity: HIGH — statutory citation error in a customer-facing legal document.

### Violation P6 — IDHR Rulemaking Gap Not Disclosed to Compliance Officer (Finding 1.3)
PRODUCT-ONBOARDING.md Rule: "If implementing regulations are pending, say so explicitly."
Violation: `proxy-analysis-worksheet.ts` does not disclose that IDHR has not published implementing rules specifying what proxy analysis must contain. The addon-fact-verification doc explicitly states this disclosure is required.
Severity: HIGH — violates the explicit disclosure requirement from the research phase.

### Violation P7 — Missing FRIA Pre-Deployment Completion Evidence (Finding 6.4)
PRODUCT-ONBOARDING.md Rule: "All generators return documents sufficient to demonstrate compliance."
Violation: `fria-template.ts` contains no pre-deployment timing confirmation field, making it impossible to use the document as evidence of Art. 27(1) compliance (which requires pre-deployment completion).
Severity: MEDIUM — not a citation error but undermines the document's compliance utility.

### Violation P8 — Partially Approved Appeal Has No AG Referral Trigger (Finding 5.4)
PRODUCT-ONBOARDING.md Rule: "Capture ALL tiers... not just the maximum."
Violation: `appeal-workflow.ts` omits the AG referral checkbox for partially approved (i.e., partially denied) appeals. The statute triggers referral on "denial of appeal," which a partial approval satisfies in part.
Severity: MEDIUM — creates a compliance gap for partial denial scenarios.

---

## UNVERIFIED FACTS USED IN GENERATORS

The addon-fact-verification doc identifies the following as NOT fully verified from primary sources. These appear in generators:

1. **Colorado §6-1-1702 developer disclosure elements** — appear in the Developer-Deployer Documentation Exchange Kit. Kit was not sampled here but the research explicitly flags pages 5-9 of the signed act PDF were not read.

2. **California §7221(b) complete opt-out exception list** — `pre-use-notice.ts` references §7221 exceptions without the complete list. Research says pages 115-118 navigation failed.

3. **California complete §7220 Pre-Use Notice elements** — described as "partially captured" in the research. The generator implements what was captured but may be missing elements.

4. **California Article 9 cybersecurity audit areas 1-12** — The Cybersecurity Audit Kit (not sampled here) was built from only items 13-17 of the Article 9 areas. Items 1-12 are completely missing from the research base.

---

## SUMMARY SCORECARD — 6 GENERATORS SAMPLED

| File | Correct Statutory Hook | Citation Errors | Missing Elements | Invented Requirements | IDHR/CPPA Gap Disclosed |
|------|----------------------|-----------------|------------------|-----------------------|------------------------|
| proxy-analysis-worksheet.ts | Yes | No | YES (sexual orientation) | No | NO (critical) |
| ag-notification-letter.ts | Partially | YES (90-day framing) | YES (discovery method) | No | N/A |
| pre-use-notice.ts | Mostly | No | YES (§7221(b) exception) | No | No |
| advance-notice-template.ts | Mostly | YES (§20-871(b)(2) misattributed) | No | YES (5-day sub-deadline) | N/A |
| appeal-workflow.ts | Yes | No | YES (partial denial AG trigger) | No | N/A |
| fria-template.ts | Yes | No | YES (Annex III, pre-deployment date) | No | N/A |

**Zero files are clean. Every file has at least one findable problem.**

---

## TOP PRIORITY FIXES (BEFORE ANY PRODUCT SHIPS)

1. **ag-notification-letter.ts line 139** — Change "per best practice" to "per C.R.S. § 6-1-1703(7)" (statutory obligation, not best practice).

2. **advance-notice-template.ts Section 3 header** — Change §20-871(b)(1) to §20-871(b)(2) for the alternative selection process requirement.

3. **proxy-analysis-worksheet.ts Section 3** — Add "Sexual Orientation" to the protected characteristics correlation analysis list.

4. **proxy-analysis-worksheet.ts** — Add disclosure that IDHR has not published implementing rules specifying proxy analysis methodology (per addon-fact-verification explicit requirement).

5. **pre-use-notice.ts** — Add §7221(b) exception identification field, or prominently flag that exception documentation is unverified and must be completed with legal counsel review.

6. **fria-template.ts** — Add Annex III classification field and pre-deployment timing confirmation field (FRIA completion date vs. deployment date).

7. **appeal-workflow.ts** — Add AG referral trigger for partial approval/partial denial outcomes.

8. **All CA ADMT generators** — Cannot ship the Cybersecurity Audit & Risk Assessment Kit without verifying Article 9 audit areas 1-12. Half the checklist content is missing from the research base.

---

*These findings represent the adversarial review of the legal content and document quality lens only. Cross-reference against Alpha (technical implementation) and Gamma (user experience/completeness) findings before synthesis.*
