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
// CA ADMT Output Explanation Template
// CPPA ADMT Regulations + Cal. Civ. Code § 1798.110
// ============================================================
export function generateAdmtOutputExplanation(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "ADMT Decision Output Explanation — Consumer Response",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template is used by ${data.company.name} to respond to consumer access requests seeking an explanation of an Automated Decision-Making Technology (ADMT) output. Complete one form per access request. The response must be provided within the 45-day response window. Plain language is required — avoid technical jargon. Verify current CPPA requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Consumer and Request Reference
  y = addSectionHeader(doc, "1. Consumer and Request Reference", y);
  y = addFormTextField(
    doc,
    "aoe_request_id",
    "Access Request ID (cross-reference to intake record):",
    y,
    { width: 110 }
  );
  y = addFormTextField(doc, "aoe_consumer_name", "Consumer Name:", y, {
    width: 140,
  });
  y = addFormTextField(
    doc,
    "aoe_response_date",
    "Date This Response Is Prepared:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "aoe_prepared_by",
    "Response Prepared By (name/role):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 2: What ADMT System Was Used
  y = addSectionHeader(doc, "2. What ADMT System Was Used", y);
  y = addWrappedText(
    doc,
    "Describe the ADMT system that was used in plain language a non-technical consumer can understand:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "aoe_system_name", "ADMT System Name:", y, {
    prefill:
      data.aiSystems && data.aiSystems.length > 0
        ? data.aiSystems[0].name
        : "",
    width: 140,
  });
  y = addFormTextField(
    doc,
    "aoe_system_vendor",
    "System Developer / Vendor:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].vendor
          : "",
      width: 140,
    }
  );
  y = addFormTextField(
    doc,
    "aoe_system_description",
    "Plain Language Description of What This System Does:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "aoe_system_purpose",
    "Purpose for Which the System Was Used in This Decision:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: What Data Was Processed
  y = addSectionHeader(doc, "3. What Personal Data Was Processed", y);
  y = addWrappedText(
    doc,
    "Identify each category of personal information the ADMT processed to reach its output for this consumer:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const dataCategories = [
    "Name, contact information, or identifiers",
    "Financial history or credit information",
    "Employment or educational background",
    "Application or form responses submitted by the consumer",
    "Behavioral data (clicks, usage patterns, interactions)",
    "Demographic information (where lawfully used)",
    "Third-party data (bureau data, background check, etc.)",
    "Transaction or account history with this business",
  ];
  dataCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, `aoe_data_${idx}`, cat, y);
  });
  y = addFormTextField(
    doc,
    "aoe_data_other",
    "Other Data Processed (describe):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "aoe_data_source",
    "Where Was the Data Obtained From?",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Key Parameters / Factors in the Decision
  y = addSectionHeader(
    doc,
    "4. Key Parameters and Factors in the ADMT Decision",
    y
  );
  y = addWrappedText(
    doc,
    "Explain the key factors or parameters the ADMT used in plain language. Do not reveal trade secrets, but provide enough information for the consumer to understand why the decision was made:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "aoe_factor_1",
    "Primary Factor 1 (plain language description of how it influenced the output):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "aoe_factor_2",
    "Primary Factor 2:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "aoe_factor_3",
    "Primary Factor 3:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "aoe_factor_4",
    "Additional Factors (if any):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "aoe_factors_not_disclosed",
    "Any Factors Not Disclosed and Reason (e.g., trade secret protection):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: The Output / Recommendation Produced
  y = addSectionHeader(
    doc,
    "5. The Output or Recommendation the ADMT Produced",
    y
  );
  y = addFormTextField(
    doc,
    "aoe_output_description",
    "Plain Language Description of the ADMT Output or Recommendation:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "aoe_output_score",
    "Score, Rating, or Numeric Output (if applicable and not proprietary):",
    y,
    { width: 90 }
  );
  y = addFormTextField(
    doc,
    "aoe_output_scale",
    "Scale or Range of Possible Outputs (for context):",
    y,
    { width: 100 }
  );
  y += LINE_HEIGHT;

  // Section 6: Human Review
  y = addSectionHeader(doc, "6. Human Review of ADMT Output", y);
  y = addWrappedText(
    doc,
    "Describe what human review, if any, occurred before the final decision was made:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const reviewTypes = [
    "No human review — ADMT output was the final decision (fully automated)",
    "Human reviewed ADMT output before confirming the decision",
    "Human could override ADMT output and did review the full record",
    "Human made the final decision with ADMT output as one advisory input",
  ];
  reviewTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `aoe_review_${idx}`, type, y);
  });
  y = addFormTextField(
    doc,
    "aoe_review_role",
    "Role of Person Who Reviewed ADMT Output (if applicable):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "aoe_review_description",
    "Description of Human Review Process:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "aoe", y);

  addDisclaimer(doc);
  return doc;
}
