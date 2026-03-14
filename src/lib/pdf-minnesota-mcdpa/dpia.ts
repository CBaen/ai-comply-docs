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
// DOCUMENT 2: Data Protection Impact Assessment
// Minnesota MCDPA — Minn. Stat. §§ 325M.10–325M.21
// ============================================================
export function generateDPIA(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Protection Impact Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Protection Impact Assessment (DPIA) is conducted by ${data.company.name} pursuant to Minn. Stat. § 325M.16, which requires controllers to conduct and document a data protection impact assessment for processing activities that present heightened risk to consumers. Covered activities include processing for targeted advertising, sale of personal data, profiling for consequential decisions, and processing sensitive data. These assessments must be made available to the Minnesota Attorney General upon request (\u00A7 325M.16(c)).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Assessment for: ${sys.name}`, y);

    y = addFormTextField(doc, `dpia_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(
      doc,
      `dpia_${idx}_reviewer`,
      "Completed By (Name/Title):",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      "Processing activities triggering this assessment (per \u00A7 325M.16(a)) \u2014 check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const triggers = [
      "Processing for targeted advertising (\u00A7 325M.16(a)(1))",
      "Sale of personal data (\u00A7 325M.16(a)(2))",
      "Processing for profiling \u2014 consequential decisions (\u00A7 325M.16(a)(3))",
      "Processing sensitive data (\u00A7 325M.16(a)(4))",
    ];
    triggers.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `dpia_${idx}_trigger_${tidx}`, t, y);
    });
    y += 4;

    y = addFormTextField(
      doc,
      `dpia_${idx}_purpose`,
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
    y = addFormTextField(doc, `dpia_${idx}_benefits`, "", y, {
      multiline: true,
      lines: 2,
    });

    y = addWrappedText(
      doc,
      "Risks to consumer rights and freedoms (\u00A7 325M.16(b)(1)\u2013(5)):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpia_${idx}_risks`, "", y, {
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
    y = addFormTextField(doc, `dpia_${idx}_safeguards`, "", y, {
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
    y = addFormTextField(doc, `dpia_${idx}_conclusion`, "", y, {
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
    "Recommended Best Practice \u2014 not a statutory mandate: review DPIAs annually and when processing activities change significantly.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
