import html, json, os, re

LIVE_SEO = False
ROBOTS_META = "index, follow" if LIVE_SEO else "noindex, nofollow"
DOMAIN_SHIELD = "<script>(function(){var h=location.hostname;if(h&&!/^(localhost|127\\.0\\.0\\.1|giyuraliyahtrack\\.com|www\\.giyuraliyahtrack\\.com|giyur-aliyah-track\\.(web\\.app|firebaseapp\\.com))$/.test(h)){location.replace('https://giyuraliyahtrack.com'+location.pathname+location.search+location.hash);}})();</script>"

SPOKES = [
    {
        "slug": "emergency-aliyah-go-bag-shinui-maamad",
        "obs_idx": 0, "term_key": "go_bag", "lead_from_term": True,
        "l_slugs": {
            "en": "emergency-aliyah-go-bag-shinui-maamad",
            "he": "aliyat-cherum-tik-mismachim-shinui-maamad",
            "fr": "aliyah-urgence-dossier-apostille-shinui-maamad",
            "es": "aliya-emergencia-carpeta-apostilla-shinui-maamad",
            "de": "notfall-alija-apostille-dokumente-shinui-maamad",
            "ru": "ekstrennaya-repatriaciya-dokumenty-shinuj-maamad"
        },
        "seo_titles": {
            "en": "Emergency Aliyah Go-Bag & In-Israel Shinui Ma'amad (2026)",
            "he": "תיק חירום לעלייה ושינוי מעמד מתוך ישראל (אפוסטיל 2026)",
            "fr": "Aliyah d'Urgence : Dossier Apostille & Shinui Ma'amad Israël",
            "es": "Aliyá de Emergencia: Carpeta Apostilla y Shinui Ma'amad",
            "de": "Notfall-Alija: Apostille-Dokumente & Inlands-Shinui Ma'amad",
            "ru": "Экстренная репатриация и Шинуй Маамад внутри Израиля (2026)"
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
        },
        "seo_titles": {
            "en": "5 Apostilled Docs, FBI Police Check & 180-Day Rule | Israel",
            "he": "5 מסמכי אפוסטיל, תעודת יושר ושעון 180 הימים במשרד הפנים",
            "fr": "5 Documents Apostillés, Casier Judiciaire & Règle 180 Jours",
            "es": "5 Documentos Apostillados, Antecedentes y Regla de 180 Días",
            "de": "5 Apostille-Dokumente, Führungszeugnis & 180-Tage-Frist",
            "ru": "5 документов с апостилем, справка о несудимости и 180 дней"
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
        },
        "seo_titles": {
            "en": "Private Orthodox Conversion (Gush Etzion), Rabbanut & Aliyah",
            "he": "גיור פרטי (גוש עציון / בני ברק), אישור הרבנות הראשית ועלייה",
            "fr": "Conversion Privée (Gush Etzion), Ishur Giyur Rabbinat & Aliyah",
            "es": "Conversión Privada (Gush Etzion), Ishur Guiur y Aliyá",
            "de": "Privater Giur (Gush Etzion), Oberrabbinat Ischur Giur & Alija",
            "ru": "Частный гиюр (Гуш-Эцион / Бней-Брак), Ишур Гиюр и Алия"
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
        },
        "seo_titles": {
            "en": "Va'adat Charigim: Tourist Visa State Conversion in Israel",
            "he": "ועדת חריגים לגיור ממלכתי באשרת תייר B/2 (טופס אש/1)",
            "fr": "Va'adat Charigim : Conversion d'État sous Visa Touriste B/2",
            "es": "Va'adat Jariguim: Conversión Estatal con Visa de Turista B/2",
            "de": "Va'adat Charigim: Staatlicher Giur mit B/2-Touristenvisum",
            "ru": "Ваадат Харигим: государственный гиюр по турвизе B/2 (Аш/1)"
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
        },
        "seo_titles": {
            "en": "Misrad HaPanim Hebrew Letter Translator & Forms Ash/1–Ash/3",
            "he": "פענוח דרישת מסמכים ממשרד הפנים ומילוי טופס אש/1 ואש/3",
            "fr": "Traducteur de Lettres Misrad HaPanim & Formulaires Ash/1–Ash/3",
            "es": "Traductor de Cartas Misrad HaPanim y Formularios Ash/1–Ash/3",
            "de": "Misrad HaPanim Brief-Übersetzer & Formulare Ash/1–Ash/3",
            "ru": "Перевод писем МВД Израиля и заполнение анкет Аш/1 и Аш/3"
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
        },
        "seo_titles": {
            "en": "Sponsoring Rabbi (Rav Melaveh) & Beit Din Community Letters",
            "he": "רב מלווה, מדריכת כלה ומכתבי המלצה חתומים לבית הדין לגיור",
            "fr": "Rabbin Accompagnateur (Rav Melaveh) & Lettres pour Beit Din",
            "es": "Rabino Patrocinador (Rav Melaveh) y Cartas para el Beit Din",
            "de": "Begleitender Rabbiner (Rav Melaveh) & Beit-Din-Empfehlungen",
            "ru": "Сопровождающий раввин (Рав Мелаве) и письма для Бейт-Дина"
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
        },
        "seo_titles": {
            "en": "Israel Spousal Visa (Nohal 5.2.0008 / 5.2.0009) & Form Ash/6",
            "he": "הליך מדורג לבני זוג במשרד הפנים (נוהל 5.2.0008 וטופס אש/6)",
            "fr": "Visa Conjoint Israël (Nohal 5.2.0008 / 5.2.0009) & Ash/6",
            "es": "Visa de Pareja y Cónyuge en Israel (Nohal 5.2.0008 y Ash/6)",
            "de": "Ehepartner-Visum Israel (Nohal 5.2.0008 / Stufenverfahren)",
            "ru": "СТУПРО в МВД Израиля (Ноаль 5.2.0008 / 5.2.0009 и анкета Аш/6)"
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
        },
        "seo_titles": {
            "en": "Aliyah or Spousal Visa With a Past Arrest or Criminal Record",
            "he": "עלייה או הליך מדורג עם רישום פלילי ישן — תיק שיקום ותצהיר",
            "fr": "Aliyah ou Visa Conjoint avec Antécédent / Casier Judiciaire",
            "es": "Aliyá o Visa de Pareja con Antecedentes Penales Pasados",
            "de": "Alija oder Partner-Visum trotz Vorstrafe im Führungszeugnis",
            "ru": "Репатриация или СТУПРО при наличии старой судимости / привода"
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
        },
        "seo_titles": {
            "en": "B/2 Tourist Visa Israel: Remote Work, Rent & Health Insurance",
            "he": "אשרת תייר B/2 בישראל: עבודה מרחוק, שכירת דירה וביטוח רפואי",
            "fr": "Visa Touriste B/2 Israël : Télétravail, Loyer & Assurance",
            "es": "Visa Turista B/2 Israel: Trabajo Remoto, Alquiler y Seguro",
            "de": "B/2-Touristenvisum Israel: Remote-Arbeit, Miete & Versicherung",
            "ru": "Турвиза B/2 в Израиле: удалённая работа, аренда и страховка"
        }
    },
    {
        "slug": "dahan-ruling-non-orthodox-conversion-aliyah-truth",
        "obs_idx": "dahan_truth", "term_key": "dahan_truth", "lead_from_term": True,
        "l_slugs": {
            "en": "dahan-ruling-non-orthodox-conversion-aliyah-truth",
            "he": "psak-din-dahan-giyur-reformi-konservativi-rabbanut",
            "fr": "arret-dahan-conversion-reformee-massorti-aliyah-rabbinat",
            "es": "fallo-dahan-conversion-reformista-conservadora-aliya-rabinato",
            "de": "dahan-urteil-reform-konservativer-giur-alija-rabbinat",
            "ru": "reshenie-dahan-reformistskij-konservativnyj-giyur-ravvinat"
        },
        "seo_titles": {
            "en": "Dahan Ruling: Reform & Conservative Conversion Aliyah Limits",
            "he": "בג״ץ דהן: האמת על גיור רפורמי או קונסרבטיבי מול הרבנות הראשית",
            "fr": "Arrêt Dahan : Conversion Réformée / Massorti, Aliyah & Rabbinat",
            "es": "Fallo Dahan: Conversión Reformista / Conservadora y Rabanut",
            "de": "Dahan-Urteil: Reform-/Konservativer Giur, Alija & Oberrabbinat",
            "ru": "Решение Дахан: реформистский и консервативный гиюр для Алии"
        }
    },
    {
        "slug": "overseas-conversion-aliyah-ishur-giyur",
        "obs_idx": 2, "term_key": "overseas_giyur", "lead_from_term": True,
        "l_slugs": {
            "en": "overseas-conversion-aliyah-ishur-giyur",
            "he": "giyur-bachul-rca-london-consistoire-ishur-giyur-aliyah",
            "fr": "conversion-consistoire-etranger-aliyah-ishur-giyur-rabbinat",
            "es": "conversion-extranjero-amia-fcje-aliya-ishur-giyur-rabinato",
            "de": "auslands-giur-ord-ikg-alija-ishur-giyur-oberrabbinat",
            "ru": "zarubezhnyj-giyur-feor-keroor-repatriaciya-ishur-giyur"
        },
        "seo_titles": {
            "en": "Overseas Orthodox Conversion Aliyah & Rabbanut Ishur Giyur",
            "he": "עלייה לאחר גיור אורתודוקסי בחו״ל (RCA / קונסיסטואר) ואישור גיור",
            "fr": "Conversion Orthodoxe à l'Étranger : Aliyah & Ishur Giyur",
            "es": "Conversión Ortodoxa en el Extranjero: Aliyá e Ishur Guiur",
            "de": "Orthodoxer Auslands-Giur (ORD / IKG): Alija & Ischur Giur",
            "ru": "Зарубежный ортодоксальный гиюр: репатриация и Ишур Гиюр"
        }
    },
    {
        "slug": "newborn-baby-teudat-zehut-sefach-registration-israel",
        "obs_idx": 6, "term_key": "newborn_sefach", "lead_from_term": True,
        "l_slugs": {
            "en": "newborn-baby-teudat-zehut-sefach-registration-israel",
            "he": "rishum-tinok-sefach-teudat-zehut-misrad-hapanim-bdikat-rikmot",
            "fr": "inscription-nouveau-ne-teudat-zehut-sefach-misrad-hapanim",
            "es": "registro-bebe-recien-nacido-teudat-zehut-sefach-israel",
            "de": "neugeborenes-baby-teudat-zehut-sefach-registrierung-israel",
            "ru": "registraciya-novorozhdennogo-rebenka-teudat-zeut-sefah-mvd"
        },
        "seo_titles": {
            "en": "Newborn Baby Teudat Zehut Sefach Registration (Nohal 5.2.0004)",
            "he": "רישום תינוק בספח תעודת הזהות ללא בדיקת רקמות (נוהל 5.2.0004)",
            "fr": "Inscription Nouveau-Né Sefach Teudat Zehut (Nohal 5.2.0004)",
            "es": "Registro de Bebé en el Sefaj de Teudat Zehut (Nohal 5.2.0004)",
            "de": "Neugeborenes im Teudat-Zehut-Sefach eintragen (Nohal 5.2.0004)",
            "ru": "Регистрация новорождённого в Сефах Теудат-Зеут (Ноаль 5.2.0004)"
        }
    },
    {
        "slug": "beit-din-conversion-questions-israel",
        "obs_idx": "vault_bd_700", "term_key": "community_letters",
        "l_slugs": {
            "en": "beit-din-conversion-questions-israel",
            "he": "sheelot-beit-din-legiyur-700-tshuvot",
            "fr": "questions-beit-din-conversion-israel-700",
            "es": "preguntas-beit-din-conversion-israel-700",
            "de": "beit-din-fragen-konversion-giur-israel-700",
            "ru": "voprosy-bejt-dina-giyur-izrail-700"
        },
        "seo_titles": {
            "en": "700 Beit Din Conversion Questions & Answers (2026 Israel)",
            "he": "700 שאלות ותשובות לבית הדין לגיור בישראל (מאגר הכנה 2026)",
            "fr": "700 Questions & Réponses du Beit Din (Conversion Israël 2026)",
            "es": "700 Preguntas y Respuestas del Beit Din (Guiur Israel 2026)",
            "de": "700 Beit-Din-Fragen & Antworten für Giur in Israel (2026)",
            "ru": "700 вопросов и ответов Бейт-Дина по гиюру в Израиле (2026)"
        }
    },
    {
        "slug": "misrad-hapanim-couples-interview-questions",
        "obs_idx": "vault_cp_300", "term_key": "spousal_deep_dive",
        "l_slugs": {
            "en": "misrad-hapanim-couples-interview-questions",
            "he": "300-sheelot-shimua-zugi-misrad-hapanim",
            "fr": "300-questions-entretien-couple-misrad-hapanim",
            "es": "300-preguntas-entrevista-pareja-misrad-hapanim",
            "de": "300-fragen-paar-interview-misrad-hapanim",
            "ru": "300-voprosov-sobesedovanie-stupro-mvd-izrailya"
        },
        "seo_titles": {
            "en": "300 Misrad HaPanim Couples Visa Questions (Nohal 5.2.0008)",
            "he": "300 שאלות שימוע זוגי במשרד הפנים (נוהל 5.2.0008 / 5.2.0009)",
            "fr": "300 Questions d'Entretien Couple Misrad HaPanim (5.2.0008)",
            "es": "300 Preguntas de Entrevista de Pareja Misrad HaPanim (5.2.0008)",
            "de": "300 Fragen Paar-Interview Misrad HaPanim (Nohal 5.2.0008)",
            "ru": "300 вопросов собеседования СТУПРО в МВД Израиля (5.2.0008)"
        }
    }
]

