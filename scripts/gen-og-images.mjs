/* Génère des images Open Graph 1200×630 brandées, une par page événement /
   locale. Rendu via Chromium (HTML → capture), polices et photos embarquées
   en data-URI pour un rendu fiable et déterministe. Sortie : public/og-*.jpg.
   À relancer à la main quand le visuel ou les titres changent. */
import pw from "/home/user/mariage-virginie-francois/node_modules/playwright-core/index.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const { chromium } = pw;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const b64 = (p, mime) => `data:${mime};base64,${readFileSync(p).toString("base64")}`;
const font = (f) => b64(join(ROOT, "public/fonts", f), "font/woff2");
const asset = (f) => {
  const mime = f.endsWith(".webp") ? "image/webp" : "image/jpeg";
  return b64(join(ROOT, "src/assets", f), mime);
};

const CORMORANT = font("cormorant-600.woff2");
const JOST = font("jost-400.woff2");
const JOST5 = font("jost-500.woff2");
const BOTANIC = asset("cadre-vegetal-strip.jpg");

/* clé de fichier → { photo, title, sub, loc } */
const CARDS = {
  "og-naissance": { photo: "naissance-grossesse.webp", title: "Faire-part\nde naissance", sub: "Numérique & vivant — de la grossesse au prénom révélé", loc: "Sud-Toulousain · partout en France" },
  "og-bapteme": { photo: "bapteme-enfant.webp", title: "Faire-part\nde baptême", sub: "Parrain & marraine, RSVP, plan d'accès, album partagé", loc: "Sud-Toulousain · partout en France" },
  "og-anniversaire": { photo: "anniversaire-fete.webp", title: "Faire-part\nd'anniversaire", sub: "Compte à rebours, RSVP, thème qui se révèle à date", loc: "Sud-Toulousain · partout en France" },
  "og-fiancailles": { photo: "fiancailles-couple.webp", title: "Faire-part\nde fiançailles", sub: "L'annonce, votre histoire, le RSVP de la fête", loc: "Sud-Toulousain · partout en France" },
  "og-professionnel": { photo: "professionnel-soiree.webp", title: "Invitation\nprofessionnelle", sub: "Inscriptions, programme, relances — élégant et net", loc: "Occitanie · partout en France" },
  "og-naissance-toulouse": { photo: "naissance-grossesse.webp", title: "Faire-part de\nnaissance à Toulouse", sub: "Numérique & vivant — créé près de chez vous", loc: "Toulouse · Haute-Garonne" },
  "og-bapteme-toulouse": { photo: "bapteme-enfant.webp", title: "Faire-part de\nbaptême à Toulouse", sub: "Église, réception, RSVP, album — accompagné", loc: "Toulouse · Haute-Garonne" },
};

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"/><style>
@font-face{font-family:Cormorant;src:url(${CORMORANT}) format('woff2');font-weight:600;font-display:block}
@font-face{font-family:Jost;src:url(${JOST}) format('woff2');font-weight:400;font-display:block}
@font-face{font-family:Jost;src:url(${JOST5}) format('woff2');font-weight:500;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
.card{width:1200px;height:630px;display:flex;background:#f4f0e7;position:relative;overflow:hidden}
.left{width:660px;height:630px;position:relative;padding:66px 58px;display:flex;flex-direction:column;justify-content:center;
  background:linear-gradient(180deg,#f6f2ea,#efe9dc)}
.left::before{content:"";position:absolute;inset:0;background:url(${BOTANIC}) center/cover;opacity:.10;mix-blend-mode:multiply}
.brand{position:relative;font-family:Jost;font-weight:500;letter-spacing:.30em;text-transform:uppercase;font-size:20px;color:#ac8c4a}
.orn{position:relative;margin:20px 0 26px;width:96px;height:2px;background:linear-gradient(90deg,#c9ad6e,rgba(201,173,110,0));border-radius:2px}
.orn::after{content:"";position:absolute;left:0;top:-4px;width:10px;height:10px;border-radius:50%;background:#c9ad6e}
h1{position:relative;font-family:Cormorant;font-weight:600;font-size:74px;line-height:1.02;color:#26301f;white-space:pre-line;letter-spacing:.5px}
.sub{position:relative;margin-top:26px;font-family:Jost;font-weight:400;font-size:26px;line-height:1.4;color:#4f5a45;max-width:520px}
.loc{position:relative;margin-top:30px;font-family:Jost;font-weight:500;font-size:19px;letter-spacing:.05em;color:#7a6a3f}
.by{position:relative;margin-top:8px;font-family:Jost;font-weight:400;font-size:18px;color:#8a927f}
.right{width:540px;height:630px;position:relative}
.right img{width:100%;height:100%;object-fit:cover;display:block}
.right::after{content:"";position:absolute;inset:0;box-shadow:inset 34px 0 46px -24px rgba(239,233,220,.9);pointer-events:none}
.seam{position:absolute;left:648px;top:0;width:24px;height:630px;background:linear-gradient(90deg,rgba(239,233,220,.95),rgba(239,233,220,0));z-index:2}
</style></head><body>
<div class="card">
  <div class="left">
    <div class="brand">Faire-part Vivant</div>
    <div class="orn"></div>
    <h1>${c.title}</h1>
    <div class="sub">${c.sub}</div>
    <div class="loc">${c.loc}</div>
    <div class="by">par François Leterrier</div>
  </div>
  <div class="seam"></div>
  <div class="right"><img src="${asset(c.photo)}"/></div>
</div>
</body></html>`;

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [key, c] of Object.entries(CARDS)) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: join(ROOT, "public", `${key}.jpg`), type: "jpeg", quality: 84 });
  console.log(`og: public/${key}.jpg`);
}
await browser.close();
console.log("og: done");
