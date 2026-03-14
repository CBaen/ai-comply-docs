# Research Council Audit: SEO, Competitive Positioning & Marketing Strategy
**Site:** aicompliancedocuments.com
**Audited:** March 14, 2026
**Council role:** Strategic review synthesizing site code, research files, and competitive landscape

---

## Executive Summary

The site has strong bones: correct technical SEO infrastructure, quality content, a sensible product architecture, and a real market opportunity. The critical gaps are (1) thin structured data coverage that caps search visibility, (2) a product library where only 4 of ~24 products are live, (3) no email list or lead capture, and (4) a Colorado SB24-205 deadline 107 days out that represents the clearest near-term revenue event.

The domain is new with no backlinks. Organic search will not be a primary revenue driver for 6–12 months. The advertising and deadline-event strategy must carry the first wave. Content is the compounding long-term asset.

---

## 1. SEO Audit

### What's Present (Confirmed from Code)

| Element | Status |
|---|---|
| Title tags — unique per page | Present |
| Meta descriptions — unique per page | Present |
| Canonical URLs — homepage and blog | Present |
| Canonical URLs — regulation/product pages | Present (via `generateMetadata`) |
| Open Graph tags | Present on all pages |
| Twitter card meta | Present |
| Robots.ts | Correct (allows all, disallows /api/) |
| Sitemap.ts | Present; includes homepage, /blog, regulation pages, blog posts |
| Organization JSON-LD | Present on homepage |
| FAQPage JSON-LD | Present on homepage (7 questions) |
| Product JSON-LD | Present on regulation pages (minimal — price, name, description only) |
| RSS feed | Present at /rss.xml |
| llms.txt | Present at /public/llms.txt |
| Google Search Console verification | Present in layout.tsx |
| googleBot crawl directives | Present |

### Confirmed Gaps (From Code Inspection)

**Gap 1: Product JSON-LD is minimal — missing seller, brand, and availability.**
The `StructuredData` component in `regulations/[slug]/page.tsx` only sends name, description, price, and currency. Google's product rich results require `seller`, `brand`, and `availability` for maximum eligibility. This is a 15-minute fix with meaningful impact on how product pages appear in Google Shopping and product result features.

**Gap 2: BlogPosting JSON-LD absent from blog post pages.**
The blog index has correct metadata. Individual blog post pages are not confirmed to have `BlogPosting` JSON-LD. This is the single largest structured data gap — blog posts are where most organic traffic will land, and `BlogPosting` schema is what enables Google AI Overviews, featured snippets, and article carousels to cite the content.

**Gap 3: BreadcrumbList JSON-LD absent.**
Neither blog posts nor product pages have BreadcrumbList schema. Breadcrumbs appear in Google SERP URLs instead of raw slugs, which increases click-through rate.

**Gap 4: No Legislation JSON-LD on regulation pages.**
Regulation pages use Product schema. Adding a parallel `Legislation` schema (schema.org/Legislation type) tells AI crawlers and Google that the page is specifically about a piece of enacted legislation — a stronger relevance signal for queries like "what is Colorado SB24-205."

**Gap 5: No og:image file exists.**
Layout references `/og-image.png` but this file is absent from public/. Every social share currently renders broken. This is both a trust signal problem and a practical conversion problem.

**Gap 6: Only 4 of ~24 products have live pages.**
The sitemap and product library only expose `ready: true` products. The 4 live products are: Illinois HB3773 ($299), Colorado SB24-205 ($449), Employee AI Acceptable Use Policy ($199), and Vendor AI Due Diligence Kit (price not confirmed in snippet). The remaining ~20 products are invisible to search engines entirely. Each non-live product represents a missed keyword opportunity.

**Gap 7: No internal links from product pages to blog posts.**
Blog posts link to products. Product pages do not link back to relevant blog posts. This is a one-way internal link graph. Bidirectional linking would keep users on-site longer and pass link equity in both directions.

**Gap 8: No homepage "From the Blog" section.**
The homepage is the most-linked-to page on the domain. Three featured blog posts on the homepage would create high-authority internal links to content that needs to rank.

