# Legal Claims Audit — AI Compliance Documents
**Auditor:** Legal Claims Agent
**Date:** 2026-03-24
**Scope:** regulations.ts penalty/date fields, Colorado landing page, product pages, blog posts

---

## Audit Methodology

All claims examined were cross-referenced against each other for internal consistency and flagged where:
- The claim is a specific dollar amount, statutory citation, or legal requirement with no inline source
- Internal inconsistencies exist between files (e.g., blog vs. regulations.ts vs. landing page)
- A claim references a law that may not exist or may have a different status than stated
- An effective date or enforcement status requires external verification

**Reminder:** This audit does NOT verify claims from training knowledge. Every flag below identifies what needs external primary-source verification and why it was flagged.

---

## SECTION 1 — regulations.ts: Penalty Amounts (penaltySummary / maxPenalty)

### FLAG 1.1 — Illinois HB3773: Penalty Act Citation Discrepancy
**Claim (regulations.ts line 361):**
> "Civil penalties imposed by the Illinois Human Rights Commission per 775 ILCS 5/8A-104(K) (as amended by P.A. 104-0425): up to $16,000 (first violation), $42,500 (second within 5 years), $70,000 (two+ within 7 years)"

**Conflicting claim (blog post `ai-compliance-penalties-by-state.mdx`, microFacts):**
> "The Illinois Human Rights Act penalty schedule was last updated by Public Act 102-0233, which increased the maximum per-violation penalty for repeat offenders to $70,000"

**Why flagged:** Two different Public Act numbers are cited for the same amendment: `P.A. 104-0425` in regulations.ts and `P.A. 102-0233` in the blog. Only one can be correct. If the wrong act is cited on a product page, it undermines the "verified against statute" credibility claim.

**Verification needed:** Confirm which Public Act amended 775 ILCS 5/8A-104 to establish the $16,000/$42,500/$70,000 tiered schedule — P.A. 102-0233 or P.A. 104-0425. Check Illinois General Assembly enrolled text.

**Locations:**
- `src/data/regulations.ts` line 361 (illinois-hb3773 penaltySummary)
- `src/data/regulations.ts` line 1386 (repeat, same P.A. 104-0425 citation)
- `content/blog/ai-compliance-penalties-by-state.mdx` line 22 (P.A. 102-0233)

---

### FLAG 1.2 — Multi-State Employer Bundle: Summarized Illinois Penalty Strips Tiers
**Claim (regulations.ts line 183):**
> "IL: up to $70,000 per violation (775 ILCS 5/8A-104(K))"

**Issue:** The $70,000 figure is the maximum for repeat offenders (two+ violations within seven years). The first-offense maximum is $16,000. Citing only $70,000 without the tiered structure could mislead customers about the actual enforcement exposure for a first violation.

**Why flagged:** The `multi-state-employer-ai-disclosure` product penaltySummary omits the tiered structure that the individual `illinois-hb3773` product correctly describes. A customer reading only the bundle product might believe a first violation costs $70,000.

**Verification needed:** Confirm whether the bundle product page displays a simplified maximum without the tier context. Assess whether "up to $70,000" without tiers constitutes a misleading statement. (Internal consistency issue — no external source needed, but editorial fix may be required.)

**Location:** `src/data/regulations.ts` line 183

---

### FLAG 1.3 — California CCPA ADMT: "In-Effect" Status vs. Actual Regulatory Status
**Claim (regulations.ts lines 388-389):**
> `status: "in-effect"`
> `effectiveDate: "January 1, 2026"`

**Claim (description, line 395):**
> "California's new ADMT regulations require documented risk assessments starting January 1, 2026 and consumer-facing opt-out and notice requirements by January 1, 2027."

**Why flagged:** The CPPA ADMT regulations have had a contested regulatory history. As of early 2026, there were reports that the CPPA paused or withdrew the ADMT rulemaking following legal challenges and board decisions. The claim that ADMT regulations are "in-effect" as of January 1, 2026 requires primary-source verification — this is a specific legal status claim that could be wrong if the CPPA withdrew or delayed the final rules.

**Verification needed:** Confirm the current status of the CPPA ADMT regulations at cppa.ca.gov. Are they: (a) finalized and in effect January 1, 2026, (b) finalized but delayed, or (c) withdrawn/still in rulemaking? The product page's `status: "in-effect"` and the January 2026 risk assessment deadline are both contingent on this.

