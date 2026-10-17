import { phaseAt, sunDay, type Phase } from '../lib/sun';
import { skyAt } from '../lib/sky';

type Strings = {
  names: Record<Phase, string>;
  moods: Record<Phase, string>;
  locale: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  around: string;
  packages: { id: string; name: string; price: number }[];
  people: string[];
};

const main = document.querySelector<HTMLElement>('main[data-strings]')!;
const S: Strings = JSON.parse(main.dataset.strings!);
const MIN = 60000;
const root = document.documentElement;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel)!;
const time = (d: Date) =>
  d.toLocaleTimeString(S.locale, { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
const parisDate = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' }); // YYYY-MM-DD

/* ---------- Header ---------- */
const top = $('[data-top]');
const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Sky + light dial ---------- */
const today = sunDay(new Date());
const start = today.dawnStart.getTime() - 45 * MIN;
const end = today.blueEnd.getTime() + 45 * MIN;
const span = end - start;
const frac = (t: number) => (t - start) / span;

// Sun height: 1 at solar noon, 0 on the horizon, below it before sunrise and after sunset.
const rise = today.sunrise.getTime();
const set = today.sunset.getTime();
const height = (t: number) => Math.max(-0.45, Math.sin((Math.PI * (t - rise)) / (set - rise)));
const HORIZON = 150; // in the 0–200 viewBox
const yOf = (t: number) => HORIZON - 125 * height(t);

const arc = $<SVGPathElement>('[data-arc]');
arc.setAttribute(
  'd',
  Array.from({ length: 121 }, (_, i) => {
    const t = start + (span * i) / 120;
    return `${i ? 'L' : 'M'}${(frac(t) * 1000).toFixed(1)} ${yOf(t).toFixed(1)}`;
  }).join(''),
);
for (const [key, at] of [
  ['sunrise', today.sunrise],
  ['sunset', today.sunset],
] as const) {
  const tick = $(`[data-tick="${key}"]`);
  tick.style.left = `${frac(at.getTime()) * 100}%`;
  $('time', tick).textContent = time(at);
}

const dial = $<HTMLInputElement>('[data-dial]');
const sun = $('[data-sun]');
const dialName = $('[data-dial-name]');
const dialTime = $('[data-dial-time]');
const dialMood = $('[data-dial-mood]');
let touched = false;
let dialPhase: Phase = 'golden';

function paint(at: Date) {
  const { colours, dark } = skyAt(at);
  colours.forEach((c, i) => root.style.setProperty(`--sky-${i + 1}`, c));
  root.style.setProperty('--sky-ink', dark ? '#f4f1ea' : '#1f2a33');

  const t = at.getTime();
  sun.style.left = `${frac(t) * 100}%`;
  sun.style.top = `${(yOf(t) / 200) * 100}%`;

  dialPhase = phaseAt(at).phase;
  dialName.textContent = S.names[dialPhase];
  dialTime.textContent = time(at);
  dialMood.textContent = S.moods[dialPhase];
  dial.setAttribute('aria-valuetext', `${time(at)}, ${S.names[dialPhase]}`);
}

const fromDial = () => new Date(start + (span * Number(dial.value)) / 1000);
function setDial(t: number) {
  dial.value = String(Math.round(Math.min(1, Math.max(0, frac(t))) * 1000));
  paint(fromDial());
}

dial.addEventListener('input', () => {
  touched = true;
  paint(fromDial());
});

const clock = $('[data-clock]');
const livePhase = $('[data-live-phase]');
function tick() {
  const now = new Date();
  clock.textContent = time(now);
  livePhase.textContent = S.names[phaseAt(now).phase];
  if (!touched) {
    const t = now.getTime();
    // Outside today's light (late night), show the coming golden hour instead of a black sky.
    setDial(t >= start && t <= end ? t : today.goldenStart.getTime() + 15 * MIN);
  }
}
tick();
setInterval(tick, 30000);

/* ---------- Session composer ---------- */
const form = $<HTMLFormElement>('[data-composer]');
const dateInput = $<HTMLInputElement>('[data-date]');
const now = new Date();
dateInput.min = parisDate(now);
dateInput.value = parisDate(new Date(now.getTime() + 86400000));

const sum = {
  pkg: $('[data-sum-package]'),
  date: $('[data-sum-date]'),
  light: $('[data-sum-light]'),
  price: $('[data-sum-price]'),
  group: $('[data-group-note]'),
};
const sendEmail = $<HTMLAnchorElement>('[data-send-email]');
const sendWa = document.querySelector<HTMLAnchorElement>('[data-send-wa]');

function windows(day: ReturnType<typeof sunDay>) {
  return {
    dawn: [day.sunrise, day.dawnEnd],
    day: [day.dawnEnd, day.goldenStart],
    golden: [day.goldenStart, day.sunset],
    blue: [day.sunset, day.blueEnd],
  } as Record<'dawn' | 'day' | 'golden' | 'blue', [Date, Date]>;
}

function setLight(light: string) {
  const input = form.querySelector<HTMLInputElement>(`input[name="light"][value="${light}"]`);
  if (input) input.checked = true;
  updateComposer();
}

function updateComposer() {
  const data = new FormData(form);
  const pkg = S.packages.find((p) => p.id === data.get('package')) ?? S.packages[1];
  const dateValue = String(data.get('date') || dateInput.min);
  const light = String(data.get('light') || 'golden') as keyof ReturnType<typeof windows>;
  const peopleIndex = Number(data.get('people') || 2) - 1;
  const name = String(data.get('name') || '').trim();

  const day = sunDay(new Date(`${dateValue}T12:00:00Z`));
  const w = windows(day);
  for (const [key, [a, b]] of Object.entries(w)) {
    $(`[data-light-time="${key}"]`, form).textContent = `${time(a)}–${time(b)}`;
  }

  const dateLabel = new Date(`${dateValue}T12:00:00Z`).toLocaleDateString(S.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Paris',
  });
  const price = new Intl.NumberFormat(S.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    pkg.price,
  );
  const [from, to] = w[light];
  const lightLabel = S.names[light];
  const lightTime = `${S.around} ${time(from)}`;

  sum.pkg.textContent = pkg.name;
  sum.date.textContent = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
  sum.light.textContent = `${lightLabel}, ${time(from)}–${time(to)}`;
  sum.price.textContent = price;
  sum.group.hidden = peopleIndex < 2;

  const body = S.message
    .replace('{package}', pkg.name)
    .replace('{price}', price)
    .replace('{date}', dateLabel)
    .replace('{light}', lightLabel.toLowerCase())
    .replace('{time}', lightTime)
    .replace('{people}', S.people.at(peopleIndex) ?? '2')
    .replace('{name}', name)
    .trim();
  sendEmail.href = `mailto:${S.email}?subject=${encodeURIComponent(`${S.subject} — ${pkg.name}`)}&body=${encodeURIComponent(body)}`;
  if (sendWa && S.whatsapp) sendWa.href = `${S.whatsapp}?text=${encodeURIComponent(body)}`;
}

form.addEventListener('input', updateComposer);
form.addEventListener('change', updateComposer);
form.addEventListener('submit', (e) => e.preventDefault());
updateComposer();

$('[data-dial-book]').addEventListener('click', () => {
  setLight(dialPhase === 'night' ? 'blue' : dialPhase);
});

/* ---------- Places ---------- */
const places = [...document.querySelectorAll<HTMLElement>('[data-place]')];
const previews = [...document.querySelectorAll<HTMLElement>('[data-preview-photo]')];
function activate(i: number) {
  places.forEach((p, j) => p.classList.toggle('active', i === j));
  previews.forEach((p, j) => p.classList.toggle('shown', i === j));
}
places.forEach((place, i) => {
  place.addEventListener('mouseenter', () => activate(i));
  place.addEventListener('focusin', () => activate(i));
  $('button', place).addEventListener('click', () => {
    setLight(place.dataset.light!);
    $('#sessions').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});
activate(0);
