# SEO & Authority Strategy — AI Compliance Documents

**Researched:** March 13, 2026
**Site:** aicompliancedocuments.com
**Stack:** Next.js 16 App Router, MDX, Vercel
**Current state:** 6 blog posts, 24 product pages (regulations), Product JSON-LD implemented, sitemap.xml + robots.txt present

---

## What This Document Covers

1. Technical SEO gaps and fixes
2. LLM discoverability (ChatGPT, Perplexity, Claude)
3. Content strategy for authority without legal risk
4. Content velocity and keyword approach
5. Technical implementation specifics

---

## 1. Technical SEO — What's Missing

### Already Done (Don't Redo)
- `sitemap.ts` — present and generates product + homepage URLs
- `robots.ts` — correct
- `Product` JSON-LD on regulation pages
- Open Graph on all pages
- Twitter card meta
- `canonical` on blog posts
- `googleBot` crawl directives in layout metadata
- `font-display: swap` for fonts

### Gaps — Ordered by Impact

---

#### Gap 1: Blog Posts Are Missing From Sitemap
**File:** `src/app/sitemap.ts`

The sitemap only includes the homepage, `/blog`, and regulation pages. The 6 individual blog post URLs are not included. Search engines can find them via crawling, but missing from sitemap slows indexing and signals lower priority.

**Fix:** Import `getAllBlogPosts()` and add each post URL.

```ts
import { getAllBlogPosts } from "@/lib/blog";
import { regulations } from "@/data/regulations";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aicompliancedocuments.com";
  const posts = getAllBlogPosts();

  const blogPages = posts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const regulationPages = regulations.map((r) => ({
    url: `${base}/regulations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r.status === "in-effect" ? 0.9 : 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    ...blogPages,
    ...regulationPages,
  ];
}
```

---

#### Gap 2: No Article/BlogPosting JSON-LD on Blog Posts
**File:** `src/app/blog/[slug]/page.tsx`

Blog posts have Open Graph `article` type in metadata, but no `BlogPosting` JSON-LD structured data. Google uses JSON-LD to populate AI Overviews, featured snippets, and article carousels. This is the single highest-impact structured data gap.

**Fix:** Add a `BlogPostStructuredData` component in the blog post page:

```tsx
function BlogPostStructuredData({ post }: { post: BlogPost }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Compliance Documents",
      url: "https://aicompliancedocuments.com",
    },
    url: `https://aicompliancedocuments.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aicompliancedocuments.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: "AI Compliance",
  });
  return <script type="application/ld+json">{data}</script>;
}
```

Render it at the top of `BlogPostPage`, alongside Nav:
```tsx
<>
  <Nav />
  <BlogPostStructuredData post={post} />
  <main>...</main>
</>
```

---

#### Gap 3: No FAQPage JSON-LD on Homepage
**File:** `src/app/page.tsx`

The homepage has a `<details>`/`<summary>` FAQ section with 7 questions. This is exactly the pattern Google's FAQPage schema targets. FAQ rich results appear as expandable dropdowns directly in SERP, dramatically increasing click-through rate.

**Fix:** Add a `HomepageFAQStructuredData` component:

```tsx
function HomepageFAQStructuredData() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What AI regulations do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We currently offer compliance packages for Illinois HB3773 (775 ILCS 5/2-102(L)) and Colorado SB 24-205. Texas TRAIGA, California CCPA ADMT, and universal products (Employee AI Policy, Vendor Due Diligence) are coming soon.",
        },
      },
      {
        "@type": "Question",
        name: "Is this legal advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This tool generates documentation templates based on published regulatory text and proposed rules. It assists with compliance documentation but does not constitute legal advice. We recommend consulting a qualified attorney for formal compliance verification.",
        },
      },
      {
        "@type": "Question",
        name: "How much do lawyers charge for AI compliance documentation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Employment law attorneys typically charge $300–600 per hour. A custom AI compliance package can cost $5,000–$25,000 from a law firm. AI Compliance Documents generates comparable documentation for $299–$499.",
        },
      },
      {
        "@type": "Question",
        name: "How are the documents generated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your answers to the questionnaire populate templates drafted against each state's specific statute and proposed rules. Documents are generated instantly in PDF format and available for immediate download after payment.",
        },
      },
      {
        "@type": "Question",
        name: "What if the law changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Templates are based on the current published regulatory text at the time of purchase. Regulatory requirements may change over time. We recommend consulting qualified legal counsel to verify your documents remain current.",
        },
      },
    ],
  });
  return <script type="application/ld+json">{data}</script>;
}
```

