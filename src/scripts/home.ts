import { sunDay, type Phase } from '../lib/sun';

type Strings = {
  names: Record<Phase, string>;
  locale: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  around: string;
  packages: { id: string; name: string; price: number; featured: boolean }[];
  stepOf: string;
  steps: string[];
};
type Light = 'dawn' | 'day' | 'golden' | 'blue';

const main = document.querySelector<HTMLElement>('main[data-strings]')!;
const S: Strings = JSON.parse(main.dataset.strings!);
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

/* ---------- Hero logo: one pass of light, once the splash and language picker are gone ---------- */
const heroMark = $('[data-hero-light]');
const lightHero = () => {
  if (heroMark.dataset.heroLight !== 'waiting') return;
  if (reduceMotion) {
    heroMark.dataset.heroLight = 'done';
    return;
  }
  heroMark.dataset.heroLight = 'passing';
  const pass = 2600;
  const smooth = (x: number) => x * x * (3 - 2 * x);
  const start = performance.now() + 300;
  const frame = (now: number) => {
    const t = Math.min(1, Math.max(0, now - start) / pass);
    const p = smooth(t);
    heroMark.style.setProperty('--lx', `${-12 + 124 * p}%`);
    heroMark.style.setProperty('--ly', `${78 - 105 * Math.sin(Math.PI * p)}%`);
    heroMark.style.setProperty('--power', (Math.sin(Math.PI * Math.min(1, t * 1.1)) ** 0.6).toFixed(3));
    if (t < 1) requestAnimationFrame(frame);
    else {
      heroMark.style.setProperty('--power', '0');
      heroMark.dataset.heroLight = 'done';
    }
  };
  requestAnimationFrame(frame);
};
const heroVisible = () => !root.classList.contains('splash') && !root.classList.contains('ask-lang');
if (heroVisible()) lightHero();
else {
  const watch = new MutationObserver(() => {
    if (!heroVisible()) return;
    watch.disconnect();
    lightHero();
  });
  watch.observe(root, { attributes: true, attributeFilter: ['class'] });
}

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

/* ---------- Today's sun times in Paris ---------- */
const today = sunDay(new Date());

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
  // Panes run right to left in Persian, so the track slides the other way.
  const sign = document.dir === 'rtl' ? 1 : -1;
  track.style.transform = `translateX(${sign * step * 100}%)`;
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
  const pkg = S.packages.find((p) => p.id === data.get('package')) ?? S.packages.find((p) => p.featured)!;
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
    check('light', b.dataset.light);
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
