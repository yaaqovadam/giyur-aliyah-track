import json, os, re

LIVE_SEO = False
ROBOTS_META = "index, follow" if LIVE_SEO else "noindex, nofollow"
DOMAIN_SHIELD = "<script>(function(){var h=location.hostname;if(h&&!/^(localhost|127\\.0\\.0\\.1|giyuraliyahtrack\\.com|www\\.giyuraliyahtrack\\.com|giyur-aliyah-track\\.(web\\.app|firebaseapp\\.com))$/.test(h)){location.replace('https://giyuraliyahtrack.com'+location.pathname);}})();</script>"

SPOKES = [
    {
        "slug": "emergency-aliyah-go-bag-shinui-maamad",
        "obs_idx": 0, "term_key": "go_bag",
        "l_slugs": {
            "en": "emergency-aliyah-go-bag-shinui-maamad",
            "he": "aliyat-cherum-tik-mismachim-shinui-maamad",
            "fr": "aliyah-urgence-dossier-apostille-shinui-maamad",
            "es": "aliya-emergencia-carpeta-apostilla-shinui-maamad",
            "de": "notfall-alija-apostille-dokumente-shinui-maamad",
            "ru": "ekstrennaya-repatriaciya-dokumenty-shinuj-maamad"
        }
    },
    {
        "slug": "apostille-180-day-clock-fbi-police-check-israel",
        "obs_idx": 1, "term_key": "five_docs",
        "l_slugs": {
            "en": "apostille-180-day-clock-fbi-police-check-israel",
            "he": "5-mismachei-apostille-teudat-yosher-180-yom",
            "fr": "5-documents-apostille-casier-judiciaire-180-jours-israel",
            "es": "5-documentos-apostilla-antecedentes-penales-180-dias-israel",
            "de": "5-apostille-dokumente-fuehrungszeugnis-180-tage-israel",
            "ru": "5-dokumentov-apostil-spravka-o-nesudimosti-180-dnej-izrail"
        }
    },
    {
        "slug": "gush-etzion-private-conversion-aliyah",
        "obs_idx": 2, "term_key": "ishur_giyur",
        "l_slugs": {
            "en": "gush-etzion-private-conversion-aliyah",
            "he": "giyur-prati-gush-etzion-bnei-brak-rabbanut-aliyah",
            "fr": "conversion-privee-gush-etzion-bnei-brak-aliyah-rabbinat",
            "es": "conversion-privada-gush-etzion-bnei-brak-aliya-rabinato",
            "de": "privater-giur-gush-etzion-bnei-brak-alija-rabbinat",
            "ru": "chastnyj-giyur-gush-ecion-bnej-brak-repatriaciya-ravvinat"
        }
    },
    {
        "slug": "vaadat-charigim-tourist-conversion-israel",
        "obs_idx": 3, "term_key": "vaadat_charigim",
        "l_slugs": {
            "en": "vaadat-charigim-tourist-conversion-israel",
            "he": "vaadat-charigim-giyur-ashrat-tayar-tofes-ash1",
            "fr": "vaadat-charigim-conversion-visa-touriste-israel-ash1",
            "es": "vaadat-jariguim-conversion-visa-turista-israel-ash1",
            "de": "vaadat-charigim-giur-touristenvisum-israel-ash1",
            "ru": "vaadat-harigim-giyur-turisticheskaya-viza-izrail-ash1"
        }
    },
    {
        "slug": "hebrew-clerk-letter-translator-form-ash1-ash3",
        "obs_idx": 4, "term_key": "five_docs",
        "l_slugs": {
            "en": "hebrew-clerk-letter-translator-form-ash1-ash3",
            "he": "drishat-mismachim-misrad-hapanim-tofes-ash1-ash3",
            "fr": "traducteur-lettre-misrad-hapanim-formulaire-ash1-ash3",
            "es": "traductor-carta-misrad-hapanim-formulario-ash1-ash3",
            "de": "misrad-hapanim-schreiben-uebersetzer-formular-ash1-ash3",
            "ru": "perevod-pisma-mvd-izrailya-anketa-ash1-ash3"
        }
    },
    {
        "slug": "israeli-rabbi-community-letters-beit-din",
        "obs_idx": 5, "term_key": "community_letters",
        "l_slugs": {
            "en": "israeli-rabbi-community-letters-beit-din",
            "he": "rav-melaveh-madrichat-kallah-michtavei-hamlatza-beit-din",
            "fr": "rabbin-accompagnateur-madrichat-kallah-lettres-beit-din",
            "es": "rabino-patrocinador-madrijat-kala-cartas-beit-din",
            "de": "begleitender-rabbiner-madrichat-kallah-empfehlung-beit-din",
            "ru": "soprovozhdayushchij-ravvin-madrihat-kalla-pisma-bejt-din"
        }
    },
    {
        "slug": "misrad-hapanim-spousal-visa-nohal-5-2-0008",
        "obs_idx": 6, "term_key": "spousal_deep_dive",
        "l_slugs": {
            "en": "misrad-hapanim-spousal-visa-nohal-5-2-0008",
            "he": "halich-medurag-bnei-zug-nohal-5-2-0008-tofes-ash6",
            "fr": "visa-conjoint-israel-misrad-hapanim-nohal-5-2-0008-ash6",
            "es": "visa-pareja-conyuge-israel-misrad-hapanim-nohal-5-2-0008-ash6",
            "de": "ehepartner-visum-israel-misrad-hapanim-nohal-5-2-0008-ash6",
            "ru": "stupenchataya-procedura-sst-mvd-izrailya-nohal-5-2-0008-ash6"
        }
    },
    {
        "slug": "aliyah-spousal-visa-criminal-record-rehabilitation",
        "obs_idx": 7, "term_key": "five_docs",
        "l_slugs": {
            "en": "aliyah-spousal-visa-criminal-record-rehabilitation",
            "he": "aliyah-halich-medurag-avar-plili-teudat-yosher",
            "fr": "aliyah-visa-conjoint-casier-judiciaire-rehabilitation",
            "es": "aliya-visa-pareja-antecedentes-penales-rehabilitacion",
            "de": "alija-ehepartner-visum-vorstrafe-fuehrungszeugnis",
            "ru": "repatriaciya-sst-izrail-sudimost-spravka-mvd"
        }
    },
    {
        "slug": "tourist-visa-israel-remote-work-housing-giyur",
        "obs_idx": 8, "term_key": "bridge_health",
        "l_slugs": {
            "en": "tourist-visa-israel-remote-work-housing-giyur",
            "he": "ashrat-tayar-avoda-merachok-megurim-bituach-refui",
            "fr": "visa-touriste-israel-teletravail-logement-assurance-sante",
            "es": "visa-turista-israel-trabajo-remoto-alojamiento-seguro-medico",
            "de": "touristenvisum-israel-fernstudium-wohnung-krankenversicherung",
            "ru": "turisticheskaya-viza-izrail-udalennaya-rabota-zhile-strahovka"
        }
    },
    {
        "slug": "dahan-ruling-non-orthodox-conversion-aliyah-truth",
        "obs_idx": "dahan_truth", "term_key": "dahan_truth",
        "l_slugs": {
            "en": "dahan-ruling-non-orthodox-conversion-aliyah-truth",
            "he": "psak-din-dahan-giyur-reformi-konservativi-rabbanut",
            "fr": "arret-dahan-conversion-reformee-massorti-aliyah-rabbinat",
            "es": "fallo-dahan-conversion-reformista-conservadora-aliya-rabinato",
            "de": "dahan-urteil-reform-konservativer-giur-alija-rabbinat",
            "ru": "reshenie-dahan-reformistskij-konservativnyj-giyur-ravvinat"
        }
    },
    {
        "slug": "overseas-conversion-aliyah-ishur-giyur",
        "obs_idx": 2, "term_key": "overseas_giyur",
        "l_slugs": {
            "en": "overseas-conversion-aliyah-ishur-giyur",
            "he": "giyur-bachul-rca-london-consistoire-ishur-giyur-aliyah",
            "fr": "conversion-consistoire-etranger-aliyah-ishur-giyur-rabbinat",
            "es": "conversion-extranjero-amia-fcje-aliya-ishur-giyur-rabinato",
            "de": "auslands-giur-ord-ikg-alija-ishur-giyur-oberrabbinat",
            "ru": "zarubezhnyj-giyur-feor-keroor-repatriaciya-ishur-giyur"
        }
    }
    ,{
        "slug": "newborn-baby-teudat-zehut-sefach-registration-israel",
        "obs_idx": 6, "term_key": "newborn_sefach",
        "l_slugs": {
            "en": "newborn-baby-teudat-zehut-sefach-registration-israel",
            "he": "rishum-tinok-sefach-teudat-zehut-misrad-hapanim-bdikat-rikmot",
            "fr": "inscription-nouveau-ne-teudat-zehut-sefach-misrad-hapanim",
            "es": "registro-bebe-recien-nacido-teudat-zehut-sefach-israel",
            "de": "neugeborenes-baby-teudat-zehut-sefach-registrierung-israel",
            "ru": "registraciya-novorozhdennogo-rebenka-teudat-zeut-sefah-mvd"
        }
    }
]

