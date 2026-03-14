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
// DOCUMENT 2: Business Associate Agreement Template (45 CFR 164.308(b) / 164.314)
// ============================================================
export function generateBusinessAssociateAgreement(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Business Associate Agreement — AI Vendor Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Business Associate Agreement ("BAA") template is prepared for use by ${data.company.name} ("Covered Entity") when engaging AI vendors that create, receive, maintain, or transmit electronic protected health information (ePHI) on the Covered Entity's behalf. Execution of a BAA is required under 45 CFR \u00A7 164.308(b)(1) and 45 CFR \u00A7 164.314(a)(1). This template addresses AI-specific obligations not typically addressed in standard BAA templates.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Parties
  y = addSectionHeader(doc, "1. Parties", y);
  y = addFormTextField(doc, "baa_covered_entity", "Covered Entity (your organization):", y, { prefill: data.company.name, readOnly: true });
  y = addFormTextField(doc, "baa_ba_name", "Business Associate (AI vendor name):", y, { width: 140 });
  y = addFormTextField(doc, "baa_ba_address", "Business Associate Address:", y, { width: 140 });
  y = addFormTextField(doc, "baa_effective_date", "Effective Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Section 2: Definitions
  y = addSectionHeader(doc, "2. Key Definitions (per 45 CFR \u00A7 164.103 and \u00A7 164.304)", y);
  const definitions = [
    `"Business Associate" means an entity that creates, receives, maintains, or transmits PHI on behalf of a covered entity. An AI vendor that processes PHI to perform services for ${data.company.name} is a business associate. (45 CFR \u00A7 160.103)`,
    `"Protected Health Information (PHI)" means individually identifiable health information transmitted or maintained in any form. (45 CFR \u00A7 160.103)`,
    `"Electronic PHI (ePHI)" means PHI that is created, received, maintained, or transmitted in electronic form. (45 CFR \u00A7 164.304)`,
    `"AI Services" means the artificial intelligence, machine learning, or automated analytical services provided by the Business Associate that involve PHI, as described in the underlying services agreement.`,
  ];
  definitions.forEach((def) => {
    y = addWrappedText(doc, "  - " + def, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 3: BA Obligations
  y = addSectionHeader(doc, "3. Business Associate Obligations (45 CFR \u00A7 164.314(a)(2))", y);
  const baObligations = [
    "Not use or disclose PHI other than as permitted by this BAA or required by law (45 CFR \u00A7 164.314(a)(2)(i))",
    "Use appropriate safeguards to prevent unauthorized use or disclosure of PHI (45 CFR \u00A7 164.314(a)(2)(ii)(A))",
    "Implement HIPAA Security Rule requirements (45 CFR Part 164, Subpart C) for all ePHI processed by AI systems (45 CFR \u00A7 164.314(a)(2)(ii)(B))",
    "Report to Covered Entity any use or disclosure of PHI not provided for by this BAA, including breaches (45 CFR \u00A7 164.314(a)(2)(i)(C))",
    "Report to Covered Entity any Security Incident of which it becomes aware (45 CFR \u00A7 164.314(a)(2)(i)(C))",
    "Ensure subcontractors that create, receive, maintain, or transmit ePHI on behalf of BA agree to the same restrictions (45 CFR \u00A7 164.314(a)(2)(i)(D))",
    "Make PHI available to Covered Entity to facilitate individual access rights (45 CFR \u00A7 164.314(a)(2)(i)(E))",
    "Make PHI available for amendment and incorporate amendments (45 CFR \u00A7 164.314(a)(2)(i)(F))",
    "Make internal practices, books, and records available to HHS (45 CFR \u00A7 164.314(a)(2)(i)(G))",
    "Return or destroy PHI upon termination of agreement (45 CFR \u00A7 164.314(a)(2)(i)(H))",
  ];
  let cbIdx = 0;
  baObligations.forEach((ob) => {
    y = addFormCheckbox(doc, `ba_ob_${cbIdx}`, ob, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 4: AI-Specific Obligations
  y = addSectionHeader(doc, "4. AI-Specific Obligations", y);
  y = addWrappedText(
    doc,
    "The following AI-specific obligations supplement standard BAA requirements and address risks specific to AI processing of PHI:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const aiObligations = [
    "Disclose all AI model training datasets and confirm no PHI is used in training without separate authorization",
    "Disclose whether AI model outputs could reconstruct or reveal PHI (model inversion risk)",
    "Provide documentation of security controls specific to AI/ML pipelines (data ingestion, model serving, output storage)",
    "Notify Covered Entity within 60 days of any change to AI model architecture that affects PHI processing",
    "Prohibit use of Covered Entity PHI for AI model improvement, retraining, or benchmarking without explicit written authorization",
    "Maintain immutable audit logs of all PHI accessed by AI systems for minimum 6 years (45 CFR \u00A7 164.530(j))",
    "Perform annual penetration testing of AI systems processing ePHI and share results with Covered Entity upon request",
    "Disclose all sub-processors and AI infrastructure providers with access to ePHI",
  ];
  aiObligations.forEach((ob) => {
    y = addFormCheckbox(doc, `ai_ob_${cbIdx}`, ob, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 5: Breach Notification
  y = addSectionHeader(doc, "5. Breach Notification by Business Associate (45 CFR \u00A7 164.410)", y);
  y = addWrappedText(
    doc,
    "Per 45 CFR \u00A7 164.410, the Business Associate must notify the Covered Entity of a breach of unsecured PHI without unreasonable delay and no later than 60 calendar days after discovery. For AI-related breaches, notification must include:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const breachNotifItems = [
    "Identity of each individual whose PHI was breached or potentially breached by the AI system",
    "Description of what PHI was involved (nature, types of identifiers)",
    "Description of how the AI system breach occurred and PHI was exposed",
    "Description of corrective action taken and steps individuals should take to protect themselves",
    "Contact information for Covered Entity to provide to affected individuals",
  ];
  breachNotifItems.forEach((item) => {
    y = addFormCheckbox(doc, `breach_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 6: Permitted Uses
  y = addSectionHeader(doc, "6. Permitted Uses and Disclosures of PHI by Business Associate", y);
  y = addWrappedText(
    doc,
    "The Business Associate may use or disclose PHI only for the following purposes:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "permitted_uses", "Describe permitted AI services uses of PHI:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Signatures
  y = addSectionHeader(doc, "7. Signatures", y);
  y = addWrappedText(
    doc,
    "By signing below, the parties agree to the terms of this Business Associate Agreement.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 8;
  y = addFormTextField(doc, "ce_sig", "Covered Entity Authorized Signature:", y, { width: 100 });
  y = addFormTextField(doc, "ce_name", "Printed Name:", y, { width: 100 });
  y = addFormTextField(doc, "ce_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ce_date", "Date:", y, { width: 60 });
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "ba_sig", "Business Associate Authorized Signature:", y, { width: 100 });
  y = addFormTextField(doc, "ba_name", "Printed Name:", y, { width: 100 });
  y = addFormTextField(doc, "ba_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ba_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
