import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Candidate/Employee Notification Template
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateCandidateNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Candidate/Employee AI Notification",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This notice is provided by ${data.company.name} pursuant to NYC Admin. Code § 20-871(a), which requires employers to notify candidates and employees before using an automated employment decision tool (AEDT) for a covered employment decision. This notice must be provided at least 10 business days before the AEDT is used on a given candidate or employee.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Notice to Applicant / Employee", y);
  y = addWrappedText(
    doc,
    `Dear Applicant / Employee,\n\n${data.company.name} uses one or more automated employment decision tools (AEDTs) in connection with the employment decision(s) described below. An AEDT is a computational process, including one derived from machine learning, statistical modeling, data analytics, or artificial intelligence, that issues a simplified output (such as a score, classification, or recommendation) that is used to substantially assist in making employment decisions (NYC Admin. Code § 20-870).`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `AEDT ${idx + 1}: ${sys.name}`, y);

    const fields: [string, string, string][] = [
      [
        `notif_${idx}_vendor`,
        "Vendor/Developer:",
        sys.vendor || "Internal system",
      ],
      [
        `notif_${idx}_purpose`,
        "Purpose (type of employment decision):",
        sys.decisions.join(", ") || "See position description",
      ],
    ];
    fields.forEach(([fieldName, label, prefill]) => {
      y = addFormTextField(doc, fieldName, label, y, {
        prefill,
        readOnly: false,
      });
    });

    y = addFormTextField(
      doc,
      `notif_${idx}_qualifications`,
      "Job qualifications or characteristics assessed by this AEDT:",
      y,
      { multiline: true, lines: 3 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Your Rights", y);
  const rights = [
    "You have the right to request an alternative selection process or accommodation in lieu of the AEDT, consistent with the employer\u2019s legal obligations and operational needs.",
    "You may request a copy of the employer\u2019s published bias audit summary at any time.",
    "You have the right to be free from unlawful discrimination in employment decisions, including decisions influenced by AEDTs.",
  ];
  rights.forEach((right) => {
    y = addWrappedText(
      doc,
      "  \u2022 " + right,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "How to Request an Alternative Process", y);
  y = addWrappedText(
    doc,
    `To request an alternative selection process or to obtain a copy of the bias audit summary, contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addWrappedText(
    doc,
    `${data.contact.name}${data.contact.title ? ", " + data.contact.title : ""}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      `Email: ${data.contact.email}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      `Phone: ${data.contact.phone}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Acknowledgment (Optional)", y);
  y = addWrappedText(
    doc,
    "Recommended Best Practice \u2014 not a statutory mandate: retain a signed copy of this notice.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(doc, "ack_name", "Print Name:", y);
  y = addFormTextField(doc, "ack_signature", "Signature:", y);
  y = addFormTextField(doc, "ack_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
