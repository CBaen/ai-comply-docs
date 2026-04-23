# Marketing Launch Checklist

**Created 2026-04-23** during the integrity + GSC audit session.
These are the manual steps only GL can take (Stripe live-mode + Google Ads billing require your account credentials).

Each step is self-contained. Do them in any order. Tick items by deleting them from this file as they complete.

---

## 1 — Create 4 Stripe Products (Stripe Dashboard)

The Stripe MCP is in test mode, so Claude Code cannot create live products. Use the Stripe Dashboard.

**For each product below:**
1. Stripe Dashboard → Products → **+ Add product**
2. Fill the fields from the table
3. Click Save
4. Click the new product → copy the `price_xxx...` ID from the Pricing section
5. Paste that ID into `src/data/regulations.ts` on the matching product's `stripePriceId: ""` line
6. Flip `ready: false` → `ready: true` on that same product
7. Commit: `git commit -m "Activate <product-slug> with live Stripe price ID"`

| Slug in regulations.ts | Stripe Product Name | Price (one-time) | Statement descriptor suffix (≤22 chars) | Description for Stripe |
|---|---|---|---|---|
| `texas-traiga` | Texas TRAIGA (HB 149) AI Compliance | $299.00 USD | `TEXAS TRAIGA` | 7-document compliance package for Texas HB 149 (Responsible AI Governance Act). Built from enrolled statute text. Covers developer and deployer obligations. NIST AI 600-1 safe harbor framework. Instant PDF download. |
| `education-k12-ai` | K-12 Education AI Compliance Package | $397.00 USD | `K12 ED AI` | 7-document AI compliance package for K-12 districts and EdTech. FERPA + amended COPPA (April 2026 deadline) + SOPIPA. Student data AI use policy, parent notification templates, vendor privacy assessments. Instant download. |
| `hr-recruiting-ai` | HR & Recruiting AI Compliance Bundle | $697.00 USD | `HR AI BUNDLE` | 10-document AI compliance bundle consolidating EEOC, NYC LL144, Illinois HB3773, and Colorado SB205 requirements into one HR-focused program. Multi-jurisdiction bias audit template, candidate notifications, appeals documentation. Instant download. |
| `vibe-coding-security-checklist` | Vibe Coding Security Compliance Checklist | $149.00 USD | `VIBE SECURITY` | Security audit checklist for AI-generated code. 10 critical rules: CORS, redirects, storage access, webhook verification, server permissions, dependency hygiene, rate limiting, error handling, sessions, debug cleanup. Each rule includes a problem statement, business impact, fix prompt, and verification step. |