**Gap 9: No /states/ hub pages.**
A `/states/colorado`, `/states/illinois` etc. structure would create topical geographic hubs. These pages capture state-specific search queries and provide a natural internal linking node between state-specific products and blog posts.

### Keywords the Site Is Targeting

From layout.tsx, page.tsx, blog/page.tsx, and regulation generateMetadata:

**Currently targeted:**
- "ai compliance," "ai regulation," "compliance documents," "ai hiring law"
- "algorithmic discrimination," "ai governance"
- Specific law names: HB3773, SB 24-205, TRAIGA, CCPA ADMT
- "ai compliance for small business"
- "ai compliance blog," "ai regulation news"

**Assessment:** The keyword selection is appropriate but incomplete. The highest-commercial-intent terms are law-specific template queries ("colorado AI policy template," "Illinois AI employment notice template") — these are not yet explicitly targeted in structured metadata. Blog keyword strategy is stronger (state law names, specific law citations) than product page keyword strategy.

### Content Gap — What the Site Should Rank for but Doesn't Have Content for

| Missing Content | Target Keyword | Why It Matters |
|---|---|---|
| "Does this law apply to me?" quiz | ai law applicability, who does colorado ai act apply to | Highest lead gen tool in the space |
| State AI law comparison table | state ai laws 2026 comparison | Most-linked asset type in compliance |
| Colorado SB24-205 complete employer guide | colorado sb24 205 employer requirements | Pillar page; captures the most urgent buying query |
| Illinois HB3773 vs. NYC Local Law 144 | illinois vs nyc ai hiring law | Comparison posts earn shares and links |
| "What documents does [law] require?" pages | what documents does sb 205 require | Directly pre-sells the product |
| Penalty exposure by state table | ai law penalties 2026 | High-share, high-citation asset |
| TRAIGA Texas guide | texas traiga compliance | Next deadline event after Colorado |
| NYC Local Law 144 guide | nyc local law 144 compliance | Existing law, enforcement active |
| AI compliance checklist (downloadable) | ai compliance checklist 2026 | Lead magnet + template intro |

### How the Blog Should Be Structured for SEO

The current blog is a flat list of posts. The high-leverage structure is a topic cluster model:

**Cluster architecture:**
- One pillar page per major law (3,000+ words, comprehensive, earns internal links)
- Spoke pages targeting specific questions (800–1,500 words, FAQ-format, target featured snippets)
- Blog index filtered by state/law tag so users (and Google) can navigate within a topic cluster
- Every spoke links to its pillar; every pillar links to the relevant product

**Internal link pattern that drives purchases:**
Body copy: "To satisfy this requirement, deployers need a written impact assessment." → inline link to the Colorado SB24-205 product page. This is not an ad; it completes the informational answer.

**Posting cadence:** 2–3 posts per week for months 1–3. A new domain needs 30–40 substantial pieces before organic search contributes meaningfully. Current pace (6 posts at launch) needs to accelerate significantly.

---

## 2. Competitive Analysis

### The Competitor Landscape

| Competitor | Price | Strength | Weakness |
|---|---|---|---|
| OGUN Security | ~$899 | Security-specific, bundled service | Not HR/employment focused; expensive; consulting model |
| Etsy templates | $9–$12 | Ultra-cheap, instant | Generic, no legal specificity, no state-law mapping, buyer doubts |
| Privacy Bootcamp | Subscription | Broad compliance education | Not templates; education not documentation |
| IBM, Delve (enterprise) | $50K–$500K+ annually | Deep integrations, enterprise trust | Completely wrong price/complexity for SMB and mid-market |
| Law firms (Littler, Ogletree, Fisher Phillips) | $5K–$25K per engagement | Signed by attorneys, defensible | Slow, expensive, requires ongoing relationship |
| SHRM templates | Free (members only) | Trusted brand, HR-specific | Paywalled, generic, not law-specific |
| AIHR | Free | Approachable, HR-focused | No legal specificity, drives awareness not compliance |
| Genie AI | Template platform | Slick UX, large library | UK-centric, weak on US state AI employment law |
| LegalTemplates.net | Free | SEO traffic, easy access | Generic, not state-specific, legally dubious quality |

