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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Map Function Documentation
// NIST AI RMF 1.0 — MAP Core Function
// ============================================================
export function generateMapDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF: Map Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document implements the MAP function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1) for ${data.company.name}. The MAP function establishes context for AI risk assessment, enabling risks related to context, capabilities, and impacts to be identified. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `MAP: ${sys.name}`, y);

    y = addWrappedText(
      doc,
      "MAP-1.1 \u2014 Context Establishment:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `map_${idx}_context_purpose`,
      "  Intended purpose / use context:",
      y,
      {
        prefill: sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", "),
        readOnly: false,
      }
    );
    y = addFormTextField(
      doc,
      `map_${idx}_context_users`,
      "  Intended users and affected parties:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "MAP-2.1 \u2014 AI Risk and Benefit Identification:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const riskTypes = [
      "Accuracy / performance risks (incorrect outputs affecting decisions)",
      "Bias and fairness risks (disparate impact on demographic groups)",
      "Privacy risks (unauthorized disclosure of personal data)",
      "Security risks (adversarial attacks or model manipulation)",
      "Safety risks (harm to physical or psychological well-being)",
      "Transparency risks (opacity in how outputs are generated)",
      "Accountability risks (unclear responsibility for AI decisions)",
    ];
    riskTypes.forEach((risk, ridx) => {
      y = addFormCheckbox(doc, `map_${idx}_risk_${ridx}`, risk, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "MAP-2.2 \u2014 Data and Model Provenance:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `map_${idx}_data_inputs`,
      "  Input data categories:",
      y,
      {
        prefill: data.dataInputs
          .map((d) => DATA_INPUT_LABELS[d] || d)
          .join(", "),
        readOnly: false,
      }
    );
    y = addFormTextField(
      doc,
      `map_${idx}_data_provenance`,
      "  Data provenance (source, collection method, known limitations):",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "MAP-3.5 \u2014 Stakeholder Impact Assessment:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `map_${idx}_stakeholders`,
      "  Affected stakeholders and anticipated impacts:",
      y,
      { multiline: true, lines: 2 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Map Function Sign-off", y);
  y = addFormTextField(doc, "map_owner", "Function Owner:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "map_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
