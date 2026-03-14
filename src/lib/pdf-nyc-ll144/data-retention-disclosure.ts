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
// DOCUMENT 5: Data Retention Policy Disclosure
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// Per § 20-871(b)(3): employer must provide data retention policy
// information upon written request within 30 days
// ============================================================
export function generateDataRetentionDisclosure(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Retention Policy Disclosure", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This disclosure is provided by ${data.company.name} pursuant to NYC Admin. Code § 20-871(b)(3), which requires employers using an automated employment decision tool (AEDT) to provide candidates and employees — upon written request — with information about the employer's data retention policy as it relates to the AEDT. This disclosure must be provided within 30 days of a written request. Use this template as both an internal policy document and as the written response to candidates and employees who submit qualifying requests.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Employer Information ─────────────────────────────────────
  y = addSectionHeader(doc, "Employer Information", y);
  y = addFormTextField(doc, "employer_name", "Employer Name:", y, {
    prefill: data.company.name,
    readOnly: true,
  });
  y = addFormTextField(doc, "contact_name", "Data Retention Contact (Name/Title):", y, {
    prefill: `${data.contact.name}${data.contact.title ? ", " + data.contact.title : ""}`,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "contact_email", "Contact Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  if (data.contact.phone)
    y = addFormTextField(doc, "contact_phone", "Contact Phone:", y, {
      prefill: data.contact.phone,
      readOnly: false,
    });
  y += LINE_HEIGHT;

  // ── Categories of Data Collected and Retained ───────────────
  y = addSectionHeader(doc, "Categories of Data Collected and Retained by AEDT", y);
  y = addWrappedText(
    doc,
    `${data.company.name} collects and retains the following categories of data in connection with AEDT use. Check all that apply:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataCategories = [
    "Resume/CV content (work history, education, skills)",
    "Job application responses",
    "Assessment or skills test results",
    "Video interview recordings or transcripts",
    "AEDT scores, rankings, classifications, or recommendations generated about the candidate/employee",
    "Demographic information used in or disclosed by the bias audit (sex and race/ethnicity categories — aggregated only, not individual)",
    "Notification records (date and method of AEDT notice provided)",
    "Alternative process request records",
    "Hiring or promotion decision outcomes",
    "Other (describe below)",
  ];
  let cbIdx = 0;
  dataCategories.forEach((cat) => {
    y = addFormCheckbox(doc, `data_${cbIdx}`, cat, y);
    cbIdx++;
  });
  y = addFormTextField(doc, "data_other_desc", "Other categories (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // ── Retention Periods ────────────────────────────────────────
  y = addSectionHeader(doc, "Retention Periods", y);
  y = addWrappedText(
    doc,
    "NYC LL144 (NYC Admin. Code §§ 20-870 through 20-874) does not specify a mandatory data retention period for AEDT-related records. The periods below reflect Recommended Best Practice based on general employment record-keeping guidance (EEOC, 29 CFR § 1627.3) and are not required by statute. Consult legal counsel to determine the appropriate retention period for your organization.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const retentionItems: [string, string][] = [
    [
      "Bias audit reports (full auditor report)",
      "4 years from audit date (Recommended Best Practice)",
    ],
    [
      "Published bias audit summaries",
      "4 years from posting date (Recommended Best Practice)",
    ],
    [
      "Candidate/employee AEDT notifications",
      "4 years from decision date (Recommended Best Practice)",
    ],
    [
      "AEDT scores, rankings, or classifications for each candidate/employee",
      "4 years from date generated (Recommended Best Practice)",
    ],
    [
      "Alternative process requests and responses",
      "4 years from request date (Recommended Best Practice)",
    ],
    [
      "Records subject to active litigation or DCWP investigation",
      "Until final resolution, regardless of age",
    ],
  ];

  retentionItems.forEach(([record, period]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = addWrappedText(doc, record + ":", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y -= LINE_HEIGHT;
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      "    " + period,
      MARGIN + 55,
      y,
      CONTENT_WIDTH - 55,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Storage and Security ─────────────────────────────────────
  y = addSectionHeader(doc, "Storage Location and Security Controls", y);
  y = addFormTextField(
    doc,
    "storage_location",
    "Primary Storage System/Location:",
    y
  );
  y = addFormTextField(
    doc,
    "storage_access",
    "Access Restricted To (roles or titles):",
    y
  );
  y = addFormTextField(
    doc,
    "storage_security",
    "Security Measures (encryption, access logs, etc.):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── How to Submit a Request ──────────────────────────────────
  y = addSectionHeader(doc, "How Candidates and Employees May Request This Disclosure", y);
  y = addWrappedText(
    doc,
    `Pursuant to § 20-871(b)(3), candidates and employees who were subject to an AEDT-assisted hiring or promotion decision may submit a written request for this data retention policy disclosure. ${data.company.name} will respond within 30 days of receiving a qualifying written request.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "Submit written requests to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `${data.contact.name}${data.contact.title ? ", " + data.contact.title : ""}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(doc, `Email: ${data.contact.email}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.phone)
    y = addWrappedText(doc, `Phone: ${data.contact.phone}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Policy Adoption ──────────────────────────────────────────
  y = addSectionHeader(doc, "Policy Adoption", y);
  y = addWrappedText(
    doc,
    `Adopted by ${data.company.name}:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "policy_date", "Effective Date:", y);
  y = addFormTextField(doc, "policy_approver", "Approved By (Name/Title):", y);
  y = addFormTextField(doc, "policy_signature", "Signature:", y);
  y = addFormTextField(doc, "policy_review_date", "Next Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
