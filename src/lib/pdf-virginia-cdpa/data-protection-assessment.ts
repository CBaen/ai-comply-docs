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
// DOCUMENT 2: Data Protection Assessment
// Virginia CDPA — Va. Code §§ 59.1-575 through 59.1-584
// ============================================================
export function generateDataProtectionAssessment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Protection Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Protection Assessment is conducted by ${data.company.name} pursuant to Va. Code § 59.1-580(A), which requires controllers to conduct and document a data protection assessment for processing activities that present a heightened risk of harm to consumers. Covered activities include processing for targeted advertising, sale of personal data, profiling in furtherance of decisions producing legal or similarly significant effects, and processing sensitive data. Assessments must be made available to the Virginia Attorney General upon request (§ 59.1-580(B)). The Virginia Consumer Data Protection Act has been in effect since January 1, 2023.`,
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
      "Processing activities triggering this assessment (per § 59.1-580(A)) — check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const triggers = [
      "Processing for targeted advertising (§ 59.1-580(A)(1))",
      "Sale of personal data (§ 59.1-580(A)(2))",
      "Processing for profiling — legal or similarly significant effects (§ 59.1-580(A)(3))",
      "Processing sensitive data (§ 59.1-580(A)(4))",
      "Processing that presents a heightened risk of harm (§ 59.1-580(A)(5))",
    ];
    triggers.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `dpa_${idx}_trigger_${tidx}`, t, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "For profiling activities — does this processing present a reasonably foreseeable risk of unfair or deceptive treatment, disparate impact, financial or physical injury, intrusion upon solitude, or other substantial injury to consumers? (§ 59.1-580(A)(3)):",
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
  y = addWrappedText(
    doc,
    "Recommended Best Practice — not a statutory mandate: review assessments annually and when processing activities change significantly. Retain assessments and make them available to the Virginia AG upon request (§ 59.1-580(B)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "va_dpa", y);

  addDisclaimer(doc);
  return doc;
}
