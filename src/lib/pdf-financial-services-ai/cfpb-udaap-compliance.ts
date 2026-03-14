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
// DOCUMENT 7: CFPB UDAAP Compliance Documentation
// 12 U.S.C. § 5531 (CFPA) — Unfair, Deceptive, or Abusive
// Acts or Practices (UDAAP) as applied to AI in financial services
// ============================================================
export function generateCFPBUDAAPCompliance(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "CFPB UDAAP Compliance Documentation \u2014 AI Systems", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports ${data.company.name}\u2019s compliance with the Consumer Financial Protection Act of 2010 (CFPA) prohibition on unfair, deceptive, or abusive acts or practices (UDAAP) (12 U.S.C. \u00A7 5531) as applied to AI systems used in financial services. The CFPB has broad authority to bring UDAAP enforcement actions and has stated that AI-driven financial decisions are subject to the same UDAAP standards as human-driven decisions. Discriminatory AI outputs may constitute UDAAP violations independent of ECOA. The CFPB\u2019s March 2023 Circular addressed AI in credit decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: UDAAP Standards Overview
  y = addSectionHeader(doc, "1. UDAAP Standards as Applied to AI Systems", y);
  y = addWrappedText(
    doc,
    "An act or practice is UNFAIR if it: (1) causes or is likely to cause substantial injury to consumers; (2) the injury is not reasonably avoidable; and (3) the injury is not outweighed by countervailing benefits. (12 U.S.C. \u00A7 5531(c))",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "An act or practice is DECEPTIVE if: (1) a representation, omission, or practice is likely to mislead consumers; (2) consumers are acting reasonably; and (3) the representation is material.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "An act or practice is ABUSIVE if it: (1) materially interferes with the ability of consumers to understand a product or service; or (2) takes unreasonable advantage of consumers\u2019 lack of understanding, inability to protect their interests, or reasonable reliance on a covered person. (12 U.S.C. \u00A7 5531(d))",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: AI-Specific UDAAP Risk Assessment
  y = addSectionHeader(doc, "2. AI-Specific UDAAP Risk Assessment", y);
  y = addWrappedText(
    doc,
    "For each AI system, evaluate the following UDAAP risk factors:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `AI System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `Financial decisions: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y += 4;
    y = addFormTextField(doc, `udaap_${idx}_unfair_risk`, "Unfair practice risk (describe potential consumer harm):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `udaap_${idx}_deceptive_risk`, "Deceptive practice risk (describe potential misleading outputs or omissions):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `udaap_${idx}_abusive_risk`, "Abusive practice risk (describe potential for taking advantage of consumer vulnerability):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `udaap_${idx}_controls`, "Mitigating controls in place:", y, { multiline: true, lines: 2 });
    y += 6;
  });

  // Section 3: Discriminatory AI and UDAAP
  y = addSectionHeader(doc, "3. Discriminatory AI Outputs and UDAAP", y);
  y = addWrappedText(
    doc,
    "The CFPB has stated that AI outputs that produce discriminatory results on the basis of protected characteristics may constitute UDAAP violations even where ECOA does not independently apply (e.g., in non-credit contexts). Document your assessment of discriminatory AI risk below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const discItems = [
    "AI system outputs tested for disparate impact on race, color, religion, national origin, sex, marital status, age, or familial status",
    "Disparate impact testing methodology documented (statistical tests, thresholds, sample size)",
    "Disparate impact testing results reviewed by compliance officer or legal counsel",
    "AI system does not use proxy variables that substitute for protected characteristics",
    "Fair lending analysis conducted for any AI system used in credit marketing, pricing, or underwriting",
    "AI system\u2019s training data assessed for historical bias that may produce discriminatory outputs",
    "Bias remediation plan in place if disparate impact testing identifies adverse impact",
    "Disparate impact monitoring conducted at regular intervals and after model retraining",
  ];
  let cbIdx = 0;
  discItems.forEach((item) => {
    y = addFormCheckbox(doc, `disc_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 4: Consumer Disclosure Requirements
  y = addSectionHeader(doc, "4. Consumer Disclosure Requirements for AI Financial Services", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: Consumers should be informed when AI systems play a material role in financial decisions affecting them. Failure to disclose AI use may constitute a deceptive practice if consumers would reasonably expect a human decision-maker.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const disclosureItems = [
    "Consumer-facing materials accurately describe the role of AI in financial decisions",
    "AI system is not described as human decision-making in consumer-facing communications",
    "Limitations of AI system are not concealed from consumers in a material way",
    "Consumers are not prevented from understanding how AI decisions affect them",
    "AI-generated communications disclose AI assistance where FINRA Rule 2210 or other requirements apply",
    "AI-generated financial recommendations do not use pressure tactics or exploit consumer urgency",
  ];
  disclosureItems.forEach((item) => {
    y = addFormCheckbox(doc, `disc2_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 5: UDAAP Compliance Program for AI
  y = addSectionHeader(doc, "5. UDAAP Compliance Program for AI Systems", y);
  const programItems = [
    "UDAAP risk assessment conducted for all AI systems used in consumer-facing financial services",
    "UDAAP training provided to personnel responsible for AI system deployment and oversight",
    "Consumer complaints reviewed for patterns indicating potential AI-driven UDAAP issues",
    "Consumer complaint data analyzed for AI-specific complaint categories (unexplained denials, unexpected outcomes)",
    "Mystery shopping or testing conducted for AI-driven consumer interactions at least annually",
    "Compliance management system updated to address AI-specific UDAAP risks",
    "Board or senior management briefed on AI UDAAP risks and compliance program",
    "Legal counsel engaged for UDAAP compliance review of new AI deployments",
  ];
  programItems.forEach((item) => {
    y = addFormCheckbox(doc, `prog_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 6: Enforcement Risk Awareness
  y = addSectionHeader(doc, "6. CFPB Enforcement Risk Awareness", y);
  y = addWrappedText(
    doc,
    "CFPB UDAAP enforcement authority: Civil money penalties up to $5,000 per day for violations; $25,000 per day for reckless violations; $1,000,000 per day for knowing violations (12 U.S.C. \u00A7 5565(a)(2)). Restitution, disgorgement, and injunctive relief also available. State attorneys general may enforce CFPA independently. No private right of action under CFPA.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "UDAAP Assessment Sign-Off", y);
  y = addFormTextField(doc, "udaap_officer", "Chief Compliance Officer:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "udaap_date", "Assessment Date:", y);
  y = addFormTextField(doc, "udaap_next_review", "Next Annual Review Date:", y);
  y = addFormTextField(doc, "udaap_counsel", "Legal Counsel Review (Name/Firm):", y);

  addDisclaimer(doc);
  return doc;
}
