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
  addFormCheckbox,
  addDisclaimer,
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 8: Comprehensive Compliance Checklist
// All deployer obligations under §§ 6-1-1703 through 6-1-1704
// ============================================================
export function generateCOComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Colorado SB 24-205 Compliance Checklist', data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(doc,
    'This checklist covers all deployer obligations under C.R.S. §§ 6-1-1701 through ' +
    '6-1-1707 (Colorado Artificial Intelligence Act, SB 24-205). Check each item when ' +
    'completed. A checked item reflects the deployer\'s reasonable good-faith assessment; ' +
    'it does not constitute legal advice or a guarantee of compliance.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Small Deployer Exemption Check ────────────────────────
  y = addSectionHeader(doc, '0. Small Deployer Exemption Check (§ 6-1-1703(6))', y);
  y = addWrappedText(doc,
    'Before completing the remainder of this checklist, confirm whether the small ' +
    'deployer exemption applies. Under § 6-1-1703(6), the requirements of § 6-1-1703 ' +
    'do not apply to a deployer that:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(a) The deployer: (I) employs fewer than fifty full-time equivalent employees, AND ' +
    '(II) does not use the deployer\'s own data to train the high-risk AI system ' +
    '(§ 6-1-1703(6)(a));',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(b) The high-risk AI system: (I) is used for the intended uses disclosed by the ' +
    'developer per § 6-1-1702(2)(a), AND (II) continues learning based on data derived ' +
    'from sources other than the deployer\'s own data (§ 6-1-1703(6)(b));',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(c) The deployer makes available to consumers any impact assessment that the developer ' +
    'completed and provided, if it includes information substantially similar to the impact ' +
    'assessment required under § 6-1-1703(3)(b) (§ 6-1-1703(6)(c)).',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += LINE_HEIGHT;
  y = addWrappedText(doc,
    'IMPORTANT: ALL conditions (a), (b), AND (c) must be met at the time of deployment ' +
    'and at all times while the system is deployed. Even if the exemption applies, the ' +
    'General AI Disclosure obligation of § 6-1-1704 still applies.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, 'co_cc_exempt_employees', 'Company employs fewer than 50 full-time equivalent employees (§ 6-1-1703(6)(a)(I)).', y);
  y = addFormCheckbox(doc, 'co_cc_exempt_own_data', 'Company does not use its own data to train the high-risk AI system (§ 6-1-1703(6)(a)(II)).', y);
  y = addFormCheckbox(doc, 'co_cc_exempt_intended_use', 'AI system is used for intended uses disclosed by developer (§ 6-1-1703(6)(b)(I)).', y);
  y = addFormCheckbox(doc, 'co_cc_exempt_impact', 'Developer impact assessment made available to consumers (§ 6-1-1703(6)(c)).', y);
  y = addFormCheckbox(doc, 'co_cc_exempt_confirmed', 'Legal counsel has confirmed applicability (or non-applicability) of § 6-1-1703(6) exemption.', y);
  y += LINE_HEIGHT;

  // ── Section 1: Risk Management ────────────────────────────
  y = addSectionHeader(doc, '1. Risk Management Program (§ 6-1-1703(2))', y);
  y = addWrappedText(doc,
    'A deployer that complies with § 6-1-1703(2) satisfies part of the rebuttable ' +
    'presumption of reasonable care under § 6-1-1703(1).',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const rmItems: [string, string][] = [
    ['co_cc_rm_1', 'Written risk management policy and program established per § 6-1-1703(2)(a).'],
    ['co_cc_rm_2', 'Policy specifies principles, processes, and personnel for identifying, documenting, and mitigating risks of algorithmic discrimination (§ 6-1-1703(2)(a)).'],
    ['co_cc_rm_3', 'Policy aligned with NIST AI RMF, ISO/IEC 42001, or other nationally/internationally recognized AI risk management framework (§ 6-1-1703(2)(a)(I)).'],
    ['co_cc_rm_4', 'Policy scaled to the deployer\'s size and complexity (§ 6-1-1703(2)(a)(II)).'],
    ['co_cc_rm_5', 'Policy accounts for the nature and scope of each high-risk AI system deployed (§ 6-1-1703(2)(a)(III)).'],
    ['co_cc_rm_6', 'Policy addresses the sensitivity of data processed by each high-risk AI system (§ 6-1-1703(2)(a)(IV)).'],
    ['co_cc_rm_7', 'Responsible personnel designated (AI Risk Officer, Oversight Officer, legal contact).'],
    ['co_cc_rm_8', 'Policy reviewed and updated at least annually, and after each substantial modification or incident.'],
  ];
  rmItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 2: Impact Assessment ──────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '2. Impact Assessment (§ 6-1-1703(3))', y);

  const iaItems: [string, string][] = [
    ['co_cc_ia_1', 'Impact assessment completed before deployment of each high-risk AI system (§ 6-1-1703(3)(a)(I)).'],
    ['co_cc_ia_2', 'Assessment reviewed and updated at least annually (§ 6-1-1703(3)(a)(II)).'],
    ['co_cc_ia_3', 'Assessment completed within 90 days of any substantial modification (§ 6-1-1703(3)(a)(II)).'],
    ['co_cc_ia_4', 'Assessment includes § 6-1-1703(3)(b)(I): Purpose, intended use cases, deployment context, and benefits.'],
    ['co_cc_ia_5', 'Assessment includes § 6-1-1703(3)(b)(II): Analysis of algorithmic discrimination risks and mitigation steps.'],
    ['co_cc_ia_6', 'Assessment includes § 6-1-1703(3)(b)(III): Categories of data processed as inputs and outputs.'],
    ['co_cc_ia_7', 'Assessment includes § 6-1-1703(3)(b)(IV): Overview of customization data, if system was customized.'],
    ['co_cc_ia_8', 'Assessment includes § 6-1-1703(3)(b)(V): Performance metrics and known limitations.'],
    ['co_cc_ia_9', 'Assessment includes § 6-1-1703(3)(b)(VI): Transparency measures (how consumers are notified AI is in use).'],
    ['co_cc_ia_10', 'Assessment includes § 6-1-1703(3)(b)(VII): Post-deployment monitoring and user safeguards.'],
    ['co_cc_ia_11', 'Single assessment used to cover comparable systems is documented with comparability rationale (§ 6-1-1703(3)(d)).'],
    ['co_cc_ia_12', 'Assessment available for production to AG upon request within reasonable time (§ 6-1-1703(3)(e)).'],
    ['co_cc_ia_13', 'Most recent assessment retained for at least 3 years after final deployment (§ 6-1-1703(3)(f)(I)).'],
    ['co_cc_ia_14', 'All records concerning each assessment retained for at least 3 years (§ 6-1-1703(3)(f)(II)).'],
    ['co_cc_ia_15', 'All prior assessments retained for at least 3 years after final deployment (§ 6-1-1703(3)(f)(III)).'],
  ];
  iaItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 3: Consumer Notification ─────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '3. Consumer Notification (§ 6-1-1703(4))', y);

  const cnItems: [string, string][] = [
    ['co_cc_cn_1', 'Pre-decision notice provided to each consumer BEFORE a consequential decision is made using a high-risk AI system (§ 6-1-1703(4)(a)(I)).'],
    ['co_cc_cn_2', 'Notice includes the purpose of the high-risk AI system and the nature of the consequential decision (§ 6-1-1703(4)(a)(II)).'],
    ['co_cc_cn_3', 'Notice includes deployer\'s contact information (§ 6-1-1703(4)(a)).'],
    ['co_cc_cn_4', 'Notice is addressed directly to the consumer (§ 6-1-1703(4)(c)).'],
    ['co_cc_cn_5', 'Notice is written in plain language (§ 6-1-1703(4)(c)).'],
    ['co_cc_cn_6', 'Notice is available in all languages the deployer uses in the ordinary course of business (§ 6-1-1703(4)(c)).'],
    ['co_cc_cn_7', 'Notice is accessible to consumers with disabilities (§ 6-1-1703(4)(c)).'],
    ['co_cc_cn_8', 'Notice includes instructions on how to access the public transparency statement (§ 6-1-1703(5)).'],
    ['co_cc_cn_9', 'Adverse decision notice provided: statement of principal reasons including degree and manner of AI contribution, data types, and data sources (§ 6-1-1703(4)(b)(I)).'],
    ['co_cc_cn_10', 'Adverse decision notice: consumer given opportunity to correct incorrect personal data (§ 6-1-1703(4)(b)(II)).'],
    ['co_cc_cn_11', 'Adverse decision notice: consumer given opportunity to appeal with human review where technically feasible (§ 6-1-1703(4)(b)(III)).'],
    ['co_cc_cn_12', 'Right to opt out of profiling disclosed per Colorado Privacy Act § 6-1-1306(1)(a)(I)(C), where applicable.'],
  ];
  cnItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 4: Transparency Statement ────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '4. Transparency Statement (§ 6-1-1703(5))', y);

  const tsItems: [string, string][] = [
    ['co_cc_ts_1', 'Public transparency statement published on company website (§ 6-1-1703(5)).'],
    ['co_cc_ts_2', 'Statement identifies all types of high-risk AI systems currently deployed (§ 6-1-1703(5)(a)(I)).'],
    ['co_cc_ts_3', 'Statement describes how the deployer manages risks of algorithmic discrimination from each system (§ 6-1-1703(5)(a)(II)).'],
    ['co_cc_ts_4', 'Statement discloses in detail the nature, source, and extent of information collected and used by each system (§ 6-1-1703(5)(a)(III)).'],
    ['co_cc_ts_5', 'Statement periodically updated — upon deployment, discontinuation, or substantial modification of any system, and at least annually (§ 6-1-1703(5)(b)).'],
    ['co_cc_ts_6', 'Version history of transparency statement maintained.'],
  ];
  tsItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 5: Incident Reporting ────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '5. Incident Reporting (§ 6-1-1703(7))', y);

  const irItems: [string, string][] = [
    ['co_cc_ir_1', 'Written incident response plan in place for handling discovered instances of algorithmic discrimination (§ 6-1-1703(7)).'],
    ['co_cc_ir_2', 'Internal escalation procedures defined: AI Risk Officer, legal/compliance, executive sponsor notified promptly upon discovery.'],
    ['co_cc_ir_3', 'Report to Colorado AG submitted within 90 days of discovery of algorithmic discrimination (§ 6-1-1703(7)).'],
    ['co_cc_ir_4', 'Root cause analysis completed and documented.'],
    ['co_cc_ir_5', 'Remediation measures designed and implemented.'],
    ['co_cc_ir_6', 'Self-cure affirmative defense documented: (a) evidence of feedback, adversarial testing, or internal review (§ 6-1-1706(3)(a)(I)-(III)); AND (b) compliance with NIST AI RMF and ISO/IEC 42001 or equivalent framework (§ 6-1-1706(3)(b)).'],
    ['co_cc_ir_7', 'Affected consumers notified of incident and corrective action taken.'],
    ['co_cc_ir_8', 'All incident records retained per § 6-1-1703(3)(f).'],
  ];
  irItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 6: Record Retention ───────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '6. Record Retention (§ 6-1-1703(3)(f))', y);

  const rrItems: [string, string][] = [
    ['co_cc_rr_1', 'Written record retention policy covering all SB 24-205 documents in place.'],
    ['co_cc_rr_2', 'Most recently completed impact assessment retained per § 6-1-1703(3)(f)(I).'],
    ['co_cc_rr_3', 'All records concerning each impact assessment retained per § 6-1-1703(3)(f)(II).'],
    ['co_cc_rr_4', 'All prior assessments retained per § 6-1-1703(3)(f)(III).'],
    ['co_cc_rr_5', 'Risk management policy versions retained.'],
    ['co_cc_rr_6', 'Consumer notice templates and delivery records retained.'],
    ['co_cc_rr_7', 'Adverse decision records, data correction requests, and appeal records retained.'],
    ['co_cc_rr_8', 'Incident reports and AG correspondence retained.'],
    ['co_cc_rr_9', 'Per-system retention end dates tracked; no records destroyed before expiration.'],
    ['co_cc_rr_10', 'Records stored in accessible format producible to AG within reasonable time (§ 6-1-1703(3)(e)).'],
  ];
  rrItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Section 7: General AI Disclosure ─────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '7. General AI Interaction Disclosure (§ 6-1-1704)', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1704 applies to ALL deployers, including those qualifying for the ' +
    '§ 6-1-1703(6) small deployer exemption.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const discItems: [string, string][] = [
    ['co_cc_disc_1', 'All consumer-facing AI interaction channels identified (chatbots, virtual agents, automated phone systems, AI-generated correspondence).'],
    ['co_cc_disc_2', 'Disclosure that consumer is interacting with an AI system (not a human) provided in each identified channel (§ 6-1-1704).'],
    ['co_cc_disc_3', 'Disclosure made before or at the start of the interaction, not buried in fine print.'],
    ['co_cc_disc_4', '"Obvious to a reasonable person" exception documented and supported with reasoning for any channel where disclosure is omitted.'],
    ['co_cc_disc_5', 'Disclosure language reviewed for plain-language accessibility.'],
  ];
  discItems.forEach(function(item) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item[0], item[1], y);
  });
  y += LINE_HEIGHT;

  // ── Sign-Off Section ──────────────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '8. Compliance Sign-Off', y);
  y = addWrappedText(doc,
    'The undersigned certifies that the items checked above reflect the Company\'s ' +
    'current compliance status to the best of their knowledge. This sign-off is an ' +
    'internal management record and does not constitute a legal certification.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_cc_signoff_name', 'Compliance Officer / Authorized Signatory (Name & Title):', y,
    { prefill: data.contact ? data.contact.name + (data.contact.title ? ', ' + data.contact.title : '') : '' });
  y = addFormTextField(doc, 'co_cc_signoff_company', 'Company:', y, { prefill: (data.company || {} as ComplianceFormData['company']).name || '' });
  y = addFormTextField(doc, 'co_cc_signoff_date', 'Date:', y, { prefill: data.generatedDate || '' });
  y = addFormTextField(doc, 'co_cc_signoff_sig', 'Signature:', y);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_cc_reviewer_name', 'Reviewed By (Legal Counsel, if applicable — Name & Firm):', y);
  y = addFormTextField(doc, 'co_cc_reviewer_date', 'Date of Legal Review:', y);
  y = addFormTextField(doc, 'co_cc_next_review', 'Date of Next Scheduled Compliance Review:', y);

  addDisclaimer(doc);
  return doc;
}
