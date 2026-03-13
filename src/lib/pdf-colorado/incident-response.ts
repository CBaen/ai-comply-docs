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
