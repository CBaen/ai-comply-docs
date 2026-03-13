import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// ADD-ON DOCUMENT 7: Manager Training Guide
// ============================================================
export function generateManagerTraining(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Manager Guide: AI in Employment Decisions", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This guide helps managers and supervisors at " +
      data.company.name +
      " understand and follow Illinois law on AI in the workplace. Keep it handy \u2014 it covers what the law requires, what you need to do, and how to answer employee questions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: The Law in Plain Language
  y = addSectionHeader(doc, "1. What the Law Requires", y);
  y = addWrappedText(
    doc,
    "Since January 1, 2026, Illinois law (HB3773) sets rules for employers who use AI in hiring, promotions, discipline, or other employment decisions. Here is what it means for you:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const lawPoints = [
    "Employees and applicants must be told when AI plays a role in decisions about them.",
    "AI tools cannot discriminate based on race, sex, age, disability, religion, or other protected characteristics.",
    "Zip codes cannot be used as a stand-in for protected characteristics.",
    "Violations are civil rights violations \u2014 they are taken seriously.",
  ];
  lawPoints.forEach((p) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + p,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 2: AI Systems at This Company
  y = addSectionHeader(doc, "2. AI Systems We Use", y);
  y = addWrappedText(
    doc,
    data.company.name +
      " uses the following AI systems. You should know which ones affect your team:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  data.aiSystems.forEach((sys) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      sys.name,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      "Vendor: " + (sys.vendor || "Internal"),
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    y = addWrappedText(
      doc,
      "Used for: " +
        (sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ") ||
          "General employment decisions"),
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    if (sys.description) {
      y = addWrappedText(
        doc,
        "How it works: " + sys.description,
        MARGIN + 10,
        y,
        CONTENT_WIDTH - 10,
        LINE_HEIGHT
      );
    }
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 3: What You Need to Do
  y = addSectionHeader(doc, "3. Your Responsibilities", y);
  y = addWrappedText(
    doc,
    "As a manager, you play a direct role in compliance. Here is your checklist:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const managerDuties = [
    "Know which AI systems are used in your department.",
    "Confirm every employee on your team has received their AI notification letter.",
    "Never rely on AI output alone for hiring, firing, promotion, or discipline \u2014 always apply your own judgment.",
    "Write down your reasoning whenever you act on an AI recommendation.",
    "If an employee asks for an accommodation related to AI, take it seriously and route it to " +
      (data.contact.name || "Compliance") +
      ".",
    "If you notice something that looks like bias in AI results, report it to " +
      (data.contact.name || "Compliance") +
      " right away.",
  ];
  managerDuties.forEach((d) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + d,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 4: Answering Employee Questions
  y = addSectionHeader(doc, "4. Answering Employee Questions", y);
  y = addWrappedText(
    doc,
    "Employees may have questions about AI. Here are the most common ones and how to respond:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const faqs = [
    {
      q: '"Is AI making decisions about me?"',
      a: "AI provides information and recommendations, but a real person reviews and makes every final decision. Your notification letter lists exactly which AI systems are used and what they do.",
    },
    {
      q: '"Can I opt out of AI?"',
      a:
        "You can request an accommodation. That means asking for a different process that does not involve AI. Contact " +
        (data.contact.name || "Compliance") +
        " and they will work with you to find a solution.",
    },
    {
      q: '"Is this even legal?"',
      a: "Yes. Illinois law allows employers to use AI as long as employees are notified and the AI does not discriminate. That is exactly what we are doing.",
    },
    {
      q: '"What if I think the AI was unfair to me?"',
      a: "You can ask for a human-only review of any AI-related decision. You can also file a complaint internally or contact the Illinois Department of Human Rights (IDHR) directly.",
    },
  ];
  faqs.forEach((faq) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      faq.q,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(
      doc,
      faq.a,
      MARGIN + 10,
      y,
      CONTENT_WIDTH - 10,
      LINE_HEIGHT
    );
    y += 4;
  });
  y += LINE_HEIGHT;

  // Section 5: Who to Contact
  y = addSectionHeader(doc, "5. Who to Contact", y);
  y = addWrappedText(
    doc,
    "For any AI compliance questions \u2014 yours or your employees\u2019 \u2014 reach out to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    data.contact.name +
      (data.contact.title ? ", " + data.contact.title : ""),
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      "Email: " + data.contact.email,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      "Phone: " + data.contact.phone,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  y += LINE_HEIGHT;
  y = addWrappedText(
    doc,
    "Employees can also contact IDHR directly: Illinois Department of Human Rights, 312-814-6200, www.illinois.gov/idhr",
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
