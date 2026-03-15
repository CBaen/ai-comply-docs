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
// AG Complaint Referral Notice
// Virginia CDPA — Va. Code § 59.1-577(C)(3)
// ============================================================
export function generateAgComplaintReferral(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Attorney General Complaint Referral Notice",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This notice is required by Va. Code § 59.1-577(C)(3). When ${data.company.name} denies a consumer's appeal of a refused rights request under the Virginia Consumer Data Protection Act (VCDPA), the company must provide the consumer with an online mechanism or other method to contact the Virginia Attorney General to submit a complaint. This document serves as that required referral notice and must be delivered to the consumer together with the appeal denial response.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Consumer & Case Identification ─────────────
  y = addSectionHeader(doc, "Section 1 — Consumer & Case Identification", y);
  y = addFormTextField(doc, "agr_consumer_name", "Consumer Name:", y);
  y = addFormTextField(doc, "agr_consumer_email", "Consumer Email Address:", y);
  y = addFormTextField(doc, "agr_original_request_id", "Original Request Tracking ID:", y);
  y = addFormTextField(doc, "agr_appeal_id", "Appeal Tracking ID:", y);
  y = addFormTextField(doc, "agr_denial_date", "Date Appeal Was Denied:", y);
  y += 4;

  // ── Section 2: Original Request Type ─────────────────────
  y = addSectionHeader(doc, "Section 2 — Original Request Type", y);
  y = addWrappedText(
    doc,
    "The consumer's original request involved the following VCDPA rights — check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const requestTypes = [
    "Right to confirm / access personal data (§ 59.1-577(A)(1))",
    "Right to correct inaccuracies in personal data (§ 59.1-577(A)(2))",
    "Right to delete personal data (§ 59.1-577(A)(3))",
    "Right to data portability (§ 59.1-577(A)(4))",
    "Right to opt out of targeted advertising (§ 59.1-577(A)(5)(a))",
    "Right to opt out of sale of personal data (§ 59.1-577(A)(5)(b))",
    "Right to opt out of profiling (§ 59.1-577(A)(5)(c))",
  ];
  requestTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `agr_request_type_${idx}`, type, y);
  });
  y += 4;

  // ── Section 3: Appeal Decision ────────────────────────────
  y = addSectionHeader(doc, "Section 3 — Appeal Decision", y);
  y = addFormTextField(
    doc,
    "agr_denial_reason",
    "Basis for appeal denial (summary — attach full denial letter):",
    y,
    { multiline: true, lines: 4 }
  );
  y += 4;

  // ── Section 4: Virginia AG Contact Information ────────────
  y = addSectionHeader(
    doc,
    "Section 4 — Virginia Attorney General Contact Information",
    y
  );
  y = addWrappedText(
    doc,
    "Pursuant to Va. Code § 59.1-577(C)(3), you have the right to contact the Virginia Attorney General to submit a complaint regarding this matter. The Virginia Attorney General has exclusive enforcement authority over the VCDPA (§ 59.1-584(A)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  // Pre-filled AG contact info
  y = addFormTextField(
    doc,
    "agr_ag_office",
    "Office:",
    y,
    { prefill: "Virginia Office of the Attorney General", readOnly: true }
  );
  y = addFormTextField(
    doc,
    "agr_ag_address",
    "Mailing Address:",
    y,
    { prefill: "202 North Ninth Street, Richmond, Virginia 23219", readOnly: true }
  );
  y = addFormTextField(
    doc,
    "agr_ag_phone",
    "Phone:",
    y,
    { prefill: "(804) 786-2071", readOnly: true }
  );
  y = addFormTextField(
    doc,
    "agr_ag_online_url",
    "Online Complaint Submission URL:",
    y,
    { prefill: "https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint", readOnly: true }
  );
  y += 4;

  y = addWrappedText(
    doc,
    "Note: Verify that the AG contact information above is current before sending this notice to the consumer. The AG's office and online complaint portal may change. Check oag.state.va.us for the most current information.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // ── Section 5: Consumer's Options Going Forward ───────────
  y = addSectionHeader(doc, "Section 5 — Consumer's Options Going Forward", y);
  y = addWrappedText(
    doc,
    "As a Virginia consumer, you have the following options after receiving this denial:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const options = [
    "File a complaint with the Virginia Attorney General using the contact information in Section 4 above.",
    "Consult with a private attorney regarding your rights (note: the VCDPA does not provide a private right of action against the controller directly).",
    "Submit a new request if your circumstances or the basis for your request has changed.",
    "Contact our privacy team with additional information that may affect our determination.",
  ];
  options.forEach((opt, idx) => {
    y = addFormCheckbox(doc, `agr_consumer_option_${idx}`, opt, y);
  });
  y += 4;

  // ── Section 6: Controller Privacy Contact ────────────────
  y = addSectionHeader(doc, "Section 6 — Our Privacy Contact Information", y);
  y = addFormTextField(
    doc,
    "agr_controller_privacy_contact",
    "Privacy Team Contact Name / Role:",
    y,
    { prefill: data.contact.name + " — " + data.contact.title }
  );
  y = addFormTextField(
    doc,
    "agr_controller_email",
    "Privacy Team Email:",
    y,
    { prefill: data.contact.email }
  );
  y = addFormTextField(
    doc,
    "agr_controller_phone",
    "Privacy Team Phone:",
    y,
    { prefill: data.contact.phone }
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "agr", y);

  addDisclaimer(doc);
  return doc;
}
