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
// DOCUMENT 6: CA CCPA ADMT Compliance Checklist
// CCPA/CPRA Cal. Civ. Code § 1798.100 et seq. + CPPA ADMT Regulations (eff. 1-1-26)
// ============================================================
export function generateCCPAADMTChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "CA CCPA/CPRA ADMT Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify ${data.company.name}'s compliance with California Consumer Privacy Act/California Privacy Rights Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and California Privacy Protection Agency (CPPA) Automated Decision-Making Technology (ADMT) regulations (effective January 1, 2026). Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"}. Verify current CPPA ADMT guidance at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Business Threshold and Applicability",
      items: [
        "Business meets at least one CCPA applicability threshold: (1) gross annual revenues > $25M, (2) buys/sells/shares personal info of 100,000+ consumers/households annually, or (3) derives 50%+ of annual revenues from selling/sharing personal info",
        "ADMT is used in decisions with legal or similarly significant effects on California consumers",
        "Legal counsel confirmed ADMT activities are subject to CPPA ADMT regulations",
        "Ongoing applicability review as business activities change",
      ],
    },
    {
      title: "Pre-Use Notice (CPPA ADMT Regulations)",
      items: [
        "Pre-use notice delivered to consumers BEFORE ADMT is used for covered decisions",
        "Notice identifies ADMT system(s) used and their purpose",
        "Notice describes logic of ADMT in plain language",
        "Notice identifies the decision type and its significance to the consumer",
        "Notice includes consumer's right to opt out with opt-out instructions",
        "Notice includes right to request human review",
        "Notice is clear, prominent, and in the consumer's preferred language where applicable",
        "Notice is accessible to consumers with disabilities",
        "Notice reviewed and approved by privacy officer",
      ],
    },
    {
      title: "Consumer Opt-Out of ADMT Processing",
      items: [
        "Consumer opt-out mechanism implemented and functional",
        "At least one opt-out channel available (webform, email, phone, mail)",
        "Opt-out requests acknowledged and processed within established timeline",
        "Opt-out applied to all ADMT processing of consumer's personal information",
        "Opt-out requests logged with date, channel, and processing date",
        "Consumers not penalized or denied service for exercising opt-out right",
        "Alternative non-ADMT process available for consumers who opt out",
        "Penalties understood: \$2,500 per violation, \$7,500 per intentional violation, \$7,500 per child's information violation (Cal. Civ. Code \u00A7 1798.155)",
      ],
    },
    {
      title: "Consumer Access to ADMT Logic",
      items: [
        "Consumer access request process in place for ADMT logic information",
        "ADMT logic documentation maintained and can be produced on request",
        "Access request response process established (15 days to confirm, 45 days to respond recommended — verify current CPPA requirement)",
        "ADMT logic disclosure is specific enough to be meaningful to consumers",
        "Access request records maintained",
      ],
    },
    {
      title: "Risk Assessment for ADMT Processing",
      items: [
        "Risk assessment completed before using ADMT for covered decisions",
        "Risk assessment covers accuracy, fairness, transparency, and privacy risks",
        "Risk-benefit analysis documented",
        "Safeguards and controls identified and implemented",
        "Risk assessment reviewed annually or when ADMT system changes materially",
        "Risk assessment records maintained",
      ],
    },
    {
      title: "Human Review of ADMT Decisions",
      items: [
        "Human review process established for ADMT-assisted decisions",
        "Consumers informed of their right to request human review",
        "Human reviewer has authority to override ADMT output",
        "Human reviewer completes meaningful review (not rubber-stamp of AI output)",
        "Human reviewer is trained on ADMT system capabilities and limitations",
        "Human review timeline communicated to consumers",
        "Human review decisions documented",
      ],
    },
    {
      title: "Enforcement and Penalties Awareness",
      items: [
        "CPPA administrative enforcement authority understood (no cure period for CPPA enforcement after CPRA amendment)",
        "AG civil enforcement authority understood",
        "No private right of action for ADMT violations (private right only for data breaches under Cal. Civ. Code \u00A7 1798.150)",
        "Penalty tiers understood: \$2,500 per violation, \$7,500 per intentional violation, \$7,500 per child's information violation",
        "Legal counsel engaged for CCPA/CPRA ADMT compliance program review",
        "CPPA guidance monitored at cppa.ca.gov for updates",
      ],
    },
    {
      title: "Ongoing Compliance",
      items: [
        "ADMT inventory current and reviewed at least annually",
        "Pre-use notices reviewed and updated when ADMT changes materially",
        "Employee training on ADMT obligations and consumer rights completed",
        "Vendor agreements address ADMT compliance obligations",
        "ADMT compliance integrated into privacy program",
        "Consumer complaint handling process covers ADMT-related complaints",
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
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ca_checklist", y);

  addDisclaimer(doc);
  return doc;
}
