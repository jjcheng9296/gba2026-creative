// Builds the GBA 2026 Prestige submission dossier (.docx)
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, HeadingLevel, BorderStyle, LevelFormat, PageBreak, Footer, PageNumber, Header,
} = require('/opt/npm-tools/node_modules/docx');

const INK = '1C1228', PURPLE = '34204F', GOLD = '9A7425', MUTED = '5E5470';
const FONT = 'Calibri', SERIF = 'Georgia';

// inline markup: **bold**, {{highlight}}
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\{\{[^}]+\}\})/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else out.push(new TextRun({ text: t.slice(2, -2), highlight: 'yellow', ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const P = (text, opts = {}) => new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { after: 140, line: 300 }, keepLines: true, ...opts, children: runs(text, opts.run || {}) });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 }, keepNext: true, children: [new TextRun({ text: t })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 120 }, keepNext: true, children: [new TextRun({ text: t })] });
const bullet = (t) => new Paragraph({ alignment: AlignmentType.JUSTIFIED, numbering: { reference: 'bul', level: 0 }, spacing: { after: 90, line: 290 }, keepLines: true, children: runs(t) });
const rule = () => new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: 'C69A45', space: 1 } }, spacing: { after: 200 }, children: [] });

const border = { style: BorderStyle.SINGLE, size: 4, color: 'D9D0E6' };
const borders = { top: border, bottom: border, left: border, right: border };
function table(rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => new TableRow({
      children: r.map((c, j) => new TableCell({
        borders, width: { size: widths[j], type: WidthType.DXA },
        shading: j === 0 || i === 0 && rows.header ? { fill: 'F3EDF8', type: ShadingType.CLEAR, color: 'auto' } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: (Array.isArray(c) ? c : [c]).map((t) => new Paragraph({ spacing: { after: 40 }, children: runs(t, j === 0 ? { bold: true, color: PURPLE } : {}) })),
      })),
    })),
  });
}

function img(file, wPx, maxWidthPt = 451) {
  const data = fs.readFileSync(file);
  const { w, h } = wPx;
  const width = Math.min(maxWidthPt * 1.333, w);
  return new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 80 }, children: [new ImageRun({ type: file.endsWith('.png') ? 'png' : 'jpg', data, transformation: { width, height: width * h / w } })] });
}
const caption = (t) => new Paragraph({ spacing: { after: 220 }, children: [new TextRun({ text: t, italics: true, size: 18, color: MUTED })] });

