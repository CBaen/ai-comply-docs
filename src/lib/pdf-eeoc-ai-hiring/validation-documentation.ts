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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Job-Relatedness Validation Documentation
// 29 CFR Part 1607 — Sections 5, 14, 15
// ============================================================
export function generateValidationDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: Job-Relatedness Validation Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports compliance with the validation requirements of the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) for AI-assisted selection procedures used by ${data.company.name}. Where adverse impact exists, employers must demonstrate that the selection procedure is job-related and consistent with business necessity (29 CFR § 1607.5). This is a template — review with industrial-organizational psychologists and qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: System identification and job analysis
  y = addSectionHeader(doc, "1. AI System and Job Analysis", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name} (${sys.vendor || "Internal"})`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Employment decisions: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 4;
    y = addFormTextField(
      doc,
      `vd_sys_${idx}_jobs`,
      `Job title(s) for which system is used (${sys.name}):`,
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `vd_sys_${idx}_job_analysis`,
      "Job analysis method and findings (required per 29 CFR § 1607.14(C)(2)):",
      y,
      { multiline: true, lines: 4 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 2: Validation strategy (29 CFR § 1607.5)
  y = addSectionHeader(doc, "2. Validation Strategy (29 CFR § 1607.5)", y);
  y = addWrappedText(
    doc,
    "Select the validation strategy used. The Guidelines recognize criterion-related, content, and construct validity evidence. Criterion-related validity (correlation with job performance measures) is generally the strongest for AI selection tools.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const validationTypes = [
    "Criterion-related validity: empirical correlation between AI scores and job performance measures (29 CFR § 1607.14(B))",
    "Content validity: AI selection procedure represents the domain of job tasks and knowledge (29 CFR § 1607.14(C))",
    "Construct validity: AI scores measure a defined psychological construct linked to job performance (29 CFR § 1607.14(D))",
  ];

  validationTypes.forEach((vt, idx) => {
    y = addFormCheckbox(doc, "vd_type_" + idx, vt, y);
  });
  y += LINE_HEIGHT;

  // Section 3: Criterion-related validity evidence (if applicable)
  y = addSectionHeader(doc, "3. Criterion-Related Validity Evidence (29 CFR § 1607.14(B))", y);
  y = addWrappedText(
    doc,
    "If criterion-related validity is the chosen strategy, document the correlation study results and methodology:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const criterionChecks = [
    "Job performance criterion defined and measured objectively (29 CFR § 1607.14(B)(3))",
    "Sample size assessed for statistical significance (minimum 30 per Guidelines guidance)",
    "Correlation coefficient calculated and documented",
    "Differential validity analyzed for subgroups — separate validity coefficients for each group",
    "Transport validity assessed if using third-party vendor study (29 CFR § 1607.7)",
  ];

  criterionChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "vd_crit_" + idx, check, y);
  });
  y = addFormTextField(doc, "vd_crit_results", "Validity study results:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 4: Business necessity (if adverse impact found)
  y = addSectionHeader(doc, "4. Business Necessity Justification (29 CFR § 1607.6(B))", y);
  y = addWrappedText(
    doc,
    "Where adverse impact exists and job-relatedness is demonstrated, the employer must show the selection procedure is consistent with business necessity. Document the business necessity rationale below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "vd_necessity", "Business necessity rationale:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 5: Less discriminatory alternatives (29 CFR § 1607.3(B))
  y = addSectionHeader(doc, "5. Less Discriminatory Alternatives (29 CFR § 1607.3(B))", y);
  y = addWrappedText(
    doc,
    "The EEOC may require that an employer adopt an alternative selection procedure that has substantially equal validity but less adverse impact. Document the alternatives considered:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const ldaSteps = [
    "Alternatives to current AI tool identified and listed",
    "Validity and adverse impact of each alternative assessed",
    "Employer considered each alternative and documented rationale for current approach",
    "No substantially equally valid alternative with less adverse impact was identified",
  ];

  ldaSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, "vd_lda_" + idx, step, y);
  });
  y = addFormTextField(doc, "vd_lda_notes", "Alternatives considered:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 6: Vendor validation documentation
  y = addSectionHeader(doc, "6. Vendor Validation Documentation (29 CFR § 1607.7)", y);
  y = addWrappedText(
    doc,
    "Employers using third-party AI tools may rely on the vendor's validation study if it meets Guideline requirements. The employer remains responsible. Document vendor validation below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const vendorChecks = [
    "Vendor validation study obtained and reviewed",
    "Study uses criterion-related or content validity methodology per Guidelines",
    "Study includes adverse impact analysis for relevant subgroups",
    "Transport validity conditions satisfied (29 CFR § 1607.7(B)) — vendor study conditions match employer's use",
    "Vendor study documented and retained in compliance file",
  ];

  vendorChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "vd_vendor_" + idx, check, y);
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "7. Documentation Sign-off", y);
  y = addFormTextField(doc, "vd_name", "Completed by:", y, { width: 100 });
  y = addFormTextField(doc, "vd_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "vd_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "vd_next", "Next validation review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
