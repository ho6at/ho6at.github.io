// La Chambre Noire (components/Chambre.astro): keep photos, choose a style and its strength for each, compare
// with the original by holding the photo, then send the selection by email. Choices stay in this browser.

type Look = 'naturel' | 'noir' | 'pellicule';
type Pick = { kept: boolean; look: Look; amount: number; note: string };
type Strings = Record<string, string> & {
  looks: Record<Look, { name: string; text: string }>;
  quota: number;
  extraPrice: number;
  quotaText: string;
  extraText: string;
};

export function initChambre() {
  const main = document.querySelector<HTMLElement>('[data-chambre]');
  if (!main) return;
  const S: Strings = JSON.parse(main.dataset.chambre!);
  const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];
  const rtl = document.dir === 'rtl';
  const tiles = $$('.tile', main);
  const key = `chambre-${S.session}`;

  const picks = new Map<string, Pick>();
  let saved: Record<string, Pick> = {};
  try {
    saved = JSON.parse(localStorage.getItem(key) || '{}');
  } catch {}
  tiles.forEach((t) => picks.set(t.dataset.photo!, { kept: false, look: 'naturel', amount: 100, note: '', ...saved[t.dataset.photo!] }));
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(Object.fromEntries(picks)));
    } catch {}
  };

  const num = (n: number) => n.toLocaleString(S.locale);
  const eur = (n: number) =>
    new Intl.NumberFormat(S.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  /* ---------- the grid and the bar ---------- */
  const quota = $('[data-quota]');
  const extra = $('[data-extra]');
  const send = $<HTMLAnchorElement>('[data-send]');
  const letUs = $<HTMLAnchorElement>('[data-let-us]');

  function paintTile(t: HTMLElement) {
    const p = picks.get(t.dataset.photo!)!;
    t.dataset.look = p.look;
    t.classList.toggle('is-kept', p.kept);
    $<HTMLImageElement>('.top', t).style.opacity = String(p.amount / 100);
    $('.tile-look', t).textContent = S.looks[p.look].name;
  }

  function paintBar() {
    const kept = tiles.filter((t) => picks.get(t.dataset.photo!)!.kept);
    const over = Math.max(0, kept.length - S.quota);
    quota.textContent = S.quotaText.replace('{n}', num(Math.min(kept.length, S.quota))).replace('{total}', num(S.quota));
    extra.hidden = over === 0;
    extra.textContent = S.extraText.replace('{n}', num(over)).replace('{price}', eur(over * S.extraPrice));
    send.setAttribute('aria-disabled', String(kept.length === 0));

    const lines = kept.map((t) => {
      const p = picks.get(t.dataset.photo!)!;
      return `• ${t.dataset.file} — ${S.looks[p.look].name} ${p.amount}%${p.note ? ` — ${p.note}` : ''}`;
    });
    const subject = S.subject.replace('{name}', S.name);
    const body = `${S.mailIntro}\n${lines.join('\n')}${over ? `\n\n${extra.textContent}` : ''}`;
    send.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    letUs.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(S.mailLetUs)}`;
  }

  tiles.forEach(paintTile);
  paintBar();

  /* ---------- the viewer ---------- */
  const viewer = $<HTMLDialogElement>('[data-viewer]');
  const stage = $('[data-stage]', viewer);
  const vBase = $<HTMLImageElement>('[data-v-base]', viewer);
  const vTop = $<HTMLImageElement>('[data-v-top]', viewer);
  const index = $('[data-index]', viewer);
  const strength = $<HTMLInputElement>('[data-strength]', viewer);
  const note = $<HTMLInputElement>('[data-note]', viewer);
  const keep = $<HTMLButtonElement>('[data-keep]', viewer);
  const keepLabel = $('[data-keep-label]', viewer);
  const lookButtons = $$<HTMLButtonElement>('[data-look]', viewer).filter((b) => b.classList.contains('v-look'));
  let current = 0;

  const pick = () => picks.get(tiles[current].dataset.photo!)!;

  function show(i: number) {
    current = (i + tiles.length) % tiles.length;
    const t = tiles[current];
    const src = $<HTMLImageElement>('.base', t).getAttribute('src')!.replace('-480.webp', '-1280.webp');
    vBase.src = src;
    vTop.src = src;
    index.textContent = `${num(current + 1)} / ${num(tiles.length)}`;
    paintViewer();
  }

  function paintViewer() {
    const p = pick();
    stage.dataset.look = p.look;
    vTop.style.opacity = String(p.amount / 100);
    strength.value = String(p.amount);
    note.value = p.note;
    lookButtons.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.look === p.look)));
    keep.setAttribute('aria-pressed', String(p.kept));
    keepLabel.textContent = p.kept ? S.kept : S.keep;
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

  lookButtons.forEach((b) =>
    b.addEventListener('click', () => {
      pick().look = b.dataset.look as Look;
      changed();
    }),
  );
  strength.addEventListener('input', () => {
    pick().amount = Number(strength.value);
    vTop.style.opacity = String(pick().amount / 100);
  });
  strength.addEventListener('change', changed);
  note.addEventListener('change', () => {
    pick().note = note.value.trim();
    changed();
  });
  keep.addEventListener('click', () => {
    pick().kept = !pick().kept;
    changed();
  });

  // Swipe to the next photo; press and hold to see the original
  let startX = 0;
  let startY = 0;
  let holding = 0;
  let moved = false;
  stage.addEventListener('pointerdown', (e) => {
    if ((e.target as Element).closest('button')) return;
    startX = e.clientX;
    startY = e.clientY;
    moved = false;
    holding = window.setTimeout(() => {
      if (!moved) vTop.style.opacity = '0';
    }, 220);
  });
  stage.addEventListener('pointermove', (e) => {
    if (Math.abs(e.clientX - startX) > 10 || Math.abs(e.clientY - startY) > 10) moved = true;
  });
  const release = (e: PointerEvent) => {
    clearTimeout(holding);
    vTop.style.opacity = String(pick().amount / 100);
    const dx = e.clientX - startX;
    if (moved && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - startY)) {
      // a swipe towards the start edge shows the next photo
      show(current + (dx < 0 !== rtl ? 1 : -1));
    }
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', () => {
    clearTimeout(holding);
    vTop.style.opacity = String(pick().amount / 100);
  });
}
