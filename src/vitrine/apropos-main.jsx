import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import APropos from "./APropos.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <APropos />
  </React.StrictMode>
);
