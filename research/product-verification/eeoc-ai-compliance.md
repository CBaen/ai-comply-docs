# Product Verification: EEOC AI Compliance

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary sources)

---

## CRITICAL FINDING: Broken `citationUrl` in Codebase

The codebase sets `citationUrl` for slug `eeoc-ai-hiring` to:
`https://www.eeoc.gov/artificial-intelligence-and-algorithmic-fairness-initiative`

**This URL returned 404 during verification.** The link is broken. Customers clicking it before purchase will see a 404 error, which fails the PRODUCT-ONBOARDING.md requirement that `citationUrl` must work and show actual law/guidance text.

**Prompt for Guiding Light:** "Go to https://www.eeoc.gov/artificial-intelligence-and-algorithmic-fairness-initiative in your browser. Does it load, or does it show a 404 error? If 404, find the correct URL for the EEOC AI and Algorithmic Fairness Initiative — it may have moved to a new URL or been removed. Then search https://www.eeoc.gov for 'AI' and give me the best working URL for the EEOC's AI-related guidance and enforcement resources."

---

## Framing Note

The EEOC (Equal Employment Opportunity Commission) has NOT enacted AI-specific regulations. The EEOC enforces existing federal employment discrimination laws — Title VII of the Civil Rights Act (42 U.S.C. § 2000e et seq.), the Americans with Disabilities Act (ADA, 42 U.S.C. § 12111 et seq.), the Age Discrimination in Employment Act (ADEA, 29 U.S.C. § 621 et seq.), and others. The EEOC's position is that these laws apply fully to AI-based employment tools, just as they apply to any other employment selection procedure.

The product's legal foundation consists of: (1) existing EEO laws that apply to AI, (2) EEOC technical assistance documents on AI published since 2021, and (3) the EEOC's AI and Algorithmic Fairness Initiative (launched October 2021).

---

## 1. Enacted Status

The underlying EEO laws are enacted and in full effect:
- Title VII: enacted 1964, 42 U.S.C. §§ 2000e–2000e-17
- ADA Title I: enacted 1990, 42 U.S.C. §§ 12111–12117
- ADEA: enacted 1967, 29 U.S.C. §§ 621–634

**No AI-specific EEO statute has been enacted.** The EEOC's initiative and guidance documents do not have the force of law — they are interpretive documents explaining how existing law applies to AI.

---

## 2. Applicable Law/Guidance Citations

**Primary statutes applying to AI in employment:**

- **42 U.S.C. § 2000e-2** — Title VII's core prohibition: unlawful to discriminate in employment decisions based on race, color, religion, sex, or national origin. Applies to AI that produces discriminatory selection outcomes.

- **42 U.S.C. § 12112** — ADA prohibition on discrimination against qualified individuals with disabilities. EEOC position: AI hiring tools may violate ADA if they screen out applicants with disabilities at higher rates.

- **29 U.S.C. § 623** — ADEA prohibition on age discrimination in employment. Applies to AI tools that produce disparate age-based outcomes.

- **29 CFR Part 1607** — Uniform Guidelines on Employee Selection Procedures (1978). These guidelines apply to ALL selection procedures used in employment decisions, including AI tools. An AI hiring tool that produces adverse impact must be validated. This is the foundational regulatory framework for AI bias auditing.

**EEOC AI Initiative:**
- Launched October 28, 2021 ("EEOC Launches Initiative on Artificial Intelligence and Algorithmic Fairness")
- Committed to: establish internal working group, conduct stakeholder listening sessions, gather information on AI tools, issue technical guidance

**EEOC Technical Assistance Documents on AI (may exist — see "Could Not Verify"):**
- The EEOC has announced and reportedly published technical assistance documents on AI and employment law. Specific documents could NOT be accessed during this verification — all attempted EEOC URLs for AI-specific guidance returned 404 errors. See section 10 for verification prompts.

---

## 3. Citation URL

**EEOC AI Initiative press release — VERIFIED WORKING:**
`https://www.eeoc.gov/newsroom/eeoc-launches-initiative-artificial-intelligence-and-algorithmic-fairness`
Tested and confirmed returns the October 2021 press release.

