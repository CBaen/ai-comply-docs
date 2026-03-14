import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: AI System Performance Monitoring Report Template
// ============================================================
export function generatePerformanceMonitoringReport(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Performance Monitoring Report", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose ────────────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose", y);
  y = addWrappedText(
    doc,
    "This AI System Performance Monitoring Report documents the performance review " +
      "results for an AI system deployed by " + data.company.name + ". Monitoring reports " +
      "are required for all Tier 1 (quarterly) and Tier 2 (semi-annual) systems. They " +
      "serve as evidence of ongoing oversight and provide the basis for identifying systems " +
      "that require corrective action or re-classification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Report Header ──────────────────────────────────────────
  y = addSectionHeader(doc, "2. Report Information", y);
  y = addFormTextField(doc, "pm_system_name", "AI System Name:", y);
  y = addFormTextField(doc, "pm_system_owner", "System Owner (Name & Title):", y);
  y = addFormTextField(doc, "pm_risk_tier", "Risk Tier (1 / 2 / 3):", y);
  y = addFormTextField(doc, "pm_review_period", "Review Period (e.g., Q1 2025):", y);
  y = addFormTextField(doc, "pm_reviewer", "Reviewer (Name & Title):", y);
  y = addFormTextField(doc, "pm_review_date", "Review Date:", y);
  y += LINE_HEIGHT;

  // ── Performance Metrics ────────────────────────────────────
  y = addSectionHeader(doc, "3. Performance Metrics", y);
  y = addWrappedText(
    doc,
    "Record the key performance metrics for this AI system during the review period. " +
      "Use metrics appropriate to the system's purpose and risk tier.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const metrics = [
    { label: "Accuracy / Error Rate:", field: "pm_accuracy" },
    { label: "Decision Volume (number of decisions during review period):", field: "pm_volume" },
    { label: "Human Override Rate (% of AI decisions overridden by human reviewers):", field: "pm_override_rate" },
    { label: "Adverse Outcome Rate (% of decisions resulting in adverse outcomes for affected individuals):", field: "pm_adverse_rate" },
    { label: "Bias Testing Results (summary of bias testing conducted during period):", field: "pm_bias_results" },
    { label: "Availability / Uptime:", field: "pm_uptime" },
    { label: "Model Version / Last Update Date:", field: "pm_model_version" },
  ];
  metrics.forEach(({ label, field }) => {
    if (y > 250) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormTextField(doc, field, label, y);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Compliance Checklist ───────────────────────────────────
  y = addSectionHeader(doc, "4. Governance Compliance Checklist", y);
  y = addWrappedText(
    doc,
    "Confirm that governance requirements were met during the review period:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const checkItems = [
    { id: "pm_chk_oversight", label: "Human review process was followed for all consequential decisions" },
    { id: "pm_chk_documentation", label: "Decision documentation was maintained for all Tier 1 decisions" },
    { id: "pm_chk_training", label: "System operators completed required AI governance training" },
    { id: "pm_chk_incidents", label: "All AI incidents during this period were reported to the AI Compliance Officer" },
    { id: "pm_chk_vendor", label: "No material changes to vendor data handling or model training were identified" },
    { id: "pm_chk_scope", label: "No material expansion of system scope occurred without re-approval" },
  ];
  checkItems.forEach(({ id, label }) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, id, label, y);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Incidents During Period ────────────────────────────────
  y = addSectionHeader(doc, "5. AI Incidents During Review Period", y);
  y = addFormTextField(doc, "pm_incident_count", "Number of AI incidents reported:", y);
  y = addFormTextField(
    doc,
    "pm_incidents_summary",
    "Brief description of incidents and resolution status:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Assessment & Recommendations ──────────────────────────
  y = addSectionHeader(doc, "6. Assessment & Recommendations", y);

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Overall System Performance Assessment:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "pm_assess_satisfactory", "Satisfactory — No material issues identified", y);
  y = addFormCheckbox(doc, "pm_assess_minor", "Minor Issues — Corrective action planned (see below)", y);
  y = addFormCheckbox(doc, "pm_assess_material", "Material Issues — Escalation to AI Steering Committee required", y);
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "pm_corrective_action",
    "Corrective Actions Planned or Required:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "pm_next_review", "Next Scheduled Review Date:", y);
  y = addFormTextField(
    doc,
    "pm_reclassification",
    "Reclassification Recommendation (if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "pm_reviewer_sig", "Reviewer Signature:", y);
  y = addFormTextField(doc, "pm_compliance_officer_review", "AI Compliance Officer Review (Name & Date):", y);

  addDisclaimer(doc);
  return doc;
}
