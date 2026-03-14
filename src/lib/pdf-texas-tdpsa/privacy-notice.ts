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
// DOCUMENT 2: Privacy Notice Template
// Texas TDPSA — Tex. Bus. & Com. Code Ch. 541
// ============================================================
export function generatePrivacyNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Privacy Notice Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Privacy Notice is provided by ${data.company.name} pursuant to Tex. Bus. & Com. Code \u00A7 541.101, which requires controllers to provide consumers with a reasonably accessible, clear, and meaningful privacy notice. The Texas Data Privacy and Security Act (Tex. Bus. & Com. Code Ch. 541, HB 4) has been in effect since July 1, 2024.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Categories of Personal Data Processed", y);
  y = addWrappedText(
    doc,
    "Per Tex. Bus. & Com. Code \u00A7 541.101(a)(1), the notice must describe the categories of personal data processed. Check all categories that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataCategories = [
    "Identifiers (name, address, email, phone, IP address, account name)",
    "Commercial information (products purchased, transaction history)",
    "Internet/network activity (browsing history, search history, interactions)",
    "Geolocation data",
    "Professional or employment information",
    "Sensitive data: precise geolocation",
    "Sensitive data: racial or ethnic origin",
    "Sensitive data: religious beliefs",
    "Sensitive data: mental or physical health diagnosis or treatment",
    "Sensitive data: genetic data",
    "Sensitive data: biometric data processed for identification",
    "Sensitive data: data of a known child",
    "Sensitive data: sexual orientation or gender identity",
    "Sensitive data: citizenship or immigration status",
    "Inferences drawn from any of the above",
  ];
  let cbCount = 0;
  dataCategories.forEach((cat) => {
    y = addFormCheckbox(doc, "cat_" + cbCount, cat, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Purpose of Processing", y);
  y = addWrappedText(
    doc,
    "Per Tex. Bus. & Com. Code \u00A7 541.101(a)(2), the notice must describe the purposes for which personal data is processed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "purpose_desc", "Processing Purposes:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Third Parties and Data Sharing", y);
  y = addWrappedText(
    doc,
    "Per Tex. Bus. & Com. Code \u00A7 541.101(a)(3)\u2013(5), the notice must identify categories of third parties to whom personal data is shared and whether the controller sells personal data or shares it for targeted advertising:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "third_parties", "Categories of third parties (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormCheckbox(doc, "sells_data", "Controller sells personal data to third parties (\u00A7 541.101(a)(4))", y);
  y = addFormCheckbox(doc, "targeted_ads", "Controller processes personal data for targeted advertising (\u00A7 541.101(a)(5))", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Consumer Rights Under the Texas TDPSA", y);
  y = addWrappedText(
    doc,
    "Per Tex. Bus. & Com. Code \u00A7 541.051, consumers have the following rights. This notice must describe how consumers may exercise them:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const rights = [
    "Right to know whether personal data is being processed and to access that data (\u00A7 541.051(a)(1))",
    "Right to correct inaccurate personal data (\u00A7 541.051(a)(2))",
    "Right to delete personal data (\u00A7 541.051(a)(3))",
    "Right to data portability \u2014 obtain a copy of personal data (\u00A7 541.051(a)(4))",
    "Right to opt out of processing for targeted advertising (\u00A7 541.051(a)(5)(A))",
    "Right to opt out of sale of personal data (\u00A7 541.051(a)(5)(B))",
    "Right to opt out of profiling for consequential decisions (\u00A7 541.051(a)(5)(C))",
  ];
  rights.forEach((right, idx) => {
    y = addFormCheckbox(doc, "right_" + idx, right, y, { checked: true });
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How to Submit a Rights Request", y);
  y = addFormTextField(
    doc,
    "rights_method",
    "How consumers submit requests (email, web form, phone):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Per Tex. Bus. & Com. Code \u00A7 541.053, the controller must respond to consumer rights requests within 45 days (extendable by 45 additional days with notice).",
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
