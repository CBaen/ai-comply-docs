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
// DOCUMENT 4: AI Use Case Approval Workflow
// ============================================================
export function generateApprovalWorkflow(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI Use Case Approval Workflow", data);
  y = addTopDisclaimer(doc, y);

  // ── Purpose ────────────────────────────────────────────────
  y = addSectionHeader(doc, "1. Purpose", y);
  y = addWrappedText(
    doc,
    "This AI Use Case Approval Workflow establishes the process that " + data.company.name +
      " uses to review, approve, and document new AI use cases before deployment. " +
      "No AI system may be deployed in a production environment without completing " +
      "this approval process. This workflow applies to all new AI systems and to " +
      "material expansions of existing AI systems.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Approval Tiers ─────────────────────────────────────────
  y = addSectionHeader(doc, "2. Approval Authority by Risk Tier", y);
  const approvalLevels = [
    {
      tier: "Tier 1 (High Risk)",
      authority:
        "AI Steering Committee approval required. Majority vote in formal meeting. " +
        "AI Compliance Officer reviews application and presents recommendation to Committee.",
    },
    {
      tier: "Tier 2 (Medium Risk)",
      authority:
        "AI Compliance Officer approval required. Officer may consult legal counsel " +
        "or technical reviewers. Decision documented in writing within 10 business days.",
    },
    {
      tier: "Tier 3 (Low Risk)",
      authority:
        "AI System Owner approval required, with confirmation that system has been " +
        "registered in the AI System Inventory. AI Compliance Officer notified.",
    },
  ];
  approvalLevels.forEach(({ tier, authority }) => {
    if (y > 255) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, tier + ":", MARGIN + 3, y, CONTENT_WIDTH - 3, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, authority, MARGIN + 8, y, CONTENT_WIDTH - 8, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── Approval Workflow Steps ────────────────────────────────
  y = addSectionHeader(doc, "3. Approval Workflow", y);
  const steps = [
    {
      step: "Step 1 — Submission",
      detail:
        "The requesting team completes the AI Use Case Request Form (Section 4 of this document) " +
        "and submits it to the AI Compliance Officer. Submissions must include: (a) description " +
        "of the proposed AI system; (b) intended use case and affected populations; (c) vendor " +
        "information if applicable; (d) proposed data inputs; and (e) initial risk tier assessment.",
    },
    {
      step: "Step 2 — Initial Review",
      detail:
        "The AI Compliance Officer reviews the submission within 5 business days and: " +
        "(a) confirms or adjusts the proposed risk tier classification; (b) identifies " +
        "required documentation (bias audit, impact assessment, legal review); and " +
        "(c) routes to the appropriate approval authority.",
    },
    {
      step: "Step 3 — Required Documentation",
      detail:
        "The requesting team completes any required documentation identified in Step 2. " +
        "Tier 1 systems require a completed impact assessment and, if required, a bias " +
        "audit report before the Steering Committee will consider approval.",
    },
    {
      step: "Step 4 — Approval Decision",
      detail:
        "The appropriate approval authority reviews the submission and documentation. " +
        "The decision — approve, approve with conditions, or deny — is documented in " +
        "writing. Conditional approvals must specify what conditions must be met and " +
        "the timeline for verifying compliance.",
    },
    {
      step: "Step 5 — Registry & Deployment",
      detail:
        "Approved AI systems are registered in the AI System Inventory before deployment. " +
        "The system owner is confirmed in writing. The AI Compliance Officer receives a " +
        "copy of the approval record.",
    },
    {
      step: "Step 6 — Post-Deployment Monitoring",
      detail:
        "All deployed AI systems are subject to monitoring per their risk tier. " +
        "Tier 1 systems: quarterly monitoring. Tier 2: semi-annual. Tier 3: annual. " +
        "Monitoring results are reported to the AI Compliance Officer.",
    },
  ];
  steps.forEach(({ step, detail }) => {
    if (y > 250) {
      doc.addPage();
      y = MARGIN;
    }
    doc.setFont("helvetica", "bold");
    y = addWrappedText(doc, step, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, detail, MARGIN + 5, y, CONTENT_WIDTH - 5, LINE_HEIGHT);
    y += LINE_HEIGHT;
  });

  // ── AI Use Case Request Form ───────────────────────────────
  y = addSectionHeader(doc, "4. AI Use Case Request Form", y);
  y = addWrappedText(
    doc,
    "Complete this form and submit to the AI Compliance Officer to begin the approval process.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormTextField(doc, "auw_requester", "Requesting Team / Department:", y);
  y = addFormTextField(doc, "auw_requester_name", "Requestor Name & Title:", y);
  y = addFormTextField(doc, "auw_submission_date", "Submission Date:", y);
  y = addFormTextField(doc, "auw_system_name", "AI System Name / Vendor:", y);
  y = addFormTextField(
    doc,
    "auw_use_case",
    "Describe the intended use case:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "auw_affected",
    "Who will be affected by this AI system's outputs?",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "auw_data_inputs",
    "What data will be used as inputs?",
    y,
    { multiline: true, lines: 2 }
  );

  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, "Proposed Risk Tier (check one):", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addFormCheckbox(doc, "auw_tier1", "Tier 1 — High Risk", y);
  y = addFormCheckbox(doc, "auw_tier2", "Tier 2 — Medium Risk", y);
  y = addFormCheckbox(doc, "auw_tier3", "Tier 3 — Low Risk", y);
  y += LINE_HEIGHT;

  // ── Approval Record ────────────────────────────────────────
  y = addSectionHeader(doc, "5. Approval Record", y);
  y = addWrappedText(
    doc,
    "Complete this section after the approval authority has reviewed the request.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormCheckbox(doc, "auw_approved", "APPROVED", y);
  y = addFormCheckbox(doc, "auw_approved_conditions", "APPROVED WITH CONDITIONS", y);
  y = addFormCheckbox(doc, "auw_denied", "DENIED", y);
  y += LINE_HEIGHT;

  y = addFormTextField(
    doc,
    "auw_conditions",
    "Conditions or Denial Reason (if applicable):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(doc, "auw_approved_by", "Approved By (Name, Title, Signature):", y);
  y = addFormTextField(doc, "auw_decision_date", "Decision Date:", y);

  addDisclaimer(doc);
  return doc;
}
