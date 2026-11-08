import json, os, re

LIVE_SEO = False
ROBOTS_META = "index, follow" if LIVE_SEO else "noindex, nofollow"
DOMAIN_SHIELD = "<script>(function(){var h=location.hostname;if(h&&!/^(localhost|127\\.0\\.0\\.1|giyuraliyahtrack\\.com|www\\.giyuraliyahtrack\\.com|giyur-aliyah-track\\.(web\\.app|firebaseapp\\.com))$/.test(h)){location.replace('https://giyuraliyahtrack.com'+location.pathname);}})();</script>"

SPOKES = [
    {"slug": "emergency-aliyah-go-bag-shinui-maamad", "obs_idx": 0, "term_key": "go_bag"},
    {"slug": "apostille-180-day-clock-fbi-police-check-israel", "obs_idx": 1, "term_key": "five_docs"},
    {"slug": "gush-etzion-private-conversion-aliyah", "obs_idx": 2, "term_key": "ishur_giyur"},
    {"slug": "vaadat-charigim-tourist-conversion-israel", "obs_idx": 3, "term_key": "vaadat_charigim"},
    {"slug": "hebrew-clerk-letter-translator-form-ash1-ash3", "obs_idx": 4, "term_key": "five_docs"},
    {"slug": "israeli-rabbi-community-letters-beit-din", "obs_idx": 5, "term_key": "community_letters"},
    {"slug": "misrad-hapanim-spousal-visa-nohal-5-2-0008", "obs_idx": 6, "term_key": "fx_shield"},
    {"slug": "aliyah-spousal-visa-criminal-record-rehabilitation", "obs_idx": 7, "term_key": "five_docs"},
    {"slug": "tourist-visa-israel-remote-work-housing-giyur", "obs_idx": 8, "term_key": "bridge_health"},
    {"slug": "dahan-ruling-non-orthodox-conversion-aliyah-truth", "obs_idx": "dahan_truth", "term_key": "dahan_truth"}
]

