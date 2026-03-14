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
// DOCUMENT 1: Annual Compliance Review Checklist
// Dated section-by-section walkthrough of compliance status
// ============================================================
export function generateAnnualReviewChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Annual AI Compliance Review Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This checklist guides " +
      data.company.name +
      "'s annual review of AI compliance documents and regulatory status. " +
      "Complete this checklist every year — or whenever a significant regulatory change occurs. " +
      "A signed, dated copy should be retained as evidence of your compliance review process.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Review Session Information ─────────────────────────────
  y = addSectionHeader(doc, "1. Review Session Information", y);
  y = addFormTextField(doc, "arc_review_date", "Review Date:", y);
  y = addFormTextField(doc, "arc_review_period", "Review Period Covered (e.g., \"January 2025 – January 2026\"):", y);
  y = addFormTextField(doc, "arc_reviewer_name", "Lead Reviewer (Name & Title):", y);
  y = addFormTextField(doc, "arc_participants", "Other Participants in Review:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 2: Regulatory Status Check ────────────────────
  y = addSectionHeader(doc, "2. Regulatory Status — Laws That Apply to Us", y);
  y = addWrappedText(
    doc,
    "For each AI law that applies to your organization, verify current status. Laws change — new rules get adopted, " +
      "effective dates shift, enforcement priorities evolve. Check each item below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const regChecks = [
    { name: "arc_reg_il", label: "Illinois HB3773 (775 ILCS 5/2-102(L)): Verified current status at dhr.illinois.gov. IDHR rules status confirmed." },
    { name: "arc_reg_co", label: "Colorado SB24-205 (C.R.S. §§ 6-1-1701–1707): Verified effective date still June 30, 2026. No further amendments found." },
    { name: "arc_reg_nyc", label: "NYC Local Law 144 (Admin. Code §§ 20-870–20-874): Verified DCWP rules current at 6 RCNY § 5-300 et seq." },
    { name: "arc_reg_ca", label: "California CCPA/ADMT: Verified current CPPA regulations at cppa.ca.gov. No new rulemaking affecting our compliance." },
    { name: "arc_reg_mn", label: "Minnesota MCDPA (Minn. Stat. §§ 325M.10–325M.21): Verified effective July 31, 2025. Cure period status confirmed." },
    { name: "arc_reg_tx", label: "Texas TDPSA (Tex. Bus. & Com. Code Ch. 541): Verified in effect July 1, 2024. 30-day permanent cure period confirmed." },
    { name: "arc_reg_eu", label: "EU AI Act (Regulation (EU) 2024/1689): Verified current phase obligations. Checked for new implementing acts." },
    { name: "arc_reg_other", label: "Other applicable laws: [List below]. Verified current status of each." },
  ];
  regChecks.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "arc_other_laws", "Other applicable laws confirmed:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 3: Document Review ─────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "3. AI Compliance Document Review", y);
  y = addWrappedText(
    doc,
    "For each compliance document, confirm it is current, accurate, and reflects any regulatory changes. " +
      "If updates are needed, document what changed and when the updated version was adopted.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const docReviews = [
    { name: "arc_doc_policy", label: "Employee AI Acceptable Use Policy: Reviewed. All approved tools, prohibited uses, and oversight procedures are current." },
    { name: "arc_doc_training", label: "Training Acknowledgment Forms: All employees recertified this year. Training records updated." },
    { name: "arc_doc_vendor", label: "Vendor AI Due Diligence: All active AI vendor questionnaires and risk assessments are current." },
    { name: "arc_doc_bias", label: "Bias Audit Documentation: Annual bias audit completed (if required). Results reviewed and documented." },
    { name: "arc_doc_incident", label: "Incident Response Plan: Plan reviewed. Contact information current. No incidents since last review that require plan updates." },
    { name: "arc_doc_il", label: "Illinois HB3773 Package: Notification templates, impact assessment, and oversight protocol reviewed and updated if needed." },
    { name: "arc_doc_co", label: "Colorado SB24-205 Package: Risk management policy, impact assessment, and consumer notices reviewed." },
    { name: "arc_doc_nyc", label: "NYC LL144 Package: Bias audit summary reviewed. Candidate notification template current." },
    { name: "arc_doc_privacy", label: "Privacy Notices and Consumer Rights Procedures: All consumer-facing notices reviewed for accuracy." },
    { name: "arc_doc_other", label: "Other compliance documents: [List below]. All reviewed and updated." },
  ];
  docReviews.forEach((item) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "arc_doc_notes", "Document update notes:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 4: AI System Inventory Review ─────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "4. AI System Inventory Review", y);

  const sysChecks = [
    { name: "arc_sys_inventory", label: "AI system inventory is current. All active AI systems are listed." },
    { name: "arc_sys_new", label: "Any new AI systems added this year have been reviewed, approved, and added to the inventory." },
    { name: "arc_sys_retired", label: "Any AI systems retired this year have been removed from the inventory and related compliance documents updated." },
    { name: "arc_sys_vendors", label: "All AI vendor contracts are current. No vendor has made material changes to their AI systems without notification." },
    { name: "arc_sys_highrisk", label: "High-risk AI systems have been re-assessed. Risk levels remain accurate or have been updated." },
  ];
  sysChecks.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "arc_sys_changes", "AI system changes this year (new, retired, modified):", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 5: Incident & Complaint Review ─────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "5. AI Incidents & Complaints Review", y);

  const incidentChecks = [
    { name: "arc_inc_count", label: "Total number of AI incidents logged this year: [fill in field below]" },
    { name: "arc_inc_resolved", label: "All logged incidents have been resolved or have active remediation plans." },
    { name: "arc_inc_regulatory", label: "Any regulatory notifications required by incidents have been sent (e.g., CA TFAIA 15-day reporting)." },
    { name: "arc_inc_lessons", label: "Lessons learned from incidents have been incorporated into updated compliance documents or procedures." },
    { name: "arc_inc_complaints", label: "Consumer and employee complaints about AI have been reviewed. Patterns noted and addressed." },
  ];
  incidentChecks.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "arc_incident_count", "Number of AI incidents logged this year:", y);
  y = addFormTextField(doc, "arc_incident_summary", "Summary of significant incidents:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 6: Training Status ─────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "6. Training & Awareness Review", y);

  const trainingChecks = [
    { name: "arc_train_annual", label: "Annual AI training completed by all required employees. Completion records on file." },
    { name: "arc_train_new", label: "New employees hired this year completed AI training within 30 days of start date." },
    { name: "arc_train_updated", label: "Training content was reviewed and updated to reflect any changes in policy, tools, or regulations." },
    { name: "arc_train_managers", label: "Manager training on AI communication and policy enforcement completed." },
  ];
  trainingChecks.forEach((item) => {
    y = addFormCheckbox(doc, item.name, item.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "arc_train_notes", "Training notes:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 7: Sign-Off ────────────────────────────────────
  if (y > 210) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "7. Annual Review Sign-Off", y);
  y = addWrappedText(
    doc,
    "By signing below, the reviewer certifies that: " +
      "(a) this annual compliance review was conducted in good faith; " +
      "(b) the items checked above were verified to the best of the reviewer's knowledge; " +
      "(c) identified gaps have been documented in the Update Log; and " +
      "(d) corrective actions have been or are being taken.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "arc_signoff_name", "Lead Reviewer Name (Print):", y);
  y = addFormTextField(doc, "arc_signoff_title", "Title:", y);
  y = addFormTextField(doc, "arc_signoff_sig", "Signature:", y);
  y = addFormTextField(doc, "arc_signoff_date", "Date:", y);
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "arc_next_review", "Date of Next Scheduled Annual Review:", y);

  addDisclaimer(doc);
  return doc;
}
