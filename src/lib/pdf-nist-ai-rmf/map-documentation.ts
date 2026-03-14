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
  BODY_SIZE,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: MAP Function Documentation (NIST AI RMF 1.0, AI 100-1)
// ============================================================
export function generateMapDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF \u2014 MAP Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document captures ${data.company.name}'s documentation for the MAP function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The MAP function establishes context and analyzes the benefits and risks of AI systems. It categorizes AI system risks and identifies potential negative impacts.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // MAP 1: AI System Context
  y = addSectionHeader(doc, "MAP 1: AI System Context Categorization", y);
  y = addWrappedText(
    doc,
    "MAP 1 addresses the context in which AI systems are deployed, the intended use cases, and the potential impacts on individuals and society.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE);
    y = addWrappedText(doc, `AI System ${idx + 1}: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, `Vendor/Developer: ${sys.vendor || "Internal"}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.description) y = addWrappedText(doc, `Purpose: ${sys.description}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `Decisions influenced: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y = addFormTextField(doc, `map1_${idx}_context`, "Deployment Context (who uses it, in what environment):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `map1_${idx}_affected`, "Potentially Affected Individuals/Communities:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `map1_${idx}_risk_tier`, "NIST AI RMF Risk Tier (1-Critical, 2-High, 3-Medium, 4-Low):", y, { width: 80 });
    y += 6;
  });

  // MAP 2: Intended Use and Misuse
  y = addSectionHeader(doc, "MAP 2: Intended and Unintended Uses, Misuse Scenarios", y);
  const map2Items = [
    "Intended uses clearly documented for each AI system",
    "Known limitations of each AI system documented",
    "Foreseeable unintended uses or misuse scenarios identified",
    "Out-of-distribution inputs and failure modes assessed",
    "Human-AI interaction failure modes assessed",
    "Dual use and potential harms from misuse analyzed",
    "Boundaries of intended deployment context defined",
  ];
  let cbIdx = 0;
  map2Items.forEach((item) => { y = addFormCheckbox(doc, `map2_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MAP 3: Scientific Validity and Bias
  y = addSectionHeader(doc, "MAP 3: Scientific Validity, Data Quality, and Bias Assessment", y);
  const map3Items = [
    "Scientific basis for AI approach documented and peer-reviewed where applicable",
    "Training data quality assessed for completeness, accuracy, and representativeness",
    "Training data geographic and demographic coverage documented",
    "Potential sources of bias in training data identified and documented",
    "Bias testing performed across relevant demographic groups",
    "Bias testing methodology documented (statistical tests used, thresholds applied)",
    "Historical bias embedded in training data assessed",
    "Proxy discrimination risks identified and documented",
    "Data annotation quality and consistency assessed",
  ];
  map3Items.forEach((item) => { y = addFormCheckbox(doc, `map3_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MAP 4: Risks and Benefits Assessment
  y = addSectionHeader(doc, "MAP 4: AI Risk and Benefit Assessment", y);
  y = addWrappedText(
    doc,
    "MAP 4 addresses the prioritization of risks and benefits of AI systems. For each AI system, document the risk-benefit analysis:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `AI System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `map4_${idx}_benefits`, "Identified Benefits:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `map4_${idx}_risks`, "Identified Risks (technical, organizational, societal):", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, `map4_${idx}_net`, "Net Risk-Benefit Assessment:", y, { multiline: true, lines: 2 });
    y += 6;
  });

  // MAP 5: Organizational Risk Tolerance
  y = addSectionHeader(doc, "MAP 5: Organizational Risk Tolerance and Risk Prioritization", y);
  const map5Items = [
    "Organization's AI risk tolerance documented and approved by leadership",
    "Risk prioritization criteria established (likelihood, severity, reversibility, breadth of harm)",
    "Residual risk thresholds defined for each AI system risk tier",
    "Decision-making process for accepting, mitigating, or avoiding AI risks documented",
    "Escalation procedures for risks exceeding risk tolerance defined",
  ];
  map5Items.forEach((item) => { y = addFormCheckbox(doc, `map5_${cbIdx++}`, item, y); });
  y = addFormTextField(doc, "map5_risk_tolerance", "Risk Tolerance Statement:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "map_completed_by", "MAP Function Lead:", y, { width: 120 });
  y = addFormTextField(doc, "map_date", "Documentation Date:", y, { width: 60 });
  y = addFormTextField(doc, "map_next_review", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
