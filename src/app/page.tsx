import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductLibrary from "@/components/ProductLibrary";
import ProductCarousel from "@/components/ProductCarousel";
import { regulations } from "@/data/regulations";

export const metadata: Metadata = {
  title: { absolute: "AI Compliance Documents — Templates for Every State AI Law" },
  description:
    "AI compliance templates for 14+ state laws, the EU AI Act, and federal frameworks. Built from enacted statute text. Instant download.",
  keywords: [
    "ai compliance",
    "ai regulation",
    "ai compliance documents",
    "illinois hb3773",
    "colorado sb24-205",
    "texas traiga",
    "ai hiring compliance",
    "ai law",
    "ai compliance for small business",
  ],
  alternates: {
    canonical: "https://aicompliancedocuments.com",
  },
  openGraph: {
    title: "AI Compliance Documents — Templates for Every State AI Law",
    description:
      "State AI regulations are here. Generate compliance documentation for a fraction of legal fees.",
    url: "https://aicompliancedocuments.com",
    type: "website",
  },
};

function OrganizationStructuredData() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Compliance Documents",
    url: "https://aicompliancedocuments.com",
    logo: "https://aicompliancedocuments.com/logo.png",
    email: "info@aicompliancedocuments.com",
    description:
      "AI compliance documentation templates for US state and federal AI regulations.",
    sameAs: [
      "https://www.linkedin.com/company/ai-compliance-documents",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@aicompliancedocuments.com",
      contactType: "customer support",
    },
    areaServed: "US",
    knowsAbout: [
      "AI compliance",
      "Colorado SB 24-205",
      "Illinois HB3773",
      "EU AI Act",
      "NIST AI RMF",
      "algorithmic discrimination",
      "AI governance",
    ],
  });

  return <script type="application/ld+json">{data}</script>;
}

function WebSiteStructuredData() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Compliance Documents",
    url: "https://aicompliancedocuments.com",
    description:
      "AI compliance documentation templates for US state and federal AI regulations. Built from enacted statute text.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aicompliancedocuments.com/products?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  });

  return <script type="application/ld+json">{data}</script>;
}

function FAQStructuredData({ readyCount }: { readyCount: number }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I know if any of this applies to my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you use AI in hiring and you have employees or applicants in Illinois, NYC, or Colorado — yes. If you collect personal data from consumers in Virginia, Connecticut, Oregon, Texas, Delaware, California, or other states and use that data for targeted ads, profiling, or automated decisions — yes. If you sell or deploy AI systems used in consequential decisions — yes. If you're not sure, the AI System Registry ($199) helps you figure out what AI you're actually using before you worry about which laws apply.",
        },
      },
      {
        "@type": "Question",
        name: "What if I don't know whether my tools use AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most modern hiring platforms, CRM systems, marketing tools, and customer service chatbots have AI built in. If a tool screens, scores, ranks, recommends, or personalizes — there's likely AI involved. The vendor can confirm this. Our AI System Inventory document walks you through how to find out.",
        },
      },
      {
        "@type": "Question",
        name: "I have no idea where to start.",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That's the most common thing we hear. Start by figuring out which states your employees or customers are in. Then look at our state-specific packages for those states. If you operate in a lot of states, the Multi-State Profiling Bundle covers 15+ states in one package. If you just want to get organized first, the AI Governance Framework ($349) and AI System Registry ($199) help you figure out what you have before you worry about which laws apply.",
        },
      },
      {
        "@type": "Question",
        name: "What AI regulations do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `We offer ${readyCount} compliance packages covering 14 state-specific AI and privacy laws (Illinois, Colorado, NYC, California, Virginia, Connecticut, Oregon, Texas, Delaware, Minnesota, Montana, Indiana, Kentucky, New Jersey), the EU AI Act, EEOC AI hiring guidance, NIST AI RMF, healthcare AI (HIPAA), financial services AI, and universal tools like bias audit templates, incident response plans, and vendor due diligence. Each package is built from the actual enacted statute text.`,
        },
      },
      {
        "@type": "Question",
        name: "Is this legal advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We generate documentation templates based on the actual text of enacted statutes and published regulations. These templates help you get organized and demonstrate compliance effort — but they are not a substitute for a licensed attorney who can evaluate your specific situation. We recommend having your legal team review the output.",
        },
      },
      {
        "@type": "Question",
        name: "How are the documents generated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You answer a short questionnaire about your company — what AI tools you use, what decisions they inform, how your organization is structured. Your answers populate templates that were drafted against each state's specific statute. Documents generate instantly as fillable PDFs with electronic signature blocks. The whole process takes about ten minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What if the law changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Laws change. That's the nature of this space. Our templates reflect the enacted statute text at the time of purchase. If a law is amended or new implementing rules are published, your documents may need updating. We recommend checking back periodically and consulting qualified legal counsel to make sure your compliance posture stays current.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need this if I already have outside counsel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A lot of our customers have lawyers. They use our templates as a starting point — it gives their attorney something to review and refine instead of drafting from scratch at $400–$800 an hour. Your lawyer's time is better spent on the nuances specific to your business, not on formatting a compliance checklist.",
        },
      },
      {
        "@type": "Question",
        name: "Are all sales final?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Documents are generated and delivered digitally at the time of purchase, so all sales are final. Take a look at the product description and document list before purchasing to make sure it's the right fit.",
        },
      },
    ],
  });

  return <script type="application/ld+json">{data}</script>;
}

