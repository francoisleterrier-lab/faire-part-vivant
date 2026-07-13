import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// base : '/faire-part-vivant/' sur GitHub Pages (via BASE_PATH dans le workflow),
// sinon './' → dist/ uploadable tel quel sur n'importe quel serveur.
const base = process.env.BASE_PATH || "./";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      // SW écrit à la main (src/sw.js) pour gérer le push ; Workbox y injecte
      // le manifeste de précache du shell.
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,woff2,webp}"],
        globIgnores: ["**/icon-*.png"],
        maximumFileSizeToCacheInBytes: 3_000_000,
      },
      manifest: {
        name: "Faire-part Vivant",
        short_name: "FP Vivant",
        description: "Créez votre faire-part de mariage numérique — l'invitation qui vit.",
        lang: "fr",
        display: "standalone",
        orientation: "portrait",
        background_color: "#12201a",
        theme_color: "#12201a",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        // Vitrine commerciale (page d'accueil publique et indexable)
        main: new URL("./index.html", import.meta.url).pathname,
        // Page « Fonctionnalités » détaillée
        fonctionnalites: new URL("./fonctionnalites.html", import.meta.url).pathname,
        // Journal (blog SEO) : index + articles
        blog: new URL("./blog.html", import.meta.url).pathname,
        artGuide: new URL("./blog-guide-faire-part-mariage-numerique.html", import.meta.url).pathname,
        artPapier: new URL("./blog-faire-part-papier-ou-digital.html", import.meta.url).pathname,
        artRsvp: new URL("./blog-gerer-rsvp-mariage.html", import.meta.url).pathname,
        // Éditeur self-service + rendu public des invitations
        product: new URL("./product.html", import.meta.url).pathname,
      },
    },
  },
});