### Positioning Against Each Competitor

**Vs. Law Firms:**
Law firms charge $300–600/hour. A custom Colorado SB24-205 compliance package runs $5,000–$25,000. Our site delivers statute-mapped documentation for $449 in 10 minutes. The positioning is not "instead of a lawyer" — it's "the starting-point document your lawyer reviews instead of drafting from scratch." This framing is (a) legally accurate, (b) more persuasive to buyers who already have outside counsel, and (c) positions the product as reducing legal fees rather than replacing legal advice. The FAQ already captures this: "Many companies use our templates as a starting point and have their attorneys review the output — saving significant legal fees compared to drafting from scratch."

**Vs. Etsy Templates ($9–$12):**
The attack vector is specificity and legal grounding. An Etsy template cannot credibly claim it was drafted against C.R.S. § 6-1-1703. Ours can. The buyer who is actually worried about a $20,000-per-violation penalty is not going to trust a $12 Etsy download with a stock photo cover. The positioning message: "The difference between a template and a compliance document is whether it was written against the actual statute." Price anchoring against law firm fees ($5,000+) makes $449 feel like a bargain, not a premium. Etsy is not really a competitor — it's evidence that buyers are searching, and it positions the market as underserved.

**Vs. Enterprise Platforms (IBM, Delve, OneTrust):**
These are not competitors — they are positioning anchors. The enterprise buyer at a Fortune 500 will use OneTrust. The mid-market employer with 200 employees and one HR Director will not implement a $150K compliance platform for one state law. The positioning is explicitly mid-market and SMB: "Built for companies that don't have a team of 20 compliance analysts." The enterprise platforms inadvertently validate the market; they're proof that AI compliance documentation is serious.

### Unique Selling Proposition — The Triangle

The site occupies a white space defined by three axes:

1. **Legally specific** (written against actual enacted statute text — not generic "AI policy")
2. **Affordable** ($149–$997 vs. $5,000–$25,000 from law firms)
3. **Self-service** (instant download vs. weeks-long legal engagement)

No current competitor occupies all three corners. Law firms have #1, not #2 or #3. Etsy has #2 and #3, not #1. Enterprise platforms have #1 in a different way, not #2 or #3 for this buyer.

The one-sentence USP: **"Compliance documentation built on enacted statute text, for a fraction of legal fees, available in minutes."**

---

## 3. Advertising Strategy

### What to Advertise First

**Colorado SB24-205 at $449, starting now.**

Reasoning:
- Hard deadline: June 30, 2026 — 107 days away. Deadline-driven purchases are the easiest to make and the easiest to justify to management.
- Clear, specific product. Buyers search for this law by name.
- The law has real penalties (Colorado AG treats violations as deceptive trade practices — civil penalties).
- $449 price point makes the purchase decision a solo approval at most companies (HR Director can expense it without a procurement process).
- Colorado is geographically targetable on LinkedIn.

**Second priority:** Illinois HB3773 ($299) — already in effect as of January 1, 2026. Illinois employers using AI in hiring are non-compliant today. Less urgency than a looming deadline, but more urgency than "coming soon" products.

### Colorado SB24-205 Deadline Campaign

**107 days is enough time for a three-phase campaign:**

**Phase 1: Now through April 30 — Awareness**
- Publish the definitive plain-English Colorado SB24-205 employer guide (blog post, 3,000+ words)
- Launch a deadline countdown email opt-in: "Get 90/60/30/14/7-day compliance reminders"
- Weekly LinkedIn posts: "X days until Colorado AI Act — one action item per post"
- Target: build awareness and email list before urgency peaks

**Phase 2: May 1 – June 15 — Urgency**
- Google Ads go live targeting Colorado-specific compliance keywords
- LinkedIn Ads targeting Colorado-based HR Directors and Compliance Officers
- DiveWire press release ($289): "Colorado Employers Have [X] Days to Comply with SB24-205"
- Consider webinar with employment attorney co-host
- Bundle messaging: "Everything Colorado requires, in one package"

