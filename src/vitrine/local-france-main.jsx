import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import LocalFrance from "./LocalFrance.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <LocalFrance />
  </React.StrictMode>
);
