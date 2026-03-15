# WITNESS ALPHA — Data Integrity & Configuration Findings
## Triadic Add-On Audit — 17 New Products
**Date:** 2026-03-14
**Lens:** Data Integrity & Configuration
**Files examined:** regulations.ts, regulation-config.ts, send-documents/route.ts, pdf-generator.ts

---

## Summary

All 17 slugs are present in all 4 files. Prices and document counts match the research doc. `ready: false` and `stripePriceId: ""` are set correctly on all 17. The critical failures are in `route.ts` — step descriptions reference document names that do not exist in the actual product, affecting 9 of 17 products. There is also a repeating statute citation error in the Virginia add-ons in route.ts.

**Clean products (no inconsistencies found):** il-notice-response-kit, il-zip-proxy-audit, co-appeal-correction-kit, co-ag-reporting-kit, co-dev-deploy-exchange, ca-admt-notice-optout, ca-admt-access-kit, eu-post-market-kit

**Products with issues:** ca-cyber-audit-kit, nyc-bias-audit-mgmt, nyc-candidate-notice-kit, va-consumer-rights-kit, va-profiling-assessment-kit, va-controller-processor-kit, eu-fria-kit, eu-human-oversight-kit, eu-registration-transparency + VA statute citation error across 3 products in route.ts

---

## Section 1: regulations.ts Audit

### Presence: All 17 slugs exist. ✓
All 17 add-on entries appear under the STATE ADD-ONS section beginning at line 1119. Slugs verified:
`il-notice-response-kit`, `il-zip-proxy-audit`, `co-appeal-correction-kit`, `co-ag-reporting-kit`, `co-dev-deploy-exchange`, `ca-admt-notice-optout`, `ca-admt-access-kit`, `ca-cyber-audit-kit`, `nyc-bias-audit-mgmt`, `nyc-candidate-notice-kit`, `va-consumer-rights-kit`, `va-profiling-assessment-kit`, `va-controller-processor-kit`, `eu-fria-kit`, `eu-post-market-kit`, `eu-human-oversight-kit`, `eu-registration-transparency`

### ready: All 17 set to `false`. ✓

### stripePriceId: All 17 set to `""`. ✓

### Price vs. Research Doc (law-specific-addons-2026-03-15.md):

| Slug | Research Price | regulations.ts Price | Match? |
|------|---------------|---------------------|--------|
| il-notice-response-kit | $79 | $79 | ✓ |
| il-zip-proxy-audit | $99 | $99 | ✓ |
| co-appeal-correction-kit | $99 | $99 | ✓ |
| co-ag-reporting-kit | $129 | $129 | ✓ |
| co-dev-deploy-exchange | $109 | $109 | ✓ |
| ca-admt-notice-optout | $99 | $99 | ✓ |
| ca-admt-access-kit | $89 | $89 | ✓ |
| ca-cyber-audit-kit | $149 | $149 | ✓ |
| nyc-bias-audit-mgmt | $129 | $129 | ✓ |
| nyc-candidate-notice-kit | $89 | $89 | ✓ |
| va-consumer-rights-kit | $99 | $99 | ✓ |
| va-profiling-assessment-kit | $109 | $109 | ✓ |
| va-controller-processor-kit | $89 | $89 | ✓ |
| eu-fria-kit | $149 | $149 | ✓ |
| eu-post-market-kit | $139 | $139 | ✓ |
| eu-human-oversight-kit | $99 | $99 | ✓ |
| eu-registration-transparency | $89 | $89 | ✓ |

**All 17 prices match the research doc exactly.** ✓

### documentCount vs. actual documents array: All 17 set to 3. All 17 have exactly 3 items in `documents[]`. ✓

### Documents array — regulations.ts entries (spot check for naming):
All documents arrays contain plain human-readable names consistent with what the PDF generator produces. No issues found.

---

## Section 2: regulation-config.ts Audit

### Presence: All 17 slugs exist. ✓

### lawUrl — all point to .gov or official EU sources:
- IL: `https://www.ilga.gov/...` ✓
- CO: `https://leg.colorado.gov/bills/sb24-205` ✓
- CA: `https://cppa.ca.gov/regulations/` ✓
- NYC: `https://legistar.council.nyc.gov/...` ✓
- VA: `https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/` ✓
- EU: `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689` ✓

