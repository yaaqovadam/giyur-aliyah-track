import os, re, json

# Set LIVE_SEO = True when ready to remove noindex and allow Googlebot full indexing!
LIVE_SEO = False

h = open("public/index.html").read()
if not LIVE_SEO:
    assert "noindex, nofollow" in h, "Safety check: noindex must remain active while LIVE_SEO is False!"

spokes = [
  ("emergency-aliyah-go-bag-shinui-maamad",
   "Emergency Aliyah From Inside Israel (Shinui Ma'amad) & Go-Bag",
   "Skip the 9-Month Consulate Wait: The Pre-Flight Go-Bag & In-Israel Aliyah (Shinui Ma'amad) Playbook",
   "Need to leave for Israel now? Never board a plane without two Apostilled originals of these 7 Go-Bag documents. How to clear Ben Gurion Airport and file Shinui Ma'amad inside Israel.",
   "go_bag", 1,
   """<h2>How In-Israel Emergency Aliyah (Shinui Ma'amad) Works</h2>
   <p>Filing for Aliyah from abroad through NBN or Jewish Agency consulates routinely takes 6 to 9+ months due to interview backlogs. Under Israel's Law of Return, eligible applicants can enter Israel on a B/2 tourist stamp and file for <strong>Shinui Ma'amad (Change of Status from Tourist to Oleh)</strong> directly inside Israel through Misrad HaPanim—provided every civil and rabbinic document is double-Apostilled before departure.</p>
   <h3>The 7 Mandatory Pre-Flight Go-Bag Documents (Bring 2 Originals of Each)</h3>
   <p>1. Long-Form Vault Birth Certificates listing both parents with state/foreign-ministry Apostilles.<br>2. Federal Fingerprint Police Clearances (FBI Identity History Summary, UK ACRO, Canadian RCMP, etc.) issued within the strict 180-day window and Apostilled.<br>3. Official Marriage, Divorce, and Death decrees (every prior marriage must be documented) with Apostilles.<br>4. Recognized Orthodox Proof of Judaism letter (Ishur Yahadut) on official synagogue letterhead stating born-Jewish maternal lineage.<br>5. Beit Din Conversion Certificates, Certificate of Good Standing, and 9-Month Post-Mikvah Proof of Community Residence for converts.<br>6. 90-Day In-Israel Survival Setup: Private Tourist-to-Oleh Bridge Health Insurance and a licensed Israeli FX currency bridge to pay landlords in Shekels before receiving a Teudat Zehut.</p>
   <h3>Emergency Antisemitism Protocol: 9-Month Post-Mikvah Waiver & Mid-Conversion Transfer (Tik Ha'avarah)</h3>
   <p>Applicants forced to leave their home country urgently due to rising antisemitism or acute security threats have three legal fast-tracks: (1) Born Jews can file immediate in-Israel <em>Shinui Ma'amad</em> upon arrival; (2) Recent diaspora converts who cannot safely remain abroad for the standard 9-month post-Mikvah community requirement can petition Misrad HaPanim for an <strong>Emergency Humanitarian Waiver</strong> backed by an official safety attestation from their sponsoring Beit Din; and (3) Mid-conversion candidates can bring a sealed <strong>Beit Din Transfer Dossier (Tik Ha'avarah)</strong> logging completed Ulpan Giyur hours to petition <em>Va'adat Charigim</em> (Form Ash/1) inside Israel.</p>"""),

  ("gush-etzion-private-conversion-aliyah",
   "Private Orthodox Conversion (Gush Etzion, Bnei Brak) & Aliyah",
   "Private Orthodox Conversion (Gush Etzion, Bnei Brak & More): Rabbanut Validation & Aliyah Playbook",
   "Why a 100% kosher Gush Etzion or Bnei Brak private Orthodox conversion needs Beit HaDin HaGadol validation (Ishur Giyur) for Rabbanut weddings and how to protect your 21,700 NIS Sal Klita grant.",
   "ishur_giyur", 2,
   """<h2>Comparing Israel's Recognized Private Orthodox Batei Din vs. State Nativ</h2>
   <p>Independent Orthodox rabbinical courts in Israel—led by <strong>Gush Etzion (Harova / R' Nissim Karelitz traditions)</strong> and <strong>Bnei Brak (R' Karelitz / Chazon Ish traditions)</strong>—conduct 100% halachically rigorous conversions recognized under the Law of Return following the landmark Dahan Supreme Court ruling. However, navigating the post-Mikvah bureaucracy requires two critical steps:</p>
   <h3>1. Supreme Rabbinical Court Validation (Ishur Giyur) for Rabbanut Marriage</h3>
   <p>Under the Supreme Court <em>Dahan</em> ruling, recognized private Orthodox conversions qualify under the Law of Return when the candidate held a valid long-term resident/student visa—whereas B/2 tourists converting privately face strict Misrad HaPanim security blocks unless bridged via Spousal Residency (<em>Nohal 5.2.0008</em>), 9+ months in a recognized diaspora community, or State Rabbanut validation. Furthermore, local Rabbanut marriage registrars strictly require secondary validation (<em>Ishur Giyur</em>) from the Supreme Rabbinical Court (<em>Beit HaDin HaGadol</em>) in Jerusalem before issuing a marriage license or registering future children as Jewish.</p>
   <h3>2. Protecting Your 21,700+ NIS Sal Klita Absorption Grant (24-Month Rule)</h3>
   <p>Misrad HaKlita counts total cumulative days spent inside Israel on tourist or student visas over the 3 years prior to receiving Oleh status. Exceeding 24 cumulative months forfeits the cash Sal Klita absorption basket.</p>"""),

  ("vaadat-charigim-tourist-conversion-israel",
   "Va'adat Charigim (Form Ash/1): Tourist State Giyur in Israel",
   "How to Pass Va'adat Charigim (Exceptions Committee Form Ash/1) for State Conversion in Israel",
   "Step-by-step guide to passing Israel's Exceptions Committee (Va'adat Charigim) from a B/2 tourist or A/2 student visa, including the Hebrew Michtav Hesber and 2-stage sincerity interview.",
   "vaadat_charigim", 3,
   """<h2>Breaking Through the Tourist Wall: Israel's Va'adat Charigim (Exceptions Committee)</h2>
   <p>By statute, Israel's State Conversion Authority (Ma'arach HaGiyur / Nativ) only accepts Israeli citizens and permanent residents. Tourists on a B/2 visa or students on an A/2 visa are legally barred from opening a state conversion file until they receive formal clearance from the inter-ministerial <strong>Exceptions Committee (Va'adat Charigim)</strong> via <strong>Form Ash/1</strong>.</p>
   <h3>Why 70% of Unprepared Tourist Applications Are Rejected</h3>
   <p>Applicants who submit an emotional English biography or mention wanting to stay with an Israeli partner without following the statutory Hebrew format are routinely rejected for suspected immigration circumvention. A winning Va'adat Charigim dossier requires a statutory Hebrew <em>Michtav Hesber</em> (Legal Explanation Letter), stamped Orthodox sponsoring rabbi letters, proof of independent foreign financial support, and passing the 2-stage security and sincerity interview.</p>"""),

  ("apostille-180-day-clock-fbi-police-check-israel",
   "The 5 Apostilled Docs & 180-Day Misrad HaPanim Clock",
   "Escaping the 180-Day Apostille Expiration Clock & Misrad HaPanim Breadcrumb Loop",
   "Complete checklist for the 5 mandatory Apostilled home-country documents, Federal FBI/ACRO/RCMP Police Checks, Single-Status Affidavit, and beating the 180-day Misrad HaPanim expiration clock.",
   "five_docs", 1,
   """<h2>How the 180-Day Misrad HaPanim Document Expiration Clock Traps Applicants</h2>
   <p>Misrad HaPanim enforces a strict <strong>180-day validity window</strong> from the date of issuance on foreign police clearances (Teudat Yosher) and civil status affidavits (Tamtzit Rishum / Single-Status Affidavit). When clerks hand out partial document demands across multiple appointments—the infamous 'Breadcrumb Loop'—your FBI/ACRO/RCMP check expires while you wait for your next appointment, forcing you to start over from scratch.</p>
   <h3>The 3-Bucket Federal Police Check Rule (Since Age 14)</h3>
   <p>Every applicant must provide federal fingerprint-based police clearances (not local city/county sheriff letters) with Hague Apostilles for: (1) Country of Birth, (2) All Countries of Citizenship, and (3) Any Country Lived In for more than 12 cumulative months since age 14.</p>"""),

  ("israeli-rabbi-community-letters-beit-din",
   "How to Get 5–8+ Stamped Israeli Rabbi Letters for Beit Din",
   "Plugging Into an Orthodox Shul & Generating Stamped Hebrew Rabbi Letters for Beit Din",
   "Solve the 'You write it, I'll sign it!' bottleneck with our 6-step Israeli Orthodox community playbook, 9-month Ulpan Giyur log, and custom Rabbinic letterhead generator.",
   "community_letters", 5,
   """<h2>Solving the 'You Draft It in Hebrew, I'll Sign It!' Rabbi Bottleneck</h2>
   <p>To advance to a Beit Din final tribunal or pass Rabbanut validation, candidates must present <strong>5 to 8+ stamped Hebrew recommendation letters</strong> from an recognized Orthodox synagogue rabbi, an official Ulpan Giyur instructor, a certified Madrichat Kallah / Melaveh family, and observant Shabbat host families.</p>
   <h3>What Dayanim Look For in a Rabbinic Letter</h3>
   <p>Busy neighborhood rabbis rarely have time to type formal Hebrew legal letters from scratch—and generic 2-sentence notes get rejected by the Beit Din clerk. Every letter must explicitly state the rabbi's full credentialed title, the exact dates of your Shabbat and holiday attendance, verification of kashrut and modest observance, and your Hebrew and civil passport identification numbers.</p>"""),

  ("misrad-hapanim-spousal-visa-nohal-5-2-0008",
   "Misrad HaPanim Spousal Visa (Nohal 5.2.0008) & 80 Questions",
   "Misrad HaPanim Spousal Residency (Tahalich Medurag Nohal 5.2.0008) & 80-Question Interview Playbook",
   "Beat the 2-year clerk breadcrumb loop, pass the separated 80-question Misrad HaPanim sincerity interrogation, and secure your B/1 work permit and A/5 Teudat Zehut.",
   None, 6,
   """<h2>Mastering the 5-Year Graduated Spousal Process (Tahalich Medurag — Nohal 5.2.0008 / 5.2.0009)</h2>
   <p>Israeli citizens sponsoring a foreign spouse or common-law partner (Yeduim BeTzibur) must navigate Misrad HaPanim's multi-year graduated residency track: advancing from a <strong>B/1 Work Permit</strong> to an annual <strong>A/5 Temporary Resident Teudat Zehut</strong> (for 4 consecutive years), and finally permanent residency or citizenship.</p>
   <h3>Passing the Separated 80-Question Sincerity Interrogation (Bdikath Kenut HaKesher)</h3>
   <p>Each year, Misrad HaPanim separates the Israeli citizen and foreign partner into two rooms and asks 60 to 80 hyper-specific daily-life questions—from the color of your bedroom curtains and which side of the bed each partner sleeps on, to who paid the last electricity bill and what you ate for dinner two nights ago. Three or more contradictions can freeze your A/5 upgrade for a year.</p>"""),

  ("hebrew-clerk-letter-translator-form-ash1-ash3",
   "Translate Misrad HaPanim Clerk Letters + Form Ash/1 & Ash/3",
   "Two-Way Hebrew Engine: Translate Misrad HaPanim Deficiency Letters & Auto-Fill Forms Ash/1 and Ash/3",
   "Snap any Hebrew Drishat Mismachim clerk sheet for instant English translation and a 30-day file-closure shield, or answer in English to print ready-to-file Hebrew PDFs.",
   None, 4,
   """<h2>Defeating the 30-Day Administrative File Closure Rule (Drishat Mismachim)</h2>
   <p>When a Misrad HaPanim or Rabbanut clerk hands you a printed Hebrew deficiency sheet (<em>Drishat Mismachim</em>), a strict <strong>30-day administrative countdown</strong> begins. If you misunderstand a single Hebrew line item or fail to submit a formal Hebrew extension request before Day 30, the ministry closes your file—wiping out months of waiting and expiring your 180-day Apostilles.</p>
   <h3>Filling Forms Ash/1 and Ash/3 Strictly in Hebrew</h3>
   <p>Israeli ministry clerks reject visa and exceptions applications filled out in English. Our Two-Way Hebrew Engine lets you answer questions in plain English and outputs print-ready Hebrew PDF packets for Form Ash/1, Form Ash/3, and Nohal 5.2.0008.</p>"""),

  ("aliyah-spousal-visa-criminal-record-rehabilitation",
   "Aliyah or Spousal Visa With a Past Arrest or Criminal Record",
   "Making Aliyah or Getting a Spousal Visa With a Past Arrest: Teudat Yosher & Rehabilitation Playbook",
   "Never hide an expunged arrest on an FBI, ACRO, or RCMP fingerprint check. How to submit a statutory Hebrew Rehabilitation Explanation Letter and Good Character Dossier.",
   None, 7,
   """<h2>Why Expunged or Dismissed Arrests Still Trigger Misrad HaPanim Red Flags</h2>
   <p>Federal fingerprint checks (FBI Identity History Summary, UK ACRO 'No Live Trace', RCMP) frequently display sealed, expunged, or decades-old misdemeanor arrests. Checking 'No' on your Aliyah or Misrad HaPanim questionnaire when an old arrest appears on your federal fingerprint report results in an immediate rejection for <strong>material misrepresentation (Choser Tom Lev)</strong>—which is far harder to overturn than the underlying offense itself.</p>
   <h3>Building a Winning Statutory Hebrew Rehabilitation Dossier</h3>
   <p>Under Israeli administrative law, applicants with a past non-violent offense can preempt a refusal by submitting an upfront Hebrew Rehabilitation Letter (<em>Michtav Hesber</em>), certified court disposition records showing case dismissal or sentence completion, and 3 formal character affidavits demonstrating complete rehabilitation.</p>"""),

  ("tourist-visa-israel-remote-work-housing-giyur",
   "B/2 Tourist Visa Survival: Legal Remote Work & Housing in Israel",
   "How to Sustain Yourself in Israel on a B/2 Tourist Visa During Conversion (Giyur) Without Violating Work Laws",
   "Avoid deportation for illegal local work. How B/2 tourists and conversion students fund their year in Israel via online remote work, live-in nanny, and dorm exchanges.",
   None, 8,
   """<h2>How Conversion Students & B/2 Tourists Legally Fund 12 Months in Israel</h2>
   <p>Living in Jerusalem, Tel Aviv, or Beit Shemesh for 9 to 14 months on a B/2 tourist visa or A/2 student visa without an Israeli work permit is financially daunting—and working illegally for an Israeli employer (even cash babysitting or restaurant shifts) risks immediate deportation and permanent blacklisting from your Beit Din.</p>
   <h3>100% Legal Foreign Remote Work & Zero-Rent Housing Exchanges</h3>
   <p>While working for an Israeli entity is prohibited on a B/2 visa, earning income remotely from foreign clients or employers outside Israel (paid into your foreign bank account) or participating in structured Ulpan/seminary housing exchanges allows you to cover living expenses legally while completing your conversion track.</p>""")
]

