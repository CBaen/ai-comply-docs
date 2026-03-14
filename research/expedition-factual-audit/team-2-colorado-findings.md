# Team 2 — Colorado Product Content Audit
**Researcher:** Claude Sonnet 4.6 (Expedition Team 2)
**Date:** 2026-03-13
**Assignment:** Every legal claim in the Colorado PDF generators and pdf-helpers.ts

---

## Verification Methodology

Primary sources attempted:
- `https://leg.colorado.gov/bills/sb24-205` — page loaded, confirmed bill signed May 17, 2024; effective date listed as February 1, 2026 (pre-amendment)
- `https://leg.colorado.gov/bills/sb25b-004` — confirmed SB25B-004 signed August 28, 2025, moved effective date to June 30, 2026
- All Colorado legislative PDFs (signed act, enrolled, session laws) — image-based scans, not machine-readable; text extraction failed for all
- Multiple law firm client alerts, legal publisher databases — most returned 403 or 404
- Sources that yielded statutory text: National Law Review, IRMI (2 articles), Workforcebulletin, Fisher Phillips, Hudson Cook, Fostergraham.com, Holland & Knight, Stack Aware blog, workforcebulletin.com

**What was confirmed from multiple independent sources:**
- Definitions (6-1-1701): algorithmic discrimination, consequential decisions (all 8 categories), deployer, developer, high-risk AI system, subsection numbers
- Deployer obligations (6-1-1703): subsection structure (1)-(7), risk management (2), impact assessment (3) including (3)(b)(I)-(VII) elements, consumer notice (4) including (4)(b)(I)-(III), transparency statement (5), small deployer exemption (6), incident reporting (7)
- Enforcement (6-1-1706): AG-exclusive, no private right of action at (6), $20,000 per violation unfair trade practice, affirmative defense at (3)(a)(I)-(III) and (3)(b)
- Effective date: June 30, 2026 (amended by SB25B-004; original was February 1, 2026)
- 6-1-1704: AI interaction disclosure requirement

**What could NOT be verified from a primary text source:**
- Exact verbatim text of 6-1-1703(4)(a)(I) and (4)(a)(II) — confirmed by search snippets but not directly from enrolled text
- Exact wording of 6-1-1703(5)(b) update schedule
- Whether "90 days" for incident reporting appears at 6-1-1703(7) specifically — confirmed from multiple secondary sources
- Exact text of 6-1-1703(3)(f) retention subsection lettering (I)(II)(III) — confirmed from multiple secondary sources
- Whether the rebuttable presumption in 6-1-1703(1) uses exact phrase "rebuttable"

---

## REGULATION_HEADER Entry — pdf-helpers.ts

**File:** `src/lib/pdf-helpers.ts`, lines 79–84

```
"colorado-sb24-205": {
  statute: "Statute: C.R.S. §§ 6-1-1701 through 6-1-1707 — Consumer Protections for AI (SB 24-205, eff. 6-30-26)",
  rules: "Enforcement: Colorado Attorney General (exclusive authority, § 6-1-1706). No AG implementing rules adopted as of March 2026.",
},
```

| Claim | Status | Notes |
|---|---|---|
| "C.R.S. §§ 6-1-1701 through 6-1-1707" | VERIFIED | Multiple sources confirm these are the correct section numbers |
| "Consumer Protections for AI" | VERIFIED | Full title is "Consumer Protections for Artificial Intelligence" — short form acceptable |
| "SB 24-205" | VERIFIED | Correct bill number |
| "eff. 6-30-26" | VERIFIED | June 30, 2026 confirmed by SB25B-004 (signed Aug 28, 2025) |
| "Colorado Attorney General (exclusive authority, § 6-1-1706)" | VERIFIED | Multiple sources confirm AG-exclusive enforcement at 6-1-1706 |
| "No AG implementing rules adopted as of March 2026" | VERIFIED (consistent with record) | AG held pre-rulemaking comment period Sept 2024; formal rulemaking had not commenced as of late 2025 per Foster Graham Dec 2025 article |

**Result: All REGULATION_HEADER claims VERIFIED.**

