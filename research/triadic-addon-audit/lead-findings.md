# Lead Auditor Findings — Template Conformance
**Lens:** Template Conformance
**Date:** 2026-03-14
**Auditor role:** Lead (Pattern conformance against reference generators)

---

## Reference Pattern Summary

From reading the three gold-standard generators, the canonical pattern is:

| Check | Expected Pattern |
|-------|-----------------|
| Import path | `from "../pdf-helpers"` (relative, not `@/lib/pdf-helpers`) |
| Import style | Named imports only — no default import of helpers |
| `jsPDF` import | `import { jsPDF } from "jspdf"` |
| `ComplianceFormData` import | `import type { ComplianceFormData } from "../pdf-types"` |
| Function | Named export, receives `data: ComplianceFormData`, returns `jsPDF` |
| Opening sequence | `new jsPDF()` → `addDocHeader` → `addTopDisclaimer` → body |
| Signature block | `addSignatureBlock(doc, "<prefix>", y)` BEFORE `addDisclaimer(doc)` |
| Closing | `addDisclaimer(doc)` then `return doc` — NO `doc.save()` |
| Page break guard | `if (y > 240) { doc.addPage(); y = 20; }` before signature block |
| Field name prefixes | Short unique prefix per document (e.g., `il_checklist_`, `co_rmp_`, `channel_`) |

**Notable variation in references:** `opt-out-mechanism.ts` does NOT call `addSignatureBlock` — it closes with just `addDisclaimer(doc); return doc`. This is the only reference generator that omits the signature block. It is likely intentional (the document is a consumer-facing opt-out form, not an internal compliance sign-off). This establishes that omission of `addSignatureBlock` is permissible in consumer-facing documents.

---

## Sampled File Findings

### 1. `src/lib/pdf-il-notice-response/employee-notification-template.ts`

**Function exported:** `generateEmployeeNotificationTemplate` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** `addSignatureBlock(doc, "ent_notice", y)` at line 227 ✓
**addDisclaimer order:** `addDisclaimer(doc)` at line 228, after signature block ✓
**return doc:** Line 229, no `doc.save()` ✓
**Page break guard:** `if (y > 240) { doc.addPage(); y = 20; }` at line 223 ✓
**Field name prefix:** `ent_` — unique to this document ✓
**Imports used but need verification:** `DECISION_LABELS` imported from `../pdf-helpers` (line 15) — this is an additional named export not present in all reference generators; should confirm it is actually exported from helpers (not audited here, but the import path is correct)

**FINDING:** PASS. No conformance issues.

---

### 2. `src/lib/pdf-co-ag-reporting/ag-notification-letter.ts`

**Function exported:** `generateAgNotificationLetter` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** `addSignatureBlock(doc, "anl_ag_letter", y)` at line 222 ✓
**addDisclaimer order:** `addDisclaimer(doc)` at line 223, after signature block ✓
**return doc:** Line 224, no `doc.save()` ✓
**Page break guard:** `if (y > 240) { doc.addPage(); y = 20; }` at line 218 ✓
**Field name prefix:** `anl_` — unique to this document ✓

**FINDING:** PASS. No conformance issues.

---

### 3. `src/lib/pdf-ca-admt-access/admt-output-explanation.ts`

**Function exported:** `generateAdmtOutputExplanation` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** `addSignatureBlock(doc, "aoe", y)` at line 274 ✓
**addDisclaimer order:** `addDisclaimer(doc)` at line 276, after signature block ✓
**return doc:** Line 277, no `doc.save()` ✓
**Page break guard:** MISSING — no `if (y > 240)` guard before `addSignatureBlock` at line 274.

The file has an inline page break guard at line 100 (`if (y > 255) { doc.addPage(); y = MARGIN; }`) within the `data.aiSystems.forEach` loop, but there is NO guard immediately before the `addSignatureBlock` call. The reference generators (`compliance-checklist.ts` line 140, `risk-management-policy.ts` line 224) both place an explicit guard directly before the signature block. This document skips that.

**Field name prefix:** `aoe_` — unique to this document ✓

**FINDING:** MINOR DEFECT at line 274. Missing page-break guard before `addSignatureBlock`. On a long document with many AI systems, the signature block could render off the bottom of a page.

**Fix required:**
```ts
// Before line 274:
if (y > 240) { doc.addPage(); y = 20; }
y = addSignatureBlock(doc, "aoe", y);
```

---

### 4. `src/lib/pdf-nyc-bias-audit-mgmt/results-publication-template.ts`

