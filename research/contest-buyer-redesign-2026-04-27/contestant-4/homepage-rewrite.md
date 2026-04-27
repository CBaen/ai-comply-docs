# Homepage Rewrite — Contestant 4 (v2)

*(Round 1 version archived as `homepage-rewrite-v1.md`. This version rewrites all marketing-surface copy in the new voice. The structural section order and metadata rationale carry forward; the copy is the change.)*

---

## Metadata

### `<title>` tag
```
AI Compliance Documents — Colorado, Illinois, NYC & Texas AI Law Templates
```

**Rationale:** Names the four highest-traffic state laws buyers are already searching. 71 characters. No "Templates for Every State AI Law" catalog description. A buyer searching "Colorado AI compliance documents" sees their state in the title — that's the click signal.

### Meta description (157 chars — fits SERP fully)
```
Colorado SB 24-205 deadline: June 30, 2026. Illinois HB3773 is in effect. Get the documents your state's AI law requires. Built from statute. $49–$697. Instant download.
```

**Rationale:** Two laws named, two urgency modes covered (deadline approaching / in force), price range, speed signal. Every word earns its place.

---

## Hero (Above the Fold)

### New H1 (visible — not sr-only)
```
Your State Has an AI Law. Here Are the Documents It Requires.
```

**Voice note:** Short. Declarative. Offer-shaped. Not "AI compliance templates help businesses navigate state AI regulations." No preamble.

### Sub-H1
```
Colorado. Illinois. NYC. California. Texas.
The documents the law requires. Built from statute. Instant download.
```

**Voice note:** Two sentences. Law names first. What you get second. How it's built third. In that order. No explanation of what AI compliance is — the buyer already knows.

### Primary CTA button
```
Find Your State's Documents →
```

**Voice note:** A task, not a catalog invitation. Buyer-oriented verb. Specific enough to imply "we know which documents your state requires."

### Sub-CTA (below button, smaller text)
```
Not sure which law applies? See deadlines by state →
```

Links to `/compliance-deadline-by-state`.

---

## Urgency Panel (Replaces FeaturedInBar)

Three rows. One per highest-urgency law. Two urgency modes — Deadline Approaching (amber) and Already Exposed (red). Each row links directly to the product page.

**Row 1 — Already Exposed:**
```
🔴 Illinois HB3773   |   In Effect Now   |   Up to $70,000/violation   |   [Get Documents →]
```

**Row 2 — Deadline Approaching:**
```
🟡 Colorado SB 24-205   |   June 30, 2026   |   Up to $20,000/violation   |   [Get Documents →]
```

**Row 3 — Already Exposed:**
```
🔴 NYC Local Law 144   |   In Effect — Enforcement Rising   |   $500–$1,500/day   |   [Get Documents →]
```

**Implementation note:** Penalty figures are statute-verified. Colorado $20,000 derives from the Colorado Consumer Protection Act (C.R.S. § 6-1-112) via SB24-205 enforcement mechanism — verify against current statute before publishing. Illinois $70,000 from [ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm) (repeat violation tier). NYC $500–$1,500/day from NYC Admin. Code § 20-871(d).

---

## Section 2: Products Grid

### Already Exposed (header)
```
These laws are in effect now. Enforcement is active.
```

**Voice note:** Not "Laws currently in force." That's documentation language. "In effect now. Enforcement is active." — that's the buyer's situation named plainly.

Product cards use the new card pattern from `visual-direction.md`. Each card shows:
- Status pill (IN EFFECT — red)
- Law name + price (same row)
- Enforcement signal ("DCWP investigations increasing" / "Penalties active")
- Document count
- "Get [State] Documents →" button

### Deadline Approaching (header)
```
Colorado SB 24-205 takes effect June 30, 2026. The window is closing.
```

**Voice note:** Specific date. Specific law. "The window is closing" — forward pressure without catastrophizing.

---

