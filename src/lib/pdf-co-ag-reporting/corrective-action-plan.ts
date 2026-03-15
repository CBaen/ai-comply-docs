import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CO AG Reporting Kit — Doc 3: Corrective Action Plan
// Remediation plan with timeline for algorithmic discrimination
// Per C.R.S. § 6-1-1703 and Colorado Consumer Protection Act
// ============================================================
export function generateCorrectiveActionPlan(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Algorithmic Discrimination Corrective Action Plan",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This corrective action plan documents the remediation approach for algorithmic discrimination discovered in an AI system deployed by ${data.company.name}. C.R.S. § 6-1-1703 requires deployers to take corrective action and notify affected consumers when algorithmic discrimination is discovered. The Colorado AG has exclusive enforcement authority under § 6-1-1706.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Plan Identification ----
  y = addSectionHeader(doc, "Section 1: Plan Identification", y);

  y = addFormTextField(doc, "cap_plan_id", "Corrective Action Plan ID:", y, { width: 80 });
  y = addFormTextField(doc, "cap_ai_system", "AI System Subject to This Plan:", y);
  y = addFormTextField(doc, "cap_vendor", "Vendor / Developer:", y);
  y = addFormTextField(doc, "cap_plan_date", "Plan Adoption Date:", y, {
    prefill: data.generatedDate, width: 80,
  });
  y = addFormTextField(doc, "cap_discovery_date", "Date Discrimination Was Discovered:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "cap_plan_owner", "Plan Owner (Name / Title):", y);
  y = addFormTextField(doc, "cap_executive_sponsor", "Executive Sponsor (Name / Title):", y);
  y = addFormTextField(doc, "cap_legal_counsel", "Legal Counsel (Name / Firm):", y);

  // ---- SECTION 2: Root Cause Analysis ----
  y = addSectionHeader(doc, "Section 2: Root Cause Analysis", y);

  y = addFormTextField(
    doc,
    "cap_discrimination_summary",
    "Summary of discrimination finding:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "cap_root_cause",
    "Root cause of discrimination (technical and operational factors):",
    y,
    { multiline: true, lines: 5 }
  );

  y = addWrappedText(
    doc,
    "Root cause category (check all that apply):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const rootCauses = [
    "Biased or unrepresentative training data",
    "Proxy variables in model inputs (e.g., zip code, school)",
    "Feature selection that correlates with protected characteristics",
    "Model architecture that amplifies existing disparities",
    "Inadequate pre-deployment bias testing",
    "Inadequate ongoing monitoring",
    "Vendor / developer failure to disclose known risks",
    "Configuration or deployment error by deployer",
    "Other (describe below)",
  ];
  rootCauses.forEach((cause, idx) => {
    y = addFormCheckbox(doc, `cap_cause_${idx}`, cause, y);
  });

  y = addFormTextField(doc, "cap_cause_other", "If 'Other' — describe:", y, {
    multiline: true, lines: 2,
  });

  // ---- SECTION 3: Immediate Actions Taken ----
  y = addSectionHeader(doc, "Section 3: Immediate Actions Taken", y);

  y = addWrappedText(
    doc,
    "Check all immediate actions completed. For each, enter the date completed.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const immActions = [
    "AI system use suspended",
    "Affected consumers notified",
    "Internal investigation opened",
    "Legal counsel engaged",
    "Vendor / developer notified and remediation requested",
    "Colorado AG notified",
    "Incident documented and evidence preserved",
  ];
  immActions.forEach((action, idx) => {
    const prefix = `cap_imm_${idx}`;
    y = addFormCheckbox(doc, `${prefix}_check`, action, y);
    y = addFormTextField(doc, `${prefix}_date`, "Date completed:", y, { width: 70 });
    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 1;
  });

  // ---- SECTION 4: Long-Term Fixes ----
  y = addSectionHeader(doc, "Section 4: Long-Term Fixes", y);

  y = addWrappedText(
    doc,
    "For each long-term fix, describe the action, assign responsibility, and set a target date.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 4;

  const longTermFixes = [
    { label: "Remove or replace discriminatory AI system", key: "replace" },
    { label: "Retrain model on representative, debiased dataset", key: "retrain" },
    { label: "Remove proxy variables from model inputs", key: "proxies" },
    { label: "Implement bias detection and ongoing monitoring", key: "monitoring" },
    { label: "Commission independent third-party bias audit", key: "audit" },
    { label: "Update vendor contract to require bias disclosure and remediation", key: "vendor" },
    { label: "Revise internal AI governance policies and procedures", key: "governance" },
    { label: "Train staff on algorithmic discrimination risks", key: "training" },
  ];

  longTermFixes.forEach((fix, idx) => {
    const prefix = `cap_fix${idx + 1}`;
    y = addFormCheckbox(doc, `${prefix}_check`, fix.label, y);
    y = addFormTextField(doc, `${prefix}_detail`, "Specific action / approach:", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_responsible`, "Responsible Person (Name / Title):", y);
    y = addFormTextField(doc, `${prefix}_target`, "Target Completion Date:", y, { width: 70 });
    y = addFormTextField(doc, `${prefix}_actual`, "Actual Completion Date:", y, { width: 70 });

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  });

  // ---- SECTION 5: Testing Plan ----
  y = addSectionHeader(doc, "Section 5: Testing Plan", y);

  y = addFormTextField(
    doc,
    "cap_test_methodology",
    "Testing methodology for corrected / replacement AI system:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "cap_test_metrics",
    "Metrics and thresholds used to confirm discrimination has been eliminated:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "cap_test_party", "Testing conducted by (internal / third party — identify):", y);
  y = addFormTextField(doc, "cap_test_date", "Testing completion date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_test_outcome", "Testing outcome / results:", y, {
    multiline: true, lines: 3,
  });

  // ---- SECTION 6: Monitoring Approach ----
  y = addSectionHeader(doc, "Section 6: Ongoing Monitoring Approach", y);

  y = addFormTextField(
    doc,
    "cap_monitoring_method",
    "Ongoing monitoring method for the corrected system:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "cap_monitoring_frequency",
    "Monitoring frequency (e.g., monthly, quarterly):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "cap_monitoring_owner",
    "Monitoring responsible party (Name / Title):",
    y
  );
  y = addFormTextField(
    doc,
    "cap_monitoring_escalation",
    "Escalation process if monitoring detects new issues:",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 7: Responsible Parties ----
  y = addSectionHeader(doc, "Section 7: Responsible Parties Summary", y);

  y = addFormTextField(doc, "cap_party_plan_owner", "Plan Owner:", y, {
    prefill: data.contact.name,
  });
  y = addFormTextField(doc, "cap_party_exec_sponsor", "Executive Sponsor:", y);
  y = addFormTextField(doc, "cap_party_legal", "Legal Counsel:", y);
  y = addFormTextField(doc, "cap_party_technical", "Technical Lead:", y);
  y = addFormTextField(doc, "cap_party_compliance", "Compliance Officer:", y);
  y = addFormTextField(doc, "cap_party_vendor", "Vendor Contact:", y);

  // ---- SECTION 8: Completion Dates ----
  y = addSectionHeader(doc, "Section 8: Key Dates", y);

  y = addFormTextField(doc, "cap_date_discovery", "Discovery Date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_date_plan_adopted", "Plan Adoption Date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_date_ag_notified", "Colorado AG Notification Date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_date_target_complete", "Target Full Completion Date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_date_actual_complete", "Actual Full Completion Date:", y, { width: 80 });
  y = addFormTextField(doc, "cap_date_next_review", "Next Progress Review Date:", y, { width: 80 });

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "cap_action_plan", y);
  addDisclaimer(doc);
  return doc;
}
