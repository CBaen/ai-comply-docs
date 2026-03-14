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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Internal AI Concern Reporting Form
// ============================================================
export function generateConcernReportingForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Internal AI Concern Reporting Form", data);
  y = addTopDisclaimer(doc, y);

  // ── Instructions ───────────────────────────────────────────
  y = addSectionHeader(doc, "Instructions", y);
  y = addWrappedText(
    doc,
    "Use this form to report an AI safety concern, policy violation, or other AI-related " +
      "issue at " + data.company.name + ". You may submit this form anonymously if your " +
      "reporting channel supports it. Your concern will be reviewed by the AI Compliance " +
      "Officer (or their designee) in accordance with the AI Safety Whistleblower Protection " +
      "Policy. Retaliation for good-faith reports is strictly prohibited.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 30, 30);
  y = addWrappedText(
    doc,
    "IMPORTANT: If this is an immediate safety emergency (risk of physical harm), " +
      "contact emergency services or your supervisor immediately. Do not use this form " +
      "for emergencies.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Reporter Information ───────────────────────────────────
  y = addSectionHeader(doc, "Part 1 — Reporter Information (Optional — May Be Submitted Anonymously)", y);
  y = addFormTextField(doc, "crf_reporter_name", "Your Name (optional):", y);
  y = addFormTextField(doc, "crf_reporter_title", "Your Title / Department (optional):", y);
  y = addFormTextField(doc, "crf_reporter_contact", "Your Contact Information for Follow-Up (optional):", y);
  y = addFormTextField(doc, "crf_submission_date", "Date of Submission:", y);
  y += LINE_HEIGHT;

  // ── Nature of Concern ──────────────────────────────────────
  y = addSectionHeader(doc, "Part 2 — Nature of Concern", y);
  y = addWrappedText(
    doc,
    "Check all categories that apply to your concern:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const categories = [
    { id: "crf_cat_safety", label: "AI Safety Hazard — AI behavior creating risk of harm to individuals" },
    { id: "crf_cat_discrimination", label: "Discriminatory AI Output — AI producing discriminatory results" },
    { id: "crf_cat_policy", label: "AI Policy Violation — Use of AI in violation of Organization policy" },
    { id: "crf_cat_privacy", label: "Data Privacy Violation — Unauthorized use of personal data by AI system" },
    { id: "crf_cat_regulatory", label: "Regulatory Non-Compliance — Failure to comply with applicable AI law" },
    { id: "crf_cat_failure", label: "AI System Failure — Material failure not being reported or addressed" },
    { id: "crf_cat_unauthorized", label: "Unauthorized AI System — AI system deployed without proper approval" },
    { id: "crf_cat_other", label: "Other (describe below)" },
  ];
  categories.forEach(({ id, label }) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, id, label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Concern Description ────────────────────────────────────
  y = addSectionHeader(doc, "Part 3 — Description of Concern", y);
  y = addFormTextField(
    doc,
    "crf_ai_system",
    "Which AI system(s) does this concern involve? (Name, vendor, or description):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 2;
  y = addFormTextField(
    doc,
    "crf_description",
    "Describe the concern in detail. What did you observe? When? Where?",
    y,
    { multiline: true, lines: 5 }
  );
  y += 2;
  y = addFormTextField(
    doc,
    "crf_evidence",
    "Is there evidence supporting your concern? (Documents, screenshots, records, witnesses):",
    y,
    { multiline: true, lines: 3 }
  );
  y += 2;
  y = addFormTextField(
    doc,
    "crf_harm",
    "Has anyone been harmed or is there risk of harm? Please describe:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Prior Reports ──────────────────────────────────────────
  y = addSectionHeader(doc, "Part 4 — Prior Reporting", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Have you previously reported this concern through another channel?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "crf_prior_yes", "Yes", y);
  y = addFormCheckbox(doc, "crf_prior_no", "No", y);
  y += 2;
  y = addFormTextField(
    doc,
    "crf_prior_details",
    "If yes, describe prior reports and any response received:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Desired Outcome ────────────────────────────────────────
  y = addSectionHeader(doc, "Part 5 — Desired Outcome", y);
  y = addFormTextField(
    doc,
    "crf_desired_outcome",
    "What outcome are you hoping for from this report? (Optional)",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Submission Instructions ────────────────────────────────
  y = addSectionHeader(doc, "How to Submit This Form", y);
  y = addWrappedText(
    doc,
    "Submit this completed form to the AI Compliance Officer. Contact information is " +
      "available in your organization's AI Safety Whistleblower Protection Policy and " +
      "employee handbook. If you prefer to report anonymously, your organization may " +
      "provide a secure online submission channel.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "crf_submission_destination", "Submit to (AI Compliance Officer Contact):", y, {
    multiline: true,
    lines: 2,
  });

  // ── For Office Use Only ────────────────────────────────────
  if (y > 220) {
    doc.addPage();
    y = MARGIN;
  }
  y = addSectionHeader(doc, "FOR OFFICE USE ONLY — Do Not Complete", y);
  y = addFormTextField(doc, "crf_received_by", "Received By:", y);
  y = addFormTextField(doc, "crf_received_date", "Date Received:", y);
  y = addFormTextField(doc, "crf_case_number", "Case Number:", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Disposition:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "crf_disp_under_investigation", "Under Investigation", y);
  y = addFormCheckbox(doc, "crf_disp_resolved", "Resolved — No Violation Found", y);
  y = addFormCheckbox(doc, "crf_disp_violation", "Violation Confirmed — Corrective Action Taken", y);
  y = addFormCheckbox(doc, "crf_disp_escalated", "Escalated to AI Steering Committee", y);
  y += 2;
  y = addFormTextField(
    doc,
    "crf_disposition_notes",
    "Disposition Notes:",
    y,
    { multiline: true, lines: 3 }
  );

  addDisclaimer(doc);
  return doc;
}
