// ---------------------------------------------------------------------------
// Sample-data generator for the Community page's gear comparison.
//
// Writes public/data/sample_points.json: a synthetic contributor pool big
// enough to exercise the gear comparison — hundreds of shots per product, for
// every club, across a driver lineup, a ball lineup and a set of launch
// monitors.
//
// WHY THIS EXISTS, AND WHY THE PRODUCTS ARE ANONYMOUS
// ---------------------------------------------------
// The comparison feature is worthless to look at with an empty pool, and the
// real pool is small. So the shape of the feature is demonstrated with
// generated data until real contributions fill it in.
//
// Every product here carries a PLACEHOLDER name ("Max-Forgiveness Driver C"),
// never a real one. That is the whole safety argument and it is not
// negotiable: attaching invented carry distances and mishit numbers to real,
// named commercial products would publish a fabricated performance verdict
// about someone else's merchandise. Golfers buy drivers on exactly this kind
// of number. A "sample data" label does not fix that, because the entire point
// of the feature is to read a comparison off it.
//
// Anonymous names remove the risk completely — and because they do, the
// generated products can be given genuinely distinct, internally-consistent
// profiles. That is what makes the demo worth looking at: the physics below is
// real (low-spin heads punish mishits harder, forgiving heads give up ball
// speed, urethane balls spin more and cost carry on the driver), so a visitor
// sees a true relationship, just not a claim about any product they can buy.
//
// Each product's placeholder is anchored to a REAL spectrum position from the
// hand-curated lineup files, so the pool has the same shape and spread as the
// actual market, with one placeholder per real model.
//
// Every emitted row carries `sample: true`. Nothing here may ever be fed back
// into the aggregation pipeline in the private data repo.
//
//   node scripts/generate-sample-data.mjs
// ---------------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";

const OUT = "public/data/sample_points.json";

// Fixed seed: the file is committed, so regenerating it must not produce a
// gratuitous diff. Change it only to deliberately reshuffle the pool.
const SEED = 20260726;

// ---- deterministic RNG (mulberry32) ---------------------------------------
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Box–Muller normal. Golf metrics are roughly normal within a club. */
function normal(rand, mean, sd) {
  const u = Math.max(rand(), 1e-9);
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}
const round1 = (v) => Math.round(v * 10) / 10;
const pick = (rand, arr) => arr[Math.floor(rand() * arr.length) % arr.length];

function readLineups(file) {
  const p = path.resolve("public/data", file);
  const data = JSON.parse(fs.readFileSync(p, "utf-8"));
  return (data.lineups ?? []).flatMap((l) =>
    (l.models ?? []).map((m) => ({ position: m.position })),
  );
}

// ---- club reference ranges -------------------------------------------------
// Mid-handicap male amateur baselines: [carry yds, ball speed mph, launch°,
// spin rpm, offline sd yds]. These set the centre of the pool; per-golfer
// skill and per-product effects move each shot off it.
const CLUBS = {
  Dr:   { carry: 233, ball: 149, launch: 13.5, spin: 2750, offSd: 24 },
  "3W": { carry: 209, ball: 138, launch: 12.0, spin: 3600, offSd: 20 },
  "5W": { carry: 196, ball: 132, launch: 13.0, spin: 4200, offSd: 19 },
  "3I": { carry: 189, ball: 128, launch: 14.0, spin: 4400, offSd: 20 },
  "4I": { carry: 178, ball: 122, launch: 15.0, spin: 4700, offSd: 18 },
  "5I": { carry: 168, ball: 117, launch: 16.0, spin: 5200, offSd: 17 },
  "6I": { carry: 158, ball: 112, launch: 17.5, spin: 5800, offSd: 15 },
  "7I": { carry: 147, ball: 106, launch: 19.0, spin: 6500, offSd: 14 },
  "8I": { carry: 135, ball: 100, launch: 21.0, spin: 7300, offSd: 12 },
  "9I": { carry: 123, ball: 94,  launch: 23.5, spin: 8200, offSd: 11 },
  Pw:   { carry: 111, ball: 87,  launch: 25.5, spin: 9000, offSd: 9 },
  Gw:   { carry: 98,  ball: 80,  launch: 27.0, spin: 9500, offSd: 8 },
  Sw:   { carry: 84,  ball: 72,  launch: 29.0, spin: 9900, offSd: 7 },
  Lw:   { carry: 68,  ball: 63,  launch: 31.5, spin: 10200, offSd: 6 },
};
const CLUB_KEYS = Object.keys(CLUBS);

