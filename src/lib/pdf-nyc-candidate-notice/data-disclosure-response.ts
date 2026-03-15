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
// NYC AEDT Data Disclosure Response — 30-Day Response Template
// NYC Admin. Code § 20-871(b)(3)
// ============================================================
export function generateDataDisclosureResponse(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "AEDT Data Disclosure Response Template (§20-871(b)(3))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template documents ${data.company.name}'s response to a candidate or employee's written request for information about AEDT data collection, data sources, and data retention, as required by NYC Admin. Code §20-871(b)(3). The business must respond to such requests within 30 calendar days. Complete one form per request. Retain for a minimum of 3 years per DCWP rules. Verify current DCWP requirements at nyc.gov/dcwp.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Request Tracking
  y = addSectionHeader(doc, "1. Request Tracking", y);
  y = addFormTextField(
    doc,
    "ddr_request_id",
    "Request ID / Tracking Number:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddr_candidate_name",
    "Candidate / Employee Full Name:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "ddr_candidate_email",
    "Candidate / Employee Email Address:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "ddr_position",
    "Position Applied For or Employment Role:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "ddr_request_date",
    "Date Written Request Received (Day 0 — start of 30-day clock):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ddr_deadline_30",
    "30-Day Response Deadline (due by this date):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ddr_aedt_name",
    "AEDT the Request Is About:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
      width: 150,
    }
  );
  y += LINE_HEIGHT;

  // Section 2: Data Types Collected (§20-871(b)(3)(i))
  y = addSectionHeader(
    doc,
    "2. Data Types Collected by the AEDT (§20-871(b)(3)(i))",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-871(b)(3)(i), the response must identify each type of data the AEDT collects about candidates. Check all that apply and add specifics:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const dataTypes = [
    "Resume / CV content (work history, education, skills listed)",
    "Application form responses submitted by the candidate",
    "Recorded video interview footage or audio",
    "Written assessment or test responses",
    "Communication samples (email, written exercise)",
    "Digital behavioral signals (mouse movements, keystroke patterns — if applicable)",
    "Third-party background or credential data",
    "Social media or professional profile data (if used)",
    "Demographic information (only where lawfully collected)",
  ];
  dataTypes.forEach((type, idx) => {
    y = addFormCheckbox(doc, `ddr_data_type_${idx}`, type, y);
  });
  y = addFormTextField(
    doc,
    "ddr_data_types_other",
    "Additional Data Types Collected (describe):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Data Sources (§20-871(b)(3)(ii))
  y = addSectionHeader(
    doc,
    "3. Data Sources (§20-871(b)(3)(ii))",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-871(b)(3)(ii), the response must identify each source from which the AEDT collects data about candidates. Check all that apply:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const dataSources = [
    "Information submitted directly by the candidate in the application",
    "Recorded video or audio from the candidate's interview session",
    "Assessment platform where candidate completed test(s)",
    "Background check or third-party screening provider",
    "Publicly available professional profile (e.g., LinkedIn, if used)",
    "Employer's internal records (prior employment history on file)",
    "AEDT vendor's proprietary datasets used for scoring/benchmarking",
  ];
  dataSources.forEach((source, idx) => {
    y = addFormCheckbox(doc, `ddr_source_${idx}`, source, y);
  });
  y = addFormTextField(
    doc,
    "ddr_sources_other",
    "Additional Sources (describe):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 4: Retention Period (§20-871(b)(3)(iii))
  y = addSectionHeader(
    doc,
    "4. Data Retention Period (§20-871(b)(3)(iii))",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-871(b)(3)(iii), the response must state the period for which the employer will retain the data collected by the AEDT. Provide the retention period for each category of data collected:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(
    doc,
    "ddr_retention_application",
    "Application / Resume Data — Retention Period:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddr_retention_video",
    "Video / Audio Interview Data — Retention Period:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddr_retention_assessment",
    "Assessment Results Data — Retention Period:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddr_retention_aedt_output",
    "AEDT Score / Output — Retention Period:",
    y,
    { width: 100 }
  );
  y = addFormTextField(
    doc,
    "ddr_retention_other",
    "Other Data Retention Periods (specify category and period):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ddr_retention_law",
    "Legal Basis for Retention Period (e.g., EEOC recordkeeping, NYC recordkeeping, business need):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 5: Response Sent
  y = addSectionHeader(doc, "5. Response Delivery", y);
  y = addFormTextField(
    doc,
    "ddr_response_sent_date",
    "Date Response Sent to Candidate:",
    y,
    { width: 70 }
  );
  y = addFormTextField(
    doc,
    "ddr_days_elapsed",
    "Total Calendar Days from Request to Response:",
    y,
    { width: 50 }
  );
  y = addWrappedText(
    doc,
    "Response Method:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  const responseMethods = [
    "Email to candidate",
    "Written letter by mail",
    "Secure message through application portal",
  ];
  responseMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `ddr_resp_method_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "ddr_response_staff",
    "Response Sent By (name/role):",
    y,
    { width: 130 }
  );
  y += LINE_HEIGHT;

  // Section 6: Compliance Check
  y = addSectionHeader(doc, "6. Compliance Self-Check", y);
  const complianceChecks = [
    "Response sent within 30 calendar days of receiving the written request (§20-871(b)(3))",
    "Response identified each type of data collected (§20-871(b)(3)(i))",
    "Response identified each source of data (§20-871(b)(3)(ii))",
    "Response stated the retention period for each data category (§20-871(b)(3)(iii))",
    "Response was provided in writing",
    "Request and response retained in records for minimum 3 years",
  ];
  complianceChecks.forEach((check, idx) => {
    y = addFormCheckbox(doc, `ddr_check_${idx}`, check, y);
  });
  y += LINE_HEIGHT;

  y = addSignatureBlock(doc, "ddr", y);

  addDisclaimer(doc);
  return doc;
}
