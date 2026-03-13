# Codebase Analyst Findings — Legal Audit
**Analyst:** Codebase Analyst (Claude Sonnet 4.6)
**Date:** 2026-03-12
**Scope:** All product data, PDF generators, email templates, and blog posts in `aicomplydocs`

---

## Scoring Summary

| Dimension | Score | Rationale |
|---|---|---|
| **Citation Accuracy** | 6/10 | Core citations are internally consistent. Two significant issues: CO effective date discrepancy and IL HB3773 effective date claim in blog. |
| **Disclaimer Coverage** | 8/10 | PDF footer and top-of-document disclaimers are consistently applied. Email footer has a disclaimer. Blog posts have none. |
| **Claim Consistency** | 5/10 | The Colorado $20,000 penalty figure appears in blogs but has no basis cited in the statutory text. The effective date for CO is split: `regulations.ts` says June 30, `pdf-helpers.ts` says February 1. |
| **Cross-Reference Integrity** | 7/10 | Illinois statute cited identically across all files. CO statute sections cited consistently with one critical exception. |
| **Overall Risk** | 5/10 | Two legally material inaccuracies identified. The $20,000 penalty claim is asserted as fact in two blog posts without citation. The CO effective date split is contradicted internally. |
| **Reversibility** | 9/10 | All identified issues are string/content changes in a small number of files. No structural changes required. |
| **Evidence Confidence** | 9/10 | All findings are from direct file reads with precise line references. |

---

## Part 1: Legal Citation Inventory

### Illinois HB3773

| Citation Form | Source File | Line(s) | Notes |
|---|---|---|---|
| `775 ILCS 5/2-102(L)` | `regulations.ts` | 178 | Canonical form |
| `775 ILCS 5/2-102(L)` | `regulation-config.ts` | 6 | Matches |
| `775 ILCS 5/2-102(L)` | `pdf-helpers.ts` | 75 | Matches, adds `P.A. 103-804, eff. 1-1-26` |
| `Illinois HB3773 (775 ILCS 5/2-102(L))` | `route.ts` | 18 | Matches |
| `Illinois HB3773 / AI Discrimination Act (775 ILCS 5/2-102(L), eff. 1-1-26)` | `due-diligence-questionnaire.ts` | 349 | Matches |
| `(C.R.S. §§ 6-1-1701–1707, eff. 2-1-26)` | `due-diligence-questionnaire.ts` | 355 | **DISCREPANCY — see Part 3** |
| `775 ILCS 5/2-102(L)(2)` | `notification-letter.ts` | 32 | Subsection-specific, correct |
| `775 ILCS 5/2-102(L)(1)` | `notification-letter.ts` | 148 | Subsection-specific, correct |
| `775 ILCS 5/2-102(L)(2)` | `notification-letter.ts` | 290 | Matches |
| `56 Ill. Adm. Code Part 2520, Subpart J` | `notification-letter.ts` | 32, 290 | Proposed rules, correctly flagged as pending |
| `775 ILCS 5/7A-102` | `notification-letter.ts` | 222 | IDHR charge filing citation |
| `775 ILCS 5/8A-104` | `notification-letter.ts` | 223 | Civil action remedies citation |
| `SB 2487` | `notification-letter.ts` | 223 | Civil penalties reference |
| `775 ILCS 5/2-102(L)` | `contract-addendum.ts` | 34, 156, 325 | Matches |
| `775 ILCS 5/2-102` | `ai-compliance-small-business.mdx` | 44 | Matches |
| `Illinois Human Rights Act (775 ILCS 5/2-102)` | `ai-compliance-small-business.mdx` | 44 | Correct parent act reference |

**Illinois citation assessment:** Consistent and correct across all files. The subsection-level citations (`(L)(1)`, `(L)(2)`) are used appropriately and match their stated purposes. The proposed IDHR rules (Subpart J) are consistently and accurately flagged as "proposed, pending formal adoption" — good protective language. The `SB 2487` reference at `notification-letter.ts:223` is a bare bill number with no additional context; this should be verified against the enacted statute citation for civil penalties.

---

### Colorado SB24-205

