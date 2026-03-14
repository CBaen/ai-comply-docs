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
// Virginia CDPA — Va. Code §§ 59.1-575 through 59.1-584
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Virginia CDPA AI Profiling Compliance Checklist",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the Virginia Consumer Data Protection Act (Va. Code §§ 59.1-575 through 59.1-584, eff. January 1, 2023) for ${data.company.name}. Enforcement is exclusive to the Virginia Attorney General under § 59.1-584(A); there is no private right of action. The AG must provide a 30-day cure period before seeking civil penalties (§ 59.1-584(B)). Civil penalties may be up to $7,500 per violation (§ 59.1-584(C)). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (§§ 59.1-575–59.1-584)",
      items: [
        "Confirmed organization does business in Virginia or targets Virginia residents",
        "Confirmed organization meets at least one threshold: processes data of 100,000+ consumers/year OR derives 50%+ revenue from data sales and processes data of 25,000+ consumers",
        "Documented applicability determination in compliance records",
      ],
    },
    {
      title: "Privacy Notice (§ 59.1-578(C))",
      items: [
        "Privacy notice is reasonably accessible, clear, and meaningful",
        "Notice discloses categories of personal data processed and purposes of processing",
        "Notice describes all consumer rights and how to exercise them",
        "Notice identifies opt-out mechanisms for targeted advertising, data sales, and profiling",
        "Notice names privacy contact or designated contact for privacy inquiries",
        "Notice has been reviewed by legal counsel",
        "Notice is updated when data processing practices change significantly",
      ],
    },
    {
      title: "Targeted Advertising and Data Sales Disclosure (§ 59.1-578(D))",
      items: [
        "If processing for targeted advertising: clear and conspicuous disclosure provided to consumers",
        "If selling personal data: clear and conspicuous disclosure provided to consumers",
        "Disclosure describes how consumers may exercise opt-out rights",
        "Opt-out mechanism is operational and accessible",
      ],
    },
    {
      title: "Consumer Rights Infrastructure (§§ 59.1-577–59.1-578)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established — not requiring more information than reasonably necessary",
        "Process in place to respond within 45 days (§ 59.1-578(A))",
        "Process in place to provide 45-day extension notice if needed (§ 59.1-578(A))",
        "Access requests: process to confirm processing and provide copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data; exceptions documented",
        "Portability requests: process to provide data in machine-readable format",
        "Opt-out of targeted advertising: mechanism operational",
        "Opt-out of data sales: mechanism operational",
        "Opt-out of profiling for consequential decisions: mechanism operational",
        "Appeals procedure established for denied requests within reasonable period (§ 59.1-578(B))",
        "Appeals procedure includes referral to Virginia AG for unresolved complaints (§ 59.1-578(B))",
        "Appeals outcome communicated within 60 days of receipt of appeal",
      ],
    },
    {
      title:
        "Data Protection Assessments for Profiling (§ 59.1-580(A)(3))",
      items: [
        "Data protection assessment completed for each profiling activity presenting foreseeable risk of unfair treatment or disparate impact",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment evaluates risk of unfair or deceptive treatment of consumers",
        "Assessment evaluates risk of disparate impact on consumers",
        "Assessment evaluates risk of financial, physical, or reputational injury",
        "Assessment records retained and available for Virginia AG review upon request (§ 59.1-580(B))",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title: "Sensitive Data Processing (§ 59.1-576)",
      items: [
        "Sensitive data (racial origin, religious beliefs, health data, genetic data, biometric data, children's data, sexual orientation, precise geolocation) processed only with consumer consent",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (§ 59.1-579)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services",
        "Sub-processor engagement authorized and governed",
      ],
    },
    {
      title: "Security (§ 59.1-576(A)(4))",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures are appropriate to the volume and nature of personal data processed",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (§ 59.1-584)",
      items: [
        "Organization is aware the Virginia AG has exclusive enforcement authority (§ 59.1-584(A))",
        "Organization is aware there is no private right of action",
        "Organization is aware of the 30-day cure period upon AG notice (§ 59.1-584(B))",
        "Civil penalty exposure: up to $7,500 per violation (§ 59.1-584(C))",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for Virginia CDPA amendments or AG guidance",
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
