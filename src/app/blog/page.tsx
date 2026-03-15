import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "AI Compliance Blog — News, Guides & Regulation Updates",
  description:
    "Plain-language guides to AI compliance laws. We break down what Illinois HB3773, Colorado SB24-205, and other state AI regulations mean for your business.",
  keywords: [
    "ai compliance blog",
    "ai regulation news",
    "illinois ai law",
    "colorado ai law",
    "hb3773 compliance",
    "sb24-205",
    "ai hiring law",
    "small business ai compliance",
  ],
  openGraph: {
    title: "AI Compliance Blog — AI Compliance Documents",
    description:
      "Plain-language guides to AI compliance. What the laws actually say, who they apply to, and what you need to do.",
    url: "https://aicompliancedocuments.com/blog",
  },
  alternates: {
    canonical: "https://aicompliancedocuments.com/blog",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const published = getAllBlogPosts();
  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <header className="hero-bg text-white py-10 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 border border-blue-400/40 px-3 py-1.5 mb-4 text-xs sm:text-sm rounded text-blue-200">
              <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-sm" aria-hidden="true" />
              Plain language. No jargon.
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white mb-3 leading-tight tracking-tight">
              AI Compliance Blog
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              State AI regulations are real, confusing, and genuinely important. We explain them
              like you&apos;re a smart adult who just hasn&apos;t had time to read 47 pages of
              legislative text. Because that&apos;s most people.
            </p>
          </div>
        </header>

        {/* Posts */}
        <section className="py-10 md:py-14 bg-slate-50" aria-label="Blog posts">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {published.length === 0 ? (
              <p className="text-gray-600">No posts yet. Check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {published.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-700 hover:shadow-md transition flex flex-col"
                  >
                    {/* Image */}
                    {post.image && (
                      <Link href={`/blog/${post.slug}`} className="block">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-44 sm:h-40 object-cover"
                        />
                      </Link>
                    )}

                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="font-bold text-base sm:text-lg font-display text-gray-900 mb-2 leading-snug flex-1">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-700 transition"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-t border-gray-100 pt-3">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>{post.readTime}</span>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block text-center bg-blue-800 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition"
                      >
                        Read Article
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA strip */}
        <section className="py-14 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">
              Ready to get compliant?
            </h2>
            <p className="text-slate-300 mb-6">
              Stop reading about it. Generate your compliance documentation today.
            </p>
            <Link
              href="/products"
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
