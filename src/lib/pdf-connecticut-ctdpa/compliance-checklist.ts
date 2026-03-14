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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: Compliance Checklist
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Connecticut CTDPA AI Profiling Compliance Checklist",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the Connecticut Data Privacy Act (Conn. Gen. Stat. §§ 42-515 through 42-525, P.A. 22-15, eff. July 1, 2023) for ${data.company.name}. Enforcement is exclusive to the Connecticut Attorney General under § 42-525(a); there is no private right of action. The mandatory 60-day cure period expired December 31, 2024; the AG now has enforcement discretion (§ 42-525(a)). Civil penalties: up to $5,000 per violation under the Connecticut Unfair Trade Practices Act (CUTPA, § 42-110o). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (§§ 42-515–42-525)",
      items: [
        "Confirmed organization does business in Connecticut or targets Connecticut residents",
        "Confirmed organization meets at least one threshold: processes data of 100,000+ consumers (excluding payment-only data) OR derives 25%+ revenue from data sales and processes data of 25,000+ consumers",
        "Documented applicability determination in compliance records",
      ],
    },
    {
      title: "Privacy Notice (§ 42-520)",
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
      title: "Consumer Rights Infrastructure (§§ 42-518–42-519)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established — not requiring more information than reasonably necessary",
        "Process in place to respond within 45 days (§ 42-519(a))",
        "Process in place to provide 45-day extension notice if needed (§ 42-519(a))",
        "Access requests: process to confirm processing and provide copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data; exceptions documented",
        "Portability requests: process to provide data in machine-readable format",
        "Opt-out of targeted advertising: mechanism operational (§ 42-518(a)(5))",
        "Opt-out of data sales: mechanism operational (§ 42-518(a)(5))",
        "Opt-out of profiling for consequential decisions: mechanism operational (§ 42-518(a)(6))",
        "Appeals procedure established for denied requests within reasonable period (§ 42-519(b))",
        "Appeals procedure includes referral to Connecticut AG for unresolved complaints (§ 42-519(b))",
        "Appeals outcome communicated within 60 days of receipt of appeal",
      ],
    },
    {
      title: "Data Protection Assessments for Profiling (§ 42-522(a)(3))",
      items: [
        "Data protection assessment completed for each profiling activity presenting foreseeable risk of harm",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment evaluates risk of unfair or deceptive treatment of consumers",
        "Assessment evaluates risk of unlawful discriminatory treatment",
        "Assessment evaluates risk of financial, physical, or reputational injury",
        "Assessment records retained and available for Connecticut AG review upon request (§ 42-522(c))",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title: "Sensitive Data Processing (§ 42-516)",
      items: [
        "Sensitive data processed only with consumer consent (§ 42-516(a)(1))",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Children's data (§ 42-516(a)(1)): consent obtained for processing data of known children under 13",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (§ 42-521)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services",
        "Sub-processor engagement authorized and governed",
      ],
    },
    {
      title: "Security (§ 42-516(a)(4))",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures are appropriate to the volume and nature of personal data processed",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (§ 42-525)",
      items: [
        "Organization is aware the Connecticut AG has exclusive enforcement authority (§ 42-525(a))",
        "Organization is aware there is no private right of action",
        "Organization is aware the mandatory 60-day cure period expired December 31, 2024",
        "Civil penalty exposure: up to $5,000 per violation under CUTPA (§ 42-110o)",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for Connecticut CTDPA amendments or AG guidance",
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

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ct_checklist", y);

  addDisclaimer(doc);
  return doc;
}
