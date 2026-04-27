// Prerender script for GitHub Pages deployment.
// Reads the SSR worker output, renders "/" to static HTML, writes dist/client/index.html
// and copies it to 404.html for SPA-style fallback.
//
// Usage:  bun run scripts/prerender.ts   (after `bun run build`)

import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const SERVER_DIR = "dist/server";

if (!existsSync(CLIENT_DIR) || !existsSync(SERVER_DIR)) {
  console.error("✗ dist/ not found. Run `bun run build` first.");
  process.exit(1);
}

// Find the manifest from the client build
const manifestPath = join(SERVER_DIR, ".vite/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as Record<
  string,
  { file: string; css?: string[] }
>;

// Find the main client entry — it's the file referenced by index.html-like entry
const clientAssets = readdirSync(join(CLIENT_DIR, "assets"));
const mainJs = clientAssets.find((f) => f.startsWith("main-") && f.endsWith(".js"));
const cssFile = clientAssets.find((f) => f.endsWith(".css"));

if (!mainJs || !cssFile) {
  console.error("✗ Could not locate main JS/CSS in dist/client/assets");
  process.exit(1);
}

const TITLE = "Casino·Compendium — Энциклопедия казино-игр: правила, история, математика";
const DESC =
  "Подробный разбор казино-игр: правила, происхождение, математика и RTP. Слоты, блэкджек, рулетка, видеопокер и баккара — энциклопедия без рекламы.";

const GAME_IDS = ["slots", "blackjack", "roulette", "poker", "baccarat"];

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
<link rel="stylesheet" href="/assets/${cssFile}" />
<link rel="canonical" href="/" />
</head>
<body>
<div id="app"></div>
<script type="module" src="/assets/${mainJs}"></script>
</body>
</html>`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
copyFileSync(join(CLIENT_DIR, "index.html"), join(CLIENT_DIR, "404.html"));

// Robots + sitemap
writeFileSync(
  join(CLIENT_DIR, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n`
);
writeFileSync(
  join(CLIENT_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>`
);

// .nojekyll so GitHub Pages serves files starting with _
writeFileSync(join(CLIENT_DIR, ".nojekyll"), "");

console.log("✓ Static site ready in", CLIENT_DIR);
console.log("  - index.html");
console.log("  - 404.html (SPA fallback)");
console.log("  - robots.txt, sitemap.xml, .nojekyll");
