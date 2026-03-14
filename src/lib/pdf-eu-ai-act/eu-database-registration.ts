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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 8: EU Database Registration Documentation
// EU AI Act Art. 49 — Registration
// ============================================================
export function generateEUDatabaseRegistration(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU Database Registration Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document prepares ${data.company.name} for registration in the EU database established under Article 71 of Regulation (EU) 2024/1689. Article 49 requires providers of high-risk AI systems listed in Annex III to register in the EU database before placing the system on the market or putting it into service. Deployers of certain Annex III systems also have registration obligations. Verify current registration requirements and the status of the EU database at artificialintelligenceact.eu and with EU-qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Registration Obligation Assessment", y);
  y = addWrappedText(
    doc,
    "Check applicable registration obligations (Art. 49):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const obligations = [
    "Provider: registering high-risk AI system before market placement (Art. 49(1))",
    "Provider: registering in the EU database established by Art. 71",
    "Deployer: registering where required for specific Annex III categories (Art. 49(2))",
    "EU authorized representative: registering on behalf of non-EU provider (Art. 49(3))",
  ];
  let cbCount = 0;
  obligations.forEach((obl) => {
    y = addFormCheckbox(doc, "reg_obl_" + cbCount, obl, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Registration Data: ${sys.name}`, y);

    y = addWrappedText(
      doc,
      "Information required for EU database registration (Art. 49 and Annex VIII):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    const registrationFields: [string, string, string][] = [
      [
        `reg_${idx}_name`,
        "AI system name:",
        sys.name,
      ],
      [
        `reg_${idx}_version`,
        "Version number:",
        "",
      ],
      [
        `reg_${idx}_provider`,
        "Provider name and contact details:",
        data.company.name,
      ],
      [
        `reg_${idx}_eu_rep`,
        "EU authorized representative (if applicable):",
        "",
      ],
      [
        `reg_${idx}_purpose`,
        "Intended purpose (Annex III category):",
        sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", "),
      ],
      [
        `reg_${idx}_status`,
        "Registration status (registered / pending / exempt):",
        "",
      ],
      [
        `reg_${idx}_eu_id`,
        "EU database registration number (once assigned):",
        "",
      ],
    ];

    registrationFields.forEach(([fieldName, label, prefill]) => {
      y = addFormTextField(doc, fieldName, label, y, {
        prefill,
        readOnly: false,
      });
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Registration Checklist (Art. 49 + Annex VIII)", y);
  const regChecklist = [
    "EU database account created at designated registration portal",
    "All required Annex VIII information compiled for each high-risk system",
    "Technical documentation (Annex IV) complete and available for registration",
    "EU Declaration of Conformity (Art. 47) signed and referenced",
    "CE marking affixed where required (Art. 48)",
    "Registration submitted before market placement or deployment",
    "Registration number recorded and referenced in technical documentation",
    "Annual updates submitted as required (Art. 49(5))",
  ];
  regChecklist.forEach((item, idx) => {
    y = addFormCheckbox(doc, "reg_check_" + idx, item, y);
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Registration Responsible Party", y);
  y = addFormTextField(doc, "reg_responsible", "Person Responsible for Registration:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "reg_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "reg_date", "Target Registration Date:", y);

  addDisclaimer(doc);
  return doc;
}
