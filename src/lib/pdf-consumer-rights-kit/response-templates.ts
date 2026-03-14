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
// DOCUMENT 2: Consumer Rights Response Letter Templates
// Response letters: fulfillment, partial denial, full denial
// ============================================================
export function generateResponseTemplates(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Response Letter Templates", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document provides three response letter templates for consumer data rights requests received by " +
      data.company.name +
      ": " +
      "(1) Full Fulfillment — request granted in full; " +
      "(2) Partial Response — some elements granted, some denied; " +
      "(3) Full Denial — request denied. " +
      "All letters should be reviewed by legal counsel before use. Response timelines vary by state — most require a response within 45 days of a verified request.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Template 1: Full Fulfillment ───────────────────────────
  y = addSectionHeader(doc, "Template 1: Full Fulfillment Response", y);
  y = addWrappedText(
    doc,
    "Use when you are granting the consumer's request in full:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(245, 255, 245);
  doc.setDrawColor(40, 150, 60);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 70, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 100, 30);
  doc.text("Subject: Response to Your Data Rights Request — [Request #]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0);
  const t1Lines = [
    "Dear [Requestor Name],",
    "",
    "We received your data rights request dated [Request Date] and have completed our review.",
    "",
    "Your request for [type of request] has been granted.",
    "",
    "[FOR ACCESS/PORTABILITY: Enclosed/attached is a copy of the personal data we hold about you.]",
    "[FOR CORRECTION: We have updated your record as follows: (describe correction).]",
    "[FOR DELETION: We have deleted the following data: (describe). Note: we may retain data required by law.]",
    "[FOR OPT-OUT: Your preference has been recorded. Effective date: (date).]",
    "[FOR HUMAN REVIEW: A human reviewer has reconsidered your case. The result is: (describe).]",
    "",
    "If you have questions, contact us at: [contact info]",
    "",
    data.company.name + " Privacy Team  |  [Date]",
  ];
  t1Lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 11 + i * 4, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 74;

  y = addFormTextField(doc, "rt_t1_notes", "Notes for customizing Template 1:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Template 2: Partial Response ───────────────────────────
  if (y > 170) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Template 2: Partial Response (Some Elements Granted)", y);
  y = addWrappedText(
    doc,
    "Use when you can fulfill part of the request but must deny other parts:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(255, 252, 240);
  doc.setDrawColor(200, 150, 20);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 72, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(140, 100, 10);
  doc.text("Subject: Response to Your Data Rights Request — [Request #]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0);
  const t2Lines = [
    "Dear [Requestor Name],",
    "",
    "We received your data rights request dated [Request Date] and have completed our review.",
    "",
    "Parts of your request we are granting:",
    "[Describe what is being fulfilled — e.g., access to account data, deletion of marketing data, opt-out preference]",
    "",
    "Parts of your request we are unable to fulfill at this time:",
    "[Describe what is being denied and state the legal exception — e.g., \"We are required by law to retain [data type] for [period].\"]",
    "[Cite the specific statutory exception if known — e.g., \"Under Cal. Civ. Code § 1798.105(d)(3)...\"]",
    "",
    "Your appeal rights: You may appeal this decision within [X] days by [describe process].",
    "You may also file a complaint with [applicable agency — e.g., CPPA at cppa.ca.gov].",
    "",
    data.company.name + " Privacy Team  |  [Date]",
  ];
  t2Lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 11 + i * 3.8, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 76;

  y = addFormTextField(doc, "rt_t2_notes", "Notes for customizing Template 2:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Template 3: Full Denial ────────────────────────────────
  if (y > 170) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Template 3: Full Denial Response", y);
  y = addWrappedText(
    doc,
    "Use when the request is denied in full. Full denials must cite specific legal exceptions — a blanket denial is not sufficient under most state laws:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(255, 248, 248);
  doc.setDrawColor(180, 50, 50);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 68, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(140, 30, 30);
  doc.text("Subject: Response to Your Data Rights Request — [Request #]", MARGIN + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(0);
  const t3Lines = [
    "Dear [Requestor Name],",
    "",
    "We received your data rights request dated [Request Date] and have completed our review.",
    "",
    "We are unable to fulfill your request for the following reason(s):",
    "1. [Specific reason — e.g., \"We could not verify your identity as required by [state] law.\"]",
    "2. [Specific exception — e.g., \"The data you requested is exempt because [legal basis].\"]",
    "3. [If identity issue: \"Please resubmit with the following documentation to verify your identity: (list).\"]",
    "",
    "This decision does not waive any of your legal rights.",
    "Your appeal rights: You may appeal within [X] days by [process].",
    "You may also file a complaint with [applicable agency].",
    "",
    data.company.name + " Privacy Team  |  [Date]",
  ];
  t3Lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 11 + i * 3.8, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 72;

  y = addFormTextField(doc, "rt_t3_notes", "Notes for customizing Template 3:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Response Configuration ─────────────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Response Program Configuration", y);
  y = addWrappedText(
    doc,
    "Fill in the following for your specific program before using these templates:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "rt_response_days", "Standard response time (e.g., 45 days):", y);
  y = addFormTextField(doc, "rt_extension_days", "Extension available (e.g., 45-day extension with notice):", y);
  y = addFormTextField(doc, "rt_appeal_days", "Appeal deadline (days from response):", y);
  y = addFormTextField(doc, "rt_appeal_process", "How to appeal (process description):", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "rt_regulatory_agency", "Applicable regulatory agency for complaints:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "rt_privacy_contact", "Privacy Team Contact (name, email, address):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "rt_reviewed_by", "Templates Reviewed By (Name, Date):", y);

  addDisclaimer(doc);
  return doc;
}
