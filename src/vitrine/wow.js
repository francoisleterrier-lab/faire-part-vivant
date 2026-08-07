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

  // 1c) Révélation du titre héros, mot à mot (le H1 reste intact dans le HTML : on
  //     enrichit côté client seulement, sans toucher au contenu vu par les robots)
  if (!reduce) {
    document.querySelectorAll(".vt-evt-hero h1").forEach((hEl) => {
      if (hEl.dataset.split) return; hEl.dataset.split = "1";
      const parts = hEl.textContent.split(/(\s+)/);
      hEl.textContent = ""; let wi = 0;
      parts.forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) { hEl.appendChild(document.createTextNode(part)); return; }
        const s = document.createElement("span");
        s.className = "vt-word"; s.textContent = part; s.style.setProperty("--wi", wi++);
        hEl.appendChild(s);
      });
    });
  }

  // 1d) Parallaxe légère sur l'aperçu du héros
  if (!reduce) {
    const media = document.querySelector(".vt-evt-hero-media, .vt-hero .vt-phone-wrap");
    if (media) {
      let pp = 0;
      const onScrollP = () => { if (pp) return; pp = raf(() => { media.style.transform = `translate3d(0, ${(window.scrollY * -0.05).toFixed(1)}px, 0)`; pp = 0; }); };
      window.addEventListener("scroll", onScrollP, { passive: true });
      onScrollP();
    }
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

  // 5) Curseur signature : anneau doré doux qui suit le pointeur (le curseur
  //    natif reste visible ; l'anneau grandit sur les éléments interactifs)
  const ring = document.createElement("div");
  ring.className = "vt-cursor"; ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring);
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2, rx = cx, ry = cy, shown = false;
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    cx = e.clientX; cy = e.clientY;
    if (!shown) { shown = true; ring.classList.add("on"); }
  }, { passive: true });
  window.addEventListener("pointerdown", () => ring.classList.add("down"));
  window.addEventListener("pointerup", () => ring.classList.remove("down"));
  const HOT = "a, button, .vt-btn, summary, input, textarea, [role='button']";
  document.addEventListener("pointerover", (e) => { if (e.target.closest && e.target.closest(HOT)) ring.classList.add("hot"); });
  document.addEventListener("pointerout", (e) => { if (e.target.closest && e.target.closest(HOT)) ring.classList.remove("hot"); });
  const spin = () => {
    rx += (cx - rx) * 0.2; ry += (cy - ry) * 0.2;
    ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(spin);
  };
  requestAnimationFrame(spin);
}
