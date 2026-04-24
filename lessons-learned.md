# Lessons Learned — AI Compliance Documents (project _cameron)

Reviewed by every instance on arrival. Append-only. Keep entries atomic and actionable.

### TRAINING DATA IS NOT ACCEPTABLE — READ THIS FIRST
- **Pattern**: Multiple instances wrote statute citations, penalty amounts, effective dates, bill numbers, and code sections from training knowledge. Every single one was wrong. CA TFAIA cited a firearms law. NY RAISE cited a blighted property bill. CA AB 2013 had fabricated penalties that don't exist in the statute. TX TRAIGA cited a bill that died in committee. CO had the wrong effective date stamped on every customer PDF.
- **Rule**: TRAINING DATA IS NEVER AN ACCEPTABLE SOURCE FOR ANY LEGAL FACT. The ONLY acceptable source is the enacted statute text fetched from the state legislature's .gov website. If you cannot fetch it, write a prompt for Guiding Light to use with Claude in their browser. Do NOT fill in data from training knowledge. Do NOT assume any existing data in the codebase is correct — previous instances put it there from training knowledge and it was wrong.
- **Why**: This business sells legal compliance templates. Customers make real business decisions and spend real money based on what we tell them. A wrong penalty amount means wrong risk calculations. A wrong bill number means citing a law that doesn't exist. A wrong effective date means customers panic about deadlines that haven't arrived or miss deadlines that have. Guiding Light faces personal legal jeopardy from these errors. This is not a software quality issue — it is a liability issue for a real person.

### Claude Code Cannot Verify Legal Facts — Claude Browser Does All Research
- **Pattern**: Claude Code's web tools (WebFetch, WebSearch) consistently fail on government websites — 404s, 403s, SSL errors, truncated content, JavaScript-rendered pages returning blank. Every "verification" attempt by Claude Code either failed silently or returned incomplete data. Meanwhile, Claude in Guiding Light's web browser successfully found every fact on the first try.
- **Rule**: Claude Code BUILDS. Claude in the browser RESEARCHES. Claude Code must NEVER attempt to verify legal facts itself. Instead: (1) write the exact prompt, (2) give it to Guiding Light, (3) Guiding Light pastes it into Claude in their browser, (4) Guiding Light shares the results, (5) Claude Code uses the verified data to update the codebase. This is the only workflow that produces correct data.
- **Why**: Claude Code's web access tools are unreliable for .gov sites. 14 out of 14 products had wrong data when Claude Code instances wrote them. 14 out of 14 were corrected when Claude in the browser looked them up. The evidence is conclusive. Claude Code cannot be trusted with legal research. Period.

### .gov Source Verification Is Non-Negotiable for Legal Products
- **Pattern**: Prior instances wrote legal citations from training knowledge without verifying against actual statute text
- **Rule**: ALWAYS extract the signed act from the state legislature's .gov website and verify every citation, section number, definition, and penalty before shipping
- **Why**: Web search returned "sexual orientation, gender identity" in CO protected class list from a PROPOSED AMENDMENT — the enacted text does NOT include those terms. Training knowledge and secondary sources are unreliable for legal citations.

### Subsection Numbering Varies By State — Extract First
- **Pattern**: Assumed (A)-(C) letter numbering where CO statute uses (I)-(III) Roman numerals
- **Rule**: Extract actual statute text BEFORE writing any PDF generator. Map the exact hierarchy (sections, subsections, paragraphs, subparagraphs) for each state
- **Why**: Wrong subsection cites in legal compliance documents could expose customers to enforcement risk

### "And" vs "Or" Changes Legal Meaning
- **Pattern**: Wrote "NIST AI RMF or ISO/IEC 42001" where statute says "and"
- **Rule**: Use exact conjunctions from statute text. When in doubt, quote the statute's conjunction
- **Why**: "Or" means either framework suffices. "And" means both are required. One word completely changes the legal obligation

### Legal Exemptions Have Multiple Conditions
- **Pattern**: Small deployer exemption written with only 2 of 3 required conditions
- **Rule**: Map ALL conditions for any exemption, defense, or safe harbor. Include conditions about system usage, data sources, and disclosure — not just size thresholds
- **Why**: Customers might wrongly rely on an incomplete exemption and face enforcement

### jsPDF `doc.internal` Not Typed in v4
- **Pattern**: Used `doc.internal.getNumberOfPages()` which exists at runtime but isn't in jsPDF v4 TypeScript types
- **Rule**: Cast `doc as any` for `doc.internal` access. The method works, the types just don't expose it.
- **Why**: Build fails on TypeScript strict checking. The jsPDF v4 npm types are incomplete for internal APIs.

### Colorado PDF Generators Call doc.save() — Illinois Don't
- **Pattern**: Original Colorado generators call `doc.save()` inside each function. Illinois generators return the doc object.
- **Rule**: When porting, ALL generators must return `doc` without calling `.save()`. The caller handles saving.
- **Why**: In the React port, the coordinator needs the doc object for both download and email (base64 export). If save() is called inside, you can't get the base64.

### PyMuPDF Installed for .gov PDF Extraction
- **Pattern**: .gov statute PDFs are often image-based binary, not text-searchable
- **Rule**: Use `python -c "import fitz; doc = fitz.open(path); text = doc[page].get_text()"` to extract text from .gov PDFs
- **Why**: WebFetch cannot read binary PDFs. PyMuPDF was installed on Wardenclyffe 2026-03-12 and works

