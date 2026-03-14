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
// DOCUMENT 6: ADMT Impact Assessment
// CA CCPA ADMT — Cal. Civ. Code § 1798.100 et seq.
// ============================================================
export function generateADMTImpactAssessment(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "ADMT Impact Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This ADMT Impact Assessment evaluates the broader privacy and civil rights impacts of ${data.company.name}'s use of automated decisionmaking technology (ADMT), pursuant to the CPPA ADMT regulations under Cal. Civ. Code \u00A7 1798.100 et seq., effective January 1, 2026. This assessment supplements the ADMT Risk Assessment and focuses on systemic impacts on consumers. Verify current CPPA requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Impact Assessment: ${sys.name}`, y);

    y = addFormTextField(doc, `ia_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(doc, `ia_${idx}_assessor`, "Conducted By (Name/Title):", y);
    y += 4;

    y = addWrappedText(
      doc,
      "1. Scale and Scope of ADMT Use:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_scale`,
      "  Estimated number of consumers affected annually:",
      y
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_frequency`,
      "  Frequency of decisions made by this ADMT:",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      "2. Potential for Discriminatory Impact (check all applicable protected classes):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const protectedClasses = [
      "Race / color / national origin",
      "Sex / gender",
      "Religion",
      "Disability status",
      "Age (40+)",
      "Sexual orientation",
      "Gender identity",
      "Familial status",
      "Veteran status",
    ];
    protectedClasses.forEach((pc, pcidx) => {
      y = addFormCheckbox(doc, `ia_${idx}_pc_${pcidx}`, pc, y);
    });
    y = addFormTextField(
      doc,
      `ia_${idx}_discrimination_analysis`,
      "  Discrimination impact analysis:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "3. Accuracy and Error Rate Analysis:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_accuracy`,
      "  Known error rates and impact on affected consumers:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "4. Data Minimization Analysis:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_minimization`,
      "  Is only necessary personal information used? Describe:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "5. Consumer Autonomy Impacts:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_autonomy`,
      "  How does this ADMT affect consumer choice and control?",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "6. Overall Impact Conclusion:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `ia_${idx}_conclusion`,
      "  Summary conclusion and ongoing monitoring plan:",
      y,
      { multiline: true, lines: 3 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Approval", y);
  y = addFormTextField(doc, "approval_name", "Approved By (Name/Title):", y);
  y = addFormTextField(doc, "approval_date", "Date:", y);
  y = addFormTextField(doc, "approval_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: review this assessment annually and whenever the ADMT system or its deployment context changes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "ca_admt_impact", y);

  addDisclaimer(doc);
  return doc;
}
