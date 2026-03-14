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
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generateConsumerRightsProcedures(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s response to consumer rights requests under Conn. Gen. Stat. § 42-518 (Connecticut Data Privacy Act, P.A. 22-15, eff. July 1, 2023). Under § 42-519(a), the controller must respond to authenticated consumer requests within 45 days, with the option to extend by an additional 45 days with prior notice to the consumer. The mandatory 60-day cure period for Attorney General enforcement expired December 31, 2024; the AG now has enforcement discretion (§ 42-525(a)).`,
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
    "Designated request channels (email, web form, mailing address):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Identity Verification Procedure", y);
  y = addWrappedText(
    doc,
    "Per Conn. Gen. Stat. § 42-519(a), the controller must take reasonable steps to authenticate consumer requests before responding. Recommended Best Practice — not a statutory mandate: do not require information beyond what is reasonably necessary to verify identity.",
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
      right: "Right to Confirm and Access (§ 42-518(a)(1))",
      procedure:
        "Confirm whether personal data is being processed and, if so, provide the consumer access to that data. Respond within 45 days. Format: reasonably accessible and technically feasible.",
    },
    {
      right: "Right to Correct (§ 42-518(a)(2))",
      procedure:
        "Correct inaccurate personal data as requested, taking into account the nature of the data and the purposes of processing. Respond within 45 days.",
    },
    {
      right: "Right to Delete (§ 42-518(a)(3))",
      procedure:
        "Delete personal data concerning the consumer upon request. Document applicable exceptions under § 42-518(c). Respond within 45 days.",
    },
    {
      right: "Right to Portability (§ 42-518(a)(4))",
      procedure:
        "Provide a copy of the personal data the consumer provided to the controller in a portable, technically feasible, readily usable format that allows transfer to another controller. Respond within 45 days.",
    },
    {
      right:
        "Right to Opt Out of Targeted Advertising (§ 42-518(a)(5))",
      procedure:
        "Cease processing the consumer's personal data for targeted advertising upon receipt of a valid opt-out request. Recommended Best Practice — not a statutory mandate: process within 15 business days.",
    },
    {
      right: "Right to Opt Out of Sale of Personal Data (§ 42-518(a)(5))",
      procedure:
        "Cease selling the consumer's personal data within a reasonable time after receiving the opt-out.",
    },
    {
      right:
        "Right to Opt Out of Profiling for Consequential Decisions (§ 42-518(a)(6))",
      procedure:
        "Cease using the consumer's personal data for profiling in furtherance of decisions that produce legal or similarly significant effects concerning the consumer. This right is separate from the general opt-out under § 42-518(a)(5).",
    },
  ];

  rightsAndProcedures.forEach((item) => {
    y = addSectionHeader(doc, item.right, y);
    y = addWrappedText(
      doc,
      item.procedure,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Appeals Process", y);
  y = addWrappedText(
    doc,
    "Per Conn. Gen. Stat. § 42-519(b), if the controller declines to act on a consumer's request, the consumer has the right to appeal within a reasonable period after receiving notice of the controller's decision. The controller must provide notice of the appeal outcome within 60 days and, if the appeal is denied, must provide information on how the consumer may contact the Connecticut Attorney General to submit a complaint.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "appeals_method",
    "Appeals submission method and contact:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Connecticut AG complaint portal: https://portal.ct.gov/AG/Common/Complaint-Form-Landing-page",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Responsible Party", y);
  y = addFormTextField(
    doc,
    "resp_name",
    "Privacy Officer / Responsible Party:",
    y,
    {
      prefill: data.contact.name,
      readOnly: false,
    }
  );
  if (data.contact.email)
    y = addFormTextField(doc, "resp_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(
    doc,
    "resp_effective",
    "Procedures Effective Date:",
    y
  );

  addDisclaimer(doc);
  return doc;
}
