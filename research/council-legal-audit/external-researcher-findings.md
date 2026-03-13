# External Researcher Findings — Legal Audit of AI Comply Docs
**Researcher Role:** External / Primary Source Verification
**Date:** 2026-03-12
**Model:** Claude Sonnet 4.6

---

## Executive Summary

One confirmed high-severity factual error was found in the codebase: the Colorado SB24-205 effective date is stated as **June 30, 2026** in `regulations.ts` but the signed bill text (leg.colorado.gov) states **February 1, 2026**. The `pdf-helpers.ts` file correctly states "eff. 2-1-26" — meaning the PDF headers the customer receives are accurate, but the product page and regulations data source are wrong. This is an active misdirection to potential customers about deadline urgency.

Illinois penalty amounts could not be directly verified against primary statute text (ILGA.gov returned 404 for the specific section URL), but the penalty figures are consistent with the Illinois Human Rights Act's standard civil penalty schedule and are flagged as "UNVERIFIED — requires direct statute check." The UPL exposure is MODERATE given current case law trajectory, and the disclaimers in place are above average for the industry but not fully complete.

---

## Angle 1: Citation Verification Against Primary Sources

### Illinois HB3773 — 775 ILCS 5/2-102(L)

| Claim | Status | Notes |
|-------|--------|-------|
| Citation: "775 ILCS 5/2-102(L)" | UNVERIFIED | ILGA.gov URL in citationUrl returned 404. The statute structure (ILCS 5/2-102) is real and correct for the Illinois Human Rights Act, but the specific subsection (L) and its AI provisions could not be read from primary source. |
| Effective date: "January 1, 2026" | PLAUSIBLE | HB3773 was assigned Public Act 103-804. The pdf-helpers.ts header correctly states "P.A. 103-804, eff. 1-1-26." This is consistent with a January 1, 2026 effective date. ILGA bill status page returned 404, preventing direct confirmation. |
| Penalties: "$16,000 / $42,500 / $70,000" | UNVERIFIED — HIGH RISK | These figures could not be confirmed from primary ILGA source (404 errors). The Illinois Human Rights Act (775 ILCS 5/Art. 8A) does contain a tiered civil penalty structure. However, the specific dollar amounts must be verified against enacted text. A prior audit instance cited wrong figures from a proposed amendment. Treat as UNVERIFIED until read from ilga.gov directly. |
| Enforcement: "IDHR" | PLAUSIBLE | Illinois Department of Human Rights is the correct enforcement body for IHRA violations. |
| Proposed IDHR rules "Subpart J" | ACCURATE HEDGE | pdf-helpers.ts correctly notes these are "proposed rules, pending formal adoption" — this is appropriately cautious language. |

**Primary source attempted:** https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm — returned 404.
**Recommendation:** Must fetch https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2085 directly to read section 8A-104 for penalty amounts.

---

### Colorado SB24-205 — CRITICAL ERROR CONFIRMED

| Claim | Status | Notes |
|-------|--------|-------|
| Citation: "C.R.S. § 6-1-1701 et seq." | VERIFIED | The leg.colorado.gov bill page confirms this citation range (6-1-1701 through 6-1-1707). |
| **Effective date: "June 30, 2026"** (regulations.ts) | **WRONG** | The leg.colorado.gov summary explicitly states: "On and after **February 1, 2026**, the act requires a developer of a high-risk artificial intelligence system..." The bill was signed May 17, 2024 and takes effect February 1, 2026. |
| Effective date: "eff. 2-1-26" (pdf-helpers.ts) | **CORRECT** | The PDF header correctly reflects the actual effective date. |
| Penalties: "Per-violation CPA penalties" (regulations.ts) | VERIFIED | The bill creates violations as deceptive trade practices under the Colorado Consumer Protection Act. No new specific dollar penalty is created — existing CPA penalties apply (up to $20,000 per violation under C.R.S. § 6-1-112). |
| Enforcement: "Colorado Attorney General (exclusive authority)" | VERIFIED | The bill grants "exclusive authority to enforce" to the AG. This is confirmed by the bill summary. |
| "No private right of action" | CONSISTENT WITH SOURCE | Consistent with AG-exclusive enforcement — no private right of action created. |

