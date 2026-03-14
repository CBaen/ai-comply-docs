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
// DOCUMENT 4: Opt-Out Documentation
// Indiana ICDPA — IC 24-15
// ============================================================
export function generateOptOutDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Opt-Out Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s implementation of the opt-out rights available to Indiana consumers under IC 24-15 (Indiana Consumer Data Protection Act, effective January 1, 2026). Indiana consumers have the right to opt out of (1) processing for targeted advertising, (2) sale of personal data, and (3) profiling for consequential decisions.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Categories Subject to This Documentation", y);
  y = addWrappedText(
    doc,
    "Check all opt-out categories that apply to this organization:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const optOutCategories = [
    "Targeted advertising \u2014 processing personal data to serve ads based on activity across third-party sites",
    "Sale of personal data \u2014 exchanging personal data for monetary or other valuable consideration",
    "Profiling for consequential decisions \u2014 automated processing used to evaluate, analyze, or predict consumers (affecting financial, employment, healthcare, housing, or educational opportunities)",
  ];
  optOutCategories.forEach((cat, idx) => {
    y = addFormCheckbox(doc, "optcat_" + idx, cat, y);
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Mechanism Design", y);
  y = addFormTextField(
    doc,
    "optout_url",
    "URL or location of opt-out mechanism:",
    y
  );
  y = addFormTextField(
    doc,
    "optout_method",
    "How opt-out signals are captured and stored:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "optout_processing_time",
    "Time to process opt-out after receipt:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Profiling Activities Subject to Opt-Out", y);
  y = addWrappedText(
    doc,
    "The following profiling activities produce consequential effects on consumers and are subject to the opt-out right under IC 24-15. Check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const profilingActivities = [
    "Credit or financial services eligibility scoring",
    "Employment screening or candidate scoring",
    "Insurance risk scoring or underwriting",
    "Housing application screening",
    "Healthcare eligibility or treatment recommendations",
    "Education program admission or opportunity scoring",
    "Other consequential decision profiling (describe below)",
  ];
  let cbCount = 0;
  profilingActivities.forEach((act) => {
    y = addFormCheckbox(doc, "prof_" + cbCount, act, y);
    cbCount++;
  });
  y = addFormTextField(doc, "prof_other", "Other (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Systems and Data Affected by Opt-Out", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System: ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(
      doc,
      `sys_${idx}_optout_action`,
      "  Action taken when opt-out received:",
      y,
      { multiline: true, lines: 2 }
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Opt-Out Request Log", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: log all opt-out requests for at least 3 years.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  for (let i = 1; i <= 3; i++) {
    y = addWrappedText(doc, `Request #${i}:`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y = addFormTextField(doc, `log_${i}_consumer`, "  Consumer ID / Reference:", y);
    y = addFormTextField(doc, `log_${i}_date`, "  Date Received:", y);
    y = addFormTextField(doc, `log_${i}_category`, "  Opt-Out Category:", y);
    y = addFormTextField(
      doc,
      `log_${i}_processed`,
      "  Date Opt-Out Processed:",
      y
    );
    y += 4;
  }

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
