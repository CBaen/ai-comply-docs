# Product Verification: NY RAISE Act

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary sources + enacted bill text)

---

## CRITICAL FINDING: Wrong Bill Number in Codebase

The codebase currently references **S2544** as the NY RAISE Act. This is **incorrect**.

- S2544 is a bill about designating blighted property — it has nothing to do with AI.
- The RAISE Act is **S6953B / A6453B**, signed December 19, 2025.
- The codebase citation "N.Y. Gen. Bus. Law Art. 43" is also **incorrect** — the enacted law creates **Article 44-B**, not Article 43.

These errors must be corrected before this product can launch.

---

## CRITICAL FINDING: Chapter Amendment in Progress — Law is in Transition

The signed law (S6953B) contains different terms than what will be the final operative law. A chapter amendment bill (A9449 / S8828) was agreed upon by Governor Hochul and legislative leaders at the time of signing and is moving through the legislature. As of March 13, 2026:

- A9449 passed the Assembly on March 11, 2026 and was returned to the Senate
- S8828 has not yet been passed by the Senate
- The Governor has not signed the chapter amendment

**This means the currently enacted law (S6953B) is in effect, but the chapter amendment will materially change its effective date and penalty structure once signed.**

See "Effective Date" and "Penalty Amounts" sections below for the dual-state analysis.

---

## 1. Enacted Status

**Enacted: YES**

Governor Kathy Hochul signed S6953B / A6453B on **December 19, 2025**. Chapter 699 of the Laws of 2025.

Primary source confirmed: NY Governor's press release (https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models); enrolled bill text read in full.

---

## 2. Statute Citation

**Enacted statute:** N.Y. Gen. Bus. Law Art. 44-B, §§ 1420–1425

Sections created by S6953B:
- § 1420 — Definitions
- § 1421 — Transparency requirements regarding frontier model training and use
- § 1422 — Violations (penalties)
- § 1423 — Duties and obligations
- § 1424 — Scope
- § 1425 — Severability

**The current codebase citation "N.Y. Gen. Bus. Law Art. 43" is wrong. The correct citation is N.Y. Gen. Bus. Law Art. 44-B, §§ 1420–1425.**

Source: Enrolled bill text of S6953B, § 2 ("The general business law is amended by adding a new article 44-B").

---

## 3. Citation URL

**Primary source URL (enacted bill text):**
`https://legislation.nysenate.gov/pdf/bills/2025/S6953B`

This URL serves the PDF of the enrolled bill text. The enrolled text was read in full and confirmed.

**Alternative citation URL (bill history page):**
`https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B`
(Note: This page renders blank in WebFetch due to JavaScript — the PDF URL is more reliable for access to the actual text.)

**Governor's signing press release (confirms enactment):**
`https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models`

**citationUrl for regulations.ts should NOT be the current S2544 URL.** It should link to the enrolled statute text or the codified article once the NYSLL publishes the codified form.

---

## 4. Effective Date

**Two competing dates — depends on chapter amendment:**

**Currently enacted (S6953B, § 3):** "This act shall take effect on the ninetieth day after it shall have become a law."
- Signed December 19, 2025 → **90th day = March 19, 2026**
- This is the effective date of the law AS SIGNED.

**Pending chapter amendment (A9449 / S8828):** Explicitly changes the effective date to **January 1, 2027**.
- A9449 passed Assembly March 11, 2026; S8828 returned to Senate; not yet signed as of March 13, 2026.

**Current operative effective date: March 19, 2026** (under the signed law). The chapter amendment, if and when signed, will change this to January 1, 2027.

The codebase field `effectiveDate: "Mar 19, 2026"` correctly reflects the signed law. However, if the chapter amendment passes before March 19, 2026 (possible — the Senate could vote any day), the effective date will shift to January 1, 2027.

**This is an active, time-sensitive situation. Do not set `ready: true` without verifying the chapter amendment status.**

---

## 5. Penalty Amounts

**As enacted in S6953B (primary source, § 1422(1)(a)):**
- First violation: civil penalty **not exceeding $10,000,000**
- Subsequent violations: civil penalty **not exceeding $30,000,000**

**Per pending chapter amendment (A9449 / S8828):**
- First violation: civil penalty **not exceeding $1,000,000**
- Subsequent violations: civil penalty **not exceeding $3,000,000**

Source for enacted penalties: Read directly from enrolled bill text of S6953B, § 1422(1)(a): "a civil penalty in an amount not exceeding ten million dollars for a first violation and in an amount not exceeding thirty million dollars for any subsequent violation."

Source for pending amendment penalties: A9449 bill text (confirmed via Assembly legislative record); corroborated by Governor's press release which states "$1 million for the first violation and up to $3 million for subsequent violations" — the Governor's office describes the chapter-amended version as the operative law in public communications.

**Penalties apply only to violations of § 1421 (transparency requirements).** No other penalty tiers exist. No cure period; no fine for lesser violations.

---

## 6. Enforcement

