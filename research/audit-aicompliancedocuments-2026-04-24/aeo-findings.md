# AEO Audit — aicompliancedocuments.com
**Audited:** 2026-04-24  
**Framework:** Next.js 16 App Router + React 19 + MDX  
**Scope:** Homepage, /about, /faq, /blog (26 posts), /products (53 slugs), /ai-compliance-by-state, 4 state landing pages, /do-i-need-ai-compliance

---

## Dimension 1 — Answer-First Content Structure (30 pts)

**Score: 18 / 30**

### What is working

- **Blog posts** have a `summary` field (two-sentence, shown prominently in the hero header) that functions as a top-of-page direct answer. Source: `src/app/blog/[slug]/page.tsx` lines 190–195.
- **State landing pages** (Colorado, Illinois) open with a clear H1 + one-paragraph framing of who the law applies to, followed immediately by documents and micro-facts. The Colorado page opens: "If that AI makes decisions about hiring, lending, insurance… you need compliance documentation. That's the law." — readable as a standalone answer.
- **Product pages** lead with "Does This Apply to You?" as the first `<section>` (line 325 in `src/app/products/[slug]/page.tsx`), backed by bullet-point applicability criteria. This is the visitor's top question and it's answered first.
- **Homepage** leads with the product carousel (commercial), then "How We Build Our Templates" (methodology), then "How It Works" (steps). A direct answer to "what is this site?" is visible in the hero description but not in a 40-60 word standalone block.

### What is missing

- **No per-section 40-60 word direct-answer blocks in blog posts.** Blog H2 headings are declarative ("What Makes This Law Different," "What Developers Have to Do") rather than question-phrased. Google AI Mode chunk-level citation favors question-phrased H2s with an immediate answer sentence. Checked: `content/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know.mdx` lines 41–147; `content/blog/illinois-hb3773-ai-employment-law-what-employers-need.mdx` lines 47–125. All H2s are statement-form.
- **Homepage lacks a standalone definition block.** "What is AI Compliance?" with a 40-60 word answer is absent. Google AI Mode cannot extract a clean definition answer for navigational queries like "what is AI compliance documentation" from this page.
- **/ai-compliance-by-state hub page** has no question-phrased headings. The single H2 is "State AI Law Comparison" — not extractable for conversational queries like "which states have AI laws?" The intro paragraph is useful but not formatted as a direct answer.
- **About page** hero heading is declarative ("AI compliance templates built from the actual law") — strong positioning but not answering a user question.
- **/do-i-need-ai-compliance** quiz page has no pre-quiz direct-answer content. A user landing from a search for "do I need AI compliance" gets a quiz widget, not an immediate answer.

### Pattern observed

~35% of content pages (state landing pages, product pages) follow an answer-first structure. Blog posts (~26 pages, the largest page group) and the hub pages do not. This pulls the score down significantly given blog volume.

---

## Dimension 2 — FAQ + Question Optimization (25 pts)

**Score: 18 / 25**

### What is working

- **FAQ page** (`/faq`) has 13 questions with self-contained answers, conversational phrasing ("How do I know if any of this applies to my business?"), and specific data ($199, $349, $399, "10 minutes," "annually"). Source: `src/app/faq/page.tsx` lines 177–316. This is well-structured.
- **Homepage FAQ** (`src/app/page.tsx` lines 414–495) mirrors the /faq content with 9 questions in `<details>` elements. Both surfaces covered.
- **MicroFacts fields** in blog MDX frontmatter are a genuine AEO asset — each fact has `fact`, `source`, and `sourceUrl` fields. These are self-contained, citation-linked claims that answer specific sub-questions. See `content/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know.mdx` lines 16–28.
- No QAPage schema found anywhere in the codebase (correctly absent — deprecated January 2026).
- FAQ answers are 40-80 words each — within the extraction sweet spot.

### What is missing

- **Blog posts have no FAQ sections.** 26 posts each covering a specific law have no per-post FAQ. A post about Illinois HB3773 could have "What is the penalty for violating HB3773?" or "Do I need to post bias audit results publicly in Illinois?" — each answerable in 50 words. This is the single largest gap in Dimension 2.
- **State landing pages have no FAQ sections.** Colorado page has a self-assessment quiz (domain-use questions) but no "What does Colorado SB 24-205 require?" answer block.
- **Product pages have no FAQ sections.** Each product page covers a specific regulation and would naturally support questions like "What documents does this package include?" and "How long does it take to complete?" — neither is presented in question format.
- **"I have no idea where to start."** is listed as an FAQ question (faq/page.tsx line 198). This is not phrased as a question — it is a statement. AI engines matching question patterns will not extract it for "where to start with AI compliance" queries.

---

## Dimension 3 — Schema Markup for Answers (25 pts)

