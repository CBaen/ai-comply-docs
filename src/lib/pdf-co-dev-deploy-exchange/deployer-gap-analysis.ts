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
// CO Dev-Deploy Exchange Kit — Doc 2: Deployer Gap Analysis
// Assess whether developer documentation is sufficient
// Per C.R.S. § 6-1-1702
// ============================================================
export function generateDeployerGapAnalysis(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Deployer Gap Analysis — Developer Disclosure Sufficiency Review",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This gap analysis helps ${data.company.name} assess whether the AI developer's disclosures are sufficient to meet the deployer's obligations under C.R.S. § 6-1-1702 (Colorado SB 24-205, effective June 30, 2026). For each required disclosure item, assess whether documentation was received and whether it is adequate. Document gaps and required follow-up actions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Identification ----
  y = addSectionHeader(doc, "Section 1: Identification", y);

  y = addFormTextField(doc, "dga_ai_system", "AI System Name:", y);
  y = addFormTextField(doc, "dga_developer", "Developer / Vendor:", y);
  y = addFormTextField(doc, "dga_deployer", "Deployer (this company):", y, {
    prefill: data.company.name,
  });
  y = addFormTextField(doc, "dga_analyst", "Gap Analysis Conducted By (Name / Title):", y);
  y = addFormTextField(doc, "dga_analysis_date", "Analysis Date:", y, {
    prefill: data.generatedDate, width: 80,
  });
  y = addFormTextField(doc, "dga_disclosure_received_date", "Date Developer Disclosure Package Received:", y, { width: 80 });

  // ---- SECTION 2: Gap Analysis Matrix ----
  y = addSectionHeader(
    doc,
    "Section 2: Gap Analysis Matrix — Required Disclosure Items",
    y
  );

  y = addWrappedText(
    doc,
    "For each required disclosure item under C.R.S. § 6-1-1702, check the 'Received' and 'Adequate' boxes if applicable, identify any gaps, and document follow-up actions required.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 4;

  const gapItems = [
    {
      label: "1. System Purpose and Intended Uses",
      key: "purpose",
    },
    {
      label: "2. Known Limitations (accuracy, reliability, performance)",
      key: "limitations",
    },
    {
      label: "3. Training Data Description (sources, methods, known biases)",
      key: "training_data",
    },
    {
      label: "4. Known Risks of Algorithmic Discrimination",
      key: "discrim_risks",
    },
    {
      label: "5. Proper and Improper Use Cases / Prohibited Uses",
      key: "use_cases",
    },
    {
      label: "6. Monitoring Guidance (metrics, frequency, escalation)",
      key: "monitoring",
    },
    {
      label: "7. Model Card (§ 6-1-1702(3))",
      key: "model_card",
    },
    {
      label: "8. Dataset Card (§ 6-1-1702(3))",
      key: "dataset_card",
    },
  ];

  gapItems.forEach((item, idx) => {
    const prefix = `dga_gap${idx + 1}`;

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    if (y > 255) { doc.addPage(); y = MARGIN; }
    doc.text(item.label, MARGIN, y);
    y += LINE_HEIGHT + 1;
    doc.setFont("helvetica", "normal");

    y = addFormCheckbox(doc, `${prefix}_received_yes`, "Received — documentation was provided by developer", y);
    y = addFormCheckbox(doc, `${prefix}_received_no`, "NOT received — documentation was not provided", y);
    y = addFormCheckbox(doc, `${prefix}_adequate_yes`, "Adequate — documentation is sufficient for deployer's needs", y);
    y = addFormCheckbox(doc, `${prefix}_adequate_no`, "NOT adequate — documentation has gaps (describe below)", y);
    y = addFormTextField(doc, `${prefix}_gaps`, "Gaps identified:", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_followup`, "Follow-up actions needed:", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_owner`, "Follow-up owner / due date:", y);

    doc.setDrawColor(220); doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  });

  // ---- SECTION 3: Overall Assessment ----
  y = addSectionHeader(doc, "Section 3: Overall Assessment", y);

  y = addWrappedText(
    doc,
    "Based on the gap analysis above, select the overall assessment:",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(
    doc,
    "dga_overall_sufficient",
    "Disclosure is sufficient — all required items received and adequate; no material gaps",
    y
  );
  y = addFormCheckbox(
    doc,
    "dga_overall_gaps",
    "Material gaps exist — deployer must obtain additional disclosures from developer before proceeding",
    y
  );
  y = addFormCheckbox(
    doc,
    "dga_overall_deficient",
    "Disclosure is deficient — developer has not provided required disclosures; deployer should not proceed without legal review",
    y
  );

  y = addFormTextField(
    doc,
    "dga_overall_narrative",
    "Overall assessment narrative:",
    y,
    { multiline: true, lines: 4 }
  );

  // ---- SECTION 4: Outstanding Items Tracker ----
  y = addSectionHeader(doc, "Section 4: Outstanding Items Tracker", y);

  y = addFormTextField(
    doc,
    "dga_outstanding_list",
    "List all outstanding items requiring follow-up with developer:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "dga_followup_deadline",
    "Developer response deadline:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "dga_escalation",
    "Escalation path if developer does not respond:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 5: Deployer Obligations Readiness ----
  y = addSectionHeader(
    doc,
    "Section 5: Deployer Obligations Readiness Assessment",
    y
  );

  y = addWrappedText(
    doc,
    "Based on the disclosures received, assess whether you have sufficient information to meet your obligations as a deployer under C.R.S. § 6-1-1703.",
    MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT
  );
  y += 2;

  const deployerReadiness = [
    "Conduct impact assessment for high-risk AI use cases",
    "Implement risk mitigation policies per § 6-1-1703",
    "Provide required consumer disclosures",
    "Establish consumer appeal and correction process",
    "Monitor system for algorithmic discrimination",
    "Notify consumers and AG if discrimination discovered",
  ];
  deployerReadiness.forEach((item, idx) => {
    y = addFormCheckbox(doc, `dga_ready_${idx}`, item, y);
  });

  y = addFormTextField(
    doc,
    "dga_readiness_notes",
    "Readiness notes / gaps:",
    y,
    { multiline: true, lines: 3 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "dga_deployer", y);
  addDisclaimer(doc);
  return doc;
}