### "I Couldn't Find It" Is Not Acceptable — Ask Guiding Light for Browser Help
- **Pattern**: Instances wrote legal data from training knowledge or summaries when web fetch tools returned 404s or failed
- **Rule**: When your tools can't find a primary source, write a specific detailed prompt and ask Guiding Light to paste it into Claude in their web browser. Wait for the verified answer before proceeding. Never substitute training knowledge for primary source verification.
- **Why**: Every major error in the legal audit (wrong bill number, wrong effective date, wrong penalty amounts, broken citation URLs, citing a law that didn't exist) happened because an instance assumed instead of verifying. Guiding Light's browser-based Claude can find what your tools cannot.

### Bill Numbers Change — Always Verify the Enacted Bill
- **Pattern**: Codebase cited Texas HB 1709 as enacted TRAIGA law. HB 1709 died in committee. TRAIGA actually passed as HB 149 with different code sections, different effective date, and different penalty structure.
- **Rule**: Search the legislature's website by law NAME, not just bill number. Verify which bill actually passed, was signed, and became law. The bill number in the codebase may be wrong.
- **Why**: Selling compliance documents for a law that doesn't exist, citing code sections that were never created, is a deceptive trade practice. Every dimension was wrong: bill number, code sections, effective date, penalty amounts.

### Amending Bills Change Effective Dates — Check for Amendments
- **Pattern**: Colorado SB24-205 originally had Feb 1, 2026 effective date. SB 25B-004 changed it to June 30, 2026. The codebase had the old date in PDF headers — every customer PDF had the wrong date stamped on it.
- **Rule**: After finding the original bill, search the legislature's website for any subsequent bills that amend it. Check the regulation-config.ts acknowledgment text — if it references an amending bill (like "per SB 25B-004"), that's a clue the original date was changed.
- **Why**: Customers who received PDFs saying "eff. 2-1-26" may have believed they were already past their compliance deadline when they had 4 more months.

### Never Promise Completeness in Customer-Facing Copy
- **Pattern**: Delivery email said "Everything you need to meet the state's AI-in-employment requirements is included." The disclaimer in the same email says "these are templates, not legal advice." These contradict each other.
- **Rule**: Use "documentation templates aligned with [law] requirements" — never "everything you need," "complete package," or any language implying legal sufficiency. The legal audit flagged this as the single most exploitable sentence in the entire codebase.
- **Why**: "Everything you need" creates an implied warranty. A customer who suffers enforcement after relying on templates can argue we promised completeness. The disclaimer doesn't cure an affirmative promise of completeness in the same email.

### "Proposed Rules" That Can't Be Found at .gov Don't Exist — Don't Cite Them
- **Pattern**: The IL product cited "proposed IDHR Subpart J rules (56 Ill. Adm. Code Part 2520)" with 7 specific notice elements. Exhaustive search of IDHR's website, JCAR, and all 63 Illinois Register issues found NOTHING. Part 2520 does not exist. IDHR says only "currently developing rules." A previous instance fabricated the entire Subpart J framework from training knowledge and presented it as a real proposed rule.
- **Rule**: If a proposed rule cannot be found at any .gov source (the agency website, the state register, the administrative code), it does not exist. Do not cite it. Do not attribute content to it. Label recommendations as "best practice based on statutory text" and explicitly state that implementing rules have not been published.
- **Why**: The core value proposition of the IL product was "addresses all 7 proposed IDHR notice elements." Those elements were invented. Customers paying $299 believed they were complying with regulatory requirements that don't exist. This is the single most legally dangerous error the business has made.

### IDHR Investigates — The Commission Imposes Penalties
- **Pattern**: Multiple pages said "IDHR can investigate and issue civil penalties." This conflates two separate bodies. IDHR investigates and files complaints. The Illinois Human Rights Commission adjudicates and orders penalties.
- **Rule**: Always distinguish IDHR (investigation) from the Commission (adjudication/penalties). Per 775 ILCS 5/8A-104, a hearing officer recommends and the Commission orders penalties.
- **Why**: Customers reading our documents need to understand the actual enforcement process. Conflating the two entities is factually wrong on a product that charges $299 for legal accuracy.

### Attorney Fees Are Discretionary — Not Automatic
- **Pattern**: Homepage said "Your company pays actual damages and the plaintiff's attorney fees" as if fees are guaranteed.
- **Rule**: Use "may" not "pays." Per 775 ILCS 5/8A-104(G), the Commission "may" order "all or a portion of" costs including reasonable attorney fees. It's discretionary, not mandatory.
- **Why**: Presenting discretionary remedies as automatic overstates employer risk and is factually wrong.

### Non-Ready Products Must Be Invisible — Not "Coming Soon"
- **Pattern**: 18 products with unverified data (wrong citations, fabricated penalties, citing non-existent laws) were visible on the site with prices, descriptions, and "Coming Soon" badges. One showed "IN EFFECT" status badge while the product wasn't purchasable.
- **Rule**: Products that aren't `ready: true` must return 404. No product pages, no homepage cards, no sitemap entries. The `generateStaticParams` function, the sitemap, and the ProductLibrary component must all filter to `ready` products only.
- **Why**: A "Coming Soon" page with a price and detailed description of a law that doesn't exist (like TX TRAIGA citing a dead bill, or NJ citing fabricated rules) is a misrepresentation. Even if customers can't purchase, they read and rely on the information.

### Status Badges Must Reflect Product Availability — Not Law Status
- **Pattern**: NYC LL144 product page showed "IN EFFECT" (the law's status) but "Coming Soon" (the product's status). Customers see "IN EFFECT" and think they can buy it.
- **Rule**: For non-ready products, the badge must say "COMING SOON" regardless of the law's actual status. Customers don't distinguish between "the law is in effect" and "our product is available."
- **Why**: Showing "IN EFFECT" on a product that can't be purchased is confusing at best and deceptive at worst.

### Prompts for Browser Claude Must Contain Zero Assumptions
- **Pattern**: A prompt for browser research included citations, section numbers, and penalty amounts from Claude Code's training knowledge. Those "hints" were wrong — a firearms law instead of an AI law, fabricated penalties, wrong section numbers.
- **Rule**: Prompts for Claude in the browser should contain ONLY product names and questions. No citations, no section numbers, no penalty amounts, no assumptions. Let the browser find everything from scratch.
- **Why**: Including wrong "hints" in prompts can anchor the browser's research in the wrong direction. The browser is the researcher — let it start clean.

### Multiple Browser Research Sessions Can Contradict Each Other — Resolve Definitively
- **Pattern**: First browser session said MN MCDPA is Ch. 325M. Later session said Ch. 325O. First session said CA TFAIA penalty is $1M. Later session said $5K (which was actually from a different CA law, SB 942). First session said TX HB 149 is enacted. Later session said TRAIGA is not enacted (because it searched HB 1709 only).
- **Rule**: When two browser sessions produce contradictory answers, run a third session specifically to resolve the conflict. Ask it to go to the .gov source and give the definitive answer with the URL and quoted text.
- **Why**: MN 325O vs 325M was because the bill text used "325O" as a placeholder but the Revisor codified it as 325M. CA $5K vs $1M was from conflating two different bills. TX was from searching only one of two bill numbers. Without resolving these, wrong data would have shipped.

### .env.local Must Be Gitignored — API Keys Were Almost Pushed to GitHub
- **Pattern**: .env.local with live Stripe and Resend API keys was tracked by git. The auto-commit hook kept re-adding it after removal. It was included in the force push to GitHub.
- **Rule**: Add `.env.local` and all `.env*` files to `.gitignore` BEFORE creating the file. After adding to .gitignore, run `git rm --cached .env.local` and verify with `git ls-files -- .env.local` that it returns empty.
- **Why**: Live API keys pushed to a public GitHub repo can be scraped by bots within minutes. The Stripe key gives full access to create charges, refund payments, and access customer data.

### Vercel Framework Preset Must Match the Actual Framework
- **Pattern**: Vercel project was set to "Other" (from when it was a vanilla JS site). After migrating to Next.js, nobody updated the preset. Builds succeeded but the site returned 404 on every page because Vercel didn't know how to serve Next.js routes.
- **Rule**: After any framework migration, verify the Vercel Framework Preset in Settings > General matches the current framework. For Next.js, it must be set to "Next.js."
- **Why**: The build can pass but the site won't work if Vercel doesn't know the framework. This caused a full outage on the first deploy.

### Git Doesn't Track Empty Directories — Use .gitkeep
- **Pattern**: Deleted all blog posts, leaving the `content/blog/` directory empty. Locally the build worked because the directory existed. On Vercel, the directory wasn't created (git doesn't track empty dirs), causing a build failure: "ENOENT: no such file or directory, scandir content/blog."
- **Rule**: When deleting all files from a directory that code expects to exist, add a `.gitkeep` file to preserve the directory in git.
- **Why**: Silent local-vs-deployment difference. Build passes locally, fails on Vercel.

