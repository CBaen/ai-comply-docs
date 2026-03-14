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
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 10: Fundamental Rights Impact Assessment
// EU AI Act Art. 27 — Fundamental Rights Impact Assessment for Deployers
// ============================================================
export function generateFundamentalRightsImpact(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Fundamental Rights Impact Assessment",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Fundamental Rights Impact Assessment (FRIA) is conducted by ${data.company.name} pursuant to Article 27 of Regulation (EU) 2024/1689, which requires deployers of certain high-risk AI systems to conduct a fundamental rights impact assessment before deploying the system. Article 27 applies to bodies governed by public law and private operators providing banking, insurance, education, and similar services. The EU AI Act has phased effective dates \u2014 verify current requirements with EU-qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "1. Applicability Assessment", y);
  y = addWrappedText(
    doc,
    "Article 27 applies to deployers that are: (a) bodies governed by public law, or (b) private bodies deploying Annex III systems in connection with banking, insurance, essential private services, education, healthcare, administration of justice, or democratic processes. Check if this assessment is required:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const applicabilityCategories = [
    "Public body / body governed by public law",
    "Private body providing public banking or insurance services",
    "Private body providing access to essential private or public services",
    "Private body providing education or vocational training",
    "Private body providing healthcare services",
    "Other deployer of Annex III high-risk AI systems",
  ];
  applicabilityCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, "fria_app_" + idx, cat, y);
  });
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `FRIA: ${sys.name}`, y);

    y = addFormTextField(doc, `fria_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(
      doc,
      `fria_${idx}_assessor`,
      "Conducted By (Name/Title):",
      y
    );
    y += 4;

    y = addWrappedText(
      doc,
      `Intended purpose: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 4;

    y = addWrappedText(
      doc,
      "2. Fundamental Rights Potentially Affected (Art. 27(1)) \u2014 check all that may be affected:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const rights = [
      "Human dignity",
      "Right to privacy and protection of personal data",
      "Non-discrimination and equality",
      "Freedom of expression and information",
      "Right to work and to engage in work",
      "Access to education and training",
      "Right to an effective remedy and fair trial",
      "Right to good administration",
      "Consumer protection rights",
      "Rights of children",
      "Rights of persons with disabilities",
    ];
    rights.forEach((right, ridx) => {
      y = addFormCheckbox(doc, `fria_${idx}_right_${ridx}`, right, y);
    });
    y += 4;

    y = addWrappedText(
      doc,
      "3. Categories of Persons Potentially Affected:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `fria_${idx}_persons`,
      "  Describe affected categories of persons:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "4. Scale of Potential Impact (estimated number of persons affected, geographic scope):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `fria_${idx}_scale`, "", y, {
      multiline: true,
      lines: 2,
    });
    y += 4;

    y = addWrappedText(
      doc,
      "5. Likely Fundamental Rights Impacts and Severity:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `fria_${idx}_impacts`,
      "  Describe likely impacts and assess severity (significant / moderate / low):",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "6. Measures to Mitigate Fundamental Rights Risks:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `fria_${idx}_mitigation`,
      "  Describe mitigation measures:",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    y = addWrappedText(
      doc,
      "7. Conclusion \u2014 Overall assessment of fundamental rights risk level:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `fria_${idx}_conclusion`,
      "  Risk level (high / medium / low) and justification:",
      y,
      { multiline: true, lines: 2 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Approval", y);
  y = addFormTextField(doc, "fria_approved_by", "Approved By (Name/Title):", y);
  y = addFormTextField(doc, "fria_date", "Date:", y);
  y = addFormTextField(doc, "fria_signature", "Signature:", y);
  y = addWrappedText(
    doc,
    "Per Art. 27(4), deployers must notify the market surveillance authority of the FRIA before deploying the AI system and submit the assessment on request. Recommended Best Practice \u2014 not a statutory mandate: review annually and when the system or its context of use changes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
