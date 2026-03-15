import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addSignatureBlock,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// CA Cybersecurity Audit Checklist — 17 Areas per Article 9
// Cal. Civ. Code § 1798.100 et seq. + CPPA Cybersecurity Audit Regs
// ============================================================
export function generateCybersecurityAuditChecklist(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "Cybersecurity Audit Checklist — 17 Required Areas (Article 9)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This checklist documents ${data.company.name}'s cybersecurity audit findings across the 17 required audit areas under Article 9 of the California Privacy Protection Agency (CPPA) Cybersecurity Audit regulations. Businesses that meet the thresholds must complete an annual cybersecurity audit and submit a certification to the CPPA. Each area includes a compliance status checkbox, an evidence field, and a remediation field. Verify current CPPA threshold and submission requirements at cppa.ca.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Audit Metadata
  y = addSectionHeader(doc, "Audit Metadata", y);
  y = addFormTextField(doc, "cac_audit_period", "Audit Period (start date to end date):", y, {
    width: 140,
  });
  y = addFormTextField(doc, "cac_auditor_name", "Lead Auditor Name:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "cac_auditor_firm", "Auditor Firm / Department:", y, {
    width: 140,
  });
  y = addFormTextField(doc, "cac_audit_date", "Audit Completion Date:", y, {
    width: 80,
  });
  y += LINE_HEIGHT;

  // Helper: render one audit area
  const renderArea = (
    areaNum: number,
    areaTitle: string,
    description: string,
    fieldPrefix: string,
    currentY: number
  ): number => {
    let ly = addSectionHeader(
      doc,
      `Area ${areaNum}: ${areaTitle}`,
      currentY
    );
    ly = addWrappedText(doc, description, MARGIN, ly, CONTENT_WIDTH, LINE_HEIGHT);
    ly += 2;
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_compliant`,
      "Compliant",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_noncompliant`,
      "Non-Compliant",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_partial`,
      "Partially Compliant / In Progress",
      ly
    );
    ly = addFormCheckbox(
      doc,
      `${fieldPrefix}_na`,
      "Not Applicable (document reason in evidence field)",
      ly
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_evidence`,
      "Evidence of Compliance:",
      ly,
      { multiline: true, lines: 2 }
    );
    ly = addFormTextField(
      doc,
      `${fieldPrefix}_remediation`,
      "Remediation Needed (if non-compliant or partial):",
      ly,
      { multiline: true, lines: 2 }
    );
    ly += LINE_HEIGHT;
    return ly;
  };

  // Area 1: Authentication
  y = renderArea(
    1,
    "Authentication",
    "Authentication controls including multi-factor authentication (MFA) requirements and password management policies. Covers MFA for access to systems processing personal information, password complexity and rotation requirements, and controls to prevent credential compromise.",
    "cac_area1",
    y
  );

  // Area 2: Encryption at Rest and in Transit
  y = renderArea(
    2,
    "Encryption at Rest and in Transit",
    "Encryption of personal information both at rest (stored data) and in transit (data in motion across networks). Includes use of current encryption standards, key management procedures, and encryption of personal information on mobile devices, removable media, and cloud storage.",
    "cac_area2",
    y
  );

  // Area 3: Account Management and Access Controls
  y = renderArea(
    3,
    "Account Management and Access Controls",
    "Account lifecycle management and access control practices including: least-privilege enforcement limiting access to what is necessary for job function; privileged account management (PAM) for administrative access; processes for provisioning and deprovisioning new accounts; and physical access controls to systems containing personal information.",
    "cac_area3",
    y
  );

  // Area 4: Inventory and Management
  y = renderArea(
    4,
    "Inventory and Management",
    "Inventory and management practices including: personal information (PI) inventories and data maps documenting what PI is collected, where stored, and how used; hardware and software inventories; and approval processes for new data collection or processing activities involving personal information.",
    "cac_area4",
    y
  );

  // Area 5: Secure Configuration
  y = renderArea(
    5,
    "Secure Configuration",
    "Secure configuration practices including: software and firmware updates applied on a defined schedule; cloud security configuration and hardening; data masking or pseudonymization where appropriate; patch management processes with defined remediation timelines; and change management procedures for configuration changes to systems processing personal information.",
    "cac_area5",
    y
  );

  // Area 6: Vulnerability Scans, Penetration Testing, and Disclosure Programs
  y = renderArea(
    6,
    "Vulnerability Scans, Penetration Testing, and Disclosure Programs",
    "Proactive vulnerability identification including: regular vulnerability scans of systems processing personal information; periodic penetration testing (at least annually or after significant changes); and a vulnerability disclosure program (VDP) or bug bounty program to receive external security reports.",
    "cac_area6",
    y
  );

  // Area 7: Audit-Log Management
  y = renderArea(
    7,
    "Audit-Log Management",
    "Audit logging program including: centralized log storage for systems processing personal information; defined log retention periods aligned with legal and operational requirements; and log monitoring and alerting to detect unauthorized access, anomalous activity, or security events.",
    "cac_area7",
    y
  );

  // Area 8: Network Monitoring and Defenses
  y = renderArea(
    8,
    "Network Monitoring and Defenses",
    "Network-layer monitoring and defensive controls including: bot detection mechanisms to identify and block automated threats; intrusion detection and/or prevention systems (IDS/IPS); and data loss prevention (DLP) tools to detect and prevent unauthorized exfiltration of personal information.",
    "cac_area8",
    y
  );

  // Area 9: Antivirus and Antimalware
  y = renderArea(
    9,
    "Antivirus and Antimalware",
    "Endpoint protection including antivirus and antimalware software deployed on all systems processing personal information. Includes definition update cadence, scanning frequency, coverage of servers and endpoints, and response procedures for detected threats.",
    "cac_area9",
    y
  );

  // Area 10: Network Segmentation
  y = renderArea(
    10,
    "Network Segmentation",
    "Network segmentation controls to limit lateral movement and contain potential breaches. Includes firewalls separating network segments, router and switch configurations enforcing segmentation, and isolation of systems containing sensitive personal information from general-purpose networks.",
    "cac_area10",
    y
  );

  // Area 11: Port, Service, and Protocol Controls
  y = renderArea(
    11,
    "Port, Service, and Protocol Controls",
    "Controls limiting open network ports, enabled services, and permitted protocols to only what is necessary for business operations. Includes port scanning and audits to identify unauthorized open ports, disabling unused services, and documented allowlists for permitted protocols.",
    "cac_area11",
    y
  );

  // Area 12: Cybersecurity Awareness
  y = renderArea(
    12,
    "Cybersecurity Awareness",
    "Organizational cybersecurity awareness program ensuring employees maintain current knowledge of relevant cybersecurity threats. Includes threat intelligence sharing, regular security advisories or bulletins, awareness of current attack vectors (phishing, social engineering, ransomware), and leadership-level security briefings.",
    "cac_area12",
    y
  );

  // Area 13: Cybersecurity Education and Training
  y = renderArea(
    13,
    "Cybersecurity Education and Training",
    "Formal cybersecurity education and training program for all employees with access to personal information. Includes role-based training (general staff, IT, executives), training frequency and completion tracking, phishing simulation exercises, and new-hire security onboarding.",
    "cac_area13",
    y
  );

  // Area 14: Secure Development and Coding Practices
  y = renderArea(
    14,
    "Secure Development and Coding Practices",
    "Secure software development lifecycle (SDLC) practices including secure coding standards, code review processes, static and dynamic application security testing (SAST/DAST), dependency vulnerability management, and security review gates before deploying systems that process personal information.",
    "cac_area14",
    y
  );

  // Area 15: Oversight of Service Providers, Contractors, and Third Parties
  y = renderArea(
    15,
    "Oversight of Service Providers, Contractors, and Third Parties",
    "Due diligence and ongoing oversight of service providers, contractors, and third parties that access or process personal information. Includes written data processing agreements (DPAs) with security requirements, periodic security assessments of third parties, subprocessor oversight, and breach notification obligations in contracts.",
    "cac_area15",
    y
  );

  // Area 16: Retention Schedules and Disposal
  y = renderArea(
    16,
    "Retention Schedules and Disposal",
    "Documented data retention schedules specifying retention periods for each category of personal information, and secure disposal procedures. Includes automated or manual processes to delete or anonymize personal information when retention periods expire, and secure destruction of physical and digital media.",
    "cac_area16",
    y
  );

  // Area 17: Incident Response Management
  y = renderArea(
    17,
    "Incident Response Management",
    "Written incident response plan (IRP) covering detection, classification, escalation, containment, eradication, recovery, and post-incident review for security incidents involving personal information. Includes defined roles and responsibilities, tested response procedures, contact lists for notification (CPPA, law enforcement, affected individuals), and alignment with California breach notification law (Cal. Civ. Code § 1798.82).",
    "cac_area17",
    y
  );

  // Overall Audit Summary
  y = addSectionHeader(doc, "Overall Audit Summary", y);
  y = addFormTextField(
    doc,
    "cac_summary_compliant",
    "Number of Areas — Fully Compliant:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "cac_summary_partial",
    "Number of Areas — Partially Compliant / In Progress:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "cac_summary_noncompliant",
    "Number of Areas — Non-Compliant:",
    y,
    { width: 60 }
  );
  y = addFormTextField(
    doc,
    "cac_summary_observations",
    "Key Observations and Priority Findings:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "cac", y);

  addDisclaimer(doc);
  return doc;
}
