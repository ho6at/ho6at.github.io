// Sun times for Paris, using the standard sunrise equation (accurate to a minute or two).
const PARIS = { lat: 48.8566, lon: 2.3522 };
const rad = Math.PI / 180;

export type Phase = 'night' | 'dawn' | 'day' | 'golden' | 'blue';

function toJulian(date: Date) {
  return date.getTime() / 86400000 + 2440587.5;
}
function fromJulian(j: number) {
  return new Date((j - 2440587.5) * 86400000);
}

// Times when the sun crosses `altitude` degrees, morning and evening, on the UTC day of `date`.
function crossing(date: Date, altitude: number) {
  const n = Math.round(toJulian(date) - 2451545 + 0.0008);
  const jStar = n - PARIS.lon / 360;
  const m = (357.5291 + 0.98560028 * jStar) % 360;
  const c = 1.9148 * Math.sin(m * rad) + 0.02 * Math.sin(2 * m * rad) + 0.0003 * Math.sin(3 * m * rad);
  const lambda = (m + c + 180 + 102.9372) % 360;
  const transit = 2451545 + jStar + 0.0053 * Math.sin(m * rad) - 0.0069 * Math.sin(2 * lambda * rad);
  const sinDec = Math.sin(lambda * rad) * Math.sin(23.4397 * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosW =
    (Math.sin(altitude * rad) - Math.sin(PARIS.lat * rad) * sinDec) / (Math.cos(PARIS.lat * rad) * cosDec);
  const w = Math.acos(Math.max(-1, Math.min(1, cosW))) / rad;
  return { morning: fromJulian(transit - w / 360), evening: fromJulian(transit + w / 360) };
}

export function sunDay(date: Date) {
  const horizon = crossing(date, -0.833);
  const civil = crossing(date, -6);
  const golden = crossing(date, 6);
  return {
    dawnStart: civil.morning,
    sunrise: horizon.morning,
    dawnEnd: golden.morning,
    goldenStart: golden.evening,
    sunset: horizon.evening,
    blueEnd: civil.evening,
  };
}

export function phaseAt(now: Date): { phase: Phase; next: Date } {
  const s = sunDay(now);
  if (now < s.dawnStart) return { phase: 'night', next: s.sunrise };
  if (now < s.dawnEnd) return { phase: 'dawn', next: s.dawnEnd };
  if (now < s.goldenStart) return { phase: 'day', next: s.goldenStart };
  if (now < s.sunset) return { phase: 'golden', next: s.sunset };
  if (now < s.blueEnd) return { phase: 'blue', next: s.blueEnd };
  const tomorrow = sunDay(new Date(now.getTime() + 86400000));
  return { phase: 'night', next: tomorrow.sunrise };
}
