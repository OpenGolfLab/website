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
  "GSPro-driven community analytics: open, crowd-sourced equipment testing where every shot counts.";
export const SITE_DESCRIPTION =
  "OpenGolfLab is GSPro-driven community analytics: an open, free effort to build robust, crowd-sourced comparisons of golf balls and clubs, standardized so everyone tests the same way. Powered by Golf Sim Analytics, a free Windows app for GSPro.";

/** Canonical production origin (no trailing slash). */
export const SITE_URL = "https://opengolflab.com";

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
 * merged roadmap (/lab#roadmap); Community Data is the crowd-sourced payoff.
 * (The researched Gear Guide graduated to its own top-level section; see
 * GEAR_SECTIONS.)
 */
export const LAB_SECTIONS = [
  {
    href: "/lab",
    label: "Overview",
    blurb: "The vision, how contribution works, and where it's headed.",
  },
  {
    href: "/lab/methodology",
    label: "Methodology",
    blurb: "The exact aggregation rules, versioned, enforced in open code.",
  },
  {
    href: "/lab/community",
    label: "Community Data",
    blurb: "Crowd-sourced norms from anonymized, opt-in GSPro sessions.",
  },
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