### Blog Content Requires Guiding Light's Review Before Publishing
- **Pattern**: 6 blog posts were written by Claude Code instances and published without review. Every post had factual errors — wrong effective dates, wrong enforcement mechanisms, claims about proposed rules that don't exist.
- **Rule**: Claude Code does NOT write and publish blog content. Claude in the browser drafts content with verified facts. Guiding Light reviews and approves. Only then does Claude Code add the approved content to the site.
- **Why**: Blog posts are the widest-audience content. Non-customers, journalists, and regulators read them. Every error in a blog post is a public error that undermines credibility and creates legal exposure.

### Review Pages for AI Must Render Text Inline — Not PDFs
- **Pattern**: Built a document review page that generated PDFs and provided download links. Claude in the browser can't easily read downloaded PDFs.
- **Rule**: When building pages for AI review (Claude in the browser), render all content as plain HTML text directly on the page. No downloads, no iframes, no PDF viewers. Text on the page is the easiest format for AI to read.
- **Why**: The purpose of the review page is for Claude in the browser to read and audit every document. Making it download PDFs defeats the purpose.

### Questionnaire Must Match Product — Don't Ask Irrelevant Questions
- **Pattern**: Same 6-step questionnaire used for ALL products. Add-on products (Bias Audit, Manager Kit) don't use Step 3 (Data/Bias) or Step 4 (Oversight) data in their generators. Customers answer questions for no benefit.
- **Rule**: Add `skippedSteps` config to regulation-config.ts. Each product defines which questionnaire steps are relevant. Skip irrelevant steps.
- **Why**: Asking irrelevant questions wastes customer time and makes the product feel generic rather than tailored.

