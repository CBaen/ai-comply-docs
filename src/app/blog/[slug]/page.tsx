import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getBlogPost, getRelatedPosts, getAllBlogPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/mdx-to-jsx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://aicompliancedocuments.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `https://aicompliancedocuments.com/blog/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const related = getRelatedPosts(slug, 2);
  const bodyNodes = renderMarkdown(post.content);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://aicompliancedocuments.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aicompliancedocuments.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <Nav />
      {/* BlogPosting JSON-LD — all data is server-side from our own MDX frontmatter, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <main id="main-content">
        {/* Hero image */}
        {post.image && (
          <div className="w-full h-48 md:h-72 relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
          </div>
        )}

        {/* Post header */}
        <header className={`hero-bg text-white ${post.image ? "py-8 md:py-12 -mt-16 relative z-10" : "py-12 md:py-16"}`}>
          <div className="max-w-3xl mx-auto px-4">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-6 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-xs font-semibold bg-blue-900/60 text-blue-200 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold font-display text-white leading-tight tracking-tight mb-5">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>{post.author}</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="w-1 h-1 bg-slate-500 rounded-full" />
              <span>{post.readTime}</span>
            </div>

            {/* Two Sentence Summary */}
            {post.summary && (
              <div className="mt-6 bg-blue-900/40 border border-blue-400/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Two-Sentence Summary</p>
                <p className="text-slate-200 text-sm leading-relaxed">{post.summary}</p>
              </div>
            )}
          </div>
        </header>

        {/* Post body */}
        <article className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-base leading-relaxed">
              {bodyNodes}
            </div>
          </div>

          {/* === Enrichment Sections — Art of War annotated style === */}
          {/* These break out of the article column to create visual contrast */}

          {/* Deep Dive — full-width band with centered content */}
          {post.deepDive && (
            <div className="mt-12 bg-[#1e1b4b] text-white">
              <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
                <div className="md:grid md:grid-cols-[200px_1fr] md:gap-10">
                  {/* Left label column */}
                  <div className="mb-4 md:mb-0 md:text-right md:pt-1">
                    <div className="inline-flex items-center gap-2 md:flex-row-reverse">
                      <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                      <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Deep Dive</span>
                    </div>
                  </div>
                  {/* Right content column */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-4 leading-snug">{post.deepDive.title}</h3>
                    <div className="text-indigo-100 text-[15px] leading-[1.8] whitespace-pre-line">{post.deepDive.content}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Micro Facts — alternating card grid */}
          {post.microFacts && post.microFacts.length > 0 && (
            <div className="bg-amber-50 border-y border-amber-200">
              <div className="max-w-4xl mx-auto px-6 py-10 md:py-14">
                <div className="flex items-center gap-2 mb-8">
                  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-[0.2em]">Did You Know?</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.microFacts.map((fact, i) => (
                    <a
                      key={i}
                      href={fact.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white border border-amber-200 rounded-lg p-5 hover:border-amber-400 hover:shadow-md transition group"
                    >
                      <p className="text-gray-800 text-sm leading-relaxed mb-3 group-hover:text-amber-900 transition">
                        {fact.fact}
                      </p>
                      <p className="text-amber-600 text-xs font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" /></svg>
                        {fact.source}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* External References — clean bibliography strip */}
          {post.externalReferences && post.externalReferences.length > 0 && (
            <div className="bg-slate-900 text-white">
              <div className="max-w-4xl mx-auto px-6 py-10 md:py-12">
                <div className="md:grid md:grid-cols-[200px_1fr] md:gap-10">
                  <div className="mb-4 md:mb-0 md:text-right md:pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sources</span>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {post.externalReferences.map((ref, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-500 text-xs font-mono mt-0.5 shrink-0">[{i + 1}]</span>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 text-sm underline underline-offset-2 decoration-slate-600 hover:decoration-blue-400 transition"
                          >
                            {ref.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legal disclaimer */}
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 leading-relaxed">
              <p>
                <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute legal advice, legal representation, or an attorney-client relationship. Laws and regulations change frequently. You should consult a licensed attorney to verify that the information in this article is current, complete, and applicable to your specific situation before relying on it. AI Compliance Documents is not a law firm and does not practice law.
              </p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-12 bg-slate-50 border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-xl font-bold font-display text-gray-900 mb-6">
                More from the blog
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <article
                    key={p.slug}
                    className="bg-white rounded border border-gray-200 p-5 hover:border-blue-700 hover:shadow-sm transition flex flex-col"
                  >
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold font-display text-gray-900 mb-2 leading-snug flex-1">
                      <Link href={`/blog/${p.slug}`} className="hover:text-blue-700 transition">
                        {p.title}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <time dateTime={p.date}>{formatDate(p.date)}</time>
                      <span>{p.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-blue-700 hover:text-blue-900 text-sm font-semibold transition"
                    >
                      Read →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold font-display text-white mb-3">
              Get your compliance documentation done
            </h2>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              Stop reading, start complying. Our packages generate the documents you need based on the actual statutes.
            </p>
            <Link
              href="/regulations"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-7 py-3.5 rounded-lg font-bold text-base hover:bg-blue-800 transition"
            >
              Browse Compliance Packages
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
