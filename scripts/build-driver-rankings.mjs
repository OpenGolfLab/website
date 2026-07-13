#!/usr/bin/env node
// ---------------------------------------------------------------------------
// build-driver-rankings.mjs
//
// Reads the hand-curated outlet rankings in driver-rankings.sources.json,
// normalizes them into a driver x ranker matrix, computes a consensus score,
// and writes public/data/driver-rankings.json for the Lab page to render.
//
// No dependencies — pure Node (ESM). Run with:  npm run rankings
//
// Consensus method: normalized Borda count. In a list of length L, the club at
// position r earns (L - r + 1) / L points (1.0 for first, →0 for last). Points
// are summed across every outlet that ranked the club, so a club rewards both
// for placing highly AND for showing up on many lists, without letting a long
// list outvote a short one. Rows are sorted by that score (desc), tie-broken by
// number of appearances (desc) then average rank (asc).
// ---------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(__dirname, "driver-rankings.sources.json");
const OUT = path.join(ROOT, "public", "data", "driver-rankings.json");

// Longest brand names first so multi-word brands match before single words.
const BRANDS = [
  "Tour Edge",
  "LA GOLF",
  "TaylorMade",
  "Callaway",
  "Titleist",
  "Cleveland",
  "Mizuno",
  "Srixon",
  "Takomo",
  "Cobra",
  "Wilson",
  "Ping",
  "PXG",
  "Vice",
  "Stix",
];

function brandOf(model) {
  const hit = BRANDS.find((b) => model.toLowerCase().startsWith(b.toLowerCase()));
  return hit || model.split(" ")[0];
}

function round(n, d = 2) {
  const f = 10 ** d;
  return Math.round(n * f) / f;
}

const src = JSON.parse(fs.readFileSync(SRC, "utf-8"));
const rankers = src.rankers.map(({ id, name, url, title, note }) => ({
  id,
  name,
  url,
  title,
  note,
  count: 0,
}));

// model -> { model, brand, ranks: {rankerId: position}, score, appearances }
const drivers = new Map();

for (const r of src.rankers) {
  const L = r.ranking.length;
  r.ranking.forEach((model, i) => {
    const pos = i + 1;
    if (!drivers.has(model)) {
      drivers.set(model, { model, brand: brandOf(model), ranks: {}, score: 0, positions: [] });
    }
    const d = drivers.get(model);
    d.ranks[r.id] = pos;
    d.positions.push(pos);
    d.score += (L - pos + 1) / L; // normalized Borda
  });
  rankers.find((x) => x.id === r.id).count = L;
}

const rows = [...drivers.values()].map((d) => {
  const appearances = d.positions.length;
  const avgRank = d.positions.reduce((a, b) => a + b, 0) / appearances;
  const best = Math.min(...d.positions);
  return {
    model: d.model,
    brand: d.brand,
    ranks: d.ranks,
    appearances,
    avgRank: round(avgRank),
    bestRank: best,
    score: round(d.score, 3),
  };
});

rows.sort(
  (a, b) =>
    b.score - a.score ||
    b.appearances - a.appearances ||
    a.avgRank - b.avgRank ||
    a.model.localeCompare(b.model)
);
rows.forEach((row, i) => (row.consensus = i + 1));

const out = {
  category: src.category,
  season: src.season,
  generated_date: new Date().toISOString().slice(0, 10),
  method:
    "Normalized Borda count across outlet rankings; each list weighted equally regardless of length. Lower consensus number = stronger cross-outlet agreement.",
  totals: { rankers: rankers.length, drivers: rows.length },
  rankers,
  drivers: rows,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf-8");

console.log(
  `Wrote ${path.relative(ROOT, OUT)} — ${rows.length} drivers across ${rankers.length} outlets.`
);
console.log("Consensus top 5:");
rows.slice(0, 5).forEach((r) =>
  console.log(`  ${r.consensus}. ${r.model} (score ${r.score}, on ${r.appearances}/${rankers.length} lists)`)
);
