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
// CO AG Reporting Kit — Doc 1: Discrimination Discovery Form
// Internal investigation form when algorithmic discrimination is discovered
// Per C.R.S. § 6-1-1703 and Colorado Consumer Protection Act
// ============================================================
export function generateDiscriminationDiscoveryForm(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Algorithmic Discrimination Discovery — Internal Investigation Form",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This form initiates an internal investigation when ${data.company.name} discovers or suspects algorithmic discrimination in an AI system. C.R.S. § 6-1-1703 requires deployers to notify affected consumers and take corrective action when algorithmic discrimination is discovered. The Colorado Attorney General enforces the Colorado Consumer Protection Act (§ 6-1-1706). CONFIDENTIAL — ATTORNEY-CLIENT PRIVILEGE MAY APPLY. Consult legal counsel immediately upon completing this form.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Privilege notice box
  doc.setDrawColor(180, 30, 30);
  doc.setFillColor(255, 245, 245);
  doc.setLineWidth(0.8);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 2, 2, "FD");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 30, 30);
  doc.text("ATTORNEY-CLIENT PRIVILEGE NOTICE", MARGIN + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 30, 30);
  doc.text(
    "This document should be prepared under the direction of legal counsel to maximize privilege protection. Do not distribute outside legal and compliance channels.",
    MARGIN + 4,
    y + 11
  );
  doc.setTextColor(0);
  y += 20;

  // ---- SECTION 1: Discovery Information ----
  y = addSectionHeader(doc, "Section 1: Discovery Information", y);

  y = addFormTextField(doc, "ddf_discovery_date", "Date Discrimination First Discovered or Suspected:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "ddf_discovered_by", "Discovered By (Name / Title / Department):", y);
  y = addFormTextField(doc, "ddf_discovery_method", "How It Was Discovered:", y, {
    multiline: true, lines: 2,
  });

  y = addWrappedText(
    doc,
    "Discovery method category (check all that apply):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const discoveryMethods = [
    "Internal bias audit or testing",
    "Consumer complaint or appeal",
    "Employee report or whistleblower",
    "Vendor / developer notification",
    "Regulatory inquiry or examination",
    "Media report or public disclosure",
    "Routine monitoring and logging review",
    "Third-party assessment",
    "Other (describe below)",
  ];
  discoveryMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `ddf_method_${idx}`, method, y);
  });

  y = addFormTextField(doc, "ddf_method_other", "If 'Other' — describe:", y, {
    multiline: true, lines: 2,
  });

  // ---- SECTION 2: AI System Involved ----
  y = addSectionHeader(doc, "Section 2: AI System Involved", y);

  y = addFormTextField(doc, "ddf_ai_system_name", "AI System Name:", y);
  y = addFormTextField(doc, "ddf_ai_vendor", "Developer / Vendor:", y);
  y = addFormTextField(doc, "ddf_ai_purpose", "System Purpose / Use Case:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "ddf_ai_decisions", "Decision types this system is used for:", y, {
    multiline: true, lines: 2,
  });
  y = addFormTextField(doc, "ddf_ai_deployment_date", "Date Deployed by Company:", y, {
    width: 80,
  });

  // ---- SECTION 3: Nature of Discrimination ----
  y = addSectionHeader(doc, "Section 3: Nature of Discrimination", y);

  y = addFormTextField(
    doc,
    "ddf_discrimination_description",
    "Describe the nature of the potential algorithmic discrimination (what is happening and how it manifests):",
    y,
    { multiline: true, lines: 5 }
  );

  y = addWrappedText(
    doc,
    "Protected characteristics potentially implicated (check all that apply):",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const protectedChars = [
    "Race or color",
    "National origin or ancestry",
    "Sex or gender",
    "Religion",
    "Disability",
    "Age",
    "Sexual orientation",
    "Gender identity or expression",
    "Pregnancy or parental status",
    "Veteran or military status",
    "Other (describe below)",
  ];
  protectedChars.forEach((char, idx) => {
    y = addFormCheckbox(doc, `ddf_char_${idx}`, char, y);
  });

  y = addFormTextField(doc, "ddf_char_other", "If 'Other' — describe:", y, {
    multiline: true, lines: 2,
  });

  // ---- SECTION 4: Affected Population ----
  y = addSectionHeader(doc, "Section 4: Affected Population", y);

  y = addFormTextField(
    doc,
    "ddf_affected_population_desc",
    "Description of affected population (who is affected and how):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "ddf_affected_count",
    "Estimated number of affected individuals (if known):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ddf_affected_period",
    "Time period during which discrimination may have occurred:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddf_affected_decisions",
    "Specific decisions affected (describe):",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 5: Initial Assessment of Scope ----
  y = addSectionHeader(doc, "Section 5: Initial Assessment of Scope", y);

  y = addWrappedText(
    doc,
    "Provide an initial (preliminary) assessment of scope. This will be refined during investigation.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "ddf_scope_severity",
    "Initial severity assessment (minor / moderate / significant / severe — explain):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ddf_scope_systemic",
    "Is the discrimination systemic (built into the model) or isolated? Explain:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ddf_scope_ongoing",
    "Is the discrimination ongoing? Has use of the system been suspended?",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ddf_scope_regulatory",
    "Preliminary assessment of regulatory notification obligations (C.R.S. § 6-1-1703):",
    y,
    { multiline: true, lines: 3 }
  );

  // ---- SECTION 6: Immediate Actions ----
  y = addSectionHeader(doc, "Section 6: Immediate Actions Taken", y);

  y = addWrappedText(
    doc,
    "Check all immediate actions taken upon discovery:",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const immediateActions = [
    "AI system use suspended pending investigation",
    "Legal counsel notified",
    "Compliance / legal team convened",
    "Executive leadership notified",
    "Vendor / developer notified",
    "Incident log created",
    "Evidence preserved (logs, outputs, model artifacts)",
    "Colorado AG 90-day notification clock documented (date started)",
  ];
  immediateActions.forEach((action, idx) => {
    y = addFormCheckbox(doc, `ddf_action_${idx}`, action, y);
  });

  y = addFormTextField(doc, "ddf_ag_notification_deadline", "Colorado AG notification deadline (90 days from discovery date):", y, {
    width: 90,
  });

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "ddf_discovery", y);
  addDisclaimer(doc);
  return doc;
}
