/**
 * AlsoExposedStrip — Cross-state exposure callout for product pages.
 *
 * Renders compact cards for laws already in effect that share applicability
 * with the current product. Filtered by status === "in-effect" so cards
 * automatically appear/disappear as laws flip status.
 *
 * Spec: research/contest-buyer-redesign-2026-04-27/contestant-4/product-page-template.md
 *       (Mechanism 2 — Cross-Mode Surface for Multi-State Buyers)
 *
 * Card copy is taken from CARD_OVERRIDES below, NOT from regulations.ts.
 * The overrides apply SHIP-BLOCKERS audit corrections that have not yet
 * landed in regulations.ts (those product pages haven't been redesigned).
 * Source: research/contest-buyer-redesign-2026-04-27/SHIP-BLOCKERS.md
 */

import { getRegulation } from "@/data/regulations";

// Slug → list of slugs that share applicability with it.
// Filter at render time by reg.status === "in-effect" so cards drop out
// automatically when a law flips (e.g., Colorado on/after June 30, 2026).
const CROSS_STATE_EXPOSURE: Record<string, string[]> = {
  "colorado-sb24-205": [
    "illinois-hb3773",
    "nyc-local-law-144",
    "texas-traiga",
  ],
};

type CardOverride = {
  applicability: string;
  penalty: string;
  statusLabel: string;
};

// SHIP-BLOCKERS-corrected card copy.
//   - SB-1: NYC citation range §§ 20-870 to 20-874 (not § 20-870 alone)
//   - SB-2: NYC per-violation framing (not "$500–$1,500/day" daily-cap)
//   - SB-3: TX includes deployers (not just developers)
//   - SB-4: TX penalty range with uncurable max (not bare $200K)
//   - SB-6: NYC "DCWP Enforcement Active Since July 2023" (factual; not "investigations increasing")
const CARD_OVERRIDES: Record<string, CardOverride> = {
  "illinois-hb3773": {
    applicability: "Employers using AI in hiring or HR",
    penalty: "Up to $70,000/violation",
    statusLabel: "In Effect Since Jan 1, 2026",
  },
  "nyc-local-law-144": {
    applicability:
      "Employers using AI in hiring or promotion (NYC Admin. Code §§ 20-870 to 20-874)",
    penalty: "Up to $1,500/violation; each day = separate violation",
    statusLabel: "DCWP Enforcement Active Since July 2023",
  },
  "texas-traiga": {
    applicability: "AI developers + deployers",
    penalty: "$10K–$200K/viol (uncurable max)",
    statusLabel: "In Effect Since Jan 1, 2026",
  },
};

export default function AlsoExposedStrip({ slug }: { slug: string }) {
  const targetSlugs = CROSS_STATE_EXPOSURE[slug] ?? [];
  const cards = targetSlugs
    .map((s) => getRegulation(s))
    .filter((r): r is NonNullable<ReturnType<typeof getRegulation>> =>
      Boolean(r)
    )
    .filter((r) => r.status === "in-effect" && r.ready);

  if (cards.length === 0) return null;

  return (
    <section aria-labelledby="also-exposed-heading">
      <div
        className="rounded-lg p-5 sm:p-6 bg-red-50 border border-red-100"
        style={{ borderLeft: "4px solid #B91C1C" }}
      >
        <h2
          id="also-exposed-heading"
          className="text-xl font-bold font-display text-gray-900 mb-1"
        >
          Also Required If You Operate in These States
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          These laws are already in effect — no deadline to wait for.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {cards.map((card) => {
            const override = CARD_OVERRIDES[card.slug];
            const statusLabel =
              override?.statusLabel ?? `In Effect Since ${card.effectiveDate}`;
            const applicability =
              override?.applicability ?? card.appliesToSummary;
            const penalty = override?.penalty ?? card.maxPenalty;

            return (
              <a
                key={card.slug}
                href={`/products/${card.slug}`}
                className="block bg-white border border-red-100 rounded-lg p-4 hover:border-red-300 hover:shadow-sm transition group"
              >
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded mb-2"
                  style={{ backgroundColor: "#B91C1C" }}
                >
                  In Effect
                </span>
                <p className="font-bold text-gray-900 mb-1 leading-tight">
                  {card.shortName}
                </p>
                <p className="text-xs text-gray-600 mb-2 leading-snug">
                  {statusLabel}
                </p>
                <p className="text-sm text-gray-700 mb-2 leading-snug">
                  {applicability}
                </p>
                <p
                  className="text-sm font-semibold mb-3 leading-snug"
                  style={{ color: "#B91C1C" }}
                >
                  {penalty}
                </p>
                <span
                  className="text-xs font-semibold group-hover:underline"
                  style={{ color: "#B91C1C" }}
                >
                  Get Documents &rarr;
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
