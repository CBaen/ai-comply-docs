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
// Minnesota MCDPA — Minn. Stat. §§ 325M.10–325M.21
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Minnesota MCDPA Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the Minnesota Consumer Data Privacy Act (Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21, eff. July 31, 2025) for ${data.company.name}. The 30-day cure period for AG warnings has expired (January 31, 2026). Enforcement is exclusive to the Minnesota Attorney General under \u00A7 325M.20; there is no private right of action (\u00A7 325M.20(d)). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (\u00A7\u00A7 325M.10\u2013325M.21)",
      items: [
        "Confirmed organization does business in Minnesota or targets Minnesota residents",
        "Confirmed organization meets at least one threshold: processes data of 100,000+ consumers/year OR derives 25%+ revenue from data sales and processes data of 25,000+ consumers",
        "Documented applicability determination in compliance records",
      ],
    },
    {
      title: "Privacy Notice (\u00A7 325M.13)",
      items: [
        "Privacy notice is reasonably accessible, clear, and meaningful",
        "Notice discloses categories of personal data processed and purposes of processing",
        "Notice describes all consumer rights and how to exercise them",
        "Notice identifies opt-out mechanisms for data sales, targeted advertising, and profiling",
        "Notice names designated Data Privacy Officer or privacy contact",
        "Notice has been reviewed by legal counsel",
        "Notice is updated when data processing practices change significantly",
      ],
    },
    {
      title: "Consumer Rights Infrastructure (\u00A7 325M.14\u2013325M.15)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established \u2014 not requiring more than reasonably necessary information",
        "Process in place to respond within 45 days (\u00A7 325M.15)",
        "Process in place to provide 45-day extension notice if needed (\u00A7 325M.15(b))",
        "Access requests: process to provide categories and copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data and exceptions documented",
        "Portability requests: process to provide data in machine-readable format",
        "Appeals procedure established for denied requests (\u00A7 325M.15(d))",
        "Appeals procedure includes referral to Minnesota AG for unresolved complaints",
      ],
    },
    {
      title:
        "Opt-Out of Profiling for Automated Decisions (\u00A7 325M.05(f))",
      items: [
        "Consumers have a clear mechanism to opt out of profiling used for decisions producing legal or similarly significant effects",
        "Opt-out signal is captured, stored, and processed promptly",
        "All AI systems subject to profiling opt-out are identified and documented",
        "Opt-out propagates to all downstream data processors",
        "Opt-out state is honored across interactions and sessions",
      ],
    },
    {
      title:
        "Consumer Right to Question Profiling Results (\u00A7 325M.05(g))",
      items: [
        "Process established for consumers to question profiling results affecting them",
        "Process established to inform consumers of the reasoning behind profiling-based decisions",
        "Responses to profiling questions are documented",
        "Staff or system capable of providing plain-language explanation of algorithmic reasoning",
      ],
    },
    {
      title:
        "Data Protection Assessments for Profiling (\u00A7 325M.18(b))",
      items: [
        "Data protection impact assessment completed for each profiling activity with foreseeable risk of unfair treatment or disparate impact",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment includes review for disparate impact on protected classes",
        "Assessment records retained and available for Minnesota AG review upon request",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title:
        "Documentation and Chief Privacy Officer (\u00A7 325M.18(a))",
      items: [
        "Chief Privacy Officer (or equivalent) named and documented",
        "Chief Privacy Officer assigned responsibility for data privacy policies and procedures",
        "Data privacy policies and procedures are written and up to date",
        "Policies cover all categories of personal data processed",
        "Policies are reviewed at least annually",
        "Staff with data privacy responsibilities have received training",
      ],
    },
    {
      title: "Sensitive Data Consent",
      items: [
        "Consent obtained before processing sensitive data (racial or ethnic origin, religious beliefs, health conditions, sexual orientation, citizenship, biometric, genetic, precise geolocation, data of known minors)",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (\u00A7 325M.18)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services",
        "Sub-processor engagement authorized and governed",
      ],
    },
    {
      title: "Security (\u00A7 325M.17)",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (\u00A7 325M.20)",
      items: [
        "Organization is aware the Minnesota AG has exclusive enforcement authority (\u00A7 325M.20(b))",
        "Organization is aware there is no private right of action (\u00A7 325M.20(d))",
        "Organization is aware the 30-day AG cure period expired January 31, 2026 (\u00A7 325M.20(a)) \u2014 prompt remediation is required upon any AG warning",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for Minnesota MCDPA amendments or AG guidance",
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
