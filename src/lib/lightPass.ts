// Moves the light across a LightLogo: an arc from lower left, over the logo, to lower right, rising in
// power as it enters and fading as it leaves. Only CSS variables that drive transform and opacity change.

interface Options {
  /** keep passing until `until()` is true at the end of a pass (the splash, waiting for the page) */
  until?: () => boolean;
  /** brighten the logo to full silver during the second half of the pass (the hero; single pass) */
  reveal?: boolean;
  /** stop early, e.g. when the splash is dismissed */
  cancelled?: () => boolean;
  onDone?: () => void;
}

const PASS = 2600;
const smooth = (x: number) => x * x * (3 - 2 * x);

export function lightPass(logo: HTMLElement, { until, reveal = false, cancelled, onDone }: Options = {}) {
  const box = logo.getBoundingClientRect();
  const startBase = parseFloat(getComputedStyle(logo).getPropertyValue('--base')) || 0.35;
  logo.dataset.light = 'passing';
  const start = performance.now() + 250;
  let passes = 0;

  const frame = (now: number) => {
    if (cancelled?.()) return;
    const elapsed = Math.max(0, now - start);
    // only ever stop at the end of a pass, never mid-way
    let ended = false;
    if (Math.floor(elapsed / PASS) > passes) {
      passes = Math.floor(elapsed / PASS);
      ended = !until || until();
    }
    const t = ended ? 1 : (elapsed % PASS) / PASS;
    const p = smooth(t);
    logo.style.setProperty('--gx', `${((-12 + 124 * p) / 100) * box.width}px`);
    logo.style.setProperty('--gy', `${((78 - 105 * Math.sin(Math.PI * p)) / 100) * box.height}px`);
    logo.style.setProperty('--power', (Math.sin(Math.PI * Math.min(1, t * 1.1)) ** 0.6).toFixed(3));
    if (reveal) {
      const k = smooth(Math.min(1, Math.max(0, (t - 0.4) / 0.55)));
      logo.style.setProperty('--base', (startBase + (1 - startBase) * k).toFixed(3));
    }
    if (ended) {
      logo.style.setProperty('--power', '0');
      if (reveal) logo.dataset.light = 'done';
      onDone?.();
      return;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