| Citation Form | Source File | Line(s) | Notes |
|---|---|---|---|
| `C.R.S. § 6-1-1701 et seq.` | `regulations.ts` | 327 | Correct form |
| `C.R.S. §§ 6-1-1701–1707` | `regulation-config.ts` | 53 | More specific, correct |
| `C.R.S. §§ 6-1-1701 through 6-1-1707` | `regulation-config.ts` | 57 | Matches |
| `C.R.S. §§ 6-1-1701 through 6-1-1707` | `pdf-helpers.ts` | 82 (Colorado statute line) | Correct |
| `C.R.S. §§ 6-1-1701–1707` | `route.ts` | 31 | Matches |
| `§ 6-1-1703(1)` through `§ 6-1-1703(7)` | `risk-management-policy.ts` | 29–94 | Subsections cited extensively and consistently |
| `§ 6-1-1703(4)(a)`, `§ 6-1-1703(4)(c)`, `§ 6-1-1704` | `consumer-notice.ts` | 32–44, 52, 59 | Consistent |
| `C.R.S. § 6-1-1703(2)` | `due-diligence-questionnaire.ts` | 180 | Matches |
| `C.R.S. §§ 6-1-1701 through 6-1-1707` | `contract-addendum.ts` | 33, 155, 323 | Matches |
| `C.R.S. § 6-1-1703(7)` | `contract-addendum.ts` | 248 | 90-day AG self-report, consistent with IRP |
| `[C.R.S. §§ 6-1-1701 through 6-1-1707]` | All Colorado blog posts | multiple | Linked to leg.colorado.gov correctly |

**Colorado citation assessment:** Section-level citations are consistent across all files. The subsection-level citations (`§ 6-1-1703(2)`, `(3)`, `(4)`, `(5)`, `(7)`) are all internally self-consistent and map to the claimed obligations (risk management, impact assessment, consumer notice, transparency, incident reporting). One major effective date discrepancy documented in Part 3.

---

### NYC Local Law 144

| Citation Form | Source File | Line(s) | Notes |
|---|---|---|---|
| `NYC Admin. Code § 20-870 et seq.` | `regulations.ts` | 34 | Standard form |
| `NYC LL144 §20-871(b)` | `bias-audit-report.ts` | 134 | Subsection-level |
| `NYC LL144 § 20-871(b)(1)` | `bias-audit-report.ts` | 470 | Independence requirement |
| `NYC LL144 § 20-871(b)(2)` | `bias-audit-report.ts` | 395 | Annual requirement |
| `Admin. Code § 20-871 et seq.` | `bias-audit-report.ts` | 32 | Matches |
| `NYC Local Law 144 (Admin. Code § 20-871 et seq.)` | `due-diligence-questionnaire.ts` | 362 | Matches |

**Note:** `regulations.ts` uses `§ 20-870` as the citation root; `bias-audit-report.ts` uses `§ 20-871`. These are different section numbers. The Admin Code numbering for LL144 begins at § 20-870 (definitions) with substantive requirements at § 20-871. Both are correct for their stated purposes but may cause confusion if compared side-by-side without context.

---

### Other Citations

| Citation | Source File | Line(s) | Notes |
|---|---|---|---|
| `EEOC Uniform Guidelines (29 C.F.R. § 1607)` | `route.ts` | 73 | Correct |
| `EEOC Uniform Guidelines 29 C.F.R. § 1607.4` | `bias-audit-report.ts` | 204 | Correct, more specific |
| `29 C.F.R. § 1607.4(D)` | `bias-audit-report.ts` | 240 | 4/5 rule citation, correct |
| `EEOC Uniform Guidelines on Employee Selection Procedures (29 C.F.R. Part 1607)` | `bias-audit-report.ts` | 32 | Full-form, correct |
| `NIST AI 100-1` | `regulations.ts` | 481 | Correct designation |
| `Regulation (EU) 2024/1689` | `regulations.ts` | 415; `due-diligence-questionnaire.ts` | Correct |
| `EU AI Act Article 73` | `incident-response-plan.ts` | 39, 495, 499 | Correct article for serious incident reporting |
| `EU AI Act Article 3(49)` | `incident-response-plan.ts` | 241, 497 | "Serious incident" definition article, correct |
| `NIST AI RMF MEASURE 2.5` | `bias-audit-report.ts` | 348 | Specific sub-function reference |
| `Cal. Gov. Code § 11547.6` | `regulations.ts` | 207 | California TFAIA |
| `Cal. Civ. Code § 3273` | `regulations.ts` | 237 | California AB 2013 |
| `Cal. Civ. Code § 1798.100 et seq.` | `regulations.ts` | 264 | CCPA ADMT |
| `Cal. Bus. & Prof. Code § 22770 et seq.` | `regulations.ts` | 388 | California SB 942 |
| `N.Y. Gen. Bus. Law Art. 43` | `regulations.ts` | 294 | NY RAISE Act |
| `N.J.A.C. 13:13` | `regulations.ts` | 149 | NJ LAD AI rules |
| `Minn. Stat. Ch. 325O` | `regulations.ts` | 91 | Minnesota MCDPA |
| `Tex. Bus. & Com. Code Ch. 120` | `regulations.ts` | 119 | Texas TRAIGA |
| `Utah Code § 13-72` | `regulations.ts` | 64 | Utah AI Policy Act |
| `NYC Admin. Code § 20-870 et seq.` | `regulations.ts` | 34 | NYC LL144 |

