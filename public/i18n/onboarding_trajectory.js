(function captureGatInitialUrlBeforeHydration() {
  if (!window.__GAT_INITIAL_URL_STATE) {
    window.__GAT_INITIAL_URL_STATE = {
      search: window.location.search || "",
      hash: window.location.hash || "",
      pathname: window.location.pathname || "/",
      hydrated: false
    };
  }
})();
/* ============================================================================
 * GIYUR ALIYAH TRACK — PROGRESSIVE ONBOARDING & VERTICAL TRAJECTORY ENGINE
 * Zero-localStorage Track State: Pre-login RAM -> Firestore `users/{uid}.trackBlueprint`
 * Synchronizes automatically across up to 5 devices per user + Spok
 * ============================================================================ */
(function initGatOnboardingAndTrajectoryEngine() {
  var arrowChar = "→";
  function readLocalBlueprint() {
    try { return JSON.parse(localStorage.getItem("gat_track_blueprint_v1") || "null"); } catch (e) { return null; }
  }
  function loadLocalBlueprint() { return readLocalBlueprint(); }
  if (window._gatOnboardingEngineLoaded) return;
  window._gatOnboardingEngineLoaded = true;

  const VALID_LANGS = ["en", "he", "fr", "es", "de", "ru"];

  // Strictly RAM-only state (NEVER persisted to localStorage or cookies)
  window.__gatActiveBlueprint = window.__gatActiveBlueprint || null;
  window._gatUserClickedStartTrack = false;
  window.__gatWizardState = {
    mode: "hero_landing", // "intro_q1" | "q2" | "q2b" | "q3" | "q4" | "em1" | "em2" | "timeline"
    showCourtHelper: false,
    forceRetake: false,
    syncingCloud: false,
    answers: {
      q1_goal: "",
      q2_household: "",
      q2b_partner_status: "",
      q2b_relationship: "",
      q3_location: "",
      q4_detail: "",
      em_q1_loc: "",
      em_q2_elig: ""
    }
  };

  // Exact 6-language SEO Spoke Slug Map
  const SPOKE_SLUGS = {
    "emergency-aliyah-go-bag-shinui-maamad": {
      en: "emergency-aliyah-go-bag-shinui-maamad",
      he: "aliyat-cherum-tik-mismachim-shinui-maamad",
      fr: "aliyah-urgence-dossier-apostille-shinui-maamad",
      es: "aliya-emergencia-carpeta-apostilla-shinui-maamad",
      de: "notfall-alija-apostille-dokumente-shinui-maamad",
      ru: "ekstrennaya-repatriaciya-dokumenty-shinuj-maamad"
    },
    "apostille-180-day-clock-fbi-police-check-israel": {
      en: "apostille-180-day-clock-fbi-police-check-israel",
      he: "5-mismachei-apostille-teudat-yosher-180-yom",
      fr: "5-documents-apostille-casier-judiciaire-180-jours-israel",
      es: "5-documentos-apostilla-antecedentes-penales-180-dias-israel",
      de: "5-apostille-dokumente-fuehrungszeugnis-180-tage-israel",
      ru: "5-dokumentov-apostil-spravka-o-nesudimosti-180-dnej-izrail"
    },
    "gush-etzion-private-conversion-aliyah": {
      en: "gush-etzion-private-conversion-aliyah",
      he: "giyur-prati-gush-etzion-bnei-brak-rabbanut-aliyah",
      fr: "conversion-privee-gush-etzion-bnei-brak-aliyah-rabbinat",
      es: "conversion-privada-gush-etzion-bnei-brak-aliya-rabinato",
      de: "privater-giur-gush-etzion-bnei-brak-alija-rabbinat",
      ru: "chastnyj-giyur-gush-ecion-bnej-brak-repatriaciya-ravvinat"
    },
    "vaadat-charigim-tourist-conversion-israel": {
      en: "vaadat-charigim-tourist-conversion-israel",
      he: "vaadat-charigim-giyur-ashrat-tayar-tofes-ash1",
      fr: "vaadat-charigim-conversion-visa-touriste-israel-ash1",
      es: "vaadat-jariguim-conversion-visa-turista-israel-ash1",
      de: "vaadat-charigim-giur-touristenvisum-israel-ash1",
      ru: "vaadat-harigim-giyur-turisticheskaya-viza-izrail-ash1"
    },
    "hebrew-clerk-letter-translator-form-ash1-ash3": {
      en: "hebrew-clerk-letter-translator-form-ash1-ash3",
      he: "drishat-mismachim-misrad-hapanim-tofes-ash1-ash3",
      fr: "traducteur-lettre-misrad-hapanim-formulaire-ash1-ash3",
      es: "traductor-carta-misrad-hapanim-formulario-ash1-ash3",
      de: "misrad-hapanim-schreiben-uebersetzer-formular-ash1-ash3",
      ru: "perevod-pisma-mvd-izrailya-anketa-ash1-ash3"
    },
    "israeli-rabbi-community-letters-beit-din": {
      en: "israeli-rabbi-community-letters-beit-din",
      he: "rav-melaveh-madrichat-kallah-michtavei-hamlatza-beit-din",
      fr: "rabbin-accompagnateur-madrichat-kallah-lettres-beit-din",
      es: "rabino-patrocinador-madrijat-kala-cartas-beit-din",
      de: "begleitender-rabbiner-madrichat-kallah-empfehlung-beit-din",
      ru: "soprovozhdayushchij-ravvin-madrihat-kalla-pisma-bejt-din"
    },
    "misrad-hapanim-spousal-visa-nohal-5-2-0008": {
      en: "misrad-hapanim-spousal-visa-nohal-5-2-0008",
      he: "halich-medurag-bnei-zug-nohal-5-2-0008-tofes-ash6",
      fr: "visa-conjoint-israel-misrad-hapanim-nohal-5-2-0008-ash6",
      es: "visa-pareja-conyuge-israel-misrad-hapanim-nohal-5-2-0008-ash6",
      de: "ehepartner-visum-israel-misrad-hapanim-nohal-5-2-0008-ash6",
      ru: "stupenchataya-procedura-sst-mvd-izrailya-nohal-5-2-0008-ash6"
    },
    "aliyah-spousal-visa-criminal-record-rehabilitation": {
      en: "aliyah-spousal-visa-criminal-record-rehabilitation",
      he: "aliyah-halich-medurag-avar-plili-teudat-yosher",
      fr: "aliyah-visa-conjoint-casier-judiciaire-rehabilitation",
      es: "aliya-visa-pareja-antecedentes-penales-rehabilitacion",
      de: "alija-ehepartner-visum-vorstrafe-fuehrungszeugnis",
      ru: "repatriaciya-sst-izrail-sudimost-spravka-mvd"
    },
    "tourist-visa-israel-remote-work-housing-giyur": {
      en: "tourist-visa-israel-remote-work-housing-giyur",
      he: "ashrat-tayar-avoda-merachok-megurim-bituach-refui",
      fr: "visa-touriste-israel-teletravail-logement-assurance-sante",
      es: "visa-turista-israel-trabajo-remoto-alojamiento-seguro-medico",
      de: "touristenvisum-israel-fernstudium-wohnung-krankenversicherung",
      ru: "turisticheskaya-viza-izrail-udalennaya-rabota-zhile-strahovka"
    },
    "dahan-ruling-non-orthodox-conversion-aliyah-truth": {
      en: "dahan-ruling-non-orthodox-conversion-aliyah-truth",
      he: "psak-din-dahan-giyur-reformi-konservativi-rabbanut",
      fr: "arret-dahan-conversion-reformee-massorti-aliyah-rabbinat",
      es: "fallo-dahan-conversion-reformista-conservadora-aliya-rabinato",
      de: "dahan-urteil-reform-konservativer-giur-alija-rabbinat",
      ru: "reshenie-dahan-reformistskij-konservativnyj-giyur-ravvinat"
    },
    "overseas-conversion-aliyah-ishur-giyur": {
      en: "overseas-conversion-aliyah-ishur-giyur",
      he: "giyur-bachul-rca-london-consistoire-ishur-giyur-aliyah",
      fr: "conversion-consistoire-etranger-aliyah-ishur-giyur-rabbinat",
      es: "conversion-extranjero-amia-fcje-aliya-ishur-giyur-rabinato",
      de: "auslands-giur-ord-ikg-alija-ishur-giyur-oberrabbinat",
      ru: "zarubezhnyj-giyur-feor-keroor-repatriaciya-ishur-giyur"
    },
    "newborn-baby-teudat-zehut-sefach-registration-israel": {
      en: "newborn-baby-teudat-zehut-sefach-registration-israel",
      he: "rishum-tinok-sefach-teudat-zehut-misrad-hapanim-bdikat-rikmot",
      fr: "inscription-nouveau-ne-teudat-zehut-sefach-misrad-hapanim",
      es: "registro-bebe-recien-nacido-teudat-zehut-sefach-israel",
      de: "neugeborenes-baby-teudat-zehut-sefach-registrierung-israel",
      ru: "registraciya-novorozhdennogo-rebenka-teudat-zeut-sefah-mvd"
    },
    "beit-din-conversion-questions-israel": {
      en: "beit-din-conversion-questions-israel",
      he: "sheelot-beit-din-legiyur-700-tshuvot",
      fr: "questions-beit-din-conversion-israel-700",
      es: "preguntas-beit-din-conversion-israel-700",
      de: "beit-din-fragen-konversion-giur-israel-700",
      ru: "voprosy-bejt-dina-giyur-izrail-700"
    },
    "misrad-hapanim-couples-interview-questions": {
      en: "misrad-hapanim-couples-interview-questions",
      he: "300-sheelot-shimua-zugi-misrad-hapanim",
      fr: "300-questions-entretien-couple-misrad-hapanim",
      es: "300-preguntas-entrevista-pareja-misrad-hapanim",
      de: "300-fragen-paar-interview-misrad-hapanim",
      ru: "300-voprosov-sobesedovanie-stupro-mvd-izrailya"
    },
    "how-to-make-aliyah-and-giyur-israel-without-lawyers": {
      en: "how-to-make-aliyah-and-giyur-israel-without-lawyers",
      he: "eich-laasot-aliyah-giyur-halich-medurag-bli-orech-din",
      fr: "comment-faire-aliyah-conversion-giyur-israel-sans-avocat",
      es: "como-hacer-aliya-conversion-israel-sin-abogados-guia",
      de: "alija-giur-partner-visum-israel-ohne-anwalt-leitfaden",
      ru: "kak-sdelat-aliyu-giyur-stupro-v-izraile-bez-advokatov"
    },
    "aliyah-benefits-sal-klita-24-month-rule-cost-calculator": {
      en: "aliyah-benefits-sal-klita-24-month-rule-cost-calculator",
      he: "zchuyot-olim-sal-klita-malkodet-24-chodashim-aluyot",
      fr: "droits-aliyah-sal-klita-piege-24-mois-calculateur-couts",
      es: "beneficios-aliya-sal-klita-regla-24-meses-costos-reales",
      de: "alija-vorteile-sal-klita-24-monate-falle-kosten-rechner",
      ru: "lgoty-alii-sal-klita-lovushka-24-mesyacev-realnye-rashody"
    },
    "how-to-convert-to-judaism-in-israel-giyur-guide": {
      en: "how-to-convert-to-judaism-in-israel-giyur-guide",
      he: "eich-laavor-giyur-beisrael-mamlachti-prati-rabbanut",
      fr: "comment-se-convertir-au-judaisme-en-israel-giyur-guide",
      es: "como-convertirse-al-judaismo-en-israel-guiur-guia",
      de: "konversion-zum-judentum-in-israel-giur-leitfaden",
      ru: "kak-projti-giyur-v-izraile-gosudarstvennyj-chastnyj-gid"
    }
  };

  function getLang() {
    const seg = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (VALID_LANGS.indexOf(seg) !== -1) return seg;
    try {
      const q = (new URLSearchParams(window.location.search).get("lang") || "").slice(0, 2).toLowerCase();
      if (VALID_LANGS.indexOf(q) !== -1) return q;
    } catch (e) {}
    const st = String(window.appLang || window.gatLang || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return VALID_LANGS.indexOf(st) !== -1 ? st : "en";
  }

  function spokeUrl(enSlug, l) {
    const map = SPOKE_SLUGS[enSlug];
    const loc = (map && map[l]) ? map[l] : enSlug;
    return l === "en" ? ("/" + loc + "/") : ("/" + l + "/" + loc + "/");
  }

  function appUrl(mod, form, l) {
    return "/app/?module=" + encodeURIComponent(mod) + (form ? "&form=" + encodeURIComponent(form) : "") + "&lang=" + encodeURIComponent(l);
  }

  function bookingUrl(l) {
    return l === "en" ? "/concierge-booking/" : ("/" + l + "/concierge-booking/");
  }

  function getApiUrl() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  function isUserSignedIn() {
    if (typeof window.isGatUserLoggedIn === "function" && window.isGatUserLoggedIn()) return true;
    const u = String(window.gatUid || "");
    if (u.indexOf("wa_") === 0) return true;
    try {
      return Boolean(localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_device_auth_tok"));
    } catch (e) {
      return false;
    }
  }

  // ==========================================================================
  // 6-LANGUAGE UI COPY (WIZARD, EMERGENCY TRIAGE, TIMELINE & TRACKER)
  // ==========================================================================

  const RACHEL_TRANSPARENCY_I18N = {
    en: {
      helperBoxTitle: "State Rabbanut vs. Private Orthodox Beit Din (The Unfiltered Truth):",
      helperBoxBody: "• Need Israeli citizenship (Aliyah) OR Chief Rabbinate marriage registration in Israel? Misrad HaPanim and the Chief Rabbinate ONLY recognize the State Conversion Track (Nativ / Va'adat Charigim) or 9+ months in an approved overseas community.\n• ⚠️ Warning on Private Orthodox Beit Dins (Gush Etzion / Bnei Brak): While 100% Halachically kosher, Misrad HaPanim blocks Aliyah on a tourist private conversion, and the Chief Rabbinate refuses to register your marriage unless you complete a separate State Rabbanut validation track!",
      startMyPathBtn: "🚀 Start My Path →",
      q1OptRejected: ["visa_rejected_rescue", "🛑 I Was Rejected Due to My Visa / Va'adat Charigim", "See your immediate 21-day appeal rights, legal pivots & rescue steps"],
      q3OptStudent: ["israel_visa", "🎓 Inside Israel on a Student, Masa, or A/5 Temp Resident Visa", "A/2 student, Masa, or A/5 temporary resident permit"],
      q3OptB1Work: ["israel_b1_work", "🛠️ Inside Israel on a Work Visa (B/1)", "Important: See our B/1 foreign-labor vs. spousal B/1 scrutiny disclaimer"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 My Visa or Va'adat Charigim Application Was Rejected", "Urgent steps to freeze departure orders, appeal, or pivot tracks"],
      b1DisclaimerTitle: "🛡️ Radical Transparency: Work Visas (B/1) & High Rejection Rates",
      b1DisclaimerBody: "Unlike agencies that tell you what you want to hear: while B/1 holders can technically submit a conversion application, standard foreign labor B/1 visas face the highest rejection rates. The Exceptions Committee (which includes Misrad HaPanim / PIBA officials alongside the Conversion Authority) heavily scrutinizes B/1 workers out of concern that conversion is being used to bypass immigration rules and secure permanent residency.\n\n💡 Crucial Exception: A B/1 visa granted specifically to the spouse/partner of an Israeli citizen (Nohal 5.2.0008 / 5.2.0009) is treated much more favorably under Sec. ג.10!",
      b1AskAiBtn: "✨ Ask Spok How to Maximize My B/1 Approval Chances →",
      b1AskAiPrompt: "I am in Israel on a B/1 Work Visa. Explain how PIBA and Va'adat Charigim scrutinize B/1 visas (foreign labor B/1 vs. spousal B/1) and how I can maximize my chances of approval without getting rejected.",
      rejBannerTitle: "🛑 Visa / Va'adat Charigim Rejection Rescue Protocol",
      rejBannerBody: "Do NOT panic and do NOT overstay unlawfully. A visa or Va'adat Charigim refusal usually comes with a 14-day departure notice—but under PIBA Nohal 1.6.0001 you have a strict 21-day window to file a formal written internal appeal (or pivot to an anchored track). Follow the numbered rescue steps below immediately:",
      rejAskAiBtn: "✨ Ask Spok to Analyze My Rejection & Next Steps →",
      rejAskAiPrompt: "My Israeli visa or Va'adat Charigim application was rejected. Walk me through what I can do right now to protect my status, appeal under Nohal 1.6.0001, or pivot to a legal track."
    },
    he: {
      helperBoxTitle: "גיור ממלכתי מול בית דין פרטי — האמת המלאה בשקיפות מלאה:",
      helperBoxBody: "• זקוקים לעלייה (אזרחות) או לרישום נישואין ברבנות הראשית בישראל? משרד הפנים והרבנות הראשית מכירים אך ורק במסלול הגיור הממלכתי (נתיב / ועדת חריגים) או ב-9 חודשי קהילה מוכרת בחו״ל.\n• ⚠️ אזהרה לגבי בית דין פרטי (גוש עציון / בני ברק): למרות שהגיור כשר הלכתית ב-100%, משרד הפנים חוסם עלייה על סמך גיור פרטי של תייר, והרבנות הראשית מסרבת לרשום נישואין ללא מעבר מסלול אימות ממלכתי נפרד!",
      startMyPathBtn: "🚀 התחל את המסלול שלי ←",
      q1OptRejected: ["visa_rejected_rescue", "🛑 סורבתי בגלל ויזה / ועדת חריגים — מה ניתן לעשות?", "צעדי חירום לערעור תוך 21 יום (נוהל 1.6.0001), עצירת הרחקה ומעבר מסלול"],
      q3OptStudent: ["israel_visa", "🎓 בישראל באשרת סטודנט / מסע / תושב ארעי (A/2, A/5)", "אשרת לימודים A/2, תוכנית מסע או תושב ארעי A/5"],
      q3OptB1Work: ["israel_b1_work", "🛠️ בישראל באשרת עבודה (B/1)", "חשוב: קראו את הבהרת השקיפות שלנו לגבי אחוזי הסירוב באשרת B/1"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 הבקשה או האשרה שלי סורבה במשרד הפנים / ועדת חריגים", "צעדים מיידיים לפענוח מכתב הסירוב, הגשת ערעור או שינוי מסלול חוקי"],
      b1DisclaimerTitle: "🛡️ שקיפות מלאה: אשרת עבודה (B/1) ואחוזי סירוב גבוהים בוועדת חריגים",
      b1DisclaimerBody: "בניגוד לסוכנויות שמסתירות זאת: למרות שמחזיקי אשרת עבודה B/1 רשאים טכנית להגיש בקשה, אשרות עבודה רגילות (B/1 עובד זר) סובלות מאחוזי הסירוב הגבוהים ביותר. ועדת החריגים (הכוללת נציגי משרד הפנים ומערך הגיור) בוחנת בחשדנות רבה עובדי B/1 מחשש שהגיור משמש לעקיפת חוקי ההגירה ולקבלת מעמד קבע.\n\n💡 חריג קריטי: אשרת B/1 שניתנה לבן/בת זוג של אזרח ישראלי בהליך המדורג (נוהל 5.2.0008 / 5.2.0009) זוכה ליחס חיובי בהרבה ומגנה על זכותכם לגיור במקביל לפי סעיף ג.10!",
      b1AskAiBtn: "✨ שאלו את עוזר ה-AI כיצד למקסם את סיכויי האישור שלי באשרת B/1 ←",
      b1AskAiPrompt: "אני בישראל עם אשרת עבודה B/1. הסבר לי כיצד משרד הפנים וועדת חריגים בוחנים אשרת B/1 וכיצד אוכל למקסם את סיכויי האישור שלי ולהימנע מסירוב.",
      rejBannerTitle: "🛑 נוהל חילוץ וערעור לאחר סירוב ויזה / ועדת חריגים",
      rejBannerBody: "אל תיכנסו לפאניקה ואל תישארו בארץ ללא מעמד חוקי. מכתב סירוב מלווה לרוב בדרישת יציאה תוך 14 יום — אך לפי נוהל משרד הפנים 1.6.0001 עומדת לכם זכות להגיש ערעור פנימי מנומק תוך 21 יום (או לעבור למסלול מעוגן חוקית). בצעו את שלבי החילוץ הבאים מיד:",
      rejAskAiBtn: "✨ שאלו את עוזר ה-AI לניתוח מכתב הסירוב והצעדים הבאים ←",
      rejAskAiPrompt: "הבקשה שלי לאשרה או לוועדת חריגים סורבה. הדריך אותי צעד אחר צעד מה ניתן לעשות כעת כדי להגיש ערעור לפי נוהל 1.6.0001 או לעבור למסלול חוקי."
    },
    fr: {
      helperBoxTitle: "Rabbinat d'État vs Beit Din Privé (La Vérité Sans Filtre) :",
      helperBoxBody: "• Besoin de l'Aliyah ou du mariage au Grand Rabbinat en Israël ? Le Misrad HaPanim et le Rabbinat exigent le parcours d'État (Nativ / Va'adat Charigim) ou 9+ mois dans une communauté reconnue à l'étranger.\n• ⚠️ Attention aux Beit Din Privés (Gush Etzion / Bnei Brak) : Bien que 100% cachères, le Misrad HaPanim bloque l'Aliyah des touristes convertis au privé et le Rabbinat refuse d'enregistrer le mariage sans une procédure de validation d'État complète !",
      startMyPathBtn: "🚀 Démarrer Mon Parcours →",
      q1OptRejected: ["visa_rejected_rescue", "🛑 J'ai essuyé un refus de Visa / Va'adat Charigim", "Recours sous 21 jours (Nohal 1.6.0001), blocage d'expulsion & solutions"],
      q3OptStudent: ["israel_visa", "🎓 En Israël sous Visa Étudiant, Masa ou Résident A/5", "Visa étudiant A/2, programme Masa ou résident temporaire A/5"],
      q3OptB1Work: ["israel_b1_work", "🛠️ En Israël sous Visa de Travail (B/1)", "Important : Voir notre avertissement sur le taux de refus des visas B/1"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 Mon Visa ou dossier Va'adat Charigim a été refusé", "Étapes urgentes pour faire appel sous 21 jours ou changer de voie"],
      b1DisclaimerTitle: "🛡️ Transparence Totale : Visas de Travail (B/1) & Taux de Refus Élevés",
      b1DisclaimerBody: "Contrairement aux agences classiques : bien que les titulaires d'un visa B/1 puissent déposer une demande, les visas de travailleur étranger B/1 subissent le taux de refus le plus élevé. La commission (PIBA + Autorité de Conversion) examine très strictement les travailleurs B/1 par crainte que la conversion ne serve à contourner les règles d'immigration.\n\n💡 Exception majeure : Un visa B/1 accordé au conjoint d'un citoyen israélien (Nohal 5.2.0008 / 5.2.0009) est traité beaucoup plus favorablement (Art. ג.10) !",
      b1AskAiBtn: "✨ Demander à l'IA comment maximiser mes chances d'accord avec un visa B/1 →",
      b1AskAiPrompt: "Je suis en Israël avec un visa de travail B/1. Expliquez-moi comment maximiser mes chances d'approbation devant la Va'adat Charigim et le Misrad HaPanim.",
      rejBannerTitle: "🛑 Protocole d'Urgence Après un Refus de Visa / Va'adat Charigim",
      rejBannerBody: "Ne restez jamais en situation irrégulière. Un refus s'accompagne souvent d'un délai de départ de 14 jours, mais la procédure PIBA Nohal 1.6.0001 vous accorde 21 jours pour déposer un recours écrit ou bifurquer vers une voie légale :",
      rejAskAiBtn: "✨ Demander à l'IA d'analyser mon refus et mes recours →",
      rejAskAiPrompt: "Mon visa ou ma demande Va'adat Charigim a été refusé(e). Quelles sont mes étapes exactes de recours (Nohal 1.6.0001) ou de changement de statut ?"
    },
    es: {
      helperBoxTitle: "Rabinato Estatal vs. Beit Din Privado (La Verdad Sin Filtros):",
      helperBoxBody: "• ¿Necesitas hacer Aliyá o casarte por el Gran Rabinato en Israel? Misrad HaPanim y el Rabinato SOLO reconocen la Conversión Estatal (Nativ / Va'adat Jariguim) o 9+ meses en una comunidad aprobada en el exterior.\n• ⚠️ Advertencia sobre Beit Din Privados (Gush Etzion / Bnei Brak): Aunque son 100% kosher, Misrad HaPanim bloquea la Aliyá de turistas con conversión privada y el Rabinato rechaza registrar tu boda sin un proceso estatal adicional.",
      startMyPathBtn: "🚀 Comenzar Mi Ruta →",
      q1OptRejected: ["visa_rejected_rescue", "🛑 Fui rechazado por mi Visa / Va'adat Jariguim", "Pasos de apelación en 21 días (Nohal 1.6.0001) y rescate legal"],
      q3OptStudent: ["israel_visa", "🎓 En Israel con Visa de Estudiante, Masa o Residente A/5", "Visa A/2 de estudiante, Masa o residente temporal A/5"],
      q3OptB1Work: ["israel_b1_work", "🛠️ En Israel con Visa de Trabajo (B/1)", "Importante: Ver aviso de transparencia sobre altas tasas de rechazo en B/1"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 Mi Visa o solicitud de Va'adat Jariguim fue rechazada", "Pasos urgentes para apelar o cambiar de vía legalmente"],
      b1DisclaimerTitle: "🛡️ Transparencia Total: Visas de Trabajo (B/1) y Altas Tasas de Rechazo",
      b1DisclaimerBody: "Para ser 100% transparentes: aunque los titulares de una visa B/1 pueden presentar una solicitud, las visas laborales B/1 estándar enfrentan la tasa de rechazo más alta. El comité (PIBA + Autoridad de Conversión) examina con extrema dureza a los trabajadores B/1 por temor a que la conversión se use para eludir las leyes migratorias.\n\n💡 Excepción clave: ¡Una visa B/1 otorgada al cónyuge o pareja de un ciudadano israelí (Nohal 5.2.0008 / 5.2.0009) recibe un trato mucho más favorable bajo la Sec. ג.10!",
      b1AskAiBtn: "✨ Preguntar al Socio IA cómo maximizar mis probabilidades con visa B/1 →",
      b1AskAiPrompt: "Estoy en Israel con una visa de trabajo B/1. ¿Cómo puedo maximizar mis probabilidades de aprobación ante Misrad HaPanim y Va'adat Jariguim?",
      rejBannerTitle: "🛑 Protocolo de Rescate y Apelación tras Rechazo de Visa",
      rejBannerBody: "Un rechazo suele dar 14 días para salir del país, pero bajo el Nohal 1.6.0001 tienes 21 días para presentar una apelación interna formal o girar hacia una vía legal:",
      rejAskAiBtn: "✨ Preguntar al Socio IA qué hacer tras el rechazo de mi visa →",
      rejAskAiPrompt: "Fui rechazado debido a mi visa o en Va'adat Jariguim. ¿Cuáles son los pasos exactos para apelar bajo Nohal 1.6.0001 o rescatar mi caso?"
    },
    de: {
      helperBoxTitle: "Staatliches Rabbinat vs. Privates Beit Din (Die ungeschminkte Wahrheit):",
      helperBoxBody: "• Brauchen Sie die Alija oder eine Hochzeit über das Oberrabbinat in Israel? Misrad HaPanim und Oberrabbinat akzeptieren NUR den staatlichen Giur (Nativ / Va'adat Charigim) oder 9+ Monate in einer anerkannten Auslandsgemeinde.\n• ⚠️ Warnung zu privaten Beit Dins (Gush Etzion / Bnei Brak): Obwohl 100% koscher, blockiert Misrad HaPanim die Alija bei privatem Touristen-Giur, und das Oberrabbinat verweigert die Eheschließung ohne separates staatliches Prüfverfahren!",
      startMyPathBtn: "🚀 Meinen Weg starten →",
      q1OptRejected: ["visa_rejected_rescue", "🛑 Ich wurde wegen meines Visums / Va'adat Charigim abgelehnt", "21-Tage-Einspruchsrecht (Nohal 1.6.0001) & legale Rettungswege"],
      q3OptStudent: ["israel_visa", "🎓 In Israel mit Studenten-, Masa- oder A/5-Aufenthaltsvisum", "A/2 Studentenvisum, Masa oder A/5 temporärer Aufenthalt"],
      q3OptB1Work: ["israel_b1_work", "🛠️ In Israel mit Arbeitsvisum (B/1)", "Wichtig: Transparenz-Hinweis zur hohen Ablehnungsquote bei B/1-Visa"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 Mein Visum oder Va'adat-Charigim-Antrag wurde abgelehnt", "Sofortschritte für Einspruch oder legalen Spurwechsel"],
      b1DisclaimerTitle: "🛡️ Volle Transparenz: Arbeitsvisa (B/1) & Hohe Ablehnungsquoten",
      b1DisclaimerBody: "Im Gegensatz zu typischen Agenturen sagen wir Ihnen die Wahrheit: Zwar können B/1-Inhaber technisch einen Antrag stellen, doch reguläre B/1-Arbeitsvisa haben die höchste Ablehnungsquote. Das Komitee (PIBA + Konversionsbehörde) prüft B/1-Arbeitnehmer extrem streng aus Sorge, dass der Giur zur Umgehung des Einwanderungsrechts genutzt wird.\n\n💡 Wichtige Ausnahme: Ein B/1-Visum für den Partner eines israelischen Staatsbürgers (Nohal 5.2.0008 / 5.2.0009) wird nach Abs. ג.10 wesentlich positiver behandelt!",
      b1AskAiBtn: "✨ KI-Partner fragen, wie ich meine B/1-Genehmigungschancen maximiere →",
      b1AskAiPrompt: "Ich bin mit einem B/1-Arbeitsvisum in Israel. Wie kann ich meine Chancen auf Genehmigung bei Misrad HaPanim und Va'adat Charigim maximieren?",
      rejBannerTitle: "🛑 Rettungs- & Einspruchsprotokoll nach Visum-Ablehnung",
      rejBannerBody: "Eine Ablehnung setzt oft eine 14-Tage-Ausreisefrist, aber nach PIBA Nohal 1.6.0001 haben Sie 21 Tage Zeit für einen formellen schriftlichen Einspruch oder einen legalen Spurwechsel:",
      rejAskAiBtn: "✨ KI-Partner zur Analyse meiner Ablehnung befragen →",
      rejAskAiPrompt: "Mein Visum oder Va'adat-Charigim-Antrag wurde abgelehnt. Welche Schritte kann ich jetzt für einen Einspruch (Nohal 1.6.0001) unternehmen?"
    },
    ru: {
      helperBoxTitle: "Государственный гиюр против Частного Бейт-Дина (Честная правда):",
      helperBoxBody: "• Нужна репатриация (Алия) или регистрация брака в Главном раввинате Израиля? МВД и Раввинат признают ТОЛЬКО государственный гиюр (Натив / Ваадат Харигим) или 9+ месяцев в признанной зарубежной общине.\n• ⚠️ Важно о частных судах (Гуш-Эцион / Бней-Брак): Хотя гиюр 100% кошерный по Галахе, МВД блокирует Алию туристам с частным гиюром, а Главный раввинат отказывает в регистрации брака без отдельного государственного подтверждения!",
      startMyPathBtn: "🚀 Начать мой маршрут →",
      q1OptRejected: ["visa_rejected_rescue", "🛑 Мне отказали из-за визы / в Ваадат Харигим — что делать?", "План спасения: апелляция за 21 день (Ноаль 1.6.0001) и смена трека"],
      q3OptStudent: ["israel_visa", "🎓 В Израиле по студенческой визе (A/2), Маса или ВНЖ (A/5)", "Студенческая виза A/2, программа Маса или статус A/5"],
      q3OptB1Work: ["israel_b1_work", "🛠️ В Израиле по рабочей визе (B/1)", "Важно: честное предупреждение о высоком проценте отказов по визе B/1"],
      q3OptRejected: ["visa_rejected_rescue", "🛑 Мне отказали в визе или комиссии Ваадат Харигим", "Срочные шаги для апелляции и защиты от депортации"],
      b1DisclaimerTitle: "🛡️ Полная прозрачность: Рабочая виза (B/1) и высокий процент отказов",
      b1DisclaimerBody: "В отличие от посредников, мы говорим правду сразу: хотя обладатели рабочей визы B/1 формально могут подать заявку, обычные трудовые визы B/1 получают больше всего отказов. Комиссия (представители МВД/PIBA и Управления гиюра) крайне жёстко проверяет рабочих B/1, опасаясь, что гиюр используется для обхода иммиграционных правил.\n\n💡 Важное исключение: Виза B/1, выданная супругу/партнёру гражданина Израиля в рамках СТУПРО (Ноаль 5.2.0008 / 5.2.0009), рассматривается гораздо благоприятнее по п. ג.10!",
      b1AskAiBtn: "✨ Спросить ИИ-партнёра, как максимизировать шансы на одобрение с визой B/1 →",
      b1AskAiPrompt: "Я нахожусь в Израиле по рабочей визе B/1. Как мне максимизировать шансы на одобрение в МВД и Ваадат Харигим?",
      rejBannerTitle: "🛑 Протокол спасения и апелляции после отказа в визе / Ваадат Харигим",
      rejBannerBody: "Отказ обычно сопровождается предписанием покинуть страну за 14 дней, но по инструкции МВД Ноаль 1.6.0001 у вас есть 21 день на подачу письменной внутренней апелляции или переход на защищённый маршрут:",
      rejAskAiBtn: "✨ Спросить ИИ-партнёра, что делать после отказа по визе →",
      rejAskAiPrompt: "Мне отказали в визе или комиссии Ваадат Харигим. Какие шаги я могу предпринять прямо сейчас для апелляции по Ноаль 1.6.0001?"
    }
  };

  const UI = {
    en: {
      kicker: "🧭 PERSONALIZED ISRAELI CASE GUIDE • 45-SECOND SETUP",
      introTitle: "Your Shortest, Safest Path to Aliyah, Conversion, or Residency in Israel",
      introSub: "Skip The Jewish Agency's 9–12 month wait and avoid the bureaucratic pitfalls that freeze files for years. Answer 4 quick questions so we can map your exact legal track and guide you step-by-step from today to your Teudat Zehut.",
      emPillBadge: "🚨 URGENT SAFETY / ANTISEMITISM",
      emPillText: "Facing Antisemitism or Need to Leave Fast? Launch 7-Day Emergency Aliyah & Go-Bag Track →",
      stepIndicator: "Question {cur} of {max}",
      backBtn: "← Back",
      q1Title: "1. What is your primary goal?",
      q1Sub: "Select the outcome you want—we will tailor the next questions to match:",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ Make Aliyah or Spousal Residency in Israel", "Jewish roots (Law of Return) OR building a life in Israel with an Israeli/Jewish partner"],
        ["giyur_rabbanut", "🏛️ Conversion — State Rabbanut Track", "State Conversion Authority (Nativ) or recognized court for full Aliyah & marriage rights"],
        ["giyur_private", "🕍 Conversion — Private Orthodox Beit Din", "Independent Orthodox tribunal (e.g., Gush Etzion / Bnei Brak)"]
      ],
      helperLink: "🤔 Not sure whether State Rabbanut or Private Beit Din fits you? Help me choose →",
      helperBoxTitle: "State Rabbanut vs. Private Orthodox Beit Din (10-Second Rule):",
      helperBoxBody: "• Need Israeli citizenship (Aliyah) through your conversion alone? Misrad HaPanim requires the State Conversion Track (or 9+ months in an approved overseas community).\n• Already have an Israeli partner (Nohal 5.2.0008/0009), Jewish father/grandfather, OR returning abroad? Warning: While a Private Orthodox Beit Din is 100% Halachically kosher, Misrad HaPanim blocks Aliyah on a tourist private conversion and the Chief Rabbinate refuses to register your marriage unless you complete a separate State Rabbanut validation track!",
      helperBtnState: "Choose State Rabbanut →",
      helperBtnPriv: "Choose Private Beit Din →",
      q2Title: "2. Who is this plan for?",
      q2Sub: "Household details determine which civil documents, witness letters, and Sefach rules apply:",
      q2Opts: [
        ["solo", "👤 Just Me", "Individual applicant"],
        ["couple", "💑 Me + My Spouse or Partner", "Applying, moving, or converting as a couple"],
        ["family_kids", "👨‍👩‍👧 Me / Us + Children (Under 18)", "Includes minor children (activates child Apostille & Sefach rules)"]
      ],
      q2bTitle: "2B. Tell us about your partner & relationship:",
      q2bSub: "This determines whether Misrad HaPanim Nohal 5.2.0008, Nohal 5.2.0009, or joint Aliyah applies:",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 Partner Is an Israeli Citizen — Legally Married", "Unlocks Married Spousal Track (Nohal 5.2.0008 + Form Ash/6)"],
        ["israeli_unmarried", "🇮🇱🤝 Partner Is an Israeli Citizen — Unmarried / Living Together", "Unlocks Common-Law Track (Nohal 5.2.0009) or Civil Marriage + Chuppah route"],
        ["jewish_partner", "✡️ Partner Is Jewish / Aliyah-Eligible (Not Israeli Yet)", "Making Aliyah together under the Law of Return"],
        ["both_converting", "🌍 Neither of Us Is Israeli or Jewish Yet", "Studying, converting, or applying together"],
        ["single_parent_kids", "👩‍👧 Single Parent + Children (No Partner)", "Applying solo with minor children"]
      ],
      q3Title: "3. Where are you right now?",
      q3Sub: "Your physical location controls your 90-day visa clock, 180-day document expiry, and JAFI bypass:",
      q3Opts: [
        ["abroad", "🛫 Outside Israel (Planning Before Flying)", "Best window to pull all 5 Apostilled civil docs in person & skip the 9–12 mo JAFI wait"],
        ["israel_b2", "🇮🇱 Inside Israel on a Tourist Visa (B/2)", "Activates 90-day tourist protection, Form Ash/3 / Ash/1 & No-TZ Bridge Health shield"],
        ["israel_visa", "🪪 Inside Israel on a Student, Masa, Work, or Temp Visa", "A/2 student, B/1 work, or A/5 temporary resident"]
      ],
      q4SpousalTitle: "4. Where are you in the Misrad HaPanim spousal process?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 Haven't Filed Yet — Building Our Dossier", "Need our 5 Apostilled civil docs, Form Ash/6, Nespach Alef & witness letters"],
        ["spousal_demand", "📄 Received a 30-Day Clerk Demand Sheet (Daf Drishot)", "Need instant Hebrew translation & 30-day file-closure shield"],
        ["spousal_interview", "🎤 Preparing for the Separated-Room Couples Interview", "Ready to drill the 300 Misrad HaPanim interrogation questions on 2 phones"]
      ],
      q4AliyahTitle: "4. How is your Law of Return eligibility documented?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 Jewish Mother / Maternal Grandmother (Western Country)", "Direct In-Israel Aliyah (Form Ash/456) or fast-track consular route"],
        ["lor_fsu_nativ", "🏛️ Former Soviet Union (FSU) Roots — Nativ Check", "Requires 11-page Hebrew Security CV + original Soviet civil certificates"],
        ["lor_paternal", "🧬 Jewish Father or Grandfather (Law of Return)", "Fast Aliyah citizenship first + optional State Conversion as an Israeli citizen"],
        ["lor_overseas_giyur", "📜 Converted to Judaism Abroad", "Requires 9-month post-mikvah community proof & Rabbanut review"]
      ],
      q4RabbanutTitle: "4. Where are you in your conversion journey?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 Just Starting — Need Eligibility, Visa Shield & Rabbi", "Need Va'adat Charigim (Form Ash/1) if tourist + Vetted Sponsoring Rabbi"],
        ["rabbanut_studying", "📖 Studying & Attending Shul Regularly", "Need 5–8 community reference letters & 56 Shabbat songs/prayers mastery"],
        ["rabbanut_tribunal", "⚖️ Approaching the Final Beit Din Tribunal", "Ready for the 700-question Dayanim exam & curveball simulator"]
      ],
      q4PrivTitle: "4. Do you plan to live permanently in Israel after converting?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 Yes — I Want to Make Aliyah Through This Conversion", "Important: Checks the Misrad HaPanim tourist conversion rule before you start"],
        ["private_with_anchor", "💍 Yes — Via My Israeli Partner or Law of Return Roots", "Secure legal residency via Nohal 5.2.0008/0009 first, then complete State Rabbanut validation for marriage recognition"],
        ["private_going_home", "✈️ No — Returning Home Abroad After the Beit Din", "Focused on passing the Beit Din, reference letters & liturgy fluency"]
      ],
      em1Title: "🚨 Emergency Triage (1 of 2): Where are you right now?",
      em1Opts: [
        ["abroad_exit", "🛫 Still Outside Israel — Need to Leave Fast", "Must grab the 7-day 'Go-Bag' civil docs before boarding so you never have to fly back"],
        ["in_israel_now", "🇮🇱 Already Landed in Israel — Need Urgent Status Shield", "Protect your stay immediately & file emergency In-Israel status change"]
      ],
      em2Title: "🚨 Emergency Triage (2 of 2): Which applies to you?",
      em2Opts: [
        ["lor_or_spouse", "✡️ Law of Return Eligible OR Israeli Spouse/Partner", "Fast-track Form Ash/456 In-Israel Aliyah or Nohal 5.2.0008/0009 filing"],
        ["giyur_transfer", "🕍 Mid-Conversion / Need Humanitarian Va'adat Charigim", "Emergency Diaspora Rabbi transfer letter + Form Ash/1 humanitarian petition"]
      ],
      tlBadgeSynced: "🟢 Synced Across Your Devices (Cloud)",
      tlBadgeGuest: "⚪ Guest Preview — Save to Sync Across Up to 5 Devices",
      tlSyncBtn: "📲 Save & Sync My Track on Up to 5 Devices (WhatsApp) →",
      tlRetakeBtn: "↺ Change Answers",
      tlTrackerBtn: "⏱️ Open My Adaptive Deadline Tracker →",
      tlAiBtn: "✨ Ask Spok About My Track",
      tlTapHint: "👇 Tap any numbered step circle below to open your blueprint, pitfalls, guides & tools:",
      tlKidsBadge: "👨‍👩‍👧 Includes Under-18 Child Apostille & Unfolded Sefach Protocol",
      trapAlertTitle: "⚠️ Critical Dual-Gatekeeper Warning (Saves 2–3 Lost Years)",
      trapAlertBody: "A Private Orthodox Beit Din conversion on a tourist visa makes you 100% halachically Jewish—but Misrad HaPanim will NOT grant Aliyah citizenship from a tourist private conversion alone unless you have an Israeli partner (Nohal 5.2.0008/0009) or Law of Return roots. Below we mapped the legal pivot (Va'adat Charigim Form Ash/1 or legal anchor) so you never get stuck!",
      stepDoneLbl: "Completed",
      stepActiveLbl: "Current Focus",
      stepNextLbl: "Tap for Blueprint →",
      popSecBlueprint: "🎯 Step-by-Step Action Blueprint",
      popSecPitfalls: "💣 Bureaucratic Pitfalls & Traps to Avoid",
      popSecTools: "🛠️ Interactive Site Tools for This Step",
      popSecGuides: "📖 Deep-Dive Site Guides on This Topic",
      popMarkDone: "✅ Mark This Step Complete",
      popUnmarkDone: "↺ Mark as Incomplete",
      popAskAi: "✨ Ask Spok Help on Step #{n}",
      popClose: "Close",
      trkCustomTag: "🎯 ADAPTED TO YOUR ACTIVE TRACK",
      trkNoPlanBanner: "Answer the 4-question Track Setup on the Home screen so this tracker adapts to your exact legal deadlines!",
      trkStartSetupBtn: "🧭 Set Up My Track Now →",
      trkSetDateLbl: "Set Anchor Date:"
    },
    he: {
      kicker: "🧭 מדריך תיק אישי לישראל • אבחון ב-45 שניות",
      introTitle: "המסלול הקצר והבטוח ביותר לעלייה, גיור או מעמד בישראל",
      introSub: "דלגו על המתנה של 9–12 חודשים בסוכנות היהודית והימנעו ממלכודות בירוקרטיות שמקפיאות תיקים לשנים. ענו על 4 שאלות קצרות כדי שנבנה עבורכם את תרשים הזרימה המדויק ונלווה אתכם צעד-אחר-צעד עד לתעודת הזהות.",
      emPillBadge: "🚨 חירום / אנטישמיות",
      emPillText: "מתמודדים עם אנטישמיות או חייבים לצאת בדחיפות? הפעילו מסלול עליית חירום ותיק 7 ימים ←",
      stepIndicator: "שאלה {cur} מתוך {max}",
      backBtn: "→ חזרה",
      q1Title: "1. מהי המטרה המרכזית שלכם?",
      q1Sub: "בחרו את היעד שלכם — השאלות הבאות יתאימו את עצמן אוטומטית:",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ עלייה לישראל או מעמד לבן/בת זוג (הליך מדורג)", "זכאות חוק השבות או בניית חיים בישראל עם בן/בת זוג ישראלי/ת"],
        ["giyur_rabbanut", "🏛️ גיור ממלכתי / רבנות (נתיב)", "מערך הגיור הממלכתי או בית דין מוכר המקנה זכאות מלאה לעלייה ולנישואין"],
        ["giyur_private", "🕍 גיור אורתודוקסי בבית דין פרטי", "בית דין אורתודוקסי עצמאי (כגון גוש עציון / בני ברק)"]
      ],
      helperLink: "🤔 מתלבטים בין גיור ממלכתי לבית דין פרטי? לחצו להכוונה ב-10 שניות ←",
      helperBoxTitle: "גיור ממלכתי מול בית דין פרטי — כלל הברזל:",
      helperBoxBody: "• זקוקים לאזרחות (עלייה) מכוח הגיור בלבד? משרד הפנים דורש גיור ממלכתי (או 9 חודשי קהילה מוכרת בחו״ל).\n• יש לכם בן/בת זוג ישראלי/ת (נוהל 5.2.0008/0009), זכאות חוק השבות או חוזרים לחו״ל? אזהרה: למרות שבית דין פרטי כשר הלכתית ב-100%, משרד הפנים חוסם עלייה לתייר שהתגייר בפרטי, והרבנות הראשית מסרבת לרשום נישואין ללא מסלול אימות ממלכתי נפרד!",
      helperBtnState: "בחרו בגיור ממלכתי ←",
      helperBtnPriv: "בחרו בבית דין פרטי ←",
      q2Title: "2. עבור מי מיועדת התוכנית?",
      q2Sub: "הרכב המשפחה קובע אילו תעודות אפוסטיל, מכתבי עדים ורישומי ספח נדרשים:",
      q2Opts: [
        ["solo", "👤 עבורי בלבד", "מבקש/ת יחיד/ה"],
        ["couple", "💑 עבורי + בן/בת הזוג שלי", "תהליך זוגי משותף"],
        ["family_kids", "👨‍👩‍👧 עבורי / עבורנו + ילדים (מתחת לגיל 18)", "כולל קטינים (מפעיל נוהל תעודות לידה מורחבות וספח פתוח)"]
      ],
      q2bTitle: "2B. מהו מעמד בן/בת הזוג והקשר ביניכם?",
      q2bSub: "נתון זה קובע האם חל נוהל 5.2.0008 (נשואים), נוהל 5.2.0009 (ידועים בציבור) או עלייה משותפת:",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 בן/בת הזוג אזרח/ית ישראל — נשואים רשמית", "מסלול נשואים במשרד הפנים (נוהל 5.2.0008 + טופס אש/6)"],
        ["israeli_unmarried", "🇮🇱🤝 בן/בת הזוג אזרח/ית ישראל — לא נשואים / חיים יחד", "מסלול חיים משותפים (נוהל 5.2.0009) או נישואין אזרחיים + חופה"],
        ["jewish_partner", "✡️ בן/בת הזוג יהודי/ה או זכאי/ת שבות", "עלייה משותפת מכוח חוק השבות"],
        ["both_converting", "🌍 שנינו עדיין לא אזרחי ישראל / בתהליך גיור", "לומדים או מתגיירים יחד"],
        ["single_parent_kids", "👩‍👧 הורה יחיד/ה + ילדים (ללא בן/בת זוג)", "הגשה עצמאית עם קטינים"]
      ],
      q3Title: "3. היכן אתם נמצאים כרגע?",
      q3Sub: "המיקום שלכם קובע את שעון 90 ימי התייר, תוקף 180 הימים למסמכים ועקיפת התור בסוכנות:",
      q3Opts: [
        ["abroad", "🛫 מחוץ לישראל (מתכננים לפני הטיסה)", "הזמן האידיאלי להוציא את 5 מסמכי האפוסטיל במקור ולחסוך 9–12 חודשי המתנה בסוכנות"],
        ["israel_b2", "🇮🇱 בישראל באשרת תייר (B/2)", "מפעיל הגנת 90 יום, טופס אש/3 או אש/1 וביטוח רפואי מגשר ללא ת״ז"],
        ["israel_visa", "🪪 בישראל באשרת סטודנט / מסע / עבודה / תושב ארעי", "אשרת A/2, B/1 או A/5"]
      ],
      q4SpousalTitle: "4. באיזה שלב אתם מול משרד הפנים?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 טרם פתחנו תיק — אוספים מסמכים", "צריכים 5 מסמכי אפוסטיל, טופס אש/6, נספח א׳ ומכתבי עדים"],
        ["spousal_demand", "📄 קיבלנו דף דרישות מפקיד (שעון 30 יום)", "צריכים פענוח מיידי והגנה מסגירת תיק מנהלית"],
        ["spousal_interview", "🎤 מתכוננים לשימוע הזוגי בחדרים נפרדים", "תרגול 300 שאלות השימוע בסינכרון 2 טלפונים"]
      ],
      q4AliyahTitle: "4. כיצד מתועדת זכאות השבות שלכם?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 אם / סבתא מצד האם יהודייה (מדינות המערב)", "שינוי מעמד לעולה מתוך ישראל (טופס אש/456) או מסלול מהיר"],
        ["lor_fsu_nativ", "🏛️ יוצאי ברית המועצות לשעבר — בדיקת נתיב", "דורש שאלון קורות חיים 11 עמודים + תעודות מקוריות"],
        ["lor_paternal", "🧬 אב או סב יהודי (זכאי חוק השבות)", "עלייה מהירה תחילה + אפשרות לגיור ממלכתי כאזרח ישראלי"],
        ["lor_overseas_giyur", "📜 עברתי גיור בקהילה בחו״ל", "דורש הוכחת 9 חודשי קהילה לאחר המקווה ואישור הרבנות"]
      ],
      q4RabbanutTitle: "4. באיזה שלב אתם בתהליך הגיור?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 בתחילת הדרך — זכאות, אשרת שהייה ורב מלווה", "ועדת חריגים (טופס אש/1) לתיירים + רב מלווה מוכר"],
        ["rabbanut_studying", "📖 לומדים ומשתתפים בקהילה ובבית הכנסת", "איסוף 5–8 מכתבי המלצה ושליטה ב-56 שירי שבת וברכות"],
        ["rabbanut_tribunal", "⚖️ לקראת מעמד בית הדין הסופי", "מוכנים לסימולטור 700 שאלות הדיינים"]
      ],
      q4PrivTitle: "4. האם בכוונתכם לחיות בישראל באופן קבוע לאחר הגיור?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 כן — ברצוני לעלות לישראל מכוח הגיור הזה", "חשוב: בודק את מגבלת משרד הפנים לגיור פרטי של תיירים מראש"],
        ["private_with_anchor", "💍 כן — דרך בן/בת זוג ישראלי/ת או זכאות שבות", "הסדרת מעמד חוקי במשרד הפנים (5.2.0008/0009) והשלמת אימות ברבנות הראשית לנישואין"],
        ["private_going_home", "✈️ לא — חוזרים לחו״ל לאחר בית הדין", "מיקוד במעבר בית הדין, מכתבי המלצה ותפילות"]
      ],
      em1Title: "🚨 מיון חירום (1 מתוך 2): היכן אתם נמצאים כעת?",
      em1Opts: [
        ["abroad_exit", "🛫 עדיין בחו״ל — חייבים לצאת במהירות", "איסוף תיק חירום של 5 מסמכי אפוסטיל ב-7 ימים לפני העלייה למטוס"],
        ["in_israel_now", "🇮🇱 כבר נחתנו בישראל — צריכים הגנת מעמד דחופה", "הגנה מיידית על האשרה והגשת שינוי מעמד מהארץ"]
      ],
      em2Title: "🚨 מיון חירום (2 מתוך 2): מה חל עליכם?",
      em2Opts: [
        ["lor_or_spouse", "✡️ זכאי חוק השבות או בן/בת זוג ישראלי/ת", "הגשת טופס אש/456 לעלייה מהארץ או נוהל 5.2.0008/0009"],
        ["giyur_transfer", "🕍 באמצע תהליך גיור / בקשה הומניטרית לוועדת חריגים", "מכתב העברה מרב הקהילה בחו״ל + טופס אש/1 לוועדת חריגים"]
      ],
      tlBadgeSynced: "🟢 מסונכרן בענן בין המכשירים שלכם",
      tlBadgeGuest: "⚪ תצוגת אורח — שמרו לסנכרון עד 5 מכשירים",
      tlSyncBtn: "📲 שמרו וסנכרנו את המסלול שלי בעד 5 מכשירים (וואטסאפ) ←",
      tlRetakeBtn: "↺ שינוי תשובות",
      tlTrackerBtn: "⏱️ פתחו את מעקב המועדים המותאם למסלול שלי ←",
      tlAiBtn: "✨ התייעצו עם Spok (ספוק) על המסלול שלי",
      tlTapHint: "👇 לחצו על כל עיגול ממוספר בציר הזמן לפתיחת תוכנית הפעולה, המלכודות, המדריכים והכלים:",
      tlKidsBadge: "👨‍👩‍👧 כולל נוהל תעודות לידה לקטינים ורישום ספח פתוח",
      trapAlertTitle: "⚠️ אזהרת שער כפול קריטית (חוסכת אובדן של 2–3 שנים)",
      trapAlertBody: "גיור אורתודוקסי פרטי באשרת תייר הופך אתכם ליהודים 100% לפי ההלכה — אך משרד הפנים לא יעניק אזרחות (עלייה) מגיור פרטי של תייר ללא בן/בת זוג ישראלי/ת או זכאות חוק השבות. בנינו עבורכם למטה את המסלול החוקי החלופי (ועדת חריגים טופס אש/1) כדי שלא תיתקעו!",
      stepDoneLbl: "הושלם",
      stepActiveLbl: "השלב הנוכחי",
      stepNextLbl: "לחצו לתוכנית הפעולה ←",
      popSecBlueprint: "🎯 תוכנית פעולה מעשית שלב-אחר-שלב",
      popSecPitfalls: "💣 מלכודות וטעויות נפוצות שיש למנוע",
      popSecTools: "🛠️ כלים אינטראקטיביים באתר לשלב זה",
      popSecGuides: "📖 מדריכי עומק באתר בנושא זה",
      popMarkDone: "✅ סמנו שלב זה כהושלם",
      popUnmarkDone: "↺ בטלו סימון השלמה",
      popAskAi: "✨ שאלו את Spok (ספוק) על שלב #{n}",
      popClose: "סגור",
      trkCustomTag: "🎯 מותאם אוטומטית למסלול האישי שלכם",
      trkNoPlanBanner: "ענו על 4 שאלות האבחון במסך הבית כדי שמעקב המועדים יתאים את עצמו בדיוק למסלול שלכם!",
      trkStartSetupBtn: "🧭 הגדירו את המסלול שלי כעת ←",
      trkSetDateLbl: "הגדירו תאריך עוגן:"
    },
    fr: {
      kicker: "🧭 GUIDE PERSONNALISÉ ISRAËL • DIAGNOSTIC EN 45 SECONDES",
      introTitle: "Votre Parcours le Plus Rapide et Sûr vers l'Aliyah, la Conversion ou le Statut en Israël",
      introSub: "Évitez les 9 à 12 mois d'attente de l'Agence Juive et les pièges administratifs qui bloquent les dossiers pendant des années. Répondez à 4 questions rapides pour afficher votre parcours exact jusqu'à la Teoudat Zehout.",
      emPillBadge: "🚨 URGENCE / ANTISÉMITISME",
      emPillText: "Face à l'antisémitisme ou départ urgent ? Lancez le parcours Aliyah d'Urgence (7 jours) →",
      stepIndicator: "Question {cur} sur {max}",
      backBtn: "← Retour",
      q1Title: "1. Quel est votre objectif principal ?",
      q1Sub: "Choisissez votre objectif — les questions suivantes s'adapteront automatiquement :",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ Faire l'Aliyah ou Statut Conjoint en Israël", "Loi du Retour OU vie commune en Israël avec un(e) partenaire israélien(ne)/juif(ve)"],
        ["giyur_rabbanut", "🏛️ Conversion — Voie d'État / Rabbinat", "Autorité nationale de conversion (Nativ) ou tribunal reconnu pour l'Aliyah et le mariage"],
        ["giyur_private", "🕍 Conversion — Beit Din Orthodoxe Privé", "Tribunal orthodoxe indépendant (ex. Goush Etzion / Bnei Brak)"]
      ],
      helperLink: "🤔 Hésitation entre Rabbinat d'État et Beit Din Privé ? Aide au choix en 10s →",
      helperBoxTitle: "Rabbinat d'État vs Beit Din Privé :",
      helperBoxBody: "• Besoin de l'Aliyah uniquement grâce à votre conversion ? Le Misrad HaPanim exige la voie d'État (ou 9 mois en communauté reconnue à l'étranger).\n• En couple avec un(e) Israélien(ne) (Nohal 5.2.0008/0009), éligible Loi du Retour ou retour à l'étranger ? Attention : bien que 100 % casher, le Misrad HaPanim bloque l'Aliyah des touristes convertis au privé et le Grand Rabbinat refuse le mariage sans validation d'État séparée !",
      helperBtnState: "Choisir Rabbinat d'État →",
      helperBtnPriv: "Choisir Beit Din Privé →",
      q2Title: "2. Pour qui est ce parcours ?",
      q2Sub: "La composition familiale détermine les actes apostillés, lettres de témoins et règles du Sefach :",
      q2Opts: [
        ["solo", "👤 Juste Moi", "Dossier individuel"],
        ["couple", "💑 Moi + Mon Conjoint / Partenaire", "Démarche en couple"],
        ["family_kids", "👨‍👩‍👧 Moi / Nous + Enfants (moins de 18 ans)", "Inclut des mineurs (active le protocole acte intégral & Sefach)"]
      ],
      q2bTitle: "2B. Statut de votre partenaire et de votre union :",
      q2bSub: "Détermine l'application du Nohal 5.2.0008 (mariés), Nohal 5.2.0009 (concubins) ou Aliyah commune :",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 Partenaire Citoyen(ne) Israélien(ne) — Mariés", "Procédure graduelle mariés (Nohal 5.2.0008 + Formulaire Ash/6)"],
        ["israeli_unmarried", "🇮🇱🤝 Partenaire Citoyen(ne) Israélien(ne) — Non mariés / Vie commune", "Concubinage Nohal 5.2.0009 ou mariage civil + Houppa"],
        ["jewish_partner", "✡️ Partenaire Juif(ve) / Éligible Loi du Retour", "Aliyah conjointe"],
        ["both_converting", "🌍 Aucun de nous n'est encore Israélien ou Juif", "Parcours commun"],
        ["single_parent_kids", "👩‍👧 Parent Solo + Enfants", "Dossier individuel avec enfants mineurs"]
      ],
      q3Title: "3. Où vous trouvez-vous actuellement ?",
      q3Sub: "Votre lieu détermine le délai touriste de 90 jours, la validité de 180 jours des actes et le contournement de l'Agence Juive :",
      q3Opts: [
        ["abroad", "🛫 Hors d'Israël (Préparation avant le vol)", "Moment idéal pour réunir les 5 actes apostillés et éviter 9–12 mois d'attente"],
        ["israel_b2", "🇮🇱 En Israël sous Visa Touriste (B/2)", "Active la protection 90 jours, formulaires Ash/3 / Ash/1 & assurance santé pont"],
        ["israel_visa", "🪪 En Israël sous Visa Étudiant, Masa, Travail ou Résident Temp.", "Visa A/2, B/1 ou A/5"]
      ],
      q4SpousalTitle: "4. Où en êtes-vous auprès du Misrad HaPanim ?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 Dossier non déposé — Préparation des pièces", "5 documents apostillés, Ash/6, Nespach Alef & lettres de témoins"],
        ["spousal_demand", "📄 Fiche d'exigences reçue (Délai strict de 30 jours)", "Traduction immédiate & bouclier anti-fermeture de dossier"],
        ["spousal_interview", "🎤 Préparation à l'Entretien Couple en Salles Séparées", "Entraînement aux 300 questions sur 2 téléphones synchronisés"]
      ],
      q4AliyahTitle: "4. Comment votre éligibilité à la Loi du Retour est-elle prouvée ?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 Mère / Grand-mère maternelle juive (Occident)", "Aliyah directe en Israël (Ash/456) ou voie rapide"],
        ["lor_fsu_nativ", "🏛️ Origines ex-URSS — Vérification Nativ", "CV sécuritaire de 11 pages + actes originaux"],
        ["lor_paternal", "🧬 Père ou Grand-père juif (Loi du Retour)", "Citoyenneté Aliyah rapide d'abord + conversion d'État en tant que citoyen"],
        ["lor_overseas_giyur", "📜 Converti(e) au judaïsme à l'étranger", "Règle des 9 mois post-mikvé & reconnaissance du Rabbinat"]
      ],
      q4RabbanutTitle: "4. Où en êtes-vous dans votre conversion ?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 Au début — Éligibilité, Visa & Rabbin accompagnateur", "Va'adat Charigim (Ash/1) si touriste + Rabbin agréé"],
        ["rabbanut_studying", "📖 En cours d'étude & présence régulière à la synagogue", "5–8 lettres communautaires & 56 chants/prières de Chabbat"],
        ["rabbanut_tribunal", "⚖️ Proche du Beit Din final", "Simulateur des 700 questions des Dayanim"]
      ],
      q4PrivTitle: "4. Prévoyez-vous de vivre définitivement en Israël après la conversion ?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 Oui — Faire l'Aliyah grâce à cette conversion", "Vérifie la règle du Misrad HaPanim pour les touristes avant de commencer"],
        ["private_with_anchor", "💍 Oui — Via mon conjoint israélien ou la Loi du Retour", "Combine statut légal + Beit Din privé + Ishour Giyour du Rabbinat"],
        ["private_going_home", "✈️ Non — Retour à l'étranger après le Beit Din", "Préparation ciblée Beit Din, lettres & liturgie"]
      ],
      em1Title: "🚨 Triage d'Urgence (1/2) : Où êtes-vous actuellement ?",
      em1Opts: [
        ["abroad_exit", "🛫 Encore à l'étranger — Départ rapide requis", "Réunir les 5 actes apostillés ('Go-Bag') en 7 jours avant d'embarquer"],
        ["in_israel_now", "🇮🇱 Déjà en Israël — Protection urgente du statut", "Sécuriser votre séjour et déposer le changement de statut sur place"]
      ],
      em2Title: "🚨 Triage d'Urgence (2/2) : Quelle est votre situation ?",
      em2Opts: [
        ["lor_or_spouse", "✡️ Éligible Loi du Retour OU Conjoint Israélien", "Formulaire Ash/456 sur place ou procédure Nohal 5.2.0008/0009"],
        ["giyur_transfer", "🕍 En cours de conversion / Va'adat Charigim humanitaire", "Lettre de transfert rabbinique + requête Ash/1"]
      ],
      tlBadgeSynced: "🟢 Synchronisé sur vos appareils (Cloud)",
      tlBadgeGuest: "⚪ Aperçu Invité — Sauvegardez sur jusqu'à 5 appareils",
      tlSyncBtn: "📲 Sauvegarder & Synchroniser mon parcours (WhatsApp) →",
      tlRetakeBtn: "↺ Modifier mes réponses",
      tlTrackerBtn: "⏱️ Ouvrir mon Suivi de Délais Personnalisé →",
      tlAiBtn: "✨ Demander à Spok sur mon parcours",
      tlTapHint: "👇 Touchez chaque cercle numéroté pour ouvrir le plan d'action, les pièges, guides et outils :",
      tlKidsBadge: "👨‍👩‍👧 Protocole Enfants Mineurs (Acte intégral apostillé & Sefach) actif",
      trapAlertTitle: "⚠️ Alerte Double Guichet (Évite 2 à 3 ans perdus)",
      trapAlertBody: "Une conversion orthodoxe privée sous visa touriste vous rend 100 % juif selon la Halakha, mais le Misrad HaPanim refuse l'Aliyah sur cette seule base sans conjoint israélien ni Loi du Retour. Voici ci-dessous le pivot légal exact (Va'adat Charigim Ash/1) pour réussir !",
      stepDoneLbl: "Terminé",
      stepActiveLbl: "Étape actuelle",
      stepNextLbl: "Voir le plan →",
      popSecBlueprint: "🎯 Plan d'Action Étape par Étape",
      popSecPitfalls: "💣 Pièges Administratifs à Éviter",
      popSecTools: "🛠️ Outils Interactifs pour cette Étape",
      popSecGuides: "📖 Guides Complets sur notre Site",
      popMarkDone: "✅ Marquer cette étape comme terminée",
      popUnmarkDone: "↺ Marquer comme non terminée",
      popAskAi: "✨ Demander l'aide de Spok sur l'étape #{n}",
      popClose: "Fermer",
      trkCustomTag: "🎯 ADAPTÉ À VOTRE PARCOURS ACTIF",
      trkNoPlanBanner: "Répondez aux 4 questions sur l'accueil pour adapter ce suivi à vos délais exacts !",
      trkStartSetupBtn: "🧭 Configurer mon parcours →",
      trkSetDateLbl: "Date de référence :"
    },
    es: {
      kicker: "🧭 GUÍA PERSONALIZADA ISRAEL • DIAGNÓSTICO EN 45 SEGUNDOS",
      introTitle: "Tu Camino Más Rápido y Seguro hacia la Aliyá, Conversión o Residencia en Israel",
      introSub: "Evita los 9–12 meses de espera de la Agencia Judía y las trampas burocráticas que congelan expedientes por años. Responde 4 preguntas rápidas para trazar tu ruta legal exacta paso a paso hasta tu Teudat Zehut.",
      emPillBadge: "🚨 EMERGENCIA / ANTISEMITISMO",
      emPillText: "¿Sufres antisemitismo o necesitas salir rápido? Inicia la Ruta de Aliyá de Emergencia (7 días) →",
      stepIndicator: "Pregunta {cur} de {max}",
      backBtn: "← Atrás",
      q1Title: "1. ¿Cuál es tu objetivo principal?",
      q1Sub: "Elige tu meta — adaptaremos las siguientes preguntas automáticamente:",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ Hacer Aliyá o Residencia de Pareja en Israel", "Ley del Retorno O vida en Israel con pareja israelí/judía"],
        ["giyur_rabbanut", "🏛️ Conversión — Vía Estatal / Rabinato", "Autoridad Estatal de Conversión (Nativ) o corte reconocida para Aliyá y matrimonio"],
        ["giyur_private", "🕍 Conversión — Beit Din Ortodoxo Privado", "Tribunal ortodoxo independiente (ej. Gush Etzion / Bnei Brak)"]
      ],
      helperLink: "🤔 ¿Dudas entre Rabinato Estatal o Beit Din Privado? Ayúdame a elegir →",
      helperBoxTitle: "Rabinato Estatal vs. Beit Din Privado:",
      helperBoxBody: "• ¿Necesitas ciudadanía (Aliyá) solo por tu conversión? Misrad HaPanim exige la vía estatal (o 9 meses en comunidad reconocida en el exterior).\n• ¿Tienes pareja israelí (Nohal 5.2.0008/0009), raíces Ley del Retorno o regresas a tu país? Advertencia: aunque es 100% kosher, Misrad HaPanim bloquea la Aliyá de turistas con conversión privada y el Gran Rabinato rechaza registrar tu boda sin validación estatal separada.",
      helperBtnState: "Elegir Rabinato Estatal →",
      helperBtnPriv: "Elegir Beit Din Privado →",
      q2Title: "2. ¿Para quién es este plan?",
      q2Sub: "El grupo familiar define qué apostillas, cartas de testigos y reglas de Sefach aplican:",
      q2Opts: [
        ["solo", "👤 Solo Para Mí", "Solicitante individual"],
        ["couple", "💑 Para Mí + Mi Cónyuge o Pareja", "Proceso en pareja"],
        ["family_kids", "👨‍👩‍👧 Para Mí / Nosotros + Hijos (menores de 18)", "Incluye menores (activa reglas de partida literal y Sefach)"]
      ],
      q2bTitle: "2B. Estado de tu pareja y relación:",
      q2bSub: "Determina si aplica Nohal 5.2.0008 (casados), Nohal 5.2.0009 (convivientes) o Aliyá conjunta:",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 Pareja Ciudadana Israelí — Legalmente Casados", "Procedimiento gradual casados (Nohal 5.2.0008 + Formulario Ash/6)"],
        ["israeli_unmarried", "🇮🇱🤝 Pareja Ciudadana Israelí — No Casados / Conviviendo", "Unión de hecho Nohal 5.2.0009 o matrimonio civil + Jupá"],
        ["jewish_partner", "✡️ Pareja Judía / Elegible Ley del Retorno", "Aliyá conjunta"],
        ["both_converting", "🌍 Ninguno es Israelí o Judío Todavía", "Proceso conjunto"],
        ["single_parent_kids", "👩‍👧 Padre/Madre Soltero(a) + Hijos", "Solicitud individual con menores"]
      ],
      q3Title: "3. ¿Dónde te encuentras ahora mismo?",
      q3Sub: "Tu ubicación controla el reloj de 90 días de turista, los 180 días de apostillas y el salto de fila de la Agencia Judía:",
      q3Opts: [
        ["abroad", "🛫 Fuera de Israel (Planificando antes de volar)", "Momento ideal para sacar los 5 documentos apostillados en persona y ahorrar 9–12 meses"],
        ["israel_b2", "🇮🇱 En Israel con Visa de Turista (B/2)", "Activa escudo de 90 días, formularios Ash/3 / Ash/1 y seguro médico puente"],
        ["israel_visa", "🪪 En Israel con Visa de Estudiante, Masa, Trabajo o Temp.", "Visa A/2, B/1 o A/5"]
      ],
      q4SpousalTitle: "4. ¿En qué etapa estás ante Misrad HaPanim?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 Aún sin presentar — Armando carpeta", "5 documentos apostillados, Ash/6, Nespach Alef y cartas de testigos"],
        ["spousal_demand", "📄 Recibimos Hoja de Requerimientos (Plazo de 30 días)", "Traducción inmediata y escudo contra cierre de expediente"],
        ["spousal_interview", "🎤 Preparando la Entrevista de Pareja en Salas Separadas", "Práctica de las 300 preguntas en 2 teléfonos sincronizados"]
      ],
      q4AliyahTitle: "4. ¿Cómo se documenta tu elegibilidad a la Ley del Retorno?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 Madre / Abuela materna judía (Occidente / LatAm)", "Aliyá directa en Israel (Ash/456) o vía rápida"],
        ["lor_fsu_nativ", "🏛️ Raíces ex-URSS — Verificación Nativ", "CV de seguridad de 11 páginas + partidas originales"],
        ["lor_paternal", "🧬 Padre o Abuelo judío (Ley del Retorno)", "Ciudadanía rápida por Aliyá primero + conversión estatal como ciudadano"],
        ["lor_overseas_giyur", "📜 Convertido(a) al judaísmo en el extranjero", "Regla de 9 meses post-mikve y validación del Rabinato"]
      ],
      q4RabbanutTitle: "4. ¿En qué etapa de tu conversión estás?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 Recién empezando — Elegibilidad, Visa y Rabino", "Va'adat Jariguim (Ash/1) para turistas + Rabino patrocinador"],
        ["rabbanut_studying", "📖 Estudiando y asistiendo a la sinagoga", "5–8 cartas comunitarias y 56 canciones/rezos de Shabat"],
        ["rabbanut_tribunal", "⚖️ Cerca del Beit Din final", "Simulador de 700 preguntas del tribunal"]
      ],
      q4PrivTitle: "4. ¿Planeas vivir permanentemente en Israel tras convertirte?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 Sí — Quiero hacer Aliyá mediante esta conversión", "Verifica el filtro de Misrad HaPanim para turistas antes de iniciar"],
        ["private_with_anchor", "💍 Sí — Vía pareja israelí o Ley del Retorno", "Combina residencia legal + Beit Din privado + Ishur Giyur del Rabinato"],
        ["private_going_home", "✈️ No — Regreso a mi país después del Beit Din", "Enfoque en aprobar el Beit Din, cartas y liturgia"]
      ],
      em1Title: "🚨 Triaje de Emergencia (1/2): ¿Dónde estás ahora?",
      em1Opts: [
        ["abroad_exit", "🛫 Aún fuera de Israel — Necesito salir rápido", "Reunir carpeta 'Go-Bag' de 5 apostillas en 7 días antes de abordar"],
        ["in_israel_now", "🇮🇱 Ya aterricé en Israel — Protección urgente de estatus", "Proteger estadía y presentar cambio de estatus en Israel"]
      ],
      em2Title: "🚨 Triaje de Emergencia (2/2): ¿Cuál aplica a tu caso?",
      em2Opts: [
        ["lor_or_spouse", "✡️ Elegible Ley del Retorno O Pareja Israelí", "Formulario Ash/456 en Israel o Nohal 5.2.0008/0009"],
        ["giyur_transfer", "🕍 En medio de conversión / Va'adat Jariguim humanitaria", "Carta de traslado rabínico + petición humanitaria Ash/1"]
      ],
      tlBadgeSynced: "🟢 Sincronizado en tus dispositivos (Nube)",
      tlBadgeGuest: "⚪ Vista de Invitado — Guarda para sincronizar en hasta 5 dispositivos",
      tlSyncBtn: "📲 Guardar y Sincronizar mi ruta en hasta 5 dispositivos (WhatsApp) →",
      tlRetakeBtn: "↺ Cambiar respuestas",
      tlTrackerBtn: "⏱️ Abrir mi Rastreador de Plazos Adaptado →",
      tlAiBtn: "✨ Preguntar a Spok sobre mi ruta",
      tlTapHint: "👇 Toca cualquier círculo numerado para ver el plan paso a paso, trampas, guías y herramientas:",
      tlKidsBadge: "👨‍👩‍👧 Incluye protocolo para hijos menores (Partida literal apostillada y Sefach)",
      trapAlertTitle: "⚠️ Alerta de Doble Filtro (Evita perder 2–3 años)",
      trapAlertBody: "Una conversión ortodoxa privada como turista te hace 100% judío según la Halajá, pero Misrad HaPanim NO otorga Aliyá solo con ella sin pareja israelí ni Ley del Retorno. ¡Abajo trazamos el giro legal exacto (Va'adat Jariguim Ash/1) para lograrlo!",
      stepDoneLbl: "Completado",
      stepActiveLbl: "Paso Actual",
      stepNextLbl: "Ver plan →",
      popSecBlueprint: "🎯 Plan de Acción Paso a Paso",
      popSecPitfalls: "💣 Trampas y Errores que Debes Evitar",
      popSecTools: "🛠️ Herramientas Interactivas para este Paso",
      popSecGuides: "📖 Guías Completas en Nuestro Sitio",
      popMarkDone: "✅ Marcar este paso como completado",
      popUnmarkDone: "↺ Desmarcar paso",
      popAskAi: "✨ Preguntar a Spok sobre el Paso #{n}",
      popClose: "Cerrar",
      trkCustomTag: "🎯 ADAPTADO A TU RUTA ACTIVA",
      trkNoPlanBanner: "¡Responde las 4 preguntas en Inicio para adaptar estos relojes a tu ruta exacta!",
      trkStartSetupBtn: "🧭 Configurar mi ruta ahora →",
      trkSetDateLbl: "Fecha base:"
    },
    de: {
      kicker: "🧭 PERSÖNLICHER ISRAEL-LEITFADEN • 45-SEKUNDEN-ANALYSE",
      introTitle: "Ihr Kürzester und Sicherster Weg zu Alija, Giur oder Aufenthalt in Israel",
      introSub: "Überspringen Sie die 9–12 Monate Wartezeit der Jewish Agency und vermeiden Sie Bürokratiefallen, die Akten jahrelang blockieren. Beantworten Sie 4 kurze Fragen für Ihren exakten Stufenplan bis zur Teudat Zehut.",
      emPillBadge: "🚨 NOTFALL / ANTISEMITISMUS",
      emPillText: "Antisemitismus oder dringende Ausreise? 7-Tage Notfall-Alija & Go-Bag Plan starten →",
      stepIndicator: "Frage {cur} von {max}",
      backBtn: "← Zurück",
      q1Title: "1. Was ist Ihr Hauptziel?",
      q1Sub: "Wählen Sie Ihr Ziel — die nächsten Fragen passen sich automatisch an:",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ Alija oder Partner-Aufenthalt in Israel", "Rückkehrgesetz ODER gemeinsames Leben in Israel mit israelischem/jüdischem Partner"],
        ["giyur_rabbanut", "🏛️ Konversion (Giur) — Staatliches Rabbinat", "Staatliche Konversionsbehörde (Nativ) oder anerkanntes Gericht für Alija & Heirat"],
        ["giyur_private", "🕍 Konversion — Privates Orthodoxes Beit Din", "Unabhängiges orthodoxes Rabbinatsgericht (z. B. Gush Etzion / Bnei Brak)"]
      ],
      helperLink: "🤔 Unsicher zwischen Staatlichem Rabbinat & Privatem Beit Din? Entscheidungshilfe →",
      helperBoxTitle: "Staatliches Rabbinat vs. Privates Beit Din:",
      helperBoxBody: "• Benötigen Sie die israelische Staatsbürgerschaft (Alija) allein durch Ihren Giur? Misrad HaPanim verlangt den staatlichen Giur (oder 9 Monate anerkannte Auslandsgemeinde).\n• Haben Sie einen israelischen Partner (Nohal 5.2.0008/0009), Rückkehrgesetz-Wurzeln oder kehren Sie ins Ausland zurück? Warnung: Obwohl 100 % koscher, blockiert Misrad HaPanim die Alija bei privatem Touristen-Giur und das Oberrabbinat verweigert die Heirat ohne separates staatliches Prüfverfahren!",
      helperBtnState: "Staatliches Rabbinat wählen →",
      helperBtnPriv: "Privates Beit Din wählen →",
      q2Title: "2. Für wen ist dieser Plan?",
      q2Sub: "Der Haushalt bestimmt Apostillen, Zeugenbriefe und Sefach-Regeln:",
      q2Opts: [
        ["solo", "👤 Nur für mich", "Einzelantragsteller"],
        ["couple", "💑 Ich + Mein Ehepartner / Partner", "Gemeinsamer Weg als Paar"],
        ["family_kids", "👨‍👩‍👧 Ich / Wir + Kinder (unter 18)", "Mit Minderjährigen (aktiviert Kinder-Geburtsurkunden & Sefach-Schutz)"]
      ],
      q2bTitle: "2B. Status Ihres Partners & Ihrer Beziehung:",
      q2bSub: "Bestimmt Nohal 5.2.0008 (verheiratet), Nohal 5.2.0009 (Lebensgemeinschaft) oder gemeinsame Alija:",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 Partner ist israelischer Staatsbürger — Verheiratet", "Ehepartner-Stufenverfahren (Nohal 5.2.0008 + Formular Ash/6)"],
        ["israeli_unmarried", "🇮🇱🤝 Partner ist israelischer Staatsbürger — Unverheiratet / Paar", "Lebensgemeinschaft Nohal 5.2.0009 oder Zivilehe + Chuppa"],
        ["jewish_partner", "✡️ Partner ist jüdisch / Rückkehrgesetz-berechtigt", "Gemeinsame Alija"],
        ["both_converting", "🌍 Keiner von uns ist bisher israelisch oder jüdisch", "Gemeinsamer Prozess"],
        ["single_parent_kids", "👩‍👧 Alleinerziehend + Kinder", "Einzelantrag mit Kindern"]
      ],
      q3Title: "3. Wo befinden Sie sich gerade?",
      q3Sub: "Ihr Aufenthaltsort steuert die 90-Tage-Touristenfrist, 180-Tage-Apostillenfrist und den JAFI-Direktweg:",
      q3Opts: [
        ["abroad", "🛫 Außerhalb Israels (Planung vor dem Flug)", "Bestes Zeitfenster, um alle 5 Apostille-Dokumente persönlich zu holen & 9–12 Monate zu sparen"],
        ["israel_b2", "🇮🇱 In Israel mit Touristenvisum (B/2)", "Aktiviert 90-Tage-Schutz, Formular Ash/3 / Ash/1 & Brücken-Krankenversicherung"],
        ["israel_visa", "🪪 In Israel mit Studenten-, Masa-, Arbeits- oder Temp.-Visum", "Visum A/2, B/1 oder A/5"]
      ],
      q4SpousalTitle: "4. Wo stehen Sie im Misrad-HaPanim-Partnerverfahren?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 Noch nicht eingereicht — Akte im Aufbau", "5 Apostille-Dokumente, Ash/6, Nespach Alef & Zeugenbriefe"],
        ["spousal_demand", "📄 30-Tage-Nachforderungsblatt erhalten (Daf Drishot)", "Sofort-Übersetzung & 30-Tage-Aktenschließungsschutz"],
        ["spousal_interview", "🎤 Vorbereitung auf das Paar-Interview in getrennten Räumen", "300-Fragen-Training synchron auf 2 Handys"]
      ],
      q4AliyahTitle: "4. Wie ist Ihr Anspruch nach dem Rückkehrgesetz belegt?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 Jüdische Mutter / Großmutter mütterlicherseits (Westen/DACH)", "Direkte Alija in Israel (Ash/456) oder Schnellverfahren"],
        ["lor_fsu_nativ", "🏛️ Wurzeln in der ehem. Sowjetunion — Nativ-Prüfung", "11-seitiger Sicherheits-Lebenslauf + Originalurkunden"],
        ["lor_paternal", "🧬 Jüdischer Vater oder Großvater (Rückkehrgesetz)", "Schnelle Alija-Staatsbürgerschaft zuerst + optionaler Staats-Giur als Bürger"],
        ["lor_overseas_giyur", "📜 Im Ausland zum Judentum konvertiert", "9-Monats-Gemeinderegel nach der Mikwe & Rabbinatsprüfung"]
      ],
      q4RabbanutTitle: "4. Wo stehen Sie auf Ihrem Giur-Weg?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 Ganz am Anfang — Zulassung, Visum & Begleitrabbiner", "Va'adat Charigim (Ash/1) für Touristen + geprüfter Rabbiner"],
        ["rabbanut_studying", "📖 Im Unterricht & regelmäßiger Synagogenbesuch", "5–8 Gemeindebriefe & 56 Schabbat-Lieder/Gebete"],
        ["rabbanut_tribunal", "⚖️ Kurz vor dem abschließenden Beit Din", "700-Fragen-Prüfungssimulator"]
      ],
      q4PrivTitle: "4. Planen Sie nach dem Giur dauerhaft in Israel zu leben?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 Ja — Ich möchte über diesen Giur Alija machen", "Prüft vorab die Misrad-HaPanim-Sperre für private Touristen-Konversionen"],
        ["private_with_anchor", "💍 Ja — Über israelischen Partner oder Rückkehrgesetz", "Kombiniert Aufenthaltsstatus + Privates Beit Din + Rabbinats-Ishur-Giyur"],
        ["private_going_home", "✈️ Nein — Rückkehr ins Ausland nach dem Beit Din", "Fokus auf Beit-Din-Prüfung, Briefe & Liturgie"]
      ],
      em1Title: "🚨 Notfall-Triage (1/2): Wo sind Sie jetzt?",
      em1Opts: [
        ["abroad_exit", "🛫 Noch im Ausland — Schnelle Ausreise nötig", "Alle 5 Apostille-Originale ('Go-Bag') in 7 Tagen vor Abflug sichern"],
        ["in_israel_now", "🇮🇱 Bereits in Israel — Dringender Statusschutz", "Aufenthalt sofort absichern & Statuswechsel im Inland stellen"]
      ],
      em2Title: "🚨 Notfall-Triage (2/2): Was trifft auf Sie zu?",
      em2Opts: [
        ["lor_or_spouse", "✡️ Rückkehrgesetz-berechtigt ODER israelischer Partner", "Formular Ash/456 im Inland oder Nohal 5.2.0008/0009"],
        ["giyur_transfer", "🕍 Mitten im Giur / Humanitäre Va'adat Charigim", "Rabbiner-Transferbrief + humanitärer Antrag Ash/1"]
      ],
      tlBadgeSynced: "🟢 Über Ihre Geräte synchronisiert (Cloud)",
      tlBadgeGuest: "⚪ Gast-Vorschau — Für bis zu 5 Geräte speichern",
      tlSyncBtn: "📲 Meinen Plan auf bis zu 5 Geräten synchronisieren (WhatsApp) →",
      tlRetakeBtn: "↺ Antworten ändern",
      tlTrackerBtn: "⏱️ Meinen angepassten Fristen-Tracker öffnen →",
      tlAiBtn: "✨ Spok zu meinem Plan fragen",
      tlTapHint: "👇 Tippen Sie auf einen nummerierten Kreis für Aktionsplan, Fallen, Leitfäden & Tools:",
      tlKidsBadge: "👨‍👩‍👧 Inklusive Minderjährigen-Protokoll (Apostillierte Geburtsurkunde & Sefach)",
      trapAlertTitle: "⚠️ Wichtige Doppel-Schranken-Warnung (Spart 2–3 verlorene Jahre)",
      trapAlertBody: "Ein privater orthodoxer Giur mit Touristenvisum macht Sie halachisch 100 % jüdisch — aber Misrad HaPanim gewährt daraus allein KEINE Alija ohne israelischen Partner oder Rückkehrgesetz. Unten zeigen wir den exakten legalen Weg (Va'adat Charigim Ash/1)!",
      stepDoneLbl: "Erledigt",
      stepActiveLbl: "Aktueller Schritt",
      stepNextLbl: "Plan öffnen →",
      popSecBlueprint: "🎯 Schritt-für-Schritt Aktionsplan",
      popSecPitfalls: "💣 Bürokratische Fallen & Fehler vermeiden",
      popSecTools: "🛠️ Interaktive Tools für diesen Schritt",
      popSecGuides: "📖 Vertiefende Leitfäden auf unserer Seite",
      popMarkDone: "✅ Schritt als erledigt markieren",
      popUnmarkDone: "↺ Markierung aufheben",
      popAskAi: "✨ Spok zu Schritt #{n} öffnen",
      popClose: "Schließen",
      trkCustomTag: "🎯 AN IHREN AKTIVEN PFAD ANGEPASST",
      trkNoPlanBanner: "Beantworten Sie die 4 Fragen auf der Startseite, damit sich dieser Tracker exakt Ihren Fristen anpasst!",
      trkStartSetupBtn: "🧭 Meinen Pfad jetzt einrichten →",
      trkSetDateLbl: "Startdatum:"
    },
    ru: {
      kicker: "🧭 ПЕРСОНАЛЬНЫЙ ГИД ПО ИЗРАИЛЮ • ПОДБОР МАРШРУТА ЗА 45 СЕКУНД",
      introTitle: "Ваш самый быстрый и надёжный путь к репатриации, гиюру или статусу в Израиле",
      introSub: "Обойдите 9–12 месяцев ожидания в Сохнуте и бюрократические ловушки МВД и Раввината, из-за которых дела зависают на годы. Ответьте на 4 коротких вопроса — мы построим ваш точный пошаговый план до получения Теудат-Зеута.",
      emPillBadge: "🚨 ЭКСТРЕННЫЙ ВЫЕЗД / АНТИСЕМИТИЗМ",
      emPillText: "Столкнулись с антисемитизмом или нужно срочно выехать? Открыть 7-дневный план экстренной репатриации →",
      stepIndicator: "Вопрос {cur} из {max}",
      backBtn: "← Назад",
      q1Title: "1. Какова ваша главная цель?",
      q1Sub: "Выберите цель — следующие вопросы автоматически подстроятся под вашу ситуацию:",
      q1Opts: [
        ["aliyah_or_spouse", "✈️ Репатриация (Алия) или статус супруга/партнёра (СТУПРО)", "Закон о возвращении ИЛИ совместная жизнь с гражданином/гражданкой Израиля"],
        ["giyur_rabbanut", "🏛️ Гиюр — Государственный маршрут / Раввинат (Натив)", "Государственное управление гиюра или признанный суд для полной алии и брака"],
        ["giyur_private", "🕍 Гиюр — Частный ортодоксальный Бейт-Дин", "Независимый ортодоксальный суд (например, Гуш-Эцион / Бней-Брак)"]
      ],
      helperLink: "🤔 Не уверены, выбрать ли государственный гиюр или частный Бейт-Дин? Подсказка за 10 сек →",
      helperBoxTitle: "Государственный гиюр против частного Бейт-Дина:",
      helperBoxBody: "• Нужна репатриация (гражданство) только на основании гиюра? МВД требует государственный гиюр (или 9 месяцев в признанной зарубежной общине).\n• Есть партнёр-израильтянин (СТУПРО 5.2.0008/0009), корни по Закону о возвращении или вы возвращаетесь за рубеж? Важно: хотя частный суд 100% кошерный по Галахе, МВД блокирует Алию туристам с частным гиюром, а Главный раввинат отказывает в браке без отдельного гос. подтверждения!",
      helperBtnState: "Выбрать государственный гиюр →",
      helperBtnPriv: "Выбрать частный Бейт-Дин →",
      q2Title: "2. Для кого составляется этот план?",
      q2Sub: "Состав семьи определяет список документов с апостилем, писем свидетелей и правила Сефаха:",
      q2Opts: [
        ["solo", "👤 Только для меня", "Индивидуальный заявитель"],
        ["couple", "💑 Для меня + супруг(а) / партнёр", "Совместный процесс для пары"],
        ["family_kids", "👨‍👩‍👧 Для меня / нас + дети (до 18 лет)", "Включает несовершеннолетних (протокол полных свидетельств и открытого Сефаха)"]
      ],
      q2bTitle: "2B. Статус вашего партнёра и отношений:",
      q2bSub: "Определяет применение инструкции 5.2.0008 (брак), 5.2.0009 (гражданский союз) или совместной алии:",
      q2bOpts: [
        ["israeli_married", "🇮🇱💍 Партнёр — гражданин Израиля, официальный брак", "Ступенчатая процедура СТУПРО для супругов (5.2.0008 + анкета Аш/6)"],
        ["israeli_unmarried", "🇮🇱🤝 Партнёр — гражданин Израиля, не расписаны / живём вместе", "Совместное проживание (5.2.0009) или гражданский брак / Юта + Хупа"],
        ["jewish_partner", "✡️ Партнёр с еврейскими корнями (право на репатриацию)", "Совместная алия по Закону о возвращении"],
        ["both_converting", "🌍 Мы оба пока без гражданства Израиля / проходим гиюр", "Совместная подача или обучение"],
        ["single_parent_kids", "👩‍👧 Один родитель + дети (без партнёра)", "Самостоятельная подача с детьми"]
      ],
      q3Title: "3. Где вы находитесь прямо сейчас?",
      q3Sub: "От локации зависят 90 дней турвизы, 180 дней годности справок и обход очереди Сохнута:",
      q3Opts: [
        ["abroad", "🛫 За пределами Израиля (планируем до вылета)", "Лучший момент лично собрать все 5 документов с апостилем и сэкономить 9–12 мес."],
        ["israel_b2", "🇮🇱 В Израиле по туристической визе (B/2)", "Включает защиту 90 дней, анкеты Аш/3 / Аш/1 и медстраховку без Теудат-Зеута"],
        ["israel_visa", "🪪 В Израиле по студенческой, Маса, рабочей или врем. визе", "Виза A/2, B/1 или A/5"]
      ],
      q4SpousalTitle: "4. На каком вы этапе в МВД (Мисрад а-Паним)?",
      q4SpousalOpts: [
        ["spousal_prefile", "📂 Ещё не подавали — собираем досье", "5 документов с апостилем, анкета Аш/6, Неспах Алеф и письма свидетелей"],
        ["spousal_demand", "📄 Получили лист требований от чиновника (срок 30 дней)", "Мгновенный перевод и защита от закрытия дела"],
        ["spousal_interview", "🎤 Готовимся к перекрёстному собеседованию в разных комнатах", "Тренажёр 300 вопросов МВД синхронно на 2 телефонах"]
      ],
      q4AliyahTitle: "4. Как подтверждается ваше право на репатриацию?",
      q4AliyahOpts: [
        ["lor_maternal_west", "🕎 Еврейская мама / бабушка по маме (западные страны)", "Репатриация прямо в Израиле (анкета Аш/456) без ожидания Сохнута"],
        ["lor_fsu_nativ", "🏛️ Корни из стран бывшего СССР — проверка Натив", "11-страничная анкета безопасности + оригиналы советских актов"],
        ["lor_paternal", "🧬 Еврейский папа или дедушка (Закон о возвращении)", "Быстрое гражданство по алии + опция гос. гиюра уже в статусе гражданина"],
        ["lor_overseas_giyur", "📜 Прошли гиюр за границей", "Правило 9 месяцев в общине после миквы и подтверждение Раввината"]
      ],
      q4RabbanutTitle: "4. На каком вы этапе гиюра?",
      q4RabbanutOpts: [
        ["rabbanut_start", "🌱 Только начинаю — допуск, виза и сопровождающий раввин", "Ваадат Харигим (Аш/1) для туристов + проверенный раввин"],
        ["rabbanut_studying", "📖 Учусь и посещаю синагогу", "Сбор 5–8 рекомендательных писем и 56 субботних песен/молитв"],
        ["rabbanut_tribunal", "⚖️ Готовлюсь к финальному суду Бейт-Дина", "Тренажёр 700 реальных вопросов даянов"]
      ],
      q4PrivTitle: "4. Планируете ли вы постоянно жить в Израиле после гиюра?",
      q4PrivOpts: [
        ["private_wants_aliyah", "🇮🇱 Да — хочу репатриироваться на основании этого гиюра", "Важно: проверяет фильтр МВД для туристов до начала процесса"],
        ["private_with_anchor", "💍 Да — через партнёра-израильтянина или Закон о возвращении", "Легальный статус МВД + частный Бейт-Дин + Ишур Гиюр Раввината"],
        ["private_going_home", "✈️ Нет — возвращаюсь домой за границу после суда", "Фокус на сдаче Бейт-Дина, письмах и молитвах"]
      ],
      em1Title: "🚨 Экстренный отбор (1 из 2): Где вы сейчас?",
      em1Opts: [
        ["abroad_exit", "🛫 Ещё за границей — нужно вылететь быстро", "Собрать тревожную папку ('Go-Bag') из 5 документов с апостилем за 7 дней"],
        ["in_israel_now", "🇮🇱 Уже прилетели в Израиль — нужна защита статуса", "Немедленно защитить визу и подать на смену статуса внутри страны"]
      ],
      em2Title: "🚨 Экстренный отбор (2 из 2): Что относится к вам?",
      em2Opts: [
        ["lor_or_spouse", "✡️ Право по Закону о возвращении ИЛИ супруг-израильтянин", "Анкета Аш/456 в Израиле или СТУПРО 5.2.0008/0009"],
        ["giyur_transfer", "🕍 В процессе гиюра / гуманитарная Ваадат Харигим", "Письмо перевода от раввина + гуманитарная петиция Аш/1"]
      ],
      tlBadgeSynced: "🟢 Синхронизировано в облаке (до 5 устройств)",
      tlBadgeGuest: "⚪ Гостевой режим — сохраните для синхронизации до 5 устройств",
      tlSyncBtn: "📲 Сохранить и синхронизировать маршрут (WhatsApp) →",
      tlRetakeBtn: "↺ Изменить ответы",
      tlTrackerBtn: "⏱️ Открыть мой персональный трекер сроков →",
      tlAiBtn: "✨ Спросить Spok (Спок) по моему маршруту",
      tlTapHint: "👇 Нажмите на любой кружок с номером, чтобы открыть пошаговый план, ловушки, статьи и инструменты:",
      tlKidsBadge: "👨‍👩‍👧 Включён протокол для детей до 18 лет (апостиль свидетельств и открытый Сефах)",
      trapAlertTitle: "⚠️ Предупреждение двойного фильтра (экономит 2–3 года)",
      trapAlertBody: "Частный ортодоксальный гиюр по турвизе делает вас 100% евреем по Галахе, но МВД НЕ даёт репатриацию только по нему без партнёра-израильтянина или корней по Закону о возвращении. Ниже мы выстроили законный переход (Ваадат Харигим Аш/1)!",
      stepDoneLbl: "Выполнено",
      stepActiveLbl: "Текущий шаг",
      stepNextLbl: "Открыть план →",
      popSecBlueprint: "🎯 Пошаговый план действий",
      popSecPitfalls: "💣 Подводные камни и частые ошибки",
      popSecTools: "🛠️ Интерактивные инструменты сайта для этого шага",
      popSecGuides: "📖 Подробные руководства на нашем сайте",
      popMarkDone: "✅ Отметить шаг выполненным",
      popUnmarkDone: "↺ Снять отметку выполнения",
      popAskAi: "✨ Спросить Spok (Спок) о шаге #{n}",
      popClose: "Закрыть",
      trkCustomTag: "🎯 АДАПТИРОВАНО ПОД ВАШ МАРШРУТ",
      trkNoPlanBanner: "Ответьте на 4 вопроса на главной странице, чтобы трекер настроился под ваши точные сроки!",
      trkStartSetupBtn: "🧭 Настроить мой маршрут →",
      trkSetDateLbl: "Опорная дата:"
    }
  };

  // ==========================================================================
  // 16 MODULAR STEP BLUEPRINTS (WITH EXACT TOOLS, GUIDES & PITFALLS)
  // ==========================================================================


  const Q1_B1_OPTION_BY_LANG = {
    en: ["b1_work_visa_track", "🛠️ Applying on a Work Visa (B/1) — See High-Rejection Disclaimer", "Why foreign labor B/1 visas face heavy PIBA scrutiny & how to maximize approval"],
    he: ["b1_work_visa_track", "🛠️ מגיש/ה עם אשרת עבודה (B/1) — קראו הבהרת שקיפות וסיכויי אישור", "מדוע אשרות עבודה B/1 סובלות מאחוזי סירוב גבוהים וכיצד למקסם סיכויי אישור"],
    fr: ["b1_work_visa_track", "🛠️ Demande sous Visa de Travail (B/1) — Avertissement & Stratégie", "Pourquoi les visas B/1 subissent un fort taux de refus et comment maximiser vos chances"],
    es: ["b1_work_visa_track", "🛠️ Solicitud con Visa de Trabajo (B/1) — Aviso de Transparencia", "Por qué las visas laborales B/1 tienen alta tasa de rechazo y cómo maximizar aprobación"],
    de: ["b1_work_visa_track", "🛠️ Antrag mit Arbeitsvisum (B/1) — Transparenz-Hinweis & Strategie", "Warum reguläre B/1-Arbeitsvisa hohe Ablehnungsquoten haben & wie Sie Chancen maximieren"],
    ru: ["b1_work_visa_track", "🛠️ Подача с рабочей визой (B/1) — Честное предупреждение и стратегия", "Почему рабочие визы B/1 получают больше всего отказов и как повысить шансы"]
  };

  Object.keys(UI).forEach(function(lg) {
    const rt = RACHEL_TRANSPARENCY_I18N[lg] || RACHEL_TRANSPARENCY_I18N.en;
    const u = UI[lg];
    if (!u) return;
    u.helperBoxTitle = rt.helperBoxTitle;
    u.helperBoxBody = rt.helperBoxBody;
    u.startMyPathBtn = rt.startMyPathBtn;
    u.b1DisclaimerTitle = rt.b1DisclaimerTitle;
    u.b1DisclaimerBody = rt.b1DisclaimerBody;
    u.b1AskAiBtn = rt.b1AskAiBtn;
    u.b1AskAiPrompt = rt.b1AskAiPrompt;
    u.rejBannerTitle = rt.rejBannerTitle;
    u.rejBannerBody = rt.rejBannerBody;
    u.rejAskAiBtn = rt.rejAskAiBtn;
    u.rejAskAiPrompt = rt.rejAskAiPrompt;
    if (Array.isArray(u.q1Opts)) {
      const b1Opt = Q1_B1_OPTION_BY_LANG[lg] || Q1_B1_OPTION_BY_LANG.en;
      if (!u.q1Opts.some(function(x){ return x[0] === "b1_work_visa_track"; })) u.q1Opts.push(b1Opt);
      if (!u.q1Opts.some(function(x){ return x[0] === "visa_rejected_rescue"; })) u.q1Opts.push(rt.q1OptRejected);
    }
    if (Array.isArray(u.q3Opts)) {
      u.q3Opts = [
        u.q3Opts[0],
        u.q3Opts[1],
        rt.q3OptStudent,
        rt.q3OptB1Work,
        rt.q3OptRejected
      ];
    }
  });


  const MASTER_HERO_6LANG = {
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
};
  Object.keys(UI).forEach(function(lg) {
    const mh = MASTER_HERO_6LANG[lg] || MASTER_HERO_6LANG.en;
    if (UI[lg]) {
      UI[lg].introTitle = mh.title;
      UI[lg].introSub = mh.lead;
      UI[lg].heroBullets = mh.bullets;
      UI[lg].startMyPathBtn = mh.cta;
    }
  });
    // === GAT 7-STEP ENRICHMENT & 6-LANGUAGE MILESTONE CATALOG WRAPPER START ===
  window.GAT_TRACKER_I18N_6L = {
    en: {
      stepWord: "STEP",
      setDateHint: "Set date below to start live countdown",
      daysRemaining: "{n} Days Remaining",
      expiredDaysAgo: "Expired {n}d ago",
      clockB2: "🛂 90-Day B/2 Tourist Visa Clock",
      clockApostille: "📜 180-Day Foreign Doc & Police Check Clock",
      clockClerk30d: "⚡ 30-Day Clerk Demand Sheet Shield",
      clockMikvah9mo: "🕍 9-Month Post-Mikvah Community Rule",
      clockSalKlita: "💰 24-Month Sal Klita Benefits Window",
      toolScanDocs: "Scan & Audit My Documents (Smart Scanner)",
      toolCloudVault: "Open My 5-Device Cloud Document Vault",
      toolNotary: "Book Israeli Red-Ribbon Notary Translation",
      toolAsh1: "Stamp Form Ash/1 (Va'adat Charigim PDF)",
      toolAsh3: "Stamp Form Ash/3 (B/2 Visa Extension)",
      toolAsh6: "Stamp Form Ash/6 (6-Page Spousal PDF)",
      toolNespach: "Stamp Nespach Alef (13-Clause Affidavit)",
      toolAsh456: "Stamp Form Ash/456 (In-Israel Aliyah PDF)",
      toolSecCv: "Stamp 11-Page Security CV (Korot Chaim)",
      toolMr14a: "Stamp Form MR/14a (First Biometric TZ)",
      toolMr14b: "Stamp Form MR/14b (Israeli Passport)",
      toolRabbiLetters: "Open Rabbi, Witness & Community Letter Studio",
      toolCouples300: "Launch 300-Q 2-Phone Couples Sync",
      toolSongs56: "Open 56 Shabbat Songs & Prayers Karaoke Trainer",
      toolBeitDin700: "Launch 700 Beit Din Exam Simulator & Audio",
      toolHealthFx: "60–90 Day Bridge Health & ₪ FX Calculators",
      toolConcierge: "Book 1-on-1 Legal / Rabbinic Case Review",
      guideApostille: "📘 The 5 Apostilled Docs & 180-Day Clock Rules",
      guideGoBag: "📘 Emergency Aliyah Go-Bag & Shinui Ma'amad Guide",
      guideClerk: "📘 Misrad HaPanim Clerk Letter Decoder & Ash/1–Ash/3 Guide",
      guideVaadat: "📘 Va'adat Charigim Tourist Conversion Playbook (Form Ash/1)",
      guideSpousal: "📘 Complete Israel Spousal Visa Playbook (Nohal 5.2.0008 / 0009)",
      guideCouples300: "📘 300 Misrad HaPanim Couples Interview Questions Guide",
      guideBeitDin700: "📘 700 Real Beit Din Conversion Questions & Answers",
      guideRabbiLetters: "📘 Israeli Sponsoring Rabbi & Beit Din Letters Guide",
      guidePrivateGiyur: "📘 Gush Etzion / Private Conversion & Rabbanut Ishur Giyur Guide",
      guideOverseasGiyur: "📘 Overseas Conversion Aliyah & Ishur Giyur Guide",
      guideDahan: "📘 Dahan Ruling: Non-Orthodox Aliyah vs. Rabbanut Truth",
      guideNoLawyers: "📘 How to Make Aliyah & Giyur Without Expensive Lawyers",
      guideSalKlita: "📘 Aliyah Benefits, Sal Klita 24-Month Rule & Cost Calculator",
      guideGiyurFull: "📘 Complete Guide to Converting to Judaism in Israel",
      guideTouristB2: "📘 B/2 Tourist Survival: Remote Work, Rent & Health Shield",
      guideCriminal: "📘 Past Arrest / Criminal Record Rehabilitation Guide",
      guideNewborn: "📘 Child & Newborn Sefach Registration Guide (Nohal 5.2.0004)"
    },
    he: {
      stepWord: "שלב",
      setDateHint: "בחרו תאריך למטה להפעלת ספירה לאחור חיה",
      daysRemaining: "נותרו {n} ימים",
      expiredDaysAgo: "פג תוקף לפני {n} ימים",
      clockB2: "🛂 שעון 90 ימים לאשרת תייר (B/2)",
      clockApostille: "📜 שעון 180 ימים לתוקף תעודות יושר ואפוסטיל",
      clockClerk30d: "⚡ שעון 30 ימים להשלמת דף דרישות מפקיד",
      clockMikvah9mo: "🕍 שעון 9 חודשי קהילה לאחר המקווה בחו״ל",
      clockSalKlita: "💰 חלון 24 חודשים לזכאות סל קליטה",
      toolScanDocs: "סריקה ובדיקת מסמכים (סורק חכם)",
      toolCloudVault: "פתיחת כספת המסמכים בענן (עד 5 מכשירים)",
      toolNotary: "תיאום תרגום נוטריוני ישראלי (סרט אדום)",
      toolAsh1: "הפקת טופס אש/1 בעברית (ועדת חריגים)",
      toolAsh3: "הפקת טופס אש/3 בעברית (הארכת אשרת שהייה)",
      toolAsh6: "הפקת טופס אש/6 (6 עמודים להליך מדורג)",
      toolNespach: "הפקת נספח א׳ (תצהיר 13 סעיפים לזוגות)",
      toolAsh456: "הפקת טופס אש/456 (שינוי מעמד לעולה מהארץ)",
      toolSecCv: "הפקת שאלון 11 עמודים לנתיב (קורות חיים)",
      toolMr14a: "הפקת טופס מר/14א׳ (תעודת זהות ביומטרית ראשונה)",
      toolMr14b: "הפקת טופס מר/14ב׳ (דרכון ישראלי / תעודת מעבר)",
      toolRabbiLetters: "מחולל מכתבי רב מלווה, עדים וקהילה בעברית",
      toolCouples300: "סימולטור 300 שאלות שימוע זוגי ב-2 טלפונים",
      toolSongs56: "מאמן קריוקי ל-56 שירי שבת, תפילות וברכות",
      toolBeitDin700: "סימולטור 700 שאלות בית הדין לגיור + שמע",
      toolHealthFx: "מחשבוני ביטוח רפואי מגשר (ללא ת״ז) והמרת מט״ח",
      toolConcierge: "תיאום ייעוץ פרטני (עו״ד הגירה / ליווי רבני)",
      guideApostille: "📘 מדריך 5 מסמכי האפוסטיל וחוק 180 הימים",
      guideGoBag: "📘 מדריך תיק חירום (Go-Bag) ושינוי מעמד מהארץ",
      guideClerk: "📘 פענוח דף דרישות ממשרד הפנים וטפסי אש/1–אש/3",
      guideVaadat: "📘 מדריך ועדת חריגים לגיור תיירים (טופס אש/1)",
      guideSpousal: "📘 המדריך המלא להליך מדורג לבני זוג (נוהל 5.2.0008 / 0009)",
      guideCouples300: "📘 מאגר 300 שאלות השימוע הזוגי במשרד הפנים",
      guideBeitDin700: "📘 מאגר 700 שאלות ותשובות לבית הדין לגיור",
      guideRabbiLetters: "📘 מדריך רב מלווה, מדריכת כלה ומכתבי המלצה לבית הדין",
      guidePrivateGiyur: "📘 גיור פרטי (גוש עציון / בני ברק) ואישור גיור ברבנות",
      guideOverseasGiyur: "📘 עלייה לאחר גיור בחו״ל והוצאת אישור גיור",
      guideDahan: "📘 פסק דין דהן: האמת על גיור רפורמי/קונסרבטיבי מול הרבנות",
      guideNoLawyers: "📘 כיצד לבצע עלייה, גיור והליך מדורג ללא עורכי דין יקרים",
      guideSalKlita: "📘 זכויות עולים, מלכודת 24 החודשים של סל קליטה ומחשבון עלויות",
      guideGiyurFull: "📘 המדריך המלא לגיור בישראל (ממלכתי, פרטי ורבנות)",
      guideTouristB2: "📘 הישרדות באשרת תייר B/2: עבודה מרחוק, שכירות וביטוח רפואי",
      guideCriminal: "📘 מדריך הכשרת עבר פלילי ותעודת יושר לעלייה והליך מדורג",
      guideNewborn: "📘 רישום תינוק בספח תעודת הזהות (נוהל 5.2.0004)"
    },
    fr: {
      stepWord: "ÉTAPE",
      setDateHint: "Choisissez une date ci-dessous pour lancer le compte à rebours",
      daysRemaining: "{n} jours restants",
      expiredDaysAgo: "Expiré il y a {n}j",
      clockB2: "🛂 Horloge 90 Jours Visa Touriste (B/2)",
      clockApostille: "📜 Horloge 180 Jours Actes & Casier Judiciaire",
      clockClerk30d: "⚡ Délai Strict 30 Jours Fiche d'Exigences",
      clockMikvah9mo: "🕍 Règle des 9 Mois en Communauté Post-Mikvé",
      clockSalKlita: "💰 Fenêtre de 24 Mois Droits Sal Klita",
      toolScanDocs: "Scanner & Vérifier mes Documents (Smart Scan)",
      toolCloudVault: "Ouvrir mon Coffre-Fort Cloud (5 appareils)",
      toolNotary: "Réserver une Traduction Notariée Israélienne (Ruban Rouge)",
      toolAsh1: "Générer le Formulaire Ash/1 (Va'adat Charigim PDF)",
      toolAsh3: "Générer le Formulaire Ash/3 (Prolongation Visa B/2)",
      toolAsh6: "Générer le Formulaire Ash/6 (Dossier Conjoint 6 pages)",
      toolNespach: "Générer Nespach Alef (Affidavit 13 clauses)",
      toolAsh456: "Générer le Formulaire Ash/456 (Aliyah sur place)",
      toolSecCv: "Générer le CV Sécuritaire Nativ de 11 pages",
      toolMr14a: "Générer le Formulaire MR/14a (1re Teoudat Zehout Biométrique)",
      toolMr14b: "Générer le Formulaire MR/14b (Passeport Israélien)",
      toolRabbiLetters: "Studio de Lettres (Rabbin, Témoins & Communauté)",
      toolCouples300: "Lancer le Simulateur 300 Questions Couple sur 2 Téléphones",
      toolSongs56: "Ouvrir le Karaoké des 56 Chants de Chabbat & Prières",
      toolBeitDin700: "Lancer le Simulateur des 700 Questions du Beit Din",
      toolHealthFx: "Calculateurs Assurance Santé Pont (sans TZ) & Change ₪",
      toolConcierge: "Réserver un Audit Juridique / Rabbinique 1-on-1",
      guideApostille: "📘 Les 5 Documents Apostillés & la Règle des 180 Jours",
      guideGoBag: "📘 Guide Aliyah d'Urgence (Go-Bag) & Shinui Ma'amad",
      guideClerk: "📘 Décodeur de Lettre Misrad HaPanim & Formulaires Ash/1–Ash/3",
      guideVaadat: "📘 Guide Va'adat Charigim Conversion Touriste (Formulaire Ash/1)",
      guideSpousal: "📘 Guide Complet Visa Conjoint Israël (Nohal 5.2.0008 / 0009)",
      guideCouples300: "📘 Les 300 Questions d'Entretien Couple au Misrad HaPanim",
      guideBeitDin700: "📘 Les 700 Vraies Questions & Réponses du Beit Din",
      guideRabbiLetters: "📘 Guide du Rabbin Accompagnateur & Lettres pour le Beit Din",
      guidePrivateGiyur: "📘 Conversion Privée (Gush Etzion / Bnei Brak) & Ishour Giyour",
      guideOverseasGiyur: "📘 Aliyah après Conversion à l'Étranger & Ishour Giyour",
      guideDahan: "📘 Arrêt Dahan : Conversion Réformée/Massorti vs Rabbinat",
      guideNoLawyers: "📘 Réussir son Aliyah & Giyur sans Avocats Coûteux",
      guideSalKlita: "📘 Droits Aliyah, Piège des 24 Mois Sal Klita & Calculateur",
      guideGiyurFull: "📘 Guide Complet de la Conversion au Judaïsme en Israël",
      guideTouristB2: "📘 Survie Visa Touriste B/2 : Télétravail, Logement & Santé",
      guideCriminal: "📘 Casier Judiciaire & Réhabilitation pour Aliyah / Visa Conjoint",
      guideNewborn: "📘 Inscription Nouveau-Né sur le Sefach (Nohal 5.2.0004)"
    },
    es: {
      stepWord: "PASO",
      setDateHint: "Elige una fecha abajo para activar la cuenta regresiva",
      daysRemaining: "Quedan {n} días",
      expiredDaysAgo: "Venció hace {n} días",
      clockB2: "🛂 Reloj de 90 Días Visa de Turista (B/2)",
      clockApostille: "📜 Reloj de 180 Días Apostillas y Antecedentes",
      clockClerk30d: "⚡ Plazo Estricto 30 Días Hoja de Requerimientos",
      clockMikvah9mo: "🕍 Regla de 9 Meses en Comunidad Post-Mikve",
      clockSalKlita: "💰 Ventana de 24 Meses Beneficios Sal Klitá",
      toolScanDocs: "Escanear y Auditar mis Documentos (Escáner Inteligente)",
      toolCloudVault: "Abrir mi Bóveda de Documentos en la Nube (5 dispositivos)",
      toolNotary: "Reservar Traducción Notarial Israelí (Cinta Roja)",
      toolAsh1: "Estampar Formulario Ash/1 (Va'adat Jariguim PDF)",
      toolAsh3: "Estampar Formulario Ash/3 (Prórroga de Visa B/2)",
      toolAsh6: "Estampar Formulario Ash/6 (Expediente de Pareja 6 págs.)",
      toolNespach: "Estampar Nespach Alef (Declaración de 13 cláusulas)",
      toolAsh456: "Estampar Formulario Ash/456 (Aliyá en Israel PDF)",
      toolSecCv: "Estampar CV de Seguridad Nativ de 11 páginas",
      toolMr14a: "Estampar Formulario MR/14a (1ª Teudat Zehut Biométrica)",
      toolMr14b: "Estampar Formulario MR/14b (Pasaporte Israelí)",
      toolRabbiLetters: "Estudio de Cartas (Rabino, Testigos y Comunidad)",
      toolCouples300: "Iniciar Simulador de 300 Preguntas de Pareja en 2 Móviles",
      toolSongs56: "Abrir Karaoke de 56 Canciones de Shabat y Rezos",
      toolBeitDin700: "Iniciar Simulador de 700 Preguntas del Beit Din",
      toolHealthFx: "Calculadoras de Seguro Médico Puente (sin TZ) y Cambio ₪",
      toolConcierge: "Reservar Revisión Legal / Rabínica 1-a-1",
      guideApostille: "📘 Los 5 Documentos Apostillados y la Regla de 180 Días",
      guideGoBag: "📘 Guía de Aliyá de Emergencia (Go-Bag) y Shinui Ma'amad",
      guideClerk: "📘 Traductor de Cartas de Misrad HaPanim y Formularios Ash/1–Ash/3",
      guideVaadat: "📘 Guía de Va'adat Jariguim para Turistas (Formulario Ash/1)",
      guideSpousal: "📘 Guía Completa de Visa de Pareja en Israel (Nohal 5.2.0008 / 0009)",
      guideCouples300: "📘 Las 300 Preguntas de Entrevista de Pareja en Misrad HaPanim",
      guideBeitDin700: "📘 Las 700 Preguntas y Respuestas Reales del Beit Din",
      guideRabbiLetters: "📘 Guía de Rabino Patrocinador y Cartas para el Beit Din",
      guidePrivateGiyur: "📘 Conversión Privada (Gush Etzion / Bnei Brak) e Ishur Giyur",
      guideOverseasGiyur: "📘 Aliyá tras Conversión en el Extranjero e Ishur Giyur",
      guideDahan: "📘 Fallo Dahan: Conversión Reformista/Conservadora vs. Rabinato",
      guideNoLawyers: "📘 Cómo Hacer Aliyá y Conversión sin Abogados Costosos",
      guideSalKlita: "📘 Beneficios de Aliyá, Regla de 24 Meses Sal Klitá y Calculadora",
      guideGiyurFull: "📘 Guía Completa para Convertirse al Judaísmo en Israel",
      guideTouristB2: "📘 Supervivencia con Visa B/2: Trabajo Remoto, Alquiler y Salud",
      guideCriminal: "📘 Antecedentes Penales y Rehabilitación para Aliyá / Visa de Pareja",
      guideNewborn: "📘 Registro de Bebé Recién Nacido en el Sefach (Nohal 5.2.0004)"
    },
    de: {
      stepWord: "SCHRITT",
      setDateHint: "Datum unten wählen, um den Live-Countdown zu starten",
      daysRemaining: "Noch {n} Tage übrig",
      expiredDaysAgo: "Vor {n} Tagen abgelaufen",
      clockB2: "🛂 90-Tage B/2-Touristenvisum-Uhr",
      clockApostille: "📜 180-Tage-Uhr für Urkunden & Führungszeugnis",
      clockClerk30d: "⚡ 30-Tage-Frist Nachforderungsblatt (Daf Drishot)",
      clockMikvah9mo: "🕍 9-Monats-Gemeinderegel nach der Mikwe",
      clockSalKlita: "💰 24-Monate-Fenster für Sal-Klita-Leistungen",
      toolScanDocs: "Dokumente scannen & prüfen (Smart Scanner)",
      toolCloudVault: "Meinen Cloud-Dokumententresor öffnen (5 Geräte)",
      toolNotary: "Israelische Rotband-Notarübersetzung buchen",
      toolAsh1: "Formular Ash/1 stempeln (Va'adat Charigim PDF)",
      toolAsh3: "Formular Ash/3 stempeln (B/2-Visumverlängerung)",
      toolAsh6: "Formular Ash/6 stempeln (6-seitige Partner-Akte)",
      toolNespach: "Nespach Alef stempeln (13-Klausel-Affidavit)",
      toolAsh456: "Formular Ash/456 stempeln (Inlands-Alija PDF)",
      toolSecCv: "11-seitigen Nativ-Sicherheits-Lebenslauf stempeln",
      toolMr14a: "Formular MR/14a stempeln (1. Biometrische Teudat Zehut)",
      toolMr14b: "Formular MR/14b stempeln (Israelischer Reisepass)",
      toolRabbiLetters: "Brief-Generator (Rabbiner, Zeugen & Gemeinde)",
      toolCouples300: "300-Fragen Paar-Interview-Sync auf 2 Handys starten",
      toolSongs56: "Karaoke-Trainer für 56 Schabbat-Lieder & Gebete öffnen",
      toolBeitDin700: "700-Fragen Beit-Din-Prüfungssimulator starten",
      toolHealthFx: "Brücken-Krankenversicherung (ohne TZ) & ₪-Wechselkursrechner",
      toolConcierge: "1-zu-1 Rechts- / Rabbinats-Fallprüfung buchen",
      guideApostille: "📘 Die 5 Apostille-Urkunden & die 180-Tage-Frist",
      guideGoBag: "📘 Notfall-Alija (Go-Bag) & Shinui-Ma'amad-Leitfaden",
      guideClerk: "📘 Misrad-HaPanim-Briefübersetzer & Formulare Ash/1–Ash/3",
      guideVaadat: "📘 Va'adat-Charigim-Leitfaden für Touristen (Formular Ash/1)",
      guideSpousal: "📘 Kompletter Partner-Visum-Leitfaden Israel (Nohal 5.2.0008 / 0009)",
      guideCouples300: "📘 Die 300 Paar-Interview-Fragen im Misrad HaPanim",
      guideBeitDin700: "📘 Die 700 echten Beit-Din-Fragen & Antworten",
      guideRabbiLetters: "📘 Begleitrabbiner & Empfehlungsbriefe für das Beit Din",
      guidePrivateGiyur: "📘 Privater Giur (Gush Etzion / Bnei Brak) & Ishur Giyur",
      guideOverseasGiyur: "📘 Alija nach Auslands-Giur & Oberrabbinats-Ishur-Giyur",
      guideDahan: "📘 Dahan-Urteil: Reform-/Konservativer Giur vs. Oberrabbinat",
      guideNoLawyers: "📘 Alija & Giur in Israel ohne teure Anwälte meistern",
      guideSalKlita: "📘 Alija-Leistungen, 24-Monate-Sal-Klita-Regel & Kostenrechner",
      guideGiyurFull: "📘 Kompletter Leitfaden zur Konversion (Giur) in Israel",
      guideTouristB2: "📘 B/2-Touristenvisum: Fernarbeit, Wohnung & Krankenversicherung",
      guideCriminal: "📘 Führungszeugnis & Vorstrafen-Rehabilitation für Alija / Visum",
      guideNewborn: "📘 Neugeborenen-Registrierung im Sefach (Nohal 5.2.0004)"
    },
    ru: {
      stepWord: "ШАГ",
      setDateHint: "Выберите дату ниже для запуска обратного отсчёта",
      daysRemaining: "Осталось {n} дн.",
      expiredDaysAgo: "Истекло {n} дн. назад",
      clockB2: "🛂 Таймер 90 дней турвизы (B/2)",
      clockApostille: "📜 Таймер 180 дней для справок и апостилей",
      clockClerk30d: "⚡ Таймер 30 дней по листу требований МВД",
      clockMikvah9mo: "🕍 Правило 9 месяцев в общине после миквы",
      clockSalKlita: "💰 Окно 24 месяцев для выплат Корзины абсорбции",
      toolScanDocs: "Сканировать и проверить документы (Умный Сканер)",
      toolCloudVault: "Открыть облачное хранилище документов (до 5 устройств)",
      toolNotary: "Заказать перевод у израильского нотариуса (красная лента)",
      toolAsh1: "Заполнить анкету Аш/1 на иврите (Ваадат Харигим PDF)",
      toolAsh3: "Заполнить анкету Аш/3 на иврите (продление визы B/2)",
      toolAsh6: "Заполнить анкету Аш/6 (6 страниц для СТУПРО)",
      toolNespach: "Заполнить Неспах Алеф (декларация из 13 пунктов)",
      toolAsh456: "Заполнить анкету Аш/456 (репатриация внутри Израиля)",
      toolSecCv: "Заполнить 11-страничную анкету «Натива» (Корот Хаим)",
      toolMr14a: "Заполнить анкету МР/14а (первый биометрический Теудат-Зеут)",
      toolMr14b: "Заполнить анкету МР/14б (загранпаспорт Израиля)",
      toolRabbiLetters: "Генератор писем раввина, свидетелей и общины на иврите",
      toolCouples300: "Запустить синхронный тренажёр 300 вопросов МВД на 2 телефонах",
      toolSongs56: "Открыть караоке-тренажёр 56 субботних песен и молитв",
      toolBeitDin700: "Запустить симулятор 700 вопросов суда Бейт-Дина",
      toolHealthFx: "Калькуляторы медстраховки без ТЗ и перевода валюты в ₪",
      toolConcierge: "Заказать индивидуальный разбор дела (адвокат / раввин)",
      guideApostille: "📘 5 документов с апостилем и правило 180 дней",
      guideGoBag: "📘 Экстренная репатриация (Go-Bag) и смена статуса в Израиле",
      guideClerk: "📘 Перевод писем МВД Израиля и анкеты Аш/1–Аш/3",
      guideVaadat: "📘 Комиссия Ваадат Харигим для туристов (анкета Аш/1)",
      guideSpousal: "📘 Полное руководство по СТУПРО в Израиле (Ноаль 5.2.0008 / 0009)",
      guideCouples300: "📘 300 вопросов перекрёстного собеседования пар в МВД",
      guideBeitDin700: "📘 700 реальных вопросов и ответов суда Бейт-Дина",
      guideRabbiLetters: "📘 Сопровождающий раввин и рекомендательные письма в Бейт-Дин",
      guidePrivateGiyur: "📘 Частный гиюр (Гуш-Эцион / Бней-Брак) и Ишур Гиюр Раввината",
      guideOverseasGiyur: "📘 Репатриация после зарубежного гиюра и Ишур Гиюр",
      guideDahan: "📘 Решение Дахан: реформистский/консервативный гиюр и Раввинат",
      guideNoLawyers: "📘 Как пройти Алию, гиюр и СТУПРО без дорогих адвокатов",
      guideSalKlita: "📘 Льготы репатриантов, правило 24 месяцев Саль Клита и расчёт затрат",
      guideGiyurFull: "📘 Полный гид по прохождению гиюра в Израиле",
      guideTouristB2: "📘 Жизнь по турвизе B/2: удалённая работа, аренда жилья и страховка",
      guideCriminal: "📘 Справка о несудимости и погашение судимости для Алии и СТУПРО",
      guideNewborn: "📘 Регистрация новорождённого во вкладыше Сефах (Ноаль 5.2.0004)"
    }
  };

  const STEP_TIME_I18N_6L = {
    rejection_stop_14d_clock: { en: "⚡ Urgent 14-Day & 21-Day Clock", he: "⚡ שעון חירום 14 ו-21 יום", fr: "⚡ Délai Urgent 14 & 21 Jours", es: "⚡ Reloj Urgente 14 y 21 Días", de: "⚡ Dringende 14- & 21-Tage-Frist", ru: "⚡ Срочный срок 14 и 21 день" },
    rejection_diagnose_pivot: { en: "Track Pivot Strategy", he: "אסטרטגיית מעבר מסלול", fr: "Stratégie de Pivot Légal", es: "Estrategia de Giro Legal", de: "Strategie zum Spurwechsel", ru: "Стратегия смены маршрута" },
    em_gobag: { en: "Days 1–7", he: "ימים 1–7", fr: "Jours 1 à 7", es: "Días 1 al 7", de: "Tag 1–7", ru: "Дни 1–7" },
    docs_5_abroad: { en: "Preparation Abroad", he: "הכנה בחו״ל לפני טיסה", fr: "Préparation à l'Étranger", es: "Preparación en el Exterior", de: "Vorbereitung im Ausland", ru: "Подготовка до вылета" },
    docs_5_in_israel: { en: "90-Day & 180-Day Shield", he: "הגנת 90 ו-180 יום", fr: "Bouclier 90 & 180 Jours", es: "Escudo de 90 y 180 Días", de: "90- & 180-Tage-Schutz", ru: "Защита 90 и 180 дней" },
    judaism_proof_lineage_dossier: { en: "Lineage Proof • Nativ Ready", he: "הוכחת יהדות • מוכן לנתיב", fr: "Preuve de Judaïté • Nativ", es: "Prueba de Judaísmo • Nativ", de: "Judentumsnachweis • Nativ", ru: "Доказательство еврейства • Натив" },
    arrival_90d_clock_lock: { en: "90-Day Entry & 180-Day Lock", he: "נעילת שעון 90/180 יום", fr: "Verrouillage 90j / 180j", es: "Reloj de 90 / 180 Días", de: "90-Tage / 180-Tage Frist", ru: "Часы 90 / 180 дней" },
    aliyah_ash456_bypass: { en: "Skip 9–12 Mo JAFI Wait", he: "עקיפת 9–12 חודשי המתנה בסוכנות", fr: "Évite 9–12 Mois d'Attente JAFI", es: "Salta 9–12 Meses de Espera JAFI", de: "Spart 9–12 Monate JAFI-Wartezeit", ru: "Обход 9–12 мес. очереди Сохнута" },
    nativ_consular_eligibility_audit: { en: "Nativ / PIBA Eligibility Audit", he: "בדיקת זכאות בנתיב ומשרד הפנים", fr: "Audit d'Éligibilité Nativ / PIBA", es: "Auditoría de Elegibilidad Nativ / PIBA", de: "Nativ / PIBA Berechtigungsprüfung", ru: "Проверка «Натив» и МВД" },
    fsu_nativ_sec_cv: { en: "Nativ Verification", he: "אימות שורשים בנתיב", fr: "Vérification Nativ", es: "Verificación Nativ", de: "Nativ-Überprüfung", ru: "Проверка «Натив»" },
    overseas_9mo_ishur: { en: "9-Month Rule + Rabbanut", he: "חוק 9 החודשים + אישור רבנות", fr: "Règle des 9 Mois + Rabbinat", es: "Regla de 9 Meses + Rabinato", de: "9-Monats-Regel + Rabbinat", ru: "Правило 9 мес. + Раввинат" },
    spousal_ash6_filing: { en: "Nohal 5.2.0008 / 5.2.0009", he: "נוהל 5.2.0008 / 5.2.0009", fr: "Procédure 5.2.0008 / 5.2.0009", es: "Procedimiento 5.2.0008 / 5.2.0009", de: "Verfahren 5.2.0008 / 5.2.0009", ru: "Инструкция 5.2.0008 / 5.2.0009" },
    spousal_witness_letters: { en: "4–6 Israeli Witnesses", he: "4–6 מכתבי עדים ישראלים", fr: "4 à 6 Témoins Israéliens", es: "4–6 Testigos Israelíes", de: "4–6 Israelische Zeugen", ru: "4–6 израильских свидетелей" },
    clerk_30d_shield: { en: "⚡ 30-Day Strict Clock", he: "⚡ שעון קשיח של 30 יום", fr: "⚡ Délai Strict de 30 Jours", es: "⚡ Plazo Estricto de 30 Días", de: "⚡ Strikte 30-Tage-Frist", ru: "⚡ Жёсткий срок 30 дней" },
    spousal_300_interview: { en: "2-Phone Live Sync", he: "סינכרון חי ב-2 טלפונים", fr: "Sync Direct sur 2 Téléphones", es: "Sincronización en 2 Móviles", de: "Live-Sync auf 2 Handys", ru: "Синхронизация на 2 телефонах" },
    vaadat_charigim_ash1: { en: "Tourist → State Giyur", he: "תייר ← גיור ממלכתי", fr: "Touriste → Giour d'État", es: "Turista → Guiur Estatal", de: "Tourist → Staats-Giur", ru: "Турист → Гос. гиюр" },
    rabbi_kallah_letters: { en: "5–8 Shul & Rabbi Letters", he: "5–8 מכתבי רב וקהילה", fr: "5 à 8 Lettres Communautaires", es: "5–8 Cartas Comunitarias", de: "5–8 Gemeinde- & Rabbinerbriefe", ru: "5–8 писем раввина и общины" },
    songs_shabbat_fluency: { en: "56 Dual-Nusach Tracks", he: "56 שירי שבת ותפילות", fr: "56 Chants & Prières Audio", es: "56 Canciones y Rezos Audio", de: "56 Schabbat-Lieder & Gebete", ru: "56 субботних песен и молитв" },
    beit_din_700_exam: { en: "700 Real Tribunal Qs", he: "700 שאלות בית הדין", fr: "700 Questions du Beit Din", es: "700 Preguntas del Beit Din", de: "700 Beit-Din-Prüfungsfragen", ru: "700 вопросов суда Бейт-Дина" },
    private_ishur_giyur: { en: "Rabbanut Registration", he: "רישום ואישור ברבנות הראשית", fr: "Validation au Grand Rabbinat", es: "Registro en el Gran Rabinato", de: "Registrierung beim Oberrabbinat", ru: "Регистрация в Главном раввинате" },
    tz_mr14_final: { en: "Final Milestone 🎉", he: "אבן הדרך הסופית 🎉", fr: "Étape Finale 🎉", es: "Meta Final 🎉", de: "Abschluss-Meilenstein 🎉", ru: "Финальный этап 🎉" }
  };

  // Universal 6-language localized blueprint & pitfalls generator for any step when l !== 'en'
  const STEP_BODY_I18N_6L = {
    he: {
      bp1: "פתחו את הכלים האינטראקטיביים למעלה כדי להפיק את הטפסים הרשמיים בעברית ולבדוק את המסמכים שלכם בסורק החכם לפני ההגשה.",
      bp2: "וודאו שכל מסמך מקור מחו״ל נושא חותמת אפוסטיל תקפה (בתוך חלון 180 הימים) ושכל השמות והתאריכים תואמים במדויק לדרכון.",
      bp3: "עדכנו את תאריך העוגן בשעון הספירה לאחור בראש לשונית המעקב וסמנו שלב זה כהושלם לאחר ביצועו.",
      pf1: "הגשת טפסים באנגלית או ללא חתימה וחותמת תקנית גורמת לדחיית הבקשה על הסף בדלפק משרד הפנים או בית הדין.",
      pf2: "איחור במועדי ההגשה (30 יום לדף דרישות, 90 יום לאשרת תייר, 180 יום לתעודת יושר) עלול להוביל לסגירת תיק מנהלית."
    },
    fr: {
      bp1: "Utilisez les outils interactifs ci-dessus pour générer vos formulaires officiels en hébreu et auditer vos pièces au Scanner Intelligent avant le dépôt.",
      bp2: "Vérifiez que chaque acte original étranger comporte une Apostille valide (moins de 180 jours) et que l'orthographe des noms correspond exactement au passeport.",
      bp3: "Enregistrez votre date de référence dans le compte à rebours en haut de l'onglet Suivi et cochez cette étape une fois terminée.",
      pf1: "Déposer des formulaires remplis en français/anglais ou incomplets entraîne un rejet immédiat au guichet du Misrad HaPanim.",
      pf2: "Dépasser les délais légaux (30 jours pour une fiche d'exigences, 90 jours pour le visa B/2, 180 jours pour les apostilles) bloque votre dossier."
    },
    es: {
      bp1: "Usa las herramientas interactivas de arriba para estampar tus formularios oficiales en hebreo y auditar tus documentos en el Escáner Inteligente antes de presentar.",
      bp2: "Confirma que cada partida original extranjera tenga Apostilla vigente (dentro de los 180 días) y que los nombres coincidan exactamente con tu pasaporte.",
      bp3: "Configura tu fecha base en el reloj de cuenta regresiva en la pestaña Seguimiento y marca este paso como completado al terminar.",
      pf1: "Presentar formularios en español/inglés o sin formato oficial en hebreo provoca el rechazo inmediato en la ventanilla de Misrad HaPanim.",
      pf2: "Dejar vencer los plazos estrictos (30 días de requerimientos, 90 días de visa B/2, 180 días de apostillas) congela el expediente."
    },
    de: {
      bp1: "Nutzen Sie die interaktiven Tools oben, um Ihre offiziellen hebräischen Formulare zu stempeln und Ihre Urkunden vorab im Smart Scanner zu prüfen.",
      bp2: "Stellen Sie sicher, dass jede Auslandsurkunde eine gültige Apostille (unter 180 Tagen) trägt und alle Namen exakt mit dem Reisepass übereinstimmen.",
      bp3: "Tragen Sie Ihr Referenzdatum oben im Fristen-Tracker ein und markieren Sie diesen Schritt nach Abschluss als erledigt.",
      pf1: "Handschriftlich auf Deutsch/Englisch ausgefüllte oder unvollständige Anträge werden am Schalter des Misrad HaPanim sofort abgewiesen.",
      pf2: "Das Überschreiten gesetzlicher Fristen (30 Tage Nachforderung, 90 Tage B/2-Visum, 180 Tage Apostille) führt zur Aktenschließung."
    },
    ru: {
      bp1: "Используйте интерактивные инструменты выше, чтобы заполнить официальные бланки на иврите и проверить документы через Умный Сканер перед подачей.",
      bp2: "Убедитесь, что каждый оригинал документа имеет действующий апостиль (не старше 180 дней), а написание всех имён 1:1 совпадает с загранпаспортом.",
      bp3: "Укажите опорную дату в таймере обратного отсчёта вверху вкладки «Трекер» и отметьте этот шаг выполненным после завершения.",
      pf1: "Подача анкет на английском/русском языке или без точной ивритской разметки приводит к мгновенному отказу в окне МВД.",
      pf2: "Нарушение жёстких сроков (30 дней по листу требований, 90 дней турвизы B/2, 180 дней годности справок) ведёт к закрытию дела."
    }
  };

  function localizeToolLabel(href, action, fallbackLbl, l) {
    const tk = window.GAT_TRACKER_I18N_6L[l] || window.GAT_TRACKER_I18N_6L.en;
    if (l === "en") return fallbackLbl;
    const h = String(href || "");
    if (action === "profile") return tk.toolCloudVault;
    if (action === "tab2") return tk.toolHealthFx;
    if (h.indexOf("concierge-booking") !== -1) return tk.toolConcierge;
    if (h.indexOf("form=ash1") !== -1) return tk.toolAsh1;
    if (h.indexOf("form=ash3") !== -1) return tk.toolAsh3;
    if (h.indexOf("form=ash6") !== -1) return tk.toolAsh6;
    if (h.indexOf("form=nespach_alef") !== -1) return tk.toolNespach;
    if (h.indexOf("form=ash456") !== -1) return tk.toolAsh456;
    if (h.indexOf("form=sec_cv") !== -1) return tk.toolSecCv;
    if (h.indexOf("form=mr14a") !== -1) return tk.toolMr14a;
    if (h.indexOf("form=mr14b") !== -1) return tk.toolMr14b;
    if (h.indexOf("module=rabbi-letters") !== -1) return tk.toolRabbiLetters;
    if (h.indexOf("module=couples-sync") !== -1) return tk.toolCouples300;
    if (h.indexOf("module=songs-prayers") !== -1) return tk.toolSongs56;
    if (h.indexOf("module=beit-din-150") !== -1) return tk.toolBeitDin700;
    return tk.toolScanDocs;
  }

  function localizeGuideLabel(slug, fallbackLbl, l) {
    const tk = window.GAT_TRACKER_I18N_6L[l] || window.GAT_TRACKER_I18N_6L.en;
    if (l === "en") return fallbackLbl;
    const map = {
      "apostille-180-day-clock-fbi-police-check-israel": tk.guideApostille,
      "emergency-aliyah-go-bag-shinui-maamad": tk.guideGoBag,
      "hebrew-clerk-letter-translator-form-ash1-ash3": tk.guideClerk,
      "vaadat-charigim-tourist-conversion-israel": tk.guideVaadat,
      "misrad-hapanim-spousal-visa-nohal-5-2-0008": tk.guideSpousal,
      "misrad-hapanim-couples-interview-questions": tk.guideCouples300,
      "beit-din-conversion-questions-israel": tk.guideBeitDin700,
      "israeli-rabbi-community-letters-beit-din": tk.guideRabbiLetters,
      "gush-etzion-private-conversion-aliyah": tk.guidePrivateGiyur,
      "overseas-conversion-aliyah-ishur-giyur": tk.guideOverseasGiyur,
      "dahan-ruling-non-orthodox-conversion-aliyah-truth": tk.guideDahan,
      "how-to-make-aliyah-and-giyur-israel-without-lawyers": tk.guideNoLawyers,
      "aliyah-benefits-sal-klita-24-month-rule-cost-calculator": tk.guideSalKlita,
      "how-to-convert-to-judaism-in-israel-giyur-guide": tk.guideGiyurFull,
      "tourist-visa-israel-remote-work-housing-giyur": tk.guideTouristB2,
      "aliyah-spousal-visa-criminal-record-rehabilitation": tk.guideCriminal,
      "newborn-baby-teudat-zehut-sefach-registration-israel": tk.guideNewborn
    };
    return map[slug] || fallbackLbl;
  }

  function buildExtraStepsForLang(l) {
    return {
      judaism_proof_lineage_dossier: {
        time: (STEP_TIME_I18N_6L.judaism_proof_lineage_dossier[l] || STEP_TIME_I18N_6L.judaism_proof_lineage_dossier.en),
        title: {
          en: "Secure Recognized Proof-of-Judaism Letter & Maternal Lineage Dossier",
          he: "השגת מכתב הוכחת יהדות מוכר ותיק מסמכי שורשים (מצד האם)",
          fr: "Obtenir l'Attestation de Judaïté Reconnue & le Dossier de Lignée Maternelle",
          es: "Obtener Certificado de Judaísmo Reconocido y Dossier de Linaje Materno",
          de: "Anerkannten Judentumsnachweis & Mütterliches Abstammungs-Dossier sichern",
          ru: "Собрать пакет доказательств еврейства по материнской линии для «Натива»"
        },
        sub: {
          en: "Misrad HaPanim and Nativ reject generic synagogue membership letters. Your letter must explicitly certify maternal Jewish lineage backed by parents'/grandparents' civil and ketubah records.",
          he: "משרד הפנים ולשכת הקשר 'נתיב' דוחים מכתבי חברות כלליים מבית כנסת. האישור חייב לפרט יהדות מלידה בצירוף כתובה ומסמכי מקור.",
          fr: "Le Misrad HaPanim et Nativ rejettent les simples attestations synagogales. L'attestation rabbinique doit certifier la lignée maternelle avec Ketouba et actes originaux.",
          es: "Misrad HaPanim y Nativ rechazan cartas genéricas de membresía. El certificado rabínico debe acreditar el linaje judío materno respaldado por Ketubá y partidas originales.",
          de: "Misrad HaPanim und Nativ lehnen einfache Gemeindebriefe ab. Das Rabbinatsschreiben muss die mütterliche jüdische Abstammung samt Ketubba und Originalurkunden bestätigen.",
          ru: "МВД и «Натив» не принимают общие справки из синагоги. Требуется цепочка оригинальных свидетельств по материнской линии или официальное раввинское подтверждение."
        },
        blueprint: [
          "Obtain an official signed letter on letterhead from an Orthodox or JAFI/Nativ-recognized community rabbi certifying your Jewish status by birth (naming parents and maternal grandmother) or conversion.",
          "Attach original supporting lineage evidence: parents' Ketubah, Jewish cemetery/burial records, or family civil certificates linking you unbroken to your Jewish mother/grandmother.",
          "Run your Proof-of-Judaism letter through the Smart Document Scanner in the App to verify mandatory Nativ wording before flying or filing."
        ],
        pitfalls: [
          "Generic 'member in good standing' synagogue letters without explicit maternal lineage details are rejected by Misrad HaPanim and Nativ.",
          "Photocopies of family birth certificates without wet-ink originals or archival certifications trigger multi-month Nativ holds."
        ],
        tools: [
          { icon: "📸", label: "Audit Proof-of-Judaism Letter in Smart Scanner", href: appUrl("hebrew-engine", "", l) },
          { icon: "✍️", label: "Rabbi Lineage & Proof Letter Builder", href: appUrl("rabbi-letters", "", l) }
        ],
        guides: [
          ["📘 How to Make Aliyah Without Lawyers or 12-Month Queues", "how-to-make-aliyah-and-giyur-israel-without-lawyers"],
          ["📘 5 Apostilled Docs & Civil Proof Rules", "apostille-180-day-clock-fbi-police-check-israel"]
        ]
      },
      arrival_90d_clock_lock: {
        time: (STEP_TIME_I18N_6L.arrival_90d_clock_lock[l] || STEP_TIME_I18N_6L.arrival_90d_clock_lock.en),
        title: {
          en: "Enter Israel & Lock Your 90-Day B/2 Visa & 180-Day Apostille Clock",
          he: "כניסה לישראל ונעילת שעון 90 ימי אשרת B/2 ו-180 ימי האפוסטיל",
          fr: "Entrer en Israël & Verrouiller l'Horloge Visa B/2 (90j) et Apostilles (180j)",
          es: "Entrar a Israel y Asegurar el Reloj de 90 Días (B/2) y 180 Días de Apostilla",
          de: "Einreise nach Israel & Sicherung der 90-Tage-Visum- und 180-Tage-Apostillenfrist",
          ru: "Въезд в Израиль и контроль таймера 90 дней визы B/2 и 180 дней апостилей"
        },
        sub: {
          en: "Your foreign police and marital status certificates expire 180 days from issuance, and your B/2 entry slip runs for 90 days. Filing before Day 60 prevents document expiration.",
          he: "תעודות יושר ומצב אישי מחו״ל פגות תוקף 180 יום מהנפקתן, ואשרת התייר B/2 תקפה ל-90 יום. הגשת הבקשה לפני היום ה-60 מונעת פסילת תעודות.",
          fr: "Vos casiers judiciaires et certificats de célibat expirent 180 jours après émission, et votre visa B/2 dure 90 jours. Déposer avant le 60e jour évite toute expiration.",
          es: "Tus antecedentes penales y certificados civiles vencen a los 180 días de emitidos, y la visa B/2 dura 90 días. Presentar antes del día 60 evita vencimientos.",
          de: "Führungszeugnisse und Personenstandsurkunden verfallen nach 180 Tagen, das B/2-Visum gilt 90 Tage. Eine Einreichung vor Tag 60 verhindert Dokumentenverfall.",
          ru: "Справки о несудимости и семейном положении сгорают через 180 дней с даты выдачи, а турвиза B/2 действует 90 дней. Подача до 60-го дня защищает от просрочки."
        },
        blueprint: [
          "Keep your blue/white Ben Gurion Border Control entry slip safe—Misrad HaPanim requires it at your status-change intake.",
          "Set your arrival date and Apostille issue date in the Live Countdown Clocks at the top of the Tracker tab so you never cross Day 60 or Day 180.",
          "Prepare your local Israeli address proof (lease or host declaration Form Ash/6 / Ash/3) for your regional Misrad HaPanim branch."
        ],
        pitfalls: [
          "Letting a police check cross 180 days by even 1 day before your PIBA intake forces you to order a brand-new federal check + Apostille.",
          "Losing your Ben Gurion B/2 entry slip delays intake at regional Misrad HaPanim branches."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/3 (B/2 Visa Extension Shield)", href: appUrl("hebrew-engine", "ash3", l) },
          { icon: "🏥", label: "60–90 Day Bridge Health & ₪ FX Calculators", action: "tab2" }
        ],
        guides: [
          ["📘 B/2 Tourist Survival: Remote Work, Rent & Health Shield", "tourist-visa-israel-remote-work-housing-giyur"],
          ["📘 The 5 Apostilled Docs & 180-Day Freshness Rule", "apostille-180-day-clock-fbi-police-check-israel"]
        ]
      },
      nativ_consular_eligibility_audit: {
        time: (STEP_TIME_I18N_6L.nativ_consular_eligibility_audit[l] || STEP_TIME_I18N_6L.nativ_consular_eligibility_audit.en),
        title: {
          en: "Pass Nativ & Misrad HaPanim Law of Return Eligibility Verification",
          he: "מעבר בדיקת זכאות חוק השבות ב'נתיב' ובמשרד הפנים",
          fr: "Valider l'Audit d'Éligibilité Loi du Retour (Nativ & Misrad HaPanim)",
          es: "Aprobar la Verificación de Elegibilidad de Ley de Retorno (Nativ / PIBA)",
          de: "Nativ & Misrad HaPanim Rückkehrgesetz-Berechtigungsprüfung bestehen",
          ru: "Пройти консульскую проверку «Натива» и аудит МВД по Закону о возвращении"
        },
        sub: {
          en: "Every in-Israel Aliyah (Ash/456) and consular file undergoes a forensic Nativ/PIBA lineage and background audit. Arriving with wet-ink originals and pre-stamped Hebrew affidavits prevents multi-month deferrals.",
          he: "כל תיק עלייה מהארץ (אש/456) או מחו״ל עובר בדיקת מסמכים קפדנית של 'נתיב' ומשרד הפנים. הגעה עם תעודות מקוריות ותצהירי שמות בעברית מונעת דחיות.",
          fr: "Tout dossier d'Aliyah sur place (Ash/456) passe par l'audit documentaire de Nativ. Présenter des originaux apostillés et des déclarations d'orthographe évite des mois d'ajournement.",
          es: "Todo expediente de Aliyá en Israel (Ash/456) pasa por la auditoría forense de Nativ. Llegar con originales apostillados y declaraciones juradas en hebreo evita demoras.",
          de: "Jeder Inlands-Alija-Antrag (Ash/456) wird von Nativ und PIBA forensisch geprüft. Originalurkunden mit Apostille und hebräische Namenserklärungen verhindern Rückstellungen.",
          ru: "Каждое дело о смене статуса в Израиле (Ash/456) проходит проверку консула «Натива». Полный комплект оригиналов с апостилем и декларациями на иврите защищает от повторных вызовов."
        },
        blueprint: [
          "Bring every wet-ink Apostilled civil certificate (never laminated) plus 2 full color photocopy sets organized in chronological family order.",
          "Ensure all name spellings across foreign birth certificates, marriage records, and passports match 1:1—or prepare a formal Hebrew affidavit.",
          "Complete your Nativ / PIBA eligibility verification to unlock immediate Teudat Oleh and Biometric Teudat Zehut issuance."
        ],
        pitfalls: [
          "Laminating any original birth or marriage certificate voids the security seal in the eyes of Nativ and Misrad HaPanim.",
          "Unexplained middle-name or surname spelling differences across generations without a notarized One-and-the-Same affidavit stall approval."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/456 & Hebrew Declarations", href: appUrl("hebrew-engine", "ash456", l) },
          { icon: "🤝", label: "Book 1-on-1 Case Audit Before Nativ Interview", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 How to Make Aliyah Without Lawyers or 12-Month Queues", "how-to-make-aliyah-and-giyur-israel-without-lawyers"],
          ["📘 Past Arrest / Criminal Record Rehabilitation Guide", "aliyah-spousal-visa-criminal-record-rehabilitation"]
        ]
      }
    };
  }

  function enrichBlueprintStepIds(bp) {
    if (!bp || !Array.isArray(bp.stepIds)) return bp;
    const sids = bp.stepIds.slice();
    if (sids.indexOf("aliyah_ash456_bypass") !== -1 || sids.indexOf("aliyah_jafi_consular") !== -1) {
      const target = sids.indexOf("aliyah_ash456_bypass") !== -1 ? "aliyah_ash456_bypass" : "aliyah_jafi_consular";
      const out = [];
      sids.forEach(function(id) {
        if (id === target) {
          if (out.indexOf("judaism_proof_lineage_dossier") === -1) out.push("judaism_proof_lineage_dossier");
          if (out.indexOf("arrival_90d_clock_lock") === -1) out.push("arrival_90d_clock_lock");
          out.push(id);
          if (out.indexOf("nativ_consular_eligibility_audit") === -1) out.push("nativ_consular_eligibility_audit");
        } else {
          out.push(id);
        }
      });
      bp.stepIds = out.filter(function(item, pos) { return out.indexOf(item) === pos; });
    }
    return bp;
  }

  function getStepCatalog(l, bp) {
    const lang = l || (typeof getLang === "function" ? getLang() : "en");
    const base = _origGetStepCatalog(lang, bp) || {};
    const extra = buildExtraStepsForLang(lang);
    Object.keys(extra).forEach(function(k) { base[k] = extra[k]; });

    // Localize time, blueprint, pitfalls, tools & guides across all 18 steps when lang !== 'en'
    Object.keys(base).forEach(function(stepKey) {
      const st = base[stepKey];
      if (!st) return;
      if (STEP_TIME_I18N_6L[stepKey]) {
        st.time = STEP_TIME_I18N_6L[stepKey][lang] || STEP_TIME_I18N_6L[stepKey].en;
      }
      if (lang !== "en") {
        const sb = STEP_BODY_I18N_6L[lang];
        const locSub = (st.sub && (st.sub[lang] || st.sub.en)) ? (st.sub[lang] || st.sub.en) : "";
        if (sb) {
          st.blueprint = [locSub, sb.bp1, sb.bp2, sb.bp3].filter(Boolean);
          st.pitfalls = [sb.pf1, sb.pf2];
        }
        if (Array.isArray(st.tools)) {
          st.tools = st.tools.map(function(tl) {
            return Object.assign({}, tl, {
              label: localizeToolLabel(tl.href, tl.action, tl.label, lang)
            });
          });
        }
        if (Array.isArray(st.guides)) {
          st.guides = st.guides.map(function(g) {
            return [localizeGuideLabel(g[1], g[0], lang), g[1]];
          });
        }
      }
    });
    return base;
  }

  function buildBlueprintFromAnswers(ans, isEmergency, prevBp) {
    const bp = _origBuildBlueprintFromAnswers(ans, isEmergency, prevBp);
    return enrichBlueprintStepIds(bp);
  }
  // === GAT 7-STEP ENRICHMENT & 6-LANGUAGE MILESTONE CATALOG WRAPPER END ===

  function _origGetStepCatalog(l, bp) {
    const hasKids = Boolean(bp && bp.hasChildrenUnder18);
    const isUnmarriedSpouse = Boolean(bp && bp.answers && bp.answers.q2b_partner_status === "israeli_unmarried");

    // Concise, high-signal 6-language step titles & summaries + deep blueprint arrays
    const S = {

      rejection_stop_14d_clock: {
        time: "⚡ Urgent 14-Day & 21-Day Clock",
        title: {
          en: "1. Freeze the 14-Day Departure Order & Audit Your Refusal Letter",
          he: "1. עצירת שעון 14 הימים ופענוח מכתב הסירוב הרשמי (נוהל 1.6.0001)",
          fr: "1. Bloquer l'ordre de départ de 14 jours & analyser la lettre de refus",
          es: "1. Frenar la orden de salida de 14 días y auditar la carta de rechazo",
          de: "1. 14-Tage-Ausreisefrist stoppen & Ablehnungsschreiben prüfen",
          ru: "1. Остановить 14-дневный срок выезда и расшифровать письмо об отказе"
        },
        sub: {
          en: "Under PIBA Nohal 1.6.0001, you have 21 days to file a formal written internal appeal before a refusal becomes final.",
          he: "לפי נוהל משרד הפנים 1.6.0001 עומדים לרשותכם 21 יום להגשת ערעור פנימי מנומק בכתב.",
          fr: "Selon le Nohal 1.6.0001, vous disposez de 21 jours pour déposer un recours interne écrit.",
          es: "Bajo el Nohal 1.6.0001 tienes 21 días para presentar una apelación interna formal por escrito.",
          de: "Nach PIBA Nohal 1.6.0001 haben Sie 21 Tage Zeit für einen formellen schriftlichen Einspruch.",
          ru: "По инструкции МВД Ноаль 1.6.0001 у вас есть 21 день на подачу письменной внутренней апелляции."
        },
        blueprint: [
          "Snap your Hebrew refusal sheet (`מכתב סירוב`) in the Smart Scanner immediately to identify the exact statutory clause cited by the clerk or Va'adat Charigim.",
          "Never overstay past the written deadline without a stamped appeal receipt—unlawful overstay triggers a multi-year Ben Gurion border ban.",
          "File a formal Hebrew Request for Reconsideration (`בקשה לעיון מחדש / ערר פנימי`) under Nohal 1.6.0001 within 21 days to keep your file legally alive."
        ],
        pitfalls: [
          "Arguing verbally at the Misrad HaPanim window does not stop the 14-day departure clock—only a stamped written filing counts.",
          "Leaving Israel in panic without getting a copy of your physical PIBA file makes it much harder to appeal from abroad."
        ],
        tools: [
          { icon: "📸", label: "Scan & Decode My Hebrew Rejection Letter", href: appUrl("hebrew-engine", "", l) },
          { icon: "⚖️", label: "Urgent Lawyer Appeal & Escort Desk ($0 Quote)", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Misrad HaPanim Clerk Letter Decoder & Appeal Guide", "hebrew-clerk-letter-translator-form-ash1-ash3"],
          ["📘 Va'adat Charigim Tourist & B/1 Visa Exceptions Guide", "vaadat-charigim-tourist-conversion-israel"]
        ]
      },

      rejection_diagnose_pivot: {
        time: "Track Pivot Strategy",
        title: {
          en: "2. Fix the Root Rejection Cause or Pivot to a Protected Legal Track",
          he: "2. תיקון עילת הסירוב או מעבר למסלול חוקי מוגן (סעיף ג.10 / חוק השבות)",
          fr: "2. Corriger le motif du refus ou bifurquer vers une voie légale protégée",
          es: "2. Corregir la causa del rechazo o girar a una vía legal protegida",
          de: "2. Ablehnungsgrund beheben oder auf geschützten Rechtsweg wechseln",
          ru: "2. Устранить причину отказа или перейти на защищённый законный трек"
        },
        sub: {
          en: "Overcome B/1 foreign-labor or B/2 tourist presumptions with an Israeli partner anchor, rabbinic letters, or clean consular re-entry.",
          he: "התגברות על חזקת ׳עקיפת חוקי ההגירה׳ באמצעות עיגון זוגי, מכתבי רב מלווה מוכר או השלמת אפוסטיל.",
          fr: "Surmontez la présomption de contournement migratoire grâce à un ancrage conjoint ou rabbinique.",
          es: "Supera la presunción migratoria mediante anclaje con pareja israelí o respaldo rabínico formal.",
          de: "Überwinden Sie den Verdacht der Einwanderungsumgehung durch Partner-Anker oder Rabbinatsbürgschaft.",
          ru: "Преодолейте подозрения МВД через партнёрский трек СТУПРО, поручительство раввина или донос апостилей."
        },
        blueprint: [
          "IF YOU HAVE AN ISRAELI PARTNER: Pivot immediately to Nohal 5.2.0008 / 5.2.0009 (Form Ash/6 + Nespach Alef). Under Sec. ג.10, a spousal file legally protects your stay and lets you run State Rabbanut Conversion simultaneously!",
          "IF REJECTED ON A B/1 WORK VISA OR B/2 TOURIST VISA: Rebut the 'immigration bypass' presumption by attaching a recognized Israeli Sponsoring Rabbi (`רב מלווה`) attestation, Host Family (`משפחה מלווה`) guarantee with 9-digit TZ numbers, proof of foreign savings, and all 5 double-Apostilled homeland documents.",
          "IF YOUR VISA ALREADY EXPIRED: Depart cleanly before a deportation order attaches, pull any missing double-Apostilled civil documents in person at home in 7 days, and re-apply through an approved student/Masa or consular track."
        ],
        pitfalls: [
          "Re-submitting the exact same Form Ash/1 without new rabbinic letters or legal representation results in an automatic second rejection.",
          "Switching to an unrecognized private court while under a Misrad HaPanim departure order gives zero visa protection."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/1 (Rebuttal) or Ash/6 (Spousal Pivot)", href: appUrl("hebrew-engine", "ash1", l) },
          { icon: "✍️", label: "Generate Sponsoring Rabbi & Host Family Letters", href: appUrl("rabbi-letters", "", l) },
          { icon: "🤝", label: "Book 1-Hr Licensed Immigration Lawyer Review", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Va'adat Charigim (Form Ash/1) Full Playbook", "vaadat-charigim-tourist-conversion-israel"],
          ["📘 Nohal 5.2.0008 Spousal Visa & Sec. ג.10 Dual-Track Guide", "misrad-hapanim-spousal-visa-nohal-5-2-0008"]
        ]
      },

      em_gobag: {
        time: "Days 1–7",
        title: {
          en: "Pull Your 7-Day Pre-Flight 'Go-Bag' Civil Originals",
          he: "איסוף תיק חירום ('Go-Bag') של 5 מסמכי מקור ב-7 ימים",
          fr: "Réunir votre dossier 'Go-Bag' (5 originaux apostillés en 7 jours)",
          es: "Reunir tu carpeta 'Go-Bag' (5 originales apostillados en 7 días)",
          de: "7-Tage 'Go-Bag': Alle 5 Originalurkunden mit Apostille sichern",
          ru: "Сбор тревожной папки ('Go-Bag'): 5 оригиналов с апостилем за 7 дней"
        },
        sub: {
          en: "Never board without Long-Form Birth, Single/Marriage Cert, & Federal Police Check + Apostilles.",
          he: "לא עולים למטוס בלי תעודת לידה מורחבת, תמצית מצב אישי ותעודת יושר פדרלית + אפוסטיל.",
          fr: "Ne montez pas à bord sans acte intégral, célibat/mariage et casier judiciaire apostillés.",
          es: "No abordes sin partida literal, soltería/matrimonio y antecedentes apostillados.",
          de: "Fliegen Sie nicht ohne vollständige Geburtsurkunde, Familienstand & Führungszeugnis + Apostille.",
          ru: "Не вылетайте без полного свидетельства о рождении, браке/незамужестве и справки о несудимости с апостилем."
        },
        blueprint: [
          "Order 2 physical originals of your Long-Form Birth Certificate (showing both parents' names and hospital/city).",
          "Pull your Single Status Affidavit (or Marriage/Divorce decrees) + Federal/National Police Check (FBI / ACRO / RCMP / BKA / Ministry).",
          "Stamp every civil document AND its separate Apostille sheet before boarding—ordering remotely from Israel takes 4–8 months." + (hasKids ? " Include unabridged Long-Form Birth Certificates + notarized travel/status consent for every child under 18." : ""),
          "Upload clear scans into your Cloud Document Vault immediately so our Smart Scanner verifies zero missing stamps before takeoff."
        ],
        pitfalls: [
          "Short-form or wallet birth certificates are 100% rejected by Misrad HaPanim.",
          "State/local sheriff checks fail in Israel—US applicants MUST have an FBI Identity History Summary with US Dept. of State Federal Apostille.",
          "Police & single-status certificates expire strictly at 180 days from issue date."
        ],
        tools: [
          { icon: "📸", label: "Scan & Audit My Go-Bag Docs", href: appUrl("hebrew-engine", "", l) },
          { icon: "☁️", label: "Open My Cloud Document Vault", action: "profile" },
          { icon: "🤝", label: "Urgent Red-Ribbon Notary Desk", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Emergency Aliyah Go-Bag & Shinui Ma'amad Guide", "emergency-aliyah-go-bag-shinui-maamad"],
          ["📘 5 Apostilled Docs & 180-Day Clock Rules", "apostille-180-day-clock-fbi-police-check-israel"]
        ]
      },

      docs_5_abroad: {
        time: "Step 1 • Abroad",
        title: {
          en: "Pull & Apostille All 5 Home-Country Civil Docs in Person",
          he: "הוצאת 5 מסמכי המקור והאפוסטיל במדינת המוצא לפני הטיסה",
          fr: "Obtenir et apostiller les 5 actes d'état civil avant le départ",
          es: "Obtener y apostillar los 5 documentos civiles antes de viajar",
          de: "Alle 5 Zivilurkunden vor Abflug persönlich mit Apostille einholen",
          ru: "Лично получить и апостилировать все 5 гражданских документов до вылета"
        },
        sub: {
          en: "Pulling originals while abroad saves 4–6 months of remote embassy delays and keeps your 180-day clock fresh.",
          he: "איסוף המסמכים בחו״ל חוסך 4–6 חודשי עיכובים ומבטיח תוקף מלא של 180 יום.",
          fr: "Réunir vos originaux sur place économise 4 à 6 mois d'attente consulaire.",
          es: "Sacar los originales en persona ahorra 4–6 meses de demoras consulares.",
          de: "Urkunden persönlich vor Ort zu holen spart 4–6 Monate Auslandsbürokratie.",
          ru: "Личное получение оригиналов экономит 4–6 месяцев ожидания и сохраняет окно 180 дней."
        },
        blueprint: [
          "Collect: (1) Long-Form Birth Certificate, (2) Single Status / Marital Status Certificate, (3) Prior Marriage/Divorce Decrees (if any), (4) Name Change Certificates (if any), and (5) National/Federal Police Certificate for every country lived in since age 18.",
          "Affix the Hague Apostille (or Israeli Embassy consular chain for non-Hague countries like Canada pre-2024).",
          hasKids ? "FOR CHILDREN UNDER 18: Pull unabridged Long-Form Birth Certificates + Apostilles for each child and notarized dual-parent consent if applicable." : "Time your Police & Single-Status certificates within 30–45 days of your flight so you land in Israel with 135+ days left on the 180-day clock.",
          "Run each page through our Smart Document Scanner to verify Apostille seals and auto-fill your Hebrew PIBA forms."
        ],
        pitfalls: [
          "Never detach staples from an Apostille packet—Israeli clerks immediately void unstapled Apostilles.",
          "Any past arrest, expunged charge, or DUI must be disclosed honestly alongside court disposition papers."
        ],
        tools: [
          { icon: "📸", label: "Verify My 5 Docs & Apostilles (Smart Scan)", href: appUrl("hebrew-engine", "", l) },
          { icon: "☁️", label: "Upload to 5-Device Cloud Vault", action: "profile" },
          { icon: "🤝", label: "Book Israeli Red-Ribbon Notary Translation", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 The 5 Apostilled Docs & 180-Day Freshness Rule", "apostille-180-day-clock-fbi-police-check-israel"],
          ["📘 Past Arrest / Criminal Record Rehabilitation Guide", "aliyah-spousal-visa-criminal-record-rehabilitation"]
        ]
      },

      docs_5_in_israel: {
        time: "90-Day & 180-Day Shield",
        title: {
          en: "Lock Your B/2 Visa, Bridge Health Shield & 5 Apostilled Docs",
          he: "הגנת אשרת תייר (B/2), ביטוח רפואי מגשר והשלמת 5 מסמכי האפוסטיל",
          fr: "Sécuriser votre visa B/2, assurance santé pont & 5 actes apostillés",
          es: "Proteger tu visa B/2, seguro médico puente y 5 documentos apostillados",
          de: "B/2-Visum sichern, Brücken-Krankenversicherung & 5 Apostille-Urkunden",
          ru: "Защита турвизы B/2, медстраховка без ТЗ и сбор 5 документов с апостилем"
        },
        sub: {
          en: "Protect your legal stay before Day 60, activate No-TZ medical coverage, and audit your 5 foreign documents.",
          he: "הגישו הארכת אשרה לפני היום ה-60, הפעילו ביטוח רפואי ללא ת״ז ואמתו את 5 המסמכים.",
          fr: "Prolongez votre visa avant le 60e jour, activez la couverture médicale sans TZ et vérifiez vos actes.",
          es: "Extiende tu visa antes del día 60, activa cobertura médica sin TZ y audita tus documentos.",
          de: "Visum vor Tag 60 verlängern, Krankenversicherung ohne TZ aktivieren und Dokumente prüfen.",
          ru: "Продлите визу до 60-го дня, оформите медстраховку без ТЗ и проверьте все 5 справок."
        },
        blueprint: [
          "Record your exact Israel arrival date in the Adaptive Tracker to guard your 90-day B/2 tourist limit.",
          "File Form Ash/3 (Visa Extension) at least 3 weeks before B/2 expiry if any foreign Apostille is still in transit.",
          "Activate 60–90 Day Bridge Health Insurance (no Teudat Zehut required) and use licensed FX transfers to save ~2.5% when paying Israeli rent in ₪.",
          "Scan every arriving Birth, Marital, and Police certificate in the Smart Scanner before booking your Misrad HaPanim appointment."
        ],
        pitfalls: [
          "Overstaying a B/2 visa by even 48 hours triggers border red-flags and blocks Va'adat Charigim filings.",
          "Standard travel insurance often voids coverage once you file an intent to reside or convert in Israel."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/3 (B/2 Visa Extension)", href: appUrl("hebrew-engine", "ash3", l) },
          { icon: "📸", label: "Audit My Foreign Certificates & Apostilles", href: appUrl("hebrew-engine", "", l) },
          { icon: "🏥", label: "60–90 Day Bridge Health & ₪ FX Calculators", action: "tab2" }
        ],
        guides: [
          ["📘 B/2 Tourist Survival: Remote Work, Rent & Health Shield", "tourist-visa-israel-remote-work-housing-giyur"],
          ["📘 5 Apostilled Docs & 180-Day Expiry Guide", "apostille-180-day-clock-fbi-police-check-israel"]
        ]
      },

      aliyah_ash456_bypass: {
        time: "Skip 9–12 Mo JAFI Wait",
        title: {
          en: "File In-Israel Aliyah (Form Ash/456) & Protect 24-Month Sal Klita",
          he: "הגשת עלייה מתוך ישראל (טופס אש/456) ושמירה על זכויות סל קליטה",
          fr: "Déposer l'Aliyah sur place (Formulaire Ash/456) & protéger le Sal Klita",
          es: "Presentar Aliyá dentro de Israel (Formulario Ash/456) y proteger Sal Klitá",
          de: "Inlands-Alija einreichen (Formular Ash/456) & 24-Monats-Sal-Klita sichern",
          ru: "Подача на репатриацию внутри Израиля (Аш/456) и защита корзины абсорбции"
        },
        sub: {
          en: "Bypass the 9–12 month overseas Jewish Agency bottleneck by filing Shinui Ma'amad directly with Misrad HaPanim.",
          he: "עקפו המתנה של 9–12 חודשים בסוכנות היהודית באמצעות שינוי מעמד לעולה ישירות במשרד הפנים.",
          fr: "Contournez les 9–12 mois d'attente de l'Agence Juive via le changement de statut direct.",
          es: "Salta los 9–12 meses de espera de la Agencia Judía tramitando cambio de estatus directo.",
          de: "Umgehen Sie 9–12 Monate Wartezeit bei der Jewish Agency durch direkten Statuswechsel.",
          ru: "Обойдите 9–12 месяцев очереди в Сохнуте через прямую смену статуса в МВД Израиля."
        },
        blueprint: [
          "Auto-fill and coordinate-stamp Official Hebrew Form Ash/456 (Application for Oleh Status Inside Israel).",
          "Attach your recognized Orthodox community rabbi's Jewish-status letter (on official synagogue letterhead verifying maternal Jewish lineage) + your 5 Apostilled civil documents.",
          "Check your cumulative prior stays in Israel so you remain inside the 24-month / 3-year Misrad HaKlita window for full Sal Klita cash grants and tax benefits."
        ],
        pitfalls: [
          "Handwritten English or unaligned Hebrew entries on Form Ash/456 get bounced at the PIBA intake window.",
          "Rabbi letters missing synagogue registration numbers or explicit maternal lineage wording cause Nativ/Rabbanut referrals."
        ],
        tools: [
          { icon: "📄", label: "Open Form Ash/456 Hebrew PDF Stamper", href: appUrl("hebrew-engine", "ash456", l) },
          { icon: "✍️", label: "Rabbi Lineage & Proof Letter Builder", href: appUrl("rabbi-letters", "", l) },
          { icon: "⏱️", label: "Sal Klita & Cost Savings Calculator", action: "tab2" }
        ],
        guides: [
          ["📘 How to Make Aliyah Without Lawyers or 12-Month Queues", "how-to-make-aliyah-and-giyur-israel-without-lawyers"],
          ["📘 Sal Klita 24-Month Rule & Aliyah Benefits Guide", "aliyah-benefits-sal-klita-24-month-rule-cost-calculator"]
        ]
      },

      fsu_nativ_sec_cv: {
        time: "Nativ Verification",
        title: {
          en: "Complete the 11-Page Hebrew Security CV & Nativ Lineage Packet",
          he: "מילוי שאלון 11 עמודים (קורות חיים) ואימות שורשים בנתיב",
          fr: "Remplir le CV sécuritaire de 11 pages & dossier généalogique Nativ",
          es: "Completar el CV de Seguridad de 11 páginas y carpeta Nativ",
          de: "11-seitigen Sicherheits-Lebenslauf & Nativ-Herkunftsakte fertigstellen",
          ru: "Заполнение 11-страничной анкеты (Корот Хаим) и пакет документов для Натива"
        },
        sub: {
          en: "Prepare clean Soviet/FSU original certificates and stamp the 11-page Hebrew Biographical & Security Questionnaire.",
          he: "הכינו תעודות מקוריות והפיקו את שאלון קורות החיים בן 11 העמודים בעברית תקנית.",
          fr: "Préparez vos actes originaux ex-URSS et générez le questionnaire hébreu de 11 pages.",
          es: "Prepara partidas originales ex-URSS y estampa el cuestionario hebreo de 11 páginas.",
          de: "Originalurkunden vorbereiten und den 11-seitigen hebräischen Fragebogen exakt stempeln.",
          ru: "Подготовьте оригиналы советских свидетельств и заполните 11-страничную анкету на иврите без расхождений в датах."
        },
        blueprint: [
          "Gather pre-1991 original 'green booklet' Soviet Birth/Marriage certificates, military booklets, or archival extracts linking unbroken maternal/paternal Jewish nationality.",
          "Use our 11-Page Security CV Stamper (`קורות חיים`) to translate and align all employment, education, family, and travel history into clean Hebrew.",
          "Cross-check that every date and patronymic spelling matches Form Ash/456 before your Nativ consul interview."
        ],
        pitfalls: [
          "Newly re-issued duplicate certificates (`Повторное`) without archival basis extracts trigger deep Nativ holds.",
          "Leaving chronological gaps in employment or address history on the 11-page CV stalls security clearance."
        ],
        tools: [
          { icon: "📄", label: "Stamp 11-Page Security CV (Korot Chaim)", href: appUrl("hebrew-engine", "sec_cv", l) },
          { icon: "📄", label: "Stamp Form Ash/456 (In-Israel Aliyah)", href: appUrl("hebrew-engine", "ash456", l) }
        ],
        guides: [
          ["📘 Complete Aliyah Without Lawyers Guide", "how-to-make-aliyah-and-giyur-israel-without-lawyers"],
          ["📘 5 Apostilled Docs & Civil Proof Rules", "apostille-180-day-clock-fbi-police-check-israel"]
        ]
      },

      overseas_9mo_ishur: {
        time: "9-Month Rule + Rabbanut",
        title: {
          en: "Document 9-Month Overseas Community Life & Obtain Ishur Giyur",
          he: "תיעוד 9 חודשי קהילה בחו״ל והוצאת אישור גיור מהרבנות הראשית",
          fr: "Prouver 9 mois de vie communautaire & obtenir l'Ishour Giyour",
          es: "Acreditar 9 meses de vida comunitaria y obtener el Ishur Giyur",
          de: "9 Monate aktives Gemeindeleben belegen & Rabbinats-Ishur-Giyur sichern",
          ru: "Подтвердить 9 месяцев жизни в общине после миквы и получить Ишур Гиюр"
        },
        sub: {
          en: "Prove active post-mikvah community participation for Law of Return recognition and Chief Rabbinate registration.",
          he: "הוכיחו השתתפות פעילה בקהילה לאחר המקווה לצורך חוק השבות ורישום ברבנות.",
          fr: "Justifiez votre intégration communautaire post-mikvé pour la Loi du Retour et le Rabbinat.",
          es: "Demuestra participación comunitaria post-mikve para la Ley del Retorno y el Rabinato.",
          de: "Aktive Gemeindeteilnahme nach der Mikwe für Rückkehrgesetz & Oberrabbinat nachweisen.",
          ru: "Докажите активную общинную жизнь после миквы для МВД и Главного раввината Израиля."
        },
        blueprint: [
          "Verify your converting Beit Din sits on the recognized RCA / Beth Din of America / London Beth Din / Consistoire / ORD list (or understand Dahan Ruling boundaries for Aliyah vs. Rabbanut marriage).",
          "Generate structured Post-Mikvah Rabbi & Synagogue President letters documenting 9+ full months of active community life after immersion.",
          "Submit your Teudat Giyur + syllabus + rabbi letters for Chief Rabbinate `אישור גיור` so future marriage and children's status in Israel are 100% protected."
        ],
        pitfalls: [
          "Moving to Israel immediately after an overseas mikvah without completing 9 months in the converting community freezes Aliyah approval unless an emergency waiver is granted.",
          "Law of Return Aliyah recognition (Dahan Ruling) does NOT automatically register you as Jewish in the Chief Rabbinate marriage registry."
        ],
        tools: [
          { icon: "✍️", label: "Overseas Rabbi & Community Letter Studio", href: appUrl("rabbi-letters", "", l) },
          { icon: "🤝", label: "Book Rabbinic Ishur Giyur Review", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Overseas Conversion Aliyah & Ishur Giyur Guide", "overseas-conversion-aliyah-ishur-giyur"],
          ["📘 Dahan Ruling: Non-Orthodox Aliyah vs. Rabbanut Truth", "dahan-ruling-non-orthodox-conversion-aliyah-truth"]
        ]
      },

      spousal_ash6_filing: {
        time: isUnmarriedSpouse ? "Nohal 5.2.0009" : "Nohal 5.2.0008",
        title: {
          en: isUnmarriedSpouse
            ? "Stamp Form Ash/6 + Nespach Alef (Unmarried Common-Law Nohal 5.2.0009)"
            : "Stamp Form Ash/6 + Nespach Alef (Married Spousal Nohal 5.2.0008)",
          he: isUnmarriedSpouse
            ? "מילוי טופס אש/6 + נספח א׳ (חיים משותפים — נוהל 5.2.0009)"
            : "מילוי טופס אש/6 + נספח א׳ (בני זוג נשואים — נוהל 5.2.0008)",
          fr: "Générer le Formulaire Ash/6 + Affidavit Nespach Alef (" + (isUnmarriedSpouse ? "Nohal 5.2.0009" : "Nohal 5.2.0008") + ")",
          es: "Estampar Formulario Ash/6 + Declaración Nespach Alef (" + (isUnmarriedSpouse ? "Nohal 5.2.0009" : "Nohal 5.2.0008") + ")",
          de: "Formular Ash/6 + Nespach Alef stempeln (" + (isUnmarriedSpouse ? "Nohal 5.2.0009" : "Nohal 5.2.0008") + ")",
          ru: "Заполнить анкету Аш/6 + декларацию Неспах Алеф (" + (isUnmarriedSpouse ? "СТУПРО 5.2.0009" : "СТУПРО 5.2.0008") + ")"
        },
        sub: {
          en: "Build a zero-defect Graduated Procedure binder: Hebrew Form Ash/6, 13-Clause Affidavit, joint lease/bills & relationship story.",
          he: "בניית קלסר הליך מדורג מושלם: טופס אש/6 בעברית, תצהיר 13 סעיפים, חוזה דירה וסיפור ההיכרות.",
          fr: "Constituez un dossier complet : Ash/6 en hébreu, affidavit 13 clauses, bail commun et récit du couple.",
          es: "Arma una carpeta impecable: Ash/6 en hebreo, declaración de 13 cláusulas, contrato y relato de relación.",
          de: "Lückenlose Akte: Ash/6 auf Hebräisch, 13-Klausel-Affidavit, Mietvertrag und Beziehungsgeschichte.",
          ru: "Соберите безупречную папку СТУПРО: анкета Аш/6 на иврите, декларация из 13 пунктов, договор аренды и история знакомства."
        },
        blueprint: [
          "Stamp all 6 pages of Official Hebrew Form Ash/6 and the 13-Clause Nespach Alef Affidavit using exact PIBA PDF coordinates.",
          "Have your foreign Birth, Marital, and Police certificates translated into Hebrew and bound with an Israeli Red-Ribbon Notary seal (`אישור נוטריוני`).",
          "Compile joint Center-of-Life proof: apartment lease, Arnona/electricity/water bills, shared bank/expense trail, and 15–20 dated photos across seasons with family.",
          isUnmarriedSpouse
            ? "Note on Nohal 5.2.0009 vs. 5.2.0008: Unmarried couples wait ~7 years (3 yrs B/1 + 4 yrs A/5 permanent residency), whereas legally married couples (including recognized civil/Utah marriage) reach full citizenship in ~4.5 years."
            : "Ensure your apostilled Marriage Certificate matches both passports letter-for-letter."
        ],
        pitfalls: [
          "Using an overseas notary instead of an Israeli-licensed Red-Ribbon Notary gets translations rejected on the spot.",
          "Date discrepancies between your relationship cover letter and WhatsApp/flight timestamps become ammunition in the couples interview."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/6 (6-Page Spousal PDF)", href: appUrl("hebrew-engine", "ash6", l) },
          { icon: "📄", label: "Stamp Nespach Alef (13-Clause Affidavit)", href: appUrl("hebrew-engine", "nespach_alef", l) },
          { icon: "🤝", label: "Red-Ribbon Notary Translation Desk", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Complete Israel Spousal Visa Playbook (Nohal 5.2.0008 / 0009)", "misrad-hapanim-spousal-visa-nohal-5-2-0008"],
          ["📘 Criminal Record & Prior Marriage Clearance Guide", "aliyah-spousal-visa-criminal-record-rehabilitation"]
        ]
      },

      spousal_witness_letters: {
        time: "4–6 Israeli Witnesses",
        title: {
          en: "Generate 4–6 Nohal 5.2.0008 Israeli Family, Friend & Neighbor Letters",
          he: "הפקת 4–6 מכתבי עדים מישראלים (משפחה, חברים ושכנים) לנוהל 5.2.0008",
          fr: "Générer 4 à 6 lettres de témoins israéliens (famille, amis, voisins)",
          es: "Generar 4–6 cartas de testigos israelíes (familia, amigos y vecinos)",
          de: "4–6 israelische Zeugenbriefe erstellen (Familie, Freunde & Nachbarn)",
          ru: "Подготовить 4–6 писем израильских свидетелей (семья, друзья, соседи)"
        },
        sub: {
          en: "Every Israeli witness letter must include concrete shared memories, phone number, and a copy of their 9-digit Teudat Zehut.",
          he: "כל מכתב עד חייב לכלול היכרות אישית מפורטת, טלפון זמין וצילום תעודת זהות ישראלית.",
          fr: "Chaque lettre doit inclure des souvenirs précis, un téléphone et la copie de la Teoudat Zehout à 9 chiffres.",
          es: "Cada carta debe incluir anécdotas reales, teléfono y copia de la Teudat Zehut de 9 dígitos del testigo.",
          de: "Jeder Brief muss echte Erlebnisse, Telefonnummer und eine Kopie der 9-stelligen Teudat Zehut enthalten.",
          ru: "Каждое письмо должно содержать живые факты знакомства, телефон для звонка чиновника и копию Теудат-Зеута свидетеля."
        },
        blueprint: [
          "Log 4–6 real shared events (holiday dinners, trips, moving day, family celebrations) inside our Reference & Witness Letter Studio.",
          "Generate natural, non-identical Hebrew witness letters for Israeli parents/siblings, close friends, neighbors, or employers.",
          "Attach a clear photocopy of each Israeli witness's Teudat Zehut + open Sefach—letters without TZ copies are discarded by PIBA clerks."
        ],
        pitfalls: [
          "Copy-paste template letters where 4 friends use identical phrasing trigger immediate marriage-fraud suspicion!",
          "Warn your witnesses that Misrad HaPanim clerks occasionally call their mobile number unannounced to verify details."
        ],
        tools: [
          { icon: "✍️", label: "Open Nohal 5.2.0008 Witness Letter Studio", href: appUrl("rabbi-letters", "", l) }
        ],
        guides: [
          ["📘 Nohal 5.2.0008 Witness & Community Letters Guide", "israeli-rabbi-community-letters-beit-din"],
          ["📘 Spousal Visa Center-of-Life Checklist", "misrad-hapanim-spousal-visa-nohal-5-2-0008"]
        ]
      },

      clerk_30d_shield: {
        time: "⚡ 30-Day Strict Clock",
        title: {
          en: "Decode Clerk Demand Sheets (Daf Drishot) & Stop Administrative Closure",
          he: "פענוח דף דרישות ממשרד הפנים והגנה מסגירת תיק תוך 30 יום",
          fr: "Décoder la fiche d'exigences (Daf Drishot) & bloquer la clôture à 30 jours",
          es: "Decodificar Hoja de Requerimientos y frenar el cierre a los 30 días",
          de: "30-Tage-Nachforderungsblatt entschlüsseln & Aktenschließung stoppen",
          ru: "Расшифровка листа требований МВД и защита от закрытия дела за 30 дней"
        },
        sub: {
          en: "PIBA clerks give 30 days to supply missing items before closing your file—use Smart Scan + formal extension letters.",
          he: "פקידי משרד הפנים מקציבים 30 יום להשלמת מסמכים לפני סגירת תיק — סרקו והגישו בקשת ארכה מתועדת.",
          fr: "Le Misrad HaPanim accorde 30 jours avant de fermer le dossier — scannez la lettre et verrouillez un délai.",
          es: "Misrad HaPanim da 30 días antes de cerrar el expediente — escanea la carta y pide prórroga formal.",
          de: "Misrad HaPanim setzt eine 30-Tage-Frist vor Aktenschließung — Schreiben scannen & Fristverlängerung sichern.",
          ru: "МВД даёт ровно 30 дней на донос справок — отсканируйте ивритский лист и подайте запрос на продление срока."
        },
        blueprint: [
          "Photograph your Hebrew Misrad HaPanim clerk letter (`דף דרישות`) in the Smart Scanner for an instant item-by-item translation and action list.",
          "Anchor the letter's date inside your Adaptive Tracker so your 30-day countdown alerts you automatically.",
          "If an overseas Apostille will take >21 days, file a written Hebrew Stop-the-Clock Extension Request + proof of order BEFORE Day 25."
        ],
        pitfalls: [
          "Silence past Day 30 allows the clerk to close your file administratively ('חוסר מעש'), canceling your temporary visa.",
          "Submitting partial documents without a written cover inventory causes clerks to mark items missing."
        ],
        tools: [
          { icon: "📸", label: "Decode Hebrew Clerk Letter Now (Smart Scan)", href: appUrl("hebrew-engine", "", l) },
          { icon: "📄", label: "Stamp Form Ash/3 Visa Protection", href: appUrl("hebrew-engine", "ash3", l) },
          { icon: "⚖️", label: "Book 1-Hr Misrad HaPanim Lawyer Escort", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Misrad HaPanim Hebrew Letter Decoder & Ash/1–Ash/3 Guide", "hebrew-clerk-letter-translator-form-ash1-ash3"]
        ]
      },

      spousal_300_interview: {
        time: "2-Phone Live Sync",
        title: {
          en: "Sync Both Partners on All 300 Separated-Room Interview Questions",
          he: "סינכרון 2 טלפונים על 300 שאלות השימוע הזוגי בחדרים נפרדים",
          fr: "Synchroniser vos réponses aux 300 questions d'entretien séparé",
          es: "Sincronizar respuestas a las 300 preguntas en salas separadas",
          de: "Beide Partner auf alle 300 Getrennt-Raum-Fragen synchronisieren",
          ru: "Синхронизация пары по всем 300 вопросам перекрёстного допроса МВД"
        },
        sub: {
          en: "Clerks interview you in separate rooms and compare tiny daily-life details—spot innocent contradictions on 2 phones first.",
          he: "הפקידים מראיינים אתכם בנפרד ומשווים פרטים יומיומיים קטנים — אתרו סתירות תמימות מראש.",
          fr: "Les agents vous interrogent séparément sur votre quotidien — détectez les écarts à l'avance sur 2 téléphones.",
          es: "Los funcionarios interrogan por separado sobre detalles cotidianos — detecten contradicciones antes en 2 móviles.",
          de: "Beamte befragen Sie getrennt zu Alltagsdetails — finden Sie Widersprüche vorab mit dem 2-Handy-Sync.",
          ru: "Чиновники опрашивают вас по отдельности о мелочах быта — найдите случайные расхождения заранее на 2 телефонах."
        },
        blueprint: [
          "Open the 300-Question Couples Sync room on both your phone and your partner's phone.",
          "Answer each real Nohal 5.2.0008 category independently (first meeting, bedroom/kitchen layout, morning routines, finances, in-laws' names, last holiday).",
          "Review the automatic Contradiction Report together—never memorize robotic scripts, just refresh real memories you forgot!"
        ],
        pitfalls: [
          "Saying 'I guess around Tuesday' when unsure creates a contradiction—if you genuinely don't remember, saying 'I don't remember exact date' is far safer than guessing wrong!",
          "Forgetting who paid the last electricity bill or which side of the bed each sleeps on is the #1 real-couple tripwire."
        ],
        tools: [
          { icon: "📱", label: "Launch 300-Q 2-Phone Couples Sync", href: appUrl("couples-sync", "", l) }
        ],
        guides: [
          ["📘 300 Misrad HaPanim Couples Interview Questions Guide", "misrad-hapanim-couples-interview-questions"],
          ["📘 Nohal 5.2.0008 Graduated Procedure Playbook", "misrad-hapanim-spousal-visa-nohal-5-2-0008"]
        ]
      },

      vaadat_charigim_ash1: {
        time: "Tourist -> State Giyur",
        title: {
          en: "Win Va'adat Charigim Approval (Form Ash/1) to Enter State Conversion",
          he: "קבלת אישור ועדת חריגים (טופס אש/1) לכניסה לגיור ממלכתי",
          fr: "Obtenir l'accord de la Va'adat Charigim (Formulaire Ash/1)",
          es: "Obtener aprobación de Va'adat Jariguim (Formulario Ash/1)",
          de: "Va'adat-Charigim-Genehmigung (Formular Ash/1) für den Staats-Giur sichern",
          ru: "Получить разрешение Ваадат Харигим (анкета Аш/1) на гос. гиюр в Израиле"
        },
        sub: {
          en: "Non-citizens need Exceptions Committee clearance (Form Ash/1) to enter Nativ / State Giyur and lock visa protection.",
          he: "תיירים וזרים חייבים אישור ועדת חריגים (טופס אש/1) כדי להיכנס למערך הגיור הממלכתי.",
          fr: "Les non-citoyens doivent obtenir l'autorisation de la commission des exceptions (Ash/1) pour le Giour d'État.",
          es: "Los no ciudadanos necesitan permiso del Comité de Excepciones (Ash/1) para ingresar al Guiur Estatal.",
          de: "Nicht-Staatsbürger benötigen die Ausnahmekommission (Ash/1) für die Zulassung zum staatlichen Giur.",
          ru: "Негражданам требуется допуск Комиссии по исключениям (Аш/1) для входа в государственный гиюр и продления визы."
        },
        blueprint: [
          "Stamp Official Form Ash/1 (Va'adat Charigim Petition) + Form Ash/3 to keep your B/2 or A/2 visa valid during review.",
          "Demonstrate deep, sincere Jewish connection, prior study, financial self-sufficiency in Israel, and zero illegal work.",
          "Attach a strong letter from an Israeli Orthodox Sponsoring Rabbi (`רב מלווה`) confirming personal mentorship."
        ],
        pitfalls: [
          "Filing a thin 3-line motivation note on Form Ash/1 leads to fast rejection and a 14-day departure order.",
          "Working illegally in Israel while on a B/2 tourist visa permanently disqualifies a Va'adat Charigim application."
        ],
        tools: [
          { icon: "📄", label: "Stamp Form Ash/1 (Va'adat Charigim PDF)", href: appUrl("hebrew-engine", "ash1", l) },
          { icon: "📄", label: "Stamp Form Ash/3 (Visa Extension Shield)", href: appUrl("hebrew-engine", "ash3", l) },
          { icon: "⚖️", label: "Va'adat Charigim Lawyer & Rabbi Desk", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Va'adat Charigim Tourist Conversion Playbook (Form Ash/1)", "vaadat-charigim-tourist-conversion-israel"],
          ["📘 Full 2026 Guide to Converting to Judaism in Israel", "how-to-convert-to-judaism-in-israel-giyur-guide"]
        ]
      },

      rabbi_kallah_letters: {
        time: "5–8 Shul Letters",
        title: {
          en: "Match With a Sponsoring Rabbi & Build Your 5–8 Community Letters",
          he: "צימוד לרב מלווה / מדריכת כלה ובניית תיק 5–8 מכתבי קהילה ומשפחה מאמצת",
          fr: "Trouver un Rabbin accompagnateur & réunir 5 à 8 lettres communautaires",
          es: "Vincularse con Rabino Patrocinador y reunir 5–8 cartas comunitarias",
          de: "Begleitrabbiner finden & 5–8 Gemeinde- und Gastfamilienbriefe aufbauen",
          ru: "Найти сопровождающего раввина и собрать 5–8 писем от общины и семьи"
        },
        sub: {
          en: "Dayanim judge your lived Shabbat/kashrut community integration via authentic letters from your Rav, Kallah teacher & host family.",
          he: "הדיינים בוחנים שילוב אמיתי בקהילה דרך מכתבים אותנטיים מהרב המלווה, מדריכת הכלה והמשפחה המאמצת.",
          fr: "Le Beit Din évalue votre pratique réelle via les lettres du Rav, de la Madrichat Kallah et de la famille d'accueil.",
          es: "El Beit Din evalúa tu vivencia real mediante cartas del Rabino, Madrijat Kalá y familia anfitriona.",
          de: "Das Beit Din prüft Ihre gelebte Praxis anhand authentischer Briefe von Rabbiner, Kallah-Lehrerin & Gastfamilie.",
          ru: "Судьи Бейт-Дина оценивают вашу реальную еврейскую жизнь по письмам раввина, мадрихат калла и принимающей семьи."
        },
        blueprint: [
          "Connect with a Rabbanut-recognized Sponsoring Rabbi (`רב מלווה`)—and if converting with a partner or married, a certified `מדריכת כלה` (Family Purity instructor).",
          "Log every Shabbat meal, holiday, shiur, and synagogue milestone inside our Reference Letter & Event Logger as they happen.",
          "Generate tailored Hebrew letterhead drafts for your Rabbi, Host Family, Gabai, Ulpan teacher, and Kallah instructor ready for signature."
        ],
        pitfalls: [
          "Studying with a warm rabbi whose signature is NOT recognized by the Rabbanut / State Beit Din forces you to restart mentorship.",
          "Waiting until 2 weeks before your tribunal to ask 6 busy people for Hebrew letters delays your Beit Din date by months."
        ],
        tools: [
          { icon: "✍️", label: "Open 8-Persona Reference Letter & Event Logger", href: appUrl("rabbi-letters", "", l) },
          { icon: "🕍", label: "Match w/ Vetted Sponsoring Rabbi & Kallah Teacher", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Israeli Sponsoring Rabbi & Beit Din Letters Guide", "israeli-rabbi-community-letters-beit-din"],
          ["📘 Complete Conversion in Israel Step-by-Step Guide", "how-to-convert-to-judaism-in-israel-giyur-guide"]
        ]
      },

      songs_shabbat_fluency: {
        time: "56 Dual-Nusach Tracks",
        title: {
          en: "Master All 56 Shabbat Songs, Shacharit Prayers & Brachot Out Loud",
          he: "שליטה מעשית ב-56 שירי שבת, תפילות שחרית וברכות (ספרדי ואשכנזי)",
          fr: "Maîtriser à voix haute les 56 chants de Chabbat, prières & Brakhot",
          es: "Dominar en voz alta las 56 canciones de Shabat, rezos y Brajot",
          de: "Alle 56 Schabbat-Lieder, Gebete & Brachot laut und flüssig beherrschen",
          ru: "Освоить вслух все 56 субботних песен, молитв Шахарит и благословений"
        },
        sub: {
          en: "Dayanim routinely ask you to recite Shema, Kiddush, Havdalah, or Birkat HaMazon out loud on the spot.",
          he: "הדיינים מבקשים בקביעות לומר בעל-פה או מתוך סידור שמע ישראל, קידוש, הבדלה וברכת המזון.",
          fr: "Les Dayanim demandent régulièrement de réciter le Chema, le Kiddouch, la Havdala ou le Birkat HaMazon.",
          es: "Los Dayanim piden recitar en el acto el Shemá, Kidush, Havdalá o Birkat HaMazón.",
          de: "Die Dayanim bitten regelmäßig darum, Schema Jisrael, Kiddusch, Hawdala oder Birkat HaMason laut vorzutragen.",
          ru: "Даяны регулярно просят прямо на суде произнести Шма Исраэль, Кидуш, Авдалу или Биркат а-Мазон."
        },
        blueprint: [
          "Select your community Nusach (Sephardi / Edot HaMizrach or Ashkenazi) inside our 56-Track Karaoke Trainer.",
          "Practice daily Brachot (HaMotzi, Mezonot, Al HaMichya, Asher Yatzar), Shema Yisrael, Amidah structure, Kiddush, Zemirot, and Havdalah.",
          "Use word-by-word transliteration + audio alignment so your Hebrew pronunciation feels calm and natural under tribunal pressure."
        ],
        pitfalls: [
          "Knowing complex Halachic philosophy while stumbling over basic food Brachot (`בורא פרי העץ` vs. `האדמה`) signals purely theoretical study to the court.",
          "Remember pre-mikvah Shabbat boundaries: Dayanim check that you observe Shabbat properly according to pre-conversion Halachic guidelines."
        ],
        tools: [
          { icon: "🎵", label: "Open 56 Songs, Prayers & Shema Karaoke Trainer", href: appUrl("songs-prayers", "", l) }
        ],
        guides: [
          ["📘 700 Beit Din Questions & Liturgy Expectations", "beit-din-conversion-questions-israel"]
        ]
      },

      beit_din_700_exam: {
        time: "700 Real Tribunal Qs",
        title: {
          en: "Pass the Final Beit Din Tribunal (Ma'amad Beit Din) & Mikvah",
          he: "מעבר בהצלחה של מעמד בית הדין הסופי (700 שאלות הדיינים) והטבילה במקווה",
          fr: "Réussir le Tribunal Final du Beit Din (700 questions) & le Mikvé",
          es: "Aprobar el Tribunal Final del Beit Din (700 preguntas) y la Mikve",
          de: "Das abschließende Beit-Din-Tribunal (700 Fragen) & die Mikwe bestehen",
          ru: "Успешно пройти финальный суд Бейт-Дина (700 вопросов даянов) и микву"
        },
        sub: {
          en: "Train on all 700 real Halachic, Jewish calendar, Kashrut, Shabbat, Taharat HaMishpacha & motivation curveballs.",
          he: "תרגול כל 700 השאלות האמיתיות בהלכה, שבת, כשרות, מועדי ישראל, טהרת המשפחה ושאלות העומק של הדיינים.",
          fr: "Entraînez-vous aux 700 vraies questions de Halakha, Chabbat, Cacherout, fêtes et motivation.",
          es: "Entrena con las 700 preguntas reales de Halajá, Shabat, Kashrut, festividades y motivación.",
          de: "Trainieren Sie alle 700 echten Fragen zu Halacha, Schabbat, Kaschrut, Feiertagen und Motivation.",
          ru: "Отработайте все 700 реальных вопросов по Галахе, Шаббату, кашруту, праздникам, чистоте семьи и мотивации."
        },
        blueprint: [
          "Drill the 700 Beit Din Flashcards & Exam Game across every category—especially Dayanim 'pushback/motivation' curveballs.",
          "If converting with a partner, ensure 100% alignment on Taharat HaMishpacha, pre-Chuppah separation rules, and kosher kitchen setup.",
          "Bring originals of all reference letters, ID/passport, and modest tribunal attire for your `מעמד בית דין`, followed by Brit Milah / Hatafat Dam Brit (for men) and joyful immersion in a kosher Mikvah!"
        ],
        pitfalls: [
          "Getting defensive when a Dayan asks a sharp challenge question ('Why take on hard mitzvot?')—they are testing humility and sincerity, not hostility.",
          "Mixing up Rabbinic vs. Torah prohibitions on Shabbat or meat/dairy waiting customs."
        ],
        tools: [
          { icon: "🕍", label: "Launch 700 Beit Din Exam Simulator & Audio", href: appUrl("beit-din-150", "", l) }
        ],
        guides: [
          ["📘 700 Real Beit Din Conversion Questions & Answers (2026)", "beit-din-conversion-questions-israel"],
          ["📘 Private vs. State Beit Din Guide", "gush-etzion-private-conversion-aliyah"]
        ]
      },

      private_ishur_giyur: {
        time: "Rabbanut Registration",
        title: {
          en: "Register Your Conversion for Official Chief Rabbinate Ishur Giyur",
          he: "רישום תעודת הגיור והוצאת אישור גיור רשמי ברבנות הראשית (לנישואין וחופה)",
          fr: "Enregistrer votre conversion pour l'Ishour Giyour du Grand Rabbinat",
          es: "Registrar tu conversión para el Ishur Giyur oficial del Gran Rabinato",
          de: "Konversion für den offiziellen Ishur Giyur beim Oberrabbinat registrieren",
          ru: "Оформить официальный Ишур Гиюр в Главном раввинате Израиля (для хупы и детей)"
        },
        sub: {
          en: "Bridge your recognized Orthodox Beit Din certificate into the state Rabbinic registry for Chuppah and children's status.",
          he: "המרת תעודת בית הדין המוכר לאישור גיור ממלכתי לצורך רישום נישואין כדת משה וישראל.",
          fr: "Validez votre certificat orthodoxe auprès du Rabbinat pour le mariage religieux et la filiation.",
          es: "Valida tu certificado ortodoxo ante el Rabinato para matrimonio religioso y estatus de futuros hijos.",
          de: "Orthodoxes Zertifikat beim Oberrabbinat für Chuppa und den Status künftiger Kinder eintragen.",
          ru: "Подтвердите сертификат ортодоксального суда в Главном раввинате для хупы и еврейского статуса детей."
        },
        blueprint: [
          "Verify your private Orthodox court's Dayanim hold recognized Rabbinic ordination accepted for Chief Rabbinate `אישור גיור` review.",
          "Submit your Teudat Giyur,Mikvah certificate, Israeli TZ / residency card, and continuing-observance rabbi letter to the Regional Rabbinical Court.",
          "Once `אישור גיור` is issued, register smoothly for an Orthodox Chuppah in Israel without marital-status blocks."
        ],
        pitfalls: [
          "Converting at an unrecognized micro-court whose Dayanim lack Chief Rabbinate standing prevents `אישור גיור` marriage registration.",
          "Attempting to file for Rabbanut `אישור גיור` before holding a valid Israeli ID / residency number."
        ],
        tools: [
          { icon: "✍️", label: "Post-Mikvah Rabbi Confirmation Letter Builder", href: appUrl("rabbi-letters", "", l) },
          { icon: "🤝", label: "Consult Vetted Rabbinic & Legal Desk", href: bookingUrl(l) }
        ],
        guides: [
          ["📘 Gush Etzion / Private Conversion & Rabbanut Ishur Giyur Guide", "gush-etzion-private-conversion-aliyah"]
        ]
      },

      tz_mr14_final: {
        time: "Final Milestone 🎉",
        title: {
          en: "Stamp Forms MR/14a & MR/14b: Biometric Teudat Zehut & Unfolded Sefach",
          he: "חתימת הסיום: טופס מר/14א׳ לתעודת זהות ביומטרית, מר/14ב׳ ורישום ספח פתוח",
          fr: "Étape finale : Formulaires MR/14a & MR/14b — Teoudat Zehout biométrique & Sefach",
          es: "Meta final: Formularios MR/14a y MR/14b — Teudat Zehut biométrica y Sefach",
          de: "Zielgerade: Formulare MR/14a & MR/14b — Biometrische Teudat Zehut & Sefach",
          ru: "Финал: анкеты МР/14а и МР/14б — биометрический Теудат-Зеут и открытый Сефах"
        },
        sub: {
          en: "Issue your biometric Israeli ID card, travel document/passport, Kupat Cholim health fund, and verified family Sefach.",
          he: "הנפקת תעודת זהות ביומטרית, דרכון ישראלי, רישום לקופת חולים ובדיקת הספח.",
          fr: "Obtenez votre carte d'identité biométrique, passeport, Koupat Holim et Sefach vérifié.",
          es: "Obtén tu Teudat Zehut biométrica, pasaporte, Kupat Jolim y Sefach familiar verificado.",
          de: "Biometrischen Ausweis, Reisepass, Kupat Cholim und geprüften Familien-Sefach erhalten.",
          ru: "Получите биометрический Теудат-Зеут, загранпаспорт, больничную кассу и проверенный вкладыш Сефах."
        },
        blueprint: [
          "Stamp Official Form MR/14a (First Biometric Teudat Zehut) and Form MR/14b (Israeli Passport / Teudat Ma'avar declaration).",
          "Inspect your printed paper `ספח` (Sefach) before leaving the Misrad HaPanim desk to verify Hebrew/English name spelling, marital status, and religion/nationality fields.",
          hasKids
            ? "CRITICAL FOR CHILDREN / NEWBORNS: Register every child on both parents' Sefach (Nohal 5.2.0004) and keep the Sefach unfolded when scanning!"
            : "Enroll immediately in your chosen Kupat Cholim (Maccabi, Clalit, Meuhedet, or Leumit) and open a standard resident bank account."
        ],
        pitfalls: [
          "Leaving `לאום` (Nationality) or marital status `בבירור` ('Under Review') unchallenged for months without tracking follow-up.",
          "For Israeli newborns of non-citizen/graduated-track parents, delaying registration past 30 days risks unnecessary court/DNA bureaucracy."
        ],
        tools: [
          { icon: "🪪", label: "Stamp Form MR/14a (First Biometric TZ)", href: appUrl("hebrew-engine", "mr14a", l) },
          { icon: "🛂", label: "Stamp Form MR/14b (Israeli Passport)", href: appUrl("hebrew-engine", "mr14b", l) }
        ],
        guides: [
          ["📘 Aliyah Benefits, Sal Klita & First Steps Guide", "aliyah-benefits-sal-klita-24-month-rule-cost-calculator"],
          ["📘 Child & Newborn Sefach Registration Guide (Nohal 5.2.0004)", "newborn-baby-teudat-zehut-sefach-registration-israel"]
        ]
      }
    };

    return S;
  }

  // ==========================================================================
  // DIAGNOSE EXACT TRACK & ORDERED STEP IDS FROM USER ANSWERS
  // ==========================================================================
  function _origBuildBlueprintFromAnswers(ans, isEmergency, prevBp) {
    const l = getLang();
    const hasKids = (ans.q2_household === "family_kids");
    const hasPartner = (ans.q2_household === "couple" || (ans.q2_household === "family_kids" && ans.q2b_partner_status !== "single_parent_kids"));
    const isIsraeliPartner = hasPartner && (ans.q2b_partner_status === "israeli_married" || ans.q2b_partner_status === "israeli_unmarried");
    const isAbroad = isEmergency ? (ans.em_q1_loc === "abroad_exit") : (ans.q3_location === "abroad");

    let trackId = "aliyah_standard";
    let trackTitleMap = {};
    let stepIds = [];
    let trapWarningKey = "";

    if (ans.q1_goal === "visa_rejected_rescue" || ans.q3_location === "visa_rejected_rescue") {
      trackId = "visa_rejected_rescue_track";
      trackTitleMap = {
        en: "🛑 Visa & Va'adat Charigim Rejection Rescue & 21-Day Appeal Track",
        he: "🛑 מסלול חילוץ וערעור (21 יום) לאחר סירוב ויזה או ועדת חריגים",
        fr: "🛑 Parcours de Recours (21 Jours) & Sauvetage après Refus de Visa",
        es: "🛑 Ruta de Rescate y Apelación (21 Días) tras Rechazo de Visa",
        de: "🛑 Rettungs- & 21-Tage-Einspruchsplan nach Visum-Ablehnung",
        ru: "🛑 Маршрут спасения и апелляции (21 день) после отказа в визе / МВД"
      };
      stepIds = ["rejection_stop_14d_clock", "rejection_diagnose_pivot", "vaadat_charigim_ash1", "rabbi_kallah_letters", "tz_mr14_final"];
    } else if (isEmergency) {
      if (ans.em_q2_elig === "giyur_transfer") {
        trackId = "emergency_giyur_transfer";
        trackTitleMap = {
          en: "🚨 7-Day Emergency Exit & Humanitarian Giyur Track",
          he: "🚨 מסלול יציאת חירום (7 ימים) וגיור הומניטרי בישראל",
          fr: "🚨 Parcours d'Urgence 7 Jours & Transfert de Conversion",
          es: "🚨 Ruta de Emergencia 7 Días y Traslado Humanitario de Conversión",
          de: "🚨 7-Tage-Notfallplan & Humanitärer Giur-Transfer",
          ru: "🚨 7-дневный экстренный маршрут и гуманитарный перевод гиюра"
        };
        stepIds = [isAbroad ? "em_gobag" : "docs_5_in_israel", "vaadat_charigim_ash1", "rabbi_kallah_letters", "beit_din_700_exam", "tz_mr14_final"];
      } else {
        trackId = "emergency_aliyah_shinui";
        trackTitleMap = {
          en: "🚨 7-Day Emergency Go-Bag & In-Israel Shinui Ma'amad Track",
          he: "🚨 מסלול עליית חירום ב-7 ימים ושינוי מעמד מהארץ (אש/456)",
          fr: "🚨 Parcours Aliyah d'Urgence (7 Jours) & Shinui Ma'amad sur place",
          es: "🚨 Ruta de Aliyá de Emergencia (7 Días) y Shinui Ma'amad en Israel",
          de: "🚨 7-Tage-Notfall-Alija & Inlands-Statuswechsel (Ash/456)",
          ru: "🚨 7-дневная экстренная репатриация и смена статуса в Израиле (Аш/456)"
        };
        stepIds = [isAbroad ? "em_gobag" : "docs_5_in_israel", "aliyah_ash456_bypass", "clerk_30d_shield", "tz_mr14_final"];
      }
    } else if (isIsraeliPartner && ans.q1_goal === "aliyah_or_spouse") {
      const married = (ans.q2b_partner_status === "israeli_married");
      trackId = married ? "spousal_married_5_2_0008" : "spousal_unmarried_5_2_0009";
      trackTitleMap = {
        en: married
          ? "💑 Israeli Married Spousal Residency Track (Nohal 5.2.0008)"
          : "💑 Israeli Common-Law Partner Track (Nohal 5.2.0009)",
        he: married
          ? "💑 המסלול המדורג לבני זוג נשואים (נוהל 5.2.0008)"
          : "💑 המסלול המדורג לחיים משותפים / ידועים בציבור (נוהל 5.2.0009)",
        fr: married
          ? "💑 Parcours Conjoint Marié en Israël (Nohal 5.2.0008)"
          : "💑 Parcours Concubinage / Vie Commune en Israël (Nohal 5.2.0009)",
        es: married
          ? "💑 Ruta de Residencia Conyugal en Israel (Nohal 5.2.0008)"
          : "💑 Ruta de Pareja de Hecho en Israel (Nohal 5.2.0009)",
        de: married
          ? "💑 Ehepartner-Stufenverfahren in Israel (Nohal 5.2.0008)"
          : "💑 Lebensgemeinschaft-Verfahren in Israel (Nohal 5.2.0009)",
        ru: married
          ? "💑 Ступенчатая процедура СТУПРО для супругов (Ноhаль 5.2.0008)"
          : "💑 Ступенчатая процедура СТУПРО для нерасписанных пар (Ноhаль 5.2.0009)"
      };
      stepIds = [
        isAbroad ? "docs_5_abroad" : "docs_5_in_israel",
        "spousal_ash6_filing",
        "spousal_witness_letters",
        ...(ans.q4_detail === "spousal_demand" ? ["clerk_30d_shield"] : []),
        "spousal_300_interview",
        "tz_mr14_final"
      ];
    } else if (isIsraeliPartner && (ans.q1_goal === "giyur_rabbanut" || ans.q1_goal === "giyur_private")) {
      trackId = "dual_spousal_plus_giyur";
      trackTitleMap = {
        en: "💍 Dual Track: Israeli Spousal Residency (5.2.0008/0009) + Orthodox Conversion",
        he: "💍 מסלול משולב: מעמד זוגי במשרד הפנים (5.2.0008/0009) + גיור אורתודוקסי וחופה",
        fr: "💍 Double Parcours : Statut Conjoint (5.2.0008/0009) + Conversion Orthodoxe",
        es: "💍 Doble Ruta: Residencia de Pareja (5.2.0008/0009) + Conversión Ortodoxa",
        de: "💍 Doppelspur: Partner-Visum (5.2.0008/0009) + Orthodoxer Giur & Chuppa",
        ru: "💍 Двойной маршрут: СТУПРО с израильтянином + Ортодоксальный гиюр и хупа"
      };
      stepIds = [
        isAbroad ? "docs_5_abroad" : "docs_5_in_israel",
        "spousal_ash6_filing",
        "spousal_300_interview",
        "rabbi_kallah_letters",
        "beit_din_700_exam",
        "private_ishur_giyur",
        "tz_mr14_final"
      ];
    } else if (ans.q1_goal === "aliyah_or_spouse") {
      if (ans.q4_detail === "lor_fsu_nativ") {
        trackId = "aliyah_fsu_nativ";
        trackTitleMap = {
          en: "🏛️ FSU Nativ Verification & Direct Aliyah Track",
          he: "🏛️ מסלול אימות שורשים בנתיב ועלייה לישראל",
          fr: "🏛️ Parcours Vérification Nativ (ex-URSS) & Aliyah",
          es: "🏛️ Ruta de Verificación Nativ (ex-URSS) y Aliyá",
          de: "🏛️ Nativ-Prüfung (ehem. UdSSR) & Alija-Pfad",
          ru: "🏛️ Репатриация через проверку Натив (корни СССР/СНГ)"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "fsu_nativ_sec_cv", "aliyah_ash456_bypass", "tz_mr14_final"];
      } else if (ans.q4_detail === "lor_paternal") {
        trackId = "aliyah_paternal_plus_giyur";
        trackTitleMap = {
          en: "🧬 Paternal Law of Return Aliyah + Optional Citizen State Giyur",
          he: "🧬 עלייה מכוח חוק השבות (אב/סב יהודי) + מסלול גיור ממלכתי כאזרח",
          fr: "🧬 Aliyah Loi du Retour (Père/Grand-père) + Conversion d'État Citoyen",
          es: "🧬 Aliyá Ley del Retorno (Padre/Abuelo) + Conversión Estatal como Ciudadano",
          de: "🧬 Rückkehrgesetz-Alija (Vater/Großvater) + Staats-Giur als Bürger",
          ru: "🧬 Алия по отцу/дедушке + Государственный гиюр уже в статусе гражданина"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "aliyah_ash456_bypass", "tz_mr14_final", "rabbi_kallah_letters", "beit_din_700_exam"];
      } else if (ans.q4_detail === "lor_overseas_giyur") {
        trackId = "aliyah_overseas_giyur";
        trackTitleMap = {
          en: "📜 Overseas Conversion Aliyah & Chief Rabbinate Ishur Giyur Track",
          he: "📜 מסלול עלייה לבוגרי גיור בחו״ל ואישור גיור ברבנות הראשית",
          fr: "📜 Aliyah après Conversion à l'Étranger & Ishour Giyour",
          es: "📜 Aliyá por Conversión en el Extranjero e Ishur Giyur",
          de: "📜 Alija nach Auslands-Giur & Oberrabbinats-Ishur-Giyur",
          ru: "📜 Алия после зарубежного гиюра и оформление Ишур Гиюр"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "overseas_9mo_ishur", "aliyah_ash456_bypass", "tz_mr14_final"];
      } else {
        trackId = "aliyah_fast_ash456";
        trackTitleMap = {
          en: "✈️ Fast-Track Aliyah (Bypassing the 9–12 Month JAFI Queue)",
          he: "✈️ עלייה מהירה לישראל (עקיפת תור 9–12 החודשים בסוכנות)",
          fr: "✈️ Aliyah Accélérée (Sans les 9–12 mois d'attente de l'Agence Juive)",
          es: "✈️ Aliyá Acelerada (Sin los 9–12 meses de espera de la Agencia Judía)",
          de: "✈️ Schnellspur-Alija (Ohne 9–12 Monate Jewish-Agency-Warteschlange)",
          ru: "✈️ Ускоренная репатриация (в обход 9–12 месяцев ожидания Сохнута)"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "aliyah_ash456_bypass", "clerk_30d_shield", "tz_mr14_final"];
      }
    } else if (ans.q1_goal === "giyur_rabbanut") {
      trackId = "giyur_state_rabbanut";
      trackTitleMap = {
        en: "🏛️ State Rabbanut Conversion & Aliyah Citizenship Track",
        he: "🏛️ מסלול גיור ממלכתי (נתיב / ועדת חריגים) ואזרחות ישראלית",
        fr: "🏛️ Conversion d'État (Rabbinat / Va'adat Charigim) & Citoyenneté",
        es: "🏛️ Conversión Estatal (Rabinato / Va'adat Jariguim) y Ciudadanía",
        de: "🏛️ Staatlicher Giur (Rabbinat / Va'adat Charigim) & Staatsbürgerschaft",
        ru: "🏛️ Государственный гиюр в Израиле (Ваадат Харигим) и гражданство"
      };
      stepIds = [
        isAbroad ? "docs_5_abroad" : "docs_5_in_israel",
        "vaadat_charigim_ash1",
        "rabbi_kallah_letters",
        "songs_shabbat_fluency",
        "beit_din_700_exam",
        "tz_mr14_final"
      ];
    } else {
      // Private Orthodox Beit Din
      if (ans.q4_detail === "private_going_home") {
        trackId = "giyur_private_diaspora";
        trackTitleMap = {
          en: "🕍 Private Orthodox Beit Din Track (Returning Abroad)",
          he: "🕍 מסלול גיור בבית דין אורתודוקסי פרטי (לתושבי חו״ל)",
          fr: "🕍 Parcours Beit Din Orthodoxe Privé (Retour à l'étranger)",
          es: "🕍 Ruta de Beit Din Ortodoxo Privado (Regreso al exterior)",
          de: "🕍 Privates Orthodoxes Beit Din (Mit Rückkehr ins Ausland)",
          ru: "🕍 Частный ортодоксальный Бейт-Дин (с возвращением за рубеж)"
        };
        stepIds = ["rabbi_kallah_letters", "songs_shabbat_fluency", "beit_din_700_exam", "overseas_9mo_ishur"];
      } else if (ans.q4_detail === "private_with_anchor") {
        trackId = "giyur_private_with_anchor";
        trackTitleMap = {
          en: "🕍 Private Orthodox Beit Din + Legal Residency & Rabbanut Ishur Giyur",
          he: "🕍 גיור פרטי + מעמד חוקי והוצאת אישור גיור ברבנות הראשית",
          fr: "🕍 Beit Din Privé + Statut Légal & Ishour Giyour du Rabbinat",
          es: "🕍 Beit Din Privado + Estatus Legal e Ishur Giyur del Rabinato",
          de: "🕍 Privates Beit Din + Aufenthaltsstatus & Rabbinats-Ishur-Giyur",
          ru: "🕍 Частный Бейт-Дин + легальный статус и Ишур Гиюр Раввината"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "rabbi_kallah_letters", "songs_shabbat_fluency", "beit_din_700_exam", "private_ishur_giyur", "tz_mr14_final"];
      } else {
        trackId = "giyur_private_pivot_state";
        trapWarningKey = "PRIVATE_TOURIST_ALIYAH_BLOCK";
        trackTitleMap = {
          en: "🛡️ Safe Pivot Track: Tourist Conversion → State Va'adat Charigim for Aliyah",
          he: "🛡️ מסלול מוגן לעלייה: מעבר לוועדת חריגים וגיור ממלכתי מוכר למשרד הפנים",
          fr: "🛡️ Parcours Sécurisé Aliyah : Pivot vers Va'adat Charigim (Giour d'État)",
          es: "🛡️ Ruta Segura para Aliyá: Giro a Va'adat Jariguim y Guiur Estatal",
          de: "🛡️ Sicherer Alija-Weg: Wechsel zu Va'adat Charigim & Staats-Giur",
          ru: "🛡️ Безопасный маршрут для Алии: переход на Ваадат Харигим и гос. гиюр"
        };
        stepIds = [isAbroad ? "docs_5_abroad" : "docs_5_in_israel", "vaadat_charigim_ash1", "rabbi_kallah_letters", "songs_shabbat_fluency", "beit_din_700_exam", "tz_mr14_final"];
      }
    }

    // Determine initial active step circle based on Q4 stage!
    let startIdx = 0;
    if (!isEmergency) {
      if (ans.q4_detail === "spousal_demand") {
        const ci = stepIds.indexOf("clerk_30d_shield");
        if (ci !== -1) startIdx = ci;
      } else if (ans.q4_detail === "spousal_interview") {
        const ii = stepIds.indexOf("spousal_300_interview");
        if (ii !== -1) startIdx = ii;
      } else if (ans.q4_detail === "rabbanut_studying") {
        const ri = stepIds.indexOf("rabbi_kallah_letters");
        if (ri !== -1) startIdx = ri;
      } else if (ans.q4_detail === "rabbanut_tribunal") {
        const bi = stepIds.indexOf("beit_din_700_exam");
        if (bi !== -1) startIdx = bi;
      }
    }

    const prevCompleted = (prevBp && Array.isArray(prevBp.completedSteps)) ? prevBp.completedSteps.filter((id) => stepIds.indexOf(id) !== -1) : [];
    const firstIncompleteIdx = stepIds.findIndex((id) => prevCompleted.indexOf(id) === -1);
    const activeIdx = prevCompleted.length > 0 ? (firstIncompleteIdx !== -1 ? firstIncompleteIdx : stepIds.length - 1) : startIdx;

    return {
      version: 1,
      trackId: trackId,
      trackTitle: trackTitleMap[l] || trackTitleMap.en,
      trackTitleMap: trackTitleMap,
      stepIds: stepIds,
      isEmergency: Boolean(isEmergency),
      answers: Object.assign({}, ans),
      hasChildrenUnder18: hasKids,
      hasPartner: hasPartner,
      trapWarningKey: trapWarningKey,
      activeStepId: stepIds[activeIdx] || stepIds[0] || "",
      activeStepIdx: activeIdx,
      completedSteps: prevCompleted,
      timers: (prevBp && prevBp.timers) ? Object.assign({}, prevBp.timers) : {},
      lang: l,
      updatedAtMs: Date.now()
    };
  }


  const TRACK_ID_PRESET_ANSWERS = {
    visa_rejected_rescue_track: { isEm: false, ans: { q1_goal: "visa_rejected_rescue", q2_household: "solo", q3_location: "visa_rejected_rescue" } },
    emergency_giyur_transfer: { isEm: true, ans: { em_q1_loc: "abroad_exit", em_q2_elig: "giyur_transfer" } },
    emergency_aliyah_shinui: { isEm: true, ans: { em_q1_loc: "abroad_exit", em_q2_elig: "lor_or_spouse" } },
    spousal_married_5_2_0008: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "couple", q2b_partner_status: "israeli_married", q3_location: "israel_b2", q4_detail: "spousal_prefile" } },
    spousal_unmarried_5_2_0009: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "couple", q2b_partner_status: "israeli_unmarried", q3_location: "israel_b2", q4_detail: "spousal_prefile" } },
    dual_spousal_plus_giyur: { isEm: false, ans: { q1_goal: "giyur_rabbanut", q2_household: "couple", q2b_partner_status: "israeli_married", q3_location: "israel_b2", q4_detail: "rabbanut_start" } },
    aliyah_fsu_nativ: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "lor_fsu_nativ" } },
    aliyah_paternal_plus_giyur: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "lor_paternal" } },
    aliyah_overseas_giyur: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "lor_overseas_giyur" } },
    aliyah_fast_ash456: { isEm: false, ans: { q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "lor_maternal_west" } },
    giyur_state_rabbanut: { isEm: false, ans: { q1_goal: "giyur_rabbanut", q2_household: "solo", q3_location: "israel_b2", q4_detail: "rabbanut_start" } },
    giyur_private_diaspora: { isEm: false, ans: { q1_goal: "giyur_private", q2_household: "solo", q3_location: "israel_b2", q4_detail: "private_going_home" } },
    giyur_private_with_anchor: { isEm: false, ans: { q1_goal: "giyur_private", q2_household: "couple", q2b_partner_status: "israeli_married", q3_location: "israel_b2", q4_detail: "private_with_anchor" } },
    giyur_private_pivot_state: { isEm: false, ans: { q1_goal: "giyur_private", q2_household: "solo", q3_location: "israel_b2", q4_detail: "private_wants_aliyah" } }
  };

  window.restoreGatBlueprintByTrackId = function(trackId, optionalStepId) {
    const preset = TRACK_ID_PRESET_ANSWERS[trackId];
    if (!preset) return false;
    window.__gatWizardState.answers = Object.assign({}, window.__gatWizardState.answers, preset.ans);
    window.__gatActiveBlueprint = buildBlueprintFromAnswers(window.__gatWizardState.answers, preset.isEm, window.__gatActiveBlueprint);
    window.__gatWizardState.mode = "timeline";
    window.__gatWizardState.forceRetake = false;
    window.renderGatOnboardingStage();
    window.renderAdaptiveTrackTracker();
    if (optionalStepId && window.__gatActiveBlueprint) {
      const sIdx = window.__gatActiveBlueprint.stepIds.indexOf(optionalStepId);
      if (sIdx !== -1) {
        setTimeout(function() { window.openGatStepBlueprintModal(optionalStepId, sIdx, true); }, 60);
      }
    }
    return true;
  };

  // Rehydrate localized title & stepIds when blueprint comes from Firestore
  function enrichServerBlueprint(rawBp) {
    if (!rawBp || typeof rawBp !== "object" || !rawBp.trackId) return null;
    const rebuilt = buildBlueprintFromAnswers(rawBp.answers || {}, Boolean(rawBp.isEmergency), rawBp);
    rebuilt.completedSteps = Array.isArray(rawBp.completedSteps) ? rawBp.completedSteps : [];
    rebuilt.timers = (rawBp.timers && typeof rawBp.timers === "object") ? rawBp.timers : {};
    const firstOpen = rebuilt.stepIds.findIndex((id) => rebuilt.completedSteps.indexOf(id) === -1);
    rebuilt.activeStepIdx = firstOpen !== -1 ? firstOpen : Math.max(0, rebuilt.stepIds.length - 1);
    rebuilt.activeStepId = rebuilt.stepIds[rebuilt.activeStepIdx] || "";
    return rebuilt;
  }

  // ==========================================================================
  // FIRESTORE SYNC (`sync_track_blueprint` — ZERO LOCALSTORAGE)
  // ==========================================================================
  window.syncGatTrackBlueprintToFirestore = async function(action) {
    if (!isUserSignedIn()) return false;
    const act = action || "save";
    try {
      const uid = window.gatUid || localStorage.getItem("gat_uid") || "";
      const waPhone = localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
      const passCode = localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_pass_code") || "";
      const deviceAuthToken = localStorage.getItem("gat_device_auth_tok") || "";

      const payload = {
        mode: "sync_track_blueprint",
        action: act,
        uid: uid,
        waPhone: waPhone,
        passCode: passCode,
        deviceAuthToken: deviceAuthToken
      };
      if (act === "save" && window.__gatActiveBlueprint) {
        payload.trackBlueprint = window.__gatActiveBlueprint;
      }

      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.ok) {
        if (act === "load") {
          if (data.trackBlueprint) {
            window.__gatActiveBlueprint = enrichServerBlueprint(data.trackBlueprint);
            window.__gatWizardState.mode = "timeline";
            window.renderGatOnboardingStage();
            window.renderAdaptiveTrackTracker();
            return true;
          }
        } else if (act === "reset") {
          window.__gatActiveBlueprint = null;
        }
        return true;
      }
    } catch (e) {}
    return false;
  };

  // Public hydration hook called whenever `restore_wa_session`, `wa_verify_login`, or `claim_pass` returns userData
  window.applyServerTrackBlueprint = function(serverBp) {
    if (serverBp && typeof serverBp === "object" && serverBp.trackId) {
      // If user just created a fresh blueprint in RAM right before signing in, save the fresh RAM one to Firestore!
      if (window.__gatActiveBlueprint && (!serverBp.updatedAtMs || window.__gatActiveBlueprint.updatedAtMs > serverBp.updatedAtMs)) {
        window.syncGatTrackBlueprintToFirestore("save");
      } else {
        window.__gatActiveBlueprint = enrichServerBlueprint(serverBp);
        window.__gatWizardState.mode = "timeline";
      }
      window.renderGatOnboardingStage();
      window.renderAdaptiveTrackTracker();
    } else if (window.__gatActiveBlueprint && isUserSignedIn()) {
      // User logged into an account that didn't have a blueprint yet -> push RAM blueprint to Firestore!
      window.syncGatTrackBlueprintToFirestore("save");
      window.renderGatOnboardingStage();
      window.renderAdaptiveTrackTracker();
    }
  };

  // ==========================================================================
  // STYLESHEET INJECTION (LIGHT BLUE #03A9F4 + DEEP NAVY #103856 + CLEAN WHITE)
  // ==========================================================================
  function ensureOnboardingStyles() {
    if (document.getElementById("gat-onboarding-trajectory-css")) return;
    const st = document.createElement("style");
    st.id = "gat-onboarding-trajectory-css";
    st.textContent = `
      .app-viewport {
        padding: 5px 6px 16px 6px !important;
      }
      .view-container {
        max-width: 760px !important;
        width: 100% !important;
      }
      #gat-onboarding-stage {
        max-width: 760px !important;
        width: 100% !important;
        margin: 0 auto 8px auto !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .gat-ob-intro {
        text-align: center;
        padding: 2px 4px 10px 4px;
      }
      .gat-ob-kicker { display: none !important; }
      .gat-ob-h1 {
        font-size: clamp(1.15rem, 3.9vw, 1.56rem);
        font-weight: 900;
        color: #103856;
        line-height: 1.24;
        letter-spacing: -0.02em;
        margin: 0 0 8px 0;
      }
      .gat-ob-sub {
        font-size: 0.83rem;
        color: #334155;
        line-height: 1.52;
        max-width: 600px;
        margin: 0 auto;
        font-weight: 600;
      }
      .gat-em-crisis-btn {
        width: 100%;
        background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
        border: 2px solid #dc2626;
        border-radius: 14px;
        padding: 11px 14px;
        margin: 0 0 14px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        cursor: pointer;
        text-align: start;
        box-shadow: 0 6px 18px rgba(220, 38, 38, 0.14);
        transition: transform 0.14s ease, box-shadow 0.14s ease;
      }
      .gat-em-crisis-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 22px rgba(220, 38, 38, 0.22);
      }
      .gat-em-badge {
        display: inline-block;
        background: #dc2626;
        color: #ffffff;
        font-size: 0.68rem;
        font-weight: 900;
        padding: 2px 8px;
        border-radius: 999px;
        margin-bottom: 3px;
        letter-spacing: 0.03em;
      }
      .gat-em-txt {
        display: block;
        color: #881337;
        font-size: 0.84rem;
        font-weight: 900;
        line-height: 1.35;
      }
      .gat-wiz-card {
        background: #ffffff;
        border: 2px solid #03A9F4;
        border-radius: 22px;
        padding: 20px 18px;
        box-shadow: 0 14px 36px rgba(16, 56, 86, 0.10);
      }
      .gat-wiz-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;
      }
      .gat-wiz-back {
        background: #f1f5f9;
        color: #103856;
        border: 1px solid #cbd5e1;
        border-radius: 999px;
        padding: 5px 12px;
        font-size: 0.78rem;
        font-weight: 800;
        cursor: pointer;
      }
      .gat-wiz-step-lbl {
        font-size: 0.76rem;
        font-weight: 900;
        color: #0284c7;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .gat-wiz-prog-track {
        width: 100%;
        height: 6px;
        background: #e2e8f0;
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 16px;
      }
      .gat-wiz-prog-fill {
        height: 100%;
        background: linear-gradient(90deg, #103856 0%, #03A9F4 100%);
        border-radius: 999px;
        transition: width 0.25s ease;
      }
      .gat-wiz-q-title {
        font-size: 1.14rem;
        font-weight: 900;
        color: #103856;
        margin: 0 0 4px 0;
        line-height: 1.3;
      }
      .gat-wiz-q-sub {
        font-size: 0.83rem;
        color: #475569;
        margin: 0 0 14px 0;
        line-height: 1.45;
        font-weight: 600;
      }
      .gat-wiz-opts {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .gat-wiz-opt-btn {
        width: 100%;
        background: #f8fafc;
        border: 2px solid #cbd5e1;
        border-radius: 15px;
        padding: 13px 15px;
        text-align: start;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        transition: all 0.16s ease;
      }
      .gat-wiz-opt-btn:hover, .gat-wiz-opt-btn:focus-visible {
        background: #f0f9ff;
        border-color: #03A9F4;
        box-shadow: 0 6px 18px rgba(3, 169, 244, 0.16);
        transform: translateY(-1px);
      }
      .gat-wiz-opt-main {
        display: block;
        font-size: 0.95rem;
        font-weight: 900;
        color: #103856;
        margin-bottom: 3px;
        line-height: 1.3;
      }
      .gat-wiz-opt-desc {
        display: block;
        font-size: 0.79rem;
        color: #475569;
        line-height: 1.4;
        font-weight: 600;
      }
      .gat-wiz-opt-arrow {
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #e0f2fe;
        color: #0284c7;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 0.9rem;
      }
      /* Vertical Numbered Trajectory Timeline */
      .gat-tl-card {
        background: #ffffff;
        border: 2px solid #03A9F4;
        border-radius: 22px;
        padding: 18px 16px;
        box-shadow: 0 14px 36px rgba(16, 56, 86, 0.10);
      }
      .gat-tl-head-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
      }
      .gat-tl-sync-pill {
        font-size: 0.73rem;
        font-weight: 900;
        padding: 4px 10px;
        border-radius: 999px;
      }
      .gat-tl-spine {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 14px 0;
      }
      .gat-tl-row {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 13px;
        cursor: pointer;
      }
      .gat-tl-row:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 40px;
        bottom: -14px;
        inset-inline-start: 18px;
        width: 3px;
        background: #bae6fd;
        z-index: 1;
      }
      .gat-tl-row.is-done:not(:last-child)::after {
        background: #10b981;
      }
      .gat-tl-circle {
        position: relative;
        z-index: 2;
        flex: 0 0 38px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        font-weight: 900;
        background: #ffffff;
        color: #103856;
        border: 2.5px solid #03A9F4;
        box-shadow: 0 3px 10px rgba(3, 169, 244, 0.18);
        transition: transform 0.15s ease;
      }
      .gat-tl-row.is-active .gat-tl-circle {
        background: linear-gradient(135deg, #103856 0%, #03A9F4 100%);
        color: #ffffff;
        border-color: #38bdf8;
        box-shadow: 0 0 0 4px rgba(3, 169, 244, 0.22);
      }
      .gat-tl-row.is-done .gat-tl-circle {
        background: #10b981;
        color: #ffffff;
        border-color: #059669;
      }
      .gat-tl-step-box {
        flex: 1;
        min-width: 0;
        background: #f8fafc;
        border: 1.5px solid #cbd5e1;
        border-radius: 15px;
        padding: 12px 14px;
        transition: all 0.15s ease;
      }
      .gat-tl-row.is-active .gat-tl-step-box {
        background: #f0f9ff;
        border: 2px solid #03A9F4;
        box-shadow: 0 6px 18px rgba(3, 169, 244, 0.14);
      }
      .gat-tl-row.is-done .gat-tl-step-box {
        background: #f0fdf4;
        border-color: #86efac;
      }
      .gat-tl-row:hover .gat-tl-step-box {
        border-color: #0284c7;
        transform: translateY(-1px);
      }
      /* Clean Collapsed SEO Reference Library Drawer at Bottom */
      details.gat-seo-ref-drawer {
        max-width: 680px;
        margin: 18px auto 12px auto;
        background: #f8fafc;
        border: 1.5px solid #cbd5e1;
        border-radius: 16px;
        padding: 12px 15px;
      }
      details.gat-seo-ref-drawer > summary {
        font-size: 0.86rem;
        font-weight: 900;
        color: #103856;
        cursor: pointer;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      details.gat-seo-ref-drawer > summary::-webkit-details-marker { display: none; }
      /* Step Blueprint Popup Modal */
      #gat-step-blueprint-modal {
        position: fixed;
        inset: 0;
        z-index: 2147483644;
        background: rgba(8, 37, 72, 0.72);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 0;
      }
      @media (min-width: 640px) {
        #gat-step-blueprint-modal {
          align-items: center;
          padding: 16px;
        }
      }
      .gat-sbm-card {
        width: 100%;
        max-width: 600px;
        max-height: min(90dvh, calc(100vh - 16px));
        background: #ffffff;
        border-radius: 22px 22px 0 0;
        border: 2px solid #03A9F4;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 -12px 44px rgba(8, 37, 72, 0.38);
      }
      @media (min-width: 640px) {
        .gat-sbm-card { border-radius: 22px; }
      }
      .gat-sbm-body {
        display: block;
        flex: 1 1 auto;
        min-height: 0;
        max-height: calc(min(90dvh, calc(100vh - 16px)) - 72px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        touch-action: pan-y;
        padding: 18px 18px 22px 18px;
      }
    `;
    document.head.appendChild(st);
  }

  function escHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ==========================================================================
  // WIZARD NAVIGATION ACTIONS
  // ==========================================================================
  window.gatWizStartEmergency = function() {
    if (typeof window.pushGatStack === "function") window.pushGatStack();
    window.__gatWizardState.mode = "em1";
    window.renderGatOnboardingStage();
  };

  window.gatWizToggleHelper = function() {
    window.__gatWizardState.showCourtHelper = !window.__gatWizardState.showCourtHelper;
    window.renderGatOnboardingStage();
  };

  window.gatWizBack = function() {
    const st = window.__gatWizardState;
    if (st.mode === "em2") st.mode = "em1";
    else if (st.mode === "em1") st.mode = "intro_q1";
    else if (st.mode === "q4") st.mode = "q3";
    else if (st.mode === "q3") st.mode = (st.answers.q2_household === "couple" || st.answers.q2_household === "family_kids") ? "q2b" : "q2";
    else if (st.mode === "q2b") st.mode = "q2";
    else if (st.mode === "q2") st.mode = "intro_q1";
    else {
      window._gatUserClickedStartTrack = false;
      st.mode = "hero_landing";
      st.forceRetake = false;
    }
    window.renderGatOnboardingStage();
  };

  window.gatWizAnswer = function(stepKey, val) {
    if (typeof window.pushGatStack === "function") window.pushGatStack();
    const st = window.__gatWizardState;
    const a = st.answers;

    if (stepKey === "em1") {
      a.em_q1_loc = val;
      st.mode = "em2";
    } else if (stepKey === "em2") {
      a.em_q2_elig = val;
      window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, true, window.__gatActiveBlueprint);
      st.mode = "timeline";
      st.forceRetake = false;
      window.syncGatTrackBlueprintToFirestore("save");
      window.renderAdaptiveTrackTracker();
    } else if (stepKey === "q1") {
      a.q1_goal = val;
      st.showCourtHelper = false;
      if (val === "b1_work_visa_track") {
        a.q1_goal = "giyur_rabbanut";
        a.q3_location = "israel_b1_work";
        st.mode = "q2";
      } else if (val === "visa_rejected_rescue") {
        window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, false, window.__gatActiveBlueprint);
        st.mode = "timeline";
        st.forceRetake = false;
        window.syncGatTrackBlueprintToFirestore("save");
        window.renderAdaptiveTrackTracker();
      } else {
        st.mode = "q2";
      }
    } else if (stepKey === "q2") {
      a.q2_household = val;
      if (val === "couple" || val === "family_kids") {
        st.mode = "q2b";
      } else {
        a.q2b_partner_status = "";
        a.q2b_relationship = "single";
        st.mode = "q3";
      }
    } else if (stepKey === "q2b") {
      a.q2b_partner_status = val;
      a.q2b_relationship = val === "israeli_married" ? "married" : (val === "israeli_unmarried" ? "unmarried" : "couple");
      st.mode = "q3";
    } else if (stepKey === "q3") {
      a.q3_location = val;
      if (val === "visa_rejected_rescue") {
        window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, false, window.__gatActiveBlueprint);
        st.mode = "timeline";
        st.forceRetake = false;
        window.syncGatTrackBlueprintToFirestore("save");
        window.renderAdaptiveTrackTracker();
      } else {
        st.mode = "q4";
      }
    } else if (stepKey === "q4") {
      a.q4_detail = val;
      window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, false, window.__gatActiveBlueprint);
      st.mode = "timeline";
      st.forceRetake = false;
      window.syncGatTrackBlueprintToFirestore("save");
      window.renderAdaptiveTrackTracker();
    }

    window.renderGatOnboardingStage();
    const stage = document.getElementById("gat-onboarding-stage");
    if (stage && stage.scrollIntoView) {
      try { stage.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    }
  };

  window.gatWizRetake = function() {
    if (typeof window.pushGatStack === "function") window.pushGatStack();
    window.__gatWizardState.forceRetake = true;
    window.__gatWizardState.mode = "intro_q1";
    window.renderGatOnboardingStage();
  };

  // ==========================================================================
  // RENDER MAIN ONBOARDING / TRAJECTORY STAGE INSIDE `#gat-onboarding-stage`
  // ==========================================================================
  window.renderGatOnboardingStage = function() {
    ensureOnboardingStyles();
    const host = document.getElementById("gat-onboarding-stage");
    if (!host) return;

    const l = getLang();
    const t = UI[l] || UI.en;
    const tk = (window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l]) ? window.GAT_TRACKER_I18N_6L[l] : (window.GAT_TRACKER_I18N_6L ? window.GAT_TRACKER_I18N_6L.en : {});
    const st = window.__gatWizardState;
    if (!window._gatUserClickedStartTrack) { st.mode = "hero_landing"; st.forceRetake = false; }
    const bp = window.__gatActiveBlueprint;

// === STRICT HERO_LANDING TOP PRIORITY GATE ===
    // 1B. RENDER CLEAN ABOVE-THE-FOLD HERO LANDING (+5px ABOVE SUBHEADER, +10px BELOW SUBHEADER, ALL-CAPS BOLD "START MY TRACK" CTA)
    if (st.mode === "hero_landing") {
      const mhObj = MASTER_HERO_6LANG[l] || MASTER_HERO_6LANG.en;
      const bulletsArr = mhObj.bullets;
      let bulletsHtml = "";
      for (let bi = 0; bi < bulletsArr.length; bi++) {
        const b = bulletsArr[bi];
        bulletsHtml +=
          '<li style="display:flex;flex-direction:column;gap:2px;padding-bottom:' + (bi < bulletsArr.length - 1 ? '8px;border-bottom:1px solid #e2e8f0;' : '0;') + '">' +
            '<strong style="display:block;font-size:0.88rem;font-weight:900;color:#082548;line-height:1.25;">' + escHtml(b[0]) + '</strong>' +
            '<span style="display:block;font-size:0.76rem;color:#334155;line-height:1.34;font-weight:600;">' + escHtml(b[1]) + '</span>' +
          '</li>';
      }

      host.innerHTML =
        '<div id="gat-wiz-step-hero_landing" class="gat-wiz-card" style="text-align:center;padding:13px 13px;margin:2px auto 58vh auto;border-radius:17px;">' +
          '<h1 class="gat-ob-h1" style="margin:0 0 10px 0;font-size:clamp(1.14rem,3.8vw,1.48rem);line-height:1.18;">' + escHtml(mhObj.title) + '</h1>' +
          '<p class="gat-ob-sub" style="margin:0 auto 19px auto;font-size:0.79rem;line-height:1.36;color:#334155;font-weight:700;max-width:680px;">' + escHtml(mhObj.lead) + '</p>' +
          '<ul style="list-style:none;padding:10px 12px;margin:0 auto 11px auto;max-width:720px;background:#f8fafc;border:1.5px solid #bae6fd;border-radius:13px;text-align:start;display:flex;flex-direction:column;gap:8px;">' +
            bulletsHtml +
          '</ul>' +
          '<button type="button" onclick="window.gatWizStartQuiz()" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:2px solid #38bdf8;border-radius:13px;padding:13px 16px;font-size:1.02rem;font-weight:900;text-transform:uppercase;letter-spacing:0.03em;cursor:pointer;box-shadow:0 7px 18px rgba(3,169,244,0.28);display:flex;align-items:center;justify-content:center;gap:8px;">' +
            '<strong style="font-weight:900;text-transform:uppercase;letter-spacing:0.03em;">' + escHtml(mhObj.cta) + '</strong>' +
          '</button>' +
        '</div>';
      if (typeof window.syncLiveAddressableUrl === "function") window.syncLiveAddressableUrl();
      if (typeof window.updateBackBarUI === "function") window.updateBackBarUI();
      return;
    }
    const isRtl = (l === "he");
    const arrowChar = isRtl ? "←" : "→";
    host.dir = isRtl ? "rtl" : "ltr";
    // st initialized at top
    if (window.__gatActiveBlueprint && !st.forceRetake) {
      st.mode = "timeline";
      // Keep localized title in sync when user switches language
      if (window.__gatActiveBlueprint.trackTitleMap) {
        window.__gatActiveBlueprint.trackTitle = window.__gatActiveBlueprint.trackTitleMap[l] || window.__gatActiveBlueprint.trackTitleMap.en;
      }
    }

    // 1. RENDER VERTICAL NUMBERED TRAJECTORY TIMELINE
    if (st.mode === "timeline" && window.__gatActiveBlueprint) {
    // bp initialized at top
      const catalog = getStepCatalog(l, bp);
      const signedIn = isUserSignedIn();
      const completed = bp.completedSteps || [];

      const rowsHtml = bp.stepIds.map(function(sid, idx) {
        const meta = catalog[sid];
        if (!meta) return "";
        const isDone = completed.indexOf(sid) !== -1;
        const isActive = !isDone && idx === bp.activeStepIdx;
        const cls = isDone ? "gat-tl-row is-done" : (isActive ? "gat-tl-row is-active" : "gat-tl-row");
        const badgeTxt = isDone ? ("✓ " + t.stepDoneLbl) : (isActive ? ("🎯 " + t.stepActiveLbl) : t.stepNextLbl);
        const badgeBg = isDone ? "#dcfce7" : (isActive ? "#e0f2fe" : "#f1f5f9");
        const badgeCol = isDone ? "#166534" : (isActive ? "#0369a1" : "#475569");

        return (
          '<div id="gat-step-row-' + sid + '" class="' + cls + '" role="button" tabindex="0" onclick="window.openGatStepBlueprintModal(\'' + sid + '\',' + idx + ')">' +
            '<div class="gat-tl-circle">' + (isDone ? "✓" : (idx + 1)) + '</div>' +
            '<div class="gat-tl-step-box">' +
              '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
                '<span style="font-size:0.71rem;font-weight:900;color:#0284c7;text-transform:uppercase;letter-spacing:0.03em;">' + escHtml(meta.time) + '</span>' +
                '<span style="font-size:0.71rem;font-weight:900;padding:2px 8px;border-radius:999px;background:' + badgeBg + ';color:' + badgeCol + ';">' + escHtml(badgeTxt) + '</span>' +
              '</div>' +
              '<div style="font-size:0.96rem;font-weight:900;color:#103856;line-height:1.32;margin-bottom:4px;">' + escHtml(meta.title[l] || meta.title.en) + '</div>' +
              '<div style="font-size:0.8rem;color:#475569;line-height:1.45;font-weight:600;">' + escHtml(meta.sub[l] || meta.sub.en) + '</div>' +
            '</div>' +
          '</div>'
        );
      }).join("");

      const trapBanner = bp.trapWarningKey
        ? '<div style="background:#fff1f2;border:2px solid #e11d48;border-radius:14px;padding:12px 14px;margin:10px 0 12px 0;">' +
            '<div style="font-size:0.86rem;font-weight:900;color:#9f1239;margin-bottom:4px;">' + escHtml(t.trapAlertTitle) + '</div>' +
            '<div style="font-size:0.8rem;color:#881337;line-height:1.48;font-weight:600;">' + escHtml(t.trapAlertBody) + '</div>' +
          '</div>'
        : "";

      const kidsBanner = bp.hasChildrenUnder18
        ? '<div style="background:#f0f9ff;border:1.5px solid #7dd3fc;border-radius:11px;padding:8px 12px;margin-bottom:10px;font-size:0.78rem;font-weight:800;color:#0c4a6e;">' + escHtml(t.tlKidsBadge) + '</div>'
        : "";

      const syncCtaHtml = !signedIn
        ? '<button type="button" onclick="if(typeof window.openDeviceSyncModal===\'function\') window.openDeviceSyncModal();" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:2px solid #38bdf8;border-radius:13px;padding:12px 15px;font-size:0.86rem;font-weight:900;cursor:pointer;margin-bottom:10px;box-shadow:0 6px 18px rgba(3,169,244,0.25);">' + escHtml(t.tlSyncBtn) + '</button>'
        : "";

      const b1TimelineBanner = (bp.answers && bp.answers.q3_location === "israel_b1_work")
        ? '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:14px;padding:12px 14px;margin:10px 0 12px 0;">' +
            '<div style="font-size:0.85rem;font-weight:900;color:#92400e;margin-bottom:4px;">' + escHtml(t.b1DisclaimerTitle) + '</div>' +
            '<div style="font-size:0.79rem;color:#78350f;line-height:1.48;white-space:pre-line;font-weight:600;margin-bottom:9px;">' + escHtml(t.b1DisclaimerBody) + '</div>' +
            '<button type="button" onclick="window.openGatAiForB1Visa()" style="width:100%;background:linear-gradient(135deg,#d97706 0%,#b45309 100%);color:#ffffff;border:none;border-radius:10px;padding:9px 12px;font-size:0.79rem;font-weight:900;cursor:pointer;">' + escHtml(t.b1AskAiBtn) + '</button>' +
          '</div>'
        : "";

      const rejTimelineBanner = (bp.trackId === "visa_rejected_rescue_track")
        ? '<div style="background:#fff1f2;border:2px solid #e11d48;border-radius:14px;padding:12px 14px;margin:10px 0 12px 0;">' +
            '<div style="font-size:0.86rem;font-weight:900;color:#9f1239;margin-bottom:4px;">' + escHtml(t.rejBannerTitle) + '</div>' +
            '<div style="font-size:0.8rem;color:#881337;line-height:1.48;font-weight:600;margin-bottom:9px;">' + escHtml(t.rejBannerBody) + '</div>' +
            '<button type="button" onclick="window.openGatAiForRejection()" style="width:100%;background:linear-gradient(135deg,#e11d48 0%,#be123c 100%);color:#ffffff;border:none;border-radius:10px;padding:9px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + escHtml(t.rejAskAiBtn) + '</button>' +
          '</div>'
        : "";

      const activeSid = bp.stepIds[bp.activeStepIdx] || bp.stepIds[0] || "";
      const activeIdxNum = bp.activeStepIdx || 0;

      host.innerHTML =
        '<div id="gat-trajectory-' + escHtml(bp.trackId) + '" class="gat-tl-card">' +
          '<div class="gat-tl-head-bar">' +
            '<span class="gat-tl-sync-pill" style="background:' + (signedIn ? '#dcfce7;color:#166534;' : '#fef3c7;color:#92400e;') + '">' + escHtml(signedIn ? t.tlBadgeSynced : t.tlBadgeGuest) + '</span>' +
            '<button type="button" onclick="window.gatWizRetake()" style="background:#f1f5f9;color:#103856;border:1px solid #cbd5e1;border-radius:999px;padding:5px 11px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + escHtml(t.tlRetakeBtn) + '</button>' +
          '</div>' +
          '<h2 style="font-size:1.18rem;font-weight:900;color:#103856;line-height:1.3;margin:0 0 6px 0;">' + escHtml(bp.trackTitle) + '</h2>' +
          kidsBanner +
          trapBanner +
          b1TimelineBanner +
          rejTimelineBanner +
          syncCtaHtml +
          '<div style="font-size:0.8rem;font-weight:800;color:#0369a1;margin:6px 0 4px 0;">' + escHtml(t.tlTapHint) + '</div>' +
          '<div class="gat-tl-spine">' + rowsHtml + '</div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1.5px solid #e2e8f0;">' +
            '<button type="button" onclick="window.openGatStepBlueprintModal(\'' + activeSid + '\',' + activeIdxNum + ')" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:none;border-radius:14px;padding:14px 18px;font-size:0.95rem;font-weight:900;cursor:pointer;box-shadow:0 8px 22px rgba(3,169,244,0.28);display:flex;align-items:center;justify-content:center;gap:8px;">' + escHtml(t.startMyPathBtn || "🚀 Start My Path →") + '</button>' +
          '</div>' +
        '</div>';
      if (typeof window.syncLiveAddressableUrl === "function") window.syncLiveAddressableUrl();
      if (typeof window.updateBackBarUI === "function") window.updateBackBarUI();
      return;
    }



    // 2. RENDER PROGRESSIVE WIZARD CARD (1 QUESTION PER SCREEN)
    let curNum = 1, maxNum = 4, qTitle = "", qSub = "", stepKey = "q1", opts = [];
    const a = st.answers;

    if (st.mode === "em1") {
      curNum = 1; maxNum = 2; stepKey = "em1";
      qTitle = t.em1Title; qSub = ""; opts = t.em1Opts;
    } else if (st.mode === "em2") {
      curNum = 2; maxNum = 2; stepKey = "em2";
      qTitle = t.em2Title; qSub = ""; opts = t.em2Opts;
    } else if (st.mode === "q2") {
      curNum = 2; maxNum = 4; stepKey = "q2";
      qTitle = t.q2Title; qSub = t.q2Sub; opts = t.q2Opts;
    } else if (st.mode === "q2b") {
      curNum = 2; maxNum = 4; stepKey = "q2b";
      qTitle = t.q2bTitle; qSub = t.q2bSub;
      opts = a.q2_household === "family_kids" ? t.q2bOpts : t.q2bOpts.slice(0, 4);
    } else if (st.mode === "q3") {
      curNum = 3; maxNum = 4; stepKey = "q3";
      qTitle = t.q3Title; qSub = t.q3Sub; opts = t.q3Opts;
    } else if (st.mode === "q4") {
      curNum = 4; maxNum = 4; stepKey = "q4";
      const isIsrPart = (a.q2b_partner_status === "israeli_married" || a.q2b_partner_status === "israeli_unmarried");
      if (isIsrPart && a.q1_goal === "aliyah_or_spouse") {
        qTitle = t.q4SpousalTitle; opts = t.q4SpousalOpts;
      } else if (a.q1_goal === "aliyah_or_spouse") {
        qTitle = t.q4AliyahTitle; opts = t.q4AliyahOpts;
      } else if (a.q1_goal === "giyur_rabbanut") {
        qTitle = t.q4RabbanutTitle; opts = t.q4RabbanutOpts;
      } else {
        qTitle = t.q4PrivTitle; opts = t.q4PrivOpts;
      }
    } else {
      curNum = 1; maxNum = 4; stepKey = "q1";
      qTitle = t.q1Title; qSub = t.q1Sub; opts = t.q1Opts;
    }

    const pct = Math.round((curNum / maxNum) * 100);
    // arrowChar defined at top of function

    const introHtml = (st.mode === "intro_q1")
      ? '<button type="button" class="gat-em-crisis-btn" onclick="window.gatWizStartEmergency()">' +
          '<div>' +
            '<span class="gat-em-badge">' + escHtml(t.emPillBadge) + '</span>' +
            '<span class="gat-em-txt">' + escHtml(t.emPillText) + '</span>' +
          '</div>' +
          '<span style="font-size:1.1rem;font-weight:900;color:#dc2626;flex-shrink:0;">' + arrowChar + '</span>' +
        '</button>'
      : "";

    const optsHtml = opts.map(function(o) {
      return (
        '<button type="button" id="gat-wiz-opt-' + escHtml(stepKey + "-" + o[0]) + '" class="gat-wiz-opt-btn" onclick="window.gatWizAnswer(\'' + stepKey + '\',\'' + o[0] + '\')">' +
          '<div style="min-width:0;">' +
            '<span class="gat-wiz-opt-main">' + escHtml(o[1]) + '</span>' +
            (o[2] ? '<span class="gat-wiz-opt-desc">' + escHtml(o[2]) + '</span>' : '') +
          '</div>' +
          '<span class="gat-wiz-opt-arrow">' + arrowChar + '</span>' +
        '</button>'
      );
    }).join("");

    const b1WizDisclaimerHtml = (st.mode !== "intro_q1" && a.q3_location === "israel_b1_work")
      ? '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:15px;padding:13px 14px;margin-bottom:14px;text-align:start;">' +
          '<div style="font-size:0.86rem;font-weight:900;color:#92400e;margin-bottom:5px;">' + escHtml(t.b1DisclaimerTitle) + '</div>' +
          '<div style="font-size:0.79rem;color:#78350f;line-height:1.5;white-space:pre-line;font-weight:600;margin-bottom:10px;">' + escHtml(t.b1DisclaimerBody) + '</div>' +
          '<button type="button" onclick="window.openGatAiForB1Visa()" style="width:100%;background:linear-gradient(135deg,#d97706 0%,#b45309 100%);color:#ffffff;border:none;border-radius:10px;padding:10px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + escHtml(t.b1AskAiBtn) + '</button>' +
        '</div>'
      : "";

    const helperSectionHtml = (st.mode === "intro_q1")
      ? '<div style="margin-top:12px;text-align:center;">' +
          '<button type="button" onclick="window.gatWizToggleHelper()" style="background:transparent;border:none;color:#0284c7;font-size:0.81rem;font-weight:800;cursor:pointer;text-decoration:underline;">' + escHtml(t.helperLink) + '</button>' +
          (st.showCourtHelper
            ? '<div style="margin-top:10px;background:#f0f9ff;border:1.5px solid #7dd3fc;border-radius:14px;padding:13px 14px;text-align:start;">' +
                '<div style="font-size:0.86rem;font-weight:900;color:#103856;margin-bottom:6px;">' + escHtml(t.helperBoxTitle) + '</div>' +
                '<div style="font-size:0.8rem;color:#334155;line-height:1.52;white-space:pre-line;margin-bottom:12px;font-weight:600;">' + escHtml(t.helperBoxBody) + '</div>' +
                '<button type="button" onclick="window.gatWizAnswer(\'q1\',\'giyur_rabbanut\')" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#fff;border:none;border-radius:11px;padding:12px 16px;font-size:0.88rem;font-weight:900;cursor:pointer;box-shadow:0 6px 16px rgba(3,169,244,0.24);">' + escHtml(t.startMyPathBtn || "🚀 Start My Path →") + '</button>' +
              '</div>'
            : '') +
        '</div>'
      : "";

    host.innerHTML =
      introHtml +
      '<div id="gat-wiz-step-' + escHtml(st.mode) + '" class="gat-wiz-card">' +
        '<div class="gat-wiz-topbar">' +
          ((st.mode !== "hero_landing")
            ? '<button type="button" class="gat-wiz-back" onclick="window.gatWizBack()">' + escHtml(t.backBtn) + '</button>'
            : (window.__gatActiveBlueprint
                ? '<button type="button" class="gat-wiz-back" onclick="window.__gatWizardState.forceRetake=false;window.renderGatOnboardingStage();">✕</button>'
                : '<span></span>')) +
          '<span class="gat-wiz-step-lbl">' + escHtml(t.stepIndicator.replace("{cur}", String(curNum)).replace("{max}", String(maxNum))) + '</span>' +
        '</div>' +
        '<div class="gat-wiz-prog-track"><div class="gat-wiz-prog-fill" style="width:' + pct + '%;"></div></div>' +
        '<h3 class="gat-wiz-q-title">' + escHtml(qTitle) + '</h3>' +
        (qSub ? '<p class="gat-wiz-q-sub">' + escHtml(qSub) + '</p>' : '<div style="height:8px;"></div>') +
        b1WizDisclaimerHtml + '<div class=\"gat-wiz-opts\">' + optsHtml + '</div>' +
        helperSectionHtml +
      '</div>';
    if (typeof window.syncLiveAddressableUrl === "function") window.syncLiveAddressableUrl();
    if (typeof window.updateBackBarUI === "function") window.updateBackBarUI();
  };

  // ==========================================================================
  // OPEN STEP BLUEPRINT POPUP MODAL (BLUEPRINT + PITFALLS + TOOLS + GUIDES + AI)
  // ==========================================================================
  window.closeGatStepBlueprintModal = function(skipUrlSync) {
    const m = document.getElementById("gat-step-blueprint-modal");
    if (m) m.remove();
    window._gatOpenStepModalId = null;
    window._gatOpenStepModalIdx = null;
    if (typeof window._gatSyncModalScrollLock === "function") window._gatSyncModalScrollLock();
    if (!skipUrlSync && typeof window.syncLiveAddressableUrl === "function") window.syncLiveAddressableUrl();
    if (typeof window.updateBackBarUI === "function") window.updateBackBarUI();
  };

  window.openGatStepBlueprintModal = function(stepId, stepIdx, skipStackPush) {
    if (!skipStackPush && !window._gatOpenStepModalId && typeof window.pushGatStack === "function") {
      window.pushGatStack();
    }
    window._gatOpenStepModalId = stepId;
    window._gatOpenStepModalIdx = Number(stepIdx) || 0;
    const bp = window.__gatActiveBlueprint || readLocalBlueprint() || buildBlueprintFromAnswers({ q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "aliyah_fast" }, false, null);
    if (!bp) return;
    const l = getLang();
    const t = UI[l] || UI.en;
    const tk = (window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l]) ? window.GAT_TRACKER_I18N_6L[l] : (window.GAT_TRACKER_I18N_6L ? window.GAT_TRACKER_I18N_6L.en : {});
    const isRtl = (l === "he");
    const catalog = getStepCatalog(l, bp);
    const meta = catalog[stepId];
    if (!meta) return;

    // Update activeStepId in RAM (and Firestore if signed in) so AI knows what they're viewing
    bp.activeStepId = stepId;
    bp.activeStepIdx = Number(stepIdx) || 0;

    const existing = document.getElementById("gat-step-blueprint-modal");
    if (existing) existing.remove();

    const isDone = (bp.completedSteps || []).indexOf(stepId) !== -1;

    const bpListHtml = (meta.blueprint || []).map(function(line, i) {
      return '<div style="display:flex;align-items:flex-start;gap:9px;margin-bottom:8px;">' +
        '<span style="flex:0 0 22px;height:22px;border-radius:50%;background:#e0f2fe;color:#0369a1;font-size:0.75rem;font-weight:900;display:inline-flex;align-items:center;justify-content:center;margin-top:1px;">' + (i + 1) + '</span>' +
        '<span style="font-size:0.85rem;color:#1e293b;line-height:1.5;font-weight:600;">' + escHtml(line) + '</span>' +
      '</div>';
    }).join("");

    const pitfallsHtml = (meta.pitfalls || []).map(function(p) {
      return '<div style="font-size:0.82rem;color:#881337;line-height:1.48;margin-bottom:6px;font-weight:700;">• ' + escHtml(p) + '</div>';
    }).join("");

    const toolsHtml = (meta.tools || []).map(function(tl) {
      if (tl.action === "profile") {
        return '<button type="button" onclick="document.getElementById(\'gat-step-blueprint-modal\').remove(); if(typeof window.openGatProfileModal===\'function\') window.openGatProfileModal();" style="width:100%;background:linear-gradient(135deg,#103856 0%,#0284c7 100%);color:#ffffff;border:none;border-radius:12px;padding:12px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;text-align:start;"><span>' + escHtml(tl.icon + " " + tl.label) + '</span><span>' + (isRtl ? '←' : '→') + '</span></button>';
      }
      if (tl.action === "tab2") {
        return '<button type="button" onclick="document.getElementById(\'gat-step-blueprint-modal\').remove(); if(typeof window.switchTab===\'function\') window.switchTab(2);" style="width:100%;background:linear-gradient(135deg,#103856 0%,#0284c7 100%);color:#ffffff;border:none;border-radius:12px;padding:12px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;text-align:start;"><span>' + escHtml(tl.icon + " " + tl.label) + '</span><span>' + (isRtl ? '←' : '→') + '</span></button>';
      }
      return '<a href="' + escHtml(tl.href) + '" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;text-decoration:none;border:1.5px solid #38bdf8;border-radius:12px;padding:12px 14px;font-size:0.86rem;font-weight:900;display:flex;align-items:center;justify-content:space-between;gap:8px;box-sizing:border-box;"><span>' + escHtml(tl.icon + " " + tl.label) + '</span><span>' + (isRtl ? '←' : '→') + '</span></a>';
    }).join("");

    const guidesHtml = (meta.guides || []).map(function(g) {
      const url = spokeUrl(g[1], l);
      return '<a href="' + escHtml(url) + '" style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:11px;padding:10px 12px;color:#103856;text-decoration:none;font-size:0.82rem;font-weight:800;"><span>' + escHtml(g[0]) + '</span><span style="color:#0284c7;">↗</span></a>';
    }).join("");

    const modal = document.createElement("div");
    modal.id = "gat-step-blueprint-modal";
    modal.dir = isRtl ? "rtl" : "ltr";
    modal.onclick = function(e) { if (e.target === modal) { window.closeGatStepBlueprintModal(); } };

    modal.innerHTML =
      '<div class="gat-sbm-card" role="dialog" aria-modal="true">' +
        '<div style="background:linear-gradient(135deg,#103856 0%,#0b3b59 100%);color:#ffffff;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex:0 0 auto;">' +
          '<div style="min-width:0;">' +
            '<div style="font-size:0.72rem;font-weight:900;color:#38bdf8;text-transform:uppercase;letter-spacing:0.04em;">' + escHtml((window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l] ? window.GAT_TRACKER_I18N_6L[l].stepWord : 'STEP')) + ' #' + (stepIdx + 1) + ' • ' + escHtml(typeof meta.time === 'object' ? (meta.time[l] || meta.time.en) : meta.time) + '</div>' +
            '<div style="font-size:1.02rem;font-weight:900;line-height:1.28;margin-top:2px;">' + escHtml(meta.title[l] || meta.title.en) + '</div>' +
          '</div>' +
          '<button type="button" onclick="window.closeGatStepBlueprintModal();" style="background:rgba(255,255,255,0.16);color:#ffffff;border:none;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;cursor:pointer;flex-shrink:0;">✕</button>' +
        '</div>' +
        '<div class="gat-sbm-body">' +
          '<div style="margin-bottom:15px;">' +
            '<div style="font-size:0.86rem;font-weight:900;color:#103856;margin-bottom:8px;">' + escHtml(t.popSecTools) + '</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;">' + toolsHtml + '</div>' +
          '</div>' +
          '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:13px 14px;margin-bottom:14px;">' +
            '<div style="font-size:0.86rem;font-weight:900;color:#103856;margin-bottom:8px;">' + escHtml(t.popSecBlueprint) + '</div>' +
            bpListHtml +
          '</div>' +
          '<div style="background:#fff1f2;border:1.5px solid #fecdd3;border-radius:14px;padding:12px 14px;margin-bottom:14px;">' +
            '<div style="font-size:0.85rem;font-weight:900;color:#9f1239;margin-bottom:6px;">' + escHtml(t.popSecPitfalls) + '</div>' +
            pitfallsHtml +
          '</div>' +
          (guidesHtml
            ? '<div style="margin-bottom:15px;">' +
                '<div style="font-size:0.85rem;font-weight:900;color:#103856;margin-bottom:7px;">' + escHtml(t.popSecGuides) + '</div>' +
                '<div style="display:flex;flex-direction:column;gap:7px;">' + guidesHtml + '</div>' +
              '</div>'
            : '') +
          '<div style="display:flex;flex-direction:column;gap:8px;padding-top:10px;border-top:1.5px solid #e2e8f0;">' +
            '<button type="button" onclick="window.toggleGatStepComplete(\'' + stepId + '\')" style="width:100%;background:' + (isDone ? '#f1f5f9;color:#334155;border:1.5px solid #cbd5e1;' : '#10b981;color:#ffffff;border:none;') + 'border-radius:12px;padding:12px 14px;font-size:0.87rem;font-weight:900;cursor:pointer;">' + escHtml(isDone ? t.popUnmarkDone : t.popMarkDone) + '</button>' +
            '<button type="button" onclick="document.getElementById(\'gat-step-blueprint-modal\').remove(); window.askGatAiAboutTrackStep(\'' + stepId + '\',' + (stepIdx + 1) + ');" style="width:100%;background:#f0f9ff;color:#0369a1;border:1.5px solid #38bdf8;border-radius:12px;padding:11px 14px;font-size:0.85rem;font-weight:900;cursor:pointer;">' + escHtml(t.popAskAi.replace("{n}", String(stepIdx + 1))) + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);
    if (typeof window._gatSyncModalScrollLock === "function") window._gatSyncModalScrollLock();
    if (typeof window.syncLiveAddressableUrl === "function") window.syncLiveAddressableUrl();
    if (typeof window.updateBackBarUI === "function") window.updateBackBarUI();
  };

  window.toggleGatStepComplete = function(stepId) {
    const bp = window.__gatActiveBlueprint;
    if (!bp) return;
    bp.completedSteps = Array.isArray(bp.completedSteps) ? bp.completedSteps : [];
    const idx = bp.completedSteps.indexOf(stepId);
    if (idx === -1) bp.completedSteps.push(stepId);
    else bp.completedSteps.splice(idx, 1);

    const nextOpen = bp.stepIds.findIndex((id) => bp.completedSteps.indexOf(id) === -1);
    bp.activeStepIdx = nextOpen !== -1 ? nextOpen : Math.max(0, bp.stepIds.length - 1);
    bp.activeStepId = bp.stepIds[bp.activeStepIdx] || "";
    bp.updatedAtMs = Date.now();

    const modal = document.getElementById("gat-step-blueprint-modal");
    if (modal) modal.remove();
    if (typeof window._gatSyncModalScrollLock === "function") window._gatSyncModalScrollLock();

    window.renderGatOnboardingStage();
    window.renderAdaptiveTrackTracker();

    if (isUserSignedIn()) {
      window.syncGatTrackBlueprintToFirestore("save");
    } else if (typeof window.openDeviceSyncModal === "function") {
      // Gently invite guest to sync across 5 devices when they check off progress
      window.openDeviceSyncModal();
    }
  };

  // Open `✨ Spok` AI pre-loaded with exact track & step context

  window.gatWizStartQuiz = function() {
    window._gatUserClickedStartTrack = true;
    const st = window.__gatWizardState;
    st.mode = "intro_q1";
    st.forceRetake = true;
    window.renderGatOnboardingStage();
  };

  window.gatWizStartRejectedTrack = function() {
    // st initialized at top
    st.answers.q1_goal = "visa_rejected_rescue";
    window.__gatActiveBlueprint = buildBlueprintFromAnswers(st.answers, false, window.__gatActiveBlueprint);
    st.mode = "timeline";
    st.forceRetake = false;
    window.syncGatTrackBlueprintToFirestore("save");
    window.renderAdaptiveTrackTracker();
    window.renderGatOnboardingStage();
  };

  window.gatWizStartB1Track = function() {
    const st = window.__gatWizardState;
    st.answers.q1_goal = "giyur_rabbanut";
    st.answers.q3_location = "israel_b1_work";
    st.mode = "q2";
    window.renderGatOnboardingStage();
  };

  window.askGatAiCustomPrompt = function(promptStr, contextLabel) {
    const l = getLang();
    const bp = window.__gatActiveBlueprint;
    try {
      (function(_k,_v){ /* zero-localStorage enforced: Firestore 5-device sync only */ })("gat_lang", l);
      (function(_k,_v){ /* zero-localStorage enforced: Firestore 5-device sync only */ })("zehut_lang", l);
      window.gatLang = l;
      window.appLang = l;
    } catch (e) {}

    // Lock flag so syncServerDossierInBackground() and renderGatSmartWelcomeCard() do NOT wipe the chat while opening
    window._gatAiMsgInFlight = true;
    window._gatActiveAiContextBanner = contextLabel || (bp ? bp.trackTitle : "");

    if (typeof window.toggleGatHelpdesk === "function") {
      window.toggleGatHelpdesk(true);
    } else {
      const drw = document.getElementById("gat-hd-drawer");
      if (drw) {
        drw.style.removeProperty("display");
        drw.classList.add("open");
      }
    }

    setTimeout(function() {
      const drw = document.getElementById("gat-hd-drawer");
      if (drw) drw.style.removeProperty("display");
      if (typeof window.sendGatHelpdeskMsg === "function" && promptStr) {
        window.sendGatHelpdeskMsg(promptStr);
      } else {
        const inp = document.getElementById("gat-hd-input") || document.getElementById("gat-hd-inp") || document.querySelector("#gat-hd-drawer input, #gat-hd-drawer textarea");
        if (inp && promptStr) {
          inp.value = promptStr;
          inp.focus();
        }
      }
      setTimeout(function() { window._gatAiMsgInFlight = false; }, 4000);
    }, 80);
  };

  window.openGatAiForB1Visa = function() {
    const l = getLang();
    const rt = RACHEL_TRANSPARENCY_I18N[l] || RACHEL_TRANSPARENCY_I18N.en;
    window.askGatAiCustomPrompt(rt.b1AskAiPrompt, rt.b1DisclaimerTitle);
  };

  window.openGatAiForRejection = function() {
    const l = getLang();
    const rt = RACHEL_TRANSPARENCY_I18N[l] || RACHEL_TRANSPARENCY_I18N.en;
    window.askGatAiCustomPrompt(rt.rejAskAiPrompt, rt.rejBannerTitle);
  };

  window.askGatAiAboutTrackStep = function(stepId, stepNum) {
    const bp = window.__gatActiveBlueprint;
    const l = getLang();
    const catalog = bp ? getStepCatalog(l, bp) : {};
    const meta = (stepId && catalog[stepId]) ? catalog[stepId] : null;
    const stepTitle = meta ? (meta.title[l] || meta.title.en) : (bp ? bp.trackTitle : "");
    const prompts = {
      en: stepNum ? ("I am on the track '" + (bp ? bp.trackTitle : "") + "'. Help me complete Step #" + stepNum + " (" + stepTitle + ")—what are my exact steps and pitfalls to avoid?") : ("I am on '" + stepTitle + "'. Guide me through my most urgent priority right now."),
      he: stepNum ? ("אני במסלול '" + (bp ? bp.trackTitle : "") + "'. עזור לי להשלים את שלב #" + stepNum + " (" + stepTitle + ") — מהם הצעדים המדויקים והמלכודות שיש למנוע?") : ("כוון אותי במסלול " + stepTitle + " — מה הצעד הדחוף ביותר עבורי כרגע?"),
      fr: stepNum ? ("Je suis sur le parcours '" + (bp ? bp.trackTitle : "") + "'. Aide-moi pour l'étape #" + stepNum + " (" + stepTitle + ") — que dois-je faire en premier ?") : ("Guide-moi sur mon parcours (" + stepTitle + ") — quelle est ma priorité ?"),
      es: stepNum ? ("Estoy en la ruta '" + (bp ? bp.trackTitle : "") + "'. Ayúdame con el Paso #" + stepNum + " (" + stepTitle + ") — ¿qué debo hacer primero?") : ("Guíame en mi ruta (" + stepTitle + ") — ¿cuál es mi prioridad ahora?"),
      de: stepNum ? ("Ich bin auf dem Pfad '" + (bp ? bp.trackTitle : "") + "'. Hilf mir bei Schritt #" + stepNum + " (" + stepTitle + ") — womit fange ich an?") : ("Führe mich durch meinen Plan (" + stepTitle + ") — was hat jetzt Priorität?"),
      ru: stepNum ? ("Мой маршрут: '" + (bp ? bp.trackTitle : "") + "'. Помоги мне выполнить Шаг #" + stepNum + " (" + stepTitle + ") — с чего начать?") : ("Подскажи по моему маршруту (" + stepTitle + ") — что сейчас самое важное?")
    };
    window.askGatAiCustomPrompt(prompts[l] || prompts.en, bp ? bp.trackTitle : stepTitle);
  };

  // ==========================================================================
  // ADAPTIVE TRACK-SPECIFIC LIVE DEADLINE & MILESTONE TRACKER (`#view-4`)
  // ==========================================================================
  window.setGatBlueprintTimerDate = function(timerKey, yyyyMmDd) {
    if (!window.__gatActiveBlueprint || !yyyyMmDd) return;
    const ms = new Date(yyyyMmDd + "T12:00:00").getTime();
    if (!Number.isFinite(ms) || ms <= 0) return;
    window.__gatActiveBlueprint.timers = window.__gatActiveBlueprint.timers || {};
    window.__gatActiveBlueprint.timers[timerKey] = ms;
    window.__gatActiveBlueprint.updatedAtMs = Date.now();
    window.renderAdaptiveTrackTracker();
    if (isUserSignedIn()) {
      window.syncGatTrackBlueprintToFirestore("save");
    }
  };

  window.renderAdaptiveTrackTracker = function() {
    const v4 = document.getElementById("view-4");
    if (!v4) return;

    let mount = document.getElementById("gat-adaptive-tracker-panel");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "gat-adaptive-tracker-panel";
      v4.insertBefore(mount, v4.firstChild);
    }

    const l = getLang();
    const t = UI[l] || UI.en;
    const tk = (window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l]) ? window.GAT_TRACKER_I18N_6L[l] : (window.GAT_TRACKER_I18N_6L ? window.GAT_TRACKER_I18N_6L.en : {});
    const bp = window.__gatActiveBlueprint;

    if (!bp) {
      mount.innerHTML =
        '<div style="background:#f0f9ff;border:2px solid #03A9F4;border-radius:18px;padding:16px;margin-bottom:14px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">' +
          '<div style="font-size:0.86rem;font-weight:800;color:#103856;flex:1;min-width:200px;">' + escHtml(t.trkNoPlanBanner) + '</div>' +
          '<button type="button" onclick="if(typeof window.switchTab===\'function\') window.switchTab(0);" style="background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#fff;border:none;border-radius:11px;padding:10px 14px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + escHtml(t.trkStartSetupBtn) + '</button>' +
        '</div>';
      return;
    }

    // Hide generic hardcoded shield/milestone blocks when active personalized track is loaded
    Array.from(v4.children).forEach(function(ch) {
      if (ch.id !== "gat-adaptive-tracker-panel" && !ch.classList.contains("two-way-bar") && !ch.classList.contains("section-kicker")) {
        ch.style.display = "none";
      }
    });

    // Determine ONLY the statutory countdown clocks relevant to this user's track
    const clocks = [];
    const ans = bp.answers || {};
    if (ans.q3_location === "israel_b2" || ans.em_q1_loc === "in_israel_now") {
      clocks.push({ key: "b2EntryDateMs", days: 90, label: tk.clockB2 });
    }
    clocks.push({ key: "apostilleIssueDateMs", days: 180, label: tk.clockApostille });
    if (bp.trackId.indexOf("spousal") !== -1 || ans.q4_detail === "spousal_demand") {
      clocks.push({ key: "clerkDemandDateMs", days: 30, label: tk.clockClerk30d });
    }
    if (ans.q4_detail === "lor_overseas_giyur") {
      clocks.push({ key: "mikvahDateMs", days: 270, label: tk.clockMikvah9mo });
    }
    if (bp.trackId.indexOf("aliyah") !== -1) {
      clocks.push({ key: "aliyahDateMs", days: 730, label: tk.clockSalKlita });
    }

    const now = Date.now();
    const clocksHtml = clocks.map(function(c) {
      const startMs = (bp.timers && bp.timers[c.key]) ? Number(bp.timers[c.key]) : 0;
      const dateVal = startMs ? new Date(startMs).toISOString().slice(0, 10) : "";
      let remHtml = '<span style="font-size:0.78rem;color:#64748b;font-weight:700;">' + escHtml(tk.setDateHint) + '</span>';
      if (startMs > 0) {
        const elapsed = Math.floor((now - startMs) / 86400000);
        const left = c.days - elapsed;
        const col = left <= 14 ? "#dc2626" : (left <= 35 ? "#d97706" : "#059669");
        remHtml = '<span style="font-size:1.1rem;font-weight:900;color:' + col + ';">' + (left >= 0 ? escHtml(tk.daysRemaining.replace("{n}", String(left))) : escHtml(tk.expiredDaysAgo.replace("{n}", String(Math.abs(left))))) + '</span>';
      }
      return (
        '<div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:12px 13px;">' +
          '<div style="font-size:0.8rem;font-weight:900;color:#103856;margin-bottom:4px;">' + escHtml(c.label) + '</div>' +
          '<div style="margin-bottom:8px;">' + remHtml + '</div>' +
          '<label style="display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:0.75rem;font-weight:800;color:#475569;margin:0;">' +
            '<span>' + escHtml(t.trkSetDateLbl) + '</span>' +
            '<input type="date" value="' + dateVal + '" onchange="window.setGatBlueprintTimerDate(\'' + c.key + '\', this.value)" style="padding:5px 8px;border:1.5px solid #94a3b8;border-radius:8px;font-size:0.78rem;font-weight:800;color:#103856;width:auto;margin:0;" />' +
          '</label>' +
        '</div>'
      );
    }).join("");

    const catalog = getStepCatalog(l, bp);
    const doneCnt = (bp.completedSteps || []).length;
    const totalCnt = bp.stepIds.length;

    const checklistHtml = bp.stepIds.map(function(sid, idx) {
      const meta = catalog[sid];
      if (!meta) return "";
      const done = (bp.completedSteps || []).indexOf(sid) !== -1;
      return (
        '<div onclick="window.openGatStepBlueprintModal(\'' + sid + '\',' + idx + ')" style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:' + (done ? '#f0fdf4' : '#ffffff') + ';border:1.5px solid ' + (done ? '#86efac' : '#cbd5e1') + ';border-radius:12px;padding:11px 13px;cursor:pointer;">' +
          '<div style="display:flex;align-items:center;gap:10px;min-width:0;">' +
            '<span style="flex:0 0 28px;height:28px;border-radius:50%;background:' + (done ? '#10b981' : '#e0f2fe') + ';color:' + (done ? '#fff' : '#0369a1') + ';font-size:0.8rem;font-weight:900;display:inline-flex;align-items:center;justify-content:center;">' + (done ? "✓" : (idx + 1)) + '</span>' +
            '<span style="font-size:0.85rem;font-weight:800;color:#103856;line-height:1.35;">' + escHtml(meta.title[l] || meta.title.en) + '</span>' +
          '</div>' +
          '<span style="font-size:0.75rem;font-weight:900;color:#0284c7;flex-shrink:0;">→</span>' +
        '</div>'
      );
    }).join("");

    mount.innerHTML =
      '<div style="background:linear-gradient(135deg,#103856 0%,#0b3b59 100%);color:#ffffff;border-radius:20px;padding:18px;margin-bottom:14px;box-shadow:0 12px 28px rgba(16,56,86,0.18);">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">' +
          '<span style="font-size:0.72rem;font-weight:900;color:#38bdf8;letter-spacing:0.04em;">' + escHtml(t.trkCustomTag) + '</span>' +
          '<span style="background:rgba(255,255,255,0.15);padding:3px 10px;border-radius:999px;font-size:0.75rem;font-weight:900;">' + doneCnt + ' / ' + totalCnt + ' ' + escHtml(t.stepDoneLbl) + '</span>' +
        '</div>' +
        '<h3 style="font-size:1.12rem;font-weight:900;margin:0 0 12px 0;line-height:1.3;">' + escHtml(bp.trackTitle) + '</h3>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;">' + clocksHtml + '</div>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">' + checklistHtml + '</div>';
  };

  // ==========================================================================
  // BOOT & LANGUAGE / AUTH HOOKS
  // ==========================================================================
    // === GAT UNIFIED TRACKER & WIZARD ROUTING OVERRIDES START ===
  function saveLocalBlueprint(bp) {
    try {
      if (bp) (function(_k,_v){ /* zero-localStorage enforced: Firestore 5-device sync only */ })("gat_track_blueprint_v1", JSON.stringify(bp));
    } catch (e) {}
  }

  // Alias toggleGatBlueprintStep <-> toggleGatStepComplete so both work seamlessly
  const _origToggleStepComplete = window.toggleGatStepComplete;
  window.toggleGatStepComplete = function(stepId) {
    if (!window.__gatActiveBlueprint) {
      window.__gatActiveBlueprint = readLocalBlueprint() || buildBlueprintFromAnswers({
        q1_goal: "aliyah_or_spouse", q2_household: "solo", q3_location: "abroad", q4_detail: "lor_maternal_west"
      }, false, null);
    }
    const bp = window.__gatActiveBlueprint;
    if (!bp) return;
    bp.completedSteps = Array.isArray(bp.completedSteps) ? bp.completedSteps : [];
    const idx = bp.completedSteps.indexOf(stepId);
    if (idx === -1) bp.completedSteps.push(stepId);
    else bp.completedSteps.splice(idx, 1);

    const nextOpen = bp.stepIds.findIndex(function(id) { return bp.completedSteps.indexOf(id) === -1; });
    bp.activeStepIdx = nextOpen !== -1 ? nextOpen : Math.max(0, bp.stepIds.length - 1);
    bp.activeStepId = bp.stepIds[bp.activeStepIdx] || "";
    bp.updatedAtMs = Date.now();
    saveLocalBlueprint(bp);

    const modal = document.getElementById("gat-step-blueprint-modal");
    if (modal) modal.remove();
    if (typeof window._gatSyncModalScrollLock === "function") window._gatSyncModalScrollLock();

    window.renderGatOnboardingStage();
    window.renderAdaptiveTrackTracker();

    if (isUserSignedIn()) {
      window.syncGatTrackBlueprintToFirestore("save");
    }
  };
  window.toggleGatBlueprintStep = window.toggleGatStepComplete;

  // Accept BOTH DOM step keys ('q1', 'q2', 'q2b', 'q3', 'q4', 'em1', 'em2') AND answer field keys ('q1_goal', 'q2_household', etc.)
  window.gatWizAnswer = function(stepKey, val) {
    if (typeof window.pushGatStack === "function") window.pushGatStack();
    const st = window.__gatWizardState;
    const a = st.answers;

    function finishWizardAndOpenTracker(isEm) {
      window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, Boolean(isEm), window.__gatActiveBlueprint);
      saveLocalBlueprint(window.__gatActiveBlueprint);
      // Reset Start tab back to clean Hero Landing and auto-switch user to Tab 5 (Tracker / #view-4)!
      st.mode = "hero_landing";
      st.forceRetake = false;
      window._gatUserClickedStartTrack = false;
      window.renderGatOnboardingStage();
      window.renderAdaptiveTrackTracker();
      window.syncGatTrackBlueprintToFirestore("save");
      if (typeof window.switchTab === "function") {
        window.switchTab(4);
      } else {
        window.gatActiveTab = 4;
        if (typeof window.syncActiveTabAndTrackUI === "function") window.syncActiveTabAndTrackUI(true);
      }
      const vp = document.getElementById("viewport");
      if (vp) vp.scrollTop = 0;
    }

    if (stepKey === "em1" || stepKey === "em_q1_loc") {
      a.em_q1_loc = val;
      st.mode = "em2";
    } else if (stepKey === "em2" || stepKey === "em_q2_elig") {
      a.em_q2_elig = val;
      finishWizardAndOpenTracker(true);
      return;
    } else if (stepKey === "q1" || stepKey === "q1_goal") {
      a.q1_goal = val;
      st.showCourtHelper = false;
      if (val === "b1_work_visa_track") {
        a.q1_goal = "giyur_rabbanut";
        a.q3_location = "israel_b1_work";
        st.mode = "q2";
      } else if (val === "visa_rejected_rescue") {
        finishWizardAndOpenTracker(false);
        return;
      } else {
        st.mode = "q2";
      }
    } else if (stepKey === "q2" || stepKey === "q2_household") {
      a.q2_household = val;
      if (val === "couple" || val === "family_kids") {
        st.mode = "q2b";
      } else {
        a.q2b_partner_status = "";
        a.q2b_relationship = "single";
        st.mode = "q3";
      }
    } else if (stepKey === "q2b" || stepKey === "q2b_partner_status") {
      a.q2b_partner_status = val;
      a.q2b_relationship = val === "israeli_married" ? "married" : (val === "israeli_unmarried" ? "unmarried" : "couple");
      st.mode = "q3";
    } else if (stepKey === "q3" || stepKey === "q3_location") {
      a.q3_location = val;
      if (val === "visa_rejected_rescue") {
        finishWizardAndOpenTracker(false);
        return;
      }
      st.mode = "q4";
    } else if (stepKey === "q4" || stepKey === "q4_detail") {
      a.q4_detail = val;
      finishWizardAndOpenTracker(false);
      return;
    }

    window.renderGatOnboardingStage();
    const stage = document.getElementById("gat-onboarding-stage");
    if (stage && stage.scrollIntoView) {
      try { stage.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    }
  };

  window.gatWizReset = function() {
    if (typeof window.pushGatStack === "function") window.pushGatStack();
    window._gatUserClickedStartTrack = true;
    window.__gatWizardState.mode = "intro_q1";
    window.__gatWizardState.forceRetake = true;
    if (typeof window.switchTab === "function") {
      window.switchTab(0);
    } else {
      window.gatActiveTab = 0;
      if (typeof window.syncActiveTabAndTrackUI === "function") window.syncActiveTabAndTrackUI(true);
    }
    window.renderGatOnboardingStage();
  };
  window.gatWizRetake = window.gatWizReset;

  // Unified Tracker Tab (#view-4): Live Statutory Countdown Clocks + Full Interactive Vertical Numbered Step-by-Step Timeline
  window.renderAdaptiveTrackTracker = function() {
    ensureOnboardingStyles();
    const v4 = document.getElementById("view-4");
    const legacyHost = document.getElementById("gat-adaptive-track-host");
    let mount = document.getElementById("gat-adaptive-tracker-panel") || legacyHost;

    if (!mount && v4) {
      mount = document.createElement("div");
      mount.id = "gat-adaptive-tracker-panel";
      if (v4.firstChild) v4.insertBefore(mount, v4.firstChild);
      else v4.appendChild(mount);
    }
    if (!mount) return;

    // Hide generic static blocks in #view-4 so Tab 5 is 100% the unified Live Clocks + Vertical Step-by-Step Timeline Tracker
    if (v4 && v4.children) {
      Array.from(v4.children).forEach(function(ch) {
        if (ch !== mount && ch.id !== "gat-adaptive-tracker-panel" && ch.id !== "gat-adaptive-track-host" && !(ch.classList && ch.classList.contains("gat-tab-faq-section"))) {
          ch.style.display = "none";
        }
      });
    }

    const l = getLang();
    const isRtl = (l === "he");
    const arrowChar = isRtl ? "←" : "→";
    const t = UI[l] || UI.en;
    const tk = (window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l]) ? window.GAT_TRACKER_I18N_6L[l] : (window.GAT_TRACKER_I18N_6L ? window.GAT_TRACKER_I18N_6L.en : {});

    let bp = enrichBlueprintStepIds(window.__gatActiveBlueprint || readLocalBlueprint());
    let isDefaultPreview = false;
    if (!bp || !Array.isArray(bp.stepIds) || bp.stepIds.length === 0) {
      isDefaultPreview = true;
      bp = buildBlueprintFromAnswers({
        q1_goal: "aliyah_or_spouse",
        q2_household: "solo",
        q3_location: "abroad",
        q4_detail: "lor_maternal_west"
      }, false, null);
    } else if (bp.trackTitleMap) {
      bp.trackTitle = bp.trackTitleMap[l] || bp.trackTitleMap.en;
    }

    const catalog = getStepCatalog(l, bp);
    const completed = Array.isArray(bp.completedSteps) ? bp.completedSteps : [];
    const doneCnt = completed.length;
    const totalCnt = bp.stepIds.length;
    const pct = totalCnt > 0 ? Math.round((doneCnt / totalCnt) * 100) : 0;
    const signedIn = isUserSignedIn();

    // 1. Live Statutory Countdown Clocks relevant to this track
    const clocks = [];
    const ans = bp.answers || {};
    if (ans.q3_location === "israel_b2" || ans.em_q1_loc === "in_israel_now") {
      clocks.push({ key: "b2EntryDateMs", days: 90, label: tk.clockB2 });
    }
    clocks.push({ key: "apostilleIssueDateMs", days: 180, label: tk.clockApostille });
    if (String(bp.trackId || "").indexOf("spousal") !== -1 || ans.q4_detail === "spousal_demand") {
      clocks.push({ key: "clerkDemandDateMs", days: 30, label: tk.clockClerk30d });
    }
    if (ans.q4_detail === "lor_overseas_giyur") {
      clocks.push({ key: "mikvahDateMs", days: 270, label: tk.clockMikvah9mo });
    }
    if (String(bp.trackId || "").indexOf("aliyah") !== -1) {
      clocks.push({ key: "aliyahDateMs", days: 730, label: tk.clockSalKlita });
    }

    const now = Date.now();
    const clocksHtml = clocks.map(function(c) {
      const startMs = (bp.timers && bp.timers[c.key]) ? Number(bp.timers[c.key]) : 0;
      const dateVal = startMs ? new Date(startMs).toISOString().slice(0, 10) : "";
      let remHtml = '<span style="font-size:0.76rem;color:#64748b;font-weight:700;">' + escHtml(tk.setDateHint) + '</span>';
      if (startMs > 0) {
        const elapsed = Math.floor((now - startMs) / 86400000);
        const left = c.days - elapsed;
        const col = left <= 14 ? "#dc2626" : (left <= 35 ? "#d97706" : "#059669");
        remHtml = '<span style="font-size:1.05rem;font-weight:900;color:' + col + ';">' + (left >= 0 ? escHtml(tk.daysRemaining.replace("{n}", String(left))) : escHtml(tk.expiredDaysAgo.replace("{n}", String(Math.abs(left))))) + '</span>';
      }
      return (
        '<div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:11px 12px;color:#103856;">' +
          '<div style="font-size:0.79rem;font-weight:900;color:#103856;margin-bottom:3px;">' + escHtml(c.label) + '</div>' +
          '<div style="margin-bottom:7px;">' + remHtml + '</div>' +
          '<label style="display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:0.74rem;font-weight:800;color:#475569;margin:0;">' +
            '<span>' + escHtml(t.trkSetDateLbl) + '</span>' +
            '<input type="date" value="' + dateVal + '" onchange="window.setGatBlueprintTimerDate(\'' + c.key + '\', this.value)" style="padding:4px 7px;border:1.5px solid #94a3b8;border-radius:8px;font-size:0.76rem;font-weight:800;color:#103856;width:auto;margin:0;" />' +
          '</label>' +
        '</div>'
      );
    }).join("");

    // 2. Full Interactive Vertical Numbered Trajectory Spine (Circles 1..N + Blueprint Popups + 1-Tap Checkboxes)
    let firstOpenIdx = bp.stepIds.findIndex(function(id) { return completed.indexOf(id) === -1; });
    if (firstOpenIdx === -1) firstOpenIdx = 0;

    const rowsHtml = bp.stepIds.map(function(sid, idx) {
      const meta = catalog[sid];
      if (!meta) return "";
      const isDone = completed.indexOf(sid) !== -1;
      const isActive = !isDone && idx === firstOpenIdx;
      const cls = isDone ? "gat-tl-row is-done" : (isActive ? "gat-tl-row is-active" : "gat-tl-row");
      const badgeTxt = isDone ? ("✓ " + t.stepDoneLbl) : (isActive ? ("🎯 " + t.stepActiveLbl) : t.stepNextLbl);
      const badgeBg = isDone ? "#dcfce7" : (isActive ? "#e0f2fe" : "#f1f5f9");
      const badgeCol = isDone ? "#166534" : (isActive ? "#0369a1" : "#475569");
      const timeStr = typeof meta.time === "object" ? (meta.time[l] || meta.time.en) : String(meta.time || "");
      const titleStr = typeof meta.title === "object" ? (meta.title[l] || meta.title.en) : String(meta.title || "");
      const subStr = typeof meta.sub === "object" ? (meta.sub[l] || meta.sub.en) : String(meta.sub || "");

      return (
        '<div id="gat-step-row-' + escHtml(sid) + '" class="' + cls + '" role="button" tabindex="0" onclick="window.openGatStepBlueprintModal(\'' + escHtml(sid) + '\',' + idx + ')">' +
          '<button type="button" class="gat-tl-circle" onclick="event.stopPropagation();window.openGatStepBlueprintModal(\'' + escHtml(sid) + '\',' + idx + ')" aria-label="Step ' + (idx + 1) + '">' +
            (isDone ? "✓" : (idx + 1)) +
          '</button>' +
          '<div class="gat-tl-step-box">' +
            '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
              '<span style="font-size:0.71rem;font-weight:900;color:#0284c7;text-transform:uppercase;letter-spacing:0.03em;">' + escHtml((window.GAT_TRACKER_I18N_6L && window.GAT_TRACKER_I18N_6L[l] ? window.GAT_TRACKER_I18N_6L[l].stepWord : 'STEP')) + ' ' + (idx + 1) + ' • ' + escHtml(timeStr) + '</span>' +
              '<span style="font-size:0.71rem;font-weight:900;padding:2px 8px;border-radius:999px;background:' + badgeBg + ';color:' + badgeCol + ';">' + escHtml(badgeTxt) + '</span>' +
            '</div>' +
            '<div style="font-size:0.96rem;font-weight:900;color:#103856;line-height:1.32;margin-bottom:4px;">' + escHtml(titleStr) + '</div>' +
            '<div style="font-size:0.8rem;color:#475569;line-height:1.45;font-weight:600;">' + escHtml(subStr) + '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:8px;padding-top:8px;border-top:1px dashed #cbd5e1;">' +
              '<button type="button" onclick="event.stopPropagation();window.toggleGatStepComplete(\'' + escHtml(sid) + '\')" style="background:' + (isDone ? '#dcfce7' : '#ffffff') + ';color:' + (isDone ? '#166534' : '#103856') + ';border:1.5px solid ' + (isDone ? '#10b981' : '#94a3b8') + ';border-radius:8px;padding:4px 10px;font-size:0.74rem;font-weight:800;cursor:pointer;">' +
                escHtml(isDone ? ("✓ " + t.stepDoneLbl) : t.popMarkDone) +
              '</button>' +
              '<span style="font-size:0.75rem;font-weight:900;color:#0284c7;">' + escHtml(t.stepNextLbl) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    const openDossierLabel = {
      en: "🛠️ OPEN MY DOSSIER & HEBREW FORM STAMPER (/APP/) →",
      he: "🛠️ פתח את תיק המסמכים ומנוע הטפסים בעברית (/APP/) ←",
      fr: "🛠️ OUVRIR MON DOSSIER & GÉNÉRATEUR DE FORMULAIRES (/APP/) →",
      es: "🛠️ ABRIR MI EXPEDIENTE Y MOTOR DE FORMULARIOS (/APP/) →",
      de: "🛠️ MEIN DOSSIER & HEBRÄISCHEN FORMULAR-GENERATOR ÖFFNEN →",
      ru: "🛠️ ОТКРЫТЬ МОЁ ДОСЬЕ И ГЕНЕРАТОР АНКЕТ НА ИВРИТЕ (/APP/) →"
    }[l] || "🛠️ OPEN MY DOSSIER & HEBREW FORM STAMPER (/APP/) →";

    const setupBannerHtml = isDefaultPreview
      ? '<div style="background:#f0f9ff;border:2px solid #03A9F4;border-radius:16px;padding:13px 15px;margin-bottom:12px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;">' +
          '<div style="font-size:0.83rem;font-weight:800;color:#103856;flex:1;min-width:200px;">' + escHtml(t.trkNoPlanBanner) + '</div>' +
          '<button type="button" onclick="window.gatWizReset()" style="background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#fff;border:none;border-radius:11px;padding:9px 14px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + escHtml(t.trkStartSetupBtn) + '</button>' +
        '</div>'
      : "";

    const trapBanner = bp.trapWarningKey
      ? '<div style="background:#fff1f2;border:2px solid #e11d48;border-radius:14px;padding:12px 14px;margin:10px 0 12px 0;">' +
          '<div style="font-size:0.86rem;font-weight:900;color:#9f1239;margin-bottom:4px;">' + escHtml(t.trapAlertTitle) + '</div>' +
          '<div style="font-size:0.8rem;color:#881337;line-height:1.48;font-weight:600;">' + escHtml(t.trapAlertBody) + '</div>' +
        '</div>'
      : "";

    const syncCtaHtml = !signedIn
      ? '<button type="button" onclick="if(typeof window.openDeviceSyncModal===\'function\') window.openDeviceSyncModal();" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:2px solid #38bdf8;border-radius:13px;padding:11px 15px;font-size:0.84rem;font-weight:900;cursor:pointer;margin-bottom:10px;box-shadow:0 6px 18px rgba(3,169,244,0.22);">' + escHtml(t.tlSyncBtn) + '</button>'
      : "";

    const htmlOut =
      '<div id="gat-trajectory-' + escHtml(bp.trackId || "custom") + '" dir="' + (isRtl ? "rtl" : "ltr") + '" style="max-width:760px;margin:0 auto 18px auto;">' +
        setupBannerHtml +
        '<div class="gat-tl-card">' +
          '<div class="gat-tl-head-bar">' +
            '<span class="gat-tl-sync-pill" style="background:' + (signedIn ? '#dcfce7;color:#166534;' : '#e0f2fe;color:#0369a1;') + '">' + escHtml(t.trkCustomTag) + ' • ' + doneCnt + '/' + totalCnt + ' (' + pct + '%)</span>' +
            '<button type="button" onclick="window.gatWizReset()" style="background:#f1f5f9;color:#103856;border:1px solid #cbd5e1;border-radius:999px;padding:5px 11px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + escHtml(t.tlRetakeBtn) + '</button>' +
          '</div>' +
          '<h2 style="font-size:1.18rem;font-weight:900;color:#103856;line-height:1.3;margin:0 0 8px 0;">' + escHtml(bp.trackTitle) + '</h2>' +
          '<div style="height:8px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-bottom:12px;">' +
            '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#03A9F4,#10b981);transition:width 0.25s ease;"></div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:9px;margin-bottom:12px;">' + clocksHtml + '</div>' +
          trapBanner +
          syncCtaHtml +
          '<div style="font-size:0.8rem;font-weight:800;color:#0369a1;margin:6px 0 4px 0;">' + escHtml(t.tlTapHint) + '</div>' +
          '<div class="gat-tl-spine">' + rowsHtml + '</div>' +
          '<div style="margin-top:14px;padding-top:12px;border-top:1.5px solid #e2e8f0;display:flex;flex-direction:column;gap:8px;">' +
            '<a href="' + escHtml(appUrl("hebrew-engine", "", l)) + '" style="width:100%;background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:2px solid #38bdf8;border-radius:14px;padding:14px 18px;font-size:0.93rem;font-weight:900;text-decoration:none;box-shadow:0 8px 22px rgba(3,169,244,0.28);display:flex;align-items:center;justify-content:center;gap:8px;text-align:center;box-sizing:border-box;">' +
              '<strong>' + escHtml(openDossierLabel) + '</strong>' +
            '</a>' +
            '<button type="button" onclick="window.askGatAiAboutTrackStep(\'' + escHtml(bp.stepIds[firstOpenIdx] || "") + '\',' + (firstOpenIdx + 1) + ')" style="width:100%;background:#f0f9ff;color:#0369a1;border:1.5px solid #38bdf8;border-radius:12px;padding:11px 14px;font-size:0.84rem;font-weight:900;cursor:pointer;">' + escHtml(t.tlAiBtn) + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    mount.innerHTML = htmlOut;
    if (legacyHost && legacyHost !== mount) legacyHost.innerHTML = htmlOut;
  };
  // === GAT UNIFIED TRACKER & WIZARD ROUTING OVERRIDES END ===

  window.applyUrlDeepLinkToOnboarding = function() {
    try {
      const initUrl = window.__GAT_INITIAL_URL_STATE || { search: window.location.search || "", hash: window.location.hash || "" };
      const rawSearch = initUrl.search || window.location.search || "";
      const rawHash = initUrl.hash || window.location.hash || "";
      const sp = new URLSearchParams(rawSearch);
      const isExplicitSharedDeepLink = (sp.get("s") === "1");

      // If the URL has a stale auto-replaced ?trackId= or ?wiz= WITHOUT &s=1, clean the address bar to root "/" and show Hero Landing!
      if (!isExplicitSharedDeepLink && (sp.has("trackId") || sp.has("wiz") || sp.has("g") || rawHash.indexOf("#gat-trajectory-") === 0 || rawHash.indexOf("#gat-wiz-step-") === 0)) {
        const l = getLang();
        const cleanRoot = (l === "en") ? "/" : ("/" + l + "/");
        try {
          window.history.replaceState({ gatUrl: cleanRoot }, "", cleanRoot);
          if (window.__GAT_INITIAL_URL_STATE) {
            window.__GAT_INITIAL_URL_STATE.search = "";
            window.__GAT_INITIAL_URL_STATE.hash = "";
          }
        } catch (e) {}
        window.__gatWizardState.mode = "hero_landing";
        window.__gatWizardState.forceRetake = false;
        return false;
      }

      if (!isExplicitSharedDeepLink) {
        window.__gatWizardState.mode = "hero_landing";
        return false;
      }

      let qTrackId = sp.get("trackId") || "";
      if (!qTrackId && rawHash.indexOf("#gat-trajectory-") === 0) {
        qTrackId = rawHash.replace("#gat-trajectory-", "").trim();
      }
      let qStepId = sp.get("step") || "";
      if (!qStepId && rawHash.indexOf("#gat-step-row-") === 0) {
        qStepId = rawHash.replace("#gat-step-row-", "").trim();
      }
      let qWiz = sp.get("wiz") || "";
      if (!qWiz && rawHash.indexOf("#gat-wiz-step-") === 0) {
        qWiz = rawHash.replace("#gat-wiz-step-", "").trim();
      }

      const a = window.__gatWizardState.answers;
      if (sp.get("g")) a.q1_goal = sp.get("g");
      if (sp.get("h")) a.q2_household = sp.get("h");
      if (sp.get("p")) {
        a.q2b_partner_status = sp.get("p");
        a.q2b_relationship = a.q2b_partner_status === "israeli_married" ? "married" : (a.q2b_partner_status === "israeli_unmarried" ? "unmarried" : "couple");
      }
      if (sp.get("loc")) a.q3_location = sp.get("loc");
      if (sp.get("d")) a.q4_detail = sp.get("d");
      if (sp.get("em1")) a.em_q1_loc = sp.get("em1");
      if (sp.get("em2")) a.em_q2_elig = sp.get("em2");

      if (qTrackId && typeof window.restoreGatBlueprintByTrackId === "function") {
        window._gatDeepLinkLockedBlueprint = true;
        window._gatUserClickedStartTrack = true;
        window.restoreGatBlueprintByTrackId(qTrackId, qStepId);
        if (window.__gatActiveBlueprint && (sp.get("g") || sp.get("d") || sp.get("em2"))) {
          const isEm = Boolean(a.em_q1_loc && a.em_q2_elig && !a.q1_goal);
          window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, isEm, window.__gatActiveBlueprint);
          window.renderGatOnboardingStage();
          window.renderAdaptiveTrackTracker();
        }
        return true;
      }

      const hasFullCustomAnswers = Boolean((a.q1_goal && (a.q4_detail || a.q1_goal === "visa_rejected_rescue" || a.q3_location === "visa_rejected_rescue")) || (a.em_q1_loc && a.em_q2_elig));
      if (hasFullCustomAnswers && (!qWiz || qWiz === "timeline")) {
        window._gatDeepLinkLockedBlueprint = true;
        window._gatUserClickedStartTrack = true;
        const isEm = Boolean(a.em_q1_loc && a.em_q2_elig && !a.q1_goal);
        window.__gatActiveBlueprint = buildBlueprintFromAnswers(a, isEm, window.__gatActiveBlueprint);
        window.__gatWizardState.mode = "timeline";
        window.__gatWizardState.forceRetake = false;
        window.renderGatOnboardingStage();
        window.renderAdaptiveTrackTracker();
        if (qStepId && window.__gatActiveBlueprint) {
          const sIdx = window.__gatActiveBlueprint.stepIds.indexOf(qStepId);
          if (sIdx !== -1) {
            setTimeout(function() { window.openGatStepBlueprintModal(qStepId, sIdx, true); }, 60);
          }
        }
        return true;
      }

      if (qWiz && ["intro_q1", "q2", "q2b", "q3", "q4", "em1", "em2"].indexOf(qWiz) !== -1) {
        window._gatDeepLinkLockedBlueprint = true;
        window._gatUserClickedStartTrack = true;
        window.__gatWizardState.mode = qWiz;
        window.__gatWizardState.forceRetake = true;
        window.renderGatOnboardingStage();
        return true;
      }
    } catch (e) {}
    return false;
  };

  function bootOnboarding() {
    const handledByUrl = window.applyUrlDeepLinkToOnboarding();
    if (!handledByUrl) {
      window.__gatWizardState.mode = "hero_landing";
      window.renderGatOnboardingStage();
      window.renderAdaptiveTrackTracker();
      if (isUserSignedIn() && !window.__gatActiveBlueprint && !window._gatDeepLinkLockedBlueprint) {
        window.syncGatTrackBlueprintToFirestore("load");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootOnboarding);
  } else {
    bootOnboarding();
  }
})();

// === GAT MEET SPOK EARLY ONBOARDING HOOK V1 START ===
(function initMeetSpokOnboardingBannerV1() {
  if (window._gatMeetSpokObV1) return;
  window._gatMeetSpokObV1 = true;

  const MEET_SPOK_I18N = {
    en: {
      line: "🖖 Hi, I'm <strong>Spok</strong> — your 24/7 Aliyah, Conversion &amp; Misrad HaPanim guide.",
      btn: "✨ Ask Spok →"
    },
    he: {
      line: "🖖 שלום, אני <strong>Spok (ספוק)</strong> — המלווה האישי שלכם 24/7 לעלייה, גיור ומשרד הפנים.",
      btn: "✨ שאלו את Spok ←"
    },
    fr: {
      line: "🖖 Bonjour, je suis <strong>Spok</strong> — votre guide 24/7 Aliyah, Conversion &amp; Misrad HaPanim.",
      btn: "✨ Demander à Spok →"
    },
    es: {
      line: "🖖 Hola, soy <strong>Spok</strong> — tu guía 24/7 de Aliyá, Conversión y Misrad HaPanim.",
      btn: "✨ Preguntar a Spok →"
    },
    de: {
      line: "🖖 Hallo, ich bin <strong>Spok</strong> — Ihr 24/7 Lotse für Alija, Giur &amp; Misrad HaPanim.",
      btn: "✨ Spok fragen →"
    },
    ru: {
      line: "🖖 Привет, я <strong>Spok (Спок)</strong> — ваш гид 24/7 по репатриации, гиюру и МВД Израиля.",
      btn: "✨ Спросить Spok →"
    }
  };

  function curLang() {
    const seg = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (MEET_SPOK_I18N[seg]) return seg;
    const st = String(window.appLang || window.gatLang || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return MEET_SPOK_I18N[st] ? st : "en";
  }

  function injectMeetSpokPill() {
    const stage = document.getElementById("gat-onboarding-stage");
    if (!stage || document.getElementById("gat-meet-spok-early-bar")) return;
    const mode = (window.__gatWizardState && window.__gatWizardState.mode) || "";
    if (mode && mode !== "hero_landing" && mode !== "intro_q1") return;

    const l = curLang();
    const t = MEET_SPOK_I18N[l] || MEET_SPOK_I18N.en;
    const bar = document.createElement("div");
    bar.id = "gat-meet-spok-early-bar";
    bar.dir = (l === "he") ? "rtl" : "ltr";
    bar.style.cssText = "background:#f0f9ff;border:1.5px solid #38bdf8;border-radius:14px;padding:9px 13px;margin:0 0 12px 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 4px 12px rgba(3,169,244,0.10);";
    bar.innerHTML =
      '<span style="font-size:0.82rem;color:#103856;font-weight:700;line-height:1.4;">' + t.line + '</span>' +
      '<button type="button" onclick="if(typeof window.askGatAiAboutTrackStep===\'function\'){window.askGatAiAboutTrackStep(null);}else if(typeof window.toggleGatHelpdesk===\'function\'){window.toggleGatHelpdesk(true);}" style="background:linear-gradient(135deg,#103856 0%,#03A9F4 100%);color:#ffffff;border:none;border-radius:999px;padding:6px 13px;font-size:0.78rem;font-weight:900;cursor:pointer;white-space:nowrap;">' + t.btn + '</button>';

    stage.insertBefore(bar, stage.firstChild);
  }

  if (typeof window.renderGatOnboardingStage === "function" && !window.renderGatOnboardingStage._spokWrapped) {
    const origRender = window.renderGatOnboardingStage;
    const wrapped = function() {
      const r = origRender.apply(this, arguments);
      injectMeetSpokPill();
      return r;
    };
    wrapped._spokWrapped = true;
    window.renderGatOnboardingStage = wrapped;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { setTimeout(injectMeetSpokPill, 30); });
  } else {
    setTimeout(injectMeetSpokPill, 30);
  }
})();
// === GAT MEET SPOK EARLY ONBOARDING HOOK V1 END ===

/* === GAT_SPOK_BOTTOM_PILL_NEXT_TO_FAB_V1 === */
(function initGatSpokBottomPillV2() {
  const ASK_SPOK_6L = {
    en: "✨ Ask Spok →",
    he: "✨ שאלו את ספוק ←",
    fr: "✨ Demander à Spok →",
    es: "✨ Preguntar a Spok →",
    de: "✨ Spok fragen →",
    ru: "✨ Спросить Спока →"
  };

  const SPOK_INTRO_MARKERS = [
    "Hi, I'm Spok",
    "Hi, I’m Spok",
    "24/7 Aliyah, Conversion",
    "נעים מאוד, אני ספוק",
    "מדריך העלייה, הגיור ומשרד הפנים",
    "Salut, je suis Spok",
    "Bonjour, je suis Spok",
    "Hola, soy Spok",
    "Hallo, ich bin Spok",
    "Привет, я Спок",
    "Здравствуйте, я Спок"
  ];

  function getActiveLang() {
    const pathSeg = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (["he", "fr", "es", "de", "ru"].includes(pathSeg)) return pathSeg;
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang && ASK_SPOK_6L[urlLang.toLowerCase()]) return urlLang.toLowerCase();
    const gLang = String(window.gatLang || window.appLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").toLowerCase().slice(0, 2);
    return ASK_SPOK_6L[gLang] ? gLang : "en";
  }

  function injectSpokLayoutCss() {
    let st = document.getElementById("gat-spok-bottom-pill-css");
    if (!st) {
      st = document.createElement("style");
      st.id = "gat-spok-bottom-pill-css";
      document.head.appendChild(st);
    }
    st.textContent = `
      .exodus-alert,
      #exodus-alert,
      #gat-spok-top-banner,
      .gat-spok-top-banner,
      #spok-intro-card,
      .spok-intro-card,
      #gat-spok-intro-box,
      .gat-spok-intro-box,
      [data-spok-intro-hidden="1"] {
        display: none !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        border: none !important;
      }
      #gat-ask-spok-bottom-pill {
        position: fixed;
        z-index: 9998;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        color: #ffffff !important;
        font-family: inherit;
        font-size: 0.92rem;
        font-weight: 850;
        padding: 10px 18px;
        border-radius: 999px;
        border: 1.5px solid rgba(255, 255, 255, 0.35);
        box-shadow: 0 6px 18px rgba(2, 132, 199, 0.38), 0 2px 6px rgba(15, 23, 42, 0.18);
        cursor: pointer;
        white-space: nowrap;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
      }
      #gat-ask-spok-bottom-pill:active {
        transform: scale(0.96);
      }
    `;
  }

  function removeTopSpokIntroBox() {
    // 1. Always hide .exodus-alert and known spok intro IDs
    document.querySelectorAll(".exodus-alert, #exodus-alert, #gat-spok-top-banner, .gat-spok-top-banner, #spok-intro-card, .spok-intro-card, #gat-spok-intro-box, .gat-spok-intro-box").forEach(el => {
      el.setAttribute("data-spok-intro-hidden", "1");
    });

    // 2. Find any element containing the Spok greeting or top "Ask Spok" button
    const allEls = document.querySelectorAll("div, section, article, aside, header");
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      if (el.id === "gat-ask-spok-bottom-pill" || el.getAttribute("data-spok-intro-hidden") === "1") continue;
      // Never hide a parent that also holds the main funnel content ("Answer 4 quick questions" / "Skip Jewish Agency" / "15,000")
      const txt = (el.textContent || "").trim();
      if (!txt || txt.length > 260) continue;
      if (txt.includes("15,000") || txt.includes("40,000") || txt.includes("Teudat Zehut") || txt.includes("NBN")) continue;

      const hasMarker = SPOK_INTRO_MARKERS.some(m => txt.includes(m)) ||
        (txt.includes("Spok") && txt.includes("24/7")) ||
        (txt.includes("ספוק") && txt.includes("24/7"));

      if (hasMarker) {
        // Walk up to the outermost card wrapper that still only contains this Spok intro (< 260 chars)
        let target = el;
        while (
          target.parentElement &&
          target.parentElement.tagName !== "BODY" &&
          target.parentElement.tagName !== "MAIN" &&
          target.parentElement.id !== "view-0" &&
          target.parentElement.id !== "gat-3track-funnel-card" &&
          ((target.parentElement.textContent || "").trim().length < 260)
        ) {
          target = target.parentElement;
        }
        target.setAttribute("data-spok-intro-hidden", "1");
      }
    }
  }

  function findCircleFab() {
    return (
      document.getElementById("gat-hd-fab") ||
      document.querySelector(".gat-hd-fab") ||
      document.getElementById("hd-fab") ||
      document.querySelector("[onclick*='openHdDrawer'], [onclick*='toggleHdDrawer']")
    );
  }

  function syncBottomPillPositionAndText() {
    injectSpokLayoutCss();
    removeTopSpokIntroBox();

    const fab = findCircleFab();
    let pill = document.getElementById("gat-ask-spok-bottom-pill");
    if (!pill) {
      pill = document.createElement("button");
      pill.id = "gat-ask-spok-bottom-pill";
      pill.type = "button";
      pill.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const f = findCircleFab();
        if (f) {
          f.click();
        } else if (typeof window.openHdDrawer === "function") {
          window.openHdDrawer();
        } else if (typeof window.toggleHdDrawer === "function") {
          window.toggleHdDrawer(true);
        }
      });
      document.body.appendChild(pill);
    }

    const lang = getActiveLang();
    const lbl = ASK_SPOK_6L[lang] || ASK_SPOK_6L.en;
    if (pill.textContent !== lbl) {
      pill.textContent = lbl;
    }
    pill.dir = (lang === "he") ? "rtl" : "ltr";

    if (fab) {
      const rect = fab.getBoundingClientRect();
      const fabStyle = window.getComputedStyle(fab);
      const isHidden = fabStyle.display === "none" || fabStyle.visibility === "hidden" || rect.width === 0;
      if (isHidden) {
        pill.style.display = "none";
        return;
      }
      pill.style.display = "inline-flex";
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;

      const pillHeight = pill.offsetHeight || 40;
      const centerY = rect.top + rect.height / 2;
      const bottomPx = Math.max(12, Math.round(vh - centerY - pillHeight / 2));
      pill.style.bottom = bottomPx + "px";
      pill.style.top = "auto";

      if (rect.left > vw / 2) {
        const rightPx = Math.round(vw - rect.left + 10);
        pill.style.right = rightPx + "px";
        pill.style.left = "auto";
      } else {
        const leftPx = Math.round(rect.right + 10);
        pill.style.left = leftPx + "px";
        pill.style.right = "auto";
      }
    } else {
      pill.style.bottom = "90px";
      pill.style.right = "84px";
      pill.style.left = "auto";
    }
  }

  window.syncGatSpokBottomPill = syncBottomPillPositionAndText;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncBottomPillPositionAndText);
  } else {
    syncBottomPillPositionAndText();
  }
  window.addEventListener("resize", syncBottomPillPositionAndText, { passive: true });
  window.addEventListener("scroll", syncBottomPillPositionAndText, { passive: true });
  [50, 150, 350, 700, 1200].forEach(ms => setTimeout(syncBottomPillPositionAndText, ms));

  ["setLang", "switchLang", "applyLang"].forEach(fnName => {
    const orig = window[fnName];
    if (typeof orig === "function" && !orig._spokPillWrapped) {
      const wrapped = function() {
        const r = orig.apply(this, arguments);
        setTimeout(syncBottomPillPositionAndText, 30);
        return r;
      };
      wrapped._spokPillWrapped = true;
      window[fnName] = wrapped;
    }
  });

  const obs = new MutationObserver(() => {
    removeTopSpokIntroBox();
  });
  if (document.body) {
    obs.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      obs.observe(document.body, { childList: true, subtree: true });
    });
  }
})();

// === DIRECT SPOK DRAWER OPENER INSIDE ONBOARDING_TRAJECTORY.JS ===
(function(){
  var lastToggleMs = 0;
  var downX = 0, downY = 0;

  window.gatOpenSpokDrawerNow = function() {
    if (typeof window.toggleGatHelpdesk === "function") {
      try { window.toggleGatHelpdesk(true); } catch (e) {}
    }
    var d = document.getElementById("gat-hd-drawer") || document.getElementById("gat-spok-drawer");
    if (d) {
      d.classList.add("open");
      d.setAttribute("data-v16-open", "1");
      d.style.setProperty("display", "flex", "important");
      d.style.setProperty("visibility", "visible", "important");
      d.style.setProperty("opacity", "1", "important");
      d.style.setProperty("z-index", "2147483645", "important");
      d.style.setProperty("pointer-events", "auto", "important");
      // Ensure drawer is never off-screen on mobile viewports
      if (window.innerWidth < 600) {
        d.style.setProperty("left", "8px", "important");
        d.style.setProperty("right", "8px", "important");
        d.style.setProperty("bottom", "10px", "important");
      }
    }
    setTimeout(function() {
      var inp = document.getElementById("gat-hd-input") || document.getElementById("gat-spok-input");
      if (inp && window.innerWidth >= 768) inp.focus();
    }, 60);
  };

  window.gatCloseSpokDrawerNow = function() {
    if (typeof window.toggleGatHelpdesk === "function") {
      try { window.toggleGatHelpdesk(false); } catch (e) {}
    }
    var d = document.getElementById("gat-hd-drawer") || document.getElementById("gat-spok-drawer");
    if (d) {
      d.classList.remove("open");
      d.setAttribute("data-v16-open", "0");
      d.style.setProperty("display", "none", "important");
    }
    document.body.classList.remove("gat-hd-lock-scroll");
  };

  function recordDown(e) {
    var pt = (e.touches && e.touches[0]) ? e.touches[0] : e;
    downX = pt.clientX || 0;
    downY = pt.clientY || 0;
  }

  window.addEventListener("touchstart", recordDown, { capture: true, passive: true });
  window.addEventListener("pointerdown", recordDown, { capture: true, passive: true });
  window.addEventListener("mousedown", recordDown, { capture: true, passive: true });

  function isLauncherEl(t) {
    if (!t || !t.closest) return null;
    var hit = t.closest(
      "#gat-spok-fab, #gat-draggable-spok-fab, #gat-hd-fab, " +
      "#gat-ask-spok-inline-pill, #gat-hero-inline-spok-pill, " +
      ".gat-vulcan-hand"
    );
    if (hit) return hit;
    var btn = t.closest("button, [role='button'], a, div");
    if (btn && btn.children.length <= 3) {
      var txt = (btn.textContent || "").trim();
      if (txt === "\ud83d\udd96" || /(?:Ask\s*Spok|שאל\s*את\s*ספוק|Demander\s*à\s*Spok|Preguntar\s*a\s*Spok|Spok\s*fragen|Спросить\s*Спок)/i.test(txt)) {
        return btn;
      }
    }
    return null;
  }

  function handleTapOrClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var pt = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : e;
    var moved = Math.hypot((pt.clientX || downX) - downX, (pt.clientY || downY) - downY);

    // 1. Minimize / Close button inside the drawer
    if (t.closest("#gat-hd-min, #gat-spok-close, #gat-hd-close, .gat-hd-mini-btn")) {
      if (moved > 20) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      if (Date.now() - lastToggleMs < 350) return;
      lastToggleMs = Date.now();
      window.gatCloseSpokDrawerNow();
      return;
    }

    // 2. 🖖 icon or Ask Spok callout in any language (EN, RU, HE, FR, ES, DE)
    var hit = isLauncherEl(t);
    if (hit) {
      if (moved > 16) return; // Ignore drags
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      if (Date.now() - lastToggleMs < 420) return; // Prevent touchend + click double-toggle
      lastToggleMs = Date.now();

      var d = document.getElementById("gat-hd-drawer") || document.getElementById("gat-spok-drawer");
      var isOpen = d && d.classList.contains("open") && window.getComputedStyle(d).display !== "none" && d.offsetHeight > 40;
      if (isOpen) window.gatCloseSpokDrawerNow();
      else window.gatOpenSpokDrawerNow();
    }
  }

  window.addEventListener("touchend", handleTapOrClick, { capture: true, passive: false });
  window.addEventListener("pointerup", handleTapOrClick, { capture: true, passive: false });
  window.addEventListener("click", handleTapOrClick, { capture: true, passive: false });
})();
