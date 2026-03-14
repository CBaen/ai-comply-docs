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
// DOCUMENT 1: Annual AI Transparency Report Template
// Aligned with EU AI Act Art. 13 + Voluntary Best Practice
// ============================================================
export function generateTransparencyReport(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Annual AI Transparency Report", data);
  y = addTopDisclaimer(doc, y);

  // ── Cover Information ──────────────────────────────────────
  y = addSectionHeader(doc, "Report Information", y);
  y = addFormTextField(doc, "tr_org_name", "Organization Name:", y, {
    prefill: data.company.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "tr_report_period", "Report Period (e.g., Calendar Year 2025):", y);
  y = addFormTextField(doc, "tr_published_date", "Date Published:", y);
  y = addFormTextField(doc, "tr_contact", "AI Transparency Contact (Name, Title, Email):", y);
  y += LINE_HEIGHT;

  // ── Executive Summary ──────────────────────────────────────
  y = addSectionHeader(doc, "1. Executive Summary", y);
  y = addWrappedText(
    doc,
    "This Annual AI Transparency Report discloses " + data.company.name + "'s use of " +
      "artificial intelligence systems during the report period. It describes the AI systems " +
      "we operate, their purposes, the safeguards we have in place, and our outcomes. We " +
      "publish this report to demonstrate our commitment to responsible and transparent AI " +
      "deployment.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "tr_summary",
    "Executive Summary (describe the Organization's AI program in plain language):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── AI Systems Disclosure ──────────────────────────────────
  y = addSectionHeader(doc, "2. AI Systems in Use", y);
  y = addWrappedText(
    doc,
    "The following AI systems were in active use during the report period:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 3; i++) {
    if (y > 210) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, "AI System " + i + ":", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, `tr_sys_${i}_name`, "System Name / Product:", y);
    y = addFormTextField(doc, `tr_sys_${i}_purpose`, "Purpose:", y);
    y = addFormTextField(doc, `tr_sys_${i}_scope`, "Who it affects:", y);
    y = addFormTextField(doc, `tr_sys_${i}_vendor`, "Vendor / Developer:", y);
    y = addFormTextField(doc, `tr_sys_${i}_risk_tier`, "Risk Tier:", y);
    y += LINE_HEIGHT;
  }

  // ── Safeguards & Oversight ─────────────────────────────────
  y = addSectionHeader(doc, "3. Safeguards & Human Oversight", y);
  y = addWrappedText(
    doc,
    "Describe the safeguards and human oversight mechanisms in place for AI systems " +
      "during the report period:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const safeguardAreas = [
    { label: "Human review process for consequential decisions:", field: "tr_human_review" },
    { label: "Bias testing and fairness evaluation conducted:", field: "tr_bias_testing" },
    { label: "Incident reporting and response procedures:", field: "tr_incident_procedures" },
    { label: "Employee AI training and awareness programs:", field: "tr_training" },
    { label: "Third-party audits or assessments completed:", field: "tr_audits" },
  ];
  safeguardAreas.forEach(({ label, field }) => {
    if (y > 250) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormTextField(doc, field, label, y, { multiline: true, lines: 2 });
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Outcomes & Performance ─────────────────────────────────
  y = addSectionHeader(doc, "4. Outcomes & Performance", y);
  y = addWrappedText(
    doc,
    "Describe key AI outcomes and performance metrics for the report period:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const outcomes = [
    { label: "Number of AI-assisted decisions made:", field: "tr_decisions_count" },
    { label: "AI incidents reported and resolved:", field: "tr_incidents" },
    { label: "Consumer or employee complaints related to AI:", field: "tr_complaints" },
    { label: "Corrective actions taken:", field: "tr_corrective_actions" },
  ];
  outcomes.forEach(({ label, field }) => {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormTextField(doc, field, label, y, { multiline: true, lines: 2 });
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Regulatory Compliance ──────────────────────────────────
  y = addSectionHeader(doc, "5. Regulatory Compliance Status", y);
  y = addFormTextField(
    doc,
    "tr_regulatory_status",
    "Describe applicable AI laws and the Organization's compliance status:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Looking Ahead ──────────────────────────────────────────
  y = addSectionHeader(doc, "6. Upcoming AI Governance Priorities", y);
  y = addFormTextField(
    doc,
    "tr_priorities",
    "Describe planned improvements, new AI deployments, or governance enhancements for the coming year:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Certification ──────────────────────────────────────────
  y = addSectionHeader(doc, "7. Certification", y);
  y = addWrappedText(
    doc,
    "The undersigned certifies that this AI Transparency Report is accurate to the best " +
      "of their knowledge and that the Organization is committed to ongoing responsible AI " +
      "governance.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "tr_certified_by", "Certified By (Name & Title):", y);
  y = addFormTextField(doc, "tr_certification_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
