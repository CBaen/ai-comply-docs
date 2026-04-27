# New Page Spec — /compliance-deadline-tracker

## Strategic Rationale

The GSC data shows the site ranks for researcher queries ("ai governance standards," "ai compliance framework") at positions 80-96 — deep in no-click territory. These queries get AI Overview capture. The site gets 10,000+ impressions per month from people who never click.

The one thing Google's AI Overviews need to cite a source: a page that directly answers the query with structured, verifiable, date-stamped facts.

"What are the AI compliance deadlines in 2026?" is a query that:
1. Has genuine search volume (confirmed by the 10,513 impressions the site gets from related queries)
2. Is not currently answered by a direct-answer page on the site — the blog posts cover individual laws, not the deadline landscape
3. Is exactly the format AI Overviews prefer to cite: a structured reference with statute dates

This page serves two simultaneous functions:
- **AI Overview citation bait:** Structured, authoritative, date-stamped deadlines in a format that AI answers can cite
- **Buyer qualifying tool:** A business owner who isn't sure which laws apply finds every active deadline on one page, then clicks to the relevant product

---

## Route

```
/compliance-deadline-tracker
```

Alternative slugs considered:
- `/ai-law-deadlines-2026` — more SEO-direct but ages out sooner
- `/state-ai-compliance-deadlines` — evergreen but less urgent

Recommended: `/compliance-deadline-tracker` — evergreen route that can be updated year over year, avoids the "2026" aging problem.

---

## Page Title and Meta

**`<title>`:**
```
AI Compliance Deadlines by State — 2026 Active Laws and Enforcement Status
```

**`<meta description>`:**
```
Colorado's deadline is June 30, 2026. NYC Local Law 144 is in full enforcement. Illinois HB3773 took effect January 1, 2026. See every active AI law deadline, penalty range, and compliance status — updated from primary .gov sources.
```

---

## Content Structure

### H1
```
AI Law Deadlines — What's Active, What's Coming, What You Owe
```

### Opening lede (Pragmatic Realist voice, ~100 words)
```
Fourteen states have enacted AI laws. Not all of them apply to you. But if you use AI in hiring, lending, insurance, healthcare, or consumer decisions, at least one of them probably does. This page lists every law currently in effect or with an imminent compliance deadline, what it requires, and who it covers. Click through to the law-specific page for documents and detailed requirements. If you're not sure where to start, start with your state.
```

### Deadline Table Section

**Format note:** The blog renderer doesn't support tables (per BLOG-STYLE-GUIDE.md), but this is a product/static page (not blog post) — it's rendered by a separate page component where standard HTML and Tailwind table components are supported.

Each state gets a card with:
- Status badge: IN EFFECT (red) / DEADLINE (amber with date) / PROPOSED (gray)
- Law name and citation (linked to .gov source)
- Effective date
- Who it covers (2-line max)
- Penalty cap
- Link: "Get Compliance Documents →" (to product page)

**Laws to include (verified against regulations.ts and live .gov sources):**

**IN EFFECT — Enforcement Active Now:**

NYC Local Law 144 (July 5, 2023)
- Covers: Employers in NYC using automated employment decision tools for hiring or promotion
- Penalty: Up to $1,500 per subsequent violation per day (NYC Admin. Code § 20-870 et seq.)
- Product: `/products/nyc-local-law-144`

Illinois HB3773 (January 1, 2026)
- Covers: Employers with employees in Illinois who use AI in employment decisions
- Penalty: Up to $70,000 per violation (775 ILCS 5/8A-104) — verified from primary source this session
- Product: `/products/illinois-hb3773`

Texas TRAIGA (January 1, 2026)
- Covers: Developers and deployers of high-risk AI systems — specific applicability thresholds apply
- Penalty: [REQUIRES LIVE PRIMARY SOURCE VERIFICATION before publishing — fetch from capitol.texas.gov]
- Product: `/products/texas-traiga` (when ready)

California CCPA/ADMT (In effect — verify current enforcement status via cppa.ca.gov)
- Covers: Businesses subject to CCPA using automated decision-making technology
- Penalty: [REQUIRES LIVE PRIMARY SOURCE VERIFICATION]
- Product: `/products/california-ccpa-admt`

**DEADLINE APPROACHING:**

Colorado SB 24-205 (June 30, 2026)
- Covers: Deployers of high-risk AI systems in consequential decisions (employment, lending, insurance, healthcare, housing, education)
- Penalty: Up to $20,000 per violation — Colorado Consumer Protection Act (verified live this session)
- Product: `/products/colorado-sb24-205`

**Note on pending verification:** Texas TRAIGA and California CCPA/ADMT penalty amounts are marked [REQUIRES LIVE PRIMARY SOURCE VERIFICATION] because I did not fetch them from .gov primary sources in this session. The build instance must verify via WebFetch from capitol.texas.gov and cppa.ca.gov before publishing. This page must NOT use training-data penalty figures.

---

### "How This Page Is Maintained" Section

Brief credentialist note:
```
Every date and penalty amount on this page is verified against the enacted statute text at the linked .gov source. We update this page when laws change. Last verified: April 2026.
```

**Rationale:** This section is what makes the page AI-Overview-citable. AI systems prefer sources that declare their verification methodology. This is also true for Perplexity and ChatGPT — they weight "sourced, dated, primary-source" pages higher in their citation logic.

---

### Bottom CTA

```
Not sure which law applies to your business? Start with your state.
[State selector or link list to all state product pages]
```

---

## Implementation Notes for Build Instance

**Route:** Add `/compliance-deadline-tracker/page.tsx` as a static page in the Next.js app.

**Data source:** Pull law data from `regulations.ts` for status badges, effective dates, penalty caps. The page should not hard-code any data that's already in `regulations.ts` — it should read from the source of truth.

**Maintenance trigger:** The page includes a "Last verified" date in the content. When any law's effective date passes, the status badge should auto-update from "DEADLINE" to "IN EFFECT" using the same date-comparison logic as the product page StatusBadge component.

**Internal links:** Every law entry links to the product page and to the relevant blog guide. This page becomes the hub that routes buyers to both editorial and purchase pages.

**Schema markup:** Add `FAQPage` schema listing each law as a question ("Is [State] AI law in effect?") with the enforcement status as the answer. This is the direct citation-optimization play for AI Overviews.

---

## Estimated Keyword Targets

This page targets:
- "ai compliance deadlines 2026"
- "state ai law status 2026"
- "which ai laws are in effect"
- "colorado illinois nyc ai law compliance deadline"

These are mid-funnel navigational queries where the buyer knows they need to comply with something but isn't sure which law applies. The page serves as a buyer qualifier that routes to product pages.

---

*This is contestant 3's single optional new page. It is both the AI Overview citation strategy and the buyer-qualification hub the site currently lacks.*
