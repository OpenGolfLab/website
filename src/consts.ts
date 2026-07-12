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

/**
 * Buy Me a Coffee link (top-nav support button).
 * ⇩⇩⇩  REPLACE with your real page, e.g. "https://buymeacoffee.com/opengolflab".
 */
export const BUYMEACOFFEE_URL = "https://buymeacoffee.com/YOUR_HANDLE";

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
  { href: "/blog", label: "Blog" },
] as const;
