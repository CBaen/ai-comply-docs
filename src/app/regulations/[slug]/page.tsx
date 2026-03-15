import { regulations, getRegulation } from "@/data/regulations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Questionnaire from "@/components/Questionnaire";
import PostPaymentHandler from "@/components/PostPaymentHandler";

export async function generateStaticParams() {
  // Only generate pages for ready products — non-ready products
  // contain unverified data and should not be accessible
  return regulations.filter((r) => r.ready).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) return {};
  return {
    title: `${reg.name} — Compliance Documents`,
    description: reg.description,
    keywords: reg.keywords,
    alternates: {
      canonical: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
    },
    openGraph: {
      title: `${reg.name} — AI Compliance Documents`,
      description: reg.description,
      url: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
    },
  };
}

function StatusBadge({ status, ready }: { status: string; ready: boolean }) {
  // If the product isn't ready to buy, show COMING SOON regardless of law status
  if (!ready) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-semibold bg-slate-100 text-slate-600">
        <span className="inline-block w-1.5 h-1.5 rounded-sm bg-slate-400" />
        COMING SOON
      </span>
    );
  }
  const styles: Record<string, string> = {
    "in-effect": "bg-red-100 text-red-800",
    "effective-soon": "bg-amber-100 text-amber-800",
    proposed: "bg-slate-100 text-slate-600",
  };
  const labels: Record<string, string> = {
    "in-effect": "IN EFFECT",
    "effective-soon": "EFFECTIVE SOON",
    proposed: "PROPOSED",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-semibold ${styles[status] || styles.proposed}`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-sm ${status === "in-effect" ? "bg-red-500" : status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`}
      />
      {labels[status] || "PROPOSED"}
    </span>
  );
}

const DOC_EXPLANATIONS: Record<string, string> = {
  "Employee & Applicant AI Notification": "The notice you're legally required to give people before you use AI in decisions that affect them.",
  "AI System Inventory": "A structured list of every AI tool you use, so you know what you need to disclose.",
  "Impact Assessment Framework": "A written evaluation of whether your AI tools could be producing discriminatory outcomes. This is what the state asks for if there's a complaint.",
  "Human Oversight Protocol": "Documentation showing that a human reviews AI-driven decisions — not just approves them automatically.",
  "Compliance Checklist": "Every step you need to take, in order, so nothing gets missed.",
  "Accommodation Request Form": "If an employee or applicant wants a human-only process instead of AI, this is how they request it.",
  "Risk Management Policy": "Your organization's formal policy for identifying and managing AI risks. The foundation everything else builds on.",
  "Consumer Notice": "The disclosure you provide to consumers before or when AI is used in decisions about them.",
  "Transparency Statement": "A public-facing statement describing what AI systems you use, how they work, and what safeguards are in place.",
  "Record Retention Policy": "Documentation of what AI records you keep, how long you keep them, and why.",
  "Adverse Decision Kit": "Templates for notifying consumers when AI contributed to a decision that went against them, plus appeal process documentation.",
  "Incident Response Plan": "What your organization does if an AI system makes a bad decision, produces discriminatory outcomes, or fails.",
  "Privacy Notice": "The consumer-facing notice that explains what personal data you collect, how you use it, and what rights consumers have.",
  "Data Protection Assessment": "A documented evaluation weighing the benefits of your data processing against the risks to consumers. Required by most state privacy laws.",
  "Data Processing Agreement": "A contract between you and your data processors that defines responsibilities, security requirements, and compliance obligations.",
  "Opt-Out Documentation": "The mechanism and process for consumers to opt out of data processing, profiling, or targeted advertising.",
  "Consumer Rights Procedures": "Internal procedures for handling consumer requests to access, correct, delete, or port their data within legal deadlines.",
  "Bias Audit Report": "A structured report documenting the results of testing your AI tools for discriminatory outcomes.",
  "Impact Ratio Worksheet": "The statistical calculations showing selection rates and impact ratios across demographic groups.",
  "Remediation Plan": "If your AI system shows bias, this documents what you're doing to fix it.",
  "Candidate Notification": "The notice you give job candidates when automated tools are used in their hiring process.",
  "Bias Audit Summary": "The public summary of your bias audit results that must be posted on your website.",
  "Alternative Selection Process": "Documentation of the alternative non-AI process you offer when candidates request one.",
  "Pre-Use Notice": "The notice consumers must receive before automated decisionmaking technology is applied to them.",
  "Risk Assessment": "A documented assessment of the risks your AI processing activities pose to consumers.",
  "Opt-Out Mechanism": "The technical and procedural mechanism consumers use to opt out of automated decisionmaking.",
  "Consumer Access Procedures": "How consumers can request access to the logic behind AI decisions that affected them.",
  "Human Review Process": "The procedure for human review when consumers challenge an AI-driven decision.",
  "Conformity Assessment": "EU AI Act documentation proving your high-risk AI system meets the regulatory requirements.",
  "Technical Documentation": "The detailed technical dossier required by the EU AI Act describing how your AI system works.",
  "Fundamental Rights Impact Assessment": "An assessment of how your AI system could affect people's fundamental rights.",
  "Quality Management System": "Your organization's quality management framework for AI systems, as required by the EU AI Act.",
  "Post-Market Monitoring Plan": "Your plan for monitoring AI system performance after deployment.",
  "Governance Policy": "The overarching policy defining who in your organization makes AI decisions and how.",
  "Steering Committee Charter": "The charter for your AI governance committee, defining membership, authority, and meeting cadence.",
  "Ethics Principles": "Your organization's stated principles for responsible AI use.",
  "Approval Workflow": "The documented process for approving new AI systems before deployment.",
  "Risk Classification Matrix": "A framework for categorizing AI systems by risk level to determine what governance they require.",
  "Acceptable Use Policy": "The internal policy telling employees what they can and can't do with AI tools at work.",
  "Training Acknowledgment": "A sign-off form confirming employees completed AI training.",
  "Incident Reporting Form": "The form employees use to report AI-related problems or concerns.",
  "Vendor Due Diligence Questionnaire": "The questions you ask AI vendors before buying or renewing their tools.",
  "Contract Addendum": "AI-specific contract language to add to your vendor agreements.",
  "Monitoring Checklist": "A structured checklist for ongoing review of your AI vendors' compliance.",
  "Vendor Risk Assessment": "An assessment of the risks each AI vendor poses to your compliance posture.",
};

