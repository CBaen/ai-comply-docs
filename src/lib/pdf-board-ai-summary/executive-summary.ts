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
// DOCUMENT 1: Executive AI Compliance Status Report
// One-page AI compliance status report
// ============================================================
export function generateExecutiveSummary(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Compliance Status Report — Executive Summary", data);
  y = addTopDisclaimer(doc, y);

  // ── Report Header ──────────────────────────────────────────
  y = addSectionHeader(doc, "Report Overview", y);
  y = addFormTextField(doc, "es_report_period", "Reporting Period:", y);
  y = addFormTextField(doc, "es_prepared_by", "Prepared By (Name, Title):", y);
  y = addFormTextField(doc, "es_prepared_date", "Report Date:", y);
  y = addFormTextField(doc, "es_audience", 'Audience (e.g., "Board of Directors", "Executive Leadership Team", "Audit Committee"):', y);
  y += LINE_HEIGHT;

  // ── Section 1: Compliance Status Summary ──────────────────
  y = addSectionHeader(doc, "1. Compliance Status Summary", y);
  y = addWrappedText(
    doc,
    "Overall AI compliance status of " + data.company.name + ":",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const statusOptions = [
    { name: "es_status_compliant", label: "Compliant — All required compliance documents are in place and current." },
    { name: "es_status_partial", label: "Partially Compliant — Documentation in place for most applicable laws; gaps identified below." },
    { name: "es_status_inprogress", label: "In Progress — Compliance program is actively being built; timeline below." },
    { name: "es_status_gap", label: "Gaps Identified — Specific areas require action; detailed in Risk Register." },
  ];
  statusOptions.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y += LINE_HEIGHT / 2;

  y = addFormTextField(doc, "es_status_notes", "Executive summary of current compliance posture:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 2: Applicable Laws & Deadlines ─────────────────
  y = addSectionHeader(doc, "2. Applicable Regulatory Obligations", y);

  const obligations = [
    { name: "es_law_il", label: "Illinois HB3773 (775 ILCS 5/2-102(L)) — In effect January 1, 2026. Status:" },
    { name: "es_law_co", label: "Colorado SB24-205 (C.R.S. §§ 6-1-1701–1707) — Effective June 30, 2026. Status:" },
    { name: "es_law_nyc", label: "NYC Local Law 144 — In effect July 5, 2023. Status:" },
    { name: "es_law_ca", label: "California CCPA/ADMT — In effect January 1, 2026. Status:" },
    { name: "es_law_mn", label: "Minnesota MCDPA — In effect July 31, 2025. Status:" },
    { name: "es_law_eu", label: "EU AI Act (Regulation (EU) 2024/1689) — Phased effective dates through 2027. Status:" },
    { name: "es_law_other", label: "Other applicable law: [fill in]. Status:" },
  ];
  obligations.forEach((item) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 4;
  });
  y += LINE_HEIGHT;

  // ── Section 3: Key Actions Taken This Period ───────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "3. Key Actions Taken This Period", y);
  y = addFormTextField(doc, "es_actions", "Compliance actions completed this period:", y, { multiline: true, lines: 5 });
  y += LINE_HEIGHT;

  // ── Section 4: Open Items & Remediation ───────────────────
  y = addSectionHeader(doc, "4. Open Items & Remediation Actions", y);
  y = addFormTextField(doc, "es_open_items", "Open compliance items requiring action:", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "es_remediation_timeline", "Estimated completion timeline for open items:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 5: AI Systems Overview ────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "5. AI Systems Overview", y);
  y = addFormTextField(doc, "es_total_systems", "Total number of AI systems in operation:", y);
  y = addFormTextField(doc, "es_high_risk", "Number classified as high-risk:", y);
  y = addFormTextField(doc, "es_new_systems", "New AI systems added this period:", y);
  y = addFormTextField(doc, "es_retired_systems", "AI systems retired this period:", y);
  y += LINE_HEIGHT;

  // ── Section 6: Incidents ───────────────────────────────────
  y = addSectionHeader(doc, "6. AI Incidents & Risk Events", y);
  y = addFormTextField(doc, "es_incidents_count", "AI incidents logged this period:", y);
  y = addFormTextField(doc, "es_incidents_summary", "Summary of material incidents:", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "es_regulatory_actions", "Regulatory inquiries or enforcement actions:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 7: Budget & Resources ─────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "7. Compliance Resources & Budget", y);
  y = addFormTextField(doc, "es_budget_current", "Current AI compliance budget:", y);
  y = addFormTextField(doc, "es_budget_needed", "Additional resources needed:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 8: Recommendation ─────────────────────────────
  y = addSectionHeader(doc, "8. Leadership Recommendation", y);
  y = addFormTextField(doc, "es_recommendation", "Recommended action for board/executive leadership:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // ── Approval ───────────────────────────────────────────────
  y = addSectionHeader(doc, "Report Approval", y);
  y = addFormTextField(doc, "es_approve_name", "Approved By (Name & Title):", y);
  y = addFormTextField(doc, "es_approve_sig", "Signature:", y);
  y = addFormTextField(doc, "es_approve_date", "Date:", y);

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "board_exec", y);

  addDisclaimer(doc);
  return doc;
}
