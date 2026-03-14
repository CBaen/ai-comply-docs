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
// DOCUMENT 2: AI System Lifecycle Tracker
// ============================================================
export function generateLifecycleTracker(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Lifecycle Tracker", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose ────────────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose", y);
  y = addWrappedText(
    doc,
    "This AI System Lifecycle Tracker documents the full lifecycle of each AI system " +
      "deployed by " + data.company.name + " — from initial development or procurement " +
      "through testing, deployment, active monitoring, and eventual retirement. " +
      "Lifecycle documentation is required for all Tier 1 and Tier 2 systems, and " +
      "recommended for Tier 3 systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Lifecycle Phases ───────────────────────────────────────
  y = addSectionHeader(doc, "2. Lifecycle Phases Overview", y);

  const phases = [
    {
      phase: "Phase 1 — Development / Procurement",
      desc:
        "Initial scoping, vendor evaluation, or internal development. Risk tier " +
        "classification begins here. Required: Use Case Request Form submitted to " +
        "AI Compliance Officer.",
    },
    {
      phase: "Phase 2 — Testing",
      desc:
        "Pre-deployment testing for accuracy, fairness, and reliability. For Tier 1 " +
        "systems: bias audit required. For Tier 2: accuracy testing and human review " +
        "process established. No live data from affected populations during testing.",
    },
    {
      phase: "Phase 3 — Approval",
      desc:
        "Formal approval by the AI Steering Committee (Tier 1) or AI Compliance Officer " +
        "(Tier 2). System registered in AI System Inventory. System Owner confirmed.",
    },
    {
      phase: "Phase 4 — Deployment",
      desc:
        "System goes live in production environment. Monitoring schedule activated. " +
        "System Owner responsible for performance from this date. Required disclosures " +
        "published if applicable.",
    },
    {
      phase: "Phase 5 — Active Monitoring",
      desc:
        "Ongoing performance monitoring per risk tier schedule. Performance reports " +
        "submitted to AI Compliance Officer. Material issues escalated. Annual " +
        "re-classification review completed.",
    },
    {
      phase: "Phase 6 — Retirement",
      desc:
        "System decommissioned. Data disposition documented. AI System Inventory " +
        "updated to Retired status. Monitoring obligations cease. Regulatory records " +
        "retained per applicable retention schedule.",
    },
  ];

  phases.forEach(({ phase, desc }) => {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, phase, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, desc, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── Lifecycle Record ───────────────────────────────────────
  y = addSectionHeader(doc, "3. Lifecycle Record", y);
  y = addWrappedText(
    doc,
    "Complete one Lifecycle Record for each AI system. Use additional pages for " +
      "additional systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 2; i++) {
    if (y > 160) {
      doc.addPage();
      y = MARGIN;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    y = addWrappedText(doc, "LIFECYCLE RECORD — SYSTEM " + i, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y += 2;

    y = addFormTextField(doc, `lc_${i}_system_name`, "AI System Name:", y);
    y = addFormTextField(doc, `lc_${i}_system_owner`, "System Owner (Name & Title):", y);
    y = addFormTextField(doc, `lc_${i}_risk_tier`, "Risk Tier (1 / 2 / 3):", y);
    y += LINE_HEIGHT;

    // Phase checkboxes
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, "Current Lifecycle Phase:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormCheckbox(doc, `lc_${i}_phase1`, "Phase 1 — Development / Procurement", y);
    y = addFormCheckbox(doc, `lc_${i}_phase2`, "Phase 2 — Testing", y);
    y = addFormCheckbox(doc, `lc_${i}_phase3`, "Phase 3 — Approval", y);
    y = addFormCheckbox(doc, `lc_${i}_phase4`, "Phase 4 — Deployment", y);
    y = addFormCheckbox(doc, `lc_${i}_phase5`, "Phase 5 — Active Monitoring", y);
    y = addFormCheckbox(doc, `lc_${i}_phase6`, "Phase 6 — Retirement", y);
    y += LINE_HEIGHT;

    y = addFormTextField(doc, `lc_${i}_development_start`, "Phase 1 Start Date:", y);
    y = addFormTextField(doc, `lc_${i}_testing_start`, "Phase 2 (Testing) Start Date:", y);
    y = addFormTextField(doc, `lc_${i}_approval_date`, "Phase 3 Approval Date & Authority:", y);
    y = addFormTextField(doc, `lc_${i}_deployment_date`, "Phase 4 Deployment Date:", y);
    y = addFormTextField(doc, `lc_${i}_last_review`, "Last Performance Review Date:", y);
    y = addFormTextField(doc, `lc_${i}_next_review`, "Next Scheduled Review Date:", y);
    y = addFormTextField(doc, `lc_${i}_retirement_date`, "Phase 6 Retirement Date (if applicable):", y);
    y = addFormTextField(doc, `lc_${i}_data_disposition`, "Data Disposition Upon Retirement:", y, {
      multiline: true,
      lines: 2,
    });

    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, "Material Changes to System Scope or Use:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, `lc_${i}_changes`, "Describe any material changes and dates:", y, {
      multiline: true,
      lines: 3,
    });
    y += LINE_HEIGHT * 2;
  }

  addDisclaimer(doc);
  return doc;
}
