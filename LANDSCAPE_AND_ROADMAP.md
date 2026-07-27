# OpenGolfLab — Landscape Sweep & Analytics Roadmap

**Date:** 2026-07-26
**Scope:** competitive sweep of golf simulator, launch monitor, club and ball data publishing — mapped against OpenGolfLab's stated mission.
**Companion to:** `DIFFERENTIATION_PLAN.md` (positioning vs FlushLab) and `VALUE_PROP_INTEGRATION.md` (dataset moat → site sections). This doc does not restate either; it adds the outside-in view and re-prioritizes against one hard constraint.

---

## 0. The constraint that should drive every decision

`public/data/summary.json` as of today:

| Metric | Value | Threshold |
|---|---|---|
| Contributors | **4** | 8 to publish anything |
| Shots pooled | 971 | — |
| Published clubs | 0 | — |
| Published balls | 0 | 6 contributors |
| Published gapping | 0 | 5 contributors |

You are at **T0**, four contributors from T1. Both existing planning docs are largely written for T1–T3. That means the honest reading of "what should I add?" is:

> Every recommendation below is scored on whether it works at **N=4**. Anything that needs the crowd is a *sequenced promise*, not a build item. The binding constraint is contributor supply, and almost nothing in the current plan attacks it directly.

The rest of this doc is organized around that.

---

## 1. The landscape, and where the hole actually is

### Who publishes golf performance data today

| Publisher | Sample | Method | Fatal limitation for your reader |
|---|---|---|---|
| **Golf Digest / Golf Laboratories** | ~95 mph robot, Pro V1x, multi-zone face | Swing robot, controlled | It's a robot. Zero mishit realism, one swing profile |
| **Today's Golfer** (2026 ball test) | 62 models, 2,232 shots, 50k+ data points, Loughborough indoor lab, GCQuad | Robot, 3 swing speeds | Still a robot; models "slow/mid/fast" rather than measuring real players |
| **MyGolfSpy Ball Lab** | ~5 balls per model | Physical/quality teardown | Publicly criticized for N=5 and for **publishing means without SD or sample size** |
| **Arccos Distance Report** | ~10M driver shots, 5M rounds | Real golfers, on course | Outdoor → weather/elevation/turf polluted. Closed data. Driver-distance only. No club or ball tags |
| **Shot Scope** | 350M+ shots | Real golfers, on course | Same pollution, closed, no gear attribution |
| **USGA/R&A Distance Insights** | ~285k drives/yr | Tour + some amateur | Pros-first, policy-oriented, not gear-comparative |
| **PGA ShotLink** | Shot-level, tour | Gold standard | Pros only, and **academic access was discontinued** |
| **Manufacturers** | Undisclosed | Robot + marketing | "Up to 14 more yards" |

### The hole

Nobody publishes **shot-level data from real amateur swings under controlled conditions, tagged with club, ball and launch monitor.** That is exactly your anchor sentence, and the sweep confirms it is not occupied. Two independent verifications:

- I could find **no public cross-device same-shot study** comparing spin/carry deltas across Mevo+, SkyTrak, Launch Pro, Uneekor, R50. The launch-monitor accuracy argument is the single most-repeated dispute in sim communities and it is being settled with anecdote.
- I could find **no public shot-level open golf dataset** at all. Kaggle/data.world golf datasets are tournament-results tables. GolfDB is swing video. There is no amateur ball-flight corpus.

**Sharpen the anchor sentence into a three-way contrast — it's more legible than the current version:**

> Robot tests tell you what the club does. Tour data tells you what Rory does.
> Nobody tells you what a club does *for someone who swings like you*. That's the dataset.

### The wedge nobody is using: error bars

The MyGolfSpy criticism is the most actionable finding in this sweep. Their readers are explicitly asking for standard deviations, sample sizes and confidence intervals, and not getting them. Meanwhile your `/lab` methodology already commits to median + 10th–90th percentile and a publish threshold.

