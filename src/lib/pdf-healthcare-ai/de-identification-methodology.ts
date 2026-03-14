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
// DOCUMENT 5: De-Identification Methodology Documentation
// HIPAA Privacy Rule — 45 CFR § 164.514(a)-(c)
// ============================================================
export function generateDeIdentificationMethodology(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "De-Identification Methodology Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document describes the de-identification methodology used by ${data.company.name} when AI systems process, train on, or produce output from protected health information (PHI). HIPAA permits use and disclosure of de-identified health information without authorization (45 CFR \u00A7 164.514(a)). Two methods of de-identification are recognized: Expert Determination (45 CFR \u00A7 164.514(b)) and Safe Harbor (45 CFR \u00A7 164.514(b)(2)). De-identified information is not PHI and is not subject to the HIPAA Privacy or Security Rules.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: De-Identification Method Selection
  y = addSectionHeader(doc, "1. De-Identification Method Selection", y);
  y = addWrappedText(
    doc,
    "Select and document the de-identification method applied for each AI use case:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const methods = [
    "Expert Determination \u2014 45 CFR \u00A7 164.514(b)(1): A qualified statistical or scientific expert applies generally accepted principles to determine that the risk of identifying an individual is very small",
    "Safe Harbor \u2014 45 CFR \u00A7 164.514(b)(2): All 18 HIPAA Safe Harbor identifiers are removed and the covered entity has no actual knowledge that the remaining information could identify an individual",
  ];
  let cbIdx = 0;
  methods.forEach((method) => {
    y = addFormCheckbox(doc, `method_${cbIdx}`, method, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 2: Safe Harbor — 18 Identifiers Checklist
  y = addSectionHeader(doc, "2. Safe Harbor \u2014 18 HIPAA Identifiers Removal Checklist (45 CFR \u00A7 164.514(b)(2))", y);
  y = addWrappedText(
    doc,
    "Check each identifier to confirm it has been removed or transformed prior to AI processing. All 18 must be removed for Safe Harbor de-identification.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const identifiers = [
    "(1) Names",
    "(2) Geographic subdivisions smaller than state (e.g., street address, city, county, zip code except first 3 digits if >20,000 population)",
    "(3) All elements of dates (except year) for individuals 90 or older, including birth date, admission/discharge date, death date",
    "(4) Phone numbers",
    "(5) Fax numbers",
    "(6) Email addresses",
    "(7) Social Security numbers",
    "(8) Medical record numbers",
    "(9) Health plan beneficiary numbers",
    "(10) Account numbers",
    "(11) Certificate/license numbers",
    "(12) Vehicle identifiers and serial numbers including license plates",
    "(13) Device identifiers and serial numbers",
    "(14) Web URLs",
    "(15) IP addresses",
    "(16) Biometric identifiers (finger and voice prints)",
    "(17) Full face photographic images and comparable images",
    "(18) Any other unique identifying number, characteristic, or code",
  ];
  identifiers.forEach((id) => {
    y = addFormCheckbox(doc, `id_${cbIdx}`, id, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 3: Expert Determination Documentation
  y = addSectionHeader(doc, "3. Expert Determination Documentation (45 CFR \u00A7 164.514(b)(1))", y);
  y = addWrappedText(
    doc,
    "Complete this section when Expert Determination method is used. Expert must have relevant knowledge and experience in statistical and scientific principles.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormTextField(doc, "expert_name", "Expert Name:", y, { width: 120 });
  y = addFormTextField(doc, "expert_credentials", "Expert Credentials/Qualifications:", y, { width: 140 });
  y = addFormTextField(doc, "expert_org", "Expert Organization:", y, { width: 120 });
  y = addFormTextField(doc, "expert_date", "Expert Determination Date:", y, { width: 80 });
  y = addFormTextField(doc, "expert_reidentification_risk", "Expert\u2019s Assessment of Re-identification Risk (must be \u201Cvery small\u201D):", y, { multiline: true, lines: 3 });
  y = addFormTextField(doc, "expert_method", "Statistical/Scientific Methods Applied:", y, { multiline: true, lines: 3 });
  y += LINE_HEIGHT;

  // Section 4: AI Training Data De-Identification
  y = addSectionHeader(doc, "4. AI Training Data De-Identification", y);
  y = addWrappedText(
    doc,
    "Document how de-identification is applied to data used to train, validate, or test AI models:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const trainingItems = [
    "All training data sourced from PHI has been de-identified prior to use in AI model training",
    "De-identification applied before data is transmitted to AI vendor or cloud environment",
    "BAA or data use agreement in place for any training data that contains residual PHI after de-identification",
    "De-identification process validated before first use and after any changes to source data schema",
    "Re-identification testing conducted on de-identified training datasets",
    "AI model trained on de-identified data does not produce outputs that could re-identify individuals",
    "Model outputs reviewed to ensure they do not inadvertently reveal PHI from training data",
    "Synthetic data generation considered as an alternative where de-identification is technically difficult",
  ];
  trainingItems.forEach((item) => {
    y = addFormCheckbox(doc, `training_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 5: Re-identification Risk Controls
  y = addSectionHeader(doc, "5. Re-Identification Risk Controls", y);
  y = addWrappedText(
    doc,
    "45 CFR \u00A7 164.514(c) prohibits covered entities from combining de-identified information with other data to re-identify individuals. Document controls:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  const reidentItems = [
    "Data use agreements prohibit re-identification of de-identified data shared with AI vendors",
    "Controls in place to prevent AI system from linking de-identified records to external databases",
    "AI system outputs monitored for re-identification risk (e.g., small cell sizes, outlier values)",
    "Any re-identification of de-identified data triggers HIPAA breach analysis",
    "Workforce trained on prohibition against re-identification (45 CFR \u00A7 164.514(c))",
    "Annual review of de-identification methodology conducted to address advances in re-identification techniques",
  ];
  reidentItems.forEach((item) => {
    y = addFormCheckbox(doc, `reid_${cbIdx}`, item, y);
    cbIdx++;
  });
  y += LINE_HEIGHT;

  // Section 6: Validation and Review
  y = addSectionHeader(doc, "6. Validation and Ongoing Review", y);
  y = addFormTextField(doc, "validation_date", "Last De-Identification Validation Date:", y, { width: 80 });
  y = addFormTextField(doc, "validation_by", "Validated By:", y, { width: 120 });
  y = addFormTextField(doc, "next_review", "Next Scheduled Review Date:", y, { width: 80 });
  y = addFormTextField(doc, "validation_method", "Validation Method Used:", y, { multiline: true, lines: 2 });

  y = addSectionHeader(doc, "Methodology Approval", y);
  y = addFormTextField(doc, "approved_by", "Privacy Officer:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "approved_date", "Approval Date:", y);
  y = addFormTextField(doc, "counsel_review", "Legal Counsel Review (Name/Firm):", y);

  addDisclaimer(doc);
  return doc;
}
