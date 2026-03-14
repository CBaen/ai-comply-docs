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
// DOCUMENT 5: Alternative Selection Process Documentation
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateAlternativeSelection(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Alternative Selection Process Documentation",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document records ${data.company.name}'s alternative selection process procedures, pursuant to NYC Admin. Code § 20-871(a)(2), which requires employers to make reasonable accommodations and alternative processes available to candidates and employees who cannot or choose not to participate in an AEDT-assisted selection process. Recommended Best Practice \u2014 not a statutory mandate: document each request and response in writing.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Available Alternative Processes", y);
  y = addWrappedText(
    doc,
    `${data.company.name} makes the following alternatives available to candidates and employees who request them. Check all that apply:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const alternatives = [
    "Human-only resume and application review (without AEDT scoring)",
    "In-person interview conducted by hiring manager without AEDT input",
    "Work sample or skills demonstration assessment",
    "Structured behavioral interview by panel",
    "Portfolio review or reference-based evaluation",
    "Other (specify below)",
  ];
  let cbCount = 0;
  alternatives.forEach((alt) => {
    y = addFormCheckbox(doc, "alt_" + cbCount, alt, y);
    cbCount++;
  });
  y = addFormTextField(doc, "alt_other_desc", "Other (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Request and Response Log", y);
  y = addWrappedText(
    doc,
    "Use the following log to record each request for an alternative process. Recommended Best Practice \u2014 not a statutory mandate: respond to all requests within 5 business days.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  for (let i = 1; i <= 3; i++) {
    y = addWrappedText(
      doc,
      `Request #${i}:`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    y = addFormTextField(doc, `req_${i}_name`, "  Candidate/Employee Name:", y);
    y = addFormTextField(doc, `req_${i}_position`, "  Position Applied For:", y);
    y = addFormTextField(doc, `req_${i}_date_received`, "  Date Request Received:", y);
    y = addFormTextField(
      doc,
      `req_${i}_reason`,
      "  Reason for Request (if provided):",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_alternative`,
      "  Alternative Process Offered:",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_outcome`,
      "  Outcome (completed / declined / other):",
      y
    );
    y = addFormTextField(
      doc,
      `req_${i}_response_date`,
      "  Date Response Provided:",
      y
    );
    y += LINE_HEIGHT;
  }

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(
    doc,
    "admin_name",
    "Alternative Process Program Administrator:",
    y,
    { prefill: data.contact.name, readOnly: false }
  );
  y = addFormTextField(doc, "admin_title", "Title:", y, {
    prefill: data.contact.title,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });

  addDisclaimer(doc);
  return doc;
}
