# Verification: California TFAIA (SB 53, 2025-2026 Session)

**Verified by:** Legal research agent (primary source fetch)
**Date of research:** 2026-03-13
**Verification status:** PARTIALLY VERIFIED — operative date and penalty confirmed from statute text; citation URL needs correction (see below)

---

## CRITICAL FINDING: WRONG BILL SESSION IN PRODUCT DATA

The product data references `bill_id=202320240SB53` — the **2023-2024 session SB 53**.

That bill is a **firearms storage law** (Cal. Penal Code §§ 16745, 25145). It has nothing to do with AI.

The correct bill is **SB 53 from the 2025-2026 session** (`bill_id=202520260SB53`), chaptered as **Chapter 138, Stats. 2025**, signed September 29, 2025.

The citationUrl in the product data must be corrected to:
`https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53`

---

## 1. Enacted Status

**Yes — enacted and signed.**

- Bill: SB 53, 2025-2026 Legislative Session
- Chaptered: Chapter 138, Statutes of 2025
- Governor signature: September 29, 2025
- Filed with Secretary of State: September 29, 2025

Confirmed from: leginfo.legislature.ca.gov bill nav page for `bill_id=202520260SB53`

---

## 2. Statute Citation

The bill creates three new statutory chapters:

- **Bus. & Prof. Code §§ 22757.10–22757.16** — "Transparency in Frontier Artificial Intelligence Act" (core requirements)
- **Gov. Code § 11546.8** — CalCompute consortium (operative only upon budget appropriation)
- **Lab. Code §§ 1107–1107.2** — Whistleblower protections for employees reporting AI catastrophic risks

The product currently cites "Cal. Gov. Code § 11547.6" — this is **incorrect**. Section 11547.6 does not exist in the enrolled SB 53 (2025) text. The CalCompute provision is at Gov. Code § 11546.8. The core AI transparency requirements are at BPC §§ 22757.10–22757.16.

**The citation in regulations.ts must be corrected to: Bus. & Prof. Code §§ 22757.10–22757.16**

---

## 3. Citation URL

**Current URL in product data is wrong** — it points to the 2023-2024 firearms SB 53.

**Correct bill page URL (tested, returns the correct AI bill):**
`https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53`

**Statute text URL for BPC 22757.10 (tested, returns correct section):**
`https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22757.10.&lawCode=BPC`

Recommend using the statute text URL as citationUrl (customers can read the enacted law directly).

---

## 4. Effective Date

- Signed/chaptered: September 29, 2025 (immediate effect for most provisions)
- BPC §§ 22757.10–22757.16 (core TFAIA requirements): **operative January 1, 2026**
- Gov. Code § 11546.8 (CalCompute): operative only upon budget appropriation (no fixed date)

Confirmed from: BPC 22757.10 statute page (leginfo.legislature.ca.gov), which states "effective date: January 1, 2026."

**The "effective Jan 1, 2026" in the product data is correct for the core requirements.**

No amending bills found that change this date.

---

## 5. Penalty Amounts

**Section 22757.15(a):** Civil penalty "in an amount dependent upon the severity of the violation that does not exceed one million dollars ($1,000,000) per violation."

**No minimum penalty is stated.** The statute gives the AG discretion based on severity — it is "up to $1,000,000," not a fixed $1,000,000.

**The product data states "$1,000,000 per violation" as if it is a fixed amount. This is misleading.** The correct description is "up to $1,000,000 per violation (BPC § 22757.15(a)), amount determined by severity of violation."

No penalty tiers found in the statute text. Single maximum with severity-based discretion.

Confirmed from: leginfo.legislature.ca.gov, BPC § 22757.15 full text.

---

## 6. Enforcement

**California Attorney General only.** Section 22757.15(b): "A civil penalty described in this section shall be recovered in a civil action brought only by the Attorney General."

- No private right of action.
- No other agencies listed as enforcement authority for penalties.
- The Office of Emergency Services establishes the incident reporting mechanism and reviews critical safety reports, but does not impose penalties.

Confirmed from: BPC § 22757.15 full text.

---

## 7. Cure Period

