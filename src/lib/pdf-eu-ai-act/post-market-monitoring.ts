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
  DECISION_LABELS,
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 7: Post-Market Monitoring Plan
// EU AI Act Art. 72 — Post-Market Monitoring
// ============================================================
export function generatePostMarketMonitoring(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Post-Market Monitoring Plan", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes the post-market monitoring plan for high-risk AI systems operated by ${data.company.name}, as required by Article 72 of Regulation (EU) 2024/1689. Providers must proactively collect and review experience gained from the use of their high-risk AI systems and update their risk management and technical documentation accordingly. This is a template — complete with your technical, compliance, and legal teams.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Monitoring scope
  y = addSectionHeader(doc, "1. Systems Under Monitoring", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name} (${sys.vendor || "Internal"}) — ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // Section 2: Monitoring objectives (Art. 72(1))
  y = addSectionHeader(doc, "2. Monitoring Objectives (Art. 72(1))", y);
  const objectives = [
    "Verify the AI system continues to perform as intended throughout its lifecycle",
    "Identify and address risks not previously identified in the risk management process",
    "Identify systematic risks, serious incidents, and near-misses",
    "Assess continued compliance with applicable requirements of Regulation (EU) 2024/1689",
    "Update technical documentation and risk management system based on findings",
  ];

  let cbCount = 0;
  objectives.forEach((obj) => {
    y = addFormCheckbox(doc, "pmm_obj_" + cbCount, obj, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 3: Monitoring activities
  y = addSectionHeader(doc, "3. Monitoring Activities and Frequency", y);
  y = addWrappedText(
    doc,
    `Current review frequency: ${REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified — Art. 72 requires proactive collection of experience"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const activities = [
    "Performance monitoring: review system accuracy and output quality metrics",
    "Bias monitoring: test for disparate impact on protected groups (Art. 10 data governance)",
    "Incident log review: examine automatic event logs (Art. 12) for anomalies",
    "User/deployer feedback collection: gather structured feedback from deployers",
    "External signals review: monitor regulatory publications, technical literature, peer incidents",
    "Model drift detection: assess whether system performance has degraded over time",
  ];

  activities.forEach((act, idx) => {
    y = addFormCheckbox(doc, "pmm_act_" + idx, act, y);
  });
  y += 4;
  y = addFormTextField(doc, "pmm_schedule", "Monitoring schedule (describe frequency and calendar):", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Section 4: Serious incident reporting (Art. 73)
  y = addSectionHeader(doc, "4. Serious Incident Reporting (Art. 73)", y);
  y = addWrappedText(
    doc,
    "Article 73 requires providers to report serious incidents to national market surveillance authorities. A serious incident is any incident that results in death, serious harm to health, serious disruption to critical infrastructure, or infringement of fundamental rights. Document the reporting procedure below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const reportingSteps = [
    "Incident classification: distinguish serious incident from non-serious malfunction",
    "Immediate containment: steps taken to prevent further harm",
    "National authority notification: as soon as possible after becoming aware",
    "Incident report submission: within required timeframe after notification",
    "Root cause analysis: conducted and documented",
    "Corrective action: implemented and verified effective",
    "Technical documentation updated to reflect findings",
  ];

  reportingSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, "pmm_rep_" + idx, step, y);
  });
  y += 4;
  y = addFormTextField(doc, "pmm_authority", "Relevant national market surveillance authority:", y, { width: 140 });
  y = addFormTextField(doc, "pmm_contact_authority", "Authority contact / reporting portal:", y, { width: 140 });
  y += LINE_HEIGHT;

  // Section 5: Corrective action process (Art. 20)
  y = addSectionHeader(doc, "5. Corrective Actions and Document Updates (Art. 20)", y);
  y = addWrappedText(
    doc,
    "Article 20 requires providers to take corrective actions when a system does not conform to requirements, and to inform distributors and deployers accordingly. Document the corrective action process:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const correctiveSteps = [
    "Non-conformity identified and documented",
    "Root cause analysis completed",
    "Corrective measure designed, tested, and verified",
    "Technical documentation updated",
    "Deployers informed of the non-conformity and corrective action",
    "Competent authorities notified where required (Art. 20(2))",
  ];

  correctiveSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, "pmm_corr_" + idx, step, y);
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Monitoring Plan Sign-off", y);
  y = addFormTextField(doc, "pmm_responsible", "Monitoring plan owner:", y, { width: 120 });
  y = addFormTextField(doc, "pmm_name", "Approved by:", y, { width: 100 });
  y = addFormTextField(doc, "pmm_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "pmm_next_review", "Next plan review date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "eu_postmarket", y);

  addDisclaimer(doc);
  return doc;
}
