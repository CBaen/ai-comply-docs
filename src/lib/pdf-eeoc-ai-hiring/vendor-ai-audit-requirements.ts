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
// DOCUMENT 4: Vendor AI Audit Requirements
// EEOC Uniform Guidelines, 29 CFR Part 1607
// ============================================================
export function generateVendorAIAuditRequirements(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Vendor AI Audit Requirements", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document specifies the audit and documentation requirements that ${data.company.name} imposes on AI hiring tool vendors. Under the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607), the employer (not the vendor) is responsible for ensuring that selection procedures comply with anti-discrimination law. Employers must obtain from vendors the information necessary to evaluate adverse impact and job-relatedness. This template should be sent to each AI hiring tool vendor. Recommended Best Practice \u2014 not a statutory mandate: obtain vendor responses in writing and retain on file.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Required Vendor Documentation", y);
  y = addWrappedText(
    doc,
    "The following documentation is required from each AI hiring tool vendor pursuant to 29 CFR \u00A7 1607.15 (documentation of impact and validity studies). Check each item and request from vendor:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const requiredDocs = [
    "Adverse impact data by sex, race/ethnicity for each protected class (29 CFR \u00A7 1607.4)",
    "Validity study or job-relatedness documentation (29 CFR \u00A7\u00A7 1607.5, 1607.14)",
    "Documentation of criterion-related, content, or construct validity evidence",
    "Passing scores or selection thresholds and their rationale (29 CFR \u00A7 1607.5(H))",
    "Technical reports underlying the AI model or selection procedure",
    "Most recent bias audit results with impact ratios by demographic group",
    "Description of training data used, including demographic composition",
    "Description of any updates or model changes in the past 12 months",
  ];
  let cbCount = 0;
  requiredDocs.forEach((reqDoc) => {
    y = addFormCheckbox(
      doc,
      "vend_doc_" + cbCount,
      reqDoc,
      y
    );
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Vendor Certification Requirements", y);
  y = addWrappedText(
    doc,
    "Each vendor must certify the following. Request written certification before deployment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const certifications = [
    "The AI tool has been validated for the specific job(s) for which it is used",
    "The tool does not produce adverse impact against any EEOC-protected group, OR if it does, the employer has been informed and the tool is job-related and consistent with business necessity (29 CFR \u00A7 1607.3(B))",
    "The vendor will provide updated adverse impact data at least annually",
    "The vendor will notify the employer within 30 days of any material changes to the model",
    "The vendor maintains records sufficient to reconstruct any adverse impact analysis (29 CFR \u00A7 1607.15)",
  ];
  certifications.forEach((cert, idx) => {
    y = addFormCheckbox(doc, "vend_cert_" + idx, cert, y);
  });
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Vendor Record: ${sys.name}`, y);
    y = addFormTextField(
      doc,
      `vend_${idx}_vendor`,
      "Vendor Name:",
      y,
      { prefill: sys.vendor || "", readOnly: false }
    );
    y = addFormTextField(doc, `vend_${idx}_contact`, "Vendor Contact:", y);
    y = addFormTextField(
      doc,
      `vend_${idx}_last_audit`,
      "Date of Most Recent Bias Audit:",
      y
    );
    y = addFormTextField(
      doc,
      `vend_${idx}_docs_received`,
      "Date Required Documentation Received:",
      y
    );
    y = addFormTextField(
      doc,
      `vend_${idx}_cert_date`,
      "Date Certification Received:",
      y
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(doc, "admin_name", "Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });

  addDisclaimer(doc);
  return doc;
}
