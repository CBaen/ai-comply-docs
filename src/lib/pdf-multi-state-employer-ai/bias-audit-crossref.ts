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
// DOCUMENT 4: Bias Audit Cross-Reference Guide
// IL HB3773 + NYC LL144 + CO SB24-205
// ============================================================
export function generateBiasAuditCrossRef(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Bias Audit Cross-Reference Guide", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This guide helps ${data.company.name} understand and coordinate bias audit requirements across Illinois HB3773 (775 ILCS 5/2-102(L)), NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874), and Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707). Each jurisdiction has different audit requirements, timelines, and what must be done with results.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Illinois HB3773 \u2014 Bias Audit Requirements", y);
  const ilAudit = [
    "Illinois law does NOT mandate a bias audit.",
    "However, conducting an audit is the strongest evidence of good faith if a discrimination claim arises.",
    "An audit showing no adverse impact is powerful evidence against IDHR complaints.",
    "Audit methodology: EEOC 4/5 (80%) adverse impact rule is the recognized standard (29 CFR \u00A7 1607.4(D)).",
    "Retention: Retain audit records for at least 3 years (recommended best practice).",
  ];
  ilAudit.forEach((item, idx) => {
    y = addFormCheckbox(doc, "il_audit_" + idx, item, y, { checked: false });
  });
  y = addFormTextField(doc, "il_audit_date", "Last audit date (if conducted):", y);
  y = addFormTextField(doc, "il_auditor", "Auditor (if conducted):", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "NYC Local Law 144 \u2014 Bias Audit Requirements", y);
  const nycAudit = [
    "Annual independent bias audit REQUIRED before using each AEDT for hiring or promotion in NYC.",
    "Audit must be conducted by an independent auditor (not affiliated with the employer or AEDT developer).",
    "Audit summary must be posted publicly on the employer\u2019s website at least 10 business days before AEDT use.",
    "Audit must include: impact ratios for sex, race/ethnicity categories per EEOC EEO-1 reporting categories.",
    "DCWP rules at 6 RCNY \u00A7 5-302 govern audit methodology requirements.",
    "Proactive DCWP investigations began in 2026.",
  ];
  nycAudit.forEach((item, idx) => {
    y = addFormCheckbox(doc, "nyc_audit_" + idx, item, y, { checked: false });
  });
  y = addFormTextField(doc, "nyc_audit_date", "Most recent audit date:", y);
  y = addFormTextField(doc, "nyc_auditor", "Independent auditor name:", y);
  y = addFormTextField(doc, "nyc_posting_date", "Date audit summary posted publicly:", y);
  y = addFormTextField(doc, "nyc_posting_url", "Public posting URL:", y);
  y = addFormTextField(doc, "nyc_next_audit", "Next required audit date:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Colorado SB24-205 \u2014 Bias Audit Requirements", y);
  const coAudit = [
    "Colorado law does NOT mandate a bias audit, but requires \u201creasonable care\u201d to protect consumers from algorithmic discrimination (\u00A7 6-1-1703(1)).",
    "A bias audit is strong evidence of reasonable care and is part of the \u201caffirmative defense\u201d under \u00A7 6-1-1705.",
    "Audit must examine whether the AI system produces disparate impact on protected classes.",
    "Audit results should be documented in the data protection impact assessment (\u00A7 6-1-1703(2)).",
    "Colorado law takes effect June 30, 2026. Begin audit process before that date.",
  ];
  coAudit.forEach((item, idx) => {
    y = addFormCheckbox(doc, "co_audit_" + idx, item, y, { checked: false });
  });
  y = addFormTextField(doc, "co_audit_date", "Audit date (if conducted):", y);
  y = addFormTextField(doc, "co_auditor", "Auditor:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Unified Audit Schedule", y);
  y = addWrappedText(
    doc,
    "Recommended approach: schedule a single annual audit that satisfies NYC LL144\u2019s annual requirement and also serves as evidence of reasonable care for IL and CO. The audit should cover all AEDTs used across all three jurisdictions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "unified_audit_date", "Next unified audit date:", y);
  y = addFormTextField(doc, "unified_auditor", "Selected auditor:", y);
  y = addFormTextField(doc, "audit_scope", "Systems to be audited:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "audit_coordinator", "Audit program coordinator:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });

  addDisclaimer(doc);
  return doc;
}