---

## Part 2: Penalty Claims Inventory

| Penalty Claim | Source File | Line(s) | Enforcement Agency |
|---|---|---|---|
| `$500 (first), $500-$1,500 per subsequent violation per day` | `regulations.ts` | 44 | NYC DCWP |
| `$1,500 per violation per day` (maxPenalty) | `regulations.ts` | 45 | NYC DCWP |
| `$2,500 per violation` | `regulations.ts` | 75 | Utah DCP |
| `$7,500 per violation` | `regulations.ts` | 101 | MN AG |
| `$200,000 per violation` | `regulations.ts` | 129 | TX AG |
| `Uncapped damages` | `regulations.ts` | 159 | NJ DCR |
| `$16,000 (first), $42,500 (second within 5 years), $70,000 (two+ within 7 years)` | `regulations.ts` | 188 | IDHR |
| `$70,000 per violation` (maxPenalty) | `regulations.ts` | 189 | IDHR |
| `$1,000,000 per violation` (CA TFAIA) | `regulations.ts` | 217 | CA AG |
| `$2,500 / $7,500 per intentional violation` (CCPA ADMT) | `regulations.ts` | 274 | CPPA |
| `$5,000 per willful violation` (CT SB 1295) | `regulations.ts` | 368 | CT AG |
| `€35M or 7% global turnover` (EU AI Act) | `regulations.ts` | 425 | National authorities |
| `$2.1M per violation category` (HIPAA) | `regulations.ts` | 631 | HHS |
| `$50,120 per violation` (COPPA) | `regulations.ts` | 631 | FTC |
| `$1M per day` (CFPB) | `regulations.ts` | 662 | CFPB |
| `$50,120 per COPPA violation` | `regulations.ts` | 693 | FTC |
| `Per-violation CPA penalties` (CO SB24-205) | `regulations.ts` | 337 | CO AG |
| **`$20,000 per violation`** | `colorado-ai-law-penalties.mdx` | 11, 44, 48–52, 111 | CO AG |
| **`$20,000 per violation`** | `colorado-sb24-205-guide.mdx` | 111 | CO AG |
| **`up to $20,000 per violation`** | `route.ts` | 40 | CO AG |

---

## Part 3: Critical Issues

### ISSUE 1 — CRITICAL: Colorado Effective Date Split

**Nature:** The effective date for Colorado SB24-205 is stated differently in two files.

| File | Line | Value |
|---|---|---|
| `regulations.ts` | 330 | `"June 30, 2026"` |
| `regulation-config.ts` | 57 | acknowledgment text: `"effective June 30, 2026 per SB 25B-004"` |
| `pdf-helpers.ts` | 82 | `"C.R.S. §§ 6-1-1701 through 6-1-1707 — Consumer Protections for AI (SB 24-205, eff. 2-1-26)"` |
| `due-diligence-questionnaire.ts` | 355 | `"Colorado SB205 / Consumer Protections for AI (C.R.S. §§ 6-1-1701–1707, eff. 2-1-26)"` |

