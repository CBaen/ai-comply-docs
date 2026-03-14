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
// DOCUMENT 5: Human Review Process Documentation
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generateHumanReviewProcess(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Human Review Process Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s human review process for decisions made using automated decisionmaking technology (ADMT), pursuant to the CPPA ADMT regulations under Cal. Civ. Code \u00A7 1798.100 et seq., effective January 1, 2026. Consumers have the right to request human review of significant ADMT-driven decisions. This process must be verified against current CPPA guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "When Human Review Is Available", y);
  y = addWrappedText(
    doc,
    "Human review is available to any consumer who receives a significant decision made using ADMT (i.e., a decision with a legal or similarly significant effect on the consumer). The following decision types are subject to human review upon consumer request:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys, idx) => {
    y = addFormCheckbox(
      doc,
      "sys_" + idx,
      `${sys.name} \u2014 ${sys.decisions.join(", ") || "employment/consequential decisions"}`,
      y,
      { checked: true }
    );
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How to Request Human Review", y);
  y = addFormTextField(
    doc,
    "request_method",
    "How consumers request human review (email, phone, web form):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "request_deadline",
    "Time limit for submitting a human review request after receiving the ADMT decision:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Human Review Process Steps", y);
  const steps = [
    "Receive and log human review request from consumer",
    "Verify identity of requesting consumer",
    "Assign qualified human reviewer (must not be the same individual who generated the original ADMT output)",
    "Provide reviewer with: original ADMT output, input data used, and consumer\u2019s stated basis for review request",
    "Reviewer evaluates the decision independently, without sole reliance on the ADMT output",
    "Reviewer documents their analysis and conclusion",
    "Communicate outcome and reasoning to consumer within established timeline",
    "Log all review actions and outcomes for audit purposes",
  ];
  steps.forEach((step, idx) => {
    y = addWrappedText(
      doc,
      `${idx + 1}. ${step}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Review Timeline", y);
  y = addFormTextField(
    doc,
    "review_timeline",
    "Maximum time to complete human review and communicate outcome:",
    y
  );
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: complete human review within 45 days of the consumer\u2019s request to align with Cal. Civ. Code \u00A7 1798.130(a)(2) response timelines.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Reviewer Qualifications", y);
  y = addFormTextField(
    doc,
    "reviewer_qualifications",
    "Required qualifications for human reviewers:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "reviewer_training",
    "Training required for human reviewers:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(doc, "admin_name", "Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });
  y = addFormTextField(doc, "effective_date", "Process Effective Date:", y);

  addDisclaimer(doc);
  return doc;
}
