# AI Compliance Documents — Work Queue
## Updated: 2026-04-24 (Lodestone session — full SEO/AEO/GEO audit + P0 execution + 208 blog H2 rewrites)

**When an item is DONE: delete it from this file.** Git tracks completion history. Queues are for current work only. Never accumulate completed items.

---

## CRITICAL (Revenue/Operations)

- [ ] **Customer account center end-to-end test** — database is now connected. Test a real purchase: webhook fires, download link appears in account center.
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 57 products individually.

## HIGH (Next Session)

- [ ] **Blog hero image sweep via Unsplash.** GL flagged 2026-04-23: every blog hero is currently "laptops in offices with state flag — too corporate." Need lifestyle/location photos: Colorado Rockies trail with hikers / Chicago Riverwalk crowd / Mission District / Austin South Congress / NYC Washington Square / etc. **fal.ai is locked. Use Unsplash (free, commercial-OK).** Hero images live in `public/blog/blog-hero-*.png` — see frontmatter `image:` field of each `.mdx`. ~20 images to swap. Still queued from Sextant.
- [ ] **Google Ads campaigns (Colorado + Texas) via API integration.** Specs in `MARKETING-LAUNCH-CHECKLIST.md` §2 + §2b. **Build OAuth → API integration like Stripe MCP / GSC CLI** — don't ask GL to click through ads.google.com. Existing Google Ads credentials (developer token + customer IDs) at `C:/Users/baenb/.claude/projects/.../memory/reference_google_ads_credentials.md`. `mae v5` Google Cloud project hosts the Ads API credentials.
- [ ] **GSC re-measurement ~7 days from 2026-04-24.** Run `python C:/Users/baenb/.claude/scripts/gsc.py summary aicompliancedocuments.com --days 7` to measure CTR lift from the combined meta rewrites + H2 rewrites + schema additions. Baseline: 0.19% CTR, 13,890 impressions/quarter. Also `gsc.py inspect` Illinois + Texas landing pages to verify "Discovered, not indexed" → "Submitted and indexed" after sitemap unfreeze.
- [ ] **Verify Workday blog page H2 propagation on production.** File committed + pushed 2026-04-24; Vercel edge cache was still serving partial build at session end. Re-curl `/blog/workday-ai-hiring-lawsuit-employer-liability` — expect all 9 H2s in question form. If still stale >24h after 2026-04-24, check Vercel deployment logs.

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