const HANDICAPS = ["scratch", "1-4", "5-9", "10-14", "15-19", "20-24", "25+"];
const AGES = ["under 30", "30-39", "40-49", "50-59", "60-69", "70+"];

// Handicap groups for the dispersion trade-off plot. Three buckets rather than
// seven bands: the question is whether the gear penalty scales with ability,
// and that needs cells populated enough to read a spread off.
const HANDICAP_GROUPS = [
  { key: "low", label: "0–9 handicap", skill: 0.95 },
  { key: "mid", label: "10–19 handicap", skill: 0.0 },
  { key: "high", label: "20+ handicap", skill: -0.95 },
];

/**
 * Spread of a player's strike error, in units of "off-centre". Ability shows
 * up here before it shows up anywhere else — and because the gear penalties
 * multiply this number, it's also what decides how much a given head costs
 * that player.
 */
const strikeSd = (skill) => Math.max(0.4, 1.0 - skill * 0.22);

/**
 * One shot's offline result, in yards.
 *
 * Two independent sources, and only the second cares which head is being
 * swung: a baseline aim/path scatter that ability improves, and a face-twist
 * component proportional to how far off-centre the strike was, scaled by the
 * head's resistance to twisting (`offAmp`).
 */
function offlineFor(rand, base, skill, strikeErr, offAmp) {
  const aim = normal(rand, 0, base.offSd * 0.55 * (1 - skill * 0.10));
  const face = normal(rand, 0, 1) * strikeErr * offAmp;
  return skill * -1.5 + aim + face;
}

// ---- product profiles ------------------------------------------------------
// `position` is the lineup files' own 0–100 spectrum. For drivers 0 is max
// forgiveness and 100 is pure distance, and the trade-off between those two is
// what the whole comparison exists to show:
//
//   - a low-spin/distance head gains ball speed on centre strikes and spins
//     less, but its MOI is lower, so an off-centre strike costs more;
//   - a max-forgiveness head gives up a little of that peak, and holds far
//     more of it when the strike is bad.
//
// That relationship is real and well-documented. The specific numbers assigned
// to each placeholder are generated.
function driverProfile(position, rand) {
  const t = position / 100; // 0 forgiving → 1 distance
  return {
    // Centre-strike ball-speed edge for the low-spin heads, ±a little so the
    // spectrum isn't a straight line.
    ballGain: (t - 0.5) * 2.4 + normal(rand, 0, 0.5),
    // Spin drops across the spectrum; that's the defining difference.
    spinDelta: -420 * (t - 0.5) * 2 + normal(rand, 0, 90),
    launchDelta: -0.9 * (t - 0.5) * 2 + normal(rand, 0, 0.3),
    // Extra carry lost per unit of strike error — the forgiveness number.
    mishitPenalty: 0.85 + t * 0.75 + normal(rand, 0, 0.06),
    // Yards of sideways miss per unit of strike error. THIS is the term that
    // creates the handicap interaction, and it used to be missing: offline was
    // drawn independently of the strike, so a head's forgiveness changed how
    // far a mishit went but not where it went, which is not how a golf club
    // works. Off-centre contact twists the face; a high-MOI head resists that
    // twist and a low-spin/low-MOI one doesn't.
    //
    // Because the penalty is multiplied BY strike error rather than added to
    // it, the same head costs a player who misses the centre a lot far more
    // than one who doesn't — which is the question this models, not an
    // assumption bolted on afterwards.
    offAmp: 6.0 + t * 9.0 + normal(rand, 0, 0.5),
  };
}

// Balls: 0 is low-spin/soft distance, 100 is tour urethane. Urethane spins
// more everywhere, which costs a little driver carry and buys wedge spin.
function ballProfile(position, rand) {
  const t = position / 100;
  return {
    driverSpin: 260 * (t - 0.5) * 2 + normal(rand, 0, 60),
    wedgeSpin: 900 * (t - 0.5) * 2 + normal(rand, 0, 120),
    driverCarry: -2.6 * (t - 0.5) * 2 + normal(rand, 0, 0.8),
    ballSpeed: normal(rand, 0, 0.4),
  };
}

