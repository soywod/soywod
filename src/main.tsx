import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/theme.css";
import "./styles/global.css";

/*
 * Dev-only entry: production pages are prerendered with the module script
 * stripped (see prerender.js), so this code never runs in a shipped page.
 * The Vite dev server falls back to index.html for every path, and App
 * picks the page from the URL.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>,
);
