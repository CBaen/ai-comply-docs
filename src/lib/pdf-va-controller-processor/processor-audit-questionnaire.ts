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
} from "../pdf-helpers";

// ============================================================
// Processor Audit Questionnaire
// Virginia CDPA — Va. Code § 59.1-579(B)(4)
// ============================================================
export function generateProcessorAuditQuestionnaire(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Processor Compliance Audit Questionnaire",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This questionnaire is used by ${data.company.name} (Controller) to exercise its audit and assessment rights under Va. Code § 59.1-579(B)(4). The DPA requires the processor to provide all information reasonably necessary to demonstrate compliance with the VCDPA and to allow and cooperate with reasonable assessments by the controller or its designated auditor. Complete one questionnaire per processor. Retain with the DPA and associated records.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Audit Administration ──────────────────────────────────
  y = addSectionHeader(doc, "Audit Administration", y);
  y = addFormTextField(doc, "paq_processor_name", "Processor Name:", y);
  y = addFormTextField(doc, "paq_audit_date", "Audit Date:", y);
  y = addFormTextField(doc, "paq_auditor_name", "Auditor Name / Firm:", y);
  y = addFormTextField(doc, "paq_processor_responder", "Processor Representative Completing This Questionnaire:", y);
  y = addFormTextField(doc, "paq_dpa_ref", "DPA Reference / Effective Date:", y);
  y += 4;

  // ── Section 1: Data Processing Scope ─────────────────────
  y = addSectionHeader(
    doc,
    "Section 1 — Data Processing Scope",
    y
  );
  y = addFormTextField(
    doc,
    "paq_s1_data_categories",
    "What categories of personal data does the processor currently process on behalf of the controller?",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "paq_s1_processing_activities",
    "Describe all processing activities performed on the controller's personal data:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "paq_s1_data_locations",
    "Where is the controller's personal data stored and processed (countries / regions / data centers)?",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "paq_s1_data_retention",
    "What is the processor's retention schedule for the controller's personal data?",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Does the processor process personal data for any purpose beyond the controller's instructions?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormCheckbox(doc, "paq_s1_beyond_instructions_no", "No — processing is limited strictly to controller instructions", y);
  y = addFormCheckbox(doc, "paq_s1_beyond_instructions_yes", "Yes — describe below (note: this may be a VCDPA violation)", y);
  y = addFormTextField(doc, "paq_s1_beyond_instructions_explain", "Explanation (if yes):", y, { multiline: true, lines: 2 });
  y += 4;

  // ── Section 2: Security Measures ─────────────────────────
  y = addSectionHeader(doc, "Section 2 — Security Measures", y);
  y = addWrappedText(
    doc,
    "Confirm which security measures are implemented to protect the controller's personal data:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const securityMeasures = [
    "Encryption of data at rest",
    "Encryption of data in transit (TLS 1.2 or higher)",
    "Role-based access controls — least privilege principle",
    "Multi-factor authentication for systems processing personal data",
    "Regular vulnerability assessments or penetration testing",
    "Automated anomaly detection / intrusion detection system",
    "Documented incident response and breach notification procedures",
    "Regular backup and disaster recovery testing",
    "Physical security controls for data center / office access",
    "Formal information security policy reviewed at least annually",
  ];
  securityMeasures.forEach((measure, mIdx) => {
    y = addFormCheckbox(doc, `paq_s2_security_${mIdx}`, measure, y);
  });
  y = addFormTextField(
    doc,
    "paq_s2_security_notes",
    "Security notes / additional measures not listed above:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Section 3: Subcontractor List ─────────────────────────
  y = addSectionHeader(
    doc,
    "Section 3 — Subcontractor List (§ 59.1-579(B)(5))",
    y
  );
  y = addWrappedText(
    doc,
    "List all subcontractors that have access to or process the controller's personal data. Attach a separate schedule if needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  for (let i = 1; i <= 4; i++) {
    y = addFormTextField(
      doc,
      `paq_s3_sub_${i}_name`,
      `Subcontractor ${i} — Name / Role:`,
      y
    );
    y = addFormTextField(
      doc,
      `paq_s3_sub_${i}_data`,
      `Subcontractor ${i} — Data Accessed / Processing Activity:`,
      y
    );
  }
  y = addFormTextField(
    doc,
    "paq_s3_sub_flowdown_confirm",
    "Confirm that all listed subcontractors are bound by written agreements incorporating obligations equivalent to those in the controller-processor DPA:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Section 4: Incident History ──────────────────────────
  y = addSectionHeader(doc, "Section 4 — Incident History", y);
  y = addWrappedText(
    doc,
    "Has the processor experienced any security incidents, breaches, or unauthorized access events involving the controller's personal data in the past 12 months?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormCheckbox(doc, "paq_s4_incidents_none", "No incidents to report", y);
  y = addFormCheckbox(doc, "paq_s4_incidents_yes", "Yes — incidents occurred (describe below)", y);
  y = addFormTextField(
    doc,
    "paq_s4_incidents_description",
    "Incident description(s), dates, notification timeline, and remediation taken:",
    y,
    { multiline: true, lines: 4 }
  );
  y += 4;

  // ── Section 5: Compliance Certifications ─────────────────
  y = addSectionHeader(doc, "Section 5 — Compliance Certifications", y);
  y = addWrappedText(
    doc,
    "Check all current certifications, attestations, or audit reports the processor holds:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const certifications = [
    "SOC 2 Type II (attach current report or summary letter)",
    "ISO 27001 certification (attach certificate)",
    "ISO 27701 (Privacy Information Management)",
    "PCI DSS (if applicable — attach current AOC)",
    "HIPAA Business Associate Agreement in place (if applicable)",
    "CSA STAR certification",
    "FedRAMP authorization (if applicable)",
    "Other certification (describe below)",
  ];
  certifications.forEach((cert, certIdx) => {
    y = addFormCheckbox(doc, `paq_s5_cert_${certIdx}`, cert, y);
  });
  y = addFormTextField(
    doc,
    "paq_s5_cert_other",
    "Other certification description / expiration dates:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Section 6: Access Controls ────────────────────────────
  y = addSectionHeader(doc, "Section 6 — Access Controls", y);
  y = addFormTextField(
    doc,
    "paq_s6_who_has_access",
    "Who has access to the controller's personal data (roles / teams)? How is access provisioned and de-provisioned?",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "paq_s6_access_review_frequency",
    "How frequently are access rights reviewed and recertified?",
    y
  );
  y = addFormTextField(
    doc,
    "paq_s6_privileged_access",
    "Describe controls for privileged access (admin accounts, database access):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Section 7: Training Records ───────────────────────────
  y = addSectionHeader(doc, "Section 7 — Training Records", y);
  y = addWrappedText(
    doc,
    "Confirm training status for personnel with access to the controller's personal data:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const trainingItems = [
    "Privacy and data protection awareness training completed annually",
    "Security awareness training completed annually",
    "Role-specific training for personnel in high-risk roles (e.g., developers, DBAs)",
    "Training records are maintained and available upon request",
  ];
  trainingItems.forEach((item, tIdx) => {
    y = addFormCheckbox(doc, `paq_s7_training_${tIdx}`, item, y);
  });
  y = addFormTextField(
    doc,
    "paq_s7_training_last_date",
    "Date of most recent training completion (most recent cycle):",
    y
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "paq", y);

  addDisclaimer(doc);
  return doc;
}
