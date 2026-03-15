import type { ComplianceFormData, GeneratedDoc } from "./pdf-types";

export async function generateDocuments(
  data: ComplianceFormData
): Promise<GeneratedDoc[]> {
  const companySlug = data.company.name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 40)
    .replace(/_$/, "");

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

  if (data.regulation === "virginia-cdpa") {
    const va = await import("./pdf-virginia-cdpa");
    return [
      {
        doc: va.generatePrivacyNotice(data),
        name: `${companySlug}_VA_Privacy_Notice.pdf`,
      },
      {
        doc: va.generateDataProtectionAssessment(data),
        name: `${companySlug}_VA_Data_Protection_Assessment.pdf`,
      },
      {
        doc: va.generateConsumerRightsProcedures(data),
        name: `${companySlug}_VA_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: va.generateOptOutDocumentation(data),
        name: `${companySlug}_VA_Opt_Out_Documentation.pdf`,
      },
      {
        doc: va.generateDataProcessingAgreement(data),
        name: `${companySlug}_VA_Data_Processing_Agreement.pdf`,
      },
      {
        doc: va.generateComplianceChecklist(data),
        name: `${companySlug}_VA_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "connecticut-ctdpa") {
    const ct = await import("./pdf-connecticut-ctdpa");
    return [
      {
        doc: ct.generatePrivacyNotice(data),
        name: `${companySlug}_CT_Privacy_Notice.pdf`,
      },
      {
        doc: ct.generateDataProtectionAssessment(data),
        name: `${companySlug}_CT_Data_Protection_Assessment.pdf`,
      },
      {
        doc: ct.generateConsumerRightsProcedures(data),
        name: `${companySlug}_CT_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: ct.generateOptOutDocumentation(data),
        name: `${companySlug}_CT_Profiling_Opt_Out.pdf`,
      },
      {
        doc: ct.generateDataProcessingAgreement(data),
        name: `${companySlug}_CT_Data_Processing_Agreement.pdf`,
      },
      {
        doc: ct.generateComplianceChecklist(data),
        name: `${companySlug}_CT_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "oregon-cpa") {
    const or = await import("./pdf-oregon-cpa");
    return [
      {
        doc: or.generatePrivacyNotice(data),
        name: `${companySlug}_OR_Privacy_Notice.pdf`,
      },
      {
        doc: or.generateDataProtectionAssessment(data),
        name: `${companySlug}_OR_Data_Protection_Assessment.pdf`,
      },
      {
        doc: or.generateConsumerRightsProcedures(data),
        name: `${companySlug}_OR_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: or.generateOptOutDocumentation(data),
        name: `${companySlug}_OR_Profiling_Opt_Out.pdf`,
      },
      {
        doc: or.generateDataProcessingAgreement(data),
        name: `${companySlug}_OR_Data_Processing_Agreement.pdf`,
      },
      {
        doc: or.generateComplianceChecklist(data),
        name: `${companySlug}_OR_Compliance_Checklist.pdf`,
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

  if (data.regulation === "indiana-icdpa") {
    const in_ = await import("./pdf-indiana-icdpa");
    return [
      {
        doc: in_.generatePrivacyNotice(data),
        name: `${companySlug}_IN_Privacy_Notice.pdf`,
      },
      {
        doc: in_.generateDataProtectionAssessment(data),
        name: `${companySlug}_IN_Data_Protection_Assessment.pdf`,
      },
      {
        doc: in_.generateConsumerRightsProcedures(data),
        name: `${companySlug}_IN_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: in_.generateOptOutDocumentation(data),
        name: `${companySlug}_IN_Opt_Out_Documentation.pdf`,
      },
      {
        doc: in_.generateDataProcessingAgreement(data),
        name: `${companySlug}_IN_Data_Processing_Agreement.pdf`,
      },
      {
        doc: in_.generateComplianceChecklist(data),
        name: `${companySlug}_IN_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "montana-mcdpa") {
    const mt = await import("./pdf-montana-mcdpa");
    return [
      {
        doc: mt.generatePrivacyNotice(data),
        name: `${companySlug}_MT_Privacy_Notice.pdf`,
      },
      {
        doc: mt.generateDataProtectionAssessment(data),
        name: `${companySlug}_MT_Data_Protection_Assessment.pdf`,
      },
      {
        doc: mt.generateConsumerRightsProcedures(data),
        name: `${companySlug}_MT_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: mt.generateOptOutDocumentation(data),
        name: `${companySlug}_MT_Opt_Out_Documentation.pdf`,
      },
      {
        doc: mt.generateDataProcessingAgreement(data),
        name: `${companySlug}_MT_Data_Processing_Agreement.pdf`,
      },
      {
        doc: mt.generateComplianceChecklist(data),
        name: `${companySlug}_MT_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "kentucky-kcdpa") {
    const ky = await import("./pdf-kentucky-kcdpa");
    return [
      {
        doc: ky.generatePrivacyNotice(data),
        name: `${companySlug}_KY_Privacy_Notice.pdf`,
      },
      {
        doc: ky.generateDataProtectionAssessment(data),
        name: `${companySlug}_KY_Data_Protection_Assessment.pdf`,
      },
      {
        doc: ky.generateConsumerRightsProcedures(data),
        name: `${companySlug}_KY_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: ky.generateOptOutDocumentation(data),
        name: `${companySlug}_KY_Opt_Out_Documentation.pdf`,
      },
      {
        doc: ky.generateDataProcessingAgreement(data),
        name: `${companySlug}_KY_Data_Processing_Agreement.pdf`,
      },
      {
        doc: ky.generateComplianceChecklist(data),
        name: `${companySlug}_KY_Compliance_Checklist.pdf`,
      },
    ];
  }

  if (data.regulation === "new-jersey-njdpa") {
    const nj = await import("./pdf-new-jersey-njdpa");
    return [
      {
        doc: nj.generatePrivacyNotice(data),
        name: `${companySlug}_NJ_Privacy_Notice.pdf`,
      },
      {
        doc: nj.generateDataProtectionAssessment(data),
        name: `${companySlug}_NJ_Data_Protection_Assessment.pdf`,
      },
      {
        doc: nj.generateConsumerRightsProcedures(data),
        name: `${companySlug}_NJ_Consumer_Rights_Procedures.pdf`,
      },
      {
        doc: nj.generateOptOutDocumentation(data),
        name: `${companySlug}_NJ_Opt_Out_Documentation.pdf`,
      },
      {
        doc: nj.generateDataProcessingAgreement(data),
        name: `${companySlug}_NJ_Data_Processing_Agreement.pdf`,
      },
      {
        doc: nj.generateComplianceChecklist(data),
        name: `${companySlug}_NJ_Compliance_Checklist.pdf`,
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

  if (data.regulation === "ai-governance-framework") {
    const gov = await import("./pdf-ai-governance-framework");
    return [
      {
        doc: gov.generateGovernancePolicy(data),
        name: `${companySlug}_AI_Governance_Policy.pdf`,
      },
      {
        doc: gov.generateEthicsPrinciples(data),
        name: `${companySlug}_AI_Ethics_Principles.pdf`,
      },
      {
        doc: gov.generateRiskClassificationMatrix(data),
        name: `${companySlug}_AI_Risk_Classification_Matrix.pdf`,
      },
      {
        doc: gov.generateApprovalWorkflow(data),
        name: `${companySlug}_AI_Approval_Workflow.pdf`,
      },
      {
        doc: gov.generateSteeringCommitteeCharter(data),
        name: `${companySlug}_AI_Steering_Committee_Charter.pdf`,
      },
      {
        doc: gov.generateComplianceOfficerRole(data),
        name: `${companySlug}_AI_Compliance_Officer_Role.pdf`,
      },
    ];
  }

  if (data.regulation === "ai-system-registry") {
    const reg = await import("./pdf-ai-system-registry");
    return [
      {
        doc: reg.generateSystemInventory(data),
        name: `${companySlug}_AI_System_Inventory.pdf`,
      },
      {
        doc: reg.generateLifecycleTracker(data),
        name: `${companySlug}_AI_System_Lifecycle_Tracker.pdf`,
      },
    ];
  }

  if (data.regulation === "ai-transparency-report") {
    const tr = await import("./pdf-ai-transparency-report");
    return [
      {
        doc: tr.generateTransparencyReport(data),
        name: `${companySlug}_AI_Transparency_Report.pdf`,
      },
      {
        doc: tr.generatePerformanceMonitoringReport(data),
        name: `${companySlug}_AI_Performance_Monitoring_Report.pdf`,
      },
    ];
  }

  if (data.regulation === "ai-whistleblower-policy") {
    const wb = await import("./pdf-ai-whistleblower-policy");
    return [
      {
        doc: wb.generateWhistleblowerPolicy(data),
        name: `${companySlug}_AI_Whistleblower_Policy.pdf`,
      },
      {
        doc: wb.generateConcernReportingForm(data),
        name: `${companySlug}_AI_Concern_Reporting_Form.pdf`,
      },
    ];
  }

  if (data.regulation === "customer-ai-aup") {
    const caup = await import("./pdf-customer-ai-aup");
    return [
      {
        doc: caup.generateCustomerAUP(data),
        name: `${companySlug}_Customer_AI_Acceptable_Use_Policy.pdf`,
      },
    ];
  }

  if (data.regulation === "manager-ai-training-kit") {
    const mtrk = await import("./pdf-manager-ai-training-kit");
    return [
      {
        doc: mtrk.generateManagerTalkingPoints(data),
        name: `${companySlug}_Manager_AI_Talking_Points.pdf`,
      },
      {
        doc: mtrk.generateEmployeeFAQUniversal(data),
        name: `${companySlug}_Employee_AI_FAQ.pdf`,
      },
      {
        doc: mtrk.generateTrainingSignOff(data),
        name: `${companySlug}_AI_Training_Sign_Off.pdf`,
      },
    ];
  }

  if (data.regulation === "annual-compliance-review") {
    const acr = await import("./pdf-annual-compliance-review");
    return [
      {
        doc: acr.generateAnnualReviewChecklist(data),
        name: `${companySlug}_Annual_AI_Compliance_Review_Checklist.pdf`,
      },
      {
        doc: acr.generateUpdateLog(data),
        name: `${companySlug}_AI_Compliance_Update_Log.pdf`,
      },
    ];
  }

  if (data.regulation === "board-ai-summary") {
    const bas = await import("./pdf-board-ai-summary");
    return [
      {
        doc: bas.generateExecutiveSummary(data),
        name: `${companySlug}_Board_AI_Executive_Summary.pdf`,
      },
      {
        doc: bas.generateBoardPresentation(data),
        name: `${companySlug}_Board_AI_Presentation.pdf`,
      },
      {
        doc: bas.generateRiskRegisterExcerpt(data),
        name: `${companySlug}_AI_Risk_Register_Excerpt.pdf`,
      },
    ];
  }

  if (data.regulation === "consumer-notice-kit") {
    const cnk = await import("./pdf-consumer-notice-kit");
    return [
      {
        doc: cnk.generateWebsiteBannerLanguage(data),
        name: `${companySlug}_Website_AI_Banner_Language.pdf`,
      },
      {
        doc: cnk.generateEmailNotification(data),
        name: `${companySlug}_AI_Email_Notification_Templates.pdf`,
      },
      {
        doc: cnk.generatePhysicalPosting(data),
        name: `${companySlug}_AI_Physical_Posting_Templates.pdf`,
      },
    ];
  }

  if (data.regulation === "data-mapping-inventory") {
    const dmi = await import("./pdf-data-mapping-inventory");
    return [
      {
        doc: dmi.generateDataInventory(data),
        name: `${companySlug}_AI_Data_Inventory.pdf`,
      },
      {
        doc: dmi.generateAIDataFlowDiagram(data),
        name: `${companySlug}_AI_Data_Flow_Diagram.pdf`,
      },
      {
        doc: dmi.generateThirdPartyRegister(data),
        name: `${companySlug}_Third_Party_AI_Register.pdf`,
      },
    ];
  }

  if (data.regulation === "consumer-rights-kit") {
    const crk = await import("./pdf-consumer-rights-kit");
    return [
      {
        doc: crk.generateRequestIntakeForm(data),
        name: `${companySlug}_Consumer_Rights_Request_Intake_Form.pdf`,
      },
      {
        doc: crk.generateResponseTemplates(data),
        name: `${companySlug}_Consumer_Rights_Response_Templates.pdf`,
      },
      {
        doc: crk.generateTimelineTracker(data),
        name: `${companySlug}_Consumer_Rights_Timeline_Tracker.pdf`,
      },
    ];
  }

  if (data.regulation === "il-notice-response-kit") {
    const mod = await import("./pdf-il-notice-response");
    return [
      { doc: mod.generateEmployeeNotificationTemplate(data), name: `${companySlug}_IL_Employee_AI_Notification.pdf` },
      { doc: mod.generateAiUseLoggingForm(data), name: `${companySlug}_IL_AI_Use_Logging_Form.pdf` },
      { doc: mod.generateEmployeeInquiryResponse(data), name: `${companySlug}_IL_Employee_Inquiry_Response.pdf` },
    ];
  }

  if (data.regulation === "il-zip-proxy-audit") {
    const mod = await import("./pdf-il-zip-proxy-audit");
    return [
      { doc: mod.generateDataInputAudit(data), name: `${companySlug}_IL_Zip_Code_Data_Input_Audit.pdf` },
      { doc: mod.generateProxyAnalysisWorksheet(data), name: `${companySlug}_IL_Proxy_Analysis_Worksheet.pdf` },
      { doc: mod.generateRemediationPlan(data), name: `${companySlug}_IL_Zip_Proxy_Remediation_Plan.pdf` },
    ];
  }

  if (data.regulation === "co-appeal-correction-kit") {
    const mod = await import("./pdf-co-appeal-correction");
    return [
      { doc: mod.generateAppealIntakeForm(data), name: `${companySlug}_CO_Consumer_Appeal_Intake.pdf` },
      { doc: mod.generateDataCorrectionRequest(data), name: `${companySlug}_CO_Data_Correction_Request.pdf` },
      { doc: mod.generateAppealOutcomeLetter(data), name: `${companySlug}_CO_Appeal_Outcome_Letter.pdf` },
    ];
  }

  if (data.regulation === "co-ag-reporting-kit") {
    const mod = await import("./pdf-co-ag-reporting");
    return [
      { doc: mod.generateDiscriminationDiscoveryForm(data), name: `${companySlug}_CO_Discrimination_Discovery.pdf` },
      { doc: mod.generateAgNotificationLetter(data), name: `${companySlug}_CO_AG_Notification_Letter.pdf` },
      { doc: mod.generateCorrectiveActionPlan(data), name: `${companySlug}_CO_Corrective_Action_Plan.pdf` },
    ];
  }

  if (data.regulation === "co-dev-deploy-exchange") {
    const mod = await import("./pdf-co-dev-deploy-exchange");
    return [
      { doc: mod.generateDeveloperDisclosureChecklist(data), name: `${companySlug}_CO_Developer_Disclosure_Checklist.pdf` },
      { doc: mod.generateDeployerGapAnalysis(data), name: `${companySlug}_CO_Deployer_Gap_Analysis.pdf` },
      { doc: mod.generateThirdPartyAssessmentAddendum(data), name: `${companySlug}_CO_Third_Party_Assessment_Addendum.pdf` },
    ];
  }

  if (data.regulation === "ca-admt-notice-optout") {
    const mod = await import("./pdf-ca-admt-notice-optout");
    return [
      { doc: mod.generatePreUseNotice(data), name: `${companySlug}_CA_ADMT_Pre_Use_Notice.pdf` },
      { doc: mod.generateOptoutRequestProcessing(data), name: `${companySlug}_CA_ADMT_Optout_Processing.pdf` },
      { doc: mod.generateOptoutExceptionDocumentation(data), name: `${companySlug}_CA_ADMT_Optout_Exception.pdf` },
    ];
  }

  if (data.regulation === "ca-admt-access-kit") {
    const mod = await import("./pdf-ca-admt-access");
    return [
      { doc: mod.generateAccessRequestIntake(data), name: `${companySlug}_CA_ADMT_Access_Request_Intake.pdf` },
      { doc: mod.generateAdmtOutputExplanation(data), name: `${companySlug}_CA_ADMT_Output_Explanation.pdf` },
      { doc: mod.generateResponseTimelineTracker(data), name: `${companySlug}_CA_ADMT_Response_Tracker.pdf` },
    ];
  }

  if (data.regulation === "ca-cyber-audit-kit") {
    const mod = await import("./pdf-ca-cyber-audit");
    return [
      { doc: mod.generateCybersecurityAuditChecklist(data), name: `${companySlug}_CA_Cybersecurity_Audit_Checklist.pdf` },
      { doc: mod.generateRiskAssessmentWorkbook(data), name: `${companySlug}_CA_Risk_Assessment_Workbook.pdf` },
      { doc: mod.generateAuditRemediationTracker(data), name: `${companySlug}_CA_Audit_Remediation_Tracker.pdf` },
    ];
  }

  if (data.regulation === "nyc-bias-audit-mgmt") {
    const mod = await import("./pdf-nyc-bias-audit-mgmt");
    return [
      { doc: mod.generateAuditorRfpTemplate(data), name: `${companySlug}_NYC_Auditor_RFP.pdf` },
      { doc: mod.generateResultsPublicationTemplate(data), name: `${companySlug}_NYC_Audit_Results_Publication.pdf` },
      { doc: mod.generateAnnualRenewalCalendar(data), name: `${companySlug}_NYC_Audit_Renewal_Calendar.pdf` },
    ];
  }

  if (data.regulation === "nyc-candidate-notice-kit") {
    const mod = await import("./pdf-nyc-candidate-notice");
    return [
      { doc: mod.generateAdvanceNoticeTemplate(data), name: `${companySlug}_NYC_10Day_Advance_Notice.pdf` },
      { doc: mod.generateAlternativeProcessWorkflow(data), name: `${companySlug}_NYC_Alternative_Process_Workflow.pdf` },
      { doc: mod.generateDataDisclosureResponse(data), name: `${companySlug}_NYC_Data_Disclosure_Response.pdf` },
    ];
  }

  if (data.regulation === "va-consumer-rights-kit") {
    const mod = await import("./pdf-va-consumer-rights");
    return [
      { doc: mod.generateRightsRequestIntake(data), name: `${companySlug}_VA_Rights_Request_Intake.pdf` },
      { doc: mod.generateAppealWorkflow(data), name: `${companySlug}_VA_Appeal_Workflow.pdf` },
      { doc: mod.generateAgComplaintReferral(data), name: `${companySlug}_VA_AG_Complaint_Referral.pdf` },
    ];
  }

  if (data.regulation === "va-profiling-assessment-kit") {
    const mod = await import("./pdf-va-profiling-assessment");
    return [
      { doc: mod.generateProfilingAssessment(data), name: `${companySlug}_VA_Profiling_Assessment.pdf` },
      { doc: mod.generateBenefitsRisksWorksheet(data), name: `${companySlug}_VA_Benefits_Risks_Worksheet.pdf` },
      { doc: mod.generateSensitiveDataConsent(data), name: `${companySlug}_VA_Sensitive_Data_Consent.pdf` },
    ];
  }

  if (data.regulation === "va-controller-processor-kit") {
    const mod = await import("./pdf-va-controller-processor");
    return [
      { doc: mod.generateProcessorDpaTemplate(data), name: `${companySlug}_VA_Processor_DPA.pdf` },
      { doc: mod.generateProcessorAuditQuestionnaire(data), name: `${companySlug}_VA_Processor_Audit_Questionnaire.pdf` },
      { doc: mod.generateSubcontractorFlowdown(data), name: `${companySlug}_VA_Subcontractor_Flowdown.pdf` },
    ];
  }

  if (data.regulation === "eu-fria-kit") {
    const mod = await import("./pdf-eu-fria");
    return [
      { doc: mod.generateFriaTemplate(data), name: `${companySlug}_EU_FRIA.pdf` },
      { doc: mod.generateAuthorityNotification(data), name: `${companySlug}_EU_Authority_Notification.pdf` },
      { doc: mod.generateFriaUpdateTrigger(data), name: `${companySlug}_EU_FRIA_Update_Trigger.pdf` },
    ];
  }

  if (data.regulation === "eu-post-market-kit") {
    const mod = await import("./pdf-eu-post-market");
    return [
      { doc: mod.generateMonitoringPlan(data), name: `${companySlug}_EU_Monitoring_Plan.pdf` },
      { doc: mod.generateSeriousIncidentReport(data), name: `${companySlug}_EU_Serious_Incident_Report.pdf` },
      { doc: mod.generateLogRetentionPolicy(data), name: `${companySlug}_EU_Log_Retention_Policy.pdf` },
    ];
  }

  if (data.regulation === "eu-human-oversight-kit") {
    const mod = await import("./pdf-eu-human-oversight");
    return [
      { doc: mod.generateOversightImplementationPlan(data), name: `${companySlug}_EU_Oversight_Plan.pdf` },
      { doc: mod.generateWorkerNotification(data), name: `${companySlug}_EU_Worker_Notification.pdf` },
      { doc: mod.generateOversightDecisionLog(data), name: `${companySlug}_EU_Oversight_Decision_Log.pdf` },
    ];
  }

  if (data.regulation === "eu-registration-transparency") {
    const mod = await import("./pdf-eu-registration");
    return [
      { doc: mod.generateDatabaseRegistrationChecklist(data), name: `${companySlug}_EU_Database_Registration.pdf` },
      { doc: mod.generateTransparencyDisclosure(data), name: `${companySlug}_EU_Transparency_Disclosure.pdf` },
      { doc: mod.generateProviderDocumentationVerification(data), name: `${companySlug}_EU_Provider_Doc_Verification.pdf` },
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

  if (data.selectedAddons?.includes("manager-training-kit")) {
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