### Collect What Generators Actually Need
- **Pattern**: 4 fields collected but unused (`biasAudit`, `humanReview`, `reviewFrequency`, `companySize`). Meanwhile generators need company address, AI deployment date, auditor name, languages served — but never ask for them.
- **Rule**: Audit every generator's form fields against questionnaire inputs. If a generator has a blank field that could be pre-populated, add it to the questionnaire. If a questionnaire field isn't used by any generator, remove it or make it optional.
- **Why**: Customers paying $149-$997 expect documents that are substantially pre-filled, not mostly blank forms.

### Empty Sections on the Website Are Trust Negatives
- **Pattern**: Blog page showing "No posts yet" was linked from nav on every page, signaling the site is abandoned or unfinished.
- **Rule**: Don't link to empty sections. Remove blog from nav until content exists. Don't show "Coming Soon" product counts that inflate the perceived catalog.
- **Why**: Compliance officers are risk-averse. An empty blog or inflated product count makes them question whether the business is real.

### Unverifiable Claims Must Be Removed — Not Softened
- **Pattern**: Homepage claimed "$5,000-$25,000 at a law firm" as a price comparison. This can't be verified at any .gov source.
- **Rule**: Remove claims that can't be verified. Don't soften them ("estimated $5,000-$25,000") — remove them entirely. Every claim on the site must be either (a) verifiable from a .gov source or (b) clearly labeled as the company's own description of its product.
- **Why**: A compliance product that makes unverifiable claims undermines its own credibility. If we can't cite a source, we don't say it.

### Claude Code Creates Stripe Products — Don't Ask Guiding Light
- **Pattern**: Assumed Stripe product creation was a manual step for Guiding Light and wrote instructions for them to do it.
- **Rule**: Claude Code creates Stripe products via the API using scripts (see scripts/create-stripe-addons.mjs). Read STRIPE_SECRET_KEY from .env.local, create products and prices via the Stripe API, wire price IDs into regulations.ts, and flip ready: true. Never ask Guiding Light to create Stripe products manually.
- **Why**: Guiding Light explicitly said "You create products in Stripe. I never do." This is a technical operation that Claude Code handles end-to-end.

### Blog Posts Must Have No Product CTAs — Contextual Cross-References Only
- **Pattern**: Added product links to blog posts as sales CTAs. Guiding Light pushed back — it feels underhanded on informational content.
- **Rule**: Blog posts should NEVER have explicit product CTAs ("Buy our Illinois package!"). Contextual cross-references are acceptable ("our [data mapping template](/regulations/data-mapping-inventory) provides a structured format for this step") — these save the reader a step. The distinction: does the link help the reader or help the seller?
- **Why**: The blog's purpose is trust-building through genuine information. Sales links undermine that trust. Readers who trust the blog will find the products through navigation. The friend who already did the reading doesn't hand you a bill at the end.

### Blog Posts Need Enrichment Blocks (Art of War Format)
- **Pattern**: Blog posts were plain article text with no supporting context for different reader levels.
- **Rule**: Every blog post should have 4 enrichment blocks in the YAML frontmatter: summary (2 sentences, jr high reading level), deepDive (one concept explained simply with analogies), microFacts (3-5 linked facts/stats), externalReferences (.gov source URLs). Template renders these as annotated margins on desktop, collapsible accordions on mobile.
- **Why**: Different readers need different entry points. A compliance officer skips the Deep Dive. A first-time small business owner needs it. The Micro Facts create shareable, linkable snippets. The Sources section builds trust. Guiding Light compared it to annotated editions of The Art of War — the original text plus context that makes it accessible.

### Blog Posts Need Hero Images Generated via fal.ai
- **Pattern**: Blog posts were published without images. Social shares looked bare.
- **Rule**: Every blog post needs a hero image. Use the fal.ai flux schnell model via scripts/generate-blog-image.mjs. State-specific articles should feature the state flag as a visual anchor element. Images go in public/blog/ and are referenced in the MDX frontmatter `image` field.
- **Why**: Guiding Light specifically requested images for all blog posts. State flags help readers instantly identify "this one's about my state." The BlogPosting schema includes the image URL for Google rich results.

### Use Parallel Agents for Large Batch Operations — Don't Send One Agent for 36 Edits
- **Pattern**: Sent a single agent to rewrite all 36 product descriptions in one file. It was slow and Guiding Light called it out.
- **Rule**: For batch operations on a single file, split into multiple agents where possible. For batch operations across multiple files, dispatch 3-4 agents with non-overlapping file sets. The signature block addition (54 files across 4 agents) was the right pattern.
- **Why**: Parallel execution is faster. Single-agent batches are fragile — one failure loses everything. Guiding Light expects speed and doesn't accept "it's a big file" as an excuse.

