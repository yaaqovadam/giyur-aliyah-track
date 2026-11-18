
### [CORRECTION - Section 7: Full Civil Dossier & 100% Israeli Community References]
- **Full Home-Country Apostille Dossier (All 5 Required When Grabbing Docs Abroad):**
  1. Original Long-Form Birth Certificate (with parents' names) + Apostille.
  2. Single Status / Non-Impediment Certificate (*Teudat Ravakut* equivalent) + Apostille.
  3. All Prior Marriage / Civil Divorce / Widowhood Decrees (if applicable) + Apostilles.
  4. Legal Name Change Certificates (if applicable) + Apostille.
  5. "3-Bucket" National Criminal Record Checks (*Teudat Yosher*) + Apostilles.
- **100% Israeli Community & Reference Letters:**
  - Candidates starting their conversion journey in Israel (both Gush Etzion and State/Rabbanut tracks) are NEVER asked for Jewish community letters from their homeland.
  - Both Gush Etzion and the Rabbanut require the candidate to embed in an Orthodox community **inside Israel**, where all reference letters come from their Israeli Sponsoring Rabbi (*Rav Melaveh*), Israeli Host Family (*Mishpacha Melavah*), and local Israeli Shul Rabbi.

### 7.13 Track 1 (Gush Etzion) vs. Track 2 (State Rabbanut) Paperwork Distinction
- **Track 1 (Independent Beit Din / Gush Etzion):** Does NOT require the 5 Apostilled home-country civil documents (FBI background checks, vault birth certificates, single-status affidavits) to open a conversion file. Candidates only need their passport, personal story, Torah study, and Israeli Orthodox Rabbi/community sponsorship. They only need the 5 Apostilled documents later if they cross over to the State Rabbanut (Track 2) or file for Misrad HaPanim Spousal Residency (Track 3).
- **Track 2 (State Rabbanut / Va'adat Charigim):** Strictly requires all 5 Apostilled home-country civil documents upfront to clear the Exceptions Committee (`Va'adat Charigim`), which is where the "Fly Home for All 5 Docs" power move belongs.

### 7.14 Community Integration Playbook & Anti-Boilerplate Letter Architecture
- **Real-World Inspiration (Overcoming Barriers):** Reassure users who feel intimidated about finding an Orthodox community by sharing how candidates succeeded even during Corona lockdowns (when shuls were closed to women or too far to walk) by starting with daily Torah video shiurim, an online Rabbi/Gabbai community, and structured classes before plugging into an Israeli neighborhood. Today in Israel, Orthodox shuls are on every block—candidates simply need to pick one and show up consistently.
- **The Gabbai Shortcut:** Advise candidates to pick ONE neighborhood Orthodox shul (avoiding shul-hopping) and introduce themselves directly to the **Gabbai** (who knows every family in the congregation) to get matched with a Sponsoring Rabbi (*Rav Melaveh*) and Shabbat host family (*Mishpacha Melavah*).
- **Anti-Boilerplate Letter Guardrail:** Never generate identical copy-paste Hebrew recommendation letters, as Rabbanut and Misrad HaPanim clerks easily spot and flag repetitive templates, and writing about oneself from scratch is awkward. Frame and build the tool as a **Guided Personalization Interview & Bureaucratic Checklist** that captures specific real-life details (holidays shared, personal milestones, shul attendance), enforces mandatory *Teudat Zehut* / contact headers, and outputs an editable Hebrew outline for the Rabbi or host family to finish in their own voice.

### 7.28 Navy & Ocean Blue App Bar + Magen David Emblem Standardization
- **App Header (`.app-header`):** Styled in deep navy (`#082548`) with ocean blue (`#0288E8` / `#1994F5`) brand accents, white typography, and high-contrast language/menu controls.
- **Brand Mark (`.brand-mark`):** Replaced the 5-pointed star with a bold 6-pointed Magen David SVG path (`26px` inside a `38px` `#0288E8` squircle).
- **Hero Shield Emblem (`.hero-emblem`):** Unified to a single `#0288E8` squircle (`border-radius: 19px`) featuring a white shield with a 6-pointed Magen David cutout and ambient blue glow.


### 7.29 November 2026 Vault & Pre-Crawl SEO Overhaul (Live)
- **700 Beit Din Vault (`public/app/bd_vault.js`):** 100% unique 6-language cards across `BD_PACK1` (1–200 Core), `BD_PACK2` (201–400 Curveballs & Sincerity), `BD_PACK3` (401–550 Men's Gerim), and `BD_PACK4` (551–700 Women's Giyorot). Zero bracketed templates or clones.
- **300 Couples Sync Vault (`public/app/cp_vault.js`):** 100% unique 6-language PIBA separated-room questions & question-specific clerk tips across 10 statutory categories (`exam80` = IDs 1–80, 8 per category).
- **156-URL Multilingual SEO Architecture (`build_seo.py`):** `trailingSlash: true` in `firebase.json`, compressed `bg-watercolor.jpg`, front-loaded `<65c` SEO titles, HTML-escaped meta descriptions, dedicated `Nohal 5.2.0004` Newborn Sefach + translated `overseas_giyur`, and 2 vault-powered pillar spokes (`beit-din-conversion-questions-israel` & `misrad-hapanim-couples-interview-questions`). `LIVE_SEO = False` safety gate remains locked until launch.

### 7.30 Compact App Bar Share Icon & Restored Homepage Particle Intro (Live)
- **Compact App Bar Layout:** Removed `.brand-mark` Star of David from `.app-header` / `.topbar` so `GiyurAliyahTrack` sits directly beside `#app-nav-back`, with borderless `21px` `#appbar-share-btn` placed on the right side of the bar adjacent to `#globe-lang-btn` and `.hamburger-btn` across all 157 user-facing pages.
- **Exact-Page 6-Language Share (`#gat-exact-page-share`):** Shares the exact native `hreflang` URL on static pages or `/app/?module=...&form=...&lang=...` inside the SPA while stripping private Couples Sync room keys.
- **Homepage Intro Movie (`public/splash.js`):** Loaded directly via `<script src="/splash.js">` (no `document.write` throttling); plays once per browsing session on root hubs and replays cleanly on explicit homepage reloads.
