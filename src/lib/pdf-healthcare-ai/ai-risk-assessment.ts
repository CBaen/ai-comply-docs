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
  BODY_SIZE,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: AI Risk Assessment (Security Rule — 45 CFR 164.308(a)(1))
// ============================================================
export function generateAIRiskAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "HIPAA AI Risk Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This AI Risk Assessment is prepared for ${data.company.name} pursuant to the HIPAA Security Rule requirement at 45 CFR \u00A7 164.308(a)(1)(ii)(A), which requires covered entities and business associates to conduct an accurate and thorough assessment of the potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic protected health information (ePHI). This assessment addresses AI systems that process, transmit, or store ePHI.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: AI System Inventory
  y = addSectionHeader(doc, "1. AI Systems Processing ePHI", y);
  y = addWrappedText(
    doc,
    "List each AI system that processes, accesses, or stores ePHI. This inventory supports compliance with 45 CFR \u00A7 164.308(a)(1)(ii)(A) and 45 CFR \u00A7 164.310(d)(1) (device and media controls).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE);
    y = addWrappedText(doc, `${idx + 1}. ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, `  Vendor/Developer: ${sys.vendor || "Internal system"}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    if (sys.description) {
      y = addWrappedText(doc, `  Purpose: ${sys.description}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    }
    if (sys.decisions.length > 0) {
      y = addWrappedText(
        doc,
        `  Healthcare decisions influenced: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
        MARGIN,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y += 4;
  });

  // Section 2: Minimum Necessary Standard Analysis
  y = addSectionHeader(doc, "2. Minimum Necessary Standard (45 CFR \u00A7 164.502(b))", y);
  y = addWrappedText(
    doc,
    "The HIPAA Privacy Rule's minimum necessary standard (45 CFR \u00A7 164.502(b)) requires covered entities to make reasonable efforts to limit PHI access to the minimum necessary to accomplish the intended purpose. For AI systems, this requires:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const minNecItems = [
    "AI system accesses only PHI fields necessary for its specific function",
    "PHI field access has been reviewed and documented for each AI system",
    "Access controls limit AI system to authorized data categories only",
    "De-identification applied where AI function does not require identified PHI (45 CFR \u00A7 164.514)",
    "Regular review of PHI access scope as AI system capabilities change",
  ];
  minNecItems.forEach((item, idx) => {
    y = addFormCheckbox(doc, `min_nec_${idx}`, item, y);
  });
  y += LINE_HEIGHT;

  // Section 3: Threat and Vulnerability Analysis
  y = addSectionHeader(doc, "3. Threat and Vulnerability Analysis (45 CFR \u00A7 164.308(a)(1)(ii)(A))", y);
  y = addWrappedText(
    doc,
    "Identify reasonably anticipated threats to ePHI processed by AI systems. Rate each as HIGH / MEDIUM / LOW probability and HIGH / MEDIUM / LOW impact.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const threats = [
    "Unauthorized access to ePHI via AI system API or interface",
    "AI model inversion / membership inference attacks exposing training data PHI",
    "Data poisoning attacks corrupting AI outputs affecting clinical decisions",
    "Vendor/cloud provider breach exposing ePHI processed by AI",
    "Unencrypted ePHI transmission between AI components (45 CFR \u00A7 164.312(e)(1))",
    "Insufficient audit logging of AI access to ePHI (45 CFR \u00A7 164.312(b))",
    "AI system failure causing unavailability of clinical decision support",
    "Inadvertent PHI inclusion in AI model outputs or logs",
    "Third-party AI sub-processor without executed BAA (45 CFR \u00A7 164.308(b)(1))",
  ];

  threats.forEach((threat, idx) => {
    if (y > 262) { doc.addPage(); y = MARGIN; }
    y = addWrappedText(doc, `  Threat: ${threat}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addWrappedText(doc, "  Probability:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormCheckbox(doc, `threat_${idx}_prob_high`, "HIGH", y);
    y = addFormCheckbox(doc, `threat_${idx}_prob_med`, "MED", y);
    y = addFormCheckbox(doc, `threat_${idx}_prob_low`, "LOW", y);
    y = addWrappedText(doc, "  Impact:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormCheckbox(doc, `threat_${idx}_impact_high`, "HIGH", y);
    y = addFormCheckbox(doc, `threat_${idx}_impact_med`, "MED", y);
    y = addFormCheckbox(doc, `threat_${idx}_impact_low`, "LOW", y);
    y += LINE_HEIGHT;
  });

  // Section 4: Current Safeguards
  y = addSectionHeader(doc, "4. Current Safeguards Assessment", y);
  const safeguardCategories = [
    {
      title: "Administrative Safeguards (45 CFR \u00A7 164.308)",
      items: [
        "Security officer designated (45 CFR \u00A7 164.308(a)(2))",
        "AI vendor workforce training on PHI handling (45 CFR \u00A7 164.308(a)(5))",
        "Access authorization procedures for AI system PHI access (45 CFR \u00A7 164.308(a)(4))",
        "Contingency plan covers AI system failure affecting PHI availability (45 CFR \u00A7 164.308(a)(7))",
      ],
    },
    {
      title: "Physical Safeguards (45 CFR \u00A7 164.310)",
      items: [
        "Facility access controls for servers hosting AI systems with ePHI (45 CFR \u00A7 164.310(a)(1))",
        "Workstation use policies cover AI system access terminals (45 CFR \u00A7 164.310(b))",
        "Device/media disposal policy covers AI system storage media (45 CFR \u00A7 164.310(d)(1))",
      ],
    },
    {
      title: "Technical Safeguards (45 CFR \u00A7 164.312)",
      items: [
        "Unique user identification for AI system access to ePHI (45 CFR \u00A7 164.312(a)(2)(i))",
        "Automatic logoff implemented for AI system interfaces (45 CFR \u00A7 164.312(a)(2)(iii))",
        "Encryption of ePHI at rest in AI system storage (45 CFR \u00A7 164.312(a)(2)(iv))",
        "Encryption of ePHI in transit to/from AI system (45 CFR \u00A7 164.312(e)(2)(ii))",
        "Audit controls log AI system access and processing of ePHI (45 CFR \u00A7 164.312(b))",
        "Integrity controls verify ePHI not altered/destroyed by AI system (45 CFR \u00A7 164.312(c)(1))",
      ],
    },
  ];

  let cbIdx = 0;
  safeguardCategories.forEach((cat) => {
    y = addSectionHeader(doc, cat.title, y);
    cat.items.forEach((item) => {
      y = addFormCheckbox(doc, `safeguard_${cbIdx}`, item, y);
      cbIdx++;
    });
    y += 4;
  });

  // Section 5: Risk Level and Remediation
  y = addSectionHeader(doc, "5. Risk Level Determination and Remediation Plan", y);
  y = addWrappedText(
    doc,
    "Based on the threat/vulnerability analysis above, document the overall risk level for each AI system and required remediation actions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(doc, `AI System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `risk_level_${idx}`, "Overall Risk Level (HIGH / MEDIUM / LOW):", y, { width: 80 });
    y = addFormTextField(doc, `remediation_${idx}`, "Required Remediation Actions:", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, `remediation_date_${idx}`, "Target Remediation Date:", y, { width: 60 });
    y += LINE_HEIGHT;
  });

  // Sign-off
  y = addSectionHeader(doc, "6. Assessment Sign-off", y);
  y = addFormTextField(doc, "ra_completed_by", "Completed by (Security Officer):", y, { width: 100 });
  y = addFormTextField(doc, "ra_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ra_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "ra_next_review", "Next Review Date (required annually per 45 CFR \u00A7 164.308(a)(1)(ii)(A)):", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
