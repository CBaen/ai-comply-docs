# Blog Style Guide — AI Compliance Documents

**Audience for this document:** Browser Claude instances writing new blog posts. Follow this guide exactly to produce a post that is structurally correct, factually defensible, and consistent with the site's existing voice and editorial standards.

---

## Table of Contents

1. [Frontmatter Schema](#1-frontmatter-schema)
2. [The Two Voices](#2-the-two-voices)
3. [Content Rules — The Non-Negotiables](#3-content-rules--the-non-negotiables)
4. [Supported Markdown](#4-supported-markdown)
5. [Enrichment Blocks](#5-enrichment-blocks)
6. [Post Structure Template](#6-post-structure-template)
7. [Three-Column Layout](#7-three-column-layout)
8. [Internal Linking Rules](#8-internal-linking-rules)
9. [Image Requirements](#9-image-requirements)
10. [Legal Disclaimer](#10-legal-disclaimer)
11. [Pre-Publish Checklist](#11-pre-publish-checklist)

---

## 1. Frontmatter Schema

Every blog post is an `.mdx` file in `content/blog/`. The file begins with a YAML frontmatter block delimited by `---`. The system parses this block using `gray-matter`. Every field listed below is consumed by the renderer or metadata pipeline; no fields outside this schema are recognized.

### Required Fields

| Field | Type | Rules |
|-------|------|-------|
| `title` | string | Sentence case. No trailing period. Max ~80 characters. Should include the law's common name and practical promise. |
| `slug` | string | URL-safe, lowercase, hyphenated. Must be unique across all posts. Used as the URL path: `/blog/[slug]`. Example: `illinois-hb3773-ai-employment-law-what-employers-need` |
| `description` | string | 1–2 sentences. Used as the HTML meta description and OG description. Include the law citation, the effective date or status, and the practical angle. Max ~160 characters. |
| `date` | string | ISO 8601 format: `"2026-03-14"`. This is the publication date, not the law's effective date. |
| `author` | string | Always `"AI Compliance Documents Team"`. Do not vary this. |
| `tags` | string array | 3–6 tags. Include: state name (if applicable), bill number or law name, general topic tags. Example: `["Illinois", "HB3773", "AI employment law", "IDHR", "compliance deadline"]` |
| `published` | boolean | Set to `false` until the post is ready to go live. Set to `true` to publish. A post with `published: false` will not appear in the blog index or generate a static page. |

### Optional Fields

| Field | Type | Rules |
|-------|------|-------|
| `image` | string | Absolute path from site root. Example: `/blog/blog-hero-illinois.png`. If omitted, the header renders without an image column. If provided, the hero renders as a two-column layout (image left, text right on desktop). |
| `summary` | string | 1–2 sentences rendered inside a "Two-Sentence Summary" callout box in the post header. Write it for someone who may read only this and nothing else. Use plain language — no citations, no jargon. |
| `deepDive` | object | See [Section 5](#5-enrichment-blocks). Renders in the left sidebar column on desktop. One per post. |
| `microFacts` | array of objects | See [Section 5](#5-enrichment-blocks). Renders in the right sidebar column on desktop. 2–4 facts per post. |
| `externalReferences` | array of objects | See [Section 5](#5-enrichment-blocks). Renders as a dark bibliography strip below the article body. Every `.gov` source you consulted should appear here. |

### Complete Frontmatter Example

```yaml
---
title: "Illinois HB3773 Is Live. If You Use AI in Hiring, Here's What the Law Actually Says."
slug: "illinois-hb3773-ai-employment-law-what-employers-need"
description: "Illinois HB3773 took effect January 1, 2026. It amends the Illinois Human Rights Act to regulate AI in employment decisions. Here's what the statute requires, what IDHR is still figuring out, and what documents you need right now."
date: "2026-03-14"
author: "AI Compliance Documents Team"
tags: ["Illinois", "HB3773", "AI employment law", "IDHR", "compliance deadline"]
published: true
image: "/blog/blog-hero-illinois.png"
summary: "Illinois passed a law that says if your business uses any kind of AI tool to make decisions about hiring, firing, or promoting people in Illinois, you can't let that tool discriminate — and you have to tell your employees you're using it. The penalties for breaking this law can be up to $70,000 per violation, and the rules apply right now even though the state agency hasn't finished writing all the details yet."
deepDive:
  title: "What Is Disparate Impact?"
  content: "Plain-language explanation here. Can use \n\n for paragraph breaks."
microFacts:
  - fact: "One specific verifiable fact from a primary source."
    source: "Illinois General Assembly"
    sourceUrl: "https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm"
  - fact: "A second fact."
    source: "U.S. Equal Employment Opportunity Commission"
    sourceUrl: "https://www.eeoc.gov/..."
externalReferences:
  - title: "Illinois Human Rights Act, Section 2-102 (775 ILCS 5/2-102)"
    url: "https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm"
  - title: "Public Act 103-0804 (HB3773 Enrolled Text)"
    url: "https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804"
---
```

### Field-Level Notes

**`slug`** — The slug is used in `generateStaticParams()`, canonical URL, and OG URL. It must exactly match the file name minus `.mdx`. If the slug is `illinois-hb3773-ai-employment-law-what-employers-need`, the file must be named `illinois-hb3773-ai-employment-law-what-employers-need.mdx`.

**`date`** — The date is sorted descending to order the blog index. Newer posts appear first. Do not use a future date to artificially pin a post to the top.

**`readTime`** — This field is NOT in frontmatter. It is computed automatically from the full file by the `reading-time` library and injected at build time. Do not add it to frontmatter.

**`summary`** — This renders in the hero header in a styled callout box. It is also used by some feed consumers. Write it after you've written the full post. It is not the same as `description` — `description` is SEO-facing and can include the citation; `summary` is reader-facing and should be plain language.

**YAML string quoting** — Use double-quoted strings for `title`, `description`, and `summary` if they contain colons, apostrophes, or special characters. The `deepDive.content` field frequently contains paragraph breaks; represent them as `\n\n` within the quoted string, not as actual newlines (which would break YAML parsing).

---

## 2. The Two Voices

Every post is written in one of two voices, or moves between them in a defined pattern. The voices are not styles to pick between — they are roles that each section of a post should play.

### Voice 1: The Pragmatic Realist

**Who this voice is for:** The business owner or operations manager who just got handed the compliance problem. They are not a lawyer. They do not read statutes for fun. They are stressed and skeptical of being sold something.

**What this voice does:**
- Validates that the reader's confusion is reasonable, without condescending
- Uses short sentences and plain words
- Names the reader's actual internal experience ("Here's the thing: most of the articles you'll find about this law are written by law firms billing $500 an hour or by software companies trying to sell you a platform.")
- States what is true plainly before layering in nuance
- Never says "it's complicated" — instead, names what's actually complicated and why
- Skips preamble. Does not say "In today's rapidly evolving AI landscape..."

**Example of this voice in practice (from the Illinois post):**

> "Illinois House Bill 3773 became law on January 1, 2026. If you manage hiring, HR, or people operations at a company that operates in Illinois, this law applies to you. It doesn't matter where your company is headquartered. If you have employees in Illinois and you use any form of AI in employment decisions, you have obligations under this statute right now."

Short sentences. Direct address. No qualifier that softens the obligation. The reader knows exactly where they stand before the second paragraph.

**Questions the Realist voice phrases in the reader's own language:**
- "I have no idea where to start."
- "Do I actually need to worry about this?"
- "What does 'AI in employment decisions' even mean in practice?"

The Realist voice names these questions before answering them — this is what "writing for the person who just found out this is their job" looks like.

### Voice 2: The Precise Credentialist

**Who this voice is for:** The same reader, thirty seconds later, asking "but how do I know that's actually true?"

**What this voice does:**
- Cites the exact statutory section, not the law's common name
- Links every citation to the primary source
- Uses exact dollar amounts from the statute — not approximations, not ranges unless the statute specifies a range
- Names the enforcing agency precisely
- Distinguishes between "up to $X" (discretionary maximum) and "$X per violation" (fixed amount)
- Names amending bills when the primary bill has been modified
- Does not summarize the law's intent — quotes or paraphrases the statutory language directly

**Example of this voice in practice (from the Illinois post):**

> "Penalties per violation are: up to $16,000 if this is the employer's first civil rights violation, up to $42,500 if the employer has been found to have committed one other violation within the past five years, and up to $70,000 if the employer has two or more prior violations within the past seven years. ([Section 8A-104 of the Act — 775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm))"

Exact tiers. Exact time windows. Section number. Hyperlink to the statute.

### The Pattern: Realist Opens, Credentialist Validates

In practice, each major section of a post should move through both voices:

1. **Realist framing** — State the situation plainly ("Here's what the law requires of deployers.")
2. **Credentialist substance** — Deliver the actual statutory content with citations
3. **Realist close** — Return to the reader's practical situation ("That's a substantial list. The law is asking deployers to build a compliance infrastructure, not just fill out a form.")

The article-opening paragraphs are almost always pure Realist. The penalty section always includes Credentialist specifics. The "Where to Start" or closing section is always Realist.

---

## 3. Content Rules — The Non-Negotiables

These rules exist because previous instances made errors that put business owners at legal and financial risk. They are not suggestions.

### Rule 1: No Training Knowledge for Legal Facts

**Training knowledge is never an acceptable source for any legal fact.**

This includes: statute citations, section numbers, penalty amounts, effective dates, bill numbers, applicability definitions, cure periods, enforcement mechanisms, amendment history, agency guidance, and implementing rules status.

The only acceptable source is the enacted statute text fetched from the state legislature's official `.gov` website during the current session.

Do not use a fact because it appears in another blog post in this codebase. Previous instances put those posts there, and they were wrong in specific, documented ways. See `PRODUCT-ONBOARDING.md` for the full error log.

**If you cannot fetch the primary source with your tools:** Stop. Do not fill in the field from training knowledge. Mark it `[UNVERIFIED — REQUIRES PRIMARY SOURCE]` and surface this to the human reviewer before publishing.

### Rule 2: Every Factual Claim Gets a Citation with Hyperlink

Every specific legal fact in the post body needs an inline citation. The format is a markdown hyperlink: `([C.R.S. § 6-1-1701 et seq.](https://leg.colorado.gov/bills/sb24-205))`.

"Factual claim" means: penalty amounts, effective dates, covered decision categories, applicability thresholds, enforcement agency, private right of action status, cure periods, amendment history, implementing rules status.

"Factual claim" does not mean general observations like "AI hiring tools can produce discriminatory outcomes even when no one intended them to."

When citing a section multiple times in the same post, you may use a shortened inline reference after the first full citation: `([SB24-205](https://leg.colorado.gov/bills/sb24-205))`.

### Rule 3: Cross-Check All Numbers Against `regulations.ts`

Every number that appears in a blog post and also in `regulations.ts` (effective dates, penalty amounts, enforcement mechanism, private right of action status) must match. If they disagree, one is wrong. Find out which and fix it before publishing.

The file is at `src/data/regulations.ts`. Grep for the product slug to find the relevant entry.

**This is an audit finding if violated.** A previous audit found the Colorado effective date stated as February 1 in one place and June 30 in another, and found a blog post stating Colorado "has private remedies" while the product page correctly stated AG-exclusive enforcement. Do not create new contradictions.

### Rule 4: No Editorializing About Enforcement Likelihood

Do not write sentences like "The AG doesn't have a surveillance system monitoring every AI deployment" or "Enforcement has been light so far." These downplay compliance urgency and were specifically flagged in the legal audit.

State the facts. State what the statute says. Let the reader draw conclusions about their own risk tolerance.

**What to do instead:** If the enforcement posture is genuinely relevant (e.g., a brand-new law with no enforcement history), you may note this factually: "As of [date], the AG has not announced any enforcement actions under this statute." This is a fact, not editorial judgment about enforcement likelihood.

### Rule 5: Penalty Tiers Must Be Complete

If a statute creates penalty tiers, document all of them. Not just the maximum.

A reader doing risk math will use whatever number you give them. If you give them only the maximum and the statute has a lower first-offense tier, they will over-estimate their exposure. If you give them only the first-offense tier and omit the maximum for repeat violations, they will under-estimate it. Both errors are harmful.

**Required elements for any penalty section:**
- First offense amount (and whether it is "up to X" or a fixed amount)
- Repeat offense tiers with the time windows (e.g., "within five years")
- Whether penalties are "per violation," "per aggrieved party," "per day," or some combination
- Cure period duration if the statute provides one
- Who enforces (AG, state agency, private right of action, or combination)
- Statutory section citations for each figure

### Rule 6: Contradictions Between Blog and Product Page Are Audit Findings

Before publishing, grep for the statute name and slug in:
- `src/data/regulations.ts`
- `content/blog/` (all posts)

Every number you cite must match. Every statement about enforcement mechanism must match. If the product page says "no private right of action" and your blog post says "consumers may also pursue private claims," you have introduced a contradiction that undermines credibility and may mislead readers.

---

## 4. Supported Markdown

The blog post body is rendered by `src/lib/mdx-to-jsx.tsx`, a custom line-by-line parser. It does NOT use a standard Markdown library. Only the elements explicitly handled in that file will render correctly.

### What Renders

| Syntax | Output | Notes |
|--------|--------|-------|
| `## Heading` | `<h2>` | `text-2xl font-bold`, `mt-10 mb-4` |
| `### Heading` | `<h3>` | `text-xl font-bold`, `mt-8 mb-3` |
| `#### Heading` | `<h4>` | `text-lg font-semibold`, `mt-6 mb-2` |
| `- list item` | `<ul><li>` | Unordered list, disc style, `ml-5` |
| `1. list item` | `<ol><li>` | Ordered list, decimal style, `ml-5` |
| `**bold**` | `<strong>` | Inline, within any text node |
| `*italic*` | `<em>` | Inline, within any text node |
| `[text](href)` | `<Link>` or `<a>` | Internal paths (`/`) use Next.js `<Link>`; external URLs use `<a target="_blank">` |
| `---` (three or more dashes on their own line) | `<hr>` | `my-8 border-t border-gray-200` |
| Plain paragraph | `<p>` | `text-gray-700 leading-relaxed mb-5` |

**Inline formatting** (bold, italic, links) works inside headings, paragraphs, and list items. The inline parser processes `**bold**`, `*italic*`, and `[text](url)` patterns in that order.

**Continuation lines:** The paragraph parser collects consecutive non-blank, non-heading, non-list lines into a single `<p>` tag, joined with a space. This means a line break within a paragraph is invisible in the rendered output. To force a paragraph break, leave a blank line between the two paragraphs.

### What Does NOT Render (Do Not Use)

These elements are not handled by the renderer and will produce garbled or unstyled output:

| Syntax | Status | Alternative |
|--------|--------|-------------|
| Tables (`\| col \| col \|`) | Not supported | Use a bold-label paragraph pattern or a structured list |
| Blockquotes (`> text`) | Not supported | Use a paragraph with em-dashes or restructure as prose |
| Code blocks (` ``` `) | Not supported | Do not put code in blog posts |
| Inline code (`` `text` `) | Not supported | Use bold or italics for emphasis |
| Images (`![alt](src)`) | Not supported in body | Images go in frontmatter `image` field only |
| Footnotes (`[^1]`) | Not supported | Convert to inline citations |
| HTML tags | Not processed as HTML | Do not embed raw HTML in the body |
| `#` H1 heading | Not handled | Never use H1 in the body; the post title renders as H1 in the header |

**The table limitation is important.** The penalties-by-state post handles this by writing each jurisdiction as its own H2 section with bold labels for each data point. Use this pattern whenever you are tempted to use a table.

---

## 5. Enrichment Blocks

These fields in frontmatter populate the sidebars and bibliography. They are not in the post body — they are YAML blocks that the page component renders separately.

### `deepDive`

**Purpose:** Explains one complex concept from the post in plain language accessible to a general audience. Not a legal summary — an analogy-driven explanation that builds genuine understanding.

**Where it renders:** Left sidebar column on desktop (`xl` breakpoint and above). Collapsible `<details>` card on mobile. Sticky (stays in view while reading).

**Visual design:** Indigo left border, book icon, "Deep Dive" label.

**Schema:**
```yaml
deepDive:
  title: "What Is an Affirmative Defense?"
  content: "Multi-paragraph plain-language explanation. Use \n\n between paragraphs within the YAML string."
```

**Writing the content:** Use the analogy-first structure from existing posts. The Colorado post's affirmative defense explanation opens with a schoolyard recess analogy before connecting it to the legal concept. The Illinois post's disparate impact explanation opens with a running test scenario. The analogy should stand on its own before the legal connection is made. Length: 3–5 paragraphs.

**One per post.** The renderer only accepts a single `deepDive` object, not an array.

### `microFacts`

**Purpose:** Specific, verifiable facts from primary sources that add context without interrupting the main article flow. Each fact must be sourced from a `.gov` URL or official agency website.

**Where it renders:** Right sidebar column on desktop. Collapsible `<details>` card on mobile showing fact count ("3 facts"). Each fact links to its source.

**Visual design:** Amber left border, lightbulb icon, "Did You Know?" label. Each fact is a clickable link to its source.

**Schema:**
```yaml
microFacts:
  - fact: "The complete, standalone fact as a sentence. No fragment."
    source: "Short source name displayed below the fact."
    sourceUrl: "https://verified.gov.url"
  - fact: "A second fact."
    source: "Source Name"
    sourceUrl: "https://..."
```

**Rules for microFacts:**
- `fact` must be a complete sentence that makes sense without surrounding context
- `source` is displayed as the attribution label — use the agency or legislative body name
- `sourceUrl` must be a URL you have actually visited and verified during this session; never use a URL from training knowledge
- 2–4 facts per post; more than 4 clutters the sidebar
- Facts should be contextually related to the post topic but not redundant with the body text — use them for interesting adjacent context (legislative history, related laws, comparative data)

### `externalReferences`

**Purpose:** The bibliography. Every primary source consulted during research belongs here. This renders as a dark (`bg-slate-900`) strip at the bottom of the page with numbered links.

**Where it renders:** Full-width strip below the three-column body, above the legal disclaimer.

**Schema:**
```yaml
externalReferences:
  - title: "Illinois Human Rights Act, Section 2-102 (775 ILCS 5/2-102)"
    url: "https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm"
  - title: "Public Act 103-0804 (HB3773 Enrolled Text)"
    url: "https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804"
```

**Naming convention for `title`:** Include the statute name, section number, and site domain in parentheses. Example: `"Colorado General Assembly — SB24-205: Consumer Protections for Artificial Intelligence"`. This tells readers what they're clicking before they click it.

**What to include:** The enrolled statute text (required), any amending bills (required if they exist), agency guidance pages referenced in the post (required if cited), and the enforcement agency's official page for the law (recommended). Do not include secondary sources (law firm summaries, news articles, academic papers).

### `summary`

**Purpose:** A plain-language TL;DR that renders in the hero header before the reader reaches the article body. Designed for the reader who is scanning before committing to read.

**Where it renders:** A styled box inside the post header (`bg-blue-900/40 border border-blue-400/30`), labeled "Two-Sentence Summary."

**Format:** Write this as 1–2 sentences of dense plain-language summary. Include: what the law does, who it covers, what the practical consequence is. No citations in `summary` — citations belong in the body.

**Example (from the Illinois post):**
> "Illinois passed a law that says if your business uses any kind of AI tool to make decisions about hiring, firing, or promoting people in Illinois, you can't let that tool discriminate — and you have to tell your employees you're using it. The penalties for breaking this law can be up to $70,000 per violation, and the rules apply right now even though the state agency hasn't finished writing all the details yet."

---

## 6. Post Structure Template

Every post follows this flow. Deviations are acceptable for strong editorial reasons, but this is the default.

### Opening Hook (no heading, 2–3 paragraphs)

State what happened and when. Name the law by its common name and citation. Say directly who it applies to. Do not begin with "In today's AI landscape" or any similar throat-clearing. The opening hook of the Illinois post is a model:

> "Illinois House Bill 3773 became law on January 1, 2026. If you manage hiring, HR, or people operations at a company that operates in Illinois, this law applies to you. It doesn't matter where your company is headquartered."

For laws with notable context (delayed effective date, pending implementing rules, recent amendment), address that context in the opening section before the first H2. The Colorado post explains the effective date change — from February to June 2026 — in the second paragraph because it is the most practically important fact about that law's current status.

### H2 Sections — Major Topics

Each H2 covers one coherent topic. The section title should be a plain-language statement, not a legal category. Not "Applicability Provisions" — use "What Makes This Law Different: Developers and Deployers."

**Standard H2 sections for a law-specific post:**
1. Background / Why the effective date changed (if applicable)
2. Who is covered / What the law defines
3. What the law requires — primary obligation(s)
4. What the law does NOT say / open questions (if applicable)
5. Enforcement and penalties
6. What you should do now / Where to start

The penalties section should always appear before "What to do now" — the penalties are the motivation, the action items are the response.

### H3 Subsections — Within a Major Topic

Use H3 to break up long H2 sections. The Illinois post uses H3 to separate each element of the compliance document list ("An AI notice for employees and applicants," "An internal AI system inventory," etc.). H3 titles are also plain language.

### H4 Subsections — Rarely Used

Use H4 only when you need a third level of nesting. The penalties-by-state post uses H4 to label "Penalty structure:", "What triggers a violation:", "Where to read it:" within each jurisdiction's H2 section. Use this pattern sparingly.

### Bold Defined Terms

When introducing a defined term from the statute, bold it on first use: "A **developer** is the person or company that creates or substantially modifies a high-risk AI system." Do not bold terms repeatedly after the first definition.

### Closing Section

The final H2 should be action-oriented: "Where to Start," "What To Do This Week," "What Good Documentation Does for You." It should end with a plain-language statement that gives the reader a clear next step.

End body text with an `---` horizontal rule, then an optional inline sources note if you want to add prose context to the bibliography (the penalties-by-state post does this). Sources also render automatically in the `externalReferences` strip, so the prose sources block is optional.

### Sources Line (Optional, at End of Body)

Some posts include a brief inline note at the end of the body (after `---`) summarizing sources. This is a carry-forward from early posts. It is not required since `externalReferences` handles the bibliography. If included, use this format:

```
---

**Sources** — Every [fact type] in this article was verified against enacted statute text at these .gov URLs:

- [Descriptive title](url) — one-line note on what you verified from it.
```

---

## 7. Three-Column Layout

On desktop (`xl` breakpoint, 1280px and above), the post body renders as a three-column grid: `xl:grid-cols-[240px_minmax(0,640px)_240px]`.

| Column | Content | Source |
|--------|---------|--------|
| Left (240px) | Deep Dive | `deepDive` frontmatter field |
| Center (max 640px) | Article body | MDX body content |
| Right (240px) | Did You Know? | `microFacts` frontmatter array |

**If `deepDive` is absent:** The left column renders as an empty `<div>` — the grid holds but the left column is blank.

**If `microFacts` is absent or empty:** Same — right column is an empty `<div>`.

**Both sidebars are `sticky top-24`** — they scroll with the reader until the column's content is taller than the viewport, at which point they pin.

**On mobile (below `xl`):** The sidebars are hidden (`hidden xl:block`). Their content is instead exposed as collapsible `<details>` cards injected between the article body and the bottom sections. The Deep Dive card uses an indigo border; the Did You Know card uses an amber border. These cards are closed by default.

**Implication for writing:** The sidebars are supplementary. The article body must be fully self-contained — a reader who never expands the sidebar cards must still get the complete picture from the center column. The sidebars add depth and context, not critical information.

---

## 8. Internal Linking Rules

### Link to Product Pages

When the post discusses a law for which a product exists, link to that product page in the relevant section. Use descriptive anchor text — not "click here" or "our product," but the specific product name or what it does.

**Pattern from the Colorado post:**
> "You need to complete an [impact assessment](/products/colorado-sb24-205) for each high-risk system you deploy."

**Pattern from the Illinois post:**
> "Our [Illinois HB3773 compliance package](/products/illinois-hb3773) includes ready-to-use notice templates built around what the statute currently requires."

Link naturally within the prose — not in a separate "buy now" paragraph. The link should appear where the reader is already thinking about that specific need.

### Link to Related Blog Posts

When the post references a topic covered in another blog post, link to it:
> "...a full bias audit (that's more of a NYC Local Law 144 requirement)..."

Use the slug path: `/blog/[slug]`.

### Link to the Quiz Page

If there is a compliance quiz or self-assessment tool at `/quiz` (or equivalent), link to it in the closing "Where to Start" section when the reader's next step would reasonably be "figure out which laws apply to me."

### Do Not Link to Competitor Sites, Law Firm Posts, or News Articles

All external links must go to `.gov` sources, official agency pages (`eeoc.gov`, `ftc.gov`, `cppa.ca.gov`), or official standards bodies (`nist.gov`). No secondary sources in the post body. Secondary sources belong in `externalReferences` only if they are official guidance documents.

---

## 9. Image Requirements

### Hero Image

When `image` is provided in frontmatter, the post header renders a two-column layout: image on the left (desktop), text on the right. Image dimensions: `300px` wide column on desktop, `h-48 max-h-[200px]` on mobile (full width). Image is displayed with `object-cover`, so aspect ratio does not need to be exact, but landscape orientation fills better.

**Naming convention:** `/blog/blog-hero-[descriptor].png` where descriptor is the state name or topic. Examples from existing posts:
- `/blog/blog-hero-colorado.png`
- `/blog/blog-hero-illinois.png`
- `/blog/blog-hero-penalties.png`

**File location:** `public/blog/` in the project root. The `image` field value is the absolute path from the `public/` directory, so `image: "/blog/blog-hero-colorado.png"` maps to `public/blog/blog-hero-colorado.png`.

### OG Image

If `image` is provided in frontmatter, `generateMetadata` in `page.tsx` uses it as the OG image at `1200x630`. If `image` is omitted, it falls back to the site-level OG image at `/opengraph-image`.

**This means:** A post without an `image` field will share the same OG image as the homepage. If you are writing a post that will be shared on social media, providing a post-specific hero image is strongly preferred.

---

## 10. Legal Disclaimer

**The disclaimer renders automatically.** Do not add disclaimer text to individual post bodies.

The `page.tsx` component renders a fixed legal disclaimer below the `externalReferences` strip on every post:

> **Disclaimer:** This article is for informational purposes only and does not constitute legal advice, legal representation, or an attorney-client relationship. Laws and regulations change frequently. You should consult a licensed attorney to verify that the information in this article is current, complete, and applicable to your specific situation before relying on it. AI Compliance Documents is not a law firm and does not practice law.

**Do not reproduce this text in the post body.** It renders at the page level from `page.tsx`. Adding it again in the MDX creates duplication.

**The old pattern (in earlier posts) of adding a disclaimer paragraph inside the body is incorrect.** The penalties-by-state post has a disclaimer paragraph at the very end of the MDX body that predates the site-wide component. This is redundant now that `page.tsx` handles it. New posts should not replicate this pattern.

---

## 11. Pre-Publish Checklist

Run through this before setting `published: true`.

**Frontmatter**
- [ ] `slug` is unique — does not match any existing post in `content/blog/`
- [ ] `slug` matches the filename exactly (minus `.mdx`)
- [ ] `date` is ISO 8601 format
- [ ] `author` is exactly `"AI Compliance Documents Team"`
- [ ] `tags` include state (if applicable), bill/law name, and 1–2 topic tags
- [ ] `description` is under 160 characters and includes the citation
- [ ] `summary` is 1–2 sentences of plain language, no citations
- [ ] `image` path matches an actual file in `public/blog/`
- [ ] YAML is valid — no unescaped colons or apostrophes in unquoted strings

**Citations and Sourcing**
- [ ] Every statute citation in the body has an inline hyperlink to the `.gov` source
- [ ] Every URL in `microFacts.sourceUrl` was verified as live during this session
- [ ] Every URL in `externalReferences` was verified as live during this session
- [ ] No fact in the post body came from training knowledge without primary source verification

**Numbers and Consistency**
- [ ] Every penalty amount matches the corresponding entry in `src/data/regulations.ts`
- [ ] Every effective date matches `regulations.ts`
- [ ] Enforcement mechanism (private right of action yes/no) matches `regulations.ts`
- [ ] Penalty tiers are complete — first offense, repeat offense, per-day structures all documented
- [ ] Cure period (if applicable) is stated with the correct duration and statutory citation

**Structure and Markdown**
- [ ] No H1 in body (post title renders as H1 in the header)
- [ ] No tables, blockquotes, code blocks, or inline code used
- [ ] No raw HTML embedded in body
- [ ] All links use the correct markdown format: `[text](url)`
- [ ] Internal links use paths starting with `/`, not full URLs
- [ ] `---` dividers are on their own line with no surrounding content on the same line

**Enrichment Blocks**
- [ ] `deepDive.content` uses `\n\n` for paragraph breaks (not actual newlines)
- [ ] `microFacts` has 2–4 entries, each with `fact`, `source`, and `sourceUrl`
- [ ] `externalReferences` includes all primary sources consulted
- [ ] No disclaimer text added to the post body

**Editorial**
- [ ] Opening paragraph states what the law is, when it took effect (or takes effect), and who it covers — within the first 3 sentences
- [ ] No "In today's rapidly evolving..." or similar opening preamble
- [ ] No editorializing about enforcement likelihood or AG surveillance capacity
- [ ] Penalty section is complete and appears before the "what to do now" section
- [ ] Product links are present where relevant and use descriptive anchor text
- [ ] Closing section is action-oriented with a concrete next step

**Final**
- [ ] Set `published: true` only after all items above are confirmed
