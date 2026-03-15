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
// Consumer Rights — Appeal Workflow
// Virginia CDPA — Va. Code § 59.1-577(C)
// ============================================================
export function generateAppealWorkflow(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Appeal — Workflow Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This form documents the appeal process for ${data.company.name} pursuant to Va. Code § 59.1-577(C). When a controller declines to take action on a consumer rights request, it must: (1) inform the consumer of the reason for refusal, (2) provide an appeal process, (3) respond to the appeal within 60 days, and (4) upon denial of appeal, provide the consumer an online mechanism or other method to contact the Virginia Attorney General (§ 59.1-577(C)(3)).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Original Request Reference ────────────────
  y = addSectionHeader(doc, "Section 1 — Original Request Reference", y);
  y = addFormTextField(doc, "apw_original_request_id", "Original Request Tracking ID:", y);
  y = addFormTextField(doc, "apw_consumer_name", "Consumer Name:", y);
  y = addFormTextField(doc, "apw_original_date", "Date of Original Request:", y);
  y = addFormTextField(doc, "apw_original_denial_date", "Date Original Request Was Denied:", y);
  y = addWrappedText(
    doc,
    "Right(s) denied in original request — check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const deniedRights = [
    "Right to confirm / access personal data (§ 59.1-577(A)(1))",
    "Right to correct inaccuracies (§ 59.1-577(A)(2))",
    "Right to delete personal data (§ 59.1-577(A)(3))",
    "Right to data portability (§ 59.1-577(A)(4))",
    "Right to opt out of targeted advertising (§ 59.1-577(A)(5)(a))",
    "Right to opt out of sale of personal data (§ 59.1-577(A)(5)(b))",
    "Right to opt out of profiling (§ 59.1-577(A)(5)(c))",
  ];
  deniedRights.forEach((right, idx) => {
    y = addFormCheckbox(doc, `apw_denied_right_${idx}`, right, y);
  });
  y = addFormTextField(
    doc,
    "apw_denial_reason",
    "Reason provided to consumer for original denial:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 4;

  // ── Section 2: Appeal Submission ─────────────────────────
  y = addSectionHeader(doc, "Section 2 — Appeal Submission", y);
  y = addFormTextField(doc, "apw_appeal_id", "Appeal Tracking ID:", y);
  y = addFormTextField(doc, "apw_appeal_received_date", "Date Appeal Received:", y);
  y = addFormTextField(
    doc,
    "apw_consumer_appeal_statement",
    "Consumer's reason for appeal (summarize or attach):",
    y,
    { multiline: true, lines: 4 }
  );
  y += 4;

  // ── Section 3: 60-Day Response Deadline ──────────────────
  y = addSectionHeader(doc, "Section 3 — Response Deadline (§ 59.1-577(C)(2))", y);
  y = addWrappedText(
    doc,
    "The controller must respond to the appeal within 60 days of receipt (§ 59.1-577(C)(2)). The response must inform the consumer of any action taken or the reasons for refusal.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "apw_deadline_60day", "60-Day Response Deadline (appeal date + 60 days):", y);
  y = addFormTextField(doc, "apw_assigned_reviewer", "Appeal Assigned To (reviewer name / role):", y);
  y += 4;

  // ── Section 4: Appeal Review Process ─────────────────────
  y = addSectionHeader(doc, "Section 4 — Appeal Review Process", y);
  y = addWrappedText(
    doc,
    "Review steps completed — check each step as it is performed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const reviewSteps = [
    "Confirmed consumer identity and original request details",
    "Reviewed original denial basis and supporting documentation",
    "Consulted applicable statutory exceptions (§ 59.1-577(B) and § 59.1-583)",
    "Obtained legal / privacy counsel review (if applicable)",
    "Internal escalation to privacy officer / decision authority completed",
    "Appeal decision documented with supporting rationale",
  ];
  reviewSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, `apw_review_step_${idx}`, step, y);
  });
  y = addFormTextField(
    doc,
    "apw_review_notes",
    "Additional review notes:",
    y,
    { multiline: true, lines: 3 }
  );
  y += 4;

  // ── Section 5: Appeal Outcome ─────────────────────────────
  y = addSectionHeader(doc, "Section 5 — Appeal Outcome", y);
  y = addWrappedText(
    doc,
    "Appeal determination — select one:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormCheckbox(doc, "apw_outcome_approved", "APPROVED — consumer's request will be honored in full", y);
  y = addFormCheckbox(doc, "apw_outcome_partial", "PARTIALLY APPROVED — consumer's request honored in part (explain below)", y);
  y = addFormCheckbox(doc, "apw_outcome_denied", "DENIED — request cannot be honored (explain below, AG referral required)", y);
  y = addFormTextField(
    doc,
    "apw_outcome_explanation",
    "Explanation of appeal outcome (required for partial approval or denial):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(doc, "apw_response_date", "Date Response Sent to Consumer:", y);
  y += 4;

  // ── Section 6: AG Complaint Referral (denial only) ───────
  y = addSectionHeader(
    doc,
    "Section 6 — Attorney General Complaint Referral (Required on Denial, § 59.1-577(C)(3))",
    y
  );
  y = addWrappedText(
    doc,
    "If the appeal is denied, the controller MUST provide the consumer with an online mechanism or other method through which the consumer may contact the Virginia Attorney General to submit a complaint. Failure to provide this referral information is a separate compliance obligation under § 59.1-577(C)(3). Complete the AG Complaint Referral Notice (separate document in this kit) and attach it to the denial response.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "apw_ag_referral_included",
    "AG Complaint Referral Notice attached and provided to consumer",
    y
  );
  y = addFormTextField(
    doc,
    "apw_ag_referral_date",
    "Date AG Referral Notice provided to consumer:",
    y
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "apw", y);

  addDisclaimer(doc);
  return doc;
}
