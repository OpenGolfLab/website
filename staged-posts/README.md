# Staged blog posts

Posts pulled from the live site (2026-07-15) to be rolled out one at a time.
Only `introducing-opengolflab.md` remains published.

**To publish one:** move it back to `src/content/blog/` — the blog index, RSS
feed, and post page pick it up automatically. Consider bumping its `pubDate`
frontmatter to the day you actually publish it.

## Cross-links to watch

These posts link to each other, so a post published while its neighbors are
still staged will contain dead `/blog/...` links. What each post links to:

- `gspro-has-no-memory` → meet-golf-sim-analytics
- `meet-golf-sim-analytics` → gspro-has-no-memory
- `speed-training-95-to-130` → gspro-has-no-memory
- `does-the-ball-you-hit-into-your-screen-matter` → run-your-own-club-fitting-in-your-sim
- `run-your-own-club-fitting-in-your-sim` → does-the-ball…, is-your-old-driver…, how-many-strokes…
- `is-your-old-driver-costing-you-distance` → how-many-strokes…, run-your-own-club-fitting…, does-the-ball…
- `how-many-strokes-is-dispersion-worth` → is-your-old-driver… (×2), speed-training-95-to-130

Suggested rollout order that never leaves a dead link:
gspro-has-no-memory + meet-golf-sim-analytics (pair), then
speed-training-95-to-130, then how-many-strokes-is-dispersion-worth… — or just
publish in any order and accept temporary 404s / trim the links as you go.

## Links removed from the site (restore when the post ships)

- `src/pages/lab/gear.astro` — "Which half are you shopping in?" footer used to
  link to `/blog/how-many-strokes-is-dispersion-worth` ("The strokes math
  behind the rule is in …").
- `src/pages/lab/gear.astro` — ball-map caption used to end with "; whether
  your own monitor can even see these differences is
  [its own story](/blog/does-the-ball-you-hit-into-your-screen-matter)."