**The conflict:** `regulations.ts` and `regulation-config.ts` both state **June 30, 2026**. The `pdf-helpers.ts` REGULATION_HEADER for colorado-sb24-205 and the questionnaire checkbox in `due-diligence-questionnaire.ts` both state **February 1, 2026 (eff. 2-1-26)**.

This means every PDF generated for a Colorado customer has the wrong effective date stamped in its header. The header reads: `"SB 24-205, eff. 2-1-26"` but the actual effective date is June 30, 2026. The regulation-config acknowledgment text correctly references `"effective June 30, 2026 per SB 25B-004"` — confirming the June 30 date is believed to be correct, which makes the `pdf-helpers.ts` value definitively wrong.

**Blast radius:** The incorrect date appears in the header of every generated Colorado PDF document via `addDocHeader()` → `REGULATION_HEADER["colorado-sb24-205"].statute` in `pdf-helpers.ts:82`. Specifically affects: Risk Management Policy, Consumer Notice, and all other Colorado PDF generators. It does not affect the blog posts or the regulations.ts product page.

**Files to fix:**
- `C:\Users\baenb\projects\project _cameron\aicomplydocs\src\lib\pdf-helpers.ts` line 82: Change `eff. 2-1-26` to `eff. 6-30-26`
- `C:\Users\baenb\projects\project _cameron\aicomplydocs\src\lib\pdf-vendor-due-diligence\due-diligence-questionnaire.ts` line 355: Change `eff. 2-1-26` to `eff. 6-30-26`

---

### ISSUE 2 — HIGH: Colorado $20,000 Penalty Figure — Unverified Claim in Blog Posts

**Nature:** The two Colorado blog posts assert a specific civil penalty of `$20,000 per violation` as established fact, repeated across multiple passages. The regulations.ts product listing states only `"Per-violation CPA penalties"` with no dollar figure — which is the more conservative treatment.

**Evidence:**
- `colorado-ai-law-penalties.mdx` line 11: `"The civil penalty under Colorado SB24-205 is $20,000 per violation."`
- `colorado-ai-law-penalties.mdx` line 44: `"The statute sets civil penalties at up to $20,000 per violation."`
- `colorado-ai-law-penalties.mdx` lines 48–52: Three worked examples all using $20,000 as the per-violation figure
- `colorado-sb24-205-guide.mdx` line 111: `"Civil penalties can reach up to $20,000 per violation"`
- `route.ts` line 40: `"Penalties: up to $20,000 per violation under CCPA."` (Note: says "CCPA" — likely means Colorado Consumer Protection Act)
- `regulations.ts` line 337: `"Per-violation CPA penalties"` — no dollar amount stated

**The risk:** The Colorado Artificial Intelligence Act (SB24-205) does not set a standalone penalty amount within its own text. The statute enforces through the Colorado Consumer Protection Act (CCPA), which has its own penalty scale. If the $20,000 figure is wrong, or applies only under specific circumstances (e.g., willful violation vs. first offense), the blog posts are overstating a legal claim as settled fact. A plaintiff's attorney reviewing this content would immediately check the statutory penalty amount and could use a discrepancy to undermine credibility.

**Additional flag:** `route.ts:40` says "under CCPA" — this is the right framing (enforcement through the Colorado Consumer Protection Act), but the acronym collision with the California CCPA could create confusion.

**Recommended action:** Verify the $20,000 figure against the actual Colorado Consumer Protection Act penalty provisions that SB24-205 enforcement flows through. If verified, add a citation to the specific CCPA section. If unverified, revise blog language to say "civil penalties available under the Colorado Consumer Protection Act" without specifying a dollar amount.

---

### ISSUE 3 — MEDIUM: Illinois HB3773 Effective Date Claim in Blog

**Nature:** The `what-is-illinois-hb3773.mdx` blog post states at line 19: `"went into effect in 2023."` The actual effective date per all other files is **January 1, 2026**.

