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
  DECISION_LABELS,
  DATA_INPUT_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Technical Documentation (Annex IV)
// EU AI Act Art. 11 + Annex IV
// ============================================================
export function generateTechnicalDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Technical Documentation (Annex IV)", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template supports preparation of Technical Documentation required by Article 11 and Annex IV of Regulation (EU) 2024/1689 for high-risk AI systems operated by ${data.company.name}. Technical documentation must be established before market placement and kept up to date throughout the system lifecycle. This is a template — review and complete with your technical and legal teams.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Annex IV Section 1: General description
  y = addSectionHeader(doc, "1. General Description of the AI System (Annex IV §1)", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(doc, `System ${idx + 1}: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addWrappedText(
      doc,
      `  Provider/Vendor: ${sys.vendor || "Internal development"}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Description: ${sys.description || "[Complete per Annex IV §1(a)]"}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Intended purpose (Annex IV §1(b)): ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Data inputs (Annex IV §1(c)): ${data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ") || "Not specified"}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Annex IV Section 2: Detailed description of elements
  y = addSectionHeader(doc, "2. Detailed Description of System Elements (Annex IV §2)", y);
  const elements = [
    "Methods and steps used in development (Annex IV §2(a))",
    "Design specifications, including architectural choices (Annex IV §2(b))",
    "Training methodologies, techniques, and key design choices (Annex IV §2(c))",
    "Validation and testing procedures, including metrics and outcomes (Annex IV §2(d))",
    "Capabilities, limitations, and foreseeable unintended outcomes (Annex IV §2(e))",
  ];
  let cbCount = 0;
  elements.forEach((el) => {
    y = addFormCheckbox(doc, "td_elem_" + cbCount, el, y);
    cbCount++;
  });
  y = addFormTextField(doc, "td_elem_notes", "Notes / status for each element above:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Annex IV Section 3: Monitoring, functioning, and control
  y = addSectionHeader(doc, "3. Monitoring, Functioning, and Control (Annex IV §3)", y);
  const monitoring = [
    "Automatic event log specifications (Art. 12 — what is logged, retention period)",
    "Human oversight measures and interpretability features (Art. 14)",
    "Specifications for input data and training data governance (Art. 10)",
  ];
  monitoring.forEach((m, idx) => {
    y = addFormCheckbox(doc, "td_mon_" + idx, m, y);
  });
  y = addFormTextField(doc, "td_log_retention", "Log retention period:", y, { width: 80 });
  y += LINE_HEIGHT;

  // Annex IV Section 4: Market placement information
  y = addSectionHeader(doc, "4. Market Placement and Deployment Information (Annex IV §4)", y);
  y = addFormTextField(doc, "td_version", "System version / release number:", y, { width: 80 });
  y = addFormTextField(doc, "td_eu_rep", "EU authorized representative (if applicable, Art. 22):", y, { width: 140 });
  y = addFormTextField(doc, "td_notified_body", "Notified body (if applicable, Annex VII):", y, { width: 140 });
  y += LINE_HEIGHT;

  // Annex IV Section 5: EU Declaration of Conformity
  y = addSectionHeader(doc, "5. EU Declaration of Conformity Reference (Annex IV §5)", y);
  y = addWrappedText(
    doc,
    "Article 47 requires that a written EU Declaration of Conformity be drawn up and kept at the disposal of national authorities for 10 years after market placement. The Declaration must reference this Technical Documentation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "td_decl_ref", "Declaration of Conformity reference number:", y, { width: 100 });
  y = addFormTextField(doc, "td_decl_date", "Declaration date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Annex IV Section 6: Post-market monitoring
  y = addSectionHeader(doc, "6. Post-Market Monitoring Plan Reference (Annex IV §6)", y);
  y = addWrappedText(
    doc,
    "Article 72 requires providers to establish a post-market monitoring plan. Reference that plan here.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "td_pmm_ref", "Post-market monitoring plan document reference:", y, { width: 140 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "7. Documentation Sign-off", y);
  y = addFormTextField(doc, "td_name", "Prepared by:", y, { width: 100 });
  y = addFormTextField(doc, "td_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "td_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "td_review_date", "Next review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
