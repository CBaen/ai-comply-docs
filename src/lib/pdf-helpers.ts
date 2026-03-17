import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";

// Brand color: dark navy blue — matches welcome page
export const BRAND_BLUE: [number, number, number] = [30, 58, 95];

export const LEFT_MARGIN = 25;
export const RIGHT_MARGIN = 20;
export const TOP_MARGIN = 20;
export const BOTTOM_MARGIN = 25;
// Legacy alias used by generators that reference MARGIN
export const MARGIN = LEFT_MARGIN;
export const PAGE_WIDTH = 210;
export const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
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
  race: "Race / Color / Ethnicity",
  gender: "Gender / Sex",
  sexual_orientation: "Sexual orientation / Gender identity",
  age: "Age",
  disability: "Disability status",
  religion: "Religion",
  national_origin: "National origin / Ancestry",
  pregnancy: "Pregnancy status",
  marital_status: "Marital / Family status",
  military: "Military status / Discharge",
  citizenship: "Citizenship / Work authorization",
  none: "None of the above",
};

export const ROLE_LABELS: Record<string, string> = {
  sole: "AI makes final decisions autonomously",
  primary: "AI recommendation is primary factor, with human review",
  advisory: "AI provides advisory input, human makes final decision",
  screening: "AI screens/filters, human reviews remaining candidates",
  processing: "AI processes data, human reviews outputs",
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
      "IDHR implementing rules: In development (not yet published as of March 2026). Core compliance obligations are set by statute and are in effect now. Implementing rules typically add procedural detail. Monitor dhr.illinois.gov for updates.",
  },
  "colorado-sb24-205": {
    statute:
      "Statute: C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 \u2014 Consumer Protections for AI (SB 24-205, eff. 6-30-26)",
    rules:
      "Enforcement: Colorado Attorney General (exclusive authority, \u00A7 6-1-1706). No AG implementing rules adopted as of March 2026. Core compliance obligations are set by statute and are in effect now. Implementing rules typically add procedural detail.",
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
  "nyc-local-law-144": {
    statute:
      "Statute: NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 (Local Law 144 of 2021) \u2014 DCWP enforcement began July 5, 2023",
    rules:
      "Implementing rules: DCWP rules at 6 RCNY \u00A7 5-300 et seq. DCWP shifted to proactive investigations in 2026.",
  },
  "virginia-cdpa": {
    statute:
      "Statute: Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 (Virginia Consumer Data Protection Act, eff. 1-1-23)",
    rules:
      "Enforcement: Virginia Attorney General (exclusive authority, \u00A7 59.1-584(A)). 30-day cure period before AG may seek penalties (\u00A7 59.1-584(B)). No private right of action.",
  },
  "connecticut-ctdpa": {
    statute:
      "Statute: Conn. Gen. Stat. \u00A7\u00A7 42-515 through 42-525 (Connecticut Data Privacy Act, PA 22-15, eff. 7-1-23)",
    rules:
      "Enforcement: Connecticut Attorney General (exclusive authority, \u00A7 42-525(a)). Mandatory 60-day cure period expired December 31, 2024; AG has enforcement discretion. No private right of action.",
  },
  "oregon-cpa": {
    statute:
      "Statute: ORS \u00A7\u00A7 646A.570 through 646A.589 (Oregon Consumer Privacy Act, eff. 7-1-24)",
    rules:
      "Enforcement: Oregon Attorney General (\u00A7 646A.589). 30-day cure period until January 1, 2026 (\u00A7 646A.589(2)); AG discretion after. Civil penalties up to $7,500 per violation (ORS \u00A7 646A.589). No private right of action.",
  },
  "minnesota-mcdpa": {
    statute:
      "Statute: Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21 (Minnesota Consumer Data Privacy Act, eff. 7-31-25)",
    rules:
      "Enforcement: Minnesota Attorney General (exclusive authority, \u00A7 325M.20(b)). 30-day cure period expired January 31, 2026.",
  },
  "texas-tdpsa": {
    statute:
      "Statute: Tex. Bus. & Com. Code Ch. 541 (Texas Data Privacy and Security Act, HB 4, eff. 7-1-24)",
    rules:
      "Enforcement: Texas Attorney General only (\u00A7 541.151). No private right of action. Permanent 30-day cure period (\u00A7 541.154). Separate from Texas TRAIGA (HB 149, Ch. 551\u2013554).",
  },
  "delaware-pdpa": {
    statute:
      "Statute: Del. Code tit. 6, ch. 12D, \u00A7\u00A7 12D-101 through 12D-111 (Delaware Personal Data Privacy Act, HB 154, eff. 1-1-25)",
    rules:
      "Enforcement: Delaware Attorney General (\u00A7 12D-111). No private right of action. 60-day cure period until Dec 31, 2025; AG discretion after. Lowest thresholds of any state (35,000 consumers).",
  },
  "multi-state-profiling-assessment": {
    statute:
      "Framework: Multi-State Data Protection Assessment \u2014 VA, CT, CO, OR, TX, MT, DE, MN, MD, IN + additional states",
    rules:
      "Each state law is independently enacted and enforced. Verify applicability thresholds and cure periods for each state. Consult qualified legal counsel.",
  },
  "multi-state-employer-ai-disclosure": {
    statute:
      "Framework: IL 775 ILCS 5/2-102(L) (eff. 1-1-26) + NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 (eff. 7-5-23) + CO C.R.S. \u00A7\u00A7 6-1-1701\u20131707 (eff. 6-30-26)",
    rules:
      "Each jurisdiction enforces independently. Verify current status of each law. IL IDHR rules in development — core compliance obligations are set by statute and are in effect now; implementing rules typically add procedural detail. CO SB 25B-004 extended CO effective date to June 30, 2026.",
  },
  "california-ccpa-admt": {
    statute:
      "Statute: Cal. Civ. Code \u00A7 1798.100 et seq. + CPPA ADMT Regulations (eff. 1-1-26)",
    rules:
      "Enforcement: CPPA administrative enforcement and AG civil enforcement. \u00A7\u00A7 1798.155. Verify current CPPA guidance at cppa.ca.gov.",
  },
  "eu-ai-act": {
    statute:
      "Regulation: (EU) 2024/1689 (EU AI Act) \u2014 Phased: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026",
    rules:
      "Enforcement: National market surveillance authorities. Member States may adopt additional implementing measures.",
  },
  "eeoc-ai-hiring": {
    statute:
      "Framework: Title VII (42 USC \u00A7 2000e et seq.) + Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607)",
    rules:
      "EEOC AI-specific technical assistance has been modified under current administration. Verify current EEOC guidance at eeoc.gov.",
  },
  "nist-ai-rmf": {
    statute:
      "Framework: NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1)",
    rules:
      "Voluntary framework \u2014 NIST is a non-regulatory agency. AI RMF 1.0 is currently being revised. Verify current version at airc.nist.gov.",
  },
  "healthcare-ai-compliance": {
    statute:
      "Framework: HIPAA Privacy Rule (45 CFR Part 164 Subpart E) + Security Rule (Subpart C) + Breach Notification Rule (Subpart D)",
    rules:
      "HHS OCR enforcement. HHS may issue additional guidance on AI and HIPAA. Verify current guidance at hhs.gov/hipaa.",
  },
  "financial-services-ai": {
    statute:
      "Framework: ECOA/Regulation B (12 CFR Part 1002) + FCRA (15 USC \u00A7 1681 et seq.) + FINRA AI Supervision",
    rules:
      "SEC, CFPB, and FINRA may issue additional AI-specific guidance. FINRA flagged AI as a 2026 examination priority.",
  },
  "manager-ai-training-kit": {
    statute:
      "Framework: NIST AI RMF (AI 100-1) + EEOC AI Guidance + State Employment AI Laws (IL, NYC, CO)",
    rules:
      "Manager communication templates. Not tied to a single statute. Verify applicable state law requirements with qualified legal counsel.",
  },
  "annual-compliance-review": {
    statute:
      "Framework: Multi-State AI Compliance Annual Review Best Practices",
    rules:
      "Annual review templates. Regulatory requirements vary by state. Verify current law status annually and consult qualified legal counsel.",
  },
  "board-ai-summary": {
    statute:
      "Framework: NIST AI RMF Govern Function + SEC AI Governance Guidance",
    rules:
      "Board governance templates. Not tied to a single statute. Consult qualified legal counsel for your specific governance obligations.",
  },
  "consumer-notice-kit": {
    statute:
      "Framework: Multi-State AI Consumer Disclosure Requirements (CO SB24-205, CA CCPA ADMT, MN MCDPA, TX TDPSA)",
    rules:
      "Consumer disclosure templates. Each state law has different requirements. Verify applicability with qualified legal counsel.",
  },
  "data-mapping-inventory": {
    statute:
      "Framework: Multi-State Privacy Data Mapping Requirements (CA, CO, VA, CT, MN, TX, DE)",
    rules:
      "Data inventory templates. Required before completing state privacy data protection assessments. Consult qualified legal counsel.",
  },
  "consumer-rights-kit": {
    statute:
      "Framework: Multi-State Consumer Rights Requirements (CA CCPA, CO SB24-205, MN MCDPA, TX TDPSA, DE PDPA)",
    rules:
      "Consumer rights response templates. Response timelines vary by state (typically 45 days). Verify current requirements with qualified legal counsel.",
  },
  "ai-governance-framework": {
    statute:
      "Framework: NIST AI RMF Govern Function (NIST AI 100-1) + CO SB24-205 Risk Management Requirements",
    rules:
      "Voluntary governance framework aligned with NIST AI RMF and state deployer-liability statutes. Not tied to a single statute.",
  },
  "ai-system-registry": {
    statute:
      "Framework: NIST AI RMF MAP Function + State Deployer Inventory Requirements (CO, TX, EU)",
    rules:
      "AI inventory templates aligned with deployer obligations under multiple AI statutes. Not a substitute for legal counsel.",
  },
  "ai-transparency-report": {
    statute:
      "Framework: EU AI Act Art. 13 Transparency + Voluntary Best Practice",
    rules:
      "Transparency reporting templates. EU AI Act Art. 13 obligations apply to high-risk AI systems under Regulation (EU) 2024/1689.",
  },
  "ai-whistleblower-policy": {
    statute:
      "Framework: CA SB 53 (2025\u20132026 Session) Whistleblower Protections + Best Practice",
    rules:
      "Whistleblower protection templates. CA SB 53 applies to frontier AI developers. Recommended for all organizations using AI.",
  },
  "customer-ai-aup": {
    statute:
      "Framework: FTC Act \u00A7 5 Unfair Practice Avoidance + EU AI Act Art. 13 + Best Practice",
    rules:
      "Customer-facing AUP template. Aligns with FTC guidance on AI transparency and EU AI Act Art. 13 disclosure obligations.",
  },
  "indiana-icdpa": {
    statute:
      "Statute: IC 24-15 (Indiana Consumer Data Protection Act, P.L. 94-2023, eff. 1-1-26)",
    rules:
      "Enforcement: Indiana Attorney General (exclusive authority, IC 24-15-10-4). No private right of action. 30-day cure period (IC 24-15-10-3).",
  },
  "montana-mcdpa": {
    statute:
      "Statute: MCA \u00A7\u00A7 30-14-2801 through 30-14-2820 (Montana Consumer Data Privacy Act, SB 384, eff. 10-1-24)",
    rules:
      "Enforcement: Montana Attorney General via Title 30, ch. 14, parts 1\u20132. No private right of action (\u00A7 30-14-2817(5)). 30-day cure period (\u00A7 30-14-2817(3)). Lowest applicability thresholds of any state (25,000 consumers).",
  },
  "kentucky-kcdpa": {
    statute:
      "Statute: KRS Chapter 367 (Kentucky Consumer Data Protection Act, HB 15, eff. 1-1-26)",
    rules:
      "Enforcement: Kentucky Attorney General (exclusive authority). No private right of action. 30-day cure period.",
  },
  "new-jersey-njdpa": {
    statute:
      "Statute: New Jersey Data Protection Act (S332/A1971, signed 1-16-24, eff. 1-15-25)",
    rules:
      "Enforcement: New Jersey Attorney General. No private right of action. This is a separate law from the NJ Law Against Discrimination (LAD).",
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
      y = TOP_MARGIN;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

export function addSectionHeader(doc: jsPDF, text: string, y: number): number {
  if (y > 255) {
    doc.addPage();
    y = TOP_MARGIN;
  }

  // Measure header height for the left border
  doc.setFontSize(SUBHEADER_SIZE);
  doc.setFont("helvetica", "bold");
  const headerLines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH - 6);
  const headerBlockHeight = headerLines.length * LINE_HEIGHT + 2;

  // Draw 3pt dark blue left border spanning the header block height
  doc.setDrawColor(...BRAND_BLUE);
  doc.setFillColor(...BRAND_BLUE);
  doc.setLineWidth(0);
  doc.rect(LEFT_MARGIN, y - 4, 3, headerBlockHeight + 2, "F");

  // Dark blue text, indented past the border
  doc.setTextColor(...BRAND_BLUE);
  doc.setFontSize(SUBHEADER_SIZE);
  doc.setFont("helvetica", "bold");
  headerLines.forEach((line, idx) => {
    doc.text(line, LEFT_MARGIN + 6, y + idx * LINE_HEIGHT);
  });

  y += headerBlockHeight + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  doc.setTextColor(0);
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

  // --- Full-width dark blue band ---
  const bandHeight = 38;
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, PAGE_WIDTH, bandHeight, "F");

  // White title text inside the band
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const titleLines: string[] = doc.splitTextToSize(title, CONTENT_WIDTH - 4);
  let bandY = 12;
  titleLines.forEach((line) => {
    doc.text(line, LEFT_MARGIN, bandY);
    bandY += 7;
  });

  // Company name inside band
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(data.company.name, LEFT_MARGIN, bandY);
  bandY += 5;

  // Date inside band
  doc.setFontSize(8);
  doc.text(data.generatedDate, LEFT_MARGIN, bandY);

  // --- Statute citation below the band (readable, not inside it) ---
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(SMALL_SIZE);
  doc.setFont("helvetica", "normal");
  let y = bandHeight + 6;

  y = addWrappedText(doc, header.statute, LEFT_MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT - 1);
  y = addWrappedText(doc, header.rules, LEFT_MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT - 1);
  y = addWrappedText(
    doc,
    "Template generated: " +
      data.generatedDate +
      " \u2014 Verify current regulatory status before use",
    LEFT_MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT - 1
  );

  // Thin separator line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(LEFT_MARGIN, y, LEFT_MARGIN + CONTENT_WIDTH, y);
  y += LINE_HEIGHT + 2;

  doc.setTextColor(0);
  return y;
}

