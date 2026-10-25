// Photos on the site: optimized WebP copies in public/photos/<id>-<width>.webp (originals stay in photos/, not in git).
// `light` is the light the photo was taken in, `kind` and `bw` drive the gallery filters; captions and alt text live in i18n (gallery.items).
export const photos = [
  { id: 'couple-night-run', w: 4032, h: 6048, light: 'night', kind: 'couple', bw: true, sizes: [480, 960, 1600] },
  { id: 'regrattier', w: 2160, h: 3240, light: 'day', kind: 'couple', bw: true, sizes: [480, 960, 1600] },
  { id: 'window-diner', w: 1024, h: 1536, light: 'night', kind: 'solo', bw: true, sizes: [480, 960, 1024] },
  { id: 'procope', w: 6048, h: 4032, light: 'day', kind: 'couple', bw: true, sizes: [720, 1440, 2400] },
  { id: 'louvre-arch', w: 1024, h: 1536, light: 'golden', kind: 'couple', bw: true, sizes: [480, 960, 1024] },
  { id: 'louvre-arcades', w: 1024, h: 1536, light: 'day', kind: 'solo', bw: true, sizes: [480, 960, 1024] },
  { id: 'rain', w: 3549, h: 5323, light: 'blue', kind: 'solo', bw: true, sizes: [480, 960, 1600] },
  { id: 'mist', w: 4032, h: 6048, light: 'day', kind: 'solo', sizes: [480, 960, 1600] },
  { id: 'eiffel-night', w: 941, h: 1672, light: 'night', kind: 'couple', sizes: [480, 941] },
  { id: 'louvre-window', w: 1536, h: 2304, light: 'day', kind: 'solo', sizes: [480, 960, 1536] },
  { id: 'night-hat', w: 3522, h: 5283, light: 'night', kind: 'solo', sizes: [480, 960, 1600] },
  { id: 'cafe-motion', w: 4032, h: 6048, light: 'blue', kind: 'solo', sizes: [480, 960, 1600], inGallery: false },
] as const;
/** the photos shown in the home gallery, in order (some are only used elsewhere, e.g. the booking form) */
export const galleryPhotos = photos.filter((p) => !('inGallery' in p));
export type PhotoId = (typeof photos)[number]['id'];

export const photo = (id: PhotoId) => photos.find((p) => p.id === id)!;
/** srcset for an <img>, largest last */
export const srcset = (id: PhotoId) => photo(id).sizes.map((w) => `/photos/${id}-${w}.webp ${w}w`).join(', ');
export const src = (id: PhotoId) => `/photos/${id}-${photo(id).sizes[Math.min(1, photo(id).sizes.length - 1)]}.webp`;