**Score: 17 / 25**

### Schema inventory

| Schema Type | Location | Status |
|---|---|---|
| Organization | `src/app/page.tsx` lines 35-66, `src/app/about/page.tsx` lines 29-58 | Present, correct |
| WebSite + SearchAction | `src/app/page.tsx` lines 68-87 | Present, correct |
| FAQPage | `src/app/page.tsx` lines 89-169, `src/app/faq/page.tsx` lines 30-143 | Present — aids AI comprehension; NOT eligible for rich results on commercial site |
| TechArticle | `src/app/blog/[slug]/page.tsx` lines 89-122 | Present, structurally correct |
| Product | `src/app/products/[slug]/page.tsx` lines 138-175, `src/app/colorado-ai-compliance/page.tsx` lines 33-55 | Present, no aggregateRating |
| ItemList | `src/app/products/page.tsx` (confirmed by grep) | Present |
| Dataset | `src/app/ai-compliance-by-state/page.tsx` lines 38-54 | Present — creative and appropriate |
| WebApplication | `src/app/do-i-need-ai-compliance/page.tsx` lines 30-52 | Present, appropriate |
| QAPage | Nowhere | Correctly absent |
| BreadcrumbList | Nowhere | **Missing** |
| HowTo | Nowhere | Missing — "How It Works" section on homepage and "What Happens After You Purchase" on product pages are HowTo-eligible |
| AggregateRating | Nowhere | Missing from Product schema |

### Key findings

- **BreadcrumbList is absent sitewide.** For a site with 3-4 levels of hierarchy (`/blog/[slug]`, `/products/[slug]`, `/colorado-ai-compliance`), BreadcrumbList helps Google AI Mode and traditional SERP breadcrumbs understand site structure. Zero instances found in grep across all 110 schema-containing files.
- **FAQPage schema is present on both homepage and /faq** — this is correct for AI comprehension purposes. Do not expect rich results for this commercial site (Google restricted FAQPage rich results to government/health in 2023). The schema is still useful for Gemini-based AI Mode extraction.
- **TechArticle schema on blog posts uses `dateModified: post.date`** (line 95). This sets dateModified equal to datePublished, which is structurally valid but means Google sees no update signal when content is revised. Consider adding a separate `lastModified` frontmatter field.
- **Product schema on state landing pages** (e.g., `/colorado-ai-compliance`) points `offers.url` to `/products/colorado-sb24-205` — a different page. This is a cross-page offer reference that may confuse structured data parsers expecting the offer URL to match the page URL.
- **No HowTo schema** on the homepage "How It Works" section (3 numbered steps, `src/app/page.tsx` lines 307-339) or on "What Happens After You Purchase" (5 steps, `src/app/products/[slug]/page.tsx` lines 453-479). Both are textbook HowTo schema candidates for step-level rich results.
- **No AggregateRating** on any Product schema. Without reviews/ratings markup, these products are invisible to rating-filtered AI responses.

---

## Dimension 4 — Extraction / Snippet Readiness (20 pts)

**Score: 13 / 20**

### What is working

- **State comparison table** on `/ai-compliance-by-state` (`src/app/ai-compliance-by-state/page.tsx` lines 117-177) is a real HTML table with columns: State, Law, Effective, Status, Max Penalty, Package price. Google can extract table snippets from this. This is a high-value AEO asset.
- **MicroFacts** across blog posts are ~25-40 word self-contained statistics with linked .gov sources — precisely the citation fodder AI Mode's fan-out pulls from.
- **Penalty data** is consistently positioned prominently: product pages show "Max penalty:" in the Key Stats Bar (line 311), homepage penalty section names specific dollar amounts ($5,000 to $70,000 per violation, line 374), Colorado landing page shows "$20,000 per violation" in metadata.
- **No answer-critical content locked in images or PDFs** — all key content is in rendered HTML.
- **ExternalReferences** in blog MDX render as a full bibliography in the sources strip — these are crawlable links to .gov primary sources, not just citations.

### What is missing

- **No definition blocks for key terms.** "What is a high-risk AI system?" "What is an impact assessment?" "What is algorithmic discrimination?" — these are the exact queries Google AI Mode answers with paragraph-level extracts. The content exists in blog posts (e.g., Colorado post lines 59-68 defines "high-risk AI system" in a well-structured paragraph) but is not marked up or formatted as a distinct extractable unit.
- **Blog H2 headings are declarative, not question-phrased.** Example: "What's a 'High-Risk' AI System?" (Colorado post line 59) is question-phrased — this is the one exception and it is the strongest heading in the sample. Most others ("Why the Effective Date Changed," "What Makes This Law Different") are narrative, not extractable as question-answer pairs.
- **No comparison tables on product pages.** "How does Colorado SB 24-205 compare to Illinois HB3773?" — answered nowhere in a tabular format on individual product pages, only on the hub.
- **State landing pages lack numbered requirement lists.** The Colorado page lists 8 documents with citations (`src/app/colorado-ai-compliance/page.tsx` lines 103-144) — these are already AEO-friendly but are not in `<ol>` format (they render as a flex grid). An ordered list would make them eligible for numbered-list snippets.

