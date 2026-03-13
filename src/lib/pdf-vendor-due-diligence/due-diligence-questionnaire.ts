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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT: Vendor AI Due Diligence Questionnaire
// Send to AI vendors before procurement.
// Aligned with NIST AI RMF MAP function and CO SB205 § 6-1-1703(2).
// ============================================================
export function generateVendorQuestionnaire(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Vendor AI Due Diligence Questionnaire", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    data.company.name +
      " (\"Deployer\") requires prospective AI system vendors to complete this questionnaire " +
      "as part of the procurement due diligence process. Responses will be used to assess " +
      "alignment with the Colorado Artificial Intelligence Act (SB 24-205, C.R.S. §§ 6-1-1701 " +
      "through 6-1-1707), the Illinois Artificial Intelligence Video Interview Act and AI " +
      "Discrimination Act (775 ILCS 5/2-102(L)), NYC Local Law 144, applicable EEOC guidance, " +
      "and the NIST AI Risk Management Framework (AI RMF 1.0). Vendors must respond in writing " +
      "and attach supporting documentation where indicated.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Vendor Information ──────────────────────────
  y = addSectionHeader(doc, "1. Vendor Information", y);
  y = addFormTextField(doc, "vdd_q_vendor_company", "Vendor Company Name:", y);
  y = addFormTextField(doc, "vdd_q_product_name", "AI Product / System Name:", y);
  y = addFormTextField(doc, "vdd_q_product_version", "Current Version / Release:", y);
  y = addFormTextField(
    doc,
    "vdd_q_primary_contact",
    "Primary Contact (Name & Title):",
    y
  );
  y = addFormTextField(doc, "vdd_q_contact_email", "Contact Email:", y);
  y = addFormTextField(doc, "vdd_q_contact_phone", "Contact Phone:", y);
  y = addFormTextField(
    doc,
    "vdd_q_legal_entity",
    "Legal Entity Name (if different from above):",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_q_hq_address",
    "Headquarters Address (City, State, Country):",
    y
  );
  y += LINE_HEIGHT;

  // ── Section 2: AI System Description ───────────────────────
  y = addSectionHeader(doc, "2. AI System Description", y);
  y = addWrappedText(
    doc,
    "Provide a plain-language description of the AI system, including its intended use " +
      "case, decision scope, and any known limitations. Attach technical documentation " +
      "and model cards if available.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  y = addFormTextField(
    doc,
    "vdd_q_system_description",
    "2.1 What does this AI system do? (Describe in plain language):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_decisions_influenced",
    "2.2 What decisions does it make or substantially influence?",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_data_processed",
    "2.3 What categories of data does the system process as inputs?",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_outputs",
    "2.4 What are the outputs — scores, rankings, flags, recommendations, or automated decisions?",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_limitations",
    "2.5 Describe any known limitations, edge cases, or populations for which the system performs poorly:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Section 3: Data Practices ───────────────────────────────
  y = addSectionHeader(doc, "3. Data Practices", y);
  y = addFormTextField(
    doc,
    "vdd_q_data_storage",
    "3.1 Where is deployer data stored? (Country / region / cloud provider):",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_q_data_retention",
    "3.2 What is the data retention period for deployer-submitted data?",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_q_data_access",
    "3.3 Who has access to deployer data? (Internal roles, subcontractors, third parties):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_encryption",
    "3.4 Describe encryption in transit and at rest (protocols, key management):",
    y,
    { multiline: true, lines: 3 }
  );

  y = addWrappedText(
    doc,
    "3.5 Cross-border data transfers — does deployer data leave the country of origin?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(doc, "vdd_q_xborder_yes", "Yes — specify destination countries:", y);
  y = addFormTextField(doc, "vdd_q_xborder_countries", "", y, {
    width: CONTENT_WIDTH - 30,
    x: MARGIN + 15,
  });
  y = addFormCheckbox(doc, "vdd_q_xborder_no", "No — data remains within country of origin", y);
  y += 2;

  y = addFormTextField(
    doc,
    "vdd_q_data_deletion",
    "3.6 Describe the process for data deletion upon contract termination:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 4: Bias & Fairness ──────────────────────────────
  y = addSectionHeader(doc, "4. Bias & Fairness", y);
  y = addWrappedText(
    doc,
    "Under C.R.S. § 6-1-1703(2), deployers must protect consumers from algorithmic " +
      "discrimination. Vendor bias testing documentation is a key input to the deployer's " +
      "impact assessment obligations under § 6-1-1703(3).",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addWrappedText(
    doc,
    "4.1 Has independent bias testing been performed on this system?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(doc, "vdd_q_bias_yes", "Yes — attach most recent bias audit report", y);
  y = addFormCheckbox(doc, "vdd_q_bias_no", "No — explain below:", y);
  y = addFormTextField(doc, "vdd_q_bias_no_explain", "", y, {
    multiline: true,
    lines: 2,
  });

  y = addFormTextField(
    doc,
    "vdd_q_bias_methodology",
    "4.2 Describe the bias testing methodology (statistical tests, protected class analysis, datasets used):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_bias_results",
    "4.3 Summarize the results of the most recent bias audit, including any disparate impact findings:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_bias_frequency",
    "4.4 How frequently is bias testing conducted? (e.g., annual, after model updates, triggered by incidents):",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_q_bias_remediation",
    "4.5 If disparate impact was found, what remediation steps were taken?",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 5: Transparency & Explainability ────────────────
  y = addSectionHeader(doc, "5. Transparency & Explainability", y);
  y = addWrappedText(
    doc,
    "5.1 Can the system explain individual decisions or outputs?",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "vdd_q_explain_yes",
    "Yes — describe the explanation mechanism:",
    y
  );
  y = addFormTextField(doc, "vdd_q_explain_mechanism", "", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormCheckbox(
    doc,
    "vdd_q_explain_no",
    "No — explain why not and what alternative transparency measures exist:",
    y
  );
  y = addFormTextField(doc, "vdd_q_explain_alt", "", y, {
    multiline: true,
    lines: 3,
  });

  y = addFormTextField(
    doc,
    "vdd_q_documentation",
    "5.2 What technical documentation exists? (Model cards, system cards, data sheets — list and attach):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_audit_trail",
    "5.3 Does the system produce audit logs of decisions made? Describe log content and retention:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 6: Security ─────────────────────────────────────
  y = addSectionHeader(doc, "6. Security", y);
  y = addWrappedText(
    doc,
    "Check all security certifications and assessments currently maintained by the vendor:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "vdd_q_sec_soc2_t1",
    "SOC 2 Type I — attach report or executive summary",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_sec_soc2_t2",
    "SOC 2 Type II — attach report or executive summary",
    y
  );
  y = addFormCheckbox(doc, "vdd_q_sec_iso27001", "ISO 27001 — attach certificate", y);
  y = addFormCheckbox(doc, "vdd_q_sec_pentest", "Annual penetration testing by third party", y);
  y = addFormCheckbox(doc, "vdd_q_sec_csf", "NIST Cybersecurity Framework alignment", y);
  y = addFormCheckbox(
    doc,
    "vdd_q_sec_other",
    "Other certification (specify below):",
    y
  );
  y = addFormTextField(doc, "vdd_q_sec_other_name", "", y);

  y = addFormTextField(
    doc,
    "vdd_q_incident_history",
    "6.1 Disclose any security incidents in the past 3 years involving customer data:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_vuln_mgmt",
    "6.2 Describe your vulnerability management and patch cycle process:",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 7: Regulatory Compliance ───────────────────────
  y = addSectionHeader(doc, "7. Regulatory Compliance", y);
  y = addWrappedText(
    doc,
    "Check all regulations and frameworks with which this system is designed to comply. " +
      "Attach compliance documentation, certifications, or legal opinion letters where available.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(
    doc,
    "vdd_q_reg_il_hb3773",
    "Illinois HB3773 / AI Discrimination Act (775 ILCS 5/2-102(L), eff. 1-1-26)",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_co_sb205",
    "Colorado SB205 / Consumer Protections for AI (C.R.S. §§ 6-1-1701–1707, eff. 6-30-26)",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_nyc_ll144",
    "NYC Local Law 144 — Automated Employment Decision Tools (effective 7-5-23)",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_eeoc",
    "EEOC AI Guidance (May 2023) — adverse impact in employment decisions",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_nist_rmf",
    "NIST AI Risk Management Framework (AI RMF 1.0)",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_eu_ai_act",
    "EU AI Act (Regulation (EU) 2024/1689) — specify risk tier below:",
    y
  );
  y = addFormTextField(doc, "vdd_q_reg_eu_tier", "", y, {
    width: CONTENT_WIDTH - 30,
    x: MARGIN + 15,
  });
  y = addFormCheckbox(
    doc,
    "vdd_q_reg_other",
    "Other regulatory compliance (specify below):",
    y
  );
  y = addFormTextField(doc, "vdd_q_reg_other_detail", "", y, {
    multiline: true,
    lines: 2,
  });
  y += LINE_HEIGHT;

  // ── Section 8: Human Oversight ──────────────────────────────
  y = addSectionHeader(doc, "8. Human Oversight", y);
  y = addFormTextField(
    doc,
    "vdd_q_override",
    "8.1 What override capabilities exist? Can a human reviewer override or modify AI outputs?",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_audit_logs",
    "8.2 Describe audit log capabilities — what is captured, format, retention, and export options:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_human_fallback",
    "8.3 Is there a human-only fallback process if the AI system is unavailable or suspended?",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 9: Liability & Indemnification ──────────────────
  y = addSectionHeader(doc, "9. Liability & Indemnification", y);
  y = addWrappedText(
    doc,
    "TEMPLATE — consult a licensed attorney before including contractual provisions.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "vdd_q_indemnification",
    "9.1 Describe your indemnification provisions relating to regulatory violations, " +
      "discrimination claims, or security incidents caused by the AI system:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_liability_cap",
    "9.2 What is the limitation of liability cap in your standard contract?",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_q_insurance",
    "9.3 What cyber liability and errors & omissions insurance coverage do you carry? (Limits, carriers):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // ── Section 10: References ──────────────────────────────────
  y = addSectionHeader(doc, "10. References", y);
  y = addFormTextField(
    doc,
    "vdd_q_industry_clients",
    "10.1 List current or former clients in our industry who may be contacted as references:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "vdd_q_case_studies",
    "10.2 Are case studies or deployment reports available? Summarize or attach:",
    y,
    { multiline: true, lines: 4 }
  );
  y += LINE_HEIGHT;

  // ── Certification ───────────────────────────────────────────
  y = addSectionHeader(doc, "Vendor Certification", y);
  y = addWrappedText(
    doc,
    "The undersigned certifies that the information provided in this questionnaire is " +
      "accurate and complete to the best of their knowledge, and that the vendor will " +
      "promptly notify the Deployer of any material changes to responses provided herein.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;
  y = addFormTextField(
    doc,
    "vdd_q_cert_name",
    "Authorized Signatory (Name & Title):",
    y
  );
  y = addFormTextField(doc, "vdd_q_cert_date", "Date:", y);
  y = addFormTextField(doc, "vdd_q_cert_sig", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
