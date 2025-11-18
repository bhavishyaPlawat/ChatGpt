import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Initialize theme on app start. Uses saved preference or system preference.
const saved = localStorage.getItem("theme");
let theme = saved;
if (!theme) {
  theme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
}
document.documentElement.setAttribute("data-theme", theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
