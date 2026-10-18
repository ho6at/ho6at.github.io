"""Build the reveal-time map for the opening splash (src/components/Splash.astro).

Each pixel of the logo gets the moment it should appear, stored as brightness (white = first):
  - pixels of the "L" appear when the pen, moving along PEN_PATH, reaches the point of the path
    nearest to them, so where two strokes cross, the later stroke stays hidden until its turn;
  - the rest of the word appears afterwards, swept from left to right.

Run: python3 scripts/splash-map.py   (needs Pillow)
"""

import math
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'public/brand/luminoor-logo.png'
OUT = ROOT / 'public/brand/luminoor-splash-map.png'

# The L's stroke, traced by hand over the logo in its own pixels (556 x 166), in writing order.
PEN_PATH = (
    'M137,47 C133,40 128,34 120,31 C105,25 80,25 66,36 C55,45 58,62 75,68 C92,74 120,70 140,60 '
    'C158,50 175,30 181,15 C185,5 178,1 172,4 C160,10 140,28 125,42 C108,60 90,78 75,92 '
    'C67,99 62,103 55,107 C45,112 30,117 15,116 C2,114 0,103 8,97 C16,90 32,92 45,97 '
    'C55,101 62,106 70,110 C88,120 105,128 125,128 C145,128 160,118 158,106 C156,95 140,92 128,95 '
    'C120,97 115,99 112,101'
)
# Approximate half-thickness of the stroke along each curve of PEN_PATH, in pixels. A pixel goes to the
# point of the path that is nearest relative to the local thickness, so where a thin stroke passes
# through the thick stem, the stem's pixels stay with the stem (clean crossings).
HALF_WIDTHS = [2, 2.5, 4, 2.5, 2.5, 4, 9, 9, 5, 4, 4, 3.5, 4, 5, 5, 2.5, 2]
L_SHARE = 0.7  # the L takes the first 70% of the timeline; the rest of the word the remaining 30%
SWEEP_FROM_X = 150


def is_l_pixel(x, y):
    """The L ends where the "u" begins (the u starts around x = 165 below y = 50)."""
    return x < 192 and not (x > 163 and y > 52)


def sample_path(d, steps=60):
    nums = [float(n) for n in re.findall(r'-?\d+(?:\.\d+)?', d)]
    x0, y0 = nums[0], nums[1]
    points = [(x0, y0)]
    widths = [HALF_WIDTHS[0]]
    rest = nums[2:]
    assert len(rest) // 6 == len(HALF_WIDTHS), 'one half-width per curve'
    for i in range(0, len(rest), 6):
        x1, y1, x2, y2, x3, y3 = rest[i : i + 6]
        for s in range(1, steps + 1):
            t = s / steps
            u = 1 - t
            points.append(
                (
                    u**3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t**3 * x3,
                    u**3 * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t**3 * y3,
                )
            )
            widths.append(HALF_WIDTHS[i // 6])
        x0, y0 = x3, y3
    # cumulative length along the path, normalised to 0..1
    lengths = [0.0]
    for (ax, ay), (bx, by) in zip(points, points[1:]):
        lengths.append(lengths[-1] + math.hypot(bx - ax, by - ay))
    total = lengths[-1]
    return [(px, py, s / total, w) for (px, py), s, w in zip(points, lengths, widths)]


def main():
    logo = Image.open(LOGO).convert('RGBA')
    w, h = logo.size
    alpha = logo.getchannel('A').load()
    samples = sample_path(PEN_PATH)

    cell = 8
    grid = {}
    for px, py, s, hw in samples:
        grid.setdefault((int(px // cell), int(py // cell)), []).append((px, py, s, hw))

    def nearest_progress(x, y):
        cx, cy = int(x // cell), int(y // cell)
        near = []
        for gx in range(cx - 3, cx + 4):
            for gy in range(cy - 3, cy + 4):
                for px, py, s, hw in grid.get((gx, gy), ()):
                    near.append((math.hypot(px - x, py - y) / hw, s))
        if not near:
            return 1.0
        dist, s = min(near)
        # Inside a crossing (the pixel also lies within another, distant part of the stroke): it waits for
        # the later pass, so no piece of the second stroke appears before the pen gets there.
        other = [o for o in near if abs(o[1] - s) > 0.08 and o[0] <= 1.0]
        if other and dist <= 1.0:
            s = max(s, max(o[1] for o in other))
        return s

    out = Image.new('L', (w, h), 0)
    pixels = out.load()
    for y in range(h):
        for x in range(w):
            if alpha[x, y] == 0:
                t = 1.0
            elif is_l_pixel(x, y):
                t = L_SHARE * nearest_progress(x + 0.5, y + 0.5)
            else:
                t = L_SHARE + 0.02 + (1 - L_SHARE - 0.02) * max(0.0, (x - SWEEP_FROM_X) / (w - SWEEP_FROM_X))
            pixels[x, y] = round(255 * (1 - min(1.0, t)))
    out.save(OUT, optimize=True)
    print(f'wrote {OUT.relative_to(ROOT)} ({w}x{h})')


if __name__ == '__main__':
    main()
