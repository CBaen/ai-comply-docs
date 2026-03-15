import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";
import {
  addDisclaimer,
  MARGIN,
  PAGE_WIDTH,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  SMALL_SIZE,
  SUBHEADER_SIZE,
} from "./pdf-helpers";

// Product display names keyed by regulation slug
const PRODUCT_NAMES: Record<string, string> = {
  "illinois-hb3773": "Illinois HB3773 (775 ILCS 5/2-102(L))",
  "colorado-sb24-205": "Colorado SB 24-205",
  "employee-ai-policy": "Employee AI Acceptable Use Policy",
  "vendor-ai-due-diligence": "Vendor AI Due Diligence Kit",
  "ai-bias-audit-template": "AI Bias Audit Template",
  "ai-incident-response-plan": "AI Incident Response Plan",
  "nyc-local-law-144": "NYC Local Law 144",
  "virginia-cdpa": "Virginia CDPA",
  "connecticut-ctdpa": "Connecticut CTDPA",
  "oregon-cpa": "Oregon Consumer Privacy Act",
  "minnesota-mcdpa": "Minnesota MCDPA",
  "texas-tdpsa": "Texas TDPSA",
  "delaware-pdpa": "Delaware PDPA",
  "multi-state-profiling-assessment": "Multi-State Profiling Assessment",
  "multi-state-employer-ai-disclosure": "Multi-State Employer AI Disclosure",
  "california-ccpa-admt": "California CCPA / ADMT",
  "eu-ai-act": "EU AI Act",
  "eeoc-ai-hiring": "EEOC AI Hiring Compliance",
  "nist-ai-rmf": "NIST AI Risk Management Framework",
  "healthcare-ai-compliance": "Healthcare AI Compliance (HIPAA)",
  "financial-services-ai": "Financial Services AI Compliance",
  "manager-ai-training-kit": "Manager AI Training Kit",
  "annual-compliance-review": "Annual AI Compliance Review",
  "board-ai-summary": "Board AI Summary Kit",
  "consumer-notice-kit": "Consumer Notice Kit",
  "data-mapping-inventory": "Data Mapping & Inventory",
  "consumer-rights-kit": "Consumer Rights Kit",
  "ai-governance-framework": "AI Governance Framework",
  "ai-system-registry": "AI System Registry",
  "ai-transparency-report": "AI Transparency Report",
  "ai-whistleblower-policy": "AI Whistleblower Policy",
  "customer-ai-aup": "Customer AI Acceptable Use Policy",
  "il-notice-response-kit": "Illinois Notice & Response Kit",
  "il-zip-proxy-audit": "Illinois Zip/Proxy Audit Kit",
  "co-appeal-correction-kit": "Colorado Appeal & Correction Kit",
  "co-ag-reporting-kit": "Colorado AG Reporting Kit",
  "co-dev-deploy-exchange": "Colorado Developer/Deployer Exchange Kit",
  "ca-admt-notice-optout": "California ADMT Notice & Opt-Out Kit",
  "ca-admt-access-kit": "California ADMT Access Kit",
  "ca-cyber-audit-kit": "California Cybersecurity Audit Kit",
  "nyc-bias-audit-mgmt": "NYC Bias Audit Management Kit",
  "nyc-candidate-notice-kit": "NYC Candidate Notice Kit",
  "va-consumer-rights-kit": "Virginia Consumer Rights Kit",
  "va-profiling-assessment-kit": "Virginia Profiling Assessment Kit",
  "va-controller-processor-kit": "Virginia Controller/Processor Kit",
  "eu-fria-kit": "EU Fundamental Rights Impact Assessment Kit",
  "eu-post-market-kit": "EU Post-Market Monitoring Kit",
  "eu-human-oversight-kit": "EU Human Oversight Kit",
  "eu-registration-transparency": "EU Registration & Transparency Kit",
};

// One-line descriptions for document filenames — strip company slug prefix and .pdf suffix,
// replace underscores with spaces, and strip known state prefix codes so the result reads naturally.
function labelFromFilename(filename: string): string {
  // Strip .pdf
  let name = filename.replace(/\.pdf$/i, "");
  // Strip leading company slug (everything up to and including the first underscore sequence
  // before a known state code or document keyword). Strategy: drop text up to the first
  // uppercase letter run that looks like a document title segment.
  // Simpler: split on "_", skip first token(s) that look like a company slug (no caps-only parts).
  const parts = name.split("_");
  // Find the first index where a part looks like a document keyword (not a slug fragment)
  // Heuristic: company slug parts are lowercase/mixed without spaces; skip them until we see
  // a part that starts with an uppercase letter and is a recognisable doc keyword.
  // In practice all filenames are: <slug>_<DocKeyword>_<...>.pdf
  // The slug itself may contain multiple underscore-separated words.
  // We detect the end of the slug by looking for the first part that is purely uppercase letters
  // (state codes like CO, IL, TX, NYC, CA, EU, VA, IN, KY, etc.) or a known doc keyword.
  const stateOrKeyword = new Set([
    "CO","IL","TX","NYC","CA","EU","VA","IN","KY","MN","MT","OR","CT","NJ",
    "DE","HIPAA","EEOC","NIST","NYC","FinServ","AI","Employer","MultiState",
    "Board","Manager","Employee","Consumer","Customer","Data","Annual","Third",
    "Vendor","FRIA","EU",
  ]);

  let startIdx = 1; // Always skip the first token (company slug start)
  for (let i = 1; i < parts.length; i++) {
    if (stateOrKeyword.has(parts[i]) || /^[A-Z]/.test(parts[i])) {
      startIdx = i;
      break;
    }
  }

  return parts.slice(startIdx).join(" ");
}

