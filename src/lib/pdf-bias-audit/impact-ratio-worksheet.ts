import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  SMALL_SIZE,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// IMPACT RATIO CALCULATION WORKSHEET
// Standard: EEOC Uniform Guidelines 29 C.F.R. § 1607.4(D)
// The 4/5 (80%) Rule — standard for adverse impact determination
// ============================================================
export function generateImpactRatioWorksheet(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Impact Ratio Calculation Worksheet", data);
  y = addTopDisclaimer(doc, y);

  // ── Instructions ──────────────────────────────────────────
  y = addSectionHeader(doc, "Instructions", y);
  y = addWrappedText(
    doc,
    "This worksheet guides you through calculating the impact ratio (also called adverse impact ratio) for each protected class using the EEOC 4/5 Rule. Complete one section per protected class comparison. Use the Summary Table at the end to compile all results.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const steps = [
    "Step 1 — Identify the comparison groups: typically the \"most-favored group\" (highest selection rate) vs. each other group.",
    "Step 2 — Calculate each group's selection rate: divide the number selected by the total number who applied or were evaluated.",
    "Step 3 — Calculate the impact ratio: divide the lower group's selection rate by the highest group's selection rate.",
    "Step 4 — Apply the 4/5 rule: if the impact ratio is below 0.80 (80%), adverse impact is indicated.",
    "Step 5 — Assess statistical significance: the 4/5 rule is a screening test. Follow up with chi-square or Fisher's exact test when sample sizes are sufficient (generally n ≥ 30 per group).",
    "Step 6 — Document practical significance: even if statistical thresholds are not met, document whether the difference is practically meaningful given the decision context.",
  ];
  steps.forEach((step) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      step,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Definitions ───────────────────────────────────────────
  y = addSectionHeader(doc, "Definitions", y);

  const defs = [
    {
      term: "Selection Rate",
      def: "The proportion of individuals from a group who are selected (hired, promoted, or otherwise passed through the AI decision). Formula: Number Selected ÷ Total Applicants in Group. Example: 40 hired out of 200 applicants = 0.20 (20%).",
    },
    {
      term: "Impact Ratio",
      def: "The ratio of the selection rate of a protected group to the selection rate of the group with the highest rate. Formula: Group B Selection Rate ÷ Group A Selection Rate. Range: 0 to 1.0 (where 1.0 = identical rates).",
    },
    {
      term: "Adverse Impact",
      def: "Occurs when a selection procedure has a substantially different rate of selection that works to the disadvantage of members of a race, sex, or ethnic group. Per EEOC Guidelines, adverse impact is indicated when the impact ratio is less than 0.80 (the 4/5 or 80% rule).",
    },
    {
      term: "4/5 Rule (80% Rule)",
      def: "The EEOC rule of thumb from 29 C.F.R. § 1607.4(D): a selection rate for a protected group that is less than four-fifths (4/5 or 80%) of the rate for the group with the highest rate generally indicates adverse impact. This is a benchmark, not a legal bright line.",
    },
    {
      term: "Practical Significance",
      def: "Whether the observed difference in selection rates is large enough to be meaningful in context — beyond statistical significance. Consider absolute difference in rates, the number of persons affected, and the consequences of the decision.",
    },
    {
      term: "Statistical Significance",
      def: "Whether an observed difference is likely due to real disparity rather than random chance. Common tests: chi-square (χ²) test, Fisher's exact test (preferred for small samples), and the standard deviation rule (2 SD rule per Hazelwood School District v. United States, 433 U.S. 299 (1977)).",
    },
  ];

  defs.forEach(({ term, def }) => {
    if (y > 260) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(term + ":", MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT - 1;
    y = addWrappedText(doc, def, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 3;
  });
  y += LINE_HEIGHT;

  // ── Calculation Template — one block per protected class ──
  const categories = [
    { label: "Race / Ethnicity", key: "race" },
    { label: "Gender / Sex", key: "gender" },
    { label: "Age (40 and over vs. under 40)", key: "age" },
    { label: "Disability Status", key: "disability" },
    { label: "National Origin", key: "national_origin" },
    { label: "Religion", key: "religion" },
  ];

  categories.forEach(({ label, key }, idx) => {
    if (y > 200) {
      doc.addPage();
      y = MARGIN;
    }

    y = addSectionHeader(
      doc,
      `Calculation — Protected Class: ${label}`,
      y
    );

    // Group A
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text("GROUP A (Highest-Rate / Comparison Baseline):", MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    const halfW = (CONTENT_WIDTH - 5) / 2;
    y = addFormTextField(
      doc,
      `irw_${key}_a_name`,
      "Group A Name (e.g., White, Male, Under 40):",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_a_total`,
      "Group A — Total Applicants / Evaluated:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_a_selected`,
      "Group A — Number Selected / Passed:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_a_rate`,
      "Group A — Selection Rate (Selected ÷ Total):",
      y,
      { width: halfW }
    );
    y += 2;

    // Group B
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text("GROUP B (Protected Class Being Tested):", MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    y = addFormTextField(
      doc,
      `irw_${key}_b_name`,
      "Group B Name (e.g., Black/African American, Female, 40+):",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_b_total`,
      "Group B — Total Applicants / Evaluated:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_b_selected`,
      "Group B — Number Selected / Passed:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_b_rate`,
      "Group B — Selection Rate (Selected ÷ Total):",
      y,
      { width: halfW }
    );
    y += 2;

    // Impact Ratio Calculation
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text("IMPACT RATIO CALCULATION:", MARGIN, y);
    doc.setFont("helvetica", "normal");
    y += LINE_HEIGHT;

    y = addFormTextField(
      doc,
      `irw_${key}_ratio`,
      "Impact Ratio = Group B Rate ÷ Group A Rate:",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_threshold`,
      "4/5 Rule Result (Impact Ratio ≥ 0.80? Pass / Fail / Insufficient Data):",
      y,
      { width: halfW }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_stat_sig`,
      "Statistical Significance Test Used & Result (p-value or standard deviations):",
      y,
      { width: CONTENT_WIDTH }
    );
    y = addFormTextField(
      doc,
      `irw_${key}_practical`,
      "Practical Significance Assessment:",
      y,
      { multiline: true, lines: 2, width: CONTENT_WIDTH }
    );

    // Sample size note
    if (y < 275) {
      doc.setFontSize(SMALL_SIZE);
      doc.setTextColor(120);
      doc.text(
        `Note: EEOC guidance suggests caution when group n < 30. If either group has fewer than 30 individuals, flag for small-sample analysis.`,
        MARGIN,
        y
      );
      doc.setTextColor(0);
      y += LINE_HEIGHT + 2;
    }

    if (idx < categories.length - 1) {
      doc.setDrawColor(220);
      doc.setLineWidth(0.3);
      doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
      y += LINE_HEIGHT;
    }
  });

  y += LINE_HEIGHT;

  // ── Summary Table ─────────────────────────────────────────
  if (y > 180) {
    doc.addPage();
    y = MARGIN;
  }
  y = addSectionHeader(doc, "Summary Table — All Categories", y);
  y = addWrappedText(
    doc,
    "Compile impact ratio results for all tested categories here for at-a-glance review.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const summaryRows = [
    "Race / Ethnicity",
    "Gender / Sex",
    "Age (40+)",
    "Disability",
    "National Origin",
    "Religion",
    "Other Category 1",
    "Other Category 2",
  ];

  summaryRows.forEach((row, idx) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    const colW = CONTENT_WIDTH / 4;
    y = addFormTextField(
      doc,
      `irw_summary_${idx}_category`,
      idx === 0 ? "Category" : "",
      y,
      { prefill: row, readOnly: false, width: colW }
    );
    y = addFormTextField(
      doc,
      `irw_summary_${idx}_ratio`,
      idx === 0 ? "Impact Ratio" : "",
      y - (idx === 0 ? LINE_HEIGHT * 2 + 9 : LINE_HEIGHT + 9),
      { width: colW, x: MARGIN + colW + 2 }
    );
    y = addFormTextField(
      doc,
      `irw_summary_${idx}_pass`,
      idx === 0 ? "Pass/Fail" : "",
      y - (idx === 0 ? LINE_HEIGHT * 2 + 9 : LINE_HEIGHT + 9),
      { width: colW, x: MARGIN + colW * 2 + 4 }
    );
    y = addFormTextField(
      doc,
      `irw_summary_${idx}_stat`,
      idx === 0 ? "Stat. Sig?" : "",
      y - (idx === 0 ? LINE_HEIGHT * 2 + 9 : LINE_HEIGHT + 9),
      { width: colW - 4, x: MARGIN + colW * 3 + 6 }
    );
    y += 2;
  });

  y += LINE_HEIGHT;

  // ── Notes on Interpretation ───────────────────────────────
  y = addSectionHeader(doc, "Notes on Interpretation", y);

  const notes = [
    "1. The 4/5 rule is a practical guideline, not a legal absolute. Courts and agencies examine the totality of circumstances, including statistical significance and practical significance together.",
    "2. Small sample sizes (n < 30 per group) reduce the reliability of the 4/5 rule. Document sample size concerns and supplement with alternative analyses such as Fisher's exact test.",
    "3. An impact ratio ≥ 0.80 does not guarantee absence of discrimination — other evidence may still indicate discrimination.",
    "4. An impact ratio < 0.80 does not automatically establish illegal discrimination — it triggers further investigation and the employer may demonstrate the selection procedure is job-related and consistent with business necessity (29 C.F.R. § 1607.5).",
    "5. For AI systems specifically: NYC LL144 and similar regulations focus on whether the overall AI system produces adverse impact, not just individual components. Test the output of the system as deployed.",
    "6. Document all calculation steps. In enforcement proceedings, the EEOC and plaintiffs' counsel will scrutinize both the data used and the methodology applied.",
  ];

  notes.forEach((note) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      note,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });

  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "irw_notes",
    "Additional Notes / Observations:",
    y,
    { multiline: true, lines: 4 }
  );

  addDisclaimer(doc);
  return doc;
}
