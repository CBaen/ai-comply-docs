import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// NYC AEDT Alternative Selection Process Workflow
// NYC Admin. Code § 20-871(b)(1) + DCWP rules
// ============================================================
export function generateAlternativeProcessWorkflow(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "AEDT Alternative Selection Process Workflow",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This workflow documents ${data.company.name}'s process for handling candidate or employee requests for an alternative selection process when they prefer not to be evaluated using the Automated Employment Decision Tool (AEDT), as required under NYC Admin. Code §20-871(b)(1). Complete one form per alternative process request. Retain for a minimum of 3 years per DCWP rules.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Intake
  y = addSectionHeader(doc, "1. Alternative Process Request Intake", y);
  y = addFormTextField(
    doc,
    "apw_request_id",
    "Request ID / Tracking Number:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "apw_received_date",
    "Date Request Received:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "apw_candidate_name",
    "Candidate / Employee Full Name:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "apw_candidate_email",
    "Candidate / Employee Email:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "apw_candidate_phone",
    "Candidate / Employee Phone:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "apw_position",
    "Position Applied For or Being Evaluated:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "apw_aedt_name",
    "AEDT for Which Alternative Was Requested:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
      width: 150,
    }
  );
  y = addFormTextField(
    doc,
    "apw_reason",
    "Reason for Request (if provided by candidate — optional):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "apw_intake_staff",
    "Request Received By (name/role):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 2: Alternative Process Description
  y = addSectionHeader(doc, "2. Alternative Selection Process", y);
  y = addWrappedText(
    doc,
    "Describe the alternative process that will be used instead of or alongside the AEDT for this candidate:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const altProcessTypes = [
    "In-person or video interview with hiring manager",
    "Structured skills assessment administered by a human reviewer",
    "Resume and application review by human recruiter only",
    "Work sample or portfolio review by human panel",
    "Phone screening with human recruiter",
    "Skills test or job knowledge assessment (non-automated)",
  ];
  altProcessTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `apw_alt_type_${idx}`, type, y);
  });
  y = addFormTextField(
    doc,
    "apw_alt_description",
    "Full Description of Alternative Process (detail each step):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "apw_evaluator",
    "Person(s) Conducting Alternative Evaluation (name/role):",
    y,
    { width: 150 }
  );
  y += LINE_HEIGHT;

  // Section 3: Timeline
  y = addSectionHeader(doc, "3. Alternative Process Timeline", y);
  y = addFormTextField(
    doc,
    "apw_start_date",
    "Date Alternative Process Begins:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "apw_end_date",
    "Date Alternative Process Completed:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "apw_candidate_notified_date",
    "Date Candidate Was Notified of Alternative Process and Schedule:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "apw_timeline_notes",
    "Timeline Notes (delays, scheduling issues, accommodations):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Outcome Documentation
  y = addSectionHeader(doc, "4. Outcome Documentation", y);
  y = addFormTextField(
    doc,
    "apw_outcome",
    "Outcome of Alternative Selection Process (advance to next round, offer extended, not selected, etc.):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "apw_outcome_date",
    "Date Outcome Decision Was Made:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "apw_outcome_notified",
    "Date Candidate Was Notified of Outcome:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Section 5: Comparison with AEDT-Assisted Process (for internal records)
  y = addSectionHeader(
    doc,
    "5. Comparison with AEDT-Assisted Process (Internal Records Only)",
    y
  );
  y = addWrappedText(
    doc,
    "This section is for internal compliance monitoring only and must NOT be shared with candidates. Document how the alternative process compared to what AEDT-assisted candidates experienced, to monitor for disparate treatment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "apw_aedt_outcome_typical",
    "Typical Outcome for AEDT-Assisted Candidates at Same Stage:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "apw_comparison_notes",
    "Comparison Notes (was the candidate treated equivalently to AEDT-assisted candidates?):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addWrappedText(
    doc,
    "Disparate treatment check:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const disparateChecks = [
    "No disparate treatment identified — alternative process was substantively equivalent",
    "Potential disparity identified — escalated to HR leadership for review",
    "Process was not equivalent — documented and corrective action taken",
  ];
  disparateChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, `apw_disp_${idx}`, check, y);
  });
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "apw", y);

  addDisclaimer(doc);
  return doc;
}
