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
// DOCUMENT 3: Consumer Rights Request Procedures
// Montana MCDPA — MCA §§ 30-14-2801 through 30-14-2820
// ============================================================
export function generateConsumerRightsProcedures(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s response to consumer rights requests under MCA \u00A7 30-14-2809 (Montana Consumer Data Privacy Act, effective October 1, 2024). Under \u00A7 30-14-2810, the controller must respond to authenticated consumer requests within 45 days, with the option to extend by an additional 45 days with notice to the consumer (\u00A7 30-14-2810(2)). Montana has the lowest applicability thresholds of any state privacy law (25,000+ consumers, \u00A7 30-14-2803).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How Consumers Submit Requests", y);
  y = addFormTextField(
    doc,
    "request_methods",
    "Designated request channels (email, web form, address):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Identity Verification Procedure", y);
  y = addWrappedText(
    doc,
    "Per MCA \u00A7 30-14-2810(1), the controller must take reasonable steps to authenticate consumer requests before responding. Recommended Best Practice \u2014 not a statutory mandate: do not require information beyond what is reasonably necessary to verify identity.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "verification_method",
    "Identity verification method:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  const rightsAndProcedures = [
    {
      right: "Right to Access (\u00A7 30-14-2809(1)(a))",
      procedure:
        "Provide the consumer with: (1) whether personal data is being processed; (2) the categories of personal data processed; (3) a copy of the personal data. Respond within 45 days. Format: machine-readable and portable.",
    },
    {
      right: "Right to Correct (\u00A7 30-14-2809(1)(b))",
      procedure:
        "Correct inaccurate personal data as requested, taking into account the nature of the data and the purposes of processing. Respond within 45 days.",
    },
    {
      right: "Right to Delete (\u00A7 30-14-2809(1)(c))",
      procedure:
        "Delete personal data concerning the consumer upon request. Apply exceptions under \u00A7 30-14-2809(3) where applicable (legal obligation, provision of requested service, etc.). Respond within 45 days.",
    },
    {
      right: "Right to Portability (\u00A7 30-14-2809(1)(d))",
      procedure:
        "Provide a copy of the personal data the consumer provided to the controller in a portable, technically feasible, readily usable format allowing transfer to another controller. Respond within 45 days.",
    },
    {
      right: "Right to Opt Out of Targeted Advertising (\u00A7 30-14-2809(1)(e)(i))",
      procedure:
        "Cease processing the consumer\u2019s personal data for targeted advertising within a reasonable time after receiving the opt-out. Recommended Best Practice \u2014 not a statutory mandate: process within 15 business days.",
    },
    {
      right: "Right to Opt Out of Data Sales (\u00A7 30-14-2809(1)(e)(ii))",
      procedure:
        "Cease selling the consumer\u2019s personal data within a reasonable time after receiving the opt-out.",
    },
    {
      right: "Right to Opt Out of Profiling (\u00A7 30-14-2809(1)(e)(iii))",
      procedure:
        "Cease using the consumer\u2019s personal data for profiling in furtherance of consequential decisions. Consequential decisions include those that affect access to financial, healthcare, educational, housing, and employment opportunities.",
    },
  ];

  rightsAndProcedures.forEach((item) => {
    y = addSectionHeader(doc, item.right, y);
    y = addWrappedText(doc, item.procedure, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Appeals Process", y);
  y = addWrappedText(
    doc,
    "Per MCA \u00A7 30-14-2810(4), if the controller declines to act on a request, the consumer has the right to appeal. The controller must provide an appeals process within a reasonable period after the consumer submits an appeal and must inform the consumer of the outcome and reasons for the decision. If the appeal is denied, the controller must provide the consumer with information about how to contact the Montana Attorney General to submit a complaint.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "appeals_method",
    "Appeals submission method:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Responsible Party", y);
  y = addFormTextField(doc, "resp_name", "Privacy Officer / Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "resp_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "resp_effective", "Procedures Effective Date:", y);

  addDisclaimer(doc);
  return doc;
}
