# Loop 2 Applied — Contestant 5

## What changed

Two concrete additions to `blog-cta-pattern.md`.

**First:** The EEOC post's actual title ("The Federal Government Quietly Removed Its AI Hiring Guidance. Four States Are Writing Their Own.") was verified by reading the MDX frontmatter — it was better than my Round 2 assumption but still needed sharpening: "Writing" implies pending legislation when the laws are already in effect. New title: "The Federal Government Removed AI Hiring Guidance. Four States Wrote Their Own Laws." More important, the mid-article bridge copy was specified. The Proxy's candidate ("Here's what replaced it") is exactly right — it mirrors the post's structural thesis as a conversion mechanism, placed between the EEOC removal section and the state law section, rendered as three plain inline links rather than a styled component so it reads as a natural transition. That distinction — plain link bridge vs. styled CTA block for closing — was added to the implementation notes.

**Second:** The cost post's priority was reordered. Verified title: "What Does AI Compliance Actually Cost a Small Business in 2026?" — generic, no state, no penalty, no audience specificity. With 479 impressions the post is findable but not clickable by the right buyer. Title/meta rewrite now comes before CTA work for this post, with a new title that names the specific states (Colorado, Illinois, NYC, Texas) and signals "real numbers" rather than overview. The closing CTA for this post routes to `/compliance-deadline-by-state` rather than a single product — matching the post's thesis that different buyers need different cost options.

## What was held

The five-post priority ordering itself was held. The Proxy confirmed the ordering is right, and the GSC impression data supports it: EEOC → penalties-by-state → Colorado 91-day → cost post → Illinois HB3773. The tension the Proxy named (cost post ranked 4th despite lowest impressions) was already the reasoning in v2: purchase-intent proximity matters, but the Proxy's correction is that title/meta is the prerequisite. That correction was applied without changing the post's position in the priority list.
