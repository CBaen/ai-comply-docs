# AI Compliance Documents — Work Queue
## Updated: 2026-03-22 (end of session — 5 blog posts, EEOC NLR article, accessibility audit, UX improvements, security hardening, logo/favicon)
**When an item is DONE: delete it from this file.** Git tracks completion history. Queues are for current work only. Never accumulate completed items.

## CRITICAL (Revenue/Operations)

- [ ] **Customer account center end-to-end test** — database is now connected. Test a real purchase: webhook fires, download link appears in account center.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 53 products individually
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.

## NEW — Added 2026-03-20

- [ ] Google Ads MCP setup (TrueClicks) — for family to manage campaigns

## NEW — Added 2026-03-22

- [ ] 5 remaining homepage blog links need browser Claude URL verification (CA legislature, CPPA, CT AG, ANAB)
- [ ] 6 major accessibility issues remaining (text contrast, questionnaire error focus, dark mode contrast)
- [ ] 10 minor accessibility issues remaining (aria labels, SVG hidden, carousel dots)
- [ ] Texas HB 149 product — no entry in regulations.ts yet
- [ ] End-to-end checkout test still not completed
- [ ] Google Ads campaign — account created but no ads running yet
- [ ] Account portal re-download button disabled (form_data removed) — consider removing or updating UI
- [ ] Column name mismatch in migrate.sql (amount_cents vs amount_paid)

## HIGH (Security + Architecture)

- [ ] **formData validation with Zod on verify-payment** — no schema validation on the payment verification route. Add Zod schema.
- [ ] **Nav refactor to server component** — nav is currently a client component, preventing full RSC optimization. Flagged in code review, deferred due to scope.
- [ ] **Email metadata consolidation** — three separate sources for product metadata in email templates. Consolidate to one source of truth (regulations.ts).
- [ ] **fal.ai key rotation** — key was in git history. Cameron evaluating provider alternatives. Do not use until resolved.
- [ ] Stripe badge/logo in trust bar — currently text-only "Secure checkout via Stripe." Replace with actual Stripe logo for brand recognition.
- [ ] Colorado consumer opt-out right (§6-1-1703(3)) — browser Claude review identified this is NOT covered by any existing product. Consider adding to Appeal & Correction Kit or creating separate small product.

## HIGH (Trust & Conversion)

- [ ] Questionnaire step 3/4 mismatch — hiring-specific language (bias audits, candidate screening) shows for ALL products including vendor due diligence and incident response. Add `skippedSteps` config or conditional rendering.
- [ ] Law gate softening for non-law products — NIST, EEOC products force customers to click out to a 100-page federal framework doc before checkout. Soften to "please review" with checkbox available immediately for framework-based products.

## MEDIUM (Content & SEO)

- [ ] CA ADMT Jan 2027 date — needs browser Claude verification
- [ ] FRIA Kit scope — needs browser Claude verification
- [ ] Blog style guide document — document voice, structure, enrichment blocks, image requirements, internal linking rules. Reference for browser Claude when writing new articles.
- [ ] More blog content — AEO research identified gaps: "Do I Need AI Compliance?" decision guide article (separate from quiz page), state AI law master tracker expansion, free downloadable resource/checklist
- [ ] Per-post og:image — each blog post should have its own OG image for social sharing instead of the site-wide default
- [ ] Colorado landing page needs verified research integration — waiting for browser Claude cross-verification results
- [ ] Google Ads campaign setup — account created, keywords ready, needs landing page deployment first

## MEDIUM (External Presence)

- [ ] LinkedIn company page — DO NOT SUGGEST. Guiding Light has a moral boundary against LinkedIn.
- [ ] G2 free listing — BLOCKED on DBA filing. Creates a profile even with zero reviews.
- [ ] Capterra free listing — acquired by G2 in Feb 2026. Same ecosystem now.
- [ ] IAPP Vendor Marketplace listing — International Association of Privacy Professionals. Exact buyer persona. Most credible third-party validation available.
- [ ] Trustpilot widget — even with 0 reviews, the presence signals confidence
- [ ] First customer testimonial collection — email first buyers asking for a one-sentence quote
- [ ] Reddit presence — r/smallbusiness, r/Compliance, r/humanresources. Answer questions helpfully, link to blog when relevant.
- [ ] Quora — answer AI compliance questions, link to blog posts. High AI citation rate.
- [ ] Medium — import 12 blog posts using Import Tool (auto-adds canonical). Wait 2 weeks after original publication.
- [ ] Product Hunt — prepare launch. Need 15-20 people ready for day-one upvotes.

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

**Action:** DBA filed March 20, 2026 with Wyoming Registered Agent Services. Waiting for processing (~15 business days). Items above remain blocked until processing is complete.

