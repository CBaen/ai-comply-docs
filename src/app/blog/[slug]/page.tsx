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
      url: `https://aicomplydocs.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `https://aicomplydocs.com/blog/${post.slug}`,
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

  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Post header */}
        <header className="hero-bg text-white py-12 md:py-16">
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
          </div>
        </header>

        {/* Post body */}
        <article className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-base leading-relaxed">
              {bodyNodes}
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
              href="/#products"
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