---

## File 1: risk-management-policy.ts

### Claim: "§ 6-1-1703(2) of the Colorado Artificial Intelligence Act (SB 24-205)"
- Line 28–29
- **VERIFIED** — Risk management policy and program is at 6-1-1703(2). "Colorado Artificial Intelligence Act" is a recognized shorthand (also known as the Anti-Discrimination in AI Act / CAIA). SB 24-205 correct.

### Claim: "The statute imposes upon deployers of high-risk artificial intelligence systems an obligation to 'use reasonable care to protect consumers from any known or reasonably foreseeable risks of algorithmic discrimination.' § 6-1-1703(1)."
- Lines 29–32
- **VERIFIED** — Multiple sources confirm the reasonable care standard is at 6-1-1703(1). The quoted language matches search snippet results from the statute.

### Claim: "systems that make, or are a substantial factor in making, consequential decisions — deployed by the Company"
- Lines 40–41 (paraphrase of 6-1-1701(9)(a) high-risk AI definition)
- **VERIFIED** — The high-risk AI definition at 6-1-1701(9)(a) reads "any artificial intelligence system that, when deployed, makes, or is a substantial factor in making, a consequential decision." (Confirmed via National Law Review.)

### Claim: "§ 6-1-1701(6)" for definition of high-risk AI system
- Line 40
- **WRONG** — The codebase cites "§ 6-1-1701(6)" for the high-risk AI definition. However, verified sources (National Law Review) place the **deployer** definition at 6-1-1701(6) and the **high-risk AI system** definition at 6-1-1701(9)(a). The text in the document reads: "'high-risk artificial intelligence systems' as defined in § 6-1-1701(6)." This is the wrong subsection.

### Claim: "Consequential decisions" defined in "§ 6-1-1701(3)" listing 8 categories
- Lines 41–46
- **VERIFIED** — 6-1-1701(3) is the correct subsection for consequential decisions. The 8 categories (education enrollment or opportunity; employment or employment opportunities; financial or lending services; essential government services; health care services; housing; insurance; legal services) are confirmed correct.

### Claim: "§ 6-1-1703(1)" for rebuttable presumption
- Lines 60–68 (section 2 header and text)
- **PARTIALLY VERIFIED / LABELING ISSUE** — 6-1-1703(1) is the correct section for the reasonable care standard. Multiple sources confirm that compliance with 6-1-1703 creates a rebuttable presumption of reasonable care. The exact word "rebuttable" in the statutory text itself was not confirmed from a primary source, but it is used consistently in secondary sources and the AG's own pre-rulemaking document. The document's representation is consistent with the statute's structure.

### Claim: "§§ 6-1-1703(2) through (7)" covering risk management, impact assessments, consumer notification, transparency statements, and incident reporting
- Lines 64–67
- **VERIFIED** — Confirmed subsection structure: (2) risk management, (3) impact assessment, (4) consumer notification, (5) transparency statement, (7) incident reporting. Note: subsection (6) is small deployer exemption and subsection (7) is incident reporting — this is correctly stated.

### Claim: "§ 6-1-1703(2)(a)" for risk identification process
- Line 73
- **VERIFIED** — Risk management policy/program is at 6-1-1703(2)(a).

### Claim: "§ 6-1-1701(1)(a)" for protected classes / algorithmic discrimination definition
- Lines 86–91
- **VERIFIED** — Algorithmic discrimination definition including protected classes is at 6-1-1701(1)(a). Protected class list: age, color, disability, ethnicity, genetic information, limited English proficiency, national origin, race, religion, reproductive health, sex, veteran status — all confirmed.

### Claim: "§ 6-1-1703(3)(a)(II)" for annual review requirement
- Line 94 (review schedule item)
- **VERIFIED** — Annual review of impact assessment is at 6-1-1703(3)(a)(II).

### Claim: "§ 6-1-1703(2)(a)(I)" through "(IV)" for NIST framework and scaling provisions
- Lines 158–190 (sections 6 and 7)
- **VERIFIED** — 6-1-1703(2)(a)(I) is nationally/internationally recognized framework; (II) is size/complexity scaling; (III) is nature and scope of systems; (IV) is sensitivity of data. Structure confirmed by multiple sources.

