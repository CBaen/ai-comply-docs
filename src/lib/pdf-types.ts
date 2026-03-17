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
  /** Optional: human-readable link text for the law citation. Migrated to Regulation.lawLinkText on the regulations.ts side. */
  lawLinkText?: string;
  acknowledgment: string;
  addons?: AddonConfig[];
  decisions: [string, string][];
  helpTexts: Record<string, string>;
  skippedSteps?: number[];
  /** Custom AI-role options for Step 4. If absent, hiring defaults are used. */
  oversightOptions?: { value: string; label: string }[];
  /** Custom data-input checkboxes for Step 3. If absent, hiring defaults are used. */
  dataInputOptions?: { value: string; label: string }[];
  /**
   * If set, replaces the hardcoded "you must review the actual law text" message
   * in the law gate. Also makes the gate non-blocking (checkbox is always enabled).
   */
  gateText?: string;
}
