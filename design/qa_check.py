"""GBA creative QA gate (v20). Run after render10.mjs: python3 qa_check.py
Checks every layout for
  1. rainbow headroom: apex (outer edge of the photo bow) >= 11% below the top edge (cover >= 12% after the
     goldenbullaward winner-page crop, which hides ~3% of the cover's top);
  2. head clearance: the bow's INNER edge above each founder's head must sit >= 3% of the frame height above the head top;
  3. no bow fragment at the frame top: the apex must be inside the frame (not above y=0).
Fails loudly (exit 1) so a bad layout is never exported."""
import json, os, sys, math
from PIL import Image
import numpy as np
here = __import__('os').path.dirname(__file__) or '.'
G = json.load(open(f'{here}/out10' + ('_' + os.environ['VARIANT'] if os.environ.get('VARIANT') else '') + '/geometry.json'))   # variant-aware (v25)
MASTERS = {  # measured on the masters: outer apex row, inner apex row, circle centre (px of the master)
  'arch5': dict(W=6000, H=2399, cx=4276, cy=1936, apex_out=198, apex_in=232),
  'archB': dict(W=3000, H=2250, cx=1565, cy=1348, apex_out=105, apex_in=133),
}
F = Image.open(f'{here}/founders_red_hd.png'); A = np.array(F)[:, :, 3]
def head_top(x0, x1):
    rows = np.where(A[:, x0:x1].max(axis=1) > 40)[0]; return int(rows.min())
HEADS = {'DR J AARON K DAVID': (150, 430, 290), 'DR SHEKINAIH SIEW SIN YAP': (560, 850, 705)}  # x-range, centre x in cutout px
ok = True
for name, g in G.items():
    M = MASTERS[g['master']]; k = g['k']; oy = g['oy']; H = g['H']
    Rout = (M['cy'] - M['apex_out']) * k; Rin = (M['cy'] - M['apex_in']) * k
    cy = M['cy'] * k + oy; cx = g['cxCss']
    apex = cy - Rout; need = 12 if name == 'cover' else 11
    pct = apex / H * 100
    line = f'{name:6s} apex {apex:6.1f}px = {pct:4.1f}% (need >= {need}%)'
    good = pct >= need and apex >= 0
    for who, (x0, x1, xc) in HEADS.items():
        hx = g['fx'] + xc * g['s']; htop = g['fy'] + head_top(x0, x1) * g['s']
        dx = hx - cx
        inner = cy - math.sqrt(max(Rin * Rin - dx * dx, 0)) if abs(dx) < Rin else float('nan')
        clear = htop - inner; cpct = clear / H * 100
        line += f' | {who.split()[1]}: bow inner {inner:6.1f} head {htop:6.1f} gap {clear:5.1f}px={cpct:4.1f}%'
        if not (cpct >= 3): good = False
    print(('PASS ' if good else 'FAIL ') + line)
    ok &= good
# also measure the exported cover directly (independent of geometry): detect the bow's apex row by saturation
try:
    im = Image.open(f'{here}/../final/GBA2026_Cover_2000x800.jpg').convert('HSV'); h = np.array(im)
    col = h[:, 1405:1445, :]; sat = col[:, :, 1].mean(axis=1); val = col[:, :, 2].mean(axis=1)
    rows = np.where((sat > 90) & (val > 110))[0]; print(f'measured on final cover: apex row {rows.min()} = {rows.min()/8:.1f}%')
except Exception as e: print('final cover not measured:', e)
print('QA', 'PASS' if ok else 'FAIL'); sys.exit(0 if ok else 1)
