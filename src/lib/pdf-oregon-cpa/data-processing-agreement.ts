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
// Oregon CPA — ORS §§ 646A.570 through 646A.604
// ============================================================
export function generateDataProcessingAgreement(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Processing Agreement Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Processing Agreement (DPA) template is provided for use by ${data.company.name} when engaging processors that process personal data on its behalf. ORS § 646A.581 requires that contracts between controllers and processors govern the processor's data processing procedures and include: (1) instructions for processing personal data; (2) the nature and purpose of processing; (3) the type of data and duration of processing; (4) the rights and obligations of each party; and (5) the processor obligations listed in § 646A.581(2). This template addresses each required element.`,
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

  y = addSectionHeader(doc, "Processing Instructions (per § 646A.581(1)(a))", y);
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

  y = addSectionHeader(doc, "Processor Obligations (per § 646A.581(2))", y);
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
    "Process personal data only on controller's documented instructions (§ 646A.581(2)(a))",
    "Ensure persons authorized to process the data are subject to confidentiality obligations (§ 646A.581(2)(b))",
    "Delete or return all personal data to the controller upon request at end of services (§ 646A.581(2)(c))",
    "Make available all information necessary to demonstrate compliance with § 646A.581 (§ 646A.581(2)(d))",
    "Allow and contribute to reasonable audits by the controller (§ 646A.581(2)(d))",
    "Engage sub-processors only with controller's authorization and under equivalent obligations (§ 646A.581(2)(e))",
    "Implement appropriate technical and organizational security measures (§ 646A.581(1))",
    "Assist the controller in meeting consumer rights obligations including children's data consent (§ 646A.576(1)(c))",
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
    "The processor must assist the controller in fulfilling consumer rights requests under ORS § 646A.574, including access, correction, deletion, portability, and opt-out requests, within timeframes that allow the controller to meet its 45-day response obligation under § 646A.576(2)(a). The processor must also cooperate with children's data consent requirements under § 646A.576(1)(c).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Signatures", y);

  y = addSectionHeader(doc, "Controller Signature", y);
  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "or_controller", y);

  y = addSectionHeader(doc, "Processor Signature", y);
  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "or_processor", y);

  addDisclaimer(doc);
  return doc;
}
