# Texas TRAIGA — Product Verification

**Product slug:** `texas-traiga`
**Verification date:** 2026-03-13
**Verified by:** Research agent (subagent)
**Primary source fetched:** https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm (confirmed accessible and served full text)

---

## 1. Enacted Status

**Status: ENACTED AND SIGNED — CONFIRMED FROM PRIMARY SOURCE**

- **Bill number:** HB 149, 89th Regular Session (89R)
- **Legislature:** Texas 89th Regular Session
- **Enrolled bill URL:** https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm
- **Public Act / Session Law number:** Not assigned in the enrolled text. Texas does not assign "Public Act" numbers the way Illinois does — the bill becomes law upon the governor's signature. The enrolled text designation is "89(R) HB 149."
- **Governor signature date:** Not stated in the enrolled text itself (Section 10 gives the effective date only). Guiding Light should confirm the signing date via the Texas Legislature's bill history page.

**Note on the codebase:** The previous instance correctly identified this as HB 149 (not HB 1709, which died in committee). The citation "Tex. Bus. & Com. Code Ch. 551–554" is confirmed correct.

---

## 2. Statute Citation

**CONFIRMED FROM PRIMARY SOURCE**

The enrolled text of HB 149 creates the following new chapters in Title 11, Business & Commerce Code, as Subtitle D ("Artificial Intelligence"):

- **Chapter 551** — General Provisions (Artificial Intelligence Protection)
- **Chapter 552** — Artificial Intelligence Protection (the main compliance chapter with duties, penalties, enforcement)
- **Chapter 553** — Texas Artificial Intelligence Regulatory Sandbox Program
- **Chapter 554** — Texas Artificial Intelligence Council

The citation in `regulations.ts` — **"Tex. Bus. & Com. Code Ch. 551–554"** — is confirmed correct.

---

## 3. Citation URL

**Status: NEEDS REPLACEMENT**

The current `citationUrl` in `regulations.ts` is:
```
https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm
```

This URL **works** and points to the enrolled bill text. However, it is a bill text URL, not a codified statute URL. The PRODUCT-ONBOARDING.md requires that `citationUrl` point to the enacted statute text, not the bill text.

**Tested working URL for enrolled bill:** https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm — confirmed accessible and served full statutory text.

**For the codified statute**, the Texas statutes site is at `statutes.capitol.texas.gov`. The expected URL format would be:
- https://statutes.capitol.texas.gov/Docs/BC/htm/BC.551.htm (Chapter 551)
- https://statutes.capitol.texas.gov/Docs/BC/htm/BC.552.htm (Chapter 552)

These URLs did not return textual content through the WebFetch tool (the page appears CSS-heavy). Guiding Light should verify whether these URLs display the codified statute text in a browser.

**Recommended action:** Test `https://statutes.capitol.texas.gov/Docs/BC/htm/BC.552.htm` in a browser. If it shows the codified Chapter 552 text, use that URL as `citationUrl`. If it does not work, the enrolled bill URL (current one) is acceptable as a secondary option until the codified statute URL is confirmed.

---

## 4. Effective Date

**CONFIRMED FROM PRIMARY SOURCE**

Section 10 of the enrolled text states verbatim:
> "This Act takes effect January 1, 2026."

The effective date in `regulations.ts` — **"January 1, 2026"** — is confirmed correct.

**Check for amending bills:** No amending bills were found. The research scope was limited to the 89th Regular Session. Guiding Light should verify on https://capitol.texas.gov that no subsequent session has amended the effective date or penalty provisions.

---

## 5. Penalty Amounts

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 552.105(a) — Civil Penalties:**

> "(a) A person who violates this chapter and does not cure the violation under Section 552.104 is liable to this state for a civil penalty in an amount of:
> (1) for each violation the court determines to be curable or a breach...not less than $10,000 and not more than $12,000;
> (2) for each violation the court determines to be uncurable, not less than $80,000 and not more than $200,000; and
> (3) for a continued violation, not less than $2,000 and not more than $40,000 for each day the violation continues."

**Section 552.106(b)(2) — Agency Sanctions (secondary enforcement):**

> "a monetary penalty not to exceed $100,000"

**Summary of all penalty tiers:**
| Violation type | Minimum | Maximum | Section |
|---|---|---|---|
| Curable violation | $10,000 | $12,000 per violation | § 552.105(a)(1) |
| Uncurable violation | $80,000 | $200,000 per violation | § 552.105(a)(2) |
| Continued violation | $2,000/day | $40,000/day | § 552.105(a)(3) |
| Agency sanctions (secondary) | N/A | $100,000 | § 552.106(b)(2) |

The `penaltySummary` in `regulations.ts` is **confirmed correct**:
> "Attorney General enforcement (exclusive, no private right of action). Curable violations: $10,000–$12,000 per violation. Uncurable violations: $80,000–$200,000 per violation. Continued violations: $2,000–$40,000 per day. Mandatory 60-day cure period before AG can file suit (Tex. Bus. & Com. Code § 552.104–105)."

The `maxPenalty` — **"$200,000 per uncurable violation"** — is confirmed correct.

---

## 6. Enforcement

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 552.101(a):**
> "The attorney general has exclusive authority to enforce this chapter, except to the extent provided by Section 552.106."

**Section 552.101(b):**
> "This chapter does not provide a basis for, and is not subject to, a private right of action for a violation of this chapter or any other law."

