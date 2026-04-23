# Search Visibility Audit — aicompliancedocuments.com
## Date: 2026-04-24
## Target: codebase at `C:/Users/baenb/projects/project _cameron/aicomplydocs/` (live site spot-checks)
## Invoked by: direct (continuation of Sextant's 2026-04-23 session)

---

## Before You Read This

Your sourcing discipline — every law linked, every penalty number cited — is the thing that sets this site apart. Both the AEO and GEO analysts independently flagged the `microFacts` + `externalReferences` architecture as the site's primary competitive differentiator for AI citation. **That is load-bearing. Protect it.**

The scores came back 71 / 66 / 54 — a **weighted total of 63 (D+)**. The site is fundamentally sound. Most of the gap is mechanical things Claude can fix without you making decisions. The single highest-leverage change: your 26 blog posts use newspaper-style H2 headings ("What Makes This Law Different"). AI assistants prefer question-phrased headings for paragraph-level citation. Rewriting these is a task, not a decision.

**Two things need your input before Claude can proceed:**

1. **LinkedIn URL in the live schema.** Your Organization schema at `src/app/page.tsx:46` and `src/app/about/page.tsx:40` currently includes `sameAs: ["https://www.linkedin.com/company/ai-compliance-documents"]`. You have a moral boundary against LinkedIn — but the code signals you're there. Do you want me to remove it or leave it?
2. **Product count alignment.** `regulations.ts` has 57 product objects. The about page says "54." llms.txt says "53." Pick a canonical number and I'll align all surfaces.

The Sextant session repaired real integrity issues. This audit found more craft-level issues than integrity ones. That's the shape of what a healthy site looks like as it matures.

---

## Scores

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| SEO       | 71    | 30%    | 21.3     |
| AEO       | 66    | 35%    | 23.1     |
| GEO       | 54    | 35%    | 18.9     |
| **Total** | **63** |       | **(D+)** |

**Grade: D+** (60-69). Substantial rework on the AEO and GEO sides; SEO is B-territory.

**Context:** site has ~13.9K GSC impressions/quarter at 0.19% CTR. Not a fresh launch — this is a mid-rank site whose AEO + GEO work hasn't caught up with search's 2026 shape (AI Mode, zero-click majority, off-site citation dominance).

---

## Sub-dimension Breakdown

| Dimension | Sub-dimension | Score | Notes |
|-----------|---------------|-------|-------|
| SEO | Technical | 18/25 | Robots.txt exists via `src/app/robots.ts`; sitemap date stuck at 2026-03-25 |
| SEO | On-Page | 19/25 | Meta rewrites from Sextant held up; some title lengths drift |
| SEO | Content & Structure | 18/25 | Homepage body doesn't link to state pages (only nav) |
| SEO | Performance & Mobile | 16/25 | 25 raw `<img>` tags vs 4 `next/image` — biggest drag |
| AEO | Answer-First Structure | 18/30 | Product pages strong; 26 blog post H2s all declarative |
| AEO | FAQ + Question Optimization | 18/25 | FAQ page is model-quality; no blog or state-page FAQ sections |
| AEO | Schema Markup | 17/25 | BreadcrumbList absent sitewide; `dateModified = datePublished` |
| AEO | Extraction / Snippet Readiness | 13/20 | State comparison table is excellent; definition blocks missing |
| GEO | Entity Authority | 14/25 | `Person` schema absent; blog "author" is generic "AI Compliance Documents Team" |
| GEO | Citation-Ready Content | 18/25 | microFacts + externalReferences architecture is the differentiator |
| GEO | Content Architecture for AI | 14/20 | llms.txt is excellent; state-to-blog cross-links weak |
| GEO | Off-site GEO Signals | 8/30 | Lowest subscore; NLR mention is one data point |

---

## Action Items (Consolidated)

Sorted by priority, then by impact. Owner-split follows the table.

