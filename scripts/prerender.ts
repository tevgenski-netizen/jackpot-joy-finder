// Prerender / static-deploy script for GitHub Pages.
//
// Strategy: ship a CLIENT-RENDERED app (CSR), not SSR/hydration.
// TanStack Start's default client entry calls `hydrateRoot(document, ...)`
// which throws "Invariant failed" against a static HTML shell on GH Pages.
// We can't add a second Vite input either — start-manifest-plugin rejects
// multiple entries. Instead, after the regular Vite build, we use esbuild
// to bundle `src/client.tsx` into its own standalone JS chunk that mounts
// the router into <div id="app"> with `createRoot`, and we generate a
// minimal HTML shell that loads it alongside the already-built Tailwind CSS.

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve } from "node:path";
import { build as esbuild } from "esbuild";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");

// Must match `base` in vite.config.ts
const BASE = "/jackpot-joy-finder/";
const SITE = "https://tevgenski-netizen.github.io/jackpot-joy-finder";

if (!existsSync(CLIENT_DIR)) {
  console.error("✗ dist/client not found. Run `bun run build` first.");
  process.exit(1);
}

// 1) Reuse the Tailwind CSS produced by the regular Vite build.
const cssFiles = readdirSync(ASSETS_DIR).filter((f) => f.endsWith(".css"));
if (cssFiles.length === 0) {
  console.error("✗ No CSS file found in dist/client/assets/.");
  process.exit(1);
}

// 2) Bundle src/client.tsx as a self-contained CSR bootstrap.
//    .css imports are stripped (Tailwind CSS is already in the Vite output).
const tmpOut = join(ASSETS_DIR, "csr-bootstrap.tmp.js");
await esbuild({
  entryPoints: [resolve("src/client.tsx")],
  bundle: true,
  format: "esm",
  target: "es2020",
  jsx: "automatic",
  minify: true,
  sourcemap: false,
  outfile: tmpOut,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "import.meta.env.MODE": JSON.stringify("production"),
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
    "import.meta.env.SSR": "false",
    "import.meta.env.BASE_URL": JSON.stringify(BASE),
  },
  loader: {
    ".css": "empty",
    ".jpg": "file",
    ".jpeg": "file",
    ".png": "file",
    ".svg": "file",
    ".webp": "file",
  },
  assetNames: "[name]-[hash]",
  publicPath: `${BASE}assets/`,
  resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs"],
  alias: {
    "@": resolve("src"),
  },
  logLevel: "warning",
});

// 3) Hash the bundled bootstrap so we can cache-bust.
const bootstrapBytes = readFileSync(tmpOut);
const hash = createHash("sha256")
  .update(bootstrapBytes)
  .digest("hex")
  .slice(0, 8);
const bootstrapName = `csr-bootstrap-${hash}.js`;
writeFileSync(join(ASSETS_DIR, bootstrapName), bootstrapBytes);
// Remove temp file
try {
  
  unlinkSync(tmpOut);
} catch {
  /* ignore */
}

console.log("✓ CSR bootstrap built:", bootstrapName, `(${bootstrapBytes.byteLength} bytes)`);

// 4) Write the HTML shell.
const TITLE =
  "Casino·Compendium — Энциклопедия казино-игр: правила, история, математика";
const DESC =
  "Подробный разбор казино-игр: правила, происхождение, математика и RTP. Слоты, блэкджек, рулетка, видеопокер и баккара — энциклопедия без рекламы.";

const GAME_IDS = ["slots", "blackjack", "roulette", "poker", "baccarat"];

const cssLinks = cssFiles
  .map((file) => `<link rel="stylesheet" href="${BASE}assets/${file}" />`)
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
<style>html,body{background:#000;color:#fff;margin:0}#app:empty::before{content:"";display:block;min-height:100vh;background:#000}</style>
</head>
<body>
<div id="app"></div>
<script type="module" src="${BASE}assets/${bootstrapName}"></script>
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
console.log("  client:  ", bootstrapName);
console.log("  styles:  ", cssFiles.join(", "));
