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
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: AI Incident Report Template
// Individual incident report form — one per incident
// Aligned with NIST AI RMF Manage function, California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18),
// and EU AI Act serious incident requirements
// ============================================================
export function generateIncidentReportTemplate(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Incident Report", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "Complete one Incident Report per incident. This report constitutes the official " +
      "incident record and may be used for regulatory notifications. Retain for a " +
      "minimum of 5 years from the date of incident closure. Consult Legal Counsel " +
      "before sharing externally.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Incident Identification ───────────────────
  y = addSectionHeader(doc, "1. Incident Identification", y);
  y = addFormTextField(doc, "ir_incident_id", "Incident ID (assign a unique ID, e.g., IR-2026-001):", y);
  y = addFormTextField(doc, "ir_status", "Incident Status (Open / Under Investigation / Closed):", y);
  y = addFormTextField(doc, "ir_severity", "Severity Level (1 Critical / 2 High / 3 Medium / 4 Low):", y);
  y += LINE_HEIGHT;

  // ── Section 2: Reporter Information ──────────────────────
  y = addSectionHeader(doc, "2. Reporter Information", y);
  y = addWrappedText(
    doc,
    "Complete this section for the individual who first identified and reported the incident.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "ir_reporter_name", "Reporter Name:", y);
  y = addFormTextField(doc, "ir_reporter_role", "Role / Job Title:", y);
  y = addFormTextField(doc, "ir_reporter_dept", "Department:", y);
  y = addFormTextField(doc, "ir_reporter_email", "Email:", y, { width: 100 });
  y = addFormTextField(doc, "ir_reporter_phone", "Phone:", y, { width: 80 });
  y = addFormTextField(doc, "ir_reported_datetime", "Date & Time Reported (YYYY-MM-DD HH:MM):", y);
  y = addFormTextField(doc, "ir_reporting_channel", "How was this incident reported? (e.g., monitoring alert, user complaint, audit finding):", y);
  y += LINE_HEIGHT;

  // ── Section 3: Incident Details ───────────────────────────
  y = addSectionHeader(doc, "3. Incident Details", y);
  y = addFormTextField(doc, "ir_occurred_datetime", "Date & Time Incident Occurred (YYYY-MM-DD HH:MM, or estimated range):", y);
  y = addFormTextField(doc, "ir_detected_datetime", "Date & Time Incident Detected (YYYY-MM-DD HH:MM):", y);
  y = addFormTextField(doc, "ir_ai_system", "AI System(s) Involved (name, vendor, version if known):", y);
  y = addFormTextField(doc, "ir_deployment_context", "Deployment Context (e.g., hiring, lending, healthcare decision support):", y);
  y = addWrappedText(
    doc,
    "Incident Description (describe what happened, what was observed, and initial known impact):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "ir_description", "", y, {
    multiline: true,
    lines: 5,
  });
  y += LINE_HEIGHT;

  // ── Section 4: Classification ─────────────────────────────
  y = addSectionHeader(doc, "4. Incident Classification", y);
  y = addWrappedText(
    doc,
    "Use the Classification Matrix (companion document) to assess each impact dimension. " +
      "Check all that apply. The highest individual rating determines overall severity.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Safety Impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_safety_none", "None — no harm identified", y);
  y = addFormCheckbox(doc, "ir_safety_minor", "Minor — isolated, reversible harm to few individuals", y);
  y = addFormCheckbox(doc, "ir_safety_significant", "Significant — harm to multiple individuals or significant harm to one", y);
  y = addFormCheckbox(doc, "ir_safety_severe", "Severe — serious harm to many; EU AI Act serious incident threshold may be met", y);
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Discrimination Impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_discrim_none", "None — no discriminatory pattern identified", y);
  y = addFormCheckbox(doc, "ir_discrim_potential", "Potential — possible bias flagged, unconfirmed, under investigation", y);
  y = addFormCheckbox(doc, "ir_discrim_confirmed", "Confirmed — algorithmic discrimination confirmed in outputs or outcomes", y);
  y = addFormCheckbox(doc, "ir_discrim_widespread", "Widespread — systematic discrimination affecting significant population", y);
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Data / Privacy Impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_data_none", "None — no personal data exposure", y);
  y = addFormCheckbox(doc, "ir_data_minor", "Minor Exposure — limited, non-sensitive data; fewer than 10 individuals", y);
  y = addFormCheckbox(doc, "ir_data_significant", "Significant Breach — sensitive data or 10–999 individuals affected", y);
  y = addFormCheckbox(doc, "ir_data_mass", "Mass Breach — 1,000+ individuals or special category data (health, biometric, financial)", y);
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Operational Impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_oper_none", "None — AI system functioning normally", y);
  y = addFormCheckbox(doc, "ir_oper_degraded", "Degraded — reduced performance, no service interruption", y);
  y = addFormCheckbox(doc, "ir_oper_disrupted", "Disrupted — AI system unavailable or producing incorrect outputs at scale", y);
  y = addFormCheckbox(doc, "ir_oper_failure", "Total Failure — AI system completely unavailable", y);
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Regulatory Impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_reg_none", "None — no regulatory obligations triggered", y);
  y = addFormCheckbox(doc, "ir_reg_potential", "Potential Violation — facts ambiguous; legal assessment required", y);
  y = addFormCheckbox(doc, "ir_reg_confirmed", "Confirmed Violation — reporting obligations likely triggered", y);
  y = addFormCheckbox(doc, "ir_reg_enforcement", "Enforcement Action — regulator inquiry opened or pending", y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Overall Severity Assignment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "ir_sev1", "Severity 1 (Critical)", y);
  y = addFormCheckbox(doc, "ir_sev2", "Severity 2 (High)", y);
  y = addFormCheckbox(doc, "ir_sev3", "Severity 3 (Medium)", y);
  y = addFormCheckbox(doc, "ir_sev4", "Severity 4 (Low)", y);
  y += LINE_HEIGHT;

  // ── Section 5: Affected Parties ───────────────────────────
  y = addSectionHeader(doc, "5. Affected Parties", y);
  y = addFormTextField(doc, "ir_affected_count", "Number of Individuals Affected (or estimated range):", y);
  y = addWrappedText(
    doc,
    "Categories of Affected Individuals (check all that apply):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(doc, "ir_aff_customers", "Customers / Clients", y);
  y = addFormCheckbox(doc, "ir_aff_employees", "Employees / Job Applicants", y);
  y = addFormCheckbox(doc, "ir_aff_students", "Students / Educational Beneficiaries", y);
  y = addFormCheckbox(doc, "ir_aff_patients", "Patients / Healthcare Recipients", y);
  y = addFormCheckbox(doc, "ir_aff_consumers", "General Consumers", y);
  y = addFormCheckbox(doc, "ir_aff_vulnerable", "Vulnerable Population (children, elderly, disabled, incarcerated)", y);
  y = addFormCheckbox(doc, "ir_aff_other", "Other (describe below):", y);
  y = addFormTextField(doc, "ir_aff_other_desc", "", y, { multiline: false });
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "ir_affected_description",
    "Additional description of affected parties and nature of harm:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 6: Containment Actions ───────────────────────
  y = addSectionHeader(doc, "6. Immediate Containment Actions", y);
  y = addWrappedText(
    doc,
    "Document all actions taken immediately upon identification of the incident to prevent " +
      "escalation and preserve evidence. Include timestamps.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(doc, "ir_contain_disabled", "AI system disabled / taken offline", y);
  y = addFormCheckbox(doc, "ir_contain_isolated", "AI system isolated (restricted access, sandboxed)", y);
  y = addFormCheckbox(doc, "ir_contain_logs", "Logs and system state preserved as evidence", y);
  y = addFormCheckbox(doc, "ir_contain_hold", "Litigation / evidence hold issued", y);
  y = addFormCheckbox(doc, "ir_contain_vendor", "Vendor notified", y);
  y = addFormCheckbox(doc, "ir_contain_none", "No immediate containment action taken (explain below)", y);
  y += 2;
  y = addFormTextField(
    doc,
    "ir_containment_narrative",
    "Describe all containment actions taken (include who, what, when):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 7: Investigation Findings ─────────────────────
  y = addSectionHeader(doc, "7. Investigation Findings", y);
  y = addFormTextField(
    doc,
    "ir_investigation_lead",
    "Investigation Lead (Name & Title):",
    y
  );
  y = addFormTextField(
    doc,
    "ir_investigation_start",
    "Investigation Start Date:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ir_investigation_end",
    "Investigation End Date:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ir_investigation_findings",
    "Summary of Investigation Findings:",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  // ── Section 8: Root Cause ──────────────────────────────────
  y = addSectionHeader(doc, "8. Root Cause Analysis", y);
  y = addWrappedText(
    doc,
    "Identify the underlying root cause(s) of the incident. Root cause analysis should " +
      "go beyond the immediate trigger to identify systemic factors.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const rootCauseCategories = [
    "AI model defect / training data issue",
    "System integration or deployment error",
    "Human oversight failure (missed review, incorrect configuration)",
    "Vendor / third-party failure",
    "Process / policy gap",
    "Adversarial attack or manipulation",
    "Data quality / data pipeline issue",
    "Other (describe below)",
  ];
  rootCauseCategories.forEach(function (cat, idx) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, "ir_rootcause_cat_" + idx, cat, y);
  });
  y += 2;
  y = addFormTextField(
    doc,
    "ir_root_cause",
    "Root Cause Description (explain in detail):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 9: Remediation Actions ────────────────────────
  y = addSectionHeader(doc, "9. Remediation Actions", y);
  y = addWrappedText(
    doc,
    "Document each remediation action. Use one row per action.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 5; i++) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Action " + i + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(
      doc,
      "ir_rem_action_" + i,
      "Action Description:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y = addFormTextField(
      doc,
      "ir_rem_owner_" + i,
      "Owner:",
      y,
      { x: MARGIN + 3, width: 80 }
    );
    y = addFormTextField(
      doc,
      "ir_rem_target_" + i,
      "Target Completion Date:",
      y,
      { x: MARGIN + 3, width: 80 }
    );

    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      "Status:",
      MARGIN + 3,
      y,
      40,
      LINE_HEIGHT
    );
    y = addFormCheckbox(doc, "ir_rem_status_open_" + i, "Open", y, { x: MARGIN + 20 });
    y = addFormCheckbox(doc, "ir_rem_status_ip_" + i, "In Progress", y, { x: MARGIN + 20 });
    y = addFormCheckbox(doc, "ir_rem_status_done_" + i, "Complete", y, { x: MARGIN + 20 });
    y += 2;
  }
  y += LINE_HEIGHT;

  // ── Section 10: Regulatory Notifications Required ─────────
  y = addSectionHeader(doc, "10. Regulatory Notifications Required", y);
  y = addWrappedText(
    doc,
    "Legal Counsel must assess all applicable notification obligations. Check all that apply " +
      "and complete the Regulatory Notifications Sent table below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, "ir_notif_none", "None — no regulatory notification required (document basis for this determination)", y);
  y = addFormCheckbox(doc, "ir_notif_ag", "State Attorney General notification required", y);
  y = addFormCheckbox(doc, "ir_notif_tfaia", "California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) — incident reporting requirements triggered (applies only to large frontier AI developers meeting specific compute and revenue thresholds — verify applicability and current reporting timeline with legal counsel)", y);
  y = addFormCheckbox(doc, "ir_notif_eu", "EU AI Act Article 73 — serious incident notification to national market surveillance authority", y);
  y = addFormCheckbox(doc, "ir_notif_hipaa", "HIPAA Breach Notification Rule", y);
  y = addFormCheckbox(doc, "ir_notif_glba", "GLBA Safeguards Rule", y);
  y = addFormCheckbox(doc, "ir_notif_state_breach", "State data breach notification law", y);
  y = addFormCheckbox(doc, "ir_notif_other", "Other regulatory notification (describe below):", y);
  y = addFormTextField(doc, "ir_notif_other_desc", "", y);
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "ir_notif_basis",
    "Legal Counsel determination and basis (including timeline analysis):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "ir_notif_counsel", "Legal Counsel Name:", y);
  y = addFormTextField(doc, "ir_notif_counsel_date", "Date of Determination:", y, { width: 80 });
  y += LINE_HEIGHT;

  // ── Section 11: Regulatory Notifications Sent ─────────────
  y = addSectionHeader(doc, "11. Regulatory Notifications Sent", y);
  y = addWrappedText(
    doc,
    "Complete one row per regulatory notification sent. Retain copies of all notifications.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 4; i++) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Notification " + i + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(
      doc,
      "ir_notif_agency_" + i,
      "Agency / Regulator:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y = addFormTextField(
      doc,
      "ir_notif_date_sent_" + i,
      "Date Sent:",
      y,
      { x: MARGIN + 3, width: 80 }
    );
    y = addFormTextField(
      doc,
      "ir_notif_ref_" + i,
      "Reference Number / Confirmation:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y += 2;
  }
  y += LINE_HEIGHT;

  // ── Section 12: Lessons Learned ───────────────────────────
  y = addSectionHeader(doc, "12. Lessons Learned", y);
  y = addWrappedText(
    doc,
    "What should be changed, improved, or added to prevent recurrence or improve " +
      "future response? Reference the Post-Incident Review for full analysis.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "ir_lessons_learned", "", y, {
    multiline: true,
    lines: 4,
  });
  y += LINE_HEIGHT;

  // ── Section 13: Sign-offs ──────────────────────────────────
  y = addSectionHeader(doc, "13. Sign-offs", y);
  y = addWrappedText(
    doc,
    "The following individuals certify that this Incident Report is accurate and complete " +
      "to the best of their knowledge.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const signoffs = [
    { label: "Incident Commander", field: "ir_signoff_ic" },
    { label: "Legal Counsel", field: "ir_signoff_legal" },
    { label: "Management / Executive Sponsor", field: "ir_signoff_mgmt" },
  ];

  signoffs.forEach(function (signoff) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      signoff.label + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, signoff.field + "_name", "Name & Title:", y, { x: MARGIN + 3 });
    y = addFormTextField(doc, signoff.field + "_date", "Date:", y, { x: MARGIN + 3, width: 80 });
    y = addFormTextField(doc, signoff.field + "_sig", "Signature:", y, { x: MARGIN + 3 });
    y += 4;
  });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "inc_report", y);

  addDisclaimer(doc);
  return doc;
}
