import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  DATA_INPUT_LABELS,
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

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "co_impact", y);

  addDisclaimer(doc);
  return doc;
}
