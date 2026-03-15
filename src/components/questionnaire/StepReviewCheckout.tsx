import type { StepReviewCheckoutProps } from "./types";

const ROLE_LABELS: Record<string, string> = {
  sole: "AI makes final decisions autonomously",
  primary: "AI recommendation is primary factor",
  advisory: "AI provides advisory input",
  screening: "AI screens/filters candidates",
};

export default function StepReviewCheckout({
  companyName,
  companyIndustry,
  companySize,
  companyState,
  aiSystems,
  decisions,
  aiRole,
  oversightRole,
  contactName,
  contactTitle,
  contactEmail,
  contactPhone,
  lawVisited,
  setLawVisited,
  acknowledged,
  setAcknowledged,
  includeTrainingKit,
  setIncludeTrainingKit,
  checkoutLoading,
  orderTotal,
  regulationName,
  statute,
  lawUrl,
  lawLinkText,
  acknowledgment,
  trainingKitAvailable,
  trainingKitPrice,
  basePrice,
  documents,
  handleCheckout,
}: StepReviewCheckoutProps) {
  return (
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
          You will receive ({documents.length} PDF documents):
        </h4>
        <ul className="space-y-2">
          {documents.map((doc, i) => (
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
          <strong>{statute}</strong>. You must review the actual
          law text before purchasing. The checkout button is locked until
          you do.
        </p>
        <a
          href={lawUrl}
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
          {lawLinkText}
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
          <strong>I confirm:</strong> {acknowledgment}
        </span>
      </label>

      {/* Training kit add-on */}
      {trainingKitAvailable && (
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
                Add Manager Training Kit (+${trainingKitPrice})
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
          {includeTrainingKit && trainingKitAvailable
            ? `Compliance Package $${basePrice} + Manager Training Kit $${trainingKitPrice}`
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

      {/* Support link */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Questions before purchasing?{" "}
        <a
          href="mailto:info@aicompliancedocuments.com"
          className="text-blue-700 hover:text-blue-900 underline"
        >
          info@aicompliancedocuments.com
        </a>
      </p>
    </div>
  );
}
