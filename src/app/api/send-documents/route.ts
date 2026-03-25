import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateDeliveryToken } from "@/lib/delivery-token";
import { getRegulation } from "@/data/regulations";
import { rateLimitAsync, getClientIp } from "@/lib/rate-limit";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const MAX_RECIPIENTS = 3;
const FROM_ADDRESS = "AI Compliance Documents <noreply@aicompliancedocuments.com>";

/**
 * Slim override map — steps only, keyed by slug.
 * Only populate this when a product's action steps are genuinely distinct
 * from the generic three-step fallback. All other fields (title, statute,
 * description, reminder) are derived from regulations.ts via deriveEmailContent().
 */
const STEP_OVERRIDES: Record<string, string[]> = {
  "illinois-hb3773": [
    "<strong>Post the Employee Notification</strong> where staff can see it — breakroom, intranet, or onboarding packet.",
    "<strong>Have HR review the Impact Assessment</strong> and designate your Human Oversight contact.",
    "<strong>File everything.</strong> IDHR can request proof of compliance. These documents are your evidence.",
  ],
  "colorado-sb24-205": [
    "<strong>Review the Risk Management Policy</strong> with your compliance team and assign responsible parties.",
    "<strong>Complete the Impact Assessment</strong> for each high-risk AI system you deploy.",
    "<strong>Post the Consumer Notice &amp; Transparency Statement</strong> on your website.",
    "<strong>File everything.</strong> The Colorado AG can request proof of compliance. These documents are your evidence.",
  ],
  "nyc-local-law-144": [
    "<strong>Review the Bias Audit Report Template</strong> with your independent auditor before scheduling your annual audit.",
    "<strong>Post the Bias Audit Summary</strong> on your website at least 10 business days before using each AEDT, per DCWP rules.",
    "<strong>Send the Candidate/Employee Notification</strong> before using an AEDT on any job applicant or employee.",
    "<strong>File everything.</strong> DCWP may request audit documentation. These documents are your evidence of compliance.",
  ],
  "texas-tdpsa": [
    "<strong>Complete the Data Protection Assessment</strong> for each AI system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Texas AG upon request (\u00A7 541.107(b)).",
    "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 541.101.",
    "<strong>Execute Data Processing Agreements</strong> with each processor that handles Texas consumer personal data, per \u00A7 541.105.",
    "<strong>File everything.</strong> The Texas AG enforces the TDPSA. These documents demonstrate compliance.",
  ],
  "delaware-pdpa": [
    "<strong>Complete the Data Protection Assessment</strong> for each system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Delaware AG upon request (\u00A7 12D-109(b)).",
    "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 12D-106.",
    "<strong>Implement Universal Opt-Out recognition</strong> (e.g., Global Privacy Control) as required by \u00A7 12D-106(e), effective January 1, 2026.",
    "<strong>Execute Data Processing Agreements</strong> with each processor handling Delaware consumer personal data, per \u00A7 12D-108.",
  ],
  "virginia-cdpa": [
    "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Virginia CDPA, including targeted advertising and data sales disclosures (\u00A7 59.1-578(D)).",
    "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00A7 59.1-580(A)(3)).",
    "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00A7 59.1-578(B)).",
    "<strong>File everything.</strong> The Virginia AG enforces the CDPA and may request Data Protection Assessments (\u00A7 59.1-580(B)). These documents demonstrate compliance.",
  ],
  "connecticut-ctdpa": [
    "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Connecticut CTDPA (\u00A7 42-520).",
    "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00A7 42-522(a)(3)).",
    "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00A7 42-519(b)).",
    "<strong>File everything.</strong> The Connecticut AG enforces the CTDPA and may request Data Protection Assessments (\u00A7 42-522(c)). These documents demonstrate compliance.",
  ],
  "oregon-cpa": [
    "<strong>Update your Privacy Notice</strong> to include consumer rights, opt-out disclosures, and your children\u2019s data consent practices for consumers aged 13\u201315 (\u00A7 646A.578).",
    "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (\u00A7 646A.586(1)(a)).",
    "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (\u00A7 646A.576(2)(b)).",
    "<strong>Implement consent collection</strong> for consumers aged 13\u201315 before processing their data for targeted advertising or data sales (\u00A7 646A.576(1)(c)).",
  ],
  "california-ccpa-admt": [
    "<strong>Publish the Pre-Use ADMT Notice</strong> before using any automated decisionmaking technology on California consumers.",
    "<strong>Implement your Opt-Out Mechanism</strong> using the documentation template and verify it is accessible and functional.",
    "<strong>Complete the ADMT Risk Assessment</strong> for each system that makes or substantially assists significant decisions about consumers.",
    "<strong>Establish your Human Review Process</strong> so consumers can request human review of ADMT-driven decisions.",
  ],
  "eu-ai-act": [
    "<strong>Complete the Risk Management System Documentation</strong> for each high-risk AI system \u2014 this is required before placing a system on the EU market.",
    "<strong>Prepare Technical Documentation (Annex IV)</strong> for each high-risk system and maintain it throughout the system\u2019s lifecycle.",
    "<strong>Register your high-risk AI systems</strong> in the EU database using the Registration Documentation template (required before deployment for most Annex III systems).",
    "<strong>Implement your Post-Market Monitoring Plan</strong> and assign responsibility for ongoing incident reporting and corrective actions.",
  ],
  "eeoc-ai-hiring": [
    "<strong>Run the Adverse Impact Analysis</strong> for each AI hiring tool using the Template \u2014 the EEOC 4/5 (80%) rule is the federal standard under 29 CFR \u00A7 1607.4(D).",
    "<strong>Complete Job-Relatedness Validation Documentation</strong> for each tool to demonstrate the selection criteria are job-related and consistent with business necessity.",
    "<strong>Establish Reasonable Accommodation Procedures</strong> before using AI assessments on any applicant or employee.",
    "<strong>Send the Vendor AI Audit Requirements</strong> to each AI tool vendor and keep their responses on file.",
  ],
  "nist-ai-rmf": [
    "<strong>Start with the AI Risk Management Plan</strong> \u2014 it sets your organization\u2019s overall approach and assigns accountability for each RMF function.",
    "<strong>Complete the AI System Risk Profile</strong> for each system you operate, using the Map Function Documentation to identify context and risks.",
    "<strong>Use the Measure Function Documentation</strong> to document your metrics, testing, and evaluation procedures for each system.",
    "<strong>Implement the Manage Function Documentation</strong> to track risks, assign mitigations, and establish your incident and escalation procedures.",
  ],
  "employee-ai-policy": [
    "<strong>Review the Acceptable Use Policy</strong> with your legal team, then distribute to all employees.",
    "<strong>Schedule AI training</strong> and use the Training Acknowledgment form to track completion.",
    "<strong>Make the Incident Reporting Form accessible</strong> &mdash; link it in your intranet, employee handbook, or Slack.",
  ],
  "vendor-ai-due-diligence": [
    "<strong>Send the Due Diligence Questionnaire</strong> to each AI vendor before signing or renewing contracts.",
    "<strong>Use the Contract Addendum</strong> as a starting point for your legal team to negotiate AI-specific contract terms.",
    "<strong>Complete the Risk Assessment</strong> for each vendor and file it with your procurement records.",
    "<strong>Set calendar reminders</strong> for the quarterly and annual monitoring items in the Checklist.",
  ],
  "ai-bias-audit-template": [
    "<strong>Use the Impact Ratio Worksheet</strong> to calculate adverse impact ratios for each protected class.",
    "<strong>Document results in the Bias Audit Report</strong> &mdash; NYC LL144 requires annual publication of audit summaries.",
    "<strong>If adverse impact is found,</strong> use the Remediation Plan to document corrective actions and timelines.",
  ],
  "ai-incident-response-plan": [
    "<strong>Assign your Incident Response Team.</strong> Fill in the Roles &amp; Responsibilities section of the Incident Response Plan and make sure every team member has a copy.",
    "<strong>Print and distribute the Classification Matrix.</strong> Anyone who might identify an AI incident should know how to use it.",
    "<strong>Store the Incident Report Template</strong> where it\u2019s accessible day or night \u2014 your ticketing system, SharePoint, or a shared drive.",
    "<strong>Schedule your first tabletop exercise.</strong> The plan requires one annually. Set the date now.",
  ],
  "ai-governance-framework": [
    "<strong>Start with the AI Governance Policy.</strong> Have leadership sign it, distribute it to all teams, and make it the anchor document for your AI program.",
    "<strong>Customize the AI Ethics Principles Statement</strong> to reflect your organization\u2019s values and publish it internally and externally.",
    "<strong>Apply the Risk Classification Matrix</strong> to every AI system in your inventory. High-risk systems need the most oversight.",
    "<strong>Route every new AI use case through the Approval Workflow</strong> before deployment. Document each approval.",
    "<strong>Seat your AI Steering Committee</strong> using the Charter as your founding document. Schedule your first meeting.",
    "<strong>Assign your AI Compliance Officer</strong> using the Role Description. This role is accountable for everything else on this list.",
  ],
};

