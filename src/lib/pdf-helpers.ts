import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";

export const MARGIN = 20;
export const PAGE_WIDTH = 210;
export const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
export const LINE_HEIGHT = 6;
export const HEADER_SIZE = 16;
export const SUBHEADER_SIZE = 12;
export const BODY_SIZE = 10;
export const SMALL_SIZE = 8;

export const DECISION_LABELS: Record<string, string> = {
  recruitment: "Recruitment",
  hiring: "Hiring",
  promotion: "Promotion",
  renewal: "Renewal of Employment",
  training: "Selection for Training or Apprenticeship",
  discharge: "Discharge",
  discipline: "Discipline",
  tenure: "Tenure",
  terms: "Terms, Privileges, or Conditions of Employment",
  education: "Education Enrollment or Opportunity",
  employment: "Employment or Employment Opportunities",
  financial: "Financial or Lending Services",
  government: "Essential Government Services",
  healthcare: "Health Care Services",
  housing: "Housing",
  insurance: "Insurance",
  legal: "Legal Services",
};

export const DATA_INPUT_LABELS: Record<string, string> = {
  resume: "Resumes / CVs",
  video: "Video interviews",
  assessment: "Skills assessments",
  social: "Social media profiles",
  performance_data: "Performance metrics",
  attendance: "Attendance records",
  communication: "Workplace communications",
  biometric: "Biometric data",
};

export const PROTECTED_LABELS: Record<string, string> = {
  race: "Race / Ethnicity",
  gender: "Gender / Sex",
  age: "Age",
  disability: "Disability status",
  religion: "Religion",
  national_origin: "National origin",
  pregnancy: "Pregnancy status",
  none: "None of the above",
};

export const ROLE_LABELS: Record<string, string> = {
  sole: "AI makes final decisions autonomously",
  primary: "AI recommendation is primary factor, with human review",
  advisory: "AI provides advisory input, human makes final decision",
  screening: "AI screens/filters, human reviews remaining candidates",
};

export const REVIEW_LABELS: Record<string, string> = {
  quarterly: "Quarterly",
  biannual: "Every 6 months",
  annual: "Annually",
  never: "Not currently reviewed",
};

const REGULATION_HEADER: Record<
  string,
  { statute: string; rules: string }
> = {
  "illinois-hb3773": {
    statute:
      "Statute: 775 ILCS 5/2-102(L) \u2014 Use of Artificial Intelligence (P.A. 103-804, eff. 1-1-26)",
    rules:
      "IDHR implementing rules: 56 Ill. Adm. Code Part 2520, Subpart J (proposed rules, pending formal adoption)",
  },
  "colorado-sb24-205": {
    statute:
      "Statute: C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 \u2014 Consumer Protections for AI (SB 24-205, eff. 2-1-26)",
    rules:
      "Enforcement: Colorado Attorney General (exclusive authority, \u00A7 6-1-1706). No AG implementing rules adopted as of March 2026.",
  },
  "employee-ai-policy": {
    statute:
      "Framework: NIST AI Risk Management Framework (AI 100-1) + EEOC AI Guidance",
    rules:
      "Best practice templates aligned with federal frameworks. Not tied to a single statute.",
  },
  "vendor-ai-due-diligence": {
    statute:
      "Framework: NIST AI RMF MAP Function + State Deployer Requirements (CO, IL, TX)",
    rules:
      "Due diligence templates for AI vendor procurement and ongoing monitoring.",
  },
  "ai-bias-audit-template": {
    statute:
      "Framework: NYC LL144 Bias Audit Requirements + EEOC Uniform Guidelines (29 C.F.R. \u00A7 1607)",
    rules:
      "Audit templates aligned with the EEOC 4/5 (80%) adverse impact threshold and NYC annual audit mandate.",
  },
  "ai-incident-response-plan": {
    statute:
      "Framework: NIST AI RMF MANAGE Function + CA TFAIA (15-day reporting) + EU AI Act",
    rules:
      "Incident response templates covering detection, classification, response, and regulatory reporting.",
  },
};

// AcroForm support detection
let AcroFormTextField: unknown = null;
let AcroFormCheckBox: unknown = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const acro = (jsPDF as any).AcroForm;
  if (acro) {
    AcroFormTextField = acro.TextField;
    AcroFormCheckBox = acro.CheckBox;
  }
} catch {
  // AcroForm not available — will use visual fallback
}

