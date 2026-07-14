#!/usr/bin/env node
// ---------------------------------------------------------------------------
// build-driver-rankings.mjs
//
// Turns the hand-curated outlet data into the JSON the Lab page renders:
//   • driver-rankings.json  — the consensus table + per-driver uncertainty,
//                             the "also available" (reviewed-but-unranked) list,
//                             and a forgiveness / distance / senior breakdown
//   • driver-segments.json  — "by priority" and "by player profile" matrices
//
// No dependencies — pure Node (ESM). Run with:  npm run rankings
//
// -- What counts as a "ranking" ----------------------------------------------
// Only sources flagged `ranked: true` in driver-rankings.sources.json publish a
// TRUE ordinal ranking (position = overall quality). Category / segmented guides
// (`ranked: false`) crown a "best for X" per section — their slot order is NOT a
// quality order, so folding them into a Borda count wrongly punishes whatever
// club sits in the lowest section (e.g. a "best for slow swing speeds" pick read
// as "ranked last"). Those sources feed the segmented tables, the priority
// breakdown, and the "also available" list instead — never the consensus.
//
// -- Consensus (ordering) -----------------------------------------------------
// Normalized Borda count over the ranked sources only. In a list of length L, the
// club at position r earns (L - r + 1) / L points (1.0 for first, ->0 for last),
// summed across lists. Summing (not averaging) rewards a club for placing highly
// AND for showing up across many ranked outlets.
//
// -- Uncertainty (per driver) -------------------------------------------------
// Each ranked placement -> a 0-100 opinion score normalized to that outlet's list
// length: score = 100 * (L - rank) / (L - 1)  (#1 = 100). Across the ranked
// outlets that reviewed the club we report mean, sd, a mean +/- 1 sd band, the
// observed range, n, an evidence tier (high >=5 / medium 3-4 / low 1-2) and an
// agreement tier (tight <=12 / mixed <=25 / wide >25; "single" at n=1).
//
// -- Also available (reviewed, not ranked) ------------------------------------
// Drivers that appear only in segmented guides (never in a ranked source). These
// aren't "worse" — they were recommended for a specific profile or priority, just
// not placed in an overall ranking. We surface them with the outlets/categories
// that named them so a strong niche pick (or a less-marketed club) isn't hidden.
//
// -- Breakdown (forgiveness / distance / senior) ------------------------------
// Three focused buckets tallied from every outlet's category picks, so the reader
// can separate high-MOI forgiveness clubs, pure-distance clubs, and easy-launch
// senior / slow-swing clubs without reading two full matrices.
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
const uniq = (arr) => [...new Set(arr)];

// --- read sources -----------------------------------------------------------
const src = JSON.parse(fs.readFileSync(SRC, "utf-8"));
const seg = JSON.parse(fs.readFileSync(SEG, "utf-8"));

// Every source, for credits + segment column headers.
const allRankers = src.rankers.map(({ id, name, url, title, note, ranked }) => ({
  id, name, url, title, note, ranked: ranked === true, count: 0,
}));
const rankerById = Object.fromEntries(allRankers.map((r) => [r.id, r]));

// Partition: true ordinal rankings vs. segmented / category guides.
const rankedSources = src.rankers.filter((r) => r.ranked === true);
const segmentedSources = src.rankers.filter((r) => r.ranked !== true);

