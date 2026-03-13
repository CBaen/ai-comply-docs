import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "./pdf-types";
import {
  MARGIN, CONTENT_WIDTH, LINE_HEIGHT, BODY_SIZE,
  addDocHeader, addTopDisclaimer, addSectionHeader,
  addWrappedText, addFormTextField, addFormCheckbox, addDisclaimer,
  DATA_INPUT_LABELS,
} from "./pdf-helpers";

// Stub — Colorado generators will be completed by background agent.
// Each function creates a basic PDF with the document title.

function stubDoc(title: string, data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, title, data);
  y = addTopDisclaimer(doc, y);
  y = addSectionHeader(doc, "Document Content", y);
  y = addWrappedText(doc, `This ${title} document for ${data.company.name} is being generated.`, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
  void BODY_SIZE; void addFormTextField; void addFormCheckbox; void DATA_INPUT_LABELS;
  addDisclaimer(doc);
  return doc;
}

export function generateCORiskManagementPolicy(data: ComplianceFormData): jsPDF {
  return stubDoc("Risk Management Policy & Program", data);
}
export function generateCOImpactAssessment(data: ComplianceFormData): jsPDF {
  return stubDoc("High-Risk AI Impact Assessment", data);
}
export function generateCOConsumerNotice(data: ComplianceFormData): jsPDF {
  return stubDoc("Consumer Pre-Decision Notice & AI Disclosure", data);
}
export function generateCOAdverseDecisionKit(data: ComplianceFormData): jsPDF {
  return stubDoc("Adverse Decision Response Kit", data);
}
export function generateCOTransparencyStatement(data: ComplianceFormData): jsPDF {
  return stubDoc("Public Transparency Statement", data);
}
export function generateCOIncidentResponse(data: ComplianceFormData): jsPDF {
  return stubDoc("Algorithmic Discrimination Incident Response Plan", data);
}
export function generateCORecordRetention(data: ComplianceFormData): jsPDF {
  return stubDoc("Record Retention Policy", data);
}
export function generateCOComplianceChecklist(data: ComplianceFormData): jsPDF {
  return stubDoc("Comprehensive Compliance Checklist", data);
}
