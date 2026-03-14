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
// DOCUMENT 4: Opt-Out Documentation
// Virginia CDPA — Va. Code §§ 59.1-575 through 59.1-584
// ============================================================
export function generateOptOutDocumentation(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Opt-Out Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s implementation of consumer opt-out rights under Va. Code § 59.1-577(A)(5) (Virginia Consumer Data Protection Act, eff. January 1, 2023). Consumers have the right to opt out of: (i) processing for targeted advertising; (ii) sale of personal data; and (iii) profiling in furtherance of decisions that produce legal or similarly significant effects. Per § 59.1-578(D), if the controller sells personal data or processes personal data for targeted advertising, the controller must clearly and conspicuously disclose this and the manner in which the consumer may opt out.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Categories Applicable to This Organization", y);
  y = addWrappedText(
    doc,
    "Check all opt-out categories that apply to this organization's data processing activities:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const optOutCategories = [
    "Targeted advertising (§ 59.1-577(A)(5)(i)) — processing personal data to display advertisements based on consumer activities across unaffiliated websites or online applications",
    "Sale of personal data (§ 59.1-577(A)(5)(ii)) — exchange of personal data for monetary or other valuable consideration",
    "Profiling for consequential decisions (§ 59.1-577(A)(5)(iii)) — automated processing producing legal or similarly significant effects (employment, credit, housing, insurance, education, healthcare, legal services)",
  ];
  let cbCount = 0;
  optOutCategories.forEach((cat) => {
    y = addFormCheckbox(doc, "optcat_" + cbCount, cat, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Targeted Advertising Opt-Out Mechanism", y);
  y = addFormTextField(doc, "ta_optout_url", "URL or location of opt-out:", y);
  y = addFormTextField(
    doc,
    "ta_optout_method",
    "How opt-out signals are captured and stored:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ta_optout_processing_time",
    "Time to process opt-out after receipt:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Data Sales Opt-Out Mechanism", y);
  y = addFormTextField(doc, "ds_optout_url", "URL or location of opt-out:", y);
  y = addFormTextField(
    doc,
    "ds_optout_method",
    "How opt-out signals are captured and stored:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ds_optout_processing_time",
    "Time to process opt-out after receipt:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Profiling Opt-Out Mechanism", y);
  y = addFormTextField(
    doc,
    "prof_optout_url",
    "URL or location of opt-out:",
    y
  );
  y = addFormTextField(
    doc,
    "prof_optout_method",
    "How opt-out signals are captured and stored:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "prof_optout_processing_time",
    "Time to process opt-out after receipt:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Systems Affected by Opt-Out", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sys_${idx}_optout_action`,
      "  Action taken when opt-out received:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Request Log", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice — not a statutory mandate: log all opt-out requests for at least 3 years.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  for (let i = 1; i <= 3; i++) {
    y = addWrappedText(
      doc,
      `Request #${i}:`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `log_${i}_consumer`, "  Consumer ID / Reference:", y);
    y = addFormTextField(doc, `log_${i}_date`, "  Date Received:", y);
    y = addFormTextField(
      doc,
      `log_${i}_category`,
      "  Opt-Out Category (targeted ads / data sales / profiling):",
      y
    );
    y = addFormTextField(doc, `log_${i}_processed`, "  Date Processed:", y);
    y += 4;
  }

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(doc, "admin_name", "Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });

  addDisclaimer(doc);
  return doc;
}
