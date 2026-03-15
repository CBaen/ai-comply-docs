# Browser Claude Audit Round 4 — 2026-03-15
## 8 sessions, comprehensive findings

## CRITICAL ERRORS TO FIX

1. **NYC LL144 first violation: $375 in penalties blog — should be $500** (§20-872(a))
2. **Connecticut penalty: homepage groups at $7,500 with Virginia — should be $5,000** (CUTPA §42-110o)
3. **Minnesota penalty: overstated at $25,000 — statute caps at $7,500** (§325M.20(c))
4. **NYC "$1,500 per violation per day" headline misleading** — first violation is $500, subsequent $500-$1,500
5. **IDHR rules-pending flag MISSING from IL product pages** — despite being in generators, not visible on product pages
6. **Add-ons showing "Coming Soon" on parent product pages** — they're live and purchasable now
7. **Review pages returned 404** — /review-docs-* URLs not resolving for browser Claude

## HIGH PRIORITY FIXES

8. Oregon citation range overbroad (§§646A.570-604 includes unrelated sections; should end at 646A.589)
9. Oregon penalty citation wrong (cites §646.642 but should cite §646A.589)
10. EU penalty tier incomplete (shows €15M/3% only; should note €35M/7% for prohibited AI)
11. Document count inconsistencies: Healthcare (8 header vs 6 questionnaire), Financial (8 vs 7), Minnesota (6 vs 5)
12. NYC product descriptions don't mention intersectional testing requirement
13. NYC §5-303 published summary elements not enumerated in product descriptions
14. og:image missing from product pages and blog post meta tags (schema has it but og: meta doesn't)
15. FAQ schema answers have minor word-level drift from visible text
16. Organization schema missing logo field

## MEDIUM PRIORITY

17. IL HB3773 description scope too narrow ("job candidates" — misses post-hire employees)
18. IL Human Oversight Protocol and Accommodation Request Form not grounded in §2-102(L)
19. CO Dev-Deploy Exchange Kit "applies to" should mention developers, not just deployers (may already be fixed)
20. CO AG Reporting Kit should note developers must also notify known deployers, not just AG
21. CO affirmative defense should mention ISO 42001 alongside NIST AI RMF
22. Healthcare COPPA inclusion needs agency distinction (FTC vs HHS/OCR)
23. EEOC product ADEA threshold is 20+ employees, not 15+
24. VA add-on descriptions need more detail on what core package covers
25. Multi-State Bundle should flag it doesn't cover NYC bias audit/public posting

## PASS (Confirmed Accurate)
- All statute citations correct (IL, CO, CA, VA)
- All effective dates correct
- IL penalty tiers ($16K/$42.5K/$70K) accurately stated on product pages
- CO 90-day AG notification language and developer/deployer distinction
- CO effective date June 30, 2026 (SB25B-004)
- CA CCPA penalty ($2,500/$7,500) correct
- VA statute ends at §59.1-584 (not 585) — correctly cited
- VA enforcement (AG exclusive, 30-day cure, $7,500) correct
- Sitemap has all 74 URLs
- robots.txt correctly allows all AI crawlers
- llms.txt lists all 53 products
- Search bar works correctly
- Product schema (price, availability, brand, seller, url) correct
- BlogPosting schema correct with image