**Make that the brand, not a footnote.** "We ship the error bars" is a one-line differentiator against *every* publisher in the table above, it's true today at N=4, and it costs nothing to say. Concretely: every figure on the site should render spread, and every figure should carry its n. See §3.

### Where you are structurally exposed

Three honest risks, worth naming internally:

1. **GSPro-only caps contributor supply**, and contributor supply is your binding constraint. The differentiation doc frames GSPro-only as a targeting choice — correct for *messaging*, but it's still the thing gating T1. A read-only CSV ingest path for non-GSPro units (Awesome Golf, FSX, E6 exports) is a supply decision, not a positioning retreat.
2. **Mat-vs-turf is an unmeasured confound in your own dataset.** Vendor claims range from "3% off grass" (TrueStrike) to 12%+ for others, with no independent data. Right now `/lab#caveats` says "it's simulator golf." Good, but the confound will be the first thing a skeptical Reddit commenter names.
3. **Self-declared launch monitors + device-dependent spin** means your pooled numbers mix measured and estimated spin. You already gate tiers on this — but radar units *estimate* spin indoors on low-spin driver shots, which is precisely the headline metric.

Each of these is also a content asset. That's the pattern: **your caveats are your best articles.**

---

## 2. What to add — ranked by mission fit × buildability at N=4

### Tier A — Build now. Zero community data required, directly serves the mission.

**A1. The Sample-Size Calculator — `/lab/tools/sample-size`**
*"How many shots do you need to tell these two clubs apart?"*

Input: the observed carry difference and your shot-to-shot standard deviation (or hit ~10 shots and enter the range). Output: shots per club required to detect that difference, plus a plain-English verdict — *"At 6 yards apart and your 11-yard spread, 40 shots each still won't separate them. This is a coin flip."*

Why this is the single highest-value thing on the list:
- It is the most on-brand tool that could exist for a site whose whole thesis is statistical honesty. It literally sells the mission.
- It makes the *entire* home-fitting category — including your own staged post `run-your-own-club-fitting-in-your-sim.md` — rigorous instead of vibes.
- It is inherently viral in exactly your audience, because it lets someone dunk on a marketing claim with arithmetic.
- Zero data dependency. Pure client-side math. Small vanilla island, same pattern as `/lab/benchmarks`.
- It creates demand for volume: "you need 60 shots per config" is an argument for an app that captures automatically.

**A2. Launch Monitors & Sim Hardware — a fifth Gear Guide section (`/gear#launch-monitors`)**

Your Gear Guide maps drivers, irons, wedges and balls. Your audience is sim owners. **The launch monitor is the largest, highest-anxiety purchase they make, and it's not on the site.** This is the biggest structural gap I found.

Same `position` spectrum treatment you already use, but the axis is the one that matters and that nobody plots honestly:

- **X axis: measured → estimated.** Which metrics does this unit *measure* versus *derive*? Photometric units measure spin from dimple pattern; radar units estimate it indoors. Put it on a chart.
- **Y axis: price.** Reuse `PriceChart.astro` wholesale.
- Per-model flags: subscription required (Y/N), indoor/outdoor, club data measured vs calculated, ceiling height requirement, GSPro-compatible.

Populate from `driver-lineups.json`'s exact schema — this is a new JSON file and a section, not new components. 2026 lineup to seed: Rapsodo CLMPRO (ceiling-mount, 6-camera), Square Omni Edition (~$1,600, 4-camera photometric, indoor+outdoor), FlightScope Mevo Gen2 / Gen2 Range, Bushnell Launch Pro, Foresight GC3/GCQuad, Garmin R10/R50, SkyTrak+, Uneekor EYE series, TrackMan 4.

The "measured vs estimated" axis is also the *setup* for the T3 community payoff already promised on `/lab/community` ("Launch monitors, compared"). You'd be building the question now and answering it later with your own data. That's the flywheel made visible.

**A3. Fix the analytics stack — replace GA4 with Cloudflare Web Analytics**

