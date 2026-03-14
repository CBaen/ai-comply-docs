import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormCheckbox,
  addFormTextField,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 4: Bias Audit Compliance Checklist
// NYC Local Law 144 — NYC Admin. Code §§ 20-870–20-874
// ============================================================
export function generateBiasAuditChecklist(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Bias Audit Compliance Checklist", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This checklist assists ${data.company.name} in meeting the annual independent bias audit requirements of NYC Admin. Code § 20-871(b)(1). The law requires employers to obtain an independent bias audit no more than one year prior to each use of an AEDT. DCWP implementing rules at 6 RCNY § 5-300 et seq. govern the required methodology and disclosure format. Complete all sections and retain this checklist with your audit documentation.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // ── Phase 1: Pre-Audit Preparation ──────────────────────────
  y = addSectionHeader(doc, "Phase 1: Pre-Audit Preparation", y);

  const prepChecks = [
    "Identified all AEDTs used to screen candidates or employees for hiring or promotion in NYC (§ 20-870 definition: computational process issuing simplified output used to substantially assist employment decisions)",
    "Confirmed each AEDT's last audit date — a new audit is required at least once per calendar year and within one year of each use (§ 20-871(b)(1))",
    "Selected an independent auditor with no financial interest in the AEDT or the AEDT developer/vendor",
    "Confirmed auditor will apply the DCWP methodology: impact ratio = selection rate of category ÷ selection rate of most selected category (6 RCNY § 5-301)",
    "Secured candidate/employee data (by sex and race/ethnicity category) for the audit period — or confirmed auditor will use historical data from AEDT vendor",
    "Verified data covers a representative sample meeting DCWP minimum size requirements (6 RCNY § 5-301)",
  ];
  let cbIdx = 0;
  prepChecks.forEach((check) => {
    y = addFormCheckbox(doc, `prep_${cbIdx}`, check, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // ── Phase 2: Audit Execution ─────────────────────────────────
  y = addSectionHeader(doc, "Phase 2: Audit Execution", y);

  const execChecks = [
    "Auditor calculated overall selection rate for each AEDT",
    "Auditor calculated selection rates by sex category (Male, Female, Non-binary/Other) per 6 RCNY § 5-301",
    "Auditor calculated impact ratios for each sex category (selection rate ÷ highest selection rate among categories)",
    "Auditor calculated selection rates by race/ethnicity category (Hispanic or Latino; White, not Hispanic/Latino; Black or African American; Native Hawaiian/Pacific Islander; Asian; Native American/Alaska Native; Two or more races) per 6 RCNY § 5-301",
    "Auditor calculated impact ratios for each race/ethnicity category",
    "Auditor identified the sex category and race/ethnicity category with the lowest impact ratio for each AEDT",
    "Categories below 0.80 impact ratio (4/5 rule, 29 CFR § 1607.4(D)) flagged for potential adverse impact",
    "Auditor completed written audit report documenting methodology, data sources, selection rates, and impact ratios",
    "Auditor certified no financial conflict of interest with employer or AEDT vendor/developer",
  ];
  execChecks.forEach((check) => {
    y = addFormCheckbox(doc, `exec_${cbIdx}`, check, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // ── Phase 3: Post-Audit Publication Requirements ─────────────
  y = addSectionHeader(doc, "Phase 3: Post-Audit Publication (§ 20-871(b)(2))", y);

  const pubChecks = [
    "Published bias audit summary on employer's publicly accessible website (§ 20-871(b)(2))",
    "Summary includes: audit date, name of independent auditor/firm, data period used",
    "Summary includes: sex category with the lowest impact ratio and its impact ratio for each AEDT",
    "Summary includes: race/ethnicity category with the lowest impact ratio and its impact ratio for each AEDT",
    "Summary was posted at least 10 business days before any AEDT use on a candidate or employee (§ 20-871(b)(2))",
    "Summary remains accessible on the employer's website for the duration of AEDT use and for at least one year afterward (Recommended Best Practice — not a statutory mandate)",
    "Link to published summary included in candidate notification materials (Recommended Best Practice)",
  ];
  pubChecks.forEach((check) => {
    y = addFormCheckbox(doc, `pub_${cbIdx}`, check, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // ── Phase 4: Candidate & Employee Notification ───────────────
  y = addSectionHeader(doc, "Phase 4: Candidate/Employee Notification (§ 20-871(a))", y);

  const notifChecks = [
    "Notified each candidate and employee at least 10 business days before AEDT is used on them (§ 20-871(a)(1))",
    "Notification includes: the fact that an AEDT will be used in the hiring or promotion decision",
    "Notification includes: the job qualifications or characteristics the AEDT uses (§ 20-871(a)(1))",
    "Notification method documented (email, job posting, in-person notice, or other written format)",
    "Notification records retained (Recommended Best Practice: at least 4 years)",
    "Candidates/employees informed of right to request an alternative selection process (§ 20-871(a)(2))",
  ];
  notifChecks.forEach((check) => {
    y = addFormCheckbox(doc, `notif_${cbIdx}`, check, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // ── Phase 5: Data Retention & Ongoing Compliance ─────────────
  y = addSectionHeader(doc, "Phase 5: Data Retention & Ongoing Compliance", y);

  const retentionChecks = [
    "Full bias audit report retained in secure storage (Recommended Best Practice: at least 4 years)",
    "Candidate/employee notification records retained",
    "Alternative process requests and responses documented and retained",
    "Data retention policy disclosed to candidates/employees who submit written request within 30 days (§ 20-871(b)(3))",
    "Annual review scheduled — next audit must occur within one year of this audit date (§ 20-871(b)(1))",
    "AEDT vendor/developer agreement reviewed for audit cooperation and data access provisions",
  ];
  retentionChecks.forEach((check) => {
    y = addFormCheckbox(doc, `ret_${cbIdx}`, check, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // ── Audit Summary Fields ─────────────────────────────────────
  y = addSectionHeader(doc, "Audit Record", y);
  y = addFormTextField(doc, "audit_aedt_name", "AEDT Name/System:", y, {
    prefill: data.aiSystems[0]?.name || "",
    readOnly: false,
  });
  y = addFormTextField(doc, "audit_date", "Date of Bias Audit:", y);
  y = addFormTextField(doc, "audit_auditor", "Independent Auditor Name/Firm:", y);
  y = addFormTextField(doc, "audit_next_due", "Next Audit Due (within 1 year):", y);
  y = addFormTextField(doc, "audit_summary_url", "URL of Published Audit Summary:", y);
  y += LINE_HEIGHT;

  y = addSectionHeader(doc, "Checklist Certification", y);
  y = addWrappedText(
    doc,
    `I certify that ${data.company.name} has completed or is on track to complete all applicable requirements above for the bias audit cycle documented here.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "cert_name", "Completed By (Name/Title):", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "cert_date", "Date:", y);
  y = addFormTextField(doc, "cert_signature", "Signature:", y);

  addDisclaimer(doc);
  return doc;
}
