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
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 3: Security Policies for AI Systems (45 CFR Part 164, Subpart C)
// ============================================================
export function generateSecurityPolicies(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Security Policies and Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes security policies and procedures for ${data.company.name}'s AI systems that process electronic protected health information (ePHI), as required by the HIPAA Security Rule (45 CFR Part 164, Subpart C). Covered entities and business associates must implement reasonable and appropriate administrative, physical, and technical safeguards to protect ePHI. (45 CFR \u00A7 164.306)`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Policy 1: Administrative Safeguards
  y = addSectionHeader(doc, "Policy 1: Administrative Safeguards for AI Systems (45 CFR \u00A7 164.308)", y);

  const adminPolicies: { title: string; citation: string; requirement: string }[] = [
    {
      title: "Security Management Process",
      citation: "45 CFR \u00A7 164.308(a)(1)",
      requirement: "A risk analysis of AI systems processing ePHI must be conducted annually and whenever AI systems undergo material changes. Risk management measures must be implemented to reduce identified risks to reasonable and appropriate levels.",
    },
    {
      title: "Assigned Security Responsibility",
      citation: "45 CFR \u00A7 164.308(a)(2)",
      requirement: "A Security Officer is designated with responsibility for HIPAA security compliance for all AI systems. The Security Officer must approve all new AI systems processing ePHI before deployment.",
    },
    {
      title: "Workforce Security",
      citation: "45 CFR \u00A7 164.308(a)(3)",
      requirement: "Access to AI systems processing ePHI is limited to workforce members whose job functions require such access. Access authorization is reviewed when workforce members change roles or leave the organization.",
    },
    {
      title: "Information Access Management",
      citation: "45 CFR \u00A7 164.308(a)(4)",
      requirement: "Access to ePHI via AI systems is based on minimum necessary principles (45 CFR \u00A7 164.502(b)). Role-based access controls restrict AI system queries to the PHI fields required for each authorized function.",
    },
    {
      title: "Security Awareness and Training",
      citation: "45 CFR \u00A7 164.308(a)(5)",
      requirement: "Workforce members who use or oversee AI systems processing ePHI must complete HIPAA security training addressing AI-specific risks, including prompt injection, model outputs containing PHI, and secure API usage.",
    },
    {
      title: "Security Incident Procedures",
      citation: "45 CFR \u00A7 164.308(a)(6)",
      requirement: "Identified security incidents involving AI systems and ePHI must be reported to the Security Officer within 24 hours. Incidents are documented, investigated, and mitigated. Breach determination is made per 45 CFR \u00A7 164.402.",
    },
    {
      title: "Contingency Plan",
      citation: "45 CFR \u00A7 164.308(a)(7)",
      requirement: "A contingency plan addresses AI system failure affecting availability of ePHI. Data backup, disaster recovery, and emergency access procedures ensure continued access to critical PHI if AI systems are unavailable.",
    },
    {
      title: "Business Associate Contracts",
      citation: "45 CFR \u00A7 164.308(b)(1)",
      requirement: "A signed BAA is required with every AI vendor that creates, receives, maintains, or transmits ePHI. BAA status is reviewed annually. AI systems without executed BAAs are not permitted to process ePHI.",
    },
  ];

  adminPolicies.forEach((policy, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `1.${idx + 1}  ${policy.title} (${policy.citation})`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, policy.requirement, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y = addFormTextField(doc, `admin_owner_${idx}`, "Policy Owner:", y, { width: 100 });
    y += 4;
  });

  // Policy 2: Physical Safeguards
  y = addSectionHeader(doc, "Policy 2: Physical Safeguards for AI Systems (45 CFR \u00A7 164.310)", y);
  const physicalPolicies = [
    { title: "Facility Access Controls", citation: "45 CFR \u00A7 164.310(a)(1)", requirement: "Server rooms, data centers, and other facilities housing AI systems that process ePHI are secured with access controls limiting entry to authorized personnel." },
    { title: "Workstation Use", citation: "45 CFR \u00A7 164.310(b)", requirement: "Workstations used to access AI systems processing ePHI must be positioned to minimize unauthorized viewing and must have screen locks activated after no more than 5 minutes of inactivity." },
    { title: "Device and Media Controls", citation: "45 CFR \u00A7 164.310(d)(1)", requirement: "Policies govern receipt, removal, and disposal of hardware and electronic media containing ePHI processed by AI systems. Disposal includes NIST-compliant data destruction." },
  ];
  physicalPolicies.forEach((policy, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `2.${idx + 1}  ${policy.title} (${policy.citation})`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, policy.requirement, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 4;
  });

  // Policy 3: Technical Safeguards
  y = addSectionHeader(doc, "Policy 3: Technical Safeguards for AI Systems (45 CFR \u00A7 164.312)", y);
  const techPolicies = [
    { title: "Access Control", citation: "45 CFR \u00A7 164.312(a)(1)", requirement: "Unique user identification (45 CFR \u00A7 164.312(a)(2)(i)) is required for all workforce members accessing ePHI via AI systems. Emergency access procedures (45 CFR \u00A7 164.312(a)(2)(ii)) maintain access when AI systems are unavailable. Automatic logoff (45 CFR \u00A7 164.312(a)(2)(iii)) terminates sessions after a period of inactivity." },
    { title: "Audit Controls", citation: "45 CFR \u00A7 164.312(b)", requirement: "Hardware, software, and procedural mechanisms record and examine activity in information systems that contain or use ePHI, including all AI system queries, outputs, and PHI access events. Audit logs are retained for 6 years per 45 CFR \u00A7 164.530(j)." },
    { title: "Integrity Controls", citation: "45 CFR \u00A7 164.312(c)(1)", requirement: "Electronic measures verify that ePHI processed by AI systems is not improperly altered or destroyed. Checksums and integrity verification are applied to PHI inputs and outputs." },
    { title: "Transmission Security", citation: "45 CFR \u00A7 164.312(e)(1)", requirement: "Technical security measures guard against unauthorized access to ePHI transmitted over electronic communications networks to and from AI systems. Encryption (45 CFR \u00A7 164.312(e)(2)(ii)) is implemented for all ePHI in transit." },
  ];
  techPolicies.forEach((policy, idx) => {
    if (y > 240) { doc.addPage(); y = MARGIN; }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, `3.${idx + 1}  ${policy.title} (${policy.citation})`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, policy.requirement, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 4;
  });

  // Review Schedule
  y = addSectionHeader(doc, "Policy Review and Maintenance", y);
  const freq = REVIEW_LABELS[data.oversight.reviewFrequency] || "annually";
  y = addWrappedText(
    doc,
    `These policies must be reviewed and updated as needed (45 CFR \u00A7 164.316(b)(2)(iii)). Current review schedule: ${freq}. Policies must also be reviewed when AI systems, personnel, or regulatory requirements change.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const reviewItems = [
    "All policies reviewed by Security Officer (45 CFR \u00A7 164.308(a)(2))",
    "Policies reflect current AI system inventory",
    "BAA status verified for all AI vendors",
    "Risk assessment findings incorporated",
    "Legal counsel review completed",
  ];
  let cbIdx = 0;
  reviewItems.forEach((item) => {
    y = addFormCheckbox(doc, `review_${cbIdx}`, item, y);
    cbIdx++;
  });

  y = addFormTextField(doc, "policy_reviewed_by", "Policies Reviewed and Approved by:", y, { width: 100 });
  y = addFormTextField(doc, "policy_title", "Title:", y, { width: 100 });
  y = addFormTextField(doc, "policy_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "policy_next", "Next Review Date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
