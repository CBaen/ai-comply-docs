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
// DOCUMENT 6: NIST AI RMF Compliance Checklist
// ============================================================
export function generateNISTComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify ${data.company.name}'s implementation of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The NIST AI RMF is a voluntary framework — it is not a regulation. However, Colorado SB24-205 and Texas HB 149 (effective January 1, 2026) reference NIST AI RMF as a compliance standard. Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "GOVERN Function — Organizational AI Risk Governance",
      items: [
        "AI risk management policy formally adopted and communicated (GOVERN 1)",
        "Roles and responsibilities for AI risk management clearly defined (GOVERN 1)",
        "Senior leadership accountability for AI risk established (GOVERN 2)",
        "Personnel trained on AI risk management (GOVERN 3)",
        "Cross-functional AI risk teams established (GOVERN 4)",
        "Policies for each of the 7 NIST trustworthy AI characteristics documented (GOVERN 5)",
        "AI vendor/supply chain risk management policies in place (GOVERN 6)",
        "AI risk governance reviewed and updated annually",
      ],
    },
    {
      title: "MAP Function \u2014 AI Risk Context and Identification",
      items: [
        "All AI systems inventoried with deployment context documented (MAP 1)",
        "Intended and foreseeable unintended uses documented for each AI system (MAP 2)",
        "Training data quality, bias, and representativeness assessed (MAP 3)",
        "Risk-benefit assessment completed for each AI system (MAP 4)",
        "Organizational AI risk tolerance documented and approved (MAP 5)",
        "Potentially affected individuals and communities identified",
        "Regulatory requirements applicable to each AI system identified",
      ],
    },
    {
      title: "MEASURE Function \u2014 AI Risk Evaluation",
      items: [
        "TEVV plan completed for each AI system before deployment (MEASURE 1)",
        "Performance metrics documented and thresholds defined (MEASURE 2)",
        "Bias and fairness metrics measured across relevant demographic groups (MEASURE 2)",
        "Security and robustness testing completed (MEASURE 2)",
        "External evaluation or third-party audit completed (MEASURE 3)",
        "Ongoing monitoring plan active for each deployed AI system (MEASURE 4)",
        "Model drift monitoring implemented (MEASURE 4)",
        "Monitoring results reported to governance team",
      ],
    },
    {
      title: "MANAGE Function \u2014 AI Risk Response",
      items: [
        "Risk treatment plans documented for all identified AI risks (MANAGE 1)",
        "AI incident response plan documented and tested (MANAGE 2)",
        "AI incident log maintained (MANAGE 2)",
        "Residual risk communicated to leadership at defined intervals (MANAGE 3)",
        "Risk register maintained with current status (MANAGE 3)",
        "Risk control effectiveness evaluated at defined intervals (MANAGE 4)",
        "Lessons learned from AI incidents feed back into MAP and GOVERN functions",
      ],
    },
    {
      title: "Trustworthy AI Characteristics \u2014 Organizational Posture",
      items: [
        "Valid and Reliable: AI system validation documented and ongoing",
        "Safe: AI system safety risks and failure modes assessed",
        "Secure and Resilient: AI systems covered by cybersecurity program",
        "Accountable and Transparent: AI decisions documented and traceable",
        "Explainable and Interpretable: AI outputs can be explained to affected individuals",
        "Privacy-Enhanced: Privacy risk management applied throughout AI lifecycle",
        "Fair (Bias Managed): Bias testing conducted and disparate impact minimized",
      ],
    },
    {
      title: "Regulatory Alignment",
      items: [
        "Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20136-1-1707, eff. June 30, 2026) NIST RMF alignment reviewed if applicable",
        "Texas HB 149 (Tex. Bus. & Com. Code Ch. 551\u2013554, eff. January 1, 2026) NIST RMF alignment reviewed if applicable",
        "Framework version confirmed as current (verify at airc.nist.gov)",
        "Legal counsel reviewed NIST RMF implementation for applicable regulatory compliance",
      ],
    },
  ];

  let cbCount = 0;
  sections.forEach((section) => {
    y = addSectionHeader(doc, section.title, y);
    section.items.forEach((item) => {
      y = addFormCheckbox(doc, "cl_" + cbCount, item, y);
      cbCount++;
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "checklist_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  addDisclaimer(doc);
  return doc;
}