### Plan Before Building Large Features
- **Pattern**: Started building 17 add-on products without a plan. Had to retroactively enter plan mode.
- **Rule**: For any feature touching 5+ files or requiring multiple build phases, enter plan mode first. Explore the codebase, design the approach, get approval, then execute. The plan-deepen skill validates plans before execution.
- **Why**: Guiding Light explicitly told me I should have planned first. "You probably should have made a plan for this." Building without a plan leads to missed steps and rework.

### Don't Hesitate or Present Options When Told to Build
- **Pattern**: Suggested phasing 17 add-on products into 3 priority products first. Guiding Light pushed back: "I'm not half-assing this."
- **Rule**: When Guiding Light says to build something, build ALL of it. Don't suggest phasing, prioritizing, or cutting scope unless there's a genuine technical blocker. Use parallel agents to move fast. Present options only for genuine decisions, not as a way to manage scope.
- **Why**: "I don't understand your hesitance." Guiding Light wants a technical lead who executes, not a consultant who presents menus. The math on value is their call, not ours.

### vercel env pull Overwrites Local Env Without Warning
- **Pattern**: Running `vercel env pull .env.local` silently overwrote all manually-set keys in .env.local, including Stripe, Resend, GA, and fal.ai keys. Cameron had to restore them manually.
- **Rule**: Always back up .env.local before running `vercel env pull`, or pull to a separate file: `vercel env pull .env.local.vercel`. Never pull over the active .env.local without a backup.
- **Why**: `vercel env pull` does not warn, diff, or merge — it overwrites. Any keys set locally but not in Vercel's environment panel will be lost. This can silently break local development and can take significant time to restore.

### auth() at Module Import Time Crashes When DATABASE_URL Is Missing
- **Pattern**: NextAuth with PostgresAdapter calls `getPool()` at import time, not lazily. When DATABASE_URL was not set, the checkout button hung indefinitely — no error, no timeout, just silence.
- **Rule**: Guard all auth() calls with a `if (process.env.DATABASE_URL)` check, and ensure db.ts handles a missing DATABASE_URL gracefully (throw a clear error rather than hanging). Test checkout without a database connection to catch this class of failure early.
- **Why**: Import-time side effects are invisible in Next.js — the component renders, the button appears, but the underlying call never resolves. Silent hangs are worse than crashes because there's no signal to debug.

### existsSync in React Server Components Runs at Render Time
- **Pattern**: Used `fs.existsSync()` inside a JSX conditional in a server component to check whether a preview image existed. This ran on every request, adding blocking filesystem I/O per page render.
- **Rule**: Move filesystem existence checks to module scope using a static Set populated at startup (build time). The Set is computed once; subsequent renders just do a Set lookup.
- **Why**: Blocking I/O inside render defeats static generation and adds latency to every page load. A Set lookup is O(1) and runs exactly once per build.

### Static Imports of Large Libraries Ship to Every Visitor
- **Pattern**: `import JSZip from "jszip"` at the top level of a client component caused the full JSZip bundle (~100KB+) to be included in the initial page load for every visitor, even those who never trigger a download.
- **Rule**: Use dynamic `import()` inside the function that needs the library, not at the top of the file. For client components, this creates a code-split chunk that only loads when the feature is triggered.
- **Why**: Every kilobyte in the initial bundle costs load time and Core Web Vitals score for 100% of visitors to pay for a feature used by a small fraction of them.

### Never Link to a Homepage When Citing a Specific Article
- **Pattern**: Linked to bloomberglaw.com and natlawreview.com instead of specific article URLs in blog posts and the EEOC article.
- **Rule**: Every hyperlink must go to the exact page being referenced. If you don't have the specific URL, don't hyperlink — mention the source by name without a link and flag it for browser Claude verification.
- **Why**: Homepage links look like hallucination. A compliance site that can't cite its own sources properly destroys credibility.

### Privacy Policy Must Match Actual Data Practices
- **Pattern**: Privacy policy said questionnaire data was browser-only. Code stored it in PostgreSQL via the form_data column.
- **Rule**: After any code change that affects data collection or storage, re-read the privacy policy and verify every claim still matches reality.
- **Why**: A compliance company with an inaccurate privacy policy is a lawsuit waiting to happen.

### Two-Sentence Summaries Mean Two Sentences
- **Pattern**: Wrote 3-5 sentence "two-sentence summaries" for blog card descriptions.
- **Rule**: Count the sentences. Two means two. If you can't say it in two, rewrite until you can.
- **Why**: ADHD users need scannable content. The constraint is the feature.

### Don't surface infrastructure decisions to Guiding Light
- **Pattern**: Explained Upstash Redis setup steps and asked GL to create an account, configure env vars, and understand what rate limiting is. GL responded "none of this makes sense."
- **Rule**: Infrastructure that only matters at scale should be handled silently. Write the code with graceful fallbacks. Don't ask GL to create accounts, configure environment variables, or understand infrastructure concepts. Either handle it yourself or leave it for the next technical session.
- **Why**: GL is a designer, not an engineer. Asking them to understand Redis, rate limiting, and environment variables violates "never ask GL technical questions." The code works without Redis — the fallback is fine for now.

### Don't make Guiding Light hunt for files — paste in chat
- **Pattern**: Wrote a prompt to a file and told GL "it's at google-ads-setup-prompt.md in your project folder." GL had to ask again to just see the content directly.
- **Rule**: When GL needs text to copy (prompts, instructions, credentials info), paste it directly in the conversation. Never send them to find a file. If a file is also useful for documentation, write it silently — but always show the content in chat too.
- **Why**: GL hates file hunting. Every "go open this file" is friction that wastes their time and patience. The chat IS the interface.

