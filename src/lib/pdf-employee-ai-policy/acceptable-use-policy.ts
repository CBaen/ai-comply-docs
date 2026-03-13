import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Employee AI Acceptable Use Policy
// Aligned with NIST AI RMF 1.0 and EEOC guidance
// ============================================================
export function generateAcceptableUsePolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Employee AI Acceptable Use Policy", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose & Scope ────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose & Scope", y);
  y = addWrappedText(
    doc,
    data.company.name +
      ' ("Company") adopts this Employee AI Acceptable Use Policy to govern ' +
      "the responsible use of artificial intelligence tools by employees in the course " +
      "of their work. This Policy is designed to protect the Company, its clients, and " +
      "the public from risks associated with improper AI use, including data exposure, " +
      "biased outputs, and reliance on unverified information. It is aligned with the " +
      "NIST AI Risk Management Framework (AI RMF 1.0) and applicable EEOC guidance on " +
      "AI-assisted employment decisions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "This Policy applies to all employees, contractors, consultants, and temporary " +
      "workers who use AI tools in connection with Company business, regardless of " +
      "whether the tool is Company-provided or accessed through personal accounts.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Company Information:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Company Name: " + data.company.name,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "State of Operation: " + (data.company.state || ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "Industry: " + (data.company.industry || ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Definitions ────────────────────────────────────────────
  y = addSectionHeader(doc, "2. Definitions", y);
  const definitions = [
    '"Artificial Intelligence (AI) Tool" means any software system that uses machine ' +
      "learning, natural language processing, computer vision, or similar techniques to " +
      "generate content, make predictions, classify information, or assist in decision-making.",
    '"Generative AI (GenAI)" means AI tools capable of producing text, images, code, ' +
      "audio, or other content in response to prompts, including but not limited to large " +
      "language models (LLMs) and image generation tools.",
    '"Automated Decision Tool (ADT)" means any AI system that makes or substantially ' +
      "influences consequential decisions affecting employees, customers, or third parties " +
      "without meaningful human review at each decision point.",
    '"Approved AI Tools" means AI tools that have been reviewed and authorized by the ' +
      "Company for specific use cases, as listed in Section 3 of this Policy.",
    '"Sensitive Data" means personally identifiable information (PII), protected health ' +
      "information (PHI), trade secrets, proprietary business information, client " +
      "confidential data, and any data classified as Confidential or Restricted under " +
      "Company data classification policies.",
  ];
  definitions.forEach((def) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, def, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Approved AI Tools & Uses ───────────────────────────────
  y = addSectionHeader(doc, "3. Approved AI Tools & Permitted Uses", y);
  y = addWrappedText(
    doc,
    "The following AI tools are approved for use by employees within the defined scope. " +
      "Use of AI tools not listed below requires prior written approval from the AI " +
      "Oversight Officer identified in Section 7.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Approved Tool 1:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "aup_tool_1_name", "Tool Name / Vendor:", y);
  y = addFormTextField(doc, "aup_tool_1_uses", "Permitted Uses:", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormTextField(doc, "aup_tool_1_restrictions", "Restrictions:", y, {
    multiline: true,
    lines: 2,
  });
  y += 2;

  y = addWrappedText(
    doc,
    "Approved Tool 2:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "aup_tool_2_name", "Tool Name / Vendor:", y);
  y = addFormTextField(doc, "aup_tool_2_uses", "Permitted Uses:", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormTextField(doc, "aup_tool_2_restrictions", "Restrictions:", y, {
    multiline: true,
    lines: 2,
  });
  y += 2;

  y = addWrappedText(
    doc,
    "Approved Tool 3 (add rows as needed):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "aup_tool_3_name", "Tool Name / Vendor:", y);
  y = addFormTextField(doc, "aup_tool_3_uses", "Permitted Uses:", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormTextField(doc, "aup_tool_3_restrictions", "Restrictions:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // ── Prohibited Uses ────────────────────────────────────────
  y = addSectionHeader(doc, "4. Prohibited Uses", y);
  y = addWrappedText(
    doc,
    "The following uses of AI tools are strictly prohibited without prior written " +
      "approval from the AI Oversight Officer and, where applicable, Legal Counsel:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const prohibited = [
    "(a) Legal, Medical, or Financial Advice Without Review: Using AI to generate legal " +
      "advice, medical diagnoses, financial recommendations, or other professional opinions " +
      "that will be provided to clients, customers, or third parties without review and " +
      "approval by a qualified licensed professional.",
    "(b) Input of PII or Sensitive Data: Entering personally identifiable information, " +
      "protected health information, social security numbers, financial account data, " +
      "biometric data, or any data classified as Sensitive into AI tools not expressly " +
      "approved for such data categories.",
    "(c) Input of Trade Secrets or Proprietary Information: Submitting Company trade " +
      "secrets, proprietary algorithms, unreleased product information, client confidential " +
      "data, or competitively sensitive business information into any AI tool without " +
      "explicit authorization from Legal or IT Security.",
    "(d) Bypassing Human Oversight: Using AI outputs to make final employment decisions, " +
      "disciplinary actions, terminations, promotions, or other consequential personnel " +
      "decisions without documented human review by a qualified decision-maker.",
    "(e) Using Unverified AI Outputs: Submitting AI-generated content — including written " +
      "work, code, analysis, or research — to clients, regulators, courts, or other " +
      "external parties as if it were independently verified, without disclosing AI " +
      "involvement or conducting human verification.",
    "(f) Creating Deceptive Content: Using AI to generate content intended to deceive, " +
      "impersonate individuals, create deepfakes, or misrepresent the identity or source " +
      "of communications.",
    "(g) Unauthorized Tools: Accessing or using AI tools not on the Approved Tools list " +
      "for Company business purposes, including personal AI accounts used for work tasks.",
    "(h) Circumventing Security Controls: Using AI tools to circumvent, disable, or " +
      "undermine the Company's information security controls, access restrictions, or " +
      "data loss prevention measures.",
  ];
  prohibited.forEach((item) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Data Handling Requirements ─────────────────────────────
  y = addSectionHeader(doc, "5. Data Handling Requirements", y);
  y = addWrappedText(
    doc,
    "Employees must apply the following data handling rules when using any AI tool:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "5.1 Data Categories Permitted in AI Tools (General Use Tools Only):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  const permittedData = [
    "\u2022  Publicly available information",
    "\u2022  Internal documents classified as Public or Internal Use",
    "\u2022  Anonymized or aggregated data with no re-identification risk",
    "\u2022  Synthetic or fictional data for testing purposes",
    "\u2022  General business writing, templates, and non-sensitive communications",
  ];
  permittedData.forEach((item) => {
    y = addWrappedText(
      doc,
      item,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "5.2 Data Categories Requiring Special Approval or Prohibited:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  const restrictedData = [
    "\u2022  Personally Identifiable Information (PII) — Requires written approval",
    "\u2022  Protected Health Information (PHI) — Prohibited except in HIPAA-compliant tools",
    "\u2022  Financial account numbers, SSNs, tax IDs — Prohibited",
    "\u2022  Client confidential and attorney-client privileged information — Prohibited",
    "\u2022  Trade secrets and proprietary formulas — Prohibited without Legal approval",
    "\u2022  Employee performance data and HR records — Requires HR Director approval",
    "\u2022  Data subject to export controls (ITAR/EAR) — Prohibited",
  ];
  restrictedData.forEach((item) => {
    y = addWrappedText(
      doc,
      item,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "5.3 Data Retention:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Employees should not retain AI tool conversation histories containing sensitive or " +
      "confidential information beyond the immediate work session. Where AI tools offer " +
      "account-level data retention, employees must configure privacy settings to minimize " +
      "data storage consistent with Company data governance policies.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Output Review & Verification ───────────────────────────
  y = addSectionHeader(doc, "6. Output Review & Verification Requirements", y);
  y = addWrappedText(
    doc,
    "All AI-generated outputs used in Company work products must undergo human review " +
      "before use. The level of review required depends on the output's downstream impact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const reviewTiers = [
    "Standard Review (all AI outputs): The employee who requested the AI output is " +
      "responsible for reviewing it for accuracy, completeness, and appropriateness " +
      "before incorporating it into any work product.",
    "Enhanced Review (client-facing and regulatory outputs): Any AI-generated content " +
      "included in client deliverables, regulatory filings, legal documents, or public " +
      "communications must be reviewed by a supervisor or subject-matter expert before " +
      "release.",
    "Decision Review (employment and consequential decisions): Any AI output that " +
      "informs a consequential decision — including hiring, termination, promotion, " +
      "discipline, or access to services — must be reviewed by a qualified human " +
      "decision-maker who can independently evaluate the basis for the decision. The " +
      "AI output may not be the sole basis for any such decision.",
  ];
  reviewTiers.forEach((tier, idx) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "Tier " + (idx + 1) + ": " + tier,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "6.1 Documentation Requirements:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "For consequential decisions (Tier 3), employees must document: (a) which AI tool " +
      "was used; (b) the nature of the AI output; (c) the name and title of the human " +
      "reviewer; and (d) the independent basis for the final decision. Documentation " +
      "must be retained per the Company's standard record retention schedule.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "6.2 Designated Review Roles:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormTextField(
    doc,
    "aup_reviewer_employment",
    "Reviewer for Employment Decisions (Name/Title):",
    y
  );
  y = addFormTextField(
    doc,
    "aup_reviewer_legal",
    "Reviewer for Legal/Regulatory Outputs (Name/Title):",
    y
  );
  y = addFormTextField(
    doc,
    "aup_reviewer_client",
    "Reviewer for Client-Facing Outputs (Name/Title):",
    y
  );
  y += LINE_HEIGHT;

  // ── Reporting Requirements ─────────────────────────────────
  y = addSectionHeader(doc, "7. Reporting Requirements", y);
  y = addWrappedText(
    doc,
    "Employees are required to report the following to the AI Oversight Officer using " +
      "the Company's AI Incident Reporting Form:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const reportingItems = [
    "(a) AI Incidents: Any event in which an AI tool produced output that caused or " +
      "may have caused harm, including biased outputs, data exposure, privacy violations, " +
      "or decisions that adversely affected individuals.",
    "(b) Suspected Policy Violations: Any suspected or actual use of AI tools in " +
      "violation of this Policy by any employee, contractor, or third party.",
    "(c) New AI Tool Requests: Any employee who identifies a business need for an AI " +
      "tool not currently on the Approved Tools list must submit a request for review " +
      "before use. Unauthorized use pending approval is a policy violation.",
    "(d) Vendor Changes: If a vendor of an approved AI tool announces material changes " +
      "to data handling, model training practices, or terms of service, the employee " +
      "must notify the AI Oversight Officer immediately.",
  ];
  reportingItems.forEach((item) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += 2;

  y = addFormTextField(
    doc,
    "aup_oversight_officer",
    "AI Oversight Officer (Name, Title, Contact):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── Training Requirements ──────────────────────────────────
  y = addSectionHeader(doc, "8. Training Requirements", y);
  y = addWrappedText(
    doc,
    "All employees who use AI tools in the course of their work must complete mandatory " +
      "AI acceptable use training as follows:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const trainingReqs = [
    "(a) New Employee Onboarding: All new employees must complete AI acceptable use " +
      "training within 30 days of their start date, prior to accessing any approved " +
      "AI tools. Completion must be documented in the employee's training record.",
    "(b) Annual Recertification: All employees must complete refresher training annually. " +
      "Training content will be updated to reflect changes in approved tools, prohibited " +
      "uses, or applicable regulatory requirements.",
    "(c) Role-Specific Training: Employees whose roles involve AI-assisted employment " +
      "decisions, client-facing AI outputs, or AI tool administration must complete " +
      "additional role-specific training as designated by Human Resources.",
    "(d) Incident-Triggered Training: Following any AI policy violation or significant " +
      "AI incident, affected employees may be required to complete additional targeted " +
      "training as a corrective measure.",
  ];
  trainingReqs.forEach((item) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Enforcement & Consequences ─────────────────────────────
  y = addSectionHeader(doc, "9. Enforcement & Consequences", y);
  y = addWrappedText(
    doc,
    "Violations of this Policy will be taken seriously and may result in disciplinary " +
      "action, up to and including termination of employment. The severity of the " +
      "disciplinary response will be proportionate to the nature, intent, and impact " +
      "of the violation:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const enforcement = [
    "Minor Violations (first offense, no harm): Verbal or written warning; mandatory " +
      "retraining; increased supervision of AI tool use.",
    "Moderate Violations (repeat offense, potential harm, or unauthorized tool use): " +
      "Written warning; mandatory retraining; temporary suspension of AI tool access; " +
      "escalation to HR.",
    "Serious Violations (actual harm, intentional misconduct, data exposure, or " +
      "fraudulent AI use): Suspension or termination of employment; referral to Legal " +
      "for civil or regulatory liability assessment; notification to affected individuals " +
      "or regulators where required by law.",
  ];
  enforcement.forEach((item, idx) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    const labels = ["Level 1 — ", "Level 2 — ", "Level 3 — "];
    y = addWrappedText(
      doc,
      labels[idx] + item,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += 2;

  y = addWrappedText(
    doc,
    "Nothing in this Policy limits the Company's right to take immediate action, " +
      "including immediate termination and legal action, in response to violations that " +
      "create legal liability, expose sensitive data, or cause material harm.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Policy Review Schedule ─────────────────────────────────
  y = addSectionHeader(doc, "10. Policy Review Schedule", y);
  y = addWrappedText(
    doc,
    "This Policy shall be reviewed and updated on the following schedule:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const reviewSchedule = [
    "\u2022  Annual review: no later than 12 months after the prior review date.",
    "\u2022  Upon addition or removal of any tool from the Approved AI Tools list.",
    "\u2022  After any AI incident that results in regulatory investigation, litigation, or " +
      "material harm to the Company or affected individuals.",
    "\u2022  Upon any material change in applicable law or regulatory guidance governing " +
      "AI use in the Company's industry.",
    "\u2022  Upon deployment of any new AI tool that introduces capabilities not addressed " +
      "by the current version of this Policy.",
  ];
  reviewSchedule.forEach((item) => {
    y = addWrappedText(
      doc,
      item,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 1;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "aup_last_review", "Date of Last Review:", y);
  y = addFormTextField(
    doc,
    "aup_next_review",
    "Date of Next Scheduled Review:",
    y
  );
  y = addFormTextField(doc, "aup_reviewer_name", "Policy Owner (Name & Title):", y);
  y += LINE_HEIGHT;

  // ── Signature / Acknowledgment ─────────────────────────────
  y = addSectionHeader(doc, "11. Policy Approval & Acknowledgment", y);
  y = addWrappedText(
    doc,
    "By signing below, the approving officer certifies that this Policy has been " +
      "reviewed, approved, and is effective as of the date shown. Employees will " +
      "separately acknowledge this Policy through the Training Acknowledgment Form.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "aup_approver_name",
    "Approved By (Name & Title):",
    y
  );
  y = addFormTextField(doc, "aup_approval_date", "Effective Date:", y);
  y = addFormTextField(doc, "aup_approval_sig", "Signature:", y);
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "aup_hr_approver",
    "HR Director Approval (Name & Signature):",
    y
  );
  y = addFormTextField(doc, "aup_legal_approver", "Legal Counsel Review (Name & Date):", y);

  addDisclaimer(doc);
  return doc;
}
