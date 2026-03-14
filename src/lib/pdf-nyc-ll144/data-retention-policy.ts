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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Data Retention Policy Disclosure
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateDataRetentionPolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Retention Policy Disclosure", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes ${data.company.name}'s data retention practices for records related to automated employment decision tools (AEDTs) used under NYC Admin. Code §§ 20-870–20-874 (Local Law 144 of 2021). Recommended Best Practice \u2014 not a statutory mandate: NYC LL144 does not specify a retention period, but maintaining records for at least four years is recommended to align with general employment record-keeping practices and EEOC record retention guidance (29 CFR § 1627.3).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Records Covered by This Policy", y);
  const recordTypes = [
    "Annual bias audit reports (full reports from independent auditors)",
    "Published bias audit summaries (copies of all public postings)",
    "Candidate and employee notification records",
    "Requests for alternative selection processes and responses",
    "AEDT vendor contracts and audit access agreements",
    "AEDT system descriptions and documentation",
    "Records of each AEDT use (position, date, tool used)",
  ];
  let cbCount = 0;
  recordTypes.forEach((rec) => {
    y = addFormCheckbox(doc, "ret_" + cbCount, rec, y, { checked: true });
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Retention Periods (Recommended Best Practice)", y);
  y = addWrappedText(
    doc,
    "The following retention periods are recommended. They are not mandated by NYC LL144 but align with general employment law record-keeping standards and EEOC guidance:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const retentionPeriods: [string, string][] = [
    ["Bias audit reports", "4 years from audit date (recommended)"],
    ["Audit summaries (public postings)", "4 years from posting date (recommended)"],
    ["Candidate notifications", "4 years from decision date (recommended)"],
    ["Alternative process requests", "4 years from request date (recommended)"],
    [
      "Records during litigation/charge",
      "Until final resolution, regardless of age",
    ],
  ];
  retentionPeriods.forEach(([record, period]) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, record + ":", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y -= LINE_HEIGHT;
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      "    " + period,
      MARGIN + 60,
      y,
      CONTENT_WIDTH - 60,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Storage and Access Controls", y);
  y = addFormTextField(
    doc,
    "storage_location",
    "Primary Record Storage Location:",
    y
  );
  y = addFormTextField(doc, "storage_responsible", "Responsible Party:", y);
  y = addFormTextField(doc, "storage_access", "Access Restricted To:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Policy Certification", y);
  y = addWrappedText(
    doc,
    `Adopted by ${data.company.name} on:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "policy_date", "Date:", y);
  y = addFormTextField(doc, "policy_approver", "Approved By (Name/Title):", y);
  y = addFormTextField(doc, "policy_signature", "Signature:", y);

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "nyc_retention", y);

  addDisclaimer(doc);
  return doc;
}
