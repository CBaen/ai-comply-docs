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
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: AI Risk Register Excerpt
// Top 5 AI risks for board reporting
// ============================================================
export function generateRiskRegisterExcerpt(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Risk Register — Board Reporting Excerpt", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This risk register excerpt presents the top AI compliance risks at " +
      data.company.name +
      " for board-level reporting. It is a summary — the complete risk register maintained by the compliance team contains full detail. " +
      "Update this excerpt before each board meeting.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Risk Register Metadata ─────────────────────────────────
  y = addSectionHeader(doc, "Register Information", y);
  y = addFormTextField(doc, "rr_as_of_date", "Risk Register As Of:", y);
  y = addFormTextField(doc, "rr_owner", "Risk Register Owner (Name, Title):", y);
  y = addFormTextField(doc, "rr_reviewed_by", "Last Reviewed By:", y);
  y += LINE_HEIGHT;

  // ── Risk Rating Guide ──────────────────────────────────────
  y = addSectionHeader(doc, "Risk Rating Guide", y);

  const ratings = [
    "Critical (Red) — Likely occurrence, high impact. Regulatory fine or enforcement action probable. Requires immediate board attention and remediation.",
    "High (Orange) — Possible occurrence, significant impact. Potential regulatory exposure or operational harm. Requires executive attention within 30 days.",
    "Medium (Yellow) — Less likely, moderate impact. Manageable with current controls. Requires monitoring and scheduled remediation.",
    "Low (Green) — Unlikely, limited impact. Acceptable with current controls. Monitor annually.",
  ];
  ratings.forEach((r) => {
    y = addWrappedText(doc, "\u2022  " + r, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Top 5 Risks ────────────────────────────────────────────
  if (y > 160) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Top AI Compliance Risks", y);

  const risks = [
    {
      num: "Risk 1",
      nameField: "rr_risk1_name",
      nameLabel: "Risk Description:",
      ratingField: "rr_risk1_rating",
      ratingLabel: "Rating (Critical / High / Medium / Low):",
      likelihoodField: "rr_risk1_likelihood",
      likelihoodLabel: "Likelihood:",
      impactField: "rr_risk1_impact",
      impactLabel: "Impact if Realized:",
      controlsField: "rr_risk1_controls",
      controlsLabel: "Current Controls:",
      actionField: "rr_risk1_action",
      actionLabel: "Required Action / Owner / Deadline:",
    },
    {
      num: "Risk 2",
      nameField: "rr_risk2_name",
      nameLabel: "Risk Description:",
      ratingField: "rr_risk2_rating",
      ratingLabel: "Rating:",
      likelihoodField: "rr_risk2_likelihood",
      likelihoodLabel: "Likelihood:",
      impactField: "rr_risk2_impact",
      impactLabel: "Impact if Realized:",
      controlsField: "rr_risk2_controls",
      controlsLabel: "Current Controls:",
      actionField: "rr_risk2_action",
      actionLabel: "Required Action / Owner / Deadline:",
    },
    {
      num: "Risk 3",
      nameField: "rr_risk3_name",
      nameLabel: "Risk Description:",
      ratingField: "rr_risk3_rating",
      ratingLabel: "Rating:",
      likelihoodField: "rr_risk3_likelihood",
      likelihoodLabel: "Likelihood:",
      impactField: "rr_risk3_impact",
      impactLabel: "Impact if Realized:",
      controlsField: "rr_risk3_controls",
      controlsLabel: "Current Controls:",
      actionField: "rr_risk3_action",
      actionLabel: "Required Action / Owner / Deadline:",
    },
    {
      num: "Risk 4",
      nameField: "rr_risk4_name",
      nameLabel: "Risk Description:",
      ratingField: "rr_risk4_rating",
      ratingLabel: "Rating:",
      likelihoodField: "rr_risk4_likelihood",
      likelihoodLabel: "Likelihood:",
      impactField: "rr_risk4_impact",
      impactLabel: "Impact if Realized:",
      controlsField: "rr_risk4_controls",
      controlsLabel: "Current Controls:",
      actionField: "rr_risk4_action",
      actionLabel: "Required Action / Owner / Deadline:",
    },
    {
      num: "Risk 5",
      nameField: "rr_risk5_name",
      nameLabel: "Risk Description:",
      ratingField: "rr_risk5_rating",
      ratingLabel: "Rating:",
      likelihoodField: "rr_risk5_likelihood",
      likelihoodLabel: "Likelihood:",
      impactField: "rr_risk5_impact",
      impactLabel: "Impact if Realized:",
      controlsField: "rr_risk5_controls",
      controlsLabel: "Current Controls:",
      actionField: "rr_risk5_action",
      actionLabel: "Required Action / Owner / Deadline:",
    },
  ];

  risks.forEach((risk) => {
    if (y > 180) { doc.addPage(); y = MARGIN; }

    // Risk header box
    doc.setFillColor(235, 240, 250);
    doc.setDrawColor(50, 100, 200);
    doc.setLineWidth(0.5);
    doc.rect(MARGIN, y, CONTENT_WIDTH, 8, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 60, 130);
    doc.text(risk.num, MARGIN + 3, y + 5.5);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 10;

    y = addFormTextField(doc, risk.nameField, risk.nameLabel, y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, risk.ratingField, risk.ratingLabel, y);
    y = addFormTextField(doc, risk.likelihoodField, risk.likelihoodLabel, y);
    y = addFormTextField(doc, risk.impactField, risk.impactLabel, y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, risk.controlsField, risk.controlsLabel, y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, risk.actionField, risk.actionLabel, y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT;
  });

  // ── Overall Risk Summary ───────────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Overall AI Risk Summary", y);
  y = addFormTextField(doc, "rr_overall_rating", "Overall AI compliance risk rating:", y);
  y = addFormTextField(doc, "rr_trend", "Risk trend vs. prior period (improving / stable / worsening):", y);
  y = addFormTextField(doc, "rr_exec_summary", "Executive narrative (2–3 sentences for board context):", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "rr_certifier_name", "Certified By (Name, Title):", y);
  y = addFormTextField(doc, "rr_certifier_date", "Date:", y);

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "board_risk", y);

  addDisclaimer(doc);
  return doc;
}
