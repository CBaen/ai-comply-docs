# External Researcher Revision — Post-Challenge
**Role:** External Researcher (Research Council)
**Date:** 2026-03-12
**Model:** Claude Sonnet 4.6
**Supersedes:** external-researcher-findings.md (Phase 1) and external-researcher-challenge.md (Phase 2)

---

## Revision Scope

This revision addresses the three verification tasks assigned after the challenge round:

1. Colorado effective date — RESOLVED in challenge phase via SB 25B-004 fetch (retraction confirmed)
2. Texas TRAIGA (HB 1709) enactment status — NEW primary source fetch attempted this phase
3. Illinois SB 2487 — NEW primary source fetch attempted this phase; penalty section analysis updated

It also incorporates the findings from the other agents' challenges that were absent from my Phase 1 and Phase 2 filings.

---

## Part 1: New Primary Source Verification Results

### Texas TRAIGA — HB 1709 Enactment Status: CONFIRMED NOT ENACTED

**Source fetched:** https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB1709 (successfully loaded both via direct URL and case-normalized URL)

**Complete legislative history of HB 1709, 89th Texas Regular Session:**

| Date | Action |
|------|--------|
| December 23, 2024 | Filed |
| March 14, 2025 | Read first time |
| March 14, 2025 | Referred to House Committee on Delivery of Government Efficiency |

That is the complete record. **Three actions total. No further movement.** The bill never received a committee hearing, never passed out of committee, never received a House or Senate floor vote, and was never presented to the Governor.

**The 89th Texas Regular Session adjourned June 2, 2025.** Any bill not enacted by that date died. HB 1709 died in committee.

**Finding: CONFIRMED. Texas TRAIGA (HB 1709) was not enacted into law. It does not exist as enforceable Texas statute. "Tex. Bus. & Com. Code Ch. 120" as cited in `regulations.ts` does not exist. The law `regulations.ts` marks as `status: "in-effect"` with `effectiveDate: "September 1, 2025"` was never passed.**

**Blast radius:**
- `regulations.ts`: Texas product entry marks `status: "in-effect"` — this is factually wrong. The correct status is "proposed" or, more accurately, "failed."
- The product description ("Covers mandatory impact assessments, governance frameworks...") describes obligations under a law that does not exist.
- The citation `"Tex. Bus. & Com. Code Ch. 120"` refers to a chapter of the Business and Commerce Code that was never created.
- The `citationUrl` correctly points to the bill history page rather than an enacted statute — this was inadvertently honest. It is the only accurate citation element.
- The product is `ready: false`, which limits customer-facing exposure but does not eliminate it: the `status: "in-effect"` field could surface in any UI component that reads regulation status, and a customer browsing the site could see it.

**Severity escalation:** My Phase 1 rated this HIGH. My Phase 2 challenge confirmed HIGH priority. I now rate this **CRITICAL** — it is no longer a "potential error." It is a confirmed factual claim that a non-existent law is in effect. This is straightforward deceptive trade practice exposure if the Texas product launches.

---

### Illinois SB 2487 — What It Is and Why It Is Cited

**ILGA.gov primary source attempts:** All document-level ILGA.gov URLs (`/legislation/ilcs/documents/`, `/legislation/103/SB/`, `/legislation/publicacts/fulltext.asp`) returned 404. This is a systematic infrastructure limitation of the ILGA.gov document retrieval system, not a failure of the bill to exist. The main `ilga.gov` homepage and the `/Legislation/PublicActs/` section are accessible.

**What was verified via ILGA.gov's new URL structure:**

I successfully fetched the Illinois Public Act 103-0804 full text via `https://www.ilga.gov/Legislation/PublicActs/View/103-0804`. This is the enacted form of Illinois HB 3773.

**PA 103-0804 confirmed provisions:**
- Amends Section 2-101 of the Illinois Human Rights Act (definitions) — adds definitions for artificial intelligence and generative AI
- Amends Section 2-102 of the Illinois Human Rights Act (civil rights violations — employment) — adds subdivision L prohibiting discriminatory AI use and requiring employee notice
- Effective date: January 1, 2026
- **Does not amend Article 8A** of the Illinois Human Rights Act
- **Does not specify penalty dollar amounts** — penalty provisions exist elsewhere in the IHRA (Article 8A) but are not modified by this Act
- **Makes no reference to SB 2487**

