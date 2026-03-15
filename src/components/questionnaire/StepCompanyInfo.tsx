import type { StepCompanyInfoProps } from "./types";

export default function StepCompanyInfo({
  companyName,
  setCompanyName,
  companyState,
  setCompanyState,
  companySize,
  setCompanySize,
  companyIndustry,
  setCompanyIndustry,
}: StepCompanyInfoProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
        Company Information
      </h3>
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g., Acme Corporation"
          aria-required="true"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          State of Operation
        </label>
        <input
          id="state"
          type="text"
          value={companyState}
          onChange={(e) => setCompanyState(e.target.value)}
          placeholder="e.g., Illinois"
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company Size
        </label>
        <select
          id="companySize"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
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
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
    </div>
  );
}