**Function exported:** `generateResultsPublicationTemplate` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** NOT IMPORTED and NOT CALLED. `addSignatureBlock` is absent from the import list (line 3–14) and absent from the function body.
**addDisclaimer:** `addDisclaimer(doc)` at line 254, then `return doc` at line 255 ✓ (pattern matches `opt-out-mechanism.ts` reference)
**return doc:** Line 255, no `doc.save()` ✓
**Page break guard:** No explicit guard before end (not needed since there is no signature block) ✓
**Field name prefix:** `rpt_` — unique to this document ✓

**FINDING:** ACCEPTABLE DEVIATION — no signature block, matching the `opt-out-mechanism.ts` reference pattern. However, this is a **publicly posted website disclosure template**, not an internal sign-off document. Confirm with product owner whether a signature block is intentionally omitted. If all NYC Bias Audit Mgmt kit documents should have signature blocks, this is a defect.

**Action item:** Product owner decision needed — is omission of signature block intentional for this publication template?

---

### 5. `src/lib/pdf-va-consumer-rights/appeal-workflow.ts`

**Function exported:** `generateAppealWorkflow` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** `addSignatureBlock(doc, "apw", y)` at line 184 ✓
**addDisclaimer order:** `addDisclaimer(doc)` at line 186, after signature block ✓
**return doc:** Line 187, no `doc.save()` ✓
**Page break guard:** `if (y > 240) { doc.addPage(); y = 20; }` at line 183 ✓
**Field name prefix:** `apw_` — unique to this document ✓

**FINDING:** PASS. No conformance issues.

---

### 6. `src/lib/pdf-eu-fria/fria-template.ts`

**Function exported:** `generateFriaTemplate` — NAMED EXPORT. ✓
**Import path:** `from "../pdf-helpers"` ✓
**jsPDF + types import:** Correct ✓
**addDocHeader / addTopDisclaimer:** Present, called in correct order ✓
**Signature block:** `addSignatureBlock(doc, "fria_sign", y)` at line 330 ✓
**addDisclaimer order:** `addDisclaimer(doc)` at line 332, after signature block ✓
**return doc:** Line 333, no `doc.save()` ✓
**Page break guard:** `if (y > 240) { doc.addPage(); y = 20; }` at lines 326–329, directly before signature block ✓
**Field name prefix:** `fria_` — unique to this document ✓

**FINDING:** PASS. No conformance issues.

---

## Routing Audit — `src/lib/pdf-generator.ts`

### 17 New Add-On Routes Identified

The following routes for the new add-on kits are present in `pdf-generator.ts`. Each was verified for: presence of route, correct import path, function name match.

| Regulation key | Import path | Functions called | Status |
|---|---|---|---|
| `il-notice-response-kit` | `./pdf-il-notice-response` | `generateEmployeeNotificationTemplate`, `generateAiUseLoggingForm`, `generateEmployeeInquiryResponse` | ✓ |
| `il-zip-proxy-audit` | `./pdf-il-zip-proxy-audit` | `generateDataInputAudit`, `generateProxyAnalysisWorksheet`, `generateRemediationPlan` | ✓ |
| `co-appeal-correction-kit` | `./pdf-co-appeal-correction` | `generateAppealIntakeForm`, `generateDataCorrectionRequest`, `generateAppealOutcomeLetter` | ✓ |
| `co-ag-reporting-kit` | `./pdf-co-ag-reporting` | `generateDiscriminationDiscoveryForm`, `generateAgNotificationLetter`, `generateCorrectiveActionPlan` | ✓ |
| `co-dev-deploy-exchange` | `./pdf-co-dev-deploy-exchange` | `generateDeveloperDisclosureChecklist`, `generateDeployerGapAnalysis`, `generateThirdPartyAssessmentAddendum` | ✓ |
| `ca-admt-notice-optout` | `./pdf-ca-admt-notice-optout` | `generatePreUseNotice`, `generateOptoutRequestProcessing`, `generateOptoutExceptionDocumentation` | ✓ |
| `ca-admt-access-kit` | `./pdf-ca-admt-access` | `generateAccessRequestIntake`, `generateAdmtOutputExplanation`, `generateResponseTimelineTracker` | ✓ |
| `ca-cyber-audit-kit` | `./pdf-ca-cyber-audit` | `generateCybersecurityAuditChecklist`, `generateRiskAssessmentWorkbook`, `generateAuditRemediationTracker` | ✓ |
| `nyc-bias-audit-mgmt` | `./pdf-nyc-bias-audit-mgmt` | `generateAuditorRfpTemplate`, `generateResultsPublicationTemplate`, `generateAnnualRenewalCalendar` | ✓ |
| `nyc-candidate-notice-kit` | `./pdf-nyc-candidate-notice` | `generateAdvanceNoticeTemplate`, `generateAlternativeProcessWorkflow`, `generateDataDisclosureResponse` | ✓ |
| `va-consumer-rights-kit` | `./pdf-va-consumer-rights` | `generateRightsRequestIntake`, `generateAppealWorkflow`, `generateAgComplaintReferral` | ✓ |
| `va-profiling-assessment-kit` | `./pdf-va-profiling-assessment` | `generateProfilingAssessment`, `generateBenefitsRisksWorksheet`, `generateSensitiveDataConsent` | ✓ |
| `va-controller-processor-kit` | `./pdf-va-controller-processor` | `generateProcessorDpaTemplate`, `generateProcessorAuditQuestionnaire`, `generateSubcontractorFlowdown` | ✓ |
| `eu-fria-kit` | `./pdf-eu-fria` | `generateFriaTemplate`, `generateAuthorityNotification`, `generateFriaUpdateTrigger` | ✓ |
| `eu-post-market-kit` | `./pdf-eu-post-market` | `generateMonitoringPlan`, `generateSeriousIncidentReport`, `generateLogRetentionPolicy` | ✓ |
| `eu-human-oversight-kit` | `./pdf-eu-human-oversight` | `generateOversightImplementationPlan`, `generateWorkerNotification`, `generateOversightDecisionLog` | ✓ |
| `eu-registration-transparency` | `./pdf-eu-registration` | `generateDatabaseRegistrationChecklist`, `generateTransparencyDisclosure`, `generateProviderDocumentationVerification` | ✓ |

