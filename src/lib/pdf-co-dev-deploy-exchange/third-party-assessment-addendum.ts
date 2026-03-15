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
// CO Dev-Deploy Exchange Kit — Doc 3: Third-Party Assessment Addendum
// Contract addendum when deployer hires third party for impact assessment
// References § 6-1-1702(3) model cards and dataset cards
// ============================================================
export function generateThirdPartyAssessmentAddendum(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Third-Party AI Impact Assessment — Contract Addendum",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This addendum governs the engagement of a third-party assessor to conduct an AI impact assessment using developer artifacts (including model cards and dataset cards per C.R.S. § 6-1-1702(3)) on behalf of ${data.company.name} (Deployer). C.R.S. §§ 6-1-1701 through 6-1-1707 (Colorado SB 24-205, effective June 30, 2026) require deployers to conduct impact assessments for high-risk AI systems. This addendum supplements the parties' master services agreement or statement of work.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Parties ----
  y = addSectionHeader(doc, "Section 1: Parties", y);

  y = addFormTextField(doc, "tpa_deployer_name", "Deployer (Commissioning Party):", y, {
    prefill: data.company.name,
  });
  y = addFormTextField(doc, "tpa_deployer_address", "Deployer Address:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_deployer_contact", "Deployer Primary Contact (Name / Title / Email):", y, {
    prefill: `${data.contact.name} / ${data.contact.title} / ${data.contact.email}`,
  });
  y = addFormTextField(doc, "tpa_assessor_name", "Third-Party Assessor (Firm / Individual):", y);
  y = addFormTextField(doc, "tpa_assessor_address", "Assessor Address:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_assessor_contact", "Assessor Primary Contact (Name / Title / Email):", y);
  y = addFormTextField(doc, "tpa_developer_name", "AI Developer (if different from Deployer):", y);
  y = addFormTextField(doc, "tpa_addendum_date", "Addendum Effective Date:", y, {
    prefill: data.generatedDate, width: 80,
  });
  y = addFormTextField(doc, "tpa_msa_reference", "Master Services Agreement / SOW Reference (if applicable):", y);

  // ---- SECTION 2: AI System Subject to Assessment ----
  y = addSectionHeader(
    doc,
    "Section 2: AI System Subject to Assessment",
    y
  );

  y = addFormTextField(doc, "tpa_ai_system_name", "AI System Name / Version:", y);
  y = addFormTextField(doc, "tpa_ai_developer", "AI System Developer:", y);
  y = addFormTextField(doc, "tpa_ai_purpose", "Intended Purpose / Use Case:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_ai_decisions", "Decision types the system is used for:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_affected_consumers", "Estimated number of consumers affected:", y, { width: 80 });

  // ---- SECTION 3: Scope of Assessment ----
  y = addSectionHeader(doc, "Section 3: Scope of Assessment", y);

  y = addWrappedText(
    doc,
    "Check all elements included in the scope of this assessment:",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const scopeItems = [
    "Algorithmic discrimination risk assessment",
    "Disparate impact analysis across protected characteristics",
    "Training data review for bias and representativeness",
    "Model input and feature review (including proxy variable detection)",
    "Model output review across demographic groups",
    "Human oversight and override mechanism review",
    "Consumer notification and appeal process review",
    "Developer disclosure completeness review",
    "Compliance with C.R.S. §§ 6-1-1701 through 6-1-1707",
    "NIST AI RMF alignment assessment",
    "Other (describe below)",
  ];
  scopeItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, `tpa_scope_${idx}`, item, y);
  });

  y = addFormTextField(doc, "tpa_scope_other", "If 'Other' — describe:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_scope_exclusions", "Explicit exclusions from scope:", y, {
    multiline: true, lines: 2,
  });

  // ---- SECTION 4: Artifacts Provided ----
  y = addSectionHeader(
    doc,
    "Section 4: Developer Artifacts Provided to Assessor",
    y
  );

  y = addWrappedText(
    doc,
    "Check all developer artifacts made available to the third-party assessor. Reference C.R.S. § 6-1-1702(3) for model card and dataset card requirements.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const artifacts = [
    "Model card (§ 6-1-1702(3))",
    "Dataset card (§ 6-1-1702(3))",
    "Technical documentation / system description",
    "Training data sample or summary statistics",
    "Model architecture documentation",
    "Bias testing results from developer",
    "Known limitations documentation",
    "Known algorithmic discrimination risks documentation",
    "Intended and prohibited use cases documentation",
    "Monitoring guidance documentation",
    "API documentation or sandbox access",
    "Model outputs / prediction logs (anonymized)",
    "Other artifacts (list below)",
  ];
  artifacts.forEach((artifact, idx) => {
    y = addFormCheckbox(doc, `tpa_artifact_${idx}`, artifact, y);
  });

  y = addFormTextField(doc, "tpa_artifact_other", "Other artifacts:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "tpa_artifact_access_method", "Access method (secure portal / encrypted transfer / on-site review):", y);

  // ---- SECTION 5: Confidentiality ----
  y = addSectionHeader(doc, "Section 5: Confidentiality Terms", y);

  y = addWrappedText(
    doc,
    "Developer artifacts provided to the assessor may contain trade secrets and confidential technical information. The confidentiality terms below govern the assessor's handling of these materials.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "tpa_conf_scope",
    "Scope of confidential information covered by this addendum:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "tpa_conf_obligations",
    "Assessor confidentiality obligations (reference NDA or include terms here):",
    y,
    { multiline: true, lines: 3 }
  );

  y = addWrappedText(
    doc,
    "Permitted disclosures (check all that apply):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const permittedDisc = [
    "Disclosure to Deployer's legal counsel",
    "Disclosure to Deployer's compliance personnel",
    "Anonymized / aggregated findings in published reports",
    "Disclosure required by law or regulatory order",
    "Other (specify in additional terms field)",
  ];
  permittedDisc.forEach((item, idx) => {
    y = addFormCheckbox(doc, `tpa_conf_perm_${idx}`, item, y);
  });

  y = addFormTextField(
    doc,
    "tpa_conf_retention",
    "Data retention and destruction obligations (timeframe and method):",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 6: Timeline ----
  y = addSectionHeader(doc, "Section 6: Timeline", y);

  y = addFormTextField(doc, "tpa_timeline_start", "Assessment Start Date:", y, { width: 80 });
  y = addFormTextField(doc, "tpa_timeline_interim_report", "Interim Report Delivery Date (if applicable):", y, { width: 80 });
  y = addFormTextField(doc, "tpa_timeline_final_report", "Final Report Delivery Date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "tpa_timeline_milestones",
    "Key milestones and dates:",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 7: Deliverables ----
  y = addSectionHeader(doc, "Section 7: Deliverables", y);

  y = addWrappedText(
    doc,
    "Check all deliverables the assessor is required to provide:",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const deliverables = [
    "Written impact assessment report",
    "Algorithmic discrimination findings summary",
    "Disparate impact statistics by protected characteristic",
    "Identified risks and severity ratings",
    "Recommended remediation actions",
    "Compliance gap assessment (§§ 6-1-1701 through 6-1-1707)",
    "Executive summary for leadership",
    "Attestation / certification letter for regulatory use",
    "Other (describe below)",
  ];
  deliverables.forEach((item, idx) => {
    y = addFormCheckbox(doc, `tpa_deliv_${idx}`, item, y);
  });

  y = addFormTextField(doc, "tpa_deliv_other", "Other deliverables:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(
    doc,
    "tpa_deliv_format",
    "Required report format / file type:",
    y
  );
  y = addFormTextField(
    doc,
    "tpa_deliv_ownership",
    "Report ownership and usage rights (who owns the report, permitted uses):",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 8: Additional Terms ----
  y = addSectionHeader(doc, "Section 8: Additional Terms", y);

  y = addFormTextField(
    doc,
    "tpa_additional_terms",
    "Any additional terms specific to this engagement (e.g., special access requirements, dispute resolution, insurance requirements):",
    y,
    { multiline: true, lines: 5 }
  );

  // ---- Regulatory Reference ----
  y = addSectionHeader(doc, "Regulatory Reference", y);

  y = addWrappedText(
    doc,
    "This addendum is designed to support compliance with C.R.S. §§ 6-1-1701 through 6-1-1707 (Consumer Protections for AI, SB 24-205, effective June 30, 2026). C.R.S. § 6-1-1702(3) specifically references model cards and dataset cards as disclosure artifacts. The Colorado Attorney General has exclusive enforcement authority under § 6-1-1706. This addendum does not constitute legal advice — consult qualified legal counsel before use.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "tpa_addendum", y);
  addDisclaimer(doc);
  return doc;
}
