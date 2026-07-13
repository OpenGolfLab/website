# public/data

`summary.json` here is **generated** — do not edit it by hand.

It is the aggregated, anonymized community summary produced by `aggregate.py` in
the private `opengolflab-data` repo, and it is the only community data that is
public. The Lab page (`src/pages/lab.astro`) reads it at build time and renders
it; when it's absent, the Lab shows clearly-labeled sample data instead.

To refresh it: run `aggregate.py` in the data repo (it writes here automatically
when the two repos are checked out side by side), then commit and push this repo.

## driver-rankings.json

`driver-rankings.json` here is **also generated** — do not edit it by hand.

It is the aggregated 2026 driver-ranking table shown on the Lab page: every major
club-review outlet's published ranking, tallied into one driver × ranker matrix
with a consensus column. It is produced by `scripts/build-driver-rankings.mjs`
from the hand-curated `scripts/driver-rankings.sources.json`.

To refresh it (after adding a new outlet or updating a ranking in the sources
file): run `npm run rankings`, then commit and push this repo. The same command
also emits the per-driver uncertainty stats (opinion score, ±1 SD band, n).

## driver-segments.json

`driver-segments.json` is **also generated** by `npm run rankings` — do not edit
by hand. It holds the "by player profile" and "by priority" matrices (each
outlet's category winners) shown under the main ranking table, built from the
hand-curated `scripts/driver-segments.sources.json`.
