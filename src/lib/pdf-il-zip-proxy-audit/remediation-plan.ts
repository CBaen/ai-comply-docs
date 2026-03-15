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
// IL Zip Code Proxy Audit — Doc 3: Remediation Plan
// Steps when zip code proxy effect is confirmed
// Per 775 ILCS 5/2-102(L)(1)
// ============================================================
export function generateRemediationPlan(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Zip Code Proxy Remediation Plan",
    data
  );
  y = addTopDisclaimer(doc, y);

  // IDHR rulemaking disclosure
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    "Note: IDHR is currently developing implementing rules for the AI notice requirements under 775 ILCS 5/2-102(L). The format, timing, and delivery requirements for employee notice are not yet finalized. This template reflects the statutory text as enacted. Update this document when IDHR publishes its rules.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    `This remediation plan documents the steps ${data.company.name} will take to address a confirmed zip code proxy effect identified in an AI employment decision system. Complete this plan after a proxy effect is confirmed in the Proxy Analysis Worksheet. 775 ILCS 5/2-102(L)(1) prohibits use of AI that has a discriminatory effect through zip code or other geographic proxies.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ---- SECTION 1: Finding Description ----
  y = addSectionHeader(doc, "Section 1: Finding Description", y);

  y = addFormTextField(doc, "rpl_ai_system", "AI System Where Proxy Was Found:", y);
  y = addFormTextField(doc, "rpl_vendor", "Vendor / Developer:", y);
  y = addFormTextField(doc, "rpl_finding_date", "Date Proxy Effect Was Confirmed:", y, {
    width: 80,
  });
  y = addFormTextField(
    doc,
    "rpl_finding_summary",
    "Summary of finding (describe the proxy effect, affected characteristics, and magnitude):",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "rpl_affected_decisions",
    "Employment decisions affected by this system:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "rpl_affected_population",
    "Estimated affected applicant / employee population:",
    y
  );

  // ---- SECTION 2: Immediate Response Actions ----
  y = addSectionHeader(doc, "Section 2: Immediate Response Actions", y);

  y = addWrappedText(
    doc,
    "Check all immediate actions taken upon confirmation of the proxy effect:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const immediateActions = [
    "AI system use suspended pending remediation",
    "Affected decisions flagged for human re-review",
    "Legal counsel notified",
    "HR leadership notified",
    "Vendor / developer notified and remediation requested",
    "Incident logged in compliance records",
    "IDHR monitoring initiated (dhr.illinois.gov)",
  ];
  immediateActions.forEach((action, idx) => {
    y = addFormCheckbox(doc, `rpl_immediate_${idx}`, action, y);
  });

  y = addFormTextField(
    doc,
    "rpl_immediate_other",
    "Other immediate actions taken:",
    y,
    { multiline: true, lines: 2 }
  );

  // ---- SECTION 3: Remediation Steps ----
  y = addSectionHeader(doc, "Section 3: Remediation Steps", y);

  y = addWrappedText(
    doc,
    "For each applicable remediation step, check the box, describe the specific action planned, assign a responsible person, and enter a target completion date.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const remSteps = [
    {
      label: "Remove zip code input from AI system",
      key: "remove_zip",
    },
    {
      label: "Remove all geographic proxy inputs (neighborhood, school district, commute distance, etc.)",
      key: "remove_geo",
    },
    {
      label: "Retrain AI model on dataset without geographic inputs",
      key: "retrain",
    },
    {
      label: "Implement alternative approach that achieves same business purpose without geographic data",
      key: "alternative",
    },
    {
      label: "Commission independent third-party bias audit of modified system",
      key: "third_party_audit",
    },
    {
      label: "Update employee notice to reflect AI system changes",
      key: "update_notice",
    },
    {
      label: "Conduct re-review of decisions made using the affected system",
      key: "re_review",
    },
  ];

  remSteps.forEach((step, idx) => {
    const prefix = `rpl_step${idx + 1}`;
    y = addFormCheckbox(doc, `${prefix}_check`, step.label, y);
    y = addFormTextField(doc, `${prefix}_detail`, "Specific action / approach:", y, {
      multiline: true, lines: 2,
    });
    y = addFormTextField(doc, `${prefix}_responsible`, "Responsible Person (Name / Title):", y);
    y = addFormTextField(doc, `${prefix}_target_date`, "Target Completion Date:", y, {
      width: 70,
    });
    y = addFormTextField(doc, `${prefix}_actual_date`, "Actual Completion Date:", y, {
      width: 70,
    });

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    if (y > 270) { doc.addPage(); y = MARGIN; }
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    y += LINE_HEIGHT + 2;
  });

  // ---- SECTION 4: Timeline ----
  y = addSectionHeader(doc, "Section 4: Remediation Timeline", y);

  y = addFormTextField(doc, "rpl_timeline_start", "Remediation Start Date:", y, { width: 80 });
  y = addFormTextField(doc, "rpl_timeline_target_complete", "Target Full Completion Date:", y, { width: 80 });
  y = addFormTextField(doc, "rpl_timeline_actual_complete", "Actual Completion Date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "rpl_timeline_milestones",
    "Key milestones and dates:",
    y,
    { multiline: true, lines: 4 }
  );

  // ---- SECTION 5: Responsible Person & Oversight ----
  y = addSectionHeader(doc, "Section 5: Responsible Person & Oversight", y);

  y = addFormTextField(
    doc,
    "rpl_lead_name",
    "Remediation Lead (Name / Title):",
    y
  );
  y = addFormTextField(
    doc,
    "rpl_oversight_name",
    "Executive Sponsor / Oversight Authority (Name / Title):",
    y
  );
  y = addFormTextField(
    doc,
    "rpl_legal_counsel",
    "Legal Counsel Assigned (Name / Firm):",
    y
  );
  y = addFormTextField(
    doc,
    "rpl_review_schedule",
    "Remediation progress review schedule:",
    y
  );

  // ---- SECTION 6: Post-Remediation Verification ----
  y = addSectionHeader(doc, "Section 6: Post-Remediation Verification", y);

  y = addWrappedText(
    doc,
    "After remediation is complete, verify that the proxy effect has been eliminated before returning the AI system to use in employment decisions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormCheckbox(
    doc,
    "rpl_verify_retest",
    "Post-remediation proxy analysis re-run and confirmed negative",
    y
  );
  y = addFormCheckbox(
    doc,
    "rpl_verify_audit",
    "Independent bias audit completed on remediated system",
    y
  );
  y = addFormCheckbox(
    doc,
    "rpl_verify_legal",
    "Legal counsel reviewed remediated system before return to use",
    y
  );
  y = addFormCheckbox(
    doc,
    "rpl_verify_notice_updated",
    "Employee notice updated to reflect any system changes",
    y
  );

  y = addFormTextField(
    doc,
    "rpl_verification_summary",
    "Verification summary / notes:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "rpl_return_to_use_date",
    "Date AI system returned to use (if applicable):",
    y,
    { width: 80 }
  );

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "rpl_remediation", y);
  addDisclaimer(doc);
  return doc;
}
