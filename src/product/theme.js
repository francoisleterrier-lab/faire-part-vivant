/* ============================================================
   Couleur du faire-part : n'importe quelle teinte d'accent, et
   une palette sombre élégante dérivée automatiquement autour d'elle.
   Le champ `theme` (table fpv_invitations) stocke soit une couleur
   hex (#rrggbb), soit un ancien identifiant nommé (rétro-compat).
   ============================================================ */

export const PRESETS = [
  { nom: "Eucalyptus", hex: "#6f8a6b" },
  { nom: "Or", hex: "#b3924f" },
  { nom: "Terracotta", hex: "#c07a54" },
  { nom: "Ardoise", hex: "#6f8aa0" },
  { nom: "Rose poudré", hex: "#c78ba1" },
  { nom: "Prune", hex: "#8a6b86" },
  { nom: "Bordeaux", hex: "#9c4a56" },
  { nom: "Forêt", hex: "#3f4e3a" },
];

const LEGACY = { canopee: "#6f8a6b", sceau: "#c07a54", brume: "#6f8aa0" };

export function themeToHex(theme) {
  if (typeof theme === "string" && /^#[0-9a-fA-F]{6}$/.test(theme)) return theme;
  return LEGACY[theme] || "#6f8a6b";
}

function hexToHsl(hex) {
  const h = themeToHex(hex).slice(1);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  return { h: hue, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/* Palette CSS (variables du rendu) dérivée d'une couleur d'accent.
   Fond sombre désaturé teinté, texte clair, accent lisible garanti. */
export function paletteFromAccent(theme) {
  const hex = themeToHex(theme);
  const { h, s, l } = hexToHsl(hex);
  // L'accent doit rester lisible sur fond sombre : on l'éclaircit si besoin.
  const accent = l < 48 ? hslToHex(h, Math.min(s, 72), 60) : hex;
  return {
    "--accent": accent,
    "--bg": hslToHex(h, Math.min(s, 40), 9),
    "--bg2": hslToHex(h, Math.min(s, 36), 14),
    "--surface": hslToHex(h, Math.min(s, 34), 12),
    "--text": hslToHex(h, 12, 93),
    "--muted": hslToHex(h, 16, 74),
    "--line": "rgba(255,255,255,0.14)",
  };
}
