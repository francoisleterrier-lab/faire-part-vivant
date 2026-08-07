import { I, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";
import { EVENEMENTS } from "./evenements.js";
import { LOCAL_EVENEMENTS } from "./localEvenements.js";
import { EventDevice, EVENT_PHOTOS } from "./eventDevice.jsx";

/* ============================================================
   Page locale « événement × ville » (longue traîne).
   Réutilise l'aperçu animé, Nav / Packs / Contact / Footer : aucun
   moteur ni style dupliqué. Le contenu local vient de
   localEvenements.js (réellement différencié, white-hat). Renvoie
   toujours vers la page événement générale pour le détail produit.
   Sûr côté SSR (pré-rendu) : aucun accès navigateur au rendu.
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

export default function LocalEvenement({ localKey }) {
  useReveal();
  useStoredAccent();
  const L = LOCAL_EVENEMENTS[localKey];
  if (!L) return null;
  const e = EVENEMENTS[L.event];
  const eventHref = e ? `${e.slug}.html` : "index.html";
  const eventNom = (e && e.serviceName) ? e.serviceName.toLowerCase() : "faire-part";

  return (
    <>
      <Nav links={NAV} />
      <main>
        {/* Héros à deux colonnes : discours local + aperçu animé */}
        <section className="vt-fhero vt-evt-hero" id="top">
          <div className="vt-wrap vt-evt-hero-in">
            <div className="vt-evt-hero-copy reveal">
              <span className="vt-eyebrow">{L.eyebrow}</span>
              <div className="vt-flourish" />
              <h1 className="vt-display" style={{ textTransform: "uppercase" }}>{L.h1}</h1>
              <p className="vt-lead intro">{L.heroLede}</p>
              <div className="vt-evt-hero-cta">
                <a className="vt-btn gold lg" href={DEMO}>{L.ctaLabel} {I.arrow()}</a>
                <a className="vt-btn ghost" href={eventHref}>Voir le {eventNom}</a>
              </div>
              <ul className="vt-evt-chips">
                <li>{I.check()}<span>Créé près de Toulouse</span></li>
                <li>{I.check()}<span>Sans abonnement</span></li>
                <li>{I.check()}<span>Sur-mesure & accompagné</span></li>
              </ul>
            </div>
            <div className="vt-evt-hero-media reveal">
              <EventDevice card={e && e.heroCard} photo={EVENT_PHOTOS[L.event]} />
            </div>
          </div>
        </section>

        {/* Pourquoi local : 3 raisons réellement différenciées */}
        <section className="vt-section" id="local">
          <div className="vt-wrap">
            <div className="vt-head reveal">
              <span className="vt-eyebrow">Un faire-part à votre ville</span>
              <div className="vt-flourish" />
              <h2 className="vt-h2">Pourquoi ce faire-part à {L.ville}&nbsp;?</h2>
              <p>Trois raisons concrètes, pensées pour les familles de {L.ville} et de la Haute-Garonne.</p>
            </div>
            <div className="vt-feats">
              {L.points.map((p) => (
                <article className="vt-feat reveal" key={p.t}>
                  <div className="ic">{I.compass()}</div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              ))}
            </div>
            <div className="reveal" style={{ maxWidth: "760px", margin: "2.4rem auto 0", textAlign: "center" }}>
              <p style={{ color: "var(--ink-soft)" }}>{L.prose}</p>
              <p style={{ marginTop: "1rem" }}>
                <a className="vt-btn ghost" href={eventHref}>Tout voir sur la page {eventNom} {I.arrow()}</a>
              </p>
            </div>
            <div className="reveal" style={{ maxWidth: "760px", margin: "1.8rem auto 0", textAlign: "center" }}>
              <p style={{ color: "var(--ink-soft)" }}>
                J'accompagne les familles de {L.ville} et des communes voisines —{" "}
                {L.zones.join(", ")} — ainsi que dans toute la Haute-Garonne et le Sud-Toulousain,
                et partout en France à distance. Vous préparez un mariage&nbsp;?{" "}
                <a href={L.crossVille.href}>Voir la page {L.crossVille.label}</a>.
              </p>
            </div>
          </div>
        </section>

        <Packs />

        {/* FAQ locale en accordéon natif (<details>) : accessible, lisible sans JS */}
        {L.faq && L.faq.length > 0 && (
          <section className="vt-section" id="faq">
            <div className="vt-wrap" style={{ maxWidth: "780px" }}>
              <div className="vt-head reveal">
                <span className="vt-eyebrow">Bon à savoir</span>
                <div className="vt-flourish" />
                <h2 className="vt-h2">Questions fréquentes à {L.ville}</h2>
              </div>
              <div className="vt-acc reveal">
                {L.faq.map((f, i) => (
                  <details className="vt-acc-item" key={i} open={i === 0}>
                    <summary className="vt-acc-q"><span>{f.q}</span><span className="vt-acc-ic">{I.plus()}</span></summary>
                    <div className="vt-acc-a"><p>{f.r}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </>
  );
}