**Note on FAQ eligibility:** Google's documentation says FAQPage rich results are limited to "well-known, authoritative" sites for certain topics. A newer site may not get the rich result immediately, but the structured data still helps Google understand the Q&A content for AI Overviews and featured snippets. Implement it now and the benefit compounds as the site builds authority.

---

#### Gap 4: No BreadcrumbList JSON-LD
Breadcrumbs appear in Google SERP URLs (instead of the full URL slug), which increases click-through rate. They also help Google understand site hierarchy.

**Fix:** Add to regulation and blog post pages.

For regulation pages (`src/app/regulations/[slug]/page.tsx`):
```tsx
function BreadcrumbStructuredData({ reg }: { reg: Regulation }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aicompliancedocuments.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://aicompliancedocuments.com/#products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: reg.shortName,
      },
    ],
  });
  return <script type="application/ld+json">{data}</script>;
}
```

For blog posts (`src/app/blog/[slug]/page.tsx`):
```tsx
function BlogBreadcrumbStructuredData({ post }: { post: BlogPost }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aicompliancedocuments.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://aicompliancedocuments.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  });
  return <script type="application/ld+json">{data}</script>;
}
```

---

#### Gap 5: Product JSON-LD Missing `seller` and `brand`
**File:** `src/app/regulations/[slug]/page.tsx`

The existing `Product` JSON-LD is minimal. Google's product rich results benefit from additional fields, especially for trust signals.

**Fix:** Expand the existing `StructuredData` component:

```tsx
function StructuredData({ reg }: { reg: Regulation }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: reg.name,
    description: reg.description,
    brand: {
      "@type": "Brand",
      name: "AI Compliance Documents",
    },
    offers: {
      "@type": "Offer",
      price: reg.price.toString(),
      priceCurrency: "USD",
      availability: reg.ready
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "AI Compliance Documents",
        url: "https://aicompliancedocuments.com",
      },
      url: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
    },
    category: "Legal Document Template",
  });
  return <script type="application/ld+json">{data}</script>;
}
```

---

#### Gap 6: No Organization JSON-LD on Homepage
Google uses Organization schema to build knowledge about the company, which feeds into branded search results and AI answer attribution.

**Fix:** Add to `src/app/page.tsx` or `src/app/layout.tsx`:

```tsx
function OrganizationStructuredData() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Compliance Documents",
    url: "https://aicompliancedocuments.com",
    description: "AI compliance document templates for state and federal AI regulations. Self-service, instant download.",
    foundingDate: "2025",
    areaServed: "US",
    knowsAbout: [
      "AI compliance",
      "Illinois HB3773",
      "Colorado SB24-205",
      "TRAIGA",
      "AI regulation",
      "algorithmic discrimination",
    ],
    sameAs: [],
  });
  return <script type="application/ld+json">{data}</script>;
}
```

Put `sameAs` in there once social profiles exist (LinkedIn, Twitter/X). Google uses `sameAs` to consolidate entity knowledge.

---

#### Gap 7: No RSS Feed
RSS is cited by Perplexity, some AI research crawlers, and news aggregators as a content discovery mechanism. It also enables third-party republishers to reference and link to content.

**Fix:** Create `src/app/rss.xml/route.ts`:

```ts
import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  const base = "https://aicompliancedocuments.com";
  const posts = getAllBlogPosts().filter((p) => p.published);

  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>team@aicompliancedocuments.com (AI Compliance Documents)</author>
      ${p.tags.map((t) => `<category>${t}</category>`).join("")}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Compliance Documents — Blog</title>
    <link>${base}/blog</link>
    <description>AI compliance regulatory updates, guides, and analysis for state and federal AI laws.</description>
    <language>en-us</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
```

Add RSS link to the head via layout metadata:
```ts
// In layout.tsx metadata object:
alternates: {
  types: {
    "application/rss+xml": "https://aicompliancedocuments.com/rss.xml",
  },
},
```

---

#### Gap 8: No `og:image` Exists
The layout references `/og-image.png` but there is no such file in `/public`. Every social share and some AI crawlers use this image. If it 404s, shares look broken and trust signals erode.

