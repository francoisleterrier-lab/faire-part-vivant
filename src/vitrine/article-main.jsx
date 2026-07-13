import React from "react";
import { createRoot } from "react-dom/client";
import "./vitrine.css";
import Article from "./Article.jsx";

const root = document.getElementById("vitrine-root");
const slug = root.dataset.article;

createRoot(root).render(
  <React.StrictMode>
    <Article slug={slug} />
  </React.StrictMode>
);
