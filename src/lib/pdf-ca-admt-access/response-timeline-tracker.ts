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
// CA ADMT Access Request Response Timeline Tracker
// CCPA 45-day response window (Cal. Civ. Code §1798.100(b)(1))
// ============================================================
export function generateResponseTimelineTracker(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "ADMT Access Request Response Timeline Tracker",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This tracker monitors ${data.company.name}'s compliance with the CCPA 45-day response window for ADMT access requests (Cal. Civ. Code §1798.100(b)(1)). A single 45-day extension is available if the business notifies the consumer before the original 45-day deadline expires. Maintain one tracker per request. CPPA may investigate companies with a pattern of late responses.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Identification
  y = addSectionHeader(doc, "1. Request Identification", y);
  y = addFormTextField(doc, "rtt_request_id", "Request ID / Tracking Number:", y, {
    width: 110,
  });
  y = addFormTextField(doc, "rtt_consumer_name", "Consumer Name:", y, {
    width: 140,
  });
  y = addFormTextField(
    doc,
    "rtt_consumer_email",
    "Consumer Email Address:",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "rtt_admt_system",
    "ADMT System at Issue:",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "rtt_decision_type",
    "Decision Type at Issue:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Core Timeline Fields
  y = addSectionHeader(doc, "2. Core Response Timeline (CCPA §1798.100(b)(1))", y);
  y = addWrappedText(
    doc,
    "Fill in each date as it occurs. The 45-day clock starts on the date the verifiable consumer request is received.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 6;

  y = addFormTextField(
    doc,
    "rtt_received_date",
    "Request Received Date (Day 0 — start of 45-day clock):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rtt_ack_sent_date",
    "Acknowledgment of Receipt Sent to Consumer (date):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rtt_verification_complete",
    "Identity Verification Completed Date:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rtt_deadline_45",
    "45-Day Deadline (calculated from Day 0):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 3: Extension
  y = addSectionHeader(doc, "3. Extension (If Applicable)", y);
  y = addWrappedText(
    doc,
    "A single 45-day extension is permitted under Cal. Civ. Code §1798.100(b)(1) if the business notifies the consumer of the reasons for the delay BEFORE the initial 45-day deadline expires.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "rtt_extension_requested",
    "Extension Requested? (Yes / No):",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "rtt_extension_reason",
    "Reason for Extension (must be documented):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "rtt_extension_notice_date",
    "Extension Notice Sent to Consumer Date (must be before Day 45):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rtt_deadline_90",
    "Extended Deadline — Day 90 (if extension granted):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 4: Response Sent
  y = addSectionHeader(doc, "4. Response Sent", y);
  y = addFormTextField(
    doc,
    "rtt_response_sent_date",
    "Date Response Sent to Consumer:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "rtt_days_to_respond",
    "Total Days Elapsed from Day 0 to Response Sent:",
    y,
    { width: 60 }
  );
  y = addWrappedText(
    doc,
    "Response Method (check all that apply):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const responseMethods = [
    "Email to consumer",
    "Secure message through consumer account/portal",
    "Mail to consumer's address on file",
    "In-person disclosure (if requested)",
  ];
  responseMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `rtt_method_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "rtt_response_staff",
    "Response Sent By (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "rtt_response_reference",
    "Response Reference / Document ID (attach explanation document):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 5: Outcome and Status
  y = addSectionHeader(doc, "5. Outcome and Closure Status", y);
  const statusOptions = [
    "Response sent — request fulfilled in full",
    "Response sent — request partially fulfilled (reason documented)",
    "Response sent — request denied (reason and statutory basis documented)",
    "Request withdrawn by consumer before response",
    "Request closed — consumer not verified within response window",
    "Escalated — pending legal review",
  ];
  statusOptions.forEach((status, idx) => {
    y = addFormCheckbox(doc, `rtt_status_${idx}`, status, y);
  });
  y = addFormTextField(
    doc,
    "rtt_outcome_notes",
    "Outcome Notes (partial fulfillment or denial reason):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "rtt_closed_date",
    "Request Closed / Resolved Date:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Section 6: On-time Compliance Check
  y = addSectionHeader(doc, "6. Compliance Self-Check", y);
  const complianceChecks = [
    "Response sent within 45 calendar days of verified request (or within 90 days if extension properly noticed)",
    "Acknowledgment of receipt sent promptly after request received",
    "Extension notice (if used) sent before Day 45 deadline",
    "Response provided in an accessible format",
    "Consumer was not required to create an account to submit the request",
    "Verification was not unnecessarily burdensome",
    "Record retained in compliance log for minimum 24 months",
  ];
  complianceChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, `rtt_check_${idx}`, check, y);
  });
  y = addFormTextField(
    doc,
    "rtt_compliance_notes",
    "Compliance Notes (any exceptions or issues encountered):",
    y,
    { multiline: true, lines: 2 }
  );

  addDisclaimer(doc);
  return doc;
}
