/**
 * PDF Document Generator for Colorado SB 24-205 Compliance Package.
 * Ported from colorado-pdf-generator.js to TypeScript for Next.js.
 *
 * Statute: C.R.S. §§ 6-1-1701 through 6-1-1707
 * Consumer Protections for AI (SB 24-205, eff. 6-30-26 per SB 25B-004)
 * Enforcement: Colorado Attorney General (§ 6-1-1706)
 *
 * Generates 8 core documents:
 * 1. Risk Management Policy & Program (§ 6-1-1703(2))
 * 2. Impact Assessment Framework (§ 6-1-1703(3))
 * 3. Consumer Pre-Decision Notice (§ 6-1-1703(4)(a)) + AI Disclosure (§ 6-1-1704)
 * 4. Adverse Decision Response Kit (§ 6-1-1703(4)(b))
 * 5. Public Transparency Statement (§ 6-1-1703(5))
 * 6. Algorithmic Discrimination Incident Response Plan (§ 6-1-1703(7))
 * 7. Record Retention Policy (§ 6-1-1703(3)(f))
 * 8. Comprehensive Compliance Checklist
 */

import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  DATA_INPUT_LABELS,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "./pdf-helpers";


// ============================================================
// DOCUMENT 1: Risk Management Policy & Program
// § 6-1-1703(2)
// ============================================================
export function generateCORiskManagementPolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Risk Management Policy & Program', data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose & Scope ──────────────────────────────────────
  y = addSectionHeader(doc, '1. Purpose & Scope', y);
  y = addWrappedText(doc,
    data.company.name + ' ("Company") adopts this Risk Management Policy and Program ' +
    'pursuant to C.R.S. § 6-1-1703(2) of the Colorado Artificial Intelligence Act ' +
    '(SB 24-205). The statute imposes upon deployers of high-risk artificial intelligence ' +
    'systems an obligation to "use reasonable care to protect consumers from any known or ' +
    'reasonably foreseeable risks of algorithmic discrimination." § 6-1-1703(1). This ' +
    'Policy establishes the principles, processes, and personnel responsible for ' +
    'identifying, documenting, and mitigating those risks as required by § 6-1-1703(2).',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc,
    'This Policy applies to all "high-risk artificial intelligence systems" as defined in ' +
    '§ 6-1-1701(6) — systems that make, or are a substantial factor in making, consequential ' +
    'decisions — deployed by the Company. "Consequential decisions" are defined in ' +
    '§ 6-1-1701(3) as decisions that have a material legal or similarly significant effect ' +
    'on a consumer\'s access to, or the cost, terms, or availability of, the following: ' +
    'education enrollment or opportunity; employment or employment opportunities; financial ' +
    'or lending services; essential government services; health care services; housing; insurance; or legal services.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Company Information:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addWrappedText(doc, 'Company Name: ' + data.company.name, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y = addWrappedText(doc, 'State of Operation: ' + (data.company.state || ''), MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y = addWrappedText(doc, 'Industry: ' + (data.company.industry || ''), MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y = addWrappedText(doc, 'Company Size: ' + (data.company.size || ''), MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Rebuttable Presumption ─────────────────────────────────
  y = addSectionHeader(doc, '2. Rebuttable Presumption of Compliance (§ 6-1-1703(1))', y);
  y = addWrappedText(doc,
    'Under § 6-1-1703(1), a deployer that complies with the requirements of § 6-1-1703 is ' +
    'presumed to have used reasonable care as required by the statute. This presumption is ' +
    'rebuttable. To qualify for this presumption, the Company must fully comply with all ' +
    'obligations in §§ 6-1-1703(2) through (7), including this Risk Management Policy ' +
    '(§ 6-1-1703(2)), impact assessments (§ 6-1-1703(3)), consumer notification ' +
    '(§ 6-1-1703(4)), transparency statements (§ 6-1-1703(5)), and incident reporting ' +
    '(§ 6-1-1703(7)).',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Risk Identification Process ────────────────────────────
  y = addSectionHeader(doc, '3. Risk Identification Process (§ 6-1-1703(2)(a))', y);
  y = addWrappedText(doc,
    'Pursuant to § 6-1-1703(2)(a), this Policy establishes the following processes for ' +
    'identifying risks of algorithmic discrimination arising from the deployment of ' +
    'high-risk AI systems:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const riskSteps = [
    '(a) Pre-deployment review: Before deploying any high-risk AI system, the designated ' +
    'AI Risk Officer shall complete a written impact assessment per § 6-1-1703(3).',
    '(b) Vendor documentation review: All developer-provided documentation, audit results, ' +
    'bias testing reports, and known limitations shall be reviewed and retained.',
    '(c) Data input audit: Categories of data processed as inputs shall be documented and ' +
    'evaluated for potential proxies for protected characteristics under § 6-1-1701(1)(a).',
    '(d) Protected class analysis: The potential for adverse impact on persons within ' +
    'protected classes — age, color, disability, ethnicity, genetic information, limited ' +
    'English proficiency, national origin, race, religion, reproductive health, sex, ' +
    'veteran status, or any other classification protected under the laws of this state ' +
    'or federal law (§ 6-1-1701(1)(a)) — shall be assessed for each covered system.',
    '(e) Ongoing monitoring: Post-deployment, the AI Risk Officer shall monitor performance ' +
    'metrics and review consumer feedback and adverse decision patterns no less frequently ' +
    'than annually per § 6-1-1703(3)(a)(II)).',
  ];
  riskSteps.forEach(function(step) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, step, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Risk Mitigation Measures ───────────────────────────────
  y = addSectionHeader(doc, '4. Risk Mitigation Measures (§ 6-1-1703(2)(a))', y);
  y = addWrappedText(doc,
    'Upon identification of a known or reasonably foreseeable risk of algorithmic ' +
    'discrimination, the Company shall implement one or more of the following mitigation ' +
    'measures, proportionate to the severity of the identified risk:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const mitigations = [
    '(a) Vendor remediation: Request corrective action from the developer/vendor and ' +
    'document the response.',
    '(b) System configuration changes: Modify system settings, thresholds, or data inputs ' +
    'to reduce discriminatory impact.',
    '(c) Enhanced human oversight: Increase the role of human review in the decision ' +
    'pipeline for affected consumer groups.',
    '(d) Suspension: Temporarily suspend use of the system in affected decision contexts ' +
    'pending remediation.',
    '(e) Decommissioning: Permanently discontinue use of a system that cannot be ' +
    'adequately remediated.',
    '(f) Self-reporting: Where algorithmic discrimination is discovered, initiate the ' +
    'self-cure process under § 6-1-1706(3) and report to the Attorney General within ' +
    '90 days per § 6-1-1703(7).',
  ];
  mitigations.forEach(function(m) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, m, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Personnel & Responsibilities ──────────────────────────
  y = addSectionHeader(doc, '5. Personnel & Responsibilities', y);
  y = addWrappedText(doc,
    'The following individuals are designated as responsible for implementing and ' +
    'maintaining this Policy:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_rmp_ai_risk_officer', 'AI Risk Officer (Name & Title):', y,
    { prefill: data.contact ? data.contact.name + (data.contact.title ? ', ' + data.contact.title : '') : '' });
  y = addFormTextField(doc, 'co_rmp_oversight_officer', 'Human Oversight Officer (Name & Title):', y,
    { prefill: data.oversight ? (data.oversight.oversightRole || '') : '' });
  y = addFormTextField(doc, 'co_rmp_legal_contact', 'Legal / Compliance Contact (Name & Title):', y);
  y = addFormTextField(doc, 'co_rmp_executive_sponsor', 'Executive Sponsor (Name & Title):', y);
  y += 2;

  y = addWrappedText(doc,
    'Per § 6-1-1703(2)(a)(II), this Policy is scaled to the Company\'s size and ' +
    'complexity. For smaller organizations, a single individual may hold multiple roles ' +
    'listed above, provided all functions are adequately performed.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── NIST / ISO Alignment ───────────────────────────────────
  y = addSectionHeader(doc, '6. NIST AI RMF / ISO 42001 Alignment (§ 6-1-1703(2)(a)(I))', y);
  y = addWrappedText(doc,
    'Pursuant to § 6-1-1703(2)(a)(I), this Policy is designed to be consistent with a ' +
    '"nationally or internationally recognized risk management framework for artificial ' +
    'intelligence." The Company aligns its risk management practices with one or more of ' +
    'the following frameworks:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  y = addFormCheckbox(doc, 'co_rmp_nist_rmf', 'NIST AI Risk Management Framework (NIST AI RMF 1.0) — GOVERN, MAP, MEASURE, MANAGE functions', y);
  y = addFormCheckbox(doc, 'co_rmp_iso_42001', 'ISO/IEC 42001:2023 — Artificial Intelligence Management System (AIMS)', y);
  y = addFormCheckbox(doc, 'co_rmp_nist_600_1', 'NIST AI 600-1 — Generative AI Profile (if applicable)', y);
  y = addFormCheckbox(doc, 'co_rmp_other_framework', 'Other nationally recognized framework (specify below):', y);
  y = addFormTextField(doc, 'co_rmp_other_framework_name', '', y);
  y += LINE_HEIGHT;

  y = addWrappedText(doc,
    'The Company\'s alignment with the selected framework is documented in the Impact ' +
    'Assessment for each deployed high-risk AI system. The AI Risk Officer shall maintain ' +
    'records sufficient to demonstrate framework alignment per § 6-1-1703(2)(a)(I).',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Scaling to Company Size ────────────────────────────────
  y = addSectionHeader(doc, '7. Scaling to Company Size & Complexity (§ 6-1-1703(2)(a)(II)-(IV))', y);
  y = addWrappedText(doc,
    'Per § 6-1-1703(2)(a)(II), the risk management program shall be "scaled to the ' +
    'developer\'s or deployer\'s size and complexity." Per § 6-1-1703(2)(a)(III), the ' +
    'program shall account for the "nature and scope of the high-risk artificial ' +
    'intelligence systems" deployed. Per § 6-1-1703(2)(a)(IV), the program shall address ' +
    'the "sensitivity of the data processed" by such systems. The Company\'s scaling ' +
    'decisions are as follows:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_rmp_scale_size', 'Company size / resource basis for scaling decisions:', y,
    { prefill: data.company.size || '' });
  y = addFormTextField(doc, 'co_rmp_scale_scope', 'Scope of AI systems deployed (number, types, deployment contexts):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_rmp_scale_sensitivity', 'Data sensitivity factors addressed (e.g., special categories of data):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Review Schedule ────────────────────────────────────────
  y = addSectionHeader(doc, '8. Policy Review Schedule', y);
  y = addWrappedText(doc,
    'This Policy shall be reviewed and updated on the following schedule:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  y = addWrappedText(doc, '\u2022  Annual review: no later than 12 months after the prior review.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  After substantial modification of any covered AI system (§ 6-1-1703(3)(a)(II): within 90 days).', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  After any incident of algorithmic discrimination.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  Upon deployment of any new high-risk AI system.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_rmp_last_review', 'Date of Last Review:', y);
  y = addFormTextField(doc, 'co_rmp_next_review', 'Date of Next Scheduled Review:', y);
  y = addFormTextField(doc, 'co_rmp_reviewer', 'Reviewed By (Name & Title):', y);
  y += LINE_HEIGHT;

  // ── Approval ──────────────────────────────────────────────
  y = addSectionHeader(doc, '9. Policy Approval', y);
  y = addFormTextField(doc, 'co_rmp_approver_name', 'Approved By (Name & Title):', y);
  y = addFormTextField(doc, 'co_rmp_approval_date', 'Approval Date:', y);
  y = addFormTextField(doc, 'co_rmp_approval_sig', 'Signature:', y);

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 2: Impact Assessment Framework
// § 6-1-1703(3)
// ============================================================
export function generateCOImpactAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'High-Risk AI Impact Assessment', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Overview ────────────────────────────────────
  y = addSectionHeader(doc, '1. Statutory Requirements Overview (§ 6-1-1703(3))', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1703(3) requires deployers to "complete an impact assessment for each ' +
    'high-risk artificial intelligence system deployed." Each assessment must satisfy the ' +
    'seven required elements of § 6-1-1703(3)(b)(I)-(VII). The following timing and ' +
    'retention rules apply:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const requirements = [
    '\u2022  Pre-deployment: Impact assessment must be completed before the system is deployed ' +
    '(§ 6-1-1703(3)(a)(I)).',
    '\u2022  Annual review: Assessment must be reviewed and updated at least annually ' +
    '(§ 6-1-1703(3)(a)(II)).',
    '\u2022  Substantial modification: Assessment must be completed within 90 days after any ' +
    '"substantial modification" of the system (§ 6-1-1703(3)(a)(II)).',
    '\u2022  3-year retention: The most recently completed assessment, all records concerning ' +
    'each assessment, and all prior assessments must be retained for at least 3 years ' +
    'after the final deployment of the system (§ 6-1-1703(3)(f)).',
    '\u2022  Comparable systems: A single impact assessment may cover multiple "comparable ' +
    'high-risk artificial intelligence systems" (§ 6-1-1703(3)(d)).',
    '\u2022  Attorney General availability: Upon request of the Attorney General, the deployer ' +
    'must make assessments available within a reasonable time (§ 6-1-1703(3)(e)).',
  ];
  requirements.forEach(function(req) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, req, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Per-System Assessments ────────────────────────────────
  const aiSystems = data.aiSystems || [];
  if (aiSystems.length === 0) {
    y = addSectionHeader(doc, '2. AI System Assessment', y);
    y = addWrappedText(doc, 'No AI systems were specified. Complete one section per high-risk AI system deployed.', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;
  }

  aiSystems.forEach(function(sys, idx) {
    const sysNum = idx + 1;
    const sysLabel = sys.name || ('System ' + sysNum);

    if (y > 200) { doc.addPage(); y = MARGIN; }
    y = addSectionHeader(doc, 'System ' + sysNum + ': ' + sysLabel, y);

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'System Identification:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_name', 'System Name:', y, { prefill: sys.name || '' });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_vendor', 'Developer / Vendor:', y, { prefill: sys.vendor || '' });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_version', 'Version / Release:', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_deploy_date', 'Initial Deployment Date:', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_mod_date', 'Date of Most Recent Substantial Modification (if any):', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_comparable', 'Comparable systems covered by this single assessment (if applicable, per § 6-1-1703(3)(d)):', y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT;

    // Element (I)
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(I): Purpose, Intended Use Cases, Deployment Context & Benefits', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    if (y > 240) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc,
      'Describe: (a) the specific purpose of the system; (b) each intended use case; ' +
      '(c) the context in which the system is deployed; and (d) the benefits of the system ' +
      'to consumers in each context.',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_purpose', 'Purpose of the system:', y, { multiline: true, lines: 4 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_usecases', 'Intended use cases:', y,
      { prefill: sys.description || '', multiline: true, lines: 3 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_context', 'Deployment context (which consequential decision areas, per § 6-1-1701(3)):', y,
      { prefill: (sys.decisions || []).join(', '), multiline: true, lines: 2 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_benefits', 'Benefits to consumers:', y, { multiline: true, lines: 3 });
    y += LINE_HEIGHT;

    // Element (II)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(II): Algorithmic Discrimination Risk Analysis & Mitigation', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      '"Algorithmic discrimination" means any condition in which the use of a high-risk ' +
      'AI system results in an unlawful differential impact on consumers because of their ' +
      'age, color, disability, ethnicity, genetic information, limited English proficiency, ' +
      'national origin, race, religion, reproductive health, sex, veteran status, or any ' +
      'other classification protected under the laws of this state or federal law ' +
      '(§ 6-1-1701(1)(a)).',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_risk_analysis', 'Analysis of algorithmic discrimination risks (identify each risk, the protected class(es) implicated, and probability/severity):', y, { multiline: true, lines: 5 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_risk_mitigation', 'Mitigation steps taken or planned for each identified risk:', y, { multiline: true, lines: 5 });
    y += LINE_HEIGHT;

    // Element (III)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(III): Categories of Data Processed as Inputs and Outputs', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc, 'Input data categories used by this system:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    const dataInputs = data.dataInputs || [];
    const inputKeys = Object.keys(DATA_INPUT_LABELS);
    inputKeys.forEach(function(key) {
      const checked = dataInputs.indexOf(key) !== -1;
      y = addFormCheckbox(doc, 'co_ia_sys' + sysNum + '_input_' + key, DATA_INPUT_LABELS[key], y, { checked: checked });
    });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_input_other', 'Other input data categories (specify):', y);
    y += 2;
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_outputs', 'Output data categories and formats (e.g., scores, rankings, binary decisions, recommendations):', y, { multiline: true, lines: 3 });
    y += LINE_HEIGHT;

    // Element (IV)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(IV): Customization Data Overview (if applicable)', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      'If the deployer has customized the high-risk AI system (e.g., fine-tuned on ' +
      'company data, retrained, or significantly configured), provide an overview of the ' +
      'data used for that customization.',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormCheckbox(doc, 'co_ia_sys' + sysNum + '_customized_yes', 'System has been customized / fine-tuned by the deployer', y);
    y = addFormCheckbox(doc, 'co_ia_sys' + sysNum + '_customized_no', 'System is used as-provided by developer with no deployer customization', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_custom_data', 'If customized: overview of customization data (source, categories, date range):', y, { multiline: true, lines: 4 });
    y += LINE_HEIGHT;

    // Element (V)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(V): Performance Metrics & Known Limitations', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_metrics', 'Performance metrics (e.g., accuracy, precision, recall, fairness metrics by protected class):', y, { multiline: true, lines: 4 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_limitations', 'Known limitations (include vendor-disclosed limitations and any identified in deployer testing):', y, { multiline: true, lines: 4 });
    y += LINE_HEIGHT;

    // Element (VI)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(VI): Transparency Measures', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      'Describe how consumers are informed that a high-risk AI system is being used in ' +
      'consequential decisions that affect them, consistent with § 6-1-1703(4)(a).',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_transparency', 'Transparency measures (timing, channel, content of consumer notice):', y, { multiline: true, lines: 4 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_languages', 'Languages in which notice is provided (per § 6-1-1703(4)(c)):', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_accessibility', 'Accessibility measures for consumers with disabilities (per § 6-1-1703(4)(c)):', y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT;

    // Element (VII)
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, '§ 6-1-1703(3)(b)(VII): Post-Deployment Monitoring & User Safeguards', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_monitoring', 'Post-deployment monitoring procedures (frequency, responsible party, metrics tracked):', y, { multiline: true, lines: 4 });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_safeguards', 'User safeguards in place (e.g., human review options, appeal procedures, data correction mechanisms):', y, { multiline: true, lines: 4 });
    y += LINE_HEIGHT;

    // Sign-off for this system
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Assessment Sign-Off — ' + sysLabel, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_completed_by', 'Assessment Completed By (Name & Title):', y,
      { prefill: data.contact ? data.contact.name + (data.contact.title ? ', ' + data.contact.title : '') : '' });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_completed_date', 'Date Completed:', y,
      { prefill: data.generatedDate || '' });
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_reviewed_by', 'Reviewed / Approved By (Name & Title):', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_reviewed_date', 'Date Reviewed / Approved:', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_next_review', 'Date of Next Annual Review (§ 6-1-1703(3)(a)(II)):', y);
    y = addFormTextField(doc, 'co_ia_sys' + sysNum + '_retention_end', 'Retention End Date (3 years after final deployment, § 6-1-1703(3)(f)):', y);
    y += LINE_HEIGHT * 2;
  });

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 3: Consumer Pre-Decision Notice + AI Disclosure
// § 6-1-1703(4)(a) + § 6-1-1704
// ============================================================
export function generateCOConsumerNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Consumer Pre-Decision Notice & AI Disclosure', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Overview ────────────────────────────────────
  y = addSectionHeader(doc, '1. Overview of Disclosure Obligations', y);
  y = addWrappedText(doc,
    'This document provides template notices required by two separate Colorado statutes:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '\u2022  § 6-1-1703(4)(a): Pre-decision notice to consumers BEFORE a consequential decision ' +
    'is made using a high-risk AI system. This notice must be provided directly to the ' +
    'consumer, in plain language, and in all languages used by the deployer in the ' +
    'ordinary course of business (§ 6-1-1703(4)(c)).',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '\u2022  § 6-1-1704: General disclosure obligation — a deployer "shall not use or deploy " ' +
    'an artificial intelligence system to interact with a consumer in Colorado without ' +
    'disclosing to the consumer that the consumer is interacting with an artificial ' +
    'intelligence system" unless it would be "obvious to a reasonable person" that they ' +
    'are interacting with AI.',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Format Requirements ────────────────────────────────────
  y = addSectionHeader(doc, '2. Notice Format Requirements (§ 6-1-1703(4)(c))', y);
  y = addWrappedText(doc,
    'Each consumer notice under § 6-1-1703(4)(a) must satisfy all of the following ' +
    'requirements per § 6-1-1703(4)(c):',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  y = addFormCheckbox(doc, 'co_cn_format_direct', 'Notice is addressed DIRECTLY to the consumer (not embedded in general terms of service)', y);
  y = addFormCheckbox(doc, 'co_cn_format_plain', 'Notice is written in plain language accessible to a general audience', y);
  y = addFormCheckbox(doc, 'co_cn_format_languages', 'Notice is available in all languages in which the deployer conducts business with consumers', y);
  y = addFormCheckbox(doc, 'co_cn_format_accessible', 'Notice is accessible to consumers with disabilities (e.g., screen-reader compatible, large-print available)', y);
  y = addFormCheckbox(doc, 'co_cn_format_timing', 'Notice is provided BEFORE the consequential decision is made (§ 6-1-1703(4)(a)(I))', y);
  y += LINE_HEIGHT;

  // ── Template Notice — Per System ─────────────────────────
  const aiSystems = data.aiSystems || [];
  const company = data.company || {} as ComplianceFormData['company'];
  const contact = data.contact || {} as ComplianceFormData['contact'];

  aiSystems.forEach(function(sys, idx) {
    const sysNum = idx + 1;
    if (y > 200) { doc.addPage(); y = MARGIN; }

    y = addSectionHeader(doc, '3.' + sysNum + ' Pre-Decision Notice Template: ' + (sys.name || 'System ' + sysNum), y);

    y = addWrappedText(doc,
      '— NOTICE TO CONSUMER — (§ 6-1-1703(4)(a))',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Notice of Artificial Intelligence Use', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y += 2;

    // § 6-1-1703(4)(a)(I): notice before consequential decision
    y = addWrappedText(doc,
      'You have applied for or are being considered for a service or decision that may ' +
      'significantly affect your rights or opportunities. Before we complete this process, ' +
      'we are required by Colorado law (C.R.S. § 6-1-1703(4)(a)(I)) to inform you that ' +
      'we use an automated artificial intelligence system as part of this process.',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;

    // § 6-1-1703(4)(a)(II): purpose and nature of consequential decision
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'About the AI System and Decision (§ 6-1-1703(4)(a)(II)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_system_name', 'Name of the AI system:', y, { prefill: sys.name || '' });
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_purpose', 'Purpose of the AI system (plain language description):', y,
      { prefill: sys.description || '', multiline: true, lines: 3 });
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_decision_type', 'Type of consequential decision this AI system informs:', y,
      { prefill: (sys.decisions || []).join(', ') });
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_data_used', 'Categories of information about you that the system uses:', y, { multiline: true, lines: 3 });
    y += LINE_HEIGHT;

    // Company contact info
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Our Contact Information:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc, company.name || '', MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_contact_name', 'AI Compliance Contact (Name & Title):', y,
      { prefill: contact.name ? contact.name + (contact.title ? ', ' + contact.title : '') : '' });
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_contact_email', 'Email:', y,
      { prefill: contact.email || '' });
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_contact_phone', 'Phone:', y,
      { prefill: contact.phone || '' });
    y += LINE_HEIGHT;

    // Link to public transparency statement
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Public Transparency Statement (§ 6-1-1703(5)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      'For detailed information about how we manage risks of algorithmic discrimination ' +
      'from our AI systems, please see our public transparency statement, available at:',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_transparency_url', 'Transparency Statement URL:', y);
    y += LINE_HEIGHT;

    // Colorado Privacy Act opt-out
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Right to Opt Out of Profiling (Colorado Privacy Act § 6-1-1306(1)(a)(I)(C)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_cn_sys' + sysNum + '_profiling_applicable',
      'Does this AI system constitute "profiling" as defined in the Colorado Privacy Act (§ 6-1-1301(15))? (Yes / No / Not Applicable — fill in):',
      y);
    y = addWrappedText(doc,
      'If yes: Under § 6-1-1306(1)(a)(I)(C) of the Colorado Privacy Act, you have the ' +
      'right to opt out of the processing of your personal data for purposes of profiling ' +
      'in furtherance of decisions that produce legal or similarly significant effects. ' +
      'To exercise this right, contact us at the information above.',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;

    // How to get more information
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Questions or Concerns:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      'If you have questions about this notice or wish to exercise any of your rights, ' +
      'please contact us using the information above. If you receive a decision you believe ' +
      'is adverse, you have the right to receive an explanation and to request human review ' +
      'where technically feasible (§ 6-1-1703(4)(b)(III)).',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT * 2;
  });

  // ── § 6-1-1704 General AI Interaction Disclosure ─────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '4. General AI Interaction Disclosure (§ 6-1-1704)', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1704 provides that a deployer "shall not use or deploy an artificial ' +
    'intelligence system to interact with a consumer in Colorado" without disclosing that ' +
    'the consumer is interacting with AI, "unless it would be obvious to a reasonable ' +
    'person that the consumer is interacting with an artificial intelligence system." This ' +
    'requirement applies to chatbots, virtual agents, automated phone systems, and any ' +
    'other AI-mediated consumer interaction.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc, 'Template Disclosure Statement for Consumer-Facing AI Interactions:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc,
    '"You are interacting with an automated artificial intelligence system, not a human ' +
    'representative. [Company name] uses this AI system to [describe purpose]. If you ' +
    'would prefer to speak with a human representative, please [describe how to reach one]."',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_cn_1704_channels', 'Consumer interaction channels where § 6-1-1704 disclosure is required (list all):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_cn_1704_disclosure_method', 'Method of disclosure for each channel (e.g., displayed before chat, spoken at start of call):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_cn_1704_obvious_exception', 'Channels/contexts where § 6-1-1704 "obvious to a reasonable person" exception applies (document reasoning):', y, { multiline: true, lines: 3 });

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 4: Adverse Decision Response Kit
// § 6-1-1703(4)(b)
// ============================================================
export function generateCOAdverseDecisionKit(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Adverse Decision Response Kit', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Obligations ──────────────────────────────────
  y = addSectionHeader(doc, '1. Statutory Obligations (§ 6-1-1703(4)(b))', y);
  y = addWrappedText(doc,
    'When a deployer makes an adverse consequential decision impacting a consumer through ' +
    'the use of a high-risk AI system, § 6-1-1703(4)(b) requires the deployer to provide ' +
    'the consumer with each of the following:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const obligations = [
    '(I) A statement of the principal reasons for the decision, including: (A) the degree ' +
    'to which, and the manner in which, the high-risk artificial intelligence system ' +
    'contributed to the decision; (B) the type of data that was processed as part of the ' +
    'decision; and (C) the source or sources of that data (§ 6-1-1703(4)(b)(I)).',
    '(II) An opportunity for the consumer to correct any incorrect personal data that was ' +
    'used in connection with the decision (§ 6-1-1703(4)(b)(II)).',
    '(III) An opportunity to appeal the decision with a human review of the decision where ' +
    'such a review is technically feasible (§ 6-1-1703(4)(b)(III)).',
  ];
  obligations.forEach(function(ob) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, ob, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Part A: Adverse Decision Explanation Letter ──────────
  y = addSectionHeader(doc, '2. Part A: Adverse Decision Explanation Letter (§ 6-1-1703(4)(b)(I))', y);
  y = addWrappedText(doc,
    'Use this template to notify a consumer of an adverse consequential decision and ' +
    'provide the required explanation. Fill in all bracketed fields for each decision.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc, '— LETTER TO CONSUMER —', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ad_letter_date', 'Date:', y, { prefill: data.generatedDate || '' });
  y = addFormTextField(doc, 'co_ad_consumer_name', 'Consumer Name:', y);
  y = addFormTextField(doc, 'co_ad_consumer_address', 'Consumer Address:', y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  y = addWrappedText(doc, 'Dear [Consumer Name],', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc,
    'We are writing to inform you of a decision made in connection with your application ' +
    'for [describe: education, employment, financial services, housing, insurance, health ' +
    'care, or other service]. As required by Colorado law (C.R.S. § 6-1-1703(4)(b)), we ' +
    'are providing you with the following information about this decision.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Decision:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormTextField(doc, 'co_ad_decision_type', 'Type of decision (e.g., application denied, coverage declined, employment not offered):', y);
  y = addFormTextField(doc, 'co_ad_decision_date', 'Date of decision:', y);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Role of Artificial Intelligence (§ 6-1-1703(4)(b)(I)(A)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addWrappedText(doc,
    'This decision was informed by the use of a high-risk artificial intelligence system. ' +
    'The following describes the degree to which, and the manner in which, the AI system ' +
    'contributed to this decision:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addFormTextField(doc, 'co_ad_ai_system_used', 'AI system used:', y);
  y = addFormTextField(doc, 'co_ad_ai_contribution_degree', 'Degree of AI contribution (e.g., "AI score was the primary factor," "AI flag triggered human review"):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_ad_ai_contribution_manner', 'Manner in which AI contributed (e.g., scored your application, identified risk factors, generated a recommendation):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  if (y > 220) { doc.addPage(); y = MARGIN; }
  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Data Processed (§ 6-1-1703(4)(b)(I)(B)-(C)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormTextField(doc, 'co_ad_data_types', 'Types of data processed in connection with this decision:', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_ad_data_sources', 'Source(s) of that data:', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Principal Reasons for the Decision:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormTextField(doc, 'co_ad_principal_reasons', 'Principal reasons (list each reason):', y, { multiline: true, lines: 5 });
  y += LINE_HEIGHT;

  // ── Part B: Data Correction Request Form ────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '3. Part B: Data Correction Request Form (§ 6-1-1703(4)(b)(II))', y);
  y = addWrappedText(doc,
    'If you believe that incorrect personal data was used in connection with this decision, ' +
    'you have the right to request correction of that data. Please complete and return ' +
    'this form to:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc, (data.company || {} as ComplianceFormData['company']).name || '', MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y = addWrappedText(doc, 'Attention: ' + ((data.contact || {} as ComplianceFormData['contact']).name || 'AI Compliance Officer'), MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y = addWrappedText(doc, 'Email: ' + ((data.contact || {} as ComplianceFormData['contact']).email || '[compliance email]'), MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc, '— DATA CORRECTION REQUEST —', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_dc_consumer_name', 'Your Name:', y);
  y = addFormTextField(doc, 'co_dc_consumer_contact', 'Your Contact Information (phone, email, mailing address):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_dc_decision_ref', 'Reference to the decision you are disputing (date, type):', y);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Identification of Incorrect Data:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormTextField(doc, 'co_dc_incorrect_data', 'Please describe the data you believe is incorrect:', y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, 'co_dc_correct_data', 'Please provide what you believe the correct information to be:', y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, 'co_dc_supporting_docs', 'Supporting documentation you are providing (list):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_dc_signature', 'Your Signature:', y);
  y = addFormTextField(doc, 'co_dc_date', 'Date:', y);
  y += LINE_HEIGHT;

  // ── Part C: Appeal Request Form ──────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '4. Part C: Appeal Request Form (§ 6-1-1703(4)(b)(III))', y);
  y = addWrappedText(doc,
    'You have the right to appeal this decision and to request human review of the ' +
    'decision where such review is technically feasible, pursuant to ' +
    '§ 6-1-1703(4)(b)(III).',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc, '— APPEAL REQUEST —', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ap_consumer_name', 'Your Name:', y);
  y = addFormTextField(doc, 'co_ap_consumer_contact', 'Your Contact Information:', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_ap_decision_ref', 'Decision Being Appealed (date, type):', y);
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, 'co_ap_human_review', 'I request human review of this decision pursuant to § 6-1-1703(4)(b)(III).', y);
  y += 2;

  y = addFormTextField(doc, 'co_ap_grounds', 'Grounds for appeal / reason you believe the decision should be reconsidered:', y, { multiline: true, lines: 5 });
  y = addFormTextField(doc, 'co_ap_new_info', 'Any new information or documents you wish the reviewer to consider:', y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ap_signature', 'Your Signature:', y);
  y = addFormTextField(doc, 'co_ap_date', 'Date:', y);
  y += LINE_HEIGHT;

  // ── Part D: Internal Processing — Office Use Only ────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '5. Part D: Internal Processing Record (Office Use Only)', y);
  y = addWrappedText(doc,
    'Complete this section for internal tracking. Do not provide to consumer.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_int_received_date', 'Date Request Received:', y);
  y = addFormTextField(doc, 'co_int_received_by', 'Received By (Name & Title):', y);
  y = addFormTextField(doc, 'co_int_assigned_to', 'Assigned Reviewer (Name & Title):', y);
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, 'co_int_type_data_correction', 'Data Correction Request', y);
  y = addFormCheckbox(doc, 'co_int_type_appeal', 'Appeal Request', y);
  y = addFormCheckbox(doc, 'co_int_type_human_review_requested', 'Human Review Requested', y);
  y = addFormCheckbox(doc, 'co_int_human_review_feasible', 'Human review is technically feasible for this system / decision type', y);
  y = addFormCheckbox(doc, 'co_int_human_review_not_feasible', 'Human review is NOT technically feasible (document basis below)', y);
  y = addFormTextField(doc, 'co_int_feasibility_basis', 'Basis for technical feasibility determination:', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_int_review_outcome', 'Outcome of Review:', y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, 'co_int_outcome_date', 'Date of Outcome Decision:', y);
  y = addFormTextField(doc, 'co_int_consumer_notified_date', 'Date Consumer Notified of Outcome:', y);
  y = addFormTextField(doc, 'co_int_notes', 'Internal Notes:', y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, 'co_int_retention_end', 'Retention End Date (3 years, § 6-1-1703(3)(f)):', y);

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 5: Public Website Transparency Statement
// § 6-1-1703(5)
// ============================================================
export function generateCOTransparencyStatement(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Public Transparency Statement', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Overview ────────────────────────────────────
  y = addSectionHeader(doc, '1. Statutory Requirement (§ 6-1-1703(5))', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1703(5) requires that each deployer of high-risk AI systems make ' +
    '"a public statement" available on its website. The statement must include, for each ' +
    'high-risk AI system deployed:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(I) The types of high-risk artificial intelligence systems currently deployed by ' +
    'the deployer (§ 6-1-1703(5)(a)(I));',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(II) How the deployer manages known or reasonably foreseeable risks of algorithmic ' +
    'discrimination arising from each such system (§ 6-1-1703(5)(a)(II)); and',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(III) In detail, the nature, source, and extent of the information collected and used ' +
    'by the deployer in connection with the high-risk AI system (§ 6-1-1703(5)(a)(III)).',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    'This statement must be periodically updated (§ 6-1-1703(5)(b)). The statement ' +
    'provided below is formatted for direct publication on the Company\'s website.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Website Statement ─────────────────────────────────────
  y = addSectionHeader(doc, '2. Public Transparency Statement — Ready for Website Publication', y);
  y = addWrappedText(doc,
    'COPY THE FOLLOWING STATEMENT TO YOUR WEBSITE. Update the bracketed fields with your ' +
    'specific information.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'ARTIFICIAL INTELLIGENCE TRANSPARENCY STATEMENT', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addWrappedText(doc, (data.company || {} as ComplianceFormData['company']).name || '', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addFormTextField(doc, 'co_ts_effective_date', 'Statement Effective Date / Last Updated:', y, { prefill: data.generatedDate || '' });
  y += LINE_HEIGHT;

  y = addWrappedText(doc,
    'Pursuant to C.R.S. § 6-1-1703(5), ' + ((data.company || {} as ComplianceFormData['company']).name || '[Company Name]') +
    ' ("Company") provides the following information about our use of high-risk artificial ' +
    'intelligence systems that may affect Colorado consumers.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Per-System Statements ─────────────────────────────────
  const aiSystems = data.aiSystems || [];
  aiSystems.forEach(function(sys, idx) {
    const sysNum = idx + 1;
    if (y > 220) { doc.addPage(); y = MARGIN; }

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'System ' + sysNum + ': ' + (sys.name || 'AI System ' + sysNum), MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y += 2;

    // § 6-1-1703(5)(a)(I): Type of high-risk AI system
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Type of High-Risk AI System (§ 6-1-1703(5)(a)(I)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_type',
      'Type / category of system (e.g., automated underwriting, credit scoring, candidate screening):',
      y, { prefill: sys.description || '' });
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_decision_areas',
      'Consequential decision areas in which this system is used (§ 6-1-1701(3)):',
      y, { prefill: (sys.decisions || []).join(', '), multiline: true, lines: 2 });
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_vendor_public',
      'Developer / vendor (name for public disclosure):',
      y, { prefill: sys.vendor || '' });
    y += LINE_HEIGHT;

    // § 6-1-1703(5)(a)(II): Risk management approach
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Risk Management Approach (§ 6-1-1703(5)(a)(II)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc,
      'We manage known or reasonably foreseeable risks of algorithmic discrimination from ' +
      'this system through the following measures:',
      MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_policy', 'Maintaining a written Risk Management Policy per § 6-1-1703(2)', y);
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_impact', 'Completing pre-deployment and annual impact assessments per § 6-1-1703(3)', y);
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_bias_audit', 'Conducting bias audits / fairness testing of the system', y);
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_human_review', 'Maintaining human oversight and review procedures', y);
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_nist', 'Aligning with NIST AI RMF or ISO/IEC 42001 per § 6-1-1703(2)(a)(I)', y);
    y = addFormCheckbox(doc, 'co_ts_sys' + sysNum + '_rm_vendor', 'Reviewing developer-provided documentation and bias reports', y);
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_rm_additional', 'Additional risk management measures:', y, { multiline: true, lines: 3 });
    y += LINE_HEIGHT;

    // § 6-1-1703(5)(a)(III): Nature, source, extent of information
    if (y > 220) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Information Collected & Used (§ 6-1-1703(5)(a)(III)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Nature of information:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_info_nature', 'Describe the nature of data collected/used:', y, { multiline: true, lines: 3 });

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Source of information:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_info_source', 'Identify each source of data (e.g., consumer-provided, public records, third-party data brokers):', y, { multiline: true, lines: 3 });

    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'Extent of information:', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_ts_sys' + sysNum + '_info_extent', 'Describe the extent/volume of data processed (e.g., scope of consumers affected, time range, data fields):', y, { multiline: true, lines: 3 });
    y += LINE_HEIGHT * 2;
  });

  // ── Update Policy ─────────────────────────────────────────
  if (y > 230) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '3. Statement Update Policy (§ 6-1-1703(5)(b))', y);
  y = addWrappedText(doc,
    'This transparency statement is updated on the following schedule:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc, '\u2022  Upon deployment of any new high-risk AI system.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  Upon discontinuation of any high-risk AI system.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  Upon any substantial modification of a deployed system.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y = addWrappedText(doc, '\u2022  At minimum, annually.', MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ts_update_owner', 'Responsible for maintaining and updating this statement:', y,
    { prefill: data.contact ? data.contact.name || '' : '' });
  y = addFormTextField(doc, 'co_ts_last_updated', 'Date Last Updated:', y, { prefill: data.generatedDate || '' });
  y = addFormTextField(doc, 'co_ts_next_review', 'Date of Next Scheduled Review:', y);

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 6: Algorithmic Discrimination Incident Response Plan
// § 6-1-1703(7)
// ============================================================
export function generateCOIncidentResponse(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Algorithmic Discrimination Incident Response Plan', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Basis ────────────────────────────────────────
  y = addSectionHeader(doc, '1. Statutory Basis & Key Deadlines (§ 6-1-1703(7))', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1703(7) requires that when a deployer "discovers that a high-risk ' +
    'artificial intelligence system that the deployer deployed has caused or is ' +
    'reasonably likely to cause algorithmic discrimination," the deployer must take ' +
    'specified action. Key obligations and deadlines include:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const keyDeadlines = [
    '\u2022  90-day reporting deadline: The deployer must report the algorithmic ' +
    'discrimination to the Colorado Attorney General within 90 days of discovery ' +
    '(§ 6-1-1703(7)).',
    '\u2022  Self-cure / affirmative defense (two-prong test): Under § 6-1-1706(3), a deployer ' +
    'may assert an affirmative defense if BOTH prongs are met: (a) the deployer discovers ' +
    'and cures the violation as a result of (I) encouraging feedback, (II) adversarial ' +
    'testing or red teaming as defined by NIST, or (III) an internal review process ' +
    '(§ 6-1-1706(3)(a)); AND (b) the deployer is otherwise in compliance with the NIST ' +
    'AI Risk Management Framework and ISO/IEC 42001, or another nationally or ' +
    'internationally recognized equivalent framework (§ 6-1-1706(3)(b)).',
    '\u2022  Exclusive enforcement: The Attorney General has exclusive enforcement authority ' +
    'under § 6-1-1706. There is no private right of action under SB 24-205.',
  ];
  keyDeadlines.forEach(function(dl) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, dl, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── AG Contact ────────────────────────────────────────────
  y = addSectionHeader(doc, '2. Attorney General Contact Information', y);
  y = addWrappedText(doc, 'Colorado Attorney General', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, 'Ralph L. Carr Colorado Judicial Center', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, '1300 Broadway, 10th Floor, Denver, CO 80203', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, 'Phone: (720) 508-6000', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc, 'Website: coag.gov', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y = addWrappedText(doc,
    'Note: Confirm current AG reporting procedures and any required forms at coag.gov ' +
    'before making a report. As of March 2026, the AG had not yet issued formal ' +
    'implementing rules for SB 24-205.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Phase 1: Detection & Initial Response ─────────────────
  y = addSectionHeader(doc, '3. Phase 1: Incident Detection & Triage', y);
  y = addWrappedText(doc,
    'An "incident" for purposes of this Plan is any discovery that a deployed high-risk ' +
    'AI system has caused or is reasonably likely to cause "algorithmic discrimination" ' +
    'as defined in § 6-1-1701(1)(a) — any unlawful differential impact on consumers ' +
    'because of their age, color, disability, ethnicity, genetic information, limited ' +
    'English proficiency, national origin, race, religion, reproductive health, sex, ' +
    'veteran status, or any other classification protected under the laws of this state ' +
    'or federal law.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ir_incident_id', 'Incident ID / Reference Number:', y);
  y = addFormTextField(doc, 'co_ir_discovery_date', 'Date of Discovery (Day 0 — 90-day clock starts here):', y);
  y = addFormTextField(doc, 'co_ir_discovered_by', 'Discovered By (Name, Title, Department):', y);
  y = addFormTextField(doc, 'co_ir_discovery_method', 'How incident was discovered (e.g., consumer complaint, internal audit, bias monitoring, adversarial testing):', y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, 'co_ir_system_affected', 'High-risk AI system involved:', y);
  y = addFormTextField(doc, 'co_ir_decision_areas', 'Consequential decision areas affected (§ 6-1-1701(3)):', y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, 'co_ir_protected_classes', 'Protected class(es) potentially affected (§ 6-1-1701(1)(a)):', y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, 'co_ir_consumers_affected', 'Estimated number of consumers affected:', y);
  y += LINE_HEIGHT;

  // ── Phase 2: Internal Investigation ──────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '4. Phase 2: Internal Investigation Procedure', y);
  y = addWrappedText(doc,
    'Upon discovery of a potential incident of algorithmic discrimination, the following ' +
    'steps shall be completed within the timeframes indicated:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  const investigationSteps = [
    { step: 'Step 1 (Days 1-3): Immediate notification', desc: 'Notify the AI Risk Officer, legal/compliance team, and executive sponsor. Document discovery details.' },
    { step: 'Step 2 (Days 1-7): System assessment', desc: 'Assess whether continued deployment poses ongoing risk. Consider interim suspension if risk is severe.' },
    { step: 'Step 3 (Days 3-14): Root cause analysis', desc: 'Identify the source and mechanism of the alleged discrimination. Review system documentation, audit logs, and impact assessment.' },
    { step: 'Step 4 (Days 7-30): Scope determination', desc: 'Determine the full scope of impact: which consumers were affected, over what time period, and what consequential decisions were involved.' },
    { step: 'Step 5 (Days 14-60): Remediation design', desc: 'Design remediation measures. Engage vendor if developer-caused. Document all corrective actions taken or planned.' },
    { step: 'Step 6 (Days 1-89): AG reporting preparation', desc: 'Prepare report to Colorado AG per § 6-1-1703(7). Report must be made within 90 days of discovery.' },
    { step: 'Step 7 (Day 90 deadline): File AG report', desc: 'Submit report to the Colorado Attorney General. Retain a copy in incident records.' },
  ];
  investigationSteps.forEach(function(s) {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, s.step + ':', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addWrappedText(doc, s.desc, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ir_lead_investigator', 'Lead Investigator (Name & Title):', y);
  y = addFormTextField(doc, 'co_ir_legal_counsel', 'Legal Counsel Engaged (Name / Firm):', y);
  y = addFormTextField(doc, 'co_ir_root_cause', 'Root Cause Finding (summary):', y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, 'co_ir_scope_finding', 'Scope of Impact Finding:', y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // ── Phase 3: Affirmative Defense & Self-Cure ─────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '5. Phase 3: Affirmative Defense Documentation (§ 6-1-1706(3))', y);
  y = addWrappedText(doc,
    'Under § 6-1-1706(3), a deployer may assert an affirmative defense against an ' +
    'enforcement action by the Attorney General if BOTH prongs are satisfied: ' +
    '(a) the deployer discovers and cures the violation as a result of the practices ' +
    'in (I)-(III) below (§ 6-1-1706(3)(a)); AND (b) the deployer is otherwise in ' +
    'compliance with the NIST AI RMF and ISO/IEC 42001, or another equivalent framework ' +
    '(§ 6-1-1706(3)(b)). Evidence for Prong (a):',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, '(I) Encouraging consumer feedback (§ 6-1-1706(3)(a)(I)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormCheckbox(doc, 'co_ir_defense_feedback', 'Company maintained a consumer feedback mechanism for reporting concerns about AI system outputs', y);
  y = addFormTextField(doc, 'co_ir_defense_feedback_details', 'Describe feedback mechanism(s) in place at time of incident:', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, '(II) Adversarial testing / red teaming (§ 6-1-1706(3)(a)(II)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormCheckbox(doc, 'co_ir_defense_testing', 'Company conducted adversarial testing or red teaming of the affected system prior to the incident', y);
  y = addFormTextField(doc, 'co_ir_defense_testing_details', 'Describe testing conducted (date, methodology, results):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, '(III) Internal review for algorithmic discrimination (§ 6-1-1706(3)(a)(III)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addFormCheckbox(doc, 'co_ir_defense_review', 'Company conducted an internal review of the affected system for algorithmic discrimination prior to the incident', y);
  y = addFormTextField(doc, 'co_ir_defense_review_details', 'Describe internal review(s) conducted (date, methodology, findings):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Prong 2: Framework compliance
  if (y > 220) { doc.addPage(); y = MARGIN; }
  doc.setFont('helvetica', 'bold');
  y = addWrappedText(doc, 'Prong (b): AI Risk Management Framework Compliance (§ 6-1-1706(3)(b)):', MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont('helvetica', 'normal');
  y = addWrappedText(doc,
    'The deployer must also be in compliance with a recognized AI risk management ' +
    'framework. Under § 6-1-1706(3)(b)(I), this means the NIST AI Risk Management ' +
    'Framework AND ISO/IEC 42001. Alternatively, under (b)(II), another nationally or ' +
    'internationally recognized framework that is substantially equivalent or more ' +
    'stringent, or (b)(III) a framework designated by the Attorney General.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addFormCheckbox(doc, 'co_ir_defense_framework', 'Company was in compliance with a recognized AI risk management framework at time of incident', y);
  y = addFormTextField(doc, 'co_ir_defense_framework_name', 'Framework(s) in use (e.g., NIST AI RMF, ISO/IEC 42001):', y);
  y = addFormTextField(doc, 'co_ir_defense_framework_evidence', 'Evidence of framework compliance (certification date, audit records, internal documentation):', y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Phase 4: Notification & Remediation ──────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '6. Phase 4: Remediation & Notification', y);
  y = addFormTextField(doc, 'co_ir_remediation_steps', 'Remediation measures implemented:', y, { multiline: true, lines: 5 });
  y = addFormTextField(doc, 'co_ir_remediation_date', 'Date remediation completed / system restored or suspended:', y);
  y = addFormCheckbox(doc, 'co_ir_consumers_notified', 'Affected consumers notified of the incident and any corrective action', y);
  y = addFormTextField(doc, 'co_ir_consumer_notification_date', 'Date consumers notified:', y);
  y = addFormTextField(doc, 'co_ir_ag_report_date', 'Date of AG Report (must be within 90 days of discovery, § 6-1-1703(7)):', y);
  y = addFormTextField(doc, 'co_ir_ag_report_summary', 'Summary of AG report contents:', y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // ── Record Retention ──────────────────────────────────────
  y = addSectionHeader(doc, '7. Incident Record Retention', y);
  y = addWrappedText(doc,
    'All incident records shall be retained for at least 3 years after the final ' +
    'deployment of the affected system (§ 6-1-1703(3)(f)), or as otherwise required ' +
    'by applicable law. Records include: discovery documentation, investigation notes, ' +
    'root cause analysis, remediation records, consumer notifications, and the AG report.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, 'co_ir_retention_location', 'Location where incident records are stored:', y);
  y = addFormTextField(doc, 'co_ir_retention_custodian', 'Records Custodian (Name & Title):', y);
  y = addFormTextField(doc, 'co_ir_retention_end_date', 'Retention End Date:', y);

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 7: Record Retention Policy
// § 6-1-1703(3)(f)
// ============================================================
export function generateCORecordRetention(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, 'Record Retention Policy', data);
  y = addTopDisclaimer(doc, y);

  // ── Statutory Basis ────────────────────────────────────────
  y = addSectionHeader(doc, '1. Statutory Basis (§ 6-1-1703(3)(f))', y);
  y = addWrappedText(doc,
    'C.R.S. § 6-1-1703(3)(f) requires that deployers retain, for at least 3 years after ' +
    'the final deployment of a high-risk AI system, the following records:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(I) The most recently completed impact assessment for each high-risk AI system;',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(II) All records concerning each impact assessment (including drafts, supporting ' +
    'data, and review records); and',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += 2;
  y = addWrappedText(doc,
    '(III) All prior assessments completed for each system.',
    MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addWrappedText(doc,
    'Additionally, the Attorney General may request that a deployer make impact ' +
    'assessments available within a reasonable time (§ 6-1-1703(3)(e)). This policy ' +
    'ensures all required records are retained and retrievable.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // ── Retention Schedule Table ───────────────────────────────
  y = addSectionHeader(doc, '2. Retention Schedule', y);
  y = addWrappedText(doc,
    'The following records must be retained for the minimum periods indicated. ' +
    '"Final deployment" means the date on which the deployer ceases to use the ' +
    'high-risk AI system in any consequential decision.',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // Draw table header
  const col1 = MARGIN;
  const col2 = MARGIN + 95;
  const col3 = MARGIN + 145;

  doc.setFillColor(230, 237, 255);
  doc.setDrawColor(100, 130, 200);
  doc.setLineWidth(0.3);
  doc.rect(col1, y - 4, CONTENT_WIDTH, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(BODY_SIZE);
  doc.text('Document / Record Type', col1 + 2, y);
  doc.text('Minimum Retention Period', col2 + 2, y);
  doc.text('Statutory Basis', col3 + 2, y);
  y += 6;
  doc.setFont('helvetica', 'normal');

  const retentionRows: [string, string, string][] = [
    ['Most recently completed Impact Assessment (each system)', '3 years after final deployment', '§ 6-1-1703(3)(f)(I)'],
    ['All records concerning each Impact Assessment', '3 years after final deployment', '§ 6-1-1703(3)(f)(II)'],
    ['All prior Impact Assessments for each system', '3 years after final deployment', '§ 6-1-1703(3)(f)(III)'],
    ['Risk Management Policy and all versions', '3 years after policy is superseded or program discontinued', '§ 6-1-1703(2)'],
    ['Consumer pre-decision notices (copies / templates)', '3 years after final deployment of associated system', '§ 6-1-1703(4)(a)'],
    ['Adverse decision records (explanation letters, data provided)', '3 years minimum; consider FCRA/state law requirements', '§ 6-1-1703(4)(b)'],
    ['Data correction requests and responses', '3 years minimum', '§ 6-1-1703(4)(b)(II)'],
    ['Appeal records and human review records', '3 years minimum', '§ 6-1-1703(4)(b)(III)'],
    ['Transparency statement (each version)', '3 years after each version is superseded', '§ 6-1-1703(5)'],
    ['Incident reports (AG reports, internal investigation records)', '3 years after final deployment or resolution', '§ 6-1-1703(7)'],
    ['Consumer notifications related to incidents', '3 years after final deployment or resolution', '§ 6-1-1703(7)'],
    ['Developer/vendor documentation, bias reports, agreements', '3 years after final deployment of associated system', '§ 6-1-1703(2)(a)'],
  ];

  retentionRows.forEach(function(row, idx) {
    if (y > 265) { doc.addPage(); y = MARGIN; }
    const bg: [number, number, number] = (idx % 2 === 0) ? [248, 248, 255] : [255, 255, 255];
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.rect(col1, y - 4, CONTENT_WIDTH, 8, 'FD');
    doc.setFontSize(8);
    const lines1: string[] = doc.splitTextToSize(row[0], 88);
    const lines2: string[] = doc.splitTextToSize(row[1], 45);
    const lines3: string[] = doc.splitTextToSize(row[2], 40);
    const maxLines = Math.max(lines1.length, lines2.length, lines3.length);
    const rowH = maxLines * 4.5;
    // Extend rect for multi-line rows
    if (maxLines > 1) {
      doc.setFillColor(bg[0], bg[1], bg[2]);
      doc.rect(col1, y - 4, CONTENT_WIDTH, rowH + 2, 'FD');
    }
    lines1.forEach(function(l: string, li: number) { doc.text(l, col1 + 2, y + (li * 4.5)); });
    lines2.forEach(function(l: string, li: number) { doc.text(l, col2 + 2, y + (li * 4.5)); });
    lines3.forEach(function(l: string, li: number) { doc.text(l, col3 + 2, y + (li * 4.5)); });
    y += rowH + 3;
    doc.setFontSize(BODY_SIZE);
  });
  y += LINE_HEIGHT;

  // ── Retention Implementation ──────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, '3. Implementation Requirements', y);
  y = addWrappedText(doc,
    'The following implementation standards apply to all records subject to this policy:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;

  const implSteps = [
    '(a) Format: Records may be maintained in electronic or physical format, provided ' +
    'they remain legible and accessible for the full retention period.',
    '(b) Integrity: Records must not be altered after finalization. Changes must be ' +
    'documented through version control or amendment procedures.',
    '(c) Accessibility: Upon request of the Colorado Attorney General, records must ' +
    'be made available within a reasonable time (§ 6-1-1703(3)(e)).',
    '(d) Security: Records containing consumer personal data must be secured against ' +
    'unauthorized access consistent with Colorado Privacy Act requirements (§ 6-1-1301 et seq.).',
    '(e) Destruction: Records must not be destroyed before the expiration of the ' +
    'applicable retention period. If a legal hold is in effect, records must be ' +
    'preserved beyond the standard retention period.',
  ];
  implSteps.forEach(function(s) {
    if (y > 270) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, s, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Per-System Tracking ───────────────────────────────────
  y = addSectionHeader(doc, '4. Per-System Retention Tracking', y);
  y = addWrappedText(doc,
    'Complete one entry per deployed high-risk AI system:',
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  const aiSystems = data.aiSystems || [];
  aiSystems.forEach(function(sys, idx) {
    const sysNum = idx + 1;
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont('helvetica', 'bold');
    y = addWrappedText(doc, 'System ' + sysNum + ': ' + (sys.name || 'AI System ' + sysNum), MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont('helvetica', 'normal');
    y = addFormTextField(doc, 'co_rr_sys' + sysNum + '_deploy_date', 'Initial deployment date:', y);
    y = addFormTextField(doc, 'co_rr_sys' + sysNum + '_final_deploy_date', 'Date of final deployment (if system has been discontinued):', y);
    y = addFormTextField(doc, 'co_rr_sys' + sysNum + '_retention_end', 'Retention end date (3 years after final deployment):', y);
    y = addFormTextField(doc, 'co_rr_sys' + sysNum + '_record_location', 'Location of retained records (system/folder path):', y);
    y = addFormTextField(doc, 'co_rr_sys' + sysNum + '_custodian', 'Records Custodian (Name & Title):', y);
    y += LINE_HEIGHT;
  });

  // ── Policy Approval ───────────────────────────────────────
  y = addSectionHeader(doc, '5. Policy Approval', y);
  y = addFormTextField(doc, 'co_rr_approved_by', 'Approved By (Name & Title):', y,
    { prefill: data.contact ? data.contact.name || '' : '' });
  y = addFormTextField(doc, 'co_rr_approval_date', 'Approval Date:', y, { prefill: data.generatedDate || '' });
  y = addFormTextField(doc, 'co_rr_next_review', 'Date of Next Review:', y);

  addDisclaimer(doc);
  return doc;
}


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