HUB_SEO_TITLES = {
    "en": "Israel Conversion (Giyur), Spousal Visa & Aliyah Guide (2026)",
    "he": "גיור, הליך מדורג לבני זוג ועלייה לישראל — מדריך מעשי (2026)",
    "fr": "Conversion (Giyur), Visa Conjoint & Aliyah en Israël (2026)",
    "es": "Conversión (Guiur), Visa de Pareja y Aliyá en Israel (2026)",
    "de": "Giur (Konversion), Partner-Visum & Alija in Israel (2026)",
    "ru": "Гиюр, СТУПРО (виза супругов) и Алия в Израиле — гид (2026)"
}

VAULT_SPOKE_COPY = {
    "vault_bd_700": {
        "en": (
            "🕍 700 Real Israeli Beit Din Conversion Questions, Halachic Answers & Dayanim Tips",
            "Preparing for your final sitting before the Israeli State Conversion Court (Beit Din LeGiyur) or an independent Orthodox Beit Din (Gush Etzion)? Below is a live sample from our verified 700-card Orthodox tribunal vault—organized into 200 Core Halacha cards, 200 Real Dayanim Curveballs & Sincerity Tests, 150 Men's (Gerim) cards, and 150 Women's (Giyorot) cards.",
            "⚡ Practice All 700 Beit Din Flashcards + 56 Audio Songs & Brachot →",
            "/app/?module=beit-din&lang=en"
        ),
        "he": (
            "🕍 700 שאלות אמיתיות מבית הדין לגיור, תשובות הלכתיות וטיפים למעמד הדיינים",
            "מתכוננים למעמד בית הדין הממלכתי לגיור או לבית דין אורתודוקסי מוכר? לפניכם טעימה מתוך מאגר 700 הכרטיסיות המלא שלנו — מחולק ל-200 שאלות ליבה בהלכה, 200 שאלות התקלה וכנות של דיינים, 150 שאלות לגברים (גרים) ו-150 שאלות לנשים (גיורות).",
            "⚡ לתרגול כל 700 שאלות בית הדין + 56 שירי שבת וברכות בקריוקי ←",
            "/app/?module=beit-din&lang=he"
        ),
        "fr": (
            "🕍 700 Vraies Questions du Beit Din en Israël, Réponses Halakhiques & Conseils",
            "Vous préparez votre audience finale devant le Beit Din d'État israélien ou Gush Etzion ? Découvrez ci-dessous un extrait authentique de nos 700 fiches vérifiées (200 Fondamentaux, 200 Questions Pièges & Sincérité, 150 Hommes et 150 Femmes).",
            "⚡ S'entraîner sur les 700 Questions Beit Din + 56 Chants & Brachot →",
            "/app/?module=beit-din&lang=fr"
        ),
        "es": (
            "🕍 700 Preguntas Reales del Beit Din en Israel, Respuestas Halájicas y Consejos",
            "¿Se prepara para su audiencia ante el Beit Din Estatal de Israel o Gush Etzion? Aquí tiene una muestra directa de nuestras 700 tarjetas verificadas (200 Fundamentales, 200 Casos Difíciles y Sinceridad, 150 Hombres y 150 Mujeres).",
            "⚡ Practicar las 700 Tarjetas del Beit Din + 56 Canciones y Brajot →",
            "/app/?module=beit-din&lang=es"
        ),
        "de": (
            "🕍 700 Echte Beit-Din-Fragen in Israel, Halachische Antworten & Richter-Tipps",
            "Bereiten Sie sich auf Ihren Termin vor dem staatlichen israelischen Beit Din oder Gush Etzion vor? Hier sehen Sie einen Auszug aus unseren 700 geprüften Lernkarten (200 Grundlagen, 200 Fang- & Aufrichtigkeitsfragen, 150 Männer, 150 Frauen).",
            "⚡ Alle 700 Beit-Din-Karten + 56 Schabbat-Lieder & Brachot üben →",
            "/app/?module=beit-din&lang=de"
        ),
        "ru": (
            "🕍 700 реальных вопросов Бейт-Дина в Израиле, галахические ответы и советы даянов",
            "Готовитесь к финальному заседанию Государственного раввинского суда по гиюру или бейт-дина Гуш-Эцион? Ниже представлена подборка из нашей проверенной базы в 700 карточек (200 базовых законов, 200 каверзных вопросов на искренность, 150 мужских и 150 женских вопросов).",
            "⚡ Тренировать все 700 карточек Бейт-Дина + 56 песен Шаббата и брахот →",
            "/app/?module=beit-din&lang=ru"
        )
    },
    "vault_cp_300": {
        "en": (
            "📱 300 Misrad HaPanim Separated-Room Couples Interview Questions (Nohal 5.2.0008 & 5.2.0009)",
            "Before PIBA clerks place you and your partner in two separate rooms and compare every household detail line-by-line, review these real interrogation questions across all 10 statutory categories (Bedroom, Kitchen, Rent & Bank, Relationship History, Family, Holidays, Bathroom & Health, Work & Morning Transit, Dual-Track Giyur Sec. ג.10, and Newborn Sefach 5.2.0004).",
            "⚡ Open Live 2-Phone Encrypted Couples Sync Room (Free Trial) →",
            "/app/?module=couples-sync&lang=en"
        ),
        "he": (
            "📱 300 שאלות השימוע הזוגי בחדרים נפרדים במשרד הפנים (נוהל 5.2.0008 ונוהל 5.2.0009)",
            "לפני שפקידי רשות האוכלוסין מפרידים אתכם לשני חדרים ומצליבים כל פרט בבית, עברו על דוגמאות חיות מתוך מאגר 300 השאלות ב-10 קטגוריות (חדר שינה, מטבח, שכ״ד ובנק, היכרות וחתונה, משפחה, חגים, אמבטיה ובריאות, עבודה והגעה הבוקר, מסלול כפול סע׳ ג.10 ורישום תינוק 5.2.0004).",
            "⚡ פתחו חדר סנכרון מוצפן ל-2 טלפונים (ניסיון חינם) ←",
            "/app/?module=couples-sync&lang=he"
        ),
        "fr": (
            "📱 300 Questions de l'Entretien Couple en Salles Séparées au Misrad HaPanim (5.2.0008 / 5.2.0009)",
            "Avant que les inspecteurs du Misrad HaPanim (PIBA) ne vous interrogent séparément sur votre vie quotidienne, découvrez ces questions réelles issues de nos 10 catégories statutaires et synchronisez vos réponses sur 2 téléphones.",
            "⚡ Ouvrir la Salle Synchro Couple Chiffrée sur 2 Téléphones →",
            "/app/?module=couples-sync&lang=fr"
        ),
        "es": (
            "📱 300 Preguntas de la Entrevista de Pareja en Cuartos Separados — Misrad HaPanim (5.2.0008 / 5.2.0009)",
            "Antes de que los funcionarios de PIBA los interroguen por separado y comparen cada detalle cotidiano, revise estas preguntas reales de las 10 categorías oficiales y practique en vivo desde 2 teléfonos.",
            "⚡ Abrir Sala Sincronizada Cifrada para 2 Teléfonos →",
            "/app/?module=couples-sync&lang=es"
        ),
        "de": (
            "📱 300 Fragen für das Paar-Interview in getrennten Räumen — Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009)",
            "Bevor PIBA-Beamte Sie und Ihren Partner getrennt zu jedem Detail Ihres Alltags befragen, prüfen Sie diese echten Fragen aus allen 10 Kategorien und synchronisieren Sie Ihre Antworten auf 2 Smartphones.",
            "⚡ Verschlüsselten 2-Handy-Paar-Sync-Raum öffnen →",
            "/app/?module=couples-sync&lang=de"
        ),
        "ru": (
            "📱 300 вопросов перекрёстного собеседования пар (СТУПРО) в МВД Израиля (Ноаль 5.2.0008 и 5.2.0009)",
            "До того как инспекторы МВД разведут вас по разным кабинетам и начнут сверять каждую бытовую мелочь, изучите реальные вопросы из всех 10 категорий (спальня, кухня, аренда и счета, знакомство, родня, праздники, быт, работа, двойной трек гиюра п. ג.10 и регистрация детей 5.2.0004).",
            "⚡ Открыть зашифрованную комнату синхронизации на 2 телефонах →",
            "/app/?module=couples-sync&lang=ru"
        )
    }
}