You are deployed on Cloudflare (`wrangler.jsonc`), you run `GA_MEASUREMENT_ID = "G-0TKQ8HMBFG"`, and your entire brand is local-first, no-account, no-upload privacy. Shipping Google's tag is the one place the site contradicts itself, and it's the first thing a privacy-minded Reddit commenter will screenshot.

Cloudflare Web Analytics is free, cookieless, requires no consent banner, and is already in your stack. Swap it, then say so on `/privacy`. It converts a liability into a proof point.

**Then instrument the funnel that actually matters.** Right now you almost certainly can't answer "why is contributor count 4?" Minimum event schema:

| Event | Why |
|---|---|
| `download_click` (source page) | Which page sells the app |
| `guide_view` → `contributing_section_view` | Do people even reach the contribute pitch? |
| `benchmark_calc_complete` | Lead-magnet conversion |
| `sample_size_calc_complete` | Same, for A1 |
| `share_link_copy` | Virality, per-tool |
| `gear_section_view` (drivers/irons/wedges/balls/LM) | Which category earns the traffic |
| Scroll depth on `/lab/community` | Is the contributor ask below the fold? |

The one number to build a dashboard around: **installs → opt-in rate.** That single ratio determines whether you reach T1 in weeks or quarters, and nothing on the site currently measures it.

**A4. Contributor progress as a site-wide element, not a page section**

`/lab/community` has the "be one of the first 8" framing. It's the most important thing on the site right now and it lives on the least-visited page. Put a thin progress strip in the footer or under the homepage hero: **4 / 8 contributors — 971 shots pooled. The first benchmark publishes at 8.**

Scarcity plus a visible finish line converts far better than an abstract mission. It's build-time JSON you already read. This is an afternoon.

---

### Tier B — Build next. Small data dependency or moderate effort, high mission fit.

