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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: ADMT Pre-Use Notice
// CCPA/CPRA Cal. Civ. Code § 1798.100 et seq. + CPPA ADMT Regulations (eff. 1-1-26)
// ============================================================
export function generatePreUseNotice(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Pre-Use Notice", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This notice is provided by ${data.company.name} pursuant to the California Consumer Privacy Act/California Privacy Rights Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and the California Privacy Protection Agency (CPPA) regulations on Automated Decision-Making Technology (ADMT), effective January 1, 2026. Before using ADMT to make or contribute to decisions that produce legal or similarly significant effects on California consumers, businesses are required to provide consumers with a pre-use notice. Verify current CPPA guidance at cppa.ca.gov before relying on this document.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: What Is ADMT and When This Notice Applies
  y = addSectionHeader(doc, "1. What Is ADMT and When This Notice Is Required", y);
  y = addWrappedText(
    doc,
    "Automated Decision-Making Technology (ADMT) means any system, software, or process, including one derived from machine learning, statistics, or other data processing or artificial intelligence, that processes personal information and uses computation as whole or part of a system to make or execute a decision or facilitate human decision-making that has a legal or similarly significant effect on a consumer.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "This pre-use notice is required when ADMT is used for decisions that produce legal or similarly significant effects, including:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const adtmDecisions = [
    "Financial or credit decisions",
    "Housing or rental decisions",
    "Insurance decisions",
    "Employment or independent contractor decisions",
    "Education enrollment or opportunity decisions",
    "Access to healthcare services",
    "Access to legal services or government benefits",
    "Other decisions with significant impact on consumer's life",
  ];
  let cbIdx = 0;
  adtmDecisions.forEach((item) => {
    y = addFormCheckbox(doc, `admt_dec_${cbIdx++}`, item, y);
  });
  y += LINE_HEIGHT;

  // Section 2: Notice Template
  y = addSectionHeader(doc, "2. Pre-Use Notice — Template for Consumer Delivery", y);
  y = addWrappedText(
    doc,
    "Deliver this notice to California consumers BEFORE using ADMT to process their personal information for the applicable decision type. The notice must be clear, prominent, and easy to understand.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 8;

  // --- Notice Content ---
  doc.setDrawColor(50, 100, 200);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 4);
  doc.setFillColor(240, 245, 255);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 4, "F");
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "NOTICE: Use of Automated Decision-Making Technology", MARGIN + 2, y + 3, CONTENT_WIDTH - 4, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y += 4;

  y = addWrappedText(
    doc,
    `${data.company.name} uses automated decision-making technology (ADMT) in connection with [describe the specific decision or process] that may affect you as a California consumer.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // AI systems used
  if (data.aiSystems.length > 0) {
    y = addWrappedText(doc, "ADMT System(s) Used:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    data.aiSystems.forEach((sys) => {
      y = addWrappedText(doc, `  \u2022 ${sys.name}${sys.vendor ? " (provided by " + sys.vendor + ")" : ""}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
      if (sys.description) y = addWrappedText(doc, `    Purpose: ${sys.description}`, MARGIN, y, CONTENT_WIDTH - 10, LINE_HEIGHT);
    });
    y += 4;
  }

  // Decision types
  if (data.aiSystems.some((s) => s.decisions.length > 0)) {
    const allDecisions = [...new Set(data.aiSystems.flatMap((s) => s.decisions))];
    y = addWrappedText(
      doc,
      `This ADMT is used in connection with: ${allDecisions.map((d) => DECISION_LABELS[d] || d).join(", ")}.`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;
  }

  // Logic disclosure
  y = addWrappedText(
    doc,
    "How ADMT Works: [Describe the logic of the ADMT system in plain language — what data it uses, how it processes that data, and how the output is used in the decision. This must be specific enough for a consumer to understand the significant factors considered.]",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // Opt-out right
  y = addWrappedText(
    doc,
    "Your Right to Opt Out: You have the right to opt out of the use of ADMT for this decision. To opt out, or to request that a human review the ADMT-assisted decision, contact:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(doc, `${data.contact.name}, ${data.contact.title || "Privacy Officer"}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.email) y = addWrappedText(doc, `Email: ${data.contact.email}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.phone) y = addWrappedText(doc, `Phone: ${data.contact.phone}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += 4;

  y = addWrappedText(
    doc,
    `For more information about your privacy rights under California law, see ${data.company.name}'s Privacy Policy at [URL] or contact us at the address above.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 3: Required Elements Checklist
  y = addSectionHeader(doc, "3. Pre-Use Notice Required Elements Checklist", y);
  const noticeElements = [
    "Notice delivered BEFORE ADMT is used to process consumer's personal information",
    "Notice identifies the ADMT system(s) and their purpose",
    "Notice describes the logic of the ADMT in plain language",
    "Notice identifies the decision type and its significance to the consumer",
    "Notice includes the consumer's right to opt out",
    "Notice includes instructions for how to exercise opt-out right",
    "Notice includes right to request human review",
    "Notice is written in clear, plain language",
    "Notice is provided in the language the consumer uses with the business (if applicable)",
    "Notice is accessible to consumers with disabilities",
    "Notice is prominent and easy to find",
    "Notice is provided to consumers before, not after, ADMT processing",
  ];
  noticeElements.forEach((item) => {
    y = addFormCheckbox(doc, `notice_el_${cbIdx++}`, item, y);
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "Notice Approved By", y);
  y = addFormTextField(doc, "notice_approved_by", "Approved by (Privacy Officer):", y, { width: 120 });
  y = addFormTextField(doc, "notice_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "notice_effective", "Effective Date:", y, { width: 60 });
  y = addFormTextField(doc, "notice_next_review", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
