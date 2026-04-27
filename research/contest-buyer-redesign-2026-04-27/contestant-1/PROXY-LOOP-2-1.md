# Proxy Coach — Loop 2, Contestant 1

## Your assigned perspective

It's 11pm. A restaurant owner in Austin opened an email from their HR software vendor: "You may have obligations under Texas AI law." They don't know what TRAIGA is. They don't know if it applies to them. They're not calm. They opened your site.

They land on your hero. They read: "Your state passed an AI law. We built the documents."

What word do they pause on?

---

## The coaching push

"Calm Authority" is doing real work in your spec. The visual palette — Navy, Off-White, Signal Blue, Verified Teal — holds that register well. The H1 is precise and offer-shaped. This is genuinely better than the current site.

But stay with the 11pm restaurant owner for a moment.

The word they pause on is "passed." Your H1 says their state *passed* a law. That's past tense. It's accurate. It also implies the law exists, is enacted, is a thing. What it doesn't do is tell them whether it's *in effect right now* and whether it applies to *them*.

The deadline pills below the H1 solve the urgency problem. Texas gets a red "In Effect" pill, which is the right signal. But the pills are sorted Colorado first (by deadline proximity), which means a Texas restaurant owner reads "Colorado — June 30, 2026" before they read "Texas — In Effect." That's the wrong order for them. The buyer who arrived panicked about Texas reads a Colorado deadline first and experiences one beat of disorientation before they find their state.

Now look at your Section 3 (Penalty Reality). Texas reads: "Up to $200,000 per violation, plus a continuing daily penalty after notice." Then in brackets: "[REQUIRES PRIMARY SOURCE VERIFICATION — build instance must read capitol.texas.gov statute text before shipping]."

That bracket is correct and responsible. It should absolutely be there as a production flag. But it also means the Texas section is your weakest penalty card — because the number hasn't been confirmed from source. Your spec acknowledges this. Good. Now: what does the Texas buyer experience if they come back after June 30 and that section is still unverified?

Here is the redesign question underneath all of this:

Calm Authority works for a buyer who arrived organized. What is the signal you give the buyer who arrived panicked? Not a different voice — your voice spec is sound. But a different *visual register* for the urgency level at arrival. The panic-state buyer needs to be caught before they can be calmed.

Concrete version: your deadline pills are `text-xs px-3 py-1 rounded-full`. They are small. They are secondary to the H1. A buyer who arrived because of Texas and is scanning fast might not read them as the "yes, you're in the right place" confirmation they need. Is there a version of the pills that catches the scan? Larger? Positioned differently? A state-name in the H1 itself?

You don't have to change the voice. But check whether the visual weight matches what the buyer needs at arrival altitude.

---

## One concrete thing to resolve

The H1 is stateless. "Your state passed an AI law" is true for every buyer. But the buyer who arrived searching "Texas AI compliance documents" is looking for confirmation that this site is specifically for them.

What is the one-word or one-element addition that catches the Texas buyer without turning the H1 into a list?

Your deadline pills are doing some of that work. The eyebrow ("AI LAWS ARE IN EFFECT") does some of it. But neither says Texas until the pills, which require a scan. Contestants 3 and 5 both propose eyebrows that name specific state law / deadline. C3's eyebrow is "COLORADO SB 24-205 DEADLINE: JUNE 30, 2026" — a single state prioritized.

You've chosen a different path: generic urgency in the eyebrow, specificity in the pills. Is that the right layering? Or does the Texas buyer need to see their state before they read the H1?

You already know the answer. Write it down in your next round.
