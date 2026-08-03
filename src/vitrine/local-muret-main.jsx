import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import LocalMuret from "./LocalMuret.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <LocalMuret />
  </React.StrictMode>
);
