# Faire-part Vivant

Vitrine commerciale + éditeur du produit **« Faire-part Vivant »** — le faire-part
de mariage numérique qui vit : installable comme une appli, notifications push,
mur photo des invités en direct, cagnotte, éléments interactifs (arbre de vie,
constellation), RSVP et plan de table.

Vite + React + Supabase.

## Deux entrées

```
index.html      Vitrine commerciale (page d'accueil publique et indexable)
                → src/vitrine/
product.html    Éditeur self-service + rendu public des invitations
                (?i=slug → rendu public de l'invitation d'un couple)
                → src/product/
```

## Développement

```bash
npm install
cp .env.production .env.local   # ou renseignez vos propres clés Supabase
npm run dev
```

- Vitrine : http://localhost:5173/
- Éditeur : http://localhost:5173/product.html

## Variables d'environnement

Clés **publiques** (embarquées dans le build ; les données sont protégées par les
policies RLS de Supabase) — voir `.env.production` :

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_VAPID_PUBLIC_KEY=...      # notifications push (clé publique VAPID)
```

## Déploiement

Push sur `main` → GitHub Pages (workflow `.github/workflows/deploy.yml`).
Le site est publié sur `https://<owner>.github.io/faire-part-vivant/`.