// Short descriptions to accompany each document in the package overview.
// We derive these from the cleaned filename rather than maintaining a giant map.
const DOC_DESCRIPTIONS: Record<string, string> = {
  // Illinois
  "AI Notification Letter": "Formal notice to employees and applicants that AI is used in covered decisions.",
  "AI System Inventory": "Catalog of every AI system in use, their vendors, and their decision scope.",
  "Impact Assessment": "Framework for evaluating potential discriminatory impact of each AI system.",
  "Oversight Protocol": "Procedures for human review and governance of AI-assisted decisions.",
  "Compliance Checklist": "Step-by-step verification that all statutory requirements have been met.",
  "Accommodation Request Form": "Form allowing employees to request a non-AI alternative process.",
  "Manager Training Slides": "Slide deck for managers to explain AI use policies to their teams.",
  "Employee FAQ": "Plain-language answers to common employee questions about AI use.",
  // Colorado
  "CO Risk Management Policy": "Risk management program and policy required under C.R.S. § 6-1-1703.",
  "CO Impact Assessment": "Algorithmic impact assessment framework for high-risk AI systems.",
  "CO Consumer Notice": "Pre-decision consumer notice template compliant with SB 24-205.",
  "CO Adverse Decision Kit": "Procedures and templates for adverse-decision notifications and appeals.",
  "CO Transparency Statement": "Public-facing transparency statement about AI use.",
  "CO Incident Response": "Procedures for detecting and responding to algorithmic discrimination incidents.",
  "CO Record Retention": "Record retention schedule aligned with Colorado SB 24-205.",
  "CO Compliance Checklist": "Comprehensive checklist of all SB 24-205 deployer obligations.",
};

function describeDocument(filename: string): string {
  const label = labelFromFilename(filename);
  if (DOC_DESCRIPTIONS[label]) return DOC_DESCRIPTIONS[label];
  // Generic fallback based on keywords present in the label
  const l = label.toLowerCase();
  if (l.includes("checklist")) return "Verification checklist covering all applicable regulatory requirements.";
  if (l.includes("privacy notice")) return "Consumer-facing privacy notice template compliant with applicable law.";
  if (l.includes("data protection assessment") || l.includes("dpia")) return "Structured assessment of data processing activities and associated risks.";
  if (l.includes("consumer rights")) return "Procedures for handling consumer rights requests under applicable law.";
  if (l.includes("opt out") || l.includes("optout")) return "Documentation and procedures for consumer opt-out requests.";
  if (l.includes("data processing agreement") || l.includes("dpa")) return "Contract addendum governing AI-related data processing by vendors.";
  if (l.includes("impact assessment")) return "Assessment of potential impact on affected individuals from AI use.";
  if (l.includes("risk assessment") || l.includes("risk management")) return "Risk assessment framework for AI systems and associated activities.";
  if (l.includes("incident response") || l.includes("incident report")) return "Templates and procedures for responding to AI-related incidents.";
  if (l.includes("bias audit") || l.includes("adverse impact")) return "Structured bias audit documentation and adverse impact analysis.";
  if (l.includes("transparency")) return "Transparency disclosure about AI systems and their decision logic.";
  if (l.includes("governance")) return "Governance policy establishing roles, responsibilities, and controls for AI use.";
  if (l.includes("notification") || l.includes("notice")) return "Formal notice template for disclosure to employees, consumers, or regulators.";
  if (l.includes("training")) return "Training materials and acknowledgment forms for staff.";
  if (l.includes("policy")) return "Policy document establishing rules and expectations for AI use.";
  if (l.includes("whistleblower")) return "Policy and forms for reporting AI-related concerns and violations.";
  if (l.includes("vendor") || l.includes("due diligence")) return "Questionnaire and checklist for assessing AI vendor compliance and risk.";
  if (l.includes("monitoring")) return "Plan and templates for ongoing monitoring of AI system performance.";
  if (l.includes("appeal") || l.includes("correction")) return "Procedures for handling consumer appeals and data correction requests.";
  if (l.includes("register") || l.includes("inventory") || l.includes("registry")) return "Inventory and tracking document for all AI systems in use.";
  if (l.includes("summary") || l.includes("presentation")) return "Executive-level summary for leadership and board-level reporting.";
  if (l.includes("talking points") || l.includes("faq")) return "Communication materials for internal stakeholder education.";
  if (l.includes("addendum") || l.includes("contract")) return "Contract addendum establishing AI-related rights and obligations.";
  if (l.includes("remediation")) return "Corrective action plan for addressing identified compliance gaps.";
  if (l.includes("disclosure")) return "Disclosure document required by applicable regulatory framework.";
  if (l.includes("workflow")) return "Process documentation and workflow template for compliance operations.";
  if (l.includes("questionnaire")) return "Structured questionnaire for gathering required compliance information.";
  return "Compliance document template included in this package.";
}