# Configure robots.txt and meta robots tag based on LIVE_SEO flag
robots_meta = "index, follow" if LIVE_SEO else "noindex, nofollow"
robots_txt = "User-agent: *\nAllow: /\nSitemap: https://giyuraliyahtrack.com/sitemap.xml\n" if LIVE_SEO else "User-agent: *\nDisallow: /\n"
open("public/robots.txt", "w").write(robots_txt)

if LIVE_SEO:
    h = h.replace('content="noindex, nofollow"', 'content="index, follow"')
    open("public/index.html", "w").write(h)

urls = ["https://giyuraliyahtrack.com/"]
for slug, title, h1, desc, tkey, oidx, article_html in spokes:
    os.makedirs(f"public/{slug}", exist_ok=True)
    p = h
    full_title = f"{title} | Giyur Aliyah Track"
    p = re.sub(r"<title>.*?</title>", f"<title>{full_title}</title>", p, flags=re.S)
    p = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', f'<meta name="description" content="{desc}" />', p)
    p = re.sub(r'<meta\s+property="og:title"\s+content="[^"]*"\s*/?>', f'<meta property="og:title" content="{full_title}" />', p)
    p = re.sub(r'<meta\s+property="og:description"\s+content="[^"]*"\s*/?>', f'<meta property="og:description" content="{desc}" />', p)
    p = p.replace('href="https://giyuraliyahtrack.com/"', f'href="https://giyuraliyahtrack.com/{slug}"')

    # Replace the main H1 cleanly and preserve spoke H1 in English
    p = re.sub(r'<h1[^>]*data-i18n="hero_h1"[^>]*>.*?</h1>', f'<h1 id="spoke-h1">{h1}</h1>', p, flags=re.S)
    breadcrumb_ld = f'<script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Giyur Aliyah Track","item":"https://giyuraliyahtrack.com/"}},{{"@type":"ListItem","position":2,"name":{json.dumps(title)},"item":"https://giyuraliyahtrack.com/{slug}"}}]}}</script></head>'
    p = p.replace('</head>', breadcrumb_ld, 1)

    # Inject unique static crawlable <article> right inside #view-0 above the spoke mesh
    spoke_article_block = f"""
        <article class="seo-spoke-article" id="seo-spoke-article">
          {article_html}
        </article>"""
    p = p.replace('<nav class="seo-spoke-mesh"', spoke_article_block + '\n        <nav class="seo-spoke-mesh"', 1)

    trigger = f"openTerm('{tkey}')" if tkey else f"openObstacle({oidx})"
    p = p.replace("</body>", f"<script>window.IS_SPOKE=true;window.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{{if(!location.search.includes('noopen')){trigger};}},400));</script></body>")
    open(f"public/{slug}/index.html", "w").write(p)
    urls.append(f"https://giyuraliyahtrack.com/{slug}")

smap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(f"  <url><loc>{u}</loc></url>" for u in urls) + "\n</urlset>"
open("public/sitemap.xml", "w").write(smap)
fb = json.load(open("firebase.json"))
fb["hosting"]["cleanUrls"] = True
json.dump(fb, open("firebase.json", "w"), indent=2)
print(f"✅ Generated {len(spokes)} unique SEO spoke pages with dedicated <article> blocks, single H1s, and 9-spoke internal link mesh (Robots: {robots_meta})!")
