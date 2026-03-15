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
// IL Zip Code Proxy Audit — Doc 2: Proxy Analysis Worksheet
// Statistical analysis template for zip-to-protected-class correlation
// Per 775 ILCS 5/2-102(L)(1) and Illinois Human Rights Act
// ============================================================
export function generateProxyAnalysisWorksheet(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Zip Code Proxy Effect Analysis Worksheet",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This worksheet supports a statistical analysis of whether zip code data in AI systems used by ${data.company.name} produces a proxy effect correlated with protected characteristics under the Illinois Human Rights Act (775 ILCS 5/2-102(L)(1)). Protected characteristics include race, color, national origin, sex, religion, disability, sexual orientation, and others. This analysis is required when geographic data inputs are identified in the Data Input Audit.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Analysis Scope ----
  y = addSectionHeader(doc, "Section 1: Analysis Scope", y);

  y = addFormTextField(doc, "paw_ai_system", "AI System Being Analyzed:", y);
  y = addFormTextField(doc, "paw_analyst", "Analyst Name / Title:", y);
  y = addFormTextField(doc, "paw_analysis_date", "Analysis Date:", y, {
    width: 70,
  });
  y = addFormTextField(
    doc,
    "paw_data_period",
    "Applicant / Decision Data Period Covered:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "paw_total_applicants",
    "Total applicants / employees in analysis dataset:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "paw_data_source",
    "Data source(s) used for this analysis:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 2: Applicant Pool Demographics by Zip Code Region ----
  y = addSectionHeader(
    doc,
    "Section 2: Applicant Pool Demographics by Zip Code Region",
    y
  );

  y = addWrappedText(
    doc,
    "Group applicants by zip code region (e.g., by county, metropolitan area, or cluster). For each region, record the demographic composition using publicly available census data or applicant self-identification data.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const regions = ["Region A", "Region B", "Region C", "Region D"];
  regions.forEach((region, idx) => {
    const prefix = `paw_region${idx + 1}`;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.text(region, MARGIN, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");

    y = addFormTextField(doc, `${prefix}_zip_codes`, "ZIP codes included in this region:", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_total_n`, "Total applicants from this region (n):", y, {
      width: 60,
    });
    y = addFormTextField(doc, `${prefix}_race_comp`, "Racial / ethnic composition (% or n per group):", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_national_origin`, "National origin composition (% or n per group):", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_pass_rate`, "AI system pass / selection rate for this region (%):", y, {
      width: 60,
    });

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  });

  // ---- SECTION 3: Correlation Analysis ----
  y = addSectionHeader(
    doc,
    "Section 3: Correlation Analysis — Zip Code vs. Protected Characteristics",
    y
  );

  y = addWrappedText(
    doc,
    "Analyze whether zip code inputs into the AI system are correlated with the protected characteristics listed below. Use a statistical method appropriate for your data size (e.g., Pearson correlation, chi-square test, logistic regression). Document the method and findings for each characteristic.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const characteristics = [
    { label: "Race / Color", key: "race" },
    { label: "Ethnicity / National Origin", key: "natl_origin" },
    { label: "Sex", key: "sex" },
    { label: "Religion", key: "religion" },
    { label: "Disability Status", key: "disability" },
    { label: "Sexual Orientation", key: "sexual_orientation" },
  ];

  characteristics.forEach((char, idx) => {
    const prefix = `paw_corr_${idx}`;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.text(char.label, MARGIN, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");

    y = addFormTextField(doc, `${prefix}_method`, "Statistical method used:", y);
    y = addFormTextField(doc, `${prefix}_statistic`, "Correlation coefficient / test statistic:", y, {
      width: 80,
    });
    y = addFormTextField(doc, `${prefix}_p_value`, "p-value / significance level:", y, {
      width: 60,
    });
    y = addFormTextField(doc, `${prefix}_conclusion`, "Interpretation / conclusion:", y, {
      multiline: true, lines: 2,
    });

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  });

  // ---- SECTION 4: Adverse Impact Assessment ----
  y = addSectionHeader(
    doc,
    "Section 4: Adverse Impact Assessment (EEOC 4/5 Rule Reference)",
    y
  );

  y = addWrappedText(
    doc,
    "For each protected group, calculate the selection rate ratio relative to the highest-selected group. Per the EEOC Uniform Guidelines (29 C.F.R. § 1607), a ratio below 0.80 (80%) indicates adverse impact and requires investigation. This analysis applies to any selection procedure, including AI systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormTextField(doc, "paw_highest_group", "Highest-selected group and selection rate:", y);
  y = addFormTextField(doc, "paw_adverse_groups", "Groups with selection rate below 80% of highest (list):", y, {
    multiline: true, lines: 3,
  });
  y = addFormTextField(doc, "paw_adverse_conclusion", "Adverse impact conclusion:", y, {
    multiline: true, lines: 3,
  });

  // ---- SECTION 5: Overall Proxy Conclusion ----
  y = addSectionHeader(doc, "Section 5: Overall Proxy Effect Conclusion", y);

  y = addWrappedText(
    doc,
    "Based on the demographic analysis and correlation results above, check the applicable conclusion:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(
    doc,
    "paw_no_proxy",
    "No proxy effect found — zip code inputs do not correlate with protected characteristics at a meaningful level",
    y
  );
  y = addFormCheckbox(
    doc,
    "paw_proxy_possible",
    "Possible proxy effect — correlation identified but below adverse impact threshold; monitor going forward",
    y
  );
  y = addFormCheckbox(
    doc,
    "paw_proxy_confirmed",
    "Proxy effect confirmed — statistically significant correlation with one or more protected characteristics; proceed to Remediation Plan",
    y
  );

  y = addFormTextField(
    doc,
    "paw_overall_narrative",
    "Supporting narrative for conclusion:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "paw_followup",
    "Recommended follow-up actions:",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "paw_analysis", y);
  addDisclaimer(doc);
  return doc;
}
