// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { resolve } from "node:path";

// GitHub Pages serves the project at https://tevgenski-netizen.github.io/jackpot-joy-finder/
// so Vite needs to know about the path prefix in production builds.
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  vite: {
    base: isProd ? "/jackpot-joy-finder/" : "/",
    build: {
      // Emit a manifest so the prerender script can find the hashed
      // filename of our CSR bootstrap (src/client.tsx).
      manifest: true,
      rollupOptions: {
        input: {
          // CSR entry used by the static GitHub Pages build.
          client: resolve(__dirname, "src/client.tsx"),
        },
      },
    },
  },
});
