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
// Minnesota MCDPA — Minn. Stat. §§ 325M.10–325M.21
// ============================================================
export function generateConsumerRightsProcedures(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s response to consumer rights requests under Minn. Stat. § 325M.14 (Minnesota Consumer Data Privacy Act, eff. July 31, 2025). Under \u00A7 325M.15, the controller must respond to authenticated consumer requests within 45 days, with the option to extend by an additional 45 days with notice to the consumer (\u00A7 325M.15(b)).`,
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
    "Per Minn. Stat. § 325M.15(a), the controller must take reasonable steps to authenticate consumer requests before responding. Recommended Best Practice \u2014 not a statutory mandate: do not require information beyond what is reasonably necessary to verify identity.",
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
      right: "Right to Access (\u00A7 325M.14(a)(1))",
      procedure:
        "Provide the consumer with: (1) whether personal data is being processed; (2) the categories of personal data processed; (3) a copy of the personal data. Respond within 45 days. Format: machine-readable and portable.",
    },
    {
      right: "Right to Correct (\u00A7 325M.14(a)(2))",
      procedure:
        "Correct inaccurate personal data as requested, taking into account the nature of the data and the purposes of processing. Respond within 45 days.",
    },
    {
      right: "Right to Delete (\u00A7 325M.14(a)(3))",
      procedure:
        "Delete personal data concerning the consumer upon request. Exceptions: data necessary for the provision of a requested product or service, compliance with a legal obligation, or other \u00A7 325M.14(e) exceptions. Respond within 45 days.",
    },
    {
      right: "Right to Portability (\u00A7 325M.14(a)(4))",
      procedure:
        "Provide a copy of the personal data the consumer provided to the controller in a portable, technically feasible, readily usable format allowing transfer to another controller. Respond within 45 days.",
    },
    {
      right: "Right to Opt Out of Targeted Advertising (\u00A7 325M.14(a)(5)(i))",
      procedure:
        "Cease processing the consumer\u2019s personal data for targeted advertising within a reasonable time after receiving the opt-out. Recommended Best Practice \u2014 not a statutory mandate: process within 15 business days.",
    },
    {
      right: "Right to Opt Out of Data Sales (\u00A7 325M.14(a)(5)(ii))",
      procedure:
        "Cease selling the consumer\u2019s personal data within a reasonable time after receiving the opt-out.",
    },
    {
      right: "Right to Opt Out of Profiling (\u00A7 325M.14(a)(5)(iii))",
      procedure:
        "Cease using the consumer\u2019s personal data for profiling for consequential decisions. Consequential decisions include those that affect access to financial, healthcare, educational, and employment opportunities.",
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
    "Per Minn. Stat. § 325M.15(d), if the controller declines to act on a request, the consumer has the right to appeal. The controller must provide an appeals process within a reasonable period after the consumer submits an appeal, and must inform the consumer of the outcome and reasons for the decision. If the appeal is denied, the controller must provide the consumer with information about how to contact the Minnesota Attorney General to submit a complaint.",
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
