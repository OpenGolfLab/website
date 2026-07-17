# public/data

## summary.json (generated — do not edit)

The aggregated, anonymized community summary produced by `aggregate.py` in the
private `opengolflab-data` repo; it is the only community data that is public.
The Lab's Community page reads it at build time; when it's absent, the section
shows an honest "collecting first dataset" state instead of zeros.

To refresh it: run `aggregate.py` in the data repo (it writes here automatically
when the two repos are checked out side by side), then commit and push this repo.

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