**Locations:**
- `src/data/regulations.ts` lines 388–396 (california-ccpa-admt entry)
- `content/blog/california-ccpa-admt-risk-assessment-compliance-2026.mdx` (entire blog post)
- `content/blog/ai-compliance-penalties-by-state.mdx` lines 160–175

---

### FLAG 1.4 — California AI Incident Response: "TFAIA 15-Day Reporting" Claim
**Claim (regulations.ts lines 683–689):**
> "California TFAIA requires incident reporting within 15 days."

**Also in:** `ai-incident-response-plan` product description, `src/lib/pdf-incident-response/incident-report-template.ts` line 410 (which partially walks back the claim: "applies only to large frontier AI developers meeting specific compute and revenue thresholds — verify applicability and current reporting timeline with legal counsel").

**Why flagged:** "California TFAIA" appears to refer to California SB 53. The "15 days" incident reporting timeline is a specific legal requirement. The PDF template itself includes a disclaimer that this applies only to large frontier AI developers — but the product-level penaltySummary and maxPenalty fields state it more broadly as applying to any customer. The disconnect between the specific scope disclaimer in the PDF and the broader claim on the product page is a legal accuracy risk.

**Verification needed:** Confirm the exact scope and timeline of CA SB 53 incident reporting: does "15 days" appear in the enacted text, does it apply to all AI deployers or only frontier AI developers above specific thresholds, and is this the correct statute (SB 53 / Cal. Bus. & Prof. Code §§ 22757.10–22757.18)?

**Locations:**
- `src/data/regulations.ts` lines 683–689 (ai-incident-response-plan)
- `src/lib/pdf-incident-response/incident-report-template.ts` line 410

---

### FLAG 1.5 — HIPAA Penalties: "$2.1M per violation category per year" Claim
**Claim (regulations.ts line 910):**
> "HIPAA penalties up to $2.1M per violation category per year."

**Why flagged:** HIPAA civil penalty tiers are set by statute (42 U.S.C. § 1320d-5) and have been updated by HHS rulemaking over time. The "$2.1M" figure is a specific dollar amount that requires verification against current HHS regulations. HHS periodically adjusts civil money penalty amounts for inflation under the Federal Civil Penalties Inflation Adjustment Act. The current adjusted maximum may differ from the stated amount.

**Verification needed:** Confirm the current annual penalty cap for a single HIPAA violation category from the HHS OCR enforcement page or 45 CFR Part 160. The $2.1M figure needs a primary HHS source to verify it reflects current (2025/2026) adjusted amounts.

**Location:** `src/data/regulations.ts` line 910 (healthcare-ai-compliance penaltySummary/maxPenalty)

---

### FLAG 1.6 — COPPA Penalties: "$50,120 per violation" Claim
**Claim (regulations.ts lines 910, 983–984):**
> "COPPA penalties up to $50,120 per violation" (healthcare-ai-compliance)
> "COPPA: FTC penalties up to $50,120 per violation" (education-k12-ai)

**Why flagged:** The FTC adjusts COPPA civil penalty amounts annually for inflation under 16 CFR Part 1. "$50,120" is a specific inflation-adjusted figure. The amount may have changed since these figures were set. If the current (2026) FTC-adjusted amount differs, the stated figure is wrong.

**Verification needed:** Confirm the current FTC civil penalty maximum for COPPA violations at ftc.gov or in the Federal Register for the most recent annual inflation adjustment.

**Locations:**
- `src/data/regulations.ts` line 910 (healthcare-ai-compliance)
- `src/data/regulations.ts` line 983 (education-k12-ai)

---

### FLAG 1.7 — CFPB Penalties: "$1M per day" Claim
**Claim (regulations.ts line 947–948):**
> "CFPB penalties up to $1M per day for violations."

**Why flagged:** The CFPB has a tiered civil money penalty structure under 12 U.S.C. § 5565(a)(2). The tiers are approximately $5,000/day (tier 1), $25,000/day (tier 2/reckless), and $1,000,000/day (tier 3/knowing). The "$1M per day" figure is the maximum tier-3 penalty for knowing violations, not the standard penalty. Presenting this as the CFPB maximum without qualification could overstate typical enforcement exposure.

