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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: ADMT Risk Assessment
// CCPA/CPRA Cal. Civ. Code § 1798.100 et seq. + CPPA ADMT Regulations (eff. 1-1-26)
// ============================================================
export function generateADMTRiskAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Risk Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This ADMT Risk Assessment is prepared for ${data.company.name} pursuant to the California Consumer Privacy Act/California Privacy Rights Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and California Privacy Protection Agency (CPPA) ADMT regulations (effective January 1, 2026). The CPPA regulations require businesses subject to the CCPA to conduct risk assessments before using ADMT that poses significant risk to consumers. Verify current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Business and ADMT Description
  y = addSectionHeader(doc, "1. Business and ADMT Description", y);
  y = addFormTextField(doc, "business_name", "Business Name:", y, { prefill: data.company.name, readOnly: true });
  y = addFormTextField(doc, "business_state", "State:", y, { prefill: data.company.state || "CA", width: 60 });
  y = addFormTextField(doc, "business_industry", "Industry:", y, { prefill: data.company.industry || "", width: 100 });
  y = addFormTextField(doc, "assessment_date", "Assessment Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `ADMT System ${idx + 1}: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, `  Vendor: ${sys.vendor || "Internal"}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.description) y = addWrappedText(doc, `  Purpose: ${sys.description}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `  Decision types: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y = addFormTextField(doc, `admt_${idx}_logic`, "Summary of ADMT logic (plain language):", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, `admt_${idx}_data`, "Personal information categories processed:", y, { multiline: true, lines: 2 });
    y += 4;
  });

  // Section 2: Applicability — Who Is Affected
  y = addSectionHeader(doc, "2. Applicability — California Consumers Affected", y);
  y = addWrappedText(
    doc,
    "Identify which categories of California consumers are subject to ADMT processing and the estimated number of consumers affected:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  // Map questionnaire decision keys to the consumer category labels
  const CONSUMER_CATEGORY_MAP: Record<string, string[]> = {
    "Employees or job applicants who are California residents": [
      "employment", "hiring", "recruitment", "promotion",
      "renewal", "training", "discharge", "discipline", "tenure", "terms",
    ],
    "Tenants or housing applicants who are California residents": ["housing"],
    "Individuals applying for financial services who are California residents": ["financial"],
    "Students or educational program applicants who are California residents": ["education"],
  };
  const allDecisionKeysRC = [
    ...new Set(data.aiSystems.flatMap((s) => s.decisions)),
  ];
  const consumerCategories = [
    "Employees or job applicants who are California residents",
    "Existing customers who are California residents",
    "Prospective customers who are California residents",
    "Tenants or housing applicants who are California residents",
    "Individuals applying for financial services who are California residents",
    "Students or educational program applicants who are California residents",
  ];
  let cbIdx = 0;
  consumerCategories.forEach((item) => {
    const mappedKeys = CONSUMER_CATEGORY_MAP[item] || [];
    const checked = mappedKeys.some((k) => allDecisionKeysRC.includes(k));
    y = addFormCheckbox(doc, `consumer_${cbIdx++}`, item, y, { checked });
  });
  y = addFormTextField(doc, "consumer_count", "Estimated number of CA consumers affected annually:", y, { width: 80 });
  y += LINE_HEIGHT;

  // Section 3: Benefits and Risks Assessment
  y = addSectionHeader(doc, "3. Benefits and Risks Assessment", y);
  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `benefit_${idx}`, "Business Benefits of Using ADMT:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `consumer_benefit_${idx}`, "Consumer Benefits of ADMT Use:", y, { multiline: true, lines: 2 });
    y += 4;

    const riskCategories = [
      { risk: "Accuracy and Reliability Risk", detail: "Risk that ADMT produces inaccurate or unreliable outputs that negatively affect consumers." },
      { risk: "Fairness and Discrimination Risk", detail: "Risk that ADMT produces discriminatory outcomes or disparate impact on protected classes." },
      { risk: "Transparency and Explainability Risk", detail: "Risk that consumers cannot understand why ADMT produced a particular decision affecting them." },
      { risk: "Data Security and Privacy Risk", detail: "Risk of unauthorized access to personal information processed by ADMT." },
      { risk: "Autonomy and Dignity Risk", detail: "Risk that ADMT removes meaningful human judgment from decisions that significantly affect consumers." },
    ];

    riskCategories.forEach((rc, rIdx) => {
      if (y > 248) { doc.addPage(); y = MARGIN; }
      doc.setFont("helvetica", "bold");
      y = addWrappedText(doc, rc.risk, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(doc, rc.detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
      y = addWrappedText(doc, "  Likelihood:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_likelihood_high`, "HIGH", y);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_likelihood_med`, "MED", y);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_likelihood_low`, "LOW", y);
      y = addWrappedText(doc, "  Impact:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_impact_high`, "HIGH", y);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_impact_med`, "MED", y);
      y = addFormCheckbox(doc, `risk_${idx}_${rIdx}_impact_low`, "LOW", y);
      y = addFormTextField(doc, `risk_${idx}_${rIdx}_mitigation`, "Mitigation:", y, { multiline: true, lines: 2 });
      y += 4;
    });
    y += LINE_HEIGHT;
  });

  // Section 4: Safeguards
  y = addSectionHeader(doc, "4. Safeguards and Controls", y);
  const safeguards = [
    "Pre-use notice provided to consumers before ADMT processing",
    "Consumer opt-out mechanism implemented and functional",
    "Human review available for ADMT-assisted decisions upon consumer request",
    "ADMT logic documentation maintained and available for consumer access requests",
    "Bias testing conducted on ADMT system outputs",
    "Access controls limit ADMT access to personal information to authorized purposes",
    "Vendor agreement addresses ADMT compliance obligations",
    "Regular monitoring of ADMT outputs for accuracy and fairness",
    "Employee training on ADMT use and consumer rights",
  ];
  safeguards.forEach((item) => { y = addFormCheckbox(doc, `safeguard_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // Section 5: Net Assessment and Decision
  y = addSectionHeader(doc, "5. Net Risk-Benefit Assessment and Approval Decision", y);
  y = addFormTextField(doc, "net_assessment", "Net Assessment (risks vs. benefits):", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "ra_decision", "Decision (Approve / Approve with Conditions / Do Not Proceed):", y, { width: 140 });
  y = addFormTextField(doc, "conditions", "Conditions (if any):", y, { multiline: true, lines: 3 });

  y = addFormTextField(doc, "ra_completed_by", "Assessment Completed by:", y, { width: 120 });
  y = addFormTextField(doc, "ra_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ra_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "ra_next_review", "Next Review Date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ca_risk", y);

  addDisclaimer(doc);
  return doc;
}
