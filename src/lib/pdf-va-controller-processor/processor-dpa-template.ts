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
} from "../pdf-helpers";

// ============================================================
// Controller-Processor Data Processing Agreement Template
// Virginia CDPA — Va. Code § 59.1-579(B)
// ============================================================
export function generateProcessorDpaTemplate(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Controller-Processor Data Processing Agreement",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Data Processing Agreement (DPA) is entered into between ${data.company.name} (Controller) and the Processor identified below, pursuant to Va. Code § 59.1-579(B). The VCDPA requires that processing by a processor on behalf of a controller be governed by a contract that sets out the required elements enumerated in § 59.1-579(B)(1)–(5). This template contains all required statutory terms. Customize each section to reflect the specific engagement before execution.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Parties ───────────────────────────────────────────────
  y = addSectionHeader(doc, "Parties to This Agreement", y);
  y = addFormTextField(
    doc,
    "dpa_controller_name",
    "Controller (Business Name):",
    y,
    { prefill: data.company.name }
  );
  y = addFormTextField(doc, "dpa_controller_address", "Controller Mailing Address:", y);
  y = addFormTextField(doc, "dpa_controller_contact", "Controller Privacy Contact (Name / Title / Email):", y);
  y = addFormTextField(doc, "dpa_processor_name", "Processor (Business Name):", y);
  y = addFormTextField(doc, "dpa_processor_address", "Processor Mailing Address:", y);
  y = addFormTextField(doc, "dpa_processor_contact", "Processor Privacy Contact (Name / Title / Email):", y);
  y = addFormTextField(doc, "dpa_effective_date", "Agreement Effective Date:", y);
  y += 4;

  // ── Required Term 1: Processing Instructions ─────────────
  y = addSectionHeader(
    doc,
    "Required Term 1 — Processing Instructions (§ 59.1-579(B)(1))",
    y
  );
  y = addWrappedText(
    doc,
    "The contract must set forth the instructions for processing personal data, including the nature and purpose of processing, the type of personal data, and the duration of processing.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "dpa_instr_included",
    "Processing instructions clause is included in this agreement",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_instr_nature",
    "Nature of processing (describe the processing operations):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "dpa_instr_purpose",
    "Purpose of processing (specific, explicit purpose):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "dpa_instr_data_types",
    "Types of personal data to be processed:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "dpa_instr_duration", "Duration of processing:", y);
  y += 4;

  // ── Required Term 2: Duty of Confidentiality ─────────────
  y = addSectionHeader(
    doc,
    "Required Term 2 — Duty of Confidentiality (§ 59.1-579(B)(2))",
    y
  );
  y = addWrappedText(
    doc,
    "The contract must require the processor to ensure that each person processing personal data is subject to a duty of confidentiality with respect to the data.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "dpa_conf_included",
    "Duty of confidentiality clause is included in this agreement",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_conf_mechanism",
    "Mechanism for ensuring confidentiality (e.g., employee agreements, NDAs, access controls):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Required Term 3: Delete or Return on Request ─────────
  y = addSectionHeader(
    doc,
    "Required Term 3 — Delete or Return Data on Request (§ 59.1-579(B)(3))",
    y
  );
  y = addWrappedText(
    doc,
    "The contract must require the processor to delete or return all personal data to the controller as requested at the end of the provision of services, unless retention is required by law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "dpa_delete_included",
    "Delete / return on request clause is included in this agreement",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_delete_method",
    "Deletion / return method and timeline:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "dpa_delete_retention_exceptions",
    "Retention required by law (identify applicable laws, if any):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Required Term 4: Demonstrate Compliance ──────────────
  y = addSectionHeader(
    doc,
    "Required Term 4 — Demonstrate Compliance on Request (§ 59.1-579(B)(4))",
    y
  );
  y = addWrappedText(
    doc,
    "The contract must require the processor to provide the controller all information reasonably necessary to demonstrate compliance with the VCDPA and allow and cooperate with reasonable assessments by the controller or the controller's designated auditor.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "dpa_audit_right_included",
    "Demonstrate compliance / audit cooperation clause is included in this agreement",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_audit_frequency",
    "Audit / assessment frequency or trigger events:",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_audit_notice_period",
    "Notice period required before audit / assessment:",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_audit_alternative",
    "Permitted alternative to direct audit (e.g., third-party certification, SOC 2 report):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Required Term 5: Subcontractor Engagement ────────────
  y = addSectionHeader(
    doc,
    "Required Term 5 — Subcontractor Engagement (§ 59.1-579(B)(5))",
    y
  );
  y = addWrappedText(
    doc,
    "The contract must require that the processor engage any subcontractor only pursuant to a binding contract that requires the subcontractor to meet the obligations of the processor with respect to the personal data and that the processor remains liable to the controller for the acts and omissions of subcontractors.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "dpa_sub_included",
    "Subcontractor engagement and flow-down clause is included in this agreement",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_sub_approval_process",
    "Process for obtaining controller approval for new subcontractors:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "dpa_sub_objection_period",
    "Notice period and objection window for new subcontractors:",
    y
  );
  y = addFormTextField(
    doc,
    "dpa_sub_liability",
    "Processor liability for subcontractor acts and omissions (confirm clause language):",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Additional Terms ──────────────────────────────────────
  y = addSectionHeader(doc, "Additional Terms (Recommended Best Practice)", y);
  y = addWrappedText(
    doc,
    "Check each recommended term that is included in the final executed agreement:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const additionalTerms = [
    "Security measures — processor maintains appropriate technical and organizational measures",
    "Breach notification — processor notifies controller within specified timeframe of any personal data breach",
    "Consumer rights assistance — processor cooperates in fulfilling consumer rights requests",
    "Controller audit rights — periodic review schedule documented",
    "Term and termination — agreement duration and data handling on termination",
    "Governing law — Virginia law governs the agreement",
  ];
  additionalTerms.forEach((term, termIdx) => {
    y = addFormCheckbox(doc, `dpa_additional_${termIdx}`, term, y);
  });
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "dpa", y);

  addDisclaimer(doc);
  return doc;
}
