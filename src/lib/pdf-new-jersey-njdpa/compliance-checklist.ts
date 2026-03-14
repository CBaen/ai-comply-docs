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
// DOCUMENT 6: Compliance Checklist
// New Jersey NJDPA — S332/A1971 (signed January 16, 2024)
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "New Jersey NJDPA Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the New Jersey Data Protection Act (S332/A1971, signed January 16, 2024, effective January 15, 2025) for ${data.company.name}. This law is separate from the NJ Law Against Discrimination. Enforcement is by the New Jersey Attorney General; there is no private right of action. Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (NJDPA)",
      items: [
        "Confirmed organization does business in New Jersey or targets New Jersey residents",
        "Confirmed organization meets at least one threshold: processes data of 100,000+ consumers/year OR derives 50%+ revenue from data sales and processes data of 25,000+ consumers",
        "Documented applicability determination in compliance records",
        "Confirmed this law is separate from the NJ Law Against Discrimination (LAD) \u2014 both may apply independently",
      ],
    },
    {
      title: "Privacy Notice (NJDPA)",
      items: [
        "Privacy notice is reasonably accessible, clear, and meaningful",
        "Notice discloses categories of personal data processed and purposes of processing",
        "Notice describes all consumer rights and how to exercise them",
        "Notice identifies opt-out mechanisms for data sales, targeted advertising, and profiling",
        "Notice names designated privacy contact",
        "Notice has been reviewed by legal counsel",
        "Notice is updated when data processing practices change significantly",
      ],
    },
    {
      title: "Consumer Rights Infrastructure (NJDPA)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established \u2014 not requiring more than reasonably necessary information",
        "Process in place to respond within 45 days",
        "Process in place to provide 45-day extension notice if needed",
        "Access requests: process to provide categories and copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data and exceptions documented",
        "Portability requests: process to provide data in machine-readable format",
        "Appeals procedure established for denied requests",
        "Appeals procedure includes referral to New Jersey AG for unresolved complaints",
      ],
    },
    {
      title: "Opt-Out Rights (NJDPA)",
      items: [
        "Consumers have a clear mechanism to opt out of targeted advertising",
        "Consumers have a clear mechanism to opt out of sale of personal data",
        "Consumers have a clear mechanism to opt out of profiling for consequential decisions",
        "Opt-out signals are captured, stored, and processed promptly",
        "All systems subject to opt-out rights are identified and documented",
        "Opt-out propagates to all downstream data processors",
      ],
    },
    {
      title: "Data Protection Assessments (NJDPA)",
      items: [
        "Data protection assessment completed for each processing activity presenting heightened risk",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment covers targeted advertising, data sales, profiling, and sensitive data processing",
        "Assessment records retained and available for New Jersey AG review upon request",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title: "Sensitive Data Processing (NJDPA)",
      items: [
        "Consent obtained before processing sensitive data (racial or ethnic origin, religious beliefs, health conditions, sexual orientation, citizenship, biometric, genetic, precise geolocation, data of known minors)",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (NJDPA)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services",
        "Sub-processor engagement authorized and governed",
      ],
    },
    {
      title: "Security (NJDPA)",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (NJDPA)",
      items: [
        "Organization is aware the New Jersey AG has enforcement authority",
        "Organization is aware there is no private right of action under the NJDPA",
        "Organization is aware the NJDPA is separate from the NJ Law Against Discrimination \u2014 compliance with one does not guarantee compliance with the other",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for NJDPA amendments or AG guidance",
        "Consumer complaint/feedback mechanism in place",
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

  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "checklist_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_next_review", "Next Review Date:", y, {
    width: 60,
  });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, {
    width: 100,
  });

  addDisclaimer(doc);
  return doc;
}