All lawUrls are .gov or eur-lex.europa.eu. ✓

### basePrice vs. regulations.ts price: All 17 match exactly. ✓

### documents array in regulation-config.ts vs. regulations.ts:
All 17 products have identical document lists in both files. ✓

### acknowledgment — parent law references:
- IL add-ons: reference 775 ILCS 5/2-102(L) ✓
- CO add-ons: reference C.R.S. §§ 6-1-1701 through 6-1-1707 ✓
- CA add-ons: reference Cal. Civ. Code § 1798.100 et seq. ✓
- NYC add-ons: reference NYC Administrative Code §§ 20-870 through 20-874 ✓
- VA add-ons: reference Va. Code §§ 59.1-575 through 59.1-584 ✓
- EU add-ons: reference Regulation (EU) 2024/1689 ✓

All acknowledgments reference correct parent laws. ✓

---

## Section 3: send-documents/route.ts Audit

### Presence: All 17 slugs exist. ✓

### Step count: All 17 have exactly 3 steps. ✓

### Statute citations in route.ts:

**ISSUE 1 — Statute citation error (3 products):**
The Virginia add-ons in `route.ts` cite the statute as `"Va. Code §§ 59.1-575–59.1-585"` — note the ending section is **59.1-585**.

The Virginia CDPA ends at §59.1-584. Section 59.1-585 does not exist.

Affected route.ts entries:
- `va-consumer-rights-kit` (line ~638): `statute: "Va. Code §§ 59.1-575–59.1-585"`
- `va-profiling-assessment-kit` (line ~651): `statute: "Va. Code §§ 59.1-575–59.1-585"`
- `va-controller-processor-kit` (line ~664): `statute: "Va. Code §§ 59.1-575–59.1-585"`

regulations.ts correctly cites `59.1-575 through 59.1-584` for all three.
regulation-config.ts correctly cites `Va. Code §§ 59.1-575–59.1-584` for all three.

The route.ts is the only file with this error. The erroneous §59.1-585 appears in the email sent to customers after purchase. **Fix needed in route.ts for all three VA add-ons: change `59.1-585` to `59.1-584`.**

### Step descriptions — document name alignment:

The `steps[]` array in route.ts is customer-facing email content. It should describe the documents customers actually receive. In several products, the step descriptions name documents that do not exist in the product.

---

**ISSUE 2 — ca-cyber-audit-kit: All 3 step descriptions name non-existent documents.**

Actual documents (all files agree):
1. Cybersecurity Audit Checklist
2. Risk Assessment Workbook
3. Audit Remediation Tracker

route.ts steps reference:
- Step 1: "Audit Planning Template" — does not exist
- Step 2: "Audit Scope Documentation" — does not exist
- Step 3: "Audit Findings Log" — does not exist

The route.ts appears to have been written for a different version of this product. All three step descriptions will confuse customers who receive documents with different names.

---

**ISSUE 3 — nyc-bias-audit-mgmt: All 3 step descriptions name non-existent documents.**

Actual documents (all files agree):
1. Auditor RFP Template
2. Results Publication Template
3. Annual Renewal Calendar

route.ts steps reference:
- Step 1: "Audit Project Management Template" — does not exist
- Step 2: "Auditor Coordination Checklist" — does not exist
- Step 3: "Audit Cycle Tracking Log" — does not exist

---

**ISSUE 4 — nyc-candidate-notice-kit: Step 3 references a non-existent document.**

Actual documents (all files agree):
1. 10-Day Advance Notice Template
2. Alternative Process Workflow
3. Data Disclosure Response

route.ts step 3: "Log every notice delivery in the Tracking Log" — no tracking log exists in this product. The description is accurate for what the customer should do, but the document name it implies ("Tracking Log") does not match "Data Disclosure Response."

Note: Step 3 should be describing the Data Disclosure Response document, not a tracking log.

---

**ISSUE 5 — va-consumer-rights-kit: Steps 2 and 3 reference non-existent documents.**

