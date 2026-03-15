import type { AISystem } from "@/lib/pdf-types";
import type { AddonConfig } from "@/lib/regulation-config";

export type { AISystem };
export type { AddonConfig };

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
  /** Custom data-input checkboxes from regulation config. Falls back to hiring defaults if absent. */
  dataInputOptions?: { value: string; label: string }[];
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
  /** Custom AI-role options from regulation config. Falls back to hiring defaults if absent. */
  oversightOptions?: { value: string; label: string }[];
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
  // Regulation identity (needed to generate personalized preview)
  regulationSlug: string;
  // Company summary
  companyName: string;
  companyIndustry: string;
  companySize: string;
  companyState: string;
  // AI systems summary
  aiSystems: AISystem[];
  decisions: [string, string][];
  // Data & bias summary (needed for personalized preview)
  dataInputs: string[];
  protectedChars: string[];
  biasAudit: string;
  // Oversight summary
  aiRole: string;
  oversightRole: string;
  humanReview: string;
  reviewFrequency: string;
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
  addons: AddonConfig[];
  selectedAddons: string[];
  setSelectedAddons: (ids: string[]) => void;
  checkoutLoading: boolean;
  orderTotal: number;
  regulationName: string;
  // Config fields needed for display
  statute: string;
  lawUrl: string;
  lawLinkText: string;
  acknowledgment: string;
  basePrice: number;
  documents: string[];
  /**
   * If set, replaces the hardcoded law-gate message and makes the gate non-blocking.
   * Used for framework/voluntary-standard products (NIST, FTC guidance, etc.).
   */
  gateText?: string;
  // Handler
  handleCheckout: () => void;
}
