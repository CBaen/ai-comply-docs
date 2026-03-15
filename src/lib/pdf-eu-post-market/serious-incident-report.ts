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
// DOCUMENT 2: Serious Incident Report
// EU AI Act Art. 73 — Serious incident reporting
// ============================================================
export function generateSeriousIncidentReport(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Serious Incident Report (Art. 73)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Serious Incident Report is prepared by ${data.company.name} pursuant to Article 73 of Regulation (EU) 2024/1689 (EU AI Act). Article 73 requires providers of high-risk AI systems to report serious incidents — defined as incidents or malfunctions leading to death, serious harm to health, serious damage to property, or serious and irreversible disruption of essential services — to the market surveillance authority. Deployers who become aware of serious incidents must notify the provider without undue delay (Art. 73(5)). Complete all applicable sections and retain a copy. This template is for internal documentation and as a basis for regulatory submissions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Incident classification
  y = addSectionHeader(doc, "1. Incident Classification (Art. 73)", y);
  y = addWrappedText(
    doc,
    "Determine whether this event meets the Article 73 definition of a 'serious incident.' Check the category that applies:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const incidentCategories = [
    "Death of a person — caused or contributed to by the AI system",
    "Serious injury to a person — caused or contributed to by the AI system",
    "Serious damage to property or environment — caused or contributed to by the AI system",
    "Serious and irreversible disruption of essential infrastructure or services",
    "Breach of obligations for protection of fundamental rights (Art. 73(1)(d))",
    "Potential serious incident — under investigation (not yet confirmed)",
    "Malfunction that could have resulted in a serious incident (near-miss)",
  ];
  incidentCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, `incirpt_class_${idx}`, cat, y);
  });
  y += LINE_HEIGHT;

  // Section 2: Incident date and AI system identification
  y = addSectionHeader(doc, "2. Incident Date and AI System Identification", y);
  y = addFormTextField(doc, "incirpt_date_occurred", "Date incident occurred:", y, { width: 80 });
  y = addFormTextField(doc, "incirpt_date_discovered", "Date incident discovered:", y, { width: 80 });
  y = addFormTextField(doc, "incirpt_date_reported", "Date of this report:", y, { width: 80 });
  y = addFormTextField(doc, "incirpt_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "incirpt_sys_version", "AI system version / build:", y, { width: 80 });
  y = addFormTextField(doc, "incirpt_sys_provider", "AI system provider name:", y, { width: 140 });
  y = addFormTextField(doc, "incirpt_sys_eu_db_id", "EU AI database registration ID:", y, { width: 120 });
  y = addFormTextField(doc, "incirpt_sys_intended_purpose", "Intended purpose for which system was deployed:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // Section 3: Nature of incident
  y = addSectionHeader(doc, "3. Nature of the Incident", y);
  y = addWrappedText(
    doc,
    "Describe what happened. Include the AI system behavior observed, the operational context, and the sequence of events. Be specific — regulatory submissions require factual accuracy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "incirpt_nature_description",
    "Description of the incident (what occurred, when, where, how):",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "incirpt_nature_ai_behavior",
    "AI system behavior that caused or contributed to the incident:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "incirpt_nature_contributing",
    "Contributing factors (human, technical, environmental):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "incirpt_nature_ongoing",
    "Is the risk ongoing? Describe current status:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Persons affected
  y = addSectionHeader(doc, "4. Persons Affected", y);
  y = addFormTextField(
    doc,
    "incirpt_persons_count",
    "Number of persons affected (or estimated range):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "incirpt_persons_categories",
    "Categories of affected persons (general description — do not include personal data in this field):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "incirpt_persons_harm",
    "Nature and severity of harm to each category:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addWrappedText(
    doc,
    "Note: Do not record personal data (names, identifiers) of affected individuals in this publicly-shareable template. Maintain a separate confidential record as required.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 5: Immediate actions taken
  y = addSectionHeader(doc, "5. Immediate Actions Taken", y);
  y = addWrappedText(
    doc,
    "Document all immediate actions taken upon discovery of the incident, including any suspension of the AI system, emergency notifications, and protective measures for affected persons.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "incirpt_action_immediate",
    "Immediate actions taken (list with dates and responsible persons):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormCheckbox(
    doc,
    "incirpt_action_suspended",
    "AI system use suspended pending investigation",
    y
  );
  y = addFormCheckbox(
    doc,
    "incirpt_action_not_suspended",
    "AI system use continued — justification documented separately",
    y
  );
  y = addFormTextField(
    doc,
    "incirpt_action_remediation",
    "Remediation measures taken or planned for affected persons:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 6: Notification cascade
  y = addSectionHeader(doc, "6. Notification Cascade (Art. 73)", y);
  y = addWrappedText(
    doc,
    "Article 73 establishes a notification cascade. Document each notification. Timeline requirements: providers must notify without undue delay after becoming aware; deployers must notify providers without undue delay (Art. 73(5)). Check each notification made and record date.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // Provider notification
  y = addFormCheckbox(
    doc,
    "incirpt_notif_provider_done",
    "PROVIDER NOTIFIED — Deployer has notified AI system provider per Art. 73(5)",
    y
  );
  y = addFormTextField(doc, "incirpt_notif_provider_date", "Provider notification date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "incirpt_notif_provider_contact",
    "Provider contact notified (name, role, email):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "incirpt_notif_provider_method",
    "Method of notification (email, portal, phone, written):",
    y,
    { width: 120 }
  );
  y += 4;

  // Market surveillance authority notification
  y = addFormCheckbox(
    doc,
    "incirpt_notif_auth_done",
    "MARKET SURVEILLANCE AUTHORITY NOTIFIED — Provider has notified competent authority per Art. 73",
    y
  );
  y = addFormTextField(doc, "incirpt_notif_auth_name", "Authority name:", y, { width: 150 });
  y = addFormTextField(doc, "incirpt_notif_auth_date", "Authority notification date:", y, { width: 80 });
  y = addFormTextField(doc, "incirpt_notif_auth_ref", "Authority reference / case number:", y, { width: 120 });
  y += 4;

  // Importer/distributor notification
  y = addFormCheckbox(
    doc,
    "incirpt_notif_import_applicable",
    "IMPORTER / DISTRIBUTOR NOTIFICATION — Applicable to this incident",
    y
  );
  y = addFormTextField(
    doc,
    "incirpt_notif_import_details",
    "Importer/distributor notified (name, date, method):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 7: Root cause and corrective actions
  y = addSectionHeader(doc, "7. Root Cause Analysis and Corrective Actions", y);
  y = addFormTextField(
    doc,
    "incirpt_rca",
    "Root cause analysis summary (or reference to separate RCA document):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "incirpt_corrective",
    "Corrective actions taken or planned (with dates and responsible persons):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "incirpt_preventive",
    "Preventive measures to avoid recurrence:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "incirpt_sign", y);

  addDisclaimer(doc);
  return doc;
}
