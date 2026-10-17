import { sunDay } from './sun';

// The colour of the Paris sky through the day, as three gradient stops (top, middle, bottom).
type Sky = [string, string, string];

const NIGHT: Sky = ['#0b1426', '#152240', '#26344f'];
const PREDAWN: Sky = ['#26355e', '#6b5a7e', '#c98c8f'];
const SUNRISE: Sky = ['#eea58c', '#f5c6b0', '#f8e7dc'];
const MORNING: Sky = ['#c9d9e6', '#e4ecf1', '#fbfbf9'];
const MIDDAY: Sky = ['#a9c6de', '#d6e4ee', '#f6f8f9'];
const GOLDEN: Sky = ['#efbd74', '#f6d7a4', '#fbefdc'];
const SUNSET: Sky = ['#cf6a55', '#ec9a70', '#f6cda2'];
const BLUE: Sky = ['#1b2e5a', '#2f4a7a', '#6a7aa0'];

const HOUR = 3600000;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) =>
  `rgb(${hex(a)
    .map((v, i) => Math.round(v + (hex(b).at(i)! - v) * k))
    .join(' ')})`;

function luminance(h: string) {
  const [r, g, b] = hex(h).map((v) => v / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function skyAt(time: Date) {
  const s = sunDay(time);
  const midday = new Date((s.dawnEnd.getTime() + s.goldenStart.getTime()) / 2);
  const stops: [number, Sky][] = [
    [s.dawnStart.getTime() - HOUR, NIGHT],
    [s.dawnStart.getTime(), PREDAWN],
    [s.sunrise.getTime(), SUNRISE],
    [s.dawnEnd.getTime(), MORNING],
    [midday.getTime(), MIDDAY],
    [s.goldenStart.getTime(), GOLDEN],
    [s.sunset.getTime(), SUNSET],
    [s.blueEnd.getTime(), BLUE],
    [s.blueEnd.getTime() + HOUR, NIGHT],
  ];
  const t = time.getTime();
  let colours: string[] = NIGHT;
  let dark = true;
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, a] = stops.at(i)!;
    const [t1, b] = stops.at(i + 1)!;
    if (t >= t0 && t <= t1) {
      const k = (t - t0) / (t1 - t0);
      colours = a.map((c, j) => mix(c, b.at(j)!, k));
      dark = luminance(k < 0.5 ? a[1] : b[1]) < 0.45;
      break;
    }
  }
  return { colours, dark };
}
