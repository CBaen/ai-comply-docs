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
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// Consumer Rights Exercise — Intake Form
// Virginia CDPA — Va. Code § 59.1-577(A)
// ============================================================
export function generateRightsRequestIntake(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request — Intake Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This intake form is used by ${data.company.name} to receive and record consumer rights requests submitted under the Virginia Consumer Data Protection Act (VCDPA), Va. Code § 59.1-577(A). Consumers may exercise the rights of access, correction, deletion, portability, and opt-out of profiling, targeted advertising, or sale of personal data. Requests must receive an initial response within 45 days of receipt; a single 45-day extension is permitted when reasonably necessary, with notice to the consumer (§ 59.1-577(D)).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Consumer Information ──────────────────────
  y = addSectionHeader(doc, "Section 1 — Consumer Information", y);
  y = addFormTextField(doc, "rcr_consumer_name", "Consumer Full Name:", y);
  y = addFormTextField(doc, "rcr_consumer_email", "Email Address:", y);
  y = addFormTextField(doc, "rcr_consumer_phone", "Phone Number (optional):", y);
  y = addFormTextField(
    doc,
    "rcr_consumer_address",
    "Mailing Address (optional):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 2;

  // ── Section 2: Identity Verification ─────────────────────
  y = addSectionHeader(doc, "Section 2 — Identity Verification", y);
  y = addWrappedText(
    doc,
    "Controllers must implement a reasonably accessible, authenticated mechanism for submitting requests (§ 59.1-577(C)). If the controller cannot verify the consumer's identity, it may decline to act but must notify the consumer (§ 59.1-577(F)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addWrappedText(
    doc,
    "Verification method used — check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const verificationMethods = [
    "Authenticated account login",
    "Email confirmation to address on file",
    "Government-issued ID (copy on file)",
    "Knowledge-based authentication questions",
    "Other (describe below)",
  ];
  verificationMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `rcr_verify_method_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "rcr_verify_notes",
    "Verification notes / other method description:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "rcr_verify_status",
    "Verification outcome (verified / unable to verify / pending):",
    y
  );
  y += 4;

  // ── Section 3: Rights Being Exercised ────────────────────
  y = addSectionHeader(
    doc,
    "Section 3 — Rights Being Exercised (§ 59.1-577(A))",
    y
  );
  y = addWrappedText(
    doc,
    "Check all rights the consumer is requesting to exercise:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  const rights = [
    "Right to CONFIRM whether the controller processes the consumer's personal data, and to ACCESS that data (§ 59.1-577(A)(1))",
    "Right to CORRECT inaccuracies in personal data (§ 59.1-577(A)(2))",
    "Right to DELETE personal data provided by or obtained about the consumer (§ 59.1-577(A)(3))",
    "Right to DATA PORTABILITY — obtain a copy in portable, readily usable format (§ 59.1-577(A)(4))",
    "Right to OPT OUT of processing for TARGETED ADVERTISING (§ 59.1-577(A)(5)(a))",
    "Right to OPT OUT of SALE of personal data (§ 59.1-577(A)(5)(b))",
    "Right to OPT OUT of PROFILING in furtherance of solely automated decisions producing legal or similarly significant effects (§ 59.1-577(A)(5)(c))",
  ];
  rights.forEach((right, idx) => {
    y = addFormCheckbox(doc, `rcr_right_${idx}`, right, y);
  });
  y += 4;

  // ── Section 4: Request Details ────────────────────────────
  y = addSectionHeader(doc, "Section 4 — Description of Request", y);
  y = addFormTextField(
    doc,
    "rcr_request_description",
    "Consumer's description of their request (attach additional pages if needed):",
    y,
    { multiline: true, lines: 5 }
  );
  y += 4;

  // ── Section 5: Administrative Tracking ───────────────────
  y = addSectionHeader(doc, "Section 5 — Administrative Tracking", y);
  y = addFormTextField(doc, "rcr_date_received", "Date Request Received:", y);
  y = addFormTextField(doc, "rcr_request_id", "Internal Request ID / Tracking Number:", y);
  y = addFormTextField(
    doc,
    "rcr_deadline_45day",
    "45-Day Response Deadline (date received + 45 days):",
    y
  );
  y = addFormTextField(
    doc,
    "rcr_extension_deadline",
    "Extended Deadline (if 45-day extension invoked — +45 additional days):",
    y
  );
  y = addFormTextField(
    doc,
    "rcr_extension_notice_sent",
    "Extension notice sent to consumer on (date, required if extension used):",
    y
  );
  y = addFormTextField(doc, "rcr_assigned_to", "Request Assigned To:", y);
  y = addFormTextField(
    doc,
    "rcr_response_date",
    "Date Response Sent:",
    y
  );
  y = addFormTextField(
    doc,
    "rcr_outcome",
    "Outcome / Action Taken Summary:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "rcr", y);

  addDisclaimer(doc);
  return doc;
}
