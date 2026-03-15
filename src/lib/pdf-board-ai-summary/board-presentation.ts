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
// DOCUMENT 2: Board Presentation Template
// Board briefing template for AI compliance
// ============================================================
export function generateBoardPresentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Board of Directors AI Compliance Briefing", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This template provides a structured agenda and talking points for presenting AI compliance status to the board. " +
      "Fill in the bracketed sections before presenting. Adapt the level of detail to your board's familiarity with AI.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Presentation Details ───────────────────────────────────
  y = addSectionHeader(doc, "Presentation Details", y);
  y = addFormTextField(doc, "bp_meeting_date", "Board Meeting Date:", y);
  y = addFormTextField(doc, "bp_presenter", "Presenter(s) Name & Title:", y);
  y = addFormTextField(doc, "bp_time_allotted", "Time Allotted (minutes):", y);
  y += LINE_HEIGHT;

  // ── Slide 1: Title ─────────────────────────────────────────
  y = addSectionHeader(doc, "Slide 1: Title Slide", y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  y = addWrappedText(doc, data.company.name + " — AI Compliance Update", MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = addFormTextField(doc, "bp_title_period", "Reporting Period:", y);
  y += LINE_HEIGHT;

  // ── Slide 2: Why We're Here ────────────────────────────────
  y = addSectionHeader(doc, "Slide 2: Why AI Compliance Matters to the Board", y);
  y = addWrappedText(
    doc,
    "Key talking point: AI compliance is now a governance obligation, not just an IT matter. " +
      "Boards are expected to understand and oversee AI risk — from regulators, investors, and enterprise customers. " +
      "Use the following points:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const whyPoints = [
    "\u2022  State AI laws are creating legal exposure for organizations that deploy AI without documented compliance programs (IL, CO, CA, NYC, MN).",
    "\u2022  The EU AI Act imposes up to \u20AC35M or 7% of global turnover for prohibited AI practices, and up to \u20AC15M or 3% for high-risk violations \u2014 reaching US companies serving EU customers.",
    "\u2022  FINRA and SEC have flagged AI as 2026 examination priorities — financial services firms face increasing scrutiny.",
    "\u2022  Enterprise contracts increasingly require documented AI compliance programs before procurement.",
    "\u2022  Board members can face personal liability exposure if AI governance is materially deficient.",
  ];
  whyPoints.forEach((point) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, point, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Slide 3: Our AI Landscape ──────────────────────────────
  if (y > 210) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Slide 3: Our AI Landscape", y);
  y = addWrappedText(
    doc,
    "Present a brief overview of how " + data.company.name + " uses AI:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "bp_systems_summary", "AI systems in operation (brief list):", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "bp_use_cases", "Primary use cases (customer-facing, internal, decision support):", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "bp_risk_level", "Overall risk profile (low / medium / high) and rationale:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Slide 4: Regulatory Obligations ───────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Slide 4: Our Regulatory Obligations", y);
  y = addWrappedText(
    doc,
    "Laws that apply to " + data.company.name + " and current status:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "bp_reg_obligations", "Applicable laws and compliance status (complete, in progress, or gap):", y, { multiline: true, lines: 5 });
  y += LINE_HEIGHT;

  // ── Slide 5: What We've Done ───────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Slide 5: What We've Done", y);
  y = addFormTextField(doc, "bp_completed_actions", "Compliance actions completed this period:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // ── Slide 6: Key Risks ─────────────────────────────────────
  y = addSectionHeader(doc, "Slide 6: Key AI Compliance Risks", y);
  y = addWrappedText(
    doc,
    "Present the top 3–5 risks requiring board awareness. See the AI Risk Register for full detail.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "bp_key_risks", "Top risks (summarize from Risk Register):", y, { multiline: true, lines: 5 });
  y += LINE_HEIGHT;

  // ── Slide 7: What We Need ──────────────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Slide 7: Board Action Requested", y);
  y = addWrappedText(
    doc,
    "Be specific about what you are asking the board to approve, note, or direct:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "bp_board_action", "Board action requested (approve budget, note status, authorize policy, etc.):", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // ── Q&A Notes ──────────────────────────────────────────────
  y = addSectionHeader(doc, "Q&A Notes", y);
  y = addFormTextField(doc, "bp_qa_notes", "Questions asked and answers given:", y, { multiline: true, lines: 5 });
  y += LINE_HEIGHT;

  // ── Board Resolution (if needed) ──────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Board Resolution / Action Items (if adopted)", y);
  y = addFormTextField(doc, "bp_resolution", "Resolution or action items from board meeting:", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "bp_resolution_date", "Date of Board Action:", y);
  y = addFormTextField(doc, "bp_board_secretary", "Board Secretary / Recorder:", y);

  addDisclaimer(doc);
  return doc;
}
