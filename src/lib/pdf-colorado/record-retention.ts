import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
} from "../pdf-helpers";

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
