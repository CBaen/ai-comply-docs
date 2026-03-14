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
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 6: Transparency Disclosures
// EU AI Act Art. 13 — Transparency and Provision of Information to Deployers
// ============================================================
export function generateTransparencyDisclosures(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EU AI Act: Transparency Disclosures (Art. 13)", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document supports compliance with Article 13 of Regulation (EU) 2024/1689, which requires that high-risk AI systems be designed and developed so as to ensure that their operation is sufficiently transparent to enable deployers to interpret the system's output and use it appropriately. Prepared for ${data.company.name}. This is a template — review with your technical and legal teams.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Instructions for Use (Art. 13(3))
  y = addSectionHeader(doc, "1. Instructions for Use (Art. 13(3))", y);
  y = addWrappedText(
    doc,
    "Article 13(3) specifies what the Instructions for Use must contain. Check each element that has been addressed:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const instructionElements = [
    "Provider identity and contact details (Art. 13(3)(a))",
    "System capabilities and intended purpose — what the system is designed to do (Art. 13(3)(b)(i))",
    "Level of accuracy and metrics used to measure performance (Art. 13(3)(b)(ii))",
    "Known and foreseeable circumstances under which performance may vary (Art. 13(3)(b)(iii))",
    "Performance across specific groups of persons where relevant (Art. 13(3)(b)(iv))",
    "Known or foreseeable circumstances in which system may fail or produce inaccurate output (Art. 13(3)(b)(v))",
    "Human oversight measures required — who oversees and how (Art. 13(3)(c))",
    "Computational and hardware resources required (Art. 13(3)(d))",
    "Expected lifetime and maintenance/monitoring measures (Art. 13(3)(e))",
    "Logging capabilities — what is automatically recorded and for how long (Art. 13(3)(f))",
  ];

  let cbCount = 0;
  instructionElements.forEach((el) => {
    y = addFormCheckbox(doc, "td_inst_" + cbCount, el, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 2: System-specific disclosure content
  y = addSectionHeader(doc, "2. System-Specific Disclosure Content", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Intended purpose: ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      `  Provider/vendor: ${sys.vendor || "Internal development"}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 4;
    y = addFormTextField(
      doc,
      `td_sys_${idx}_accuracy`,
      `Accuracy metrics for ${sys.name}:`,
      y,
      { multiline: true, lines: 2 }
    );
    y = addFormTextField(
      doc,
      `td_sys_${idx}_limits`,
      `Known limitations and failure modes:`,
      y,
      { multiline: true, lines: 3 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 3: CE marking requirements (Art. 48)
  y = addSectionHeader(doc, "3. CE Marking Requirements (Art. 48)", y);
  y = addWrappedText(
    doc,
    "Article 48 requires that high-risk AI systems bear the CE marking before placement on the EU market or putting into service. The CE marking indicates conformity with applicable requirements of Regulation (EU) 2024/1689.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const ceChecks = [
    "Conformity assessment completed (Art. 43) — prerequisite for CE marking",
    "EU Declaration of Conformity drawn up (Art. 47)",
    "CE marking visibly, legibly, and indelibly affixed to the system or its packaging",
    "CE marking appears before market placement — not after",
  ];

  ceChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "td_ce_" + idx, check, y);
  });
  y += LINE_HEIGHT;

  // Section 4: EU database registration (Art. 49)
  y = addSectionHeader(doc, "4. EU Database Registration (Art. 49)", y);
  y = addWrappedText(
    doc,
    "Article 49 requires registration of high-risk AI systems in the EU database established under Article 71 before market placement. Exceptions apply for certain public authority deployments. Document registration status below:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const registrationChecks = [
    "Registration obligation confirmed for each Annex III system",
    "EU AI Act database account created (https://ec.europa.eu/digital-strategy/en/eu-ai-act)",
    "System registered in EU database before market placement",
    "Registration number obtained and documented",
  ];

  registrationChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, "td_reg_" + idx, check, y);
  });
  y = addFormTextField(doc, "td_reg_number", "EU database registration number(s):", y, { width: 120 });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "5. Transparency Documentation Sign-off", y);
  y = addFormTextField(doc, "td_name", "Prepared by:", y, { width: 100 });
  y = addFormTextField(doc, "td_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "td_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
