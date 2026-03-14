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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Measure Function Documentation
// NIST AI RMF 1.0 — MEASURE Core Function
// ============================================================
export function generateMeasureDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF: Measure Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document implements the MEASURE function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1) for ${data.company.name}. The MEASURE function analyzes and assesses AI risks using quantitative, qualitative, or mixed-methods tools and methodologies. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `MEASURE: ${sys.name}`, y);

    y = addWrappedText(
      doc,
      "MEASURE-1.1 \u2014 Measurement Approach:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const measureApproaches = [
      "Quantitative metrics (accuracy rates, error rates, impact ratios)",
      "Qualitative assessments (red-teaming, expert review, user feedback)",
      "Bias and fairness testing by demographic group",
      "Performance benchmarking against stated requirements",
      "Explainability / interpretability evaluation",
    ];
    measureApproaches.forEach((approach, aidx) => {
      y = addFormCheckbox(
        doc,
        `meas_${idx}_approach_${aidx}`,
        approach,
        y
      );
    });
    y += 4;

    y = addWrappedText(
      doc,
      "MEASURE-2.1 \u2014 Performance Metrics:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_accuracy`,
      "  Current accuracy / performance metric:",
      y
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_error_rate`,
      "  Error rate and type of errors (false positives/negatives):",
      y
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_bias_metric`,
      "  Bias / fairness metric (e.g., adverse impact ratio, demographic parity):",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      `MEASURE-2.5 \u2014 Testing and Evaluation (Review Frequency: ${REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified"}):`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_test_schedule`,
      "  Testing schedule and last test date:",
      y
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_test_method`,
      "  Testing methodology:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "MEASURE-3.3 \u2014 Risk Metrics Tracked Over Time:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `meas_${idx}_trends`,
      "  Notable trends in performance or risk metrics:",
      y,
      { multiline: true, lines: 2 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Measure Function Sign-off", y);
  y = addFormTextField(doc, "measure_owner", "Function Owner:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "measure_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
