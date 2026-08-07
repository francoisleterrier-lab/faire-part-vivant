import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import LocalEvenement from "./LocalEvenement.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <LocalEvenement localKey="naissance-toulouse" />
  </React.StrictMode>
);
