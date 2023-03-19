import { createRoot } from "react-dom/client";
import * as React from "react";
import { App } from "./App";

const rootEl = document.getElementById("app");
const root = createRoot(rootEl!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