**Phase 3: June 1–29 — Last Chance**
- Email countdown sequence: 30-day, 14-day, 7-day, 48-hour sends
- Homepage banner: deadline countdown with direct product CTA
- Google Ads budget increase; add "last chance" ad copy variants
- After June 30: pivot to "past the deadline — here's how to get into compliance now"

### Google Ads Strategy

**Budget recommendation for initial test:** $500–$1,000/month. At $3–$12 CPC for state-specific compliance terms, that buys 80–300 clicks. At a 2–5% conversion rate and $449 average order value, breakeven is approximately 5–10 sales. Start with the lower end and validate before scaling.

**Keyword targets (phrase and exact match, not broad):**

| Keyword | Intent | Match Type |
|---|---|---|
| colorado AI policy template | Very high | Exact |
| sb 205 compliance checklist | Very high | Exact |
| colorado AI act June 2026 | High (urgency) | Phrase |
| illinois ai employment notice template | Very high | Exact |
| AI acceptable use policy template | High | Phrase |
| AI hiring bias documentation | High | Phrase |
| NYC local law 144 compliance | High | Phrase |
| ai impact assessment template | High | Phrase |

**Negative keywords from day one:** free, ChatGPT, OpenAI, how to code, developer, python, API, open source, github, machine learning tutorial

**Landing pages:** Every keyword group must land on the matching regulation product page, not the homepage. A Colorado SB205 keyword landing on the homepage cuts conversion rate in half by adding a navigation step.

**Quality Score note:** B2B compliance keywords have low competition. CPC will be $3–$12, not the $30–80 seen in SaaS. This is a cost-efficient channel for this niche.

### LinkedIn Ads Strategy

**When to start:** May 1, aligned with the urgency phase of the Colorado campaign.

**Targeting:**
- Job titles: HR Director, VP Human Resources, Chief People Officer, Chief Compliance Officer, General Counsel (at companies under 1,000 employees), Head of Talent Acquisition
- Company size: 50–2,000 employees (under 50 = owner/operator, decisions made differently; over 2,000 = likely have internal legal team)
- Industries: Technology, Staffing & Recruiting, Healthcare, Financial Services, Professional Services, Retail
- Geography (Phase 2 priority): Colorado, Illinois, New York City metropolitan area
- Geography (Phase 3): All US

**Ad formats by phase:**
- Phase 2: Single Image Ad with deadline-driven headline ("June 30, 2026: Colorado AI Act Goes Live. Is Your AI Policy Ready?") linking to product page
- Phase 3: Lead Gen Form ad offering free compliance checklist to capture emails before hard pitch

**Expected benchmarks:** LinkedIn CPC $8–20 in HR/legal. Lead Gen Form CPL $40–120. At $449 product price and even a 3% email-to-purchase rate, a $120 CPL is profitable. LinkedIn is not for impulse purchases — it's for building the email list that converts over 30–60 days.

### When to Start Advertising

**Google Ads:** Start now (or as soon as a Colorado SB24-205 landing page is optimized). The keyword traffic is available today and the deadline is approaching.

**LinkedIn Ads:** Start May 1. The audience needs time to process the message, and the urgency hasn't peaked yet. Starting too early wastes budget on readers who file the information and forget it.

**Prerequisite before any advertising:** The Colorado SB24-205 product page and the Illinois HB3773 product page must be polished, have clear purchase CTAs, and be tested end-to-end (questionnaire → payment → download). Advertising to a broken conversion flow is money burned.

---

## 4. Content Marketing

### Blog Posts With the Highest Purchase Intent

These are ranked by likelihood that a reader finishes the post and immediately wants to buy a template:

1. **"Colorado SB24-205: What Employers Must Have in Writing by June 30, 2026"** — Explains each mandated document type. Every section ends pointing to the corresponding template component. This is the single highest-priority piece of content.

2. **"The 5 Documents Every Employer Using AI in Hiring Must Have in 2026"** — Lists: AI use policy, candidate notice, impact assessment, risk management policy, incident response plan. Each document is a product or bundle component. This post sells the library concept.

3. **"Illinois HB3773: The Annual Notice Your Company Should Be Sending Right Now"** — In-effect law, explains the exact notice requirement, shows the format, CTA: buy the Illinois package.

