# public/data

## summary.json (generated — do not edit)

The aggregated, anonymized community summary produced by `aggregate.py` in the
private `opengolflab-data` repo; it is the only community data that is public.
The Lab's Community page reads it at build time; when it's absent, the section
shows an honest "collecting first dataset" state instead of zeros.

To refresh it: run `aggregate.py` in the data repo (it writes here automatically
when the two repos are checked out side by side), then commit and push this repo.

## sample_points.json (generated — do not edit, do not aggregate)

Synthetic contributor pool that pads the Community page while the real one is
small. Regenerate with `node scripts/generate-sample-data.mjs`; the seed is
fixed so rerunning it produces no diff.

Three rules govern this file, and the first is the one that matters:

1. **Every product in it has a placeholder name** ("Low-Spin Driver F", "Tour
   Urethane Ball P", "Radar LM C") and none of them is a real make or model.
   Attaching invented carry and mishit numbers to real branded products would
   publish a fabricated performance verdict about someone else's merchandise,
   which a "sample data" label does not fix — the whole point of the feature is
   to read a comparison off it. Placeholders remove the problem entirely, which
   is also why the generated products are allowed distinct profiles: with no
   real name attached, a realistic trade-off is a demo rather than a claim.
2. **Every row carries `sample: true`**, and the site marks them — hollow dots
   on the explorer, an asterisk in the tables, a banner at the top of the page,
   and a switch that removes them.
3. **It must never enter the aggregation pipeline** in the private data repo.
   It isn't contributed data and doesn't describe any real golfer.

Products are anchored to the real `position` spectrum from the driver and ball
lineup files, so the pool has the same shape and spread as the actual market.

**The driver pool is 15: five max-forgiveness, five balanced, five low-spin**,
with positions sampled from the real lineup file so they still sit on the actual
market spectrum.

**The `dispersion` block holds raw shots, not aggregates** — one cell per
(driver band × handicap group), because the distance-versus-forgiveness plot
needs the shape of the scatter and a median hides it. The interaction it shows
is generated from the clubface model, not asserted: a head's offline penalty is
multiplied by the strike error rather than added to it, so a player who misses
the centre often pays it far more than one who doesn't. That produces roughly a
5× larger spread penalty for a 20+ handicap than a 0–9 on the same head. If you
change `offAmp` or `strikeSd`, that headline number moves with it.

**Confounds are generated on purpose.** Better golfers are assigned low-spin
heads and tour urethane, and better golfers own better launch monitors, which
in turn report carry differently. That is what the real world looks like, and
it's what makes the Community ranking's standardization necessary rather than
decorative: the raw carry gap across the driver spectrum here is ~8 yards, of
which only ~2.4 is the equipment. If you regenerate with these correlations
removed, the "standardize for handicap / launch monitor" switches will appear
to do nothing and the ranking will look broken.

Delete this file, `scripts/generate-sample-data.mjs` and
`src/components/SampleDataBanner.astro` once the real pool passes the
contributor count in that component (`REMOVE_AT_CONTRIBUTORS`).

## driver-lineups.json (hand-curated)

The 2026 driver lineup spectrum + street pricing shown on the Gear Guide (/gear).
`position` is 0 (max forgiveness) → 100 (pure distance), a researched estimate.
Prices are checked by hand; `scripts/update_prices.cjs` is a scraper prototype
that can refresh them.

## ball-lineups.json (hand-curated)

The 2026 golf-ball spectrum + per-dozen street pricing shown on the Gear Guide (/gear).
Same shape as the driver file, plus `construction` and `compression` per model.
`position` is 0 (low spin / soft) → 100 (max spin / tour), a researched estimate
from construction, cover material, compression, and published robot data.

⚠️ Prices were seeded by hand — **verify against retailers before deploy**,
same drill as the driver file.

## iron-lineups.json (hand-curated)

The 2026 iron quadrant map + per-set pricing shown on the Gear Guide (/gear).
Same shape as the driver file, plus per model: `category` (one of `blade`,
`players-cb`, `players-distance`, `game-improvement`, `max-gi`), `loft7`
(manufacturer's standard 7-iron loft in degrees — the anti-loft-jacking axis),
`construction`, and `config` (the stock set makeup the price buys, e.g.
"4-PW steel" or "$229/club × 7" — shown on hover). `position` is 0 (max
forgiveness) → 100 (max workability/precision), a researched estimate.

`price` is what the `dealerUrl` page actually charges for that stock config
(verified by hand July 2026); `dealerUrl` must point at the model's product
page, never a brand landing page. PXG and the DTC brands discount
aggressively — re-verify before deploy.

## wedge-lineups.json (hand-curated)

The 2026 wedge quadrant map + per-wedge pricing shown on the Gear Guide
(`/gear#wedges`). Same shape as the driver file, plus per model: `category`
(one of `tour`, `forged`, `full-face`, `game-improvement`), `loft` and `bounce`
(the 56° option's signature spec — bounce is the vertical axis), `grind` (the
sole grind options), `construction`, and `config`. `position` is 0 (max
forgiveness / cavity) → 100 (max workability / tour blade), a researched
estimate. Each wedge is plotted at one representative bounce even though most
models offer a range.

⚠️ Prices and `dealerUrl`s were seeded by hand at the model's product page —
**verify against retailers and set real deep-links before deploy**, same drill
as the other lineup files.

## speed-journey.csv (illustrative)

The monthly dataset behind the "95 to 130" blog post — an artificial
reconstruction of a two-year speed-training log (avg-best-5 speed, session max,
median carry, handicap index, phase). The post's charts are generated from this
file and note the reconstruction in their footers. Not community data; keep it
out of any aggregation.
