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
// DOCUMENT 4: Profiling Opt-Out Documentation
// Connecticut CTDPA — Conn. Gen. Stat. §§ 42-515 through 42-525
// ============================================================
export function generateOptOutDocumentation(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Profiling Opt-Out Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s implementation of the opt-out right for profiling in furtherance of decisions that produce legal or similarly significant effects on consumers, as required by Conn. Gen. Stat. § 42-518(a)(6) (Connecticut Data Privacy Act, P.A. 22-15, eff. July 1, 2023). "Profiling" under § 42-515(19) means any form of automated processing of personal data to evaluate, analyze, or predict personal aspects concerning an identified or identifiable natural person's performance at work, economic situation, health, personal preferences, interests, reliability, behavior, location, or movements.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(
    doc,
    "Profiling Activities Subject to Opt-Out",
    y
  );
  y = addWrappedText(
    doc,
    "The following profiling activities produce legal or similarly significant effects on consumers and are subject to the opt-out right under § 42-518(a)(6). Check all that apply for this organization:",
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
    "Recommended Best Practice — not a statutory mandate: log all opt-out requests for at least 3 years. The mandatory 60-day cure period for AG enforcement expired December 31, 2024; the AG now has discretion to proceed without cure notice (§ 42-525(a)).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  for (let i = 1; i <= 3; i++) {
    y = addWrappedText(
      doc,
      `Request #${i}:`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y = addFormTextField(doc, `log_${i}_consumer`, "  Consumer ID / Reference:", y);
    y = addFormTextField(doc, `log_${i}_date`, "  Date Received:", y);
    y = addFormTextField(doc, `log_${i}_systems`, "  Systems Opted Out:", y);
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
