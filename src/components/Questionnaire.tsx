"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { REGULATION_CONFIG } from "@/lib/regulation-config";
import type { AISystem, ComplianceFormData } from "@/lib/pdf-types";
import StepCompanyInfo from "./questionnaire/StepCompanyInfo";
import StepAISystems from "./questionnaire/StepAISystems";
import StepDataBias from "./questionnaire/StepDataBias";
import StepOversight from "./questionnaire/StepOversight";
import StepContact from "./questionnaire/StepContact";
import StepReviewCheckout from "./questionnaire/StepReviewCheckout";

interface QuestionnaireProps {
  regulationSlug: string;
  regulationName: string;
  price: number;
}


function emptyAISystem(): AISystem {
  return { name: "", vendor: "", description: "", decisions: [] };
}

function loadSavedForm(key: string): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(sessionStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export default function Questionnaire({
  regulationSlug,
  regulationName,
  price,
}: QuestionnaireProps) {
  const config = REGULATION_CONFIG[regulationSlug];
  const skippedSteps = (config?.skippedSteps || []).filter((s: number) => s !== 6);
  const visibleSteps = [1, 2, 3, 4, 5, 6].filter(s => !skippedSteps.includes(s));
  const visibleStepCount = visibleSteps.length;

  const saved = loadSavedForm(`questionnaire-${regulationSlug}`);

  const initialStep = saved?.step && !skippedSteps.includes(saved.step) ? saved.step : visibleSteps[0];
  const [step, setStep] = useState<number>(initialStep);
  const [error, setError] = useState("");

  // Step 1
  const [companyName, setCompanyName] = useState<string>(saved?.companyName || "");
  const [companyState, setCompanyState] = useState<string>(saved?.companyState || "");
  const [companySize, setCompanySize] = useState<string>(saved?.companySize || "");
  const [companyIndustry, setCompanyIndustry] = useState<string>(saved?.companyIndustry || "");

  // Step 2
  const [aiSystems, setAiSystems] = useState<AISystem[]>(saved?.aiSystems || [emptyAISystem()]);

  // Step 3
  const [dataInputs, setDataInputs] = useState<string[]>(saved?.dataInputs || []);
  const [protectedChars, setProtectedChars] = useState<string[]>(saved?.protectedChars || []);
  const [biasAudit, setBiasAudit] = useState<string>(saved?.biasAudit || "");

  // Step 4
  const [aiRole, setAiRole] = useState<string>(saved?.aiRole || "");
  const [oversightRole, setOversightRole] = useState<string>(saved?.oversightRole || "");
  const [humanReview, setHumanReview] = useState<string>(saved?.humanReview || "");
  const [reviewFrequency, setReviewFrequency] = useState<string>(saved?.reviewFrequency || "");

  // Step 5
  const [contactName, setContactName] = useState<string>(saved?.contactName || "");
  const [contactTitle, setContactTitle] = useState<string>(saved?.contactTitle || "");
  const [contactEmail, setContactEmail] = useState<string>(saved?.contactEmail || "");
  const [contactPhone, setContactPhone] = useState<string>(saved?.contactPhone || "");

  // Focus management: move focus to step heading when step changes
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  // Step 6
  const [lawVisited, setLawVisited] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(saved?.selectedAddons || []);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Persist form state to sessionStorage on every change so Back navigation restores it
  useEffect(() => {
    try {
      sessionStorage.setItem(`questionnaire-${regulationSlug}`, JSON.stringify({
        step,
        companyName, companyState, companySize, companyIndustry,
        aiSystems,
        dataInputs, protectedChars, biasAudit,
        aiRole, oversightRole, humanReview, reviewFrequency,
        contactName, contactTitle, contactEmail, contactPhone,
        selectedAddons,
      }));
    } catch {}
  }, [
    regulationSlug, step,
    companyName, companyState, companySize, companyIndustry,
    aiSystems,
    dataInputs, protectedChars, biasAudit,
    aiRole, oversightRole, humanReview, reviewFrequency,
    contactName, contactTitle, contactEmail, contactPhone,
    selectedAddons,
  ]);

  const decisions = config?.decisions || [];
  const helpTexts = config?.helpTexts || {};

  const validate = useCallback((): boolean => {
    if (skippedSteps.includes(step)) return true;
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
      selectedAddons,
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
    selectedAddons,
  ]);

  const nextStep = () => {
    if (!validate()) return;
    const currentIdx = visibleSteps.indexOf(step);
    if (currentIdx < visibleSteps.length - 1) {
      setStep(visibleSteps[currentIdx + 1]);
    }
  };

  const prevStep = () => {
    const currentIdx = visibleSteps.indexOf(step);
    if (currentIdx > 0) {
      setError("");
      setStep(visibleSteps[currentIdx - 1]);
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
          addonIds: selectedAddons,
          regulation: regulationSlug,
        }),
      });
      const result = await response.json();

      if (result.url) {
        // Clear the draft so a fresh session starts after successful purchase
        try { sessionStorage.removeItem(`questionnaire-${regulationSlug}`); } catch {}
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

  const visibleStepIndex = visibleSteps.indexOf(step) + 1;
  const progressPercent = Math.round((visibleStepIndex / visibleStepCount) * 100);
  const orderTotal =
    config && selectedAddons.length > 0 && config.addons
      ? config.basePrice +
        config.addons
          .filter((a) => selectedAddons.includes(a.id))
          .reduce((sum, a) => sum + a.price, 0)
      : price;

  if (!config) return null;

  return (
    <div id="generator" className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Product summary bar */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-1">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
            {regulationName} &mdash; {config.documents.length} documents
          </span>
          <span className="text-sm font-bold text-blue-900 dark:text-blue-200">
            ${price}
          </span>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Step {visibleStepIndex} of {visibleStepCount}
            </span>
            <span className="text-gray-500">{progressPercent}%</span>
          </div>
          <div
            className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5"
            role="progressbar"
            aria-label="Form completion progress"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-blue-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Visually hidden focus target for step change — screen readers announce new step heading */}
          <h2
            ref={stepHeadingRef}
            tabIndex={-1}
            className="sr-only"
            aria-live="polite"
          >
            Step {visibleStepIndex} of {visibleStepCount}
          </h2>
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm"
            >
              {error}
            </div>
          )}

          {step === 1 && (
            <StepCompanyInfo
              companyName={companyName}
              setCompanyName={setCompanyName}
              companyState={companyState}
              setCompanyState={setCompanyState}
              companySize={companySize}
              setCompanySize={setCompanySize}
              companyIndustry={companyIndustry}
              setCompanyIndustry={setCompanyIndustry}
            />
          )}

          {step === 2 && (
            <StepAISystems
              aiSystems={aiSystems}
              decisions={decisions}
              helpTexts={helpTexts}
              updateAISystem={updateAISystem}
              toggleDecision={toggleDecision}
              addAISystem={addAISystem}
              removeAISystem={removeAISystem}
            />
          )}

          {step === 3 && (
            <StepDataBias
              dataInputs={dataInputs}
              setDataInputs={setDataInputs}
              protectedChars={protectedChars}
              setProtectedChars={setProtectedChars}
              biasAudit={biasAudit}
              setBiasAudit={setBiasAudit}
              helpTexts={helpTexts}
              toggleCheckbox={toggleCheckbox}
              dataInputOptions={config?.dataInputOptions}
            />
          )}

          {step === 4 && (
            <StepOversight
              aiRole={aiRole}
              setAiRole={setAiRole}
              oversightRole={oversightRole}
              setOversightRole={setOversightRole}
              humanReview={humanReview}
              setHumanReview={setHumanReview}
              reviewFrequency={reviewFrequency}
              setReviewFrequency={setReviewFrequency}
              helpTexts={helpTexts}
              oversightOptions={config?.oversightOptions}
            />
          )}

          {step === 5 && (
            <StepContact
              contactName={contactName}
              setContactName={setContactName}
              contactTitle={contactTitle}
              setContactTitle={setContactTitle}
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              helpTexts={helpTexts}
            />
          )}

          {step === 6 && (
            <StepReviewCheckout
              regulationSlug={regulationSlug}
              companyName={companyName}
              companyIndustry={companyIndustry}
              companySize={companySize}
              companyState={companyState}
              aiSystems={aiSystems}
              decisions={decisions}
              dataInputs={dataInputs}
              protectedChars={protectedChars}
              biasAudit={biasAudit}
              aiRole={aiRole}
              oversightRole={oversightRole}
              humanReview={humanReview}
              reviewFrequency={reviewFrequency}
              contactName={contactName}
              contactTitle={contactTitle}
              contactEmail={contactEmail}
              contactPhone={contactPhone}
              lawVisited={lawVisited}
              setLawVisited={setLawVisited}
              acknowledged={acknowledged}
              setAcknowledged={setAcknowledged}
              addons={config.addons ?? []}
              selectedAddons={selectedAddons}
              setSelectedAddons={setSelectedAddons}
              checkoutLoading={checkoutLoading}
              orderTotal={orderTotal}
              regulationName={regulationName}
              statute={config.statute}
              lawUrl={config.lawUrl}
              lawLinkText={config.lawLinkText}
              acknowledgment={config.acknowledgment}
              basePrice={config.basePrice}
              documents={config.documents}
              gateText={config.gateText}
              handleCheckout={handleCheckout}
            />
          )}

          {/* Navigation */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            {visibleSteps.indexOf(step) > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium transition text-center"
              >
                <span aria-hidden="true">&larr;</span> Back
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}
            {step !== 6 && (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto min-h-[44px] bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-lg font-semibold transition text-center"
              >
                {step === visibleSteps[visibleSteps.length - 2] ? "Review" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