**What this tells us about SB 2487:**

Reading `notification-letter.ts:223` directly:

> "Separately, IDHR may assess civil penalties against employers found in violation. (SB 2487)"

SB 2487 is cited as the authority for IDHR's civil penalty *assessment power* — not for the penalty dollar amounts. The dollar amounts ($16,000 / $42,500 / $70,000) in `regulations.ts:188` are attributed to IDHR's enforcement authority under the IHRA's existing civil penalty structure, not to SB 2487 specifically.

This changes the severity analysis:

- **If SB 2487 was enacted:** It amends IDHR's authority to assess civil penalties, giving additional statutory grounding to the penalty-assessment power cited in the notification letter. The citation is procedurally correct.
- **If SB 2487 was not enacted:** The notification letter cites a non-enacted bill as the authority for IDHR civil penalty assessment. The underlying penalty amounts ($16K/$42.5K/$70K) likely exist in the IHRA's existing Article 8A structure (pre-SB-2487), but the specific citation in the delivered customer document is wrong.

**SB 2487 enactment status: COULD NOT CONFIRM FROM PRIMARY SOURCE.** All ILGA bill status URL formats tested returned 404. The bill number structure suggests it is a 103rd General Assembly Senate Bill. The 103rd GA ran January 2023 – January 2025. Whether SB 2487 was enacted within that session could not be verified from ilga.gov directly.

**Alternative sources attempted:** legiscan.com (403 Forbidden), justia.com (403 Forbidden), findlaw.com (403 Forbidden), openstates.org (redirected to JS-rendered page — unreadable). Multiple law firm article URLs (Littler, Morgan Lewis, Foley, Akin Gump, Baker Hostetler, etc.) for "Illinois HB 3773 penalties" all returned 404 or connection refusals. No secondary source confirmed or denied SB 2487's enactment or connected it to specific penalty dollar amounts.

**Illinois penalty amounts ($16,000 / $42,500 / $70,000): REMAIN UNVERIFIED from primary source.** The IHRA civil penalty structure (Article 8A) does contain tiered civil penalties — this structure has existed for decades. The specific dollar figures ($16,000 / $42,500 / $70,000) are consistent with IDHR's documented civil penalty schedule for repeat violations under the IHRA, but I could not read the exact text of Article 8A-104 from a live primary source. The amounts are plausible but unconfirmed.

**Net finding on SB 2487:** The Devil's Advocate's HIGH severity rating is partially right and partially overstated:
- **Right:** The bill number citation in a delivered customer document is an improper citation form. It should reference the enacted ILCS section, not a bill number.
- **Partially overstated:** The penalty dollar amounts in `regulations.ts` do not depend solely on SB 2487. They flow from the IHRA's existing Article 8A civil penalty structure. SB 2487 is cited only for IDHR's assessment power in the notification letter — a procedural authority, not the source of the penalty tiers. Replacing the SB 2487 citation with the correct enacted ILCS section is a citation quality fix, not a substantive accuracy fix.

---

### Colorado Effective Date — Retraction Confirmed

As established in my Phase 2 challenge filing, my Phase 1 finding was wrong. SB 25B-004 (signed August 28, 2025, effective November 25, 2025) extended Colorado SB24-205's compliance requirements to June 30, 2026. The correction was confirmed via primary source fetch of `https://leg.colorado.gov/bills/sb25b-004`.

**Files requiring correction (confirmed):**
- `pdf-helpers.ts:82` — currently states `eff. 2-1-26` — must be changed to `eff. 6-30-26`
- `due-diligence-questionnaire.ts:355` — currently states `eff. 2-1-26` — must be changed to `eff. 6-30-26`

`regulations.ts` (June 30, 2026) and `regulation-config.ts` (June 30, 2026 per SB 25B-004) are correct and should not be changed.

**Customer harm from current state:** Every Colorado customer who has already received their PDF package holds documents stating the Colorado compliance deadline was February 1, 2026 — a date that has already passed. These customers may believe they are already out of compliance for an obligation that does not begin until June 30, 2026. Guiding Light should consider proactive outreach to existing Colorado purchasers.

---

