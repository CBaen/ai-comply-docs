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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Vendor AI Audit Requirements
// Employer liability for vendor AI under Title VII + ADA + ADEA
// ============================================================
export function generateVendorAuditRequirements(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: Vendor AI Audit Requirements", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes vendor AI audit requirements for ${data.company.name}. Under Title VII of the Civil Rights Act (42 USC § 2000e et seq.), the Americans with Disabilities Act (42 USC § 12101 et seq.), and the Age Discrimination in Employment Act (29 USC § 621 et seq.), an employer remains liable for discriminatory outcomes produced by AI systems it procures from third-party vendors, even when the discrimination is attributable to the vendor's system design. The Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) apply to employer-adopted selection procedures regardless of whether the employer developed them. This is a template — send to each AI vendor and retain completed responses on file.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Vendor identification
  y = addSectionHeader(doc, "1. Vendor and System Identification", y);
  y = addFormTextField(doc, "vau_vendor_name", "AI vendor / tool provider name:", y, { width: 120 });
  y = addFormTextField(doc, "vau_product", "AI product name and version:", y, { width: 120 });
  y = addFormTextField(doc, "vau_vendor_contact", "Vendor compliance contact name and email:", y, { width: 140 });
  y += 4;
  y = addWrappedText(
    doc,
    `Employer systems covered: ${data.aiSystems.map((s) => `${s.name} — ${s.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`).join("; ")}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: Adverse impact data requests
  y = addSectionHeader(doc, "2. Adverse Impact Data Requests (29 CFR Part 1607)", y);
  y = addWrappedText(
    doc,
    "Request the following adverse impact data from the vendor. Under 29 CFR § 1607.4(D), the employer must be able to assess whether the vendor's tool produces adverse impact on protected groups. Retain all vendor responses.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const adverseImpactRequests = [
    "Selection rates for each race, sex, and ethnic group in the vendor's validation study",
    "Four-fifths (80%) rule analysis results across all protected groups tested",
    "Statistical significance tests performed (chi-square, Fisher's exact, or equivalent)",
    "Identification of any groups for which adverse impact was found",
    "Adverse impact analysis results for age groups (ADEA protected class — age 40+)",
    "Adverse impact analysis results for disability status (ADA — screen-out risk)",
  ];

  let cbCount = 0;
  adverseImpactRequests.forEach((req) => {
    y = addFormCheckbox(doc, "vau_ai_" + cbCount, req, y);
    cbCount++;
  });
  y = addFormTextField(doc, "vau_ai_response", "Vendor adverse impact data (attach or summarize):", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 3: Validation study requests
  y = addSectionHeader(doc, "3. Validation Study Requests (29 CFR § 1607.7)", y);
  y = addWrappedText(
    doc,
    "Where adverse impact is found, the employer must demonstrate job-relatedness. Request the following validation documentation from the vendor:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const validationRequests = [
    "Full validation study report (criterion-related, content, or construct validity)",
    "Description of the job analysis methodology and job positions studied",
    "Sample size and composition of validation study populations",
    "Correlation coefficients between AI scores and job performance criteria",
    "Subgroup validity coefficients — separate analyses for each protected group",
    "Less discriminatory alternatives considered and rationale for current approach",
    "Date of most recent validation study and planned update schedule",
  ];

  validationRequests.forEach((req, idx) => {
    y = addFormCheckbox(doc, "vau_val_" + idx, req, y);
  });
  y = addFormTextField(doc, "vau_val_response", "Vendor validation documentation (attach or summarize):", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 4: ADA screening-out risk (42 USC § 12112(b)(6))
  y = addSectionHeader(doc, "4. ADA Screening-Out Risk Assessment (42 USC § 12112(b)(6))", y);
  y = addWrappedText(
    doc,
    "Request the following from the vendor to assess risk that the AI tool screens out qualified individuals with disabilities:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const adaRequests = [
    "Description of what signals the AI tool analyzes (facial expression, speech, keystrokes, response patterns)",
    "Whether signals analyzed may correlate with disability status",
    "Validation data for applicants who used accommodated assessment conditions",
    "Vendor's process for handling reasonable accommodation requests",
    "Confirmation that scores are not adjusted or flagged for accommodated administrations",
  ];

  adaRequests.forEach((req, idx) => {
    y = addFormCheckbox(doc, "vau_ada_" + idx, req, y);
  });
  y = addFormTextField(doc, "vau_ada_response", "Vendor ADA response (attach or summarize):", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Section 5: Vendor contractual requirements
  y = addSectionHeader(doc, "5. Vendor Contractual Requirements", y);
  const contractChecks = [
    "Contract requires vendor to provide updated adverse impact data annually",
    "Contract requires vendor to notify employer of any changes to model affecting selection rates",
    "Contract requires vendor to cooperate with employer's EEOC defense including providing raw data",
    "Contract assigns responsibility for EEOC compliance violations to vendor if caused by vendor's system design",
    "Contract permits employer to terminate if adverse impact is found and vendor cannot remediate",
  ];

  contractChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "vau_contract_" + idx, check, y);
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Vendor Audit Sign-off", y);
  y = addFormTextField(doc, "vau_requested_by", "Audit requested by:", y, { width: 100 });
  y = addFormTextField(doc, "vau_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "vau_date", "Date sent to vendor:", y, { width: 60 });
  y = addFormTextField(doc, "vau_response_date", "Date vendor response received:", y, { width: 60 });
  y = addFormTextField(doc, "vau_next_audit", "Next vendor audit date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
