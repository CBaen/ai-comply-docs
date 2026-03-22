import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  BRAND_BLUE,
  LEFT_MARGIN,
  RIGHT_MARGIN,
  TOP_MARGIN,
  CONTENT_WIDTH,
  PAGE_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  SMALL_SIZE,
  SUBHEADER_SIZE,
  addWrappedText,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// Vibe Coding Security Compliance Checklist
// Based on OWASP Top 10 and NIST SP 800-53 security controls
// ============================================================

interface SecurityRule {
  number: number;
  title: string;
  requirement: string;
  risk: string;
  auditStep: string;
  compliancePrompt: string;
}

const SECURITY_RULES: SecurityRule[] = [
  {
    number: 1,
    title: "CORS Configuration",
    requirement: "Configure CORS to allow only production domain requests.",
    risk:
      "Open CORS allows attackers to steal user data via malicious sites.",
    auditStep:
      "Search codebase for Access-Control-Allow-Origin headers.",
    compliancePrompt:
      'Configure CORS to only allow requests from [your-domain.com]',
  },
  {
    number: 2,
    title: "Redirect Validation",
    requirement: "Validate all redirect URLs against an allowlist.",
    risk: "Open redirects enable post-login phishing attacks.",
    auditStep:
      "Search for redirect parameters (?redirect=, ?next=, ?callback=).",
    compliancePrompt:
      "Ensure all redirect URLs are validated against an allowlist before redirecting",
  },
  {
    number: 3,
    title: "Storage Security",
    requirement: "Storage buckets must have row-level security policies.",
    risk: "Public buckets expose all user files to search engines.",
    auditStep:
      "Check S3/Supabase storage configurations for public access.",
    compliancePrompt:
      "Create storage policies so users can only access files they uploaded",
  },
  {
    number: 4,
    title: "Debug Statement Removal",
    requirement:
      "No console.log statements with sensitive data in production.",
    risk:
      "DevTools expose logged user data, tokens, and session info.",
    auditStep:
      "Search for console.log with variables containing user/data/token/secret.",
    compliancePrompt:
      "Remove all console.log statements and replace with proper error logging",
  },
  {
    number: 5,
    title: "Webhook Verification",
    requirement:
      "Verify cryptographic signatures on all payment webhooks.",
    risk: "Fake webhook payloads trigger unauthorized actions.",
    auditStep:
      "Check webhook handlers for stripe.webhooks.constructEvent() or equivalent.",
    compliancePrompt:
      "Verify the webhook signature using Stripe's SDK before processing",
  },
  {
    number: 6,
    title: "Server-Side Permission Checks",
    requirement:
      "Authorization must be enforced server-side, not just in UI.",
    risk:
      "API endpoints callable directly via curl bypass UI-only protections.",
    auditStep:
      "Check protected routes for server-side role/permission checks.",
    compliancePrompt:
      "Check if user.role === 'admin' on the server before executing",
  },
  {
    number: 7,
    title: "Dependency Management",
    requirement:
      "All packages must be current with no known critical vulnerabilities.",
    risk:
      "80% of breaches exploit known vulnerabilities in outdated packages.",
    auditStep:
      "Run npm audit (Node.js), pip audit (Python), or equivalent.",
    compliancePrompt:
      "Run npm audit fix and update packages with known exploits",
  },
  {
    number: 8,
    title: "Rate Limiting",
    requirement: "Sensitive endpoints must be rate-limited.",
    risk:
      "Unlimited requests enable brute-force attacks and email bombing.",
    auditStep:
      "Check password reset, login, and payment endpoints for rate limits.",
    compliancePrompt:
      "Add rate limiting: max 3\u201310 requests per IP per minute",
  },
  {
    number: 9,
    title: "Error Handling",
    requirement:
      "User-facing errors must be sanitized; raw stack traces server-side only.",
    risk:
      "Stack traces reveal file paths, tech stack, and attack surface.",
    auditStep:
      "Check catch blocks and error responses in API routes.",
    compliancePrompt:
      "Catch all errors and return generic messages to users",
  },
  {
    number: 10,
    title: "Session Management",
    requirement:
      "JWT tokens must expire; refresh token rotation must be implemented.",
    risk:
      "Permanent sessions mean stolen cookies grant forever access.",
    auditStep:
      "Check JWT configuration for maxAge/expiration settings.",
    compliancePrompt:
      "Set JWT expiration to 7 days and implement refresh token rotation",
  },
];

// ── Layout helpers ────────────────────────────────────────────

function addPageHeader(doc: jsPDF): void {
  const bandHeight = 32;
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, PAGE_WIDTH, bandHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Vibe Coding Security Compliance Checklist", LEFT_MARGIN, 13);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("Prepared by AI Compliance Documents \u2014 aicompliancedocuments.com", LEFT_MARGIN, 22);
}

