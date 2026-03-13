# New Jersey LAD AI — Product Verification

**Product slug:** `new-jersey-lad-ai`
**Verification date:** 2026-03-13
**Verified by:** Research agent (subagent)
**Primary sources attempted:**
- https://www.nj.gov/oag/dcr/law.html — returned 404
- https://www.nj.gov/oag/dcr/index.html — redirect only, no content
- https://www.njoag.gov/ and all subpages — returned 403 (blocked)
- Dozens of alternative URLs including NJ Register PDFs, law firm client alerts, and secondary legal databases — all returned 404, 403, ECONNREFUSED, or served no article content

**⚠ CRITICAL WARNING: This product has NOT been verified from a primary source.**

---

## Summary Assessment

I could not access any primary source for the New Jersey LAD AI product. Every URL I tested for official NJ government sources was either blocked (403), missing (404), or returned redirect-only pages with no content. The entire njoag.gov domain returned 403 Forbidden for all requests. The nj.gov/oag/dcr domain returned 404 for every specific content URL tested.

The data currently in `regulations.ts` for this product has not been verified against any primary source. I cannot confirm whether any of it is correct. **This product should not be set to `ready: true` until the information below is verified by Guiding Light using the provided browser prompts.**

---

## 1. Enacted Status

**NOT VERIFIED FROM PRIMARY SOURCE**

The current `regulations.ts` entry implies this is a signed law or enacted regulation. However, I cannot confirm:
- Whether this is a statute (enacted by the NJ Legislature) or an administrative rule (adopted by the Division on Civil Rights under the Law Against Discrimination)
- What bill number (if a statute) or rule adoption docket number (if an administrative rule) applies
- Whether it is fully enacted/adopted or still proposed

**What I know from secondary sources (NOT verified):** Based on podcast descriptions and JD Supra topic listings found during research, New Jersey's Division on Civil Rights (DCR) apparently finalized an "Automated Decision Systems" rule sometime in late 2024 or early 2025. This appears to be an administrative rule (not a statute) adopted under the Law Against Discrimination (LAD, N.J.S.A. 10:5-1 et seq.) as the enabling authority.

**This information cannot be treated as verified** — it comes from JD Supra podcast descriptions, not from the rule text.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Go to https://www.njoag.gov/about/divisions-and-offices/division-on-civil-rights-home/ in your browser. Look for anything about an "Automated Decision Systems" rule, regulation, or rulemaking. Tell me: (1) Was a final rule adopted? (2) If yes, what is the N.J.A.C. citation (the administrative code number)? (3) What is the effective date? (4) Is there a link to the rule text? Copy the exact URL of any link to the rule text.

---

## 2. Statute Citation

**NOT VERIFIED FROM PRIMARY SOURCE — CURRENT DATA MAY BE WRONG**

Current `regulations.ts` citation: **"N.J.A.C. 13:13"**

N.J.A.C. 13:13 is the chapter of the New Jersey Administrative Code administered by the Division on Civil Rights. This is a plausible citation for DCR regulations. However:

1. I could not confirm that the automated decision systems rule is specifically codified in this chapter or subchapter
2. I could not find what subchapter number (e.g., N.J.A.C. 13:13-X) the rule uses
3. N.J.A.C. 13:13 is the chapter designation, not the specific section — the actual citation would need subchapter and section numbers (e.g., N.J.A.C. 13:13-4.1 through 13:13-4.10 or similar)

If this is a DCR administrative rule under the LAD, the enabling statute would be **N.J.S.A. 10:5-1 et seq.** (the New Jersey Law Against Discrimination). This should be documented in `regulations.ts` separately from the N.J.A.C. citation.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Search the New Jersey Administrative Code for "automated decision systems" under Title 13 (Law and Public Safety), Chapter 13 (Division on Civil Rights). The NJ Administrative Code is accessible at https://www.lexisnexis.com/hottopics/njoal/ (free access). Tell me: (1) What is the complete N.J.A.C. citation including subchapter and section numbers for the automated decision systems rule? (2) Does it appear under N.J.A.C. 13:13? (3) What is the enabling statute citation?

---

## 3. Citation URL

**NOT VERIFIED — CURRENT URL DOES NOT WORK**

Current `citationUrl`: `https://www.nj.gov/oag/dcr/law.html` — returned **404 error** when tested.

This URL is an AG summary page even if it worked — it would not be the statute text itself. A compliant `citationUrl` must link to the actual administrative rule text, not a summary page.

