# Browser Claude Content Audit Prompts
## 10 sessions covering all 53 products

Use these prompts one at a time in Claude in your browser. Each session audits one group of products.

---

## Session 1: Illinois (3 products)

Visit https://aicompliancedocuments.com/review-docs-il-7x2m

For each product shown (Illinois HB3773, IL Notice Response Kit, IL Zip Proxy Audit):
1. Check every statute citation against the enacted text at https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm
2. Verify the penalty amounts match 775 ILCS 5/8A-104 ($16K/$42.5K/$70K tiers)
3. Verify the effective date (January 1, 2026)
4. Check that the "applies to" summary matches the statute's applicability provisions
5. Verify the citation URL works and goes to the actual statute text
6. Check that the document list matches what a customer would need to comply

Report any discrepancies with the specific wrong value and the correct value from the statute.

---

## Session 2: Colorado (4 products)

Visit https://aicompliancedocuments.com/review-docs-co-9k4p

For each product (Colorado SB24-205, CO Appeal & Correction Kit, CO AG Reporting Kit, CO Dev-Deploy Exchange):
1. Check citations against https://leg.colorado.gov/bills/sb24-205
2. Verify effective date is June 30, 2026 (extended by SB25B-004)
3. Verify penalty structure (tiered: $10K-$12K curable, $80K-$200K uncurable, 60-day cure)
4. Verify the developer/deployer distinction is accurately described
5. Check the affirmative defense description mentions NIST AI RMF
6. Verify citation URLs work

---

## Session 3: California (4 products)

Visit https://aicompliancedocuments.com/review-docs-ca-3m8n

For each product (CA CCPA ADMT, CA ADMT Notice/Opt-Out, CA ADMT Access Kit, CA Cyber Audit):
1. Check citations against https://cppa.ca.gov/regulations/ccpa_updates.html
2. Verify risk assessment requirements are effective January 1, 2026
3. Verify ADMT notice/opt-out requirements effective January 1, 2027
4. Verify penalty amounts ($2,500 standard, $7,500 intentional per violation)
5. Check that CalPrivacy (CPPA) is correctly identified as the enforcing agency
6. Verify citation URLs work

---

## Session 4: NYC (3 products)

Visit https://aicompliancedocuments.com/review-docs-nyc-5j7w

For each product (NYC LL144, NYC Bias Audit Management, NYC Candidate Notice Kit):
1. Check citations against https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524
2. Verify penalty structure ($500 first violation, $500-$1,500 subsequent, per violation per day)
3. Verify annual bias audit requirement
4. Verify public posting requirement for audit results
5. Check that DCWP is identified as the enforcing agency
6. Verify the intersectional testing requirement is mentioned

---

## Session 5: Virginia (4 products)

Visit https://aicompliancedocuments.com/review-docs-va-2r6t

For each product (VA CDPA, VA Consumer Rights Kit, VA Profiling Assessment, VA Controller-Processor):
1. Check citations against https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/
2. Verify effective date (January 1, 2023)
3. Verify penalty amount ($7,500 per violation)
4. Verify AG-exclusive enforcement with 30-day cure period
5. Verify data protection assessment requirements match §59.1-580
6. Verify citation URLs work

---

## Session 6: EU AI Act (5 products)

Visit https://aicompliancedocuments.com/review-docs-eu-6w1x

For each product (EU AI Act, EU FRIA Kit, EU Post-Market Kit, EU Human Oversight Kit, EU Registration/Transparency):
1. Check citations against https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689
2. Verify ALL penalty tiers: €35M/7% (prohibited), €15M/3% (obligations), €7.5M/1.5% (misinformation)
3. Verify August 2, 2026 deadline for high-risk system obligations
4. Verify February 2, 2025 for prohibited practices
5. Verify August 2, 2025 for GPAI obligations
6. Verify extraterritorial applicability is mentioned

---

## Session 7: Federal & Industry (5 products)

Visit https://aicompliancedocuments.com/review-docs-federal-1p5z

For each product (EEOC AI Hiring, NIST AI RMF, Healthcare AI, Financial Services AI, AI Governance Framework):
1. For EEOC: verify Title VII (15+ employees), ADA (15+), ADEA (20+ employees) thresholds
2. For NIST: verify it's described as a voluntary framework, not a law
3. For Healthcare: verify HIPAA penalties are accurate (check tiers at https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html)
4. For Financial: verify ECOA/FCRA/CFPB citations
5. For Governance: verify NIST AI RMF alignment claim
6. Check all citation URLs work

---

## Session 8: State Privacy Laws Group 1 (4 products)

Visit https://aicompliancedocuments.com/review-docs-states1-8h3q

For each product (Connecticut CTDPA, Oregon CPA, Minnesota MCDPA, Montana MCDPA):
1. Verify each state's effective date against the enacted statute
2. Verify penalty amounts and enforcement mechanism
3. Verify applicability thresholds (consumer count, revenue percentage)
4. Verify citation URLs go to the actual statute text
5. Check that data protection assessment requirements are accurately described

---

## Session 9: State Privacy Laws Group 2 (5 products)

Visit https://aicompliancedocuments.com/review-docs-states2-4n9v

For each product (Indiana ICDPA, Kentucky KCDPA, New Jersey NJDPA, Delaware PDPA, Texas TDPSA):
1. Same checks as Session 8
2. Pay special attention to Texas — verify it's the TDPSA (consumer privacy), not TRAIGA (AI governance)
3. Verify Delaware's low threshold (35,000 consumers)
4. Check all citation URLs work

---

## Session 10: Universal Tools & Add-Ons (16 products)

Visit https://aicompliancedocuments.com/review-docs-universal-7c2b

For each product:
1. Since these aren't tied to a single statute, verify the framework references are accurate
2. For Employee AI Policy: verify NIST AI RMF reference
3. For Bias Audit Template: verify EEOC/LL144 reference
4. For Multi-State bundles: verify they list the correct states covered
5. For add-on products (Manager Kit, Annual Review, Board Summary, Consumer Notice, Data Mapping, Consumer Rights): verify the descriptions match what the product actually provides
6. Check all citation URLs work

---

## What to Report

For each session, report:
- **Product slug**
- **Issue found** (wrong number, wrong citation, broken URL, missing information)
- **Current value** (what the site says)
- **Correct value** (what the statute says, with section number)
- **Severity** (CRITICAL = wrong legal data customers rely on, HIGH = misleading, MEDIUM = incomplete)

If everything checks out for a product, just say "PASS" with a note of what you verified.
