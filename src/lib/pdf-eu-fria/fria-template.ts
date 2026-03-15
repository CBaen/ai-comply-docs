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
// DOCUMENT 1: Fundamental Rights Impact Assessment (FRIA)
// EU AI Act Art. 27 — FRIA for high-risk AI systems
// ============================================================
export function generateFriaTemplate(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Fundamental Rights Impact Assessment (FRIA)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Fundamental Rights Impact Assessment (FRIA) is prepared by ${data.company.name} pursuant to Article 27 of Regulation (EU) 2024/1689 (EU AI Act). Article 27 requires deployers of high-risk AI systems to conduct a FRIA before deploying the system and to document the assessment. The six elements below are required by Article 27(1). Complete each section with specificity; generic responses do not satisfy the statutory obligation.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Element 1: Description of deployer's processes using the AI system
  y = addSectionHeader(
    doc,
    "Element 1: Description of Deployer's Processes Using the AI System (Art. 27(1)(a))",
    y
  );
  y = addWrappedText(
    doc,
    "Describe the specific organizational processes, workflows, and decision-making contexts in which the high-risk AI system will be used. Include the operational context, the role of the AI system output in the process, and how human decision-makers interact with the system's outputs.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "fria_proc_ai_system_name", "AI system name and version:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "fria_proc_provider_name", "AI system provider name:", y, {
    width: 140,
  });
  y = addFormTextField(
    doc,
    "fria_proc_description",
    "Description of the process(es) in which the AI system is used:",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "fria_proc_decision_role",
    "Role of AI system output in the decision-making process:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "fria_proc_human_role",
    "How human decision-makers interact with and act upon AI outputs:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Element 2: Period and frequency of intended use
  y = addSectionHeader(
    doc,
    "Element 2: Period and Frequency of Intended Use (Art. 27(1)(b))",
    y
  );
  y = addWrappedText(
    doc,
    "State the intended deployment period (start date and planned end date or ongoing) and the expected frequency of use (e.g., daily, per transaction, per applicant). Include whether use will be continuous, periodic, or event-triggered.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "fria_period_start", "Intended deployment start date:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "fria_period_end", "Intended deployment end date (or 'Ongoing'):", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "fria_period_frequency",
    "Frequency of use (e.g., daily, per transaction, per applicant):",
    y,
    { width: 120 }
  );
  y = addFormTextField(
    doc,
    "fria_period_volume",
    "Expected volume of persons processed per period:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "fria_period_trigger",
    "Is use continuous, periodic, or event-triggered? Describe:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Element 3: Categories of natural persons and groups likely affected
  y = addSectionHeader(
    doc,
    "Element 3: Categories of Natural Persons and Groups Likely Affected (Art. 27(1)(c))",
    y
  );
  y = addWrappedText(
    doc,
    "Identify all categories of natural persons and groups likely to be affected by the AI system's use, including those directly subject to decisions and third parties who may be indirectly affected. Note any groups that may be particularly vulnerable.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "fria_persons_primary",
    "Primary category of persons directly subject to AI-assisted decisions:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "fria_persons_secondary",
    "Secondary/indirectly affected groups (e.g., family members, communities):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addWrappedText(
    doc,
    "Check all categories that may be disproportionately affected or are particularly vulnerable:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const vulnerableGroups = [
    "Minors / children",
    "Elderly persons",
    "Persons with disabilities",
    "Racial or ethnic minorities",
    "Religious minorities",
    "Persons in economically precarious situations",
    "Persons with limited literacy or language access",
    "Asylum seekers / migrants",
    "Other vulnerable group (describe below)",
  ];
  vulnerableGroups.forEach((group, idx) => {
    y = addFormCheckbox(doc, `fria_vuln_${idx}`, group, y);
  });
  y = addFormTextField(
    doc,
    "fria_persons_other",
    "Other affected categories or additional notes:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Element 4: Specific risks of harm to those categories
  y = addSectionHeader(
    doc,
    "Element 4: Specific Risks of Harm to Affected Categories (Art. 27(1)(d))",
    y
  );
  y = addWrappedText(
    doc,
    "For each category of affected persons identified above, describe the specific risks of harm to fundamental rights that may arise from the AI system's use. Consider risks to dignity, non-discrimination, privacy, fair trial rights, and social/economic participation. Assess likelihood and severity.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "fria_risk_discrimination",
    "Risk of discrimination or disparate impact on protected groups (describe and rate likelihood/severity):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "fria_risk_privacy",
    "Risk to privacy and data protection rights (describe and rate likelihood/severity):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "fria_risk_dignity",
    "Risk to human dignity, autonomy, or fair treatment (describe and rate likelihood/severity):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "fria_risk_other",
    "Other fundamental rights risks identified (describe and rate likelihood/severity):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Element 5: Description of human oversight measures
  y = addSectionHeader(
    doc,
    "Element 5: Description of Human Oversight Measures (Art. 27(1)(e))",
    y
  );
  y = addWrappedText(
    doc,
    "Describe the human oversight measures implemented in accordance with Article 26(2) and Article 14. Include who is designated for oversight, what authority they have, and how oversight is exercised in practice. Cross-reference the Human Oversight Implementation Plan if prepared.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "fria_oversight_persons",
    "Name(s) and role(s) of persons designated for human oversight:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "fria_oversight_authority",
    "Authority granted to oversight persons (e.g., override, stop, escalate):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "fria_oversight_training",
    "Training provided to oversight persons (dates, topics, competencies):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "fria_oversight_process",
    "How oversight is exercised in practice (review process, escalation path):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Element 6: Measures for when risks materialize
  y = addSectionHeader(
    doc,
    "Element 6: Measures When Risks Materialize — Internal Governance & Complaint Mechanisms (Art. 27(1)(f))",
    y
  );
  y = addWrappedText(
    doc,
    "Describe the measures in place for when identified risks materialize, including internal governance procedures (escalation, suspension, remediation) and external complaint mechanisms available to affected persons. Include contact information for complaints.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "fria_response_internal",
    "Internal governance response when a risk event occurs (escalation chain, decision to suspend use, remediation steps):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "fria_response_complaint",
    "Complaint mechanism available to affected persons (how to submit, who receives, response timeline):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "fria_response_contact",
    "Contact person / contact information for fundamental rights concerns:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "fria_response_remediation",
    "Remediation measures available to persons harmed (e.g., appeal, correction, compensation):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Signature
  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "fria_sign", y);

  addDisclaimer(doc);
  return doc;
}
