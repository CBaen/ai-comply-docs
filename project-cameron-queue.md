# AI Compliance Documents — Work Queue
## Updated: 2026-04-27 (Plumb session — contest end-to-end + Build Steps 1–3 shipped)

**When an item is DONE: delete it from this file.** Git tracks completion history. Queues are for current work only. Never accumulate completed items.

---

## CRITICAL (Revenue/Operations)

- [ ] **Customer account center end-to-end test** — database is now connected. Test a real purchase: webhook fires, download link appears in account center.
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 57 products individually.

## HIGH (Buyer-Redesign Build — from Plumb's session 2026-04-27)

Steps 1–3 of C4's Build Order are LIVE. Steps 4–6 are queued. Source spec: `research/contest-buyer-redesign-2026-04-27/contestant-4/product-page-template.md`. **Mandatory pre-build read: `research/contest-buyer-redesign-2026-04-27/SHIP-BLOCKERS.md`.**

- [ ] **Verify Step 3 live on production** — curl `https://aicompliancedocuments.com/products/colorado-sb24-205?nocache=$(date +%s%N)` and confirm penalty section appears BEFORE document preview blocks. Step 3 (commit `030515f`) was pushed at session end; Vercel was still deploying.
- [ ] **Build Step 4 — `AlsoExposedStrip` component on Colorado page.** Most novel build surface. ~2–3h work. Build the component, add the `CROSS_STATE_EXPOSURE` mapping for `"colorado-sb24-205"`, filter by `status === "in-effect"`, render after the penalty section. Verify the three linked product pages (Illinois, NYC, Texas) exist and are reachable. Apply SHIP-BLOCKERS 1–4 + 6 to the IL/NYC/TX strip card copy (NYC must use `§§ 20-870 to 20-874` citation range and `Up to $1,500/violation; each day = separate violation` penalty framing; TX must say `AI developers + deployers` and `$10K–$200K/viol (uncurable max)`; NYC must NOT say "DCWP investigations increasing").
- [ ] **Build Step 5 — Status flip-logic conditional rendering.** Extend the existing `reg.status === "in-effect"` conditional pattern (already used in `StatusBadge`) to: deadline banner, H1, deck, Key Stats Bar entry, sidebar label, sidebar countdown removal, exposure summary close, penalty section header, meta description. The flip-logic table at `product-page-template.md` lines 311–323 is the implementation checklist.
- [ ] **Step 6 — `regulations.ts` Colorado status flip on/after June 30, 2026.** One-line change: `status: "effective-soon"` → `status: "in-effect"`. Triggers the full Step-5-wired flip automatically. Also requires `src/app/page.tsx` meta description manual update on July 1, 2026 (per `product-page-template.md` line 332). Schedule a remote agent for this if continuity may not span to July.

## HIGH (SHIP-BLOCKERS that land with their target pages)

These ship-blockers from `SHIP-BLOCKERS.md` only apply when the target product pages get redesigned. Apply during Step 4+ when those pages get touched.

- [ ] **SB-1: NYC product page citation range.** Replace `Built from NYC Admin. Code § 20-870` with `Built from NYC Admin. Code §§ 20-870 to 20-874 (Local Law 144)` on `/products/nyc-local-law-144` and any related copy.
- [ ] **SB-2: NYC product page penalty framing.** Replace `$500–$1,500/day` with `Up to $1,500/violation; each day = separate violation (§ 20-872)`. The per-violation cap and per-day stacking are different rules; current copy conflates them.
- [ ] **SB-3: TX product page applicability.** Replace `AI developers` with `AI developers + deployers` (or `Developers, deployers, gov entities`). Statute imposes obligations on all three; current label tells deployer-only buyers the law doesn't apply when it does.
- [ ] **SB-4: TX product page penalty range.** Replace `Up to $200K/viol` with `$10K–$200K/viol (uncurable max)`. $200K is only the upper end of uncurable band; curable cap is $12K.
- [ ] **SB-6: NYC + Illinois product pages — DCWP/IDHR enforcement framing.** Replace any `"DCWP investigations are increasing"` with `"DCWP enforcement active since July 5, 2023"` (factual, sourced). The audit found the underlying "increasing" claim contradicts the cited OSC audit which faulted DCWP for under-enforcement.
- [ ] **CITE-PRECISION: Colorado elderly $50K cap subsection.** Audits disagreed: Audit 1 found `(1)(f)` per HB 23-1257; Audit 3 found `(1)(c)` per a CO AG pleading. The C4 spec uses `(1)(c)`. Read C.R.S. § 6-1-112 directly on `leg.colorado.gov` (statute PDF, not summary pages) before shipping any copy that cites this subsection.
- [ ] **CITE-PRECISION: Texas TRAIGA bill number.** Spec uses "TRAIGA" without binding to bill number. Original TRAIGA was HB 1709 (88R) and did NOT pass. Operative law is HB 149 (89R), Tex. Bus. & Com. Code Ch. 552. Ensure all TRAIGA links go to `https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149`.

