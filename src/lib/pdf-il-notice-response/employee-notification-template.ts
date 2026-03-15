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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// IL Notice & Response Kit — Doc 1: Employee Notification Template
// Per 775 ILCS 5/2-102(L)(2) — configurable notice to employees
// ============================================================
export function generateEmployeeNotificationTemplate(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Employee AI Use Notification",
    data
  );
  y = addTopDisclaimer(doc, y);

  // Intro paragraph
  y = addWrappedText(
    doc,
    `This notice is provided to employees of ${data.company.name} pursuant to 775 ILCS 5/2-102(L)(2) of the Illinois Human Rights Act. Complete each section for your organization's specific AI systems and employment decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Notification Header ----
  y = addSectionHeader(doc, "Section 1: Employer Information", y);

  y = addFormTextField(doc, "ent_company_name", "Employer / Company Name:", y, {
    prefill: data.company.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "ent_address", "Employer Address:", y);
  y = addFormTextField(doc, "ent_notice_date", "Date of This Notice:", y, {
    prefill: data.generatedDate,
  });
  y = addFormTextField(
    doc,
    "ent_notice_type",
    "Notice Type (check one — Annual / New System / Update):",
    y
  );

  // ---- SECTION 2: AI Systems Used ----
  y = addSectionHeader(
    doc,
    "Section 2: AI Systems Used in Employment Decisions",
    y
  );

  y = addWrappedText(
    doc,
    "List each AI system used to make, facilitate, or inform employment decisions. Add rows as needed. Attach technical documentation from each vendor.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const aiSystemCount = Math.max(data.aiSystems.length, 3);
  for (let i = 0; i < aiSystemCount; i++) {
    const sys = data.aiSystems[i];
    const prefix = `ent_sys${i + 1}`;
    y = addFormTextField(doc, `${prefix}_name`, `System ${i + 1} — AI System Name:`, y, {
      prefill: sys?.name || "",
    });
    y = addFormTextField(doc, `${prefix}_vendor`, "Vendor / Developer:", y, {
      prefill: sys?.vendor || "",
    });
    y = addFormTextField(doc, `${prefix}_purpose`, "Purpose / Description:", y, {
      prefill: sys?.description || "",
      multiline: true,
      lines: 2,
    });
    y += 2;
  }

  // ---- SECTION 3: Employment Decisions Covered ----
  y = addSectionHeader(
    doc,
    "Section 3: Employment Decisions Where AI Is Used",
    y
  );

  y = addWrappedText(
    doc,
    "Check all employment decisions where artificial intelligence is used to make, facilitate, screen, or inform decisions. Per 775 ILCS 5/2-102(L)(1).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const decisionKeys = [
    "recruitment",
    "hiring",
    "promotion",
    "renewal",
    "training",
    "discharge",
    "discipline",
    "tenure",
    "terms",
  ];
  decisionKeys.forEach((key, idx) => {
    const isSelected = data.aiSystems.some((s) => s.decisions.includes(key));
    y = addFormCheckbox(
      doc,
      `ent_decision_${idx}`,
      DECISION_LABELS[key] || key,
      y,
      { checked: isSelected }
    );
  });
  y += 2;

  y = addFormTextField(
    doc,
    "ent_decision_other",
    "Other decisions (describe):",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 4: Employee Contact ----
  y = addSectionHeader(
    doc,
    "Section 4: Employee Contact for AI Questions",
    y
  );

  y = addWrappedText(
    doc,
    "Employees with questions about how AI systems are used in employment decisions may contact the following person. This contact must be able to answer questions about AI use per 775 ILCS 5/2-102(L)(2).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(doc, "ent_contact_name", "Contact Name:", y, {
    prefill: data.contact.name,
  });
  y = addFormTextField(doc, "ent_contact_title", "Contact Title / Role:", y, {
    prefill: data.contact.title,
  });
  y = addFormTextField(doc, "ent_contact_email", "Email Address:", y, {
    prefill: data.contact.email,
  });
  y = addFormTextField(doc, "ent_contact_phone", "Phone Number:", y, {
    prefill: data.contact.phone,
  });
  y = addFormTextField(
    doc,
    "ent_contact_hours",
    "Available Hours / Response Time Commitment:",
    y
  );

  // ---- SECTION 5: Accommodation ----
  y = addSectionHeader(
    doc,
    "Section 5: Reasonable Accommodation Notice",
    y
  );

  y = addWrappedText(
    doc,
    "Employees who believe an AI system has adversely impacted an employment decision due to a disability or other protected characteristic may request a reasonable accommodation or human review of the decision. To make this request, contact the person listed in Section 4 above. Requests will be reviewed in accordance with 775 ILCS 5/2-102(B).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 6: Anti-Discrimination Statement ----
  y = addSectionHeader(
    doc,
    "Section 6: Anti-Discrimination Statement",
    y
  );

  y = addWrappedText(
    doc,
    `${data.company.name} is committed to ensuring that no AI system used in employment decisions has a discriminatory effect on the basis of race, color, national origin, sex, religion, disability, sexual orientation, or any other characteristic protected by the Illinois Human Rights Act (775 ILCS 5/2-102(L)(1)). Zip codes and other geographic data are not used as proxies for protected characteristics.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "ent_add_statement",
    "Additional anti-discrimination statement (optional):",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "ent_notice", y);
  addDisclaimer(doc);
  return doc;
}
