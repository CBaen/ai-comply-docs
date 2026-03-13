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
} from "../pdf-helpers";

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