function StructuredData({ reg }: { reg: { slug: string; name: string; description: string; price: number; ready: boolean } }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: reg.name,
    description: reg.description,
    url: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
    brand: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    offers: {
      "@type": "Offer",
      price: reg.price.toString(),
      priceCurrency: "USD",
      url: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
      availability: reg.ready
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "AI Compliance Documents",
      },
    },
  });

  return <script type="application/ld+json">{data}</script>;
}

const BLOG_GUIDES: Record<string, { url: string; title: string }> = {
  "illinois-hb3773": {
    url: "/blog/illinois-hb3773-ai-employment-law-what-employers-need",
    title: "Illinois HB3773: What Employers Need to Know",
  },
  "california-ccpa-admt": {
    url: "/blog/california-ccpa-admt-risk-assessment-compliance-2026",
    title: "California CCPA ADMT: Risk Assessment Compliance Guide",
  },
  "virginia-cdpa": {
    url: "/blog/virginia-cdpa-data-protection-assessment-profiling-requirements",
    title: "Virginia CDPA: Data Protection Assessment Requirements",
  },
  "colorado-sb24-205": {
    url: "/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know",
    title: "Colorado SB 24-205: What Businesses Need to Know",
  },
  "connecticut-ctdpa": {
    url: "/blog/connecticut-ctdpa-data-protection-assessment-profiling-requirements",
    title: "Connecticut CTDPA: Data Protection Assessment Guide",
  },
};

const RELATED_ADDONS: Record<string, string[]> = {
  "illinois-hb3773": ["il-notice-response-kit", "il-zip-proxy-audit"],
  "colorado-sb24-205": ["co-appeal-correction-kit", "co-ag-reporting-kit", "co-dev-deploy-exchange"],
  "california-ccpa-admt": ["ca-admt-notice-optout", "ca-admt-access-kit", "ca-cyber-audit-kit"],
  "nyc-local-law-144": ["nyc-bias-audit-mgmt", "nyc-candidate-notice-kit"],
  "virginia-cdpa": ["va-consumer-rights-kit", "va-profiling-assessment-kit", "va-controller-processor-kit"],
  "eu-ai-act": ["eu-fria-kit", "eu-post-market-kit", "eu-human-oversight-kit", "eu-registration-transparency"],
};

