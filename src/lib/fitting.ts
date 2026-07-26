// ---------------------------------------------------------------------------
// "Your starting point" — narrowing the Gear Guide's plots to the region worth
// looking at first, from two numbers a golfer already knows.
//
// WHAT THIS IS, AND ISN'T
// -----------------------
// This is a reading aid, not a fitting. It shades the part of each plot where
// a player of roughly this ability and speed usually ends up, so a page with
// 37 drivers and 63 iron sets has somewhere to start. A launch monitor and a
// fitter beat it every time and the page says so.
//
// Everything below is a lookup table rather than a formula. A formula would
// imply a precision that isn't there — the honest statement is "players around
// here tend to land in this band", and a table says that without dressing it
// up. Three buckets per axis for the same reason: a golfer who reports a
// 14 handicap and one who reports a 16 should not get different advice.
//
// THE REASONING PER CATEGORY
// --------------------------
// Driver — two independent forces push the same way. Forgiveness matters in
// proportion to how often you miss the centre, which is what a handicap
// largely measures; and a low-spin head only helps a player who has enough
// speed to be spinning too much in the first place. A slower player needs the
// spin to carry the ball at all. So the distance end is reserved for golfers
// who are both accurate and fast, and everyone else starts left. The Lab's
// dispersion trade-off shows the cost side of exactly this.
//
// Irons — ability drives the forgiveness axis. Speed drives the loft axis, and
// in the opposite direction to what the marketing implies: a 27° 7-iron needs
// speed to get airborne, so a slower player is better served by traditional
// lofts even though the strong-lofted set will out-carry it on paper.
//
// Balls — compression tracks speed (a slow swing can't compress a firm ball,
// a fast one over-compresses a soft one). Spin tracks ability: greenside
// control is worth paying for once you can use it, and until then a
// lower-spinning ball flies straighter.
// ---------------------------------------------------------------------------

export type SkillKey = "high" | "mid" | "low";
export type SpeedKey = "slow" | "mid" | "fast";
export type FocusKey = `${SkillKey}-${SpeedKey}`;

/** Handicap bands. `high` = high handicap (least skilled). */
export const SKILL_BANDS: { key: SkillKey; max: number; label: string }[] = [
  { key: "low", max: 8, label: "0–8 handicap" },
  { key: "mid", max: 17, label: "9–17 handicap" },
  { key: "high", max: Infinity, label: "18+ handicap" },
];

/** Driver clubhead speed bands, mph. */
export const SPEED_BANDS: { key: SpeedKey; max: number; label: string }[] = [
  { key: "slow", max: 89, label: "under 90 mph" },
  { key: "mid", max: 104, label: "90–104 mph" },
  { key: "fast", max: Infinity, label: "105+ mph" },
];

/**
 * Average 18-hole score → approximate handicap.
 *
 * Score minus par, which runs a little high against a real index (an index is
 * built from your better rounds, not your average ones). Fine here: it only has
 * to land in the right one of three buckets.
 */
export const scoreToHandicap = (score: number) => Math.max(0, score - 72);

/**
 * Average driving distance (total, yards) → approximate clubhead speed.
 *
 * ~2.3 yards per mph is the usual amateur rule of thumb for total distance on
 * a normal-ish strike. Tour ratios are higher; this is deliberately the
 * amateur one, since that's who's typing a number in.
 */
export const distanceToSpeed = (yards: number) => yards / 2.3;

export const skillFor = (handicap: number): SkillKey =>
  SKILL_BANDS.find((b) => handicap <= b.max)!.key;
export const speedFor = (mph: number): SpeedKey =>
  SPEED_BANDS.find((b) => mph <= b.max)!.key;

/** Every bucket combination, in a stable order. */
export const FOCUS_KEYS: FocusKey[] = SKILL_BANDS.flatMap((s) =>
  SPEED_BANDS.map((v) => `${s.key}-${v.key}` as FocusKey),
);

type Range = [number, number];

/**
 * Driver spectrum position (0 = max forgiveness, 100 = pure distance).
 * Both axes of the lookup push toward forgiveness independently, so only the
 * accurate-and-fast corner reaches the distance end.
 */
const DRIVER: Record<FocusKey, Range> = {
  "high-slow": [0, 30], "high-mid": [0, 35], "high-fast": [5, 42],
  "mid-slow": [5, 40], "mid-mid": [20, 55], "mid-fast": [32, 68],
  "low-slow": [12, 48], "low-mid": [35, 72], "low-fast": [55, 96],
};

/** Iron forgiveness position (0 = max help, 100 = max precision), by ability. */
const IRON_X: Record<SkillKey, Range> = {
  high: [0, 34],
  mid: [18, 62],
  low: [44, 100],
};

