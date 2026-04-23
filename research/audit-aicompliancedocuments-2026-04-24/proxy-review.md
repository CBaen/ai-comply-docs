# Guiding Light Proxy — Pre-Synthesis Review
**Date:** 2026-04-24
**Files reviewed:** discovery.md, seo-findings.md, aeo-findings.md, geo-findings.md
**Reviewed by:** GL Proxy (Sonnet 4.6)

---

## For Guiding Light

The audit team looked at the site from three angles: how well Google can find it (SEO), how well AI assistants like ChatGPT and Perplexity can pull answers from it (AEO), and how much the site shows up in AI-generated answers (GEO). The scores came back at 71, 66, and 54 out of 100.

Here is what that actually means for you: the foundation is solid. The legal sourcing that is your whole business model — the .gov links, the specific penalty numbers, the statute citations — that is genuinely doing its job, and the audit team specifically called it your single biggest differentiator. That is the thing to protect.

The gaps are mostly mechanical, not strategic. The biggest ones are: the site's blog posts are written in a style that AI assistants cannot easily quote from (because the headings are statements, not questions), images are loading in a slow format that Google penalizes, and the site has almost no presence on the platforms that AI assistants like Perplexity pull from most often.

What Sextant shipped last session moved the site forward. The sitemap resubmission, the Texas post, the state nav — all of that is in the audit's baseline and acknowledged.

**The single most important thing first:** the blog heading rewrites (converting "What Makes This Law Different" to a question format). This affects all 26 posts and is the action with the largest AI-citation impact. Claude can do it without you choosing anything.

**One flag to know about:** there is a conflict in the findings that needs resolving before you read the full report. The two teams disagree on whether the site has a robots.txt file. I am noting it here because the synthesis should resolve it before it reaches you — it affects 3 action items.

This is a "fix these flags first" situation, not a "hold everything." See flags below.

---

## Flags — For the Instance (Technical, Synthesis Must Resolve)

### FLAG 1 — CRITICAL: robots.txt contradiction between agents
**SEO agent (seo-findings.md, lines 8-9):** "public/robots.txt does not exist." Verified by codebase check — confirmed, file is absent from `public/`.
**GEO agent (geo-findings.md, lines 160-180):** "Fetched live from https://aicompliancedocuments.com/robots.txt (2026-04-24)" and presents a detailed table of explicit bot Allow entries (GPTBot, ClaudeBot, PerplexityBot, Bingbot, Claude-Web, etc.) as if they exist in the file.

These two findings are mutually exclusive. Either the file exists on the live server and is absent from the codebase (possible if deployed separately and not tracked in git), or the GEO agent hallucinated a live fetch and the file does not exist at all.

**Action for synthesis:** Fetch the live URL `https://aicompliancedocuments.com/robots.txt` to determine ground truth before synthesizing. If the file is absent from the live site, the GEO agent's entire robots.txt analysis table (lines 160-180, geo-findings.md) is fabricated from training knowledge. The SEO agent's P0 to create it stands. If the file exists live but not in codebase, that is a separate code-parity issue. This cannot be left ambiguous in the report GL reads — the two agents tell opposite stories.

---

### FLAG 2 — CRITICAL: "46.7% of Perplexity citations come from Reddit" — unsourced training-knowledge statistic
**Location:** geo-findings.md, lines 118, 147, 190.
**Issue:** This specific percentage is cited three times as a fact ("Perplexity's #1 citation source is Reddit (46.7% of citations)") with no source URL, no fetch citation, no study name. No key-numbers file exists in the audit directory that would be the expected home for a verified citation. This is almost certainly from training memory. The claim is used to justify making Reddit the highest-priority off-site GEO action.

**Why it matters for GL:** If the stat is stale, wrong, or fabricated, GL could prioritize Reddit effort based on a number that does not reflect current Perplexity behavior. GL relies on our cited numbers being real.

**Action for synthesis:** Either locate and cite the original research (likely Authoritas or a Perplexity usage study from 2024-2025) or downgrade the claim to "Reddit is a high-value Perplexity citation source" without the percentage. If a source cannot be fetched this session, the specific number must be removed.

---

