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
// Oregon CPA — ORS §§ 646A.570 through 646A.589
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Oregon CPA AI Profiling Compliance Checklist",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the Oregon Consumer Privacy Act (ORS §§ 646A.570 through 646A.589, eff. July 1, 2024) for ${data.company.name}. Enforcement is by the Oregon Attorney General under § 646A.589; there is no private right of action. A 30-day cure period applies until January 1, 2026 (§ 646A.589(2)); after that date, the AG has enforcement discretion. Civil penalties: up to $7,500 per violation (ORS § 646A.589). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (§§ 646A.570–646A.589)",
      items: [
        "Confirmed organization does business in Oregon or targets Oregon residents",
        "Confirmed organization meets at least one threshold: processes data of 100,000+ consumers/year OR derives 25%+ revenue from data sales and processes data of 25,000+ consumers",
        "Documented applicability determination in compliance records",
      ],
    },
    {
      title: "Privacy Notice (§ 646A.578)",
      items: [
        "Privacy notice is reasonably accessible, clear, and meaningful",
        "Notice discloses categories of personal data processed and purposes of processing",
        "Notice describes all consumer rights and how to exercise them",
        "Notice identifies opt-out mechanisms for targeted advertising, data sales, and profiling",
        "Notice describes children's data consent practices for consumers aged 13–15",
        "Notice names privacy contact or designated contact for privacy inquiries",
        "Notice has been reviewed by legal counsel",
        "Notice is updated when data processing practices change significantly",
      ],
    },
    {
      title: "Consumer Rights Infrastructure (§§ 646A.574–646A.576)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established — not requiring more information than reasonably necessary",
        "Process in place to respond within 45 days (§ 646A.576(2)(a))",
        "Process in place to provide 45-day extension notice if needed",
        "Access requests: process to confirm processing and provide copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data; exceptions documented",
        "Portability requests: process to provide data in machine-readable format",
        "Opt-out of targeted advertising: mechanism operational (§ 646A.574(1)(e)(A))",
        "Opt-out of data sales: mechanism operational (§ 646A.574(1)(e)(B))",
        "Opt-out of profiling for consequential decisions: mechanism operational (§ 646A.574(1)(e)(C))",
        "Appeals procedure established for denied requests (§ 646A.576(2)(b))",
        "Appeals procedure includes referral to Oregon AG for unresolved complaints",
        "Appeals outcome communicated within 45 days of receipt of appeal",
      ],
    },
    {
      title: "Children's Data Protections (§ 646A.576(1)(c))",
      items: [
        "Process in place to identify consumers known to be between 13 and 15 years of age",
        "Consent obtained from consumers aged 13–15 before processing their data for targeted advertising",
        "Consent obtained from consumers aged 13–15 before selling their personal data",
        "Consent is specific, informed, unambiguous, and documented",
        "Children's data processing inventoried and limited to consented purposes",
        "Mechanism to revoke consent is available to consumers",
      ],
    },
    {
      title: "Data Protection Assessments for Profiling (§ 646A.586(1)(a))",
      items: [
        "Data protection assessment completed for each profiling activity presenting foreseeable risk of harm",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment evaluates risk of unfair or deceptive treatment of consumers",
        "Assessment evaluates risk of discrimination",
        "Assessment evaluates risk of financial, physical, or reputational harm",
        "Assessment records retained and available for Oregon AG review upon request (§ 646A.586(2))",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title: "Sensitive Data Processing (§ 646A.572)",
      items: [
        "Sensitive data processed only with consumer consent",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (§ 646A.581)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services",
        "Sub-processor engagement authorized and governed",
      ],
    },
    {
      title: "Security (§ 646A.572(1)(d))",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures are appropriate to the volume and nature of personal data processed",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (§ 646A.589)",
      items: [
        "Organization is aware Oregon AG has enforcement authority (§ 646A.589)",
        "Organization is aware there is no private right of action",
        "Organization is aware of the 30-day cure period until January 1, 2026 (§ 646A.589(2))",
        "Civil penalty exposure: up to $7,500 per violation (ORS § 646A.589)",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for Oregon CPA amendments or AG guidance",
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
  y = addFormTextField(
    doc,
    "checklist_next_review",
    "Next Review Date:",
    y,
    { width: 60 }
  );
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, {
    width: 100,
  });

  addDisclaimer(doc);
  return doc;
}
