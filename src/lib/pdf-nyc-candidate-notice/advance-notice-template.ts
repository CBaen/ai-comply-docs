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
} from "../pdf-helpers";

// ============================================================
// NYC AEDT 10-Business-Day Advance Notice Template
// NYC Admin. Code § 20-871(b)(1)
// ============================================================
export function generateAdvanceNoticeTemplate(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "AEDT 10-Business-Day Advance Notice Template (§20-871(b)(1))",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This template produces the advance notice required by NYC Admin. Code §20-871(b)(1). Employers and employment agencies must notify candidates or employees at least 10 business days before using an Automated Employment Decision Tool (AEDT) on that individual. The notice must be provided through the job posting or other written means. Verify current DCWP requirements at nyc.gov/dcwp.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: Notice Configuration
  y = addSectionHeader(doc, "1. Notice Configuration — Internal Use", y);
  y = addWrappedText(
    doc,
    "Complete this section to configure the notice before distributing it to candidates or posting it in the job listing. This section is for internal records only — the consumer-facing notice starts in Section 2.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "ant_company", "Company Name:", y, {
    prefill: data.company.name,
    readOnly: true,
    width: 150,
  });
  y = addFormTextField(
    doc,
    "ant_aedt_name",
    "AEDT System Name:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].name
          : "",
      width: 150,
    }
  );
  y = addFormTextField(
    doc,
    "ant_aedt_vendor",
    "AEDT Vendor / Developer:",
    y,
    {
      prefill:
        data.aiSystems && data.aiSystems.length > 0
          ? data.aiSystems[0].vendor
          : "",
      width: 150,
    }
  );
  y = addFormTextField(
    doc,
    "ant_role",
    "Job Role(s) for Which AEDT Will Be Used:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "ant_notice_date",
    "Date Notice Is Sent / Posted (must be at least 10 business days before AEDT is used):",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "ant_earliest_aedt_use",
    "Earliest Date AEDT May Be Used on This Candidate (10 business days after notice date):",
    y,
    { width: 80 }
  );
  y += LINE_HEIGHT;

  // Section 2: Consumer-Facing Notice Text
  y = addSectionHeader(
    doc,
    "2. Notice to Candidate / Employee (§20-871(b)(1))",
    y
  );
  y = addWrappedText(
    doc,
    "The following is the notice text to be provided to the candidate. Configure the bracketed fields before distributing:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 6;

  // Draw notice box
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.5);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 5);
  doc.setFillColor(245, 245, 245);
  doc.rect(MARGIN, y, CONTENT_WIDTH, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    "NOTICE: Use of Automated Employment Decision Tool",
    MARGIN + 4,
    y + 3.5
  );
  doc.setFont("helvetica", "normal");
  y += 7;

  y = addWrappedText(
    doc,
    `${data.company.name} uses an automated employment decision tool (AEDT) as part of its selection process for the position(s) you have applied for or are being considered for. We are providing this notice at least 10 business days before using the AEDT in our evaluation of your application, as required by New York City Local Law 144 (NYC Admin. Code § 20-871(b)(1)).`,
    MARGIN + 4,
    y,
    CONTENT_WIDTH - 8,
    LINE_HEIGHT
  );
  y += 4;

  y = addFormTextField(
    doc,
    "ant_aedt_description",
    "Description of the AEDT Being Used (plain language — what the tool does):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "ant_qualifications_assessed",
    "Job Qualifications and Characteristics the AEDT Assesses (list each):",
    y,
    { multiline: true, lines: 3 }
  );
  y += LINE_HEIGHT;

  // Section 3: Alternative Selection Process Instructions
  y = addSectionHeader(
    doc,
    "3. Instructions for Requesting an Alternative Selection Process (§20-871(b)(1))",
    y
  );
  y = addWrappedText(
    doc,
    "Per §20-871(b)(1), the advance notice must include instructions for requesting an alternative selection process or reasonable accommodation. Include this language in the notice:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 6;

  y = addWrappedText(
    doc,
    "If you would prefer not to be evaluated using this automated tool, or if you require an accommodation due to a disability, you may request an alternative selection process or accommodation by:",
    MARGIN + 4,
    y,
    CONTENT_WIDTH - 8,
    LINE_HEIGHT
  );
  y += 4;

  const requestMethods = [
    "Submitting a written request to HR at the contact information below",
    "Emailing the HR contact below at least 5 business days before your evaluation",
    "Calling the HR department at the number below",
    "Indicating your request in your application portal",
  ];
  requestMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `ant_req_method_${idx}`, method, y);
  });

  y = addFormTextField(
    doc,
    "ant_alt_contact_name",
    "Alternative Process Request Contact — Name / Role:",
    y,
    { width: 150 }
  );
  y = addFormTextField(
    doc,
    "ant_alt_contact_email",
    "Alternative Process Request Contact — Email:",
    y,
    { prefill: data.contact.email || "", width: 150 }
  );
  y = addFormTextField(
    doc,
    "ant_alt_contact_phone",
    "Alternative Process Request Contact — Phone:",
    y,
    { prefill: data.contact.phone || "", width: 100 }
  );
  y = addFormTextField(
    doc,
    "ant_alt_request_deadline",
    "Deadline for Submitting Alternative Process Request (e.g., at least 5 business days before evaluation):",
    y,
    { width: 110 }
  );
  y += LINE_HEIGHT;

  // Section 4: Delivery Method
  y = addSectionHeader(doc, "4. Notice Delivery Method", y);
  y = addWrappedText(
    doc,
    "Document how this notice was or will be delivered:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const deliveryMethods = [
    "Included in the job posting (publicly visible)",
    "Emailed directly to candidate(s)",
    "Provided in applicant tracking system (ATS) application flow",
    "Provided in-person or via physical mail",
    "Posted in the workplace (for current employee evaluations)",
  ];
  deliveryMethods.forEach((method, idx) => {
    y = addFormCheckbox(doc, `ant_delivery_${idx}`, method, y);
  });
  y = addFormTextField(
    doc,
    "ant_delivery_notes",
    "Delivery Confirmation Notes (e.g., email sent to X candidates on [date]):",
    y,
    { multiline: true, lines: 2 }
  );

  addDisclaimer(doc);
  return doc;
}
