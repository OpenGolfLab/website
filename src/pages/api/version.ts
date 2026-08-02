// ---------------------------------------------------------------------------
// Latest release, as JSON.
//
// Exists because the app page is prerendered while releases ship independently
// of site deploys — the build-time version baked into that HTML is right until
// the next release and stale forever after. The page fetches this on load to
// correct itself.
//
// Cached hard at the edge (see CACHE_SECONDS): the underlying GitHub call is
// unauthenticated and rate-limited by IP, so every visitor hitting GitHub
// directly would be a good way to start serving nothing at all.
// ---------------------------------------------------------------------------
import type { APIRoute } from "astro";

import { getLatestRelease } from "../../lib/release";

export const prerender = false;

// 15 minutes. A version badge being a few minutes behind a brand-new release is
// invisible; hammering GitHub is not.
const CACHE_SECONDS = 900;

export const GET: APIRoute = async () => {
  const release = await getLatestRelease(CACHE_SECONDS);
  return new Response(JSON.stringify(release), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // stale-while-revalidate: a visitor never waits on GitHub, they get the
      // cached answer while it refreshes behind them.
      "Cache-Control": `public, max-age=${CACHE_SECONDS}, stale-while-revalidate=3600`,
    },
  });
};