STAGE_UI_STATIC_I18N = {
    "en": ("1. Choose Track", "2. Your Situation", "3. Action Plan", "🚨 Still Abroad / Emergency Exit? Pre-Flight Go-Bag Protocol", "Open Page →", "OFFICIAL PIBA / MISRAD HAPANIM FORM"),
    "he": ("1. בחירת מסלול", "2. המצב שלך", "3. תוכנית פעולה", "🚨 עדיין בחו״ל / יציאת חירום? נוהל תיק חירום ואפוסטיל", "לפתיחת המדריך ←", "טופס רשמי של רשות האוכלוסין ומשרד הפנים"),
    "fr": ("1. Choisir Voie", "2. Votre Cas", "3. Plan d'Action", "🚨 Encore à l'étranger / Urgence ? Dossier Go-Bag Apostille", "Ouvrir le Guide →", "FORMULAIRE OFFICIEL PIBA / MISRAD HAPANIM"),
    "es": ("1. Elegir Vía", "2. Su Caso", "3. Plan de Acción", "🚨 ¿Aún en el extranjero / Emergencia? Carpeta Go-Bag Apostilla", "Abrir Guía →", "FORMULARIO OFICIAL PIBA / MISRAD HAPANIM"),
    "de": ("1. Weg wählen", "2. Ihre Lage", "3. Aktionsplan", "🚨 Noch im Ausland / Notfall? Go-Bag Apostille-Ordner", "Leitfaden öffnen →", "OFFIZIELLES FORMULAR PIBA / MISRAD HAPANIM"),
    "ru": ("1. Выбор пути", "2. Ситуация", "3. План действий", "🚨 Ещё за границей / Экстренный выезд? Папка Go-Bag и Апостиль", "Открыть инструкцию →", "ОФИЦИАЛЬНЫЙ БЛАНК МВД ИЗРАИЛЯ (PIBA)")
}

DIY_VS_LAWYERS_NBN_I18N = {
    "en": (
        "🛡️ Self-Advocacy vs. 15,000–40,000₪ Immigration Lawyers, Nefesh B'Nefesh & The Jewish Agency (2026 Reality Check)",
        "Why do thousands of converts, spouses of Israelis, and Aliyah applicants get stuck? Standard organizations like Nefesh B'Nefesh (NBN) and The Jewish Agency (Sochnut) only process textbook overseas Aliyah files—they do not represent you inside Misrad HaPanim for Spousal Visas (Nohal 5.2.0008 / 5.2.0009), Va'adat Charigim conversion exceptions, private Beit Din crossovers, or 300-question separated-room interrogations. Meanwhile, private immigration lawyers charge 15,000₪ to 40,000₪+ just to fill out the exact same Hebrew PDF forms and cover letters you can generate, audit, and practice yourself here—while connecting you directly to vetted fixed-fee Israeli lawyers, notaries, and Sponsoring Rabbis only for the specific statutory signatures you actually need."
    ),
    "he": (
        "🛡️ ייצוג עצמי חכם מול עורכי דין ב-15,000–40,000 ₪, נפש בנפש והסוכנות היהודית (מדריך השטח ל-2026)",
        "מדוע אלפי מתגיירים, בני זוג של אזרחים ישראלים ומבקשי עלייה נתקעים מול הבירוקרטיה? גופים כמו ׳נפש בנפש׳ והסוכנות היהודית מטפלים בתיקי עלייה קלאסיים מחו״ל בלבד — הם אינם מלווים אתכם בתוך לשכות משרד הפנים בהליך מדורג לבני זוג (נוהל 5.2.0008 / 5.2.0009), בוועדת חריגים לגיור, בהכרה בגיור פרטי או בשימוע 300 השאלות בחדרים נפרדים. מנגד, משרדי עורכי דין גובים 15,000 עד 40,000 ₪ על מילוי אותם טפסים רשמיים ומכתבי הסבר שתוכלו להפיק ולתרגל כאן בעצמכם — תוך חיבור ישיר לעורכי דין, נוטריונים ורבנים מלווים מוכרים בתעריף קבוע ושקוף רק כשנדרשת חתימה משפטית."
    ),
    "fr": (
        "🛡️ Se Défendre Soi-Même face aux Avocats à 15 000–40 000 ₪, Nefesh B'Nefesh & L'Agence Juive (Vérité Terrain 2026)",
        "Pourquoi tant de convertis, conjoints d'Israéliens et candidats à l'Aliyah se retrouvent-ils bloqués ? L'Agence Juive (Sochnut) et Nefesh B'Nefesh ne traitent que les dossiers d'Aliyah standards depuis l'étranger : ils n'interviennent pas au Misrad HaPanim pour les Visas Conjoints (Nohal 5.2.0008 / 5.2.0009), la Va'adat Charigim ou l'interrogatoire des 300 questions en salles séparées. De leur côté, les avocats privés facturent 15 000 à 40 000 ₪ pour remplir les mêmes formulaires PDF en hébreu que notre moteur génère instantanément — tout en vous reliant à nos avocats, notaires et rabbins agréés uniquement pour les signatures légales requises."
    ),
    "es": (
        "🛡️ Autodefensa Legal frente a Abogados de 15.000–40.000 ₪, Nefesh B'Nefesh y la Agencia Judía (Realidad 2026)",
        "¿Por qué miles de conversos, parejas de israelíes y solicitantes de Aliyá quedan atrapados? La Agencia Judía (Sojnut) y Nefesh B'Nefesh solo tramitan casos estándar desde el exterior: no te representan ante Misrad HaPanim para Visas Conyugales (Nohal 5.2.0008 / 5.2.0009), Va'adat Jariguim ni el interrogatorio de 300 preguntas en salas separadas. Mientras tanto, los abogados cobran entre 15.000 y 40.000 ₪ por rellenar los mismos formularios hebreos que puedes generar y auditar aquí mismo, contratando abogados, notarios o rabinos verificados solo para las firmas puntuales obligatorias."
    ),
    "de": (
        "🛡️ Selbstvertretung statt 15.000–40.000 ₪ Anwaltskosten, Nefesh B'Nefesh & Jewish Agency (Praxis-Realität 2026)",
        "Warum stecken Tausende Konvertiten, Ehepartner von Israelis und Alija-Antragsteller fest? Die Jewish Agency (Sochnut) und Nefesh B'Nefesh bearbeiten nur Standard-Alija-Fälle aus dem Ausland — sie begleiten Sie nicht ins Misrad HaPanim für das Partner-Stufenverfahren (Nohal 5.2.0008 / 5.2.0009), das Ausnahmekomitee (Va'adat Charigim) oder das 300-Fragen-Interview in getrennten Räumen. Private Kanzleien verlangen 15.000–40.000 ₪ für dieselben hebräischen PDF-Anträge, die Sie hier selbst erstellen und mit geprüften Anwälten, Notaren und Rabbinern punktuell zum Festpreis ergänzen können."
    ),
    "ru": (
        "🛡️ Самостоятельная защита без адвокатов за 15 000–40 000 ₪, Сохнута и Нефеш бе-Нефеш (Реальность 2026 года)",
        "Почему тысячи гиорим, супругов израильтян и репатриантов застревают в бюрократии МВД? Еврейское агентство «Сохнут» и «Нефеш бе-Нефеш» ведут только стандартные кейсы из-за рубежа — они не защищают вас в МВД Израиля (Мисрад а-Пним) на процедуре СТУПРО (Ноаль 5.2.0008 / 5.2.0009), комиссии Ваадат Харигим или перекрёстном допросе из 300 вопросов. Частные адвокаты берут 15 000–40 000 ₪ за заполнение тех же самых бланков на иврите, которые вы можете подготовить здесь сами, подключая проверенных адвокатов, нотариусов и раввинов только там, где закон требует их печать."
    )
}

