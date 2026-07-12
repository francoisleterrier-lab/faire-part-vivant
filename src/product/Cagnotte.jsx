import { useEffect, useRef, useState, useCallback } from "react";
import { sb } from "./supabaseFpv.js";

/* Cagnotte / liste de mariage (fonds commun) — version interactive.
   Le montant collecté est géré par le couple (mise à jour manuelle) ; la
   participation passe par un lien externe (Leetchi, Lydia, PayPal, RIB…).
   Ici : jauge animée + jalons, montants suggérés, mur de mots « live ». */

const eur = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " €";
const PRESETS = [20, 50, 100, 150];
const JALONS = [25, 50, 75, 100];

function tempsRelatif(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  return `il y a ${Math.floor(s / 86400)} j`;
}

export default function Cagnotte({ invitationId, cfg }) {
  const { titre, texte, objectif, montant, lien } = cfg || {};
  const [messages, setMessages] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [mot, setMot] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [preset, setPreset] = useState(null);
  const [fete, setFete] = useState(false);
  const [anim, setAnim] = useState(0); // 0 → 1 : progression animée de la jauge
  const jaugeRef = useRef(null);

  const obj = Number(objectif) || 0;
  const col = Number(montant) || 0;
  const pct = obj > 0 ? Math.min(100, (col / obj) * 100) : 0;
  const url = (lien || "").trim();

  // Mur de mots « live » : chargement + rafraîchissement régulier / au retour.
  const charger = useCallback(async () => {
    const { data } = await sb
      .from("fpv_cagnotte_messages")
      .select("id, prenom, message, created_at")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false });
    setMessages(data || []);
  }, [invitationId]);
  useEffect(() => {
    charger();
    const onVis = () => document.visibilityState === "visible" && charger();
    const id = setInterval(onVis, 15000);
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, [charger]);

  // Jauge : se remplit (montant + barre) quand elle entre à l'écran.
  useEffect(() => {
    const el = jaugeRef.current;
    if (!el || obj <= 0) return;
    let raf, start = null, done = false;
    const tick = (t) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / 1300);
      setAnim(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { setAnim(1); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !done) { done = true; raf = requestAnimationFrame(tick); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [obj]);

  const shownPct = pct * anim;
  const shownCol = col * anim;
  const reste = Math.max(0, obj - col);

  async function envoyer(e) {
    e.preventDefault();
    if (!mot.trim()) return;
    setBusy(true);
    await sb.from("fpv_cagnotte_messages").insert({ invitation_id: invitationId, prenom: prenom.trim(), message: mot.trim() });
    setBusy(false);
    setMot("");
    setOk(true); setTimeout(() => setOk(false), 2600);
    setFete(true); setTimeout(() => setFete(false), 1800);
    charger();
  }

  return (
    <section className="fpv-sec fpv-cagnotte" id="cagnotte">
      <h2>{(titre || "").trim() || "Notre cagnotte"}</h2>
      {(texte || "").trim() && texte.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}

      {obj > 0 && (
        <div className="fpv-cag-jauge" ref={jaugeRef} role="img" aria-label={`${eur(col)} collectés sur un objectif de ${eur(obj)}`}>
          <div className="fpv-cag-amount">
            <strong>{eur(shownCol)}</strong>
            <span>sur {eur(obj)}</span>
          </div>
          <div className="fpv-cag-bar">
            <span className="fill" style={{ width: shownPct + "%" }}>
              <span className="fpv-cag-bubble">{Math.round(shownPct)}%</span>
            </span>
            {JALONS.map((m) => (
              <i key={m} className={"fpv-cag-ms" + (shownPct >= m - 0.5 ? " on" : "")} style={{ left: m + "%" }} aria-hidden="true" />
            ))}
          </div>
          <div className="fpv-cag-legend">
            {reste > 0 ? <>Plus que <strong>{eur(reste)}</strong> pour atteindre notre rêve ✨</> : <>Objectif atteint — merci du fond du cœur ! 🤍</>}
          </div>
        </div>
      )}

      {url && (
        <div className="fpv-cag-participer">
          <div className="fpv-cag-presets">
            {PRESETS.map((a) => (
              <button key={a} type="button" className={"fpv-cag-preset" + (preset === a ? " on" : "")} onClick={() => setPreset(a)}>{a} €</button>
            ))}
            <button type="button" className={"fpv-cag-preset" + (preset === "libre" ? " on" : "")} onClick={() => setPreset("libre")}>Autre montant</button>
          </div>
          <a className="fpv-cta fpv-cag-cta" href={url} target="_blank" rel="noopener noreferrer">
            💝 Participer{typeof preset === "number" ? ` — ${preset} €` : " à la cagnotte"}
          </a>
        </div>
      )}

      <div className="fpv-cag-mots">
        {messages.length > 0 && (
          <p className="fpv-cag-count">{messages.length} petit{messages.length > 1 ? "s" : ""} mot{messages.length > 1 ? "s" : ""} déjà laissé{messages.length > 1 ? "s" : ""} 💛</p>
        )}
        <form className="fpv-cag-form" onSubmit={envoyer}>
          <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Votre prénom (facultatif)" aria-label="Votre prénom" />
          <textarea rows={2} value={mot} onChange={(e) => setMot(e.target.value)} placeholder="Un petit mot pour les mariés…" aria-label="Votre message" />
          <button className="fpv-album-gal" disabled={busy || !mot.trim()}>{busy ? "Envoi…" : "Laisser un mot"}</button>
          {ok && <span className="fpv-push-ok" style={{ fontSize: "1rem" }}>🌿 Merci !</span>}
          {fete && (
            <div className="fpv-cag-petals" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="fpv-cag-petal" style={{ left: (i * 8 + 3) + "%", animationDelay: (i % 6) * 0.06 + "s" }}>❀</span>
              ))}
            </div>
          )}
        </form>

        {messages.length > 0 && (
          <ul className="fpv-cag-liste">
            {messages.map((m) => (
              <li key={m.id}>
                <p>« {m.message} »</p>
                <span>{m.prenom ? `— ${m.prenom} · ` : ""}{tempsRelatif(m.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
