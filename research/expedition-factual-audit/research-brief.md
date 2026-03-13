# Research Brief: Website Factual Legal Audit
## Date: 2026-03-13
## Project: AI Compliance Documents (aicompliancedocuments.com)

### Problem Statement
Every factual legal claim on the website must be verified against enacted statute text. Previous instances wrote legal data from training knowledge — citing wrong bills, wrong code sections, fabricated penalties, and wrong effective dates. This audit must find every remaining error before the site goes live under the new brand.

### Expected Outcome
A comprehensive audit report where every legal claim in every customer-facing file is marked as VERIFIED (with primary source), WRONG (with explanation), or UNVERIFIED (with exact browser prompt for Guiding Light). No fact is skipped. No fact is assumed correct because it's already in the codebase.

### Current State
- 6 products are `ready: true` (IL HB3773, CO SB24-205, Employee AI Policy, Vendor Due Diligence, Bias Audit, Incident Response)
- The Research Council legal audit (completed earlier today) fixed 13 errors in the IL and CO products
- 4 research teams are currently verifying the non-ready products' data in regulations.ts
- This expedition audits the CONTENT of the ready products — the actual text inside PDF generators, blog posts, emails, and product pages

### Constraints
- TRAINING DATA IS NEVER AN ACCEPTABLE SOURCE. Read PRODUCT-ONBOARDING.md.
- If you cannot fetch the primary source, mark it UNVERIFIED and write the exact browser prompt.
- Do NOT modify any files. Read only.
- Every claim must be checked: citations, section numbers, penalty amounts, effective dates, enforcement mechanisms, rights statements, applicability thresholds.

### Destructive Boundaries
- Do NOT modify any source files
- Do NOT change regulations.ts, regulation-config.ts, or any PDF generator
- Do NOT "fix" anything — report only

### Research Angles

**Team 1: Illinois Product Content** — Read all 8 IL PDF generators in `src/lib/pdf-illinois/`. Check every statute citation (775 ILCS 5/2-102(L), subsections, IDHR references), every penalty amount, every rights statement in the notification letter, every reference to proposed IDHR Subpart J rules. Cross-check against the enacted text at https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102 and https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K8A-104

**Team 2: Colorado Product Content** — Read all 8 CO PDF generators in `src/lib/pdf-colorado/`. Check every statute citation (C.R.S. §§ 6-1-1701 through 6-1-1707, subsections), every reference to AG enforcement, every consumer rights statement. Fetch the CO bill text from https://leg.colorado.gov/bills/sb24-205

**Team 3: Universal Product Content** — Read all generators in `src/lib/pdf-employee-ai-policy/`, `src/lib/pdf-vendor-due-diligence/`, `src/lib/pdf-bias-audit/`, `src/lib/pdf-incident-response/`. These reference MULTIPLE laws (NIST AI RMF, EEOC 29 CFR § 1607, NYC LL144, EU AI Act, CA TFAIA, CO SB205, IL HB3773, TX TRAIGA). Every cross-law reference must be checked.

**Team 4: Blog Posts + Homepage + Emails** — Read all 6 blog posts in `content/blog/`, the homepage at `src/app/page.tsx`, and the email templates in `src/app/api/send-documents/route.ts`. Check every factual claim, every penalty figure, every effective date, every enforcement statement. Also check `src/lib/pdf-helpers.ts` (REGULATION_HEADER entries) and `src/lib/regulation-config.ts` (acknowledgment text, help text).

**Team 5: Cross-Reference Consistency** — Check that the same facts are stated identically across all files. Same effective date in regulations.ts, pdf-helpers.ts, regulation-config.ts, route.ts, blog posts. Same penalty amounts. Same enforcement mechanism. Same citations. Any inconsistency between files is a finding.

### Team Size: 5
Five angles, all independent, massive scope. Each team has a distinct file set with minimal overlap.

### Failed Approaches
Previous instances verified legal facts by:
- Reading summaries instead of statute text → resulted in wrong section numbers
- Using training knowledge → resulted in citing nonexistent laws
- Checking only one file and assuming others match → resulted in cross-reference inconsistencies
- Trusting existing codebase data → every product researched so far had errors