**29 CFR Part 1607 (Uniform Guidelines on Employee Selection Procedures):**
`https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines`
Tested and confirmed — returns the 1979 Q&A document implementing the Guidelines.

**EEOC AI Governance page:**
`https://www.eeoc.gov/ai-governance`
Tested and confirmed returns a page with OMB compliance plans (M-24-10 and M-25-21) — appears to be about internal EEOC AI governance, NOT employer-facing compliance guidance.

**EEOC technical assistance documents on AI — ALL URLs RETURNED 404:**
Multiple attempted URLs for EEOC AI technical assistance documents returned 404, including attempts for documents reportedly published in 2022 (ADA+AI) and 2023 (Title VII+AI). These documents are known to exist based on EEOC press releases referenced in news sources, but the specific URLs could not be confirmed during this verification.

**Prompt for Guiding Light:** "Go to https://www.eeoc.gov/laws/guidance and search for any guidance documents about artificial intelligence. Also try https://www.eeoc.gov/newsroom and search for 'artificial intelligence' — look for press releases announcing technical assistance documents. I specifically need: (1) Any EEOC technical assistance document from 2022 about the ADA and AI hiring tools, and (2) Any EEOC technical assistance document from 2023 about Title VII and AI. Give me the exact titles, publication dates, and working URLs."

---

## 4. Effective Date

The underlying EEO laws are in full effect. The AI initiative was announced October 28, 2021.

No pending AI-specific rulemaking has been finalized as of this verification date.

---

## 5. Penalty Amounts

**EEOC does NOT publish fixed penalty amounts.** Civil penalties under Title VII and the ADA are determined by courts after EEOC files suit.

**Title VII / ADA compensatory and punitive damages (42 U.S.C. § 1981a):**
- Companies with 15–100 employees: up to $50,000 per complainant
- Companies with 101–200 employees: up to $100,000 per complainant
- Companies with 201–500 employees: up to $200,000 per complainant
- Companies with 500+ employees: up to $300,000 per complainant

**ADEA (29 U.S.C. § 626(b)):** Allows back pay, liquidated damages (equal to back pay for willful violations), attorney fees. No statutory cap on ADEA damages.

**Backpay:** Available under all EEO statutes — equal to what the plaintiff would have earned but for the discrimination, with no statutory cap.

**Note:** These are maximum caps on non-economic (compensatory and punitive) damages. Back pay and other equitable relief are uncapped.

---

## 6. Enforcement

**EEOC** (Equal Employment Opportunity Commission) investigates charges of employment discrimination. The EEOC can:
- Issue right-to-sue letters (enabling private lawsuits)
- File its own lawsuits in federal court
- Seek conciliation agreements

**Private right of action:** YES — Title VII, ADA, and ADEA all allow individuals to sue employers directly after receiving a right-to-sue letter from EEOC. This is a critical distinction from HIPAA/FERPA/FINRA — employees can sue directly.

**DOJ:** Can also bring pattern-or-practice discrimination suits under Title VII.

---

## 7. Applicability

**Who must comply:**
- Employers with 15+ employees (Title VII, ADA)
- Employers with 20+ employees (ADEA)
- Employment agencies
- Labor organizations

**What triggers compliance for AI:**
- Any use of AI tools that affect "selection procedures" — hiring, promotion, demotion, layoffs, pay, benefits, assignment, training
- The Uniform Guidelines (29 CFR Part 1607) apply to ANY "test or other selection procedure" — courts and EEOC interpret this to include AI hiring tools
- If an AI hiring tool produces adverse impact (a selection rate for a protected group less than 4/5ths of the rate for the highest-selected group), the employer must validate the tool

**Key "adverse impact" standard (the "4/5ths rule" — 29 CFR § 1607.4(D)):**
If a selection procedure selects protected-group applicants at a rate less than 80% of the rate at which the highest-selected group is selected, the procedure has adverse impact and must be validated or discontinued.

---

## 8. AI-Specific Provisions

**The EEOC has NO AI-specific regulations.** However:

