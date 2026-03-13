"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ComplianceFormData, GeneratedDoc } from "@/lib/pdf-types";

interface PostPaymentHandlerProps {
  regulationSlug: string;
}

type Status = "idle" | "verifying" | "ready" | "error";

export default function PostPaymentHandler({
  regulationSlug,
}: PostPaymentHandlerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState<ComplianceFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [docs, setDocs] = useState<GeneratedDoc[] | null>(null);

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

  const checkedRef = useRef(false);

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
    if (!savedData) {
      setStatus("error");
      setErrorMessage(
        "Form data was lost. Please fill out the form again \u2014 you will not be charged twice."
      );
      return;
    }

    setStatus("verifying");

    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const result = await response.json();

      if (result.verified) {
        const data: ComplianceFormData = JSON.parse(savedData);
        sessionStorage.removeItem("complianceFormData");
        setFormData(data);
        setStatus("ready");
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
      generated.forEach((item) => item.doc.save(item.name));
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
          Contact: info@aicomplydocs.com (include your Stripe receipt)
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
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900">
          Verifying your payment...
        </p>
        <p className="text-gray-500 text-sm mt-2">
          This usually takes just a moment.
        </p>
      </div>
    );
  }

  // Ready — show download/email panel
  if (status === "ready" && formData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
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
              ? "Generating..."
              : downloadState === "done"
                ? "Downloaded!"
                : downloadState === "error"
                  ? "Error \u2014 try again"
                  : "Download to This Device"}
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
      </div>
    );
  }

  // Idle — render nothing (questionnaire handles the form)
  return null;
}