STATUTORY_AUTHORITY_I18N = {
    "en": ("⚖️ 2026 Official PIBA & Chief Rabbinate Statutory Authority Table", "Procedure Nohal 5.2.0008 (Ed. 16, July 20, 2026 — Married Spouses, 6-Page Form Ash/6 Dossier & Lease Affidavit) • Nohal 5.2.0009 (Ed. 17, July 16, 2026 — Common-Law Couples, Form Ash/1, Ash/3 & 13-Clause Appendix A Affidavit) • Nohal 5.2.0001 (Ed. 10, May 19, 2026 — In-Israel Aliyah / Shinui Ma'amad, 3-Page Form Ash/456, MR/14 & Ash/114, Fee-Exempt per Sec. ג.7) • Dual-Armor Rights: Sec. ה.2(8) / ה.7 (45+45 Day Missing Document Extension via Visa Team Leader), Nohal 1.6.0001 (21-Day Written Internal Appeal against Appendix C Summary Refusal), Sec. ג.10 / ג.7 (Statutory Right to Run Spousal & Conversion/Aliyah Files Simultaneously), Sec. ד.2.ה (Marriage Certificate Prior-Single Status Exemption), and Nohal 2.11.0001 (Foreign & Utah Civil Marriage Registration)."),
    "he": ("⚖️ טבלת אסמכתאות חוקיות ונהלי רשות האוכלוסין והרבנות הראשית (מהדורות 2026)", "נוהל 5.2.0008 (מהדורה 16, 20 ביולי 2026 — בני זוג נשואים, אוגדן טופס אש/6 עמ׳ 1–6 ותצהיר שכ״ד) • נוהל 5.2.0009 (מהדורה 17, 16 ביולי 2026 — חיים משותפים / ידועים בציבור, טופס אש/1, אש/3 ותצהיר 13 הסעיפים מנספח א׳) • נוהל 5.2.0001 (מהדורה 10, 19 במאי 2026 — שינוי מעמד לעולה בישראל, טופס אש/456 בן 3 עמודים, שאלון מר/14 וטופס אש/114, פטור מאגרה לפי סעיף ג.7) • זכויות שריון כפול: סעיף ה.2(8) / ה.7 (הארכת מועד של 45+45 ימים להמצאת מסמכים בסמכות ראש צוות אשרות), נוהל 1.6.0001 (ערר פנימי בכתב תוך 21 יום על סירוב על הסף מנספח ג׳), סעיף ג.10 / ג.7 (זכות לנהל הליך זוגי והליך גיור/שבות במקביל ללא סגירת תיק), סעיף ד.2.ה (פטור מתעודת רווקות נפרדת כשמצב קודם מצוין בתעודת הנישואין), ונוהל 2.11.0001 (רישום נישואין אזרחיים/יוטה)."),
    "fr": ("⚖️ Référentiel Statutaire Officiel PIBA / Misrad HaPanim & Grand Rabbinat (Éditions 2026)", "Procédure Nohal 5.2.0008 (Éd. 16, 20 juillet 2026 — Couples Mariés, Dossier Formulaire Ash/6 p.1–6 & Attestation de Bail) • Nohal 5.2.0009 (Éd. 17, 16 juillet 2026 — Concubinage / Yeduim BeTzibur, Formulaires Ash/1, Ash/3 & Déclaration Annexe A en 13 clauses) • Nohal 5.2.0001 (Éd. 10, 19 mai 2026 — Aliyah en Israël / Shinui Ma'amad, Formulaire Ash/456, MR/14 & Ash/114, exonéré de frais art. ג.7) • Droits Double Blindage : Art. ה.2(8) (prorogation 45+45 jours via Chef d'Équipe Visas), Nohal 1.6.0001 (recours écrit sous 21 jours contre Annexe C), Art. ג.10 / ג.7 (droit de mener simultanément les dossiers Conjoint et Giyur/Aliyah), et Art. ד.2.ה (dispense de certificat de célibat séparé si mentionné sur l'acte de mariage)."),
    "es": ("⚖️ Tabla de Autoridad Legal Oficial PIBA / Misrad HaPanim y Gran Rabinato (Ediciones 2026)", "Procedimiento Nohal 5.2.0008 (Ed. 16, 20 de julio de 2026 — Cónyuges Casados, Dossier Formulario Ash/6 p.1–6 y Declaración de Alquiler) • Nohal 5.2.0009 (Ed. 17, 16 de julio de 2026 — Parejas de Hecho, Formularios Ash/1, Ash/3 y Declaración Jurada Anexo A de 13 cláusulas) • Nohal 5.2.0001 (Ed. 10, 19 de mayo de 2026 — Aliyá en Israel / Shinui Ma'amad, Formulario Ash/456, MR/14 y Ash/114, exento de tasa art. ג.7) • Derechos Doble Blindaje: Art. ה.2(8) (prórroga de 45+45 días vía Jefe de Visas), Nohal 1.6.0001 (apelación escrita en 21 días contra Anexo C), Art. ג.10 / ג.7 (derecho a tramitar Residencia Conyugal y Giyur/Aliyá simultáneamente) y Art. ד.2.ה (exención de soltería si consta en el acta de matrimonio)."),
    "de": ("⚖️ Offizielle Rechtsgrundlagen PIBA / Misrad HaPanim & Oberrabbinat (Ausgaben 2026)", "Verfahren Nohal 5.2.0008 (Ed. 16, 20. Juli 2026 — Verheiratete Paare, 6-Seiten-Dossier Ash/6 & Mietvertrag-Eid) • Nohal 5.2.0009 (Ed. 17, 16. Juli 2026 — Lebensgemeinschaften, Formular Ash/1, Ash/3 & 13-Klausel-Eid Anhang A) • Nohal 5.2.0001 (Ed. 10, 19. Mai 2026 — Inlands-Alija / Shinui Ma'amad, Formular Ash/456, MR/14 & Ash/114, gebührenfrei gem. Abs. ג.7) • Doppel-Schutzschild-Rechte: Abs. ה.2(8) (45+45 Tage Fristverlängerung durch Visa-Teamleiter), Nohal 1.6.0001 (21 Tage schriftliche Beschwerde gegen Anhang C), Abs. ג.10 / ג.7 (Recht auf gleichzeitige Führung von Ehepartner- und Gijur/Alija-Akte) sowie Abs. ד.2.ה (Ledigkeitsbefreiung bei Vermerk auf der Heiratsurkunde)."),
    "ru": ("⚖️ Официальная правовая база МВД Израиля (PIBA) и Главного раввината (Редакции 2026 г.)", "Инструкция Ноаль 5.2.0008 (Ред. 16 от 20.07.2026 — Зарегистрированные супруги, анкета Аш/6 на 6 стр. и декларация аренды) • Ноаль 5.2.0009 (Ред. 17 от 16.07.2026 — Гражданские партнёры / Ядуим бе-Цибур, анкеты Аш/1, Аш/3 и аффидевит Приложения А из 13 пунктов) • Ноаль 5.2.0001 (Ред. 10 от 19.05.2026 — Репатриация внутри Израиля / Шинуй Маамад, анкета Аш/456, МР/14 и Аш/114, освобождение от пошлины по п. ג.7) • Права двойной защиты: п. ה.2(8) (продление срока подачи документов на 45+45 дней через руководителя визового отдела), Ноаль 1.6.0001 (21 день на письменную апелляцию против отказа), п. ג.10 / ג.7 (право вести дело о ССТ и гиюре/репатриации параллельно без закрытия дела).")
}

LANGS = ["en", "he", "fr", "es", "de", "ru"]
dicts = {l: json.load(open(f"public/i18n/{l}.json", encoding="utf-8")) for l in LANGS}

base_html = open("public/index.html", encoding="utf-8").read()
base_html = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\s*', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = base_html.replace(DOMAIN_SHIELD, "")
base_html = re.sub(r'<article class="seo-spoke-article">[\s\S]*?</article>\s*', '', base_html)

def get_localized_url(lang, spoke_cfg):
    if spoke_cfg is None:
        return "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    loc_slug = spoke_cfg["l_slugs"].get(lang, spoke_cfg["slug"])
    return f"https://giyuraliyahtrack.com/{loc_slug}/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/{loc_slug}/"

def make_hreflang(spoke_cfg):
    en_url = get_localized_url("en", spoke_cfg)
    tags = [f'<link rel="alternate" hreflang="x-default" href="{en_url}" />']
    for l in LANGS:
        u = get_localized_url(l, spoke_cfg)
        tags.append(f'<link rel="alternate" hreflang="{l}" href="{u}" />')
    return "\n  ".join(tags)

def format_seo_rich_text(raw_html):
    s = str(raw_html or "")
    s = re.sub(r'(?<!^)\s*(•)\s*', r'<br><span style="color:#0288D1;font-weight:900;">•</span> ', s)
    s = re.sub(r'(?<!^)\s*(\d+\.\s+<strong>)', r'<span class="gat-seo-step-item">\1', s)
    return s

def clean_no_divs(raw_str):
    s = str(raw_str or "")
    s = re.sub(r'</?div[^>]*>', '', s)
    return format_seo_rich_text(s)

def build_hub_library_html(lang, d):
    j = d.get("_jurisdiction", {})
    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    parts = [f'<div class="seo-obstacle-library"><details><summary>📖 {d.get("mesh_title", "Official Statutory Playbooks & Bureaucracy Guides")} (2026 PIBA Editions)</summary>']
    parts.append(f'<article><h2>{st_t}</h2><p>{st_p}</p>')
    if j:
        parts.append(f'<p><strong>{j.get("flag","")} {j.get("name","")}:</strong> {j.get("police","")} • {j.get("birth","")} • {j.get("single","")} • {j.get("apostille","")}</p>')
    parts.append('</article>')
    for idx, ob in enumerate(d.get("_obstacles", [])):
        parts.append(f'<article id="seo-obs-{idx}"><details class="gat-seo-card-acc"><summary><span>{ob.get("tag","")} — {ob.get("title","")}</span><span class="gat-acc-plus">＋</span></summary><section class="gat-acc-body"><h3>{ob.get("title","")}</h3><p>{ob.get("body","")}</p><h4>{ob.get("badTitle","")}</h4><p>{clean_no_divs(ob.get("badText",""))}</p><h4>{ob.get("goodTitle","")}</h4><p>{clean_no_divs(ob.get("goodText",""))}</p></section></details></article>')
    for tk, tv in d.get("_terms", {}).items():
        parts.append(f'<article id="seo-term-{tk}"><details class="gat-seo-card-acc"><summary><span>{tv.get("tag","")} — {tv.get("title","")}</span><span class="gat-acc-plus">＋</span></summary><section class="gat-acc-body"><h3>{tv.get("title","")}</h3><p>{tv.get("body","")}</p><h4>{tv.get("badTitle","")}</h4><p>{clean_no_divs(tv.get("badText",""))}</p><h4>{tv.get("goodTitle","")}</h4><p>{clean_no_divs(tv.get("goodText",""))}</p></section></details></article>')
    parts.append('</details></div>')
    return "\n".join(parts)

