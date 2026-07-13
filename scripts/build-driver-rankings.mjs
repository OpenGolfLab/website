#!/usr/bin/env node
// ---------------------------------------------------------------------------
// build-driver-rankings.mjs
//
// Turns the hand-curated outlet data into the JSON the Lab page renders:
//   • driver-rankings.json  — the consensus table + per-driver uncertainty
//   • driver-segments.json  — "by priority" and "by player profile" matrices
//
// No dependencies — pure Node (ESM). Run with:  npm run rankings
//
// -- Consensus (ordering) -----------------------------------------------------
// Normalized Borda count. In a list of length L, the club at position r earns
// (L - r + 1) / L points (1.0 for first, →0 for last), summed across lists.
// Summing (not averaging) means a club is rewarded for placing highly AND for
// being reviewed widely, so a one-review wonder can't top a broadly-loved club.
//
// -- Uncertainty (per driver) -------------------------------------------------
// Each outlet placement is converted to a 0–100 "opinion score" normalized to
// that outlet's list length:  score = 100 * (L - rank) / (L - 1)  (#1 = 100).
// We then report, across the outlets that reviewed the club:
//   mean      — average opinion score
//   sd        — sample standard deviation (spread of opinion; 0/undefined at n=1)
//   band      — mean ± 1 sd, clamped to [0,100]  (the uncertainty band)
//   range     — min..max observed score
//   n         — number of outlets (strength of evidence)
//   evidence  — n-based tier: high (≥5) / medium (3–4) / low (1–2)
//   agreement — sd-based tier: tight (≤12) / mixed (≤25) / wide (>25); "single" at n=1
// This separates the two things readers conflate: how MANY reviewed it (n) and
// how much they AGREED (band). A single review shows a wide-uncertainty marker —
// unknown, not bad.
// ---------------------------------------------------------------------------

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Paths (overridable via env for testing in a sandbox).
const SRC = process.env.SRC || path.join(__dirname, "driver-rankings.sources.json");
const SEG = process.env.SEG || path.join(__dirname, "driver-segments.sources.json");
const OUT_RANK = process.env.OUT_RANK || path.join(ROOT, "public", "data", "driver-rankings.json");
const OUT_SEG = process.env.OUT_SEG || path.join(ROOT, "public", "data", "driver-segments.json");

const BRANDS = [
  "Tour Edge", "LA GOLF", "TaylorMade", "Callaway", "Titleist", "Cleveland",
  "Mizuno", "Srixon", "Takomo", "Cobra", "Wilson", "Ping", "PXG", "Vice", "Stix",
];
const brandOf = (m) =>
  BRANDS.find((b) => m.toLowerCase().startsWith(b.toLowerCase())) || m.split(" ")[0];
const round = (n, d = 2) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

// --- read sources -----------------------------------------------------------
const src = JSON.parse(fs.readFileSync(SRC, "utf-8"));

const rankers = src.rankers.map(({ id, name, url, title, note }) => ({
  id, name, url, title, note, count: 0,
}));
const rankerById = Object.fromEntries(rankers.map((r) => [r.id, r]));

// --- accumulate placements + normalized opinion scores ----------------------
const drivers = new Map();
for (const r of src.rankers) {
  const L = r.ranking.length;
  rankerById[r.id].count = L;
  r.ranking.forEach((model, i) => {
    const pos = i + 1;
    if (!drivers.has(model)) {
      drivers.set(model, {
        model, brand: brandOf(model), ranks: {}, borda: 0, scores: [],
      });
    }
    const d = drivers.get(model);
    d.ranks[r.id] = pos;
    d.borda += (L - pos + 1) / L; // consensus points
    d.scores.push(L > 1 ? (100 * (L - pos)) / (L - 1) : 100); // opinion score
  });
}

const evidenceTier = (n) => (n >= 5 ? "high" : n >= 3 ? "medium" : "low");
const agreementTier = (n, sd) =>
  n < 2 ? "single" : sd <= 12 ? "tight" : sd <= 25 ? "mixed" : "wide";