**Total new routes counted in pdf-generator.ts: 17**
**All 17 are present and accounted for. ✓**

### Routing Cross-Check: Function Name vs. Actual Exports

For the 6 sampled files, the function names called in the router match the actual exported function names exactly:

| Router calls | Actual export | Match |
|---|---|---|
| `mod.generateEmployeeNotificationTemplate(data)` | `export function generateEmployeeNotificationTemplate` | ✓ |
| `mod.generateAgNotificationLetter(data)` | `export function generateAgNotificationLetter` | ✓ |
| `mod.generateAdmtOutputExplanation(data)` | `export function generateAdmtOutputExplanation` | ✓ |
| `mod.generateResultsPublicationTemplate(data)` | `export function generateResultsPublicationTemplate` | ✓ |
| `mod.generateAppealWorkflow(data)` | `export function generateAppealWorkflow` | ✓ |
| `mod.generateFriaTemplate(data)` | `export function generateFriaTemplate` | ✓ |

No mismatches detected in the sampled set.

---

## Summary of Defects

| Severity | File | Issue | Line(s) |
|---|---|---|---|
| MINOR DEFECT | `src/lib/pdf-ca-admt-access/admt-output-explanation.ts` | Missing page-break guard (`if (y > 240)`) immediately before `addSignatureBlock` call | Line 274 |
| NEEDS DECISION | `src/lib/pdf-nyc-bias-audit-mgmt/results-publication-template.ts` | No `addSignatureBlock` imported or called — intentional for public posting template or omission? | Lines 3–14, 239–256 |

---

## Patterns That Are Consistent Across All 6 Sampled Files

- All use `from "../pdf-helpers"` (relative import) — no `@/lib/pdf-helpers` alias found ✓
- All use `addDocHeader` then `addTopDisclaimer` as the opening two calls ✓
- All return `doc` without calling `doc.save()` ✓
- All use unique field name prefixes with no apparent collision risk across sampled files ✓
- All are named exports (not default exports) ✓
- All import `jsPDF` from `"jspdf"` ✓
- All import `ComplianceFormData` as a type from `"../pdf-types"` ✓

---

## Recommendations

1. **Fix `admt-output-explanation.ts` line 274** — add `if (y > 240) { doc.addPage(); y = 20; }` before `addSignatureBlock`. One-line fix, low risk.

2. **Confirm intent for `results-publication-template.ts`** — if this document is meant to be a publicly posted web disclosure (no internal sign-off needed), the omission of `addSignatureBlock` is correct and matches the `opt-out-mechanism.ts` precedent. If a sign-off IS needed, add the signature block before `addDisclaimer`.

3. **No routing defects found.** All 17 new regulation keys are present in `pdf-generator.ts` with correct import paths. All sampled function name references match actual exports.

4. **Field prefix collision risk is low** across the sampled set (`ent_`, `anl_`, `aoe_`, `rpt_`, `apw_`, `fria_`). The un-sampled 11 kits should be spot-checked by the second auditor for prefix uniqueness, particularly between kits that serve similar purposes (e.g., multiple VA kits, multiple CO kits, multiple EU kits).
