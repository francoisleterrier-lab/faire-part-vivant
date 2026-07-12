import { useState, useEffect, useRef } from "react";
import ambianceVid from "../assets/ambiance-vegetal.mp4";

/* ============================================================
   Faire-part Vivant — Vitrine (direction « eucalyptus »)
   « Oubliez le carton. Offrez une expérience. »
   Marque : Faire-part Vivant, par François Leterrier.
   ============================================================ */

const EDITEUR = "product.html";

/* ---------- Icônes ---------- */
const I = {
  bell: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  x: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>),
  rsvp: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="m9 15 1.6 1.6L14 13"/></svg>),
  camera: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.2"/></svg>),
  gift: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4h4Zm0 0s1.5-4 4-4a2 2 0 0 1 0 4h-4Z"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.5"/></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>),
  lock: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  burger: (p) => (<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  heart: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}><path d="M12 21s-7.2-4.35-9.6-8.4C.9 9.9 2 6.5 5 6c2-.3 3.4.9 4 2 .6-1.1 2-2.3 4-2 3 .5 4.1 3.9 2.6 6.6C19.2 16.65 12 21 12 21Z"/></svg>),
  palette: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
};

/* Brin d'eucalyptus (SVG) */
function Sprig({ className = "", stems = 7 }) {
  const leaves = [];
  for (let i = 1; i <= stems; i++) {
    const y = 90 - i * 11;
    const s = 0.7 + (i / stems) * 0.6;
    leaves.push(<ellipse key={"l" + i} cx={50 - 15 * s} cy={y} rx={11 * s} ry={6.5 * s} fill="currentColor" opacity="0.85" transform={`rotate(-32 ${50 - 15 * s} ${y})`} />);
    leaves.push(<ellipse key={"r" + i} cx={50 + 15 * s} cy={y - 5} rx={11 * s} ry={6.5 * s} fill="currentColor" opacity="0.7" transform={`rotate(32 ${50 + 15 * s} ${y - 5})`} />);
  }
  return (
    <svg className={"vt-sprig " + className} viewBox="0 0 100 100" width="100" aria-hidden="true">
      <path d="M50 96 C50 70 50 45 50 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      {leaves}
      <circle cx="50" cy="8" r="3.2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* Petit brin horizontal (dans l'invitation) */
const LeafRow = (p) => (
  <svg viewBox="0 0 120 20" width="90" fill="none" {...p}>
    <path d="M60 10 H16" stroke="currentColor" strokeWidth="1" opacity=".6" />
    <path d="M60 10 H104" stroke="currentColor" strokeWidth="1" opacity=".6" />
    {[24, 34, 44].map((x, i) => (<g key={i}><ellipse cx={x} cy={10 - 4} rx="5" ry="2.6" fill="currentColor" opacity=".8" transform={`rotate(-28 ${x} 6)`} /><ellipse cx={x + 4} cy={10 + 4} rx="5" ry="2.6" fill="currentColor" opacity=".65" transform={`rotate(28 ${x + 4} 14)`} /></g>))}
    {[96, 86, 76].map((x, i) => (<g key={i}><ellipse cx={x} cy={10 - 4} rx="5" ry="2.6" fill="currentColor" opacity=".8" transform={`rotate(28 ${x} 6)`} /><ellipse cx={x - 4} cy={10 + 4} rx="5" ry="2.6" fill="currentColor" opacity=".65" transform={`rotate(-28 ${x - 4} 14)`} /></g>))}
    <circle cx="60" cy="10" r="2.4" fill="currentColor" opacity=".7" />
  </svg>
);

const Ornement = (p) => (
  <svg viewBox="0 0 120 14" width="86" fill="currentColor" {...p}>
    <path d="M60 2c-3 3-3 7 0 10 3-3 3-7 0-10Z" opacity=".9" />
    <path d="M60 7H8M60 7h52" stroke="currentColor" strokeWidth="1" opacity=".7" />
    <circle cx="6" cy="7" r="1.6" /><circle cx="114" cy="7" r="1.6" />
  </svg>
);

/* Couleurs d'accent (démo « couleur au choix ») */
const ACCENTS = [
  { id: "sauge", c: "#6f8a6b" }, { id: "or", c: "#b3924f" }, { id: "terracotta", c: "#c07a54" },
  { id: "ardoise", c: "#6f8aa0" }, { id: "rose", c: "#c78ba1" }, { id: "prune", c: "#8a6b86" },
];

/* Révélation au défilement */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["#fonctionnalites", "Fonctionnalités"], ["#couleurs", "Couleurs"], ["#tarifs", "Tarifs"], ["#faq", "FAQ"]];
  return (
    <header className={"vt-nav" + (scrolled ? " scrolled" : "")}>
      <div className="vt-wrap vt-nav-in">
        <a href="#top" className="vt-logo"><span className="nm">Faire-part Vivant</span><span className="by">par François Leterrier</span></a>
        <nav className="vt-nav-links">{links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <div className="vt-nav-cta">
          <a className="vt-btn gold" href={EDITEUR}>Créer mon faire-part</a>
          <button className="vt-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{I.burger()}</button>
        </div>
      </div>
      {open && (
        <div className="vt-mobile vt-wrap">
          {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a className="vt-btn gold" href={EDITEUR}>Créer mon faire-part</a>
        </div>
      )}
    </header>
  );
}

/* ---------- Aperçu téléphone ---------- */
function PhoneMock() {
  const [accent, setAccent] = useState(ACCENTS[0].c);
  return (
    <div className="vt-phone-wrap">
      <div className="vt-phone reveal">
        <div className="vt-screen" style={{ "--sc-accent": accent }}>
          <div className="sc-top"><span className="cpl">Émilie &amp; Julien</span><span className="bg"><i /><i /><i /></span></div>
          <span className="sc-live">En direct</span>
          <div className="sc-media">
            <video src={ambianceVid} autoPlay muted loop playsInline preload="metadata" />
          </div>
          <div className="sc-body">
            <p className="sc-eyebrow">Nous nous marions</p>
            <div className="sc-orn"><Ornement /></div>
            <h3 className="sc-couple">Émilie<span className="a">&amp;</span>Julien</h3>
            <p className="sc-date">24 août 2026 · Toulouse</p>
            <div className="sc-leaf"><LeafRow /></div>
            <span className="sc-btn">Je confirme ma présence</span>
            <div className="sc-heart">{I.heart()}</div>
          </div>
        </div>
      </div>
      <div className="vt-swatches reveal">
        <span className="lbl">Votre couleur :</span>
        {ACCENTS.map((a) => (
          <button key={a.id} className={"vt-swatch" + (accent === a.c ? " on" : "")} style={{ background: a.c }} aria-label={a.id} onClick={() => setAccent(a.c)} />
        ))}
        <span className="vt-swatch any" title="…et toutes les autres">{I.palette()}</span>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="vt-hero" id="top">
      <Sprig className="h-tl vt-sway" />
      <Sprig className="h-br vt-sway" />
      <div className="vt-wrap vt-hero-grid">
        <div className="vt-hero-copy">
          <span className="vt-eyebrow">Sites de mariage sur-mesure · Sud-Toulousain</span>
          <div className="vt-flourish" />
          <h1 className="vt-display">Oubliez le carton.<br />Offrez une <span className="vt-amp">expérience</span>.</h1>
          <p className="vt-lead">
            Un faire-part de mariage numérique, élégant et vivant : il s'installe comme une appli,
            notifie vos invités, recueille les réponses et rassemble leurs photos — à votre image,
            dans la couleur exacte de votre mariage.
          </p>
          <div className="vt-hero-actions">
            <a className="vt-btn gold lg" href={EDITEUR}>Créer mon faire-part {I.arrow()}</a>
            <a className="vt-btn ghost lg" href="#demo">Voir une démo</a>
          </div>
          <p className="vt-hero-note">{I.lock()} Paiement unique · invités illimités · essai gratuit de l'éditeur</p>
        </div>
        <div className="vt-hero-media" id="demo"><PhoneMock /></div>
      </div>
    </section>
  );
}

function Trust() {
  const stats = [["+120", "faire-part créés"], ["100 %", "à votre couleur"], ["98 %", "de RSVP reçus"], ["4,9/5", "satisfaction"]];
  return (
    <div className="vt-trust">
      <div className="vt-wrap vt-trust-in reveal">
        {stats.map(([n, l]) => <div className="vt-stat" key={l}><div className="n">{n}</div><div className="l">{l}</div></div>)}
      </div>
    </div>
  );
}

function Compare() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Pourquoi le numérique</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Le carton n'a jamais rappelé personne.</h2>
          <p>Le papier est figé, coûteux et sans retour. Un Faire-part Vivant accompagne vos invités jusqu'au grand jour.</p>
        </div>
        <div className="vt-compare reveal">
          <div className="card old">
            <h3>Le faire-part papier</h3>
            <ul>
              <li>{I.x()} Impression &amp; envois postaux coûteux</li>
              <li>{I.x()} Aucune confirmation automatique</li>
              <li>{I.x()} Relances à la main, adresses perdues</li>
              <li>{I.x()} Figé le jour de l'impression</li>
              <li>{I.x()} Les photos des invités se perdent</li>
            </ul>
          </div>
          <div className="card new">
            <h3>Le Faire-part Vivant</h3>
            <ul>
              <li>{I.check()} Un lien à partager, zéro impression</li>
              <li>{I.check()} RSVP recueillis et comptés en direct</li>
              <li>{I.check()} Notifications push vers vos invités</li>
              <li>{I.check()} Se met à jour à tout moment</li>
              <li>{I.check()} Album photo commun, en temps réel</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { ic: "bell", t: "Notifications push", d: "Prévenez tous vos invités d'un changement d'horaire, d'un mot doux ou du décompte final — directement sur leur écran." },
  { ic: "rsvp", t: "RSVP en direct", d: "Chaque invité confirme sa présence en un geste. Vous suivez les réponses et le nombre de couverts en temps réel." },
  { ic: "camera", t: "Album des invités", d: "Un mur photo commun : vos proches capturent l'instant en direct, la galerie se remplit toute seule." },
  { ic: "gift", t: "Cagnotte & liste", d: "Une cagnotte commune ou une liste de cadeaux à réserver, intégrée avec élégance à votre invitation." },
  { ic: "spark", t: "Éléments vivants", d: "Un arbre de vie qui s'illumine à chaque « oui », une constellation d'invités… des touches qui émeuvent." },
  { ic: "phone", t: "Installable comme une appli", d: "Vos invités ajoutent le faire-part à leur écran d'accueil : plein écran, même hors connexion." },
];
function Features() {
  return (
    <section className="vt-section tint" id="fonctionnalites">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Tout ce qu'il sait faire</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Une invitation, mille attentions.</h2>
          <p>Chaque détail rapproche vos invités de votre grand jour.</p>
        </div>
        <div className="vt-feats">
          {FEATURES.map((f) => (
            <article className="vt-feat reveal" key={f.t}>
              <div className="ic">{I[f.ic]()}</div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { t: "Créez votre espace", d: "Inscrivez-vous en 30 secondes et ouvrez votre éditeur personnel, sans installation." },
    { t: "Personnalisez", d: "Vos prénoms, la date, votre couleur exacte, vos sections… Activez l'album, la cagnotte ou l'arbre de vie." },
    { t: "Partagez le lien", d: "Diffusez par WhatsApp, SMS ou e-mail. Les réponses arrivent, la magie opère." },
  ];
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Simple, vraiment</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Prêt à partager en trois étapes.</h2>
        </div>
        <div className="vt-steps">
          {steps.map((s) => (
            <div className="vt-step reveal" key={s.t}><div className="num" /><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Couleurs sans limite */
const PALETTE = ["#6f8a6b", "#b3924f", "#c07a54", "#6f8aa0", "#c78ba1", "#8a6b86", "#9c5a44", "#3f4e3a", "#d0a85a"];
function Colors() {
  return (
    <section className="vt-section tint" id="couleurs">
      <div className="vt-wrap vt-colors">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Aucune limite</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">La couleur exacte de votre mariage.</h2>
          <p>Pas trois thèmes imposés : vous choisissez précisément votre teinte, et tout le faire-part s'harmonise autour d'elle.</p>
        </div>
        <div className="vt-color-strip reveal">
          {PALETTE.map((c) => <span className="c" key={c} style={{ background: c }} />)}
        </div>
        <p className="vt-color-note reveal">…et toutes les autres. Un dégradé élégant se compose automatiquement autour de votre couleur.</p>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-split reveal">
          <div>
            <span className="vt-eyebrow">L'album vivant</span>
            <h3 style={{ marginTop: ".6rem" }}>Tous les souvenirs, au même endroit.</h3>
            <p>Fini les photos éparpillées sur dix téléphones. Vos invités capturent l'instant depuis le faire-part, et le mur commun se remplit en temps réel.</p>
            <ul>
              <li>{I.check()} Appareil photo &amp; vidéo intégrés</li>
              <li>{I.check()} Galerie live, visible par tous</li>
              <li>{I.check()} Aucune application à installer pour eux</li>
            </ul>
          </div>
          <div className="vt-split-media">
            <div className="vt-album-mock">
              {["#7c9a76", "#b79b63", "#a9c0a2", "#c9a56f", "#8fae88", "#d8c48f", "#6f8a6b", "#c8ba72", "#9db894"].map((c, i) => (
                <i key={i} style={{ background: `linear-gradient(150deg, ${c}, rgba(63,78,58,.25))` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="vt-split rev reveal">
          <div>
            <span className="vt-eyebrow">La cagnotte</span>
            <h3 style={{ marginTop: ".6rem" }}>Votre projet de vie, financé avec le sourire.</h3>
            <p>Voyage de noces, futur nid, liste de cadeaux à réserver… Proposez une cagnotte commune, suivez la progression, remerciez chaque participant.</p>
            <ul>
              <li>{I.check()} Jauge de progression en direct</li>
              <li>{I.check()} Mots doux des contributeurs</li>
              <li>{I.check()} Ou une liste de cadeaux « à réserver »</li>
            </ul>
          </div>
          <div className="vt-split-media">
            <div className="vt-cag-mock">
              <div className="amt">3 240 €</div>
              <div className="bar"><span /></div>
              <div className="sub">72 % de notre voyage de noces · 18 participants 🤍</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  { name: "Essentiel", tag: "L'invitation vivante, installable", price: 149, once: "Paiement unique · à vie",
    feats: ["1 faire-part personnalisé", "Votre couleur au choix", "Compte à rebours", "RSVP en ligne illimités", "Partage WhatsApp / SMS / e-mail"] },
  { name: "Vivant", tag: "Le préféré des futurs mariés", price: 249, once: "Paiement unique · à vie", featured: true,
    feats: ["Tout l'Essentiel, plus :", "Notifications push aux invités", "Album photo & vidéo des invités", "Éléments interactifs (arbre, constellation)", "Faire-part installable (appli)"] },
  { name: "Signature", tag: "L'expérience complète", price: 449, once: "Paiement unique · à vie",
    feats: ["Tout le Vivant, plus :", "Cagnotte & liste de cadeaux", "Pages personnalisées par invité", "Plan de table & « ma table »", "Accompagnement & support prioritaire"] },
];
function Pricing() {
  return (
    <section className="vt-section tint" id="tarifs">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Des tarifs clairs</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Un prix, une fois. Pas d'abonnement.</h2>
          <p>Payez une seule fois : votre faire-part reste en ligne jusqu'à votre mariage et au-delà.</p>
        </div>
        <div className="vt-plans">
          {PLANS.map((p) => (
            <div className={"vt-plan reveal" + (p.featured ? " feat" : "")} key={p.name}>
              {p.featured && <span className="badge">Le plus choisi</span>}
              <div className="vt-plan-name">{p.name}</div>
              <div className="vt-plan-tag">{p.tag}</div>
              <div className="vt-price"><span className="cur">{p.price} €</span></div>
              <div className="vt-plan-once">{p.once}</div>
              <ul>{p.feats.map((f) => <li key={f}>{I.check()}<span>{f}</span></li>)}</ul>
              <a className={"vt-btn " + (p.featured ? "gold" : "ghost")} href={EDITEUR}>Choisir {p.name}</a>
            </div>
          ))}
        </div>
        <div className="vt-bespoke reveal">
          <div className="vt-bespoke-copy">
            <span className="vt-eyebrow on-dark">Sur-mesure · clé en main</span>
            <h3>Envie qu'on s'occupe de tout ?</h3>
            <p>François conçoit et configure votre Faire-part Vivant de A à Z — couleur et thème sur-mesure, mise en scène de vos éléments interactifs, accompagnement dédié jusqu'au grand jour.</p>
          </div>
          <div className="vt-bespoke-cta">
            <div className="vt-bespoke-price">Sur devis</div>
            <a className="vt-btn gold lg" href="mailto:francois.leterrier@gmail.com?subject=Demande%20sur-mesure%20—%20Faire-part%20Vivant">Demander un devis {I.arrow()}</a>
          </div>
        </div>
        <p className="vt-plans-note">Paiement unique, sans abonnement, invités illimités. L'éditeur est gratuit à l'essai : vous ne payez qu'au moment de publier.</p>
      </div>
    </section>
  );
}

const QUOTES = [
  { q: "Nos invités nous ont dit que c'était le plus beau faire-part qu'ils aient jamais reçu. Et il était pile dans notre vert eucalyptus.", n: "Léa & Thomas", m: "Mariés en juin 2025", av: "L" },
  { q: "Fini les relances par téléphone : les RSVP arrivaient tout seuls. Le mur photo après la fête valait de l'or.", n: "Sarah & Malik", m: "Mariés en septembre 2025", av: "S" },
  { q: "Monté en une soirée, partagé sur WhatsApp le lendemain. Élégant, vivant, tellement plus qu'un carton.", n: "Clara & Antoine", m: "Mariés en mai 2026", av: "C" },
];
function Quotes() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Ils ont dit oui</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Des mariés conquis.</h2>
        </div>
        <div className="vt-quotes">
          {QUOTES.map((c) => (
            <figure className="vt-quote reveal" key={c.n}>
              <div className="stars">★★★★★</div>
              <blockquote><p>« {c.q} »</p></blockquote>
              <figcaption className="who"><span className="av">{c.av}</span><span><span className="nm">{c.n}</span><br /><span className="mt">{c.m}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  ["Ai-je besoin de compétences techniques ?", "Aucune. Vous vous connectez, vous remplissez vos informations, vous choisissez votre couleur et vous publiez. Tout se fait depuis votre navigateur, sur ordinateur ou mobile."],
  ["Puis-je vraiment choisir n'importe quelle couleur ?", "Oui. Vous indiquez la teinte exacte de votre mariage, et l'ensemble du faire-part (fonds, accents, boutons) s'harmonise automatiquement autour d'elle."],
  ["Mes invités doivent-ils installer une application ?", "Non. Ils ouvrent simplement le lien que vous partagez. S'ils le souhaitent, ils peuvent « ajouter à l'écran d'accueil » pour un accès en un geste."],
  ["Mes données et celles de mes invités sont-elles protégées ?", "Oui. Votre faire-part n'est jamais indexé par les moteurs de recherche et l'accès aux données est protégé. Vous restez seul propriétaire de vos contenus."],
  ["Puis-je modifier mon faire-part après l'avoir partagé ?", "Bien sûr, à tout moment — horaires, textes, sections, couleur — et vos invités voient la nouvelle version instantanément."],
  ["Combien de temps mon faire-part reste-t-il en ligne ?", "Jusqu'à votre mariage et bien au-delà, pour conserver l'album souvenir. Le paiement est unique, sans abonnement."],
];
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="vt-section tint" id="faq">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Vous vous demandez…</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Questions fréquentes.</h2>
        </div>
        <div className="vt-faq reveal">
          {FAQS.map(([q, a], i) => (
            <div className={"vt-faq-item" + (open === i ? " open" : "")} key={q}>
              <button className="vt-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="chev">{I.plus()}</span></button>
              <div className="vt-faq-a"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="vt-cta">
      <Sprig className="c-l" /><Sprig className="c-r" />
      <div className="vt-wrap reveal">
        <span className="vt-eyebrow on-dark">Votre grand jour mérite mieux qu'un carton</span>
        <h2 style={{ marginTop: "1rem" }}>Offrez une expérience.</h2>
        <p>Commencez gratuitement dans l'éditeur. Vous ne payez qu'au moment de publier.</p>
        <div className="vt-cta-actions">
          <a className="vt-btn gold lg" href={EDITEUR}>Créer mon faire-part {I.arrow()}</a>
          <a className="vt-btn on-dark lg" href="#tarifs">Voir les tarifs</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="vt-footer">
      <div className="vt-wrap vt-footer-in">
        <div>
          <span className="vt-logo"><span className="nm">Faire-part Vivant</span><span className="by">par François Leterrier</span></span>
          <p className="tag">L'invitation de mariage numérique qui vit, notifie et rassemble vos proches. Sites de mariage sur-mesure · Sud-Toulousain.</p>
        </div>
        <nav>
          <div>
            <h4>Produit</h4>
            <a href="#fonctionnalites">Fonctionnalités</a>
            <a href="#couleurs">Couleurs</a>
            <a href="#tarifs">Tarifs</a>
            <a href={EDITEUR}>Créer mon faire-part</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="#faq">FAQ</a>
            <a href="mailto:francois.leterrier@gmail.com">Nous écrire</a>
          </div>
        </nav>
      </div>
      <div className="vt-wrap vt-footer-bottom">
        <span>© {"2026"} Faire-part Vivant · François Leterrier — Fait avec 🤍</span>
        <span>Mentions légales · Confidentialité</span>
      </div>
    </footer>
  );
}

export default function Vitrine() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Compare />
        <Features />
        <Steps />
        <Colors />
        <Highlights />
        <Pricing />
        <Quotes />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
