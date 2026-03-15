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
// NYC Bias Audit Annual Renewal Calendar
// §20-871(a)(1) — annual audit requirement, 5 AEDT rows
// ============================================================
export function generateAnnualRenewalCalendar(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Bias Audit Annual Renewal Calendar (§20-871(a)(1))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This tracker helps ${data.company.name} manage the annual bias audit renewal obligation under NYC Admin. Code §20-871(a)(1), which requires that bias audits be conducted no more than one year before an AEDT is used. If an AEDT is continuously used, a new audit must be completed and results published within 30 days of audit completion each year. The company must stop using an AEDT if its annual audit has expired and no new audit has been completed. Verify current DCWP rules at nyc.gov/dcwp.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Calendar header explanation
  y = addSectionHeader(doc, "Calendar Instructions", y);
  y = addWrappedText(
    doc,
    "Complete one row per AEDT. The 'Audit Expiration Date' is exactly one year after the 'Current Audit Date'. The AEDT may not be used after the Audit Expiration Date until a new audit is completed. Build the 'Next Audit Scheduled Date' to provide at least 60 days before expiration to allow for data collection, audit completion, and publication.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Helper: render one AEDT row
  const renderAedtRow = (
    num: number,
    fieldPrefix: string,
    currentY: number
  ): number => {
    let ly = addSectionHeader(doc, `AEDT ${num}`, currentY);

    const sys =
      data.aiSystems && data.aiSystems[num - 1]
        ? data.aiSystems[num - 1]
        : null;

    ly = addFormTextField(
      doc,
      `${fieldPrefix}_name`,
      "AEDT Name:",
      ly,
      { prefill: sys ? sys.name : "", width: 150 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_vendor`,
      "Vendor / Developer:",
      ly,
      { prefill: sys ? sys.vendor : "", width: 150 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_purpose`,
      "Employment Decision(s) This AEDT Supports:",
      ly,
      { multiline: true, lines: 2 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_current_audit_date`,
      "Current Audit Date (date most recent audit was completed):",
      ly,
      { width: 80 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_expiration_date`,
      "Audit Expiration Date (1 year from current audit date per §20-871(a)(1)):",
      ly,
      { width: 80 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_auditor_name`,
      "Current Auditor Name / Firm:",
      ly,
      { width: 150 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_next_audit_date`,
      "Next Audit Scheduled Date (target — recommend at least 60 days before expiration):",
      ly,
      { width: 80 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_budget`,
      "Budget Allocated for Next Audit:",
      ly,
      { width: 80 }
    );
    ly = addWrappedText(
      doc,
      "Status:",
      MARGIN,
      ly,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    ly += 2;
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_current`,
      "Current — audit valid, not expired",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_upcoming`,
      "Renewal due within 90 days — action required",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_overdue`,
      "Overdue — audit expired, AEDT must be suspended until renewed",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_suspended`,
      "Suspended pending audit completion",
      ly
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_notes`,
      "Notes:",
      ly,
      { multiline: true, lines: 2 }
    );
    ly += LINE_HEIGHT;
    return ly;
  };

  // 5 AEDT rows
  for (let i = 1; i <= 5; i++) {
    y = renderAedtRow(i, `arc_aedt${i}`, y);
  }

  // Summary and Compliance Notes
  y = addSectionHeader(doc, "Annual Renewal Summary", y);
  y = addFormTextField(
    doc,
    "arc_total_aedts",
    "Total AEDTs in Use:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "arc_audits_current",
    "AEDTs With Current (Valid) Audits:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "arc_audits_expiring",
    "AEDTs With Audits Expiring Within 90 Days:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "arc_audits_expired",
    "AEDTs With Expired Audits (must suspend immediately):",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "arc_last_reviewed",
    "Calendar Last Reviewed Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "arc_reviewed_by",
    "Reviewed By (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "arc_next_review",
    "Next Calendar Review Date (recommend quarterly):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Compliance reminders
  y = addSectionHeader(doc, "Compliance Reminders", y);
  const reminders = [
    "§20-871(a)(1): Bias audit must be conducted no more than one year before each use of the AEDT",
    "§20-871(a)(2): Results must be posted on website within 30 days of new audit completion",
    "Results must remain posted while AEDT is in use and for one year after it is no longer used",
    "§20-871(b)(1): Candidate notice must be provided at least 10 business days before AEDT is used",
    "DCWP may conduct proactive investigations (began 2026) — maintain audit records",
    "If AEDT is materially changed or updated, consider whether a new audit is needed",
  ];
  reminders.forEach((reminder, idx) => {
    y = addFormCheckbox(doc, `arc_reminder_${idx}`, reminder, y);
  });

  addDisclaimer(doc);
  return doc;
}
