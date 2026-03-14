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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: State-by-State Compliance Checklist
// Multi-State Profiling Assessment Bundle
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "State-by-State Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with state consumer privacy law assessment requirements for ${data.company.name}. Check each item as it is completed. Review and update at least annually and when processing activities change significantly.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Applicability Determination (All States)",
      items: [
        "Completed Threshold Analysis Worksheet to identify which state laws apply",
        "Confirmed consumer volume metrics used in threshold analysis are current",
        "Confirmed revenue-from-data-sales percentage used in threshold analysis is current",
        "Documented applicability determination in compliance records",
        "Scheduled annual threshold review",
      ],
    },
    {
      title: "Data Protection Assessments (All States)",
      items: [
        "Identified all processing activities that trigger assessment requirements (profiling, targeted advertising, data sales, sensitive data)",
        "Completed Multi-State Data Protection Assessment for each covered processing activity",
        "Assessments document: purpose, benefits, risks, and safeguards",
        "Assessments available for state AG review upon request",
        "Annual assessment review scheduled",
      ],
    },
    {
      title: "Privacy Notice (All States)",
      items: [
        "Multi-State Privacy Notice published and accessible",
        "Notice describes all categories of personal data processed",
        "Notice describes all purposes of processing",
        "Notice identifies data sold and used for targeted advertising",
        "Notice describes all consumer rights and how to exercise them",
        "Notice updated when processing activities change significantly",
      ],
    },
    {
      title: "Consumer Rights Infrastructure (All States)",
      items: [
        "Request submission channel operational (email, web form, or other)",
        "45-day response process established",
        "Access, correction, deletion, and portability request processes in place",
        "Opt-out of targeted advertising process in place",
        "Opt-out of data sales process in place",
        "Opt-out of profiling for consequential decisions process in place",
        "Appeals procedure established",
      ],
    },
    {
      title: "Universal Opt-Out (Delaware \u00A7 12D-106(e), Colorado, Others)",
      items: [
        "Universal opt-out mechanism (e.g., Global Privacy Control) recognized where required",
        "GPC signal detection tested and verified",
        "Opt-out propagates to downstream ad networks and data processors",
        "Privacy notice updated to disclose universal opt-out mechanism",
      ],
    },
    {
      title: "Processor Contracts (All States)",
      items: [
        "Data Processing Agreements in place with all processors",
        "Agreements include processing instructions, data types, duration, and party obligations",
        "Processors obligated to assist with consumer rights requests",
        "Processors obligated to delete or return data at end of services",
      ],
    },
    {
      title: "Enforcement Awareness (State-Specific)",
      items: [
        "Texas: Permanent 30-day cure period (\u00A7 541.154) \u2014 AG enforcement only",
        "Delaware: 60-day cure until Dec 31, 2025; AG discretion after (\u00A7 12D-111) \u2014 AG enforcement only",
        "Minnesota: 30-day cure period expired January 31, 2026 (\u00A7 325M.20(a)) \u2014 AG enforcement only",
        "Colorado: 60-day cure until Jan 1, 2025; AG discretion after \u2014 AG enforcement only",
        "Legal counsel identified for AG investigation response in each applicable state",
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
  y = addFormTextField(doc, "checklist_next_review", "Next Review Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ms_checklist", y);

  addDisclaimer(doc);
  return doc;
}
