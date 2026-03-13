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
// DOCUMENT: Ongoing Vendor Monitoring Checklist
// Supports continuous oversight of deployed AI vendor relationships.
// Aligned with NIST AI RMF MANAGE function and CO SB205 § 6-1-1703(3)(a)(II).
// ============================================================
export function generateMonitoringChecklist(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Vendor Monitoring Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This checklist is used by " +
      data.company.name +
      " (\"Deployer\") to conduct ongoing oversight of active AI vendor relationships. " +
      "Under C.R.S. § 6-1-1703(3)(a)(II), deployers must review impact assessments for " +
      "high-risk AI systems at least annually and after any substantial system modification. " +
      "This checklist supports that obligation and aligns with the NIST AI RMF MANAGE " +
      "function (MG.3, MG.4). Complete this checklist at each scheduled review interval " +
      "and retain as part of your compliance documentation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Review Identification ────────────────────────────────────
  y = addSectionHeader(doc, "Review Identification", y);
  y = addFormTextField(doc, "vdd_mc_vendor_name", "Vendor Name:", y);
  y = addFormTextField(doc, "vdd_mc_system_name", "AI System / Product:", y);
  y = addFormTextField(
    doc,
    "vdd_mc_review_type",
    "Review Type (Quarterly / Annual / Trigger Event):",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_mc_review_date",
    "Review Date:",
    y,
    { prefill: data.generatedDate }
  );
  y = addFormTextField(
    doc,
    "vdd_mc_reviewer",
    "Reviewer (Name & Title):",
    y,
    {
      prefill: data.contact
        ? data.contact.name +
          (data.contact.title ? ", " + data.contact.title : "")
        : "",
    }
  );
  y += LINE_HEIGHT;

  // ── Section 1: Quarterly Review Items ──────────────────────
  y = addSectionHeader(doc, "1. Quarterly Review Items", y);
  y = addWrappedText(
    doc,
    "Complete at each quarterly monitoring interval. Check each item once confirmed or reviewed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "vdd_mc_q_security_updates",
    "Reviewed vendor security update log or patch notes for material vulnerabilities or " +
      "changes affecting data protection.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_bias_updates",
    "Checked for new bias audit results, model updates, or fairness disclosures published " +
      "by the vendor since last review.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_data_compliance",
    "Verified that vendor data handling practices remain compliant with contract terms, " +
      "including data retention, deletion, and cross-border transfer restrictions.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_incident_reports",
    "Reviewed vendor incident reports and breach notifications received during the quarter. " +
      "Confirmed all required 72-hour notifications were received.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_regulatory_changes",
    "Checked for regulatory changes affecting this AI system deployment " +
      "(CO SB205, IL HB3773, NYC LL144, EEOC guidance, federal AI regulation updates).",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_audit_logs",
    "Spot-reviewed AI system audit logs for anomalies, override patterns, or unusual " +
      "decision distributions.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_q_user_feedback",
    "Collected and reviewed user or subject feedback relating to AI system outputs, " +
      "including any complaints, appeals, or adverse decision disputes.",
    y
  );
  y += 4;
  y = addFormTextField(
    doc,
    "vdd_mc_q_notes",
    "Quarterly Review Notes:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 2: Annual Review Items ─────────────────────────
  y = addSectionHeader(doc, "2. Annual Review Items", y);
  y = addWrappedText(
    doc,
    "Complete once per contract year, or within 90 days of any substantial AI system " +
      "modification per C.R.S. § 6-1-1703(3)(a)(II). Check each item once completed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "vdd_mc_a_full_reassessment",
    "Completed full vendor risk reassessment using the Vendor AI Risk Assessment template. " +
      "Updated risk scores reflect current evidence.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_contract_review",
    "Reviewed vendor contract and AI Contract Addendum terms for currency, compliance, " +
      "and alignment with updated regulatory requirements.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_performance_eval",
    "Conducted performance evaluation: reviewed system accuracy, decision distributions, " +
      "false positive/negative rates, and user satisfaction data.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_bias_audit",
    "Confirmed receipt of vendor's annual bias audit report. Reviewed findings and " +
      "verified any identified disparate impact has been remediated.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_alternative_vendors",
    "Conducted alternative vendor assessment: identified and evaluated at least one " +
      "alternative vendor to address operational dependency risk.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_updated_questionnaire",
    "Sent updated Due Diligence Questionnaire to vendor and reviewed responses for " +
      "material changes since initial procurement.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_impact_assessment",
    "Updated the AI Impact Assessment for this system to reflect current deployment " +
      "scope, identified risks, and any changes to the vendor or system.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_a_employee_training",
    "Confirmed that employees who interact with or rely on AI system outputs have " +
      "received current training on human oversight responsibilities.",
    y
  );
  y += 4;
  y = addFormTextField(
    doc,
    "vdd_mc_a_notes",
    "Annual Review Notes:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 3: Trigger Events ───────────────────────────────
  y = addSectionHeader(doc, "3. Trigger Events — Ad-Hoc Review Required", y);
  y = addWrappedText(
    doc,
    "Mark any trigger events that occurred since the last review. Each checked item " +
      "requires an ad-hoc review to assess impact on compliance status and risk posture. " +
      "Document the review in the Action Log below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "vdd_mc_t_regulatory_change",
    "Regulatory Change — new law, regulation, agency guidance, or enforcement action " +
      "affecting this AI system deployment became effective or was announced.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_vendor_acquisition",
    "Vendor Acquisition or Merger — vendor was acquired, merged, or underwent material " +
      "ownership or control changes.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_security_incident",
    "Security Incident — vendor disclosed or Deployer discovered a data breach, " +
      "unauthorized access, or material security failure involving this system.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_product_change",
    "Material Product Change — vendor deployed a substantial model update, retraining, " +
      "feature change, or change in data processing practices.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_customer_complaint",
    "Customer / Subject Complaint — complaint received alleging discriminatory output, " +
      "incorrect decision, or improper data use by the AI system.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_adverse_finding",
    "Adverse Finding — internal or external audit identified a compliance gap or " +
      "risk of algorithmic discrimination.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_regulatory_inquiry",
    "Regulatory Inquiry — government agency, regulator, or law enforcement made an " +
      "inquiry related to this AI system.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_t_other",
    "Other material event (describe in Action Log below):",
    y
  );
  y += LINE_HEIGHT;

  // ── Section 4: Action Log ────────────────────────────────────
  y = addSectionHeader(doc, "4. Action Log", y);
  y = addWrappedText(
    doc,
    "Document all actions taken, planned, or deferred as a result of this review. " +
      "Add additional rows as needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // Render action log rows
  const actionRowLabels = ["1", "2", "3", "4", "5"];
  actionRowLabels.forEach(function (num) {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }
    const rowW = (CONTENT_WIDTH - 6) / 4;
    y = addFormTextField(
      doc,
      "vdd_mc_log_date_" + num,
      "Date (Action " + num + "):",
      y,
      { width: rowW, x: MARGIN }
    );
    const labelY = y - LINE_HEIGHT - 3;
    y = addFormTextField(
      doc,
      "vdd_mc_log_action_" + num,
      "Action Taken / Required:",
      labelY,
      { width: rowW, x: MARGIN + rowW + 2 }
    );
    y = addFormTextField(
      doc,
      "vdd_mc_log_owner_" + num,
      "Responsible Party:",
      labelY,
      { width: rowW, x: MARGIN + (rowW + 2) * 2 }
    );
    y = addFormTextField(
      doc,
      "vdd_mc_log_status_" + num,
      "Status:",
      labelY,
      { width: rowW - 2, x: MARGIN + (rowW + 2) * 3 }
    );
    y += 2;
  });

  y += LINE_HEIGHT;

  // ── Section 5: Review Disposition ──────────────────────────
  y = addSectionHeader(doc, "5. Review Disposition", y);
  y = addWrappedText(
    doc,
    "Based on this review, the reviewer recommends the following disposition:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "vdd_mc_disp_continue",
    "CONTINUE — No material issues identified. Continue current deployment as-is.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_disp_continue_actions",
    "CONTINUE WITH ACTIONS — Deployment continues; open action items must be resolved by next review.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_disp_escalate",
    "ESCALATE — Material risk identified. Escalate to senior leadership or legal counsel for decision.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_disp_suspend",
    "SUSPEND — Suspend use of AI system in affected decision context pending remediation.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_mc_disp_terminate",
    "TERMINATE — Initiate vendor contract termination.",
    y
  );
  y += LINE_HEIGHT;

  // ── Sign-off ─────────────────────────────────────────────────
  y = addSectionHeader(doc, "Reviewer Sign-Off", y);
  y = addFormTextField(
    doc,
    "vdd_mc_signoff_name",
    "Reviewer (Name & Title):",
    y,
    {
      prefill: data.contact
        ? data.contact.name +
          (data.contact.title ? ", " + data.contact.title : "")
        : "",
    }
  );
  y = addFormTextField(doc, "vdd_mc_signoff_date", "Date:", y, {
    prefill: data.generatedDate,
  });
  y = addFormTextField(doc, "vdd_mc_signoff_sig", "Signature:", y);
  y += 4;
  y = addFormTextField(
    doc,
    "vdd_mc_approver_name",
    "Approving Manager (Name & Title):",
    y
  );
  y = addFormTextField(doc, "vdd_mc_approver_date", "Date:", y);
  y = addFormTextField(doc, "vdd_mc_approver_sig", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
