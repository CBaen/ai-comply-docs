import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: Accommodation Request Form
// ============================================================
export function generateAccommodationForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Accommodation Request Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "Use this form to request an accommodation related to AI-assisted employment processes at " +
      data.company.name +
      ". Complete all sections and submit to " +
      (data.contact.name || "your compliance contact") +
      (data.contact.email ? " at " + data.contact.email : "") +
      ".",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Employee Info — fillable text fields
  y = addSectionHeader(doc, "Section 1: Your Information", y);
  y = addFormTextField(doc, "employee_name", "Full Name:", y);
  y = addFormTextField(
    doc,
    "employee_dept",
    "Department / Position Applied For:",
    y
  );
  y = addFormTextField(
    doc,
    "employee_id",
    "Employee ID (if applicable):",
    y
  );
  y = addFormTextField(doc, "request_date", "Date:", y);
  y += 4;

  // Section 2: AI Systems — checkboxes (pre-populated from questionnaire data)
  y = addSectionHeader(doc, "Section 2: Which AI System(s)?", y);
  y = addWrappedText(
    doc,
    "Check all AI systems your request relates to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  data.aiSystems.forEach((sys, idx) => {
    const label = sys.name + (sys.vendor ? " (" + sys.vendor + ")" : "");
    y = addFormCheckbox(doc, "ai_system_" + idx, label, y);
  });
  y = addFormCheckbox(doc, "ai_system_other", "Other", y);
  y = addFormTextField(doc, "ai_system_other_name", "", y);
  y += 4;

  // Section 3: Reason — checkboxes
  y = addSectionHeader(doc, "Section 3: Reason for Request", y);
  y = addWrappedText(
    doc,
    "I am requesting an accommodation because the AI-assisted process creates a barrier related to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "basis_disability",
    "A disability \u2014 physical, mental, or sensory",
    y
  );
  y = addFormCheckbox(
    doc,
    "basis_religion",
    "A sincerely held religious practice or observance",
    y
  );
  y = addFormCheckbox(
    doc,
    "basis_pregnancy",
    "Pregnancy, childbirth, or a related condition",
    y
  );
  y += 4;

  // Section 4: Accommodation type — checkboxes
  y = addSectionHeader(doc, "Section 4: Accommodation Requested", y);
  y = addWrappedText(
    doc,
    "What type of accommodation would help? (Check all that apply)",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "accom_human_review",
    "Human-only review of AI-influenced decision(s)",
    y
  );
  y = addFormCheckbox(
    doc,
    "accom_alt_method",
    "Alternative assessment method that does not use this AI system",
    y
  );
  y = addFormCheckbox(
    doc,
    "accom_modify_data",
    "Modification to how the AI system processes my data",
    y
  );
  y = addFormCheckbox(doc, "accom_other", "Other (describe below)", y);
  y += 4;

  // Section 5: Description — fillable multi-line text area
  y = addSectionHeader(doc, "Section 5: Tell Us More", y);
  y = addFormTextField(
    doc,
    "description",
    "Describe the barrier you are experiencing and any details that would help us find the right accommodation:",
    y,
    { multiline: true, lines: 8 }
  );
  y += 4;

  // Section 6: Signature — fillable fields
  y = addSectionHeader(doc, "Section 6: Acknowledgment & Signature", y);
  y = addWrappedText(
    doc,
    "I understand that " +
      data.company.name +
      " will review this request and work with me to find an appropriate accommodation. Submitting this form does not guarantee a specific accommodation will be granted, but retaliation for making this request is prohibited by law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "signature", "Signature:", y, { width: 100 });
  y = addFormTextField(doc, "signature_date", "Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // For Office Use Only — fillable fields for HR
  y = addSectionHeader(doc, "For Office Use Only", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "CONFIDENTIALITY: Any medical information on this form must be kept separate from the employee's personnel file.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += 4;
  y = addFormTextField(doc, "office_received_by", "Received by:", y, { width: 100 });
  y = addFormTextField(doc, "office_received_date", "Date received:", y, { width: 60 });
  y = addFormTextField(doc, "office_action", "Action taken:", y);
  y = addFormCheckbox(
    doc,
    "office_accepted_yes",
    "Employee accepted proposed accommodation",
    y
  );
  y = addFormCheckbox(
    doc,
    "office_accepted_no",
    "Employee did not accept — continued interactive process",
    y
  );
  y = addFormTextField(
    doc,
    "office_continued_process",
    "Describe continued interactive process:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "office_response_date",
    "Response provided to employee on:",
    y,
    { width: 80 }
  );
  y = addFormTextField(doc, "office_approved_by", "Approved by:", y, { width: 100 });
  y += LINE_HEIGHT;

  // Appendix: Legal References (static text, not fillable)
  y = addSectionHeader(doc, "Appendix: Legal References", y);
  y = addWrappedText(
    doc,
    "This form is grounded in the following Illinois and federal law. HR and legal counsel can use these citations for compliance review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(doc, "Illinois law:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  const enactedLaw = [
    "Disability accommodation: 775 ILCS 5/2-102(B); 56 Ill. Admin. Code 2535.100; 56 Ill. Admin. Code 2535.120",
    "Religious accommodation: 775 ILCS 5/2-102(A)",
    "Pregnancy accommodation: 775 ILCS 5/2-102(J)",
    "Undue hardship standard: 775 ILCS 5/2-104",
    "Anti-retaliation: 775 ILCS 5/6-101",
    "Interactive process: 56 Ill. Admin. Code 2535.120; accommodation must be acceptable to both parties: 56 Ill. Admin. Code 2535.220",
  ];
  enactedLaw.forEach((item) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + item,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += 4;
  y = addWrappedText(doc, "Federal law:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  const federalLaw = [
    "Disability: 42 U.S.C. 12112(b)(5)(A) (ADA); 29 C.F.R. Part 1630; anti-retaliation: 42 U.S.C. 12203",
    "Religion: 42 U.S.C. 2000e et seq. (Title VII); anti-retaliation: 42 U.S.C. 2000e-3",
    "Pregnancy: 42 U.S.C. 2000gg et seq. (PWFA); anti-retaliation: 42 U.S.C. 2000gg-2(f)",
    "Confidentiality of medical records: 42 U.S.C. 12112(d); 29 C.F.R. 1630.14",
  ];
  federalLaw.forEach((item) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + item,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += 4;
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Note: 775 ILCS 5/2-102(L) does not specifically address AI-related accommodations. However, existing IHRA accommodation obligations for disability, pregnancy, and religion may intersect with AI use in employment processes. IDHR is developing implementing rules — monitor dhr.illinois.gov for updates.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "il_accom", y);

  addDisclaimer(doc);
  return doc;
}
