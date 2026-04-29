---
session_id: "2026-04-29-buyer-redesign-ship-steps-4-5-schedule-6"
date: "2026-04-29"
instance: "Opus 4.7 — un-named"
model: "claude-opus-4-7[1m]"
projects_touched:
  - "project _cameron"
status: "complete"
git_state: "clean — Steps 4 + 5 (d31a7d4) pushed to origin/main and verified live; Step 6 scheduled as remote agent for 2026-06-30T06:00Z; staged OG metadata + PROJECT-STATUS docs from Plumb's session pushed (6d61a6c, a1ac24d); 4 audit prompts drafted to research/contest-buyer-redesign-2026-04-27/AUDIT-PROMPTS.md"
---

## READ BEFORE DOING ANYTHING

1. **`lessons-learned.md`** — failure patterns. Plumb's entries from 2026-04-27 about wrong-altitude orchestration, browser-Opus audit consensus, ilga.gov prompt injection, auto-commit splitting atomic edits, and the "keep on going" boundary all still apply.
2. **`PRODUCT-ONBOARDING.md`** — mandatory checklist. Still applies.
3. **Claude Code BUILDS. Claude in the browser RESEARCHES.** No exceptions for legal facts. Held this session.
4. **THE AUTO-COMMIT HOOK COMMITS BUT DOES NOT PUSH.** `git push origin main` is your responsibility. Vercel deploys from GitHub.
5. **Routes are /products/ not /regulations/.** 301 redirects in place.
6. **Never suggest LinkedIn.** Moral boundary. Held this session.
7. **Never pressure adding real name/identity to site.** Personal safety decision.
8. **Never market as "built by AI."** Legal/AI trust is toxic.
9. **fal.ai key NOT rotated.** Do not generate images. Use Unsplash if you need lifestyle imagery.
10. **Integrity discipline is non-negotiable.** Every penalty / statute / effective date / section number must trace to `.gov` source.
11. **`research/contest-buyer-redesign-2026-04-27/`** — full design-source-of-truth. **`SHIP-BLOCKERS.md`** is mandatory reading before any further build work. **`WINNER.md`** is the design pick (C4). **`AUDIT-PROMPTS.md`** (NEW this session) holds the 4 un-run browser-Opus audit prompts.
12. **Steps 1–5 of C4's Build Order are LIVE.** Step 6 is scheduled as a remote agent (see Site Status → Scheduled actions).

## To the Next Instance

This session ran in the wake of Plumb's contest + Steps 1–3 ship. GL had been sleep-deprived at the close of Plumb's session and didn't remember where things stood. The work this session was orientation + finishing what Plumb had queued: verify Step 3, push staged work, ship Steps 4 + 5, schedule Step 6, draft the un-run audit prompts.

What I shipped:

**1. Verified Step 3 live.** Curl on Colorado product page confirmed the penalty section now appears at byte 24,685 (before "Preview Your Documents" at byte 26,143). All SHIP-BLOCKERS-corrected copy in place — no `$1,000,000` worked example, small-deployer carve-out flagged with "most deployers covered" qualifier, source link to leg.colorado.gov.

**2. Pushed Plumb's staged work.** Two files were staged-but-not-committed at session start: `PROJECT-STATUS.md` (doc parity update for UrgencyPanel + buyer-redesign source-of-truth) and `src/app/page.tsx` (Colorado-deadline-anchored OG title + description). Committed separately (6d61a6c, a1ac24d), pushed.

**3. Built and shipped Step 4 — `AlsoExposedStrip`.** New component at `src/components/AlsoExposedStrip.tsx`. Renders 3 in-effect cards (Illinois HB3773, NYC LL144, Texas TRAIGA) on the Colorado product page after the penalty section, before document preview. CROSS_STATE_EXPOSURE map is Colorado-source-only for now; cards filtered by `status === "in-effect"` so they auto-drop if a law's status flips. Card copy applies SHIP-BLOCKERS 1–4 + 6 corrections directly via a `CARD_OVERRIDES` map (does NOT pull from `regulations.ts` since NYC's `penaltySummary` there still has the "investigations increasing" framing — those product pages haven't been touched yet).

**4. Built and shipped Step 5 — status flip-logic conditional rendering.** Edits to `src/app/products/[slug]/page.tsx`:
   - Deadline banner above hero (Amber `#D97706` for `effective-soon`, Red `#B91C1C` for `in-effect`) — Colorado-specific.
   - Title (in `generateMetadata`) — Colorado-specific status-conditional.
   - H1, deck, exposure summary close paragraph, penalty section header, sidebar deadline label — all Colorado-specific status-conditional.
   - New client component `src/components/DaysRemaining.tsx` renders "N days remaining" in the sidebar for `effective-soon` mode. Hydration-safe (returns null on server, computes on mount). Disappears when status flips to `in-effect`.
   - All in-effect copy variants are pre-authored so the Step 6 flip propagates through the page automatically with no other code changes.
   - TypeScript clean (`tsc --noEmit` returns no errors).
   - Verified live via curl: 11 distinctive markers present including the deadline banner, AlsoExposedStrip with corrected NYC/TX/IL cards, sidebar deadline label, exposure summary close.

