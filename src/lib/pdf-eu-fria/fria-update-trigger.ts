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
// DOCUMENT 3: FRIA Update Trigger Assessment
// EU AI Act Art. 27(2) — When FRIA must be updated
// ============================================================
export function generateFriaUpdateTrigger(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: FRIA Update Trigger Assessment (Art. 27(2))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This form assists ${data.company.name} in determining when the Fundamental Rights Impact Assessment (FRIA) must be updated pursuant to Article 27(2) of Regulation (EU) 2024/1689 (EU AI Act). Article 27(2) requires deployers to update the FRIA when the use of the AI system changes significantly or when the assessment no longer reflects the actual risk profile. Complete this review periodically (at minimum annually) or whenever a potential trigger event occurs. If any trigger is checked "Yes," initiate a FRIA review immediately.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Review information
  y = addSectionHeader(doc, "Review Information", y);
  y = addFormTextField(doc, "friaup_sys_name", "AI system name and version:", y, { width: 140 });
  y = addFormTextField(doc, "friaup_original_fria_date", "Date of original / last FRIA:", y, { width: 80 });
  y = addFormTextField(doc, "friaup_review_date", "Date of this trigger review:", y, { width: 80 });
  y = addFormTextField(doc, "friaup_reviewer_name", "Reviewer name:", y, { width: 120 });
  y = addFormTextField(doc, "friaup_reviewer_title", "Reviewer title:", y, { width: 120 });
  y += LINE_HEIGHT;

  // Instructions
  y = addSectionHeader(doc, "How to Use This Form", y);
  y = addWrappedText(
    doc,
    "For each trigger below: (1) check 'Yes' or 'No' to indicate whether the trigger condition has occurred, (2) if Yes, describe the change in the description field, and (3) record the action required. If any trigger is marked 'Yes,' a FRIA update is required. Complete the FRIA update before continued deployment of the AI system in the changed context.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Trigger 1: AI system modified
  y = addSectionHeader(doc, "Trigger 1: AI System Modified", y);
  y = addWrappedText(
    doc,
    "Has the AI system been modified in a way that may affect its fundamental rights risk profile? Examples: new model version, changed algorithms, new training data, modified outputs, changed input features.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "friaup_t1_yes", "YES — AI system has been materially modified", y);
  y = addFormCheckbox(doc, "friaup_t1_no", "NO — No material modification to AI system", y);
  y = addFormTextField(
    doc,
    "friaup_t1_description",
    "If Yes, describe the modification:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "friaup_t1_action",
    "Action required (e.g., FRIA update initiated — date, responsible person):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Trigger 2: New categories of affected persons
  y = addSectionHeader(doc, "Trigger 2: New Categories of Affected Persons", y);
  y = addWrappedText(
    doc,
    "Has the AI system begun to affect categories of natural persons or groups not identified in the original FRIA? Examples: expanded to new demographics, used in a new geographic area, applied to a broader or different workforce population.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "friaup_t2_yes", "YES — New categories of persons are now affected", y);
  y = addFormCheckbox(doc, "friaup_t2_no", "NO — No change to categories of affected persons", y);
  y = addFormTextField(
    doc,
    "friaup_t2_description",
    "If Yes, describe the new categories and context:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "friaup_t2_action",
    "Action required:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Trigger 3: Different use context
  y = addSectionHeader(doc, "Trigger 3: Different Use Context", y);
  y = addWrappedText(
    doc,
    "Has the organizational context or purpose of use changed from what was assessed in the original FRIA? Examples: deployed in a new department, used for a different decision type, integrated into a new process, used in a different Member State.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "friaup_t3_yes", "YES — Use context has materially changed", y);
  y = addFormCheckbox(doc, "friaup_t3_no", "NO — Use context is unchanged", y);
  y = addFormTextField(
    doc,
    "friaup_t3_description",
    "If Yes, describe the change in use context:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "friaup_t3_action",
    "Action required:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Trigger 4: New risk information
  y = addSectionHeader(doc, "Trigger 4: New Risk Information Available", y);
  y = addWrappedText(
    doc,
    "Has new information become available that changes the risk assessment? Examples: AI system provider has issued a safety notice, incidents reported in other deployments, academic research revealing new harms, internal incidents or near-misses, audit findings.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "friaup_t4_yes", "YES — New risk information has emerged", y);
  y = addFormCheckbox(doc, "friaup_t4_no", "NO — No new material risk information", y);
  y = addFormTextField(
    doc,
    "friaup_t4_description",
    "If Yes, describe the new risk information and its source:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "friaup_t4_action",
    "Action required:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Trigger 5: Regulatory changes
  y = addSectionHeader(doc, "Trigger 5: Regulatory or Legal Changes", y);
  y = addWrappedText(
    doc,
    "Have there been regulatory or legal changes affecting the assessment? Examples: new EU AI Act implementing acts or guidance, Member State national implementing measures, new court decisions on fundamental rights, updated guidance from a market surveillance authority or national data protection authority.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "friaup_t5_yes", "YES — Relevant regulatory or legal changes have occurred", y);
  y = addFormCheckbox(doc, "friaup_t5_no", "NO — No material regulatory or legal changes", y);
  y = addFormTextField(
    doc,
    "friaup_t5_description",
    "If Yes, describe the regulatory or legal change:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "friaup_t5_action",
    "Action required:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Overall determination
  y = addSectionHeader(doc, "Overall Determination", y);
  y = addFormCheckbox(
    doc,
    "friaup_result_update_required",
    "FRIA UPDATE REQUIRED — One or more triggers marked Yes. Initiate FRIA update before continued deployment.",
    y
  );
  y = addFormCheckbox(
    doc,
    "friaup_result_no_update",
    "NO UPDATE REQUIRED — All triggers marked No. Existing FRIA remains current. Document this review.",
    y
  );
  y = addFormTextField(doc, "friaup_result_date", "Date FRIA update initiated (if applicable):", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "friaup_result_notes",
    "Additional notes or observations:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "friaup_sign", y);

  addDisclaimer(doc);
  return doc;
}