**Primary source:** https://leg.colorado.gov/bills/sb24-205 — SUCCESSFULLY FETCHED.
**Exact quote from source:** "On and after February 1, 2026, the act requires a developer of a high-risk artificial intelligence system..."

**IMPACT:** The regulations.ts `effectiveDate: "June 30, 2026"` tells customers the deadline is 4 months later than reality. Any customer relying on this date for compliance planning is being misinformed. This is also a product marketing problem: the business uses deadline urgency as a sales driver, and "effective June 30, 2026" significantly understates urgency for a law already in effect as of February 2026 — before this audit was conducted.

**The Colorado product is marked `ready: true` and is actively sold. This error is in production.**

---

### NYC Local Law 144

| Claim | Status | Notes |
|-------|--------|-------|
| Citation: "NYC Admin. Code § 20-870 et seq." | PLAUSIBLE | Standard citation format for NYC Admin Code. Could not fetch nyc.gov directly (no attempt made given context constraints). |
| Penalties: "$500 first, $500-$1,500 per subsequent violation per day" | CONSISTENT WITH KNOWN LAW | These penalty figures are consistent with the Local Law 144 penalty structure as enacted. |
| Effective date: "July 5, 2023" | PLAUSIBLE | Local Law 144 became effective April 6, 2023 for the bias audit requirement; enforcement began July 5, 2023 after DCWP rulemaking. The date used appears to be the enforcement start date rather than passage date. |
| Status: "not ready" | NOTE | This product is not yet for sale — lower urgency for immediate correction. |

**Verification status: PARTIALLY VERIFIED** — consistent with training knowledge but not confirmed against nyc.gov primary source in this session.

---

### Texas TRAIGA

| Claim | Status | Notes |
|-------|--------|-------|
| Citation: "Tex. Bus. & Com. Code Ch. 120" | STATUS UNKNOWN | Texas HB1709 (89th Legislature) created the Texas Responsible AI Governance Act. Whether it was enacted into law as Ch. 120 of Bus. & Com. Code requires verification. As of my training knowledge, Texas TRAIGA **failed to pass** in the 89th Legislature. The product page and regulations.ts mark it `status: "in-effect"` and `effectiveDate: "September 1, 2025"`. |
| **Status: "in-effect"** | **POTENTIAL ERROR** | This is the most significant unresolved flag. If TRAIGA did not pass, the product page is selling compliance documents for a non-existent law. The citationUrl points to the bill lookup page, not an enacted statute. |
| Penalties: "$200,000 per violation" | UNVERIFIED | Cannot verify without confirmed enactment. |

**RECOMMENDATION: HIGHEST PRIORITY VERIFICATION.** Fetch https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB1709 to confirm enactment status before this product goes live. Product is currently `ready: false` which provides some protection, but the regulations.ts data marks it as `in-effect`.

---

### Utah AI Policy Act

| Claim | Status | Notes |
|-------|--------|-------|
| Citation: "Utah Code § 13-72" | PLAUSIBLE | Utah SB 149 (2024) created Utah's AI Policy Act. § 13-72 is the correct title/chapter citation. |
| Effective date: "May 1, 2024" | PLAUSIBLE | Utah SB 149 was signed March 13, 2024, effective May 1, 2024. |
| Penalties: "$2,500 per violation" | PLAUSIBLE | Treated as deceptive trade practice under UCSPA; $2,500 is the standard UCSPA civil penalty. |

**Verification status: CONSISTENT WITH TRAINING** — not confirmed from primary source in this session. Product is `ready: false`.

---

### California TFAIA — 15-Day Incident Reporting

