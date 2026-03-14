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
// DOCUMENT 3: Physical Workplace AI Posting
// Physical workplace posting template
// ============================================================
export function generatePhysicalPosting(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Physical Workplace AI Disclosure Posting — Templates", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document provides templates for physical postings about AI use. " +
      "Physical postings are required or recommended for certain employment-related AI laws and as good practice " +
      "wherever employees or consumers interact with AI systems in person.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Posting 1: Employee AI Use Notice ─────────────────────
  y = addSectionHeader(doc, "Posting 1: Employee AI Use Notice (Breakroom / Bulletin Board)", y);
  y = addWrappedText(
    doc,
    "Print and post in employee common areas. Recommended for IL HB3773, NYC LL144, and CO SB24-205 compliance:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  // Draw posting box
  doc.setFillColor(235, 245, 255);
  doc.setDrawColor(30, 80, 170);
  doc.setLineWidth(1);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 68, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 60, 150);
  doc.text("NOTICE: AI USE IN YOUR WORKPLACE", MARGIN + CONTENT_WIDTH / 2, y + 8, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 80, 170);
  doc.text(data.company.name, MARGIN + CONTENT_WIDTH / 2, y + 14, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0);
  const posting1Lines = [
    "We use AI tools in our workplace. Here is what you need to know:",
    "",
    "\u2022 AI tools used here: [list approved tools]",
    "\u2022 These tools assist decisions — qualified humans make all final employment decisions.",
    "\u2022 AI is used for: [describe uses — e.g., scheduling, application review, performance support].",
    "\u2022 You can ask questions about AI use affecting you. Contact: [HR Contact]",
    "\u2022 You have the right to request an accommodation if you prefer a non-AI process.",
    "",
    "Questions? Contact HR at: [HR Contact Name, Title, Phone/Email]",
  ];
  posting1Lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 20 + i * 5, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0);
  y += 72;

  y = addFormTextField(doc, "pp_p1_tools", "Fill in: AI tools used (for Posting 1):", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "pp_p1_uses", "Fill in: What AI is used for:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "pp_p1_hr_contact", "Fill in: HR contact:", y);
  y += LINE_HEIGHT;

  // ── Posting 2: Consumer-Facing AI Notice ───────────────────
  if (y > 160) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Posting 2: Consumer-Facing AI Disclosure (Waiting Area / Customer Space)", y);
  y = addWrappedText(
    doc,
    "Post where consumers interact with your organization in person — bank branch, clinic waiting room, etc.:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(245, 255, 245);
  doc.setDrawColor(30, 130, 60);
  doc.setLineWidth(1);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 58, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 100, 40);
  doc.text("NOTICE: HOW WE USE AI TO SERVE YOU", MARGIN + CONTENT_WIDTH / 2, y + 8, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 100, 40);
  doc.text(data.company.name, MARGIN + CONTENT_WIDTH / 2, y + 14, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(0);
  const posting2Lines = [
    "We use AI technology to [describe: e.g., process applications, personalize service, support decisions].",
    "",
    "Your rights: You may request human review of any AI-assisted decision affecting you.",
    "You may ask questions about how AI is used in our services.",
    "You may request an alternative process if you prefer.",
    "",
    "To exercise your rights or ask questions, speak with a staff member or contact us at:",
    "[Contact Name / Phone / Email / Website]",
  ];
  posting2Lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 20 + i * 4.5, { maxWidth: CONTENT_WIDTH - 8 });
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(0);
  y += 62;

  y = addFormTextField(doc, "pp_p2_ai_role", "Fill in: How AI is used in your customer services:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "pp_p2_contact", "Fill in: Consumer contact information:", y);
  y += LINE_HEIGHT;

  // ── Posting Implementation Instructions ────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Posting Implementation Instructions", y);
  const instructions = [
    "(a) Print on letter-size or legal-size paper. Laminating improves durability.",
    "(b) Post at eye level in a location where employees or consumers will see it — not behind a counter or in a back office.",
    "(c) Date the posting and record the date in this document (field below). Regulators may ask when notice was first provided.",
    "(d) Review and update postings whenever AI tools or policies change, or at least annually.",
    "(e) For employment AI laws (IL, NYC, CO): posting supplements — it does not replace — individual written notice to employees.",
    "(f) Keep a log of posting locations, dates posted, and dates removed/updated.",
  ];
  instructions.forEach((inst) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, inst, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Posting Location Log ───────────────────────────────────
  y = addSectionHeader(doc, "Posting Location Log", y);
  y = addWrappedText(
    doc,
    "Record each location where postings are displayed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const logCols = [
    { label: "Location Description", width: 70 },
    { label: "Posting Version", width: 40 },
    { label: "Date Posted", width: 30 },
    { label: "Date Updated/Removed", width: 30 },
  ];
  const rowH = 10;
  let colX = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  logCols.forEach((col) => {
    doc.rect(colX, y, col.width, rowH * 0.8);
    doc.text(col.label, colX + 1, y + 4.5, { maxWidth: col.width - 2 });
    colX += col.width;
  });
  doc.setFont("helvetica", "normal");
  y += rowH * 0.8;

  for (let row = 0; row < 8; row++) {
    if (y > 265) { doc.addPage(); y = MARGIN; }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = MARGIN;
    logCols.forEach((col) => {
      doc.rect(colX, y, col.width, rowH);
      colX += col.width;
    });
    doc.setDrawColor(0);
    y += rowH;
  }
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "pp_reviewed_by", "Posting Program Reviewed By (Name, Date):", y);

  addDisclaimer(doc);
  return doc;
}