| # | Action | Owner | Priority | Dimension | Effort | Expected Impact | Verification |
|---|--------|-------|----------|-----------|--------|-----------------|--------------|
| 1 | Unfreeze sitemap date. In `src/app/sitemap.ts:7`, replace the hardcoded `siteLastUpdated: "2026-03-25"` with `new Date().toISOString()` so every regeneration refreshes `lastmod`. | Claude | P0 | SEO | XS | Google stops deprioritizing recrawl of Illinois + Texas state pages (currently "Discovered – not indexed") | `curl -s https://aicompliancedocuments.com/sitemap.xml \| grep lastmod` shows today's date |
| 2 | Add explicit Category 2 + 3 AI bots to `src/app/robots.ts`: `OAI-SearchBot`, `Claude-SearchBot`, `Google-AI-Overviews`, `Claude-User`, `ChatGPT-User`, `Perplexity-User`. Wildcard `*` already allows them, but explicit hygiene matters as operators interpret wildcard differently. | Claude | P0 | GEO | XS | Site remains unambiguously visible to ChatGPT Search, Claude web citations, Gemini AI Overviews | `curl https://aicompliancedocuments.com/robots.txt \| grep -E "Claude-SearchBot\|OAI-SearchBot"` returns Allow |
| 3 | Rewrite all 26 blog post H2 headings into question form, with a 40-60 word direct-answer paragraph immediately below each. Preserve the existing microFacts + externalReferences architecture. | Claude | P0 | AEO | L | Google AI Mode (launched 2026-04, paragraph-level fan-out citation) can extract each H2 as an answer unit. Largest single AI-citation leverage on the site. | Sample 3 posts; verify each H2 ends with "?" and the first paragraph below is 40-60 words and stands alone |
| 4 | Add `BreadcrumbList` JSON-LD to `/products/[slug]`, `/blog/[slug]`, and state landing pages. Single shared helper. | Claude | P0 | AEO | S | SERP breadcrumbs appear for product + blog pages; AI engines get explicit hierarchy context | Google Rich Results Test passes BreadcrumbList on 3 sample URLs |
| 5 | Add `Person` schema for Cameron B. Paul (founder) with credentials, and set `author` on all blog post JSON-LD to this Person (not the generic "AI Compliance Documents Team" Organization type). | Claude | P0 | GEO | S | Blog posts carry named-human E-E-A-T weight; Perplexity + ChatGPT prefer credentialed named authors | Rich Results Test on a blog post shows `author.@type: Person`; `sameAs` references Cameron where available |
| 6 | Add homepage body links from penalty/content sections directly to the 4 state landing pages (not just via nav). Add "Read more" links from each state landing page into 2-3 relevant blog posts. | Claude | P0 | SEO + GEO | S | Unblocks the Illinois + Texas "Discovered – not indexed" state by giving Google editorial-link signals, not just sitemap signals | `grep -r "/illinois-ai-compliance" src/app/page.tsx` returns hits |
| 7 | Convert 25 raw `<img>` tags to `next/image` across homepage hero, state landing page heroes, blog post headers, lifestyle images. Set `priority` on above-fold hero images. | Claude | P1 | SEO | L | WebP/AVIF served automatically, LCP drops measurably, Core Web Vitals move from "needs improvement" toward "good" | Lighthouse on homepage before/after; `<img>` count drops from 25 to ≤3 |
| 8 | Fix product count three-way parity. Actual count in `src/data/regulations.ts` is **57**. About page says "54" (`src/app/about/page.tsx:288`). `public/llms.txt` says "53." Align all three to the true count. | Claude | P1 | SEO + GEO | XS | Inconsistent numbers undermine factual authority with AI engines that extract counts from page text | `grep -rE "\b(53\|54) products?\b" src/ public/` returns 0 hits after fix |
| 9 | Add FAQ sections (5-10 Q&As, 40-60 words each, self-contained) to each state landing page and ~10 high-value blog posts. Wrap in FAQPage JSON-LD. Questions written conversationally ("How much does Texas TRAIGA cost to comply with?" not "TRAIGA penalty schedule"). | Claude | P1 | AEO | XL | Transforms each page into 5-10 additional extractable answer units. FAQPage schema aids AI comprehension even though rich-results are gov/health restricted. | 3 sample pages validate as FAQPage in Rich Results Test; visible questions match schema exactly |
| 10 | Fix FAQ entry that is a statement not a question: "I have no idea where to start." Rewrite as "Where do I start if I don't know which law applies to me?" or remove. | Claude | P1 | AEO | XS | FAQPage schema integrity preserved; no Rich Results Test warning | Rich Results Test on `/faq` shows 0 warnings |
| 11 | Set `dateModified` separately from `datePublished` on blog post JSON-LD. Pull from file's git last-edit date or MDX frontmatter. | Claude | P2 | AEO | S | Content freshness signals to Google + AI engines that posts are maintained | Blog post JSON-LD shows `dateModified > datePublished` for at least 6 recently-edited posts |
| 12 | Add HowTo schema to step-by-step sections (e.g., "What Enforcement-Ready Actually Looks Like" in the new Texas TRAIGA post — 5 numbered steps). | Claude | P2 | AEO | S | Step sections become directly extractable as "how to" answer units | Rich Results Test validates HowTo on at least 2 pages |
| 13 | Add definition blocks ("What is a high-risk AI system?", "What is a bias audit?", "What is an impact assessment?") as standalone 40-60 word paragraphs, ideally on a glossary page plus embedded on relevant state pages. | Claude | P2 | AEO | M | Definition-seeking queries extract these as paragraph snippets; covers a long-tail query surface | 3 definition blocks visible; each stands alone without preceding context |
| 14 | Extend Organization `sameAs` array. Currently includes LinkedIn (see note below). Add NLR article URL, any Reddit profile once (14), any press or industry-directory listings as they land. | Claude | P2 | GEO | XS | Stronger entity signal to AI engines; explicit "this brand is the same entity as the one at these URLs" | View page source on `/`; `Organization` JSON-LD `sameAs` array has 3+ URLs |
| 15 | Establish branded Reddit presence — answer compliance questions in r/smallbusiness, r/Compliance, r/humanresources. Link to blog posts where actually relevant; do not spam. Consistent username matching brand. | Human | P1 | GEO | L+ | Perplexity's #1 citation source category is Reddit (approximate; see Open Questions). Even modest presence shifts citation probability. | Perplexity query for "Texas TRAIGA compliance" eventually cites the site or an authored Reddit comment |
| 16 | Submit IAPP Vendor Marketplace listing (already in queue). Exact buyer persona; strongest third-party credibility signal available without paid spend. | Human | P1 | GEO | M | Entity authority boost; citation trail AI engines follow for legal/compliance queries | Listing appears on iapp.org vendor directory within IAPP's own processing cycle |
| 17 | Submit Wikidata Q-ID for "AI Compliance Documents" as an organization with founder, founding date, industry classification. | Human | P2 | GEO | M | Wikidata Q-IDs are a strong entity-linking signal for Google Knowledge Graph and LLM entity resolution | Q-ID appears in Organization schema `sameAs` within Wikidata's own indexing cycle |
| 18 | Answer 5-10 AI compliance questions on Quora, citing blog posts where relevant. | Human | P2 | GEO | L | Quora has measurable AI citation weight; adds a citation trail | Quora author profile shows branded activity; a sample AI query eventually cites |
| 19 | Request first customer testimonial via email from a recent buyer. One sentence, attributed. Add to homepage. | Human | P2 | GEO | S | Social proof signals to both humans and AI engines that real customers exist | Testimonial with attribution appears on homepage |
| 20 | Decision: LinkedIn URL currently in `sameAs` schema on `src/app/page.tsx:46` and `src/app/about/page.tsx:40`. Your stated boundary is against LinkedIn. Claude needs your yes/no to remove it. | Human | P1 | GEO | XS (decision) | Schema reflects actual policy stance; stops AI engines from trying to fetch a LinkedIn profile that may not be maintained | `grep -r "linkedin.com" src/app/` returns 0 hits if removed |
| 21 | Google recrawl of Illinois + Texas state pages after sitemap date fix + homepage cross-links ship. | Out-of-hands | — | SEO | — | Illinois + Texas pages move from "Discovered – not indexed" to indexed; CTR baseline measurable | `gsc.py inspect` on both URLs shows `INDEXING_ALLOWED` and a non-null last crawl date |
| 22 | Google AI Mode begins sourcing from the site after H2 rewrites + BreadcrumbList + FAQ sections ship. | Out-of-hands | — | AEO | — | AI Mode citations start appearing for state law queries | `gsc.py queries` shows new query patterns matching AI-Mode referral signatures (hard to measure directly) |
| 23 | Third-party citation lift after Reddit + IAPP + Wikidata land. | Out-of-hands | — | GEO | — | Perplexity, ChatGPT, Gemini start citing the domain in AI answers to state law queries | Manual spot-checks in each AI engine for "Colorado AI law", "Texas TRAIGA small business", etc. |

