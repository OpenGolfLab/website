// ---------------------------------------------------------------------------
// Site-wide constants. Change these in ONE place.
// ---------------------------------------------------------------------------

/** GitHub repository that hosts the app releases, in "OWNER/REPO" form. */
export const GITHUB_REPO = "opengolflab/golf-sim-analytics";

/** Full URL to the GitHub repo. */
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

/** "Download the latest release" link, always points at the newest release. */
export const LATEST_RELEASE_URL = `${GITHUB_URL}/releases/latest`;

/**
 * Exact filename of the installer asset attached to each GitHub release.
 * Must match OutputBaseFilename in installer/GolfSimAnalytics.iss over in
 * the golf-sim-analytics repo, if that ever changes, update it here too.
 */
const INSTALLER_ASSET_NAME = "GolfSimAnalytics-Setup.exe";

/**
 * Direct download link for the installer, goes straight to the .exe file
 * (browser starts downloading immediately), not to the GitHub releases
 * page. Always resolves to the newest release, PROVIDED that release isn't
 * marked "pre-release" or "draft" on GitHub, those are excluded from
 * "latest" and this link 404s until one is promoted to a full release.
 */
export const LATEST_DOWNLOAD_URL = `${GITHUB_URL}/releases/latest/download/${INSTALLER_ASSET_NAME}`;

/** Watch/star the repo (used on the Lab page as an email-free CTA). */
export const GITHUB_WATCH_URL = `${GITHUB_URL}/subscription`;

/** Ko-fi support link (top-nav support button). */
export const KOFI_URL = "https://ko-fi.com/opengolflab";

/** Site identity. */
export const SITE_TITLE = "OpenGolfLab";
export const SITE_TAGLINE = "Your sim is the lab. Your swings are the data.";
/** Mission-level line for the home page / brand. */
export const SITE_MISSION =
  "An open dataset of real amateur golf shots, hit under controlled indoor conditions, tagged with club, ball and launch monitor.";
export const SITE_DESCRIPTION =
  "OpenGolfLab is building an open dataset of real amateur golf shots hit under controlled indoor conditions — tagged with club, ball and launch monitor — to answer what actually belongs in your bag, and show you where you stack up. Powered by Golf Sim Analytics, a free Windows app for GSPro.";

/** Canonical production origin (no trailing slash). */
export const SITE_URL = "https://opengolflab.com";

/**
 * Cloudflare Web Analytics site token. Injected once, in BaseHead, which every
 * page renders. Set to "" to remove analytics from the whole site.
 *
 * This replaced Google Analytics 4 (G-0TKQ8HMBFG). The whole product claim is
 * local-first, no account, nothing uploaded — and the site was shipping
 * Google's cookie-setting tag on every page of it. Cloudflare Web Analytics is
 * cookieless, sets no persistent identifier, needs no consent banner, and runs
 * on the platform this site already deploys to, so the fix costs nothing and
 * turns the contradiction into a claim /privacy can make honestly.
 *
 * To get the token: Cloudflare dashboard → Analytics & Logs → Web Analytics →
 * Add a site (opengolflab.com) → copy the value of `token` out of the JS
 * snippet it shows. Until it's set, the site simply has no page analytics —
 * the funnel events in lib/analytics.ts are separate and unaffected.
 */
export const CF_ANALYTICS_TOKEN = "";

/** Product facts reused across pages. */
export const PRODUCT_NAME = "Golf Sim Analytics";
export const PRODUCT_OS = "Windows 10 / 11 (64-bit)";
export const PRODUCT_PRICE = "0"; // free

/** Top navigation. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/golf-sim-analytics", label: "Golf Sim Analytics" },
  { href: "/lab", label: "The Lab" },
  { href: "/gear", label: "Gear Guide" },
  { href: "/blog", label: "Blog" },
] as const;

/**
 * The Lab's own section nav. Overview frames the effort and carries the
 * merged roadmap (/lab#roadmap) and methodology (/lab#methodology);
 * Community Data is the crowd-sourced payoff. (The researched Gear Guide
 * graduated to its own top-level section; see GEAR_SECTIONS.)
 */
export const LAB_SECTIONS = [
  {
    href: "/lab",
    label: "Overview",
    blurb: "The vision, the method, how contribution works, and where it's headed.",
  },
  {
    href: "/lab/community",
    label: "Community Data",
    blurb: "Crowd-sourced norms from anonymized, opt-in GSPro sessions.",
  },
  {
    href: "/lab/benchmarks",
    label: "Benchmarks",
    blurb: "Where do you stack up? Enter a number, see your percentile.",
  },
  {
    href: "/lab/tools/sample-size",
    label: "Sample-Size Problem",
    blurb: "Why most gear verdicts are coin flips, and how many shots it really takes.",
  },
] as const;

/**
 * The user guide's section nav. Same in-page anchor pattern as GEAR_SECTIONS:
 * one long scroll with a shareable deep link per section, because the guide is
 * read by jumping to the one dashboard you're looking at, not front to back.
 */
export const GUIDE_SECTIONS = [
  { href: "/golf-sim-analytics/guide#start", id: "start", label: "Getting started" },
  { href: "/golf-sim-analytics/guide#layout", id: "layout", label: "The app" },
  { href: "/golf-sim-analytics/guide#dashboards", id: "dashboards", label: "Dashboards" },
  { href: "/golf-sim-analytics/guide#numbers", id: "numbers", label: "The numbers" },
  { href: "/golf-sim-analytics/guide#course", id: "course", label: "On course" },
  { href: "/golf-sim-analytics/guide#data", id: "data", label: "Your data" },
  { href: "/golf-sim-analytics/guide#community", id: "community", label: "Contributing" },
] as const;

/**
 * The Gear Guide's section nav. One page, four bag categories, these are
 * in-page anchors (jump-nav) rather than separate routes, so the whole guide
 * stays a single scroll with a shareable deep link per category.
 */
export const GEAR_SECTIONS = [
  { href: "/gear#drivers", id: "drivers", label: "Drivers" },
  { href: "/gear#irons", id: "irons", label: "Irons" },
  { href: "/gear#wedges", id: "wedges", label: "Wedges" },
  { href: "/gear#balls", id: "balls", label: "Balls" },
] as const;
