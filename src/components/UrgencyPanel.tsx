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
//
// Layout: 4 cards in a responsive grid (1 col mobile / 2 col tablet / 4 col desktop).
// Each card stacks vertically with clean hierarchy — pill, law name, status,
// penalty, applicability, CTA — and a colored left border carries the mode signal.

export default function UrgencyPanel() {
  return (
    <div className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {rows.map((row) => {
            const isDeadline = row.mode === "deadline";
            const accentColor = isDeadline ? "#D97706" : "#B91C1C";
            const accentBg = isDeadline ? "rgba(217,119,6,0.10)" : "rgba(185,28,28,0.10)";
            const modePill = isDeadline ? "Deadline Approaching" : "Already Exposed";

            return (
              <a
                key={row.law}
                href={row.href}
                className="group flex flex-col gap-1.5 rounded-md p-3.5 bg-slate-800/40 hover:bg-slate-800 transition-colors"
                style={{ borderLeft: `3px solid ${accentColor}` }}
              >
                <span
                  className="inline-flex self-start text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
                  style={{ color: accentColor, backgroundColor: accentBg }}
                >
                  {modePill}
                </span>

                <p className="font-bold text-white text-sm leading-tight group-hover:underline">
                  {row.law}
                </p>

                <p className="text-slate-300 text-xs leading-snug">
                  {row.status}
                </p>

                <p className="text-slate-100 text-xs font-semibold leading-snug">
                  {row.penalty}
                </p>

                <p className="text-slate-400 text-xs leading-snug">
                  {row.applicability}
                </p>

                <span
                  className="inline-flex self-start text-xs font-semibold mt-0.5 group-hover:underline"
                  style={{ color: accentColor }}
                >
                  Get Documents &rarr;
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
