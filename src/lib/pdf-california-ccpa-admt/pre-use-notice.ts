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
// DOCUMENT 1: Pre-Use ADMT Notice Template
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// CPPA ADMT Regulations, effective January 1, 2026
// ============================================================
export function generatePreUseNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Pre-Use ADMT Notice Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Pre-Use Notice is provided by ${data.company.name} pursuant to the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations under the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.), effective January 1, 2026. The CPPA regulations require businesses to provide notice to consumers before using ADMT to make a decision that produces a legal or similarly significant effect on the consumer. This template should be reviewed by qualified legal counsel before use and verified against current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Notice to Consumer", y);
  y = addWrappedText(
    doc,
    `${data.company.name} uses automated decisionmaking technology (ADMT) in connection with the following activities. This notice describes the ADMT used, the personal information processed, the decision being made, and your rights.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `ADMT System ${idx + 1}: ${sys.name}`, y);

    y = addFormTextField(
      doc,
      `admt_${idx}_purpose`,
      "Purpose of ADMT use (what decision is being made):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `admt_${idx}_logic`,
      "General logic of the ADMT (how it works in plain language):",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `admt_${idx}_data_types`,
      "Categories of personal information used:",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `admt_${idx}_consequences`,
      "Possible consequences of the ADMT-driven decision on the consumer:",
      y,
      { multiline: true, lines: 2 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Your Rights Regarding ADMT", y);
  const rights = [
    "You have the right to opt out of the use of ADMT that produces legal or similarly significant effects on you. See our opt-out instructions below.",
    "You have the right to request human review of a decision made using ADMT that produced a legal or similarly significant effect on you.",
    "You have the right to access information about the ADMT used to make decisions about you.",
    "You have the right to correct personal information that was used in an ADMT decision.",
  ];
  rights.forEach((r, idx) => {
    y = addFormCheckbox(doc, "right_" + idx, r, y, { checked: true });
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How to Opt Out or Request Human Review", y);
  y = addFormTextField(
    doc,
    "optout_method",
    "Opt-out submission method (URL, email, or address):",
    y
  );
  y = addFormTextField(
    doc,
    "human_review_method",
    "How to request human review:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Contact Information", y);
  y = addFormTextField(doc, "contact_name", "Contact Name:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "contact_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "notice_date", "Notice Effective Date:", y, {
    prefill: data.generatedDate,
    readOnly: false,
  });

  addDisclaimer(doc);
  return doc;
}
