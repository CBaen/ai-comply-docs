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
// DOCUMENT 2: Unified Employee/Candidate Notification
// IL HB3773 + NYC LL144 + CO SB24-205
// ============================================================
export function generateUnifiedNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Unified Employee/Candidate AI Notification", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This notification is provided by ${data.company.name} to inform employees and job applicants about the use of artificial intelligence in employment decisions. This template is designed to address notification requirements under Illinois HB3773 (775 ILCS 5/2-102(L), eff. Jan 1, 2026), NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874), and Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707, eff. Jun 30, 2026). Review with qualified legal counsel before use.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "AI Systems Used in Employment Decisions", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `AI System ${idx + 1}: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sys_${idx}_purpose`,
      "  Purpose and function of this AI system:",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `sys_${idx}_vendor`,
      "  Vendor/Developer (if third-party):",
      y
    );

    if (sys.decisions && sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        "  Employment decisions where this system is used:",
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
      sys.decisions.forEach((dec: string) => {
        const label = DECISION_LABELS[dec] || dec;
        y = addWrappedText(doc, `    \u2022 ${label}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
      });
    }
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Jurisdiction-Specific Disclosures", y);

  y = addWrappedText(
    doc,
    "Illinois (775 ILCS 5/2-102(L)): ${data.company.name} uses the AI system(s) above in employment decisions affecting Illinois employees and applicants. AI-generated results are subject to human review. The use of AI in employment decisions must not have a discriminatory effect based on protected class under the Illinois Human Rights Act.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addWrappedText(
    doc,
    "New York City (NYC Admin. Code \u00A7 20-871): If you are a candidate for a position in New York City, an automated employment decision tool (AEDT) may be used to evaluate your candidacy. This AEDT has been subject to an annual bias audit as required by NYC Local Law 144. Audit results are publicly posted at:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "nyc_audit_url", "  [Audit results URL]:", y);
  y += 4;

  y = addWrappedText(
    doc,
    "Colorado (C.R.S. \u00A7 6-1-1703): If you are a consumer in Colorado, this AI system may be used in a consequential decision affecting your employment opportunities. You have the right to request the reason for an adverse decision and to appeal. Contact us at:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Human Oversight", y);
  y = addFormTextField(
    doc,
    "human_oversight",
    "Human oversight process (how decisions are reviewed by a person):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Your Rights and How to Contact Us", y);
  const rights = [
    "Right to request the reason for an adverse employment decision (IL, CO)",
    "Right to an accommodation if AI use conflicts with your disability (IL)",
    "Right to appeal adverse decisions (CO \u00A7 6-1-1703(4)(c))",
    "Right to information about what job qualifications the AEDT assesses (NYC LL144)",
  ];
  rights.forEach((right, idx) => {
    y = addFormCheckbox(doc, "right_" + idx, right, y, { checked: true });
  });
  y += 4;

  y = addFormTextField(doc, "contact_name", "AI Compliance Contact:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "contact_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "contact_phone", "Phone:", y);
  y = addFormTextField(doc, "notice_date", "Notice Date:", y);

  addDisclaimer(doc);
  return doc;
}
