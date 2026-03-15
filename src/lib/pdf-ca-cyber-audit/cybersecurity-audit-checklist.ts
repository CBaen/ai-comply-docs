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

  // Area 1: Access Controls
  y = renderArea(
    1,
    "Access Controls",
    "Role-based access controls limiting employee access to personal information to what is necessary for their job function. Includes privileged access management, access reviews, and least-privilege enforcement.",
    "cac_area1",
    y
  );

  // Area 2: Risk Identification
  y = renderArea(
    2,
    "Risk Identification",
    "Processes to identify internal and external risks to the security, confidentiality, and integrity of personal information. Includes asset inventory, threat modeling, and periodic risk assessments.",
    "cac_area2",
    y
  );

  // Area 3: Incident Response Management
  y = renderArea(
    3,
    "Incident Response Management",
    "Written incident response plan covering detection, classification, escalation, containment, recovery, and post-incident review. Includes defined roles, contact lists, and tested response procedures.",
    "cac_area3",
    y
  );

  // Area 4: Third-Party Oversight
  y = renderArea(
    4,
    "Third-Party Oversight",
    "Due diligence and ongoing oversight of service providers and vendors that process personal information. Includes written contracts with security requirements, periodic security assessments, and breach notification clauses.",
    "cac_area4",
    y
  );

  // Area 5: Employee Training
  y = renderArea(
    5,
    "Employee Training",
    "Annual (or more frequent) security awareness training for all employees with access to personal information. Includes phishing awareness, data handling procedures, and incident reporting obligations.",
    "cac_area5",
    y
  );

  // Area 6: Retention Schedules
  y = renderArea(
    6,
    "Retention Schedules",
    "Documented data retention schedules specifying retention periods for each category of personal information. Includes automated or manual processes to delete personal information when retention periods expire.",
    "cac_area6",
    y
  );

  // Area 7: Data Minimization
  y = renderArea(
    7,
    "Data Minimization",
    "Practices and technical controls limiting the collection and processing of personal information to what is reasonably necessary for the identified purpose. Includes periodic reviews to identify unnecessary data.",
    "cac_area7",
    y
  );

  // Area 8: Encryption
  y = renderArea(
    8,
    "Encryption",
    "Encryption of personal information in transit and at rest. Includes use of current encryption standards, key management procedures, and encryption of personal information on mobile devices and removable media.",
    "cac_area8",
    y
  );

  // Area 9: Monitoring
  y = renderArea(
    9,
    "Monitoring",
    "Continuous or periodic monitoring of systems that process personal information to detect unauthorized access, anomalous activity, or security events. Includes log management, alerting, and review procedures.",
    "cac_area9",
    y
  );

  // Area 10: Vulnerability Management
  y = renderArea(
    10,
    "Vulnerability Management",
    "Processes to identify, prioritize, and remediate security vulnerabilities in systems that process personal information. Includes patch management, penetration testing, and vulnerability scanning cadence.",
    "cac_area10",
    y
  );

  // Area 11: Change Management
  y = renderArea(
    11,
    "Change Management",
    "Formal change management procedures to ensure security and privacy implications are reviewed before changes are deployed to systems processing personal information. Includes testing and rollback procedures.",
    "cac_area11",
    y
  );

  // Area 12: Business Continuity
  y = renderArea(
    12,
    "Business Continuity",
    "Business continuity and disaster recovery plans for systems that process personal information. Includes recovery time objectives (RTO), recovery point objectives (RPO), and tested backup and recovery procedures.",
    "cac_area12",
    y
  );

  // Area 13: Physical Security
  y = renderArea(
    13,
    "Physical Security",
    "Physical controls protecting servers, devices, and media containing personal information from unauthorized access, theft, or destruction. Includes facility access controls, clean desk policies, and secure disposal of hardware.",
    "cac_area13",
    y
  );

  // Area 14: Privacy by Design
  y = renderArea(
    14,
    "Privacy by Design",
    "Processes to integrate privacy and security requirements into the design and development of new products, systems, and processes that will process personal information. Includes privacy reviews at project inception.",
    "cac_area14",
    y
  );

  // Area 15: Breach Notification
  y = renderArea(
    15,
    "Breach Notification",
    "Written procedures for notifying affected individuals and the CPPA (and other regulators where required) in the event of a data breach involving personal information. Procedures aligned with California breach notification law (Cal. Civ. Code §1798.82).",
    "cac_area15",
    y
  );

  // Area 16: Vendor Security
  y = renderArea(
    16,
    "Vendor Security",
    "Security requirements imposed on vendors and service providers through contract terms. Includes data processing agreements (DPAs), subprocessor oversight, right-to-audit clauses, and vendor security questionnaire program.",
    "cac_area16",
    y
  );

  // Area 17: Governance
  y = renderArea(
    17,
    "Governance",
    "Organizational governance structures for cybersecurity and privacy. Includes designation of a responsible executive or officer, board-level reporting, documented cybersecurity policies and procedures, and policy review schedule.",
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
