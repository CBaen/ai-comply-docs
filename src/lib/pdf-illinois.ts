/**
 * PDF Document Generator for Illinois HB3773 Compliance Package.
 * Ported from compliance-tool/js/pdf-generator.js to TypeScript for Next.js.
 *
 * Generates 6 core documents + 2 add-on documents:
 * 1. Employee/Applicant AI Notification Letter
 * 2. AI System Inventory
 * 3. Impact Assessment Framework
 * 4. Human Oversight Protocol
 * 5. Compliance Checklist
 * 6. Accommodation Request Form
 * 7. Manager Training Guide (add-on)
 * 8. Employee FAQ (add-on)
 */

import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";
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
  DATA_INPUT_LABELS,
  PROTECTED_LABELS,
  ROLE_LABELS,
  REVIEW_LABELS,
} from "./pdf-helpers";

// ============================================================
// DOCUMENT 1: Employee/Applicant AI Notification Letter
// ============================================================
export function generateNotificationLetter(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Usage Notification", data);
  y = addTopDisclaimer(doc, y);

  y = addSectionHeader(
    doc,
    "Notice of Artificial Intelligence Use in Employment Decisions",
    y
  );

  const intro = `Dear Employee/Applicant,\n\nPursuant to 775 ILCS 5/2-102(L)(2) (P.A. 103-804, eff. January 1, 2026), ${data.company.name} is providing this notice regarding our use of artificial intelligence ("AI") in employment-related decisions. Section 2-102(L)(2) makes it a civil rights violation "for an employer to fail to provide notice to an employee that the employer is using artificial intelligence" in covered employment decisions. This notice discloses, consistent with the statute and proposed IDHR implementing rules (56 Ill. Adm. Code Part 2520, Subpart J): (1) the AI systems we use and their developers/vendors, (2) the employment decisions these systems influence or facilitate, (3) the categories of data processed, and (4) your rights under Illinois law.`;
  y = addWrappedText(doc, intro, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // Required Disclosure: AI Systems (IDHR Draft Rules mandate product name, developer, vendor)
  y = addSectionHeader(doc, "AI Systems Used by " + data.company.name, y);

  data.aiSystems.forEach((sys, idx) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE);
    y = addWrappedText(
      doc,
      `${idx + 1}. ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");

    // Developer/Vendor (per proposed IDHR Subpart J draft rules, pending final adoption)
    y = addWrappedText(
      doc,
      `Developer/Vendor: ${sys.vendor || "Internal system"}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );

    // Purpose and data categories (per proposed IDHR Subpart J draft rules, pending final adoption)
    if (sys.description) {
      y = addWrappedText(
        doc,
        `Purpose: ${sys.description}`,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }

    // Employment decisions influenced (per proposed IDHR Subpart J draft rules, pending final adoption)
    if (sys.decisions.length > 0) {
      const decText =
        "Employment decisions influenced or facilitated: " +
        sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ");
      y = addWrappedText(
        doc,
        decText,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }

    // Categories of data processed (per proposed IDHR Subpart J draft rules, pending final adoption)
    if (data.dataInputs.length > 0) {
      const dataText =
        "Categories of personal/employee data processed: " +
        data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ");
      y = addWrappedText(
        doc,
        dataText,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y += 4;
  });

  // Job positions where AI is used (per proposed IDHR Subpart J draft rules, pending final adoption)
  y = addSectionHeader(doc, "Positions Where AI Is Used", y);
  y = addWrappedText(
    doc,
    `AI systems listed above are used in connection with ${data.aiSystems
      .flatMap((s) => s.decisions)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((d) => DECISION_LABELS[d] || d)
      .join(", ")
      .toLowerCase() || "employment"} decisions across applicable positions at ${data.company.name}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // How AI outputs are used
  y = addSectionHeader(doc, "How AI Outputs Are Used", y);
  const roleDesc = ROLE_LABELS[data.oversight.aiRole] || "Not specified";
  y = addWrappedText(
    doc,
    `Decision process: ${roleDesc}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `Human oversight: All AI-influenced decisions are overseen by ${data.oversight.oversightRole || "[Designated Oversight Role]"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Anti-discrimination statement — obligation from 775 ILCS 5/2-102(L)(1); format per proposed Subpart J
  y = addSectionHeader(doc, "Non-Discrimination Statement", y);
  y = addWrappedText(
    doc,
    "Per 775 ILCS 5/2-102(L)(1), it is a civil rights violation:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"[F]or an employer to use artificial intelligence that has the effect of subjecting employees to discrimination on the basis of protected classes under this Article or to use zip codes as a proxy for protected classes under this Article."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 10,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += 4;
  y = addWrappedText(
    doc,
    `${data.company.name} is committed to ensuring that its use of AI in employment decisions does not have the effect of subjecting employees to discrimination on the basis of any protected class under the Illinois Human Rights Act, and does not use zip codes as a proxy for protected classes.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Reasonable accommodation rights (per proposed IDHR rules and existing IHRA obligations)
  y = addSectionHeader(doc, "Reasonable Accommodation", y);
  y = addWrappedText(
    doc,
    `Consistent with IDHR's proposed implementing rules (Subpart J) and existing IHRA reasonable accommodation obligations, you may request a reasonable accommodation regarding AI-assisted employment processes. To request an accommodation, contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `${data.contact.name}, ${data.contact.title || ""}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      `Email: ${data.contact.email}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      `Phone: ${data.contact.phone}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  y += LINE_HEIGHT;

  // Rights under Illinois law
  y = addSectionHeader(doc, "Your Rights Under Illinois Law", y);
  const rights = [
    "You have the right to be notified when AI is used to influence or facilitate employment decisions that affect you.",
    "You have the right to be free from discriminatory effects of AI in employment decisions, including discrimination through the use of zip codes as proxies for protected classes.",
    "Consistent with IDHR's proposed implementing rules and existing IHRA reasonable accommodation obligations, you may request a reasonable accommodation regarding AI-assisted employment processes.",
    "You may file a charge of discrimination with the Illinois Department of Human Rights (IDHR) if you believe AI has been used in a manner that has the effect of subjecting you to discrimination. (775 ILCS 5/7A-102)",
    "You may also pursue a civil action under the Illinois Human Rights Act. Remedies in court may include actual damages, back pay, and attorneys' fees. (775 ILCS 5/8A-104) Separately, IDHR may assess civil penalties against employers found in violation. (SB 2487)",
  ];
  rights.forEach((right) => {
    y = addWrappedText(
      doc,
      "  - " + right,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });

  // Contact information
  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Contact Information", y);
  y = addWrappedText(
    doc,
    `For questions about ${data.company.name}'s use of AI in employment decisions, contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `${data.contact.name}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  if (data.contact.title)
    y = addWrappedText(
      doc,
      data.contact.title,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      data.contact.email,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      data.contact.phone,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );

  // Notice schedule
  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Notice Schedule", y);
  y = addWrappedText(
    doc,
    "This notice is provided pursuant to 775 ILCS 5/2-102(L)(2) and in accordance with proposed IDHR Subpart J rules (56 Ill. Adm. Code Part 2520, pending formal adoption). It will be updated and reissued:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    "  - Annually to all current employees",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "  - Within 30 days of adopting a new or substantially updated AI system",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "  - In all job postings for prospective employees",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y += LINE_HEIGHT;
  y = addWrappedText(doc, `Sincerely,`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;
  y = addWrappedText(
    doc,
    data.company.name,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    data.generatedDate,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 2: AI System Inventory
// ============================================================
export function generateSystemInventory(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Inventory", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document inventories all artificial intelligence systems used by " +
      data.company.name +
      " in employment-related decisions, to support compliance with 775 ILCS 5/2-102(L) (Illinois HB3773).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Company overview
  y = addSectionHeader(doc, "Organization Overview", y);
  const overview: [string, string][] = [
    ["Legal Name", data.company.name],
    ["State of Incorporation", data.company.state || "Not specified"],
    ["Number of Employees", data.company.size || "Not specified"],
    ["Primary Industry", data.company.industry || "Not specified"],
    ["Inventory Date", data.generatedDate],
  ];
  overview.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      `${label}: `,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y -= LINE_HEIGHT;
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, value, MARGIN + 50, y, CONTENT_WIDTH - 50, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // System details
  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `System ${idx + 1}: ${sys.name}`, y);

    const details: [string, string][] = [
      ["System Name", sys.name],
      ["Vendor/Provider", sys.vendor || "Internal / Not specified"],
      ["Description", sys.description || "Not provided"],
      [
        "Decisions Influenced",
        sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ") ||
          "None specified",
      ],
      [
        "Data Inputs",
        data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ") ||
          "None specified",
      ],
      [
        "Protected Characteristics Accessible",
        data.protectedCharacteristics
          .map((p) => PROTECTED_LABELS[p] || p)
          .join(", ") || "None",
      ],
      [
        "Bias Audit Status",
        data.biasAudit === "yes"
          ? "Completed"
          : data.biasAudit === "in_progress"
          ? "In Progress"
          : data.biasAudit === "planned"
          ? "Planned"
          : "Not conducted",
      ],
      ["Human Oversight Role", data.oversight.oversightRole || "Not specified"],
      [
        "Review Frequency",
        REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified",
      ],
    ];

    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(BODY_SIZE);
      doc.text(`${label}:`, MARGIN + 2, y);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(
        doc,
        value,
        MARGIN + 60,
        y,
        CONTENT_WIDTH - 62,
        LINE_HEIGHT
      );
      y += 1;
    });
    y += LINE_HEIGHT;
  });

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 3: Impact Assessment Framework
// ============================================================
export function generateImpactAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Impact Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document provides a recommended framework for assessing the potential discriminatory impact of AI systems used in employment decisions by " +
      data.company.name +
      ". While 775 ILCS 5/2-102(L) prohibits AI use that has the effect of discrimination, the statute does not prescribe a specific assessment methodology. This framework follows federal EEOC Uniform Guidelines (29 C.F.R. \u00A7 1607) and industry best practices.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Scope
  y = addSectionHeader(doc, "1. Assessment Scope", y);
  y = addWrappedText(
    doc,
    `This assessment covers ${data.aiSystems.length} AI system(s) used in employment decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  data.aiSystems.forEach((sys) => {
    y = addWrappedText(
      doc,
      `  - ${sys.name}: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // Section 2: Protected characteristics analysis
  y = addSectionHeader(doc, "2. Protected Characteristics Analysis", y);
  if (
    data.protectedCharacteristics.includes("none") ||
    data.protectedCharacteristics.length === 0
  ) {
    y = addWrappedText(
      doc,
      "The organization reports that AI systems do not have direct access to protected characteristics. However, proxy discrimination remains a risk (e.g., zip codes correlating with race, name patterns correlating with ethnicity).",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  } else {
    const chars = data.protectedCharacteristics
      .filter((c) => c !== "none")
      .map((c) => PROTECTED_LABELS[c] || c)
      .join(", ");
    y = addWrappedText(
      doc,
      `AI systems have access to the following protected characteristics: ${chars}. Heightened scrutiny is required to ensure these characteristics do not produce discriminatory outcomes.`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  }
  y += LINE_HEIGHT;

  // Section 3: Risk Assessment Matrix
  y = addSectionHeader(doc, "3. Risk Assessment Matrix", y);
  y = addWrappedText(
    doc,
    "Complete the following for each AI system. Rate risk as HIGH / MEDIUM / LOW.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const riskCategories = [
    "Disparate impact on racial/ethnic groups",
    "Gender-based outcome disparities",
    "Age-related discrimination patterns",
    "Disability accommodation gaps",
    "Proxy variable discrimination (zip code, name, school)",
    "Training data representativeness",
    "Output explainability and transparency",
    "Human override availability and usage rate",
  ];

  data.aiSystems.forEach((sys, sIdx) => {
    y = addWrappedText(
      doc,
      "System: " + sys.name,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
    riskCategories.forEach((cat, cIdx) => {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      const prefix = "risk_" + sIdx + "_" + cIdx + "_";
      doc.setFontSize(BODY_SIZE);
      doc.setFont("helvetica", "normal");
      // Visual fallback: render as text checkboxes since AcroForm access is internal to pdf-helpers
      y = addWrappedText(
        doc,
        "  [ ] HIGH  [ ] MED  [ ] LOW  -  " + cat,
        MARGIN,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
      // Suppress unused variable warning
      void prefix;
      y += LINE_HEIGHT + 1;
    });
    y += LINE_HEIGHT;
  });

  // Section 4: Mitigation strategies
  y = addSectionHeader(doc, "4. Mitigation Strategies", y);
  const mitigations = [
    "Regular bias auditing using statistical tests (per federal EEOC Uniform Guidelines, 29 C.F.R. \u00A7 1607 four-fifths rule)",
    "Diverse and representative training data review",
    "Human oversight for all consequential decisions",
    "Applicant/employee appeal process for AI-influenced decisions",
    "Regular model retraining and validation",
    "Third-party audit engagement (recommended annually)",
    "Documentation of all model changes and their impact on outcomes",
  ];
  mitigations.forEach((m, idx) => {
    y = addFormCheckbox(doc, "mitigation_" + idx, m, y);
  });
  y += LINE_HEIGHT;

  // Section 5: Review schedule
  y = addSectionHeader(doc, "5. Review Schedule", y);
  const freq =
    REVIEW_LABELS[data.oversight.reviewFrequency] || "Not currently scheduled";
  y = addWrappedText(
    doc,
    `Current review frequency: ${freq}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    "Recommended minimum: Quarterly review of AI system outputs for disparate impact, with annual comprehensive bias audit.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 6: Sign-off — fillable fields
  y = addSectionHeader(doc, "6. Assessment Sign-off", y);
  y = addFormTextField(doc, "assess_completed_by", "Assessment completed by:", y, { width: 100 });
  y = addFormTextField(doc, "assess_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "assess_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "assess_next_review", "Next review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}


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


// ============================================================
// DOCUMENT 5: Compliance Checklist
// ============================================================
export function generateComplianceChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "HB3773 Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify and maintain compliance with Illinois HB3773 for ${data.company.name}. Review and update at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "quarterly"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Notice Requirements (Proposed IDHR Subpart J Rules)",
      items: [
        "Notice includes AI product name, developer, and vendor for each system",
        "Notice identifies which employment decisions each AI system influences or facilitates",
        "Notice states purpose of AI system and categories of personal/employee data processed",
        "Notice identifies types of job positions where AI is used",
        "Notice names contact person for questions about AI system use",
        "Notice includes right to request reasonable accommodation with instructions",
        "Notice includes anti-discrimination statement (no discriminatory effect, no zip code proxies)",
        "Notice written in plain language",
        "Notice available in languages commonly spoken by workforce",
        "Notice accessible to employees with disabilities",
      ],
    },
    {
      title: "Notice Posting Locations (Per Proposed IDHR Subpart J Rules)",
      items: [
        "Posted in employee handbooks/manuals",
        "Posted on physical workplace notice boards",
        "Posted on company intranet/website",
        "Included in job postings for prospective employees",
      ],
    },
    {
      title: "Notice Timing (Per Proposed IDHR Subpart J Rules)",
      items: [
        "Annual notice provided to all current employees",
        "Notice provided within 30 days of adopting new or substantially updated AI systems",
        "Prospective employees notified via job postings before AI is used",
      ],
    },
    {
      title: "AI System Documentation & Inventory (Recommended Best Practice)",
      items: [
        "Complete inventory of all AI systems used in employment decisions",
        "Developer and vendor information documented for each third-party AI system",
        "Categories of personal/employee data collected or processed documented",
        "Employment decisions influenced by each system documented",
        "Protected characteristics access documented and reviewed",
        "Vendor due diligence completed for third-party AI providers",
      ],
    },
    {
      title:
        "Anti-Discrimination Compliance (Statutory \u2014 775 ILCS 5/2-102(L)(1))",
      items: [
        "AI systems audited for potential disparate impact on protected classes",
        "Zip code usage reviewed — not used as proxy for protected characteristics",
        "Disparate impact analysis completed (per federal EEOC Uniform Guidelines, 29 C.F.R. \u00A7 1607)",
        "Risk mitigation strategies identified and documented",
        "Assessment reviewed and signed by designated authority",
      ],
    },
    {
      title:
        "Human Oversight & Accommodation (Recommended Best Practice / Proposed IDHR Rules)",
      items: [
        "Designated oversight role assigned and documented",
        "Decision review process established and documented",
        "Override authority and documentation requirements in place",
        "Reasonable accommodation request process established and documented",
        "All oversight personnel trained on 775 ILCS 5/2-102(L) requirements and proposed IDHR Subpart J rules",
      ],
    },
    {
      title: "Recordkeeping (4-Year Retention \u2014 IDHR Proposed Rules)",
      items: [
        "All AI-related notices, postings, and disclosures preserved for 4 years",
        "Records of AI system use in employment decisions preserved for 4 years",
        "Records preserved until any IDHR charge is fully adjudicated, regardless of filing date (per general IHRA practice)",
        "Record retention policy documented and assigned to responsible party",
      ],
    },
    {
      title: "Ongoing Compliance (Recommended Best Practice)",
      items: [
        "Regular bias audits scheduled (recommended: annually)",
        "Regulatory monitoring for HB3773 amendments and IDHR rule updates",
        "Employee complaint / feedback mechanism in place",
        "Manager training on notice, recordkeeping, and anti-discrimination obligations",
        "Legal counsel review of compliance program (recommended: annually)",
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

  // Sign-off — fillable fields
  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "checklist_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "checklist_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "checklist_signature", "Signature:", y, { width: 100 });

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// DOCUMENT 6: Accommodation Request Form
// ============================================================
export function generateAccommodationForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Accommodation Request Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "Use this form to request an accommodation related to AI-assisted employment processes at " +
      data.company.name +
      ". Complete all sections and submit to " +
      (data.contact.name || "your compliance contact") +
      (data.contact.email ? " at " + data.contact.email : "") +
      ".",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Employee Info — fillable text fields
  y = addSectionHeader(doc, "Section 1: Your Information", y);
  y = addFormTextField(doc, "employee_name", "Full Name:", y);
  y = addFormTextField(
    doc,
    "employee_dept",
    "Department / Position Applied For:",
    y
  );
  y = addFormTextField(
    doc,
    "employee_id",
    "Employee ID (if applicable):",
    y
  );
  y = addFormTextField(doc, "request_date", "Date:", y);
  y += 4;

  // Section 2: AI Systems — checkboxes (pre-populated from questionnaire data)
  y = addSectionHeader(doc, "Section 2: Which AI System(s)?", y);
  y = addWrappedText(
    doc,
    "Check all AI systems your request relates to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  data.aiSystems.forEach((sys, idx) => {
    const label = sys.name + (sys.vendor ? " (" + sys.vendor + ")" : "");
    y = addFormCheckbox(doc, "ai_system_" + idx, label, y);
  });
  y = addFormCheckbox(doc, "ai_system_other", "Other", y);
  y = addFormTextField(doc, "ai_system_other_name", "", y);
  y += 4;

  // Section 3: Reason — checkboxes
  y = addSectionHeader(doc, "Section 3: Reason for Request", y);
  y = addWrappedText(
    doc,
    "I am requesting an accommodation because the AI-assisted process creates a barrier related to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "basis_disability",
    "A disability \u2014 physical, mental, or sensory",
    y
  );
  y = addFormCheckbox(
    doc,
    "basis_religion",
    "A sincerely held religious practice or observance",
    y
  );
  y = addFormCheckbox(
    doc,
    "basis_pregnancy",
    "Pregnancy, childbirth, or a related condition",
    y
  );
  y += 4;

  // Section 4: Accommodation type — checkboxes
  y = addSectionHeader(doc, "Section 4: Accommodation Requested", y);
  y = addWrappedText(
    doc,
    "What type of accommodation would help? (Check all that apply)",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "accom_human_review",
    "Human-only review of AI-influenced decision(s)",
    y
  );
  y = addFormCheckbox(
    doc,
    "accom_alt_method",
    "Alternative assessment method that does not use this AI system",
    y
  );
  y = addFormCheckbox(
    doc,
    "accom_modify_data",
    "Modification to how the AI system processes my data",
    y
  );
  y = addFormCheckbox(doc, "accom_other", "Other (describe below)", y);
  y += 4;

  // Section 5: Description — fillable multi-line text area
  y = addSectionHeader(doc, "Section 5: Tell Us More", y);
  y = addFormTextField(
    doc,
    "description",
    "Describe the barrier you are experiencing and any details that would help us find the right accommodation:",
    y,
    { multiline: true, lines: 8 }
  );
  y += 4;

  // Section 6: Signature — fillable fields
  y = addSectionHeader(doc, "Section 6: Acknowledgment & Signature", y);
  y = addWrappedText(
    doc,
    "I understand that " +
      data.company.name +
      " will review this request and work with me to find an appropriate accommodation. Submitting this form does not guarantee a specific accommodation will be granted, but retaliation for making this request is prohibited by law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "signature", "Signature:", y, { width: 100 });
  y = addFormTextField(doc, "signature_date", "Date:", y, { width: 60 });
  y += LINE_HEIGHT;

  // For Office Use Only — fillable fields for HR
  y = addSectionHeader(doc, "For Office Use Only", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "CONFIDENTIALITY: Any medical information on this form must be kept separate from the employee's personnel file.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += 4;
  y = addFormTextField(doc, "office_received_by", "Received by:", y, { width: 100 });
  y = addFormTextField(doc, "office_received_date", "Date received:", y, { width: 60 });
  y = addFormTextField(doc, "office_action", "Action taken:", y);
  y = addFormCheckbox(
    doc,
    "office_accepted_yes",
    "Employee accepted proposed accommodation",
    y
  );
  y = addFormCheckbox(
    doc,
    "office_accepted_no",
    "Employee did not accept — continued interactive process",
    y
  );
  y = addFormTextField(
    doc,
    "office_continued_process",
    "Describe continued interactive process:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "office_response_date",
    "Response provided to employee on:",
    y,
    { width: 80 }
  );
  y = addFormTextField(doc, "office_approved_by", "Approved by:", y, { width: 100 });
  y += LINE_HEIGHT;

  // Appendix: Legal References (static text, not fillable)
  y = addSectionHeader(doc, "Appendix: Legal References", y);
  y = addWrappedText(
    doc,
    "This form is grounded in the following Illinois and federal law. HR and legal counsel can use these citations for compliance review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(doc, "Illinois law:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  const enactedLaw = [
    "Disability accommodation: 775 ILCS 5/2-102(B); 56 Ill. Admin. Code 2535.100; 56 Ill. Admin. Code 2535.120",
    "Religious accommodation: 775 ILCS 5/2-102(A)",
    "Pregnancy accommodation: 775 ILCS 5/2-102(J)",
    "Undue hardship standard: 775 ILCS 5/2-104",
    "Anti-retaliation: 775 ILCS 5/6-101",
    "Interactive process: 56 Ill. Admin. Code 2535.120; accommodation must be acceptable to both parties: 56 Ill. Admin. Code 2535.220",
  ];
  enactedLaw.forEach((item) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + item,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += 4;
  y = addWrappedText(doc, "Federal law:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  const federalLaw = [
    "Disability: 42 U.S.C. 12112(b)(5)(A) (ADA); 29 C.F.R. Part 1630; anti-retaliation: 42 U.S.C. 12203",
    "Religion: 42 U.S.C. 2000e et seq. (Title VII); anti-retaliation: 42 U.S.C. 2000e-3",
    "Pregnancy: 42 U.S.C. 2000gg et seq. (PWFA); anti-retaliation: 42 U.S.C. 2000gg-2(f)",
    "Confidentiality of medical records: 42 U.S.C. 12112(d); 29 C.F.R. 1630.14",
  ];
  federalLaw.forEach((item) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + item,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += 4;
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Note: IDHR draft Subpart J rules (56 Ill. Admin. Code 2520.900 et seq.) would require AI-use notices to include accommodation instructions. These rules have not been formally adopted as of March 2026. Monitor ilga.gov for updates.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// ADD-ON DOCUMENT 7: Manager Training Guide
// ============================================================
export function generateManagerTraining(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Manager Guide: AI in Employment Decisions", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This guide helps managers and supervisors at " +
      data.company.name +
      " understand and follow Illinois law on AI in the workplace. Keep it handy \u2014 it covers what the law requires, what you need to do, and how to answer employee questions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: The Law in Plain Language
  y = addSectionHeader(doc, "1. What the Law Requires", y);
  y = addWrappedText(
    doc,
    "Since January 1, 2026, Illinois law (HB3773) sets rules for employers who use AI in hiring, promotions, discipline, or other employment decisions. Here is what it means for you:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const lawPoints = [
    "Employees and applicants must be told when AI plays a role in decisions about them.",
    "AI tools cannot discriminate based on race, sex, age, disability, religion, or other protected characteristics.",
    "Zip codes cannot be used as a stand-in for protected characteristics.",
    "Violations are civil rights violations \u2014 they are taken seriously.",
  ];
  lawPoints.forEach((p) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + p,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 2: AI Systems at This Company
  y = addSectionHeader(doc, "2. AI Systems We Use", y);
  y = addWrappedText(
    doc,
    data.company.name +
      " uses the following AI systems. You should know which ones affect your team:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      sys.name,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      "Vendor: " + (sys.vendor || "Internal"),
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      "Used for: " +
        (sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ") ||
          "General employment decisions"),
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    if (sys.description) {
      y = addWrappedText(
        doc,
        "How it works: " + sys.description,
        MARGIN + 10,
        y,
        CONTENT_WIDTH - 10,
        LINE_HEIGHT
      );
    }
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 3: What You Need to Do
  y = addSectionHeader(doc, "3. Your Responsibilities", y);
  y = addWrappedText(
    doc,
    "As a manager, you play a direct role in compliance. Here is your checklist:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const managerDuties = [
    "Know which AI systems are used in your department.",
    "Confirm every employee on your team has received their AI notification letter.",
    "Never rely on AI output alone for hiring, firing, promotion, or discipline \u2014 always apply your own judgment.",
    "Write down your reasoning whenever you act on an AI recommendation.",
    "If an employee asks for an accommodation related to AI, take it seriously and route it to " +
      (data.contact.name || "Compliance") +
      ".",
    "If you notice something that looks like bias in AI results, report it to " +
      (data.contact.name || "Compliance") +
      " right away.",
  ];
  managerDuties.forEach((d) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + d,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 4: Answering Employee Questions
  y = addSectionHeader(doc, "4. Answering Employee Questions", y);
  y = addWrappedText(
    doc,
    "Employees may have questions about AI. Here are the most common ones and how to respond:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const faqs = [
    {
      q: '"Is AI making decisions about me?"',
      a: "AI provides information and recommendations, but a real person reviews and makes every final decision. Your notification letter lists exactly which AI systems are used and what they do.",
    },
    {
      q: '"Can I opt out of AI?"',
      a:
        "You can request an accommodation. That means asking for a different process that does not involve AI. Contact " +
        (data.contact.name || "Compliance") +
        " and they will work with you to find a solution.",
    },
    {
      q: '"Is this even legal?"',
      a: "Yes. Illinois law allows employers to use AI as long as employees are notified and the AI does not discriminate. That is exactly what we are doing.",
    },
    {
      q: '"What if I think the AI was unfair to me?"',
      a: "You can ask for a human-only review of any AI-related decision. You can also file a complaint internally or contact the Illinois Department of Human Rights (IDHR) directly.",
    },
  ];
  faqs.forEach((faq) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      faq.q,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      faq.a,
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 5: Who to Contact
  y = addSectionHeader(doc, "5. Who to Contact", y);
  y = addWrappedText(
    doc,
    "For any AI compliance questions \u2014 yours or your employees\u2019 \u2014 reach out to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    data.contact.name +
      (data.contact.title ? ", " + data.contact.title : ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      "Email: " + data.contact.email,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      "Phone: " + data.contact.phone,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  y += LINE_HEIGHT;
  y = addWrappedText(
    doc,
    "Employees can also contact IDHR directly: Illinois Department of Human Rights, 312-814-6200, www.illinois.gov/idhr",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}


// ============================================================
// ADD-ON DOCUMENT 8: Employee FAQ
// ============================================================
export function generateEmployeeFAQ(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Employee FAQ: AI in the Workplace", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document answers common employee questions about " +
      data.company.name +
      "'s use of artificial intelligence in employment decisions, pursuant to Illinois law 775 ILCS 5/2-102(L).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const faqs = [
    {
      q: "1. Why am I receiving this notice about AI?",
      a:
        "Illinois law (HB3773, effective January 1, 2026) requires employers to notify employees when artificial intelligence is used in employment decisions such as hiring, promotion, discipline, or discharge. " +
        data.company.name +
        " is providing this notice to comply with that requirement and to be transparent about how technology is used in our workplace.",
    },
    {
      q: "2. What AI systems does " + data.company.name + " use?",
      a:
        data.aiSystems
          .map(
            (s) =>
              s.name +
              (s.vendor ? " (" + s.vendor + ")" : "") +
              " \u2014 " +
              (s.description ||
                "used in " +
                  (s.decisions
                    .map((d) => DECISION_LABELS[d] || d)
                    .join(", ") || "employment decisions"))
          )
          .join("; ") + ".",
    },
    {
      q: "3. Is AI making decisions about me?",
      a:
        (ROLE_LABELS[data.oversight.aiRole] ||
          "AI provides input to employment decisions") +
        ". A qualified human reviewer (" +
        (data.oversight.oversightRole || "designated oversight role") +
        ") is involved in all consequential employment decisions.",
    },
    {
      q: "4. What data does the AI use?",
      a:
        "Our AI systems process the following categories of data: " +
        (data.dataInputs
          .map((d) => DATA_INPUT_LABELS[d] || d)
          .join(", ") ||
          "employment-related data as described in your notification letter") +
        ". The AI does not have access to data outside these categories unless separately disclosed.",
    },
    {
      q: "5. Can the AI discriminate against me?",
      a:
        "Illinois law prohibits employers from using AI that has the effect of discriminating on the basis of protected classes (race, sex, age, disability, religion, national origin, pregnancy, and others). " +
        data.company.name +
        " is committed to preventing discriminatory effects and conducts ongoing monitoring of AI system outputs.",
    },
    {
      q: '6. What are "protected classes"?',
      a: "Under the Illinois Human Rights Act, protected classes include race, color, religion, sex (including pregnancy, sexual orientation, and gender identity), national origin, ancestry, age (40+), marital status, disability, military status, unfavorable discharge from military service, and order of protection status, among others.",
    },
    {
      q: "7. Can I opt out of AI being used for decisions about me?",
      a:
        "You may request a reasonable accommodation regarding AI-assisted employment processes. To make a request, contact " +
        (data.contact.name || "your compliance contact") +
        (data.contact.email ? " at " + data.contact.email : "") +
        ".",
    },
    {
      q: "8. What if I think an AI decision was unfair?",
      a:
        "You have several options: (1) Request a human-only review of the AI-influenced decision by contacting " +
        (data.contact.name || "your compliance contact") +
        ". (2) File an internal complaint through your normal HR channels. (3) File a charge of discrimination with the Illinois Department of Human Rights (IDHR) at 312-814-6200.",
    },
    {
      q: "9. Will I be notified every time AI is used?",
      a: "You will receive an updated notification at least annually, within 30 days of any new or substantially updated AI system being adopted, and in job postings. You do not receive a separate notice for each individual AI-assisted action, but you can request information at any time.",
    },
    {
      q: "10. What happens if my employer violates this law?",
      a: "Using AI that has the effect of discrimination, or failing to provide required notice, is a civil rights violation under the Illinois Human Rights Act. Employees may file a charge with IDHR, which can investigate, mediate, or adjudicate. Courts may award actual damages, back pay, and attorneys' fees.",
    },
    {
      q: "11. Does this law apply to job applicants too?",
      a: "Yes. The proposed IDHR implementing rules require that prospective employees also be notified about AI use, typically through job postings.",
    },
    {
      q: '12. What is a "zip code proxy"?',
      a: "The law specifically prohibits using zip codes as a proxy for protected classes. This means AI systems cannot use your zip code as a stand-in for race, ethnicity, or other protected characteristics, even indirectly.",
    },
    {
      q: "13. How often is the AI audited for bias?",
      a:
        data.biasAudit === "yes"
          ? data.company.name +
            " has completed a bias audit of its AI systems and conducts ongoing monitoring."
          : data.biasAudit === "in_progress"
          ? data.company.name +
            " is currently conducting a bias audit of its AI systems."
          : data.company.name +
            " is establishing a bias audit program for its AI systems.",
    },
    {
      q: "14. Who oversees AI decisions at " + data.company.name + "?",
      a:
        "AI-influenced employment decisions are overseen by " +
        (data.oversight.oversightRole || "a designated compliance role") +
        ". This person has authority to override any AI recommendation and is trained on recognizing potential bias.",
    },
    {
      q: "15. Who should I contact with questions?",
      a:
        "Contact " +
        data.contact.name +
        (data.contact.title ? ", " + data.contact.title : "") +
        (data.contact.email ? " at " + data.contact.email : "") +
        (data.contact.phone ? " or " + data.contact.phone : "") +
        ".",
    },
  ];

  faqs.forEach((faq) => {
    y = addSectionHeader(doc, faq.q, y);
    y = addWrappedText(doc, faq.a, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  addDisclaimer(doc);
  return doc;
}
