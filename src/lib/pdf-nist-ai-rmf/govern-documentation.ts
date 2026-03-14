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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: GOVERN Function Documentation (NIST AI RMF 1.0, AI 100-1)
// ============================================================
export function generateGovernDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF \u2014 GOVERN Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document captures ${data.company.name}'s documentation for the GOVERN function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The GOVERN function cultivates and implements organizational practices that address AI risk. The NIST AI RMF is a voluntary framework; it is not a regulation. However, it is referenced as a compliance standard by Colorado SB24-205 and Texas HB 149 (effective January 1, 2026). Verify the current version at airc.nist.gov before relying on this document.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // GOVERN 1
  y = addSectionHeader(doc, "GOVERN 1: Organizational AI Risk Policies and Procedures", y);
  y = addWrappedText(
    doc,
    "GOVERN 1 addresses whether organizational policies, processes, procedures, and practices for managing AI risks are in place, transparent, and implemented effectively.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const gov1Items = [
    "AI risk management policy formally adopted and documented",
    "AI risk management policy aligned with organizational risk appetite",
    "AI risk management policy reviewed and updated at least annually",
    "Roles and responsibilities for AI risk management clearly defined",
    "AI risk management integrated into enterprise risk management program",
    "AI risk management policies communicated to all relevant personnel",
    "Accountability structures for AI outcomes documented",
    "Legal, compliance, and procurement teams involved in AI risk governance",
  ];
  let cbIdx = 0;
  gov1Items.forEach((item) => { y = addFormCheckbox(doc, `gov1_${cbIdx++}`, item, y); });
  y = addFormTextField(doc, "gov1_policy_owner", "AI Risk Policy Owner:", y, { width: 120 });
  y = addFormTextField(doc, "gov1_policy_date", "Policy Effective Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // GOVERN 2
  y = addSectionHeader(doc, "GOVERN 2: Accountability and AI Risk Culture", y);
  const gov2Items = [
    "Senior leadership visibly supports and champions AI risk management",
    "AI risk ownership assigned at appropriate level for each AI system",
    "Personnel feel empowered to raise AI risk concerns without fear of retaliation",
    "AI risk decisions documented with clear rationale",
    "Performance incentives do not conflict with responsible AI practices",
    "AI-related decisions and trade-offs transparent within the organization",
  ];
  gov2Items.forEach((item) => { y = addFormCheckbox(doc, `gov2_${cbIdx++}`, item, y); });
  y = addFormTextField(doc, "gov2_culture_owner", "AI Culture/Ethics Lead:", y, { width: 120 });
  y += LINE_HEIGHT;

  // GOVERN 3
  y = addSectionHeader(doc, "GOVERN 3: AI Risk Workforce Competency and Training", y);
  const gov3Items = [
    "AI risk management competency requirements defined for relevant roles",
    "Training program for AI risk management established and delivered",
    "Personnel involved in AI development, deployment, and oversight trained on NIST AI RMF",
    "Training covers technical AI risks (model failure, drift, bias) and organizational risks",
    "Training records maintained",
    "Training updated when significant changes occur in AI portfolio or external guidance",
    "External expertise engaged where internal competency gaps exist",
  ];
  gov3Items.forEach((item) => { y = addFormCheckbox(doc, `gov3_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // GOVERN 4
  y = addSectionHeader(doc, "GOVERN 4: Organizational Teams and External Stakeholder Engagement", y);
  const gov4Items = [
    "Cross-functional AI risk teams established (legal, technical, business, ethics)",
    "External stakeholders (including potentially affected communities) considered in AI risk process",
    "Mechanisms established for external input on AI system design and deployment",
    "AI vendor management includes risk assessment and monitoring",
    "Feedback from AI system users and affected communities incorporated into AI risk management",
    "Stakeholder engagement documentation maintained",
  ];
  gov4Items.forEach((item) => { y = addFormCheckbox(doc, `gov4_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // GOVERN 5 — Seven Trustworthy AI Characteristics
  y = addSectionHeader(doc, "GOVERN 5: Policies for NIST AI Trustworthiness Characteristics", y);
  y = addWrappedText(
    doc,
    "NIST AI 100-1 identifies seven trustworthy AI characteristics. Document policies for each:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const trustworthyChar = [
    { label: "Valid and Reliable", detail: "Policy for validating AI system accuracy and reliability before deployment and monitoring ongoing performance." },
    { label: "Safe", detail: "Policy addressing AI system safety risks including failure modes, unexpected outputs, and human oversight requirements." },
    { label: "Secure and Resilient", detail: "Policy for cybersecurity controls for AI systems and resilience against adversarial attacks and failures." },
    { label: "Accountable and Transparent", detail: "Policy requiring documentation of AI system decisions and the ability to explain AI outputs to affected individuals." },
    { label: "Explainable and Interpretable", detail: "Policy addressing when and how AI system logic is explained to users, operators, and affected individuals." },
    { label: "Privacy-Enhanced", detail: "Policy for privacy risk management throughout AI lifecycle, including training data and inference-time privacy." },
    { label: "Fair (Bias Managed)", detail: "Policy addressing algorithmic fairness, bias testing, and mitigation across all stages of AI lifecycle." },
  ];
  trustworthyChar.forEach((char, idx) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `5.${idx + 1}  ${char.label}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, char.detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, `trust_${idx}_policy`, "Policy Reference:", y, { width: 100 });
    y = addFormTextField(doc, `trust_${idx}_status`, "Status (Adopted / In Development / Not Yet Addressed):", y, { width: 120 });
    y += 4;
  });

  // GOVERN 6
  y = addSectionHeader(doc, "GOVERN 6: AI Supply Chain Risk Management Policies", y);
  const gov6Items = [
    "AI vendor risk assessment process documented",
    "Contractual requirements for AI vendors addressing risk, security, and accountability established",
    "AI components from third-party suppliers assessed for risk",
    "Open-source AI components reviewed and documented",
    "Supply chain incidents affecting AI systems have defined response procedures",
  ];
  gov6Items.forEach((item) => { y = addFormCheckbox(doc, `gov6_${cbIdx++}`, item, y); });

  y += LINE_HEIGHT;
  y = addFormTextField(doc, "govern_completed_by", "GOVERN Function Lead:", y, { width: 120 });
  y = addFormTextField(doc, "govern_date", "Documentation Date:", y, { width: 60 });
  y = addFormTextField(doc, "govern_next_review", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
