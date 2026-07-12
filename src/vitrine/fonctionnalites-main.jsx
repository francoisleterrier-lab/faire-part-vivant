import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import Fonctionnalites from "./Fonctionnalites.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <Fonctionnalites />
  </React.StrictMode>
);
