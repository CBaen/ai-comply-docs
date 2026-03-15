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
// CA ADMT Access Request Intake Form
// CCPA/CPRA Cal. Civ. Code § 1798.110 + CPPA ADMT Regulations
// ============================================================
export function generateAccessRequestIntake(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Access Request Intake Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This form is used by ${data.company.name} to receive and document consumer requests for access to information about Automated Decision-Making Technology (ADMT) decisions that affected them, as provided under the California Consumer Privacy Act (CCPA/CPRA) and CPPA ADMT regulations. The business has 45 calendar days to respond (Cal. Civ. Code §1798.100(b)(1)), with one 45-day extension available upon notice. One form per request. Retain for a minimum of 24 months.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Tracking
  y = addSectionHeader(doc, "1. Request Tracking Information", y);
  y = addFormTextField(doc, "ari_request_id", "Request ID / Tracking Number:", y, {
    width: 100,
  });
  y = addFormTextField(doc, "ari_received_date", "Date Request Received:", y, {
    width: 70,
  });
  y = addFormTextField(doc, "ari_deadline_45", "45-Day Response Deadline:", y, {
    width: 70,
  });
  y = addFormTextField(doc, "ari_intake_staff", "Request Received By (name/role):", y, {
    width: 130,
  });
  y = addFormTextField(
    doc,
    "ari_channel",
    "Channel (web form, email, phone, mail, in person):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 2: Consumer Information
  y = addSectionHeader(doc, "2. Consumer Information", y);
  y = addFormTextField(doc, "ari_consumer_name", "Consumer Full Legal Name:", y, {
    width: 140,
  });
  y = addFormTextField(
    doc,
    "ari_consumer_email",
    "Consumer Email Address:",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "ari_consumer_phone",
    "Consumer Phone Number:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ari_consumer_address",
    "Consumer Mailing Address:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ari_consumer_relationship",
    "Consumer's Relationship to Business (e.g., customer, loan applicant, job applicant, employee):",
    y,
    { width: 150 }
  );
  y += LINE_HEIGHT;

  // Section 3: Identity Verification Method
  y = addSectionHeader(doc, "3. Identity Verification Method", y);
  y = addWrappedText(
    doc,
    "Select the verification method used. Verification must not be unnecessarily burdensome (§1798.130(a)(4)):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const verifyMethods = [
    "Verified through authenticated consumer account login",
    "Email verification link clicked by consumer",
    "Information matched to records on file (account number, last 4 of SSN, etc.)",
    "Knowledge-based authentication questions answered correctly",
    "Government ID provided (only if genuinely required — document necessity below)",
    "No separate verification required — request submitted through authenticated portal",
  ];
  verifyMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `ari_verify_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "ari_verify_notes",
    "Verification Notes (including why ID was required, if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ari_verify_date",
    "Verification Completed Date:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Section 4: Specific ADMT Decision Being Inquired About
  y = addSectionHeader(
    doc,
    "4. Specific ADMT Decision the Consumer Is Inquiring About",
    y
  );
  y = addWrappedText(
    doc,
    "The consumer should identify the specific decision. If they have not provided sufficient detail, staff should assist the consumer in identifying it:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "ari_decision_description",
    "Consumer's Description of the Decision at Issue:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "ari_admt_system_name",
    "ADMT System Identified as Involved (if known):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "ari_decision_date",
    "Date of the ADMT Decision (approximate if exact date unknown):",
    y,
    { width: 90 }
  );
  y = addFormTextField(
    doc,
    "ari_decision_outcome",
    "Known Outcome of the Decision (e.g., loan denied, application rejected, offer not extended):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Access Request Scope
  y = addSectionHeader(doc, "5. Scope of Access Request", y);
  y = addWrappedText(
    doc,
    "Check all categories of information the consumer is requesting access to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const accessScope = [
    "What ADMT system was used and who developed it",
    "What personal data was processed by the ADMT",
    "Key factors or parameters the ADMT used in reaching its output",
    "The output or recommendation the ADMT produced",
    "Whether and how a human reviewed the ADMT output",
    "What the final decision was and who made it",
    "Whether the consumer has the right to opt out going forward",
    "How to submit an opt-out request",
  ];
  accessScope.forEach((item, idx) => {
    y = addFormCheckbox(doc, `ari_scope_${idx}`, item, y);
  });
  y = addFormTextField(
    doc,
    "ari_scope_other",
    "Additional Scope Requested by Consumer:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 6: Internal Routing
  y = addSectionHeader(doc, "6. Internal Routing and Assignment", y);
  y = addFormTextField(
    doc,
    "ari_assigned_to",
    "Request Assigned To (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "ari_assigned_date",
    "Assignment Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "ari_escalation",
    "Escalation Required? (Yes/No — if Yes, describe):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ari_notes",
    "Internal Notes:",
    y,
    { multiline: true, lines: 2 }
  );

  addDisclaimer(doc);
  return doc;
}
