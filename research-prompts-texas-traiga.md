# Browser Claude Research Prompts — Texas TRAIGA
# Created: 2026-03-20

**Purpose:** Verified research for a Texas TRAIGA blog post on aicompliancedocuments.com.
**Rule:** Every fact must come from a .gov or primary source visited by the browser instance. No training data.
**Process:** Run prompts 1-4 first. Then run prompts 5-7 to cross-verify.

---

## PHASE 1: Primary Research

---

### Prompt 1: Verify Texas TRAIGA Statute Facts

```
I need you to visit these URLs and extract verified facts for a blog post about the Texas Responsible AI Governance Act (TRAIGA) for aicompliancedocuments.com.

1. Visit https://capitol.texas.gov — search for "Responsible AI Governance Act" or "TRAIGA." Find the bill number and navigate to its official bill page. Confirm:
   - The exact bill number (e.g., HB XXXX or SB XXXX)
   - Current bill status (enrolled, signed, vetoed, in committee)
   - Governor signing date if applicable
   - Effective date (reportedly January 1, 2026 — verify this exactly)
   - Any amendments or companion bills

2. From the official bill text on that page, extract:
   - Exact definition of "high-risk artificial intelligence system" (section and wording)
   - Exact definition of "consequential decision" or equivalent term, and all listed domains
   - Who the law covers — exact thresholds for deployers and developers (employee count, revenue, or other size exemptions)
   - Every deployer obligation with section numbers
   - Every developer obligation with section numbers
   - Any affirmative defense provision (does it reference NIST AI RMF, ISO 42001, or another framework?)
   - All exemptions — by industry, size, use case, or entity type
   - Consumer rights — appeal, correction, notification timing
   - Penalty amounts — per violation, per day, maximums
   - Who enforces the law (Texas AG? A new agency? Both?)
   - Attorney General rulemaking authority — is the AG authorized to issue rules, and has rulemaking started?

3. Visit https://www.texasattorneygeneral.gov — search for any TRAIGA enforcement guidance, rulemaking notices, or AI compliance resources published since January 2025.

4. Visit https://capitol.texas.gov again and check for any subsequent legislation that delays, amends, or expands TRAIGA (similar to how Colorado SB 25B-004 delayed SB 24-205).

For EVERY fact you extract, format it as:
- FACT: [the fact]
- CITATION: [exact statutory section, e.g., Tex. Gov't Code § XXXX]
- SOURCE URL: [the URL you found it at]
- QUOTE: [exact language from the statute if available]

I need this for a compliance document product page. Accuracy is legally critical — do not use training data. Only report what you can see on the actual pages you visit. If a URL does not load or the bill cannot be found, say so explicitly.
```

---

### Prompt 2: Micro-Facts for "Did You Know?" Sidebar

```
I need 8-10 short, sourced micro-facts about the Texas Responsible AI Governance Act (TRAIGA) for a "Did You Know?" sidebar on a blog post at aicompliancedocuments.com. Each fact should be 1-2 sentences, surprising or attention-grabbing, and traced to a primary source you actually visit.

Visit these pages and find interesting facts:
- https://capitol.texas.gov — find the TRAIGA bill page and enrolled bill text
- https://www.texasattorneygeneral.gov — any TRAIGA enforcement or rulemaking notices
- https://www.nist.gov/artificial-intelligence — NIST AI page (for affirmative defense angle if TRAIGA references NIST)
- https://airc.nist.gov/AI_RMF_Knowledge_Base — NIST AI RMF (same reason)
- https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation — state AI law tracker (for Texas in national context)

For each fact, format EXACTLY like this (this is a JSON-compatible format for our blog system):
- fact: "One surprising sentence about TRAIGA or AI compliance in Texas"
- source: "Name of source (e.g., Texas Legislature Online)"
- sourceUrl: "https://exact-url-you-found-it-at"

Topics to find facts about:
- Penalty amounts and who enforces them
- How many states have AI compliance laws now, and where Texas ranks
- Whether TRAIGA has an affirmative defense tied to a recognized framework (NIST AI RMF, ISO 42001, etc.) — what legal protection does following it give?
- Whether the law has a private right of action (AG-only enforcement, or can individuals sue?)
- Industry or size exemptions (small business, financial, insurance, healthcare)
- Consumer rights — what can a Texan do if an AI decision harms them?
- What "high-risk" means in the Texas statute specifically
- How TRAIGA compares to Colorado SB 24-205 (stricter? more lenient? different scope?)
- Developer vs. deployer distinction in the Texas law
- AG rulemaking — has the Texas AG issued any rules or guidance yet?

Do NOT use training knowledge. Only facts you can verify on the actual pages you visit. If you cannot find a fact on the page, say so — do not guess.
```

