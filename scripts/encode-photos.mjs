/* Ré-encode des photos (JPEG haute déf) en WebP portrait 700×1050, recadrées
   « cover » (centrées), pour les aperçus téléphone des pages événement.
   Rendu via Chromium (canvas → WebP). Fichiers source passés en data-URI.
   One-shot : lancé à la main quand on ajoute/renouvelle une photo. */
import pw from "/home/user/mariage-virginie-francois/node_modules/playwright-core/index.js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const { chromium } = pw;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const SRC = "/tmp/cand";

// source jpg (dans /tmp/cand) → nom de sortie (dans src/assets)
// focusY : ancrage vertical du recadrage (0 = haut, .5 = centre, 1 = bas)
const JOBS = [
  { in: "hi-36211765.jpg", out: "anniversaire-fete.webp", focusY: 0.42 },
  { in: "hi-9451136.jpg", out: "fiancailles-couple.webp", focusY: 0.35 },
  { in: "hi-3171837.jpg", out: "professionnel-soiree.webp", focusY: 0.30 },
];

const W = 700, H = 1050, Q = 0.82;
const dataUri = (p) => `data:image/jpeg;base64,${readFileSync(p).toString("base64")}`;

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
const page = await browser.newPage();
for (const j of JOBS) {
  const uri = dataUri(join(SRC, j.in));
  const b64 = await page.evaluate(async ({ uri, W, H, Q, focusY }) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = uri; });
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d");
    // recadrage « cover » : on remplit W×H en préservant le ratio, ancrage focusY
    const scale = Math.max(W / img.width, H / img.height);
    const dw = img.width * scale, dh = img.height * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) * focusY;
    ctx.drawImage(img, dx, dy, dw, dh);
    return canvas.toDataURL("image/webp", Q).split(",")[1];
  }, { uri, W, H, Q, focusY: j.focusY });
  writeFileSync(join(ROOT, "src/assets", j.out), Buffer.from(b64, "base64"));
  const kb = Math.round(readFileSync(join(ROOT, "src/assets", j.out)).length / 1024);
  console.log(`encode: src/assets/${j.out} (${kb} Ko)`);
}
await browser.close();
console.log("encode: done");
