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
  PROTECTED_LABELS,
  REVIEW_LABELS,
} from "../pdf-helpers";

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