**Internal cross-check:** The internal PDF document `src/lib/pdf-financial-services-ai/cfpb-udaap-compliance.ts` line 178 accurately states: "Civil money penalties up to $5,000 per day for violations; $25,000 per day for reckless violations; $1,000,000 per day for knowing violations (12 U.S.C. § 5565(a)(2))." The product-level penaltySummary omits this nuance.

**Verification needed:** Confirm whether the product-level summary of "$1M per day" accurately represents CFPB's typical enforcement posture or only the maximum tier-3 amount. Also confirm that the 12 U.S.C. § 5565 amounts have not been inflation-adjusted since the figures were set.

**Locations:**
- `src/data/regulations.ts` line 947 (financial-services-ai penaltySummary)
- `src/lib/pdf-financial-services-ai/cfpb-udaap-compliance.ts` line 178 (more accurate three-tier breakdown)

---

### FLAG 1.8 — Delaware PDPA: Cure Period Expiration Date
**Claim (regulations.ts line 116):**
> "60-day cure period until December 31, 2025; AG discretion after (§ 12D-111)."

**Why flagged:** As of the audit date (March 24, 2026), the December 31, 2025 cure period has expired. The penaltySummary still reads as if the cure period is active ("until December 31, 2025"). Customers reading this may believe there is still a cure period when there is not.

**Verification needed:** Confirm the cure period language has expired and that the penaltySummary should be updated to state "cure period expired December 31, 2025; AG now has enforcement discretion." (Primarily an editorial accuracy issue — the underlying statutory claim appears correct but stale.)

**Location:** `src/data/regulations.ts` line 116 (delaware-pdpa penaltySummary)

---

### FLAG 1.9 — Connecticut CTDPA: Cure Period Expiration Date
**Claim (regulations.ts line 253):**
> "Mandatory 60-day cure period expired December 31, 2024; AG has enforcement discretion after that date."

**Status:** This claim is correctly stated as past-tense expired. No flag for accuracy. Noted as correctly handled for comparison.

---

### FLAG 1.10 — Oregon CPA: Cure Period "Until January 1, 2026"
**Claim (regulations.ts line 289):**
> "30-day cure period until January 1, 2026 (§ 646A.589(2)); AG has enforcement discretion after that date."

**Why flagged:** As of March 24, 2026, the January 1, 2026 cure period has passed. The penaltySummary language is present-tense ("until January 1, 2026") rather than past-tense. Customers may not realize the cure period has expired.

**Verification needed:** Confirm whether the Oregon AG has issued any guidance or enforcement actions under the CPA since the cure period expired. Update the penaltySummary to reflect the current (post-January 2026) enforcement posture.

**Location:** `src/data/regulations.ts` line 289 (oregon-cpa penaltySummary)

---

### FLAG 1.11 — Minnesota MCDPA: Cure Period and Warning Period
**Claim (regulations.ts line 325):**
> "30-day AG cure period for warnings expired January 31, 2026 (§ 325M.20(a))."

**Status:** Correctly stated as expired. No flag for accuracy.

---

### FLAG 1.12 — Colorado SB 24-205: Penalty Structure and Statute Reference
**Claim (regulations.ts line 436 and colorado-ai-compliance/page.tsx line 266):**
> "Up to $20,000 per violation (§ 6-1-112(1)(a)). Up to $50,000 per violation involving persons age 60+ (§ 6-1-112(1)(c))."

**Why flagged for verification:** SB 24-205 violations are enforced as deceptive trade practices under the Colorado Consumer Protection Act, so the penalty figures derive from C.R.S. § 6-1-112 rather than SB 24-205 itself. The blog post correctly explains this enforcement mechanism. The landing page and regulations.ts both cite § 6-1-112(1)(a) and § 6-1-112(1)(c) directly. These subsection references are specific and require verification that (a) the subsections cited correspond to the claimed amounts and (b) the Colorado CPA penalty amounts have not been amended since SB 24-205 was enacted.

**Verification needed:** Confirm C.R.S. § 6-1-112(1)(a) states $20,000 per knowing violation and § 6-1-112(1)(c) states $50,000 for violations involving persons age 60+, as of current Colorado statute.

**Locations:**
- `src/data/regulations.ts` line 436 (colorado-sb24-205 penaltySummary)
- `src/app/colorado-ai-compliance/page.tsx` lines 257–292 (penalty strip)

---

## SECTION 2 — Effective Dates