---

## Action Items

| # | Action | Owner | Priority | Dimension | Effort | Expected Impact | Verification |
|---|---|---|---|---|---|---|---|
| 1 | **Convert all blog H2 headings to question form.** Rewrite declarative headings ("What Makes This Law Different") to question form ("What makes Colorado's AI law different from other states?") across all 26 blog MDX files. Each heading should have a 40-60 word direct answer in the first sentence of its section. | Claude | P0 | 1, 4 | L | Directly improves AI Mode chunk-level citation eligibility across the blog's 26 posts — the largest content surface on the site. | Check 5 representative posts in Google AI Mode after indexing; verify headings render as questions in source HTML |
| 2 | **Add BreadcrumbList schema sitewide.** Add a `BreadcrumbList` JSON-LD component to `/blog/[slug]`, `/products/[slug]`, and state landing pages. Blog breadcrumb: Home > Blog > [Post Title]. Product breadcrumb: Home > Products > [Product Name]. State pages: Home > [State] AI Compliance. | Claude | P0 | 3 | S | Enables SERP breadcrumb display; signals hierarchy to Google AI Mode's page-level classification. | Google Rich Results Test on representative URLs |
| 3 | **Add FAQ sections to blog posts.** Add 4-6 question-answer pairs at the end of each blog post in MDX (using existing heading + paragraph pattern). Questions should be law-specific ("Does Colorado SB 24-205 apply to small businesses?" "What is the penalty for violating Illinois HB3773?"). Answers: 40-60 words, self-contained. | Claude | P0 | 2 | XL | Converts the 26-post blog into a Q&A extraction surface for the long tail of compliance questions — each post gains 4-6 new extractable answer units. | Verify blog post rendering; check if FAQPage schema on blog posts would be appropriate to add |
| 4 | **Add HowTo schema to "How It Works" (homepage) and "What Happens After You Purchase" (product pages).** Map the 3-step and 5-step sequences already in the HTML to `HowTo` JSON-LD with `HowToStep` objects including `name` and `text`. | Claude | P1 | 3 | S | Enables step-level rich result eligibility; positions process content for "how do I get AI compliance documents" queries. | Google Rich Results Test on homepage and one product page |
| 5 | **Add a 40-60 word "Quick Answer" definition block at the top of the homepage.** Place it between the hero and the FeaturedInBar. Target: "What is AI compliance documentation?" with a direct, scannable answer referencing the number of laws covered and the $49-$349 price range. | Human | P1 | 1 | XS | Gives Google AI Mode a clean extraction target for top-of-funnel definition queries (>60% zero-click). | Search "AI compliance documentation what is it" in Google AI Mode after indexing |
| 6 | **Fix "I have no idea where to start." FAQ entry to be question-phrased.** Change to "Where should I start with AI compliance?" in both `src/app/faq/page.tsx` line 198 and `src/app/page.tsx` line 434, and update the matching FAQPage schema entries in both files to match exactly. | Claude | P1 | 2, 3 | XS | Schema question text must match visible question text exactly; this mismatch undermines the FAQPage schema's credibility signal. | Visual check on FAQ page + schema validator |
| 7 | **Add FAQ sections to state landing pages** (Colorado, Illinois, Texas, California). 5-6 questions each, law-specific. Example for Colorado: "When does Colorado SB 24-205 take effect?" / "Who is a 'deployer' under Colorado's AI law?" / "What is the maximum penalty under SB 24-205?" Each answer: 40-60 words, .gov source linked inline. | Claude | P1 | 2 | M | State compliance queries are high commercial intent; FAQ extraction from state pages directly competes in the AI Mode citations where 14% URL overlap with organic is the baseline. | Google AI Mode queries for "Colorado AI law requirements" post-indexing |
| 8 | **Convert state landing page document lists to `<ol>` ordered lists.** Colorado page (`src/app/colorado-ai-compliance/page.tsx` lines 103-144) renders 8 documents in a flex grid. Rendering as a numbered `<ol>` makes them eligible for ordered-list snippet extraction ("What are the 8 documents required by Colorado SB 24-205?"). | Claude | P2 | 4 | XS | Enables numbered-list snippet format for "what documents does Colorado require" queries. | Inspect element to verify `<ol>` renders; Google Search Console rich results report |
| 9 | **Add `lastModified` frontmatter to blog MDX and wire it into TechArticle schema's `dateModified`.** Currently `dateModified` is set equal to `datePublished` (`src/app/blog/[slug]/page.tsx` line 95). Add a `lastModified` field to MDX frontmatter; update `blogPostingSchema` to use it when present. | Claude | P2 | 3 | S | Signals freshness to Google when posts are updated (e.g., Colorado deadline change); AI Mode preferences recently updated sources. | Check rendered JSON-LD for a manually updated post |
| 10 | **Add a pre-quiz direct-answer paragraph to `/do-i-need-ai-compliance`.** Before the quiz widget, add 60-80 words explaining who typically needs AI compliance (businesses with employees in IL/CO/NYC, businesses using AI in consequential decisions, businesses with 14+ state privacy law exposure). This converts zero-click traffic into an answer extraction surface. | Human | P2 | 1 | XS | Currently the page offers no extractable answer for "do I need AI compliance" — the quiz requires interaction Google cannot simulate. | Google AI Mode query "do I need AI compliance for my business" |
| 11 | **Add `aggregateRating` to Product schema once reviews are collected.** Product pages lack any rating signal in their `Product` JSON-LD. This prevents these pages from appearing in AI responses that filter by product quality signals. Even a small volume of verified reviews (3-5) unlocks this. | Human | P3 | 3 | — | Rating markup is a medium-term trust signal for AI Mode product citation. | Google Rich Results Test on product pages |
| 12 | **Add definition blocks for core terms to the /ai-compliance-by-state hub page.** Add 3-4 `<section>` blocks answering: "What is an AI compliance law?", "Which states have enacted AI laws?", "What is the difference between an AI developer and a deployer?" Each: 40-60 words, directly below the question-phrased H2. | Claude | P2 | 1, 4 | S | Hub page currently has only a table — definition answers for navigational queries are absent. AI Mode pulls from definition blocks for "what are state AI laws" queries. | Google AI Mode queries for "state AI compliance laws 2026" |

