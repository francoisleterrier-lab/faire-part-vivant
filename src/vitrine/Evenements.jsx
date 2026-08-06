import { I } from "./shared.jsx";
import { HUB } from "./evenements.js";

/* ============================================================
   Hub multi-événement — sélecteur d'occasions sur l'accueil.
   Chaque carte « live » renvoie vers sa page dédiée ; les autres
   sont marquées « Bientôt ».
   ============================================================ */

export default function Evenements() {
  if (!HUB || !HUB.cartes || HUB.cartes.length === 0) return null;
  return (
    <section className="vt-section" id="evenements">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">{HUB.eyebrow}</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">{HUB.titre}</h2>
          {HUB.lede && <p>{HUB.lede}</p>}
        </div>
        <div className="vt-evt-grid">
          {HUB.cartes.map((c) => {
            const live = c.statut === "live";
            return live ? (
              <a key={c.event} className="vt-evt-card reveal" href={c.href}>
                <span className="vt-evt-badge">Disponible</span>
                <h3>{c.titre}</h3>
                <p>{c.teaser}</p>
                <span className="vt-evt-go">Découvrir {I.arrow()}</span>
              </a>
            ) : (
              <div key={c.event} className="vt-evt-card bientot reveal" aria-disabled="true">
                <span className="vt-evt-badge">Bientôt</span>
                <h3>{c.titre}</h3>
                <p>{c.teaser}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