function addMetaBlock(
  doc: jsPDF,
  companyName: string,
  generatedDate: string,
  y: number
): number {
  const blockHeight = 18;
  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(200, 210, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(LEFT_MARGIN, y, CONTENT_WIDTH, blockHeight, 2, 2, "FD");

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Organization:", LEFT_MARGIN + 4, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  doc.text(companyName, LEFT_MARGIN + 34, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Generated:", LEFT_MARGIN + 4, y + 13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  doc.text(generatedDate, LEFT_MARGIN + 28, y + 13);

  return y + blockHeight + 6;
}

// Status checkbox row: three boxes side by side
function addStatusRow(doc: jsPDF, y: number): number {
  if (y > 272) {
    doc.addPage();
    addPageHeader(doc);
    y = TOP_MARGIN + 36;
  }

  const statuses = ["Compliant", "Non-Compliant", "N/A"];
  const boxSize = 4;
  const labelGap = 6;
  const colWidth = 45;
  let x = LEFT_MARGIN + 4;

  doc.setFontSize(SMALL_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text("Status:", x, y + 3);
  x += 16;

  statuses.forEach((label) => {
    // Draw checkbox square
    doc.setDrawColor(120, 130, 145);
    doc.setFillColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.rect(x, y, boxSize, boxSize, "FD");

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(SMALL_SIZE);
    doc.text(label, x + labelGap, y + 3.2);
    x += colWidth;
  });

  doc.setTextColor(0);
  return y + boxSize + 4;
}

// One rule card
function addRuleCard(doc: jsPDF, rule: SecurityRule, y: number): number {
  // Page break guard — leave enough room for a minimal card
  if (y > 215) {
    doc.addPage();
    addPageHeader(doc);
    y = TOP_MARGIN + 36;
  }

  // ── Rule number + title bar ──
  const titleBandH = 9;
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(LEFT_MARGIN, y, CONTENT_WIDTH, titleBandH, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(SUBHEADER_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Rule ${rule.number}: ${rule.title}`,
    LEFT_MARGIN + 4,
    y + 6.5
  );
  y += titleBandH;

  // ── Card body (light background) ──
  // We estimate height, draw background first, then overlay text
  // Estimate: 4 rows at ~12mm each + status row ~9mm + padding
  const estimatedBodyH = 4 * 13 + 10 + 8;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(210, 218, 228);
  doc.setLineWidth(0.3);
  doc.rect(LEFT_MARGIN, y, CONTENT_WIDTH, estimatedBodyH, "FD");

  y += 4;

  const labelX = LEFT_MARGIN + 4;
  const valueX = LEFT_MARGIN + 32;
  const valueWidth = CONTENT_WIDTH - 36;
  const rowSpacing = 1.5;

  const fields: Array<{ label: string; value: string; color?: [number, number, number] }> = [
    {
      label: "Requirement:",
      value: rule.requirement,
    },
    {
      label: "Risk:",
      value: rule.risk,
      color: [160, 40, 40],
    },
    {
      label: "Audit Step:",
      value: rule.auditStep,
    },
    {
      label: "AI Prompt:",
      value: `"${rule.compliancePrompt}"`,
    },
  ];

  fields.forEach((field) => {
    if (y > 270) {
      doc.addPage();
      addPageHeader(doc);
      y = TOP_MARGIN + 36;
    }

    doc.setFontSize(SMALL_SIZE);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND_BLUE);
    doc.text(field.label, labelX, y + 3);

    doc.setFont("helvetica", "normal");
    if (field.color) {
      doc.setTextColor(...field.color);
    } else {
      doc.setTextColor(40, 40, 40);
    }

    const lines: string[] = doc.splitTextToSize(field.value, valueWidth);
    lines.forEach((line, idx) => {
      if (y + idx * LINE_HEIGHT > 272) {
        doc.addPage();
        addPageHeader(doc);
        y = TOP_MARGIN + 36 - idx * LINE_HEIGHT;
      }
      doc.text(line, valueX, y + 3 + idx * (LINE_HEIGHT - 0.5));
    });

    y += lines.length * (LINE_HEIGHT - 0.5) + rowSpacing + 2;
  });

  doc.setTextColor(0);

  // ── Separator before status ──
  doc.setDrawColor(210, 218, 228);
  doc.setLineWidth(0.25);
  doc.line(LEFT_MARGIN + 2, y, LEFT_MARGIN + CONTENT_WIDTH - 2, y);
  y += 3;

  y = addStatusRow(doc, y);

  // Bottom gap between cards
  y += 5;
  return y;
}

// ── Main generator ────────────────────────────────────────────

export function generateVibeSecurityChecklist(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();

  // Page 1 header band
  addPageHeader(doc);

  let y = TOP_MARGIN + 16;

  // Meta block (company + date)
  y = addMetaBlock(doc, data.company.name, data.generatedDate, y);

  // Intro paragraph
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  y = addWrappedText(
    doc,
    "This checklist identifies the ten most critical security controls that AI-generated code " +
      "routinely misses. For each rule: review the requirement, assess your risk exposure, run " +
      "the audit step against your codebase, and — if a fix is needed — paste the Compliance " +
      "Prompt directly into your AI coding tool. Mark each rule Compliant, Non-Compliant, or " +
      "N/A once verified.",
    LEFT_MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Framework citation banner
  const citationBandH = 9;
  doc.setFillColor(240, 244, 250);
  doc.setDrawColor(190, 205, 225);
  doc.setLineWidth(0.4);
  doc.rect(LEFT_MARGIN, y, CONTENT_WIDTH, citationBandH, "FD");
  doc.setFontSize(SMALL_SIZE);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(70, 90, 120);
  doc.text(
    "Based on OWASP Top 10 and NIST SP 800-53 security controls",
    LEFT_MARGIN + 4,
    y + 6
  );
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  y += citationBandH + 8;

  // ── Rule cards ────────────────────────────────────────────
  SECURITY_RULES.forEach((rule) => {
    y = addRuleCard(doc, rule, y);
  });

  // ── Summary sign-off block ─────────────────────────────────
  if (y > 230) {
    doc.addPage();
    addPageHeader(doc);
    y = TOP_MARGIN + 36;
  }

  // Section header
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(LEFT_MARGIN, y, CONTENT_WIDTH, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(SUBHEADER_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text("Audit Summary", LEFT_MARGIN + 4, y + 6.5);
  y += 9 + 4;

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 40);
  y = addWrappedText(
    doc,
    "Complete this section once all 10 rules have been reviewed. " +
      "Keep a signed copy as evidence of your security review process. " +
      "Revisit this checklist before each major deployment and after adding " +
      "any authentication, payment, or file-upload features.",
    LEFT_MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Tally fields
  const tallyFields = [
    { name: "vibe_tally_compliant", label: "Rules marked Compliant:" },
    { name: "vibe_tally_noncompliant", label: "Rules marked Non-Compliant:" },
    { name: "vibe_tally_na", label: "Rules marked N/A:" },
  ];

  tallyFields.forEach((field) => {
    if (y > 260) {
      doc.addPage();
      addPageHeader(doc);
      y = TOP_MARGIN + 36;
    }
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BRAND_BLUE);
    doc.text(field.label, LEFT_MARGIN, y);
    // Draw fill-in line
    doc.setDrawColor(180, 190, 205);
    doc.setLineWidth(0.4);
    doc.line(LEFT_MARGIN + 60, y, LEFT_MARGIN + 100, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    y += LINE_HEIGHT + 2;
  });

  y += 2;

  // Notes field
  if (y > 255) {
    doc.addPage();
    addPageHeader(doc);
    y = TOP_MARGIN + 36;
  }
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Notes / Remediation Plan:", LEFT_MARGIN, y);
  y += LINE_HEIGHT;

  const notesBoxH = 28;
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(200, 210, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(LEFT_MARGIN, y, CONTENT_WIDTH, notesBoxH, 1, 1, "FD");
  // Draw ruled lines inside notes box
  doc.setDrawColor(220, 225, 232);
  doc.setLineWidth(0.2);
  for (let i = 1; i <= 3; i++) {
    const lineY = y + i * (notesBoxH / 4);
    doc.line(LEFT_MARGIN + 3, lineY, LEFT_MARGIN + CONTENT_WIDTH - 3, lineY);
  }
  y += notesBoxH + 6;

  // Reviewer sign-off
  if (y > 250) {
    doc.addPage();
    addPageHeader(doc);
    y = TOP_MARGIN + 36;
  }

  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BRAND_BLUE);
  doc.text("Reviewed by:", LEFT_MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);

  const sigLineFields = [
    { label: "Name / Title:", lineWidth: 100 },
    { label: "Date:", lineWidth: 60 },
  ];

  sigLineFields.forEach((f) => {
    y += LINE_HEIGHT + 1;
    if (y > 270) {
      doc.addPage();
      addPageHeader(doc);
      y = TOP_MARGIN + 36;
    }
    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(100, 100, 100);
    doc.text(f.label, LEFT_MARGIN + 4, y);
    doc.setDrawColor(160, 170, 185);
    doc.setLineWidth(0.4);
    doc.line(LEFT_MARGIN + 30, y, LEFT_MARGIN + 30 + f.lineWidth, y);
    doc.setTextColor(0);
  });

  y += LINE_HEIGHT + 4;

  // ── Footer disclaimer on all pages ───────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageCount = (doc as any).internal.getNumberOfPages();
  const footerText =
    "Based on OWASP Top 10 and NIST SP 800-53 security controls. " +
    "For informational purposes only \u2014 not legal or security advice. " +
    "Verify controls are correctly implemented for your specific stack before relying on them.";

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(LEFT_MARGIN, 282, LEFT_MARGIN + CONTENT_WIDTH, 282);

    doc.setFontSize(6.5);
    doc.setTextColor(150);
    const footerLines: string[] = doc.splitTextToSize(
      footerText,
      CONTENT_WIDTH - 25
    );
    footerLines.forEach((line, idx) => {
      doc.text(line, LEFT_MARGIN, 286 + idx * 3);
    });
    doc.text(
      `Page ${i} of ${pageCount}`,
      PAGE_WIDTH - RIGHT_MARGIN - 18,
      289
    );
    doc.setTextColor(0);
  }

  return doc;
}
