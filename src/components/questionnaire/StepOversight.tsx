import type { StepOversightProps } from "./types";

export default function StepOversight({
  aiRole,
  setAiRole,
  oversightRole,
  setOversightRole,
  humanReview,
  setHumanReview,
  reviewFrequency,
  setReviewFrequency,
  helpTexts,
}: StepOversightProps) {
  return (
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
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Can a human review and override AI decisions?
        </label>
        <select
          value={humanReview}
          onChange={(e) => setHumanReview(e.target.value)}
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
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
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        >
          <option value="">Select...</option>
          <option value="quarterly">Quarterly</option>
          <option value="biannual">Every 6 months</option>
          <option value="annual">Annually</option>
          <option value="never">Not currently reviewed</option>
        </select>
      </div>
    </div>
  );
}