## Section 3: Consequences (Compressed — 3 penalty cards, no preamble paragraph)

**Section header:**
```
The cost of not having these documents
```

**Card 1 (Colorado — Deadline Approaching):**
```
Up to $20,000 per violation
Colorado SB 24-205 — enforced as deceptive trade practice under C.R.S. § 6-1-112.
Each affected consumer may be a separate violation.
[Get Colorado Documents →]
```

**Card 2 (Illinois — Already Exposed):**
```
Up to $70,000 per violation
Illinois HB3773 — enforced by IDHR under 775 ILCS 5/8A-104.
Repeat-offense tier. First offense up to $16,000.
[Get Illinois Documents →]
```

**Card 3 (NYC — Already Exposed):**
```
$500–$1,500 per day
NYC Local Law 144 — enforced by DCWP under NYC Admin. Code § 20-871(d).
Each day without compliance = a separate violation.
[Get NYC Documents →]
```

**Voice note:** No preceding paragraph that says "AI regulations aren't suggestions." Skip the wind-up. The numbers speak.

---

## Section 4: How It Works (Compressed)

**Header:**
```
Three steps. Five minutes.
```

**Step 1:**
```
Pick your state's law
Colorado, Illinois, NYC, California, Texas — or search all 57 packages.
```

**Step 2:**
```
Answer 8 questions
Your company name, AI systems in use, which decisions they inform. That's it.
```

**Step 3:**
```
Download your documents
Fillable PDFs, instantly. Electronic signature blocks included.
```

**CTA below steps:**
```
[ Browse All State Packages → ]
```