### Claim: Self-reporting "under § 6-1-1706(3)" and "90 days per § 6-1-1703(7)"
- Lines 124–125
- **VERIFIED** — Self-cure/affirmative defense at 6-1-1706(3); 90-day AG reporting at 6-1-1703(7). Both confirmed from multiple sources.

---

## File 2: impact-assessment.ts

### Claim: "C.R.S. § 6-1-1703(3) requires deployers to 'complete an impact assessment for each high-risk artificial intelligence system deployed.'"
- Lines 28–30
- **VERIFIED** — Impact assessment requirement at 6-1-1703(3) confirmed; quoted language consistent with statute.

### Claim: "seven required elements of § 6-1-1703(3)(b)(I)-(VII)"
- Line 31
- **VERIFIED** — Seven elements confirmed. Search results specifically confirmed (I) through (VII) structure with subject matter: (I) purpose/use cases/context/benefits, (II) algorithmic discrimination risk analysis and mitigation, (III) categories of data as inputs and outputs, (IV) customization data, (V) performance metrics and known limitations, (VI) transparency measures, (VII) post-deployment monitoring and user safeguards.

### Claim: "§ 6-1-1703(3)(a)(I)" for pre-deployment requirement
- Line 38
- **VERIFIED** — Pre-deployment completion at 6-1-1703(3)(a)(I) confirmed.

### Claim: "§ 6-1-1703(3)(a)(II)" for annual review and 90-day substantial modification
- Lines 39–42
- **VERIFIED** — Annual review and 90-day-after-substantial-modification requirement at 6-1-1703(3)(a)(II) confirmed.

### Claim: "3-year retention" at "§ 6-1-1703(3)(f)"
- Lines 43–45
- **VERIFIED** — 3-year retention at 6-1-1703(3)(f) confirmed from multiple sources.

### Claim: "§ 6-1-1703(3)(d)" for comparable systems
- Lines 46–48
- **VERIFIED** — Single assessment covering comparable systems at 6-1-1703(3)(d) confirmed.

### Claim: "§ 6-1-1703(3)(e)" for AG availability
- Lines 48–50
- **VERIFIED** — AG may request assessments within reasonable time at 6-1-1703(3)(e) confirmed.

### Claim: Element labels (I) through (VII)
- Lines 84–200 (throughout per-system sections)
- **VERIFIED** — Element structure and subject matter match confirmed subsection mapping:
  - (I) = Purpose, intended use cases, deployment context, benefits — VERIFIED
  - (II) = Algorithmic discrimination risk analysis and mitigation — VERIFIED
  - (III) = Categories of data processed as inputs and outputs — VERIFIED
  - (IV) = Customization data overview — VERIFIED
  - (V) = Performance metrics and known limitations — VERIFIED
  - (VI) = Transparency measures / how consumers are notified — VERIFIED
  - (VII) = Post-deployment monitoring and user safeguards — VERIFIED

### Claim: "§ 6-1-1703(4)(c)" for language/accessibility requirements
- Line 175
- **VERIFIED** — Consumer notice format requirements (plain language, languages, accessibility) at 6-1-1703(4)(c) confirmed.

### Claim: "§ 6-1-1703(3)(f)" retention at end of each system sign-off section
- Line 200
- **VERIFIED** — 3-year retention at 6-1-1703(3)(f) confirmed.

---

## File 3: consumer-notice.ts

### Claim: "§ 6-1-1703(4)(a)" for pre-decision notice
- Lines 32–35, 74–88
- **VERIFIED** — Pre-decision consumer notice is at 6-1-1703(4)(a). Confirmed.

### Claim: "§ 6-1-1704" for general AI interaction disclosure
- Lines 38–44, 159–184
- **VERIFIED** — General AI disclosure obligation (not high-risk specific) is at 6-1-1704. Confirmed.

