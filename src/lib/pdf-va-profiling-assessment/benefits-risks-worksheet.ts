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
// Benefits vs. Risks Weighing Worksheet
// Virginia CDPA — Va. Code § 59.1-580(C)
// ============================================================
export function generateBenefitsRisksWorksheet(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Benefits vs. Risks Weighing Worksheet",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This worksheet supports the data protection assessment conducted by ${data.company.name} under Va. Code § 59.1-580(C). Section (C) requires that when weighing the benefits against the risks of a processing activity, the controller must consider the context of the processing, the proportionality of the processing relative to its purpose, the reasonable expectations of consumers, and the controller-consumer relationship. Complete one worksheet per processing activity. Retain with the associated data protection assessment.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(
      doc,
      `Weighing Worksheet — Processing Activity: ${sys.name}`,
      y
    );

    y = addFormTextField(doc, `brw_${idx}_date`, "Worksheet Date:", y);
    y = addFormTextField(doc, `brw_${idx}_reviewer`, "Completed By (Name / Title):", y);
    y = addFormTextField(
      doc,
      `brw_${idx}_activity_summary`,
      "Processing Activity Summary (cross-reference to DPA section):",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    // Benefits block
    y = addSectionHeader(doc, `Benefits Assessment — ${sys.name}`, y);

    y = addFormTextField(
      doc,
      `brw_${idx}_benefits_controller`,
      "Benefits to controller (operational, financial, strategic, legal):",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_benefits_consumer`,
      "Benefits to consumers (direct value, convenience, access, pricing):",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_benefits_public`,
      "Benefits to the public or society (if applicable):",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    // Risks block
    y = addSectionHeader(doc, `Risks Assessment — ${sys.name}`, y);

    y = addFormTextField(
      doc,
      `brw_${idx}_potential_risks`,
      "Potential risks to consumers from this processing activity (describe all foreseeable harms):",
      y,
      { multiline: true, lines: 4 }
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_safeguards`,
      "Safeguards in place to reduce identified risks:",
      y,
      { multiline: true, lines: 4 }
    );
    y += 4;

    // De-identified alternative assessment (§ 59.1-580(C))
    y = addSectionHeader(doc, `De-Identified Alternative Assessment — ${sys.name}`, y);
    y = addWrappedText(
      doc,
      "Virginia best practice under § 59.1-580(C): consider whether the purpose could be achieved using de-identified or aggregate data in lieu of personal data.",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    y = addFormCheckbox(
      doc,
      `brw_${idx}_deid_considered`,
      "De-identified data alternative was considered",
      y
    );
    y = addFormCheckbox(
      doc,
      `brw_${idx}_deid_feasible`,
      "De-identified data alternative is feasible (if checked, explain why personal data is nonetheless used below)",
      y
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_deid_assessment`,
      "De-identified alternative assessment (why personal data is necessary, or why alternative is not feasible):",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    // Contextual factors (§ 59.1-580(C))
    y = addSectionHeader(doc, `Contextual Factors — ${sys.name} (§ 59.1-580(C))`, y);

    y = addFormTextField(
      doc,
      `brw_${idx}_consumer_expectations`,
      "Reasonable consumer expectations — what would a reasonable consumer in the relevant context expect about this processing activity?",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_controller_consumer_relationship`,
      "Controller-consumer relationship context — describe the nature of the relationship and how it bears on whether processing is appropriate:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_proportionality`,
      "Proportionality — is the scope, depth, and use of personal data proportionate to the stated purpose? Explain:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    // Final weighing determination
    y = addSectionHeader(doc, `Final Weighing Determination — ${sys.name}`, y);
    y = addWrappedText(
      doc,
      "After considering all benefits, risks, safeguards, contextual factors, and available alternatives, state whether the benefits of this processing activity outweigh its risks and justify the determination:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    y = addFormCheckbox(
      doc,
      `brw_${idx}_determination_approved`,
      "BENEFITS OUTWEIGH RISKS — processing activity is approved to proceed",
      y
    );
    y = addFormCheckbox(
      doc,
      `brw_${idx}_determination_conditional`,
      "CONDITIONAL — processing may proceed with additional safeguards (specify below)",
      y
    );
    y = addFormCheckbox(
      doc,
      `brw_${idx}_determination_prohibited`,
      "RISKS OUTWEIGH BENEFITS — processing activity should not proceed as described",
      y
    );
    y = addFormTextField(
      doc,
      `brw_${idx}_justification`,
      "Justification and any required additional safeguards:",
      y,
      { multiline: true, lines: 4 }
    );

    y += LINE_HEIGHT * 2;
  });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "brw", y);

  addDisclaimer(doc);
  return doc;
}