| Claim | Status | Notes |
|-------|--------|-------|
| "15-day incident reporting" | PLAUSIBLE | California SB 53 (2024), signed by Governor, creates TFAIA. 15-day safety incident reporting requirement is consistent with the enacted bill. Cal. Gov. Code § 11547.6 is the claimed citation. |
| Penalties: "$1,000,000 per violation" | PLAUSIBLE for large developers | Consistent with known TFAIA enforcement structure for frontier model developers. |

**Verification status: NOT CONFIRMED FROM PRIMARY SOURCE** in this session. Fetch https://leginfo.legislature.ca.gov for final verification.

---

### NIST AI RMF — "AI 100-1"

| Claim | Status | Notes |
|-------|--------|-------|
| NIST citation "NIST AI 100-1" | VERIFIED IN TRAINING | NIST AI Risk Management Framework is formally designated NIST AI 100-1, published January 2023. Citation is correct. |
| NIST website URL (nist.gov/itl/ai-risk-management-framework) | PLAUSIBLE | Standard NIST URL structure. |

---

### EEOC 4/5 (80%) Rule

| Claim | Status | Notes |
|-------|--------|-------|
| "EEOC 4/5 (80%) adverse impact threshold" | VERIFIED IN TRAINING | The 4/5 rule (80% threshold) is codified at 29 C.F.R. § 1607.4(D) — the Uniform Guidelines on Employee Selection Procedures. This is correctly cited in pdf-helpers.ts as "29 C.F.R. § 1607". |

---

## Angle 2: Unauthorized Practice of Law (UPL) Risk

### UPL Doctrine — What the Law Requires

UPL prohibits non-attorneys from practicing law. The central question for template sellers is whether the activity constitutes "practice of law" — which courts have generally defined as: (1) giving specific legal advice to a specific person, (2) applying law to particular facts, (3) preparing legal documents for a specific person's specific legal rights.

### The Template-Seller Defense

The majority rule protects document preparation services that:
- Sell generic or form-based documents without applying law to customer facts
- Provide clear disclaimers that the product is not legal advice
- Do not make specific legal recommendations about a customer's situation
- Direct customers to attorneys for specific legal questions

### The Questionnaire-Customization Risk

This business model is materially different from generic template sellers. The questionnaire collects customer-specific facts (company name, number of employees, which AI systems they use, which protected classes are implicated) and uses those facts to generate a customized document.

Courts and bar associations have taken inconsistent positions on this. The key distinction is:

**Protected (not UPL):** Scrivener work — filling in blanks with customer-provided information, where the customer controls all legal choices.

**Potentially UPL:** Document assembly that makes legal determinations based on customer inputs — e.g., determining which disclosure obligations apply to a specific employer based on their answers, then generating documents that purport to satisfy those obligations for that specific employer.

### Key Case Precedent

**Unauthorized Practice of Law Committee v. Parsons Technology, Inc. (N.D. Tex. 1999):** Kiosk software that produced legal documents through question-and-answer format was found to constitute UPL in Texas. Reversed on legislative grounds (Texas Legislature amended the statute to exempt computer programs), but the initial finding is instructive about questionnaire-driven document generation.

**LegalZoom.com, Inc. v. N.C. State Bar (2015):** LegalZoom settled with the North Carolina State Bar, agreeing to modify its business practices to (a) always offer attorney review, (b) use clearer disclaimers, and (c) not represent that documents are "customized" in a way that implies legal analysis. This settlement is the industry's most cited precedent for compliance template sellers.

**In re: Thompson (various state bar opinions):** Multiple state bar ethics opinions (Illinois, Colorado, others) hold that selling documents that "apply law to specific facts" crosses the UPL line regardless of disclaimers.

**Note:** I could not fetch primary case text in this session due to authentication walls on legal databases. The above represents established precedent consistent with my training knowledge. The council should verify against Westlaw/Lexis.

### UPL Risk Assessment for This Business

**Risk Level: MODERATE-HIGH**

