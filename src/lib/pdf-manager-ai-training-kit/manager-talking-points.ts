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
  addFormTextField,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Manager Talking Points Script
// Word-for-word script for managers explaining AI use to employees
// ============================================================
export function generateManagerTalkingPoints(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Manager Talking Points: AI in Our Workplace", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "These talking points are designed to help managers explain " +
      data.company.name +
      "'s AI use to their teams. Use these scripts as a starting point — adapt the language to fit your team's context. This document is for internal training use only.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Opening the Conversation ───────────────────
  y = addSectionHeader(doc, "1. Opening the Conversation", y);
  y = addWrappedText(
    doc,
    "Use this script to open a team meeting or one-on-one about AI use:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFont("helvetica", "italic");
  const opening =
    '"I want to take some time today to talk about AI tools — specifically, how we\'re using them here at ' +
    data.company.name +
    ', what the rules are, and what it means for you and your work. ' +
    'AI is becoming a regular part of how a lot of organizations operate, and we want to make sure everyone understands what that looks like here — and how you can raise questions or concerns."';
  y = addWrappedText(doc, opening, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Section 2: Explaining What AI We Use ──────────────────
  y = addSectionHeader(doc, "2. Explaining What AI We Use", y);
  y = addWrappedText(
    doc,
    "When employees ask what AI tools the company uses, here is how to explain it clearly:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"We use [fill in: AI tools listed in your AI Acceptable Use Policy]. ' +
      'These tools help us with [fill in: the specific tasks — e.g., drafting communications, screening applications, scheduling, data analysis]. ' +
      'Every AI tool we use has been reviewed and approved. We don\'t allow employees to use AI tools that aren\'t on that list for Company work."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "tp_ai_tools_used", "Fill in: Approved AI tools in your policy:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 3: Explaining the Rules ───────────────────────
  y = addSectionHeader(doc, "3. Explaining the Rules", y);
  y = addWrappedText(
    doc,
    "Use this script to explain what employees can and cannot do:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"Here are the most important rules to understand. First: don\'t put sensitive information into AI tools. ' +
      'That means no customer personal data, no employee information, no trade secrets or confidential business information. ' +
      'Second: AI output isn\'t automatically correct — you\'re responsible for reviewing anything AI generates before using it in your work. ' +
      'Third: AI can\'t make the final call on important decisions about people. If you\'re using AI in a hiring, discipline, or performance review situation, ' +
      'a human has to make the final decision and document why. ' +
      'Fourth: if you\'re not sure whether a use is okay — ask. It\'s always better to ask first than to apologize later."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Section 4: Addressing Concerns About Job Security ─────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "4. Addressing Concerns About Job Security", y);
  y = addWrappedText(
    doc,
    'Employees often worry that AI will replace their jobs. Here is how to address that honestly:',
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"I hear that concern, and I want to address it directly. Our position is that AI is a tool that helps people do their jobs better — ' +
      'not a replacement for human judgment and expertise. ' +
      'The things that make you good at your job — relationships, context, creativity, critical thinking — are things AI can\'t do. ' +
      'Our goal is to use AI to handle repetitive tasks so you can focus on higher-value work. ' +
      'If you have specific concerns about your role, I\'d like to talk through those with you individually."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Section 5: Explaining How AI Affects Employment Decisions
  y = addSectionHeader(doc, "5. Explaining AI in Employment Decisions", y);
  y = addWrappedText(
    doc,
    'If AI is used in any employment decisions, explain it this way:',
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"I want to be transparent about something important. ' +
      '[Fill in if applicable: We use AI tools in parts of our [hiring / performance / scheduling] process.] ' +
      'What I want you to know is: a human being always makes the final decision. ' +
      'AI helps us be more efficient and consistent, but it doesn\'t replace human judgment on decisions that affect people. ' +
      'You have the right to ask questions about how any AI tool is used in decisions that affect you, ' +
      'and you can ask for a human review of any AI-assisted decision."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Section 6: How to Handle Questions You Can't Answer ───
  if (y > 220) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "6. Handling Questions You Can't Answer", y);
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"That\'s a great question, and I want to make sure I give you a correct answer rather than guess. ' +
      'Let me check with [HR / Legal / IT] and get back to you. ' +
      'In the meantime, if you have an urgent concern, here\'s the right person to contact: [AI Compliance Contact]."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "tp_compliance_contact", "AI Compliance Contact (Name, Title, Email):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 7: Closing the Conversation ───────────────────
  y = addSectionHeader(doc, "7. Closing the Conversation", y);
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"Before we wrap up: if you ever see AI being used in a way that doesn\'t feel right — ' +
      'something that seems unfair, biased, or that makes you uncomfortable — I want to hear about it. ' +
      'That\'s not just okay, it\'s important. We can\'t catch problems we don\'t know about. ' +
      'You won\'t get in trouble for raising a concern in good faith. ' +
      'Any questions before we move on?"',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += LINE_HEIGHT;

  // ── Manager Notes ──────────────────────────────────────────
  y = addSectionHeader(doc, "8. Manager Notes", y);
  y = addFormTextField(doc, "tp_meeting_date", "Meeting Date:", y);
  y = addFormTextField(doc, "tp_attendees_count", "Number of Attendees:", y);
  y = addFormTextField(doc, "tp_questions_raised", "Key Questions Raised:", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "tp_followup_items", "Follow-Up Items:", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "tp_manager_name", "Manager Name & Signature:", y);

  addDisclaimer(doc);
  return doc;
}