STATUTORY_AUTHORITY_I18N = {
    "en": ("⚖️ 2026 Official PIBA & Chief Rabbinate Statutory Authority Table", "Procedure Nohal 5.2.0008 (Ed. 16, July 20, 2026 — Married Spouses, 6-Page Form Ash/6 Dossier, Sec. ג.10 Dual-Track Protection & 300-Q Interview) • Nohal 5.2.0009 (Ed. 17, July 16, 2026 — Common-Law Couples, Nespach Alef 13-Clause Affidavit) • Nohal 5.2.0001 (In-Israel Aliyah / Shinui Ma'amad, Form Ash/456 & 24-Month Sal Klita Rule) • Nohal 5.2.0004 (Israeli-Born Child Sefach Registration & 300-Day Pre-Birth Proof) • Hague Apostille & Non-Hague Diplomatic Consular Chain Verification."),
    "he": ("⚖️ טבלת אסמכתאות חוקיות ונהלי רשות האוכלוסין והרבנות הראשית (מהדורות 2026)", "נוהל 5.2.0008 (מהדורה 16, 20 ביולי 2026 — בני זוג נשואים, אוגדן טופס אש/6 עמ׳ 1–6, הגנת סעיף ג.10 למסלול כפול ושימוע 300 השאלות) • נוהל 5.2.0009 (מהדורה 17, 16 ביולי 2026 — ידועים בציבור, תצהיר נספח א׳ בן 13 סעיפים) • נוהל 5.2.0001 (עלייה מתוך ישראל / שינוי מעמד, טופס אש/456 וכלל 24 החודשים לסל קליטה) • נוהל 5.2.0004 (רישום תינוק שנולד בישראל בספח והוכחת 300 ימים) • אימות אפוסטיל ושרשרת קונסולרית למדינות שאינןחתומות על אמנת האג."),
    "fr": ("⚖️ Référentiel Statutaire Officiel PIBA / Misrad HaPanim & Grand Rabbinat (Éditions 2026)", "Procédure Nohal 5.2.0008 (Éd. 16, 20 juillet 2026 — Couples Mariés, Dossier Ash/6 p.1–6, Protection Double Parcours art. ג.10 & Entretien 300 Questions) • Nohal 5.2.0009 (Éd. 17, 16 juillet 2026 — Concubinage, Déclaration Nespach Alef 13 clauses) • Nohal 5.2.0001 (Aliyah en Israël / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Inscription Nouveau-Né Sefach & Preuve 300 Jours) • Apostille de La Haye & Légalisation Consulaire."),
    "es": ("⚖️ Tabla de Autoridad Legal Oficial PIBA / Misrad HaPanim y Gran Rabinato (Ediciones 2026)", "Procedimiento Nohal 5.2.0008 (Ed. 16, 20 de julio de 2026 — Cónyuges Casados, Dossier Ash/6 p.1–6, Protección Doble Vía art. ג.10 y Entrevista de 300 Preguntas) • Nohal 5.2.0009 (Ed. 17, 16 de julio de 2026 — Parejas de Hecho, Nespaj Alef 13 cláusulas) • Nohal 5.2.0001 (Aliyá en Israel / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Registro de Recién Nacido en Sefaj y Regla de 300 Días) • Apostilla de La Haya y Cadena Consular."),
    "de": ("⚖️ Offizielle Rechtsgrundlagen PIBA / Misrad HaPanim & Oberrabbinat (Ausgaben 2026)", "Verfahren Nohal 5.2.0008 (Ed. 16, 20. Juli 2026 — Verheiratete Paare, 6-Seiten-Dossier Ash/6, Doppel-Track Abs. ג.10 & 300-Fragen-Interview) • Nohal 5.2.0009 (Ed. 17, 16. Juli 2026 — Lebenspartner, Nespach Alef 13 Klauseln) • Nohal 5.2.0001 (Inlands-Alija / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Neugeborenen-Sefach & 300-Tage-Nachweis) • Haager Apostille & Konsularische Legalisation."),
    "ru": ("⚖️ Официальная правовая база МВД Израиля (PIBA) и Главного раввината (Редакции 2026 г.)", "Инструкция Ноаль 5.2.0008 (Ред. 16 от 20.07.2026 — Зарегистрированные супруги, анкета Аш/6 на 6 стр., двойной трек п. ג.10 и допрос из 300 вопросов) • Ноаль 5.2.0009 (Ред. 17 от 16.07.2026 — Гражданские партнёры, декларация Неспах Алеф из 13 пунктов) • Ноаль 5.2.0001 (Репатриация внутри Израиля / Шинуй Маамад, Аш/456) • Ноаль 5.2.0004 (Регистрация ребёнка в Сефах и правило 300 дней) • Гаагский апостиль и консульская легализация.")
}

LANGS = ["en", "he", "fr", "es", "de", "ru"]
dicts = {l: json.load(open(f"public/i18n/{l}.json", encoding="utf-8")) for l in LANGS}

def extract_js_window_array(js_path, var_name):
    src = open(js_path, encoding="utf-8").read()
    idx = src.find(f"window.{var_name}")
    if idx == -1:
        return []
    sb = src.find("[", idx)
    d, ins, esc = 0, False, False
    for p in range(sb, len(src)):
        ch = src[p]
        if ins:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == '"': ins = False
        else:
            if ch == '"': ins = True
            elif ch == "[": d += 1
            elif ch == "]":
                d -= 1
                if d == 0:
                    return json.loads(src[sb:p+1])
    return []

BD_SAMPLE_CARDS = (
    extract_js_window_array("public/app/bd_vault.js", "BD_PACK1")[:6] +
    extract_js_window_array("public/app/bd_vault.js", "BD_PACK2")[:6] +
    extract_js_window_array("public/app/bd_vault.js", "BD_PACK3")[:4] +
    extract_js_window_array("public/app/bd_vault.js", "BD_PACK4")[:4]
)
CP_SAMPLE_CARDS = extract_js_window_array("public/app/cp_vault.js", "CP_DECK80")[:20]

def make_meta_desc(raw_text, min_len=125, max_len=156):
    txt = re.sub(r"<[^>]+>", " ", str(raw_text or ""))
    txt = re.sub(r"\s+", " ", txt).strip()
    if len(txt) > max_len:
        cut = txt[:max_len]
        if " " in cut[min_len:]:
            cut = cut[:cut.rfind(" ")]
        txt = cut.rstrip(" ,;:-—•") + "."
    return html.escape(txt, quote=True)

def esc_attr(s):
    return html.escape(re.sub(r"\s+", " ", str(s or "")).strip(), quote=True)

def build_static_funnel_html(lang, d):
    fp = d.get("_funnel_pre_ai", {})
    s1, s2, s3, em_btn, _, _ = STAGE_UI_STATIC_I18N.get(lang, STAGE_UI_STATIC_I18N["en"])
    f_h = fp.get("f_h", "🧭 Tell Us What Track You Are Interested In:")
    f_s = fp.get("f_s", "Tap your track below to open your step-by-step Case Playbook:")
    f_b1 = fp.get("f_b1", "🕍 1) Giyur — I Want to Convert (or Validate My Conversion)")
    f_b2 = fp.get("f_b2", "✈️ 2) Aliyah — I Want to Make Aliyah to Israel (or Spousal Visa)")
    f_b3 = fp.get("f_b3", "✡️ 3) Both — I Want to Convert AND Make Aliyah / Marry")
    b_css = "width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#fff;border:2.5px solid #4FC3F7;padding:13px 15px;border-radius:14px;font-size:0.92rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;text-align:start;box-shadow:0 6px 16px rgba(3,169,244,0.22);"
    go_href = "/emergency-aliyah-go-bag-shinui-maamad/" if lang == "en" else f"/{lang}/{SPOKES[0]['l_slugs'][lang]}/"
    return (
        f'<section id="gat-3track-funnel-card" style="background:#fff;border:2.5px solid #03A9F4;border-radius:20px;padding:15px 14px;margin:8px 0 16px 0;box-shadow:0 12px 32px rgba(3,169,244,0.16);">'
        f'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;">'
        f'<div style="background:linear-gradient(135deg,#082548 0%,#0288D1 100%);color:#fff;border:1.5px solid #03A9F4;border-radius:999px;padding:6px 8px;font-size:0.73rem;font-weight:900;text-align:center;">{s1}</div>'
        f'<div style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;border-radius:999px;padding:6px 8px;font-size:0.73rem;font-weight:900;text-align:center;">{s2}</div>'
        f'<div style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;border-radius:999px;padding:6px 8px;font-size:0.73rem;font-weight:900;text-align:center;">{s3}</div>'
        f'</div>'
        f'<div style="font-size:1.06rem;font-weight:900;color:#082548;margin-bottom:3px;">{f_h}</div>'
        f'<div style="font-size:0.81rem;color:#475569;font-weight:700;margin-bottom:10px;">{f_s}</div>'
        f'<div style="display:flex;flex-direction:column;gap:9px;">'
        f'<button type="button" style="{b_css}" onclick="window.selectGatMainTrack(1)"><span>{f_b1}</span><span>❯</span></button>'
        f'<button type="button" style="{b_css}" onclick="window.selectGatMainTrack(2)"><span>{f_b2}</span><span>❯</span></button>'
        f'<button type="button" style="{b_css}" onclick="window.selectGatMainTrack(3)"><span>{f_b3}</span><span>❯</span></button>'
        f'<a href="{go_href}" style="text-decoration:none;width:100%;background:#fffbeb;color:#92400e;border:2px solid #f59e0b;padding:10px 14px;border-radius:12px;font-size:0.82rem;font-weight:900;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;"><span>{em_btn}</span><span>❯</span></a>'
        f'</div>'
        f'<div id="gat-3track-diag-box"></div>'
        f'</section>'
    )

base_html = open("public/index.html", encoding="utf-8").read()
base_html = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\s*', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = base_html.replace(DOMAIN_SHIELD, "")
base_html = re.sub(r'<article class="seo-spoke-article"[\s\S]*?</article>\s*', '', base_html)

def get_localized_url(lang, spoke_cfg):
    if spoke_cfg is None:
        return "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    loc_slug = spoke_cfg["l_slugs"].get(lang, spoke_cfg["slug"])
    return f"https://giyuraliyahtrack.com/{loc_slug}/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/{loc_slug}/"

def make_hreflang(spoke_cfg):
    en_url = get_localized_url("en", spoke_cfg)
    tags = [f'<link rel="alternate" hreflang="x-default" href="{en_url}" />']
    for l in LANGS:
        tags.append(f'<link rel="alternate" hreflang="{l}" href="{get_localized_url(l, spoke_cfg)}" />')
    return "\n  ".join(tags)

