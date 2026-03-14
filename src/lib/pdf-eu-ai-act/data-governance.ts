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
  DATA_INPUT_LABELS,
  PROTECTED_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Data Governance Documentation
// EU AI Act Art. 10 — Data and Data Governance
// ============================================================
export function generateDataGovernance(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Data Governance Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports compliance with Article 10 of Regulation (EU) 2024/1689, which requires that high-risk AI systems be developed using training, validation, and testing data that meets specific quality requirements and is subject to appropriate data governance practices. Prepared for ${data.company.name}. This is a template — review with your data protection officer and legal team.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Data governance practices (Art. 10(2))
  y = addSectionHeader(doc, "1. Data Governance Practices (Art. 10(2))", y);
  y = addWrappedText(
    doc,
    "Article 10(2) requires that data governance practices cover design choices, data collection, data preparation (annotation, labeling, cleaning, enrichment), and formulation of relevant assumptions. Document each below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const governancePractices = [
    "Design choices: data sources selected with documented rationale (Art. 10(2)(a))",
    "Data collection procedures documented and auditable (Art. 10(2)(b))",
    "Data preparation: annotation, labeling, cleaning processes documented (Art. 10(2)(c))",
    "Relevant assumptions documented (what the data represents) (Art. 10(2)(d))",
    "Availability, quantity, and suitability assessed for intended purpose (Art. 10(2)(e))",
    "Examination for possible biases that may affect health, safety, or fundamental rights (Art. 10(2)(f))",
    "Identification of data gaps and shortcomings (Art. 10(2)(g))",
  ];

  let cbCount = 0;
  governancePractices.forEach((practice) => {
    y = addFormCheckbox(doc, "dg_gov_" + cbCount, practice, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 2: Data categories and inputs
  y = addSectionHeader(doc, "2. Data Categories and Inputs", y);
  const inputs = data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ");
  y = addWrappedText(
    doc,
    `Data categories currently processed: ${inputs || "Not specified"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const chars = data.protectedCharacteristics
    .filter((c) => c !== "none")
    .map((c) => PROTECTED_LABELS[c] || c)
    .join(", ");
  y = addWrappedText(
    doc,
    `Protected characteristics in data: ${chars || "None reported — verify proxy risk (zip code, name, etc.)"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 3: Special categories of data (Art. 10(5))
  y = addSectionHeader(doc, "3. Special Categories of Personal Data (Art. 10(5))", y);
  y = addWrappedText(
    doc,
    "Article 10(5) permits processing of special categories of personal data (GDPR Art. 9/10 data) for bias monitoring only when specific conditions are met. Check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const specialCatConditions = [
    "No special categories of personal data are processed — Art. 10(5) not triggered",
    "Processing is strictly limited to detecting and correcting bias in the AI system",
    "Special safeguards are in place (access restrictions, pseudonymization, encryption)",
    "State-of-the-art security measures implemented for special category data",
    "Processing is necessary and proportionate to the purpose of bias detection",
  ];

  specialCatConditions.forEach((cond, idx) => {
    y = addFormCheckbox(doc, "dg_special_" + idx, cond, y);
  });
  y += LINE_HEIGHT;

  // Section 4: Training, validation, and testing data quality (Art. 10(3))
  y = addSectionHeader(doc, "4. Data Quality Requirements (Art. 10(3))", y);
  y = addWrappedText(
    doc,
    "Article 10(3) requires that training, validation, and testing datasets be relevant, sufficiently representative, and to the best extent possible, free of errors and complete, with appropriate statistical properties for the intended purpose including any specific geographic, contextual, behavioural or functional settings in which the system will be used.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const qualityChecks = [
    "Training data: relevance and representativeness documented",
    "Training data: error rates and completeness assessed",
    "Validation data: statistically appropriate for intended purpose",
    "Testing data: reflects operational conditions including target geographic/behavioral context",
    "Dataset documentation maintained (provenance, version, size)",
  ];

  qualityChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "dg_quality_" + idx, check, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Data sources
  y = addSectionHeader(doc, "5. Data Sources and Provenance", y);
  y = addFormTextField(doc, "dg_sources", "Training data sources (list each):", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "dg_validation_src", "Validation data sources:", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "dg_test_src", "Testing data sources:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Sign-off", y);
  y = addFormTextField(doc, "dg_dpo", "Data Protection Officer (if applicable):", y, { width: 120 });
  y = addFormTextField(doc, "dg_name", "Completed by:", y, { width: 100 });
  y = addFormTextField(doc, "dg_date", "Date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "eu_datgov", y);

  addDisclaimer(doc);
  return doc;
}
