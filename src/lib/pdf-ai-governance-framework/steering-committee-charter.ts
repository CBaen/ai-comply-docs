import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: AI Steering Committee Charter
// ============================================================
export function generateSteeringCommitteeCharter(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Steering Committee Charter", data);
  y = addTopDisclaimer(doc, y);

  // ── Establishment ──────────────────────────────────────────
  y = addSectionHeader(doc, "1. Establishment", y);
  y = addWrappedText(
    doc,
    data.company.name + " establishes the AI Steering Committee (the \"Committee\") as the " +
      "senior oversight body for the Organization's AI governance program. The Committee " +
      "is established pursuant to the AI Governance Policy and reports to the Chief " +
      "Executive Officer or designee.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Purpose & Authority ────────────────────────────────────
  y = addSectionHeader(doc, "2. Purpose & Authority", y);
  y = addWrappedText(
    doc,
    "The Committee is charged with:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const purposes = [
    "(a) Approving high-risk (Tier 1) AI use cases before deployment",
    "(b) Reviewing and approving the AI Governance Policy, AI Ethics Principles, " +
      "and AI Risk Classification Matrix on at least an annual basis",
    "(c) Receiving quarterly governance reports from the AI Compliance Officer",
    "(d) Reviewing material AI incidents and directing organizational response",
    "(e) Approving the annual AI governance budget and resource allocation",
    "(f) Resolving escalated disputes about AI risk tier classification or approval decisions",
    "(g) Approving the Organization's public AI transparency disclosures",
  ];
  purposes.forEach((p) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, p, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Membership ─────────────────────────────────────────────
  y = addSectionHeader(doc, "3. Membership", y);
  y = addWrappedText(
    doc,
    "The Committee shall consist of the following standing members:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const memberships = [
    { role: "Chair:", detail: "Chief Executive Officer or designated C-suite executive" },
    { role: "Vice Chair / AI Compliance Officer:", detail: "Responsible for day-to-day AI governance program management" },
    { role: "Legal Counsel:", detail: "Internal or external legal representative with AI law expertise" },
    { role: "Chief Technology Officer (or designee):", detail: "Technical oversight of AI systems" },
    { role: "Chief People Officer / HR Lead:", detail: "Oversight of AI in employment contexts" },
    { role: "Chief Risk Officer (or equivalent):", detail: "Enterprise risk management perspective" },
    { role: "Business Unit Representative:", detail: "Rotating representative from major AI-using business units" },
  ];

  memberships.forEach(({ role, detail }) => {
    if (y > 260) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, role, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, detail, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "sc_chair", "Appointed Chair (Name & Title):", y);
  y = addFormTextField(doc, "sc_compliance_officer", "AI Compliance Officer (Name & Title):", y);
  y = addFormTextField(doc, "sc_legal", "Legal Counsel (Name & Contact):", y);
  y += LINE_HEIGHT;

  // ── Meetings ───────────────────────────────────────────────
  y = addSectionHeader(doc, "4. Meetings", y);
  const meetingRules = [
    "Regular Meetings: The Committee shall meet quarterly, no less than four times " +
      "per year. The AI Compliance Officer shall schedule meetings and distribute " +
      "an agenda at least 5 business days in advance.",
    "Special Meetings: The Chair may convene a special meeting at any time to address " +
      "urgent AI governance matters, including material AI incidents, regulatory " +
      "developments, or emergency approval requests.",
    "Quorum: A majority of standing members constitutes a quorum. No formal vote may " +
      "be taken without a quorum present.",
    "Voting: Decisions are made by majority vote of members present. The Chair has a " +
      "tie-breaking vote. Abstentions count against quorum but not toward the majority.",
    "Minutes: The AI Compliance Officer shall prepare meeting minutes documenting " +
      "attendees, items discussed, votes taken, and action items. Minutes shall be " +
      "distributed within 5 business days and retained for at least 3 years.",
  ];
  meetingRules.forEach((rule) => {
    if (y > 260) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, "\u2022  " + rule, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 4;
  });
  y += LINE_HEIGHT;

  // ── Reporting ──────────────────────────────────────────────
  y = addSectionHeader(doc, "5. Reporting", y);
  y = addWrappedText(
    doc,
    "The AI Compliance Officer shall provide the Committee with a quarterly governance " +
      "report covering: (a) new AI systems approved or denied during the quarter; " +
      "(b) AI incidents reported and their resolution status; (c) performance monitoring " +
      "results for Tier 1 and Tier 2 systems; (d) regulatory developments; and " +
      "(e) upcoming review and renewal deadlines. The Committee shall provide an annual " +
      "governance summary to the Board of Directors or equivalent oversight body.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Charter Review ─────────────────────────────────────────
  y = addSectionHeader(doc, "6. Charter Review", y);
  y = addWrappedText(
    doc,
    "This Charter shall be reviewed annually by the Committee and updated as needed " +
      "to reflect changes in the Organization's AI activities, governance structure, " +
      "or applicable legal requirements.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "sc_charter_effective", "Charter Effective Date:", y);
  y = addFormTextField(doc, "sc_charter_next_review", "Next Review Date:", y);
  y = addFormTextField(doc, "sc_charter_adopted_by", "Adopted By (Name, Title, Signature):", y, {
    multiline: true,
    lines: 2,
  });

  addDisclaimer(doc);
  return doc;
}
