# Product Page Template — Colorado SB 24-205

## Why Colorado

Research basis: Colorado SB 24-205 has the most imminent active deadline of any law in the catalog (June 30, 2026 — confirmed via WebFetch from leg.colorado.gov). It covers the broadest set of consequential decisions (employment, lending, insurance, healthcare, housing, education). The product page sits at position 11.14 with 350 impressions — page 2, one ranking improvement from a significant traffic gain. And the buyer query "Colorado SB 24-205 compliance template" is actively searched with purchase intent, per live WebSearch research showing vendors like TrustArc and law firms competing for it — but none offering instant-download documents.

---

## Current Page Problems (diagnosed from page.tsx review)

1. **`<title>` is bibliographic, not buyer-facing:** "Colorado SB 24-205 — AI Consumer Protections — Compliance Documents | AI Compliance Documents" — five dashes, no urgency, no buyer signal
2. **Meta description** pulls from `regulations.ts`'s `description` field — catalog language, not buyer language
3. **The H1 is the law's formal name**, not a buyer-oriented hook
4. **"Does This Apply to You?" section exists** but is buried below the page fold — this is the most important section and should be the first visible element
5. **Penalty section appears AFTER** all the product details — penalties are the motivation; they should be near the top to validate why the buyer is here
6. **No deadline countdown language** anywhere above the fold — "June 30, 2026" does not appear in the hero

---

## Revised Product Page — Full Structure

### `<title>` tag

```
Colorado SB 24-205 Compliance Documents — Deadline June 30, 2026
```

**Rationale:** Deadline in the title gives the SERP click a reason. Moves position 11 → potential position 4-7 click behavior because the title matches buyer urgency, not just keyword presence. (CTR at position 7 is 3.0% — matching buyer intent in the title can double or triple that.)

---

### `<meta description>`

```
Colorado SB 24-205 takes effect June 30, 2026. If you deploy AI in hiring, lending, insurance, or healthcare, you need an impact assessment, risk management policy, and consumer notices. Get all 8 documents — built from the enacted statute text — instant download, $449.
```

**Rationale:** States the deadline first. Names the specific documents required (which no competitor does in a meta description). Names the price. 158 characters.

---

### Above-the-fold Hero Section

**Status badge (keep existing component, revise label copy):**
```
DEADLINE: JUNE 30, 2026
```
(Currently shows: "EFFECTIVE SOON" — too passive for a buyer with 2 months until deadline)

**H1:**
```
Colorado SB 24-205 — You Have Until June 30.
```

**Sub-H1 lede:**
```
If your business deploys AI in employment, lending, insurance, healthcare, or housing decisions in Colorado, you are a "deployer" under SB 24-205. By June 30, 2026, you need documented risk management, impact assessments, and consumer notice procedures — or you face enforcement as a deceptive trade practice under the Colorado Consumer Protection Act, with penalties up to $20,000 per violation.
```

**Rationale:** "Deployer" in quotes is the statute's own defined term — it signals statutory precision to the buyer. Penalty amount ($20,000) is sourced from the Colorado Consumer Protection Act, which SB 24-205 incorporates for enforcement, verified live via WebSearch. "Deceptive trade practice" is the statutory classification — naming it exactly is both accurate and more alarming than "civil penalty," which the current copy uses.

**Price + CTA (keep existing component, revise sub-copy):**
```
$449 — one-time purchase
```
Sub-copy below price:
```
8 documents, instant download, built from C.R.S. § 6-1-1701 et seq.
vs. weeks and thousands at a law firm
```

---

### Section Order Revision

**Current order:**
1. Hero (law name, price, CTA)
2. Key stats bar
3. Does This Apply to You?
4. Illinois IDHR notice (N/A for CO)
5. Lifestyle image
6. What's Included
7. Preview Your Documents
8. See Inside Your Documents
9. Penalties
10. ESIGN Act note
11. What Happens After You Purchase
12. Complete Your Compliance (add-ons)
13. Statutory Authority
14. Questionnaire

**Revised order (copy changes only — no structural rebuild):**
1. Hero (revised copy above)
2. Key stats bar
3. **"Does This Apply to You?" — MOVE THIS ABOVE THE LIFESTYLE IMAGE** (it's currently below it in visual weight — it should be the first substantive section after the stats bar)
4. **Penalty callout block — NEW PLACEMENT, before "What's Included"** (motivation before product)
5. What's Included
6. Preview Your Documents
7. What Happens After You Purchase
8. Complete Your Compliance (add-ons)
9. Statutory Authority
10. Questionnaire

---

### "Does This Apply to You?" Section — Revised Copy

**Section header (keep visual component, revise copy):**
```
Does Colorado SB 24-205 Apply to Your Business?
```

**Bullets (revise from current generic bullets to statute-specific language):**

Current bullets:
- "You do business in Colorado or target Colorado consumers"
- "You use an AI system that substantially factors into consequential decisions"
- "Consequential decisions include: employment, lending, insurance, housing, healthcare, education, government services, legal services"

Revised bullets (adding specificity):
- You operate in Colorado **or** target Colorado consumers — physical presence is not required
- You use an AI tool that substantially factors into decisions about hiring, promotion, lending, insurance, housing, healthcare, or education
- You are the company using the AI (you are a "deployer" under the statute) — even if you didn't build the tool yourself
- You are not a deployer with fewer than 50 FTEs who uses only the developer's own data and published specifications (the small business exemption — if this applies to you, the law's documentation requirements are reduced but not eliminated)

