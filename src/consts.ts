// ---------------------------------------------------------------------------
// Site-wide constants. Change these in ONE place.
// ---------------------------------------------------------------------------

/**
 * GitHub repository that hosts the app releases, in "OWNER/REPO" form.
 * ⇩⇩⇩  REPLACE THIS with your real repo, e.g. "opengolflab/golf-sim-analytics".
 */
export const GITHUB_REPO = "opengolflab/golf-sim-analytics";

/** Full URL to the GitHub repo. */
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

/** "Download the latest release" link — always points at the newest release. */
export const LATEST_RELEASE_URL = `${GITHUB_URL}/releases/latest`;

/** Watch/star the repo (used on the Lab page as an email-free CTA). */
export const GITHUB_WATCH_URL = `${GITHUB_URL}/subscription`;

/** Ko-fi support link (top-nav support button). */
export const KOFI_URL = "https://ko-fi.com/opengolflab";

/** Site identity. */
export const SITE_TITLE = "OpenGolfLab";
export const SITE_TAGLINE = "Every shot. Every insight.";
/** Mission-level line for the home page / brand. */
export const SITE_MISSION =
  "Open, crowd-sourced golf equipment testing — standardized so every shot counts.";
export const SITE_DESCRIPTION =
  "OpenGolfLab is an open, free effort to build robust, crowd-sourced comparisons of golf balls and clubs — standardized so everyone tests the same way. Powered by Golf Sim Analytics, a free Windows app for GSPro.";

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
  { href: "/roadmap", label: "Roadmap" },
  { href: "/blog", label: "Blog" },
] as const;

/**
 * The Lab's own section nav. Two kinds of data live under /lab and they are
 * built completely differently — keep them on separate routes so each has a
 * shareable URL and room to grow (balls, irons, wedges) without one long page.
 */
export const LAB_SECTIONS = [
  {
    href: "/lab",
    label: "Overview",
    blurb: "What the Lab is and where each dataset stands.",
  },
  {
    href: "/lab/gear",
    label: "Gear Guide",
    blurb: "Editorial snapshots of what's for sale — lineups and street prices.",
  },
  {
    href: "/lab/community",
    label: "Community Data",
    blurb: "Crowd-sourced norms from anonymized, opt-in GSPro sessions.",
  },
] as const;
