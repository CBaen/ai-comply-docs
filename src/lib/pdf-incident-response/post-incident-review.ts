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
// DOCUMENT 4: Post-Incident Review Checklist
// Aligned with NIST AI RMF Manage function and continuous
// improvement requirements under California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) and EU AI Act
// ============================================================
export function generatePostIncidentReview(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Post-Incident Review Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "Complete this checklist for all Severity 1 and Severity 2 incidents within 30 days " +
      "of incident closure. Severity 3 incidents require completion within 60 days. This " +
      "review drives continuous improvement of AI governance processes. Retain for minimum " +
      "5 years. Consult Legal Counsel before sharing externally.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Review Meeting Details ────────────────────
  y = addSectionHeader(doc, "1. Review Meeting Details", y);
  y = addFormTextField(doc, "pir_incident_ref", "Incident ID (reference to Incident Report):", y);
  y = addFormTextField(doc, "pir_incident_severity", "Incident Severity Level:", y, { width: 60 });
  y = addFormTextField(doc, "pir_meeting_date", "Review Meeting Date:", y, { width: 80 });
  y = addFormTextField(doc, "pir_facilitator", "Facilitator (Name & Title):", y);
  y = addFormTextField(
    doc,
    "pir_attendees",
    "Attendees (Name and Role for each):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 2: Incident Summary ───────────────────────────
  y = addSectionHeader(doc, "2. Incident Summary", y);
  y = addWrappedText(
    doc,
    "Provide a brief summary of the incident for context. Reference the Incident Report " +
      "(companion document) for full details.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "pir_incident_ref_id", "Incident Report ID:", y, { width: 80 });
  y = addFormTextField(doc, "pir_ai_system", "AI System(s) Involved:", y);
  y = addFormTextField(doc, "pir_summary", "Brief Incident Summary (2–4 sentences):", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormTextField(doc, "pir_closure_date", "Incident Closure Date:", y, { width: 80 });
  y += LINE_HEIGHT;

  // ── Section 3: Timeline Review ────────────────────────────
  y = addSectionHeader(doc, "3. Timeline Review", y);
  y = addWrappedText(
    doc,
    "Review the incident timeline from initial detection through closure. Check each item " +
      "that was met satisfactorily. For unchecked items, explain what fell short and what " +
      "should be changed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const timelineItems = [
    {
      field: "pir_tl_detection",
      label: "Detection was timely — incident was identified promptly through appropriate monitoring or reporting channels",
    },
    {
      field: "pir_tl_escalation",
      label: "Escalation was appropriate — incident was escalated to the correct severity level and to the right personnel promptly",
    },
    {
      field: "pir_tl_irt_activation",
      label: "IRT activation was effective — Incident Response Team was assembled and operational within the required timeframe for the severity level",
    },
    {
      field: "pir_tl_containment",
      label: "Containment was effective — the affected AI system was contained or isolated in a timely manner, and evidence was preserved",
    },
    {
      field: "pir_tl_internal_comm",
      label: "Internal communication was adequate — relevant stakeholders were informed appropriately throughout the incident",
    },
    {
      field: "pir_tl_external_comm",
      label: "External communication was adequate — affected individuals and regulators were notified appropriately and within required timeframes",
    },
    {
      field: "pir_tl_reg_timelines",
      label: "Regulatory timelines were met — all applicable reporting deadlines (SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) incident reporting requirements (applies only to large frontier AI developers — verify applicability with legal counsel), EU AI Act Article 73, etc.) were identified and met",
    },
    {
      field: "pir_tl_investigation",
      label: "Investigation was thorough — root cause was identified with sufficient evidence",
    },
    {
      field: "pir_tl_remediation",
      label: "Remediation was effective — corrective actions addressed the root cause and have been verified",
    },
    {
      field: "pir_tl_documentation",
      label: "Documentation was complete — Incident Report and all supporting records are complete and accurate",
    },
  ];

  timelineItems.forEach(function (item) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, item.field, item.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "For any unchecked items above, describe what fell short (identify specific gap):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "pir_timeline_gaps", "", y, {
    multiline: true,
    lines: 4,
  });
  y += LINE_HEIGHT;

  // ── Section 4: What Went Well ──────────────────────────────
  y = addSectionHeader(doc, "4. What Went Well", y);
  y = addWrappedText(
    doc,
    "Identify aspects of the incident response that worked well and should be preserved " +
      "or reinforced. Include specific actions, behaviors, or processes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "pir_went_well", "", y, {
    multiline: true,
    lines: 5,
  });
  y += LINE_HEIGHT;

  // ── Section 5: What Could Be Improved ─────────────────────
  y = addSectionHeader(doc, "5. What Could Be Improved", y);
  y = addWrappedText(
    doc,
    "Identify specific gaps, failures, or inefficiencies in the incident response. " +
      "Be specific — 'communication was slow' is less useful than 'Legal was not notified " +
      "for 6 hours because the escalation procedure did not list them as a required contact.'",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "pir_improvements", "", y, {
    multiline: true,
    lines: 5,
  });
  y += LINE_HEIGHT;

  // ── Section 6: Root Cause Confirmation ────────────────────
  y = addSectionHeader(doc, "6. Root Cause Confirmation", y);
  y = addWrappedText(
    doc,
    "Review the root cause identified in the Incident Report. Confirm whether the " +
      "investigation's root cause determination is accurate and complete.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "pir_rootcause_confirmed",
    "Root cause is confirmed as stated in the Incident Report",
    y
  );
  y = addFormCheckbox(
    doc,
    "pir_rootcause_revised",
    "Root cause has been revised — updated root cause described below",
    y
  );
  y = addFormCheckbox(
    doc,
    "pir_rootcause_unknown",
    "Root cause is still undetermined — further investigation required (describe below)",
    y
  );
  y += 2;
  y = addFormTextField(
    doc,
    "pir_rootcause_desc",
    "Confirmed or revised root cause (describe):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 7: Systemic Issues ─────────────────────────────
  y = addSectionHeader(doc, "7. Systemic Issues Identified", y);
  y = addWrappedText(
    doc,
    "Beyond the immediate root cause, identify any broader systemic issues that contributed " +
      "to this incident or that this incident revealed. Systemic issues require organizational " +
      "response beyond the specific incident remediation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "pir_systemic_none",
    "No systemic issues identified — incident was isolated",
    y
  );
  y = addFormCheckbox(
    doc,
    "pir_systemic_identified",
    "Systemic issues identified — described below",
    y
  );
  y += 2;
  y = addFormTextField(doc, "pir_systemic_desc", "Systemic issues description:", y, {
    multiline: true,
    lines: 4,
  });
  y += LINE_HEIGHT;

  // ── Section 8: Corrective Actions ─────────────────────────
  y = addSectionHeader(doc, "8. Corrective Actions", y);
  y = addWrappedText(
    doc,
    "List all corrective actions assigned as a result of this review. These should address " +
      "both the specific root cause and any systemic issues identified.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 6; i++) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Corrective Action " + i + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(
      doc,
      "pir_action_desc_" + i,
      "Action:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y = addFormTextField(
      doc,
      "pir_action_owner_" + i,
      "Owner:",
      y,
      { x: MARGIN + 3, width: 90 }
    );
    y = addFormTextField(
      doc,
      "pir_action_deadline_" + i,
      "Deadline:",
      y,
      { x: MARGIN + 3, width: 80 }
    );
    y = addFormTextField(
      doc,
      "pir_action_status_" + i,
      "Status (Open / In Progress / Complete):",
      y,
      { x: MARGIN + 3, width: 90 }
    );
    y += 3;
  }
  y += LINE_HEIGHT;

  // ── Section 9: Policy / Procedure Updates ─────────────────
  y = addSectionHeader(
    doc,
    "9. Policy & Procedure Updates Needed",
    y
  );
  y = addWrappedText(
    doc,
    "Based on this review, check all documents or processes that require updates. " +
      "Assign an owner and deadline for each checked item.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const updateTargets = [
    { field: "pir_update_irp", label: "AI Incident Response Plan" },
    { field: "pir_update_matrix", label: "Incident Classification Matrix" },
    { field: "pir_update_training", label: "Training Materials (IRT training, tabletop scenarios)" },
    { field: "pir_update_monitoring", label: "Monitoring Procedures (alerts, thresholds, detection)" },
    { field: "pir_update_vendor", label: "Vendor Contracts or Vendor Oversight Procedures" },
    { field: "pir_update_rmp", label: "AI Risk Management Policy" },
    { field: "pir_update_consumer_notice", label: "Consumer Notice or Transparency Disclosures" },
    { field: "pir_update_impact", label: "Impact Assessment Process or Templates" },
    { field: "pir_update_escalation", label: "Escalation Procedures or Contact Lists" },
    { field: "pir_update_none", label: "None — no policy or procedure updates are required" },
  ];

  updateTargets.forEach(function (target) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, target.field, target.label, y);
  });
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "pir_update_notes",
    "Notes on updates needed (describe scope and priority):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 10: Follow-Up Review Date ─────────────────────
  y = addSectionHeader(doc, "10. Follow-Up Review", y);
  y = addWrappedText(
    doc,
    "If corrective actions are substantial or systemic issues were identified, schedule " +
      "a follow-up review to verify that corrective actions were completed effectively.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "pir_followup_required",
    "Follow-up review required",
    y
  );
  y = addFormCheckbox(
    doc,
    "pir_followup_not_required",
    "No follow-up review required — corrective actions are straightforward and accountable",
    y
  );
  y += 2;
  y = addFormTextField(doc, "pir_followup_date", "Follow-Up Review Date:", y, { width: 80 });
  y = addFormTextField(doc, "pir_followup_owner", "Follow-Up Review Owner:", y);
  y += LINE_HEIGHT;

  // ── Section 11: Approval ───────────────────────────────────
  y = addSectionHeader(doc, "11. Approval & Sign-Off", y);
  y = addWrappedText(
    doc,
    "The following individuals certify that this Post-Incident Review is complete, " +
      "accurate, and that corrective actions have been assigned.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const approvers = [
    { label: "Incident Commander / Review Facilitator", field: "pir_approve_ic" },
    { label: "Legal Counsel", field: "pir_approve_legal" },
    { label: "Executive Sponsor / Management", field: "pir_approve_exec" },
  ];

  approvers.forEach(function (approver) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      approver.label + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, approver.field + "_name", "Name & Title:", y, { x: MARGIN + 3 });
    y = addFormTextField(doc, approver.field + "_date", "Date:", y, {
      x: MARGIN + 3,
      width: 80,
    });
    y = addFormTextField(doc, approver.field + "_sig", "Signature:", y, { x: MARGIN + 3 });
    y += 4;
  });

  // ── Distribution & Retention Note ─────────────────────────
  if (y > 250) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Distribution & Retention:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Retain this review, the associated Incident Report, and all supporting documentation " +
      "for a minimum of 5 years from the date of review completion. Distribution is " +
      "restricted to IRT members and designated stakeholders unless otherwise authorized " +
      "by Legal Counsel. Do not distribute externally without Legal Counsel review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "inc_review", y);

  addDisclaimer(doc);
  return doc;
}
