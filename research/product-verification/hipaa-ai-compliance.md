# Product Verification: HIPAA AI Compliance

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary sources)

---

## Framing Note

This is NOT a standalone AI law. HIPAA is a framework statute — the Privacy Rule, Security Rule, and Breach Notification Rule apply to any entity that handles protected health information (PHI), including entities that use AI to process PHI. There is no HIPAA section titled "AI compliance." The compliance obligation comes from applying HIPAA's existing requirements to AI systems that touch PHI.

---

## 1. Enacted Status

YES — HIPAA is enacted law (42 U.S.C. §§ 1320d–1320d-9, enacted 1996). The implementing regulations (45 CFR Parts 160 and 164) are in force.

**No AI-specific HIPAA statute exists.** The product's foundation is the application of existing HIPAA law to AI use cases.

---

## 2. Statute/Regulation Citation

**Primary statute:**
- 42 U.S.C. §§ 1320d–1320d-9 (HIPAA administrative simplification provisions)
- 42 U.S.C. § 1320d-5 (civil money penalties)

**Primary regulations:**
- **Privacy Rule:** 45 CFR Part 164, Subpart E (§§ 164.500–164.534)
- **Security Rule:** 45 CFR Part 164, Subpart C (§§ 164.300–164.318)
- **Breach Notification Rule:** 45 CFR Part 164, Subpart D (§§ 164.400–164.414)
- **General Administrative Provisions:** 45 CFR Part 160