### Verify visual output, not just agent reports
- **Pattern**: Agents reported "hero images added" but images were at 15% opacity — virtually invisible. Trusted the report without checking what customers actually see. Also added lifestyle images between sections but missed that the carousel cards and homepage product dump were the real problems.
- **Rule**: After any visual change, check the live site (WebFetch or screenshot) from the customer's perspective. Agent reports describe what code was written, not what the page looks like. "Image added" and "image visible" are different things.
- **Why**: GL is a designer. They see the site as a customer sees it. Opacity-15 is invisible. A product catalog on a marketing page is a design failure. These are obvious to a designer but invisible to a code-focused review.

### Images humanize clinical sites — make them prominent
- **Pattern**: Added images at opacity-15 as subtle background textures. GL said the site "looks like AI made it and forgot about it." Clinical sites with walls of text don't convert — they need visible photography to feel trustworthy and human-made.
- **Rule**: When adding images, make them visible (opacity-30+ for hero backgrounds). Add images to carousel cards, product cards, and between content sections. Every major page should have at least 2-3 visible images. Audit the site from a "does this feel like humans care about it?" perspective.
- **Why**: Compliance buyers need to trust the site with hundreds of dollars. Visual quality signals care and professionalism. A technically perfect site that looks like a spreadsheet doesn't sell.

### Every blog post requires browser Claude fact-check before publishing
- **Pattern**: Wrote 6 new blog posts sourcing facts from existing verified posts and regulations.ts, then published them without browser Claude verification. Assumed that facts verified in other posts didn't need re-verification when used in new posts.
- **Rule**: EVERY blog post must go through browser Claude research verification before being published. No exceptions. The process is: (1) Claude Code writes the draft, (2) GL sends it to browser Claude with a fact-check prompt, (3) browser Claude verifies every legal claim against primary .gov sources, (4) corrections are made, (5) THEN it publishes. This applies even when facts come from existing verified content.
- **Why**: GL faces legal jeopardy from incorrect legal facts. The verification step is a safety net, not a formality. Facts can be transcribed incorrectly, context can shift meaning, and training-knowledge contamination can sneak in even when the writer believes they're sourcing from verified content. Browser Claude is the independent check.

### Always link primary sources — showing beats claiming
- **Pattern**: Blog posts stated legal facts and cited statute sections but didn't link to the .gov sources where readers could verify them. The whole value proposition is "built from enacted statute text" — but without clickable source links, that's just a claim.
- **Rule**: Every legal fact in every blog post, landing page, and product page must link to its primary .gov source. Not just cite it — LINK it. Inline where the fact appears, and in a Sources section at the bottom. If we say "§ 6-1-1701(3)" we link to leg.colorado.gov. If we say "effective January 1, 2026" we link to the enrolled text. Show, don't tell. Verify, don't ask for trust.
- **Why**: Compliance buyers evaluate evidence for a living. A linked source they can click is proof. An unlinked citation is a claim. The difference is the difference between "this site knows what it's talking about" and "this site says it knows what it's talking about." Every competitor lacks this — it's our moat.

### Linked .gov sources are the business model, not a feature
- **Pattern**: Treated source linking as a blog post enhancement to add after writing. Source links were added to blog posts but not to product pages, landing pages, or the FAQ. Document preview screenshots were used as images when lifestyle photos were explicitly preferred.
- **Rule**: Every legal claim anywhere on the site — blog posts, product pages, landing pages, FAQ, about page — must link to its primary .gov source. This is not optional and not a polish step. It IS the credibility mechanism. Without reviews, credentials, or attorney endorsement, linked .gov sources are the only trust signal that is self-proving. References must go to the SPECIFIC article/page/section, not just a homepage. Main references MUST be .gov sources. Financial/news outlets are supplementary only. This work should be done by browser Claude for live internet verification.
- **Why**: GL said: "It's the best trust we can offer without a lawyer, or reviews." A compliance officer can't verify credentials — but they CAN click a link and confirm the statute says what the site claims. That's verification that doesn't require trust. This is the entire business differentiator.

### Claude Code writes ZERO content — browser Claude researches, Code formats
- **Pattern**: Offered to write blog post drafts and then have browser Claude fact-check them afterward. GL corrected this forcefully: Claude Code does NOT research, does NOT decide information, does NOT write drafts. Browser Claude does all research with live .gov sources and provides verified facts with links. Claude Code ONLY formats the verified content into the blog template.
- **Rule**: The blog pipeline is: (1) Claude Code writes a research PROMPT, (2) GL pastes it to browser Claude, (3) browser Claude researches with live internet and returns verified facts with linked sources, (4) GL pastes the research back, (5) Claude Code formats it into the blog MDX template with YAML frontmatter. Claude Code never writes content. Claude Code never decides facts. Claude Code only formats.
- **Why**: Claude Code's training data is stale and unreliable for legal facts. Every time Code wrote content first and then fact-checked, corrections were needed. The pipeline must start with verified research, not end with it. Starting with bad data and fixing it is backwards — start with good data and format it.