// Launch monitors, anonymised by measurement class. The differences modeled
// here are MEASUREMENT differences, not golf ones: camera/photometric units
// read spin directly, radar units model it, and modeled spin is noisier. Same
// reasoning as the products — these are real, published characteristics of the
// technology classes, attached to no identifiable unit.
// `carryBias` is what the class reports relative to a camera unit. Radar units
// model ball flight from launch conditions rather than tracking the whole
// flight indoors, and read a little long for it. Modest, but it rides on every
// number the unit produces, which is why the ranking can standardize it out.
const MONITOR_KINDS = [
  { kind: "camera", label: "Camera LM", count: 3, measuresSpin: true, spinNoise: 130, carryBias: 0 },
  { kind: "photometric", label: "Photometric LM", count: 3, measuresSpin: true, spinNoise: 190, carryBias: -0.9 },
  { kind: "radar", label: "Radar LM", count: 4, measuresSpin: false, spinNoise: 420, carryBias: 2.6 },
];

/**
 * Which monitor a golfer of this ability owns.
 *
 * Third confound, and the one that makes "standardize by launch monitor" more
 * than a decoration: monitor class tracks budget, budget tracks commitment, and
 * commitment tracks ability. So the players on radar units are weaker AND their
 * gear reads long — two errors pushing opposite ways on the same row.
 */