def format_seo_rich_text(raw_html):
    s = str(raw_html or "")
    s = re.sub(r'(?<!^)\s*(•)\s*', r'<br><span style="color:#0288D1;font-weight:900;">•</span> ', s)
    s = re.sub(r'(?<!^)\s*(\d+\.\s+<strong>)', r'<br><span class="gat-seo-step-item">\1', s)
    return s

def clean_no_divs(raw_str):
    s = re.sub(r'</?div[^>]*>', '', str(raw_str or ""))
    return format_seo_rich_text(s)

def build_spoke_mesh_links(lang):
    items = []
    for sp in SPOKES:
        loc_s = sp["l_slugs"].get(lang, sp["slug"])
        href = f"/{loc_s}/" if lang == "en" else f"/{lang}/{loc_s}/"
        lbl = html.escape(sp["seo_titles"].get(lang, sp["seo_titles"]["en"]))
        items.append(f'<a class="seo-mesh-link" href="{href}">📘 {lbl}</a>')
    return '<div class="seo-mesh-grid" style="margin-top:14px;">' + "".join(items) + '</div>'

def build_hub_library_html(lang, d):
    j = d.get("_jurisdiction", {})
    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    diy_t, diy_p = DIY_VS_LAWYERS_NBN_I18N[lang]
    parts = [f'<div class="seo-obstacle-library"><details><summary style="">📖 {d.get("mesh_title", "Official Statutory Playbooks & Bureaucracy Guides")} (2026 PIBA Editions)</summary>']
    parts.append(f'<article><h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>')
    if j:
        parts.append(f'<p><strong>{j.get("flag","")} {j.get("name","")}:</strong> {j.get("police","")} • {j.get("birth","")} • {j.get("single","")} • {j.get("apostille","")}</p>')
    parts.append(build_spoke_mesh_links(lang))
    parts.append('</article>')
    for idx, ob in enumerate(d.get("_obstacles", [])):
        parts.append(
            f'<article id="seo-obs-{idx}"><details class="gat-seo-card-acc"><summary style=""><span>{ob.get("tag","")} — {ob.get("title","")}</span><span class="gat-acc-plus">＋</span></summary>'
            f'<section class="gat-acc-body"><h3>{ob.get("title","")}</h3><p>{ob.get("body","")}</p><h4>{ob.get("badTitle","")}</h4><p>{clean_no_divs(ob.get("badText",""))}</p><h4>{ob.get("goodTitle","")}</h4><p>{clean_no_divs(ob.get("goodText",""))}</p></section></details></article>'
        )
    for tk, tv in d.get("_terms", {}).items():
        parts.append(
            f'<article id="seo-term-{tk}"><details class="gat-seo-card-acc"><summary style=""><span>{tv.get("tag","")} — {tv.get("title","")}</span><span class="gat-acc-plus">＋</span></summary>'
            f'<section class="gat-acc-body"><h3>{tv.get("title","")}</h3><p>{tv.get("body","")}</p><h4>{tv.get("badTitle","")}</h4><p>{clean_no_divs(tv.get("badText",""))}</p><h4>{tv.get("goodTitle","")}</h4><p>{clean_no_divs(tv.get("goodText",""))}</p></section></details></article>'
        )
    parts.append('</details></div>')
    return "\n".join(parts)

