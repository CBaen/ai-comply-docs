import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  MARGIN,
  LINE_HEIGHT,
  REVIEW_LABELS,
  addWrappedText,
  CONTENT_WIDTH,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: HIPAA AI Compliance Checklist
// ============================================================
export function generateHIPAAComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "HIPAA AI Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain HIPAA compliance for ${data.company.name}'s AI systems that process protected health information (PHI). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Privacy Rule — Minimum Necessary (45 CFR \u00A7 164.502(b))",
      items: [
        "AI system access limited to PHI fields required for its specific function",
        "Minimum necessary determination documented for each AI use case",
        "PHI access scope reviewed when AI system purpose changes",
        "De-identification (45 CFR \u00A7 164.514) applied where full PHI not required",
        "Workforce trained on minimum necessary standard for AI PHI access",
      ],
    },
    {
      title: "Business Associate Agreements (45 CFR \u00A7 164.308(b)(1) / \u00A7 164.314)",
      items: [
        "Signed BAA in place with every AI vendor handling PHI",
        "BAA inventory current and reviewed annually",
        "BAAs include AI-specific terms (no PHI for model training without authorization)",
        "Sub-processor disclosure obtained from all AI vendors",
        "BAA termination and PHI return/destruction procedures in place",
      ],
    },
    {
      title: "Security Rule — Risk Analysis (45 CFR \u00A7 164.308(a)(1))",
      items: [
        "Annual risk analysis completed covering all AI systems processing ePHI",
        "Risk analysis conducted before deploying new AI systems with ePHI access",
        "Risk management plan addresses identified vulnerabilities",
        "Security Officer assigned and documented (45 CFR \u00A7 164.308(a)(2))",
        "Risk analysis documentation retained for 6 years (45 CFR \u00A7 164.530(j))",
      ],
    },
    {
      title: "Administrative Safeguards (45 CFR \u00A7 164.308)",
      items: [
        "Security awareness training covers AI-specific risks (45 CFR \u00A7 164.308(a)(5))",
        "Security incident reporting procedure in place for AI-related incidents (45 CFR \u00A7 164.308(a)(6))",
        "Contingency plan addresses AI system failure (45 CFR \u00A7 164.308(a)(7))",
        "Access authorization procedures cover AI system PHI access (45 CFR \u00A7 164.308(a)(4))",
        "Periodic evaluation of security measures for AI systems conducted (45 CFR \u00A7 164.308(a)(8))",
      ],
    },
    {
      title: "Physical Safeguards (45 CFR \u00A7 164.310)",
      items: [
        "Facility access controls for AI server infrastructure (45 CFR \u00A7 164.310(a)(1))",
        "Workstation security policies applied to AI system access terminals (45 CFR \u00A7 164.310(b))",
        "Device and media disposal policy covers AI system storage (45 CFR \u00A7 164.310(d)(1))",
      ],
    },
    {
      title: "Technical Safeguards (45 CFR \u00A7 164.312)",
      items: [
        "Unique user IDs required for all AI system PHI access (45 CFR \u00A7 164.312(a)(2)(i))",
        "Automatic logoff implemented on AI system interfaces (45 CFR \u00A7 164.312(a)(2)(iii))",
        "ePHI encrypted at rest in AI system storage (45 CFR \u00A7 164.312(a)(2)(iv))",
        "ePHI encrypted in transit to/from AI systems (45 CFR \u00A7 164.312(e)(2)(ii))",
        "Audit logs capture all AI system PHI access events (45 CFR \u00A7 164.312(b))",
        "Audit logs retained for 6 years (45 CFR \u00A7 164.530(j))",
        "Integrity controls verify PHI not improperly altered by AI (45 CFR \u00A7 164.312(c)(1))",
      ],
    },
    {
      title: "Breach Notification Rule (45 CFR Part 164, Subpart D)",
      items: [
        "Breach identification procedure covers AI-related incidents",
        "Four-factor breach harm assessment process documented (45 CFR \u00A7 164.402)",
        "Individual notification procedures in place (60-day maximum, 45 CFR \u00A7 164.404)",
        "HHS notification procedures in place (45 CFR \u00A7 164.408)",
        "Media notification procedures in place for large breaches (500+ in a state, 45 CFR \u00A7 164.406)",
        "Breach log maintained for breaches affecting fewer than 500 individuals",
      ],
    },
    {
      title: "Individual Rights — AI-Processed PHI (45 CFR Part 164, Subpart E)",
      items: [
        "Access requests responded to within 30 days (45 CFR \u00A7 164.524(b)(2)(i))",
        "AI-generated records in designated record set are producible on access request",
        "Amendment requests addressed within 60 days (45 CFR \u00A7 164.526(b)(2))",
        "AI system operators notified of accepted amendments",
        "Accounting of disclosures procedure covers AI-related disclosures (45 CFR \u00A7 164.528)",
        "Out-of-pocket payment restriction honored in AI system access controls (45 CFR \u00A7 164.522(a)(1)(vi))",
      ],
    },
    {
      title: "Enforcement Awareness",
      items: [
        "Penalty tiers understood: $100\u2013$50,000 per violation category; up to $1.5M per category per year (45 CFR \u00A7 160.404)",
        "Criminal penalties understood: up to $250,000 fine and 10 years imprisonment for knowing misuse (42 U.S.C. \u00A7 1320d-6)",
        "30-day cure period available for reasonable cause violations (45 CFR \u00A7 160.410(b))",
        "HHS OCR and state AGs may enforce; no direct private right of action under HIPAA",
        "Legal counsel engaged for HIPAA compliance program review",
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

  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "checklist_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  addDisclaimer(doc);
  return doc;
}
