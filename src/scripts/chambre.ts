// La Chambre Noire contact sheet (components/Chambre.astro): turn on the light table, open a negative to develop
// it, circle favourite proofs, pick a direction for each, add a note, then send the selection by email.
// Choices stay in this browser.

type Direction = 'couleur' | 'noir' | 'libre';
type Pick = { marked: boolean; dir: Direction; note: string; developed: boolean };
type Strings = Record<string, string> & {
  directions: Record<Direction, { name: string; text: string }>;
  quota: number;
  extraPrice: number;
};

export function initChambre() {
  const main = document.querySelector<HTMLElement>('[data-chambre]');
  if (!main) return;
  const S: Strings = JSON.parse(main.dataset.chambre!);
  const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];
  const rtl = document.dir === 'rtl';
  const tiles = $$('.tile', main);
  const key = `chambre-sheet-${S.session}`;

  const picks = new Map<string, Pick>();
  let saved: Record<string, Pick> = {};
  try {
    saved = JSON.parse(localStorage.getItem(key) || '{}');
  } catch {}
  tiles.forEach((t) => picks.set(t.dataset.photo!, { marked: false, dir: 'libre', note: '', developed: false, ...saved[t.dataset.photo!] }));
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(Object.fromEntries(picks)));
    } catch {}
  };

  /* ---------- the entrance: the safelight, then the light table ---------- */
  const safelight = $('[data-safelight]');
  const lit = () => {
    try {
      return sessionStorage.getItem(`${key}-lit`) === '1';
    } catch {
      return false;
    }
  };
  if (lit()) safelight.classList.add('off');
  $('[data-lights]', safelight).addEventListener('click', () => {
    safelight.classList.add('off');
    try {
      sessionStorage.setItem(`${key}-lit`, '1');
    } catch {}
  });

  const num = (n: number) => n.toLocaleString(S.locale);
  const eur = (n: number) =>
    new Intl.NumberFormat(S.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  /* ---------- the contact sheet and the bar ---------- */
  const quota = $('[data-quota]');
  const extra = $('[data-extra]');
  const send = $<HTMLAnchorElement>('[data-send]');
  const letUs = $<HTMLAnchorElement>('[data-let-us]');

  function paintTile(t: HTMLElement) {
    const p = picks.get(t.dataset.photo!)!;
    t.classList.toggle('is-marked', p.marked);
    t.classList.toggle('is-developed', p.developed);
    $('.tile-dir', t).textContent = S.directions[p.dir].name;
  }

  function paintBar() {
    const marked = tiles.filter((t) => picks.get(t.dataset.photo!)!.marked);
    const over = Math.max(0, marked.length - S.quota);
    quota.textContent = S.quotaText.replace('{n}', num(Math.min(marked.length, S.quota))).replace('{total}', num(S.quota));
    extra.hidden = over === 0;
    extra.textContent = S.extraText.replace('{n}', num(over)).replace('{price}', eur(over * S.extraPrice));
    send.setAttribute('aria-disabled', String(marked.length === 0));

    const lines = marked.map((t) => {
      const p = picks.get(t.dataset.photo!)!;
      return `• ${t.dataset.file} — ${S.directions[p.dir].name}${p.note ? ` — ${p.note}` : ''}`;
    });
    const subject = S.subject.replace('{name}', S.name);
    const body = `${S.mailIntro}\n${lines.join('\n')}${over ? `\n\n${extra.textContent}` : ''}`;
    send.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    letUs.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(S.mailLetUs)}`;
  }

  tiles.forEach(paintTile);
  paintBar();

  /* ---------- the loupe ---------- */
  const viewer = $<HTMLDialogElement>('[data-viewer]');
  const stage = $('[data-stage]', viewer);
  const frame = $('[data-v-frame]', viewer);
  const img = $<HTMLImageElement>('[data-v-img]', viewer);
  const neg = $<HTMLImageElement>('[data-v-neg]', viewer);
  const index = $('[data-index]', viewer);
  const mark = $<HTMLButtonElement>('[data-mark]', viewer);
  const markLabel = $('[data-mark-label]', viewer);
  const dirs = $('[data-dirs]', viewer);
  const dirButtons = $$<HTMLButtonElement>('[data-dir]', viewer);
  const note = $<HTMLInputElement>('[data-note]', viewer);
  let current = 0;

  const pick = () => picks.get(tiles[current].dataset.photo!)!;

  function show(i: number) {
    current = (i + tiles.length) % tiles.length;
    const src = $<HTMLImageElement>('img', tiles[current]).getAttribute('src')!.replace('-480.webp', '-1280.webp');
    img.src = src;
    neg.src = src;
    // a negative develops the first time it is opened; afterwards it opens already developed
    const p = pick();
    frame.classList.toggle('instant', p.developed);
    frame.classList.toggle('is-developed', p.developed);
    if (!p.developed) {
      void frame.offsetWidth;
      frame.classList.remove('instant');
      setTimeout(() => frame.classList.add('is-developed'), 250);
      p.developed = true;
      paintTile(tiles[current]);
      save();
    }
    index.textContent = `${num(current + 1)} / ${num(tiles.length)}`;
    paintViewer();
  }

  function paintViewer() {
    const p = pick();
    frame.classList.toggle('is-marked', p.marked);
    mark.setAttribute('aria-pressed', String(p.marked));
    markLabel.textContent = p.marked ? S.marked : S.mark;
    dirs.hidden = !p.marked;
    note.hidden = !p.marked;
    dirButtons.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.dir === p.dir)));
    note.value = p.note;
  }

  function changed() {
    paintViewer();
    paintTile(tiles[current]);
    paintBar();
    save();
  }

  $$<HTMLButtonElement>('[data-open]', main).forEach((b) =>
    b.addEventListener('click', () => {
      show(Number(b.dataset.open));
      viewer.showModal();
    }),
  );
  $('[data-close]', viewer).addEventListener('click', () => viewer.close());
  $$<HTMLButtonElement>('[data-step]', viewer).forEach((b) =>
    b.addEventListener('click', () => show(current + Number(b.dataset.step))),
  );
  viewer.addEventListener('keydown', (e) => {
    if (e.target === note) return;
    if (e.key === 'ArrowRight') show(current + (rtl ? -1 : 1));
    if (e.key === 'ArrowLeft') show(current + (rtl ? 1 : -1));
  });

  mark.addEventListener('click', () => {
    pick().marked = !pick().marked;
    changed();
  });
  dirButtons.forEach((b) =>
    b.addEventListener('click', () => {
      pick().dir = b.dataset.dir as Direction;
      changed();
    }),
  );
  note.addEventListener('change', () => {
    pick().note = note.value.trim();
    changed();
  });

  // Swipe to the next proof; a double tap circles it
  let startX = 0;
  let startY = 0;
  let lastTap = 0;
  stage.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
  });
  stage.addEventListener('pointerup', (e) => {
    if ((e.target as Element).closest('button')) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      // a swipe towards the start edge shows the next proof
      show(current + (dx < 0 !== rtl ? 1 : -1));
      return;
    }
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      const now = performance.now();
      if (now - lastTap < 320) {
        pick().marked = !pick().marked;
        changed();
        lastTap = 0;
      } else lastTap = now;
    }
  });
}
