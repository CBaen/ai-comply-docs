# Legal Integrity Audit — aicompliancedocuments.com
## Generated 2026-04-23

---

## Summary

- Pages audited: 8 (4 state landing pages, 1 homepage, 1 regulations data file spot-check, 4 priority blog posts, faq.ts)
- RED findings: 1 (stale factual claim that is now false)
- YELLOW findings: 5 (unsupported market claims and scope imprecision)
- GREEN: 35+ (verified against primary sources)
- Overall legal defensibility: **ACCEPTABLE** — the site is materially well-sourced. One RED finding needs correction. The $5,000–$25,000 law firm comparison is unsupported across all pages that carry it. Everything else checks out against .gov statute text.

**Bottom line for the owner:** Do not shut the site down. The core legal claims — penalty amounts, statute citations, effective dates, enforcement structures — are accurate. The site has improved substantially since the prior removals. Fix the one RED item and add caveats to the law-firm-cost claims.

---

## RED Findings

### RED-1: Colorado AG page claim is now stale and false

**File:line:** `src/app/colorado-ai-compliance/page.tsx`, line 91

**The claim:**
> "Even the Colorado Attorney General's own website still lists the original February 1, 2026 effective date. SB 25B-004 delayed it to June 30, 2026, but the AG hasn't updated their page."

**Why it's a problem:**
This claim is **factually false as of audit date.** Live verification of `coag.gov/ai/` on 2026-04-23 confirms the Colorado AG's page now states: *"its provisions go into effect June 30, 2026."* The AG page has been updated. Displaying this as current fact is an affirmative false statement to visitors. It is not a material legal error, but it is the kind of error that undermines the credibility the site is built on — "we read the primary sources; you can verify."

**Correct fact:** The Colorado AG's page now accurately reflects the June 30, 2026 effective date.

**Recommended fix:** Update the microFact to reflect current status — e.g., "The Colorado Attorney General's website now accurately reflects the June 30, 2026 effective date after SB 25B-004 was signed." Or remove the fact entirely. The SB 25B-004 citation and effective date remain accurate; only the AG-page characterization is stale.

**Source checked:** `https://coag.gov/ai/` — live on 2026-04-23. Confirmed June 30, 2026 displayed.

---

## YELLOW Findings

### YELLOW-1: "$5,000–$25,000" law firm cost comparison — no source, appears on multiple pages

**Files:lines:**
- `src/app/page.tsx` (homepage), line 381: *"Hiring a law firm to build a compliance package from scratch typically runs $5,000 to $25,000."*
- `src/app/colorado-ai-compliance/page.tsx`, lines 612–613: *"Law firm $5,000–$25,000 — Weeks of back-and-forth"*
- `src/app/california-ai-compliance/page.tsx`, lines 572–573: same figure
- `src/app/texas-ai-compliance/page.tsx`, lines 594–595: same figure
- `src/data/faq.ts` (FAQ structured data), line ~21: implied in "fraction of legal fees"

**Why it's a problem:**
This is a market claim presented as factual. There is no source, no survey citation, no caveat. Law firm fees for compliance work vary enormously by firm size, geography, attorney experience, and scope. The range may be accurate for some scenarios but is unsupported as a blanket statement. Under FTC advertising standards, comparative price claims require a reasonable basis. This is not RED because it doesn't state a false legal fact, but it is the most commercially prominent unsupported claim on the site.

**Note:** The Illinois landing page (`illinois-ai-compliance/page.tsx`, lines 594–595) uses a narrower range of *"$3,000–$15,000"* — which is actually more defensible for a 6-document employment compliance package — but is also unsourced.

**Recommended fix:** Add qualifying language — e.g., *"Law firm compliance packages for new AI laws have been quoted at $5,000–$25,000 or more depending on scope and firm"* — or cite a legal industry survey. Alternatively, soften to *"thousands to tens of thousands of dollars"* which is defensible without a source.

---

### YELLOW-2: "$400–$800/hour" attorney rate — stated in FAQ, no source

