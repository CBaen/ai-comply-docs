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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: EEOC AI Hiring Compliance Checklist
// Title VII + ADA + ADEA + 29 CFR Part 1607
// ============================================================
export function generateEEOCComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: Annual Compliance Review Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to review compliance with federal anti-discrimination law as applied to AI hiring tools used by ${data.company.name}. Review at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"} and whenever an AI tool is updated, replaced, or expanded to new job categories. Based on Title VII of the Civil Rights Act (42 USC § 2000e et seq.), the Americans with Disabilities Act (42 USC § 12101 et seq.), the Age Discrimination in Employment Act (29 USC § 621 et seq.), and the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607). NOTE: The EEOC AI initiative pages have been removed from eeoc.gov under the current administration. These templates are based on underlying statutory law and the Uniform Guidelines, which remain in force.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "AI Tool Inventory and Coverage",
      items: [
        "All AI tools used in hiring, promotion, termination, or performance evaluation identified and documented",
        "For each tool: vendor name, product name, version, and employment decision areas documented",
        "Job titles and positions where each AI tool is used documented",
        "Human oversight designee identified for each AI tool",
        "Vendor contracts reviewed — EEOC cooperation clauses in place",
      ],
    },
    {
      title: "Adverse Impact Analysis (29 CFR § 1607.4(D))",
      items: [
        "Adverse impact analysis conducted for each AI selection procedure within past 12 months",
        "Analysis covers all protected groups: race, color, religion, sex, national origin (Title VII), age 40+ (ADEA), disability (ADA)",
        "Four-fifths (80%) rule applied at each selection stage where AI is used",
        "Statistical significance tested where sample sizes warrant",
        "Any adverse impact findings documented with date, affected group, and magnitude",
        "Vendor's adverse impact data obtained and retained on file",
      ],
    },
    {
      title: "Job-Relatedness and Business Necessity (29 CFR §§ 1607.5, 1607.6)",
      items: [
        "Validation study on file for each AI selection procedure (or vendor documentation per 29 CFR § 1607.7)",
        "Validation study uses criterion-related, content, or construct validity methodology per Uniform Guidelines",
        "Job analysis completed for each job category where AI tool is used",
        "Adverse impact found and job-relatedness demonstrated through validation (if applicable)",
        "Business necessity documented where adverse impact exists",
        "Less discriminatory alternatives with substantially equal validity considered (29 CFR § 1607.3(B))",
      ],
    },
    {
      title: "ADA Compliance for AI Assessments (42 USC § 12112)",
      items: [
        "Reasonable accommodation procedures established before AI assessments are administered",
        "Candidates notified of ability to request accommodation before assessment",
        "Accommodation request process: interactive process, decision within appropriate timeframe",
        "AI tool reviewed for screening-out risk (42 USC § 12112(b)(6)) — criteria are job-related and consistent with business necessity",
        "Video-based AI: confirmed tool does not score based on characteristics correlated with disability",
        "Medical information from accommodations maintained in separate confidential file",
      ],
    },
    {
      title: "ADEA Compliance for AI Assessments (29 USC § 621 et seq.)",
      items: [
        "Adverse impact analysis includes age group 40+ vs. under 40",
        "AI tool reviewed for age-correlated proxies (years of experience caps, graduation year analysis)",
        "Disparate impact on age 40+ workers assessed and documented",
        "If adverse impact on age 40+ found: job-relatedness demonstrated (Uniform Guidelines apply to ADEA through EEOC enforcement)",
      ],
    },
    {
      title: "Vendor Accountability",
      items: [
        "Vendor AI audit questionnaire sent to each vendor within past 12 months",
        "Vendor adverse impact data and validation study responses on file",
        "Vendor contracts require: annual adverse impact data, model change notifications, EEOC cooperation",
        "Vendor's ADA accommodation procedures reviewed and confirmed adequate",
        "If adverse impact attributable to vendor: remediation demand or replacement plan initiated",
      ],
    },
    {
      title: "Recordkeeping (29 CFR § 1607.15)",
      items: [
        "Applicant flow data maintained by race, sex, ethnic group for each AI selection stage",
        "Records retained for minimum of 2 years (1 year for employers with fewer than 150 employees — per 29 CFR § 1607.15(A)(1))",
        "EEOC charge or lawsuit filed: all relevant records retained until final resolution",
        "Adverse impact analyses, validation studies, and audit records filed and accessible",
        "Accommodation request records maintained in separate confidential files",
      ],
    },
    {
      title: "Human Oversight",
      items: [
        "Designated oversight person identified for each AI hiring tool",
        "Human review available for AI-influenced employment decisions",
        "Override authority documented — designated reviewer can reject AI recommendations",
        "All AI-influenced adverse decisions reviewed by human before action is taken",
        "Override decisions documented with rationale",
      ],
    },
  ];

  let cbGlobalCount = 0;
  sections.forEach((section) => {
    y = addSectionHeader(doc, section.title, y);
    section.items.forEach((item) => {
      y = addFormCheckbox(doc, "eeoc_cl_" + cbGlobalCount, item, y);
      cbGlobalCount++;
    });
    y += LINE_HEIGHT;
  });

  // Sign-off
  y = addSectionHeader(doc, "Annual Review Sign-off", y);
  y = addFormTextField(doc, "eeoc_cl_reviewer", "Reviewed by:", y, { width: 100 });
  y = addFormTextField(doc, "eeoc_cl_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "eeoc_cl_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "eeoc_cl_counsel", "Legal counsel reviewed by:", y, { width: 120 });
  y = addFormTextField(doc, "eeoc_cl_next", "Next annual review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
