// Photos on the site: optimized WebP copies in public/photos/<id>-<width>.webp (originals stay in photos/, not in git).
// `light` is the light the photo was taken in; captions and alt text live in i18n (gallery.items).
export const photos = [
  { id: 'couple-night-run', w: 4032, h: 6048, light: 'night', sizes: [480, 960, 1600] },
  { id: 'mist', w: 4032, h: 6048, light: 'day', sizes: [480, 960, 1600] },
  { id: 'cafe-motion', w: 4032, h: 6048, light: 'blue', sizes: [480, 960, 1600] },
  { id: 'regrattier', w: 2160, h: 3240, light: 'day', sizes: [480, 960, 1600] },
  { id: 'eiffel-night', w: 941, h: 1672, light: 'night', sizes: [480, 941] },
  { id: 'cafe-portrait', w: 1536, h: 2304, light: 'day', sizes: [480, 960, 1536] },
  { id: 'louvre-window', w: 1536, h: 2304, light: 'day', sizes: [480, 960, 1536] },
  { id: 'night-hat', w: 3522, h: 5283, light: 'night', sizes: [480, 960, 1600] },
] as const;
export type PhotoId = (typeof photos)[number]['id'];

export const photo = (id: PhotoId) => photos.find((p) => p.id === id)!;
/** srcset for an <img>, largest last */
export const srcset = (id: PhotoId) => photo(id).sizes.map((w) => `/photos/${id}-${w}.webp ${w}w`).join(', ');
export const src = (id: PhotoId) => `/photos/${id}-${photo(id).sizes[Math.min(1, photo(id).sizes.length - 1)]}.webp`;