export function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines: string[] = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line) => {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

export function addSectionHeader(doc: jsPDF, text: string, y: number): number {
  if (y > 255) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFontSize(SUBHEADER_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text(text, MARGIN, y);
  y += 2;
  doc.setDrawColor(50, 100, 200);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  return y;
}

export function addDocHeader(
  doc: jsPDF,
  title: string,
  data: ComplianceFormData
): number {
  const header =
    REGULATION_HEADER[data.regulation] ||
    REGULATION_HEADER["illinois-hb3773"];

  let y = MARGIN;
  doc.setFontSize(HEADER_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text(title, MARGIN, y);
  y += 8;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Prepared for: " + data.company.name, MARGIN, y);
  y += LINE_HEIGHT;
  doc.text("Date: " + data.generatedDate, MARGIN, y);
  y += LINE_HEIGHT;
  doc.text(header.statute, MARGIN, y);
  y += LINE_HEIGHT;
  doc.text(header.rules, MARGIN, y);
  y += LINE_HEIGHT;
  doc.text(
    "Template generated: " +
      data.generatedDate +
      " \u2014 Verify current regulatory status before use",
    MARGIN,
    y
  );
  y += LINE_HEIGHT;

  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;
  doc.setTextColor(0);
  return y;
}

export function addDisclaimer(doc: jsPDF): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(150);
    doc.text(
      "TEMPLATE ONLY \u2014 NOT LEGAL ADVICE. AI Comply Docs is not a law firm and does not practice law. Generated by AI Comply Docs.",
      MARGIN,
      287
    );
    doc.text(
      "Based on regulations as of March 2026. You are solely responsible for verifying currency, accuracy, and applicability. Consult a licensed attorney.",
      MARGIN,
      291
    );
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - MARGIN - 20, 291);
    doc.setTextColor(0);
  }
}

export function addTopDisclaimer(doc: jsPDF, y: number): number {
  doc.setDrawColor(200, 50, 50);
  doc.setFillColor(255, 245, 245);
  doc.setLineWidth(0.8);
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 24, 2, 2, "FD");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 30, 30);
  doc.text("IMPORTANT NOTICE", MARGIN + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(100, 30, 30);
  const lines: string[] = doc.splitTextToSize(
    "This document is a TEMPLATE provided for informational purposes only. It does NOT constitute legal advice, legal representation, or an attorney-client relationship. Laws and regulations change frequently. You must consult a licensed attorney to verify this template is current, complete, and applicable to your specific situation before relying on it.",
    CONTENT_WIDTH - 8
  );
  lines.forEach((line, i) => {
    doc.text(line, MARGIN + 4, y + 11 + i * 3.5);
  });
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  return y + 28;
}

interface TextFieldOpts {
  prefill?: string;
  readOnly?: boolean;
  multiline?: boolean;
  lines?: number;
  width?: number;
  x?: number;
}

export function addFormTextField(
  doc: jsPDF,
  fieldName: string,
  label: string,
  y: number,
  opts?: TextFieldOpts
): number {
  const o = opts || {};
  const fieldX = o.x || MARGIN;
  const fieldWidth = o.width || CONTENT_WIDTH;

  if (y > 255) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");

  if (label) {
    doc.text(label, fieldX, y);
    y += LINE_HEIGHT;
  }

  if (AcroFormTextField) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const field = new (AcroFormTextField as any)();
    field.fieldName = fieldName;
    if (o.multiline) {
      const boxH = (o.lines || 4) * (LINE_HEIGHT + 2);
      field.Rect = [fieldX, y, fieldWidth, boxH];
      field.multiline = true;
      doc.addField(field);
      y += boxH + 2;
    } else {
      field.Rect = [fieldX, y, fieldWidth, 7];
      if (o.prefill) {
        field.value = o.prefill;
        if (o.readOnly) field.readOnly = true;
      }
      doc.addField(field);
      y += 9;
    }
  } else {
    const lineCount = o.multiline ? o.lines || 4 : 1;
    for (let i = 0; i < lineCount; i++) {
      doc.setDrawColor(200);
      doc.line(fieldX, y, fieldX + fieldWidth, y);
      y += LINE_HEIGHT + 2;
    }
  }
  return y;
}

interface CheckboxOpts {
  checked?: boolean;
  x?: number;
}

export function addFormCheckbox(
  doc: jsPDF,
  fieldName: string,
  label: string,
  y: number,
  opts?: CheckboxOpts
): number {
  const o = opts || {};
  const fieldX = o.x || MARGIN;

  if (y > 270) {
    doc.addPage();
    y = MARGIN;
  }
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");

  if (AcroFormCheckBox) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cb = new (AcroFormCheckBox as any)();
    cb.fieldName = fieldName;
    cb.Rect = [fieldX + 2, y - 3, 4, 4];
    cb.appearanceState = o.checked ? "On" : "Off";
    doc.addField(cb);
    const labelLines: string[] = doc.splitTextToSize(
      label,
      CONTENT_WIDTH - (fieldX - MARGIN) - 10
    );
    labelLines.forEach((line, idx) => {
      doc.text(line, fieldX + 10, y + idx * LINE_HEIGHT);
    });
    y += Math.max(LINE_HEIGHT, labelLines.length * LINE_HEIGHT) + 1;
  } else {
    y = addWrappedText(
      doc,
      "  [ ] " + label,
      fieldX,
      y,
      CONTENT_WIDTH - (fieldX - MARGIN),
      LINE_HEIGHT
    );
    y += 2;
  }
  return y;
}