**Exact prompt for Guiding Light to paste into Claude browser:**
> I need a working URL that shows the full text of New Jersey's automated decision systems rule under the Law Against Discrimination. Try these URLs and tell me which one works and shows the actual rule text:
> 1. https://www.njoag.gov/about/divisions-and-offices/division-on-civil-rights-home/
> 2. https://www.lexisnexis.com/hottopics/njoal/ (search for "automated decision" or "N.J.A.C. 13:13")
> 3. Try searching Google for: site:nj.gov "automated decision systems" "N.J.A.C. 13:13"
> Tell me the exact URL of the page that shows the rule text.

---

## 4. Effective Date

**NOT VERIFIED FROM PRIMARY SOURCE**

Current `regulations.ts` effective date: **"December 15, 2025"**

I could not confirm this date from any primary source. This date may have come from training knowledge or a previous instance's research. It cannot be treated as verified.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Find the effective date of New Jersey's automated decision systems rule under the Law Against Discrimination. Go to https://www.njoag.gov/about/divisions-and-offices/division-on-civil-rights-home/ and look for the automated decision systems rule. Tell me: (1) What is the adoption date of the rule? (2) What is the effective date? (3) Was there a public notice period or comment period that preceded adoption?

---

## 5. Penalty Amounts

**NOT VERIFIED FROM PRIMARY SOURCE**

Current `regulations.ts` data:
- `penaltySummary`: "NJ Division on Civil Rights enforcement. Compensatory and punitive damages. Injunctive relief. Attorney fees. No cap on damages."
- `maxPenalty`: "Uncapped damages"

**Assessment:** The current entry does not cite any specific regulatory section numbers for penalty provisions. Under the Law Against Discrimination (N.J.S.A. 10:5-13 and 10:5-17), remedies for LAD violations include compensatory damages, punitive damages, injunctive relief, and attorney fees — so the general structure may be correct if this is enforced through LAD remedies. However:

1. Whether a private right of action exists under this rule (in addition to DCR enforcement) is not confirmed
2. Whether there are specific civil penalty amounts in the rule itself (separate from LAD damages) is not confirmed
3. Whether the rule creates any cap on damages or specifies particular penalty tiers is not confirmed

**The current penalty data has zero section citations and cannot be verified.** Every penalty amount must have a section number per PRODUCT-ONBOARDING.md requirements.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Find the penalty provisions of New Jersey's automated decision systems rule under the Law Against Discrimination. I need to know: (1) Does the rule itself set specific civil penalty dollar amounts, or does it rely on Law Against Discrimination remedies? (2) What is the specific regulatory section number (e.g., N.J.A.C. 13:13-X.X) that governs remedies and penalties? (3) Is there a cap on damages? (4) Does it include punitive damages? (5) Does the Law Against Discrimination (N.J.S.A. 10:5-13 or 10:5-17) set penalty limits that apply here?

---

## 6. Enforcement

**NOT VERIFIED FROM PRIMARY SOURCE**

Current `regulations.ts` data: "NJ Division on Civil Rights enforcement. Compensatory and punitive damages. Injunctive relief. Attorney fees."

**Critical question unresolved:** Is there a private right of action? The Law Against Discrimination generally allows private lawsuits by complainants. If this administrative rule is enforced through the LAD, then private plaintiffs may be able to sue in addition to DCR enforcement. This is a critical distinction for customer risk assessment.

**Exact prompt for Guiding Light to paste into Claude browser:**
> For New Jersey's automated decision systems rule under the Law Against Discrimination: (1) Can individuals file private lawsuits against employers or other entities that violate the automated decision systems rule? (2) Is enforcement limited to the Division on Civil Rights (DCR), or can complainants bring their own lawsuits? (3) What is the procedure — must complaints go through DCR first, or can individuals sue directly in court? Please look at the rule text itself and the Law Against Discrimination (N.J.S.A. 10:5-13) for the answer.

---

## 7. Cure Period

**NOT VERIFIED FROM PRIMARY SOURCE**

No cure period information appears in `regulations.ts` for this product. No cure period was found in any accessible source.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Does New Jersey's automated decision systems rule include a cure period — a period of time for businesses to fix violations before penalties apply? Look at the rule text and tell me: (1) Is there a cure period? (2) If yes, how long? (3) What section number governs the cure period?

---

## 8. Applicability

**NOT VERIFIED FROM PRIMARY SOURCE**

Current `regulations.ts` `appliesToSummary`: "Any entity in New Jersey using automated decision tools in housing, lending, employment, insurance, or public accommodations."

**Assessment:** The Law Against Discrimination covers housing, employment, places of public accommodation, and credit transactions. If the automated decision systems rule is adopted under the LAD, this scope may be roughly correct. However:

