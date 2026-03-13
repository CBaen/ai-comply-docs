"use client";

import { useState, useCallback } from "react";
import { REGULATION_CONFIG } from "@/lib/regulation-config";
import type { AISystem, ComplianceFormData } from "@/lib/pdf-types";

interface QuestionnaireProps {
  regulationSlug: string;
  regulationName: string;
  price: number;
}

const TOTAL_STEPS = 6;

const DATA_INPUT_OPTIONS = [
  { value: "resume", label: "Resumes / CVs" },
  { value: "video", label: "Video interviews" },
  { value: "assessment", label: "Skills assessments" },
  { value: "social", label: "Social media profiles" },
  { value: "performance_data", label: "Performance metrics" },
  { value: "attendance", label: "Attendance records" },
  { value: "communication", label: "Workplace communications" },
  { value: "biometric", label: "Biometric data" },
];

const PROTECTED_CHAR_OPTIONS = [
  { value: "race", label: "Race / Ethnicity" },
  { value: "gender", label: "Gender / Sex" },
  { value: "age", label: "Age" },
  { value: "disability", label: "Disability status" },
  { value: "religion", label: "Religion" },
  { value: "national_origin", label: "National origin" },
  { value: "pregnancy", label: "Pregnancy status" },
  { value: "none", label: "None of the above" },
];

const ROLE_LABELS: Record<string, string> = {
  sole: "AI makes final decisions autonomously",
  primary: "AI recommendation is primary factor",
  advisory: "AI provides advisory input",
  screening: "AI screens/filters candidates",
};

function emptyAISystem(): AISystem {
  return { name: "", vendor: "", description: "", decisions: [] };
}

