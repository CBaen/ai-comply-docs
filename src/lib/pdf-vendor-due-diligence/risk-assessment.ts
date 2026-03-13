import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT: Vendor AI Risk Assessment
// Internal tool for evaluating AI vendor risk before procurement.
// Aligned with NIST AI RMF MAP function and CO SB205 § 6-1-1703(2)-(3).
// ============================================================
export function generateVendorRiskAssessment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Vendor AI Risk Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This internal risk assessment is completed by " +
      data.company.name +
      " ("Deployer") before procuring or renewing a contract for an AI system. " +
      "It fulfills part of the deployer's obligation to implement a risk management program " +
      "under C.R.S. § 6-1-1703(2) and supports the impact assessment required by " +
      "§ 6-1-1703(3). Assessors should use the Vendor Due Diligence Questionnaire responses " +
      "as a primary input. This document is INTERNAL and CONFIDENTIAL.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Vendor & System Overview ────────────────────
  y = addSectionHeader(doc, "1. Vendor & System Overview", y);
  y = addFormTextField(doc, "vdd_ra_vendor_name", "Vendor Name:", y, {
    prefill: "",
  });
  y = addFormTextField(doc, "vdd_ra_system_name", "AI System / Product Name:", y);
  y = addFormTextField(doc, "vdd_ra_system_version", "Version / Date of Evaluation:", y);
  y = addFormTextField(
    doc,
    "vdd_ra_use_case",
    "Proposed Use Case at " + data.company.name + ":",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "vdd_ra_decision_scope",
    "Consequential Decisions Affected:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(doc, "vdd_ra_assessor", "Assessor (Name & Title):", y, {
    prefill: data.contact
      ? data.contact.name +
        (data.contact.title ? ", " + data.contact.title : "")
      : "",
  });
  y = addFormTextField(
    doc,
    "vdd_ra_assessment_date",
    "Assessment Date:",
    y,
    { prefill: data.generatedDate }
  );
  y += LINE_HEIGHT;

  // ── Section 2: Risk Scoring ─────────────────────────────────
  y = addSectionHeader(doc, "2. Risk Category Scoring", y);
  y = addWrappedText(
    doc,
    "Score each risk category on a scale of 1 (minimal risk) to 5 (critical risk). " +
      "Provide a brief rationale for each score. Use the Vendor Due Diligence Questionnaire " +
      "responses, bias audit reports, and security certifications as evidence.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  // Helper: render a risk category scoring block
  function addRiskCategory(
    fieldPrefix: string,
    categoryTitle: string,
    description: string,
    scoringGuide: string[]
  ): void {
    if (y > 240) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFontSize(BODY_SIZE);
    doc.setFont("helvetica", "bold");
    doc.text(categoryTitle, MARGIN, y);
    y += LINE_HEIGHT;
    doc.setFont("helvetica", "normal");

    y = addWrappedText(doc, description, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;

    // Scoring guide in compact form
    doc.setFontSize(8);
    doc.setTextColor(100);
    scoringGuide.forEach(function (guide) {
      if (y > 270) {
        doc.addPage();
        y = MARGIN;
      }
      y = addWrappedText(doc, guide, MARGIN + 5, y, CONTENT_WIDTH - 5, 4.5);
    });
    doc.setTextColor(0);
    doc.setFontSize(BODY_SIZE);
    y += 2;

    // Score radio-style checkboxes
    y = addWrappedText(
      doc,
      "Score (check one):",
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    const scores = ["1 — Minimal", "2 — Low", "3 — Moderate", "4 — High", "5 — Critical"];
    scores.forEach(function (score, idx) {
      y = addFormCheckbox(
        doc,
        fieldPrefix + "_score_" + (idx + 1),
        score,
        y,
        { x: MARGIN + 5 }
      );
    });
    y = addFormTextField(
      doc,
      fieldPrefix + "_rationale",
      "Rationale / Evidence:",
      y,
      { multiline: true, lines: 3 }
    );
    y += LINE_HEIGHT;
  }

  addRiskCategory(
    "vdd_ra_privacy",
    "2.1 Data Privacy Risk",
    "Risk that the AI system collects, processes, or retains personal data in ways that " +
      "violate applicable privacy laws or expose individuals to unauthorized disclosure.",
    [
      "1: Minimal data, no sensitive categories, strong encryption and deletion controls.",
      "2: Standard personal data, adequate controls, clear retention policies.",
      "3: Sensitive data categories, some cross-border transfers, adequate but unverified controls.",
      "4: Sensitive or biometric data, unclear retention, cross-border transfers to high-risk jurisdictions.",
      "5: Special categories of data, no demonstrable controls, no audit rights, no deletion capability.",
    ]
  );

  addRiskCategory(
    "vdd_ra_bias",
    "2.2 Bias & Discrimination Risk",
    "Risk that the AI system produces outputs that cause or contribute to algorithmic " +
      "discrimination against persons in protected classes, as defined under C.R.S. " +
      "§ 6-1-1701(1)(a) and applicable federal anti-discrimination law.",
    [
      "1: Independent bias audit completed, no disparate impact found, annual testing cadence.",
      "2: Bias audit completed, minor findings remediated, annual testing.",
      "3: Internal bias testing only, or audit older than 12 months.",
      "4: No independent bias testing, system makes consequential employment or credit decisions.",
      "5: Known disparate impact, no remediation, system makes autonomous high-stakes decisions.",
    ]
  );

  addRiskCategory(
    "vdd_ra_security",
    "2.3 Security Risk",
    "Risk of unauthorized access, breach, or manipulation of the AI system or the data " +
      "it processes, including risks arising from third-party infrastructure.",
    [
      "1: SOC 2 Type II, annual pentest, incident response plan, no known incidents.",
      "2: SOC 2 Type I or ISO 27001, pentest completed, minor prior incidents fully remediated.",
      "3: Certifications pending or lapsed, limited pentest history.",
      "4: No formal certifications, undisclosed incident history.",
      "5: Known unpatched vulnerabilities, prior material breach, no incident response plan.",
    ]
  );

  addRiskCategory(
    "vdd_ra_regulatory",
    "2.4 Regulatory Compliance Risk",
    "Risk that deployment of the AI system exposes the Deployer to regulatory liability " +
      "under CO SB205, IL HB3773, NYC LL144, EEOC guidance, or other applicable law.",
    [
      "1: Vendor confirms compliance with all applicable regulations, documentation provided.",
      "2: Compliant with most applicable regulations, minor gaps with remediation plan.",
      "3: Partial compliance, vendor acknowledges gaps, timeline for remediation unclear.",
      "4: Non-compliant with one or more material regulatory requirements, no remediation plan.",
      "5: Known regulatory violations, pending enforcement action, deployer indemnification refused.",
    ]
  );

  addRiskCategory(
    "vdd_ra_operational",
    "2.5 Operational Dependency Risk",
    "Risk that over-reliance on the AI vendor creates operational vulnerability, " +
      "including vendor lock-in, service discontinuity, or inability to operate if the " +
      "vendor is acquired, exits the market, or suffers an outage.",
    [
      "1: Data portability guaranteed, human fallback process documented, alternative vendors available.",
      "2: Data portability available, fallback process defined, market alternatives exist.",
      "3: Limited portability, fallback process informal, few alternatives.",
      "4: No data export capability, no fallback process, significant switching costs.",
      "5: Complete lock-in, sole-source dependency, no fallback, mission-critical decisions.",
    ]
  );

  addRiskCategory(
    "vdd_ra_reputational",
    "2.6 Reputational Risk",
    "Risk that deployment of this AI system, or a failure thereof, causes reputational " +
      "harm to the Deployer through public exposure, media coverage, employee or customer " +
      "backlash, or association with a vendor with a negative public record.",
    [
      "1: Vendor has strong public reputation, no controversies, system use is non-sensitive.",
      "2: No significant controversies, low public sensitivity of use case.",
      "3: Vendor has minor public controversies, or use case has moderate sensitivity.",
      "4: Vendor has prior high-profile incidents or lawsuits, or use case is high-sensitivity.",
      "5: Vendor is subject to active regulatory or media scrutiny, or system use is highly controversial.",
    ]
  );

  // ── Section 3: Overall Risk Score ───────────────────────────
  y = addSectionHeader(doc, "3. Overall Risk Score & Recommendation", y);
  y = addWrappedText(
    doc,
    "Calculate the overall risk score (average of individual scores, or weighted average " +
      "based on organizational priorities). Document any weighting rationale.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "vdd_ra_overall_score",
    "Overall Risk Score (1–5, or weighted):",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_ra_weighting_rationale",
    "Weighting Rationale (if applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── Section 4: Mitigating Factors ──────────────────────────
  y = addSectionHeader(doc, "4. Mitigating Factors", y);
  y = addWrappedText(
    doc,
    "Identify any contractual, technical, or organizational controls that reduce the " +
      "residual risk from the scores above. Examples: contractual audit rights, indemnification " +
      "provisions, enhanced human oversight, data minimization commitments.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "vdd_ra_mitigating_factors",
    "Mitigating Factors:",
    y,
    { multiline: true, lines: 5 }
  );
  y = addFormTextField(
    doc,
    "vdd_ra_residual_risk",
    "Residual Risk Score After Mitigation:",
    y
  );
  y += LINE_HEIGHT;

  // ── Section 5: Risk Acceptance / Rejection ──────────────────
  y = addSectionHeader(doc, "5. Risk Acceptance / Rejection", y);
  y = addWrappedText(
    doc,
    "Based on the risk scores and mitigating factors above, the assessor recommends:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormCheckbox(
    doc,
    "vdd_ra_rec_accept",
    "ACCEPT — Risk is within acceptable tolerance. Proceed with procurement.",
    y
  );
  y = addFormCheckbox(
    doc,
    "vdd_ra_rec_accept_conditions",
    "ACCEPT WITH CONDITIONS — Proceed only if the following conditions are met:",
    y
  );
  y = addFormTextField(doc, "vdd_ra_conditions", "", y, {
    multiline: true,
    lines: 3,
  });
  y = addFormCheckbox(
    doc,
    "vdd_ra_rec_defer",
    "DEFER — Additional information or vendor remediation required before decision.",
    y
  );
  y = addFormTextField(doc, "vdd_ra_defer_requirements", "", y, {
    multiline: true,
    lines: 2,
  });
  y = addFormCheckbox(
    doc,
    "vdd_ra_rec_reject",
    "REJECT — Risk exceeds acceptable tolerance. Do not proceed.",
    y
  );
  y = addFormTextField(
    doc,
    "vdd_ra_rejection_basis",
    "Rejection Basis:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // ── Section 6: Reviewer Sign-off ───────────────────────────
  y = addSectionHeader(doc, "6. Reviewer Sign-Off", y);
  y = addFormTextField(
    doc,
    "vdd_ra_reviewer_name",
    "Primary Assessor (Name & Title):",
    y,
    {
      prefill: data.contact
        ? data.contact.name +
          (data.contact.title ? ", " + data.contact.title : "")
        : "",
    }
  );
  y = addFormTextField(doc, "vdd_ra_reviewer_date", "Date:", y, {
    prefill: data.generatedDate,
  });
  y = addFormTextField(doc, "vdd_ra_reviewer_sig", "Signature:", y);
  y += 4;
  y = addFormTextField(
    doc,
    "vdd_ra_approver_name",
    "Secondary Reviewer / Approver (Name & Title):",
    y
  );
  y = addFormTextField(doc, "vdd_ra_approver_date", "Date:", y);
  y = addFormTextField(doc, "vdd_ra_approver_sig", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
