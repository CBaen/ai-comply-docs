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
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Email AI Notification Template
// Email notification template for AI disclosure
// ============================================================
export function generateEmailNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Email AI Disclosure Notification — Templates", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document provides pre-written email templates for notifying consumers, applicants, or employees about AI use. " +
      "Choose the version that fits your situation. All templates should be reviewed by legal counsel before sending.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Template 1: General Consumer AI Disclosure ─────────────
  y = addSectionHeader(doc, "Email Template 1: General Consumer AI Disclosure", y);
  y = addWrappedText(doc, "Use for: Notifying customers that AI is used in your products or services.", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT / 2;

  doc.setFillColor(248, 250, 255);
  doc.setDrawColor(100, 150, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 72, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Subject: Important Notice — How We Use AI at [Company Name]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const t1 = [
    "Dear [Customer Name],",
    "",
    "We want to be transparent about how [Company Name] uses artificial intelligence technology.",
    "",
    "We use AI to: [describe use cases — e.g., personalize your experience, process your application, assist our customer service team].",
    "",
    "What this means for you:",
    "\u2022 AI helps us serve you more efficiently. A human being reviews all significant decisions about your account.",
    "\u2022 You have the right to [opt out of certain AI processing / request human review / ask questions].",
    "\u2022 Your data is handled as described in our Privacy Policy at [link].",
    "",
    "Questions? Contact us at [contact info]. We're here to help.",
    "",
    "[Company Name]",
  ];
  t1.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 10 + i * 4, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 76;

  y = addFormTextField(doc, "en_t1_use_cases", "Fill in: AI use cases for Template 1:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "en_t1_rights", "Fill in: Consumer rights available:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Template 2: Employment AI Disclosure ───────────────────
  if (y > 170) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Email Template 2: Employment / Hiring AI Disclosure", y);
  y = addWrappedText(doc, "Use for: Notifying job applicants or employees that AI is used in employment decisions. Required by IL HB3773, NYC LL144, CO SB24-205.", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT / 2;

  doc.setFillColor(248, 252, 248);
  doc.setDrawColor(60, 150, 80);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 72, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Subject: Notice of AI Use in Our [Hiring / Employment] Process — [Company Name]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const t2 = [
    "Dear [Applicant / Employee Name],",
    "",
    "We are writing to inform you that [Company Name] uses AI tools in our [hiring / employment] process.",
    "",
    "Specifically, we use AI to [describe — e.g., review applications, assess qualifications, schedule interviews].",
    "",
    "Important information about our AI use:",
    "\u2022 AI assists our process — all employment decisions are reviewed and made by a qualified human manager.",
    "\u2022 AI is used only for [list decision types — e.g., initial application screening, scheduling, assessment].",
    "\u2022 You may request more information about how AI was used in evaluating your [application / performance].",
    "\u2022 You may request a reasonable accommodation if you prefer not to interact with AI assessments.",
    "",
    "To request information or accommodation, contact: [HR Contact Name, Title, Email]",
    "",
    "[Company Name] Human Resources",
  ];
  t2.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 10 + i * 4, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 76;

  y = addFormTextField(doc, "en_t2_ai_role", "Fill in: Role of AI in employment process:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "en_t2_hr_contact", "Fill in: HR contact for accommodation requests:", y);
  y += LINE_HEIGHT;

  // ── Template 3: Adverse Decision AI Notification ───────────
  if (y > 170) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Email Template 3: Adverse Decision — AI Used in Decision", y);
  y = addWrappedText(doc, "Use for: Notifying a consumer or applicant that an adverse decision was made with AI assistance. Required by CO SB24-205, CA CCPA ADMT, and others.", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT / 2;

  doc.setFillColor(255, 250, 245);
  doc.setDrawColor(200, 100, 50);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 68, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Subject: Notice Regarding Your [Application / Account / Request] — [Company Name]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const t3 = [
    "Dear [Name],",
    "",
    "We are writing regarding [describe decision — e.g., \"your recent application,\" \"your account review\"].",
    "",
    "Our decision: [outcome — e.g., \"We were unable to approve your application at this time.\"]",
    "",
    "Notice of AI use: An automated decision-making system was used to assist in this decision.",
    "You have the right to: (1) request a human review of this decision; (2) request information about the",
    "principal reasons for the decision; (3) request correction of any inaccurate information used.",
    "",
    "To exercise these rights, contact us within [X] days at: [contact info]",
    "",
    "[Company Name]",
  ];
  t3.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 10 + i * 4.2, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 72;

  y = addFormTextField(doc, "en_t3_contact", "Fill in: Contact for human review requests:", y);
  y = addFormTextField(doc, "en_t3_deadline", "Fill in: Days to request review:", y);
  y += LINE_HEIGHT;

  // ── Email Compliance Notes ─────────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Email Compliance Notes", y);
  const notes = [
    "(a) All email notifications should be sent from a monitored address. Consumers must be able to reply.",
    "(b) Retain copies of sent notifications as evidence of disclosure compliance.",
    "(c) For employment AI (IL, NYC, CO): send notification before AI is used in decisions, not after.",
    "(d) For adverse decisions (CO SB24-205): notice must explain principal reasons and provide human review option.",
    "(e) Date-stamp all notifications. Regulatory audits may request proof of notice delivery.",
  ];
  notes.forEach((note) => {
    y = addWrappedText(doc, note, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "en_implementation_date", "Date Templates Approved:", y);
  y = addFormTextField(doc, "en_reviewer", "Reviewed By (Name, Date):", y);

  addDisclaimer(doc);
  return doc;
}