---

### Prompt 3: Deep Dive Sidebar Content

```
I need a "Deep Dive" sidebar piece (300-400 words) for a blog post about the Texas Responsible AI Governance Act (TRAIGA) on aicompliancedocuments.com. This goes in the left sidebar and provides deeper context for a business audience.

Visit https://capitol.texas.gov, find the TRAIGA bill, and read the enrolled bill text. Then write a plain-language explanation covering:

- Why Texas passed TRAIGA — what problem it solves and what political or business context drove it
- What the affirmative defense actually means in practice — if a company follows NIST AI RMF or another named framework, what legal protection does TRAIGA provide? Be specific about the statutory language.
- The developer vs. deployer distinction in TRAIGA and why it matters for companies buying compliance documentation
- What happens when a company discovers its AI system has caused harm or made discriminatory decisions — what are the notification or remediation obligations, and what is the timeline?
- How TRAIGA compares to Colorado SB 24-205 — is it broader, narrower, stricter on penalties, different in scope?
- How this fits into the broader wave of state AI regulation across the U.S.

Write in a tone that is:
- Authoritative but accessible — explaining to a smart business owner, not a lawyer
- Direct and slightly dry — no exclamation points, no hype
- Cite section numbers inline (e.g., "per section XXXX")

Format as plain text paragraphs. No markdown headers. This renders in a narrow 240px sidebar column, so sentences should be relatively short.

Every claim must trace to something you actually read on the .gov page. If you are unsure about a fact, flag it with [UNVERIFIED] rather than guessing. If the bill page does not load or the bill text is unavailable, say so explicitly at the top of your response.
```

---

### Prompt 4: Competitive Landscape — Texas TRAIGA vs. Other State AI Laws

```
I run aicompliancedocuments.com and publish blog posts about state AI compliance laws. I have posts covering: Colorado SB 24-205, California CCPA ADMT, Illinois HB3773, Connecticut CTDPA, Virginia CDPA, EU AI Act, HIPAA + AI, ISO 42001, AI bias audits, penalties by state, compliance costs for small business, and AI hiring software compliance.

I need you to research how Texas TRAIGA fits into the national AI compliance landscape, and what additional blog content it opens up. Visit these pages:

1. https://capitol.texas.gov — find the TRAIGA bill and confirm its current status and effective date.

2. https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation — what other state AI laws are active or advancing? Which states are closest to enacting something? Is Texas the largest state with an enacted AI governance law?

3. https://iapp.org — what are AI compliance practitioners saying about TRAIGA? Any analysis pieces or frameworks comparisons?

4. https://www.ftc.gov/business-guidance/blog — any recent FTC guidance on AI governance that would intersect with TRAIGA obligations?

5. https://www.eeoc.gov/artificial-intelligence — any EEOC guidance on AI in employment that maps to TRAIGA's consequential decision domains?

Based on what you find, suggest 5 blog post topics that:
- Target keywords people are searching for RIGHT NOW related to Texas AI compliance
- Cover angles or comparisons my existing 12 posts do not address
- Have a deadline or urgency angle (enforcement date approaching, rulemaking period open, etc.)
- Would naturally link to products I sell (state compliance packages, bias audit templates, governance frameworks)

For each suggestion, give me:
- Proposed title (in the style of "Texas TRAIGA Is Live: What You Need to Know" — direct, factual)
- Primary target keyword
- Why this matters now (what deadline or enforcement event is driving urgency)
- Which of my existing products it would link to
- What .gov sources to cite (with URLs you actually visited)
- 3 micro-facts you found that could go in the "Did You Know?" sidebar

Do NOT use training knowledge. Only report what you found on the actual pages you visit.
```

