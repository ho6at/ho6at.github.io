import { sunDay } from './sun';

const HOUR = 3600000;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) =>
  `rgb(${hex(a)
    .map((v, i) => Math.round(v + (hex(b).at(i)! - v) * k))
    .join(' ')})`;

// The glow that lights the dark hero: [haze, glow, core] per moment of the day, kept saturated so
// mixes between them stay clean rather than muddy.
type Glow = [string, string, string];
const G_NIGHT: Glow = ['#0f1a33', '#22345e', '#8fa3d6'];
const G_PREDAWN: Glow = ['#2a2148', '#5b4778', '#d9b3c8'];
const G_SUNRISE: Glow = ['#4a2436', '#e0907a', '#ffe0cc'];
const G_MORNING: Glow = ['#2b3a4a', '#a9bfcf', '#ffffff'];
const G_MIDDAY: Glow = ['#2e3f50', '#c4d4de', '#ffffff'];
const G_GOLDEN: Glow = ['#5a3b1c', '#e6a95a', '#ffe6b8'];
const G_SUNSET: Glow = ['#5a1f24', '#e2734e', '#ffd2a6'];
const G_BLUE: Glow = ['#0e1d42', '#4566b0', '#c8d6ff'];

export function glowAt(time: Date): Glow {
  const s = sunDay(time);
  const midday = (s.dawnEnd.getTime() + s.goldenStart.getTime()) / 2;
  const stops: [number, Glow][] = [
    [s.dawnStart.getTime() - HOUR, G_NIGHT],
    [s.dawnStart.getTime(), G_PREDAWN],
    [s.sunrise.getTime(), G_SUNRISE],
    [s.dawnEnd.getTime(), G_MORNING],
    [midday, G_MIDDAY],
    [s.goldenStart.getTime(), G_GOLDEN],
    [s.sunset.getTime() - 10 * 60000, G_SUNSET],
    [s.sunset.getTime() + 12 * 60000, G_BLUE],
    [s.blueEnd.getTime() + HOUR, G_NIGHT],
  ];
  const t = time.getTime();
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, a] = stops.at(i)!;
    const [t1, b] = stops.at(i + 1)!;
    if (t >= t0 && t <= t1) return a.map((c, j) => mix(c, b.at(j)!, (t - t0) / (t1 - t0))) as Glow;
  }
  return G_NIGHT;
}
