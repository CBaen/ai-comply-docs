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
