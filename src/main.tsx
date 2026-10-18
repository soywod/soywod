import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { observeAnimations } from "./lib/anim";

import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";

import "./styles/theme.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App url={window.location.pathname} />
  </StrictMode>,
);

setTimeout(observeAnimations, 100);
