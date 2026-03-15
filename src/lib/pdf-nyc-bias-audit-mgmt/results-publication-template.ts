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
// NYC Bias Audit Results Publication Template
// NYC Admin. Code § 20-871(a)(2) — website posting requirements
// ============================================================
export function generateResultsPublicationTemplate(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Bias Audit Results — Website Publication Template (§20-871(a)(2))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template produces the publicly posted bias audit disclosure required by NYC Admin. Code §20-871(a)(2) and DCWP rule §5-303. Employers and employment agencies must post bias audit results on the employment section of their website at least 30 days before using the AEDT, and update within 30 days of a new audit being completed. A hyperlink to a separate page is permitted. The posting must remain publicly accessible while the AEDT is in use and for SIX MONTHS after the last use of the AEDT (not one year — confirm the verified DCWP rule §5-303). Verify current DCWP requirements at nyc.gov/dcwp.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Publication Header Block (required disclosures)
  y = addSectionHeader(
    doc,
    "1. Required Publication Header — AEDT Identification",
    y
  );
  y = addWrappedText(
    doc,
    "The following information is required on the public posting per §20-871(a)(2):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "rpt_company", "Employer / Employment Agency Name:", y, {
    prefill: data.company.name,
    readOnly: true,
    width: 150,
  });
  y = addFormTextField(
    doc,
    "rpt_aedt_name",
    "Name of Automated Employment Decision Tool (AEDT):",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
      width: 150,
    }
  );
  y = addFormTextField(
    doc,
    "rpt_aedt_vendor",
    "AEDT Developer / Vendor:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].vendor
          : "",
      width: 150,
    }
  );
  y = addFormTextField(
    doc,
    "rpt_aedt_description",
    "Brief Description of What the AEDT Does and for Which Employment Decisions:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Date of Most Recent Audit (§20-871(a)(2)(a))
  y = addSectionHeader(
    doc,
    "2. Date of Most Recent Bias Audit (§20-871(a)(2)(a))",
    y
  );
  y = addFormTextField(
    doc,
    "rpt_audit_date",
    "Date of Most Recent Bias Audit (MM/DD/YYYY):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rpt_auditor_name",
    "Name of Independent Auditor / Firm:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "rpt_distribution_date",
    "Distribution Date of the AEDT (date employer first began using this AEDT in NYC hiring):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rpt_publication_date",
    "Date This Disclosure Was Published to Website:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rpt_website_url",
    "URL Where This Disclosure Is Posted (must be on employment section of website; hyperlink to separate page permitted):",
    y,
    { width: 150 }
  );
  y += LINE_HEIGHT;

  // Section 3: Required Counts (§5-303 elements 3 and 4)
  y = addSectionHeader(
    doc,
    "3. Required Counts — Applicants/Candidates and Unknown Category (§5-303)",
    y
  );
  y = addWrappedText(
    doc,
    "Per §5-303, the published summary must include the number of individuals in the unknown category (those whose sex or race/ethnicity could not be determined) and the total number of applicants or candidates in the dataset used for the audit.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "rpt_total_applicants",
    "Total Number of Applicants / Candidates in Audit Dataset (§5-303 required element):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rpt_unknown_count",
    "Number of Individuals in Unknown Category — sex or race/ethnicity undetermined (§5-303 required element):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 4: Summary of Results by Category (§5-303 elements 5 and 6)
  y = addSectionHeader(
    doc,
    "4. Bias Audit Results Summary — Selection or Scoring Rates and Impact Ratios (§5-303)",
    y
  );
  y = addWrappedText(
    doc,
    "Per §5-303, the posting must include selection or scoring rates AND impact ratios for ALL categories tested — (i) Sex, (ii) Race/Ethnicity (7 EEO-1 categories), and (iii) Intersectional sex × race/ethnicity. For selection-type AEDTs complete selection rates; for scoring-type AEDTs complete scoring rates and median score. Impact ratio = this category's rate ÷ highest-selected/scoring category's rate. A ratio below 0.80 (the 4/5 / 80% rule) may indicate adverse impact.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(doc, "rpt_aedt_selection_type", "AEDT is a SELECTION-TYPE tool — complete selection rates below", y);
  y = addFormCheckbox(doc, "rpt_aedt_scoring_type", "AEDT is a SCORING-TYPE tool — complete scoring rates and median score below", y);
  y = addFormTextField(doc, "rpt_median_score", "Median Score for Full Sample (scoring-type AEDTs only):", y, { width: 80 });
  y += 4;

  const eeoGroups = [
    "Hispanic or Latino",
    "White (Not Hispanic or Latino)",
    "Black or African American (Not Hispanic or Latino)",
    "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
    "Asian (Not Hispanic or Latino)",
    "American Indian or Alaska Native (Not Hispanic or Latino)",
    "Two or More Races (Not Hispanic or Latino)",
    "Male",
    "Female",
  ];

  eeoGroups.forEach((group, idx) => {
    y = addFormTextField(
      doc,
      `rpt_sel_rate_${idx}`,
      `${group} — Selection or Scoring Rate:`,
      y,
      { width: 80 }
    );
    y = addFormTextField(
      doc,
      `rpt_impact_ratio_${idx}`,
      `${group} — Impact Ratio (this category's rate ÷ highest-selected/scoring category's rate):`,
      y,
      { width: 80 }
    );
    y += 2;
  });

  y = addWrappedText(
    doc,
    "Intersectional Sex × Race/Ethnicity Categories (§5-301(b)(3)(iii) and §5-301(c)(4)(iii) — required): Report selection or scoring rates and impact ratios for all intersectional combinations tested (e.g., Hispanic or Latino Male, White Female, Black or African American Male, etc.).",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "rpt_intersectional_results",
    "Intersectional Results Table (attach or summarize all intersectional sex × race/ethnicity rates and ratios):",
    y,
    { multiline: true, lines: 6 }
  );
  y += LINE_HEIGHT;

  // Section 4: Source and Explanation of Data (§20-871(a)(2)(c))
  y = addSectionHeader(
    doc,
    "4. Source and Explanation of Data Used (§20-871(a)(2)(c))",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-871(a)(2)(c), the posting must include the source and explanation of the data used for testing. If the employer used historical data from its own hiring process, the number of individuals in the dataset and the time period covered must be disclosed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "rpt_data_source",
    "Source of Data Used for Bias Audit Testing:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "rpt_data_size",
    "Number of Individuals in the Dataset:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rpt_data_period",
    "Time Period Covered by the Dataset (start date — end date):",
    y,
    { width: 120 }
  );
  y = addFormTextField(
    doc,
    "rpt_data_explanation",
    "Explanation of How Data Was Collected and Used for Testing:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "rpt_data_limitations",
    "Any Data Limitations (e.g., small sample sizes for any category):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Publication Checklist
  y = addSectionHeader(doc, "5. Publication Compliance Checklist", y);
  const pubChecks = [
    "Disclosure posted on company website at least 30 days before AEDT first used (§20-871(a)(2))",
    "Disclosure updated within 30 days of new bias audit completion (§20-871(a)(1))",
    "Disclosure includes date of most recent audit (§20-871(a)(2)(a))",
    "Disclosure includes AEDT distribution date",
    "Disclosure includes selection rates and impact ratios for all required categories (§20-871(a)(2)(b))",
    "Disclosure includes data source and explanation (§20-871(a)(2)(c))",
    "Disclosure will remain posted while AEDT is in use and for one year after",
    "DCWP can locate the disclosure via the website (not hidden behind login)",
  ];
  pubChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, `rpt_check_${idx}`, check, y);
  });

  addDisclaimer(doc);
  return doc;
}