**B1. Gapping Analyzer — `/lab/tools/gapping`**
Drop a GSPro CSV (or the app's export) → carry distribution per club, gap chart, flagged overlaps and holes. Entirely client-side, nothing uploaded — which is itself the demo of your privacy claim. Competing gapping tools exist (MyGolfSpy, CaddyCompare) but they're **manual-entry and single-number**; yours reads real distributions and can show the overlap between adjacent clubs, which is the thing single numbers hide. Ships as a lead magnet at T0; upgrades to "…and here's how your gaps compare to golfers at your speed" at T2.

**B2. Dispersion → Strokes Gained converter — `/lab/tools/dispersion`**
Your staged post `how-many-strokes-is-dispersion-worth.md` does this arithmetic in prose. Make it interactive: enter carry and dispersion for two clubs → expected strokes gained per round. Publish the post *and* the tool together; the post is the methodology page for the tool. This is the bridge between the yards the industry sells and the strokes readers score in, and it's the intellectual core of your Gear Guide's "distance vs forgiveness" thesis.

**B3. Ship the staged posts, resequenced**
Five posts sit in `staged-posts/`. Current suggested order is `speed-training-95-to-130` next. **Reorder by contributor-acquisition value:**

1. `run-your-own-club-fitting-in-your-sim.md` — ships with A1 (sample-size calculator) embedded. This is the flagship pairing.
2. `how-many-strokes-is-dispersion-worth.md` — ships with B2 embedded.
3. `does-the-ball-you-hit-into-your-screen-matter.md` — highest-search-intent of the five and directly on the LM-spin-accuracy fault line. Note the range-ball spin distortion figure (300–800 rpm) — it's the concrete hook.
4. `is-your-old-driver-costing-you-distance.md` — n=40 personal test; pair it with A1 so it's honest about its own power.
5. `speed-training-95-to-130.md` — best narrative, weakest acquisition. Save it as the piece you push when you have traffic to convert.

**B4. The Mat & Surface page — `/lab/surfaces`**
Turn caveat #2 into an asset. What's known about mat-vs-turf launch/spin deltas, what's vendor claim versus measurement, and what your own protocol does about it. Then state the open question and invite it into the roadmap. This is a page nobody else in golf will write, it's high-intent commercially (mats are a $150–$800 purchase your readers make), and it inoculates you against the obvious critique.

---

### Tier C — Sequenced promises. Right idea, wrong time. Do not build before threshold.

Already correctly captured on `/lab/community` and in `VALUE_PROP_INTEGRATION.md` — I'd only change the ordering:

| Item | Gate | Note |
|---|---|---|
| Ball comparisons | 6 contributors | Nearest threshold — likely your actual first publish, not clubs |
| Gapping by handicap | 5 contributors | Second nearest. Pairs with B1 |
| Club benchmarks | 8 contributors | Currently framed as first; it's actually third |
| Launch monitors compared | T3, cross-device volume | The virality jackpot. A2 builds the question now |
| Skill fingerprints | T2 | |
| Public open dataset `/lab/data` | T3 | The citation/backlink play. Genuinely nobody has this |

**One correction worth making:** `/lab` currently frames club benchmarks as the first publish. Your own thresholds say gapping (5) and balls (6) clear before clubs (8). Re-sequencing the copy makes the finish line nearer and the ask more credible.

---

## 3. Figures and visual language

You already have strong instruments: `QuadrantMap`, `PriceChart`, `DispersionTradeoff`, `CommunityExplorer`, `FocusFilter`. What's missing is a **consistent statistical grammar**. Three rules, applied everywhere:

1. **No naked point estimates.** Every central value renders with its spread (10th–90th band, box, or violin). This is the "error bars" brand from §1 made structural rather than rhetorical.
2. **Every figure carries its n and its date**, in the same position, in mono type. Cheap, and it's the thing MyGolfSpy's readers are begging for.
3. **Sourced vs measured is a visual state, not a caption.** You already do hollow-dot/asterisk for sample data. Extend that same encoding to externally-sourced data (`/lab/benchmarks` T0) so the eventual T1 swap to measured data is *visible* — the upgrade becomes a marketing beat, as `VALUE_PROP_INTEGRATION.md` intends.

### Specific figures worth building

**The confound chart — highest-leverage unbuilt figure on this list.** Your own `public/data/README.md` documents that in the sample pool, the raw carry gap across the driver spectrum is ~8 yards, **of which only ~2.4 is the equipment** — the rest is that better players own better drivers, better balls and better launch monitors. That is a genuinely excellent finding, it explains why your standardization controls exist, and it is the single best argument that naive gear comparisons are wrong. Build it as a waterfall: raw gap → minus handicap effect → minus ball effect → minus LM effect → true equipment effect. It becomes an article ("Most of the gear gap isn't the gear"), a homepage figure, and the justification for your entire methodology, all at once.

**Power curve** (for A1): shots-per-club on x, detectable difference in yards on y, banded by dispersion. One glance shows why a 12-shot retail fitting can't resolve a 5-yard claim.

**Measured-vs-estimated matrix** (for A2): launch monitors × metrics, three states per cell — measured / derived / not reported.

**Price-per-yard, and price-per-datapoint.** You have prices for 100+ club models and (with A2) launch monitors. Almost nobody plots cost against performance honestly. For launch monitors specifically, "dollars per measured metric" is a chart the whole category deserves.

**Distribution overlap for gapping** (for B1): two adjacent clubs' carry distributions, shaded where they overlap. Instantly legible, and it's the argument for distributions over averages in one image.

---

## 4. Themes to own

Ranked by how defensible they are given what exists today.

1. **"We publish the error bars."** Directly exploits the loudest unmet demand in golf equipment media. True at N=4. Costs nothing.
2. **"Robot data tells you what the club does. We tell you what it does for someone who swings like you."** The three-way contrast from §1 — legible in one sentence, which the current anchor sentence isn't.
3. **"Controlled conditions make sim data cleaner, not lesser."** Already in `VALUE_PROP_INTEGRATION.md`, still the best reframe you have. Every competitor's real-golfer data is weather-polluted; yours isn't. Lead with it whenever "but it's a simulator" comes up.
4. **"How many shots is that claim worth?"** A recurring format, not a one-off. Take any marketing claim, compute the sample size needed to detect it, publish the verdict. Infinitely renewable, needs no community data, and it *is* the mission.
5. **The open dataset.** Long game, but the only asset here that earns academic citations and permanent backlinks. Keep it on the roadmap loudly.

**Avoid:** coaching/swing-mechanics vocabulary (correctly flagged in `DIFFERENTIATION_PLAN.md` — GSPro's Path/FaceToTarget columns being zero makes D-plane structurally impossible for you); anything AI-branded (the 2026 category is saturating fast — Uneekor AIMY et al. — and it's the opposite of your evidence-first tone); and head-to-head "brand X reads wrong" claims about launch monitors, which your own guardrails already forbid.

---

## 5. Suggested sequence

| # | Item | Effort | Gate |
|---|---|---|---|
| 1 | Contributor progress strip site-wide (A4) | hours | none |
| 2 | Cloudflare Analytics swap + event schema (A3) | ~1 day | none |
| 3 | Sample-size calculator (A1) + fitting post | ~3 days | none |
| 4 | Launch monitor Gear Guide section (A2) | ~4 days | research time |
| 5 | Dispersion→SG tool (B2) + post | ~2 days | none |
| 6 | Gapping analyzer (B1) | ~3 days | none |
| 7 | Confound waterfall figure + post (§3) | ~2 days | data already exists |
| 8 | Mat & surface page (B4) | ~2 days | research time |
| 9 | Re-sequence publish copy: gapping → balls → clubs | hours | none |
| 10 | Remaining staged posts, weekly | ongoing | none |

Items 1–3 are the ones that move contributor count. If bandwidth is limited, do only those.

---

## Sources

- [Today's Golfer — 2026 robot ball test (62 models, 2,232 shots)](https://www.todays-golfer.com/equipment/best/golf-balls-us/)
- [MyGolfSpy Ball Lab — methodology and sample-size discussion](https://mygolfspy.com/about-mygolfspy-ball-lab/)
- [MyGolfSpy reader input on ball test transparency](https://mygolfspy.com/mgs-reader-input-golf-ball-test/)
- [Arccos 2026 Annual Driving Distance Report](https://www.arccosgolf.com/blogs/community/arccos-golf-releases-largest-ever-annual-driving-distance-report-leveraging-data-from-25-million-rounds-to-deliver-eight-year-trend-analysis-across-age-gender-and-skill-level)
- [MyGolfSpy — 6 insights from the 2026 Arccos distance report](https://mygolfspy.com/news-opinion/6-insights-from-the-2026-arccos-driving-distance-report/)
- [Golf Digest — robot testing analysis, 2026 driver and iron series](https://www.golfdigest.com/story/taylormade-qi4d-driver-robotic-testing-analysis)
- [USGA Distance Insights](https://www.usga.org/content/usga/home-page/advancing-the-game/distance-insights.html)
- [USGA Conforming Club and Ball Lists](https://www.usga.org/content/usga/home-page/equipment-standards/conforming-club-ball-lists.html)
- [Understanding launch monitor data — measured vs estimated spin](https://golfsimdepot.com/blogs/knowledge-center/understanding-launch-monitor-data)
- [Golf Simulator Forum — mats vs grass ball data differences](https://golfsimulatorforum.com/forum/build-your-own/mats-turf-and-flooring/26093-mats-vs-grass-significant-ball-data-difference)
- [PlayBetter — launch monitors and simulators of the 2026 PGA Show](https://www.playbetter.com/blogs/golf-tech-news/launch-monitors-and-simulators-2026-pga-show)
- [Golf Business Network — most interesting launch monitor releases of 2026](https://golfbusinessnetwork.com/gbn-news/gbn-article/the-most-interesting-launch-monitor-releases-so-far-in-2026/2026/07/21/)
- [SimSights — GSPro data export guide](https://simsightsgolf.com/learn/software/gspro)
- [Home Performance Lab — 2026 simulator software comparison](https://homeperformancelab.com/best-golf-simulator-software/)
- [Arxiv — golf strategy optimization, on ShotLink academic access](https://arxiv.org/pdf/2309.00485)
