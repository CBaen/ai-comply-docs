import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// NYC Bias Audit — Auditor RFP Template
// NYC Admin. Code §§ 20-870–20-874 (Local Law 144 of 2021)
// DCWP rules: 6 RCNY § 5-300 et seq.
// ============================================================
export function generateAuditorRfpTemplate(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Independent Bias Auditor RFP — NYC Local Law 144",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Request for Proposals (RFP) is issued by ${data.company.name} to engage an independent bias auditor as required under NYC Admin. Code §§ 20-870–20-874 (Local Law 144, 2021) and DCWP implementing rules (6 RCNY § 5-300 et seq.). Under §20-871(a)(1), bias audits must be conducted by an independent auditor at least annually. Per §20-870(b), an "independent auditor" means an impartial auditor that is not employed by the employer or employment agency and is not a developer or vendor of the AEDT being audited. Verify current DCWP guidance at nyc.gov/dcwp.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Issuing Organization
  y = addSectionHeader(doc, "1. Issuing Organization", y);
  y = addFormTextField(doc, "rfp_company", "Company Name:", y, {
    prefill: data.company.name,
    readOnly: true,
    width: 140,
  });
  y = addFormTextField(doc, "rfp_contact_name", "RFP Point of Contact:", y, {
    prefill: data.contact.name || "",
    width: 140,
  });
  y = addFormTextField(doc, "rfp_contact_title", "Title:", y, {
    prefill: data.contact.title || "",
    width: 110,
  });
  y = addFormTextField(doc, "rfp_contact_email", "Contact Email:", y, {
    prefill: data.contact.email || "",
    width: 140,
  });
  y = addFormTextField(doc, "rfp_contact_phone", "Contact Phone:", y, {
    prefill: data.contact.phone || "",
    width: 80,
  });
  y = addFormTextField(doc, "rfp_issued_date", "RFP Issue Date:", y, {
    width: 70,
  });
  y = addFormTextField(
    doc,
    "rfp_proposal_deadline",
    "Proposal Submission Deadline:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Section 2: Scope of Audit — AEDT Systems to Be Audited
  y = addSectionHeader(
    doc,
    "2. Scope of Audit — AEDT Systems (§20-870 Definitions)",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-870(a), an 'automated employment decision tool' (AEDT) means any computational process, derived from machine learning, statistical modeling, data analytics, or artificial intelligence, that issues simplified output used to substantially assist or replace discretionary decision making for employment decisions. List each AEDT to be audited:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const systemCount = Math.max(
    data.aiSystems ? data.aiSystems.length : 0,
    1
  );
  for (let i = 0; i < Math.min(systemCount, 5); i++) {
    const sys =
      data.aiSystems && data.aiSystems[i] ? data.aiSystems[i] : null;
    y = addFormTextField(
      doc,
      `rfp_aedt_name_${i}`,
      `AEDT ${i + 1} — System Name:`,
      y,
      { prefill: sys ? sys.name : "", width: 140 }
    );
    y = addFormTextField(
      doc,
      `rfp_aedt_vendor_${i}`,
      `AEDT ${i + 1} — Vendor / Developer:`,
      y,
      { prefill: sys ? sys.vendor : "", width: 140 }
    );
    y = addFormTextField(
      doc,
      `rfp_aedt_purpose_${i}`,
      `AEDT ${i + 1} — Purpose / Employment Decision Supported:`,
      y,
      { multiline: true, lines: 2 }
    );
    y += 2;
  }
  y += LINE_HEIGHT;

  // Section 3: Required Testing
  y = addSectionHeader(
    doc,
    "3. Required Testing — Selection Rates, Impact Ratios, and AEDT Type",
    y
  );
  y = addWrappedText(
    doc,
    "Per DCWP rules (6 RCNY § 5-301), required calculations depend on whether the AEDT is a selection-type or scoring-type tool. Both types require calculations across (i) Sex, (ii) Race/Ethnicity (7 EEO-1 categories), and (iii) Intersectional sex × race/ethnicity categories. Identify the AEDT type and confirm all required calculations below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(doc, "rfp_aedt_selection_type", "AEDT is a SELECTION-TYPE tool (issues pass/fail, selected/not-selected, or proceed/screen-out output)", y);
  y = addFormCheckbox(doc, "rfp_aedt_scoring_type", "AEDT is a SCORING-TYPE tool (issues a score, ranking, or numeric output used for decision-making)", y);
  y += 4;

  y = addWrappedText(
    doc,
    "SELECTION-TYPE AEDT — Required calculations per §5-301(b):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;
  const selectionCalcs = [
    "Selection rate for each category (number selected ÷ total in category)",
    "Impact ratio for each category (category selection rate ÷ highest selection rate among all categories)",
    "Calculations broken out by: (i) Sex, (ii) Race/Ethnicity — all 7 EEO-1 categories, (iii) Intersectional sex × race/ethnicity",
    "Per-group calculations if AEDT classifies applicants into groups before selection",
    "Count of individuals in the unknown category (those whose sex or race/ethnicity could not be determined)",
  ];
  selectionCalcs.forEach((calc, idx) => {
    y = addFormCheckbox(doc, `rfp_sel_calc_${idx}`, calc, y);
  });
  y += 4;

  y = addWrappedText(
    doc,
    "SCORING-TYPE AEDT — Required calculations per §5-301(c):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;
  const scoringCalcs = [
    "Median score for the full sample",
    "Scoring rate for each category (number scored at or above threshold ÷ total in category, or as defined by auditor methodology)",
    "Impact ratio for each category (category scoring rate ÷ highest scoring rate among all categories)",
    "Calculations broken out by: (i) Sex, (ii) Race/Ethnicity — all 7 EEO-1 categories, (iii) Intersectional sex × race/ethnicity",
    "Count of individuals in the unknown category (those whose sex or race/ethnicity could not be determined)",
  ];
  scoringCalcs.forEach((calc, idx) => {
    y = addFormCheckbox(doc, `rfp_score_calc_${idx}`, calc, y);
  });
  y += 4;

  y = addWrappedText(
    doc,
    "EEO-1 Race/Ethnicity Categories (7 categories required per §5-301):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;
  const eeoCategories = [
    "(ii) Hispanic or Latino",
    "(ii) White (Not Hispanic or Latino)",
    "(ii) Black or African American (Not Hispanic or Latino)",
    "(ii) Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
    "(ii) Asian (Not Hispanic or Latino)",
    "(ii) American Indian or Alaska Native (Not Hispanic or Latino)",
    "(ii) Two or More Races (Not Hispanic or Latino)",
    "(i) Male",
    "(i) Female",
    "(iii) Intersectional sex × race/ethnicity — all combinations (e.g., Hispanic or Latino Male, White Female, etc.)",
  ];
  eeoCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, `rfp_eeo_${idx}`, cat, y);
  });
  y += 4;

  y = addWrappedText(
    doc,
    "§5-301(d) Small-Category Exclusion: Categories comprising less than 2% of the total data used for bias testing may be excluded from the analysis, provided the auditor documents the justification for exclusion. The auditor must still count and report the number of individuals in the unknown category regardless of the 2% threshold.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormCheckbox(doc, "rfp_exclusion_provision", "Auditor will apply §5-301(d) <2% exclusion where justified and document all exclusions in the audit report", y);
  y = addFormCheckbox(doc, "rfp_unknown_category", "Auditor will count and report the number of individuals in the unknown category (sex or race/ethnicity undetermined) regardless of exclusions", y);
  y += 4;

  y = addFormTextField(
    doc,
    "rfp_testing_methodology",
    "Additional Testing Methodology Requirements (describe any internal requirements beyond DCWP minimum):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 4: Data Requirements
  y = addSectionHeader(doc, "4. Data Requirements for Auditor", y);
  y = addWrappedText(
    doc,
    "The auditor will require access to the following data. Check which the company will provide and add any additional data requirements:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const dataReqs = [
    "AEDT training data (with EEO-1 category labels where available)",
    "AEDT scoring/output data for the audit period",
    "Ground-truth outcome data (who was hired/screened out)",
    "System documentation (technical specifications, model card)",
    "Vendor-provided bias audit or testing documentation (if any)",
    "Historical bias audit results (if prior audits conducted)",
  ];
  dataReqs.forEach((req, idx) => {
    y = addFormCheckbox(doc, `rfp_data_${idx}`, req, y);
  });
  y = addFormTextField(
    doc,
    "rfp_data_notes",
    "Data Access Restrictions or Confidentiality Requirements:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Timeline
  y = addSectionHeader(doc, "5. Timeline and Deliverables", y);
  y = addFormTextField(
    doc,
    "rfp_audit_start",
    "Required Audit Start Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "rfp_audit_complete",
    "Required Audit Completion Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "rfp_publication_deadline",
    "Results Must Be Published No Later Than (per §20-871(a)(2), within 30 days of audit completion):",
    y,
    { width: 80 }
  );
  y = addWrappedText(
    doc,
    "Required Deliverables (check all that will be required):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const deliverables = [
    "Written bias audit report with all required §20-871 disclosures",
    "Selection rate and impact ratio tables for all required categories",
    "Auditor independence attestation (required per §20-871(a)(1))",
    "Executive summary suitable for public posting",
    "Methodology documentation",
    "Data used and its source (for public disclosure per §20-871(a)(2)(c))",
  ];
  deliverables.forEach((del, idx) => {
    y = addFormCheckbox(doc, `rfp_del_${idx}`, del, y);
  });
  y += LINE_HEIGHT;

  // Section 6: Auditor Independence Attestation
  y = addSectionHeader(
    doc,
    "6. Auditor Independence Attestation (§20-870(b))",
    y
  );
  y = addWrappedText(
    doc,
    "By submitting a proposal, the auditor attests to the following independence requirements under §20-870(b). The auditor must confirm all of the following:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const independenceItems = [
    "Auditor is not employed by the employer or employment agency commissioning this audit",
    "Auditor is not a developer or vendor of the AEDT(s) being audited",
    "Auditor has no financial interest in the outcome of the audit that would compromise objectivity",
    "Auditor will disclose any potential conflicts of interest in the proposal",
    "Auditor will maintain independence throughout the engagement",
  ];
  independenceItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, `rfp_ind_${idx}`, item, y);
  });
  y += LINE_HEIGHT;

  // Section 7: Budget
  y = addSectionHeader(doc, "7. Budget", y);
  y = addFormTextField(
    doc,
    "rfp_budget_range",
    "Estimated Budget Range for This Engagement:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "rfp_budget_notes",
    "Budget Notes / Billing Structure Requirements:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "rfp", y);

  addDisclaimer(doc);
  return doc;
}