### FLAG 2.1 — California CCPA ADMT: Dual Deadline Claim
**Claim (regulations.ts line 395):**
> "California's new ADMT regulations require documented risk assessments starting January 1, 2026 and consumer-facing opt-out and notice requirements by January 1, 2027."

**Why flagged:** These two separate deadlines (risk assessments by Jan 2026, consumer notices by Jan 2027) appear to be claims about finalized CPPA regulatory text. If the ADMT rulemaking was delayed or withdrawn (see FLAG 1.3), both deadlines may be inaccurate or inapplicable. The dual-deadline claim also needs a primary CPPA source citation — it is stated as settled fact without inline source.

**Verification needed:** Confirm both deadlines from the finalized CPPA ADMT regulation text at cppa.ca.gov/regulations/. If the rules were not finalized by January 2026, the product description is factually incorrect.

**Location:** `src/data/regulations.ts` line 395

---

### FLAG 2.2 — Indiana ICDPA: Effective Date "January 1, 2026" with "effective-soon" Status
**Claim (regulations.ts lines 1198–1199):**
> `status: "effective-soon"`
> `effectiveDate: "January 1, 2026"`

**Why flagged:** As of March 24, 2026, January 1, 2026 is in the past. The status is still `"effective-soon"` which displays as "EFFECTIVE SOON" on the product page. The law is now past its effective date but the status badge has not been updated to `"in-effect"`.

**Verification needed:** Confirm Indiana ICDPA took effect January 1, 2026 as stated. Update `status` to `"in-effect"` if confirmed. (Primarily an editorial update — the date claim itself appears correct but the status badge is stale.)

**Location:** `src/data/regulations.ts` lines 1198–1199

---

### FLAG 2.3 — Kentucky KCDPA: Effective Date "January 1, 2026" with "effective-soon" Status
**Same issue as FLAG 2.2.**
`status: "effective-soon"` but `effectiveDate: "January 1, 2026"` — past as of audit date.

**Location:** `src/data/regulations.ts` lines 1270–1271

---

### FLAG 2.4 — EU AI Act: Staggered Effective Dates — Ongoing Accuracy
**Claim (regulations.ts line 466):**
> `effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026"`

**Why flagged:** The EU AI Act has a complex phased implementation. "Prohibited AI Feb 2025" and "GPAI Aug 2025" are now in the past. "Annex III high-risk Aug 2026" is upcoming (as of audit date). The product is marked `status: "in-effect"` which is partially accurate (some provisions are in effect) but may confuse customers who need to know which provisions apply now vs. later.

**Verification needed:** Confirm Aug 2026 is the correct deadline for Annex III high-risk systems from EUR-Lex Regulation (EU) 2024/1689. Confirm the Feb 2025 and Aug 2025 dates were met on schedule or whether any EU implementation delays occurred.

**Location:** `src/data/regulations.ts` line 466

---

## SECTION 3 — Colorado Landing Page

### FLAG 3.1 — "AG Rulemaking Has Not Begun" — Temporal Accuracy
**Claim (colorado-ai-compliance/page.tsx line 454–458):**
> "As of March 2026, the Colorado Attorney General has not published proposed rules for SB 24-205. The pre-rulemaking input window is closed."

**Why flagged:** This is a time-stamped factual claim about the state of AG rulemaking. If the AG has since published proposed rules (after the page was written), this claim is outdated. The page says "March 2026" which aligns with the audit date, but this needs ongoing monitoring.

**Verification needed:** Confirm current rulemaking status at coag.gov/ai/ — have proposed rules been published as of audit date?

**Location:** `src/app/colorado-ai-compliance/page.tsx` lines 449–459

---

### FLAG 3.2 — Affirmative Defense: "NIST AI RMF and ISO/IEC 42001" Requirement
**Claim (colorado-ai-compliance/page.tsx lines 340–345, 408–411, 578–581):**
> "The affirmative defense requires two things: following NIST AI RMF or ISO/IEC 42001, and having a process to discover and cure violations."

**Why flagged:** The affirmative defense language states "NIST AI RMF **or** ISO/IEC 42001" in some places, but the page also says "following NIST AI RMF **and** ISO/IEC 42001" in the main affirmative defense callout (lines 578–581). These are contradictory — "or" vs. "and" is legally significant.

**Specific inconsistency:**
- Deep Dive sidebar (line 341): "following NIST AI RMF or ISO/IEC 42001"
- Affirmative Defense callout (line 579): "following NIST AI RMF **and** ISO/IEC 42001, or an equivalent framework"