**Evidence:**
- `what-is-illinois-hb3773.mdx` line 19: `"Illinois HB3773 — officially an amendment to the Illinois Human Rights Act (775 ILCS 5/2-102(L)) — went into effect in 2023."`
- `regulations.ts` line 181: `"effectiveDate: "January 1, 2026"`
- `regulation-config.ts` line 11: acknowledgment text mentions `"IDHR implementing rules (Subpart J) are proposed and pending formal adoption"` — consistent with Jan 2026 effective date
- `pdf-helpers.ts` line 75: `"P.A. 103-804, eff. 1-1-26"`
- `route.ts` line 26: `"This law has been in effect since January 1, 2026."`
- `notification-letter.ts` line 32: `"P.A. 103-804, eff. January 1, 2026"`

**Explanation:** Illinois passed an earlier AI Video Interview Act (AIVIA) in 2020, which may be what the blog author confused with HB3773. The HB3773 amendment to 775 ILCS 5/2-102(L) is the AI in employment decisions law, effective January 1, 2026, not 2023.

**Blast radius:** Blog only. All PDFs and product data use the correct date. However, the blog is public-facing SEO content, and a reader who relies on "went into effect in 2023" to assess their compliance timeline will draw a wrong conclusion.

**File to fix:** `C:\Users\baenb\projects\project _cameron\aicomplydocs\content\blog\what-is-illinois-hb3773.mdx` line 19.

---

### ISSUE 4 — MEDIUM: Illinois Blog Overstates Remedy Rights

**Nature:** `what-is-illinois-hb3773.mdx` line 64 states: `"There's no cap on actual damages."` The product data at `regulations.ts` line 188 states tiered IDHR civil penalties ($16,000 / $42,500 / $70,000), which are capped. The notification letter at line 223 states `"IDHR may assess civil penalties against employers found in violation. (SB 2487)"` and cites actual damages available via civil action.

**The nuance:** The claim "no cap on actual damages" is plausible for private civil actions under the IHRA (actual damages are not capped under the IHRA for civil actions generally), but the blog does not distinguish between IDHR civil penalties (which are capped by tier) and actual damages in civil litigation. This conflation could be misleading. A plaintiff's attorney reviewing the blog could argue the product is characterizing the law in a misleading way favorable to plaintiffs.

**File:** `C:\Users\baenb\projects\project _cameron\aicomplydocs\content\blog\what-is-illinois-hb3773.mdx` line 64.

---

### ISSUE 5 — LOW: Blog Post Disclaimer Coverage Gap

**Nature:** None of the six blog posts contain any disclaimer — no "not legal advice" notice, no "verify before relying" language. The PDFs have both a footer disclaimer and a prominent red top-of-document box. The emails have a footer disclaimer. The blog posts have nothing.

**Files affected:**
- `ai-compliance-small-business.mdx`
- `colorado-ai-law-penalties.mdx`
- `colorado-sb24-205-guide.mdx`
- `does-colorado-ai-law-apply-to-me.mdx`
- `how-to-write-ai-impact-assessment.mdx`
- `what-is-illinois-hb3773.mdx`

**Risk level:** Blog posts make specific legal claims (penalty amounts, compliance requirements, who is covered) without any disclaimer that this is not legal advice. A plaintiff's attorney could argue readers relied on blog content in making compliance decisions. The absence is especially notable because the PDF products are heavily disclaimed while the blog posts making many of the same substantive claims are not.

**Recommended action:** Add a site-wide or per-post disclaimer block. A short notice at the end of each post — "This post is for informational purposes only and does not constitute legal advice. Laws change. Consult a licensed attorney." — is sufficient.

---

### ISSUE 6 — LOW: SB 2487 Reference is Orphaned

**Nature:** `notification-letter.ts` line 223 cites `"(SB 2487)"` in connection with IDHR civil penalties. This is a bare bill number with no enacted statute citation. The penalty amounts in `regulations.ts` ($16,000 / $42,500 / $70,000) are not cross-referenced to a section of the Illinois Human Rights Act.

**Risk:** If SB 2487 was incorporated into the ILCS as an amendment, the proper citation is the ILCS section number, not the bill number. Bill numbers do not appear in enacted law. The notification letter is generated and delivered to employers as a compliance document — citing a bill number instead of a code section is a quality gap.

**File:** `C:\Users\baenb\projects\project _cameron\aicomplydocs\src\lib\pdf-illinois\notification-letter.ts` line 223.

---

## Part 4: Effective Date Inventory

