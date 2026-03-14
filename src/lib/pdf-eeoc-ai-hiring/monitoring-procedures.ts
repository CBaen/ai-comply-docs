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
  DECISION_LABELS,
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 5: AI Hiring Tool Monitoring Procedures
// 29 CFR Part 1607 — ongoing adverse impact monitoring
// ============================================================
export function generateMonitoringProcedures(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "EEOC AI Hiring: AI Hiring Tool Monitoring Procedures", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document establishes ongoing monitoring procedures for AI-assisted employment selection tools used by ${data.company.name}. The Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) require employers to maintain records of selection procedures and to monitor for adverse impact on protected groups. Employers remain liable under Title VII (42 USC § 2000e et seq.), ADA (42 USC § 12101 et seq.), and ADEA (29 USC § 621 et seq.) for discriminatory outcomes even when AI tools are procured from vendors. Proactive monitoring is the strongest evidence of good faith. This is a template — review with qualified legal counsel.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Systems under monitoring
  y = addSectionHeader(doc, "1. AI Systems Under Monitoring", y);
  data.aiSystems.forEach((sys, idx) => {
    y = addWrappedText(
      doc,
      `System ${idx + 1}: ${sys.name} (${sys.vendor || "Internal"}) — ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
  });
  y = addWrappedText(
    doc,
    `Monitoring frequency: ${REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified — The Uniform Guidelines recommend record analysis at least annually"}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 2: Record maintenance (29 CFR § 1607.15)
  y = addSectionHeader(doc, "2. Record Maintenance Requirements (29 CFR § 1607.15)", y);
  y = addWrappedText(
    doc,
    "Section 1607.15 requires employers to maintain records sufficient to allow adverse impact calculations. The following records must be maintained for each AI selection procedure:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const recordItems = [
    "Number of applicants / candidates processed by each AI tool, by race, sex, and ethnic group",
    "Selection rates for each group at each selection stage where AI is used",
    "Job titles for which AI tool was used",
    "Validation studies for each AI selection procedure (or vendor documentation per 29 CFR § 1607.7)",
    "Records of adverse impact analyses conducted",
    "Documentation of any investigation of alternative procedures",
    "AI tool version history — record when models are updated or retrained",
  ];

  let cbCount = 0;
  recordItems.forEach((item) => {
    y = addFormCheckbox(doc, "mp_rec_" + cbCount, item, y);
    cbCount++;
  });
  y += LINE_HEIGHT;

  // Section 3: Adverse impact monitoring schedule
  y = addSectionHeader(doc, "3. Adverse Impact Monitoring Schedule", y);
  y = addWrappedText(
    doc,
    "Conduct adverse impact analysis at the following intervals. Apply the four-fifths (80%) rule per 29 CFR § 1607.4(D) to each protected group at each selection stage:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const monitoringSchedule = [
    "Quarterly: compile selection rate data by race, sex, ethnic group, age group, and disability status",
    "Quarterly: apply four-fifths rule and flag any selection rate ratio below 80%",
    "Annually: comprehensive adverse impact analysis across all protected groups and all AI selection stages",
    "Annually: review vendor's updated adverse impact data and validation documentation",
    "On model update: re-run adverse impact analysis within 30 days of any AI tool retraining or version change",
    "On adverse impact finding: conduct investigation and evaluate less discriminatory alternatives within 90 days",
  ];

  monitoringSchedule.forEach((item, idx) => {
    y = addFormCheckbox(doc, "mp_sched_" + idx, item, y);
  });
  y += LINE_HEIGHT;

  // Section 4: Adverse impact response protocol
  y = addSectionHeader(doc, "4. Adverse Impact Response Protocol", y);
  y = addWrappedText(
    doc,
    "When adverse impact is identified, the employer must act. The Uniform Guidelines (29 CFR § 1607.3(B)) require consideration of less discriminatory alternatives. Document the response protocol:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const responseSteps = [
    "Step 1: Document adverse impact finding with date, affected group(s), and magnitude",
    "Step 2: Notify HR leadership and legal counsel within 10 business days of finding",
    "Step 3: Identify potential causes — vendor model, implementation, job requirements, sample size",
    "Step 4: Evaluate less discriminatory alternatives with substantially equal validity (29 CFR § 1607.3(B))",
    "Step 5: Conduct or obtain updated validation study demonstrating job-relatedness (29 CFR § 1607.5)",
    "Step 6: Implement corrective action — modify tool, add human review, or replace tool",
    "Step 7: Document all steps taken and file with compliance records",
    "Step 8: Re-assess after corrective action is implemented",
  ];

  responseSteps.forEach((step, idx) => {
    y = addWrappedText(doc, `  ${idx + 1}. ${step.replace(/^Step \d+: /, "")}`, MARGIN, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += 2;
  });
  y += LINE_HEIGHT;

  // Section 5: EEOC investigation preparedness
  y = addSectionHeader(doc, "5. EEOC Investigation Preparedness", y);
  y = addWrappedText(
    doc,
    "Employers using AI hiring tools should be prepared to produce the following in response to an EEOC charge or investigation:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const investigationDocs = [
    "Complete record of adverse impact analyses for the relevant time period",
    "Validation study for each AI selection procedure, including methodology and results",
    "Evidence of less discriminatory alternatives considered and rationale for current tool",
    "Reasonable accommodation request records for AI assessments",
    "Vendor audit documentation and vendor responses",
    "Evidence of internal investigation and corrective action where adverse impact was found",
  ];

  investigationDocs.forEach((doc, idx) => {
    y = addFormCheckbox(doc, "mp_eeoc_" + idx, doc, y);
  });
  y += LINE_HEIGHT;

  // Sign-off
  y = addSectionHeader(doc, "6. Monitoring Program Sign-off", y);
  y = addFormTextField(doc, "mp_owner", "Monitoring program owner:", y, { width: 120 });
  y = addFormTextField(doc, "mp_name", "Approved by:", y, { width: 100 });
  y = addFormTextField(doc, "mp_date", "Date:", y, { width: 60 });
  y = addFormTextField(doc, "mp_next", "Next comprehensive review date:", y, { width: 60 });

  addDisclaimer(doc);
  return doc;
}
