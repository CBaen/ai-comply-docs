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
// Montana MCDPA — MCA §§ 30-14-2801 through 30-14-2820
// ============================================================
export function generateDataProtectionAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Protection Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Protection Assessment is conducted by ${data.company.name} pursuant to MCA \u00A7 30-14-2814 (Montana Consumer Data Privacy Act, effective October 1, 2024). MCA \u00A7 30-14-2814 requires controllers to conduct and document a data protection assessment for processing activities that present heightened risk to consumers. Assessments are not retroactive to processing that occurred prior to January 1, 2025. These assessments must be made available to the Montana Attorney General upon request (\u00A7 30-14-2814(3)).`,
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
      "Processing activities triggering this assessment (per \u00A7 30-14-2814(1)) \u2014 check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const triggers = [
      "Processing for targeted advertising (\u00A7 30-14-2814(1)(a))",
      "Sale of personal data (\u00A7 30-14-2814(1)(b))",
      "Processing for profiling \u2014 consequential decisions (\u00A7 30-14-2814(1)(c))",
      "Processing sensitive data (\u00A7 30-14-2814(1)(d))",
    ];
    triggers.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `dpa_${idx}_trigger_${tidx}`, t, y);
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
      "Risks to consumer rights and freedoms (\u00A7 30-14-2814(2)):",
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
      "Safeguards implemented to address identified risks:",
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
      "Conclusion \u2014 do the benefits of processing outweigh the risks?",
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
    "Note: Assessments are not retroactive to processing that occurred prior to January 1, 2025 (\u00A7 30-14-2814). Recommended Best Practice \u2014 not a statutory mandate: review assessments annually and when processing activities change significantly.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
