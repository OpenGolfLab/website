# public/data

`summary.json` here is **generated** — do not edit it by hand.

It is the aggregated, anonymized community summary produced by `aggregate.py` in
the private `opengolflab-data` repo, and it is the only community data that is
public. The Lab page (`src/pages/lab.astro`) reads it at build time and renders
it; when it's absent, the Lab shows clearly-labeled sample data instead.

To refresh it: run `aggregate.py` in the data repo (it writes here automatically
when the two repos are checked out side by side), then commit and push this repo.
