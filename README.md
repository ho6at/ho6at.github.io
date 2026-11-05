# Luminoor — site web

Site vitrine FR (`/`) et EN (`/en/`), construit avec [Astro](https://astro.build). Page statique, hébergeable gratuitement sur Netlify, Vercel ou Cloudflare Pages.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:4321.

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Textes français | `src/i18n/fr.ts` |
| Textes anglais | `src/i18n/en.ts` |
| E-mail, Instagram, WhatsApp | `src/site.ts` |
| Mise en page et styles | `src/components/Home.astro`, `src/styles/global.css` |
| Mentions légales | `src/pages/mentions-legales/index.astro` |

## Édition des photos (look Luminoor)

`scripts/luminoor_edit.py` applique le noir et blanc maison (mesuré sur la galerie, à 60 %, réglages classiques uniquement, sans IA). Les originaux ne sont jamais modifiés ; tout ce qui est dans `photos/` reste hors de git.

```bash
python3 scripts/luminoor_edit.py photos/_inbox/*.jpg              # plein cadre -> photos/_edited/
python3 scripts/luminoor_edit.py photos/_inbox/*.jpg --instagram  # 4:5 + signature -> photos/_edited/instagram/
python3 scripts/luminoor_edit.py photo.jpg --site mon-id          # fichiers de la galerie dans public/photos/
```

La signature est lue depuis `photos/_brand/signature-ho6at.png`. Pillow est requis (`python3 -m pip install --user pillow`).

Le bandeau du haut change de couleur selon la lumière réelle à Paris (aube, jour, heure dorée, heure bleue, nuit) : `src/lib/sun.ts`.

## Avant la mise en ligne

- [ ] Remplacer les emplacements photo : déposer les images dans `public/photos/` et passer `src="/photos/…"` aux composants `<Photo>` dans `Home.astro` (les textes `alt` décrivent la photo attendue).
- [ ] Confirmer l'e-mail, le compte Instagram et WhatsApp dans `src/site.ts`.
- [ ] Choisir le domaine et mettre à jour `site` dans `astro.config.mjs`.
- [ ] Compléter les mentions légales après l'immatriculation (SIRET, adresse, hébergeur).
- [ ] Valider les prix avec la stratégie finale.

## Mettre en ligne

```bash
npm run build
```

Le dossier `dist/` contient le site prêt à publier.
