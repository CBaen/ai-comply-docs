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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 8: EU AI Act Compliance Checklist
// ============================================================
export function generateEUAIActChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: High-Risk System Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `Use this checklist to verify compliance with Regulation (EU) 2024/1689 (EU AI Act) for high-risk AI systems operated by ${data.company.name}. Review at least ${REVIEW_LABELS[data.oversight.reviewFrequency] || "annually"} and whenever a system is substantially modified. Phased obligations: prohibited AI practices from February 2025, GPAI from August 2025, Annex III high-risk from August 2027.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const sections: { title: string; items: string[] }[] = [
    {
      title: "Classification and Scope (Arts. 5-7)",
      items: [
        "Confirmed system is not a prohibited AI practice (Art. 5) — no unacceptable risk uses",
        "System classified as high-risk under Annex III — classification documented",
        "GPAI obligations assessed if system uses a general-purpose AI model (Art. 52 et seq.)",
        "Extraterritorial reach assessed — system affects EU residents regardless of provider location",
      ],
    },
    {
      title: "Risk Management System (Art. 9)",
      items: [
        "Risk management system established and documented throughout the system lifecycle",
        "Known and foreseeable risks identified (Art. 9(2)(a))",
        "Risk estimation and evaluation completed (Art. 9(2)(b))",
        "Risk management measures implemented and verified (Art. 9(2)(c))",
        "Residual risks identified and disclosed to deployers (Art. 9(2)(d))",
        "Testing procedures established and completed before market placement (Art. 9(5))",
      ],
    },
    {
      title: "Data Governance (Art. 10)",
      items: [
        "Training data governance practices documented (relevance, representativeness, error assessment)",
        "Validation and testing data assessed for quality and statistical properties",
        "Data examined for potential biases that may affect fundamental rights (Art. 10(2)(f))",
        "Data gaps and shortcomings identified and addressed (Art. 10(2)(g))",
        "Special category data processing: conditions of Art. 10(5) satisfied (if applicable)",
      ],
    },
    {
      title: "Technical Documentation (Art. 11 + Annex IV)",
      items: [
        "Technical documentation (Annex IV) established before market placement",
        "Annex IV §1 general description complete (purpose, inputs, capabilities)",
        "Annex IV §2 detailed element description complete (methods, architecture, training)",
        "Annex IV §3 monitoring, functioning, and control documented",
        "Annex IV §4 market placement information documented",
        "Technical documentation kept up to date throughout lifecycle",
        "Documentation retained for 10 years after last placement on market (Art. 18)",
      ],
    },
    {
      title: "Automatic Event Recording — Logs (Art. 12)",
      items: [
        "Automatic logging of system operation implemented",
        "Logs include date/time ranges, reference database inputs, input data enabling verification (Art. 12(2))",
        "Log retention period defined and implemented",
        "Logs accessible to national authorities upon request",
      ],
    },
    {
      title: "Transparency and Instructions for Use (Art. 13)",
      items: [
        "Instructions for Use prepared in machine-readable format (Art. 13(1))",
        "Instructions include all Art. 13(3) mandatory elements",
        "Known performance limitations and failure modes disclosed",
        "Human oversight measures described in Instructions for Use",
      ],
    },
    {
      title: "Human Oversight (Art. 14)",
      items: [
        "Human oversight measures designed into the system (Art. 14(1))",
        "Oversight persons able to understand capabilities and limitations (Art. 14(4)(a))",
        "Oversight persons able to detect anomalies and unexpected performance (Art. 14(4)(b))",
        "Automation bias awareness built into oversight procedures (Art. 14(4)(c))",
        "Oversight persons able to interpret AI output correctly (Art. 14(4)(d))",
        "Override authority documented — oversight person can reject AI output (Art. 14(4)(e))",
        "Stop/interrupt capability implemented and tested (Art. 14(4)(f))",
      ],
    },
    {
      title: "Accuracy, Robustness, Cybersecurity (Art. 15)",
      items: [
        "Accuracy levels documented and maintained throughout lifecycle (Art. 15(1))",
        "System tested for resilience against errors, faults, and inconsistencies (Art. 15(3))",
        "Technical robustness measures implemented against adversarial attacks (Art. 15(4))",
        "Cybersecurity measures proportionate to risk implemented",
      ],
    },
    {
      title: "Quality Management System (Art. 17)",
      items: [
        "Quality management system established covering all lifecycle phases (Art. 17(1))",
        "QMS covers strategies for compliance with applicable requirements",
        "QMS covers examination, testing, and validation procedures",
        "QMS covers post-market monitoring and incident reporting",
        "QMS documented in a systematic and orderly manner",
      ],
    },
    {
      title: "Conformity Assessment and Marking (Arts. 43, 47, 48, 49)",
      items: [
        "Conformity assessment completed before market placement (Art. 43)",
        "EU Declaration of Conformity drawn up (Art. 47)",
        "CE marking affixed visibly and legibly (Art. 48)",
        "System registered in EU database (Art. 49) — where required",
      ],
    },
    {
      title: "Post-Market Monitoring (Art. 72) and Incident Reporting (Art. 73)",
      items: [
        "Post-market monitoring plan established and active (Art. 72)",
        "Experience from use systematically collected and reviewed",
        "Serious incident reporting procedure in place (Art. 73)",
        "National market surveillance authority contact documented",
        "Corrective action process established (Art. 20)",
      ],
    },
    {
      title: "Deployer-Specific Obligations (Art. 26) — If Acting as Deployer",
      items: [
        "System used only in accordance with provider's Instructions for Use (Art. 26(1))",
        "Natural persons responsible for human oversight identified and trained (Art. 26(5))",
        "Individuals notified that they are subject to a high-risk AI system (Art. 26(10)) — where applicable",
        "Post-market monitoring obligations assessed and fulfilled (Art. 26(6))",
        "Fundamental rights impact assessment conducted where required (Art. 27)",
      ],
    },
  ];

  let cbGlobalCount = 0;
  sections.forEach((section) => {
    y = addSectionHeader(doc, section.title, y);
    section.items.forEach((item) => {
      y = addFormCheckbox(doc, "eu_cl_" + cbGlobalCount, item, y);
      cbGlobalCount++;
    });
    y += LINE_HEIGHT;
  });

  // Sign-off
  y = addSectionHeader(doc, "Checklist Completed By", y);
  y = addFormTextField(doc, "eu_cl_name", "Name:", y, { width: 100 });
  y = addFormTextField(doc, "eu_cl_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "eu_cl_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "eu_cl_next", "Next review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