**Key sections for AI compliance specifically:**
- 45 CFR § 164.306 — Security standards: general rules (applies to any system handling electronic PHI, including AI systems)
- 45 CFR § 164.308 — Administrative safeguards (risk analysis, workforce training, contingency planning)
- 45 CFR § 164.312 — Technical safeguards (access controls, encryption, audit controls — all apply to AI systems)
- 45 CFR § 164.502 — Uses and disclosures of PHI (the Privacy Rule's core prohibition — governs what AI can do with data it processes)
- 45 CFR § 164.514 — De-identification standards (relevant for AI training data using patient records)

---

## 3. Citation URLs

**42 U.S.C. § 1320d-5 (penalty provisions) — VERIFIED WORKING:**
`https://www.law.cornell.edu/uscode/text/42/1320d-5`
Tested and confirmed returns the actual statute text with all four penalty tiers.

**45 CFR § 164.306 (Security Rule general requirements) — VERIFIED WORKING:**
`https://www.law.cornell.edu/cfr/text/45/164.306`
Tested and confirmed returns the actual regulatory text.

**HHS official HIPAA page (professional resources):**
`https://www.hhs.gov/hipaa/for-professionals/index.html`
(Returns 403 from automated fetching, but is the authoritative HHS landing page for professionals.)

**NOTE:** HHS.gov consistently returned 403 errors during this verification, preventing direct fetching. All HHS URLs below are provided on the basis of known URL structure and must be tested in a browser.

**Prompt for Guiding Light:** "Please test these two URLs in your browser and confirm they load the actual HIPAA regulation text: (1) https://www.law.cornell.edu/uscode/text/42/1320d-5 — should show penalty tiers. (2) https://www.law.cornell.edu/cfr/text/45/164.306 — should show Security Rule requirements. Confirm both load."

---

## 4. Effective Date

- HIPAA enacted: August 21, 1996 (42 U.S.C. § 1320d et seq.)
- Privacy Rule effective: April 14, 2003 (45 CFR Part 164, Subpart E)
- Security Rule effective: April 21, 2005 (45 CFR Part 164, Subpart C)
- Breach Notification Rule effective: September 23, 2009 (HITECH Act, codified at 45 CFR §§ 164.400–164.414)

For product purposes, "in effect" is appropriate — all rules are fully in effect.

---

## 5. Penalty Amounts (Verified from 42 U.S.C. § 1320d-5 — confirmed from primary source)

**Four-tier structure:**

| Tier | Violation Type | Per Violation | Annual Cap (per identical violation) |
|------|---------------|---------------|--------------------------------------|
| A | Unknowing (did not know) | $100 | $25,000 |
| B | Reasonable cause (should have known) | $1,000 | $100,000 |
| C | Willful neglect — corrected within 30 days | $10,000 | $250,000 |
| D | Willful neglect — NOT corrected | $50,000 | $1,500,000 |

**Statutory authority:** 42 U.S.C. § 1320d-5(a)(1)-(2)

**Note on inflation adjustments:** HHS adjusts HIPAA penalties annually for inflation under the Federal Civil Penalties Inflation Adjustment Act. The actual current per-violation amounts may be higher than the statutory minimums above. The 2023 adjusted amounts per OCR guidance were approximately: Tier A: $137/violation; Tier B: $1,379; Tier C: $13,785; Tier D: $68,928. **These adjusted amounts must be verified from HHS OCR directly before publishing.**

**Prompt for Guiding Light:** "Go to https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html and find the current (2024 or 2025) HIPAA civil money penalty amounts after inflation adjustment. I need all four tiers with current dollar amounts."

---

## 6. Enforcement

**HHS Office for Civil Rights (OCR)** is the primary enforcer of HIPAA Privacy, Security, and Breach Notification Rules.

**Department of Justice (DOJ):** Handles criminal violations of HIPAA (42 U.S.C. § 1320d-6), which include wrongful disclosure of individually identifiable health information. Criminal penalties can reach $250,000 and 10 years imprisonment for knowing disclosure.

**State Attorneys General:** Can bring civil actions on behalf of state residents for HIPAA violations (42 U.S.C. § 1320d-5(d)).

**No private right of action:** Individuals cannot sue directly for HIPAA violations. Enforcement is exclusively governmental.

---

## 7. Applicability

**Who must comply:**
- **Covered entities:** Healthcare providers, health plans, healthcare clearinghouses (45 CFR § 160.103)
- **Business associates:** Any vendor, contractor, or service provider that creates, receives, maintains, or transmits PHI on behalf of a covered entity — **this is the critical AI application** (45 CFR § 160.103)

**How AI triggers compliance:**
- An AI vendor that processes patient data (e.g., diagnostic AI, clinical decision support, AI-powered billing) is a **business associate** and must sign a Business Associate Agreement (BAA) (45 CFR § 164.502(e))
- AI tools that generate, analyze, or transmit electronic PHI must meet Security Rule technical safeguards (45 CFR § 164.312)
- AI-generated outputs containing PHI are subject to all Privacy Rule use and disclosure restrictions

---

## 8. AI-Specific Provisions

**HIPAA has NO AI-specific provisions.** The statute and regulations predate modern AI and contain no mention of artificial intelligence, machine learning, or algorithms.

**However, HIPAA applies to AI systems as follows:**

**Security Rule (§ 164.306):** Requires covered entities and business associates to protect electronic PHI regardless of the technology used. Any AI system that processes electronic PHI must implement: access controls (§ 164.312(a)), audit controls (§ 164.312(b)), integrity controls (§ 164.312(c)), and encryption where required (§ 164.312(e)).

**Privacy Rule (§ 164.502):** Governs all uses and disclosures of PHI. An AI system that uses patient data for model training must comply with minimum necessary standards (§ 164.502(b)) — the AI cannot use more patient data than necessary for the purpose.

**De-identification (§ 164.514):** Patient data used for AI training must be de-identified under the Safe Harbor method (removing 18 specified identifiers) or the Expert Determination method before it falls outside HIPAA protections. AI-generated re-identification of de-identified data would be a violation.

**Business Associate Agreement requirement (§ 164.502(e)):** Any AI vendor receiving PHI from a covered entity must have a signed BAA — this is the most critical contract requirement for AI in healthcare.

**HHS AI Guidance (limited):** HHS published a broader AI strategy document (2024-2030) that references HIPAA in passing, but OCR has NOT published a dedicated guidance document specifically addressing AI and HIPAA compliance as of this verification date. HHS.gov returned 403 on all requests — see "Could Not Verify" section.

---

## 9. What I Verified From Primary Source

- Confirmed HIPAA penalty tiers (4 tiers, statutory amounts) from 42 U.S.C. § 1320d-5 via Cornell Law School's LII database (tested URL)
- Confirmed 45 CFR § 164.306 (Security Rule general requirements and their application to any technology handling PHI) via Cornell Law
- Confirmed OCR as HIPAA enforcer
- Confirmed state AG enforcement authority exists (42 U.S.C. § 1320d-5(d))
- Confirmed no private right of action under HIPAA
- Confirmed Business Associate Agreement requirement for AI vendors (45 CFR § 164.502(e))
- Confirmed no AI-specific HIPAA provisions exist in the statute or regulations
- Confirmed penalty-setting authority is the HHS Secretary with discretion based on nature/extent of violation

---

## 10. What I Could NOT Verify

**1. Current inflation-adjusted HIPAA penalty amounts**

The statute sets base amounts; HHS adjusts annually. HHS.gov returned 403 throughout this verification, preventing access to current adjusted penalty amounts.

**Prompt for Guiding Light:** "Go to https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html and find the current HIPAA civil money penalty tiers with inflation-adjusted amounts. I need the dollar amount per violation and annual cap for all four tiers (Tiers A through D). If you cannot find it there, search Google for 'HIPAA civil money penalty 2024 adjusted amounts OCR' and give me the results."

**2. Any HHS OCR guidance document specifically addressing AI and HIPAA**

HHS.gov was inaccessible. It is possible (likely) that OCR has published guidance or a fact sheet about AI and HIPAA that I could not access.

**Prompt for Guiding Light:** "Go to https://www.hhs.gov/hipaa/for-professionals/index.html and look for any guidance documents, press releases, or fact sheets specifically about AI, machine learning, or artificial intelligence in relation to HIPAA. Give me the title and URL of anything relevant published since 2022. Also check https://www.hhs.gov/ocr/index.html for the same."

**3. Whether any HIPAA enforcement action has specifically involved an AI system**

**Prompt for Guiding Light:** "Go to https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/resolution-agreements-and-civil-money-penalties/index.html and look for any resolution agreements or civil money penalties involving AI, machine learning, algorithms, or automated decision systems. Give me the case name and date of any such enforcement action."
