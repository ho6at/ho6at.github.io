// The price of a custom session, shared by the booking form (live price), the package presets, the guide
// pages and the structured data, so every price on the site comes from one formula:
// base + extra locations + edited photos + kind of session + extra people + dawn + add-ons, to the nearest 10 €.

export const SHOOTS = ['street', 'couple', 'proposal', 'friends'] as const;
export type Shoot = (typeof SHOOTS)[number];
export const PHOTO_TIERS = [10, 20, 35, 50, 80] as const;
export const MAX_LOCATIONS = 4;
export const MAX_OUTFITS = 3;

export const PRICES = {
  base: 120, // planning, the first location, all raw photos, private gallery
  location: 60, // each location after the first
  photos: { 10: 100, 20: 170, 35: 240, 50: 300, 80: 420 } as Record<number, number>,
  proposal: 120, // secret planning and scouting
  person: 20, // each person beyond two
  dawn: 40, // a very early start
  video: 150, // one-minute cinematic film
  express: 60, // photos within 48 hours
  outfit: 30, // each change of outfit
};

/** how many people each kind of session usually is (the form starts there) */
export const DEFAULT_PEOPLE: Record<Shoot, number> = { street: 1, couple: 2, proposal: 2, friends: 4 };

export interface Choice {
  shoot: Shoot;
  locations: number;
  photos: number;
  people: number;
  light: string;
  video: boolean;
  express: boolean;
  outfits: number;
}

export type LineKey = 'base' | 'locations' | 'photos' | 'proposal' | 'people' | 'dawn' | 'video' | 'express' | 'outfits';

export function quote(c: Choice) {
  const lines: { key: LineKey; amount: number }[] = [
    { key: 'base', amount: PRICES.base },
    { key: 'locations', amount: (c.locations - 1) * PRICES.location },
    { key: 'photos', amount: PRICES.photos[c.photos] ?? PRICES.photos[10] },
    { key: 'proposal', amount: c.shoot === 'proposal' ? PRICES.proposal : 0 },
    { key: 'people', amount: Math.max(0, c.people - 2) * PRICES.person },
    { key: 'dawn', amount: c.light === 'dawn' ? PRICES.dawn : 0 },
    { key: 'video', amount: c.video ? PRICES.video : 0 },
    { key: 'express', amount: c.express ? PRICES.express : 0 },
    { key: 'outfits', amount: c.outfits * PRICES.outfit },
  ];
  const total = Math.round(lines.reduce((s, l) => s + l.amount, 0) / 10) * 10;
  // about 45 minutes per location, a little more per photo, outfit and film; to the half hour, at least an hour
  const raw = 45 * c.locations + 1.2 * c.photos + 15 * c.outfits + (c.video ? 30 : 0);
  const minutes = Math.max(60, Math.round(raw / 30) * 30);
  return { total, minutes, lines: lines.filter((l) => l.amount > 0) };
}

/** the ready-made packages are just starting points in the same formula */
export const PRESETS = {
  minimal: { locations: 1, photos: 10, outfits: 0, video: false },
  classic: { locations: 2, photos: 20, outfits: 0, video: false },
  signature: { locations: 3, photos: 35, outfits: 0, video: false },
  cinestyle: { locations: 4, photos: 50, outfits: 0, video: true },
} as const;
export type Preset = keyof typeof PRESETS;

export const presetPrice = (id: Preset) =>
  quote({ shoot: 'street', people: 2, light: 'golden', express: false, ...PRESETS[id] }).total;
