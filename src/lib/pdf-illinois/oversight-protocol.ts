import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  ROLE_LABELS,
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Human Oversight Protocol
// ============================================================
export function generateOversightProtocol(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Human Oversight Protocol", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes a recommended human oversight protocol for AI systems used in employment decisions at ${data.company.name}. While 775 ILCS 5/2-102(L) requires that AI not have the effect of discrimination and that employees receive notice, specific oversight procedures are a best practice recommendation, not a statutory mandate.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Oversight structure
  y = addSectionHeader(doc, "1. Oversight Structure", y);
  y = addWrappedText(
    doc,
    `Primary Oversight Role: ${data.oversight.oversightRole || "[To be designated]"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `Decision Authority: ${ROLE_LABELS[data.oversight.aiRole] || "Not specified"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: Decision review process
  y = addSectionHeader(doc, "2. Decision Review Process", y);
  const reviewSteps = [
    "AI system generates recommendation or decision output.",
    `${data.oversight.oversightRole || "Designated reviewer"} reviews AI output before any employment action is taken.`,
    "Reviewer verifies AI recommendation against company policy and applicable law.",
    "Reviewer documents rationale for accepting or overriding AI recommendation.",
    "Final employment decision is recorded with AI output, reviewer decision, and rationale.",
  ];
  reviewSteps.forEach((step, idx) => {
    y = addWrappedText(
      doc,
      `  ${idx + 1}. ${step}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 3: Override authority
  y = addSectionHeader(doc, "3. Override Authority", y);
  y = addWrappedText(
    doc,
    `The ${data.oversight.oversightRole || "designated oversight role"} has full authority to override any AI-generated recommendation. Overrides must be documented with:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const overrideReqs = [
    "The original AI recommendation",
    "The final human decision",
    "The rationale for overriding",
    "Date and identity of the reviewer",
  ];
  overrideReqs.forEach((req) => {
    y = addWrappedText(
      doc,
      `  - ${req}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // Section 4: Employee/applicant appeal process
  y = addSectionHeader(
    doc,
    "4. Appeal Process for AI-Influenced Decisions",
    y
  );
  if (data.oversight.humanReview === "yes") {
    y = addWrappedText(
      doc,
      `${data.company.name} provides a process for individuals to request human-only review of AI-influenced employment decisions.`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  } else {
    y = addWrappedText(
      doc,
      `${data.company.name} is ${data.oversight.humanReview === "developing" ? "developing" : "establishing"} a process for individuals to request human-only review of AI-influenced employment decisions.`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  }
  y += 4;
  const appealSteps = [
    "Individual submits written request for human-only review to " +
      (data.contact.name || "[Compliance Contact]") +
      ".",
    "Request is acknowledged promptly.",
    "Review is conducted by a qualified reviewer who was not involved in the original AI-influenced decision.",
    "Individual is notified of the outcome in a timely manner.",
    "All appeal records are maintained for a minimum of 4 years, consistent with IDHR proposed recordkeeping rules.",
  ];
  appealSteps.forEach((step, idx) => {
    y = addWrappedText(
      doc,
      `  ${idx + 1}. ${step}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 5: Training requirements
  y = addSectionHeader(doc, "5. Training Requirements", y);
  y = addWrappedText(
    doc,
    "All personnel involved in AI-influenced employment decisions should complete training on the following (recommended best practice — not required by statute or proposed rules):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const training = [
    "Illinois HB3773 requirements and obligations",
    "Recognition of potential AI bias and discriminatory outcomes",
    "Override procedures and documentation requirements",
    "Employee notification requirements (applicant notification per proposed IDHR rules)",
    "Appeal process administration",
  ];
  training.forEach((t) => {
    y = addWrappedText(
      doc,
      `  - ${t}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;
  y = addWrappedText(
    doc,
    `Training frequency: ${REVIEW_LABELS[data.oversight.reviewFrequency] || "To be established"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  // Section 6: Contact
  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "6. Protocol Contact", y);
  y = addWrappedText(
    doc,
    `${data.contact.name}, ${data.contact.title || ""}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      data.contact.email,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      data.contact.phone,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );

  addDisclaimer(doc);
  return doc;
}
