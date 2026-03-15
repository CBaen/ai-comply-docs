import type { StepAISystemsProps } from "./types";

export default function StepAISystems({
  aiSystems,
  decisions,
  helpTexts,
  updateAISystem,
  toggleDecision,
  addAISystem,
  removeAISystem,
}: StepAISystemsProps) {
  return (
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
                className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-red-500 hover:text-red-700 text-sm font-medium"
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
  );
}
