"""Remove the outer white background from PNG illustrations.

Uses PIL flood-fill from each corner so only the connected outer
white region becomes transparent. White areas inside the artwork
(browser content panels, page bodies, etc.) are preserved.
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

SENTINEL = (255, 0, 255)
WHITE_THRESH = 30


def make_transparent(in_path: Path, out_path: Path) -> None:
    img = Image.open(in_path).convert("RGBA")
    rgb = img.convert("RGB").copy()
    w, h = rgb.size

    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        r, g, b = rgb.getpixel(corner)
        if r > 230 and g > 230 and b > 230:
            ImageDraw.floodfill(rgb, corner, SENTINEL, thresh=WHITE_THRESH)

    rgb_pixels = rgb.load()
    out_pixels = img.load()
    for y in range(h):
        for x in range(w):
            if rgb_pixels[x, y] == SENTINEL:
                out_pixels[x, y] = (0, 0, 0, 0)

    img.save(out_path, format="PNG", optimize=True)


def main(argv: list[str]) -> int:
    for raw in argv[1:]:
        p = Path(raw)
        make_transparent(p, p)
        print(f"transparentized: {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
