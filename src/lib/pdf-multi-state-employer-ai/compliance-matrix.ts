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
// DOCUMENT 1: Multi-Jurisdiction Compliance Matrix
// IL HB3773 + NYC LL144 + CO SB24-205
// ============================================================
export function generateComplianceMatrix(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Multi-Jurisdiction Compliance Matrix", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Multi-Jurisdiction Compliance Matrix summarizes the employer AI disclosure and compliance requirements of Illinois HB3773 (775 ILCS 5/2-102(L)), NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874), and Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707) for ${data.company.name}. Each jurisdiction enforces independently. Verify current status of each law with qualified legal counsel before relying on this matrix.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Illinois HB3773 (775 ILCS 5/2-102(L))", y);
  const ilRows = [
    ["Effective:", "January 1, 2026 (P.A. 103-804)"],
    ["Applies to:", "Any Illinois employer using AI in employment decisions"],
    ["Covered decisions:", "Recruitment, hiring, promotion, renewal, training, discharge, discipline, tenure, terms/conditions"],
    ["Key requirement:", "Written notice to employees and applicants before AI is used in covered employment decisions"],
    ["Enforcement:", "IDHR investigates; Illinois Human Rights Commission imposes penalties"],
    ["Private right of action:", "Yes \u2014 uncapped actual damages and attorney fees (775 ILCS 5/8A-104)"],
    ["Max penalty:", "Up to $70,000 per violation (two or more within 7 years, 775 ILCS 5/8A-104(K))"],
    ["Implementing rules:", "IDHR rules in development; not yet published as of March 2026"],
  ];
  ilRows.forEach(([label, value]) => {
    y = addWrappedText(doc, `${label} ${value}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  });
  y = addFormCheckbox(doc, "il_applies", "Illinois HB3773 applies to our organization", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874)", y);
  const nycRows = [
    ["Effective:", "Enforcement began July 5, 2023"],
    ["Applies to:", "NYC employers and employment agencies using automated employment decision tools (AEDTs) for hiring or promotion in NYC"],
    ["Key requirement:", "Annual independent bias audit; public posting of audit summary at least 10 business days before use; candidate/employee notification before use"],
    ["Enforcement:", "NYC Department of Consumer and Worker Protection (DCWP); proactive investigations since 2026"],
    ["Private right of action:", "No"],
    ["Max penalty:", "$1,500 per violation per day (subsequent violations)"],
    ["Implementing rules:", "DCWP rules at 6 RCNY \u00A7 5-300 et seq."],
  ];
  nycRows.forEach(([label, value]) => {
    y = addWrappedText(doc, `${label} ${value}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  });
  y = addFormCheckbox(doc, "nyc_applies", "NYC Local Law 144 applies to our organization", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707)", y);
  const coRows = [
    ["Effective:", "June 30, 2026 (extended by SB 25B-004 from original Feb 1, 2026 date)"],
    ["Applies to:", "Deployers of high-risk AI systems making consequential decisions about Colorado consumers"],
    ["Covered decisions:", "Employment, education, financial services, government services, healthcare, housing, insurance, legal services"],
    ["Key requirement:", "Risk management program; data protection assessments; consumer notification before consequential AI decisions"],
    ["Enforcement:", "Colorado AG under Consumer Protection Act (C.R.S. \u00A7 6-1-112)"],
    ["Private right of action:", "No"],
    ["Max penalty:", "Up to $20,000 per violation; up to $50,000 per violation involving persons 60+ (\u00A7 6-1-112)"],
    ["Implementing rules:", "No AG implementing rules adopted as of March 2026"],
  ];
  coRows.forEach(([label, value]) => {
    y = addWrappedText(doc, `${label} ${value}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  });
  y = addFormCheckbox(doc, "co_applies", "Colorado SB24-205 applies to our organization", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Jurisdiction Determination Notes", y);
  y = addFormTextField(
    doc,
    "jurisdiction_notes",
    "Record which jurisdictions apply and the basis for each determination:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(doc, "reviewer_name", "Reviewed By (Name/Title):", y);
  y = addFormTextField(doc, "review_date", "Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
