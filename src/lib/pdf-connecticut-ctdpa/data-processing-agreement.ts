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
// DOCUMENT 5: Data Processing Agreement Template
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generateDataProcessingAgreement(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Processing Agreement Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Processing Agreement (DPA) template is provided for use by ${data.company.name} when engaging processors that process personal data on its behalf. Conn. Gen. Stat. § 42-521 requires that contracts between controllers and processors govern the processor's data processing procedures and include: (1) instructions for processing personal data; (2) the nature and purpose of processing; (3) the type of data and duration of processing; (4) the rights and obligations of each party; and (5) the processor obligations listed in § 42-521(b). This template addresses each required element.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Parties", y);
  y = addFormTextField(doc, "controller_name", "Controller (Company Name):", y, {
    prefill: data.company.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "controller_address", "Controller Address:", y);
  y = addFormTextField(doc, "processor_name", "Processor (Vendor Name):", y);
  y = addFormTextField(doc, "processor_address", "Processor Address:", y);
  y = addFormTextField(doc, "agreement_date", "Agreement Effective Date:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Processing Instructions (per § 42-521(a)(1))", y);
  y = addFormTextField(
    doc,
    "instructions",
    "Specific processing instructions:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "data_types",
    "Types of personal data to be processed:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "purpose",
    "Nature and purpose of processing:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "duration", "Duration of processing:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Processor Obligations (per § 42-521(b))", y);
  y = addWrappedText(
    doc,
    "Confirm that the agreement imposes the following obligations on the processor (check each):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const processorObligations = [
    "Process personal data only on controller's documented instructions (§ 42-521(b)(1))",
    "Ensure persons authorized to process the data are subject to confidentiality obligations (§ 42-521(b)(2))",
    "Delete or return all personal data to the controller upon request at end of services (§ 42-521(b)(3))",
    "Make available all information necessary to demonstrate compliance with § 42-521 (§ 42-521(b)(4))",
    "Allow and contribute to reasonable audits by the controller (§ 42-521(b)(4))",
    "Engage sub-processors only with controller's authorization and under equivalent obligations (§ 42-521(b)(5))",
    "Implement appropriate technical and organizational security measures (§ 42-521(a))",
    "Assist the controller in meeting consumer rights obligations (§ 42-521(a))",
  ];
  let cbCount = 0;
  processorObligations.forEach((obl) => {
    y = addFormCheckbox(doc, "obl_" + cbCount, obl, y, { checked: true });
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Consumer Rights Cooperation", y);
  y = addWrappedText(
    doc,
    "The processor must assist the controller in fulfilling consumer rights requests under Conn. Gen. Stat. § 42-518, including access, correction, deletion, portability, and opt-out requests, within timeframes that allow the controller to meet its 45-day response obligation under § 42-519(a).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Signatures", y);

  y = addSectionHeader(doc, "Controller Signature", y);
  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ct_controller", y);

  y = addSectionHeader(doc, "Processor Signature", y);
  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ct_processor", y);

  addDisclaimer(doc);
  return doc;
}