---

## PHASE 2: Cross-Verification

Run these AFTER getting results from Prompts 1-4. Paste the relevant outputs in.

---

### Prompt 5: Cross-Verify Statute Facts (against Prompt 1 results)

```
I had another researcher extract facts about the Texas Responsible AI Governance Act (TRAIGA). I need you to independently verify each claim by visiting the primary sources yourself. Do NOT trust the claims below — check each one against what you actually see.

Visit:
- https://capitol.texas.gov — find the TRAIGA bill by searching "Responsible AI Governance Act"
- The enrolled bill text linked from that page
- https://www.texasattorneygeneral.gov — for any enforcement or rulemaking updates

Here are the claims to verify (PASTE PROMPT 1 RESULTS HERE):

[paste results]

For EACH claim, respond with:
- CLAIM: [what was claimed]
- VERIFIED: Yes / No / Partially / Cannot verify
- WHAT I ACTUALLY FOUND: [what you see on the page]
- SOURCE: [URL you checked]
- DISCREPANCY: [if any — explain what's different]

Pay special attention to:
- Effective date — is it definitely January 1, 2026? Has any subsequent bill delayed it?
- Penalty amounts — are they defined in TRAIGA itself or cross-referenced from another Texas statute (e.g., DTPA or Texas Government Code)?
- Exemptions — are they full exemptions or conditional? Does the financial or healthcare exemption have carve-outs?
- The affirmative defense — does it require following a specific framework, or is it a general "reasonable care" standard?
- Enforcement — is it AG-only or can individuals bring claims?
- AG rulemaking — has any rulemaking actually started, or is the authority merely granted?

Flag anything that is ambiguous or where the statutory language could be read multiple ways.
```

---

### Prompt 6: Cross-Verify Micro-Facts (against Prompt 2 results)

```
I had another researcher compile micro-facts about the Texas Responsible AI Governance Act (TRAIGA) for a website sidebar. I need you to independently verify each fact and its source URL.

Visit each sourceUrl listed below and confirm:
1. The URL actually works and loads
2. The fact accurately represents what is on the page
3. The source name is correct

Here are the facts to verify (PASTE PROMPT 2 RESULTS HERE):

[paste results]

For each fact, respond with:
- FACT: [the original fact]
- SOURCE URL WORKS: Yes / No / Redirects to [where]
- FACT IS ACCURATE: Yes / No / Partially
- CORRECTION NEEDED: [if any]
- BETTER SOURCE: [if you found a more authoritative one]

Also flag if any fact could be misleading even if technically true — for example:
- Stating a penalty amount without noting whether it is per violation or a total cap
- Citing an exemption without its conditions
- Comparing TRAIGA to Colorado without noting where the comparison breaks down
- Describing AG enforcement without noting whether rulemaking has actually begun
```

---

### Prompt 7: Cross-Verify Competitive Landscape Analysis (against Prompt 4 results)

```
I had another researcher suggest 5 blog post topics for aicompliancedocuments.com based on Texas TRAIGA and the state AI compliance landscape. I need you to verify:
1. The laws or regulations mentioned actually exist and are enacted (not just proposed)
2. The deadlines cited are correct
3. The topics are not already covered by my existing 12 blog posts
4. The suggested .gov source URLs actually work and link to what was described

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

Visit https://www.ncsl.org/technology-and-communication/artificial-intelligence-2024-legislation to independently check which state AI laws are actually enacted vs. still in committee. Pay particular attention to whether Texas TRAIGA is confirmed as enacted — if it is not, flag that immediately as it would affect all five suggestions.
```

---

## How to Use This

1. Open Claude in the browser (claude.ai)
2. Run Prompts 1-4 one at a time, save each output
3. Run Prompts 5-7, pasting the relevant outputs where indicated
4. Bring verified results back to Claude Code for blog post implementation
5. Any discrepancies between Phase 1 and Phase 2 = DO NOT USE until resolved

Every fact in the blog post must survive dual verification. Texas TRAIGA is newly enacted and primary sources may be sparse — if a URL does not load or a claim cannot be confirmed on a .gov page, treat it as unverified regardless of how confident it sounds.
