import type { ComplianceFormData } from "./pdf-types";

export function getSampleFormData(slug: string): ComplianceFormData {
  // Different dummy data per product category for realistic-looking samples
  const isHiring = ["illinois-hb3773", "nyc-local-law-144", "eeoc-ai-hiring", "multi-state-employer-ai-disclosure"].includes(slug);
  const isHealthcare = slug === "healthcare-ai-compliance";
  const isFinancial = slug === "financial-services-ai";
  const isEU = slug.startsWith("eu-");

  return {
    regulation: slug,
    company: {
      name: "Acme Corp",
      state: isEU ? "International" : "Illinois",
      size: "50-249",
      industry: isHealthcare ? "Healthcare" : isFinancial ? "Financial Services" : "Technology",
    },
    aiSystems: [
      {
        name: isHiring ? "ResumeScreen AI" : isHealthcare ? "PatientTriage AI" : isFinancial ? "CreditScore AI" : "DataProcessor AI",
        vendor: "Example Corp",
        description: isHiring ? "Screens resumes and ranks candidates by qualification match" : "Processes and analyzes data for automated decision support",
        decisions: isHiring ? ["recruitment", "hiring"] : ["processing"],
      },
    ],
    dataInputs: isHiring ? ["Resumes/CVs", "Skills assessments"] : [],
    protectedCharacteristics: isHiring ? ["Race", "Gender", "Age"] : [],
    biasAudit: isHiring ? "planned" : "",
    oversight: {
      aiRole: "advisory",
      oversightRole: isHiring ? "VP of People Operations" : "Chief Compliance Officer",
      humanReview: "yes",
      reviewFrequency: "quarterly",
    },
    contact: {
      name: "Jane Smith",
      title: "Compliance Officer",
      email: "compliance@acmecorp.example.com",
      phone: "(555) 123-4567",
    },
    generatedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    selectedAddons: [],
  };
}
