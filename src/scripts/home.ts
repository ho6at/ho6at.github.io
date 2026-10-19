import { sunDay, type Phase } from '../lib/sun';
import { lightPass } from '../lib/lightPass';

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
const heroMark = $('.hero .light-logo');
const lightHero = () => {
  if (heroMark.dataset.light !== 'waiting') return;
  if (reduceMotion) {
    heroMark.dataset.light = 'done';
    return;
  }
  lightPass(heroMark, { reveal: true });
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

/* ---------- Gliding between sections ---------- */
// Where each section settles: its heading just under the fixed header (from its scroll-margin).
const snapPoint = (el: HTMLElement) =>
  Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(el).scrollMarginTop || '0')));
const stops = () => {
  const list = $$<HTMLElement>('main > .hero, main > .section, main > .contact').map(snapPoint);
  list.push(Math.round(document.documentElement.scrollHeight - window.innerHeight)); // the very bottom
  return list.sort((a, b) => a - b);
};
// A slow, gentle glide (the browser's own smooth scroll is too quick and can't be timed). Snapping is
// paused while it runs, otherwise on touch screens the snap pulls the page back mid-way.
const duration = 1100;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
let moving = false;
const glide = (to: number, done = () => {}) => {
  moving = true;
  root.style.scrollSnapType = 'none';
  const finish = () => {
    root.style.scrollSnapType = '';
    setTimeout(() => {
      moving = false;
      done();
    }, 120); // let trackpad momentum die down before the next move
  };
  if (reduceMotion) {
    window.scrollTo({ top: to, behavior: 'instant' });
    return finish();
  }
  const from = window.scrollY;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + (to - from) * ease(t), behavior: 'instant' });
    if (t < 1) requestAnimationFrame(step);
    else finish();
  };
  requestAnimationFrame(step);
};

// In-page links (menu, tab bar, hero buttons) glide to their section instead of the browser's jump.
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  const id = link.getAttribute('href')!.slice(1);
  const section = id ? document.getElementById(id) : null;
  if (!section) return;
  e.preventDefault();
  glide(id === 'top' ? 0 : snapPoint(section));
  history.replaceState(null, '', `#${id}`);
});

// Mouse and trackpad: a little scroll glides to the next or previous section.
if (matchMedia('(hover: hover)').matches) {
  addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (root.classList.contains('splash') || root.classList.contains('ask-lang') || document.querySelector('dialog[open]')) return;
      if (moving) return e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      const y = window.scrollY;
      const down = e.deltaY > 0;
      const points = stops();
      const next = down ? points.find((p) => p > y + 2) : [...points].reverse().find((p) => p < y - 2);
      if (next === undefined) return;
      // inside a section taller than the screen: scroll through it normally until its end is near
      if (Math.abs(next - y) > window.innerHeight * 1.3) return;
      e.preventDefault();
      glide(next);
    },
    { passive: false },
  );
}

/* ---------- Sections fade in once as they arrive (see html.reveal in global.css) ---------- */
if (!reduceMotion && 'IntersectionObserver' in window) {
  root.classList.add('reveal');
  const arrive = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        arrive.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  );
  $$('main > section:not(.hero)').forEach((s) => arrive.observe(s));
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

/* ---------- Arriving from a guide page with ?book=<package>: open the booking form ---------- */
{
  const params = new URLSearchParams(location.search);
  if (params.has('book')) {
    const pkg = params.get('book') || undefined;
    check('package', pkg);
    go(pkg ? 1 : 0);
    sheet.showModal();
    history.replaceState(null, '', location.pathname + location.hash);
  }
}
