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
// Profiling Activity Assessment
// Virginia CDPA — Va. Code § 59.1-580(A)(3)
// ============================================================
export function generateProfilingAssessment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Profiling & AI Data Protection Assessment",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This assessment is conducted by ${data.company.name} pursuant to Va. Code § 59.1-580(A)(3), which requires a data protection assessment for processing personal data for profiling in furtherance of decisions producing legal or similarly significant effects concerning a consumer. "Similarly significant effects" is construed broadly by the VCDPA and encompasses decisions affecting access to credit, insurance, housing, education, employment, health care services, and government services (§ 59.1-575). Completed assessments must be made available to the Virginia Attorney General upon request (§ 59.1-580(B)).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Profiling Activity: ${sys.name}`, y);

    y = addFormTextField(doc, `pa_${idx}_date`, "Assessment Date:", y);
    y = addFormTextField(doc, `pa_${idx}_reviewer`, "Completed By (Name / Title):", y);
    y += 4;

    // Description of profiling activity
    y = addWrappedText(
      doc,
      "Description of Profiling Activity (§ 59.1-575 — 'profiling' means any form of automated processing of personal data to evaluate, analyze, or predict personal aspects such as economic situation, health, interests, behavior, location, or movements):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `pa_${idx}_description`, "", y, {
      multiline: true,
      lines: 4,
    });
    y += 4;

    // Categories of consumers affected
    y = addWrappedText(
      doc,
      "Categories of Consumers Affected by this Profiling Activity:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `pa_${idx}_consumers`, "", y, {
      multiline: true,
      lines: 3,
    });
    y += 4;

    // Types of decisions produced
    y = addWrappedText(
      doc,
      "Types of decisions — legal or similarly significant effects — produced by this profiling activity (check all that apply):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const decisionTypes = [
      "Credit or financial services access or terms",
      "Insurance access or terms",
      "Housing access or rental terms",
      "Education enrollment or opportunities",
      "Employment or employment opportunities",
      "Health care services access",
      "Access to essential government services",
      "Other legal or similarly significant effect (describe below)",
    ];
    decisionTypes.forEach((dt, dtIdx) => {
      y = addFormCheckbox(doc, `pa_${idx}_decision_${dtIdx}`, dt, y);
    });
    y = addFormTextField(doc, `pa_${idx}_decision_other`, "Other effect description:", y, {
      multiline: true,
      lines: 2,
    });
    y += 4;

    // Risk categories per § 59.1-580(A)(3)
    y = addSectionHeader(
      doc,
      `Risk Categories — Activity: ${sys.name} (§ 59.1-580(A)(3))`,
      y
    );
    y = addWrappedText(
      doc,
      "For each statutory risk category below, describe the foreseeable risk this profiling activity presents:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;

    y = addFormTextField(
      doc,
      `pa_${idx}_risk_unfair`,
      "1. Unfair or deceptive treatment of consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_risk_disparate`,
      "2. Unlawful disparate impact on consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_risk_financial`,
      "3. Financial or physical injury to consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_risk_reputation`,
      "4. Reputational or dignitary harm to consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_risk_intrusion`,
      "5. Intrusion upon the solitude or seclusion, or the private affairs or concerns, of consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_risk_other`,
      "6. Other substantial injury to consumers (describe):",
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;

    // Benefits identification
    y = addSectionHeader(doc, `Benefits Identification — Activity: ${sys.name}`, y);
    y = addFormTextField(
      doc,
      `pa_${idx}_benefits_controller`,
      "Benefits to controller / organization:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_benefits_consumer`,
      "Benefits to consumers:",
      y,
      { multiline: true, lines: 3 }
    );
    y = addFormTextField(
      doc,
      `pa_${idx}_benefits_public`,
      "Benefits to the public:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;

    // Safeguards
    y = addSectionHeader(doc, `Safeguards — Activity: ${sys.name}`, y);
    y = addFormTextField(
      doc,
      `pa_${idx}_safeguards`,
      "Safeguards implemented or proposed to mitigate identified risks:",
      y,
      { multiline: true, lines: 4 }
    );
    y += 4;

    // Conclusion
    y = addWrappedText(
      doc,
      "Assessment Conclusion — do the benefits of this profiling activity, considering context and proportionality, outweigh the identified risks? Justify your determination:",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `pa_${idx}_conclusion`, "", y, {
      multiline: true,
      lines: 3,
    });

    y += LINE_HEIGHT * 2;
  });

  y = addSectionHeader(doc, "Assessment Review and Retention", y);
  y = addWrappedText(
    doc,
    "Per § 59.1-580(B), this assessment must be made available to the Virginia Attorney General upon request. Best practice: review this assessment annually and update it when profiling activities or their inputs change materially. Retain all versions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "va_pa", y);

  addDisclaimer(doc);
  return doc;
}
