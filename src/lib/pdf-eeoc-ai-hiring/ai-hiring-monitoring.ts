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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: AI Hiring Tool Monitoring Procedures
// EEOC Uniform Guidelines, 29 CFR Part 1607
// ============================================================
export function generateAIHiringMonitoring(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Hiring Tool Monitoring Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures govern ${data.company.name}'s ongoing monitoring of AI hiring tools for adverse impact and job-relatedness, consistent with the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607). The Uniform Guidelines require that selection procedures be evaluated for adverse impact using the 4/5 (80%) rule (29 CFR \u00A7 1607.4(D)) and that records be maintained to support such evaluation (29 CFR \u00A7 1607.15). Monitoring must be conducted by individuals with sufficient technical expertise.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Monitoring Schedule", y);
  const monitoringItems: [string, string][] = [
    [
      "Quarterly",
      "Review applicant and hire data by protected class for each AI tool in use",
    ],
    [
      "Annual",
      "Calculate impact ratios per 29 CFR \u00A7 1607.4(D) for each tool and decision type",
    ],
    [
      "Annual",
      "Request updated bias audit results and validity documentation from each vendor",
    ],
    [
      "On change",
      "Re-evaluate whenever the AI model, training data, or deployment context changes materially",
    ],
    [
      "On trigger",
      "Immediate review if impact ratio falls below 0.80 for any protected class",
    ],
  ];
  monitoringItems.forEach(([frequency, item]) => {
    y = addWrappedText(
      doc,
      `  \u2022 [${frequency}] ${item}`,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Adverse Impact Calculation (4/5 Rule)", y);
  y = addWrappedText(
    doc,
    "Per 29 CFR \u00A7 1607.4(D): a selection rate for any race, sex, or ethnic group that is less than 4/5 (80%) of the rate for the group with the highest rate will generally be regarded as evidence of adverse impact.\n\nFormula: Impact Ratio = (Selection rate for protected group) \u00F7 (Selection rate for highest-selected group).\n\nAn impact ratio below 0.80 triggers further review. Document calculations in the Adverse Impact Analysis Template.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `Monitoring Log: ${sys.name}`, y);
    for (let quarter = 1; quarter <= 4; quarter++) {
      y = addWrappedText(
        doc,
        `Q${quarter} Monitoring:`,
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
      y = addFormTextField(
        doc,
        `mon_${idx}_q${quarter}_date`,
        "  Date conducted:",
        y
      );
      y = addFormTextField(
        doc,
        `mon_${idx}_q${quarter}_lowest_ir`,
        "  Lowest impact ratio (group and ratio):",
        y
      );
      y = addFormTextField(
        doc,
        `mon_${idx}_q${quarter}_action`,
        "  Action taken (if IR < 0.80):",
        y
      );
      y += 4;
    }
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Escalation Protocol", y);
  y = addWrappedText(
    doc,
    "If an impact ratio below 0.80 is detected, escalate immediately to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  const escalationSteps = [
    "Legal counsel \u2014 assess whether adverse impact is defensible under business necessity (\u00A7 1607.6(B))",
    "HR leadership \u2014 suspend or modify use of affected tool pending review",
    "Vendor \u2014 request explanation and corrective measures",
    "Document all escalation actions with dates and outcomes",
  ];
  escalationSteps.forEach((step, idx) => {
    y = addWrappedText(
      doc,
      `${idx + 1}. ${step}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Program Administrator", y);
  y = addFormTextField(doc, "admin_name", "Responsible Party:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  if (data.contact.email)
    y = addFormTextField(doc, "admin_email", "Email:", y, {
      prefill: data.contact.email,
      readOnly: false,
    });

  addDisclaimer(doc);
  return doc;
}
