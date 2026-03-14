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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: MANAGE Function Documentation (NIST AI RMF 1.0, AI 100-1)
// ============================================================
export function generateManageDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF \u2014 MANAGE Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document captures ${data.company.name}'s documentation for the MANAGE function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). The MANAGE function allocates risk resources to functions and categories consistent with the organization's risk tolerance as identified through the MAP and MEASURE functions. AI risks are prioritized, responded to, and tracked over time.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // MANAGE 1: Risk Treatment Plans
  y = addSectionHeader(doc, "MANAGE 1: AI Risk Treatment Plans", y);
  y = addWrappedText(
    doc,
    "MANAGE 1 addresses the plans, strategies, and actions taken to respond to AI risks. For each identified risk, document the risk treatment decision:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const riskTreatmentOptions = [
    "Risk Avoidance: Decision not to deploy or discontinue AI system due to unacceptable risk",
    "Risk Mitigation: Implement controls to reduce likelihood or impact of identified risk",
    "Risk Transfer: Contractual, insurance, or other mechanisms to shift risk responsibility",
    "Risk Acceptance: Document rationale for accepting residual risk within organizational risk tolerance",
  ];
  let cbIdx = 0;
  riskTreatmentOptions.forEach((item) => { y = addFormCheckbox(doc, `manage1_${cbIdx++}`, item, y); });
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `Risk Treatment Plan — ${sys.name}:`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `treat_${idx}_risks`, "Top Identified Risks:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `treat_${idx}_response`, "Risk Treatment Decision and Actions:", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, `treat_${idx}_owner`, "Risk Owner:", y, { width: 100 });
    y = addFormTextField(doc, `treat_${idx}_date`, "Target Date:", y, { width: 60 });
    y += 6;
  });

  // MANAGE 2: Response Plan for AI Incidents
  y = addSectionHeader(doc, "MANAGE 2: AI Incident Response and Recovery Plan", y);
  const manage2Items = [
    "AI incident response plan documented and communicated",
    "Incident classification criteria defined (severity levels: critical, high, medium, low)",
    "Incident response team roles and responsibilities defined",
    "AI system suspension/rollback procedures documented",
    "Root cause analysis process established for AI incidents",
    "Lessons learned process feeds back into MAP and GOVERN functions",
    "Affected individual notification procedures defined",
    "Regulatory reporting procedures defined where applicable",
    "AI incident log maintained",
    "Tabletop exercises conducted to test AI incident response plan",
  ];
  manage2Items.forEach((item) => { y = addFormCheckbox(doc, `manage2_${cbIdx++}`, item, y); });
  y = addFormTextField(doc, "manage2_plan_owner", "Incident Response Plan Owner:", y, { width: 120 });
  y += LINE_HEIGHT;

  // MANAGE 3: Residual Risk Communication
  y = addSectionHeader(doc, "MANAGE 3: Residual Risk Communication and Reporting", y);
  const freq = REVIEW_LABELS[data.oversight.reviewFrequency] || "quarterly";
  y = addWrappedText(
    doc,
    `Residual risk is communicated to organizational leadership ${freq.toLowerCase()}. Documentation requirements:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const manage3Items = [
    "Residual risk summary prepared after risk treatment actions implemented",
    "Residual risk reported to senior leadership and board (where applicable)",
    "Risk register maintained with current status of all identified AI risks",
    "Risk register reviewed at defined intervals",
    "Deviations from approved risk tolerance escalated promptly",
    "Residual risk documentation retained for minimum 3 years",
  ];
  manage3Items.forEach((item) => { y = addFormCheckbox(doc, `manage3_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MANAGE 4: Risk Controls Effectiveness
  y = addSectionHeader(doc, "MANAGE 4: Risk Control Effectiveness Evaluation", y);
  const manage4Items = [
    "Risk controls documented for each identified AI risk",
    "Control effectiveness assessed at defined intervals",
    "Control testing results documented",
    "Ineffective controls replaced or supplemented promptly",
    "Control gaps identified through audit or testing escalated to risk owner",
    "Control updates triggered by changes in AI system, regulatory requirements, or threat landscape",
  ];
  manage4Items.forEach((item) => { y = addFormCheckbox(doc, `manage4_${cbIdx++}`, item, y); });
  y += LINE_HEIGHT;

  // MANAGE Risk Register
  y = addSectionHeader(doc, "Risk Register Summary", y);
  y = addWrappedText(
    doc,
    "Complete this summary for the current period. Full risk register should be maintained in a separate tracked document.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "risk_reg_open", "Total Open AI Risks:", y, { width: 60 });
  y = addFormTextField(doc, "risk_reg_critical", "Critical/High Severity Risks:", y, { width: 60 });
  y = addFormTextField(doc, "risk_reg_past_due", "Risks Past Target Remediation Date:", y, { width: 60 });
  y = addFormTextField(doc, "risk_reg_closed", "Risks Closed This Period:", y, { width: 60 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "manage_completed_by", "MANAGE Function Lead:", y, { width: 120 });
  y = addFormTextField(doc, "manage_date", "Documentation Date:", y, { width: 60 });
  y = addFormTextField(doc, "manage_next_review", `Next Review Date (${freq}):`, y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
