// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Production URL. Must match the custom domain in public/CNAME.
// This drives canonical URLs, the sitemap, and the RSS feed.
export default defineConfig({
  site: "https://opengolflab.com",
  integrations: [sitemap()],
  redirects: {
    // The Gear Guide was renamed from "Market Data" and later graduated from a
    // Lab sub-section to its own top-level /gear page. Keep both old links live.
    "/lab/market": "/gear",
    "/lab/gear": "/gear",
    // The Roadmap moved under The Lab, then merged into the Lab overview.
    // (/lab/roadmap itself is a redirect stub page → /lab#roadmap.)
    "/roadmap": "/lab#roadmap",
  },
  // Static output is the default: no adapter, no SSR, no server code.
  build: {
    // Emit /page/index.html so URLs are clean (/download, /blog, ...).
    format: "directory",
  },
});
