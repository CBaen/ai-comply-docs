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
// DOCUMENT 1: Multi-State Data Protection Assessment
// Covers all 15+ states requiring documented profiling assessments
// ============================================================
export function generateMultiStateAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Multi-State Data Protection Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Multi-State Data Protection Assessment is completed by ${data.company.name} to document compliance with the data protection assessment requirements of state consumer privacy laws. Fifteen or more states now require controllers to conduct and document assessments before engaging in profiling, targeted advertising, data sales, or sensitive data processing. This template addresses the common assessment elements across all major state privacy laws. Refer to the State Comparison Matrix for each state\u2019s specific thresholds and cure periods.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Applicable State Laws", y);
  y = addWrappedText(
    doc,
    "Check each state law that applies to this organization\u2019s processing activities:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const stateLaws = [
    "Virginia VCDPA \u2014 Va. Code \u00A7\u00A7 59.1-571 et seq. (eff. Jan 1, 2023)",
    "Connecticut CTDPA \u2014 Conn. Gen. Stat. \u00A7\u00A7 42-515 et seq. (eff. Jul 1, 2023)",
    "Colorado CPA \u2014 C.R.S. \u00A7\u00A7 6-1-1301 et seq. (eff. Jul 1, 2023)",
    "Texas TDPSA \u2014 Tex. Bus. & Com. Code Ch. 541 (eff. Jul 1, 2024)",
    "Oregon OCPA \u2014 Or. Rev. Stat. \u00A7\u00A7 646A.570 et seq. (eff. Jul 1, 2024)",
    "Montana MCDPA \u2014 Mont. Code Ann. \u00A7\u00A7 30-14-3001 et seq. (eff. Oct 1, 2024)",
    "Delaware PDPA \u2014 Del. Code tit. 6, ch. 12D (eff. Jan 1, 2025)",
    "Minnesota MCDPA \u2014 Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21 (eff. Jul 31, 2025)",
    "Iowa ICDPA \u2014 Iowa Code \u00A7\u00A7 715D.1 et seq. (eff. Jan 1, 2025)",
    "Indiana INCDPA \u2014 Ind. Code \u00A7\u00A7 24-15-1 et seq. (eff. Jan 1, 2026)",
    "Maryland MODPA \u2014 Md. Code, Com. Law \u00A7\u00A7 14-4601 et seq. (eff. Oct 1, 2025)",
    "New Hampshire NHPDA \u2014 N.H. Rev. Stat. \u00A7\u00A7 507-H:1 et seq. (eff. Jan 1, 2025)",
    "New Jersey NJDPA \u2014 N.J. Rev. Stat. \u00A7\u00A7 56:8-166.1 et seq. (eff. Jan 15, 2025)",
    "Tennessee TIPA \u2014 Tenn. Code Ann. \u00A7\u00A7 47-18-3201 et seq. (eff. Jul 1, 2025)",
    "Kentucky KCDPA \u2014 Ky. Rev. Stat. \u00A7\u00A7 367.380 et seq. (eff. Jan 1, 2026)",
  ];
  stateLaws.forEach((law, idx) => {
    y = addFormCheckbox(doc, "state_" + idx, law, y);
  });
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Assessment for: ${sys.name}`, y);

    y = addFormTextField(doc, `dpa_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(doc, `dpa_${idx}_reviewer`, "Completed By (Name/Title):", y);
    y += 4;

    y = addWrappedText(
      doc,
      "Processing activities covered by this assessment \u2014 check all that apply:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const activities = [
      "Targeted advertising",
      "Sale of personal data",
      "Profiling for decisions with legal or similarly significant effects on consumers",
      "Processing sensitive data (health, financial, genetic, biometric, precise geolocation, child data, etc.)",
    ];
    activities.forEach((act, aidx) => {
      y = addFormCheckbox(doc, `dpa_${idx}_act_${aidx}`, act, y);
    });
    y += 4;

    y = addFormTextField(doc, `dpa_${idx}_purpose`, "Specific purpose of processing:", y, {
      multiline: true,
      lines: 2,
    });

    y = addWrappedText(doc, "Benefits of processing:", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `dpa_${idx}_benefits`, "", y, { multiline: true, lines: 2 });

    y = addWrappedText(
      doc,
      "Risks to consumers \u2014 including unfair or discriminatory impact:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_risks`, "", y, { multiline: true, lines: 3 });

    y = addWrappedText(
      doc,
      "Safeguards implemented to address identified risks:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_safeguards`, "", y, { multiline: true, lines: 3 });

    y = addWrappedText(
      doc,
      "Conclusion \u2014 do the benefits of processing outweigh the risks?",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `dpa_${idx}_conclusion`, "", y, { multiline: true, lines: 2 });

    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Review and Approval", y);
  y = addFormTextField(doc, "review_name", "Reviewed By (Name/Title):", y);
  y = addFormTextField(doc, "review_date", "Review Date:", y);
  y = addFormTextField(doc, "review_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice: review assessments annually and when processing activities change significantly. Make assessments available to state AGs upon request. Cure periods and enforcement mechanisms vary by state \u2014 see State Comparison Matrix.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ms_assess", y);

  addDisclaimer(doc);
  return doc;
}
