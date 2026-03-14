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
// DOCUMENT 3: Reasonable Accommodation Procedures for AI Assessments
// ADA — 42 USC § 12112(b)(6) + 29 CFR § 1630.9
// ============================================================
export function generateAccommodationProcedures(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: Reasonable Accommodation Procedures for AI Assessments", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes reasonable accommodation procedures for AI-assisted employment assessments used by ${data.company.name}. Under the Americans with Disabilities Act (42 USC § 12101 et seq.), employers must provide reasonable accommodations unless doing so would cause undue hardship (42 USC § 12112(b)(5)). AI assessment tools must not screen out qualified individuals with disabilities unless the criteria used are job-related and consistent with business necessity (42 USC § 12112(b)(6)). This is a template — review with qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Pre-assessment disclosure
  y = addSectionHeader(doc, "1. Pre-Assessment Disclosure to Candidates", y);
  y = addWrappedText(
    doc,
    "Before administering any AI-assisted assessment, notify candidates of the following and provide opportunity to request accommodation:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const disclosureItems = [
    "Nature of AI assessment: the tool collects and processes the following types of data",
    "What the assessment measures and how results are used in hiring decisions",
    "How to request a reasonable accommodation for the assessment",
    "Timeline for accommodation decisions — accommodation request must be submitted before assessment administration",
    "Contact person for accommodation requests",
  ];

  let cbCount = 0;
  disclosureItems.forEach((item) => {
    y = addFormCheckbox(doc, "acc_disc_" + cbCount, item, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 2: Accommodation request process
  y = addSectionHeader(doc, "2. Accommodation Request Process", y);
  const requestSteps = [
    `Step 1: Candidate submits written accommodation request to ${data.contact.name || "[Designated Contact]"} before assessment administration`,
    "Step 2: HR acknowledges receipt of accommodation request within 3 business days",
    "Step 3: Interactive process initiated — HR contacts candidate to discuss needs and possible accommodations",
    "Step 4: Medical documentation requested only if the disability is not obvious or already known (ADA limitation on medical inquiries)",
    "Step 5: Accommodation decision made and communicated to candidate in writing",
    "Step 6: Approved accommodation implemented before assessment is administered",
    "Step 7: Assessment results from accommodated and non-accommodated versions are treated equivalently",
  ];

  requestSteps.forEach((step, idx) => {
    y = addWrappedText(doc, `  ${idx + 1}. ${step.replace(/^Step \d+: /, "")}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 3: Common AI-specific accommodations
  y = addSectionHeader(doc, "3. Common AI Assessment Accommodations", y);
  y = addWrappedText(
    doc,
    "The following accommodations should be available for AI-administered assessments. Check each that the organization currently offers:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const accommodations = [
    "Extended time for timed assessments",
    "Alternative format — non-AI administered version of the same assessment",
    "Screen reader compatibility for visually impaired applicants",
    "Captioning for video-based AI assessments",
    "Quiet environment or breaks for applicants with attention or anxiety conditions",
    "Human interviewer as alternative to AI video interview assessment",
    "Physical accommodation for keyboard or mouse-controlled assessments",
    "Language-simplified version of assessment materials (distinct from content simplification)",
  ];

  accommodations.forEach((acc, idx) => {
    y = addFormCheckbox(doc, "acc_type_" + idx, acc, y);
  });
  y += LINE_HEIGHT;

  // Section 4: ADA prohibition on screening out (42 USC § 12112(b)(6))
  y = addSectionHeader(doc, "4. AI Screening Criteria — ADA Compliance Review (42 USC § 12112(b)(6))", y);
  y = addWrappedText(
    doc,
    "Section 12112(b)(6) of the ADA prohibits using selection criteria that screen out individuals with disabilities unless the criteria are job-related and consistent with business necessity. AI tools must be evaluated for this risk:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const screeningChecks = [
    "AI selection criteria reviewed for potential to screen out qualified individuals with disabilities",
    "Video AI analysis: confirmed tool does not score based on facial expressions, speech patterns, or physical characteristics correlated with disability",
    "Cognitive assessments: confirmed tool does not penalize accommodated response patterns (extended time, breaks)",
    "Personality assessments: confirmed tool does not screen out profiles correlated with disability-related traits",
    "Job-relatedness analysis complete for each screening criterion (29 CFR § 1607 Uniform Guidelines)",
  ];

  screeningChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "acc_screen_" + idx, check, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Documentation and recordkeeping
  y = addSectionHeader(doc, "5. Documentation and Recordkeeping", y);
  const recordItems = [
    "All accommodation requests documented with date received, description, and outcome",
    "Interactive process documentation retained (notes from conversations with candidate)",
    "Medical information kept in separate confidential file — not in general personnel file (ADA requirement)",
    "Accommodation decisions retained for duration of any potential legal claim",
  ];

  recordItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, "acc_rec_" + idx, item, y);
  });
  y += LINE_HEIGHT;

  // Section 6: Contact information
  y = addSectionHeader(doc, "6. Accommodation Contact Information", y);
  y = addWrappedText(doc, "Accommodation Coordinator:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, `  ${data.contact.name || "[Name]"}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.title) y = addWrappedText(doc, `  ${data.contact.title}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.email) y = addWrappedText(doc, `  Email: ${data.contact.email}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.phone) y = addWrappedText(doc, `  Phone: ${data.contact.phone}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "7. Procedures Approved By", y);
  y = addFormTextField(doc, "acc_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "acc_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "acc_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