def apply_common_i18n(out, lang, d):
    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)
    out = re.sub(r'<section id="gat-3track-funnel-card"[\s\S]*?</section>', lambda _: build_static_funnel_html(lang, d), out, count=1)
    _, _, _, _, open_pg_lbl, _ = STAGE_UI_STATIC_I18N.get(lang, STAGE_UI_STATIC_I18N["en"])
    out = out.replace("<span>Open Page →</span>", f"<span>{open_pg_lbl}</span>")
    fp = d.get("_funnel_pre_ai", {})
    if fp:
        for n in (1, 2, 3):
            out = re.sub(rf'(<div id="gat-cat-hdr-{n}"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + f'<span>{fp.get(f"cat{n}","")}</span><span style="color:#4FC3F7;font-size:0.75rem;">{fp.get("freeTag","")}</span>' + m.group(2), out, count=1)
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
    return out

def make_og_tags(lang, safe_title, safe_desc, canon_url):
    og_loc = {"en":"en_US","he":"he_IL","fr":"fr_FR","es":"es_ES","de":"de_DE","ru":"ru_RU"}.get(lang, "en_US")
    return (
        f'  <meta property="og:type" content="website" />\n'
        f'  <meta property="og:locale" content="{og_loc}" />\n'
        f'  <meta property="og:site_name" content="Giyur Aliyah Track" />\n'
        f'  <meta property="og:title" content="{safe_title}" />\n'
        f'  <meta property="og:description" content="{safe_desc}" />\n'
        f'  <meta property="og:url" content="{canon_url}" />\n'
        f'  <meta property="og:image" content="https://giyuraliyahtrack.com/bg-watercolor.jpg" />\n'
        f'  <meta name="twitter:card" content="summary_large_image" />\n'
        f'  <meta name="twitter:title" content="{safe_title}" />\n'
        f'  <meta name="twitter:description" content="{safe_desc}" />'
    )

def render_page(lang, canon_url, spoke_cfg=None):
    d = dicts[lang]
    out = base_html
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    out = re.sub(r'<html lang="[^"]*"(?: dir="[^"]*")?>', f'<html lang="{lang}" dir="{"rtl" if lang=="he" else "ltr"}">', out, count=1)
    out = re.sub(r'<meta name="robots" content="[^"]*" />', f'<meta name="robots" content="{ROBOTS_META}" />', out, count=1)
    out = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{canon_url}" />', out, count=1)
    out = apply_common_i18n(out, lang, d)

    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    diy_t, diy_p = DIY_VS_LAWYERS_NBN_I18N[lang]
    j = d.get("_jurisdiction", {})
    j_line = f"<p><strong>{j.get('flag','')} {d.get('j_active','Jurisdiction:')} {j.get('name','')}:</strong> {j.get('police','')} | {j.get('birth','')} | {j.get('single','')} | {j.get('apostille','')}</p>" if j else ""

    if spoke_cfg is not None:
        obs_key = spoke_cfg["obs_idx"]
        t_key = spoke_cfg["term_key"]
        out = out.replace('id="app-nav-back" class="app-nav-back"', f'id="app-nav-back" href="{b_hub}" class="app-nav-back visible"')
        seo_title = spoke_cfg["seo_titles"].get(lang, spoke_cfg["seo_titles"]["en"])

        if obs_key in ("vault_bd_700", "vault_cp_300"):
            h1_txt, intro_txt, cta_txt, cta_href = VAULT_SPOKE_COPY[obs_key][lang]
            sample_list = BD_SAMPLE_CARDS if obs_key == "vault_bd_700" else CP_SAMPLE_CARDS
            qa_blocks = []
            faq_entities = []
            for item in sample_list:
                q_str = html.escape(item["q"].get(lang, item["q"]["en"]))
                body_str = html.escape(item["a"].get(lang, item["a"]["en"])) if "a" in item else html.escape(item["tip"].get(lang, item["tip"]["en"]))
                tip_extra = f'<p style="margin:6px 0 0 0;font-size:0.86rem;color:#0369a1;"><strong>💡 Tip:</strong> {html.escape(item["tip"].get(lang, item["tip"]["en"]))}</p>' if "a" in item else ""
                qa_blocks.append(
                    f'<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px 14px;margin-bottom:10px;">'
                    f'<h3 style="font-size:0.98rem;color:#082548;margin:0 0 6px 0;">#{item["id"]} • {html.escape(item.get("he",""))} — {q_str}</h3>'
                    f'<p style="margin:0;color:#334155;font-size:0.9rem;line-height:1.55;">{body_str}</p>{tip_extra}</div>'
                )
                if len(faq_entities) < 10:
                    faq_entities.append({"@type": "Question", "name": item["q"].get(lang, item["q"]["en"]), "acceptedAnswer": {"@type": "Answer", "text": (item.get("a") or item["tip"]).get(lang, (item.get("a") or item["tip"])["en"])}})
            art = (
                f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
                f'<h1>{html.escape(h1_txt)}</h1><p>{html.escape(intro_txt)}</p>'
                f'<div style="margin:16px 0;"><a class="btn-sky" style="background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);border:2px solid #4FC3F7;font-size:0.98rem;" href="{cta_href}">{html.escape(cta_txt)}</a></div>'
                f'{"".join(qa_blocks)}'
                f'<h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>{j_line}'
                f'{build_spoke_mesh_links(lang)}</article>'
            )
            out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
            out = out.replace('<div class="section-kicker">', art + '\n        <div class="section-kicker">', 1)
            out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
            out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
            safe_title = esc_attr(seo_title)
            safe_desc = make_meta_desc(f"{intro_txt} {st_p}")
            faq_obj = {"@context": "https://schema.org", "@graph": [
                {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": seo_title, "item": canon_url}]},
                {"@type": "FAQPage", "mainEntity": faq_entities}
            ]}
            faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
            out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
        else:
            ob = d.get("_terms", {}).get("dahan_truth") if obs_key == "dahan_truth" else (d.get("_obstacles", [])[obs_key] if isinstance(obs_key, int) and obs_key < len(d.get("_obstacles", [])) else None)
            tm = d.get("_terms", {}).get(t_key, {})
            lead_term = bool(spoke_cfg.get("lead_from_term")) and bool(tm)
            primary = tm if lead_term else ob
            secondary = ob if (lead_term and obs_key != "dahan_truth") else (tm if obs_key != "dahan_truth" else None)
            if primary:
                lead_h1 = primary.get("title", seo_title)
                sec_html = ""
                if secondary and secondary.get("title") != primary.get("title"):
                    sec_html = (
                        f"<hr style='margin:16px 0;border:none;border-top:1px solid #e2e8f0;'/>"
                        f"<h2>{secondary.get('tag','')} — {secondary.get('title','')}</h2><p>{secondary.get('body','')}</p>"
                        f"<h3>{secondary.get('badTitle','')}</h3><div>{clean_no_divs(secondary.get('badText',''))}</div>"
                        f"<h3>{secondary.get('goodTitle','')}</h3><div>{clean_no_divs(secondary.get('goodText',''))}</div>"
                    )
                art = (
                    f'<article class="seo-spoke-article"><h1>{lead_h1}</h1>'
                    f'<h2>{primary.get("tag","")} — {primary.get("title","")}</h2><p>{primary.get("body","")}</p>'
                    f'<h3>{primary.get("badTitle","")}</h3><div>{clean_no_divs(primary.get("badText",""))}</div>'
                    f'<h3>{primary.get("goodTitle","")}</h3><div>{clean_no_divs(primary.get("goodText",""))}</div>'
                    f'{sec_html}'
                    f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
                    f'<h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>{j_line}'
                    f'{build_spoke_mesh_links(lang)}</article>'
                )
                out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
                out = out.replace('<div class="section-kicker">', art + '\n        <div class="section-kicker">', 1)
                out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
                out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
                if obs_key == "dahan_truth":
                    out = re.sub(r'<a class="enemy-card" id="dahan-gold-card"[\s\S]*?</a>', '', out, count=1)
                safe_title = esc_attr(seo_title)
                safe_desc = make_meta_desc(f"{primary.get('body','')} {st_p}")
                clean_bad = re.sub(r"<[^>]+>", " ", primary.get("badText", "")).strip()
                clean_good = re.sub(r"<[^>]+>", " ", primary.get("goodText", "")).strip()
                faq_entities = [
                    {"@type": "Question", "name": lead_h1, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", primary.get("body", "")).strip()}},
                    {"@type": "Question", "name": primary.get("badTitle", ""), "acceptedAnswer": {"@type": "Answer", "text": clean_bad}},
                    {"@type": "Question", "name": primary.get("goodTitle", ""), "acceptedAnswer": {"@type": "Answer", "text": f"{clean_good} ({primary.get('time','')})"}},
                    {"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}
                ]
                if secondary and secondary.get("title"):
                    faq_entities.append({"@type": "Question", "name": secondary.get("title", ""), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", secondary.get("body", "") + " " + secondary.get("goodText", "")).strip()[:600]}})
                faq_obj = {"@context": "https://schema.org", "@graph": [
                    {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": seo_title, "item": canon_url}]},
                    {"@type": "FAQPage", "mainEntity": faq_entities}
                ]}
                faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
                out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
            else:
                safe_title = esc_attr(seo_title)
                safe_desc = make_meta_desc(st_p)
    else:
        safe_title = esc_attr(HUB_SEO_TITLES[lang])
        safe_desc = make_meta_desc(f"{d.get('hero_p','')} {st_p}")
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

    out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{safe_title}</title>", out, count=1)
    out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{safe_desc}" />', out, count=1)
    og_tags = make_og_tags(lang, safe_title, safe_desc, canon_url)
    out = out.replace("</head>", f"{og_tags}\n  {make_hreflang(spoke_cfg)}\n  {DOMAIN_SHIELD}\n</head>", 1)
    out = out.replace("</body>", f'<noscript><img src="/api/auditDoc?mode=pixel&lang={lang}&path={canon_url.replace("https://giyuraliyahtrack.com", "")}" width="1" height="1" alt="" /></noscript>\n</body>', 1)

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
    open(f"{hub_dir}/index.html", "w", encoding="utf-8").write(render_page(l, get_localized_url(l, None), None))
    for s in SPOKES:
        loc_slug = s["l_slugs"].get(l, s["slug"])
        loc_dir = f"public/{loc_slug}" if l == "en" else f"public/{l}/{loc_slug}"
        os.makedirs(loc_dir, exist_ok=True)
        open(f"{loc_dir}/index.html", "w", encoding="utf-8").write(render_page(l, get_localized_url(l, s), s))

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
        "seo_titles": {
            "en": "Form Ash/1 (טופס אש/1): Visa & Va'adat Charigim Auto-Filler",
            "he": "טופס אש/1 להורדה ומילוי בעברית — אשרת כניסה ווועדת חריגים",
            "fr": "Formulaire Ash/1 (טופס אש/1) en Hébreu — Va'adat Charigim",
            "es": "Formulario Ash/1 (טופס אש/1) en Hebreo — Va'adat Jariguim",
            "de": "Formular Ash/1 (טופס אש/1) auf Hebräisch — Va'adat Charigim",
            "ru": "Анкета Аш/1 (טופס אש/1) на иврите — Ваадат Харигим и виза"
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
            "en": "Misrad HaPanim and Va'adat Charigim reject Form Ash/1 if filled out in English or submitted without a statutory Hebrew Explanation Letter (Michtav Hesber), all 5 Apostilled Homeland Documents under 180 days old, and signed Israeli Sponsoring Rabbi and Host Family letters with ID numbers.",
            "he": "משרד הפנים ווועדת החריגים דוחים על הסף את טופס אש/1 אם אינו מוגש בעברית תקנית בצירוף מכתב הסבר מנומק, 5 מסמכי מקור מאומתים באפוסטיל בתוקף של פחות מ-180 יום, ומכתבי המלצה מרב מלווה ומשפחה מארחת עם מספרי תעודת זהות.",
            "fr": "Le Misrad HaPanim et la Va'adat Charigim rejettent le formulaire Ash/1 s'il est rempli en français/anglais ou déposé sans lettre explicative légale en hébreu (Michtav Hesber), vos 5 documents apostillés de moins de 180 jours et les lettres du rabbin accompagnateur.",
            "es": "Misrad HaPanim y Va'adat Jariguim rechazan el Formulario Ash/1 si se rellena en español/inglés o sin una carta legal en hebreo (Mijtav Hesber), los 5 documentos apostillados (<180 días) y cartas firmadas por su rabino patrocinador en Israel.",
            "de": "Misrad HaPanim und die Va'adat Charigim lehnen Formular Ash/1 ab, wenn es auf Deutsch/Englisch ausgefüllt wird oder ohne hebräisches Erklärungsschreiben (Michtav Hesber), alle 5 Apostille-Dokumente (<180 Tage) sowie Empfehlungsbriefe eingereicht wird.",
            "ru": "МВД Израиля и комиссия Ваадат Харигим отклоняют анкету Аш/1, если она заполнена латиницей/по-русски или подана без официального письма-объяснения на иврите (Михтав Эсбер), 5 документов с апостилем (<180 дней) и писем от израильского раввина."
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
        "seo_titles": {
            "en": "Form Ash/3 (טופס אש/3): B/2 Visa Extension & Status Change",
            "he": "טופס אש/3 להורדה ומילוי אוטומטי — הארכת אשרת שהייה B/2",
            "fr": "Formulaire Ash/3 (טופס אש/3) — Prolongation Visa B/2 Israël",
            "es": "Formulario Ash/3 (טופס אש/3) — Prórroga de Visa B/2 Israel",
            "de": "Formular Ash/3 (טופס אש/3) — B/2-Visumverlängerung Israel",
            "ru": "Анкета Аш/3 (טופס אש/3) — Продление визы B/2 и смена статуса"
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
        "seo_titles": {
            "en": "Form Ash/6 (טופס אש/6): Spousal Visa Dossier (Nohal 5.2.0008)",
            "he": "טופס אש/6 להורדה ומילוי אוטומטי — הליך מדורג (נוהל 5.2.0008)",
            "fr": "Formulaire Ash/6 (טופס אש/6) — Visa Conjoint Nohal 5.2.0008",
            "es": "Formulario Ash/6 (טופס אש/6) — Visa Conyugal Nohal 5.2.0008",
            "de": "Formular Ash/6 (טופס אש/6) — Ehepartner-Visum Nohal 5.2.0008",
            "ru": "Анкета Аш/6 (טופס אש/6) — Виза супругов СТУПРО (5.2.0008)"
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
            "en": "Under July 2026 Nohal 5.2.0008 (Ed. 16), clerks cross-examine every date on Pages 1–6 against your 300-Question Separated-Room Interview. Includes the Page 5 Landlord/Lease Affidavit, Sec. ד.2.ה Marriage Certificate exemption, and Sec. ג.10 Dual-Track protection.",
            "he": "לפי נוהל 5.2.0008 (מהדורה 16, יולי 2026), פקידי משרד הפנים מצליבים כל תאריך בעמודים 1–6 מול שימוע 300 השאלות בחדרים נפרדים. כולל תצהיר שכר דירה בעמוד 5, פטור סעיף ד.2.ה מתעודת רווקות נפרדת, והגנת סעיף ג.10 להליך כפול.",
            "fr": "Selon la procédure Nohal 5.2.0008 (Éd. 16, juillet 2026), les agents vérifient chaque date des pages 1 à 6 lors de l'interrogatoire des 300 questions en salles séparées. Inclut l'attestation de bail (page 5) et la protection double parcours (art. ג.10).",
            "es": "Según el procedimiento Nohal 5.2.0008 (Ed. 16, julio 2026), los funcionarios cruzan cada fecha de las páginas 1–6 con el interrogatorio de 300 preguntas en salas separadas. Incluye la declaración de alquiler (pág. 5) y la protección de doble vía (art. ג.10).",
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
        "seo_titles": {
            "en": "Form Ash/456 (טופס אש/456): In-Israel Aliyah / Shinui Ma'amad",
            "he": "טופס אש/456 להורדה ומילוי — שינוי מעמד לעולה מתוך ישראל",
            "fr": "Formulaire Ash/456 (טופס אש/456) — Aliyah en Israël (5.2.0001)",
            "es": "Formulario Ash/456 (טופס אש/456) — Aliyá en Israel (5.2.0001)",
            "de": "Formular Ash/456 (טופס אש/456) — Inlands-Alija Shinui Ma'amad",
            "ru": "Анкета Аш/456 (טופס אש/456) — Репатриация внутри Израиля"
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
        "seo_titles": {
            "en": "Form MR/14a (טופס מר/14א): First Biometric Teudat Zehut",
            "he": "טופס מר/14א להורדה ומילוי — בקשה לתעודת זהות ביומטרית ראשונה",
            "fr": "Formulaire MR/14a (טופס מר/14א) — Première Teudat Zehut",
            "es": "Formulario MR/14a (טופס מר/14א) — Primera Teudat Zehut",
            "de": "Formular MR/14a (טופס מר/14א) — Erste Biometrische Teudat Zehut",
            "ru": "Анкета МР/14а (טופס מר/14א) — Первый биометрический Теудат-Зеут"
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
        "seo_titles": {
            "en": "Form MR/14b (טופס מר/14ב): First Israeli Passport / Darkon",
            "he": "טופס מר/14ב להורדה ומילוי — בקשה לדרכון ישראלי או תעודת מעבר",
            "fr": "Formulaire MR/14b (טופס מר/14ב) — Premier Passeport Darkon",
            "es": "Formulario MR/14b (טופס מר/14ב) — Primer Pasaporte Darkon",
            "de": "Formular MR/14b (טופס מר/14ב) — Erster Israelischer Darkon",
            "ru": "Анкета МР/14б (טופס מר/14ב) — Первый Даркон и Теудат-Маавар"
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
        "seo_titles": {
            "en": "Nespach Alef (נספח א׳): Common-Law Affidavit (Nohal 5.2.0009)",
            "he": "נספח א׳ (נוהל 5.2.0009) — תצהיר ידועים בציבור למשרד הפנים",
            "fr": "Nespach Alef (נספח א׳) — Déclaration Concubinage 5.2.0009",
            "es": "Nespaj Alef (נספח א׳) — Declaración Parejas de Hecho 5.2.0009",
            "de": "Nespach Alef (נספח א׳) — Lebenspartner-Eid Nohal 5.2.0009",
            "ru": "Неспах Алеф (נספח א׳) — Декларация Ядуим бе-Цибур (5.2.0009)"
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
        "seo_titles": {
            "en": "Nativ 11-Page Hebrew Questionnaire (שאלון נתיב) Auto-Filler",
            "he": "שאלון נתיב (11 עמודים) להורדה ומילוי אוטומטי לעלייה",
            "fr": "Questionnaire Nativ (11 Pages en Hébreu) — Aliyah Israël",
            "es": "Cuestionario Nativ (11 Páginas en Hebreo) — Aliyá Israel",
            "de": "Nativ-Fragebogen (11 Seiten Hebräisch) — Alija Israel",
            "ru": "Анкета Натив (11 страниц на иврите) — Репатриация в Израиль"
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

FORM_DEEP_SECTIONS_I18N = {
    "en": (
        "📋 Complete Section-by-Section Hebrew Filing Protocol & Mandatory Attachments",
        "<ul><li><strong>1. Why Misrad HaPanim Rejects Hand-Written English Forms at the Window:</strong> Under official Population and Immigration Authority (PIBA) directives, all statutory forms (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, and Nativ's 11-page questionnaire) must be completed in clear Clerk Hebrew matching your foreign passport and Apostilled or Consular-Chain legalized civil documents.</li><li><strong>2. Royal-Blue Ink & Clerk-Only Signature Boxes:</strong> Our PDF stamper populates every Hebrew field in crisp royal-blue ink, automatically inflects Hebrew gender grammar, generates your matching statutory Hebrew Cover Letter (Michtav Hesber), and leaves clerk-witnessed signature boxes blank until you stand before the PIBA officer or Israeli lawyer.</li></ul>"
    ),
    "he": (
        "📋 פרוטוקול מילוי סעיף-אחר-סעיף בעברית ורשימת מסמכי החובה לצירוף",
        "<ul><li><strong>1. מדוע פקידי משרד הפנים פוסלים טפסים שמולאו באנגלית או בכתב יד לא קריא:</strong> לפי נהלי רשות האוכלוסין וההגירה (PIBA), כל הטפסים הרשמיים (אש/1, אש/3, אש/6, אש/456, מר/14א, מר/14ב, נספח א׳ ושאלון נתיב בן 11 העמודים) חייבים להיות ממולאים בעברית תקנית התואמת במדויק לדרכון ולתעודות המאומתות באפוסטיל או בשרשרת קונסולרית.</li><li><strong>2. דיו כחול תקני ומשבצות חתימה בפני פקיד/עו״ד:</strong> המערכת מטביעה את כל השדות בעברית בדיו כחול חד עם התאמת מגדר אוטומטית, מפיקה מכתב הסבר תואם בעברית, ומשאירה ריקות משבצות שיש לחתום עליהן רק בפני הפקיד או עורך הדין.</li></ul>"
    ),
    "fr": (
        "📋 Protocole Complet de Remplissage en Hébreu & Pièces Justificatives Obligatoires",
        "<ul><li><strong>1. Pourquoi le Misrad HaPanim rejette les formulaires remplis en français ou en anglais :</strong> Selon les directives officielles de la PIBA, tous les formulaires statutaires (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef et Nativ 11 pages) doivent être rédigés en hébreu administratif conforme à votre passeport et vos actes apostillés ou légalisés par voie consulaire.</li><li><strong>2. Encre Bleue Réglementaire & Cases Réservées :</strong> Notre moteur remplit chaque champ en hébreu à l'encre bleue, génère votre Michtav Hesber en hébreu et préserve les zones de signature devant l'agent ou l'avocat.</li></ul>"
    ),
    "es": (
        "📋 Protocolo Completo de Rellenado en Hebreo y Documentos Obligatorios Adjuntos",
        "<ul><li><strong>1. Por qué Misrad HaPanim rechaza formularios rellenados en español o inglés:</strong> Según las directivas oficiales de la PIBA, todos los formularios oficiales (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespaj Alef y Nativ de 11 páginas) deben presentarse en hebreo administrativo exacto acorde a su pasaporte y documentos con Apostilla o cadena consular.</li><li><strong>2. Tinta Azul Oficial y Casillas ante Funcionario:</strong> Nuestro motor estampa cada campo en hebreo con inflexión de género, genera su Mijtav Hesber y respeta las casillas que solo se firman frente al funcionario o abogado.</li></ul>"
    ),
    "de": (
        "📋 Komplettes Ausfüllprotokoll auf Hebräisch & Pflichtanlagen zum Dossier",
        "<ul><li><strong>1. Warum Misrad HaPanim auf Deutsch oder Englisch ausgefüllte Formulare ablehnt:</strong> Gemäß den offiziellen PIBA-Richtlinien müssen sämtliche Antragsformulare (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef & 11-Seiten-Nativ-Bogen) in korrektem Amtshebräisch passend zu Reisepass und Apostille-/Konsulardokumenten eingereicht werden.</li><li><strong>2. Königblaue Tinte & Schalter-Unterschriftsfelder:</strong> Unsere Engine füllt alle Felder auf Hebräisch aus, erstellt Ihr Michtav Hesber und lässt Schalter-Unterschriftsfelder frei bis zum Termin.</li></ul>"
    ),
    "ru": (
        "📋 Полный протокол заполнения анкеты на иврите и обязательный список документов",
        "<ul><li><strong>1. Почему МВД Израиля (PIBA) отказывает при подаче анкет на русском или английском языке:</strong> По регламентам Управления народонаселения и иммиграции все государственные бланки (Аш/1, Аш/3, Аш/6, Аш/456, МР/14а, МР/14б, Неспах Алеф и 11-страничная анкета Натив) заполняются строго на канцелярском иврите в точном соответствии с паспортом и апостилированными/консульскими документами.</li><li><strong>2. Синие чернила и графы подписи перед инспектором:</strong> Наш генератор заполняет поля на иврите с учётом рода, формирует Михтав Эсбер и оставляет пустыми поля, подписываемые лично перед чиновником или адвокатом.</li></ul>"
    )
}

FORMS_HUB_SEO_TITLES = {
    "en": "8 Official Misrad HaPanim (PIBA) & Nativ Hebrew Forms Vault",
    "he": "מאגר 8 טפסי משרד הפנים ונתיב להורדה ומילוי אוטומטי בעברית",
    "fr": "Les 8 Formulaires Officiels Misrad HaPanim (PIBA) & Nativ",
    "es": "Los 8 Formularios Oficiales de Misrad HaPanim (PIBA) y Nativ",
    "de": "Alle 8 Offiziellen Misrad HaPanim (PIBA) & Nativ Formulare",
    "ru": "Все 8 официальных анкет МВД Израиля (PIBA) и Натив на иврите"
}

FORMS_HUB_H1 = {
    "en": "Official Misrad HaPanim (PIBA) & Nativ Hebrew Forms Vault — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b & Nespach Alef",
    "he": "מאגר טפסי משרד הפנים (רשות האוכלוסין) ונתיב להורדה ומילוי אוטומטי — אש/1, אש/3, אש/6, אש/456, מר/14א, מר/14ב ונספח א׳",
    "fr": "Portail des 8 Formulaires Officiels Misrad HaPanim (PIBA) & Nativ en Hébreu — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "es": "Bóveda de los 8 Formularios Oficiales de Misrad HaPanim (PIBA) y Nativ en Hebreo — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "de": "Alle 8 offiziellen Misrad HaPanim (PIBA) & Nativ Formulare auf Hebräisch — Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b",
    "ru": "База всех 8 официальных анкет МВД Израиля (PIBA) и Натив на иврите — Аш/1, Аш/3, Аш/6, Аш/456, МР/14а, МР/14б и Неспах Алеф"
}

def get_form_url(lang, f_cfg):
    loc_slug = f_cfg["l_slugs"].get(lang, f_cfg["short_slug"])
    return f"https://giyuraliyahtrack.com/forms/{loc_slug}/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/forms/{loc_slug}/"

def get_forms_hub_url(lang):
    return "https://giyuraliyahtrack.com/forms/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/forms/"

def render_form_landing_page(lang, f_cfg, is_hub=False):
    d = dicts[lang]
    f_key = f_cfg["key"]
    canon_url = get_forms_hub_url(lang) if is_hub else get_form_url(lang, f_cfg)
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    h1_str = FORMS_HUB_H1[lang] if is_hub else f_cfg["titles"].get(lang, f_cfg["titles"]["en"])
    seo_title_str = FORMS_HUB_SEO_TITLES[lang] if is_hub else f_cfg["seo_titles"].get(lang, f_cfg["seo_titles"]["en"])
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
    out = apply_common_i18n(out, lang, d)

    links_html = "".join([
        f'<a class="seo-mesh-link" href="{"/forms/" + fc["l_slugs"][lang] + "/" if lang == "en" else "/" + lang + "/forms/" + fc["l_slugs"][lang] + "/"}">📄 {fc["code"]} — {fc["titles"][lang]}</a>'
        for fc in FORM_CATALOG
    ])

    badge_code = "8 PIBA & NATIV FORMS" if is_hub else f_cfg["code"]
    cta_target = f"/app/?mod=hebrew-engine&lang={lang}" if is_hub else f"/app/?mod=hebrew-engine&form={f_key}&lang={lang}"
    raw_btn_html = "" if is_hub else f'<a class="btn-outline-card" style="padding:12px 16px;font-size:0.88rem;font-weight:800;margin-top:0;" href="{f_cfg["raw_pdf"]}" target="_blank" rel="noopener">{dl_lbl}</a>'

    art_html = (
        f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
        f'<div style="display:inline-block;background:#e0f2fe;color:#0284c7;font-size:0.76rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">{STAGE_UI_STATIC_I18N.get(lang, STAGE_UI_STATIC_I18N["en"])[5]} • {badge_code}</div>'
        f'<h1>{h1_str}</h1>'
        f'<div style="margin:14px 0;"><h3 style="margin-bottom:8px;">{mesh_hdr}</h3><div class="seo-mesh-grid">{links_html}</div></div>'
        f'<h4>{trap_hdr}</h4><p>{trap_str}</p>'
        f'<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;">'
        f'<a class="btn-sky" style="background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);border:2px solid #4FC3F7;font-size:0.98rem;" href="{cta_target}">{cta_lbl} →</a>'
        f'{raw_btn_html}</div>'
        f'<h2>{deep_hdr}</h2><div>{deep_body}</div>'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'<h2>{sp_deep.get("title","")}</h2><p>{sp_deep.get("body","")}</p>'
        f'<h4>{sp_deep.get("badTitle","")}</h4><div>{clean_no_divs(sp_deep.get("badText",""))}</div>'
        f'<h4>{sp_deep.get("goodTitle","")}</h4><div>{clean_no_divs(sp_deep.get("goodText",""))}</div>'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'<h3>{st_t}</h3><p>{st_p}</p>'
        f'<h3>{DIY_VS_LAWYERS_NBN_I18N[lang][0]}</h3><p>{DIY_VS_LAWYERS_NBN_I18N[lang][1]}</p>{j_line}'
        f'{build_spoke_mesh_links(lang)}</article>'
    )

    out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
    out = out.replace('<div class="section-kicker">', art_html + '\n        <div class="section-kicker">', 1)
    out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
    out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)

    safe_title = esc_attr(seo_title_str)
    safe_desc = make_meta_desc(f"{h1_str}. {trap_str}")
    out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{safe_title}</title>", out, count=1)
    out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{safe_desc}" />', out, count=1)

    faq_entities = [
        {"@type": "Question", "name": h1_str, "acceptedAnswer": {"@type": "Answer", "text": trap_str}},
        {"@type": "Question", "name": deep_hdr, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", deep_body).strip()[:700]}},
        {"@type": "Question", "name": sp_deep.get("title", st_t), "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", sp_deep.get("badText", "") + " " + sp_deep.get("goodText", "")).strip()[:700]}},
        {"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}
    ]
    bc_items = [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}]
    if is_hub:
        bc_items.append({"@type": "ListItem", "position": 2, "name": seo_title_str, "item": canon_url})
    else:
        bc_items.append({"@type": "ListItem", "position": 2, "name": FORMS_HUB_SEO_TITLES[lang], "item": get_forms_hub_url(lang)})
        bc_items.append({"@type": "ListItem", "position": 3, "name": seo_title_str, "item": canon_url})

    faq_obj = {"@context": "https://schema.org", "@graph": [
        {"@type": "BreadcrumbList", "itemListElement": bc_items},
        {"@type": "FAQPage", "mainEntity": faq_entities}
    ]}
    faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
    out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":"https://schema\.org","@type":"FAQPage"[\s\S]*?</script>', lambda _: faq_tag, out, count=1)

    if is_hub:
        hreflang_tags = [f'<link rel="alternate" hreflang="x-default" href="{get_forms_hub_url("en")}" />'] + [
            f'<link rel="alternate" hreflang="{lc}" href="{get_forms_hub_url(lc)}" />' for lc in LANGS
        ]
    else:
        hreflang_tags = [f'<link rel="alternate" hreflang="x-default" href="{get_form_url("en", f_cfg)}" />'] + [
            f'<link rel="alternate" hreflang="{lc}" href="{get_form_url(lc, f_cfg)}" />' for lc in LANGS
        ]
    og_tags = make_og_tags(lang, safe_title, safe_desc, canon_url)
    out = out.replace("</head>", f"{og_tags}\n  " + "\n  ".join(hreflang_tags) + f"\n  {DOMAIN_SHIELD}\n</head>", 1)
    out = out.replace("</body>", f'<noscript><img src="/api/auditDoc?mode=pixel&lang={lang}&path={canon_url.replace("https://giyuraliyahtrack.com", "")}" width="1" height="1" alt="" /></noscript>\n</body>', 1)
    return out

for f_cfg in FORM_CATALOG:
    for l in LANGS:
        loc_slug = f_cfg["l_slugs"][l]
        loc_dir = f"public/forms/{loc_slug}" if l == "en" else f"public/{l}/forms/{loc_slug}"
        os.makedirs(loc_dir, exist_ok=True)
        open(f"{loc_dir}/index.html", "w", encoding="utf-8").write(render_form_landing_page(l, f_cfg, is_hub=False))

for l in LANGS:
    fh_dir = "public/forms" if l == "en" else f"public/{l}/forms"
    os.makedirs(fh_dir, exist_ok=True)
    open(f"{fh_dir}/index.html", "w", encoding="utf-8").write(render_form_landing_page(l, FORM_CATALOG[2], is_hub=True))

# Sync ROBOTS_META + concise SEO <title> on Pricing, Concierge & Concierge-Booking pages
PRICING_TITLES = {
    "en": "Pricing & 23 Modular Passes — Giyur, Spousal Visa & Aliyah",
    "he": "מחירון ו-23 חבילות מודולריות — גיור, הליך מדורג ועלייה",
    "fr": "Tarifs & 23 Pass Modulaires — Conversion, Visa Conjoint & Aliyah",
    "es": "Precios y 23 Pases Modulares — Conversión, Visa Pareja y Aliyá",
    "de": "Preise & 23 Modulare Pässe — Giur, Partner-Visum & Alija",
    "ru": "Тарифы и 23 модульных пакета — Гиюр, СТУПРО и Репатриация"
}
BOOKING_TITLES = {
    "en": "Book Vetted Israeli Lawyer, Notary or Sponsoring Rabbi",
    "he": "תיאום עורך דין, נוטריון או רב מלווה מוכר | Giyur Aliyah Track",
    "fr": "Réserver un Avocat, Notaire ou Rabbin Agréé en Israël",
    "es": "Reservar Abogado, Notario o Rabino Patrocinador en Israel",
    "de": "Geprüften Anwalt, Notar oder Rabbiner in Israel buchen",
    "ru": "Запись к проверенному адвокату, нотариусу или раввину"
}

for l in LANGS:
    for sub, t_map in [("pricing", PRICING_TITLES), ("concierge-booking", BOOKING_TITLES)]:
        p_path = f"public/{sub}/index.html" if l == "en" else f"public/{l}/{sub}/index.html"
        if os.path.exists(p_path):
            ph = open(p_path, encoding="utf-8").read()
            ph = re.sub(r'<meta name="robots" content="[^"]*"\s*/?>', f'<meta name="robots" content="{ROBOTS_META}" />', ph, count=1)
            ph = re.sub(r"<title>[\s\S]*?</title>", f"<title>{esc_attr(t_map[l])}</title>", ph, count=1)
            open(p_path, "w", encoding="utf-8").write(ph)

if os.path.exists("public/concierge/index.html"):
    ch = open("public/concierge/index.html", encoding="utf-8").read()
    ch = re.sub(r'<meta name="robots" content="[^"]*"\s*/?>', f'<meta name="robots" content="{ROBOTS_META}" />', ch, count=1)
    open("public/concierge/index.html", "w", encoding="utf-8").write(ch)

# Build complete sitemap.xml (Hubs + 14 Spokes + Forms Hubs + 8 Forms + Pricing + Concierge-Booking = 26 x 6 = 156 URLs)
open("public/robots.txt", "w", encoding="utf-8").write(
    "User-agent: *\n" + ("Allow: /\n" if LIVE_SEO else "Disallow: /\n") + "Sitemap: https://giyuraliyahtrack.com/sitemap.xml\n"
)

def add_sitemap_cluster(sm_list, url_fn):
    for l in LANGS:
        loc = url_fn(l)
        sm_list.append(f"  <url>\n    <loc>{loc}</loc>")
        sm_list.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{url_fn("en")}"/>')
        for alt in LANGS:
            sm_list.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{url_fn(alt)}"/>')
        sm_list.append("  </url>")

sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
for sp_cfg in [None] + SPOKES:
    add_sitemap_cluster(sm, lambda lc, sc=sp_cfg: get_localized_url(lc, sc))
add_sitemap_cluster(sm, get_forms_hub_url)
for f_cfg in FORM_CATALOG:
    add_sitemap_cluster(sm, lambda lc, fc=f_cfg: get_form_url(lc, fc))
add_sitemap_cluster(sm, lambda lc: "https://giyuraliyahtrack.com/pricing/" if lc == "en" else f"https://giyuraliyahtrack.com/{lc}/pricing/")
add_sitemap_cluster(sm, lambda lc: "https://giyuraliyahtrack.com/concierge-booking/" if lc == "en" else f"https://giyuraliyahtrack.com/{lc}/concierge-booking/")
sm.append("</urlset>\n")
open("public/sitemap.xml", "w", encoding="utf-8").write("\n".join(sm))
print(f"✅ Rebuilt all 6-Language Hubs, 84 Spoke Pages (incl. 700 BD & 300 CP Vault Pillars), 54 Form Pages & 156 Sitemap URLs (LIVE_SEO = {LIVE_SEO})!")
