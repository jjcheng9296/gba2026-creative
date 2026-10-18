"""Downsample out8 renders (@2x) to exact size with Lanczos + unsharp mask; JPG q95 4:4:4; GIF via libimagequant (per-frame palette, dithering 0.5)."""
import os, sys, shutil, subprocess
from PIL import Image, ImageFilter
SEVEN = bool(os.environ.get('SEVEN'))
D = '/home/claude/gba/design/out10' + ('_' + os.environ['VARIANT'] if os.environ.get('VARIANT') else '_v7' if SEVEN else '')
SIZES = {'cover': (2000, 800), 'ad': (1000, 500), 'lb': (728, 90), 'mr': (340, 280)}
def down(name):
    key = name.split('_')[0]
    w, h = SIZES[key]
    im = Image.open(f'{D}/{name}@2x.png').convert('RGB').resize((w, h), Image.LANCZOS)
    # small banners need a touch more sharpening than the big pieces
    r, p = (0.9, 70) if key in ('lb', 'mr') else (0.8, 45)
    im = im.filter(ImageFilter.UnsharpMask(radius=r, percent=p, threshold=1))
    im.save(f'{D}/{name}.png')
    return im
def gif(frames, out, durations=None):
    """v22: libimagequant (pngquant's quantizer) per frame, dithering 0.5, local palette per frame.
    ffmpeg palettegen/paletteuse posterised the night sky inside the rainbow into a flat blue band
    (sky RMSE 5.1 vs 3.8 here); James: the GIF must look as even as the JPG."""
    import imagequant
    qs = [imagequant.quantize_pil_image(f.convert('RGBA'), dithering_level=0.5, max_colors=256, min_quality=0, max_quality=100) for f in frames]
    V = os.environ.get('VARIANT', '')
    durations = durations or ([2500, 2500, 3000] if len(qs) == 3 else [2500, 2500, 2500, 900, 350, 350, 2600] if (SEVEN and len(qs) == 7) else [4000, 2500, 2500, 150, 550, 150, 550, 200, 3400] if len(qs) == 9 else [4000, 2500, 2500, 700, 700, 3600] if V.startswith('v5') else [2500, 2500, 900, 350, 350, 2600])
    qs[0].save(out, save_all=True, append_images=qs[1:], duration=durations, loop=0, optimize=False, disposal=1)
if __name__ == '__main__':
    final = '--final' in sys.argv
    V = os.environ.get('VARIANT', '')
    NF = 9 if (V.startswith('v5f') or V.startswith('v5g')) else 7 if (SEVEN and not V) else 6 if (not V or V.startswith('v5')) else 3   # v5: six frames (3 messages + 3 beats); v5f: 9 (flash + settle per beat)
    names = ['cover', 'ad'] + [f'lb_f{i}' for i in range(NF)] + [f'mr_f{i}' for i in range(NF)]
    if os.environ.get('VARIANT'): names = names[2:]
    ims = {n: down(n) for n in names}
    if final:
        tmp = f'{D}/_final'; os.makedirs(tmp, exist_ok=True)
        J = dict(quality=95, subsampling=0, optimize=True, dpi=(72, 72))
        if 'cover' in ims:
            ims['cover'].save(f'{tmp}/GBA2026_Cover_2000x800.jpg', **J)
            ims['ad'].save(f'{tmp}/GBA2026_Advertisement_1000x500.jpg', **J)
        ims['lb_f0'].save(f'{tmp}/GBA2026_Banner_728x90.jpg', **J)
        ims['mr_f0'].save(f'{tmp}/GBA2026_Banner_340x280.jpg', **J)
        gif([ims[f'lb_f{i}'] for i in range(NF)], f'{tmp}/GBA2026_Banner_728x90.gif')
        gif([ims[f'mr_f{i}'] for i in range(NF)], f'{tmp}/GBA2026_Banner_340x280.gif')
        if SEVEN and not os.environ.get('VARIANT'):   # V7: all four sizes to final/v7 with _V7 suffix, V1 untouched
            vd = '/home/claude/gba/final/v7'; os.makedirs(vd, exist_ok=True)
            for fn in os.listdir(tmp): shutil.copyfile(f'{tmp}/{fn}', f'{vd}/{fn.replace(".jpg", "_V7.jpg").replace(".gif", "_V7.gif")}')
            print('V7 finals written', vd); sys.exit(0)
        if os.environ.get('VARIANT'):   # V2 variants: only banners, written to final/<VARIANT>/ (never over the live files)
            suf = {'v2': '_V2', 'v2zh': '_V2_CN', 'v3': '_V3', 'v3zh': '_V3_CN', 'v4': '_V4', 'v4zh': '_V4_CN',
                   'v5a': '_V5A_Light_from_Above', 'v5b': '_V5B_Crowned_Signature', 'v5c': '_V5C_Three_Rings', 'v5d': '_V5D_Light_plus_BANG', 'v5dzh': '_V5D_Light_plus_BANG_CN', 'v5e': '_V5E_Gold_Fireworks_BANG', 'v5ezh': '_V5E_Gold_Fireworks_BANG_CN', 'v5f': '_V5F_Gold_Detonation', 'v5fzh': '_V5F_Gold_Detonation_CN', 'v5g': '_V5G_Real_Firework', 'v5gzh': '_V5G_Real_Firework_CN',
                   'v5azh': '_V5A_Light_from_Above_CN', 'v5bzh': '_V5B_Crowned_Signature_CN', 'v5czh': '_V5C_Three_Rings_CN'}[os.environ['VARIANT']]
            vd = f'/home/claude/gba/final/{os.environ["VARIANT"]}'; os.makedirs(vd, exist_ok=True)
            for fn in os.listdir(tmp):
                if 'Banner' in fn: shutil.copyfile(f'{tmp}/{fn}', f'{vd}/{fn.replace(".jpg", suf + ".jpg").replace(".gif", suf + ".gif")}')
            print('variant finals written', vd); sys.exit(0)
        for o in ['/mnt/user-data/outputs/gba', '/home/claude/gba/final']:
            for fn in os.listdir(tmp): shutil.copyfile(f'{tmp}/{fn}', f'{o}/{fn}')
        print('finals written')
