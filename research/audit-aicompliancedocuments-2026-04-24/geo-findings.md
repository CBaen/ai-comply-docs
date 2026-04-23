# GEO Audit — aicompliancedocuments.com
**Date:** 2026-04-24
**Framework:** Generative Engine Optimization (GEO) — AI Citation Readiness
**Analyst note:** Claude citation tracking is not available via API. Directional recommendations only. LinkedIn exec posts excluded per client policy — a conscious GEO trade-off, not a gap.

---

## SCORE SUMMARY

| Dimension | Score | Max |
|---|---|---|
| Entity Authority | 14 | 25 |
| Citation-Ready Content | 18 | 25 |
| Content Architecture for AI | 14 | 20 |
| Off-Site GEO Signals | 8 | 30 |
| **TOTAL** | **54** | **100** |

---

## 1. ENTITY AUTHORITY — 14 / 25

### What Exists

**Organization schema on homepage:** Present at `src/app/page.tsx` lines 35–66 and duplicated on the About page at `src/app/about/page.tsx` lines 29–58. Includes: `name`, `url`, `logo`, `email`, `description`, `contactPoint`, `areaServed`, `knowsAbout`. WebSite schema with SearchAction also present.

**sameAs:** Contains one entry — `https://www.linkedin.com/company/ai-compliance-documents`. This is a LinkedIn company page URL. Whether the page actually exists is unverified. No Crunchbase, Wikidata Q-ID, IAPP directory URL, or any other third-party sameAs anchor is present.

**Founder info on About page:** Cameron B. Paul is named with substantial credential text (Citi Financial, Houston Methodist, federal agency experience). This is stronger than most solo operator sites. However, there is NO `Person` schema backing this — it exists as HTML only.

**Author schema on blog posts:** `src/app/blog/[slug]/page.tsx` lines 96–100 sets `author["@type"] = "Organization"` with the generic name `"AI Compliance Documents Team"`. This is the author text from MDX frontmatter. Every blog post carries `author: "AI Compliance Documents Team"` — no individual named author. AI engines use author entity signals for E-E-A-T weighting. An `Organization` type as blog author is weaker than a named `Person` with credentials.

**NLR mention:** Real, live, linked from homepage and all 4 state landing pages via `FeaturedInBar` component (`src/components/FeaturedInBar.tsx`). NLR is indexed by AI engines and is a legitimate citation-authority signal. One article.

**Knowledge graph path:** The NLR citation + the About page credentials + the Organization schema create a minimal but real foundation. Wikidata Q-ID does not appear to exist. Without a Wikidata entry, AI engines lack a canonical machine-readable anchor for the entity.

**Contact:** Email `info@aicompliancedocuments.com` in schema and on the contact page. Physical address blocked on DBA processing — noted in queue. This is a constraint, not an error.

### Gaps

- No `Person` schema for Cameron B. Paul anywhere in the codebase
- No Wikidata Q-ID, no Crunchbase URL, no IAPP directory listing in `sameAs`
- LinkedIn `sameAs` link exists in code but actual company page existence is unverified
- Blog author is `Organization` type, not a named credentialed `Person`
- Organization schema is duplicated on homepage and About page instead of using `@id` reference — creates potential ambiguity

---

## 2. CITATION-READY CONTENT — 18 / 25

### Strengths

**Statistics density is high.** Every blog post sampled carries penalty amounts with statutory citations in the first 200 words. The `ai-compliance-penalties-by-state.mdx` post leads with exact per-violation figures ($500/day NYC, $70,000 per violation Illinois, $200,000 Texas uncurable) with inline links to enacted statute text. This is the format AI engines extract for cited answers.

**`microFacts` and `externalReferences` schema is structurally excellent.** Both fields are rendered as clickable sourced links in the blog template. They create a sidebar of `.gov`-linked facts on every desktop view. This is above-average citation infrastructure for a B2B SaaS blog.

**Primary `.gov` sources are linked inline.** The Colorado post links to `leg.colorado.gov/bills/sb24-205` three times within the body text (verified in MDX). The penalties post links to NYC Administrative Code, ILCS, and EEOC. This is the site's primary differentiator and it shows in the content.

**Comparison tables exist.** `/ai-compliance-by-state` renders a multi-column table with state, law, effective date, status, max penalty, and price. The table data is populated server-side from `regulations.ts` and is in HTML on load — not client-rendered. This is extractable.

