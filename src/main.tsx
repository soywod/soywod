import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { observeAnimations } from "./lib/anim";

import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-400-italic.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";

import "./styles/theme.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>,
);

setTimeout(observeAnimations, 100);
