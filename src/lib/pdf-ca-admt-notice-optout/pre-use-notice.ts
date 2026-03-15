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
// CA ADMT Pre-Use Notice per §7220
// CPPA ADMT Regulations (eff. 1-1-26) + Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generatePreUseNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Pre-Use Notice (§7220)", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Pre-Use Notice is provided by ${data.company.name} in compliance with California Privacy Protection Agency (CPPA) Automated Decision-Making Technology (ADMT) regulations, specifically Section 7220 of Title 11, California Code of Regulations. Businesses must provide this notice BEFORE using ADMT to make or contribute to decisions that produce legal or similarly significant effects. Verify current CPPA requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Business and ADMT Identification
  y = addSectionHeader(doc, "1. Business and ADMT System Identification", y);
  y = addFormTextField(doc, "pun_business_name", "Business Name:", y, {
    prefill: data.company.name,
    readOnly: true,
    width: 140,
  });
  y = addFormTextField(doc, "pun_admt_name", "Name of ADMT System:", y, {
    prefill:
      data.aiSystems && data.aiSystems.length > 0
        ? data.aiSystems[0].name
        : "",
    width: 140,
  });
  y = addFormTextField(doc, "pun_admt_vendor", "ADMT Vendor / Developer:", y, {
    prefill:
      data.aiSystems && data.aiSystems.length > 0
        ? data.aiSystems[0].vendor
        : "",
    width: 140,
  });
  y += LINE_HEIGHT;

  // Section 2: Plain Language Explanation of ADMT Purpose (§7220 requirement)
  y = addSectionHeader(
    doc,
    "2. Plain Language Explanation of ADMT Purpose (§7220)",
    y
  );
  y = addWrappedText(
    doc,
    "Per §7220, the notice must include a plain language explanation of the specific purpose for which the business is using ADMT — not a generic description. Complete each field below for this specific deployment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "pun_specific_purpose",
    "Specific Purpose for Using ADMT (plain language, not generic):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "pun_decision_type",
    "Type of Decision ADMT Contributes To (e.g., loan approval, hiring screening, insurance pricing):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pun_data_processed",
    "Categories of Personal Information Processed by the ADMT:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "pun_output_description",
    "What the ADMT Produces or Recommends (describe the output):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Legal or Similarly Significant Effect
  y = addSectionHeader(
    doc,
    "3. Legal or Similarly Significant Effect on Consumer",
    y
  );
  y = addWrappedText(
    doc,
    "Identify which legal or similarly significant effect this ADMT decision may produce. Check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const effects = [
    "Financial services (credit, lending, banking)",
    "Housing (rental, purchase, mortgage)",
    "Employment (hiring, firing, pay, promotion)",
    "Insurance (eligibility, pricing, coverage)",
    "Healthcare (treatment, coverage, access)",
    "Education (enrollment, admission, opportunity)",
    "Access to essential government services",
    "Legal services or access to justice",
    "Other similarly significant effect (describe below)",
  ];
  effects.forEach((effect, idx) => {
    y = addFormCheckbox(doc, `pun_effect_${idx}`, effect, y);
  });
  y = addFormTextField(doc, "pun_effect_other", "Other effect (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // Section 4: Consumer's Right to Opt Out (§7220 mandatory element)
  y = addSectionHeader(
    doc,
    "4. Consumer's Right to Opt Out of ADMT (§7220 Required Disclosure)",
    y
  );
  y = addWrappedText(
    doc,
    `You have the right to opt out of ${data.company.name}'s use of Automated Decision-Making Technology (ADMT) for the purpose described above. If you exercise this right, we will not use ADMT to make or contribute to decisions that produce legal or similarly significant effects concerning you, and we will provide an alternative process where feasible.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 5: How to Submit an Opt-Out Request (§7220 mandatory element)
  y = addSectionHeader(
    doc,
    "5. How to Submit an Opt-Out Request (§7220 Required Disclosure)",
    y
  );
  y = addWrappedText(
    doc,
    "You may submit an opt-out request through any of the following methods. Configure at least one method before publishing this notice:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "pun_optout_web",
    "Online Opt-Out Form URL (required if business has a website):",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "pun_optout_email",
    "Privacy/ADMT Contact Email Address:",
    y,
    { prefill: data.contact.email || "", width: 130 }
  );
  y = addFormTextField(doc, "pun_optout_phone", "Toll-Free Phone Number:", y, {
    prefill: data.contact.phone || "",
    width: 80,
  });
  y = addFormTextField(
    doc,
    "pun_optout_mail",
    "Mailing Address for Written Opt-Out Requests:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pun_optout_timeline",
    "Processing Timeline (e.g., 'within 45 calendar days of a verifiable request'):",
    y,
    { width: 150 }
  );
  y += LINE_HEIGHT;

  // Section 6: Appeal Right (§7221 mandatory element)
  y = addSectionHeader(
    doc,
    "6. Right to Appeal ADMT Opt-Out Decision (§7221)",
    y
  );
  y = addWrappedText(
    doc,
    `If ${data.company.name} denies your opt-out request, you have the right to appeal that decision. Under §7221, the business must provide a mechanism for you to appeal a denial of your opt-out request. If your appeal is denied, you may submit a complaint to the California Privacy Protection Agency (CPPA) at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "pun_appeal_process",
    "Appeal Process Instructions (how consumer appeals a denial):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "pun_appeal_contact",
    "Appeal Contact (name/role or department):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "pun_appeal_email",
    "Appeal Contact Email or Web Address:",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "pun_appeal_timeline",
    "Appeal Response Timeline:",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 7: Notice Delivery and Timing
  y = addSectionHeader(doc, "7. Notice Delivery and Timing Confirmation", y);
  y = addWrappedText(
    doc,
    "Per §7220, this notice must be provided before using ADMT. Document when and how this notice is delivered:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const deliveryMethods = [
    "Posted in Privacy Notice / Privacy Policy (link provided to consumers)",
    "Displayed at point of data collection",
    "Emailed to consumer prior to ADMT use",
    "Displayed in account settings or consumer portal",
    "Provided in paper form at business location",
  ];
  deliveryMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `pun_delivery_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "pun_delivery_date",
    "Notice First Published / Delivered Date:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "pun_notice_review_date",
    "Next Scheduled Review Date:",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 8: Internal Authorization
  y = addSectionHeader(doc, "8. Internal Authorization", y);
  y = addFormTextField(
    doc,
    "pun_prepared_by",
    "Notice Prepared By (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "pun_approved_by",
    "Notice Approved By (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "pun_approval_date",
    "Approval Date:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "pun_legal_review",
    "Legal Counsel Review Confirmed (name/firm):",
    y,
    { width: 140 }
  );

  addDisclaimer(doc);
  return doc;
}
