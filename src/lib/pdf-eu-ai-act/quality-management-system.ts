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
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: Quality Management System
// EU AI Act Art. 17 — Quality Management System
// ============================================================
export function generateQualityManagementSystem(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Quality Management System", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes the Quality Management System (QMS) for ${data.company.name} as required by Article 17 of Regulation (EU) 2024/1689. Article 17 requires providers of high-risk AI systems to put in place a quality management system that ensures compliance with the EU AI Act throughout the system\u2019s lifecycle. The QMS must be documented in a systematic and orderly manner. This is a template \u2014 complete with your quality and legal teams.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "1. QMS Scope and Policy (Art. 17(1)(a))", y);
  y = addFormTextField(
    doc,
    "qms_scope",
    "AI systems covered by this QMS:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "qms_policy",
    "AI quality and compliance policy statement:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "2. Roles and Responsibilities (Art. 17(1)(b))", y);
  y = addFormTextField(
    doc,
    "qms_responsible_main",
    "Person with overall QMS responsibility:",
    y
  );
  y = addFormTextField(
    doc,
    "qms_responsible_data",
    "Person responsible for data governance (Art. 10):",
    y
  );
  y = addFormTextField(
    doc,
    "qms_responsible_risk",
    "Person responsible for risk management (Art. 9):",
    y
  );
  y = addFormTextField(
    doc,
    "qms_responsible_testing",
    "Person responsible for testing and validation:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "3. Procedures and Instructions (Art. 17(1)(c)-(f))", y);
  const procedures = [
    "Design and development procedures for AI systems (Art. 17(1)(c))",
    "Quality checks during design, development, and post-market phases (Art. 17(1)(d))",
    "Testing, validation, and examination procedures (Art. 17(1)(e))",
    "Technical standards applied and alternative solutions where harmonized standards not used (Art. 17(1)(f))",
    "Data management procedures, including data acquisition, collection, and labelling (Art. 17(1)(g))",
  ];
  let cbCount = 0;
  procedures.forEach((proc) => {
    y = addFormCheckbox(doc, "qms_proc_" + cbCount, proc, y, { checked: true });
    cbCount++;
  });
  y = addFormTextField(
    doc,
    "qms_proc_notes",
    "Notes / document references for each procedure above:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "4. Risk Management Integration (Art. 17(1)(h))", y);
  y = addWrappedText(
    doc,
    "The QMS must include risk management procedures as set out in Article 9. Reference the Risk Management System Documentation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "qms_risk_ref",
    "Risk Management System document reference:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "5. Post-Market Monitoring (Art. 17(1)(k))", y);
  y = addWrappedText(
    doc,
    "The QMS must include a post-market monitoring system plan as required by Article 72. Reference the Post-Market Monitoring Plan.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "qms_pmm_ref",
    "Post-Market Monitoring Plan document reference:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "6. Serious Incident Reporting (Art. 17(1)(l))", y);
  y = addWrappedText(
    doc,
    "The QMS must include incident reporting procedures. Under Article 73, providers must report serious incidents to market surveillance authorities without undue delay.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "qms_incident_ref",
    "Incident reporting procedure document reference:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "7. QMS Review and Approval", y);
  y = addFormTextField(doc, "qms_approved_by", "QMS Approved By (Name/Title):", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "qms_approval_date", "Date:", y);
  y = addFormTextField(
    doc,
    "qms_review_date",
    "Next Scheduled Review Date:",
    y
  );
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: review the QMS at least annually and after any substantial modification to a covered AI system.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
