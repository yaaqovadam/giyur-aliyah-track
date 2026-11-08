import json, os, re

LIVE_SEO = False
ROBOTS_META = "index, follow" if LIVE_SEO else "noindex, nofollow"
DOMAIN_SHIELD = "<script>(function(){var h=location.hostname;if(h&&!/^(localhost|127\\.0\\.0\\.1|giyuraliyahtrack\\.com|www\\.giyuraliyahtrack\\.com|giyur-aliyah-track\\.(web\\.app|firebaseapp\\.com))$/.test(h)){location.replace('https://giyuraliyahtrack.com'+location.pathname);}})();</script>"

SPOKES = [
    {"slug": "emergency-aliyah-go-bag-shinui-maamad", "obs_idx": 0},
    {"slug": "apostille-180-day-clock-fbi-police-check-israel", "obs_idx": 1},
    {"slug": "gush-etzion-private-conversion-aliyah", "obs_idx": 2},
    {"slug": "vaadat-charigim-tourist-conversion-israel", "obs_idx": 3},
    {"slug": "hebrew-clerk-letter-translator-form-ash1-ash3", "obs_idx": 4},
    {"slug": "israeli-rabbi-community-letters-beit-din", "obs_idx": 5},
    {"slug": "misrad-hapanim-spousal-visa-nohal-5-2-0008", "obs_idx": 6},
    {"slug": "aliyah-spousal-visa-criminal-record-rehabilitation", "obs_idx": 7},
    {"slug": "tourist-visa-israel-remote-work-housing-giyur", "obs_idx": 8},
    {"slug": "dahan-ruling-non-orthodox-conversion-aliyah-truth", "obs_idx": "dahan_truth"}
]

LANGS = ["en", "he", "fr", "es", "de"]
dicts = {l: json.load(open(f"public/i18n/{l}.json", encoding="utf-8")) for l in LANGS}

base_html = open("public/index.html", encoding="utf-8").read()
base_html = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\s*', '', base_html)
base_html = base_html.replace(DOMAIN_SHIELD, "")
base_html = re.sub(r'<article class="seo-spoke-article">[\s\S]*?</article>\s*', '', base_html)

def make_hreflang(subpath):
    tags = [f'<link rel="alternate" hreflang="x-default" href="https://giyuraliyahtrack.com/{subpath}" />']
    for l in LANGS:
        u = f"https://giyuraliyahtrack.com/{subpath}" if l == "en" else f"https://giyuraliyahtrack.com/{l}/{subpath}"
        tags.append(f'<link rel="alternate" hreflang="{l}" href="{u}" />')
    return "\n  ".join(tags)

