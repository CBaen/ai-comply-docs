# Research Council Brief: Legal Audit of AI Comply Docs Products & Copy
## Date: 2026-03-12
## Project: AI Comply Docs (aicomplydocs.com)

### The Question
Are our product descriptions, PDF generator content, blog posts, email templates, and legal citations accurate enough to withstand scrutiny from a plaintiff's attorney looking for misrepresentation? We sell compliance document templates — any inaccuracy in our own legal references could expose us to liability and destroy customer trust.

### Expected Outcome
Confidence that every legal citation, penalty amount, effective date, enforcement agency, statute reference, and product claim is:
1. Factually accurate and verifiable against primary sources
2. Not overstating what our templates provide
3. Adequately disclaimed as "not legal advice"
4. Not construable as unauthorized practice of law

### Current State
- 6 purchasable products (2 state-specific: IL, CO; 4 universal: Employee AI Policy, Vendor Due Diligence, Bias Audit, Incident Response)
- 16 additional product pages visible but not yet purchasable (descriptions still need audit)
- 6 blog posts with legal claims and regulatory references
- PDF generators contain substantial legal content (statute citations, requirements descriptions, compliance frameworks)
- Email templates describe what customers received and next steps
- Questionnaire configs contain help text with legal references

### Project Fingerprint
- Runtime: Next.js 16.1.6 (App Router, Turbopack), React 19, TypeScript
- Key dependencies: jsPDF v4 (client-side PDF generation), Stripe SDK, Resend (email), Tailwind CSS v4
- Architecture: SSG with "use client" interactive components; PDF generators are pure functions (ComplianceFormData → jsPDF)
- State management: React useState, sessionStorage for Stripe redirect bridge
- Database/Storage: None — all data is ephemeral (sessionStorage + Stripe sessions)
- Known constraints: Legal product — .gov source verification mandatory (lessons-learned.md). All generators must include disclaimers. No legal advice claims.
- Prior failed approaches: Earlier instance wrote citations from training knowledge without verification — caught wrong protected class list in CO statute from a PROPOSED AMENDMENT (lessons-learned.md)
- Active boundaries: Do not change product functionality. Audit only — report findings for remediation.

### Constraints
- Business sells compliance TEMPLATES, not legal advice
- Every document must disclaim: not legal advice, consult an attorney
- Citations must be verifiable against .gov primary sources
- Penalty amounts must match enacted statutes, not proposed amendments
- Product descriptions must not promise legal compliance — only documentation assistance

### Destructive Boundaries
- Do NOT modify any code during this audit
- Do NOT change product pricing or structure
- This is a READ-ONLY audit with written findings

### Failed Approaches
- Prior instance cited "sexual orientation, gender identity" as CO protected classes from a PROPOSED AMENDMENT — the enacted text doesn't include those terms. Training knowledge and secondary sources are unreliable for legal citations.

### Codebase Files for Analysis

**Product data & config (all products):**
- `src/data/regulations.ts` — all 22 product definitions (citations, penalties, descriptions, effective dates)
- `src/lib/regulation-config.ts` — questionnaire help texts with legal references
- `src/lib/pdf-helpers.ts` — document header configs (statute strings)
- `src/app/api/send-documents/route.ts` — email template content

**PDF generator content (spot-check for legal claims in body text):**
- `src/lib/pdf-employee-ai-policy/acceptable-use-policy.ts`
- `src/lib/pdf-vendor-due-diligence/due-diligence-questionnaire.ts`
- `src/lib/pdf-vendor-due-diligence/contract-addendum.ts`
- `src/lib/pdf-bias-audit/bias-audit-report.ts`
- `src/lib/pdf-incident-response/incident-response-plan.ts`
- `src/lib/pdf-illinois/notification-letter.ts`
- `src/lib/pdf-colorado/risk-management-policy.ts`
- `src/lib/pdf-colorado/consumer-notice.ts`

**Blog posts (all legal claims and citations):**
- `content/blog/ai-compliance-small-business.mdx`
- `content/blog/colorado-ai-law-penalties.mdx`
- `content/blog/colorado-sb24-205-guide.mdx`
- `content/blog/does-colorado-ai-law-apply-to-me.mdx`
- `content/blog/how-to-write-ai-impact-assessment.mdx`
- `content/blog/what-is-illinois-hb3773.mdx`

### External Research Angles
1. **Verify every citation against primary .gov sources** — statute numbers, section references, penalty amounts, effective dates, enforcement agencies. Cross-reference against actual enacted law text.
2. **Unauthorized practice of law (UPL) risk** — What constitutes UPL in the states we operate in? Do our disclaimers adequately protect us? Are there template-specific UPL cases?
3. **FTC/consumer protection exposure** — Could our product descriptions be construed as deceptive trade practices? Are we making implied promises about compliance outcomes?
