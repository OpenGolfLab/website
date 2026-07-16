# public/data

## summary.json (generated — do not edit)

The aggregated, anonymized community summary produced by `aggregate.py` in the
private `opengolflab-data` repo; it is the only community data that is public.
The Lab's Community page reads it at build time; when it's absent, the section
shows an honest "collecting first dataset" state instead of zeros.

To refresh it: run `aggregate.py` in the data repo (it writes here automatically
when the two repos are checked out side by side), then commit and push this repo.

## driver-lineups.json (hand-curated)

The 2026 driver lineup spectrum + street pricing shown on Lab · Market.
`position` is 0 (max forgiveness) → 100 (pure distance), an editorial estimate.
Prices are checked by hand; `scripts/update_prices.cjs` is a scraper prototype
that can refresh them.

## ball-lineups.json (hand-curated)

The 2026 golf-ball spectrum + per-dozen street pricing shown on Lab · Market.
Same shape as the driver file, plus `construction` and `compression` per model.
`position` is 0 (low spin / soft) → 100 (max spin / tour), an editorial estimate
from construction, cover material, compression, and published robot data.

⚠️ Prices were seeded editorially — **verify against retailers before deploy**,
same drill as the driver file.

## iron-lineups.json (hand-curated)

The 2026 iron quadrant map + per-set pricing shown on Lab · Gear Guide.
Same shape as the driver file, plus per model: `category` (one of `blade`,
`players-cb`, `players-distance`, `game-improvement`, `max-gi`), `loft7`
(manufacturer's standard 7-iron loft in degrees — the anti-loft-jacking axis),
and `construction`. `position` is 0 (max forgiveness) → 100 (max
workability/precision), an editorial estimate. Prices are MSRP for a 7-club
steel set.

⚠️ Prices were seeded editorially from MSRPs — **verify against retailers
before deploy**. PXG and the DTC brands discount aggressively.

## speed-journey.csv (illustrative)

The monthly dataset behind the "95 to 130" blog post — an artificial
reconstruction of a two-year speed-training log (avg-best-5 speed, session max,
median carry, handicap index, phase). The post's charts are generated from this
file and note the reconstruction in their footers. Not community data; keep it
out of any aggregation.