**Numbered checklists in product pages.** `DOC_EXPLANATIONS` in `src/app/products/[slug]/page.tsx` lines 89–101 maps document names to plain-language descriptions — extractable checklist format.

**Content freshness.** Blog posts dated 2026-03. The state hub carries "Updated April 2026" inline. Regulations.ts drives effective date data dynamically.

**"Two-Sentence Summary" on blog posts.** The `summary` frontmatter field renders as a highlighted box at the top of every blog post. AI engines preferentially extract this kind of pull-quote for answer synthesis.

### Gaps

**Author byline is generic.** `"AI Compliance Documents Team"` carries zero E-E-A-T weight. Named human expertise signals are absent from article bodies. The About page credentials for Cameron B. Paul do not flow into article attribution.

**No blockquoted statutory text.** The blog posts cite and link statutes but do not pull actual regulatory language into the article body as block quotes. AI engines weight quoted primary source text heavily — a three-sentence pull from `C.R.S. § 6-1-1705` inside a blockquote would be more extractable than a link to it.

**Information gain is present but uneven.** The Colorado deadline extension context (SB25B-004, the special session details, 48-14 House vote) is genuinely new analysis. The generic "What Is an AI Bias Audit?" post is less differentiated — likely similar to 50 other compliance sites.

**No "We found..." or proprietary research claims.** The site's business model makes attorney-like authority claims appropriate. Phrases like "In our review of the statute..." or "Our analysis of 53 state laws..." would signal original research rather than summary. Currently absent.

---

## 3. CONTENT ARCHITECTURE FOR AI — 14 / 20

### Hub-and-Spoke

**`/ai-compliance-by-state` is a real hub** — it links to all 4 state landing pages, embeds a comparison table, and links to product pages. The hero section renders direct links to Colorado, Illinois, California, and Texas landing pages. This is functional hub structure.

**State landing pages link to their products** — Colorado, Illinois, California, and Texas pages each include product CTAs. They carry FeaturedInBar.

**Cross-linking gap:** State landing pages do NOT link to blog posts about that state. The Colorado landing page (`src/app/colorado-ai-compliance/page.tsx`) does not contain a link to the Colorado blog posts (`/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know` or `/blog/colorado-ai-law-91-days-deadline-requirements`). This breaks the hub-spoke signal chain for AI engines trying to establish topical authority.

**Blog posts do not link back to state landing pages.** The Colorado blog post links to `leg.colorado.gov` but not to `/colorado-ai-compliance`. Outbound `.gov` links are good. Missing internal return links to the hub is an architecture gap.

### Rendering / AI Crawlability

**Next.js 16 App Router with RSC:** Homepage content (FAQ, methodology section, trust bar) is server-rendered HTML. The comparison table on `/ai-compliance-by-state` is populated server-side from `regulations.ts`. Blog post bodies are server-rendered via `renderMarkdown()`. Product page document lists are server-rendered.

**No JavaScript-only rendering blocks found** for the primary content surfaces. The questionnaire is a client component (`Questionnaire.tsx`) but it is behind the purchase flow, not on crawlable content pages.

**`llms.txt` exists and is excellent.** `public/llms.txt` contains a complete product listing with names, prices, URLs, and plain-English descriptions for all 53+ products organized by category. It includes a Resources section and an Optional section with blog post titles and URLs. This is the emerging 2026 standard for AI-native discovery and is already implemented well.

### Gaps

**No `Claude-SearchBot` or `OAI-SearchBot` explicit allow** in robots.txt. These are Category 2 (Search/Retrieval) bots. The current robots.txt uses `User-agent: *` `Allow: /` which does allow them by default — but explicit named entries for `Claude-SearchBot`, `OAI-SearchBot`, and `PerplexityBot` provide a stronger positive signal than wildcard default. `PerplexityBot` is already explicitly named (allow). `ClaudeBot` is explicitly named (allow). `OAI-SearchBot` and `Claude-SearchBot` are absent.

**No `noai` or TDM Reservation Protocol opt-out** — this is not a gap. The site correctly allows training/retrieval bots, which is appropriate for a brand that wants AI visibility.

**No explicit Dataset schema on blog content** — the state comparison page has a Dataset schema but individual blog posts use TechArticle. This is acceptable but HowTo or dataset-flavored schemas on penalty comparison content could increase extractability.

---

## 4. OFF-SITE GEO SIGNALS — 8 / 30

### What Exists

