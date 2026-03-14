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
// DOCUMENT 6: AI Compliance Officer Role Description
// ============================================================
export function generateComplianceOfficerRole(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Compliance Officer — Role Description", data);
  y = addTopDisclaimer(doc, y);

  // ── Position Overview ──────────────────────────────────────
  y = addSectionHeader(doc, "1. Position Overview", y);
  y = addWrappedText(
    doc,
    "The AI Compliance Officer is the senior individual accountable for " +
      data.company.name + "'s AI governance program. The AI Compliance Officer serves " +
      "as the primary liaison between AI-using business units and the AI Steering " +
      "Committee, manages the day-to-day operations of the governance program, and " +
      "ensures that AI systems are deployed and operated in compliance with the " +
      "Organization's AI Governance Policy, Ethics Principles, and applicable law.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "cor_incumbent", "Incumbent (Name & Title):", y);
  y = addFormTextField(doc, "cor_reports_to", "Reports To:", y);
  y = addFormTextField(doc, "cor_department", "Department:", y);
  y += LINE_HEIGHT;

  // ── Core Responsibilities ──────────────────────────────────
  y = addSectionHeader(doc, "2. Core Responsibilities", y);

  const responsibilities = [
    {
      category: "2.1 AI Governance Program Management",
      items: [
        "Manage and maintain the AI System Inventory, ensuring all AI systems are registered before deployment",
        "Coordinate and document the AI Use Case Approval process for all Tier 1 and Tier 2 systems",
        "Maintain the Organization's AI Risk Classification Matrix and update it as new system types emerge",
        "Prepare quarterly AI governance reports for the AI Steering Committee",
        "Coordinate annual review of the AI Governance Policy and Ethics Principles",
      ],
    },
    {
      category: "2.2 Risk Assessment & Monitoring",
      items: [
        "Coordinate pre-deployment bias audits and impact assessments for Tier 1 AI systems",
        "Oversee ongoing performance monitoring schedules for all deployed AI systems",
        "Review AI incident reports and escalate material incidents to the AI Steering Committee",
        "Track regulatory developments and advise the Organization on emerging AI law requirements",
        "Coordinate third-party audits and assessments when required",
      ],
    },
    {
      category: "2.3 Training & Awareness",
      items: [
        "Design and maintain AI governance training for employees, managers, and AI system owners",
        "Communicate governance requirements to business units in plain language",
        "Maintain the Organization's AI governance documentation library",
        "Onboard new AI system owners and explain their accountability obligations",
      ],
    },
    {
      category: "2.4 Legal & Regulatory Compliance",
      items: [
        "Monitor and interpret applicable AI laws and regulatory guidance",
        "Coordinate with legal counsel on AI law compliance questions",
        "Maintain required regulatory filings or disclosures related to AI systems",
        "Respond to regulatory inquiries about the Organization's AI governance program",
      ],
    },
    {
      category: "2.5 Incident Response",
      items: [
        "Serve as the first point of escalation for AI incidents reported by system owners or employees",
        "Coordinate investigation and remediation of AI incidents",
        "Maintain records of all AI incidents and their resolution",
        "Prepare incident summary reports for the AI Steering Committee",
      ],
    },
  ];

  responsibilities.forEach(({ category, items }) => {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, category, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    items.forEach((item) => {
      if (y > 265) {
        doc.addPage();
        y = MARGIN;
      }
      y = addWrappedText(doc, "\u2022  " + item, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
      y += 1;
    });
    y += LINE_HEIGHT;
  });

  // ── Qualifications ─────────────────────────────────────────
  y = addSectionHeader(doc, "3. Qualifications", y);
  const qualifications = [
    "Familiarity with the NIST AI Risk Management Framework (AI RMF 1.0) and applicable " +
      "AI laws, including state laws in the Organization's operating jurisdictions",
    "Experience in compliance, legal, risk management, or technology governance",
    "Ability to communicate technical AI concepts to non-technical audiences",
    "Strong organizational skills and ability to manage multiple concurrent compliance workstreams",
    "Judgment to identify and escalate emerging AI risks before they become incidents",
  ];
  qualifications.forEach((q) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, "\u2022  " + q, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Authority ──────────────────────────────────────────────
  y = addSectionHeader(doc, "4. Authority", y);
  const authorities = [
    "Authority to approve or deny Tier 2 AI use case requests",
    "Authority to place a Tier 1 AI system on hold pending Steering Committee review " +
      "if a material risk issue is identified",
    "Authority to request AI system documentation, testing records, and performance " +
      "data from any AI system owner",
    "Authority to engage external auditors, legal counsel, or technical experts with " +
      "Steering Committee approval",
  ];
  authorities.forEach((a) => {
    if (y > 265) {
      doc.addPage();
      y = MARGIN;
    }
    y = addWrappedText(doc, "\u2022  " + a, MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // ── Role Appointment ───────────────────────────────────────
  y = addSectionHeader(doc, "5. Appointment", y);
  y = addWrappedText(
    doc,
    "The AI Compliance Officer is appointed by the Chief Executive Officer (or equivalent) " +
      "and confirmed by the AI Steering Committee. The role may be combined with an existing " +
      "compliance, legal, or technology leadership function if the incumbent has sufficient " +
      "bandwidth and expertise to perform all core responsibilities.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "cor_appointment_date", "Date of Appointment:", y);
  y = addFormTextField(doc, "cor_appointed_by", "Appointed By (Name & Title):", y);
  y = addFormTextField(doc, "cor_next_review", "Role Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