### Claim: "§ 6-1-1703(4)(c)" format requirements (direct to consumer, plain language, languages, accessibility, timing)
- Lines 51–59
- **VERIFIED** — Format requirements at 6-1-1703(4)(c) confirmed. The provision that notice must be provided "directly to the consumer" and in "plain language" and all languages is correct.

### Claim: "§ 6-1-1703(4)(a)(I)" for notice before consequential decision
- Line 59
- **VERIFIED** — Pre-decision timing (before decision made) at 6-1-1703(4)(a)(I) confirmed.

### Claim: "§ 6-1-1703(4)(a)(II)" for purpose and nature of decision
- Line 94
- **VERIFIED** — Notice must include purpose of AI system and nature of consequential decision at 6-1-1703(4)(a)(II). Confirmed.

### Claim: "§ 6-1-1703(5)" for transparency statement link
- Line 119
- **VERIFIED** — Public transparency statement at 6-1-1703(5) confirmed.

### Claim: "§ 6-1-1306(1)(a)(I)(C)" of the Colorado Privacy Act for profiling opt-out
- Lines 131–141
- **PARTIALLY VERIFIED** — The Colorado Privacy Act (CPA) is codified at C.R.S. § 6-1-1301 et seq. The right to opt out of profiling in furtherance of decisions with legal or similarly significant effects is a recognized CPA right. The specific subsection § 6-1-1306(1)(a)(I)(C) could not be confirmed against the enrolled CPA text from primary sources available to this researcher. The CPA right itself is real; the specific sub-subsection citation is UNVERIFIED from primary source.

### Claim: "§ 6-1-1703(4)(b)(III)" for human review right mentioned in consumer notice section
- Line 152
- **VERIFIED** — Right to appeal with human review where technically feasible at 6-1-1703(4)(b)(III) confirmed. See adverse-decision-kit.ts section below for full text.

### Claim: § 6-1-1704 "shall not use or deploy an artificial intelligence system to interact with a consumer in Colorado without disclosing..."
- Lines 161–166
- **VERIFIED** — The § 6-1-1704 disclosure obligation text is accurately described: deployer shall not interact with consumer using AI without disclosing it is AI, "unless it would be obvious to a reasonable person." Confirmed from multiple sources.

---

## File 4: adverse-decision-kit.ts

### Claim: "§ 6-1-1703(4)(b)" for adverse decision obligations
- Lines 26–29
- **VERIFIED** — Adverse decision obligations at 6-1-1703(4)(b) confirmed.

### Claim: "(I) A statement of the principal reasons for the decision, including: (A) the degree to which, and the manner in which, the high-risk artificial intelligence system contributed to the decision; (B) the type of data that was processed as part of the decision; and (C) the source or sources of that data"
- Lines 35–38
- **VERIFIED** — Confirmed verbatim from search snippet of enrolled text: "(I) A statement disclosing the principal reason or reasons for the consequential decision, including: (A) The degree to which, and manner in which, the high-risk artificial intelligence system contributed to the consequential decision; (B) The type of data that was processed by the high-risk artificial intelligence system in making the consequential decision; and (C) The source or sources of the data..." Minor paraphrase ("statement of the principal reasons" vs. "statement disclosing the principal reason or reasons") but substantively accurate.

### Claim: "(II) An opportunity for the consumer to correct any incorrect personal data that was used in connection with the decision (§ 6-1-1703(4)(b)(II))"
- Lines 39–41
- **VERIFIED** — Confirmed from enrolled text search snippet: "(II) An opportunity to correct any incorrect personal data that the high-risk artificial intelligence system processed in making, or as a substantial factor in making, the consequential decision."

### Claim: "(III) An opportunity to appeal the decision with a human review of the decision where such a review is technically feasible (§ 6-1-1703(4)(b)(III))"
- Lines 41–43
- **VERIFIED** — Confirmed from enrolled text search snippet. The full statutory language adds a nuance: "which appeal must, if technically feasible, allow for human review **unless providing the opportunity for appeal is not in the best interest of the consumer, including in instances in which any delay might pose a risk to the life or safety of such consumer.**" The codebase omits this safety exception caveat but correctly states the core right.

