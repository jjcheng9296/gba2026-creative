"""Build the mock winner page (goldenbullaward.com layout) from the write-up markdown.
usage: python3 build_winner_html.py article.md zh_block.html seo.json in_winner.html out_winner.html
- article.md: TITLE:, STANDFIRST:, '## ' headings, '- ' bullets, '1. ' lists, '> ' quotes ('> — ' = attribution), **bold**, *italic*
- zh_block.html: the Chinese entry block (inner HTML of <div class="zh">)
- seo.json: {title, description, canonical, og_image, keywords, jsonld:[...]}
"""
import sys, re, json, html

md_path, zh_path, seo_path, src, out = sys.argv[1:6]
md = open(md_path, encoding='utf-8').read().split('\n')
zh = open(zh_path, encoding='utf-8').read().strip()
seo = json.load(open(seo_path, encoding='utf-8'))
page = open(src, encoding='utf-8').read()

def slug(t):
    t = re.sub(r'<[^>]+>', '', t).lower()
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t[:70].strip('-')

EMAIL = re.compile(r'\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b')
URL = re.compile(r'\b(www\.[A-Za-z0-9.-]+\.[a-z]{2,}(?:/[^\s<]*)?)')
def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![*\w])\*([^*]+)\*(?![*\w])', r'<i>\1</i>', t)
    def mail(m):
        e = m.group(1)
        subj = '?subject=BUSINESS%20BREAKTHROUGH' if e.startswith('ceg@') else ''
        return f'<a href="mailto:{e}{subj}">{e}</a>'
    t = EMAIL.sub(mail, t)
    t = URL.sub(lambda m: f'<a href="https://{m.group(1)}" target="_blank" rel="noopener">{m.group(1)}</a>', t)
    return t

title = next(l for l in md if l.startswith('TITLE:'))[6:].strip()
stand = next(l for l in md if l.startswith('STANDFIRST:'))[11:].strip()
kick = next((l for l in md if l.startswith('KICKER:')), 'KICKER:')[7:].strip()
parts = [f'<h1 id="profile">{inline(title)}</h1>'] + ([f'<p class="kicker">{inline(kick)}</p>'] if kick else []) + [f'<p class="stand">{inline(stand)}</p>']
lst = None   # 'ul' | 'ol'
first_h = None
def close():
    global lst
    if lst: parts.append(f'</{lst}>'); lst = None
for raw in md:
    l = raw.rstrip()
    if not l or l.startswith('TITLE:') or l.startswith('STANDFIRST:') or l.startswith('KICKER:'):
        close(); continue
    if l.startswith('## '):
        close(); h = l[3:].strip(); sid = slug(h); first_h = first_h or sid
        parts.append(f'<h2 id="{sid}">{inline(h)}</h2>'); continue
    if l.startswith('- '):
        if lst != 'ul': close(); parts.append('<ul>'); lst = 'ul'
        parts.append(f'<li>{inline(l[2:])}</li>'); continue
    m = re.match(r'^(\d+)\. (.*)', l)
    if m:
        if lst != 'ol': close(); parts.append(f'<ol start="{m.group(1)}">' if m.group(1) != '1' else '<ol>'); lst = 'ol'
        parts.append(f'<li>{inline(m.group(2))}</li>'); continue
    close()
    if l.startswith('> '):
        t = l[2:]
        if t.startswith('—'): parts.append(f'<p class="attr">{inline(t)}</p>')
        else: parts.append(f'<blockquote>{inline(t)}</blockquote>')
        continue
    parts.append(f'<p>{inline(l)}</p>')
close()
body = '\n'.join(parts)

# --- article block ---
zh_html = f'    <div class="zh" lang="zh-Hans">\n{zh}\n    </div>\n'
a0 = page.index('  <article>') + len('  <article>\n')
a1 = page.index('  </article>')
page = page[:a0] + zh_html + body + '\n' + page[a1:]
page = page.replace('href="#the-decision-behind-the-business"', f'href="#{first_h}"')

# --- head: SEO ---
h0 = page.index('<head>') + len('<head>\n'); h1 = page.index('<style>')
head = ['<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">',
        f'<title>{html.escape(seo["title"])}</title>',
        f'<meta name="description" content="{html.escape(seo["description"])}">',
        f'<meta name="keywords" content="{html.escape(seo["keywords"])}">',
        f'<link rel="canonical" href="{seo["canonical"]}">',
        f'<meta property="og:type" content="article"><meta property="og:title" content="{html.escape(seo["og_title"])}"><meta property="og:description" content="{html.escape(seo["description"])}"><meta property="og:image" content="{seo["og_image"]}"><meta name="twitter:card" content="summary_large_image">',
        '<script type="application/ld+json">' + json.dumps(seo['jsonld'], ensure_ascii=False) + '</script>']
page = page[:h0] + '\n'.join(head) + '\n' + page[h1:]
# h2 inside the article uses the old h4 look
page = page.replace('article h4{font:800 21px/1.25 Georgia,serif;margin:34px 0 10px}', 'article h2,article h4{font:800 21px/1.25 Georgia,serif;margin:34px 0 10px}')
page = page.replace('article h1,article h4,article .attr{text-align:left}', 'article h1,article h2,article h4,article .attr{text-align:left}')
page = page.replace('article h1{font:900 40px/1.1 Georgia,serif;margin:0 0 10px}', 'article h1{font:900 34px/1.15 Georgia,serif;margin:0 0 10px} article .kicker{font:800 12.5px/1.5 Arial,sans-serif;letter-spacing:.06em;color:#8a6d1e;text-align:left;margin:0 0 14px}')
MOBILE_CSS = '@media (max-width:640px){.nav ul{flex-wrap:wrap;gap:8px 16px;font-size:11px}.det{width:100%;table-layout:fixed}.det td{padding:6px 8px;overflow-wrap:anywhere}.det td:first-child{width:38%}article h1{font-size:28px}article blockquote{font-size:16px}article .stand,article .kicker,article blockquote,article .attr{text-align:left}article p,article li{-webkit-hyphens:auto;hyphens:auto}}'
if MOBILE_CSS not in page:
    page = page.replace('</style>', MOBILE_CSS + '\n</style>', 1)
open(out, 'w', encoding='utf-8').write(page)
words = len(re.sub(r'TITLE:|STANDFIRST:|KICKER:|[{}*#>]', '', '\n'.join(md)).split())
print('ok', out, words, 'words', 'first section', first_h)
