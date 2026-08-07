/* ============================================================
   Effets « wow » — enrichissement progressif, sans dépendance.
   - Compteurs animés (mockup événement)
   - Tilt 3D + reflet sur les cartes
   - Boutons dorés magnétiques
   - Spotlight héros (halo qui suit le curseur)
   Tout est neutralisé si prefers-reduced-motion ; tilt / magnétisme /
   spotlight uniquement sur pointeur fin (souris). Idempotent : une seule
   initialisation par document. Rien ne s'exécute côté serveur (SSR).
   ============================================================ */
export function initWow() {
  if (typeof window === "undefined" || window.__wowInit) return;
  window.__wowInit = true;
  const mq = (q) => { try { return window.matchMedia(q).matches; } catch { return false; } };
  const reduce = mq("(prefers-reduced-motion: reduce)");
  const fine = mq("(hover: hover) and (pointer: fine)");
  const raf = (fn) => requestAnimationFrame(fn);

  // 1) Compteurs animés (les cellules du mockup : 128 jours, 06 h, 42 min)
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, raw = el.textContent.trim();
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;
      const pad = raw.length, t0 = performance.now(), dur = 1100;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round((1 - Math.pow(1 - k, 3)) * target)).padStart(pad, "0");
        if (k < 1) raf(step); else el.textContent = raw;
      };
      el.textContent = "0".padStart(pad, "0");
      raf(step);
    }), { threshold: 0.6 });
    document.querySelectorAll(".vt-evd-cell b").forEach((n) => io.observe(n));
  }

  if (reduce || !fine) return;

  // 2) Tilt 3D + reflet sur les cartes
  document.querySelectorAll(".vt-evt-card, .vt-evt-card2, .vt-tl-card, .vt-avis, .vt-post, .vt-uni-feat").forEach((c) => {
    c.classList.add("vt-tilt");
    let pending = 0;
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      if (pending) return;
      pending = raf(() => {
        c.style.transform = `perspective(820px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
        c.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        c.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
        pending = 0;
      });
    });
    c.addEventListener("pointerleave", () => { if (pending) { cancelAnimationFrame(pending); pending = 0; } c.style.transform = ""; });
  });

  // 3) Boutons dorés magnétiques (le sheen existe déjà via .vt-btn.gold::after)
  document.querySelectorAll(".vt-btn.gold").forEach((b) => {
    let pending = 0;
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      if (pending) return;
      pending = raf(() => { b.style.transform = `translate(${(x * 0.16).toFixed(1)}px, ${(y * 0.32 - 2).toFixed(1)}px)`; pending = 0; });
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });

  // 4) Spotlight héros : halo doré qui suit le curseur
  document.querySelectorAll(".vt-hero, .vt-fhero").forEach((hero) => {
    hero.classList.add("vt-spot");
    let pending = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      if (pending) return;
      pending = raf(() => {
        hero.style.setProperty("--sx", `${(e.clientX - r.left).toFixed(0)}px`);
        hero.style.setProperty("--sy", `${(e.clientY - r.top).toFixed(0)}px`);
        hero.style.setProperty("--so", "1");
        pending = 0;
      });
    });
    hero.addEventListener("pointerleave", () => hero.style.setProperty("--so", "0"));
  });
}
