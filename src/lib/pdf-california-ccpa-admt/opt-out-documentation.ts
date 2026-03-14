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
// DOCUMENT 3: Consumer Opt-Out Mechanism Documentation
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generateOptOutDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Opt-Out Mechanism Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s implementation of the consumer opt-out right for automated decisionmaking technology (ADMT), pursuant to the CPPA ADMT regulations under Cal. Civ. Code \u00A7 1798.100 et seq., effective January 1, 2026. Consumers have the right to opt out of the use of ADMT to make decisions that produce legal or similarly significant effects. This document must be verified against current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Mechanism Design", y);
  y = addFormTextField(
    doc,
    "optout_location",
    "Location of opt-out mechanism (URL or description):",
    y
  );
  y = addFormTextField(
    doc,
    "optout_label",
    "Label used for opt-out mechanism:",
    y
  );
  y = addWrappedText(
    doc,
    "Opt-out mechanism characteristics (check all that apply):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const optoutChars = [
    "Prominently displayed and easy to find",
    "Requires no more than two steps to complete",
    "Does not require account creation to exercise",
    "Confirmation provided to consumer after opt-out",
    "Mechanism also accepts Global Privacy Control (GPC) signals",
    "Available in the same languages as the primary interface",
  ];
  let cbCount = 0;
  optoutChars.forEach((c) => {
    y = addFormCheckbox(doc, "oc_" + cbCount, c, y, { checked: true });
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Processing Time and Confirmation", y);
  y = addFormTextField(
    doc,
    "processing_time",
    "Maximum time to process opt-out after receipt:",
    y
  );
  y = addFormTextField(
    doc,
    "confirmation_method",
    "How opt-out confirmation is provided to consumer:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Systems Affected by Opt-Out", y);
  y = addWrappedText(
    doc,
    "List each ADMT system affected when a consumer exercises the opt-out right and the resulting action:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys, idx) => {
    y = addFormTextField(
      doc,
      `sys_${idx}_action`,
      `${sys.name} \u2014 action on opt-out:`,
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Exceptions and Limitations", y);
  y = addWrappedText(
    doc,
    "Describe any exceptions where opt-out rights do not apply (e.g., processing necessary for a contract the consumer has requested, legal obligations, safety-critical systems). Recommended Best Practice \u2014 not a statutory mandate: document any exception reliance with legal counsel review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "exceptions", "Applicable exceptions (if any):", y, {
    multiline: true,
    lines: 3,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Record Keeping", y);
  y = addFormTextField(
    doc,
    "records_location",
    "Where opt-out records are stored:",
    y
  );
  y = addFormTextField(
    doc,
    "records_retention",
    "Retention period for opt-out records:",
    y
  );
  y = addFormTextField(doc, "records_responsible", "Responsible party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });

  addDisclaimer(doc);
  return doc;
}
