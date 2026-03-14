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
// Montana MCDPA — MCA §§ 30-14-2801 through 30-14-2820
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Montana MCDPA Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with the Montana Consumer Data Privacy Act (MCA \u00A7\u00A7 30-14-2801 through 30-14-2820, effective October 1, 2024) for ${data.company.name}. Montana has the lowest applicability thresholds of any state privacy law: 25,000+ consumers OR 15,000+ consumers with 25%+ revenue from data sales (\u00A7 30-14-2803). Enforcement is by the Montana Attorney General via Title 30, ch. 14, parts 1\u20132. No private right of action (\u00A7 30-14-2817(5)). 30-day cure period (\u00A7 30-14-2817(3)). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability (\u00A7 30-14-2803)",
      items: [
        "Confirmed organization does business in Montana or targets Montana residents",
        "Confirmed organization meets at least one threshold: processes data of 25,000+ consumers/year OR derives 25%+ revenue from data sales and processes data of 15,000+ consumers (lowest thresholds of any state)",
        "Documented applicability determination in compliance records",
      ],
    },
    {
      title: "Privacy Notice (\u00A7 30-14-2808)",
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
      title: "Consumer Rights Infrastructure (\u00A7\u00A7 30-14-2809 through 30-14-2810)",
      items: [
        "Verified request submission channel is operational (email, web form, or other)",
        "Identity verification procedure established \u2014 not requiring more than reasonably necessary information",
        "Process in place to respond within 45 days (\u00A7 30-14-2810(1))",
        "Process in place to provide 45-day extension notice if needed (\u00A7 30-14-2810(2))",
        "Access requests: process to provide categories and copy of personal data",
        "Correction requests: process to correct inaccurate data",
        "Deletion requests: process to delete data and exceptions documented (\u00A7 30-14-2809(3))",
        "Portability requests: process to provide data in machine-readable format",
        "Appeals procedure established for denied requests (\u00A7 30-14-2810(4))",
        "Appeals procedure includes referral to Montana AG for unresolved complaints",
      ],
    },
    {
      title: "Opt-Out Rights (\u00A7 30-14-2809(1)(e))",
      items: [
        "Consumers have a clear mechanism to opt out of targeted advertising (\u00A7 30-14-2809(1)(e)(i))",
        "Consumers have a clear mechanism to opt out of sale of personal data (\u00A7 30-14-2809(1)(e)(ii))",
        "Consumers have a clear mechanism to opt out of profiling for consequential decisions (\u00A7 30-14-2809(1)(e)(iii))",
        "Opt-out signals are captured, stored, and processed promptly",
        "All systems subject to opt-out rights are identified and documented",
        "Opt-out propagates to all downstream data processors",
      ],
    },
    {
      title: "Data Protection Assessments (\u00A7 30-14-2814)",
      items: [
        "Data protection assessment completed for each processing activity presenting heightened risk",
        "Assessment documents: purpose, benefits, risks to consumers, safeguards implemented",
        "Assessment covers targeted advertising, data sales, profiling, and sensitive data processing (\u00A7 30-14-2814(1))",
        "Assessment records retained and available for Montana AG review upon request (\u00A7 30-14-2814(3))",
        "Note: Assessments are not retroactive to processing prior to January 1, 2025 (\u00A7 30-14-2814)",
        "Assessments reviewed when processing activities change significantly",
        "Annual reassessment scheduled",
      ],
    },
    {
      title: "Sensitive Data Processing (\u00A7 30-14-2806)",
      items: [
        "Consent obtained before processing sensitive data (racial or ethnic origin, religious beliefs, health conditions, sexual orientation, citizenship, biometric, genetic, precise geolocation, data of known minors)",
        "Consent is specific, informed, unambiguous, and documented",
        "Mechanism to revoke consent is available to consumers",
        "Sensitive data processing inventoried and limited to consented purposes",
      ],
    },
    {
      title: "Processor Contracts (\u00A7 30-14-2813)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations (\u00A7 30-14-2813(1))",
        "Processors contractually obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data upon end of services (\u00A7 30-14-2813(2)(c))",
        "Sub-processor engagement authorized and governed (\u00A7 30-14-2813(2)(e))",
      ],
    },
    {
      title: "Security (\u00A7 30-14-2812)",
      items: [
        "Appropriate technical and organizational security measures implemented for all personal data",
        "Security measures reviewed regularly and updated as needed",
        "Security incident response procedure in place",
      ],
    },
    {
      title: "Enforcement Awareness (\u00A7 30-14-2817 through 30-14-2820)",
      items: [
        "Organization is aware the Montana AG enforces via Title 30, ch. 14, parts 1\u20132",
        "Organization is aware there is no private right of action (\u00A7 30-14-2817(5))",
        "Organization is aware of the 30-day cure period before AG may bring action (\u00A7 30-14-2817(3))",
        "Civil penalty up to $7,500 per violation (\u00A7 30-14-2820)",
        "Legal counsel identified for AG investigation response",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Compliance review scheduled at least annually",
        "Monitoring process in place for Montana MCDPA amendments or AG guidance",
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