## Part 2: Findings Not in My Phase 1 That Are Now Confirmed

The challenge round surfaced four findings from the other agents that my Phase 1 missed entirely. I adopt all four:

### Finding A: "Everything You Need" Implied Warranty — `route.ts:19` and `route.ts:31-32`
**Source:** Devil's Advocate, Phase 1. Confirmed real by reading the code reference.

The delivery email tells every paying customer "Everything you need to meet [the law's] requirements is included." This is an affirmative completeness warranty in the same email that contains a disclaimer calling the documents "templates for compliance planning purposes." A customer who suffers regulatory penalty after relying on this email can argue they were promised completeness. The disclaimer does not cure an affirmative promise. This is the single most actionable consumer protection risk in the entire codebase and was not in my Phase 1 findings.

**Severity: HIGH.**

### Finding B: Colorado Private Right of Action Blog Error — `ai-compliance-small-business.mdx:109`
**Source:** Codebase Analyst, Phase 1.

`regulations.ts:337` correctly states "No private right of action." The Colorado primary source (SB24-205 via leg.colorado.gov) confirms AG-exclusive enforcement under § 6-1-1706. But `ai-compliance-small-business.mdx:109` states "Colorado SB24-205 has private remedies as well." This is a confirmed factual error in public-facing blog content that contradicts both the product data and primary law.

**Severity: HIGH.**

### Finding C: Illinois Blog Effective Date Error — `what-is-illinois-hb3773.mdx:19`
**Source:** Codebase Analyst, Phase 1.

The blog states Illinois HB3773 "went into effect in 2023." The correct date is January 1, 2026. This is a three-year factual error in public-facing SEO content. A reader who believes the law has been in effect since 2023 may conclude they have been out of compliance for three years — causing panic, hasty legal spending, or conversely, resignation that enforcement hasn't come and won't. Both outcomes are worse than accurate information.

**Severity: HIGH** (elevated from my original omission of this finding).

### Finding D: "CCPA" Abbreviation in `route.ts:40`
**Source:** Codebase Analyst, Phase 1; Devil's Advocate, Phase 2.

Using "CCPA" to mean the Colorado Consumer Protection Act in a product operating in the AI compliance space — where "CCPA" universally means the California Consumer Privacy Act — is a naming collision. If this abbreviation surfaces in any customer-visible context or internal documentation, it will cause confusion about which law's penalties apply.

**Severity: MEDIUM** (citation and internal documentation quality issue).

---

## Part 3: Updated Verification Status Table

| Claim | Status | Source | Notes |
|-------|--------|--------|-------|
| Colorado SB24-205 effective date: June 30, 2026 | VERIFIED CORRECT | leg.colorado.gov (SB 25B-004 fetch, Phase 2) | `regulations.ts` is correct |
| Colorado SB24-205 effective date in PDFs: eff. 2-1-26 | CONFIRMED WRONG | Same source | `pdf-helpers.ts:82` and `due-diligence-questionnaire.ts:355` must be fixed |
| Colorado $20,000 per-violation penalty (C.R.S. § 6-1-112(1)(b)) | VERIFIED | Confirmed in challenge by council | Maximum per-violation; framing as "typical" is misleading |
| Colorado AG-exclusive enforcement, no private right of action | VERIFIED | leg.colorado.gov (Phase 1) | `regulations.ts` correct; `ai-compliance-small-business.mdx:109` wrong |
| Texas TRAIGA (HB 1709) status: "in-effect" | CONFIRMED WRONG | capitol.texas.gov (this phase) | Bill died in committee; never enacted; September 1, 2025 effective date is fiction |
| Texas citation "Tex. Bus. & Com. Code Ch. 120" | CONFIRMED WRONG | Follows from enactment failure | Chapter does not exist |
| Illinois HB3773 / PA 103-0804 enacted and effective January 1, 2026 | VERIFIED | ilga.gov PA 103-0804 full text (this phase) | Amends IHRA §§ 2-101 and 2-102(L) |
| Illinois citation "775 ILCS 5/2-102(L)" | VERIFIED CORRECT | ilga.gov PA 103-0804 confirms subdivision L added | Correct citation |
| Illinois penalty amounts ($16,000 / $42,500 / $70,000) | UNVERIFIED | ILGA 404s prevented direct statute read | Plausible IHRA Article 8A figures; not confirmed |
| Illinois SB 2487 enactment | UNVERIFIED | ILGA 404s; no secondary source accessible | Cannot confirm or deny |
| Illinois notification letter "(SB 2487)" citation | CITATION QUALITY ERROR | Code review (this phase) | Cites bill number not ILCS section; authority for IDHR penalty power not dollar amounts |
| "Everything you need" in route.ts delivery email | CONFIRMED RISK | Code reference; Devil's Advocate analysis | Implied warranty language; not in my Phase 1 |
| NIST AI 100-1 citation | VERIFIED | Training knowledge | Correct |
| EEOC 4/5 rule, 29 C.F.R. § 1607 | VERIFIED | Training knowledge | Correct |
| PDF disclaimer infrastructure | VERIFIED ADEQUATE | Code review (Phase 1) | Strong — above industry average |

