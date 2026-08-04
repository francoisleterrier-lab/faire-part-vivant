import { useEffect, useRef, useState } from "react";

/* ============================================================
   « Une lumière par invité » — version vivante (canvas, 3 effets).
   Cœur · Initiales (V & F) · Arbre qui pousse. Auto-joue en boucle.
   Tout le code navigateur est dans useEffect (jamais au niveau module,
   car shared.jsx est importé par des pages pré-rendues côté serveur).
   ============================================================ */

const GUESTS = [
  "Camille & Alex", "Mamie Jeanne", "Les cousins de Lyon", "Léa & Tom", "Papa & Maman",
  "Sofia", "Hugo & Marie", "Tonton Bernard", "Clara & Sami", "Les voisins d'en face",
  "Emma", "Nathan & Zoé", "Mémé Odette", "Julie & Karim", "La bande de la fac",
  "Louis", "Anaïs & Paul", "Les Martin", "Chloé & Bastien", "Grand-père Henri",
  "Inès", "Théo & Manon", "Le groupe du lycée", "Sarah & Yanis", "Tata Nicole",
  "Gabriel", "Lucie & Rémi", "Nos témoins 💫", "Adèle", "Marius & Jade",
  "La famille Roux", "Noé", "Elsa & Victor", "Les amis de Paris", "Romane",
  "Arthur & Lina", "Pépé Marcel", "Zélie", "Ethan & Rose", "Toute la tablée 🥂",
];

const UNIT = { coeur: "lumières", initiales: "étoiles", arbre: "feuilles" };
const LABEL = { coeur: "Cœur", initiales: "Initiales", arbre: "Arbre" };

export default function LumiereVivante() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [mode, setMode] = useState("coeur");
  const [count, setCount] = useState(0);
  const [unit, setUnit] = useState(UNIT.coeur);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const engine = createEngine(canvasRef.current, {
      onCount: setCount,
      onUnit: setUnit,
      onToast: setToast,
    });
    engineRef.current = engine;
    return () => engine && engine.destroy();
  }, []);

  useEffect(() => {
    if (engineRef.current) engineRef.current.setMode(mode);
  }, [mode]);

  return (
    <div className="vt-lv">
      <div className="vt-lv-switch" role="radiogroup" aria-label="Choisir l'effet">
        {["coeur", "initiales", "arbre"].map((m) => (
          <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}>
            {LABEL[m]}
          </button>
        ))}
      </div>
      <div className="vt-lv-stage">
        <canvas ref={canvasRef} className="vt-lv-canvas" aria-hidden="true" />
        <div className="vt-lv-toast" aria-live="polite">{toast}</div>
      </div>
      <p className="vt-lv-compte"><b>{count}</b> {unit} allumées · autant de «&nbsp;oui&nbsp;» 💛</p>
    </div>
  );
}

