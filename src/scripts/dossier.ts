// Le Dossier (components/Dossier.astro): a dark map of Paris that follows the sightings as they scroll by. The
// route draws itself up to the current sighting, the map glides there, and its pin lights up. The map library
// (MapLibre) and its tiles (OpenFreeMap) load on this page only; without them the sightings still read fine.

type LngLat = [number, number];
type Data = { stops: LngLat[]; segments: { metro: boolean; coords: LngLat[] }[] };

const MAPLIBRE = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
const STYLE = 'https://tiles.openfreemap.org/styles/dark';

export function initDossier() {
  const main = document.querySelector<HTMLElement>('[data-dossier]');
  const box = document.querySelector<HTMLElement>('[data-map]');
  if (!main || !box) return;
  const data: Data = JSON.parse(main.dataset.dossier!);
  const items = [...main.querySelectorAll<HTMLElement>('.sighting')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let map: any = null;
  let pins: HTMLElement[] = [];
  let drawn = 0; // how far along the route is drawn, in "stops" (0 = nothing, 1 = first stop, 1.5 = halfway to the second)
  let target = 0;
  let raf = 0;

  // the part of the route walked up to `upto` stops, as line features (walks and metro rides styled apart)
  const lengthOf = (c: LngLat[]) => c.slice(1).reduce((m, p, i) => m + Math.hypot(p[0] - c[i][0], p[1] - c[i][1]), 0);
  function sliceTo(coords: LngLat[], f: number): LngLat[] {
    if (f >= 1) return coords;
    const total = lengthOf(coords) * f;
    const out: LngLat[] = [coords[0]];
    let run = 0;
    for (let i = 1; i < coords.length; i++) {
      const [a, b] = [coords[i - 1], coords[i]];
      const seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (run + seg >= total) {
        const k = (total - run) / seg;
        out.push([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
        return out;
      }
      run += seg;
      out.push(b);
    }
    return out;
  }
  function routeTo(upto: number) {
    const features = data.segments
      .map((s, i) => {
        const f = Math.max(0, Math.min(1, upto - 1 - i));
        if (f <= 0) return null;
        return { type: 'Feature', properties: { metro: s.metro }, geometry: { type: 'LineString', coordinates: sliceTo(s.coords, f) } };
      })
      .filter(Boolean);
    return { type: 'FeatureCollection', features };
  }
  const allRoute = () => ({
    type: 'FeatureCollection',
    features: data.segments.map((s) => ({
      type: 'Feature',
      properties: { metro: s.metro },
      geometry: { type: 'LineString', coordinates: s.coords },
    })),
  });

  function animateRoute() {
    cancelAnimationFrame(raf);
    const from = drawn;
    const start = performance.now();
    const dur = still ? 0 : 1300;
    const tick = (now: number) => {
      const k = dur ? Math.min(1, (now - start) / dur) : 1;
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      drawn = from + (target - from) * e;
      map?.getSource('done')?.setData(routeTo(drawn));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function overview() {
    if (!map) return;
    const pts = data.segments.flatMap((s) => s.coords);
    const lng = pts.map((p) => p[0]);
    const lat = pts.map((p) => p[1]);
    map.fitBounds(
      [
        [Math.min(...lng), Math.min(...lat)],
        [Math.max(...lng), Math.max(...lat)],
      ],
      { padding: 40, duration: still ? 0 : 1400 },
    );
  }

  let active = -1;
  function activate(i: number) {
    if (i === active) return;
    active = i;
    items.forEach((el, k) => el.classList.toggle('on', k === i));
    pins.forEach((p, k) => p.classList.toggle('on', k === i));
    if (!map) return;
    if (i < 0) {
      target = 0;
      overview();
    } else {
      target = i + 1;
      map.flyTo({ center: data.stops[i], zoom: 15.4, duration: still ? 0 : 1700, essential: true });
    }
    animateRoute();
  }

  // the sighting in the middle of the screen is the current one
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.i));
      });
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  items.forEach((el) => io.observe(el));

  // load the map library, then the map
  const s = document.createElement('script');
  s.src = MAPLIBRE;
  s.async = true;
  s.onload = () => {
    const ml = (window as any).maplibregl;
    if (!ml) return;
    map = new ml.Map({
      container: box,
      style: STYLE,
      center: data.stops[0],
      zoom: 13.2,
      interactive: false,
      attributionControl: { compact: true },
    });
    map.on('load', () => {
      // a quieter city: no shop and transit icons
      for (const layer of map.getStyle().layers) {
        if (/poi|transit|aeroway/.test(layer.id)) map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
      map.addSource('all', { type: 'geojson', data: allRoute() });
      map.addSource('done', { type: 'geojson', data: routeTo(0) });
      map.addLayer({
        id: 'all',
        type: 'line',
        source: 'all',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#e6d6bd', 'line-opacity': 0.18, 'line-width': 2, 'line-dasharray': [1, 2] },
      });
      map.addLayer({
        id: 'done',
        type: 'line',
        source: 'done',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#e6d6bd',
          'line-width': ['case', ['get', 'metro'], 1.5, 3],
          'line-opacity': ['case', ['get', 'metro'], 0.5, 0.95],
        },
      });
      pins = data.stops.map((p, i) => {
        const el = document.createElement('div');
        el.className = 'pin';
        el.textContent = String(i + 1);
        new ml.Marker({ element: el }).setLngLat(p).addTo(map);
        return el;
      });
      const now = active;
      active = -2;
      activate(now);
    });
  };
  document.head.append(s);
}