**Verification needed:** Check the enacted text of C.R.S. § 6-1-1706(3) to confirm whether the affirmative defense requires following NIST AI RMF **or** ISO/IEC 42001 (either/or alternative frameworks) or **and** (both required). This is a binary legal distinction with significant compliance implications.

**Locations:**
- `src/app/colorado-ai-compliance/page.tsx` line 341 (sidebar: "or")
- `src/app/colorado-ai-compliance/page.tsx` line 579 (callout: "and")

---

### FLAG 3.3 — "$400 an hour" Attorney Rate Claim
**Claim (colorado-ai-compliance/page.tsx lines 595–597):**
> "They don't buy these templates instead of legal counsel. They buy them so their attorney isn't starting from a blank page at $400 an hour."

**Why flagged:** "$400 an hour" is a specific price claim about competitor/market rates. While not a legal claim, it is a comparative pricing claim with no citation. The FAQ section on the same page also uses "$400 an hour." The main homepage and FAQ page use "$400–$800 an hour."

**Status:** Internally inconsistent. Colorado page says "$400"; homepage/FAQ says "$400–$800." Neither has a source citation.

**Verification needed:** Attorney hourly billing rates for AI compliance work are a market pricing claim. No primary source is cited. This claim should either be sourced (e.g., from a legal industry survey) or qualified with language like "typically" with appropriate hedging. Without a source, this is an unverified competitor claim per the Protection Norms.

**Locations:**
- `src/app/colorado-ai-compliance/page.tsx` line 596 ("$400 an hour")
- `src/app/page.tsx` line 438 ("$400–$800 an hour")
- `src/app/faq/page.tsx` line 96 ("$400–$800 an hour")
- `src/data/faq.ts` line 37 ("$400–$800 an hour")

---

## SECTION 4 — Product Pages

### FLAG 4.1 — "$5,000–$25,000 at a law firm" Claim
**Claim (products/[slug]/page.tsx line 610):**
> "vs. $5,000–$25,000 at a law firm"

**Also appears at:**
- `src/app/page.tsx` line 334: "Hiring a law firm to build a compliance package from scratch typically runs $5,000 to $25,000."
- `src/app/colorado-ai-compliance/page.tsx` lines 601–603: "Law firm / $5,000–$25,000"
- `src/app/about/page.tsx` line 76: "The options are a $5,000+ law firm engagement"

**Why flagged:** This is a specific competitor pricing claim with no citation. "$5,000 to $25,000" for law firm compliance documentation is stated as fact without sourcing. This appears on every product page sidebar and the homepage as a key sales argument. Under the Protection Norms, competitor pricing claims require a primary source or must be clearly marked unverified.

**Verification needed:** Is there a published source (legal industry survey, bar association billing data, or comparable) that supports $5,000–$25,000 as the typical law firm cost for AI compliance documentation packages? Without a primary source, this claim should be qualified as an estimate with appropriate hedging, not stated as fact.

**Locations:**
- `src/app/products/[slug]/page.tsx` line 610 (appears on ALL product pages)
- `src/app/page.tsx` line 334
- `src/app/colorado-ai-compliance/page.tsx` lines 601–603
- `src/app/about/page.tsx` line 76

---

## SECTION 5 — Blog Posts

### FLAG 5.1 — Texas TRAIGA Blog: Law Status and Effective Date
**Blog: `content/blog/texas-traiga-hb149-ai-law-compliance-guide.mdx`**
**Claim:** "Texas signed HB 149 — the Texas Responsible Artificial Intelligence Governance Act — into law on June 22, 2025. It took effect January 1, 2026."

**Why flagged:** Texas TRAIGA (HB 149) is a significant new law. As of the audit date, this law is not represented in `regulations.ts` — there is no product for TRAIGA. The blog post describes it as in effect but the products available (Texas TDPSA) cover only data privacy, not the broader AI governance requirements of TRAIGA.

**Additional concern in blog post:** The penalty structure cited ($80,000–$200,000 uncurable, $2,000–$40,000/day continuing) is a specific statutory claim. The source cited is "HB 149 Sec. 552.105(a)" — a specific section reference. This needs external verification that the section number, penalty range, and tiered structure are accurately transcribed from the enrolled text.

