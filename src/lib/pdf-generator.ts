import type { ComplianceFormData, GeneratedDoc } from "./pdf-types";

export async function generateDocuments(
  data: ComplianceFormData
): Promise<GeneratedDoc[]> {
  const companySlug = data.company.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 30);

  if (data.regulation === "ai-incident-response-plan") {
    const ir = await import("./pdf-incident-response");
    const docs: GeneratedDoc[] = [
      {
        doc: ir.generateAIIncidentResponsePlan(data),
        name: `${companySlug}_AI_Incident_Response_Plan.pdf`,
      },
      {
        doc: ir.generateClassificationMatrix(data),
        name: `${companySlug}_Incident_Classification_Matrix.pdf`,
      },
      {
        doc: ir.generateIncidentReportTemplate(data),
        name: `${companySlug}_Incident_Report_Template.pdf`,
      },
      {
        doc: ir.generatePostIncidentReview(data),
        name: `${companySlug}_Post_Incident_Review_Checklist.pdf`,
      },
    ];
    return docs;
  }

  if (data.regulation === "colorado-sb24-205") {
    const co = await import("./pdf-colorado");
    const docs: GeneratedDoc[] = [
      {
        doc: co.generateCORiskManagementPolicy(data),
        name: `${companySlug}_CO_Risk_Management_Policy.pdf`,
      },
      {
        doc: co.generateCOImpactAssessment(data),
        name: `${companySlug}_CO_Impact_Assessment.pdf`,
      },
      {
        doc: co.generateCOConsumerNotice(data),
        name: `${companySlug}_CO_Consumer_Notice.pdf`,
      },
      {
        doc: co.generateCOAdverseDecisionKit(data),
        name: `${companySlug}_CO_Adverse_Decision_Kit.pdf`,
      },
      {
        doc: co.generateCOTransparencyStatement(data),
        name: `${companySlug}_CO_Transparency_Statement.pdf`,
      },
      {
        doc: co.generateCOIncidentResponse(data),
        name: `${companySlug}_CO_Incident_Response.pdf`,
      },
      {
        doc: co.generateCORecordRetention(data),
        name: `${companySlug}_CO_Record_Retention.pdf`,
      },
      {
        doc: co.generateCOComplianceChecklist(data),
        name: `${companySlug}_CO_Compliance_Checklist.pdf`,
      },
    ];
    return docs;
  }

  // Default: Illinois
  const il = await import("./pdf-illinois");
  const docs: GeneratedDoc[] = [
    {
      doc: il.generateNotificationLetter(data),
      name: `${companySlug}_AI_Notification_Letter.pdf`,
    },
    {
      doc: il.generateSystemInventory(data),
      name: `${companySlug}_AI_System_Inventory.pdf`,
    },
    {
      doc: il.generateImpactAssessment(data),
      name: `${companySlug}_Impact_Assessment.pdf`,
    },
    {
      doc: il.generateOversightProtocol(data),
      name: `${companySlug}_Oversight_Protocol.pdf`,
    },
    {
      doc: il.generateComplianceChecklist(data),
      name: `${companySlug}_Compliance_Checklist.pdf`,
    },
    {
      doc: il.generateAccommodationForm(data),
      name: `${companySlug}_Accommodation_Request_Form.pdf`,
    },
  ];

  if (data.includeTrainingKit) {
    docs.push(
      {
        doc: il.generateManagerTraining(data),
        name: `${companySlug}_Manager_Training_Slides.pdf`,
      },
      {
        doc: il.generateEmployeeFAQ(data),
        name: `${companySlug}_Employee_FAQ.pdf`,
      }
    );
  }

  return docs;
}