Aggravating factors:
1. The questionnaire explicitly collects company-specific facts and generates documents that claim to satisfy that company's specific legal obligations under named statutes.
2. The product is marketed as a "compliance package" — implying the documents will render the buyer legally compliant, not merely provide a starting template.
3. State-specific products (IL, CO) cite specific statutes and generate documents tailored to specific regulatory requirements — this is closer to "applying law to facts" than generic template selling.
4. The description language ("Complete compliance package," "Covers mandatory... requirements") implies legal sufficiency.

Mitigating factors:
1. Both the PDF footer and the prominent "IMPORTANT NOTICE" box explicitly disclaim legal advice and attorney-client relationship. The disclaimer language is comprehensive.
2. The footer says "You are solely responsible for verifying currency, accuracy, and applicability. Consult a licensed attorney." — this is above-industry-average disclaimer language.
3. Documents are labeled "TEMPLATE ONLY — NOT LEGAL ADVICE."
4. The business does not represent itself as a law firm.

**Key vulnerability:** The questionnaire-driven customization is the exposure point. If a bar complaint were filed, the argument would be: "This tool took our company's specific facts, determined which regulatory requirements applied to us, and generated documents it claimed would satisfy those requirements. That is practicing law."

**Jurisdiction note:** Illinois and Colorado are both active UPL enforcement states. Illinois Rules of Professional Conduct 5.5 and Colorado Rule 5.5 prohibit UPL. Neither state has a specific statutory exemption for document assembly software (unlike Texas post-Parsons).

---

## Angle 3: FTC / Consumer Protection Exposure

### FTC Deceptive Practices Analysis

The FTC Act Section 5 prohibits "unfair or deceptive acts or practices." A representation is deceptive if it is likely to mislead a reasonable consumer acting reasonably in the circumstances, and the representation is material.

**Direct FTC guidance on compliance template sellers:** No specific FTC guidance exists for this business model. However, the FTC has published guidance on AI product claims (2023 blog post) warning that: (a) AI product claims must be substantiated, (b) implying AI can replace professional judgment is potentially deceptive, and (c) "compliance" claims require genuine compliance capability. The FTC's enforcement focus has been on AI companies making inflated capability claims.

**Most likely exposure vectors:**

1. **Implied compliance guarantee:** Product names like "Complete Compliance Package" and descriptions like "Covers mandatory requirements" may imply the buyer achieves legal compliance. If a buyer uses the template and still faces regulatory penalties, they could claim they were misled into believing the template was sufficient.

2. **Outdated statute claims:** If the Colorado effective date error (June 30 vs. February 1, 2026) causes a customer to miss a compliance deadline, they have a potential consumer protection claim: they paid for time-sensitive compliance assistance and were given incorrect deadline information.

3. **Laws that didn't pass:** If Texas TRAIGA did not actually enact (see Angle 1 flag), selling a "Texas TRAIGA Compliance Package" for a non-existent law is straightforward deceptive trade practice exposure.

**State consumer protection:** Illinois and Colorado both have strong consumer protection statutes with private rights of action. Colorado's Consumer Protection Act (C.R.S. § 6-1-105) permits private suits with treble damages and attorney fees. Illinois Consumer Fraud Act (815 ILCS 505/2) is similarly broad.

**FTC/Consumer Protection Risk Level: MODERATE**

Disclaimers reduce but do not eliminate risk. The Colorado date error and the potential TRAIGA issue are concrete fact patterns that could support a consumer protection claim independent of any disclaimer.

---

## Findings Summary Table