Actual documents (all files agree):
1. Rights Request Intake Form
2. Appeal Workflow
3. AG Complaint Referral Notice

route.ts steps reference:
- Step 2: "Response Letter Templates" — does not exist (document 2 is "Appeal Workflow")
- Step 3: "Appeal Documentation Template" — does not exist (document 3 is "AG Complaint Referral Notice")

---

**ISSUE 6 — va-profiling-assessment-kit: All 3 step descriptions use wrong document names.**

Actual documents (all files agree):
1. Profiling Assessment Template
2. Benefits-Risks Worksheet
3. Sensitive Data Consent Form

route.ts steps reference:
- Step 1: "Consequential Decision Identification Worksheet" — does not exist
- Step 2: "Data Protection Assessment" / "Assessment Template" — wrong name (actual: "Profiling Assessment Template")
- Step 3: "Checklist" — does not exist (actual: "Sensitive Data Consent Form")

---

**ISSUE 7 — va-controller-processor-kit: All 3 step descriptions use wrong document names.**

Actual documents (all files agree):
1. Processor DPA Template
2. Processor Audit Questionnaire
3. Subcontractor Flowdown Addendum

route.ts steps reference:
- Step 1: "Agreement Template" — vague/wrong (actual: "Processor DPA Template")
- Step 2: "Instruction Documentation template" — does not exist (actual: "Processor Audit Questionnaire")
- Step 3: "Sub-Processor Management Checklist" — does not exist (actual: "Subcontractor Flowdown Addendum")

---

**ISSUE 8 — eu-fria-kit: Step 2 references a non-existent document.**

Actual documents (all files agree):
1. FRIA Template
2. Authority Notification Letter
3. FRIA Update Trigger Assessment

route.ts step 2: "Document your stakeholder consultations using the Consultation Documentation template" — this document does not exist. Document 2 is "Authority Notification Letter." The step content belongs to a different EU product (possibly a DPIA workflow) and was incorrectly applied here.

---

**ISSUE 9 — eu-human-oversight-kit: Step 2 references a non-existent document.**

Actual documents (all files agree):
1. Oversight Implementation Plan
2. Worker Notification Template
3. Oversight Decision Log

route.ts step 2: "Use the Training Records Template to document oversight personnel training" — this document does not exist. Document 2 is "Worker Notification Template." The step content is thematically related but references the wrong document name.

---

**ISSUE 10 — eu-registration-transparency: Step 2 minor name discrepancy.**

Actual document 2: "Transparency Disclosure Templates"
route.ts step 2 references: "Transparency Obligation Checklist" — does not match. The actual document is "Transparency Disclosure Templates." Minor but technically inaccurate. Actual document 2 is templates, not a checklist.

---

## Section 4: Cross-File Consistency — 3 Full Traces

### Trace 1: co-ag-reporting-kit

| Field | regulations.ts | regulation-config.ts | route.ts | pdf-generator.ts |
|-------|---------------|---------------------|----------|-----------------|
| slug | co-ag-reporting-kit | co-ag-reporting-kit | co-ag-reporting-kit | co-ag-reporting-kit |
| price | $129 | basePrice: 129 | — | — |
| doc count | 3 | 3 | 3 steps | 3 PDFs |
| doc 1 | Discrimination Discovery Form | Discrimination Discovery Form | "Discovery Form" | generateDiscriminationDiscoveryForm → _CO_Discrimination_Discovery.pdf |
| doc 2 | AG Notification Letter | AG Notification Letter | "Notification Letter Template" | generateAgNotificationLetter → _CO_AG_Notification_Letter.pdf |
| doc 3 | Corrective Action Plan | Corrective Action Plan | "Incident Documentation Template" (ISSUE) | generateCorrectiveActionPlan → _CO_Corrective_Action_Plan.pdf |
| lawUrl | n/a | leg.colorado.gov ✓ | statute C.R.S. §§ 6-1-1701–1707 ✓ | n/a |

**Minor issue:** route.ts step 2 says "Complete the Incident Documentation Template" — the actual document is "Corrective Action Plan." The generator correctly produces `_CO_Corrective_Action_Plan.pdf`. The route.ts description is slightly misnamed but the confusion is less severe than in the VA and EU products. The step still makes functional sense.

