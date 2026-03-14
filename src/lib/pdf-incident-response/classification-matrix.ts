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
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Incident Classification Decision Matrix
// Aligned with NIST AI RMF Manage function, California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18),
// and EU AI Act serious incident requirements
// ============================================================
export function generateClassificationMatrix(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Incident Classification Matrix", data);
  y = addTopDisclaimer(doc, y);

  // ── 1. How to Use This Matrix ─────────────────────────────
  y = addSectionHeader(doc, "1. How to Use This Matrix", y);
  y = addWrappedText(
    doc,
    "When a potential AI incident is identified, use this matrix to determine the severity " +
      "level. Assess each impact dimension independently. The HIGHEST individual rating " +
      "across all dimensions determines the overall incident severity. Do not average scores. " +
      "When in doubt, escalate to the higher severity level.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Step 1: Assess each impact dimension (Sections 2-6)." +
      "\nStep 2: Identify the highest single rating." +
      "\nStep 3: Apply escalation triggers (Section 7)." +
      "\nStep 4: Record classification in the Incident Report (companion document)." +
      "\nStep 5: Activate the corresponding response procedure from the Incident Response Plan.",
    MARGIN + 3,
    y,
    CONTENT_WIDTH - 3,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── 2. Classification by Impact Type ─────────────────────
  y = addSectionHeader(doc, "2. Classification by Impact Type", y);
  y = addWrappedText(
    doc,
    "For each impact dimension, check the box that best describes the observed or anticipated " +
      "impact. Use the highest checked rating as that dimension's score.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Helper: draw a table header row
  function drawTableHeader(labels: string[], colWidths: number[], startX: number, rowY: number): number {
    doc.setFontSize(SMALL_SIZE);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 235, 245);
    doc.setDrawColor(150);
    doc.setLineWidth(0.3);
    let cx = startX;
    labels.forEach(function (label, i) {
      doc.rect(cx, rowY - 4, colWidths[i], 7, "FD");
      doc.text(label, cx + 1, rowY);
      cx += colWidths[i];
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    return rowY + 7;
  }

  // Helper: draw a single table data row
  function drawTableRow(cells: string[], colWidths: number[], startX: number, rowY: number, shade: boolean): number {
    doc.setFontSize(SMALL_SIZE);
    doc.setFont("helvetica", "normal");
    if (shade) {
      doc.setFillColor(248, 248, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    let cx = startX;
    // Calculate row height based on longest cell
    let maxLines = 1;
    cells.forEach(function (cell, i) {
      const wrapped = doc.splitTextToSize(cell, colWidths[i] - 2);
      if (wrapped.length > maxLines) maxLines = wrapped.length;
    });
    const rowH = maxLines * 4 + 4;
    cx = startX;
    cells.forEach(function (cell, i) {
      doc.rect(cx, rowY - 4, colWidths[i], rowH, "FD");
      const wrapped = doc.splitTextToSize(cell, colWidths[i] - 2);
      wrapped.forEach(function (line: string, li: number) {
        doc.text(line, cx + 1, rowY + li * 4);
      });
      cx += colWidths[i];
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(BODY_SIZE);
    return rowY + rowH;
  }

  const dimensions = [
    {
      name: "2.1 Safety Impact",
      description:
        "Assess whether the AI system output caused, is causing, or risks causing physical, " +
        "psychological, financial, or other harm to individuals.",
      levels: [
        { rating: "None (Level 1)", desc: "No harm identified. AI output is operating as intended." },
        { rating: "Minor (Level 2)", desc: "Isolated, reversible harm to one or few individuals. No lasting effects." },
        { rating: "Significant (Level 3)", desc: "Harm to multiple individuals, or significant harm to one. Requires intervention." },
        { rating: "Severe (Level 4 — Critical)", desc: "Serious harm to many individuals. Physical injury, financial ruin, or EU AI Act Article 3(49) serious incident threshold met." },
      ],
      fieldPrefix: "cm_safety",
    },
    {
      name: "2.2 Discrimination Impact",
      description:
        "Assess whether the AI system produced outputs that discriminate against or disparately " +
        "impact individuals based on protected characteristics (race, gender, age, disability, " +
        "national origin, religion, or other protected class).",
      levels: [
        { rating: "None (Level 1)", desc: "No discriminatory pattern identified." },
        { rating: "Potential (Level 2)", desc: "Possible bias flagged but not confirmed. Under investigation." },
        { rating: "Confirmed (Level 3)", desc: "Algorithmic discrimination confirmed in AI output or decision outcomes." },
        { rating: "Widespread (Level 4 — Critical)", desc: "Systematic discrimination affecting a significant population or multiple protected classes." },
      ],
      fieldPrefix: "cm_discrimination",
    },
    {
      name: "2.3 Data / Privacy Impact",
      description:
        "Assess whether the AI incident involved unauthorized access to, exposure of, or " +
        "misuse of personal data.",
      levels: [
        { rating: "None (Level 1)", desc: "No personal data exposure or unauthorized access." },
        { rating: "Minor Exposure (Level 2)", desc: "Limited exposure of non-sensitive data. Fewer than 10 individuals affected." },
        { rating: "Significant Breach (Level 3)", desc: "Exposure of sensitive personal data or data of 10–999 individuals." },
        { rating: "Mass Breach (Level 4 — Critical)", desc: "Large-scale exposure of sensitive data (1,000+ individuals) or exposure of special categories of data (health, biometric, financial)." },
      ],
      fieldPrefix: "cm_data",
    },
    {
      name: "2.4 Operational Impact",
      description:
        "Assess the impact on the Company's ability to operate AI systems and deliver services.",
      levels: [
        { rating: "None (Level 1)", desc: "No operational disruption. AI system functioning normally." },
        { rating: "Degraded (Level 2)", desc: "Reduced performance. Users experience degraded output quality. No service interruption." },
        { rating: "Disrupted (Level 3)", desc: "AI system unavailable for a defined period or producing materially incorrect outputs at scale." },
        { rating: "Total Failure (Level 4 — Critical)", desc: "AI system completely unavailable. Mission-critical operations halted." },
      ],
      fieldPrefix: "cm_operational",
    },
    {
      name: "2.5 Regulatory Impact",
      description:
        "Assess the regulatory and legal exposure created by the incident.",
      levels: [
        { rating: "None (Level 1)", desc: "No regulatory obligations triggered. No apparent legal violation." },
        { rating: "Potential Violation (Level 2)", desc: "Facts could constitute a violation but are ambiguous. Legal assessment required." },
        { rating: "Confirmed Violation (Level 3)", desc: "Incident constitutes a violation of applicable AI law or regulation. Reporting obligations likely triggered." },
        { rating: "Enforcement Action (Level 4 — Critical)", desc: "Regulator has been notified or has opened an inquiry. Enforcement action or litigation is likely or pending." },
      ],
      fieldPrefix: "cm_regulatory",
    },
  ];

  dimensions.forEach(function (dim) {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, dim.name, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      dim.description,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;

    dim.levels.forEach(function (level, li) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      y = addFormCheckbox(
        doc,
        dim.fieldPrefix + "_" + li,
        level.rating + ": " + level.desc,
        y
      );
    });
    y += LINE_HEIGHT;
  });

  // ── 3. Severity Determination Rules ──────────────────────
  y = addSectionHeader(doc, "3. Severity Determination Rules", y);
  y = addWrappedText(
    doc,
    "Apply the following rules after assessing all impact dimensions:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const determRules = [
    "Rule 1 — Highest Wins: The highest individual impact level across all dimensions " +
      "determines the overall incident severity. A Level 4 in any single dimension = Severity 1 (Critical).",
    "Rule 2 — No Averaging: Do not calculate an average. One Level 4 overrides four Level 1s.",
    "Rule 3 — Upgrade on Uncertainty: If you are uncertain whether a dimension is Level 2 " +
      "or Level 3, classify at the higher level and reassess as facts develop.",
    "Rule 4 — Regulatory Triggers Override: A confirmed regulatory violation (Level 3 or 4 " +
      "on Regulatory Impact) automatically escalates the incident to at least Severity 2, " +
      "regardless of other dimension ratings.",
    "Rule 5 — Escalation Triggers Apply: Review Section 7 escalation triggers after initial " +
      "classification. Any escalation trigger automatically upgrades to Severity 1.",
  ];
  determRules.forEach(function (rule) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "\u2022  " + rule,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── 4. Overall Severity Assessment ───────────────────────
  y = addSectionHeader(doc, "4. Overall Severity Assessment", y);
  y = addWrappedText(
    doc,
    "After assessing all dimensions, record the overall severity determination:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormCheckbox(doc, "cm_sev1", "Severity 1 (Critical) \u2014 Immediate IRT activation, response within 1 hour", y);
  y = addFormCheckbox(doc, "cm_sev2", "Severity 2 (High) \u2014 IRT notified, response within 4 hours", y);
  y = addFormCheckbox(doc, "cm_sev3", "Severity 3 (Medium) \u2014 IRT notified, response within 24 hours", y);
  y = addFormCheckbox(doc, "cm_sev4", "Severity 4 (Low) \u2014 Logged, reviewed within 5 business days", y);
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "Basis for classification (which dimension(s) drove this determination):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  // draw three blank lines
  for (let i = 0; i < 3; i++) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setDrawColor(200);
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  }
  y += LINE_HEIGHT;

  // ── 5. Escalation Triggers ────────────────────────────────
  y = addSectionHeader(doc, "5. Escalation Triggers (Automatic Upgrade to Severity 1)", y);
  y = addWrappedText(
    doc,
    "The following conditions automatically escalate any incident to Severity 1 (Critical), " +
      "regardless of the initial impact dimension ratings. Check any that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const escalationTriggers = [
    "Individual has suffered or is at risk of imminent physical harm traceable to AI output",
    "Incident involves a child or vulnerable population (elderly, disabled, incarcerated)",
    "Regulatory agency (state AG, EU NCA, or federal regulator) has made an inquiry",
    "Media or public disclosure of the incident has occurred or is imminent",
    "Incident involves AI system used in healthcare, criminal justice, or child welfare",
    "Incident constitutes a HIPAA breach, GLBA incident, or state data breach notification trigger",
    "EU AI Act Article 3(49) serious incident definition is met (death, serious injury, etc.)",
    "SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) incident reporting requirements may be triggered (applies only to large frontier AI developers meeting specific compute and revenue thresholds — verify applicability and current reporting timeline with legal counsel)",
    "Incident Commander determines facts warrant Severity 1 response regardless of matrix score",
  ];

  escalationTriggers.forEach(function (trigger, idx) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addFormCheckbox(doc, "cm_escalation_" + idx, trigger, y);
  });
  y += LINE_HEIGHT;

  // ── 6. Examples by Severity Level ─────────────────────────
  y = addSectionHeader(doc, "6. Examples by Severity Level", y);
  y = addWrappedText(
    doc,
    "The following real-world scenarios illustrate each severity level. These are examples " +
      "only — facts and context always govern classification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const examples = [
    {
      level: "Severity 1 Examples:",
      items: [
        "Hiring AI systematically excluded all applicants over age 50 for 6 months across 500+ applications",
        "Medical AI recommended incorrect dosage, causing patient hospitalization",
        "AI-powered lending algorithm charged higher rates to Black applicants vs. equivalent white applicants",
        "AI chatbot collected and exposed financial account data for 2,000 users",
      ],
    },
    {
      level: "Severity 2 Examples:",
      items: [
        "Resume screening AI shows statistically significant gender disparity in shortlisting (under investigation)",
        "AI vendor notified Company of a known bug that may have produced biased outputs",
        "Employee deployed an AI tool for HR decisions without authorization or impact assessment",
        "AI system accessed personal data outside the scope of its stated purpose for 47 users",
      ],
    },
    {
      level: "Severity 3 Examples:",
      items: [
        "AI recommendation engine producing noticeably lower quality outputs for 3 weeks",
        "Chatbot occasionally generating factually incorrect responses that users may rely upon",
        "Near-miss: AI system almost approved an ineligible applicant before human review caught the error",
        "User complaints about AI translation tool producing offensive outputs in specific language pairs",
      ],
    },
    {
      level: "Severity 4 Examples:",
      items: [
        "Alert triggered by monitoring system; investigation confirms no incident occurred",
        "Single user complaint about AI output; no systemic pattern identified",
        "Minor logging gap during scheduled maintenance; no data or decisions affected",
        "AI system took 5 seconds longer than usual to respond during a traffic spike",
      ],
    },
  ];

  examples.forEach(function (ex) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, ex.level, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    ex.items.forEach(function (item) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      y = addWrappedText(
        doc,
        "\u2022  " + item,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    });
    y += LINE_HEIGHT;
  });

  // ── 7. Classification Summary ─────────────────────────────
  y = addSectionHeader(doc, "7. Classification Summary", y);

  // Draw summary table
  const colW = [55, 30, 30, 30, 25];
  const headers = ["Impact Dimension", "Safety", "Discrim.", "Data/Priv.", "Oper.", "Reg."];
  // wider table
  const tableW = [50, 24, 24, 28, 24, 24];
  const tableHeaders = ["Dimension", "Safety", "Discrim.", "Data/Priv.", "Oper.", "Reg."];

  if (y > 240) {
    doc.addPage();
    y = MARGIN;
  }

  y = drawTableHeader(tableHeaders, tableW, MARGIN, y);

  const tableRows = [
    ["Rating (1–4)", "", "", "", "", ""],
    ["Overall Severity", "", "", "", "", ""],
  ];

  tableRows.forEach(function (row, ri) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = drawTableRow(row, tableW, MARGIN, y, ri % 2 === 0);
  });
  y += LINE_HEIGHT;

  addDisclaimer(doc);
  return doc;
}