export default function Home() {
  const readyCount = regulations.filter((r) => r.ready).length;
  return (
    <>
      <OrganizationStructuredData />
      <WebSiteStructuredData />
      <FAQStructuredData readyCount={readyCount} />
      <Nav />
      <main id="main-content">
        {/* Hero Section with Product Carousel */}
        <header className="hero-bg text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src="/images/landing/homepage-hero.png"
              alt=""
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/80" />
          </div>
          <div className="relative z-10">
          <h1 className="sr-only">AI Compliance Documents — State AI Compliance Templates</h1>
          <ProductCarousel
            products={regulations
              .filter((r) => r.ready && r.tier === "state")
              .sort((a, b) => b.price - a.price)
              .slice(0, 8)
              .concat(
                regulations
                  .filter((r) => r.ready && (r.tier === "international" || r.tier === "industry"))
                  .sort((a, b) => b.price - a.price)
                  .slice(0, 4)
              )
            }
          />
          </div>
        </header>

        {/* Trust Bar */}
        <div className="bg-white border-b border-gray-200 py-5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-nowrap md:items-center md:justify-center md:gap-10 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Multi-State Coverage</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                <span>Instant Download</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="col-span-2 flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                <span>Built for the person who just found out this is their job</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                <span>$49&ndash;$997, one-time purchase</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-gray-200" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                <span>Powered by <strong style={{ color: "#635BFF" }}>Stripe</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works — comes BEFORE penalties so visitors understand the solution first */}
        <section id="how-it-works" className="py-10 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display text-gray-900 mb-3">
                How It Works
              </h2>
              <p className="text-gray-700 text-base md:text-lg">Three steps from zero to fully documented.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">1</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Choose Your Regulation</h3>
                <p className="text-gray-700 leading-relaxed">Select the state regulation you need to comply with. Answer a short questionnaire about your company and AI systems. Takes about 10 minutes.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">2</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Pay Once</h3>
                <p className="text-gray-700 leading-relaxed">One-time purchase, no subscription. Powered by <strong style={{ color: "#635BFF" }}>Stripe</strong>. Your answers generate customized documents &mdash; never stored or shared.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-800 rounded flex items-center justify-center mx-auto mb-5 text-white text-2xl font-extrabold font-display">3</div>
                <h3 className="font-bold text-xl font-display mb-3 text-gray-900">Download Your PDFs</h3>
                <p className="text-gray-700 leading-relaxed">Your complete compliance package downloads instantly. Post, distribute, and file. You&apos;re done.</p>
              </div>
            </div>
            <div className="text-center mt-8 md:mt-10">
              <a href="#products" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition shadow-md">
                Browse Products
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Methodology Section — between How It Works and penalties */}
        <section className="py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-3xl font-bold font-display text-gray-900 mb-2">
                How We Build Our Templates
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Every document starts with the actual enacted law — not summaries, not AI-generated overviews.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                </div>
                <p className="font-semibold text-gray-900 text-sm">Read the enacted statute</p>
                <p className="text-gray-600 text-sm leading-relaxed">Every template starts with the actual law text from .gov sources</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="font-semibold text-gray-900 text-sm">Verify every citation</p>
                <p className="text-gray-600 text-sm leading-relaxed">Section numbers, penalty amounts, effective dates — all checked against primary sources</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-9 h-9 bg-amber-50 border border-amber-100 rounded flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 9.526a2.25 2.25 0 002.18 1.849H15M3 3l-.393-2.102A.75.75 0 013.344 0h17.13a.75.75 0 01.742.875L19.5 12M3 3h12M15 21a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008z" /></svg>
                </div>
                <p className="font-semibold text-gray-900 text-sm">Flag what&apos;s pending</p>
                <p className="text-gray-600 text-sm leading-relaxed">If implementing rules haven&apos;t been published yet, we say so explicitly</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-9 h-9 bg-slate-100 border border-slate-200 rounded flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <p className="font-semibold text-gray-900 text-sm">Templates, not legal opinions</p>
                <p className="text-gray-600 text-sm leading-relaxed">We document what the law requires. Your attorney verifies it applies to you.</p>
              </div>
            </div>
            <div className="mt-8">
              <a href="/about" className="text-sm font-semibold text-blue-700 hover:underline">
                Read more about our methodology &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Methodology Trust Statement */}
        <section className="py-10 bg-slate-50 border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong className="text-gray-900">Every citation verified against the enacted statute text.</strong> We don&apos;t summarize laws or paraphrase regulations. We go to the official .gov source, read the enacted text, and build templates that reference the specific sections that apply to your business.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  <a href="/about" className="text-blue-700 underline">Learn about our methodology</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Section — after How It Works so penalties hit harder */}
        <section className="py-10 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-bold font-display text-gray-900 mb-3">
                What happens if you don&apos;t comply?
              </h2>
              <p className="text-gray-700 text-base md:text-lg max-w-2xl">
                AI regulations aren&apos;t suggestions. They&apos;re law, with real
                enforcement teeth and penalties up to $200,000 per violation (Texas TRAIGA, uncurable violations).
              </p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-100 rounded p-6 border-l-4 border-l-red-400">
                <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">Employee &amp; Consumer Complaints</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  In most states, employees and consumers can file complaints with the Attorney General or a state agency. If a complaint leads to an investigation, the first thing the state asks for is your documentation. Having it ready is your strongest first response.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded p-6 border-l-4 border-l-amber-400">
                <div className="w-10 h-10 bg-amber-100 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">State Enforcement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Attorney General offices enforce these laws. Penalties range from $5,000 per violation (Connecticut) to $70,000 per violation (Illinois). Several states assess penalties per violation and per person affected &mdash; so for automated systems that process many people, the numbers add up quickly.
                </p>
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded p-6 border-l-4 border-l-slate-400">
                <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>
                </div>
                <h3 className="font-bold text-lg font-display mb-2 text-gray-900">The Cost of Starting from Scratch</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hiring a law firm to build a compliance package from scratch typically runs $5,000 to $25,000. Our templates give you a professional, statute-based starting point for $49&ndash;$997 &mdash; and your attorney can review and finalize them in a fraction of the time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Image Strip */}
        <div className="py-8 md:py-10 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <img
              src="/images/landing/team-compliance-meeting.png"
              alt="Compliance team reviewing AI documentation"
              className="w-full h-48 sm:h-56 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Product Library */}
        <section id="products" className="py-10 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display mb-3 text-gray-900">
                Compliance Document Library
              </h2>
              <p className="text-gray-700 text-base md:text-lg">
                State-specific and universal AI compliance packages. Each includes customized documentation, instant download.
              </p>
            </div>
            <ProductLibrary regulations={regulations.filter(r => r.ready)} />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-10 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold font-display mb-3 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700 text-base md:text-lg">
                Everything you need to know before getting started.
              </p>
            </div>
            <hr className="border-t border-gray-200 my-4" />
            <div className="space-y-3">
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden" open>
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  How do I know if any of this applies to my business?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  If you use AI in hiring and you have employees or applicants in Illinois, NYC, or Colorado &mdash; yes. If you collect personal data from consumers in Virginia, Connecticut, Oregon, Texas, Delaware, California, or other states and you use that data for targeted ads, profiling, or automated decisions &mdash; yes. If you sell or deploy AI systems used in consequential decisions &mdash; yes. If you&apos;re not sure, the <a href="/products/ai-system-registry" className="text-blue-700 hover:underline">AI System Registry</a> ($199) helps you figure out what AI you&apos;re actually using before you worry about which laws apply.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  What if I don&apos;t know whether my tools use AI?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  You&apos;re not alone. Most modern hiring platforms, CRM systems, marketing tools, and customer service chatbots have AI built in. If a tool screens, scores, ranks, recommends, or personalizes &mdash; there&apos;s likely AI involved. Your vendor can confirm this. Our AI System Inventory document walks you through how to find out what you&apos;re actually running.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  I have no idea where to start.
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  That&apos;s the most common thing we hear. Start by figuring out which states your employees or customers are in. Then look at our state-specific packages for those states. If you operate in a lot of states, the <a href="/products/multi-state-profiling-assessment" className="text-blue-700 hover:underline">Multi-State Profiling Bundle</a> covers 15+ states in one package. If you just want to get organized first, the <a href="/products/ai-governance-framework" className="text-blue-700 hover:underline">AI Governance Framework</a> ($349) and <a href="/products/ai-system-registry" className="text-blue-700 hover:underline">AI System Registry</a> ($199) help you figure out what you have before you worry about which laws apply.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  What AI regulations do you cover?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  We offer {readyCount} compliance packages covering 14 state-specific AI and privacy laws (Illinois, Colorado, NYC, California, Virginia, Connecticut, Oregon, Texas, Delaware, Minnesota, Montana, Indiana, Kentucky, New Jersey), the EU AI Act, EEOC AI hiring guidance, NIST AI RMF, healthcare AI (HIPAA), financial services AI, and universal tools like bias audit templates, incident response plans, and vendor due diligence. Each package is built from the actual enacted statute text &mdash; not summaries, not training data, not paraphrases.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  Is this legal advice?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  No. We generate documentation templates based on the actual text of enacted statutes and published regulations. These templates help you get organized and demonstrate compliance effort &mdash; but they&apos;re not a substitute for a licensed attorney who can evaluate your specific situation. We recommend having your legal team review the output.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  How are the documents generated?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  You answer a short questionnaire about your company &mdash; what AI tools you use, what decisions they inform, how your organization is structured. Your answers populate templates that were drafted against each state&apos;s specific statute. Documents generate instantly as fillable PDFs with electronic signature blocks. The whole process takes about ten minutes.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  What if the law changes?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  Laws change. That&apos;s the nature of this space. Our templates reflect the enacted statute text at the time of purchase. If a law is amended or new implementing rules are published, your documents may need updating. We recommend checking back periodically and consulting qualified legal counsel to make sure your compliance posture stays current.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  Do I need this if I already have outside counsel?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  A lot of our customers have lawyers. They use our templates as a starting point &mdash; it gives their attorney something to review and refine instead of drafting from scratch at $400&ndash;$800 an hour. Your lawyer&apos;s time is better spent on the nuances specific to your business, not on formatting a compliance checklist.
                </div>
              </details>
              <details className="group bg-slate-50 rounded border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-4 md:p-6 cursor-pointer font-bold font-display text-gray-900 hover:text-blue-700 transition list-none text-sm md:text-base">
                  Are all sales final?
                  <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  Yes. Documents are generated and delivered digitally at the time of purchase, so all sales are final. Take a look at the product description and document list before purchasing to make sure it&apos;s the right fit.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-10 md:py-16 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-display text-white mb-4">
              Don&apos;t wait for a complaint
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
              AI regulations are in effect now. Get your compliance documents today for a fraction of what a law firm charges.
            </p>
            <a
              href="#products"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition"
            >
              Browse Products
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
            <p className="text-slate-400 text-sm mt-4">
              Not sure which package? <a href="mailto:info@aicompliancedocuments.com" className="text-blue-400 hover:text-blue-300 underline">info@aicompliancedocuments.com</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
