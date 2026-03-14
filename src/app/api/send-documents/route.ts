import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const MAX_RECIPIENTS = 3;
const FROM_ADDRESS = "AI Compliance Documents <noreply@aicompliancedocuments.com>";

const REGULATION_EMAIL: Record<
  string,
  { title: string; statute: string; description: string; steps: string[]; reminder: string }
> = {
  "illinois-hb3773": {
    title: "Your Illinois AI Compliance Package",
    statute: "Illinois HB3773 (775 ILCS 5/2-102(L))",
    description:
      "AI compliance documentation templates, aligned with Illinois HB3773 (775 ILCS 5/2-102(L)) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Post the Employee Notification</strong> where staff can see it — breakroom, intranet, or onboarding packet.",
      "<strong>Have HR review the Impact Assessment</strong> and designate your Human Oversight contact.",
      "<strong>File everything.</strong> IDHR can request proof of compliance. These documents are your evidence.",
    ],
    reminder:
      "Illinois law requires written notice to employees and applicants before AI is used in employment decisions. This law has been in effect since January 1, 2026.",
  },
  "colorado-sb24-205": {
    title: "Your Colorado AI Compliance Package",
    statute: "Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707)",
    description:
      "AI compliance documentation templates, aligned with Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Review the Risk Management Policy</strong> with your compliance team and assign responsible parties.",
      "<strong>Complete the Impact Assessment</strong> for each high-risk AI system you deploy.",
      "<strong>Post the Consumer Notice &amp; Transparency Statement</strong> on your website.",
      "<strong>File everything.</strong> The Colorado AG can request proof of compliance. These documents are your evidence.",
    ],
    reminder:
      "Colorado law requires deployers of high-risk AI systems to use reasonable care to protect consumers from algorithmic discrimination. This law takes effect June 30, 2026. Penalties: up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112).",
  },
  "employee-ai-policy": {
    title: "Your Employee AI Acceptable Use Policy",
    statute: "NIST AI RMF + EEOC Guidance",
    description:
      "employee AI policy documents, aligned with the NIST AI Risk Management Framework and EEOC guidance. All three documents are included.",
    steps: [
      "<strong>Review the Acceptable Use Policy</strong> with your legal team, then distribute to all employees.",
      "<strong>Schedule AI training</strong> and use the Training Acknowledgment form to track completion.",
      "<strong>Make the Incident Reporting Form accessible</strong> &mdash; link it in your intranet, employee handbook, or Slack.",
    ],
    reminder:
      "While no single federal law mandates an employee AI policy, multiple state laws (CO, IL, TX) and the NIST AI RMF recommend documented governance. A clear policy also protects against vicarious liability.",
  },
  "vendor-ai-due-diligence": {
    title: "Your Vendor AI Due Diligence Kit",
    statute: "NIST AI RMF + State Deployer Requirements",
    description:
      "vendor AI due diligence documents, aligned with the NIST AI RMF and state deployer requirements (CO SB205, IL HB3773, TX HB149). All four documents are included.",
    steps: [
      "<strong>Send the Due Diligence Questionnaire</strong> to each AI vendor before signing or renewing contracts.",
      "<strong>Use the Contract Addendum</strong> as a starting point for your legal team to negotiate AI-specific contract terms.",
      "<strong>Complete the Risk Assessment</strong> for each vendor and file it with your procurement records.",
      "<strong>Set calendar reminders</strong> for the quarterly and annual monitoring items in the Checklist.",
    ],
    reminder:
      "Colorado SB205 and Texas TRAIGA require deployers to evaluate the AI systems they procure from vendors. These documents demonstrate the due diligence that regulators expect.",
  },
  "ai-bias-audit-template": {
    title: "Your AI Bias Audit Templates",
    statute: "NYC LL144 + EEOC Uniform Guidelines",
    description:
      "bias audit templates, aligned with NYC Local Law 144 annual audit requirements and EEOC Uniform Guidelines (29 C.F.R. § 1607). All three documents are included.",
    steps: [
      "<strong>Use the Impact Ratio Worksheet</strong> to calculate adverse impact ratios for each protected class.",
      "<strong>Document results in the Bias Audit Report</strong> &mdash; NYC LL144 requires annual publication of audit summaries.",
      "<strong>If adverse impact is found,</strong> use the Remediation Plan to document corrective actions and timelines.",
    ],
    reminder:
      "NYC LL144 requires annual bias audits for automated employment decision tools. The EEOC 4/5 (80%) rule is the federal standard for evaluating adverse impact. Proactive auditing is the strongest evidence of good faith.",
  },
  "ai-incident-response-plan": {
    title: "Your AI Incident Response Plan",
    statute: "NIST AI RMF + California TFAIA + EU AI Act",
    description:
      "AI incident response documents, aligned with the NIST AI RMF Manage function, California TFAIA 15-day reporting requirements, and EU AI Act serious incident obligations. All four documents are included.",
    steps: [
      "<strong>Assign your Incident Response Team.</strong> Fill in the Roles &amp; Responsibilities section of the Incident Response Plan and make sure every team member has a copy.",
      "<strong>Print and distribute the Classification Matrix.</strong> Anyone who might identify an AI incident should know how to use it.",
      "<strong>Store the Incident Report Template</strong> where it's accessible day or night — your ticketing system, SharePoint, or a shared drive.",
      "<strong>Schedule your first tabletop exercise.</strong> The plan requires one annually. Set the date now.",
    ],
    reminder:
      "California TFAIA requires incident reporting within 15 days of identification. EU AI Act Article 73 requires serious incident notification as soon as possible. Document your response process before you need it.",
  },
  "nyc-local-law-144": {
    title: "Your NYC Local Law 144 Compliance Package",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 (Local Law 144)",
    description:
      "compliance documentation templates aligned with NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874) requirements. Review each document with your legal team before use.",
    steps: [
      "<strong>Review the Bias Audit Report Template</strong> with your independent auditor before scheduling your annual audit.",
      "<strong>Post the Bias Audit Summary</strong> on your website at least 10 business days before using each AEDT, per DCWP rules.",
      "<strong>Send the Candidate/Employee Notification</strong> before using an AEDT on any job applicant or employee.",
      "<strong>File everything.</strong> DCWP may request audit documentation. These documents are your evidence of compliance.",
    ],
    reminder:
      "NYC LL144 requires annual independent bias audits and public posting of audit summaries for all automated employment decision tools. DCWP enforcement has been active since July 5, 2023 and shifted to proactive investigations in 2026.",
  },
  "texas-tdpsa": {
    title: "Your Texas TDPSA Compliance Package",
    statute: "Tex. Bus. & Com. Code Ch. 541 (Texas Data Privacy and Security Act, HB 4)",
    description:
      "compliance documentation templates aligned with the Texas Data Privacy and Security Act (Tex. Bus. & Com. Code Ch. 541, HB 4) requirements. Review each document with your legal team before deployment. Note: This is separate from the Texas TRAIGA (HB 149, Ch. 551\u2013554).",
    steps: [
      "<strong>Complete the Data Protection Assessment</strong> for each AI system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Texas AG upon request (\u00A7 541.107(b)).",
      "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 541.101.",
      "<strong>Execute Data Processing Agreements</strong> with each processor that handles Texas consumer personal data, per \u00A7 541.105.",
      "<strong>File everything.</strong> The Texas AG enforces the TDPSA. These documents demonstrate compliance.",
    ],
    reminder:
      "The Texas Data Privacy and Security Act (Tex. Bus. & Com. Code Ch. 541) has been in effect since July 1, 2024. Attorney General enforcement only (\u00A7 541.151). No private right of action. Permanent 30-day cure period (\u00A7 541.154). Penalty: up to $7,500 per violation (\u00A7 541.155). This law is separate from Texas TRAIGA (HB 149).",
  },
  "delaware-pdpa": {
    title: "Your Delaware PDPA Compliance Package",
    statute: "Del. Code tit. 6, ch. 12D, \u00A7\u00A7 12D-101 through 12D-111 (Delaware PDPA, HB 154)",
    description:
      "compliance documentation templates aligned with the Delaware Personal Data Privacy Act (Del. Code tit. 6, ch. 12D, HB 154) requirements. Review each document with your legal team before deployment. Delaware has the lowest coverage thresholds of any state (35,000 consumers).",
    steps: [
      "<strong>Complete the Data Protection Assessment</strong> for each system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Delaware AG upon request (\u00A7 12D-109(b)).",
      "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 12D-106.",
      "<strong>Implement Universal Opt-Out recognition</strong> (e.g., Global Privacy Control) as required by \u00A7 12D-106(e), effective January 1, 2026.",
      "<strong>Execute Data Processing Agreements</strong> with each processor handling Delaware consumer personal data, per \u00A7 12D-108.",
    ],
    reminder:
      "The Delaware Personal Data Privacy Act (Del. Code tit. 6, ch. 12D) has been in effect since January 1, 2025. Attorney General enforcement only (\u00A7 12D-111). No private right of action. 60-day cure period until December 31, 2025; AG discretion after. Penalty: up to $10,000 per violation. Delaware has the lowest coverage thresholds of any state.",
  },
  "multi-state-profiling-assessment": {
    title: "Your Multi-State Profiling Assessment Bundle",
    statute: "15+ State Consumer Privacy Laws Requiring Data Protection Assessments",
    description:
      "multi-state data protection assessment templates covering all major state consumer privacy laws requiring documented profiling assessments. Review each document with your legal team before deployment and verify applicability thresholds for each state.",
    steps: [
      "<strong>Complete the Threshold Analysis Worksheet</strong> to confirm which state laws apply to your organization.",
      "<strong>Review the State Comparison Matrix</strong> to understand each state\u2019s penalties, cure periods, and enforcement mechanisms.",
      "<strong>Complete the Multi-State Data Protection Assessment</strong> for each covered processing activity (profiling, targeted advertising, data sales, sensitive data).",
      "<strong>Update your Privacy Notice</strong> using the Multi-State Privacy Notice Template to cover all applicable states.",
      "<strong>File everything.</strong> State AGs may request assessment documentation. These documents demonstrate compliance.",
    ],
    reminder:
      "State consumer privacy laws are enacted and enforced independently. Key active laws: Texas TDPSA (eff. Jul 1, 2024), Delaware PDPA (eff. Jan 1, 2025), Minnesota MCDPA (eff. Jul 31, 2025). Penalties range from $7,500 (TX) to $25,000 per willful violation (MN). Verify current status of each law with qualified legal counsel.",
  },
  "multi-state-employer-ai-disclosure": {
    title: "Your Multi-State Employer AI Disclosure Kit",
    statute: "IL 775 ILCS 5/2-102(L) + NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 + CO C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    description:
      "multi-jurisdiction employer AI disclosure templates covering Illinois HB3773, NYC Local Law 144, and Colorado SB24-205. Review each document with your legal team before deployment. Each jurisdiction enforces independently.",
    steps: [
      "<strong>Review the Multi-Jurisdiction Compliance Matrix</strong> to confirm which of the three laws applies to your organization.",
      "<strong>Distribute the Unified Employee/Candidate Notification</strong> and applicable State-Specific Addenda to employees and job applicants before using AI in employment decisions.",
      "<strong>Schedule your annual NYC LL144 bias audit</strong> using the Bias Audit Cross-Reference Guide \u2014 required annually before using any AEDT in NYC.",
      "<strong>Implement the Multi-State Record Retention Policy</strong> to ensure compliance documents are preserved for the required period in each jurisdiction.",
    ],
    reminder:
      "Illinois HB3773 has been in effect since January 1, 2026. NYC Local Law 144 enforcement began July 5, 2023; DCWP proactive investigations increased in 2026. Colorado SB24-205 takes effect June 30, 2026 (per SB 25B-004). IL penalties: up to $70,000 per violation. NYC penalties: up to $1,500/violation/day. CO penalties: up to $20,000 per violation.",
  },
  "minnesota-mcdpa": {
    title: "Your Minnesota MCDPA Compliance Package",
    statute: "Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21",
    description:
      "compliance documentation templates aligned with the Minnesota Consumer Data Privacy Act (Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Minnesota MCDPA.",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests.",
      "<strong>Complete the Data Protection Impact Assessment</strong> for each system that uses profiling for consequential decisions.",
      "<strong>File everything.</strong> The Minnesota AG enforces the MCDPA. These documents demonstrate compliance.",
    ],
    reminder:
      "The Minnesota Consumer Data Privacy Act (Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21) has been in effect since July 31, 2025. The Minnesota Attorney General has exclusive enforcement authority (\u00A7 325M.20(b)). There is no private right of action.",
  },
  "california-ccpa-admt": {
    title: "Your California CCPA ADMT Compliance Package",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq. + CPPA ADMT Regulations",
    description:
      "compliance documentation templates aligned with the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations under the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.). Review each document with your legal team before deployment.",
    steps: [
      "<strong>Publish the Pre-Use ADMT Notice</strong> before using any automated decisionmaking technology on California consumers.",
      "<strong>Implement your Opt-Out Mechanism</strong> using the documentation template and verify it is accessible and functional.",
      "<strong>Complete the ADMT Risk Assessment</strong> for each system that makes or substantially assists significant decisions about consumers.",
      "<strong>Establish your Human Review Process</strong> so consumers can request human review of ADMT-driven decisions.",
    ],
    reminder:
      "The CPPA ADMT regulations are effective January 1, 2026. CPPA administrative enforcement and AG civil enforcement both apply. Penalties: $2,500 per violation, $7,500 per intentional violation (Cal. Civ. Code \u00A7 1798.155). Verify current CPPA guidance at cppa.ca.gov.",
  },
  "eu-ai-act": {
    title: "Your EU AI Act Compliance Package",
    statute: "Regulation (EU) 2024/1689",
    description:
      "compliance documentation templates aligned with Regulation (EU) 2024/1689 (the EU AI Act) requirements for high-risk AI systems. Review each document with your legal team and EU-qualified counsel before deployment.",
    steps: [
      "<strong>Complete the Risk Management System Documentation</strong> for each high-risk AI system \u2014 this is required before placing a system on the EU market.",
      "<strong>Prepare Technical Documentation (Annex IV)</strong> for each high-risk system and maintain it throughout the system\u2019s lifecycle.",
      "<strong>Register your high-risk AI systems</strong> in the EU database using the Registration Documentation template (required before deployment for most Annex III systems).",
      "<strong>Implement your Post-Market Monitoring Plan</strong> and assign responsibility for ongoing incident reporting and corrective actions.",
    ],
    reminder:
      "The EU AI Act has phased effective dates: prohibited AI practices from February 2025, GPAI obligations from August 2025, Annex III high-risk system obligations from August 2027. National market surveillance authorities enforce. High-risk violations: up to \u20AC15,000,000 or 3% global turnover (Art. 99(4)).",
  },
  "eeoc-ai-hiring": {
    title: "Your EEOC AI Hiring Compliance Kit",
    statute: "Title VII + 29 CFR Part 1607 (Uniform Guidelines)",
    description:
      "compliance documentation templates aligned with the EEOC\u2019s enforcement of existing federal anti-discrimination law (Title VII, ADA, ADEA) and the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) as applied to AI hiring tools. Review each document with your legal team before use.",
    steps: [
      "<strong>Run the Adverse Impact Analysis</strong> for each AI hiring tool using the Template \u2014 the EEOC 4/5 (80%) rule is the federal standard under 29 CFR \u00A7 1607.4(D).",
      "<strong>Complete Job-Relatedness Validation Documentation</strong> for each tool to demonstrate the selection criteria are job-related and consistent with business necessity.",
      "<strong>Establish Reasonable Accommodation Procedures</strong> before using AI assessments on any applicant or employee.",
      "<strong>Send the Vendor AI Audit Requirements</strong> to each AI tool vendor and keep their responses on file.",
    ],
    reminder:
      "Employers remain liable under Title VII, ADA, and ADEA for discriminatory outcomes from AI hiring tools, even when the AI vendor is responsible. EEOC AI-specific technical assistance has been modified under the current administration \u2014 verify current guidance at eeoc.gov.",
  },
  "nist-ai-rmf": {
    title: "Your NIST AI RMF Implementation Package",
    statute: "NIST AI 100-1 (AI Risk Management Framework 1.0)",
    description:
      "implementation templates aligned with the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). These templates cover the Govern, Map, Measure, and Manage core functions. Review each document with your legal and technical teams.",
    steps: [
      "<strong>Start with the AI Risk Management Plan</strong> \u2014 it sets your organization\u2019s overall approach and assigns accountability for each RMF function.",
      "<strong>Complete the AI System Risk Profile</strong> for each system you operate, using the Map Function Documentation to identify context and risks.",
      "<strong>Use the Measure Function Documentation</strong> to document your metrics, testing, and evaluation procedures for each system.",
      "<strong>Implement the Manage Function Documentation</strong> to track risks, assign mitigations, and establish your incident and escalation procedures.",
    ],
    reminder:
      "The NIST AI RMF is a voluntary framework \u2014 NIST is non-regulatory. However, it is referenced as the compliance standard by Colorado (SB 24-205), federal contractor requirements, and enterprise procurement programs. Demonstrating RMF alignment shows reasonable care. AI RMF 1.0 is currently being revised \u2014 verify the current version at airc.nist.gov.",
  },
  "healthcare-ai-compliance": {
    title: "Your Healthcare AI Compliance Package",
    statute: "HIPAA Privacy Rule (45 CFR Part 164)",
    description:
      "compliance documentation templates aligned with HIPAA Privacy Rule (45 CFR Part 164 Subpart E), Security Rule (Subpart C), and Breach Notification Rule (Subpart D) requirements as applied to AI processing of protected health information. Review each document with your legal team and HIPAA counsel before deployment.",
    steps: [
      "<strong>Complete the AI Risk Assessment for PHI Processing</strong> for each AI system that creates, receives, maintains, or transmits protected health information.",
      "<strong>Execute Business Associate Agreements</strong> with each AI vendor that processes PHI using the BAA template \u2014 a BAA is required before sharing PHI with any business associate.",
      "<strong>Implement AI-Specific Security Policies</strong> covering access controls, audit logging, and incident detection for AI systems processing PHI.",
      "<strong>Establish Breach Notification Procedures</strong> for AI-related PHI breaches \u2014 HHS OCR requires notification within 60 days of discovery.",
    ],
    reminder:
      "HIPAA applies to any covered entity or business associate using AI to process protected health information. HIPAA penalties range up to $2,100,000 per violation category per year. HHS may issue additional guidance on AI and HIPAA \u2014 verify current guidance at hhs.gov/hipaa.",
  },
  "financial-services-ai": {
    title: "Your Financial Services AI Compliance Package",
    statute: "ECOA/Regulation B (12 CFR Part 1002) + FINRA AI Supervision",
    description:
      "compliance documentation templates aligned with the Equal Credit Opportunity Act (15 USC \u00A7 1691 et seq.), Regulation B (12 CFR Part 1002), the Fair Credit Reporting Act (15 USC \u00A7 1681 et seq.), and FINRA AI supervision requirements. Review each document with your legal team and compliance counsel before use.",
    steps: [
      "<strong>Adopt the AI Supervision Policy</strong> and assign supervisory responsibility for each AI system \u2014 FINRA requires documented supervision of AI-generated communications and recommendations.",
      "<strong>Complete Model Risk Documentation</strong> for each AI model used in regulated activities, including validation status and performance monitoring.",
      "<strong>Prepare ECOA Adverse Action Notices</strong> for AI-driven credit denials \u2014 Regulation B requires specific disclosures explaining the reasons for adverse credit decisions.",
      "<strong>Conduct Annual AI Review</strong> using the Checklist to verify all AI systems remain within approved risk parameters and supervisory controls are functioning.",
    ],
    reminder:
      "FINRA has flagged AI supervision as a 2026 examination priority. CFPB UDAAP authority reaches AI-driven unfair, deceptive, or abusive practices. Regulation B (12 CFR Part 1002) requires adverse action notices for AI-driven credit denials. Verify current SEC, CFPB, and FINRA guidance for your specific firm type.",
  },
};

