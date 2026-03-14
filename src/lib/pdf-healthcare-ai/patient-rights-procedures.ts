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
// DOCUMENT 5: Patient Rights Procedures for AI-Processed Records (45 CFR Part 164, Subpart E)
// ============================================================
export function generatePatientRightsProcedures(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Patient Rights Procedures — AI-Processed Health Records", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures establish how ${data.company.name} fulfills individual rights under the HIPAA Privacy Rule (45 CFR Part 164, Subpart E) when AI systems have processed, analyzed, or contributed to decisions using a patient's protected health information (PHI). The Privacy Rule grants individuals specific rights regarding their PHI regardless of whether a human or an AI system processed it.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Right 1: Access
  y = addSectionHeader(doc, "1. Right of Access to AI-Processed PHI (45 CFR \u00A7 164.524)", y);
  y = addWrappedText(
    doc,
    "Individuals have the right to access and obtain a copy of their PHI in a designated record set (45 CFR \u00A7 164.524(a)(1)). When AI systems process PHI, access requests must include:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const accessItems = [
    "All PHI in the designated record set that was input to or processed by AI systems",
    "AI-generated assessments, risk scores, or outputs that are maintained in the designated record set",
    "Any documentation of AI system recommendations used in treatment or payment decisions",
    "Access request response within 30 days of receipt (45 CFR \u00A7 164.524(b)(2)(i)); 60-day extension available with written notice",
    "Fees limited to reasonable cost-based fee for labor of copying and supplies (45 CFR \u00A7 164.524(c)(4))",
    "Electronic access in the requested format if readily producible (45 CFR \u00A7 164.524(c)(2)(ii))",
  ];
  let cbIdx = 0;
  accessItems.forEach((item) => {
    y = addFormCheckbox(doc, `access_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += 4;

  y = addWrappedText(
    doc,
    "Access may be denied (with right to review denial) for: psychotherapy notes; information compiled in anticipation of litigation; or if access would endanger life or safety of a person. (45 CFR \u00A7 164.524(a)(3))",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Right 2: Amendment
  y = addSectionHeader(doc, "2. Right to Amend AI-Processed PHI (45 CFR \u00A7 164.526)", y);
  y = addWrappedText(
    doc,
    "Individuals may request amendment of PHI in a designated record set for as long as the covered entity maintains it. (45 CFR \u00A7 164.526(a)(1)) When AI system outputs are part of the designated record set:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const amendItems = [
    "Amendment requests addressed within 60 days of receipt (45 CFR \u00A7 164.526(b)(2))",
    "Amendment applied to AI-generated records maintained in the designated record set",
    "When amendment accepted: PHI and AI-generated outputs updated; relevant business associates notified to update their records",
    "When amendment denied: written denial with basis provided; individual's rebuttal statement appended to record",
    "AI system outputs that are inaccurate or incomplete may be subject to amendment under this right",
  ];
  amendItems.forEach((item) => {
    y = addFormCheckbox(doc, `amend_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Right 3: Accounting of Disclosures
  y = addSectionHeader(doc, "3. Accounting of Disclosures of AI-Processed PHI (45 CFR \u00A7 164.528)", y);
  y = addWrappedText(
    doc,
    "Individuals have the right to an accounting of disclosures of their PHI made by the covered entity in the 6 years prior to the request (45 CFR \u00A7 164.528(a)(1)). Disclosures made by AI systems must be tracked:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const accountingItems = [
    "AI system audit logs retained to support accounting of disclosures",
    "Disclosures for treatment, payment, and healthcare operations are excluded from accounting (45 CFR \u00A7 164.528(a)(1)(i))",
    "Disclosures to public health authorities, law enforcement, or for research with waiver are included in accounting",
    "Accounting response provided within 60 days (30-day extension available with written notice) (45 CFR \u00A7 164.528(c))",
    "First accounting in any 12-month period is free; subsequent requests may be assessed reasonable cost-based fee",
  ];
  accountingItems.forEach((item) => {
    y = addFormCheckbox(doc, `accounting_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Right 4: Restrict Disclosures
  y = addSectionHeader(doc, "4. Right to Request Restrictions (45 CFR \u00A7 164.522(a))", y);
  y = addWrappedText(
    doc,
    "Individuals may request restrictions on use or disclosure of their PHI. Covered entities are NOT required to agree to requested restrictions, with one exception: if the individual pays out-of-pocket in full for a healthcare item or service, the covered entity must agree to restrict disclosure of that PHI to a health plan for payment or healthcare operations purposes. (45 CFR \u00A7 164.522(a)(1)(vi)) For AI systems:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const restrictItems = [
    "Restriction requests reviewed and responded to in writing",
    "Agreed restrictions documented and communicated to AI system operators",
    "Mandatory out-of-pocket payment restrictions honored and flagged in AI system access controls",
    "Restrictions applied consistently across all AI systems that access the individual's PHI",
  ];
  restrictItems.forEach((item) => {
    y = addFormCheckbox(doc, `restrict_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Right 5: Confidential Communications
  y = addSectionHeader(doc, "5. Right to Confidential Communications (45 CFR \u00A7 164.522(b))", y);
  y = addWrappedText(
    doc,
    "Individuals may request to receive communications about their PHI by alternative means or at alternative locations. AI-generated communications (appointment reminders, test result notifications, care management outreach) must honor these requests.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // De-identification
  y = addSectionHeader(doc, "6. De-identification for AI Development and Testing (45 CFR \u00A7 164.514)", y);
  y = addWrappedText(
    doc,
    "PHI de-identified under 45 CFR \u00A7 164.514(b) (Expert Determination or Safe Harbor method) is not subject to the Privacy Rule. When using health data to train, test, or improve AI models:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const deIdItems = [
    "De-identification method documented (Expert Determination per \u00A7 164.514(b)(1) or Safe Harbor per \u00A7 164.514(b)(2))",
    "Safe Harbor: all 18 specified identifiers removed and no actual knowledge of re-identification ability",
    "Expert Determination: qualified expert applies generally accepted statistical principles certifying very small risk of identification",
    "Re-identification risk assessed before using de-identified data in AI training or testing",
    "Covered entity does not represent that the data is de-identified unless the standard is fully met",
  ];
  deIdItems.forEach((item) => {
    y = addFormCheckbox(doc, `deid_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Procedures contact
  y = addSectionHeader(doc, "7. Patient Rights Contact Information", y);
  y = addWrappedText(
    doc,
    `Patients should direct requests regarding rights described in this document to:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(doc, `${data.contact.name}, ${data.contact.title || "Privacy Officer"}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.email) y = addWrappedText(doc, `Email: ${data.contact.email}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  if (data.contact.phone) y = addWrappedText(doc, `Phone: ${data.contact.phone}`, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "rights_approved_by", "Procedures Approved by (Privacy Officer):", y, { width: 100 });
  y = addFormTextField(doc, "rights_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "rights_next_review", "Next Review Date:", y, { width: 60 });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "hipaa_rights", y);

  addDisclaimer(doc);
  return doc;
}