### FLAG 3 — MODERATE: "14% URL overlap with organic is the baseline" — unsourced
**Location:** aeo-findings.md, line 117 (action item 7, Expected Impact column).
**Issue:** "AI Mode citations where 14% URL overlap with organic is the baseline" — no source. This is a specific research statistic likely from an SEMrush or SparkToro study on Google AI Mode. Training knowledge, no fetch.

**Action for synthesis:** Remove or source. If it cannot be verified, rephrase to "state compliance queries have high commercial intent; AI Mode citation of these pages is achievable."

---

### FLAG 4 — MODERATE: "Gemini 3, launched April 2026" — stated as fact without source
**Location:** aeo-findings.md, line 158.
**Issue:** "Google AI Mode (Gemini 3, launched April 2026)" is stated as a fact. The model name and launch date are specific, confident claims from training knowledge without a verification fetch. If Gemini 3 is the wrong version name or the launch date is off, the AEO section loses credibility.

**Action for synthesis:** Soften to "Google AI Mode (launched 2026)" or fetch the current version from a primary Google source. Do not present a specific model version number to GL without a verified source.

---

### FLAG 5 — MODERATE: ">60% zero-click" statistic — unsourced
**Location:** aeo-findings.md, line 115 (action item 5, Expected Impact column).
**Issue:** "top-of-funnel definition queries (>60% zero-click)" — no source URL. This is a commonly cited industry statistic that varies by study and year. Presenting it as an expected impact without citation is training knowledge leakage.

**Action for synthesis:** Remove the specific percentage or cite the research. "Top-of-funnel definition queries frequently result in zero-click behavior" is accurate without the number.

---

### FLAG 6 — MODERATE: Product count discrepancy — 53 vs. 54
**Location:** geo-findings.md, line 207.
**Issue:** The GEO agent flagged this correctly — About page (`src/app/about/page.tsx` lines 237, 288) says "54" in two places. `llms.txt` says "53." HANDOFF.md and the project CLAUDE.md both cite "53" as the source of truth from `regulations.ts`. Actual `regulations.ts` has 59 slug entries (verified by grep).

This is a three-way parity failure: About page (54), llms.txt (53), regulations.ts (59 by slug count — though some slugs may be add-ons rather than standalone products).

**Action for synthesis:** Flag this as a document-parity issue for Claude to resolve before shipping the full report. The synthesis should not publish any product count without knowing which number is current. The source of truth is `regulations.ts` — Claude should count the actual products that appear in the products listing, not the slug count.

---

### FLAG 7 — MINOR: LinkedIn sameAs in schema — not flagged by either SEO or GEO agent
**Location:** `src/app/page.tsx` line 46, `src/app/about/page.tsx` line 40.
**Issue:** The Organization schema on both pages has `sameAs: ["https://www.linkedin.com/company/ai-compliance-documents"]`. GL has a moral boundary against LinkedIn. The GEO agent correctly excluded LinkedIn from action items but did NOT flag that a LinkedIn URL is already embedded in the schema. This URL currently signals to AI engines that the brand has a LinkedIn presence — it may or may not exist.

This is in schema that Claude could modify. The synthesis should note this to GL as a question: the LinkedIn company URL is in the site's code now. GL may want it removed.

**Framing for GL:** Not an emergency, but worth a decision. The code currently tells search engines "we have a LinkedIn page." GL should know this is there.

---

### FLAG 8 — MINOR: "30+ sources per query" AI Mode claim — unsourced
**Location:** aeo-findings.md, line 158.
**Issue:** "paragraph/section-level fan-out from 30+ sources per query" — specific number, no source. Training knowledge.

**Action for synthesis:** Remove the specific number. "AI Mode pulls from multiple sources per query" is accurate without a number that cannot be verified.

---

### FLAG 9 — MINOR: "QAPage deprecated January 2026" — confidence without source
**Location:** aeo-findings.md, line 42.
**Issue:** "No QAPage schema found anywhere in the codebase (correctly absent — deprecated January 2026)." Specific month. The QAPage schema deprecation is likely real but the "January 2026" date is stated from training memory without a fetch from schema.org changelog or Google's structured data documentation.

