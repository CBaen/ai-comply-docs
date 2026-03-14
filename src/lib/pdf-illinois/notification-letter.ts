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
  BODY_SIZE,
  DECISION_LABELS,
  DATA_INPUT_LABELS,
  ROLE_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Employee/Applicant AI Notification Letter
// ============================================================
export function generateNotificationLetter(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Usage Notification", data);
  y = addTopDisclaimer(doc, y);

  y = addSectionHeader(
    doc,
    "Notice of Artificial Intelligence Use in Employment Decisions",
    y
  );

  const intro = `Dear Employee/Applicant,\n\nPursuant to 775 ILCS 5/2-102(L)(2) (P.A. 103-804, eff. January 1, 2026), ${data.company.name} is providing this notice regarding our use of artificial intelligence ("AI") in employment-related decisions. Section 2-102(L)(2) makes it a civil rights violation "for an employer to fail to provide notice to an employee that the employer is using artificial intelligence" in covered employment decisions. This notice discloses, based on 775 ILCS 5/2-102(L)(2) statutory requirements and recommended best practices: (1) the AI systems we use and their developers/vendors, (2) the employment decisions these systems influence or facilitate, (3) the categories of data processed, and (4) your rights under Illinois law.`;
  y = addWrappedText(doc, intro, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;

  // Required Disclosure: AI Systems (IDHR Draft Rules mandate product name, developer, vendor)
  y = addSectionHeader(doc, "AI Systems Used by " + data.company.name, y);

  data.aiSystems.forEach((sys, idx) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(BODY_SIZE);
    y = addWrappedText(
      doc,
      `${idx + 1}. ${sys.name}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");

    // Developer/Vendor (recommended best practice based on 775 ILCS 5/2-102(L) statutory text)
    y = addWrappedText(
      doc,
      `Developer/Vendor: ${sys.vendor || "Internal system"}`,
      MARGIN + 5,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );

    // Purpose and data categories (recommended best practice based on 775 ILCS 5/2-102(L) statutory text)
    if (sys.description) {
      y = addWrappedText(
        doc,
        `Purpose: ${sys.description}`,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }

    // Employment decisions influenced (recommended best practice based on 775 ILCS 5/2-102(L) statutory text)
    if (sys.decisions.length > 0) {
      const decText =
        "Employment decisions influenced or facilitated: " +
        sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ");
      y = addWrappedText(
        doc,
        decText,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }

    // Categories of data processed (recommended best practice based on 775 ILCS 5/2-102(L) statutory text)
    if (data.dataInputs.length > 0) {
      const dataText =
        "Categories of personal/employee data processed: " +
        data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ");
      y = addWrappedText(
        doc,
        dataText,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    }
    y += 4;
  });

  // Job positions where AI is used (recommended best practice based on 775 ILCS 5/2-102(L) statutory text)
  y = addSectionHeader(doc, "Positions Where AI Is Used", y);
  y = addWrappedText(
    doc,
    `AI systems listed above are used in connection with ${data.aiSystems
      .flatMap((s) => s.decisions)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((d) => DECISION_LABELS[d] || d)
      .join(", ")
      .toLowerCase() || "employment"} decisions across applicable positions at ${data.company.name}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // How AI outputs are used
  y = addSectionHeader(doc, "How AI Outputs Are Used", y);
  const roleDesc = ROLE_LABELS[data.oversight.aiRole] || "Not specified";
  y = addWrappedText(
    doc,
    `Decision process: ${roleDesc}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `Human oversight: All AI-influenced decisions are overseen by ${data.oversight.oversightRole || "[Designated Oversight Role]"}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Anti-discrimination statement — obligation from 775 ILCS 5/2-102(L)(1)
  y = addSectionHeader(doc, "Non-Discrimination Statement", y);
  y = addWrappedText(
    doc,
    "Per 775 ILCS 5/2-102(L)(1), it is a civil rights violation:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  doc.setFont("helvetica", "italic");
  y = addWrappedText(
    doc,
    '"[F]or an employer to use artificial intelligence that has the effect of subjecting employees to discrimination on the basis of protected classes under this Article or to use zip codes as a proxy for protected classes under this Article."',
    MARGIN + 5,
    y,
    CONTENT_WIDTH - 10,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y += 4;
  y = addWrappedText(
    doc,
    `${data.company.name} is committed to ensuring that its use of AI in employment decisions does not have the effect of subjecting employees to discrimination on the basis of any protected class under the Illinois Human Rights Act, and does not use zip codes as a proxy for protected classes.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Reasonable accommodation rights (existing IHRA obligations)
  y = addSectionHeader(doc, "Reasonable Accommodation", y);
  y = addWrappedText(
    doc,
    `Consistent with existing IHRA reasonable accommodation obligations (disability, pregnancy, religion), you may request a reasonable accommodation regarding AI-assisted employment processes. To request an accommodation, contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `${data.contact.name}, ${data.contact.title || ""}`,
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

  // Rights under Illinois law
  y = addSectionHeader(doc, "Your Rights Under Illinois Law", y);
  const rights = [
    "You have the right to be notified when AI is used to influence or facilitate employment decisions that affect you.",
    "You have the right to be free from discriminatory effects of AI in employment decisions, including discrimination through the use of zip codes as proxies for protected classes.",
    "Consistent with existing IHRA reasonable accommodation obligations (disability, pregnancy, religion), you may request a reasonable accommodation regarding AI-assisted employment processes.",
    "You may file a charge of discrimination with the Illinois Department of Human Rights (IDHR) if you believe AI has been used in a manner that has the effect of subjecting you to discrimination. (775 ILCS 5/7A-102)",
    "You may also pursue a civil action under the Illinois Human Rights Act. Remedies in court may include actual damages, back pay, and attorneys' fees. (775 ILCS 5/8A-104) Separately, the Illinois Human Rights Commission may impose civil penalties against employers found in violation — IDHR investigates charges, the Commission imposes penalties. (P.A. 104-0425; 775 ILCS 5/8A-104(K))",
  ];
  rights.forEach((right) => {
    y = addWrappedText(
      doc,
      "  - " + right,
      MARGIN,
      y,
      CONTENT_WIDTH - 5,
      LINE_HEIGHT
    );
    y += 2;
  });

  // Contact information
  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Contact Information", y);
  y = addWrappedText(
    doc,
    `For questions about ${data.company.name}'s use of AI in employment decisions, contact:`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    `${data.contact.name}`,
    MARGIN + 5,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  if (data.contact.title)
    y = addWrappedText(
      doc,
      data.contact.title,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  if (data.contact.email)
    y = addWrappedText(
      doc,
      data.contact.email,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  if (data.contact.phone)
    y = addWrappedText(
      doc,
      data.contact.phone,
      MARGIN + 5,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );

  // Notice schedule
  y += LINE_HEIGHT;
  y = addSectionHeader(doc, "Notice Schedule", y);
  y = addWrappedText(
    doc,
    "This notice is provided pursuant to 775 ILCS 5/2-102(L)(2) and based on 775 ILCS 5/2-102(L)(2) statutory requirements and recommended best practices. IDHR implementing rules are in development but have not been published. It will be updated and reissued:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addWrappedText(
    doc,
    "  - Annually to all current employees",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "  - Within 30 days of adopting a new or substantially updated AI system",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    "  - In all job postings for prospective employees",
    MARGIN,
    y,
    CONTENT_WIDTH - 5,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y += LINE_HEIGHT;
  y = addWrappedText(doc, `Sincerely,`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  y += LINE_HEIGHT;
  y = addWrappedText(
    doc,
    data.company.name,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y = addWrappedText(
    doc,
    data.generatedDate,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  addDisclaimer(doc);
  return doc;
}
