---
title: "How many strokes is 10 yards of dispersion worth?"
description: "Gear gets sold in yards, but you score in strokes. Some back-of-the-envelope strokes-gained math on what distance and width are actually worth — and why forgiveness is the most underpriced thing in the store."
pubDate: 2026-07-13
heroImage: "/images/blog/dispersion-strokes-hero.jpg"
category: "Research"
tags: ["strokes-gained", "dispersion", "data"]
---

Every piece of golf equipment is sold in yards. Every round of golf is scored in strokes. The entire gear industry lives in the gap between those two sentences, so let's try to close it with some arithmetic.

Fair warning: this is back-of-the-envelope math with the assumptions in plain sight — not a peer-reviewed paper. I'd rather show you a rough number you can argue with than a precise-looking one you can't check. When [the community dataset](/lab/community) is deep enough, we'll redo this with real dispersion distributions instead of my envelope. Consider this the IOU.

## The one-paragraph strokes-gained primer

Strokes-gained thinking (Mark Broadie's *Every Shot Counts* is the canon) starts from a simple table: from any distance and lie, the average number of strokes it takes to hole out. A 150-yard approach from fairway costs an average golfer about 3 strokes to finish; the same 150 from recovery-grade trouble costs closer to 3.5–4. Every shot you hit either beats those averages or doesn't. That's it. The magic is that it turns *position* into *strokes*, which means it can price exactly the two things a driver purchase changes: how far forward the ball goes, and how far sideways.

## What distance is worth

Broadie's own analysis puts **20 extra yards of driving distance at roughly 0.75 strokes per round** for an average golfer — being 20 yards closer on every approach, compounded over a round. So:

- +10 yards of carry ≈ **0.3–0.4 strokes per round**
- +5 yards (a realistic gamer-vs-new-driver median gap, [ask me how I know](/blog/is-your-old-driver-costing-you-distance)) ≈ **0.2 strokes**. Per round. That's one stroke every five rounds — real, but a rounding error on a 90s scorecard.

Distance is worth chasing when it comes in big chunks — which is why [10 mph of swing speed](/blog/speed-training-95-to-130) (25–30 yards, call it a full stroke per round) moves your handicap, and a new driver's 3 median yards mostly doesn't.

## What width is worth

Now the sideways direction, which no ad has ever put a number on.

Say your driver pattern is ±30 yards wide and centered. On a 32-yard fairway, simple geometry says the middle ~55% of your pattern finds short grass; the tails find rough, trees, bunkers, and the occasional property line. Tighten the same pattern to ±20 — same distance, just narrower, roughly what a [high-MOI head buys a mid-handicap strike pattern](/blog/is-your-old-driver-costing-you-distance) — and something like 75–80% of the pattern now fits the fairway.

Price the difference with round numbers an average golfer would recognize: rough on this hole costs ~0.3 strokes over fairway, and the genuinely ugly outcomes — recovery punch-outs, hazards, reloads — cost 1 to 2. The narrower pattern converts a few rough visits per round into fairway, and (this is the part that actually pays) it takes the shots that were beyond ±25 yards, the ones flirting with disaster, mostly off the table. Disasters are rare-but-expensive, which is exactly the combination averages punish you for ignoring.

Run the weighted sum across 14 driver swings and you get: **±30 → ±20 is worth roughly 0.7–1.2 strokes per round** on a normal tree-lined course. Call 10 yards of width **0.5–0.8 strokes** to stay conservative, since wide-open courses forgive more than my envelope does. Even the low end is *double* what the same 10 yards is worth as distance.

And unlike distance, width pays compound interest on bad days. Distance helps most when you're already finding the planet; width is specifically insurance on the swings you'd rather not talk about, which — check your own [dispersion dashboard](/golf-sim-analytics) — is more of them than memory admits.

## The uncomfortable summary

- 10 yards **longer**: ~0.3–0.4 strokes a round.
- 10 yards **narrower**: ~0.5–0.8 strokes a round, more if your course punishes misses.
- Both together over a 40-round season: **the narrower one is worth about twice as many strokes**, and nobody has ever made a commercial about it.

This is why the [driver spectrum](/lab/market) runs from *max forgiveness* to *pure distance*, and why — for most golfers, most handicaps, most budgets — the correct end to shop is the boring one on the left. Distance already peaked when the face-spring rules were written and when your swing speed was set (though [that one's negotiable](/blog/speed-training-95-to-130)). Width is the axis where equipment still meaningfully varies, where your particular miss pattern decides the answer, and where [a 40-shot A/B in your garage](/blog/run-your-own-club-fitting-in-your-sim) will tell you more than any ad.

You score in strokes. Shop in them too.
