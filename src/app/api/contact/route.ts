import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimitAsync, getClientIp } from "@/lib/rate-limit";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  // Rate limit: 5 submissions per 15 minutes per IP
  const ip = getClientIp(request);
  const { limited } = await rateLimitAsync(`contact:${ip}`, 5, 15 * 60 * 1000);
  if (limited) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { name, email, company, subject, message, _hp } = body;

  // Honeypot — bots fill hidden fields
  if (_hp) {
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message too long (5,000 character limit)." },
      { status: 400 }
    );
  }

  const ALLOWED_SUBJECTS = [
    "General Inquiry",
    "Product Question",
    "Bulk / Enterprise Pricing",
    "Partnership Opportunity",
    "Press / Media",
    "Technical Issue",
  ];
  if (subject && !ALLOWED_SUBJECTS.includes(subject)) {
    return NextResponse.json({ error: "Invalid subject." }, { status: 400 });
  }

  const safeName = name.replace(/[\r\n]/g, "");
  const safeSubject = (subject || "General Inquiry").replace(/[\r\n]/g, "");

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "AI Compliance Documents <noreply@aicompliancedocuments.com>",
      to: "info@aicompliancedocuments.com",
      replyTo: email,
      subject: `[Contact] ${safeSubject} — ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151; width: 120px;">Name</td>
              <td style="padding: 8px 12px; color: #111827;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 8px 12px; color: #111827;">
                <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Company</td>
              <td style="padding: 8px 12px; color: #111827;">${escapeHtml(company)}</td>
            </tr>` : ""}
            <tr style="background: #f9fafb;">
              <td style="padding: 8px 12px; font-weight: bold; color: #374151;">Subject</td>
              <td style="padding: 8px 12px; color: #111827;">${escapeHtml(subject || "General Inquiry")}</td>
            </tr>
          </table>
          <div style="background: #f3f4f6; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #374151;">Message:</p>
            <p style="margin: 0; color: #111827; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Sent from the contact form at aicompliancedocuments.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