| Regulation | Effective Date | Source | Consistent? |
|---|---|---|---|
| NYC Local Law 144 | July 5, 2023 | `regulations.ts:37` | Not contradicted |
| Utah AI Policy Act | May 1, 2024 | `regulations.ts:66` | Not contradicted |
| Minnesota MCDPA | July 31, 2025 | `regulations.ts:94` | Not contradicted |
| Texas TRAIGA | September 1, 2025 | `regulations.ts:121` | Not contradicted |
| NJ LAD AI | December 15, 2025 | `regulations.ts:152` | Not contradicted |
| Illinois HB3773 | January 1, 2026 | `regulations.ts:181`, `pdf-helpers.ts:75`, `route.ts:26`, `notification-letter.ts:32` | Consistent — **EXCEPT** blog says "2023" |
| California TFAIA | January 1, 2026 | `regulations.ts:209` | Not contradicted |
| California AB 2013 | January 1, 2026 | `regulations.ts:239` | Not contradicted |
| NY RAISE Act | March 19, 2026 | `regulations.ts:297` | Not contradicted |
| Colorado SB24-205 | **June 30, 2026** | `regulations.ts:330`, `regulation-config.ts:57`, blog posts | **SPLIT — pdf-helpers.ts and questionnaire say Feb 1, 2026** |
| Connecticut SB 1295 | July 1, 2026 | `regulations.ts:363` | Not contradicted |
| California SB 942 | August 2, 2026 | `regulations.ts:392` | Not contradicted |
| EU AI Act (high-risk) | August 2, 2026 | `regulations.ts:418` | Not contradicted |
| CA CCPA ADMT | TBD (proposed) | `regulations.ts:267` | Not contradicted; correctly marked proposed |

---

## Part 5: Disclaimer Coverage Audit

### PDF Documents

| Document | Top Disclaimer Box | Footer Disclaimer (every page) |
|---|---|---|
| Acceptable Use Policy | Present (`addTopDisclaimer`) | Present (`addDisclaimer`) |
| Vendor Questionnaire | Present | Present |
| Contract Addendum | Present | Present |
| Bias Audit Report | Present | Present |
| Incident Response Plan | Present | Present |
| IL Notification Letter | Present | Present |
| CO Risk Management Policy | Present | Present |
| CO Consumer Notice | Present | Present |

**PDF disclaimer text (footer, `pdf-helpers.ts:215–223`):**
> "TEMPLATE ONLY — NOT LEGAL ADVICE. AI Comply Docs is not a law firm and does not practice law. Generated by AI Comply Docs."
> "Based on regulations as of March 2026. You are solely responsible for verifying currency, accuracy, and applicability. Consult a licensed attorney."

**PDF disclaimer text (top box, `pdf-helpers.ts:242–244`):**
> "This document is a TEMPLATE provided for informational purposes only. It does NOT constitute legal advice, legal representation, or an attorney-client relationship. Laws and regulations change frequently. You must consult a licensed attorney to verify this template is current, complete, and applicable to your specific situation before relying on it."

**Assessment:** PDF disclaimer coverage is strong and consistent. Both the top-of-document box (prominent, red background) and per-page footer are present on all eight audited generators.

### Email Templates (`route.ts`)

Footer disclaimer at line 143:
> "These documents are templates for compliance planning purposes. They do not constitute legal advice."

**Assessment:** Present but brief. Does not include the "consult a licensed attorney" instruction present in PDFs.

### Blog Posts

**Assessment:** NO disclaimer in any of the six blog posts. All six posts make specific, factual legal claims (penalty amounts, applicability thresholds, compliance requirements) without any disclaimer language. This is the most significant disclaimer gap in the product.

### Regulation-Config Acknowledgments

Each product has a pre-purchase acknowledgment in `regulation-config.ts`. All reviewed acknowledgments contain "not legal advice" and "consult qualified legal counsel" language. Well-executed.

---

## Part 6: Product Claims Inventory

Verbatim product claims from `regulations.ts` for the two live products:

**Illinois HB3773 (`ready: true`):**
- Description (line 187): `"Complete compliance package for Illinois employers using AI in employment decisions. Addresses 775 ILCS 5/2-102(L) requirements and proposed IDHR Subpart J notice elements."`
- penaltySummary (line 188): `"IDHR civil penalties of $16,000 (first), $42,500 (second within 5 years), $70,000 (two+ within 7 years) per violation. Private lawsuits with actual damages and attorney fees."`
- appliesToSummary (line 190): `"Any Illinois employer using AI in recruitment, hiring, promotion, discharge, discipline, tenure, or terms/conditions of employment."`