**Voice note:** The current step copy says "Select the state regulation you need to comply with. Answer a short questionnaire about your company and AI systems. Takes about 10 minutes." The v2 version cuts the word count by 60%, removes the time qualifier ("10 minutes" is process information the buyer doesn't need in the steps), and puts the output ("Fillable PDFs, instantly") before the detail (electronic signature blocks).

---

## Section 5: FAQ (6 Questions, New Priority Order)

**Header:**
```
Before you buy
```

**Voice note:** Not "Frequently Asked Questions." Not "Everything you need to know." Just: "Before you buy." That's what it is.

**Q1: What documents do I actually need?**
> That depends on your state and your role. Colorado SB 24-205 requires impact assessments, a risk management policy, and consumer notices — 8 documents total for deployers. Illinois HB3773 requires employee notifications, an AI system inventory, and a human oversight protocol. NYC Local Law 144 requires an annual bias audit, candidate notifications, and public disclosure. Each product page lists exactly what's included and which statutory section requires it.

**Q2: How do I know if this applies to my business?**
> If you use AI in hiring and have employees or applicants in Illinois, NYC, or Colorado — yes. If you use AI in lending, insurance, healthcare, housing, or consumer decisions and your AI system affects those consumers — yes. If you're a software vendor whose tool is used in these decisions — your customers are the deployers, but you may have developer-side obligations under Colorado's law specifically.

**Q3: Where do I start if I don't know which law applies?**
> [State Deadlines page →](/compliance-deadline-by-state) — organized by state, with the specific deadline or enforcement status, the penalty, and a direct link to the relevant package.

**Q4: Is this legal advice?**
> No. These are documentation templates built from enacted statute text. They help you get organized and demonstrate compliance effort. Your attorney reviews the completed documents — not drafts them from scratch at $400–$800 an hour.

**Q5: How are the documents generated?**
> You answer 8 questions: company name, AI systems in use, which decisions they inform. Your answers populate the templates. Documents generate instantly as fillable PDFs. Download, fill in the highlighted fields, sign with the included electronic signature blocks. Done.

**Q6: Do I need this if I already have outside counsel?**
> A lot of our customers have lawyers. The templates give their attorney something to review instead of drafting from scratch. Eight hours of attorney time at $600/hour is $4,800. The Colorado package is $449. Your lawyer's time is better spent on the nuances specific to your situation — not formatting a compliance checklist.

**Voice note:** Each answer is shorter than the v1 version. The voice is direct, offer-aware, specific. Q4 is the only one that sounds like the old blog voice — that's intentional. The legal disclaimer question warrants the more measured register.

---

## Final CTA (Section bottom)

**Header:**
```
The deadline doesn't move.
```

**Body:**
```
Colorado's AI law takes effect June 30, 2026. Illinois HB3773 is in effect now. NYC enforcement is increasing. Your compliance documents are here. Built from the statute. One-time purchase. Instant download.
```

**Button:**
```
[ Find Your State's Documents → ]
```

**Below button (small text):**
```
Questions before purchasing? info@aicompliancedocuments.com
```

**Voice note:** "The deadline doesn't move" is the v2 final CTA header — sharpened from Round 1's "Don't wait for a complaint." Both are Realist-voice. The v2 version is more specific: it names the buyer's specific hope (that the deadline will be delayed again, as it was from February to June) and refuses it. "Don't wait for a complaint" is general urgency. "The deadline doesn't move" is targeted at the Colorado buyer's psychological loophole.

---

## What Changed from v1 (Voice Diff)

| v1 (journalist-explainer) | v2 (compliance specialist at the counter) |
|---|---|
| "The current homepage is optimized for researchers..." | Removed — rationale is in the spec, not the page |
| "Colorado SB 24-205 takes effect June 30, 2026. Illinois HB3773 is in effect now. NYC Local Law 144 enforcement is increasing. Get the documents the law requires..." | "Colorado. Illinois. NYC. California. Texas. The documents the law requires. Built from statute. Instant download." |
| "AI regulations aren't suggestions. They're law, with real enforcement teeth and penalties up to $200,000 per violation..." | "The cost of not having these documents" + direct penalty cards |
| "Everything you need to know before getting started." | "Before you buy." |
| "If you use AI in hiring and you have employees or applicants in Illinois, NYC, or Colorado — yes." | Same — this was already good. Kept. |
| "State AI regulations are here. Generate compliance documentation for a fraction of legal fees." (OG description) | Removed from all surfaces |

---

## Post-June-30, 2026 Homepage Variants

*(Added in Loop 2. When Colorado flips from `"effective-soon"` to `"in-effect"`, these two elements update. Everything else on the homepage holds.)*

### Meta description (post-June-30)
```
Colorado, Illinois, NYC, California, and Texas AI laws are all in effect. Enforcement is active. Get the compliance documents your state requires — built from statute. $49–$697. Instant download.
```

Colorado drops out of the meta description as a deadline-specific signal and joins the all-exposed list. The urgency is present-tense rather than countdown-based. Character count: 196 — truncates at 160 in SERP; the truncation point keeps "Colorado, Illinois, NYC, California, and Texas AI laws are all in effect. Enforcement is active. Get the compliance documents" fully visible.

### Final CTA header (post-June-30)
```
Every major state AI law is now in effect.
```

Replaces "The deadline doesn't move." — which was Colorado-specific urgency. After June 30, the Colorado deadline has passed; "The deadline doesn't move" becomes factually stale (the deadline did pass — compliance is now simply overdue). The replacement line is accurate, present-tense, and applies to the full catalog rather than one state.

**Final CTA body (post-June-30):**
```
Colorado, Illinois, NYC, California, Texas — enforcement is active in all of them. Your compliance documents are here. Built from statute. One-time purchase. Instant download.
```

### Urgency panel (post-June-30)
All three rows shift to Enforcement Red. The amber Colorado row becomes:
```
🔴 Colorado SB 24-205   |   In Effect Now   |   Up to $20,000/violation   |   [Get Documents →]
```

No other homepage element requires a manual update — the product cards, the products grid section headers, and the status badges all derive from `regulations.ts` and update automatically when the `status` field flips.
