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
// DOCUMENT 3: Provider Documentation Verification Checklist
// EU AI Act Art. 13 — Deployer verification of provider docs
// ============================================================
export function generateProviderDocumentationVerification(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Provider Documentation Verification Checklist (Art. 13)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This checklist assists ${data.company.name} in verifying that it has received all required documentation from the AI system provider, as required by Article 13 of Regulation (EU) 2024/1689 (EU AI Act). Article 13 requires providers of high-risk AI systems to ensure their systems are sufficiently transparent by accompanying them with instructions for use that include all information necessary for deployers to implement the system in conformity with the Regulation. Deployers must verify receipt and adequacy of this documentation before deployment. For each item: check RECEIVED when obtained, REVIEWED when read and understood, and ADEQUATE when the information meets the Art. 13 standard. If any item is INADEQUATE, request supplementation from the provider before deploying.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Provider and system identification
  y = addSectionHeader(doc, "1. Provider and AI System Identification", y);
  y = addFormTextField(doc, "provdoc_provider_name", "AI system provider name:", y, { width: 140 });
  y = addFormTextField(
    doc,
    "provdoc_provider_address",
    "Provider registered address / EU authorized representative:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "provdoc_provider_contact", "Provider compliance contact (name, email, phone):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "provdoc_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "provdoc_sys_version", "Version / build:", y, { width: 80 });
  y = addFormTextField(doc, "provdoc_sys_eu_db_id", "EU AI database registration ID:", y, { width: 120 });
  y = addFormTextField(doc, "provdoc_review_date", "Date of documentation review:", y, { width: 80 });
  y = addFormTextField(doc, "provdoc_reviewer_name", "Reviewer name and title:", y, { width: 140 });
  y += LINE_HEIGHT;

  // Column header legend
  y = addSectionHeader(doc, "How to Use This Checklist", y);
  y = addWrappedText(
    doc,
    "For each documentation item below, three checkboxes are provided: (R) RECEIVED — document obtained from provider; (V) REVIEWED — document read and understood by deployer; (A) ADEQUATE — information meets Article 13 / EU AI Act requirements. Mark each checkbox when confirmed. If Adequate cannot be checked, record the deficiency in the notes field and request supplementation from provider.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: Instructions for use (Art. 13)
  y = addSectionHeader(doc, "2. Instructions for Use (Art. 13)", y);
  y = addWrappedText(
    doc,
    "Article 13(3) specifies the required content of instructions for use. Verify each required element has been provided.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const instructionElements = [
    "Provider identity and contact information (Art. 13(3)(a))",
    "AI system characteristics, capabilities, and intended purpose (Art. 13(3)(b))",
    "Level of accuracy, robustness, and cybersecurity performance (Art. 13(3)(c))",
    "Known limitations, risks, and circumstances where system may fail or give incorrect outputs (Art. 13(3)(d))",
    "Human oversight measures, including technical means for oversight persons to interpret outputs (Art. 13(3)(e))",
    "Description of any pre-processing of data required (Art. 13(3)(f))",
    "Instructions for computing hardware and IT environment (Art. 13(3)(g))",
    "Lifetime of the AI system and maintenance / software update policy (Art. 13(3)(h))",
    "Description of the logging functionality and what logs are generated (Art. 13(3)(i))",
  ];

  instructionElements.forEach((element, idx) => {
    y = addFormCheckbox(
      doc,
      `provdoc_instr_recv_${idx}`,
      `(R) RECEIVED: ${element}`,
      y
    );
    y = addFormCheckbox(
      doc,
      `provdoc_instr_rev_${idx}`,
      `(V) REVIEWED: ${element}`,
      y
    );
    y = addFormCheckbox(
      doc,
      `provdoc_instr_adeq_${idx}`,
      `(A) ADEQUATE: ${element}`,
      y
    );
    y = addFormTextField(
      doc,
      `provdoc_instr_notes_${idx}`,
      "Deficiency notes (if not adequate):",
      y,
      { multiline: true, lines: 2 }
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 3: Technical documentation summary
  y = addSectionHeader(doc, "3. Technical Documentation Summary (Art. 11, Annex IV)", y);
  y = addWrappedText(
    doc,
    "Providers must maintain technical documentation per Article 11 and Annex IV. Deployers are not required to hold the full technical documentation but should receive a summary sufficient to verify conformity claims.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "provdoc_techdoc_recv",
    "(R) RECEIVED: Technical documentation summary or reference",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_techdoc_rev",
    "(V) REVIEWED: Technical documentation summary",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_techdoc_adeq",
    "(A) ADEQUATE: Technical documentation summary confirms conformity with applicable requirements",
    y
  );
  y = addFormTextField(
    doc,
    "provdoc_techdoc_notes",
    "Deficiency notes:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Declaration of conformity
  y = addSectionHeader(doc, "4. EU Declaration of Conformity (Art. 47)", y);
  y = addWrappedText(
    doc,
    "The provider must draw up an EU Declaration of Conformity before placing the system on the market or putting it into service. Verify the declaration has been received and is substantively adequate.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "provdoc_decl_recv",
    "(R) RECEIVED: EU Declaration of Conformity",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_decl_rev",
    "(V) REVIEWED: EU Declaration of Conformity",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_decl_adeq",
    "(A) ADEQUATE: Declaration identifies AI system, provider, applicable requirements, and is signed",
    y
  );
  y = addFormTextField(doc, "provdoc_decl_date", "Declaration date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "provdoc_decl_notes",
    "Deficiency notes:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Contact information
  y = addSectionHeader(doc, "5. Provider Contact Information", y);
  y = addWrappedText(
    doc,
    "Verify adequate contact information for ongoing compliance questions, incident reporting (Art. 73 cascade), and post-market monitoring inquiries.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "provdoc_contact_recv",
    "(R) RECEIVED: Provider contact information (compliance, technical, security)",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_contact_adeq",
    "(A) ADEQUATE: Contact information is current and allows timely communication",
    y
  );
  y = addFormTextField(
    doc,
    "provdoc_contact_notes",
    "Contact details confirmed and stored at (internal reference):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 6: Intended purpose statement
  y = addSectionHeader(doc, "6. Intended Purpose Statement (Art. 13(3)(b))", y);
  y = addWrappedText(
    doc,
    "Verify that the provider has provided a clear intended purpose statement and that your organization's deployment is within that intended purpose. Deployment outside intended purpose may create liability.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "provdoc_purpose_recv",
    "(R) RECEIVED: Intended purpose statement",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_purpose_adeq",
    "(A) ADEQUATE: Intended purpose is specific and our deployment is within stated purpose",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_purpose_within",
    "CONFIRMED: Our specific use case is within the provider-stated intended purpose",
    y
  );
  y = addFormTextField(
    doc,
    "provdoc_purpose_notes",
    "Notes on intended purpose alignment or any deviation:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 7: Accuracy, robustness, and cybersecurity
  y = addSectionHeader(
    doc,
    "7. Accuracy, Robustness, and Cybersecurity Information (Art. 13(3)(c) — Art. 15)",
    y
  );
  y = addWrappedText(
    doc,
    "Article 15 requires high-risk AI systems to achieve appropriate levels of accuracy, robustness, and cybersecurity. Article 13(3)(c) requires the instructions for use to specify these levels. Verify the information received.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "provdoc_arc_recv_acc",
    "(R) RECEIVED: Accuracy metrics and performance levels specified by provider",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_arc_adeq_acc",
    "(A) ADEQUATE: Accuracy metrics are specific, measurable, and appropriate for intended purpose",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_arc_recv_rob",
    "(R) RECEIVED: Robustness and resilience information (e.g., behavior under adversarial inputs)",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_arc_adeq_rob",
    "(A) ADEQUATE: Robustness information is sufficient for deployer risk assessment",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_arc_recv_cyber",
    "(R) RECEIVED: Cybersecurity information (security measures, known vulnerabilities, patch policy)",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_arc_adeq_cyber",
    "(A) ADEQUATE: Cybersecurity information meets deployer's security assessment requirements",
    y
  );
  y = addFormTextField(
    doc,
    "provdoc_arc_notes",
    "Deficiency notes for accuracy/robustness/cybersecurity:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Overall assessment
  y = addSectionHeader(doc, "8. Overall Assessment and Decision", y);
  y = addFormCheckbox(
    doc,
    "provdoc_overall_complete",
    "ALL REQUIRED DOCUMENTATION RECEIVED, REVIEWED, AND ADEQUATE — Deployment may proceed",
    y
  );
  y = addFormCheckbox(
    doc,
    "provdoc_overall_deficient",
    "DOCUMENTATION DEFICIENCIES IDENTIFIED — Deployment deferred pending supplementation from provider",
    y
  );
  y = addFormTextField(
    doc,
    "provdoc_overall_action",
    "Actions required before deployment (list outstanding items and responsible person):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "provdoc_sign", y);

  addDisclaimer(doc);
  return doc;
}
