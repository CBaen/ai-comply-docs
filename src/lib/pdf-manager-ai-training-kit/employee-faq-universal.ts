import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addDisclaimer,
  addFormTextField,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Employee FAQ — AI in the Workplace
// Pre-written answers to 10 questions employees will ask about AI
// ============================================================
export function generateEmployeeFAQUniversal(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Employee FAQ: AI in Our Workplace", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This FAQ answers the questions employees most commonly ask about AI use at " +
      data.company.name +
      ". Share this document with employees during or after AI training sessions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const faqs: Array<{ q: string; a: string }> = [
    {
      q: "Q1: What AI tools does the company use?",
      a: "A: " +
        data.company.name +
        " uses approved AI tools for specific business purposes. A list of approved tools is maintained in our AI Acceptable Use Policy. If you see an AI tool being used that you didn't know about, or that doesn't seem right, you should ask your manager or our AI compliance contact. We don't allow employees to use AI tools not on the approved list for company work.",
    },
    {
      q: "Q2: Will AI replace my job?",
      a: "A: Our position is that AI is a productivity tool, not a replacement for human judgment and expertise. We use AI to handle repetitive or time-consuming tasks — which frees people to focus on higher-value work that requires human skills. If you have specific concerns about how AI might affect your role, please talk to your manager. We're committed to transparency about how AI is used and how it affects our teams.",
    },
    {
      q: "Q3: Is the company using AI to evaluate my performance?",
      a: "A: {{AI_PERF_EVAL}}. If AI tools play any role in performance evaluation at " +
        data.company.name +
        ", those tools assist the review process — a qualified human manager makes every final performance decision. AI output is never the sole basis for any consequential decision about your employment. You have the right to ask your HR representative about any AI tools used in your performance evaluation.",
    },
    {
      q: "Q4: What happens to data I put into AI tools?",
      a: "A: Our AI Acceptable Use Policy restricts what data employees can enter into AI tools. You should not input customer personal information, employee records, trade secrets, or other sensitive data into AI tools unless specifically authorized. Data handling practices differ by tool — check the policy or ask IT before using AI with sensitive information. When in doubt, don't enter the data.",
    },
    {
      q: "Q5: Can I use AI tools I find myself for work tasks?",
      a: "A: No — you must use only AI tools approved by " +
        data.company.name +
        " for company work. This includes tools you access through personal accounts. Using unapproved AI tools for work creates data security and legal risks for you and the company. If you need a tool that isn't approved, you can request approval from [AI Oversight Officer / IT / HR]. Using unapproved tools for work is a policy violation.",
    },
    {
      q: "Q6: What if AI makes a mistake that affects my work?",
      a: "A: You're responsible for reviewing AI output before using it in your work. If you use AI-generated content without reviewing it and it causes a problem, that's on you — not the AI. If you discover AI made a significant error that already caused harm, report it using the AI Incident Reporting Form as soon as possible. Document what happened, what the error was, and what you did to address it.",
    },
    {
      q: "Q7: What if I think AI is being used unfairly toward me or a colleague?",
      a: "A: Raise it immediately. You can talk to your manager, HR, or contact our AI compliance contact directly. Concerns about AI producing discriminatory or unfair outcomes are taken seriously. You will not face retaliation for raising a concern in good faith. If you believe AI was used to make an employment decision that discriminated against you, you can also file a complaint with [HR / Legal / the appropriate government agency].",
    },
    {
      q: "Q8: What training am I required to complete about AI?",
      a: "A: All employees who use AI tools in their work must complete AI acceptable use training within 30 days of their start date, and annually after that. Certain roles require additional training. Your manager will notify you of required training and deadlines. Training completion is tracked and is a condition of continued access to AI tools.",
    },
    {
      q: "Q9: Can I use AI to communicate with customers?",
      a: "A: Only with proper authorization and oversight. Our policy requires human review of any AI-generated content before it goes to customers. You must not send AI-generated content to customers as if it were personally written unless it has been reviewed and approved. Some customer communication tools may have AI features — only use those features in approved ways per the policy.",
    },
    {
      q: "Q10: Who do I contact if I have a question the FAQ doesn't cover?",
      a: "A: Contact your manager first. If your manager can't answer it, reach out to our AI compliance contact: " +
        (data.contact?.name || "{{AI_CONTACT}}") +
        (data.contact?.email ? " (" + data.contact.email + ")" : "") +
        ". For urgent concerns — such as a data incident or suspected policy violation — report immediately using the AI Incident Reporting Form available at {{FORM_LOCATION}}.",
    },
  ];

  faqs.forEach((faq, idx) => {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }

    if (idx > 0) {
      y = addSectionHeader(doc, faq.q, y);
    } else {
      y = addSectionHeader(doc, faq.q, y);
    }

    y = addWrappedText(doc, faq.a, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── Fill-In Fields ────────────────────────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Customize Before Distribution", y);
  y = addWrappedText(
    doc,
    "Fill in these fields, then find and replace the matching {{placeholders}} in the FAQ text above:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(doc, "faq_ai_perf_eval", "{{AI_PERF_EVAL}} — Does the company use AI in performance evaluation? (Yes / No / Partially):", y);
  y = addFormTextField(doc, "faq_ai_contact", "{{AI_CONTACT}} — AI compliance contact name, title, email:", y);
  y = addFormTextField(doc, "faq_form_location", "{{FORM_LOCATION}} — Where is the AI Incident Reporting Form available?:", y);

  // ── Document Information ───────────────────────────────────
  if (y > 240) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "Document Information", y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80);
  y = addWrappedText(
    doc,
    "Company: " + data.company.name + "  |  Date: " + data.generatedDate,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "Review this FAQ annually or whenever AI tools or policies are updated. Distribute alongside the AI Acceptable Use Policy and Training Acknowledgment form.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setTextColor(0);

  addDisclaimer(doc);
  return doc;
}
