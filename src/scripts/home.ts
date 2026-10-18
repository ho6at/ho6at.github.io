import { phaseAt, sunDay, type Phase } from '../lib/sun';
import { glowAt } from '../lib/sky';

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
  stepOf: string;
  steps: string[];
};
type Light = 'dawn' | 'day' | 'golden' | 'blue';

const main = document.querySelector<HTMLElement>('main[data-strings]')!;
const S: Strings = JSON.parse(main.dataset.strings!);
const MIN = 60000;
const DAY = 86400000;
const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel)!;
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [
  ...scope.querySelectorAll<T>(sel),
];
const time = (d: Date) =>
  d.toLocaleTimeString(S.locale, { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
const parisDate = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' }); // YYYY-MM-DD
const noonOf = (ymd: string) => new Date(`${ymd}T12:00:00Z`);
const windows = (day: ReturnType<typeof sunDay>): Record<Light, [Date, Date]> => ({
  dawn: [day.sunrise, day.dawnEnd],
  day: [day.dawnEnd, day.goldenStart],
  golden: [day.goldenStart, day.sunset],
  blue: [day.sunset, day.blueEnd],
});

/* ---------- Header and current section ---------- */
const top = $('[data-top]');
const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navLinks = $$<HTMLAnchorElement>('.pill a, .tabbar a');
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = e.target.id || 'top';
      navLinks.forEach((a) => a.classList.toggle('current', a.getAttribute('href') === `#${id}`));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
$$('main > section').forEach((s) => observer.observe(s));

/* ---------- Hero light and time scrubber ---------- */
const today = sunDay(new Date());
const start = today.dawnStart.getTime() - 45 * MIN;
const end = today.blueEnd.getTime() + 45 * MIN;
const span = end - start;
const frac = (t: number) => (t - start) / span;
const rise = today.sunrise.getTime();
const set = today.sunset.getTime();
const height = (t: number) => Math.max(-0.45, Math.sin((Math.PI * (t - rise)) / (set - rise)));

// Hour ticks along the scrubber
const ticks = $('[data-ticks]');
const firstHalf = Math.ceil(start / (30 * MIN)) * 30 * MIN;
for (let t = firstHalf; t <= end; t += 30 * MIN) {
  const tick = document.createElement('i');
  const d = new Date(t);
  const minutes = Number(time(d).slice(-2));
  tick.style.left = `${frac(t) * 100}%`;
  if (minutes === 0) {
    tick.className = 'hour';
    const hour = Number(time(d).slice(0, 2));
    if (hour % 2 === 0) {
      const label = document.createElement('b');
      label.textContent = time(d).slice(0, 2) + 'h';
      label.style.left = tick.style.left;
      ticks.append(label);
    }
  }
  ticks.append(tick);
}
const markers = (['sunrise', 'sunset'] as const).map((key) => {
  const el = $(`[data-tick="${key}"]`);
  const at = key === 'sunrise' ? today.sunrise : today.sunset;
  el.style.left = `${frac(at.getTime()) * 100}%`;
  $('time', el).textContent = time(at);
  return { el, f: frac(at.getTime()) };
});

const dial = $<HTMLInputElement>('[data-dial]');
const knob = $('[data-sun]');
const knobLabel = $('[data-knob-label]');
const dialName = $('[data-dial-name]');
const dialTime = $('[data-dial-time]');
const dialMood = $('[data-dial-mood]');
let touched = false;
let dialPhase: Phase = 'golden';

function paint(at: Date) {
  const t = at.getTime();
  const f = Math.min(1, Math.max(0, frac(t)));
  const h = height(t);
  const [glowB, glowA, core] = glowAt(at);
  root.style.setProperty('--glow-a', glowA);
  root.style.setProperty('--glow-b', glowB);
  root.style.setProperty('--glow-core', core);
  root.style.setProperty('--sun-x', `${8 + f * 84}%`);
  root.style.setProperty('--sun-y', `${78 - 46 * h}%`);

  knob.style.left = `${f * 100}%`;
  knobLabel.style.setProperty('--label-shift', f < 0.12 ? '-12%' : f > 0.88 ? '-88%' : '-50%');
  markers.forEach((m) => m.el.classList.toggle('hidden', Math.abs(m.f - f) < 0.17));

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
    // Late at night there is nothing to show; preview today's golden hour instead.
    setDial(t >= start && t <= end ? t : today.goldenStart.getTime() + 15 * MIN);
  }
}
tick();
setInterval(tick, 30000);

// Today's window for each place's light
const todayWindows = windows(today);
$$('[data-light-today]').forEach((el) => {
  const [a, b] = todayWindows[el.dataset.lightToday as Light];
  el.textContent = `${time(a)}–${time(b)}`;
});

/* ---------- Booking sheet ---------- */
const sheet = $<HTMLDialogElement>('[data-sheet]');
const form = $<HTMLFormElement>('[data-booking]');
const track = $('[data-track-steps]');
const panes = $$('[data-pane]', form);
const progress = $$('.progress span', form);
const stepLabel = $('[data-step-label]', form);
const stepTitle = $('[data-step-title]', form);
const back = $<HTMLButtonElement>('[data-back]', form);
const next = $<HTMLButtonElement>('[data-next]', form);
let step = 0;

function go(n: number) {
  step = Math.max(0, Math.min(panes.length - 1, n));
  track.style.transform = `translateX(${-step * 100}%)`;
  panes.forEach((p, i) => {
    p.inert = i !== step;
    if (i === step) p.scrollTop = 0;
  });
  progress.forEach((p, i) => p.classList.toggle('on', i <= step));
  stepLabel.textContent = S.stepOf.replace('{n}', String(step + 1)).replace('{total}', String(panes.length));
  stepTitle.textContent = S.steps.at(step) ?? '';
  back.classList.toggle('hidden', step === 0);
  next.classList.toggle('hidden', step === panes.length - 1);
  update();
}
back.addEventListener('click', () => go(step - 1));
next.addEventListener('click', () => go(step + 1));

// Date strip: the next three weeks, each with that day's golden hour
const dates = $('[data-dates]', form);
const now = new Date();
for (let i = 0; i < 21; i++) {
  const d = new Date(now.getTime() + i * DAY);
  const ymd = parisDate(d);
  const noon = noonOf(ymd);
  const label = document.createElement('label');
  const opts = { timeZone: 'Europe/Paris' } as const;
  label.innerHTML = `
    <input type="radio" name="date" value="${ymd}" ${i === 1 ? 'checked' : ''} />
    <span class="wd">${noon.toLocaleDateString(S.locale, { ...opts, weekday: 'short' })}</span>
    <span class="dn">${noon.toLocaleDateString(S.locale, { ...opts, day: 'numeric' })}</span>
    <span class="wd">${noon.toLocaleDateString(S.locale, { ...opts, month: 'short' })}</span>
    <span class="gt">${time(sunDay(noon).goldenStart)}</span>`;
  dates.append(label);
}

// People stepper
const peopleInput = $<HTMLInputElement>('input[name="people"]', form);
const peopleOut = $('[data-people-value]', form);
$$<HTMLButtonElement>('[data-people]', form).forEach((b) =>
  b.addEventListener('click', () => {
    const n = Math.min(10, Math.max(1, Number(peopleInput.value) + Number(b.dataset.people)));
    peopleInput.value = String(n);
    peopleOut.textContent = String(n);
    update();
  }),
);

const sum = {
  pkg: $('[data-sum-package]', form),
  date: $('[data-sum-date]', form),
  light: $('[data-sum-light]', form),
  people: $('[data-sum-people]', form),
  price: $('[data-sum-price]', form),
  group: $('[data-group-note]', form),
  ticket: $('[data-ticket]', form),
};
const sendEmail = $<HTMLAnchorElement>('[data-send-email]', form);
const sendWa = form.querySelector<HTMLAnchorElement>('[data-send-wa]');

function update() {
  const data = new FormData(form);
  const pkg = S.packages.find((p) => p.id === data.get('package')) ?? S.packages[1];
  const ymd = String(data.get('date') || parisDate(new Date(now.getTime() + DAY)));
  const light = String(data.get('light') || 'golden') as Light;
  const people = Number(data.get('people') || 2);
  const name = String(data.get('name') || '').trim();
  const note = String(data.get('note') || '').trim();

  const w = windows(sunDay(noonOf(ymd)));
  for (const [key, [a, b]] of Object.entries(w)) {
    $(`[data-light-time="${key}"]`, form).textContent = `${time(a)}–${time(b)}`;
  }
  const dateLabel = noonOf(ymd).toLocaleDateString(S.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Paris',
  });
  const price = new Intl.NumberFormat(S.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    pkg.price,
  );
  const [from, to] = w[light];

  sum.pkg.textContent = pkg.name;
  sum.date.textContent = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
  sum.light.textContent = `${S.names[light]}, ${time(from)}–${time(to)}`;
  sum.people.textContent = String(people);
  sum.price.textContent = price;
  sum.group.hidden = people < 3;
  sum.ticket.className = `ticket plate plate-${light}`;

  const body = S.message
    .replace('{package}', pkg.name)
    .replace('{price}', price)
    .replace('{date}', dateLabel)
    .replace('{light}', S.names[light].toLowerCase())
    .replace('{time}', `${S.around} ${time(from)}`)
    .replace('{people}', String(people))
    .replace('{note}', note)
    .replace('{name}', name)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  sendEmail.href = `mailto:${S.email}?subject=${encodeURIComponent(`${S.subject} — ${pkg.name}`)}&body=${encodeURIComponent(body)}`;
  if (sendWa && S.whatsapp) sendWa.href = `${S.whatsapp}?text=${encodeURIComponent(body)}`;
}
form.addEventListener('input', update);
form.addEventListener('change', update);
form.addEventListener('submit', (e) => e.preventDefault());

function check(name: string, value?: string) {
  if (!value) return;
  const input = form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

$$<HTMLElement>('[data-open-booking]').forEach((b) =>
  b.addEventListener('click', () => {
    check('package', b.dataset.package);
    // The hero's button books the light currently shown on the scrubber.
    const light = b.dataset.light ?? (b.closest('[data-hero]') ? (dialPhase === 'night' ? 'blue' : dialPhase) : undefined);
    check('light', light);
    go(b.dataset.package ? 1 : 0);
    sheet.showModal();
  }),
);
$('[data-close]', form).addEventListener('click', () => sheet.close());
sheet.addEventListener('click', (e) => {
  if (e.target === sheet) sheet.close(); // tap on the backdrop
});
if (reduceMotion) track.style.transition = 'none';
go(0);