**Fix (Option A):** Create a static OG image at `public/og-image.png` (1200x630px, dark navy background, white "AI Compliance Documents" wordmark + tagline).

**Fix (Option B — better long term):** Use Next.js `ImageResponse` for dynamic per-page OG images at `src/app/blog/[slug]/opengraph-image.tsx` and `src/app/regulations/[slug]/opengraph-image.tsx`. These generate a unique image per page with the title baked in. Google and social platforms favor these because they look less like generic placeholders.

---

#### Gap 9: Streaming Metadata and Bot Crawlers
Next.js 16 streams metadata by default for dynamic pages. Most crawlers (Googlebot, Bingbot, Twitterbot) are in the `htmlLimitedBots` list and receive blocking metadata — this is correct behavior and already handled by Next.js. No action needed, but worth knowing: if you ever add a custom crawler to `disallow` in robots.ts, verify it doesn't block legitimate AI crawlers.

---

### Meta Tag Improvements

**Blog post description length:** Keep meta descriptions between 120–155 characters. Anything over 160 gets truncated. Current descriptions appear within range but verify each post.

**Title format:** Current template `%s | AI Compliance Documents` is correct. Ensure the `%s` portion is under 50 characters so the full title fits within ~65 character SERP limit.

**Canonical URLs:** Blog posts have `alternates.canonical` set. Verify regulation pages also set this explicitly (they don't currently). Add to `generateMetadata` in `regulations/[slug]/page.tsx`:
```ts
alternates: {
  canonical: `https://aicompliancedocuments.com/regulations/${reg.slug}`,
},
```

---

## 2. LLM Discoverability

### How AI Systems Find and Cite Sources

**ChatGPT (browsing/web search):** Uses Bing's index primarily. Bing crawls standard sitemaps. The key signal is whether the content directly answers a question with factual, specific information. Pages that define terms, cite statute numbers, and state facts in plain language are preferred for citation. Schema.org data is parsed but the content itself is the primary signal.

**Perplexity:** Uses its own crawler (PerplexityBot) plus multiple search index APIs. It heavily weights:
1. Pages that appear in top Google/Bing results for the query
2. Pages with direct, quotable factual answers early in the content
3. Sites that appear across multiple queries in the same topic cluster
4. Content that cites primary sources (official statute URLs, government pages)

**Claude:** Training data includes indexed web content. Real-time citations (in Claude with web search) follow patterns similar to Perplexity — prefers pages that state facts clearly, cite official sources, and appear credible by structural signals (not just keywords).

**Common pattern across all three:** They prefer content that reads like it was written by someone who has read the actual law, not content that rephrases other secondary sources. The site already does this well (statute citations, direct links to official sources). Keep doing it.

---

### llms.txt — What It Is and Whether to Implement It

**What it is:** A file at `https://yourdomain.com/llms.txt` (Markdown format) that provides a structured summary of the site for LLMs to consume. Think of it as a site-level table of contents designed for AI context windows.

**Specification:**
```
# AI Compliance Documents

> Self-service AI compliance document templates for state and federal regulations.
> Covers Illinois HB3773, Colorado SB24-205, Texas TRAIGA, and more.
> Not legal advice. Templates based on published statutory text.

We provide downloadable PDF document packages that help businesses comply with
state AI laws. Each package is generated from your questionnaire answers and
based on the actual statute text.

## Products

- [Illinois HB3773 Compliance Package](https://aicompliancedocuments.com/regulations/illinois-hb3773): AI hiring law compliance documents for Illinois employers
- [Colorado SB24-205 Compliance Package](https://aicompliancedocuments.com/regulations/colorado-sb24-205): High-risk AI system compliance for Colorado
- [NYC Local Law 144](https://aicompliancedocuments.com/regulations/nyc-local-law-144): Automated employment decision tool compliance

## Blog — Regulatory Guides

- [Colorado SB24-205 Guide](https://aicompliancedocuments.com/blog/colorado-sb24-205-guide): What the law requires, key deadlines, who must comply
- [Illinois HB3773 Guide](https://aicompliancedocuments.com/blog/what-is-illinois-hb3773): Plain-language breakdown of the law
- [Does Colorado AI Law Apply to Me?](https://aicompliancedocuments.com/blog/does-colorado-ai-law-apply-to-me): Decision tree for determining applicability

## Optional

- [Full sitemap](https://aicompliancedocuments.com/sitemap.xml)
- [RSS feed](https://aicompliancedocuments.com/rss.xml)
```

