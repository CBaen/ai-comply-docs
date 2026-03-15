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
// CO Dev-Deploy Exchange Kit — Doc 1: Developer Disclosure Checklist
// Information developers must provide per C.R.S. § 6-1-1702
// ============================================================
export function generateDeveloperDisclosureChecklist(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "AI Developer Disclosure Checklist",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This checklist documents the disclosures an AI developer must provide to deployers under C.R.S. § 6-1-1702 (Colorado SB 24-205, effective June 30, 2026). For ${data.company.name}, complete this checklist for each AI system offered for use in consequential decisions. Check each item when the disclosure has been completed and provide the details or document reference in the corresponding field.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: System Identification ----
  y = addSectionHeader(doc, "Section 1: AI System Identification", y);

  y = addFormTextField(doc, "ddc_system_name", "AI System Name / Product Name:", y);
  y = addFormTextField(doc, "ddc_system_version", "Version / Release Date:", y, { width: 80 });
  y = addFormTextField(doc, "ddc_developer_name", "Developer Name:", y);
  y = addFormTextField(doc, "ddc_developer_contact", "Developer Contact (Name / Email):", y);
  y = addFormTextField(doc, "ddc_deployer_name", "Deployer Name:", y, {
    prefill: data.company.name,
  });
  y = addFormTextField(doc, "ddc_disclosure_date", "Date of Disclosure:", y, {
    prefill: data.generatedDate, width: 80,
  });

  // ---- SECTION 2: Required Disclosures Per § 6-1-1702 ----
  y = addSectionHeader(
    doc,
    "Section 2: Required Developer Disclosures (C.R.S. § 6-1-1702)",
    y
  );

  y = addWrappedText(
    doc,
    "For each required disclosure item, check the box when completed and provide the relevant document reference or details.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 4;

  // Item 1: System purpose and intended uses
  y = addFormCheckbox(
    doc,
    "ddc_item1_check",
    "1. System Purpose and Intended Uses — Describe the intended purpose and reasonably foreseeable uses of the AI system",
    y
  );
  y = addFormTextField(doc, "ddc_item1_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item 2: Known limitations
  y = addFormCheckbox(
    doc,
    "ddc_item2_check",
    "2. Known Limitations — Describe known limitations of the AI system that are relevant to its intended use, including accuracy, reliability, and performance constraints",
    y
  );
  y = addFormTextField(doc, "ddc_item2_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item 3: Training data description
  y = addFormCheckbox(
    doc,
    "ddc_item3_check",
    "3. Training Data Description — Describe the data used to train the AI system, including data sources, collection methods, and any known gaps or biases in the training data",
    y
  );
  y = addFormTextField(doc, "ddc_item3_detail", "Document reference / details (model card / dataset card reference per § 6-1-1702(3)):", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item 4: Known risks of algorithmic discrimination
  y = addFormCheckbox(
    doc,
    "ddc_item4_check",
    "4. Known Risks of Algorithmic Discrimination — Disclose any known or reasonably foreseeable risks that the AI system may result in algorithmic discrimination when used for its intended purpose",
    y
  );
  y = addFormTextField(doc, "ddc_item4_detail", "Document reference / details:", y, {
    multiline: true, lines: 4,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item 5: Proper and improper use cases
  y = addFormCheckbox(
    doc,
    "ddc_item5_check",
    "5. Proper and Improper Use Cases — Describe the uses for which the AI system is appropriate and the uses for which it is not appropriate; include any prohibited uses",
    y
  );
  y = addFormTextField(doc, "ddc_item5_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item 6: How to monitor the system
  y = addFormCheckbox(
    doc,
    "ddc_item6_check",
    "6. Monitoring Guidance — Provide guidance on how to monitor the AI system for algorithmic discrimination, including recommended metrics, monitoring frequency, and escalation procedures",
    y
  );
  y = addFormTextField(doc, "ddc_item6_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // ---- SECTION 3: Model Card & Dataset Card ----
  y = addSectionHeader(
    doc,
    "Section 3: Model Card and Dataset Card (§ 6-1-1702(3))",
    y
  );

  y = addWrappedText(
    doc,
    "C.R.S. § 6-1-1702(3) references model cards and dataset cards as documentation artifacts that developers may use to satisfy disclosure requirements. Check the applicable items below.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(doc, "ddc_model_card", "Model card provided to deployer", y);
  y = addFormTextField(doc, "ddc_model_card_ref", "Model card document reference / location:", y);
  y = addFormCheckbox(doc, "ddc_dataset_card", "Dataset card provided to deployer", y);
  y = addFormTextField(doc, "ddc_dataset_card_ref", "Dataset card document reference / location:", y);
  y = addFormTextField(
    doc,
    "ddc_additional_docs",
    "Other documentation provided (list):",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 4: Confidentiality ----
  y = addSectionHeader(doc, "Section 4: Confidentiality Designation", y);

  y = addWrappedText(
    doc,
    "Some disclosure materials may be subject to confidentiality or trade secret protections. Identify which portions of the disclosure are subject to confidentiality restrictions, if any.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(doc, "ddc_conf_none", "No confidentiality restrictions apply to any portion of this disclosure", y);
  y = addFormCheckbox(doc, "ddc_conf_partial", "Confidentiality restrictions apply to specified portions (identify below)", y);
  y = addFormTextField(doc, "ddc_conf_detail", "Portions subject to confidentiality and applicable restrictions:", y, {
    multiline: true, lines: 3,
  });

  // ---- SECTION 5: Completeness Certification ----
  y = addSectionHeader(doc, "Section 5: Developer Completeness Certification", y);

  y = addWrappedText(
    doc,
    "By completing this section, the developer certifies that all required disclosures under C.R.S. § 6-1-1702 have been made to the deployer as of the date below, to the best of the developer's knowledge.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(doc, "ddc_cert_all_complete", "All required disclosures completed? (Yes / No — if No, explain):", y);
  y = addFormTextField(doc, "ddc_cert_date", "Certification Date:", y, { width: 80 });
  y = addFormTextField(doc, "ddc_cert_notes", "Notes or exceptions:", y, {
    multiline: true, lines: 3,
  });

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "ddc_developer", y);
  addDisclaimer(doc);
  return doc;
}
