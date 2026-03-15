import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// IL Notice & Response Kit — Doc 2: AI Use Logging Form
// Log each instance of AI use in an employment decision
// ============================================================
export function generateAiUseLoggingForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Employment Decision Use Log", data);
  y = addTopDisclaimer(doc, y);

  // IDHR rulemaking disclosure
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    "Note: IDHR is currently developing implementing rules for the AI notice requirements under 775 ILCS 5/2-102(L). The format, timing, and delivery requirements for employee notice are not yet finalized. This template reflects the statutory text as enacted. Update this document when IDHR publishes its rules.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    `Complete this form each time an AI system is used to make, facilitate, screen, or inform an employment decision at ${data.company.name}. Retain completed logs for a minimum of 4 years (recommended). The Illinois Department of Human Rights (IDHR) has authority to adopt implementing rules under 775 ILCS 5/2-102(L) — verify current IDHR rules at dhr.illinois.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Log Period ----
  y = addSectionHeader(doc, "Section 1: Log Period & Responsible Party", y);

  y = addFormTextField(doc, "alf_log_period_start", "Log Period Start Date:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "alf_log_period_end", "Log Period End Date:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "alf_responsible_party", "Log Maintained By (Name / Title):", y);
  y = addFormTextField(doc, "alf_dept", "Department / Business Unit:", y);

  // ---- SECTION 2: Entry Rows ----
  y = addSectionHeader(
    doc,
    "Section 2: AI Use Log Entries (Complete One Row Per Decision Event)",
    y
  );

  y = addWrappedText(
    doc,
    "Complete a separate row for each employment decision where AI was used. If multiple employees or applicants are affected by a single batch decision, use one row and describe the group in the 'Employees / Applicants Affected' field.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const rowCount = 5;
  for (let i = 1; i <= rowCount; i++) {
    const prefix = `alf_row${i}`;

    // Row label
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(`Entry ${i}`, MARGIN, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");

    y = addFormTextField(doc, `${prefix}_date`, "Date of Decision Event:", y, {
      width: 70,
    });
    y = addFormTextField(
      doc,
      `${prefix}_ai_system`,
      "AI System Name (as listed in employee notice):",
      y
    );
    y = addFormTextField(
      doc,
      `${prefix}_decision_type`,
      "Decision Type (e.g., Hiring / Promotion / Discharge / Discipline / Terms):",
      y
    );
    y = addFormTextField(
      doc,
      `${prefix}_affected`,
      "Employees / Applicants Affected (names, IDs, or group description):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `${prefix}_outcome`,
      "Outcome / Decision Made:",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `${prefix}_reviewer`,
      "Human Reviewer Name & Title:",
      y
    );
    y = addFormTextField(
      doc,
      `${prefix}_override`,
      "Was AI recommendation overridden? (Yes / No — if Yes, explain):",
      y,
      { multiline: true, lines: 2 }
    );

    // Separator line between rows
    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  }

  // ---- SECTION 3: Regulatory Note ----
  y = addSectionHeader(doc, "Section 3: IDHR Authority Note", y);

  y = addWrappedText(
    doc,
    "Under 775 ILCS 5/2-102(L), the Illinois Department of Human Rights (IDHR) has authority to adopt implementing rules specifying record retention periods, log formats, and audit procedures. As of March 2026, IDHR implementing rules have not been published. Monitor dhr.illinois.gov for updates. This log format reflects recommended best practice pending final rules.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 4: Period Totals ----
  y = addSectionHeader(doc, "Section 4: Period Summary Totals", y);

  y = addFormTextField(
    doc,
    "alf_total_decisions",
    "Total number of AI-assisted decisions this period:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "alf_total_overrides",
    "Total number of AI recommendations overridden:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "alf_total_complaints",
    "Total number of employee inquiries / complaints received about AI use:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "alf_notes",
    "Additional notes / anomalies this period:",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "alf_log", y);
  addDisclaimer(doc);
  return doc;
}
