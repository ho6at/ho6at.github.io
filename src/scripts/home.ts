import { sunDay, type Phase } from '../lib/sun';
import { lightPass } from '../lib/lightPass';
import { followLight } from '../lib/followLight';
import { quote, PRESETS, DEFAULT_PEOPLE, type Choice, type Preset, type Shoot } from '../lib/pricing';
import type fr from '../i18n/fr';

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
  custom: typeof fr.sessions.custom;
  langNames: Record<string, string>;
  peopleLabel: string;
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
  // after the pass, the light stays and follows the visitor
  lightPass(heroMark, { reveal: true, onDone: () => followLight($('[data-hero]'), heroMark, $('.hero-follow')) });
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

/* ---------- Gallery «Le Viseur»: scrolling down takes the next frame; a tap opens it full screen ---------- */
{
  const track = document.querySelector<HTMLElement>('[data-viseur]');
  const shots = track ? $$<HTMLImageElement>('.vf-img', track) : [];
  let current = 0;
  if (track && shots.length) {
    const frame = $('[data-vf-frame]', track);
    const n = $('[data-vf-n]', track);
    const placeEl = $('[data-vf-place]', track);
    const ticks = $$('.vf-ticks li', track);
    const hint = $('[data-vf-hint]', track);
    const pad = (k: number) => String(k).padStart(2, '0');
    const take = (i: number) => {
      if (i === current) return;
      current = i;
      shots.forEach((s, k) => s.classList.toggle('on', k === i));
      ticks.forEach((t, k) => t.classList.toggle('on', k <= i));
      n.textContent = pad(i + 1);
      placeEl.textContent = shots[i].dataset.place!;
      hint.classList.add('gone');
      // the flash and the focus square: restart their animation for each new frame
      frame.classList.remove('shot');
      void frame.offsetWidth;
      frame.classList.add('shot');
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = track.getBoundingClientRect();
        const run = r.height - window.innerHeight;
        const p = Math.min(0.9999, Math.max(0, -r.top / run));
        take(Math.floor(p * shots.length));
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const box = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (box) {
    const img = $<HTMLImageElement>('[data-lb-img]', box);
    const light = $('[data-lb-light]', box);
    const place = $('[data-lb-place]', box);
    const count = $('[data-lb-count]', box);
    let list: HTMLElement[] = [];
    let at = 0;
    const show = (i: number) => {
      at = (i + list.length) % list.length;
      const s = list[at];
      const set = () => {
        img.srcset = s.dataset.full!;
        img.alt = (s as HTMLImageElement).alt;
        light.textContent = s.dataset.light!;
        place.textContent = s.dataset.place!;
        count.textContent = `${(at + 1).toLocaleString(S.locale)} / ${list.length.toLocaleString(S.locale)}`;
        img.classList.remove('fading');
      };
      if (!box.open || reduceMotion) return set();
      img.classList.add('fading');
      setTimeout(set, 200);
    };
    const open = () => {
      list = shots;
      show(current);
      box.showModal();
    };
    const frame = document.querySelector<HTMLElement>('[data-vf-frame]');
    frame?.addEventListener('click', open);
    frame?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
    $('[data-lb-close]', box).addEventListener('click', () => box.close());
    $$<HTMLButtonElement>('[data-lb-step]', box).forEach((b) =>
      b.addEventListener('click', () => show(at + Number(b.dataset.lbStep))),
    );
    const rtl = document.dir === 'rtl';
    box.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(at + (rtl ? -1 : 1));
      if (e.key === 'ArrowLeft') show(at + (rtl ? 1 : -1));
    });
    // swipe sideways for the next photo, down to close
    let x0 = 0;
    let y0 = 0;
    const stage = $('[data-lb-stage]', box);
    stage.addEventListener('pointerdown', (e) => {
      x0 = e.clientX;
      y0 = e.clientY;
    });
    stage.addEventListener('pointerup', (e) => {
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(at + (dx < 0 !== rtl ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) box.close();
    });
  }
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
  stepLabel.textContent = S.stepOf
    .replace('{n}', (step + 1).toLocaleString(S.locale))
    .replace('{total}', panes.length.toLocaleString(S.locale));
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

// Steppers: places, people, outfit changes
const steppers = new Map<string, (n: number) => void>();
$$('[data-stepper]', form).forEach((box) => {
  const name = box.dataset.stepper!;
  const input = $<HTMLInputElement>(`input[name="${name}"]`, form);
  const out = $('output', box);
  const min = Number(box.dataset.min);
  const max = Number(box.dataset.max);
  const set = (n: number) => {
    n = Math.min(max, Math.max(min, n));
    input.value = String(n);
    out.textContent = n.toLocaleString(S.locale);
    $$<HTMLButtonElement>('[data-step-by]', box).forEach((b) => {
      b.disabled = Number(b.dataset.stepBy) < 0 ? n <= min : n >= max;
    });
  };
  steppers.set(name, set);
  set(Number(input.value));
  $$<HTMLButtonElement>('[data-step-by]', box).forEach((b) =>
    b.addEventListener('click', () => {
      set(Number(input.value) + Number(b.dataset.stepBy));
      update();
    }),
  );
});

// A kind of session sets the usual number of people (until the visitor sets it)
let peopleTouched = false;
$$('[data-stepper="people"] button', form).forEach((b) => b.addEventListener('click', () => (peopleTouched = true)));
$$<HTMLInputElement>('input[name="shoot"]', form).forEach((r) =>
  r.addEventListener('change', () => {
    if (!peopleTouched) steppers.get('people')!(DEFAULT_PEOPLE[r.value as Shoot]);
    update();
  }),
);

// Packages are presets: they fill in places, photos, outfits and the film
function applyPreset(id: string) {
  const p = PRESETS[id as Preset];
  if (!p) return;
  steppers.get('locations')!(p.locations);
  steppers.get('outfits')!(p.outfits);
  check('photos', String(p.photos));
  $<HTMLInputElement>('input[name="video"]', form).checked = p.video;
}
$$<HTMLButtonElement>('[data-preset]', form).forEach((b) =>
  b.addEventListener('click', () => {
    applyPreset(b.dataset.preset!);
    update();
  }),
);

const sum = {
  shoot: $('[data-sum-shoot]', form),
  date: $('[data-sum-date]', form),
  light: $('[data-sum-light]', form),
  people: $('[data-sum-people]', form),
  duration: $('[data-sum-duration]', form),
  lines: $('[data-sum-lines]', form),
  price: $('[data-sum-price]', form),
  ticket: $('[data-ticket]', form),
  liveTotal: $('[data-live-total]', form),
  live: $('.live', form),
  durationLive: $('[data-duration]', form),
  proposal: $('[data-proposal-note]', form),
  dawn: $('[data-dawn-note]', form),
};
const sendEmail = $<HTMLAnchorElement>('[data-send-email]', form);
const sendWa = form.querySelector<HTMLAnchorElement>('[data-send-wa]');
const C = S.custom;
const eur = (n: number) =>
  new Intl.NumberFormat(S.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const hours = (minutes: number) => {
  const h = Math.floor(minutes / 60).toLocaleString(S.locale);
  return (minutes % 60 ? C.hourHalf : C.hour).replace('{h}', h);
};

// The live total rolls to its new value instead of jumping
let shown = 0;
let target = 0;
let rolling = 0;
function rollTo(total: number) {
  target = total;
  if (!shown || reduceMotion) {
    shown = total;
    sum.liveTotal.textContent = eur(total);
    return;
  }
  cancelAnimationFrame(rolling);
  const from = shown;
  const start = performance.now();
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / 450);
    shown = Math.round(from + (target - from) * (1 - (1 - k) ** 3));
    sum.liveTotal.textContent = eur(shown);
    if (k < 1) rolling = requestAnimationFrame(tick);
  };
  rolling = requestAnimationFrame(tick);
}

function update() {
  const data = new FormData(form);
  const shoot = String(data.get('shoot') || 'street') as Shoot;
  const choice: Choice = {
    shoot,
    locations: Number(data.get('locations') || 1),
    photos: Number(data.get('photos') || 20),
    people: Number(data.get('people') || 1),
    light: String(data.get('light') || 'golden'),
    video: data.has('video'),
    express: data.has('express'),
    outfits: Number(data.get('outfits') || 0),
  };
  const q = quote(choice);
  const flexible = data.has('flexible');
  const ymd = String(data.get('date') || parisDate(new Date(now.getTime() + DAY)));
  const light = choice.light as Light;
  const name = String(data.get('name') || '').trim();
  const contact = String(data.get('contact') || '').trim();
  const lang = String(data.get('lang') || '');
  const note = String(data.get('note') || '').trim();

  const w = windows(sunDay(noonOf(ymd)));
  for (const [key, [a, b]] of Object.entries(w)) {
    $(`[data-light-time="${key}"]`, form).textContent = `${time(a)}–${time(b)}`;
  }
  const dateLabel = flexible
    ? C.flexibleValue
    : noonOf(ymd).toLocaleDateString(S.locale, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });
  const [from, to] = w[light];
  const comma = S.locale.startsWith('fa') ? '، ' : ', ';
  const lightLabel = flexible ? S.names[light] : `${S.names[light]}${comma}${time(from)}–${time(to)}`;

  // live parts
  rollTo(q.total);
  sum.live.classList.toggle('hidden', step === panes.length - 1);
  sum.durationLive.textContent = hours(q.minutes);
  sum.proposal.hidden = shoot !== 'proposal';
  sum.dawn.hidden = light !== 'dawn';
  dates.classList.toggle('off', flexible);
  $$<HTMLButtonElement>('[data-preset]', form).forEach((b) => {
    const p = PRESETS[b.dataset.preset as Preset];
    b.classList.toggle(
      'on',
      p.locations === choice.locations && p.photos === choice.photos && p.outfits === choice.outfits && p.video === choice.video,
    );
  });

  // summary
  const lineLabel = (key: string) =>
    (C.lines as Record<string, string>)[key].replace('{n}', choice.photos.toLocaleString(S.locale));
  sum.shoot.textContent = C.shoots[shoot].name;
  sum.date.textContent = dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
  sum.light.textContent = lightLabel;
  sum.people.textContent = choice.people.toLocaleString(S.locale);
  sum.duration.textContent = hours(q.minutes);
  sum.lines.replaceChildren(
    ...q.lines.map((l) => {
      const li = document.createElement('li');
      const a = document.createElement('span');
      const b = document.createElement('span');
      a.textContent = lineLabel(l.key);
      b.textContent = eur(l.amount);
      li.append(a, b);
      return li;
    }),
  );
  sum.price.textContent = eur(q.total);
  sum.ticket.className = `ticket plate plate-${light}`;

  const summary = [
    `${C.shootLabel}: ${C.shoots[shoot].name}`,
    `${C.locationsSum}: ${choice.locations.toLocaleString(S.locale)}`,
    `${lineLabel('photos')}`,
    `${S.peopleLabel.replace(/[?؟]$/, '')}: ${choice.people.toLocaleString(S.locale)}`,
    ...q.lines.filter((l) => ['video', 'express', 'outfits', 'dawn'].includes(l.key)).map((l) => `+ ${lineLabel(l.key)}`),
    `${dateLabel} · ${lightLabel}`,
    `${C.durationLabel}: ${hours(q.minutes)}`,
    lang ? `${C.langLabel}: ${S.langNames[lang]}` : '',
  ]
    .filter(Boolean)
    .map((line) => `• ${line}`)
    .join('\n');
  const body = S.message
    .replace('{summary}', summary)
    .replace('{price}', eur(q.total))
    .replace('{note}', note)
    .replace('{name}', name)
    .replace('{contact}', contact)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  sendEmail.href = `mailto:${S.email}?subject=${encodeURIComponent(`${S.subject} — ${C.shoots[shoot].name}`)}&body=${encodeURIComponent(body)}`;
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
    applyPreset(b.dataset.package ?? '');
    check('light', b.dataset.light);
    go(0);
    // a soft flash, like a camera's shutter, then the form
    if (reduceMotion) return sheet.showModal();
    const flash = document.createElement('div');
    flash.className = 'shutter';
    flash.addEventListener('animationend', () => flash.remove());
    document.body.append(flash);
    setTimeout(() => sheet.showModal(), 110);
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
    applyPreset(params.get('book') || '');
    go(0);
    sheet.showModal();
    history.replaceState(null, '', location.pathname + location.hash);
  }
}
