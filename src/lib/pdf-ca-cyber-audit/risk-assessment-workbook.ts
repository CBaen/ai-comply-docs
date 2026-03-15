import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CA Cybersecurity Risk Assessment Workbook — Article 10
// Harm categories: economic, physical, reputational,
// psychological, autonomy, discrimination
// ============================================================
export function generateRiskAssessmentWorkbook(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Cybersecurity Risk Assessment Workbook — Article 10",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This workbook documents ${data.company.name}'s harm-category risk assessment as required under Article 10 of the CPPA Cybersecurity Audit regulations. For each required harm category, assess the likelihood and severity of harm to consumers, document existing controls, calculate residual risk, and identify mitigation plans. Assessments must be reviewed annually or when significant changes occur. Verify current CPPA requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Assessment Metadata
  y = addSectionHeader(doc, "Assessment Metadata", y);
  y = addFormTextField(
    doc,
    "raw_assessment_id",
    "Assessment ID / Reference Number:",
    y,
    { width: 110 }
  );
  y = addFormTextField(
    doc,
    "raw_scope",
    "Assessment Scope (systems, products, or processing activities covered):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "raw_assessor",
    "Assessment Conducted By (name/role/firm):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "raw_assessment_date",
    "Assessment Date:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "raw_next_review",
    "Next Scheduled Review Date:",
    y,
    { width: 70 }
  );
  y += LINE_HEIGHT;

  // Rating Scale
  y = addSectionHeader(doc, "Rating Scale Instructions", y);
  y = addWrappedText(
    doc,
    "For Likelihood and Severity, use the following scale: 1 = Very Low | 2 = Low | 3 = Medium | 4 = High | 5 = Very High. Residual Risk = Likelihood × Severity after applying existing controls. A residual risk score above 12 triggers mandatory escalation per this organization's risk tolerance policy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Helper: render one harm category section
  const renderHarmCategory = (
    num: number,
    title: string,
    definition: string,
    fieldPrefix: string,
    currentY: number
  ): number => {
    let ly = addSectionHeader(
      doc,
      `Harm Category ${num}: ${title}`,
      currentY
    );
    ly = addWrappedText(
      doc,
      definition,
      MARGIN,
      ly,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    ly += 4;
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_likelihood`,
      "Likelihood of Harm (1–5, before controls):",
      ly,
      { width: 60 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_severity`,
      "Severity of Harm if It Occurs (1–5):",
      ly,
      { width: 60 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_inherent`,
      "Inherent Risk Score (Likelihood × Severity, before controls):",
      ly,
      { width: 60 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_controls`,
      "Existing Controls (describe controls already in place):",
      ly,
      { multiline: true, lines: 3 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_residual`,
      "Residual Risk Score (after applying existing controls — Likelihood × Severity):",
      ly,
      { width: 60 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_mitigation`,
      "Mitigation Plan (additional controls to implement — include owner and target date):",
      ly,
      { multiline: true, lines: 3 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_accepted_by`,
      "Residual Risk Accepted By (name/role — required if residual risk > 12):",
      ly,
      { width: 140 }
    );
    ly += LINE_HEIGHT;
    return ly;
  };

  // Harm Category 1: Economic
  y = renderHarmCategory(
    1,
    "Economic Harm",
    "Financial loss, unauthorized charges, fraud, identity theft, loss of economic opportunity, or denial of credit, employment, insurance, or housing resulting from a breach or misuse of personal information.",
    "raw_econ",
    y
  );

  // Harm Category 2: Physical
  y = renderHarmCategory(
    2,
    "Physical Harm",
    "Bodily injury, death, physical danger, or threats to physical safety resulting from a breach or unauthorized disclosure of personal information (e.g., disclosure of location to an abuser, medical record breach).",
    "raw_phys",
    y
  );

  // Harm Category 3: Reputational
  y = renderHarmCategory(
    3,
    "Reputational Harm",
    "Damage to a consumer's personal or professional reputation, public embarrassment, or social harm resulting from unauthorized disclosure or misuse of personal information.",
    "raw_rep",
    y
  );

  // Harm Category 4: Psychological
  y = renderHarmCategory(
    4,
    "Psychological Harm",
    "Emotional distress, anxiety, mental anguish, harassment, or psychological suffering resulting from a breach, stalking enabled by data exposure, or loss of control over sensitive personal information.",
    "raw_psych",
    y
  );

  // Harm Category 5: Autonomy
  y = renderHarmCategory(
    5,
    "Harm to Autonomy",
    "Undermining of a consumer's ability to make informed decisions about their own life, including loss of control over personal information, inability to exercise privacy rights, or manipulation through personal data.",
    "raw_auto",
    y
  );

  // Harm Category 6: Discrimination
  y = renderHarmCategory(
    6,
    "Discrimination",
    "Unlawful discrimination based on a protected characteristic (race, gender, age, disability, national origin, religion, etc.) resulting from a breach, unauthorized use, or biased processing of personal information.",
    "raw_disc",
    y
  );

  // Cross-Cutting Risk Summary
  y = addSectionHeader(doc, "Cross-Cutting Risk Summary", y);
  y = addWrappedText(
    doc,
    "Summarize the overall risk posture based on all six harm categories and identify priority actions:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const riskLevels = [
    "Low Overall Risk (all residual scores below 6)",
    "Medium Overall Risk (at least one residual score between 6 and 12)",
    "High Overall Risk (at least one residual score above 12 — mandatory escalation)",
  ];
  riskLevels.forEach((level, idx) => {
    y = addFormCheckbox(doc, `raw_overall_${idx}`, level, y);
  });
  y = addFormTextField(
    doc,
    "raw_priority_actions",
    "Top 3 Priority Mitigation Actions Across All Categories:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "raw_escalation_notes",
    "Escalation Notes (if any residual risk score > 12):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "raw", y);

  addDisclaimer(doc);
  return doc;
}