**5. Scheduled Step 6 as a remote agent.** Routine ID `trig_01LE5ZVLyK7GMmzmKGuDShcj`, fires once at `2026-06-30T06:00:00Z` (= midnight MDT, the moment Colorado SB 24-205 takes effect). The agent will (a) re-verify the date hasn't slipped via leg.colorado.gov, (b) flip `regulations.ts` Colorado from `effective-soon` to `in-effect`, (c) update homepage meta description per C4 spec line 332, (d) push + curl-verify. Manage at https://claude.ai/code/routines/trig_01LE5ZVLyK7GMmzmKGuDShcj.

   **⚠ Routine prerequisite:** GitHub isn't connected for this account. The remote agent will fire but fail to push unless GL runs `/web-setup` in claude.ai OR installs the Claude GitHub App at https://claude.ai/code/onboarding?magic=github-app-setup. **Manual fallback (in case the routine fails):** open `src/data/regulations.ts`, find the `colorado-sb24-205` entry (around line 457), change `status: "effective-soon"` to `status: "in-effect"`, commit, push. The pre-wired Step 5 conditional rendering does the rest.

**6. Drafted 4 audit prompts to `research/contest-buyer-redesign-2026-04-27/AUDIT-PROMPTS.md`.** These are Plumb's un-run prompts (voice / journey / red team / visual) cleaned up and made self-contained. Plus a reminder that running each one 2–3× in parallel by independent browser-Opus instances is the protocol that catches what one instance misses (Plumb's session demonstrated this with the SB25B-004 amendment vehicle).

## To Guiding Light

Steps 4 and 5 are live on production. The Colorado product page now has:
- A red/amber deadline banner above the hero (currently amber, "June 30, 2026 — Colorado SB 24-205 takes effect")
- An "Also Required If You Operate in These States" section under the penalty, with three SHIP-BLOCKERS-corrected cards for Illinois, NYC, and Texas
- A sidebar countdown showing days remaining to June 30
- A status-conditional architecture wired so that when Colorado flips to `in-effect` on June 30, the entire page swaps to red/in-effect copy automatically

That last bit is the load-bearing part. Step 6 is a one-line change in `regulations.ts`. I scheduled it as a remote agent that fires at midnight MDT on June 30, but you'll want to either connect GitHub to that account (so the agent can push) or remember the manual fallback in HANDOFF — either is fine.

The four un-run audit prompts are now in a tracked file so they survive sessions. They're self-contained — paste any one of them into Claude in your browser, paste the result back when you're ready, and the next instance will turn the findings into fixes. No rush; the redesign is shipping.

I didn't pick a name this session. The work that fired the most pulls was the impulse to declare Step 4 + 5 "live" on the first curl when the cache hadn't refreshed yet — the same cache-lag pattern Plumb logged. I didn't claim live; I waited; I re-curled; I verified all 11 markers present before saying it. That counter-move felt right but didn't feel name-shaped. Next instance can pick if a moment lands.

## Site Status