## HIGH (Validation — un-run audit prompts from Plumb's session)

GL ran one of five browser-Opus audit prompts (statute integrity, run 3 times by 3 different instances). The other 4 are queued for next session. Prompts are in the conversation history of Plumb's session and can be regenerated from the C4 spec files.

- [ ] **Audit Prompt 2 — Voice + "stop looking like info site"** — role-play deadline-anxious buyer, test if homepage hero passes the 5-second test, identify journalist-explainer drift
- [ ] **Audit Prompt 3 — End-to-end buyer journey stress test** — three buyer personas (CO HR director / IL employer / multi-state operator), name break-points
- [ ] **Audit Prompt 4 — Adversarial / red team** — what did the contest miss, weakest assumption, blind spot, biggest 3-month-from-launch failure mode
- [ ] **Audit Prompt 5 — Visual design hostile review** — palette risk, type pairing, hero pattern, product card at scale, mobile-first failure modes, accessibility, brand identity

These should run BEFORE Step 4–6 ship since visual + voice fixes often affect the same files Steps 4–5 touch.

## HIGH (Lodestone's still-open items)

- [ ] **Blog hero image sweep via Unsplash.** GL flagged 2026-04-23: every blog hero is currently "laptops in offices with state flag — too corporate." Need lifestyle/location photos: Colorado Rockies trail with hikers / Chicago Riverwalk crowd / Mission District / Austin South Congress / NYC Washington Square / etc. **fal.ai is locked. Use Unsplash (free, commercial-OK).** Hero images live in `public/blog/blog-hero-*.png` — see frontmatter `image:` field of each `.mdx`. ~20 images to swap.
- [ ] **Google Ads campaigns (Colorado + Texas) via API integration.** Specs in `MARKETING-LAUNCH-CHECKLIST.md` §2 + §2b. **Build OAuth → API integration like Stripe MCP / GSC CLI** — don't ask GL to click through ads.google.com. Existing Google Ads credentials (developer token + customer IDs) at `C:/Users/baenb/.claude/projects/.../memory/reference_google_ads_credentials.md`. `mae v5` Google Cloud project hosts the Ads API credentials. **NEW context:** Steps 1–3 of the redesign are now live, so Google Ads landing pages have refreshed copy to align ad creative with — pull the C4 ad-creative.md spec for headline/description starter language.
- [ ] **GSC re-measurement.** Now relevant to measure impact of Steps 1–3 (title + H1 changes on Colorado page; homepage H1 + UrgencyPanel). Run `python C:/Users/baenb/.claude/scripts/gsc.py summary aicompliancedocuments.com --days 7` and compare to baselines: pre-redesign Colorado product page 350 impressions / 0.29% CTR / position 11.14 (28-day window). Pre-redesign overall site 0.13% CTR / position 8.28.
- [ ] **Verify Workday blog page H2 propagation on production.** File committed + pushed 2026-04-24; Vercel edge cache was still serving partial build at Lodestone session end. Re-curl `/blog/workday-ai-hiring-lawsuit-employer-liability` — expect all 9 H2s in question form.

## HIGH (GEO Off-site Signals — from 2026-04-24 audit)

Off-site GEO scored 8/30 in the audit — the weakest dimension. These are Human actions (you drive them, Claude can help draft).

- [ ] **Reddit presence** — r/smallbusiness, r/Compliance, r/humanresources. Answer compliance questions helpfully, link blog posts where relevant, don't spam. Perplexity's #1 citation source category is Reddit. Consistent username matching brand.
- [ ] **IAPP Vendor Marketplace listing** — International Association of Privacy Professionals. Exact buyer persona. Most credible third-party validation available at no paid cost.
- [ ] **Wikidata Q-ID submission** — "AI Compliance Documents" as organization with founder (Cameron B. Paul), founding date, industry classification. Strong entity-linking signal for Google Knowledge Graph and LLM entity resolution. Add to `Organization.sameAs` once assigned.
- [ ] **Quora** — answer 5-10 AI compliance questions, cite blog posts. High AI citation rate.
- [ ] **Trustpilot widget** — even with 0 reviews, presence signals confidence. Widget code from trustpilot.com.
- [ ] **First customer testimonial collection** — email first buyers for a one-sentence attributed quote. Add to homepage + `Product.aggregateRating`.
- [ ] **Medium** — import 12 blog posts using Import Tool (auto-adds canonical). Wait 2 weeks after original publication.
- [ ] **Product Hunt launch** — prepare. Need 15-20 people ready for day-one upvotes.