export function addDisclaimer(doc: jsPDF): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageCount = (doc as any).internal.getNumberOfPages();
  const disclaimerText =
    "TEMPLATE ONLY \u2014 NOT LEGAL ADVICE. AI Compliance Documents is not a law firm and does not practice law. " +
    "Based on regulations as of March 2026. You are solely responsible for verifying currency, accuracy, and applicability. Consult a licensed attorney.";
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Thin horizontal rule above footer
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(LEFT_MARGIN, 282, LEFT_MARGIN + CONTENT_WIDTH, 282);

    doc.setFontSize(6.5);
    doc.setTextColor(150);
    const footerLines: string[] = doc.splitTextToSize(disclaimerText, CONTENT_WIDTH - 25);
    footerLines.forEach((line, idx) => {
      doc.text(line, LEFT_MARGIN, 286 + idx * 3);
    });
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - RIGHT_MARGIN - 18, 289);
    doc.setTextColor(0);
  }
}

export function addTopDisclaimer(doc: jsPDF, y: number): number {
  const disclaimerBody =
    "This document is a TEMPLATE provided for informational purposes only. It does NOT constitute legal advice, legal representation, or an attorney-client relationship. Laws and regulations change frequently. You must consult a licensed attorney to verify this template is current, complete, and applicable to your specific situation before relying on it.";

  // Calculate dynamic height based on wrapped line count
  doc.setFontSize(SMALL_SIZE);
  const bodyLines: string[] = doc.splitTextToSize(disclaimerBody, CONTENT_WIDTH - 8);
  // 6 = top padding before title, 5 = title line height, 3.5 = per body line, 6 = bottom padding
  const boxHeight = 6 + 5 + bodyLines.length * 3.5 + 6;

  doc.setDrawColor(200, 50, 50);
  doc.setFillColor(255, 245, 245);
  doc.setLineWidth(0.8);
  doc.roundedRect(LEFT_MARGIN, y, CONTENT_WIDTH, boxHeight, 2, 2, "FD");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 30, 30);
  doc.text("IMPORTANT NOTICE", LEFT_MARGIN + 4, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(100, 30, 30);
  bodyLines.forEach((line, i) => {
    doc.text(line, LEFT_MARGIN + 4, y + 11 + i * 3.5);
  });
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  return y + boxHeight + 4;
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
  const fieldX = o.x || LEFT_MARGIN;
  const fieldWidth = o.width || CONTENT_WIDTH;

  if (y > 255) {
    doc.addPage();
    y = TOP_MARGIN;
  }

  if (label) {
    // Small grey label styling — visually lighter than body text
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, fieldX, y);
    y += LINE_HEIGHT - 1;
    doc.setTextColor(0);
  }

  // Light grey background rectangle behind the field area
  const fieldHeight = o.multiline ? (o.lines || 4) * (LINE_HEIGHT + 2) : 8;
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.roundedRect(fieldX, y - 1, fieldWidth, fieldHeight + 2, 1, 1, "FD");

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");

  if (AcroFormTextField) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const field = new (AcroFormTextField as any)();
    field.fieldName = fieldName;
    field.fontSize = BODY_SIZE;
    // Match document font: Helvetica 10pt black
    field.DA = `/Helv ${BODY_SIZE} Tf 0 g`;
    field.defaultAppearance = `/Helv ${BODY_SIZE} Tf 0 g`;
    if (o.multiline) {
      const boxH = fieldHeight;
      field.Rect = [fieldX, y, fieldWidth, boxH];
      field.multiline = true;
      doc.addField(field);
      y += boxH + 2;
    } else {
      field.Rect = [fieldX, y, fieldWidth, 8];
      if (o.prefill) {
        field.value = o.prefill;
        if (o.readOnly) field.readOnly = true;
      }
      doc.addField(field);
      y += 10;
    }
  } else {
    const lineCount = o.multiline ? o.lines || 4 : 1;
    for (let i = 0; i < lineCount; i++) {
      doc.setDrawColor(200);
      doc.line(fieldX + 2, y + 3 + i * (LINE_HEIGHT + 2), fieldX + fieldWidth - 2, y + 3 + i * (LINE_HEIGHT + 2));
      y += LINE_HEIGHT + 2;
    }
  }
  return y;
}

