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
// CO Appeal & Correction Kit — Doc 3: Appeal Outcome Letter
// Three outcome templates: approved / partially corrected / denied
// Per C.R.S. § 6-1-1703
// ============================================================
export function generateAppealOutcomeLetter(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Consumer Appeal Outcome — Decision Letter",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template generates an outcome letter to the consumer following review of their appeal of an AI-assisted consequential decision made by ${data.company.name}. Select the applicable outcome section below. C.R.S. § 6-1-1703 requires deployers to provide consumers with appeal rights for consequential AI decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- COMMON FIELDS ----
  y = addSectionHeader(doc, "Letter Header (All Outcomes)", y);

  y = addFormTextField(doc, "aol_company_name", "Company Name:", y, {
    prefill: data.company.name,
  });
  y = addFormTextField(doc, "aol_company_address", "Company Mailing Address:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "aol_letter_date", "Letter Date:", y, {
    prefill: data.generatedDate,
    width: 80,
  });
  y = addFormTextField(doc, "aol_consumer_name", "Consumer Name:", y);
  y = addFormTextField(doc, "aol_consumer_address", "Consumer Address:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "aol_case_id", "Case / Appeal Reference Number:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "aol_original_decision_ref",
    "Original Decision Reference / Date:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_ai_system",
    "AI System Involved:",
    y
  );

  // ---- SELECT OUTCOME ----
  y = addSectionHeader(doc, "Outcome Selection", y);

  y = addWrappedText(
    doc,
    "Select the outcome of this appeal. Complete only the corresponding outcome section below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(doc, "aol_outcome_approved", "OUTCOME 1: Appeal Approved — Decision Reversed or Changed", y);
  y = addFormCheckbox(doc, "aol_outcome_partial", "OUTCOME 2: Appeal Partially Approved — Decision Partially Corrected", y);
  y = addFormCheckbox(doc, "aol_outcome_denied", "OUTCOME 3: Appeal Denied — Decision Upheld", y);

  // ============================================================
  // OUTCOME 1: APPROVED
  // ============================================================
  y = addSectionHeader(doc, "Outcome 1: Appeal Approved", y);

  y = addWrappedText(
    doc,
    "Use this section when the appeal is fully approved and the original decision is reversed or changed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "aol_approved_review_summary",
    "Summary of review process (how the human review was conducted):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_approved_reviewer_name",
    "Human Reviewer Name:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_approved_reviewer_title",
    "Human Reviewer Title:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_approved_review_date",
    "Date Human Review Completed:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "aol_approved_new_decision",
    "New Decision / Corrected Outcome:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_approved_effective_date",
    "Effective Date of Corrected Decision:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "aol_approved_next_steps",
    "Next steps for the consumer:",
    y,
    { multiline: true, lines: 3 }
  );

  // ============================================================
  // OUTCOME 2: PARTIALLY APPROVED
  // ============================================================
  y = addSectionHeader(
    doc,
    "Outcome 2: Appeal Partially Approved",
    y
  );

  y = addWrappedText(
    doc,
    "Use this section when some aspects of the appeal are approved and the decision is partially corrected.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "aol_partial_review_summary",
    "Summary of review process:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_partial_reviewer_name",
    "Human Reviewer Name:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_partial_reviewer_title",
    "Human Reviewer Title:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_partial_review_date",
    "Date Human Review Completed:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "aol_partial_approved_items",
    "Aspects of the appeal that were approved / corrected:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_partial_denied_items",
    "Aspects of the appeal that were not approved (with explanation):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_partial_new_decision",
    "Partially corrected decision:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_partial_next_steps",
    "Next steps for the consumer:",
    y,
    { multiline: true, lines: 3 }
  );

  // ============================================================
  // OUTCOME 3: DENIED
  // ============================================================
  y = addSectionHeader(doc, "Outcome 3: Appeal Denied", y);

  y = addWrappedText(
    doc,
    "Use this section when the appeal is denied and the original decision is upheld. A denial requires a specific explanation and information about next steps available to the consumer.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "aol_denied_review_summary",
    "Summary of review process:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_denied_reviewer_name",
    "Human Reviewer Name:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_denied_reviewer_title",
    "Human Reviewer Title:",
    y
  );
  y = addFormTextField(
    doc,
    "aol_denied_review_date",
    "Date Human Review Completed:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "aol_denied_explanation",
    "Explanation for denial (required — explain specifically why the appeal was denied and why the original decision is upheld):",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "aol_denied_original_decision_confirmed",
    "Confirmed original decision (restate the original decision):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aol_denied_next_steps",
    "Next steps available to the consumer (e.g., contact Colorado AG, seek legal counsel):",
    y,
    { multiline: true, lines: 3 }
  );

  y = addWrappedText(
    doc,
    "Consumer Notice: The Colorado Attorney General has authority to enforce C.R.S. § 6-1-1703. Consumers may contact the Colorado AG Consumer Protection Division at coag.gov/office-sections/departments/consumer-protection if they believe their rights under C.R.S. §§ 6-1-1701 through 6-1-1707 have been violated.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- Reviewer Signature ----
  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "aol_outcome", y);
  addDisclaimer(doc);
  return doc;
}
