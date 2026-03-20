# Browser Claude Research Prompts — March 20, 2026

**Purpose:** Verified research for the Colorado SB 24-205 landing page and blog strategy.
**Rule:** Every fact must come from a .gov or primary source visited by the browser instance. No training data.
**Process:** Run prompts 1-4 first. Then run prompts 5-7 to cross-verify.

---

## PHASE 1: Primary Research

---

### Prompt 1: Verify Colorado SB 24-205 Statute Facts

```
I need you to visit these URLs and extract verified facts for a marketing landing page for aicompliancedocuments.com.

1. Visit https://leg.colorado.gov/bills/sb24-205 — confirm:
   - Current effective date (should be June 30, 2026 — was delayed from Feb 1, 2026 via SB 25B-004)
   - Bill status and signing date
   - Any amendments or new legislation since August 2025

2. Visit the enrolled bill PDF (linked from that page) — extract:
   - Exact definition of "high-risk AI system" (section and wording)
   - Exact definition of "consequential decision" and all listed domains
   - Every deployer obligation with section numbers
   - Every developer obligation with section numbers
   - The affirmative defense provision (exact language about NIST AI RMF)
   - Any size thresholds or exemptions (employees, revenue, insurance, financial)
   - The 90-day AG disclosure requirement details
   - Consumer rights (appeal, data correction, notification timing)

3. Visit https://www.coloradoattorneygeneral.gov — search for any SB 24-205 enforcement guidance, rulemaking notices, or compliance resources published since January 2026

4. Visit https://coag.gov/resources/colorado-artificial-intelligence-act/ if it exists — check for any AG-published compliance guides or rulemaking updates

For EVERY fact you extract, format it as:
- FACT: [the fact]
- CITATION: [exact statutory section, e.g., C.R.S. section 6-1-1703(4)(a)]
- SOURCE URL: [the URL you found it at]
- QUOTE: [exact language from the statute if available]

I need this for a compliance document product page. Accuracy is legally critical — do not use training data. Only report what you can see on the actual pages you visit.
```

---

### Prompt 2: Micro-Facts for "Did You Know?" Sidebar

```
I need 8-10 short, sourced micro-facts about Colorado SB 24-205 for a "Did You Know?" sidebar on a landing page at aicompliancedocuments.com. Each fact should be 1-2 sentences, surprising or attention-grabbing, and traced to a primary source you actually visit.

Visit these pages and find interesting facts:
- https://leg.colorado.gov/bills/sb24-205 (the bill page and enrolled PDF)
- https://www.nist.gov/artificial-intelligence (NIST AI page)
- https://airc.nist.gov/AI_RMF_Knowledge_Base (NIST AI RMF)
- https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation (state AI law tracker)

For each fact, format EXACTLY like this (this is a JSON-compatible format for our blog system):
- fact: "One surprising sentence about SB 24-205 or AI compliance"
- source: "Name of source (e.g., Colorado General Assembly)"
- sourceUrl: "https://exact-url-you-found-it-at"

Topics to find facts about:
- Penalty amounts and who enforces them
- How many states have AI compliance laws now
- The NIST AI RMF affirmative defense angle (following NIST = legal protection)
- Whether the law has a private right of action (it doesn't — only AG enforcement)
- Insurance and financial institution exemptions
- The 90-day AG disclosure window for discovered discrimination
- What "high-risk" actually means in the statute
- How Colorado compares to the EU AI Act
- Developer vs. deployer distinction
- The consumer notification requirement (BEFORE or AT TIME of decision)

Do NOT use training knowledge. Only facts you can verify on the actual pages you visit. If you cannot find a fact on the page, say so — do not guess.
```

---

### Prompt 3: Deep Dive Sidebar Content

```
I need a "Deep Dive" sidebar piece (300-400 words) for a landing page about Colorado SB 24-205 on aicompliancedocuments.com. This goes in the left sidebar and provides deeper context.

Visit https://leg.colorado.gov/bills/sb24-205 and the enrolled bill PDF, then write a plain-language explanation covering:

- Why Colorado passed this (what problem it solves)
- What the "affirmative defense" actually means in practice — if you follow NIST AI RMF, what legal protection do you get? Be specific about the statutory language.
- The developer vs. deployer distinction and why it matters for buying compliance docs
- What happens if you discover your AI system discriminated (the 90-day clock and AG notification)
- How this connects to the broader wave of state AI regulation

Write in a tone that is:
- Authoritative but accessible — explaining to a smart business owner, not a lawyer
- Direct and slightly dry — no exclamation points, no hype
- Cite section numbers inline (e.g., "per section 6-1-1703(4)")

Format as plain text paragraphs. No markdown headers. This renders in a narrow 240px sidebar column, so sentences should be relatively short.

Every claim must trace to something you actually read on the .gov page. If you're unsure about a fact, flag it rather than guessing.
```

---

### Prompt 4: Blog Content Gap Research

