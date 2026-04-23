# Date Integrity Audit — aicompliancedocuments.com
## Generated 2026-04-23 (audit reference date)

---

## Summary

- **Files audited:** 10 (regulations.ts, 4 state landing pages, homepage, 5 blog posts, hub page)
- **Products catalogued:** 53 (all in regulations.ts)
- **🚨 STALE (must fix):** 6
- **⚠️ NEEDS VERIFICATION:** 7
- **✅ CURRENT (verified):** 22
- **Overall date integrity: ACCEPTABLE** — Core law dates are accurate. Two significant issues require immediate attention: (1) the COPPA deadline for K-12 Education passed YESTERDAY, and (2) the Colorado blog title "91 days" is now mathematically wrong by 23 days. All other major law dates are structurally sound.

---

## 🚨 STALE — Must Fix Immediately

### 1. K-12 Education AI — COPPA Deadline Has Passed
**File:** `src/data/regulations.ts`, line 1012  
**Current text:** `effectiveDate: "COPPA compliance deadline April 22, 2026"`  
**Current status field:** `"effective-soon"`  
**What happened:** The COPPA amended rule compliance deadline of April 22, 2026 was YESTERDAY (audit date: April 23, 2026). The FTC published final COPPA amendments on April 22, 2025; companies were given exactly one year to comply. That window closed April 22, 2026.  
**Correct text:** `effectiveDate: "COPPA compliance deadline April 22, 2026 — now in effect"` and status should be updated to `"in-effect"`.  
**Impact:** The product page and any display component reading this field would still show "effective-soon" badge on a law whose deadline has passed.  
**Source:** [Toy Association — Updated COPPA Rule Requirements Take Effect April 22](https://www.toyassociation.org/PressRoom2/News/2026-News/updated-coppa-rule-requirements-take-effect-april-22.aspx); [FTC COPPA Final Rule — Federal Register](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)  
**Fix:** Change `status` to `"in-effect"` and `effectiveDate` to `"April 22, 2026"` (no longer future-framed).

Also in `src/data/regulations.ts` line 952, the `appliesToBullets` bullet reads:  
`"You collect or process health data from children under 13 (COPPA deadline: April 22, 2026)"`  
This now reads as a deadline that has passed, not a live claim. Update to: `"You collect or process health data from children under 13 (COPPA updated rule in effect April 22, 2026)"`.

---

### 2. Colorado Blog Title — "91 Days" Is Now Wrong
**File:** `content/blog/colorado-ai-law-91-days-deadline-requirements.mdx`, lines 1–3  
**Current title:** `"Colorado's AI Law Takes Effect in 91 Days. Here's What It Requires."`  
**Published:** 2026-03-31 (when June 30, 2026 was exactly 91 days away)  
**Today (2026-04-23):** June 30, 2026 is **68 days** away, not 91.  
**Impact:** Any reader landing on this page today sees a headline making a mathematical claim that is 23 days stale. The slug (`colorado-ai-law-91-days-deadline-requirements`) also embeds the stale number permanently in the URL.  
**Source:** Verified: June 30, 2026 minus April 23, 2026 = 68 days remaining.  

**Recommendation (two options):**

**Option A — Title change, preserve URL:** Change the title frontmatter to `"Colorado's AI Law Takes Effect June 30, 2026. Here's What It Requires."` This is evergreen. The slug stays the same (not ideal but avoids a broken URL). Also update the `summary` and `cardSummary` fields which repeat "91 days" language.

**Option B — Redirect + new post:** Publish a new post with an evergreen title at a clean URL, set up a 301 redirect from the old slug to the new one, and retire the old post. Best for SEO if traffic is meaningful.

**Immediate fix (minimum):** Update frontmatter `title`, `description`, `summary`, and `cardSummary` to remove "91 days" phrasing. The body paragraph at line 47 also says "now just 91 days away" — update to current day count or rephrase as "effective June 30, 2026."

---

### 3. Colorado Blog — "43 Days Until Adjournment" Statement Has Passed
**File:** `content/blog/colorado-ai-law-91-days-deadline-requirements.mdx`, line 74  
**Current text:** `"The General Assembly is scheduled to adjourn sine die on May 13, 2026 — just 43 days from today."`  
**Published date:** 2026-03-31. That made 43 days correct on publication day.  
**Today (April 23):** 20 days remain until May 13 adjournment.  
**Impact:** Minor but the "43 days from today" language is a time-relative claim embedded in prose, not a static date. Readers see a stale number.  
**Fix:** Remove or replace "just 43 days from today" with "the session adjourns May 13, 2026." (Static dates age better than relative counts.)  
Also in microFacts (line 16–18): `"No bill to amend...adjourns sine die on May 13, 2026 — just 43 days from today"` — same issue. This is in the frontmatter microFacts object.  
**Source:** Colorado General Assembly calendar — session adjourns May 13, 2026.

---

### 4. Delaware PDPA penaltySummary — Cure Period Described as Future
**File:** `src/data/regulations.ts`, line 152–153  
**Current text:** `"60-day cure period until December 31, 2025; AG discretion after (§ 12D-111)."`  
**Today (April 23, 2026):** December 31, 2025 has passed. The "until December 31, 2025" language describes a past event as though it is future context.  
**What is correct:** The mandatory 60-day cure period expired December 31, 2025. The AG now has enforcement discretion — no required warning first.  
**Correct text:** `"Mandatory 60-day cure period expired December 31, 2025; AG has enforcement discretion after (§ 12D-111). Enforcement can proceed without prior notice from January 1, 2026."`  
**Source:** [Delaware AG — PDPA FAQ](https://attorneygeneral.delaware.gov/fraud/personal-data-privacy-portal/frequently-asked-questions/)

---

### 5. Connecticut CTDPA penaltySummary — Same Issue
**File:** `src/data/regulations.ts`, line 289  
**Current text:** `"Mandatory 60-day cure period expired December 31, 2024; AG has enforcement discretion after that date."`  
**Assessment:** This text IS already correctly framed in past tense ("expired"). However, it is worth confirming the Connecticut AG is actively using this discretion.  
**Classification downgrade:** This was initially flagged as STALE but on re-read the text correctly says "expired December 31, 2024" — that is accurate. Moving to ✅ CURRENT. No action required.

---

### 6. Oregon CPA penaltySummary — Cure Period Framing
**File:** `src/data/regulations.ts`, line 325  
**Current text:** `"30-day cure period until January 1, 2026 (§ 646A.589(2)); AG has enforcement discretion after that date."`  
**Assessment:** The framing "until January 1, 2026" is now describing a past deadline. Today is April 23, 2026. The cure period has been expired for nearly four months.  
**Correct text:** `"Mandatory 30-day cure period expired January 1, 2026 (§ 646A.589(2)); AG has enforcement discretion and can bring action without prior warning."`  
**Source:** [Oregon CPA — ORS §§ 646A.570–646A.589](https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html); confirmed by multi-state comparison blog post which states "like Connecticut, that period expired on January 1, 2026."

---

### 7. Minnesota MCDPA penaltySummary — Cure Period Framing  
**File:** `src/data/regulations.ts`, line 361  
**Current text:** `"30-day AG cure period for warnings expired January 31, 2026 (§ 325M.20(a))."`  
**Assessment:** Text IS correctly framed in past tense ("expired"). The MN AG confirmed full enforcement began February 2026 with 200+ complaints already received.  
**Classification:** Already accurate — no action needed for the penaltySummary. Moving to ✅ CURRENT.

---

## ⚠️ NEEDS VERIFICATION

### V1. Colorado AG Rulemaking Status
**File:** `src/app/colorado-ai-compliance/page.tsx`, lines 462–464 and 769–772  
**Current text:** `"As of March 2026, the Colorado Attorney General has not published proposed rules for SB 24-205."`  
**Concern:** This was accurate as of March 2026 per the site's own blog post. But it is now April 23, 2026, and the Colorado AG's AI rulemaking page has not been re-verified.  
**Why uncertain:** If the AG published any pre-rulemaking notice after March 2026, this claim would be stale.  
**Suggested .gov source to check:** [coag.gov/ai/](https://coag.gov/ai/) — the Colorado AG's AI rulemaking page.  
**Note:** The blog post (colorado-ai-law-91-days-deadline-requirements.mdx, line 65) also states "no bill has been introduced" — as of late April 2026, a governor's AI Policy Working Group was reported to be working on consensus language for a possible repeal-and-replace bill, expected in early May. If a bill is introduced before the May 13 adjournment, this claim becomes stale.

---

### V2. IDHR Final Rules for Illinois HB3773
**File:** `src/app/illinois-ai-compliance/page.tsx`, lines 92–94  
**Current text:** (product description) "...ready to update when IDHR publishes its implementing rules."  
**Also in** `src/data/regulations.ts` line 395: no mention of rule status  
**Concern:** IDHR released draft AI notice regulations at some point in 2025/early 2026. If final rules have been published since the site's last check, the templates may need updating and the "when IDHR publishes" framing becomes stale.  
**Suggested .gov source:** [Illinois Department of Human Rights](https://dhr.illinois.gov/) — check for final rules under HB3773/775 ILCS 5/2-102(L).

---

### V3. California CCPA ADMT — Description Accuracy
**File:** `src/data/regulations.ts`, lines 431–432  
**Current text:** `"...requires documented risk assessments starting January 1, 2026 and consumer-facing opt-out and notice requirements by January 1, 2027."`  
**Verification:** This matches the staggered deadline structure confirmed via WebSearch. Risk assessments required Jan 1, 2026 (for new processing; by Dec 31, 2027 for pre-existing activities); ADMT notices/opt-out by Jan 1, 2027; attestation submissions due Apr 1, 2028.  
**Assessment:** Core dates are correct. However, the description omits the nuance that pre-existing processing activities have until December 31, 2027 to complete assessments (not just January 1, 2026).  
**Risk:** A customer reading this might think they needed their risk assessment finished by January 1, 2026 for all activities — including activities that predated the regulation.  
**Suggested check:** [CPPA regulation text (PDF)](https://cppa.ca.gov/regulations/pdf/ccpa_updates_cyber_risk_admt_appr_text.pdf) for exact transition rule language.

---

### V4. Hub Page — "Updated March 2026" Label
**File:** `src/app/ai-compliance-by-state/page.tsx`, line 72  
**Current text:** `"Updated March 2026"` (badge in hero)  
**Concern:** It is now April 23, 2026. Several laws have had enforcement status changes since March (Minnesota cure period expired January 31, COPPA deadline passed April 22). This label signals to users and search engines the content freshness. If the page is to be updated as part of this audit, the label should be updated to April 2026.  
**Assessment:** Not a legal fact error, but a trust/credibility issue given the site's claim to be current.  
**Recommended fix:** Update to "Updated April 2026" after applying any corrections from this audit.

---

### V5. EU AI Act — Status Field Accuracy for Add-On Kits
**Files:** `src/data/regulations.ts`, lines 1867, 1899, 1931  
**Current text for eu-post-market-kit, eu-human-oversight-kit, eu-registration-transparency:**  
`effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026"`  
`status: "in-effect"`  
**Assessment:** The `"in-effect"` status is only partially accurate. Prohibited AI rules (Feb 2, 2025) and GPAI rules (Aug 2, 2025) are in effect. But Annex III high-risk rules (the ones these add-on kits primarily address — human oversight, registration, post-market monitoring) are effective **August 2, 2026** — still 101 days away from audit date.  
**Source confirmed:** EU AI Act Regulation (EU) 2024/1689 — Annex III high-risk obligations apply from August 2, 2026 (with extended transition to August 2, 2027 for embedded product systems).  
**Risk:** The `status: "in-effect"` on the FRIA kit, post-market kit, human oversight kit, and registration kit creates false urgency for Annex III obligations that aren't yet enforceable.  
**Suggested fix:** Change `status` to `"effective-soon"` for all EU add-on kits that primarily address Annex III high-risk AI obligations, OR add explicit language in the effectiveDate field: "Annex III obligations effective August 2, 2026."  
**Note:** The main `eu-ai-act` product (slug: eu-ai-act) has `status: "in-effect"` and `effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026"` — this is accurate because the Prohibited AI and GPAI portions ARE in effect, but the overall product covering Annex IV technical documentation (which applies to Annex III systems) is still forward-dated.

---

### V6. Texas TRAIGA — Complaint Portal Date
**File:** `src/app/texas-ai-compliance/page.tsx`, line 91–94 (microFacts)  
**Current text:** `"The Attorney General's complaint portal goes live by September 1, 2026. Consumer complaints will have a direct path to enforcement review from that date."`  
**Source citation:** `HB 149 Sec. 552.102`  
**Concern:** This is a future-dated operational fact. Worth verifying the portal requirement date is still September 1, 2026 and has not been modified or advanced.  
**Suggested .gov source:** [Texas HB 149 enrolled text](https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149) — Section 552.102.

---

### V7. Workday Blog — Case Status "As of March 2026"
**File:** `content/blog/workday-ai-hiring-lawsuit-employer-liability.mdx`, line 63  
**Current text:** `"As of March 2026, the case remains active, with discovery ongoing and the last known filing dated March 27, 2026."`  
**Concern:** It is now April 23, 2026. CourtListener shows the docket was last updated April 20, 2026. There may be additional filings in the 27 days since the blog's last check.  
**Risk level:** Moderate. The blog's factual claims about the case history are solid. The "last known filing March 27" line just signals the article hasn't been checked recently.  
**Recommended action:** Pull the CourtListener docket at [courtlistener.com/docket/66831340/mobley-v-workday-inc/](https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/) and update the "last known filing" date. No major rulings appear to have changed the legal posture since conditional certification.

---

## ✅ CURRENT (Verified Against .gov Sources — April 23, 2026)

| Product / Claim | Effective Date | Status | Source Verified |
|---|---|---|---|
| NYC Local Law 144 | July 5, 2023 | in-effect | NYC DCWP page confirmed active enforcement; Dec 2025 Comptroller audit confirmed enforcement activity |
| Texas TDPSA | July 1, 2024 | in-effect | statutes.capitol.texas.gov confirmed; permanent 30-day cure period confirmed |
| Texas TRAIGA (HB 149) | January 1, 2026 | in-effect | Governor signed June 22, 2025; effective Jan 1, 2026; AG enforcement ramp-up ongoing |
| Delaware PDPA | January 1, 2025 | in-effect | law.lis.delaware.gov confirmed; cure period expired correctly noted |
| Virginia CDPA | January 1, 2023 | in-effect | law.lis.virginia.gov confirmed |
| Connecticut CTDPA | July 1, 2023 | in-effect | cga.ct.gov confirmed; cure period expired Dec 31, 2024 correctly noted |
| Oregon CPA | July 1, 2024 | in-effect | oregonlegislature.gov confirmed; cure period expired Jan 1, 2026 |
| Minnesota MCDPA | July 31, 2025 | in-effect | ag.state.mn.us confirmed full enforcement Feb 2026; 200+ complaints received |
| Illinois HB3773 | January 1, 2026 | in-effect | ilga.gov confirmed; IDHR draft rules released; underlying obligation fully operative |
| California CCPA ADMT | January 1, 2026 | in-effect | CPPA confirmed; risk assessments required Jan 1, 2026; ADMT notices Jan 1, 2027 |
| Colorado SB 24-205 | June 30, 2026 | effective-soon | leg.colorado.gov confirmed; SB 25B-004 signed Aug 28, 2025 pushed date to June 30, 2026; no repeal or further delay enacted as of audit date |
| EU AI Act — Prohibited AI | February 2, 2025 | in-effect | EU Official Journal confirmed; prohibitions fully applicable |
| EU AI Act — GPAI | August 2, 2025 | in-effect | EU Official Journal confirmed; GPAI obligations applicable from Aug 2, 2025 |
| EU AI Act — Annex III high-risk | August 2, 2026 | effective-soon | EU Official Journal confirmed; NOT yet in effect as of April 23, 2026 |
| Indiana ICDPA | January 1, 2026 | in-effect | iga.in.gov confirmed |
| Montana MCDPA | October 1, 2024 | in-effect | leg.mt.gov confirmed |
| Kentucky KCDPA | January 1, 2026 | in-effect | legislature.ky.gov confirmed |
| New Jersey NJDPA | January 15, 2025 | in-effect | njleg.state.nj.us confirmed |
| EEOC AI Hiring guidance removal | Ongoing | in-effect | Wayback Machine + EEOC.gov confirmed; guidance pages still down |
| Workday conditional certification | May 16, 2025 | Active litigation | GovInfo court order confirmed; case active; last CourtListener entry April 20, 2026 |
| NYC Local Law 144 Comptroller audit | December 2, 2025 | Published | osc.ny.gov confirmed |
| COPPA amended rule | April 22, 2026 | **NOW IN EFFECT** | FTC confirmed; toyassociation.org confirmed April 22 date passed |

---

## RELATIVE DATE CLAIMS REQUIRING SPECIAL HANDLING

### "91 Days" Blog Title
**File:** `content/blog/colorado-ai-law-91-days-deadline-requirements.mdx`  
**Problem:** Title, description, summary, cardSummary, and opening paragraph all use "91 days" — which was accurate on March 31, 2026 (publication date) but is 23 days stale today.  
**Today's correct count:** 68 days until June 30, 2026.  
**Recommendation:** Change title and all references to use the static deadline date ("June 30, 2026") rather than a relative day count. Relative counts create ongoing maintenance debt and degrade credibility as the post ages.  
**Note on slug:** The slug `colorado-ai-law-91-days-deadline-requirements` permanently encodes "91 days." This is suboptimal but changing the slug risks losing any SEO value accrued. Option: 301 redirect from old slug to a new evergreen slug like `colorado-sb24-205-deadline-requirements`.

### "43 Days Until Colorado Legislature Adjourns"  
**Files:** `content/blog/colorado-ai-law-91-days-deadline-requirements.mdx`, frontmatter microFacts (line 16–18) and body (line 74)  
**Problem:** Both occurrences say "43 days from today" — written on March 31, 2026 when true. Now 20 days remain.  
**Fix:** Change "just 43 days from today" to "the session adjourns May 13, 2026." Static dates are always accurate; relative counts go stale.

### "COPPA Compliance Deadline April 22, 2026" (K-12 Product)
**File:** `src/data/regulations.ts`, lines 1012, 952 (appliesToBullets)  
**Status:** This was a future deadline on creation; as of April 23, 2026 it is yesterday. The `effective-soon` status badge and future-framed language now need immediate update. See STALE section item 1 above.

### "As of March 2026" — Colorado AG Rulemaking (Landing Page)
**File:** `src/app/colorado-ai-compliance/page.tsx`, lines 462–464, 769–772  
**Status:** The rulemaking status claim is still likely accurate (no proposed rules as of late April 2026 per available search results), but the "as of March 2026" date marker is one month stale. Suggest updating to "as of April 2026."

### "As of March 2026" — Workday Blog
**File:** `content/blog/workday-ai-hiring-lawsuit-employer-liability.mdx`, line 63  
**Status:** The case is still active; the "last known filing March 27, 2026" is now 27 days old. Low risk of legal error but signals freshness issue.

---

## STATUS FIELD AUDIT — regulations.ts (All 53 Products)

| # | Slug | Current Status | Current effectiveDate | Recommended Status | Note |
|---|---|---|---|---|---|
| 1 | nyc-local-law-144 | in-effect | July 5, 2023 | ✅ in-effect | Correct |
| 2 | texas-tdpsa | in-effect | July 1, 2024 | ✅ in-effect | Correct |
| 3 | texas-traiga | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 4 | delaware-pdpa | in-effect | January 1, 2025 | ✅ in-effect | Correct; penaltySummary cure period language needs past-tense fix |
| 5 | multi-state-profiling-assessment | in-effect | Available now | ✅ in-effect | Correct |
| 6 | multi-state-employer-ai-disclosure | in-effect | Available now | ✅ in-effect | Correct |
| 7 | virginia-cdpa | in-effect | January 1, 2023 | ✅ in-effect | Correct |
| 8 | connecticut-ctdpa | in-effect | July 1, 2023 | ✅ in-effect | Correct; cure period framing already past tense |
| 9 | oregon-cpa | in-effect | July 1, 2024 | ✅ in-effect | Correct; penaltySummary cure period language should be updated to past tense |
| 10 | minnesota-mcdpa | in-effect | July 31, 2025 | ✅ in-effect | Correct; penaltySummary cure period already past tense |
| 11 | illinois-hb3773 | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 12 | california-ccpa-admt | in-effect | January 1, 2026 | ✅ in-effect | Correct; description note on pre-existing activities needed |
| 13 | colorado-sb24-205 | effective-soon | June 30, 2026 | ✅ effective-soon | Correct; 68 days out |
| 14 | eu-ai-act | in-effect | Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026 | ✅ in-effect | Acceptable; Prohibited AI and GPAI portions in effect |
| 15 | eeoc-ai-hiring | in-effect | Available now | ✅ in-effect | Correct |
| 16 | nist-ai-rmf | in-effect | Available now | ✅ in-effect | Correct |
| 17 | employee-ai-policy | in-effect | Available now | ✅ in-effect | Correct |
| 18 | vendor-ai-due-diligence | in-effect | Available now | ✅ in-effect | Correct |
| 19 | ai-bias-audit-template | in-effect | Available now | ✅ in-effect | Correct |
| 20 | ai-incident-response-plan | in-effect | Available now | ✅ in-effect | Correct |
| 21 | manager-ai-training-kit | in-effect | Available now | ✅ in-effect | Correct |
| 22 | annual-compliance-review | in-effect | Available now | ✅ in-effect | Correct |
| 23 | board-ai-summary | in-effect | Available now | ✅ in-effect | Correct |
| 24 | consumer-notice-kit | in-effect | Available now | ✅ in-effect | Correct |
| 25 | data-mapping-inventory | in-effect | Available now | ✅ in-effect | Correct |
| 26 | consumer-rights-kit | in-effect | Available now | ✅ in-effect | Correct |
| 27 | healthcare-ai-compliance | **effective-soon** | COPPA compliance deadline April 22, 2026 | **🚨 CHANGE TO in-effect** | COPPA deadline passed April 22, 2026 — YESTERDAY |
| 28 | financial-services-ai | in-effect | Available now (FINRA 2026 priority) | ✅ in-effect | Correct |
| 29 | education-k12-ai | **effective-soon** | COPPA compliance deadline April 22, 2026 | **🚨 CHANGE TO in-effect** | Same as above |
| 30 | hr-recruiting-ai | in-effect | Available now | ✅ in-effect | Correct |
| 31 | ai-governance-framework | in-effect | Available now | ✅ in-effect | Correct |
| 32 | ai-system-registry | in-effect | Available now | ✅ in-effect | Correct |
| 33 | ai-transparency-report | in-effect | Available now | ✅ in-effect | Correct |
| 34 | ai-whistleblower-policy | in-effect | Available now | ✅ in-effect | Correct |
| 35 | customer-ai-aup | in-effect | Available now | ✅ in-effect | Correct |
| 36 | indiana-icdpa | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 37 | montana-mcdpa | in-effect | October 1, 2024 | ✅ in-effect | Correct |
| 38 | kentucky-kcdpa | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 39 | new-jersey-njdpa | in-effect | January 15, 2025 | ✅ in-effect | Correct |
| 40 | vibe-coding-security-checklist | in-effect | Available now | ✅ in-effect | Correct |
| 41 | il-notice-response-kit | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 42 | il-zip-proxy-audit | in-effect | January 1, 2026 | ✅ in-effect | Correct |
| 43 | co-appeal-correction-kit | effective-soon | June 30, 2026 | ✅ effective-soon | Correct |
| 44 | co-ag-reporting-kit | effective-soon | June 30, 2026 | ✅ effective-soon | Correct |
| 45 | co-dev-deploy-exchange | effective-soon | June 30, 2026 | ✅ effective-soon | Correct |
| 46 | ca-admt-notice-optout | in-effect | January 1, 2026 | ⚠️ PARTIAL | Risk assessment portion in effect Jan 1, 2026 — but ADMT notice/opt-out portion not required until Jan 1, 2027. Status field ambiguous. |
| 47 | ca-admt-access-kit | in-effect | January 1, 2026 | ⚠️ PARTIAL | Same issue — consumer access rights for ADMT not required until Jan 1, 2027 |
| 48 | ca-cyber-audit-kit | in-effect | January 1, 2026 | ✅ in-effect | Cybersecurity audit requirement triggered Jan 1, 2026 for qualifying businesses |
| 49 | nyc-bias-audit-mgmt | in-effect | July 5, 2023 | ✅ in-effect | Correct |
| 50 | nyc-candidate-notice-kit | in-effect | July 5, 2023 | ✅ in-effect | Correct |
| 51 | va-consumer-rights-kit | in-effect | January 1, 2023 | ✅ in-effect | Correct |
| 52 | va-profiling-assessment-kit | in-effect | January 1, 2023 | ✅ in-effect | Correct |
| 53 | va-controller-processor-kit | in-effect | January 1, 2023 | ✅ in-effect | Correct |

**EU add-on kits not separately counted above:**
- eu-fria-kit: `status: "in-effect"`, `effectiveDate: "August 2, 2026 (Annex III deployer obligation — Art. 27)"` — ⚠️ The effectiveDate correctly names August 2, 2026, but the `status` is `"in-effect"` which contradicts the future date. Should be `"effective-soon"`.
- eu-post-market-kit: Same issue — `status: "in-effect"`, effectiveDate staggered with Annex III Aug 2026. Should be `"effective-soon"` if Annex III is the primary obligation.
- eu-human-oversight-kit: Same issue.
- eu-registration-transparency: Same issue.

---

## Recommendation — Ordered by Priority

**P0 — Fix before end of day (date passed):**

1. **K-12 Education AI (`education-k12-ai`):** Change `status` from `"effective-soon"` to `"in-effect"`. Update `effectiveDate` to `"April 22, 2026"`. Update the `appliesToBullets` entry from future-framed to past-tense.
2. **Healthcare AI (`healthcare-ai-compliance`):** Same fix — change `status` to `"in-effect"`.

**P1 — Fix this session (credibility impact):**

3. **Colorado blog title and body:** Remove all instances of "91 days" and "43 days from today." Replace with static date references. File: `content/blog/colorado-ai-law-91-days-deadline-requirements.mdx`.
4. **Oregon CPA penaltySummary:** Update "until January 1, 2026" to "expired January 1, 2026." File: `src/data/regulations.ts`, line 325.
5. **Delaware PDPA penaltySummary:** Already largely correct but ensure the phrasing signals the cure period is in the past. File: `src/data/regulations.ts`, line 152.

**P2 — Fix soon (minor accuracy issues):**

6. **EU add-on kit status fields (eu-fria-kit, eu-post-market-kit, eu-human-oversight-kit, eu-registration-transparency):** Change `status` from `"in-effect"` to `"effective-soon"` since the Annex III high-risk obligations they address are not enforceable until August 2, 2026. Files: `src/data/regulations.ts`, lines ~1834, 1867, 1899, 1931.
7. **California ADMT add-on kits (ca-admt-notice-optout, ca-admt-access-kit):** Add clarifying language that ADMT notice/opt-out consumer rights are required by January 1, 2027, not January 1, 2026. The status `"in-effect"` is misleading for these forward-dated obligations.
8. **Hub page "Updated March 2026" badge:** Update to "Updated April 2026" after applying fixes. File: `src/app/ai-compliance-by-state/page.tsx`, line 72.

**P3 — Monitor / check next session:**

9. **Colorado AG rulemaking status:** Verify the "as of March 2026" rulemaking status against [coag.gov/ai/](https://coag.gov/ai/) before the June 30 deadline approaches.
10. **Colorado legislature:** Watch whether any amendment/repeal bill is introduced before the May 13, 2026 adjournment. If it passes, multiple site claims about "the deadline is real" need update.
11. **IDHR final rules (Illinois):** Verify whether final (not just draft) rules have been published. Update Illinois landing page language if final rules exist.
12. **Workday case docket:** Pull [courtlistener.com/docket/66831340/](https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/) and update "last known filing March 27, 2026" in the blog post.

---

## Sources Consulted

- Colorado SB 24-205: https://leg.colorado.gov/bills/sb24-205
- Colorado SB 25B-004: https://leg.colorado.gov/bills/sb25b-004
- Texas HB 149 (TRAIGA): https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149
- Illinois 775 ILCS 5/2-102: https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102
- California CPPA ADMT: https://cppa.ca.gov/regulations/ccpa_updates.html
- California CPPA announcement (Sep 23, 2025): https://cppa.ca.gov/announcements/2025/20250923.html
- Delaware AG PDPA FAQ: https://attorneygeneral.delaware.gov/fraud/personal-data-privacy-portal/frequently-asked-questions/
- Oregon CPA: https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html
- Minnesota AG MCDPA: https://www.ag.state.mn.us/Office/Communications/2026/02/05_MCDPA.asp
- EU AI Act timeline: https://artificialintelligenceact.eu/implementation-timeline/
- EU AI Act Kennedy's Law: https://www.kennedyslaw.com/en/thought-leadership/article/2026/the-eu-ai-act-implementation-timeline-understanding-the-next-deadline-for-compliance/
- COPPA amended rule: https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule
- COPPA compliance date: https://www.toyassociation.org/PressRoom2/News/2026-News/updated-coppa-rule-requirements-take-effect-april-22.aspx
- Mobley v. Workday: https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/
- NY State Comptroller LL144 audit: https://www.osc.ny.gov/state-agencies/audits/2025/12/02/enforcement-local-law-144-automated-employment-decision-tools
- NYC DCWP AEDT: https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page