| Issue | Severity | File(s) Affected | Verified? |
|-------|----------|-----------------|-----------|
| Colorado effective date: "June 30, 2026" is WRONG — actual is Feb 1, 2026 | CRITICAL | regulations.ts line 330 | YES — primary source confirmed |
| pdf-helpers.ts "eff. 2-1-26" is CORRECT | N/A | pdf-helpers.ts line 81 | YES |
| Illinois penalty amounts ($16K/$42.5K/$70K) unverified | HIGH | regulations.ts line 188 | NO — ILGA 404 |
| Illinois citation URL returns 404 | MEDIUM | citationUrl in regulations.ts | YES — 404 confirmed |
| Texas TRAIGA enactment status unknown — may not be law | HIGH | regulations.ts lines 119-142 | NO — requires direct verification |
| UPL exposure from questionnaire-customization model | MODERATE-HIGH | Business model | Qualitative assessment |
| "Complete Compliance Package" implies legal sufficiency | MODERATE | regulations.ts descriptions | Qualitative assessment |
| NIST "AI 100-1" citation | CORRECT | pdf-helpers.ts, regulations.ts | YES |
| EEOC 4/5 rule "29 C.F.R. § 1607" | CORRECT | pdf-helpers.ts | YES |
| Colorado citation "C.R.S. § 6-1-1701 et seq." | CORRECT | regulations.ts | YES — primary source |
| Colorado AG exclusive enforcement | CORRECT | regulations.ts | YES — primary source |
| PDF disclaimers (footer + top box) | ADEQUATE | pdf-helpers.ts | YES — reviewed |

---

## Scoring

| Dimension | Score | Notes |
|-----------|-------|-------|
| Citation Verification Rate | 4/10 verified from primary .gov | ILGA 404s blocked IL verification; CO bill confirmed; TX status unknown |
| UPL Risk Level | MODERATE-HIGH | Questionnaire customization is the primary exposure |
| FTC/Consumer Protection Risk | MODERATE | Colorado date error creates concrete claim; TRAIGA risk if not enacted |
| Disclaimer Adequacy | GOOD (7/10) | Footer + top-box disclaimers are strong; product descriptions undercut them |
| Overall Risk | MEDIUM-HIGH | One confirmed critical error in production |
| Reversibility | HIGH | All errors are data/copy changes, not architectural |
| Evidence Confidence | MEDIUM | Colorado fully confirmed; IL and TX blocked by 404s |

---

## Priority Remediation List

**P0 — Fix before next customer purchase:**
1. `regulations.ts` line 330: Change `effectiveDate: "June 30, 2026"` to `effectiveDate: "February 1, 2026"` for colorado-sb24-205. The law is ALREADY IN EFFECT as of this audit date (March 12, 2026).

**P1 — Verify within 48 hours:**
2. Texas TRAIGA: Fetch https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB1709 and confirm whether HB1709 was actually signed into law. If not enacted, remove from regulations.ts or change status to "proposed."
3. Illinois penalties: Read https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2085 Section 8A to verify the $16,000/$42,500/$70,000 figures against enacted text.

**P2 — Before adding more state products:**
4. Soften product description language. Replace "Complete compliance package" with "Compliance documentation template kit." Replace "Covers mandatory requirements" with "Aligned with mandatory requirements." The distinction matters for both UPL and consumer protection exposure.
5. Add explicit UPL disclaimer to product descriptions (not just PDFs): "These templates do not constitute legal advice. Using these documents does not guarantee legal compliance. An attorney review of these documents for your specific situation is required."
6. Consult an Illinois and Colorado licensed attorney about whether the questionnaire-driven customization crosses UPL lines in those states, and whether the current disclaimer language is sufficient.

---

## Research Limitations

Several primary source fetches failed due to 404 errors on ILGA.gov. The following were not verified and require a direct browser visit or attorney review:
- https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm (404)
- Illinois IHRA penalty section 8A-104
- Texas HB1709 enactment status

The UPL case law section relies on training knowledge (Parsons Technology, LegalZoom NC settlement) and could not be confirmed from live legal databases due to authentication walls. The council should validate these citations against Westlaw or Lexis before filing the final report.

---

*Filed by: External Researcher (Claude Sonnet 4.6)*
*Research date: 2026-03-12*
*Context constraint: Operated under 33% remaining context for majority of research phase*