**National Law Review mention:** One article, live, linked from 5 pages (homepage + 4 state landings). NLR is a high-authority legal publication indexed by AI engines. This is the single strongest off-site signal the site has. It carries real weight with Perplexity and ChatGPT citation mechanisms because NLR is a trusted legal trade source.

**llms.txt:** On-site but functions as an off-site signal — AI engines that ingest llms.txt during indexing treat it as a machine-authoritative catalog.

### What Is Missing (context from 2026 research)

**Reddit:** Perplexity's #1 citation source is Reddit (46.7% of citations). There is zero documented Reddit presence for this brand. Verified in queue (`project-cameron-queue.md` line 54: "Reddit presence — r/smallbusiness, r/Compliance, r/humanresources"). This is the highest-leverage single action available.

**IAPP Vendor Marketplace:** International Association of Privacy Professionals is the direct buyer-persona match. A listing here would be cited by AI engines answering "where can I find AI compliance templates?" for privacy professionals. In queue but not yet done.

**Wikidata Q-ID:** Not present. A Wikidata entry for the organization provides a stable machine-readable entity anchor that Perplexity, ChatGPT, and Google Gemini all draw from for Knowledge Panel construction.

**Quora:** In queue (`project-cameron-queue.md` line 56). Quora answers appear directly in AI-generated responses. High citation rate relative to effort.

**Medium:** In queue (line 57). Medium posts with canonical tags back to the original are indexed by all major AI platforms. 12 posts identified as candidates.

**LinkedIn company page:** Excluded per client policy. This is a conscious GEO trade-off: Perplexity surfaces LinkedIn company/exec content at a higher rate than traditional SERPs. The brand accepts this trade-off knowingly.

**G2/Capterra/Trustpilot:** G2 blocked on DBA. Capterra is now G2 ecosystem. Trustpilot widget in queue — even a zero-review presence creates a third-party entity mention.

**Press beyond NLR:** One press mention is the floor, not the ceiling. Compliance Week, Law360, and IAPP publications are the citation trail AI engines follow for compliance vendors. None of these have mentions of this brand.

