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
