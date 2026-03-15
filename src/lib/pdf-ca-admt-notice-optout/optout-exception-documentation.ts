import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CA ADMT Opt-Out Exception Documentation (§7221(b) exceptions)
// CPPA ADMT Regulations + Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generateOptoutExceptionDocumentation(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "ADMT Opt-Out Exception Documentation (§7221(b))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document records ${data.company.name}'s reliance on a statutory exception under §7221(b) of the CPPA ADMT regulations that permits the business to decline or limit a consumer's opt-out request. This form must be completed each time the business invokes an exception and retained for audit purposes. Misuse of exceptions may constitute a CPPA violation. Verify current CPPA guidance at cppa.ca.gov before relying on any exception.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Identification
  y = addSectionHeader(doc, "1. Underlying Opt-Out Request", y);
  y = addFormTextField(
    doc,
    "oed_request_id",
    "Opt-Out Request ID (cross-reference to intake record):",
    y,
    { width: 110 }
  );
  y = addFormTextField(doc, "oed_consumer_name", "Consumer Name:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "oed_request_date", "Original Request Date:", y, {
    width: 70,
  });
  y = addFormTextField(
    doc,
    "oed_admt_system",
    "ADMT System at Issue:",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "oed_decision_type",
    "Decision Type at Issue:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Which §7221(b) Exception Applies
  y = addSectionHeader(
    doc,
    "2. Applicable §7221(b) Exception (Select One — Exactly 3 Exceptions Exist)",
    y
  );
  y = addWrappedText(
    doc,
    "§7221(b) of the CPPA ADMT regulations provides EXACTLY THREE exceptions to the consumer opt-out right. Only these three exceptions exist — no others. Select the exception upon which the business is relying. Fabricating or stretching exceptions is a compliance violation. If none of these three applies, the opt-out request must be honored.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 6;

  y = addFormCheckbox(
    doc,
    "oed_exc_human_appeal",
    "Exception 1 — Human Appeal Exception (§7221(b)(1)): The business provides a method for the consumer to appeal the ADMT decision to a human reviewer who has the authority to overturn the ADMT outcome. If using this exception, the pre-use notice must include appeal information instead of an opt-out mechanism.",
    y
  );
  y += 4;
  y = addFormTextField(
    doc,
    "oed_exc_human_appeal_detail",
    "Describe the human reviewer's role, authority to overturn, and the appeal process provided to the consumer:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "oed_exc_admission_hiring",
    "Exception 2 — Admission/Acceptance/Hiring Exception (§7221(b)(2)): The ADMT is used solely for the purpose of assessing a consumer's ability to perform the job, meet admission requirements, or fulfill similar criteria, AND the ADMT does not result in discrimination against the consumer based on a protected characteristic.",
    y
  );
  y += 4;
  y = addFormTextField(
    doc,
    "oed_exc_admission_hiring_detail",
    "Explain how the ADMT is used solely for ability assessment and document that it does not discriminate based on protected characteristics:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "oed_exc_work_allocation",
    "Exception 3 — Work Allocation/Compensation Exception (§7221(b)(3)): The ADMT is used solely for the purpose of allocating work among workers or determining compensation, AND the ADMT does not result in discrimination against the consumer based on a protected characteristic.",
    y
  );
  y += 4;
  y = addFormTextField(
    doc,
    "oed_exc_work_allocation_detail",
    "Explain how the ADMT is used solely for work allocation or compensation purposes and document that it does not discriminate based on protected characteristics:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 3: Justification
  y = addSectionHeader(
    doc,
    "3. Justification for Relying on Exception",
    y
  );
  y = addWrappedText(
    doc,
    "Provide a specific, detailed justification explaining WHY the selected exception applies to this specific request and ADMT deployment. Generic statements are insufficient. This record may be reviewed by the CPPA.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "oed_justification",
    "Specific Justification for Exception (factual basis):",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "oed_necessity",
    "Why Is ADMT Strictly Necessary? (explain why opt-out cannot be honored without defeating the purpose):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "oed_alternatives_considered",
    "Alternatives Considered (explain why less privacy-invasive alternatives were not feasible):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 4: Documentation of Why Opt-Out Is Not Required
  y = addSectionHeader(
    doc,
    "4. Documentation That Opt-Out Is Not Required",
    y
  );
  y = addWrappedText(
    doc,
    "Attach or reference supporting documentation that substantiates the exception. Check each item that has been reviewed and is on file:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const docItems = [
    "Contract language confirming ADMT is necessary for service delivery",
    "Legal memorandum or outside counsel opinion on legal obligation exception",
    "Regulatory text or agency guidance confirming the legal mandate",
    "Technical assessment confirming ADMT cannot be bypassed without defeating purpose",
    "Data protection impact assessment (DPIA) or risk assessment on file",
    "Privacy team review memo approving this exception",
  ];
  docItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, `oed_doc_${idx}`, item, y);
  });
  y = addFormTextField(
    doc,
    "oed_doc_reference",
    "Document Reference Number(s) / File Location:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Review Date
  y = addSectionHeader(doc, "5. Exception Review Schedule", y);
  y = addWrappedText(
    doc,
    "Exceptions must be reviewed periodically to confirm they remain valid. Continued reliance on an exception that no longer applies is a violation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "oed_exception_date",
    "Date Exception First Invoked:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "oed_review_date",
    "Next Review Date (recommend annually at minimum):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "oed_review_owner",
    "Exception Review Owner (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "oed_exception_end_date",
    "Date Exception Ended (when no longer relied upon):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "oed", y);

  addDisclaimer(doc);
  return doc;
}
