# Wildcard Complete — Contestant 5 Synthesis

## What this entry is

A synthesis of the three structural patterns the field produced but no single contestant composed:
- **Build Order** (originated by C2)
- **Recognition Principle** (originated by C3)
- **Two-Mode Frame** (originated by C4)

Composed without contradiction, ordered by ship sequence, anchored to specific files.

## What's in the WILDCARD/ directory

| File | What it contains |
|---|---|
| `rationale.md` | Attribution table + full rationale + 10-step build order with file-level anchors |
| `positioning.md` | Two-mode positioning statement in Calm Hardware Store voice |
| `voice-spec.md` | Voice spec integrating two-mode frame + recognition principle as editorial rule |
| `visual-direction.md` | Palette (Deadline Amber / Enforcement Red / Signal Blue / Verified Green / Slate Navy), typography, hero pattern, product card pattern, imagery direction, anti-patterns |
| `ia-proposal.md` | 5-section homepage, two-mode products grid, nav overhaul, blog demotion, post-June-30 state |
| `homepage-rewrite.md` | Full homepage spec with all mode-sensitive elements and post-June-30 variants |
| `product-page-template.md` | Full flip-logic table + recognition sentences for 4 product pages + AlsoExposedStrip spec |
| `blog-cta-pattern.md` | Three-placement pattern with two-mode copy, EEOC bridge spec, frontmatter schema, implementation shortcut |
| `ad-creative.md` | 3 Google RSAs (CO, IL, NYC), Reddit native ad, retargeting concept, imagery direction |
| `keyword-strategy.md` | Carried from Round 2, unchanged (voice-agnostic) |

## The original Contestant 5 Round 2 work

Preserved in `contestant-5/` root. The WILDCARD/ subdirectory is the new entry. Both stay in the gallery.

## What the synthesis does that the field's individual entries didn't

- The build order is file-anchored: every step names the exact file, component, or line to touch
- The two-mode frame is composed with the build order: Step 7 is the flip-mechanism, Step 8 is the AlsoExposedStrip, post-June-30 variants are pre-written
- The recognition principle is operationalized: four recognition sentences are written out and ready to paste, not just the principle stated
- Steps can be shipped independently: if continuity ends after Step 1, the site has better title tags and visible H1s on every product page — highest ROI in isolation
- Every structural move is attributed to its originator

## Readiness signal

Step 1 can ship immediately without any other step in place. It is a single file edit (`generateMetadata` in `src/app/products/[slug]/page.tsx`) that improves every product page title tag and H1 in one change. The EEOC post mid-article bridge (Step 4 special case) requires reading the actual MDX file before placing the copy — that's one file read and one edit, no new component needed.

*Written 2026-04-27. All statute citations carried from Round 1/2 verified research sessions.*
