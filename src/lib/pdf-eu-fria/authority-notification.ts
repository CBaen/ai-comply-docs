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
// DOCUMENT 2: Market Surveillance Authority Notification
// EU AI Act Art. 27(3) — Notification obligation
// ============================================================
export function generateAuthorityNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Market Surveillance Authority Notification (Art. 27(3))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports the notification obligation under Article 27(3) of Regulation (EU) 2024/1689 (EU AI Act). Article 27(3) requires certain deployers — including public bodies and deployers of high-risk AI systems used in certain contexts — to notify the relevant market surveillance authority upon completing a Fundamental Rights Impact Assessment (FRIA). Complete all sections and retain a copy. Consult your Member State's market surveillance authority for submission procedures and any applicable national implementing measures.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Notification obligation applicability
  y = addSectionHeader(doc, "1. Notification Obligation — Applicability Check (Art. 27(3))", y);
  y = addWrappedText(
    doc,
    "Article 27(3) notification applies to deployers that are public bodies, and to deployers of high-risk AI systems in certain Annex III categories where Member State law or the Regulation requires notification. Check applicable basis for notification:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const notificationBases = [
    "Deployer is a public body (government entity, public authority) — Art. 27(3) applies directly",
    "Deployer is subject to Member State notification requirement implementing Art. 27(3)",
    "Deployer is voluntarily notifying as a best practice / governance measure",
    "Deployer has been directed to notify by the competent market surveillance authority",
  ];
  notificationBases.forEach((basis, idx) => {
    y = addFormCheckbox(doc, `authnotif_basis_${idx}`, basis, y);
  });
  y += LINE_HEIGHT;

  // Section 2: Deployer organization details
  y = addSectionHeader(doc, "2. Deployer Organization Details", y);
  y = addFormTextField(doc, "authnotif_org_name", "Organization legal name:", y, { width: 150 });
  y = addFormTextField(doc, "authnotif_org_type", "Organization type (public body, private entity, other):", y, {
    width: 120,
  });
  y = addFormTextField(doc, "authnotif_org_address", "Registered address:", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "authnotif_org_country", "Member State of establishment:", y, {
    width: 100,
  });
  y = addFormTextField(doc, "authnotif_org_reg_number", "Organization registration number (where applicable):", y, {
    width: 100,
  });
  y = addFormTextField(doc, "authnotif_contact_name", "Contact person name:", y, { width: 120 });
  y = addFormTextField(doc, "authnotif_contact_title", "Contact person title/role:", y, { width: 120 });
  y = addFormTextField(doc, "authnotif_contact_email", "Contact person email:", y, { width: 140 });
  y = addFormTextField(doc, "authnotif_contact_phone", "Contact person telephone:", y, { width: 100 });
  y += LINE_HEIGHT;

  // Section 3: AI system identification
  y = addSectionHeader(doc, "3. AI System Identification", y);
  y = addWrappedText(
    doc,
    "Identify the high-risk AI system that is the subject of this notification. This information must match the EU database registration and the FRIA completed under Article 27.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "authnotif_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "authnotif_sys_version", "AI system version / build:", y, { width: 80 });
  y = addFormTextField(doc, "authnotif_sys_provider", "AI system provider (manufacturer) name:", y, {
    width: 140,
  });
  y = addFormTextField(
    doc,
    "authnotif_sys_provider_address",
    "AI system provider registered address / EU authorized representative:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "authnotif_sys_eu_db_id", "EU AI database registration ID (if available):", y, {
    width: 120,
  });
  y = addFormTextField(
    doc,
    "authnotif_sys_annex_category",
    "Annex III category applicable to this AI system:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "authnotif_sys_intended_purpose",
    "Intended purpose of the AI system as described by the provider:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 4: FRIA summary results
  y = addSectionHeader(doc, "4. FRIA Summary Results", y);
  y = addWrappedText(
    doc,
    "Provide a summary of the Fundamental Rights Impact Assessment completed under Article 27. This summary accompanies the notification. The full FRIA document should be retained internally and made available to the authority upon request.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "authnotif_fria_date", "Date FRIA completed:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "authnotif_fria_affected_persons",
    "Summary of categories of affected persons identified in FRIA:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "authnotif_fria_risks",
    "Summary of fundamental rights risks identified in FRIA:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "authnotif_fria_mitigations",
    "Summary of mitigation and oversight measures implemented:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "authnotif_fria_conclusion",
    "Overall FRIA conclusion (acceptable residual risk / deployment approved / deployment deferred):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Deployment dates
  y = addSectionHeader(doc, "5. Deployment Information", y);
  y = addFormTextField(doc, "authnotif_deploy_date", "Date of first deployment or intended deployment date:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "authnotif_deploy_member_states",
    "Member State(s) where the AI system is or will be deployed:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "authnotif_deploy_context",
    "Operational context (sector, environment, population served):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 6: Receiving authority details
  y = addSectionHeader(doc, "6. Receiving Market Surveillance Authority", y);
  y = addWrappedText(
    doc,
    "Identify the competent market surveillance authority designated by the Member State under Article 74 of Regulation (EU) 2024/1689. Contact your national authority for current submission procedures.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "authnotif_auth_name", "Authority name:", y, { width: 150 });
  y = addFormTextField(doc, "authnotif_auth_member_state", "Member State:", y, { width: 80 });
  y = addFormTextField(doc, "authnotif_auth_submission_ref", "Submission reference / case number (if assigned):", y, {
    width: 120,
  });
  y = addFormTextField(doc, "authnotif_auth_submission_date", "Date of notification submission:", y, { width: 80 });
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "authnotif_sign", y);

  addDisclaimer(doc);
  return doc;
}
