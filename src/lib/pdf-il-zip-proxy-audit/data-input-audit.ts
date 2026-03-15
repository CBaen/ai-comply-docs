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
// IL Zip Code Proxy Audit — Doc 1: Data Input Audit
// Audit whether zip codes are fed into AI hiring tools
// Per 775 ILCS 5/2-102(L)(1) — zip code proxy prohibition
// ============================================================
export function generateDataInputAudit(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Data Input Audit — Zip Code & Proxy Review", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This workbook audits all data inputs to AI systems used in employment decisions at ${data.company.name}. Under 775 ILCS 5/2-102(L)(1), AI systems used in employment decisions may not use zip codes as a proxy for race, color, national origin, or other protected characteristics. Complete one section per AI system.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Audit Scope ----
  y = addSectionHeader(doc, "Section 1: Audit Scope & Purpose", y);

  y = addFormTextField(doc, "dia_audit_date", "Audit Date:", y, { width: 70 });
  y = addFormTextField(doc, "dia_auditor_name", "Auditor Name / Title:", y);
  y = addFormTextField(
    doc,
    "dia_audit_period",
    "Period Covered by This Audit:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "dia_systems_count",
    "Total number of AI systems in scope:",
    y,
    { width: 50 }
  );

  // ---- SECTION 2: Per-System Input Review ----
  const systemCount = Math.max(data.aiSystems.length, 3);

  for (let i = 0; i < systemCount; i++) {
    const sys = data.aiSystems[i];
    const prefix = `dia_sys${i + 1}`;

    y = addSectionHeader(
      doc,
      `Section 2.${i + 1}: AI System ${i + 1} — Data Input Inventory`,
      y
    );

    y = addFormTextField(doc, `${prefix}_name`, "AI System Name:", y, {
      prefill: sys?.name || "",
    });
    y = addFormTextField(doc, `${prefix}_vendor`, "Vendor / Developer:", y, {
      prefill: sys?.vendor || "",
    });
    y = addFormTextField(
      doc,
      `${prefix}_use_case`,
      "Employment Decision Use Case:",
      y,
      { prefill: sys?.decisions?.join(", ") || "" }
    );

    // Data type checkboxes
    y = addWrappedText(
      doc,
      "Check all data types this AI system ingests as inputs:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;

    const directInputs = [
      "Applicant / employee name",
      "Resume or CV text",
      "Job application form responses",
      "Skills assessment scores",
      "Video interview recordings or transcripts",
      "Social media profile data",
      "Performance reviews or ratings",
      "Attendance or punctuality records",
      "Workplace communication data",
      "Biometric data",
      "Compensation history",
      "Education credentials",
      "Professional certifications",
      "Work history / tenure",
      "Reference check data",
    ];
    directInputs.forEach((input, idx) => {
      y = addFormCheckbox(doc, `${prefix}_input_${idx}`, input, y);
    });

    y += 2;
    y = addWrappedText(
      doc,
      "Check all geographic or location-based data types this system ingests:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;

    const geoInputs = [
      "ZIP code (5-digit or ZIP+4)",
      "City or town name",
      "County or region name",
      "Neighborhood name or identifier",
      "School district name or identifier",
      "Census tract or block group",
      "Commute distance or travel time",
      "IP address or device location",
      "Prior home address or mailing address",
      "Employer address / work location",
    ];
    geoInputs.forEach((geo, idx) => {
      y = addFormCheckbox(
        doc,
        `${prefix}_geo_${idx}`,
        geo,
        y
      );
    });

    y += 2;
    y = addFormTextField(
      doc,
      `${prefix}_other_inputs`,
      "Other data inputs not listed above:",
      y,
      { multiline: true, lines: 2 }
    );

    // ZIP-specific finding
    y = addFormTextField(
      doc,
      `${prefix}_zip_finding`,
      "Zip code / geographic data finding (describe any flagged inputs and how they are used):",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `${prefix}_zip_remediation`,
      "Remediation required? (Yes / No — if Yes, describe):",
      y,
      { multiline: true, lines: 2 }
    );

    y += 2;
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  }

  // ---- SECTION 3: Summary Findings ----
  y = addSectionHeader(doc, "Section 3: Audit Summary Findings", y);

  y = addFormTextField(
    doc,
    "dia_systems_reviewed",
    "Total AI systems reviewed:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "dia_systems_flagged",
    "Systems with zip code or proxy inputs identified:",
    y,
    { width: 50 }
  );
  y = addFormTextField(
    doc,
    "dia_overall_finding",
    "Overall audit finding:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "dia_next_steps",
    "Next steps / escalation actions:",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "dia_audit", y);
  addDisclaimer(doc);
  return doc;
}