**Verification needed:**
1. Confirm HB 149 was signed June 22, 2025 and took effect January 1, 2026.
2. Confirm penalty tiers at § 552.105(a): curable $10,000–$12,000; uncurable $80,000–$200,000; continuing $2,000–$40,000/day.
3. Note: The penalties-by-state blog cites "$2,000–$10,000 curable" but the TRAIGA-specific blog cites "$10,000–$12,000 curable" — an internal inconsistency requiring resolution.

**Locations:**
- `content/blog/texas-traiga-hb149-ai-law-compliance-guide.mdx` line 14 (deepDive penalty tiers: $10K–$12K curable)
- `content/blog/ai-compliance-penalties-by-state.mdx` lines 141–148 (curable range stated as $2,000–$10,000)

---

### FLAG 5.2 — Penalties Blog: Colorado "Some Circumstances, Treble Damages" Claim
**Claim (`ai-compliance-penalties-by-state.mdx` line 119):**
> "In some circumstances, treble damages for actual harm caused"

**Why flagged:** This is a specific legal remedy claim about the Colorado Consumer Protection Act. "Treble damages" under C.R.S. § 6-1-113 apply in private actions, but SB 24-205 specifically excludes private rights of action (§ 6-1-1706(6)). The statement "in some circumstances, treble damages" may be technically accurate for general Colorado CPA enforcement but misleading in the SB 24-205 context where private suits are prohibited.

**Verification needed:** Confirm whether treble damages under the Colorado CPA can apply in AG-initiated SB 24-205 enforcement (not just private actions). If treble damages are only available in private suits, this claim is misleading in the context of SB 24-205 enforcement.

**Location:** `content/blog/ai-compliance-penalties-by-state.mdx` line 119

---

### FLAG 5.3 — Penalties Blog: EEOC Initiative Link Status
**Claim (`ai-compliance-penalties-by-state.mdx` line 183):**
> Source link: "https://www.eeoc.gov/newsroom/eeoc-launches-initiative-artificial-intelligence-and-algorithmic-fairness"

**Why flagged:** The EEOC AI initiative and related guidance were rescinded or deprioritized in early 2025 under the new administration. The specific EEOC AI initiative page may have been removed or modified. This is an external link that may now return 404 or redirect to a changed page.

**Verification needed:** Confirm this EEOC URL is still live and still supports the claim it is cited for. If the EEOC AI initiative was rescinded, the factual claim that "the EEOC has been explicit that [civil rights laws] apply to AI hiring tools" may need a different source citation.

**Location:** `content/blog/ai-compliance-penalties-by-state.mdx` line 183, also `content/blog/eeoc-ai-guidance-removed-federal-vacuum-2026.mdx` (check this post specifically for EEOC guidance status claims)

---

## SECTION 6 — Product Descriptions (Unsourced Legal Requirements Claims)

### FLAG 6.1 — AI Incident Response: "California TFAIA" Scope Claims
**Product description (regulations.ts line 689):**
> "Required reporting timelines apply if you are subject to California TFAIA (15 days) or the EU AI Act"

**Why flagged:** The product description implies "California TFAIA" (SB 53) applies to customers buying this product. The PDF template itself limits the scope correctly ("applies only to large frontier AI developers meeting specific compute and revenue thresholds"). The product-level description is broader than the template's own scope disclaimer, creating a mismatch between what is marketed and what the document actually covers.

**Verification needed:** Confirm SB 53's scope — does it apply to typical SMB customers of this product, or only to large frontier AI developers? If the latter, the product description overstates applicability.

**Location:** `src/data/regulations.ts` line 689

---

### FLAG 6.2 — NIST AI RMF Description: "Colorado's law gives you a legal defense if you follow a recognized framework"
**Claim (regulations.ts line 550):**
> "Colorado's law gives you a legal defense if you follow a recognized framework like this one."

