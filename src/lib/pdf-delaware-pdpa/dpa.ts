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
// DOCUMENT 1: Data Protection Assessment for Profiling
// Delaware PDPA — Del. Code tit. 6, ch. 12D, §§ 12D-101 through 12D-111
// ============================================================
export function generateDataProtectionAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Protection Assessment for Profiling", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Protection Assessment is conducted by ${data.company.name} pursuant to Del. Code tit. 6, \u00A7 12D-109(a), which requires controllers to conduct and document a data protection assessment for processing activities that present a heightened risk to consumers. Covered activities include processing for targeted advertising, sale of personal data, profiling for consequential decisions, and processing sensitive data. These assessments must be made available to the Delaware Attorney General upon request (\u00A7 12D-109(b)).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Assessment for: ${sys.name}`, y);

    y = addFormTextField(doc, `dpa_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(doc, `dpa_${idx}_reviewer`, "Completed By (Name/Title):", y);
    y += 4;

    y = addWrappedText(
      doc,
      "Processing activities triggering this assessment (per \u00A7 12D-109(a)) \u2014 check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const triggers = [
      "Processing for targeted advertising (\u00A7 12D-109(a)(1))",
      "Sale of personal data (\u00A7 12D-109(a)(2))",
      "Processing for profiling \u2014 consequential decisions (\u00A7 12D-109(a)(3))",
      "Processing sensitive data (\u00A7 12D-109(a)(4))",
    ];
    triggers.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `dpa_${idx}_trigger_${tidx}`, t, y);
    });
    y += 4;

    y = addFormTextField(doc, `dpa_${idx}_purpose`, "Specific purpose of processing:", y, {
      multiline: true,
      lines: 2,
    });

    y = addWrappedText(doc, "Benefits of processing:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `dpa_${idx}_benefits`, "", y, { multiline: true, lines: 2 });

    y = addWrappedText(
      doc,
      "Risks to consumers \u2014 including potential for unfair or discriminatory impact (\u00A7 12D-109(a)):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_risks`, "", y, { multiline: true, lines: 3 });

    y = addWrappedText(
      doc,
      "Safeguards implemented to address identified risks:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_safeguards`, "", y, { multiline: true, lines: 3 });

    y = addWrappedText(
      doc,
      "Conclusion \u2014 do the benefits of processing outweigh the risks to consumers?",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_conclusion`, "", y, { multiline: true, lines: 2 });

    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Review and Approval", y);
  y = addFormTextField(doc, "review_name", "Reviewed By (Name/Title):", y);
  y = addFormTextField(doc, "review_date", "Review Date:", y);
  y = addFormTextField(doc, "review_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: review assessments annually and when processing activities change significantly. Retain assessments and make available to the Delaware AG upon request (\u00A7 12D-109(b)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