4. **"NYC Local Law 144: Your Bias Audit Is Not Enough"** — NYC employers think the bias audit is the whole compliance requirement. There are also notice and disclosure requirements. This "trap" framing converts well.

5. **"What Happens When an Employee Files an AI Discrimination Complaint? Your Response Plan."** — Incident response framing. Fear-based (appropriately). Sells the AI Incident Response Plan product.

6. **"AI Compliance Checklist for HR Teams: Colorado, Illinois, and NYC"** — Checklist format drives high shares and repeat visits. Multi-state angle sells bundles.

7. **"State-by-State AI Employment Law Tracker: 2026 Edition"** — The resource-page version of this topic captures enormous long-tail search traffic and earns links from journalists and law firms.

8. **"How to Write an AI Acceptable Use Policy Without a Lawyer (And When You Actually Need One)"** — Positions the template as the middle ground between DIY (risky) and full legal engagement (expensive).

### Interactive Tools That Generate Leads

**Priority 1 — "Does this law apply to me?" quiz**
5–7 questions: jurisdiction, company size, whether they use AI in hiring/lending/housing/healthcare decisions, number of AI tools deployed. Output: "Based on your answers, these laws likely apply to your company. Here's what each requires." Results gated behind email opt-in. This is the highest-ROI tool to build — it generates leads, demonstrates expertise, and filters buyers by their exact compliance situation.

**Priority 2 — State AI law map/filter**
Interactive map of US states, color-coded by law status (enacted/enforced, enacted/pending, pending, none). Clicking a state opens a summary panel with the law name, effective date, penalty range, and a link to the product. This becomes the most-linked asset on the site within 12 months if built correctly. IAPP's equivalent for privacy law gets thousands of inbound links. No equivalent exists for AI-specific regulation by state.

**Priority 3 — Compliance readiness assessment**
10–15 questions across documentation, training, risk assessment, technical controls. Outputs a score by category. Converts browsers into buyers by showing them exactly which documents they're missing.

**Priority 4 — Penalty exposure calculator**
Inputs: revenue, employee count, jurisdiction, laws applicable. Output: illustrative penalty exposure range with statute citations. Clearly labeled as illustrative, not a legal estimate. Journalists will link to this. Compliance officers will share it internally to justify purchasing.

### Newsletter

**Yes — high priority, start immediately.**

Compliance is one of the few product categories where the audience actively wants a newsletter. They need to know when laws change.

**Format:** "Regulatory Radar" — weekly, TLDR-style
1. **The Big Story** (2–3 sentences): most significant development this week
2. **What's Moving** (3–5 bullets): new bills, enforcement actions, guidance — each with 1-sentence summary
3. **Plain English Take**: one concept, explained simply
4. **Coming Up**: key dates, effective dates, comment periods

**What goes in it:** New AI bills passed in any state. Enforcement actions. Agency guidance updates. Upcoming deadlines. Occasional product spotlights tied to news events ("Colorado SB24-205 is in 60 days — here's the package").

**List building:** Gate the "Does this law apply to me?" quiz results behind email opt-in. Add newsletter sign-up to every blog post sidebar and post-read CTA. The Colorado deadline countdown offer ("remind me 30/14/7 days before the deadline") is a high-conversion signup prompt right now.

**Do not start a newsletter without a minimum 300-person list.** A newsletter sent to 50 people feels like shouting into a void. Build the list with the quiz and deadline opt-in first.

### Webinars and Law Firm Partnerships

**Webinars:** High-ROI channel for this product. 20–40% of attendees become leads; 5–20% convert within weeks.

Best first webinar: **"Colorado SB24-205: Are You Ready? Live Compliance Walkthrough"** — co-hosted with an employment attorney. Format: 30 minutes of content, 15 minutes Q&A. End with attendee discount. Target date: mid-May 2026 (6 weeks before deadline, maximum urgency). Record everything — replays extend the marketing life of the event.

**Law firm partnerships:** The highest-quality referral channel available.