**Why flagged:** This claim is a legal characterization of the affirmative defense under C.R.S. § 6-1-1706(3). The affirmative defense requires BOTH following NIST AI RMF AND having a discovery-and-cure process (per the Colorado landing page's own more accurate description). Stating "if you follow a recognized framework like this one" — without noting the second requirement — overstates the protection this product provides.

**Internal inconsistency:** The Colorado landing page correctly states the affirmative defense requires two elements. The NIST AI RMF product description implies following NIST alone is sufficient for the defense.

**Verification needed:** Confirm the product description accurately represents the affirmative defense requirements. Update to note that the NIST framework documentation alone is not sufficient — the discovery-and-cure process is also required.

**Location:** `src/data/regulations.ts` line 550

---

## SECTION 7 — Summary Table

| Flag | Severity | Type | Location |
|------|----------|------|----------|
| 1.1 | HIGH | Internal inconsistency — conflicting Public Act numbers for Illinois penalty amendment | regulations.ts vs. blog post |
| 1.2 | MEDIUM | Incomplete — Illinois tiered penalty simplified to max figure only in bundle product | regulations.ts line 183 |
| 1.3 | HIGH | Unverified status — California ADMT "in-effect" claim needs CPPA primary source | regulations.ts, blog post |
| 1.4 | MEDIUM | Scope mismatch — TFAIA 15-day reporting broader in product description than in PDF disclaimer | regulations.ts, pdf template |
| 1.5 | MEDIUM | Unverified figure — HIPAA $2.1M penalty may be inflation-adjusted amount needing confirmation | regulations.ts |
| 1.6 | MEDIUM | Unverified figure — COPPA $50,120 inflation-adjusted penalty needs FTC confirmation | regulations.ts |
| 1.7 | MEDIUM | Oversimplified — CFPB "$1M per day" is tier-3 maximum, not typical; internal PDF is more accurate | regulations.ts vs. PDF |
| 1.8 | LOW | Stale — Delaware cure period expired December 31, 2025; still described as active | regulations.ts |
| 1.10 | LOW | Stale — Oregon cure period expired January 1, 2026; still described as future | regulations.ts |
| 2.1 | HIGH | Unverified — California ADMT dual deadlines (Jan 2026 / Jan 2027) need CPPA primary source | regulations.ts |
| 2.2 | LOW | Stale — Indiana ICDPA still shows "effective-soon" for a past date | regulations.ts |
| 2.3 | LOW | Stale — Kentucky KCDPA still shows "effective-soon" for a past date | regulations.ts |
| 2.4 | MEDIUM | Ongoing — EU AI Act staggered dates need verification that past milestones were met | regulations.ts |
| 3.1 | LOW | Time-sensitive — AG rulemaking status claim needs current verification | Colorado landing page |
| 3.2 | HIGH | Internal inconsistency — "or" vs. "and" for NIST/ISO in Colorado affirmative defense | Colorado landing page |
| 3.3 | MEDIUM | Unverified competitor pricing — attorney hourly rate claim has no source; internally inconsistent ($400 vs. $400–$800) | Multiple pages |
| 4.1 | HIGH | Unverified competitor pricing — "$5,000–$25,000 at a law firm" has no primary source | All product pages, homepage |
| 5.1 | HIGH | Internal inconsistency — Texas TRAIGA curable penalty cited as $2,000–$10,000 in one blog, $10,000–$12,000 in another | Two blog posts |
| 5.2 | MEDIUM | Legal accuracy risk — treble damages claim may not apply in AG-only enforcement context | Penalties blog |
| 5.3 | MEDIUM | Potentially dead link — EEOC AI initiative may have been rescinded | Penalties blog |
| 6.1 | MEDIUM | Scope mismatch — TFAIA incident response scope overstated at product level vs. PDF template | regulations.ts |
| 6.2 | MEDIUM | Incomplete — NIST product implies framework alone satisfies Colorado affirmative defense | regulations.ts |

---

## Highest Priority Items for Immediate Resolution

1. **FLAG 3.2** — "or" vs. "and" for Colorado affirmative defense on the landing page. This is a direct legal accuracy error with a live customer-facing page. One version is wrong.

2. **FLAG 1.3 / 2.1** — California ADMT "in-effect" status and January 2026 deadline. If the CPPA withdrew or delayed these regulations, the product, blog post, and product description are all factually incorrect.

3. **FLAG 4.1** — "$5,000–$25,000 at a law firm" on every product page. No primary source. Central to the value proposition.

4. **FLAG 1.1** — Conflicting Public Act numbers for Illinois penalty amendment (P.A. 102-0233 vs. P.A. 104-0425). One of these is wrong.

5. **FLAG 5.1** — Texas TRAIGA curable penalty discrepancy ($2,000–$10,000 vs. $10,000–$12,000) across two blog posts.

---

*All findings in this document identify claims requiring external primary-source verification. No claims in this document have been verified from training knowledge. Verification must be performed against primary sources fetched in a current session.*
