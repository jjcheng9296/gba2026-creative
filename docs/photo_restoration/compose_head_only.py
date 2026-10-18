"""#24 final (James 16:13: "第四张图片，你要注意人脸，头和身体的比例正确就行了").
Face = the approved close-up. Head size = her head in the ORIGINAL photo, measured on the hair silhouette
against the white wall (left edge of hair at eye and mouth level, top of the hair) — so head-to-body proportion
is exactly the original. Only the HEAD (face, hair, neck) comes from the close-up; body, jacket and background stay
from the original (Real-ESRGAN x4 -> 4K, colours untouched). Run with the face-restore venv python."""
import cv2, numpy as np, torch, os
from facexlib.utils.face_restoration_helper import FaceRestoreHelper
from facexlib.parsing import init_parsing_model
W = r'F:\Golden bull award preparation 2026\12_Potala_Palace_Photos\handover_tibet'
orig = cv2.imread(W + r'\original_from_website\handover_tibet_24_shekinaih_white_palace.jpg')
cu = cv2.imread(W + r'\young_face_refs\ANCHOR_DR_SHEKINAIH_solo_24_closeup_approved.png')
h0, w0 = orig.shape[:2]; s = 3840 / max(h0, w0); W4, H4 = round(w0 * s), round(h0 * s)
bg = cv2.resize(cv2.imread(W + r'\esrgan_4x\handover_tibet_24_shekinaih_white_palace_x4.png'), (W4, H4), interpolation=cv2.INTER_LANCZOS4)
up = cv2.resize(orig, (W4, H4), interpolation=cv2.INTER_CUBIC)

def lm5(img):
    h = FaceRestoreHelper(1, face_size=512, det_model='retinaface_resnet50', device='cuda')
    h.read_image(img); h.get_face_landmarks_5(only_center_face=False, resize=None, eye_dist_threshold=3)
    lm = h.all_landmarks_5; size = [float(np.linalg.norm(l[0] - l[1])) for l in lm]
    return np.float32(lm[int(np.argmax(size))])
lc = lm5(cu)
up4 = cv2.resize(orig, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)
lb = lm5(up4) * (W4 / up4.shape[1])
ec, eb = float(np.linalg.norm(lc[0] - lc[1])), float(np.linalg.norm(lb[0] - lb[1]))
s_lm = eb / ec

def silhouette(img, c, e, blur):
    g = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY), (0, 0), blur).astype(np.float32)
    wall = np.percentile(g[int(c[1] - e):int(c[1] + e), max(0, int(c[0] - 4 * e)):int(c[0] - 2.2 * e)], 60)
    hair = np.percentile(g[int(c[1] - 0.3 * e):int(c[1] + 0.3 * e), int(c[0] - 1.6 * e):int(c[0] - 1.1 * e)], 30)
    T = 0.5 * (wall + hair); out = {}
    for name, dy in (('left@eyes', 0.0), ('left@mouth', 0.9)):
        y = int(c[1] + dy * e); x = int(c[0] - 0.9 * e)
        while x > 0 and g[y, x] < T: x -= 1
        out[name] = c[0] - x
    x = int(c[0] - 0.7 * e); y = int(c[1] - 0.5 * e)
    while y > 0 and g[y, x] < T: y -= 1
    out['top'] = c[1] - y
    return out, wall, hair
cc = lc[:2].mean(0); cb = lb[:2].mean(0)
mc, *_ = silhouette(cu, cc, ec, 3.0)
mb, wb_, hb_ = silhouette(up, cb, eb, 3.0 * s_lm)
ratios = {k: mb[k] / mc[k] for k in mc}
print('close-up eye-dist %.1f  orig(4K) eye-dist %.1f  -> landmark scale %.3f' % (ec, eb, s_lm))
print('silhouette (px)  close-up', {k: round(v) for k, v in mc.items()}, ' original', {k: round(v) for k, v in mb.items()})
print('silhouette scales', {k: round(v, 3) for k, v in ratios.items()})
sc = float(os.environ.get('SCALE') or np.median(list(ratios.values())))
print('USED scale %.3f (landmark %.3f, rejected ECC %.3f)' % (sc, s_lm, s_lm * 1.144))
M = np.float32([[sc, 0, cb[0] - sc * cc[0]], [0, sc, cb[1] - sc * cc[1]]])

net = init_parsing_model(model_name='parsenet', device='cuda')
def head_mask(img):
    x = cv2.resize(img, (512, 512), interpolation=cv2.INTER_AREA)[..., ::-1].astype(np.float32) / 255.
    t = torch.from_numpy(((x - 0.5) / 0.5).transpose(2, 0, 1).copy())[None].cuda()
    with torch.no_grad(): lab = net(t)[0].argmax(1)[0].cpu().numpy().astype(np.uint8)
    lab = cv2.resize(lab, img.shape[1::-1], interpolation=cv2.INTER_NEAREST)
    m = np.isin(lab, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17]).astype(np.uint8)
    n, cl, st, _ = cv2.connectedComponentsWithStats(m)
    k = cl[int(cc[1]), int(cc[0])]
    return np.where(cl == k, 255, 0).astype(np.uint8)
hm_c = head_mask(cu)
wp = cv2.warpAffine(cu, M, (W4, H4), flags=cv2.INTER_AREA)
hm = cv2.warpAffine(hm_c, M, (W4, H4)).astype(np.float32) / 255
hm = cv2.GaussianBlur(cv2.erode(hm, np.ones((3, 3), np.uint8)), (0, 0), 2.5)[..., None]
out = (wp.astype(np.float32) * hm + bg.astype(np.float32) * (1 - hm)).clip(0, 255).astype(np.uint8)
cv2.imwrite(W + r'\TIBET_B_shekinaih_white_palace_APPROVED_4K.jpg', out, [cv2.IMWRITE_JPEG_QUALITY, 95, cv2.IMWRITE_JPEG_SAMPLING_FACTOR, cv2.IMWRITE_JPEG_SAMPLING_FACTOR_444])
cx, cy = int(cb[0]), int(cb[1]); R = int(6 * eb)
y1, y2, x1, x2 = max(0, cy - 2 * R // 3), min(H4, cy + 2 * R), max(0, cx - R), min(W4, cx + R)
cv2.imwrite(W + r'\refldm_work\check24_proportion.jpg', np.hstack([up[y1:y2, x1:x2], out[y1:y2, x1:x2]]), [cv2.IMWRITE_JPEG_QUALITY, 92])
print('saved', out.shape)