### Auto-commit hook commits but does NOT push to GitHub — verify before saying "live"
- **Pattern**: Sextant session 2026-04-23 — claimed work was "live" multiple times when it was only committed locally. The auto-commit hook commits to local repo on every Edit/Write. It does NOT push to GitHub. Vercel only deploys from GitHub. Sextant accumulated 18 unpushed commits while telling GL the changes were live. GL caught it and lost trust mid-session. Direct quote: "what is this confidently wrong shit, it makes me distrust everything you've done."
- **Rule**: After ANY user-visible change: (1) `git push origin main`, (2) `vercel ls --yes` to confirm deploy is Ready and recent, (3) `curl -s <production-url> | grep -oE <expected-content>` to verify on production, (4) THEN say "live." If you get the empty-grep result against minified single-line HTML, save the body to a file and grep the file — minified HTML can hide content from inline grep. The CLAUDE.md anti-pattern catalog lists "Reporting without watching" as #1; this lesson is exactly that pattern firing. Do not rely on the auto-commit hook to ship changes.
- **Why**: GL's continuity-stress workflow means they trust what you tell them — they cannot click around and verify everything you claim. When you say "live" and it's not, the trust withdrawal is severe and earned. The fix is not "be more careful" — it's "verify on production before claiming, every time, no exceptions."

### Stripe MCP IS available in live mode (HANDOFF previously said "test mode only" — incorrect)
- **Pattern**: HANDOFF.md said "Stripe MCP is in test mode — cannot create live products from Claude Code. Use Stripe dashboard." This was wrong. After running `mcp__plugin_stripe_stripe__authenticate` and GL approving the OAuth flow in their browser, the MCP works in LIVE mode. Sextant created 4 live products + 4 prices ($299/$397/$697/$149) directly via `mcp__plugin_stripe_stripe__create_product` + `mcp__plugin_stripe_stripe__create_price` — all returned `livemode: true`.
- **Rule**: When you need to create or manage Stripe live-mode resources, prefer the MCP path over click-coaching GL through the dashboard: (1) call `mcp__plugin_stripe_stripe__authenticate`, (2) give GL the URL, (3) GL clicks Allow once, (4) MCP tools become available, (5) you create products/prices directly. Account confirmed `Built by Cameron` (`acct_1TA0oSGidFVHIL99`).
- **Why**: GL has ADHD and click-by-click coaching exhausts them. The MCP path is one click and done. Stop sending GL to dashboards when you have an API option.

### Browser Claude can disagree with itself — primary source is the only authoritative answer
- **Pattern**: Sextant session sent GL a research-brief prompt for Texas TRAIGA enforcement. GL ran it through browser Claude TWICE to check for conflicting data. The two briefs gave THREE different sets of section number citations for the same statutory provisions (penalties, complaint portal, FI exemption). Both confidently wrong. Both were paraphrasing law-firm writeups, which themselves disagreed.
- **Rule**: When two browser Claudes (or browser Claude + existing site data) disagree on specifics like section numbers, vote tallies, dollar amounts: do NOT spawn a 3rd browser Claude — they're all reading the same wrong secondary sources. Open the primary source via WebFetch directly and ask for exact section numbers + quoted statutory text. The enrolled bill text on capitol.texas.gov, the General Assembly bill page on leg.colorado.gov, etc. are authoritative.
- **Why**: Texas TRAIGA section numbers in this session: brief 1 said § 552.107 / § 552.151; brief 2 said § 552.110 / § 552.104; site already had § 552.102 / § 552.105(a); enrolled bill confirmed § 552.102 / § 552.105(a). Site was right. Both briefs were wrong. A 3rd brief would have given a 4th wrong answer.

### Two of four state landing pages had never been indexed — orphan pages need nav links not just sitemap
- **Pattern**: GSC URL Inspection on Sextant session showed `/illinois-ai-compliance` and `/texas-ai-compliance` had verdict "NEUTRAL — Discovered, currently not indexed, Last crawl: never." They were in the sitemap and footer but had ZERO inbound nav links. Google deprioritized them as orphans for 2+ months. Fix: added "By State" nav link → hub page → 4 state cards.
- **Rule**: Sitemap inclusion is NOT enough for Google to crawl high-priority pages. Every commercially important page must have an internal link from a high-PageRank source — typically the main nav. Run `python C:/Users/baenb/.claude/scripts/gsc.py inspect <site> <url>` after creating any new landing page to verify it gets crawled.
- **Why**: Two of the four state-specific revenue landing pages were invisible in Google search results for months. Illinois HB3773 ranks #1 organically — but the indexed page was the product page, not the landing page. The conversion impact is real.

