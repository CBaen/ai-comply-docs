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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Risk Management System Documentation
// EU AI Act Art. 9 — Risk Management System
// ============================================================
export function generateRiskManagementSystem(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Risk Management System Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes the risk management system for high-risk AI systems operated by ${data.company.name}, in alignment with Article 9 of Regulation (EU) 2024/1689. Article 9 requires that a risk management system be established, implemented, documented, and maintained throughout the lifecycle of a high-risk AI system. This is a template — review with qualified EU legal counsel before use.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: System identification
  y = addSectionHeader(doc, "1. System Identification", y);
  y = addWrappedText(doc, `Organization: ${data.company.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, `Document date: ${data.generatedDate}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, `Regulation: Regulation (EU) 2024/1689, Article 9`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name} (${sys.vendor || "Internal"}) — ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // Section 2: Risk identification (Art. 9(2)(a))
  y = addSectionHeader(doc, "2. Known and Foreseeable Risks (Art. 9(2)(a))", y);
  y = addWrappedText(
    doc,
    "Article 9(2)(a) requires identification of known and foreseeable risks the high-risk AI system may pose to health, safety, or fundamental rights. The following categories must be assessed for each system:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const riskCategories = [
    "Risks to health and physical safety of natural persons",
    "Risks to fundamental rights (non-discrimination, privacy, dignity)",
    "Risks arising from the intended purpose and reasonably foreseeable misuse",
    "Risks from interaction with other AI systems or software",
    "Risks from data quality issues, gaps, or biases in training data",
    "Risks from human oversight failures or override gaps",
    "Cybersecurity risks affecting system integrity or output manipulation",
  ];

  let cbCount = 0;
  riskCategories.forEach((cat) => {
    y = addFormCheckbox(doc, "rms_risk_" + cbCount, cat, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 3: Risk estimation and evaluation (Art. 9(2)(b))
  y = addSectionHeader(doc, "3. Risk Estimation and Evaluation (Art. 9(2)(b))", y);
  y = addWrappedText(
    doc,
    "For each identified risk, estimate the probability of occurrence and the severity of impact. Art. 9(2)(b) requires evaluation based on the intended purpose and the state of the art. Rate: HIGH / MEDIUM / LOW.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, sIdx) => {
    y = addWrappedText(doc, `System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    riskCategories.forEach((cat, cIdx) => {
      if (y > 270) { doc.addPage(); y = MARGIN; }
      y = addWrappedText(
        doc,
        `  [ ] HIGH  [ ] MED  [ ] LOW  —  ${cat}`,
        MARGIN,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
      y += LINE_HEIGHT;
      void (sIdx + cIdx);
    });
    y += LINE_HEIGHT;
  });

  // Section 4: Risk management measures (Art. 9(2)(c))
  y = addSectionHeader(doc, "4. Risk Management Measures (Art. 9(2)(c))", y);
  const measures = [
    "Elimination or reduction of risks through design and development choices",
    "Adequate mitigation and control measures for residual risks that cannot be eliminated",
    "Provision of information as required by Art. 13 (transparency/instructions for use)",
    "Human oversight measures as required by Art. 14",
    "Testing procedures to evaluate effectiveness of risk management measures",
  ];
  measures.forEach((m, idx) => {
    y = addFormCheckbox(doc, "rms_measure_" + idx, m, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Testing (Art. 9(5))
  y = addSectionHeader(doc, "5. Testing Procedures (Art. 9(5))", y);
  y = addWrappedText(
    doc,
    "Article 9(5) requires testing of high-risk AI systems to identify and address risks prior to market placement and throughout the lifecycle. Document the testing schedule and responsible parties below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "rms_test_schedule", "Testing schedule:", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "rms_test_responsible", "Responsible party:", y, { width: 100 });
  y = addWrappedText(
    doc,
    `Current review frequency: ${REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 6: Residual risks (Art. 9(2)(d))
  y = addSectionHeader(doc, "6. Residual Risks and User Information (Art. 9(2)(d))", y);
  y = addWrappedText(
    doc,
    "Any residual risks identified after measures are applied must be disclosed to deployers and users in the Instructions for Use (Art. 13). Document residual risks below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "rms_residual", "Identified residual risks:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "7. Sign-off", y);
  y = addFormTextField(doc, "rms_name", "Completed by:", y, { width: 100 });
  y = addFormTextField(doc, "rms_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "rms_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
