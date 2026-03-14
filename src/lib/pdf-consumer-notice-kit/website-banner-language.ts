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
// DOCUMENT 1: Website AI Disclosure Banner
// Website popup/banner text for AI disclosure
// ============================================================
export function generateWebsiteBannerLanguage(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Website AI Disclosure Banner — Language Templates", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document provides pre-written language for website AI disclosure banners and notices. " +
      "Choose the version that matches how your organization uses AI and the laws that apply to you. " +
      "Have your legal team review before deploying on your website.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Short Banner (Notification Bar) ─────────────
  y = addSectionHeader(doc, "Version 1: Short Banner (Notification Bar)", y);
  y = addWrappedText(
    doc,
    "Use this version for a slim notification bar at the top or bottom of your website. Best for general AI disclosure:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(50, 100, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 18, 2, 2, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 60, 130);
  const shortBanner =
    "[Company Name] uses artificial intelligence technology to [brief description of purpose — e.g., \"assist customer service,\" \"personalize your experience,\" \"support hiring decisions\"]. " +
    "[Learn more] [Opt out]";
  const shortLines: string[] = doc.splitTextToSize(shortBanner, CONTENT_WIDTH - 8);
  shortLines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 6 + i * 4);
  });
  doc.setTextColor(0);
  y += 22;
  y = addFormTextField(doc, "wb_short_purpose", "Fill in: Brief purpose of AI use (for short banner):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 2: Full Disclosure Banner (Pop-up) ─────────────
  y = addSectionHeader(doc, "Version 2: Full Disclosure Banner (Pop-up / Modal)", y);
  y = addWrappedText(
    doc,
    "Use this version when a more detailed disclosure is needed — for consequential AI decisions, California CCPA ADMT, Colorado SB24-205, or similar laws:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(50, 100, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 52, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30, 60, 130);
  doc.text("Notice: Automated Decision-Making Technology", MARGIN + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const fullBanner =
    "[Company Name] uses automated decision-making technology (AI) in the following context(s): [list AI use cases]. " +
    "This technology may significantly affect decisions about you, including [describe: e.g., your application, your account, your eligibility for services]. " +
    "You have the right to: (1) opt out of certain automated decisions; (2) request human review of AI-assisted decisions that affect you; (3) request more information about how the technology works. " +
    "To exercise these rights or learn more, visit [link] or contact [contact information].";
  const fullLines: string[] = doc.splitTextToSize(fullBanner, CONTENT_WIDTH - 8);
  fullLines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 12 + i * 3.8);
  });
  doc.setTextColor(0);
  y += 56;
  y = addFormTextField(doc, "wb_full_cases", "Fill in: AI use cases for full banner:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "wb_full_decisions", "Fill in: How decisions may be affected:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "wb_full_contact", "Fill in: Contact info / link for rights:", y);
  y += LINE_HEIGHT;

  // ── Section 3: Employment AI Notice ────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Version 3: Employment AI Disclosure (Job Application Pages)", y);
  y = addWrappedText(
    doc,
    "Required for IL HB3773, NYC LL144, CO SB24-205, and similar employment laws. Place on job application pages or hiring portals:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFillColor(245, 255, 245);
  doc.setDrawColor(30, 130, 60);
  doc.setLineWidth(0.5);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 42, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 100, 40);
  doc.text("AI in Our Hiring Process", MARGIN + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const empBanner =
    "[Company Name] uses AI tools in its hiring process to [describe role — e.g., review applications, schedule interviews, assess qualifications]. " +
    "These tools support — but do not replace — human judgment. Our hiring team reviews all AI-assisted evaluations before making any final decision. " +
    "If you have questions about our AI use or would like to request an accommodation that does not involve AI, please contact [HR contact].";
  const empLines: string[] = doc.splitTextToSize(empBanner, CONTENT_WIDTH - 8);
  empLines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 12 + i * 3.8);
  });
  doc.setTextColor(0);
  y += 46;
  y = addFormTextField(doc, "wb_emp_ai_role", "Fill in: Role of AI in your hiring process:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "wb_emp_contact", "Fill in: HR contact name/email:", y);
  y += LINE_HEIGHT;

  // ── Implementation Notes ───────────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Implementation Notes", y);
  const notes = [
    "(a) All banner language should link to your full Privacy Policy or AI Use Policy for complete disclosures.",
    "(b) Consent or acknowledgment buttons should record the date and version of the notice the user saw.",
    "(c) For California CCPA ADMT: pre-use notice must be given before or at the time of data collection.",
    "(d) For Colorado SB24-205: consumer notification before AI makes a consequential decision, with opt-out option.",
    "(e) For employment (IL, NYC, CO): notice must be given before AI is used in hiring/employment decisions.",
    "(f) Review banner language with legal counsel before publishing to ensure it meets current requirements.",
  ];
  notes.forEach((note) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, note, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "wb_implementation_date", "Date Banner Implemented on Website:", y);
  y = addFormTextField(doc, "wb_reviewer", "Reviewed By (Name, Date):", y);

  addDisclaimer(doc);
  return doc;
}
