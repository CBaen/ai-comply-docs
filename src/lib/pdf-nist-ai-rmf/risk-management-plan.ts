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
// DOCUMENT 1: AI Risk Management Plan
// NIST AI RMF 1.0 (NIST AI 100-1) — Govern Function
// ============================================================
export function generateAIRiskManagementPlan(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Risk Management Plan", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This AI Risk Management Plan establishes ${data.company.name}'s approach to managing AI risks in alignment with the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The NIST AI RMF is a voluntary framework \u2014 NIST is a non-regulatory agency. However, the framework is referenced as a compliance standard by Colorado SB 24-205, federal contractor requirements, and enterprise procurement programs. AI RMF 1.0 is currently being revised \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Organizational AI Risk Governance (GOVERN Function)", y);
  y = addWrappedText(
    doc,
    "The NIST AI RMF GOVERN function requires organizations to cultivate and implement AI risk management culture and processes. Document the following governance elements:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const governElements = [
    "AI risk management policy established and documented",
    "Executive sponsor for AI risk management identified",
    "AI risk tolerance levels defined for different use contexts",
    "AI risk management roles and responsibilities assigned",
    "AI risk management integrated into existing risk governance",
    "Mechanisms for stakeholder feedback on AI risks established",
    "AI lifecycle policies covering design through decommissioning documented",
  ];
  let cbCount = 0;
  governElements.forEach((el) => {
    y = addFormCheckbox(doc, "gov_" + cbCount, el, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "AI Risk Tolerance Statement", y);
  y = addFormTextField(
    doc,
    "risk_tolerance",
    "Organization\u2019s AI risk tolerance (describe acceptable and unacceptable risk levels by context):",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "AI Systems in Scope", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Context: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sys_${idx}_risk_level`,
      "  Assigned Risk Level (critical / high / medium / low):",
      y
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "RMF Implementation Responsibilities", y);
  y = addFormTextField(doc, "govern_owner", "GOVERN function owner:", y);
  y = addFormTextField(doc, "map_owner", "MAP function owner:", y);
  y = addFormTextField(doc, "measure_owner", "MEASURE function owner:", y);
  y = addFormTextField(doc, "manage_owner", "MANAGE function owner:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Plan Review Schedule", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: review and update this plan at least annually and when significant new AI systems are deployed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "plan_review_date", "Next Review Date:", y);
  y = addFormTextField(doc, "plan_approved_by", "Approved By:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "plan_approval_date", "Approval Date:", y);

  addDisclaimer(doc);
  return doc;
}
