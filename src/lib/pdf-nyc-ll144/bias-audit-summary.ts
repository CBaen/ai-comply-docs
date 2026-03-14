import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Bias Audit Summary (Public Posting)
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateBiasAuditSummary(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Bias Audit Summary — Public Posting", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This summary is published by ${data.company.name} pursuant to NYC Admin. Code § 20-871(b)(2), which requires employers to make available to the public a summary of the results of the most recent bias audit, including the date the audit was conducted. This summary must be posted on the employer's website for at least 10 business days prior to any use of the AEDT on a candidate or employee.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Employer Information", y);
  y = addFormTextField(doc, "employer_name", "Employer Name:", y, {
    prefill: data.company.name,
    readOnly: true,
  });
  y = addFormTextField(doc, "employer_website", "Employer Website:", y);
  y = addFormTextField(doc, "posting_date", "Date Posted:", y);
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `AEDT ${idx + 1}: ${sys.name}`, y);

    y = addFormTextField(doc, `sum_${idx}_vendor`, "Vendor/Developer:", y, {
      prefill: sys.vendor || "Internal",
      readOnly: false,
    });
    y = addFormTextField(doc, `sum_${idx}_audit_date`, "Most Recent Audit Date:", y);
    y = addFormTextField(doc, `sum_${idx}_auditor`, "Independent Auditor Name/Firm:", y);
    y = addFormTextField(
      doc,
      `sum_${idx}_data_period`,
      "Data Period Used in Audit:",
      y
    );
    y += LINE_HEIGHT;

    y = addWrappedText(
      doc,
      "Impact Ratio Summary (per § 20-871(b)(2) and 6 RCNY § 5-301):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    y = addWrappedText(
      doc,
      "Sex category with lowest impact ratio:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sum_${idx}_sex_lowest`,
      "  Category and impact ratio:",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      "Race/ethnicity category with lowest impact ratio:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sum_${idx}_race_lowest`,
      "  Category and impact ratio:",
      y
    );
    y += LINE_HEIGHT;

    y = addWrappedText(
      doc,
      "An impact ratio of 1.00 means equal selection rates. An impact ratio below 0.80 indicates potential adverse impact per the 4/5 (80%) rule referenced in 29 CFR § 1607.4(D) (EEOC Uniform Guidelines). The DCWP rules at 6 RCNY § 5-301 require disclosure of the lowest scoring category.",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Availability of Full Audit Report", y);
  y = addWrappedText(
    doc,
    `Candidates and employees may request a copy of the full bias audit report by contacting ${data.contact.name}${data.contact.email ? " at " + data.contact.email : ""}${data.contact.phone ? " or " + data.contact.phone : ""}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Contact for Questions", y);
  y = addFormTextField(doc, "contact_name", "Contact Name:", y, {
    prefill: data.contact.name,
    readOnly: true,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "contact_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: true,
    });
  if (data.contact.phone)
    y = addFormTextField(doc, "contact_phone", "Phone:", y, {
      prefill: data.contact.phone,
      readOnly: true,
    });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "nyc_summary", y);

  addDisclaimer(doc);
  return doc;
}