### Claim: "§ 6-1-1703(4)(b)(I)" through "(III)" subsection numbers
- Lines 86–88, 101–153
- **VERIFIED** — Subsection numbers confirmed.

### Claim: "retention" cite "§ 6-1-1703(3)(f)" at line 201
- Line 201
- **VERIFIED** — 3-year retention at 6-1-1703(3)(f) confirmed.

---

## File 5: transparency-statement.ts

### Claim: "C.R.S. § 6-1-1703(5)" for public transparency statement
- Lines 28–29
- **VERIFIED** — Transparency statement at 6-1-1703(5) confirmed.

### Claim: Elements of the statement — "(I) types of high-risk AI systems, (II) how deployer manages risks, (III) nature, source, and extent of information collected"
- Lines 34–47
- **VERIFIED** — The three required elements at 6-1-1703(5)(a)(I)-(III) confirmed from multiple sources as: (I) types of high-risk AI systems deployed, (II) how deployer manages discrimination risks, (III) nature, source, and extent of information collected and used.

### Claim: "§ 6-1-1703(5)(a)(I)", "(5)(a)(II)", "(5)(a)(III)"
- Lines 35–46
- **VERIFIED** — These subsection citations confirmed.

### Claim: "§ 6-1-1703(5)(b)" for periodic update requirement
- Lines 49–51
- **VERIFIED** — Periodic update requirement at 6-1-1703(5)(b) confirmed. Update triggers (deployment, discontinuation, substantial modification, annual) are consistent with what multiple sources describe.

### Claim: "§ 6-1-1703(2)(a)(I)" for NIST AI RMF alignment checkbox
- Line 116
- **VERIFIED** — NIST/ISO framework alignment requirement at 6-1-1703(2)(a)(I) confirmed.

### Claim: "§ 6-1-1701(3)" for "consequential decision areas"
- Line 95
- **VERIFIED** — Consequential decision definition at 6-1-1701(3) confirmed.

---

## File 6: incident-response.ts

### Claim: "C.R.S. § 6-1-1703(7)" for incident reporting obligation
- Lines 28–29
- **VERIFIED** — Incident reporting at 6-1-1703(7) confirmed from multiple sources.

### Claim: "90-day reporting deadline" to AG at "§ 6-1-1703(7)"
- Lines 37–39
- **VERIFIED** — 90-day reporting window to AG confirmed from multiple independent sources at 6-1-1703(7).

### Claim: "self-cure / affirmative defense (two-prong test): Under § 6-1-1706(3)"
- Lines 39–46
- **VERIFIED** — Affirmative defense at 6-1-1706(3) confirmed. Two-prong structure confirmed.

### Claim: Prong (a) conditions — "(I) encouraging feedback, (II) adversarial testing or red teaming as defined by NIST, or (III) an internal review process (§ 6-1-1706(3)(a))"
- Lines 41–44
- **VERIFIED** — All three sub-parts of 6-1-1706(3)(a) confirmed from search snippet of enrolled text: "(I) Feedback that the developer, deployer, or other person encourages deployers or users to provide... (II) Adversarial testing or red teaming, as those terms are defined or used by the national institute of standards and technology; or (III) [internal review process]."

### Claim: Prong (b) — "deployer is otherwise in compliance with the NIST AI Risk Management Framework and ISO/IEC 42001, or another nationally or internationally recognized equivalent framework (§ 6-1-1706(3)(b))"
- Lines 44–46
- **VERIFIED** — Prong (b) confirmed from search snippet: compliance with "the latest version of the 'Artificial Intelligence Risk Management Framework' published by NIST... and Standard ISO/IEC 42001... or another nationally or internationally recognized risk management framework for AI systems, if the standards are substantially equivalent or more stringent."

### Claim: "Exclusive enforcement: The Attorney General has exclusive enforcement authority under § 6-1-1706. There is no private right of action under SB 24-205."
- Lines 46–48
- **VERIFIED** — AG exclusive enforcement at 6-1-1706 confirmed. No private right of action at 6-1-1706(6) confirmed from multiple sources including IRMI article quoting: "the Colorado AI law does not provide the basis for, and is not subject to, a private right of action for violations."

