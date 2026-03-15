export interface AISystem {
  name: string;
  vendor: string;
  description: string;
  decisions: string[];
}

export interface ComplianceFormData {
  regulation: string;
  company: {
    name: string;
    state: string;
    size: string;
    industry: string;
  };
  aiSystems: AISystem[];
  dataInputs: string[];
  protectedCharacteristics: string[];
  biasAudit: string;
  oversight: {
    aiRole: string;
    oversightRole: string;
    humanReview: string;
    reviewFrequency: string;
  };
  contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  generatedDate: string;
  selectedAddons: string[];
}

export interface GeneratedDoc {
  doc: InstanceType<typeof import("jspdf").jsPDF>;
  name: string;
}

export interface AddonConfig {
  id: string;
  slug: string;
  label: string;
  description: string;
  price: number;
  stripePriceId: string;
}

export interface RegulationConfig {
  name: string;
  statute: string;
  lawUrl: string;
  lawLinkText: string;
  acknowledgment: string;
  basePrice: number;
  addons?: AddonConfig[];
  documents: string[];
  decisions: [string, string][];
  helpTexts: Record<string, string>;
  skippedSteps?: number[];
}
