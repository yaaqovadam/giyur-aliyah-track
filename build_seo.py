import html, json, os, re

LIVE_SEO = True
ROBOTS_META = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" if LIVE_SEO else "noindex, nofollow"
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
            "fr": "Aliyah Urgence : Apostille & Shinui Ma’amad en Israël",
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
    }    ,
    {
        "slug": "how-to-make-aliyah-and-giyur-israel-without-lawyers",
        "obs_idx": 0, "term_key": "broad_aliyah_guide", "lead_from_term": True,
        "l_slugs": {
            "en": "how-to-make-aliyah-and-giyur-israel-without-lawyers",
            "he": "eich-laasot-aliyah-giyur-halich-medurag-bli-orech-din",
            "fr": "comment-faire-aliyah-conversion-giyur-israel-sans-avocat",
            "es": "como-hacer-aliya-conversion-israel-sin-abogados-guia",
            "de": "alija-giur-partner-visum-israel-ohne-anwalt-leitfaden",
            "ru": "kak-sdelat-aliyu-giyur-stupro-v-izraile-bez-advokatov"
        },
        "seo_titles": {
            "en": "How to Make Aliyah & Convert in Israel Without Lawyers (2026)",
            "he": "איך לעשות עלייה, גיור או הליך מדורג בלי עורך דין יקר (2026)",
            "fr": "Comment Faire son Aliyah & Giyur en Israël Sans Avocat (2026)",
            "es": "Cómo Hacer Aliyá y Conversión en Israel Sin Abogados (2026)",
            "de": "Alija, Giur & Partner-Visum in Israel ohne teuren Anwalt (2026)",
            "ru": "Как сделать Алию, Гиюр и СТУПРО в Израиле без адвокатов (2026)"
        }
    },
    {
        "slug": "aliyah-benefits-sal-klita-24-month-rule-cost-calculator",
        "obs_idx": 4, "term_key": "broad_benefits_guide", "lead_from_term": True,
        "l_slugs": {
            "en": "aliyah-benefits-sal-klita-24-month-rule-cost-calculator",
            "he": "zchuyot-olim-sal-klita-malkodet-24-chodashim-aluyot",
            "fr": "droits-aliyah-sal-klita-piege-24-mois-calculateur-couts",
            "es": "beneficios-aliya-sal-klita-regla-24-meses-costos-reales",
            "de": "alija-vorteile-sal-klita-24-monate-falle-kosten-rechner",
            "ru": "lgoty-alii-sal-klita-lovushka-24-mesyacev-realnye-rashody"
        },
        "seo_titles": {
            "en": "Aliyah Benefits, Sal Klita 24-Month Rule & Real Costs (2026)",
            "he": "זכויות עולים, סל קליטה (מלכודת 24 החודשים) ועלויות אמת (2026)",
            "fr": "Droits Aliyah, Sal Klita (Piège des 24 Mois) & Coûts Réels",
            "es": "Beneficios Aliyá, Sal Klita (Regla 24 Meses) y Costos (2026)",
            "de": "Alija-Vorteile, Sal Klita (24-Monate-Falle) & Echte Kosten",
            "ru": "Льготы Алии, Саль Клита (ловушка 24 месяцев) и реальные расходы"
        }
    }    ,
    {
        "slug": "how-to-convert-to-judaism-in-israel-giyur-guide",
        "obs_idx": 3, "term_key": "broad_giyur_guide", "lead_from_term": True,
        "l_slugs": {
            "en": "how-to-convert-to-judaism-in-israel-giyur-guide",
            "he": "eich-laavor-giyur-beisrael-mamlachti-prati-rabbanut",
            "fr": "comment-se-convertir-au-judaisme-en-israel-giyur-guide",
            "es": "como-convertirse-al-judaismo-en-israel-guiur-guia",
            "de": "konversion-zum-judentum-in-israel-giur-leitfaden",
            "ru": "kak-projti-giyur-v-izraile-gosudarstvennyj-chastnyj-gid"
        },
        "seo_titles": {
            "en": "How to Convert to Judaism in Israel (Giyur): 2026 Full Guide",
            "he": "איך לעבור גיור בישראל (ממלכתי, פרטי ורבנות) — מדריך מלא 2026",
            "fr": "Comment se Convertir au Judaïsme en Israël (Giyur) — Guide 2026",
            "es": "Cómo Convertirse al Judaísmo en Israel (Guiur) — Guía 2026",
            "de": "Konversion zum Judentum in Israel (Giur) — Vollständiger Guide",
            "ru": "Как пройти Гиюр в Израиле (государственный и частный) — Гид"
        }
    }    ,
    {
        "slug": "israel-unmarried-partner-visa-nohal-5-2-0009",
        "obs_idx": 6, "term_key": "unmarried_partner_5_2_0009", "lead_from_term": True,
        "l_slugs": {
            "en": "israel-unmarried-partner-visa-nohal-5-2-0009",
            "he": "halich-medurag-yeduim-betzibur-nohal-5-2-0009",
            "fr": "visa-concubinage-partenaire-non-marie-israel-5-2-0009",
            "es": "visa-pareja-de-hecho-no-casados-israel-nohal-5-2-0009",
            "de": "lebenspartner-visum-unverheiratete-paare-israel-5-2-0009",
            "ru": "stupro-bez-braka-yaduim-be-cibur-izrail-5-2-0009"
        },
        "seo_titles": {
            "en": "Israel Unmarried Partner Visa (Nohal 5.2.0009) & B/1 Guide",
            "he": "הליך מדורג לידועים בציבור (נוהל 5.2.0009) — אשרת B/1 ונספח א׳",
            "fr": "Visa Concubinage Israël (Nohal 5.2.0009) : B/1 & Nespach Alef",
            "es": "Visa Pareja de Hecho en Israel (Nohal 5.2.0009) y Permiso B/1",
            "de": "Lebenspartner-Visum Israel (Nohal 5.2.0009) & B/1-Arbeitsvisum",
            "ru": "СТУПРО без брака в Израиле (Ноаль 5.2.0009 — Ядуим бе-Цибур)"
        }
    },
    {
        "slug": "utah-zoom-online-marriage-israel-misrad-hapanim",
        "obs_idx": 6, "term_key": "utah_zoom_marriage_israel", "lead_from_term": True,
        "l_slugs": {
            "en": "utah-zoom-online-marriage-israel-misrad-hapanim",
            "he": "nisuei-utah-zoom-misrad-hapanim-rishum-halich-medurag",
            "fr": "mariage-civil-utah-zoom-en-ligne-israel-misrad-hapanim",
            "es": "matrimonio-civil-utah-zoom-online-israel-misrad-hapanim",
            "de": "utah-zoom-online-heirat-zivilehe-israel-misrad-hapanim",
            "ru": "onlajn-brak-yuta-zoom-izrail-registraciya-mvd-stupro"
        },
        "seo_titles": {
            "en": "Utah Zoom Civil Marriage in Israel: Misrad HaPanim & Ash/6",
            "he": "נישואי יוטה בזום במשרד הפנים (פסק דין בריל) והליך מדורג 2026",
            "fr": "Mariage Civil Utah par Zoom en Israël : Misrad HaPanim & Ash/6",
            "es": "Boda Civil Utah por Zoom en Israel: Registro Misrad HaPanim",
            "de": "Utah-Online-Heirat (Zoom) in Israel: Misrad HaPanim & Ash/6",
            "ru": "Онлайн-брак в штате Юта (Zoom) для МВД Израиля и СТУПРО 2026"
        }
    },
    {
        "slug": "proof-of-judaism-aliyah-nativ-rabbanut-birur-yahadut",
        "obs_idx": 1, "term_key": "proof_of_judaism_israel", "lead_from_term": True,
        "l_slugs": {
            "en": "proof-of-judaism-aliyah-nativ-rabbanut-birur-yahadut",
            "he": "hochachat-yahadut-aliyah-nativ-birur-yahadut-rabbanut",
            "fr": "preuve-de-judaisme-aliyah-nativ-consistoire-birur-yahadut",
            "es": "prueba-de-judaismo-aliya-nativ-rabinato-birur-yahadut",
            "de": "judentumsnachweis-alija-nativ-rabbinat-birur-jahadut",
            "ru": "podtverzhdenie-evrejstva-aliya-nativ-ravvinat-birur-yahadut"
        },
        "seo_titles": {
            "en": "Proof of Judaism for Aliyah (Nativ) & Rabbanut Birur Yahadut",
            "he": "הוכחת יהדות לעלייה (נתיב) מול בירור יהדות ברבנות — מדריך 2026",
            "fr": "Preuve de Judaïsme Aliyah (Nativ) & Birur Yahadut Rabbinat",
            "es": "Prueba de Judaísmo para Aliyá (Nativ) y Birur Yahadut Rabanut",
            "de": "Judentumsnachweis für Alija (Nativ) & Rabbinat Birur Jahadut",
            "ru": "Подтверждение еврейства: Натив (Алия) и Бирур Яхадут в Раввинате"
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
            "/app/?module=beit-din-150&lang=en"
        ),
        "he": (
            "🕍 700 שאלות אמיתיות מבית הדין לגיור, תשובות הלכתיות וטיפים למעמד הדיינים",
            "מתכוננים למעמד בית הדין הממלכתי לגיור או לבית דין אורתודוקסי מוכר? לפניכם טעימה מתוך מאגר 700 הכרטיסיות המלא שלנו — מחולק ל-200 שאלות ליבה בהלכה, 200 שאלות התקלה וכנות של דיינים, 150 שאלות לגברים (גרים) ו-150 שאלות לנשים (גיורות).",
            "⚡ לתרגול כל 700 שאלות בית הדין + 56 שירי שבת וברכות בקריוקי ←",
            "/app/?module=beit-din-150&lang=he"
        ),
        "fr": (
            "🕍 700 Vraies Questions du Beit Din en Israël, Réponses Halakhiques & Conseils",
            "Vous préparez votre audience finale devant le Beit Din d'État israélien ou Gush Etzion ? Découvrez ci-dessous un extrait authentique de nos 700 fiches vérifiées (200 Fondamentaux, 200 Questions Pièges & Sincérité, 150 Hommes et 150 Femmes).",
            "⚡ S'entraîner sur les 700 Questions Beit Din + 56 Chants & Brachot →",
            "/app/?module=beit-din-150&lang=fr"
        ),
        "es": (
            "🕍 700 Preguntas Reales del Beit Din en Israel, Respuestas Halájicas y Consejos",
            "¿Se prepara para su audiencia ante el Beit Din Estatal de Israel o Gush Etzion? Aquí tiene una muestra directa de nuestras 700 tarjetas verificadas (200 Fundamentales, 200 Casos Difíciles y Sinceridad, 150 Hombres y 150 Mujeres).",
            "⚡ Practicar las 700 Tarjetas del Beit Din + 56 Canciones y Brajot →",
            "/app/?module=beit-din-150&lang=es"
        ),
        "de": (
            "🕍 700 Echte Beit-Din-Fragen in Israel, Halachische Antworten & Richter-Tipps",
            "Bereiten Sie sich auf Ihren Termin vor dem staatlichen israelischen Beit Din oder Gush Etzion vor? Hier sehen Sie einen Auszug aus unseren 700 geprüften Lernkarten (200 Grundlagen, 200 Fang- & Aufrichtigkeitsfragen, 150 Männer, 150 Frauen).",
            "⚡ Alle 700 Beit-Din-Karten + 56 Schabbat-Lieder & Brachot üben →",
            "/app/?module=beit-din-150&lang=de"
        ),
        "ru": (
            "🕍 700 реальных вопросов Бейт-Дина в Израиле, галахические ответы и советы даянов",
            "Готовитесь к финальному заседанию Государственного раввинского суда по гиюру или бейт-дина Гуш-Эцион? Ниже представлена подборка из нашей проверенной базы в 700 карточек (200 базовых законов, 200 каверзных вопросов на искренность, 150 мужских и 150 женских вопросов).",
            "⚡ Тренировать все 700 карточек Бейт-Дина + 56 песен Шаббата и брахот →",
            "/app/?module=beit-din-150&lang=ru"
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
    "he": ("⚖️ טבלת אסמכתאות חוקיות ונהלי רשות האוכלוסין והרבנות הראשית (מהדורות 2026)", "נוהל 5.2.0008 (מהדורה 16, 20 ביולי 2026 — בני זוג נשואים, אוגדן טופס אש/6 עמ׳ 1–6, הגנת סעיף ג.10 למסלול כפול ושימוע 300 השאלות) • נוהל 5.2.0009 (מהדורה 17, 16 ביולי 2026 — ידועים בציבור, תצהיר נספח א׳ בן 13 סעיפים) • נוהל 5.2.0001 (עלייה מתוך ישראל / שינוי מעמד, טופס אש/456 וכלל 24 החודשים לסל קליטה) • נוהל 5.2.0004 (רישום תינוק שנולד בישראל בספח והוכחת 300 ימים) • אימות אפוסטיל ושרשרת קונסולרית למדינות שאינן חתומות על אמנת האג."),
    "fr": ("⚖️ Référentiel Statutaire Officiel PIBA / Misrad HaPanim & Grand Rabbinat (Éditions 2026)", "Procédure Nohal 5.2.0008 (Éd. 16, 20 juillet 2026 — Couples Mariés, Dossier Ash/6 p.1–6, Protection Double Parcours art. ג.10 & Entretien 300 Questions) • Nohal 5.2.0009 (Éd. 17, 16 juillet 2026 — Concubinage, Déclaration Nespach Alef 13 clauses) • Nohal 5.2.0001 (Aliyah en Israël / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Inscription Nouveau-Né Sefach & Preuve 300 Jours) • Apostille de La Haye & Légalisation Consulaire."),
    "es": ("⚖️ Tabla de Autoridad Legal Oficial PIBA / Misrad HaPanim y Gran Rabinato (Ediciones 2026)", "Procedimiento Nohal 5.2.0008 (Ed. 16, 20 de julio de 2026 — Cónyuges Casados, Dossier Ash/6 p.1–6, Protección Doble Vía art. ג.10 y Entrevista de 300 Preguntas) • Nohal 5.2.0009 (Ed. 17, 16 de julio de 2026 — Parejas de Hecho, Nespaj Alef 13 cláusulas) • Nohal 5.2.0001 (Aliyá en Israel / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Registro de Recién Nacido en Sefaj y Regla de 300 Días) • Apostilla de La Haya y Cadena Consular."),
    "de": ("⚖️ Offizielle Rechtsgrundlagen PIBA / Misrad HaPanim & Oberrabbinat (Ausgaben 2026)", "Verfahren Nohal 5.2.0008 (Ed. 16, 20. Juli 2026 — Verheiratete Paare, 6-Seiten-Dossier Ash/6, Doppel-Track Abs. ג.10 & 300-Fragen-Interview) • Nohal 5.2.0009 (Ed. 17, 16. Juli 2026 — Lebenspartner, Nespach Alef 13 Klauseln) • Nohal 5.2.0001 (Inlands-Alija / Shinui Ma'amad, Ash/456) • Nohal 5.2.0004 (Neugeborenen-Sefach & 300-Tage-Nachweis) • Haager Apostille & Konsularische Legalisation."),
    "ru": ("⚖️ Официальная правовая база МВД Израиля (PIBA) и Главного раввината (Редакции 2026 г.)", "Инструкция Ноаль 5.2.0008 (Ред. 16 от 20.07.2026 — Зарегистрированные супруги, анкета Аш/6 на 6 стр., двойной трек п. ג.10 и допрос из 300 вопросов) • Ноаль 5.2.0009 (Ред. 17 от 16.07.2026 — Гражданские партнёры, декларация Неспах Алеф из 13 пунктов) • Ноаль 5.2.0001 (Репатриация внутри Израиля / Шинуй Маамад, Аш/456) • Ноаль 5.2.0004 (Регистрация ребёнка в Сефах и правило 300 дней) • Гаагский апостиль и консульская легализация.")
}

TIP_LABEL_I18N = {"en": "💡 Dayanim Tip:", "he": "💡 טיפ למעמד בית הדין:", "fr": "💡 Conseil Beit Din :", "es": "💡 Consejo Beit Din:", "de": "💡 Beit-Din-Tipp:", "ru": "💡 Совет для Бейт-Дина:"}
FORMS_BADGE_8_I18N = {"en": "8 PIBA & NATIV FORMS", "he": "8 טפסי משרד הפנים ונתיב", "fr": "8 FORMULAIRES PIBA & NATIV", "es": "8 FORMULARIOS PIBA Y NATIV", "de": "8 PIBA & NATIV FORMULARE", "ru": "8 АНКЕТ МВД (PIBA) И НАТИВ"}

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

def make_meta_desc(raw_text, min_len=125, max_len=154):
    txt = re.sub(r"<[^>]+>", " ", str(raw_text or ""))
    txt = html.unescape(txt)
    txt = re.sub(r"\s+", " ", txt).strip()
    txt = txt.replace("'", "’").replace('"', "”")
    while len(html.escape(txt, quote=True)) > max_len:
        cut = txt[:max_len - 2]
        if " " in cut[min_len - 20:]:
            cut = cut[:cut.rfind(" ")]
        txt = cut.rstrip(" ,;:-—•.") + "."
        if len(cut) < 80:
            break
    return html.escape(txt, quote=True)

def esc_attr(s):
    clean = re.sub(r"\s+", " ", str(s or "")).strip().replace("'", "’")
    return html.escape(clean, quote=True)

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
        f'<section id="gat-3track-funnel-card" data-nosnippet style="background:#fff;border:2.5px solid #03A9F4;border-radius:20px;padding:15px 14px;margin:8px 0 16px 0;box-shadow:0 12px 32px rgba(3,169,244,0.16);">'
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

if 'id="gat-hub-seo-library-drawer"' in base_html:
    base_html = re.sub(
        r'\s*<div id="gat-onboarding-stage" data-nosnippet>[\s\S]*?<details id="gat-hub-seo-library-drawer"[^>]*>\s*<summary[^>]*>[\s\S]*?</summary>\s*<div[^>]*>([\s\S]*?)</div>\s*</details>',
        lambda m: "\n" + re.sub(r'<h2(\b[^>]*data-i18n="hero_h1"[^>]*)>([\s\S]*?)</h2>', r'<h1\1>\2</h1>', m.group(1), count=1),
        base_html,
        count=1
    )

base_html = re.sub(r'<link rel="alternate" hreflang="[^"]*" href="[^"]*" />\s*', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = re.sub(r'[ \t]*<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*/?>\s*\n?', '', base_html)
base_html = base_html.replace(DOMAIN_SHIELD, "")
base_html = re.sub(r'<article class="seo-spoke-article"[\s\S]*?</article>\s*', '', base_html)
base_html = re.sub(r'\s*<noscript><img src="/api/auditDoc\?mode=pixel[^"]*"[^>]*></noscript>', '', base_html)

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
    s = str(raw_html or "").strip()
    if "<ul" in s or "<li" in s or "gat-step-item-card" in s:
        return s
    # Split on " • " when used to separate numbered or bulleted items
    parts = [p.strip() for p in re.split(r'\s*•\s*(?=\d+\.\s*<strong>|<strong>)', s) if p.strip()]
    if len(parts) > 1:
        return "".join([f'<div class="gat-step-item-card">{p.lstrip("• ").strip()}</div>' for p in parts])
    return f'<div class="gat-step-item-card">{s}</div>'

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

def build_visible_mesh_nav_html(lang, d):
    cards = []
    for sp in SPOKES:
        loc_s = sp["l_slugs"].get(lang, sp["slug"])
        href = f"/{loc_s}/" if lang == "en" else f"/{lang}/{loc_s}/"
        lbl = sp["seo_titles"].get(lang, sp["seo_titles"]["en"])
        cards.append(f'<a class="seo-mesh-link" href="{href}">📘 {html.escape(lbl)}</a>')
    forms_href = "/forms/" if lang == "en" else f"/{lang}/forms/"
    forms_lbl = d.get("mesh_forms", "📄 Official Hebrew Forms Vault & Auto-Filler (Ash/1, Ash/3, Ash/6 & Ash/456 Oleh)")
    cards.append(f'<a class="seo-mesh-link" href="{forms_href}">{html.escape(forms_lbl)}</a>')
    m_title = d.get("mesh_title", "📚 Official Statutory Playbooks & Bureaucracy Guides")
    MESH_NAV_ARIA_I18N = {
        "en": "Statutory Playbooks & Official Guides",
        "he": "מדריכי חוק ונהלים רשמיים",
        "fr": "Guides Statutaires & Procédures Officielles",
        "es": "Guías Legales y Procedimientos Oficiales",
        "de": "Offizielle Leitfäden & Verfahren",
        "ru": "Официальные инструкции и руководства"
    }
    a_nav_lbl = MESH_NAV_ARIA_I18N.get(lang, MESH_NAV_ARIA_I18N["en"])
    return (
        f'<nav class="seo-spoke-mesh" id="seo-spoke-mesh" aria-label="{html.escape(a_nav_lbl)}">\n'
        f'          <h2 id="mesh-title" data-i18n="mesh_title">{html.escape(m_title)}</h2>\n'
        f'          <div class="seo-mesh-grid">\n            ' + "\n            ".join(cards) + '\n          </div>\n        </nav>'
    )

def build_hub_library_html(lang, d):
    j = d.get("_jurisdiction", {})
    st_t, st_p = STATUTORY_AUTHORITY_I18N[lang]
    diy_t, diy_p = DIY_VS_LAWYERS_NBN_I18N[lang]
    parts = [f'<div class="seo-obstacle-library"><details><summary style="">{d.get("mesh_title", "📚 Official Statutory Playbooks & Bureaucracy Guides")} (2026 PIBA Editions)</summary>']
    parts.append(f'<article><h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>')
    if j:
        parts.append(f'<p><strong>{j.get("flag","")} {j.get("name","")}:</strong> {j.get("police","")} • {j.get("birth","")} • {j.get("single","")} • {j.get("apostille","")}</p>')
    parts.append(build_spoke_mesh_links(lang))
    parts.append('</article>')
    for idx, ob in enumerate(d.get("_obstacles", [])):
        parts.append(
            f'<article id="seo-obs-{idx}"><details class="gat-seo-card-acc"><summary style=""><span>{ob.get("tag","")} — {ob.get("title","")}</span><span class="gat-acc-plus">＋</span></summary>'
            f'<section class="gat-acc-body"><h2>{ob.get("title","")}</h2><p>{ob.get("body","")}</p><h3>{ob.get("badTitle","")}</h3><p>{clean_no_divs(ob.get("badText",""))}</p><h3>{ob.get("goodTitle","")}</h3><p>{clean_no_divs(ob.get("goodText",""))}</p></section></details></article>'
        )
    for tk, tv in d.get("_terms", {}).items():
        if tk in ("broad_aliyah_guide", "broad_giyur_guide", "broad_benefits_guide", "unmarried_partner_5_2_0009", "utah_zoom_marriage_israel", "proof_of_judaism_israel"):
            continue
        parts.append(
            f'<article id="seo-term-{tk}"><details class="gat-seo-card-acc"><summary style=""><span>{tv.get("tag","")} — {tv.get("title","")}</span><span class="gat-acc-plus">＋</span></summary>'
            f'<section class="gat-acc-body"><h2>{tv.get("title","")}</h2><div>{tv.get("body","")}</div><h3>{tv.get("badTitle","")}</h3><p>{clean_no_divs(tv.get("badText",""))}</p><h3>{tv.get("goodTitle","")}</h3><p>{clean_no_divs(tv.get("goodText",""))}</p></section></details></article>'
        )
    parts.append('</details></div>')
    return "\n".join(parts)

def apply_common_i18n(out, lang, d):
    for k, val in d.items():
        if not k.startswith("_") and isinstance(val, str):
            out = re.sub(rf'(data-i18n="{re.escape(k)}"[^>]*>)[^<]*(</)', lambda m: m.group(1) + val + m.group(2), out)
    out = re.sub(r'<section id="gat-3track-funnel-card" data-nosnippet[\s\S]*?</section>', lambda _: build_static_funnel_html(lang, d), out, count=1)
    _, _, _, _, open_pg_lbl, _ = STAGE_UI_STATIC_I18N.get(lang, STAGE_UI_STATIC_I18N["en"])
    out = out.replace("<span>Open Page →</span>", f"<span>{open_pg_lbl}</span>")
    fp = d.get("_funnel_pre_ai", {})
    if fp:
        for n in (1, 2, 3):
            out = re.sub(rf'(<div id="gat-cat-hdr-{n}"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + f'<span>{fp.get(f"cat{n}","")}</span><span>▼</span>' + m.group(2), out, count=1)
    blocks = d.get("_blocks", {})
    for tid in ["track-0", "track-1", "track-2", "track-3"]:
        b_html = blocks.get(f"#{tid}")
        if b_html and not str(b_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<article class="track-card[^"]*" id="{tid}">)[\s\S]*?(</article>)', lambda m: m.group(1) + "\n" + b_html + "\n        " + m.group(2), out, count=1)
    for mg_id in ["mg-0", "mg-1", "mg-2", "mg-3"]:
        mg_html = blocks.get(f"#{mg_id}")
        if mg_html and not str(mg_html).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<div class="milestone-group" id="{mg_id}">)[\s\S]*?(</div>\s*(?=(?:<!--[^>]*-->\s*)*<div class="milestone-group"|(?:<!--[^>]*-->\s*)*<a href="/app))', lambda m: m.group(1) + "\n" + mg_html + "\n        " + m.group(2), out, count=1)
    # Ensure all 4 milestone-group containers keep id="mg-0..3" across all 6 language hubs
    _mg_idx = [0]
    def _ensure_mg_ids(m):
        tag = m.group(0)
        idx = _mg_idx[0]
        _mg_idx[0] += 1
        if 'id="mg-' in tag:
            return tag
        return f'<div class="milestone-group" id="mg-{idx}">'
    out = re.sub(r'<div class="milestone-group"(?:\s+id="mg-\d+")?>', _ensure_mg_ids, out)
    if blocks.get("#left-drawer-panel") and not str(blocks["#left-drawer-panel"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<aside class="drawer-panel" id="left-drawer-panel">)[\s\S]*?(</aside>)', lambda m: m.group(1) + "\n" + blocks["#left-drawer-panel"] + "\n  " + m.group(2), out, count=1)
    if blocks.get("#app-drawer .drawer-panel") and not str(blocks["#app-drawer .drawer-panel"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="drawer-overlay" id="app-drawer" data-nosnippet[^>]*>\s*<aside class="drawer-panel">)[\s\S]*?(</aside>)', lambda m: m.group(1) + "\n" + blocks["#app-drawer .drawer-panel"] + "\n  " + m.group(2), out, count=1)
    if blocks.get("#view-3 .vetted-card") and not str(blocks["#view-3 .vetted-card"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="vetted-card"[^>]*>)[\s\S]*?(</div>\s*</section>)', lambda m: m.group(1) + blocks["#view-3 .vetted-card"] + m.group(2), out, count=1)
    if blocks.get("#view-4 .shield-banner") and not str(blocks["#view-4 .shield-banner"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="shield-banner">)[\s\S]*?(</div>\s*<!-- 4 INTERACTIVE)', lambda m: m.group(1) + blocks["#view-4 .shield-banner"] + m.group(2), out, count=1)
    if blocks.get("#view-4 .two-way-bar") and not str(blocks["#view-4 .two-way-bar"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<div class="two-way-bar">)[\s\S]*?(</div>\s*<!-- MAJOR COMPONENT 1)', lambda m: m.group(1) + blocks["#view-4 .two-way-bar"] + m.group(2), out, count=1)
    if blocks.get("#z-track") and not str(blocks["#z-track"]).startswith("[EN_DOM_DEFAULT"):
        out = re.sub(r'(<select class="zehut-select" id="z-track"[^>]*>)[\s\S]*?(</select>)', lambda m: m.group(1) + "\n" + blocks["#z-track"] + "\n          " + m.group(2), out, count=1)
    if blocks.get("#view-2 .zehut-select-label"):
        out = re.sub(r'(<label class="zehut-select-label" for="z-track">)[^<]*(</label>)', lambda m: m.group(1) + blocks["#view-2 .zehut-select-label"] + m.group(2), out, count=1)
    if blocks.get("#view-2 .hero-center p"):
        out = re.sub(r'(<h2 class="h1-style" data-i18n="t3_h1">[^<]*</h2>\s*<p>)[^<]*(</p>)', lambda m: m.group(1) + blocks["#view-2 .hero-center p"] + m.group(2), out, count=1)
    if blocks.get("#view-2 .emerald-label"):
        out = re.sub(r'(<div class="emerald-card">\s*<div class="emerald-label">)[^<]*(</div>)', lambda m: m.group(1) + blocks["#view-2 .emerald-label"] + m.group(2), out, count=1)
    if blocks.get("#view-2 .emerald-sub"):
        out = re.sub(r'(<div class="emerald-sub" id="emerald-detail">)[^<]*(</div>)', lambda m: m.group(1) + blocks["#view-2 .emerald-sub"] + m.group(2), out, count=1)
    if blocks.get("#view-2 > .btn-sky"):
        out = re.sub(r'(<button class="btn-sky" onclick="switchTab\(4\)">)Lock In My Track & Deadline Shield →(</button>)', lambda m: m.group(1) + blocks["#view-2 > .btn-sky"] + m.group(2), out, count=1)
    if blocks.get("#view-3 .hero-center p"):
        out = re.sub(r'(<h2 class="h1-style" data-i18n="t4_h1">[^<]*</h2>\s*<p>)[^<]*(</p>)', lambda m: m.group(1) + blocks["#view-3 .hero-center p"] + m.group(2), out, count=1)
    for id_k in ["lbl-countries", "lbl-months", "fx-h2", "fx-lead", "lbl-fx-amt", "fx-card-lbl", "fx-saved-detail", "fx-cta-btn", "hlth-pill", "hlth-title", "hlth-desc", "hlth-cta-btn"]:
        b_val = blocks.get(f"#{id_k}")
        if b_val and not str(b_val).startswith("[EN_DOM_DEFAULT"):
            out = re.sub(rf'(<[^>]+id="{re.escape(id_k)}"[^>]*>)[\s\S]*?(</(?:span|h2|p|div|button)>)', lambda m, v=b_val: m.group(1) + v + m.group(2), out, count=1)

    SLIDER_INIT_I18N = {
        "en": ("2 Countries", "6 Months", "3.5 Years", "Share this exact page", "Snap & Translate Hebrew", "Start Here: Conversion, Aliyah & Rabbanut", "Statutory Playbooks & Official Guides", "The 4 Tracks of Conversion, Marriage & Aliyah", "Time-Savings & Track Shield Calculator", "Vetted Sponsoring Rabbi & Certified Madrichat Kallah", "Live Track & Anti-File-Closure Deadline Tracker", "Primary App Navigation"),
        "he": ("2 מדינות", "6 חודשים", "3.5 שנים", "שתפו עמוד זה", "צילום ותרגום מסמך בעברית", "התחילו כאן: גיור, עלייה ורבנות", "מדריכי חוק ונהלים רשמיים", "4 מסלולי גיור, נישואין ועלייה", "מחשבון חיסכון בזמן ומגן מסלול", "רב מלווה מוכר ומדריכת כלה מוסמכת", "מעקב מועדים והגנה מסגירת תיק", "ניווט ראשי"),
        "fr": ("2 Pays", "6 Mois", "3,5 Ans", "Partager cette page", "Scanner & Traduire l'Hébreu", "Commencer ici : Conversion, Aliyah & Rabbinat", "Guides Statutaires & Procédures Officielles", "Les 4 Voies de Conversion, Mariage & Aliyah", "Calculateur de Gain de Temps & Bouclier", "Rabbin Accompagnateur & Madrichat Kallah Agréés", "Suivi des Délais & Protection du Dossier", "Navigation Principale"),
        "es": ("2 Países", "6 Meses", "3,5 Años", "Compartir esta página", "Escanear y Traducir Hebreo", "Empiece aquí: Conversión, Aliyá y Rabinato", "Guías Legales y Procedimientos Oficiales", "Las 4 Vías de Conversión, Matrimonio y Aliyá", "Calculadora de Ahorro de Tiempo y Escudo", "Rabino Patrocinador y Madrijat Kalá Certificados", "Seguimiento de Plazos y Escudo de Expediente", "Navegación Principal"),
        "de": ("2 Länder", "6 Monate", "3,5 Jahre", "Diese Seite teilen", "Hebräisch scannen & übersetzen", "Hier starten: Giur, Alija & Rabbinat", "Offizielle Leitfäden & Verfahren", "Die 4 Wege für Giur, Heirat & Alija", "Zeitersparnis- & Schutz-Rechner", "Geprüfter Rabbiner & Zertifizierte Madrichat Kallah", "Fristen-Tracker & Akten-Schutz", "Hauptnavigation"),
        "ru": ("2 страны", "6 месяцев", "3,5 года", "Поделиться этой страницей", "Сканировать и перевести иврит", "Начните здесь: Гиюр, Алия и Раввинат", "Официальные инструкции и руководства", "4 трека гиюра, брака и репатриации", "Калькулятор экономии времени и защита", "Проверенный раввин и сертифицированная мадрихат кала", "Трекер сроков и защита от закрытия дела", "Основная навигация")
    }
    c_lbl, m_lbl, y_lbl, sh_t, sn_t, a_v0, a_nav, a_v1, a_v2, a_v3, a_v4, a_bnav = SLIDER_INIT_I18N.get(lang, SLIDER_INIT_I18N["en"])
    out = out.replace('<span class="slider-val" id="val-countries">2 Countries</span>', f'<span class="slider-val" id="val-countries">{c_lbl}</span>')
    out = out.replace('<span class="slider-val" id="val-months">6 Months</span>', f'<span class="slider-val" id="val-months">{m_lbl}</span>')
    out = out.replace('<div class="emerald-giant" id="emerald-years">3.5 Years</div>', f'<div class="emerald-giant" id="emerald-years">{y_lbl}</div>')
    out = out.replace('title="Share this exact page"', f'title="{sh_t}"').replace('aria-label="Share this exact page"', f'aria-label="{sh_t}"')
    out = out.replace('title="Snap & Translate Hebrew"', f'title="{sn_t}"')
    out = out.replace('aria-label="Start Here: Conversion, Aliyah & Rabbanut"', f'aria-label="{a_v0}"')
    out = out.replace('aria-label="Statutory Playbooks & Official Guides"', f'aria-label="{a_nav}"')
    out = out.replace('aria-label="The 4 Tracks of Conversion, Marriage & Aliyah"', f'aria-label="{a_v1}"')
    out = out.replace('aria-label="Time-Savings & Track Shield Calculator"', f'aria-label="{a_v2}"')
    out = out.replace('aria-label="Vetted Sponsoring Rabbi & Certified Madrichat Kallah"', f'aria-label="{a_v3}"')
    out = out.replace('aria-label="Live Track & Anti-File-Closure Deadline Tracker"', f'aria-label="{a_v4}"')
    out = out.replace('aria-label="Primary App Navigation"', f'aria-label="{a_bnav}"')

    if not hasattr(apply_common_i18n, "_tab_faqs"):
        apply_common_i18n._tab_faqs = json.load(open("public/i18n/tab_faqs_6lang.json", encoding="utf-8"))
    tf_d = apply_common_i18n._tab_faqs.get(lang, apply_common_i18n._tab_faqs["en"])
    t0 = tf_d["tabs"]["0"]
    faq_items_html = "".join([
        f'<details style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:14px 16px;box-shadow:0 3px 10px rgba(8,37,72,0.04);">'
        f'<summary style="font-weight:900;font-size:0.9rem;color:#ffffff;cursor:pointer;line-height:1.4;">{html.escape(q)}</summary>'
        f'<p style="margin-top:10px;font-size:0.84rem;color:#334155;line-height:1.58;">{html.escape(a)}</p></details>'
        for q, a in t0["items"]
    ])
    legal_html = (
        f'<div style="margin-top:20px;padding:16px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;font-size:0.77rem;color:#475569;line-height:1.55;">'
        f'<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #e2e8f0;">'
        f'<strong style="color:#082548;font-size:0.81rem;">⚖️ Giyur Aliyah Track • {html.escape(tf_d["legal_title"])}</strong>'
        f'<a href="mailto:concierge@giyuraliyahtrack.com" style="color:#0288D1;font-weight:800;text-decoration:none;">✉️ concierge@giyuraliyahtrack.com</a></div>'
        f'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;">'
        f'<details style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:9px 12px;"><summary style="font-weight:800;color:#ffffff;cursor:pointer;">{html.escape(tf_d["tos_t"])}</summary><p style="margin:6px 0 0 0;">{html.escape(tf_d["tos_b"])}</p></details>'
        f'<details style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:9px 12px;"><summary style="font-weight:800;color:#ffffff;cursor:pointer;">{html.escape(tf_d["ref_t"])}</summary><p style="margin:6px 0 0 0;">{html.escape(tf_d["ref_b"])}</p></details>'
        f'<details style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:9px 12px;"><summary style="font-weight:800;color:#ffffff;cursor:pointer;">{html.escape(tf_d["priv_t"])}</summary><p style="margin:6px 0 0 0;">{html.escape(tf_d["priv_b"])}</p></details>'
        f'</div></div>'
    )
    sec_faq_html = (
        f'<section id="gat-tab-faq-0" style="margin-top:28px;margin-bottom:18px;padding-top:20px;border-top:2px solid #cbd5e1;">'
        f'<div class="section-kicker" style="margin-bottom:12px;"><h2>{html.escape(t0["h2"])}</h2><span>{html.escape(tf_d["kicker_sub"])}</span></div>'
        f'<div style="display:flex;flex-direction:column;gap:10px;">{faq_items_html}</div>{legal_html}</section>'
    )
    out = re.sub(r'<nav class="seo-spoke-mesh" id="seo-spoke-mesh"[\s\S]*?</nav>', lambda _: build_visible_mesh_nav_html(lang, d), out, count=1)
    out = re.sub(r'<section id="gat-tab-faq-0"[\s\S]*?</section>', lambda _: sec_faq_html, out, count=1)

    EXTRA_STATIC_6LANG = {
        "en": {
            "v2_btn": "Lock In My Track & Deadline Shield →",
            "fx_det": "Saved vs. ~3.2% retail bank markup + pay Israeli landlords directly in ₪ before opening an Israeli bank account",
            "next_box": "Next Box →",
            "edge_title": "Hold & Slide or Tap for Paperwork & Concierge",
            "dr_shield": "⚡ Anti-Loop Protection Shield",
            "dr_avg": "Avg Saved",
            "dr_bd": "Beit Din",
            "dr_cp": "Couples Sync",
            "dr_qs": "700 Qs",
            "dr_cp_qs": "300 Qs",
            "dr_r1": "🕍 700 Beit Din Exam Flashcards & Game",
            "dr_r2": "🎵 56 Shabbat Songs, Prayers & Shema Grader",
            "dr_r3": "📱 300-Question 2-Phone Couples Sync",
            "dr_r4": "📊 Live 180-Day & 30-Day Deadline Tracker",
            "dr_r5": "🔐 Full Member Portal (/app)",
            "dr_inst": "📲 Install App"
        },
        "he": {
            "v2_btn": "נעל את המסלול ומגן המועדים שלי ←",
            "fx_det": "חיסכון מול כ-3.2% עמלת בנק קמעונאי + תשלום ישיר לבעלי דירות בישראל ב-₪ עוד לפני פתיחת חשבון בנק ישראלי",
            "next_box": "לתיבה הבאה ←",
            "edge_title": "החזיקו והחליקו או הקישו לטפסים וליווי אישי",
            "dr_shield": "⚡ מגן חכם נגד סחבת וסגירת תיק",
            "dr_avg": "חיסכון ממוצע",
            "dr_bd": "בית דין",
            "dr_cp": "סינכרון זוגות",
            "dr_qs": "700 שאלות",
            "dr_cp_qs": "300 שאלות",
            "dr_r1": "🕍 700 כרטיסיות וסימולטור למבחן בית הדין",
            "dr_r2": "🎵 56 שירי שבת, תפילות ומאמן קריאת שמע",
            "dr_r3": "📱 סינכרון 300 שאלות שימוע זוגי ב-2 טלפונים",
            "dr_r4": "📊 מעקב חי: שעון 180 יום והגנת 30 יום",
            "dr_r5": "🔐 פורטל המנויים המלא (/app)",
            "dr_inst": "📲 התקנת האפליקציה לנייד"
        },
        "fr": {
            "v2_btn": "Verrouiller Mon Parcours & Bouclier de Délais →",
            "fx_det": "Économisé vs ~3,2 % de marge bancaire + payez votre propriétaire en Israël directement en ₪ avant d'ouvrir un compte israélien",
            "next_box": "Case Suivante →",
            "edge_title": "Maintenez & glissez ou touchez pour Formulaires & Conciergerie",
            "dr_shield": "⚡ Bouclier Anti-Blocage Administratif",
            "dr_avg": "Gain Moyen",
            "dr_bd": "Beit Din",
            "dr_cp": "Synchro Couple",
            "dr_qs": "700 Qs",
            "dr_cp_qs": "300 Qs",
            "dr_r1": "🕍 700 Cartes & Simulateur d'Examen Beit Din",
            "dr_r2": "🎵 56 Chants de Chabbat, Prières & Chema Audio",
            "dr_r3": "📱 Synchro Couple 300 Questions sur 2 Téléphones",
            "dr_r4": "📊 Suivi en Direct des Délais 180 Jours & 30 Jours",
            "dr_r5": "🔐 Portail Membre Complet (/app)",
            "dr_inst": "📲 Installer l'Application"
        },
        "es": {
            "v2_btn": "Bloquear Mi Vía y Escudo de Plazos →",
            "fx_det": "Ahorrado frente al ~3,2% de comisión bancaria + pague a propietarios en Israel directamente en ₪ antes de abrir cuenta israelí",
            "next_box": "Siguiente Caja →",
            "edge_title": "Mantenga y deslice o toque para Formularios y Concierge",
            "dr_shield": "⚡ Escudo Anti-Bucle Burocrático",
            "dr_avg": "Ahorro Medio",
            "dr_bd": "Beit Din",
            "dr_cp": "Sync Parejas",
            "dr_qs": "700 Preg.",
            "dr_cp_qs": "300 Preg.",
            "dr_r1": "🕍 700 Tarjetas y Simulador de Examen Beit Din",
            "dr_r2": "🎵 56 Canciones de Shabat, Rezos y Shemá Audio",
            "dr_r3": "📱 Sync de Parejas: 300 Preguntas en 2 Teléfonos",
            "dr_r4": "📊 Seguimiento en Vivo: Reloj 180 y 30 Días",
            "dr_r5": "🔐 Portal Completo de Miembros (/app)",
            "dr_inst": "📲 Instalar Aplicación"
        },
        "de": {
            "v2_btn": "Meinen Weg & Fristen-Schutz aktivieren →",
            "fx_det": "Gespart gegenüber ~3,2 % Bankaufschlag + israelische Vermieter direkt in ₪ bezahlen, noch vor Eröffnung eines israelischen Kontos",
            "next_box": "Nächste Box →",
            "edge_title": "Halten & ziehen oder tippen für Formulare & Concierge",
            "dr_shield": "⚡ Anti-Endlosschleifen-Schutzschild",
            "dr_avg": "Ø Ersparnis",
            "dr_bd": "Beit Din",
            "dr_cp": "Paar-Sync",
            "dr_qs": "700 Fragen",
            "dr_cp_qs": "300 Fragen",
            "dr_r1": "🕍 700 Beit-Din-Prüfungskarten & Simulator",
            "dr_r2": "🎵 56 Schabbat-Lieder, Gebete & Schema-Trainer",
            "dr_r3": "📱 300-Fragen-Paar-Sync auf 2 Handys",
            "dr_r4": "📊 Live 180-Tage- & 30-Tage-Fristen-Tracker",
            "dr_r5": "🔐 Vollständiges Mitgliederportal (/app)",
            "dr_inst": "📲 App installieren"
        },
        "ru": {
            "v2_btn": "Зафиксировать мой трек и защиту сроков →",
            "fx_det": "Экономия по сравнению с ~3,2% банковской комиссии + прямая оплата аренды в Израиле в ₪ ещё до открытия счёта в израильском банке",
            "next_box": "Следующий блок →",
            "edge_title": "Удерживайте и тяните или нажмите для анкет и консьержа",
            "dr_shield": "⚡ Защита от бюрократической петли",
            "dr_avg": "Экономия",
            "dr_bd": "Бейт-Дин",
            "dr_cp": "Синхр. пар",
            "dr_qs": "700 вопр.",
            "dr_cp_qs": "300 вопр.",
            "dr_r1": "🕍 700 карточек и симулятор экзамена Бейт-Дина",
            "dr_r2": "🎵 56 песен Шаббата, молитв и ИИ-тренер Шма",
            "dr_r3": "📱 300 вопросов СТУПРО: синхронизация 2 телефонов",
            "dr_r4": "📊 Живой трекер сроков 180 дней и 30 дней",
            "dr_r5": "🔐 Полный портал участника (/app)",
            "dr_inst": "📲 Установить приложение"
        }
    }
    ex13 = EXTRA_STATIC_6LANG.get(lang, EXTRA_STATIC_6LANG["en"])
    out = out.replace("[EN_DOM_DEFAULT:#view-2 > .btn-sky]", ex13["v2_btn"])
    out = out.replace("Lock In My Track & Deadline Shield →", ex13["v2_btn"])
    out = re.sub(r'(<div class="emerald-sub" id="fx-saved-detail"[^>]*>)[\s\S]*?(</div>)', lambda m: m.group(1) + ex13["fx_det"] + m.group(2), out, count=1)
    out = out.replace(">Next Box →</button>", f">{ex13['next_box']}</button>")
    out = out.replace('title="Hold & Slide or Tap for Paperwork & Concierge"', f'title="{ex13["edge_title"]}"')
    out = out.replace("<span>⚡ Anti-Loop Protection Shield</span>", f"<span>{ex13['dr_shield']}</span>")
    out = out.replace('<span class="dds-lbl">Avg Saved</span>', f'<span class="dds-lbl">{ex13["dr_avg"]}</span>')
    out = out.replace('<span class="dds-lbl">Beit Din</span>', f'<span class="dds-lbl">{ex13["dr_bd"]}</span>')
    out = out.replace('<span class="dds-lbl">Couples Sync</span>', f'<span class="dds-lbl">{ex13["dr_cp"]}</span>')
    out = out.replace('<span class="dds-num">700 Qs</span>', f'<span class="dds-num">{ex13["dr_qs"]}</span>')
    out = out.replace('<span class="dds-num">300 Qs</span>', f'<span class="dds-num">{ex13["dr_cp_qs"]}</span>')
    out = out.replace(">🕍 700 Beit Din Exam Flashcards & Game</a>", f">{ex13['dr_r1']}</a>")
    out = out.replace(">🎵 56 Shabbat Songs, Prayers & Shema Grader</a>", f">{ex13['dr_r2']}</a>")
    out = out.replace(">📱 300-Question 2-Phone Couples Sync</a>", f">{ex13['dr_r3']}</a>")
    out = out.replace(">📊 Live 180-Day & 30-Day Deadline Tracker</button>", f">{ex13['dr_r4']}</button>")
    out = out.replace(">🔐 Full Member Portal (/app)</a>", f">{ex13['dr_r5']}</a>")
    out = out.replace(">📲 Install App</button>", f">{ex13['dr_inst']}</button>")

    out = re.sub(r'href="/app\?([^"]+)"', r'href="/app/?\1"', out)
    out = out.replace('href="/app"', 'href="/app/"').replace('href="/forms"', 'href="/forms/"')
    if lang != "en":
        out = out.replace('href="/forms/"', f'href="/{lang}/forms/"')
        out = out.replace('href="/pricing/"', f'href="/{lang}/pricing/"')
        out = out.replace('href="/concierge-booking/"', f'href="/{lang}/concierge-booking/"')
        out = out.replace('href="https://giyuraliyahtrack.com/"', f'href="https://giyuraliyahtrack.com/{lang}/"')
        out = out.replace('href="/app/"', f'href="/app/?lang={lang}"')
        def _loc_app_href(m):
            u = m.group(1)
            if "lang=" in u:
                return f'href="{u}"'
            return f'href="{u}&lang={lang}"'
        out = re.sub(r'href="(/app/\?[^"]+)"', _loc_app_href, out)
        def _loc_root_href(m):
            tag = m.group(0)
            if any(x in tag for x in ('hreflang="en"', 'data-lang="en"', "('en')", 'English')):
                return tag
            return tag.replace('href="/"', f'href="/{lang}/"')
        out = re.sub(r'<a\b[^>]*\bhref="/"[^>]*>', _loc_root_href, out)
        dahan_loc = SPOKES[9]["l_slugs"].get(lang, SPOKES[9]["slug"])
        out = out.replace('id="dahan-gold-card" href="/dahan-ruling-non-orthodox-conversion-aliyah-truth/"', f'id="dahan-gold-card" href="/{lang}/{dahan_loc}/"')
        for sp in SPOKES:
            en_s = sp["slug"]
            loc_s = sp["l_slugs"].get(lang, en_s)
            out = out.replace(f'href="/{en_s}/"', f'href="/{lang}/{loc_s}/"')
            out = out.replace(f'href="/{lang}/{en_s}/"', f'href="/{lang}/{loc_s}/"')
    return out

def make_og_tags(lang, safe_title, safe_desc, canon_url):
    og_loc = {"en":"en_US","he":"he_IL","fr":"fr_FR","es":"es_ES","de":"de_DE","ru":"ru_RU"}.get(lang, "en_US")
    og_img = f"https://giyuraliyahtrack.com/og-share-{lang}-1200x630.jpg"
    return "\n".join([
        f'  <meta property="og:type" content="website" />',
        f'  <meta property="og:locale" content="{og_loc}" />',
        f'  <meta property="og:site_name" content="Giyur Aliyah Track" />',
        f'  <meta property="og:title" content="{safe_title}" />',
        f'  <meta property="og:description" content="{safe_desc}" />',
        f'  <meta property="og:url" content="{canon_url}" />',
        f'  <meta property="og:image" content="{og_img}" />',
        f'  <meta property="og:image:secure_url" content="{og_img}" />',
        f'  <meta property="og:image:type" content="image/jpeg" />',
        f'  <meta property="og:image:width" content="1000" />',
        f'  <meta property="og:image:height" content="1000" />',
        f'  <meta property="og:image:alt" content="{safe_title}" />',
        f'  <meta name="twitter:card" content="summary_large_image" />',
        f'  <meta name="twitter:title" content="{safe_title}" />',
        f'  <meta name="twitter:description" content="{safe_desc}" />',
        f'  <meta name="twitter:image" content="{og_img}" />'
    ])

BACK_TO_HUB_I18N = {
    "en": "← Back to Main Diagnostic Hub",
    "he": "→ חזרה לעמוד הבית הראשי",
    "fr": "← Retour au Portail Principal",
    "es": "← Volver al Portal Principal",
    "de": "← Zurück zum Hauptportal",
    "ru": "← Назад на главную страницу"
}

def _inject_article_at_very_top(html_str, article_html):
    if 'class="seo-spoke-article"' in html_str:
        return html_str
    # 1. Strip the homepage hero-center and exodus-alert from #view-0 on spoke/form pages
    html_str = re.sub(
        r'(<section\b[^>]*\bid="view-0"[^>]*>)[\s\S]*?(?=<section id="gat-3track-funnel-card" data-nosnippet)',
        lambda m: m.group(1) + "\n        ",
        html_str,
        count=1
    )
    # 2. Strip the homepage 9-box obstacle grid (.section-kicker + .enemy-grid + homepage CTAs) on spoke/form pages
    html_str = re.sub(
        r'<div class="section-kicker">\s*<h2 data-i18n="kicker_h2">[\s\S]*?(?=<!-- FULL SEMANTIC SEO ARTICLES IN DOM -->|<nav class="seo-spoke-mesh")',
        '',
        html_str,
        count=1
    )
    # 3. Demote any remaining <h1> outside article_html to <h2>
    html_str = re.sub(r'<h1(\b[^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', html_str, count=1)

    # 4. Inject article_html immediately at the very top of #view-0
    return re.sub(
        r'(<section\b[^>]*\bid="view-0"[^>]*>)',
        lambda m: m.group(1) + "\n        " + article_html,
        html_str,
        count=1
    )


# === GAT CLEAN HUB ONBOARDING & SEO DRAWER WRAPPER START ===
MASTER_HERO_6LANG = {
    "en": {
        "title": "Your Shortest, Safest Path to Aliyah, Conversion, or Residency",
        "lead": "Answer 4 quick questions to map your exact legal track to your Teudat Zehut—for free:",
        "bullets": [
            [
                "✈️ Skip Jewish Agency & NBN Delays",
                "Bypass the 9–12 month wait and solve in-Israel status, Giyur & spousal visas agencies won't touch."
            ],
            [
                "💸 Save 15,000₪–40,000₪+ on Lawyers",
                "Get the exact same legal track, official Hebrew forms & insider rules—with zero hidden fees."
            ],
            [
                "🛡️ Expose Every Pitfall Upfront Free",
                "Avoid the 180-day Apostille cliff, Private Beit Din blocks, B/1 rejections & 300-Q interview traps."
            ]
        ],
        "cta": "🚀 START MY TRACK →"
    },
    "he": {
        "title": "המסלול הקצר והבטוח ביותר לעלייה, גיור או מעמד בישראל",
        "lead": "ענו על 4 שאלות קצרות לבניית המסלול המשפטי המדויק עד לתעודת הזהות — בחינם:",
        "bullets": [
            [
                "✈️ עקפו המתנה של שנה בסוכנות ונפש בנפש",
                "פתרון מלא לשינוי מעמד מהארץ, גיור והליך מדורג לבני זוג שגופי העלייה אינם מלווים."
            ],
            [
                "💸 חסכו 15,000–40,000 ₪+ שכר טרחת עו״ד",
                "אנו בונים בדיוק את אותו מסלול משפטי ופותחים את כל הטפסים והנהלים ללא עמלות נסתרות."
            ],
            [
                "🛡️ חשיפת כל המלכודות הבירוקרטיות בחינם",
                "הימנעו מצוק 180 הימים לאפוסטיל, חסימת גיור פרטי לתיירים, סירובי B/1 ושימוע 300 השאלות."
            ]
        ],
        "cta": "🚀 התחל את המסלול שלי ←"
    },
    "fr": {
        "title": "Votre Parcours le Plus Sûr vers l'Aliyah, le Giyur ou le Statut",
        "lead": "4 questions rapides pour tracer gratuitement votre parcours légal jusqu'à la Teoudat Zehout :",
        "bullets": [
            [
                "✈️ Évitez 12 Mois d'Attente Consulaire",
                "Contournez l'Agence Juive/NBN et réussissez vos démarches sur place (statut, Giyur, visa conjoint)."
            ],
            [
                "💸 Économisez 15 000–40 000 ₪ d'Avocat",
                "Obtenez exactement le même parcours légal, les formulaires en hébreu et règles internes sans frais cachés."
            ],
            [
                "🛡️ Déjouez Tous les Pièges Gratuitement",
                "Évitez l'expiration des Apostilles à 180j, le blocage des conversions privées, les refus B/1 et les 300 questions."
            ]
        ],
        "cta": "🚀 DÉMARRER MON PARCOURS →"
    },
    "es": {
        "title": "Tu Camino Más Rápido y Seguro a la Aliyá, Conversión o Visas",
        "lead": "4 preguntas rápidas para trazar gratis tu ruta legal exacta hasta tu Teudat Zehut:",
        "bullets": [
            [
                "✈️ Salta 12 Meses en Agencia Judía y NBN",
                "Resuelve cambios de estatus en Israel, conversiones y visas de pareja que las agencias no cubren."
            ],
            [
                "💸 Ahorra 15.000–40.000 ₪+ en Abogados",
                "Construimos la misma ruta legal y desbloqueamos los formularios en hebreo y reglas sin cargos ocultos."
            ],
            [
                "🛡️ Descubre Cada Trampa Gratis de Antemano",
                "Evita el límite de 180 días en Apostillas, el bloqueo en Beit Din privado, rechazos B/1 y las 300 preguntas."
            ]
        ],
        "cta": "🚀 COMENZAR MI RUTA →"
    },
    "de": {
        "title": "Ihr Kürzester, Sicherster Weg zu Alija, Giur oder Aufenthalt",
        "lead": "4 kurze Fragen für Ihren kostenlosen Rechtsweg Schritt für Schritt zur Teudat Zehut:",
        "bullets": [
            [
                "✈️ 12 Monate Agentur-Wartezeit umgehen",
                "Lösen Sie Inlands-Statuswechsel, Giur und Partner-Visa, bei denen Jewish Agency & NBN nicht helfen."
            ],
            [
                "💸 15.000–40.000 ₪+ Anwaltskosten sparen",
                "Exakt derselbe Rechtsweg, alle hebräischen Anträge und Insider-Regeln ohne versteckte Gebühren."
            ],
            [
                "🛡️ Alle Bürokratiefallen kostenlos aufdecken",
                "Vermeiden Sie die 180-Tage-Apostillenfrist, die Touristen-Sperre beim privaten Giur, B/1-Ablehnungen & 300 Fragen."
            ]
        ],
        "cta": "🚀 MEINEN TRACK STARTEN →"
    },
    "ru": {
        "title": "Ваш самый быстрый и надёжный путь к Алии, Гиюру и статусу",
        "lead": "Ответьте на 4 вопроса, чтобы бесплатно получить точный маршрут до Теудат-Зеута:",
        "bullets": [
            [
                "✈️ В обход 12 месяцев очереди Сохнута",
                "Пройдите смену статуса в Израиле, гиюр или СТУПРО, которыми обычные агентства не занимаются."
            ],
            [
                "💸 Экономия 15 000–40 000 ₪ на адвокатах",
                "Точно такой же законный маршрут, все бланки на иврите и закрытые регламенты МВД без переплат."
            ],
            [
                "🛡️ Защита от всех ловушек МВД и Раввината",
                "Избежите сгорания апостилей за 180 дней, блокировки частного гиюра, отказов по B/1 и 300 вопросов."
            ]
        ],
        "cta": "🚀 НАЧАТЬ МОЙ МАРШРУТ →"
    }
}

HUB_DRAWER_SUMMARY_I18N = {
    "en": "📚 Browse Full Statutory Reference Library, 9 Trap Playbooks & All Official Guides",
    "he": "📚 לעיון בספריית הנהלים המלאה, 9 מדריכי המלכודות וכל המדריכים הרשמיים",
    "fr": "📚 Consulter la Bibliothèque Statutaire Complète & Tous les Guides Officiels",
    "es": "📚 Explorar la Biblioteca Legal Completa y Todas las Guías Oficiales",
    "de": "📚 Vollständige Rechtsbibliothek, 9 Fallstrick-Analysen & Alle Leitfäden öffnen",
    "ru": "📚 Открыть полную библиотеку инструкций МВД, разбор 9 ловушек и все руководства"
}

def wrap_root_hub_for_clean_onboarding(html_out, lang):
    drw_lbl = HUB_DRAWER_SUMMARY_I18N.get(lang, HUB_DRAWER_SUMMARY_I18N["en"])
    mh = MASTER_HERO_6LANG.get(lang, MASTER_HERO_6LANG["en"])
    b_list = mh["bullets"]
    bullets_li = "".join([
        f'<li style="display:flex;flex-direction:column;gap:2px;padding-bottom:{"8px;border-bottom:1px solid #e2e8f0;" if i < len(b_list) - 1 else "0;"}">'
        f'<strong style="display:block;font-size:0.88rem;font-weight:900;color:#082548;line-height:1.25;">{html.escape(b0)}</strong>'
        f'<span style="display:block;font-size:0.76rem;color:#334155;line-height:1.34;font-weight:600;">{html.escape(b1)}</span></li>'
        for i, (b0, b1) in enumerate(b_list)
    ])

    def _wrap_view0(m):
        open_tag = m.group(1)
        inner = m.group(2)
        close_tag = m.group(3)
        inner_clean = re.sub(r'<h1(\b[^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', inner, count=1)
        stage_ssr = (
            f'\n        <div id="gat-onboarding-stage" data-nosnippet>'
            f'<div id="gat-wiz-step-hero_landing" data-nosnippet class="gat-wiz-card" style="max-width:760px;margin:2px auto 24px auto;text-align:center;padding:13px 13px;background:#ffffff;border:2px solid #03A9F4;border-radius:17px;box-shadow:0 12px 30px rgba(16,56,86,0.10);">'
            f'<h1 class="gat-ob-h1" style="font-size:clamp(1.14rem,3.8vw,1.48rem);font-weight:900;color:#103856;line-height:1.18;margin:0 0 10px 0;">{html.escape(mh["title"])}</h1>'
            f'<p class="gat-ob-sub" style="font-size:0.79rem;color:#334155;line-height:1.36;max-width:680px;margin:0 auto 19px auto;font-weight:700;">{html.escape(mh["lead"])}</p>'
            f'<ul style="list-style:none;padding:10px 12px;margin:0 auto 11px auto;max-width:720px;background:#f8fafc;border:1.5px solid #bae6fd;border-radius:13px;text-align:start;display:flex;flex-direction:column;gap:8px;">{bullets_li}</ul>'
            f'<button type="button" onclick="window.gatWizStartQuiz()" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:2px solid #38bdf8;border-radius:13px;padding:13px 16px;font-size:1.02rem;font-weight:900;text-transform:uppercase;letter-spacing:0.03em;cursor:pointer;box-shadow:0 7px 18px rgba(3,169,244,0.28);display:flex;align-items:center;justify-content:center;gap:8px;"><strong style="font-weight:900;text-transform:uppercase;letter-spacing:0.03em;">{html.escape(mh["cta"])}</strong></button>'
            f'</div></div>\n'
            f'        <details id="gat-hub-seo-library-drawer" open class="gat-seo-ref-drawer" style="max-width:760px;margin:18px auto 14px auto;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:16px;padding:12px 15px;">\n'
            f'          <summary style="font-size:0.85rem;font-weight:900;color:#ffffff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;">'
            f'<span>{html.escape(drw_lbl)}</span><span style="color:#0284c7;">▼</span></summary>\n'
            f'          <div style="margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0;">{inner_clean}</div>\n'
            f'        </details>\n      '
        )
        return open_tag + stage_ssr + close_tag

    return re.sub(
        r'(<section\b[^>]*\bid="view-0"[^>]*>)([\s\S]*?)(</section>\s*(?=<!-- ===+\s*TAB 2:))',
        _wrap_view0,
        html_out,
        count=1
    )
# === GAT CLEAN HUB ONBOARDING & SEO DRAWER WRAPPER END ===


# === GAT PYTHON PRE-BAKED TABLES, UNIQUE FORM GUIDES & 6-LANG JSON-LD ===
import subprocess as _sp

def _load_forms_vault_guides():
    fv_txt = open("public/app/forms_vault.js", encoding="utf-8").read()
    m = re.search(r"\bvar\s+FORM_GUIDE_I18N\s*=\s*\{", fv_txt)
    if not m:
        return {"guide": {}}
    sb = fv_txt.find("{", m.start())
    depth, in_s, q_ch, esc = 0, False, "", False
    eb = sb
    for p in range(sb, len(fv_txt)):
        ch = fv_txt[p]
        if in_s:
            if esc: esc = False
            elif ch == "\\": esc = True
            elif ch == q_ch: in_s = False
        else:
            if ch in ("'", '"', "`"): in_s, q_ch = True, ch
            elif ch == "{": depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    eb = p + 1
                    break
    js_obj_str = fv_txt[sb:eb]
    raw = _sp.check_output(["node", "-e", "process.stdout.write(JSON.stringify(" + js_obj_str + "))"], text=True)
    return {"guide": json.loads(raw)}

_FV_DATA = _load_forms_vault_guides()

SW_APP_DESC_I18N = {
    "en": "Interactive statutory roadmap, 180-day & 30-day Misrad HaPanim deadline tracker, 8 official Hebrew PIBA & Nativ PDF auto-fillers, 700 Beit Din conversion flashcards, 300 separated-room spousal visa questions, and vetted Israeli lawyer/notary concierge.",
    "he": "מערכת חכמה למיפוי מסלולי גיור, עלייה והליך מדורג, מעקב מועדי 180 ו-30 יום במשרד הפנים, מילוי אוטומטי בעברית של 8 טפסי רשות האוכלוסין ונתיב, 700 שאלות לבית הדין לגיור, 300 שאלות שימוע זוגי וחיבור לעו״ד ונוטריון.",
    "fr": "Feuille de route statutaire interactive pour le Giyur, le Visa Conjoint et l'Aliyah en Israël : suivi des délais de 180 et 30 jours, remplissage automatique en hébreu des 8 formulaires PIBA/Nativ, 700 questions Beit Din et 300 questions d'entretien couple.",
    "es": "Hoja de ruta legal interactiva para Conversión (Guiur), Visa de Pareja y Aliyá en Israel: rastreador de plazos de 180 y 30 días, auto-rellenador en hebreo de los 8 formularios PIBA/Nativ, 700 preguntas del Beit Din y 300 preguntas de pareja.",
    "de": "Interaktiver Rechtsleitfaden für Giur, Partner-Visum und Alija in Israel: 180- & 30-Tage-Fristen-Tracker, automatisches Ausfüllen aller 8 hebräischen PIBA-/Nativ-Formulare, 700 Beit-Din-Karten und 300 Paar-Interview-Fragen.",
    "ru": "Интерактивный навигатор по Гиюру, СТУПРО и Алии в Израиле: контроль сроков 180 и 30 дней, автозаполнение на иврите всех 8 анкет МВД (PIBA) и Натив, 700 вопросов Бейт-Дина, 300 вопросов перекрёстного допроса пар и проверенные адвокаты."
}

ORG_NAME_I18N = {
    "en": "Giyur Aliyah Track — Israel Aliyah, Spousal Visa & Conversion Statutory Engine",
    "he": "Giyur Aliyah Track — מערכת טפסים, גיור, הליך מדורג ועלייה לישראל",
    "fr": "Giyur Aliyah Track — Portail Statutaire Aliyah, Visa Conjoint & Conversion en Israël",
    "es": "Giyur Aliyah Track — Plataforma Legal de Aliyá, Visa Conyugal y Conversión en Israel",
    "de": "Giyur Aliyah Track — Plattform für Alija, Partner-Visum & Giur in Israel",
    "ru": "Giyur Aliyah Track — Платформа подготовки документов для Алии, СТУПРО и Гиюра в Израиле"
}

def localize_global_jsonld(html_str, lang, canon_url):
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    sw_obj = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Giyur Aliyah Track",
        "url": canon_url,
        "inLanguage": lang,
        "applicationCategory": "ReferenceApplication",
        "operatingSystem": "Web, iOS, Android",
        "description": SW_APP_DESC_I18N.get(lang, SW_APP_DESC_I18N["en"]),
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}
    }
    org_obj = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": ORG_NAME_I18N.get(lang, ORG_NAME_I18N["en"]),
        "url": b_hub,
        "logo": "https://giyuraliyahtrack.com/bg-watercolor.jpg",
        "description": SW_APP_DESC_I18N.get(lang, SW_APP_DESC_I18N["en"]),
        "availableLanguage": ["en", "he", "fr", "es", "de", "ru"]
    }
    sw_tag = '<script type="application/ld+json">\n' + json.dumps(sw_obj, ensure_ascii=False) + '\n</script>'
    org_tag = '<script type="application/ld+json">\n' + json.dumps(org_obj, ensure_ascii=False) + '\n</script>'
    html_str = re.sub(
        r'<script type="application/ld\+json">\s*\{\s*"@context":\s*"https://schema\.org",\s*"@graph":\s*\[\s*\{\s*"@type":\s*"SoftwareApplication"[\s\S]*?</script>',
        lambda _: sw_tag, html_str, count=1
    )
    html_str = re.sub(
        r'<script type="application/ld\+json">\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*\[\s*"LegalService"[\s\S]*?</script>',
        lambda _: org_tag, html_str, count=1
    )
    return html_str

FORM_UNIQUE_SPECS_I18N = {
    "ash1": {
        "en": ("Form Ash/1 Page-by-Page Breakdown (2 Pages • Entry Visa & Va'adat Charigim)", [
            ("Page 1 — Applicant & Foreign Passport Block", "Full surname, given names, maiden/prior names (must match Birth Certificate & Police Check), parents' names + mother's maiden name, passport number, issue/expiry dates, and exact purpose of entry or Va'adat Charigim conversion exception."),
            ("Page 2 — Israeli Inviter / Host Undertaking", "Full name, 9-digit Israeli Teudat Zehut number, address, phone, and relationship of your Israeli Sponsoring Rabbi, Ulpan institution, or Israeli partner."),
            ("Mandatory Attachments Checklist", "5 Apostilled civil documents (<180 days), Hebrew Michtav Hesber (Explanation Letter), Sponsoring Rabbi + Host Family signed Hebrew letters with ID numbers, and health insurance proof.")
        ]),
        "he": ("פירוט מלא של טופס אש/1 עמוד-אחר-עמוד (2 עמודים • אשרת כניסה ווועדת חריגים)", [
            ("עמוד 1 — פרטי המבקש והדרכון הזר", "שם משפחה, שם פרטי, שמות קודמים/נעורים (חייב לתאום לתעודת הלידה ולתעודת היושר), שמות ההורים ושם נעורי האם, פרטי דרכון ונימוק הבקשה לוועדת חריגים."),
            ("עמוד 2 — פרטי המזמין / המוסד המארח בישראל", "שם מלא, תעודת זהות בת 9 ספרות, כתובת וטלפון של הרב המלווה, האולפן או בן הזוג הישראלי."),
            ("רשימת צרופות חובה לתיק", "5 תעודות מקור מאומתות באפוסטיל (פחות מ-180 יום), מכתב הסבר מנומק בעברית, מכתבי המלצה מרב מלווה ומשפחה מארחת עם ת״ז וביטוח רפואי.")
        ]),
        "fr": ("Structure Détaillée du Formulaire Ash/1 (2 Pages • Visa d'Entrée & Va'adat Charigim)", [
            ("Page 1 — Identité du Demandeur & Passeport", "Nom, prénoms, tous noms antérieurs/jeune fille (identiques à l'acte de naissance et au casier judiciaire), noms des parents + nom de jeune fille de la mère, passeport et motif légal."),
            ("Page 2 — Engagement de l'Invitant en Israël", "Nom complet, Teudat Zehut à 9 chiffres, adresse et téléphone du rabbin accompagnateur, de l'Oulpan ou du conjoint israélien."),
            ("Pièces Obligatoires à Joindre", "5 actes apostillés (<180 jours), Michtav Hesber en hébreu, lettres signées du rabbin et de la famille d'accueil avec numéros de TZ et assurance santé.")
        ]),
        "es": ("Desglose Página por Página del Formulario Ash/1 (2 Páginas • Visa y Va'adat Jariguim)", [
            ("Página 1 — Datos del Solicitante y Pasaporte", "Apellidos, nombres, apellidos de soltera/anteriores (idénticos a partida de nacimiento y antecedentes), nombres de padres + apellido materno de soltera, pasaporte y motivo legal."),
            ("Página 2 — Compromiso del Invitante en Israel", "Nombre completo, Teudat Zehut de 9 dígitos, dirección y teléfono del rabino patrocinador, Ulpán o pareja israelí."),
            ("Anexos Obligatorios", "5 documentos apostillados (<180 días), Mijtav Hesber en hebreo, cartas firmadas del rabino y familia anfitriona con TZ y seguro médico.")
        ]),
        "de": ("Seitenweise Aufschlüsselung Formular Ash/1 (2 Seiten • Einreisevisum & Va'adat Charigim)", [
            ("Seite 1 — Antragsteller & Reisepassdaten", "Familienname, Vornamen, Geburts-/frühere Namen (exakt wie Geburtsurkunde & Führungszeugnis), Namen der Eltern + Geburtsname der Mutter, Passdaten & Antragsgrund."),
            ("Seite 2 — Verpflichtung des Einladers in Israel", "Vollständiger Name, 9-stellige Teudat-Zehut-Nr., Adresse und Telefon des begleitenden Rabbiners, Ulpans oder israelischen Partners."),
            ("Pflichtanlagen zum Antrag", "5 apostillierte Urkunden (<180 Tage), hebräisches Michtav Hesber, unterschriebene Briefe von Rabbiner & Gastfamilie mit TZ-Nummern sowie Krankenversicherung.")
        ]),
        "ru": ("Постраничный разбор анкеты Аш/1 (2 страницы • Виза въезда и Ваадат Харигим)", [
            ("Страница 1 — Данные заявителя и загранпаспорта", "Фамилия, имя, все прежние/девичьи фамилии (строго как в свидетельстве о рождении и справке о несудимости), имена родителей + девичья фамилия матери, паспорт и цель подачи."),
            ("Страница 2 — Обязательство приглашающей стороны в Израиле", "ФИО на иврите, 9-значный Теудат-Зеут, адрес и телефон сопровождающего раввина, ульпана или израильского партнёра."),
            ("Обязательный пакет приложений", "5 оригиналов документов с апостилем (<180 дней), письмо-объяснение Михтав Эсбер на иврите, письма раввина и принимающей семьи с номерами ТЗ, медстраховка.")
        ])
    },
    "ash3": {
        "en": ("Form Ash/3 Page-by-Page Breakdown (2 Pages • B/2 Extension & Change to A/2, B/1, or A/5)", [
            ("Page 1 — Current Visa, Entry Port & Extension Target", "Exact last border entry date, port of entry, current visa type (B/2 tourist), requested number of months, or target status switch (A/2 Ulpan student, B/1 work permit, A/5 temporary resident)."),
            ("Page 2 — Parents' Birth Dates, Israeli Address & Statutory Declarations", "Requires both parents' dates of birth, mother's maiden name, active Israeli mobile number & legal notice email, plus clerk-witnessed signature."),
            ("Zero-Overstay Protection Rule", "File before day 90 of your B/2 entry slip and demand a stamped submission receipt (Ishur Hagasha) to prevent unlawful presence flags.")
        ]),
        "he": ("פירוט מלא של טופס אש/3 עמוד-אחר-עמוד (2 עמודים • הארכת B/2 והחלפת אשרה ל-A/2, B/1 או א/5)", [
            ("עמוד 1 — פרטי כניסה אחרונה, אשרה נוכחית והאשרה המבוקשת", "תאריך כניסה אחרון לישראל, מעבר גבול, סוג אשרה נוכחי (B/2), מספר חודשי ההארכה או המעמד המבוקש (א/2 לימודי גיור, ב/1 או א/5)."),
            ("עמוד 2 — תאריכי לידת הורים, כתובת בישראל והצהרת המבקש", "חובה למלא תאריכי לידה של שני ההורים, שם נעורי האם, כתובת ומספר נייד בישראל, ודוא״ל להמצאת החלטות רשמיות."),
            ("הגנה מפני שהיית יתר", "יש להגיש לפני תום 90 הימים של אשרת התייר ולשמור אישור הגשה חתום למניעת סירוב וצו הרחקה.")
        ]),
        "fr": ("Structure Détaillée du Formulaire Ash/3 (2 Pages • Prolongation B/2 & Passage A/2, B/1, A/5)", [
            ("Page 1 — Dernière Entrée, Visa Actuel & Statut Demandé", "Date et point d'entrée en Israël, visa actuel (B/2), durée de prolongation souhaitée ou changement vers A/2 (Oulpan), B/1 ou A/5."),
            ("Page 2 — Dates de Naissance des Parents & Coordonnées en Israël", "Dates de naissance du père et de la mère, nom de jeune fille de la mère, adresse complète en Israël et email officiel de notification."),
            ("Règle Anti-Dépassement de Séjour", "Déposez avant l'expiration des 90 jours du visa B/2 et conservez le récépissé tamponné (Ishur Hagasha).")
        ]),
        "es": ("Desglose Página por Página del Formulario Ash/3 (2 Páginas • Prórroga B/2 y Cambio a A/2, B/1, A/5)", [
            ("Página 1 — Última Entrada, Visa Actual y Categoría Solicitada", "Fecha y frontera de última entrada, visa actual (B/2), meses de prórroga o cambio de categoría a A/2 (Ulpán), B/1 o A/5."),
            ("Página 2 — Fechas de Nacimiento de los Padres y Domicilio en Israel", "Fechas de nacimiento de padre y madre, apellido materno de soltera, dirección en Israel y correo para notificaciones legales."),
            ("Escudo Contra Estadía Ilegal", "Presente antes del día 90 de su permiso B/2 y exija comprobante sellado de presentación.")
        ]),
        "de": ("Seitenweise Aufschlüsselung Formular Ash/3 (2 Seiten • B/2-Verlängerung & Wechsel zu A/2, B/1, A/5)", [
            ("Seite 1 — Letzte Einreise, Aktuelles Visum & Zielkategorie", "Einreisedatum, Grenzübergang, aktuelles B/2-Visum, gewünschte Verlängerungsmonate oder Wechsel auf A/2, B/1 bzw. A/5."),
            ("Seite 2 — Geburtsdaten der Eltern & Israelische Zustelladresse", "Geburtsdaten beider Eltern, Geburtsname der Mutter, israelische Adresse, Handynummer und amtliche E-Mail-Adresse."),
            ("Schutz vor Visum-Überziehung", "Vor Ablauf der 90-Tage-Frist einreichen und gestempelten Einreichungsnachweis sichern.")
        ]),
        "ru": ("Постраничный разбор анкеты Аш/3 (2 страницы • Продление B/2 и переход на A/2, B/1, А/5)", [
            ("Страница 1 — Последний въезд, текущая виза и запрашиваемый статус", "Дата и пункт последнего въезда, текущая турвиза B/2, срок продления в месяцах или смена категории на студенческую A/2, рабочую B/1 или А/5."),
            ("Страница 2 — Даты рождения родителей и адрес в Израиле", "Обязательны даты рождения отца и матери, девичья фамилия матери, точный адрес в Израиле, телефон и email для юридических уведомлений МВД."),
            ("Защита от просрочки визы", "Подавайте строго до истечения 90 дней турвизы B/2 с получением штампа о приёме документов.")
        ])
    },
    "ash6": {
        "en": ("Form Ash/6 Complete 6-Page Dossier Breakdown (Nohal 5.2.0008 Ed. 16 • Married Spouses)", [
            ("Pages 1–2 — Foreign Spouse & Israeli Citizen Bio + Grandfathers", "Full details of both spouses including paternal grandfathers' names (mandatory!), all countries lived >1 year since age 14, and civil marriage details (including Utah Zoom marriage under AAA 7368/22)."),
            ("Pages 3–4 — Joint Center-of-Life Declarations & 2 Israeli Witnesses", "Names, 9-digit TZ numbers, addresses, and phone numbers of 2 Israeli acquaintances confirming the sincerity of your marriage, plus dual-track Giyur protection (Sec. ג.10)."),
            ("Pages 5–6 — Statutory Landlord / Property Lease Affidavit", "Exact apartment size in square meters (מ״ר), floor, number of rooms, landlord's name & 9-digit TZ, and utility bill responsibility (Arnona,iec, water).")
        ]),
        "he": ("פירוט אוגדן 6 העמודים של טופס אש/6 (נוהל 5.2.0008 מהדורה 16 • בני זוג נשואים)", [
            ("עמודים 1–2 — פרטי בן הזוג הזר והאזרח הישראלי + שמות הסבים", "פרטים מלאים כולל שם הסב (אבי האב — שדה חובה!), כל המדינות בהן התגורר המבקש מעל שנה מגיל 14, ופרטי הנישואין האזרחיים (כולל נישואי יוטה לפי עע״מ 7368/22)."),
            ("עמודים 3–4 — הצהרות מרכז חיים ופרטי 2 ממליצים ישראלים", "שמות מלאים, ת״ז בת 9 ספרות, כתובות וטלפונים של 2 מכרים ישראלים המעידים על כנות הקשר, בתוספת הגנת סעיף ג.10 למסלול גיור במקביל."),
            ("עמודים 5–6 — תצהיר בעל הדירה / שכר דירה מפורט", "שטח הדירה במ״ר, קומה, מספר חדרים, שם ות״ז של המשכיר וחלוקת תשלומי ארנונה, חשמל ומים.")
        ]),
        "fr": ("Détail Complet des 6 Pages du Formulaire Ash/6 (Nohal 5.2.0008 Éd. 16 • Couples Mariés)", [
            ("Pages 1–2 — Conjoint Étranger, Citoyen Israélien & Grands-Pères", "Identité complète des époux incluant les prénoms des grands-pères paternels (obligatoire !), pays habités >1 an depuis 14 ans et mariage civil (dont Utah Zoom AAA 7368/22)."),
            ("Pages 3–4 — Centre de Vie Commun & 2 Témoins Israéliens", "Noms, TZ à 9 chiffres, adresses et téléphones de 2 témoins israéliens attestant la vie commune + protection double parcours Giyur (art. ג.10)."),
            ("Pages 5–6 — Attestation du Propriétaire & Bail d'Habitation", "Surface exacte en m² (מ״ר), étage, nombre de pièces, identité et TZ du bailleur et prise en charge Arnona/eau/électricité.")
        ]),
        "es": ("Desglose de las 6 Páginas del Formulario Ash/6 (Nohal 5.2.0008 Ed. 16 • Cónyuges Casados)", [
            ("Páginas 1–2 — Cónyuge Extranjero, Ciudadano Israelí y Abuelos", "Datos completos incluyendo el nombre del abuelo paterno (¡obligatorio!), países vividos >1 año desde los 14 años y matrimonio civil (incluida boda Zoom de Utah AAA 7368/22)."),
            ("Páginas 3–4 — Centro de Vida y 2 Testigos Israelíes", "Nombres, TZ de 9 dígitos, direcciones y teléfonos de 2 testigos israelíes que confirmen la relación + protección doble vía Guiur (art. ג.10)."),
            ("Páginas 5–6 — Declaración del Propietario y Contrato de Alquiler", "Superficie exacta en m², piso, habitaciones, nombre y TZ del propietario y pago de Arnona, luz y agua.")
        ]),
        "de": ("Aufschlüsselung aller 6 Seiten von Formular Ash/6 (Nohal 5.2.0008 Ed. 16 • Verheiratete Paare)", [
            ("Seiten 1–2 — Ausländischer Partner, Israeli & Großväter", "Alle Personendaten inkl. Namen der Großväter väterlicherseits (Pflichtfeld!), Wohnsitzländer >1 Jahr ab 14 J. sowie Zivilehe (inkl. Utah-Zoom-Heirat AAA 7368/22)."),
            ("Seiten 3–4 — Lebensmittelpunkt & 2 Israelische Zeugen", "Name, 9-stellige TZ, Adresse & Telefon zweier israelischer Referenzpersonen + Doppel-Track-Giur-Schutz (Abs. ג.10)."),
            ("Seiten 5–6 — Vermieter- & Wohnungs-Affidavit", "Exakte Quadratmeterzahl (מ״ר), Etage, Zimmeranzahl, Name & TZ des Vermieters sowie Nebenkosten-Regelung (Arnona, Strom, Wasser).")
        ]),
        "ru": ("Разбор всех 6 страниц анкеты Аш/6 (Ноаль 5.2.0008 Ред. 16 • Зарегистрированные супруги)", [
            ("Страницы 1–2 — Данные обоих супругов и имена дедушек по отцу", "Полные анкетные данные, включая имя дедушки по отцовской линии (обязательное поле!), все страны проживания >1 года с 14 лет и данные брака (включая онлайн-брак Юта AAA 7368/22)."),
            ("Страницы 3–4 — Центр жизни и 2 израильских свидетеля", "ФИО, 9-значный ТЗ, адреса и телефоны двух граждан Израиля, подтверждающих подлинность брака + защита параллельного гиюра (п. ג.10)."),
            ("Страницы 5–6 — Декларация арендодателя и параметров квартиры", "Площадь квартиры в кв. м (מ״ר), этаж, число комнат, ФИО и ТЗ владельца жилья, оплата арноны, воды и электричества.")
        ])
    },
    "ash456": {
        "en": ("Form Ash/456 Page-by-Page Breakdown (3 Pages • Nohal 5.2.0001 In-Israel Aliyah / Oleh)", [
            ("Page 1 — Applicant Identity, Accompanying Family & Prior Names", "Hebrew + exact Latin passport names, all maiden/prior names, accompanying spouse/children under 18, and passport validity (>12 months recommended)."),
            ("Page 2 — Prior Israel Stays, Severing Overseas Ties & Settlement Plan", "Chronological table of past visits to Israel (used to calculate the 24-month Sal Klita rule!), Israeli bank, Kupat Cholim choice, and years of schooling."),
            ("Page 3 — Law of Return Clause (§1 Jewish by Birth, §4B Conversion, §4A Family) & Fee Exemption", "Selects your exact Law of Return eligibility basis and triggers the Nohal 5.2.0001 Sec. ג.7 955₪ fee exemption.")
        ]),
        "he": ("פירוט עמודי טופס אש/456 (3 עמודים • נוהל 5.2.0001 שינוי מעמד לעולה מתוך ישראל)", [
            ("עמוד 1 — פרטי המבקש, שמות קודמים ובני משפחה נלווים", "שם בעברית ובלועזית בדיוק לפי הדרכון, שמות נעורים/קודמים, פרטי בן זוג וילדים מתחת לגיל 18."),
            ("עמוד 2 — היסטוריית שהיות בישראל, ניתוק זיקה מחו״ל וקליטה", "טבלת כניסות ויציאות מישראל (קובעת את זכאות סל הקליטה לפי מבחן 24 החודשים!), קופת חולים, בנק ושנות לימוד."),
            ("עמוד 3 — סעיף הזכאות בחוק השבות ופטור מאגרה (סעיף ג.7)", "בחירת סעיף הזכאות המדויק (סעיף 1, סעיף 4ב מתגיירים או סעיף 4א בני משפחה) ומימוש הפטור מאגרת שינוי מעמד.")
        ]),
        "fr": ("Détail des 3 Pages du Formulaire Ash/456 (Nohal 5.2.0001 • Aliyah en Israël / Shinui Ma'amad)", [
            ("Page 1 — Identité, Noms Antérieurs & Famille Accompagnante", "Noms en hébreu et latin conformes au passeport, noms antérieurs et enfants mineurs accompagnants."),
            ("Page 2 — Historique des Séjours en Israël & Installation", "Tableau chronologique des séjours passés en Israël (déterminant le plafond de 24 mois du Sal Klita !), Kupat Holim, banque et études."),
            ("Page 3 — Clause de la Loi du Retour (§1, §4B Conversion, §4A) & Exonération", "Ancrage juridique exact sous la Loi du Retour et exonération des frais de dossier (art. ג.7).")
        ]),
        "es": ("Desglose de las 3 Páginas del Formulario Ash/456 (Nohal 5.2.0001 • Aliyá en Israel)", [
            ("Página 1 — Identidad, Nombres Anteriores y Familiares", "Nombres en hebreo y latín según pasaporte, apellidos anteriores e hijos menores acompañantes."),
            ("Página 2 — Estadías Previas en Israel y Plan de Absorción", "Tabla de entradas y salidas de Israel (¡clave para la regla de 24 meses de Sal Klita!), Kupat Jolim, banco y años de estudio."),
            ("Página 3 — Cláusula de la Ley del Retorno (§1, §4B Conversión, §4A) y Exención", "Base legal exacta bajo la Ley del Retorno y exención oficial de tasas (art. ג.7).")
        ]),
        "de": ("Aufschlüsselung der 3 Seiten von Formular Ash/456 (Nohal 5.2.0001 • Inlands-Alija / Oleh)", [
            ("Seite 1 — Personendaten, Frühere Namen & Begleitende Familie", "Hebräische und lateinische Passschreibweise, Geburtsnamen sowie begleitende Ehepartner/Kinder unter 18."),
            ("Seite 2 — Frühere Israel-Aufenthalte & Integrationsplan", "Chronologische Aufenthaltstabelle (entscheidend für die 24-Monate-Grenze beim Sal Klita!), Krankenkasse, Bank & Ausbildungsjahre."),
            ("Seite 3 — Anspruchsgrundlage Rückkehrgesetz (§1, §4B Giur, §4A) & Gebührenbefreiung", "Exakte Paragraphen-Zuordnung und Gebührenbefreiung nach Nohal 5.2.0001 Abs. ג.7.")
        ]),
        "ru": ("Постраничный разбор анкеты Аш/456 (3 страницы • Ноаль 5.2.0001 Репатриация внутри Израиля)", [
            ("Страница 1 — Личные данные, прежние фамилии и члены семьи", "Точное написание на иврите и латиницей по загранпаспорту, девичьи фамилии и несовершеннолетние дети."),
            ("Страница 2 — История пребываний в Израиле и план абсорбции", "Таблица всех въездов в Израиль (по ней считается порог 24 месяцев для корзины Саль Клита!), больничная касса, банк и годы учёбы."),
            ("Страница 3 — Статья Закона о возвращении (§1, §4Б Гиюр, §4А) и освобождение от пошлины", "Указание точного параграфа ЗОВ и освобождение от госпошлины по п. ג.7 Ноаль 5.2.0001.")
        ])
    },
    "mr14a": {
        "en": ("Form MR/14a Registry Walkthrough (1 Page • First Biometric Teudat Zehut)", [
            ("Population Registry Core Fields", "Hebrew + Latin full names, Hebrew calendar date of birth (auto-calculated if needed), father's, mother's, and paternal grandfather's names, marital status, and religion/nationality entry."),
            ("Clerk-Only Boxes You Must Leave Blank", "Leave the 'Newly Assigned 9-Digit Israeli ID Number' box and the bottom witness signature box blank until seated directly in front of the PIBA registry officer.")
        ]),
        "he": ("פירוט טופס מר/14א לרישום במרשם האוכלוסין (עמוד 1 • תעודת זהות ביומטרית ראשונה)", [
            ("שדות הליבה במרשם האוכלוסין (מערכת אביב)", "שם מלא בעברית ובלועזית, תאריך לידה לועזי ועברי, שם האב, האם והסב מצד האב, מצב אישי וסעיף דת/לאום."),
            ("משבצות שאסור למלא מראש לפני המעמד מול הפקיד", "השאירו ריקה את משבצת מספר הזהות הישראלי החדש ואת חתימת ההצהרה התחתונה עד למעמד הפקיד בלשכה.")
        ]),
        "fr": ("Guide du Formulaire MR/14a (1 Page • Première Teudat Zehut Biométrique)", [
            ("Champs du Registre de la Population", "Noms en hébreu et latin, date de naissance grégorienne et hébraïque, noms du père, de la mère et du grand-père paternel, état civil."),
            ("Cases Réservées au Guichetier", "Ne remplissez jamais la case du nouveau numéro d'identité à 9 chiffres et ne signez qu'en présence de l'officier PIBA.")
        ]),
        "es": ("Guía del Formulario MR/14a (1 Página • Primera Teudat Zehut Biométrica)", [
            ("Campos del Registro de Población", "Nombres en hebreo y latín, fecha de nacimiento gregoriana y hebrea, nombres de padre, madre y abuelo paterno, estado civil."),
            ("Casillas Exclusivas ante el Funcionario", "Deje en blanco el nuevo número de identidad de 9 dígitos y firme únicamente frente al oficial de Misrad HaPanim.")
        ]),
        "de": ("Aufschlüsselung Formular MR/14a (1 Seite • Erste Biometrische Teudat Zehut)", [
            ("Kernfelder des Bevölkerungsregisters", "Hebräische & lateinische Namen, gregorianisches & hebräisches Geburtsdatum, Namen von Vater, Mutter & Großvater väterlicherseits."),
            ("Freizulassende Schalterfelder", "Neue 9-stellige ID-Nummer niemals vorab eintragen und Unterschrift erst direkt vor dem PIBA-Beamten leisten.")
        ]),
        "ru": ("Разбор анкеты МР/14а (1 страница • Первичный реестр и биометрический Теудат-Зеут)", [
            ("Ключевые графы Реестра населения (система «Авив»)", "Имя на иврите и латиницей, григорианская и еврейская даты рождения, имена отца, матери и дедушки по отцу, семейное положение."),
            ("Графы, заполняемые только при чиновнике", "Не вписывайте новый 9-значный номер ТЗ заранее и ставьте подпись строго перед инспектором МВД.")
        ])
    },
    "mr14b": {
        "en": ("Form MR/14b Walkthrough (1 Page • First Israeli Travel Document / Darkon & Dual Nationality)", [
            ("Character-by-Character Passport Grid", "Stamps exact uppercase Latin letters one character per box matching your foreign passport plus Hebrew transliteration so your Darkon / Teudat Ma'avar never mismatches airline tickets."),
            ("Foreign Citizenship & Minor Consent Rules", "Declares all foreign citizenships held under Israeli law and includes dual-parent consent signature blocks if registering a child under 18.")
        ]),
        "he": ("פירוט טופס מר/14ב (עמוד 1 • הצהרת אזרחות זרה ובקשה לדרכון / תעודת מעבר ראשונה)", [
            ("משבצות איות לטיני ועברי מדויק לדרכון", "שיבוץ אות-אחר-אות באנגלית גדולה (A–Z) בתאימות מלאה לדרכון הזר ולצד העברית למניעת פערי שמות בכרטיסי טיסה."),
            ("הצהרת אזרחויות זרות והסכמת הורים לקטינים", "דיווח כחוק על כלל האזרחויות הנוספות ומשבצות חתימת שני ההורים עבור קטינים מתחת לגיל 18.")
        ]),
        "fr": ("Guide du Formulaire MR/14b (1 Page • Premier Passeport Israélien Darkon / Teudat Ma'avar)", [
            ("Grille d'Orthographe Case par Case", "Imprime chaque lettre latine majuscule case par case exactement comme sur votre passeport étranger + hébreu."),
            ("Double Nationalité & Consentement Parental", "Déclaration des nationalités étrangères et accord des deux parents requis pour tout mineur de moins de 18 ans.")
        ]),
        "es": ("Guía del Formulario MR/14b (1 Página • Primer Pasaporte Israelí Darkon / Teudat Ma'avar)", [
            ("Cuadrícula de Ortografía Casilla por Casilla", "Estampa cada letra latina mayúscula casilla por casilla igual a su pasaporte extranjero junto con el nombre en hebreo."),
            ("Doble Ciudadanía y Menores de 18 Años", "Declaración de ciudadanías extranjeras y firma obligatoria de ambos padres para menores de edad.")
        ]),
        "de": ("Aufschlüsselung Formular MR/14b (1 Seite • Erster Israelischer Pass Darkon / Teudat Ma'avar)", [
            ("Buchstabengenaue Pass-Rasterfelder", "Trägt jeden lateinischen Großbuchstaben exakt Kästchen für Kästchen gemäß Auslandsreisepass sowie auf Hebräisch ein."),
            ("Doppelstaatsbürgerschaft & Minderjährige", "Meldung weiterer Staatsangehörigkeiten sowie Zustimmung beider Eltern bei Kindern unter 18 Jahren.")
        ]),
        "ru": ("Разбор анкеты МР/14б (1 страница • Первый Даркон / Теудат-Маавар и второе гражданство)", [
            ("Поклеточное заполнение имени латиницей и на иврите", "Вписывает каждую заглавную латинскую букву строго по клеточкам в соответствии с загранпаспортом во избежание расхождений в авиабилетах."),
            ("Уведомление об иных гражданствах и согласие родителей", "Фиксация всех иностранных гражданств и блок согласия обоих родителей для детей младше 18 лет.")
        ])
    },
    "nespach_alef": {
        "en": ("Nespach Alef 13-Clause Affidavit Breakdown (Nohal 5.2.0009 Ed. 17 • Unmarried / Common-Law Couples)", [
            ("All 13 Statutory Sincerity & Exclusivity Clauses", "Affirms exclusive romantic partnership, continuous shared household management, absence of any simultaneous marriage/partnership with third parties, and full awareness of criminal penalties for false declarations."),
            ("Mandatory Israeli Lawyer / Court Execution Rule", "Both partners must sign Nespach Alef in person before a licensed Israeli attorney (who verifies foreign passport + Israeli TZ numbers and affixes an official Israeli Bar stamp).")
        ]),
        "he": ("פירוט תצהיר 13 הסעיפים — נספח א׳ (נוהל 5.2.0009 מהדורה 17 • בני זוג ידועים בציבור)", [
            ("13 סעיפי החובה לכנות הקשר וניהול משק בית משותף", "הצהרה הדדית על קשר זוגי בלעדי, מגורים משותפים, היעדר נישואין או זוגיות מקבילה עם אדם אחר והבנת המשמעות הפלילית של תצהיר כוזב."),
            ("חובת אימות חתימה בפני עורך דין ישראלי", "שני בני הזוג חייבים לחתום על נספח א׳ בפני עורך דין בעל רישיון ישראלי המאמת את הדרכון הזר ותעודת הזהות ומטביע חותמת רשמית.")
        ]),
        "fr": ("Détail des 13 Clauses de Nespach Alef (Nohal 5.2.0009 Éd. 17 • Couples Non Mariés / Concubins)", [
            ("Les 13 Clauses Légales de Vie Commune", "Atteste l'exclusivité du couple, la gestion d'un foyer commun, l'absence de lien matrimonial parallèle et la sincérité du dossier."),
            ("Signature Obligatoire devant Avocat Israélien", "Les deux partenaires doivent signer Nespach Alef devant un avocat israélien inscrit au Barreau qui appose son sceau officiel.")
        ]),
        "es": ("Desglose de las 13 Cláusulas de Nespaj Alef (Nohal 5.2.0009 Ed. 17 • Parejas de Hecho)", [
            ("Las 13 Cláusulas Legales de Convivencia", "Certifica relación exclusiva, hogar compartido continuo, ausencia de matrimonio paralelo y veracidad bajo juramento."),
            ("Firma Obligatoria ante Abogado Israelí", "Ambos miembros de la pareja deben firmar Nespaj Alef en presencia de un abogado israelí colegiado con sello oficial.")
        ]),
        "de": ("Aufschlüsselung der 13 Klauseln von Nespach Alef (Nohal 5.2.0009 Ed. 17 • Unverheiratete Lebenspartner)", [
            ("Alle 13 Pflichtklauseln zur Lebensgemeinschaft", "Bestätigt exklusive Partnerschaft, gemeinsamen Haushalt, Ehelosigkeit gegenüber Dritten und strafrechtliche Belehrung."),
            ("Beglaubigung durch Israelischen Rechtsanwalt", "Beide Partner müssen Nespach Alef persönlich vor einem zugelassenen israelischen Anwalt mit Kammerstempel unterzeichnen.")
        ]),
        "ru": ("Разбор всех 13 пунктов декларации Неспах Алеф (Ноаль 5.2.0009 Ред. 17 • Гражданские супруги)", [
            ("13 обязательных пунктов о совместном быте и искренности союза", "Подтверждает исключительность отношений, ведение общего хозяйства, отсутствие параллельных браков и ответственность за дачу ложных показаний."),
            ("Обязательное заверение израильским адвокатом", "Оба партнёра подписывают Неспах Алеф лично перед лицензированным адвокатом в Израиле с печатью Коллегии адвокатов.")
        ])
    },
    "sec_cv": {
        "en": ("Nativ 11-Page Hebrew Questionnaire Breakdown (Security & Family Biography • Aliyah from FSU / Ordered Cases)", [
            ("Pages 1–5 — Zero-Gap Education, Military & Employment Chronology", "Every university, scholarship, workplace, and residential address since age 18 with zero unexplained chronological gaps."),
            ("Pages 6–11 — Landscape First-Degree Family & Relatives in Israel Tables", "Full names, birth dates/places, occupations, and addresses of parents, siblings, spouses, children, and relatives already residing in Israel.")
        ]),
        "he": ("פירוט שאלון 11 העמודים של נתיב (קורות חיים ופרטי משפחה מורחבים)", [
            ("עמודים 1–5 — רצף לימודים, שירות ותעסוקה ללא פערי זמנים", "פירוט מלא של מוסדות השכלה גבוהה, מלגות, מקומות עבודה וכתובות מגורים מגיל 18 ללא חודשים חסרים."),
            ("עמודים 6–11 — טבלאות רוחב של בני משפחה מדרגה ראשונה וקרובים בישראל", "שמות מלאים, תאריכי ומקומות לידה, משלח יד וכתובות של הורים, אחים, בני זוג, ילדים וקרובים החיים בישראל.")
        ]),
        "fr": ("Détail du Questionnaire Nativ de 11 Pages (Biographie & Famille • Contrôle Nativ)", [
            ("Pages 1–5 — Chronologie Sans Interruption (Études & Emplois)", "Universités, bourses, employeurs et adresses depuis l'âge de 18 ans sans aucune période vide."),
            ("Pages 6–11 — Tableaux Familiaux au 1er Degré & Proches en Israël", "Identité complète, dates/lieux de naissance, professions et adresses des parents, frères/sœurs, conjoints et proches en Israël.")
        ]),
        "es": ("Desglose del Cuestionario Nativ de 11 Páginas (Historial Familiar y Laboral)", [
            ("Páginas 1–5 — Cronología Continua de Estudios y Empleos", "Universidades, becas, trabajos y domicilios desde los 18 años sin vacíos temporales."),
            ("Páginas 6–11 — Tablas de Familiares de Primer Grado y Parientes en Israel", "Nombres completos, fechas/lugares de nacimiento, ocupaciones y direcciones de padres, hermanos, cónyuges e hijos.")
        ]),
        "de": ("Aufschlüsselung des 11-Seitigen Nativ-Fragebogens (Lebenslauf & Familienchronik)", [
            ("Seiten 1–5 — Lückenlose Ausbildungs- & Berufschronologie", "Alle Hochschulen, Stipendien, Arbeitgeber und Wohnadressen ab dem 18. Lebensjahr ohne Zeitlücken."),
            ("Seiten 6–11 — Querformat-Tabellen für Familie 1. Grades & Verwandte in Israel", "Namen, Geburtsdaten/-orte, Berufe und Adressen von Eltern, Geschwistern, Partnern, Kindern und Verwandten in Israel.")
        ]),
        "ru": ("Постраничный разбор 11-страничной анкеты «Натив» (Биография, карьера и родственники)", [
            ("Страницы 1–5 — Непрерывная хронология учёбы, службы и работы", "Все вузы, специальности, места работы, должности и адреса проживания с 18 лет без единого временного пробела."),
            ("Страницы 6–11 — Альбомные таблицы близких родственников и родни в Израиле", "Полные ФИО, даты и места рождения, род занятий и адреса родителей, братьев/сестёр, супругов, детей и родственников в Израиле.")
        ])
    }
}

SAL_KLITA_SNIPPET_TABLE_I18N = {
    "en": ("📊 2026 Sal Klita, Bituach Leumi & In-Israel Aliyah Statutory Cliff Table", ["Benefit / Rule", "Eligible (<24 Months in Israel)", "Trap / Disqualifier (>24 Months or Tourist)"], [
        ["Sal Klita Cash Grant (Single / Couple)", "~21,700 ₪ (Single) / ~41,500 ₪ (Couple)", "0 ₪ if >24 cumulative months in Israel in prior 3 years (Nohal 5.2.0001)"],
        ["Form Ash/456 PIBA Filing Fee", "0 ₪ (Exempt under Nohal 5.2.0001 Sec. ג.7)", "Tourists paying lawyers 15,000–30,000 ₪ unnecessarily"],
        ["Kupat Cholim Health Insurance", "Immediate Day-1 coverage upon Oleh / A/5 (if qualifying)", "183-day Bituach Leumi waiting period on spousal A/5 transition without bridge"],
        ["Income Tax Credit Points (Nekudot Zikui)", "4.5-year staggered Israeli tax credits", "Clock starts from Teudat Oleh date — verify residency alignment"]
    ]),
    "he": ("📊 טבלת השוואה 2026: סל קליטה, ביטוח לאומי ומלכודת 24 החודשים בעלייה מהארץ", ["הטבה / נוהל רשמי", "זכאות מלאה (פחות מ-24 חודשים בארץ)", "המלכודת / שלילת הזכאות"], [
        ["מענק סל קליטה (יחיד / זוג)", "כ-21,700 ₪ ליחיד / כ-41,500 ₪ לזוג", "0 ₪ למי ששהה מעל 24 חודשים מצטברים בישראל ב-3 השנים האחרונות"],
        ["אגרת טופס אש/456 במשרד הפנים", "0 ₪ — פטור מלא לפי נוהל 5.2.0001 סע׳ ג.7", "תשלום מיותר של 15,000–30,000 ₪ למשרדי עו״ד על הגשת אותו טופס"],
        ["ביטוח בריאות ממלכתי (קופת חולים)", "כיסוי מיידי לעולה חדש עם רישום במרשם", "תקופת המתנה של 183 יום במעבר למעמד א/5 בהליך מדורג ללא ביטוח גישור"],
        ["נקודות זיכוי במס הכנסה לעולים", "הטבת מס מדורגת למשך 4.5 שנים", "מניין החודשים נספר מיום קבלת מעמד העולה"]
    ]),
    "fr": ("📊 Barème Officiel 2026 : Sal Klita, Bituach Leumi & Piège des 24 Mois", ["Droit / Règle PIBA", "Éligible (<24 Mois en Israël)", "Piège / Perte des Droits"], [
        ["Prime Sal Klita (Seul / Couple)", "~21 700 ₪ (Seul) / ~41 500 ₪ (Couple)", "0 ₪ si >24 mois cumulés en Israël sur les 3 dernières années"],
        ["Frais de Dossier Formulaire Ash/456", "0 ₪ (Exonéré selon Nohal 5.2.0001 art. ג.7)", "15 000–30 000 ₪ facturés inutilement par les cabinets privés"],
        ["Assurance Santé (Kupat Holim)", "Couverture immédiate dès le statut Oleh", "Délai de carence de 183 jours en statut A/5 conjoint sans assurance relais"],
        ["Crédits d'Impôt (Nekudot Zikui)", "Allègement fiscal progressif sur 4,5 ans", "Le compteur démarre à la date d'émission de la Teudat Oleh"]
    ]),
    "es": ("📊 Tabla Oficial 2026: Sal Klita, Bituaj Leumí y la Regla de los 24 Meses", ["Beneficio / Regla PIBA", "Elegible (<24 Meses en Israel)", "Trampa / Pérdida del Beneficio"], [
        ["Beca Sal Klita (Individual / Pareja)", "~21.700 ₪ (Solo) / ~41.500 ₪ (Pareja)", "0 ₪ si superó 24 meses acumulados en Israel en los últimos 3 años"],
        ["Tasa Oficial Formulario Ash/456", "0 ₪ (Exento bajo Nohal 5.2.0001 art. ג.7)", "15.000–30.000 ₪ cobrados innecesariamente por abogados"],
        ["Cobertura Médica (Kupat Jolim)", "Activa desde el día 1 como Olé Jadash", "183 días de carencia en Bituaj Leumí al pasar a visa A/5 conyugal"],
        ["Créditos Fiscales (Nekudot Zikui)", "4,5 años de reducción en impuesto sobre la renta", "El plazo cuenta desde la fecha de emisión de la Teudat Oleh"]
    ]),
    "de": ("📊 Offizielle Übersicht 2026: Sal Klita, Bituach Leumi & 24-Monate-Falle", ["Leistung / PIBA-Regel", "Anspruch (<24 Monate in Israel)", "Falle / Anspruchsverlust"], [
        ["Sal Klita Eingliederungsgeld", "~21.700 ₪ (Einzeln) / ~41.500 ₪ (Paar)", "0 ₪ bei >24 kumulierten Monaten in Israel in den letzten 3 Jahren"],
        ["Amtsgebühr Formular Ash/456", "0 ₪ (Gebührenfrei nach Nohal 5.2.0001 Abs. ג.7)", "Unnötige 15.000–30.000 ₪ Anwaltsgebühren für denselben Antrag"],
        ["Gesetzliche Krankenkasse (Kupat Cholim)", "Sofortiger Schutz ab Oleh-Registrierung", "183 Tage Wartezeit beim Wechsel auf A/5-Partnerstatus ohne Überbrückung"],
        ["Steuerfreibeträge (Nekudot Zikui)", "4,5 Jahre gestaffelte Einkommensteuer-Rabatte", "Fristbeginn ab Ausstellungsdatum der Teudat Oleh"]
    ]),
    "ru": ("📊 Официальная таблица 2026: Саль Клита, Битуах Леуми и ловушка 24 месяцев", ["Льгота / Регламент МВД", "Полное право (<24 мес. в Израиле)", "Ловушка / Потеря выплаты"], [
        ["Корзина абсорбции Саль Клита", "~21 700 ₪ (одиночка) / ~41 500 ₪ (пара)", "0 ₪ при пребывании >24 суммарных месяцев за последние 3 года"],
        ["Госпошлина за анкету Аш/456 в МВД", "0 ₪ (освобождение по Ноаль 5.2.0001 п. ג.7)", "Переплата 15 000–30 000 ₪ посредникам за бесплатную процедуру"],
        ["Больничная касса (Купат Холим)", "С 1-го дня при получении статуса Оле", "183 дня ожидания Битуах Леуми при переходе на визу А/5 по СТУПРО"],
        ["Налоговые льготы (Некудот Зикуй)", "4,5 года льготного подоходного налога", "Отсчёт начинается со дня выдачи удостоверения Теудат-Оле"]
    ])
}

APOSTILLE_JURISDICTION_TABLE_I18N = {
    "en": ("🌍 Country-by-Country Police Check & Hague Apostille Authority Table (180-Day Rule)", ["Jurisdiction", "Mandatory Criminal Check", "Correct Apostille Authority (No Local Notary Traps!)"], [
        ["🇺🇸 United States", "FBI Identity History Summary (IdHS)", "US Dept. of State (Washington, DC) Federal Apostille — state Secretary of State rejected on FBI PDF!"],
        ["🇬🇧 United Kingdom", "ACRO Police Certificate", "FCDO Legalisation Office (Milton Keynes) Hague Apostille"],
        ["🇫🇷 France", "Bulletin n°3 du Casier Judiciaire National (Nantes)", "Cour d'Appel / Notaires de France Electronic Apostille"],
        ["🇪🇸 Spain / LATAM", "Certificado de Antecedentes Penales (Ministerio de Justicia)", "Ministerio de Justicia / Cancillería Hague Apostille (<180 days)"],
        ["🇩🇪 Germany / DACH", "Erweitertes / Bundeszentralregister Führungszeugnis (BfJ)", "Bundesamt für Auswärtige Angelegenheiten (BfAA) Federal Apostille"],
        ["🌍 FSU / Russia / Ukraine", "МВД ГИАЦ / ДІЯ Extract Covering ALL Maiden & Prior Surnames", "Ministry of Internal Affairs / Ministry of Justice Original Stamp Apostille"]
    ]),
    "he": ("🌍 טבלת רשויות תעודת יושר ואפוסטיל לפי מדינה (כלל 180 הימים במשרד הפנים)", ["מדינת מקור", "תעודת היושר הנדרשת בלבד", "רשות האפוסטיל המוסמכת (מניעת פסילה בלשכה)"], [
        ["🇺🇸 ארה״ב (USA)", "תמצית רישום פדרלית מה-FBI (IdHS)", "אפוסטיל פדרלי של מחלקת המדינה בוושינגטון בלבד (אפוסטיל מדינתי נפסל!)"],
        ["🇬🇧 בריטניה (UK)", "תעודת משטרה ACRO", "משרד החוץ הבריטי (FCDO Legalisation Office)"],
        ["🇫🇷 צרפת", "גיליון מרשם פלילי Bulletin n°3 (נאנט)", "אפוסטיל רשמי של Cour d'Appel / לשכת הנוטריונים בצרפת"],
        ["🇪🇸 ספרד ואמריקה הלטינית", "תעודת עבר פלילי ממשרד המשפטים / פדרלית", "אפוסטיל האג של משרד המשפטים / משרד החוץ (בתוקף עד 180 יום)"],
        ["🇩🇪 גרמניה / אוסטריה / שווייץ", "תעודת יושר פדרלית Führungszeugnis (BfJ)", "אפוסטיל פדרלי מרשות החוץ BfAA"],
        ["🌍 רוסיה / אוקראינה / חבר העמים", "תעודת יושר הכוללת במפורש את כל שמות הנעורים והשמות הקודמים!", "חותמת אפוסטיל מקורית של משרד הפנים / משרד המשפטים"]
    ]),
    "fr": ("🌍 Tableau Officiel par Pays : Casier Judiciaire & Autorité d'Apostille (<180 Jours)", ["Juridiction", "Extrait de Casier Exigé", "Autorité d'Apostille Compétente"], [
        ["🇫🇷 France", "Bulletin n°3 du Casier Judiciaire National (Nantes)", "Apostille officielle Cour d'Appel / Chambre des Notaires de France"],
        ["🇺🇸 États-Unis", "FBI Identity History Summary (Fédéral)", "US Department of State (Washington DC) — jamais un État local pour le FBI !"],
        ["🇬🇧 Royaume-Uni", "ACRO Police Certificate", "FCDO Legalisation Office (Apostille de La Haye)"],
        ["🇨🇦 Canada", "Vérification GRC / RCMP avec empreintes (Nouvelle Convention La Haye)", "Affaires mondiales Canada / Autorité provinciale compétente"],
        ["🇧🇪 / 🇨🇭 Belgique & Suisse", "Extrait Modèle 595/596 ou Casier Judiciaire Suisse", "SPF Affaires étrangères (BE) / Chancellerie fédérale (CH)"]
    ]),
    "es": ("🌍 Tabla por País: Antecedentes Penales y Autoridad de Apostilla (<180 Días)", ["País / Región", "Certificado Penal Obligatorio", "Autoridad Exacta de Apostilla de La Haya"], [
        ["🇪🇸 España", "Certificado de Antecedentes Penales (Ministerio de Justicia)", "Apostilla Única del Ministerio de Justicia"],
        ["🇦🇷 Argentina / 🇲🇽 México / 🇨🇴 Colombia", "Reincidencia Nacional / Constancia Federal / Policía Nacional", "Cancillería / Gobernación Federal con Apostilla de La Haya (<180 días)"],
        ["🇺🇸 Estados Unidos", "FBI Identity History Summary (Federal)", "US Dept. of State (Washington DC) — ¡nunca apostilla estatal sobre PDF del FBI!"],
        ["🇧🇷 Brasil / 🇨🇱 Chile", "Certidão Polícia Federal + Estadual / Registro Civil", "Apostilla CNJ Cartório (Brasil) / Ministerio de Relaciones Exteriores (Chile)"]
    ]),
    "de": ("🌍 Länder-Tabelle: Führungszeugnis & Zuständige Apostille-Behörde (<180 Tage)", ["Land", "Pflicht-Strafregisterauszug", "Zuständige Haager Apostille-Stelle"], [
        ["🇩🇪 Deutschland", "Führungszeugnis mit Unterschrift/Überbeglaubigung (BfJ Bonn)", "Bundesamt für Auswärtige Angelegenheiten (BfAA) in Brandenburg"],
        ["🇦🇹 Österreich", "Strafregisterbescheinigung der Landespolizeidirektion / Bürgermeister", "Außenministerium (BMEIA) bzw. zuständige Landesregierung"],
        ["🇨🇭 Schweiz", "Privatauszug aus dem Strafregister (VOSTRA Bern)", "Schweizerische Bundeskanzlei in Bern (Beglaubigungsdienst)"],
        ["🇺🇸 USA / 🇬🇧 UK", "FBI Identity History Summary / ACRO Police Certificate", "US Dept. of State (Washington DC) / UK FCDO Legalisation Office"]
    ]),
    "ru": ("🌍 Таблица по странам: Справка о несудимости и орган проставления Апостиля (<180 дней)", ["Страна выдачи", "Требуемая справка о несудимости", "Орган Апостиля (без ошибок нотариальных копий!)"], [
        ["🇷🇺 Россия", "Справка ГИАЦ МВД РФ (строго со ВСЕМИ девичьими и прежними фамилиями!)", "Оригинальный штамп Апостиль МВД РФ на подлиннике справки"],
        ["🇺🇦 Украина", "Полный Вытяг МВД Украины (Повний витяг про несудимість)", "Апостиль Министерства иностранных дел / Минюста Украины"],
        ["🇰🇿 Казахстан / 🇧🇾 Беларусь / 🇲🇩 Молдова", "Справка Генпрокуратуры / МВД со всеми сменами фамилий", "Апостиль уполномоченного министерства на оригинале документа"],
        ["🇺🇸 США / 🇩🇪 Германия / 🇫🇷 Франция", "FBI IdHS / Führungszeugnis BfJ / Bulletin n°3", "Госдепартамент США (DC) / BfAA Германии / Апелляционный суд Франции"]
    ])
}


SPOUSAL_520008_VS_520009_TABLE_I18N = {
    "en": ("⚖️ Nohal 5.2.0008 (Married / Utah Zoom) vs. Nohal 5.2.0009 (Unmarried Partners) Comparison", ["Statutory Milestone", "Married Track (Nohal 5.2.0008)", "Unmarried Track (Nohal 5.2.0009)"], [
        ["Time on B/1 Work Visa (No Kupat Cholim)", "~6 Months (after initial verification)", "3 Full Years (36 Months)"],
        ["Time on A/5 Biometric Teudat Zehut", "4 Years (183-day Bituach Leumi wait at start)", "4 Years (starts only in Year 4)"],
        ["Total Duration to Citizenship / Residency", "~4.5 Years → Full Israeli Citizenship", "~7 Years → Permanent Residency"],
        ["Mandatory Core Forms", "6-Page Form Ash/6 + Apostilled Marriage Cert (incl. Utah Zoom)", "Form Ash/6 + Lawyer-Witnessed 13-Clause Nespach Alef"]
    ]),
    "he": ("⚖️ השוואת מסלולים: נשואים ונישואי יוטה (נוהל 5.2.0008) מול ידועים בציבור (נוהל 5.2.0009)", ["שלב / קריטריון חוקי", "נשואים / יוטה זום (נוהל 5.2.0008)", "ידועים בציבור (נוהל 5.2.0009)"], [
        ["תקופה באשרת עבודה B/1 (ללא קופת חולים)", "כ-6 חודשים לאחר פתיחת התיק", "3 שנים מלאות (36 חודשים)"],
        ["תקופה בתעודת זהות כתומה א/5", "4 שנים (המתנת 183 יום לביטוח לאומי)", "4 שנים (מתחיל רק מהשנה ה-4)"],
        ["משך כולל עד למעמד קבע / אזרחות", "כ-4.5 שנים ← אזרחות ישראלית מלאה", "כ-7 שנים ← תושבות קבע"],
        ["טפסי חובה בהגשה", "טופס אש/6 (6 עמ׳) + תעודת נישואין עם אפוסטיל", "טופס אש/6 + תצהיר נספח א׳ (13 סעיפים בפני עו״ד)"]
    ]),
    "fr": ("⚖️ Comparatif : Couples Mariés / Utah Zoom (Nohal 5.2.0008) vs Concubins (Nohal 5.2.0009)", ["Étape Statutaire", "Mariés / Utah Zoom (Nohal 5.2.0008)", "Concubins Non Mariés (Nohal 5.2.0009)"], [
        ["Durée sous Visa B/1 (sans Kupat Holim)", "~6 Mois", "3 Ans complets (36 mois)"],
        ["Durée sous Teudat Zehut A/5", "4 Ans (+ carence Bituach Leumi 183j)", "4 Ans (à partir de la 4e année)"],
        ["Durée Totale jusqu'au Statut Final", "~4,5 Ans → Citoyenneté Israélienne", "~7 Ans → Résidence Permanente"],
        ["Formulaires Obligatoires", "Ash/6 (6p) + Acte de Mariage Apostillé", "Ash/6 + Nespach Alef (13 clauses devant avocat)"]
    ]),
    "es": ("⚖️ Comparativa: Casados / Boda Utah Zoom (Nohal 5.2.0008) vs. Pareja de Hecho (Nohal 5.2.0009)", ["Etapa Legal", "Casados / Utah Zoom (Nohal 5.2.0008)", "Pareja de Hecho (Nohal 5.2.0009)"], [
        ["Tiempo con Visa B/1 (sin Kupat Jolim)", "~6 Meses", "3 Años completos (36 meses)"],
        ["Tiempo con Teudat Zehut A/5", "4 Años (+ 183 días espera Bituaj Leumí)", "4 Años (inicia en el 4.º año)"],
        ["Tiempo Total hasta Estatus Definitivo", "~4,5 Años → Ciudadanía Israelí", "~7 Años → Residencia Permanente"],
        ["Formularios Obligatorios", "Ash/6 (6 pág.) + Acta Matrimonio Apostillada", "Ash/6 + Nespaj Alef (13 cláusulas ante abogado)"]
    ]),
    "de": ("⚖️ Vergleich: Verheiratete / Utah-Zoom (Nohal 5.2.0008) vs. Lebenspartner (Nohal 5.2.0009)", ["Verfahrensstufe", "Verheiratet / Utah-Zoom (Nohal 5.2.0008)", "Unverheiratet (Nohal 5.2.0009)"], [
        ["Dauer mit B/1-Arbeitsvisum", "ca. 6 Monate", "3 volle Jahre (36 Monate)"],
        ["Dauer mit A/5 Teudat Zehut", "4 Jahre (+ 183 Tage Wartezeit Krankenkasse)", "4 Jahre (erst ab dem 4. Jahr)"],
        ["Gesamtdauer bis Endstatus", "ca. 4,5 Jahre → Staatsbürgerschaft", "ca. 7 Jahre → Daueraufenthalt"],
        ["Pflichtformulare", "Ash/6 (6S) + Apostillierte Heiratsurkunde", "Ash/6 + Nespach Alef (13 Klauseln vor Anwalt)"]
    ]),
    "ru": ("⚖️ Сравнение СТУПРО: Официальный / Юта-брак (5.2.0008) и Гражданский союз (5.2.0009)", ["Этап процедуры", "В браке / Юта Zoom (Ноаль 5.2.0008)", "Без брака / Ядуим бе-Цибур (5.2.0009)"], [
        ["Срок на рабочей визе B/1 (без Купат Холим)", "~6 месяцев", "3 полных года (36 месяцев)"],
        ["Срок с временным ТЗ (виза А/5)", "4 года (+ 183 дня ожидания Битуах Леуми)", "4 года (начиная только с 4-го года)"],
        ["Общий срок до ПМЖ / Гражданства", "~4,5 года → Гражданство Израиля", "~7 лет → Постоянное жительство (ПМЖ)"],
        ["Обязательные бланки", "Аш/6 (6 стр.) + Св-во о браке с апостилем", "Аш/6 + Неспах Алеф (13 пунктов у адвоката)"]
    ])
}

def render_seo_data_table(lang, table_dict):
    title, headers, rows = table_dict.get(lang, table_dict["en"])
    th_html = "".join([f'<th style="padding:10px 12px;background:#082548;color:#fff;font-size:0.82rem;text-align:start;border:1px solid #1e3a5f;">{html.escape(h)}</th>' for h in headers])
    tr_html = ""
    for r_idx, row in enumerate(rows):
        bg = "#ffffff" if r_idx % 2 == 0 else "#f8fafc"
        tds = "".join([f'<td style="padding:9px 12px;border:1px solid #cbd5e1;font-size:0.83rem;color:#1e293b;line-height:1.45;">{html.escape(c)}</td>' for c in row])
        tr_html += f'<tr style="background:{bg};">{tds}</tr>'
    return (
        f'<div style="margin:18px 0;overflow-x:auto;">'
        f'<h2 style="font-size:1.08rem;color:#082548;margin:0 0 8px 0;">{html.escape(title)}</h2>'
        f'<table style="width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden;"><thead><tr>{th_html}</tr></thead><tbody>{tr_html}</tbody></table>'
        f'</div>'
    )
# === END GAT PYTHON PRE-BAKED HELPERS ===


# === GAT_PREBAKED_VAULTS_AND_2026_AUTHORITY_V1 ===
def _load_songs_vault_for_seo():
    p = "public/app/songs_vault.js"
    if not os.path.exists(p):
        return [], [], []
    songs = extract_js_window_array(p, "SONGS_VAULT12")
    morning = extract_js_window_array(p, "MORNING_VAULT7")
    brachot = extract_js_window_array(p, "BRACHOT_VAULT8")
    return songs, morning, brachot

_SEO_SONGS, _SEO_MORNING, _SEO_BRACHOT = _load_songs_vault_for_seo()

LITURGY_PREBAKE_I18N = {
    "en": {
        "h2": "🎵 Pre-Baked Beit Din Liturgical & Halachic Audio Syllabus (Shabbat Zemirot, Shacharit & Essential Brachot)",
        "lead": "Rabbinical Court (Beit Din) judges (Dayanim) routinely ask conversion candidates to recite daily Brachot, morning Shacharit prayers, and Friday night / Shabbat table songs from memory to verify authentic lived practice. Below is the complete required liturgical syllabus with Hebrew Nikud, occasion timing, and phonetic transliteration:",
        "th1": "Liturgical Track (Hebrew & Title)",
        "th2": "Halachic Timing / Occasion",
        "th3": "Hebrew Opening & Phonetic Transliteration",
        "cta": "🎧 Practice All 56 Sephardi & Ashkenazi Audio Tracks in the Interactive Karaoke Trainer →"
    },
    "he": {
        "h2": "🎵 סילבוס שמע הלכתי מלא לבית הדין לגיור (זמירות שבת, תפילות שחרית וברכות חיוניות)",
        "lead": "דייני בית הדין לגיור בוחנים מועמדים על בקיאות מעשית בברכות השחר, תפילת שחרית, הדלקת נרות, קידוש, ברכת המזון וזמירות שבת כדי לוודא אורח חיים יהודי פעיל. להלן טבלת הסילבוס המלאה עם ניקוד ומועדי אמירה:",
        "th1": "שם התפילה / הזמירה",
        "th2": "מועד הלכתי / הקשר",
        "th3": "פתיח מנוקד ותעתיק פונטי",
        "cta": "🎧 לתרגול כל 56 רצועות השמע (ספרדי ואשכנזי) במאמן הקריוקי האינטראקטיבי ←"
    },
    "fr": {
        "h2": "🎵 Programme Audio Liturgique & Halakhique Complet du Beit Din (Chants de Chabbat, Chaharit & Brachot)",
        "lead": "Les juges rabbiniques (Dayanim) du Beit Din demandent systématiquement aux candidats au Giyur de réciter les bénédictions quotidiennes (Brachot), les prières du matin (Chaharit) et les chants de la table de Chabbat pour vérifier une pratique vécue. Voici le programme complet avec hébreu vocalisé (Nikoud) et phonétique :",
        "th1": "Chant / Prière / Bracha",
        "th2": "Moment Halakhique",
        "th3": "Hébreu Vocalisé & Phonétique",
        "cta": "🎧 S'entraîner sur les 56 pistes audio (Séfarade & Achkénaze) dans le Karaoké Interactif →"
    },
    "es": {
        "h2": "🎵 Programa Litúrgico y Halájico Completo del Beit Din (Canciones de Shabat, Shajarit y Brajot Esenciales)",
        "lead": "Los jueces rabínicos (Dayanim) del Beit Din evalúan a los candidatos a la conversión pidiéndoles recitar bendiciones diarias (Brajot), rezos matutinos (Shajarit) y zemirot de la mesa de Shabat. A continuación se presenta el programa completo con hebreo vocalizado (Nikud) y fonética:",
        "th1": "Rezo / Canción / Brajá",
        "th2": "Momento Halájico",
        "th3": "Hebreo con Nikud y Transliteración Fonética",
        "cta": "🎧 Practicar las 56 Pistas de Audio (Sefardí y Ashkenazí) en el Entrenador Karaoke →"
    },
    "de": {
        "h2": "🎵 Vollständiger Liturgischer & Halachischer Beit-Din-Lehrplan (Schabbat-Semirot, Schacharit & Brachot)",
        "lead": "Die Richter (Dajanim) des Beit Din prüfen Giur-Kandidaten regelmäßig auf das flüssige Rezitieren der täglichen Segenssprüche (Brachot), Morgengebete (Schacharit) und Schabbat-Tischlieder. Hier ist der komplette Pflichtkatalog mit vokalisiertem Hebräisch (Nikud) und Lautschrift:",
        "th1": "Gebet / Lied / Bracha",
        "th2": "Halachischer Zeitpunkt",
        "th3": "Hebräischer Anfang & Phonetische Lautschrift",
        "cta": "🎧 Alle 56 Audio-Tracks (Sephardisch & Aschkenasisch) im Interaktiven Karaoke-Trainer üben →"
    },
    "ru": {
        "h2": "🎵 Полная Литургическая и Галахическая Программа Бейт-Дина (Песни Шаббата, Шахарит и Основные Брахот)",
        "lead": "Судьи раввинского суда (даяним) на собеседовании по гиюру регулярно просят кандидатов произнести по памяти утренние благословения (Брахот), молитвы Шахарит и субботние песни (Земирот). Ниже приведен полный обязательный перечень с огласовками (никуд) и транслитерацией:",
        "th1": "Молитва / Песня / Браха",
        "th2": "Галахическое Время",
        "th3": "Текст с Огласовками и Транслитерация",
        "cta": "🎧 Тренировать все 56 аудиодорожек (сефардский и ашкеназский нусах) в Караоке-Тренажере →"
    }
}

REF_LETTERS_PREBAKE_I18N = {
    "en": {
        "h2": "✍️ Statutory 8-Role Reference & Witness Letter Blueprint (Beit Din & Misrad HaPanim Nohal 5.2.0008 / 5.2.0009)",
        "lead": "Both the Rabbinical Court (Beit Din) and the Ministry of Interior (Misrad HaPanim) reject generic one-paragraph character letters. Below are the 8 mandatory recommender & witness classifications, required Israeli ID (Teudat Zehut) identifiers, and chronological activity log rules:",
        "th1": "Recommender / Witness Role",
        "th2": "Target Authority & Statutory Rule",
        "th3": "Mandatory Elements Required by Clerks / Dayanim",
        "cta": "✍️ Open the 6-Language Reference Letter & Activity Log Studio →",
        "rows": [
            ["🕍 Community / Synagogue Rabbi (Rav Melaveh)", "Beit Din Conversion Tribunal", "Official synagogue letterhead, duration of mentorship (min. 9–12 months), Shabbat/Holiday attendance verification, and formal declaration of readiness for the Beit Din."],
            ["🕯️ Shabbat & Holiday Host Family", "Beit Din Conversion Tribunal", "Specific dates of Friday night & Shabbat day meals hosted, practical kashrut/Shabbat observance witnessed in the home, and host's phone number for tribunal verification."],
            ["📚 Madrichat Kallah / Halacha & Taharat HaMishpacha Mentor", "Beit Din Conversion Tribunal (Women & Couples)", "Confirmation of completed Taharat HaMishpacha (Mikvah laws) curriculum, halachic readiness, and joint home observance if converting with a partner."],
            ["🤝 Volunteering / Chesed / Synagogue Gabbai Coordinator", "Beit Din Community Integration Proof", "Chronological log of communal participation, Kiddush/synagogue assistance, or charity shifts demonstrating active integration into an Israeli religious community."],
            ["👥 Israeli Citizen Friend Witness (#1 & #2)", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Mandatory 9-digit Israeli Teudat Zehut (TZ) number, mobile phone, explicit description of how and when they met the couple, shared outings/visits, and direct knowledge of joint residence."],
            ["👨‍👩‍👧 Israeli Family / In-Law Witness", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "9-digit Israeli TZ number, family relationship, dates of family meals/holidays spent together, and signed attestation that the couple's relationship is genuine and uncoerced."],
            ["💼 Employer / Coworker / Neighbor Witness", "Misrad HaPanim Center-of-Life Proof", "Verification of daily cohabitation at the registered Israeli address or workplace recognition of the partner, including witness TZ number and phone contact."],
            ["✈️ Overseas Diaspora Rabbi / Community Attestation", "Nativ / Rabbanut Birur Yahadut & Ishur Giyur", "Official diaspora congregation letterhead confirming prior Jewish lineage or recognized overseas Beit Din conversion track before Aliyah."]
        ]
    },
    "he": {
        "h2": "✍️ טבלת 8 סוגי מכתבי המלצה ועדויות חובה (בית הדין לגיור ומשרד הפנים נוהל 5.2.0008 / 5.2.0009)",
        "lead": "גם בית הדין לגיור וגם לשכות רשות האוכלוסין (משרד הפנים) פוסלים מכתבי המלצה כלליים וחסרי פרטים. להלן 8 סוגי הממליצים והעדים הרשמיים, דרישות מספר תעודת זהות (9 ספרות) ויומן מפגשים כרונולוגי:",
        "th1": "תפקיד הממליץ / העד",
        "th2": "רשות יעד ונוהל רלוונטי",
        "th3": "פרטי חובה הנדרשים על ידי הדיינים / פקידי משרד הפנים",
        "cta": "✍️ פתחו את מחולל מכתבי ההמלצה ויומן האירועים ב-6 שפות ←",
        "rows": [
            ["🕍 רב קהילה / רב מלווה (Rav Melaveh)", "בית הדין לגיור", "נייר לוגו רשמי של בית הכנסת/הקהילה, תקופת הליווי (מינימום 9–12 חודשים), אישור השתתפות בתפילות שבת וחג והצהרה על מוכנות לדיון בבית הדין."],
            ["🕯️ משפחה מארחת בשבתות וחגים", "בית הדין לגיור", "פירוט תאריכי סעודות שבת וחג, עדות ישירה על שמירת שבת וכשרות הלכה למעשה בבית המארחים, ומספר טלפון של המשפחה לאימות."],
            ["📚 מדריכת כלה / מלווה בהלכות טהרת המשפחה", "בית הדין לגיור (נשים וזוגות)", "אישור רשמי על השלמת לימודי הלכות טהרת המשפחה ומקווה, מוכנות הלכתית וניהול בית יהודי כשר."],
            ["🤝 גבאי בית כנסת / רכז התנדבות וחסד", "בית הדין לגיור (שילוב קהילתי)", "תיעוד כרונולוגי של מעורבות בקהילה, סיוע בקידושים או פעילות חסד המוכיחים השתלבות אמיתית בקהילה בישראל."],
            ["👥 עד חבר אזרח ישראלי (עדים 1 ו-2)", "משרד הפנים נוהל 5.2.0008 / 5.2.0009", "חובה לציין מספר תעודת זהות ישראלית (9 ספרות) וטלפון נייד, נסיבות ומועד ההיכרות עם בני הזוג, ביקורים משותפים וידיעה אישית על מגורים משותפים."],
            ["👨‍👩‍👧 עד בן משפחה / קרוב משפחה ישראלי", "משרד הפנים נוהל 5.2.0008 / 5.2.0009", "מספר ת״ז (9 ספרות), קרבה משפחתית, פירוט ארוחות משפחתיות וחגים משותפים, והצהרה חתומה על כנות הקשר הזוגי."],
            ["💼 עד מעסיק / שכן / עמית לעבודה", "משרד הפנים (הוכחת מרכז חיים)", "אימות מגורים משותפים יומיומיים בכתובת הרשומה או היכרות ממקום העבודה, כולל מספר ת״ז וטלפון ליצירת קשר."],
            ["✈️ אישור רב קהילה מחו״ל (תפוצות)", "נתיב / בירור יהדות ואישור גיור", "נייר לוגו רשמי של הקהילה בחו״ל המאשר שורשים יהודיים או מסלול גיור מוכר בקהילה לפני העלייה."]
        ]
    },
    "fr": {
        "h2": "✍️ Modèle Statutaire des 8 Lettres de Recommandation & Témoins (Beit Din & Misrad HaPanim Nohal 5.2.0008 / 5.2.0009)",
        "lead": "Le Tribunal rabbinique (Beit Din) comme le Ministère de l'Intérieur (Misrad HaPanim) rejettent les lettres génériques d'un paragraphe. Voici les 8 catégories officielles de recommandants et témoins, avec les exigences de numéro de Teoudat Zehout (9 chiffres) et de journal chronologique :",
        "th1": "Rôle du Recommandant / Témoin",
        "th2": "Autorité & Procédure",
        "th3": "Éléments Obligatoires Exigés par les Juges / Agents",
        "cta": "✍️ Ouvrir le Studio de Lettres de Recommandation & Journal d'Activités en 6 Langues →",
        "rows": [
            ["🕍 Rabbin de Communauté / Rabbin Accompagnateur (Rav Melaveh)", "Tribunal de Conversion (Beit Din)", "Papier à en-tête officiel de la synagogue, durée de l'accompagnement (9–12 mois min.), présence aux offices de Chabbat/Fêtes et déclaration d'aptitude au Beit Din."],
            ["🕯️ Famille d'Accueil de Chabbat & Fêtes", "Tribunal de Conversion (Beit Din)", "Dates précises des repas de Chabbat partagés, témoignage direct sur la pratique du Chabbat et de la Cacherout, et téléphone de la famille."],
            ["📚 Madrichat Kallah / Mentor Halakha & Taharat HaMichpakha", "Beit Din (Femmes & Couples)", "Attestation de validation complète des lois de pureté familiale (Mikvé) et de gestion d'un foyer juif halakhique."],
            ["🤝 Gabbaï de Synagogue / Coordinateur de Bénévolat (Hessed)", "Preuve d'Intégration Communautaire Beit Din", "Journal chronologique de participation communautaire, aide au Kiddouch ou actions de Hessed en Israël."],
            ["👥 Ami Témoin Citoyen Israélien (Témoins n°1 & n°2)", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Numéro de Teoudat Zehout israélienne à 9 chiffres obligatoire, téléphone portable, historique des visites communes et attestation de vie commune sincère."],
            ["👨‍👩‍👧 Témoin Famille / Belle-Famille Israélienne", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Numéro de Teoudat Zehout à 9 chiffres, lien familial, fêtes et repas partagés, et déclaration signée d'authenticité du couple."],
            ["💼 Témoin Employeur / Voisin / Collègue", "Misrad HaPanim (Preuve de Centre de Vie)", "Confirmation de cohabitation quotidienne à l'adresse déclarée, avec numéro de TZ et téléphone du témoin."],
            ["✈️ Attestation de Rabbin de Diaspora (Étranger)", "Nativ / Rabbinat Birour Yahadout & Ichour Giyur", "Papier à en-tête officiel de la communauté à l'étranger confirmant l'ascendance juive ou le parcours de conversion reconnu avant l'Aliyah."]
        ]
    },
    "es": {
        "h2": "✍️ Guía Normativa de las 8 Cartas de Recomendación y Testigos (Beit Din y Misrad HaPanim Nohal 5.2.0008 / 5.2.0009)",
        "lead": "Tanto el Tribunal Rabínico (Beit Din) como el Ministerio del Interior (Misrad HaPanim) rechazan cartas genéricas sin fechas ni datos verificables. Aquí están los 8 roles oficiales de recomendadores y testigos, con requisito de Teudat Zehut de 9 dígitos y bitácora cronológica:",
        "th1": "Rol del Recomendador / Testigo",
        "th2": "Autoridad y Procedimiento",
        "th3": "Requisitos Obligatorios Exigidos por Dayanim / Funcionarios",
        "cta": "✍️ Abrir el Estudio de Cartas de Recomendación y Bitácora en 6 Idiomas →",
        "rows": [
            ["🕍 Rabino Comunitario / Patrocinador (Rav Melaveh)", "Tribunal de Conversión (Beit Din)", "Membrete oficial de la sinagoga, duración del acompañamiento (mín. 9–12 meses), asistencia a Shabat/Jaguim y declaración formal de preparación."],
            ["🕯️ Familia Anfitriona de Shabat y Festividades", "Tribunal de Conversión (Beit Din)", "Fechas exactas de cenas y almuerzos de Shabat compartidos, observación práctica de Shabat y Kashrut, y teléfono de contacto."],
            ["📚 Madrijat Kalá / Mentora de Halajá y Taharat HaMishpajá", "Beit Din (Mujeres y Parejas)", "Confirmación de finalización del programa de leyes de pureza familiar (Mikve) y conducción de un hogar judío observante."],
            ["🤝 Gabai de Sinagoga / Coordinador de Voluntariado (Jésed)", "Prueba de Integración Comunitaria Beit Din", "Registro cronológico de participación comunitaria, apoyo en Kidush o voluntariado en Israel."],
            ["👥 Testigo Amigo Ciudadano Israelí (Testigos #1 y #2)", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Número de Teudat Zehut israelí de 9 dígitos obligatorio, teléfono móvil, cómo y cuándo conoció a la pareja, salidas conjuntas y constancia de convivencia."],
            ["👨‍👩‍👧 Testigo Familiar / Familia Política Israelí", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Teudat Zehut de 9 dígitos, parentesco, cenas y festividades compartidas, y declaración firmada de relación genuina."],
            ["💼 Testigo Empleador / Vecino / Compañero de Trabajo", "Misrad HaPanim (Prueba de Centro de Vida)", "Verificación de convivencia diaria en el domicilio registrado con número de TZ y teléfono del testigo."],
            ["✈️ Atestación de Rabino de la Diáspora (Extranjero)", "Nativ / Rabinato Birur Yahadut e Ishur Giyur", "Membrete oficial comunitario del exterior confirmando linaje judío o conversión reconocida previa a la Aliyá."]
        ]
    },
    "de": {
        "h2": "✍️ Behördlicher Leitfaden der 8 Empfehlungs- & Zeugenbriefe (Beit Din & Misrad HaPanim Nohal 5.2.0008 / 5.2.0009)",
        "lead": "Sowohl das Rabbinatsgericht (Beit Din) als auch das Innenministerium (Misrad HaPanim) lehnen pauschale Kurzbriefe ohne konkrete Daten ab. Hier sind die 8 offiziellen Empfehlungs- und Zeugenkategorien inklusive Pflichtangabe der 9-stelligen Teudat-Zehut-Nummer:",
        "th1": "Rolle des Empfehlenden / Zeugen",
        "th2": "Behörde & Verfahren",
        "th3": "Pflichtangaben für Dajanim / Sachbearbeiter",
        "cta": "✍️ Das 6-Sprachen-Studio für Empfehlungsbriefe & Ereignisprotokoll öffnen →",
        "rows": [
            ["🕍 Gemeinderabbiner / Begleitender Rabbiner (Rav Melaveh)", "Beit-Din-Konversionsgericht", "Offizieller Briefkopf der Synagoge, Dauer der Begleitung (mind. 9–12 Monate), Teilnahme an Schabbat-/Feiertagsgottesdiensten und Reifeerklärung."],
            ["🕯️ Schabbat- & Feiertags-Gastfamilie", "Beit-Din-Konversionsgericht", "Konkrete Daten gemeinsamer Schabbatmahlzeiten, bezeugte Schabbat- und Kaschrut-Praxis sowie Telefonnummer für Rückfragen."],
            ["📚 Madrichat Kallah / Mentorin für Halacha & Taharat HaMischpacha", "Beit Din (Frauen & Paare)", "Bestätigung über den vollständigen Abschluss der Familiengesetze (Mikwe) und halachische Haushaltsführung."],
            ["🤝 Synagogen-Gabbai / Ehrenamts- & Chessed-Koordinator", "Beit-Din-Gemeindeintegration", "Chronologisches Protokoll über Gemeindeengagement, Kiddusch-Hilfe oder wohltätige Einsätze in Israel."],
            ["👥 Israelischer Freundeszeuge (Zeugen Nr. 1 & Nr. 2)", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "Pflichtangabe der 9-stelligen israelischen Teudat-Zehut-Nummer, Mobiltelefon, Kennenlerngeschichte, gemeinsame Treffen und Bestätigung des gemeinsamen Wohnsitzes."],
            ["👨‍👩‍👧 Israelischer Familien- / Schwiegerfamilienzeuge", "Misrad HaPanim Nohal 5.2.0008 / 5.2.0009", "9-stellige TZ-Nummer, Verwandtschaftsgrad, gemeinsame Feiertage/Familienessen und unterschriebene Echtheitserklärung der Partnerschaft."],
            ["💼 Arbeitgeber- / Nachbars- / Kollegenzeuge", "Misrad HaPanim (Lebensmittelpunktnachweis)", "Bestätigung des täglichen Zusammenlebens an der gemeldeten Adresse inklusive TZ-Nummer und Telefon."],
            ["✈️ Rabbiner-Bestätigung aus der Diaspora (Ausland)", "Nativ / Rabbinat Birur Jahadut & Ischur Giur", "Offizieller Gemeindebriefkopf aus dem Herkunftsland zur Bestätigung jüdischer Abstammung oder eines anerkannten Auslands-Giur."]
        ]
    },
    "ru": {
        "h2": "✍️ Регламент 8 Видов Рекомендательных и Свидетельских Писем (Бейт-Дин и МВД Израиля Ноаль 5.2.0008 / 5.2.0009)",
        "lead": "Как раввинский суд (Бейт-Дин), так и МВД Израиля (Мисрад ха-Паним) отклоняют шаблонные письма из одного абзаца без дат. Ниже приведены 8 официальных категорий рекомендателей и свидетелей с обязательным указанием 9-значного Теудат-Зеута и хронологии встреч:",
        "th1": "Роль Рекомендателя / Свидетеля",
        "th2": "Инстанция и Процедура",
        "th3": "Обязательные Реквизиты для Судей (Даяним) / Чиновников МВД",
        "cta": "✍️ Открыть Студию Рекомендательных Писем и Журнал Событий на 6 Языках →",
        "rows": [
            ["🕍 Общинный / Сопровождающий Раввин (Рав Мелаве)", "Раввинский Суд по Гиюру (Бейт-Дин)", "Официальный бланк синагоги, срок сопровождения (от 9–12 месяцев), подтверждение посещения молитв в Шаббат и праздники, рекомендация к суду."],
            ["🕯️ Принимающая Семья на Шаббат и Праздники", "Раввинский Суд по Гиюру (Бейт-Дин)", "Конкретные даты совместных субботних трапез, подтверждение соблюдения Шаббата и кашрута на практике, телефон семьи."],
            ["📚 Мадрихат Калла / Наставница по Галахе и Таарат ха-Мишпаха", "Бейт-Дин (Женщины и Пары)", "Официальное подтверждение прохождения курса законов семейной чистоты (миквэ) и ведения кошерного еврейского дома."],
            ["🤝 Габай Синагоги / Координатор Волонтерства (Хесед)", "Бейт-Дин (Интеграция в Общину)", "Хронологический журнал участия в жизни общины, помощи в организации кидушей или волонтерских смен в Израиле."],
            ["👥 Свидетель-Друг с Гражданством Израиля (Свидетели №1 и №2)", "МВД Израиля Ноаль 5.2.0008 / 5.2.0009", "Обязательный 9-значный номер израильского Теудат-Зеута (ТЗ), мобильный телефон, история знакомства с парой, совместные встречи и подтверждение совместного проживания."],
            ["👨‍👩‍👧 Свидетель-Родственник со Стороны Израильского Супруга", "МВД Израиля Ноаль 5.2.0008 / 5.2.0009", "9-значный номер ТЗ, степень родства, совместные семейные ужины и праздники, личная подпись под подтверждением искренности брака/отношений."],
            ["💼 Свидетель-Работодатель / Сосед / Коллега", "МВД Израиля (Доказательство Центра Жизни)", "Подтверждение ежедневного совместного проживания по зарегистрированному адресу с указанием номера ТЗ и телефона свидетеля."],
            ["✈️ Справка от Раввина Общины в Диаспоре (За Рубежом)", "Натив / Раввинат Бирур Яхадут и Ишур Гиюр", "Официальный бланк зарубежной общины, подтверждающий еврейские корни или прохождение признанного гиюра до репатриации."]
        ]
    }
}

LAWYER_VS_DIY_2026_TABLE_I18N = {
    "en": {
        "h2": "⚖️ Private Law Firms (₪15,000–₪40,000) vs. Nonprofits (NBN / Jewish Agency / ITIM) vs. Direct Statutory Filing (2026 Edition 16)",
        "lead": "Most applicants overpay ₪15,000 to ₪40,000+ (+ VAT) to immigration lawyers or get stuck between conflicting nonprofit advice because exact Ministry of Interior (PIBA) procedure codes and clerk rejection traps are hidden. Here is how direct statutory filing compares under the July 20, 2026 Nohal 5.2.0008 (Edition 16) rules:",
        "headers": ["Bureaucratic Bottleneck", "Private Law Firms (₪15,000–₪40,000)", "Agency Portals (NBN / JAFI / ITIM)", "Giyur Aliyah Track (Free Truth + Self-Serve Engines)"],
        "rows": [
            ["PIBA Nohal 5.2.0008 (Ed. 16, July 20, 2026) & Nohal 5.2.0009 Dossiers", "Charge ₪20,000–₪40,000 to type your details into standard Hebrew forms Ash/1, Ash/3, Ash/6 & Nespach Alef.", "Do not process non-Jewish spousal residency or unmarried partner (Yeduim BeTzibur) files.", "Auto-stamps all 8 official PIBA Hebrew PDFs (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, Security CV) with a Red-X Signing Guide ($0 free browse / $89–$149 pass)."],
            ["45-Day Document Deficiency Clock & Nespach Gimel Summary Rejection", "Hold back exact clerk deficiency translations to justify paid retainers when a file is threatened with closure.", "Provide general high-level checklists without 180-day Apostille & 3-Bucket police check validation.", "Free statutory guide exposes the 45-day deficiency deadline, Nespach Gimel summary rejection traps, and the 21-day Internal Appeal (Arar Pnimi under Nohal 1.6.0001) + AI Packet Auditor."],
            ["Separated-Room Couples Interrogation (Shimua Zugi)", "Give a 15-minute verbal overview before your Misrad HaPanim interview.", "No separated-room interrogation preparation offered.", "300 real clerk questions across 10 categories in 6 languages with a live 2-Phone Encrypted Answer Matcher & Contradiction Detector."],
            ["Beit Din Conversion Tribunal & Va'adat Charigim (Sec. ג.10 Dual-Track)", "Charge tens of thousands of shekels for Va'adat Charigim exception petitions.", "Warn against private or tourist tracks without giving the exact Dahan Ruling & Rabbanut recognition matrix.", "700 real Dayanim flashcards, 56 Shabbat Songs/Prayers Karaoke Grader, 8-role Reference Letter Studio, and complete Dahan Ruling vs. Rabbanut breakdown for free."]
        ]
    },
    "he": {
        "h2": "⚖️ משרדי עורכי דין (15,000₪–40,000₪) מול ארגונים (נפש בנפש / הסוכנות / עתים) מול הגשה עצמית מדויקת (נוהל 5.2.0008 מהדורה 16 — יולי 2026)",
        "lead": "זוגות ועולים משלמים 15,000₪ עד 40,000₪ (+ מע״מ) לעורכי דין או מקבלים תשובות סותרות מארגונים שונים משום שהמלכודות המנהליות של משרד הפנים מוסתרות. כך נראית ההשוואה המדויקת לפי מהדורה 16 החדשה של נוהל 5.2.0008 (20.07.2026):",
        "headers": ["צוואר בקבוק בירוקרטי", "משרדי עורכי דין (15,000₪–40,000₪)", "ארגונים ומוסדות (נפש בנפש / הסוכנות / עתים)", "מסלול גיור ועלייה (מידע מלא בחינם + מנועי הגשה עצמית)"],
        "rows": [
            ["תיקי נוהל 5.2.0008 (מהדורה 16, יולי 2026) ונוהל 5.2.0009", "גובים 20,000₪–40,000₪ עבור הקלדת הפרטים שלכם לטפסי אש/1, אש/3, אש/6 ונספח א׳.", "אינם מטפלים בהליך מדורג לבני זוג זרים או ידועים בציבור מול משרד הפנים.", "מילוי והחתמה אוטומטית בעברית של כל 8 טפסי משרד הפנים הרשמיים + מדריך חתימות ב-6 שפות (עיון חופשי בחינם / 89$–149$ להדפסה ללא הגבלה)."],
            ["שעון 45 יום להשלמת מסמכים ודחייה על הסף (נספח ג׳)", "שומרים את פירוט דרישות הפקידים לייעוץ בתשלום כאשר התיק בסכנת סגירה.", "מספקים רשימות כלליות ללא בדיקת שעון 180 יום לאפוסטיל וכלל 3 הסלים לתעודת יושר.", "חשיפה מלאה בחינם של מלכודת 45 הימים, דחייה על הסף לפי נספח ג׳, ומועד 21 היום להגשת ערר פנימי (נוהל 1.6.0001) + מבקר מסמכים בבינה מלאכותית."],
            ["שימוע זוגי בחדרים נפרדים במשרד הפנים", "תדרוך בעל-פה של 15 דקות לפני הראיון בלשכה.", "אין סימולטור או מאגר שאלות לשימוע זוגי.", "מאגר 300 שאלות אמיתיות מ-10 קטגוריות ב-6 שפות + סימולטור סנכרון ל-2 טלפונים המזהה סתירות בזמן אמת."],
            ["בית הדין לגיור, ועדת חריגים וסעיף ג.10 (מסלול כפול)", "גובים עשרות אלפי שקלים על הגשת בקשות לוועדת חריגים.", "מספקים מידע חלקי בלבד על ההבדל בין פסק דין דהן להכרת הרבנות הראשית.", "700 כרטיסיות שאלות דיינים, מאמן קריוקי ל-56 זמירות ותפילות, מחולל מכתבי המלצה וניתוח מלא של מלכודות הגיור בחינם."]
        ]
    },
    "fr": {
        "h2": "⚖️ Cabinets d'Avocats (15 000 ₪–40 000 ₪) vs. Institutions (NBN / Agence Juive / ITIM) vs. Dépôt Statutaire Direct (Édition 16 — Juillet 2026)",
        "lead": "La plupart des candidats paient 15 000 ₪ à 40 000 ₪ (+ TVA) à des avocats ou reçoivent des réponses contradictoires d'organismes parce que les numéros de procédures PIBA et les pièges de rejet au guichet sont cachés. Voici la comparaison exacte selon la procédure Nohal 5.2.0008 (Édition 16 du 20 juillet 2026) :",
        "headers": ["Blocage Administratif", "Cabinets d'Avocats (15 000 ₪–40 000 ₪)", "Portails Institutionnels (NBN / Agence Juive / ITIM)", "Giyur Aliyah Track (Vérité Gratuite + Outils Self-Serve)"],
        "rows": [
            ["Dossiers PIBA Nohal 5.2.0008 (Éd. 16, Juillet 2026) & Nohal 5.2.0009", "Facturent 20 000 ₪–40 000 ₪ pour saisir vos réponses sur les formulaires hébreux Ash/1, Ash/3, Ash/6 et Nespach Alef.", "Ne traitent pas les visas conjoints ou partenaires non mariés (Yedouïm BeTzibour).", "Remplit et tamponne en hébreu les 8 PDF officiels du Misrad HaPanim avec Guide de Signature en français (navigation gratuite / pass 89 $–149 $)."],
            ["Délai de 45 Jours & Rejet Sommaire Nespach Gimel (נספח ג')", "Retiennent les règles exactes du guichet derrière des consultations payantes.", "Donnent des listes générales sans audit de l'horloge d'Apostille de 180 jours.", "Expose gratuitement le piège des 45 jours, le rejet sommaire Nespach Gimel et le recours interne sous 21 jours (Arar Pnimi — Nohal 1.6.0001) + Auditeur IA."],
            ["Entretien de Couple en Salles Séparées (Shimoua Zougi)", "Briefing oral rapide de 15 minutes avant le rendez-vous.", "Aucune préparation à l'interrogatoire croisé du Misrad HaPanim.", "300 vraies questions de guichet en 6 langues avec synchronisation sur 2 téléphones et détecteur de contradictions."],
            ["Tribunal du Beit Din, Va'adat Charigim & Art. ג.10 Double Parcours", "Facturent des milliers de shekels pour une demande Va'adat Charigim.", "Expliquent rarement le piège entre l'arrêt Dahan (Aliyah) et la reconnaissance du Grand Rabbinat (mariage).", "700 cartes de questions des Dayanim, entraîneur karaoké 56 chants/prières, studio de lettres de recommandation et guide complet gratuit."]
        ]
    },
    "es": {
        "h2": "⚖️ Bufetes de Abogados (15.000 ₪–40.000 ₪) vs. Organizaciones (NBN / Agencia Judía / ITIM) vs. Autogestión Normativa (Edición 16 — Julio 2026)",
        "lead": "Muchos solicitantes pagan entre 15.000 ₪ y 40.000 ₪ (+ IVA) a abogados o reciben respuestas contradictorias porque los códigos exactos del Ministerio del Interior (PIBA) y las trampas de rechazo se ocultan. Así se compara la presentación directa bajo el Nohal 5.2.0008 (Edición 16 del 20 de julio de 2026):",
        "headers": ["Cuello de Botella Burocrático", "Bufetes de Abogados (15.000 ₪–40.000 ₪)", "Portales Institucionales (NBN / JAFI / ITIM)", "Giyur Aliyah Track (Información Gratis + Motores Propios)"],
        "rows": [
            ["Expedientes PIBA Nohal 5.2.0008 (Ed. 16, Julio 2026) y Nohal 5.2.0009", "Cobran 20.000 ₪–40.000 ₪ por transcribir tus datos en los formularios hebreos Ash/1, Ash/3, Ash/6 y Nespach Alef.", "No tramitan residencia por cónyuge ni pareja de hecho (Yeduim BeTzibur).", "Estampa en hebreo los 8 PDF oficiales del Misrad HaPanim con Guía de Firma en español (exploración gratuita / pase de $89–$149)."],
            ["Plazo de 45 Días y Rechazo Sumario Nespach Guímel (נספח ג')", "Ocultan las reglas exactas de subsanación detrás de honorarios legales.", "Ofrecen listas genéricas sin validar el reloj de Apostilla de 180 días.", "Explica gratis el plazo de 45 días, el rechazo Nespach Guímel y la Apelación Interna de 21 días (Arar Pnimi — Nohal 1.6.0001) + Auditor IA."],
            ["Entrevista de Pareja en Salas Separadas (Shimúa Zugui)", "Charla verbal de 15 minutos antes de la cita.", "Sin simulador para el interrogatorio en salas separadas.", "300 preguntas reales en 6 idiomas con sincronización en 2 teléfonos y detector de contradicciones en vivo."],
            ["Beit Din, Va'adat Jariguim y Cláusula ג.10 Doble Vía", "Cobran decenas de miles de shekels por solicitudes a Va'adat Jariguim.", "No detallan el conflicto entre el Fallo Dahan y el Gran Rabinato.", "700 tarjetas del Beit Din, karaoke de 56 canciones/rezos, estudio de cartas de recomendación y guía completa gratis."]
        ]
    },
    "de": {
        "h2": "⚖️ Anwaltskanzleien (15.000 ₪–40.000 ₪) vs. Organisationen (NBN / Jewish Agency / ITIM) vs. Direkte Selbstantragstellung (Ausgabe 16 — Juli 2026)",
        "lead": "Viele Antragsteller zahlen 15.000 ₪ bis 40.000 ₪ (+ MwSt.) an Kanzleien oder erhalten widersprüchliche Auskünfte, weil die genauen PIBA-Verfahrensnummern und Ablehnungsfallen verschwiegen werden. Hier ist der Direktvergleich nach Nohal 5.2.0008 (Ausgabe 16 vom 20. Juli 2026):",
        "headers": ["Behördlicher Engpass", "Anwaltskanzleien (15.000 ₪–40.000 ₪)", "Institutionen (NBN / Jewish Agency / ITIM)", "Giyur Aliyah Track (Freies Wissen + Self-Serve-Engines)"],
        "rows": [
            ["PIBA Nohal 5.2.0008 (Ausg. 16, Juli 2026) & Nohal 5.2.0009", "Berechnen 20.000 ₪–40.000 ₪ für das Ausfüllen der hebräischen Standardformulare Ash/1, Ash/3, Ash/6 & Nespach Alef.", "Bearbeiten keine Ehepartner- oder Lebenspartner-Visa (Jeduim BeTzibur).", "Stempelt alle 8 offiziellen hebräischen PIBA-PDFs inkl. deutscher Unterschriften-Anleitung (kostenlose Vorschau / $89–$149 Pass)."],
            ["45-Tage-Nachreichfrist & Nespach-Gimel-Sofortablehnung", "Halten konkrete Sachbearbeiter-Regeln hinter bezahlten Mandaten zurück.", "Allgemeine Checklisten ohne Prüfung der 180-Tage-Apostille-Uhr.", "Legt die 45-Tage-Falle, die Nespach-Gimel-Ablehnung und den 21-Tage-Widerspruch (Arar Pnimi nach Nohal 1.6.0001) kostenlos offen + KI-Prüfer."],
            ["Paar-Interview in getrennten Räumen (Schimua Sugi)", "Kurzes 15-Minuten-Gespräch vor dem Termin.", "Keine Vorbereitung auf das getrennte Paar-Verhör.", "300 echte Fragen in 6 Sprachen mit 2-Handy-Synchronisierung & Widerspruchs-Detektor."],
            ["Beit-Din-Tribunal, Va'adat Charigim & Abschnitt ג.10 Doppelspur", "Hohe Honorare für Va'adat-Charigim-Anträge.", "Verschweigen oft die Kluft zwischen Dahan-Urteil und Oberrabbinat.", "700 Beit-Din-Lernkarten, 56 Lieder/Gebete-Karaoke, Empfehlungsbrief-Studio und komplette Analyse kostenlos."]
        ]
    },
    "ru": {
        "h2": "⚖️ Адвокатские Конторы (15 000 ₪–40 000 ₪) против Организаций (NBN / Сохнут / ITIM) и Прямой Подачи по Регламенту (Редакция 16 — Июль 2026)",
        "lead": "Большинство заявителей переплачивают от 15 000 ₪ до 40 000 ₪ (+ НДС) адвокатам или получают противоречивые ответы от разных организаций, потому что точные номера инструкций МВД (PIBA) и ловушки отказа скрываются. Сравнение с прямой подачей по инструкции Ноаль 5.2.0008 (Редакция 16 от 20.07.2026):",
        "headers": ["Бюрократический Этап", "Адвокатские Конторы (15 000 ₪–40 000 ₪)", "Организации (NBN / Сохнут / ITIM)", "Giyur Aliyah Track (Бесплатная Правда + Автоматизация)"],
        "rows": [
            ["Алия и СТУПРО по Ноаль 5.2.0008 (Ред. 16, июль 2026) и 5.2.0009", "Берут 20 000 ₪–40 000 ₪ за ввод ваших данных в стандартные бланки Ash/1, Ash/3, Ash/6 и Неспах Алеф.", "Не ведут дела СТУПРО для супругов-неевреев и фактических пар (Ядуим бе-Цибур).", "Автоматически заполняет на иврите все 8 официальных PDF-анкет МВД с русской инструкцией по подписи (бесплатный просмотр / доступ $89–$149)."],
            ["Срок 45 Дней на Донос Документов и Отказ по Неспах Гимель (נספח ג')", "Скрывают точные правила исправления замечаний МВД ради платного сопровождения.", "Дают общие списки без проверки 180-дневного срока апостиля и правила 3 корзин.", "Бесплатно раскрывает ловушку 45 дней, отказ по Неспах Гимель и 21-дневный срок внутренней апелляции (Арар Пними по Ноаль 1.6.0001) + ИИ-Аудитор."],
            ["Перекрестное Собеседование Пары в Разных Кабинетах (Шимуа Зуги)", "Устный инструктаж на 15 минут перед визитом в МВД.", "Нет тренажера для перекрестного допроса СТУПРО.", "300 реальных вопросов МВД на 6 языках с синхронизацией 2 телефонов и детектором расхождений."],
            ["Суд Бейт-Дин, Ваадат Харигим и п. ג.10 Двойной Трек", "Берут десятки тысяч шекелей за подачу в Ваадат Харигим.", "Не объясняют разницу между прецедентом Дахана (ЗОВ) и признанием Главного Раввината.", "700 карточек вопросов даяним, караоке-тренажер 56 песен и молитв, генератор писем от раввина и свидетелей + полный разбор бесплатно."]
        ]
    }
}

def _pick_i18n_field(val, lang):
    if not val:
        return ""
    if isinstance(val, str):
        return val
    if isinstance(val, dict):
        return val.get(lang) or val.get("en") or val.get("he") or ""
    return str(val)

def render_prebaked_liturgy_html(lang):
    cfg = LITURGY_PREBAKE_I18N.get(lang, LITURGY_PREBAKE_I18N["en"])
    rows_html = []
    all_items = (_SEO_SONGS or []) + (_SEO_MORNING or []) + (_SEO_BRACHOT or [])
    for it in all_items:
        t_str = _pick_i18n_field(it.get("t_i18n") or it.get("t"), lang)
        w_str = _pick_i18n_field(it.get("when"), lang)
        he_s = str(it.get("he_s") or it.get("he") or "")[:115]
        tr_s = _pick_i18n_field(it.get("tr_i18n") or it.get("tr") or it.get("phonetic"), lang)[:125]
        rows_html.append(
            f"<tr>"
            f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;font-weight:800;color:#0f172a;'>{t_str}</td>"
            f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#0369a1;font-weight:700;'>{w_str}</td>"
            f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;font-size:0.82rem;color:#334155;'>"
            f"<div dir='rtl' style='font-weight:800;color:#0f172a;'>{he_s}</div>"
            f"<div style='color:#475569;font-style:italic;margin-top:2px;'>{tr_s}</div></td>"
            f"</tr>"
        )
    table_body = "".join(rows_html)
    return (
        f"<section class='gat-prebaked-vault-box' style='margin:22px 0;padding:18px;background:#f8fafc;border:2px solid #bae6fd;border-radius:16px;'>"
        f"<h2 style='color:#0c4a6e;font-size:1.18rem;font-weight:900;margin:0 0 8px;'>{cfg['h2']}</h2>"
        f"<p style='font-size:0.88rem;color:#334155;line-height:1.6;margin:0 0 14px;'>{cfg['lead']}</p>"
        f"<div style='overflow-x:auto;'>"
        f"<table style='width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;font-size:0.84rem;'>"
        f"<thead><tr style='background:#0284c7;color:#fff;text-align:left;'>"
        f"<th style='padding:10px 11px;'>{cfg['th1']}</th>"
        f"<th style='padding:10px 11px;'>{cfg['th2']}</th>"
        f"<th style='padding:10px 11px;'>{cfg['th3']}</th>"
        f"</tr></thead><tbody>{table_body}</tbody></table></div>"
        f"<div style='margin-top:14px;text-align:center;'>"
        f"<a href='/app/?module=songs-prayers&lang={lang}' style='display:inline-block;background:#0284c7;color:#fff;font-weight:850;padding:11px 18px;border-radius:11px;text-decoration:none;font-size:0.88rem;'>{cfg['cta']}</a>"
        f"</div></section>"
    )

def render_prebaked_ref_letters_html(lang):
    cfg = REF_LETTERS_PREBAKE_I18N.get(lang, REF_LETTERS_PREBAKE_I18N["en"])
    rows_html = "".join(
        f"<tr>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;font-weight:800;color:#0f172a;'>{r[0]}</td>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#0369a1;font-weight:700;'>{r[1]}</td>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#334155;'>{r[2]}</td>"
        f"</tr>"
        for r in cfg["rows"]
    )
    return (
        f"<section class='gat-prebaked-vault-box' style='margin:22px 0;padding:18px;background:#f0fdf4;border:2px solid #86efac;border-radius:16px;'>"
        f"<h2 style='color:#065f46;font-size:1.18rem;font-weight:900;margin:0 0 8px;'>{cfg['h2']}</h2>"
        f"<p style='font-size:0.88rem;color:#1e293b;line-height:1.6;margin:0 0 14px;'>{cfg['lead']}</p>"
        f"<div style='overflow-x:auto;'>"
        f"<table style='width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;font-size:0.84rem;'>"
        f"<thead><tr style='background:#059669;color:#fff;text-align:left;'>"
        f"<th style='padding:10px 11px;'>{cfg['th1']}</th>"
        f"<th style='padding:10px 11px;'>{cfg['th2']}</th>"
        f"<th style='padding:10px 11px;'>{cfg['th3']}</th>"
        f"</tr></thead><tbody>{rows_html}</tbody></table></div>"
        f"<div style='margin-top:14px;text-align:center;'>"
        f"<a href='/app/?module=rabbi-letters&lang={lang}' style='display:inline-block;background:#059669;color:#fff;font-weight:850;padding:11px 18px;border-radius:11px;text-decoration:none;font-size:0.88rem;'>{cfg['cta']}</a>"
        f"</div></section>"
    )

def render_prebaked_lawyer_vs_diy_html(lang):
    cfg = LAWYER_VS_DIY_2026_TABLE_I18N.get(lang, LAWYER_VS_DIY_2026_TABLE_I18N["en"])
    hdrs = "".join(f"<th style='padding:10px 11px;'>{h}</th>" for h in cfg["headers"])
    rows_html = "".join(
        f"<tr>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;font-weight:800;color:#0f172a;'>{r[0]}</td>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#b91c1c;'>{r[1]}</td>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#475569;'>{r[2]}</td>"
        f"<td style='padding:9px 11px;border-bottom:1px solid #e2e8f0;color:#065f46;font-weight:750;background:#f0fdf4;'>{r[3]}</td>"
        f"</tr>"
        for r in cfg["rows"]
    )
    return (
        f"<section class='gat-prebaked-lawyer-matrix' style='margin:22px 0;padding:18px;background:#fffbeb;border:2px solid #fcd34d;border-radius:16px;'>"
        f"<h2 style='color:#78350f;font-size:1.15rem;font-weight:900;margin:0 0 8px;'>{cfg['h2']}</h2>"
        f"<p style='font-size:0.88rem;color:#334155;line-height:1.6;margin:0 0 14px;'>{cfg['lead']}</p>"
        f"<div style='overflow-x:auto;'>"
        f"<table style='width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;font-size:0.83rem;'>"
        f"<thead><tr style='background:#0f172a;color:#fff;text-align:left;'>{hdrs}</tr></thead>"
        f"<tbody>{rows_html}</tbody></table></div></section>"
    )


# === GAT PRE-BAKED BEIT DIN (700) & COUPLES (300) QUESTION DIRECTORIES (4 FREE + 116 LOCKED) ===
def _load_bd_and_cp_vaults_for_seo():
    import subprocess
    if hasattr(_load_bd_and_cp_vaults_for_seo, "_cache"):
        return _load_bd_and_cp_vaults_for_seo._cache
    node_code = """
    const fs = require('fs');
    const vm = require('vm');
    const sb = { window: {} };
    sb.window = sb;
    vm.createContext(sb);
    vm.runInContext(fs.readFileSync('public/app/bd_vault.js', 'utf8'), sb);
    vm.runInContext(fs.readFileSync('public/app/cp_vault.js', 'utf8'), sb);
    process.stdout.write(JSON.stringify({
      bdCats: sb.window.BD_CATS_I18N || {},
      bdCards: (sb.window.BD_PACK1 || []).concat(sb.window.BD_PACK2 || [], sb.window.BD_PACK3 || [], sb.window.BD_PACK4 || []),
      cpCats: sb.window.CP_CATS_I18N || {},
      cpCards: sb.window.CP_DECK80 || []
    }));
    """
    raw = subprocess.check_output(["node", "-e", node_code], text=True)
    data = json.loads(raw)
    _load_bd_and_cp_vaults_for_seo._cache = data
    return data

BD_SEO_BANK_I18N = {
    "en": {
        "sum": "🕍 Official Beit Din Conversion Tribunal Question Directory (120 Sample Questions Across All 10 Halachic Categories — First 4 With Full Answers)",
        "lead": "Preview 120 real Ma'amad Beit Din oral exam questions across all 10 official rabbinical tribunal categories. Cards #1–#4 include the full Halachic answer and Dayanim trap analysis (free preview); cards #5–#120 display the official tribunal questions with answers unlocked inside the 700-Card Interactive Beit Din Trainer.",
        "ans_lbl": "✅ Official Halachic Answer:",
        "tip_lbl": "💡 What the Dayanim Are Testing:",
        "locked_cta": "🔒 Official Halachic Answer & Dayanim Trap Analysis Locked — Unlock in 700-Card Interactive Trainer →",
        "free_badge": "FREE PREVIEW (ANSWER UNLOCKED)",
        "lock_badge": "QUESTION PREVIEW (ANSWER IN APP)"
    },
    "he": {
        "sum": "🕍 מאגר שאלות מעמד בית הדין לגיור (120 שאלות מדגמיות ב-10 קטגוריות הלכתיות — 4 ראשונות עם תשובה מלאה)",
        "lead": "לפניכם 120 שאלות אמיתיות ממעמד בית הדין לגיור ב-10 קטגוריות הליבה. שאלות 1–4 כוללות תשובה הלכתית מלאה ודגשי דיינים (תצוגה חינמית); שאלות 5–120 מציגות את שאלות הדיינים כאשר התשובות המלאות זמינות בסימולטור 700 הכרטיסיות.",
        "ans_lbl": "✅ תשובה הלכתית מלאה:",
        "tip_lbl": "💡 מה הדיינים בודקים בשאלה זו:",
        "locked_cta": "🔒 התשובה ההלכתית ודגשי הדיינים נעולים — פתחו בסימולטור 700 כרטיסיות בית הדין ←",
        "free_badge": "דוגמה חינם (תשובה פתוחה)",
        "lock_badge": "שאלת בית דין (התשובה באפליקציה)"
    },
    "fr": {
        "sum": "🕍 Répertoire des Questions du Tribunal Beit Din (120 Questions sur 10 Catégories Halakhiques — 4 Premières avec Réponses Complètes)",
        "lead": "Consultez 120 vraies questions de l'examen oral du Ma'amad Beit Din réparties dans les 10 catégories officielles. Les fiches #1 à #4 incluent la réponse halakhique complète et l'analyse des Dayanim ; les questions #5 à #120 affichent l'énoncé officiel avec réponses débloquées dans l'entraîneur interactif de 700 cartes.",
        "ans_lbl": "✅ Réponse Halakhique Officielle :",
        "tip_lbl": "💡 Ce que vérifient les Dayanim :",
        "locked_cta": "🔒 Réponse Halakhique & Piège des Dayanim Verrouillés — Ouvrir l'Entraîneur 700 Cartes →",
        "free_badge": "APERÇU GRATUIT (RÉPONSE DÉBLOQUÉE)",
        "lock_badge": "QUESTION OFFICIELLE (RÉPONSE DANS L'APP)"
    },
    "es": {
        "sum": "🕍 Directorio Oficial de Preguntas del Tribunal Beit Din (120 Preguntas en 10 Categorías Halájicas — Primeras 4 con Respuesta Completa)",
        "lead": "Explore 120 preguntas reales del examen oral del Ma'amad Beit Din en las 10 categorías oficiales. Las tarjetas #1–#4 incluyen la respuesta halájica completa y el análisis de los Dayanim; las preguntas #5–#120 muestran la pregunta oficial con respuestas desbloqueadas en el entrenador interactivo de 700 tarjetas.",
        "ans_lbl": "✅ Respuesta Halájica Oficial:",
        "tip_lbl": "💡 Lo que evalúan los Dayanim:",
        "locked_cta": "🔒 Respuesta Halájica y Análisis de Dayanim Bloqueados — Abrir en el Entrenador de 700 Tarjetas →",
        "free_badge": "VISTA PREVIA GRATIS (RESPUESTA ABIERTA)",
        "lock_badge": "PREGUNTA OFICIAL (RESPUESTA EN LA APP)"
    },
    "de": {
        "sum": "🕍 Offizielles Beit-Din-Prüfungsfragen-Verzeichnis (120 Fragen aus allen 10 Halacha-Kategorien — Erste 4 mit vollständiger Antwort)",
        "lead": "Sehen Sie 120 echte mündliche Prüfungsfragen des Ma'amad Beit Din aus allen 10 offiziellen Kategorien. Karten #1–#4 enthalten die vollständige halachische Antwort und Dajanim-Analyse; Fragen #5–#120 zeigen die Prüfungsfrage (Antworten im interaktiven 700-Karten-Trainer).",
        "ans_lbl": "✅ Offizielle Halachische Antwort:",
        "tip_lbl": "💡 Worauf die Dajanim achten:",
        "locked_cta": "🔒 Halachische Antwort & Dajanim-Falle Gesperrt — Im 700-Karten-Trainer Öffnen →",
        "free_badge": "GRATIS-VORSCHAU (ANTWORT OFFEN)",
        "lock_badge": "PRÜFUNGSFRAGE (ANTWORT IN DER APP)"
    },
    "ru": {
        "sum": "🕍 Официальный Каталог Вопросов Раввинского Суда Бейт-Дин (120 Вопросов по 10 Категориям Галахи — Первые 4 с Полными Ответами)",
        "lead": "Изучите 120 реальных вопросов устного экзамена Маамад Бейт-Дин по всем 10 официальным категориям. Карточки №1–№4 содержат полный галахический ответ и разбор ловушек даянов (бесплатно); карточки №5–№120 показывают официальные вопросы суда (ответы доступны в интерактивном тренажере на 700 карточек).",
        "ans_lbl": "✅ Официальный Галахический Ответ:",
        "tip_lbl": "💡 Что именно проверяют Даяны:",
        "locked_cta": "🔒 Галахический Ответ и Разбор Даянов Закрыты — Открыть в Тренажере на 700 Карточек →",
        "free_badge": "БЕСПЛАТНЫЙ ДОСТУП (ОТВЕТ ОТКРЫТ)",
        "lock_badge": "ВОПРОС БЕЙТ-ДИНА (ОТВЕТ В ПРИЛОЖЕНИИ)"
    }
}

CP_SEO_BANK_I18N = {
    "en": {
        "sum": "📱 Official Misrad HaPanim Separated-Room Couples Interrogation Directory (120 Questions Across All 10 Nohal 5.2.0008 / 5.2.0009 Categories — First 4 With Clerk Red-Flag Rules)",
        "lead": "Preview 120 real separated-room spousal visa interrogation questions used by Misrad HaPanim (PIBA) clerks under Nohal 5.2.0008 (married), Nohal 5.2.0009 (unmarried/common-law), and Sec. ג.10 (dual-track Giyur). Questions #1–#4 include the full clerk contradiction trap analysis; questions #5–#120 unlock inside the 2-Phone Live Sync Simulator.",
        "tip_lbl": "🚨 Misrad HaPanim Clerk Contradiction Rule & Anchor Strategy:",
        "locked_cta": "🔒 Clerk Red-Flag Rule & 2-Phone Contradiction Grader Locked — Open 300-Q Couples Simulator →",
        "free_badge": "FREE PREVIEW (CLERK TRAP UNLOCKED)",
        "lock_badge": "INTERROGATION QUESTION (RULE IN APP)"
    },
    "he": {
        "sum": "📱 מאגר שאלות תשאול זוגות בחדרים נפרדים במשרד הפנים (120 שאלות ב-10 קטגוריות נוהל 5.2.0008 / 5.2.0009 — 4 ראשונות עם כללי פקידות)",
        "lead": "לפניכם 120 שאלות אמיתיות מתשאול זוגות בהליך המדורג במשרד הפנים (נוהל 5.2.0008 לנשואים, נוהל 5.2.0009 לידועים בציבור וסעיף ג.10). שאלות 1–4 כוללות את כלל הבדיקה והמלכודת של הפקידה; שאלות 5–120 זמינות בסימולטור סנכרון 2 הטלפונים (300 שאלות).",
        "tip_lbl": "🚨 כלל ההצלבה של פקידת משרד הפנים וטיפ לתיאום:",
        "locked_cta": "🔒 כלל ההצלבה וסימולטור 2 הטלפונים נעולים — פתחו במאגר 300 שאלות הזוגות ←",
        "free_badge": "דוגמה חינם (כלל ההצלבה פתוח)",
        "lock_badge": "שאלת תשאול (הפתרון באפליקציה)"
    },
    "fr": {
        "sum": "📱 Répertoire d'Interrogatoire Séparé des Couples au Misrad HaPanim (120 Questions sur 10 Catégories Nohal 5.2.0008 / 5.2.0009 — 4 Premières avec Règles de l'Agent)",
        "lead": "Découvrez 120 vraies questions d'interrogatoire en salles séparées posées par les agents du Misrad HaPanim (PIBA). Les questions #1 à #4 incluent l'analyse complète des pièges de contradiction ; les questions #5 à #120 se débloquent dans le simulateur de synchronisation sur 2 téléphones.",
        "tip_lbl": "🚨 Règle de Contradiction de l'Agent du Misrad HaPanim :",
        "locked_cta": "🔒 Règle de l'Agent & Synchronisation 2 Téléphones Verrouillées — Ouvrir le Simulateur 300 Questions →",
        "free_badge": "APERÇU GRATUIT (RÈGLE DÉBLOQUÉE)",
        "lock_badge": "QUESTION D'INTERROGATOIRE (RÈGLE DANS L'APP)"
    },
    "es": {
        "sum": "📱 Directorio de Interrogatorio de Parejas en Salas Separadas de Misrad HaPanim (120 Preguntas en 10 Categorías Nohal 5.2.0008 / 5.2.0009 — Primeras 4 con Reglas del Funcionario)",
        "lead": "Explore 120 preguntas reales del interrogatorio en salas separadas de Misrad HaPanim (PIBA). Las preguntas #1–#4 incluyen la regla completa de detección de contradicciones; las preguntas #5–#120 se desbloquean en el simulador de sincronización de 2 teléfonos.",
        "tip_lbl": "🚨 Regla de Contradicción del Funcionario de Misrad HaPanim:",
        "locked_cta": "🔒 Regla del Funcionario y Sincronización de 2 Teléfonos Bloqueadas — Abrir Simulador de 300 Preguntas →",
        "free_badge": "VISTA PREVIA GRATIS (REGLA ABIERTA)",
        "lock_badge": "PREGUNTA OFICIAL (REGLA EN LA APP)"
    },
    "de": {
        "sum": "📱 Misrad HaPanim Fragenkatalog der Getrennten Paar-Befragung (120 Fragen aus 10 Kategorien Nohal 5.2.0008 / 5.2.0009 — Erste 4 mit Prüfer-Regeln)",
        "lead": "Sehen Sie 120 echte Fragen der getrennten Paar-Befragung im Misrad HaPanim (PIBA). Fragen #1–#4 enthalten die vollständige Widerspruchs-Analyse; Fragen #5–#120 werden im 2-Handy-Synchronisations-Simulator freigeschaltet.",
        "tip_lbl": "🚨 Widerspruchs-Regel des Misrad-HaPanim-Prüfers:",
        "locked_cta": "🔒 Prüfer-Regel & 2-Handy-Sync Gesperrt — Im 300-Fragen-Paar-Simulator Öffnen →",
        "free_badge": "GRATIS-VORSCHAU (PRÜFER-REGEL OFFEN)",
        "lock_badge": "BEFRAGUNGSFRAGE (REGEL IN DER APP)"
    },
    "ru": {
        "sum": "📱 Официальный Каталог Вопросов Перекрестного Допроса Пар в МВД Израиля — СТУПРО (120 Вопросов по 10 Категориям Директив 5.2.0008 / 5.2.0009 — Первые 4 с Правилами Чиновников)",
        "lead": "Изучите 120 реальных вопросов перекрестного собеседования пар в разных кабинетах МВД Израиля (СТУПРО). Вопросы №1–№4 содержат полный разбор ловушек на расхождение ответов; вопросы №5–№120 открываются в симуляторе синхронизации 2 телефонов.",
        "tip_lbl": "🚨 Правило Проверки Расхождений Инспектора МВД:",
        "locked_cta": "🔒 Правило Инспектора и Синхронизация 2 Телефонов Закрыты — Открыть Симулятор на 300 Вопросов →",
        "free_badge": "БЕСПЛАТНЫЙ ДОСТУП (РАЗБОР ОТКРЫТ)",
        "lock_badge": "ВОПРОС ДОПРОСА МВД (РАЗБОР В ПРИЛОЖЕНИИ)"
    }
}

def render_prebaked_bd_questions_html(lang):
    data = _load_bd_and_cp_vaults_for_seo()
    cats_map = data.get("bdCats", {})
    cards = data.get("bdCards", [])
    ui = BD_SEO_BANK_I18N.get(lang, BD_SEO_BANK_I18N["en"])
    dir_attr = 'rtl' if lang == 'he' else 'ltr'

    by_cat = {}
    for c in cards:
        ck = c.get("cat", "other")
        by_cat.setdefault(ck, []).append(c)

    out = [
        f'<!-- GAT_SEO_BD_BANK_START -->',
        f'<section id="gat-seo-bd-question-bank" dir="{dir_attr}" style="margin:22px 0;background:#f8fafc;border:2px solid #0284c7;border-radius:14px;padding:14px 16px;">',
        f'<details open style="margin:0;">',
        f'<summary style="font-weight:900;font-size:0.95rem;color:#ffffff;cursor:pointer;line-height:1.4;">{esc_attr(ui["sum"])}</summary>',
        f'<p style="font-size:0.83rem;color:#334155;line-height:1.55;margin:10px 0 14px;">{esc_attr(ui["lead"])}</p>'
    ]

    global_idx = 0
    for ck, clist in by_cat.items():
        cat_obj = cats_map.get(ck, {})
        cat_title = cat_obj.get(lang) or cat_obj.get("en") or ck.upper()
        out.append(f'<h3 style="font-size:0.88rem;font-weight:900;color:#0369a1;margin:14px 0 8px;padding-bottom:4px;border-bottom:1.5px solid #bae6fd;">🕍 {esc_attr(cat_title)}</h3>')
        out.append('<div style="display:grid;gap:7px;">')
        for item in clist[:24]:
            global_idx += 1
            q_str = (item.get("q") or {}).get(lang) or (item.get("q") or {}).get("en") or ""
            he_str = item.get("he") or ""
            is_free = (global_idx <= 4)
            badge_txt = ui["free_badge"] if is_free else ui["lock_badge"]
            badge_bg = "#dcfce7" if is_free else "#fef3c7"
            badge_col = "#065f46" if is_free else "#92400e"
            out.append(
                f'<details style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 12px;"{" open" if is_free else ""}>'
                f'<summary style="font-weight:800;font-size:0.83rem;color:#ffffff;cursor:pointer;line-height:1.42;">'
                f'<span style="color:#0284c7;font-weight:900;">#{global_idx}</span> {esc_attr(q_str)} '
                f'<span style="font-size:0.72rem;color:#64748b;font-weight:700;" dir="rtl">({esc_attr(he_str)})</span> '
                f'<span style="display:inline-block;font-size:0.65rem;font-weight:900;background:{badge_bg};color:{badge_col};padding:2px 6px;border-radius:5px;margin-inline-start:6px;">{esc_attr(badge_txt)}</span>'
                f'</summary>'
            )
            if is_free:
                a_str = (item.get("a") or {}).get(lang) or (item.get("a") or {}).get("en") or ""
                tip_str = (item.get("tip") or {}).get(lang) or (item.get("tip") or {}).get("en") or ""
                out.append(
                    f'<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #cbd5e1;font-size:0.8rem;color:#1e293b;line-height:1.55;">'
                    f'<p style="margin:0 0 6px;"><strong>{esc_attr(ui["ans_lbl"])}</strong> {esc_attr(a_str)}</p>'
                    f'<p style="margin:0;color:#0369a1;background:#f0f9ff;padding:6px 9px;border-radius:7px;"><strong>{esc_attr(ui["tip_lbl"])}</strong> {esc_attr(tip_str)}</p>'
                    f'</div>'
                )
            else:
                out.append(
                    f'<div style="margin-top:8px;padding-top:7px;border-top:1px dashed #e2e8f0;">'
                    f'<a href="/app/?module=beit-din-150&amp;lang={lang}" style="display:inline-block;font-size:0.78rem;font-weight:800;color:#0284c7;text-decoration:none;">{esc_attr(ui["locked_cta"])}</a>'
                    f'</div>'
                )
            out.append('</details>')
        out.append('</div>')

    out.append('</details></section><!-- GAT_SEO_BD_BANK_END -->')
    return "\n".join(out)

def render_prebaked_cp_questions_html(lang):
    data = _load_bd_and_cp_vaults_for_seo()
    cats_map = data.get("cpCats", {})
    cards = data.get("cpCards", [])
    ui = CP_SEO_BANK_I18N.get(lang, CP_SEO_BANK_I18N["en"])
    dir_attr = 'rtl' if lang == 'he' else 'ltr'

    by_cat = {}
    for c in cards:
        ck = c.get("cat", "other")
        by_cat.setdefault(ck, []).append(c)

    out = [
        f'<!-- GAT_SEO_CP_BANK_START -->',
        f'<section id="gat-seo-cp-question-bank" dir="{dir_attr}" style="margin:22px 0;background:#f8fafc;border:2px solid #0d9488;border-radius:14px;padding:14px 16px;">',
        f'<details open style="margin:0;">',
        f'<summary style="font-weight:900;font-size:0.95rem;color:#ffffff;cursor:pointer;line-height:1.4;">{esc_attr(ui["sum"])}</summary>',
        f'<p style="font-size:0.83rem;color:#334155;line-height:1.55;margin:10px 0 14px;">{esc_attr(ui["lead"])}</p>'
    ]

    global_idx = 0
    for ck, clist in by_cat.items():
        cat_obj = cats_map.get(ck, {})
        cat_title = cat_obj.get(lang) or cat_obj.get("en") or ck.upper()
        out.append(f'<h3 style="font-size:0.88rem;font-weight:900;color:#0f766e;margin:14px 0 8px;padding-bottom:4px;border-bottom:1.5px solid #99f6e4;">📱 {esc_attr(cat_title)}</h3>')
        out.append('<div style="display:grid;gap:7px;">')
        for item in clist[:12]:
            global_idx += 1
            q_str = (item.get("q") or {}).get(lang) or (item.get("q") or {}).get("en") or ""
            he_str = item.get("he") or ""
            is_free = (global_idx <= 4)
            badge_txt = ui["free_badge"] if is_free else ui["lock_badge"]
            badge_bg = "#dcfce7" if is_free else "#fef3c7"
            badge_col = "#065f46" if is_free else "#92400e"
            out.append(
                f'<details style="background:#ffffff;border:1px solid #e2e8f0;border-radius:9px;padding:8px 12px;"{" open" if is_free else ""}>'
                f'<summary style="font-weight:800;font-size:0.83rem;color:#ffffff;cursor:pointer;line-height:1.42;">'
                f'<span style="color:#0d9488;font-weight:900;">#{global_idx}</span> {esc_attr(q_str)} '
                f'<span style="font-size:0.72rem;color:#64748b;font-weight:700;" dir="rtl">({esc_attr(he_str)})</span> '
                f'<span style="display:inline-block;font-size:0.65rem;font-weight:900;background:{badge_bg};color:{badge_col};padding:2px 6px;border-radius:5px;margin-inline-start:6px;">{esc_attr(badge_txt)}</span>'
                f'</summary>'
            )
            if is_free:
                tip_str = (item.get("tip") or {}).get(lang) or (item.get("tip") or {}).get("en") or ""
                out.append(
                    f'<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #cbd5e1;font-size:0.8rem;color:#1e293b;line-height:1.55;">'
                    f'<p style="margin:0;color:#0f766e;background:#f0fdfa;padding:6px 9px;border-radius:7px;"><strong>{esc_attr(ui["tip_lbl"])}</strong> {esc_attr(tip_str)}</p>'
                    f'</div>'
                )
            else:
                out.append(
                    f'<div style="margin-top:8px;padding-top:7px;border-top:1px dashed #e2e8f0;">'
                    f'<a href="/app/?module=couples-sync&amp;lang={lang}" style="display:inline-block;font-size:0.78rem;font-weight:800;color:#0d9488;text-decoration:none;">{esc_attr(ui["locked_cta"])}</a>'
                    f'</div>'
                )
            out.append('</details>')
        out.append('</div>')

    out.append('</details></section><!-- GAT_SEO_CP_BANK_END -->')
    return "\n".join(out)

def build_extra_prebaked_spoke_blocks(lang, spoke_slug):
    chunks = []
    if spoke_slug in (
        "beit-din-conversion-questions-israel",
        "how-to-convert-to-judaism-in-israel-giyur-guide",
        "vaadat-charigim-tourist-conversion-israel",
        "gush-etzion-private-conversion-aliyah",
        "overseas-conversion-aliyah-ishur-giyur"
    ):
        chunks.append(render_prebaked_bd_questions_html(lang))
        chunks.append(render_prebaked_liturgy_html(lang))
    if spoke_slug in (
        "misrad-hapanim-couples-interview-questions",
        "misrad-hapanim-spousal-visa-nohal-5-2-0008",
        "israel-unmarried-partner-visa-nohal-5-2-0009",
        "utah-zoom-online-marriage-israel-misrad-hapanim"
    ):
        chunks.append(render_prebaked_cp_questions_html(lang))
    if spoke_slug in (
        "israeli-rabbi-community-letters-beit-din",
        "misrad-hapanim-spousal-visa-nohal-5-2-0008",
        "israel-unmarried-partner-visa-nohal-5-2-0009",
        "how-to-convert-to-judaism-in-israel-giyur-guide",
        "how-to-make-aliyah-and-giyur-israel-without-lawyers"
    ):
        chunks.append(render_prebaked_ref_letters_html(lang))
    chunks.append(render_prebaked_lawyer_vs_diy_html(lang))
    return "".join(chunks)


CLEAN_HUB_META_DESC_6L = {
    "en": "Free 6-language Israel Giyur (Conversion), Aliyah & Misrad HaPanim Spousal Visa command center: 8 Hebrew PIBA forms stamper, 700 Beit Din & 300 Couples Q&As.",
    "he": "מרכז שליטה חינמי ב-6 שפות לגיור, עלייה והליך מדורג במשרד הפנים (נוהל 5.2.0008): מנוע החתמת 8 טפסי PIBA בעברית, 700 שאלות בית דין ו-300 שאלות שימוע זוגי.",
    "fr": "Centre gratuit en 6 langues pour Giyur (Conversion), Aliyah et Visa Conjoint Misrad HaPanim : tamponneur des 8 formulaires PIBA, 700 cartes Beit Din & 300 Qs.",
    "es": "Centro gratuito en 6 idiomas para Guiur (Conversión), Aliyá y Visa de Pareja Misrad HaPanim: estampador de 8 formularios PIBA, 700 tarjetas Beit Din y 300 Qs.",
    "de": "Kostenloses 6-Sprachen-Zentrum für Giur (Konversion), Alija & Misrad HaPanim Ehepartner-Visum: 8 hebräische PIBA-Formulare, 700 Beit-Din- & 300 Paar-Fragen.",
    "ru": "Бесплатный центр на 6 языках по Гиюру, Репатриации и СТУПРО в МВД Израиля: автозаполнение 8 анкет PIBA на иврите, 700 карточек Бейт-Дина и 300 вопросов пар."
}

def render_page(lang, canon_url, spoke_cfg=None):
    d = dicts[lang]
    out = base_html
    b_hub = "https://giyuraliyahtrack.com/" if lang == "en" else f"https://giyuraliyahtrack.com/{lang}/"
    b_hub_rel = "/" if lang == "en" else f"/{lang}/"
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
        back_pill = f'<div style="margin-bottom:10px;"><a href="{b_hub_rel}" style="display:inline-flex;align-items:center;gap:6px;background:#f1f5f9;color:#082548;border:1px solid #cbd5e1;padding:6px 12px;border-radius:999px;font-size:0.78rem;font-weight:800;text-decoration:none;">{BACK_TO_HUB_I18N.get(lang, BACK_TO_HUB_I18N["en"])}</a></div>'

        if obs_key in ("vault_bd_700", "vault_cp_300"):
            h1_txt, intro_txt, cta_txt, cta_href = VAULT_SPOKE_COPY[obs_key][lang]
            sample_list = BD_SAMPLE_CARDS if obs_key == "vault_bd_700" else CP_SAMPLE_CARDS
            qa_blocks = []
            faq_entities = []
            for item in sample_list:
                q_str = html.escape(item["q"].get(lang, item["q"]["en"]))
                body_str = html.escape(item["a"].get(lang, item["a"]["en"])) if "a" in item else html.escape(item["tip"].get(lang, item["tip"]["en"]))
                tip_extra = f'<p style="margin:6px 0 0 0;font-size:0.86rem;color:#0369a1;"><strong>{TIP_LABEL_I18N.get(lang, "💡 Tip:")}</strong> {html.escape(item["tip"].get(lang, item["tip"]["en"]))}</p>' if "a" in item else ""
                qa_blocks.append(
                    f'<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px 14px;margin-bottom:10px;">'
                    f'<h2 style="font-size:0.98rem;color:#082548;margin:0 0 6px 0;">#{item["id"]} • {html.escape(item.get("he",""))} — {q_str}</h2>'
                    f'<p style="margin:0;color:#334155;font-size:0.9rem;line-height:1.55;">{body_str}</p>{tip_extra}</div>'
                )
                if len(faq_entities) < 10:
                    faq_entities.append({"@type": "Question", "name": item["q"].get(lang, item["q"]["en"]), "acceptedAnswer": {"@type": "Answer", "text": (item.get("a") or item["tip"]).get(lang, (item.get("a") or item["tip"])["en"])}})
            art = (
                f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
                f'{back_pill}'
                f'<h1 style="color:#082548;font-size:1.42rem;font-weight:900;margin:0 0 12px;line-height:1.28;">{html.escape(h1_txt)}</h1><p>{html.escape(intro_txt)}</p>'
                f'<div style="margin:16px 0;"><a class="btn-sky" style="background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);border:2px solid #4FC3F7;font-size:0.98rem;" href="{cta_href}">{html.escape(cta_txt)}</a></div>'
                f'{"".join(qa_blocks)}'
                f'<h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>{j_line}</article>'
            )
            if spoke_cfg and "gat-prebaked-lawyer-matrix" not in art:
                art = art.replace("</article>", build_extra_prebaked_spoke_blocks(lang, spoke_cfg["slug"]) + "</article>", 1)
            out = _inject_article_at_very_top(out, art)
            out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
            out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
            safe_title = esc_attr(seo_title)
            safe_desc = make_meta_desc(f"{intro_txt} {st_p}")
            faq_obj = {"@context": "https://schema.org", "@graph": [
                {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}, {"@type": "ListItem", "position": 2, "name": seo_title, "item": canon_url}]},
                {"@type": "FAQPage", "mainEntity": faq_entities}, {"@type": "WebPage", "url": canon_url, "dateModified": "2026-11-20", "author": {"@type": "Organization", "name": "Giyur Aliyah Track Statutory Research Desk", "url": "https://giyuraliyahtrack.com/"}, "reviewedBy": {"@type": "Organization", "name": "Vetted Israeli Immigration & Rabbinic Legal-Tech Review Board (Nohal 5.2.0008 Ed. 16 & Nohal 5.2.0009 Ed. 17)"}}
            ]}
            faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
            out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":\s*"https://schema\.org",\s*(?:"@type":\s*"FAQPage"|"@graph":)[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
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
                        f"<div class='gat-spoke-trap-box'><h3>{secondary.get('badTitle','')}</h3><div>{clean_no_divs(secondary.get('badText',''))}</div></div>"
                        f"<div class='gat-spoke-fix-box'><h3>{secondary.get('goodTitle','')}</h3><div>{clean_no_divs(secondary.get('goodText',''))}</div></div>"
                    )
                art = (
                    f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
                    f'{back_pill}'
                    f'<div style="display:inline-block;background:#e0f2fe;color:#0284c7;font-size:0.76rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">{primary.get("tag","")}</div>'
                    f'<h1 style="color:#082548;font-size:1.42rem;font-weight:900;margin:0 0 12px;line-height:1.28;">{lead_h1}</h1>'
                    f'<div>{primary.get("body","")}</div>'
                    f'<div class="gat-spoke-trap-box"><h2>{primary.get("badTitle","")}</h2><div>{clean_no_divs(primary.get("badText",""))}</div></div>'
                    f'<div class="gat-spoke-fix-box"><h2>{primary.get("goodTitle","")}</h2><div>{clean_no_divs(primary.get("goodText",""))}</div></div>'
                    f'{sec_html}'
                    f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
                    f'<h2>{st_t}</h2><p>{st_p}</p><h3>{diy_t}</h3><p>{diy_p}</p>{j_line}</article>'
                )
                extra_tbl = ""
                if spoke_cfg["slug"] == "aliyah-benefits-sal-klita-24-month-rule-cost-calculator":
                    extra_tbl = render_seo_data_table(lang, SAL_KLITA_SNIPPET_TABLE_I18N)
                elif spoke_cfg["slug"] == "apostille-180-day-clock-fbi-police-check-israel":
                    extra_tbl = render_seo_data_table(lang, APOSTILLE_JURISDICTION_TABLE_I18N)
                elif spoke_cfg["slug"] in ("israel-unmarried-partner-visa-nohal-5-2-0009", "utah-zoom-online-marriage-israel-misrad-hapanim", "misrad-hapanim-spousal-visa-nohal-5-2-0008"):
                    extra_tbl = render_seo_data_table(lang, SPOUSAL_520008_VS_520009_TABLE_I18N)
                if extra_tbl:
                    art = art.replace("</article>", extra_tbl + "</article>", 1)
                if spoke_cfg and "gat-prebaked-lawyer-matrix" not in art:
                    art = art.replace("</article>", build_extra_prebaked_spoke_blocks(lang, spoke_cfg["slug"]) + "</article>", 1)
                out = _inject_article_at_very_top(out, art)
                out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
                out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)
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
                    {"@type": "FAQPage", "mainEntity": faq_entities}, {"@type": "WebPage", "url": canon_url, "dateModified": "2026-11-20", "author": {"@type": "Organization", "name": "Giyur Aliyah Track Statutory Research Desk", "url": "https://giyuraliyahtrack.com/"}, "reviewedBy": {"@type": "Organization", "name": "Vetted Israeli Immigration & Rabbinic Legal-Tech Review Board (Nohal 5.2.0008 Ed. 16 & Nohal 5.2.0009 Ed. 17)"}}
                ]}
                faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
                out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":\s*"https://schema\.org",\s*(?:"@type":\s*"FAQPage"|"@graph":)[\s\S]*?</script>', lambda _: faq_tag, out, count=1)
            else:
                safe_title = esc_attr(seo_title)
                safe_desc = make_meta_desc(st_p)
    else:
        safe_title = esc_attr(HUB_SEO_TITLES[lang])
        safe_desc = esc_attr(CLEAN_HUB_META_DESC_6L.get(lang, CLEAN_HUB_META_DESC_6L["en"]))
        out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '<!-- SEO_LIB_START --><!-- SEO_LIB_END -->', out, count=1)
        if 'id="gat-hub-seo-library-drawer"' not in out:
            out = wrap_root_hub_for_clean_onboarding(out, lang)
        hub_faqs = [{"@type": "Question", "name": st_t, "acceptedAnswer": {"@type": "Answer", "text": st_p}}]
        for ob_item in d.get("_obstacles", [])[:9]:
            q_txt = f"{ob_item.get('tag','')} — {ob_item.get('title','')}".strip(" —")
            a_txt = re.sub(r"<[^>]+>", " ", f"{ob_item.get('body','')} {ob_item.get('goodText','')}").strip()[:650]
            if q_txt and a_txt:
                hub_faqs.append({"@type": "Question", "name": q_txt, "acceptedAnswer": {"@type": "Answer", "text": a_txt}})
        hub_faq_obj = {"@context": "https://schema.org", "@graph": [
            {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Giyur Aliyah Track", "item": b_hub}]},
            {"@type": "FAQPage", "mainEntity": hub_faqs}, {"@type": "WebPage", "url": canon_url, "dateModified": "2026-11-20", "author": {"@type": "Organization", "name": "Giyur Aliyah Track Statutory Research Desk", "url": "https://giyuraliyahtrack.com/"}, "reviewedBy": {"@type": "Organization", "name": "Vetted Israeli Immigration & Rabbinic Legal-Tech Review Board (Nohal 5.2.0008 Ed. 16 & Nohal 5.2.0009 Ed. 17)"}}
        ]}
        hub_faq_tag = '<script type="application/ld+json">\n' + json.dumps(hub_faq_obj, ensure_ascii=False) + '\n</script>'
        out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":\s*"https://schema\.org",\s*(?:"@type":\s*"FAQPage"|"@graph":)[\s\S]*?</script>', lambda _: hub_faq_tag, out, count=1)

    out = localize_global_jsonld(out, lang, canon_url)
    out = re.sub(r"<title>.*?</title>
  <link rel="icon" href="/favicon.ico?v=1795487702" sizes="48x48">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=1795487702">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=1795487702">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=1795487702">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1795487702">
  <link rel="manifest" href="/site.webmanifest?v=1795487702">", lambda _: f"<title>{safe_title}</title>", out, count=1)
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
            out = out.replace(f'href="/{lang}/{en_s}/"', f'href="/{lang}/{loc_s}/"')
    return out


def normalize_form_links_in_html(html_str, lang):
    if "FORM_CATALOG" not in globals():
        return html_str
    for f_cfg in FORM_CATALOG:
        loc_slug = f_cfg["l_slugs"].get(lang, f_cfg["l_slugs"]["en"])
        canon_form_path = f"/forms/{loc_slug}/" if lang == "en" else f"/{lang}/forms/{loc_slug}/"
        short_s = f_cfg.get("short_slug", "")
        en_s = f_cfg["l_slugs"]["en"]
        for cand in filter(None, [short_s, en_s]):
            html_str = html_str.replace(f'href="/forms/{cand}/"', f'href="{canon_form_path}"')
            html_str = html_str.replace(f'href="/{lang}/forms/{cand}/"', f'href="{canon_form_path}"')
            html_str = html_str.replace(f"href='/forms/{cand}/'", f"href='{canon_form_path}'")
            html_str = html_str.replace(f"href='/{lang}/forms/{cand}/'", f"href='{canon_form_path}'")
    return html_str

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
        "key": "sec_cv", "short_slug": "security-cv", "code": "Nativ Security CV (שאלון נתיב)", "raw_pdf": "/app/forms/SecurityCV.pdf",
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


def _build_unique_form_walkthrough_html(lang, f_key, is_hub):
    if is_hub:
        cards = []
        for k in ["ash1", "ash3", "ash6", "ash456", "mr14a", "mr14b", "nespach_alef", "sec_cv"]:
            sp_h, sp_rows = FORM_UNIQUE_SPECS_I18N[k].get(lang, FORM_UNIQUE_SPECS_I18N[k]["en"])
            cards.append(f'<div class="gat-step-item-card" style="margin-bottom:10px;"><strong>{html.escape(sp_h)}</strong><p style="margin:4px 0 0 0;font-size:0.86rem;">{html.escape(sp_rows[0][1])}</p></div>')
        return "".join(cards)
    sp_h, sp_rows = FORM_UNIQUE_SPECS_I18N.get(f_key, FORM_UNIQUE_SPECS_I18N["ash6"]).get(lang, FORM_UNIQUE_SPECS_I18N["ash6"]["en"])
    fg = _FV_DATA.get("guide", {}).get(lang, {}).get(f_key, {})
    fg_extra = ""
    if isinstance(fg, dict) and fg:
        fg_vals = [f"<li style='margin-bottom:6px;'>{html.escape(str(v))}</li>" for v in fg.values() if isinstance(v, str) and len(v) > 15]
        if fg_vals:
            fg_extra = "<ul style='margin:10px 0;padding-inline-start:20px;'>" + "".join(fg_vals[:6]) + "</ul>"
    rows_html = "".join([
        f'<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:12px 14px;margin-bottom:10px;">'
        f'<h3 style="font-size:0.95rem;color:#082548;margin:0 0 5px 0;">{html.escape(rt)}</h3>'
        f'<p style="margin:0;font-size:0.88rem;color:#334155;line-height:1.55;">{html.escape(rb)}</p></div>'
        for rt, rb in sp_rows
    ])
    return f'<h2>{html.escape(sp_h)}</h2>{rows_html}{fg_extra}'

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

    badge_code = FORMS_BADGE_8_I18N.get(lang, "8 PIBA & NATIV FORMS") if is_hub else f_cfg["code"]
    cta_target = f"/app/?mod=hebrew-engine&lang={lang}" if is_hub else f"/app/?mod=hebrew-engine&form={f_key}&lang={lang}"
    raw_btn_html = "" if is_hub else f'<a class="btn-outline-card" style="padding:12px 16px;font-size:0.88rem;font-weight:800;margin-top:0;" href="{f_cfg["raw_pdf"]}" target="_blank" rel="noopener">{dl_lbl}</a>'

    art_html = (
        f'<article class="seo-spoke-article" style="border-top:5px solid #03A9F4;">'
        f'<div style="display:inline-block;background:#e0f2fe;color:#0284c7;font-size:0.76rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">{STAGE_UI_STATIC_I18N.get(lang, STAGE_UI_STATIC_I18N["en"])[5]} • {badge_code}</div>'
        f'<h1>{h1_str}</h1>'
        f'<div style="margin:14px 0;"><h2 style="font-size:1.08rem;margin-bottom:8px;">{mesh_hdr}</h2><div class="seo-mesh-grid">{links_html}</div></div>'
        f'<h3>{trap_hdr}</h3><p>{trap_str}</p>'
        f'<div style="display:flex;flex-direction:column;gap:10px;margin:18px 0;">'
        f'<a class="btn-sky" style="background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);border:2px solid #4FC3F7;font-size:0.98rem;" href="{cta_target}">{cta_lbl} →</a>'
        f'{raw_btn_html}</div>'
        f'<h2>{deep_hdr}</h2><div>{deep_body}</div>'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'{_build_unique_form_walkthrough_html(lang, f_key, is_hub)}'
        f'<hr style="margin:16px 0;border:none;border-top:1px solid #e2e8f0;"/>'
        f'<h3>{st_t}</h3><p>{st_p}</p>'
        f'<h3>{DIY_VS_LAWYERS_NBN_I18N[lang][0]}</h3><p>{DIY_VS_LAWYERS_NBN_I18N[lang][1]}</p>{j_line}</article>'
    )

    out = re.sub(r'<h1\b([^>]*)>([\s\S]*?)</h1>', r'<h2\1>\2</h2>', out)
    out = _inject_article_at_very_top(out, art_html)
    out = re.sub(r'<!-- SEO_LIB_START -->[\s\S]*?<!-- SEO_LIB_END -->', '', out, count=1)
    out = re.sub(r'<div class="seo-obstacle-library">[\s\S]*?</div>', '', out, count=1)

    safe_title = esc_attr(seo_title_str)
    safe_desc = make_meta_desc(f"{h1_str}. {trap_str}")
    out = localize_global_jsonld(out, lang, canon_url)
    out = re.sub(r"<title>.*?</title>", lambda _: f"<title>{safe_title}</title>", out, count=1)
    out = re.sub(r'<meta name="description" content="[^"]*" />', lambda _: f'<meta name="description" content="{safe_desc}" />', out, count=1)

    faq_entities = [
        {"@type": "Question", "name": h1_str, "acceptedAnswer": {"@type": "Answer", "text": trap_str}},
        {"@type": "Question", "name": deep_hdr, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", " ", deep_body).strip()[:700]}},
        {"@type": "Question", "name": FORM_UNIQUE_SPECS_I18N.get(f_key, FORM_UNIQUE_SPECS_I18N["ash6"]).get(lang, FORM_UNIQUE_SPECS_I18N["ash6"]["en"])[0], "acceptedAnswer": {"@type": "Answer", "text": " • ".join([r[0] + ": " + r[1] for r in FORM_UNIQUE_SPECS_I18N.get(f_key, FORM_UNIQUE_SPECS_I18N["ash6"]).get(lang, FORM_UNIQUE_SPECS_I18N["ash6"]["en"])[1]])[:700]}},
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
        {"@type": "FAQPage", "mainEntity": faq_entities}, {"@type": "WebPage", "url": canon_url, "dateModified": "2026-11-20", "author": {"@type": "Organization", "name": "Giyur Aliyah Track Statutory Research Desk", "url": "https://giyuraliyahtrack.com/"}, "reviewedBy": {"@type": "Organization", "name": "Vetted Israeli Immigration & Rabbinic Legal-Tech Review Board (Nohal 5.2.0008 Ed. 16 & Nohal 5.2.0009 Ed. 17)"}}
    ]}
    faq_tag = '<script type="application/ld+json">\n' + json.dumps(faq_obj, ensure_ascii=False) + '\n</script>'
    out = re.sub(r'<script type="application/ld\+json">\s*\{"@context":\s*"https://schema\.org",\s*(?:"@type":\s*"FAQPage"|"@graph":)[\s\S]*?</script>', lambda _: faq_tag, out, count=1)

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
    "fr": "Tarifs & 23 Pass — Conversion, Visa Conjoint & Aliyah",
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

for _admin_p in ("public/concierge/index.html", "public/analytics/index.html", "public/404.html"):
    if os.path.exists(_admin_p):
        _ch = open(_admin_p, encoding="utf-8").read()
        _ch = re.sub(r'<meta name="robots" content="[^"]*"\s*/?>', '<meta name="robots" content="noindex, nofollow" />', _ch, count=1)
        open(_admin_p, "w", encoding="utf-8").write(_ch)

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
print(f"✅ Rebuilt all 6-Language Hubs, {len(SPOKES)*6} Spoke Pages (incl. 3 Broad-Intent Pillars + 700 BD & 300 CP Vault Pillars), 54 Form Pages & {len([u for u in sm if '<loc>' in u])} Sitemap URLs (LIVE_SEO = {LIVE_SEO})!")

import glob
for _lg in LANGS:
    _pattern = os.path.join("public", _lg, "**", "*.html") if _lg != "en" else os.path.join("public", "**", "*.html")
    for _hf in glob.glob(_pattern, recursive=True):
        _rel = os.path.relpath(_hf, "public")
        _first = _rel.split(os.sep)[0]
        if _lg == "en" and _first in ("he", "fr", "es", "de", "ru"):
            continue
        _raw = open(_hf, encoding="utf-8").read()
        _fixed = normalize_form_links_in_html(_raw, _lg)
        if _fixed != _raw:
            open(_hf, "w", encoding="utf-8").write(_fixed)



# === GAT LOCALIZED PRICING & CONCIERGE OG IMAGE SYNC ===
for _lg in ["he", "fr", "es", "de", "ru"]:
    for _sub in ["pricing/index.html", "concierge-booking/index.html"]:
        _p = f"public/{_lg}/{_sub}"
        if os.path.exists(_p):
            _h = open(_p, "r", encoding="utf-8").read()
            _h = _h.replace("og-share-en-1200x630.jpg", f"og-share-{_lg}-1200x630.jpg")
            open(_p, "w", encoding="utf-8").write(_h)


# === GAT JSON-LD RICH RESULTS ENRICHER (IMAGE + SHIPPING + RETURN POLICY) ===
def _gat_enrich_all_html_jsonld():
    from pathlib import Path as _Path
    _pub = _Path("public")
    def _enrich(node, lg):
        if isinstance(node, list):
            for x in node: _enrich(x, lg)
            return
        if not isinstance(node, dict): return
        t = node.get("@type")
        img = f"https://giyuraliyahtrack.com/og-share-{lg}-1200x630.jpg"
        if t in ("Product", "SoftwareApplication", "WebApplication", "Service"):
            node["image"] = [img]
        if t == "Offer":
            av = node.get("availability", "")
            if av.startswith("http://"): node["availability"] = av.replace("http://", "https://", 1)
            node.setdefault("shippingDetails", {
                "@type": "OfferShippingDetails",
                "shippingRate": {"@type": "MonetaryAmount", "value": 0, "currency": node.get("priceCurrency", "USD")},
                "shippingDestination": {"@type": "DefinedRegion", "addressCountry": "IL"},
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {"@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY"},
                    "transitTime": {"@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY"}
                }
            })
            node.setdefault("hasMerchantReturnPolicy", {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "IL",
                "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
            })
        for v in node.values():
            if isinstance(v, (dict, list)): _enrich(v, lg)

    for _hf in sorted(_pub.rglob("*.html")):
        _rel = _hf.relative_to(_pub).as_posix()
        _first = _rel.split("/")[0]
        _lg = _first if _first in ("he", "fr", "es", "de", "ru") else "en"
        _txt = _hf.read_text(encoding="utf-8", errors="ignore")
        if "application/ld+json" not in _txt: continue
        def _sub_fn(m):
            try:
                d = json.loads(m.group(2))
                _enrich(d, _lg)
                return m.group(1) + "\n" + json.dumps(d, ensure_ascii=False, indent=2) + "\n" + m.group(3)
            except Exception:
                return m.group(0)
        _new = re.sub(r'(<script\s+type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)', _sub_fn, _txt, flags=re.S | re.I)
        if _new != _txt:
            _hf.write_text(_new, encoding="utf-8")

_gat_enrich_all_html_jsonld()

# === GAT MULTI-CRAWLER ROBOTS.TXT SYNC ===
if LIVE_SEO:
    open('public/robots.txt', 'w', encoding='utf-8').write('# Giyur Aliyah Track — Official 6-Language Search, AI & Social Crawler Policy\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Google-InspectionTool\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: bingbot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Applebot\nAllow: /\n\nUser-agent: DuckDuckBot\nAllow: /\n\nUser-agent: YandexBot\nAllow: /\n\nUser-agent: WhatsApp\nAllow: /\n\nUser-agent: TelegramBot\nAllow: /\n\nUser-agent: facebookexternalhit\nAllow: /\n\nUser-agent: Facebot\nAllow: /\n\nUser-agent: Twitterbot\nAllow: /\n\nUser-agent: LinkedInBot\nAllow: /\n\nUser-agent: *\nAllow: /\nDisallow: /analytics/\nDisallow: /concierge/\n\nSitemap: https://giyuraliyahtrack.com/sitemap.xml\n')

# === GAT YANDEX WEBMASTER VERIFICATION HOOK ===
open("public/yandex_80b2cde709a35b2f.html", "w", encoding="utf-8").write('<html>\n    <head>\n        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n    </head>\n    <body>Verification: 80b2cde709a35b2f</body>\n</html>')
