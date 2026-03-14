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
// Montana MCDPA — MCA §§ 30-14-2801 through 30-14-2820
// ============================================================
export function generatePrivacyNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Privacy Notice Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Privacy Notice is provided by ${data.company.name} pursuant to MCA \u00A7 30-14-2808 (Montana Consumer Data Privacy Act, effective October 1, 2024). Montana has the lowest applicability thresholds of any state privacy law \u2014 organizations processing data of 25,000 or more Montana consumers may be covered (\u00A7 30-14-2803). The notice describes the categories of personal data processed, the purposes of processing, and the consumer rights available under MCA \u00A7\u00A7 30-14-2801 through 30-14-2820.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Categories of Personal Data Processed", y);
  y = addWrappedText(
    doc,
    "MCA \u00A7 30-14-2808 requires controllers to provide a clear and meaningful privacy notice disclosing the categories of personal data processed. Check all categories that apply:",
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
    "Sensitive data: mental or physical health diagnosis",
    "Sensitive data: genetic data",
    "Sensitive data: biometric data for identification",
    "Sensitive data: data from a known child",
    "Sensitive data: sexual orientation or gender identity",
    "Financial data (account numbers, payment data)",
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
    "MCA \u00A7 30-14-2808 requires the notice to describe the purposes for which personal data is processed:",
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

  y = addSectionHeader(doc, "Consumer Rights Under the Montana MCDPA", y);
  y = addWrappedText(
    doc,
    "Per MCA \u00A7 30-14-2809, Montana consumers have the following rights. This notice must describe how consumers may exercise them:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const rights = [
    "Right to confirm whether personal data is being processed and to access that data (\u00A7 30-14-2809(1)(a))",
    "Right to correct inaccurate personal data (\u00A7 30-14-2809(1)(b))",
    "Right to delete personal data (\u00A7 30-14-2809(1)(c))",
    "Right to data portability \u2014 obtain a copy in a portable, usable format (\u00A7 30-14-2809(1)(d))",
    "Right to opt out of processing for targeted advertising (\u00A7 30-14-2809(1)(e)(i))",
    "Right to opt out of sale of personal data (\u00A7 30-14-2809(1)(e)(ii))",
    "Right to opt out of profiling for consequential decisions (\u00A7 30-14-2809(1)(e)(iii))",
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
    "Per MCA \u00A7 30-14-2810, the controller must respond to authenticated consumer requests within 45 days (extendable by 45 additional days with notice).",
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
