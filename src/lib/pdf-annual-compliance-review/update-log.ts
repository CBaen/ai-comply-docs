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
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Compliance Update Log
// What changed, when, who approved
// ============================================================
export function generateUpdateLog(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Compliance Update Log", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This log records changes made to " +
      data.company.name +
      "'s AI compliance documents, policies, and procedures. " +
      "Each change must be documented with the date, nature of the change, reason, and approver. " +
      "This log is an appendix to the Annual Compliance Review Checklist and should be maintained continuously.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Instructions ───────────────────────────────────────────
  y = addSectionHeader(doc, "Instructions", y);
  const instructions = [
    "(a) Add an entry every time any AI compliance document is updated — including policy updates, template revisions, vendor changes, new AI system additions, or regulatory-triggered updates.",
    "(b) Include the date the change was made, not the date the document is signed.",
    "(c) Record the reason for the change — regulatory update, incident response, policy improvement, or scheduled review.",
    "(d) Record who approved the change. Material policy changes should be approved by Legal and HR.",
    "(e) Keep this log for a minimum of 5 years. It is your audit trail.",
  ];
  instructions.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Document Version History ───────────────────────────────
  y = addSectionHeader(doc, "Document Version History", y);
  y = addFormTextField(doc, "ul_doc_name", "Compliance Program Name:", y, { prefill: data.company.name + " AI Compliance Program" });
  y = addFormTextField(doc, "ul_doc_created", "Compliance Program First Created:", y);
  y = addFormTextField(doc, "ul_doc_current_version", "Current Version Number:", y);
  y += LINE_HEIGHT;

  // ── Update Log Table ───────────────────────────────────────
  y = addSectionHeader(doc, "Update Log", y);
  y = addWrappedText(
    doc,
    "Record each change to any compliance document below. Use additional pages as needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  // Draw table header
  const cols = [
    { label: "Date", width: 22 },
    { label: "Document Affected", width: 48 },
    { label: "Nature of Change", width: 55 },
    { label: "Reason", width: 28 },
    { label: "Approved By", width: 17 },
  ];
  const rowHeight = 14;
  const tableLeft = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  let colX = tableLeft;
  cols.forEach((col) => {
    doc.rect(colX, y, col.width, rowHeight * 0.7);
    doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
    colX += col.width;
  });
  doc.setFont("helvetica", "normal");
  y += rowHeight * 0.7;

  // Draw 20 log entry rows
  for (let row = 0; row < 20; row++) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
      // Re-draw header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      colX = tableLeft;
      cols.forEach((col) => {
        doc.rect(colX, y, col.width, rowHeight * 0.7);
        doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
        colX += col.width;
      });
      doc.setFont("helvetica", "normal");
      y += rowHeight * 0.7;
    }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = tableLeft;
    cols.forEach((col) => {
      doc.rect(colX, y, col.width, rowHeight);
      colX += col.width;
    });
    doc.setDrawColor(0);
    y += rowHeight;
  }
  y += LINE_HEIGHT;

  // ── Regulatory Change Tracker ──────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Regulatory Change Tracker", y);
  y = addWrappedText(
    doc,
    "Use this section to track regulatory developments that may require document updates. " +
      "When a regulatory change is identified, record it here and note what compliance action is required.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const regCols = [
    { label: "Date Identified", width: 28 },
    { label: "Law / Agency", width: 40 },
    { label: "Change Description", width: 60 },
    { label: "Action Required", width: 42 },
  ];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  colX = tableLeft;
  regCols.forEach((col) => {
    doc.rect(colX, y, col.width, rowHeight * 0.7);
    doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
    colX += col.width;
  });
  doc.setFont("helvetica", "normal");
  y += rowHeight * 0.7;

  for (let row = 0; row < 10; row++) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      colX = tableLeft;
      regCols.forEach((col) => {
        doc.rect(colX, y, col.width, rowHeight * 0.7);
        doc.text(col.label, colX + 1, y + 4, { maxWidth: col.width - 2 });
        colX += col.width;
      });
      doc.setFont("helvetica", "normal");
      y += rowHeight * 0.7;
    }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = tableLeft;
    regCols.forEach((col) => {
      doc.rect(colX, y, col.width, rowHeight);
      colX += col.width;
    });
    doc.setDrawColor(0);
    y += rowHeight;
  }
  y += LINE_HEIGHT;

  // ── Log Certification ──────────────────────────────────────
  if (y > 230) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Log Certification", y);
  y = addWrappedText(
    doc,
    "The undersigned certifies that this log accurately reflects changes made to " +
      data.company.name +
      "'s AI compliance program during the review period shown.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "ul_cert_name", "Compliance Program Administrator (Name & Title):", y);
  y = addFormTextField(doc, "ul_cert_sig", "Signature:", y);
  y = addFormTextField(doc, "ul_cert_date", "Date:", y);

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ann_log", y);

  addDisclaimer(doc);
  return doc;
}
