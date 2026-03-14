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
// DOCUMENT 2: Employee AI Training Completion & Acknowledgment
// ============================================================
export function generateTrainingAcknowledgment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Employee AI Training Completion & Policy Acknowledgment",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This form must be completed by each employee upon completion of the AI Acceptable " +
      "Use Policy training. A signed copy must be retained in the employee's personnel " +
      "file. Complete all sections and return to Human Resources.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Employee Information ───────────────────────────────────
  y = addSectionHeader(doc, "1. Employee Information", y);

  y = addFormTextField(doc, "ta_employee_name", "Full Name:", y);
  y = addFormTextField(doc, "ta_employee_id", "Employee ID / Badge Number:", y);
  y = addFormTextField(doc, "ta_employee_title", "Job Title:", y);
  y = addFormTextField(doc, "ta_employee_dept", "Department:", y);
  y = addFormTextField(doc, "ta_employee_manager", "Direct Manager (Name & Title):", y);
  y = addFormTextField(doc, "ta_training_date", "Training Completion Date:", y);
  y = addFormTextField(doc, "ta_training_method", 'Training Method (e.g., "Online module", "In-person session", "Self-study"):', y);
  y += LINE_HEIGHT;

  // ── Training Topics Covered ────────────────────────────────
  y = addSectionHeader(doc, "2. Training Topics Covered", y);
  y = addWrappedText(
    doc,
    "Check each topic that was covered in your training session. All items must be " +
      "checked to certify completion. If any topic was not covered, contact HR before " +
      "signing this form.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const topics = [
    {
      name: "ta_topic_overview",
      label:
        "AI Policy Overview — Purpose, scope, and who is covered by the AI Acceptable Use Policy",
    },
    {
      name: "ta_topic_approved_tools",
      label:
        "Approved AI Tools — Which tools are authorized, for what purposes, and how to request new tools",
    },
    {
      name: "ta_topic_prohibited_uses",
      label:
        "Prohibited Uses — What uses are forbidden, including inputting sensitive data and bypassing oversight",
    },
    {
      name: "ta_topic_data_handling",
      label:
        "Data Handling Requirements — Data categories permitted vs. prohibited in AI tools; data classification",
    },
    {
      name: "ta_topic_output_verification",
      label:
        "Output Review & Verification — Review tiers, documentation requirements, and designated reviewers",
    },
    {
      name: "ta_topic_incident_reporting",
      label:
        "Incident Reporting — How to recognize and report AI incidents, policy violations, and new tool requests",
    },
    {
      name: "ta_topic_ethics",
      label:
        "Ethical Considerations — Bias, fairness, transparency, human oversight, and EEOC implications",
    },
    {
      name: "ta_topic_enforcement",
      label:
        "Enforcement & Consequences — Violation levels and disciplinary actions",
    },
    {
      name: "ta_topic_nist",
      label:
        "NIST AI RMF Overview — Basic concepts of GOVERN, MAP, MEASURE, and MANAGE functions as applied to employee use",
    },
  ];
  topics.forEach((topic) => {
    y = addFormCheckbox(doc, topic.name, topic.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Knowledge Verification ─────────────────────────────────
  y = addSectionHeader(doc, "3. Knowledge Verification", y);
  y = addWrappedText(
    doc,
    "Check each statement below to confirm your understanding. All statements must be " +
      "checked before this acknowledgment is valid.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const knowledge = [
    {
      name: "ta_know_approved_tools",
      label:
        "I understand which AI tools are approved for use in my role and the permitted uses for each tool.",
    },
    {
      name: "ta_know_prohibited_uses",
      label:
        "I understand the prohibited uses of AI tools, including the prohibition on inputting PII, trade secrets, or other sensitive data into general-purpose AI tools.",
    },
    {
      name: "ta_know_data_handling",
      label:
        "I understand the data handling requirements and can identify which data categories are permitted vs. restricted when using AI tools.",
    },
    {
      name: "ta_know_output_review",
      label:
        "I understand that I am responsible for reviewing all AI-generated outputs before using them in work products, and I know which outputs require additional review.",
    },
    {
      name: "ta_know_consequential",
      label:
        "I understand that AI outputs may not serve as the sole basis for any consequential decision affecting employees or third parties, and that human review is required.",
    },
    {
      name: "ta_know_incident_reporting",
      label:
        "I know how to report an AI incident, suspected policy violation, or unauthorized AI tool use, and I understand my obligation to do so.",
    },
    {
      name: "ta_know_request_process",
      label:
        "I understand that I must obtain written approval before using any AI tool not on the Approved Tools list for Company business.",
    },
    {
      name: "ta_know_consequences",
      label:
        "I understand that violations of the AI Acceptable Use Policy may result in disciplinary action, up to and including termination.",
    },
  ];
  knowledge.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Acknowledgment Statement ───────────────────────────────
  y = addSectionHeader(doc, "4. Acknowledgment Statement", y);

  doc.setDrawColor(50, 100, 200);
  doc.setFillColor(245, 248, 255);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 38, 2, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0);
  const ackText =
    "I, the undersigned, certify that:\n\n" +
    "1. I have read and received a copy of " +
    data.company.name +
    "'s Employee AI Acceptable Use Policy;\n" +
    "2. I have completed the required AI acceptable use training as documented above;\n" +
    "3. I understand my obligations under the Policy and agree to comply with all requirements;\n" +
    "4. I understand that the Policy may be updated, and I am responsible for reviewing and complying with any updates;\n" +
    "5. I understand that questions about permitted or prohibited uses should be directed to the AI Oversight Officer before acting.";
  const ackLines: string[] = doc.splitTextToSize(ackText, CONTENT_WIDTH - 8);
  ackLines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 6 + i * 4);
  });
  doc.setDrawColor(0);
  y += 42;
  y += LINE_HEIGHT;

  // ── Employee Signature ─────────────────────────────────────
  y = addSectionHeader(doc, "5. Employee Signature", y);

  y = addFormTextField(doc, "ta_emp_sig_name", "Employee Name (Print):", y);
  y = addFormTextField(doc, "ta_emp_sig", "Employee Signature:", y);
  y = addFormTextField(doc, "ta_emp_sig_date", "Date:", y);
  y += LINE_HEIGHT;

  // ── Supervisor Confirmation ────────────────────────────────
  y = addSectionHeader(doc, "6. Supervisor / HR Confirmation", y);
  y = addWrappedText(
    doc,
    "To be completed by the employee's direct supervisor or HR representative upon " +
      "receipt of this signed acknowledgment.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "ta_sup_name",
    "Supervisor / HR Representative Name (Print):",
    y
  );
  y = addFormTextField(
    doc,
    "ta_sup_title",
    "Title:",
    y
  );
  y = addFormTextField(doc, "ta_sup_sig", "Signature:", y);
  y = addFormTextField(doc, "ta_sup_date", "Date Received:", y);
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Instructions for HR: File the original signed copy in the employee's personnel " +
      "file. Log completion in the Company's training tracking system. Retain for the " +
      "duration of employment plus 3 years (or longer if required by applicable law).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "emp_train", y);

  addDisclaimer(doc);
  return doc;
}
