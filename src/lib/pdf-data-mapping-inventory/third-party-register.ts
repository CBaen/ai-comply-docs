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
// DOCUMENT 3: Third-Party Data Sharing Register
// Third-party data sharing register
// ============================================================
export function generateThirdPartyRegister(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Third-Party Data Sharing Register", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This register documents all third parties with whom " +
      data.company.name +
      " shares personal data, including AI vendors, data processors, and analytics providers. " +
      "Under state privacy laws (CA CCPA, CO SB24-205, MN MCDPA, TX TDPSA, DE PDPA), organizations must be able to identify all parties with access to personal data " +
      "and the legal basis for sharing. Update this register whenever a new third-party relationship begins or an existing one changes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Register Metadata ──────────────────────────────────────
  y = addSectionHeader(doc, "Register Metadata", y);
  y = addFormTextField(doc, "tpr_as_of", "Register As Of:", y);
  y = addFormTextField(doc, "tpr_owner", "Register Owner (Name, Title):", y);
  y = addFormTextField(doc, "tpr_last_audit", "Last Third-Party Audit Date:", y);
  y += LINE_HEIGHT;

  // ── Third-Party Register Table ─────────────────────────────
  y = addSectionHeader(doc, "Third-Party Register", y);
  y = addWrappedText(
    doc,
    "Complete one entry for each third party that receives personal data from your organization. " +
      "AI vendors processing personal data are sub-processors and must be included.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Draw 8 third-party entries
  for (let entry = 1; entry <= 8; entry++) {
    if (y > 180) { doc.addPage(); y = MARGIN; }

    // Entry border
    doc.setDrawColor(180, 200, 230);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 50, 1.5, 1.5, "S");

    // Entry label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(50, 80, 150);
    doc.text("Third Party #" + entry, MARGIN + 3, y + 5);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 8;

    const p = "tpr_tp" + entry + "_";
    const innerWidth = CONTENT_WIDTH - 6;

    // Left column fields
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Company Name:", MARGIN + 3, y);
    doc.setFont("helvetica", "normal");
    doc.rect(MARGIN + 35, y - 4.5, 80, 6);

    doc.setFont("helvetica", "bold");
    doc.text("Role:", MARGIN + 3, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("(processor / controller / joint controller / recipient)", MARGIN + 15, y + 8);
    doc.rect(MARGIN + 3, y + 9, 80, 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Data Shared:", MARGIN + 3, y + 18);
    doc.setFont("helvetica", "normal");
    doc.rect(MARGIN + 28, y + 13.5, 80, 6);

    doc.setFont("helvetica", "bold");
    doc.text("Purpose:", MARGIN + 3, y + 26);
    doc.setFont("helvetica", "normal");
    doc.rect(MARGIN + 3, y + 21.5, 100, 6);

    doc.setFont("helvetica", "bold");
    doc.text("Legal Basis:", MARGIN + 3, y + 34);
    doc.setFont("helvetica", "normal");
    doc.rect(MARGIN + 3, y + 29.5, 100, 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Contract on File?", MARGIN + 115, y);
    doc.rect(MARGIN + 115, y + 1, 20, 5);
    doc.text("DPA on File?", MARGIN + 115, y + 10);
    doc.rect(MARGIN + 115, y + 11, 20, 5);
    doc.text("AI Vendor?", MARGIN + 115, y + 20);
    doc.rect(MARGIN + 115, y + 21, 20, 5);
    doc.text("Cross-Border?", MARGIN + 115, y + 30);
    doc.rect(MARGIN + 115, y + 31, 20, 5);

    doc.setFont("helvetica", "normal");
    y += 42;

    // Invisible fields for form fill
    doc.addField && void 0; // suppress unused expression
    // Use form field names for tracking
    doc.setFontSize(6);
    doc.setTextColor(150);
    doc.text("ref: " + p + "name", MARGIN + 3, y);
    doc.setTextColor(0);
    doc.setFontSize(10);
    y += 5;
  }
  y += LINE_HEIGHT;

  // ── Data Sale / Sharing Summary ────────────────────────────
  if (y > 180) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Data Sale & Sharing Summary", y);
  y = addFormTextField(doc, "tpr_total_parties", "Total number of third parties with data access:", y);
  y = addFormTextField(doc, "tpr_sale_parties", "Number that receive data for compensation (\"data sales\"):", y);
  y = addFormTextField(doc, "tpr_ai_vendors", "Number that are AI vendors processing personal data:", y);
  y = addFormTextField(doc, "tpr_cross_border", "Number with cross-border data transfers:", y);
  y = addFormTextField(doc, "tpr_no_dpa", "Number without signed Data Processing Agreements:", y);
  y += LINE_HEIGHT;

  // ── Action Items ───────────────────────────────────────────
  y = addSectionHeader(doc, "Action Items from This Review", y);
  y = addWrappedText(
    doc,
    "Items requiring action before next review:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "tpr_action_dpa", "Parties requiring Data Processing Agreements:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "tpr_action_remove", "Sharing relationships to discontinue or renegotiate:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "tpr_action_assess", "Parties requiring vendor risk assessment:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Certification ──────────────────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Certification", y);
  y = addFormTextField(doc, "tpr_cert_name", "Completed By (Name, Title):", y);
  y = addFormTextField(doc, "tpr_cert_sig", "Signature:", y);
  y = addFormTextField(doc, "tpr_cert_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
