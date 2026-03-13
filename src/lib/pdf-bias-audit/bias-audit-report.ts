import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  PROTECTED_LABELS,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// AI BIAS AUDIT REPORT TEMPLATE
// Aligned with: NYC Local Law 144, EEOC Adverse Impact (4/5 Rule),
// NIST AI RMF (MEASURE function), and OFCCP Guidelines
// ============================================================
export function generateBiasAuditReport(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Bias Audit Report", data);
  y = addTopDisclaimer(doc, y);

  // ── 1. Executive Summary ───────────────────────────────────
  y = addSectionHeader(doc, "1. Executive Summary", y);
  y = addWrappedText(
    doc,
    "This report documents the results of a bias audit conducted on an automated employment decision tool (AEDT) or high-risk AI system. The audit evaluates whether the AI system produces statistically significant adverse impact on any protected class, consistent with EEOC Uniform Guidelines on Employee Selection Procedures (29 C.F.R. Part 1607), NYC Local Law 144 (Admin. Code § 20-871 et seq.), and NIST AI RMF MEASURE function requirements.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "bar_exec_summary",
    "Summary of Audit Findings (overall pass/fail, key findings, disposition):",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  // ── 2. AI System Under Review ──────────────────────────────
  y = addSectionHeader(doc, "2. AI System Under Review", y);

  y = addFormTextField(
    doc,
    "bar_system_name",
    "AI System Name / Product:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
    }
  );
  y = addFormTextField(doc, "bar_system_vendor", "Vendor / Developer:", y, {
    prefill:
      data.aiSystems && data.aiSystems.length > 0
        ? data.aiSystems[0].vendor
        : "",
  });
  y = addFormTextField(
    doc,
    "bar_system_version",
    "System Version / Model Version:",
    y
  );
  y = addFormTextField(
    doc,
    "bar_system_purpose",
    "System Purpose / Intended Use:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].description
          : "",
      multiline: true,
      lines: 3,
    }
  );

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Employment Decisions Affected by This System:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT + 1;

  const decisionTypes = [
    "Recruitment / candidate sourcing",
    "Application screening",
    "Interview selection",
    "Skills or aptitude scoring",
    "Hiring / final selection",
    "Promotion evaluation",
    "Performance rating",
    "Termination / discharge",
    "Other (specify below)",
  ];
  decisionTypes.forEach((d, i) => {
    const isChecked =
      data.aiSystems &&
      data.aiSystems.length > 0 &&
      data.aiSystems[0].decisions &&
      data.aiSystems[0].decisions.some((dec) =>
        d.toLowerCase().includes(dec.toLowerCase())
      );
    y = addFormCheckbox(doc, `bar_decision_${i}`, d, y, {
      checked: isChecked,
    });
  });
  y = addFormTextField(doc, "bar_decision_other_detail", "", y);

  y = addFormTextField(
    doc,
    "bar_data_sources",
    "Data Sources Used by the System:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── 3. Audit Methodology ───────────────────────────────────
  y = addSectionHeader(doc, "3. Audit Methodology", y);
  y = addWrappedText(
    doc,
    "Describe the methodology used to test for bias. Per NYC LL144 §20-871(b), an independent bias audit must use data that reflects the system's actual use or, if unavailable, historical data from similar systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "bar_methodology_approach",
    "Testing Approach (e.g., historical data review, proxy testing, live A/B testing):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "bar_methodology_sample_size",
    "Total Sample Size (number of individuals in test dataset):",
    y
  );
  y = addFormTextField(
    doc,
    "bar_methodology_time_period",
    "Data Time Period Covered (e.g., Jan 2023 – Dec 2024):",
    y
  );
  y = addFormTextField(
    doc,
    "bar_methodology_stats",
    "Statistical Methods Used (e.g., chi-square test, Fisher's exact test, standard deviation analysis):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "bar_methodology_data_source",
    "Source of Test Data (check source type and describe):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormCheckbox(
    doc,
    "bar_data_actual",
    "Actual historical use data from this system",
    y
  );
  y = addFormCheckbox(
    doc,
    "bar_data_historical",
    "Historical data from prior similar decision-making process",
    y
  );
  y = addFormCheckbox(
    doc,
    "bar_data_proxy",
    "Proxy data / synthetic dataset (describe limitations below)",
    y
  );
  y = addFormTextField(doc, "bar_data_limitations", "Data limitations noted:", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // ── 4. Protected Categories Tested ────────────────────────
  y = addSectionHeader(doc, "4. Protected Categories Tested", y);
  y = addWrappedText(
    doc,
    "Per EEOC Uniform Guidelines 29 C.F.R. § 1607.4, adverse impact must be assessed for race, sex, and ethnic group. NYC LL144 requires testing for sex and race/ethnicity at minimum. Check all categories analyzed in this audit.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const protectedKeys = Object.keys(PROTECTED_LABELS).filter(
    (k) => k !== "none"
  );
  protectedKeys.forEach((key) => {
    const isChecked =
      data.protectedCharacteristics &&
      data.protectedCharacteristics.includes(key);
    y = addFormCheckbox(
      doc,
      `bar_protected_${key}`,
      PROTECTED_LABELS[key],
      y,
      { checked: isChecked }
    );
  });
  y = addFormCheckbox(
    doc,
    "bar_protected_other",
    "Other protected category (specify below):",
    y
  );
  y = addFormTextField(doc, "bar_protected_other_detail", "", y);
  y += LINE_HEIGHT;

  // ── 5. Impact Ratio Results ────────────────────────────────
  y = addSectionHeader(doc, "5. Impact Ratio Results (4/5 Rule Analysis)", y);
  y = addWrappedText(
    doc,
    "The 4/5 (80%) rule per EEOC 29 C.F.R. § 1607.4(D): adverse impact is indicated when the selection rate for a protected group is less than 4/5 (80%) of the selection rate of the group with the highest rate. Enter results for each protected category tested. A separate Impact Ratio Worksheet is included in this package.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const irCategories = [
    "Race / Ethnicity",
    "Gender / Sex",
    "Age (40+)",
    "Disability",
    "Religion",
    "National Origin",
  ];

  irCategories.forEach((cat, idx) => {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(`Category: ${cat}`, MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    const halfW = (CONTENT_WIDTH - 5) / 2;

    y = addFormTextField(
      doc,
      `bar_ir_${idx}_grp_a`,
      "Highest-Rate Group (Group A) & Selection Rate:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `bar_ir_${idx}_grp_b`,
      "Comparison Group (Group B) & Selection Rate:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `bar_ir_${idx}_ratio`,
      "Impact Ratio (B rate ÷ A rate):",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `bar_ir_${idx}_pass`,
      "Passes 4/5 Threshold? (Yes / No / Insufficient data):",
      y,
      { width: halfW }
    );
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── 6. Adverse Impact Analysis ────────────────────────────
  y = addSectionHeader(doc, "6. Adverse Impact Analysis", y);
  y = addWrappedText(
    doc,
    "For each protected category where adverse impact was found (impact ratio < 0.80), document the findings. Include both statistical significance and practical significance. Note that the 4/5 rule is a rule of thumb — small sample sizes may require additional analysis per EEOC Q&A on the Uniform Guidelines.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "bar_ai_race",
    "Race / Ethnicity — Adverse Impact Findings:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "bar_ai_gender",
    "Gender / Sex — Adverse Impact Findings:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "bar_ai_age",
    "Age (40+) — Adverse Impact Findings:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "bar_ai_other",
    "Other Categories — Adverse Impact Findings:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── 7. Intersectional Analysis ────────────────────────────
  y = addSectionHeader(doc, "7. Intersectional Analysis", y);
  y = addWrappedText(
    doc,
    "Intersectional analysis tests for compound adverse impact across multiple protected characteristics simultaneously (e.g., Black women, older women of color). While not yet explicitly mandated by all jurisdictions, intersectional testing aligns with NIST AI RMF MEASURE 2.5 and emerging best practices.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(
    doc,
    "bar_intersectional_conducted",
    "Intersectional analysis was conducted",
    y
  );
  y = addFormCheckbox(
    doc,
    "bar_intersectional_not_conducted",
    "Intersectional analysis was not conducted (explain below)",
    y
  );
  y = addFormTextField(
    doc,
    "bar_intersectional_reason",
    "Reason if not conducted / scope explanation:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "bar_intersectional_combos",
    "Category combinations tested (e.g., Race × Gender, Age × Gender):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "bar_intersectional_findings",
    "Intersectional Analysis Findings:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── 8. Historical Comparison ──────────────────────────────
  y = addSectionHeader(doc, "8. Historical Comparison", y);
  y = addWrappedText(
    doc,
    "Compare current audit results to prior audit results, if available. NYC LL144 § 20-871(b)(2) requires bias audits to be conducted at least annually. Trend analysis supports identification of worsening patterns.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "bar_hist_prior_date",
    "Date of Prior Audit (if applicable):",
    y
  );
  y = addFormTextField(
    doc,
    "bar_hist_prior_auditor",
    "Prior Auditor / Firm:",
    y
  );
  y = addFormTextField(
    doc,
    "bar_hist_trend",
    "Comparison to Prior Results (improving, stable, worsening — describe by category):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "bar_hist_changes",
    "Material Changes to System Since Prior Audit (model updates, training data changes, threshold changes):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── 9. Findings & Recommendations ─────────────────────────
  y = addSectionHeader(doc, "9. Findings & Recommendations", y);
  y = addFormTextField(
    doc,
    "bar_findings_summary",
    "Overall Audit Outcome (pass / fail / conditional pass):",
    y
  );
  y = addFormTextField(
    doc,
    "bar_findings_detail",
    "Detailed Findings:",
    y,
    { multiline: true, lines: 6 }
  );
  y = addFormTextField(
    doc,
    "bar_recommendations",
    "Recommendations (corrective actions, further testing, system modifications):",
    y,
    { multiline: true, lines: 6 }
  );
  y += LINE_HEIGHT;

  // ── 10. Limitations & Caveats ─────────────────────────────
  y = addSectionHeader(doc, "10. Limitations & Caveats", y);
  y = addFormTextField(
    doc,
    "bar_limitations",
    "Audit Limitations and Caveats (data gaps, sample size constraints, scope exclusions, known unknowns):",
    y,
    { multiline: true, lines: 5 }
  );
  y += LINE_HEIGHT;

  // ── 11. Auditor Certification ─────────────────────────────
  y = addSectionHeader(doc, "11. Auditor Certification", y);
  y = addWrappedText(
    doc,
    "NYC LL144 § 20-871(b)(1) requires the bias audit to be conducted by an independent auditor. The auditor certifies that this audit was conducted independently, the methodology is sound, and the findings are accurately reported.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "bar_cert_auditor_name", "Auditor Name:", y, {
    prefill: "",
  });
  y = addFormTextField(
    doc,
    "bar_cert_organization",
    "Auditor Organization / Firm:",
    y
  );
  y = addFormTextField(
    doc,
    "bar_cert_qualifications",
    "Auditor Qualifications / Credentials:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "bar_cert_independence",
    "Statement of Independence (describe relationship to employer/vendor):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "bar_cert_date", "Audit Completion Date:", y);
  y = addFormTextField(doc, "bar_cert_signature", "Auditor Signature:", y);

  addDisclaimer(doc);
  return doc;
}
