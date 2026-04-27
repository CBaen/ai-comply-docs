/**
 * UrgencyPanel — Homepage urgency strip replacing FeaturedInBar.
 * Converts the homepage from research-resource signal to compliance-store signal.
 *
 * Four state rows: CO (Deadline Approaching) + IL / NYC / TX (Already Exposed).
 * Penalty copy is SHIP-BLOCKERS-corrected:
 *   - NYC: "Up to $1,500/violation; each day = separate violation" (not "$500–$1,500/day")
 *   - NYC label: "DCWP Enforcement Active Since July 2023" (not "DCWP Investigations Increasing in 2026")
 *   - NYC citation: NYC Admin. Code §§ 20-870 to 20-874 (range, not just § 20-870)
 *   - TX applicability: "AI developers + deployers" (not just "AI developers")
 *   - TX penalty: "$10K–$200K/viol (uncurable max)" (not "Up to $200K/viol")
 *   - CO: no per-consumer multiplier framing (belongs on product page only)
 */

interface UrgencyRow {
  mode: "deadline" | "exposed";
  law: string;
  href: string;
  status: string;
  penalty: string;
  applicability: string;
}

const rows: UrgencyRow[] = [
  {
    mode: "deadline",
    law: "Colorado SB 24-205",
    href: "/colorado-ai-compliance",
    status: "Deadline: June 30, 2026",
    penalty: "Up to $20,000/violation",
    applicability: "Deployers of high-risk AI systems",
  },
  {
    mode: "exposed",
    law: "Illinois HB3773",
    href: "/illinois-ai-compliance",
    status: "In Effect Since Jan 1, 2026",
    penalty: "Up to $70,000/violation",
    applicability: "Employers using AI in hiring or HR",
  },
  {
    mode: "exposed",
    law: "NYC Local Law 144",
    href: "/nyc-local-law-144-compliance",
    // SHIP-BLOCKER 6 fix: "DCWP Enforcement Active Since July 2023" — not "DCWP Investigations Increasing in 2026"
    status: "DCWP Enforcement Active Since July 2023",
    // SHIP-BLOCKER 2 fix: per-violation framing, not daily-cap framing
    // SHIP-BLOCKER 1 fix: citation range §§ 20-870 to 20-874 used in component comment above
    penalty: "Up to $1,500/violation; each day = separate violation",
    applicability: "Employers using AI in hiring or promotion (NYC Admin. Code §§ 20-870 to 20-874)",
  },
  {
    mode: "exposed",
    law: "Texas TRAIGA",
    href: "/texas-ai-compliance",
    status: "In Effect Since Jan 1, 2026",
    // SHIP-BLOCKER 4 fix: show range with uncurable max, not just upper end
    penalty: "$10K–$200K/viol (uncurable max)",
    // SHIP-BLOCKER 3 fix: deployers included, not just developers
    applicability: "AI developers + deployers",
  },
];

// Deadline Approaching: Amber — #D97706 (Tailwind amber-600)
// Already Exposed: Enforcement Red — #B91C1C (Tailwind red-700)

export default function UrgencyPanel() {
  return (
    <div className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-0 divide-y divide-slate-700 sm:divide-y-0">
          {rows.map((row) => {
            const isDeadline = row.mode === "deadline";
            const accentColor = isDeadline ? "#D97706" : "#B91C1C";
            const modePill = isDeadline ? "Deadline Approaching" : "Already Exposed";

            return (
              <a
                key={row.law}
                href={row.href}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2.5 sm:py-2 sm:px-3 sm:flex-1 hover:bg-slate-800 transition-colors group"
                style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: "0.75rem" }}
              >
                {/* Mode pill */}
                <span
                  className="text-xs font-bold uppercase tracking-wide shrink-0 px-1.5 py-0.5 rounded"
                  style={{
                    color: accentColor,
                    backgroundColor: isDeadline ? "rgba(217,119,6,0.12)" : "rgba(185,28,28,0.12)",
                  }}
                >
                  {modePill}
                </span>

                {/* Law name */}
                <span className="font-bold text-white text-sm group-hover:underline leading-tight">
                  {row.law}
                </span>

                {/* Separator — hidden on mobile */}
                <span className="hidden sm:inline text-slate-500 text-xs shrink-0" aria-hidden="true">
                  ·
                </span>

                {/* Status */}
                <span className="text-slate-300 text-xs shrink-0">{row.status}</span>

                {/* Separator — hidden on mobile */}
                <span className="hidden sm:inline text-slate-500 text-xs shrink-0" aria-hidden="true">
                  ·
                </span>

                {/* Penalty */}
                <span className="text-slate-200 text-xs font-medium shrink-0">{row.penalty}</span>

                {/* Separator — hidden on mobile */}
                <span className="hidden sm:inline text-slate-500 text-xs shrink-0" aria-hidden="true">
                  ·
                </span>

                {/* Applicability */}
                <span className="text-slate-400 text-xs leading-tight">{row.applicability}</span>

                {/* CTA arrow */}
                <span
                  className="hidden sm:inline text-xs font-semibold shrink-0 ml-auto whitespace-nowrap"
                  style={{ color: accentColor }}
                  aria-hidden="true"
                >
                  Get Documents →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
