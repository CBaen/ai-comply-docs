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
// DOCUMENT 2: Data Protection Assessment
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generateDataProtectionAssessment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Protection Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Protection Assessment is conducted by ${data.company.name} pursuant to Conn. Gen. Stat. § 42-522(a), which requires controllers to conduct and document a data protection assessment for processing activities that present a heightened risk of harm to consumers. Covered activities include processing for targeted advertising, sale of personal data, profiling for decisions producing legal or similarly significant effects, and processing sensitive data. Assessments must be made available to the Connecticut Attorney General upon request (§ 42-522(c)). The Connecticut Data Privacy Act (P.A. 22-15) has been in effect since July 1, 2023.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Assessment for: ${sys.name}`, y);

    y = addFormTextField(doc, `dpa_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(
      doc,
      `dpa_${idx}_reviewer`,
      "Completed By (Name/Title):",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      "Processing activities triggering this assessment (per § 42-522(a)) — check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const triggers = [
      "Processing for targeted advertising (§ 42-522(a)(1))",
      "Sale of personal data (§ 42-522(a)(2))",
      "Processing for profiling — legal or similarly significant effects (§ 42-522(a)(3))",
      "Processing sensitive data (§ 42-522(a)(4))",
    ];
    triggers.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `dpa_${idx}_trigger_${tidx}`, t, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "For profiling activities — does this processing present a reasonably foreseeable risk of unfair or deceptive treatment, unlawful discriminatory treatment, financial, physical, or reputational injury, or other substantial injury? (§ 42-522(a)(3)):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_risk_profiling`, "", y, {
      multiline: true,
      lines: 2,
    });
    y += 4;

    y = addFormTextField(
      doc,
      `dpa_${idx}_purpose`,
      "Specific purpose of processing:",
      y,
      { multiline: true, lines: 2 }
    );

    y = addWrappedText(
      doc,
      "Benefits of processing:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_benefits`, "", y, {
      multiline: true,
      lines: 2,
    });

    y = addWrappedText(
      doc,
      "Risks to consumer rights and freedoms:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_risks`, "", y, {
      multiline: true,
      lines: 3,
    });

    y = addWrappedText(
      doc,
      "Safeguards implemented to mitigate identified risks:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_safeguards`, "", y, {
      multiline: true,
      lines: 3,
    });

    y = addWrappedText(
      doc,
      "Conclusion — do the benefits of processing, taking into account context and proportionality, outweigh the risks?",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_conclusion`, "", y, {
      multiline: true,
      lines: 2,
    });

    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Review and Approval", y);
  y = addFormTextField(doc, "review_name", "Reviewed By (Name/Title):", y);
  y = addFormTextField(doc, "review_date", "Review Date:", y);
  y = addFormTextField(doc, "review_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice — not a statutory mandate: review assessments annually and when processing activities change significantly. Retain assessments and make them available to the Connecticut AG upon request (§ 42-522(c)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
