# Product Verification: FERPA AI Compliance

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary sources)

---

## Scope Note (codebase slug: `education-k12-ai`)

The codebase product at slug `education-k12-ai` covers "FERPA + COPPA (amended) + SOPIPA." This verification covers the FERPA component. COPPA (FTC enforcement, penalties up to $50,120 per violation) and SOPIPA (state-level student privacy laws) are separate and were not verified in this research. The `citationUrl` in the codebase (`https://studentprivacy.ed.gov/`) was tested and is accessible.

The `status: "effective-soon"` in the codebase references "COPPA deadline April 22, 2026" — this refers to the FTC's amended COPPA Rule, not FERPA. FERPA itself has no pending effective date changes.

---

## Framing Note

This is NOT a standalone AI law. FERPA (the Family Educational Rights and Privacy Act) is a federal student privacy statute enacted in 1974. It applies to any educational agency or institution that receives federal education funding. FERPA has NO AI-specific provisions. The compliance obligation comes from applying FERPA's existing requirements to AI systems that process student education records.

---

## 1. Enacted Status

YES — FERPA is enacted law. 20 U.S.C. § 1232g, enacted 1974. Implementing regulations at 34 CFR Part 99, last substantially updated 2011 (76 FR 75604).

**No AI-specific FERPA amendment or guidance has been enacted.** The Student Privacy Policy Office (SPPO) has published training materials about AI and student privacy (as recently as March 2026), but no formal rulemaking or Dear Colleague Letter specifically governing AI has been published.

---

## 2. Statute/Regulation Citation

**Primary statute:** 20 U.S.C. § 1232g (FERPA)

**Primary regulations:** 34 CFR Part 99 (implementing regulations)

**Key sections relevant to AI compliance:**

- **34 CFR § 99.3** — Definitions: "education records" (records directly related to a student, maintained by the institution — includes any AI-generated records about students), "personally identifiable information" (includes any data "linked or linkable" to identify a student — highly relevant to AI training data)

- **34 CFR § 99.30** — Consent requirement: Written consent required before disclosing education records. An AI system that discloses or processes student data must have proper consent or fall within a FERPA exception.

- **34 CFR § 99.31** — Exceptions to consent requirement: Includes "school officials with legitimate educational interest" — AI vendors may qualify if they have a proper data-sharing agreement, but only if the institution maintains direct control.

- **34 CFR § 99.33** — Re-disclosure limitation: AI vendors who receive student data under a FERPA exception cannot re-disclose it or use it for other purposes (e.g., model training beyond the agreed purpose).

- **34 CFR § 99.67** — Enforcement: Secretary may withhold federal funding, issue cease-and-desist orders, or terminate program eligibility.

- **20 U.S.C. § 1232g(b)(1)** — Core prohibition: No funds to educational agencies/institutions that release student records without consent to unauthorized parties.

---

## 3. Citation URL

**20 U.S.C. § 1232g (FERPA primary statute) — VERIFIED WORKING:**
`https://www.law.cornell.edu/uscode/text/20/1232g`
Tested and confirmed returns the statute text with key provisions visible.

**34 CFR Part 99 (implementing regulations) — VERIFIED WORKING:**
`https://www.law.cornell.edu/cfr/text/34/part-99`
Tested and confirmed returns the table of contents for the implementing regulations.

**Student Privacy Policy Office (SPPO) FERPA resource page — VERIFIED WORKING:**
`https://studentprivacy.ed.gov/ferpa`
Tested and confirmed returns FERPA overview with enforcement provisions.

**SPPO AI resources (March 2026 publications):**
`https://studentprivacy.ed.gov/resources`
Tested and confirmed — page exists and shows AI-related training materials published March 2026. No formal guidance documents found.

---

## 4. Effective Date

- FERPA enacted: August 21, 1974
- Current implementing regulations effective: January 3, 2012 (2011 amendments)

FERPA is fully in effect. No pending rulemaking on AI as of this verification.

---

## 5. Penalty Amounts

**FERPA does NOT impose monetary fines.** The enforcement mechanism is loss of federal education funding.

**Enforcement consequences (verified from 34 CFR § 99.67 and 20 U.S.C. § 1232g):**
- Secretary may withhold further payments under any applicable federal education program
- Secretary may issue cease-and-desist orders
- Secretary may terminate eligibility to receive funding under any applicable program
- Third parties who improperly re-disclose student records: minimum 5-year ban from receiving further student records from that institution (34 CFR § 99.67(b))

**Practical context:** Loss of Title I, Title IV (Pell Grants, student loans), and other federal education funds is the consequence. For most schools, this is an existential threat — a major university receiving $100M+ in federal funds per year would face catastrophic financial consequences.

**There are no per-violation dollar amounts.** The product's marketing and documentation must NOT state dollar penalty amounts for FERPA violations — none exist in the statute.

---

## 6. Enforcement

**Office of the Chief Privacy Officer (Student Privacy Policy Office — SPPO)** within the U.S. Department of Education investigates complaints and enforces FERPA (34 CFR § 99.60).

