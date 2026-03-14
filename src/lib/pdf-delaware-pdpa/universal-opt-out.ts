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
// DOCUMENT 3: Universal Opt-Out Mechanism Documentation
// Delaware PDPA — Del. Code tit. 6, ch. 12D, § 12D-106(e)
// ============================================================
export function generateUniversalOptOut(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Universal Opt-Out Mechanism Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes ${data.company.name}'s implementation of the universal opt-out mechanism requirement under Del. Code tit. 6, \u00A7 12D-106(e) (Delaware Personal Data Privacy Act, HB 154). Effective January 1, 2026, controllers that sell personal data or process personal data for targeted advertising must recognize universal opt-out mechanisms. This requirement applies to controllers that meet the Delaware PDPA thresholds: 35,000+ consumers OR 10,000+ consumers with 20%+ revenue from data sales.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Applicability Assessment", y);
  y = addFormCheckbox(
    doc,
    "sells_pd",
    "Controller sells personal data to third parties \u2014 universal opt-out required (\u00A7 12D-106(e))",
    y
  );
  y = addFormCheckbox(
    doc,
    "targeted_ads",
    "Controller processes personal data for targeted advertising \u2014 universal opt-out required (\u00A7 12D-106(e))",
    y
  );
  y += 4;
  y = addFormTextField(doc, "applicability_date", "Date applicability confirmed:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Recognized Opt-Out Signals", y);
  y = addWrappedText(
    doc,
    "Check each universal opt-out signal your organization currently recognizes:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const signals = [
    "Global Privacy Control (GPC) \u2014 browser-based opt-out signal",
    "Do Not Sell or Share My Personal Information browser signal",
    "Other universal opt-out mechanism (describe below)",
  ];
  signals.forEach((sig, idx) => {
    y = addFormCheckbox(doc, "signal_" + idx, sig, y);
  });
  y = addFormTextField(doc, "other_signal", "Other signal(s) (describe):", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Technical Implementation", y);
  y = addFormTextField(
    doc,
    "detection_method",
    "How opt-out signals are detected on your website/app:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "processing_action",
    "Action taken when opt-out signal is received (data not sold, ads not served, etc.):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "downstream_processors",
    "How opt-out is communicated to downstream processors/ad networks:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "implementation_date",
    "Date implementation was completed:",
    y
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Testing and Verification", y);
  y = addWrappedText(
    doc,
    "Check all verification steps completed (recommended best practice):",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const verificationSteps = [
    "Tested GPC signal detection using browser extension (e.g., GPC Privacy Test)",
    "Confirmed data sale/sharing stops when opt-out signal received",
    "Confirmed ad targeting stops when opt-out signal received",
    "Confirmed opt-out state persists across sessions for same user",
    "Confirmed opt-out propagates to all active ad networks and data brokers",
    "Privacy notice updated to disclose universal opt-out mechanism (\u00A7 12D-106(e))",
  ];
  verificationSteps.forEach((step, idx) => {
    y = addFormCheckbox(doc, "verify_" + idx, step, y);
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
  y = addFormTextField(doc, "next_review", "Next Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