1. The specific threshold for what constitutes an "automated decision tool" subject to the rule is unknown
2. Whether there are size thresholds, transaction volume thresholds, or other applicability filters is unknown
3. Whether New Jersey businesses only or all businesses using automated tools affecting NJ residents are covered is unknown

**Exact prompt for Guiding Light to paste into Claude browser:**
> For New Jersey's automated decision systems rule: (1) What is the definition of "automated decision system" or "automated decision tool" in the rule? (2) Does it apply to all businesses of any size, or are there size thresholds? (3) Does it apply only to employment, or also to housing, lending, and public accommodations? (4) Does it apply only when decisions affect New Jersey residents, or is there a different jurisdictional hook? Please cite the specific N.J.A.C. section numbers for your answers.

---

## 9. What I Verified From Primary Source

I verified **nothing** from a primary source for this product. Every URL tested returned an error or no content.

**What was tested (all failed):**
- https://www.nj.gov/oag/dcr/law.html — 404
- https://www.nj.gov/oag/dcr/index.html — redirect only
- https://www.njoag.gov/ and all subpages — 403 Forbidden
- https://www.nj.gov/oal/ and NJ Register URLs — 404
- https://www.lexisnexis.com/hottopics/njoal/ — requires authentication
- Approximately 20 law firm client alert URLs — all 403 or 404
- https://njlaw.rutgers.edu/ — relevant sections not accessible
- Multiple JD Supra, National Law Review, and legal blog URLs — no substantive content served

---

## 10. What I Could NOT Verify — Complete List With Browser Prompts

This product requires complete verification from scratch. Below are the ordered prompts for Guiding Light to use with Claude in the browser.

**STEP 1 — Find the rule:**
> Go to https://www.njoag.gov/about/divisions-and-offices/division-on-civil-rights-home/ in your browser. Look for any section about the "Automated Decision Systems" rule, regulations, or rulemaking. Tell me: (a) Is there a link to the rule text? (b) What is the N.J.A.C. citation shown (should include subchapter and section numbers, e.g., N.J.A.C. 13:13-4.1)? (c) What is the effective date shown?

**STEP 2 — Get the rule text URL:**
> Using what you found in Step 1, navigate to the actual rule text. Tell me the exact URL of the page showing the full rule text. Copy the URL from your browser address bar exactly.

**STEP 3 — Verify the rule's structure:**
> Read the first few sections of the automated decision systems rule. Tell me: (a) What is the full N.J.A.C. citation (title:chapter-subchapter.section)? (b) What is the enabling statute citation (the NJ statute that authorizes DCR to issue this rule)? (c) What is the effective date? (d) What entities must comply — are there size thresholds or sector limitations?

**STEP 4 — Verify penalties:**
> In the automated decision systems rule text, find the enforcement and penalties section. Tell me: (a) Does the rule set specific civil penalty dollar amounts? If yes, what are they and what are the section numbers? (b) Or does the rule rely on Law Against Discrimination remedies (N.J.S.A. 10:5-13 or 10:5-17)? (c) Are there punitive damages? (d) Is there a cap on any type of damages?

**STEP 5 — Verify private right of action:**
> In the automated decision systems rule and/or the Law Against Discrimination (N.J.S.A. 10:5 et seq.), tell me: (a) Can individuals file private lawsuits for violations of the automated decision systems rule, or is enforcement limited to DCR? (b) If there is a private right of action, must individuals exhaust DCR remedies first, or can they go directly to court? Cite the specific statute or rule section number.

**STEP 6 — Verify cure period:**
> Does the automated decision systems rule include a cure period (time to fix violations before penalties apply)? If yes: (a) How long? (b) What N.J.A.C. section governs it?

**STEP 7 — Confirm current status:**
> Has any court challenged or stayed the New Jersey automated decision systems rule? Is it currently in effect as of March 2026? Search njoag.gov and news sources for any injunctions, stays, or legal challenges.

---

## 11. Recommended Action

**Do not mark this product `ready: true` until Guiding Light has completed all 7 browser prompt steps above and returned the information to a new instance.**

The following fields in `regulations.ts` require updates after verification:
- `citation` — needs full N.J.A.C. subchapter and section numbers, plus the enabling N.J.S.A. citation
- `citationUrl` — current URL returns 404; needs replacement with working URL to rule text
- `penaltySummary` — needs specific section numbers for every penalty claim
- `appliesToSummary` — needs verification against actual rule text
- `effectiveDate` — "December 15, 2025" is unverified

The `status` field should remain `"in-effect"` only if Guiding Light confirms the rule was adopted and is not stayed or challenged. If there is a legal challenge, `status` should be changed to reflect that.