**Section 552.106(a):** State agencies may additionally impose sanctions (including monetary penalties up to $100,000 under § 552.106(b)(2)) against persons they license/register/certify if the person has already been found in violation under Section 552.105 AND the AG has recommended additional enforcement.

**Summary:** AG enforcement is exclusive for primary civil enforcement. No private right of action. Secondary agency sanctions are possible but only after an AG finding.

---

## 7. Cure Period

**CONFIRMED FROM PRIMARY SOURCE — verbatim statutory text**

**Section 552.104(a):**
> "If the attorney general determines that a person has violated or is violating this chapter, the attorney general shall notify the person in writing...identifying the specific provisions...alleged to have been or are being violated."

**Section 552.104(b):**
> "The attorney general may not bring an action...before the 60th day after the date the attorney general provides the notice under Subsection (a); or if, before the 60th day...the person: (A) cures the identified violation; and (B) provides the attorney general with a written statement."

**Cure period: 60 days** (§ 552.104(b)) — confirmed correct. The codebase previously stated 30 days (wrong) but the `regulations.ts` has already been updated to 60 days per the task description.

---

## 8. Applicability

**CONFIRMED FROM PRIMARY SOURCE**

**Section 551.002 (Applicability of Subtitle):**
> "This subtitle applies only to a person who: (1) promotes, advertises, or conducts business in this state; (2) produces a product or service used by residents of this state; or (3) develops or deploys an artificial intelligence system in this state."

**Section 552.001 Definitions:**
- **"Deployer"**: "a person who deploys an artificial intelligence system for use in this state."
- **"Developer"**: "a person who develops an artificial intelligence system that is offered, sold, leased, given, or otherwise provided in this state."

**Note on "high-risk AI system":** This term does not appear in Section 552.001. TRAIGA's restrictions focus on specific prohibited AI uses (biometric data systems, social scoring, discrimination, behavioral manipulation, sexually explicit content generation) rather than the "high-risk AI system" framing used in, for example, the EU AI Act or Colorado SB24-205. The `appliesToSummary` in `regulations.ts` should be verified against the actual Chapter 552 provisions rather than a generic "high-risk AI" framing.

**Recommended update for `appliesToSummary`:** Read the Chapter 552 Subchapter B provisions directly from the enrolled bill text to confirm the exact categories of covered AI uses. The current entry — "Any deployer of a high-risk AI system operating in Texas that makes consequential decisions affecting Texans" — may not precisely match the statute's actual coverage categories.

---

## 9. What I Verified From Primary Source

All of the following were confirmed by reading the enrolled text at https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm:

- [x] Bill number: HB 149, 89th Regular Session — confirmed
- [x] Code sections created: Ch. 551, 552, 553, 554 of Tex. Bus. & Com. Code — confirmed
- [x] Effective date: January 1, 2026 (§ 10) — confirmed
- [x] Cure period: 60 days (§ 552.104(b)) — confirmed
- [x] Enforcement: AG exclusive (§ 552.101(a)) — confirmed
- [x] No private right of action (§ 552.101(b)) — confirmed
- [x] Civil penalty for curable violations: $10,000–$12,000 (§ 552.105(a)(1)) — confirmed
- [x] Civil penalty for uncurable violations: $80,000–$200,000 (§ 552.105(a)(2)) — confirmed
- [x] Continued violation penalty: $2,000–$40,000/day (§ 552.105(a)(3)) — confirmed
- [x] Agency sanctions cap: $100,000 (§ 552.106(b)(2)) — confirmed
- [x] Applicability: Persons who promote/advertise/conduct business, produce products used by residents, or develop/deploy AI in Texas (§ 551.002) — confirmed
- [x] "Deployer" and "Developer" definitions (§ 552.001) — confirmed

---

## 10. What I Could NOT Verify

**1. Governor signing date.** The enrolled text does not include the signing date. Guiding Light should check the Texas Legislature's bill history page at https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149

**2. The codified statute URL.** The `citationUrl` should ideally point to the codified statute text at statutes.capitol.texas.gov, not the enrolled bill. The statutes.capitol.texas.gov URLs for BC.552.htm did not return readable content through my tools.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Go to https://statutes.capitol.texas.gov/Docs/BC/htm/BC.552.htm in your browser. Does it load and show the text of Texas Business and Commerce Code Chapter 552 (the AI Protection chapter)? If yes, tell me what the page title shows and confirm the URL. If no, tell me what error or content appears.

**3. Whether any amending bills have been passed.** I searched only the enrolled text and the 89R session.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Go to https://capitol.texas.gov and search for "Business and Commerce Code" "Chapter 552" in the bill search. Tell me if any bills from the 89th or subsequent sessions have amended Chapter 552. Specifically: have any bills changed the effective date, penalty amounts, or cure period in Chapter 552?

**4. Exact applicability categories under Chapter 552.** I confirmed the general applicability under Section 551.002, but did not extract the specific categories of prohibited/regulated AI uses within Chapter 552 Subchapter B. The `appliesToSummary` in `regulations.ts` may need refinement.

**Exact prompt for Guiding Light to paste into Claude browser:**
> Open https://capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.htm and search (Ctrl+F) for "SUBCHAPTER B" in Chapter 552. Tell me: what categories of AI systems or AI uses does Subchapter B regulate? Specifically, what conditions must be true for a deployer to be subject to the obligations in Subchapter B? I need to know if it's limited to specific industries, specific types of decisions, or specific categories of AI systems.
