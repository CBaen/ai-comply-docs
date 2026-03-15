import type { StepContactProps } from "./types";

export default function StepContact({
  contactName,
  setContactName,
  contactTitle,
  setContactTitle,
  contactEmail,
  setContactEmail,
  contactPhone,
  setContactPhone,
  helpTexts,
}: StepContactProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
        Contact Information
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {helpTexts.step5Intro}
      </p>
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contact Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contactName"
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="e.g., Jane Smith"
          aria-required="true"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          id="contactTitle"
          type="text"
          value={contactTitle}
          onChange={(e) => setContactTitle(e.target.value)}
          placeholder="e.g., Chief Compliance Officer"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="e.g., compliance@company.com"
          aria-required="true"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="e.g., (312) 555-0100"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
    </div>
  );
}
