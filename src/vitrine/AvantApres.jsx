import { useEffect, useRef, useState } from "react";
import { I, Ornement } from "./shared.jsx";

/* ============================================================
   Comparateur interactif « carte papier figée » ↔ « faire-part vivant ».
   Glissez la poignée (ou touchez) pour révéler la transformation.
   Rendu SSR-safe : la poignée par défaut est à 52 % ; l'interactivité
   est ajoutée dans useEffect. Les deux panneaux sont du CSS pur (aucune
   photo) — le panneau « papier » est simplement désaturé et figé.
   ============================================================ */
export default function AvantApres() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(52);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let dragging = false;
    const setFromClientX = (clientX) => {
      const r = el.getBoundingClientRect();
      const p = ((clientX - r.left) / r.width) * 100;
      setPos(Math.max(6, Math.min(94, p)));
    };
    const down = (e) => { dragging = true; el.classList.add("dragging"); setFromClientX(e.clientX); e.preventDefault(); };
    const move = (e) => { if (dragging) setFromClientX(e.clientX); };
    const up = () => { dragging = false; el.classList.remove("dragging"); };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    // clavier (accessibilité) sur la poignée
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 4));
      else if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 4));
    };
    const handle = el.querySelector(".vt-aa-handle");
    handle && handle.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      handle && handle.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="vt-section vt-aa-sec" id="avant-apres">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">La différence, en un geste</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Une carte finit dans un tiroir. Un faire-part vivant, non.</h2>
          <p>Glissez la poignée pour comparer&nbsp;: à gauche, la carte papier — belle, mais figée. À droite, le faire-part vivant qui évolue jusqu'au grand jour et bien après.</p>
        </div>

        <div className="vt-aa reveal" ref={wrapRef} style={{ "--pos": `${pos}%` }}>
          {/* Panneau « faire-part vivant » (dessous, plein) */}
          <div className="vt-aa-panel vt-aa-after">
            <span className="vt-aa-live">● En direct</span>
            <div className="vt-aa-card">
              <span className="vt-aa-kicker">Nous nous marions</span>
              <div className="vt-aa-orn"><Ornement /></div>
              <h3 className="vt-aa-names">Émilie <span>&amp;</span> Julien</h3>
              <p className="vt-aa-date">24 août 2026 · Toulouse</p>
              <div className="vt-aa-count"><b>128</b> jours avant le oui</div>
              <span className="vt-aa-btn">Je confirme ma présence</span>
              <p className="vt-aa-foot">RSVP · album · plan GPS · surprises à venir</p>
            </div>
            <i className="vt-aa-spark s1" /><i className="vt-aa-spark s2" /><i className="vt-aa-spark s3" />
          </div>

          {/* Panneau « carte papier » (dessus, découpé à gauche) — MÊME carte,
              simplement désaturée et figée : le glissement révèle la même
              invitation, morte sur papier à gauche, vivante à droite. */}
          <div className="vt-aa-panel vt-aa-before">
            <span className="vt-aa-stamp">Reçu… puis oublié</span>
            <div className="vt-aa-card">
              <span className="vt-aa-kicker">Nous nous marions</span>
              <div className="vt-aa-orn"><Ornement /></div>
              <h3 className="vt-aa-names">Émilie <span>&amp;</span> Julien</h3>
              <p className="vt-aa-date">24 août 2026 · Toulouse</p>
              <div className="vt-aa-count"><b>128</b> jours avant le oui</div>
              <span className="vt-aa-btn">Je confirme ma présence</span>
              <p className="vt-aa-foot">RSVP · album · plan GPS · surprises à venir</p>
            </div>
          </div>

          {/* Poignée */}
          <div className="vt-aa-handle" role="slider" tabIndex={0} aria-label="Comparer carte papier et faire-part vivant" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}>
            <span className="vt-aa-grip">{I.sliders()}</span>
          </div>

          <span className="vt-aa-tag left">Carte papier</span>
          <span className="vt-aa-tag right">Faire-part vivant</span>
        </div>
      </div>
    </section>
  );
}
