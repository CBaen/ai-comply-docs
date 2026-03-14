import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT: AI-Specific Contract Addendum
// Attach to vendor master service agreements or SaaS contracts.
// Aligned with CO SB205 § 6-1-1703(2) deployer obligations and
// NIST AI RMF GOVERN / MANAGE functions.
// ============================================================
export function generateContractAddendum(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Contract Addendum", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This AI System Contract Addendum (\u201cAddendum\u201d) is incorporated into and made part of " +
      "the Master Service Agreement, SaaS Agreement, or other applicable contract " +
      "(\u201cAgreement\u201d) between the parties identified below. In the event of conflict between " +
      "this Addendum and the Agreement, the terms of this Addendum shall control with respect " +
      "to the subject matter herein. This Addendum is intended to address obligations arising " +
      "under the Colorado Artificial Intelligence Act (C.R.S. §§ 6-1-1701 through 6-1-1707), " +
      "the Illinois AI Discrimination Act (775 ILCS 5/2-102(L)), NYC Local Law 144, and " +
      "applicable federal guidance on AI systems. CONSULT A LICENSED ATTORNEY before " +
      "executing this Addendum.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Parties ──────────────────────────────────────
  y = addSectionHeader(doc, "1. Parties", y);
  y = addWrappedText(
    doc,
    "Deployer (Customer):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "vdd_ca_deployer_name",
    "Legal Entity Name:",
    y,
    { prefill: data.company.name }
  );
  y = addFormTextField(doc, "vdd_ca_deployer_address", "Address:", y);
  y = addFormTextField(
    doc,
    "vdd_ca_deployer_contact",
    "Authorized Representative (Name & Title):",
    y,
    {
      prefill: data.contact
        ? data.contact.name +
          (data.contact.title ? ", " + data.contact.title : "")
        : "",
    }
  );
  y += 4;

  y = addWrappedText(
    doc,
    "Vendor (Provider):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "vdd_ca_vendor_name", "Legal Entity Name:", y);
  y = addFormTextField(doc, "vdd_ca_vendor_address", "Address:", y);
  y = addFormTextField(
    doc,
    "vdd_ca_vendor_contact",
    "Authorized Representative (Name & Title):",
    y
  );
  y += LINE_HEIGHT;

  // ── Section 2: AI System Definition ────────────────────────
  y = addSectionHeader(doc, "2. AI System Definition", y);
  y = addWrappedText(
    doc,
    '"AI System" means the artificial intelligence product, model, tool, or service ' +
      "described below, including all updates, versions, and components:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "vdd_ca_system_name",
    "System / Product Name:",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_ca_system_description",
    "Description of System and Covered Use Case:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_ca_covered_decisions",
    "Consequential Decisions the System Makes or Substantially Influences:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 3: Vendor Obligations ──────────────────────────
  y = addSectionHeader(doc, "3. Vendor Obligations", y);
  y = addWrappedText(
    doc,
    "Vendor shall:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const vendorObligations = [
    "(a) Bias Testing. Conduct and document bias testing of the AI System no less frequently " +
      "than annually, and provide Deployer with a written summary of results, including any " +
      "identified disparate impact on protected classes under applicable law. Bias testing " +
      "shall use a methodology consistent with NIST AI RMF MAP function requirements.",
    "(b) Documentation. Maintain and provide to Deployer, upon request, current technical " +
      "documentation, model cards, data sheets, and system performance reports sufficient " +
      "to enable Deployer to fulfill its impact assessment obligations under C.R.S. " +
      "§ 6-1-1703(3).",
    "(c) Incident Notification. Notify Deployer in writing within 72 hours of Vendor " +
      "becoming aware of any security incident, data breach, material system failure, or " +
      "identified instance of algorithmic discrimination involving the AI System.",
    "(d) Data Protection. Implement and maintain administrative, technical, and physical " +
      "safeguards consistent with industry standards (SOC 2 Type II or equivalent) to " +
      "protect Deployer data processed by the AI System.",
    "(e) Regulatory Compliance Updates. Notify Deployer within 30 days of any change in " +
      "the AI System's compliance status with respect to applicable laws, including but not " +
      "limited to C.R.S. §§ 6-1-1701 through 6-1-1707, 775 ILCS 5/2-102(L), and NYC " +
      "Local Law 144.",
    "(f) Cooperation with Audits. Reasonably cooperate with Deployer's audits, inspections, " +
      "or assessments of the AI System as provided in Section 4(b) below.",
  ];

  vendorObligations.forEach(function (obligation) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      obligation,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Section 4: Deployer Rights ──────────────────────────────
  y = addSectionHeader(doc, "4. Deployer Rights", y);
  y = addWrappedText(
    doc,
    "Deployer shall have the following rights:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const deployerRights = [
    "(a) Audit Rights. Upon reasonable notice (not less than 10 business days), Deployer " +
      "may conduct, or engage a third party to conduct, an audit of Vendor's compliance " +
      "with this Addendum, including review of bias testing results, security certifications, " +
      "and incident records. Audits shall be conducted no more than once per calendar year " +
      "absent a good-faith belief of material non-compliance.",
    "(b) Data Portability. Upon request, Vendor shall provide Deployer with a complete " +
      "export of all Deployer data in a machine-readable format within 30 days of the " +
      "request, at no additional charge.",
    "(c) Termination for Compliance Failure. Deployer may terminate the Agreement without " +
      "penalty upon 30 days' written notice if Vendor materially fails to comply with " +
      "this Addendum and such failure is not cured within the notice period.",
    "(d) Suspension Rights. Deployer may suspend use of the AI System for any affected " +
      "decision context without breach or penalty during the pendency of any investigation " +
      "of algorithmic discrimination or material compliance failure.",
  ];

  deployerRights.forEach(function (right) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      right,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Section 5: Incident Response ───────────────────────────
  y = addSectionHeader(doc, "5. Incident Response", y);
  y = addWrappedText(
    doc,
    "In the event of a security incident, data breach, or identified instance of " +
      "algorithmic discrimination:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const incidentTerms = [
    "(a) 72-Hour Notification. Vendor must provide written notice to Deployer within " +
      "72 hours of becoming aware of any qualifying incident, including a description of " +
      "the nature, scope, and initial assessment of impact.",
    "(b) Cooperation. Vendor shall cooperate fully with Deployer's investigation and " +
      "remediation efforts, including providing access to relevant logs, records, and " +
      "personnel.",
    "(c) Regulatory Reporting Support. Vendor shall provide all information and assistance " +
      "reasonably required by Deployer to fulfill any regulatory reporting obligations, " +
      "including those under C.R.S. § 6-1-1703(7) (90-day AG self-report) and any " +
      "applicable breach notification statutes.",
    "(d) Remediation. Vendor shall implement appropriate remediation measures promptly " +
      "and document all corrective actions taken.",
  ];

  incidentTerms.forEach(function (term) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      term,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Section 6: Data Rights ──────────────────────────────────
  y = addSectionHeader(doc, "6. Data Rights", y);

  const dataRights = [
    "(a) Ownership. All Deployer data submitted to or processed by the AI System remains " +
      "the sole property of Deployer. Vendor acquires no ownership interest in Deployer data.",
    "(b) Deletion on Termination. Within 30 days of the termination or expiration of " +
      "the Agreement, Vendor shall securely delete all Deployer data from all systems and " +
      "provide written certification of deletion.",
    "(c) Restrictions on Training. Vendor shall not use Deployer data to train, fine-tune, " +
      "improve, or benchmark the AI System or any other model, product, or service without " +
      "Deployer's prior written consent.",
    "(d) No Third-Party Disclosure. Vendor shall not disclose Deployer data to any third " +
      "party except as required by law or as necessary to provide the services under the " +
      "Agreement, and then only under confidentiality obligations no less protective than " +
      "those in this Addendum.",
  ];

  dataRights.forEach(function (right) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      right,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Section 7: Representations & Warranties ─────────────────
  y = addSectionHeader(doc, "7. Representations & Warranties", y);
  y = addWrappedText(
    doc,
    "Vendor represents and warrants to Deployer that:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const warranties = [
    "(a) Documentation Accuracy. All technical documentation, bias audit reports, and " +
      "compliance certifications provided to Deployer are accurate and complete in all " +
      "material respects as of the date provided.",
    "(b) Legal Compliance. The AI System, as delivered and operated by Vendor, complies " +
      "with all applicable laws and regulations, including C.R.S. §§ 6-1-1701 through " +
      "6-1-1707, 775 ILCS 5/2-102(L), NYC Local Law 144 (where applicable), and " +
      "applicable federal anti-discrimination laws.",
    "(c) No Known Violations. As of the Effective Date, Vendor is not aware of any " +
      "pending or threatened regulatory action, lawsuit, or investigation relating to " +
      "the AI System.",
    "(d) Authority. Vendor has full authority to enter into this Addendum and to grant " +
      "the rights provided herein.",
  ];

  warranties.forEach(function (warranty) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      warranty,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Section 8: Limitation of Liability ─────────────────────
  y = addSectionHeader(doc, "8. Limitation of Liability", y);
  y = addWrappedText(
    doc,
    "TEMPLATE — The following field is a placeholder. Limitation of liability provisions " +
      "must be negotiated by the parties and reviewed by a licensed attorney before inclusion.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "vdd_ca_liability_provision",
    "Limitation of Liability Provision (insert agreed terms or reference Agreement section):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 9: Effective Date & Signatures ──────────────────
  y = addSectionHeader(doc, "9. Effective Date & Signatures", y);
  y = addWrappedText(
    doc,
    "This Addendum is effective as of the date last signed below (\"Effective Date\").",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const halfW = (CONTENT_WIDTH - 10) / 2;

  y = addWrappedText(doc, "DEPLOYER:", MARGIN, y, halfW, LINE_HEIGHT);
  y = addFormTextField(doc, "vdd_ca_deployer_sig_name", "Name:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_deployer_sig_title", "Title:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_deployer_sig_date", "Date:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_deployer_sig", "Signature:", y, {
    width: halfW,
    x: MARGIN,
  });
  y += LINE_HEIGHT;

  y = addWrappedText(doc, "VENDOR:", MARGIN, y, halfW, LINE_HEIGHT);
  y = addFormTextField(doc, "vdd_ca_vendor_sig_name", "Name:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_vendor_sig_title", "Title:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_vendor_sig_date", "Date:", y, {
    width: halfW,
    x: MARGIN,
  });
  y = addFormTextField(doc, "vdd_ca_vendor_sig", "Signature:", y, {
    width: halfW,
    x: MARGIN,
  });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "vdd_company", y);
  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "vdd_vendor", y);

  addDisclaimer(doc);
  return doc;
}
