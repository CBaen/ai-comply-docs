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
// DOCUMENT 3: State-Specific Addendum Templates
// IL HB3773 + NYC LL144 + CO SB24-205
// ============================================================
export function generateStateAddenda(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "State-Specific Addendum Templates", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These addenda supplement the Unified Employee/Candidate Notification for ${data.company.name} and address jurisdiction-specific requirements for Illinois HB3773 (775 ILCS 5/2-102(L)), NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874), and Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707). Use each addendum for employees and candidates in the relevant jurisdiction.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Illinois Addendum
  y = addSectionHeader(doc, "ADDENDUM A \u2014 Illinois (775 ILCS 5/2-102(L))", y);
  y = addWrappedText(
    doc,
    "Illinois HB3773 (effective January 1, 2026) requires employers to notify employees and applicants before using AI in covered employment decisions. IDHR implementing rules are in development; notify employees of this status.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addWrappedText(
    doc,
    "NOTICE TO ILLINOIS EMPLOYEES AND APPLICANTS:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    `${data.company.name} uses artificial intelligence tools in employment decisions as described in the attached AI Notification. As required by 775 ILCS 5/2-102(L) (Illinois Human Rights Act, as amended by P.A. 103-804, effective January 1, 2026):`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const ilItems = [
    "We use AI in employment decisions affecting Illinois employees and applicants.",
    "AI-generated outputs are reviewed by a qualified human decision-maker.",
    "We are committed to ensuring AI use does not have a discriminatory effect based on a protected class.",
    "You may request a reasonable accommodation if the AI assessment method conflicts with your disability.",
    "IDHR implementing rules (Subpart J) are proposed and pending formal adoption. Requirements may be updated.",
  ];
  ilItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, "il_item_" + idx, item, y, { checked: true });
  });
  y = addFormTextField(doc, "il_accommodation_contact", "Accommodation request contact:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y += LINE_HEIGHT;

  // NYC Addendum
  y = addSectionHeader(doc, "ADDENDUM B \u2014 New York City (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874)", y);
  y = addWrappedText(
    doc,
    "NYC Local Law 144 (enforcement began July 5, 2023) requires employers to conduct annual independent bias audits before using AEDTs, post audit results publicly, and notify candidates before use.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addWrappedText(
    doc,
    "NOTICE TO NYC CANDIDATES AND EMPLOYEES (per NYC Admin. Code \u00A7 20-871 and 6 RCNY \u00A7 5-301):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const nycItems = [
    "An automated employment decision tool (AEDT) is used to screen candidates for the position applied for.",
    "This AEDT has undergone an annual independent bias audit as required by NYC Local Law 144.",
    "The audit summary is publicly posted on our website (see URL below).",
    "The AEDT assesses the following job qualifications (specify below).",
    "You may request an alternative selection process. Contact us to do so.",
  ];
  nycItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, "nyc_item_" + idx, item, y, { checked: true });
  });
  y = addFormTextField(doc, "nyc_audit_posting_url", "Audit summary posting URL:", y);
  y = addFormTextField(doc, "nyc_qualifications_assessed", "Job qualifications the AEDT assesses:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "nyc_alternative_contact", "Alternative selection process contact:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y += LINE_HEIGHT;

  // Colorado Addendum
  y = addSectionHeader(doc, "ADDENDUM C \u2014 Colorado (C.R.S. \u00A7\u00A7 6-1-1701\u20131707)", y);
  y = addWrappedText(
    doc,
    "Colorado SB24-205 (effective June 30, 2026, per SB 25B-004) requires deployers of high-risk AI systems to notify consumers before making consequential employment decisions and provide the reason for adverse decisions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addWrappedText(
    doc,
    "NOTICE TO COLORADO APPLICANTS AND EMPLOYEES (per C.R.S. \u00A7 6-1-1703(4)):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const coItems = [
    "A high-risk AI system is used in employment decisions that may affect your opportunities.",
    "This AI system has been subject to a data protection impact assessment under \u00A7 6-1-1703(2).",
    "If an adverse decision is made based in whole or in part on the AI system, you may request the principal reason(s) for the decision.",
    "You have the right to appeal an adverse decision and to have a human review your appeal.",
    "Contact us to exercise these rights.",
  ];
  coItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, "co_item_" + idx, item, y, { checked: true });
  });
  y = addFormTextField(doc, "co_rights_contact", "Colorado consumer rights contact:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "co_rights_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });

  addDisclaimer(doc);
  return doc;
}
