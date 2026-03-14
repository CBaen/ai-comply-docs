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
// DOCUMENT 6: Annual Compliance Review
// EEOC Uniform Guidelines, 29 CFR Part 1607
// ============================================================
export function generateAnnualComplianceReview(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Annual EEOC AI Hiring Compliance Review", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Annual Compliance Review documents ${data.company.name}'s evaluation of its AI hiring tools against the requirements of Title VII of the Civil Rights Act (42 USC \u00A7 2000e et seq.), the ADA (42 USC \u00A7 12101 et seq.), the ADEA (29 USC \u00A7 621 et seq.), and the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607). This review must be completed at least annually and retained for at least 2 years for employers with 100-149 employees, or at least 1 year for others, per 29 CFR \u00A7 1607.15(A)(1).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Review Period and Scope", y);
  y = addFormTextField(doc, "review_period", "Review Period (dates):", y);
  y = addFormTextField(doc, "review_date", "Review Completed On:", y);
  y = addFormTextField(doc, "review_by", "Reviewed By (Name/Title):", y);
  y = addFormTextField(
    doc,
    "review_counsel",
    "Legal Counsel Who Reviewed:",
    y
  );
  y += LINE_HEIGHT;

  const reviewSections: { title: string; items: string[] }[] = [
    {
      title: "Adverse Impact Analysis (29 CFR \u00A7 1607.4)",
      items: [
        "Adverse impact analysis completed for each AI hiring tool",
        "Selection rates calculated by race/ethnicity and sex for each tool",
        "Impact ratios calculated per 4/5 (80%) rule (29 CFR \u00A7 1607.4(D))",
        "No group has an impact ratio below 0.80, OR documented justification on file",
        "Annual adverse impact data obtained from each vendor",
      ],
    },
    {
      title: "Job-Relatedness and Validity (29 CFR \u00A7\u00A7 1607.5, 1607.14)",
      items: [
        "Validity evidence obtained for each AI tool in use",
        "Validity study covers the specific job(s) for which the tool is used",
        "Criterion-related, content, or construct validity documented per \u00A7 1607.14",
        "Passing scores or selection thresholds reviewed and documented",
        "Evidence of business necessity documented for any tool with adverse impact",
      ],
    },
    {
      title: "Reasonable Accommodation (ADA / ADEA)",
      items: [
        "Reasonable accommodation procedures posted and communicated to applicants",
        "All accommodation requests for AI assessments documented and resolved",
        "Alternative assessment methods available for applicants who cannot use AI tools",
        "No applicant was excluded solely because they could not use an AI tool without accommodation",
      ],
    },
    {
      title: "Recordkeeping (29 CFR \u00A7 1607.15)",
      items: [
        "Applicant data by race, sex, ethnicity retained for required period",
        "Adverse impact calculations retained",
        "Validity studies and technical reports retained",
        "Accommodation request records retained",
        "Vendor documentation retained",
      ],
    },
    {
      title: "Vendor Compliance",
      items: [
        "Updated vendor documentation received for each AI tool",
        "Vendor certifications renewed or confirmed",
        "Material model changes from vendors reviewed and re-evaluated",
        "Contracts with vendors require adverse impact data disclosure",
      ],
    },
  ];

  let cbCount = 0;
  reviewSections.forEach((section) => {
    y = addSectionHeader(doc, section.title, y);
    section.items.forEach((item) => {
      y = addFormCheckbox(doc, "ar_" + cbCount, item, y);
      cbCount++;
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Issues Identified and Corrective Actions", y);
  y = addFormTextField(
    doc,
    "issues",
    "Issues identified during this review:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "corrective_actions",
    "Corrective actions taken or planned:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Review Sign-off", y);
  y = addFormTextField(doc, "signoff_name", "Name:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "signoff_title", "Title:", y, {
    prefill: data.contact.title,
    readOnly: false,
  });
  y = addFormTextField(doc, "signoff_date", "Date:", y);
  y = addFormTextField(doc, "signoff_signature", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
