// Prerender script for GitHub Pages deployment.
//
// Strategy: we ship a CLIENT-RENDERED app (CSR), not SSR/hydration.
// TanStack Start's default client entry calls `hydrateRoot(document, ...)`,
// which throws "Invariant failed" on a static host because the prerendered
// HTML is just a shell and doesn't match the React tree. Instead we bundle
// `src/client.tsx`, which mounts the router into <div id="app"> with
// `createRoot`, and we generate a tiny shell HTML that loads it.

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";

// Must match `base` in vite.config.ts
const BASE = "/jackpot-joy-finder/";
const SITE = "https://tevgenski-netizen.github.io/jackpot-joy-finder";

if (!existsSync(CLIENT_DIR)) {
  console.error("✗ dist/client not found. Run `bun run build` first.");
  process.exit(1);
}

// 1) Locate hashed filename of our CSR entry via the client manifest.
type ManifestEntry = { file: string; css?: string[]; isEntry?: boolean };
const manifestPath = join(CLIENT_DIR, ".vite/manifest.json");
let clientJs: string | undefined;
let cssFiles: string[] = [];

if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Record<
    string,
    ManifestEntry
  >;
  const entry = manifest["src/client.tsx"];
  if (entry) {
    clientJs = entry.file;
    cssFiles = entry.css ?? [];
  }
}

// Fallback: scan dist/client/assets for a `client-*.js` file.
if (!clientJs) {
  const assets = readdirSync(join(CLIENT_DIR, "assets"));
  clientJs = assets.find((f) => f.startsWith("client-") && f.endsWith(".js"));
  if (cssFiles.length === 0) {
    cssFiles = assets.filter((f) => f.endsWith(".css")).map((f) => `assets/${f}`);
  }
}

if (!clientJs) {
  console.error(
    "✗ Could not locate the client bootstrap bundle. " +
      "Make sure src/client.tsx is included as a Vite input.",
  );
  process.exit(1);
}

const TITLE =
  "Casino·Compendium — Энциклопедия казино-игр: правила, история, математика";
const DESC =
  "Подробный разбор казино-игр: правила, происхождение, математика и RTP. Слоты, блэкджек, рулетка, видеопокер и баккара — энциклопедия без рекламы.";

const GAME_IDS = ["slots", "blackjack", "roulette", "poker", "baccarat"];

const cssLinks = cssFiles
  .map((href) => `<link rel="stylesheet" href="${BASE}${href}" />`)
  .join("\n");

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${TITLE}</title>
<meta name="description" content="${DESC}" />
<meta name="keywords" content="обзоры казино, онлайн казино, RTP, стратегии казино, рулетка, блэкджек, слоты, видеопокер, баккара" />
<meta property="og:title" content="${TITLE}" />
<meta property="og:description" content="${DESC}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${TITLE}" />
<meta name="twitter:description" content="${DESC}" />
${cssLinks}
<link rel="canonical" href="${SITE}/" />
<style>html,body{background:#000;color:#fff;margin:0}</style>
</head>
<body>
<div id="app"></div>
<script type="module" src="${BASE}${clientJs}"></script>
</body>
</html>`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
// 404.html acts as the SPA fallback for any unknown path on GitHub Pages.
copyFileSync(join(CLIENT_DIR, "index.html"), join(CLIENT_DIR, "404.html"));

writeFileSync(
  join(CLIENT_DIR, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`,
);
writeFileSync(
  join(CLIENT_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${GAME_IDS.map(
  (id) =>
    `<url><loc>${SITE}/games/${id}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
).join("\n")}
</urlset>`,
);

writeFileSync(join(CLIENT_DIR, ".nojekyll"), "");

console.log("✓ Static site ready in", CLIENT_DIR);
console.log("  base:    ", BASE);
console.log("  client:  ", clientJs);
console.log("  styles:  ", cssFiles.join(", ") || "(none)");
