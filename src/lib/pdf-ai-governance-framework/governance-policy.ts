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
// DOCUMENT 1: AI Governance Policy
// Aligned with NIST AI RMF Govern Function
// ============================================================
export function generateGovernancePolicy(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Governance Policy", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose & Scope ────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose & Scope", y);
  y = addWrappedText(
    doc,
    data.company.name +
      ' ("Organization") adopts this AI Governance Policy to establish the principles, ' +
      "structures, and responsibilities governing the development, procurement, deployment, " +
      "and monitoring of artificial intelligence systems across the Organization. This Policy " +
      "is aligned with the NIST AI Risk Management Framework (AI RMF 1.0) Govern function " +
      "and applicable state AI laws including Colorado SB24-205.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "This Policy applies to all AI systems operated by the Organization, including " +
      "systems developed internally, procured from third-party vendors, or accessed as " +
      "software-as-a-service. It applies to all employees, contractors, and partners " +
      "involved in any phase of AI system development, procurement, deployment, or use.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Organization Information:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Organization Name: " + data.company.name,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "State of Operation: " + (data.company.state || ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "Industry: " + (data.company.industry || ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Governance Objectives ──────────────────────────────────
  y = addSectionHeader(doc, "2. Governance Objectives", y);
  const objectives = [
    "(a) Ensure AI systems are deployed in a manner that is trustworthy, transparent, " +
      "and aligned with the Organization's values and applicable legal requirements.",
    "(b) Establish clear accountability for AI system decisions, including who approves " +
      "AI use cases, who monitors AI performance, and who is responsible for adverse outcomes.",
    "(c) Protect individuals from discriminatory, harmful, or unlawful AI outputs through " +
      "documented risk classification, human oversight, and ongoing monitoring.",
    "(d) Enable the Organization to demonstrate reasonable care in AI deployment to " +
      "regulators, customers, and business partners.",
    "(e) Provide a structured framework for evaluating new AI use cases before deployment " +
      "and monitoring existing systems throughout their lifecycle.",
  ];
  objectives.forEach((obj) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, obj, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Core Governance Principles ─────────────────────────────
  y = addSectionHeader(doc, "3. Core Governance Principles", y);
  const principles = [
    "Human Oversight: AI systems shall not make final consequential decisions without " +
      "meaningful human review. Human oversight is required for decisions with material " +
      "effects on individuals.",
    "Transparency: The Organization will maintain records of AI systems in use, their " +
      "purposes, their data inputs, and their decision-making criteria, to the extent " +
      "technically feasible.",
    "Accountability: Every AI system shall have a designated owner responsible for its " +
      "performance, risk management, and regulatory compliance.",
    "Risk Proportionality: Governance requirements shall be scaled to the risk level of " +
      "the AI system. High-risk systems require more rigorous review, monitoring, and " +
      "documentation than low-risk systems.",
    "Continuous Improvement: Governance structures will be reviewed annually and updated " +
      "to reflect changes in technology, law, and organizational AI use.",
    "Non-Discrimination: AI systems shall not be used in ways that produce unlawful " +
      "discriminatory outcomes based on protected characteristics.",
  ];
  principles.forEach((p, idx) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      (idx + 1) + ". " + p,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // ── Governance Structure ───────────────────────────────────
  y = addSectionHeader(doc, "4. Governance Structure", y);
  y = addWrappedText(
    doc,
    "The Organization's AI governance structure consists of three levels:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "4.1 AI Steering Committee:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "The AI Steering Committee provides strategic oversight of the Organization's AI " +
      "governance program. It approves high-risk AI use cases, reviews quarterly " +
      "governance reports, and resolves escalated AI governance disputes. See the " +
      "AI Steering Committee Charter for membership, quorum, and meeting requirements.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "4.2 AI Compliance Officer:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "The AI Compliance Officer manages day-to-day AI governance operations, maintains " +
      "the AI system registry, coordinates risk assessments, and reports to the AI " +
      "Steering Committee. See the AI Compliance Officer Role Description for duties.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "4.3 AI System Owners:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Each AI system has a designated owner who is accountable for its performance, " +
      "risk management, and compliance obligations. AI system owners report to the " +
      "AI Compliance Officer on system performance, incidents, and updates.",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "gov_ai_compliance_officer", "AI Compliance Officer (Name & Title):", y);
  y = addFormTextField(doc, "gov_steering_chair", "AI Steering Committee Chair (Name & Title):", y);
  y += LINE_HEIGHT;

  // ── Covered AI Systems ─────────────────────────────────────
  y = addSectionHeader(doc, "5. Covered AI Systems", y);
  y = addWrappedText(
    doc,
    "This Policy covers all AI systems operated by the Organization, including:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const covered = [
    "\u2022  AI systems developed internally by the Organization",
    "\u2022  AI systems procured from third-party vendors",
    "\u2022  AI features within commercial software products (e.g., AI-assisted CRM, ATS, ERP)",
    "\u2022  Generative AI tools used by employees in the course of their work",
    "\u2022  Automated decision tools that affect employees, customers, or other individuals",
  ];
  covered.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // ── Prohibited AI Uses ─────────────────────────────────────
  y = addSectionHeader(doc, "6. Prohibited AI Uses", y);
  y = addWrappedText(
    doc,
    "The following AI uses are prohibited without explicit Steering Committee approval " +
      "and, where applicable, legal review:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const prohibited = [
    "(a) AI systems that make final employment decisions without human review",
    "(b) AI systems that use prohibited characteristics (race, sex, religion, national origin, " +
      "disability, age) as decision inputs in ways that produce unlawful discriminatory outcomes",
    "(c) AI systems for real-time biometric identification in public spaces without explicit legal authorization",
    "(d) AI systems designed to manipulate individuals through subliminal techniques or exploit vulnerabilities",
    "(e) AI systems that generate or spread demonstrably false information to deceive the public",
  ];
  prohibited.forEach((item) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, item, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Policy Review & Update ─────────────────────────────────
  y = addSectionHeader(doc, "7. Policy Review & Update", y);
  y = addWrappedText(
    doc,
    "This Policy shall be reviewed and updated at least annually and whenever material " +
      "changes occur in the Organization's AI use, applicable law, or regulatory guidance. " +
      "The AI Compliance Officer is responsible for initiating reviews and presenting " +
      "updates to the AI Steering Committee for approval.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "gov_effective_date", "Policy Effective Date:", y);
  y = addFormTextField(doc, "gov_next_review", "Next Scheduled Review Date:", y);
  y = addFormTextField(doc, "gov_approved_by", "Approved By (Name, Title, Signature):", y, {
    multiline: true,
    lines: 2,
  });

  addDisclaimer(doc);
  return doc;
}
