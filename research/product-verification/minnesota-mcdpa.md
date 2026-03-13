# Minnesota MCDPA — Product Verification

**Product slug:** `minnesota-mcdpa`
**Verification date:** 2026-03-13
**Verified by:** Research agent (subagent)
**Primary source fetched:** PDF of HF4757 (4th Engrossment / enrolled text), downloaded from https://www.revisor.mn.gov/bills/text.php?number=HF4757&version=4&session=ls93&session_number=0&session_year=2024&format=pdf and read via pdfplumber. Article 5 (the Minnesota Consumer Data Privacy Act) spans pages 155–181 of the 186-page document.

**IMPORTANT NOTE:** The PDF was analyzed locally — it was saved to the research environment and read page by page. Every verified fact below comes from the PDF of the enrolled text, not from secondary sources or training knowledge.

---

## 1. Enacted Status

**Status: ENACTED AND SIGNED — CONFIRMED FROM PRIMARY SOURCE**

- **Bill number:** HF 4757 (House File), 93rd Legislature (2023–2024 session)
- **Session:** Minnesota 93rd Legislature Regular Session
- **Session law chapter:** Chapter 121 (Session Law 2024 Chapter 121, Article 5)
- **Governor approval date:** May 24, 2024 (confirmed from the legislative history on the bill's cover page in the PDF)
- **Filed with Secretary of State:** May 24, 2024

The bill is an omnibus measure covering cannabis, health, and consumer protection. The MCDPA provisions are specifically in **Article 5**, which is titled "CONSUMER DATA POLICY" and creates new Minnesota Statutes, Chapter 325O.

---

## 2. Statute Citation

**CONFIRMED FROM PRIMARY SOURCE**

Article 5 of Session Law Chapter 121 "proposes coding for new law as Minnesota Statutes, chapter 325O."

The sections created are:
- **325O.01** — Citation ("This chapter may be cited as the 'Minnesota Consumer Data Privacy Act.'")
- **325O.02** — Definitions
- **325O.03** — Scope; Exclusions
- **325O.04** — Responsibility According to Role
- **325O.05** — Consumer Personal Data Rights
- **325O.06** — Processing Deidentified Data or Pseudonymous Data
- **325O.07** — Responsibilities of Controllers
- **325O.075** — Requirements for Small Businesses
- **325O.08** — Data Privacy Policies; Data Privacy and Protection Assessments
- **325O.09** — Limitations and Applicability
- **325O.10** — Attorney General Enforcement
- **325O.11** — Preemption of Local Law; Severability

The citation in `regulations.ts` — **"Minn. Stat. Ch. 325O"** — is confirmed correct.

---

## 3. Citation URL

**Status: NEEDS REPLACEMENT — CURRENT URL DOES NOT POINT TO STATUTE TEXT**

The current `citationUrl` in `regulations.ts` is:
```
https://www.ag.state.mn.us/consumer/privacy/mcdpa.asp
```
This URL returned a **404 error** when tested. It is also an AG summary page, not the statute text.

**Working URL for the session law (enrolled text):**
```
https://www.revisor.mn.gov/laws/2024/0/Session+Law/Chapter/121/
```
This URL was confirmed accessible. It shows the full text of Session Law 2024 Chapter 121, which contains Article 5 (the MCDPA / Chapter 325O provisions).

**For the codified statute**, the expected URL format is:
```
https://www.revisor.mn.gov/statutes/cite/325O.01
```
through
```
https://www.revisor.mn.gov/statutes/cite/325O.11
```

These individual section URLs returned 404 errors when tested (the statute may not be indexed by individual section URL yet, or the URL format may differ). The session law URL above is the confirmed working link to the enacted text.

**Recommended `citationUrl` replacement:**
```
https://www.revisor.mn.gov/laws/2024/0/Session+Law/Chapter/121/
```

**Exact prompt for Guiding Light to find the codified statute URL:**
> Open https://www.revisor.mn.gov/statutes/ in your browser. In the "Retrieve by number" box, type "325O" and press enter. Does it show Chapter 325O of Minnesota Statutes? If yes, what is the URL of the page that appears? If no, what happens?

---

## 4. Effective Date

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Article 5, Section 14 (Effective Date section of the MCDPA article):**

> "This article is effective July 31, 2025, except that postsecondary institutions regulated by the Office of Higher Education are not required to comply with this article until July 31, 2029."

The effective date in `regulations.ts` — **"July 31, 2025"** — is confirmed correct for most covered entities.

**Exception for postsecondary institutions:** July 31, 2029.

**No amending bills found** that would have changed this date. However, research was limited to web-accessible sources. Guiding Light should verify whether the 2025 Minnesota legislative session (94th Legislature) passed any amendments to Chapter 325O.

---

## 5. Penalty Amounts

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 325O.10(c):**

> "Any controller or processor that violates this chapter is subject to an injunction and liable for a civil penalty of not more than $7,500 for each violation."

**Important context — Section 325O.10(a) (the 30-day warning period):**

> "In the event that a controller or processor violates this chapter, the attorney general, prior to filing an enforcement action under paragraph (b), must provide the controller or processor with a warning letter identifying the specific provisions of this chapter the attorney general alleges have been or are being violated. If, after 30 days of issuance of the warning letter, the attorney general believes the controller or processor has failed to cure any alleged violation, the attorney general may bring an enforcement action under paragraph (b). **This paragraph expires January 31, 2026.**"

This means:
- Before January 31, 2026: AG must give a 30-day warning letter before filing suit
- After January 31, 2026: The warning/cure period expires — the AG can file immediately without waiting

**Penalty summary:**
| Tier | Amount | Section |
|---|---|---|
| Standard violation | Up to $7,500 per violation | § 325O.10(c) |
| No tiered penalties | No first-offense/repeat tiers in the statute | — |
| Cure period | 30 days (EXPIRED January 31, 2026) | § 325O.10(a) |

**Update needed in `regulations.ts`:**

The current `penaltySummary` states: "Civil penalties up to $7,500 per violation."

This is correct on the dollar amount. However, it does not note that:
1. The cure period warning provision expired January 31, 2026 (after which the AG can file immediately)
2. There is no "AG enforcement under consumer protection statutes" — the statute has its own dedicated enforcement section at § 325O.10, not via § 8.31's general $25,000 cap

Note: Section 325O.10(b) does say the AG "may bring a civil action...in accordance with section 8.31" — meaning the AG uses § 8.31's procedures — but the penalty is set specifically in § 325O.10(c) at $7,500, not the $25,000 general cap in § 8.31.

Also note: **Section 325O.075** applies the same penalties and enforcement to small businesses that sell consumer sensitive data without consent.

---

## 6. Enforcement

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 325O.10(b):**
> "The attorney general may bring a civil action against a controller or processor to enforce a provision of this chapter in accordance with section 8.31."

**Section 325O.10(d):**
> "Nothing in this chapter establishes a private right of action, including under section 8.31, subdivision 3a, for a violation of this chapter or any other law."

**Summary:**
- **AG enforcement only** — confirmed
- **No private right of action** — explicitly stated in § 325O.10(d)
- The current `penaltySummary` says "Minnesota Attorney General enforcement. Violations treated under consumer protection statutes." This is partially accurate (enforcement uses § 8.31 procedures) but the "consumer protection statutes" framing may create confusion. The penalties are set by § 325O.10(c), not by general consumer protection law.

---

## 7. Cure Period

**CONFIRMED FROM PRIMARY SOURCE**

**Section 325O.10(a):**
- Before January 31, 2026: 30-day warning letter required before AG can file suit
- After January 31, 2026: This paragraph **expires** — no mandatory cure period

As of the verification date of this document (March 13, 2026), the cure period provision has expired. The AG can now file immediately upon discovering violations, without providing a warning letter.

**Action needed in `regulations.ts`:** The `penaltySummary` should note that the 30-day cure period expired January 31, 2026.

---

## 8. Applicability

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 325O.03, Subdivision 1 (Scope):**

> "(a) This chapter applies to legal entities that conduct business in Minnesota or produce products or services that are targeted to residents of Minnesota, and that satisfy one or more of the following thresholds:
> (1) during a calendar year, controls or processes personal data of 100,000 consumers or more, excluding personal data controlled or processed solely for the purpose of completing a payment transaction; or
> (2) derives over 25 percent of gross revenue from the sale of personal data and processes or controls personal data of 25,000 consumers or more."

**Key applicability details:**
- **Consumer threshold:** 100,000 Minnesota consumers/year (data-sale-focused entities: 25,000 consumers + >25% revenue from data sales)
- **"Consumer" definition (§ 325O.02(g)):** "a natural person who is a Minnesota resident acting only in an individual or household context. Consumer does not include a natural person acting in a commercial or employment context."
- **Small businesses** are covered only for the prohibition on selling sensitive data without consent (§ 325O.075)

**Update needed in `regulations.ts`:** The current `appliesToSummary` — "Any business processing personal data of Minnesota consumers using algorithmic profiling for consequential decisions" — is **inaccurate**. It omits the 100,000/25,000 consumer thresholds and the revenue threshold. It also incorrectly frames it as an "algorithmic profiling" law when it is a comprehensive consumer data privacy law with profiling opt-out rights as one consumer right.

**Corrected `appliesToSummary` should be:** "Legal entities that conduct business in Minnesota or target Minnesota residents, and either: (1) process personal data of 100,000+ Minnesota consumers/year, or (2) derive 25%+ of gross revenue from data sales and process data of 25,000+ consumers."

---

## 9. AI-Specific Provisions

**Confirmed from primary source**

The MCDPA is a comprehensive consumer data privacy law, not specifically an "AI governance" law. However, it contains these AI/algorithmic decision-related provisions:

**Section 325O.05(f) — Consumer opt-out right:**
> "A consumer has the right to opt out of the processing of personal data concerning the consumer for purposes of targeted advertising, the sale of personal data, or profiling in furtherance of automated decisions that produce legal effects concerning a consumer or similarly significant effects concerning a consumer."

**Section 325O.05(g) — Profiling explanation right:**
> "If a consumer's personal data is profiled in furtherance of decisions that produce legal effects concerning a consumer or similarly significant effects concerning a consumer, the consumer has the right to question the result of the profiling, to be informed of the reason that the profiling resulted in the decision, and, if feasible, to be informed of what actions the consumer might have taken to secure a different decision..."

**"Decisions that produce legal or similarly significant effects concerning the consumer" (§ 325O.02(i)):**
> "decisions made by the controller that result in the provision or denial by the controller of financial or lending services, housing, insurance, education enrollment or opportunity, criminal justice, employment opportunities, health care services, or access to essential goods or services."

**Section 325O.08(b)(5) — Data privacy assessment requirement for profiling:**
Controllers must conduct data privacy and protection assessments for processing personal data for profiling purposes where there's a risk of "unfair or deceptive treatment of, or disparate impact on, consumers" or other significant harms.

---

## 10. What I Verified From Primary Source

From the enrolled bill text (PDF of HF4757, 4th Engrossment):

- [x] Bill number: HF 4757 — confirmed
- [x] Legislature: 93rd (2023–2024 session) — confirmed
- [x] Session law: Chapter 121 — confirmed
- [x] Governor approval date: May 24, 2024 — confirmed
- [x] Statute chapter created: 325O — confirmed
- [x] All section numbers 325O.01–325O.11 — confirmed
- [x] Effective date: July 31, 2025 (§ Article 5, Sec. 14) — confirmed
- [x] Postsecondary exception: July 31, 2029 — confirmed
- [x] Civil penalty: Up to $7,500 per violation (§ 325O.10(c)) — confirmed
- [x] No private right of action (§ 325O.10(d)) — confirmed
- [x] AG enforcement only (§ 325O.10(b)) — confirmed
- [x] 30-day cure period (§ 325O.10(a)) — confirmed
- [x] Cure period expired January 31, 2026 (§ 325O.10(a)) — confirmed
- [x] Applicability thresholds: 100,000 consumers or 25,000 consumers + 25% revenue (§ 325O.03) — confirmed
- [x] Profiling opt-out rights (§ 325O.05(f)) — confirmed
- [x] Profiling explanation rights (§ 325O.05(g)) — confirmed
- [x] "Significant decisions" definition covering employment, financial, housing, etc. (§ 325O.02(i)) — confirmed

---

## 11. What I Could NOT Verify

**1. The codified statute URL.** I could not find a working URL that takes a customer directly to the codified Chapter 325O text. The session law URL works but shows the full omnibus bill (186 pages), not just the MCDPA provisions.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Open https://www.revisor.mn.gov/statutes/ in your browser. In the search box or "Retrieve by number" box, look for Chapter 325O. What URL appears when you navigate to the chapter? Tell me the exact URL that shows Chapter 325O sections. If it does not exist at that URL, tell me what happens.

**2. Whether the 94th Minnesota Legislature (2025–2026 session) has amended Chapter 325O.** No such amendments were found, but my search was not exhaustive.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Go to https://www.revisor.mn.gov/bills/?keyword=325O and tell me if any bills in the 2025–2026 Minnesota session have amended Chapter 325O of Minnesota Statutes. If yes, tell me the bill number and what was changed.

**3. Current AG enforcement activity.** I cannot verify whether the AG has begun enforcement or issued any guidance interpreting the statute.