/* ---------- moteur canvas (client-only) ---------- */
function createEngine(cv, cb) {
  if (!cv) return null;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  let mode = "coeur";
  let W, H, DPR, fit, bgGrad;
  let nodes = [], leaves = [], seq = [], seqPtr = 0;
  let arrivals = [], blooms = [], ripples = [], dust = [];
  let lit = 0, completed = false, lastYes = 0, guestPtr = 0;
  let raf = 0, loopTimer = 0, toastTimer = 0;

  const rand = (a, b) => a + Math.random() * (b - a);
  const ease = (p) => 1 - Math.pow(1 - p, 3);
  const lerp = (a, b, p) => a + (b - a) * p;
  const range = (n) => [...Array(n).keys()];
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const glow = document.createElement("canvas"); glow.width = glow.height = 128;
  { const g = glow.getContext("2d"); const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, "rgba(255,246,222,1)"); rg.addColorStop(.16, "rgba(231,199,138,.82)");
    rg.addColorStop(.45, "rgba(200,150,70,.26)"); rg.addColorStop(1, "rgba(200,150,70,0)");
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128); }

  function normalize(pts) {
    let mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
    for (const p of pts) { mnx = Math.min(mnx, p.x); mny = Math.min(mny, p.y); mxx = Math.max(mxx, p.x); mxy = Math.max(mxy, p.y); }
    const w = mxx - mnx || 1, h = mxy - mny || 1, sc = 1 / Math.max(w, h), ox = (1 - w * sc) / 2, oy = (1 - h * sc) / 2;
    for (const p of pts) { p.nx = ox + (p.x - mnx) * sc; p.ny = oy + (p.y - mny) * sc; }
    return pts;
  }
  function buildHeart() {
    const N = 30, dense = 720, raw = [];
    for (let i = 0; i <= dense; i++) { const t = i / dense * Math.PI * 2;
      raw.push({ x: 16 * Math.pow(Math.sin(t), 3), y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) }); }
    const cum = [0]; for (let i = 1; i < raw.length; i++) cum.push(cum[i - 1] + Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y));
    const total = cum[cum.length - 1], pts = [];
    for (let k = 0; k < N; k++) { const tgt = total * k / N; let i = 1; while (i < cum.length && cum[i] < tgt) i++;
      const p = raw[Math.min(i, raw.length - 1)]; pts.push({ x: p.x + rand(-.9, .9), y: p.y + rand(-.9, .9), parent: -1, leaf: true }); }
    normalize(pts); return { nodes: pts, seq: shuffle(range(N)) };
  }
  function buildInitials() {
    const off = document.createElement("canvas"); off.width = 1200; off.height = 380;
    const o = off.getContext("2d"); o.fillStyle = "#fff"; o.textAlign = "center"; o.textBaseline = "middle";
    o.font = '700 250px "Cormorant Garamond","Palatino Linotype",Georgia,serif'; o.fillText("V & F", 600, 192);
    const d = o.getImageData(0, 0, 1200, 380).data, cand = [];
    for (let y = 0; y < 380; y += 6) for (let x = 0; x < 1200; x += 6) if (d[(y * 1200 + x) * 4 + 3] > 128) cand.push({ x, y });
    shuffle(cand);
    const chosen = [], mind = 28, N = 36;
    for (const c of cand) { if (chosen.every((q) => Math.hypot(q.x - c.x, q.y - c.y) > mind)) chosen.push(c); if (chosen.length >= N) break; }
    const pts = chosen.map((c) => ({ x: c.x, y: c.y, parent: -1, leaf: true }));
    normalize(pts); return { nodes: pts, seq: range(pts.length).sort((a, b) => pts[a].nx - pts[b].nx) };
  }
  function buildTree() {
    const pts = []; pts.push({ x: 0, y: 0, parent: -1, leaf: false, depth: 0 }); const maxDepth = 5;
    (function grow(pi, x, y, ang, len, depth) {
      const nx = x + Math.cos(ang) * len, ny = y + Math.sin(ang) * len, i = pts.length;
      pts.push({ x: nx, y: ny, parent: pi, leaf: depth >= maxDepth, depth });
      if (depth >= maxDepth) return;
      const kids = depth === 0 ? 1 : 2, spread = depth === 0 ? 0 : rand(.5, .72);
      for (let k = 0; k < kids; k++) { const off = kids === 1 ? rand(-.08, .08) : (k ? spread : -spread) + rand(-.12, .12);
        grow(i, nx, ny, ang + off, len * (depth === 0 ? .82 : rand(.7, .82)), depth + 1); }
    })(0, 0, 0, -Math.PI / 2, 1, 0);
    normalize(pts); leaves = range(pts.length).filter((i) => pts[i].leaf);
    const order = [], q = [0], seen = new Set([0]);
    while (q.length) { const cur = q.shift(); for (let i = 0; i < pts.length; i++) if (pts[i].parent === cur && !seen.has(i)) { seen.add(i); order.push(i); q.push(i); } }
    return { nodes: pts, seq: order };
  }

  function computeFit() {
    const s = Math.min(W, H) * 0.9;
    fit = { ox: (W - s) / 2, oy: mode === "arbre" ? H * 0.97 - s : (H / 2 - s / 2), s };
  }
  function layout() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = cv.clientWidth || 300; H = cv.clientHeight || 300;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    computeFit();
    bgGrad = ctx.createRadialGradient(W / 2, H * .42, 0, W / 2, H * .42, Math.max(W, H) * .78);
    bgGrad.addColorStop(0, "#1d3328"); bgGrad.addColorStop(.5, "#16271f"); bgGrad.addColorStop(1, "#0b140f");
    dust = []; const n = Math.min(120, Math.round(W * H / 6000));
    for (let i = 0; i < n; i++) dust.push({ x: rand(0, W), y: rand(0, H), r: rand(.3, 1), a: rand(.05, .4), ph: rand(0, 6.28) });
  }
  const sx = (nd) => fit.ox + nd.nx * fit.s, sy = (nd) => fit.oy + nd.ny * fit.s;
  function pos(nd, t) {
    if (reduce) return { x: sx(nd), y: sy(nd) };
    const base = nd.leaf ? 1 : (0.3 + (nd.depth || 0) * 0.12), amp = (nd.amp || 3) * (nd.parent < 0 ? 1 : base);
    return { x: sx(nd) + Math.sin(t * 0.0006 * nd.sp + nd.ph) * amp, y: sy(nd) + Math.cos(t * 0.00052 * nd.sp + nd.ph * 1.3) * amp };
  }

  function build() {
    clearTimeout(loopTimer);
    const b = mode === "coeur" ? buildHeart() : mode === "initiales" ? buildInitials() : buildTree();
    nodes = b.nodes; seq = b.seq; seqPtr = 0;
    for (const nd of nodes) { nd.ph = rand(0, 6.28); nd.sp = rand(.5, 1.1); nd.amp = rand(2, 4.2); nd.lit = false; nd.rev = false; nd.born = 0; }
    if (mode !== "arbre") leaves = range(nodes.length).filter((i) => nodes[i].leaf);
    arrivals = []; blooms = []; ripples = []; lit = 0; completed = false; guestPtr = 0; lastYes = performance.now();
    cb.onCount(0); cb.onUnit(UNIT[mode]);
    if (reduce) while (nextYes(true)) { /* tout allumé d'emblée */ }
  }
  const totalLeaves = () => leaves.length;

  function nextYes(instant) {
    if (seqPtr >= seq.length) return false;
    let leaf = -1;
    while (seqPtr < seq.length) { const i = seq[seqPtr++]; if (nodes[i].leaf) { leaf = i; break; } nodes[i].rev = true; }
    if (leaf < 0) return false;
    const nd = nodes[leaf];
    if (instant) { nd.rev = true; ignite(leaf); return true; }
    if (mode === "arbre") { const p = nodes[nd.parent] || nd;
      arrivals.push({ i: leaf, kind: "branch", from: { x: sx(p), y: sy(p) }, born: performance.now(), dur: rand(520, 720), trail: [] }); }
    else { const cxs = fit.ox + fit.s / 2, cys = fit.oy + fit.s / 2, ang = Math.atan2(sy(nd) - cys, sx(nd) - cxs) + rand(-.7, .7), R = Math.hypot(W, H) * .6;
      arrivals.push({ i: leaf, kind: "star", from: { x: cxs + Math.cos(ang) * R, y: cys + Math.sin(ang) * R }, born: performance.now(), dur: rand(720, 950), trail: [] }); }
    return true;
  }
  function ignite(i) {
    const nd = nodes[i]; nd.lit = true; nd.rev = true; nd.born = performance.now(); nd.tw = rand(0, 6.28);
    blooms.push({ x: sx(nd), y: sy(nd), born: performance.now() });
    ripples.push({ x: sx(nd), y: sy(nd), born: performance.now() });
    lit++; cb.onCount(lit);
    const g = GUESTS[guestPtr++ % GUESTS.length];
    showToast(g + (/[💫💛🥂]/.test(g) ? "" : " a dit oui 💛"));
    if (lit >= totalLeaves() && !completed) { completed = true; loopTimer = setTimeout(build, 3800); }
  }
  function showToast(t) { cb.onToast(t); clearTimeout(toastTimer); toastTimer = setTimeout(() => cb.onToast(""), 1700); }

  function frame(time) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = bgGrad; ctx.fillRect(0, 0, W, H);

    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for (const d of dust) { const tw = reduce ? 1 : (0.6 + 0.4 * Math.sin(time * 0.001 + d.ph));
      ctx.globalAlpha = d.a * tw * 0.7; ctx.fillStyle = "#dfeee0"; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.2832); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.restore();

    if (!completed && time - lastYes > 560) { if (nextYes(reduce)) lastYes = time; }

    ctx.save(); ctx.globalCompositeOperation = "lighter";
    const boost = completed ? 1 : 0.5;
    if (mode === "arbre") {
      for (let i = 0; i < nodes.length; i++) { const nd = nodes[i]; if (!nd.rev || nd.parent < 0) continue;
        const a = pos(nd, time), b = pos(nodes[nd.parent], time);
        ctx.strokeStyle = nd.lit ? "rgba(231,199,138," + (0.5 * boost) + ")" : "rgba(127,154,120,0.2)";
        ctx.lineWidth = Math.max(0.6, (6 - nd.depth) * 0.6); ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    } else {
      const li = []; for (let i = 0; i < nodes.length; i++) if (nodes[i].lit) li.push(i);
      const cap = (mode === "initiales" ? 0.26 : 0.22) * fit.s, drawn = new Set();
      ctx.strokeStyle = "rgba(214,187,132," + (0.44 * boost) + ")"; ctx.lineWidth = completed ? 1.3 : 1; ctx.beginPath();
      for (const i of li) { const a = pos(nodes[i], time); const cc = [];
        for (const j of li) { if (j === i) continue; const b = pos(nodes[j], time); const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < cap) cc.push({ j, d, b }); }
        cc.sort((x, y) => x.d - y.d);
        for (let k = 0; k < Math.min(2, cc.length); k++) { const { j, b } = cc[k]; const key = i < j ? i + "-" + j : j + "-" + i;
          if (drawn.has(key)) continue; drawn.add(key); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); } }
      ctx.stroke();
    }

    const now = time;
    if (ripples.length) ripples = ripples.filter((r) => now - r.born < 2600);
    const pulseNode = (completed && !reduce && leaves.length) ? leaves[Math.floor((time * 0.004) % leaves.length)] : -1;
    for (let i = 0; i < nodes.length; i++) { const nd = nodes[i]; if (!nd.lit) continue;
      const p = pos(nd, time), age = Math.min(1, (time - nd.born) / 650);
      const tw = reduce ? 1 : (0.72 + 0.28 * Math.sin(time * 0.002 + (nd.tw || 0)));
      let echo = 0; for (const r of ripples) { const rad = (now - r.born) * 0.5, dd = Math.hypot(p.x - r.x, p.y - r.y), band = Math.abs(dd - rad);
        if (band < 40) echo = Math.max(echo, (1 - band / 40) * (1 - (now - r.born) / 2600)); }
      const pulse = (i === pulseNode) ? 1 : 0;
      const bright = Math.min(1, (0.6 * tw + 0.5 * echo + 0.7 * pulse) * age);
      const R = (fit.s * 0.02 + 2) * (1 + 0.7 * echo + 1.1 * pulse) * (0.6 + 0.4 * age);
      ctx.globalAlpha = bright; ctx.drawImage(glow, p.x - R * 2.6, p.y - R * 2.6, R * 5.2, R * 5.2);
      ctx.globalAlpha = 1; ctx.fillStyle = "rgba(255,250,235," + Math.min(1, bright + .15) + ")";
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1, R * 0.42), 0, 6.2832); ctx.fill(); }

    if (blooms.length) blooms = blooms.filter((b) => now - b.born < 760);
    for (const b of blooms) { const p = (now - b.born) / 760, r = ease(p) * fit.s * 0.13;
      ctx.strokeStyle = "rgba(255,240,207," + (0.5 * (1 - p)) + ")"; ctx.lineWidth = 2 * (1 - p) + .4;
      ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, 6.2832); ctx.stroke(); }

    if (arrivals.length) arrivals = arrivals.filter((s) => {
      const p = (time - s.born) / s.dur; if (p >= 1) { ignite(s.i); return false; }
      const e = ease(p), to = nodes[s.i], x = lerp(s.from.x, sx(to), e), y = lerp(s.from.y, sy(to), e);
      if (s.kind === "branch") {
        ctx.strokeStyle = "rgba(231,199,138,.85)"; ctx.lineWidth = 1.4; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.from.x, s.from.y); ctx.lineTo(x, y); ctx.stroke();
        ctx.globalAlpha = 1; ctx.drawImage(glow, x - 8, y - 8, 16, 16);
      } else {
        s.trail.push({ x, y }); if (s.trail.length > 14) s.trail.shift();
        for (let k = 0; k < s.trail.length; k++) { const tp = s.trail[k], a = k / s.trail.length;
          ctx.globalAlpha = a * 0.5 * (1 - p * 0.3); ctx.drawImage(glow, tp.x - (a * 3 + 1), tp.y - (a * 3 + 1), (a * 3 + 1) * 2, (a * 3 + 1) * 2); }
        ctx.globalAlpha = 1; ctx.drawImage(glow, x - 10, y - 10, 20, 20);
      }
      return true;
    });

    ctx.globalAlpha = 1; ctx.restore();
    raf = requestAnimationFrame(frame);
  }

  const onDown = () => { if (!completed && nextYes(reduce)) lastYes = performance.now(); };
  cv.addEventListener("pointerdown", onDown);
  const ro = ("ResizeObserver" in window) ? new ResizeObserver(() => { layout(); arrivals = []; blooms = []; ripples = []; }) : null;
  if (ro) ro.observe(cv); else window.addEventListener("resize", layout);

  layout(); build(); raf = requestAnimationFrame(frame);

  return {
    setMode(m) { if (m === mode) return; mode = m; computeFit(); build(); },
    destroy() {
      cancelAnimationFrame(raf); clearTimeout(loopTimer); clearTimeout(toastTimer);
      cv.removeEventListener("pointerdown", onDown);
      if (ro) ro.disconnect(); else window.removeEventListener("resize", layout);
    },
  };
}
