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
    "3. Required Testing — Selection Rates and Impact Ratios",
    y
  );
  y = addWrappedText(
    doc,
    "Per DCWP rules (6 RCNY § 5-301), the bias audit must calculate selection rates and impact ratios for each EEO-1 race/ethnicity category and for sex. The auditor must compare selection rates across categories using the 4/5 (80%) rule from EEOC Uniform Guidelines (29 C.F.R. § 1607). Required categories to test:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const eeoCategories = [
    "Hispanic or Latino",
    "White (Not Hispanic or Latino)",
    "Black or African American (Not Hispanic or Latino)",
    "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
    "Asian (Not Hispanic or Latino)",
    "American Indian or Alaska Native (Not Hispanic or Latino)",
    "Two or More Races (Not Hispanic or Latino)",
    "Male",
    "Female",
    "Intersectional categories (race/ethnicity × sex) where data permits",
  ];
  eeoCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, `rfp_eeo_${idx}`, cat, y);
  });
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
