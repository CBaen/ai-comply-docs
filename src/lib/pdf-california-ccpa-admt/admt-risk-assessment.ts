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
// DOCUMENT 2: ADMT Risk Assessment
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// CPPA ADMT Regulations, effective January 1, 2026
// ============================================================
export function generateADMTRiskAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Risk Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This ADMT Risk Assessment is conducted by ${data.company.name} pursuant to the CPPA\u2019s ADMT regulations under the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.), effective January 1, 2026. The CPPA regulations require a risk assessment before using ADMT to make decisions with significant effects on consumers. This assessment must be made available to the CPPA upon request. Verify current requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Risk Assessment: ${sys.name}`, y);

    y = addFormTextField(doc, `ra_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(doc, `ra_${idx}_assessor`, "Conducted By (Name/Title):", y);
    y += 4;

    y = addWrappedText(
      doc,
      "1. ADMT Description and Purpose:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ra_${idx}_desc`,
      "  Describe the ADMT and what decisions it makes:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "2. Categories of Personal Information Processed:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ra_${idx}_pi_categories`,
      "  List all categories:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "3. Sensitive Personal Information Processed (check all that apply):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const sensitiveCategories = [
      "Social security number or driver\u2019s license number",
      "Account login credentials",
      "Precise geolocation",
      "Racial or ethnic origin",
      "Religious or philosophical beliefs",
      "Union membership",
      "Mail, email, or text message contents",
      "Genetic data",
      "Biometric data for identification purposes",
      "Health-related information",
      "Sex life or sexual orientation",
      "None of the above",
    ];
    sensitiveCategories.forEach((cat, cidx) => {
      y = addFormCheckbox(doc, `ra_${idx}_sensitive_${cidx}`, cat, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "4. Benefits of Processing:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `ra_${idx}_benefits`, "", y, {
      multiline: true,
      lines: 2,
    });
    y += 4;

    y = addWrappedText(
      doc,
      "5. Risks to Consumers:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const riskAreas = [
      "Risk of inaccurate or unfair decisions affecting consumers",
      "Risk of unlawful discrimination based on protected characteristics",
      "Risk of privacy violation through unauthorized disclosure",
      "Risk of financial, physical, psychological, or reputational harm",
      "Risk of chilling effects on consumer behavior",
    ];
    riskAreas.forEach((risk, ridx) => {
      y = addFormCheckbox(doc, `ra_${idx}_risk_${ridx}`, risk, y);
    });
    y = addFormTextField(
      doc,
      `ra_${idx}_risk_detail`,
      "  Risk details and magnitude:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "6. Safeguards and Risk Mitigations:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ra_${idx}_safeguards`,
      "  Describe safeguards implemented:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "7. Conclusion \u2014 do benefits outweigh risks given safeguards?",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `ra_${idx}_conclusion`, "", y, {
      multiline: true,
      lines: 2,
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Approval", y);
  y = addFormTextField(doc, "approval_name", "Approved By (Name/Title):", y);
  y = addFormTextField(doc, "approval_date", "Date:", y);
  y = addFormTextField(doc, "approval_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: review this assessment at least annually and when the ADMT system changes materially.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