---

## Grouped Action View

### What Claude can do right now (Claude, P0-P1)

1-10, 11-14 (14 items). Five of these are P0 and can all ship in one session: **sitemap date, robots.txt Category 2 bots, blog H2 rewrites, BreadcrumbList schema, Person schema + homepage→state links (#6) + product count parity (#8).** The H2 rewrite is the heaviest lift but also the single highest-leverage item.

### What needs your input first

- **#20 — LinkedIn URL in schema:** remove or keep?
- **#8 — product count canonical number:** 57 (actual data), 53 (llms.txt), or 54 (about page)?

### What a Human needs to do (you, over time)

15-19. Reddit, IAPP, Wikidata, Quora, testimonial. These are the "off-site GEO" lever that scored 8/30 — the weakest dimension. They're slow to compound but the 2026 research says they matter more than on-site changes for AI citation.

### Out of our hands — visibility only

21-23. Google recrawl, AI Mode indexing, AI engine citation — these lag the changes. Named so you can see the full picture, not so you act on them.

---

## Decisions I Need From You

Before Claude proceeds with the P0 batch:

1. **LinkedIn URL in Organization schema — remove or keep?** (#20)
2. **Canonical product count — 57, 53, or 54?** I recommend 57 (the actual data), but if some of those are add-ons not sold standalone, the number may legitimately be lower. (#8)
3. **Blog H2 rewrite scope — all 26 posts in one pass, or start with the top-6 already meta-rewritten by Sextant?** All 26 is cleaner; top-6-first is faster to test. (#3)

---

## Deficiency Summary

| Deficiency | Location | Dimension | Severity |
|------------|----------|-----------|----------|
| Sitemap `lastmod` frozen at 2026-03-25 | `src/app/sitemap.ts:7` | SEO | Critical (blocks IL + TX indexing) |
| 26 blog H2s declarative, not question-phrased | `content/blog/*.mdx` | AEO | Warning (largest AI-Mode citation gap) |
| No BreadcrumbList schema anywhere | sitewide | AEO | Warning |
| No Person schema; blog authors are generic Organization | `src/app/blog/[slug]/page.tsx` + all MDX frontmatter | GEO | Warning (E-E-A-T gap) |
| 25 raw `<img>` tags | homepage hero + state page heroes + blog headers | SEO | Warning (LCP drag) |
| No homepage body links to state landing pages | `src/app/page.tsx` | SEO | Warning (internal-link signal gap) |
| robots.txt missing Category 2 Search/Retrieval explicit bots | `src/app/robots.ts` | GEO | Opportunity (wildcard covers but hygiene) |
| Product count inconsistent across surfaces | about:288, llms.txt, regulations.ts | SEO + GEO | Warning |
| FAQ entry is statement not question | `/faq` page | AEO | Opportunity |
| dateModified = datePublished | blog JSON-LD | AEO | Opportunity |
| LinkedIn URL in sameAs despite stated boundary | page.tsx:46, about/page.tsx:40 | GEO | Opportunity (policy decision) |
| Off-site citation presence thin | Reddit absent, IAPP pending, Wikidata absent | GEO | Warning |

---

## Open Questions / Unmeasurable

- **Claude citation tracking is not available via API.** Any "Claude will now cite more" outcome is directional, not measurable.
- **Several 2026 AI statistics cited by the agents lack primary-source URLs.** Key examples: "Perplexity cites Reddit in 46.7% of responses," "Google AI Mode pulls from 30+ sources per query," "zero-click exceeds 60% of queries." These are directionally supported by multiple industry analyses but do not trace to a single primary study. Treat them as approximate. The SEO/AEO/GEO framework itself still holds regardless of the exact percentages.
- **Core Web Vitals field data** requires full GSC Core Web Vitals report access — this audit assessed lab-side indicators only.

---

## Research Files

- Discovery: `research/audit-aicompliancedocuments-2026-04-24/discovery.md`
- SEO findings: `research/audit-aicompliancedocuments-2026-04-24/seo-findings.md`
- AEO findings: `research/audit-aicompliancedocuments-2026-04-24/aeo-findings.md`
- GEO findings: `research/audit-aicompliancedocuments-2026-04-24/geo-findings.md`
- GL Proxy review: (delivered in-session, see flags resolved in this report)

---

## Audit Notes

- The SEO agent missed that `src/app/robots.ts` is Next.js App Router's dynamic robots (auto-served at `/robots.txt`). Their finding of "missing robots.txt" was incorrect; the file exists and is live. GEO agent's live fetch was accurate.
- Both agents independently flagged the microFacts/externalReferences architecture as the site's genuine AEO/GEO differentiator. That architecture is a moat. Do not trade it for punchier copy.
- Sextant's 2026-04-23 session fixes held up — meta descriptions, nav link, FeaturedInBar, integrity corrections are all present and working. This audit found craft-level issues, not integrity issues. That's the right shape.