export default function Questionnaire({
  regulationSlug,
  regulationName,
  price,
}: QuestionnaireProps) {
  const config = REGULATION_CONFIG[regulationSlug];
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Step 1
  const [companyName, setCompanyName] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");

  // Step 2
  const [aiSystems, setAiSystems] = useState<AISystem[]>([emptyAISystem()]);

  // Step 3
  const [dataInputs, setDataInputs] = useState<string[]>([]);
  const [protectedChars, setProtectedChars] = useState<string[]>([]);
  const [biasAudit, setBiasAudit] = useState("");

  // Step 4
  const [aiRole, setAiRole] = useState("");
  const [oversightRole, setOversightRole] = useState("");
  const [humanReview, setHumanReview] = useState("");
  const [reviewFrequency, setReviewFrequency] = useState("");

  // Step 5
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Step 6
  const [lawVisited, setLawVisited] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [includeTrainingKit, setIncludeTrainingKit] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const decisions = config?.decisions || [];
  const helpTexts = config?.helpTexts || {};

  const validate = useCallback((): boolean => {
    switch (step) {
      case 1:
        if (!companyName.trim()) {
          setError("Please enter your company name.");
          return false;
        }
        break;
      case 2:
        for (const sys of aiSystems) {
          if (!sys.name.trim()) {
            setError("Please name each AI system listed.");
            return false;
          }
        }
        break;
      case 4:
        if (!aiRole) {
          setError("Please select how AI outputs are used in decisions.");
          return false;
        }
        break;
      case 5:
        if (!contactName.trim()) {
          setError("Please enter a contact name for your compliance documents.");
          return false;
        }
        break;
    }
    setError("");
    return true;
  }, [step, companyName, aiSystems, aiRole, contactName]);

  const collectFormData = useCallback((): ComplianceFormData => {
    return {
      regulation: regulationSlug,
      company: {
        name: companyName.trim(),
        state: companyState.trim(),
        size: companySize,
        industry: companyIndustry.trim(),
      },
      aiSystems: aiSystems.filter((s) => s.name.trim()),
      dataInputs,
      protectedCharacteristics: protectedChars,
      biasAudit,
      oversight: {
        aiRole,
        oversightRole: oversightRole.trim(),
        humanReview,
        reviewFrequency,
      },
      contact: {
        name: contactName.trim(),
        title: contactTitle.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim(),
      },
      generatedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      includeTrainingKit,
    };
  }, [
    regulationSlug,
    companyName,
    companyState,
    companySize,
    companyIndustry,
    aiSystems,
    dataInputs,
    protectedChars,
    biasAudit,
    aiRole,
    oversightRole,
    humanReview,
    reviewFrequency,
    contactName,
    contactTitle,
    contactEmail,
    contactPhone,
    includeTrainingKit,
  ]);

  const nextStep = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setError("");
      setStep(step - 1);
    }
  };

  const updateAISystem = (index: number, field: keyof AISystem, value: string | string[]) => {
    setAiSystems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const toggleDecision = (sysIndex: number, decision: string) => {
    setAiSystems((prev) => {
      const next = [...prev];
      const sys = { ...next[sysIndex] };
      sys.decisions = sys.decisions.includes(decision)
        ? sys.decisions.filter((d) => d !== decision)
        : [...sys.decisions, decision];
      next[sysIndex] = sys;
      return next;
    });
  };

  const addAISystem = () => setAiSystems((prev) => [...prev, emptyAISystem()]);
  const removeAISystem = (index: number) =>
    setAiSystems((prev) => prev.filter((_, i) => i !== index));

  const toggleCheckbox = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const handleCheckout = async () => {
    if (!acknowledged) {
      setError(
        "Please review the law and confirm the acknowledgment before purchasing."
      );
      return;
    }

    const data = collectFormData();
    sessionStorage.setItem("complianceFormData", JSON.stringify(data));
    setCheckoutLoading(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          includeTrainingKit,
          regulation: regulationSlug,
        }),
      });
      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
        return;
      }

      setError(
        result.error ||
          "Could not start checkout. Please try again or contact support."
      );
      setCheckoutLoading(false);
    } catch {
      setError(
        "Payment system unavailable. Please try again or contact support."
      );
      setCheckoutLoading(false);
    }
  };

  const progressPercent = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  const orderTotal =
    config && includeTrainingKit && config.trainingKitAvailable
      ? config.basePrice + config.trainingKitPrice
      : price;

  if (!config) return null;

  return (
    <div id="generator" className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Progress bar */}
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-gray-500">{progressPercent}%</span>
          </div>
          <div
            className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-blue-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Company Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State of Operation
                </label>
                <input
                  type="text"
                  value={companyState}
                  onChange={(e) => setCompanyState(e.target.value)}
                  placeholder="e.g., Illinois"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Size
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-250">51-250 employees</option>
                  <option value="251-1000">251-1,000 employees</option>
                  <option value="1001-5000">1,001-5,000 employees</option>
                  <option value="5001+">5,001+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                  placeholder="e.g., Financial Services, Healthcare, Technology"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Step 2: AI Systems */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                AI Systems
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {helpTexts.step2Intro}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {helpTexts.step2Help}
                </p>
              </div>

              {aiSystems.map((sys, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-5 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      AI System {idx + 1}
                    </span>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => removeAISystem(idx)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      AI System/Tool Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      The name of the software or tool. Examples: HireVue,
                      Workday AI, Pymetrics, or your custom-built tool.
                    </p>
                    <input
                      type="text"
                      value={sys.name}
                      onChange={(e) =>
                        updateAISystem(idx, "name", e.target.value)
                      }
                      placeholder="e.g., HireVue, Pymetrics, internal ML model"
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Vendor (if third-party)
                    </label>
                    <input
                      type="text"
                      value={sys.vendor}
                      onChange={(e) =>
                        updateAISystem(idx, "vendor", e.target.value)
                      }
                      placeholder="e.g., HireVue Inc., or 'Internal'"
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What decisions does this AI influence?
                    </legend>
                    <p className="text-xs text-gray-500 mb-2">
                      {helpTexts.step2DecisionHelp}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {decisions.map(([val, label]) => (
                        <label
                          key={val}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={sys.decisions.includes(val)}
                            onChange={() => toggleDecision(idx, val)}
                            className="rounded"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Brief description of how the AI is used
                    </label>
                    <textarea
                      value={sys.description}
                      onChange={(e) =>
                        updateAISystem(idx, "description", e.target.value)
                      }
                      rows={3}
                      placeholder="e.g., Screens resumes and ranks candidates..."
                      className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {helpTexts.step2MultiHelp}
                </p>
              </div>
              <button
                type="button"
                onClick={addAISystem}
                className="text-blue-700 hover:text-blue-900 text-sm font-medium flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Another AI System
              </button>
            </div>
          )}

          {/* Step 3: Data & Bias Audit */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Data & Bias Audit
              </h3>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What types of data does your AI system process?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {DATA_INPUT_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={dataInputs.includes(opt.value)}
                        onChange={() =>
                          toggleCheckbox(opt.value, dataInputs, setDataInputs)
                        }
                        className="rounded"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Which protected characteristics could be affected by the AI
                  system?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PROTECTED_CHAR_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={protectedChars.includes(opt.value)}
                        onChange={() =>
                          toggleCheckbox(
                            opt.value,
                            protectedChars,
                            setProtectedChars
                          )
                        }
                        className="rounded"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Has your organization conducted a bias audit of this AI
                  system?
                </label>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {helpTexts.step3BiasHelp}
                  </p>
                </div>
                <select
                  value={biasAudit}
                  onChange={(e) => setBiasAudit(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="yes">
                    Yes, a formal audit has been conducted
                  </option>
                  <option value="in_progress">
                    In progress / under consideration
                  </option>
                  <option value="planned">Planned but not yet started</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Oversight */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                AI Oversight
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {helpTexts.step4Help}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  How are AI outputs used in decisions?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={aiRole}
                  onChange={(e) => setAiRole(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="sole">
                    AI makes final decisions autonomously
                  </option>
                  <option value="primary">
                    AI recommendation is primary factor, with human review
                  </option>
                  <option value="advisory">
                    AI provides advisory input, human makes final decision
                  </option>
                  <option value="screening">
                    AI screens/filters, human reviews remaining candidates
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Who oversees the AI system? (Name or role)
                </label>
                <input
                  type="text"
                  value={oversightRole}
                  onChange={(e) => setOversightRole(e.target.value)}
                  placeholder="e.g., VP of People Operations, HR Director"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Can a human review and override AI decisions?
                </label>
                <select
                  value={humanReview}
                  onChange={(e) => setHumanReview(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="yes">
                    Yes, humans can review and override any AI decision
                  </option>
                  <option value="developing">
                    Developing a review process
                  </option>
                  <option value="no">No formal human review process</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  How often is the AI system reviewed?
                </label>
                <select
                  value={reviewFrequency}
                  onChange={(e) => setReviewFrequency(e.target.value)}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select...</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="biannual">Every 6 months</option>
                  <option value="annual">Annually</option>
                  <option value="never">Not currently reviewed</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 5: Contact */}
          {step === 5 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {helpTexts.step5Intro}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g., Jane Smith"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  placeholder="e.g., Chief Compliance Officer"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g., compliance@company.com"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g., (312) 555-0100"
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Step 6: Review & Checkout */}
          {step === 6 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                Review & Purchase
              </h3>

              {/* Review Summary */}
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    Company
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {companyName} ({companyIndustry || "Industry not specified"})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {companySize || "Size not specified"} employees,{" "}
                    {companyState || "State not specified"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    AI Systems ({aiSystems.filter((s) => s.name.trim()).length})
                  </h4>
                  <ul className="space-y-1">
                    {aiSystems
                      .filter((s) => s.name.trim())
                      .map((sys, i) => (
                        <li
                          key={i}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          <strong>{sys.name}</strong>
                          {sys.vendor && ` (${sys.vendor})`} &mdash;{" "}
                          {sys.decisions.length > 0
                            ? sys.decisions
                                .map(
                                  (d) =>
                                    decisions.find(([v]) => v === d)?.[1] || d
                                )
                                .join(", ")
                            : "No decisions specified"}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    Decision Process
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {ROLE_LABELS[aiRole] || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Overseen by: {oversightRole || "Not specified"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    Contact for Documents
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {contactName}
                    {contactTitle && `, ${contactTitle}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {[contactEmail, contactPhone].filter(Boolean).join(" | ")}
                  </p>
                </div>
              </div>

              {/* Document list */}
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                  <svg
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  You will receive ({config.documents.length} PDF documents):
                </h4>
                <ul className="space-y-2">
                  {config.documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-green-700 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Law gate */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                  These templates are based on{" "}
                  <strong>{config.statute}</strong>. You must review the actual
                  law text before purchasing. The checkout button is locked until
                  you do.
                </p>
                <a
                  href={config.lawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setLawVisited(true)}
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium text-sm underline"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  {config.lawLinkText}
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                {lawVisited && (
                  <p className="text-green-700 text-xs mt-2 font-medium">
                    Law link visited. You may now check the acknowledgment below.
                  </p>
                )}
              </div>

              {/* Acknowledgment */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  disabled={!lawVisited}
                  className="mt-1 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>I confirm:</strong> {config.acknowledgment}
                </span>
              </label>

              {/* Training kit add-on */}
              {config.trainingKitAvailable && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTrainingKit}
                      onChange={(e) => setIncludeTrainingKit(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>
                        Add Manager Training Kit (+${config.trainingKitPrice})
                      </strong>{" "}
                      &mdash; Manager guide and employee FAQ documents
                    </span>
                  </label>
                </div>
              )}

              {/* Order total */}
              <div className="text-center py-4 border-t border-gray-200 dark:border-slate-700">
                <p className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
                  ${orderTotal}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {includeTrainingKit && config.trainingKitAvailable
                    ? `Compliance Package $${config.basePrice} + Manager Training Kit $${config.trainingKitPrice}`
                    : "One-time purchase. Instant download. No subscription."}
                </p>
              </div>

              {/* Checkout button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!acknowledged || checkoutLoading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-md ${
                  acknowledged && !checkoutLoading
                    ? "bg-blue-800 hover:bg-blue-900 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {checkoutLoading
                  ? "Redirecting to Checkout..."
                  : `Get My ${regulationName} Documents — $${orderTotal}`}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}
            {step < TOTAL_STEPS && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-lg font-semibold transition"
              >
                {step === TOTAL_STEPS - 1 ? "Review" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
