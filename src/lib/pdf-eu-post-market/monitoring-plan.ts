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
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 1: Post-Market Monitoring Plan
// EU AI Act Art. 26(5) — Deployer post-market monitoring
// ============================================================
export function generateMonitoringPlan(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Post-Market Monitoring Plan (Art. 26(5))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This Post-Market Monitoring Plan is established by ${data.company.name} pursuant to Article 26(5) of Regulation (EU) 2024/1689 (EU AI Act). Article 26(5) requires deployers of high-risk AI systems to monitor the performance of the AI system based on the instructions for use provided by the AI system provider. This plan documents the deployer's monitoring framework. It must be kept current and made available to the competent authority upon request.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // System identification
  y = addSectionHeader(doc, "1. AI System Identification", y);
  y = addFormTextField(doc, "pmplan_sys_name", "AI system name:", y, { width: 140 });
  y = addFormTextField(doc, "pmplan_sys_version", "Version / build:", y, { width: 80 });
  y = addFormTextField(doc, "pmplan_sys_provider", "Provider name:", y, { width: 140 });
  y = addFormTextField(doc, "pmplan_sys_deploy_date", "Deployment date:", y, { width: 80 });
  y = addFormTextField(
    doc,
    "pmplan_sys_instructions_ref",
    "Reference to provider's instructions for use (document title, version, date):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 1: Monitoring objectives
  y = addSectionHeader(doc, "2. Monitoring Objectives", y);
  y = addWrappedText(
    doc,
    "State the objectives of this monitoring plan. Objectives should align with the intended purpose of the AI system, the performance metrics specified in the instructions for use, and the risks identified in the FRIA and technical documentation.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "pmplan_obj_primary",
    "Primary monitoring objective:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pmplan_obj_secondary",
    "Secondary monitoring objectives (list each):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "pmplan_obj_alignment",
    "How these objectives align with provider instructions for use:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Data collection methods
  y = addSectionHeader(doc, "3. Data Collection Methods", y);
  y = addWrappedText(
    doc,
    "Describe how performance data will be collected. Include the data sources, collection frequency, responsible personnel, and any automated collection tools. Data collection must be consistent with data protection obligations.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const dataCollectionMethods = [
    "Automated system logs from the AI system (as generated per Art. 12 / instructions for use)",
    "Manual review and sampling of AI outputs by designated personnel",
    "User/operator feedback collection (structured forms or reports)",
    "Incident and complaint intake from affected persons",
    "Integration with existing quality management or audit systems",
    "Third-party audit or testing",
    "Provider-supplied monitoring dashboards or telemetry",
  ];
  dataCollectionMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `pmplan_collect_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "pmplan_collect_other",
    "Other data collection methods:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pmplan_collect_responsible",
    "Personnel responsible for data collection (name/role):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Performance metrics
  y = addSectionHeader(doc, "4. Performance Metrics Tracked", y);
  y = addWrappedText(
    doc,
    "List the specific performance metrics to be tracked, including the acceptable threshold or target for each. Metrics should derive from the provider's instructions for use and from the intended purpose of the system.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "pmplan_metric_1", "Metric 1 (name, description, target threshold):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "pmplan_metric_2", "Metric 2 (name, description, target threshold):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "pmplan_metric_3", "Metric 3 (name, description, target threshold):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "pmplan_metric_4", "Metric 4 (name, description, target threshold):", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormTextField(doc, "pmplan_metric_5_plus", "Additional metrics (list):", y, {
    multiline: true,
    lines: 3,
  });
  y += LINE_HEIGHT;

  // Section 4: Anomaly detection procedures
  y = addSectionHeader(doc, "5. Anomaly Detection Procedures", y);
  y = addWrappedText(
    doc,
    "Describe how anomalies, unexpected behaviors, or performance degradation will be detected. Include both automated alerts and manual review processes.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "pmplan_anomaly_detection",
    "How anomalies are detected (automated alerts, statistical thresholds, manual review criteria):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "pmplan_anomaly_thresholds",
    "Specific thresholds or conditions that trigger anomaly classification:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 5: Escalation triggers
  y = addSectionHeader(doc, "6. Escalation Triggers", y);
  y = addWrappedText(
    doc,
    "Define the conditions that require escalation — either to internal leadership, to the AI system provider, or to the competent market surveillance authority (e.g., serious incidents per Art. 73).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const escalationTriggers = [
    "Performance metric falls below acceptable threshold for more than [specify period]",
    "Potential serious incident detected (harm to health, safety, or fundamental rights)",
    "Discrimination or disparate impact pattern identified in outputs",
    "AI system behaving outside parameters described in instructions for use",
    "User/operator complaints exceed [specify threshold] within [specify period]",
    "Provider issues a safety notice or product recall",
    "Regulatory authority requests information or inspection",
  ];
  escalationTriggers.forEach((trigger, idx) => {
    y = addFormCheckbox(doc, `pmplan_esc_${idx}`, trigger, y);
  });
  y = addFormTextField(
    doc,
    "pmplan_esc_other",
    "Other escalation triggers:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pmplan_esc_path",
    "Escalation path (who is notified and in what order):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 6: Review frequency
  y = addSectionHeader(doc, "7. Review Frequency", y);
  y = addWrappedText(
    doc,
    "State how frequently monitoring data will be reviewed and the monitoring plan itself will be evaluated for adequacy.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  const reviewFrequencies = [
    "Continuous automated monitoring with real-time alerts",
    "Weekly review of collected monitoring data",
    "Monthly review of performance metrics and anomaly reports",
    "Quarterly comprehensive review (recommended minimum)",
    "Annual monitoring plan adequacy review",
    "Ad hoc review triggered by escalation event",
  ];
  reviewFrequencies.forEach((freq, idx) => {
    y = addFormCheckbox(doc, `pmplan_freq_${idx}`, freq, y);
  });
  y = addFormTextField(
    doc,
    "pmplan_freq_notes",
    "Notes on review schedule or deviations:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 7: Responsible personnel
  y = addSectionHeader(doc, "8. Responsible Personnel", y);
  y = addFormTextField(doc, "pmplan_resp_owner", "Monitoring plan owner (name, title):", y, { width: 140 });
  y = addFormTextField(
    doc,
    "pmplan_resp_data_collection",
    "Data collection responsible person(s) (name, title):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pmplan_resp_review",
    "Review and analysis responsible person(s) (name, title):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "pmplan_resp_escalation",
    "Escalation decision authority (name, title):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "pmplan_resp_provider_contact",
    "Provider contact for monitoring issues (name, email, phone):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "pmplan_sign", y);

  addDisclaimer(doc);
  return doc;
}