**Notes:**
- Price should be **One-time**, not subscription.
- Tax behavior: let Stripe decide (inclusive vs exclusive doesn't matter if tax is not collected).
- Leave the statement descriptor prefix alone — it was set at the account level during the original Stripe setup.
- After all 4 are created, `ready: false` should no longer appear anywhere in `src/data/regulations.ts`.

---

## 2 — Turn On Google Ads ($5/day Colorado)

**Prereqs (already done):** Google Ads account created. Billing attached. Colorado geo targeting available.

### Steps in Google Ads UI

1. **Campaigns → + → New campaign**
2. **Objective:** Website traffic
3. **Campaign type:** Search
4. **Campaign settings:**
   - Campaign name: `AI Compliance Colorado SB24-205`
   - Networks: Search Network ONLY (uncheck Display Network, Search Partners)
   - Locations: `Colorado, United States` (state-level, not "within Colorado")
   - Languages: English
   - Audience segments: skip
5. **Budget and bidding:**
   - Daily budget: **$5.00**
   - Bidding: `Maximize clicks` (for week 1 — switch to `Target CPA` once you have 30 conversions)
6. **Keywords — add these with match types as shown:**

| Keyword | Match type |
|---|---|
| `colorado ai compliance` | Phrase match |
| `colorado ai law` | Phrase match |
| `colorado sb24-205` | Phrase match |
| `colorado ai act compliance` | Phrase match |
| `colorado ai deployer requirements` | Phrase match |
| `colorado ai impact assessment template` | Phrase match |
| `"colorado sb 24-205 compliance"` | Exact match |
| `"colorado ai act documents"` | Exact match |
| `"sb 24-205 deployer documents"` | Exact match |

7. **Ads — create one Responsive Search Ad:**

   **Headlines (add all 10 — Google picks best combos):**
   - Colorado AI Act Compliance
   - SB 24-205 Documents Ready
   - All 8 Required Documents
   - Built from the Enacted Statute
   - Deadline: June 30, 2026
   - Instant PDF Download
   - Featured in National Law Review
   - Statute-Backed Templates
   - One-Time Purchase, $449
   - No Subscription, No Law Firm

   **Descriptions (add all 4):**
   - All 8 documents required under Colorado SB 24-205. Built directly from the enacted statute text — not summaries. Instant PDF download, $449.
   - Risk management policy, impact assessment, consumer notices, and 5 more. Statute-backed. Attorney-review ready. One-time purchase.
   - Featured in the National Law Review. Colorado AI Act compliance documents, built from the primary source. Deadline: June 30, 2026.
   - Every citation verified against leg.colorado.gov. No legal advice — compliance templates your attorney can finalize in a fraction of the time.

   **Final URL:** `https://aicompliancedocuments.com/colorado-ai-compliance`
   **Display path:** `/colorado-ai-compliance`

8. **Sitelink extensions (4 suggested):**
   - About Our Methodology → `/about`
   - All AI Compliance Products → `/products`
   - Colorado 91-Day Deadline Blog → `/blog/colorado-ai-law-91-days-deadline-requirements`
   - Contact Us → `/contact`

9. **Review + Publish.**

---

## 2b — Texas TRAIGA Campaign (run in parallel with Colorado)

Texas HB 149 (TRAIGA) is already in effect (Jan 1, 2026). 4 months of enforcement live → high purchase intent. Run this as a SECOND campaign so each has its own budget and conversion tracking.

### Steps in Google Ads UI

1. Same flow as Colorado, but:
   - Campaign name: `AI Compliance Texas TRAIGA HB149`
   - Locations: `Texas, United States` (state-level)
   - Daily budget: **$5.00**
   - Same bidding strategy: `Maximize clicks`

2. **Keywords:**

| Keyword | Match type |
|---|---|
| `texas ai law compliance` | Phrase match |
| `texas traiga compliance` | Phrase match |
| `texas hb 149 ai compliance` | Phrase match |
| `texas ai governance act` | Phrase match |
| `texas ai compliance template` | Phrase match |
| `texas responsible ai governance` | Phrase match |
| `nist ai 600-1 safe harbor texas` | Phrase match |
| `"texas traiga compliance documents"` | Exact match |
| `"texas hb 149 deployer documents"` | Exact match |

3. **Responsive Search Ad:**

   **Headlines (10):**
   - Texas TRAIGA Compliance Now
   - HB 149 Deployer Documents
   - All 7 Required Documents
   - Built from Enrolled Statute Text
   - In Effect: January 1, 2026
   - Up to $200,000 Per Violation
   - NIST AI 600-1 Safe Harbor
   - One-Time Purchase, $299
   - No Subscription, No Law Firm
   - Featured in National Law Review

   **Descriptions (4):**
   - Texas HB 149 (TRAIGA) is in effect. 7 compliance documents covering developer + deployer obligations. NIST AI 600-1 safe harbor framework. $299, instant download.
   - Penalties up to $200,000 per uncurable violation. Built directly from the enrolled statute text on capitol.texas.gov. No high-risk carveout, no size exemption.
   - Featured in the National Law Review. Texas TRAIGA compliance documents from the primary source — every citation verified against the enrolled bill.
   - 60-day cure period before AG enforcement. Get the documents your attorney can finalize in a fraction of the time. One-time purchase, no subscription.

   **Final URL:** `https://aicompliancedocuments.com/texas-ai-compliance`
   **Display path:** `/texas-ai-compliance`

4. **Sitelink extensions (4):**
   - About Our Methodology → `/about`
   - Texas TRAIGA Product Page → `/products/texas-traiga`
   - Texas TRAIGA Compliance Guide → `/blog/texas-traiga-hb149-ai-law-compliance-guide`
   - All AI Compliance Products → `/products`

5. Review + Publish.

**Combined daily spend:** $10/day ($5 Colorado + $5 Texas). At $299–$449 product prices, you need ~1 sale per month per campaign to be net-positive at a 5% conversion rate.

---

### After launch

- **Day 3:** Check CTR. If >2%, you're in the healthy range. If <1%, pause and review which keywords are burning budget.
- **Day 7:** Pull the GSC summary to compare paid vs organic (see step 4 below).
- **Week 2:** If any single keyword has driven ≥1 conversion, bump its bid up 20%. If any keyword has had 20+ clicks and 0 conversions, pause it.

---

## 3 — ~~Verify CA ADMT Date + FRIA Kit Scope~~ ✅ DONE 2026-04-23

Both completed in-session. Summary:

- **CA ADMT:** Regulations effective Jan 1, 2026 with staggered compliance deadlines. ADMT opt-out Jan 1, 2027 dates on the site are accurate — no change needed.
- **FRIA Kit:** Browser Claude caught that the previous product description listed the wrong Annex III points. Real scope per Art. 27(1): (a) public bodies, (b) private entities providing public services, (c) credit scoring deployers (Annex III 5(b)), (d) life/health insurance risk deployers (Annex III 5(c)). Description fixed in `src/data/regulations.ts` and `src/app/review-addons-x7k9m/page.tsx`.

---

## 4 — Measure Results After ~7 Days

Once the meta-description rewrites have been re-crawled by Google, measure CTR lift.

**Run in any terminal:**

```bash
python C:/Users/baenb/.claude/scripts/gsc.py summary aicompliancedocuments.com --days 7
python C:/Users/baenb/.claude/scripts/gsc.py queries aicompliancedocuments.com --days 7 --limit 20
python C:/Users/baenb/.claude/scripts/gsc.py pages aicompliancedocuments.com --days 7 --limit 15
```

**Baseline (90-day snapshot, 2026-01-22 → 2026-04-21):**
- 13,890 impressions
- 27 clicks
- 0.19% CTR
- Avg position 8.33

**Success signal:** CTR on the 6 rewritten blog posts lifts from ~0.2% toward 1%+. Ranking position won't move from this — the bet is purely CTR.

---

## 5 — Strategic Nice-to-Haves (Do Later)

- **Upstash Redis** — in-memory rate limiter is bypassable at scale. Needs swap before heavy ad spend. Not urgent at $5/day.
- **Google Merchant Center** — blocked until DBA processes (per HANDOFF)
- **IAPP Vendor Marketplace** — highest-credibility third-party listing for this exact buyer
- **First customer testimonial** — email each first buyer asking for a one-sentence quote

---

*Single source of truth for the launch sequence. Delete items as they ship. Session context: 2026-04-23 audit session by Opus 4.7.*
