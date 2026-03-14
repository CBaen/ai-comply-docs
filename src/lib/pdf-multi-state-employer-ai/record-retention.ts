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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: Multi-State Record Retention Policy
// IL HB3773 + NYC LL144 + CO SB24-205
// ============================================================
export function generateRecordRetentionPolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Multi-State Record Retention Policy", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Record Retention Policy governs the retention of AI compliance records for ${data.company.name} under Illinois HB3773 (775 ILCS 5/2-102(L)), NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874), and Colorado SB24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707). Retain records in a format accessible for regulatory review. This policy sets minimum retention periods; your legal counsel may recommend longer periods based on your organization\u2019s litigation exposure.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Record Retention Schedule", y);

  const retentionItems = [
    {
      category: "Employee/Applicant AI Notifications (IL 775 ILCS 5/2-102(L))",
      period: "Minimum 3 years from date of delivery. Illinois Human Rights Act charge filing period is 300 days, but civil litigation exposure extends longer.",
      notes: "Retain proof of delivery (email delivery receipts, signed acknowledgments, or posting logs).",
    },
    {
      category: "NYC LL144 Bias Audit Reports and Summary Postings",
      period: "Minimum 4 years per DCWP guidance. Retain current year plus three prior years.",
      notes: "Retain the full audit report, the public posting, and evidence that summary was posted at least 10 business days before AEDT use.",
    },
    {
      category: "NYC LL144 Candidate/Employee Notifications",
      period: "Minimum 4 years from date of delivery.",
      notes: "Retain proof of delivery. DCWP may request records during investigations.",
    },
    {
      category: "Colorado SB24-205 Impact Assessments",
      period: "Minimum 3 years from completion. Colorado effective date: June 30, 2026.",
      notes: "Assessments must be available to the Colorado AG upon request (\u00A7 6-1-1703(2)).",
    },
    {
      category: "Colorado SB24-205 Consumer Notifications and Adverse Decision Records",
      period: "Minimum 3 years from the date of the consequential decision.",
      notes: "Include documentation of the principal reason provided for any adverse AI-driven employment decision.",
    },
    {
      category: "AI System Inventory and Documentation (All Jurisdictions)",
      period: "Retain for the life of each AI system plus 3 years after decommissioning.",
      notes: "Includes vendor contracts, bias audit specifications, and system change logs.",
    },
    {
      category: "Accommodation Requests (IL 775 ILCS 5/2-102(L))",
      period: "Minimum 5 years. ADA statute of limitations is 4 years for civil actions.",
      notes: "Retain original request, response, and any alternative process documentation.",
    },
  ];

  retentionItems.forEach((item, idx) => {
    y = addSectionHeader(doc, `${idx + 1}. ${item.category}`, y);
    y = addWrappedText(doc, `Retention Period: ${item.period}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addWrappedText(doc, `Notes: ${item.notes}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `stored_at_${idx}`, "Records stored at:", y);
    y = addFormTextField(doc, `custodian_${idx}`, "Records custodian:", y);
    y += 4;
  });

  y = addSectionHeader(doc, "Legal Hold Procedures", y);
  y = addWrappedText(
    doc,
    "If the organization receives notice of an IDHR charge (IL), DCWP investigation (NYC), or AG inquiry (CO), immediately suspend destruction of all AI compliance records related to the subject matter. Contact legal counsel immediately.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(
    doc,
    "legal_hold_contact",
    "Legal hold notification contact (General Counsel or outside counsel):",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Policy Administration", y);
  y = addFormTextField(doc, "policy_owner", "Policy Owner (Name/Title):", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "policy_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "policy_effective", "Policy Effective Date:", y);
  y = addFormTextField(doc, "policy_next_review", "Next Review Date:", y);
  y = addFormTextField(doc, "policy_sig", "Authorized Signature:", y);

  const checklist = [
    "Policy approved by legal counsel",
    "Records custodians trained on retention schedules",
    "Destruction schedule suspended for any jurisdiction under active investigation",
    "Policy reviewed following any change in applicable law",
  ];
  y = addWrappedText(doc, "Policy Compliance Checklist:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 4;
  checklist.forEach((item, idx) => {
    y = addFormCheckbox(doc, "policy_check_" + idx, item, y);
  });

  addDisclaimer(doc);
  return doc;
}
