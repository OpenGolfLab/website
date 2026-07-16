// ---------------------------------------------------------------------------
// Build-time data loading for The Lab.
//
// Both datasets are optional files under public/data/. Every page that reads
// them must degrade to an honest "not published yet" state rather than render
// zeros, so the loaders always return a `has*` flag alongside the data.
// ---------------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";

function readJson(relPath: string): any {
  try {
    const p = path.resolve(relPath);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    /* fall through — treat unreadable/malformed as absent */
  }
  return null;
}

// ---- Market: editorial lineups + pricing (drivers, balls, …) ---------------

/** Position-% below which two spectrum labels are considered close enough to collide. */
const STAGGER_GAP = 16;

/**
 * Generic loader for a lineup file (drivers, balls, …). Both files share the
 * same shape: { lineups: [{ brand, models: [{ name, position, msrp, price,
 * dealer, dealerUrl, url, ...extras }] }] }. `axisStep` sets the pricing-chart
 * gridline interval ($200 suits driver prices, $10 suits per-dozen ball prices).
 */
function loadLineupMarket(relPath: string, axisStep: number) {
  const data = readJson(relPath);
  const lineups: any[] =
    data && Array.isArray(data.lineups) ? data.lineups : [];
  const hasLineups = lineups.length > 0;

  // All models flattened, for build-time stats and the pricing chart.
  const allModels = lineups.flatMap((l: any) =>
    (l.models ?? []).map((m: any) => ({ ...m, brand: l.brand })),
  );
  const modelCount = allModels.length;
  const brandCount = lineups.length;

  const sortedPrices = [...allModels.map((m: any) => m.price)].sort(
    (a, b) => a - b,
  );
  const medianPrice = sortedPrices.length
    ? sortedPrices.length % 2 === 1
      ? sortedPrices[(sortedPrices.length - 1) / 2]
      : Math.round(
          (sortedPrices[sortedPrices.length / 2 - 1] +
            sortedPrices[sortedPrices.length / 2]) /
            2,
        )
    : 0;

  const discounted = allModels
    .map((m: any) => ({
      ...m,
      savings: m.msrp - m.price,
      pct: m.msrp > 0 ? ((m.msrp - m.price) / m.msrp) * 100 : 0,
    }))
    .filter((m: any) => m.savings > 0)
    .sort((a: any, b: any) => b.pct - a.pct);
  const biggestDiscount = discounted[0];

  // Pricing chart axis: $0-based, gridlines every `axisStep`, rounded up past the max MSRP.
  const maxRawPrice = allModels.reduce(
    (max: number, m: any) => Math.max(max, m.msrp, m.price),
    0,
  );
  const axisMaxRounded = Math.max(
    axisStep,
    Math.ceil((maxRawPrice + 1) / axisStep) * axisStep,
  );
  const axisTicks: number[] = [];
  for (let v = 0; v <= axisMaxRounded; v += axisStep) axisTicks.push(v);

  const pricingLineups = lineups.map((l: any) => ({
    brand: l.brand,
    models: [...(l.models ?? [])].sort((a: any, b: any) => a.price - b.price),
  }));

  // Spectrum: sort each brand's models by position, then stagger label height
  // only where neighboring models sit close enough on the track to collide —
  // so labels stay level unless they actually need separating, instead of
  // climbing in lockstep (which made rightmost/"distance" models always sit
  // highest regardless of how much room they actually had).
  const spectrumLineups = lineups.map((l: any) => {
    const models = [...(l.models ?? [])].sort(
      (a: any, b: any) => a.position - b.position,
    );
    let prevPosition: number | null = null;
    let stagger = 0;
    const staggered = models.map((m: any) => {
      stagger =
        prevPosition !== null && m.position - prevPosition < STAGGER_GAP
          ? (stagger + 1) % 3
          : 0;
      prevPosition = m.position;
      return { ...m, stagger };
    });
    return { brand: l.brand, models: staggered };
  });

  return {
    hasLineups,
    lineups,
    allModels,
    modelCount,
    brandCount,
    medianPrice,
    biggestDiscount,
    axisMaxRounded,
    axisTicks,
    pricingLineups,
    spectrumLineups,
  };
}

/** 2026 driver lineups + street pricing. */
export function loadMarket() {
  return loadLineupMarket("public/data/driver-lineups.json", 200);
}

/** 2026 golf-ball lineups + per-dozen street pricing. */
export function loadBallMarket() {
  return loadLineupMarket("public/data/ball-lineups.json", 10);
}

/** 2026 iron lineups + per-set (7-club, steel) street pricing. */
export function loadIronMarket() {
  return loadLineupMarket("public/data/iron-lineups.json", 500);
}

// ---- Community: summary.json v2 (tiered) ----------------------------------
// Written by the opengolflab-data aggregator. Optional: absent, or present with
// empty tiers, until enough contributors clear the publish threshold.

export const TIER_META = [
  {
    key: "all",
    src: "community",
    label: "All",
    blurb: "Every contributor that clears quality control.",
  },
  {
    key: "verified",
    src: "verified",
    label: "Verified",
    blurb: "Spin-measuring monitors, proven contributors.",
  },
  {
    key: "reference",
    src: "reference",
    label: "Reference",
    blurb: "A curated core of vetted contributors.",
  },
] as const;

/** A driver dispersion cell → SVG ellipse geometry (the "typical player" spread). */
const DISP = { sx: 2.4, sy: 2.4, k: 1.5, cx0: 110, cy: 88 }; // px/yd, ~1σ look

function driverEllipse(clubs: any[]) {
  const dr = clubs.find((c: any) => String(c.club || "").toUpperCase() === "DR");
  const d = dr?.dispersion;
  if (!d || d.lateral_mad == null || d.depth_mad == null) return null;
  return {
    cx: DISP.cx0 + (d.offline_bias ?? 0) * DISP.sx,
    cy: DISP.cy,
    rx: Math.max(5, d.lateral_mad * DISP.k * DISP.sx),
    ry: Math.max(5, d.depth_mad * DISP.k * DISP.sy),
    lateral: d.lateral_mad,
    depth: d.depth_mad,
    bias: d.offline_bias ?? 0,
  };
}

export function loadCommunity() {
  const summaryData = readJson("public/data/summary.json");

  const tierViews = TIER_META.map((t) => {
    const blk = summaryData?.tiers?.[t.src] ?? {};
    const clubs = Array.isArray(blk?.clubs) ? blk.clubs : [];
    return {
      ...t,
      contributors: blk?.totals?.contributors ?? 0,
      shots: blk?.totals?.shots ?? 0,
      clubs,
      ellipse: driverEllipse(clubs),
    };
  });

  const hasCommunityData = tierViews.some((t) => t.clubs.length > 0);
  // Default the toggle to the highest-trust tier that actually has data.
  const defaultTierKey =
    [...tierViews].reverse().find((t) => t.clubs.length > 0)?.key ?? "all";

  return {
    summaryData,
    tierViews,
    hasCommunityData,
    defaultTierKey,
    generatedDate: summaryData?.generated_date ?? null,
    minContributors: summaryData?.meta?.min_contributors ?? 8,
    totalContributors: tierViews.find((t) => t.key === "all")?.contributors ?? 0,
    totalShots: tierViews.find((t) => t.key === "all")?.shots ?? 0,
  };
}