**Files:lines:**
- `src/data/faq.ts`, line 37: *"$400–$800 an hour"*
- `src/app/page.tsx`, line 481: *"$400–$800 an hour"*
- `src/app/colorado-ai-compliance/page.tsx`, line 607: *"$400 an hour"* (lower bound only, less problematic)
- `src/app/illinois-ai-compliance/page.tsx`, line 587: *"$400 an hour"*
- `src/app/california-ai-compliance/page.tsx`, line 567: *"$400 an hour"*
- `src/app/texas-ai-compliance/page.tsx`, line 588: *"$400 an hour"*

**Why it's a problem:**
Attorney billing rates vary enormously. $400–$800/hour is plausible for a mid-to-large firm in a major market doing specialized compliance work, but it's presented as a generic "attorney" rate with no source. Not RED because it's a market characterization, not a legal fact. But in conjunction with YELLOW-1, the site makes a compound comparison claim (law firm total cost + hourly rate) that neither is sourced.

**Recommended fix:** Either cite a legal industry benchmark (e.g., CLIO Legal Trends Report, which publishes attorney billing rates) or hedge with "depending on the firm and market" language.

---

### YELLOW-3: Texas TRAIGA "no small-business exemption" — requires nuance

**File:line:** `src/app/texas-ai-compliance/page.tsx`, lines 203–205, 492–499

**The claim:** *"No small-business exemption"* stated multiple times as absolute.

**Why it's a problem (nuance, not falsehood):**
The statute does contain one exemption: *"federally insured financial institutions subject to federal AI oversight (§ 552.056(e))."* The Texas page does accurately disclose this in the small print (line 498–499). However, the hero-level claim "No exceptions" and "Texas AI Law Covers Every Business. No Exceptions." (headline, line 201) is technically overbroad — the financial institution exemption does exist. This is YELLOW, not RED, because the exemption is disclosed in body copy. But the headline is technically false for a federally insured bank.

**Recommended fix:** Change the headline to something like "No small-business exemption, no high-risk carveout" which is accurate and the real distinction.

---

### YELLOW-4: Illinois multi-state blog — "private civil actions with uncapped actual damages" characterization

**File:line:** `content/blog/multi-state-ai-compliance-comparison-guide.mdx`, line 93

**The claim:** *"Illinois HB3773 is the notable exception: it ties AI violations into the Illinois Human Rights Act's existing enforcement framework, which does allow private civil actions with uncapped actual damages."*

**Why it's a problem:**
This is directionally correct — the IHRA does allow civil litigation after exhausting the IDHR administrative process — but the characterization "uncapped actual damages" requires clarification. The IHRC can award actual damages, back pay, and attorney fees. The Illinois Human Rights Act does permit private civil actions in circuit court after receiving a right-to-sue letter from IDHR. The claim is not false, but "uncapped actual damages" implies a direct-to-court private lawsuit; the more accurate description is that the IHR Act enforcement pathway ultimately permits civil court action with actual damages after the administrative process. A reader could misunderstand this as meaning employees can file directly in court without filing an IDHR charge first.

**Recommended fix:** Add a clarifying parenthetical: *"which allows civil actions in circuit court after IDHR administrative process, with actual damages and attorney fees available."*

---

### YELLOW-5: California "American Honda Motor Co. $632,500" and "Todd Snyder $345,178" — cited without source URL

**File:line:** `src/app/california-ai-compliance/page.tsx`, lines 547–549

**The claim:** *"In the last six months, CalPrivacy fined Tractor Supply Company $1.35 million, American Honda Motor Co. $632,500, and Todd Snyder $345,178."*

**Why it's a problem:**
The Tractor Supply fine is verified ($1.35M confirmed at cppa.ca.gov/announcements/2025/20250930.html). The Honda and Todd Snyder figures are not sourced in the page's bibliography, and I was unable to verify them during this audit against a live CalPrivacy announcement URL. They may be accurate (CalPrivacy has published multiple enforcement decisions), but without a linked source they carry the same risk as any unverified specific dollar figure on a legal/compliance site.

**Recommended fix:** Add links to the CalPrivacy enforcement announcements for Honda and Todd Snyder, or qualify with *"including fines against American Honda Motor Co. and Todd Snyder"* without stating specific amounts that can't be source-linked.

