# AI Compliance Documents — Work Queue
## Updated: 2026-04-29 (Steps 4 + 5 shipped; Step 6 scheduled)

**When an item is DONE: delete it from this file.** Git tracks completion history. Queues are for current work only. Never accumulate completed items.

---

## SCHEDULED ACTIONS (cloud routines)

- **`trig_01LE5ZVLyK7GMmzmKGuDShcj`** — Step 6: Colorado SB 24-205 status flip. Fires once at `2026-06-30T06:00:00Z` (= midnight MDT, June 30, 2026). Manage at https://claude.ai/code/routines/trig_01LE5ZVLyK7GMmzmKGuDShcj. **Blocked on:** GitHub auth not connected for the routine's account — agent will fire but fail to push. Manual fallback in HANDOFF.md.

---

## CRITICAL (Revenue/Operations)

- [ ] **Customer account center end-to-end test** — database is now connected. Test a real purchase: webhook fires, download link appears in account center.
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 57 products individually.
- [ ] **Connect GitHub for the Step 6 routine.** Run `/web-setup` in claude.ai OR install the Claude GitHub App at https://claude.ai/code/onboarding?magic=github-app-setup. Otherwise the scheduled June 30 status flip will fire but fail to push.

## HIGH (Validation — un-run audit prompts)

The 4 un-run audit prompts are now self-contained and tracked at `research/contest-buyer-redesign-2026-04-27/AUDIT-PROMPTS.md`. Run 2–3× per prompt in parallel by independent browser-Opus instances for higher signal. Steps 4–5 are now live, so audits apply to current site state.

- [ ] **Audit Prompt 2 — Voice + "stop looking like info site"** — role-play deadline-anxious buyer, test if homepage hero passes the 5-second test, identify journalist-explainer drift
- [ ] **Audit Prompt 3 — End-to-end buyer journey stress test** — three buyer personas (CO HR director / IL employer / multi-state operator), name break-points
- [ ] **Audit Prompt 4 — Adversarial / red team** — what did the contest miss, weakest assumption, blind spot, biggest 3-month-from-launch failure mode
- [ ] **Audit Prompt 5 — Visual design hostile review** — palette risk, type pairing, hero pattern, product card at scale, mobile-first failure modes, accessibility, brand identity

## HIGH (SHIP-BLOCKERS that land with their target pages)

These ship-blockers only apply when the target product pages get redesigned. Step 4 was Colorado-only; the NYC/IL/TX product pages were NOT redesigned this round and still carry the original copy. Apply when those pages get touched.

Note: SHIP-BLOCKERS for the AlsoExposedStrip cards (showing IL/NYC/TX previews on the Colorado page) ARE applied — see `src/components/AlsoExposedStrip.tsx` `CARD_OVERRIDES`. But those overrides only fix the cross-state cards; the NYC/IL/TX product pages themselves still need the fixes below.

- [ ] **SB-1: NYC product page citation range.** Replace `Built from NYC Admin. Code § 20-870` with `Built from NYC Admin. Code §§ 20-870 to 20-874 (Local Law 144)` on `/products/nyc-local-law-144` and any related copy.
- [ ] **SB-2: NYC product page penalty framing.** Replace `$500–$1,500/day` with `Up to $1,500/violation; each day = separate violation (§ 20-872)`. The per-violation cap and per-day stacking are different rules; current copy conflates them. **Also:** `regulations.ts` NYC `penaltySummary` field still has the wrong framing — fix in data file too.
- [ ] **SB-3: TX product page applicability.** Replace `AI developers` with `AI developers + deployers` (or `Developers, deployers, gov entities`).
- [ ] **SB-4: TX product page penalty range.** Replace `Up to $200K/viol` with `$10K–$200K/viol (uncurable max)`.
- [ ] **SB-6: NYC + Illinois product pages — DCWP/IDHR enforcement framing.** Replace any `"DCWP investigations are increasing"` with `"DCWP enforcement active since July 5, 2023"` (factual, sourced). The audit found the underlying "increasing" claim contradicts the cited OSC audit. **Also:** `regulations.ts` NYC `penaltySummary` field has "Proactive DCWP investigations increasing in 2026" — fix.
- [ ] **CITE-PRECISION: Colorado elderly $50K cap subsection.** Audits disagreed: Audit 1 found `(1)(f)` per HB 23-1257; Audit 3 found `(1)(c)` per a CO AG pleading. Read C.R.S. § 6-1-112 directly on `leg.colorado.gov` (statute PDF) before shipping any copy that cites this subsection. The integrity comment in `[slug]/page.tsx` already flags this.
- [ ] **CITE-PRECISION: Texas TRAIGA bill number.** Operative law is HB 149 (89R), Tex. Bus. & Com. Code Ch. 552 — NOT HB 1709 (88R, did not pass). Already correct in `regulations.ts`; verify any new copy maintains this.

## HIGH (Lodestone's still-open items)

- [ ] **Blog hero image sweep via Unsplash.** Every blog hero is currently "laptops in offices with state flag — too corporate." Need lifestyle/location photos. **fal.ai is locked. Use Unsplash (free, commercial-OK).** Hero images live in `public/blog/blog-hero-*.png` — see frontmatter `image:` field of each `.mdx`. ~20 images to swap.
- [ ] **Google Ads campaigns (Colorado + Texas) via API integration.** Specs in `MARKETING-LAUNCH-CHECKLIST.md` §2 + §2b. Build OAuth → API integration like Stripe MCP / GSC CLI — don't ask GL to click through ads.google.com. Existing Google Ads credentials at `C:/Users/baenb/.claude/projects/.../memory/reference_google_ads_credentials.md`. **NEW context post-Steps-4-5:** Colorado landing page now has concrete urgency-mode UI (deadline banner + AlsoExposedStrip + countdown) to align ad creative with — pull C4 ad-creative.md spec for headline/description starter language.
- [ ] **GSC re-measurement (Steps 4 + 5 impact).** Wait for at least 2 weeks of post-Step-5 crawl data before reading. Baseline pre-Step-1: Colorado product page 350 impressions / 0.29% CTR / position 11.14 (28-day). 2026-04-27 28-day overall: 11,513 impressions / 15 clicks / 0.13% CTR / position 7.75 (mostly pre-ship; position improving from Plumb's baseline 8.28).
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
- [ ] **Glossary page with definition blocks** — "What is a high-risk AI system?" / "What is a bias audit?" / "What is an impact assessment?" — 40-60 word standalone blocks, also embedded on relevant state pages.
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
