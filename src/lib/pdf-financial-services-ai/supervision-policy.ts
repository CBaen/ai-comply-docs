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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: AI Supervision Policy (FINRA Rule 3110 + FINRA RN 24-09)
// ============================================================
export function generateSupervisionPolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Supervision Policy", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This AI Supervision Policy establishes ${data.company.name}'s written supervisory procedures (WSPs) for artificial intelligence tools used in securities activities, as required by FINRA Rule 3110 (Supervision). FINRA Rule 3110(b) requires member firms to establish, maintain, and enforce written procedures for the supervision of activities of associated persons. FINRA Regulatory Notice 24-09 (January 2024) clarified that existing supervisory obligations under FINRA Rule 3110 apply to AI tools used by member firms and associated persons.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Scope
  y = addSectionHeader(doc, "1. Scope of AI Supervision", y);
  y = addWrappedText(
    doc,
    "This policy applies to all AI tools, including large language models, predictive analytics, and automated decision systems, used by associated persons in connection with:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const scopeItems = [
    "Customer communications and correspondence (FINRA Rule 2210 compliance)",
    "Securities recommendations and investment advice",
    "Credit and lending decisions (ECOA/Regulation B applicability)",
    "Trade surveillance and order management",
    "Research and analysis presented to clients",
    "Compliance monitoring and supervisory functions",
    "Customer suitability and best interest assessments (Regulation BI)",
    "Recordkeeping and documentation generation",
  ];
  let cbIdx = 0;
  scopeItems.forEach((item) => {
    y = addFormCheckbox(doc, `scope_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 2: Designated Supervisory Responsibility
  y = addSectionHeader(doc, "2. Designated AI Supervisory Responsibility (FINRA Rule 3110(a))", y);
  y = addWrappedText(
    doc,
    "FINRA Rule 3110(a) requires designation of a registered principal responsible for supervision. For AI tools, the following supervisory roles are designated:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "ai_principal", "Designated AI Supervision Principal (name/title):", y, { width: 140 });
  y = addFormTextField(doc, "ai_principal_crd", "CRD Number:", y, { width: 60 });
  y = addFormTextField(doc, "ai_backup_principal", "Backup Supervisor (name/title):", y, { width: 140 });
  y += LINE_HEIGHT;

  const supDuties = [
    "Approve new AI tools before deployment for use in securities activities",
    "Review and approve WSP updates related to AI tool supervision",
    "Conduct or oversee periodic supervisory reviews of AI tool outputs and usage",
    "Investigate and resolve AI-related supervisory exceptions",
    "Ensure AI vendors are subject to appropriate due diligence (see Vendor Due Diligence document)",
    "Maintain records of AI tool approvals, reviews, and exception investigations",
  ];
  supDuties.forEach((duty) => {
    y = addFormCheckbox(doc, `sup_duty_${cbIdx}`, duty, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 3: Pre-Deployment Review
  y = addSectionHeader(doc, "3. AI Tool Pre-Deployment Review (FINRA RN 24-09)", y);
  y = addWrappedText(
    doc,
    "Before any AI tool is deployed for use in covered securities activities, the Designated AI Supervision Principal must complete the following review:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const preDeployItems = [
    "AI tool purpose and intended use case documented",
    "Regulatory requirements applicable to the use case identified (FINRA 2210, ECOA/Reg B, FCRA, Reg BI, etc.)",
    "AI vendor due diligence completed (see Vendor Due Diligence Questionnaire)",
    "Model risk assessment or validation completed",
    "Supervisory controls for AI tool outputs established",
    "Training completed for associated persons who will use the AI tool",
    "Recordkeeping requirements for AI tool outputs confirmed",
    "Written supervisory procedures updated to address the AI tool",
    "Principal approval documented in writing with date",
  ];
  preDeployItems.forEach((item) => {
    y = addFormCheckbox(doc, `predeploy_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 4: Ongoing Supervision
  y = addSectionHeader(doc, "4. Ongoing Supervisory Procedures (FINRA Rule 3110(b))", y);
  const freq = REVIEW_LABELS[data.oversight.reviewFrequency] || "quarterly";
  y = addWrappedText(
    doc,
    `Ongoing supervision of AI tools must be conducted ${freq.toLowerCase()}. Supervisory reviews must include:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const ongoingItems = [
    "Sampling and review of AI-generated customer communications for FINRA Rule 2210 compliance",
    "Review of AI-generated investment recommendations for suitability/best interest compliance",
    "Review of AI-generated adverse action notices for ECOA/Regulation B accuracy",
    "Exception reporting review: flag AI outputs that deviate materially from expected outputs",
    "AI tool usage logs reviewed for unauthorized use or scope creep",
    "Vendor performance and security incident reports reviewed",
    "Model drift monitoring: assess whether AI outputs remain accurate over time",
    "Supervisory review results documented with findings and any remediation taken",
  ];
  ongoingItems.forEach((item) => {
    y = addFormCheckbox(doc, `ongoing_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 5: Customer Communications
  y = addSectionHeader(doc, "5. AI-Generated Customer Communications (FINRA Rule 2210)", y);
  y = addWrappedText(
    doc,
    "FINRA Rule 2210 governs communications with the public. AI-generated communications are subject to the same standards as human-authored communications. The following apply to AI-generated customer communications:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const commItems = [
    "Correspondence reviewed and approved by registered principal before use or within supervisory schedule (FINRA Rule 2210(b))",
    "Retail communications reviewed and approved prior to first use by registered principal (FINRA Rule 2210(b)(1))",
    "Communications are fair, balanced, and not misleading (FINRA Rule 2210(d)(1))",
    "AI-generated content does not make exaggerated, unwarranted, or misleading statements",
    "Disclosure that communication was AI-generated considered and applied where appropriate",
    "Records of all AI-generated customer communications retained per FINRA Rule 4511",
  ];
  commItems.forEach((item) => {
    y = addFormCheckbox(doc, `comm_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "Policy Approval", y);
  y = addFormTextField(doc, "sup_approved_by", "Approved by (Principal):", y, { width: 100 });
  y = addFormTextField(doc, "sup_crd", "CRD Number:", y, { width: 60 });
  y = addFormTextField(doc, "sup_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "sup_next_review", `Next Review Date (${freq}):`, y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