**Colorado SB24-205 (`ready: true`):**
- Description (line 336): `"Complete compliance package for Colorado deployers of high-risk AI systems. Covers algorithmic discrimination prevention, impact assessments, consumer notifications, and affirmative defense documentation."`
- penaltySummary (line 337): `"Attorney General enforcement under Colorado Consumer Protection Act. Per-violation civil penalties. No private right of action."`
- appliesToSummary (line 339): `"Any deployer of a high-risk AI system that makes consequential decisions about Colorado consumers in employment, education, financial services, housing, insurance, or legal services."`

**Assessment of live product claims:**
- The Colorado penalty summary is deliberately vague ("Per-violation civil penalties") — conservative and defensible. This is the correct approach. However, it directly contradicts the blog posts claiming $20,000 per violation as a specific figure.
- The Illinois penalty tiers are specific dollar amounts. These should be verified against the enacted statute.
- The Illinois description correctly notes that IDHR Subpart J rules are "proposed" — accurate hedging.
- "No private right of action" for Colorado is stated in the product description. The `ai-compliance-small-business.mdx` blog at line 109 states "Colorado SB24-205 has private remedies as well." This is a direct contradiction between the product description and a blog post. One of these is wrong.

---

## Part 7: Critical Inconsistency — Colorado Private Right of Action

**This is a direct internal contradiction:**

- `regulations.ts` line 337 (product description): `"No private right of action."`
- `ai-compliance-small-business.mdx` line 109: `"Colorado SB24-205 has private remedies as well."`

These two statements cannot both be correct. Colorado SB24-205's enforcement structure (exclusive AG authority under § 6-1-1706) is generally understood to not include a direct private right of action, which is consistent with the product description and the `colorado-ai-law-penalties.mdx` blog (line 24: "There is no private right of action built directly into SB24-205 itself"). The `ai-compliance-small-business.mdx` claim appears to be an error.

**Files in conflict:**
- `C:\Users\baenb\projects\project _cameron\aicomplydocs\src\data\regulations.ts` line 337
- `C:\Users\baenb\projects\project _cameron\aicomplydocs\content\blog\colorado-ai-law-penalties.mdx` line 24
- `C:\Users\baenb\projects\project _cameron\aicomplydocs\content\blog\ai-compliance-small-business.mdx` line 109

The `colorado-ai-law-penalties.mdx` blog post is internally consistent with the product description (no private right of action). The `ai-compliance-small-business.mdx` post contradicts both.

---

## Summary of Issues by Priority

| # | Issue | Severity | Files |
|---|---|---|---|
| 1 | CO effective date: PDFs say Feb 1 but correct date is June 30 | **CRITICAL** | `pdf-helpers.ts:82`, `due-diligence-questionnaire.ts:355` |
| 2 | CO $20,000 penalty figure unverified in blogs | **HIGH** | `colorado-ai-law-penalties.mdx`, `colorado-sb24-205-guide.mdx`, `route.ts:40` |
| 3 | IL effective date: blog says 2023, correct date is January 1, 2026 | **HIGH** | `what-is-illinois-hb3773.mdx:19` |
| 4 | CO private right of action: blog contradicts product description | **HIGH** | `ai-compliance-small-business.mdx:109` |
| 5 | Blog posts have no "not legal advice" disclaimer | **MEDIUM** | All 6 blog posts |
| 6 | IL blog overstates damages (conflates tiered IDHR penalties with uncapped civil suit damages) | **MEDIUM** | `what-is-illinois-hb3773.mdx:64` |
| 7 | SB 2487 cited as bill number, not enacted statute citation | **LOW** | `notification-letter.ts:223` |
| 8 | NYC LL144 citation root varies (§ 20-870 vs § 20-871) | **LOW** | `regulations.ts:34` vs `bias-audit-report.ts:32` |

---

*All line numbers verified against direct file reads on 2026-03-12. READ-ONLY audit — no files modified.*
