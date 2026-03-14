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
  ROLE_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: Manage Function Documentation
// NIST AI RMF 1.0 — MANAGE Core Function
// ============================================================
export function generateManageDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF: Manage Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document implements the MANAGE function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1) for ${data.company.name}. The MANAGE function allocates risk resources and applies controls to address risks in priority order. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "MANAGE-1 \u2014 Risk Treatment Decisions", y);
  y = addWrappedText(
    doc,
    "For each AI system, document the risk treatment decision: Accept / Avoid / Mitigate / Transfer:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const treatments = [
      "Accept \u2014 risk is within tolerance; continue with monitoring",
      "Mitigate \u2014 implement controls to reduce likelihood or impact",
      "Avoid \u2014 discontinue or modify the AI system",
      "Transfer \u2014 share risk with vendor or through insurance",
    ];
    treatments.forEach((t, tidx) => {
      y = addFormCheckbox(doc, `mng_${idx}_treat_${tidx}`, t, y);
    });
    y = addFormTextField(
      doc,
      `mng_${idx}_rationale`,
      "  Treatment rationale:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "MANAGE-2 \u2014 Risk Treatment Plans", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `Treatment Plan: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `mng_${idx}_controls`,
      "  Controls implemented:",
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `mng_${idx}_timeline`,
      "  Implementation timeline:",
      y
    );
    y = addFormTextField(
      doc,
      `mng_${idx}_owner`,
      "  Control owner:",
      y
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "MANAGE-3 \u2014 Incident Response", y);
  y = addWrappedText(
    doc,
    `Human oversight approach: ${ROLE_LABELS[data.oversight.aiRole] || "Not specified"}. Oversight role: ${data.oversight.oversightRole || "Not specified"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const incidentChecks = [
    "Incident detection procedure documented",
    "Incident classification criteria defined",
    "Escalation path documented (who to notify and when)",
    "Containment procedure (how to halt or override the AI system) documented",
    "Post-incident review process established",
    "Lessons learned incorporated into risk management",
  ];
  let cbCount = 0;
  incidentChecks.forEach((check) => {
    y = addFormCheckbox(doc, "mng_incident_" + cbCount, check, y, {
      checked: true,
    });
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "MANAGE-4 \u2014 Risk Monitoring and Communication", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: communicate AI risk status to relevant stakeholders at least quarterly.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "mng_reporting_schedule",
    "Risk reporting schedule and audience:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Manage Function Sign-off", y);
  y = addFormTextField(doc, "manage_owner", "Function Owner:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "manage_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
