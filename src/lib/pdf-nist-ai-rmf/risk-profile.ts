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
  BODY_SIZE,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: AI Risk Profile (NIST AI RMF 1.0, AI 100-1)
// ============================================================
export function generateRiskProfile(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF \u2014 AI Risk Profile", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This AI Risk Profile documents ${data.company.name}'s current AI risk posture across the NIST AI RMF core functions (GOVERN, MAP, MEASURE, MANAGE). It synthesizes findings from each function into an organizational AI risk profile aligned with NIST AI 100-1. This profile is referenced by Colorado SB24-205 and Texas HB 149 as a framework for compliance documentation.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: AI System Portfolio
  y = addSectionHeader(doc, "1. AI System Portfolio Overview", y);
  y = addWrappedText(
    doc,
    `${data.company.name} operates ${data.aiSystems.length} AI system(s) covered by this risk profile:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE);
    y = addWrappedText(doc, `${idx + 1}. ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, `   Vendor: ${sys.vendor || "Internal"}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    if (sys.description) y = addWrappedText(doc, `   Purpose: ${sys.description}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `   Decision areas: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
    }
    y = addFormTextField(doc, `profile_${idx}_risk_tier`, "Risk Tier (1-Critical / 2-High / 3-Medium / 4-Low):", y, { width: 80 });
    y = addFormTextField(doc, `profile_${idx}_deployment`, "Deployment Status (Active / In Development / Pilot / Retired):", y, { width: 120 });
    y += 4;
  });

  // Section 2: Trustworthy AI Characteristic Assessment
  y = addSectionHeader(doc, "2. Trustworthy AI Characteristic Assessment (NIST AI 100-1)", y);
  y = addWrappedText(
    doc,
    "Rate each trustworthy AI characteristic on a scale of: Strong / Adequate / Developing / Insufficient. Document gaps and remediation plans.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const characteristics = [
    { name: "Valid and Reliable", description: "AI system produces accurate and reliable outputs within its defined scope." },
    { name: "Safe", description: "AI system failure modes are identified and safety controls are implemented." },
    { name: "Secure and Resilient", description: "AI system is protected against unauthorized access and adversarial attacks." },
    { name: "Accountable and Transparent", description: "AI system decisions are documented and explainable to appropriate parties." },
    { name: "Explainable and Interpretable", description: "AI system logic can be explained in understandable terms to affected individuals." },
    { name: "Privacy-Enhanced", description: "AI system incorporates privacy by design and minimizes privacy risks." },
    { name: "Fair (Bias Managed)", description: "AI system outcomes are tested for bias and disparate impact is minimized." },
  ];

  characteristics.forEach((char, idx) => {
    if (y > 248) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `${char.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, char.description, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, `char_${idx}_rating`, "Current Rating (Strong / Adequate / Developing / Insufficient):", y, { width: 100 });
    y = addFormTextField(doc, `char_${idx}_gap`, "Gap / Deficiency:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `char_${idx}_remediation`, "Remediation Plan:", y, { multiline: true, lines: 2 });
    y += 4;
  });

  // Section 3: GOVERN/MAP/MEASURE/MANAGE Maturity
  y = addSectionHeader(doc, "3. NIST AI RMF Function Maturity Assessment", y);
  y = addWrappedText(
    doc,
    "Rate each NIST AI RMF core function maturity level: Initial / Developing / Defined / Managed / Optimizing.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const functions = [
    { name: "GOVERN", description: "Organizational policies, accountability, and AI risk culture." },
    { name: "MAP", description: "AI system context, risk identification, and stakeholder impact analysis." },
    { name: "MEASURE", description: "AI risk measurement, testing, evaluation, and monitoring." },
    { name: "MANAGE", description: "AI risk treatment, incident response, and residual risk management." },
  ];

  functions.forEach((fn, idx) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, fn.name, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, fn.description, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, `fn_${idx}_maturity`, "Maturity Level:", y, { width: 100 });
    y = addFormTextField(doc, `fn_${idx}_notes`, "Notes:", y, { multiline: true, lines: 2 });
    y += 4;
  });

  // Section 4: Priority Risk Actions
  y = addSectionHeader(doc, "4. Priority Risk Actions This Period", y);
  for (let i = 1; i <= 5; i++) {
    y = addFormTextField(doc, `priority_${i}`, `Priority Action ${i}:`, y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, `priority_${i}_owner`, "Owner:", y, { width: 100 });
    y = addFormTextField(doc, `priority_${i}_date`, "Target Date:", y, { width: 60 });
    y += 4;
  }

  // Sign-off
  y = addSectionHeader(doc, "5. Risk Profile Approval", y);
  y = addFormTextField(doc, "profile_approved_by", "Approved by (AI Risk Lead):", y, { width: 120 });
  y = addFormTextField(doc, "profile_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "profile_exec_sponsor", "Executive Sponsor:", y, { width: 120 });
  y = addFormTextField(doc, "profile_next_review", "Next Review Date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "nist_profile", y);

  addDisclaimer(doc);
  return doc;
}
