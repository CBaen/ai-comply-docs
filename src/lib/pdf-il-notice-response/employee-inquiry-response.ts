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
// IL Notice & Response Kit — Doc 3: Employee Inquiry Response Form
// Per 775 ILCS 5/2-102(L)(2) notice requirements
// ============================================================
export function generateEmployeeInquiryResponse(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Employee AI Inquiry Response Record",
    data
  );
  y = addTopDisclaimer(doc, y);

  // IDHR rulemaking disclosure
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    "Note: IDHR is currently developing implementing rules for the AI notice requirements under 775 ILCS 5/2-102(L). The format, timing, and delivery requirements for employee notice are not yet finalized. This template reflects the statutory text as enacted. Update this document when IDHR publishes its rules.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    `Use this form to document and respond to employee questions about AI system use in employment decisions at ${data.company.name}. 775 ILCS 5/2-102(L)(2) requires employers to notify employees of AI systems used in employment decisions and provide a contact person for questions. Retain completed forms for a minimum of 4 years (recommended).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Inquiry Receipt ----
  y = addSectionHeader(doc, "Section 1: Inquiry Receipt", y);

  y = addFormTextField(doc, "eir_employee_name", "Employee Name:", y);
  y = addFormTextField(
    doc,
    "eir_employee_id",
    "Employee ID / Position Title:",
    y
  );
  y = addFormTextField(
    doc,
    "eir_employee_dept",
    "Department / Work Location:",
    y
  );
  y = addFormTextField(doc, "eir_employee_contact", "Employee Contact (email / phone):", y);
  y = addFormTextField(doc, "eir_date_received", "Date Inquiry Received:", y, {
    width: 70,
  });
  y = addFormTextField(
    doc,
    "eir_receipt_method",
    "How Received (email / in-person / HR portal / other):",
    y
  );

  // ---- SECTION 2: Inquiry Summary ----
  y = addSectionHeader(doc, "Section 2: Question / Inquiry Summary", y);

  y = addFormTextField(
    doc,
    "eir_question_summary",
    "Summary of employee's question or concern:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "eir_ai_system_referenced",
    "AI system referenced (if identified by employee):",
    y
  );
  y = addFormTextField(
    doc,
    "eir_decision_referenced",
    "Employment decision referenced (if identified):",
    y
  );

  // ---- SECTION 3: Inquiry Classification ----
  y = addSectionHeader(doc, "Section 3: Inquiry Classification", y);

  y = addWrappedText(
    doc,
    "Check all that apply to this inquiry:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const inquiryTypes = [
    "General question about AI system use in employment",
    "Question about how AI was used in a specific decision",
    "Request for AI system description or documentation",
    "Request for human review of an AI-assisted decision",
    "Reasonable accommodation request related to AI use",
    "Complaint about potential discriminatory effect of AI",
    "Request to opt out of AI-assisted decision process",
    "Other (describe below)",
  ];
  inquiryTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `eir_type_${idx}`, type, y);
  });
  y = addFormTextField(
    doc,
    "eir_type_other_desc",
    "If 'Other' — describe:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 4: Response ----
  y = addSectionHeader(doc, "Section 4: Response Provided", y);

  y = addFormTextField(
    doc,
    "eir_response_summary",
    "Summary of response provided to employee:",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "eir_documents_provided",
    "Documents or information provided (list):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "eir_response_date", "Date Response Provided:", y, {
    width: 70,
  });
  y = addFormTextField(
    doc,
    "eir_response_method",
    "Response Method (email / in-person / letter / other):",
    y
  );

  // ---- SECTION 5: Human Review ----
  y = addSectionHeader(
    doc,
    "Section 5: Human Review (If Requested or Escalated)",
    y
  );

  y = addWrappedText(
    doc,
    "If the employee requested or the employer initiated a human review of an AI-assisted decision, complete this section.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(doc, "eir_human_review_triggered", "Human review of AI decision was conducted", y);
  y = addFormTextField(
    doc,
    "eir_review_outcome",
    "Outcome of human review:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "eir_review_date",
    "Date human review completed:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "eir_review_decision",
    "Decision changed as a result? (Yes / No — explain):",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 6: Resolution ----
  y = addSectionHeader(doc, "Section 6: Resolution & Follow-Up", y);

  y = addFormTextField(
    doc,
    "eir_resolution_status",
    "Resolution Status (Open / Resolved / Escalated to HR / Escalated to Legal):",
    y
  );
  y = addFormTextField(
    doc,
    "eir_followup_actions",
    "Follow-up actions required (if any):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "eir_followup_date",
    "Follow-up completion date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "eir_respondent_name",
    "Respondent Name (person completing this form):",
    y
  );
  y = addFormTextField(doc, "eir_respondent_title", "Respondent Title / Role:", y);

  // ---- Statutory Reference ----
  y = addSectionHeader(doc, "Statutory Reference", y);
  y = addWrappedText(
    doc,
    "This form is designed to document compliance with notice requirements under 775 ILCS 5/2-102(L)(2) of the Illinois Human Rights Act (P.A. 103-804, effective January 1, 2026). IDHR implementing rules are in development. Monitor dhr.illinois.gov for updates.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "eir_response", y);
  addDisclaimer(doc);
  return doc;
}
