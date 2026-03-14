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
// DOCUMENT 4: Customer AI Disclosure — Financial Services
// FINRA Rule 2210 + ECOA/Reg B + FINRA RN 24-09
// ============================================================
export function generateCustomerDisclosure(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Customer AI Use Disclosure — Financial Services", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This disclosure informs customers of ${data.company.name} about the use of artificial intelligence in financial services activities that may affect them. Financial services firms using AI in customer-facing activities must ensure communications are fair, balanced, and not misleading under FINRA Rule 2210. This disclosure template supports compliance with FINRA Rule 2210, ECOA/Regulation B, and FINRA Regulatory Notice 24-09.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: AI Tools Used
  y = addSectionHeader(doc, `1. Artificial Intelligence Tools Used by ${data.company.name}`, y);
  y = addWrappedText(
    doc,
    `${data.company.name} uses the following artificial intelligence tools in connection with your account and services:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `${idx + 1}. ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, `  Provider: ${sys.vendor || "Internal system"}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.description) {
      y = addWrappedText(doc, `  Purpose: ${sys.description}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    }
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `  Financial decisions where AI is used: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y += 4;
  });

  // Section 2: How AI Affects Customers
  y = addSectionHeader(doc, "2. How AI May Affect Your Financial Services Experience", y);
  y = addWrappedText(
    doc,
    "AI tools may be used in the following ways that could affect you as a customer. Where AI plays a role in a significant decision, you will be informed as described below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const usageScenarios = [
    {
      title: "Credit and Lending Decisions",
      detail: "If AI is used in making or contributing to a credit decision that is adverse to you (denial, less favorable terms), you will receive an adverse action notice stating the specific reasons for the decision, as required by the Equal Credit Opportunity Act (ECOA) and Regulation B (12 CFR \u00A7 1002.9). The complexity of an AI model does not affect your right to receive specific, understandable reasons.",
    },
    {
      title: "Investment Recommendations and Advice",
      detail: "If AI generates or supports investment recommendations, those recommendations are subject to the same standards as human-generated recommendations, including FINRA's suitability rules and Regulation Best Interest (where applicable). Human registered representatives remain responsible for reviewing AI-generated recommendations before delivery to you.",
    },
    {
      title: "Customer Communications",
      detail: "AI tools may assist in drafting communications to you. All customer-facing communications generated with AI assistance are reviewed by qualified personnel before delivery and must meet FINRA Rule 2210 standards: fair, balanced, and not misleading.",
    },
    {
      title: "Account Monitoring and Fraud Detection",
      detail: "AI tools monitor account activity for fraud, unusual patterns, and potential compliance issues. These tools may trigger alerts that result in account restrictions or requests for additional verification.",
    },
  ];

  usageScenarios.forEach((scenario) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, scenario.title, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, scenario.detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 6;
  });

  // Section 3: Your Rights
  y = addSectionHeader(doc, "3. Your Rights When AI Is Used in Financial Decisions", y);
  const rights = [
    "Right to Specific Reasons: If AI contributes to an adverse credit decision, you have the right to a statement of specific reasons for the action. (ECOA, 12 CFR \u00A7 1002.9)",
    "Right to Non-Discrimination: We may not use your race, color, religion, national origin, sex, marital status, age (if old enough to contract), receipt of public assistance income, or exercise of Consumer Credit Protection Act rights as a basis for credit decisions. (ECOA, 12 CFR \u00A7 1002.4)",
    "Right to Free Credit Report: If a consumer report was used in an adverse credit decision, you have the right to a free copy of your report from the consumer reporting agency within 60 days. (FCRA, 15 U.S.C. \u00A7 1681m)",
    "Right to Dispute: If you believe information in your credit report is inaccurate, you have the right to dispute it with the consumer reporting agency. (FCRA, 15 U.S.C. \u00A7 1681i)",
    "Right to Human Review: Where AI generates investment recommendations, a registered representative reviews the recommendation before it is provided to you.",
  ];
  let cbIdx = 0;
  rights.forEach((right) => {
    y = addWrappedText(doc, "  - " + right, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 2;
    void cbIdx;
  });
  y += LINE_HEIGHT;

  // Section 4: Data Use
  y = addSectionHeader(doc, "4. Data Used by AI Systems", y);
  y = addWrappedText(
    doc,
    `AI tools used by ${data.company.name} may process information including, as applicable:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const dataTypes = [
    "Account transaction history and account activity",
    "Credit bureau information (where authorized by you and applicable law)",
    "Information you have provided in applications or account opening documents",
    "Market data and publicly available financial information",
    "Communications between you and our firm (where applicable)",
  ];
  dataTypes.forEach((dt, dIdx) => {
    y = addFormCheckbox(doc, `data_${dIdx}`, dt, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Questions and Complaints
  y = addSectionHeader(doc, "5. Questions About AI and Your Account", y);
  y = addWrappedText(
    doc,
    `If you have questions about how AI is used in connection with your account, or if you believe an AI-assisted decision may have been made in error or in violation of your rights, please contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(doc, `${data.contact.name}, ${data.contact.title || "Compliance Officer"}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.email) y = addWrappedText(doc, `Email: ${data.contact.email}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.phone) y = addWrappedText(doc, `Phone: ${data.contact.phone}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    `You may also file a complaint with FINRA (finra.org), the CFPB (consumerfinance.gov), or your applicable state financial regulator.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Disclosure approval
  y = addSectionHeader(doc, "Disclosure Approval", y);
  y = addFormTextField(doc, "disclosure_approved_by", "Approved by (Compliance Officer/Principal):", y, { width: 120 });
  y = addFormTextField(doc, "disclosure_crd", "CRD Number (if applicable):", y, { width: 60 });
  y = addFormTextField(doc, "disclosure_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "disclosure_effective", "Effective Date:", y, { width: 60 });
  y = addFormTextField(doc, "disclosure_next_review", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
