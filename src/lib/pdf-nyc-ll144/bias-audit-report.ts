import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Bias Audit Report Template
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateBiasAuditReport(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Bias Audit Report Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Bias Audit Report documents the annual independent bias audit conducted for automated employment decision tools (AEDTs) used by ${data.company.name}, as required by NYC Admin. Code § 20-871(b)(1). Under § 20-870, an AEDT is any computational process derived from machine learning, statistical modeling, data analytics, or artificial intelligence used to make or substantially assist employment decisions. This audit must be conducted by an independent auditor. Recommended Best Practice — not a statutory mandate: retain audit records for at least four years.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Audit Overview", y);
  y = addFormTextField(doc, "auditor_name", "Independent Auditor Name/Firm:", y);
  y = addFormTextField(doc, "auditor_contact", "Auditor Contact Information:", y);
  y = addFormTextField(doc, "audit_date", "Audit Date:", y);
  y = addFormTextField(doc, "audit_period", "Data Period Covered (dates):", y);
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `AEDT ${idx + 1}: ${sys.name}`, y);

    y = addWrappedText(
      doc,
      `Per NYC Admin. Code § 20-870, document the following for each AEDT subject to the annual audit requirement under § 20-871(b)(1):`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    y = addFormTextField(doc, `aedt_${idx}_vendor`, "Vendor/Developer:", y);
    y = addFormTextField(doc, `aedt_${idx}_purpose`, "Purpose / Decision Type:", y);
    y = addFormTextField(
      doc,
      `aedt_${idx}_selection_rate_overall`,
      "Overall Selection Rate (%):",
      y
    );
    y += LINE_HEIGHT;

    y = addWrappedText(
      doc,
      "Impact Ratio Analysis by Sex Category (per DCWP rules at 6 RCNY § 5-301):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    const sexCategories = ["Male", "Female", "Non-binary/Other"];
    sexCategories.forEach((cat) => {
      const key = cat.toLowerCase().replace(/[^a-z]/g, "_");
      y = addFormTextField(
        doc,
        `aedt_${idx}_sex_${key}_rate`,
        `  ${cat} — Selection Rate (%) and Impact Ratio:`,
        y
      );
    });
    y += LINE_HEIGHT;

    y = addWrappedText(
      doc,
      "Impact Ratio Analysis by Race/Ethnicity Category (per DCWP rules at 6 RCNY § 5-301):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    const raceCategories = [
      "Hispanic or Latino",
      "White (not Hispanic/Latino)",
      "Black or African American",
      "Native Hawaiian / Pacific Islander",
      "Asian",
      "Native American / Alaska Native",
      "Two or more races",
    ];
    raceCategories.forEach((cat) => {
      const key = cat.toLowerCase().replace(/[^a-z]/g, "_").substring(0, 20);
      y = addFormTextField(
        doc,
        `aedt_${idx}_race_${key}_rate`,
        `  ${cat} — Selection Rate (%) and Impact Ratio:`,
        y
      );
    });
    y += LINE_HEIGHT;

    y = addWrappedText(
      doc,
      "An impact ratio below 0.80 (the 4/5 or 80% rule) for any category indicates potential adverse impact and must be disclosed in the published summary. Per DCWP rules, the impact ratio is the selection rate of a category divided by the selection rate of the most selected category.",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += LINE_HEIGHT;

    y = addFormTextField(
      doc,
      `aedt_${idx}_findings`,
      "Audit Findings / Observations:",
      y,
      { multiline: true, lines: 4 }
    );
    y = addFormTextField(
      doc,
      `aedt_${idx}_remediation`,
      "Recommended Remediation (if adverse impact found):",
      y,
      { multiline: true, lines: 3 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Auditor Certification", y);
  y = addWrappedText(
    doc,
    "The undersigned independent auditor certifies that this bias audit was conducted in accordance with NYC Admin. Code § 20-871(b)(1) and the DCWP implementing rules at 6 RCNY § 5-301, using the data and methodology described above. The auditor has no financial conflict of interest with the employer or the AEDT developer/vendor.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "auditor_signature", "Auditor Signature:", y);
  y = addFormTextField(doc, "auditor_date", "Date:", y);
  y = addFormTextField(doc, "auditor_license", "License/Certification (if applicable):", y);

  addDisclaimer(doc);
  return doc;
}
