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
// DOCUMENT 1: Human Oversight Implementation Plan
// EU AI Act Art. 26(2) — Deployer human oversight
// ============================================================
export function generateOversightImplementationPlan(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Human Oversight Implementation Plan (Art. 26(2))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Human Oversight Implementation Plan is prepared by ${data.company.name} pursuant to Article 26(2) of Regulation (EU) 2024/1689 (EU AI Act). Article 26(2) requires deployers to assign human oversight to natural persons who have the necessary competence, authority, and appropriate support. Article 14 defines the human oversight requirements that must be built into high-risk AI systems and implemented by deployers. This plan documents the organizational structure and procedures for human oversight of each high-risk AI system deployed by the organization.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // System identification
  y = addSectionHeader(doc, "1. AI System Identification", y);
  y = addFormTextField(doc, "ovplan_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "ovplan_sys_version", "Version / build:", y, { width: 80 });
  y = addFormTextField(doc, "ovplan_sys_provider", "Provider name:", y, { width: 140 });
  y = addFormTextField(doc, "ovplan_plan_date", "Plan effective date:", y, { width: 80 });
  y += LINE_HEIGHT;

  // Section 1: Designated oversight persons
  y = addSectionHeader(
    doc,
    "2. Designated Oversight Persons (Art. 26(2) — Art. 14)",
    y
  );
  y = addWrappedText(
    doc,
    "For each person designated to perform human oversight of this AI system, complete the fields below. Article 26(2) requires oversight persons to have necessary competence, authority, and support. Add additional rows as needed for each oversight person.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // Person 1
  y = addWrappedText(doc, "Oversight Person 1:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addFormTextField(doc, "ovplan_p1_name", "Name:", y, { width: 140 });
  y = addFormTextField(doc, "ovplan_p1_role", "Role / job title:", y, { width: 120 });
  y = addFormTextField(doc, "ovplan_p1_department", "Department / team:", y, { width: 120 });
  y = addFormTextField(
    doc,
    "ovplan_p1_competence",
    "Relevant competence and qualifications for AI oversight:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_p1_authority",
    "Authority granted (e.g., override outputs, stop system, escalate, approve deployment):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // Person 2
  y = addWrappedText(doc, "Oversight Person 2:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addFormTextField(doc, "ovplan_p2_name", "Name:", y, { width: 140 });
  y = addFormTextField(doc, "ovplan_p2_role", "Role / job title:", y, { width: 120 });
  y = addFormTextField(doc, "ovplan_p2_department", "Department / team:", y, { width: 120 });
  y = addFormTextField(
    doc,
    "ovplan_p2_competence",
    "Relevant competence and qualifications for AI oversight:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_p2_authority",
    "Authority granted:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // Person 3
  y = addWrappedText(doc, "Oversight Person 3 (if applicable):", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 2;
  y = addFormTextField(doc, "ovplan_p3_name", "Name:", y, { width: 140 });
  y = addFormTextField(doc, "ovplan_p3_role", "Role / job title:", y, { width: 120 });
  y = addFormTextField(
    doc,
    "ovplan_p3_authority",
    "Authority granted:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Training completed
  y = addSectionHeader(doc, "3. Training Completed (Art. 26(2))", y);
  y = addWrappedText(
    doc,
    "Document training completed by each oversight person. Article 26(2) requires that assigned persons have the necessary competence, which typically requires specific training on the AI system, its risks, and oversight procedures. Record dates, topics, and format of training.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const trainingTopics = [
    "AI system intended purpose, capabilities, and limitations (from instructions for use)",
    "Interpretation of AI system outputs and confidence indicators",
    "Known sources of bias, error, and failure modes",
    "Fundamental rights risks identified in the FRIA",
    "How to exercise override authority (technical procedure)",
    "How to suspend or stop the AI system",
    "Escalation procedures and contact persons",
    "Incident reporting procedures (Art. 73)",
    "Data protection obligations (GDPR) in the context of AI use",
  ];
  trainingTopics.forEach((topic, idx) => {
    y = addFormCheckbox(doc, `ovplan_train_${idx}`, topic, y);
  });
  y = addFormTextField(
    doc,
    "ovplan_train_other",
    "Other training topics completed:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_train_dates",
    "Training dates by person (Person 1, Person 2, Person 3):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "ovplan_train_format",
    "Training format (in-person, e-learning, on-the-job, vendor-provided):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_train_refresh",
    "Refresh training schedule / trigger for re-training:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Authority to override/stop AI system
  y = addSectionHeader(
    doc,
    "4. Authority to Override or Stop the AI System (Art. 14)",
    y
  );
  y = addWrappedText(
    doc,
    "Article 14 requires that high-risk AI systems be designed and deployed to allow effective human oversight, including the ability to override, ignore, or stop the system. Document the override and stop procedures available to oversight persons.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "ovplan_override_procedure",
    "Procedure for overriding an individual AI system output (step-by-step):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "ovplan_stop_procedure",
    "Procedure for stopping or suspending the AI system entirely (step-by-step):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "ovplan_override_documentation",
    "How override and stop actions are documented (system, form, log):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Decision escalation procedures
  y = addSectionHeader(doc, "5. Decision Escalation Procedures", y);
  y = addWrappedText(
    doc,
    "Describe the escalation path for oversight decisions that exceed the authority of the designated oversight person, or that involve potential serious incidents, fundamental rights concerns, or systemic issues.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "ovplan_esc_level1",
    "Level 1 escalation (direct supervisor / AI system manager — name/role and contact):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_esc_level2",
    "Level 2 escalation (senior leadership / legal / compliance — name/role and contact):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_esc_external",
    "External escalation (AI system provider contact for technical issues):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_esc_criteria",
    "Criteria that trigger escalation to each level:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 5: Documentation of oversight actions
  y = addSectionHeader(doc, "6. Documentation of Oversight Actions", y);
  y = addWrappedText(
    doc,
    "Oversight actions must be documented. Describe how oversight decisions, overrides, and escalations are recorded and where those records are maintained. Records should be retained consistent with the log retention policy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "ovplan_doc_system",
    "System or tool where oversight actions are documented:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ovplan_doc_retention",
    "Retention period for oversight action records:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ovplan_doc_access",
    "Who has access to oversight action records:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "ovplan_sign", y);

  addDisclaimer(doc);
  return doc;
}
