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
  BODY_SIZE,
  SMALL_SIZE,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Oversight Decision Log
// EU AI Act Art. 26 — Documentation of oversight actions
// ============================================================
export function generateOversightDecisionLog(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Human Oversight Decision Log (Art. 26)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This log documents human oversight actions taken in connection with the deployment of high-risk AI systems by ${data.company.name}, in accordance with Article 26 of Regulation (EU) 2024/1689 (EU AI Act) and the Human Oversight Implementation Plan. Article 26(1) requires deployers to use high-risk AI systems in accordance with instructions for use; Article 26(2) requires designated oversight persons to monitor AI outputs and take appropriate action. Records maintained in this log support accountability, audit readiness, and regulatory compliance.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "NOTE: Retain completed logs for the period specified in your Log Retention Policy. Minimum six months per Art. 26(6). Make available to competent authority upon request.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Log header fields
  y = addSectionHeader(doc, "Log Header", y);
  y = addFormTextField(doc, "ovlog_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "ovlog_sys_version", "Version / build:", y, { width: 80 });
  y = addFormTextField(doc, "ovlog_period_start", "Log period start date:", y, { width: 80 });
  y = addFormTextField(doc, "ovlog_period_end", "Log period end date:", y, { width: 80 });
  y = addFormTextField(doc, "ovlog_log_keeper", "Log maintained by (name, title):", y, { width: 140 });
  y += LINE_HEIGHT;

  // Decision type legend
  y = addSectionHeader(doc, "Oversight Decision Types — Reference", y);
  y = addWrappedText(
    doc,
    "Use the following codes in the 'Decision' column of each log entry:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const decisionTypes = [
    "ACCEPTED — AI output reviewed and accepted; human decision aligns with AI recommendation",
    "MODIFIED — AI output reviewed; human decision modified the AI recommendation before acting",
    "OVERRIDDEN — AI output reviewed; human decision contrary to AI recommendation; AI output not used",
    "STOPPED — AI system use stopped or suspended; AI output not used; system halted for this context",
  ];
  decisionTypes.forEach((dtype, idx) => {
    y = addFormCheckbox(doc, `ovlog_legend_${idx}`, dtype, y);
  });
  y += LINE_HEIGHT;

  // Log entries — 10 blank rows
  y = addSectionHeader(doc, "Oversight Decision Log Entries", y);
  y = addWrappedText(
    doc,
    "Complete one entry per oversight action taken. All fields are required. For decisions affecting individual persons, do not record personally identifiable information in shared fields — use case reference numbers instead.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  for (let i = 1; i <= 10; i++) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    // Entry header
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(`Entry ${i}`, MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    // Date, AI system, output reviewed — in a compact row
    const halfWidth = (CONTENT_WIDTH - 8) / 2;
    y = addFormTextField(
      doc,
      `ovlog_e${i}_date`,
      "Date:",
      y,
      { width: 60 }
    );
    y = addFormTextField(
      doc,
      `ovlog_e${i}_reviewer`,
      "Oversight person name:",
      y,
      { width: halfWidth }
    );
    y = addFormTextField(
      doc,
      `ovlog_e${i}_case_ref`,
      "Case / transaction reference (no personal data):",
      y,
      { width: halfWidth }
    );
    y = addFormTextField(
      doc,
      `ovlog_e${i}_output`,
      "AI output reviewed (describe without personal data):",
      y,
      { multiline: true, lines: 2 }
    );

    // Decision checkboxes
    doc.setFontSize(SMALL_SIZE);
    doc.setFont("helvetica", "normal");
    doc.text("Decision:", MARGIN, y);
    y += LINE_HEIGHT;

    const decisions = ["ACCEPTED", "MODIFIED", "OVERRIDDEN", "STOPPED"];
    let cbX = MARGIN;
    decisions.forEach((d, idx) => {
      y = addFormCheckbox(doc, `ovlog_e${i}_dec_${idx}`, d, y, { x: cbX });
      cbX = cbX; // keep left-aligned; each on its own line for clarity
    });

    y = addFormTextField(
      doc,
      `ovlog_e${i}_rationale`,
      "Rationale for decision (required for MODIFIED, OVERRIDDEN, STOPPED):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `ovlog_e${i}_outcome`,
      "Outcome / follow-up action taken:",
      y,
      { multiline: true, lines: 2 }
    );

    // Thin separator line between entries
    if (i < 10) {
      doc.setDrawColor(220);
      doc.setLineWidth(0.3);
      doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
      y += LINE_HEIGHT;
    }
  }

  y += LINE_HEIGHT;

  // Aggregate summary section
  y = addSectionHeader(doc, "Period Summary", y);
  y = addWrappedText(
    doc,
    "Complete at end of each reporting period. Used to identify patterns and report to oversight management.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "ovlog_sum_total", "Total oversight actions this period:", y, { width: 60 });
  y = addFormTextField(doc, "ovlog_sum_accepted", "Count — ACCEPTED:", y, { width: 60 });
  y = addFormTextField(doc, "ovlog_sum_modified", "Count — MODIFIED:", y, { width: 60 });
  y = addFormTextField(doc, "ovlog_sum_overridden", "Count — OVERRIDDEN:", y, { width: 60 });
  y = addFormTextField(doc, "ovlog_sum_stopped", "Count — STOPPED:", y, { width: 60 });
  y = addFormTextField(
    doc,
    "ovlog_sum_patterns",
    "Patterns or concerns identified this period:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "ovlog_sum_actions",
    "Actions taken or recommended based on log review:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "ovlog_sum_reviewer", "Period summary reviewed by (name, title):", y, {
    width: 140,
  });
  y = addFormTextField(doc, "ovlog_sum_review_date", "Summary review date:", y, { width: 80 });
  y += LINE_HEIGHT;

  addDisclaimer(doc);
  return doc;
}
