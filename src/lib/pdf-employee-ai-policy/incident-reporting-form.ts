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
// DOCUMENT 3: AI Incident Reporting Form
// Aligned with NIST AI RMF MANAGE function and EEOC guidance
// ============================================================
export function generateIncidentReportingForm(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Incident Reporting Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "Use this form to report any AI-related incident, including data exposure, biased " +
      "or harmful outputs, policy violations, unauthorized AI tool use, or system " +
      "malfunctions. Submit to the AI Oversight Officer as soon as possible after " +
      "discovering the incident — do not delay reporting while awaiting full details. " +
      "All reports are confidential to the extent permitted by law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Report Reference Number (HR/IT to assign):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormTextField(doc, "irf_ref_number", "", y, { width: 80 });
  y += 4;

  // ── Reporter Information ───────────────────────────────────
  y = addSectionHeader(doc, "1. Reporter Information", y);
  y = addWrappedText(
    doc,
    "You may report anonymously; however, providing contact information allows the " +
      "AI Oversight Officer to follow up for additional details if needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_reporter_name",
    "Reporter Name (optional — may leave blank for anonymous report):",
    y
  );
  y = addFormTextField(doc, "irf_reporter_title", "Job Title / Role:", y);
  y = addFormTextField(doc, "irf_reporter_dept", "Department:", y);
  y = addFormTextField(
    doc,
    "irf_reporter_contact",
    "Contact (email or phone — optional):",
    y
  );
  y = addFormTextField(doc, "irf_report_date", "Date of This Report:", y);
  y += LINE_HEIGHT;

  // ── Incident Details ───────────────────────────────────────
  y = addSectionHeader(doc, "2. Incident Details", y);

  y = addFormTextField(doc, "irf_incident_date", "Date of Incident:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "irf_incident_time", "Approximate Time:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "irf_incident_location",
    "Location / System / Platform Where Incident Occurred:",
    y
  );
  y = addFormTextField(
    doc,
    "irf_ai_tool",
    "AI Tool or System Involved (name, version if known):",
    y
  );
  y = addFormTextField(
    doc,
    "irf_ai_tool_vendor",
    "Vendor / Provider of the AI Tool:",
    y
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_incident_description",
    "Detailed Description of the Incident (what happened, how it was discovered, what " +
      "actions were taken at the time):",
    y,
    { multiline: true, lines: 6 }
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_task_at_time",
    "What task were you or the involved employee performing when the incident occurred?",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Incident Classification ────────────────────────────────
  y = addSectionHeader(doc, "3. Incident Classification", y);
  y = addWrappedText(
    doc,
    "Check all categories that apply. If uncertain, check your best assessment — the " +
      "AI Oversight Officer will confirm classification during review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const classifications = [
    {
      name: "irf_class_data_exposure",
      label:
        "Data Exposure — Sensitive, confidential, or personal data was input into an AI tool without authorization or may have been retained/shared by the AI system",
    },
    {
      name: "irf_class_biased_output",
      label:
        "Biased or Discriminatory Output — AI produced output that appears biased, discriminatory, or that may have adversely affected individuals based on protected characteristics (race, gender, age, disability, religion, national origin, etc.)",
    },
    {
      name: "irf_class_policy_violation",
      label:
        "Policy Violation — AI tool was used in a manner that violates the Employee AI Acceptable Use Policy (e.g., prohibited use, improper data input, missing required review)",
    },
    {
      name: "irf_class_unauthorized_tool",
      label:
        "Unauthorized Tool Use — An AI tool not on the Approved Tools list was used for Company business without prior written approval",
    },
    {
      name: "irf_class_unverified_output",
      label:
        "Unverified Output Used — AI-generated content was used in a work product, client deliverable, or decision without the required human review",
    },
    {
      name: "irf_class_malfunction",
      label:
        "System Malfunction — The AI tool behaved unexpectedly, produced erratic outputs, failed mid-task, or exhibited behavior inconsistent with vendor documentation",
    },
    {
      name: "irf_class_security",
      label:
        "Security Incident — Suspected unauthorized access to AI tool accounts, prompt injection attack, or manipulation of AI system behavior by a third party",
    },
    {
      name: "irf_class_consequential_decision",
      label:
        "Consequential Decision Without Oversight — AI output was used as the sole or primary basis for an employment, financial, legal, or other consequential decision without required human review",
    },
    {
      name: "irf_class_other",
      label:
        "Other — Describe below",
    },
  ];
  classifications.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y += 2;

  y = addFormTextField(
    doc,
    "irf_class_other_desc",
    "If Other, describe the incident type:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── Impact Assessment ──────────────────────────────────────
  y = addSectionHeader(doc, "4. Impact Assessment", y);

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "4.1 Who Was or May Have Been Affected?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");

  const affected = [
    { name: "irf_affected_employees", label: "Employees (current or former)" },
    {
      name: "irf_affected_applicants",
      label: "Job applicants or candidates",
    },
    { name: "irf_affected_customers", label: "Customers or clients" },
    { name: "irf_affected_third_parties", label: "Third parties or the public" },
    {
      name: "irf_affected_company",
      label: "Company only (no external individuals affected)",
    },
    { name: "irf_affected_unknown", label: "Unknown at this time" },
  ];
  affected.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
  });
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_affected_count",
    "Estimated number of individuals affected (if known):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "irf_affected_description",
    "Describe who was affected and how:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "4.2 Severity Assessment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Check the severity level that best describes the actual or potential harm:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const severities = [
    {
      name: "irf_sev_low",
      label:
        "LOW — Minor policy deviation; no harm to individuals; no data exposure; limited business impact; easily corrected",
    },
    {
      name: "irf_sev_medium",
      label:
        "MEDIUM — Potential harm to individuals; limited data exposure; moderate business impact; corrective action required",
    },
    {
      name: "irf_sev_high",
      label:
        "HIGH — Actual harm to individuals; significant data exposure or privacy violation; substantial business or reputational impact; regulatory notification may be required",
    },
    {
      name: "irf_sev_critical",
      label:
        "CRITICAL — Serious harm to multiple individuals; confirmed PII/PHI breach; discriminatory employment decision; potential legal liability; immediate escalation required",
    },
  ];
  severities.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Immediate Actions Taken ────────────────────────────────
  y = addSectionHeader(doc, "5. Immediate Actions Taken", y);
  y = addWrappedText(
    doc,
    "Describe any actions taken immediately after discovering the incident (e.g., " +
      "stopped using the AI tool, notified supervisor, deleted the session, preserved " +
      "evidence, notified affected individuals).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_immediate_actions",
    "Immediate actions taken (describe):",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_evidence_preserved",
    "Evidence preserved (screenshots, logs, exports — describe what was saved and where):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Recommended Follow-Up ──────────────────────────────────
  y = addSectionHeader(doc, "6. Reporter's Recommended Follow-Up", y);
  y = addWrappedText(
    doc,
    "Optional: If you have suggestions for preventing recurrence or addressing the " +
      "impact of this incident, describe them here. Your input is valued.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_recommended_followup",
    "Recommended follow-up actions or prevention measures:",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  // ── Reviewer / Manager Section ─────────────────────────────
  y = addSectionHeader(
    doc,
    "7. AI Oversight Officer / Manager Review (Complete After Submission)",
    y
  );
  y = addWrappedText(
    doc,
    "This section is to be completed by the AI Oversight Officer or designated manager " +
      "after receiving this report. Do not complete this section before submitting.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_reviewer_name",
    "Reviewer Name & Title:",
    y
  );
  y = addFormTextField(
    doc,
    "irf_review_date",
    "Date of Review:",
    y
  );
  y = addFormTextField(
    doc,
    "irf_review_notes",
    "Review Notes (findings, additional context, root cause analysis):",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "7.1 Disposition:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  const dispositions = [
    {
      name: "irf_disp_unfounded",
      label: "Unfounded — No policy violation or risk identified",
    },
    {
      name: "irf_disp_minor",
      label:
        "Minor Violation — Addressed informally; training or coaching provided",
    },
    {
      name: "irf_disp_policy_violation",
      label:
        "Policy Violation — Referred to HR for disciplinary review",
    },
    {
      name: "irf_disp_data_breach",
      label:
        "Data Breach / Privacy Incident — Referred to Privacy Officer; regulatory notification assessment required",
    },
    {
      name: "irf_disp_legal_referral",
      label: "Legal Referral — Referred to Legal Counsel for assessment",
    },
    {
      name: "irf_disp_regulatory",
      label:
        "Regulatory Notification Required — Notify applicable regulator per applicable law",
    },
    {
      name: "irf_disp_ongoing",
      label: "Investigation Ongoing — See follow-up file",
    },
  ];
  dispositions.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_corrective_actions",
    "Corrective Actions Assigned (describe action, responsible party, and due date for each):",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_policy_update_needed",
    "Policy or Approved Tools List Update Needed? (describe any recommended changes):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "irf_reviewer_sig",
    "Reviewer Signature:",
    y
  );
  y = addFormTextField(
    doc,
    "irf_reviewer_sig_date",
    "Date Closed / Resolved:",
    y
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Recordkeeping: Retain this completed form and all supporting evidence for a " +
      "minimum of 3 years from the date of resolution, or longer if required by " +
      "applicable law or active litigation. File in the Company's AI Incident Log.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
