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
// DOCUMENT 1: AI System Inventory Template
// Aligned with NIST AI RMF MAP Function
// ============================================================
export function generateSystemInventory(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Inventory Template", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose & Instructions ─────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose & Instructions", y);
  y = addWrappedText(
    doc,
    "This AI System Inventory captures all AI systems operated by " + data.company.name +
      ". An accurate inventory is the prerequisite for every AI compliance obligation — " +
      "you cannot assess risk, assign accountability, or comply with any AI law for " +
      "systems you have not cataloged. Every AI system must be registered before deployment.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "What counts as an AI system for this inventory? Any software or service that uses " +
      "machine learning, natural language processing, computer vision, recommendation " +
      "engines, or automated decision logic. This includes: internal builds, third-party " +
      "products, SaaS tools with AI features, and generative AI tools used in the course " +
      "of business.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Inventory Header ───────────────────────────────────────
  y = addSectionHeader(doc, "2. Inventory Administration", y);
  y = addFormTextField(doc, "inv_administrator", "Inventory Administrator (AI Compliance Officer):", y);
  y = addFormTextField(doc, "inv_last_updated", "Date Last Updated:", y);
  y = addFormTextField(doc, "inv_review_cycle", "Review Cycle (recommended: quarterly):", y);
  y += LINE_HEIGHT;

  // ── System Records ─────────────────────────────────────────
  y = addSectionHeader(doc, "3. AI System Records", y);
  y = addWrappedText(
    doc,
    "Complete one record for each AI system. Add additional pages as needed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Three system records per the template
  for (let i = 1; i <= 3; i++) {
    if (y > 200) {
      doc.addPage();
      y = MARGIN;
    }

    doc.setDrawColor(50, 100, 200);
    doc.setLineWidth(0.3);
    doc.rect(MARGIN, y - 2, CONTENT_WIDTH, 130);
    doc.setDrawColor(0);

    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, "SYSTEM RECORD " + i, MARGIN + 3, y + 2, CONTENT_WIDTH - 6, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");

    y = addFormTextField(doc, `inv_${i}_name`, "System Name:", y + 2);
    y = addFormTextField(doc, `inv_${i}_vendor`, "Vendor / Developer:", y);
    y = addFormTextField(doc, `inv_${i}_version`, "Version / Model:", y);
    y = addFormTextField(
      doc,
      `inv_${i}_purpose`,
      "Purpose / Use Case (what does this system do?):",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `inv_${i}_data_inputs`,
      "Data Inputs (what data does it use?):",
      y,
      { multiline: true, lines: 2 }
    );

    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Who does this system affect?",
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormCheckbox(doc, `inv_${i}_affects_employees`, "Employees", y);
    y = addFormCheckbox(doc, `inv_${i}_affects_customers`, "Customers / Consumers", y);
    y = addFormCheckbox(doc, `inv_${i}_affects_applicants`, "Job Applicants", y);
    y = addFormCheckbox(doc, `inv_${i}_affects_public`, "General Public", y);
    y += 2;

    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Risk Tier (from Risk Classification Matrix):",
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormCheckbox(doc, `inv_${i}_tier1`, "Tier 1 — High Risk", y);
    y = addFormCheckbox(doc, `inv_${i}_tier2`, "Tier 2 — Medium Risk", y);
    y = addFormCheckbox(doc, `inv_${i}_tier3`, "Tier 3 — Low Risk", y);
    y += 2;

    y = addFormTextField(doc, `inv_${i}_owner`, "System Owner (Name & Title):", y);
    y = addFormTextField(doc, `inv_${i}_approval_date`, "Approval Date:", y);
    y = addFormTextField(doc, `inv_${i}_deployment_date`, "Deployment Date:", y);
    y = addFormTextField(doc, `inv_${i}_next_review`, "Next Review Date:", y);

    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      "Status:",
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormCheckbox(doc, `inv_${i}_status_active`, "Active", y);
    y = addFormCheckbox(doc, `inv_${i}_status_testing`, "In Testing", y);
    y = addFormCheckbox(doc, `inv_${i}_status_retired`, "Retired", y);
    y += LINE_HEIGHT * 2;
  }

  // ── Inventory Summary ──────────────────────────────────────
  if (y > 230) {
    doc.addPage();
    y = MARGIN;
  }
  y = addSectionHeader(doc, "4. Inventory Summary", y);
  y = addFormTextField(doc, "inv_total_systems", "Total AI Systems in Inventory:", y);
  y = addFormTextField(doc, "inv_tier1_count", "Tier 1 (High Risk) Systems:", y);
  y = addFormTextField(doc, "inv_tier2_count", "Tier 2 (Medium Risk) Systems:", y);
  y = addFormTextField(doc, "inv_tier3_count", "Tier 3 (Low Risk) Systems:", y);
  y = addFormTextField(
    doc,
    "inv_notes",
    "Notes / Systems Pending Review:",
    y,
    { multiline: true, lines: 3 }
  );

  addDisclaimer(doc);
  return doc;
}