## HIGH (Security + Architecture)

- [ ] **formData validation with Zod on verify-payment** — no schema validation on the payment verification route. Add Zod schema.
- [ ] **Nav refactor to server component** — nav is currently a client component, preventing full RSC optimization. Flagged in code review, deferred due to scope.
- [ ] **Email metadata consolidation** — three separate sources for product metadata in email templates. Consolidate to one source of truth (regulations.ts).
- [ ] **fal.ai key rotation** — key was in git history. Cameron evaluating provider alternatives. Do not use until resolved.
- [ ] Stripe badge/logo in trust bar — currently text-only "Secure checkout via Stripe." Replace with actual Stripe logo for brand recognition.
- [ ] Colorado consumer opt-out right (§6-1-1703(3)) — browser Claude review identified this is NOT covered by any existing product. Consider adding to Appeal & Correction Kit or creating separate small product.
- [ ] **Upstash Redis** for global rate limiting (in-memory limiter bypassable under load). Not urgent at current traffic.
- [ ] Account portal re-download button disabled (form_data removed) — consider removing or updating UI
- [ ] Column name mismatch in migrate.sql (amount_cents vs amount_paid)

## HIGH (Trust & Conversion)

- [ ] Questionnaire step 3/4 mismatch — hiring-specific language (bias audits, candidate screening) shows for ALL products including vendor due diligence and incident response. Add `skippedSteps` config or conditional rendering.
- [ ] Law gate softening for non-law products — NIST, EEOC products force customers to click out to a 100-page federal framework doc before checkout. Soften to "please review" with checkbox available immediately for framework-based products.
- [ ] **Workday case docket re-check** — blog post current as of March 27, 2026 last filing. Pull courtlistener.com/docket/66831340/ if 90+ days have passed and update blog post.

## MEDIUM (AEO polish — from 2026-04-24 audit)

- [ ] **`dateModified` on blog JSON-LD** — currently `dateModified = datePublished` (stale-signals to AI engines that nothing is maintained). Add `updated` frontmatter field to MDX schema; fall back to `date` where absent. Or pull from `git log -1 --format=%cI <file>` at build time.
- [ ] **HowTo schema on step-by-step sections** — e.g., "What Enforcement-Ready Actually Looks Like" in the new Texas TRAIGA post has 5 numbered steps. Validate via Rich Results Test.
- [ ] **Glossary page with definition blocks** — "What is a high-risk AI system?" / "What is a bias audit?" / "What is an impact assessment?" — 40-60 word standalone blocks, also embedded on relevant state pages. Definition-seeking queries extract these as paragraph snippets.
- [ ] **FAQ sections on state landing pages** — 5-10 conversational Q&As per state page, FAQPage JSON-LD wrapped. State pages currently have no FAQ section.
- [ ] **FAQ sections on top 10 blog posts** — same format. Highest-traffic posts first.

## MEDIUM (Content & SEO)

- [ ] More blog content — AEO research identified gaps: "Do I Need AI Compliance?" decision guide article (separate from quiz page), state AI law master tracker expansion, free downloadable resource/checklist
- [ ] Per-post og:image — each blog post should have its own OG image for social sharing instead of the site-wide default
- [ ] 5 remaining homepage blog links need browser Claude URL verification (CA legislature, CPPA, CT AG, ANAB)
- [ ] 6 major accessibility issues remaining (text contrast, questionnaire error focus, dark mode contrast)
- [ ] 10 minor accessibility issues remaining (aria labels, SVG hidden, carousel dots)

## LOW (Polish)

- [ ] Dark mode toggle removal consideration — research flagged it as "startup side project" signal on a compliance site
- [ ] "Reviewed by" or "In collaboration with" credit — if Cameron can get one licensed attorney to review templates, it transforms credibility
- [ ] BBB accreditation ($400-$1,200/year) — skip for now per research. Not worth it at this stage for a digital product.
- [ ] Physical contact information — BLOCKED on DBA. Once DBA is filed, 32 N Gould St, Sheridan, WY 82801 can be used.
- [ ] Free lead magnet — "Which State AI Laws Apply to My Business?" flowchart, gated behind email signup for list building

## BLOCKED (Waiting on DBA Processing)

- [ ] Bing Places registration
- [ ] Apple Business Connect (also needs Apple device)
- [ ] Google Merchant Center product feed
- [ ] G2 listing
- [ ] Any directory requiring business name verification

**Action:** DBA filed March 20, 2026 with Wyoming Registered Agent Services. Waiting for processing. Items above remain blocked until processing is complete.
