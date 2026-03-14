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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: Human Oversight Design Document
// EU AI Act Art. 14 — Human Oversight
// ============================================================
export function generateHumanOversight(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Human Oversight Design Document", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes the human oversight measures designed into high-risk AI systems operated by ${data.company.name}, as required by Article 14 of Regulation (EU) 2024/1689. Article 14 requires that high-risk AI systems be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which the system is in use. This is a template — complete with your technical and operations teams.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Oversight structure
  y = addSectionHeader(doc, "1. Oversight Structure", y);
  y = addWrappedText(
    doc,
    `Designated oversight role: ${data.oversight.oversightRole || "[Designation required — Art. 14(1)]"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `Current AI decision role: ${ROLE_LABELS[data.oversight.aiRole] || "Not specified"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: Built-in oversight capabilities (Art. 14(4))
  y = addSectionHeader(doc, "2. Built-In Oversight Capabilities (Art. 14(4))", y);
  y = addWrappedText(
    doc,
    "Article 14(4) specifies that human oversight measures must enable the following capabilities. Check those implemented for each system:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const oversightCapabilities = [
    "Fully understand the capabilities and limitations of the AI system (Art. 14(4)(a))",
    "Monitor AI system operation and detect anomalies, dysfunctions, and unexpected performance (Art. 14(4)(b))",
    "Remain aware of automation bias — tendency to over-rely on AI output (Art. 14(4)(c))",
    "Correctly interpret AI system output (interpretability tools provided) (Art. 14(4)(d))",
    "Decide not to use or override the AI output in any particular situation (Art. 14(4)(e))",
    "Intervene in the AI system operation or interrupt it via stop button or similar procedure (Art. 14(4)(f))",
  ];

  let cbCount = 0;
  oversightCapabilities.forEach((cap) => {
    y = addFormCheckbox(doc, "ho_cap_" + cbCount, cap, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 3: System-specific oversight procedures
  y = addSectionHeader(doc, "3. System-Specific Oversight Procedures", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System: ${sys.name} — ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    y = addFormTextField(
      doc,
      `ho_sys_${idx}_procedure`,
      "Oversight procedure for this system:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 4: Override and stop procedures
  y = addSectionHeader(doc, "4. Override and Stop Procedures (Art. 14(4)(e)-(f))", y);
  y = addWrappedText(
    doc,
    "Article 14(4)(e) and (f) require that the designated oversight person be able to override AI output and stop system operation. Document the override process:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const overrideSteps = [
    "Override: Oversight person reviews AI output before any consequential action is taken",
    "Override: Oversight person documents the AI recommendation and their final decision",
    "Override: Rationale for accepting or rejecting AI output is recorded per Art. 12 logging",
    "Stop: System shutdown procedure is documented and accessible to oversight personnel",
    "Stop: Emergency stop capability is tested at least annually",
  ];

  overrideSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, "ho_override_" + idx, step, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Training for oversight personnel
  y = addSectionHeader(doc, "5. Training for Oversight Personnel", y);
  y = addWrappedText(
    doc,
    "Personnel designated to oversee high-risk AI systems must be trained to understand the system's capabilities, limitations, and the risk of automation bias. Document training below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const trainingTopics = [
    "EU AI Act obligations for deployers — Art. 26",
    "System capabilities and known limitations per Technical Documentation",
    "Interpreting AI output and confidence scores",
    "Recognizing automation bias and over-reliance on AI recommendations",
    "Override authority and documentation requirements",
    "Incident reporting obligations (Art. 73)",
  ];

  trainingTopics.forEach((topic, idx) => {
    y = addFormCheckbox(doc, "ho_train_" + idx, topic, y);
  });
  y = addFormTextField(doc, "ho_training_schedule", "Training schedule:", y, { width: 100 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Oversight Design Approval", y);
  y = addFormTextField(doc, "ho_name", "Approved by:", y, { width: 100 });
  y = addFormTextField(doc, "ho_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ho_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