// ---------- article ----------
const md = fs.readFileSync('article.md', 'utf8').split('\n');
const title = md.find((l) => l.startsWith('TITLE:')).slice(6).trim();
const stand = md.find((l) => l.startsWith('STANDFIRST:')).slice(11).trim();
const article = [];
article.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: title, font: SERIF, size: 52, bold: true, color: PURPLE })] }));
article.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: stand, font: SERIF, italics: true, size: 26, color: GOLD })] }));
let first = true;
let listInstance = 0;
  for (const raw of md) {
  const l = raw.trimEnd();
  if (!l || l.startsWith('TITLE:') || l.startsWith('STANDFIRST:')) continue;
  if (l.startsWith('## ')) { article.push(H2(l.slice(3))); continue; }
  if (l.startsWith('- ')) { article.push(bullet(l.slice(2))); continue; }
  if (/^\d+\. /.test(l)) { const n = parseInt(l, 10); if (n === 1) listInstance++; article.push(new Paragraph({ alignment: AlignmentType.JUSTIFIED, numbering: { reference: 'num', level: 0, instance: listInstance }, spacing: { after: 90, line: 290 }, keepLines: true, children: runs(l.replace(/^\d+\. /, '')) })); continue; }
  if (l.startsWith('> ')) {
    const t = l.slice(2);
    const isAttr = t.startsWith('—');
    article.push(new Paragraph({
      indent: { left: 567 }, spacing: { before: isAttr ? 0 : 200, after: isAttr ? 240 : 60, line: 320 }, keepLines: true, keepNext: !isAttr,
      border: isAttr ? undefined : { left: { style: BorderStyle.SINGLE, size: 18, color: 'C69A45', space: 12 } },
      children: runs(t, isAttr ? { size: 20, color: GOLD, bold: true } : { font: SERIF, italics: true, size: 25, color: PURPLE }),
    }));
    continue;
  }
  if (first) { // lead paragraph slightly larger
    article.push(P(l, { run: { size: 23 } })); first = false; continue;
  }
  article.push(P(l));
}
const wc = md.join(' ').replace(/TITLE:|STANDFIRST:|[{}*#>]/g, '').replace(/^- /gm, '').split(/\s+/).filter(Boolean).length;

// ---------- document ----------
const children = [
  new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'GOLDEN BULL AWARD 2026 · SINGAPORE CHAPTER', font: FONT, bold: true, size: 20, color: GOLD, characterSpacing: 60 })] }),
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'Winner Profile & Branding Materials', font: SERIF, bold: true, size: 48, color: PURPLE })] }),
  new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: 'CE GLOBAL NETWORK INTERNATIONAL PTE LTD', bold: true, size: 26, color: INK })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Prestige Package · Outstanding Bull · Digital 50 · Inspirational Entrepreneur Awards', size: 20, color: MUTED })] }),
  rule(),
  table([
    ['Submitted to', 'Golden Bull Award Organising Committee — attn. Mr Jason Ooi, Senior Project Manager'],
    ['Award ceremony', '12 November 2026, Marina Bay Sands, Singapore'],
    ['Materials due', '31 December 2026 (Winner Profile Write-Up and Company Advertisement)'],
    ['Contents', ['1. Company information', '2. Profile write-up (' + wc + ' words; limit 2,000)', '3. Company photos', '4. Company advertisement — capital.asia', '5. Rotating banner 728 × 90', '6. Rotating banner 340 × 280']],
  ], [2400, 6626]),
  new Paragraph({ children: [new PageBreak()] }),

  H1('1. Company information'),
  table([
    ["CEO / Director's name", 'DR SHEKINAIH SIEW SIN YAP'],
    ['Designation', 'Founder and Managing Director'],
    ['Chief Advisory & Support Officer', 'DR J AARON K DAVID — key management, jointly leads the company (co-founder of CE Global Network LLP)'],
    ['Company name', 'CE GLOBAL NETWORK INTERNATIONAL PTE LTD (UEN 202605111K)'],
    ['Company address', '27 Trevose Crescent, Dunearn Estate, Singapore 298042'],
    ['Company website', 'https://www.ceglobalnetworkinternational.com'],
    ['Email', 'shipping@ceglobalnetworkinternational.com'],
    ['Chronology', ['Incorporated April 2026; operations commenced July 2026, carrying forward the freight business of CE Global Network LLP.', 'The freight business described in the write-up was built as CE Global Network LLP (established 2013; operated through COVID-19); no financial figures are disclosed in this submission. The Pte. Ltd.\'s first financial reporting period ends on 31 December 2026.']],
    ['Core business, products & services', ['Freight forwarding and logistics (SSIC 52292 — freight transport arrangement):', '• Sea freight (FCL and LCL) and air freight', '• Container haulage and transportation', '• Warehousing and distribution', '• Packing, unpacking and eCommerce logistics', '• Customs clearance, handling and cargo insurance', '• AI-assisted workflow and SOP advisory for SMEs (planned)']],
  ], [2700, 6326]),

  new Paragraph({ children: [new PageBreak()] }),
  H1('2. Profile write-up'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: `${wc} words · British English · names of the award recipients set in full capitals as registered with the organiser.`, size: 18, color: MUTED, italics: true })] }),
  ...article,

  new Paragraph({ children: [new PageBreak()] }),
  H1('3. Company photos'),
  P('**Cover photo** — 2000 × 800 px, 72 dpi, .jpg — file: GBA2026_Cover_2000x800.jpg', { keepNext: true }),
  img('final/GBA2026_Cover_2000x800.jpg', { w: 2000, h: 800 }),
  caption('Cover photo. DR J AARON K DAVID, Chief Advisory & Support Officer, and DR SHEKINAIH SIEW SIN YAP, Founder and Managing Director, CE Global Network International — Promise Delivered.'),
  P('**Company photos** — 10 to 30 photos, 1000 px wide, 72 dpi, .jpg. Supplied as a separate folder; captions follow the format Subject · Activity · Place.'),

  H1('4. Company advertisement — capital.asia'),
  P('1000 × 500 px, 72 dpi, .jpg — file: GBA2026_Advertisement_1000x500.jpg', { keepNext: true }),
  img('final/GBA2026_Advertisement_1000x500.jpg', { w: 1000, h: 500 }),

  H1('5. Rotating rectangular banner — goldenbullaward.com & capital.asia'),
  P('728 × 90 px, RGB, 72 dpi — files supplied separately: GBA2026_Banner_728x90_V10_Boss_Sequence.gif (animated, 15 s loop; @2x and 2912×360 MP4 versions also available) and the static final frame. Shown here: the final frame of the V10 sequence.', { keepNext: true }),
  img('final/GBA2026_Banner_728x90_V10.jpg', { w: 728, h: 90 }),

  H1('6. Rotating rectangular banner — capital.asia'),
  P('340 × 280 px, RGB, 72 dpi — files supplied separately: GBA2026_Banner_340x280_V9_Boss_Sequence.gif (animated, 16 s loop; @2x and 1360×1120 MP4 versions also available) and the static final frame. Shown here: the final frame of the approved V9C sequence.', { keepNext: true }),
  img('final/GBA2026_Banner_340x280_V9.jpg', { w: 340, h: 280 }, 255),

  H1('Company boilerplate'),
  P('CE Global Network International Pte. Ltd. is a Singapore freight forwarder and logistics provider offering sea and air freight, container haulage, warehousing and distribution, and packing, unpacking and eCommerce logistics, with customs clearance and cargo insurance in scope. Incorporated in April 2026 and operating from July 2026, the company carries forward the freight business of CE Global Network LLP and runs an AI-assisted operating model that coordinates the journey of each shipment through one Singapore-based team. It is led by Founder and Managing Director DR SHEKINAIH SIEW SIN YAP and Chief Advisory & Support Officer DR J AARON K DAVID. Web: www.ceglobalnetworkinternational.com'),
];

const doc = new Document({
  creator: 'CE Global Network International Pte Ltd',
  title: 'Golden Bull Award 2026 — Winner Profile & Branding Materials',
  styles: {
    default: { document: { run: { font: FONT, size: 22, color: INK } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: SERIF, size: 34, bold: true, color: PURPLE }, paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: SERIF, size: 27, bold: true, color: PURPLE }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 283 } } } }] }, { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 283 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, bottom: 1200, left: 1440, right: 1440 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'CE Global Network International · Golden Bull Award 2026', size: 16, color: MUTED })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(process.env.OUT || 'final/GBA2026_Winner_Profile_CE_Global_Network_International.docx', b); console.log('docx ok', wc, 'words'); });