export function addSignatureBlock(
  doc: jsPDF,
  prefix: string,
  y: number
): number {
  y = addSectionHeader(doc, "Authorization & Electronic Signature", y);

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "By typing my name below, I acknowledge this constitutes my electronic signature under the ESIGN Act (15 U.S.C. \u00A7 7001) and applicable state law.",
    LEFT_MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // --- Bordered box wrapping the entire signature block ---
  const boxStartY = y;
  // We need to draw the box after laying out the fields; draw at the end.
  // Render fields first, collect end Y, then draw the box behind.
  // jsPDF draws in painter's order — we draw background first by reserving space.
  // Strategy: estimate block height, draw box, then render fields on top.
  // Estimation: 4 fields × ~16mm each + 10mm for X marker + padding
  const estimatedBlockHeight = 4 * 16 + 14 + 8;

  // Draw the containing box (light background + thin grey border)
  doc.setFillColor(250, 250, 252);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(LEFT_MARGIN, boxStartY - 2, CONTENT_WIDTH, estimatedBlockHeight, 2, 2, "FD");

  // "X" signature marker line
  const sigLineY = boxStartY + 6;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND_BLUE);
  doc.text("X", LEFT_MARGIN + 4, sigLineY);
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(0.5);
  doc.line(LEFT_MARGIN + 10, sigLineY, LEFT_MARGIN + CONTENT_WIDTH - 4, sigLineY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  y = sigLineY + 6;

  y = addFormTextField(doc, `${prefix}_sig_name`, "Signature (type full legal name):", y, { x: LEFT_MARGIN + 4, width: CONTENT_WIDTH - 8 });
  y = addFormTextField(doc, `${prefix}_sig_title`, "Title/Role:", y, { x: LEFT_MARGIN + 4, width: CONTENT_WIDTH - 8 });

  // Date field with format hint
  if (y > 255) {
    doc.addPage();
    y = TOP_MARGIN;
  }
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text("Date:", LEFT_MARGIN + 4, y);
  y += LINE_HEIGHT - 1;
  doc.setTextColor(0);
  // Grey background for date field
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.roundedRect(LEFT_MARGIN + 4, y - 1, CONTENT_WIDTH - 8, 10, 1, 1, "FD");
  // Date format hint text
  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(170, 170, 170);
  doc.text("Date:  ____/____/________", LEFT_MARGIN + 6, y + 5);
  doc.setTextColor(0);
  y += 12;

  y = addFormTextField(doc, `${prefix}_sig_org`, "Organization:", y, { x: LEFT_MARGIN + 4, width: CONTENT_WIDTH - 8 });

  y += 4;
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
  const fieldX = o.x || LEFT_MARGIN;

  if (y > 270) {
    doc.addPage();
    y = TOP_MARGIN;
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
      CONTENT_WIDTH - (fieldX - LEFT_MARGIN) - 10
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
      CONTENT_WIDTH - (fieldX - LEFT_MARGIN),
      LINE_HEIGHT
    );
    y += 2;
  }
  return y;
}
