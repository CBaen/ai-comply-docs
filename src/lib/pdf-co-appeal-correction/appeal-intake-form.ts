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
// CO Appeal & Correction Kit — Doc 1: Appeal Intake Form
// Per C.R.S. § 6-1-1703 consumer appeal rights
// ============================================================
export function generateAppealIntakeForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Consumer AI Decision Appeal — Intake Form",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this form to receive and process consumer appeals of consequential decisions made using artificial intelligence systems deployed by ${data.company.name}. Colorado SB 24-205 (C.R.S. § 6-1-1703) provides consumers the right to appeal consequential decisions made by AI systems and to request human review where technically feasible. Retain completed forms for a minimum of 5 years.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Consumer Information ----
  y = addSectionHeader(doc, "Section 1: Consumer Information", y);

  y = addFormTextField(doc, "aif_consumer_name", "Consumer Full Name:", y);
  y = addFormTextField(doc, "aif_consumer_address", "Mailing Address:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "aif_consumer_email", "Email Address:", y);
  y = addFormTextField(doc, "aif_consumer_phone", "Phone Number:", y);
  y = addFormTextField(
    doc,
    "aif_consumer_preferred_contact",
    "Preferred Contact Method (email / phone / mail):",
    y
  );
  y = addFormTextField(
    doc,
    "aif_consumer_id",
    "Account / Customer ID (if applicable):",
    y
  );

  // ---- SECTION 2: Decision Being Appealed ----
  y = addSectionHeader(doc, "Section 2: Decision Being Appealed", y);

  y = addFormTextField(
    doc,
    "aif_ai_system",
    "AI System That Made or Informed the Decision:",
    y
  );
  y = addFormTextField(doc, "aif_decision_date", "Date of Original Decision:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "aif_decision_description",
    "Description of Decision (what was decided and how it affects you):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "aif_decision_reference",
    "Reference number / confirmation number for original decision (if available):",
    y
  );

  y = addWrappedText(
    doc,
    "Decision category (check one):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const decisionTypes = [
    "Education enrollment or educational opportunity",
    "Employment or employment opportunity",
    "Financial services or lending",
    "Essential government services",
    "Healthcare services",
    "Housing",
    "Insurance",
    "Legal services",
    "Other consequential decision",
  ];
  decisionTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `aif_decision_type_${idx}`, type, y);
  });

  y = addFormTextField(
    doc,
    "aif_decision_type_other",
    "If 'Other' — describe the type of decision:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 3: Reason for Appeal ----
  y = addSectionHeader(doc, "Section 3: Reason for Appeal", y);

  y = addWrappedText(
    doc,
    "Check all reasons that apply to this appeal:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const appealReasons = [
    "I believe the decision was based on incorrect or incomplete data",
    "I believe the AI system failed to account for relevant information",
    "I believe the decision was discriminatory",
    "I was not informed that AI was used in making this decision",
    "I believe the AI system was used outside its intended scope",
    "I want a human to review this decision",
    "Other reason (describe below)",
  ];
  appealReasons.forEach((reason, idx) => {
    y = addFormCheckbox(doc, `aif_reason_${idx}`, reason, y);
  });

  y = addFormTextField(
    doc,
    "aif_appeal_narrative",
    "Detailed explanation of appeal (describe why you believe the decision should be changed):",
    y,
    { multiline: true, lines: 5 }
  );

  // ---- SECTION 4: Requested Remedy ----
  y = addSectionHeader(doc, "Section 4: Requested Remedy", y);

  y = addWrappedText(
    doc,
    "Check all remedies you are requesting:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const remedies = [
    "Reverse the decision",
    "Correct the data used in the decision",
    "Human review of the decision",
    "Explanation of how the AI system reached the decision",
    "Re-evaluation of my application / request",
    "Other remedy (describe below)",
  ];
  remedies.forEach((remedy, idx) => {
    y = addFormCheckbox(doc, `aif_remedy_${idx}`, remedy, y);
  });

  y = addFormTextField(
    doc,
    "aif_remedy_other",
    "If 'Other' — describe the remedy requested:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 5: Supporting Documentation ----
  y = addSectionHeader(doc, "Section 5: Supporting Documentation", y);

  y = addFormTextField(
    doc,
    "aif_docs_attached",
    "List documents attached to this appeal (if any):",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 6: Intake Processing ----
  y = addSectionHeader(doc, "Section 6: Intake Processing (Staff Use)", y);

  y = addFormTextField(doc, "aif_intake_date", "Date Appeal Received:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "aif_intake_method", "How Received (portal / mail / email / in-person):", y);
  y = addFormTextField(
    doc,
    "aif_case_id",
    "Case / Appeal ID Assigned:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "aif_assigned_reviewer",
    "Assigned Reviewer (Name / Title):",
    y
  );
  y = addFormTextField(
    doc,
    "aif_due_date",
    "Response Due Date (note: C.R.S. § 6-1-1703 human review requirement applies 'if technically feasible'):",
    y
  );

  y = addWrappedText(
    doc,
    "Note: C.R.S. § 6-1-1703 requires deployers to provide consumers the opportunity to appeal consequential decisions and to request human review of such decisions if technically feasible. The Colorado Attorney General has exclusive enforcement authority under § 6-1-1706.",
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
  y = addSignatureBlock(doc, "aif_appeal", y);
  addDisclaimer(doc);
  return doc;
}