**Should you implement it?** Yes, with low urgency. It costs almost nothing (a static text file in `/public`) and the ecosystem for consuming it is growing. Implement it after the higher-priority gaps (sitemap, JSON-LD, RSS) are done.

**File location:** `public/llms.txt` — Next.js will serve it at the root automatically.

---

### Content Patterns That AI Systems Cite

These are the patterns in the existing blog posts that are working — continue and amplify them:

1. **Statute citation at first mention** — "Colorado SB24-205 (C.R.S. § 6-1-112)" — AI systems extract and cite these as authoritative markers.

2. **Direct answers to binary questions** — "Does Colorado AI law apply to me if I'm headquartered out of state? Yes, if you have Colorado residents as customers or employees." AI citations love this format.

3. **Specific numbers with sources** — "$20,000 per violation (C.R.S. § 6-1-112(1)(a))" — vague statements are never cited. Specific numbers with statute references are.

4. **Definitions in the post itself** — "Under SB24-205, a 'deployer' is defined as any company that uses an AI system..." — AI systems mine definitions.

5. **Official source links** — The current blog posts link to official government pages. This is a trust signal for both AI systems and Google's quality evaluators.

**New pattern to add:** Use `<table>` elements for comparison data (which states have enacted laws, penalty amounts, effective dates). Tables are heavily cited by Perplexity because they are structured, scannable, and unambiguous. A "State AI Law Comparison" table — even a simple one — would be extremely citable.

---

### Schema.org Patterns for AI Fact Extraction

Beyond the gaps covered in Section 1, these schemas are specifically useful for AI system fact extraction:

