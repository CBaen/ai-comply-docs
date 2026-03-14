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
  addFormCheckbox,
  addDisclaimer,
  addSignatureBlock,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: AI Incident Response Plan
// Aligned with NIST AI RMF Manage function, California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18),
// and EU AI Act serious incident reporting requirements
// ============================================================
export function generateAIIncidentResponsePlan(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Incident Response Plan", data);
  y = addTopDisclaimer(doc, y);

  // ── 1. Plan Overview & Purpose ────────────────────────────
  y = addSectionHeader(doc, "1. Plan Overview & Purpose", y);
  y = addWrappedText(
    doc,
    data.company.name +
      ' ("Company") adopts this AI Incident Response Plan to establish a structured, ' +
      "repeatable process for detecting, classifying, containing, investigating, and " +
      "recovering from incidents involving artificial intelligence systems. This Plan " +
      "aligns with the NIST AI Risk Management Framework (AI RMF 1.0) Manage function, " +
      "California Transparency in Frontier AI Development Act (SB 53) (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) " +
      "incident reporting obligations (note: SB 53 applies only to large frontier AI developers meeting specific " +
      "compute and revenue thresholds — verify applicability with legal counsel), and EU AI Act serious incident reporting requirements " +
      "(Article 73). It is a living document and must be reviewed annually and updated " +
      "after every Severity 1 or Severity 2 incident.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "irp_plan_version", "Plan Version:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "irp_effective_date", "Effective Date:", y, {
    width: 80,
  });
  y = addFormTextField(doc, "irp_owner", "Plan Owner (Name & Title):", y);
  y += LINE_HEIGHT;

  // ── 2. Scope ──────────────────────────────────────────────
  y = addSectionHeader(doc, "2. Scope", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "2.1 AI Systems Covered",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "This Plan applies to all AI and automated decision-making systems deployed by the " +
      "Company, including but not limited to:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  if (data.aiSystems && data.aiSystems.length > 0) {
    data.aiSystems.forEach(function (sys, idx) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      y = addWrappedText(
        doc,
        "\u2022  System " +
          (idx + 1) +
          ": " +
          sys.name +
          (sys.vendor ? " (Vendor: " + sys.vendor + ")" : "") +
          (sys.description ? " — " + sys.description : ""),
        MARGIN + 3,
        y,
        CONTENT_WIDTH - 3,
        LINE_HEIGHT
      );
    });
  } else {
    y = addFormTextField(
      doc,
      "irp_systems_covered",
      "List all AI systems covered by this Plan:",
      y,
      { multiline: true, lines: 4 }
    );
  }
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "2.2 Types of Incidents Covered",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  const incidentTypes = [
    "Safety incidents — AI output causes or risks physical, psychological, or financial harm",
    "Discrimination incidents — AI produces biased or discriminatory outputs affecting protected classes",
    "Data/privacy incidents — AI system involved in unauthorized data access, exposure, or breach",
    "Security incidents — AI system compromised, manipulated, or subject to adversarial attack",
    "Operational incidents — AI system failure, degraded performance, or unauthorized deployment",
    "Regulatory incidents — AI system behavior triggers or risks triggering regulatory violation",
    "Reputational incidents — AI system behavior causes or risks significant reputational harm",
  ];
  incidentTypes.forEach(function (t) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "\u2022  " + t,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // ── 3. Roles & Responsibilities ───────────────────────────
  y = addSectionHeader(doc, "3. Roles & Responsibilities", y);
  y = addWrappedText(
    doc,
    "The following personnel are designated as the AI Incident Response Team (IRT). " +
      "All team members must be trained on this Plan annually.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const roles = [
    {
      title: "Incident Commander",
      desc: "Overall accountability for incident response. Declares severity level, activates IRT, approves external communications, and authorizes regulatory notifications.",
    },
    {
      title: "Technical Lead",
      desc: "Leads technical investigation and containment. Preserves evidence, assesses system behavior, directs remediation, and restores operations.",
    },
    {
      title: "Legal Counsel",
      desc: "Advises on regulatory obligations, privilege, and litigation holds. Approves external notifications. Manages regulatory reporting timelines.",
    },
    {
      title: "Communications Lead",
      desc: "Manages internal and external communications. Coordinates press, customer, and regulator messaging. Maintains communications log.",
    },
  ];

  roles.forEach(function (role, idx) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      role.title + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, role.desc, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y = addFormTextField(
      doc,
      "irp_role_name_" + idx,
      "Name:",
      y,
      { width: 90, x: MARGIN + 3 }
    );
    y = addFormTextField(
      doc,
      "irp_role_contact_" + idx,
      "Contact (phone/email):",
      y,
      { x: MARGIN + 3 }
    );
    y = addFormTextField(
      doc,
      "irp_role_backup_" + idx,
      "Backup / Alternate:",
      y,
      { x: MARGIN + 3 }
    );
    y += 2;
  });

  // ── 4. Incident Classification ────────────────────────────
  y = addSectionHeader(doc, "4. Incident Classification", y);
  y = addWrappedText(
    doc,
    "All AI incidents are classified into one of four severity levels. The highest " +
      "individual impact rating across all dimensions determines overall severity. " +
      "Use the Classification Matrix (companion document) for detailed guidance.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const severities = [
    {
      level: "Severity 1 (Critical)",
      triggers: [
        "AI system is actively causing physical, psychological, or financial harm to individuals",
        "Safety risk requiring immediate shutdown to prevent harm",
        "Confirmed regulatory violation with enforcement exposure",
        "Mass data breach involving AI system (1,000+ individuals)",
        "EU AI Act Article 3(49) 'serious incident' threshold met",
      ],
      response: "Immediate — IRT activated within 1 hour",
    },
    {
      level: "Severity 2 (High)",
      triggers: [
        "Significant algorithmic bias or discrimination confirmed affecting a protected class",
        "Data breach via AI system (fewer than 1,000 individuals or uncertain scope)",
        "Unauthorized deployment of high-risk AI system",
        "AI system manipulation or adversarial attack detected",
        "Incident likely to trigger SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) incident reporting requirements (verify applicability and current reporting timeline with legal counsel)",
      ],
      response: "Urgent — IRT notified within 4 hours",
    },
    {
      level: "Severity 3 (Medium)",
      triggers: [
        "AI output quality degradation materially affecting users",
        "Potential bias detected (unconfirmed, under investigation)",
        "Minor policy violation — documented but no immediate harm",
        "Near-miss: conditions present for higher severity without actual harm",
        "User complaints indicating systemic AI output problems",
      ],
      response: "Standard — IRT notified within 24 hours",
    },
    {
      level: "Severity 4 (Low)",
      triggers: [
        "False alarm — investigated and confirmed no incident",
        "Minor anomaly with no user impact",
        "Isolated user complaint, no systemic pattern identified",
        "Documentation or logging gaps (no operational impact)",
      ],
      response: "Routine — logged and reviewed within 5 business days",
    },
  ];

  severities.forEach(function (sev) {
    if (y > 245) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      sev.level + " \u2014 " + sev.response + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    sev.triggers.forEach(function (t) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      y = addWrappedText(
        doc,
        "\u2022  " + t,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
    });
    y += LINE_HEIGHT;
  });

  // ── 5. Detection & Reporting ──────────────────────────────
  y = addSectionHeader(doc, "5. Detection & Reporting", y);
  y = addWrappedText(
    doc,
    "AI incidents may be identified through any of the following channels. All " +
      "personnel who identify a potential AI incident must report it to the Incident " +
      "Commander or designated intake contact within 2 hours of identification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const detectionChannels = [
    "Automated monitoring — system alerts, anomaly detection, performance dashboards",
    "User reports — customer complaints, employee escalations, feedback channels",
    "Audit findings — internal or third-party AI audits, bias testing results",
    "External reports — regulator inquiries, media coverage, researcher disclosures",
    "Vendor notifications — developer/vendor alerts about known defects or incidents",
    "Routine review — periodic performance reviews identifying degradation or bias",
  ];
  detectionChannels.forEach(function (ch) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "\u2022  " + ch,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "irp_intake_contact", "Incident Intake Contact (Name & Contact Info):", y);
  y = addFormTextField(doc, "irp_intake_channel", "Incident Reporting Channel (e.g., email, hotline, ticketing system):", y);
  y += LINE_HEIGHT;

  // ── 6. Response Procedures by Severity ────────────────────
  y = addSectionHeader(doc, "6. Response Procedures by Severity", y);

  // Severity 1 & 2 (similar procedures, different timelines)
  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "6.1 Severity 1 (Critical) & Severity 2 (High) Response:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");

  const highSeveritySteps = [
    "Step 1 — Immediate Containment (Sev 1: within 1 hour; Sev 2: within 4 hours): " +
      "Incident Commander declares severity. Technical Lead disables or isolates the affected " +
      "AI system. Preserve all logs, outputs, and system state as evidence before any " +
      "remediation. Issue internal hold notice.",
    "Step 2 — IRT Activation: Notify all IRT members. Legal Counsel places litigation hold. " +
      "Communications Lead prepares holding statement. Begin incident log.",
    "Step 3 — Assessment & Investigation: Technical Lead leads root cause analysis. " +
      "Document: affected system, affected individuals/records, nature of harm, contributing " +
      "factors. Legal Counsel assesses regulatory notification obligations and timelines.",
    "Step 4 — Regulatory Timeline Assessment: Legal Counsel confirms whether SB 53 " +
      "(Cal. Bus. & Prof. Code §§ 22757.10-22757.18) incident reporting requirements are triggered " +
      "(applies only to large frontier AI developers meeting specific compute and revenue thresholds — " +
      "verify applicability and current reporting timeline with legal counsel). Assess EU AI Act Article 73 serious " +
      "incident reporting obligation. Identify state AG notification requirements.",
    "Step 5 — Internal Communication: Brief executive leadership within 24 hours. " +
      "Document all communications. Maintain incident log with timestamps.",
    "Step 6 — External Communication: Communications Lead, with Legal approval, notifies " +
      "affected individuals and relevant regulators per confirmed obligations and timelines. " +
      "Coordinate with vendors if applicable.",
    "Step 7 — Remediation: Technical Lead implements corrective actions. Document all " +
      "changes. Test remediated system before restoration.",
    "Step 8 — Recovery & Restoration: Incident Commander authorizes system restoration. " +
      "Technical Lead confirms remediation is effective. Establish post-restoration monitoring.",
    "Step 9 — Post-Incident Review: Complete Post-Incident Review (companion document) " +
      "within 30 days of incident closure.",
  ];

  highSeveritySteps.forEach(function (step) {
    if (y > 260) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      step,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "6.2 Severity 3 (Medium) Response:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");

  const mediumSteps = [
    "Step 1 — Intake & Logging: Document incident within 24 hours. Assign investigating lead.",
    "Step 2 — Assessment: Investigate root cause and scope. Determine if severity should be upgraded.",
    "Step 3 — Containment: Implement operational controls to prevent harm escalation. " +
      "Preserve evidence if litigation or regulation is foreseeable.",
    "Step 4 — Remediation: Implement fix. Document actions and outcomes.",
    "Step 5 — Communication: Notify affected internal stakeholders. Assess whether external " +
      "notification is warranted.",
    "Step 6 — Post-Incident Notes: Document lessons learned. Update monitoring protocols.",
  ];

  mediumSteps.forEach(function (step) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      step,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  doc.setFont("helvetica", "bold");
  y = addWrappedText(
    doc,
    "6.3 Severity 4 (Low) Response:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  doc.setFont("helvetica", "normal");
  y = addWrappedText(
    doc,
    "Log the event in the incident register. Investigate and confirm no harm occurred. " +
      "Close with documentation within 5 business days. No external communication required " +
      "unless facts change and severity is upgraded.",
    MARGIN + 3,
    y,
    CONTENT_WIDTH - 3,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── 7. Regulatory Reporting Requirements ──────────────────
  y = addSectionHeader(doc, "7. Regulatory Reporting Requirements", y);
  y = addWrappedText(
    doc,
    "Legal Counsel is responsible for tracking and meeting all regulatory reporting " +
      "deadlines. The following requirements apply as of the effective date of this Plan:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const regReqs = [
    {
      title: "California SB 53 (Cal. Bus. & Prof. Code §§ 22757.10-22757.18) — Incident Reporting Requirements:",
      body:
        "The California Transparency in Frontier AI Development Act (SB 53) establishes " +
        "incident reporting requirements for qualifying AI incidents. IMPORTANT: SB 53 applies " +
        "only to large frontier AI developers meeting specific compute and revenue thresholds — " +
        "verify applicability with legal counsel. Upon identification of an incident that may " +
        "trigger SB 53 reporting, Legal Counsel must immediately assess applicability and " +
        "initiate the notification process if applicable. Verify current reporting timeline " +
        "and recipient agency with legal counsel.",
    },
    {
      title: "EU AI Act — Serious Incident Reporting (Article 73):",
      body:
        "Providers of high-risk AI systems in the EU market must report serious incidents " +
        "(as defined in Article 3(49)) to the relevant national market surveillance authority. " +
        "Initial notification: as soon as possible, not later than 15 days after becoming aware " +
        "of the serious incident. Deaths or serious adverse health impacts: notify without undue delay.",
    },
    {
      title: "State Attorney General Notification:",
      body:
        "Certain state AI laws require notification to the state Attorney General upon " +
        "discovery of algorithmic discrimination or qualifying AI incidents. Legal Counsel " +
        "must assess applicable state law requirements, including Colorado C.R.S. § 6-1-1703(7) " +
        "(90-day self-reporting window for discovered algorithmic discrimination). Document all " +
        "notifications with date, agency, and reference number.",
    },
    {
      title: "Other Regulatory Obligations:",
      body:
        "Depending on industry and data types, additional reporting obligations may apply " +
        "(e.g., HIPAA breach notification, GLBA, state data breach laws). Legal Counsel " +
        "must assess all applicable obligations for each incident.",
    },
  ];

  regReqs.forEach(function (req) {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      req.title,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, req.body, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── 8. Post-Incident Review Process ───────────────────────
  y = addSectionHeader(doc, "8. Post-Incident Review Process", y);
  y = addWrappedText(
    doc,
    "A Post-Incident Review must be completed for all Severity 1 and Severity 2 incidents " +
      "within 30 days of incident closure. Severity 3 incidents require a review summary " +
      "within 60 days. Use the Post-Incident Review Checklist (companion document). " +
      "All reviews must be documented and retained for a minimum of 5 years.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const reviewSteps = [
    "Convene review meeting with relevant IRT members and stakeholders",
    "Review the incident timeline from detection through closure",
    "Identify what went well and what could be improved",
    "Confirm root cause and assess for systemic issues",
    "Assign corrective actions with owners and deadlines",
    "Determine if policy, procedure, or training updates are needed",
    "Update incident register and close review",
  ];
  reviewSteps.forEach(function (step) {
    if (y > 270) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "\u2022  " + step,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
  });
  y += LINE_HEIGHT;

  // ── 9. Plan Testing & Update Schedule ────────────────────
  y = addSectionHeader(doc, "9. Plan Testing & Update Schedule", y);
  y = addWrappedText(
    doc,
    "This Plan must be tested and updated on the following schedule to ensure it remains " +
      "effective and current:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const testingSchedule = [
    "Annual tabletop exercise: Conduct a simulated AI incident scenario annually with all " +
      "IRT members. Document outcomes and incorporate lessons learned.",
    "After every Severity 1 or Severity 2 incident: Update this Plan within 60 days " +
      "of incident closure, incorporating post-incident review findings.",
    "After regulatory changes: Update within 90 days of any material change to applicable " +
      "AI incident reporting regulations.",
    "After significant AI system changes: Review scope and procedures when new high-risk " +
      "AI systems are deployed or existing systems are materially modified.",
  ];
  testingSchedule.forEach(function (item) {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(
      doc,
      "\u2022  " + item,
      MARGIN + 3,
      y,
      CONTENT_WIDTH - 3,
      LINE_HEIGHT
    );
    y += 2;
  });
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "irp_last_tabletop", "Date of Last Tabletop Exercise:", y);
  y = addFormTextField(doc, "irp_next_tabletop", "Date of Next Scheduled Tabletop Exercise:", y);
  y = addFormTextField(doc, "irp_last_plan_review", "Date of Last Plan Review:", y);
  y = addFormTextField(doc, "irp_next_plan_review", "Date of Next Scheduled Plan Review:", y);
  y += LINE_HEIGHT;

  // ── Appendix: Contact List ────────────────────────────────
  y = addSectionHeader(doc, "Appendix A: Emergency Contact List", y);
  y = addWrappedText(
    doc,
    "All contacts listed below should be reachable 24/7 during a Severity 1 incident. " +
      "Update this list whenever personnel or contact information changes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const contacts = [
    "Incident Commander",
    "Incident Commander Backup",
    "Technical Lead",
    "Technical Lead Backup",
    "Legal Counsel (Internal)",
    "Outside Counsel (AI/Privacy)",
    "Communications Lead",
    "Executive Sponsor / CEO",
    "AI Vendor Emergency Contact",
    "Cyber Insurance Carrier",
    "Regulatory Counsel (State AG liaison)",
  ];
  contacts.forEach(function (contact, idx) {
    if (y > 260) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      contact + ":",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    doc.setFont("helvetica", "normal");
    y = addFormTextField(
      doc,
      "irp_contact_name_" + idx,
      "Name:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y = addFormTextField(
      doc,
      "irp_contact_phone_" + idx,
      "Phone / Email:",
      y,
      { x: MARGIN + 3, width: CONTENT_WIDTH - 3 }
    );
    y += 2;
  });

  if (y > 240) { doc.addPage(); y = 20; }
  y = addSignatureBlock(doc, "inc_plan", y);

  addDisclaimer(doc);
  return doc;
}
