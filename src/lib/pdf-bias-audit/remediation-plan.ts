import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// BIAS REMEDIATION PLAN
// Aligned with: NIST AI RMF MANAGE function, EEOC Uniform
// Guidelines corrective action requirements, NYC LL144 §20-871,
// and OFCCP conciliation agreement best practices
// ============================================================
export function generateRemediationPlan(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Bias Remediation Plan", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This remediation plan documents the organization's structured response to adverse impact findings from an AI bias audit. It addresses root causes, defines corrective actions with accountability, and establishes re-testing and monitoring procedures. This document supports compliance with EEOC adverse impact remediation obligations, NIST AI RMF MANAGE function (MG-2.2, MG-4.1), and NYC Local Law 144 ongoing audit requirements.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── 1. Issue Identified ───────────────────────────────────
  y = addSectionHeader(doc, "1. Issue Identified", y);
  y = addWrappedText(
    doc,
    "Describe the specific adverse impact finding that this remediation plan addresses. Reference the bias audit report and, where applicable, the specific protected class and decision type affected.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "rp_system_name",
    "AI System Name:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
    }
  );
  y = addFormTextField(
    doc,
    "rp_audit_ref",
    "Bias Audit Report Reference (date, auditor, report ID):",
    y
  );
  y = addFormTextField(
    doc,
    "rp_issue_description",
    "Description of Adverse Impact Finding (protected class, impact ratio, decision type):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "rp_affected_population",
    "Estimated Number of Individuals Affected:",
    y
  );
  y = addFormTextField(
    doc,
    "rp_severity",
    "Severity Assessment (Low / Medium / High / Critical — explain basis):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── 2. Root Cause Analysis ────────────────────────────────
  y = addSectionHeader(doc, "2. Root Cause Analysis", y);
  y = addWrappedText(
    doc,
    "Identify the root cause(s) of the adverse impact. Check all that apply and describe findings for each. NIST AI RMF MEASURE 2.6 and MANAGE 2.2 require identification of root causes before implementing corrective actions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Data source issues
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Data Source Issues:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "rp_rca_training_data_bias",
    "Training data reflects historical discrimination (underrepresentation of protected groups in positive outcomes)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_proxy_vars",
    "Proxy variables for protected characteristics used as features (e.g., zip code, name, school attended)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_sample_imbalance",
    "Sample imbalance — protected group underrepresented in training or test data",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_label_bias",
    "Label bias — outcome labels reflect biased human judgments used to train the model",
    y
  );
  y = addFormTextField(
    doc,
    "rp_rca_data_detail",
    "Data source root cause detail:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  // Model design issues
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Model Design Issues:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "rp_rca_objective_function",
    "Objective function not optimized for fairness across groups (pure accuracy optimization can amplify disparities)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_threshold",
    "Decision threshold not calibrated across groups (single threshold may produce different false positive/negative rates by group)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_feature_selection",
    "Feature selection includes correlated proxies for protected characteristics",
    y
  );
  y = addFormTextField(
    doc,
    "rp_rca_model_detail",
    "Model design root cause detail:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  // Training data issues
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Training Data Issues:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "rp_rca_recency",
    "Training data too old — does not reflect current population or legal standards",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_geographic",
    "Training data from different geographic context — demographics may not match deployment population",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_scope_mismatch",
    "Training data scope mismatch — system trained on one job type applied to different roles",
    y
  );
  y = addFormTextField(
    doc,
    "rp_rca_training_detail",
    "Training data root cause detail:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  // Deployment context issues
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Deployment Context Issues:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "rp_rca_usage_drift",
    "Deployment context differs from intended use (population shift, different job requirements)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_human_override",
    "Human override patterns introduce bias (reviewers systematically override AI for protected groups)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_rca_feedback_loop",
    "Feedback loop — biased decisions generate training data that reinforces the bias",
    y
  );
  y = addFormTextField(
    doc,
    "rp_rca_deployment_detail",
    "Deployment context root cause detail:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── 3. Proposed Remediation Actions ───────────────────────
  y = addSectionHeader(doc, "3. Proposed Remediation Actions", y);
  y = addWrappedText(
    doc,
    "Document each corrective action with a responsible party, target completion date, and measurable success metric. Actions should address root causes identified above. List from highest priority to lowest.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const actionCount = 5;
  for (let i = 1; i <= actionCount; i++) {
    if (y > 220) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(`Action ${i}:`, MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    y = addFormTextField(
      doc,
      `rp_action_${i}_description`,
      "Action Description:",
      y,
      { multiline: true, lines: 2 }
    );
    const halfW = (CONTENT_WIDTH - 5) / 2;
    y = addFormTextField(
      doc,
      `rp_action_${i}_owner`,
      "Responsible Party:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `rp_action_${i}_date`,
      "Target Completion Date:",
      y - (LINE_HEIGHT + 9),
      { width: halfW, x: MARGIN + halfW + 5 }
    );
    y += LINE_HEIGHT;
    y = addFormTextField(
      doc,
      `rp_action_${i}_metric`,
      "Success Metric (how will you know it worked?):",
      y,
      { multiline: true, lines: 2 }
    );
    y += 3;

    if (i < actionCount) {
      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
      y += LINE_HEIGHT;
    }
  }
  y += LINE_HEIGHT;

  // ── 4. Monitoring Plan ────────────────────────────────────
  y = addSectionHeader(doc, "4. Monitoring Plan", y);
  y = addWrappedText(
    doc,
    "Define how the organization will verify that corrective actions were effective. NYC LL144 requires annual bias audits. NIST AI RMF MANAGE 4.1 requires ongoing monitoring after remediation. Your monitoring plan should specify re-testing criteria and escalation thresholds.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "rp_monitor_retest_timeline",
    "Re-Testing Timeline (when will the next bias audit occur after remediation):",
    y
  );
  y = addFormTextField(
    doc,
    "rp_monitor_metrics",
    "Metrics to Track During Monitoring Period (e.g., selection rate by group, impact ratio, complaint rate):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "rp_monitor_threshold",
    "Threshold for Success (what impact ratio is acceptable? What triggers escalation?):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "rp_monitor_interim",
    "Interim Monitoring Steps (before full re-audit — e.g., monthly review of outputs, sample audits):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "rp_monitor_owner",
    "Monitoring Responsible Party:",
    y
  );
  y += LINE_HEIGHT;

  // ── 5. Stakeholder Communication ──────────────────────────
  y = addSectionHeader(doc, "5. Stakeholder Communication", y);
  y = addWrappedText(
    doc,
    "Document who needs to be informed of the adverse impact finding and the remediation plan. NYC LL144 § 20-871(b)(3) requires publication of bias audit results. Consider internal stakeholders, affected applicants/employees, and regulatory disclosure obligations.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "rp_comm_executives",
    "Executive leadership / Board",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_hr",
    "HR / People Operations leadership",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_legal",
    "Legal / Compliance",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_vendor",
    "AI system vendor / developer",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_affected",
    "Affected applicants or employees (per applicable law — consult counsel)",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_regulators",
    "Regulatory disclosure (e.g., EEOC, NYC DCWP, state AG) — consult counsel",
    y
  );
  y = addFormCheckbox(
    doc,
    "rp_comm_public",
    "Public disclosure (NYC LL144 requires publication of audit summary on company website)",
    y
  );
  y = addFormTextField(
    doc,
    "rp_comm_detail",
    "Communication Plan Details (who, what message, by when, in what format):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── 6. Timeline ───────────────────────────────────────────
  y = addSectionHeader(doc, "6. Remediation Timeline", y);
  y = addWrappedText(
    doc,
    "Break remediation into phases. Immediate actions reduce ongoing harm. 30-day actions address root causes. 90-day actions establish long-term safeguards and verification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Immediate Actions (within 5 business days):", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "rp_timeline_immediate",
    "Actions to take immediately to contain the adverse impact (e.g., suspend automated scoring for affected decisions, increase human review):",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("30-Day Actions:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "rp_timeline_30day",
    "Actions to complete within 30 days (e.g., vendor notification, alternative model evaluation, data re-analysis):",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("90-Day Actions:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "rp_timeline_90day",
    "Actions to complete within 90 days (e.g., model retraining, threshold recalibration, re-audit, policy updates):",
    y,
    { multiline: true, lines: 3 }
  );
  y += 3;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Long-Term Actions (ongoing / annual):", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "rp_timeline_longterm",
    "Ongoing structural changes and annual review commitments:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── 7. Approval ───────────────────────────────────────────
  y = addSectionHeader(doc, "7. Approval", y);
  y = addWrappedText(
    doc,
    "This remediation plan requires review and approval from compliance leadership, HR, and legal counsel before implementation. Document approvals below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "rp_prepared_by",
    "Prepared By (Name & Title):",
    y,
    {
      prefill:
        data.contact
          ? data.contact.name +
            (data.contact.title ? ", " + data.contact.title : "")
          : "",
    }
  );
  y = addFormTextField(
    doc,
    "rp_prepared_date",
    "Date Prepared:",
    y,
    { prefill: data.generatedDate }
  );
  y = addFormTextField(
    doc,
    "rp_reviewed_by",
    "Reviewed By — HR / People Operations (Name & Title):",
    y
  );
  y = addFormTextField(doc, "rp_reviewed_by_legal", "Reviewed By — Legal Counsel (Name & Title):", y);
  y = addFormTextField(
    doc,
    "rp_approved_by",
    "Approved By — Executive Sponsor (Name & Title):",
    y
  );
  y = addFormTextField(doc, "rp_approval_date", "Approval Date:", y);
  y = addFormTextField(
    doc,
    "rp_approval_signature",
    "Approving Signature:",
    y
  );

  addDisclaimer(doc);
  return doc;
}
