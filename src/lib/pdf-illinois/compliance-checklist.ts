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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: Compliance Checklist
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "HB3773 Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with Illinois HB3773 for ${data.company.name}. Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "quarterly"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Notice Requirements (Proposed IDHR Subpart J Rules)",
      items: [
        "Notice includes AI product name, developer, and vendor for each system",
        "Notice identifies which employment decisions each AI system influences or facilitates",
        "Notice states purpose of AI system and categories of personal/employee data processed",
        "Notice identifies types of job positions where AI is used",
        "Notice names contact person for questions about AI system use",
        "Notice includes right to request reasonable accommodation with instructions",
        "Notice includes anti-discrimination statement (no discriminatory effect, no zip code proxies)",
        "Notice written in plain language",
        "Notice available in languages commonly spoken by workforce",
        "Notice accessible to employees with disabilities",
      ],
    },
    {
      title: "Notice Posting Locations (Per Proposed IDHR Subpart J Rules)",
      items: [
        "Posted in employee handbooks/manuals",
        "Posted on physical workplace notice boards",
        "Posted on company intranet/website",
        "Included in job postings for prospective employees",
      ],
    },
    {
      title: "Notice Timing (Per Proposed IDHR Subpart J Rules)",
      items: [
        "Annual notice provided to all current employees",
        "Notice provided within 30 days of adopting new or substantially updated AI systems",
        "Prospective employees notified via job postings before AI is used",
      ],
    },
    {
      title: "AI System Documentation & Inventory (Recommended Best Practice)",
      items: [
        "Complete inventory of all AI systems used in employment decisions",
        "Developer and vendor information documented for each third-party AI system",
        "Categories of personal/employee data collected or processed documented",
        "Employment decisions influenced by each system documented",
        "Protected characteristics access documented and reviewed",
        "Vendor due diligence completed for third-party AI providers",
      ],
    },
    {
      title:
        "Anti-Discrimination Compliance (Statutory \u2014 775 ILCS 5/2-102(L)(1))",
      items: [
        "AI systems audited for potential disparate impact on protected classes",
        "Zip code usage reviewed — not used as proxy for protected characteristics",
        "Disparate impact analysis completed (per federal EEOC Uniform Guidelines, 29 C.F.R. \u00A7 1607)",
        "Risk mitigation strategies identified and documented",
        "Assessment reviewed and signed by designated authority",
      ],
    },
    {
      title:
        "Human Oversight & Accommodation (Recommended Best Practice / Proposed IDHR Rules)",
      items: [
        "Designated oversight role assigned and documented",
        "Decision review process established and documented",
        "Override authority and documentation requirements in place",
        "Reasonable accommodation request process established and documented",
        "All oversight personnel trained on 775 ILCS 5/2-102(L) requirements and proposed IDHR Subpart J rules",
      ],
    },
    {
      title: "Recordkeeping (4-Year Retention \u2014 IDHR Proposed Rules)",
      items: [
        "All AI-related notices, postings, and disclosures preserved for 4 years",
        "Records of AI system use in employment decisions preserved for 4 years",
        "Records preserved until any IDHR charge is fully adjudicated, regardless of filing date (per general IHRA practice)",
        "Record retention policy documented and assigned to responsible party",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Regular bias audits scheduled (recommended: annually)",
        "Regulatory monitoring for HB3773 amendments and IDHR rule updates",
        "Employee complaint / feedback mechanism in place",
        "Manager training on notice, recordkeeping, and anti-discrimination obligations",
        "Legal counsel review of compliance program (recommended: annually)",
      ],
    },
  ];

  let cbCount = 0;
  sections.forEach((section) => {
    y = addSectionHeader(doc, section.title, y);
    section.items.forEach((item) => {
      y = addFormCheckbox(doc, "cl_" + cbCount, item, y);
      cbCount++;
    });
    y += LINE_HEIGHT;
  });

  // Sign-off — fillable fields
  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "checklist_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  addDisclaimer(doc);
  return doc;
}
