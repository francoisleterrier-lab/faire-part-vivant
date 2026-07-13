import { useState, useEffect, useRef } from "react";
import { MARQUE, SIGNATURE, REGION, EMAIL, PACKS, WEB3FORMS_KEY, SITE_PRINCIPAL, OFFRE_URL, TEL, TEL_INTL } from "./data.js";

/* ============================================================
   UI partagée entre la home et la page Fonctionnalités.
   ============================================================ */

export const DEMO = "#contact"; // CTA « Demander une démo » → section contact

/* ---------- Icônes (SVG trait fin) ---------- */
export const I = {
  phone: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>),
  rsvp: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="m9 15 1.6 1.6L14 13"/></svg>),
  camera: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.2"/></svg>),
  car: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13m-14 0h14m-14 0v4m14-4v4M7 17h.01M17 17h.01M4 17h16"/></svg>),
  gift: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4h4Zm0 0s1.5-4 4-4a2 2 0 0 1 0 4h-4Z"/></svg>),
  sliders: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>),
  compass: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.5"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  burger: (p) => (<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  heart: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}><path d="M12 21s-7.2-4.35-9.6-8.4C.9 9.9 2 6.5 5 6c2-.3 3.4.9 4 2 .6-1.1 2-2.3 4-2 3 .5 4.1 3.9 2.6 6.6C19.2 16.65 12 21 12 21Z"/></svg>),
};

