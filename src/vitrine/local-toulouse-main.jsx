import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import LocalToulouse from "./LocalToulouse.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <LocalToulouse />
  </React.StrictMode>
);
