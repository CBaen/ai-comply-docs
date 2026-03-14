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
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  DECISION_LABELS,
  DATA_INPUT_LABELS,
  ROLE_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: AI System Risk Profile Template
// NIST AI RMF 1.0 — MAP + MEASURE Functions
// ============================================================
export function generateRiskProfileTemplate(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Risk Profile Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Risk Profile Template documents the characteristics and risk profile of each AI system operated by ${data.company.name}, in alignment with the NIST AI RMF MAP and MEASURE functions. A risk profile enables prioritization of risk management resources. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Risk Profile: ${sys.name}`, y);

    y = addFormTextField(doc, `rp_${idx}_date`, "Profile Date:", y, {
      prefill: data.generatedDate,
      readOnly: false,
    });
    y = addFormTextField(doc, `rp_${idx}_version`, "Profile Version:", y);
    y += 4;

    y = addWrappedText(
      doc,
      "System Characteristics:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `rp_${idx}_vendor`, "Vendor/Developer:", y, {
      prefill: sys.vendor || "Internal",
      readOnly: false,
    });
    y = addFormTextField(doc, `rp_${idx}_purpose`, "Intended Purpose:", y, {
      prefill: sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", "),
      readOnly: false,
    });
    y = addFormTextField(doc, `rp_${idx}_inputs`, "Primary Data Inputs:", y, {
      prefill: data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", "),
      readOnly: false,
    });
    y = addFormTextField(
      doc,
      `rp_${idx}_output_type`,
      "Output type (score / classification / recommendation / other):",
      y
    );
    y = addFormTextField(doc, `rp_${idx}_oversight`, "Oversight model:", y, {
      prefill: ROLE_LABELS[data.oversight.aiRole] || "Not specified",
      readOnly: false,
    });
    y += 4;

    y = addWrappedText(
      doc,
      "Risk Dimension Ratings (rate each: HIGH / MEDIUM / LOW / N/A):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const riskDimensions = [
      "Impact on individuals (severity of potential harm)",
      "Probability of harm (likelihood of adverse outcome)",
      "Reversibility (can harm be corrected?)",
      "Breadth (how many people affected?)",
      "Sensitivity of data processed",
      "Autonomy of decision (human review vs. fully automated)",
      "Maturity of technology (proven vs. experimental)",
    ];
    riskDimensions.forEach((dim, dimidx) => {
      y = addFormTextField(doc, `rp_${idx}_dim_${dimidx}`, `  ${dim}:`, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "Overall Risk Level (check one):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const riskLevels = [
      "CRITICAL \u2014 Immediate action required",
      "HIGH \u2014 Priority risk management required",
      "MEDIUM \u2014 Standard risk management",
      "LOW \u2014 Monitor periodically",
    ];
    riskLevels.forEach((level, levelidx) => {
      y = addFormCheckbox(doc, `rp_${idx}_level_${levelidx}`, level, y);
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Profile Approval", y);
  y = addFormTextField(doc, "rp_approved_by", "Approved By:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "rp_date", "Date:", y);
  y = addFormTextField(doc, "rp_next_review", "Next Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