**Overall verdict:** co-ag-reporting-kit is consistent across regulations.ts, regulation-config.ts, and pdf-generator.ts. The route.ts step 2 has a minor document name error.

---

### Trace 2: eu-fria-kit

| Field | regulations.ts | regulation-config.ts | route.ts | pdf-generator.ts |
|-------|---------------|---------------------|----------|-----------------|
| slug | eu-fria-kit | eu-fria-kit | eu-fria-kit | eu-fria-kit |
| price | $149 | basePrice: 149 | — | — |
| doc count | 3 | 3 | 3 steps | 3 PDFs |
| doc 1 | FRIA Template | FRIA Template | "FRIA Template" ✓ | generateFriaTemplate → _EU_FRIA.pdf |
| doc 2 | Authority Notification Letter | Authority Notification Letter | "Consultation Documentation template" **MISMATCH** | generateAuthorityNotification → _EU_Authority_Notification.pdf |
| doc 3 | FRIA Update Trigger Assessment | FRIA Update Trigger Assessment | "file the completed FRIA using the Checklist" **MISMATCH** | generateFriaUpdateTrigger → _EU_FRIA_Update_Trigger.pdf |
| lawUrl | n/a | eur-lex.europa.eu (CELEX URL) ✓ | Regulation (EU) 2024/1689 ✓ | n/a |

**eu-fria-kit is consistent in regulations.ts, regulation-config.ts, and pdf-generator.ts. route.ts step 2 and step 3 describe documents that do not exist.**

---

### Trace 3: ca-admt-access-kit

| Field | regulations.ts | regulation-config.ts | route.ts | pdf-generator.ts |
|-------|---------------|---------------------|----------|-----------------|
| slug | ca-admt-access-kit | ca-admt-access-kit | ca-admt-access-kit | ca-admt-access-kit |
| price | $89 | basePrice: 89 | — | — |
| doc count | 3 | 3 | 3 steps | 3 PDFs |
| doc 1 | Access Request Intake Form | Access Request Intake Form | "Access Request Intake Form" ✓ | generateAccessRequestIntake → _CA_ADMT_Access_Request_Intake.pdf |
| doc 2 | ADMT Output Explanation Template | ADMT Output Explanation Template | "Logic Disclosure Response Template" (close, minor name drift) | generateAdmtOutputExplanation → _CA_ADMT_Output_Explanation.pdf |
| doc 3 | Response Timeline Tracker | Response Timeline Tracker | "Access Request Log" **MISMATCH** | generateResponseTimelineTracker → _CA_ADMT_Response_Tracker.pdf |
| lawUrl | n/a | cppa.ca.gov ✓ | Cal. Civ. Code § 1798.100 et seq. ✓ | n/a |

**ca-admt-access-kit is consistent in regulations.ts, regulation-config.ts, and pdf-generator.ts.**

**Issues in route.ts:**
- Step 2: calls it "Logic Disclosure Response Template" — actual name is "ADMT Output Explanation Template." Functional but wrong name.
- Step 3: calls it "Access Request Log" — actual name is "Response Timeline Tracker." Wrong name; a customer reading the email will look for a document called "Access Request Log" that doesn't exist.

---

## Consolidated Issue List

### Priority 1 — Customer-Facing Errors (route.ts)

These errors appear in emails sent to customers after purchase. A customer will receive a document with one name and an email telling them to "use" a document with a different name.

