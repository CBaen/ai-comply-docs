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
// CA Cybersecurity Audit Remediation Tracker
// 10 blank finding rows for tracking audit findings and fixes
// ============================================================
export function generateAuditRemediationTracker(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Cybersecurity Audit Remediation Tracker",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This tracker documents ${data.company.name}'s remediation progress for cybersecurity audit findings. Complete one row per finding identified during the audit. Update the tracker as remediation progresses. Retain completed trackers for audit evidence. This document should be treated as confidential and attorney-client privileged where applicable.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Tracker Metadata
  y = addSectionHeader(doc, "Tracker Metadata", y);
  y = addFormTextField(
    doc,
    "art_audit_ref",
    "Related Audit Reference / ID:",
    y,
    { width: 110 }
  );
  y = addFormTextField(
    doc,
    "art_tracker_owner",
    "Tracker Owner (name/role):",
    y,
    { width: 130 }
  );
  y = addFormTextField(
    doc,
    "art_created_date",
    "Tracker Created Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "art_last_updated",
    "Last Updated Date:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Helper: render one finding row
  const renderFindingRow = (
    num: number,
    fieldPrefix: string,
    currentY: number
  ): number => {
    let ly = addSectionHeader(doc, `Finding ${num}`, currentY);

    ly = addFormTextField(
      doc,
      `${fieldPrefix}_description`,
      "Finding Description (what was found, what control failed, what regulation area):",
      ly,
      { multiline: true, lines: 3 }
    );
    ly = addWrappedText(
      doc,
      "Severity:",
      MARGIN,
      ly,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    ly += 2;
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_sev_critical`,
      "Critical (immediate risk to consumer data — escalate now)",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_sev_high`,
      "High (significant gap — remediate within 30 days)",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_sev_medium`,
      "Medium (moderate gap — remediate within 90 days)",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_sev_low`,
      "Low (minor gap — remediate within 6 months)",
      ly
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_assigned_to`,
      "Assigned To (name/role):",
      ly,
      { width: 130 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_target_date`,
      "Target Completion Date:",
      ly,
      { width: 70 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_completion_date`,
      "Actual Completion Date:",
      ly,
      { width: 70 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_evidence`,
      "Evidence of Fix (document name, test result, screenshot reference, policy version):",
      ly,
      { multiline: true, lines: 2 }
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
      `${fieldPrefix}_status_open`,
      "Open — not yet started",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_inprogress`,
      "In Progress",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_remediated`,
      "Remediated — pending verification",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_closed`,
      "Closed — verified and accepted",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_status_accepted`,
      "Risk Accepted — documented with executive sign-off",
      ly
    );
    ly += LINE_HEIGHT;
    return ly;
  };

  // 10 finding rows
  for (let i = 1; i <= 10; i++) {
    y = renderFindingRow(i, `art_f${i}`, y);
  }

  // Summary
  y = addSectionHeader(doc, "Remediation Summary", y);
  y = addFormTextField(
    doc,
    "art_total_findings",
    "Total Number of Findings:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_critical_count",
    "Critical Findings Count:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_high_count",
    "High Findings Count:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_medium_count",
    "Medium Findings Count:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_low_count",
    "Low Findings Count:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_closed_count",
    "Closed / Remediated Findings Count:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_open_count",
    "Open Findings Count (as of last updated date):",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "art_summary_notes",
    "Summary Notes / Executive Commentary:",
    y,
    { multiline: true, lines: 3 }
  );

  addDisclaimer(doc);
  return doc;
}