function pickMonitor(monitors, skill, rand) {
  const pool =
    skill > 0.6 ? monitors.filter((m) => m.kind === "camera")
    : skill > -0.2 ? monitors.filter((m) => m.kind !== "radar")
    : skill > -0.9 ? monitors
    : monitors.filter((m) => m.kind === "radar");
  return pool[Math.floor(rand() * pool.length)] ?? monitors[0];
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// The driver pool is three bands of five. Five per band is enough to see a
// spread within a type without the ranking turning into a wall of near-
// identical rows, and three bands is the comparison people actually make.
const DRIVER_BANDS = [
  { key: "forgiving", label: "Max-Forgiveness", lo: 0, hi: 32 },
  { key: "balanced", label: "Balanced", lo: 33, hi: 66 },
  { key: "lowspin", label: "Low-Spin", lo: 67, hi: 100 },
];
const PER_BAND = 5;

/**
 * Five representative positions inside one band, taken from the real driver
 * lineup file rather than invented, so the pool still sits on the actual
 * market spectrum. Falls back to evenly spacing the band if the real file
 * doesn't have five models in it.
 */
function bandPositions(realPositions, band) {
  const inBand = realPositions
    .filter((p) => p >= band.lo && p <= band.hi)
    .sort((a, b) => a - b);
  if (inBand.length >= PER_BAND) {
    // Evenly spaced picks across what the market actually offers in this band.
    return Array.from({ length: PER_BAND }, (_, i) =>
      inBand[Math.round((i * (inBand.length - 1)) / (PER_BAND - 1))]);
  }
  return Array.from({ length: PER_BAND }, (_, i) =>
    Math.round(band.lo + ((band.hi - band.lo) * i) / (PER_BAND - 1)));
}
function ballName(position, i) {
  const band =
    position < 20 ? "Soft Distance" :
    position < 45 ? "Distance" :
    position < 65 ? "All-Round" :
    position < 82 ? "Tour Feel" : "Tour Urethane";
  return `${band} Ball ${LETTERS[i % 26]}`;
}

// ---------------------------------------------------------------------------
function main() {
  const rand = rng(SEED);

  const realPositions = readLineups("driver-lineups.json").map((m) => m.position);
  const drivers = DRIVER_BANDS.flatMap((band) =>
    bandPositions(realPositions, band).map((position, i) => ({
      name: `${band.label} Driver ${LETTERS[i]}`,
      band: band.key,
      bandLabel: band.label,
      position,
      profile: driverProfile(position, rand),
    })),
  );

  const balls = readLineups("ball-lineups.json")
    .sort((a, b) => a.position - b.position)
    .map((m, i) => ({
      name: ballName(m.position, i),
      position: m.position,
      profile: ballProfile(m.position, rand),
    }));

  const monitors = MONITOR_KINDS.flatMap((m) =>
    Array.from({ length: m.count }, (_, i) => ({
      ...m,
      name: `${m.label} ${LETTERS[i]}`,
    })),
  );

  // One synthetic golfer per (driver, ball-ish, monitor) spread, so the pool
  // has independent players rather than one player's shots relabelled.
  const points = [];
  const gear = [];
  const SHOTS_PER_CLUB = 120;

  // ---- driver comparison: every driver, every club --------------------------
  // A golfer's driver doesn't change their 7-iron, so the non-driver clubs
  // exist to populate the explorer, and only the Dr rows carry a driver tag.
  drivers.forEach((d, di) => {
    // Ten per head rather than six: with the pool trimmed to fifteen drivers
    // the budget is better spent on estimating each one properly, and the
    // ranking's adjustment is noticeably steadier for it.
    const golfers = 10;
    for (let g = 0; g < golfers; g++) {
      // SELECTION BIAS, ON PURPOSE. Better players gravitate to low-spin
      // heads, so the golfers holding a max-distance driver are a stronger
      // group than the ones holding a max-forgiveness one. This is true in the
      // real world and it is the entire reason a community ranking has to
      // standardize: the raw carry gap between the ends of the spectrum here
      // is ~8 yards, of which only ~3 is the driver and the rest is who's
      // swinging it. A ranking that skips the adjustment gets this backwards
      // and tells people to buy the driver that good players already own.
      const skill = normal(rand, (d.position / 100 - 0.5) * 1.1, 0.85);
      const handicap = HANDICAPS[Math.min(HANDICAPS.length - 1,
        Math.max(0, Math.round(3 - skill * 1.6)))];
      const age = pick(rand, AGES);
      const ball = balls[Math.floor(rand() * balls.length)];
      // Second confound, also real: better players own better launch monitors,
      // and the measurement classes don't report identical carry. So monitor
      // class correlates with skill AND shifts the number independently.
      const monitor = pickMonitor(monitors, skill, rand);

      // Every golfer testing this head contributes a driver row — that's what
      // the comparison is built from and it needs the spread. The rest of the
      // bag comes from one golfer per head: those rows exist only to populate
      // the explorer's other clubs, and generating fourteen clubs for every
      // golfer made the payload 900KB for data nothing reads.
      const clubsForGolfer = g === 0 ? CLUB_KEYS : ["Dr"];
      clubsForGolfer.forEach((club) => {
        const base = CLUBS[club];
        const isDriver = club === "Dr";
        const p = d.profile;
        const bp = ball.profile;

        // Per-shot generation, then aggregate to the one median row per golfer
        // per club that the explorer actually plots.
        const carries = [];
        const offlines = [];
        const speeds = [];
        const mishitLosses = [];
        for (let s = 0; s < SHOTS_PER_CLUB; s++) {
          // Strike quality, 0 = centre. Everything downstream keys off it, and
          // it is the main thing a handicap actually measures: better players
          // find the middle more often and miss it by less.
          const strikeErr = Math.abs(normal(rand, 0, strikeSd(skill)));
          const penalty = isDriver ? p.mishitPenalty : 1.15;
          const speedLoss = strikeErr * penalty * 1.7;
          const ballSpeed =
            base.ball + skill * 4.2 + (isDriver ? p.ballGain + bp.ballSpeed : 0) - speedLoss;
          const carry =
            base.carry + skill * 7.5
            + (isDriver ? p.ballGain * 2.3 + bp.driverCarry : 0)
            - strikeErr * penalty * 4.4
            // The monitor's own reporting bias rides on every number it
            // produces, which is why the ranking adjusts for it.
            + monitor.carryBias
            + normal(rand, 0, 3.2);
          carries.push(carry);
          offlines.push(
            offlineFor(rand, base, skill, strikeErr, isDriver ? p.offAmp : 3.0),
          );
          speeds.push(ballSpeed);
          mishitLosses.push({ err: strikeErr, carry });
        }

        carries.sort((a, b) => a - b);
        const med = carries[Math.floor(carries.length / 2)];
        const medOffline =
          offlines.slice().sort((a, b) => a - b)[Math.floor(offlines.length / 2)];

        const row = {
          club,
          n: SHOTS_PER_CLUB,
          carry: round1(med),
          ball_speed: round1(speeds.reduce((x, y) => x + y, 0) / speeds.length),
          launch_angle: round1(
            base.launch + (isDriver ? p.launchDelta : 0) + normal(rand, 0, 0.6),
          ),
          offline: round1(medOffline),
          handicap,
          age,
          launch_monitor: monitor.name,
          ball_model: ball.name,
          display_name: `Sample golfer ${di * golfers + g + 1}`,
          contributed: "2026-07-26",
          sample: true,
        };
        // Only the driver rows carry the driver tag — see above.
        if (isDriver) {
          row.club_brand = "";
          row.club_model = d.name;
        }
        points.push(row);

        if (isDriver) {
          // Per-product aggregate for the comparison panel: centre-strike
          // carry, dispersion, and what a bad strike actually costs.
          const sortedErr = [...mishitLosses].sort((a, b) => a.err - b.err);
          const centre = sortedErr.slice(0, Math.floor(sortedErr.length * 0.25));
          const mishit = sortedErr.slice(Math.floor(sortedErr.length * 0.8));
          const mean = (arr) => arr.reduce((x, y) => x + y.carry, 0) / arr.length;
          const absOff = offlines.map(Math.abs).sort((a, b) => a - b);
          gear.push({
            product: d.name,
            type: "driver",
            position: d.position,
            golfer: g,
            // Covariates the community ranking standardizes on. Without these
            // on the row there is nothing to adjust for and the ranking is
            // just a leaderboard of who owns what.
            handicap,
            age,
            monitor: monitor.name,
            monitor_kind: monitor.kind,
            ball_model: ball.name,
            carry_med: round1(med),
            carry_centre: round1(mean(centre)),
            carry_mishit: round1(mean(mishit)),
            mishit_loss: round1(mean(centre) - mean(mishit)),
            offline_mad: round1(absOff[Math.floor(absOff.length / 2)]),
            ball_speed: round1(speeds.reduce((x, y) => x + y, 0) / speeds.length),
          });
        }
      });
    }
  });

  // ---- ball comparison: every ball, driver + 7I + Pw ------------------------
  // Balls are generated on the three clubs where the spin trade-off actually
  // shows up, rather than all fourteen — it keeps the file to a sane size and
  // there is nothing to see on a 5-wood.
  balls.forEach((b) => {
    for (let g = 0; g < 6; g++) {
      // Same selection story as the drivers: tour urethane is disproportionately
      // played by better golfers, so a raw ball ranking flatters it.
      const skill = normal(rand, (b.position / 100 - 0.5) * 1.0, 0.85);
      const handicap = HANDICAPS[Math.min(HANDICAPS.length - 1,
        Math.max(0, Math.round(3 - skill * 1.6)))];
      const age = pick(rand, AGES);
      const monitor = pickMonitor(monitors, skill, rand);
      ["Dr", "7I", "Pw"].forEach((club) => {
        const base = CLUBS[club];
        const bp = b.profile;
        const isDriver = club === "Dr";
        const spin =
          base.spin
          + (isDriver ? bp.driverSpin : club === "Pw" ? bp.wedgeSpin : bp.wedgeSpin * 0.45)
          + normal(rand, 0, 140);
        gear.push({
          product: b.name,
          type: "ball",
          position: b.position,
          golfer: g,
          handicap,
          age,
          monitor: monitor.name,
          monitor_kind: monitor.kind,
          carry_med: round1(
            base.carry + skill * 7.5 + (isDriver ? bp.driverCarry : 0)
            + monitor.carryBias + normal(rand, 0, 2.6),
          ),
          spin: Math.round(spin),
          club,
          ball_speed: round1(base.ball + skill * 4.2 + bp.ballSpeed),
        });
      });
    }
  });

  // ---- launch-monitor comparison -------------------------------------------
  monitors.forEach((m) => {
    for (let g = 0; g < 5; g++) {
      const skill = normal(rand, 0, 1);
      ["Dr", "7I"].forEach((club) => {
        const base = CLUBS[club];
        gear.push({
          product: m.name,
          type: "monitor",
          kind: m.kind,
          measures_spin: m.measuresSpin,
          golfer: g,
          club,
          carry_med: round1(base.carry + skill * 7.5 + m.carryBias),
          spin: Math.round(base.spin + normal(rand, 0, m.spinNoise)),
          spin_noise: m.spinNoise,
        });
      });
    }
  });

  // ---- dispersion trade-off: raw shots per (driver band × handicap group) ---
  // The aggregates above can't answer "does the spread actually ramp up for a
  // worse player", because a median hides the shape. This block keeps real
  // shot scatter so the plot can show it, at one cell per band/group pair.
  const SHOTS_PER_CELL = 160;
  const dispersion = { groups: HANDICAP_GROUPS.map(({ key, label }) => ({ key, label })), cells: [] };
  DRIVER_BANDS.forEach((band) => {
    const inBand = drivers.filter((d) => d.band === band.key);
    HANDICAP_GROUPS.forEach((group) => {
      const shots = [];
      const carries = [];
      const byErr = [];
      for (let s = 0; s < SHOTS_PER_CELL; s++) {
        // Rotate through the band's heads so a cell describes the BAND, not
        // one lucky head inside it.
        const d = inBand[s % inBand.length];
        const p = d.profile;
        const base = CLUBS.Dr;
        const skill = normal(rand, group.skill, 0.30);
        const strikeErr = Math.abs(normal(rand, 0, strikeSd(skill)));
        const carry =
          base.carry + skill * 7.5 + p.ballGain * 2.3
          - strikeErr * p.mishitPenalty * 4.4 + normal(rand, 0, 3.2);
        const offline = offlineFor(rand, base, skill, strikeErr, p.offAmp);
        shots.push([round1(offline), round1(carry)]);
        carries.push(carry);
        byErr.push({ err: strikeErr, carry });
      }
      carries.sort((a, b) => a - b);
      byErr.sort((a, b) => a.err - b.err);
      const meanCarry = (arr) => arr.reduce((x, y) => x + y.carry, 0) / arr.length;
      const centre = byErr.slice(0, Math.floor(byErr.length * 0.25));
      const mishit = byErr.slice(Math.floor(byErr.length * 0.8));
      const offs = shots.map((s) => s[0]);
      const mo = offs.reduce((x, y) => x + y, 0) / offs.length;
      const lateralSd = Math.sqrt(
        offs.reduce((x, y) => x + (y - mo) ** 2, 0) / (offs.length - 1),
      );
      dispersion.cells.push({
        band: band.key,
        band_label: band.label,
        group: group.key,
        shots,
        stats: {
          n: SHOTS_PER_CELL,
          carry_med: round1(carries[Math.floor(carries.length / 2)]),
          lateral_sd: round1(lateralSd),
          mishit_loss: round1(meanCarry(centre) - meanCarry(mishit)),
        },
      });
    });
  });

  const payload = {
    generated: new Date().toISOString().slice(0, 10),
    seed: SEED,
    sample: true,
    notice:
      "Generated sample data. Product names are placeholders, not real "
      + "products, and no row describes any real make or model. Anchored to the "
      + "real market spectrum so the shape is realistic. Never aggregate this.",
    counts: {
      points: points.length,
      gear: gear.length,
      drivers: drivers.length,
      balls: balls.length,
      monitors: monitors.length,
      shots_simulated: points.length * SHOTS_PER_CLUB,
    },
    dispersion,
    products: {
      drivers: drivers.map((d) => ({
        name: d.name, position: d.position, band: d.band,
      })),
      balls: balls.map((b) => ({ name: b.name, position: b.position })),
      monitors: monitors.map((m) => ({
        name: m.name, kind: m.kind, measures_spin: m.measuresSpin,
      })),
    },
    points,
    gear,
  };

  fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true });
  fs.writeFileSync(path.resolve(OUT), JSON.stringify(payload), "utf-8");
  const kb = Math.round(fs.statSync(path.resolve(OUT)).size / 1024);
  console.log(
    `${OUT}: ${payload.counts.points} points, ${payload.counts.gear} gear rows, `
    + `${payload.counts.shots_simulated.toLocaleString()} shots simulated, ${kb} KB`,
  );
}

main();
