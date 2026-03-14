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
// DOCUMENT 3: Request Response Timeline Tracker
// Response deadline tracker for consumer rights requests
// ============================================================
export function generateTimelineTracker(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Rights Request — Response Timeline Tracker", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This tracker helps " +
      data.company.name +
      " manage response deadlines for consumer data rights requests. " +
      "State privacy laws impose strict timelines — missing a deadline is itself a violation. " +
      "Most laws require response within 45 days of a verified request, with one 45-day extension if notice is provided.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Timeline Reference ─────────────────────────────────────
  y = addSectionHeader(doc, "Response Timeline Quick Reference", y);

  const timelines = [
    "California CCPA: 45 days from verified request + 45-day extension with notice (Cal. Civ. Code § 1798.145(b)).",
    "Colorado SB24-205: 45 days from verified request + 45-day extension with notice (C.R.S. § 6-1-1303(3)).",
    "Minnesota MCDPA: 45 days from receipt + 45-day extension with notice (Minn. Stat. § 325M.16(d)).",
    "Texas TDPSA: 45 days from request + 45-day extension with notice (Tex. Bus. & Com. Code § 541.051(c)).",
    "Delaware PDPA: 45 days from request + 45-day extension with notice (Del. Code tit. 6, § 12D-104(c)).",
    "Virginia CDPA: 45 days from request + 45-day extension with notice (Va. Code § 59.1-578(A)).",
    "Appeals: Most states require an appeals mechanism. Appeal decisions must be issued within 60 days of appeal submission.",
  ];
  timelines.forEach((tl) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, "\u2022  " + tl, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Active Request Tracker ─────────────────────────────────
  if (y > 170) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Active Request Tracker", y);
  y = addWrappedText(
    doc,
    "One row per active consumer rights request:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  // Table header
  const trackCols = [
    { label: "Ticket #", width: 16 },
    { label: "Requestor (initials)", width: 20 },
    { label: "Request Type", width: 30 },
    { label: "Received", width: 18 },
    { label: "Verified", width: 18 },
    { label: "45-Day Due", width: 18 },
    { label: "Extended?", width: 16 },
    { label: "Extension Due", width: 18 },
    { label: "Responded", width: 16 },
  ];
  const rowH = 10;
  let colX = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  trackCols.forEach((col) => {
    doc.rect(colX, y, col.width, rowH * 0.75);
    doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
    colX += col.width;
  });
  doc.setFont("helvetica", "normal");
  y += rowH * 0.75;

  // 15 tracker rows
  for (let row = 0; row < 15; row++) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      colX = MARGIN;
      trackCols.forEach((col) => {
        doc.rect(colX, y, col.width, rowH * 0.75);
        doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
        colX += col.width;
      });
      doc.setFont("helvetica", "normal");
      y += rowH * 0.75;
    }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = MARGIN;
    trackCols.forEach((col) => {
      doc.rect(colX, y, col.width, rowH);
      colX += col.width;
    });
    doc.setDrawColor(0);
    y += rowH;
  }
  y += LINE_HEIGHT;

  // ── Closed Request Summary ─────────────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Closed Request Summary", y);
  y = addFormTextField(doc, "tt_total_received", "Total requests received (this period):", y);
  y = addFormTextField(doc, "tt_total_fulfilled", "Fulfilled in full:", y);
  y = addFormTextField(doc, "tt_total_partial", "Partially fulfilled:", y);
  y = addFormTextField(doc, "tt_total_denied", "Denied:", y);
  y = addFormTextField(doc, "tt_total_extended", "Responses requiring extension:", y);
  y = addFormTextField(doc, "tt_total_appealed", "Requests appealed:", y);
  y = addFormTextField(doc, "tt_avg_response_days", "Average response time (days):", y);
  y = addFormTextField(doc, "tt_overdue", "Requests that exceeded deadline (describe):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Appeals Tracker ────────────────────────────────────────
  y = addSectionHeader(doc, "Appeals Tracker", y);
  y = addWrappedText(
    doc,
    "Track each appeal of a denied or partially granted request:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const appealCols = [
    { label: "Ticket #", width: 16 },
    { label: "Original Request Type", width: 38 },
    { label: "Appeal Received", width: 22 },
    { label: "Appeal Due", width: 22 },
    { label: "Decision", width: 30 },
    { label: "Date Decided", width: 22 },
    { label: "Notified", width: 20 },
  ];
  colX = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  appealCols.forEach((col) => {
    doc.rect(colX, y, col.width, rowH * 0.75);
    doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
    colX += col.width;
  });
  doc.setFont("helvetica", "normal");
  y += rowH * 0.75;

  for (let row = 0; row < 8; row++) {
    if (y > 265) { doc.addPage(); y = MARGIN; }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = MARGIN;
    appealCols.forEach((col) => {
      doc.rect(colX, y, col.width, rowH);
      colX += col.width;
    });
    doc.setDrawColor(0);
    y += rowH;
  }
  y += LINE_HEIGHT;

  // ── Tracker Certification ──────────────────────────────────
  if (y > 230) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Tracker Review & Certification", y);
  y = addFormTextField(doc, "tt_period", "Tracking Period:", y);
  y = addFormTextField(doc, "tt_reviewer", "Reviewed By (Name, Title):", y);
  y = addFormTextField(doc, "tt_review_date", "Review Date:", y);
  y = addFormTextField(doc, "tt_notes", "Notes:", y, { multiline: true, lines: 3 });

  addDisclaimer(doc);
  return doc;
}