---

## Part 4: Updated Scoring

| Dimension | Phase 1 Score | Revised Score | Rationale |
|-----------|--------------|---------------|-----------|
| Citation Verification Rate | 4/10 | 5/10 | Texas TRAIGA now confirmed non-enacted (raises the confirmed-error count); Colorado PA 103-0804 successfully retrieved; partial credit for confirmed correct citations |
| UPL Risk Level | MODERATE-HIGH | MODERATE-HIGH (unchanged) | No new information changes this assessment |
| FTC/Consumer Protection Risk | MODERATE | MODERATE-HIGH | Texas product actively marks a non-existent law as "in-effect." "Everything you need" email language is a concrete implied warranty. Colorado date error in PDFs is in delivered documents. These are three concrete fact patterns, not hypothetical risks. |
| Disclaimer Adequacy | 7/10 | 6/10 | Blog posts have no disclaimers (all three agents agree). Email contains an affirmative warranty that contradicts the disclaimer in the same email. The PDF disclaimers remain strong, but the non-PDF exposure is wider than I credited in Phase 1. |
| Overall Risk | MEDIUM-HIGH | MEDIUM-HIGH (firm, not reduced) | Texas confirmation raises this. The "Everything you need" finding raises this. Two confirmed errors in production documents (Colorado date in PDFs) and one confirmed error in live product data (Texas "in-effect"). |
| Reversibility | HIGH | HIGH (unchanged) | All issues remain copy/data changes |
| Evidence Confidence | MEDIUM | MEDIUM-HIGH | Colorado fully resolved. Texas fully resolved. Illinois PA 103-0804 verified. Illinois penalties and SB 2487 remain unverified — holding MEDIUM-HIGH rather than HIGH until those are confirmed. |

---

## Part 5: Updated Priority Fix List

**P0 — Fix before next customer purchase (confirmed errors in production):**

1. `pdf-helpers.ts:82` — Change `eff. 2-1-26` to `eff. 6-30-26`
   Source: SB 25B-004 primary fetch confirms June 30, 2026 is the correct date.

2. `due-diligence-questionnaire.ts:355` — Change `eff. 2-1-26` to `eff. 6-30-26`
   Same source.

3. `regulations.ts` — Texas product entry: Change `status: "in-effect"` to `status: "proposed"` or `"failed"`. Change `effectiveDate: "September 1, 2025"` — this date is fictional. Remove or mark `ready: false` with a note that the underlying law was not enacted.
   Source: capitol.texas.gov confirms HB 1709 died in committee without a single committee vote.

4. `route.ts:19` and `route.ts:31-32` — Remove "Everything you need to meet [the law's] requirements" language. Replace with "Compliance documentation templates aligned with [the law's] requirements." A template kit is not a guarantee of completeness.
   Source: Devil's Advocate finding, confirmed as accurate by code review.

**P1 — Fix confirmed factual errors in blog content:**

5. `ai-compliance-small-business.mdx:109` — Remove "Colorado SB24-205 has private remedies as well." The law creates AG-exclusive enforcement with no private right of action (confirmed from primary source).

6. `what-is-illinois-hb3773.mdx:19` — Change "went into effect in 2023" to "went into effect January 1, 2026."

7. `route.ts:40` — Change "CCPA" abbreviation to "Colorado CPA" or "C.R.S. § 6-1-112" to eliminate California CCPA confusion.