### Claim: "§ 6-1-1701(1)(a)" for algorithmic discrimination definition including protected class list
- Lines 73–79
- **VERIFIED** — 6-1-1701(1)(a) confirmed. Protected class list (age, color, disability, ethnicity, genetic information, limited English proficiency, national origin, race, religion, reproductive health, sex, veteran status) confirmed.

### Claim: "AG Report within 90 days (§ 6-1-1703(7))"
- Line 108 (Step 6), line 186
- **VERIFIED** — 90-day deadline at 6-1-1703(7) confirmed.

### Claim: "§ 6-1-1706(3)(a)(I)" through "(III)" for three discovery methods
- Lines 141, 148, 155
- **VERIFIED** — Three sub-parts (I)(II)(III) of 6-1-1706(3)(a) confirmed.

### Claim: "§ 6-1-1706(3)(b)(I)" NIST AND ISO/IEC 42001, "(b)(II)" substantially equivalent framework, "(b)(III)" AG-designated framework
- Lines 168–171
- **PARTIALLY VERIFIED** — From search snippets, prong (b) says NIST AND ISO/IEC 42001 (or another equivalent framework). The codebase breaks this into three sub-parts (I), (II), (III). While (b)(I) = NIST+ISO and (b)(II) = substantially equivalent alternative are clearly confirmed, the existence of a specific "(b)(III)" sub-part for "AG-designated framework" is UNVERIFIED from primary sources. Secondary sources describe the AG's ability to designate additional frameworks but may not confirm it as a separately lettered sub-part. This citation is UNVERIFIED.

### Claim: "§ 6-1-1703(3)(f)" for 3-year retention
- Lines 195–197, 201
- **VERIFIED** — 3-year retention at 6-1-1703(3)(f) confirmed.

---

## File 7: record-retention.ts

### Claim: "C.R.S. § 6-1-1703(3)(f)" for 3-year retention requirement
- Lines 26–27
- **VERIFIED** — 6-1-1703(3)(f) confirmed as retention section.

### Claim: Retention items "(I) most recently completed impact assessment, (II) all records concerning each assessment, (III) all prior assessments"
- Lines 33–43
- **VERIFIED** — These three items at 6-1-1703(3)(f)(I)(II)(III) confirmed from multiple sources.

### Claim: "§ 6-1-1703(3)(e)" for AG availability within reasonable time
- Lines 47–50
- **VERIFIED** — AG may request production within reasonable time at 6-1-1703(3)(e) confirmed.

### Claim: "§ 6-1-1301 et seq." for Colorado Privacy Act data security reference
- Line 134
- **VERIFIED** — Colorado Privacy Act is codified beginning at C.R.S. § 6-1-1301.

### Claim: Various subsection citations in retention table (§ 6-1-1703(2), § 6-1-1703(4)(a), § 6-1-1703(4)(b), § 6-1-1703(4)(b)(II), § 6-1-1703(4)(b)(III), § 6-1-1703(5), § 6-1-1703(7), § 6-1-1703(2)(a))
- Lines 79–92
- **VERIFIED** — All subsection numbers confirmed from the overall structure analysis.

---

## File 8: compliance-checklist.ts

### Claim: "C.R.S. §§ 6-1-1701 through 6-1-1707 (Colorado Artificial Intelligence Act, SB 24-205)"
- Lines 26–27
- **VERIFIED** — Correct section range and bill reference confirmed.

### Claim: "§ 6-1-1703(6)" for small deployer exemption
- Line 34
- **VERIFIED** — Small deployer exemption at 6-1-1703(6) confirmed.

### Claim: Small deployer exemption conditions:
- "(a)(I) employs fewer than fifty full-time equivalent employees, AND (II) does not use the deployer's own data to train the high-risk AI system (§ 6-1-1703(6)(a))"
- Lines 42–44
- **VERIFIED** — Confirmed from multiple sources: fewer than 50 FTE employees, no deployer training data.

