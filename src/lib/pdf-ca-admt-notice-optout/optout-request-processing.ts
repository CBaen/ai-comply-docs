import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CA ADMT Opt-Out Request Processing Workflow
// CPPA ADMT Regulations + CCPA 45-day response window
// ============================================================
export function generateOptoutRequestProcessing(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "ADMT Opt-Out Request Processing Workflow",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This workflow documents ${data.company.name}'s internal process for receiving, verifying, processing, and responding to consumer opt-out requests for Automated Decision-Making Technology (ADMT), as required under the California Consumer Privacy Act (CCPA/CPRA) and CPPA ADMT regulations. The CCPA provides a 45-calendar-day response window (Cal. Civ. Code §1798.100(b)(1)), extendable by an additional 45 days with notice. Verify current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Intake Fields
  y = addSectionHeader(doc, "1. Request Intake", y);
  y = addWrappedText(
    doc,
    "Complete this section when an opt-out request is received. One form per request.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "orp_request_id", "Request ID / Tracking Number:", y, {
    width: 100,
  });
  y = addFormTextField(doc, "orp_received_date", "Date Request Received:", y, {
    width: 70,
  });
  y = addFormTextField(doc, "orp_received_time", "Time Received (include timezone):", y, {
    width: 80,
  });
  y = addFormTextField(doc, "orp_consumer_name", "Consumer Full Name:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "orp_consumer_email", "Consumer Email Address:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "orp_consumer_phone", "Consumer Phone Number:", y, {
    width: 100,
  });
  y = addFormTextField(doc, "orp_consumer_address", "Consumer Mailing Address:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(
    doc,
    "orp_channel",
    "Channel Through Which Request Was Received (web form, email, phone, mail, in person):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "orp_admt_context",
    "ADMT Decision Type Consumer Is Opting Out Of:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "orp_intake_staff",
    "Received By (staff name/role):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 2: Identity Verification Steps
  y = addSectionHeader(doc, "2. Identity Verification", y);
  y = addWrappedText(
    doc,
    "Identity verification must not be unnecessarily burdensome (CCPA §1798.130(a)(4)). Use the minimum information necessary to verify the consumer's identity. Document the verification method used:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const verificationMethods = [
    "Email confirmation (consumer clicked verification link)",
    "Account login / authentication through consumer portal",
    "Matching provided information to records on file (name, account number, etc.)",
    "Government-issued ID (only where required — do not default to this)",
    "Knowledge-based questions matching records on file",
    "No verification required (request submitted through authenticated account)",
  ];
  verificationMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `orp_verify_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "orp_verify_date",
    "Verification Completed Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "orp_verify_staff",
    "Verification Completed By:",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "orp_verify_notes",
    "Verification Notes (if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Processing Timeline (aligned with CCPA 45-day window)
  y = addSectionHeader(
    doc,
    "3. Processing Timeline (CCPA 45-Day Window)",
    y
  );
  y = addWrappedText(
    doc,
    "The CCPA requires responding to consumer requests within 45 calendar days of receipt (§1798.100(b)(1)). A single 45-day extension is available if the business notifies the consumer before the initial 45-day period expires.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "orp_day0",
    "Day 0 — Request Received Date (start of 45-day clock):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "orp_deadline_45",
    "Day 45 Deadline (initial response due by this date):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "orp_ack_sent_date",
    "Acknowledgment of Receipt Sent to Consumer (date):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "orp_extension_requested",
    "Extension Requested? (Yes/No — if Yes, must notify consumer before Day 45):",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "orp_extension_notice_date",
    "Extension Notice Sent to Consumer Date (if applicable):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "orp_deadline_90",
    "Day 90 Extended Deadline (if extension granted):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "orp_optout_applied_date",
    "Date Opt-Out Applied to All ADMT Systems:",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 4: Outcome Documentation
  y = addSectionHeader(doc, "4. Outcome Documentation", y);
  y = addWrappedText(
    doc,
    "Document the outcome of this opt-out request. Select one outcome and complete the relevant fields:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const outcomes = [
    "Opt-out honored — ADMT use stopped for this consumer",
    "Opt-out honored with alternative process provided",
    "Request denied — reason documented below",
    "Request withdrawn by consumer",
    "Request cannot be fulfilled — consumer not identifiable",
  ];
  outcomes.forEach((outcome, idx) => {
    y = addFormCheckbox(doc, `orp_outcome_${idx}`, outcome, y);
  });
  y = addFormTextField(
    doc,
    "orp_denial_reason",
    "If Denied — Reason for Denial (statutory basis):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "orp_alternative_process",
    "Alternative Process Provided to Consumer (if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "orp_outcome_staff",
    "Outcome Determined By (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "orp_outcome_date",
    "Outcome Determined Date:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Section 5: Consumer Notification of Outcome
  y = addSectionHeader(doc, "5. Consumer Notification of Outcome", y);
  y = addWrappedText(
    doc,
    "Document how and when the consumer was notified of the outcome of their opt-out request:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const notificationMethods = [
    "Email to consumer's address on file",
    "Written letter by mail",
    "Notification through consumer's account/portal",
    "Phone call (log call notes below)",
  ];
  notificationMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `orp_notify_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "orp_notification_date",
    "Consumer Notified Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "orp_notification_staff",
    "Notification Sent By:",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "orp_notification_notes",
    "Notification Notes / Confirmation Reference:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "orp", y);

  addDisclaimer(doc);
  return doc;
}
