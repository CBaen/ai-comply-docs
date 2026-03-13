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