**Action for synthesis:** Change to "deprecated by Google" without a specific month, or fetch schema.org's documentation to confirm the date. The conclusion (correctly absent) is sound; only the specific date attribution is at risk.

---

### FLAG 10 — SCOPE: P0 count is 5, which will overwhelm GL
**Combined across three agents:**
- SEO P0s: robots.txt (item 1), sitemap date update (item 2)
- AEO P0s: blog H2 conversion (item 1), BreadcrumbList (item 2), FAQ sections for blog posts (item 3)
- GEO P0s: Person schema (item 1), explicit bot allows in robots.txt (item 2), state-to-blog cross-links (item 3)

That is 8 items labeled P0 across three agents. When synthesis presents them to GL together, the response will be paralysis.

**Action for synthesis:** The synthesis report should present a single consolidated P0 list. My recommendation for ranking:
1. Sitemap date — one line of code, unblocks Illinois/Texas indexing right now (SEO item 2)
2. robots.txt — create or verify (SEO item 1 / GEO item 2 — this is the same task)
3. Blog H2 rewrites — largest AI-citation leverage, Claude-executable (AEO item 1)
4. BreadcrumbList + cross-links — same session as H2 rewrites, Claude-executable (AEO item 2 / GEO item 3)
5. Person schema — small, high E-E-A-T return (GEO item 1)

Items 3, 4, and 5 are all Claude-executable and can be framed as "one session of work." Give GL one recommended decision, not a menu.

---

## Owner-Split Sanity Check

**Correctly labeled Claude:**
- robots.txt creation
- Sitemap date fix
- BreadcrumbList schema
- Homepage/state page hero image conversion to next/image
- FAQ schema text fix ("I have no idea where to start" → question form) — correctly labeled Claude, and I confirmed the actual file location: faq/page.tsx line 199, page.tsx line 434
- Blog H2 rewrites
- Blockquoted statutory text
- Cross-linking state pages to blog posts
- Person schema for Cameron B. Paul
- Author schema update (Organization → Person)

**Mislabeled or needs verification:**

AEO action item 5 (homepage Quick Answer definition block) is labeled "Human" with reasoning that it is content-direction. This is correct — the content and tone of a homepage definition block is GL's voice and GL's call. But the implementation (once GL approves the copy) is Claude. The label should say "Human (copy approval) + Claude (implementation)" or similar. As labeled "Human" it implies GL has to write the copy entirely, which is not accurate.

AEO action item 10 (pre-quiz paragraph on /do-i-need-ai-compliance) is labeled "Human." Same issue — GL approves copy direction, but Claude writes and implements. The split should be made explicit.

GEO action item 5 (Wikidata entry) is labeled "Human P1." This is correct — Wikidata accounts and entity creation require a verified human contributor. However, the synthesis should note that Claude can draft the Wikidata entry data and instructions so the Human action is as friction-free as possible.

GEO action item 11 (AggregateRating) is labeled "Human P3." This is correct and appropriate — reviews do not exist yet. No issue.

**One true mislabel:**
GEO action item 9 — "Extend sameAs in Organization schema... include NLR article URL. The NLR article URL is immediately available." This is labeled "Claude P1." But the sameAs extension also says "Wikidata Q-ID (once created)" and "IAPP listing URL (once live)." The action as written is partially blocked on Human-dependent items. Claude can do the NLR URL addition today. The Wikidata and IAPP additions require Human completion first. The action should be split or sequenced, not presented as a single Claude task.

---

## Verdict

**FLAGS — 10 items need attention before this reaches GL.**

The robots.txt contradiction (Flag 1) is the most urgent: two agents tell opposite stories about a foundational technical fact. This must be resolved by fetching the live URL before synthesis proceeds. Three unsourced statistics (Flags 2, 3, 5) will undermine the report's legal-integrity brand if they appear as authoritative numbers. The product count discrepancy (Flag 6) is a live document-parity issue that should be fixed, not embedded in a report.

The good news: the findings themselves are sound, the recommendations are directionally correct, and the agents respected both the legal-integrity boundary and the no-LinkedIn boundary properly. None of the flags are "stop everything." The report is close. Fix the robots.txt conflict, strip or source the bare statistics, and consolidate the P0 list before it goes to GL.