**Legislation schema** — For regulation pages, consider adding alongside the Product schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Legislation",
  "name": "Colorado Artificial Intelligence Act",
  "legislationIdentifier": "SB24-205",
  "legislationType": "State Law",
  "legislationDate": "2024-05-17",
  "legislationLegalForce": "https://schema.org/InForce",
  "legislationJurisdiction": "Colorado, United States",
  "url": "https://leg.colorado.gov/bills/sb24-205"
}
```

This tells AI crawlers "this page is specifically about this piece of legislation" — which is the primary extraction signal.

---

## 3. Content Strategy Without Legal Risk

### The Core Distinction

The line between safe and unsafe content is **factual statements vs. prescriptive advice**.

| Safe (factual) | Unsafe (advice) |
|---|---|
| "Colorado SB24-205 takes effect June 30, 2026" | "You must comply by June 30, 2026" |
| "The law defines 'deployer' as any entity that deploys a high-risk AI system" | "Your company is a deployer" |
| "C.R.S. § 6-1-112 authorizes civil penalties up to $20,000 per violation" | "You could face $20,000 per violation" |
| "The affirmative defense requires documented good-faith compliance" | "Getting our documents protects you from liability" |
| "The law covers employment, credit, housing, insurance, healthcare, and education decisions" | "If you use AI for hiring, you must comply" |

**The existing blog posts handle this well.** The pattern to watch: phrases like "you need to" or "your company must" cross into advice territory. Replace with "the law requires deployers to" or "the statute specifies that."

---

### How JD Supra and National Law Review Do It

Both platforms publish content from law firms under attorney bylines. They are not creating "legal advice" — they're publishing firm-authored "client alerts" and "regulatory updates" as informational content.

**The structural pattern:**
1. **Bylined to a professional** (firm or "AI Compliance Documents Team" — currently used)
2. **Disclaimer** (already present in blog footer)
3. **Links to primary sources** (already done)
4. **Factual summary → implication explained → action described**

The implication-and-action parts can be stated as "companies subject to the law will want to..." or "the documentation the law contemplates includes..." — this is the gray zone the existing posts navigate correctly.

**The existing post on Colorado SB24-205 is a good template.** It describes what the law requires (factual), explains why documentation matters (contextual), and then links to the product (commercial). That's the correct pattern.

---

### News Roundup Posts — Safe Format

This is the highest-leverage content type for building topical authority without legal risk. The format:

**Post title example:** "AI Compliance Regulatory Update — March 2026"

**Structure:**
1. **Brief intro** — one sentence on why this update matters
2. **Item 1: [News headline]** — cite the source with a link, add 1-3 sentences of factual context ("The Texas AG's office announced X. Under TRAIGA, which takes effect [date], this means Y.")
3. **Item 2-5:** Same pattern
4. **Closing paragraph** — ties to the regulatory landscape broadly, links to relevant product pages

**Safe commentary pattern:**
- Link to the news article/government announcement with `rel="noopener noreferrer"`
- Quote the factual finding directly (in quotes, attributed)
- Add context that explains *what the news means in the regulatory framework* — not what the reader *should do*
- Use: "This is significant because the statute requires..." not "This means you need to..."

**Example safe commentary for a news item:**
> The Colorado Attorney General's office published updated guidance on SB24-205 impact assessment requirements on March 10, 2026. ([Source: Colorado AG](link)). The guidance clarifies that impact assessments must be completed before a high-risk AI system is first deployed — not at the next annual review cycle. Under C.R.S. § 6-1-1703, deployers are required to complete assessments prior to deployment.

That is 100% factual. It cites a source. It quotes the statute. It states the implication of the news. It does not tell the reader what to do.

---

### Opinionated in Tone, Factual in Substance

The brand voice (professional but accessible, humor about regulatory absurdity) is a legitimate authority signal — not a liability. Here's how to make it work:

**Opinion in framing, facts in the body:**
- Headline: "Colorado's AI Law Is Actually Not That Scary (Here's Why)" → opinion is in the headline. The body is facts.
- Opening: "Everyone in compliance Twitter is losing their mind about SB24-205, which is understandable — it's a genuinely complex law. Here's what it actually says." → editorial voice, followed by factual content.
- Aside/pull quote: "Translation from legalese: if your AI helps decide whether someone gets a job, a loan, or housing in Colorado, you're covered." → interpretation is clearly labeled as translation/plain language, not legal opinion.

**Humor targets the regulatory absurdity, not the law itself:**
- Safe: "Congress hasn't passed comprehensive federal AI law yet, which means we now have 47 different state-level interpretations of what 'high-risk AI' means. Standardization is the punchline here."
- Unsafe: Making fun of any specific company's enforcement situation, or implying regulators are wrong about interpretation.

---

## 4. Content Velocity Strategy

### How Many Posts Per Week

For a new domain in a B2B niche (AI compliance), the research-backed recommendation is:

- **Months 1-3:** 2-3 posts per week. This establishes the topical cluster signal Google needs to understand the site's subject matter. A new domain needs a minimum of ~30-40 pieces of substantial content before it starts competing meaningfully in organic search.
- **Months 4-6:** 1-2 posts per week. Maintain cadence but shift toward longer-form, more comprehensive pieces.
- **Month 7+:** Quality over quantity. One excellent post per week that earns backlinks is worth more than five average posts.

**The current pace (6 posts, launched recently) needs to accelerate.** The site has strong technical SEO and good content quality — the gap is volume and topical coverage depth.

---

### Topic Structure — The Topical Cluster Model

Instead of individual unrelated posts, build topic clusters. Each cluster has a **pillar page** (comprehensive) and **spoke pages** (specific questions). Internal links from spokes to pillar, and pillar to relevant product pages.

**Cluster 1: Colorado SB24-205** (already starting)
- Pillar: "The Complete Guide to Colorado SB24-205 Compliance" (long-form, 3,000+ words)
- Spoke: "Does Colorado AI Law Apply to Me?" (exists)
- Spoke: "Colorado AI Law Penalties: What Non-Compliance Actually Costs" (exists)
- Spoke: "How to Write an AI Impact Assessment for Colorado SB24-205" (exists)
- Spoke: "Colorado SB24-205 vs. Illinois HB3773: What's Different" (missing — high value)
- Spoke: "SB24-205 Affirmative Defense: How Documentation Protects You" (missing)
- Spoke: "Colorado SB24-205 FAQ: 20 Questions Answered" (missing — FAQ format targets featured snippets)

**Cluster 2: Illinois HB3773**
- Spoke: "Does Illinois HB3773 Apply to Remote Workers?" (missing)
- Spoke: "Illinois HB3773 vs. NYC Local Law 144: Key Differences" (missing)
- Spoke: "HB3773 Annual Notice Requirement: What to Send and When" (missing)

**Cluster 3: AI Compliance for Small Business**
- Post exists (ai-compliance-small-business.mdx) — expand with more specific content
- Spoke: "What Size Company Has to Comply with AI Hiring Laws?" (missing)
- Spoke: "AI Compliance on a Budget: What You Legally Need vs. What's Nice to Have" (missing)

**Cluster 4: State-by-State Overview**
- Pillar: "State AI Laws: The Complete 2026 Tracker" — regularly updated table of all state laws, status, effective dates, penalty ranges. This type of page earns enormous links because it becomes the reference source journalists cite.
- This type of page earns enormous links because it becomes the reference source journalists cite.

**Cluster 5: How-To Guides** (HowTo schema eligible)
- "How to Conduct an AI Bias Audit"
- "How to Write an AI Risk Management Policy"
- "How to Create a Consumer Notice for an AI Hiring System"

---

### Keywords With Search Volume in This Niche

This is a low-volume, high-intent niche. "AI compliance" as a term has moderate volume but high competition from generalist consulting firms. The opportunity is in long-tail, highly specific terms:

**High-intent, low competition (target first):**
- "colorado ai law compliance checklist"
- "illinois hb3773 requirements"
- "does [state] ai law apply to my company"
- "ai impact assessment template"
- "ai risk management policy template"
- "colorado sb24-205 effective date"
- "traiga texas requirements"
- "ai hiring law compliance documents"
- "automated employment decision tool compliance"
- "ai bias audit requirement"

**Medium-competition informational (build topical authority):**
- "what is colorado sb24-205"
- "illinois ai hiring law"
- "state ai regulation tracker"
- "ai compliance checklist 2026"
- "ai compliance documentation requirements"

**Keyword research approach for this niche:**
1. Use Google Search Console (once the site has enough data) to see what queries are already bringing traffic — those are your most valuable keywords
2. Google Autocomplete for "[law name] +" fills in the most common questions
3. "People Also Ask" boxes on SERPs for your target queries — these are the questions Google thinks need answering, which means content targeting them earns featured snippets
4. Reddit r/legaladvice, r/compliance, and r/humanresources — search for AI law mentions to find the questions real people ask in plain language

---

### Targeting Both Informational and Transactional Intent

Every blog post should have a path to the product. The site already does this with the "Get your compliance documentation done" CTA at the bottom of blog posts. Strengthen the connection:

**Informational post → transactional bridge formula:**
- Body: "To satisfy this requirement, deployers need [specific document type]"
- Link: "Our [Regulation] package includes [that specific document type]"
- This is not an ad — it's completing the informational answer

The existing Colorado SB24-205 post does this correctly at the end. Apply the same pattern mid-post (once) for longer articles — not every paragraph.

---

## 5. Technical Implementation Details

### URL Structure

Current structure (`/regulations/[slug]` and `/blog/[slug]`) is correct. Do not change it.

**One addition to consider:** A `/state/[state]` or `/laws/[state]` hub page per state, listing all products and blog posts relevant to that state. This creates a topical hub that helps Google understand geographic relevance and provides a natural internal link node.

Example: `/states/colorado` would list the Colorado SB24-205 product, all Colorado blog posts, and a brief overview of Colorado's AI regulatory landscape. These pages are low effort but have good SEO value for state-specific queries.

---

### Core Web Vitals — Current Risk Assessment

Next.js 16 with App Router and static generation (via `generateStaticParams`) is well-optimized by default. Specific risks for this site:

1. **Dark mode script** — The inline script in `layout.tsx` runs `beforeInteractive`. This is correct (prevents flash of wrong theme) and will not negatively impact CWV if kept small, which it currently is.

2. **No images on product/blog pages** — The lack of images actually helps LCP (Largest Contentful Paint) because there's no large image to load. The hero text becomes the LCP element, which is fast with static generation.

3. **When OG images are added** — If per-page OG images are generated via `ImageResponse`, these are not loaded on the page itself (they're only in `<meta>` tags), so they don't affect CWV.

4. **PDF generation** — If PDF generation happens client-side, that's off the main thread and doesn't affect CWV. Verify that the PDF generation libraries are not loaded eagerly on every page load — they should be lazy-loaded or server-side only.

---

### Should There Be a News/Updates Section Separate from the Blog?

The site already has a `/news/` directory in the app folder but it appears empty. The question is whether to keep blog + news as one stream or separate them.

**Recommendation: Keep one unified blog, use tags to distinguish content types.**

Reasons:
- Two URL structures (`/blog/` and `/news/`) split your internal link equity
- Google treats them as separate "sections" — you're building authority in two places instead of one
- Readers don't distinguish "blog" from "news" for compliance content

If you want to signal that some content is more news-like, use a `type: "regulatory-update"` frontmatter field and filter by it on the blog index page. The URLs stay under `/blog/`.

**Exception:** If you end up publishing daily regulatory updates (3+ per week) at high volume, a separate `/updates/` section starts to make sense — it signals to Google that this is a news publisher, which can unlock Google News inclusion. But at the current scale, don't split.

---

### Image Optimization

**For blog posts:** Add a `coverImage` field to the MDX frontmatter and render it using Next.js `<Image>` component. This adds visual richness (better social sharing, better time-on-page) and gives you an image to include in `BlogPosting` JSON-LD.

```mdx
---
title: "Colorado SB24-205 Is Coming in June 2026"
coverImage: "/blog/colorado-sb24-205-hero.jpg"
---
```

Then in the JSON-LD:
```json
{
  "@type": "BlogPosting",
  "image": "https://aicompliancedocuments.com/blog/colorado-sb24-205-hero.jpg"
}
```

Google's Article structured data documentation specifically recommends including `image` with 16:9, 4:3, and 1:1 aspect ratios when possible, but a single 16:9 image is sufficient.

---

### Internal Linking Strategy

**Current state:** Blog posts link to related blog posts and regulation pages. This is good.

**What's missing:**
1. **Regulation pages don't link to blog posts.** A product page for Colorado SB24-205 should link to the blog posts about that regulation under a "Learn More" or "Regulatory Background" section. This keeps users on the site longer and passes link equity bidirectionally.

2. **Blog index page should highlight posts by regulation.** Filtering by state/regulation on `/blog` helps users find related content and helps Google understand the topical clusters.

3. **Homepage "From the blog" section.** Add 3 featured blog posts to the homepage. This is a standard pattern that creates high-authority internal links from the most-linked-to page on the site to the blog content.

**Anchor text rule:** Use descriptive anchors that include the target keyword. "Read our Colorado SB24-205 guide" > "click here" > "learn more."

---

### Specific Implementation Priority Order

Order these from highest to lowest SEO impact per effort:

1. **Fix sitemap** to include blog post URLs (15 minutes, highest crawlability impact)
2. **Add BlogPosting JSON-LD** to blog posts (1 hour, largest structured data gap)
3. **Add FAQPage JSON-LD** to homepage (30 minutes)
4. **Add BreadcrumbList JSON-LD** to blog and regulation pages (1 hour)
5. **Create RSS feed** at `/rss.xml` (1 hour)
6. **Create `public/llms.txt`** (30 minutes)
7. **Add OG image** (static PNG first, dynamic `ImageResponse` later)
8. **Add `alternates.canonical`** to regulation pages (15 minutes)
9. **Expand Product JSON-LD** with seller and brand (15 minutes)
10. **Add Organization JSON-LD** to homepage (30 minutes)
11. **Add internal links** from regulation pages to related blog posts (ongoing)
12. **Add homepage "From the Blog" section** (2-3 hours, front-end work)

---

## Summary Table

| Area | Status | Priority |
|---|---|---|
| Sitemap (blog posts) | Missing | Critical |
| BlogPosting JSON-LD | Missing | High |
| FAQPage JSON-LD | Missing | High |
| BreadcrumbList JSON-LD | Missing | High |
| RSS feed | Missing | High |
| llms.txt | Missing | Medium |
| OG image file | Missing (404) | High |
| Canonical on regulation pages | Missing | Medium |
| Product JSON-LD (expanded) | Partial | Low |
| Organization JSON-LD | Missing | Medium |
| Internal regulation→blog links | Missing | Medium |
| Homepage blog section | Missing | Medium |
| Content velocity (2-3x/week) | Below target | Critical |
| Topical cluster completion | Partial | High |
| State AI law tracker page | Missing | High |
