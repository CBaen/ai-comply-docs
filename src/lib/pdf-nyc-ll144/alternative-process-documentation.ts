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
// DOCUMENT 6: Alternative Selection Process Documentation
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// Per § 20-871(a)(2): employer must allow requests for an
// alternative selection process or accommodation
// ============================================================
export function generateAlternativeProcessDocumentation(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Alternative Selection Process Documentation",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `NYC Admin. Code § 20-871(a)(2) requires that employers using an AEDT provide candidates and employees with the ability to request an alternative selection process or accommodation. This document records ${data.company.name}'s alternative process offerings and serves as the log for individual requests and responses. Recommended Best Practice — not a statutory mandate: document each request and response in writing and retain records for at least 4 years.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Available Alternative Processes ─────────────────────────
  y = addSectionHeader(doc, "Available Alternative Processes", y);
  y = addWrappedText(
    doc,
    `${data.company.name} makes the following alternative processes available to candidates and employees who request them. Check all that currently apply:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const alternatives = [
    "Human-only review of resume and application materials (without AEDT scoring or ranking)",
    "In-person or video interview conducted directly by a hiring manager, without AEDT input provided in advance",
    "Structured behavioral interview conducted by a panel of reviewers",
    "Work sample, skills demonstration, or portfolio submission reviewed by humans",
    "Reference-based evaluation or professional background review without AEDT assistance",
    "Accommodation tailored to the candidate/employee's documented disability or other basis",
    "Other (describe below)",
  ];
  let cbIdx = 0;
  alternatives.forEach((alt) => {
    y = addFormCheckbox(doc, `alt_${cbIdx}`, alt, y);
    cbIdx++;
  });
  y = addFormTextField(doc, "alt_other_desc", "Other (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // ── Request Process Instructions ─────────────────────────────
  y = addSectionHeader(doc, "How to Request an Alternative Process", y);
  y = addWrappedText(
    doc,
    `Candidates and employees may request an alternative selection process at any time before or during the hiring or promotion process. Submit requests in writing to:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    `${data.contact.name}${data.contact.title ? ", " + data.contact.title : ""}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      `Email: ${data.contact.email}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      `Phone: ${data.contact.phone}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  y += 4;
  y = addWrappedText(
    doc,
    "Recommended Best Practice — not a statutory mandate: acknowledge receipt within 3 business days and provide a substantive response within 5 business days. If a request cannot be accommodated, document the reason.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Request and Response Log ─────────────────────────────────
  y = addSectionHeader(doc, "Request and Response Log", y);
  y = addWrappedText(
    doc,
    "Use the following log entries to record each request received. Attach additional copies of this page as needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  for (let i = 1; i <= 3; i++) {
    y = addWrappedText(
      doc,
      `\u25A0 Request #${i}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    y = addFormTextField(doc, `req_${i}_candidate`, "  Candidate/Employee Name:", y);
    y = addFormTextField(doc, `req_${i}_position`, "  Position/Role:", y);
    y = addFormTextField(doc, `req_${i}_aedt`, "  AEDT the request relates to:", y);
    y = addFormTextField(
      doc,
      `req_${i}_date_received`,
      "  Date Written Request Received:",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_basis`,
      "  Stated Basis for Request (if provided):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `req_${i}_process_offered`,
      "  Alternative Process Offered:",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_outcome`,
      "  Outcome (completed / declined by candidate / not granted — reason):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `req_${i}_response_date`,
      "  Date Response Provided:",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_reviewed_by`,
      "  Request Reviewed By (Name/Title):",
      y
    );
    y += LINE_HEIGHT;
  }

  // ── Program Administrator ────────────────────────────────────
  y = addSectionHeader(doc, "Alternative Process Program Administrator", y);
  y = addFormTextField(
    doc,
    "admin_name",
    "Program Administrator (Name/Title):",
    y,
    { prefill: `${data.contact.name}${data.contact.title ? ", " + data.contact.title : ""}`, readOnly: false }
  );
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  if (data.contact.phone)
    y = addFormTextField(doc, "admin_phone", "Phone:", y, {
      prefill: data.contact.phone,
      readOnly: false,
    });
  y = addFormTextField(doc, "admin_review_date", "Policy Last Reviewed / Updated:", y);

  addDisclaimer(doc);
  return doc;
}