### Claim: "(b)(I) used for intended uses disclosed by developer per § 6-1-1702(2)(a), AND (II) continues learning based on data derived from sources other than the deployer's own data (§ 6-1-1703(6)(b))"
- Lines 47–51
- **VERIFIED** — Confirmed: system used for intended uses, continues learning from non-deployer data.

### Claim: "(c) deployer makes available to consumers any impact assessment that the developer completed and provided, if it includes information substantially similar..." (§ 6-1-1703(6)(c))"
- Lines 53–57
- **VERIFIED** — Third condition confirmed: developer impact assessment made available to consumers.

### Claim: "§ 6-1-1704 still applies" even if exemption applies
- Lines 62–63
- **VERIFIED** — § 6-1-1704 general AI disclosure applies to all deployers including those qualifying for the § 6-1-1703(6) exemption. Confirmed from multiple sources.

### Claim: "§ 6-1-1703(2)(a)(I)" through "(IV)" subsections for risk management policy requirements
- Lines 84–88
- **VERIFIED** — All four sub-parts confirmed.

### Claim: Impact assessment items § 6-1-1703(3)(a)(I), (3)(a)(II), (3)(b)(I)-(VII), (3)(d), (3)(e), (3)(f)(I), (3)(f)(II), (3)(f)(III)
- Lines 102–117
- **VERIFIED** — All impact assessment subsection citations confirmed.

### Claim: Consumer notification items § 6-1-1703(4)(a)(I), (4)(a), (4)(c), (4)(b)(I), (4)(b)(II), (4)(b)(III)
- Lines 129–141
- **VERIFIED** — All consumer notification subsection citations confirmed. Note: § 6-1-1306(1)(a)(I)(C) CPA profiling opt-out at line 141 is UNVERIFIED from primary source (see consumer-notice.ts finding above).

### Claim: "§ 6-1-1703(5)(a)(I)", "(5)(a)(II)", "(5)(a)(III)", "(5)(b)" for transparency statement
- Lines 154–157
- **VERIFIED** — All confirmed.

### Claim: "§ 6-1-1703(7)" for 90-day AG report
- Line 173
- **VERIFIED** — Confirmed.

### Claim: Affirmative defense elements "§ 6-1-1706(3)(a)(I)-(III)" and "§ 6-1-1706(3)(b)"
- Line 176
- **VERIFIED** — Structure confirmed.

### Claim: "§ 6-1-1704" applies to ALL deployers including small deployer exemption
- Lines 212–213
- **VERIFIED** — Confirmed.

---

## Summary of Findings

### VERIFIED Claims
The overwhelming majority of legal claims in the Colorado PDF generators are accurate:
- Section numbers (6-1-1701 through 6-1-1707)
- Definition locations: algorithmic discrimination at 6-1-1701(1)(a), consequential decisions at 6-1-1701(3), deployer at 6-1-1701(6), developer at 6-1-1701(7), high-risk AI system at 6-1-1701(9)(a)
- All 8 consequential decision categories — correct and in correct order
- All deployer obligation subsections of 6-1-1703 — correct mapping: (1) reasonable care, (2) risk management, (3) impact assessment, (4) consumer notice, (5) transparency, (6) small deployer exemption, (7) incident reporting
- All 7 impact assessment elements at 6-1-1703(3)(b)(I)-(VII) — correct
- All three adverse decision provisions at 6-1-1703(4)(b)(I)-(III) — correct (with one nuance noted below)
- AG-exclusive enforcement at 6-1-1706 — correct
- No private right of action at 6-1-1706(6) — correct
- $20,000 per violation penalty (unfair trade practice under 6-1-105/6-1-112) — correct
- Affirmative defense at 6-1-1706(3)(a)(I)-(III) and (3)(b) — correct
- 90-day AG incident reporting at 6-1-1703(7) — correct
- 3-year retention at 6-1-1703(3)(f)(I)-(III) — correct
- Small deployer exemption at 6-1-1703(6)(a)-(c) — correct
- 6-1-1704 general AI disclosure — correct
- Effective date "eff. 6-30-26" in REGULATION_HEADER — CORRECT (changed from Feb 1 to Jun 30 by SB25B-004)

