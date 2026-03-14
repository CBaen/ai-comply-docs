import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Breach Notification Procedures (45 CFR Part 164, Subpart D)
// ============================================================
export function generateBreachNotification(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "HIPAA Breach Notification Procedures — AI Systems", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `These procedures establish ${data.company.name}'s breach notification requirements when AI systems cause or contribute to a breach of unsecured PHI, as required by the HIPAA Breach Notification Rule (45 CFR Part 164, Subpart D, \u00A7\u00A7 164.400\u2013164.414). A "breach" is the acquisition, access, use, or disclosure of PHI in a manner not permitted by the Privacy Rule that compromises the security or privacy of the PHI. (45 CFR \u00A7 164.402)`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Breach Discovery and Assessment
  y = addSectionHeader(doc, "1. AI-Related Breach Discovery (45 CFR \u00A7 164.404(a)(2))", y);
  y = addWrappedText(
    doc,
    "A breach is treated as discovered when the covered entity or business associate knew or should have known of the breach (45 CFR \u00A7 164.404(a)(2)). For AI systems, breach discovery events include:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const discoveryEvents = [
    "AI system audit log reveals unauthorized PHI access or export",
    "AI model output contains PHI visible to unauthorized recipients",
    "AI vendor notifies covered entity of security incident involving ePHI",
    "AI system logs show PHI transmission to unintended endpoint",
    "AI training or fine-tuning process inadvertently incorporates PHI without authorization",
    "Workforce member reports AI system generated PHI-containing output shared externally",
    "Security monitoring detects anomalous AI system query patterns suggesting unauthorized access",
  ];
  let cbIdx = 0;
  discoveryEvents.forEach((event) => {
    y = addFormCheckbox(doc, `discovery_${cbIdx}`, event, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 2: Breach Determination — Four-Factor Test
  y = addSectionHeader(doc, "2. Breach Determination — Four-Factor Harm Assessment (45 CFR \u00A7 164.402)", y);
  y = addWrappedText(
    doc,
    "An impermissible use or disclosure is presumed to be a breach unless the covered entity demonstrates a low probability that PHI was compromised based on a four-factor assessment. Document each factor:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const factors = [
    {
      num: "Factor 1",
      title: "Nature and extent of PHI involved",
      detail: "Types of identifiers involved (name, SSN, diagnosis codes, financial info); likelihood that PHI could be re-identified if de-identified.",
    },
    {
      num: "Factor 2",
      title: "Who used the PHI or to whom it was disclosed",
      detail: "Was the unauthorized recipient another covered entity? A researcher? An unknown party? Potential for re-identification or misuse.",
    },
    {
      num: "Factor 3",
      title: "Whether PHI was actually acquired or viewed",
      detail: "For AI-related incidents: was the PHI returned unused? Was the AI output actually delivered to an unauthorized recipient? Were logs reviewed to confirm no access?",
    },
    {
      num: "Factor 4",
      title: "Extent to which the risk has been mitigated",
      detail: "Has the covered entity obtained satisfactory assurances (e.g., signed confidentiality agreements) from the unauthorized recipient? Has the AI system access been revoked?",
    },
  ];

  factors.forEach((factor, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `${factor.num}: ${factor.title}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, factor.detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, `factor_${idx}_finding`, "Finding:", y, { multiline: true, lines: 2 });
    y += 4;
  });

  y = addFormTextField(doc, "breach_determination", "Breach Determination (YES — notify / NO — document low probability):", y, { width: 120 });
  y += LINE_HEIGHT;

  // Section 3: Notification Timelines
  y = addSectionHeader(doc, "3. Notification Timelines (45 CFR \u00A7\u00A7 164.404\u2013164.408)", y);
  const timelines = [
    {
      title: "Individual Notification (45 CFR \u00A7 164.404)",
      detail: "Notice to affected individuals required without unreasonable delay and no later than 60 calendar days after discovery of breach. Written first-class mail; email if individual agreed. Notice must include: description of breach, PHI types involved, steps to protect themselves, steps covered entity is taking, contact information.",
    },
    {
      title: "Media Notification (45 CFR \u00A7 164.406)",
      detail: "If breach affects more than 500 residents of a state or jurisdiction, prominent media outlet notification is required without unreasonable delay and no later than 60 calendar days after discovery.",
    },
    {
      title: "HHS Notification (45 CFR \u00A7 164.408)",
      detail: "HHS must be notified of all breaches. For breaches of 500 or more individuals: notification without unreasonable delay and no later than 60 calendar days after discovery, via HHS web portal. For breaches of fewer than 500: maintain log and report to HHS annually no later than 60 days after the end of the calendar year.",
    },
    {
      title: "Business Associate Notification to Covered Entity (45 CFR \u00A7 164.410)",
      detail: "If breach occurs at AI vendor (business associate): BA must notify covered entity without unreasonable delay and no later than 60 calendar days after discovery. The 60-day clock for covered entity's notification to individuals begins upon covered entity's discovery, not BA notification.",
    },
  ];

  timelines.forEach((tl, idx) => {
    if (y > 230) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `3.${idx + 1}  ${tl.title}`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, tl.detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 6;
  });

  // Section 4: Breach Documentation
  y = addSectionHeader(doc, "4. Breach Incident Documentation (45 CFR \u00A7 164.316(b)(1))", y);
  y = addFormTextField(doc, "incident_date", "Date of Breach / Discovery:", y, { width: 80 });
  y = addFormTextField(doc, "incident_ai_system", "AI System Involved:", y, { width: 140 });
  y = addFormTextField(doc, "incident_description", "Description of Breach:", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "individuals_affected", "Number of Individuals Affected (or estimate):", y, { width: 80 });
  y = addFormTextField(doc, "phi_types", "Types of PHI Involved:", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "remediation_steps", "Remediation Steps Taken:", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "notification_dates", "Notification Dates (individuals / HHS / media):", y, { multiline: true, lines: 2 });

  // Sign-off
  y = addSectionHeader(doc, "5. Breach Response Sign-off", y);
  y = addFormTextField(doc, "breach_officer", "Privacy/Security Officer:", y, { width: 100 });
  y = addFormTextField(doc, "breach_officer_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "breach_counsel", "Legal Counsel Consulted (Name/Firm):", y, { width: 120 });
  y = addFormTextField(doc, "breach_counsel_date", "Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