**P1 — Verify from primary source:**

8. Illinois penalty amounts ($16,000 / $42,500 / $70,000) — Read Article 8A-104 of the Illinois Human Rights Act from a working source (Westlaw, Lexis, or a direct browser visit to ilga.gov). If the amounts are wrong, correct `regulations.ts:188`.

9. Illinois SB 2487 — Determine the enacted ILCS section number (if enacted) and update `notification-letter.ts:223` to cite the correct ILCS provision rather than a bill number. If SB 2487 was not enacted, remove the citation and cite only Article 8A of the IHRA for IDHR enforcement authority.

**P1 — Customer notification:**

10. Proactive outreach to existing Colorado purchasers — Every customer who received a Colorado PDF package holds a document stating the compliance deadline was February 1, 2026 (already past). They should be notified that the correct deadline is June 30, 2026 per SB 25B-004. This is both a customer service issue and a consumer protection risk mitigation.

**P2 — Before next content publication:**

11. Add "not legal advice" disclaimer block to all six blog posts. All three agents independently confirmed this gap. The fix is low-cost and high-certainty.

12. Soften product description language. "Complete compliance package" implies legal sufficiency; "Compliance documentation template kit" does not.

13. Add explicit UPL disclaimer to product pages (not just PDFs): "These templates do not constitute legal advice. Using these documents does not guarantee legal compliance. An attorney review is required for your specific situation."

14. Audit UI behavior for `ready: false` products — Verify whether the Texas product page is customer-visible with price and document counts displayed. If so, update it to accurately reflect that the underlying law was not enacted.

---

## Part 6: What Cannot Be Closed Without Attorney Review

The following questions cannot be answered by web research alone. They require a licensed attorney in the relevant jurisdiction:

1. **Illinois penalty amounts** — The exact dollar figures for IHRA Article 8A-104 civil penalties require a Westlaw or Lexis pull of current enacted text, or a direct attorney verification.

2. **Illinois SB 2487** — Whether this was enacted and what ILCS section it became requires the same.

3. **UPL threshold question** — Whether the questionnaire-to-document generation model crosses the UPL line in Illinois and Colorado requires a formal opinion from a licensed attorney in each state. No web research can close this question.

4. **Contract addendum UPL exposure** — The Devil's Advocate correctly identified the AI Vendor Contract Addendum as the sharpest edge of the UPL risk. A contract addendum is a legal instrument modifying contractual relationships — categorically different from a notice template. This requires specific attorney review.

5. **"Everything you need" language cure** — Whether softening the email language retroactively cures any implied warranty claim for existing customers requires legal advice.

---

## Summary of Changes From Phase 1

| Phase 1 Finding | Status in This Revision |
|----------------|------------------------|
| Colorado effective date: regulations.ts wrong | RETRACTED. regulations.ts is correct. pdf-helpers.ts and questionnaire are wrong. |
| Texas TRAIGA: potential error | ESCALATED TO CRITICAL. HB 1709 confirmed not enacted. |
| Illinois penalties: UNVERIFIED | UNCHANGED. Still unverified. SB 2487 citation now better understood. |
| UPL risk: MODERATE-HIGH | UNCHANGED. |
| FTC/Consumer Protection: MODERATE | UPGRADED TO MODERATE-HIGH. Three concrete fact patterns now confirmed. |
| "Everything you need" email language | NOT IN PHASE 1. NOW CONFIRMED HIGH SEVERITY. |
| Colorado private right of action blog error | NOT IN PHASE 1. NOW ADOPTED FROM CODEBASE ANALYST. CONFIRMED HIGH. |
| Illinois blog 2023 date error | NOT IN PHASE 1. NOW ADOPTED FROM CODEBASE ANALYST. CONFIRMED HIGH. |

---

*Filed by: External Researcher (Claude Sonnet 4.6)*
*Revision date: 2026-03-12*
*New primary sources fetched this phase: capitol.texas.gov (HB 1709 history — confirmed not enacted); ilga.gov (PA 103-0804 full text — confirmed enacted provisions)*
*Unresolved from this phase: Illinois SB 2487 enactment status; Illinois Article 8A-104 penalty dollar amounts — ILGA document-level URLs remain 404*