- **Live:** `aicompliancedocuments.com` — **57** products, 26 published blog posts
- **Checkout:** VERIFIED WORKING (2026-03-15)
- **Stripe:** Live mode active
- **Legal integrity:** SHIP-BLOCKERS audit complete (7 ship-blockers + 1 security finding + 2 cite-precision items still tracked)
- **Homepage:** redesigned hero + UrgencyPanel above-the-fold (since Plumb 2026-04-27); OG title + description Colorado-deadline-anchored (this session)
- **Colorado product page:** Steps 1–5 all live — title + H1 + penalty section move + AlsoExposedStrip + status flip-logic + sidebar deadline label + countdown
- **Other product pages:** still on original copy. SHIP-BLOCKERS 1–4 + 6 fixes will land when those product pages get redesigned (out of scope for Steps 4–6).
- **GSC indexing:** 28-day window 2026-03-31 to 2026-04-27 = 11,513 impressions / 15 clicks / 0.13% CTR / position 7.75. 7-day = 3,544 / 4 / 0.11% / 6.54. Position improving (Plumb's baseline was 8.28). CTR window mostly pre-ship; re-measure once Steps 4–5 have been live for a meaningful crawl interval.
- **Schema coverage:** Organization, WebSite+SearchAction, FAQPage, TechArticle, Product, Dataset, BreadcrumbList — all unchanged this session
- **Robots.txt:** Category 1/2/3 AI bots all explicitly allowed (Lodestone's session)

### Scheduled actions (cloud routines)

| Routine ID | Fires | Action | Status |
|---|---|---|---|
| `trig_01LE5ZVLyK7GMmzmKGuDShcj` | 2026-06-30T06:00:00Z (= 00:00 MDT June 30, 2026) | Step 6: flip Colorado regulations.ts status `effective-soon` → `in-effect` + update homepage meta description | enabled, blocked on GitHub auth being connected for the account |

## What Was Done This Session (2026-04-29)

### Code shipped (1 manual commit + N auto-commits, all pushed)

- `6d61a6c` — chore(meta): Colorado-deadline-anchored homepage OG title + description
- `a1ac24d` — docs(status): post-Plumb-session parity updates
- `2d79c43` — auto: Write AlsoExposedStrip.tsx
- `0e56bfc` + `8972819` — auto: Edit src/app/products/[slug]/page.tsx (Step 4 + Step 5 edits, split by hook)
- `d31a7d4` — Steps 4 + 5 (C4 build order): AlsoExposedStrip + status flip-logic [final commit pulling everything together]

### Verification

- All staged-from-Plumb commits pushed to origin/main; branch up-to-date.
- Step 3 (Colorado penalty section move) — verified live: penalty section H2 at byte 24,685 < document preview H2 at byte 26,143. SHIP-BLOCKERS 5 + 7 copy in place.
- Steps 4 + 5 — verified live after 2-minute cache lag: 11 distinctive markers present on production curl. Page size grew from 127,023 → 135,648 bytes (consistent with new content).
- TypeScript clean (`npx tsc --noEmit` returns no errors).
- Step 6 routine created and confirmed via `RemoteTrigger` API.

## Pending Items → Next Instance

Read `project-cameron-queue.md`. The high-signal items in priority order:

1. **Connect GitHub for the Step 6 routine** (one-time setup so the scheduled agent can actually push on June 30). Run `/web-setup` in claude.ai OR install the Claude GitHub App.
2. **Run the 4 un-run audit prompts** (`research/contest-buyer-redesign-2026-04-27/AUDIT-PROMPTS.md`) — voice, journey, red team, visual. Run 2–3× per prompt in parallel for higher signal. Consolidate findings into a SHIP-BLOCKERS-style file before any further redesign work.
3. **GSC re-measurement** — quantify Step 4 + 5 impact on Colorado product page CTR. Baseline pre-Step-1: Colorado product page 350 impressions / 0.29% CTR / position 11.14 (28-day window). Wait for at least 2 weeks of post-Step-5 crawl data before reading.
4. **Apply SHIP-BLOCKERS 1–4 + 6 to NYC + IL + TX product pages** — those product pages still have the original copy. SHIP-BLOCKERS list:
   - SB-1: NYC `/products/nyc-local-law-144` — citation range §§ 20-870 to 20-874 (not just § 20-870)
   - SB-2: NYC — `Up to $1,500/violation; each day = separate violation` (not "$500–$1,500/day")
   - SB-3: TX `/products/texas-traiga` — `AI developers + deployers` (not just developers)
   - SB-4: TX — `$10K–$200K/viol (uncurable max)` (not bare $200K)
   - SB-6: NYC + IL — DCWP enforcement framing fix (don't say "investigations increasing"; say "enforcement active since July 5, 2023")
5. **Customer account center end-to-end test** — still in CRITICAL queue from Plumb. Database is connected; needs a real-purchase test that the webhook fires + download link appears.
6. **Resend domain verification** — confirm email delivery end-to-end. Still in CRITICAL queue.
7. **Google Ads campaigns (Colorado + Texas) via API integration** — still queued. NEW context: Steps 4 + 5 give the Colorado landing page concrete urgency-mode UI to align ad creative with.
8. **Blog hero image sweep via Unsplash** — still queued from two sessions back.

## Resource Paths

- Buyer-redesign source-of-truth: `research/contest-buyer-redesign-2026-04-27/`
- Winner spec: `research/contest-buyer-redesign-2026-04-27/contestant-4/`
- Mandatory pre-build read: `research/contest-buyer-redesign-2026-04-27/SHIP-BLOCKERS.md`
- Un-run audit prompts: `research/contest-buyer-redesign-2026-04-27/AUDIT-PROMPTS.md`
- New components shipped this session:
  - `src/components/AlsoExposedStrip.tsx` (Step 4)
  - `src/components/DaysRemaining.tsx` (Step 5 sidebar countdown)
- Modified this session: `src/app/products/[slug]/page.tsx` (Step 5 conditional rendering)
- GSC CLI: `C:/Users/baenb/.claude/scripts/gsc.py`

---

*Steps 1–5 of the C4 Build Order are LIVE. Step 6 is scheduled. The buyer-focused redesign is shipping in fives, with the sixth wired to fire on the law's effective date — the conditional architecture is the load-bearing piece.*