- Target boutique employment law firms (50–200 attorneys) serving mid-market employers — not BigLaw
- Any firm that has published a Colorado SB24-205 or Illinois HB3773 client alert has clients with this problem right now
- Proposed value exchange: Co-branded template (firm gets attribution, site gets distribution to their client list)
- Attorneys cannot take commissions (bar rules), but they can list the site on their resource pages and include it in client alerts
- Provide review copies to 5–10 firms; ask for a quote for the site ("Our clients have found this useful for getting a documented starting point before our review")

---

## 5. First Page of Google

### Realistic Timeline for a New Domain

A new domain with zero backlinks faces a structural disadvantage regardless of content quality. Google's "sandbox" effect means most new sites don't see meaningful organic traffic for 6–12 months. This is not a content quality problem — it's a domain age and authority problem.

**Realistic ranking timeline:**

| Keyword Type | Time to Page 1 | Conditions |
|---|---|---|
| Brand name + product ("aicompliancedocuments.com colorado") | 4–8 weeks | Already happening via Search Console |
| Long-tail, low competition ("does colorado ai law apply to out of state companies") | 3–6 months | With good content and some backlinks |
| Mid-tail, specific ("colorado sb24-205 compliance") | 6–12 months | Requires content cluster + backlinks |
| Head terms ("ai compliance") | 18–36 months | Requires significant domain authority |

**The implication:** Paid advertising (Google Ads, LinkedIn) must carry revenue for the first 6–12 months. Organic search is the compounding long-term asset, not the near-term revenue driver. This is why the Colorado deadline campaign is so important — it creates urgency that makes paid advertising economics work before organic search matures.

### Domain Authority Situation

New domain. No confirmed backlinks. Google weights domain authority heavily for commercial and YMYL (Your Money or Your Life) content — which compliance content qualifies as. The site cannot rank on content quality alone in competitive terms.

**What domain authority actually measures:** The number and quality of external sites linking to the domain. A single link from SHRM or HR Dive is worth more than 100 links from generic directories.

### Backlink Strategy

**Priority backlinks (highest authority-per-effort):**

1. **Law firm resource pages** — Employment law firm blogs often have "resources" sections. Getting listed as a recommended template provider requires an email to the firm's marketing contact with a link to the product and a brief explanation of the value to their clients. Target: 10–20 outreach contacts in the next 60 days.

2. **HR Dive DiveWire** ($289 flat fee) — Produces a permanent on-site page with a link plus temporary newsletter feature. This is a paid backlink from a legitimate high-DA publication. Target: Run during the Phase 2 Colorado campaign (May 2026).

3. **National Law Review / JD Supra** — Both accept contributor articles. A well-written "plain English guide to Colorado SB24-205" can be placed on both platforms (they have different audiences). Each placement creates a high-authority backlink. Target: submit by April 15.

4. **IAPP, ISACA, SCCE newsletters** — These organizations link to external resources in their newsletters. Getting the "2026 State of AI Compliance" survey (if conducted) distributed through these channels generates backlinks from their websites when they write about it.

5. **Reddit citations** — Not direct backlinks (Reddit links are nofollow), but Reddit threads in r/humanresources and r/legaladvice where the site is cited drive real traffic and signal relevance to Google.

6. **Journalists covering AI employment law** — Law360, HR Dive, Bloomberg Law, SHRM's newsroom all cover this space. A press kit (key facts, statute citations, penalty data, quotable expert) makes it easy for journalists to reference the site. Target: proactive outreach for the Colorado deadline story in May.

### For Each Target Keyword — Page 1 Requirements

**"Colorado AI policy template" / "SB 205 compliance template":**
- Requires: A dedicated product page with keyword in title, H1, and URL; FAQ schema; internal links from blog content; 3–5 backlinks from relevant sites
- Timeline: 6–9 months if content and links are in place by June 2026
- Shortcut: Google Ads can put the site on "page 1" immediately at $3–12 per click

**"What is Colorado SB24-205":**
- Requires: Comprehensive blog post (2,000+ words), FAQPage schema, cited by at least one authoritative site
- Timeline: 4–8 months (this is a lower-competition informational query)
- AI Overview opportunity: This query will increasingly be answered by Google's AI. To be cited in the AI Overview, the post needs to state the answer in the first paragraph and have FAQPage schema.

