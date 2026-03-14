import type { ComplianceFormData, GeneratedDoc } from "./pdf-types";

export async function generateDocuments(
  data: ComplianceFormData
): Promise<GeneratedDoc[]> {
  const companySlug = data.company.name
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 30);

  if (data.regulation === "employee-ai-policy") {
    const emp = await import("./pdf-employee-ai-policy");
    return [
      {
        doc: emp.generateAcceptableUsePolicy(data),
        name: `${companySlug}_AI_Acceptable_Use_Policy.pdf`,
      },
      {
        doc: emp.generateTrainingAcknowledgment(data),
        name: `${companySlug}_AI_Training_Acknowledgment.pdf`,
      },
      {
        doc: emp.generateIncidentReportingForm(data),
        name: `${companySlug}_AI_Incident_Reporting_Form.pdf`,
      },
    ];
  }

  if (data.regulation === "vendor-ai-due-diligence") {
    const vdd = await import("./pdf-vendor-due-diligence");
    return [
      {
        doc: vdd.generateVendorQuestionnaire(data),
        name: `${companySlug}_Vendor_AI_Due_Diligence_Questionnaire.pdf`,
      },
      {
        doc: vdd.generateContractAddendum(data),
        name: `${companySlug}_AI_Vendor_Contract_Addendum.pdf`,
      },
      {
        doc: vdd.generateVendorRiskAssessment(data),
        name: `${companySlug}_Vendor_Risk_Assessment.pdf`,
      },
      {
        doc: vdd.generateMonitoringChecklist(data),
        name: `${companySlug}_Vendor_Monitoring_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "ai-bias-audit-template") {
    const ba = await import("./pdf-bias-audit");
    return [
      {
        doc: ba.generateBiasAuditReport(data),
        name: `${companySlug}_Bias_Audit_Report.pdf`,
      },
      {
        doc: ba.generateImpactRatioWorksheet(data),
        name: `${companySlug}_Impact_Ratio_Worksheet.pdf`,
      },
      {
        doc: ba.generateRemediationPlan(data),
        name: `${companySlug}_Remediation_Plan.pdf`,
      },
    ];
  }

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

  if (data.regulation === "texas-tdpsa") {
    const tx = await import("./pdf-texas-tdpsa");
    return [
      {
        doc: tx.generateDataProtectionAssessment(data),
        name: `${companySlug}_TX_Data_Protection_Assessment.pdf`,
      },
      {
        doc: tx.generatePrivacyNotice(data),
        name: `${companySlug}_TX_Privacy_Notice.pdf`,
      },
      {
        doc: tx.generateDataProcessingAgreement(data),
        name: `${companySlug}_TX_Data_Processing_Agreement.pdf`,
      },
    ];
  }

  if (data.regulation === "delaware-pdpa") {
    const de = await import("./pdf-delaware-pdpa");
    return [
      {
        doc: de.generateDataProtectionAssessment(data),
        name: `${companySlug}_DE_Data_Protection_Assessment.pdf`,
      },
      {
        doc: de.generatePrivacyNotice(data),
        name: `${companySlug}_DE_Privacy_Notice.pdf`,
      },
      {
        doc: de.generateUniversalOptOut(data),
        name: `${companySlug}_DE_Universal_Opt_Out_Documentation.pdf`,
      },
      {
        doc: de.generateDataProcessingAgreement(data),
        name: `${companySlug}_DE_Data_Processing_Agreement.pdf`,
      },
    ];
  }

  if (data.regulation === "multi-state-profiling-assessment") {
    const msp = await import("./pdf-multi-state-profiling");
    return [
      {
        doc: msp.generateMultiStateAssessment(data),
        name: `${companySlug}_MultiState_Data_Protection_Assessment.pdf`,
      },
      {
        doc: msp.generateStateComparisonMatrix(data),
        name: `${companySlug}_MultiState_State_Comparison_Matrix.pdf`,
      },
      {
        doc: msp.generateThresholdAnalysis(data),
        name: `${companySlug}_MultiState_Threshold_Analysis_Worksheet.pdf`,
      },
      {
        doc: msp.generateMultiStatePrivacyNotice(data),
        name: `${companySlug}_MultiState_Privacy_Notice_Template.pdf`,
      },
      {
        doc: msp.generateComplianceChecklist(data),
        name: `${companySlug}_MultiState_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "multi-state-employer-ai-disclosure") {
    const mse = await import("./pdf-multi-state-employer-ai");
    return [
      {
        doc: mse.generateComplianceMatrix(data),
        name: `${companySlug}_Employer_Multi_Jurisdiction_Compliance_Matrix.pdf`,
      },
      {
        doc: mse.generateUnifiedNotification(data),
        name: `${companySlug}_Employer_Unified_Employee_Candidate_Notification.pdf`,
      },
      {
        doc: mse.generateStateAddenda(data),
        name: `${companySlug}_Employer_State_Specific_Addenda.pdf`,
      },
      {
        doc: mse.generateBiasAuditCrossRef(data),
        name: `${companySlug}_Employer_Bias_Audit_Cross_Reference_Guide.pdf`,
      },
      {
        doc: mse.generateRecordRetentionPolicy(data),
        name: `${companySlug}_Employer_Multi_State_Record_Retention_Policy.pdf`,
      },
    ];
  }

  if (data.regulation === "minnesota-mcdpa") {
    const mn = await import("./pdf-minnesota-mcdpa");
    return [
      {
        doc: mn.generatePrivacyNotice(data),
        name: `${companySlug}_MN_Privacy_Notice.pdf`,
      },
      {
        doc: mn.generateDPIA(data),
        name: `${companySlug}_MN_Data_Protection_Assessment.pdf`,
      },
      {
        doc: mn.generateConsumerRightsProcedures(data),
        name: `${companySlug}_MN_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: mn.generateProfilingOptOut(data),
        name: `${companySlug}_MN_Profiling_Opt_Out.pdf`,
      },
      {
        doc: mn.generateDataProcessingAgreement(data),
        name: `${companySlug}_MN_Data_Processing_Agreement.pdf`,
      },
      {
        doc: mn.generateComplianceChecklist(data),
        name: `${companySlug}_MN_Compliance_Checklist.pdf`,
      },
    ];
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

  if (data.regulation === "nyc-local-law-144") {
    const nyc = await import("./pdf-nyc-ll144");
    return [
      {
        doc: nyc.generateBiasAuditSummary(data),
        name: `${companySlug}_NYC_LL144_Bias_Audit_Summary.pdf`,
      },
      {
        doc: nyc.generateCandidateNotification(data),
        name: `${companySlug}_NYC_LL144_Candidate_Notification.pdf`,
      },
      {
        doc: nyc.generateBiasAuditReport(data),
        name: `${companySlug}_NYC_LL144_Bias_Audit_Report.pdf`,
      },
      {
        doc: nyc.generateBiasAuditChecklist(data),
        name: `${companySlug}_NYC_LL144_Bias_Audit_Checklist.pdf`,
      },
      {
        doc: nyc.generateDataRetentionDisclosure(data),
        name: `${companySlug}_NYC_LL144_Data_Retention_Disclosure.pdf`,
      },
      {
        doc: nyc.generateAlternativeProcessDocumentation(data),
        name: `${companySlug}_NYC_LL144_Alternative_Process_Documentation.pdf`,
      },
      {
        doc: nyc.generateDataRetentionPolicy(data),
        name: `${companySlug}_NYC_LL144_Data_Retention_Policy.pdf`,
      },
    ];
  }

  if (data.regulation === "eu-ai-act") {
    const eu = await import("./pdf-eu-ai-act");
    return [
      {
        doc: eu.generateRiskManagementSystem(data),
        name: `${companySlug}_EU_Risk_Management_System.pdf`,
      },
      {
        doc: eu.generateTechnicalDocumentation(data),
        name: `${companySlug}_EU_Technical_Documentation.pdf`,
      },
      {
        doc: eu.generateConformityAssessment(data),
        name: `${companySlug}_EU_Conformity_Assessment.pdf`,
      },
      {
        doc: eu.generateDataGovernance(data),
        name: `${companySlug}_EU_Data_Governance.pdf`,
      },
      {
        doc: eu.generateQualityManagementSystem(data),
        name: `${companySlug}_EU_Quality_Management_System.pdf`,
      },
      {
        doc: eu.generateHumanOversight(data),
        name: `${companySlug}_EU_Human_Oversight_Design.pdf`,
      },
      {
        doc: eu.generateTransparencyDisclosures(data),
        name: `${companySlug}_EU_Transparency_Disclosures.pdf`,
      },
      {
        doc: eu.generatePostMarketMonitoring(data),
        name: `${companySlug}_EU_Post_Market_Monitoring.pdf`,
      },
      {
        doc: eu.generateEUDatabaseRegistration(data),
        name: `${companySlug}_EU_Database_Registration.pdf`,
      },
      {
        doc: eu.generateFundamentalRightsImpact(data),
        name: `${companySlug}_EU_Fundamental_Rights_Impact.pdf`,
      },
    ];
  }

  if (data.regulation === "eeoc-ai-hiring") {
    const eeoc = await import("./pdf-eeoc-ai-hiring");
    return [
      {
        doc: eeoc.generateAdverseImpactAnalysis(data),
        name: `${companySlug}_EEOC_Adverse_Impact_Analysis.pdf`,
      },
      {
        doc: eeoc.generateValidationDocumentation(data),
        name: `${companySlug}_EEOC_Validation_Documentation.pdf`,
      },
      {
        doc: eeoc.generateAccommodationProcedures(data),
        name: `${companySlug}_EEOC_Accommodation_Procedures.pdf`,
      },
      {
        doc: eeoc.generateVendorAIAuditRequirements(data),
        name: `${companySlug}_EEOC_Vendor_AI_Audit_Requirements.pdf`,
      },
      {
        doc: eeoc.generateAIHiringMonitoring(data),
        name: `${companySlug}_EEOC_AI_Hiring_Monitoring.pdf`,
      },
      {
        doc: eeoc.generateAnnualComplianceReview(data),
        name: `${companySlug}_EEOC_Annual_Compliance_Review.pdf`,
      },
    ];
  }

  if (data.regulation === "california-ccpa-admt") {
    const ca = await import("./pdf-california-ccpa-admt");
    return [
      {
        doc: ca.generatePreUseNotice(data),
        name: `${companySlug}_CA_Pre_Use_Notice.pdf`,
      },
      {
        doc: ca.generateADMTRiskAssessment(data),
        name: `${companySlug}_CA_ADMT_Risk_Assessment.pdf`,
      },
      {
        doc: ca.generateOptOutDocumentation(data),
        name: `${companySlug}_CA_Opt_Out_Documentation.pdf`,
      },
      {
        doc: ca.generateConsumerAccessProcedures(data),
        name: `${companySlug}_CA_Consumer_Access_Procedures.pdf`,
      },
      {
        doc: ca.generateHumanReviewProcess(data),
        name: `${companySlug}_CA_Human_Review_Process.pdf`,
      },
      {
        doc: ca.generateADMTImpactAssessment(data),
        name: `${companySlug}_CA_ADMT_Impact_Assessment.pdf`,
      },
    ];
  }

  if (data.regulation === "nist-ai-rmf") {
    const nist = await import("./pdf-nist-ai-rmf");
    return [
      {
        doc: nist.generateAIRiskManagementPlan(data),
        name: `${companySlug}_NIST_RMF_Risk_Management_Plan.pdf`,
      },
      {
        doc: nist.generateGovernDocumentation(data),
        name: `${companySlug}_NIST_RMF_Govern_Documentation.pdf`,
      },
      {
        doc: nist.generateMapDocumentation(data),
        name: `${companySlug}_NIST_RMF_Map_Documentation.pdf`,
      },
      {
        doc: nist.generateMeasureDocumentation(data),
        name: `${companySlug}_NIST_RMF_Measure_Documentation.pdf`,
      },
      {
        doc: nist.generateManageDocumentation(data),
        name: `${companySlug}_NIST_RMF_Manage_Documentation.pdf`,
      },
      {
        doc: nist.generateRiskProfileTemplate(data),
        name: `${companySlug}_NIST_RMF_Risk_Profile_Template.pdf`,
      },
      {
        doc: nist.generateTrustworthyAIAssessment(data),
        name: `${companySlug}_NIST_RMF_Trustworthy_AI_Assessment.pdf`,
      },
    ];
  }

  if (data.regulation === "healthcare-ai-compliance") {
    const hc = await import("./pdf-healthcare-ai");
    return [
      {
        doc: hc.generateAIRiskAssessment(data),
        name: `${companySlug}_HIPAA_AI_Risk_Assessment.pdf`,
      },
      {
        doc: hc.generateBusinessAssociateAgreement(data),
        name: `${companySlug}_HIPAA_Business_Associate_Agreement.pdf`,
      },
      {
        doc: hc.generateSecurityPolicies(data),
        name: `${companySlug}_HIPAA_AI_Security_Policies.pdf`,
      },
      {
        doc: hc.generateBreachNotification(data),
        name: `${companySlug}_HIPAA_Breach_Notification_Procedures.pdf`,
      },
      {
        doc: hc.generateDeIdentificationMethodology(data),
        name: `${companySlug}_HIPAA_De_Identification_Methodology.pdf`,
      },
      {
        doc: hc.generatePatientRightsProcedures(data),
        name: `${companySlug}_HIPAA_Patient_Rights_Procedures.pdf`,
      },
      {
        doc: hc.generateHIPAAComplianceChecklist(data),
        name: `${companySlug}_HIPAA_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "financial-services-ai") {
    const fin = await import("./pdf-financial-services-ai");
    return [
      {
        doc: fin.generateSupervisionPolicy(data),
        name: `${companySlug}_FinServ_AI_Supervision_Policy.pdf`,
      },
      {
        doc: fin.generateModelRiskDocumentation(data),
        name: `${companySlug}_FinServ_Model_Risk_Documentation.pdf`,
      },
      {
        doc: fin.generateAdverseActionNotice(data),
        name: `${companySlug}_FinServ_ECOA_Adverse_Action_Notice.pdf`,
      },
      {
        doc: fin.generateCustomerDisclosure(data),
        name: `${companySlug}_FinServ_Customer_AI_Disclosure.pdf`,
      },
      {
        doc: fin.generateVendorDueDiligenceFinancial(data),
        name: `${companySlug}_FinServ_Vendor_Due_Diligence.pdf`,
      },
      {
        doc: fin.generateFinancialServicesChecklist(data),
        name: `${companySlug}_FinServ_Annual_AI_Review_Checklist.pdf`,
      },
      {
        doc: fin.generateCFPBUDAAPCompliance(data),
        name: `${companySlug}_FinServ_CFPB_UDAAP_Compliance.pdf`,
      },
    ];
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
