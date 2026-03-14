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
// Oregon CPA — ORS §§ 646A.570 through 646A.604
// ============================================================
export function generateConsumerRightsProcedures(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s response to consumer rights requests under ORS § 646A.574 (Oregon Consumer Privacy Act, eff. July 1, 2024). Under § 646A.576(2)(a), the controller must respond to authenticated consumer requests within 45 days, with the option to extend by an additional 45 days with prior notice to the consumer. The 30-day cure period under § 646A.604(2) applies until January 1, 2026; after that date, the AG has discretion on whether to allow cure.`,
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
    "Per ORS § 646A.576(2)(a), the controller must take reasonable steps to authenticate consumer requests before responding. Recommended Best Practice — not a statutory mandate: do not require information beyond what is reasonably necessary to verify identity.",
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
      right: "Right to Confirm and Access (§ 646A.574(1)(a))",
      procedure:
        "Confirm whether personal data is being processed and, if so, provide the consumer access to that data. Respond within 45 days. Format: reasonably accessible and technically feasible.",
    },
    {
      right: "Right to Correct (§ 646A.574(1)(b))",
      procedure:
        "Correct inaccurate personal data as requested, taking into account the nature of the data and the purposes of processing. Respond within 45 days.",
    },
    {
      right: "Right to Delete (§ 646A.574(1)(c))",
      procedure:
        "Delete personal data concerning the consumer upon request. Document applicable exceptions. Respond within 45 days.",
    },
    {
      right: "Right to Portability (§ 646A.574(1)(d))",
      procedure:
        "Provide a copy of the personal data the consumer provided to the controller in a portable, technically feasible, readily usable format that allows transfer to another controller. Respond within 45 days.",
    },
    {
      right: "Right to Opt Out of Targeted Advertising (§ 646A.574(1)(e)(A))",
      procedure:
        "Cease processing the consumer's personal data for targeted advertising upon receipt of a valid opt-out request. Recommended Best Practice — not a statutory mandate: process within 15 business days.",
    },
    {
      right: "Right to Opt Out of Sale of Personal Data (§ 646A.574(1)(e)(B))",
      procedure:
        "Cease selling the consumer's personal data within a reasonable time after receiving the opt-out.",
    },
    {
      right:
        "Right to Opt Out of Profiling for Consequential Decisions (§ 646A.574(1)(e)(C))",
      procedure:
        "Cease using the consumer's personal data for profiling in furtherance of decisions that produce legal or similarly significant effects concerning the consumer.",
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
    "Per ORS § 646A.576(2)(b), if the controller declines to act on a consumer's request, the consumer has the right to appeal. The controller must provide an internal appeals mechanism, provide notice of the outcome within 45 days of receiving the appeal, and if the appeal is denied, inform the consumer of how to contact the Oregon Attorney General to submit a complaint.",
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
    "Oregon AG complaint: https://www.doj.state.or.us/consumer-protection/file-a-complaint/",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Children's Data — Special Procedure", y);
  y = addWrappedText(
    doc,
    "Per ORS § 646A.576(1)(c), the controller may not process personal data of consumers known to be between 13 and 15 years of age for targeted advertising or sale of personal data without first obtaining consent from those consumers. Document the consent collection procedure:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "children_consent_proc",
    "Consent collection procedure for consumers aged 13–15:",
    y,
    { multiline: true, lines: 3 }
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
