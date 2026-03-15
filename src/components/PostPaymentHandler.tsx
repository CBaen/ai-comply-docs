"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ComplianceFormData, GeneratedDoc } from "@/lib/pdf-types";

interface PostPaymentHandlerProps {
  regulationSlug: string;
}

type Status = "idle" | "verifying" | "ready" | "error";

// Fields collected by the Quick Purchase mini-form
interface QuickPurchaseFields {
  companyName: string;
  aiToolName: string;
  aiRole: string;
  contactName: string;
}

const AI_ROLE_OPTIONS = [
  "AI makes final decisions autonomously",
  "AI recommendation is primary factor",
  "AI provides advisory input",
  "AI screens/filters first, humans decide",
  "AI processes data, humans review outputs",
];

export default function PostPaymentHandler({
  regulationSlug,
}: PostPaymentHandlerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState<ComplianceFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [docs, setDocs] = useState<GeneratedDoc[] | null>(null);
  const [deliveryToken, setDeliveryToken] = useState<string>("");
  const [verifiedSessionId, setVerifiedSessionId] = useState<string>("");

  // Quick Purchase mini-form state
  const [isQuickPurchase, setIsQuickPurchase] = useState(false);
  const [quickFields, setQuickFields] = useState<QuickPurchaseFields>({
    companyName: "",
    aiToolName: "",
    aiRole: AI_ROLE_OPTIONS[0],
    contactName: "",
  });
  const [quickFieldErrors, setQuickFieldErrors] = useState<Partial<QuickPurchaseFields>>({});

  // Download state
  const [downloadState, setDownloadState] = useState<
    "idle" | "generating" | "done" | "error"
  >("idle");

  // Email state
  const [emailInputs, setEmailInputs] = useState<string[]>([""]);
  const [emailStatus, setEmailStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Cancelled payment / orphaned data
  const [showRestoreBanner, setShowRestoreBanner] = useState(false);
  const [orphanedData, setOrphanedData] = useState<ComplianceFormData | null>(
    null
  );
  const [showCancelledBanner, setShowCancelledBanner] = useState(false);

  const checkedRef = useRef(false);

  // Lock body scroll when modal is showing
  useEffect(() => {
    if (status === "verifying" || status === "ready") {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [status]);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const sessionId = params.get("session_id");

    // Clean URL
    if (payment) {
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (payment === "success" && sessionId) {
      handlePaymentSuccess(sessionId);
    } else if (payment === "cancelled") {
      handleCancelled();
    } else {
      checkOrphanedData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaymentSuccess = async (sessionId: string) => {
    const savedData = sessionStorage.getItem("complianceFormData");

    // Detect Quick Purchase sentinel: no data at all, or explicit quickPurchase flag
    let parsedData: (ComplianceFormData & { quickPurchase?: boolean }) | null = null;
    let isQP = false;

    if (!savedData) {
      // No sessionStorage at all — treat as Quick Purchase
      isQP = true;
    } else {
      try {
        parsedData = JSON.parse(savedData);
        if (parsedData?.quickPurchase === true) {
          isQP = true;
        }
      } catch {
        // Corrupt data — treat as Quick Purchase rather than blocking the buyer
        isQP = true;
      }
    }

    setStatus("verifying");
    // Scroll to show the verification spinner
    setTimeout(() => {
      const el = document.getElementById("post-payment");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // formData is included so verify-payment can save the purchase to the DB
        // as a synchronous fallback before the Stripe webhook fires.
        // Quick Purchase passes null — verify-payment already supports this.
        body: JSON.stringify({ sessionId, formData: isQP ? null : parsedData }),
      });
      const result = await response.json();

      if (result.verified) {
        sessionStorage.removeItem("complianceFormData");
        setDeliveryToken(result.deliveryToken || "");
        setVerifiedSessionId(sessionId);

        if (isQP) {
          // Show mini-form before the download panel
          setIsQuickPurchase(true);
          setStatus("ready");
        } else {
          setFormData(parsedData as ComplianceFormData);
          setStatus("ready");
        }

        // Scroll to download section after render
        setTimeout(() => {
          const el = document.getElementById("post-payment");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        setStatus("error");
        setErrorMessage(
          "Payment could not be verified. If you were charged, please contact support with your receipt."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to verify payment. Please check your internet connection and refresh the page."
      );
    }
  };

  const handleCancelled = () => {
    setShowCancelledBanner(true);
    const savedData = sessionStorage.getItem("complianceFormData");
    if (savedData) {
      // Data survives in sessionStorage — questionnaire will restore from it
      // Just scroll to the generator section
      const el = document.getElementById("generator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const checkOrphanedData = () => {
    const savedData = sessionStorage.getItem("complianceFormData");
    if (!savedData) return;
    try {
      const data: ComplianceFormData = JSON.parse(savedData);
      if (data?.company?.name) {
        setOrphanedData(data);
        setShowRestoreBanner(true);
      }
    } catch {
      // Invalid data
    }
  };

  const ensureDocs = useCallback(async (): Promise<GeneratedDoc[]> => {
    if (docs) return docs;
    if (!formData) throw new Error("No form data");

    const { generateDocuments } = await import("@/lib/pdf-generator");
    const generated = await generateDocuments(formData);
    setDocs(generated);
    return generated;
  }, [docs, formData]);

  const handleDownload = async () => {
    setDownloadState("generating");
    try {
      const generated = await ensureDocs();
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (const item of generated) {
        const pdfBlob = item.doc.output("blob");
        zip.file(item.name, pdfBlob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const companyName = formData?.company?.name
        ?.replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "_")
        .replace(/_+/g, "_")
        .substring(0, 40)
        .replace(/_$/, "") || "Compliance";
      const regName = regulationSlug.replace(/-/g, "_");
      const zipName = `${companyName}_${regName}_Package.zip`;

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = zipName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadState("done");
    } catch (err) {
      console.error("Download error:", err);
      setDownloadState("error");
    }
  };

  const handleEmailSend = async () => {
    const validEmails = emailInputs
      .map((e) => e.trim())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    if (validEmails.length === 0) {
      setEmailStatus({
        type: "error",
        message: "Enter at least one valid email address.",
      });
      return;
    }

    setSendingEmail(true);
    setEmailStatus(null);

    try {
      const generated = await ensureDocs();
      const emailDocs = generated.map((item) => ({
        filename: item.name,
        base64: item.doc.output("datauristring").split(",")[1],
      }));

      const response = await fetch("/api/send-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails: validEmails,
          documents: emailDocs,
          companyName: formData!.company.name,
          contactName: formData!.contact?.name || "",
          regulation: regulationSlug,
          deliveryToken,
          sessionId: verifiedSessionId,
        }),
      });

      const result = await response.json();

      if (result.sent) {
        setEmailStatus({
          type: "success",
          message: `Documents sent to ${validEmails.join(", ")}`,
        });
      } else {
        setEmailStatus({
          type: "error",
          message: result.error || "Failed to send. Please try again.",
        });
      }
    } catch {
      setEmailStatus({
        type: "error",
        message: "Could not connect. Check your internet and try again.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handleQuickPurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const errors: Partial<QuickPurchaseFields> = {};
    if (!quickFields.companyName.trim()) errors.companyName = "Required";
    if (!quickFields.aiToolName.trim()) errors.aiToolName = "Required";
    if (!quickFields.contactName.trim()) errors.contactName = "Required";

    if (Object.keys(errors).length > 0) {
      setQuickFieldErrors(errors);
      return;
    }

    // Build a full ComplianceFormData with sensible defaults for everything
    // the buyer didn't fill in during the Quick Purchase flow.
    const completed: ComplianceFormData = {
      regulation: regulationSlug,
      company: {
        name: quickFields.companyName.trim(),
        state: "",
        size: "",
        industry: "",
      },
      aiSystems: [
        {
          name: quickFields.aiToolName.trim(),
          vendor: "",
          description: "",
          decisions: [],
        },
      ],
      dataInputs: [],
      protectedCharacteristics: [],
      biasAudit: "",
      oversight: {
        aiRole: quickFields.aiRole,
        oversightRole: "",
        humanReview: "",
        reviewFrequency: "",
      },
      contact: {
        name: quickFields.contactName.trim(),
        title: "",
        email: "",
        phone: "",
      },
      generatedDate: new Date().toISOString().split("T")[0],
      selectedAddons: [],
    };

    setFormData(completed);
    setIsQuickPurchase(false);
  };

  // Cancelled payment banner
  if (showCancelledBanner) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 mb-6 max-w-3xl mx-auto mt-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-blue-800 text-sm font-medium">
            No charge was made. Your form is saved &mdash; pick up where you left off.
          </p>
        </div>
        <button
          onClick={() => setShowCancelledBanner(false)}
          className="text-blue-400 hover:text-blue-700 text-xl leading-none shrink-0"
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    );
  }

  // Orphaned data banner
  if (showRestoreBanner && orphanedData) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-blue-700 text-white p-4 text-center z-50 shadow-lg">
        <p className="font-semibold">
          You have a saved form in progress for {orphanedData.company.name}.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <button
            onClick={() => {
              setShowRestoreBanner(false);
              const el = document.getElementById("generator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-blue-700 font-bold px-6 py-2 rounded hover:bg-blue-50 transition"
          >
            Continue where I left off
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("complianceFormData");
              setShowRestoreBanner(false);
            }}
            className="text-blue-200 hover:text-white font-medium px-4 py-2 transition"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50 shadow-lg">
        <p className="font-semibold">{errorMessage}</p>
        <p className="text-sm mt-1 text-red-100">
          Contact: info@aicompliancedocuments.com (include your Stripe receipt)
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="absolute top-2 right-4 text-white text-xl"
        >
          &times;
        </button>
      </div>
    );
  }

  // Verifying
  if (status === "verifying") {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Verifying payment">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-900">
            Verifying your payment...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This usually takes just a moment.
          </p>
        </div>
      </div>
    );
  }

  // Quick Purchase mini-form — shown when payment is verified but we need details
  if (status === "ready" && isQuickPurchase) {
    return (
      <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto" role="dialog" aria-modal="true" aria-label="Customize your documents">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-xl w-full mx-4 my-8 sm:my-16 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-1">
                Almost there — customize your documents
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                We just need a few details to personalize your compliance documents.
              </p>
            </div>

            <form onSubmit={handleQuickPurchaseSubmit} noValidate className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={quickFields.companyName}
                  onChange={(e) => {
                    setQuickFields((f) => ({ ...f, companyName: e.target.value }));
                    setQuickFieldErrors((err) => ({ ...err, companyName: undefined }));
                  }}
                  placeholder="Acme Corp"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    quickFieldErrors.companyName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {quickFieldErrors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{quickFieldErrors.companyName}</p>
                )}
              </div>

              {/* AI Tool Name */}
              <div>
                <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  AI System / Tool Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={quickFields.aiToolName}
                  onChange={(e) => {
                    setQuickFields((f) => ({ ...f, aiToolName: e.target.value }));
                    setQuickFieldErrors((err) => ({ ...err, aiToolName: undefined }));
                  }}
                  placeholder="e.g., HireVue, ChatGPT, Workday AI"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    quickFieldErrors.aiToolName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {quickFieldErrors.aiToolName && (
                  <p className="text-red-500 text-xs mt-1">{quickFieldErrors.aiToolName}</p>
                )}
              </div>

              {/* AI Role dropdown */}
              <div>
                <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  Your Role in AI Decisions <span className="text-red-500">*</span>
                </label>
                <select
                  value={quickFields.aiRole}
                  onChange={(e) => setQuickFields((f) => ({ ...f, aiRole: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-slate-700 dark:text-white dark:border-slate-600"
                >
                  {AI_ROLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Name for compliance documents</p>
                <input
                  type="text"
                  value={quickFields.contactName}
                  onChange={(e) => {
                    setQuickFields((f) => ({ ...f, contactName: e.target.value }));
                    setQuickFieldErrors((err) => ({ ...err, contactName: undefined }));
                  }}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:bg-slate-700 dark:text-white dark:border-slate-600 ${
                    quickFieldErrors.contactName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {quickFieldErrors.contactName && (
                  <p className="text-red-500 text-xs mt-1">{quickFieldErrors.contactName}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-6 rounded-lg transition text-base mt-2"
              >
                Generate My Documents
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Ready — show download/email panel as modal
  if (status === "ready" && formData) {
    return (
      <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto" role="dialog" aria-modal="true" aria-label="Your documents are ready">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-4 my-8 sm:my-16 overflow-hidden">
          <div className="p-6 sm:p-8">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-display text-gray-900 mb-2">
            Payment Confirmed!
          </h2>
          <p className="text-gray-600">
            Your compliance documents for {formData.company.name} are ready.
          </p>
        </div>

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          How would you like your documents?
        </p>

        {/* Download option */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadState === "generating" || downloadState === "done"}
            className={`w-full font-bold py-4 px-8 rounded-lg transition text-lg flex items-center justify-center gap-3 ${
              downloadState === "done"
                ? "bg-green-700 text-white"
                : downloadState === "error"
                  ? "bg-red-600 text-white"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            {downloadState === "generating"
              ? "Preparing your package..."
              : downloadState === "done"
                ? "Package downloaded!"
                : downloadState === "error"
                  ? "Error \u2014 try again"
                  : "Download Complete Package (.zip)"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400 font-medium">and / or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email option */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-blue-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <h3 className="font-bold font-display text-lg text-gray-900">
              Email to Your Team
            </h3>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Send all documents as attachments &mdash; up to 3 recipients.
          </p>

          <div className="space-y-3 mb-4">
            {emailInputs.map((email, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const next = [...emailInputs];
                    next[i] = e.target.value;
                    setEmailInputs(next);
                  }}
                  placeholder={
                    i === 0 ? "email@company.com" : "Another recipient (optional)"
                  }
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setEmailInputs((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="text-gray-400 hover:text-red-500 transition p-1 text-xl"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          {emailInputs.length < 3 && (
            <button
              type="button"
              onClick={() => setEmailInputs((prev) => [...prev, ""])}
              className="text-blue-700 hover:text-blue-900 text-sm font-medium mb-4 flex items-center gap-1"
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
              Add another recipient
            </button>
          )}

          <button
            type="button"
            onClick={handleEmailSend}
            disabled={sendingEmail}
            className={`w-full font-bold py-3 px-6 rounded-lg transition text-base ${
              emailStatus?.type === "success"
                ? "bg-green-700 text-white"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            {sendingEmail
              ? "Generating & Sending..."
              : emailStatus?.type === "success"
                ? "Sent!"
                : "Send Documents via Email"}
          </button>

          {emailStatus && (
            <p
              className={`text-sm mt-3 text-center ${
                emailStatus.type === "success"
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {emailStatus.message}
            </p>
          )}
        </div>

        {/* Account CTA — optional next step, not a gate */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Want to access your documents anytime? Create a free account.
          </p>
          <a
            href="/account/login"
            className="inline-block px-5 py-2 text-sm font-semibold text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
          >
            Create Account
          </a>
        </div>
          </div>
        </div>
      </div>
    );
  }

  // Idle — render nothing (questionnaire handles the form)
  return null;
}
