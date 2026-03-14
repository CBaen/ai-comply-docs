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
  BODY_SIZE,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Model Risk Documentation
// Aligned with SR 11-7 / OCC 2011-12 Model Risk Management Guidance
// and FINRA RN 24-09
// ============================================================
export function generateModelRiskDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Model Risk Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document provides model risk documentation for ${data.company.name}'s AI systems used in financial services activities. Financial institutions and broker-dealers are expected to maintain model risk management practices aligned with SR 11-7 / OCC 2011-12 (Supervisory Guidance on Model Risk Management) and FINRA Regulatory Notice 24-09. This documentation supports FINRA Rule 3110 supervisory obligations, ECOA/Regulation B compliance, and FCRA compliance for AI models used in credit decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // For each AI system
  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE + 1);
    y = addWrappedText(doc, `AI Model ${idx + 1}: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    y += 4;

    // Model Identification
    y = addSectionHeader(doc, `Model ${idx + 1}.1: Model Identification and Purpose`, y);
    y = addFormTextField(doc, `model_${idx}_vendor`, "Vendor/Developer:", y, { prefill: sys.vendor || "Internal", width: 140 });
    y = addFormTextField(doc, `model_${idx}_version`, "Model Version/Release:", y, { width: 80 });
    y = addFormTextField(doc, `model_${idx}_type`, "Model Type (e.g., LLM, classification, regression, ensemble):", y, { width: 140 });
    y = addFormTextField(doc, `model_${idx}_purpose`, "Business Purpose:", y, { prefill: sys.description || "", multiline: true, lines: 2 });
    y = addWrappedText(
      doc,
      `Financial decisions influenced: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ") || "Not specified"}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += LINE_HEIGHT;

    // Model Development Documentation
    y = addSectionHeader(doc, `Model ${idx + 1}.2: Development Documentation (SR 11-7 Section II.A)`, y);
    const devItems = [
      "Model conceptual soundness documented (theoretical basis for model approach)",
      "Training data sources identified and documented",
      "Training data quality assessed (completeness, accuracy, representativeness)",
      "Training data date range and coverage documented",
      "Model assumptions and limitations documented",
      "Model performance metrics documented (accuracy, precision, recall, AUC, etc.)",
      "Out-of-time validation performed to assess model stability",
      "Disparate impact testing performed across protected classes (ECOA compliance)",
      "Disparate impact testing results documented with statistical methodology",
    ];
    let cbIdx = idx * 100;
    devItems.forEach((item) => {
      y = addFormCheckbox(doc, `dev_${cbIdx}`, item, y);
      cbIdx++;
    });
    y += LINE_HEIGHT;

    // Model Validation
    y = addSectionHeader(doc, `Model ${idx + 1}.3: Independent Validation (SR 11-7 Section II.B)`, y);
    y = addFormTextField(doc, `model_${idx}_validator`, "Independent Validator (name/role):", y, { width: 120 });
    y = addFormTextField(doc, `model_${idx}_val_date`, "Validation Date:", y, { width: 60 });
    y = addFormTextField(doc, `model_${idx}_next_val`, "Next Validation Date:", y, { width: 60 });
    const valItems = [
      "Validation conducted by personnel independent from model development team",
      "Conceptual soundness of model design evaluated",
      "Model assumptions challenged and tested",
      "Outcome analysis performed: predicted vs. actual results compared",
      "Benchmarking against alternative model approaches completed",
      "Adverse impact analysis reviewed by validator",
      "Validation findings documented; model owner responded to findings",
    ];
    valItems.forEach((item) => {
      y = addFormCheckbox(doc, `val_${cbIdx}`, item, y);
      cbIdx++;
    });
    y += LINE_HEIGHT;

    // Ongoing Monitoring
    y = addSectionHeader(doc, `Model ${idx + 1}.4: Ongoing Monitoring (SR 11-7 Section II.C)`, y);
    const monItems = [
      "Model performance monitored at regular intervals against established thresholds",
      "Population stability index (PSI) or equivalent metric tracked for input drift",
      "Outcome rates monitored for adverse impact changes over time",
      "Model owner designated for ongoing monitoring responsibility",
      "Escalation procedures in place when model performance degrades",
      "Model retirement/replacement triggers defined",
    ];
    monItems.forEach((item) => {
      y = addFormCheckbox(doc, `mon_${cbIdx}`, item, y);
      cbIdx++;
    });
    y += LINE_HEIGHT;

    // Regulatory Compliance Assessment
    y = addSectionHeader(doc, `Model ${idx + 1}.5: Regulatory Compliance Assessment`, y);
    const regItems = [
      "ECOA/Regulation B compliance: specific adverse action reasons producible (12 CFR \u00A7 1002.9)",
      "ECOA/Regulation B compliance: model does not use prohibited basis characteristics (12 CFR \u00A7 1002.4)",
      "ECOA/Regulation B compliance: disparate impact testing conducted and documented",
      "FCRA compliance: if consumer reports used, adverse action notice procedures in place (15 U.S.C. \u00A7 1681m)",
      "FINRA Rule 3110: model supervised under written supervisory procedures",
      "Regulation BI: if applicable, model supports best interest obligation documentation",
    ];
    regItems.forEach((item) => {
      y = addFormCheckbox(doc, `reg_${cbIdx}`, item, y);
      cbIdx++;
    });
    y += LINE_HEIGHT * 2;
  });

  // Section: Inventory Summary
  y = addSectionHeader(doc, "Model Inventory Summary", y);
  y = addWrappedText(
    doc,
    `Total AI models documented: ${data.aiSystems.length}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "inventory_owner", "Model Risk Manager:", y, { width: 120 });
  y = addFormTextField(doc, "inventory_date", "Inventory Date:", y, { width: 60 });
  y = addFormTextField(doc, "inventory_next_review", "Next Annual Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