def render_page(lang, canon_url, spoke_cfg=None):
    d = dicts[lang]
    out = base_html
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    out = re.sub(r'<html lang="[^"]*"(?: dir="[^"]*")?>', f'<html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}">', out, count=1)
    out = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', out, count=1)
    out = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{canon_url}" />', out, count=1)

    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)

    fp = d.get("_funnel_pre_ai", {})
    if fp:
        out = re.sub(r'(<div id="gat-cat-hdr-1"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + f'<span>{fp.get("cat1","")}</span><span style="color:#4FC3F7;font-size:0.75rem;">{fp.get("freeTag","")}</span>' + m.group(2), out, count=1)
        out = re.sub(r'(<div id="gat-cat-hdr-2"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + f'<span>{fp.get("cat2","")}</span><span style="color:#4FC3F7;font-size:0.75rem;">{fp.get("freeTag","")}</span>' + m.group(2), out, count=1)
        out = re.sub(r'(<div id="gat-cat-hdr-3"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + f'<span>{fp.get("cat3","")}</span><span style="color:#4FC3F7;font-size:0.75rem;">{fp.get("freeTag","")}</span>' + m.group(2), out, count=1)

    blocks = d.get("_blocks", {})
    for tid in ["track-0", "track-1", "track-2", "track-3"]:
        b_html = blocks.get(f"#{tid}")
        if b_html and not str(b_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<article class="track-card[^"]*" id="{tid}">)[\s\S]*?(</article>)', lambda m: m.group(1) + "\n" + b_html + "\n        " + m.group(2), out, count=1)

    for mg_id in ["mg-0", "mg-1", "mg-2", "mg-3"]:
        mg_html = blocks.get(f"#{mg_id}")
        if mg_html and not str(mg_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<div class="milestone-group" id="{mg_id}">)[\s\S]*?(</div>\s*(?=<div class="milestone-group"|<a href="/app"))', lambda m: m.group(1) + "\n" + mg_html + "\n        </div>\n        ", out, count=1)

    if blocks.get("#left-drawer-panel") and not str(blocks["#left-drawer-panel"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<aside class="drawer-panel" id="left-drawer-panel">)[\s\S]*?(</aside>)', lambda m: m.group(1) + "\n" + blocks["#left-drawer-panel"] + "\n  " + m.group(2), out, count=1)

    if blocks.get("#view-3 .vetted-card") and not str(blocks["#view-3 .vetted-card"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="vetted-card"[^>]*>)[\s\S]*?(</div>\s*</section>)', lambda m: m.group(1) + blocks["#view-3 .vetted-card"] + "</div>\n      </section>", out, count=1)

    if blocks.get("#view-4 .shield-banner") and not str(blocks["#view-4 .shield-banner"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="shield-banner">)[\s\S]*?(</div>\s*<!-- 4 INTERACTIVE)', lambda m: m.group(1) + blocks["#view-4 .shield-banner"] + "</div>\n\n        <!-- 4 INTERACTIVE", out, count=1)

    if blocks.get("#view-4 .two-way-bar") and not str(blocks["#view-4 .two-way-bar"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="two-way-bar">)[\s\S]*?(</div>\s*<!-- MAJOR COMPONENT 1)', lambda m: m.group(1) + blocks["#view-4 .two-way-bar"] + "</div>\n\n        <!-- MAJOR COMPONENT 1", out, count=1)

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
            # If this spoke is specifically about a term (like overseas_giyur), lead with the term title so every language page has its exact native title!
            lead_title = tm.get("title", ob["title"]) if t_key in ("overseas_giyur", "newborn_sefach") else ob["title"]
            tm_html = f"<hr style='margin:16px 0;border:none;border-top:1px solid #e2e8f0;'/><h2>{tm.get('tag','')} — {tm.get('title','')}</h2><p>{tm.get('body','')}</p><h3>{tm.get('badTitle','')}</h3><div>{clean_no_divs(tm.get('badText',''))}</div><h3>{tm.get('goodTitle','')}</h3><div>{clean_no_divs(tm.get('goodText',''))}</div>" if (tm and obs_key != "dahan_truth") else ""
            art = f'<article class="seo-spoke-article"><h1>{lead_title}</h1><h2>{ob["tag"]} — {ob["title"]}</h2><p>{ob["body"]}</p><h3>{ob["badTitle"]}</h3><div>{clean_no_divs(ob["badText"])}</div><h3>{ob["goodTitle"]}</h3><div>{clean_no_divs(ob["goodText"])}</div>{tm_html}<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/><h3>{st_t}</h3><p>{st_p}</p>{j_line}</article>'
            out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
            out = out.replace('<div class="section-kicker">', art + '\n        <div class="section-kicker">', 1)
            out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
            if obs_key == "dahan_truth":
                out = re.sub(r'<a class="enemy-card" id="dahan-gold-card"[\s\S]*?</a>', '', out, count=1)
            page_title = f"{lead_title} | Giyur Aliyah Track ({lang.upper()})"
            meta_desc = re.sub(r'<[^>]+>', ' ', f"{ob['body']} {st_p}")[:158].strip()
            out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{page_title}</title>", out, count=1)
            out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{meta_desc}" />', out, count=1)
            clean_bad = re.sub(r"<[^>]+>", " ", ob["badText"]).strip()
            clean_good = re.sub(r"<[^>]+>", " ", ob["goodText"]).strip()
            faq_entities = [
                {"@type": "Question", "name": lead_title, "acceptedAnswer": {"@type": "Answer", "text": ob["body"]}},
                {"@type": "Question", "name": ob["badTitle"], "acceptedAnswer": {"@type": "Answer", "text": clean_bad}},
                {"@type": "Question", "name": ob["goodTitle"], "acceptedAnswer": {"@type": "Answer", "text": f"{clean_good} ({ob.get('time','')})"}},
                {"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}
            ]
            if tm and obs_key != "dahan_truth":
                faq_entities.append({"@type": "Question", "name": tm.get("title",""), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", tm.get("body","") + " " + tm.get("goodText","")).strip()[:600]}})
            faq_obj = {"@context": "https://schema.org", "@graph": [
                {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": lead_title, "item": canon_url}]},
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
        hub_faqs = [{"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}]
        for ob_item in d.get("_obstacles", [])[:9]:
            q_txt = f"{ob_item.get('tag','')} — {ob_item.get('title','')}".strip(" —")
            a_txt = re.sub(r"<[^>]+>", " ", f"{ob_item.get('body','')} {ob_item.get('goodText','')}").strip()[:650]
            if q_txt and a_txt:
                hub_faqs.append({"@type": "Question", "name": q_txt, "acceptedAnswer": {"@type": "Answer", "text": a_txt}})
        hub_faq_obj = {"@context": "https://schema.org", "@graph": [
            {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}]},
            {"@type": "FAQPage", "mainEntity": hub_faqs}
        ]}
        hub_faq_tag = '<script type="application/ld+json">\n' + json.dumps(hub_faq_obj, ensure_ascii=False) + '\n</script>'
        out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: hub_faq_tag, out, count=1)

    og_loc = {"en":"en_US","he":"he_IL","fr":"fr_FR","es":"es_ES","de":"de_DE","ru":"ru_RU"}.get(lang, "en_US")
    og_tags = f'  <meta property="og:type" content="website" />\n  <meta property="og:locale" content="{og_loc}" />\n  <meta property="og:site_name" content="Giyur Aliyah Track" />\n  <meta property="og:title" content="{page_title}" />\n  <meta property="og:description" content="{meta_desc}" />\n  <meta property="og:url" content="{canon_url}" />\n  <meta property="og:image" content="https://giyuraliyahtrack.com/bg-watercolor.jpg" />\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="{page_title}" />\n  <meta name="twitter:description" content="{meta_desc}" />'
    out = out.replace("</head>", f"{og_tags}\n  {make_hreflang(spoke_cfg)}\n  {DOMAIN_SHIELD}\n</head>", 1)

    if lang != "en":
        dahan_loc = SPOKES[9]["l_slugs"].get(lang, SPOKES[9]["slug"])
        out = out.replace('id="dahan-gold-card" href="/dahan-ruling-non-orthodox-conversion-aliyah-truth/"', f'id="dahan-gold-card" href="/{lang}/{dahan_loc}/"')
        for sp in SPOKES:
            en_s = sp["slug"]
            loc_s = sp["l_slugs"].get(lang, en_s)
            out = out.replace(f'href="/{en_s}/"', f'href="/{lang}/{loc_s}/"')
    return out

for l in LANGS:
    hub_dir = "public" if l == "en" else f"public/{l}"
    os.makedirs(hub_dir, exist_ok=True)
    hub_canon = get_localized_url(l, None)
    open(f"{hub_dir}/index.html", "w", encoding="utf-8").write(render_page(l, hub_canon, None))
    for s in SPOKES:
        loc_slug = s["l_slugs"].get(l, s["slug"])
        canon = get_localized_url(l, s)
        rendered_html = render_page(l, canon, s)
        # Write localized native slug directory
        loc_dir = f"public/{loc_slug}" if l == "en" else f"public/{l}/{loc_slug}"
        os.makedirs(loc_dir, exist_ok=True)
        open(f"{loc_dir}/index.html", "w", encoding="utf-8").write(rendered_html)

if os.path.exists("public/forms/index.html"):
    fh = open("public/forms/index.html", encoding="utf-8").read()
    fh = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', fh, count=1)
    open("public/forms/index.html", "w", encoding="utf-8").write(fh)

open("public/robots.txt", "w", encoding="utf-8").write("User-agent: *\n" + ("Allow: /\n" if LIVE_SEO else "Disallow: /\n") + "Sitemap: https://giyuraliyahtrack.com/sitemap.xml\n")
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
for sp_cfg in [None] + SPOKES:
    for l in LANGS:
        loc = get_localized_url(l, sp_cfg)
        sm.append(f"  <url>\n    <loc>{loc}</loc>")
        sm.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{get_localized_url("en", sp_cfg)}"/>')
        for alt in LANGS:
            aloc = get_localized_url(alt, sp_cfg)
            sm.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{aloc}"/>')
        sm.append("  </url>")
sm.append("</urlset>")
open("public/sitemap.xml", "w", encoding="utf-8").write("\n".join(sm))
print("✅ Pre-baked 6-Language Native SEO Libraries, Localized URLs & Statutory Authority across 132 static HTML pages!")


# === 48 PRE-BAKED GOVERNMENT FORM LANDING PAGES (100% 6-LANGUAGE NATIVE URLS & CONTENT) ===
FORM_CATALOG = [
    {
        "key": "ash1", "short_slug": "ash1", "code": "Ash/1 (אש/1)", "raw_pdf": "/app/forms/Ash1.pdf",
        "l_slugs": {
            "en": "form-ash1-vaadat-charigim-visa-application-israel",
            "he": "tofes-ash1-vaadat-charigim-bakashat-ashra",
            "fr": "formulaire-ash1-vaadat-charigim-demande-visa-israel",
            "es": "formulario-ash1-vaadat-jariguim-solicitud-visa-israel",
            "de": "formular-ash1-vaadat-charigim-visumantrag-israel",
            "ru": "anketa-ash1-vaadat-harigim-zayavlenie-na-vizu-izrail"
        },
        "titles": {
            "en": "Form Ash/1 (טופס אש/1) — Va'adat Charigim & Visa Application English-to-Hebrew Auto-Filler",
            "he": "טופס אש/1 להורדה ומילוי אוטומטי — בקשה לאשרת כניסה ווועדת חריגים לגיור",
            "fr": "Formulaire Ash/1 (טופס אש/1) — Remplir en Français → PDF Officiel en Hébreu (Va'adat Charigim)",
            "es": "Formulario Ash/1 (טופס אש/1) — Rellenar en Español → PDF Oficial en Hebreo (Va'adat Jariguim)",
            "de": "Formular Ash/1 (טופס אש/1) — Auf Deutsch ausfüllen → Offizielles Hebräisches PDF (Va'adat Charigim)",
            "ru": "Анкета Аш/1 (טופס אש/1) — Заполнить на русском → Готовый PDF на иврите (Ваадат Харигим)"
        },
        "traps": {
            "en": "Misrad HaPanim and Va'adat Charigim reject Form Ash/1 if filled out in English or submitted without a statutory Hebrew Explanation Letter (Michtav Hesber), all 5 Apostilled Homeland Documents under 180 days old, and signed Hebrew letters from an Israeli Sponsoring Rabbi and Host Family with 9-digit Teudat Zehut numbers.",
            "he": "משרד הפנים ווועדת החריגים דוחים על הסף את טופס אש/1 אם אינו מוגש בעברית תקנית בצירוף מכתב הסבר מנומק, 5 מסמכי מקור מאומתים באפוסטיל בתוקף של פחות מ-180 יום, ומכתבי המלצה מרב מלווה ומשפחה מארחת עם מספרי תעודת זהות.",
            "fr": "Le Misrad HaPanim et la Va'adat Charigim rejettent le formulaire Ash/1 s'il est rempli en français/anglais ou déposé sans lettre explicative légale en hébreu (Michtav Hesber), vos 5 documents apostillés de moins de 180 jours et les lettres de votre rabbin et famille d'accueil israéliens.",
            "es": "Misrad HaPanim y Va'adat Jariguim rechazan el Formulario Ash/1 si se rellena en español/inglés o sin una carta legal en hebreo (Mijtav Hesber), los 5 documentos apostillados (<180 días) y cartas firmadas por un rabino patrocinador y familia anfitriona en Israel.",
            "de": "Misrad HaPanim und die Va'adat Charigim lehnen Formular Ash/1 ab, wenn es auf Deutsch/Englisch ausgefüllt wird oder ohne hebräisches Erklärungsschreiben (Michtav Hesber), alle 5 Apostille-Dokumente (<180 Tage) sowie Empfehlungsbriefe Ihres israelischen Rabbiners eingereicht wird.",
            "ru": "МВД Израиля и комиссия Ваадат Харигим отклоняют анкету Аш/1, если она заполнена латиницей/по-русски или подана без официального письма-объяснения на иврите (Михтав Эсбер), 5 документов с апостилем (<180 дней) и писем от израильского раввина и принимающей семьи с номерами Теудат-Зеут."
        }
    },
    {
        "key": "ash3", "short_slug": "ash3", "code": "Ash/3 (אש/3)", "raw_pdf": "/app/forms/Ash3.pdf",
        "l_slugs": {
            "en": "form-ash3-visa-extension-change-of-status-israel",
            "he": "tofes-ash3-haarachat-ashra-shinui-maamad",
            "fr": "formulaire-ash3-prolongation-visa-changement-statut-israel",
            "es": "formulario-ash3-prorroga-visa-cambio-estatus-israel",
            "de": "formular-ash3-visumverlaengerung-statusaenderung-israel",
            "ru": "anketa-ash3-prodlenie-vizy-smena-statusa-izrail"
        },
        "titles": {
            "en": "Form Ash/3 (טופס אש/3) — B/2 Visa Extension & Change of Status English-to-Hebrew Auto-Filler",
            "he": "טופס אש/3 להורדה ומילוי אוטומטי — בקשה להארכת אשרת שהייה או החלפת סוג אשרה",
            "fr": "Formulaire Ash/3 (טופס אש/3) — Remplir en Français → PDF Officiel en Hébreu (Prolongation Visa)",
            "es": "Formulario Ash/3 (טופס אש/3) — Rellenar en Español → PDF Oficial en Hebreo (Prórroga de Visa)",
            "de": "Formular Ash/3 (טופס אש/3) — Auf Deutsch ausfüllen → Offizielles Hebräisches PDF (Visumverlängerung)",
            "ru": "Анкета Аш/3 (טופס אש/3) — Заполнить на русском → Готовый PDF на иврите (Продление визы)"
        },
        "traps": {
            "en": "Filing Form Ash/3 to extend a B/2 tourist visa without an active Conversion or Spousal file can trigger an immediate refusal and a 14-day departure order if your reason for staying is not legally anchored in Hebrew.",
            "he": "הגשת טופס אש/3 להארכת אשרת תייר B/2 ללא תיק גיור או הליך מדורג פתוח עלולה להוביל לסירוב מיידי ולצו יציאה מהארץ תוך 14 יום אם נימוקי הבקשה אינם מעוגנים חוקית.",
            "fr": "Déposer le formulaire Ash/3 pour prolonger un visa touriste B/2 sans dossier de conversion ou de conjoint ouvert peut entraîner un refus immédiat et une obligation de quitter le territoire sous 14 jours.",
            "es": "Presentar el Formulario Ash/3 para prorrogar una visa de turista B/2 sin un expediente activo de conversión o pareja puede provocar un rechazo inmediato y una orden de salida de 14 días.",
            "de": "Das Einreichen von Formular Ash/3 zur Verlängerung eines B/2-Touristenvisums ohne offene Giur- oder Partnerakte kann zu einer sofortigen Ablehnung und einer 14-tägigen Ausreiseaufforderung führen.",
            "ru": "Подача анкеты Аш/3 для продления турвизы B/2 без открытого дела о гиюре или СТУПРО может привести к немедленному отказу и предписанию покинуть Израиль в течение 14 дней."
        }
    },
    {
        "key": "ash6", "short_slug": "ash6", "code": "Ash/6 (אש/6)", "raw_pdf": "/app/forms/Ash6.pdf",
        "l_slugs": {
            "en": "form-ash6-spousal-visa-nohal-5-2-0008-israel",
            "he": "tofes-ash6-halich-medurag-nohal-5-2-0008",
            "fr": "formulaire-ash6-visa-conjoint-nohal-5-2-0008-israel",
            "es": "formulario-ash6-visa-conyugal-nohal-5-2-0008-israel",
            "de": "formular-ash6-ehepartner-visum-nohal-5-2-0008-israel",
            "ru": "anketa-ash6-stupro-viza-suprugov-nohal-5-2-0008-izrail"
        },
        "titles": {
            "en": "Form Ash/6 (טופס אש/6) — 6-Page Spousal Visa Dossier (Nohal 5.2.0008) English-to-Hebrew Auto-Filler",
            "he": "טופס אש/6 להורדה ומילוי אוטומטי — אוגדן 6 עמודים להליך מדורג לבני זוג (נוהל 5.2.0008)",
            "fr": "Formulaire Ash/6 (טופס אש/6) — Remplir en Français → Dossier 6 Pages en Hébreu (Visa Conjoint 5.2.0008)",
            "es": "Formulario Ash/6 (טופס אש/6) — Rellenar en Español → Dossier 6 Páginas en Hebreo (Visa Conyugal 5.2.0008)",
            "de": "Formular Ash/6 (טופס אש/6) — Auf Deutsch ausfüllen → 6-Seiten Dossier auf Hebräisch (Partner-Visum)",
            "ru": "Анкета Аш/6 (טופס אש/6) — Заполнить на русском → 6-стр. досье СТУПРО на иврите (Ноаль 5.2.0008)"
        },
        "traps": {
            "en": "Under July 2026 Nohal 5.2.0008 (Ed. 16), clerks cross-examine every date on Pages 1–6 against your 300-Question Separated-Room Interview. Includes the Page 5 Landlord/Lease Affidavit, Sec. ד.2.ה Marriage Certificate prior-single exemption, and Sec. ג.10 Dual-Track protection.",
            "he": "לפי נוהל 5.2.0008 (מהדורה 16, יולי 2026), פקידי משרד הפנים מצליבים כל תאריך בעמודים 1–6 מול ראיון 80 השאלות בחדרים נפרדים. כולל תצהיר שכר דירה בעמוד 5, פטור סעיף ד.2.ה מתעודת רווקות נפרדת, והגנת סעיף ג.10 להליך כפול.",
            "fr": "Selon la procédure Nohal 5.2.0008 (Éd. 16, juillet 2026), les agents vérifient chaque date des pages 1 à 6 lors de l'interrogatoire des 80 questions en salles séparées. Inclut l'attestation de bail (page 5) et la protection double parcours (art. ג.10).",
            "es": "Según el procedimiento Nohal 5.2.0008 (Ed. 16, julio 2026), los funcionarios cruzan cada fecha de las páginas 1–6 con el interrogatorio de 80 preguntas en salas separadas. Incluye la declaración de alquiler (pág. 5) y la protección de doble vía (art. ג.10).",
            "de": "Gemäß Verfahren Nohal 5.2.0008 (Ed. 16, Juli 2026) gleichen Beamte jedes Datum auf den Seiten 1–6 mit Ihrem 300-Fragen-Interview in getrennten Räumen ab. Enthält die Mietvertrag-Erklärung (Seite 5) und den Doppel-Track-Schutz (Abs. ג.10).",
            "ru": "По инструкции Ноаль 5.2.0008 (Ред. 16 от июля 2026 г.) чиновники МВД сверяют каждую дату на страницах 1–6 с вашими ответами на перекрёстном допросе из 300 вопросов. Включает декларацию аренды (стр. 5) и защиту двойного трека (п. ג.10)."
        }
    },
    {
        "key": "ash456", "short_slug": "ash456", "code": "Ash/456 (אש/456)", "raw_pdf": "/app/forms/Ash456.pdf",
        "l_slugs": {
            "en": "form-ash456-in-israel-aliyah-shinui-maamad",
            "he": "tofes-ash456-shinui-maamad-leoleh-nohal-5-2-0001",
            "fr": "formulaire-ash456-aliyah-en-israel-shinui-maamad",
            "es": "formulario-ash456-aliya-en-israel-shinui-maamad",
            "de": "formular-ash456-inlands-alija-shinui-maamad",
            "ru": "anketa-ash456-repatriaciya-vnutri-izrailya-shinuj-maamad"
        },
        "titles": {
            "en": "Form Ash/456 (טופס אש/456) — In-Israel Aliyah / Shinui Ma'amad (Nohal 5.2.0001) Auto-Filler",
            "he": "טופס אש/456 להורדה ומילוי אוטומטי — בקשה לשינוי מעמד לעולה מתוך ישראל (נוהל 5.2.0001)",
            "fr": "Formulaire Ash/456 (טופס אש/456) — Remplir en Français → PDF Hébreu Aliyah en Israël (Shinui Ma'amad)",
            "es": "Formulario Ash/456 (טופס אש/456) — Rellenar en Español → PDF Hebreo Aliyá en Israel (Shinui Ma'amad)",
            "de": "Formular Ash/456 (טופס אש/456) — Auf Deutsch ausfüllen → Hebräisches PDF Inlands-Alija (Shinui Ma'amad)",
            "ru": "Анкета Аш/456 (טופס אש/456) — Заполнить на русском → PDF на иврите (Репатриация в Израиле / Шинуй Маамад)"
        },
        "traps": {
            "en": "Fee-exempt under Nohal 5.2.0001 Sec. ג.7! Warning: spending more than 24 cumulative months in Israel in the 3 years prior to receiving your Teudat Oleh cancels the ~21,700 NIS Sal Klita absorption grant.",
            "he": "פטור מאגרה לפי נוהל 5.2.0001 סעיף ג.7! אזהרה קריטית: שהייה של מעל 24 חודשים מצטברים בישראל ב-3 השנים שקדמו לקבלת תעודת העולה שוללת לחלוטין את מענק סל הקליטה (~21,700 ₪).",
            "fr": "Exonéré de frais selon le Nohal 5.2.0001 art. ג.7 ! Attention : passer plus de 24 mois cumulés en Israël au cours des 3 années précédant l'obtention de la Teudat Oleh annule la prime Sal Klita (~21 700 ₪).",
            "es": "¡Exento de tasas según el Nohal 5.2.0001 art. ג.7! Advertencia: pasar más de 24 meses acumulados en Israel en los 3 años previos a recibir la Teudat Oleh cancela la beca Sal Klita (~21.700 ₪).",
            "de": "Gebührenfrei gemäß Nohal 5.2.0001 Abs. ג.7! Achtung: Wer in den 3 Jahren vor Erhalt der Teudat Oleh mehr als 24 kumulierte Monate in Israel verbracht hat, verliert den Sal Klita (~21.700 ₪).",
            "ru": "Освобождено от госпошлины по Ноаль 5.2.0001 п. ג.7! Внимание: пребывание в Израиле более 24 суммарных месяцев за последние 3 года до получения Теудат-Оле лишает вас корзины абсорбции Саль Клита (~21 700 ₪)."
        }
    },
    {
        "key": "mr14a", "short_slug": "mr14a", "code": "MR/14a (מר/14א)", "raw_pdf": "/app/forms/MR14a.pdf",
        "l_slugs": {
            "en": "form-mr14a-first-biometric-teudat-zehut-application",
            "he": "tofes-mr14a-bakasha-leteudat-zehut-rishona",
            "fr": "formulaire-mr14a-premiere-teudat-zehut-biometrique",
            "es": "formulario-mr14a-primera-teudat-zehut-biometrica",
            "de": "formular-mr14a-erste-biometrische-teudat-zehut",
            "ru": "anketa-mr14a-pervyj-biometricheskij-teudat-zeut"
        },
        "titles": {
            "en": "Form MR/14a (טופס מר/14א) — First Biometric Teudat Zehut Application English-to-Hebrew Auto-Filler",
            "he": "טופס מר/14א להורדה ומילוי אוטומטי — בקשה לתעודת זהות ראשונה (עולים ותושבים א/5)",
            "fr": "Formulaire MR/14a (טופס מר/14א) — Remplir en Français → PDF Hébreu Première Teudat Zehut",
            "es": "Formulario MR/14a (טופס מר/14א) — Rellenar en Español → PDF Hebreo Primera Teudat Zehut",
            "de": "Formular MR/14a (טופס מר/14א) — Auf Deutsch ausfüllen → Hebräisches PDF Erste Teudat Zehut",
            "ru": "Анкета МР/14а (טופס מר/14א) — Заполнить на русском → PDF на иврите (Первый Теудат-Зеут)"
        },
        "traps": {
            "en": "Critical Clerk Rule: Never pre-fill the Newly Assigned Israeli ID Number box before the clerk generates your 9-digit Mispar Zehut in the Aviv system, and never sign the bottom declaration box before standing in front of the clerk!",
            "he": "כלל ברזל מול הפקיד: לעולם אל תמלאו מראש את משבצת מספר הזהות הישראלי החדש לפני שהפקיד מפיק אותו במערכת ׳אביב׳, ואל תחתמו בתחתית הטופס לפני המעמד מול הפקיד!",
            "fr": "Règle d'or au guichet : ne remplissez jamais la case du nouveau numéro d'identité israélien avant que l'agent ne le génère dans le système Aviv, et ne signez qu'en présence de l'agent !",
            "es": "Regla de oro ante el funcionario: nunca rellenes la casilla del nuevo número de identidad israelí antes de que el funcionario lo genere en el sistema Aviv, ¡y firma solo frente al funcionario!",
            "de": "Goldene Schalter-Regel: Tragen Sie niemals vorab die neue israelische ID-Nummer ein, bevor der Beamte sie im Aviv-System generiert hat, und unterschreiben Sie erst direkt vor dem Beamten!",
            "ru": "Золотое правило в МВД: никогда заранее не вписывайте новый номер Теудат-Зеут до того, как чиновник сгенерирует его в системе «Авив», и подписывайте бланк только в присутствии чиновника!"
        }
    },
    {
        "key": "mr14b", "short_slug": "mr14b", "code": "MR/14b (מר/14ב)", "raw_pdf": "/app/forms/MR14b.pdf",
        "l_slugs": {
            "en": "form-mr14b-first-israeli-passport-darkon-teudat-maavar",
            "he": "tofes-mr14b-darkon-rishon-teudat-maavar",
            "fr": "formulaire-mr14b-premier-passeport-israelien-darkon",
            "es": "formulario-mr14b-primer-pasaporte-israeli-darkon",
            "de": "formular-mr14b-erster-israelischer-reisepass-darkon",
            "ru": "anketa-mr14b-pervyj-zagranpasport-izrailya-darkon"
        },
        "titles": {
            "en": "Form MR/14b (טופס מר/14ב) — First Israeli Passport (Darkon / Teudat Ma'avar) Auto-Filler",
            "he": "טופס מר/14ב להורדה ומילוי אוטומטי — בקשה לדרכון ישראלי ראשון או תעודת מעבר",
            "fr": "Formulaire MR/14b (טופס מר/14ב) — Remplir en Français → PDF Hébreu Passeport Israélien (Darkon)",
            "es": "Formulario MR/14b (טופס מר/14ב) — Rellenar en Español → PDF Hebreo Pasaporte Israelí (Darkon)",
            "de": "Formular MR/14b (טופס מר/14ב) — Auf Deutsch ausfüllen → Hebräisches PDF Israelischer Pass (Darkon)",
            "ru": "Анкета МР/14б (טופס מר/14ב) — Заполнить на русском → PDF на иврите (Даркон / Теудат-Маавар)"
        },
        "traps": {
            "en": "Requires both Hebrew and exact Latin passport letter-box spelling, plus both parents' consent signatures if the applicant is a minor under 18.",
            "he": "מחייב מילוי מדויק של השם בעברית ובאותיות לטיניות (משבצת אחר משבצת כפי שמופיע בדרכון הזר), וכן חתימת הסכמה של שני ההורים עבור קטינים מתחת לגיל 18.",
            "fr": "Exige l'orthographe exacte en hébreu et en lettres majuscules latines (case par case comme sur votre passeport étranger), ainsi que la signature des deux parents pour les mineurs.",
            "es": "Requiere la ortografía exacta en hebreo y en mayúsculas latinas (casilla por casilla según tu pasaporte extranjero), además de la firma de ambos padres para menores de 18 años.",
            "de": "Erfordert die exakte Schreibweise auf Hebräisch und in lateinischen Großbuchstaben (Kästchen für Kästchen wie im Reisepass) sowie die Unterschrift beider Elternteile bei Minderjährigen.",
            "ru": "Требует точного написания имени на иврите и заглавными латинскими буквами (по клеточкам, строго как в загранпаспорте), а также согласия обоих родителей для несовершеннолетних."
        }
    },
    {
        "key": "nespach_alef", "short_slug": "nespach-alef", "code": "Nespach Alef (נספח א׳)", "raw_pdf": "/app/forms/NespachAlef.pdf",
        "l_slugs": {
            "en": "nespach-alef-13-clause-common-law-affidavit-nohal-5-2-0009",
            "he": "nespach-alef-tatzhir-yeduim-betzibur-nohal-5-2-0009",
            "fr": "nespach-alef-declaration-13-clauses-concubinage-5-2-0009",
            "es": "nespaj-alef-declaracion-jurada-parejas-hecho-5-2-0009",
            "de": "nespach-alef-13-klausel-erklaerung-lebenspartner-5-2-0009",
            "ru": "nespah-alef-deklaraciya-13-punktov-yaduim-be-cibur-5-2-0009"
        },
        "titles": {
            "en": "Nespach Alef (נספח א׳) — 13-Clause Common-Law Couples Affidavit (Nohal 5.2.0009) Auto-Filler",
            "he": "נספח א׳ (נוהל 5.2.0009) להורדה ומילוי — תצהיר 13 הסעיפים לבני זוג ידועים בציבור",
            "fr": "Nespach Alef (נספח א׳) — Remplir en Français → Déclaration en 13 Clauses en Hébreu (Concubinage 5.2.0009)",
            "es": "Nespaj Alef (נספח א׳) — Rellenar en Español → Declaración de 13 Cláusulas en Hebreo (Parejas 5.2.0009)",
            "de": "Nespach Alef (נספח א׳) — Auf Deutsch ausfüllen → 13-Klausel-Erklärung auf Hebräisch (Nohal 5.2.0009)",
            "ru": "Неспах Алеф (נספח א׳) — Заполнить на русском → Декларация 13 пунктов на иврите (Ядуим бе-Цибур 5.2.0009)"
        },
        "traps": {
            "en": "Under July 2026 Nohal 5.2.0009 (Ed. 17), unmarried partners (Yeduim BeTzibur) must sign all 13 statutory clauses before an Israeli lawyer verifying shared household and financial sincerity.",
            "he": "לפי נוהל 5.2.0009 (מהדורה 17, יולי 2026), בני זוג ידועים בציבור חייבים לחתום על תצהיר 13 הסעיפים בפני עורך דין ישראלי לאימות כנות הקשר וניהול משק בית משותף.",
            "fr": "Selon le Nohal 5.2.0009 (Éd. 17, juillet 2026), les partenaires non mariés (Yeduim BeTzibur) doivent signer les 13 clauses statutaires devant un avocat israélien attestant la sincérité de leur vie commune.",
            "es": "Según el Nohal 5.2.0009 (Ed. 17, julio 2026), las parejas de hecho (Yeduim BeTzibur) deben firmar las 13 cláusulas legales ante un abogado israelí certificando la convivencia y sinceridad de la relación.",
            "de": "Gemäß Nohal 5.2.0009 (Ed. 17, Juli 2026) müssen unverheiratete Lebenspartner (Yeduim BeTzibur) alle 13 Klauseln vor einem israelischen Anwalt unterzeichnen.",
            "ru": "Согласно Ноаль 5.2.0009 (Ред. 17 от июля 2026 г.), гражданские партнёры (Ядуим бе-Цибур) обязаны подписать все 13 пунктов аффидевита в присутствии израильского адвоката."
        }
    },
    {
        "key": "security_cv", "short_slug": "security-cv", "code": "Nativ Security CV (שאלון נתיב)", "raw_pdf": "/app/forms/SecurityCV.pdf",
        "l_slugs": {
            "en": "nativ-11-page-security-family-cv-questionnaire-israel",
            "he": "sheelon-nativ-11-amudim-korot-chaim-aliyah",
            "fr": "questionnaire-nativ-11-pages-cv-famille-aliyah-israel",
            "es": "cuestionario-nativ-11-paginas-historial-familiar-aliya",
            "de": "nativ-fragebogen-11-seiten-lebenslauf-alija-israel",
            "ru": "anketa-nativ-11-stranic-biografiya-semya-repatriaciya"
        },
        "titles": {
            "en": "Nativ 11-Page Security & Family CV (שאלון נתיב) — English-to-Hebrew Auto-Filler",
            "he": "שאלון נתיב (11 עמודים) להורדה ומילוי אוטומטי — קורות חיים ופרטי משפחה לשינוי מעמד ועלייה",
            "fr": "Questionnaire Nativ (11 Pages) — Remplir en Français → PDF Officiel en Hébreu pour Aliyah",
            "es": "Cuestionario Nativ (11 Páginas) — Rellenar en Español → PDF Oficial en Hebreo para Aliyá",
            "de": "Nativ-Fragebogen (11 Seiten) — Auf Deutsch ausfüllen → Offizielles Hebräisches PDF für Alija",
            "ru": "Анкета Натив (11 страниц) — Заполнить на русском → Готовый PDF на иврите для репатриации"
        },
        "traps": {
            "en": "Leaving chronological employment/address gaps or omitting family members on Nativ's 11-page Hebrew questionnaire triggers months of Nativ security clearance delays.",
            "he": "השארת פערי זמנים בקורות החיים או השמטת פרטי בני משפחה בשאלון 11 העמודים של ׳נתיב׳ גורמת לעיכובים של חודשים ארוכים בבדיקות הביטחון והזכאות.",
            "fr": "Laisser des périodes vides dans votre historique d'emploi/adresses ou omettre des membres de la famille sur le questionnaire Nativ de 11 pages entraîne des mois de retard.",
            "es": "Dejar vacíos cronológicos en tu historial laboral/de domicilios u omitir familiares en el cuestionario de 11 páginas de Nativ provoca meses de retraso.",
            "de": "Zeitliche Lücken im Berufs-/Adressverlauf oder fehlende Familienangehörige im 11-seitigen Nativ-Fragebogen führen zu monatelangen Verzögerungen bei der Sicherheitsprüfung.",
            "ru": "Пропуски в хронологии работы и адресов или неуказанные родственники в 11-страничной анкете «Натив» приводят к многомесячным задержкам проверки."
        }
    }
]

FORM_UI_I18N = {
    "en": ("📥 Download Raw Blank Hebrew PDF (Free)", "⚡ Fill Out in English → Print Official Royal-Blue Hebrew PDF + Cover Letter", "🚨 Statutory Clerk Trap & 2026 PIBA Rule:", "📄 All 8 Official Misrad HaPanim & Nativ Hebrew Forms:"),
    "he": ("📥 הורדת הטופס הריק המקורי (PDF בחינם)", "⚡ מילוי חכם בעברית והדפסת PDF רשמי בדיו כחול תקני + מכתב הסבר", "🚨 מלכודת הפקידים ונהלי רשות האוכלוסין 2026:", "📄 כל 8 טפסי משרד הפנים ונתיב להורדה ומילוי אוטומטי:"),
    "fr": ("📥 Télécharger le PDF Hébreu Vierge (Gratuit)", "⚡ Remplir en Français → Imprimer le PDF Officiel en Hébreu (Encre Bleue)", "🚨 Piège Guichetier & Règle Statutaire PIBA 2026 :", "📄 Les 8 Formulaires Officiels Misrad HaPanim & Nativ :"),
    "es": ("📥 Descargar PDF en Hebreo en Blanco (Gratis)", "⚡ Rellenar en Español → Imprimir PDF Oficial en Hebreo (Tinta Azul)", "🚨 Trampa de Funcionarios y Regla PIBA 2026:", "📄 Los 8 Formularios Oficiales de Misrad HaPanim y Nativ:"),
    "de": ("📥 Leeres Original-PDF auf Hebräisch herunterladen (Gratis)", "⚡ Auf Deutsch ausfüllen → Offizielles Hebräisches PDF drucken (Blaue Tinte)", "🚨 Behördenfalle & PIBA-Vorschrift 2026:", "📄 Alle 8 offiziellen Misrad HaPanim & Nativ Formulare:"),
    "ru": ("📥 Скачать пустой бланк PDF на иврите (Бесплатно)", "⚡ Заполнить на русском языке → Скачать готовый PDF на иврите (Синие чернила)", "🚨 Ловушка чиновников МВД и правила PIBA 2026:", "📄 Все 8 официальных анкет МВД Израиля (PIBA) и Натив:")
}

def get_form_url(lang, f_cfg):
    loc_slug = f_cfg["l_slugs"].get(lang, f_cfg["short_slug"])
    return f"https://giyuraliyahtrack.com/forms/{loc_slug}/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/forms/{loc_slug}/"

FORM_DEEP_SECTIONS_I18N = {
    "en": (
        "📋 Complete Section-by-Section Hebrew Filing Protocol & Mandatory Attachments",
        "<ul><li><strong>1. Why Misrad HaPanim Rejects Hand-Written English Forms at the Window:</strong> Under official Population and Immigration Authority (PIBA) directives, all statutory forms (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, and the 11-Page Nativ Security CV) must be completed in clear, standard right-to-left Hebrew. Submitting Latin characters inside Hebrew boxes—or leaving chronological date gaps—gives clerks immediate grounds to refuse to open your file.</li><li><strong>2. The 5 Mandatory Double-Apostilled Civil Documents (<180-Day Expiration Clock):</strong> Every initial status, conversion, or spousal dossier must be accompanied by original Apostilled documents from your country of birth, every country of citizenship, and every country resided in for more than 12 months since age 14: (a) Long-Form Vault Birth Certificate listing both parents, (b) Federal/National Fingerprint Police Certificate (FBI / ACRO / RCMP / Bulletin n°3 / Führungszeugnis / Справка МВД) issued within the last 180 days, (c) Single-Status / Marital Registry Extract (or Marriage Certificate showing prior status as 'Single' under the Nohal 5.2.0008 Sec. ד.2.ה exemption), (d) All prior Divorce/Widowhood decrees, and (e) Legal Name Change certificates.</li><li><strong>3. Statutory Dual-Armor Protections (Sec. ה.2.8, Sec. ג.10 & Nohal 1.6.0001):</strong> Never let a clerk verbally intimidate you into closing a file or accepting a 30-day termination threat. Under the July 2026 editions of Nohal 5.2.0008 (Ed. 16) and Nohal 5.2.0009 (Ed. 17), you are entitled to request a <strong>45 + 45 day extension</strong> via the Visa Team Leader for missing overseas documents (Sec. ה.2.8), file a <strong>21-day written internal appeal</strong> against any summary refusal (Nohal 1.6.0001), and run your Spousal Residency and State/Rabbanut Conversion files simultaneously (Sec. ג.10).</li><li><strong>4. Protecting Expectant Couples & Newborns (Nohal 5.2.0004 Teudat Zehut Sefach Rule):</strong> If you are expecting a child in Israel, filing your complete Hebrew dossier and documenting 300+ days of shared cohabitation prior to the birth is critical so your newborn baby is registered directly onto the Israeli parent's Teudat Zehut Sefach without a 2-year freeze or a 15,000₪ Family Court DNA lawsuit.</li></ul>"
    ),
    "he": (
        "📋 פרוטוקול מילוי סעיף-אחר-סעיף בעברית ורשימת מסמכי החובה לצירוף",
        "<ul><li><strong>1. מדוע פקידי משרד הפנים פוסלים טפסים שמולאו באנגלית או בכתב יד לא קריא:</strong> לפי נהלי רשות האוכלוסין וההגירה (PIBA), כל הטפסים הרשמיים (אש/1, אש/3, אש/6, אש/456, מר/14א, מר/14ב, נספח א׳ ושאלון נתיב בן 11 העמודים) חייבים להיות ממולאים בעברית תקנית ומדויקת. השארת פערי תאריכים או כתיבה באותיות לטיניות בשדות עבריים משמשת עילה לדחיית הבקשה על הסף.</li><li><strong>2. חמשת מסמכי המקור המאומתים באפוסטיל (שעון תוקף של 180 יום):</strong> לכל תיק שינוי מעמד, וועדת חריגים או הליך מדורג חובה לצרף מסמכי מקור עם אפוסטיל ממדינת הלידה, כל מדינת אזרחות וכל מדינה בה התגוררתם מעל שנה מגיל 14: (א) תעודת לידה מורחבת הכוללת את שמות שני ההורים, (ב) תעודת יושר פדרלית מבוססת טביעות אצבע (FBI / ACRO / RCMP) שהונפקה ב-180 הימים האחרונים, (ג) תמצית רווקות / מצב אישי (או פטור סעיף ד.2.ה לנשואים כשמצב קודם ׳רווק/ה׳ מופיע בתעודת הנישואין), (ד) תעודות גירושין/נישואין קודמים, ו-(ה) תעודות שינוי שם.</li><li><strong>3. זכויות שריון כפול מול הפקיד (סעיף ה.2.8, סעיף ג.10 ונוהל 1.6.0001):</strong> לפי מהדורות יולי 2026 של נוהל 5.2.0008 (מהדורה 16) ונוהל 5.2.0009 (מהדורה 17), זכותכם לדרוש <strong>הארכה של 45 + 45 ימים</strong> להמצאת מסמכים מחו״ל באישור ראש צוות אשרות (סעיף ה.2.8), להגיש <strong>ערר פנימי בכתב תוך 21 יום</strong> (נוהל 1.6.0001), ולנהל הליך מדורג והליך גיור ממלכתי במקביל ללא סגירת תיק (סעיף ג.10).</li><li><strong>4. הגנה על זוגות בהריון ורישום יילודים בספח תעודת הזהות (נוהל 5.2.0004):</strong> הגשת אוגדן מלא בעברית ותיעוד 300 ימי חיים משותפים לפני הלידה מונעים הקפאה של שנתיים ברישום התינוק בספח תעודת הזהות וחוסכים תביעת אבהות ובדיקת רקמות ב-15,000 ₪ בבית המשפט למשפחה.</li></ul>"
    ),
    "fr": (
        "📋 Protocole Complet de Remplissage en Hébreu & Pièces Justificatives Obligatoires",
        "<ul><li><strong>1. Pourquoi le Misrad HaPanim rejette les formulaires remplis en français ou en anglais :</strong> Selon les directives officielles de l'Autorité de la Population et de l'Immigration (PIBA), tous les formulaires statutaires (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef et le Questionnaire Nativ de 11 pages) doivent être rédigés en hébreu standard. Toute période non justifiée ou écriture latine dans les champs hébraïques entraîne le refus d'ouverture du dossier.</li><li><strong>2. Les 5 Documents Originaux Doublement Apostillés (Horloge stricte de 180 jours) :</strong> Vous devez joindre les originaux apostillés de votre pays de naissance, de chaque nationalité et de tout pays où vous avez résidé plus d'un an depuis l'âge de 14 ans : (a) Copie intégrale de l'acte de naissance mentionnant les deux parents, (b) Extrait de casier judiciaire (Bulletin n°3 / FBI / ACRO / RCMP) de moins de 180 jours, (c) Certificat de célibat ou de coutume (ou dispense art. ד.2.ה si l'état antérieur 'Célibataire' figure sur l'acte de mariage apostillé), (d) Jugements de divorce antérieurs, et (e) Certificats de changement de nom.</li><li><strong>3.Vos Droits Légaux Face au Guichetier (Art. ה.2.8, Art. ג.10 & Nohal 1.6.0001) :</strong> Les éditions juillet 2026 des procédures Nohal 5.2.0008 et 5.2.0009 vous garantissent le droit à une <strong>prorogation de 45 + 45 jours</strong> via le Chef d'Équipe Visas (art. ה.2.8), un <strong>recours écrit sous 21 jours</strong> (Nohal 1.6.0001), et le droit de mener simultanément votre dossier Conjoint et votre conversion au Rabbinat (art. ג.10).</li><li><strong>4. Protection des Futurs Parents & Inscription du Nouveau-Né sur la Teudat Zehut (Nohal 5.2.0004) :</strong> Documenter 300 jours de vie commune avant l'accouchement permet d'inscrire votre bébé directement sur le Sefach de la Teudat Zehut sans blocage de 2 ans ni test ADN judiciaire à 15 000 ₪.</li></ul>"
    ),
    "es": (
        "📋 Protocolo Completo de Rellenado en Hebreo y Documentos Obligatorios Adjuntos",
        "<ul><li><strong>1. Por qué Misrad HaPanim rechaza formularios rellenados en español o inglés:</strong> Según las directivas oficiales de la Autoridad de Población e Inmigración (PIBA), todos los formularios oficiales (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespaj Alef y el Cuestionario Nativ de 11 páginas) deben presentarse en hebreo normativo. Escribir en caracteres latinos en casillas hebreas o dejar vacíos de fechas provoca el rechazo inmediato en ventanilla.</li><li><strong>2. Los 5 Documentos Originales con Doble Apostilla (Reloj estricto de 180 días):</strong> Debes adjuntar originales apostillados de tu país de nacimiento, cada ciudadanía y cada país donde hayas vivido más de 1 año desde los 14 años: (a) Partida literal de nacimiento con los nombres de ambos padres, (b) Certificado federal de antecedentes penales (<180 días), (c) Fe de soltería o estado civil (o exención art. ד.2.ה si figura 'Soltero/a' en el acta de matrimonio apostillada), (d) Sentencias de divorcio previas y (e) Certificados de cambio de nombre.</li><li><strong>3. Tus Derechos Legales de Doble Blindaje (Art. ה.2.8, Art. ג.10 y Nohal 1.6.0001):</strong> Las ediciones de julio de 2026 del Nohal 5.2.0008 y 5.2.0009 te otorgan derecho a una <strong>prórroga de 45 + 45 días</strong> mediante el Jefe de Visas (art. ה.2.8), <strong>21 días para apelación escrita</strong> (Nohal 1.6.0001) y el derecho a tramitar simultáneamente tu Visa Conyugal y tu conversión en el Rabinato (art. ג.10).</li><li><strong>4. Protección de Recién Nacidos en el Sefaj de la Teudat Zehut (Nohal 5.2.0004):</strong> Documentar 300 días de convivencia antes del parto garantiza la inscripción directa de tu bebé en la Teudat Zehut sin un bloqueo de 2 años ni un juicio de ADN de 15.000 ₪.</li></ul>"
    ),
    "de": (
        "📋 Komplettes Ausfüllprotokoll auf Hebräisch & Pflichtanlagen zum Dossier",
        "<ul><li><strong>1. Warum Misrad HaPanim auf Deutsch oder Englisch ausgefüllte Formulare ablehnt:</strong> Gemäß den offiziellen Richtlinien der Bevölkerungs- und Einwanderungsbehörde (PIBA) müssen sämtliche Antragsformulare (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef sowie der 11-seitige Nativ-Fragebogen) in korrektem Hebräisch eingereicht werden. Lateinische Eintragungen in hebräischen Feldern oder zeitliche Lücken führen zur sofortigen Zurückweisung am Schalter.</li><li><strong>2. Die 5 doppelt apostillierten Heimatdokumente (Strikte 180-Tage-Frist):</strong> Jeder Akte müssen apostillierte Originale aus dem Geburtsland, jedem Land der Staatsbürgerschaft und jedem Land, in dem Sie seit dem 14. Lebensjahr länger als 12 Monate gelebt haben, beigefügt werden: (a) Vollständiger Geburtenregisterauszug mit beiden Eltern, (b) Führungszeugnis (<180 Tage), (c) Ledigkeitsbescheinigung / Erweiterte Meldebescheinigung (oder Befreiung nach Abs. ד.2.ה bei Vermerk 'ledig' auf der apostillierten Heiratsurkunde), (d) Scheidungsurteile und (e) Namensänderungsurkunden.</li><li><strong>3. Gesetzlicher Doppel-Schutzschild (Abs. ה.2.8, Abs. ג.10 & Nohal 1.6.0001):</strong> Nach den Ausgaben Juli 2026 von Nohal 5.2.0008 und 5.2.0009 haben Sie Anspruch auf <strong>45 + 45 Tage Fristverlängerung</strong> über den Visa-Teamleiter (Abs. ה.2.8), <strong>21 Tage für eine schriftliche Beschwerde</strong> (Nohal 1.6.0001) sowie die gleichzeitige Führung von Partner-Visum und Rabbinats-Giur (Abs. ג.10).</li><li><strong>4. Schutz für Neugeborene im Sefach der Teudat Zehut (Nohal 5.2.0004):</strong> Der Nachweis von 300 Tagen gemeinsamem Lebensmittelpunkt vor der Geburt sichert die sofortige Eintragung Ihres Babys in die Teudat Zehut ohne 2-jährige Sperre oder 15.000 ₪ teuren Familiengerichts-DNA-Test.</li></ul>"
    ),
    "ru": (
        "📋 Полный протокол заполнения анкеты на иврите и обязательный список документов",
        "<ul><li><strong>1. Почему МВД Израиля (PIBA) отказывает при подаче анкет на русском или английском языке:</strong> По официальным регламентам Управления народонаселения и иммиграции (МВД Израиля), все государственные бланки (Аш/1, Аш/3, Аш/6, Аш/456, МР/14а, МР/14б, Неспах Алеф и 11-страничная анкета «Натив») должны быть заполнены строго на нормативном иврите справа налево. Заполнение ивритских полей латиницей или пропуски дат в биографии дают чиновнику право отказать в открытии дела прямо в окне приёма.</li><li><strong>2. Пять обязательных документов с двойным апостилем (Жёсткие часы 180 дней):</strong> К каждому досье прикладываются оригиналы с апостилем из страны рождения, всех стран гражданства и каждой страны, где вы проживали более 1 года с 14 лет: (а) Полное свидетельство о рождении (или повторное/архивная справка ЗАГС с указанием обоих родителей), (б) Справка об отсутствии судимости МВД / ФБР со сроком выдачи не более 180 дней, (в) Справка о семейном положении / незамужестве (Форма №15 или льгота п. ד.2.ה, если добрачный статус «холост/не замужем» указан в свидетельстве о браке с апостилем), (г) Свидетельства и решения суда о всех предыдущих разводах, и (д) Справки о перемене имени/фамилии (Форма №16).</li><li><strong>3. Ваши законные права двойной защиты (п. ה.2.8, п. ג.10 и Ноаль 1.6.0001):</strong> Редакции инструкций Ноаль 5.2.0008 (Ред. 16) и Ноаль 5.2.0009 (Ред. 17) от июля 2026 года гарантируют вам право запросить <strong>продление на 45 + 45 дней</strong> через руководителя визового отдела для донесения зарубежных справок (п. ה.2.8), подать <strong>письменную апелляцию в течение 21 дня</strong> (Ноаль 1.6.0001) и вести дело СТУПРО параллельно с государственным гиюром (п. ג.10).</li><li><strong>4. Защита новорождённых детей и запись в Сефах Теудат-Зеута (Ноаль 5.2.0004):</strong> Документальное подтверждение 300 дней совместного проживания в Израиле до рождения ребёнка позволяет сразу вписать малыша в Теудат-Зеут родителя-израильтянина без 2-летней заморозки и без судебного ДНК-теста на отцовство (Бдикот Рикмот) за 15 000+ ₪.</li></ul>"
    )
}

def render_form_landing_page(lang, f_cfg):
    d = dicts[lang]
    f_key = f_cfg["key"]
    canon_url = get_form_url(lang, f_cfg)
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    title_str = f_cfg["titles"].get(lang, f_cfg["titles"]["en"])
    trap_str = f_cfg["traps"].get(lang, f_cfg["traps"]["en"])
    dl_lbl, cta_lbl, trap_hdr, mesh_hdr = FORM_UI_I18N[lang]
    deep_hdr, deep_body = FORM_DEEP_SECTIONS_I18N[lang]
    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    j = d.get("_jurisdiction", {})
    j_line = f"<p><strong>{j.get('flag','')} {d.get('j_active','Jurisdiction:')} {j.get('name','')}:</strong> {j.get('police','')} | {j.get('birth','')} | {j.get('single','')} | {j.get('apostille','')}</p>" if j else ""
    sp_deep = d.get("_terms", {}).get("spousal_deep_dive", {})

    out = base_html
    out = re.sub(r'<html lang="[^"]*"(?: dir="[^"]*")?>', f'<html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}">', out, count=1)
    out = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', out, count=1)
    out = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{canon_url}" />', out, count=1)
    out = out.replace('id="app-nav-back" class="app-nav-back"', f'id="app-nav-back" href="{b_hub}" class="app-nav-back visible"')

    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)

    blocks = d.get("_blocks", {})
    for tid in ["track-0", "track-1", "track-2", "track-3"]:
        b_html = blocks.get(f"#{tid}")
        if b_html and not str(b_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<article class="track-card[^"]*" id="{tid}">)[\s\S]*?(</article>)', lambda m: m.group(1) + "\n" + b_html + "\n        " + m.group(2), out, count=1)
    for mg_id in ["mg-0", "mg-1", "mg-2", "mg-3"]:
        mg_html = blocks.get(f"#{mg_id}")
        if mg_html and not str(mg_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<div class="milestone-group" id="{mg_id}">)[\s\S]*?(</div>\s*(?=<div class="milestone-group"|<a href="/app"))', lambda m: m.group(1) + "\n" + mg_html + "\n        </div>\n        ", out, count=1)
    if blocks.get("#left-drawer-panel") and not str(blocks["#left-drawer-panel"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<aside class="drawer-panel" id="left-drawer-panel">)[\s\S]*?(</aside>)', lambda m: m.group(1) + "\n" + blocks["#left-drawer-panel"] + "\n  " + m.group(2), out, count=1)

    if blocks.get("#view-3 .vetted-card") and not str(blocks["#view-3 .vetted-card"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="vetted-card"[^>]*>)[\s\S]*?(</div>\s*</section>)', lambda m: m.group(1) + blocks["#view-3 .vetted-card"] + "</div>\n      </section>", out, count=1)
    if blocks.get("#view-4 .shield-banner") and not str(blocks["#view-4 .shield-banner"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="shield-banner">)[\s\S]*?(</div>\s*<!-- 4 INTERACTIVE)', lambda m: m.group(1) + blocks["#view-4 .shield-banner"] + "</div>\n\n        <!-- 4 INTERACTIVE", out, count=1)
    if blocks.get("#view-4 .two-way-bar") and not str(blocks["#view-4 .two-way-bar"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="two-way-bar">)[\s\S]*?(</div>\s*<!-- MAJOR COMPONENT 1)', lambda m: m.group(1) + blocks["#view-4 .two-way-bar"] + "</div>\n\n        <!-- MAJOR COMPONENT 1", out, count=1)

    links_html = "".join([
        f'<a class="seo-mesh-link" href="{"/forms/" + fc["l_slugs"][lang] + "/" if lang == "en" else "/" + lang + "/forms/" + fc["l_slugs"][lang] + "/"}">📄 {fc["code"]} — {fc["titles"][lang]}</a>'
        for fc in FORM_CATALOG
    ])

    art_html = (
        f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
        f'<div style="display:inline-block;background:#e0f2fe;color:#0284c7;font-size:0.76rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">OFFICIAL PIBA / MISRAD HAPANIM FORM • {f_cfg["code"]}</div>'
        f'<h1>{title_str}</h1>'
        f'<h4>{trap_hdr}</h4>'
        f'<p>{trap_str}</p>'
        f'<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;">'
        f'<a class="btn-sky" style="background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);border:2px solid #4FC3F7;font-size:0.98rem;" href="/app/?mod=hebrew-engine&form={f_key}&lang={lang}">{cta_lbl} →</a>'
        f'<a class="btn-outline-card" style="padding:12px 16px;font-size:0.88rem;font-weight:800;margin-top:0;" href="{f_cfg["raw_pdf"]}" target="_blank" rel="noopener">{dl_lbl}</a>'
        f'</div>'
        f'<h2>{deep_hdr}</h2>'
        f'<div>{deep_body}</div>'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'<h2>{sp_deep.get("title","")}</h2>'
        f'<p>{sp_deep.get("body","")}</p>'
        f'<h4>{sp_deep.get("badTitle","")}</h4>'
        f'<div>{clean_no_divs(sp_deep.get("badText",""))}</div>'
        f'<h4>{sp_deep.get("goodTitle","")}</h4>'
        f'<div>{clean_no_divs(sp_deep.get("goodText",""))}</div>'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'<h3>{st_t}</h3>'
        f'<p>{st_p}</p>'
        f'{j_line}'
        f'<div style="margin-top:16px;">'
        f'<h3 style="margin-bottom:8px;">{mesh_hdr}</h3>'
        f'<div class="seo-mesh-grid">{links_html}</div>'
        f'</div>'
        f'</article>'
    )

    out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
    out = out.replace('<div class="section-kicker">', art_html + '\n        <div class="section-kicker">', 1)
    out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)

    page_title = f"{title_str} | Giyur Aliyah Track ({lang.upper()})"
    meta_desc = f"{title_str}. {trap_str} {st_p}"[:158].strip()
    out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{page_title}</title>", out, count=1)
    out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{meta_desc}" />', out, count=1)

    faq_entities = [
        {"@type": "Question", "name": title_str, "acceptedAnswer": {"@type": "Answer", "text": trap_str}},
        {"@type": "Question", "name": deep_hdr, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", deep_body).strip()[:700]}},
        {"@type": "Question", "name": sp_deep.get("title", st_t), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", sp_deep.get("badText", "") + " " + sp_deep.get("goodText", "")).strip()[:700]}},
        {"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}
    ]
    faq_obj = {"@context": "https://schema.org", "@graph": [
        {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": title_str, "item": canon_url}]},
        {"@type": "FAQPage", "mainEntity": faq_entities}
    ]}
    faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
    out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)

    hreflang_tags = [f'<link rel="alternate" hreflang="x-default" href="{get_form_url("en", f_cfg)}" />'] + [
        f'<link rel="alternate" hreflang="{lc}" href="{get_form_url(lc, f_cfg)}" />' for lc in LANGS
    ]
    og_loc = {"en":"en_US","he":"he_IL","fr":"fr_FR","es":"es_ES","de":"de_DE","ru":"ru_RU"}.get(lang, "en_US")
    og_tags = f'  <meta property="og:type" content="website" />\n  <meta property="og:locale" content="{og_loc}" />\n  <meta property="og:site_name" content="Giyur Aliyah Track" />\n  <meta property="og:title" content="{page_title}" />\n  <meta property="og:description" content="{meta_desc}" />\n  <meta property="og:url" content="{canon_url}" />\n  <meta property="og:image" content="https://giyuraliyahtrack.com/bg-watercolor.jpg" />\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="{page_title}" />\n  <meta name="twitter:description" content="{meta_desc}" />'
    out = out.replace("</head>", f"{og_tags}\n  " + "\n  ".join(hreflang_tags) + f"\n  {DOMAIN_SHIELD}\n</head>", 1)
    return out

for f_cfg in FORM_CATALOG:
    for l in LANGS:
        html_out = render_form_landing_page(l, f_cfg)
        loc_slug = f_cfg["l_slugs"][l]
        loc_dir = f"public/forms/{loc_slug}" if l == "en" else f"public/{l}/forms/{loc_slug}"
        os.makedirs(loc_dir, exist_ok=True)
        open(f"{loc_dir}/index.html", "w", encoding="utf-8").write(html_out)


FORMS_HUB_TITLES = {
    "en": "Official Misrad HaPanim (PIBA) & Nativ Hebrew Forms Vault — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b & Nespach Alef",
    "he": "מאגר טפסי משרד הפנים (רשות האוכלוסין) ונתיב להורדה ומילוי אוטומטי — אש/1, אש/3, אש/6, אש/456, מר/14א, מר/14ב ונספח א׳",
    "fr": "Portail des 8 Formulaires Officiels Misrad HaPanim (PIBA) & Nativ en Hébreu — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "es": "Bóveda de los 8 Formularios Oficiales de Misrad HaPanim (PIBA) y Nativ en Hebreo — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "de": "Alle 8 offiziellen Misrad HaPanim (PIBA) & Nativ Formulare auf Hebräisch — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "ru": "База всех 8 официальных анкет МВД Израиля (PIBA) и Натив на иврите — Аш/1, Аш/3, Аш/6, Аш/456, МР/14а, МР/14б и Неспах Алеф"
}

def get_forms_hub_url(lang):
    return "https://giyuraliyahtrack.com/forms/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/forms/"

for l in LANGS:
    fh_dir = "public/forms" if l == "en" else f"public/{l}/forms"
    os.makedirs(fh_dir, exist_ok=True)
    fh_html = render_form_landing_page(l, FORM_CATALOG[2])  # Base on Ash/6 + all 8 forms mesh
    fh_url = get_forms_hub_url(l)
    fh_title = FORMS_HUB_TITLES[l]
    fh_html = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{fh_url}" />', fh_html, count=1)
    fh_html = re.sub(r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{fh_url}" />', fh_html, count=1)
    fh_html = re.sub(r'<title>.*?</title>', lambda _: f'<title>{fh_title} | Giyur Aliyah Track ({l.upper()})</title>', fh_html, count=1)
    for alt in LANGS:
        fh_html = re.sub(rf'<link rel="alternate" hreflang="{alt}" href="[^"]*" />', f'<link rel="alternate" hreflang="{alt}" href="{get_forms_hub_url(alt)}" />', fh_html, count=1)
    fh_html = re.sub(r'<link rel="alternate" hreflang="x-default" href="[^"]*" />', f'<link rel="alternate" hreflang="x-default" href="{get_forms_hub_url("en")}" />', fh_html, count=1)
    open(f"{fh_dir}/index.html", "w", encoding="utf-8").write(fh_html)

sm_txt = open("public/sitemap.xml", "r", encoding="utf-8").read().replace("</urlset>", "").rstrip()
sm_extra = []
for l in LANGS:
    fhub_loc = get_forms_hub_url(l)
    sm_extra.append(f"  <url>\n    <loc>{fhub_loc}</loc>")
    sm_extra.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{get_forms_hub_url("en")}"/>')
    for alt in LANGS:
        sm_extra.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{get_forms_hub_url(alt)}"/>')
    sm_extra.append("  </url>")
for f_cfg in FORM_CATALOG:
    for l in LANGS:
        loc = get_form_url(l, f_cfg)
        sm_extra.append(f"  <url>\n    <loc>{loc}</loc>")
        sm_extra.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{get_form_url("en", f_cfg)}"/>')
        for alt in LANGS:
            sm_extra.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{get_form_url(alt, f_cfg)}"/>')
        sm_extra.append("  </url>")
sm_extra.append("</urlset>\n")
open("public/sitemap.xml", "w", encoding="utf-8").write(sm_txt + "\n" + "\n".join(sm_extra))
print("✅ Pre-baked 48 Native 6-Language Government Form Landing Pages (with LIVE_SEO = False safety lock ON)!")