const rows = [...drivers.values()].map((d) => {
  const n = d.scores.length;
  const mean = d.scores.reduce((a, b) => a + b, 0) / n;
  const variance =
    n > 1 ? d.scores.reduce((a, s) => a + (s - mean) ** 2, 0) / (n - 1) : 0;
  const sd = Math.sqrt(variance);
  const positions = Object.values(d.ranks);
  return {
    model: d.model,
    brand: d.brand,
    ranks: d.ranks,
    appearances: n,
    avgRank: round(positions.reduce((a, b) => a + b, 0) / n),
    bestRank: Math.min(...positions),
    score: round(d.borda, 3),
    meanScore: round(mean, 1),
    sd: round(sd, 1),
    bandLow: n > 1 ? round(clamp(mean - sd, 0, 100), 1) : null,
    bandHigh: n > 1 ? round(clamp(mean + sd, 0, 100), 1) : null,
    scoreMin: round(Math.min(...d.scores), 1),
    scoreMax: round(Math.max(...d.scores), 1),
    evidence: evidenceTier(n),
    agreement: agreementTier(n, sd),
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

const rankingsOut = {
  category: src.category,
  season: src.season,
  generated_date: new Date().toISOString().slice(0, 10),
  method:
    "Consensus = normalized Borda count across outlet rankings. Opinion score = each placement normalized to its list length on a 0–100 scale (#1 = 100); the band is mean ± 1 SD of those scores, and n is how many outlets reviewed the club.",
  totals: { rankers: rankers.length, drivers: rows.length },
  rankers,
  drivers: rows,
};
fs.mkdirSync(path.dirname(OUT_RANK), { recursive: true });
fs.writeFileSync(OUT_RANK, JSON.stringify(rankingsOut, null, 2) + "\n", "utf-8");

// --- segments (by feature / by profile) -------------------------------------
function buildMatrix(group) {
  const cols = group.columns;
  const byOutlet = group.byOutlet;
  const rowsOut = cols.map((c) => {
    const cells = rankers
      .map((r) => {
        const pick = byOutlet[r.id]?.[c.id];
        return pick ? { ranker: r.id, model: pick } : null;
      })
      .filter(Boolean);
    // Consensus tally: most-named model(s) for this segment.
    const tally = {};
    cells.forEach((cell) => (tally[cell.model] = (tally[cell.model] || 0) + 1));
    const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const topCount = ranked.length ? ranked[0][1] : 0;
    const leaders = ranked.filter(([, v]) => v === topCount).map(([m]) => m);
    return {
      id: c.id,
      label: c.label,
      group: c.group || null,
      desc: c.desc || null,
      cells,
      count: cells.length,
      leaders,
      leaderCount: topCount,
    };
  });
  return rowsOut;
}

const seg = JSON.parse(fs.readFileSync(SEG, "utf-8"));
const segmentsOut = {
  category: src.category,
  season: src.season,
  generated_date: new Date().toISOString().slice(0, 10),
  rankers, // name/url/note for headers + credits
  features: buildMatrix(seg.features),
  profiles: buildMatrix(seg.profiles),
};
fs.mkdirSync(path.dirname(OUT_SEG), { recursive: true });
fs.writeFileSync(OUT_SEG, JSON.stringify(segmentsOut, null, 2) + "\n", "utf-8");

// --- console summary --------------------------------------------------------
console.log(`Wrote ${path.relative(ROOT, OUT_RANK)} — ${rows.length} drivers, ${rankers.length} outlets.`);
console.log("Consensus top 5 (score · n · band):");
rows.slice(0, 5).forEach((r) =>
  console.log(
    `  ${r.consensus}. ${r.model.padEnd(34)} borda ${r.score}  n=${r.appearances}  mean ${r.meanScore}  band ${r.bandLow ?? "–"}–${r.bandHigh ?? "–"}  (${r.evidence}/${r.agreement})`
  )
);
console.log(`Wrote ${path.relative(ROOT, OUT_SEG)} — ${segmentsOut.features.length} feature rows, ${segmentsOut.profiles.length} profile rows.`);