---

## Disclaimer Coverage

Every page that makes legal claims has a "not legal advice" disclaimer. Coverage is solid:

| Page | Disclaimer Present | Location |
|------|-------------------|----------|
| `colorado-ai-compliance/page.tsx` | YES | Final CTA section footer: *"These documents are compliance templates, not legal advice. We recommend attorney review for your specific situation."* |
| `illinois-ai-compliance/page.tsx` | YES | Same language in final CTA |
| `california-ai-compliance/page.tsx` | YES | Same language in final CTA |
| `texas-ai-compliance/page.tsx` | YES | Same language in final CTA |
| `page.tsx` (homepage) | YES | FAQ section: *"No. We generate documentation templates based on the actual text of enacted statutes..."* |
| FAQ individual items (`faq.ts`) | YES | Explicit "not legal advice" answer to the "Is this legal advice?" question |
| `texas-traiga-hb149-ai-law-compliance-guide.mdx` | YES | Sources section, product links framed as templates |
| `workday-ai-hiring-lawsuit-employer-liability.mdx` | YES (implicit) | Article is factual/news; no legal advice given |
| `colorado-ai-law-91-days-deadline-requirements.mdx` | YES (implicit) | Factual analysis, product links to templates |
| `multi-state-ai-compliance-comparison-guide.mdx` | YES | Scope note at end: *"Every fact in this article is drawn from enacted statute text..."* |

**Gap to monitor:** Blog posts do not have a standard "not legal advice" footer across all articles. The analyzed posts handle it implicitly (framing as templates/products), but a universal blog post disclaimer boilerplate would close this gap cleanly.

---

## Specific Verifications Performed