export function generateWelcomePage(
  data: ComplianceFormData,
  documentNames: string[]
): jsPDF {
  const doc = new jsPDF();
  const headerHeight = 42;
  const accentColor: [number, number, number] = [30, 58, 95]; // #1e3a5f
  const accentLight: [number, number, number] = [235, 241, 250];

  // ── Header band ──────────────────────────────────────────────────────────────
  doc.setFillColor(...accentColor);
  doc.rect(0, 0, PAGE_WIDTH, headerHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AI Compliance Documents", MARGIN, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("aicompliancedocuments.com", MARGIN, 23);

  // Thin rule inside header
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, 27, PAGE_WIDTH - MARGIN, 27);

  const productName =
    PRODUCT_NAMES[data.regulation] ??
    data.regulation
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Your ${productName} Compliance Package`, MARGIN, 35);

  // ── Below header ─────────────────────────────────────────────────────────────
  doc.setTextColor(0, 0, 0);
  let y = headerHeight + 10;

  // Prepared for / date row
  doc.setFont("helvetica", "bold");
  doc.setFontSize(BODY_SIZE);
  doc.text("Prepared for:", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.company.name, MARGIN + 27, y);

  doc.setFont("helvetica", "bold");
  doc.text("Generated:", PAGE_WIDTH - MARGIN - 60, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.generatedDate, PAGE_WIDTH - MARGIN - 40, y);
  y += LINE_HEIGHT + 2;

  // Thin separator
  doc.setDrawColor(200, 210, 230);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 6;

  // ── Documents included ────────────────────────────────────────────────────────
  doc.setFillColor(...accentColor);
  doc.rect(MARGIN, y - 1, CONTENT_WIDTH, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(BODY_SIZE);
  doc.text("Documents Included in This Package", MARGIN + 3, y + 4.5);
  y += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(SMALL_SIZE);

  // Alternating row background for readability
  documentNames.forEach((filename, idx) => {
    const rowH = 8;
    if (idx % 2 === 0) {
      doc.setFillColor(...accentLight);
      doc.rect(MARGIN, y - 1, CONTENT_WIDTH, rowH, "F");
    }
    // Number badge
    doc.setFillColor(...accentColor);
    doc.roundedRect(MARGIN + 1, y, 6, 5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6);
    doc.text(String(idx + 1), MARGIN + 2.2, y + 3.5);

    // Filename (bold)
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(filename, MARGIN + 10, y + 3.5);

    // Description on the same line to the right, grey
    const desc = describeDocument(filename);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(90, 90, 90);
    const maxDescWidth = CONTENT_WIDTH - 10 - doc.getTextWidth(filename) - 6;
    if (maxDescWidth > 20) {
      // Try fitting on same line
      const singleLine = doc.splitTextToSize(desc, maxDescWidth);
      doc.text(singleLine[0], MARGIN + 10 + doc.getTextWidth(filename) + 4, y + 3.5);
    }

    y += rowH;
  });

  doc.setTextColor(0, 0, 0);
  y += 4;

  // ── Next steps ────────────────────────────────────────────────────────────────
  doc.setFillColor(...accentColor);
  doc.rect(MARGIN, y - 1, CONTENT_WIDTH, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(BODY_SIZE);
  doc.text("Next Steps", MARGIN + 3, y + 4.5);
  y += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);

  const steps = [
    "Review each document with your legal team before deployment.",
    "Fill in the highlighted form fields with your company-specific information.",
    "Sign using the electronic signature blocks at the end of each document.",
    "File completed documents according to your records retention policy.",
  ];

  steps.forEach((step) => {
    doc.setFillColor(...accentColor);
    doc.circle(MARGIN + 2, y - 0.5, 1.2, "F");
    doc.setTextColor(0, 0, 0);
    const lines = doc.splitTextToSize(step, CONTENT_WIDTH - 8);
    lines.forEach((line: string, li: number) => {
      doc.text(line, MARGIN + 7, y + li * LINE_HEIGHT);
    });
    y += lines.length * LINE_HEIGHT + 2;
  });

  y += 2;

  // ── Contact line ─────────────────────────────────────────────────────────────
  doc.setDrawColor(200, 210, 230);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(60, 60, 60);
  doc.text("Questions?  info@aicompliancedocuments.com", MARGIN, y);

  // ── Footer disclaimer via addDisclaimer() ────────────────────────────────────
  addDisclaimer(doc);

  return doc;
}
