# Differentiation Implementation Plan

**Goal:** make OpenGolfLab's unique strengths impossible to miss, and stop spending homepage real estate on things competitors (FlushLab) do as well or better.

**One-line frame:** FlushLab sells *physics for your swing* (mobile, manual entry, $9.99/mo). We sell *automatic capture + the community's evidence* (Windows/GSPro, zero-click, free & open). Never fight on their turf; make them look manual, capped, and closed by comparison.

---

## The differentiation matrix

### Amplify (unique to us — currently under-marketed)

| Strength | Reality in app/site today | Problem |
|---|---|---|
| Community Lab (crowd gear data) | Site's most defensible idea | Homepage hero is abstract ("Open Engine"); payoff buried below fold |
| Zero-click capture | App watches Desktop + live-tracks rounds, reconciles duplicates | Site says it, but never contrasts vs photo-scans/CSV imports others charge for |
| Free forever, no account, open source | True everywhere | Stated as facts, not weaponized against $9.99/mo + account + cloud |
| Unlimited local history | Career-long Parquet record; competitor Pro caps at 25 sessions | Never mentioned as *unlimited* |
| Fitting bay with live capture | Shafts/adapter A/B with per-config live shots | One of six equal cards; competitors paywall fitting |
| Speed training (fatigue curve, progression) | 3 views, unique in category | Undersold; no competitor has it |
| Auto on-course scorecards | Builds itself from sim rounds | Undersold; competitors have no round model |
| Reversible edits / data never touched | Sidecar edits, uninstall preserves data | Not on the site at all |
| Sample data mode | Two bundled synthetic datasets | Not on the site — it's a free demo for people still shopping for a sim |

### De-emphasize (we do it, but it's table stakes or they do it better)

- **Tour benchmarks** — we have PGA Tour + handicap 5–20 overlays; FlushLab has PGA + LPGA + 6 amateur levels and markets it hard, free. Keep the feature, drop it from the hero chips. It earns no differentiation.
- **Physics/coaching language** — no D-plane, no coaching debrief yet (and GSPro's Path/FaceToTarget columns are always 0 — we structurally can't do D-plane). Never use their vocabulary; it invites a comparison we lose today.
- **Dashboard counting** — "15 dashboards" invites a spec arms race ("34 physics formulas!"). Keep the number but subordinate it to outcomes.
- **Driver-model fitting comparisons** — theirs compares 7 driver models; our fitting bay compares shafts/settings. Don't imply model shootouts in the app — that's the Lab's job, and it's a better answer anyway.
- **Broad monitor support** — never apologize for GSPro-only. "Built for GSPro sim rigs" is a targeting choice, not a limitation. (Download FAQ already handles this well — keep that tone.)

---

## Phase 1 — Website messaging (quick wins, copy only)

1. **Rework homepage hero** (`src/pages/index.astro`, `src/consts.ts`):
   - Headline leads with the payoff, not the engine. Direction: *"Gear answers from thousands of real golfers — and every shot of yours, captured automatically."* Keep "Every shot. Every insight." as tagline.
   - Add a contrast strip under the CTAs (no competitor named): **"No photo scans. No CSV wrangling. No subscription. No account."** Each of those is a FlushLab friction point; each is literally true for us.
2. **Swap hero chips** (`index.astro` + `golf-sim-analytics.astro` heroChips): replace "Tour benchmarks" with **"Unlimited history"** and add **"No account · $0 forever"**. Keep "Zero-click capture" and "Local-first & private."
3. **Add a trust strip** (site-wide component, near footer): open source (GitHub) · local Parquet files · reversible edits · uninstall never deletes your data. This is our version of their "myth vs physics" credibility section — ours is verifiable, theirs is rhetoric.
4. **Sharpen the ICP voice:** speak to sim-rig owners (GSPro, r/Golfsimulator, GSPro Discord), not "golfers with a launch monitor." Hundreds of shots per session is our data density story — a manual-entry phone app tops out at 20/session free.

## Phase 2 — Product page restructure (`golf-sim-analytics.astro`)

1. Promote a **"Only possible in a sim"** trio above the six-card grid: Live rounds → Auto scorecards → Speed training. No mobile app can offer these; make the category gap explicit.
2. Give the **fitting bay its own section**: "A free fitting bay in your garage" — live capture per configuration, dispersion decides. Note plainly that fitting suites elsewhere are paid add-ons.
3. Add a **"Your data, your rules"** section: local files, no upload, reversible edits, no account, works offline. Include the SmartScreen honesty note — candor is on-brand.
4. Add **"Try it with sample data"** CTA for shoppers without a sim yet (bundled datasets already ship in the app — zero work beyond copy).
5. Move benchmarks down-page to a single matter-of-fact line.

## Phase 3 — Content engine (counter their SEO moat)

FlushLab has 39 guides including one targeting *our* GSPro users. We have 1 published post and 7 staged drafts.

1. **Ship the staged posts** (`staged-posts/`) on a weekly cadence — `gspro-has-no-memory.md` and `run-your-own-club-fitting-in-your-sim.md` are direct differentiation stories; sequence those first.
2. **Own GSPro-analytics keywords** they're squatting on: "GSPro export CSV," "GSPro shot data," "GSPro club gapping," "golf sim speed training." One deep guide each.
3. **Data journalism from the Lab** once the contribution pipeline has volume: "What a 12-handicap actually carries a 7-iron — from N thousand community shots." This is content no competitor can write, and it markets the app, the Lab, and the mission simultaneously.
4. Optional, decide later: an SEO comparison page ("Golf Sim Analytics vs. mobile launch-monitor apps"). Honest table, our terms. Only if search volume justifies punching sideways.

## Phase 4 — App roadmap alignment (close the one real gap)

Their strongest feature we lack: **prescriptive output** (Coaching Debrief, "yards lost, fix this first"). The existing `FEATURE_ROADMAP_PROMPT.md` already plans the fix — keep its sequencing, market it deliberately:

1. **Phase 0/1 as written** (AoA ingestion → Shot Quality Score → diagnostic flags). When it ships, the marketing name matters: call it a **Practice Debrief**, ship it **free**, and ground it in community norms once the Lab has data ("your launch vs golfers at your speed") — a coaching story FlushLab's tour-table approach can't tell.
2. **Contribution pipeline → first public dataset** is the single biggest marketing moment on the roadmap. Plan the launch post, the counters on `/lab/community`, and the "Verified tier — measured, not modeled" trust framing (already drafted in `contribute.py` and the community page — good line, use it everywhere).
3. Environmental normalization (roadmap Phase 2): when shipped, note it's free — weather adjustment is a Pro feature elsewhere.

## Phase 5 — Proof & measurement

1. Publish the testing protocol + aggregation methodology (link `AGGREGATION.md`) on `/lab` — radical openness is the credibility counterpart to their physics-lecture branding.
2. Live counters on the homepage once real: contributors, shots pooled, models covered. Replace static chips as data arrives (build-time JSON reads are already wired in `index.astro` — extend that pattern).
3. Track: GitHub release downloads, contribution opt-in rate, organic search impressions on GSPro terms, Discord/Reddit mentions.

---

## Guardrails

- Never name FlushLab on the site; contrast by implication ("no photo scans, no subscription").
- Never claim launch-monitor breadth, D-plane, or face/path analysis — data doesn't support it.
- Every homepage number must stay build-time-computed from real data (current pattern — keep it).
- Tone stays clean and evidence-first; their edgy voice is theirs. The lab-coat brand *is* differentiation.
