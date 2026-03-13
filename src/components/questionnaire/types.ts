import type { AISystem } from "@/lib/pdf-types";

export type { AISystem };

export interface StepCompanyInfoProps {
  companyName: string;
  setCompanyName: (v: string) => void;
  companyState: string;
  setCompanyState: (v: string) => void;
  companySize: string;
  setCompanySize: (v: string) => void;
  companyIndustry: string;
  setCompanyIndustry: (v: string) => void;
}

export interface StepAISystemsProps {
  aiSystems: AISystem[];
  decisions: [string, string][];
  helpTexts: Record<string, string>;
  updateAISystem: (index: number, field: keyof AISystem, value: string | string[]) => void;
  toggleDecision: (sysIndex: number, decision: string) => void;
  addAISystem: () => void;
  removeAISystem: (index: number) => void;
}

export interface StepDataBiasProps {
  dataInputs: string[];
  setDataInputs: (v: string[]) => void;
  protectedChars: string[];
  setProtectedChars: (v: string[]) => void;
  biasAudit: string;
  setBiasAudit: (v: string) => void;
  helpTexts: Record<string, string>;
  toggleCheckbox: (value: string, list: string[], setter: (v: string[]) => void) => void;
}

export interface StepOversightProps {
  aiRole: string;
  setAiRole: (v: string) => void;
  oversightRole: string;
  setOversightRole: (v: string) => void;
  humanReview: string;
  setHumanReview: (v: string) => void;
  reviewFrequency: string;
  setReviewFrequency: (v: string) => void;
  helpTexts: Record<string, string>;
}

export interface StepContactProps {
  contactName: string;
  setContactName: (v: string) => void;
  contactTitle: string;
  setContactTitle: (v: string) => void;
  contactEmail: string;
  setContactEmail: (v: string) => void;
  contactPhone: string;
  setContactPhone: (v: string) => void;
  helpTexts: Record<string, string>;
}

export interface StepReviewCheckoutProps {
  // Company summary
  companyName: string;
  companyIndustry: string;
  companySize: string;
  companyState: string;
  // AI systems summary
  aiSystems: AISystem[];
  decisions: [string, string][];
  // Oversight summary
  aiRole: string;
  oversightRole: string;
  // Contact summary
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  // Checkout state
  lawVisited: boolean;
  setLawVisited: (v: boolean) => void;
  acknowledged: boolean;
  setAcknowledged: (v: boolean) => void;
  includeTrainingKit: boolean;
  setIncludeTrainingKit: (v: boolean) => void;
  checkoutLoading: boolean;
  orderTotal: number;
  regulationName: string;
  // Config fields needed for display
  statute: string;
  lawUrl: string;
  lawLinkText: string;
  acknowledgment: string;
  trainingKitAvailable: boolean;
  trainingKitPrice: number;
  basePrice: number;
  documents: string[];
  // Handler
  handleCheckout: () => void;
}
