import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Consumer Access/Information Procedures
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generateConsumerAccessProcedures(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Access / Information Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s response to consumer requests for information about ADMT use and access to personal information processed by ADMT, pursuant to the CPPA ADMT regulations under Cal. Civ. Code \u00A7 1798.100 et seq., effective January 1, 2026. Consumers have the right to know what personal information a business has about them and how it is used in automated decisions. Verify current CPPA requirements at cppa.ca.gov before relying on these procedures.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Request Submission Methods", y);
  y = addFormTextField(
    doc,
    "request_methods",
    "How consumers submit access requests:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Under Cal. Civ. Code \u00A7 1798.130(a)(1), businesses must provide two or more methods for submitting requests. Recommended Best Practice \u2014 not a statutory mandate: include a toll-free phone number and a web form at minimum.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Identity Verification", y);
  y = addFormTextField(
    doc,
    "verification_method",
    "Identity verification procedure:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Per Cal. Civ. Code \u00A7 1798.130(a)(6), businesses may not require consumers to create an account to submit a request. Verification must be reasonably necessary and proportionate to the sensitivity of the information requested.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Response Timelines", y);
  const timelines = [
    "Acknowledge receipt of request: within 10 business days (recommended best practice \u2014 not a statutory mandate for non-accountable businesses under ADMT regs)",
    "Respond to request: within 45 days of receipt (Cal. Civ. Code \u00A7 1798.130(a)(2))",
    "Extension if necessary: additional 45 days with notice to consumer (\u00A7 1798.130(a)(2))",
    "Format of response: readily usable format allowing consumer to transmit information (portability requirement, \u00A7 1798.100(d))",
  ];
  timelines.forEach((tl) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + tl,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "What Information to Provide", y);
  const responseItems = [
    "Categories of personal information collected and used in ADMT",
    "Specific pieces of personal information used (upon verified request)",
    "Categories of third parties with whom personal information is shared",
    "Purpose for which the personal information was used in ADMT",
    "Logic of the ADMT (in plain language, to the extent technically feasible)",
  ];
  responseItems.forEach((item, idx) => {
    y = addWrappedText(
      doc,
      `${idx + 1}. ${item}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Internal Routing and Fulfillment", y);
  y = addFormTextField(
    doc,
    "routing_privacy",
    "Privacy team responsible for request review:",
    y
  );
  y = addFormTextField(
    doc,
    "routing_admt",
    "ADMT system owner for providing logic explanation:",
    y
  );
  y = addFormTextField(
    doc,
    "routing_data",
    "Data team responsible for extracting personal information:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Appeals and Escalation", y);
  y = addWrappedText(
    doc,
    "If a consumer disagrees with the business\u2019s response to an access request, they may file a complaint with the California Privacy Protection Agency at cppa.ca.gov.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(doc, "admin_name", "Privacy Officer / Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "effective_date", "Procedures Effective Date:", y);

  addDisclaimer(doc);
  return doc;
}
