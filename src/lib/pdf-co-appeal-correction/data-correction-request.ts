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
// CO Appeal & Correction Kit — Doc 2: Data Correction Request
// Per C.R.S. § 6-1-1703 consumer right to correct personal data
// ============================================================
export function generateDataCorrectionRequest(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Consumer Personal Data Correction Request",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This form processes consumer requests to correct inaccurate personal data used in AI-assisted decisions made by ${data.company.name}. C.R.S. § 6-1-1703 provides Colorado consumers with the right to correct inaccurate personal data. The Colorado Attorney General has exclusive enforcement authority (§ 6-1-1706). Retain completed forms for a minimum of 5 years.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Consumer Information ----
  y = addSectionHeader(doc, "Section 1: Consumer Information", y);

  y = addFormTextField(doc, "dcr_consumer_name", "Consumer Full Name:", y);
  y = addFormTextField(doc, "dcr_consumer_address", "Mailing Address:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "dcr_consumer_email", "Email Address:", y);
  y = addFormTextField(doc, "dcr_consumer_phone", "Phone Number:", y);
  y = addFormTextField(
    doc,
    "dcr_consumer_id",
    "Account / Customer ID (if applicable):",
    y
  );
  y = addFormTextField(
    doc,
    "dcr_identity_verification",
    "Identity verification provided (describe document or method):",
    y
  );

  // ---- SECTION 2: Data Believed to Be Incorrect ----
  y = addSectionHeader(
    doc,
    "Section 2: Data Believed to Be Incorrect",
    y
  );

  y = addWrappedText(
    doc,
    "For each piece of data the consumer believes is incorrect, complete a separate entry below. Add additional pages if needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataEntries = 3;
  for (let i = 1; i <= dataEntries; i++) {
    const prefix = `dcr_data${i}`;

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.text(`Data Item ${i}`, MARGIN, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");

    y = addFormTextField(
      doc,
      `${prefix}_category`,
      "Data category (e.g., name, address, income, employment history, credit history):",
      y
    );
    y = addFormTextField(
      doc,
      `${prefix}_incorrect`,
      "Data currently on file (as the consumer understands it to be):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `${prefix}_correct`,
      "Correct information (what the data should say):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `${prefix}_ai_impact`,
      "How this data affected the AI-assisted decision (as understood by consumer):",
      y,
      { multiline: true, lines: 2 }
    );

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  }

  // ---- SECTION 3: Supporting Documentation ----
  y = addSectionHeader(doc, "Section 3: Supporting Documentation", y);

  y = addWrappedText(
    doc,
    "List all documents submitted to support the correction request. Examples include: official records, statements, correspondence, or other evidence that the data on file is incorrect.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "dcr_docs_list",
    "Documents attached (list each by name/type):",
    y,
    { multiline: true, lines: 4 }
  );

  // ---- SECTION 4: Processing Workflow ----
  y = addSectionHeader(
    doc,
    "Section 4: Processing Workflow (Staff Use)",
    y
  );

  y = addWrappedText(
    doc,
    "Complete this section as the request is processed. Each step requires a responsible staff member and completion date.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const workflowSteps = [
    { label: "Request received and logged", key: "receive" },
    { label: "Consumer identity verified", key: "identity" },
    { label: "Data subject record located in system", key: "locate" },
    { label: "Data accuracy reviewed against supporting documentation", key: "review" },
    { label: "Decision made: Correction approved / partially approved / denied", key: "decision" },
    { label: "Data corrected in system (if approved)", key: "correct" },
    { label: "AI model re-evaluated with corrected data (if applicable)", key: "reeval" },
    { label: "Consumer notified of outcome", key: "notify" },
    { label: "Original decision re-reviewed with corrected data (if applicable)", key: "rereview" },
    { label: "Request closed and archived", key: "close" },
  ];

  workflowSteps.forEach((step, idx) => {
    const prefix = `dcr_wf_${idx}`;
    y = addFormCheckbox(doc, `${prefix}_complete`, step.label, y);
    y = addFormTextField(doc, `${prefix}_staff`, "Staff Name / Title:", y, {
      width: 100,
    });
    y = addFormTextField(doc, `${prefix}_date`, "Date Completed:", y, {
      width: 70,
    });
    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 1;
  });

  // ---- SECTION 5: Timeline ----
  y = addSectionHeader(doc, "Section 5: Timeline & Response", y);

  y = addFormTextField(doc, "dcr_received_date", "Date Request Received:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "dcr_response_due", "Response Due Date:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "dcr_response_sent_date",
    "Date Response Sent to Consumer:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "dcr_outcome",
    "Final Outcome (correction approved / partially approved / denied):",
    y
  );
  y = addFormTextField(
    doc,
    "dcr_outcome_explanation",
    "Explanation of outcome (required for denials and partial approvals):",
    y,
    { multiline: true, lines: 4 }
  );

  // ---- SECTION 6: Statutory Note ----
  y = addSectionHeader(doc, "Statutory Reference", y);

  y = addWrappedText(
    doc,
    "C.R.S. § 6-1-1703 grants Colorado consumers the right to appeal consequential decisions made wholly or partly by AI systems, the right to correct inaccurate personal data, and the right to request human review (if technically feasible). The Colorado Attorney General has exclusive enforcement authority under § 6-1-1706. Colorado SB 25B-004 extended the effective date to June 30, 2026.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "dcr_correction", y);
  addDisclaimer(doc);
  return doc;
}
