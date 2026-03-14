import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: ADMT Opt-Out Mechanism
// CCPA/CPRA Cal. Civ. Code § 1798.100 et seq. + CPPA ADMT Regulations (eff. 1-1-26)
// ============================================================
export function generateOptOutMechanism(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Consumer Opt-Out Mechanism", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes ${data.company.name}'s consumer opt-out mechanism for Automated Decision-Making Technology (ADMT), as required by the California Consumer Privacy Act/California Privacy Rights Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and California Privacy Protection Agency (CPPA) ADMT regulations (effective January 1, 2026). California consumers have the right to opt out of ADMT used for legal or similarly significant decisions. Penalties: \$2,500 per violation, \$7,500 per intentional violation, \$7,500 per violation involving a child's personal information. Verify current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Opt-Out Right Overview
  y = addSectionHeader(doc, "1. Consumer Right to Opt Out of ADMT", y);
  y = addWrappedText(
    doc,
    "California consumers have the right to opt out of the use of ADMT to make or contribute to decisions that produce legal or similarly significant effects on them. This right applies to decisions in areas including (but not limited to): financial services, housing, employment, insurance, healthcare, and education. The original 30-day cure period for CCPA violations was eliminated by CPRA for California Privacy Protection Agency (CPPA) enforcement — the CPPA may pursue enforcement without a cure period.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: How Consumers Exercise Opt-Out
  y = addSectionHeader(doc, "2. Opt-Out Request Channels", y);
  y = addWrappedText(
    doc,
    `${data.company.name} accepts opt-out requests through the following channels. At least one of these must be available to consumers:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const channels = [
    "Online webform or privacy portal (URL to be configured and tested)",
    "Email to privacy officer / designated ADMT contact",
    "Toll-free telephone number",
    "Written request by mail to business address",
    "In-person at business location (if applicable)",
    "Link or button clearly labeled 'Opt Out of Automated Decision-Making' on website",
  ];
  let cbIdx = 0;
  channels.forEach((item) => { y = addFormCheckbox(doc, `channel_${cbIdx++}`, item, y); });
  y = addFormTextField(doc, "optout_url", "Opt-Out Request URL:", y, { width: 140 });
  y = addFormTextField(doc, "optout_email", "Privacy/ADMT Contact Email:", y, { prefill: data.contact.email || "", width: 120 });
  y = addFormTextField(doc, "optout_phone", "Opt-Out Phone Number:", y, { prefill: data.contact.phone || "", width: 80 });
  y += LINE_HEIGHT;

  // Section 3: Opt-Out Request Processing Procedures
  y = addSectionHeader(doc, "3. Opt-Out Request Processing Procedures", y);
  const processingSteps = [
    "Consumer submits opt-out request through an authorized channel",
    "Business acknowledges receipt of request promptly (within 10 business days recommended)",
    "Verify consumer identity (if verification is required, it must not be unnecessarily burdensome)",
    "Apply opt-out to all ADMT processing of consumer's personal information within 15 business days of request (verify current CPPA timeline requirement)",
    "Document the opt-out request and date applied in consumer records",
    "Confirm to consumer that opt-out has been honored",
    "Do not deny service or penalize consumer for exercising opt-out right",
    "Assess whether alternative non-ADMT process is available for the consumer",
  ];
  processingSteps.forEach((step) => { y = addFormCheckbox(doc, `proc_${cbIdx++}`, step, y); });
  y += LINE_HEIGHT;

  // Section 4: Alternative Processing Without ADMT
  y = addSectionHeader(doc, "4. Alternative Processing for Consumers Who Opt Out", y);
  y = addWrappedText(
    doc,
    "When a consumer opts out of ADMT, document the alternative process that will be used to make or facilitate the relevant decision:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys, idx) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `ADMT System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `alternative_${idx}`, "Alternative Process (without ADMT):", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, `alt_timeline_${idx}`, "Timeline for Alternative Process:", y, { width: 80 });
    y += 4;
  });

  // Section 5: Opt-Out Form Template
  y = addSectionHeader(doc, "5. Consumer Opt-Out Request Form Template", y);
  y = addWrappedText(
    doc,
    `Use this form template on your website or provide to consumers who request to opt out of ADMT:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 8;

  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.3);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 3);
  doc.setFillColor(248, 248, 248);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 3, "F");
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, `${data.company.name} — Request to Opt Out of Automated Decision-Making`, MARGIN + 2, y + 2.5, CONTENT_WIDTH - 4, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y += 4;

  y = addFormTextField(doc, "form_consumer_name", "Your Full Name:", y, { width: 140 });
  y = addFormTextField(doc, "form_consumer_email", "Your Email Address:", y, { width: 140 });
  y = addFormTextField(doc, "form_consumer_phone", "Your Phone Number (optional):", y, { width: 100 });
  y = addFormTextField(doc, "form_consumer_address", "Your Mailing Address:", y, { width: 140 });
  y = addFormTextField(doc, "form_relationship", "Your Relationship to Our Business (e.g., customer, applicant, employee):", y, { width: 140 });
  y = addFormTextField(doc, "form_admt_context", "Decision Type You Are Opting Out Of:", y, { multiline: true, lines: 2 });
  y += 4;

  y = addWrappedText(
    doc,
    "I am a California resident and I request to opt out of the use of automated decision-making technology (ADMT) in connection with decisions that may have legal or similarly significant effects on me. I understand that my request will be processed within [15] business days of verification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "form_signature", "Signature:", y, { width: 100 });
  y = addFormTextField(doc, "form_date", "Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Section 6: Record-Keeping
  y = addSectionHeader(doc, "6. Opt-Out Record-Keeping", y);
  const recordItems = [
    "All opt-out requests logged with consumer name/identifier, request date, channel, and processing date",
    "Opt-out status flagged in consumer records and propagated to all ADMT processing systems",
    "Opt-out records retained for minimum 24 months",
    "Opt-out records available for CPPA examination upon request",
    "Annual review of opt-out volume and processing timelines",
  ];
  recordItems.forEach((item) => { y = addFormCheckbox(doc, `record_${cbIdx++}`, item, y); });

  y += LINE_HEIGHT;
  y = addFormTextField(doc, "optout_policy_owner", "Opt-Out Policy Owner:", y, { width: 120 });
  y = addFormTextField(doc, "optout_review_date", "Policy Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
