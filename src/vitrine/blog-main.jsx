import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import Blog from "./Blog.jsx";

createRoot(document.getElementById("vitrine-root")).render(
  <React.StrictMode>
    <Blog />
  </React.StrictMode>
);
