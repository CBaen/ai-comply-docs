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
  DATA_INPUT_LABELS,
  ROLE_LABELS,
} from "../pdf-helpers";

// ============================================================
// ADD-ON DOCUMENT 8: Employee FAQ
// ============================================================
export function generateEmployeeFAQ(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Employee FAQ: AI in the Workplace", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document answers common employee questions about " +
      data.company.name +
      "'s use of artificial intelligence in employment decisions, pursuant to Illinois law 775 ILCS 5/2-102(L).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const faqs = [
    {
      q: "1. Why am I receiving this notice about AI?",
      a:
        "Illinois law (HB3773, effective January 1, 2026) requires employers to notify employees when artificial intelligence is used in employment decisions such as hiring, promotion, discipline, or discharge. " +
        data.company.name +
        " is providing this notice to comply with that requirement and to be transparent about how technology is used in our workplace.",
    },
    {
      q: "2. What AI systems does " + data.company.name + " use?",
      a:
        data.aiSystems
          .map(
            (s) =>
              s.name +
              (s.vendor ? " (" + s.vendor + ")" : "") +
              " \u2014 " +
              (s.description ||
                "used in " +
                  (s.decisions
                    .map((d) => DECISION_LABELS[d] || d)
                    .join(", ") || "employment decisions"))
          )
          .join("; ") + ".",
    },
    {
      q: "3. Is AI making decisions about me?",
      a:
        (ROLE_LABELS[data.oversight.aiRole] ||
          "AI provides input to employment decisions") +
        ". A qualified human reviewer (" +
        (data.oversight.oversightRole || "designated oversight role") +
        ") is involved in all consequential employment decisions.",
    },
    {
      q: "4. What data does the AI use?",
      a:
        "Our AI systems process the following categories of data: " +
        (data.dataInputs
          .map((d) => DATA_INPUT_LABELS[d] || d)
          .join(", ") ||
          "employment-related data as described in your notification letter") +
        ". The AI does not have access to data outside these categories unless separately disclosed.",
    },
    {
      q: "5. Can the AI discriminate against me?",
      a:
        "Illinois law prohibits employers from using AI that has the effect of discriminating on the basis of protected classes (race, sex, age, disability, religion, national origin, pregnancy, and others). " +
        data.company.name +
        " is committed to preventing discriminatory effects and conducts ongoing monitoring of AI system outputs.",
    },
    {
      q: '6. What are "protected classes"?',
      a: "Under the Illinois Human Rights Act, protected classes include race, color, religion, sex (including pregnancy, sexual orientation, and gender identity), national origin, ancestry, age (40+), marital status, disability, military status, unfavorable discharge from military service, and order of protection status, among others.",
    },
    {
      q: "7. Can I opt out of AI being used for decisions about me?",
      a:
        "You may request a reasonable accommodation regarding AI-assisted employment processes. To make a request, contact " +
        (data.contact.name || "your compliance contact") +
        (data.contact.email ? " at " + data.contact.email : "") +
        ".",
    },
    {
      q: "8. What if I think an AI decision was unfair?",
      a:
        "You have several options: (1) Request a human-only review of the AI-influenced decision by contacting " +
        (data.contact.name || "your compliance contact") +
        ". (2) File an internal complaint through your normal HR channels. (3) File a charge of discrimination with the Illinois Department of Human Rights (IDHR) at 312-814-6200.",
    },
    {
      q: "9. Will I be notified every time AI is used?",
      a: "You will receive an updated notification at least annually, within 30 days of any new or substantially updated AI system being adopted, and in job postings. You do not receive a separate notice for each individual AI-assisted action, but you can request information at any time.",
    },
    {
      q: "10. What happens if my employer violates this law?",
      a: "Using AI that has the effect of discrimination, or failing to provide required notice, is a civil rights violation under the Illinois Human Rights Act. Employees may file a charge with IDHR, which can investigate, mediate, or adjudicate. Courts may award actual damages, back pay, and attorneys' fees.",
    },
    {
      q: "11. Does this law apply to job applicants too?",
      a: "Yes. The proposed IDHR implementing rules require that prospective employees also be notified about AI use, typically through job postings.",
    },
    {
      q: '12. What is a "zip code proxy"?',
      a: "The law specifically prohibits using zip codes as a proxy for protected classes. This means AI systems cannot use your zip code as a stand-in for race, ethnicity, or other protected characteristics, even indirectly.",
    },
    {
      q: "13. How often is the AI audited for bias?",
      a:
        data.biasAudit === "yes"
          ? data.company.name +
            " has completed a bias audit of its AI systems and conducts ongoing monitoring."
          : data.biasAudit === "in_progress"
          ? data.company.name +
            " is currently conducting a bias audit of its AI systems."
          : data.company.name +
            " is establishing a bias audit program for its AI systems.",
    },
    {
      q: "14. Who oversees AI decisions at " + data.company.name + "?",
      a:
        "AI-influenced employment decisions are overseen by " +
        (data.oversight.oversightRole || "a designated compliance role") +
        ". This person has authority to override any AI recommendation and is trained on recognizing potential bias.",
    },
    {
      q: "15. Who should I contact with questions?",
      a:
        "Contact " +
        data.contact.name +
        (data.contact.title ? ", " + data.contact.title : "") +
        (data.contact.email ? " at " + data.contact.email : "") +
        (data.contact.phone ? " or " + data.contact.phone : "") +
        ".",
    },
  ];

  faqs.forEach((faq) => {
    y = addSectionHeader(doc, faq.q, y);
    y = addWrappedText(doc, faq.a, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  addDisclaimer(doc);
  return doc;
}
