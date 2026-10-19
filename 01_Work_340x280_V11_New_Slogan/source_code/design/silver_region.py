"""Turn part of a 3D polished-gold lettering PNG into polished silver (same light, same bevel, same extrusion).

usage: python3 silver_region.py in.png out.png x0 x1 [y0 y1]   (x range in source pixels; optional y range, default whole height)
Luminance is kept, hue is removed, a slight cool tint and a contrast curve make it read as mirror silver;
the dark extrusion stays dark graphite. Alpha untouched. Used for V9 FULLY BACKED BY and V11 TRY.
"""
import sys
import numpy as np
from PIL import Image

src, dst, x0, x1 = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
y0, y1 = (int(sys.argv[5]), int(sys.argv[6])) if len(sys.argv) > 6 else (0, None)
im = Image.open(src).convert("RGBA")
a = np.asarray(im).astype(np.float32) / 255.0
rgb, al = a[..., :3], a[..., 3:]
# perceived luminance of the gold
L = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]
# gold midtones sit high in green/red; lift them so silver faces are bright, keep shadows deep
L = np.clip(L, 0, 1)
curve = np.clip((L - 0.06) / 0.86, 0, 1) ** 1.12
silver = np.stack([curve * 0.965 + 0.01, curve * 0.985 + 0.01, curve * 1.0 + 0.02], axis=-1)
silver = np.clip(silver, 0, 1)
out = rgb.copy()
out[y0:y1, x0:x1, :] = silver[y0:y1, x0:x1, :]
res = np.concatenate([out, al], axis=-1)
Image.fromarray((res * 255 + 0.5).astype(np.uint8), "RGBA").save(dst)
print("silvered", src, "x", x0, x1, "->", dst)
