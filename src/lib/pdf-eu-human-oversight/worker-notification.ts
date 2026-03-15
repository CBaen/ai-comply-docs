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
// DOCUMENT 2: Worker / Works Council Notification
// EU AI Act Art. 26(7) — Notification before deployment
// ============================================================
export function generateWorkerNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Worker Notification — High-Risk AI System Deployment (Art. 26(7))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This notification is issued by ${data.company.name} pursuant to Article 26(7) of Regulation (EU) 2024/1689 (EU AI Act). Article 26(7) requires deployers to inform workers and their representatives (works council or equivalent body) before deploying a high-risk AI system that will affect them, to the extent required by applicable Union and Member State law, including worker information and consultation rights. This notification must be provided BEFORE deployment begins. Retain a copy of this notification and evidence of delivery.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Notification details
  y = addSectionHeader(doc, "1. Notification Details", y);
  y = addFormTextField(doc, "wrknotif_issuer_name", "Issuing organization name:", y, { width: 150 });
  y = addFormTextField(doc, "wrknotif_issuer_address", "Organization address:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "wrknotif_notif_date", "Date of this notification:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "wrknotif_recipients",
    "Recipients (workers / works council / employee representatives — general description):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "wrknotif_hr_contact", "HR or people operations contact for questions:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // Section 2: AI system name and purpose
  y = addSectionHeader(doc, "2. AI System Name and Purpose", y);
  y = addWrappedText(
    doc,
    "Workers are entitled to understand what AI system is being deployed and why. Provide a plain-language description of the AI system and its intended purpose as it relates to workers.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "wrknotif_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "wrknotif_sys_vendor", "AI system developer / vendor:", y, { width: 140 });
  y = addFormTextField(
    doc,
    "wrknotif_sys_purpose",
    "Plain-language description of the AI system's intended purpose:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "wrknotif_sys_function",
    "How the AI system works in general terms (without requiring technical knowledge):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 3: What decisions it influences
  y = addSectionHeader(doc, "3. What Decisions the AI System Influences", y);
  y = addWrappedText(
    doc,
    "Article 26(7) requires workers to be informed of the nature of AI use that affects them. Describe what decisions the AI system will influence and the degree to which those decisions affect workers' conditions, assessment, or opportunities.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const decisionTypes = [
    "Recruitment or hiring decisions",
    "Performance assessment or evaluation",
    "Task allocation or scheduling",
    "Monitoring of work performance or attendance",
    "Training or development recommendations",
    "Promotion or advancement decisions",
    "Discipline or termination decisions",
    "Compensation or benefits decisions",
    "Access to tools, systems, or facilities",
    "Other decisions (describe below)",
  ];
  decisionTypes.forEach((dtype, idx) => {
    y = addFormCheckbox(doc, `wrknotif_dec_${idx}`, dtype, y);
  });
  y = addFormTextField(
    doc,
    "wrknotif_dec_other",
    "Other decision types or additional context:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "wrknotif_dec_human_role",
    "Role of human decision-maker relative to AI outputs (sole decision, primary input, advisory, screening):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: When deployment begins
  y = addSectionHeader(doc, "4. Deployment Timeline", y);
  y = addWrappedText(
    doc,
    "Workers must receive notification before deployment. State the planned deployment date and the departments or roles affected.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "wrknotif_deploy_date", "Planned deployment date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "wrknotif_deploy_scope",
    "Departments, teams, or roles affected by deployment:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "wrknotif_deploy_phased",
    "Phased rollout details (if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Worker rights
  y = addSectionHeader(doc, "5. Worker Rights", y);
  y = addWrappedText(
    doc,
    "Inform workers of their rights in connection with the AI system's use. Workers may have rights under EU AI Act, GDPR, national labor law, and works council agreements.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const workerRights = [
    "Right to be informed of AI-assisted decisions that significantly affect you",
    "Right to seek explanation of individual AI-assisted decisions (where applicable under national law)",
    "Right to human review of significant AI-assisted decisions (where applicable)",
    "Right to contest AI-assisted decisions through the organization's complaint process",
    "Right to GDPR data access, correction, and deletion for personal data used by the AI system",
    "Works council / employee representative consultation rights under applicable national law",
    "Right to a safe working environment not compromised by AI system errors",
  ];
  workerRights.forEach((right, idx) => {
    y = addFormCheckbox(doc, `wrknotif_right_${idx}`, right, y);
  });
  y = addFormTextField(
    doc,
    "wrknotif_rights_additional",
    "Additional rights under applicable Member State law or collective agreement:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 6: Contact for questions
  y = addSectionHeader(doc, "6. Contact for Questions and Concerns", y);
  y = addWrappedText(
    doc,
    "Workers must know where to direct questions, requests for explanation, and complaints. Provide clear contact information below.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "wrknotif_contact_name", "Primary contact name and title:", y, { width: 140 });
  y = addFormTextField(doc, "wrknotif_contact_email", "Email address:", y, { width: 140 });
  y = addFormTextField(doc, "wrknotif_contact_phone", "Telephone:", y, { width: 100 });
  y = addFormTextField(
    doc,
    "wrknotif_complaint_process",
    "How to submit a formal complaint or request human review of an AI-assisted decision:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "wrknotif_dpo_contact",
    "Data Protection Officer contact (for GDPR-related questions):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Delivery confirmation (for issuer's records)
  y = addSectionHeader(doc, "7. Delivery Confirmation (Issuer Record — Do Not Distribute to Workers)", y);
  y = addFormTextField(doc, "wrknotif_delivery_method", "Method of delivery (email, posted notice, works council meeting, etc.):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "wrknotif_delivery_date", "Date of delivery:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "wrknotif_works_council_consult",
    "Works council / employee representative consultation date (if separate from notification):",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "wrknotif_works_council_outcome",
    "Works council consultation outcome or opinion (if applicable):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "wrknotif_sign", y);

  addDisclaimer(doc);
  return doc;
}
