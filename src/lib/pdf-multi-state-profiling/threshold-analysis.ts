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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Threshold Analysis Worksheet
// Multi-State Profiling Assessment Bundle
// ============================================================
export function generateThresholdAnalysis(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Threshold Analysis Worksheet", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Threshold Analysis Worksheet helps ${data.company.name} determine which state consumer privacy laws apply based on consumer volume and revenue from data sales. Complete this worksheet annually and whenever consumer volumes or revenue sources change significantly. State coverage thresholds determine whether you are a \u201ccontroller\u201d subject to each law\u2019s assessment requirements.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Organization Data Volume", y);
  y = addFormTextField(
    doc,
    "total_consumers",
    "Total number of consumers whose personal data is processed annually:",
    y
  );
  y = addFormTextField(
    doc,
    "total_revenue",
    "Total annual revenue (USD):",
    y
  );
  y = addFormTextField(
    doc,
    "data_sale_revenue",
    "Annual revenue derived from sale of personal data (USD):",
    y
  );
  y = addFormTextField(
    doc,
    "data_sale_pct",
    "Percentage of total revenue from data sales (%):",
    y
  );
  y = addFormTextField(doc, "analysis_date", "Analysis Date:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "State-by-State Threshold Analysis", y);
  y = addWrappedText(
    doc,
    "For each state, check whether the organization meets the coverage threshold:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const thresholds = [
    {
      state: "Virginia VCDPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 50%+ revenue from data sales",
    },
    {
      state: "Connecticut CTDPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 25%+ revenue from data sales",
    },
    {
      state: "Colorado CPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 25%+ revenue from data sales",
    },
    {
      state: "Texas TDPSA",
      threshold: "Not a small business (SBA size standards) EXCEPT small businesses that sell sensitive data",
    },
    {
      state: "Oregon OCPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 25%+ revenue from data sales",
    },
    {
      state: "Montana MCDPA",
      threshold: "50,000+ consumers/year OR 25,000+ consumers with 25%+ revenue from data sales",
    },
    {
      state: "Delaware PDPA",
      threshold: "35,000+ consumers/year OR 10,000+ consumers with 20%+ revenue from data sales",
    },
    {
      state: "Minnesota MCDPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 25%+ revenue from data sales",
    },
    {
      state: "Indiana INCDPA",
      threshold: "100,000+ consumers/year OR 25,000+ consumers with 50%+ revenue from data sales",
    },
    {
      state: "Maryland MODPA",
      threshold: "35,000+ consumers/year OR 10,000+ consumers with 20%+ revenue from data sales",
    },
  ];

  thresholds.forEach((t, idx) => {
    y = addWrappedText(
      doc,
      `${t.state}: ${t.threshold}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormCheckbox(doc, `applies_${idx}`, "This law applies to our organization", y);
    y += 2;
  });

  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Determination and Rationale", y);
  y = addFormTextField(
    doc,
    "determination",
    "States where law applies (summarize determination):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "next_review",
    "Next Threshold Review Date:",
    y
  );
  y = addFormTextField(doc, "reviewer_name", "Reviewed By (Name/Title):", y);
  y = addFormTextField(doc, "reviewer_sig", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
