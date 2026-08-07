import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import PageEvenement from "./PageEvenement.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <PageEvenement eventKey="anniversaire" />
  </React.StrictMode>
);