export default async function RegulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const reg = getRegulation(slug);
  if (!reg) notFound();
  // Only show product pages for ready products — non-ready products
  // contain unverified data and should not be visible to customers
  if (!reg.ready) notFound();

  const blogGuide = BLOG_GUIDES[reg.slug] ?? null;

  return (
    <>
      <Nav />
      <StructuredData reg={reg} />
      <main id="main-content">
        {/* Hero */}
        <div className="hero-bg text-white py-10 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/#products"
                className="text-blue-300 hover:text-white text-sm transition"
              >
                &larr; All Products
              </Link>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm">{reg.state}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <StatusBadge status={reg.status} ready={reg.ready} />
              <span className="text-slate-400 text-xs sm:text-sm">
                Effective: {reg.effectiveDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-display mb-3 sm:mb-4 leading-tight">
              {reg.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
              {reg.description}
            </p>
            <div className="mb-5 sm:mb-6">
              <a
                href={reg.citationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-white text-sm font-medium underline underline-offset-2 transition"
              >
                Read the enacted law: {reg.citation} →
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                  ${reg.price}
                </span>
                <span className="text-slate-400 text-sm ml-2">
                  one-time purchase
                </span>
              </div>
              {reg.ready ? (
                <a
                  href="#get-started"
                  className="hero-cta w-full sm:w-auto text-center bg-white text-slate-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
                >
                  Get Started
                </a>
              ) : (
                <span className="w-full sm:w-auto text-center bg-slate-700 text-slate-300 px-8 py-3 rounded-lg font-semibold text-lg cursor-default">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="bg-white border-b border-gray-200 py-3 sm:py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span>{reg.documentCount} documents included</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                <span>Max penalty: {reg.maxPenalty}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                <span>Secure checkout via Stripe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-10">
              {/* Penalties */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Penalties for Non-Compliance
                </h2>
                <div className="bg-red-50 border border-red-100 rounded p-6 border-l-4 border-l-red-400">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {reg.penaltySummary}
                  </p>
                  <p className="font-bold text-red-800 text-lg">
                    Maximum: {reg.maxPenalty}
                  </p>
                </div>
              </section>

              {/* Who Must Comply */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Who Must Comply
                </h2>
                <div className="bg-slate-50 border border-gray-200 rounded p-6">
                  <p className="text-gray-700 leading-relaxed">
                    {reg.appliesToSummary}
                  </p>
                </div>
              </section>

              {/* IDHR implementing rules notice — Illinois HB3773 only */}
              {reg.slug === "illinois-hb3773" && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> IDHR is currently developing implementing rules but has not yet published proposed rules. These templates address the statutory requirements of 775 ILCS 5/2-102(L) directly.
                  </p>
                </div>
              )}

              {/* What You Get */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  What&apos;s Included ({reg.documentCount} Documents)
                </h2>
                <div className="space-y-3">
                  {reg.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white border border-gray-200 rounded p-4"
                    >
                      <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doc}</p>
                        {DOC_EXPLANATIONS[doc] && (
                          <p className="text-sm text-gray-500 mt-1">{DOC_EXPLANATIONS[doc]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ESIGN Act note */}
              <div className="flex items-start gap-3 bg-slate-50 border border-gray-200 rounded p-4 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                <p>All documents include electronic signature blocks compliant with the ESIGN Act (15 U.S.C. &sect;&nbsp;7001) and UETA.</p>
              </div>

              {/* Complete Your Compliance — law-specific add-ons */}
              {(() => {
                const addonSlugs = RELATED_ADDONS[reg.slug];
                if (!addonSlugs || addonSlugs.length === 0) return null;
                const addons = addonSlugs
                  .map((s) => getRegulation(s))
                  .filter(Boolean) as NonNullable<ReturnType<typeof getRegulation>>[];
                if (addons.length === 0) return null;
                return (
                  <section>
                    <h2 className="text-2xl font-bold font-display text-gray-900 mb-1">
                      Complete Your Compliance
                    </h2>
                    <p className="text-gray-500 text-sm mb-5">
                      Law-specific add-ons for this package
                    </p>
                    <div className="space-y-3">
                      {addons.map((addon) => (
                        <div
                          key={addon.slug}
                          className="bg-blue-50 border border-blue-100 rounded-lg p-5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900">
                                  {addon.shortName}
                                </p>
                                {addon.ready && addon.stripePriceId ? (
                                  <span className="inline-flex items-center text-xs px-2 py-0.5 rounded font-semibold bg-green-100 text-green-700 shrink-0">
                                    Available
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-xs px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600 shrink-0">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-snug line-clamp-2 mb-2">
                                {addon.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {addon.documentCount} documents
                              </p>
                            </div>
                            <div className="sm:text-right shrink-0">
                              <p className="text-xl font-extrabold text-gray-900 font-display">
                                ${addon.price}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-100">
                            {addon.ready && addon.stripePriceId ? (
                              <a
                                href={"/regulations/" + addon.slug}
                                className="text-xs text-blue-700 hover:text-blue-900 font-medium underline underline-offset-1"
                              >
                                View &amp; Purchase &mdash; ${addon.price}
                              </a>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Want to add this to your order?{" "}
                                <a
                                  href="mailto:info@aicompliancedocuments.com"
                                  className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-1"
                                >
                                  Contact us at info@aicompliancedocuments.com
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })()}

              {/* Citation */}
              <section>
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">
                  Statutory Authority
                </h2>
                <div className="bg-slate-50 border border-gray-200 rounded p-6">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Citation:</strong> {reg.citation}
                  </p>
                  <a
                    href={reg.citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium underline"
                  >
                    View official source
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar — purchase card (shows first on mobile so CTA isn't buried) */}
            <div className="md:col-span-1 order-first md:order-last">
              <div
                id="get-started"
                className="bg-white border-2 border-blue-800 rounded-xl p-5 sm:p-6 shadow-lg md:sticky md:top-24"
              >
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-1">
                  Complete Package
                </p>
                <p className="text-4xl font-extrabold text-gray-900 font-display mb-1">
                  ${reg.price}
                </p>
                <p className="text-gray-600 text-sm mb-6">
                  One-time purchase. Instant download.
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {reg.documentCount} customized documents
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Instant digital download
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Based on {reg.citation}
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Secure checkout via Stripe
                  </li>
                </ul>
                {reg.ready ? (
                  <a
                    href={`/regulations/${reg.slug}#generator`}
                    className="block text-center bg-blue-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition shadow-md"
                  >
                    Get My Documents &mdash; ${reg.price}
                  </a>
                ) : (
                  <div className="text-center">
                    <span className="block bg-slate-100 text-slate-500 py-4 rounded-lg font-semibold text-lg cursor-default mb-3">
                      Coming Soon
                    </span>
                    <p className="text-gray-500 text-xs">
                      This package is under development. Check back soon.
                    </p>
                  </div>
                )}
                <p className="text-center text-xs text-gray-500 mt-4">
                  vs. $5,000&ndash;$25,000 at a law firm
                </p>

                {/* Verified badge */}
                <div className="mt-5 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-green-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    <div>
                      <p className="text-xs font-semibold text-green-800">Verified against enacted statute text</p>
                      <a
                        href={reg.citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-700 hover:text-green-900 underline underline-offset-1 mt-0.5 block"
                      >
                        Source: {reg.citation}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Pre-purchase contact */}
                <p className="text-center text-xs text-gray-500 mt-4">
                  Questions before purchasing?{" "}
                  <a href="mailto:info@aicompliancedocuments.com" className="text-blue-700 hover:underline">
                    Email us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Guide Card — only shown when a plain-language guide exists for this law */}
        {blogGuide && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-2">
            <Link
              href={blogGuide.url}
              className="flex items-start gap-3 sm:gap-4 bg-slate-50 border border-slate-200 rounded-lg px-4 sm:px-6 py-4 sm:py-5 hover:border-slate-300 hover:bg-slate-100 transition group"
            >
              <div className="mt-0.5 shrink-0">
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-700 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Plain-Language Guide</p>
                <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition">
                  Read our plain-language guide to this law &rarr;
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{blogGuide.title}</p>
              </div>
            </Link>
          </div>
        )}

        {/* Questionnaire & Payment Flow */}
        {reg.ready && (
          <>
            <PostPaymentHandler regulationSlug={reg.slug} />
            <div className="border-t border-gray-200">
              <Questionnaire
                regulationSlug={reg.slug}
                regulationName={reg.shortName}
                price={reg.price}
              />
            </div>
          </>
        )}

        {/* Related Products */}
        {(() => {
          const related = regulations
            .filter(
              (r) =>
                r.slug !== reg.slug &&
                (r.category === reg.category ||
                  r.tier === reg.tier ||
                  (reg.tier === "state" && r.tier === "universal"))
            )
            .slice(0, 3);
          if (related.length === 0) return null;
          return (
            <div className="bg-white border-t border-gray-200 py-10 sm:py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-2">
                  You May Also Need
                </h2>
                <p className="text-gray-600 text-sm mb-5 sm:mb-6">
                  Strengthen your compliance program with related documentation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/regulations/${r.slug}`}
                      className="border border-gray-200 rounded-lg p-5 hover:border-blue-700 hover:shadow-md transition group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-sm ${r.status === "in-effect" ? "bg-red-500" : r.status === "effective-soon" ? "bg-amber-500" : "bg-slate-400"}`}
                        />
                        <span className="text-xs text-gray-500 uppercase font-medium">
                          {r.state}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 font-display group-hover:text-blue-700 transition mb-1">
                        {r.shortName}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed mb-3">
                        {r.description.length > 100
                          ? r.description.slice(0, 100) + "..."
                          : r.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 font-display">
                          ${r.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {r.documentCount} docs
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </main>
      <Footer />
    </>
  );
}
