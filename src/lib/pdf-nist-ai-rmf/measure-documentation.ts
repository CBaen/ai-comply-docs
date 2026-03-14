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
// DOCUMENT 3: MEASURE Function Documentation (NIST AI RMF 1.0, AI 100-1)
// ============================================================
export function generateMeasureDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF \u2014 MEASURE Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document captures ${data.company.name}'s documentation for the MEASURE function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The MEASURE function analyzes and assesses the risks identified in the MAP function using quantitative and qualitative measures.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // MEASURE 1: Testing, Evaluation, Verification, and Validation
  y = addSectionHeader(doc, "MEASURE 1: AI System Testing, Evaluation, Verification, and Validation (TEVV)", y);
  const meas1Items = [
    "TEVV plan documented for each AI system before deployment",
    "TEVV plan covers all seven NIST trustworthy AI characteristics",
    "Independent evaluation team or party involved in TEVV",
    "TEVV performed on representative test datasets reflecting deployment conditions",
    "TEVV results documented with pass/fail criteria defined in advance",
    "Adversarial testing (red-teaming) performed for high-risk AI systems",
    "TEVV repeated after material changes to AI system",
    "TEVV records retained for minimum 3 years",
  ];
  let cbIdx = 0;
  meas1Items.forEach((item) => { y = addFormCheckbox(doc, `meas1_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MEASURE 2: Performance Metrics
  y = addSectionHeader(doc, "MEASURE 2: AI Risk Measurement and Metrics", y);
  const metricCategories = [
    {
      title: "Performance and Accuracy",
      items: [
        "Accuracy, precision, recall, F1-score documented and tracked",
        "Performance thresholds defined and monitored",
        "Out-of-distribution performance monitored",
        "Confidence calibration measured (model confidence vs. actual accuracy)",
      ],
    },
    {
      title: "Bias and Fairness Metrics",
      items: [
        "Demographic parity measured across relevant subgroups",
        "Equalized odds or equal opportunity metrics applied where appropriate",
        "Disparate impact ratio calculated (EEOC four-fifths rule applied where applicable)",
        "Intersectional fairness analysis performed for highest-risk systems",
      ],
    },
    {
      title: "Security and Robustness Metrics",
      items: [
        "Adversarial robustness testing results documented",
        "Data poisoning resistance tested for systems trained on external data",
        "Model extraction/inversion risk assessed",
        "Availability and uptime metrics tracked for critical AI systems",
      ],
    },
    {
      title: "Transparency and Explainability Metrics",
      items: [
        "Explainability coverage: percentage of AI decisions where explanation is available",
        "User comprehension testing of AI explanations conducted",
        "Audit trail completeness measured",
      ],
    },
  ];

  metricCategories.forEach((cat) => {
    y = addSectionHeader(doc, cat.title, y);
    cat.items.forEach((item) => { y = addFormCheckbox(doc, `meas2_${cbIdx++}`, item, y); });
    y += 4;
  });

  // MEASURE 2.2: Thresholds
  y = addSectionHeader(doc, "MEASURE 2.2: Metric Thresholds and Escalation Triggers", y);
  const freq = REVIEW_LABELS[data.oversight.reviewFrequency] || "quarterly";
  y = addWrappedText(
    doc,
    `Thresholds are reviewed ${freq.toLowerCase()}. Document baselines and escalation triggers for each AI system:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys, idx) => {
    if (y > 250) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `thresh_${idx}_accuracy`, "Minimum Acceptable Accuracy Threshold:", y, { width: 80 });
    y = addFormTextField(doc, `thresh_${idx}_bias`, "Maximum Acceptable Disparate Impact Ratio:", y, { width: 80 });
    y = addFormTextField(doc, `thresh_${idx}_trigger`, "Escalation Trigger:", y, { multiline: true, lines: 2 });
    y += 4;
  });

  // MEASURE 3: External Evaluation
  y = addSectionHeader(doc, "MEASURE 3: External Expert Evaluation", y);
  const meas3Items = [
    "External AI risk assessment or audit performed within prior 12 months",
    "Third-party bias audit results available and addressed",
    "External red-team or penetration testing results for high-risk AI systems",
    "Industry benchmark comparisons performed",
    "External expert review findings documented and tracked to resolution",
  ];
  meas3Items.forEach((item) => { y = addFormCheckbox(doc, `meas3_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MEASURE 4: Ongoing Monitoring
  y = addSectionHeader(doc, "MEASURE 4: Ongoing Monitoring and Feedback Loops", y);
  const meas4Items = [
    "Monitoring plan established for each deployed AI system",
    `Monitoring frequency: ${freq.toLowerCase()}`,
    "Model drift detection implemented (input distribution drift, output drift)",
    "Performance degradation alerts configured",
    "Human feedback mechanisms collect quality data on AI outputs",
    "User complaints and error reports tracked and analyzed",
    "Monitoring results reported to AI risk governance team",
    "Monitoring results trigger re-evaluation when thresholds breached",
  ];
  meas4Items.forEach((item) => { y = addFormCheckbox(doc, `meas4_${cbIdx++}`, item, y); });

  y += LINE_HEIGHT;
  y = addFormTextField(doc, "measure_completed_by", "MEASURE Function Lead:", y, { width: 120 });
  y = addFormTextField(doc, "measure_date", "Documentation Date:", y, { width: 60 });
  y = addFormTextField(doc, "measure_next_review", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