**Wikipedia:** Not feasible at current stage (solo operator, new company, no notability threshold met by Wikipedia's criteria).

---

## ACTION ITEMS

| # | Action | Owner | Priority | Effort | Expected Impact | Verification |
|---|---|---|---|---|---|---|
| 1 | Add `Person` schema for Cameron B. Paul to `src/app/about/page.tsx` — include `name`, `jobTitle`, `worksFor`, `sameAs` (any public profiles that exist), `knowsAbout` array with AI compliance topics. Link to About page via `author` property on the Organization schema. | Claude | P0 | XS | AI engines assign E-E-A-T weight to named credentialed humans; shifts from "unknown brand" to "named expert" | Google Rich Results Test on /about |
| 2 | Add explicit `Claude-SearchBot` and `OAI-SearchBot` to `public/robots.txt` with `Allow: /` — these are Category 2 Search/Retrieval bots. Current wildcard default allows them, but named explicit allows are a stronger positive signal. `OAI-SearchBot` = ChatGPT's live-web retrieval; `Claude-SearchBot` = Claude's web retrieval for chat. File: `public/robots.txt`. | Claude | P0 | XS | Explicit Category 2 allows reduce risk of misconfiguration in future robots.txt edits; signals intentional AI accessibility | Fetch robots.txt post-deploy, confirm entries |
| 3 | Add cross-links from each state landing page to 2-3 relevant blog posts. Colorado page (`src/app/colorado-ai-compliance/page.tsx`): link to `/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know` and `/blog/colorado-ai-law-91-days-deadline-requirements`. Repeat for Illinois, California, Texas. Also add reverse links from blog posts back to their state landing pages. | Claude | P0 | S | Closes hub-spoke signal chain; AI engines establish topical authority by following internal link clusters | Check Perplexity citation of state pages vs. blog posts within 2-3 indexing cycles |
| 4 | Update blog `author` schema in `src/app/blog/[slug]/page.tsx` lines 96–100: change `"@type": "Organization"` to `"@type": "Person"`, set `name: "Cameron B. Paul"`, add `url: "https://aicompliancedocuments.com/about"`, add `jobTitle: "Regulatory Compliance Professional"`. Update MDX frontmatter for all 26 posts: change `author: "AI Compliance Documents Team"` to `author: "Cameron B. Paul"`. | Claude | P1 | S | Named human author increases E-E-A-T signal; AI engines weight Person-type authors for trust scoring | Schema validation via Google Rich Results Test |
| 5 | Add Wikidata entry for "AI Compliance Documents" as an organization entity. Include: instance of (Q4830453 = business), founder (Cameron B. Paul), country (United States), official website, described at URL (NLR article as reference). This establishes a machine-readable entity anchor that Perplexity, ChatGPT, and Gemini draw from. | Human | P1 | S | Creates stable entity anchor for AI Knowledge Panel construction; sameAs property in schema can then reference the Q-ID | Add Wikidata Q-ID URL to sameAs array in Organization schema after creation |
| 6 | Create Reddit presence in r/Compliance, r/smallbusiness, and r/humanresources. Start with helpful answers to questions about AI hiring law, state AI regulations, and compliance documentation — link to blog posts when directly relevant. Do not post as a brand; post as a practitioner. Perplexity's #1 citation source is Reddit (46.7%). This is the highest-ROI single action available for off-site GEO signals. | Human | P1 | M | Perplexity citations and ChatGPT answer sourcing heavily weight Reddit; a 10-answer presence is measurable within weeks | Monitor Perplexity answers to "Colorado AI law compliance" queries for citation of these answers |
| 7 | Add blockquoted statutory text to the top 5 blog posts — pull 2-4 sentences of actual enacted language from the relevant statute into `<blockquote>` elements within the MDX body. Example for the Colorado post: the consequential decision definition from `C.R.S. § 6-1-1702(3)`. AI engines weight quoted primary source text higher than paraphrase + link. | Claude | P1 | S | Increases extractability score; AI engines preferentially surface pages that contain quoted primary source text | Compare AI-generated answer quality for Colorado SB 24-205 queries before and after |
| 8 | Submit IAPP Vendor Marketplace listing. IAPP (International Association of Privacy Professionals) is the buyer-persona home base for privacy and compliance professionals. A listing creates a third-party entity mention on a domain AI engines treat as authoritative for privacy compliance topics. | Human | P1 | S | Direct buyer-persona reach + authoritative third-party mention AI engines cite for vendor discovery queries | Search Perplexity for "AI compliance document templates" — confirm IAPP listing appears in source citations |
| 9 | Extend `sameAs` in Organization schema (both `src/app/page.tsx` line 45 and `src/app/about/page.tsx` line 39) to include: Wikidata Q-ID (once created), IAPP listing URL (once live), NLR article URL, Trustpilot profile URL (once created). The NLR article URL is immediately available. Using a press mention as a `sameAs` target is an under-used tactic that strengthens entity recognition. | Claude | P1 | XS | Every sameAs entry increases entity graph confidence; NLR URL is available now at zero cost | Validate schema with Google Rich Results Test; monitor Knowledge Panel appearance |
| 10 | Create Trustpilot profile page (free tier). Even with zero reviews, the third-party entity page establishes a machine-readable brand mention on a domain AI engines trust. Add widget to site footer. | Human | P2 | XS | Third-party entity anchor; Trustpilot is indexed by all major AI platforms | Confirm Trustpilot profile URL is crawlable; add URL to sameAs |
| 11 | Publish 12 of the 26 blog posts to Medium using the Medium Import Tool (preserves canonical back to aicompliancedocuments.com, no SEO conflict). Start with the 4 highest-penalty-specificity posts (penalties by state, Colorado 91 days, Texas TRAIGA, Illinois HB3773). Medium content is indexed by Perplexity and ChatGPT at high rates. | Human | P2 | M | Each Medium import creates a third-party entity mention with canonical preserved; expands surface area for AI retrieval | Monitor Perplexity citation sources for blog topics after import |
| 12 | Add `HowTo` schema to the "Do I Need AI Compliance?" quiz page (`src/app/do-i-need-ai-compliance/page.tsx`) and the About methodology page. HowTo schema is extracted by AI engines for step-by-step answers. The 4-step methodology on the About page (read statute → verify claims → flag pending → templates not opinions) maps directly to HowTo format. | Claude | P2 | XS | Increases extractability of methodology content; AI engines synthesize HowTo answers from structured schema | Rich Results Test; monitor ChatGPT answers to "how to build AI compliance program" |
| 13 | Answer AI compliance questions on Quora. 5-10 detailed answers linking to relevant blog posts. Quora answers are cited directly in ChatGPT-generated responses at a measurable rate. Topics: "What does Colorado SB 24-205 require?", "Do small businesses need AI compliance documentation?", "What is an AI bias audit?" | Human | P2 | M | Quora has high AI citation rate; each answer is a third-party entity mention with a direct link to the blog | Monitor ChatGPT answer sourcing for targeted queries |

---

## ROBOTS.TXT ANALYSIS

Fetched live from `https://aicompliancedocuments.com/robots.txt` (2026-04-24):

| Bot Category | Bot Name | Status in robots.txt | Assessment |
|---|---|---|---|
| Category 1 Training | GPTBot | Explicitly Allow | Policy choice — correct for brand wanting AI visibility |
| Category 1 Training | ClaudeBot | Explicitly Allow | Correct |
| Category 1 Training | Google-Extended | Explicitly Allow | Correct |
| Category 1 Training | CCBot | Explicitly Allow | Correct |
| Category 1 Training | anthropic-ai | Explicitly Allow | Correct |
| Category 1 Training | cohere-ai | Explicitly Allow | Correct |
| Category 1 Training | Applebot-Extended | Explicitly Allow | Correct |
| Category 1 Training | Amazonbot | Explicitly Allow | Correct |
| Category 2 Search/Retrieval | OAI-SearchBot | NOT NAMED — covered by `*` wildcard | Gap: add explicit Allow |
| Category 2 Search/Retrieval | Claude-SearchBot | NOT NAMED — covered by `*` wildcard | Gap: add explicit Allow |
| Category 2 Search/Retrieval | PerplexityBot | Explicitly Allow | Correct |
| Category 2 Search/Retrieval | Bingbot | Explicitly Allow | Correct |
| Category 3 User-Triggered | Claude-Web | Explicitly Allow | Correct |
| Category 3 User-Triggered | ChatGPT-User | NOT NAMED — covered by `*` wildcard | Minor gap |
| Category 3 User-Triggered | Perplexity-User | NOT NAMED — covered by `*` wildcard | Minor gap |

**Assessment: No P0 issues.** The wildcard `Allow: /` correctly grants access to all unnamed bots including OAI-SearchBot and Claude-SearchBot. The gaps are that `OAI-SearchBot` and `Claude-SearchBot` are not explicitly named — a future edit that adds a path-level disallow could accidentally block them. Explicit naming (Action Item 2) is defensive hygiene, not emergency remediation.

---

## TOP 3 PRIORITIES

**1. Person schema + named author attribution (Actions 1, 4)**
The single fastest entity authority upgrade available. Cameron B. Paul's credentials are already on the About page. Adding `Person` schema and switching blog post author attribution from "AI Compliance Documents Team" to his name moves the brand from "unknown organization" to "named credentialed human" in AI entity graphs. This affects every blog post, every article citation, and the About page Knowledge Panel. Claude can implement this in one session.

**2. Reddit presence — r/Compliance, r/smallbusiness, r/humanresources (Action 6)**
46.7% of Perplexity citations come from Reddit. The brand has zero documented Reddit presence. Five genuine, helpful answers to questions about AI hiring law — linking to blog posts where relevant — creates a citation surface that no amount of on-site optimization can replicate. This is a Human action but it is the highest-leverage off-site move available.

**3. Internal cross-linking: state pages → blog posts → state pages (Action 3)**
The hub-spoke architecture is structurally present but the links that activate it are missing. Colorado, Illinois, California, and Texas landing pages do not link to their blog counterparts. This is a Claude-executable code change that closes the topical authority signal chain for the site's four highest-value state pages.

---

## NOTES

**Claude citation tracking is not available via API. Directional recommendations only.**

**LinkedIn exec posts excluded per client policy — a conscious GEO trade-off, not a gap.** LinkedIn company/founder content ranks higher in Perplexity than traditional SERPs. The brand accepts this trade-off knowingly and it is documented here for completeness.

**NLR mention is the current ceiling of off-site authority.** It is real, live, and carries weight. The next tier is IAPP (buyer-persona match) and Reddit (citation volume). Press outreach to Compliance Week or Law360 is the tier after that — appropriate after IAPP and Reddit are established.

**DBA blocking** currently prevents G2, Bing Places, Google Merchant Center, and physical address disclosure. These items remain blocked until DBA processing completes.

**Product count discrepancy:** About page says "54" (`src/app/about/page.tsx` line 237), homepage metadata says "53" (`src/app/page.tsx` line 12 keyword). llms.txt says "53." The queue notes the source of truth is `regulations.ts`. This inconsistency should be resolved — AI engines extract product counts from page text and inconsistent counts undermine factual authority.
