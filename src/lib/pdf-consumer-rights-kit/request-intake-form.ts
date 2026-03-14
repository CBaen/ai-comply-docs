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
// DOCUMENT 1: Consumer Rights Request Intake Form
// Consumer request intake form
// ============================================================
export function generateRequestIntakeForm(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Consumer Data Rights Request Intake Form", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    data.company.name +
      " respects your data rights under applicable privacy laws. " +
      "Use this form to submit a request to access, correct, delete, or limit the use of your personal data, " +
      "or to opt out of profiling or automated decision-making. " +
      "Complete all required sections and submit to the contact information at the bottom of this form.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Section 1: Your Information ────────────────────────────
  y = addSectionHeader(doc, "1. Your Information", y);
  y = addWrappedText(
    doc,
    "We need to verify your identity before processing your request. We will not use this information for any other purpose.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  y = addFormTextField(doc, "rif_full_name", "Full Name:", y);
  y = addFormTextField(doc, "rif_email", "Email Address:", y);
  y = addFormTextField(doc, "rif_phone", "Phone Number (optional):", y);
  y = addFormTextField(doc, "rif_address", "Mailing Address (if applicable):", y, { multiline: true, lines: 2 });
  y = addFormTextField(doc, "rif_account_id", "Account / Customer ID (if you have one):", y);
  y = addFormTextField(doc, "rif_relationship", 'Relationship to Company (e.g., "customer," "job applicant," "employee," "website visitor"):', y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 2: Type of Request ─────────────────────────────
  y = addSectionHeader(doc, "2. Type of Request — Check All That Apply", y);

  const requestTypes = [
    { name: "rif_req_access", label: "Access / Know: I want to know what personal data you have about me and how you use it." },
    { name: "rif_req_portability", label: "Portability / Copy: I want to receive a copy of my personal data in a portable format." },
    { name: "rif_req_correction", label: "Correction / Rectification: I believe information you have about me is inaccurate and I want it corrected." },
    { name: "rif_req_deletion", label: "Deletion / Erasure: I want you to delete my personal data, subject to applicable exceptions." },
    { name: "rif_req_optout_profiling", label: "Opt Out of Profiling: I do not want my data used for profiling that produces decisions with legal or significant effects on me." },
    { name: "rif_req_optout_sales", label: "Opt Out of Data Sales: I do not want my personal data sold to third parties." },
    { name: "rif_req_optout_targeted", label: "Opt Out of Targeted Advertising: I do not want my data used for targeted advertising." },
    { name: "rif_req_optout_admt", label: "Opt Out of Automated Decision-Making: I do not want fully automated decisions made about me without human review." },
    { name: "rif_req_human_review", label: "Human Review Request: I want a human being to review an automated decision that affected me." },
    { name: "rif_req_restriction", label: "Restrict Processing: I want to limit how you process my personal data." },
    { name: "rif_req_other", label: "Other: [describe below]" },
  ];

  requestTypes.forEach((rt) => {
    if (y > 255) { doc.addPage(); y = MARGIN; }
    y = addFormCheckbox(doc, rt.name, rt.label, y);
    y += 1;
  });
  y = addFormTextField(doc, "rif_req_other_desc", "Describe other request or additional detail:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // ── Section 3: Specific Data or Decision Involved ──────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "3. Specific Data or Decision (if known)", y);
  y = addFormTextField(doc, "rif_specific_data", "What specific data or decision is this request about?", y, { multiline: true, lines: 4 });
  y = addFormTextField(doc, "rif_date_range", "Date range of data or decision (if applicable):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 4: Authorized Representative ──────────────────
  y = addSectionHeader(doc, "4. Authorized Representative (if submitting on behalf of someone else)", y);
  y = addFormTextField(doc, "rif_rep_name", "Representative Name:", y);
  y = addFormTextField(doc, "rif_rep_relationship", "Relationship to Data Subject:", y);
  y = addFormTextField(doc, "rif_rep_authority", "Basis for Authorization (e.g., \"power of attorney,\" \"parent of minor\"):", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  // ── Section 5: Identity Verification ──────────────────────
  if (y > 200) { doc.addPage(); y = MARGIN; }
  y = addSectionHeader(doc, "5. Identity Verification", y);
  y = addWrappedText(
    doc,
    "We are required to verify your identity before processing your request. Please indicate how you prefer to be verified:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT / 2;

  const verifyMethods = [
    { name: "rif_verify_email", label: "Email verification (we will send a confirmation email)" },
    { name: "rif_verify_account", label: "Logged-in account verification (if you have an account with us)" },
    { name: "rif_verify_id", label: "Government ID (I am willing to provide a redacted ID if required)" },
    { name: "rif_verify_other", label: "Other: [describe]" },
  ];
  verifyMethods.forEach((vm) => {
    y = addFormCheckbox(doc, vm.name, vm.label, y);
    y += 1;
  });
  y += LINE_HEIGHT;

  // ── Certification ──────────────────────────────────────────
  y = addSectionHeader(doc, "Certification by Requestor", y);
  y = addWrappedText(
    doc,
    "By submitting this form, I certify that: (a) the information I provided is accurate to the best of my knowledge; " +
      "(b) I am the person whose data is described, or I am authorized to act on their behalf; and " +
      "(c) I understand that submitting a false request may have legal consequences.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  y = addFormTextField(doc, "rif_cert_sig", "Requestor Signature:", y);
  y = addFormTextField(doc, "rif_cert_date", "Date:", y);
  y += LINE_HEIGHT;

  // ── Submit To ──────────────────────────────────────────────
  y = addSectionHeader(doc, "Submit This Form To", y);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(doc, data.company.name + " — Privacy Rights Team", MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  doc.setFont("helvetica", "normal");
  y = addFormTextField(doc, "rif_submit_email", "Email:", y, { prefill: "" });
  y = addFormTextField(doc, "rif_submit_web", "Online Portal:", y);
  y = addFormTextField(doc, "rif_submit_mail", "Mailing Address:", y, { multiline: true, lines: 2 });
  y += LINE_HEIGHT;

  y = addWrappedText(
    doc,
    "Response timeline: Most state privacy laws require a response within 45 days of receiving a verified request. " +
      "You will receive a confirmation of receipt within [X] business days.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );

  // ── Internal Use (below line) ──────────────────────────────
  if (y > 220) { doc.addPage(); y = MARGIN; }
  doc.setDrawColor(100);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y + 5, MARGIN + CONTENT_WIDTH, y + 5);
  y += 10;
  y = addSectionHeader(doc, "FOR INTERNAL USE ONLY", y);
  y = addFormTextField(doc, "rif_int_received", "Date Received:", y);
  y = addFormTextField(doc, "rif_int_ticket", "Ticket / Reference Number:", y);
  y = addFormTextField(doc, "rif_int_deadline", "Response Deadline:", y);
  y = addFormTextField(doc, "rif_int_verified", "Identity Verified (method, date):", y);
  y = addFormTextField(doc, "rif_int_assigned", "Assigned To:", y);
  y = addFormTextField(doc, "rif_int_status", "Status:", y);
  y = addFormTextField(doc, "rif_int_notes", "Internal Notes:", y, { multiline: true, lines: 3 });

  addDisclaimer(doc);
  return doc;
}
