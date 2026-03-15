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
// DOCUMENT 1: EU AI Database Registration Checklist
// EU AI Act Art. 49 — Registration in EU database
// ============================================================
export function generateDatabaseRegistrationChecklist(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: EU Database Registration Preparation Checklist (Art. 49)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This checklist assists ${data.company.name} in preparing for registration in the EU database for high-risk AI systems as required by Article 49 of Regulation (EU) 2024/1689 (EU AI Act). Article 49 requires deployers of high-risk AI systems listed in Annex III (and, where applicable, their providers) to register in the EU AI Act database established under Article 71 before placing the system on the market or putting it into service. Complete each item before initiating database registration. The EU AI database is accessible at the official EU AI Office portal — verify current access procedures at the time of registration.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Who must register
  y = addSectionHeader(doc, "1. Registration Obligation — Who Must Register (Art. 49)", y);
  y = addWrappedText(
    doc,
    "Confirm the applicable registration obligation. Both providers and deployers may have distinct registration obligations under Article 49 depending on the system category and deployment context.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const registrationBases = [
    "We are the PROVIDER — registering before market placement per Art. 49(1)",
    "We are the DEPLOYER — registering the AI system we deploy per Art. 49(2) (Annex III high-risk systems)",
    "We are the DEPLOYER of a system in Annex III §1-6 or §8 — deployer registration required under Art. 49(2)",
    "Registration is being coordinated with the provider — confirm division of responsibility below",
    "Voluntarily registering a system that does not trigger mandatory registration obligation",
  ];
  registrationBases.forEach((basis, idx) => {
    y = addFormCheckbox(doc, `dbreg_basis_${idx}`, basis, y);
  });
  y = addFormTextField(
    doc,
    "dbreg_basis_notes",
    "Notes on registration responsibility or coordination with provider:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Deployer identification
  y = addSectionHeader(doc, "2. Deployer Identification", y);
  y = addWrappedText(
    doc,
    "For each field below: check the box when the required information is gathered and ready for submission. Then enter the information in the form field.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(doc, "dbreg_dep_name_cb", "Deployer legal name — ready for submission", y);
  y = addFormTextField(doc, "dbreg_dep_name", "Deployer legal name:", y, { width: 150 });

  y = addFormCheckbox(doc, "dbreg_dep_address_cb", "Deployer registered address — ready for submission", y);
  y = addFormTextField(doc, "dbreg_dep_address", "Deployer registered address:", y, {
    multiline: true,
    lines: 2,
  });

  y = addFormCheckbox(doc, "dbreg_dep_country_cb", "Member State of establishment — ready for submission", y);
  y = addFormTextField(doc, "dbreg_dep_country", "Member State of establishment:", y, { width: 100 });

  y = addFormCheckbox(doc, "dbreg_dep_contact_cb", "Contact person details — ready for submission", y);
  y = addFormTextField(doc, "dbreg_dep_contact", "Contact person name, title, email, phone:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // Section 3: AI system identification
  y = addSectionHeader(doc, "3. AI System Identification", y);

  y = addFormCheckbox(doc, "dbreg_sys_name_cb", "AI system name — ready for submission", y);
  y = addFormTextField(doc, "dbreg_sys_name", "AI system name:", y, { width: 140 });

  y = addFormCheckbox(doc, "dbreg_sys_version_cb", "AI system version / build — ready for submission", y);
  y = addFormTextField(doc, "dbreg_sys_version", "AI system version:", y, { width: 80 });

  y = addFormCheckbox(doc, "dbreg_sys_provider_cb", "Name and address of AI system provider — ready for submission", y);
  y = addFormTextField(doc, "dbreg_sys_provider", "Provider name and address:", y, {
    multiline: true,
    lines: 2,
  });

  y = addFormCheckbox(doc, "dbreg_sys_purpose_cb", "Intended purpose statement — ready for submission", y);
  y = addFormTextField(
    doc,
    "dbreg_sys_purpose",
    "Intended purpose (as described by the provider in instructions for use):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 4: Member states of use
  y = addSectionHeader(doc, "4. Member States of Use", y);

  y = addFormCheckbox(doc, "dbreg_ms_cb", "Member State(s) of use — ready for submission", y);
  y = addFormTextField(
    doc,
    "dbreg_ms_list",
    "Member State(s) where the AI system is or will be used:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Deployment dates and status
  y = addSectionHeader(doc, "5. Deployment Dates and Status", y);

  y = addFormCheckbox(
    doc,
    "dbreg_deploy_date_cb",
    "Date of first deployment or intended date — ready for submission",
    y
  );
  y = addFormTextField(doc, "dbreg_deploy_date", "Date of first deployment:", y, { width: 80 });

  y = addFormCheckbox(
    doc,
    "dbreg_status_cb",
    "Status of deployment — ready for submission",
    y
  );

  const deployStatuses = [
    "Active — AI system currently in use",
    "Planned — deployment not yet commenced",
    "Suspended — use temporarily halted",
    "Discontinued — deployment ended",
  ];
  deployStatuses.forEach((status, idx) => {
    y = addFormCheckbox(doc, `dbreg_status_${idx}`, status, y);
  });
  y += LINE_HEIGHT;

  // Section 6: Pre-registration verification checklist
  y = addSectionHeader(doc, "6. Pre-Registration Verification Checklist", y);
  y = addWrappedText(
    doc,
    "Verify all required prerequisites before submitting registration. Check each item when confirmed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const prereqChecks = [
    "Conformity assessment completed and EU Declaration of Conformity prepared (Art. 43, 47)",
    "CE marking affixed where applicable (Art. 48)",
    "FRIA completed (Art. 27) — where deployer obligation applies",
    "Human oversight measures implemented (Art. 26(2))",
    "Post-market monitoring plan established (Art. 26(5))",
    "Log retention policy established (Art. 26(6))",
    "Worker notification issued before deployment (Art. 26(7)) — where applicable",
    "Instructions for use received from provider (Art. 13)",
    "Provider documentation review completed (technical documentation, declaration of conformity)",
    "Authorized representative information obtained (where provider is outside EU)",
    "EU AI database account created and access verified",
    "Registration reviewed by qualified EU AI Act legal counsel",
  ];
  prereqChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, `dbreg_prereq_${idx}`, check, y);
  });
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "dbreg_sign", y);

  addDisclaimer(doc);
  return doc;
}
