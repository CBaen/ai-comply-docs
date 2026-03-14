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
// DOCUMENT 3: AI Risk Classification Matrix
// ============================================================
export function generateRiskClassificationMatrix(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Risk Classification Matrix", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose ────────────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose", y);
  y = addWrappedText(
    doc,
    "This AI Risk Classification Matrix provides a structured framework for classifying " +
      "AI systems by risk level. The classification determines the level of governance " +
      "oversight, review requirements, and monitoring obligations for each system. " +
      "All AI systems operated by " + data.company.name + " must be classified before " +
      "deployment and reclassified whenever the system's scope, data inputs, or use " +
      "context materially changes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Risk Tiers ─────────────────────────────────────────────
  y = addSectionHeader(doc, "2. Risk Classification Tiers", y);

  // High Risk
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 30, 30);
  y = addWrappedText(doc, "TIER 1 — HIGH RISK", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Definition: AI systems that make or substantially influence consequential decisions " +
      "with material effects on individuals, including decisions about employment, lending, " +
      "housing, insurance, healthcare, education, or access to essential services.",
    MARGIN + 3,
    y,
    CONTENT_WIDTH - 3,
    LINE_HEIGHT
  );
  y += 2;

  const highRiskExamples = [
    "\u2022  Resume screening and candidate ranking tools used in hiring",
    "\u2022  Automated credit scoring or loan approval systems",
    "\u2022  Insurance underwriting or claims denial systems",
    "\u2022  Healthcare diagnosis or treatment recommendation systems",
    "\u2022  Tenant screening or housing allocation systems",
    "\u2022  Employee performance scoring or termination-support tools",
    "\u2022  Student admissions or grading systems",
    "\u2022  Law enforcement risk assessment tools",
  ];
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Examples:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  highRiskExamples.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Required Controls:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  const highRiskControls = [
    "\u2022  Steering Committee approval required before deployment",
    "\u2022  Pre-deployment bias audit by qualified independent assessor",
    "\u2022  Documented human review required for every consequential decision",
    "\u2022  Quarterly performance monitoring and bias testing",
    "\u2022  Written impact assessment completed before deployment",
    "\u2022  Consumer or employee disclosure required where legally mandated",
  ];
  highRiskControls.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // Medium Risk
  if (y > 230) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 100, 0);
  y = addWrappedText(doc, "TIER 2 — MEDIUM RISK", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Definition: AI systems that influence operational decisions, customer interactions, " +
      "or business processes in ways that could affect individuals but do not directly " +
      "determine high-stakes outcomes. Systems that generate content or recommendations " +
      "subject to human review before action.",
    MARGIN + 3,
    y,
    CONTENT_WIDTH - 3,
    LINE_HEIGHT
  );
  y += 2;

  const medRiskExamples = [
    "\u2022  Customer service chatbots that handle complaints or provide product information",
    "\u2022  Marketing personalization and targeted advertising systems",
    "\u2022  Content moderation or spam detection tools",
    "\u2022  Fraud detection systems with human review before account action",
    "\u2022  AI writing assistants used in customer-facing communications",
    "\u2022  Predictive maintenance or operations optimization tools",
  ];
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Examples:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  medRiskExamples.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Required Controls:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  const medRiskControls = [
    "\u2022  AI Compliance Officer approval required before deployment",
    "\u2022  Pre-deployment testing for accuracy and fairness",
    "\u2022  Semi-annual performance monitoring",
    "\u2022  Designated human reviewer responsible for AI-influenced decisions",
    "\u2022  Incident reporting procedures in place",
  ];
  medRiskControls.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // Low Risk
  if (y > 230) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 130, 60);
  y = addWrappedText(doc, "TIER 3 — LOW RISK", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Definition: AI systems used for internal productivity, research, or information " +
      "processing where outputs are reviewed by a human before any action is taken, " +
      "and where the system does not affect individuals' rights, opportunities, or access " +
      "to services.",
    MARGIN + 3,
    y,
    CONTENT_WIDTH - 3,
    LINE_HEIGHT
  );
  y += 2;

  const lowRiskExamples = [
    "\u2022  AI coding assistants (e.g., GitHub Copilot) reviewed by developers before use",
    "\u2022  Internal document summarization or search tools",
    "\u2022  Data analysis or visualization tools for internal reporting",
    "\u2022  AI-assisted scheduling or calendar management tools",
    "\u2022  Grammar and style checking tools for internal documents",
  ];
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Examples:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  lowRiskExamples.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += 2;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Required Controls:", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  const lowRiskControls = [
    "\u2022  Registration in AI System Inventory before use",
    "\u2022  Annual review during AI system inventory audit",
    "\u2022  Compliance with Organization's data handling policies",
  ];
  lowRiskControls.forEach((item) => {
    y = addWrappedText(doc, item, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // ── Classification Process ─────────────────────────────────
  y = addSectionHeader(doc, "3. Classification Process", y);
  const process = [
    "Step 1 — Identify the AI system: Name, vendor, purpose, and the decisions or " +
      "outputs it produces.",
    "Step 2 — Identify affected populations: Who is affected by the AI system's outputs? " +
      "Are these individuals employees, customers, applicants, or third parties?",
    "Step 3 — Assess decision impact: Do the AI system's outputs influence decisions " +
      "with material legal or similarly significant effects on individuals?",
    "Step 4 — Assign tier: Apply the definitions above. When in doubt, classify at the " +
      "higher tier. Reclassification downward requires Steering Committee approval.",
    "Step 5 — Apply required controls: Implement all controls for the assigned tier " +
      "before the AI system is deployed or continues operating.",
  ];
  process.forEach((step) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, step, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 4;
  });
  y += LINE_HEIGHT;

  // ── System Classification Log ──────────────────────────────
  y = addSectionHeader(doc, "4. AI System Classification Log", y);
  y = addWrappedText(
    doc,
    "Record each classified AI system below. Transfer completed classifications to the " +
      "AI System Inventory for ongoing tracking.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  for (let i = 1; i <= 3; i++) {
    if (y > 245) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, "System " + i + ":", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, `matrix_system_${i}_name`, "AI System Name:", y);
    y = addFormTextField(doc, `matrix_system_${i}_purpose`, "Purpose / Use Case:", y);
    y = addFormTextField(doc, `matrix_system_${i}_tier`, "Risk Tier (1/2/3):", y);
    y = addFormTextField(doc, `matrix_system_${i}_owner`, "System Owner:", y);
    y = addFormTextField(doc, `matrix_system_${i}_classified_by`, "Classified By & Date:", y);
    y += 4;
  }

  addDisclaimer(doc);
  return doc;
}
