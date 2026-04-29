// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves the project at https://tevgenski-netizen.github.io/jackpot-joy-finder/
// so Vite needs to know about the path prefix in production builds.
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  vite: {
    base: isProd ? "/jackpot-joy-finder/" : "/",
  },
});
