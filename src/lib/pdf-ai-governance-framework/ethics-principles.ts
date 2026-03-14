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
// DOCUMENT 2: AI Ethics Principles Statement
// ============================================================
export function generateEthicsPrinciples(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Ethics Principles Statement", data);
  y = addTopDisclaimer(doc, y);

  // ── Statement Purpose ──────────────────────────────────────
  y = addSectionHeader(doc, "1. Statement Purpose", y);
  y = addWrappedText(
    doc,
    data.company.name +
      " is committed to developing and using artificial intelligence in a manner that " +
      "is ethical, responsible, and aligned with our organizational values. This AI " +
      "Ethics Principles Statement articulates the values that guide our AI decisions " +
      "and serves as the ethical foundation for our AI Governance Policy and all AI " +
      "system development and deployment activities.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Core Ethics Principles ─────────────────────────────────
  y = addSectionHeader(doc, "2. Our AI Ethics Principles", y);

  const principles = [
    {
      title: "2.1 Fairness",
      body:
        "We are committed to AI systems that treat all individuals equitably. We will " +
        "evaluate AI systems for discriminatory impact across protected demographic groups " +
        "and take corrective action when discriminatory patterns are identified. We will " +
        "not use protected characteristics — including race, color, national origin, sex, " +
        "age, disability, or religion — as inputs to AI systems in ways that produce " +
        "unlawful discriminatory outcomes.",
    },
    {
      title: "2.2 Transparency",
      body:
        "We are committed to being open about how we use AI. We will maintain an " +
        "inventory of AI systems we operate, document their purposes and decision-making " +
        "logic, and disclose AI use to affected individuals where legally required or " +
        "where transparency serves the public interest. We will not use AI to obscure " +
        "the basis for decisions in ways that deny individuals meaningful recourse.",
    },
    {
      title: "2.3 Human Oversight",
      body:
        "We believe that consequential decisions affecting people — in hiring, lending, " +
        "healthcare, or other high-stakes contexts — require meaningful human involvement. " +
        "We will not allow AI systems to make final consequential decisions without human " +
        "review. We will designate human reviewers who are empowered to override AI " +
        "recommendations when warranted.",
    },
    {
      title: "2.4 Privacy",
      body:
        "We are committed to protecting individual privacy in AI systems. We will minimize " +
        "data collection to what is necessary for the AI system's stated purpose, apply " +
        "data protection measures to AI training data and inputs, and adhere to applicable " +
        "privacy laws governing AI use of personal data.",
    },
    {
      title: "2.5 Safety & Reliability",
      body:
        "We are committed to AI systems that perform reliably and do not cause harm. We " +
        "will test AI systems before deployment, monitor their performance on an ongoing " +
        "basis, and establish incident response procedures for AI failures or harms. We " +
        "will take corrective action promptly when AI systems underperform or cause harm.",
    },
    {
      title: "2.6 Accountability",
      body:
        "We believe that every AI system should have a responsible human owner. We will " +
        "designate accountable individuals for every AI system we operate, document who " +
        "is responsible for each system's performance, and ensure that affected individuals " +
        "have a meaningful avenue to raise concerns about AI decisions that affect them.",
    },
  ];

  principles.forEach(({ title, body }) => {
    if (y > 250) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, title, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, body, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── Application of These Principles ───────────────────────
  y = addSectionHeader(doc, "3. Application of These Principles", y);
  y = addWrappedText(
    doc,
    "These principles apply to all AI activities at " + data.company.name + ", including:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const applications = [
    "\u2022  Evaluating whether to adopt a new AI system or capability",
    "\u2022  Designing or procuring AI systems",
    "\u2022  Deploying AI systems into production environments",
    "\u2022  Monitoring AI system performance and outcomes",
    "\u2022  Responding to AI incidents or complaints",
    "\u2022  Communicating with customers, employees, or regulators about AI",
  ];
  applications.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // ── Conflict Resolution ────────────────────────────────────
  y = addSectionHeader(doc, "4. Resolving Ethical Conflicts", y);
  y = addWrappedText(
    doc,
    "When AI deployment decisions create tension between these principles — for example, " +
      "when a more capable AI system also creates higher privacy risks — the AI Steering " +
      "Committee will resolve the conflict by weighing: (a) the severity and reversibility " +
      "of potential harms; (b) the breadth of impact on affected individuals; and (c) " +
      "whether less risky alternatives exist that achieve the same legitimate objective. " +
      "Decisions that prioritize commercial benefit over individual safety or fairness are " +
      "inconsistent with these principles.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Commitment & Signature ─────────────────────────────────
  y = addSectionHeader(doc, "5. Organizational Commitment", y);
  y = addWrappedText(
    doc,
    "These principles are not aspirational — they are binding commitments that govern " +
      "our AI program. Employees, contractors, and partners who develop, procure, or use " +
      "AI systems for " + data.company.name + " are expected to uphold these principles. " +
      "Violations may result in disciplinary action up to and including termination.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "ethics_signed_by", "Signed By (Name & Title):", y);
  y = addFormTextField(doc, "ethics_effective_date", "Effective Date:", y);
  y = addFormTextField(doc, "ethics_next_review", "Next Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