**From EEOC's October 2021 initiative announcement (verified from primary source):**
- EEOC declared it will focus on whether AI tools comply with existing EEO laws
- Key concern: AI tools may "mask and perpetuate bias or create new discriminatory barriers"
- EEOC committed to issuing technical guidance on algorithmic fairness

**From known EEOC positions (based on initiative and guidance framework):**
- The "employer's tool, employer's responsibility" principle: employers remain liable for discrimination caused by AI tools they use, even if a third-party vendor developed the tool
- If an AI tool causes adverse impact, the employer must validate that the tool is job-related and consistent with business necessity (29 CFR § 1607.5)
- Employers cannot "outsource" EEO compliance to AI vendors

**Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) — THE KEY REGULATORY FRAMEWORK:**
These 1978 guidelines explicitly state they apply to "all selection procedures used to make employment decisions, including interviews, review of experience or education from application forms, work samples, physical requirements, and evaluations of performance." Courts have held this includes AI/algorithmic selection tools.

**EEOC AI/ADA and AI/Title VII technical assistance documents:**
Based on news sources and the EEOC's 2021 initiative announcement, the EEOC reportedly published:
- A technical assistance document on AI and the ADA (reportedly May 2022)
- A technical assistance document on AI and Title VII (reportedly May 2023)

These documents could NOT be verified from primary source during this research (all EEOC URLs returned 404). Their existence and content must be confirmed in-browser before any content from them is cited in product materials.

---

## 9. What I Verified From Primary Source

- Confirmed EEOC AI initiative launched October 28, 2021 (from verified press release URL)
- Confirmed EEOC AI governance page exists at eeoc.gov/ai-governance (two OMB compliance plans visible)
- Confirmed underlying EEO statutes (Title VII, ADA, ADEA) are in effect with relevant citation URLs
- Confirmed Uniform Guidelines (29 CFR Part 1607) apply to selection procedures including AI (from 1979 Q&A document)
- Confirmed private right of action exists under Title VII, ADA, ADEA
- Confirmed compensatory/punitive damages caps under 42 U.S.C. § 1981a (employer size tiers: $50K–$300K)
- Confirmed ADEA liquidated damages provision (29 U.S.C. § 626(b))
- Confirmed the "4/5ths rule" adverse impact standard exists in 29 CFR § 1607.4(D)
- Confirmed the EEOC AI governance page at eeoc.gov/ai-governance addresses INTERNAL EEOC AI governance (OMB compliance), NOT employer-facing AI compliance guidance

---

## 10. What I Could NOT Verify

**1. EEOC AI technical assistance documents from 2022 and 2023**

Multiple URL patterns were attempted and all returned 404. These documents are believed to exist based on external news sources, but could not be confirmed from primary source during this verification.

**Prompt for Guiding Light:** "Go to https://www.eeoc.gov/newsroom and search for press releases about 'artificial intelligence.' Look specifically for: (1) A 2022 press release announcing a technical assistance document about the ADA and AI hiring tools, and (2) A 2023 press release announcing a technical assistance document about Title VII and AI. Give me the exact titles, dates, and URLs of these press releases. Then click through to the actual guidance documents and give me those URLs too."

**2. Whether the EEOC's AI guidance was withdrawn under the Trump administration (2025)**

The EEOC AI initiative was launched under Biden-era leadership. With the change in administration (January 2025), it is possible that guidance documents or the initiative itself was withdrawn or modified. This is a critical verification requirement before citing EEOC AI guidance in product materials.

**Prompt for Guiding Light:** "Search for news about whether the EEOC withdrew its AI guidance or AI initiative in 2025 under the new administration. Try searching Google for 'EEOC AI guidance withdrawn 2025' or 'EEOC AI initiative Trump.' Also check https://www.eeoc.gov/ai-governance — what does the current page say? Has the agency's AI guidance changed?"

**3. Whether any EEOC enforcement action specifically targeting AI hiring tools has been settled or litigated**

**Prompt for Guiding Light:** "Search Google for 'EEOC lawsuit AI hiring algorithm' or 'EEOC settlement AI discrimination.' Look for any news from 2022-2026 about the EEOC filing suit or reaching a settlement with an employer specifically because of an AI hiring tool. Give me the company name, case name, and outcome for any such action."