type EmailContent = {
  title: string;
  statute: string;
  description: string;
  steps: string[];
  reminder: string;
};

/**
 * Derives email content from regulations.ts. Uses STEP_OVERRIDES for
 * products that have action-specific steps; falls back to generic steps
 * for all others. Never reads from a separate hardcoded content map.
 */
function deriveEmailContent(slug: string): EmailContent {
  const reg = getRegulation(slug);
  const name = reg?.shortName || reg?.name || slug;
  const title = `Your ${name} Compliance Package`;
  const statute = reg?.citation ?? "";
  // First ~200 chars of description for the email intro sentence
  const fullDesc = reg?.description ?? "";
  const description =
    fullDesc.length > 200
      ? fullDesc.slice(0, fullDesc.lastIndexOf(" ", 200)) + "..."
      : fullDesc;
  const steps = STEP_OVERRIDES[slug] ?? [
    `<strong>Review each document</strong> in your ${name} compliance package carefully.`,
    `<strong>Fill in the form fields</strong> with your company-specific information.`,
    `<strong>Have your legal team review</strong> the completed documents before implementation.`,
  ];
  const reminder = `Keep these documents current. Review annually or when ${name} regulations change.`;
  return { title, statute, description, steps, reminder };
}

function buildEmailHtml(
  companyName: string,
  documentNames: string[],
  contactName: string,
  regulation: string
) {
  companyName = escapeHtml(companyName);
  contactName = contactName ? escapeHtml(contactName) : "";
  const reg = deriveEmailContent(regulation);
  const greeting = contactName ? `Hi ${contactName},` : "Hi,";
  const docList = documentNames
    .map((name) => `<li style="padding:4px 0;color:#374151;">${escapeHtml(name)}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#1e3a5f;border-radius:12px 12px 0 0;padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">${reg.title}</h1>
      <p style="color:#93c5fd;font-size:14px;margin:0;">${companyName}</p>
    </div>
    <div style="background:#ffffff;padding:32px 24px;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#1f2937;font-size:15px;line-height:1.6;margin:0 0 20px;">${greeting}</p>
      <p style="color:#1f2937;font-size:15px;line-height:1.6;margin:0 0 20px;">Attached are your ${reg.statute ? `${escapeHtml(reg.statute)} ` : ""}compliance documents for ${companyName}.</p>
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
        <p style="font-weight:700;color:#1e3a5f;font-size:14px;margin:0 0 8px;">Attached Documents:</p>
        <ul style="margin:0;padding:0 0 0 20px;font-size:14px;">${docList}</ul>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
        <p style="font-weight:700;color:#166534;font-size:14px;margin:0 0 12px;">What to Do Right Now:</p>
        <ol style="margin:0;padding:0 0 0 20px;font-size:14px;color:#374151;line-height:1.8;">
          ${reg.steps.map((s) => `<li>${s}</li>`).join("\n          ")}
        </ol>
      </div>
      <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:14px 20px;margin:0 0 24px;">
        <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">
          <strong>Reminder:</strong> ${reg.reminder}
        </p>
      </div>
      <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
        Questions? Reach us at <a href="mailto:info@aicompliancedocuments.com" style="color:#2563eb;">info@aicompliancedocuments.com</a>.
      </p>
    </div>
    <div style="background:#f1f5f9;border-radius:0 0 12px 12px;padding:20px 24px;text-align:center;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">AI Compliance Documents &bull; <a href="https://aicompliancedocuments.com" style="color:#64748b;">aicompliancedocuments.com</a></p>
      <p style="color:#cbd5e1;font-size:11px;margin:8px 0 0;">These documents are templates for compliance planning purposes. They do not constitute legal advice.</p>
    </div>
  </div>
</body>
</html>`;
}

// Track used delivery tokens in memory — prevents replay within the same instance
const usedTokens = new Set<string>();

export async function POST(request: Request) {
  // Rate limit: 3 document sends per 15 minutes per IP
  const ip = getClientIp(request);
  const { limited } = await rateLimitAsync(`send-docs:${ip}`, 3, 15 * 60 * 1000);
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { emails, documents, companyName, contactName, regulation, deliveryToken, sessionId } =
    await request.json();

  if (!deliveryToken || !sessionId || !validateDeliveryToken(sessionId, deliveryToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Single-use enforcement: each sessionId can only send documents once
  const tokenKey = `${sessionId}:${deliveryToken}`;
  if (usedTokens.has(tokenKey)) {
    return NextResponse.json(
      { error: "Documents have already been sent for this purchase. Check your email." },
      { status: 409 }
    );
  }

  // Database enforcement — durable single-use check across all instances/restarts
  if (process.env.DATABASE_URL) {
    try {
      const pool = (await import("@/lib/db")).getPool();
      const result = await pool.query(
        `INSERT INTO used_tokens (token_key) VALUES ($1) ON CONFLICT DO NOTHING`,
        [tokenKey]
      );
      if (result.rowCount === 0) {
        return NextResponse.json(
          { error: "Documents have already been sent for this purchase. Check your email." },
          { status: 409 }
        );
      }
      // Mark in-memory cache now that DB insert succeeded
      usedTokens.add(tokenKey);
    } catch (err) {
      // Database check failed — fall through to in-memory only
      console.error("Token DB check failed (non-blocking):", err);
    }
  }

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json(
      { error: "At least one email address is required" },
      { status: 400 }
    );
  }

  if (emails.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { error: `Maximum ${MAX_RECIPIENTS} recipients allowed` },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of emails) {
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: `Invalid email address: ${email}` },
        { status: 400 }
      );
    }
  }

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return NextResponse.json({ error: "No documents provided" }, { status: 400 });
  }

  if (!companyName || typeof companyName !== "string") {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  if (companyName.length > 200) {
    return NextResponse.json({ error: "Company name too long (max 200 characters)" }, { status: 400 });
  }

  if (contactName && typeof contactName === "string" && contactName.length > 200) {
    return NextResponse.json({ error: "Contact name too long (max 200 characters)" }, { status: 400 });
  }

  if (!regulation || typeof regulation !== "string" || !getRegulation(regulation)) {
    return NextResponse.json({ error: "Invalid regulation" }, { status: 400 });
  }

  try {
    // Validate and sanitize each document before attaching.
    const MAX_FILENAME_LENGTH = 200;
    const MAX_BASE64_BYTES = 5 * 1024 * 1024; // 5MB per document
    for (const doc of documents as { filename: string; base64: string }[]) {
      if (typeof doc.filename !== "string" || typeof doc.base64 !== "string") {
        return NextResponse.json({ error: "Invalid document format" }, { status: 400 });
      }
      // Strip path separators and enforce .pdf extension
      const safeName = doc.filename.replace(/[/\\]/g, "");
      if (!safeName.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json(
          { error: `Document filename must end with .pdf: ${safeName}` },
          { status: 400 }
        );
      }
      if (safeName.length > MAX_FILENAME_LENGTH) {
        return NextResponse.json(
          { error: `Document filename too long (max ${MAX_FILENAME_LENGTH} chars)` },
          { status: 400 }
        );
      }
      // base64 string length ≈ (bytes * 4/3); check against 5MB decoded limit
      if (doc.base64.length > Math.ceil(MAX_BASE64_BYTES * (4 / 3))) {
        return NextResponse.json(
          { error: `Document "${safeName}" exceeds 5MB size limit` },
          { status: 400 }
        );
      }
    }

    const attachments = (documents as { filename: string; base64: string }[]).map(
      (doc) => ({
        filename: doc.filename.replace(/[/\\]/g, ""),
        content: doc.base64,
      })
    );

    const documentNames = documents.map((doc: { filename: string }) =>
      doc.filename
        .replace(/^[^_]*_/, "")
        .replace(/_/g, " ")
        .replace(/\.pdf$/i, "")
    );

    // Derive email title from regulations.ts — no separate map needed
    const emailContent = deriveEmailContent(regulation);
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: emails,
      subject: `${emailContent.title} — ${companyName}`,
      html: buildEmailHtml(companyName, documentNames, contactName, regulation),
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // If DATABASE_URL is not set, mark token used in memory after successful send
    if (!process.env.DATABASE_URL) {
      usedTokens.add(tokenKey);
    }

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }
}