**"Illinois AI hiring law":**
- Requires: Pillar post on HB3773, spoke posts targeting related questions, internal links from the product page
- Timeline: 6–12 months for Page 1 of standard results; 3–6 months for AI Overviews/featured snippets

**"AI compliance checklist":**
- High competition — SHRM, AIHR, and multiple consulting firms rank for this
- Strategy: Target the state-specific version ("Colorado AI compliance checklist 2026") where competition is lower, then build authority upward

**"AI acceptable use policy template":**
- Medium competition — AIHR, LegalTemplates.net, and several free template sites rank here
- Differentiator: State-law-specific framing ("AI acceptable use policy that satisfies Illinois HB3773") captures lower-competition variants where the site can rank faster

---

## 6. Synthesis: Priority Action Sequence

Given the Colorado deadline 107 days out, here is the sequenced action plan ordered by impact and urgency:

### Immediate (This Week)
1. Create og-image.png (1200x630, dark navy, white wordmark) — every social share is currently broken
2. Publish the Colorado SB24-205 definitive employer guide (3,000+ words, pillar post)
3. Launch the deadline countdown email opt-in on the Colorado product page and homepage
4. Add Product JSON-LD improvements (seller, brand, availability) to regulation pages — 15-minute fix

### This Month (March)
5. Build and launch the "Does this law apply to me?" quiz with email gate
6. Add BlogPosting JSON-LD to all blog post pages
7. Add BreadcrumbList JSON-LD to blog and regulation pages
8. Add internal links from regulation pages to related blog posts
9. Submit a Colorado SB24-205 guide article to National Law Review and JD Supra
10. Outreach to 10 Colorado employment law firms about resource page listings

### April
11. Launch Google Ads targeting Colorado and Illinois specific keywords
12. Build the interactive state AI law map (the single most-linkable asset in this space)
13. Publish 2–3 high-purchase-intent blog posts per week
14. Set up affiliate program for HR consultants (25% commission, tracked links)
15. Co-host webinar with employment attorney: "Colorado SB24-205 Live Walkthrough" — schedule for mid-May

### May
16. Launch LinkedIn Ads targeting Colorado HR Directors and Compliance Officers
17. DiveWire press release: "Colorado Employers Have [X] Days to Comply — Complete Template Package Available"
18. Begin Colorado last-chance email countdown (90-day, 60-day triggers)
19. Accelerate blog production on Illinois and NYC Local Law 144 topic clusters

### June 1–29
20. Homepage deadline countdown banner
21. 14-day and 7-day email sends to full list
22. Increase Google Ads budget on Colorado keywords
23. Ensure at minimum 4 more products are live (NYC Local Law 144, Employee AI Policy, Vendor Due Diligence, NIST AI RMF)

### Post-June 30
24. Pivot messaging to retroactive compliance (for those who missed it)
25. Begin building Texas TRAIGA campaign (next major deadline event)
26. Launch "Regulatory Radar" weekly newsletter (once list is at 300+)
27. Commission 200-person survey for "2026 State of AI Compliance" report

---

## 7. The One Honest Risk Assessment

**The assumption this plan depends on:** Guiding Light or a collaborator can produce 2–3 substantial blog posts per week for 3+ months. If content production stalls at the current pace (6 posts total), the organic SEO strategy fails. Content is the non-negotiable foundation.

**What advertising can and cannot do:** Google Ads and LinkedIn Ads can generate revenue right now. They cannot build the domain authority that makes organic search work. Without the content foundation, the site will remain paid-traffic dependent indefinitely.

**The Colorado deadline is a one-time event.** After June 30, 2026, the urgency evaporates. The email list, the blog authority, the backlinks, and the domain reputation built during the campaign are the durable assets. The deadline is the accelerant — the content strategy is the fire.

---

*Synthesized from: site code audit (layout.tsx, page.tsx, sitemap.ts, robots.ts, rss.xml/route.ts, llms.txt, blog/page.tsx, regulations/[slug]/page.tsx, regulations.ts), and research files (seo-authority-strategy.md, marketing-sales-research.md, content-authority-research.md).*
