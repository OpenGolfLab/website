// ---------------------------------------------------------------------------
// Latest app release — version number and publish date.
//
// The single source of truth is the GitHub release itself, never a constant in
// this repo. That matters because of how releasing actually works: publishing a
// GitHub release IS the site update (the download button resolves
// releases/latest by name), so the app ships without this site being rebuilt.
// A hand-maintained version string here would therefore be wrong the moment a
// release goes out, and wrong in the most embarrassing possible place — the
// page telling people what they're about to download.
//
// Two readers, deliberately:
//   * getLatestRelease() at BUILD time, so the real number is in the served
//     HTML (no layout shift, works with JS off, indexable).
//   * /api/version at RUN time, so a release published after the last deploy
//     still shows up. The page refreshes itself from it.
// ---------------------------------------------------------------------------
import { GITHUB_REPO } from "../consts";

export interface ReleaseInfo {
  /** Tag as published, e.g. "v1.7.1". Empty string when unknown. */
  version: string;
  /** ISO 8601 publish timestamp, or "" when unknown. */
  publishedAt: string;
}

export const EMPTY_RELEASE: ReleaseInfo = { version: "", publishedAt: "" };

const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

/**
 * Ask GitHub for the newest full release.
 *
 * Never throws and never fails a build: an outage, a rate limit, or a repo with
 * no releases yet all resolve to EMPTY_RELEASE, and callers render a graceful
 * fallback instead. A version badge is not worth breaking a deploy over.
 *
 * `cacheSeconds` uses Cloudflare's fetch cache when running on a Worker, which
 * is what keeps this off GitHub's unauthenticated rate limit (60/hr per IP) —
 * one origin hit per TTL serves every visitor. It's ignored at build time,
 * where there's exactly one call per deploy anyway.
 */
export async function getLatestRelease(cacheSeconds = 0): Promise<ReleaseInfo> {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        // GitHub rejects API requests with no User-Agent outright.
        "User-Agent": "opengolflab-site",
      },
      ...(cacheSeconds
        ? { cf: { cacheTtl: cacheSeconds, cacheEverything: true } }
        : {}),
    } as RequestInit);
    if (!res.ok) return EMPTY_RELEASE;
    const data = (await res.json()) as {
      tag_name?: string;
      published_at?: string;
      draft?: boolean;
      prerelease?: boolean;
    };
    // releases/latest already excludes drafts and pre-releases; checked anyway
    // so this can't ever advertise a build the download button won't serve.
    if (data.draft || data.prerelease) return EMPTY_RELEASE;
    return {
      version: typeof data.tag_name === "string" ? data.tag_name : "",
      publishedAt: typeof data.published_at === "string" ? data.published_at : "",
    };
  } catch {
    return EMPTY_RELEASE;
  }
}

/** "Aug 1, 2026" — or "" for anything unparseable. */
export function formatReleaseDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