- **Enforcer:** New York Attorney General exclusively.
- **Mechanism:** Civil action for civil penalties, injunctive or declaratory relief (§ 1422(1)).
- **Private right of action:** None. Explicitly prohibited: "Nothing in this article shall be construed to establish a private right of action associated with violations of this article." (§ 1422(2))
- **DFS oversight office:** The chapter amendment (A9449/S8828) creates an oversight office within the Department of Financial Services. This office does not yet exist under the signed law.

Source: S6953B enrolled text, § 1422(1) and (2).

---

## 7. Cure Period

**None.** No cure period exists in the signed law (S6953B). The penalty section (§ 1422) gives the AG discretion based on "severity of the violation" but establishes no statutory cure window.

The pending chapter amendment (A9449/S8828) does not appear to add a cure period based on available information, but the full text of the chapter amendment was not read from primary source. This should be verified once the chapter amendment is signed.

---

## 8. Applicability

**Who must comply:** "Large developers" — defined in § 1420(9) as a person that:
1. Has trained at least one frontier model, AND
2. Has spent over $100,000,000 in compute costs in aggregate training frontier models.

Accredited colleges and universities conducting academic research are excluded.

**What triggers the obligation:** Deploying a "frontier model" (§ 1420(6)) defined as:
- (a) An AI model trained using greater than 10^26 computational operations, with compute costs exceeding $100,000,000; OR
- (b) A model produced by knowledge distillation from a (a) model, where distillation compute costs exceed $5,000,000.

**Geographic scope (§ 1424):** "This article shall only apply to frontier models that are developed, deployed, or operating in whole or in part in New York state."

**Pending chapter amendment change:** A9449/S8828 reportedly replaces the compute-cost threshold with a $500,000,000 annual revenue requirement. The threshold definition would change entirely if the amendment passes.

Source: S6953B enrolled text, §§ 1420(6), 1420(9), 1424.

---

## 9. What I Verified From Primary Source

- Read the full enrolled bill text of S6953B (all 5 pages) — confirmed directly from the PDF served at legislation.nysenate.gov
- Confirmed Article 44-B is created, not Article 43
- Confirmed sections 1420–1425
- Confirmed penalties at §1422: $10M first / $30M subsequent (not $1M/$3M as reported in some secondary sources)
- Confirmed effective date language: "ninetieth day after it shall have become a law" (= March 19, 2026)
- Confirmed no private right of action (§1422(2))
- Confirmed no cure period in the signed law
- Confirmed scope limited to NY-connected frontier models (§1424)
- Confirmed large developer definition: $100M+ compute costs in aggregate (§1420(9))
- Confirmed frontier model thresholds: 10^26 FLOPs + $100M compute cost (§1420(6)(a))
- Confirmed A9449 passed Assembly March 11, 2026 (returned to Senate — not yet enacted)
- Confirmed Governor's press release describes $1M/$3M penalties (reflecting chapter-amended version)

---

## 10. What I Could NOT Verify

The following items require reading the full text of the chapter amendment (A9449/S8828) from primary source:

1. **Whether S8828 has been passed by the NY Senate and signed by the Governor** — as of March 13, 2026 this was unconfirmed. Use this prompt with Claude in browser:

> Search for New York Senate Bill S8828 on nysenate.gov. I need: (1) the complete legislative action history showing all dates and actions, especially whether the Senate passed it and the date; (2) whether Governor Hochul signed it and the date signed; (3) the effective date the bill sets for the RAISE Act; (4) the exact penalty amounts in the bill text. URL to check: https://www.nysenate.gov/legislation/bills/2025/S8828

2. **Codified statute location** — once the NYSLL codifies Art. 44-B into the Consolidated Laws, the citationUrl should point to the codified text rather than the enrolled bill PDF. Use this prompt:

> Search the New York State Consolidated Laws online (https://www.nysenate.gov/legislation/laws/GBS) for Article 44-B of the General Business Law, the RAISE Act. I need: (1) whether it has been codified yet; (2) if so, the working URL to the codified text of sections 1420 through 1425.

3. **Whether the chapter amendment (A9449/S8828) adds a cure period** — this was not verified from the chapter amendment text.

---

## Summary for regulations.ts

| Field | Current (Wrong) | Correct (As Signed) | Correct (After Chapter Amendment) |
|-------|----------------|---------------------|------------------------------------|
| slug | unknown | `ny-raise-act` | same |
| citation | N.Y. Gen. Bus. Law Art. 43 | N.Y. Gen. Bus. Law Art. 44-B, §§ 1420–1425 | same |
| citationUrl | https://www.nysenate.gov/legislation/bills/2025/S2544 | https://legislation.nysenate.gov/pdf/bills/2025/S6953B | codified URL once available |
| status | unknown | `effective-soon` (signed; effective March 19, 2026) | `effective-soon` (effective January 1, 2027) |
| effectiveDate | Mar 19, 2026 | March 19, 2026 (per enrolled text) | January 1, 2027 (per chapter amendment) |
| maxPenalty | unknown | $10,000,000 per first violation; $30,000,000 per subsequent | $1,000,000 per first violation; $3,000,000 per subsequent |

**Do not launch this product until the chapter amendment status is resolved.** The effective date and penalties are in flux.
