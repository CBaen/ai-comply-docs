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
// DOCUMENT 1: Privacy Notice Template
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generatePrivacyNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Privacy Notice Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Privacy Notice is provided by ${data.company.name} pursuant to Conn. Gen. Stat. § 42-520, which requires controllers to provide consumers with a reasonably accessible, clear, and meaningful privacy notice. The Connecticut Data Privacy Act (Conn. Gen. Stat. §§ 42-515 through 42-525, P.A. 22-15) has been in effect since July 1, 2023.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Categories of Personal Data Processed", y);
  y = addWrappedText(
    doc,
    "Per Conn. Gen. Stat. § 42-520(a)(1), the notice must describe the categories of personal data processed. Check all categories that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataCategories = [
    "Identifiers (name, address, email, phone, IP address, account name)",
    "Commercial information (products purchased, transaction history)",
    "Internet or network activity (browsing history, search history, interactions)",
    "Geolocation data",
    "Professional or employment information",
    "Sensitive data: precise geolocation",
    "Sensitive data: racial or ethnic origin",
    "Sensitive data: religious beliefs",
    "Sensitive data: mental or physical health diagnosis or treatment",
    "Sensitive data: genetic data",
    "Sensitive data: biometric data processed for the purpose of identification",
    "Sensitive data: personal data from a known child",
    "Sensitive data: sexual orientation or gender identity",
    "Sensitive data: immigration or citizenship status",
    "Financial data (account numbers, payment data)",
    "Inferences drawn from any of the above to create a consumer profile",
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
    "Per Conn. Gen. Stat. § 42-520(a)(2), the notice must describe the purposes for which personal data is processed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "purpose_desc", "Processing Purposes:", y, {
    multiline: true,
    lines: 4,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Consumer Rights Under the Connecticut CTDPA", y);
  y = addWrappedText(
    doc,
    "Per Conn. Gen. Stat. § 42-518, consumers have the following rights. This notice must describe how consumers may exercise them:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const rights = [
    "Right to confirm whether personal data is being processed and to access that data (§ 42-518(a)(1))",
    "Right to correct inaccurate personal data (§ 42-518(a)(2))",
    "Right to delete personal data provided by or obtained about the consumer (§ 42-518(a)(3))",
    "Right to data portability — obtain a copy of personal data in a portable, readily usable format (§ 42-518(a)(4))",
    "Right to opt out of processing for targeted advertising (§ 42-518(a)(5))",
    "Right to opt out of sale of personal data (§ 42-518(a)(5))",
    "Right to opt out of profiling in furtherance of decisions producing legal or similarly significant effects (§ 42-518(a)(6))",
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
    "Per Conn. Gen. Stat. § 42-519(a), the controller must respond to authenticated consumer requests within 45 days (extendable by an additional 45 days with notice). If the controller declines to act, it must provide the consumer an appeals mechanism within a reasonable period (§ 42-519(b)).",
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