---

## AEO Score Summary

**Overall AEO Score: 66 / 100**

| Dimension | Score | Max |
|---|---|---|
| Answer-First Content Structure | 18 | 30 |
| FAQ + Question Optimization | 18 | 25 |
| Schema Markup for Answers | 17 | 25 |
| Extraction / Snippet Readiness | 13 | 20 |
| **Total** | **66** | **100** |

---

## Answer-Ready Page Percentage

Pages audited: ~90 (homepage, about, faq, 26 blog posts, 4 state landing pages, 53 product pages, hub, quiz, contact)

Pages meeting answer-first criteria (direct answer in first 150 words OR question-phrased H2 with immediate answer):
- Product pages (~53): YES — "Does This Apply to You?" leads every product page
- State landing pages (4): PARTIAL — lead with who it applies to, no FAQ sections
- FAQ page (1): YES
- Homepage (1): PARTIAL
- Blog posts (26): NO — no question-phrased H2s as the pattern; one post has one exception
- Hub, about, quiz, contact: NO

**Estimate: ~60% of pages are answer-ready** (product pages pull this up; blog volume pulls it down)

---

## AI Mode Readiness Subscore: 52 / 100

Google AI Mode (Gemini 3, launched April 2026) does paragraph/section-level fan-out from 30+ sources per query. It favors:

1. Question-phrased H2/H3 headings — **this site fails this at blog level**
2. 40-60 word direct answers immediately below the heading — **absent in blog posts**
3. Entities with strong .gov citation linkage — **this site excels here** (microFacts + externalReferences fields are exactly right)
4. Author/publisher schema with verifiable identity — **TechArticle schema present; no individual author bylines**
5. Freshness signals (dateModified distinct from datePublished) — **currently static**
6. BreadcrumbList for hierarchy classification — **absent**

The .gov source linkage is a genuine AI Mode signal strength — Gemini 3 preferentially cites sources that themselves cite primary law. The microFacts architecture is the site's most valuable AEO differentiator and should be preserved and expanded. The primary drag on AI Mode readiness is the blog heading architecture: 26 posts with declarative headings cannot be cited at the section level by AI Mode's fan-out.

---

## Top 3 Priorities

1. **Convert blog H2s to question form with immediate 40-60 word answers** (Action #1) — affects all 26 posts, which is the largest content surface. This is the single action with the most AI Mode citation leverage.
2. **Add BreadcrumbList schema sitewide** (Action #2) — low effort, sitewide signal, required for AI Mode hierarchy classification and traditional SERP breadcrumbs. Can be implemented as a single shared component.
3. **Add FAQ sections to blog posts** (Action #3) — transforms each post from a single long document into a Q&A surface with 4-6 extractable answer units per post, multiplying AI Mode citation opportunities across the blog.