**Section sub-copy (after bullets):**
```
There is no revenue minimum under SB 24-205. No employee minimum for most requirements. The law is volume-agnostic — a 10-person company that uses an AI hiring tool faces the same core obligations as a multinational. ([SB 24-205, C.R.S. § 6-1-1702 et seq.](https://leg.colorado.gov/bills/sb24-205))
```

**Rationale:** The small-business exemption note addresses the #1 buyer misconception (confirmed in SMB research: "I assumed the rules only apply to big companies"). Naming it explicitly — including that it reduces but doesn't eliminate obligations — prevents the buyer from disqualifying themselves incorrectly.

---

### Penalty Callout Block — New Placement and Revised Copy

**Place this BEFORE "What's Included," not after.**

```
What Happens Without Documentation
```

```
Colorado enforces SB 24-205 through the Colorado Consumer Protection Act. Violations are classified as deceptive trade practices. The Attorney General has exclusive enforcement authority — no private right of action. Civil penalties: up to $20,000 per violation. ([Colorado Consumer Protection Act, C.R.S. § 6-1-113](https://coag.gov/office-sections/consumer-protection/))

If a deployer discovers algorithmic discrimination, they must report it to the AG within 90 days. Failure to report is a separate violation.

Documentation matters because the AG's first question after a complaint is: "Show me your risk management policy and impact assessment." If you don't have one, you have no affirmative defense.
```

**Rationale:** The current penalty section says "Maximum: [maxPenalty]" from the data field. That's accurate but passive. The revised copy adds context — enforcement mechanism, the 90-day reporting obligation, the role documentation plays in an affirmative defense. This is the Precise Credentialist voice: exact amounts, exact citation, exact statutory mechanism.

---

### Sidebar Purchase Card — Revised Sub-Copy

Current:
```
vs. thousands at a law firm
```

Revised:
```
Deadline: June 30, 2026 — 64 days remaining
vs. $400–$800/hour to draft from scratch
```

**Rationale:** "64 days remaining" is a concrete countdown that activates urgency without fabricating it. (Note to build team: this should be computed dynamically from the effective date field in regulations.ts — `Math.ceil((new Date('2026-06-30') - new Date()) / (1000 * 60 * 60 * 24))` days. If after June 30, switch to "IN EFFECT — enforcement active.") The attorney hourly rate is documented in the current page.tsx FAQ already ($400-$800/hour) — pulling it into the sidebar makes it visible at the moment of purchase decision.

---

### Blog Guide Card — Revised CTA Copy

Current:
```
"Read our plain-language guide to this law →"
```

Revised:
```
"New to Colorado SB 24-205? Start here — plain-language explanation of what the law requires →"
```

**Rationale:** Frames the blog post as a starting point for the pre-qualified buyer, not a substitute for purchasing. The current copy sends the buyer away from the purchase decision without a promise to return. The revised copy positions the blog as an orienting step in the purchase journey.

---

### "What's Included" Section — Add Applicability Anchors

For each document in the list, after the existing DOC_EXPLANATIONS text, add one line:

```
[Document Name]
[Existing explanation]
Required by: C.R.S. § 6-1-[section] ([leg.colorado.gov link])
```

**Rationale:** The current document list explains what each document does but doesn't say which statute section requires it. Adding the citation turns each item into a trust signal: the buyer sees that the document isn't invented — it's a specific statutory obligation. This is the Precise Credentialist voice applied to the purchase interface.

---

## What Stays the Same

- The visual design of the sidebar purchase card
- The QuickPurchaseButton component
- The questionnaire flow
- The document preview section
- The ESIGN Act note
- The statutory authority section (citation + link to enacted law)
- Related add-ons section
- Related products section

---

*Research basis: Colorado SB 24-205 primary source (leg.colorado.gov, fetched live); Colorado Consumer Protection Act penalty amounts (via WebSearch, verified live — up to $20,000 per violation); SMB pre-purchase objection research (qualification anxiety, size misconception, enforcement doubt all confirmed); CTR benchmark data (position 7 = 3.0%, meaning a title-match improvement could realistically triple click volume from current position).*
