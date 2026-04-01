/**
 * DESIGN 1: CATEGORY SHOWCASE
 * ============================================================
 * Designer: 1
 * Concept: Products organized by category, each with its own visual
 * section, image, and personality. A compliance officer lands here and
 * immediately sees their world reflected back at them: "Employment Law,"
 * "Consumer Privacy," "AI Governance," "Industry Kits," "Add-Ons."
 * No hunting. No filtering. Just pick your domain and buy.
 *
 * Architecture:
 * - page.tsx is a server component (this file)
 * - All sub-components below are server components (no useState/useEffect)
 * - The sticky category nav uses pure CSS anchor links (no JS required)
 * - CategorySection, ProductCard, UrgencyBanner, GuidancePanel, TrustBar,
 *   ClosingCTA are all inline server components
 *
 * WCAG AA compliant: all text ≥ 4.5:1 contrast, all interactive elements
 * have visible focus rings and aria labels, keyboard navigable.
 * ============================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { regulations, type Regulation } from "@/data/regulations";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Compliance Templates — All Products",
  description:
    "Browse all AI compliance templates for US state and federal AI regulations. State-specific packages for Illinois, Colorado, Texas, California, New York, and more. Instant download.",
  keywords: [
    "ai compliance templates",
    "ai regulation compliance",
    "state ai law compliance",
    "illinois hb3773 template",
    "colorado sb24-205 template",
    "texas traiga compliance",
    "california ccpa admt",
    "ai governance documents",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com/products",
  },
  openGraph: {
    title: "AI Compliance Templates — All Products",
    description:
      "Browse all AI compliance templates for US state and federal regulations. Instant download, fraction of legal fees.",
    url: "https://aicompliancedocuments.com/products",
    type: "website",
  },
};

// ─── Schema ──────────────────────────────────────────────────────────────────

function ItemListSchema() {
  const ready = regulations.filter((r) => r.ready);
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Compliance Document Packages",
    numberOfItems: ready.length,
    itemListElement: ready.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://aicompliancedocuments.com/products/${r.slug}`,
      name: r.shortName,
    })),
  });
  return <script type="application/ld+json">{data}</script>;
}

// ─── Category Configuration ───────────────────────────────────────────────────
// Each category gets: id, display label, tagline, image, accent color palette,
// and a description that speaks to the compliance officer's actual concern.

interface CategoryConfig {
  id: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Tailwind classes for the section background */
  bg: string;
  /** Tailwind classes for the heading color */
  accent: string;
  /** Tailwind text color for tagline */
  taglineColor: string;
  /** Tailwind border color for cards on hover */
  cardBorder: string;
  /** Tailwind bg for the section label pill */
  pillBg: string;
  pillText: string;
  /** Match function: which regulations belong here */
  match: (r: Regulation) => boolean;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "employment",
    label: "State Employment AI Laws",
    tagline: "Hiring algorithms are under a microscope.",
    description:
      "If your company uses any automated tool to screen, rank, or evaluate candidates in Illinois, New York City, or Colorado — you already have an active obligation. These packages cover the bias audit, disclosure, and documentation requirements for each jurisdiction.",
    image: "/images/landing/team-compliance-meeting.png",
    imageAlt: "Compliance team reviewing employment AI documentation",
    bg: "bg-white",
    accent: "text-blue-900",
    taglineColor: "text-blue-700",
    cardBorder: "hover:border-blue-700",
    pillBg: "bg-blue-100",
    pillText: "text-blue-800",
    match: (r) => r.category === "Employment",
  },
  {
    id: "consumer-privacy",
    label: "Consumer Privacy & Data Rights",
    tagline: "Nine states. One set of obligations.",
    description:
      "Automated profiling, data protection assessments, opt-out rights. The patchwork of state consumer privacy laws all converge on the same core documentation set. Whether you are in Texas, California, Virginia, or all nine — these packages are built against the statute text.",
    image: "/images/landing/california-golden-gate.png",
    imageAlt: "California skyline representing state privacy law",
    bg: "bg-slate-50",
    accent: "text-emerald-900",
    taglineColor: "text-emerald-700",
    cardBorder: "hover:border-emerald-700",
    pillBg: "bg-emerald-100",
    pillText: "text-emerald-800",
    match: (r) =>
      r.category === "Consumer Privacy" ||
      r.category === "Data Privacy" ||
      r.category === "Consumer Protection",
  },
  {
    id: "ai-governance",
    label: "AI Governance & Federal Frameworks",
    tagline: "Build the infrastructure before regulators demand it.",
    description:
      "NIST AI RMF, Texas TRAIGA, EU AI Act, and your own internal governance architecture. These packages give you the registry, framework, transparency reporting, and risk management documentation that every mature AI program needs — regardless of which state you operate in.",
    image: "/images/landing/financial-building.png",
    imageAlt: "Federal building representing AI governance frameworks",
    bg: "bg-white",
    accent: "text-violet-900",
    taglineColor: "text-violet-700",
    cardBorder: "hover:border-violet-700",
    pillBg: "bg-violet-100",
    pillText: "text-violet-800",
    match: (r) =>
      r.category === "AI Governance" ||
      r.category === "Internal Policy" ||
      r.category === "Vendor Management" ||
      r.category === "Audit & Testing" ||
      r.category === "Risk Management" ||
      r.category === "Universal Tools",
  },
  {
    id: "industry",
    label: "Industry-Specific Packages",
    tagline: "Your sector has its own AI exposure. We wrote the playbook.",
    description:
      "Healthcare, financial services, K-12 education, and HR recruiting each face a distinct layer of AI compliance obligations on top of state law. These packages address the sector-specific requirements that generic templates miss.",
    image: "/images/landing/healthcare-corridor.png",
    imageAlt: "Healthcare corridor representing industry-specific AI compliance",
    bg: "bg-slate-50",
    accent: "text-rose-900",
    taglineColor: "text-rose-700",
    cardBorder: "hover:border-rose-700",
    pillBg: "bg-rose-100",
    pillText: "text-rose-800",
    match: (r) =>
      r.tier === "industry" || r.tier === "international",
  },
  {
    id: "addons",
    label: "Add-Ons and Specialized Kits",
    tagline: "Already have a base package? Go deeper.",
    description:
      "State-specific appeal kits, bias audit management, opt-out notice templates, consumer rights workflows. Add-ons extend your base compliance package with the supporting documents that turn a filing into a program.",
    image: "/images/landing/documents-on-desk.png",
    imageAlt: "Compliance documents on a desk",
    bg: "bg-white",
    accent: "text-amber-900",
    taglineColor: "text-amber-700",
    cardBorder: "hover:border-amber-700",
    pillBg: "bg-amber-100",
    pillText: "text-amber-800",
    match: (r) =>
      r.category === "Add-On" || r.category === "Human Resources",
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status, ready }: { status: string; ready: boolean }) {
  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">
        <span className="inline-block w-1.5 h-1.5 rounded-sm bg-slate-400" aria-hidden="true" />
        Coming Soon
      </span>
    );
  }
  const map: Record<string, { bg: string; dot: string; label: string }> = {
    "in-effect": { bg: "bg-red-100 text-red-800", dot: "bg-red-500", label: "In Effect" },
    "effective-soon": { bg: "bg-amber-100 text-amber-800", dot: "bg-amber-500", label: "Effective Soon" },
    proposed: { bg: "bg-slate-100 text-slate-600", dot: "bg-slate-400", label: "Proposed" },
  };
  const s = map[status] ?? map.proposed;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded font-semibold shrink-0 ${s.bg}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-sm ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  reg,
  cardBorder,
}: {
  reg: Regulation;
  cardBorder: string;
}) {
  const firstSentence =
    reg.description.match(/^[^.!?]+[.!?]/)?.[0] ?? reg.description;

  return (
    <article
      className={`bg-white rounded-xl border border-gray-200 p-5 flex flex-col transition-all duration-200 ${cardBorder} hover:shadow-lg group`}
      aria-label={`${reg.shortName} compliance package`}
    >
      {/* Name + status */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-bold text-base text-gray-900 leading-snug font-display group-hover:text-blue-800 transition-colors">
          {reg.shortName}
        </h3>
        <StatusBadge status={reg.status} ready={reg.ready} />
      </div>

      {/* State + effective date */}
      <p className="text-xs text-gray-500 mb-3">
        {reg.state}
        {reg.effectiveDate
          ? ` · ${reg.status === "in-effect" ? "In effect" : "Effective"} ${reg.effectiveDate}`
          : ""}
      </p>

      {/* First-sentence description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
        {firstSentence}
      </p>

      {/* Price + CTA */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-gray-900 font-display leading-none">
              ${reg.price}
            </span>
            <span className="text-xs text-gray-500">one-time</span>
          </div>
          <span className="text-xs text-gray-500">{reg.documentCount} docs</span>
        </div>

        {reg.ready ? (
          <Link
            href={`/products/${reg.slug}`}
            className="block w-full text-center bg-blue-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition"
            aria-label={`View details for ${reg.shortName}`}
          >
            View Details
          </Link>
        ) : (
          <Link
            href={`/products/${reg.slug}`}
            className="block w-full text-center bg-slate-50 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold text-sm hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition"
            aria-label={`Learn more about ${reg.shortName}, coming soon`}
          >
            Learn More
          </Link>
        )}
      </div>
    </article>
  );
}

// ─── Urgency Banner ───────────────────────────────────────────────────────────
// Server component. Thin red strip showing which laws are actively enforced.

function UrgencyBanner({ allRegs }: { allRegs: Regulation[] }) {
  const urgent = allRegs
    .filter((r) => r.ready && r.status === "in-effect")
    .slice(0, 4);

  if (urgent.length === 0) return null;

  return (
    <div
      className="bg-red-900 text-white"
      role="alert"
      aria-label="Regulations currently in effect with live penalties"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
        <span className="text-xs font-bold uppercase tracking-wider text-red-300 shrink-0">
          Enforcement Active
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {urgent.map((r) => (
            <Link
              key={r.slug}
              href={`/products/${r.slug}`}
              className="text-xs text-red-100 hover:text-white hover:underline transition flex items-center gap-1.5"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"
                aria-hidden="true"
              />
              {r.shortName}
            </Link>
          ))}
        </div>
        <span className="sm:ml-auto text-xs text-red-400 shrink-0 hidden sm:block">
          Penalties are live —{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({
  config,
  products,
}: {
  config: CategoryConfig;
  products: Regulation[];
}) {
  const readyCount = products.filter((p) => p.ready).length;
  const totalCount = products.length;

  return (
    <section
      id={config.id}
      className={`${config.bg} py-12 sm:py-16 scroll-mt-16`}
      aria-labelledby={`heading-${config.id}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8 md:mb-10">
          {/* Image */}
          <div className="md:w-56 lg:w-64 shrink-0">
            <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-[4/3] shadow-md">
              <img
                src={config.image}
                alt={config.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${config.pillBg} ${config.pillText}`}
            >
              {totalCount} packages &middot; {readyCount} available now
            </span>

            <h2
              id={`heading-${config.id}`}
              className={`text-2xl sm:text-3xl font-extrabold font-display leading-tight mb-2 ${config.accent}`}
            >
              {config.label}
            </h2>
            <p className={`text-base font-semibold mb-2 ${config.taglineColor}`}>
              {config.tagline}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-prose">
              {config.description}
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          role="list"
          aria-label={`${config.label} products`}
        >
          {products.map((reg) => (
            <div key={reg.slug} role="listitem">
              <ProductCard reg={reg} cardBorder={config.cardBorder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sticky Category Nav ──────────────────────────────────────────────────────
// Pure server component — CSS scroll-behavior: smooth handles animation.

function CategoryNav({ categories }: { categories: CategoryConfig[] }) {
  return (
    <nav
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      aria-label="Jump to product category"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto gap-0 scrollbar-none -mx-1 px-1">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 px-4 py-3.5 text-sm font-medium text-gray-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-800 transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-inset"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

function TrustBar({ readyCount }: { readyCount: number }) {
  const items = [
    { value: String(readyCount), label: "Compliance packages" },
    { value: "Built against", sublabel: "enacted statute text" },
    { value: "Instant", sublabel: "download, no wait" },
    { value: "Fraction of", sublabel: "attorney fee cost" },
  ];

  return (
    <div className="bg-slate-900 py-6 sm:py-8" aria-label="Product overview stats">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item) => (
            <div key={item.value + (item.label ?? item.sublabel)} className="text-center">
              <dt className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-none mb-1">
                {item.value}
              </dt>
              <dd className="text-xs text-slate-400 uppercase tracking-wider">
                {item.label ?? item.sublabel}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ─── Guidance Panel ───────────────────────────────────────────────────────────

function GuidancePanel() {
  const scenarios = [
    {
      question: "Do you use AI in hiring decisions?",
      body: "If employees are in Illinois, NYC, or Colorado and an algorithm touches their evaluation, you have an active obligation.",
      links: [
        { href: "/products/illinois-hb3773", label: "Illinois HB3773" },
        { href: "/products/nyc-local-law-144", label: "NYC Local Law 144" },
        { href: "/products/colorado-sb24-205", label: "Colorado SB 24-205" },
        {
          href: "/products/multi-state-employer-ai-disclosure",
          label: "Multi-State Employer Bundle",
        },
      ],
    },
    {
      question: "Do you collect or profile consumer data?",
      body: "Targeted advertising, profiling for decisions, or selling data triggers assessment requirements in nine states.",
      links: [
        { href: "/products/california-ccpa-admt", label: "California CCPA ADMT" },
        { href: "/products/virginia-cdpa", label: "Virginia CDPA" },
        {
          href: "/products/multi-state-profiling-assessment",
          label: "Multi-State Profiling Bundle",
        },
      ],
    },
    {
      question: "Building AI governance from scratch?",
      body: "Start with an inventory of your AI systems, then layer in governance before regulators demand it.",
      links: [
        { href: "/products/ai-registry", label: "AI System Registry" },
        { href: "/products/ai-governance", label: "AI Governance Framework" },
        { href: "/products/nist-ai-rmf", label: "NIST AI RMF Package" },
      ],
    },
  ];

  return (
    <aside
      className="bg-blue-950 text-white py-10 sm:py-14"
      aria-labelledby="guidance-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
          <div
            className="shrink-0 w-10 h-10 rounded-lg bg-blue-800 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-blue-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h2
              id="guidance-heading"
              className="text-xl font-bold font-display mb-1"
            >
              Not sure which package fits your situation?
            </h2>
            <p className="text-blue-300 text-sm max-w-prose">
              Three questions narrow it down fast.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.question}
              className="bg-blue-900/50 rounded-xl p-5 border border-blue-800/60"
            >
              <p className="font-bold text-white text-sm mb-2">
                {scenario.question}
              </p>
              <p className="text-xs text-blue-300 mb-4 leading-relaxed">
                {scenario.body}
              </p>
              <ul className="space-y-1.5" aria-label={`Products for: ${scenario.question}`}>
                {scenario.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-blue-300 hover:text-white underline underline-offset-2 transition focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────

function ClosingCTA() {
  return (
    <section
      className="py-12 sm:py-16 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="mb-5">
          <img
            src="/images/landing/professional-reviewing-documents.png"
            alt=""
            aria-hidden="true"
            className="w-16 h-16 rounded-full object-cover mx-auto shadow-lg border-2 border-blue-700"
          />
        </div>
        <h2
          id="cta-heading"
          className="text-xl sm:text-2xl font-bold font-display text-white mb-3"
        >
          Still not sure which package fits your situation?
        </h2>
        <p className="text-blue-200 text-sm sm:text-base mb-6 leading-relaxed">
          Email us with a brief description of your business — where you
          operate, what AI tools you use, and your industry. We will tell
          you which regulations apply, at no charge.
        </p>
        <a
          href="mailto:info@aicompliancedocuments.com"
          className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 transition"
          aria-label="Email us to ask which compliance package you need"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Ask Us Which Package You Need
        </a>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegulationsIndexPage() {
  const allRegs = regulations;
  const readyRegs = allRegs.filter((r) => r.ready);

  // Build category sections. Only include categories that have at least one product.
  // Products can only appear in one category — first match wins (order in CATEGORIES matters).
  const assigned = new Set<string>();
  const categorySections = CATEGORIES.map((config) => {
    const products = allRegs.filter(
      (r) => !assigned.has(r.slug) && config.match(r)
    );
    products.forEach((r) => assigned.add(r.slug));
    return { config, products };
  }).filter(({ products }) => products.length > 0);

  return (
    <>
      <ItemListSchema />
      <Nav />

      {/* Live enforcement alert */}
      <UrgencyBanner allRegs={allRegs} />

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <header className="hero-bg text-white py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/product-tablet-desk.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-30"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900"
              aria-hidden="true"
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 sm:px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm rounded text-blue-200">
              <span
                className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm"
                aria-hidden="true"
              />
              {readyRegs.length} compliance packages available
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 sm:mb-4 leading-tight tracking-tight">
              AI Compliance Templates
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
              State-specific and universal AI compliance packages. Each built
              against the actual enacted statute text. Instant download,
              fraction of legal fees.
            </p>

            {/* Category quick-jump links */}
            <nav
              className="flex flex-wrap gap-2"
              aria-label="Jump to product category"
            >
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="text-xs font-medium px-3 py-1.5 rounded bg-white/10 text-blue-100 border border-white/20 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {cat.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Trust stats ───────────────────────────────────────────── */}
        <TrustBar readyCount={readyRegs.length} />

        {/* ── Sticky nav ────────────────────────────────────────────── */}
        <CategoryNav categories={CATEGORIES} />

        {/* ── Category sections ─────────────────────────────────────── */}
        {categorySections.map(({ config, products }) => (
          <CategorySection
            key={config.id}
            config={config}
            products={products}
          />
        ))}

        {/* ── Guidance panel ────────────────────────────────────────── */}
        <GuidancePanel />

        {/* ── Closing CTA ───────────────────────────────────────────── */}
        <ClosingCTA />
      </main>

      <Footer />
    </>
  );
}