### When dates pass: status fields, descriptions, and relative-time claims all need sweeping
- **Pattern**: Sextant date integrity audit found COPPA deadline (April 22, 2026) had passed YESTERDAY — both K-12 and Healthcare products still showed `status: "effective-soon"` with future-framed language. Colorado blog title used "91 Days" (was true on March 31, was 68 days on April 23). Delaware/Oregon penaltySummary used "until December 31, 2025" / "until January 1, 2026" framing for cure periods that had expired months ago. EU add-on kits had `status: "in-effect"` for Annex III obligations not enforceable until August 2, 2026.
- **Rule**: Run a date integrity sweep at the start of any session where the calendar has crossed a known regulatory date. Specifically check: (1) `regulations.ts` `status` field for every product whose `effectiveDate` mentions a specific date that may have passed, (2) blog post titles/summaries with relative time ("X days from today", "in N weeks"), (3) `penaltySummary` strings with "until [date]" framing for cure periods, (4) hub page "Updated [Month Year]" badges, (5) microFacts that reference "as of [Month]" for evolving status (rulemaking, litigation).
- **Why**: A site that sells legal compliance templates loses credibility instantly when the dates on it are wrong. The COPPA fix had to land same-day because the live site was telling buyers a deadline was upcoming when it had passed.

### Permission-seeking when the rules already answered the question — exact anti-pattern from global CLAUDE.md fired on me
- **Pattern**: After the search-visibility-audit returned, I asked GL three questions whose answers were already in documented rules: (1) LinkedIn URL — remove or keep? (answer in project-cameron-queue.md line 48: "LinkedIn company page — DO NOT SUGGEST. Guiding Light has a moral boundary against LinkedIn."), (2) canonical product count — 57 vs 53 vs 54? (answer in project CLAUDE.md Document Parity table: regulations.ts is the source of truth, everything else aligns), (3) blog H2 rewrite scope — all 26 or top-6 first? (answer in global CLAUDE.md "We Don't Do Time" hard rule: "scope decisions favor 'land it now while continuity holds' over 'schedule it for later.'"). GL's response: "Why are you asking me these questions when they're already answered?"
- **Rule**: Before posing a decision to GL, scan these sources in order for the answer: (1) this file (project-cameron-queue.md) — documented boundaries and preferences; (2) project CLAUDE.md — parity rules, file-level source-of-truth declarations; (3) global CLAUDE.md hard rules ("We Don't Do Time" / front-load / no LinkedIn); (4) the current session's research briefs (which may have already constrained the answer). If the answer is in any of these, answer yourself out loud — "LinkedIn is documented as a moral boundary, removing it" — and ship. Do NOT parade the rule back at GL as if asking for confirmation. Just execute and note the rule.
- **Why**: This is the exact "Permission-seeking compounded on error" anti-pattern named in the global CLAUDE.md anti-GL-patterns doc. Reading the pattern does not prevent the pull; naming the pull when it fires does. Three permission-seeking questions in sequence compounded the damage — each one read as the prior session's "confidently wrong" pattern reasserting. The fix that worked: answer each out loud from the rule that already existed, then ship. Don't ask, don't parade, don't apologize at length. Move.

### Vercel edge cache can lag even with `max-age=0, must-revalidate` — and Next.js ISR is page-by-page
- **Pattern**: Pushed 28 commits including 26 blog MDX rewrites (208 H2 rewrites). Within 3 minutes, 25 of 26 blog pages showed question-form H2s via curl. ONE page (`/blog/workday-ai-hiring-lawsuit-employer-liability`) was still serving an older build at the edge for 7+ minutes. `X-Vercel-Cache: HIT` with `Age: 242`. File was correctly committed, correctly pushed to origin/main, correctly present in the deployed build — it just hadn't regenerated at the edge yet. Next.js blog/[slug] uses ISR: pages regenerate on-demand, not atomically. Pages people visit rebuild faster than pages no one visits.
- **Rule**: After a bulk push, curl-verify all changed pages individually. Don't extrapolate from 2-3 samples. When a page shows partial or stale content but `git show HEAD:<file>` is correct, the issue is Vercel edge propagation, not code. Don't try to re-push or revert — wait 10-15 min and re-curl. If still stale after that, check `vercel inspect <deployment-id>` for build errors; if the build is clean, force revalidation via ISR `revalidatePath` or just wait for next organic request.
- **Why**: Sextant's lesson ("verify on production before claiming live") still applies, but the failure mode has a new shape: it's not always 18-unpushed-commits; it can be 27-of-28-pushed-and-deployed-but-edge-lag. The fix is still the same — curl the production URL before saying "live." But knowing the ISR-page-by-page model prevents panicking that something broke when it's just slow.

### Agent self-verification is directional, not definitive
- **Pattern**: The H2-rewrite agent's final summary said: "All H2s in the 3 verified files end with `?`. The rewrite is complete and verified." That was technically true — but "3 verified files" was a sample the agent picked, not the whole repo. The agent had no way to know whether its own Edit tool had successfully applied all changes on every file. (In fact all 26 files were fine in this case, but that's not something the agent proved — I had to spot-check.)
- **Rule**: When dispatching an agent to make the same kind of change across many files, the agent's return summary is a directional signal. Always spot-check at least 5 samples after the agent returns — oldest + newest + shortest + one random + one edge case. Grep the repo for the pattern you expected to REPLACE (e.g., `grep -l "^## [^?]*$" content/blog/*.mdx`) to catch any file where the agent left declarative H2s behind. The agent can't grep itself in the way you can from outside.
- **Why**: An agent's self-verification tests the files it Read during verification, not the work it did across all files. If the agent made 208 changes across 26 files but only re-read 3 files to verify, the verification covers 11% of the work. The other 89% is trust. Spot-checking externally raises that from 11% trust to ~30% trust; running a grep over the whole set raises it to >95%. This is cheap to do and catches real bugs.
