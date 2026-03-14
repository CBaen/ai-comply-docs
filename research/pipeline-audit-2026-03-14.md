# Pipeline Audit Results — 2026-03-14
## Instance: Opus 4.6

## 1. Checkout Pipeline

**FIXED THIS SESSION.** The checkout route (`create-checkout/route.ts`) had a hardcoded `PRICE_MAP` with only Illinois and Colorado. Changed to read `stripePriceId` from `regulations.ts` — all 34 live products now route to Stripe correctly.

## 2. Law Links + Acknowledgment Gate

**ALL 36 PASS.** Every product in `REGULATION_CONFIG` has:
- `lawUrl` pointing to a .gov statute (or equivalent like eur-lex.europa.eu)
- `acknowledgment` text the customer must accept
- The gate in `StepReviewCheckout.tsx` enforces: link must be clicked -> checkbox enabled -> checkout enabled

Minor flags:
- `financial-services-ai`: citationUrl points to finra.org (.org, not .gov) but lawUrl correctly uses ecfr.gov
- `nyc-local-law-144`: citationUrl goes to DCA enforcement page, not statute text (lawUrl is correct)
- 2 non-ready products (K-12 Education, HR/Recruiting) have no REGULATION_CONFIG entry yet

## 3. PDF Fillable Fields

**97% coverage (176 of 182 files). 8 specific gaps.**

### Priority 1 — Customers cannot fill required content:
1. `pdf-manager-ai-training-kit/employee-faq-universal.ts` lines 48/80: `[Fill in: Yes / No / Partially]`, `[Name, Title, Email]`, `[location]` are static strings
2. `pdf-consumer-notice-kit/physical-posting.ts` lines 70/72/130: `[list approved tools]`, `[describe uses]`, `[Contact Name / Phone / Email / Website]` are static with no companion fillable fields
3. `pdf-consumer-rights-kit/response-templates.ts` lines 59/110/161 and 120/123/126: `[Request #]`, `[Describe what is being fulfilled]`, `[Describe what is being denied]`, `[appeal process]` have no companion fillable fields

### Priority 2 — Checkboxes should be real, not static text:
4. `pdf-california-ccpa-admt/risk-assessment.ts` line 113: `[ ] HIGH [ ] MED [ ] LOW` per risk category
5. `pdf-eu-ai-act/risk-management-system.ts` line 104: Same pattern
6. `pdf-colorado/impact-assessment.ts` line 136: Same pattern
7. `pdf-healthcare-ai/ai-risk-assessment.ts` line 122: Same pattern

### Priority 3 — Data fallback prints brackets:
8. `pdf-illinois/notification-letter.ts` line 137: `data.oversight.oversightRole || "[Designated Oversight Role]"` renders literal brackets

### Priority 4 — Missing sign-off/review fields:
9. `pdf-illinois/employee-faq.ts`, `manager-training.ts`, `oversight-protocol.ts`, `system-inventory.ts` — no signature or "reviewed by" block

## 4. Signature Blocks

**CRITICAL: `addSignatureBlock()` is called by ZERO generator files.**

The function exists in `pdf-helpers.ts` with proper ESIGN Act (15 USC 7001) attestation language and 4 fillable form fields (Signature, Title, Date, Organization). But no generator uses it. 54 files have hand-rolled inline signature fields that should use the shared function.

### Files needing `addSignatureBlock()` (54 total):

**Policies & Plans (12):** acceptable-use-policy, governance-policy, steering-committee-charter, approval-workflow, ethics-principles, incident-response-plan, risk-management-plan, whistleblower-policy, supervision-policy, data-retention-policy (NYC), risk-management-policy (CO), record-retention (CO)

**Attestations (7):** training-acknowledgment, training-sign-off, accommodation-form (IL), compliance-checklist (IL), impact-assessment (IL), compliance-checklist (CO), impact-assessment (CO)

**Bias Audits & Certs (10):** bias-audit-report (x2), remediation-plan, bias-audit-summary, bias-audit-checklist, alternative-process-documentation, bias-audit-crossref, annual-compliance-review (EEOC), validation-documentation, adverse-impact-analysis, accommodation-procedures

**Assessments (16):** admt-risk-assessment, admt-impact-assessment, risk-assessment (CA), compliance-checklist (CA), data-protection-assessment (CT/VA/OR/MT/IN/KY/NJ), dpia (MN), dpa (TX/DE), assessment (multi-state), compliance-checklist (multi-state)

**DPAs — bilateral, need dual signature (10):** data-processing-agreement (CT/VA/OR/MN/MT/IN/KY/NJ), contract-addendum (vendor), business-associate-agreement (healthcare)

**Incident & Review (4):** incident-report-template, post-incident-review, annual-review-checklist, update-log

**Vendor Due Diligence (3):** risk-assessment, due-diligence-questionnaire, monitoring-checklist

**EU AI Act (9):** conformity-assessment (Art. 47 — legally required), quality-management-system, technical-documentation, fundamental-rights-impact, risk-management-system, human-oversight, post-market-monitoring, data-governance, transparency-disclosures

**Healthcare/Financial/Board/Other (13):** de-identification-methodology, security-policies, compliance-checklist (healthcare), patient-rights-procedures, model-risk-documentation, vendor-due-diligence-financial, cfpb-udaap-compliance, customer-disclosure, compliance-checklist (financial), executive-summary, risk-register-excerpt, data-inventory, third-party-register, risk-profile, risk-profile-template, compliance-checklist (NIST), transparency-report

### Note on bilateral agreements:
DPAs and BAAs need TWO signature blocks (controller + processor). `addSignatureBlock()` supports a `prefix` parameter that enables this — call it twice with different prefixes.

## 5. Document Lifecycle Completeness (NOT YET AUDITED)

Guiding Light's key insight: when a law gives someone a right (opt-out, accommodation, alternative process), exercising that right creates new documents. Our packages need to cover the full chain:
- The policy that creates the right
- The form for exercising the right
- The process for handling the exercise
- The documentation of the outcome

This requires per-law research by Claude in the browser against each statute.

## 6. Email Delivery

Resend domain verification is STILL pending. FROM_ADDRESS is `noreply@aicompliancedocuments.com`. Without domain verification, emails may not deliver from this address. All 36 products have email templates in REGULATION_EMAIL.

## 7. Changes Made This Session

1. Virginia CDPA blog post published (Article 3, .gov sourced)
2. BlogPosting JSON-LD schema added to all blog posts
3. Dynamic OG image generation (opengraph-image.tsx)
4. Removed broken `/og-image.png` references from layout
5. Blog link restored to nav and footer
6. **CRITICAL: Checkout route fixed — all 34 products now purchasable**
