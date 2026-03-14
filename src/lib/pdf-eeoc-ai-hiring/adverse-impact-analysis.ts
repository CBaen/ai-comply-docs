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
  DECISION_LABELS,
  PROTECTED_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: AI Adverse Impact Analysis Template
// 29 CFR Part 1607 (Uniform Guidelines) — Four-Fifths Rule
// ============================================================
export function generateAdverseImpactAnalysis(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: Adverse Impact Analysis Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template supports adverse impact analysis for AI-assisted employment selection procedures used by ${data.company.name}, as required by the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607). Under 29 CFR § 1607.4(D), a selection rate for any race, sex, or ethnic group that is less than four-fifths (80%) of the rate for the group with the highest selection rate is evidence of adverse impact. Employers remain liable for discriminatory AI outcomes under Title VII of the Civil Rights Act (42 USC § 2000e et seq.), the Americans with Disabilities Act (42 USC § 12101 et seq.), and the Age Discrimination in Employment Act (29 USC § 621 et seq.). This is a template — consult qualified legal counsel before use.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Scope
  y = addSectionHeader(doc, "1. Analysis Scope", y);
  y = addWrappedText(
    doc,
    `Analysis covers AI-assisted selection procedures for: ${data.aiSystems.map((s) => s.name).join(", ")}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `Employment decision types covered: ${data.aiSystems.flatMap((s) => s.decisions).filter((v, i, a) => a.indexOf(v) === i).map((d) => DECISION_LABELS[d] || d).join(", ")}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "ai_period_start", "Analysis period start:", y, { width: 60 });
  y = addFormTextField(doc, "ai_period_end", "Analysis period end:", y, { width: 60 });
  y += LINE_HEIGHT;

  // Section 2: Four-fifths rule calculation (29 CFR § 1607.4(D))
  y = addSectionHeader(doc, "2. Four-Fifths Rule Calculation (29 CFR § 1607.4(D))", y);
  y = addWrappedText(
    doc,
    "The four-fifths (80%) rule: divide the selection rate of each group by the selection rate of the highest-selected group. A ratio below 0.80 (80%) indicates adverse impact. Complete a separate table for each AI system and each selection stage.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  data.aiSystems.forEach((sys, sIdx) => {
    y = addWrappedText(doc, `System: ${sys.name}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;

    const protectedGroups = [
      "White / Non-Hispanic",
      "Black or African American",
      "Hispanic or Latino",
      "Asian",
      "American Indian / Alaska Native",
      "Women",
      "Men",
      "Age 40+",
      "Persons with Disabilities",
    ];

    // Column headers
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Group", MARGIN + 2, y);
    doc.text("Applied", MARGIN + 52, y);
    doc.text("Selected", MARGIN + 80, y);
    doc.text("Rate", MARGIN + 110, y);
    doc.text("4/5 Ratio", MARGIN + 135, y);
    doc.text("Adverse Impact?", MARGIN + 158, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    protectedGroups.forEach((group) => {
      if (y > 270) { doc.addPage(); y = MARGIN; }
      doc.text(group.substring(0, 22), MARGIN + 2, y);
      doc.setDrawColor(200);
      // Applied
      doc.rect(MARGIN + 50, y - 4, 25, 5);
      // Selected
      doc.rect(MARGIN + 77, y - 4, 25, 5);
      // Rate
      doc.rect(MARGIN + 107, y - 4, 22, 5);
      // 4/5 ratio
      doc.rect(MARGIN + 131, y - 4, 22, 5);
      // Adverse impact
      doc.rect(MARGIN + 155, y - 4, 25, 5);
      y += LINE_HEIGHT + 1;
    });
    y += LINE_HEIGHT;
    void sIdx;
  });

  // Section 3: Statistical significance (29 CFR § 1607.4(D))
  y = addSectionHeader(doc, "3. Statistical Significance Assessment", y);
  y = addWrappedText(
    doc,
    "The Uniform Guidelines recognize that the four-fifths rule may not be reliable for small samples. Where sample sizes are small, statistical tests of significance (e.g., chi-square, Fisher's exact test) should supplement the four-fifths rule. Document statistical analysis below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "ai_stat_method", "Statistical method used:", y, { width: 120 });
  y = addFormTextField(doc, "ai_stat_results", "Results and significance level:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Section 4: Protected characteristics in data
  y = addSectionHeader(doc, "4. Protected Characteristics in AI System Data", y);
  const chars = data.protectedCharacteristics.filter((c) => c !== "none").map((c) => PROTECTED_LABELS[c] || c).join(", ");
  y = addWrappedText(
    doc,
    `Protected characteristics present in AI system data: ${chars || "None reported — verify proxy discrimination risk"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    "Proxy discrimination: even where protected characteristics are not directly used, proxy variables (zip code, name pattern, school name, years of gap in employment) may correlate with protected class membership and produce adverse impact. Document proxy risk assessment:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addFormTextField(doc, "ai_proxy", "Proxy variables identified and assessed:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Section 5: Adverse impact findings
  y = addSectionHeader(doc, "5. Adverse Impact Findings", y);
  const findings = [
    "No adverse impact found — all group ratios at or above the 80% threshold",
    "Adverse impact found — job-relatedness and business necessity must be demonstrated (29 CFR § 1607.5)",
    "Adverse impact found — less discriminatory alternatives being evaluated (29 CFR § 1607.3(B))",
    "Sample size insufficient for reliable four-fifths analysis — supplemented with statistical testing",
  ];
  findings.forEach((finding, idx) => {
    y = addFormCheckbox(doc, "ai_finding_" + idx, finding, y);
  });
  y = addFormTextField(doc, "ai_findings_notes", "Findings narrative:", y, { multiline: true, lines: 4 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Analysis Sign-off", y);
  y = addFormTextField(doc, "ai_analyst", "Analysis completed by:", y, { width: 100 });
  y = addFormTextField(doc, "ai_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "ai_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "ai_next", "Next analysis date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "eeoc_impact", y);

  addDisclaimer(doc);
  return doc;
}