STATUTORY_AUTHORITY_I18N = {
    "en": ("⚖️ 2026 Official PIBA & Chief Rabbinate Statutory Authority Table", "Procedure Nohal 5.2.0008 (Ed. 16, July 20, 2026 — Married Spouses, 6-Page Form Ash/6 Dossier & Lease Affidavit) • Nohal 5.2.0009 (Ed. 17, July 16, 2026 — Common-Law Couples, Form Ash/1, Ash/3 & 13-Clause Appendix A Affidavit) • Nohal 5.2.0001 (Ed. 10, May 19, 2026 — In-Israel Aliyah / Shinui Ma'amad, 3-Page Form Ash/456, MR/14 & Ash/114, Fee-Exempt per Sec. ג.7) • Dual-Armor Rights: Sec. ה.2(8) / ה.7 (45+45 Day Missing Document Extension via Visa Team Leader), Nohal 1.6.0001 (21-Day Written Internal Appeal against Appendix C Summary Refusal), Sec. ג.10 / ג.7 (Statutory Right to Run Spousal & Conversion/Aliyah Files Simultaneously), Sec. ד.2.ה (Marriage Certificate Prior-Single Status Exemption), and Nohal 2.11.0001 (Foreign & Utah Civil Marriage Registration)."),
    "he": ("⚖️ טבלת אסמכתאות חוקיות ונהלי רשות האוכלוסין והרבנות הראשית (מהדורות 2026)", "נוהל 5.2.0008 (מהדורה 16, 20 ביולי 2026 — בני זוג נשואים, אוגדן טופס אש/6 עמ׳ 1–6 ותצהיר שכ״ד) • נוהל 5.2.0009 (מהדורה 17, 16 ביולי 2026 — חיים משותפים / ידועים בציבור, טופס אש/1, אש/3 ותצהיר 13 הסעיפים מנספח א׳) • נוהל 5.2.0001 (מהדורה 10, 19 במאי 2026 — שינוי מעמד לעולה בישראל, טופס אש/456 בן 3 עמודים, שאלון מר/14 וטופס אש/114, פטור מאגרה לפי סעיף ג.7) • זכויות שריון כפול: סעיף ה.2(8) / ה.7 (הארכת מועד של 45+45 ימים להמצאת מסמכים בסמכות ראש צוות אשרות), נוהל 1.6.0001 (ערר פנימי בכתב תוך 21 יום על סירוב על הסף מנספח ג׳), סעיף ג.10 / ג.7 (זכות לנהל הליך זוגי והליך גיור/שבות במקביל ללא סגירת תיק), סעיף ד.2.ה (פטור מתעודת רווקות נפרדת כשמצב קודם מצוין בתעודת הנישואין), ונוהל 2.11.0001 (רישום נישואין אזרחיים/יוטה)."),
    "fr": ("⚖️ Référentiel Statutaire Officiel PIBA / Misrad HaPanim & Grand Rabbinat (Éditions 2026)", "Procédure Nohal 5.2.0008 (Éd. 16, 20 juillet 2026 — Couples Mariés, Dossier Formulaire Ash/6 p.1–6 & Attestation de Bail) • Nohal 5.2.0009 (Éd. 17, 16 juillet 2026 — Concubinage / Yeduim BeTzibur, Formulaires Ash/1, Ash/3 & Déclaration Annexe A en 13 clauses) • Nohal 5.2.0001 (Éd. 10, 19 mai 2026 — Aliyah en Israël / Shinui Ma'amad, Formulaire Ash/456, MR/14 & Ash/114, exonéré de frais art. ג.7) • Droits Double Blindage : Art. ה.2(8) (prorogation 45+45 jours via Chef d'Équipe Visas), Nohal 1.6.0001 (recours écrit sous 21 jours contre Annexe C), Art. ג.10 / ג.7 (droit de mener simultanément les dossiers Conjoint et Giyur/Aliyah), et Art. ד.2.ה (dispense de certificat de célibat séparé si mentionné sur l'acte de mariage)."),
    "es": ("⚖️ Tabla de Autoridad Legal Oficial PIBA / Misrad HaPanim y Gran Rabinato (Ediciones 2026)", "Procedimiento Nohal 5.2.0008 (Ed. 16, 20 de julio de 2026 — Cónyuges Casados, Dossier Formulario Ash/6 p.1–6 y Declaración de Alquiler) • Nohal 5.2.0009 (Ed. 17, 16 de julio de 2026 — Parejas de Hecho, Formularios Ash/1, Ash/3 y Declaración Jurada Anexo A de 13 cláusulas) • Nohal 5.2.0001 (Ed. 10, 19 de mayo de 2026 — Aliyá en Israel / Shinui Ma'amad, Formulario Ash/456, MR/14 y Ash/114, exento de tasa art. ג.7) • Derechos Doble Blindaje: Art. ה.2(8) (prórroga de 45+45 días vía Jefe de Visas), Nohal 1.6.0001 (apelación escrita en 21 días contra Anexo C), Art. ג.10 / ג.7 (derecho a tramitar Residencia Conyugal y Giyur/Aliyá simultáneamente) y Art. ד.2.ה (exención de soltería si consta en el acta de matrimonio)."),
    "de": ("⚖️ Offizielle Rechtsgrundlagen PIBA / Misrad HaPanim & Oberrabbinat (Ausgaben 2026)", "Verfahren Nohal 5.2.0008 (Ed. 16, 20. Juli 2026 — Verheiratete Paare, 6-Seiten-Dossier Ash/6 & Mietvertrag-Eid) • Nohal 5.2.0009 (Ed. 17, 16. Juli 2026 — Lebensgemeinschaften, Formular Ash/1, Ash/3 & 13-Klausel-Eid Anhang A) • Nohal 5.2.0001 (Ed. 10, 19. Mai 2026 — Inlands-Alija / Shinui Ma'amad, Formular Ash/456, MR/14 & Ash/114, gebührenfrei gem. Abs. ג.7) • Doppel-Schutzschild-Rechte: Abs. ה.2(8) (45+45 Tage Fristverlängerung durch Visa-Teamleiter), Nohal 1.6.0001 (21 Tage schriftliche Beschwerde gegen Anhang C), Abs. ג.10 / ג.7 (Recht auf gleichzeitige Führung von Ehepartner- und Gijur/Alija-Akte) sowie Abs. ד.2.ה (Ledigkeitsbefreiung bei Vermerk auf der Heiratsurkunde).")
}

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

