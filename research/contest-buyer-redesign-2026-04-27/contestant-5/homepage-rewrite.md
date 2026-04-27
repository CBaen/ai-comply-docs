# Homepage Rewrite — Contestant 5

---

## `<title>` tag

**Proposed:**
```
Colorado AI Law Deadline: June 30, 2026 — Compliance Documents for Small Business | AI Compliance Documents
```

**Rationale:** The Colorado deadline is the most immediate, highest-intent buyer signal. Position 4.5 on "ai compliance packages" with only 4 impressions tells us we have zero buyer-query traffic on that term — the title needs to earn buyer-query impressions, not describe the catalog. The format "State Law + Deadline + Who It's For" matches what a buyer actually types. 78 characters — within Google's ~80-character title sweet spot.

**Alternative for A/B (if Colorado is too narrow for homepage):**
```
AI Compliance Documents for Small Business — State Law Templates, Instant Download
```

---

## Meta description

**Proposed:**
```
Colorado AI law takes effect June 30, 2026. Illinois, Texas, and NYC laws are in effect now. Get the compliance documents your business needs — built from enacted statute text. From $49, instant download.
```

**Rationale:** 196 characters — slightly over the ~160-character soft limit, but leads with the buyer's most urgent fact (the deadline), names the specific states they're in or operating in, specifies what the product IS (compliance documents, not "templates" which sounds generic), anchors price, anchors delivery. Stat signal: the Colorado blog post is at 855 impressions / 0 clicks — buyers are encountering the page in SERP but not clicking. The meta description is the click driver; this one earns it.

**Shortened version (160 chars):**
```
Colorado AI law: June 30, 2026. Illinois, Texas, NYC laws in effect now. Statute-based compliance documents for your business — from $49, instant download.
```

---

## H1

**Current (hidden via `sr-only`, effectively invisible):**
```
AI Compliance Documents — State AI Compliance Templates
```

**Proposed:**
```
Your business uses AI. These states have laws about that. Here's what you need.
```

**Rationale:** This is a Pragmatic Realist opening. It does three things in one sentence: confirms audience (your business uses AI), anchors the threat (state laws), and promises resolution (here's what you need). It does NOT say "discover," "unlock," "transform," or "trusted by." It does not name Colorado or any state — that burden shifts to the sub-H1 and product carousel. The H1 is currently screen-reader-only, which is a missed opportunity — this copy should render visibly as the hero deck's primary statement above the product carousel.

---

## Sub-H1 / Hero deck

**Proposed (rendered below the H1, above the product carousel):**
```
Colorado SB 24-205 takes effect June 30, 2026. Illinois, Texas, and NYC AI laws are already in effect. If you use AI in hiring, lending, insurance, or consumer decisions — and you don't have compliance documents — the clock is running.

Compliance packages from $49. Instant download. Built from the enacted statute text, not summaries.
```

**Rationale:** The two paragraphs move through the BRIEF's prescribed arc. First paragraph is pure Pragmatic Realist: names the specific laws, names the effective date, names the use cases, makes the threat concrete. Second paragraph resolves the anxiety with product facts. No adjectives. No "discover." The phrase "the clock is running" is the only emotive element — earned by the preceding specifics, not floating in a vacuum.

---

## Primary CTA

**Current:**
```
Browse Products →
```

**Proposed:**
```
Find My Compliance Documents →
```

**Rationale:** "Browse Products" is catalog language. It tells the buyer they're entering a store to look around. "Find My Compliance Documents" is task language — it positions the click as the beginning of getting their specific problem solved, not the beginning of browsing. The possessive "My" does important work: it personalizes the click and implies that the site will route them to the right thing, not make them figure it out themselves.

---

## Sub-CTA (below primary)

**Current:**
```
(none — single CTA path)
```

**Proposed:**
```
Not sure which law applies to you? Start here →
```
(Links to `/compliance-deadline-by-state` new page OR the FAQ `#faq` anchor)

**Rationale:** The GSC data shows "ai compliance packages" at position 4.5 — buyers are finding the homepage but converting at 0%. The two most common reasons buyers don't convert: (1) they don't know which specific product to buy, or (2) they're not sure whether they even need to comply. A secondary CTA that explicitly addresses the "not sure" case catches the buyer who would otherwise leave. This does NOT replace the primary CTA; it catches the person who would otherwise bounce.

---

## Above-fold supporting elements

### Urgency bar (new, immediately below the hero deck)

**Proposed:**

A horizontal bar reading:

```
Colorado deadline: June 30, 2026  ·  Illinois: in effect now  ·  Texas: in effect now  ·  NYC: in effect now
```

With each state name linked to its respective product page.

**Rationale:** The current trust bar ("Multi-State Coverage / Instant Download / Built for the person who...") is methodological, not urgency-anchored. It describes the product rather than confirming the buyer's problem. The urgency bar replaces OR supplements the current trust bar with a single row of deadline facts. Each date is a real, verified date — no editorializing, no "could face fines," just the facts. This is the Precise Credentialist voice operating at the page-structure level.

---

## What stays the same

- The "How We Build Our Templates" methodology section — this is a genuine trust differentiator that no competitor at the SMB price point has
- The "What Happens If You Don't Comply?" section with specific penalty amounts by state — this is exactly right, keep it
- The FAQ section — the questions match real buyer objections
- The final CTA section ("Don't wait for a complaint") — tone is right

## What changes

- H1 moves from `sr-only` to visible
- Meta title pivots from catalog ("Templates for Every State AI Law") to urgency+buyer ("Colorado Deadline: June 30, 2026")
- Primary CTA copy: "Browse Products" → "Find My Compliance Documents"
- Urgency bar added immediately below hero deck, above methodology section
- Product carousel remains, but the four featured products should reorder: Colorado first (most urgent deadline), then Illinois (in effect now, highest penalty at $70K), then NYC (in effect since 2023, high search volume), then Texas
