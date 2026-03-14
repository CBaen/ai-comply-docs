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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Conformity Assessment Records
// EU AI Act Art. 43 — Conformity Assessment
// ============================================================
export function generateConformityAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Conformity Assessment Records", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports the conformity assessment process required by Article 43 of Regulation (EU) 2024/1689 for high-risk AI systems operated by ${data.company.name}. Article 43 requires conformity assessment before market placement or putting into service. The applicable procedure depends on the Annex III category of the system. This is a template — complete with your technical team and EU-qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: System and category identification
  y = addSectionHeader(doc, "1. System and Annex III Category Identification", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name} — ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  });
  y += 4;

  y = addWrappedText(
    doc,
    "Annex III of Regulation (EU) 2024/1689 lists the categories of high-risk AI systems. Check the applicable category:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const annexIIICategories = [
    "Annex III §1 — Biometric identification and categorisation of natural persons",
    "Annex III §2 — Management and operation of critical infrastructure",
    "Annex III §3 — Education and vocational training (access, admission, assessment)",
    "Annex III §4 — Employment, workers management, access to self-employment",
    "Annex III §5 — Access to essential private services and public services/benefits",
    "Annex III §6 — Law enforcement (prohibited or restricted uses)",
    "Annex III §7 — Migration, asylum, border control management",
    "Annex III §8 — Administration of justice and democratic processes",
  ];

  annexIIICategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, "ca_annex_" + idx, cat, y);
  });
  y += LINE_HEIGHT;

  // Section 2: Applicable conformity assessment procedure (Art. 43)
  y = addSectionHeader(doc, "2. Conformity Assessment Procedure (Art. 43)", y);
  y = addWrappedText(
    doc,
    "Select the applicable conformity assessment procedure. For most Annex III systems (except biometric), providers may use the internal control procedure (Annex VI). Third-party involvement via a notified body (Annex VII) is required for certain biometric systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const procedures = [
    "Annex VI — Internal control (self-assessment): provider verifies conformity with applicable requirements",
    "Annex VII — Third-party conformity assessment by notified body (biometric systems, Art. 43(1)(b))",
  ];
  procedures.forEach((p, idx) => {
    y = addFormCheckbox(doc, "ca_proc_" + idx, p, y);
  });
  y += LINE_HEIGHT;

  // Section 3: Internal control checklist (Annex VI)
  y = addSectionHeader(doc, "3. Internal Control Checklist (Annex VI)", y);
  y = addWrappedText(
    doc,
    "For internal control procedure, verify the following requirements are satisfied before market placement:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const internalChecks = [
    "Technical documentation (Annex IV) established and complete (Art. 11)",
    "Data governance requirements satisfied (Art. 10 — training, validation, testing data)",
    "Automatic event recording (logs) implemented (Art. 12)",
    "Transparency obligations satisfied — instructions for use prepared (Art. 13)",
    "Human oversight measures designed and implemented (Art. 14)",
    "Accuracy, robustness, and cybersecurity requirements met (Art. 15)",
    "Quality management system (QMS) established (Art. 17)",
    "Conformity assessment procedure completed internally",
    "EU Declaration of Conformity drawn up (Art. 47)",
    "CE marking affixed (Art. 48) — where applicable",
    "Registration in EU database completed (Art. 49) — where required",
  ];

  let cbCount = 0;
  internalChecks.forEach((check) => {
    y = addFormCheckbox(doc, "ca_check_" + cbCount, check, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 4: Notified body (if applicable)
  y = addSectionHeader(doc, "4. Notified Body Information (If Applicable)", y);
  y = addFormTextField(doc, "ca_nb_name", "Notified body name:", y, { width: 120 });
  y = addFormTextField(doc, "ca_nb_number", "Notified body identification number:", y, { width: 80 });
  y = addFormTextField(doc, "ca_nb_cert", "Certificate number (if issued):", y, { width: 100 });
  y = addFormTextField(doc, "ca_nb_date", "Certificate date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Section 5: Declaration of Conformity
  y = addSectionHeader(doc, "5. EU Declaration of Conformity (Art. 47)", y);
  y = addWrappedText(
    doc,
    "Article 47 requires a written EU Declaration of Conformity stating compliance with applicable requirements of Regulation (EU) 2024/1689. The declaration must identify the system, the provider, applicable standards, and be signed by the authorized representative.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "ca_decl_drawn", "Declaration drawn up by:", y, { width: 120 });
  y = addFormTextField(doc, "ca_decl_date", "Declaration date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Assessment Sign-off", y);
  y = addFormTextField(doc, "ca_name", "Completed by:", y, { width: 100 });
  y = addFormTextField(doc, "ca_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ca_date", "Date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "eu_conform", y);

  addDisclaimer(doc);
  return doc;
}
