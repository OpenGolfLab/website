// ---------------------------------------------------------------------------
// Sample size and statistical power, for comparing two clubs.
//
// Isomorphic on purpose: the page renders the power curve from this at build
// time and the calculator imports the same functions in the browser, so the
// figure and the answer can never disagree.
//
// The whole model is the textbook two-sample comparison of means. Two clubs,
// n shots each, and the question "is this carry difference real or is it my
// dispersion?". Nothing here is novel — the point is that nobody in golf media
// applies it, which is why "up to 14 more yards" survives contact with an
// n=12 fitting bay.
// ---------------------------------------------------------------------------

/** Two-sided α = 0.05. A one-sided test would halve the sample and beg the
 *  question: you don't know in advance which club is longer. */
export const Z_ALPHA = 1.959964;

/** 80% power. Below this you're building a test that misses real differences
 *  most of the time it meets one, which is how ties get sold as wins. */
export const Z_BETA = 0.841621;

const Z_SUM = Z_ALPHA + Z_BETA;

/** n per group = 2 · (z_α/2 + z_β)² · (σ/δ)². The constant is ≈ 15.68. */
export const K = 2 * Z_SUM * Z_SUM;

/**
 * Shots per club needed to detect a true carry difference of `delta` yards,
 * given a shot-to-shot standard deviation of `sd` yards.
 */
export function shotsPerClub(delta: number, sd: number): number {
  if (!(delta > 0) || !(sd > 0)) return NaN;
  return K * (sd / delta) ** 2;
}

/**
 * The inverse, and the more sobering direction: with `n` shots per club, the
 * smallest carry difference the test can reliably resolve.
 */
export function detectableDifference(n: number, sd: number): number {
  if (!(n > 1) || !(sd > 0)) return NaN;
  return Z_SUM * sd * Math.sqrt(2 / n);
}

/**
 * Hartley's d₂ — the expected range of `n` normal samples in units of σ. Lets
 * someone who has never computed a standard deviation enter "I hit 10 shots,
 * longest to shortest was 34 yards" and get a usable σ.
 *
 * Table is the standard control-chart constant, exact enough well past the
 * precision anyone's golf swing supports.
 */
const D2: Record<number, number> = {
  2: 1.128, 3: 1.693, 4: 2.059, 5: 2.326, 6: 2.534, 7: 2.704, 8: 2.847,
  9: 2.970, 10: 3.078, 11: 3.173, 12: 3.258, 13: 3.336, 14: 3.407, 15: 3.472,
  16: 3.532, 17: 3.588, 18: 3.640, 19: 3.689, 20: 3.735, 21: 3.778, 22: 3.819,
  23: 3.858, 24: 3.895, 25: 3.931,
};

/** Smallest and largest sample the range estimator is offered for. */
export const RANGE_N_MIN = 5;
export const RANGE_N_MAX = 25;

/**
 * σ estimated from the range of a small sample. Deliberately capped at 25
 * shots: past that the range is a wasteful estimator (it only ever looks at
 * two shots) and anyone with that many has a real standard deviation to enter.
 */
export function sdFromRange(range: number, n: number): number {
  if (!(range > 0)) return NaN;
  const clamped = Math.min(RANGE_N_MAX, Math.max(RANGE_N_MIN, Math.round(n)));
  return range / D2[clamped];
}

/**
 * One club of carry gap, in yards. The unit golfers actually think in: a
 * detectable difference of "12 yards" lands better as "about a full club".
 * Roughly right for irons through driver at amateur speeds.
 */
export const CLUB_GAP_YD = 11;

/**
 * Displayed shot counts round up to the next 5. This is a model, and quoting
 * "76 shots" implies a precision its assumptions can't carry; "around 80"
 * says what we actually know. Rounding up rather than to nearest keeps the
 * honest direction: never understate the work.
 */
export function approxShots(n: number): number {
  if (!isFinite(n) || n <= 0) return NaN;
  return Math.ceil(n / 5) * 5;
}

// ---- The driver worked example -------------------------------------------
// The calculator is deliberately illustrative and driver-only: the two claims
// every driver launch makes, and a spread assumed from handicap, because
// nobody knows their standard deviation but everyone knows their handicap.

/** The distance claim under test: "up to N more yards of carry". */
export const DRIVER_CLAIM_YD = 5;

/** The dispersion claim under test: "N% tighter dispersion". */
export const TIGHTER_CLAIM_PCT = 20;

/**
 * Handicap band → assumed driver carry spread. Authored estimates for indoor
 * driver carry, not measurements from anyone's data; the page says so. The
 * mid band anchors the story band's worked example.
 */
export const HCP_BANDS = [
  {
    key: "low",
    label: "Under 8",
    blurb: "you shoot in the 70s",
    sd: 10,
    hue: "var(--green)",
  },
  {
    key: "mid",
    label: "8 to 15",
    blurb: "low to mid 80s",
    sd: 14,
    hue: "var(--amber)",
  },
  {
    key: "high",
    label: "Over 15",
    blurb: "90 and up",
    sd: 18,
    hue: "var(--violet)",
  },
] as const;

/**
 * Sample size for a dispersion claim. Comparing spreads is a different test
 * from comparing means: the sampling error of a standard deviation is about
 * σ/√(2n), so on the log scale Var(ln s) ≈ 1/(2n) per sample and the
 * two-sample difference has SE ≈ 1/√n. Detecting a claimed tightening of
 * fraction p ("20% tighter" → p = 0.2) needs n = (z_sum / ln(1/(1-p)))² per
 * club. Note that σ cancels: a relative-spread claim costs the same at every
 * skill level, and far more than a distance claim of similar marketing size.
 */
export function shotsForTightening(p: number): number {
  if (!(p > 0) || !(p < 1)) return NaN;
  return (Z_SUM / Math.log(1 / (1 - p))) ** 2;
}

/** Inverse: the smallest tightening (fraction) `n` shots per club can confirm. */
export function detectableTightening(n: number): number {
  if (!(n > 1)) return NaN;
  return 1 - Math.exp(-Z_SUM / Math.sqrt(n));
}
