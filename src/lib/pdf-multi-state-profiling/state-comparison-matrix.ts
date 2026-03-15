import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: State Comparison Matrix
// Multi-State Profiling Assessment Bundle
// ============================================================
export function generateStateComparisonMatrix(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "State Comparison Matrix", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This State Comparison Matrix summarizes key data protection assessment requirements across major state consumer privacy laws as of March 2026. Prepared for ${data.company.name}. Verify current status of each law with qualified legal counsel before relying on this matrix \u2014 state laws are amended, cure periods expire, and enforcement postures evolve.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const states = [
    {
      name: "Virginia VCDPA",
      citation: "Va. Code \u00A7\u00A7 59.1-571 et seq.",
      effective: "January 1, 2023",
      thresholds: "100,000+ consumers OR 25,000+ consumers with 50%+ data sale revenue",
      cure: "30-day cure (AG discretion)",
      maxPenalty: "$7,500 per violation",
      enforcement: "AG only. No private right of action.",
    },
    {
      name: "Connecticut CTDPA",
      citation: "Conn. Gen. Stat. \u00A7\u00A7 42-515 et seq.",
      effective: "July 1, 2023",
      thresholds: "100,000+ consumers OR 25,000+ consumers with 25%+ data sale revenue",
      cure: "60-day cure until Dec 31, 2024; AG discretion after",
      maxPenalty: "$5,000 per violation",
      enforcement: "AG only. No private right of action.",
    },
    {
      name: "Colorado CPA",
      citation: "C.R.S. \u00A7\u00A7 6-1-1301 et seq.",
      effective: "July 1, 2023",
      thresholds: "100,000+ consumers OR 25,000+ consumers with 25%+ data sale revenue",
      cure: "60-day cure until Jan 1, 2025; AG discretion after",
      maxPenalty: "$20,000 per violation",
      enforcement: "AG only. No private right of action.",
    },
    {
      name: "Texas TDPSA",
      citation: "Tex. Bus. & Com. Code Ch. 541",
      effective: "July 1, 2024",
      thresholds: "Not a small business (SBA definition) EXCEPT small businesses selling sensitive data",
      cure: "Permanent 30-day cure period (\u00A7 541.154)",
      maxPenalty: "$7,500 per violation (\u00A7 541.155)",
      enforcement: "AG only (\u00A7 541.151). No private right of action.",
    },
    {
      name: "Delaware PDPA",
      citation: "Del. Code tit. 6, ch. 12D",
      effective: "January 1, 2025",
      thresholds: "35,000+ consumers OR 10,000+ consumers with 20%+ data sale revenue (LOWEST thresholds)",
      cure: "60-day cure until Dec 31, 2025; AG discretion after (\u00A7 12D-111)",
      maxPenalty: "$10,000 per violation (\u00A7 12D-111)",
      enforcement: "AG only (\u00A7 12D-111). No private right of action.",
    },
    {
      name: "Minnesota MCDPA",
      citation: "Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21",
      effective: "July 31, 2025",
      thresholds: "100,000+ consumers OR 25,000+ consumers with 25%+ data sale revenue",
      cure: "30-day cure period expired January 31, 2026 (\u00A7 325M.20(a))",
      maxPenalty: "Up to $7,500 per violation (\u00A7325M.20(c))",
      enforcement: "AG only (\u00A7 325M.20(b)). No private right of action (\u00A7 325M.20(d)).",
    },
  ];

  states.forEach((state) => {
    y = addSectionHeader(doc, state.name, y);
    const rows = [
      ["Citation:", state.citation],
      ["Effective:", state.effective],
      ["Coverage Thresholds:", state.thresholds],
      ["Cure Period:", state.cure],
      ["Max Penalty:", state.maxPenalty],
      ["Enforcement:", state.enforcement],
    ];
    rows.forEach(([label, value]) => {
      y = addWrappedText(
        doc,
        `${label} ${value}`,
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
    });
    y += LINE_HEIGHT / 2;
  });

  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Organization-Specific Notes", y);
  y = addFormTextField(
    doc,
    "org_notes",
    "States applicable to this organization (and rationale):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "next_review",
    "Matrix Review Date (recommend: annually or when new state laws take effect):",
    y
  );
  y = addFormTextField(doc, "reviewer", "Reviewed By:", y);

  addDisclaimer(doc);
  return doc;
}