def build_hub_library_html(lang, d):
    j = d.get("_jurisdiction", {})
    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    parts = [f'<div class="seo-obstacle-library"><details><summary>📖 {d.get("mesh_title", "Official Statutory Playbooks & Bureaucracy Guides")} (2026 PIBA Editions)</summary>']
    parts.append(f'<article><h2>{st_t}</h2><p>{st_p}</p>')
    if j:
        parts.append(f'<p><strong>{j.get("flag","")} {j.get("name","")}:</strong> {j.get("police","")} • {j.get("birth","")} • {j.get("single","")} • {j.get("apostille","")}</p>')
    parts.append('</article>')
    for idx, ob in enumerate(d.get("_obstacles", [])):
        parts.append(f'<article id="seo-obs-{idx}"><h3>{ob.get("tag","")} — {ob.get("title","")}</h3><p>{ob.get("body","")}</p><p><strong>{ob.get("badTitle","")}:</strong> {ob.get("badText","")}</p><p><strong>{ob.get("goodTitle","")}:</strong> {ob.get("goodText","")}</p></article>')
    for tk, tv in d.get("_terms", {}).items():
        parts.append(f'<article id="seo-term-{tk}"><h3>{tv.get("tag","")} — {tv.get("title","")}</h3><p>{tv.get("body","")}</p><h4>{tv.get("badTitle","")}</h4><div>{tv.get("badText","")}</div><h4>{tv.get("goodTitle","")}</h4><div>{tv.get("goodText","")}</div></article>')
    parts.append('</details></div>')
    return "\n".join(parts)