def render_page(lang, subpath, obs_key=None):
    d = dicts[lang]
    out = base_html
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    out = re.sub(r'<html lang="[^"]*"(?: dir="[^"]*")?>', f'<html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}">', out, count=1)
    out = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', out, count=1)
    canon = f"https://giyuraliyahtrack.com/{subpath}" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/{subpath}"
    out = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{canon}" />', out, count=1)
    out = out.replace("</head>", f"  {make_hreflang(subpath)}\n  {DOMAIN_SHIELD}\n</head>", 1)

    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)

    blocks = d.get("_blocks", {})
    for tid in ["track-0", "track-1", "track-2", "track-3"]:
        b_html = blocks.get(f"#{tid}")
        if b_html and not str(b_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<article class="track-card[^"]*" id="{tid}">)[\s\S]*?(</article>)', lambda m: m.group(1) + "\n" + b_html + "\n        " + m.group(2), out, count=1)

    if obs_key is not None:
        out = out.replace('id="app-nav-back" class="app-nav-back"', f'id="app-nav-back" href="{b_hub}" class="app-nav-back visible"')
        ob = d.get("_terms", {}).get("dahan_truth") if obs_key == "dahan_truth" else (d.get("_obstacles", [])[obs_key] if obs_key < len(d.get("_obstacles", [])) else None)
        if ob:
            art = f'<article class="seo-spoke-article"><h2>{ob["tag"]} — {ob["title"]}</h2><p>{ob["body"]}</p><h3>{ob["badTitle"]}</h3><div>{ob["badText"]}</div><h3>{ob["goodTitle"]}</h3><div>{ob["goodText"]}</div></article>'
            out = out.replace('<div class="section-kicker">', art + '\n        <div class="section-kicker">', 1)
            if obs_key == "dahan_truth":
                out = re.sub(r'<a class="enemy-card" id="dahan-gold-card"[\s\S]*?</a>', '', out, count=1)
            out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{ob['title']} | Giyur Aliyah Track ({lang.upper()})</title>", out, count=1)
            clean_bad = re.sub(r"<[^>]+>", " ", ob["badText"]).strip()
            clean_good = re.sub(r"<[^>]+>", " ", ob["goodText"]).strip()
            faq_obj = {"@context": "https://schema.org", "@graph": [
                {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": ob["title"], "item": canon}]},
                {"@type": "FAQPage", "mainEntity": [
                    {"@type": "Question", "name": ob["title"], "acceptedAnswer": {"@type": "Answer", "text": ob["body"]}},
                    {"@type": "Question", "name": ob["badTitle"], "acceptedAnswer": {"@type": "Answer", "text": clean_bad}},
                    {"@type": "Question", "name": ob["goodTitle"], "acceptedAnswer": {"@type": "Answer", "text": f"{clean_good} ({ob.get('time','')})"}}
                ]}
            ]}
            faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
            out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
    else:
        out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{d.get('hero_h1','Giyur Aliyah Track')} | Giyur Aliyah Track ({lang.upper()})</title>", out, count=1)

    if lang != "en":
        out = out.replace('id="dahan-gold-card" href="/dahan-', f'id="dahan-gold-card" href="/{lang}/dahan-')
        out = re.sub(r'class="seo-mesh-link"([^>]*?)href="/(?!he/|fr/|es/|de/|forms)([^"]*)"', rf'class="seo-mesh-link"\1href="/{lang}/\2"', out)
    return out

for l in LANGS:
    hub_dir = "public" if l == "en" else f"public/{l}"
    os.makedirs(hub_dir, exist_ok=True)
    open(f"{hub_dir}/index.html", "w", encoding="utf-8").write(render_page(l, "", None))
    for s in SPOKES:
        sp_dir = f"public/{s['slug']}" if l == "en" else f"public/{l}/{s['slug']}"
        os.makedirs(sp_dir, exist_ok=True)
        open(f"{sp_dir}/index.html", "w", encoding="utf-8").write(render_page(l, f"{s['slug']}/", s["obs_idx"]))

open("public/robots.txt", "w", encoding="utf-8").write("User-agent: *\n" + ("Allow: /\n" if LIVE_SEO else "Disallow: /\n") + "Sitemap: https://giyuraliyahtrack.com/sitemap.xml\n")
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
for sub in [""] + [f"{s['slug']}/" for s in SPOKES]:
    for l in LANGS:
        loc = f"https://giyuraliyahtrack.com/{sub}" if l == "en" else f"https://giyuraliyahtrack.com/{l}/{sub}"
        sm.append(f"  <url>\n    <loc>{loc}</loc>")
        for alt in LANGS:
            aloc = f"https://giyuraliyahtrack.com/{sub}" if alt == "en" else f"https://giyuraliyahtrack.com/{alt}/{sub}"
            sm.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{aloc}"/>')
        sm.append("  </url>")
sm.append("  <url>\n    <loc>https://giyuraliyahtrack.com/forms/</loc>\n  </url>\n</urlset>")
open("public/sitemap.xml", "w", encoding="utf-8").write("\n".join(sm))
print("✅ Stabilized all 55 pages: URL-driven language, 1-time Intro, and Top-Left Native Back Chevron on every Spoke & Tab 2-5!")
