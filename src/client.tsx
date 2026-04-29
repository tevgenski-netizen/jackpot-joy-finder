// Client-only bootstrap for static hosting (GitHub Pages).
// We deliberately avoid TanStack Start's default `hydrateRoot(document, ...)`
// because the prerendered HTML for static hosts is a minimal shell that does
// NOT contain the SSR-rendered app — hydrating `document` against that shell
// throws "Invariant failed" and renders a black screen.
//
// Instead we mount the router as a regular CSR app into <div id="app">.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

const container = document.getElementById("app");
if (!container) {
  throw new Error('Mount node "#app" not found in document');
}

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