| # | Product | Step | Email Says | Actual Document |
|---|---------|------|-----------|----------------|
| 1 | va-consumer-rights-kit | Step 2 | "Response Letter Templates" | Appeal Workflow |
| 2 | va-consumer-rights-kit | Step 3 | "Appeal Documentation Template" | AG Complaint Referral Notice |
| 3 | va-profiling-assessment-kit | Step 1 | "Consequential Decision Identification Worksheet" | Profiling Assessment Template |
| 4 | va-profiling-assessment-kit | Step 3 | "Checklist" | Sensitive Data Consent Form |
| 5 | va-controller-processor-kit | Step 2 | "Instruction Documentation template" | Processor Audit Questionnaire |
| 6 | va-controller-processor-kit | Step 3 | "Sub-Processor Management Checklist" | Subcontractor Flowdown Addendum |
| 7 | eu-fria-kit | Step 2 | "Consultation Documentation template" | Authority Notification Letter |
| 8 | eu-fria-kit | Step 3 | "file using the Checklist" | FRIA Update Trigger Assessment |
| 9 | eu-human-oversight-kit | Step 2 | "Training Records Template" | Worker Notification Template |
| 10 | ca-cyber-audit-kit | Step 1 | "Audit Planning Template" | Cybersecurity Audit Checklist |
| 11 | ca-cyber-audit-kit | Step 2 | "Audit Scope Documentation" | Risk Assessment Workbook |
| 12 | ca-cyber-audit-kit | Step 3 | "Audit Findings Log" | Audit Remediation Tracker |
| 13 | nyc-bias-audit-mgmt | Step 1 | "Audit Project Management Template" | Auditor RFP Template |
| 14 | nyc-bias-audit-mgmt | Step 2 | "Auditor Coordination Checklist" | Results Publication Template |
| 15 | nyc-bias-audit-mgmt | Step 3 | "Audit Cycle Tracking Log" | Annual Renewal Calendar |
| 16 | nyc-candidate-notice-kit | Step 3 | "Tracking Log" | Data Disclosure Response |
| 17 | ca-admt-access-kit | Step 3 | "Access Request Log" | Response Timeline Tracker |
| 18 | eu-registration-transparency | Step 2 | "Transparency Obligation Checklist" | Transparency Disclosure Templates |
| 19 | co-ag-reporting-kit | Step 2 | "Incident Documentation Template" | Corrective Action Plan |
| 20 | va-consumer-rights-kit statute | — | "§§ 59.1-575–59.1-585" | Should be 59.1-584 |
| 21 | va-profiling-assessment-kit statute | — | "§§ 59.1-575–59.1-585" | Should be 59.1-584 |
| 22 | va-controller-processor-kit statute | — | "§§ 59.1-575–59.1-585" | Should be 59.1-584 |

### Priority 2 — Minor Name Drift (functionally understandable but technically wrong)

| # | Product | File | Issue |
|---|---------|------|-------|
| 1 | ca-admt-access-kit | route.ts step 2 | "Logic Disclosure Response Template" vs. actual "ADMT Output Explanation Template" |
| 2 | va-controller-processor-kit | route.ts step 1 | "Agreement Template" vs. actual "Processor DPA Template" |
| 3 | va-profiling-assessment-kit | route.ts step 2 | "Data Protection Assessment" vs. actual "Profiling Assessment Template" |

---

## Clean Products (No Issues Found)

These 8 products are fully consistent across all 4 files:

1. il-notice-response-kit
2. il-zip-proxy-audit
3. co-appeal-correction-kit
4. co-dev-deploy-exchange
5. ca-admt-notice-optout
6. eu-post-market-kit
7. eu-human-oversight-kit — **except** step 2 has "Training Records Template" issue (listed in Priority 1 above — retract this from clean list)
8. eu-registration-transparency — **except** step 2 has Checklist vs Templates issue (listed in Priority 1 above)

**Truly clean (no issues in any file):**
1. il-notice-response-kit ✓
2. il-zip-proxy-audit ✓
3. co-appeal-correction-kit ✓
4. co-dev-deploy-exchange ✓
5. ca-admt-notice-optout ✓
6. eu-post-market-kit ✓

---

## Root Cause Assessment

The pattern of route.ts errors suggests that the email step descriptions for several products were either:
- Drafted against an earlier version of the document list before final names were set, or
- Copied/adapted from similar products without being updated to match the actual document names

The data layer (regulations.ts, regulation-config.ts, pdf-generator.ts) is internally consistent. The break point is exclusively in route.ts — the customer-facing email layer. The PDF generator will produce correctly named documents; the email telling customers what to do with them will sometimes name the wrong documents.

The Virginia statute error (§59.1-585) in route.ts is a copy error that appears to have propagated to all three VA add-on email templates simultaneously.
