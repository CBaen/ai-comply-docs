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
// Subcontractor Flow-Down Addendum
// Virginia CDPA — Va. Code § 59.1-579(B)(5)
// ============================================================
export function generateSubcontractorFlowdown(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Processor-to-Subcontractor Compliance Addendum",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Addendum is entered into between the Processor identified below and its Subcontractor, pursuant to Va. Code § 59.1-579(B)(5). The VCDPA requires that when a processor engages a subcontractor to assist in processing personal data on behalf of a controller, the processor must bind the subcontractor by a contract that imposes on the subcontractor the same data protection obligations as those imposed on the processor under its agreement with the controller. ${data.company.name} is the originating Controller. This Addendum flows down obligations from the Controller-Processor DPA to the subcontractor tier.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Parties ───────────────────────────────────────────────
  y = addSectionHeader(doc, "Parties", y);
  y = addFormTextField(
    doc,
    "sfa_controller_name",
    "Originating Controller (Business Name):",
    y,
    { prefill: data.company.name }
  );
  y = addFormTextField(doc, "sfa_processor_name", "Processor (Party entering this Addendum as 'Processor'):", y);
  y = addFormTextField(doc, "sfa_processor_address", "Processor Mailing Address:", y);
  y = addFormTextField(doc, "sfa_subcontractor_name", "Subcontractor (Party entering this Addendum as 'Subcontractor'):", y);
  y = addFormTextField(doc, "sfa_subcontractor_address", "Subcontractor Mailing Address:", y);
  y = addFormTextField(doc, "sfa_primary_dpa_ref", "Primary Controller-Processor DPA Reference / Effective Date:", y);
  y = addFormTextField(doc, "sfa_addendum_effective_date", "This Addendum Effective Date:", y);
  y += 4;

  // ── Section 1: Scope of Subcontracted Processing ─────────
  y = addSectionHeader(
    doc,
    "Section 1 — Scope of Subcontracted Processing",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s1_nature",
    "Nature of processing subcontracted to Subcontractor:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "sfa_s1_purpose",
    "Purpose for which personal data is processed by Subcontractor:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "sfa_s1_data_categories",
    "Categories of personal data to be processed by Subcontractor:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "sfa_s1_data_subjects",
    "Categories of data subjects whose data is processed:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "sfa_s1_duration", "Duration of processing under this Addendum:", y);
  y += 4;

  // ── Section 2: Flow-Down Obligations ─────────────────────
  y = addSectionHeader(
    doc,
    "Section 2 — Flow-Down Obligations (§ 59.1-579(B)(5))",
    y
  );
  y = addWrappedText(
    doc,
    "The following obligations from the primary Controller-Processor DPA flow down to Subcontractor under this Addendum. Confirm each obligation is incorporated by checking the corresponding box:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const flowDownObligations = [
    "Process personal data only on documented instructions from Processor (which originate from Controller) — § 59.1-579(B)(1)",
    "Ensure all persons authorized to process the personal data are subject to a duty of confidentiality — § 59.1-579(B)(2)",
    "Delete or return all personal data to Processor at the end of service provision, unless retention is required by law — § 59.1-579(B)(3)",
    "Provide all information reasonably necessary for Processor to demonstrate compliance and cooperate with Processor's audits and assessments — § 59.1-579(B)(4)",
    "Not engage further sub-tier contractors without prior written approval from Processor — § 59.1-579(B)(5)",
    "Implement and maintain appropriate technical and organizational security measures to protect personal data",
    "Notify Processor without undue delay upon becoming aware of a personal data breach involving Controller's data",
    "Not process personal data for any purpose beyond the scope of this Addendum",
    "Assist Processor in fulfilling Controller's obligations to respond to consumer rights requests under § 59.1-577",
    "Assist Processor in its data protection assessment obligations under § 59.1-580, as applicable to the subcontracted processing",
  ];
  flowDownObligations.forEach((obligation, oIdx) => {
    y = addFormCheckbox(doc, `sfa_s2_obligation_${oIdx}`, obligation, y);
  });
  y += 4;

  // ── Section 3: Controller Approval Mechanism ─────────────
  y = addSectionHeader(
    doc,
    "Section 3 — Controller Approval Mechanism",
    y
  );
  y = addWrappedText(
    doc,
    "Describe the process by which Processor obtained and will maintain Controller approval for engaging this Subcontractor:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "sfa_s3_prior_written_approval",
    "Prior written approval from Controller was obtained before engaging this Subcontractor",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s3_approval_date",
    "Date Controller approval was obtained:",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s3_approval_contact",
    "Controller representative who approved engagement (Name / Title):",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s3_notice_process",
    "Process for notifying Controller of any proposed change of Subcontractor (notice period and method):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "sfa_s3_objection_window",
    "Controller objection window (time period within which Controller may object to a proposed new Subcontractor):",
    y
  );
  y += 4;

  // ── Section 4: Direct Liability Provisions ────────────────
  y = addSectionHeader(
    doc,
    "Section 4 — Processor Liability for Subcontractor (§ 59.1-579(B)(5))",
    y
  );
  y = addWrappedText(
    doc,
    "Under § 59.1-579(B)(5), the Processor remains liable to the Controller for the acts and omissions of the Subcontractor to the same extent the Processor would be liable if performing those services directly. The following provisions confirm this liability structure:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "sfa_s4_processor_remains_liable",
    "Processor acknowledges it remains liable to Controller for Subcontractor's acts and omissions",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s4_liability_cap",
    "Any agreed limitation of liability applicable to Subcontractor's direct obligations under this Addendum (cross-reference primary DPA terms):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "sfa_s4_remedies",
    "Remedies available to Processor against Subcontractor for breach of this Addendum:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  // ── Section 5: Term & Termination ────────────────────────
  y = addSectionHeader(doc, "Section 5 — Term and Termination", y);
  y = addFormTextField(
    doc,
    "sfa_s5_term_end",
    "This Addendum terminates on (date) or upon termination of the primary Controller-Processor DPA, whichever is earlier:",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s5_data_return",
    "Upon termination, Subcontractor must delete or return all Controller personal data to Processor within:",
    y
  );
  y = addFormTextField(
    doc,
    "sfa_s5_termination_for_cause",
    "Termination for cause provision — Processor may immediately terminate this Addendum if Subcontractor materially breaches (describe mechanism):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "sfa", y);

  addDisclaimer(doc);
  return doc;
}