function buildEmailHtml(
  companyName: string,
  documentNames: string[],
  contactName: string,
  regulation: string
) {
  const reg = REGULATION_EMAIL[regulation] || REGULATION_EMAIL["illinois-hb3773"];
  const greeting = contactName ? `Hi ${contactName},` : "Hi,";
  const docList = documentNames
    .map((name) => `<li style="padding:4px 0;color:#374151;">${name}</li>`)
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
      <p style="color:#1f2937;font-size:15px;line-height:1.6;margin:0 0 20px;">Attached are ${companyName}'s ${reg.description}</p>
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

export async function POST(request: Request) {
  const { emails, documents, companyName, contactName, regulation } =
    await request.json();

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

  try {
    const attachments = documents.map(
      (doc: { filename: string; base64: string }) => ({
        filename: doc.filename,
        content: doc.base64,
      })
    );

    const documentNames = documents.map((doc: { filename: string }) =>
      doc.filename
        .replace(/^[^_]*_/, "")
        .replace(/_/g, " ")
        .replace(/\.pdf$/i, "")
    );

    const reg =
      REGULATION_EMAIL[regulation] || REGULATION_EMAIL["illinois-hb3773"];
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: emails,
      subject: `${reg.title} — ${companyName}`,
      html: buildEmailHtml(companyName, documentNames, contactName, regulation),
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }
}
