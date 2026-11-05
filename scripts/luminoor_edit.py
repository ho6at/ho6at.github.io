#!/usr/bin/env python3
"""Luminoor edit: the house black-and-white look, made with classic adjustments only (no AI, no generated pixels).

The look was measured from the site's gallery (true blacks, clean whites, local contrast, a faint warmth rising
toward the highlights, very fine grain, no glow) and is applied at 60% by default over a plain B&W conversion.

Usage
  python3 scripts/luminoor_edit.py PHOTO [PHOTO ...] [--strength 0.6] [--instagram] [--site ID] [--out DIR]

  (no flag)        edited full frame (2:3 or whatever the photo is), JPEG, no signature   -> photos/_edited/
  --instagram      4:5 crop + signature centred at the bottom, JPEG                      -> photos/_edited/instagram/
                   --crop 0..1 moves the 4:5 crop (0 = keep the top, 1 = keep the bottom; default 0.5)
                   --sig-y 0..1 lifts the signature from the bottom edge (default 0.035)
  --site ID        the site's gallery files for one photo: public/photos/ID-{480,960,W}.webp + ID-blur + ID-soft,
                   and prints the line to add to src/lib/photos.ts (focus square still to check by eye)
  --strength S     0..1, how much of the look to apply (0.6 is the agreed default)

Originals are never modified. The signature is read from photos/_brand/signature-ho6at.png (kept out of git).
Needs Pillow:  python3 -m pip install --user pillow
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SIGNATURE = ROOT / 'photos' / '_brand' / 'signature-ho6at.png'
EDITED = ROOT / 'photos' / '_edited'
PUBLIC_PHOTOS = ROOT / 'public' / 'photos'


def _curve(points):
    """A smooth tone curve through (in, out) points, as a 256-entry lookup table."""
    lut = []
    for x in range(256):
        for (x0, y0), (x1, y1) in zip(points, points[1:]):
            if x0 <= x <= x1:
                t = (x - x0) / (x1 - x0) if x1 > x0 else 0
                t = t * t * (3 - 2 * t) * 0.5 + t * 0.5
                lut.append(int(round(y0 + (y1 - y0) * t)))
                break
    return lut


def _warm(gray: Image.Image) -> Image.Image:
    """Faint warmth that rises with brightness (site measurement: R-B about 6 in mids, 8 in highlights)."""
    r = gray.point(lambda v: min(255, v + int(3 * v / 255 + 0.5)))
    g = gray.point(lambda v: min(255, v + int(0.6 * v / 255 + 0.5)))
    b = gray.point(lambda v: max(0, v - int(4 * v / 255 + 0.5)))
    return Image.merge('RGB', (r, g, b))


def _bw(img: Image.Image) -> Image.Image:
    # red and green weighted equally: skin stays luminous, skies and greens don't go muddy
    return img.convert('L', (0.45, 0.45, 0.10, 0))


def full_look(img: Image.Image) -> Image.Image:
    """The look at 100%: per-photo levels, low-key S-curve, clarity, fine sharpening, warmth, fine grain."""
    gray = _bw(img)
    hist = gray.histogram()
    total = sum(hist)

    def pct(f):
        c = 0
        for i, v in enumerate(hist):
            c += v
            if c >= total * f:
                return i
        return 255

    lo, hi = pct(0.005), pct(0.997)
    gray = gray.point(lambda v: max(0, min(255, int((v - lo) * 246 / max(1, hi - lo) + 2))))
    gray = gray.point(_curve([(0, 0), (40, 18), (100, 72), (160, 148), (215, 214), (255, 250)]))
    w = img.width
    gray = gray.filter(ImageFilter.UnsharpMask(radius=max(8, w // 140), percent=45, threshold=0))
    gray = gray.filter(ImageFilter.UnsharpMask(radius=1.0, percent=80, threshold=2))
    out = _warm(gray)
    noise = Image.effect_noise(out.size, 12).convert('L')
    grain = Image.merge('RGB', (noise, noise, noise))
    return Image.blend(out, ImageChops.overlay(out, grain), 0.06)


def luminoor(img: Image.Image, strength: float = 0.6) -> Image.Image:
    """The look at a given strength, blended over a plain warm B&W of the same photo (like an opacity slider)."""
    img = img.convert('RGB')
    base = _warm(_bw(img))
    return Image.blend(base, full_look(img), max(0.0, min(1.0, strength)))


def crop_4x5(img: Image.Image, anchor: float = 0.5) -> Image.Image:
    w, h = img.size
    ch = int(w * 5 / 4)
    if ch < h:
        top = int((h - ch) * anchor)
        return img.crop((0, top, w, top + ch))
    cw = int(h * 4 / 5)
    left = (w - cw) // 2
    return img.crop((left, 0, left + cw, h))


def add_signature(img: Image.Image, lift: float = 0.035) -> Image.Image:
    if not SIGNATURE.exists():
        sys.exit(f'Signature not found: {SIGNATURE}')
    w, h = img.size
    sig = Image.open(SIGNATURE).convert('RGBA')
    sw = int(w * 0.22)
    sig = sig.resize((sw, int(sig.height * sw / sig.width)), Image.LANCZOS)
    sig.putalpha(sig.split()[3].point(lambda v: int(v * 0.85)))
    out = img.convert('RGBA')
    out.alpha_composite(sig, ((w - sw) // 2, h - sig.height - int(h * lift)))
    return out.convert('RGB')


def site_files(img: Image.Image, photo_id: str) -> str:
    """Write the gallery set the site expects and return the photos.ts line."""
    PUBLIC_PHOTOS.mkdir(parents=True, exist_ok=True)
    w, h = img.size
    largest = min(w, 1600)
    sizes = [480, 960, largest]
    for s in sizes:
        img.resize((s, round(h * s / w)), Image.LANCZOS).save(PUBLIC_PHOTOS / f'{photo_id}-{s}.webp', quality=82, method=6)
    img.resize((80, 120), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3.5)).save(
        PUBLIC_PHOTOS / f'{photo_id}-blur.webp', quality=60, method=6)
    img.resize((240, 360), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.6)).save(
        PUBLIC_PHOTOS / f'{photo_id}-soft.webp', quality=70, method=6)
    return (f"  {{ id: '{photo_id}', w: {w}, h: {h}, light: 'day', kind: 'solo', bw: true, "
            f"sizes: {sizes}, focus: [0.5, 0.45] }},")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('photos', nargs='+', type=Path)
    ap.add_argument('--strength', type=float, default=0.6)
    ap.add_argument('--instagram', action='store_true')
    ap.add_argument('--crop', type=float, default=0.5)
    ap.add_argument('--sig-y', type=float, default=0.035)
    ap.add_argument('--site', metavar='ID')
    ap.add_argument('--out', type=Path)
    a = ap.parse_args()
    if a.site and len(a.photos) != 1:
        sys.exit('--site takes exactly one photo')

    for p in a.photos:
        img = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
        edited = luminoor(img, a.strength)
        if a.site:
            print(site_files(edited, a.site))
            master = ROOT / 'photos' / f'{a.site}.png'
            edited.save(master)
            print(f'master: {master.relative_to(ROOT)}')
            continue
        if a.instagram:
            out_dir = a.out or EDITED / 'instagram'
            final = add_signature(crop_4x5(edited, a.crop), a.sig_y)
        else:
            out_dir = a.out or EDITED
            final = edited
        out_dir.mkdir(parents=True, exist_ok=True)
        dst = out_dir / f'{p.stem}.jpg'
        final.save(dst, quality=95, subsampling=0)  # a fresh file: no EXIF or GPS carried over
        print(dst)


if __name__ == '__main__':
    main()
