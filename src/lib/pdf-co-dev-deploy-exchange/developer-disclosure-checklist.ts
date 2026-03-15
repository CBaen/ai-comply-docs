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
    "The 13 required disclosure elements are organized by statutory subsection. Check each item when completed and provide a document reference or details. Elements (a)–(d) address disclosure to deployers; (3) addresses documentation artifacts; (4) addresses the public website statement.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 4;

  // Item (a): Foreseeable uses and known harmful uses
  y = addFormCheckbox(
    doc,
    "ddc_item_a_check",
    "(a) Foreseeable Uses and Known Harmful Uses — General statement of the AI system's reasonably foreseeable uses and known harmful or inappropriate uses",
    y
  );
  y = addFormTextField(doc, "ddc_item_a_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (b)(I): Summary of training data types
  y = addFormCheckbox(
    doc,
    "ddc_item_b1_check",
    "(b)(I) Summary of Training Data Types — Summary of the types of data used to train the AI system",
    y
  );
  y = addFormTextField(doc, "ddc_item_b1_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (b)(II): Known limitations including discrimination risks
  y = addFormCheckbox(
    doc,
    "ddc_item_b2_check",
    "(b)(II) Known Limitations Including Algorithmic Discrimination Risks — Known limitations of the AI system including risks of algorithmic discrimination",
    y
  );
  y = addFormTextField(doc, "ddc_item_b2_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (b)(III): System purpose
  y = addFormCheckbox(
    doc,
    "ddc_item_b3_check",
    "(b)(III) System Purpose — The purpose of the AI system",
    y
  );
  y = addFormTextField(doc, "ddc_item_b3_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (b)(IV): Intended benefits and uses
  y = addFormCheckbox(
    doc,
    "ddc_item_b4_check",
    "(b)(IV) Intended Benefits and Uses — The intended benefits and uses of the AI system",
    y
  );
  y = addFormTextField(doc, "ddc_item_b4_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (b)(V): All info necessary for deployer compliance with §6-1-1703
  y = addFormCheckbox(
    doc,
    "ddc_item_b5_check",
    "(b)(V) All Information Necessary for Deployer Compliance with § 6-1-1703 — Any other information the developer reasonably believes is necessary for a deployer to comply with § 6-1-1703",
    y
  );
  y = addFormTextField(doc, "ddc_item_b5_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (c)(I): Evaluation for performance and discrimination mitigation
  y = addFormCheckbox(
    doc,
    "ddc_item_c1_check",
    "(c)(I) Evaluation for Performance and Discrimination Mitigation — Description of how the system was evaluated for performance and for mitigation of algorithmic discrimination",
    y
  );
  y = addFormTextField(doc, "ddc_item_c1_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (c)(II): Data governance measures for training datasets
  y = addFormCheckbox(
    doc,
    "ddc_item_c2_check",
    "(c)(II) Data Governance Measures for Training Datasets — Description of data governance measures applied to training datasets",
    y
  );
  y = addFormTextField(doc, "ddc_item_c2_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (c)(III): Intended outputs
  y = addFormCheckbox(
    doc,
    "ddc_item_c3_check",
    "(c)(III) Intended Outputs — Description of the intended outputs of the AI system",
    y
  );
  y = addFormTextField(doc, "ddc_item_c3_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (c)(IV): Measures to mitigate discrimination risks
  y = addFormCheckbox(
    doc,
    "ddc_item_c4_check",
    "(c)(IV) Measures to Mitigate Discrimination Risks — Description of measures taken to mitigate known or reasonably foreseeable risks of algorithmic discrimination",
    y
  );
  y = addFormTextField(doc, "ddc_item_c4_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // Item (d): Additional documentation for understanding outputs
  y = addFormCheckbox(
    doc,
    "ddc_item_d_check",
    "(d) Additional Documentation for Understanding Outputs — Any additional documentation that helps deployers understand the outputs of the AI system and monitor for algorithmic discrimination",
    y
  );
  y = addFormTextField(doc, "ddc_item_d_detail", "Document reference / details:", y, {
    multiline: true, lines: 3,
  });
  doc.setDrawColor(220); doc.setLineWidth(0.3);
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  // ---- SECTION 3: Model Card, Dataset Card, and Impact Assessments (§ 6-1-1702(3)) ----
  y = addSectionHeader(
    doc,
    "Section 3: Element (3) — Model Cards, Dataset Cards, and Impact Assessments (§ 6-1-1702(3))",
    y
  );

  y = addWrappedText(
    doc,
    "C.R.S. § 6-1-1702(3) requires developers to provide model cards, dataset cards, or other impact assessments to deployers. Check each documentation artifact provided.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(
    doc,
    "ddc_item_3a_check",
    "(3) Model Card — Model card describing the AI system provided to deployer",
    y
  );
  y = addFormTextField(doc, "ddc_model_card_ref", "Model card document reference / location:", y);
  y = addFormCheckbox(
    doc,
    "ddc_item_3b_check",
    "(3) Dataset Card — Dataset card describing training data provided to deployer",
    y
  );
  y = addFormTextField(doc, "ddc_dataset_card_ref", "Dataset card document reference / location:", y);
  y = addFormCheckbox(
    doc,
    "ddc_item_3c_check",
    "(3) Impact Assessment — Other impact assessment documentation provided to deployer",
    y
  );
  y = addFormTextField(
    doc,
    "ddc_additional_docs",
    "Other documentation provided (list):",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 3B: Public Website Statement (§ 6-1-1702(4)) ----
  y = addSectionHeader(
    doc,
    "Section 3B: Element (4) — Public Website Statement (§ 6-1-1702(4))",
    y
  );

  y = addWrappedText(
    doc,
    "C.R.S. § 6-1-1702(4) requires developers to post a statement on their public website summarizing the types of high-risk artificial intelligence systems the developer offers for use and the developer's approach to managing risks of algorithmic discrimination.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(
    doc,
    "ddc_item_4_check",
    "(4) Public Website Statement — Statement summarizing high-risk AI systems offered and risk management approach posted on developer's public website",
    y
  );
  y = addFormTextField(doc, "ddc_item_4_url", "URL of public website statement:", y, {
    width: 150,
  });
  y = addFormTextField(doc, "ddc_item_4_date", "Date statement posted / last updated:", y, {
    width: 80,
  });

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
