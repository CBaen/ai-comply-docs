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
// DOCUMENT 6: Financial Services AI Compliance Checklist
// ============================================================
export function generateFinancialServicesChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Financial Services AI Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with financial services AI requirements for ${data.company.name}. Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "FINRA Rule 3110 — AI Supervision",
      items: [
        "Written supervisory procedures (WSPs) address all AI tools used in securities activities",
        "Designated principal approved all AI tools before deployment",
        "AI tool approval documented with date and principal signature",
        "Periodic supervisory reviews of AI tool outputs conducted at required frequency",
        "Supervisory review records maintained per FINRA Rule 4511",
        "FINRA RN 24-09 supervisory expectations reviewed and incorporated",
        "Associated persons trained on AI tool capabilities, limitations, and supervisory requirements",
      ],
    },
    {
      title: "FINRA Rule 2210 — AI-Generated Customer Communications",
      items: [
        "AI-generated retail communications reviewed and approved by principal before first use",
        "AI-generated correspondence reviewed within established supervisory schedule",
        "All AI-generated communications are fair, balanced, and not misleading",
        "Records of all AI-generated customer communications retained (FINRA Rule 4511)",
        "Disclosure of AI-generated content considered and applied where appropriate",
      ],
    },
    {
      title: "ECOA / Regulation B (12 CFR Part 1002) — Credit Decisions",
      items: [
        "Adverse action notices issued within 30 days of adverse AI-driven credit decision (12 CFR \u00A7 1002.9(a))",
        "Adverse action notices state specific, principal reasons for AI-driven decisions (12 CFR \u00A7 1002.9(b)(2))",
        "AI model does not use prohibited basis characteristics (race, sex, national origin, etc.) (12 CFR \u00A7 1002.4(a))",
        "Disparate impact analysis conducted for AI credit models",
        "Penalties understood: ECOA up to $10,000 individual / $500,000 class; private right of action exists",
      ],
    },
    {
      title: "FCRA (15 U.S.C. \u00A7 1681 et seq.) — Consumer Reports in AI",
      items: [
        "Permissible purpose confirmed before using consumer reports in AI models (15 U.S.C. \u00A7 1681b)",
        "Adverse action notice includes CRA name, address, and right to free report when consumer report used (15 U.S.C. \u00A7 1681m(a))",
        "Credit score disclosure included in adverse action notice when score used (15 U.S.C. \u00A7 1681m(a)(2))",
        "Consumer report data used in AI model is accurate and current",
        "Penalties understood: FCRA $100\u2013$1,000 per willful violation; actual damages for negligent violations; private right of action exists",
      ],
    },
    {
      title: "Model Risk Management (SR 11-7 / OCC 2011-12)",
      items: [
        "Model inventory current and includes all AI models",
        "Model documentation complete for each AI model (purpose, methodology, assumptions, limitations)",
        "Independent model validation completed for all AI models used in material decisions",
        "Ongoing model performance monitoring in place",
        "Model performance thresholds established and monitored",
        "Model owner assigned for each AI model",
        "Material model changes trigger re-validation",
      ],
    },
    {
      title: "Vendor Due Diligence (FINRA Rule 3110 + FINRA RN 24-09)",
      items: [
        "Due diligence questionnaire completed for each AI vendor",
        "Vendor can support firm's FINRA Rule 3110 supervisory obligations",
        "Vendor contracts include data governance, security, and regulatory cooperation requirements",
        "Vendor provides adverse action reason documentation for credit decision AI",
        "Annual vendor review scheduled and completed",
        "Vendor breach notification provisions in place (notification timeline agreed)",
      ],
    },
    {
      title: "Recordkeeping",
      items: [
        "AI-generated communications retained per FINRA Rule 4511 (generally 3 years, first 2 in accessible location)",
        "Supervisory review records of AI tool outputs retained",
        "Model risk documentation retained",
        "Adverse action notice records retained per Regulation B (25 months for consumer credit, 12 months for business credit — 12 CFR \u00A7 1002.12)",
        "Due diligence records retained for duration of vendor relationship plus 3 years",
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
  y = addFormTextField(doc, "checklist_title", "Title/CRD:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  addDisclaimer(doc);
  return doc;
}