def render_page(lang, subpath, spoke_cfg=None):
    d = dicts[lang]
    out = base_html
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    out = re.sub(r'<html lang="[^"]*"(?: dir="[^"]*")?>', f'<html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}">', out, count=1)
    out = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', out, count=1)
    canon = f"https://giyuraliyahtrack.com/{subpath}" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/{subpath}"
    out = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{canon}" />', out, count=1)

    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)

    blocks = d.get("_blocks", {})
    for tid in ["track-0", "track-1", "track-2", "track-3"]:
        b_html = blocks.get(f"#{tid}")
        if b_html and not str(b_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<article class="track-card[^"]*" id="{tid}">)[\s\S]*?(</article>)', lambda m: m.group(1) + "\n" + b_html + "\n        " + m.group(2), out, count=1)

    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    j = d.get("_jurisdiction", {})
    j_line = f"<p><strong>{j.get('flag','')} {d.get('j_active','Jurisdiction:')} {j.get('name','')}:</strong> {j.get('police','')} | {j.get('birth','')} | {j.get('single','')} | {j.get('apostille','')}</p>" if j else ""

    if spoke_cfg is not None:
        obs_key = spoke_cfg["obs_idx"]
        t_key = spoke_cfg["term_key"]
        out = out.replace('id="app-nav-back" class="app-nav-back"', f'id="app-nav-back" href="{b_hub}" class="app-nav-back visible"')
        ob = d.get("_terms", {}).get("dahan_truth") if obs_key == "dahan_truth" else (d.get("_obstacles", [])[obs_key] if obs_key < len(d.get("_obstacles", [])) else None)
        tm = d.get("_terms", {}).get(t_key, {})
        if ob:
            tm_html = f"<hr style='margin:16px 0;border:none;border-top:1px solid #e2e8f0;'/><h2>{tm.get('tag','')} — {tm.get('title','')}</h2><p>{tm.get('body','')}</p><h3>{tm.get('badTitle','')}</h3><div>{tm.get('badText','')}</div><h3>{tm.get('goodTitle','')}</h3><div>{tm.get('goodText','')}</div>" if (tm and obs_key != "dahan_truth") else ""
            art = f'<article class="seo-spoke-article"><h2>{ob["tag"]} — {ob["title"]}</h2><p>{ob["body"]}</p><h3>{ob["badTitle"]}</h3><div>{ob["badText"]}</div><h3>{ob["goodTitle"]}</h3><div>{ob["goodText"]}</div>{tm_html}<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/><h3>{st_t}</h3><p>{st_p}</p>{j_line}</article>'
            out = out.replace('<div class="section-kicker">', art + '\n        <div class="section-kicker">', 1)
            out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
            if obs_key == "dahan_truth":
                out = re.sub(r'<a class="enemy-card" id="dahan-gold-card"[\s\S]*?</a>', '', out, count=1)
            page_title = f"{ob['title']} | Giyur Aliyah Track ({lang.upper()})"
            meta_desc = re.sub(r'<[^>]+>', ' ', f"{ob['body']} {st_p}")[:158].strip()
            out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{page_title}</title>", out, count=1)
            out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{meta_desc}" />', out, count=1)
            clean_bad = re.sub(r"<[^>]+>", " ", ob["badText"]).strip()
            clean_good = re.sub(r"<[^>]+>", " ", ob["goodText"]).strip()
            faq_entities = [
                {"@type": "Question", "name": ob["title"], "acceptedAnswer": {"@type": "Answer", "text": ob["body"]}},
                {"@type": "Question", "name": ob["badTitle"], "acceptedAnswer": {"@type": "Answer", "text": clean_bad}},
                {"@type": "Question", "name": ob["goodTitle"], "acceptedAnswer": {"@type": "Answer", "text": f"{clean_good} ({ob.get('time','')})"}},
                {"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}
            ]
            if tm and obs_key != "dahan_truth":
                faq_entities.append({"@type": "Question", "name": tm.get("title",""), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", tm.get("body","") + " " + tm.get("goodText","")).strip()[:600]}})
            faq_obj = {"@context": "https://schema.org", "@graph": [
                {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": ob["title"], "item": canon}]},
                {"@type": "FAQPage", "mainEntity": faq_entities}
            ]}
            faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
            out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
    else:
        page_title = f"{d.get('hero_h1','Giyur Aliyah Track')} | Giyur Aliyah Track ({lang.upper()})"
        meta_desc = re.sub(r'<[^>]+>', ' ', f"{d.get('hero_p','')} {d.get('ea_desc','')} {st_p}")[:158].strip()
        out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{page_title}</title>", out, count=1)
        out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{meta_desc}" />', out, count=1)
        hub_lib = build_hub_library_html(lang, d)
        out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', lambda _: hub_lib, out, count=1)

    og_tags = f'  <meta property="og:title" content="{page_title}" />\n  <meta property="og:description" content="{meta_desc}" />\n  <meta property="og:url" content="{canon}" />\n  <meta property="og:image" content="https://giyuraliyahtrack.com/bg-watercolor.jpg" />'
    out = out.replace("</head>", f"{og_tags}\n  {make_hreflang(subpath)}\n  {DOMAIN_SHIELD}\n</head>", 1)

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
        open(f"{sp_dir}/index.html", "w", encoding="utf-8").write(render_page(l, f"{s['slug']}/", s))

# Sync /forms/index.html robots meta with LIVE_SEO
if os.path.exists("public/forms/index.html"):
    fh = open("public/forms/index.html", encoding="utf-8").read()
    fh = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', fh, count=1)
    open("public/forms/index.html", "w", encoding="utf-8").write(fh)

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
print("✅ Pre-baked 4,500+ word 5-Language Static SEO Libraries, Unique Spoke Playbooks, OG Meta & 2026 Statutory Authority across all 56 pages!")
