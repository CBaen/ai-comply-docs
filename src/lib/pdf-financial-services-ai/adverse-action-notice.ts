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
// DOCUMENT 2: Adverse Action Notice Template + Procedures
// ECOA/Regulation B (12 CFR Part 1002) + FCRA (15 U.S.C. § 1681m)
// ============================================================
export function generateAdverseActionNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Adverse Action Notice — Template and Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document provides ${data.company.name}'s adverse action notice template and procedures for AI-driven credit decisions, as required by the Equal Credit Opportunity Act (ECOA) and Regulation B (12 CFR Part 1002) and the Fair Credit Reporting Act (FCRA) (15 U.S.C. \u00A7 1681m). When AI systems make or contribute to adverse credit decisions, the same adverse action notice requirements apply as for human-made decisions. The CFPB has confirmed that ECOA and Regulation B do not provide an exemption from adverse action notice requirements for AI-driven decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: When Adverse Action Notice Is Required
  y = addSectionHeader(doc, "1. When AI-Driven Decisions Trigger Adverse Action Notices", y);
  y = addWrappedText(
    doc,
    "An adverse action notice is required when an AI system takes or contributes to any of the following actions on a credit application or existing account (12 CFR \u00A7 1002.2(c)(1)):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const triggerItems = [
    "Denial of an application for credit",
    "Change in terms of an existing credit account that is unfavorable to the applicant",
    "Refusal to grant credit in substantially the amount or terms requested",
    "Termination of an account or adverse change in the terms of an account",
    "Denial of a request to increase a credit limit",
    "Any action or forbearance with respect to a credit account that adversely affects the account holder",
  ];
  let cbIdx = 0;
  triggerItems.forEach((item) => {
    y = addFormCheckbox(doc, `trigger_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 2: Adverse Action Notice Requirements
  y = addSectionHeader(doc, "2. Required Content of AI Adverse Action Notices (12 CFR \u00A7 1002.9)", y);
  y = addWrappedText(
    doc,
    "Adverse action notices must be provided within 30 days of receiving a complete credit application or 30 days of taking adverse action on an existing account (12 CFR \u00A7 1002.9(a)(1)). When AI systems generate or contribute to adverse decisions, notices must include:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const reqItems = [
    "Statement of the action taken (12 CFR \u00A7 1002.9(a)(2)(i))",
    "Name and address of the creditor (12 CFR \u00A7 1002.9(a)(2)(ii))",
    "Statement of the ECOA provision and CFPB contact information (12 CFR \u00A7 1002.9(a)(2)(ii))",
    "Statement of specific reasons for adverse action or disclosure of right to receive specific reasons (12 CFR \u00A7 1002.9(a)(2)(i)) — AI systems must be capable of generating specific, principal reasons",
    "If consumer report was used: name and address of consumer reporting agency and statement of right to free copy (15 U.S.C. \u00A7 1681m(a))",
    "If credit score used: score, range, key factors, date, and CRA name (15 U.S.C. \u00A7 1681m(a)(2))",
  ];
  reqItems.forEach((item) => {
    y = addFormCheckbox(doc, `req_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 3: AI-Specific Challenge — Specific Reasons
  y = addSectionHeader(doc, "3. AI-Specific Requirement: Specific, Principal Reasons", y);
  y = addWrappedText(
    doc,
    'Regulation B requires that adverse action notices state "specific reasons" for the action (12 CFR \u00A7 1002.9(b)(2)). For AI models, this requirement is particularly important: the CFPB has stated that creditors cannot use AI complexity as a justification for providing vague or generic reasons. Specific reasons must:',
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const specificItems = [
    "Identify the principal factors that contributed to the adverse decision (not just 'credit score insufficient')",
    "Be stated clearly enough that the applicant can understand what to address to potentially qualify",
    "Reflect actual model-derived factors, not pre-selected generic codes that do not match the model's actual reasoning",
    "Be reviewed periodically to ensure AI model output maps accurately to disclosed reasons",
    "Not rely solely on protected characteristics (race, sex, national origin, religion, marital status, age, familial status, receipt of public assistance) — ECOA prohibits adverse action on these bases (12 CFR \u00A7 1002.4(a))",
  ];
  specificItems.forEach((item) => {
    y = addFormCheckbox(doc, `specific_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 4: Notice Template
  y = addSectionHeader(doc, "4. Adverse Action Notice Template", y);
  y = addWrappedText(
    doc,
    "Complete and send this template within 30 days of the adverse decision. All fields marked [REQUIRED] must be completed before sending.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 8;

  // Template header
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "NOTICE OF ACTION TAKEN AND STATEMENT OF REASONS", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y += 4;

  y = addFormTextField(doc, "applicant_name", "Applicant Name: [REQUIRED]", y, { width: 140 });
  y = addFormTextField(doc, "applicant_address", "Applicant Address: [REQUIRED]", y, { width: 140 });
  y = addFormTextField(doc, "application_date", "Application Date: [REQUIRED]", y, { width: 80 });
  y = addFormTextField(doc, "action_date", "Date of Action: [REQUIRED]", y, { width: 80 });
  y += 4;

  y = addWrappedText(
    doc,
    `Thank you for your application for credit with ${data.company.name}. After careful consideration, we regret to inform you that your application has been:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "action_denied", "Denied", y);
  y = addFormCheckbox(doc, "action_terms_changed", "Approved, but with different terms than requested", y);
  y = addFormCheckbox(doc, "action_terminated", "Your account has been terminated/restricted", y);
  y += 6;

  y = addWrappedText(doc, "Principal Reason(s) for this Decision:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += 4;
  for (let i = 1; i <= 4; i++) {
    y = addFormTextField(doc, `reason_${i}`, `Reason ${i}:`, y, { width: CONTENT_WIDTH - 20 });
  }
  y += 4;

  y = addFormCheckbox(doc, "cra_used", "A consumer report (credit report) was used in making this decision. The consumer reporting agency that provided the report is:", y);
  y = addFormTextField(doc, "cra_name", "CRA Name:", y, { width: 120 });
  y = addFormTextField(doc, "cra_address", "CRA Address:", y, { width: 140 });
  y = addFormTextField(doc, "cra_phone", "CRA Phone:", y, { width: 80 });
  y += 4;

  y = addWrappedText(
    doc,
    "The consumer reporting agency listed above did not make this decision and cannot explain why it was made. You have the right to obtain a free copy of your consumer report from the CRA within 60 days of this notice. You have the right to dispute the accuracy or completeness of any information in your consumer report with the CRA.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    `The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant's income derives from any public assistance program; or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act. The Federal agency that administers compliance with this law concerning this creditor is:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "federal_agency", "Federal Enforcement Agency (name and address): [REQUIRED]", y, { width: 140 });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "notice_prepared_by", "Notice Prepared By (Name/Title):", y, { width: 120 });
  y = addFormTextField(doc, "notice_reviewed_by", "Reviewed by Compliance Officer:", y, { width: 120 });
  y = addFormTextField(doc, "notice_date_sent", "Date Sent:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