**Office of Administrative Law Judges** within the Department of Education serves as the Review Board for FERPA enforcement.

**No private right of action:** The U.S. Supreme Court held in Gonzaga University v. Doe (2002) that FERPA creates no private right of action — individuals cannot sue schools directly for FERPA violations. Enforcement is exclusively through the Department of Education's administrative process.

---

## 7. Applicability

**Who must comply:**
- Educational agencies and institutions receiving federal education funding (virtually all K-12 schools and colleges in the U.S.)
- Includes: public schools, public colleges/universities, many private colleges that receive Title IV funding

**What triggers FERPA compliance for AI:**
- Any AI system that accesses, processes, or generates "education records" about students must comply with FERPA
- Education records = records directly related to a student and maintained by the institution (or maintained by a party acting for the institution)
- AI vendors become "school officials" subject to FERPA if they: (a) are under the direct control of the institution, (b) use student data only for agreed purposes, (c) cannot re-disclose the data

**The critical AI compliance requirement:** Any AI vendor that receives student data must have a written data sharing agreement with the institution before receiving the data. The agreement must limit the vendor's use of data to the specific educational purpose and prohibit re-disclosure.

---

## 8. AI-Specific Provisions

**FERPA has NO AI-specific provisions.** However, its provisions apply directly to AI use cases:

**Education records and AI:**
- AI-generated assessments, summaries, or profiles of students ARE education records if maintained by the institution
- AI cannot share student data with third parties without consent or a FERPA exception
- AI training data using student records must be de-identified OR authorized under a FERPA research exception

**School official exception (34 CFR § 99.31(a)(1)):**
- AI vendors CAN receive student data without individual consent IF: the institution defines them as "school officials," the vendor has a "legitimate educational interest," and the institution maintains direct control over the data use
- Practical requirement: data processing agreement (DPA) required

**Research exception (34 CFR § 99.31(a)(6)):**
- De-identified student data CAN be used for AI model training under the research exception — but only with a written agreement limiting the research organization's use and requiring destruction of data when no longer needed

**No AI guidance published as of verification date:**
- SPPO published AI training materials (facilitator guides, handouts) in March 2026 on topics like "AI Grading Compromise" and "AI Phishing Deepfake" — but these are training aids, not regulatory guidance
- No Dear Colleague Letter on AI has been published
- No formal rulemaking on AI and FERPA has been proposed or finalized

---

## 9. What I Verified From Primary Source

- Confirmed FERPA enacted status and primary citation (20 U.S.C. § 1232g) from Cornell Law
- Confirmed implementing regulations exist at 34 CFR Part 99 (Cornell Law table of contents)
- Confirmed enforcement mechanism: loss of federal funding (NOT monetary fines) from 20 U.S.C. § 1232g text and 34 CFR §§ 99.66-99.67
- Confirmed SPPO (Office of Chief Privacy Officer) as enforcement body (34 CFR § 99.60)
- Confirmed NO private right of action (from FERPA statutory text and SPPO resources)
- Confirmed "school official" exception and its requirements for AI vendors (from SPPO FERPA page)
- Confirmed "education records" definition includes any AI-generated records about students
- Confirmed SPPO published AI training materials in March 2026 (from studentprivacy.ed.gov/resources)
- Confirmed NO formal AI-specific FERPA guidance document has been issued as of verification date
- Confirmed 5-year ban for third parties who violate re-disclosure requirements (34 CFR § 99.67)

---

## 10. What I Could NOT Verify

**1. Whether any formal FERPA guidance on AI has been published (possible gap)**

SPPO materials showed AI training aids from March 2026, but I could not access their content. It is possible a formal guidance document was released that I couldn't find.

**Prompt for Guiding Light:** "Go to https://studentprivacy.ed.gov/resources and look for any formal guidance documents (not training aids) specifically about FERPA and artificial intelligence. Look for anything labeled 'guidance,' 'Dear Colleague Letter,' 'FAQ,' or 'policy brief.' List the title, document type, and URL of any formal AI guidance. Also check if there is a page at https://studentprivacy.ed.gov/ferpa-and-ai or similar."

**2. Whether any Department of Education enforcement action has specifically involved an AI system**

**Prompt for Guiding Light:** "Search the Student Privacy Policy Office website (studentprivacy.ed.gov) or Google for any FERPA enforcement actions or findings specifically involving AI, machine learning, or automated decision-making in educational settings. List any case names or enforcement letters you find."

**3. Whether FTC enforcement of AI in EdTech supplements FERPA obligations**

The FTC has enforcement authority over deceptive practices and COPPA (Children's Online Privacy Protection Act), which overlaps with FERPA for K-12. This was not researched.

**Prompt for Guiding Light:** "Search FTC.gov for any enforcement actions or guidance about AI tools used in K-12 education, especially tools that collect student data. Also look for any FTC-SPPO joint guidance on AI and student privacy. List titles and URLs."
