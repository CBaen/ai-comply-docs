import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const MAX_RECIPIENTS = 3;
const FROM_ADDRESS = "AI Comply Docs <noreply@aicomplydocs.com>";

const REGULATION_EMAIL: Record<
  string,
  { title: string; statute: string; description: string; steps: string[]; reminder: string }
> = {
  "illinois-hb3773": {
    title: "Your Illinois AI Compliance Package",
    statute: "Illinois HB3773 (775 ILCS 5/2-102(L))",
    description:
      "AI compliance documents, generated for Illinois HB3773 (775 ILCS 5/2-102(L)). Everything you need to meet the state's AI-in-employment requirements is included.",
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
      "AI compliance documents, generated for Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707). Everything you need to meet Colorado consumer AI protection requirements is included.",
    steps: [
      "<strong>Review the Risk Management Policy</strong> with your compliance team and assign responsible parties.",
      "<strong>Complete the Impact Assessment</strong> for each high-risk AI system you deploy.",
      "<strong>Post the Consumer Notice &amp; Transparency Statement</strong> on your website.",
      "<strong>File everything.</strong> The Colorado AG can request proof of compliance. These documents are your evidence.",
    ],
    reminder:
      "Colorado law requires deployers of high-risk AI systems to use reasonable care to protect consumers from algorithmic discrimination. This law takes effect June 30, 2026. Penalties: up to $20,000 per violation under CCPA.",
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
        Questions? Reach us at <a href="mailto:info@aicomplydocs.com" style="color:#2563eb;">info@aicomplydocs.com</a>.
      </p>
    </div>
    <div style="background:#f1f5f9;border-radius:0 0 12px 12px;padding:20px 24px;text-align:center;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">AI Comply Docs &bull; <a href="https://aicomplydocs.com" style="color:#64748b;">aicomplydocs.com</a></p>
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
