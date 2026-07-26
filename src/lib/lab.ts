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
    /* fall through, treat unreadable/malformed as absent */
  }
  return null;
}

// ---- Market: researched lineups + pricing (drivers, balls, …) --------------

/** Position-% below which two spectrum labels are considered close enough to collide. */
const STAGGER_GAP = 16;

/**
 * Generic loader for a lineup file (drivers, balls, …). Both files share the
 * same shape: { lineups: [{ brand, models: [{ name, position, msrp, price,
 * dealer, dealerUrl, url, ...extras }] }] }. `tickStep` sets the pricing-chart
 * gridline interval and `roundStep` how tightly the axis end hugs the priciest
 * model; together they're chosen per category so the chart shows 3–4 ticks
 * with no dead space on the right.
 */
function loadLineupMarket(relPath: string, tickStep: number, roundStep: number) {
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

  // Pricing chart axis: $0-based track whose end hugs the priciest model
  // (rounded up to `roundStep`), with a tick every `tickStep`. No $0 tick,
  // the track start implies it.
  const maxRawPrice = allModels.reduce(
    (max: number, m: any) => Math.max(max, m.msrp, m.price),
    0,
  );
  const axisMaxRounded = Math.max(
    tickStep,
    Math.ceil((maxRawPrice + 1) / roundStep) * roundStep,
  );
  const axisTicks: number[] = [];
  for (let v = tickStep; v <= axisMaxRounded; v += tickStep) axisTicks.push(v);

  // Pricing chart rows: one flat list ranked by street price, most expensive
  // first. Deliberately NOT grouped by brand — grouping answers "what does
  // TaylorMade charge", which the spectrum and quadrant charts on the same page
  // already cover, whereas the question this chart exists for is "what does
  // this category cost, and what's cheap", and that only reads cleanly off a
  // single ranked axis. Ties break alphabetically so the order is stable
  // between builds rather than depending on file order.
  const pricingRanked = allModels
    .map((m: any) => ({
      ...m,
      label: `${m.brand} ${m.name}`.trim(),
      savings: m.msrp - m.price,
    }))
    .sort(
      (a: any, b: any) =>
        b.price - a.price || a.label.localeCompare(b.label),
    );

  // Spectrum: sort each brand's models by position, then stagger label height
  // only where neighboring models sit close enough on the track to collide,
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
    pricingRanked,
    spectrumLineups,
  };
}

/** 2026 driver lineups + street pricing. */
export function loadMarket() {
  return loadLineupMarket("public/data/driver-lineups.json", 400, 100);
}

/** 2026 golf-ball lineups + per-dozen street pricing. */
export function loadBallMarket() {
  return loadLineupMarket("public/data/ball-lineups.json", 20, 5);
}

/** 2026 iron lineups + per-set (7-club, steel) street pricing. */
export function loadIronMarket() {
  return loadLineupMarket("public/data/iron-lineups.json", 500, 100);
}

/** 2026 wedge lineups + per-wedge street pricing. */
export function loadWedgeMarket() {
  return loadLineupMarket("public/data/wedge-lineups.json", 60, 10);
}

// ---- Seeded demo contributors ---------------------------------------------
//
// Eleven of the sixteen "contributors" in the published pool are not people.
// They were generated on 2026-07-17 from one golfer's own GSPro exports to give
// this page enough data to show the concept, one fake contributor per source
// file (see SEED_SUBMISSIONS.md in the private data repo).
//
// The shots are real swings. Everything that makes them look like a community
// is not: display names, launch monitors, gear and ball models were assigned
// AT RANDOM, and handicap/age bands were reverse-engineered from each file's
// driver numbers to look plausible. That last part is what makes leaving them
// unmarked indefensible — the driver leaderboard was attributing 286-yard
// carries to a "PING G440 LST" that the golfer in question never swung,
// because the golfer in question doesn't exist.
//
// So they get the same treatment as every other generated row on this page:
// marked wherever they appear, and gone when sample data is switched off.
//
// This list is a stopgap. The real fix is deleting those submission folders in
// the data repo and re-running the aggregator, which republishes everything
// here without them — the procedure is in SEED_SUBMISSIONS.md. Until that
// happens the site labels them defensively rather than trusting the feed.
export const SEED_CONTRIBUTORS = new Set([
  "BombSquad", "DialedIn", "FadeRunner", "GarageGolfer", "HighBaller",
  "LaunchCodes", "MidwestMasher", "NightRange", "SmoothTakeaway",
  "SpinDoctor", "TurfDreams",
]);

export const isSeed = (displayName: unknown): boolean =>
  typeof displayName === "string" && SEED_CONTRIBUTORS.has(displayName.trim());

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

  const feed = loadFeed();

  const publishedContributors = tierViews.find((t) => t.key === "all")?.contributors ?? 0;
  const publishedShots = tierViews.find((t) => t.key === "all")?.shots ?? 0;

  // How much of the published pool is seeded. Counted off the feed, which is
  // the only per-contributor breakdown the aggregator publishes — the tier
  // totals and per-club norms in summary.json are aggregates and cannot be
  // decomposed here, which is exactly why they get a warning instead of a
  // correction (see the seedNotice on the community page).
  const seedContributorNames = new Set(
    feed.items.filter((i: any) => i.isSeed).map((i: any) => i.displayName),
  );
  const seedShots = feed.items
    .filter((i: any) => i.isSeed)
    .reduce((sum: number, i: any) => sum + i.shots, 0);

  const realContributors = Math.max(0, publishedContributors - seedContributorNames.size);
  const realShots = Math.max(0, publishedShots - seedShots);

  return {
    summaryData,
    tierViews,
    hasCommunityData,
    defaultTierKey,
    generatedDate: summaryData?.generated_date ?? null,
    minContributors: summaryData?.meta?.min_contributors ?? 8,
    // Published totals include the seeded demo contributors. `real*` is what's
    // left once they're taken out, and is what the page headline quotes — a
    // count of golfers is the one number nobody should have to caveat.
    publishedContributors,
    publishedShots,
    seedContributors: seedContributorNames.size,
    seedShots,
    totalContributors: realContributors,
    totalShots: realShots,
    hasSeedData: seedContributorNames.size > 0,
    feed,
  };
}

// ---- Community feed: feed.json (recent contributions) ----------------------
// Written alongside summary.json by the aggregator. "Live" means fresh as of the
// last build/deploy, the page states when. Every field here is already safe to
// show (the aggregator emits only display name / date / counts / clubs /
// monitor), so the page can render it directly.

/** A YYYY-MM-DD → "Jul 15, 2026" for display; passes anything else through. */
function prettyDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return iso || "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

export function loadFeed() {
  const data = readJson("public/data/feed.json");
  const rawItems: any[] = Array.isArray(data?.contributions)
    ? data.contributions
    : [];

  const items = rawItems.map((it: any) => {
    const clubs: string[] = Array.isArray(it.clubs) ? it.clubs : [];
    return {
      displayName: String(it.display_name ?? ""),
      // Generated demo contributor, not a person — see SEED_CONTRIBUTORS.
      isSeed: isSeed(it.display_name),
      date: String(it.date ?? ""),
      dateLabel: prettyDate(String(it.date ?? "")),
      shots: Number(it.shots ?? 0),
      clubs,
      clubCount: clubs.length,
      // "" from the aggregator (unattributed monitor) reads better as a phrase
      // than an empty cell.
      launchMonitor: String(it.launch_monitor ?? "").trim() || "Not specified",
    };
  });

  return {
    hasFeed: items.length > 0,
    items,
    generatedDate: data?.generated_date ?? null,
  };
}
