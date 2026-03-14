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
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: AI Safety Whistleblower Protection Policy
// Aligned with CA SB 53 (2025-2026 Session) + Best Practice
// ============================================================
export function generateWhistleblowerPolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Safety Whistleblower Protection Policy", data);
  y = addTopDisclaimer(doc, y);

  // ── Policy Statement ───────────────────────────────────────
  y = addSectionHeader(doc, "1. Policy Statement", y);
  y = addWrappedText(
    doc,
    data.company.name +
      ' ("Organization") is committed to responsible AI development and deployment. ' +
      "This AI Safety Whistleblower Protection Policy protects employees, contractors, " +
      "and other covered individuals who report concerns about AI safety, harmful outputs, " +
      "policy violations, or illegal conduct related to the Organization's AI systems. " +
      "Retaliation against any person who makes a good-faith AI safety report is " +
      "strictly prohibited and will result in disciplinary action up to and including termination.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Organization Information:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Organization Name: " + data.company.name,
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
  y += LINE_HEIGHT;

  // ── Who Is Covered ─────────────────────────────────────────
  y = addSectionHeader(doc, "2. Who Is Covered", y);
  y = addWrappedText(
    doc,
    "This Policy protects the following individuals who make AI safety reports:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const covered = [
    "\u2022  All current employees, including full-time, part-time, and temporary employees",
    "\u2022  Contractors and consultants engaged by the Organization",
    "\u2022  Former employees making reports about conduct during their employment",
    "\u2022  Job applicants who become aware of AI safety concerns during the application process",
    "\u2022  Third parties who interact with the Organization's AI systems and identify safety concerns",
  ];
  covered.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // ── What You Can Report ────────────────────────────────────
  y = addSectionHeader(doc, "3. What You Can Report", y);
  y = addWrappedText(
    doc,
    "This Policy covers reports about AI safety concerns including:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const reportable = [
    "(a) AI Safety Hazards: AI system behaviors or outputs that create a risk of " +
      "physical harm, psychological harm, or discriminatory impact on individuals.",
    "(b) AI Policy Violations: Use of AI systems in violation of the Organization's " +
      "AI Governance Policy, AI Ethics Principles, or AI Acceptable Use Policy.",
    "(c) Discriminatory AI Outputs: AI outputs that produce or are likely to produce " +
      "discriminatory results based on race, color, national origin, sex, age, disability, " +
      "religion, or other protected characteristics.",
    "(d) Data Privacy Violations: AI system use of personal data in violation of " +
      "applicable privacy laws or the Organization's data governance policies.",
    "(e) Regulatory Non-Compliance: Failure to comply with applicable AI laws, " +
      "including disclosure obligations, audit requirements, or reporting obligations.",
    "(f) AI System Failures: Material failures of AI systems that are not being " +
      "reported through normal channels or that are being concealed.",
    "(g) Unauthorized AI Systems: Deployment of AI systems that have not been " +
      "approved through the Organization's AI Use Case Approval Workflow.",
  ];
  reportable.forEach((item) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── How to Report ──────────────────────────────────────────
  y = addSectionHeader(doc, "4. How to Make a Report", y);
  y = addWrappedText(
    doc,
    "Reports may be made through any of the following channels. Reporters may choose " +
      "to remain anonymous where the reporting channel supports anonymity.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Primary Reporting Channel — AI Compliance Officer:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addFormTextField(doc, "wb_compliance_officer", "AI Compliance Officer (Name, Title, Contact):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Confidential Reporting Option:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "If the reporter is uncomfortable reporting to the AI Compliance Officer — for example, " +
      "if the concern involves the AI Compliance Officer — reports may be made directly to " +
      "Legal Counsel or to the highest available level of management.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "wb_legal_contact", "Legal Counsel or Senior Management Contact:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "External Regulatory Reporting:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Nothing in this Policy prohibits employees from reporting AI safety concerns to " +
      "relevant government agencies, including the Federal Trade Commission, applicable " +
      "state attorneys general, or other regulatory bodies with jurisdiction over the " +
      "Organization's AI activities. The Organization will not retaliate against any " +
      "employee for making a report to a regulatory agency.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Anti-Retaliation ───────────────────────────────────────
  y = addSectionHeader(doc, "5. Anti-Retaliation Protections", y);
  y = addWrappedText(
    doc,
    "The Organization strictly prohibits retaliation against any individual who makes " +
      "a good-faith AI safety report. Protected activities include making a report, " +
      "providing information during an investigation, testifying about an AI safety " +
      "concern, or refusing to participate in conduct that violates this Policy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Prohibited retaliation includes: termination, demotion, suspension, reduction " +
      "in pay, change in job responsibilities, harassment, exclusion from meetings or " +
      "decisions, or any other adverse employment action taken because of a protected " +
      "AI safety report. Supervisors who retaliate will be subject to disciplinary " +
      "action up to and including termination.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Investigation Process ──────────────────────────────────
  y = addSectionHeader(doc, "6. Investigation Process", y);
  const investigationSteps = [
    "Acknowledgment: The AI Compliance Officer (or designated investigator) will " +
      "acknowledge receipt of the report within 5 business days.",
    "Assessment: The investigator will assess whether the report raises a credible " +
      "AI safety concern requiring investigation.",
    "Investigation: Material concerns will be investigated promptly. The reporter " +
      "will be asked to provide additional information as needed.",
    "Resolution: The reporter will be informed of the outcome to the extent permitted " +
      "by confidentiality requirements.",
    "Corrective Action: If the investigation confirms a violation, appropriate corrective " +
      "action will be taken. The AI Compliance Officer will report material findings to " +
      "the AI Steering Committee.",
    "Confidentiality: The Organization will protect the reporter's identity to the " +
      "extent consistent with conducting a fair investigation and meeting legal obligations.",
  ];
  investigationSteps.forEach((step, idx) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "Step " + (idx + 1) + " — " + step,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // ── Policy Approval ────────────────────────────────────────
  y = addSectionHeader(doc, "7. Policy Approval", y);
  y = addFormTextField(doc, "wb_effective_date", "Policy Effective Date:", y);
  y = addFormTextField(doc, "wb_next_review", "Next Scheduled Review Date:", y);
  y = addFormTextField(doc, "wb_approved_by", "Approved By (Name, Title, Signature):", y, {
    multiline: true,
    lines: 2,
  });

  addDisclaimer(doc);
  return doc;
}
