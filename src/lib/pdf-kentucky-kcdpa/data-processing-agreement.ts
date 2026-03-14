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
// DOCUMENT 5: Data Processing Agreement Template
// Kentucky KCDPA — KRS Chapter 367 (HB 15)
// ============================================================
export function generateDataProcessingAgreement(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Data Processing Agreement Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Processing Agreement (DPA) template is provided for use by ${data.company.name} when engaging processors that process personal data on its behalf. KRS Chapter 367 requires that any contract between a controller and processor include: (1) instructions for processing personal data; (2) the nature and purpose of processing; (3) the type of data and duration of processing; (4) the rights and obligations of each party; and (5) obligations of the processor. This template addresses each required element.`,
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

  y = addSectionHeader(doc, "Processing Instructions (per KRS Chapter 367)", y);
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

  y = addSectionHeader(doc, "Processor Obligations (per KRS Chapter 367)", y);
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
    "Process personal data only on controller\u2019s documented instructions (KRS Chapter 367)",
    "Ensure persons authorized to process the data are bound by confidentiality obligations (KRS Chapter 367)",
    "Delete or return all personal data to the controller upon request at end of services (KRS Chapter 367)",
    "Make available all information necessary to demonstrate compliance with KRS Chapter 367",
    "Allow and contribute to reasonable audits by the controller (KRS Chapter 367)",
    "Engage sub-processors only with controller\u2019s authorization and under equivalent obligations (KRS Chapter 367)",
    "Implement appropriate technical and organizational security measures (KRS Chapter 367)",
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
    "The processor must assist the controller in fulfilling consumer rights requests under KRS Chapter 367, including access, correction, deletion, portability, and opt-out requests, within timeframes that allow the controller to meet its 45-day response obligation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Signatures", y);
  y = addFormTextField(doc, "controller_sig", "Controller Signature:", y);
  y = addFormTextField(doc, "controller_name_sig", "Controller Name/Title:", y);
  y = addFormTextField(doc, "controller_sig_date", "Date:", y);
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "processor_sig", "Processor Signature:", y);
  y = addFormTextField(doc, "processor_name_sig", "Processor Name/Title:", y);
  y = addFormTextField(doc, "processor_sig_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
