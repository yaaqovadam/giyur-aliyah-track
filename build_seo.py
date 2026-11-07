import os, re, json

h = open("public/index.html").read()
assert "noindex, nofollow" in h, "Safety check: noindex must remain active!"

# Define the 8 unique SEO Spoke Routes (slug, title, h1, desc, term_key, obs_idx)
spokes = [
  ("gush-etzion-private-conversion-aliyah",
   "Gush Etzion & Private Orthodox Conversion: Aliyah, Rabbanut & Ishur Giyur",
   "Gush Etzion & Independent Orthodox Conversion: The Post-Mikvah & Aliyah Playbook",
   "Why a 100% kosher Gush Etzion conversion is blocked for Aliyah and Rabbanut weddings without Beit HaDin HaGadol validation (Ishur Giyur) and how to protect your 21,700 NIS Sal Klita grant.",
   "ishur_giyur", 2),
  ("vaadat-charigim-tourist-conversion-israel",
   "Va'adat Charigim (Form Ash/1): Tourist & Student State Giyur in Israel",
   "How to Pass Va'adat Charigim (Exceptions Committee Form Ash/1) for State Conversion",
   "Step-by-step guide to passing Israel's Exceptions Committee (Va'adat Charigim) from a B/2 tourist or student visa, including the Hebrew Michtav Hesber and 2-stage security & sincerity interview.",
   "vaadat_charigim", 3),
  ("apostille-180-day-clock-fbi-police-check-israel",
   "The 5 Mandatory Apostilled Docs & 180-Day Misrad HaPanim Expiration Clock",
   "Escaping the 180-Day Apostille Clock & Misrad HaPanim Breadcrumb Loop",
   "Complete checklist for the 5 mandatory Apostilled home-country documents, 3-Bucket FBI/ACRO/RCMP Police Checks, Single-Status Affidavit, and the 3 Aliyah/Giyur profiles.",
   "five_docs", 1),
  ("israeli-rabbi-community-letters-beit-din",
   "How to Get 5–8+ Stamped Israeli Rabbi & Host Family Letters for Beit Din",
   "Plugging Into an Orthodox Shul & Generating Stamped Hebrew Rabbi Letters",
   "Solve the 'You write it, I'll sign it!' bottleneck with our 6-step Israeli Orthodox community playbook, 9-month Ulpan Giyur log, and custom Rabbinic letterhead generator.",
   "community_letters", 5),
  ("misrad-hapanim-spousal-visa-nohal-5-2-0008",
   "Misrad HaPanim Spousal Visa (Nohal 5.2.0008) & 80-Question Couples Interview",
   "Misrad HaPanim Spousal Residency (Tahalich Medurag) & 80-Question Sync Playbook",
   "Beat the 2-year clerk breadcrumb loop, pass the separated 80-question Misrad HaPanim sincerity interrogation, and secure your B/1 work permit and A/5 Teudat Zehut.",
   None, 6),
  ("hebrew-clerk-letter-translator-form-ash1-ash3",
   "Two-Way Hebrew Engine: Snap & Translate Misrad HaPanim Letters + Form Ash/1 & Ash/3 Filler",
   "Translate Hebrew Clerk Deficiency Letters & Auto-Fill Official Forms Ash/1 and Ash/3",
   "Snap any Hebrew Drishat Mismachim clerk sheet for instant English translation and a 30-day file-closure shield, or answer in English to print ready-to-file Hebrew PDFs.",
   None, 4),
  ("aliyah-spousal-visa-criminal-record-rehabilitation",
   "Making Aliyah or Getting a Spousal Visa With a Past Arrest or Criminal Record",
   "3-Bucket Police Checks (Teudat Yosher) & Rehabilitation Dossier for Misrad HaPanim",
   "Never hide an expunged arrest on an FBI, ACRO, or RCMP fingerprint check. How to submit a statutory Hebrew Rehabilitation Explanation Letter and Good Character Dossier.",
   None, 7),
  ("tourist-visa-israel-remote-work-housing-giyur",
   "How to Sustain Yourself in Israel on a B/2 Tourist Visa During Conversion (Giyur)",
   "100% Legal Foreign Remote Work & Zero-Rent Live-In Housing Exchanges in Israel",
   "Avoid deportation for illegal local work. How B/2 tourists and conversion students fund their year in Israel via online ESL teaching, translation, live-in nanny, and dorm exchanges.",
   None, 8)
]
urls = ["https://giyuraliyahtrack.com/"]
for slug, title, h1, desc, tkey, oidx in spokes:
    os.makedirs(f"public/{slug}", exist_ok=True)
    p = h
    p = re.sub(r"<title>.*?</title>", f"<title>{title} | Giyur Aliyah Track</title>", p)
    p = re.sub(r'<meta name="description" content=".*?" />', f'<meta name="description" content="{desc}" />', p)
    p = p.replace('href="https://giyuraliyahtrack.com/"', f'href="https://giyuraliyahtrack.com/{slug}"')
    p = p.replace("<h1>Conversion, Rabbanut & Aliyah Without Losing 5 Years</h1>", f"<h1>{h1}</h1>")
    p = re.sub(r'<div class="seo-obstacle-library".*?</div>', '', p, flags=re.S)
    trigger = f"openTerm('{tkey}')" if tkey else f"openObstacle({oidx})"
    p = p.replace("</body>", f"<script>window.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{{if(!location.search.includes('noopen')){trigger};}},400));</script></body>")
    open(f"public/{slug}/index.html", "w").write(p)
    urls.append(f"https://giyuraliyahtrack.com/{slug}")

smap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(f"  <url><loc>{u}</loc></url>" for u in urls) + "\n</urlset>"
open("public/sitemap.xml", "w").write(smap)
fb = json.load(open("firebase.json"))
fb["hosting"]["cleanUrls"] = True
json.dump(fb, open("firebase.json", "w"), indent=2)
print(f"✅ Generated {len(spokes)} unique SEO spoke pages + sitemap.xml (noindex active)!")
