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
  addFormCheckbox,
  addDisclaimer,
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Training Attendance & Sign-Off Sheet
// Training attendance and acknowledgment sign-off sheet
// ============================================================
export function generateTrainingSignOff(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Training Attendance & Sign-Off Sheet", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This form documents attendance at " +
      data.company.name +
      "'s AI training session. Each attendee must sign to confirm they attended the training and understand their obligations under the AI Acceptable Use Policy. " +
      "Retain signed copies in personnel files.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Session Information ────────────────────────────────────
  y = addSectionHeader(doc, "1. Training Session Information", y);
  y = addFormTextField(doc, "so_session_date", "Training Date:", y);
  y = addFormTextField(doc, "so_session_time", "Training Start Time / End Time:", y);
  y = addFormTextField(doc, "so_session_location", "Location (Room / Virtual Platform):", y);
  y = addFormTextField(doc, "so_session_facilitator", "Facilitator Name & Title:", y);
  y = addFormTextField(doc, "so_training_type", 'Training Type (e.g., "Initial Onboarding", "Annual Recertification", "Role-Specific"):', y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Topics Covered ─────────────────────────────────────────
  y = addSectionHeader(doc, "2. Topics Covered in This Session", y);
  y = addWrappedText(
    doc,
    "Check all topics covered during this training session:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const topics = [
    { name: "so_topic_policy", label: "AI Acceptable Use Policy — overview, scope, and who it covers" },
    { name: "so_topic_tools", label: "Approved AI tools — what's approved, permitted uses, and how to request new tools" },
    { name: "so_topic_prohibited", label: "Prohibited uses — sensitive data, bypassing oversight, deceptive content" },
    { name: "so_topic_data", label: "Data handling — what data categories are permitted vs. prohibited in AI tools" },
    { name: "so_topic_review", label: "Output review requirements — review tiers and documentation" },
    { name: "so_topic_reporting", label: "Incident reporting — how to report AI incidents and policy violations" },
    { name: "so_topic_employment", label: "AI in employment decisions — human oversight requirements" },
    { name: "so_topic_consequences", label: "Enforcement — policy violation consequences" },
    { name: "so_topic_qa", label: "Q&A session" },
  ];
  topics.forEach((t) => {
    y = addFormCheckbox(doc, t.name, t.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Materials Distributed ──────────────────────────────────
  y = addSectionHeader(doc, "3. Materials Distributed to Attendees", y);

  const materials = [
    { name: "so_mat_policy", label: "AI Acceptable Use Policy" },
    { name: "so_mat_faq", label: "Employee FAQ: AI in Our Workplace" },
    { name: "so_mat_incident", label: "AI Incident Reporting Form" },
    { name: "so_mat_training", label: "Training Acknowledgment Form (individual sign-off)" },
  ];
  materials.forEach((m) => {
    y = addFormCheckbox(doc, m.name, m.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Attendance Record ──────────────────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "4. Attendance Record", y);
  y = addWrappedText(
    doc,
    "Each attendee must sign and print their name below. By signing, each attendee confirms they: " +
      "(a) attended the training session described above; " +
      "(b) received the materials listed in Section 3; and " +
      "(c) understand their obligations under the AI Acceptable Use Policy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Draw attendance table header
  const colWidths = [60, 60, 30, 20];
  const colLabels = ["Name (Print)", "Signature", "Department", "Date"];
  const tableLeft = MARGIN;
  const rowHeight = 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  let colX = tableLeft;
  colLabels.forEach((label, i) => {
    doc.text(label, colX + 2, y + 6);
    colX += colWidths[i];
  });
  doc.setFont("helvetica", "normal");
  y += rowHeight;

  // Draw 15 attendance rows
  for (let row = 0; row < 15; row++) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
      // Re-draw header
      doc.setFont("helvetica", "bold");
      colX = tableLeft;
      colLabels.forEach((label, i) => {
        doc.text(label, colX + 2, y + 6);
        colX += colWidths[i];
      });
      doc.setFont("helvetica", "normal");
      y += rowHeight;
    }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    colX = tableLeft;
    colWidths.forEach((w) => {
      doc.rect(colX, y, w, rowHeight);
      colX += w;
    });
    doc.setDrawColor(0);
    y += rowHeight;
  }
  y += LINE_HEIGHT;

  // ── Session Facilitator Sign-Off ───────────────────────────
  if (y > 240) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "5. Facilitator Sign-Off", y);
  y = addWrappedText(
    doc,
    "The facilitator certifies that the topics checked in Section 2 were covered during this training session " +
      "and that attendance was documented as shown above.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "so_fac_name", "Facilitator Name (Print):", y);
  y = addFormTextField(doc, "so_fac_sig", "Facilitator Signature:", y);
  y = addFormTextField(doc, "so_fac_date", "Date:", y);
  y += LINE_HEIGHT;

  // ── HR Filing Instructions ─────────────────────────────────
  y = addSectionHeader(doc, "6. Filing Instructions", y);
  y = addWrappedText(
    doc,
    "Instructions for HR: " +
      "(1) File the original signed attendance sheet in the company training records. " +
      "(2) File individual Training Acknowledgment Forms in each employee's personnel file. " +
      "(3) Log session completion in the company training tracking system. " +
      "(4) Retain for a minimum of 3 years or the duration of employment, whichever is longer, " +
      "or as otherwise required by applicable law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "train_signoff", y);

  addDisclaimer(doc);
  return doc;
}
