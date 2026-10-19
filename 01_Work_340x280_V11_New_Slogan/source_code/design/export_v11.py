"""V11 (new slogan) → GIF/JPG. Renders of every frame at 12 fps are de-duplicated (a frame identical to the previous one
just extends the previous delay), then encoded like V9C: Lanczos + unsharp to 1x (or @2x as is), one libimagequant palette
from a montage of key moments, dither only on the first frame, unchanged pixels keep their indices.
usage: COMP=MR11A TAG=V11A_New_Slogan [SCALE=2] python3 export_v11.py
"""
import os, glob
import numpy as np
from PIL import Image, ImageFilter
import imagequant

COMP = os.environ.get('COMP', 'MR11A')
TAG = os.environ.get('TAG', 'V11A_New_Slogan')
SCALE = int(os.environ.get('SCALE', '1'))
R = f'/home/claude/gba/remotion/out/{COMP}'
OUT = '/home/claude/gba/final/v11'; os.makedirs(OUT, exist_ok=True)
W, H = {1: (340, 280), 2: (680, 560), 4: (1360, 1120)}[SCALE]   # SCALE=4: true high-res frames from MR11A4HD (--scale=2)

def down(path):
    im = Image.open(path).convert('RGB')
    if SCALE >= 2: return im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
    return im.resize((W, H), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=0.9, percent=70, threshold=1))

files = sorted(glob.glob(f'{R}/element-*.png'))
frames, durs, prev, src = [], [], None, []
JPG_AT = int(os.environ.get('JPG_AT', '160'))   # closing card, before the loop fade
for f in files:
    n = int(f.split('-')[-1].split('.')[0])
    fr = down(f)
    a = np.asarray(fr)
    if prev is not None and np.abs(a.astype(int) - prev.astype(int)).max() <= 2:
        durs[-1] += 1000 / 12
        continue
    frames.append(fr); durs.append(1000 / 12); prev = a; src.append(n)
# GIF delays are stored in 1/100 s: round the CUMULATIVE time to 10 ms so the loop keeps its real length (83 ms frames would otherwise lose ~3 ms each)
cum, acc, out_d = 0.0, 0, []
for d in durs:
    cum += d; t = int(round(cum / 10.0)) * 10; out_d.append(t - acc); acc = t
durs = out_d
# key moments for the shared palette: first, then frames spread evenly
keys = sorted(set([0] + [int(i * (len(frames) - 1) / 9) for i in range(10)]))
mont = Image.new('RGB', (W, H * len(keys)))
for k, i in enumerate(keys): mont.paste(frames[i], (0, H * k))
pal = imagequant.quantize_pil_image(mont.convert('RGBA'), dithering_level=0.5, max_colors=256, min_quality=0, max_quality=100).convert('P')
qs, prev_rgb, prev_q = [], None, None
for fr in frames:
    q = fr.quantize(palette=pal, dither=Image.Dither.FLOYDSTEINBERG if prev_q is None else Image.Dither.NONE)
    if prev_q is not None:
        mask = (np.abs(np.asarray(fr).astype(int) - np.asarray(prev_rgb).astype(int)).sum(axis=2) > 6)
        m = Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5))
        merged = np.where(np.asarray(m) > 0, np.asarray(q), np.asarray(prev_q)).astype('uint8')
        q = Image.fromarray(merged, 'P'); q.putpalette(pal.getpalette())
    qs.append(q); prev_rgb, prev_q = fr, q
base = f'{OUT}/GBA2026_Banner_340x280_{TAG}' + {1: '', 2: '@2x', 4: '_1360x1120'}[SCALE]
qs[0].save(base + '.gif', save_all=True, append_images=qs[1:], duration=durs, loop=0, optimize=True, disposal=1)
J = dict(quality=95, subsampling=0, optimize=True, dpi=(72, 72))
jpg_i = max(i for i, n in enumerate(src) if n <= JPG_AT)
frames[jpg_i].save(base + '.jpg', **J)          # static = closing card (TRY THE GOD OF THE UNIVERSE / IN DR. SHEKINAIH!)
frames[0].save(base + '_frame1.jpg', **J)
print(COMP, len(files), 'rendered ->', len(frames), 'unique frames,', sum(durs), 'ms,', os.path.getsize(base + '.gif') // 1024, 'KB')