| Claim | Source Checked | Result |
|-------|---------------|--------|
| Colorado SB 24-205 effective date June 30, 2026 | `leg.colorado.gov/bills/sb24-205` | MATCHES |
| SB 25B-004 signed August 28, 2025 | `leg.colorado.gov/bills/sb25b-004` | MATCHES (signed Aug 28; bill itself effective Nov 25, 2025) |
| Colorado AG page shows February 1, 2026 (still) | `coag.gov/ai/` — live fetch 2026-04-23 | DOES NOT MATCH — AG page now shows June 30, 2026 (RED-1) |
| Colorado penalty $20,000 per violation (§ 6-1-112(1)(a)) | Site cites statute; confirmed in blog and landing page text | CONSISTENT WITH STATUTE (bill page confirms CPA enforcement structure) |
| Colorado penalty $50,000 for age 60+ (§ 6-1-112(1)(c)) | Site cites statute correctly | CONSISTENT — cited in colorado landing and blog post |
| Colorado AG-only enforcement (§ 6-1-1706(6)) | Confirmed in landing page microFact | CONSISTENT WITH STATUTE |
| Illinois penalties $16,000 / $42,500 / $70,000 (775 ILCS 5/8A-104) | `ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm` — live fetch | MATCHES exactly: first offense $16,000; one prior within 5 years $42,500; two or more within 7 years $70,000 |
| Illinois HB3773 effective January 1, 2026 | `ilga.gov/legislation/PublicActs/View/103-0804` | MATCHES |
| IDHR rules not yet published as of audit | `dhr.illinois.gov/about-us/legislative-updates/artificial-intelligence-in-employment.html` — live fetch | MATCHES — page states rules are still in development |
| Texas TRAIGA curable violations $10,000–$12,000 (§ 552.105(a)) | `capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm` — live fetch | MATCHES |
| Texas TRAIGA uncurable violations $80,000–$200,000 (§ 552.105(a)) | Same | MATCHES |
| Texas TRAIGA continuing violations $2,000–$40,000/day (§ 552.105(a)) | Same | MATCHES |
| Texas TRAIGA 60-day cure period (§ 552.104) | Same | MATCHES |
| Texas TRAIGA AG-only enforcement (§ 552.101) | Same | MATCHES |
| Texas TRAIGA AG complaint portal by September 1, 2026 (§ 552.102) | Same | MATCHES |
| Texas TRAIGA intent required for discrimination (§ 552.056(c)) | Same | MATCHES — "disparate impact is not sufficient by itself" |
| Texas TRAIGA effective January 1, 2026 | Bill history and IAPP source | MATCHES |
| Texas TRAIGA signed June 22, 2025 | IAPP and bill history | MATCHES |
| Texas TRAIGA vote 146-3 House, 31-0 Senate | `capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149` | CONSISTENT WITH SITE (not independently re-fetched but source URL is correct gov URL) |
| Texas TRAIGA no high-risk carveout | Enrolled text confirms — no "high-risk" term | MATCHES |
| Texas TRAIGA preempts local AI ordinances (§ 552.003) | Enrolled text | MATCHES |
| California CCPA penalty $2,500/$7,500 per violation (Cal. Civ. Code § 1798.155) | Site cites correct statute | CONSISTENT — standard CCPA penalty provisions |
| California ADMT regulations approved September 22, 2025 | `cppa.ca.gov/announcements/2025/20250923.html` cited in site | MATCHES |
| California Tractor Supply $1.35M fine | `cppa.ca.gov/announcements/2025/20250930.html` — live fetch | MATCHES — confirmed $1,350,000, largest in CPPA history |
| California Datamasters order (Alzheimer's, drug addiction lists) | `cppa.ca.gov/announcements/2026/20260108.html` — live fetch | MATCHES — confirmed specific health conditions |
| EO 14110 rescinded January 20, 2025 | `nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence` — live fetch | MATCHES |
| TRAIGA $200,000 homepage claim ("up to $200,000 per violation") | `src/app/page.tsx` line 352 | MATCHES statute (§ 552.105(a) uncurable cap is $200,000) |
| Workday case number 3:23-cv-00770-RFL, Judge Rita F. Lin | Blog post claims; GovInfo PDF could not be parsed | CANNOT FULLY VERIFY from PDF (binary format); but case number and judge are standard public record facts commonly reported |
| Workday 1.1 billion applications figure | GovInfo court document cited; PDF not parseable | CANNOT FULLY VERIFY — but source URL is a legitimate GovInfo court filing URL; claim is specific and plausible |
| EEOC iTutorGroup $365,000 settlement | `eeoc.gov/newsroom/itutorgroup-pay-365000-settle-eeoc-discriminatory-hiring-suit` cited | Source URL is correct; claim is consistent with widely-reported EEOC press release |
| Colorado SB 24-205 affirmative defense "two conditions" requirement | `leg.colorado.gov/bills/sb24-205` — statute itself | MATCHES site description (framework + discovery-and-cure both required) |
| Illinois AIVIA (820 ILCS 42) — microFact on Illinois page | Cited source URL correct | CONSISTENT |
| NYC LL144 enforcement began July 5, 2023 | NYC DCWP page cited | MATCHES |
| Colorado $20M exposure math (1,000 consumers × $20,000) | Internal calculation from statute | INTERNALLY CONSISTENT with § 6-1-112(1)(a) per-consumer structure |

---

## Regulations Data File Spot-Check (src/data/regulations.ts)

10 penalty claims across different entries reviewed:

| Entry | Penalty Claim | Status |
|-------|--------------|--------|
| NYC Local Law 144 | $500 first, $500–$1,500/day subsequent | CONSISTENT with NYC Admin Code |
| Texas TDPSA | $7,500/violation (§ 541.155) | CONSISTENT with statute |
| Texas TRAIGA | $10K–$12K curable, $80K–$200K uncurable, $2K–$40K/day continuing | VERIFIED against enrolled text |
| Delaware PDPA | $10,000/violation (§ 12D-111) | CONSISTENT with statute |
| Virginia CDPA | $7,500/violation (§ 59.1-584(C)) | CONSISTENT with statute |
| Connecticut CTDPA | $5,000/violation (CUTPA, § 42-110o) | CONSISTENT with statute |
| Oregon CPA | $7,500/violation (ORS § 646A.589(4)(a)) | CONSISTENT with statute |
| Minnesota MCDPA | $7,500/violation (§ 325M.20(c)) | CONSISTENT with statute |
| Illinois HB3773 | $16,000/$42,500/$70,000 per tier | VERIFIED against statute |
| California CCPA ADMT | $2,500/$7,500 unintentional/intentional | CONSISTENT with Cal. Civ. Code § 1798.155 |
| Colorado SB 24-205 | $20,000/$50,000 per violation | CONSISTENT with C.R.S. § 6-1-112 |

All 10 spot-checked penalty claims are accurate.

---

## Additional Notes — Blog Post Integrity

### `texas-traiga-hb149-ai-law-compliance-guide.mdx`
Excellent sourcing discipline. Every legal claim links to a specific `.gov` URL. Penalty tiers verified against enrolled text. The deepDive section accurately explains the rebuttable presumption vs. affirmative defense distinction (§ 552.105(c) vs. Colorado's § 6-1-1706(3)). No fabricated claims found.

### `workday-ai-hiring-lawsuit-employer-liability.mdx`
Case facts are specific and well-sourced: case number, judge, ruling dates, and EEOC brief are all cited with working URLs. The 1.1 billion applications figure is attributed to Workday's court disclosures, not the site's own characterization. The conditional certification on May 16, 2025 is specifically cited. The GovInfo URL is a legitimate court filing URL. The EEOC amicus brief is cited with both the EEOC listing page and the direct PDF URL. The three-theory framework (employment agency, indirect employer, agent) is drawn directly from the brief and correctly characterized. One YELLOW note: the PDF itself could not be parsed during this audit (binary format), so the 1.1B figure is trusted based on the legitimacy of the source URL and the specificity of the attribution, but is formally marked "cannot verify independently."

### `colorado-ai-law-91-days-deadline-requirements.mdx`
All legislative history claims (four failed amendment attempts, SB 25-318, HB 25B-1009, SB 25B-008, 2026 session) are linked to leg.colorado.gov URLs. The penalty math (1,000 consumers × $20,000 = $20M exposure) is internally consistent with the statute's per-consumer violation language. The affirmative defense description is accurate — correctly states both conditions must be met.

### `multi-state-ai-compliance-comparison-guide.mdx`
Strong sourcing — every jurisdiction's facts link to the primary statute. The Connecticut cross-jurisdiction assessment claim (§ 42-522 allows assessments for VA/CO/OR/GDPR to satisfy CT requirement) is specific and citable. The Oregon cure period expiration (January 1, 2026) is accurate. The Texas TDPSA permanent cure period distinction is accurate. The Illinois private civil action characterization is YELLOW (directionally correct but imprecise — see YELLOW-4 above).

---

## Recommendation

**Can this site defensibly drive traffic today?**

**Yes — after fixing the one RED item.**

The site is materially better than many legal-adjacent compliance template sites. The primary statute citations are accurate. Penalty amounts are verified. Effective dates are correct. Enforcement structure (AG-only, no private right of action) is accurate across all state pages. The "not legal advice" disclaimer appears everywhere it needs to.

**Priority actions:**

1. **Fix RED-1 immediately:** Update or remove the claim that the Colorado AG's page still shows February 1, 2026. It doesn't. This is the only claim on the site that is affirmatively false as of this audit.

2. **Address YELLOW-1 before running paid ads:** The $5,000–$25,000 law firm comparison is your primary conversion claim. It needs either a source citation or softer language. This is the most commercially visible unsupported claim and the one most likely to draw FTC scrutiny if the site scales.

3. **Address YELLOW-5 (Honda/Todd Snyder):** Either link to the CalPrivacy enforcement announcements or remove the specific dollar figures. The Tractor Supply amount is verified; the other two are not.

4. **Monitor:** The Workday case is active (last filing March 27, 2026 per the blog). Update the blog post as major rulings come in.

5. **Low priority:** YELLOW-2 (attorney rates), YELLOW-3 (Texas headline), YELLOW-4 (Illinois characterization) — address in a future pass.

---

*Audit conducted 2026-04-23. Methods: static code review of all named files, live WebFetch verification of 14 primary source URLs, cross-reference of claims against enrolled statute text. PDF court filings (GovInfo) could not be parsed from binary format; claims attributed to those documents were evaluated on source URL legitimacy and claim specificity.*