/* ---------- Décor botanique ---------- */
export function Sprig({ className = "", stems = 7 }) {
  const leaves = [];
  for (let i = 1; i <= stems; i++) {
    const y = 90 - i * 11, s = 0.7 + (i / stems) * 0.6;
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

export const Ornement = (p) => (
  <svg viewBox="0 0 120 14" width="86" fill="currentColor" {...p}>
    <path d="M60 2c-3 3-3 7 0 10 3-3 3-7 0-10Z" opacity=".9" />
    <path d="M60 7H8M60 7h52" stroke="currentColor" strokeWidth="1" opacity=".7" />
    <circle cx="6" cy="7" r="1.6" /><circle cx="114" cy="7" r="1.6" />
  </svg>
);

/* ---------- Révélation au défilement ---------- */
export function useReveal() {
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
export function Nav({ links }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"vt-nav" + (scrolled ? " scrolled" : "")}>
      <div className="vt-wrap vt-nav-in">
        <div className="vt-logo"><a href="index.html" className="nm">{MARQUE}</a><a href={SITE_PRINCIPAL} className="by">{SIGNATURE}</a></div>
        <nav className="vt-nav-links">{links.map(([h, t]) => <a key={h + t} href={h}>{t}</a>)}</nav>
        <div className="vt-nav-cta">
          <a className="vt-btn gold" href={DEMO}>Demander une démo</a>
          <button className="vt-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{I.burger()}</button>
        </div>
      </div>
      {open && (
        <div className="vt-mobile vt-wrap">
          {links.map(([h, t]) => <a key={h + t} href={h} onClick={() => setOpen(false)}>{t}</a>)}
          <a className="vt-btn gold" href={DEMO} onClick={() => setOpen(false)}>Demander une démo</a>
        </div>
      )}
    </header>
  );
}

/* ---------- « Une lumière par invité » (différenciant) ---------- */
const LUMS = [
  { x: 50, y: 20 }, { x: 38, y: 30 }, { x: 62, y: 30 }, { x: 30, y: 44 }, { x: 46, y: 40 },
  { x: 56, y: 46 }, { x: 70, y: 44 }, { x: 24, y: 58 }, { x: 40, y: 56 }, { x: 52, y: 62 },
  { x: 64, y: 58 }, { x: 76, y: 58 }, { x: 34, y: 70 }, { x: 60, y: 74 }, { x: 46, y: 78 },
];
export function Lumiere() {
  return (
    <section className="vt-lumiere" id="lumiere">
      <div className="vt-wrap vt-lumiere-in">
        <div className="vt-lumiere-copy reveal">
          <span className="vt-eyebrow on-dark">Le détail qui émeut</span>
          <h2>Une lumière par invité.</h2>
          <p>
            À chaque « oui », une lueur de plus s'allume — un arbre de vie, une constellation qui grandit
            avec vos invités. Votre faire-part n'attend pas le grand jour pour prendre vie : il s'illumine,
            réponse après réponse.
          </p>
          <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
        </div>
        <div className="vt-lumiere-tree reveal" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="320" className="vt-lumiere-svg">
            {LUMS.map((l, i) => (
              <g key={i} className="vt-lum" style={{ ["--d"]: i * 0.14 + "s" }}>
                <circle cx={l.x} cy={l.y} r="1.7" className="vt-lum-halo" />
                <circle cx={l.x} cy={l.y} r="0.9" className="vt-lum-core" />
              </g>
            ))}
          </svg>
          <p className="vt-lumiere-compte">15 lumières allumées · 15 « oui » 💛</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Les packs (tarifs « à partir de », devis personnalisé) ---------- */
export function Packs() {
  return (
    <section className="vt-section tint" id="formules">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Nos formules</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Trois packs, un accompagnement.</h2>
          <p>Chaque faire-part est créé sur mesure, avec vous. Ces packs donnent le cap — votre devis, lui, reste personnalisé.</p>
        </div>
        <div className="vt-plans">
          {PACKS.map((p) => (
            <div className={"vt-plan reveal" + (p.populaire ? " feat" : "")} key={p.nom}>
              {p.populaire && <span className="badge">Formule phare</span>}
              <div className="vt-plan-name">{p.nom}</div>
              <div className="vt-plan-tag">{p.tagline}</div>
              <div className="vt-price"><span className="apd">à partir de&nbsp;</span><span className="cur">{p.prix} €</span></div>
              <div className="vt-plan-once">{p.pitch}</div>
              <ul>{p.inclus.map((f) => <li key={f}>{I.check()}<span>{f}</span></li>)}</ul>
              <a className={"vt-btn " + (p.populaire ? "gold" : "ghost")} href={DEMO}>Demander une démo</a>
            </div>
          ))}
        </div>
        <p className="vt-plans-note">Tarifs indicatifs « à partir de » · devis personnalisé selon vos envies · vente en direct, sans abonnement.</p>
        <p className="vt-plans-lien"><a href={OFFRE_URL}>En savoir plus sur l'offre et les tarifs {I.arrow()}</a></p>
      </div>
    </section>
  );
}

/* ---------- Section « Demander une démo » (contact) ---------- */
export function Contact() {
  const [f, setF] = useState({ noms: "", email: "", date: "", message: "" });
  const [etat, setEtat] = useState("idle"); // idle | envoi | ok | err
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  function versMailto() {
    const sujet = encodeURIComponent(`Demande de démo — Faire-part Vivant${f.noms ? " · " + f.noms : ""}`);
    const corps = encodeURIComponent(
      `Bonjour François,\n\nNous aimerions une démo de Faire-part Vivant.\n\n` +
      `Prénoms : ${f.noms || "—"}\nE-mail : ${f.email || "—"}\nDate (approx.) du mariage : ${f.date || "—"}\n\n` +
      `${f.message || ""}\n\nÀ bientôt !`
    );
    window.location.href = `mailto:${EMAIL}?subject=${sujet}&body=${corps}`;
  }

  async function envoyer(e) {
    e.preventDefault();
    if (!WEB3FORMS_KEY) { versMailto(); return; }
    setEtat("envoi");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Demande de démo — Faire-part Vivant${f.noms ? " · " + f.noms : ""}`,
          from_name: f.noms || "Prospect — Faire-part Vivant",
          email: f.email,
          "Prénoms": f.noms,
          "Date du mariage": f.date,
          message: f.message,
        }),
      });
      const j = await res.json();
      setEtat(j.success ? "ok" : "err");
    } catch {
      setEtat("err");
    }
  }
  return (
    <section className="vt-contact" id="contact">
      <Sprig className="ct-l" /><Sprig className="ct-r" />
      <div className="vt-wrap vt-contact-in reveal">
        <div className="vt-contact-copy">
          <span className="vt-eyebrow on-dark">Sur mesure & accompagné</span>
          <h2>Réservons un moment.</h2>
          <p>
            Chaque faire-part est unique, créé avec vous, à la main. Pas de formule toute faite : on échange,
            je vous montre le produit en vrai, et je vous fais une proposition claire.
          </p>
          <ul className="vt-contact-points">
            <li>{I.check()} Une démo offerte, sans engagement</li>
            <li>{I.check()} Un accompagnement humain de bout en bout</li>
            <li>{I.check()} Réponse sous 48 h</li>
          </ul>
          <p className="vt-contact-mail">Ou directement : <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={`tel:${TEL_INTL}`}>{TEL}</a></p>
        </div>
        {etat === "ok" ? (
          <div className="vt-contact-form vt-contact-ok">
            <div className="ok-ic">{I.heart()}</div>
            <h3>Merci, c'est envoyé&nbsp;!</h3>
            <p>Je vous réponds sous 48&nbsp;h pour convenir d'un moment ensemble. À très vite. 🤍</p>
          </div>
        ) : (
          <form className="vt-contact-form" onSubmit={envoyer}>
            <label>Vos prénoms
              <input value={f.noms} onChange={set("noms")} placeholder="Camille & Alex" />
            </label>
            <label>Votre e-mail
              <input type="email" required value={f.email} onChange={set("email")} placeholder="vous@exemple.fr" />
            </label>
            <label>Date (approximative) du mariage
              <input value={f.date} onChange={set("date")} placeholder="Été 2026" />
            </label>
            <label>Votre message
              <textarea rows={3} value={f.message} onChange={set("message")} placeholder="Parlez-moi de votre projet…" />
            </label>
            <button className="vt-btn gold lg" type="submit" disabled={etat === "envoi"}>
              {etat === "envoi" ? "Envoi…" : <>Demander une démo {I.arrow()}</>}
            </button>
            {etat === "err" && <span className="vt-contact-note" style={{ color: "#e0b48a" }}>Un souci d'envoi — réessayez, ou écrivez-moi à {EMAIL}.</span>}
            <span className="vt-contact-note">{WEB3FORMS_KEY ? "Réponse sous 48 h · sans engagement." : "En cliquant, votre messagerie s'ouvre avec le message pré-rempli."}</span>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="vt-footer">
      <div className="vt-wrap vt-footer-in">
        <div>
          <span className="vt-logo"><a href="index.html" className="nm">{MARQUE}</a><a href={SITE_PRINCIPAL} className="by">{SIGNATURE}</a></span>
          <p className="tag">Un service de <a href={SITE_PRINCIPAL}>François Leterrier</a> — Community Manager &amp; création de sites, Sud-Toulousain.</p>
        </div>
        <nav>
          <div>
            <h4>Découvrir</h4>
            <a href="index.html">Accueil</a>
            <a href="fonctionnalites.html">Fonctionnalités</a>
            <a href="index.html#formules">Tarifs</a>
            <a href="index.html#faq">FAQ</a>
          </div>
          <div>
            <h4>François Leterrier</h4>
            <a href={SITE_PRINCIPAL}>Site principal</a>
            <a href={OFFRE_URL}>L'offre faire-part</a>
            <a href={`tel:${TEL_INTL}`}>{TEL}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </nav>
      </div>
      <div className="vt-wrap vt-footer-bottom">
        <span>© {"2026"} {MARQUE} · François Leterrier — Community Manager &amp; création de sites · Sud-Toulousain</span>
        <span>Sur mesure · vente en direct · sur devis</span>
      </div>
    </footer>
  );
}