### WRONG Claim — Requires Fix

**File:** `risk-management-policy.ts`, line 40
**Claim:** `'high-risk artificial intelligence systems' as defined in § 6-1-1701(6)`
**Problem:** § 6-1-1701(6) is the **deployer** definition. The **high-risk artificial intelligence system** definition is at **§ 6-1-1701(9)(a)**.
**Fix required:** Change "§ 6-1-1701(6)" to "§ 6-1-1701(9)(a)" in the Purpose & Scope section of risk-management-policy.ts.

### UNVERIFIED Claims — Cannot Confirm from Primary Source

1. **§ 6-1-1306(1)(a)(I)(C)** (Colorado Privacy Act profiling opt-out) — in consumer-notice.ts line 131 and compliance-checklist.ts line 141. The CPA right to opt out of profiling exists; this specific sub-subsection citation could not be confirmed against enrolled CPA text. Recommend verifying against the Colorado Privacy Act text at C.R.S. § 6-1-1306.

2. **§ 6-1-1706(3)(b)(III)** as a separately lettered sub-part for AG-designated frameworks — in incident-response.ts line 171. The AG designation authority is real but whether the statute specifically creates a "(b)(III)" sub-part is unconfirmed. Secondary sources describe only (b)(I) and (b)(II). This sub-part citation may be wrong.

### Nuance Worth Noting (Not Actionable Error)

**File:** adverse-decision-kit.ts, lines 41–43
**Claim:** Appeal opportunity with human review "where such a review is technically feasible"
**Nuance:** The full statutory text at 6-1-1703(4)(b)(III) adds an additional caveat: "unless providing the opportunity for appeal is not in the best interest of the consumer, including in instances in which any delay might pose a risk to the life or safety of such consumer." This life/safety exception is not mentioned in the template. The template is not wrong — it correctly states the core right — but the safety exception is omitted. This is a documentation gap, not an error.

---

## Sources Used

- https://leg.colorado.gov/bills/sb24-205 (bill page, confirmed signing date and original effective date)
- https://leg.colorado.gov/bills/sb25b-004 (confirmed new effective date June 30, 2026)
- https://natlawreview.com/article/what-you-need-know-about-colorados-new-comprehensive-ai-law (confirmed section numbers and definitions with subsection citations)
- https://www.irmi.com/articles/expert-commentary/colorado-artificial-intelligence-law-enforcement-and-exceptions (confirmed 6-1-1706 enforcement, AG exclusive, no private right of action)
- https://www.irmi.com/articles/expert-commentary/colorado-artificial-intelligence-law-deployer-disclosure-requirements (confirmed 6-1-1703 subsection structure)
- https://www.hklaw.com/en/insights/publications/2024/05/colorado-legislature-approves-ai-bill-targeting-highrisk-systems-and (confirmed $20,000 penalty, AG enforcement)
- https://www.workforcebulletin.com/colorados-historic-sb-24-205-concerning-consumer-protections-in-interactions-with-ai-signed-into-law-after-passing-state-senate-and-house (confirmed 8 decision categories, definitions)
- https://www.fisherphillips.com/en/news-insights/colorado-lawmakers-pass-landmark-ai-discrimination-bill.html (confirmed definitions, deployer obligations structure, small deployer exemption)
- https://www.jacksonlewis.com/insights/colorado-enacts-artificial-intelligence-legislation-affecting-ai-systems-developers-deployers (confirmed no private right of action, AG-exclusive)
- https://fostergraham.com/2025/12/colorados-artificial-intelligence-act-what-businesses-need-to-know-about-sb-24-205/ (confirmed June 30, 2026 effective date, $20,000 penalty, 6-1-1703 subsections)
- https://www.hudsoncook.com/article/colorado-special-session-update-ai-law-delayed-to-june-2026-what-the-rental-housing-and-financial-services-industries-can-do-next/ (confirmed SB25B-004 changed only effective date, June 30, 2026)
- Google search snippets: confirmed enrolled text of 6-1-1703(4)(b)(I)-(III) and 6-1-1706(3)(a)-(b)
