// After the opening pass, a soft light stays in the hero and follows the visitor, like a reflector held by
// a photographer: the mouse on a computer, the tilt of the phone on a phone (iPhone asks for permission on
// the first tap in the hero; until then, and whenever nothing moves for a while, the light drifts slowly
// around the logo). Near the logo, the logo's own light (LightLogo) catches it.
// Only transform and opacity change, and nothing runs while the hero is off screen.

const LOGO_POWER = 0.5; // how bright the logo gets with the light right on it
const IDLE = 3500; // ms without movement before the light drifts by itself

export function followLight(hero: HTMLElement, logo: HTMLElement, glow: HTMLElement) {
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let lastInput = -Infinity;
  let tilt: { beta: number; gamma: number } | null = null;
  let tiltZero: { beta: number; gamma: number } | null = null;
  let running = false;
  let visible = true;
  let last = 0;
  let power = 0;
  let w = 0;
  let h = 0;
  let lx = 0;
  let ly = 0;
  let lw = 0;
  let lh = 0;

  const measure = () => {
    const hr = hero.getBoundingClientRect();
    const lr = logo.getBoundingClientRect();
    w = hr.width;
    h = hr.height;
    lx = lr.left - hr.left;
    ly = lr.top - hr.top;
    lw = lr.width;
    lh = lr.height;
  };
  measure();
  x = tx = lx + lw / 2;
  y = ty = ly + lh / 2;
  addEventListener('resize', measure, { passive: true });

  // the computer: follow the mouse
  hero.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      const hr = hero.getBoundingClientRect();
      tx = e.clientX - hr.left;
      ty = e.clientY - hr.top;
      lastInput = performance.now();
    },
    { passive: true },
  );

  // the phone: follow the tilt, measured from how the phone was held at first
  const onTilt = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    tilt = { beta: e.beta, gamma: e.gamma };
    tiltZero ??= tilt;
  };
  const listenTilt = () => addEventListener('deviceorientation', onTilt, { passive: true });
  const DOE = (window as any).DeviceOrientationEvent;
  if (matchMedia('(pointer: coarse)').matches && DOE) {
    if (typeof DOE.requestPermission === 'function') {
      const ask = (e: Event) => {
        if ((e.target as Element).closest('a, button')) return;
        hero.removeEventListener('click', ask);
        DOE.requestPermission()
          .then((state: string) => state === 'granted' && listenTilt())
          .catch(() => {});
      };
      hero.addEventListener('click', ask);
    } else listenTilt();
  }

  const frame = (now: number) => {
    if (!running) return;
    const dt = Math.min(64, now - (last || now));
    last = now;

    if (tilt && tiltZero) {
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      tx = lx + lw / 2 + clamp((tilt.gamma - tiltZero.gamma) / 25) * w * 0.42;
      ty = ly + lh / 2 + clamp((tilt.beta - tiltZero.beta) / 25) * h * 0.32;
      if (Math.abs(tilt.gamma - tiltZero.gamma) + Math.abs(tilt.beta - tiltZero.beta) > 1) lastInput = now;
    }
    // nothing moving: drift slowly in a wide loop around the logo
    const idle = now - lastInput > IDLE;
    if (idle) {
      const s = now / 1000;
      tx = lx + lw / 2 + Math.sin(s * 0.31) * lw * 0.62;
      ty = ly + lh / 2 + Math.sin(s * 0.47 + 1) * lh * 0.9;
    }

    // ease towards the target, slower when drifting
    const k = 1 - Math.exp(-dt / (idle ? 900 : 220));
    x += (tx - x) * k;
    y += (ty - y) * k;
    power = Math.min(1, power + dt / 1400); // fade in after the opening pass

    glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    glow.style.opacity = (power * 0.9).toFixed(3);

    // the logo catches the light the closer it is (distance in logo widths)
    const gx = x - lx;
    const gy = y - ly;
    const dx = (gx - lw / 2) / lw;
    const dy = (gy - lh / 2) / lw;
    const near = Math.max(0, 1 - Math.hypot(dx, dy) / 0.85);
    logo.style.setProperty('--gx', `${gx.toFixed(1)}px`);
    logo.style.setProperty('--gy', `${gy.toFixed(1)}px`);
    logo.style.setProperty('--power', (power * LOGO_POWER * near * near * (3 - 2 * near)).toFixed(3));

    requestAnimationFrame(frame);
  };
  const run = () => {
    const should = visible && document.visibilityState === 'visible';
    if (should === running) return;
    running = should;
    if (running) {
      last = 0;
      measure();
      requestAnimationFrame(frame);
    }
  };
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  }).observe(hero);
  document.addEventListener('visibilitychange', run);
  run();
}
