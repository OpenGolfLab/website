# Value Proposition Integration Plan

**Source:** value-prop ideation session, 2026-07-18.
**Companion to** `DIFFERENTIATION_PLAN.md` — that doc positions against FlushLab; this one turns the dataset-moat ideas into site sections, app hooks, and a marketing engine.

**The anchor sentence (use everywhere):** OpenGolfLab is building the only large-scale dataset of real amateur golf shots hit under controlled indoor conditions — tagged with club, ball, and launch monitor. Every alternative fails on an axis: Tour data is pros-only, Arccos is closed and weather-polluted, manufacturer numbers come from robots and marketing departments, magazine tests are small-N. Controlled conditions make sim data *cleaner* for comparisons, not lesser — no wind, no temperature, no elevation.

---

## Already built — don't redo, just point at it

- **Methodology transparency** → `/lab#methodology`. The brainstorm's "publish your method and caveats openly" is done; the remaining job is linking it from every external post.
- **Community norms, trust tiers, one-golfer-one-vote, honest empty states, live feed** → `/lab/community`.
- **Gear Guide as the payoff surface** → `/gear`, fed by community data per the homepage flywheel tiles.
- **Ball comparisons + gapping by handicap** → already promised in "Coming to Community Data."

## The gap the brainstorm exposes

Current messaging is all **collective** value ("open results, for everyone"). The emotional hook that gets one golfer to install — *"where do I actually stack up?"* — appears nowhere on the site. The flywheel must run in order: **individual value → comparative value → collective value**. Fix this first; it's copy, not code.

## Sequencing principle: gate by data volume, not calendar

| Tier | Data state | Unlocks on site | Marketing moment |
|---|---|---|---|
| **T0 (now)** | 0 published clubs | Moat + flywheel copy, percentile calculator (cited external data), founding-contributor push | Staged blog posts, calculator ship |
| **T1** | First clubs clear threshold (≥ min contributors) | Community percentiles replace external data; app benchmark cards | **First dataset publish = the launch post** (see `DIFFERENTIATION_PLAN.md` Phase 4.2) |
| **T2** | Hundreds of contributors | Segmentation (ball × swing speed), skill fingerprints, gapping by handicap | "State of the Data" cadence starts |
| **T3** | Thousands + cross-device volume | Launch monitor comparisons, sim strokes-gained baselines, public dataset | Open dataset release, annual report |

Never publish a T2 insight with T1 data. The threshold discipline already on `/lab/community` is the brand.

---

## Site changes

### 1. Homepage — lead with the moat and the flywheel (T0, copy only)

- `src/pages/index.astro` "Why this exists": add the anchor sentence as the section's opening claim. "The clubs and ball you use matter" stays as the human framing; the moat is the *reason to believe*.
- Rework the `ideas` trio into the flywheel, in order:
  1. **Contribute your shots** — zero-click, opt-in, anonymous.
  2. **Unlock your benchmarks** — see where you stack up against golfers with your swing speed. *(New — this is the missing individual hook.)*
  3. **Every shot sharpens the answer** — for you and everyone after you.
- `src/consts.ts` `SITE_MISSION` / `SITE_DESCRIPTION`: work in "real amateur shots under controlled indoor conditions."
- Hero lede: append the personal hook — "…and find out where you actually stack up."

### 2. Percentile calculator — the lead magnet (build T0, upgrade T1)

New page `/lab/benchmarks` (add to `LAB_SECTIONS` in `consts.ts`): enter driver ball speed or carry → your percentile among amateurs.

- **T0:** seed with cited public data — the `scripts/driver-segments.sources.json` pattern already exists. Label it **"sourced"**, consistent with the build-time-real-numbers guardrail.
- **T1+:** swap to community percentiles, relabel **"measured"**. The upgrade itself is a marketing beat.
- Static-friendly: percentile tables embedded as build-time JSON, small vanilla-JS island. No framework needed.
- Every result ends with two things: a share link and "Contribute your shots to sharpen this number." This is the page Reddit shares for you.

### 3. Community Data page — widen the "Coming" promises (T0 copy, T2/T3 delivery)

Add two planned cards to `/lab/community` alongside ball comparisons and gapping:

- **Launch monitor comparisons** — systematic spin/carry deltas between Mevo+, Launch Pro, Uneekor, R50, from golfers who log on multiple units. The LM-accuracy wars dominate r/Golfsimulator; even the *promise* of cross-device data at scale gets pinned in Discords.
- **Skill fingerprints** — what measurably separates a 5-handicap from a 15 (dispersion? strike consistency? speed?), answered empirically.

### 4. `/lab/data` — the open dataset (deliver T3, promise T0)

- Add to `/lab#roadmap` now: "Public anonymized dataset — versioned, documented, citable (CSV/Parquet)."
- When live: schema docs, license, a suggested citation format. Every YouTuber, blogger, or academic citation is a backlink and a credibility deposit. This is the "Open" in the name made literal.

### 5. App-side dependencies (`golf-sim-analytics` repo — note only)

- Percentile cards ("driver carry: 71st percentile at your swing speed") once T1 data exists.
- **Shareable insight-card PNG export** — turns every user into the content engine. Highest marketing leverage per engineering hour on this list.
- Session-over-session trends + gapping-gap flags per the existing feature roadmap. Long-term (T3+): practice-pattern × improvement correlations — findings nobody else can produce.

---

## Marketing engine

### Post formats (lead with the insight, never the product)

1. **The amateur-distance drop:** "We analyzed N amateur drives. Real carry by swing speed." The distance debate recurs on r/golf every few months; end it with data. (T1+)
2. **Monthly "State of the Data":** one surprising finding per drop. (T2+)
3. **"You ask, we analyze":** community votes on the next question. Free engagement, and it doubles as a product roadmap. (T1+ — can start earlier as "what should we measure first?")
4. **Launch monitor deltas:** the most viral category once cross-device volume exists. (T3)
5. **Skill fingerprints series:** "Anatomy of a scratch golfer" / "The slice epidemic, quantified." (T2+)
6. **Annual State of Sim Golf report:** the Strava Year-in-Sport / Arccos-distance-report analog. (T3, each January)

### Rules of engagement (Reddit/Discord)

- Every post links `/lab#methodology` and states caveats up front: enthusiast selection bias, device variance, mat vs. turf. Preemptive honesty is what separates "trusted source" from "torn apart in comments" — and it's already the site's voice.
- Chart first, product second. Let the comments ask where the data came from.
- Never post a number below the publish threshold, even when it's tempting.

### Framings to test in copy

"The Strava of sim golf" · "a crowdsourced Trackman Combine" · "the largest open database of real amateur golf shots." Test in the hero pill, OG descriptions, and Reddit post titles; keep whichever earns unprompted repetition.

### Launch moments (in order)

1. Percentile calculator ships (T0) — first shareable artifact.
2. First dataset publish (T1) — the big one; coordinate with `DIFFERENTIATION_PLAN.md` Phase 4.2.
3. Open dataset release (T3) — citation/backlink campaign.
4. Annual report (T3) — recurring tentpole.

---

## Guardrails (inherit from `DIFFERENTIATION_PLAN.md`, extend)

- Every published number stays real and build-time-computed; externally sourced data is always labeled with its sources, never blended silently with measured data.
- No small-N claims; thresholds stay visible next to every figure.
- LM comparisons publish as directional deltas with device counts — never "brand X reads wrong."
- Tone stays lab-coat: the restraint *is* the differentiation.