/**
 * Iron 7-iron loft in degrees. Weaker (numerically higher) sits lower on the
 * plot.
 *
 * This depends on BOTH inputs, and an earlier version had it on speed alone,
 * which was wrong in a way worth recording: it pushed every fast player toward
 * the strongest lofts, so a 130 mph scratch player was steered at juiced
 * lofts and the map's whole "feel, flight control, workability" quadrant
 * became unreachable.
 *
 * A strong loft is a distance aid, and it costs you height, stopping power and
 * gapping to get it. So you want one only if you need the distance AND have
 * the speed to launch it. A low-handicap player doesn't need it at any speed —
 * they want honest lofts they can gap and flight. A slow player can't launch it
 * whatever their handicap.
 */
const IRON_LOFT: Record<FocusKey, Range> = {
  // Skilled players sit low on this axis regardless of speed: nothing about
  // ball-striking is improved by a delofted 7-iron.
  "low-slow": [31.0, 35.5], "low-mid": [30.0, 35.0], "low-fast": [29.0, 34.0],
  "mid-slow": [30.5, 35.0], "mid-mid": [28.5, 33.5], "mid-fast": [27.5, 32.5],
  // Distance help is worth having here, once there's speed to get it airborne.
  "high-slow": [30.0, 34.5], "high-mid": [27.5, 32.5], "high-fast": [26.5, 31.5],
};

/**
 * Ball spin position (0 = low spin / straight, 100 = max spin / tour).
 *
 * Also two-variable, and this one had the same bug from the other direction:
 * driving it off handicap alone assumed better player = more spin, which
 * excluded the low-spin tour balls that exist specifically for high-speed
 * players — Titleist's Pro V1x Left Dash sits at position 46 with the firmest
 * compression in the lineup, and a 130 mph swing is exactly who it's built for.
 *
 * Speed generates spin on its own, so the faster the player the more of the
 * low-spin side stays in play. That's why the ball map has two separate top
 * quadrants, "fast swing, tour spin" and "fast swing, low spin" — a fast
 * player legitimately shops both, and the shaded band has to span them.
 */
const BALL_X: Record<FocusKey, Range> = {
  "low-slow": [50, 100], "low-mid": [50, 100], "low-fast": [38, 100],
  "mid-slow": [24, 68], "mid-mid": [26, 74], "mid-fast": [30, 88],
  "high-slow": [0, 42], "high-mid": [0, 46], "high-fast": [4, 56],
};

/**
 * Ball compression, by speed. Open-ended at both extremes — the bands are
 * clamped to whatever the plotted lineup actually spans.
 */
const BALL_COMP: Record<SpeedKey, Range> = {
  slow: [-Infinity, 72],
  mid: [62, 92],
  fast: [82, Infinity],
};

export const driverRange = (key: FocusKey): Range => DRIVER[key];
export const ironRanges = (key: FocusKey) => {
  const [skill] = key.split("-") as [SkillKey, SpeedKey];
  return { x: IRON_X[skill], loft: IRON_LOFT[key] };
};
export const ballRanges = (key: FocusKey) => {
  const [, speed] = key.split("-") as [SkillKey, SpeedKey];
  return { x: BALL_X[key], compression: BALL_COMP[speed] };
};

/** One-line summary of what the shaded region is saying, per category. */
export function focusBlurb(key: FocusKey): Record<string, string> {
  const [skill, speed] = key.split("-") as [SkillKey, SpeedKey];
  const fastEnough = speed === "fast";
  const accurate = skill === "low";
  return {
    drivers: accurate && fastEnough
      ? "You have the speed and the strike to use a low-spin head — the distance end is genuinely open to you."
      : !fastEnough && !accurate
        ? "Forgiveness first. You don't yet have the speed to need spin taken off, and off-centre strikes cost you more than the extra yard or two."
        : fastEnough
          ? "You have the speed for a low-spin head, but the mishit penalty scales with how often you miss the middle — stay nearer the middle of the spectrum until the strike catches up."
          : "Your strike can handle a stronger head, but without the speed a low-spin model just costs you carry. Balanced is your range.",
    irons: skill === "low"
      ? "Precision heads are usable for you, and honest lofts with them — a delofted 7-iron buys distance you don't need and costs you the height and gapping you do."
      : skill === "mid"
        ? "The middle of the market. Enough help to survive a thin one, enough control to shape a shot."
        : speed === "slow"
          ? "Take the help — but not the strongest lofts. Without the speed to launch them, a delofted set flies lower and stops shorter, whatever the box claims."
          : "Take the help. Wide soles and deep cavities cost you nothing you're currently using, and you have the speed to launch a stronger loft.",
    balls: `${
      speed === "fast" ? "Firm enough to hold up against your speed" :
      speed === "mid" ? "Mid-compression" : "Low compression, so you can actually compress it"
    }, ${
      skill === "low" && fastEnough
        ? "and your band spans both tour options — full-spin and low-spin. At your speed you generate plenty of spin yourself, so the low-spin tour balls are as much for you as the high-spin ones."
      : skill === "low" ? "and urethane, because you can use the greenside spin."
      : skill === "mid" ? "and a mid-spin cover — spin you can use without it costing you the fairway."
      : "and lower spin, which flies straighter for you."
    }`,
  };
}
