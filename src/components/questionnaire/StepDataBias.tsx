import type { StepDataBiasProps } from "./types";

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
  { value: "race", label: "Race / Color / Ethnicity" },
  { value: "gender", label: "Gender / Sex" },
  { value: "sexual_orientation", label: "Sexual orientation / Gender identity" },
  { value: "age", label: "Age" },
  { value: "disability", label: "Disability status" },
  { value: "religion", label: "Religion" },
  { value: "national_origin", label: "National origin / Ancestry" },
  { value: "pregnancy", label: "Pregnancy status" },
  { value: "marital_status", label: "Marital / Family status" },
  { value: "military", label: "Military status / Discharge" },
  { value: "citizenship", label: "Citizenship / Work authorization" },
  { value: "none", label: "None of the above" },
];

export default function StepDataBias({
  dataInputs,
  setDataInputs,
  protectedChars,
  setProtectedChars,
  biasAudit,
  setBiasAudit,
  helpTexts,
  toggleCheckbox,
}: StepDataBiasProps) {
  return (
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
  );
}
