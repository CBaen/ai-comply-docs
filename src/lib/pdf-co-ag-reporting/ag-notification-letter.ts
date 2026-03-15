import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CO AG Reporting Kit — Doc 2: AG Notification Letter
// 90-day notification to Colorado Attorney General
// Per C.R.S. § 6-1-1703 and Colorado Consumer Protection Act
// ============================================================
export function generateAgNotificationLetter(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Colorado AG Notification — Algorithmic Discrimination",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template prepares a notification to the Colorado Attorney General regarding the discovery of potential algorithmic discrimination in an AI system deployed by ${data.company.name}. C.R.S. § 6-1-1703 requires deployers to notify affected consumers and take corrective action. The Colorado AG has exclusive enforcement authority under the Colorado Consumer Protection Act (§ 6-1-1706). Consult legal counsel before submitting this letter.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Company Information ----
  y = addSectionHeader(doc, "Section 1: Company / Deployer Information", y);

  y = addFormTextField(doc, "anl_company_name", "Legal Entity Name:", y, {
    prefill: data.company.name,
  });
  y = addFormTextField(doc, "anl_company_address", "Principal Place of Business (Street, City, State, ZIP):", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "anl_company_state", "State of Incorporation / Formation:", y, {
    prefill: data.company.state,
    width: 80,
  });
  y = addFormTextField(doc, "anl_company_industry", "Industry:", y, {
    prefill: data.company.industry,
    width: 100,
  });
  y = addFormTextField(doc, "anl_contact_name", "Primary Contact Name:", y, {
    prefill: data.contact.name,
  });
  y = addFormTextField(doc, "anl_contact_title", "Primary Contact Title:", y, {
    prefill: data.contact.title,
  });
  y = addFormTextField(doc, "anl_contact_email", "Primary Contact Email:", y, {
    prefill: data.contact.email,
  });
  y = addFormTextField(doc, "anl_contact_phone", "Primary Contact Phone:", y, {
    prefill: data.contact.phone,
  });
  y = addFormTextField(doc, "anl_legal_counsel", "Legal Counsel Name / Firm (if different from primary contact):", y);
  y = addFormTextField(doc, "anl_letter_date", "Letter Date:", y, {
    prefill: data.generatedDate, width: 80,
  });

  // ---- SECTION 2: AI System Description ----
  y = addSectionHeader(doc, "Section 2: AI System Description", y);

  y = addFormTextField(doc, "anl_ai_system_name", "AI System Name:", y);
  y = addFormTextField(doc, "anl_ai_vendor", "Developer / Vendor:", y);
  y = addFormTextField(doc, "anl_ai_purpose", "System Purpose and Intended Use:", y, {
    multiline: true, lines: 3,
  });
  y = addFormTextField(doc, "anl_ai_deployment_date", "Date Deployed:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "anl_ai_use_context", "Context in which the system is used (decisions made, populations affected):", y, {
    multiline: true, lines: 3,
  });
  y = addFormTextField(doc, "anl_colorado_consumers", "Estimated number of Colorado consumers affected by this AI system:", y, {
    width: 80,
  });

  // ---- SECTION 3: Nature of Discrimination ----
  y = addSectionHeader(doc, "Section 3: Nature of Potential Discrimination", y);

  y = addFormTextField(
    doc,
    "anl_discrimination_desc",
    "Description of the potential algorithmic discrimination (what was discovered and how):",
    y,
    { multiline: true, lines: 5 }
  );

  y = addWrappedText(
    doc,
    "Protected characteristics potentially implicated (check all that apply):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const chars = [
    "Race or color",
    "National origin or ancestry",
    "Sex or gender",
    "Religion",
    "Disability",
    "Age",
    "Sexual orientation",
    "Gender identity or expression",
    "Other",
  ];
  chars.forEach((char, idx) => {
    y = addFormCheckbox(doc, `anl_char_${idx}`, char, y);
  });

  y = addFormTextField(doc, "anl_char_other_desc", "If 'Other' — describe:", y, {
    multiline: true, lines: 2,
  });

  // ---- SECTION 4: Date Discovered & Populations Affected ----
  y = addSectionHeader(doc, "Section 4: Discovery Date and Affected Populations", y);

  y = addFormTextField(doc, "anl_discovery_date", "Date Discrimination Was Discovered:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "anl_notification_date", "Date of This Notification:", y, {
    prefill: data.generatedDate, width: 80,
  });
  y = addWrappedText(
    doc,
    "IMPORTANT — Developer vs. Deployer Trigger Distinction: The 90-day notification obligation differs by role. A DEVELOPER must notify under § 6-1-1702(5) if the AI system 'caused or is reasonably likely to have caused' algorithmic discrimination — this is a BROADER trigger that includes prospective/likely harm. A DEPLOYER must notify under § 6-1-1703(7) if the AI system 'has caused' algorithmic discrimination — this is a NARROWER trigger requiring actual causation. Both are subject to 'without unreasonable delay but no later than ninety days' from discovery. Identify the applicable role and trigger below.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, "anl_role_developer", "We are the DEVELOPER — trigger: system caused or is reasonably likely to have caused discrimination (§ 6-1-1702(5), broader standard)", y);
  y = addFormCheckbox(doc, "anl_role_deployer", "We are the DEPLOYER — trigger: system has caused discrimination (§ 6-1-1703(7), narrower standard requiring actual causation)", y);
  y += 4;

  y = addFormTextField(doc, "anl_days_since_discovery", "Days Elapsed Since Discovery (must be within 90 days — statutory obligation under C.R.S. § 6-1-1702(5) / § 6-1-1703(7)):", y, {
    width: 60,
  });
  y = addFormTextField(
    doc,
    "anl_affected_population",
    "Populations affected (describe demographics, geography, and estimated number):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "anl_affected_period",
    "Time period during which discrimination may have affected consumers:",
    y,
    { width: 100 }
  );

  // ---- SECTION 5: Remediation Steps Taken ----
  y = addSectionHeader(doc, "Section 5: Remediation Steps Taken", y);

  y = addWrappedText(
    doc,
    "Check all remediation steps that have been completed as of the date of this letter:",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const remSteps = [
    "AI system use suspended",
    "Affected consumers notified",
    "Internal investigation completed",
    "Root cause identified",
    "Technical fix implemented",
    "Model retrained",
    "Third-party audit completed",
    "Corrective action plan adopted",
    "Legal counsel review completed",
  ];
  remSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, `anl_rem_${idx}`, step, y);
  });

  y = addFormTextField(
    doc,
    "anl_remediation_detail",
    "Detailed description of remediation steps taken and steps planned:",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "anl_remediation_timeline",
    "Timeline for complete remediation:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 6: Colorado Consumer Protection Act Reference ----
  y = addSectionHeader(doc, "Section 6: Regulatory Reference", y);

  y = addWrappedText(
    doc,
    "This notification is submitted in reference to C.R.S. §§ 6-1-1701 through 6-1-1707 (Consumer Protections for AI, SB 24-205, effective June 30, 2026). The Colorado Attorney General has exclusive enforcement authority under the Colorado Consumer Protection Act (§ 6-1-1706). This letter is provided voluntarily and does not constitute an admission of liability.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "anl_attachments",
    "Attachments to this notification (list all):",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "anl_ag_letter", y);
  addDisclaimer(doc);
  return doc;
}
