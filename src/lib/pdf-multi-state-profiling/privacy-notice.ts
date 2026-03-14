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
// DOCUMENT 4: Multi-State Privacy Notice Template
// Multi-State Profiling Assessment Bundle
// ============================================================
export function generateMultiStatePrivacyNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Multi-State Privacy Notice Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Privacy Notice is provided by ${data.company.name}. This template is designed to satisfy the privacy notice requirements of multiple state consumer privacy laws simultaneously, including Virginia VCDPA, Connecticut CTDPA, Colorado CPA, Texas TDPSA, Oregon OCPA, Montana MCDPA, Delaware PDPA, Minnesota MCDPA, and others. Verify that this notice satisfies each applicable state law with qualified legal counsel before deployment.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Categories of Personal Data We Collect", y);
  y = addWrappedText(
    doc,
    "Required by all major state privacy laws. Check all categories of personal data your organization processes:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataCategories = [
    "Identifiers (name, email, address, phone, IP address, account name)",
    "Commercial information (purchase history, transaction records)",
    "Internet/network activity (browsing history, search queries, app interactions)",
    "Geolocation data",
    "Professional or employment information",
    "Sensitive: precise geolocation",
    "Sensitive: racial or ethnic origin",
    "Sensitive: religious beliefs",
    "Sensitive: mental or physical health diagnosis or treatment",
    "Sensitive: genetic data",
    "Sensitive: biometric data processed to identify an individual",
    "Sensitive: data of a known child",
    "Sensitive: sexual orientation or gender identity",
    "Sensitive: citizenship or immigration status",
    "Inferences drawn from any of the above",
  ];
  let cbCount = 0;
  dataCategories.forEach((cat) => {
    y = addFormCheckbox(doc, "cat_" + cbCount, cat, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How We Use Your Personal Data", y);
  y = addFormTextField(doc, "purposes", "Purposes for which personal data is processed:", y, {
    multiline: true,
    lines: 4,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Data Sharing and Sale", y);
  y = addFormCheckbox(doc, "sells_data", "We sell personal data to third parties", y);
  y = addFormCheckbox(doc, "targeted_ads", "We process personal data for targeted advertising", y);
  y = addFormTextField(doc, "third_parties", "Categories of third parties receiving personal data:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Your Consumer Rights", y);
  y = addWrappedText(
    doc,
    "Depending on your state of residence, you may have the following rights:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const rights = [
    "Right to know whether we process your personal data and to access it",
    "Right to correct inaccurate personal data",
    "Right to delete your personal data",
    "Right to obtain a portable copy of your personal data",
    "Right to opt out of processing for targeted advertising",
    "Right to opt out of the sale of your personal data",
    "Right to opt out of profiling for consequential decisions (e.g., credit, employment, insurance, housing)",
    "Right to not be discriminated against for exercising any of these rights",
  ];
  rights.forEach((right, idx) => {
    y = addFormCheckbox(doc, "right_" + idx, right, y, { checked: true });
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How to Exercise Your Rights", y);
  y = addFormTextField(doc, "rights_method", "Request submission method (email, web form, etc.):", y, {
    multiline: true,
    lines: 2,
  });
  y = addWrappedText(
    doc,
    "We will respond to your request within 45 days. We may extend this period by 45 additional days where reasonably necessary, with notice.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Contact Information", y);
  y = addFormTextField(doc, "contact_name", "Privacy Contact Name:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "contact_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "notice_effective", "Notice Effective Date:", y);
  y = addFormTextField(doc, "notice_updated", "Last Updated:", y);

  addDisclaimer(doc);
  return doc;
}