```
I run aicompliancedocuments.com and have 12 blog posts covering: Colorado SB 24-205, California CCPA ADMT, Illinois HB3773, Connecticut CTDPA, Virginia CDPA, EU AI Act, HIPAA + AI, ISO 42001, AI bias audits, penalties by state, compliance costs for small business, and AI hiring software compliance.

I need you to research what blog content I'm MISSING that would drive search traffic. Visit these pages:

1. https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation — what state AI laws exist that I haven't covered? List every state with enacted AI legislation.

2. https://iapp.org — what are the current hot topics in AI privacy and compliance? What are practitioners talking about?

3. Google "AI compliance 2026" and "AI governance requirements" — what questions are people asking that I could answer?

4. https://www.eeoc.gov/artificial-intelligence — any new EEOC guidance on AI in employment?

5. https://www.ftc.gov/business-guidance/blog — any recent FTC enforcement actions or guidance on AI?

Based on what you find, suggest 5 blog post topics that:
- Target keywords people are actually searching for RIGHT NOW
- Cover laws or topics my 12 posts don't address yet
- Have a deadline or urgency angle (enforcement date approaching)
- Would naturally link to products I sell (state compliance packages, bias audit templates, governance frameworks)

For each suggestion, give me:
- Proposed title (in the style of "Illinois HB3773 Is Live" — direct, factual)
- Primary target keyword
- Why this matters now (what deadline or enforcement event is driving urgency)
- Which of my existing products it would link to
- What .gov sources to cite (with URLs you actually visited)
- 3 micro-facts you found that could go in the "Did You Know?" sidebar
```

---

## PHASE 2: Cross-Verification

Run these AFTER getting results from Prompts 1-4. Paste the relevant outputs in.

---

### Prompt 5: Cross-Verify Statute Facts (against Prompt 1 results)

```
I had another researcher extract facts from Colorado SB 24-205. I need you to independently verify each claim by visiting the primary sources yourself. Do NOT trust the claims below — check each one against what you actually see.

Visit:
- https://leg.colorado.gov/bills/sb24-205
- The enrolled bill PDF linked from that page
- https://www.coloradoattorneygeneral.gov (for any enforcement updates)

Here are the claims to verify (PASTE PROMPT 1 RESULTS HERE):

[paste results]

For EACH claim, respond with:
- CLAIM: [what was claimed]
- VERIFIED: Yes / No / Partially / Cannot verify
- WHAT I ACTUALLY FOUND: [what you see on the page]
- SOURCE: [URL you checked]
- DISCREPANCY: [if any — explain what's different]

Pay special attention to:
- Penalty amounts — are they from SB 24-205 itself or from the Colorado Consumer Protection Act (C.R.S. 6-1-112)?
- Effective date — has anything changed since the August 2025 delay?
- Exemptions — are insurance/financial exemptions full or conditional?
- The affirmative defense — does it require ONLY following NIST, or are there additional conditions?

Flag anything that's ambiguous or where the statute language could be read multiple ways.
```

---

### Prompt 6: Cross-Verify Micro-Facts (against Prompt 2 results)

```
I had another researcher compile micro-facts about Colorado SB 24-205 for a website sidebar. I need you to independently verify each fact and its source URL.

Visit each sourceUrl listed below and confirm:
1. The URL actually works and loads
2. The fact accurately represents what's on the page
3. The source name is correct

Here are the facts to verify (PASTE PROMPT 2 RESULTS HERE):

[paste results]

For each fact, respond with:
- FACT: [the original fact]
- SOURCE URL WORKS: Yes / No / Redirects to [where]
- FACT IS ACCURATE: Yes / No / Partially
- CORRECTION NEEDED: [if any]
- BETTER SOURCE: [if you found a more authoritative one]

Also flag if any fact could be misleading even if technically true (e.g., stating a penalty amount without mentioning it's per-violation, or citing an exemption without its conditions).
```

---

### Prompt 7: Cross-Verify Blog Gap Analysis (against Prompt 4 results)

```
I had another researcher suggest 5 blog post topics for aicompliancedocuments.com. I need you to verify:
1. The laws/regulations mentioned actually exist and are enacted (not just proposed)
2. The deadlines cited are correct
3. The topics aren't already covered by my existing 12 blog posts
4. The suggested .gov source URLs actually work

My existing blog posts cover: Colorado SB 24-205, California CCPA ADMT, Illinois HB3773, Connecticut CTDPA, Virginia CDPA, EU AI Act, HIPAA + AI, ISO 42001, AI bias audits, penalties by state, compliance costs, AI hiring software.

Here are the suggestions to verify (PASTE PROMPT 4 RESULTS HERE):

[paste results]

For each suggestion, respond with:
- TOPIC: [proposed topic]
- LAW EXISTS AND IS ENACTED: Yes / No / Proposed only
- DEADLINE CORRECT: Yes / No / [actual deadline]
- ALREADY COVERED: Yes / No / Partially (explain overlap)
- SOURCE URLS WORK: [check each one]
- VIABILITY SCORE: High / Medium / Low (based on search demand + urgency + product fit)
- RECOMMENDED CHANGE: [if any — different angle, different law, different framing]

Visit https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation to independently check which state laws are actually enacted vs. still in committee.
```

---

## How to Use This

1. Open Claude in the browser (claude.ai)
2. Run Prompts 1-4 one at a time, save each output
3. Run Prompts 5-7, pasting the relevant outputs where indicated
4. Bring verified results back to Claude Code for landing page and blog implementation
5. Any discrepancies between Phase 1 and Phase 2 = DO NOT USE until resolved

Every fact on the landing page and in blog posts must survive dual verification.
