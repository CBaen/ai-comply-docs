# Product Verification: NYC Local Law 144 (Automated Employment Decision Tools)

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary sources)

---

## 1. Enacted Status

YES — enacted. Local Law 144 of 2021 was passed by the NYC City Council and signed into law. The law amended the NYC Administrative Code. DCWP began enforcement on July 5, 2023 (effective date of DCWP implementing rules).

---

## 2. Statute/Regulation Citation

**NYC Admin. Code §§ 20-870 through 20-873**

The citation "NYC Admin. Code § 20-870 et seq." in the codebase is correct.

Additionally: **DCWP Implementing Rules, Title 6 RCNY § 5-301 et seq.** (effective July 5, 2023)

---

## 3. Citation URL

**Primary source:** The Legistar page for Local Law 144 of 2021:
`https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6596032FA3F9`

This URL was tested and returns the legislation detail page with bill text accessible.

**DCWP implementing rules:** `https://rules.cityofnewyork.us/rule/automated-employment-decision-tools-updated/`

**DCWP agency overview page:** `https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page`

**CRITICAL NOTE:** The current codebase `citationUrl` points to the DCWP agency overview page — not the actual Admin Code text. The PRODUCT-ONBOARDING.md requires the URL to take customers to the actual statute text. The Legistar link above is the closest available primary source URL for the enacted law text. There is NO direct link to the codified NYC Admin Code §§ 20-870 et seq. on an official NYC government page that was accessible during this verification. The American Legal (amlegal.com) codified version returned 403.

**Prompt for Guiding Light (browser verification):** "Go to https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCadmin/0-0-0-195042 — does this page show NYC Admin Code § 20-870 et seq. (Automated Employment Decision Tools)? If yes, give me the full URL. If no, search https://codelibrary.amlegal.com for 'NYC Administrative Code section 20-870' and give me the working URL to the codified statute text."

---

## 4. Effective Date

- Law enacted: December 2021 (Local Law 144 of 2021)
- Law technically in effect: January 1, 2023 (per the law's own text)
- DCWP rule enforcement began: **July 5, 2023** (when DCWP implementing rules took effect)

The codebase cites July 5, 2023 as the effective date — this is the date DCWP began enforcement, which is the operationally meaningful date. This is accurate in context.

---

## 5. Penalty Amounts (Verified from § 20-872)

- **First violation:** Not more than $500
- **Subsequent violations:** Not less than $500 and not more than $1,500 per violation
- **Each day of unlawful use** constitutes a separate violation
- **Each missing notice** (to a candidate or employee) constitutes a separate violation

The codebase penalty range of "$500–$1,500 per violation per day" is accurate and matches the statute.

**Section citation:** NYC Admin. Code § 20-872

---

## 6. Enforcement

**Primary enforcer:** Corporation counsel (NYC Corporation Counsel) may initiate court actions — per § 20-873.

**Civil penalty proceedings:** Heard by the Office of Administrative Trials and Hearings (OATH) or designated city agencies — per § 20-872(d).

**Agency oversight:** Department of Consumer and Worker Protection (DCWP) administers the law and implementing rules.

**No private right of action:** The statute grants enforcement authority to the corporation counsel; individuals cannot sue directly under this law.

The codebase lists "NYC DCWP enforcement" — this is accurate as DCWP administers the law, but the formal enforcement (civil penalty proceedings) runs through Corporation Counsel and OATH.

---

## 7. Applicability

**Who must comply:** Employers and employment agencies **operating in New York City** that use an automated employment decision tool.

**Definition of "Automated employment decision tool" (§ 20-870):** "Any computational process, derived from machine learning, statistical modeling, data analytics, or artificial intelligence, that issues simplified output, including a score, classification, or recommendation, that is used to substantially assist or replace discretionary decision making for making employment decisions that may have a legal or similarly significant effect."

Explicit exclusions: tools that facilitate scheduling, tools that are not used to make employment decisions (e.g., email filters, spreadsheets not trained on employment data).

**"Employment decision" means:** Screening candidates for employment or employees for promotion within New York City.

---

## 8. AI-Specific Provisions

This is an AI-specific statute. Key requirements:

**Bias Audit (§ 20-871(a)):**
- Must be conducted by an independent auditor
- Must test the tool for disparate impact on sex, race/ethnicity categories under Title VII/EEOC
- Must be conducted no more than one year before the tool is used
- Audit summary and distribution date must be publicly available on employer's website before deployment

**Notice to Candidates/Employees (§ 20-871(b)):**
- At least 10 business days before use of the tool, must notify affected NYC residents that: (1) an AEDT will be used, (2) the job qualifications/characteristics the tool will assess
- Must provide alternative selection process upon request
- Must provide data type and source information within 30 days of written request

---

## 9. What I Verified From Primary Source

- Confirmed enacted status from DCWP agency page and Legistar record
- Confirmed § 20-870 definitions (bias audit, AEDT, employment decision) from Legistar text
- Confirmed § 20-871 bias audit and notice requirements from Legistar text
- Confirmed § 20-872 penalty amounts ($500 first violation; $500-$1,500 subsequent) from Legistar text
- Confirmed § 20-873 enforcement mechanism (corporation counsel) from Legistar text
- Confirmed enforcement date (July 5, 2023) from DCWP agency page and implementing rules page
- Confirmed no private right of action (enforcement by corporation counsel only)
- Confirmed DCWP as administering agency

---

## 10. What I Could NOT Verify

**1. Direct URL to codified NYC Admin Code text**

The `citationUrl` in the codebase points to the DCWP agency overview page, which does not contain the statute text. The PRODUCT-ONBOARDING.md requires a URL that takes customers to the actual law text. amlegal.com (the codified version) returned 403. Legistar (the original bill) is accessible.

**Prompt for Guiding Light:** "I need a working URL for the codified text of NYC Admin Code §§ 20-870 through 20-873 (the Automated Employment Decision Tools law). Go to https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCadmin/0-0-0-117440 and tell me if you can see sections labeled 20-870 through 20-873. If so, give me the full URL. Alternatively, search Google for 'NYC Admin Code 20-870 site:codelibrary.amlegal.com' and give me whatever URL comes up."

**2. Penalty amount for violations of court orders**

The statute text I accessed shows first/subsequent violation penalty tiers, but I could not confirm whether there is a separate higher penalty tier for violations of court orders or OATH determinations.

**Prompt for Guiding Light:** "Look at NYC Admin Code § 20-872 in full — is there a higher penalty tier for violations of court orders, OATH determinations, or repeated violations beyond the $500/$1,500 range? Does the statute or DCWP rules set any other penalty amounts?"