// --- consensus: accumulate placements + opinion scores (RANKED sources only) -
const drivers = new Map();
for (const r of rankedSources) {
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

const rankedModels = new Set(rows.map((r) => r.model));

// --- also available (reviewed by category guides, never ranked) -------------
const featureLabel = Object.fromEntries(seg.features.columns.map((c) => [c.id, c.label]));
const profileLabel = Object.fromEntries(seg.profiles.columns.map((c) => [c.id, c.label]));

const availMap = new Map();
const seenMention = new Set();
function addMention(model, outlet, label) {
  if (!model || rankedModels.has(model)) return; // only unranked clubs
  const key = model + "|" + outlet + "|" + label;
  if (seenMention.has(key)) return;
  seenMention.add(key);
  if (!availMap.has(model)) {
    availMap.set(model, { model, brand: brandOf(model), mentions: [] });
  }
  availMap.get(model).mentions.push({ outlet, label });
}

// Category picks carry the richest "noted for" signal.
for (const [outlet, picks] of Object.entries(seg.features.byOutlet)) {
  for (const [colId, model] of Object.entries(picks)) addMention(model, outlet, featureLabel[colId]);
}
for (const [outlet, picks] of Object.entries(seg.profiles.byOutlet)) {
  for (const [colId, model] of Object.entries(picks)) addMention(model, outlet, profileLabel[colId]);
}
// Catch clubs a segmented outlet listed but that aren't in the category matrices.
for (const r of segmentedSources) {
  for (const model of r.ranking) {
    if (rankedModels.has(model)) continue;
    const already = availMap.get(model)?.mentions.some((m) => m.outlet === r.id);
    if (!already) addMention(model, r.id, "Featured");
  }
}

const alsoAvailable = [...availMap.values()]
  .map((d) => {
    const outlets = uniq(d.mentions.map((m) => m.outlet));
    const labels = uniq(d.mentions.map((m) => m.label).filter((l) => l && l !== "Featured"));
    return {
      model: d.model,
      brand: d.brand,
      outlets,
      outletCount: outlets.length,
      labels,
      mentions: d.mentions,
      evidence: evidenceTier(outlets.length),
    };
  })
  .sort(
    (a, b) => b.outletCount - a.outletCount || b.labels.length - a.labels.length || a.model.localeCompare(b.model)
  );

// --- breakdown: forgiveness / distance / senior-slow ------------------------
function bucket(group, colIds) {
  const grp = seg[group];
  const tally = new Map();
  for (const [outlet, picks] of Object.entries(grp.byOutlet)) {
    for (const colId of colIds) {
      const model = picks[colId];
      if (!model) continue;
      if (!tally.has(model)) tally.set(model, { model, brand: brandOf(model), outlets: new Set() });
      tally.get(model).outlets.add(outlet);
    }
  }
  return [...tally.values()]
    .map((v) => ({
      model: v.model,
      brand: v.brand,
      outlets: [...v.outlets],
      count: v.outlets.size,
      ranked: rankedModels.has(v.model),
    }))
    .sort((a, b) => b.count - a.count || a.model.localeCompare(b.model));
}

const breakdown = {
  forgiveness: {
    label: "High forgiveness",
    desc: "Most stable on off-centre hits - high-MOI, mishit-friendly heads.",
    picks: bucket("features", ["forgiveness"]),
  },
  distance: {
    label: "Pure distance",
    desc: "Longest carry / fastest ball speed for players who create their own speed.",
    picks: bucket("features", ["distance"]),
  },
  senior: {
    label: "Senior / slow swing",
    desc: "Easy launch and help keeping the ball in play at moderate & slower swing speeds.",
    picks: bucket("profiles", ["senior", "speed_slow"]),
  },
};

const rankingsOut = {
  category: src.category,
  season: src.season,
  generated_date: new Date().toISOString().slice(0, 10),
  method:
    "Consensus = normalized Borda count across the TRUE ordinal rankings only (sources flagged `ranked`). Category / 'best for X' guides don't publish a quality order, so they're excluded from the ranking and instead feed the segmented tables, the priority breakdown, and the 'also available' list. Opinion score = each placement normalized to its list length on a 0-100 scale (#1 = 100); the band is mean +/- 1 SD across the ranked outlets that reviewed the club.",
  totals: {
    rankers: rankedSources.length,
    outlets: allRankers.length,
    drivers: rows.length,
    alsoAvailable: alsoAvailable.length,
  },
  rankers: allRankers.filter((r) => r.ranked), // ordinal columns for the table
  allRankers, // every outlet, for credits
  drivers: rows,
  alsoAvailable,
  breakdown,
};
fs.mkdirSync(path.dirname(OUT_RANK), { recursive: true });
fs.writeFileSync(OUT_RANK, JSON.stringify(rankingsOut, null, 2) + "\n", "utf-8");

// --- segments (by feature / by profile) -------------------------------------
function buildMatrix(group) {
  const cols = group.columns;
  const byOutlet = group.byOutlet;
  const rowsOut = cols.map((c) => {
    const cells = allRankers
      .map((r) => {
        const pick = byOutlet[r.id]?.[c.id];
        return pick ? { ranker: r.id, model: pick } : null;
      })
      .filter(Boolean);
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

const segmentsOut = {
  category: src.category,
  season: src.season,
  generated_date: new Date().toISOString().slice(0, 10),
  rankers: allRankers,
  features: buildMatrix(seg.features),
  profiles: buildMatrix(seg.profiles),
};
fs.mkdirSync(path.dirname(OUT_SEG), { recursive: true });
fs.writeFileSync(OUT_SEG, JSON.stringify(segmentsOut, null, 2) + "\n", "utf-8");

// --- console summary --------------------------------------------------------
console.log(
  "Wrote " + path.relative(ROOT, OUT_RANK) + " — " + rows.length + " ranked drivers from " +
  rankedSources.length + " ordinal outlets (" + segmentedSources.length + " segmented guides excluded)."
);
console.log("Consensus top 5:");
rows.slice(0, 5).forEach((r) =>
  console.log("  " + r.consensus + ". " + r.model.padEnd(34) + " borda " + r.score + "  n=" + r.appearances)
);
console.log("Also available (reviewed, not ranked): " + alsoAvailable.length);
alsoAvailable.slice(0, 12).forEach((d) =>
  console.log("  · " + d.model.padEnd(26) + " " + d.outletCount + " outlet(s)  [" + (d.labels.join(", ") || "featured") + "]")
);
console.log(
  "Breakdown — forgiveness " + breakdown.forgiveness.picks.length +
  ", distance " + breakdown.distance.picks.length +
  ", senior/slow " + breakdown.senior.picks.length + "."
);
