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
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

if (!existsSync(DIST)) {
  console.error("prerender: dist/ introuvable — lancez `vite build` d'abord.");
  process.exit(1);
}

// En SSR, un `import img from "../assets/x.webp"` se résout en URL de DEV
// (/src/assets/x.webp), absente en production. On réécrit ces URLs vers le
// fichier haché réellement produit par Vite (assets/x-HASH.webp) pour que les
// images des composants pré-rendus soient valides sans JavaScript (SEO images).
const ASSET_FILES = existsSync(join(DIST, "assets")) ? readdirSync(join(DIST, "assets")) : [];
function hashedAsset(name) {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return null;
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^${esc(name.slice(0, dot))}-[\\w-]+\\.${esc(name.slice(dot + 1))}$`);
  return ASSET_FILES.find((f) => re.test(f)) || null;
}

// Intro élégante au premier chargement (script inline injecté dans <head> : il
// s'exécute AVANT l'hydratation React, donc le voile couvre la page tout de
// suite puis se lève. Gardé une seule fois par session ; neutralisé si
// prefers-reduced-motion. Sans JS, rien ne s'affiche (aucun blocage SEO).
const INTRO_SCRIPT = `<script>(function(){try{if(sessionStorage.getItem('vt-intro')==='1')return;sessionStorage.setItem('vt-intro','1')}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;function go(){var d=document.createElement('div');d.className='vt-intro';d.setAttribute('aria-hidden','true');d.innerHTML='<div class="vt-intro-in"><span class="vt-intro-orn"></span><span class="vt-intro-mark">Faire-part Vivant</span><span class="vt-intro-sub">par Fran\\u00e7ois Leterrier</span></div>';document.body.appendChild(d);document.documentElement.classList.add('vt-introlock');requestAnimationFrame(function(){d.classList.add('vt-intro-show')});setTimeout(function(){d.classList.add('vt-intro-out');document.documentElement.classList.remove('vt-introlock')},1500);setTimeout(function(){d.remove()},2600)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go)}else{go()}})();</script>`;

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
  const { default: PageEvenement } = await vite.ssrLoadModule("/src/vitrine/PageEvenement.jsx");
  const { default: Vitrine } = await vite.ssrLoadModule("/src/vitrine/Vitrine.jsx");
  const { ARTICLES } = await vite.ssrLoadModule("/src/vitrine/blog.js");
  const h = React.createElement;

  // Rend un composant en HTML statique. Neutralise l'animation `.reveal`
  // (opacity:0 tant que le JS n'a pas ajouté `.in`) → contenu visible sans JS.
  const render = (el) => renderToStaticMarkup(el).replace(/\breveal\b/g, "reveal in");

  // dist/<fichier> → markup à injecter dans <div id="vitrine-root">…</div>
  const pages = [
    { file: "index.html", markup: () => render(h(Vitrine)) },
    { file: "blog.html", markup: () => render(h(Blog)) },
    { file: "fonctionnalites.html", markup: () => render(h(Fonctionnalites)) },
    { file: "faire-part-mariage-muret.html", markup: () => render(h(LocalMuret)) },
    { file: "faire-part-mariage-numerique-france.html", markup: () => render(h(LocalFrance)) },
    { file: "a-propos.html", markup: () => render(h(APropos)) },
    { file: "faire-part-naissance.html", markup: () => render(h(PageEvenement, { eventKey: "naissance" })) },
    { file: "faire-part-bapteme.html", markup: () => render(h(PageEvenement, { eventKey: "bapteme" })) },
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
    let content = markup();
    // Réécrit les URLs d'assets dev (/src/assets/x.ext) vers les fichiers hachés,
    // en reprenant le préfixe (base) des assets déjà référencés dans la page.
    const prefixMatch = html.match(/(?:href|src)="([^"]*\/)assets\/[^"]+"/);
    const assetPrefix = prefixMatch ? prefixMatch[1] : "/";
    content = content.replace(/\/src\/assets\/([\w.-]+)/g, (whole, name) => {
      const hashed = hashedAsset(name);
      return hashed ? `${assetPrefix}assets/${hashed}` : whole;
    });
    const filled = html.replace(m[0], `${m[1]}${content}${m[2]}`);
    writeFileSync(path, filled.replace("</head>", `${INTRO_SCRIPT}</head>`));
    done++;
    console.log(`prerender: ${file} (+${content.length.toLocaleString("fr-FR")} car. statiques)`);
  }
  console.log(`prerender: ${done} page(s) rendue(s) pour le SEO.`);
} finally {
  await vite.close();
}
