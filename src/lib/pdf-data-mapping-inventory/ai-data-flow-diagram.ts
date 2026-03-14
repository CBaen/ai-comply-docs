import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: AI Data Flow Diagram Template
// AI system data flow documentation template
// ============================================================
export function generateAIDataFlowDiagram(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Data Flow Diagram — Documentation Template", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This template documents the data flows within and around each AI system at " +
      data.company.name +
      ". " +
      "Complete one section per AI system. Attach visual diagrams as separate exhibits where available. " +
      "Data flow documentation is required for data protection assessments under CA CCPA, CO SB24-205, MN MCDPA, and other privacy laws.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Instructions ───────────────────────────────────────────
  y = addSectionHeader(doc, "How to Use This Template", y);
  const instructions = [
    "(a) Complete one section for each AI system that processes personal data.",
    "(b) Map every point where data enters the system (inputs), how it is used (processing), and where it goes (outputs, storage, sharing).",
    "(c) Identify the data controller and any data processors or sub-processors involved.",
    "(d) Flag any cross-border data transfers — these have additional requirements under GDPR and state laws.",
    "(e) Update this diagram whenever the AI system, its vendor, or its data handling changes.",
  ];
  instructions.forEach((inst) => {
    y = addWrappedText(doc, inst, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── AI System Data Flow Entry (3 systems) ─────────────────
  for (let sysNum = 1; sysNum <= 3; sysNum++) {
    if (y > 160) { doc.addPage(); y = MARGIN; }

    // System header
    doc.setFillColor(240, 244, 255);
    doc.setDrawColor(50, 100, 200);
    doc.setLineWidth(0.8);
    doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 9, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 60, 130);
    doc.text("AI System #" + sysNum + " Data Flow", MARGIN + 4, y + 6);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 12;

    const p = "dfd_sys" + sysNum + "_";

    // System overview
    y = addFormTextField(doc, p + "name", "AI System Name / Product:", y);
    y = addFormTextField(doc, p + "vendor", "Vendor / Developer:", y);
    y = addFormTextField(doc, p + "purpose", "Purpose of System:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, p + "controller", "Data Controller:", y);
    y = addFormTextField(doc, p + "processor", "Data Processor(s) / Sub-processors:", y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT / 2;

    // Inputs
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = addWrappedText(doc, "Data Inputs:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, p + "inputs_source", "Data Sources (where data comes from):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, p + "inputs_types", "Data Types Input to System:", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, p + "inputs_volume", "Approximate Volume / Frequency:", y);
    y += LINE_HEIGHT / 2;

    // Processing
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = addWrappedText(doc, "Processing Activities:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    if (y > 220) { doc.addPage(); y = MARGIN; }
    y = addFormTextField(doc, p + "processing_desc", "How the AI processes the data:", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, p + "processing_decisions", "What decisions or outputs does the AI produce?", y, { multiline: true, lines: 2 });

    const processingTypes = [
      { name: p + "proc_profiling", label: "Profiling / scoring" },
      { name: p + "proc_classification", label: "Classification / categorization" },
      { name: p + "proc_recommendation", label: "Recommendation / ranking" },
      { name: p + "proc_prediction", label: "Prediction / forecasting" },
      { name: p + "proc_generation", label: "Content generation" },
      { name: p + "proc_decision", label: "Automated decision-making" },
    ];
    processingTypes.forEach((pt) => {
      y = addFormCheckbox(doc, pt.name, pt.label, y);
      y += 1;
    });
    y += LINE_HEIGHT / 2;

    // Outputs
    if (y > 220) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = addWrappedText(doc, "Data Outputs & Storage:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, p + "outputs_types", "Output data types (what does the system produce?):", y, { multiline: true, lines: 2 });
    y = addFormTextField(doc, p + "outputs_storage", "Where outputs are stored:", y);
    y = addFormTextField(doc, p + "outputs_retention", "Retention period for outputs:", y);
    y = addFormTextField(doc, p + "outputs_access", "Who has access to outputs:", y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT / 2;

    // Third-party sharing
    if (y > 220) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = addWrappedText(doc, "Third-Party Data Sharing:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addFormTextField(doc, p + "sharing_parties", "Third parties that receive data from or about this system:", y, { multiline: true, lines: 3 });
    y = addFormTextField(doc, p + "cross_border", "Cross-border data transfers (to which countries?):", y, { multiline: true, lines: 2 });
    y += LINE_HEIGHT;
  }

  // ── Diagram Attachment Notes ───────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Visual Diagram Attachments", y);
  y = addWrappedText(
    doc,
    "If visual data flow diagrams exist, list them here. Attach as exhibits to this document.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;
  y = addFormTextField(doc, "dfd_diagrams", "Attached visual diagrams (file names / exhibit numbers):", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Certification ──────────────────────────────────────────
  y = addSectionHeader(doc, "Certification", y);
  y = addFormTextField(doc, "dfd_cert_name", "Completed By (Name, Title):", y);
  y = addFormTextField(doc, "dfd_cert_date", "Date:", y);
  y = addFormTextField(doc, "dfd_reviewed_by", "Reviewed By (Privacy Officer or Legal):", y);

  addDisclaimer(doc);
  return doc;
}
