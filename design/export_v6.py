"""V6 (Remotion) → GIF/JPG: Lanczos+unsharp to 1x, libimagequant per frame, variable delays. Frames: 0,48,78 held; strikes at 12 fps; 134 held."""
import os, sys, glob, shutil
from PIL import Image, ImageFilter
import imagequant
SCALE = int(os.environ.get('SCALE', '1'))   # 2 = export the @2x frames as-is (680x560) for retina / phone sharpness
VER = os.environ.get('VER', 'V6')  # V6 = three strikes on the gate (comps LB/MR) · V8 = BANG! slammed x3 (comps LB8/MR8)
SUF = {'V6': ('', '_V6_Three_Strikes'), 'V8': ('8', '_V8_Bang_x3'), 'V9': ('9', '_V9_Boss_Sequence'), 'V9B': ('9B', '_V9_Boss_Sequence'), 'V10': ('10', '_V10_Boss_Sequence')}[VER]
R = '/home/claude/gba/remotion/out'
OUT = '/home/claude/gba/final/v9' if VER == 'V9B' else f'/home/claude/gba/final/{VER.lower()}'; os.makedirs(OUT, exist_ok=True)
SIZES = {'MR9B': (340, 280, '340x280')} if VER == 'V9B' else {'LB10': (728, 90, '728x90')} if VER == 'V10' else {'LB' + SUF[0]: (728, 90, '728x90'), 'MR' + SUF[0]: (340, 280, '340x280')}
HOLD = {0: 4000, 48: 2500, 78: 2500, 134: 3330} if not VER.startswith('V9') else ({5: 1583, 29: 2583, 65: 1083, 83: 1583, 107: 583, 119: 583, 167: 250} if VER == 'V9B' else {5: 1583, 29: 2583, 65: 1083, 83: 1583, 107: 583, 119: 583, 133: 2833, 167: 250})
def down(path, w, h):
    im = Image.open(path).convert('RGB')
    if SCALE == 2: return im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=40, threshold=2))
    im = im.resize((w, h), Image.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=0.9, percent=70, threshold=1))
KEYS10 = [int(x) for x in os.environ.get('KEYS10', '0').split(',')]
for comp, (w, h, tag) in SIZES.items():
    files = sorted(glob.glob(f'{R}/{comp}/element-*.png'))
    if SCALE == 2: w, h = w * 2, h * 2
    frames, durs = [], []
    nums = [int(f.split('-')[-1].split('.')[0]) for f in files]
    for i, f in enumerate(files):
        n = nums[i]
        if VER in ('V9B', 'V10'):
            durs.append(int(round((nums[i + 1] - n) * 1000 / 12)) if i + 1 < len(nums) else 250)
        else:
            durs.append(HOLD.get(n, 83))
        frames.append(down(f, w, h))
    # shared palette from a montage of the distinct moments (brand, ministry, 3 strike peaks, final) -> unchanged pixels keep identical indices -> Pillow stores only the changed box
    import numpy as np
    keys = KEYS10 if VER == 'V10' else [0, 2, 3, 11, 19, 29] if not VER.startswith('V9') else ([0, 5, 8, 20, 29, 35, 41, 50, 70, 85] if VER == 'V9B' else [0, 5, 8, 17, 23, 29, 35, 43])
    mont = Image.new('RGB', (w, h * len(keys)))
    for k, i in enumerate(keys): mont.paste(frames[i], (0, h * k))
    pal = imagequant.quantize_pil_image(mont.convert('RGBA'), dithering_level=0.5, max_colors=256, min_quality=0, max_quality=100).convert('P')
    qs, prev_rgb, prev_q = [], None, None
    for fr in frames:
        q = fr.quantize(palette=pal, dither=Image.Dither.FLOYDSTEINBERG if (prev_q is None or VER not in ('V9B', 'V10')) else Image.Dither.NONE)  # V9B: dither only the first frame; changed regions are text on the dark band, so no-dither is cleaner and ~2x smaller
        if prev_q is not None:
            a, b = np.asarray(fr), np.asarray(prev_rgb)
            mask = (np.abs(a.astype(int) - b.astype(int)).sum(axis=2) > 6)
            # dilate the change mask by 2 px so dither edges don't flicker
            from PIL import ImageOps
            m = Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.MaxFilter(5))
            qi, qp = np.asarray(q), np.asarray(prev_q)
            merged = np.where(np.asarray(m) > 0, qi, qp).astype('uint8')
            q = Image.fromarray(merged, 'P'); q.putpalette(pal.getpalette())
        qs.append(q); prev_rgb, prev_q = fr, q
    gif = f'{OUT}/GBA2026_Banner_{tag}' + SUF[1] + ('@2x' if SCALE == 2 else '') + '.gif'
    qs[0].save(gif, save_all=True, append_images=qs[1:], duration=durs, loop=0, optimize=True, disposal=1)
    J = dict(quality=95, subsampling=0, optimize=True, dpi=(72, 72))
    frames[-1].save(f'{OUT}/GBA2026_Banner_{tag}' + SUF[1] + ('@2x' if SCALE == 2 else '') + '.jpg', **J)          # static = final hold (gate open, plaque visible)
    frames[0].save(f'{OUT}/GBA2026_Banner_{tag}' + SUF[1] + ('@2x' if SCALE == 2 else '') + '_frame1.jpg', **J)
    print(comp, len(frames), 'frames', sum(durs), 'ms', os.path.getsize(gif) // 1024, 'KB')
