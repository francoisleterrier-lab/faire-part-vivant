/* ============================================================
   Pré-rendu SEO (postbuild).

   Injecte le HTML statique des pages React (Journal, articles,
   Fonctionnalités) dans dist/, pour que Google ET les crawlers IA
   (GPTBot, PerplexityBot, ClaudeBot…) voient le contenu sans exécuter
   de JavaScript.

   Source unique de vérité : les composants React + blog.js. Rien n'est
   dupliqué à la main. Au chargement, React (createRoot) remplace ce
   contenu par la version interactive — le statique ne sert qu'au
   référencement et au premier affichage sans JS.

   Lancé automatiquement par `npm run build` (après `vite build`).
   ============================================================ */
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

if (!existsSync(DIST)) {
  console.error("prerender: dist/ introuvable — lancez `vite build` d'abord.");
  process.exit(1);
}

// Serveur Vite en mode SSR (config minimale : uniquement le plugin React,
// pas de PWA ni de base — on ne charge que des modules, pas de bundle).
const vite = await createServer({
  root: ROOT,
  configFile: false,
  appType: "custom",
  logLevel: "warn",
  plugins: [react()],
  server: { middlewareMode: true },
});

try {
  const { default: Article } = await vite.ssrLoadModule("/src/vitrine/Article.jsx");
  const { default: Blog } = await vite.ssrLoadModule("/src/vitrine/Blog.jsx");
  const { default: Fonctionnalites } = await vite.ssrLoadModule("/src/vitrine/Fonctionnalites.jsx");
  const { default: LocalMuret } = await vite.ssrLoadModule("/src/vitrine/LocalMuret.jsx");
  const { default: LocalFrance } = await vite.ssrLoadModule("/src/vitrine/LocalFrance.jsx");
  const { default: APropos } = await vite.ssrLoadModule("/src/vitrine/APropos.jsx");
  const { ARTICLES } = await vite.ssrLoadModule("/src/vitrine/blog.js");
  const h = React.createElement;

  // Rend un composant en HTML statique. Neutralise l'animation `.reveal`
  // (opacity:0 tant que le JS n'a pas ajouté `.in`) → contenu visible sans JS.
  const render = (el) => renderToStaticMarkup(el).replace(/\breveal\b/g, "reveal in");

  // dist/<fichier> → markup à injecter dans <div id="vitrine-root">…</div>
  const pages = [
    { file: "blog.html", markup: () => render(h(Blog)) },
    { file: "fonctionnalites.html", markup: () => render(h(Fonctionnalites)) },
    { file: "faire-part-mariage-muret.html", markup: () => render(h(LocalMuret)) },
    { file: "faire-part-mariage-numerique-france.html", markup: () => render(h(LocalFrance)) },
    { file: "a-propos.html", markup: () => render(h(APropos)) },
    ...ARTICLES.map((a) => ({
      file: `blog-${a.slug}.html`,
      markup: () => render(h(Article, { slug: a.slug })),
    })),
  ];

  let done = 0;
  for (const { file, markup } of pages) {
    const path = join(DIST, file);
    if (!existsSync(path)) {
      console.warn("prerender: ignoré (absent de dist)", file);
      continue;
    }
    const html = readFileSync(path, "utf8");
    const m = html.match(/(<div id="vitrine-root"[^>]*>)(<\/div>)/);
    if (!m) {
      console.warn("prerender: <div id=\"vitrine-root\"> introuvable ou déjà rempli —", file);
      continue;
    }
    const content = markup();
    writeFileSync(path, html.replace(m[0], `${m[1]}${content}${m[2]}`));
    done++;
    console.log(`prerender: ${file} (+${content.length.toLocaleString("fr-FR")} car. statiques)`);
  }
  console.log(`prerender: ${done} page(s) rendue(s) pour le SEO.`);
} finally {
  await vite.close();
}