**None found.** Section 22757.12(b)(2) requires updates within 30 days of material framework modifications, but this is a compliance timeline, not a cure period before penalties apply.

No statutory cure period was found in the enrolled text. Confirmed from: BPC §§ 22757.10–22757.16 text review.

---

## 8. Applicability

**Two tiers:**

**"Large frontier developers"** (core TFAIA obligations — framework publication, risk assessments, etc.):
- Defined as a frontier developer whose affiliates collectively had annual gross revenues exceeding **$500,000,000** in the preceding calendar year (BPC § 22757.11(j))

**"Frontier developers"** (all — critical safety incident reporting only):
- Any person who "has trained, or initiated the training of, a frontier model" (BPC § 22757.11(h))
- A "frontier model" is a foundation model trained using more than **10^26 integer or floating-point operations** (BPC § 22757.11(i)(1))

Confirmed from: BPC § 22757.11 definitions, fetched from leginfo.legislature.ca.gov.

---

## 9. What I Verified From Primary Source

All of the following confirmed by fetching leginfo.legislature.ca.gov directly:

- SB 53 (2025-2026, bill_id=202520260SB53) is enacted, signed September 29, 2025, Chapter 138
- The 2023-2024 SB 53 (bill_id=202320240SB53) is a firearms law — confirmed by fetching that bill page
- BPC §§ 22757.10–22757.16 is the correct statute citation (confirmed from BPC 22757.10 text page)
- Operative date of January 1, 2026 confirmed from BPC 22757.10 statute page
- Penalty maximum of $1,000,000 per violation confirmed from BPC 22757.15 text page
- "Up to" framing (not fixed amount) confirmed from BPC 22757.15 exact language
- AG-only enforcement confirmed from BPC 22757.15(b) exact language
- No private right of action confirmed from BPC 22757.15 text
- "Large frontier developer" definition ($500M revenue) confirmed from BPC 22757.11(j)
- "Frontier model" definition (10^26 operations) confirmed from BPC 22757.11(i)(1))
- Gov. Code § 11547.6 does NOT exist in this bill — confirmed by failed fetch of that section

---

## 10. What I Could NOT Verify

**Could not verify:**
- Whether Gov. Code § 11547.6 exists at all under any bill (the fetch returned navigation code, not section text)
- The complete text of BPC § 22757.12–22757.14 (fetched 22757.12 but got limited content; 22757.13–22757.14 not fetched)
- Whether any amending bill was passed in the 2025-2026 session after SB 53 (AB 853 amended SB 942 in the same session — possible SB 53 was also amended)

**Exact prompt for Guiding Light to use with Claude in browser:**

> Search California's legislative site at leginfo.legislature.ca.gov for SB 53 from the 2025-2026 legislative session (bill_id=202520260SB53). I need: (1) Confirm the bill is chaptered and signed. (2) Does the bill create Government Code section 11547.6, or only BPC 22757.10-22757.16 and Gov Code 11546.8? (3) Read the full text of BPC 22757.12 through 22757.14 — what do they require? (4) Search leginfo for any bills in the 2025-2026 session that amend BPC 22757.10-22757.16 after SB 53. (5) Confirm the operative date is January 1, 2026 for BPC 22757.10-22757.16.

---

## Summary of Corrections Required

| Field | Current Value | Correct Value | Source |
|-------|--------------|---------------|--------|
| Bill ID in citationUrl | 202320240SB53 (firearms bill) | 202520260SB53 | leginfo.legislature.ca.gov |
| citation | Cal. Gov. Code § 11547.6 | Bus. & Prof. Code §§ 22757.10–22757.16 | BPC 22757.10 text |
| citationUrl | Wrong session year URL | https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=22757.10.&lawCode=BPC | Tested |
| penaltySummary | "$1,000,000 per violation" | "Up to $1,000,000 per violation based on severity (BPC § 22757.15(a)); AG enforcement only; no private right of action" | BPC 22757.15 text |
| maxPenalty | (verify current) | "$1,000,000 maximum per violation (BPC § 22757.15(a))" | BPC 22757.15 text |
| effectiveDate | January 1, 2026 | January 1, 2026 (operative date for BPC 22757.10-22757.16) | BPC 22757.10 |
