// === GAT 24/7 IN-APP AI HELPDESK & CONCIERGE WIDGET ===
(function initGatAiHelpdeskWidget() {
  if (window._gatHelpdeskMounted) return;
  window._gatHelpdeskMounted = true;

  const STORAGE_KEY = "gat_hd_rolling_v2";
  const POS_KEY = "gat_hd_fab_pos_v1";
  const MAX_ROLLING_MSGS = 8;

  const HD_I18N = {
    en: {
      title: "✨ Tracking Partner",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "Ask about this form, deadlines, or passes...",
      send: "Ask",
      welcome: "👋 **Shalom! I'm your personal Giyur & Aliyah Tracking Partner.**\n\n*(Tip: You can drag my ✨ icon anywhere on screen!)*\n\nTap any status or form below — I'll **open that page behind this window**, explain what to watch out for, and you can tap **⎯ Minimize** to read the page and tap **✨** anytime to continue!",
      tracksTitle: "📍 TAP YOUR STATUS OR FORM:",
      tracks: [
        { icon: "💑", label: "Spousal / Partner Visa (Form Ash/6 & Ash/3)", mod: "hebrew-engine", form: "ash6", q: "I need the Spousal / Partner Visa (Nohal 5.2.0008 / 5.2.0009 Form Ash/6 & Ash/3). Open it and explain the sections, time limits, and what I need." },
        { icon: "✈️", label: "In-Israel Aliyah / Shinui Ma'amad (Form Ash/456)", mod: "hebrew-engine", form: "ash456", q: "I am making Aliyah from inside Israel (Shinui Ma'amad Form Ash/456). Open the form and explain the sections and 24-month Sal Klita rule." },
        { icon: "🏛️", label: "Va'adat Charigim / Conversion Visa (Form Ash/1)", mod: "hebrew-engine", form: "ash1", q: "I need to pass Va'adat Charigim (Exceptions Committee Form Ash/1) for Giyur. Open Form Ash/1 and explain the 180-day clock and requirements." },
        { icon: "🪪", label: "First Teudat Zehut / Passport / Nativ CV (MR/14a, MR/14b)", mod: "hebrew-engine", form: "mr14a", q: "I need First Teudat Zehut (MR/14a), Israeli Passport (MR/14b), or Nativ Security CV. Open it and explain what to leave blank for the clerk." },
        { icon: "🕍", label: "Beit Din 700 Questions & 56 Shabbat Songs/Prayers", mod: "beit-din-150", form: "", q: "How do the 700 Beit Din Tribunal Questions and 56 Shabbat Songs/Prayers Karaoke Grader prepare me for the Beit Din?" },
        { icon: "🤝", label: "Red-Ribbon Notary, Rabbi, Kallah & Lawyer Escort", mod: "vetted-team", form: "", q: "Explain your Vetted Red-Ribbon Notary Translation, Sponsoring Rabbi (Rav Melaveh), Madrichat Kallah, and 1-Hour Lawyer Escort." }
      ],
      jumpReadBtn: "📖 Minimize & Read Page (Tap ✨ to Resume)"
    },
    he: {
      title: "✨ שותף למסלול",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "שאל על הטופס, מועדים או חבילות...",
      send: "שאל",
      welcome: "👋 **שלום! אני השותף האישי שלך למסלול הגיור והעלייה.**\n\n*(טיפ: ניתן לגרור את כפתור ה-✨ לכל מקום במסך!)*\n\nלחצו על המעמד או הטופס למטה — אני **אפתח את העמוד ברקע**, אסביר ממה להיזהר, ותוכלו ללחוץ על **⎯ מזער** כדי לקרוא את העמוד ולחזור אליי בלחיצה על **✨**!",
      tracksTitle: "📍 בחר מעמד או טופס:",
      tracks: [
        { icon: "💑", label: "הליך מדורג לבני זוג (טופס אש/6 ואש/3)", mod: "hebrew-engine", form: "ash6", q: "אני צריך אשרת בני זוג (נוהל 5.2.0008 / 5.2.0009 טופס אש/6 ואש/3). פתח לי את העמוד והסבר על הסעיפים ולוחות הזמנים." },
        { icon: "✈️", label: "עלייה מתוך ישראל / שינוי מעמד (טופס אש/456)", mod: "hebrew-engine", form: "ash456", q: "אני עושה שינוי מעמד לעולה מתוך ישראל (טופס אש/456). פתח את הטופס והסבר איך זה עובד." },
        { icon: "🏛️", label: "וועדת חריגים לגיור (טופס אש/1)", mod: "hebrew-engine", form: "ash1", q: "אני צריך לעבור וועדת חריגים לגיור (טופס אש/1). פתח את הטופס והסבר את המלכודות." },
        { icon: "🪪", label: "תעודת זהות ראשונה / דרכון / שאלון נתיב (מר/14א, מר/14ב)", mod: "hebrew-engine", form: "mr14a", q: "אני צריך טופס תעודת זהות ראשונה (מר/14א), דרכון (מר/14ב) או שאלון נתיב." },
        { icon: "🕍", label: "700 שאלות בית הדין ו-56 שירי שבת ותפילות", mod: "beit-din-150", form: "", q: "איך מאגר 700 השאלות לבית הדין ואימון 56 שירי השבת והתפילות מכינים אותי לדיינים?" },
        { icon: "🤝", label: "תרגום נוטריוני, רב מלווה, מדריכת כלה וליווי עו״ד", mod: "vetted-team", form: "", q: "הסבר לי על שירותי תרגום נוטריוני (סרט אדום), רב מלווה, מדריכת כלה וליווי עו״ד במשרד הפנים." }
      ],
      jumpReadBtn: "📖 מזער וקרא את העמוד (לחץ ✨ להמשך)"
    },
    fr: {
      title: "✨ Partenaire de Suivi",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "Question sur ce formulaire, délais ou pass...",
      send: "Envoyer",
      welcome: "👋 **Chalom ! Je suis votre Partenaire de Suivi Giyur & Aliyah.**\n\n*(Astuce : vous pouvez déplacer le bouton ✨ où vous voulez sur l'écran !)*\n\nTouchez votre statut ou formulaire ci-dessous : j'ouvre **la page en arrière-plan**, je vous explique les délais et pièges, et vous pouvez toucher **⎯ Réduire** pour lire la page puis **✨** pour continuer !",
      tracksTitle: "📍 TOUCHEZ VOTRE STATUT OU FORMULAIRE :",
      tracks: [
        { icon: "💑", label: "Visa Conjoint / Partenaire (Ash/6 & Ash/3)", mod: "hebrew-engine", form: "ash6", q: "J'ai besoin du visa conjoint (Nohal 5.2.0008 / 5.2.0009 Formulaire Ash/6 & Ash/3). Ouvrez la page et expliquez-moi." },
        { icon: "✈️", label: "Aliyah en Israël / Shinui Ma'amad (Ash/456)", mod: "hebrew-engine", form: "ash456", q: "Je fais mon Aliyah depuis Israël (Shinui Ma'amad Formulaire Ash/456). Ouvrez le formulaire et expliquez-moi." },
        { icon: "🏛️", label: "Va'adat Charigim / Conversion (Formulaire Ash/1)", mod: "hebrew-engine", form: "ash1", q: "Je dois passer la Va'adat Charigim (Formulaire Ash/1) pour le Giyur. Ouvrez Ash/1 et expliquez les pièges." },
        { icon: "🪪", label: "1ère Teudat Zehut / Passeport / CV Nativ (MR/14a/b)", mod: "hebrew-engine", form: "mr14a", q: "J'ai besoin de la première Teudat Zehut (MR/14a), Passeport (MR/14b) ou CV Nativ." },
        { icon: "🕍", label: "700 Questions Beit Din & 56 Chants/Prières", mod: "beit-din-150", form: "", q: "Comment les 700 questions du Beit Din et les 56 chants/prières de Chabbat me préparent-ils au tribunal ?" },
        { icon: "🤝", label: "Notaire Ruban Rouge, Rabbin, Kallah & Avocat", mod: "vetted-team", form: "", q: "Expliquez-moi vos services Notaire Ruban Rouge, Rabbin accompagnateur, Madrichat Kallah et Avocat au Misrad HaPanim." }
      ],
      jumpReadBtn: "📖 Réduire & lire la page (Touchez ✨ pour reprendre)"
    },
    es: {
      title: "✨ Socio de Seguimiento",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "Pregunta sobre este formulario, plazos o pases...",
      send: "Enviar",
      welcome: "👋 **¡Shalom! Soy tu Socio de Seguimiento de Giyur y Aliyah.**\n\n*(Consejo: ¡puedes arrastrar el botón ✨ a cualquier parte de la pantalla!)*\n\nToca el estatus o formulario abajo: abriré **esa página de fondo**, te explicaré las trampas y plazos, y podrás tocar **⎯ Minimizar** para leer la página y **✨** para continuar.",
      tracksTitle: "📍 TOCA TU ESTATUS O FORMULARIO:",
      tracks: [
        { icon: "💑", label: "Visa de Pareja / Cónyuge (Formulario Ash/6 y Ash/3)", mod: "hebrew-engine", form: "ash6", q: "Necesito la visa de pareja (Nohal 5.2.0008 / 5.2.0009 Formulario Ash/6 y Ash/3). Abre la página y explícame." },
        { icon: "✈️", label: "Aliyah en Israel / Shinui Ma'amad (Ash/456)", mod: "hebrew-engine", form: "ash456", q: "Hago Aliyah dentro de Israel (Shinui Ma'amad Formulario Ash/456). Abre el formulario y explícame." },
        { icon: "🏛️", label: "Va'adat Jariguim / Conversión (Formulario Ash/1)", mod: "hebrew-engine", form: "ash1", q: "Necesito pasar Va'adat Jariguim (Formulario Ash/1) para Giyur. Abre Ash/1 y explica las trampas." },
        { icon: "🪪", label: "1ª Teudat Zehut / Pasaporte / CV Nativ (MR/14a/b)", mod: "hebrew-engine", form: "mr14a", q: "Necesito la primera Teudat Zehut (MR/14a), Pasaporte (MR/14b) o CV Nativ." },
        { icon: "🕍", label: "700 Preguntas Beit Din y 56 Canciones/Rezos", mod: "beit-din-150", form: "", q: "¿Cómo me preparan las 700 preguntas del Beit Din y las 56 canciones/rezos de Shabat?" },
        { icon: "🤝", label: "Notario Cinta Roja, Rabino, Kalá y Abogado", mod: "vetted-team", form: "", q: "Explícame los servicios de Notario Cinta Roja, Rabino patrocinador, Madrijat Kalá y Abogado en Misrad HaPanim." }
      ],
      jumpReadBtn: "📖 Minimizar y leer página (Toca ✨ para seguir)"
    },
    de: {
      title: "✨ Track-Partner",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "Frage zu Formular, Fristen oder Pässen...",
      send: "Fragen",
      welcome: "👋 **Schalom! Ich bin Ihr persönlicher Giyur & Aliyah Track-Partner.**\n\n*(Tipp: Sie können das ✨-Symbol frei auf dem Bildschirm verschieben!)*\n\nTippen Sie unten auf Ihr Formular oder Ihren Status: Ich **öffne die Seite im Hintergrund**, erkläre Fristen & Fallen, und Sie können auf **⎯ Minimieren** tippen, um in Ruhe zu lesen, und danach auf **✨**!",
      tracksTitle: "📍 STATUS ODER FORMULAR ANTIPPEN:",
      tracks: [
        { icon: "💑", label: "Ehepartner-Visum (Formular Ash/6 & Ash/3)", mod: "hebrew-engine", form: "ash6", q: "Ich brauche das Ehepartner-Visum (Nohal 5.2.0008 / 5.2.0009 Formular Ash/6 & Ash/3). Öffne die Seite und erkläre es mir." },
        { icon: "✈️", label: "Aliyah in Israel / Shinui Ma'amad (Ash/456)", mod: "hebrew-engine", form: "ash456", q: "Ich mache Aliyah innerhalb Israels (Shinui Ma'amad Formular Ash/456). Öffne das Formular und erkläre es." },
        { icon: "🏛️", label: "Va'adat Charigim / Giur-Visum (Formular Ash/1)", mod: "hebrew-engine", form: "ash1", q: "Ich muss durch die Va'adat Charigim (Formular Ash/1) für den Giur. Öffne Ash/1 und erkläre die Fallen." },
        { icon: "🪪", label: "1. Teudat Zehut / Reisepass / Nativ-CV (MR/14a/b)", mod: "hebrew-engine", form: "mr14a", q: "Ich benötige die erste Teudat Zehut (MR/14a), den Pass (MR/14b) oder den Nativ-Lebenslauf." },
        { icon: "🕍", label: "700 Beit-Din-Fragen & 56 Schabbat-Lieder/Gebete", mod: "beit-din-150", form: "", q: "Wie bereiten mich die 700 Beit-Din-Fragen und 56 Schabbat-Lieder/Gebete auf das Tribunal vor?" },
        { icon: "🤝", label: "Rotband-Notar, Rabbiner, Kallah & Anwalts-Begleitung", mod: "vetted-team", form: "", q: "Erkläre mir die Services für Rotband-Notar, begleitenden Rabbiner, Madrichat Kallah und Anwalts-Begleitung." }
      ],
      jumpReadBtn: "📖 Minimieren & Seite lesen (✨ zum Fortsetzen)"
    },
    ru: {
      title: "✨ Партнёр по треку",
      clearBtn: "↺",
      minBtn: "—",
      waBtn: "📲",
      placeholder: "Спросите про анкету, сроки или тариф...",
      send: "Спросить",
      welcome: "👋 **Шалом! Я ваш персональный партнёр по треку гиюра и репатриации.**\n\n*(Совет: значок ✨ можно перетащить в любое удобное место экрана!)*\n\nНажмите на ваш статус или анкету ниже — я **открою эту страницу на фоне**, объясню все сроки и ловушки, а вы сможете нажать **⎯ Свернуть**, изучить страницу и нажать **✨**, чтобы продолжить!",
      tracksTitle: "📍 ВЫБЕРИТЕ СТАТУС ИЛИ АНКЕТУ МВД:",
      tracks: [
        { icon: "💑", label: "Виза супругов / партнёров (ССТ Анкета Аш/6 и Аш/3)", mod: "hebrew-engine", form: "ash6", q: "Мне нужна виза супругов / ССТ (Ноаль 5.2.0008 / 5.2.0009, анкета Аш/6 и Аш/3). Открой страницу и объясни разделы и сроки." },
        { icon: "✈️", label: "Репатриация внутри Израиля / Шинуй Маамад (Аш/456)", mod: "hebrew-engine", form: "ash456", q: "Я делаю репатриацию внутри Израиля (Шинуй Маамад, анкета Аш/456). Открой анкету и объясни процесс." },
        { icon: "🏛️", label: "Ваадат Харигим / Виза для гиюра (Анкета Аш/1)", mod: "hebrew-engine", form: "ash1", q: "Мне нужно пройти Ваадат Харигим (анкета Аш/1) для гиюра. Открой Аш/1 и объясни подводные камни." },
        { icon: "🪪", label: "Первый Теудат-Зеут / Даркон / Анкета Натив (МР/14а/б)", mod: "hebrew-engine", form: "mr14a", q: "Мне нужен первый Теудат-Зеут (МР/14а), загранпаспорт (МР/14б) или 11-стр. анкета Натив." },
        { icon: "🕍", label: "700 вопросов Бейт-Дина и 56 песен/молитв караоке", mod: "beit-din-150", form: "", q: "Как 700 вопросов Бейт-Дина и караоке-тренажёр 56 песен/молитв готовят к раввинскому суду?" },
        { icon: "🤝", label: "Нотариус (красная лента), Раввин, Калла и Адвокат в МВД", mod: "vetted-team", form: "", q: "Расскажи про нотариальный перевод с красной лентой, сопровождающего раввина, Мадрихат Калла и адвоката в МВД." }
      ],
      jumpReadBtn: "📖 Свернуть и изучить страницу (Нажмите ✨ для продолжения)"
    }
  };

  function loadRollingHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.slice(-MAX_ROLLING_MSGS) : [];
    } catch (e) {
      return [];
    }
  }

  function saveRollingHistory(arr) {
    try {
      const trimmed = Array.isArray(arr) ? arr.slice(-MAX_ROLLING_MSGS) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      window._gatHelpdeskHistory = trimmed;
    } catch (e) {}
  }

  window._gatHelpdeskHistory = loadRollingHistory();

  function getLang() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (HD_I18N[pathLang]) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return HD_I18N[l] ? l : "en";
  }

  function formatMd(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  // Works both inside /app/ AND from any landing page (/, /he/, /fr/, /es/, /de/, /ru/)!
    // Works inside /app/ AND on any landing/spoke page — opens modules, forms, OR specific Free Truth Popups (obs / term)!
  window.gatNavigateAndMinimize = function(modName, formKey, shouldMinimize) {
    try {
      if (modName === "obs") {
        if (typeof window.openObstacle === "function") {
          window.openObstacle(Number(formKey || 0));
          if (shouldMinimize) window.toggleGatHelpdesk(false, true);
          return;
        } else {
          if (shouldMinimize) window.toggleGatHelpdesk(false, true);
          window.location.href = "/?obs=" + encodeURIComponent(formKey || "0");
          return;
        }
      }
      if (modName === "term") {
        if (typeof window.openTerm === "function") {
          window.openTerm(String(formKey || "go_bag"));
          if (shouldMinimize) window.toggleGatHelpdesk(false, true);
          return;
        } else {
          if (shouldMinimize) window.toggleGatHelpdesk(false, true);
          window.location.href = "/?term=" + encodeURIComponent(formKey || "go_bag");
          return;
        }
      }
      if (modName === "beit-din") modName = "beit-din-150";
      if (modName === "couples-sim") modName = "couples-sync";
      const isInsideApp = typeof window.openMod === "function";

      if (!isInsideApp) {
        if (shouldMinimize) {
          window.toggleGatHelpdesk(false, true);
          const targetUrl = "/app/?mod=" + encodeURIComponent(modName || "hebrew-engine") + (formKey ? "&form=" + encodeURIComponent(formKey) : "");
          window.location.href = targetUrl;
        }
        return;
      }

      if (modName === "paywall") {
        if (typeof window.openProPaywall === "function") window.openProPaywall();
      } else if (modName && typeof window.openMod === "function") {
        window.openMod(modName);
      }
      if (formKey) {
        window.activePibaFormKey = formKey;
        if (typeof window.switchActivePibaForm === "function") {
          window.switchActivePibaForm(formKey);
        } else if (typeof window.selectPibaFormTab === "function") {
          window.selectPibaFormTab(formKey);
        } else {
          const sel = document.querySelector('[data-form-key="' + formKey + '"], button[onclick*="\'' + formKey + '\'"]');
          if (sel && typeof sel.click === "function") sel.click();
        }
      }
      if (shouldMinimize) {
        window.toggleGatHelpdesk(false, true);
      }
    } catch (e) {
      console.warn("gatNavigateAndMinimize note:", e);
    }
  };

  // Auto-open ?obs=... or ?term=... when arriving on homepage from /app/
  setTimeout(function() {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.has("obs") && typeof window.openObstacle === "function") {
        window.openObstacle(Number(sp.get("obs")));
      } else if (sp.has("term") && typeof window.openTerm === "function") {
        window.openTerm(sp.get("term"));
      }
    } catch (e) {}
  }, 350);

    function parseReplyAndBuildHtml(rawReply, t) {
    let clean = String(rawReply || "");
    const askMatches = [];
    const navMatches = [];
    let cryProblemEncoded = "";
    clean = clean.replace(/\[\[CRY_HELP:([^\]]*)\]\]/gi, function(_, enc) {
      cryProblemEncoded = (enc || "").trim();
      return "";
    });
    const askRegex = new RegExp("\\[\\[ASK:([^|\\r\\n]+)\\|([\\s\\S]*?)\\]\\]", "gi");
    clean = clean.replace(askRegex, function(_, qStr, lblStr) {
      askMatches.push({ q: (qStr || "").trim(), label: (lblStr || "").trim() });
      return "";
    });
    const navRegex = new RegExp("\\[\\[NAV:([^|\\r\\n]+)\\|([^|\\r\\n]*)(?:\\|([\\s\\S]*?))?\\]\\]", "gi");
    clean = clean.replace(navRegex, function(_, m1, m2, m3) {
      navMatches.push({ mod: (m1 || "").trim(), form: (m2 || "").trim(), label: (m3 || "").trim() });
      return "";
    }).trim();

    let html = '<div>' + formatMd(clean) + '</div>';
    if (askMatches.length > 0) {
      html += '<div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">';
      askMatches.forEach(function(am) {
        const safeQ = am.q.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        html += '<button type="button" class="gat-hd-track-card" style="background:#fffbeb;border:2px solid #f59e0b;color:#78350f;padding:11px 13px;font-size:0.84rem;" onclick="window.sendGatHelpdeskMsg(\'' + safeQ + '\')">' + am.label + '</button>';
      });
      html += '</div>';
    }
    if (navMatches.length > 0) {
      navMatches.forEach(function(nm, idx) {
        const btnLbl = nm.label || t.jumpReadBtn;
        const bgStyle = idx === 0
          ? "background:linear-gradient(135deg,#0288D1 0%,#03A9F4 100%);color:#ffffff;border:none;"
          : "background:#f0f9ff;color:#082548;border:1.5px solid #7dd3fc;margin-top:6px;";
        html += '<button type="button" class="gat-hd-jump-btn" style="' + bgStyle + '" onclick="window.gatNavigateAndMinimize(\'' + nm.mod + '\', \'' + nm.form + '\', true)">' + btnLbl + '</button>';
      });
    }
    if (cryProblemEncoded) {
      const savedWa = (localStorage.getItem("gat_wa_phone") || "").replace(/"/g, "&quot;");
      html += '<div style="margin-top:10px;background:#fffbeb;border:2px solid #f59e0b;border-radius:12px;padding:10px 11px;color:#0f172a;">' +
        '<div style="font-weight:900;font-size:0.8rem;color:#b45309;margin-bottom:4px;">📲 Still stuck? Leave your WhatsApp for our tech desk:</div>' +
        '<input type="tel" id="gat-cry-wa-inp" value="' + savedWa + '" placeholder="+972-50-000-0000 (Your WhatsApp #)" style="width:100%;padding:7px 9px;border-radius:8px;border:1.5px solid #fcd34d;background:#fff;font-size:0.8rem;margin-bottom:6px;" />' +
        '<input type="text" id="gat-cry-extra-inp" placeholder="Optional: Any extra detail (form/button)" style="width:100%;padding:7px 9px;border-radius:8px;border:1.5px solid #fcd34d;background:#fff;font-size:0.78rem;margin-bottom:7px;" />' +
        '<button type="button" id="gat-cry-send-btn" onclick="window.submitPreAiCryForHelp(\'' + cryProblemEncoded.replace(/'/g, "\\'") + '\')" style="width:100%;background:linear-gradient(135deg,#d97706 0%,#b45309 100%);color:#fff;border:none;border-radius:8px;padding:8px 11px;font-size:0.8rem;font-weight:900;cursor:pointer;">🚀 Send Issue + My WhatsApp to Tech Desk</button>' +
        '<div id="gat-cry-status" style="display:none;margin-top:6px;font-size:0.76rem;line-height:1.38;"></div>' +
      '</div>';
    }
    if (navMatches.length > 0 || cryProblemEncoded) {
      return {
        html,
        navMod: navMatches[0] ? navMatches[0].mod : "",
        navForm: navMatches[0] ? navMatches[0].form : ""
      };
    }
    const targetMod = window.currentMod || "hebrew-engine";
    const targetForm = window.activePibaFormKey || "";
    html += '<button type="button" class="gat-hd-jump-btn" onclick="window.gatNavigateAndMinimize(\'' + targetMod + '\', \'' + targetForm + '\', true)">' + t.jumpReadBtn + '</button>';
    return { html, navMod: "", navForm: "" };
  }

  function applySavedFabPosition(fab) {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (!raw) return;
      const pos = JSON.parse(raw);
      if (typeof pos.x === "number" && typeof pos.y === "number") {
        const maxX = window.innerWidth - 62;
        const maxY = window.innerHeight - 62;
        const clampedX = Math.max(8, Math.min(maxX, pos.x));
        const clampedY = Math.max(8, Math.min(maxY, pos.y));
        fab.style.left = clampedX + "px";
        fab.style.top = clampedY + "px";
        fab.style.right = "auto";
        fab.style.bottom = "auto";
      }
    } catch (e) {}
  }

  function makeFabDraggable(fab) {
    let isDown = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;

    function onStart(clientX, clientY) {
      isDown = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;
      const rect = fab.getBoundingClientRect();
      origLeft = rect.left;
      origTop = rect.top;
      fab.style.transition = "none";
    }

    function onMove(clientX, clientY, e) {
      if (!isDown) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        hasMoved = true;
      }
      if (!hasMoved) return;
      if (e && e.cancelable) e.preventDefault();
      const maxX = window.innerWidth - 60;
      const maxY = window.innerHeight - 60;
      const nextX = Math.max(8, Math.min(maxX, origLeft + dx));
      const nextY = Math.max(8, Math.min(maxY, origTop + dy));
      fab.style.left = nextX + "px";
      fab.style.top = nextY + "px";
      fab.style.right = "auto";
      fab.style.bottom = "auto";
    }

    function onEnd() {
      if (!isDown) return;
      isDown = false;
      fab.style.transition = "transform 0.16s ease, box-shadow 0.16s ease";
      if (hasMoved) {
        const rect = fab.getBoundingClientRect();
        try {
          localStorage.setItem(POS_KEY, JSON.stringify({ x: Math.round(rect.left), y: Math.round(rect.top) }));
        } catch (e) {}
      } else {
        window.toggleGatHelpdesk(true);
      }
    }

    fab.addEventListener("touchstart", function(e) {
      if (!e.touches || !e.touches[0]) return;
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    fab.addEventListener("touchmove", function(e) {
      if (!e.touches || !e.touches[0]) return;
      onMove(e.touches[0].clientX, e.touches[0].clientY, e);
      e.stopPropagation();
    }, { passive: false });

    fab.addEventListener("touchend", function(e) {
      e.preventDefault();
      e.stopPropagation();
      onEnd();
    }, { passive: false });

    fab.addEventListener("mousedown", function(e) {
      if (e.button !== 0) return;
      onStart(e.clientX, e.clientY);
      function mm(ev) { onMove(ev.clientX, ev.clientY, ev); }
      function mu() {
        window.removeEventListener("mousemove", mm);
        window.removeEventListener("mouseup", mu);
        onEnd();
      }
      window.addEventListener("mousemove", mm);
      window.addEventListener("mouseup", mu);
    });

    window.addEventListener("resize", function() {
      applySavedFabPosition(fab);
    });
  }

  function mountDom() {
    if (document.getElementById("gat-hd-fab")) return;
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        overflow-x: clip !important;
        max-width: 100vw !important;
      }
      body.gat-hd-lock-scroll {
        overflow: hidden !important;
        touch-action: none !important;
      }
      /* Draggable Circular 54x54px Button with Flutter Colors.lightBlue (#03A9F4 / #4FC3F7) */
      #gat-hd-fab {
        position: fixed;
        right: 14px;
        bottom: 18px;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        z-index: 9990;
        background: linear-gradient(135deg, #082548 0%, #03A9F4 100%);
        color: #ffffff;
        border: 2.5px solid #4FC3F7;
        padding: 0;
        font-size: 1.55rem;
        line-height: 1;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
        box-shadow: 0 8px 24px rgba(3, 169, 244, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.16s ease, box-shadow 0.16s ease;
        -webkit-tap-highlight-color: transparent;
      }
      #gat-hd-fab:active { cursor: grabbing; }
      html[dir="rtl"] #gat-hd-fab { right: auto; left: 14px; }
      #gat-hd-fab:hover { transform: scale(1.06); box-shadow: 0 10px 28px rgba(3, 169, 244, 0.75); }
      #gat-hd-fab.gat-hd-hidden { display: none !important; }
      #gat-hd-fab.gat-hd-pulse {
        animation: gatFabPulse 1.6s infinite;
        background: linear-gradient(135deg, #0288D1 0%, #03A9F4 100%);
        border-color: #81D4FA;
      }
      #gat-hd-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #03A9F4;
        color: #ffffff;
        font-size: 0.68rem;
        font-weight: 900;
        min-width: 20px;
        height: 20px;
        border-radius: 999px;
        border: 2px solid #ffffff;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        pointer-events: none;
      }
      @keyframes gatFabPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(3, 169, 244, 0.75), 0 8px 24px rgba(3, 169, 244, 0.45); }
        50% { transform: scale(1.08); box-shadow: 0 0 22px 8px rgba(79, 195, 247, 0.85), 0 12px 32px rgba(3, 169, 244, 0.85); }
      }
      #gat-hd-drawer, #gat-hd-drawer * {
        box-sizing: border-box !important;
      }
      #gat-hd-drawer {
        position: fixed;
        left: 8px !important;
        right: 8px !important;
        bottom: 10px !important;
        width: calc(100vw - 16px) !important;
        max-width: 384px !important;
        margin: 0 auto !important;
        height: min(560px, calc(100dvh - 80px));
        background: #ffffff;
        border: 2px solid #03A9F4;
        border-radius: 18px;
        box-shadow: 0 20px 50px rgba(8, 37, 72, 0.5);
        z-index: 9998;
        display: none;
        flex-direction: column;
        overflow: hidden;
        overscroll-behavior: contain;
        touch-action: pan-y;
      }
      @media (min-width: 500px) {
        #gat-hd-drawer {
          left: auto;
          right: 16px;
          width: 390px;
          margin: 0;
        }
        html[dir="rtl"] #gat-hd-drawer {
          right: auto;
          left: 16px;
        }
      }
      html[dir="rtl"] #gat-hd-drawer { direction: rtl; text-align: right; }
      #gat-hd-drawer.open { display: flex; animation: gatHdPop 0.16s ease-out; }
      @keyframes gatHdPop { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .gat-hd-head {
        background: linear-gradient(135deg, #082548 0%, #0b3b59 100%);
        color: #ffffff;
        height: 48px;
        min-height: 48px;
        padding: 0 10px 0 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        flex-shrink: 0;
        border-bottom: 1px solid rgba(79, 195, 247, 0.35);
      }
      .gat-hd-head-title {
        font-size: 0.92rem;
        font-weight: 900;
        color: #ffffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
      }
      .gat-hd-top-btns {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
      }
      .gat-hd-mini-btn {
        background: #03A9F4;
        color: #ffffff;
        border: 1.5px solid #81D4FA;
        width: 32px;
        height: 30px;
        padding: 0;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 900;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gat-hd-clear-btn {
        background: rgba(255,255,255,0.14);
        color: #e2e8f0;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 900;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .gat-hd-wa-link {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #10b981;
        color: #ffffff;
        text-decoration: none;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        font-size: 0.85rem;
      }
      .gat-hd-msgs {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        touch-action: pan-y;
        padding: 12px;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .gat-hd-bubble {
        max-width: 94%;
        padding: 11px 13px;
        border-radius: 14px;
        font-size: 0.85rem;
        line-height: 1.48;
        word-wrap: break-word;
      }
      .gat-hd-bubble.bot {
        align-self: flex-start;
        background: #ffffff;
        color: #0f172a;
        border: 1.5px solid #e2e8f0;
        box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
      }
      .gat-hd-bubble.user {
        align-self: flex-end;
        background: #03A9F4;
        color: #ffffff;
        font-weight: 600;
      }
      .gat-hd-tracks-lbl {
        font-size: 0.7rem;
        font-weight: 900;
        color: #0288D1;
        margin: 10px 0 6px;
        letter-spacing: 0.02em;
      }
      .gat-hd-track-grid {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .gat-hd-track-card {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        background: #f0f9ff;
        color: #0b3b59;
        border: 1.5px solid #81D4FA;
        border-radius: 10px;
        padding: 8px 10px;
        font-size: 0.78rem;
        font-weight: 800;
        cursor: pointer;
        text-align: start;
      }
      .gat-hd-track-card:active { background: #b3e5fc; }
      .gat-hd-jump-btn {
        display: block;
        width: 100%;
        margin-top: 10px;
        background: linear-gradient(135deg, #0288D1 0%, #03A9F4 100%);
        color: #ffffff;
        border: none;
        border-radius: 10px;
        padding: 9px 12px;
        font-size: 0.78rem;
        font-weight: 900;
        cursor: pointer;
        text-align: center;
      }
      .gat-hd-foot {
        padding: 8px 10px;
        background: #ffffff;
        border-top: 1.5px solid #e2e8f0;
        display: flex;
        gap: 6px;
        align-items: center;
        flex-shrink: 0;
      }
      #gat-hd-input {
        flex: 1;
        padding: 9px 11px !important;
        border-radius: 10px !important;
        border: 1.5px solid #cbd5e1 !important;
        font-size: 16px !important;
        margin: 0 !important;
        min-width: 0 !important;
      }
      #gat-hd-send {
        background: #03A9F4;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        padding: 9px 13px;
        font-size: 0.82rem;
        font-weight: 900;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);

    const fab = document.createElement("button");
    fab.id = "gat-hd-fab";
    fab.type = "button";
    fab.setAttribute("aria-label", "Tracking Partner");
    fab.innerHTML = '<span style="pointer-events:none;">✨</span><span id="gat-hd-badge"></span>';
    document.body.appendChild(fab);

    applySavedFabPosition(fab);
    makeFabDraggable(fab);

    const drawer = document.createElement("div");
    drawer.id = "gat-hd-drawer";
    drawer.innerHTML = `
      <div class="gat-hd-head">
        <div class="gat-hd-head-title" id="gat-hd-title"></div>
        <div class="gat-hd-top-btns">
          <button type="button" class="gat-hd-clear-btn" id="gat-hd-clear" title="Reset" onclick="window.clearGatHelpdeskChat()"></button>
          <a class="gat-hd-wa-link" id="gat-hd-wa" title="WhatsApp" href="https://wa.me/972525822005?text=Shalom%20GiyurAliyahTrack!" target="_blank" rel="noopener"></a>
          <button type="button" class="gat-hd-mini-btn" id="gat-hd-min" onclick="window.toggleGatHelpdesk(false, true)"></button>
        </div>
      </div>
      <div class="gat-hd-msgs" id="gat-hd-msgs"></div>
      <form class="gat-hd-foot" onsubmit="event.preventDefault(); window.sendGatHelpdeskMsg();">
        <input type="text" id="gat-hd-input" autocomplete="off" />
        <button type="submit" id="gat-hd-send"></button>
      </form>
    `;
    document.body.appendChild(drawer);

    const msgsEl = document.getElementById("gat-hd-msgs");
    if (msgsEl) {
      msgsEl.addEventListener("touchmove", function(e) {
        e.stopPropagation();
      }, { passive: true });
      msgsEl.addEventListener("wheel", function(e) {
        e.stopPropagation();
      }, { passive: true });
    }
    drawer.addEventListener("touchmove", function(e) {
      if (!msgsEl || !msgsEl.contains(e.target)) {
        e.preventDefault();
      }
      e.stopPropagation();
    }, { passive: false });

    window.refreshGatHelpdeskI18n(true);
  }

  const REPORT_UI_I18N = {
    en: {
      btn: "🛠️ Report a Problem / Bug (Instant Pre-AI Dispatch)",
      title: "🛠️ Report a Problem to Engineering",
      sub: "Found a form field, upload, or display issue? Send it straight to our dev desk (instant dispatch):",
      catLbl: "1. Where is the issue?",
      cats: [
        ["forms_stamper", "📄 Form / PDF Stamper"],
        ["doc_upload", "📸 Document Upload / Scan"],
        ["payment_unlock", "💳 Payment / Pass Unlock"],
        ["mobile_ui", "📱 Mobile Display / Buttons"],
        ["other", "🔊 Audio / Other"]
      ],
      descPh: "Describe what happened (e.g., which form or button you tapped)...",
      contactPh: "Your WhatsApp or Email (so we can reply)",
      sendBtn: "🚀 Send Problem Report Now",
      sending: "⏳ Sending report...",
      okMsg: "✅ Report #{id} sent directly to our engineering WhatsApp! We are on it."
    },
    he: {
      btn: "🛠️ דיווח על תקלה / בעיה טכנית (ללא המתנה)",
      title: "🛠️ דיווח מהיר על תקלה לצוות הפיתוח",
      sub: "נתקלתם בבעיה בטופס, בהעלאת מסמך או בתצוגה? שלחו דיווח ישיר אלינו:",
      catLbl: "1. באיזה חלק נתקלתם בבעיה?",
      cats: [
        ["forms_stamper", "📄 מילוי טפסים / PDF"],
        ["doc_upload", "📸 העלאת וסריקת תעודות"],
        ["payment_unlock", "💳 תשלום / פתיחת גישה"],
        ["mobile_ui", "📱 תצוגה בנייד / כפתורים"],
        ["other", "🔊 אודיו / אחר"]
      ],
      descPh: "תארו בקצרה מה קרה (למשל באיזה טופס או כפתור לחצתם)...",
      contactPh: "מספר וואטסאפ או אימייל לחזרה",
      sendBtn: "🚀 שלח דיווח עכשיו",
      sending: "⏳ שולח דיווח...",
      okMsg: "✅ דיווח מס׳ #{id} נשלח ישירות לוואטסאפ הפיתוח שלנו! נטפל בזה מיד."
    },
    fr: {
      btn: "🛠️ Signaler un problème / bug technique",
      title: "🛠️ Signaler un problème à l'équipe technique",
      sub: "Un souci avec un formulaire, un scan ou l'affichage ? Envoyez-le directement :",
      catLbl: "1. Où se situe le problème ?",
      cats: [
        ["forms_stamper", "📄 Formulaire / PDF"],
        ["doc_upload", "📸 Import / Scan de document"],
        ["payment_unlock", "💳 Paiement / Accès"],
        ["mobile_ui", "📱 Affichage mobile"],
        ["other", "🔊 Audio / Autre"]
      ],
      descPh: "Décrivez ce qui s'est passé...",
      contactPh: "Votre WhatsApp ou E-mail",
      sendBtn: "🚀 Envoyer le signalement",
      sending: "⏳ Envoi en cours...",
      okMsg: "✅ Signalement #{id} envoyé directement à notre équipe !"
    },
    es: {
      btn: "🛠️ Reportar un problema o fallo técnico",
      title: "🛠️ Reportar un problema al equipo técnico",
      sub: "¿Algún fallo con un formulario, carga de documento o pantalla? Envíelo directo:",
      catLbl: "1. ¿Dónde ocurrió el problema?",
      cats: [
        ["forms_stamper", "📄 Formulario / PDF"],
        ["doc_upload", "📸 Subida / Escaneo de doc"],
        ["payment_unlock", "💳 Pago / Desbloqueo"],
        ["mobile_ui", "📱 Pantalla móvil"],
        ["other", "🔊 Audio / Otro"]
      ],
      descPh: "Describa qué sucedió...",
      contactPh: "Su WhatsApp o Email",
      sendBtn: "🚀 Enviar reporte ahora",
      sending: "⏳ Enviando...",
      okMsg: "✅ ¡Reporte #{id} enviado directamente a soporte técnico!"
    },
    de: {
      btn: "🛠️ Technisches Problem / Fehler melden",
      title: "🛠️ Problem direkt an die Technik melden",
      sub: "Problem beim Formular, Dokumenten-Upload oder Display? Direkt absenden:",
      catLbl: "1. Wo tritt das Problem auf?",
      cats: [
        ["forms_stamper", "📄 Formular / PDF-Stamper"],
        ["doc_upload", "📸 Dokumenten-Scan / Upload"],
        ["payment_unlock", "💳 Zahlung / Freischaltung"],
        ["mobile_ui", "📱 Mobile Ansicht"],
        ["other", "🔊 Audio / Sonstiges"]
      ],
      descPh: "Beschreiben Sie kurz das Problem...",
      contactPh: "Ihre WhatsApp-Nummer oder E-Mail",
      sendBtn: "🚀 Bericht jetzt senden",
      sending: "⏳ Wird gesendet...",
      okMsg: "✅ Bericht #{id} direkt an unser Entwicklerteam gesendet!"
    },
    ru: {
      btn: "🛠️ Сообщить о проблеме / ошибке",
      title: "🛠️ Сообщить о проблеме в техподдержку",
      sub: "Ошибка в анкете, загрузке документа или отображении? Отправьте напрямую:",
      catLbl: "1. Где возникла проблема?",
      cats: [
        ["forms_stamper", "📄 Анкета / PDF"],
        ["doc_upload", "📸 Загрузка / Скан документа"],
        ["payment_unlock", "💳 Оплата / Доступ"],
        ["mobile_ui", "📱 Мобильный экран"],
        ["other", "🔊 Аудио / Другое"]
      ],
      descPh: "Опишите, что произошло...",
      contactPh: "Ваш WhatsApp или Email для ответа",
      sendBtn: "🚀 Отправить отчёт",
      sending: "⏳ Отправка...",
      okMsg: "✅ Отчёт #{id} отправлен напрямую разработчикам!"
    }
  };

  window.openGatProblemReporter = function() {
    mountDom();
    const d = document.getElementById("gat-hd-drawer");
    if (d && !d.classList.contains("open")) window.toggleGatHelpdesk(true);
    const msgs = document.getElementById("gat-hd-msgs");
    if (!msgs) return;
    const existing = document.getElementById("gat-hd-problem-card");
    if (existing) existing.remove();

    const l = getLang();
    const rp = REPORT_UI_I18N[l] || REPORT_UI_I18N.en;
    const card = document.createElement("div");
    card.id = "gat-hd-problem-card";
    card.className = "gat-hd-bubble bot";
    card.style.cssText = "background:#fffbeb;border:2px solid #f59e0b;border-radius:14px;padding:12px;color:#0f172a;";

    const catOptionsHtml = rp.cats.map(function(c) {
      return '<option value="' + c[0] + '">' + c[1] + '</option>';
    }).join("");

    const savedContact = localStorage.getItem("gat_wa_phone") || localStorage.getItem("gat_user_email") || "";
    card.innerHTML =
      '<div style="font-weight:900;font-size:0.88rem;color:#b45309;margin-bottom:4px;">' + rp.title + '</div>' +
      '<div style="font-size:0.76rem;color:#78350f;margin-bottom:8px;line-height:1.38;">' + rp.sub + '</div>' +
      '<label style="display:block;font-size:0.74rem;font-weight:800;color:#92400e;margin-bottom:3px;">' + rp.catLbl + '</label>' +
      '<select id="gat-rp-cat" style="width:100%;padding:7px 9px;border-radius:8px;border:1.5px solid #fcd34d;background:#fff;font-size:0.8rem;font-weight:700;color:#0f172a;margin-bottom:7px;">' + catOptionsHtml + '</select>' +
      '<textarea id="gat-rp-desc" rows="3" placeholder="' + rp.descPh + '" style="width:100%;padding:8px 9px;border-radius:8px;border:1.5px solid #fcd34d;background:#fff;font-size:0.8rem;color:#0f172a;margin-bottom:7px;resize:vertical;"></textarea>' +
      '<input type="text" id="gat-rp-contact" value="' + savedContact.replace(/"/g, '&quot;') + '" placeholder="' + rp.contactPh + '" style="width:100%;padding:7px 9px;border-radius:8px;border:1.5px solid #fcd34d;background:#fff;font-size:0.8rem;color:#0f172a;margin-bottom:8px;" />' +
      '<button type="button" id="gat-rp-submit-btn" onclick="window.submitGatProblemReport()" style="width:100%;background:linear-gradient(135deg,#d97706 0%,#b45309 100%);color:#fff;border:none;border-radius:9px;padding:9px 12px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + rp.sendBtn + '</button>' +
      '<div id="gat-rp-status" style="display:none;margin-top:7px;font-size:0.78rem;font-weight:800;"></div>';

    msgs.appendChild(card);
    setTimeout(function() {
      msgs.scrollTop = Math.max(0, card.offsetTop - 8);
      const descEl = document.getElementById("gat-rp-desc");
      if (descEl) descEl.focus();
    }, 30);
  };

  window.submitGatProblemReport = async function() {
    const l = getLang();
    const rp = REPORT_UI_I18N[l] || REPORT_UI_I18N.en;
    const catEl = document.getElementById("gat-rp-cat");
    const descEl = document.getElementById("gat-rp-desc");
    const contEl = document.getElementById("gat-rp-contact");
    const btnEl = document.getElementById("gat-rp-submit-btn");
    const stEl = document.getElementById("gat-rp-status");
    const desc = descEl ? descEl.value.trim() : "";
    if (!desc) {
      if (descEl) descEl.focus();
      return;
    }
    if (btnEl) {
      btnEl.disabled = true;
      btnEl.textContent = rp.sending;
    }
    try {
      const apiUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ? "https://giyuraliyahtrack.com/api/auditDoc"
        : "/api/auditDoc";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "report_problem",
          category: catEl ? catEl.value : "general",
          description: desc,
          contact: contEl ? contEl.value.trim() : "",
          uid: window.gatUid || localStorage.getItem("gat_uid") || "anon",
          lang: l,
          pageUrl: window.location.href,
          currentMod: window.currentMod || "landing",
          currentForm: window.activePibaFormKey || "",
          screen: window.innerWidth + "x" + window.innerHeight,
          formSnapshot: window.gatFormsState || {}
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error((data && data.error) || "Submission error");
      if (stEl) {
        stEl.style.display = "block";
        stEl.style.color = "#15803d";
        stEl.textContent = rp.okMsg.replace("{id}", data.ticketId || "OK");
      }
      if (btnEl) btnEl.style.display = "none";
    } catch (e) {
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.textContent = rp.sendBtn;
      }
      if (stEl) {
        stEl.style.display = "block";
        stEl.style.color = "#b91c1c";
        stEl.textContent = "⚠️ " + (e.message || "Error — WhatsApp +972-52-582-2005");
      }
    }
  };

  function buildWelcomeBubble(t) {
    const wrap = document.createElement("div");
    wrap.className = "gat-hd-bubble bot";
    const l = getLang();
    const rp = REPORT_UI_I18N[l] || REPORT_UI_I18N.en;
    let tracksHtml = '<div class="gat-hd-tracks-lbl">' + t.tracksTitle + '</div><div class="gat-hd-track-grid">';
    t.tracks.forEach(function(tr, idx) {
      tracksHtml += '<button type="button" class="gat-hd-track-card" onclick="window.tapGatTrackCard(' + idx + ')"><span>' + tr.icon + '</span><span>' + tr.label + '</span></button>';
    });
    tracksHtml += "</div>";
    
    wrap.innerHTML = '<div>' + formatMd(t.welcome) + '</div>' + tracksHtml;
    return wrap;
  }

  window.tapGatTrackCard = function(idx) {
    const t = HD_I18N[getLang()] || HD_I18N.en;
    const tr = t.tracks[idx];
    if (!tr) return;
    window.gatNavigateAndMinimize(tr.mod, tr.form, false);
    window.sendGatHelpdeskMsg(tr.q, tr.mod, tr.form);
  };

  window.clearGatHelpdeskChat = function() {
    saveRollingHistory([]);
    const msgs = document.getElementById("gat-hd-msgs");
    if (msgs) msgs.innerHTML = "";
    window.refreshGatHelpdeskI18n(true);
  };


  // Keep #drawer-top-sync-btn localized on 6-language switches
  const SYNC_DRAWER_LABELS = {
    en: "📲 Sync Devices & Pass Code",
    he: "📲 סנכרון מכשירים וקוד גישה",
    fr: "📲 Synchroniser les Appareils & Code",
    es: "📲 Sincronizar Dispositivos y Código",
    de: "📲 Geräte synchronisieren & Pass-Code",
    ru: "📲 Синхронизация устройств и Код"
  };
  function syncLeftDrawerTopBtn() {
    const l = getLang();
    const btn = document.getElementById("drawer-top-sync-btn");
    if (btn) {
      btn.innerHTML = '<span data-i18n="sync_drawer_btn">' + (SYNC_DRAWER_LABELS[l] || SYNC_DRAWER_LABELS.en) + '</span>';
    }
  }

  window.refreshGatHelpdeskI18n = function(rebuildHistory) {
    const l = getLang();
    const t = HD_I18N[l] || HD_I18N.en;
    const isRtl = l === "he";
    const drw = document.getElementById("gat-hd-drawer");
    if (drw) drw.dir = isRtl ? "rtl" : "ltr";
    const ttl = document.getElementById("gat-hd-title");
    if (ttl) ttl.textContent = t.title;
    const minB = document.getElementById("gat-hd-min");
    if (minB) minB.textContent = t.minBtn || "—";
    const rstB = document.getElementById("gat-hd-clear");
    if (rstB) rstB.textContent = t.clearBtn || "↺";
    const waB = document.getElementById("gat-hd-wa");
    if (waB) waB.textContent = t.waBtn || "📲";
    const inp = document.getElementById("gat-hd-input");
    if (inp) inp.placeholder = t.placeholder;
    const snd = document.getElementById("gat-hd-send");
    if (snd) snd.textContent = t.send;
    syncLeftDrawerTopBtn();

    const msgs = document.getElementById("gat-hd-msgs");
    if (msgs && rebuildHistory !== false) {
      msgs.innerHTML = "";
      msgs.appendChild(buildWelcomeBubble(t));
      (window._gatHelpdeskHistory || []).forEach(function(item) {
        const b = document.createElement("div");
        b.className = "gat-hd-bubble " + (item.role === "user" ? "user" : "bot");
        if (item.role === "user") {
          b.textContent = String(item.text || "").replace(/^(FIANCE_IL:|FIANCE_FJ:|FIANCE_OT:|\[fiance_[^\]]+\])\s*/i, "");
        } else {
          let botText = item.text || "";
          if (item.routeKey) {
            botText = getPreAiReplyByRouteKey(item.routeKey, l) || botText;
          } else if (/fiance_israeli|FIANCE_IL:|Avant de voyager pour vous marier/.test(botText)) {
            botText = getPreAiReplyByRouteKey("fiance_ask", l) || botText;
          }
          b.innerHTML = parseReplyAndBuildHtml(botText, t).html;
        }
        msgs.appendChild(b);
      });
      if (!window._gatHelpdeskHistory || window._gatHelpdeskHistory.length === 0) {
        msgs.scrollTop = 0;
      } else {
        const lastBot = msgs.lastElementChild;
        msgs.scrollTop = lastBot ? Math.max(0, lastBot.offsetTop - 8) : 0;
      }
    }
  };

  window.toggleGatHelpdesk = function(forceState, pulseFabOnMinimize) {
    mountDom();
    const d = document.getElementById("gat-hd-drawer");
    const fab = document.getElementById("gat-hd-fab");
    if (!d) return;
    const next = typeof forceState === "boolean" ? forceState : !d.classList.contains("open");
    if (next) {
      window.refreshGatHelpdeskI18n(false);
      d.classList.add("open");
      document.body.classList.add("gat-hd-lock-scroll");
      if (fab) {
        fab.classList.add("gat-hd-hidden");
        fab.classList.remove("gat-hd-pulse");
      }
      const msgs = document.getElementById("gat-hd-msgs");
      if (msgs) {
        if (!window._gatHelpdeskHistory || window._gatHelpdeskHistory.length === 0) {
          msgs.scrollTop = 0;
        }
      }
    } else {
      d.classList.remove("open");
      document.body.classList.remove("gat-hd-lock-scroll");
      window.refreshGatHelpdeskI18n(false);
      if (fab) {
        fab.classList.remove("gat-hd-hidden");
        if (pulseFabOnMinimize || (window._gatHelpdeskHistory && window._gatHelpdeskHistory.length > 0)) {
          fab.classList.add("gat-hd-pulse");
        }
      }
    }
  };


  const GAT_6LANG_PACK = window.GAT_6LANG_PACK = {"en": {"cat1": "🕍 CATEGORY 1: CONVERSION, PRIVATE BEIT DINS & RABBANUT", "cat2": "🛂 CATEGORY 2: VISA CLOCKS, 5 APOSTILLED DOCS & TOURIST SURVIVAL", "cat3": "💍 CATEGORY 3: SPOUSAL VISA (5.2.0008), CLERK SHEETS & PAST RECORDS", "freeTag": "Free Playbooks", "f_h": "🧭 Tell Us What Track You Are Interested In:", "f_s": "Tap your track below to open your step-by-step Case Playbook:", "f_b1": "🕍 1) Giyur — I Want to Convert (or Validate My Conversion)", "f_b2": "✈️ 2) Aliyah — I Want to Make Aliyah to Israel (or Spousal Visa)", "f_b3": "✡️ 3) Both — I Want to Convert AND Make Aliyah / Marry", "q1_t": "Step 1 of 2: Where are you in your conversion journey right now?", "q1_opts": [["🏛️ Converted / converting at a Private Beit Din (Gush Etzion, Bnei Brak, Chabad, or Overseas)", "priv_bd"], ["💔 Considering / completed a Non-Orthodox conversion (Reform / Conservative 'Dahan' ruling)", "dahan_bd"], ["🛂 In Israel on a 90-Day B/2 Tourist Visa & want State Giyur (Va'adat Charigim)", "tourist_vc"], ["📚 Need a Vetted Sponsoring Rabbi, Madrichat Kallah & 700-Q Beit Din Prep", "state_prep"]], "q2_t": "Step 1 of 2: Which Aliyah or Residency situation fits you?", "q2_opts": [["🚨 Still Abroad / Emergency Exit: What 5 Apostilled Docs must be in my Go-Bag before flying?", "go_bag"], ["✈️ In Israel: Making Aliyah from inside Israel (Shinui Ma'amad Form Ash/456 & 24-Mo Sal Klita)", "shinui"], ["💍 Married or Unmarried Partner of an Israeli Citizen (Spousal Visa Nohal 5.2.0008 / Form Ash/6)", "spousal"], ["🛡️ Applying for Aliyah or Spousal Visa with an Old / Expunged Record (Teudat Yosher)", "crim"]], "q3_t": "Step 1 of 2: What is your current situation for Converting + Making Aliyah?", "q3_opts": [["⚠️ Converted / converting via Gush Etzion / Bnei Brak / Private or Overseas Beit Din & want Aliyah / Marriage", "priv_bd"], ["💑 With an Israeli Partner: Need BOTH Spousal Visa (Nohal 5.2.0008) + Rabbanut Conversion (Sec. ג.10)", "dual"], ["🛂 On a B/2 Tourist Visa (No Israeli partner) & need Va'adat Charigim (Form Ash/1) + Survival Guide", "tourist_vc"], ["✈️ Still Abroad: Planning to come to Israel to convert & make Aliyah (5 Apostilled Docs first!)", "go_bag"]], "res": {"priv_bd": ["🚨 PRIVATE / OVERSEAS BEIT DIN PLAYBOOK", "Why Misrad HaPanim & the Rabbanut Block Gush Etzion / Private Conversions", "Misrad HaPanim stalls tourist private conversions for 2–5+ years, and the Chief Rabbinate 100% blocks marriage registration unless you complete State Rabbanut validation ('Ishur Giyur' / Giyur L'Chumra) or run the Spousal Track (Nohal 5.2.0008) in parallel.", [["1️⃣ Read First: Private Conversion & Gush Etzion Trap", "obs:0"], ["2️⃣ Read Next: Post-Mikvah & 9-Month Community Rule", "obs:2"], ["3️⃣ Read Next: Pulling All 5 Apostilled Docs (180d Clock)", "obs:1"]]], "dahan_bd": ["⚠️ NON-ORTHODOX ('DAHAN') PLAYBOOK", "Why the Rabbanut Blocks 'Dahan' Conversions from Marriage in Israel", "A non-Orthodox conversion permanently bars you and your future children from marrying through the Israeli Rabbanut. You can complete a 100% Halachic, Rabbanut-recognized track in the exact same timeframe.", [["1️⃣ Read First: The Unfiltered Dahan vs. Rabbanut Truth", "term:dahan_truth"], ["2️⃣ Read Next: Vetted Rabbanut Rabbi & Madrichat Kallah", "obs:5"], ["3️⃣ Read Next: Passing Va'adat Charigim (Form Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ B/2 TOURIST TO STATE GIYUR PLAYBOOK", "How to Pass Va'adat Charigim (Form Ash/1) Before Your 90-Day Clock Expires", "Tourists must pass the Exceptions Committee with Form Ash/1, a Hebrew Michtav Hesber, 5–8+ Israeli Rabbi/Host Family letters, and 5 Apostilled Homeland Docs.", [["1️⃣ Read First: Va'adat Charigim & Freezing Your 90d Clock", "obs:3"], ["2️⃣ Read Next: The 5 Mandatory Apostilled Docs", "obs:1"], ["3️⃣ Read Next: Legal Remote Work & Housing on B/2 Visa", "obs:8"]]], "state_prep": ["🕍 BEIT DIN & RABBANUT PREP PLAYBOOK", "Both Partners Must Study! Vetted Rabbi, Kallah & 700-Q Beit Din Exam", "Even when one spouse is a born-Jewish Israeli citizen, BOTH partners must study with a Rabbanut-recognized Rabbi and Madrichat Kallah.", [["1️⃣ Read First: Vetted Rabbi, Kallah & Exam Guide", "obs:5"], ["2️⃣ Read Next: 5–8+ Israeli Rabbi & Host Family Letters", "term:community_letters"], ["3️⃣ Launch 700 Beit Din Deck & 56 Songs Karaoke →", "app:beit-din-150|"]]], "go_bag": ["🚨 PRE-FLIGHT GO-BAG PLAYBOOK", "Do NOT Board a Plane Without All 5 Double-Apostilled Originals", "Ordering foreign Birth Certificates, Single Status Proofs, and FBI/ACRO/RCMP Police Checks remotely from Israel takes months while your 180-day clock runs out.", [["1️⃣ Read First: Pre-Flight Go-Bag Checklist", "term:go_bag"], ["2️⃣ Read Next: The 5 Apostilled Docs & 180-Day Clock", "obs:1"], ["3️⃣ Read Next: Moving Funds & Paying Rent in ₪ Without TZ", "term:fx_shield"]]], "shinui": ["✈️ IN-ISRAEL ALIYAH (SHINUI MA'AMAD)", "Form Ash/456, MR/14a/b & The 24-Month Sal Klita Cliff", "Requires Form Ash/456 (fee-exempt per Sec. ג.7), MR/14a/b, Nativ Security CV, and fresh <180d Apostilles. Warning: >24 cumulative months in Israel in the prior 3 years cancels the ~21,700 NIS Sal Klita!", [["1️⃣ Read First: 5 Apostilled Docs & 24-Mo Sal Klita Rules", "term:five_docs"], ["2️⃣ Read Next: 60–90 Day Bridge Health Insurance", "term:bridge_health"], ["3️⃣ Open Form Ash/456 & MR/14a Hebrew Filler →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 SPOUSAL VISA PLAYBOOK (NOHAL 5.2.0008)", "Passing the Graduated Spousal Process & 300-Question Separated-Room Interview", "Clerks audit every date on your 6-page Form Ash/6 (or 13-clause Nespach Alef) and separate you into two rooms for 80 daily-life questions.", [["1️⃣ Read First: 300-Question Separated-Room Interrogation", "obs:6"], ["2️⃣ Read Next: The 5 Apostilled Docs & Sec. ד.2.ה Exemption", "obs:1"], ["3️⃣ Open Form Ash/6 Hebrew Engine →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DUAL-TRACK COUPLE PLAYBOOK (SEC. ג.10)", "Run Spousal Residency AND Rabbanut Conversion Simultaneously!", "Under Nohal 5.2.0008 Sec. ג.10, you have the statutory right to lock in your Spousal B/1 work permit AND complete Rabbanut conversion at the same time—and BOTH partners must study!", [["1️⃣ Read First: Both Partners Must Study (Rabbi & Kallah)", "obs:5"], ["2️⃣ Read Next: 300-Question Separated-Room Interview", "obs:6"], ["3️⃣ Read Next: Why Private Conversions Block Rabbanut Weddings", "obs:2"]]], "crim": ["🛡️ REHABILITATION PLAYBOOK", "Never Hide an Old or Expunged Arrest — Use a Rehabilitation Dossier", "Checking 'No Criminal Record' when an expunged arrest shows on an FBI/ACRO/RCMP check causes instant rejection. Upfront disclosure with a Hebrew Rehabilitation Michtav Hesber prevents 2-year appeals.", [["1️⃣ Read First: Applying With a Criminal Record Guide", "obs:7"], ["2️⃣ Read Next: The 5 Apostilled Docs & 3-Bucket Check", "obs:1"], ["3️⃣ Request Vetted Lawyer Review / Escort →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **HOLD ON — Before You Fly Home & Back, Your Track Depends on ONE Critical Question!**\n\nMisrad HaPanim **refuses** immediate Aliyah on a tourist Private Beit Din conversion (Gush Etzion, Bnei Brak, etc.), and the Chief Rabbinate **100% blocks** private conversions for marriage in Israel.\n\n**Golden Rule While You Are Home:** Do NOT board your return flight without pulling all **5 double-Apostilled Homeland Docs** in person (Long-Form Birth Cert, Police Check <180d, Single Status Proof) + your **double-Apostilled Marriage Certificate**!\n\n👇 **To give you the exact track for you and your fiancé, tap who your fiancé is below:**\n\n[[ASK:FIANCE_IL: My fiancé is an Israeli Citizen|🇮🇱 A) My Fiancé Is an Israeli Citizen]]\n[[ASK:FIANCE_FJ: My fiancé is a Born Jew from abroad|✡️ B) My Fiancé Is a Born Jew from Abroad]]\n[[ASK:FIANCE_OT: My fiancé is also converting / not Jewish|🌍 C) My Fiancé Is Converting / Not an Israeli or Born Jew]]\n[[NAV:obs|0|📖 Or Minimize & Read: Private Beit Din Truth Popup]]", "fiance_il": "🇮🇱 **Your Fiancé Is an Israeli Citizen — Your Exact Dual-Track Playbook:**\n\n1. **While Home Getting Married:** Pull all **5 double-Apostilled Homeland Docs** in person + get an **Apostille on your Marriage Certificate** (listing prior status as 'Single' for the Sec. ד.2.ה exemption!).\n2. **Enter Spousal Track (*Nohal 5.2.0008* / Form Ash/6):** Locks in your legal residency & B/1 work visa immediately.\n3. **Run Rabbanut Conversion Simultaneously (Sec. ג.10):** Under Sec. ג.10, you can complete your **State Rabbanut validation (*Giyur L'Chumra* / *Ishur Giyur*)** in parallel! Both you and your Israeli spouse must study with a Rabbanut-recognized Rabbi & Madrichat Kallah.\n\n[[NAV:obs|1|1️⃣ Read First: Pull All 5 Apostilled Docs While Home]]\n[[NAV:obs|5|2️⃣ Read Next: Both Partners Must Study (Rabbi & Kallah)]]\n[[NAV:hebrew-engine|ash6|3️⃣ Open Form Ash/6 Spousal Dossier Engine]]", "fiance_fj": "✡️ **Your Fiancé Is a Born Jew from Abroad (Making Aliyah Together):**\n\n1. **Why Your Private Conversion Alone Won't Work:** Misrad HaPanim does not recognize a tourist's private Israeli conversion for independent Aliyah.\n2. **Before Flying Back:** Pull **both partners' 5 double-Apostilled civil documents**, your fiancé's Orthodox **Proof of Judaism (*Ishur Yahadut*)**, and your **Apostilled Marriage Certificate** into your Carry-On Go-Bag, then complete **Rabbanut Validation (*Ishur Giyur*)** in Israel so you and your future kids have 100% recognized status!\n\n[[NAV:term|go_bag|1️⃣ Read First: Pre-Flight Go-Bag (Bring All 5 Docs!)]]\n[[NAV:obs|2|2️⃣ Read Next: Rabbanut Validation (Ishur Giyur) for Future Kids]]\n[[NAV:obs|5|3️⃣ Read Next: Vetted Rabbanut Rabbi & Madrichat Kallah Guide]]", "fiance_ot": "🚨 **STOP — Danger Zone If Neither Partner Is an Israeli Citizen or Born Jew:**\n\nA private Israeli conversion done on a tourist visa does **not** grant Law of Return rights to you or your spouse! If you fly home, marry a partner who is not an Israeli or born Jew, and fly back expecting Aliyah, **Misrad HaPanim will block you both.**\n\n**Your 2 Legal Paths:**\n• **Option A (Overseas Recognized Community):** Validate/complete conversion for BOTH partners at a Rabbanut-recognized overseas Beit Din (RCA, London, Consistoire) + live in that community **9–12 full months AFTER the Mikvah**.\n• **Option B (In-Israel *Va'adat Charigim*):** Pull all **5 double-Apostilled Homeland Docs** while home, return to Israel, and file **Form Ash/1** to enter official State Conversion.\n\n[[NAV:term|overseas_giyur|1️⃣ Read First: Overseas 9–12 Month Community Rule]]\n[[NAV:obs|3|2️⃣ Read Next: Passing Va'adat Charigim (Form Ash/1) in Israel]]\n[[NAV:obs|1|3️⃣ Read Next: Pulling All 5 Apostilled Docs While Home]]", "priv_bd": "⚠️ **CRITICAL WARNING — Read This Before Going to Misrad HaPanim!**\n\nA conversion through **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), Jerusalem private courts, Chabad, or an unvalidated overseas Beit Din** is a **Private Beit Din** conversion—**NOT** the State Rabbanut (*Ma'arach HaGiyur*).\n\n1. **Misrad HaPanim Blocks Aliyah:** Misrad HaPanim **refuses** immediate Aliyah on a tourist private conversion and stalls *Bagatz* files for **2 to 5+ years**.\n2. **The Rabbanut Blocks Marriage:** The Chief Rabbinate **100% rejects** Gush Etzion and private conversions for marriage in Israel.\n3. **Your 2 Real Paths:** Complete **State Rabbanut Conversion / Validation (*Ishur Giyur* + 5 Apostilled Docs + 9-Mo Community)** OR file the **Spousal Track (*Nohal 5.2.0008 / Form Ash/6*)**.\n\n[[NAV:obs|0|1️⃣ Read First: Private Beit Din & Gush Etzion Trap]]\n[[NAV:obs|2|2️⃣ Read Next: 9-Month Community & Ishur Giyur Rule]]\n[[NAV:obs|1|3️⃣ Read Next: The 5 Mandatory Apostilled Homeland Docs]]", "dahan": "⚠️ **STOP — The Truth About Non-Orthodox ('Dahan Ruling') Conversions:**\n\n1. **The Chief Rabbinate 100% rejects non-Orthodox conversions**—permanently blocking you and your future children from marrying a Jewish citizen through the Rabbanut.\n2. **Misrad HaPanim drags *Dahan* files out for years**, whereas you can complete a **100% Halachic, Rabbanut-recognized conversion** in the same timeframe with our Vetted Sponsoring Rabbi & Madrichat Kallah!\n\n[[NAV:term|dahan_truth|1️⃣ Read First: The Unfiltered Dahan vs. Rabbanut Truth]]\n[[NAV:obs|5|2️⃣ Read Next: Vetted Rabbanut Sponsoring Rabbi & Kallah Guide]]", "vc": "🏛️ **Passing *Va'adat Charigim* (Form Ash/1) on a B/2 Tourist Visa:**\n\nTourists are blocked from State Conversion unless they first pass **Va'adat Charigim** with Form Ash/1, Ash/3, a Hebrew *Michtav Hesber*, 5–8+ Israeli Rabbi/Host Family letters, and 5 Apostilled Homeland Docs before their 90-day visa expires.\n\n[[NAV:obs|3|1️⃣ Read First: Passing Va'adat Charigim & Freezing Your Clock]]\n[[NAV:obs|1|2️⃣ Read Next: The 5 Mandatory Apostilled Docs]]\n[[NAV:hebrew-engine|ash1|3️⃣ Open Form Ash/1 & Ash/3 Guided Hebrew Engine]]"}}, "he": {"cat1": "🕍 קטגוריה 1: גיור, בתי דין פרטיים והרבנות הראשית", "cat2": "🛂 קטגוריה 2: שעון אשרת תייר, 5 מסמכי אפוסטיל והישרדות בארץ", "cat3": "💍 קטגוריה 3: הליך מדורג (5.2.0008), דרישות מסמכים ועבר פלילי", "freeTag": "מדריכים בחינם", "f_h": "🧭 באיזה מסלול אתם מתעניינים?", "f_s": "לחצו על המסלול שלכם לפתיחת תוכנית העבודה המדויקת צעד אחר צעד:", "f_b1": "🕍 1) גיור — אני רוצה להתגייר (או לאמת גיור קיים)", "f_b2": "✈️ 2) עלייה — אני רוצה לעשות עלייה לישראל (או אשרת בני זוג)", "f_b3": "✡️ 3) שניהם — אני רוצה גם להתגייר וגם לעשות עלייה / להינשא", "q1_t": "שלב 1 מתוך 2: היכן אתם נמצאים בתהליך הגיור כרגע?", "q1_opts": [["🏛️ התגיירתי / מתגייר בבית דין פרטי (גוש עציון, בני ברק, חב״ד או בחו״ל)", "priv_bd"], ["💔 שוקל / עברתי גיור לא-אורתודוקסי (רפורמי / קונסרבטיבי — פס״ד דהן)", "dahan_bd"], ["🛂 נמצא בישראל באשרת תייר B/2 ורוצה גיור ממלכתי (וועדת חריגים)", "tourist_vc"], ["📚 זקוק לרב מלווה מוכר ברבנות, מדריכת כלה והכנה ל-700 שאלות בית הדין", "state_prep"]], "q2_t": "שלב 1 מתוך 2: איזה מסלול עלייה או הסדרת מעמד מתאים לכם?", "q2_opts": [["🚨 עדיין בחו״ל / עליית חירום: אילו 5 מסמכי אפוסטיל חובה להביא בתיק היד לפני הטיסה?", "go_bag"], ["✈️ נמצא בישראל: שינוי מעמד לעולה בארץ (טופס אש/456 ומלכודת 24 חודשי סל קליטה)", "shinui"], ["💍 נשוי או ידוע בציבור של אזרח/ית ישראלי/ת (הליך מדורג נוהל 5.2.0008 / טופס אש/6)", "spousal"], ["🛡️ בקשת עלייה או אשרת בני זוג עם רישום / עבר פלילי ישן (תעודת יושר)", "crim"]], "q3_t": "שלב 1 מתוך 2: מה המצב הנוכחי שלכם לשילוב גיור ועלייה?", "q3_opts": [["⚠️ התגיירתי בגוש עציון / בני ברק / גיור פרטי או בחו״ל ורוצה עלייה / נישואין", "priv_bd"], ["💑 בזוגיות עם אזרח/ית ישראלי/ת: צריך גם הליך מדורג (5.2.0008) וגם גיור ברבנות (סעיף ג.10)", "dual"], ["🛂 באשרת תייר B/2 (ללא בן זוג ישראלי) וצריך וועדת חריגים (אש/1) + מדריך מחייה", "tourist_vc"], ["✈️ עדיין בחו״ל: מתכנן להגיע לישראל לגיור ועלייה (5 מסמכי אפוסטיל תחילה!)", "go_bag"]], "res": {"priv_bd": ["🚨 תוכנית עבודה • גיור פרטי / גוש עציון / חו״ל", "מדוע משרד הפנים והרבנות חוסמים גיור פרטי (וכיצד פותרים זאת)", "משרד הפנים מקפיא תיקי גיור פרטי של תיירים ל-2–5+ שנים, והרבנות הראשית חוסמת ב-100% רישום נישואין ללא אימות ברבנות הראשית (׳אישור גיור׳ / גיור לחומרא) או פתיחת הליך מדורג (נוהל 5.2.0008) במקביל.", [["1️⃣ קראו תחילה: מלכודת הגיור הפרטי וגוש עציון", "obs:0"], ["2️⃣ השלב הבא: חוק 9 חודשי קהילה ואישור גיור", "obs:2"], ["3️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל (180 יום)", "obs:1"]]], "dahan_bd": ["⚠️ תוכנית עבודה • גיור לא-אורתודוקסי (פס״ד דהן)", "מדוע הרבנות הראשית חוסמת בוגרי גיור ׳דהן׳ מנישואין בישראל", "גיור לא-אורתודוקסי חוסם לצמיתות אתכם ואת ילדיכם העתידיים מנישואין כדת משה וישראל ברבנות. ניתן להשלים גיור הלכתי המוכר ב-100% ברבנות באותו פרק זמן.", [["1️⃣ קראו תחילה: האמת על פס״ד דהן מול הרבנות", "term:dahan_truth"], ["2️⃣ השלב הבא: רב מלווה ומדריכת כלה מוכרים ברבנות", "obs:5"], ["3️⃣ השלב הבא: מעבר וועדת חריגים (טופס אש/1)", "obs:3"]]], "tourist_vc": ["🏛️ תוכנית עבודה • מתייר B/2 לגיור ממלכתי", "כיצד לעבור וועדת חריגים (טופס אש/1) לפני פקיעת 90 ימי האשרה", "תיירים חייבים לעבור את וועדת החריגים עם טופס אש/1, מכתב הסבר חוקי בעברית, 5–8+ מכתבי רב וקהילה ו-5 מסמכי אפוסטיל.", [["1️⃣ קראו תחילה: וועדת חריגים והקפאת שעון 90 היום", "obs:3"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל", "obs:1"], ["3️⃣ השלב הבא: עבודה מרחוק ומגורים חוקיים לתייר", "obs:8"]]], "state_prep": ["🕍 תוכנית עבודה • הכנה לבית הדין והרבנות", "שני בני הזוג חייבים ללמוד! רב מלווה, מדריכת כלה ומבחן 700 השאלות", "גם כאשר אחד מבני הזוג הוא אזרח ישראלי יהודי מלידה, בית הדין מחייב את שני בני הזוג בלימוד עם רב מלווה ומדריכת כלה מוסמכת.", [["1️⃣ קראו תחילה: מדריך רב מלווה, מדריכת כלה ומבחן בית הדין", "obs:5"], ["2️⃣ השלב הבא: 5–8+ מכתבי המלצה מרב ומשפחה מארחת", "term:community_letters"], ["3️⃣ פתיחת מאגר 700 שאלות בית הדין ו-56 שירי שבת →", "app:beit-din-150|"]]], "go_bag": ["🚨 פרוטוקול תיק-יד (GO-BAG) לפני טיסה", "אל תעלו על מטוס ללא 5 מסמכי המקור המאומתים באפוסטיל כפול", "הזמנת תעודת לידה מורחבת, תמצית רווקות ותעודת יושר פדרלית מרחוק מתוך ישראל אורכת חודשים בזמן ששעון 180 הימים פוקע.", [["1️⃣ קראו תחילה: רשימת החובה לתיק היד לפני טיסה", "term:go_bag"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ושעון 180 הימים", "obs:1"], ["3️⃣ השלב הבא: העברת כספים ותשלום שכ״ד ב-₪ ללא ת״ז", "term:fx_shield"]]], "shinui": ["✈️ עלייה מתוך ישראל (שינוי מעמד • נוהל 5.2.0001)", "טופס אש/456, מר/14 ומלכודת 24 החודשים של סל הקליטה", "מחייב טופס אש/456 (פטור מאגרה לפי סעיף ג.7), מר/14 ואפוסטיל בתוקף <180 יום. אזהרה: שהייה של מעל 24 חודשים מצטברים ב-3 השנים האחרונות שוללת את מענק סל הקליטה (~21,700 ₪)!", [["1️⃣ קראו תחילה: 5 מסמכי האפוסטיל וכללי סל קליטה", "term:five_docs"], ["2️⃣ השלב הבא: ביטוח רפואי גישור ל-60–90 יום", "term:bridge_health"], ["3️⃣ פתיחת ממלא טופס אש/456 ומר/14 בעברית →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 תוכנית עבודה • הליך מדורג (נוהל 5.2.0008)", "מעבר ההליך המדורג לבני זוג וראיון 80 השאלות בחדרים נפרדים", "פקידי משרד הפנים בוחנים כל תאריך בטופס אש/6 (או תצהיר נספח א׳) ומפרידים ביניכם לשני חדרים ל-300 שאלות טריוויה על חיי היום-יום.", [["1️⃣ קראו תחילה: ראיון 80 השאלות בחדרים נפרדים", "obs:6"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ופטור סעיף ד.2.ה", "obs:1"], ["3️⃣ פתיחת ממלא טופס אש/6 בעברית →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 מסלול כפול לבני זוג (סעיף ג.10)", "זכותכם החוקית לנהל הליך מדורג וגיור ממלכתי במקביל!", "לפי נוהל 5.2.0008 סעיף ג.10, זכותכם החוקית לקבל אשרת עבודה B/1 בהליך המדורג ולהשלים גיור ברבנות במקביל ללא סגירת תיק!", [["1️⃣ קראו תחילה: שני בני הזוג חייבים ללמוד (רב ומדריכת כלה)", "obs:5"], ["2️⃣ השלב הבא: ראיון 80 השאלות בחדרים נפרדים", "obs:6"], ["3️⃣ השלב הבא: מדוע גיור פרטי חוסם חתונה ברבנות", "obs:2"]]], "crim": ["🛡️ תוכנית שיקום • עלייה / אשרה עם רישום פלילי", "לעולם אל תסתירו מעצר ישן או מחוק — הגישו אוגדן שיקום חוקי", "סימון ׳אין עבר פלילי׳ כשמעצר ישן מופיע בבדיקת טביעות אצבע פדרלית גורם לדחייה מיידית. גילוי נאות מראש עם מכתב הסבר בעברית מונע ערעורים של שנתיים.", [["1️⃣ קראו תחילה: מדריך עלייה ואשרה עם עבר פלילי", "obs:7"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ובדיקת 3 המדינות", "obs:1"], ["3️⃣ בקשת ליווי עו״ד / בדיקת תיק →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **רגע לפני שאתם טסים — המסלול שלכם תלוי בשאלה קריטית אחת!**\n\nמשרד הפנים **אינו מאשר** עלייה מיידית על סמך גיור פרטי באשרת תייר (גוש עציון, בני ברק וכו׳), והרבנות הראשית **חוסמת ב-100%** גיור פרטי לנישואין בישראל.\n\n**כלל ברזל בזמן שאתם בחו״ל:** אל תעלו על טיסת החזור בלי להוציא ידנית את **5 מסמכי האפוסטיל מחו״ל** (תעודת לידה מורחבת, תעודת יושר <180 יום, תמצית רווקות) + **תעודת נישואין מאומתת באפוסטיל**!\n\n👇 **כדי להתאים לכם את המסלול המדויק, לחצו מיהו בן/בת הזוג שלכם:**\n\n[[ASK:FIANCE_IL: בן/בת הזוג אזרח/ית ישראלי/ת|🇮🇱 א) בן/בת הזוג שלי אזרח/ית ישראלי/ת]]\n[[ASK:FIANCE_FJ: בן/בת הזוג יהודי/יה מלידה מחו״ל|✡️ ב) בן/בת הזוג יהודי/יה מלידה מחו״ל (עולים יחד)]]\n[[ASK:FIANCE_OT: בן/בת הזוג מתגייר/ת או לא ישראלי/יה|🌍 ג) בן/בת הזוג מתגייר/ת / לא אזרח ישראלי או יהודי מלידה]]\n[[NAV:obs|0|📖 או מזערו וקראו: מלכודת הגיור הפרטי]]", "fiance_il": "🇮🇱 **בן/בת הזוג אזרח/ית ישראלי/ת — המסלול הכפול שלכם (סעיף ג.10):**\n\n1. **בזמן שאתם בחו״ל לחתונה:** הוציאו ידנית את **5 מסמכי האפוסטיל** + החתימו **אפוסטיל על תעודת הנישואין** (וודאו שמצבכם הקודם רשום כ׳רווק/ה׳ לקבלת פטור סעיף ד.2.ה!).\n2. **פתחו הליך מדורג (נוהל 5.2.0008 / טופס אש/6):** מעניק אשרת עבודה B/1 ומעמד חוקי מיידי.\n3. **השלימו גיור ברבנות במקביל (סעיף ג.10):** לפי סעיף ג.10 זכותכם להשלים **אימות ברבנות הראשית (גיור לחומרא / אישור גיור)** במקביל להליך המדורג!\n\n[[NAV:obs|1|1️⃣ קראו תחילה: 5 מסמכי האפוסטיל מחו״ל]]\n[[NAV:obs|5|2️⃣ השלב הבא: שני בני הזוג חייבים ללמוד (רב ומדריכת כלה)]]\n[[NAV:hebrew-engine|ash6|3️⃣ פתיחת טופס אש/6 להליך מדורג]]", "fiance_fj": "✡️ **בן/בת הזוג יהודי/יה מלידה מחו״ל (עולים יחד לישראל):**\n\n1. **מדוע הגיור הפרטי לבדו לא יספיק:** משרד הפנים אינו מכיר בגיור פרטי של תייר בישראל לעלייה עצמאית.\n2. **לפני טיסת החזור:** הביאו בתיק היד את **5 מסמכי האפוסטיל של שניכם**, **אישור יהדות אורתודוקסי** של בן/בת הזוג, ו**תעודת נישואין עם אפוסטיל**, ובארץ השלימו **אישור גיור ברבנות הראשית**!\n\n[[NAV:term|go_bag|1️⃣ קראו תחילה: תיק-יד (Go-Bag) לפני טיסה]]\n[[NAV:obs|2|2️⃣ השלב הבא: אישור גיור ברבנות למען הילדים]]\n[[NAV:obs|5|3️⃣ השלב הבא: רב מלווה ומדריכת כלה מוכרים]]", "fiance_ot": "🚨 **עצרו — אזור סכנה כאשר שני בני הזוג אינם אזרחים ישראלים או יהודים מלידה:**\n\nגיור פרטי שנעשה בישראל באשרת תייר **אינו מקנה זכות שבות** לכם או לבן/בת זוגכם! אם תטוסו להתחתן ותחזרו בציפייה לעלייה, **משרד הפנים יסרב לשניכם.**\n\n**2 האפשרויות החוקיות שלכם:**\n• **אפשרות א׳ (קהילה מוכרת בחו״ל):** השלמת גיור בבית דין מוכר בחו״ל (RCA, בד״ץ לונדון, קונסיסטואר) + **9–12 חודשי מגורים בקהילה לאחר המקווה**.\n• **אפשרות ב׳ (וועדת חריגים בישראל):** איסוף **5 מסמכי האפוסטיל** בחו״ל והגשת **טופס אש/1** לוועדת חריגים לגיור ממלכתי.\n\n[[NAV:term|overseas_giyur|1️⃣ קראו תחילה: חוק 9–12 חודשי קהילה בחו״ל]]\n[[NAV:obs|3|2️⃣ השלב הבא: מעבר וועדת חריגים (טופס אש/1)]]\n[[NAV:obs|1|3️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל]]", "priv_bd": "⚠️ **עצרו — קראו זאת לפני שתפנו למשרד הפנים או לרבנות!**\n\nגיור דרך **גוש עציון (׳גיור כהלכה׳), בני ברק (ר׳ קרליץ), בתי דין פרטיים או גיור בחו״ל ללא אישור** נחשב **גיור פרטי** ולא גיור ממלכתי של הרבנות הראשית.\n1. **משרד הפנים:** פקידי משרד הפנים **אינם מאשרים עלייה** למי שהתגייר בגיור פרטי באשרת תייר ומקפיאים תיקים ל-2–5+ שנים.\n2. **הרבנות הראשית:** הרבנות **מסרבת ב-100%** לרשום לנישואין בוגרי גיור פרטי ללא השלמת **מסלול הרבנות הראשית (׳אישור גיור׳ / גיור לחומרא)** או **הליך מדורג (נוהל 5.2.0008 / טופס אש/6)**.\n\n[[NAV:obs|0|1️⃣ קראו תחילה: מלכודת הגיור הפרטי וגוש עציון]]\n[[NAV:obs|2|2️⃣ קראו כעת: חוק 9 חודשי קהילה ואישור גיור]]\n[[NAV:obs|1|3️⃣ קראו כעת: 5 מסמכי האפוסטיל מחו״ל (שעון 180 יום)]]", "dahan": "⚠️ **עצרו — האמת על גיור לא-אורתודוקסי (פסק דין דהן):**\n\n1. **הרבנות הראשית פוסלת ב-100% גיור לא-אורתודוקסי**—וחוסמת לצמיתות אתכם ואת ילדיכם מנישואין כדת משה וישראל.\n2. **משרד הפנים גורר תיקי דהן במשך שנים**, בעוד שניתן להשלים **גיור הלכתי המוכר ב-100% ברבנות** באותו פרק זמן עם הרב המלווה ומדריכת הכלה שלנו!\n\n[[NAV:term|dahan_truth|1️⃣ קראו תחילה: האמת על פס״ד דהן מול הרבנות]]\n[[NAV:obs|5|2️⃣ קראו כעת: רב מלווה ומדריכת כלה מוכרים ברבנות]]", "vc": "🏛️ **מעבר וועדת חריגים (טופס אש/1) באשרת תייר B/2:**\n\nתיירים חסומים מכניסה לגיור ממלכתי ללא מעבר **וועדת חריגים** עם טופס אש/1, אש/3, מכתב הסבר בעברית, 5–8+ מכתבי רב וקהילה ו-5 מסמכי אפוסטיל לפני פקיעת 90 ימי האשרה.\n\n[[NAV:obs|3|1️⃣ קראו תחילה: מעבר וועדת חריגים והקפאת השעון]]\n[[NAV:obs|1|2️⃣ קראו כעת: 5 מסמכי האפוסטיל מחו״ל]]\n[[NAV:hebrew-engine|ash1|3️⃣ פתיחת ממלא טופס אש/1 ואש/3 בעברית]]"}}, "fr": {"cat1": "🕍 CATÉGORIE 1 : CONVERSION, BEIT DIN PRIVÉS & GRAND RABBINAT", "cat2": "🛂 CATÉGORIE 2 : DÉLAIS VISA, 5 DOCUMENTS APOSTILLÉS & SURVIE TOURISTE", "cat3": "💍 CATÉGORIE 3 : VISA CONJOINT (5.2.0008), LETTRES PIBA & CASIER", "freeTag": "Guides Gratuits", "f_h": "🧭 Quel parcours vous intéresse ?", "f_s": "Touchez votre parcours ci-dessous pour ouvrir votre guide étape par étape :", "f_b1": "🕍 1) Giyur — Je veux me convertir (ou valider ma conversion)", "f_b2": "✈️ 2) Aliyah — Je veux faire mon Aliyah en Israël (ou Visa Conjoint)", "f_b3": "✡️ 3) Les Deux — Je veux me convertir ET faire mon Aliyah / me marier", "q1_t": "Étape 1 sur 2 : Où en êtes-vous dans votre parcours de conversion ?", "q1_opts": [["🏛️ Converti(e) / en cours dans un Beit Din Privé (Gush Etzion, Bnei Brak, Chabad ou Étranger)", "priv_bd"], ["💔 Conversion non-orthodoxe envisagée / effectuée (Réformée / Massorti — arrêt Dahan)", "dahan_bd"], ["🛂 En Israël sous visa touriste B/2 (90j) & souhaite le Giyur d'État (Va'adat Charigim)", "tourist_vc"], ["📚 Besoin d'un Rabbin accompagnateur reconnu, Madrichat Kallah & préparation 700 questions", "state_prep"]], "q2_t": "Étape 1 sur 2 : Quelle situation d'Aliyah ou de statut vous correspond ?", "q2_opts": [["🚨 Encore à l'étranger / Départ d'urgence : Quels 5 documents apostillés mettre dans mon Go-Bag ?", "go_bag"], ["✈️ Déjà en Israël : Aliyah en Israël (Shinui Ma'amad Formulaire Ash/456 & Sal Klita 24 mois)", "shinui"], ["💍 Conjoint marié ou concubin d'un citoyen israélien (Procédure Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Demande d'Aliyah ou Visa Conjoint avec un ancien antécédent / Casier (Bulletin n°3)", "crim"]], "q3_t": "Étape 1 sur 2 : Quelle est votre situation actuelle pour Conversion + Aliyah ?", "q3_opts": [["⚠️ Converti(e) via Gush Etzion / Bnei Brak / Beit Din privé ou étranger & souhaite Aliyah / Mariage", "priv_bd"], ["💑 En couple avec un(e) Israélien(ne) : Besoin Visa Conjoint (5.2.0008) + Conversion Rabbinat (Art. ג.10)", "dual"], ["🛂 Sous visa touriste B/2 (sans conjoint israélien) : Besoin Va'adat Charigim (Ash/1) + Guide Survie", "tourist_vc"], ["✈️ Encore à l'étranger : Prévoit de venir en Israël pour conversion & Aliyah (5 docs apostillés d'abord !)", "go_bag"]], "res": {"priv_bd": ["🚨 GUIDE BEIT DIN PRIVÉ / ÉTRANGER", "Pourquoi le Misrad HaPanim et le Grand Rabbinat bloquent Gush Etzion / les conversions privées", "Le Misrad HaPanim bloque les conversions privées touristes pendant 2 à 5+ ans, et le Grand Rabbinat refuse à 100% d'enregistrer le mariage sans validation d'État ('Ishur Giyur' / Giyur L'Chumra) ou dossier Conjoint (Nohal 5.2.0008) en parallèle.", [["1️⃣ À lire d'abord : Piège Gush Etzion & Beit Din Privé", "obs:0"], ["2️⃣ Étape 2 : Règle des 9 mois en communauté & Ishur Giyur", "obs:2"], ["3️⃣ Étape 3 : Les 5 documents apostillés (Délai 180j)", "obs:1"]]], "dahan_bd": ["⚠️ GUIDE CONVERSION NON-ORTHODOXE ('DAHAN')", "Pourquoi le Grand Rabbinat bloque les conversions 'Dahan' pour le mariage en Israël", "Une conversion non-orthodoxe vous interdit définitivement (ainsi qu'à vos futurs enfants) de vous marier via le Rabbinat israélien. Vous pouvez accomplir un parcours 100% Halakhique reconnu dans le même délai.", [["1️⃣ À lire d'abord : La vérité sur l'arrêt Dahan vs Rabbinat", "term:dahan_truth"], ["2️⃣ Étape 2 : Rabbin accompagnateur & Madrichat Kallah reconnus", "obs:5"], ["3️⃣ Étape 3 : Passer la Va'adat Charigim (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ GUIDE TOURISTE B/2 VERS GIYUR D'ÉTAT", "Comment passer la Va'adat Charigim (Form. Ash/1) avant la fin des 90 jours", "Les touristes doivent obtenir l'accord de la Commission des Exceptions avec le formulaire Ash/1, une lettre explicative en hébreu (Michtav Hesber), 5–8+ lettres de rabbins et les 5 documents apostillés.", [["1️⃣ À lire d'abord : Va'adat Charigim & gel du délai de 90j", "obs:3"], ["2️⃣ Étape 2 : Les 5 documents apostillés obligatoires", "obs:1"], ["3️⃣ Étape 3 : Télétravail légal & logement sous visa B/2", "obs:8"]]], "state_prep": ["🕍 PRÉPARATION BEIT DIN & RABBINAT", "Les deux partenaires doivent étudier ! Rabbin, Kallah & Examen 700 Questions", "Même si l'un des conjoints est citoyen israélien juif de naissance, le Beit Din exige que les DEUX partenaires étudient avec un rabbin reconnu et une Madrichat Kallah certifiée.", [["1️⃣ À lire d'abord : Guide Rabbin, Kallah & Examen Beit Din", "obs:5"], ["2️⃣ Étape 2 : 5–8+ lettres de recommandation rabbiniques", "term:community_letters"], ["3️⃣ Ouvrir les 700 Questions Beit Din & 56 Chants →", "app:beit-din-150|"]]], "go_bag": ["🚨 PROTOCOLE GO-BAG AVANT LE VOL", "Ne montez PAS dans l'avion sans vos 5 originaux doublement apostillés", "Commander une Copie Intégrale de Naissance, un Certificat de Célibat et un Bulletin n°3 depuis Israël prend des mois pendant que le délai de 180 jours expire.", [["1️⃣ À lire d'abord : Check-list Go-Bag avant départ", "term:go_bag"], ["2️⃣ Étape 2 : Les 5 documents apostillés & l'horloge des 180j", "obs:1"], ["3️⃣ Étape 3 : Transférer des fonds & payer son loyer en ₪ sans TZ", "term:fx_shield"]]], "shinui": ["✈️ ALIYAH EN ISRAËL (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formulaire Ash/456, MR/14a/b & le piège des 24 mois du Sal Klita", "Exige le formulaire Ash/456 (exonéré de frais art. ג.7), MR/14a/b et des apostilles <180j. Attention : >24 mois cumulés en Israël durant les 3 dernières années annule la prime Sal Klita (~21 700 ₪) !", [["1️⃣ À lire d'abord : 5 documents apostillés & règles Sal Klita", "term:five_docs"], ["2️⃣ Étape 2 : Assurance santé pont de 60–90 jours", "term:bridge_health"], ["3️⃣ Ouvrir le générateur hébreu Ash/456 & MR/14a →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 GUIDE VISA CONJOINT (NOHAL 5.2.0008)", "Réussir la procédure graduée et l'interrogatoire des 80 questions en salles séparées", "Les agents vérifient chaque date du formulaire Ash/6 (6 pages) et vous séparent dans deux pièces pour 80 questions sur votre vie quotidienne.", [["1️⃣ À lire d'abord : L'interrogatoire des 80 questions en salles séparées", "obs:6"], ["2️⃣ Étape 2 : Les 5 documents apostillés & dispense art. ד.2.ה", "obs:1"], ["3️⃣ Ouvrir le moteur hébreu Formulaire Ash/6 →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 GUIDE DOUBLE PARCOURS COUPLE (ART. ג.10)", "Menez simultanément votre résidence conjoint ET votre conversion au Rabbinat !", "Selon le Nohal 5.2.0008 art. ג.10, vous avez le droit légal d'obtenir votre permis de travail B/1 conjoint ET de compléter votre conversion au Rabbinat en parallèle !", [["1️⃣ À lire d'abord : Les deux partenaires doivent étudier", "obs:5"], ["2️⃣ Étape 2 : L'interrogatoire des 80 questions", "obs:6"], ["3️⃣ Étape 3 : Pourquoi les conversions privées bloquent les mariages", "obs:2"]]], "crim": ["🛡️ GUIDE RÉHABILITATION • CASIER JUDICIAIRE", "Ne cachez jamais une ancienne arrestation — Utilisez un dossier de réhabilitation", "Cocher 'Aucun antécédent' lorsqu'une mention figure sur le casier judiciaire entraîne un refus immédiat. Une déclaration transparente avec lettre explicative en hébreu évite 2 ans de recours.", [["1️⃣ À lire d'abord : Guide Aliyah / Visa avec antécédents", "obs:7"], ["2️⃣ Étape 2 : Les 5 documents apostillés & vérification 3 pays", "obs:1"], ["3️⃣ Demander l'assistance d'un avocat vérifié →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ATTENTION — Avant de voyager pour vous marier, votre parcours dépend d'UNE question clé !**\n\nLe Misrad HaPanim **refuse** l'Aliyah immédiate après une conversion privée sous visa touriste (Gush Etzion, Bnei Brak, etc.), et le Grand Rabbinat **bloque à 100%** ces conversions pour le mariage en Israël.\n\n**Règle d'or pendant votre séjour au pays :** Ne reprenez PAS l'avion sans récupérer en personne vos **5 documents originaux apostillés** + votre **Acte de Mariage apostillé** !\n\n👇 **Pour connaître votre parcours exact, indiquez le statut de votre fiancé(e) :**\n\n[[ASK:FIANCE_IL: Mon/ma fiancé(e) est citoyen(ne) israélien(ne)|🇮🇱 A) Mon/ma fiancé(e) est citoyen(ne) israélien(ne)]]\n[[ASK:FIANCE_FJ: Mon/ma fiancé(e) est Juif/Juive de naissance à l'étranger|✡️ B) Mon/ma fiancé(e) est Juif/Juive de naissance (Aliyah ensemble)]]\n[[ASK:FIANCE_OT: Mon/ma fiancé(e) est aussi en conversion / non-Israélien|🌍 C) Mon/ma fiancé(e) se convertit / n'est ni Israélien ni Juif de naissance]]\n[[NAV:obs|0|📖 Ou réduire & lire : Piège des Beit Din Privés]]", "fiance_il": "🇮🇱 **Votre fiancé(e) est citoyen(ne) israélien(ne) — Votre Double Parcours (Art. ג.10) :**\n\n1. **Pendant votre séjour au pays :** Récupérez vos **5 documents apostillés** + faites apostiller votre **Acte de Mariage** (mentionnant votre état antérieur 'Célibataire' pour la dispense art. ד.2.ה !).\n2. **Ouvrez le dossier Conjoint (*Nohal 5.2.0008* / Form. Ash/6) :** Vous donne immédiatement un visa de travail B/1.\n3. **Validation au Grand Rabbinat en parallèle (Art. ג.10) :** Vous avez le droit légal de mener simultanément votre dossier Conjoint et votre conversion d'État (*Ishur Giyur* / *Giyur L'Chumra*) !\n\n[[NAV:obs|1|1️⃣ À lire d'abord : Les 5 documents apostillés]]\n[[NAV:obs|5|2️⃣ Étape 2 : Les deux partenaires doivent étudier]]\n[[NAV:hebrew-engine|ash6|3️⃣ Ouvrir le générateur hébreu Formulaire Ash/6]]", "fiance_fj": "✡️ **Votre fiancé(e) est Juif/Juive de naissance à l'étranger (Aliyah ensemble) :**\n\n1. **Pourquoi votre conversion privée seule ne suffit pas :** Le Misrad HaPanim ne reconnaît pas une conversion privée touriste pour une Aliyah indépendante.\n2. **Avant de revenir en Israël :** Mettez dans votre Go-Bag les **5 documents apostillés des deux conjoints**, l'**Attestation de Judaïté (*Ishur Yahadut*)** du Consistoire de votre fiancé(e) et votre **Acte de Mariage apostillé**, puis validez votre conversion auprès du Grand Rabbinat !\n\n[[NAV:term|go_bag|1️⃣ À lire d'abord : Check-list Go-Bag avant le vol]]\n[[NAV:obs|2|2️⃣ Étape 2 : Validation Rabbinat (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Étape 3 : Rabbin accompagnateur & Madrichat Kallah]]", "fiance_ot": "🚨 **STOP — Danger si aucun des deux partenaires n'est citoyen israélien ou Juif de naissance :**\n\nUne conversion privée effectuée en Israël sous visa touriste **ne donne pas droit à la Loi du Retour** ! Si vous rentrez vous marier avec un partenaire non-israélien et revenez demander l'Aliyah, **le Misrad HaPanim vous refusera tous les deux.**\n\n**Vos 2 options légales :**\n• **Option A (Communauté reconnue à l'étranger) :** Valider la conversion des deux conjoints via le Consistoire/Beit Din reconnu + résider **9 à 12 mois complets APRÈS le Mikvé** dans cette communauté.\n• **Option B (*Va'adat Charigim* en Israël) :** Récupérer vos **5 documents apostillés** au pays et déposer le **Formulaire Ash/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ À lire d'abord : Règle des 9–12 mois à l'étranger]]\n[[NAV:obs|3|2️⃣ Étape 2 : Passer la Va'adat Charigim (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Étape 3 : Les 5 documents apostillés]]", "priv_bd": "⚠️ **AVERTISSEMENT CRITIQUE — Lisez ceci avant d'aller au Misrad HaPanim !**\n\nUne conversion via **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), un Beit Din privé ou à l'étranger sans validation** est une **conversion privée**—et **NON** le Giyur d'État du Grand Rabbinat.\n\n1. **Le Misrad HaPanim bloque l'Aliyah :** Refus d'Aliyah immédiate sous visa touriste et dossiers gelés pendant **2 à 5+ ans**.\n2. **Le Grand Rabbinat bloque le mariage :** Refus à **100%** d'enregistrer votre mariage sans validation officielle du Rabbinat (*Ishur Giyur*) ou procédure Conjoint (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ À lire d'abord : Piège Gush Etzion & Beit Din Privé]]\n[[NAV:obs|2|2️⃣ Étape 2 : Règle des 9 mois & Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Étape 3 : Les 5 documents apostillés obligatoires]]", "dahan": "⚠️ **STOP — La vérité sur les conversions non-orthodoxes ('Arrêt Dahan') :**\n\n1. **Le Grand Rabbinat rejette à 100% les conversions non-orthodoxes**—vous empêchant définitivement (ainsi que vos enfants) de vous marier via le Rabbinat en Israël.\n2. **Vous pouvez accomplir une conversion 100% Halakhique reconnue par le Rabbinat** dans le même délai avec notre Rabbin accompagnateur et Madrichat Kallah !\n\n[[NAV:term|dahan_truth|1️⃣ À lire d'abord : Vérité arrêt Dahan vs Rabbinat]]\n[[NAV:obs|5|2️⃣ Étape 2 : Rabbin accompagnateur & Madrichat Kallah]]", "vc": "🏛️ **Passer la *Va'adat Charigim* (Formulaire Ash/1) sous visa touriste B/2 :**\n\nLes touristes doivent obtenir l'autorisation de la Commission des Exceptions avec les formulaires Ash/1 et Ash/3, un *Michtav Hesber* en hébreu, 5–8+ lettres rabbiniques et les 5 documents apostillés avant l'expiration des 90 jours.\n\n[[NAV:obs|3|1️⃣ À lire d'abord : Va'adat Charigim & gel du délai]]\n[[NAV:obs|1|2️⃣ Étape 2 : Les 5 documents apostillés]]\n[[NAV:hebrew-engine|ash1|3️⃣ Ouvrir le moteur hébreu Formulaires Ash/1 & Ash/3]]"}}, "es": {"cat1": "🕍 CATEGORÍA 1: CONVERSIÓN, BEIT DIN PRIVADOS Y GRAN RABINATO", "cat2": "🛂 CATEGORÍA 2: RELOJES DE VISA, 5 DOCS APOSTILLADOS Y SUPERVIVENCIA", "cat3": "💍 CATEGORÍA 3: VISA DE PAREJA (5.2.0008), CARTAS PIBA Y ANTECEDENTES", "freeTag": "Guías Gratis", "f_h": "🧭 ¿En qué vía estás interesado?", "f_s": "Toca tu vía abajo para abrir tu plan de acción paso a paso:", "f_b1": "🕍 1) Giyur — Quiero convertirme (o validar mi conversión)", "f_b2": "✈️ 2) Aliyá — Quiero hacer Aliyá a Israel (o Visa Conyugal)", "f_b3": "✡️ 3) Ambos — Quiero convertirme Y hacer Aliyá / Casarme", "q1_t": "Paso 1 de 2: ¿Dónde te encuentras en tu proceso de conversión ahora mismo?", "q1_opts": [["🏛️ Me convertí / estoy convirtiéndome en un Beit Din Privado (Gush Etzion, Bnei Brak, Jabad o Exterior)", "priv_bd"], ["💔 Considerando / completé una conversión No-Ortodoxa (Reformista / Conservadora — fallo Dahan)", "dahan_bd"], ["🛂 En Israel con visa de turista B/2 (90d) y quiero Giyur Estatal (Va'adat Jariguim)", "tourist_vc"], ["📚 Necesito Rabino Patrocinador reconocido, Madrijat Kalá y preparación de 700 preguntas", "state_prep"]], "q2_t": "Paso 1 de 2: ¿Qué situación de Aliyá o residencia se ajusta a ti?", "q2_opts": [["🚨 Aún en el extranjero / Salida de emergencia: ¿Qué 5 docs apostillados llevar en mi Go-Bag?", "go_bag"], ["✈️ Ya en Israel: Aliyá desde dentro de Israel (Shinui Ma'amad Form. Ash/456 y Sal Klita 24 meses)", "shinui"], ["💍 Cónyuge casado o pareja de hecho de un ciudadano israelí (Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Solicitud de Aliyá o Visa de Pareja con antecedentes penales antiguos / cancelados", "crim"]], "q3_t": "Paso 1 de 2: ¿Cuál es tu situación actual para Conversión + Aliyá?", "q3_opts": [["⚠️ Convertido vía Gush Etzion / Bnei Brak / Beit Din privado o exterior y quiero Aliyá / Matrimonio", "priv_bd"], ["💑 En pareja con ciudadano(a) israelí: Necesito Visa Conyugal (5.2.0008) + Conversión Rabinato (Sec. ג.10)", "dual"], ["🛂 Con visa de turista B/2 (sin pareja israelí): Necesito Va'adat Jariguim (Ash/1) + Guía Supervivencia", "tourist_vc"], ["✈️ Aún en el extranjero: Planeo ir a Israel para convertir y hacer Aliyá (¡5 docs apostillados primero!)", "go_bag"]], "res": {"priv_bd": ["🚨 PLAN DE ACCIÓN • BEIT DIN PRIVADO / EXTERIOR", "Por qué Misrad HaPanim y el Gran Rabinato bloquean Gush Etzion / conversiones privadas", "Misrad HaPanim congela las conversiones privadas de turistas durante 2 a 5+ años, y el Gran Rabinato rechaza al 100% registrar matrimonios sin validación estatal ('Ishur Giyur' / Giyur L'Jumra) o trámite Conyugal (Nohal 5.2.0008) en paralelo.", [["1️⃣ Leer primero: Trampa de Gush Etzion y Beit Din Privado", "obs:0"], ["2️⃣ Paso 2: Regla de 9 meses en comunidad e Ishur Giyur", "obs:2"], ["3️⃣ Paso 3: Los 5 documentos apostillados (Reloj 180d)", "obs:1"]]], "dahan_bd": ["⚠️ PLAN DE ACCIÓN • CONVERSIÓN NO-ORTODOXA ('DAHAN')", "Por qué el Gran Rabinato bloquea las conversiones 'Dahan' para casarse en Israel", "Una conversión no-ortodoxa te impide permanentemente a ti y a tus futuros hijos casarse por el Rabinato israelí. Puedes completar una vía 100% Halájica reconocida en el mismo plazo.", [["1️⃣ Leer primero: La verdad sobre el fallo Dahan vs. Rabinato", "term:dahan_truth"], ["2️⃣ Paso 2: Rabino Patrocinador y Madrijat Kalá reconocidos", "obs:5"], ["3️⃣ Paso 3: Aprobar Va'adat Jariguim (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ PLAN DE ACCIÓN • TURISTA B/2 A GIYUR ESTATAL", "Cómo aprobar Va'adat Jariguim (Form. Ash/1) antes de que venzan tus 90 días", "Los turistas deben aprobar el Comité de Excepciones con el Formulario Ash/1, una carta legal en hebreo (Mijtav Hesber), 5–8+ cartas rabínicas y los 5 documentos apostillados.", [["1️⃣ Leer primero: Va'adat Jariguim y congelar el reloj de 90d", "obs:3"], ["2️⃣ Paso 2: Los 5 documentos apostillados obligatorios", "obs:1"], ["3️⃣ Paso 3: Trabajo remoto legal y vivienda con visa B/2", "obs:8"]]], "state_prep": ["🕍 PREPARACIÓN BEIT DIN Y RABINATO", "¡Ambos miembros de la pareja deben estudiar! Rabino, Kalá y Examen de 700 Preguntas", "Incluso cuando uno de los cónyuges es ciudadano israelí judío de nacimiento, el Beit Din exige que AMBOS estudien con un Rabino reconocido y una Madrijat Kalá certificada.", [["1️⃣ Leer primero: Guía de Rabino, Kalá y Examen Beit Din", "obs:5"], ["2️⃣ Paso 2: 5–8+ cartas de recomendación rabínicas", "term:community_letters"], ["3️⃣ Abrir 700 Preguntas Beit Din y 56 Canciones →", "app:beit-din-150|"]]], "go_bag": ["🚨 PROTOCOLO GO-BAG ANTES DEL VUELO", "NO subas al avión sin tus 5 originales doblemente apostillados", "Pedir Partida Literal de Nacimiento, Fe de Soltería y Antecedentes Penales a distancia desde Israel tarda meses mientras vence el plazo de 180 días.", [["1️⃣ Leer primero: Lista Go-Bag antes de volar", "term:go_bag"], ["2️⃣ Paso 2: Los 5 documentos apostillados y el reloj de 180d", "obs:1"], ["3️⃣ Paso 3: Transferir fondos y pagar alquiler en ₪ sin TZ", "term:fx_shield"]]], "shinui": ["✈️ ALIYÁ EN ISRAEL (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formulario Ash/456, MR/14a/b y el límite de 24 meses de la Sal Klita", "Requiere Formulario Ash/456 (exento de tasa art. ג.7), MR/14a/b y apostillas <180d. ¡Atención: >24 meses acumulados en Israel en los 3 años previos cancela la beca Sal Klita (~21.700 ₪)!", [["1️⃣ Leer primero: 5 documentos apostillados y reglas Sal Klita", "term:five_docs"], ["2️⃣ Paso 2: Seguro médico puente de 60–90 días", "term:bridge_health"], ["3️⃣ Abrir generador hebreo Ash/456 y MR/14a →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 PLAN VISA CONYUGAL (NOHAL 5.2.0008)", "Superar el proceso gradual y el interrogatorio de 80 preguntas en salas separadas", "Los funcionarios revisan cada fecha del Formulario Ash/6 (6 páginas) y los separan en dos salas para hacerles 80 preguntas de la vida diaria.", [["1️⃣ Leer primero: Interrogatorio de 80 preguntas en salas separadas", "obs:6"], ["2️⃣ Paso 2: Los 5 documentos apostillados y exención art. ד.2.ה", "obs:1"], ["3️⃣ Abrir motor hebreo Formulario Ash/6 →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DOBLE VÍA PARA PAREJAS (SEC. ג.10)", "¡Tramita tu Residencia Conyugal Y tu Conversión en el Rabinato simultáneamente!", "Según el Nohal 5.2.0008 sec. ג.10, tienes el derecho legal de asegurar tu permiso de trabajo B/1 conyugal Y completar tu conversión en el Rabinato al mismo tiempo.", [["1️⃣ Leer primero: Ambos miembros de la pareja deben estudiar", "obs:5"], ["2️⃣ Paso 2: Interrogatorio de 80 preguntas", "obs:6"], ["3️⃣ Paso 3: Por qué las conversiones privadas bloquean bodas", "obs:2"]]], "crim": ["🛡️ PLAN DE REHABILITACIÓN • ANTECEDENTES PENALES", "Nunca ocultes un arresto antiguo o cancelado — Usa un Dossier de Rehabilitación", "Marcar 'Sin antecedentes' cuando un registro antiguo aparece en el informe federal causa rechazo inmediato. La declaración previa con carta legal en hebreo evita apelaciones de 2 años.", [["1️⃣ Leer primero: Guía Aliyá / Visa con antecedentes", "obs:7"], ["2️⃣ Paso 2: Los 5 documentos apostillados y regla de 3 países", "obs:1"], ["3️⃣ Solicitar revisión o acompañamiento de abogado →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ALTO — Antes de viajar para casarte, ¡tu vía depende de UNA pregunta crítica!**\n\nMisrad HaPanim **rechaza** la Aliyá inmediata con una conversión privada de turista (Gush Etzion, Bnei Brak, etc.), y el Gran Rabinato **bloquea al 100%** las conversiones privadas para casarse en Israel.\n\n**Regla de Oro mientras estás en tu país:** ¡NO abordes tu vuelo de regreso sin sacar en persona tus **5 documentos originales doblemente apostillados** + tu **Acta de Matrimonio apostillada**!\n\n👇 **Para darte la vía exacta para ti y tu prometido(a), toca quién es tu pareja abajo:**\n\n[[ASK:FIANCE_IL: Mi prometido(a) es ciudadano(a) israelí|🇮🇱 A) Mi prometido(a) es ciudadano(a) israelí]]\n[[ASK:FIANCE_FJ: Mi prometido(a) es judío(a) de nacimiento del extranjero|✡️ B) Mi prometido(a) es judío(a) de nacimiento (hacemos Aliyá juntos)]]\n[[ASK:FIANCE_OT: Mi prometido(a) también se convierte / no es israelí|🌍 C) Mi prometido(a) se convierte / no es ciudadano israelí ni judío de nacimiento]]\n[[NAV:obs|0|📖 O minimizar y leer: Trampa de Beit Din Privados]]", "fiance_il": "🇮🇱 **Tu prometido(a) es ciudadano(a) israelí — Tu Doble Vía Exacta (Sec. ג.10):**\n\n1. **Mientras estás en tu país casándote:** Saca en persona tus **5 documentos apostillados** + apostilla tu **Acta de Matrimonio** (asegúrate de que indique tu estado previo 'Soltero/a' para la exención de la Sec. ד.2.ה).\n2. **Abre el Trámite Conyugal (*Nohal 5.2.0008* / Form. Ash/6):** Asegura tu visa de trabajo B/1 de inmediato.\n3. **Completa la conversión del Rabinato en paralelo (Sec. ג.10):** ¡Tienes el derecho legal de tramitar tu residencia conyugal y la validación estatal del Rabinato (*Ishur Giyur* / *Giyur L'Jumra*) simultáneamente!\n\n[[NAV:obs|1|1️⃣ Leer primero: Los 5 documentos apostillados]]\n[[NAV:obs|5|2️⃣ Paso 2: Ambos deben estudiar (Rabino y Kalá)]]\n[[NAV:hebrew-engine|ash6|3️⃣ Abrir motor hebreo Formulario Ash/6]]", "fiance_fj": "✡️ **Tu prometido(a) es judío(a) de nacimiento del extranjero (Aliyá juntos):**\n\n1. **Por qué tu conversión privada sola no basta:** Misrad HaPanim no reconoce una conversión privada de turista para Aliyá independiente.\n2. **Antes de volar de regreso:** Lleva en tu Go-Bag los **5 documentos apostillados de ambos**, el **Certificado de Judaísmo (*Ishur Yahadut*)** ortodoxo de tu pareja y su **Acta de Matrimonio apostillada**, ¡y valida tu conversión en el Gran Rabinato en Israel!\n\n[[NAV:term|go_bag|1️⃣ Leer primero: Lista Go-Bag antes del vuelo]]\n[[NAV:obs|2|2️⃣ Paso 2: Validación del Rabinato (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Paso 3: Rabino Patrocinador y Madrijat Kalá]]", "fiance_ot": "🚨 **ALTO — Zona de Peligro si ninguno de los dos es ciudadano israelí o judío de nacimiento:**\n\n¡Una conversión privada hecha en Israel con visa de turista **no otorga derechos de la Ley del Retorno** ni a ti ni a tu cónyuge! Si vuelas a casarte y regresan esperando hacer Aliyá, **Misrad HaPanim los rechazará a ambos.**\n\n**Tus 2 opciones legales:**\n• **Opción A (Comunidad reconocida en el exterior):** Validar la conversión de ambos en un Beit Din reconocido (AMIA, FCJE, RCA) + vivir **9 a 12 meses completos DESPUÉS de la Mikve** en esa comunidad.\n• **Opción B (*Va'adat Jariguim* en Israel):** Traer tus **5 documentos apostillados** y presentar el **Formulario Ash/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ Leer primero: Regla de 9–12 meses en el exterior]]\n[[NAV:obs|3|2️⃣ Paso 2: Aprobar Va'adat Jariguim (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Paso 3: Los 5 documentos apostillados]]", "priv_bd": "⚠️ **ADVERTENCIA CRÍTICA — ¡Lee esto antes de ir a Misrad HaPanim!**\n\nUna conversión a través de **Gush Etzion (*Giyur K'Halaja*), Bnei Brak (Rabino Karelitz), cortes privadas o en el exterior sin validar** es una **conversión privada**—**NO** el Giyur Estatal del Gran Rabinato.\n\n1. **Misrad HaPanim bloquea la Aliyá:** Rechaza la Aliyá inmediata de turistas y congela expedientes durante **2 a 5+ años**.\n2. **El Gran Rabinato bloquea el matrimonio:** Rechaza al **100%** las conversiones privadas para casarse en Israel sin validación estatal (*Ishur Giyur*) o trámite Conyugal (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ Leer primero: Trampa de Gush Etzion y Beit Din Privado]]\n[[NAV:obs|2|2️⃣ Paso 2: Regla de 9 meses e Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Paso 3: Los 5 documentos apostillados obligatorios]]", "dahan": "⚠️ **ALTO — La verdad sobre las conversiones no-ortodoxas ('Fallo Dahan'):**\n\n1. **El Gran Rabinato rechaza al 100% las conversiones no-ortodoxas**—impidiéndote permanentemente a ti y a tus futuros hijos casarse por el Rabinato en Israel.\n2. ¡Puedes completar una **conversión 100% Halájica reconocida por el Rabinato** en el mismo tiempo con nuestro Rabino Patrocinador y Madrijat Kalá!\n\n[[NAV:term|dahan_truth|1️⃣ Leer primero: Verdad fallo Dahan vs. Rabinato]]\n[[NAV:obs|5|2️⃣ Paso 2: Rabino Patrocinador y Madrijat Kalá]]", "vc": "🏛️ **Cómo aprobar *Va'adat Jariguim* (Formulario Ash/1) con visa de turista B/2:**\n\nLos turistas deben aprobar el Comité de Excepciones con los Formularios Ash/1 y Ash/3, un *Mijtav Hesber* en hebreo, 5–8+ cartas rabínicas y los 5 documentos apostillados antes de que venzan sus 90 días.\n\n[[NAV:obs|3|1️⃣ Leer primero: Aprobar Va'adat Jariguim y congelar reloj]]\n[[NAV:obs|1|2️⃣ Paso 2: Los 5 documentos apostillados]]\n[[NAV:hebrew-engine|ash1|3️⃣ Abrir motor hebreo Formularios Ash/1 y Ash/3]]"}}, "de": {"cat1": "🕍 KATEGORIE 1: GIUR, PRIVATE BEIT DINS & OBERRABBINAT", "cat2": "🛂 KATEGORIE 2: VISA-FRISTEN, 5 APOSTILLE-DOKUMENTE & TOURISTEN-SURVIVAL", "cat3": "💍 KATEGORIE 3: EHEPARTNER-VISUM (5.2.0008), PIBA-BRIEFE & VORSTRAFEN", "freeTag": "Gratis-Guides", "f_h": "🧭 Welcher Track interessiert Sie?", "f_s": "Tippen Sie unten auf Ihren Track, um Ihren Schritt-für-Schritt-Plan zu öffnen:", "f_b1": "🕍 1) Giur — Ich möchte konvertieren (oder meinen Giur bestätigen)", "f_b2": "✈️ 2) Alija — Ich möchte Alija nach Israel machen (oder Partner-Visum)", "f_b3": "✡️ 3) Beides — Ich möchte konvertieren UND Alija machen / Heiraten", "q1_t": "Schritt 1 von 2: Wo stehen Sie gerade bei Ihrem Giur?", "q1_opts": [["🏛️ Konvertiert / in Vorbereitung bei einem privaten Beit Din (Gush Etzion, Bnei Brak, Chabad oder Ausland)", "priv_bd"], ["💔 Nicht-orthodoxer Giur geplant / abgeschlossen (Reform / Konservativ — Dahan-Urteil)", "dahan_bd"], ["🛂 In Israel mit 90-Tage B/2 Touristenvisum & möchte staatlichen Giur (Va'adat Charigim)", "tourist_vc"], ["📚 Suche anerkannten Begleitrabbiner, Madrichat Kallah & 700-Fragen Beit-Din-Training", "state_prep"]], "q2_t": "Schritt 1 von 2: Welche Alija- oder Aufenthaltssituation trifft auf Sie zu?", "q2_opts": [["🚨 Noch im Ausland / Notfall-Ausreise: Welche 5 Apostille-Dokumente gehören ins Go-Bag?", "go_bag"], ["✈️ Bereits in Israel: Alija im Inland (Shinui Ma'amad Formular Ash/456 & 24-Monate Sal Klita)", "shinui"], ["💍 Verheiratet oder Lebenspartner eines israelischen Staatsbürgers (Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Antrag auf Alija oder Partner-Visum mit altem / gelöschtem Eintrag im Führungszeugnis", "crim"]], "q3_t": "Schritt 1 von 2: Wie ist Ihre aktuelle Situation für Giur + Alija?", "q3_opts": [["⚠️ Konvertiert über Gush Etzion / Bnei Brak / privates oder ausländisches Beit Din & möchte Alija / Heirat", "priv_bd"], ["💑 Mit israelischem Partner: Brauche Partner-Visum (5.2.0008) + Rabbinats-Giur gleichzeitig (Abs. ג.10)", "dual"], ["🛂 Mit B/2 Touristenvisum (ohne israelischen Partner): Brauche Va'adat Charigim (Ash/1) + Survival-Guide", "tourist_vc"], ["✈️ Noch im Ausland: Plane Einreise nach Israel für Giur & Alija (zuerst 5 Apostille-Dokumente sichern!)", "go_bag"]], "res": {"priv_bd": ["🚨 LEITFADEN • PRIVATES / AUSLÄNDISCHES BEIT DIN", "Warum Misrad HaPanim und das Oberrabbinat Gush Etzion / private Konversionen blockieren", "Misrad HaPanim friert private Touristen-Konversionen für 2–5+ Jahre ein, und das Oberrabbinat lehnt die Heiratsregistrierung zu 100% ab, sofern Sie keine staatliche Rabbinatsbestätigung ('Ishur Giyur') oder das Ehepartner-Verfahren (Nohal 5.2.0008) durchlaufen.", [["1️⃣ Zuerst lesen: Gush-Etzion- & Privat-Beit-Din-Falle", "obs:0"], ["2️⃣ Schritt 2: 9-Monate-Gemeinderegel & Ishur Giyur", "obs:2"], ["3️⃣ Schritt 3: Die 5 Apostille-Dokumente (180-Tage-Frist)", "obs:1"]]], "dahan_bd": ["⚠️ LEITFADEN • NICHT-ORTHODOXER GIUR ('DAHAN')", "Warum das Oberrabbinat 'Dahan'-Konversionen für Hochzeiten in Israel sperrt", "Ein nicht-orthodoxer Giur schließt Sie und Ihre zukünftigen Kinder dauerhaft von einer Heirat über das israelische Rabbinat aus. Sie können im gleichen Zeitraum einen 100% halachischen, vom Rabbinat anerkannten Weg absolvieren.", [["1️⃣ Zuerst lesen: Die Wahrheit über Dahan vs. Rabbinat", "term:dahan_truth"], ["2️⃣ Schritt 2: Anerkannter Rabbiner & Madrichat Kallah", "obs:5"], ["3️⃣ Schritt 3: Va'adat Charigim bestehen (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ LEITFADEN • B/2 TOURIST ZUM STAATLICHEN GIUR", "Wie Sie die Va'adat Charigim (Form. Ash/1) vor Ablauf der 90 Tage bestehen", "Touristen müssen den Ausnahmeausschuss mit Formular Ash/1, einem hebräischen Erklärungsschreiben (Michtav Hesber), 5–8+ Rabbinerbriefen und 5 Apostille-Dokumenten passieren.", [["1️⃣ Zuerst lesen: Va'adat Charigim & 90-Tage-Uhr stoppen", "obs:3"], ["2️⃣ Schritt 2: Die 5 Pflichtdokumente mit Apostille", "obs:1"], ["3️⃣ Schritt 3: Legale Fernarbeit & Wohnen mit B/2 Visum", "obs:8"]]], "state_prep": ["🕍 BEIT-DIN- & RABBINATS-VORBEREITUNG", "Beide Partner müssen lernen! Rabbiner, Kallah & 700-Fragen-Prüfung", "Selbst wenn ein Partner gebürtiger jüdischer Israeli ist, verlangt das Beit Din, dass BEIDE Partner bei einem anerkannten Rabbiner und einer zertifizierten Madrichat Kallah lernen.", [["1️⃣ Zuerst lesen: Rabbiner-, Kallah- & Prüfungs-Guide", "obs:5"], ["2️⃣ Schritt 2: 5–8+ Empfehlungsbriefe von Rabbiner & Gastfamilie", "term:community_letters"], ["3️⃣ 700 Beit-Din-Fragen & 56 Schabbat-Lieder starten →", "app:beit-din-150|"]]], "go_bag": ["🚨 GO-BAG-PROTOKOLL VOR DEM ABFLUG", "Steigen Sie NICHT ohne alle 5 doppelt apostillierten Originale ins Flugzeug", "Geburtenregisterauszug, Erweiterte Meldebescheinigung und Führungszeugnis aus Israel zu bestellen dauert Monate, während Ihre 180-Tage-Frist abläuft.", [["1️⃣ Zuerst lesen: Pre-Flight Go-Bag Checkliste", "term:go_bag"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & 180-Tage-Frist", "obs:1"], ["3️⃣ Schritt 3: Geldtransfer & Miete in ₪ zahlen ohne TZ", "term:fx_shield"]]], "shinui": ["✈️ INLANDS-ALIJA (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formular Ash/456, MR/14a/b & die 24-Monate-Klippe beim Sal Klita", "Erfordert Formular Ash/456 (gebührenfrei gem. Abs. ג.7), MR/14a/b und frische Apostillen (<180T). Achtung: >24 kumulierte Monate in Israel in den letzten 3 Jahren streichen den Sal Klita (~21.700 ₪)!", [["1️⃣ Zuerst lesen: 5 Apostille-Dokumente & Sal-Klita-Regeln", "term:five_docs"], ["2️⃣ Schritt 2: 60–90 Tage Überbrückungs-Krankenversicherung", "term:bridge_health"], ["3️⃣ Hebräischen Formular-Generator Ash/456 öffnen →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 EHEPARTNER-VISUM LEITFADEN (NOHAL 5.2.0008)", "Stufenverfahren & das 300-Fragen-Interview in getrennten Räumen bestehen", "Beamte prüfen jedes Datum auf Ihrem 6-seitigen Formular Ash/6 und trennen Sie in zwei Räume für 80 Alltagsfragen.", [["1️⃣ Zuerst lesen: Das 300-Fragen-Interview in getrennten Räumen", "obs:6"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & Befreiung Abs. ד.2.ה", "obs:1"], ["3️⃣ Hebräische Engine für Formular Ash/6 öffnen →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DOPPEL-TRACK FÜR PAARE (ABS. ג.10)", "Ehepartner-Aufenthalt UND Rabbinats-Giur gleichzeitig führen!", "Gemäß Nohal 5.2.0008 Abs. ג.10 haben Sie das gesetzliche Recht, Ihre B/1-Arbeitserlaubnis zu sichern UND gleichzeitig den Rabbinats-Giur zu absolvieren!", [["1️⃣ Zuerst lesen: Beide Partner müssen lernen (Rabbiner & Kallah)", "obs:5"], ["2️⃣ Schritt 2: 300-Fragen-Interview in getrennten Räumen", "obs:6"], ["3️⃣ Schritt 3: Warum private Giurim Rabbinats-Hochzeiten sperren", "obs:2"]]], "crim": ["🛡️ REHABILITATIONS-LEITFADEN • FÜHRUNGSZEUGNIS", "Verschweigen Sie niemals alte Einträge — Nutzen Sie ein Rehabilitations-Dossier", "'Keine Vorstrafen' anzukreuzen, wenn ein alter Eintrag im Bundeszentralregister erscheint, führt zur sofortigen Ablehnung. Offene Darlegung mit hebräischem Erklärungsschreiben verhindert 2 Jahre Berufung.", [["1️⃣ Zuerst lesen: Alija / Visum mit Vorstrafe", "obs:7"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & 3-Länder-Prüfung", "obs:1"], ["3️⃣ Geprüften Anwalt / Begleitung anfordern →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **STOPP — Bevor Sie zur Hochzeit heimfliegen, hängt Ihr Weg von EINER entscheidenden Frage ab!**\n\nMisrad HaPanim **verweigert** die sofortige Alija nach einem privaten Touristen-Giur (Gush Etzion, Bnei Brak usw.), und das Oberrabbinat **blockiert private Konversionen zu 100%** für Hochzeiten in Israel.\n\n**Goldene Regel während Sie zu Hause sind:** Fliegen Sie NICHT zurück, ohne persönlich alle **5 doppelt apostillierten Heimatdokumente** + Ihre **apostillierte Heiratsurkunde** mitzunehmen!\n\n👇 **Tippen Sie unten an, wer Ihr(e) Verlobte(r) ist:**\n\n[[ASK:FIANCE_IL: Mein(e) Verlobte(r) ist israelische(r) Staatsbürger(in)|🇮🇱 A) Mein(e) Verlobte(r) ist israelische(r) Staatsbürger(in)]]\n[[ASK:FIANCE_FJ: Mein(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin aus dem Ausland|✡️ B) Mein(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin (Alija gemeinsam)]]\n[[ASK:FIANCE_OT: Mein(e) Verlobte(r) konvertiert ebenfalls / nicht israelisch|🌍 C) Mein(e) Verlobte(r) konvertiert / ist weder Israeli noch gebürtige(r) Jude/Jüdin]]\n[[NAV:obs|0|📖 Oder minimieren & lesen: Privat-Beit-Din-Falle]]", "fiance_il": "🇮🇱 **Ihr(e) Verlobte(r) ist israelische(r) Staatsbürger(in) — Ihr Doppel-Track (Abs. ג.10):**\n\n1. **Während Sie zur Hochzeit zu Hause sind:** Holen Sie persönlich alle **5 Apostille-Dokumente** + die **Apostille auf Ihrer Heiratsurkunde** (mit Vermerk des vorherigen Familienstands 'ledig' für die Befreiung nach Abs. ד.2.ה!).\n2. **Starten Sie das Ehepartner-Verfahren (*Nohal 5.2.0008* / Form. Ash/6):** Sichert sofort Ihr B/1-Arbeitsvisum.\n3. **Rabbinats-Giur parallel abschließen (Abs. ג.10):** Sie haben das gesetzliche Recht, Ihr Partner-Verfahren und die staatliche Rabbinatsbestätigung (*Ishur Giyur* / *Giyur L'Chumra*) gleichzeitig zu führen!\n\n[[NAV:obs|1|1️⃣ Zuerst lesen: Die 5 Apostille-Dokumente]]\n[[NAV:obs|5|2️⃣ Schritt 2: Beide Partner müssen lernen]]\n[[NAV:hebrew-engine|ash6|3️⃣ Hebräische Engine für Formular Ash/6 öffnen]]", "fiance_fj": "✡️ **Ihr(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin aus dem Ausland (Gemeinsame Alija):**\n\n1. **Warum Ihr privater Giur allein nicht reicht:** Misrad HaPanim erkennt private Touristen-Konversionen nicht für eine eigenständige Alija an.\n2. **Vor dem Rückflug:** Packen Sie die **5 Apostille-Dokumente beider Partner**, den orthodoxen **Judentumsnachweis (*Ischur Jahadut*)** Ihres Partners und Ihre **apostillierte Heiratsurkunde** ins Handgepäck (Go-Bag) und lassen Sie Ihren Giur beim Oberrabbinat in Israel bestätigen!\n\n[[NAV:term|go_bag|1️⃣ Zuerst lesen: Pre-Flight Go-Bag Checkliste]]\n[[NAV:obs|2|2️⃣ Schritt 2: Rabbinats-Bestätigung (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Schritt 3: Begleitrabbiner & Madrichat Kallah]]", "fiance_ot": "🚨 **STOPP — Gefahrenzone, wenn keiner der Partner israelischer Staatsbürger oder gebürtiger Jude ist:**\n\nEin privater Giur in Israel mit Touristenvisum **verleiht kein Rückkehrrecht**! Wenn Sie heimfliegen, heiraten und gemeinsam Alija beantragen wollen, **lehnt Misrad HaPanim Sie beide ab.**\n\n**Ihre 2 legalen Wege:**\n• **Option A (Anerkannte Auslandsgemeinde):** Giur beider Partner bei einem vom Oberrabbinat anerkannten Beit Din (ORD, IKG, IRG, RCA) + **9–12 volle Monate Gemeindemitgliedschaft NACH der Mikwe**.\n• **Option B (*Va'adat Charigim* in Israel):** Alle **5 Apostille-Dokumente** mitbringen und **Formular Ash/1** einreichen.\n\n[[NAV:term|overseas_giyur|1️⃣ Zuerst lesen: 9–12-Monate-Regel im Ausland]]\n[[NAV:obs|3|2️⃣ Schritt 2: Va'adat Charigim bestehen (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Schritt 3: Die 5 Apostille-Dokumente]]", "priv_bd": "⚠️ **KRITISCHE WARNUNG — Lesen Sie dies vor dem Gang zum Misrad HaPanim!**\n\nEine Konversion über **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), private Gerichte oder im Ausland ohne Bestätigung** ist ein **privater Giur**—**NICHT** der staatliche Giur des Oberrabbinats.\n\n1. **Misrad HaPanim blockiert Alija:** Keine sofortige Alija für Touristen und 2 bis 5+ Jahre eingefrorene Akten.\n2. **Das Oberrabbinat blockiert Hochzeiten:** **100% Ablehnung** privater Konversionen für Eheschließungen ohne staatliche Bestätigung (*Ishur Giyur*) oder Ehepartner-Track (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ Zuerst lesen: Gush-Etzion- & Privat-Beit-Din-Falle]]\n[[NAV:obs|2|2️⃣ Schritt 2: 9-Monate-Regel & Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Schritt 3: Die 5 Pflichtdokumente mit Apostille]]", "dahan": "⚠️ **STOPP — Die Wahrheit über nicht-orthodoxe Konversionen ('Dahan-Urteil'):**\n\n1. **Das Oberrabbinat lehnt nicht-orthodoxe Konversionen zu 100% ab**—wodurch Sie und Ihre zukünftigen Kinder niemals über das Rabbinat in Israel heiraten können.\n2. Sie können im gleichen Zeitraum einen **100% halachischen, vom Rabbinat anerkannten Giur** mit unserem Begleitrabbiner und unserer Madrichat Kallah absolvieren!\n\n[[NAV:term|dahan_truth|1️⃣ Zuerst lesen: Dahan-Urteil vs. Oberrabbinat]]\n[[NAV:obs|5|2️⃣ Schritt 2: Begleitrabbiner & Madrichat Kallah]]", "vc": "🏛️ **Die *Va'adat Charigim* (Formular Ash/1) mit B/2 Touristenvisum bestehen:**\n\nTouristen müssen vor Ablauf der 90 Tage den Ausnahmeausschuss mit Formular Ash/1, Ash/3, einem hebräischen *Michtav Hesber*, 5–8+ Rabbinerbriefen und 5 Apostille-Dokumenten passieren.\n\n[[NAV:obs|3|1️⃣ Zuerst lesen: Va'adat Charigim & Frist-Stopp]]\n[[NAV:obs|1|2️⃣ Schritt 2: Die 5 Apostille-Dokumente]]\n[[NAV:hebrew-engine|ash1|3️⃣ Hebräische Engine für Formular Ash/1 & Ash/3 öffnen]]"}}, "ru": {"cat1": "🕍 КАТЕГОРИЯ 1: ГИЮР, ЧАСТНЫЕ БЕЙТ-ДИНЫ И ГЛАВНЫЙ РАВВИНАТ", "cat2": "🛂 КАТЕГОРИЯ 2: СРОКИ ВИЗ, 5 ДОКУМЕНТОВ С АПОСТИЛЕМ И ВЫЖИВАНИЕ ТУРИСТА", "cat3": "💍 КАТЕГОРИЯ 3: ВИЗА СУПРУГОВ ССТ (5.2.0008), ПИСЬМА МВД И СУДИМОСТЬ", "freeTag": "Бесплатные гиды", "f_h": "🧭 Какой трек вас интересует?", "f_s": "Выберите ваш маршрут ниже, чтобы открыть пошаговый план действий:", "f_b1": "🕍 1) Гиюр — Я хочу пройти гиюр (или подтвердить мой гиюр)", "f_b2": "✈️ 2) Алия — Я хочу репатриироваться в Израиль (или виза ССТ)", "f_b3": "✡️ 3) Оба — Я хочу пройти гиюр И репатриироваться / вступить в брак", "q1_t": "Шаг 1 из 2: На каком этапе гиюра вы находитесь сейчас?", "q1_opts": [["🏛️ Прошёл / прохожу гиюр в частном Бейт-Дине (Гуш-Эцион, Бней-Брак, Хабад или за рубежом)", "priv_bd"], ["💔 Рассматриваю / прошёл неортодоксальный гиюр (Реформистский / Консервативный — решение Дахан)", "dahan_bd"], ["🛂 В Израиле по турвизе B/2 (90 дней) и хочу государственный гиюр (Ваадат Харигим)", "tourist_vc"], ["📚 Нужен признанный раввин (Рав Мелаве), Мадрихат Калла и подготовка к 700 вопросам Бейт-Дина", "state_prep"]], "q2_t": "Шаг 1 из 2: Какая ситуация репатриации или резидентства вам подходит?", "q2_opts": [["🚨 Ещё за границей / Экстренный выезд: Какие 5 документов с апостилем должны быть в папке Go-Bag?", "go_bag"], ["✈️ Уже в Израиле: Репатриация внутри Израиля (Шинуй Маамад анкета Аш/456 и лимит 24 мес. Саль Клита)", "shinui"], ["💍 Официальный супруг(а) или гражданский партнёр израильтянина (ССТ Ноаль 5.2.0008 / анкета Аш/6)", "spousal"], ["🛡️ Заявление на Алию или ССТ при наличии старой / погашенной судимости (Справка МВД)", "crim"]], "q3_t": "Шаг 1 из 2: Какова ваша ситуация для прохождения гиюра и репатриации?", "q3_opts": [["⚠️ Прошёл гиюр через Гуш-Эцион / Бней-Брак / частный или зарубежный Бейт-Дин и хочу Алию / брак", "priv_bd"], ["💑 В паре с гражданином Израиля: Нужны И виза ССТ (5.2.0008), И гиюр Раввината одновременно (п. ג.10)", "dual"], ["🛂 По турвизе B/2 (без партнёра-израильтянина): Нужна Ваадат Харигим (Аш/1) + гид по выживанию", "tourist_vc"], ["✈️ Ещё за границей: Планирую приехать в Израиль для гиюра и Алии (сначала 5 документов с апостилем!)", "go_bag"]], "res": {"priv_bd": ["🚨 ПЛАН ДЕЙСТВИЙ • ЧАСТНЫЙ / ЗАРУБЕЖНЫЙ БЕЙТ-ДИН", "Почему МВД и Главный раввинат блокируют Гуш-Эцион и частные гиюры", "МВД замораживает дела туристов с частным гиюром на 2–5+ лет, а Главный раввинат на 100% отказывает в регистрации брака без государственного подтверждения («Ишур Гиюр» / Гиюр ле-Хумра) или параллельного открытия ССТ (Ноаль 5.2.0008).", [["1️⃣ Читать сначала: Ловушка Гуш-Эцион и частных Бейт-Динов", "obs:0"], ["2️⃣ Шаг 2: Правило 9 месяцев в общине и Ишур Гиюр", "obs:2"], ["3️⃣ Шаг 3: 5 документов с апостилем (часы 180 дней)", "obs:1"]]], "dahan_bd": ["⚠️ ПЛАН ДЕЙСТВИЙ • НЕОРТОДОКСАЛЬНЫЙ ГИЮР («ДАХАН»)", "Почему Главный раввинат блокирует гиюр «Дахан» для брака в Израиле", "Неортодоксальный гиюр навсегда лишает вас и ваших будущих детей права вступить в брак через Раввинат Израиля. Вы можете пройти 100% галахический, признанный Раввинатом гиюр за тот же срок.", [["1️⃣ Читать сначала: Вся правда о решении Дахан и Раввинате", "term:dahan_truth"], ["2️⃣ Шаг 2: Признанный раввин и Мадрихат Калла", "obs:5"], ["3️⃣ Шаг 3: Прохождение Ваадат Харигим (анкета Аш/1)", "obs:3"]]], "tourist_vc": ["🏛️ ПЛАН ДЕЙСТВИЙ • ОТ ТУРВИЗЫ B/2 К ГОСГИЮРУ", "Как пройти Ваадат Харигим (анкета Аш/1) до истечения 90 дней визы", "Туристы обязаны пройти Комиссию по исключениям с анкетой Аш/1, письмом-объяснением на иврите (Михтав Эсбер), 5–8+ письмами от раввинов и 5 документами с апостилем.", [["1️⃣ Читать сначала: Ваадат Харигим и заморозка 90 дней", "obs:3"], ["2️⃣ Шаг 2: 5 обязательных документов с апостилем", "obs:1"], ["3️⃣ Шаг 3: Легальная удалённая работа и жильё по визе B/2", "obs:8"]]], "state_prep": ["🕍 ПОДГОТОВКА К БЕЙТ-ДИНУ И РАВВИНАТУ", "Учиться обязаны ОБА партнёра! Раввин, Мадрихат Калла и экзамен из 700 вопросов", "Даже если один из супругов — урождённый еврей и гражданин Израиля, Бейт-Дин требует, чтобы ОБА партнёра прошли обучение у признанного раввина и сертифицированной Мадрихат Калла.", [["1️⃣ Читать сначала: Гид по раввину, Калле и экзамену", "obs:5"], ["2️⃣ Шаг 2: 5–8+ рекомендательных писем от раввина и семьи", "term:community_letters"], ["3️⃣ Открыть 700 вопросов Бейт-Дина и 56 песен Шаббата →", "app:beit-din-150|"]]], "go_bag": ["🚨 ПРОТОКОЛ GO-BAG ПЕРЕД ВЫЛЕТОМ", "НЕ садитесь в самолёт без всех 5 оригиналов с двойным апостилем", "Дистанционный заказ свидетельства о рождении ЗАГС, справки о незамужестве (Форма №15) и справки о несудимости МВД из Израиля занимает месяцы, пока истекают 180 дней.", [["1️⃣ Читать сначала: Чек-лист папки Go-Bag перед вылетом", "term:go_bag"], ["2️⃣ Шаг 2: 5 документов с апостилем и часы 180 дней", "obs:1"], ["3️⃣ Шаг 3: Перевод средств и оплата аренды в ₪ без ТЗ", "term:fx_shield"]]], "shinui": ["✈️ АЛИЯ ВНУТРИ ИЗРАИЛЯ (ШИНУЙ МААМАД • НОАЛЬ 5.2.0001)", "Анкета Аш/456, МР/14а/б и ловушка 24 месяцев корзины абсорбции (Саль Клита)", "Требуется анкета Аш/456 (без пошлины по п. ג.7), МР/14 и свежие апостили (<180 дн.). Внимание: >24 суммарных месяцев в Израиле за последние 3 года лишают вас выплаты Саль Клита (~21 700 ₪)!", [["1️⃣ Читать сначала: 5 документов с апостилем и правила Саль Клита", "term:five_docs"], ["2️⃣ Шаг 2: Мостовая медстраховка на 60–90 дней", "term:bridge_health"], ["3️⃣ Открыть заполнение анкет Аш/456 и МР/14 на иврите →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 ПЛАН ДЕЙСТВИЙ • ВИЗА СУПРУГОВ ССТ (НОАЛЬ 5.2.0008)", "Прохождение ступенчатой процедуры (СТУПРО) и перекрёстного допроса из 300 вопросов", "Чиновники МВД проверяют каждую дату в 6-страничной анкете Аш/6 и разводят вас по разным кабинетам для 80 бытовых вопросов.", [["1️⃣ Читать сначала: Перекрёстный допрос из 300 вопросов", "obs:6"], ["2️⃣ Шаг 2: 5 документов с апостилем и льгота п. ד.2.ה", "obs:1"], ["3️⃣ Открыть генератор анкеты Аш/6 на иврите →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 ДВОЙНОЙ ТРЕК ДЛЯ ПАР (П. ג.10)", "Ведите ступенчатую процедуру ССТ И гиюр в Раввинате одновременно!", "Согласно Ноаль 5.2.0008 п. ג.10, вы имеете законное право получить рабочую визу B/1 по ССТ И параллельно проходить государственный гиюр без закрытия дела!", [["1️⃣ Читать сначала: Учиться обязаны оба партнёра", "obs:5"], ["2️⃣ Шаг 2: Перекрёстный допрос из 300 вопросов", "obs:6"], ["3️⃣ Шаг 3: Почему частный гиюр блокирует свадьбу в Раввинате", "obs:2"]]], "crim": ["🛡️ ПЛАН РЕАБИЛИТАЦИИ • СПРАВКА О НЕСУДИМОСТИ", "Никогда не скрывайте старую или погашенную судимость — подавайте досье реабилитации", "Отметка «Не судим» при наличии старой записи в базе МВД приводит к немедленному отказу за сокрытие. Честное раскрытие с юридическим письмом на иврите спасает от 2 лет апелляций.", [["1️⃣ Читать сначала: Гид по Алии и ССТ при наличии судимости", "obs:7"], ["2️⃣ Шаг 2: 5 документов с апостилем и правило 3 стран", "obs:1"], ["3️⃣ Запросить проверку дела / сопровождение адвоката →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ВНИМАНИЕ — Прежде чем лететь домой на свадьбу, ваш маршрут зависит от ОДНОГО ключевого вопроса!**\n\nМВД Израиля **отказывает** в немедленной репатриации после частного гиюра по турвизе (Гуш-Эцион, Бней-Брак и др.), а Главный раввинат **на 100% блокирует** частные гиюры для брака в Израиле.\n\n**Золотое правило, пока вы дома:** НЕ садитесь на обратный рейс, пока лично не получите все **5 оригиналов документов с двойным апостилем** + **свидетельство о браке с апостилем**!\n\n👇 **Чтобы получить точный план для вас и вашего жениха/невесты, выберите статус вашего партнёра:**\n\n[[ASK:FIANCE_IL: Мой жених / невеста — гражданин(ка) Израиля|🇮🇱 А) Мой жених / невеста — гражданин(ка) Израиля]]\n[[ASK:FIANCE_FJ: Мой жених / невеста — еврей(ка) по рождению из-за рубежа|✡️ Б) Мой жених / невеста — еврей(ка) по рождению (репатриируемся вместе)]]\n[[ASK:FIANCE_OT: Мой жених / невеста тоже проходит гиюр / не израильтянин|🌍 В) Мой партнёр проходит гиюр / не гражданин Израиля и не еврей по рождению]]\n[[NAV:obs|0|📖 Или свернуть и прочесть: Ловушка частных Бейт-Динов]]", "fiance_il": "🇮🇱 **Ваш партнёр — гражданин(ка) Израиля (Ваш двойной трек по п. ג.10):**\n\n1. **Пока вы дома на свадьбе:** Лично получите все **5 документов с апостилем** + поставьте **апостиль на свидетельство о браке** (убедитесь, что указан добрачный статус «холост / не замужем» для льготы п. ד.2.ה!).\n2. **Откройте ступенчатую процедуру ССТ (*Ноаль 5.2.0008* / анкета Аш/6):** Это сразу даст вам легальный статус и рабочую визу B/1.\n3. **Проходите гиюр Раввината параллельно (п. ג.10):** По закону вы имеете право вести дело ССТ и государственное подтверждение гиюра (*Ишур Гиюр* / *Гиюр ле-Хумра*) одновременно!\n\n[[NAV:obs|1|1️⃣ Читать сначала: 5 документов с апостилем]]\n[[NAV:obs|5|2️⃣ Шаг 2: Учиться обязаны оба партнёра]]\n[[NAV:hebrew-engine|ash6|3️⃣ Открыть генератор анкеты Аш/6 на иврите]]", "fiance_fj": "✡️ **Ваш партнёр — еврей(ка) по рождению из-за рубежа (Репатриация вместе):**\n\n1. **Почему вашего частного гиюра недостаточно:** МВД не признаёт частный гиюр туриста в Израиле для самостоятельной Алии.\n2. **Перед обратным вылетом:** Соберите в ручную кладь (Go-Bag) **5 документов с апостилем обоих супругов**, ортодоксальное **подтверждение еврейства (*Ишур Яадут*)** партнёра и **свидетельство о браке с апостилем**, а в Израиле пройдите подтверждение гиюра в Главном раввинате!\n\n[[NAV:term|go_bag|1️⃣ Читать сначала: Чек-лист Go-Bag перед вылетом]]\n[[NAV:obs|2|2️⃣ Шаг 2: Подтверждение Раввината (Ишур Гиюр)]]\n[[NAV:obs|5|3️⃣ Шаг 3: Сопровождающий раввин и Мадрихат Калла]]", "fiance_ot": "🚨 **СТОП — Опасная зона, если ни один из партнёров не гражданин Израиля и не еврей по рождению:**\n\nЧастный гиюр, пройденный в Израиле по турвизе, **не даёт права на Закон о возвращении** ни вам, ни вашему супругу! Если вы улетите пожениться и вернётесь подавать на Алию, **МВД откажет вам обоим.**\n\n**Ваши 2 законных пути:**\n• **Вариант А (Признанная община за рубежом):** Пройти/подтвердить гиюр обоих партнёров в признанном Главным раввинатом Бейт-Дине (ФЕОР, КЕРООР, RCA) + прожить **9–12 полных месяцев в этой общине ПОСЛЕ миквы**.\n• **Вариант Б (*Ваадат Харигим* в Израиле):** Привезти все **5 документов с апостилем** и подать **анкету Аш/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ Читать сначала: Правило 9–12 месяцев в общине за рубежом]]\n[[NAV:obs|3|2️⃣ Шаг 2: Прохождение Ваадат Харигим (анкета Аш/1)]]\n[[NAV:obs|1|3️⃣ Шаг 3: 5 документов с апостилем]]", "priv_bd": "⚠️ **КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ — Прочтите перед походом в МВД!**\n\nГиюр через **Гуш-Эцион (*Гиюр ке-Галаха*), Бней-Брак (р. Карелиц), частные суды или за рубежом без подтверждения** — это **частный гиюр**, а **НЕ** государственный гиюр Главного раввината (*Маарах ха-Гиюр*).\n\n1. **МВД блокирует Алию:** Отказ в репатриации туристам и заморозка дел на **2–5+ лет**.\n2. **Главный раввинат блокирует брак:** **100% отказ** в регистрации брака без подтверждения Главного раввината (*Ишур Гиюр*) или ступенчатой процедуры ССТ (*Ноаль 5.2.0008 / анкета Аш/6*).\n\n[[NAV:obs|0|1️⃣ Читать сначала: Ловушка Гуш-Эцион и частных Бейт-Динов]]\n[[NAV:obs|2|2️⃣ Шаг 2: Правило 9 месяцев в общине и Ишур Гиюр]]\n[[NAV:obs|1|3️⃣ Шаг 3: 5 обязательных документов с апостилем]]", "dahan": "⚠️ **СТОП — Вся правда о неортодоксальном гиюре («Решение Дахан»):**\n\n1. **Главный раввинат на 100% отвергает неортодоксальные гиюры** — навсегда блокируя вам и вашим будущим детям брак через Раввинат в Израиле.\n2. Вы можете пройти **100% галахический, признанный Раввинатом гиюр** за тот же срок с нашим сопровождающим раввином и Мадрихат Калла!\n\n[[NAV:term|dahan_truth|1️⃣ Читать сначала: Правда о решении Дахан и Раввинате]]\n[[NAV:obs|5|2️⃣ Шаг 2: Признанный раввин и Мадрихат Калла]]", "vc": "🏛️ **Прохождение *Ваадат Харигим* (анкета Аш/1) по турвизе B/2:**\n\nТуристы обязаны пройти Комиссию по исключениям с анкетами Аш/1 и Аш/3, письмом на иврите (*Михтав Эсбер*), 5–8+ письмами раввинов и 5 документами с апостилем до истечения 90 дней визы.\n\n[[NAV:obs|3|1️⃣ Читать сначала: Ваадат Харигим и заморозка срока]]\n[[NAV:obs|1|2️⃣ Шаг 2: 5 обязательных документов с апостилем]]\n[[NAV:hebrew-engine|ash1|3️⃣ Открыть генератор анкет Аш/1 и Аш/3 на иврите]]"}}};

  function detectQueryOrPageLang(rawText, fallbackLang) {
    const s = String(rawText || "");
    if (/[\u0590-\u05FF]/.test(s)) return "he";
    if (/[\u0400-\u04FF]/.test(s)) return "ru";
    const uiL = (typeof getLang === "function" ? getLang() : fallbackLang) || "en";
    if (GAT_6LANG_PACK[uiL]) return uiL;
    return "en";
  }

  function getPreAiReplyByRouteKey(routeKey, lang) {
    const l = GAT_6LANG_PACK[lang] ? lang : "en";
    const P = GAT_6LANG_PACK[l].pre_ai;
    return P[routeKey] || GAT_6LANG_PACK.en.pre_ai[routeKey] || "";
  }

  function matchPreAiInstantRoute(rawText, lang) {
    const q = String(rawText || "").trim();
    const ql = q.toLowerCase();
    if (!ql || ql.length > 320) return null;
    const l = detectQueryOrPageLang(rawText, lang);
    const P = (GAT_6LANG_PACK[l] || GAT_6LANG_PACK.en).pre_ai;

    if (q.indexOf("FIANCE_IL:") !== -1 || ql.indexOf("fiance_israeli") !== -1) {
      return { routeKey: "fiance_il", reply: P.fiance_il };
    }
    if (q.indexOf("FIANCE_FJ:") !== -1 || ql.indexOf("fiance_foreign_jew") !== -1) {
      return { routeKey: "fiance_fj", reply: P.fiance_fj };
    }
    if (q.indexOf("FIANCE_OT:") !== -1 || ql.indexOf("fiance_other") !== -1) {
      return { routeKey: "fiance_ot", reply: P.fiance_ot };
    }

    const hasPrivateOrGiyur = /(gush etzion|גוש עציון|гуш.?эцион|giyur k.?halacha|גיור כהלכה|гиюр ке.?галаха|bnei brak|בני ברק|бней.?брак|karelitz|קרליץ|карелиц|private beit din|private conversion|בית דין פרטי|גיור פרטי|частный гиюр|частный бейт|conversion privée|conversión privada|privater giur|chabad|חב"ד|хабад|badatz|בד"ץ|overseas conversion|converted abroad|rca|consistoire)/.test(ql);
    const hasMarriageOrFiance = /(marry|marriage|fiance|fiancée|finace|wedding|partner|boyfriend|girlfriend|husband|wife|going home|goinghome|חתונה|להתחתן|ארוס|ארוסה|בן זוג|בת זוג|marier|mariage|fiancé|conjoint|casar|casarme|boda|prometido|pareja|heiraten|hochzeit|verlobt|жениться|выйти замуж|свадьб|жених|невест|супруг)/.test(ql);

    if (hasPrivateOrGiyur && hasMarriageOrFiance) {
      return { routeKey: "fiance_ask", reply: P.fiance_ask };
    }
    if (hasPrivateOrGiyur) {
      return { routeKey: "priv_bd", reply: P.priv_bd };
    }
    if (/(reform conversion|conservative conversion|masorti|non-orthodox|dahan|פסק דין דהן|פס"ד דהן|גיור רפורמי|גיור קונסרבטיבי|дахан|реформист|консервативн|réformé|massorti|reformista|conservador)/.test(ql)) {
      return { routeKey: "dahan", reply: P.dahan };
    }
    if (/(va.?adat charigim|va.?adat jariguim|וועדת חריגים|ועדת חריגים|ваадат харигим|exceptions committee|commission des exceptions|comité de excepciones|convert on a tourist visa|b\/2 visa conversion)/.test(ql)) {
      return { routeKey: "vc", reply: P.vc };
    }
    return null;
  }

  window.sendGatHelpdeskMsg = async function(optionalText, overrideMod, overrideForm) {
    mountDom();
    const t = HD_I18N[getLang()] || HD_I18N.en;
    const inp = document.getElementById("gat-hd-input");
    const msgs = document.getElementById("gat-hd-msgs");
    const text = (optionalText || (inp ? inp.value : "")).trim();
    if (!text || !msgs) return;
    if (!optionalText && inp) inp.value = "";

    const uBub = document.createElement("div");
    uBub.className = "gat-hd-bubble user";
    uBub.textContent = text;
    msgs.appendChild(uBub);

    const loadingBub = document.createElement("div");
    loadingBub.className = "gat-hd-bubble bot";
    loadingBub.innerHTML = "⏳ <em>...</em>";
    msgs.appendChild(loadingBub);
    msgs.scrollTop = msgs.scrollHeight;

    const preAiFn = window.matchPreAiInstantRoute || matchPreAiInstantRoute;
    const preAiHit = preAiFn(text, getLang());
    if (preAiHit) {
      const cleanUserText = text.replace(/^(FIANCE_IL:|FIANCE_FJ:|FIANCE_OT:|\[fiance_[^\]]+\])\s*/i, "");
      uBub.textContent = cleanUserText;
      const parsedPre = parseReplyAndBuildHtml(preAiHit.reply, t);
      loadingBub.innerHTML = parsedPre.html;
      const nextHistPre = (window._gatHelpdeskHistory || []).concat([
        { role: "user", text: cleanUserText },
        { role: "model", text: preAiHit.reply, routeKey: preAiHit.routeKey || "" }
      ]);
      saveRollingHistory(nextHistPre);
      window.refreshGatHelpdeskI18n(false);
      // Auto-open the matched popup / tab / module in the background when on the target page!
      if (preAiHit.autoNav && typeof window.gatExecuteSmartNav === "function") {
        const navParts = String(preAiHit.autoNav).split("|");
        const nKind = navParts[0], nArg = navParts[1] || "";
        const onHome = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
        const onApp = window.location.pathname.indexOf("/app") === 0 && typeof window.openMod === "function";
        if ((nKind === "obs" || nKind === "term" || nKind === "tab") && onHome) {
          window.gatExecuteSmartNav(preAiHit.autoNav, false);
        } else if (onApp && !["obs", "term", "tab", "pricing", "concierge"].includes(nKind)) {
          window.gatExecuteSmartNav(preAiHit.autoNav, false);
        }
      }
      setTimeout(function() { msgs.scrollTop = Math.max(0, loadingBub.offsetTop - 8); }, 20);
      return;
    }
    try {
      const res = await fetch("/api/auditDoc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "helpdesk_chat",
          uid: window.gatUid || localStorage.getItem("gat_uid") || "anon",
          lang: getLang(),
          currentMod: overrideMod || window.currentMod || "landing",
          currentForm: overrideForm || window.activePibaFormKey || "ash1",
          formSnapshot: (function() {
            const st = window.gatFormsState || {};
            return {
              activeForm: overrideForm || window.activePibaFormKey || "ash1",
              visaType: st.pf_current_visa_type || "",
              visaExpiry: st.pf_visa_expiry_date || "",
              entryDate: st.pf_entry_date_il || "",
              maritalStatus: st.pf_marital_status || "",
              countryOfBirth: st.pf_birth_country || ""
            };
          })(),
          message: text,
          history: window._gatHelpdeskHistory
        })
      });
      const data = await res.json();
      const rawReply = (data && data.reply) ? data.reply : "📲 +972-52-582-2005";
      const parsed = parseReplyAndBuildHtml(rawReply, t);
      loadingBub.innerHTML = parsed.html;

      if (parsed.navMod && parsed.navMod !== "paywall" && typeof window.openMod === "function") {
        window.gatNavigateAndMinimize(parsed.navMod, parsed.navForm, false);
      }

      const nextHist = (window._gatHelpdeskHistory || []).concat([
        { role: "user", text: text },
        { role: "model", text: rawReply }
      ]);
      saveRollingHistory(nextHist);
      window.refreshGatHelpdeskI18n(false);
    } catch (e) {
      loadingBub.innerHTML = "⚠️ 📲 WhatsApp: +972-52-582-2005";
    }
    setTimeout(function() { msgs.scrollTop = Math.max(0, loadingBub.offsetTop - 8); }, 20);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountDom);
  } else {
    mountDom();
  }
})();


// === UNIVERSAL LEFT SLIDE-OUT DRAWER WITH TOP "📲 SYNC DEVICES" BUTTON ===
(function initUniversalLeftDrawerSyncBtn() {
  const SYNC_LABELS = {
    en: "📲 Sync Devices & Pass Code",
    he: "📲 סנכרון מכשירים וקוד גישה",
    fr: "📲 Synchroniser Appareils & Code",
    es: "📲 Sincronizar Dispositivos y Código",
    de: "📲 Geräte synchronisieren & Code",
    ru: "📲 Синхронизация устройств и Код"
  };

  function curLang() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (SYNC_LABELS[pathLang]) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return SYNC_LABELS[l] ? l : "en";
  }

  function ensureLeftDrawerAndTopButton() {
    // 1. Keep <header class="topbar"> clean for the Language Selector (🌐 EN)
    const strayTopBtn = document.querySelector("header.topbar #top-sync-btn");
    if (strayTopBtn) strayTopBtn.remove();

    const globeBtn = document.getElementById("globe-lang-btn");
    if (globeBtn) {
      globeBtn.style.display = "inline-flex";
      globeBtn.style.flexShrink = "0";
    }

    // 2. If inside /app/ and #left-drawer doesn't exist yet, create the Left Drawer
    if (!document.getElementById("left-drawer")) {
      const style = document.createElement("style");
      style.textContent = `
        #left-edge-handle { touch-action: none !important; -webkit-user-select: none !important; user-select: none !important;
          position: fixed; left: 0; top: 50%; transform: translate3d(0, -50%, 0);
          z-index: 9991; width: 24px; height: 82px; background: #082548;
          border: 2px solid #03A9F4; border-left: none; border-radius: 0 12px 12px 0;
          box-shadow: 3px 0 14px rgba(8, 37, 72, 0.35);
          display: flex; align-items: center; justify-content: center;
          color: #4FC3F7; font-weight: 900; font-size: 0.95rem; cursor: pointer;
        }
        html[dir="rtl"] #left-edge-handle { touch-action: none !important; -webkit-user-select: none !important; user-select: none !important;
          left: auto; right: 0; border-right: none; border-left: 2px solid #03A9F4;
          border-radius: 12px 0 0 12px;
        }
        #left-drawer {
          position: fixed; inset: 0; background: rgba(8, 37, 72, 0.55);
          z-index: 9996; display: flex; justify-content: flex-start;
          opacity: 0; pointer-events: none; transition: opacity 0.24s ease;
          backdrop-filter: blur(2px);
        }
        html[dir="rtl"] #left-drawer { justify-content: flex-end; }
        #left-drawer.open { opacity: 1; pointer-events: auto; }
        #left-drawer-panel {
          background: #ffffff; width: 310px; max-width: 85vw; height: 100%;
          padding: 18px 14px; display: flex; flex-direction: column; gap: 10px;
          overflow-y: auto; transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 10px 0 30px rgba(0,0,0,0.25);
        }
        html[dir="rtl"] #left-drawer-panel { transform: translateX(100%); }
        #left-drawer.open #left-drawer-panel { transform: translateX(0); }
        .gat-ld-item {
          display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 12px 12px; border: none; border-bottom: 1px solid #f1f5f9;
          background: transparent; color: #082548; font-size: 0.92rem;
          font-weight: 800; text-align: start; cursor: pointer; border-radius: 10px;
        }
        .gat-ld-item:hover { background: #f0f9ff; }
      `;
      document.head.appendChild(style);

      const handle = document.createElement("div");
      handle.id = "left-edge-handle";
      handle.innerHTML = "<span>❯</span>";
      handle.onclick = function() { window.toggleLeftDrawer(true); };
      document.body.appendChild(handle);

      const bd = document.createElement("div");
      bd.id = "left-drawer";
      bd.onclick = function(e) { if (e.target === bd) window.toggleLeftDrawer(false); };
      bd.innerHTML = `
        <aside id="left-drawer-panel">
          <div class="drawer-brand-center" style="margin: 0 -4px; padding: 4px 10px 14px; border-bottom: 1.5px solid #e2e8f0; text-align: center;">
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;white-space:nowrap;font-size:1.28rem;font-weight:900;letter-spacing:-0.02em;color:#082548;line-height:1.1;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:#0288E8;color:#fff;flex-shrink:0;box-shadow:0 4px 10px rgba(2,136,232,0.3);">
                <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#ffffff;"><path d="M12 1.5L15.1 6.9H21.3L18.2 12L21.3 17.1H15.1L12 22.5L8.9 17.1H2.7L5.8 12L2.7 6.9H8.9L12 1.5Z"/></svg>
              </span>
              <span>Giyur<span style="color:#03A9F4;">Aliyah</span>Track</span>
            </div>
          </div>
          <div id="left-drawer-after-title-slot"></div>
          <button type="button" class="gat-ld-item" data-ld-key="home" onclick="window.toggleLeftDrawer(false); if(window.location.pathname.indexOf('/app')===0){ window.location.href='/'; } else if(typeof window.switchTab==='function'){ window.switchTab(0); }">🏠 Home & Track Guide</button>
          <button type="button" class="gat-ld-item" data-ld-key="hebrew" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('hebrew-engine'); else window.location.href='/app/?module=hebrew-engine';">📸 Statutory Hebrew & 8 Forms</button>
          <button type="button" class="gat-ld-item" data-ld-key="bd" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('beit-din-150'); else window.location.href='/app/?module=beit-din-150';">🕍 700 Beit Din Flashcards</button>
          <button type="button" class="gat-ld-item" data-ld-key="couples" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('couples-sync'); else window.location.href='/app/?module=couples-sync';">📱 300 Couples 2-Phone Sync</button>
          <button type="button" class="gat-ld-item" data-ld-key="songs" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('songs-prayers'); else window.location.href='/app/?module=songs-prayers';">🎵 56 Songs, Prayers & Brachot</button>
          <button type="button" class="gat-ld-item" data-ld-key="rabbi" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('rabbi-letters'); else window.location.href='/app/?module=rabbi-letters';">✍️ Rabbi & Host Family Letters</button>
          <button type="button" class="gat-ld-item" data-ld-key="vetted" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('vetted-team'); else window.location.href='/app/?module=vetted-team';">🤝 Vetted Notary, Rabbi & Lawyer</button>
          <button type="button" class="gat-ld-item" data-ld-key="paywall" style="color:#0288D1;" onclick="window.toggleLeftDrawer(false); if(typeof window.openProPaywall==='function') window.openProPaywall(); else window.location.href='/app/?paywall=1';">🔓 View Passes & Pricing</button>
        </aside>
      `;
      document.body.appendChild(bd);

      window.toggleLeftDrawer = function(open) { const d = document.getElementById("left-drawer"); if (d) d.classList.toggle("open", typeof open === "boolean" ? open : !d.classList.contains("open")); };
    }

    // 3. On landing pages (or /app/), upgrade the top .drawer-brand-center inside #left-drawer-panel
    //    so it shows the full-width GiyurAliyahTrack logo+title with 10px horizontal padding,
    //    and place #drawer-top-sync-btn IMMEDIATELY BELOW the divider as the #1 first option!
    const panel = document.getElementById("left-drawer-panel");
    if (panel) {
      const brandBox = panel.querySelector(".drawer-brand-center");
      if (brandBox && !brandBox.getAttribute("data-gat-maxed")) {
        brandBox.setAttribute("data-gat-maxed", "1");
        brandBox.style.cssText = "margin: 0 0 14px 0 !important; max-width: 100% !important; padding: 4px 10px 14px 10px !important; border-bottom: 1.5px solid #e2e8f0 !important; text-align: center !important;";
        brandBox.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;white-space:nowrap;font-size:1.28rem;font-weight:900;letter-spacing:-0.02em;color:#082548;line-height:1.1;direction:ltr;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:#0288E8;color:#fff;flex-shrink:0;box-shadow:0 4px 10px rgba(2,136,232,0.3);">
              <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#ffffff;"><path d="M12 1.5L15.1 6.9H21.3L18.2 12L21.3 17.1H15.1L12 22.5L8.9 17.1H2.7L5.8 12L2.7 6.9H8.9L12 1.5Z"/></svg>
            </span>
            <span>Giyur<span style="color:#03A9F4;">Aliyah</span>Track</span>
          </div>
        `;
      }

      let btn = panel.querySelector("#drawer-top-sync-btn"); if (btn && btn.tagName === "A") { btn.removeAttribute("href"); }
      if (!btn) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.id = "drawer-top-sync-btn";
        btn.style.cssText = "width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#ffffff;border:2.5px solid #4FC3F7;padding:13px 14px;border-radius:12px;font-size:0.92rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0 12px 0;box-shadow:0 6px 18px rgba(3,169,244,0.42);";
        btn.onclick = function(e) {
          if (e && e.preventDefault) e.preventDefault();
          if (e && e.stopPropagation) e.stopPropagation();
          if (typeof window.toggleLeftDrawer === "function") window.toggleLeftDrawer(false);
          const appDr = document.getElementById("app-drawer");
          if (appDr) appDr.classList.remove("open");
          if (typeof window.openDeviceSyncModal === "function") {
            window.openDeviceSyncModal();
          } else {
            window.location.href = "/app/?sync=1";
          }
          return false;
        };
      }

      // Ensure btn is placed RIGHT AFTER .drawer-brand-center (below the divider line!)
      if (brandBox && brandBox.parentNode) {
        if (brandBox.nextElementSibling !== btn) {
          brandBox.parentNode.insertBefore(btn, brandBox.nextElementSibling);
        }
      }
      var wantSpan = '<span>' + (SYNC_LABELS[curLang()] || SYNC_LABELS.en) + '</span>'; if (btn.innerHTML !== wantSpan) { btn.innerHTML = wantSpan; }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureLeftDrawerAndTopButton);
  } else {
    ensureLeftDrawerAndTopButton();
  }
  setInterval(ensureLeftDrawerAndTopButton, 1200);
})();

// === 3-BUTTON HOMEPAGE TRACK DIAGNOSTIC FUNNEL (100% 6-LANGUAGE NATIVE) ===
(function initThreeButtonTrackFunnel() {
  const STEP_PILLS_I18N = {
    en: ["1. Choose Track", "2. Your Situation", "3. Action Plan"],
    he: ["1. בחירת מסלול", "2. המצב שלכם", "3. תוכנית פעולה"],
    fr: ["1. Choisir Parcours", "2. Votre Situation", "3. Plan d'Action"],
    es: ["1. Elegir Vía", "2. Tu Situación", "3. Plan de Acción"],
    de: ["1. Track Wählen", "2. Ihre Situation", "3. Aktionsplan"],
    ru: ["1. Выбор трека", "2. Ваша ситуация", "3. План действий"]
  };

  function getFunnelLang() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    const pack = window.GAT_6LANG_PACK || {};
    if (pack[pathLang]) return pathLang;
    const activeL = String(window.gatLang || window.appLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    if (pack[activeL]) return activeL;
    return "en";
  }

  function updateStepPills(activeStep) {
    const l = getFunnelLang();
    const pills = STEP_PILLS_I18N[l] || STEP_PILLS_I18N.en;
    const bar = document.getElementById("gat-3track-step-pills");
    if (!bar) return;
    bar.innerHTML = pills.map(function(lbl, idx) {
      const stepNum = idx + 1;
      const isCurrent = stepNum === activeStep;
      const isDone = stepNum < activeStep;
      const bg = isCurrent
        ? "linear-gradient(135deg,#082548 0%,#0288D1 100%)"
        : (isDone ? "#e0f2fe" : "#f1f5f9");
      const col = isCurrent ? "#ffffff" : (isDone ? "#0369a1" : "#64748b");
      const bdr = isCurrent ? "1.5px solid #03A9F4" : (isDone ? "1px solid #38bdf8" : "1px solid #cbd5e1");
      return '<div style="background:' + bg + ';color:' + col + ';border:' + bdr + ';border-radius:999px;padding:6px 8px;font-size:0.73rem;font-weight:900;text-align:center;">' + (isDone ? "✓ " : "") + lbl + '</div>';
    }).join("");
  }

  function highlightActiveTrackBtn(n) {
    [1, 2, 3].forEach(function(idx) {
      const btn = document.getElementById("gat-track-btn-" + idx);
      if (!btn) return;
      if (idx === n) {
        btn.style.background = "linear-gradient(135deg,#0288D1 0%,#03A9F4 100%)";
        btn.style.borderColor = "#fde047";
        btn.style.boxShadow = "0 0 0 3px rgba(253,224,71,0.45), 0 8px 20px rgba(3,169,244,0.4)";
      } else {
        btn.style.background = "linear-gradient(135deg,#082548 0%,#03A9F4 100%)";
        btn.style.borderColor = "#4FC3F7";
        btn.style.boxShadow = "0 6px 16px rgba(3,169,244,0.22)";
      }
    });
  }

  window.selectGatMainTrack = function(n, skipScroll) {
    window._gatActiveFunnelTrack = n;
    window._gatActiveFunnelRes = null;
    const l = getFunnelLang();
    const pack = window.GAT_6LANG_PACK || {};
    const L = pack[l] || pack.en;
    const box = document.getElementById("gat-3track-diag-box");
    if (!box || !L) return;

    updateStepPills(2);
    highlightActiveTrackBtn(n);

    const titleStr = n === 1 ? L.q1_t : (n === 2 ? L.q2_t : L.q3_t);
    const listArr = n === 1 ? L.q1_opts : (n === 2 ? L.q2_opts : L.q3_opts);
    box.innerHTML =
      '<div id="gat-3track-step1-panel" style="background:#f0f9ff;border:2.5px solid #0288D1;border-radius:16px;padding:15px;margin-top:12px;box-shadow:0 10px 26px rgba(2,136,209,0.18);">' +
        '<div style="font-size:0.95rem;font-weight:900;color:#082548;margin-bottom:10px;">👇 ' + titleStr + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">' +
          listArr.map(function(x) {
            return '<button type="button" onclick="window.showGatDiagResult(\'' + x[1] + '\')" style="width:100%;background:#ffffff;color:#082548;border:2px solid #38bdf8;border-radius:12px;padding:12px 14px;font-size:0.86rem;font-weight:850;text-align:start;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;box-shadow:0 2px 8px rgba(8,37,72,0.06);"><span>' + x[0] + '</span><span style="color:#0288D1;font-weight:900;">❯</span></button>';
          }).join("") +
        '</div>' +
      '</div>';

    if (!skipScroll) {
      setTimeout(function() {
        try { box.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
      }, 40);
    }
  };

  window.showGatDiagResult = function(k, skipScroll) {
    window._gatActiveFunnelRes = k;
    const l = getFunnelLang();
    const pack = window.GAT_6LANG_PACK || {};
    const L = pack[l] || pack.en;
    const r = L && L.res ? L.res[k] : null;
    const box = document.getElementById("gat-3track-diag-box");
    if (!r || !box) return;

    updateStepPills(3);

    box.innerHTML =
      '<div id="gat-3track-step2-panel" style="background:#082548;color:#fff;border:2.5px solid #03A9F4;border-radius:18px;padding:16px;margin-top:12px;box-shadow:0 14px 32px rgba(8,37,72,0.32);">' +
        '<div style="display:inline-block;background:rgba(3,169,244,0.22);border:1px solid #4FC3F7;color:#81D4FA;font-size:0.68rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">' + r[0] + '</div>' +
        '<h3 style="font-size:1.04rem;font-weight:900;color:#fff;margin:0 0 8px 0;">' + r[1] + '</h3>' +
        '<p style="font-size:0.84rem;color:#e2e8f0;line-height:1.48;margin:0 0 12px 0;">' + r[2] + '</p>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">' +
          r[3].map(function(s) {
            return '<button type="button" onclick="window.runGatPlaybookStep(\'' + s[1] + '\')" style="width:100%;background:linear-gradient(135deg,#0288D1 0%,#03A9F4 100%);color:#fff;border:1.5px solid #81D4FA;border-radius:11px;padding:11px 13px;font-size:0.84rem;font-weight:900;text-align:start;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;"><span>' + s[0] + '</span><span>→</span></button>';
          }).join("") +
        '</div>' +
      '</div>';

    if (!skipScroll) {
      setTimeout(function() {
        try { box.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
      }, 40);
    }
  };

  window.runGatPlaybookStep = function(act) {
    const p = String(act || "").split(":"), k = p[0], v = p[1] || "";
    if (k === "obs" && typeof window.openObstacle === "function") window.openObstacle(Number(v));
    else if (k === "term" && typeof window.openTerm === "function") window.openTerm(v);
    else if (k === "tab" && typeof window.switchTab === "function") window.switchTab(Number(v));
    else if (k === "app") {
      const m = v.split("|");
      const modKey = encodeURIComponent(m[0] || "hebrew-engine");
      window.location.href = "/app/?module=" + modKey + "&mod=" + modKey + (m[1] ? "&form=" + encodeURIComponent(m[1]) : "");
    }
  };

  window.syncFunnelAndCatHeadersI18n = function() {
    const l = getFunnelLang();
    const pack = window.GAT_6LANG_PACK || {};
    const u = pack[l] || pack.en;
    if (!u) return;

    const c1 = document.getElementById("gat-cat-hdr-1");
    if (c1) c1.innerHTML = '<span>' + u.cat1 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';
    const c2 = document.getElementById("gat-cat-hdr-2");
    if (c2) c2.innerHTML = '<span>' + u.cat2 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';
    const c3 = document.getElementById("gat-cat-hdr-3");
    if (c3) c3.innerHTML = '<span>' + u.cat3 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';

    const sec = document.getElementById("gat-3track-funnel-card");
    if (sec) {
      const bCss = "width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#fff;border:2.5px solid #4FC3F7;padding:13px 15px;border-radius:14px;font-size:0.92rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 6px 16px rgba(3,169,244,0.22);text-align:start;transition:all 0.15s ease;";
      sec.innerHTML =
        '<div id="gat-3track-step-pills" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;"></div>' +
        '<div style="font-size:1.06rem;font-weight:900;color:#082548;margin-bottom:3px;">' + u.f_h + '</div>' +
        '<div style="font-size:0.81rem;color:#475569;font-weight:700;margin-bottom:10px;">' + u.f_s + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:9px;">' +
          '<button type="button" id="gat-track-btn-1" style="' + bCss + '" onclick="window.selectGatMainTrack(1)"><span>' + u.f_b1 + '</span><span>❯</span></button>' +
          '<button type="button" id="gat-track-btn-2" style="' + bCss + '" onclick="window.selectGatMainTrack(2)"><span>' + u.f_b2 + '</span><span>❯</span></button>' +
          '<button type="button" id="gat-track-btn-3" style="' + bCss + '" onclick="window.selectGatMainTrack(3)"><span>' + u.f_b3 + '</span><span>❯</span></button>' +
        '</div>' +
        '<div id="gat-3track-diag-box"></div>';

      updateStepPills(1);

      // Restore open state if the user had already tapped a track or playbook before applyLang finished!
      if (window._gatActiveFunnelTrack) {
        window.selectGatMainTrack(window._gatActiveFunnelTrack, true);
        if (window._gatActiveFunnelRes) {
          window.showGatDiagResult(window._gatActiveFunnelRes, true);
        }
      }
    }
  };

  function mount() {
    const v0 = document.getElementById("view-0");
    if (!v0) return;
    if (!document.getElementById("gat-3track-funnel-card")) {
      const em = v0.querySelector("[onclick*='go_bag']") || v0.children[1];
      if (!em) return;
      const sec = document.createElement("section");
      sec.id = "gat-3track-funnel-card";
      sec.style.cssText = "background:#fff;border:2.5px solid #03A9F4;border-radius:20px;padding:15px 14px;margin:8px 0 16px 0;box-shadow:0 12px 32px rgba(3,169,244,0.16);";
      em.insertAdjacentElement("afterend", sec);
    }
    window.syncFunnelAndCatHeadersI18n();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();

// === TAP OUTSIDE DRAWER TO AUTO-CLOSE (MOBILE TOUCH + DESKTOP MOUSE) ===
(function initTapOutsideDrawerAutoClose() {
  function handleOutsideTap(e) {
    const t = e.target;
    if (!t) return;
    const leftBd = document.getElementById("left-drawer");
    const leftPn = document.getElementById("left-drawer-panel");
    const leftHd = document.getElementById("left-edge-handle"); const hamClicked = t.closest && t.closest(".hamburger-btn"); if (hamClicked) return;
    if (leftBd && leftBd.classList.contains("open")) {
      if (leftPn && !leftPn.contains(t) && (!leftHd || !leftHd.contains(t))) {
        if (typeof window.toggleLeftDrawer === "function") window.toggleLeftDrawer(false);
        else leftBd.classList.remove("open");
      }
    }
    const appBd = document.getElementById("app-drawer");
    if (appBd && appBd.classList.contains("open")) {
      const appPn = appBd.querySelector(".drawer-panel");
      const hamBtn = document.querySelector(".hamburger-btn");
      if (appPn && !appPn.contains(t) && (!hamBtn || !hamBtn.contains(t))) {
        if (typeof window.toggleDrawer === "function") window.toggleDrawer(false);
        else appBd.classList.remove("open");
      }
    }
  }
  document.addEventListener("pointerdown", handleOutsideTap, true);
})();


(function hookLanguageSwitchersForChat() {
  ["setLang", "setAppLang", "selectLangDirect", "applyLang"].forEach(function(fnName) {
    const orig = window[fnName];
    if (typeof orig === "function" && !orig._gatChatHooked) {
      const wrapped = function() {
        const r = orig.apply(this, arguments);
        setTimeout(function() {
          if (typeof window.refreshGatHelpdeskI18n === "function") window.refreshGatHelpdeskI18n(true);
          if (typeof window.syncFunnelAndCatHeadersI18n === "function") window.syncFunnelAndCatHeadersI18n(); if (typeof window.renderTabSpecificFaqs === "function") window.renderTabSpecificFaqs(); if (typeof window.renderUnifiedHamburgerDrawer === "function") window.renderUnifiedHamburgerDrawer();
        }, 60);
        return r;
      };
      wrapped._gatChatHooked = true;
      window[fnName] = wrapped;
    }
  });
})();

// === PERMANENT 1.0x SCALE LOCK + iOS KEYBOARD VISUAL-VIEWPORT GEOMETRY SYNC ===
(function initPermanentViewportAndKeyboardLock() {
  const VP_CONTENT = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content";

  function lockViewportMeta() {
    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      document.head.appendChild(vp);
    }
    if (!document.getElementById("gat-no-hscroll-style")) {
      const st = document.createElement("style");
      st.id = "gat-no-hscroll-style";
      st.textContent = "html, body { width: 100% !important; max-width: 100% !important; min-width: 0 !important; overflow-x: clip !important; overscroll-behavior-x: none !important; } *, *::before, *::after { box-sizing: border-box !important; touch-action: pan-y !important; } .app-viewport, .container, .view, section, details { max-width: 100% !important; overflow-x: clip !important; word-break: break-word; } #left-drawer, #app-drawer, .drawer-backdrop { position: fixed !important; inset: 0 !important; width: 100% !important; max-width: 100% !important; overflow: hidden !important; }";
      document.head.appendChild(st);
    }
    if (vp.getAttribute("content") !== VP_CONTENT) {
      vp.setAttribute("content", VP_CONTENT);
    }
  }
  lockViewportMeta();

  // Keep #gat-hd-drawer pinned inside the exact visible area above the iOS/Android keyboard
  function syncDrawerToVisualViewport() {
    const d = document.getElementById("gat-hd-drawer");
    if (!d || !d.classList.contains("open")) {
      if (d) {
        d.style.top = "";
        d.style.bottom = "";
        d.style.height = "";
      }
      return;
    }
    const vv = window.visualViewport;
    if (!vv) return;

    // Prevent iOS Safari from panning the document when keyboard opens
    if (window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY || window.pageYOffset || 0);
    }

    const availH = Math.round(vv.height);
    const offsetTop = Math.round(vv.offsetTop);
    const isKeyboardOpen = availH < window.innerHeight - 80;

    if (isKeyboardOpen) {
      const targetH = Math.max(240, availH - 12);
      d.style.setProperty("top", (offsetTop + 6) + "px", "important");
      d.style.setProperty("bottom", "auto", "important");
      d.style.setProperty("height", targetH + "px", "important");
    } else {
      d.style.removeProperty("top");
      d.style.setProperty("bottom", "10px", "important");
      d.style.setProperty("height", "min(560px, calc(100dvh - 80px))", "important");
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncDrawerToVisualViewport);
    window.visualViewport.addEventListener("scroll", syncDrawerToVisualViewport);
  }
  window.addEventListener("resize", syncDrawerToVisualViewport);

  document.addEventListener("focusin", function(e) {
    if (e.target && e.target.matches("input, textarea, select")) {
      lockViewportMeta();
      setTimeout(syncDrawerToVisualViewport, 50);
      setTimeout(syncDrawerToVisualViewport, 250);
    }
  });

  document.addEventListener("focusout", function() {
    lockViewportMeta();
    setTimeout(function() {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY || window.pageYOffset || 0);
      }
      syncDrawerToVisualViewport();
    }, 80);
  });

  // Block multi-touch pinch zoom & rapid double-tap zoom everywhere
  document.addEventListener("gesturestart", function(e) { e.preventDefault(); }, { passive: false });
  document.addEventListener("gesturechange", function(e) { e.preventDefault(); }, { passive: false });
  document.addEventListener("gestureend", function(e) { e.preventDefault(); }, { passive: false });
  document.addEventListener("touchmove", function(e) {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Double-tap zoom is already prevented via touch-action: pan-y in CSS without blocking button clicks
})();

// === IN-APP UNIVERSAL GUIDE MODAL & ANTI-DOOM-SCROLL SUB-TABS ===
(function initAppAntiDoomScrollAndModals() {
  const isInsideApp = window.location.pathname.indexOf("/app") === 0;
  if (!isInsideApp) return;

  try {
    const sp = new URLSearchParams(window.location.search);
    const qLang = (sp.get("lang") || "").toLowerCase();
    if (["en", "he", "fr", "es", "de", "ru"].indexOf(qLang) !== -1) {
      localStorage.setItem("gat_lang", qLang);
      window.appLang = qLang;
      if (typeof window.setAppLang === "function") {
        setTimeout(function() { window.setAppLang(qLang); }, 50);
      } else if (typeof window.setLang === "function") {
        setTimeout(function() { window.setLang(qLang); }, 50);
      }
    }
  } catch (e) {}

  let _appGuideCache = {};
  async function ensureLangDict(lang) {
    if (_appGuideCache[lang]) return _appGuideCache[lang];
    try {
      const r = await fetch("/i18n/" + lang + ".json?v=" + Date.now());
      _appGuideCache[lang] = await r.json();
      return _appGuideCache[lang];
    } catch (e) {
      return {};
    }
  }

  function ensureInAppSheetModal() {
    let sh = document.getElementById("gat-inapp-guide-sheet");
    if (sh) return sh;
    sh = document.createElement("div");
    sh.id = "gat-inapp-guide-sheet";
    sh.style.cssText = "position:fixed;inset:0;background:rgba(8,37,72,0.65);backdrop-filter:blur(3px);z-index:2147483644;display:none;align-items:flex-end;justify-content:center;padding:12px;";
    sh.onclick = function(e) { if (e.target === sh) sh.style.display = "none"; };
    sh.innerHTML = `
      <div style="background:#ffffff;width:100%;max-width:640px;max-height:84dvh;border-radius:20px;border:2.5px solid #03A9F4;box-shadow:0 24px 60px rgba(8,37,72,0.45);display:flex;flex-direction:column;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#082548 0%,#0b3b59 100%);color:#fff;padding:13px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <span id="gat-ias-tag" style="font-size:0.74rem;font-weight:900;color:#4FC3F7;text-transform:uppercase;letter-spacing:0.03em;"></span>
          <button type="button" onclick="document.getElementById('gat-inapp-guide-sheet').style.display='none'" style="background:rgba(255,255,255,0.16);color:#fff;border:none;width:32px;height:32px;border-radius:8px;font-size:1rem;font-weight:900;cursor:pointer;">✕</button>
        </div>
        <div style="padding:18px 16px;overflow-y:auto;line-height:1.56;color:#1e293b;font-size:0.9rem;">
          <h3 id="gat-ias-title" style="font-size:1.15rem;font-weight:900;color:#082548;margin:0 0 10px 0;line-height:1.3;"></h3>
          <p id="gat-ias-body" style="margin:0 0 14px 0;color:#334155;"></p>
          <div style="background:#ffe4e6;border-left:4px solid #e11d48;padding:12px 14px;border-radius:10px;margin-bottom:12px;">
            <h4 id="gat-ias-bad-t" style="color:#9f1239;font-size:0.88rem;font-weight:900;margin:0 0 4px 0;"></h4>
            <div id="gat-ias-bad-b" style="color:#881337;font-size:0.84rem;"></div>
          </div>
          <div style="background:#e0f2fe;border-left:4px solid #0284c7;padding:12px 14px;border-radius:10px;">
            <h4 id="gat-ias-good-t" style="color:#075985;font-size:0.88rem;font-weight:900;margin:0 0 4px 0;"></h4>
            <div id="gat-ias-good-b" style="color:#0c4a6e;font-size:0.84rem;"></div>
          </div>
        </div>
        <div style="padding:12px 16px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <span id="gat-ias-time" style="font-size:0.82rem;font-weight:800;color:#0284c7;"></span>
          <button type="button" onclick="document.getElementById('gat-inapp-guide-sheet').style.display='none'" style="background:#03A9F4;color:#fff;border:none;padding:9px 16px;border-radius:10px;font-weight:900;font-size:0.84rem;cursor:pointer;">✓ OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(sh);
    return sh;
  }

  function renderInAppSheet(item) {
    if (!item) return;
    const sh = ensureInAppSheetModal();
    const l = String(window.appLang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
    sh.dir = l === "he" ? "rtl" : "ltr";
    document.getElementById("gat-ias-tag").textContent = item.tag || "";
    document.getElementById("gat-ias-title").textContent = item.title || "";
    document.getElementById("gat-ias-body").textContent = item.body || "";
    document.getElementById("gat-ias-bad-t").textContent = item.badTitle || "";
    document.getElementById("gat-ias-bad-b").innerHTML = item.badText || "";
    document.getElementById("gat-ias-good-t").textContent = item.goodTitle || "";
    document.getElementById("gat-ias-good-b").innerHTML = item.goodText || "";
    document.getElementById("gat-ias-time").textContent = item.time || "";
    sh.style.display = "flex";
  }

  if (typeof window.openObstacle !== "function") {
    window.openObstacle = async function(idx) {
      const l = String(window.appLang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
      const d = await ensureLangDict(l);
      const list = d._obstacles || [];
      if (list[idx]) renderInAppSheet(list[idx]);
    };
  }

  if (typeof window.openTerm !== "function") {
    window.openTerm = async function(key) {
      const l = String(window.appLang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
      const d = await ensureLangDict(l);
      const terms = d._terms || {};
      if (terms[key]) renderInAppSheet(terms[key]);
    };
  }

  const SUBTAB_I18N = {
    en: ["📝 1. Fill 8 Forms", "📸 2. Snap Letter", "✈️ 3. 180d & Dossier"],
    he: ["📝 1. מילוי 8 טפסים", "📸 2. סריקת מכתב", "✈️ 3. 180 יום ותיק"],
    fr: ["📝 1. 8 Formulaires", "📸 2. Scanner Lettre", "✈️ 3. 180j & Dossier"],
    es: ["📝 1. 8 Formularios", "📸 2. Escanear Carta", "✈️ 3. 180d y Dossier"],
    de: ["📝 1. 8 Formulare", "📸 2. Brief scannen", "✈️ 3. 180T & Dossier"],
    ru: ["📝 1. 8 Анкет МВД", "📸 2. Скан письма", "✈️ 3. 180д и Досье"]
  };

  function setupHebrewEngineSubTabs() {
    const mod = document.getElementById("mod-hebrew-engine");
    if (!mod || document.getElementById("gat-he-subtabs")) return;
    const children = Array.from(mod.children);
    if (children.length < 3) return;

    const l = String(window.appLang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
    const lbls = SUBTAB_I18N[l] || SUBTAB_I18N.en;

    const bar = document.createElement("div");
    bar.id = "gat-he-subtabs";
    bar.style.cssText = "display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:#e2e8f0;padding:5px;border-radius:12px;margin:8px 0 14px 0;position:sticky;top:0;z-index:20;";
    const tabs = [
      { id: "forms", label: lbls[0] },
      { id: "scanner", label: lbls[1] },
      { id: "dossier", label: lbls[2] }
    ];
    bar.innerHTML = tabs.map(function(t, i) {
      return '<button type="button" data-he-sub="' + t.id + '" onclick="window.switchHebrewEngineSubTab(\'' + t.id + '\')" style="border:none;padding:9px 6px;border-radius:9px;font-size:0.76rem;font-weight:900;cursor:pointer;background:' + (i === 0 ? '#03A9F4' : 'transparent') + ';color:' + (i === 0 ? '#fff' : '#334155') + ';">' + t.label + '</button>';
    }).join("");

    mod.insertBefore(bar, children[1] || children[0]);

    window.switchHebrewEngineSubTab = function(subKey) {
      const curL = String(window.appLang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
      const curLbls = SUBTAB_I18N[curL] || SUBTAB_I18N.en;
      const btns = bar.querySelectorAll("button[data-he-sub]");
      btns.forEach(function(b, idx) {
        const active = b.getAttribute("data-he-sub") === subKey;
        b.style.background = active ? "#03A9F4" : "transparent";
        b.style.color = active ? "#ffffff" : "#334155";
        if (curLbls[idx]) b.textContent = curLbls[idx];
      });

      const allSections = Array.from(mod.children).filter(function(el) {
        return el !== bar && !el.classList.contains("mod-head") && el.tagName !== "H1" && el.tagName !== "H2";
      });

      allSections.forEach(function(el) {
        const txt = (el.id + " " + el.className + " " + (el.innerHTML || "").slice(0, 400)).toLowerCase();
        const isFormFiller = txt.indexOf("piba") !== -1 || txt.indexOf("ash1") !== -1 || txt.indexOf("ash6") !== -1 || txt.indexOf("form-engine") !== -1;
        const isScanner = txt.indexOf("snap") !== -1 || txt.indexOf("camera") !== -1 || txt.indexOf("auditdoc") !== -1 || (txt.indexOf("file") !== -1 && txt.indexOf("upload") !== -1);
        if (subKey === "forms") {
          el.style.display = isFormFiller ? "" : "none";
        } else if (subKey === "scanner") {
          el.style.display = (isScanner && !isFormFiller) ? "" : "none";
        } else {
          el.style.display = (!isFormFiller && !isScanner) ? "" : "none";
        }
      });
      const anyVisible = allSections.some(function(el) { return el.style.display !== "none"; });
      if (!anyVisible) allSections.forEach(function(el) { el.style.display = ""; });
      };

    setTimeout(function() { window.switchHebrewEngineSubTab("forms"); }, 60);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupHebrewEngineSubTabs);
  } else {
    setupHebrewEngineSubTabs();
  }
})();


// === REAL HUMAN VISITOR & PAGE DWELL-TIME PULSE TRACKER (FIREBASE) ===
(function initFirebaseHumanVisitorPulse() {
  try {
    const ua = navigator.userAgent || "";
    if (navigator.webdriver || /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|gtmetrix/i.test(ua)) {
      return;
    }
    let vid = localStorage.getItem("gat_human_vid");
    if (!vid) {
      vid = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
      localStorage.setItem("gat_human_vid", vid);
    }
    let sid = sessionStorage.getItem("gat_human_sid");
    if (!sid) {
      sid = "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
      sessionStorage.setItem("gat_human_sid", sid);
    }

    let unushedSec = 0;
    let totalPageSec = 0;
    let initialSent = false;

    function getActiveLang() {
      const p = (window.location.pathname.split("/")[1] || "").toLowerCase();
      if (["en","he","fr","es","de","ru"].indexOf(p) !== -1) return p;
      const l = String(window.appLang || window.gatLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
      return ["en","he","fr","es","de","ru"].indexOf(l) !== -1 ? l : "en";
    }

    function getCleanPath() {
      const p = window.location.pathname || "/";
      const sp = new URLSearchParams(window.location.search);
      const m = sp.get("module") || sp.get("mod") || "";
      return m ? (p + "?module=" + m) : p;
    }

    function sendPulse(deltaSec, isArrival) {
      if (!isArrival && deltaSec <= 0) return;
      const payload = JSON.stringify({
        mode: "visitor_pulse",
        vid: vid,
        sid: sid,
        uid: window.gatUid || localStorage.getItem("gat_uid") || "",
        lang: getActiveLang(),
        path: getCleanPath(),
        deltaSec: deltaSec,
        totalPageSec: totalPageSec,
        isArrival: !!isArrival,
        tz: (Intl && Intl.DateTimeFormat) ? (Intl.DateTimeFormat().resolvedOptions().timeZone || "") : "",
        ref: document.referrer ? String(document.referrer).slice(0, 120) : "",
        screen: window.innerWidth + "x" + window.innerHeight
      });
      unushedSec = 0;
      fetch("/api/auditDoc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true
      }).catch(function() {});
    }

    setTimeout(function() {
      if (document.visibilityState === "visible") {
        initialSent = true;
        sendPulse(3, true);
      }
    }, 3000);

    setInterval(function() {
      if (document.visibilityState === "visible") {
        unushedSec += 1;
        totalPageSec += 1;
        if (initialSent && unushedSec >= 25) {
          sendPulse(unushedSec, false);
        }
      }
    }, 1000);

    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "hidden" && unushedSec > 0) {
        sendPulse(unushedSec, false);
      }
    });
    window.addEventListener("pagehide", function() {
      if (unushedSec > 0) sendPulse(unushedSec, false);
    });
  } catch (e) {}
})();



// === 6-LANGUAGE TAB-SPECIFIC FAQ & LEGAL FOOTER ENGINE ===
(function initTabSpecificMultilingualFaqs() {
  const TAB_FAQS = {
  "en": {
    "kicker_sub": "Statutory & Software Guide",
    "legal_title": "Statutory Legal-Tech & Rabbinic Command Center",
    "tos_t": "📜 Terms of Service & Disclaimer",
    "tos_b": "Giyur Aliyah Track provides statutory software automation, educational preparation vaults, and administrative routing. We are not a law firm or government agency; optional legal representation is provided strictly through independent licensed Israeli attorneys.",
    "ref_t": "💳 Digital Finality & No-Refund Policy",
    "ref_b": "Because digital passes immediately unlock proprietary PDF stampers, system credits, and full study vaults, ALL DIGITAL SOFTWARE SALES ARE FINAL AND NON-REFUNDABLE upon unlock (except for accidental duplicate billing). Human concierge placement fees are non-refundable once translation or professional matching begins (refundable only if we cannot match you in your region within 7 business days).",
    "priv_t": "🔒 Privacy & Zero-Leakage Data Security",
    "priv_b": "All form drafts and 2-phone couples rooms are encrypted and isolated to your personal WhatsApp UID. We never sell or share applicant data with third parties.",
    "tabs": {
      "0": {
        "h2": "❓ Platform, Pricing & Dual-Track FAQ",
        "items": [
          [
            "1. Why is a 15,000₪–40,000₪ lawyer retainer 'just the starting fee'—and how does Giyur Aliyah Track save you from hidden billing?",
            "Our self-serve digital engines stamp all 8 official Hebrew PIBA government forms (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, Security CV), decode Hebrew clerk letters via Smart Scan, train you on 700 Beit Din questions & 56 Shabbat Songs/Prayers, and sync couples on 300 separated-room questions."
          ],
          [
            "2. How does Modular Pricing work (90-Day Sprint vs. Lifetime)?",
            "Zero monthly subscriptions. Unlock only what fits your track: Statutory Hebrew Forms ($89 90-Day / $149 Lifetime), Beit Din 700-Q & 56 Songs Suite ($149 90-Day / $249 Lifetime, or sub-packs from $49), Spousal 300-Q 2-Phone Sync ($129 90-Day / $229 5-Yr Pass), or Full VIP Suites ($249–$649)."
          ],
          [
            "3. Are Human Concierge Services separate from software passes?",
            "Yes. Software passes unlock instant 24/7 digital tools. Optional human services—Red-Ribbon Notary ($249–$799), Vetted Sponsoring Rabbi ($349), Madrichat Kallah ($249), Couple Placement ($499), and 1-Hr Lawyer Branch Escort ($649–$799)—are booked via the Vetted Concierge Desk."
          ]
        ]
      },
      "1": {
        "h2": "❓ Track Rules & Misrad HaPanim Procedure FAQ",
        "items": [
          [
            "1. Why do Private Beit Din conversions (Gush Etzion / Bnei Brak) get blocked for marriage?",
            "The Chief Rabbinate only registers marriages with a State Conversion Certificate (Teudat Giyur from Nativ) or Chief Rabbinate validation (Ishur Giyur). If you have an Israeli partner, run Nohal 5.2.0008 Sec. ג.10 alongside Rabbanut conversion."
          ],
          [
            "2. What is the difference between Nohal 5.2.0008 (Married) and 5.2.0009 (Unmarried)?",
            "Married couples file Form Ash/6 (1 year on B/1 work visa + 4 years on A/5 temporary residency to citizenship). Unmarried common-law couples sign the 13-clause Nespach Alef affidavit before an Israeli lawyer (3 years on B/1 + 4 years on A/5)."
          ],
          [
            "3. What is the 24-Month Sal Klita cliff when making Aliyah inside Israel (Form Ash/456)?",
            "If you have spent more than 24 cumulative months in Israel during the 3 years prior to your Aliyah approval, Misrad HaKlita cancels the ~21,700₪ Sal Klita cash absorption basket."
          ]
        ]
      },
      "2": {
        "h2": "❓ Cost Breakdown, Notary & Wire Savings FAQ",
        "items": [
          [
            "1. Why do 25,000₪ law firm retainers still result in delayed files?",
            "Even if you hire an expensive lawyer, YOU still have to pull the 5 double-Apostilled homeland documents yourself, pass the 300-question separated-room clerk interview yourself, and answer the 700 Beit Din questions yourself."
          ],
          [
            "2. When is an Israeli Red-Ribbon Notary translation mandatory?",
            "Any homeland Birth Certificate, Police Check, Single Status Proof, or Marriage/Divorce Certificate not issued in Hebrew or English (or whenever a branch clerk demands Hebrew) must be sealed with a red ribbon by an Israeli Notary ($249–$799)."
          ],
          [
            "3. How do I transfer money to pay rent in ₪ before I have a Teudat Zehut?",
            "Israeli banks restrict tourist accounts. Using a licensed FX platform (like IsraTransfer) locks institutional exchange rates (saving ~2.5% over wire fees) and can wire NIS (₪) directly to your Israeli landlord."
          ]
        ]
      },
      "3": {
        "h2": "❓ Sponsoring Rabbi, Madrichat Kallah & Beit Din FAQ",
        "items": [
          [
            "1. Does my born-Jewish Israeli spouse also have to attend classes?",
            "Yes! Under Beit Din rules and Nohal 5.2.0008 Sec. ג.10, when a conversion candidate lives with a partner, BOTH partners must study with the Sponsoring Rabbi and Madrichat Kallah and keep Shabbat & Kashrut together."
          ],
          [
            "2. What letters are required to open a Beit Din file or pass Va'adat Charigim?",
            "You need an official Hebrew recommendation letter from a Rabbanut-recognized Sponsoring Rabbi (Rav Melaveh), a Host Family (Mishpacha Melavah) letter, and 5–8+ community letters confirming 9+ months of Shabbat attendance."
          ],
          [
            "3. What is tested at the final Ma'amad Beit Din tribunal?",
            "The 3 Dayanim test your sincere observance of Shabbat (39 Melachot, Muktzeh, Kiddush, Havdalah), Kashrut, Taharat HaMishpacha, Holidays, and ask you to recite Shema, Asher Yatzar, and daily Brachot from memory."
          ]
        ]
      },
      "4": {
        "h2": "❓ 180-Day Apostille Clock & 8 PIBA Forms FAQ",
        "items": [
          [
            "1. Which documents expire after 180 days (6 months)?",
            "Misrad HaPanim strictly enforces a 180-day freshness limit on foreign Police Clearances (FBI, ACRO, RCMP, etc.) and Single Status Proofs (Tamtzit Rishum / Celibacy Affidavit) from the date of issuance."
          ],
          [
            "2. What is the '3-Bucket' Police Check rule?",
            "Clerks require apostilled federal/national police checks from: (1) every country of citizenship, (2) your country of birth, and (3) any country where you resided for 12+ months after age 18."
          ],
          [
            "3. Why must PIBA forms (Ash/1, Ash/3, Ash/6, Ash/456) be stamped in Hebrew?",
            "Misrad HaPanim branch clerks reject handwritten Latin-script forms. Our stamper engine maps your inputs in 6 languages into pixel-accurate Hebrew PDFs alongside a Red-X Signing Guide."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  },
  "he": {
    "kicker_sub": "מדריך נוהלי משרד הפנים ובית הדין",
    "legal_title": "מרכז שליטה משפטי-טכנולוגי לגיור, עלייה והליך מדורג",
    "tos_t": "📜 תנאי שימוש והבהרה משפטית",
    "tos_b": "Giyur Aliyah Track מספקת אוטומציה למילוי טפסים רשמיים, מאגרי הכנה לבית הדין ולשימוע זוגי, והכוונה פרוצדורלית. הפלטפורמה אינה משרד עורכי דין; ליווי משפטי אופציונלי ניתן על ידי עורכי דין ונוטריונים ישראלים מורשים בלבד.",
    "ref_t": "💳 מדיניות סופיות עסקה דיגיטלית (ללא החזרים)",
    "ref_b": "מאחר שפתיחת הגישה חושפת באופן מיידי את מחוללי הטפסים בעברית, קרדיטים של AI ומאגרי השאלות המלאים, כל רכישות התוכנה הדיגיטליות הן סופיות ואינן ניתנות להחזר כספי לאחר הפתיחה.",
    "priv_t": "🔒 פרטיות ואבטחת מידע (Zero-Leakage)",
    "priv_b": "כל טיוטות הטפסים וחדרי הסנכרון הזוגיים מוצפנים ומבודדים למזהה הוואטסאפ האישי שלך. איננו מוכרים או משתפים מידע עם צדדים שלישיים.",
    "tabs": {
      "0": {
        "h2": "❓ שאלות נפוצות: תמחור מודולרי וחיסכון בשכר טרחה",
        "items": [
          [
            "1. מדוע שכר טרחה של 15,000₪–40,000₪ לעו״ד הוא רק 'נקודת ההתחלה'—ואיך המערכת חוסכת זאת?",
            "המנועים הדיגיטליים שלנו ממלאים בעברית תקנית את כל 8 טפסי רשות האוכלוסין (אש/1, אש/3, אש/6, אש/456, מר/14א, מר/14ב, נספח א׳, קורות חיים), מפענחים דרישות מסמכים ב-AI, ומאמנים אתכם על 700 שאלות בית הדין ו-300 שאלות השימוע הזוגי."
          ],
          [
            "2. איך עובד התמחור המודולרי (90 יום מול גישה לכל החיים)?",
            "ללא מנויים חודשיים מתחדשים. פותחים רק את המנוע הדרוש למסלול שלכם: טפסים ומפענח מכתבים ($89 ל-90 יום / $149 לכל החיים), חבילת 700 שאלות בית דין ו-56 שירים ($149 / $249), או סנכרון 300 שאלות זוגיות ($129 / $229)."
          ],
          [
            "3. האם שירותי הקונסיירז׳ האנושיים נפרדים מרישיונות התוכנה?",
            "כן. רישיונות התוכנה פותחים גישה מיידית 24/7 לכלים הדיגיטליים. שירותים אנושיים—תרגום נוטריוני בסרט אדום ($249–$799), רב מלווה ($349), מדריכת כלה ($249), וליווי עו״ד לסניף ($649–$799)—מוזמנים בנפרד."
          ]
        ]
      },
      "1": {
        "h2": "❓ שאלות נפוצות: נהלי משרד הפנים (5.2.0008 / 5.2.0009) וגיור",
        "items": [
          [
            "1. מדוע גיור פרטי (גוש עציון / בני ברק) נחסם ברישום נישואין ברבנות?",
            "הרבנות הראשית רושמת לנישואין רק בעלי תעודת גיור ממלכתית (נתיב) או אישור גיור מהרבנות הראשית. לבני זוג של אזרחים ישראלים מומלץ לשלב הליך מדורג (נוהל 5.2.0008 סעיף ג.10) במקביל לגיור ממלכתי."
          ],
          [
            "2. מה ההבדל בין נוהל 5.2.0008 (נשואים) לנוהל 5.2.0009 (ידועים בציבור)?",
            "זוגות נשואים מגישים טופס אש/6 (שנה ב/1 + 4 שנים א/5 עד אזרחות). ידועים בציבור חותמים על נספח א׳ (13 סעיפים) בפני עו״ד (3 שנים ב/1 + 4 שנים א/5)."
          ],
          [
            "3. מהי מלכודת 24 החודשים של סל קליטה בעלייה מתוך הארץ (טופס אש/456)?",
            "מי ששהה בישראל מעל 24 חודשים במצטבר ב-3 השנים שקדמו לאישור העלייה מאבד את הזכאות למענק סל קליטה כספי (~21,700₪) ממשרד הקליטה."
          ]
        ]
      },
      "2": {
        "h2": "❓ שאלות נפוצות: עלויות, נוטריון בסרט אדום והעברות מט״ח",
        "items": [
          [
            "1. מדוע תיקים מתעכבים גם אחרי תשלום של 25,000₪ לעורך דין?",
            "גם עם עורך דין יקר, אתם אלו שחייבים להשיג את 5 תעודות המקור עם אפוסטיל כפול, לעבור בעצמכם את השימוע הזוגי הנפרד (300 שאלות) ולענות בעצמכם לדייני בית הדין (700 שאלות)."
          ],
          [
            "2. מתי חובה להציג תרגום נוטריוני ישראלי בסרט אדום?",
            "כל תעודת לידה, תעודת יושר, תמצית רישום או תעודת נישואין/גירושין שאינה בעברית או באנגלית חייבת בחותמת סרט אדום של נוטריון ישראלי ($249–$799)."
          ],
          [
            "3. איך מעבירים כסף לתשלום שכר דירה בשקלים לפני קבלת תעודת זהות?",
            "בנקים בישראל מגבילים חשבונות תייר. שימוש בפלטפורמת מט״ח מורשית (כגון IsraTransfer) חוסך כ-2.5% בעמלות המרה ומאפשר העברת שקלים ישירות לבעל הדירה."
          ]
        ]
      },
      "3": {
        "h2": "❓ שאלות נפוצות: רב מלווה, מדריכת כלה ומעמד בית הדין",
        "items": [
          [
            "1. האם גם בן/בת הזוג הישראלי (יהודי מלידה) חייב להשתתף בלימודים?",
            "כן! לפי כללי בית הדין ונוהל 5.2.0008 סעיף ג.10, כאשר מתגייר חי עם בן/בת זוג, שני בני הזוג חייבים ללמוד יחד עם הרב המלווה ומדריכת הכלה ולשמור שבת וכשרות יחד."
          ],
          [
            "2. אילו מכתבי המלצה נדרשים לפתיחת תיק גיור או לוועדת חריגים?",
            "נדרש מכתב רשמי בעברית מרב מלווה מוכר, מכתב ממשפחה מארחת (משפחה מלווה), ו-5–8 מכתבי המלצה מחברי קהילה ובית כנסת עם מספרי ת״ז (9 ספרות)."
          ],
          [
            "3. מה שואלים במעמד בית הדין הסופי (3 דיינים)?",
            "הדיינים בוחנים שמירת שבת (ל״ט מלאכות, מוקצה, קידוש, הבדלה), כשרות, טהרת המשפחה, חגים, ומבקשים לדקלם בעל-פה שמע ישראל, אשר יצר וברכות השחר."
          ]
        ]
      },
      "4": {
        "h2": "❓ שאלות נפוצות: שעון 180 יום לאפוסטיל ו-8 טפסי משרד הפנים",
        "items": [
          [
            "1. אילו מסמכים פגים תוקף אחרי 180 יום (6 חודשים)?",
            "משרד הפנים אוכף תוקף מקסימלי של 180 יום מיום ההנפקה על תעודות יושר מהמולדת (FBI, ACRO וכו׳) ועל תעודות רווקות / תמצית רישום."
          ],
          [
            "2. מהו כלל ׳3 הסלים׳ לתעודת יושר?",
            "הפקידים דורשים תעודת יושר פדרלית עם אפוסטיל מ-(1) כל מדינת אזרחות, (2) מדינת הלידה, ו-(3) כל מדינה שבה התגוררתם 12+ חודשים מגיל 18."
          ],
          [
            "3. מדוע חובה להגיש את טפסי אש/1, אש/3, אש/6 ואש/456 מודפסים בעברית?",
            "פקידי רשות האוכלוסין דוחים טפסים הממולאים באותיות לטיניות. מנוע ההחתמה שלנו ממיר את הנתונים שלכם מ-6 שפות לקובץ PDF רשמי בעברית עם מדריך חתימות מסומן."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  },
  "fr": {
    "kicker_sub": "Guide Statutaire & Logiciel (Misrad HaPanim & Beit Din)",
    "legal_title": "Centre de Commande Legal-Tech & Rabbinique",
    "tos_t": "📜 Conditions d'Utilisation & Clause de Non-Responsabilité",
    "tos_b": "Giyur Aliyah Track fournit une automatisation logicielle des formulaires PIBA, des coffres de préparation au Beit Din et un routage procédural. Nous ne sommes pas un cabinet d'avocats ; l'assistance juridique optionnelle est assurée par des avocats et notaires israéliens agréés.",
    "ref_t": "💳 Politique de Finalité Numérique & Non-Remboursement",
    "ref_b": "L'activation donnant un accès immédiat aux générateurs PDF hébreux, aux crédits IA et aux 700/300 questions, TOUTES LES VENTES LOGICIELLES SONT DÉFINITIVES ET NON REMBOURSABLES dès le déverrouillage.",
    "priv_t": "🔒 Confidentialité & Sécurité Zéro-Fuite",
    "priv_b": "Tous vos brouillons de formulaires et salles de synchronisation à 2 téléphones sont chiffrés et isolés sur votre identifiant WhatsApp personnel.",
    "tabs": {
      "0": {
        "h2": "❓ FAQ : Tarification Modulaire & Économies d'Avocat",
        "items": [
          [
            "1. Pourquoi un forfait d'avocat de 15 000₪–40 000₪ n'est-il qu'un tarif de départ ?",
            "Nos moteurs numériques remplissent en hébreu les 8 formulaires officiels du Misrad HaPanim (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, CV Nativ), traduisent les lettres de rejet par IA Vision et vous entraînent aux 700 questions du Beit Din et aux 300 questions de couple."
          ],
          [
            "2. Comment fonctionne la tarification modulaire (Pass 90 Jours vs Accès à Vie) ?",
            "Aucun abonnement mensuel. Débloquez uniquement votre module : Formulaires Hébreux ($89 90j / $149 à vie), Suite Beit Din 700-Q & 56 Chants ($149 90j / $249 à vie), Synchronisation Couple 300-Q ($129 90j / $229 5 ans) ou Suites VIP ($249–$649)."
          ],
          [
            "3. Les services humains de conciergerie sont-ils séparés des pass logiciels ?",
            "Oui. Les pass logiciels débloquent les outils numériques 24/7. Les services humains (Notaire Ruban Rouge $249–$799, Rabbin Accompagnateur $349, Madrichat Kallah $249, Avocat au guichet $649–$799) se réservent à la carte."
          ]
        ]
      },
      "1": {
        "h2": "❓ FAQ : Règles Misrad HaPanim (Nohal 5.2.0008) & Conversion",
        "items": [
          [
            "1. Pourquoi les conversions privées (Gush Etzion / Bnei Brak) bloquent-elles le mariage au Rabbinat ?",
            "Le Grand Rabbinat n'enregistre les mariages qu'avec un certificat d'État (Teudat Giyur de Nativ) ou un Ishur Giyur. Si votre conjoint est israélien, menez la procédure Nohal 5.2.0008 Sec. ג.10 en parallèle."
          ],
          [
            "2. Quelle est la différence entre Nohal 5.2.0008 (Mariés) et 5.2.0009 (Concubins) ?",
            "Les couples mariés déposent le formulaire Ash/6 (1 an en visa B/1 + 4 ans en résidence A/5). Les couples non mariés signent la déclaration Nespach Alef à 13 clauses devant avocat (3 ans en B/1 + 4 ans en A/5)."
          ],
          [
            "3. Qu'est-ce que le piège des 24 mois pour le Sal Klita (Formulaire Ash/456) ?",
            "Si vous avez séjourné plus de 24 mois cumulés en Israël au cours des 3 années précédant votre Aliyah interne, le Misrad HaKlita annule le panier d'intégration (~21 700₪)."
          ]
        ]
      },
      "2": {
        "h2": "❓ FAQ : Frais de Dossier, Notaire Ruban Rouge & Transferts NIS (₪)",
        "items": [
          [
            "1. Pourquoi les dossiers prennent-ils du retard même avec un avocat à 25 000₪ ?",
            "Même avec un avocat, VOUS devez obtenir vous-même les 5 actes apostillés, réussir l'interrogatoire séparé de 300 questions et répondre aux 700 questions des juges du Beit Din."
          ],
          [
            "2. Quand la traduction par Notaire Israélien au Ruban Rouge est-elle obligatoire ?",
            "Tout acte de naissance, casier judiciaire (Bulletin n°3), certificat de célibat ou acte de mariage en français doit être traduit en hébreu et scellé au ruban rouge par un notaire israélien ($249–$799)."
          ],
          [
            "3. Comment payer un loyer en shekels (₪) avant d'avoir une Teudat Zehut ?",
            "Les banques israéliennes bloquent l'ouverture de compte aux touristes. Une plateforme agréée comme IsraTransfer verrouille le taux interbancaire (économisant ~2,5%) et vire des shekels directement à votre propriétaire."
          ]
        ]
      },
      "3": {
        "h2": "❓ FAQ : Rabbin Accompagnateur, Madrichat Kallah & Tribunal Beit Din",
        "items": [
          [
            "1. Mon conjoint israélien (juif de naissance) doit-il aussi suivre les cours ?",
            "Oui ! Selon le Beit Din et le Nohal 5.2.0008 Sec. ג.10, les deux partenaires doivent étudier avec le Rabbin et la Madrichat Kallah et pratiquer le Chabbat et la Cacherout ensemble."
          ],
          [
            "2. Quelles lettres faut-il pour ouvrir un dossier Beit Din ou Va'adat Charigim ?",
            "Il faut une lettre hébraïque d'un Rabbin Accompagnateur reconnu (Rav Melaveh), d'une famille d'accueil (Mishpacha Melavah) et 5 à 8+ lettres de membres de la synagogue avec leur numéro de Teudat Zehut à 9 chiffres."
          ],
          [
            "3. Sur quoi porte l'examen final devant les 3 Dayanim (Ma'amad Beit Din) ?",
            "Les 3 juges testent le Chabbat (39 Melachot, Mouktzeh, Kiddouch, Havdalah), la Cacherout, Taharat HaMishpacha, les fêtes, et demandent de réciter par cœur le Chema, Acher Yatzar et les Brachot du matin."
          ]
        ]
      },
      "4": {
        "h2": "❓ FAQ : Horloge Apostille de 180 Jours & 8 Formulaires PIBA en Hébreu",
        "items": [
          [
            "1. Quels documents expirent au bout de 180 jours (6 mois) ?",
            "Le Misrad HaPanim applique une validité stricte de 180 jours sur les casiers judiciaires étrangers et les certificats de célibat / non-remariage à compter de leur date d'émission."
          ],
          [
            "2. Qu'est-ce que la règle des « 3 Paniers » pour le casier judiciaire ?",
            "Les agents exigent un casier judiciaire apostillé de : (1) chaque pays de nationalité, (2) votre pays de naissance, et (3) tout pays où vous avez résidé 12+ mois après 18 ans."
          ],
          [
            "3. Pourquoi les formulaires PIBA (Ash/1, Ash/3, Ash/6, Ash/456) doivent-ils être imprimés en hébreu ?",
            "Les guichets du Misrad HaPanim rejettent les formulaires remplis en alphabet latin. Notre moteur saisit vos réponses en français et génère le PDF officiel en hébreu avec un guide de signature."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  },
  "es": {
    "kicker_sub": "Guía Estatutaria y de Software (Misrad HaPanim y Beit Din)",
    "legal_title": "Centro de Comando Legal-Tech y Rabínico",
    "tos_t": "📜 Términos de Servicio y Aviso Legal",
    "tos_b": "Giyur Aliyah Track proporciona automatización de formularios oficiales PIBA, bóvedas de preparación para el Beit Din y orientación procesal. No somos un bufete de abogados; la representación legal opcional es brindada exclusivamente por abogados y notarios israelíes colegiados.",
    "ref_t": "💳 Política de Finalidad Digital y No Reembolso",
    "ref_b": "Dado que los pases digitales desbloquean instantáneamente los selladores PDF en hebreo, créditos de IA y las 700/300 preguntas, TODAS LAS VENTAS DE SOFTWARE DIGITAL SON FINALES Y NO REEMBOLSABLES tras su activación.",
    "priv_t": "🔒 Privacidad y Seguridad de Datos Cero-Fugas",
    "priv_b": "Todos los borradores de formularios y salas de sincronización de 2 teléfonos están cifrados y aislados en su UID personal de WhatsApp.",
    "tabs": {
      "0": {
        "h2": "❓ FAQ: Precios Modulares y Ahorro en Honorarios de Abogados",
        "items": [
          [
            "1. ¿Por qué un anticipo de abogado de 15.000₪–40.000₪ es solo el 'precio inicial'?",
            "Nuestros motores digitales rellenan en hebreo los 8 formularios oficiales de PIBA (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespaj Alef, CV Nativ), traducen cartas de rechazo con IA y le entrenan en las 700 preguntas del Beit Din y las 300 preguntas de pareja."
          ],
          [
            "2. ¿Cómo funcionan los Precios Modulares (Pase de 90 Días vs. Acceso de por Vida)?",
            "Cero suscripciones mensuales. Desbloquee solo lo que necesita: Formularios Hebreos ($89 90d / $149 Vitalicio), Suite Beit Din 700-Q y 56 Canciones ($149 90d / $249 Vitalicio), Sincronización de Parejas 300-Q ($129 90d / $229 5 años) o Suites VIP ($249–$649)."
          ],
          [
            "3. ¿Los Servicios Humanos de Concierge son independientes de los pases de software?",
            "Sí. Los pases de software desbloquean herramientas digitales 24/7. Los servicios humanos (Notario Cinta Roja $249–$799, Rabino Patrocinador $349, Madrijat Kalá $249, Abogado acompañante $649–$799) se reservan por separado."
          ]
        ]
      },
      "1": {
        "h2": "❓ FAQ: Reglas de Misrad HaPanim (Nohal 5.2.0008) y Conversión",
        "items": [
          [
            "1. ¿Por qué las conversiones privadas (Gush Etzion / Bnei Brak) se bloquean para el matrimonio?",
            "El Gran Rabinato solo registra matrimonios con Certificado Estatal (Teudat Giyur de Nativ) o Ishur Giyur. Si tiene pareja israelí, tramite el Nohal 5.2.0008 Sec. ג.10 en paralelo."
          ],
          [
            "2. ¿Cuál es la diferencia entre Nohal 5.2.0008 (Casados) y 5.2.0009 (Parejas de Hecho)?",
            "Las parejas casadas presentan el Formulario Ash/6 (1 año con visa B/1 + 4 años en residencia A/5). Las parejas no casadas firman la declaración Nespaj Alef de 13 cláusulas ante abogado (3 años en B/1 + 4 años en A/5)."
          ],
          [
            "3. ¿Qué es el límite de 24 meses de Sal Klita al hacer Aliyá dentro de Israel (Ash/456)?",
            "Si ha permanecido más de 24 meses acumulados en Israel durante los 3 años previos a la aprobación de su Aliyá, Misrad HaKlita cancela la cesta económica Sal Klita (~21.700₪)."
          ]
        ]
      },
      "2": {
        "h2": "❓ FAQ: Desglose de Costos, Notario Cinta Roja y Transferencias en ₪",
        "items": [
          [
            "1. ¿Por qué se retrasan los expedientes incluso pagando 25.000₪ a un bufete?",
            "Incluso con un abogado costoso, USTED mismo debe apostillar los 5 documentos de origen, aprobar el interrogatorio en salas separadas de 300 preguntas y responder a las 700 preguntas del Beit Din."
          ],
          [
            "2. ¿Cuándo es obligatoria la traducción por Notario Israelí con Cinta Roja?",
            "Toda partida de nacimiento, antecedentes penales, fe de soltería o acta de matrimonio/divorcio en español debe ser traducida al hebreo y sellada con cinta roja por un notario israelí ($249–$799)."
          ],
          [
            "3. ¿Cómo transfiero dinero para pagar el alquiler en shekels (₪) sin Teudat Zehut?",
            "Los bancos israelíes restringen cuentas de turistas. Usar una plataforma autorizada como IsraTransfer fija tipos de cambio institucionales (ahorrando ~2,5%) y envía NIS (₪) directamente a su arrendador."
          ]
        ]
      },
      "3": {
        "h2": "❓ FAQ: Rabino Patrocinador, Madrijat Kalá y Tribunal Beit Din",
        "items": [
          [
            "1. ¿Mi pareja israelí (judío de nacimiento) también debe asistir a clases?",
            "¡Sí! Bajo las reglas del Beit Din y el Nohal 5.2.0008 Sec. ג.10, ambos miembros de la pareja deben estudiar con el Rabino y la Madrijat Kalá y guardar Shabat y Kashrut juntos."
          ],
          [
            "2. ¿Qué cartas se requieren para abrir un expediente en el Beit Din o Va'adat Jariguim?",
            "Necesita una carta en hebreo de un Rabino Patrocinador reconocido (Rav Melavé), carta de Familia Anfitriona y 5–8+ cartas comunitarias con número de Teudat Zehut de 9 dígitos."
          ],
          [
            "3. ¿Qué evalúan los 3 jueces en el tribunal final Ma'amad Beit Din?",
            "Los 3 Dayanim evalúan Shabat (39 Melajot, Muktzé, Kidush, Havdalá), Kashrut, Taharat HaMishpajá, festividades, y piden recitar de memoria Shemá Yisrael, Asher Yatzar y bendiciones matutinas."
          ]
        ]
      },
      "4": {
        "h2": "❓ FAQ: Reloj de Apostilla de 180 Días y 8 Formularios PIBA en Hebreo",
        "items": [
          [
            "1. ¿Qué documentos caducan a los 180 días (6 meses)?",
            "Misrad HaPanim aplica un límite estricto de 180 días desde su emisión a los Certificados de Antecedentes Penales y Certificados de Soltería."
          ],
          [
            "2. ¿Qué es la regla de las '3 Cubetas' para antecedentes penales?",
            "Los funcionarios exigen antecedentes penales apostillados de: (1) cada país de ciudadanía, (2) país de nacimiento y (3) cualquier país donde haya residido 12+ meses después de los 18 años."
          ],
          [
            "3. ¿Por qué los formularios PIBA (Ash/1, Ash/3, Ash/6, Ash/456) deben imprimirse en hebreo?",
            "Las oficinas de Misrad HaPanim rechazan formularios llenados en alfabeto latino. Nuestro motor toma sus datos en español y estampa el PDF oficial en hebreo con una Guía de Firma."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  },
  "de": {
    "kicker_sub": "Gesetzlicher & Software-Leitfaden (Misrad HaPanim & Beit Din)",
    "legal_title": "Legal-Tech & Rabbinisches Kontrollzentrum",
    "tos_t": "📜 Nutzungsbedingungen & Rechtlicher Hinweis",
    "tos_b": "Giyur Aliyah Track bietet Software-Automatisierung für offizielle PIBA-Formulare, Vorbereitungstrainer für das Beit Din und Verfahrensnavigation. Wir sind keine Anwaltskanzlei; optionale Rechtsberatung erfolgt ausschließlich durch zugelassene israelische Anwälte und Notare.",
    "ref_t": "💳 Richtlinie zur Digitalen Endgültigkeit (Keine Rückerstattung)",
    "ref_b": "Da digitale Pässe sofortigen Zugriff auf hebräische PDF-Stempel, KI-Credits und alle 700/300 Prüfungsfragen gewähren, SIND ALLE DIGITALEN SOFTWAREKÄUFE NACH FREISCHALTUNG ENDGÜLTIG UND NICHT ERSTATTUNGSFÄHIG.",
    "priv_t": "🔒 Datenschutz & Zero-Leakage-Sicherheit",
    "priv_b": "Alle Formularentwürfe und 2-Telefon-Synchronisationsräume sind verschlüsselt und auf Ihre persönliche WhatsApp-UID isoliert.",
    "tabs": {
      "0": {
        "h2": "❓ FAQ: Modulare Preise & Anwaltskosten-Ersparnis",
        "items": [
          [
            "1. Warum ist ein Anwaltshonorar von 15.000₪–40.000₪ oft nur die 'Einstiegsgebühr'?",
            "Unsere digitalen Engines stempeln alle 8 offiziellen hebräischen PIBA-Formulare (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, Nativ-CV), übersetzen behördliche Ablehnungsbriefe per KI und trainieren Sie auf 700 Beit-Din-Fragen sowie 300 Paar-Interviewfragen."
          ],
          [
            "2. Wie funktioniert die modulare Preisgestaltung (90-Tage-Pass vs. Lebenslanger Zugang)?",
            "Keine Monatsabos. Schalten Sie nur frei, was Sie brauchen: Hebräische Formulare ($89 90T / $149 Lebenslang), Beit Din 700-Q & 56 Lieder Suite ($149 90T / $249 Lebenslang), Ehepartner 300-Q 2-Phone-Sync ($129 90T / $229 5 Jahre) oder VIP-Suiten ($249–$649)."
          ],
          [
            "3. Sind menschliche Concierge-Dienste von Software-Pässen getrennt?",
            "Ja. Software-Pässe schalten digitale 24/7-Tools frei. Menschliche Dienste (Rotband-Notar $249–$799, Begleitender Rabbiner $349, Madrichat Kallah $249, Anwaltsbegleitung $649–$799) werden separat über den Concierge-Desk gebucht."
          ]
        ]
      },
      "1": {
        "h2": "❓ FAQ: Misrad HaPanim Verfahren (Nohal 5.2.0008) & Giur-Regeln",
        "items": [
          [
            "1. Warum werden private Giur-Verfahren (Gush Etzion / Bnei Brak) bei der Eheschließung blockiert?",
            "Das Oberrabbinat registriert Ehen nur mit staatlichem Konversionszertifikat (Teudat Giyur von Nativ) oder Ishur Giyur. Bei einem israelischen Partner sollten Sie Nohal 5.2.0008 Abs. ג.10 parallel durchführen."
          ],
          [
            "2. Was ist der Unterschied zwischen Nohal 5.2.0008 (Verheiratet) und 5.2.0009 (Unverheiratet)?",
            "Verheiratete Paare reichen Formular Ash/6 ein (1 Jahr B/1-Visum + 4 Jahre A/5-Aufenthalt). Unverheiratete Lebenspartner unterzeichnen die 13-Klausel-Erklärung Nespach Alef vor einem Anwalt (3 Jahre B/1 + 4 Jahre A/5)."
          ],
          [
            "3. Was ist die 24-Monats-Grenze beim Sal Klita für Inlands-Alija (Formular Ash/456)?",
            "Wer in den 3 Jahren vor der Alija-Genehmigung insgesamt mehr als 24 Monate in Israel verbracht hat, verliert den Anspruch auf den ~21.700₪ Sal Klita Eingliederungszuschuss."
          ]
        ]
      },
      "2": {
        "h2": "❓ FAQ: Kostenübersicht, Rotband-Notar & Überweisungen in ₪",
        "items": [
          [
            "1. Warum verzögern sich Akten selbst bei 25.000₪ Anwaltskosten?",
            "Selbst mit einem teuren Anwalt müssen SIE die 5 doppelt apostillierten Heimatdokumente selbst beschaffen, das 300-Fragen-Interview in getrennten Räumen selbst bestehen und die 700 Beit-Din-Fragen selbst beantworten."
          ],
          [
            "2. Wann ist eine israelische Rotband-Notarübersetzung Pflicht?",
            "Jede Geburtsurkunde, jedes Führungszeugnis, jede Ledigkeitsbescheinigung oder Heiratsurkunde auf Deutsch muss von einem israelischen Notar ins Hebräische übersetzt und mit rotem Band versiegelt werden ($249–$799)."
          ],
          [
            "3. Wie überweise ich Miete in Schekel (₪) ohne Teudat Zehut?",
            "Israelische Banken schränken Touristenkonten ein. Eine lizenzierte FX-Plattform wie IsraTransfer sichert Institutionen-Kurse (~2,5% Ersparnis) und überweist NIS (₪) direkt an Ihren israelischen Vermieter."
          ]
        ]
      },
      "3": {
        "h2": "❓ FAQ: Begleitender Rabbiner, Madrichat Kallah & Beit-Din-Tribunal",
        "items": [
          [
            "1. Muss mein jüdisch geborener israelischer Partner ebenfalls am Unterricht teilnehmen?",
            "Ja! Nach Beit-Din-Regeln und Nohal 5.2.0008 Abs. ג.10 müssen BEIDE Partner gemeinsam beim Rabbiner und der Madrichat Kallah lernen sowie Schabbat und Kaschrut gemeinsam halten."
          ],
          [
            "2. Welche Empfehlungsschreiben werden für das Beit Din oder Va'adat Charigim benötigt?",
            "Sie benötigen ein hebräisches Schreiben eines anerkannten Begleitrabbiners (Rav Melaveh), einer Gastfamilie (Mishpacha Melavah) sowie 5–8+ Gemeindebriefe mit 9-stelliger Teudat-Zehut-Nummer."
          ],
          [
            "3. Was wird beim abschließenden Ma'amad Beit Din vor den 3 Richtern geprüft?",
            "Die 3 Dayanim prüfen Schabbat (39 Melachot, Muktzeh, Kiddusch, Hawdala), Kaschrut, Taharat HaMishpacha, Feiertage und lassen Schema Jisrael, Ascher Jatzar und Morgengebete auswendig vortragen."
          ]
        ]
      },
      "4": {
        "h2": "❓ FAQ: 180-Tage-Apostille-Uhr & 8 Hebräische PIBA-Formulare",
        "items": [
          [
            "1. Welche Dokumente laufen nach 180 Tagen (6 Monaten) ab?",
            "Das Misrad HaPanim setzt eine strikte 180-Tage-Frist ab Ausstellungsdatum für ausländische Führungszeugnisse und Ledigkeits-/Familienstandsbescheinigungen durch."
          ],
          [
            "2. Was bedeutet die '3-Kategorien-Regel' beim Führungszeugnis?",
            "Sachbearbeiter verlangen apostillierte Führungszeugnisse aus: (1) jedem Land der Staatsbürgerschaft, (2) dem Geburtsland und (3) jedem Land, in dem Sie ab 18 Jahren 12+ Monate gelebt haben."
          ],
          [
            "3. Warum müssen PIBA-Formulare (Ash/1, Ash/3, Ash/6, Ash/456) auf Hebräisch ausgefüllt sein?",
            "Misrad-HaPanim-Schalter lehnen Formulare in lateinischer Schrift ab. Unser Stempel-Generator überträgt Ihre deutschen Eingaben punktgenau in offizielle hebräische PDFs inklusive Unterschriften-Guide."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  },
  "ru": {
    "kicker_sub": "Правовой и программный гид (МВД Израиля и Бейт-Дин)",
    "legal_title": "Центр управления: Гиюр, Репатриация и СтуПро",
    "tos_t": "📜 Условия использования и правовая оговорка",
    "tos_b": "Giyur Aliyah Track предоставляет программную автоматизацию официальных бланков МВД (PIBA), тренажеры для подготовки к Бейт-Дину и процедурную навигацию. Мы не являемся юридической фирмой; опциональное адвокатское сопровождение оказывается лицензированными израильскими адвокатами и нотариусами.",
    "ref_t": "💳 Политика окончательности цифровых покупок (Без возврата)",
    "ref_b": "Поскольку цифровые пакеты мгновенно открывают доступ к генераторам ивритских PDF-анкет, ИИ-кредитам и полным базам из 700/300 вопросов, ВСЕ ПРОДАЖИ ЦИФРОВОГО ПО ЯВЛЯЮТСЯ ОКОНЧАТЕЛЬНЫМИ И НЕ ПОДЛЕЖАТ ВОЗВРАТУ после активации.",
    "priv_t": "🔒 Конфиденциальность и защита данных (Zero-Leakage)",
    "priv_b": "Все черновики анкет и комнаты синхронизации для двух телефонов зашифрованы и привязаны исключительно к вашему личному WhatsApp UID.",
    "tabs": {
      "0": {
        "h2": "❓ FAQ: Модульные тарифы и экономия на гонорарах адвокатов",
        "items": [
          [
            "1. Почему гонорар адвоката в 15 000₪–40 000₪ — это только «стартовый платеж»?",
            "Наши цифровые модули заполняют на иврите все 8 официальных анкет МВД (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Неспах Алеф, анкета Натив), расшифровывают письма МВД через ИИ и готовят вас по 700 вопросам Бейт-Дина и 300 вопросам перекрестного интервью СтуПро."
          ],
          [
            "2. Как работают модульные тарифы (Доступ на 90 дней против Пожизненного)?",
            "Никаких ежемесячных подписок. Открывайте только нужный модуль: Ивритские анкеты МВД ($89 на 90д / $149 Навсегда), Пакет Бейт-Дин 700 вопросов и 56 песен ($149 90д / $249 Навсегда), Синхронизация пары 300 вопросов ($129 90д / $229 на 5 лет) или VIP-пакеты ($249–$649)."
          ],
          [
            "3. Оплачиваются ли услуги живого консьержа отдельно от программных пакетов?",
            "Да. Программные пакеты открывают доступ к цифровым инструментам 24/7. Живые специалисты (Нотариус с красной лентой $249–$799, Сопровождающий раввин $349, Мадрихат Калла $249, Выезд адвоката в МВД $649–$799) бронируются отдельно."
          ]
        ]
      },
      "1": {
        "h2": "❓ FAQ: Правила МВД Израиля (Ноhаль 5.2.0008 / СтуПро) и Гиюр",
        "items": [
          [
            "1. Почему частный гиюр (Гуш-Эцион / Бней-Брак) блокируют при регистрации брака?",
            "Главный раввинат регистрирует браки только при наличии государственного свидетельства (Теудат Гиюр от Натив) или Ишур Гиюр. Если у вас партнер-израильтянин, ведите СтуПро (Ноhаль 5.2.0008 п. ג.10) параллельно."
          ],
          [
            "2. В чем разница между Ноhаль 5.2.0008 (Брак) и 5.2.0009 (Гражданский союз)?",
            "Официальные супруги подают анкету Ash/6 (1 год виза B/1 + 4 года ВНЖ A/5 до гражданства). Неженатые пары подписывают декларацию Неспах Алеф из 13 пунктов у адвоката (3 года B/1 + 4 года A/5)."
          ],
          [
            "3. Что такое порог 24 месяцев для корзины абсорбции (Саль Клита) при репатриации в Израиле (Ash/456)?",
            "Если вы провели в Израиле более 24 месяцев суммарно за 3 года до получения статуса оле, Министерство абсорбции аннулирует денежную выплату Саль Клита (~21 700₪)."
          ]
        ]
      },
      "2": {
        "h2": "❓ FAQ: Расходы, Нотариус с красной лентой и переводы в шекелях (₪)",
        "items": [
          [
            "1. Почему дела задерживаются даже после оплаты 25 000₪ адвокату?",
            "Даже с дорогим адвокатом ВЫ сами должны собрать 5 документов с двойным апостилем, лично пройти перекрестное интервью из 300 вопросов в разных кабинетах и лично ответить на 700 вопросов судей Бейт-Дина."
          ],
          [
            "2. Когда обязателен перевод израильским нотариусом с красной лентой?",
            "Любое свидетельство о рождении, справка о несудимости, справка о семейном положении или браке/разводе на русском языке должны быть переведены на иврит и сшиты красной лентой израильским нотариусом ($249–$799)."
          ],
          [
            "3. Как перевести деньги за аренду квартиры в шекелях (₪) до получения Теудат-Зеута?",
            "Банки Израиля ограничивают счета туристов. Лицензированная платформа (например, IsraTransfer) фиксирует биржевой курс (экономия ~2,5%) и переводит шекели напрямую вашему арендодателю."
          ]
        ]
      },
      "3": {
        "h2": "❓ FAQ: Сопровождающий раввин, Мадрихат Калла и суд Бейт-Дин",
        "items": [
          [
            "1. Должен ли мой супруг-израильтянин (еврей по рождению) тоже посещать уроки?",
            "Да! По правилам Бейт-Дина и Ноhаль 5.2.0008 п. ג.10 оба партнера обязаны учиться у раввина и мадрихат калла и вместе соблюдать Шаббат и кашрут."
          ],
          [
            "2. Какие рекомендательные письма нужны для Бейт-Дина и Ваадат Харигим?",
            "Требуется письмо на иврите от признанного раввина (Рав Мелаве), письмо от принимающей семьи (Мишпаха Мелава) и 5–8+ писем от членов синагоги с 9-значными номерами Теудат-Зеута."
          ],
          [
            "3. Что проверяют 3 судьи (даяна) на финальном суде Маамад Бейт-Дин?",
            "Судьи проверяют соблюдение Шаббата (39 мелахот, мукце, Кидуш, Авдала), кашрута, законов чистоты семьи, праздников и просят наизусть прочесть Шма Исраэль, Ашер Яцар и утренние благословения."
          ]
        ]
      },
      "4": {
        "h2": "❓ FAQ: Срок апостиля 180 дней и 8 анкет МВД (PIBA) на иврите",
        "items": [
          [
            "1. Какие документы истекают через 180 дней (6 месяцев)?",
            "МВД Израиля строго ограничивает срок годности справок о несудимости и справок о незамужестве / семейном положении 180 днями с даты выдачи."
          ],
          [
            "2. Что означает правило «3 корзин» для справки о несудимости?",
            "Инспекторы требуют апостилированные справки о несудимости из: (1) каждой страны гражданства, (2) страны рождения и (3) любой страны, где вы проживали 12+ месяцев после 18 лет."
          ],
          [
            "3. Почему анкеты МВД (Ash/1, Ash/3, Ash/6, Ash/456) должны быть заполнены на иврите?",
            "Отделения МВД отклоняют анкеты, заполненные латиницей или кириллицей. Наш генератор принимает ваши ответы на русском и печатает официальный PDF на иврите с гидом по подписям."
          ]
        ]
      }
    },
    "mods": {
      "hebrew-engine": "4",
      "beit-din-150": "3",
      "couples-sync": "1",
      "songs-prayers": "3",
      "rabbi-letters": "3",
      "vetted-team": "0"
    }
  }
};

  function getCurLang() {
    const p = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (TAB_FAQS[p]) return p;
    const l = String(window.gatLang || window.appLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return TAB_FAQS[l] ? l : "en";
  }

  function buildFaqSectionHtml(d, tf, includeLegalFooter) {
    const detailsHtml = tf.items.map(function(qa) {
      return '<details style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:14px 16px;box-shadow:0 3px 10px rgba(8,37,72,0.04);">' +
        '<summary style="font-weight:900;font-size:0.9rem;color:#082548;cursor:pointer;line-height:1.4;">' + qa[0] + '</summary>' +
        '<p style="margin-top:10px;font-size:0.84rem;color:#334155;line-height:1.58;">' + qa[1] + '</p>' +
      '</details>';
    }).join("");

    const legalFooterHtml = includeLegalFooter ? (
      '<div style="background:#082548;color:#e2e8f0;border-radius:16px;padding:18px 18px;font-size:0.78rem;line-height:1.55;margin-top:18px;box-shadow:0 8px 24px rgba(8,37,72,0.18);">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.15);">' +
          '<div><strong style="color:#ffffff;font-size:0.9rem;">GiyurAliyahTrack.com</strong> • ' + d.legal_title + '</div>' +
          '<div>📩 <a href="mailto:concierge@giyuraliyahtrack.com" style="color:#38bdf8;text-decoration:none;font-weight:800;">concierge@giyuraliyahtrack.com</a> • 📲 WhatsApp: <a href="https://wa.me/972525822005" style="color:#4ade80;text-decoration:none;font-weight:800;">+972-52-582-2005</a></div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr;gap:12px;margin-top:12px;">' +
          '<details><summary style="color:#38bdf8;font-weight:800;cursor:pointer;">' + d.tos_t + '</summary><p style="margin-top:6px;color:#cbd5e1;font-size:0.74rem;">' + d.tos_b + '</p></details>' +
          '<details><summary style="color:#38bdf8;font-weight:800;cursor:pointer;">' + d.ref_t + '</summary><p style="margin-top:6px;color:#cbd5e1;font-size:0.74rem;">' + d.ref_b + '</p></details>' +
          '<details><summary style="color:#38bdf8;font-weight:800;cursor:pointer;">' + d.priv_t + '</summary><p style="margin-top:6px;color:#cbd5e1;font-size:0.74rem;">' + d.priv_b + '</p></details>' +
        '</div>' +
      '</div>'
    ) : '';

    return '<div class="section-kicker" style="margin-bottom:12px;">' +
        '<h2>' + tf.h2 + '</h2>' +
        '<span>' + d.kicker_sub + '</span>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;">' + detailsHtml + '</div>' +
      legalFooterHtml;
  }

  window.renderTabSpecificFaqs = function(forcedMod) {
    const l = getCurLang();
    const d = TAB_FAQS[l] || TAB_FAQS.en;

    // 1. Homepage / Spoke views (#view-0 .. #view-4)
    [0, 1, 2, 3, 4].forEach(function(tabIdx) {
      const viewEl = document.getElementById("view-" + tabIdx);
      if (!viewEl) return;
      let sec = document.getElementById("gat-tab-faq-" + tabIdx);
      if (!sec) {
        sec = document.createElement("section");
        sec.id = "gat-tab-faq-" + tabIdx;
        sec.style.cssText = "margin-top:28px;margin-bottom:18px;padding-top:20px;border-top:2px solid #cbd5e1;";
        viewEl.appendChild(sec);
      }
          const isMainHub = /^\/(?:(he|fr|es|de|ru)\/)?(?:index\.html)?$/i.test(window.location.pathname);
    function getSpokeTopicTab() {
      if (isMainHub) return "0";
      const s = window.location.pathname.toLowerCase();
      if (s.indexOf("forms") !== -1 || s.indexOf("apostil") !== -1 || s.indexOf("180-") !== -1 || s.indexOf("traduct") !== -1 || s.indexOf("uebersetzer") !== -1 || s.indexOf("perevod") !== -1 || s.indexOf("translator") !== -1 || s.indexOf("drishat") !== -1) return "4";
      if (s.indexOf("rabbi") !== -1 || s.indexOf("rabbin") !== -1 || s.indexOf("rabino") !== -1 || s.indexOf("rav-melaveh") !== -1 || s.indexOf("ravvin") !== -1 || s.indexOf("gush-etzion") !== -1 || s.indexOf("ishur-giyur") !== -1 || s.indexOf("dahan") !== -1 || s.indexOf("vaadat") !== -1) return "3";
      if (s.indexOf("spousal") !== -1 || s.indexOf("5-2-0008") !== -1 || s.indexOf("conjoint") !== -1 || s.indexOf("pareja") !== -1 || s.indexOf("ehepartner") !== -1 || s.indexOf("stupro") !== -1 || s.indexOf("sst") !== -1 || s.indexOf("newborn") !== -1 || s.indexOf("nouveau-ne") !== -1 || s.indexOf("recien-nacido") !== -1 || s.indexOf("neugeborenes") !== -1 || s.indexOf("novorozhdennogo") !== -1 || s.indexOf("tinok") !== -1) return "1";
      if (s.indexOf("tourist") !== -1 || s.indexOf("touriste") !== -1 || s.indexOf("turista") !== -1 || s.indexOf("tayar") !== -1 || s.indexOf("turisticheskaya") !== -1 || s.indexOf("emergency") !== -1 || s.indexOf("urgence") !== -1 || s.indexOf("emergencia") !== -1 || s.indexOf("notfall") !== -1 || s.indexOf("ekstrennaya") !== -1 || s.indexOf("cherum") !== -1 || s.indexOf("criminal") !== -1 || s.indexOf("plili") !== -1 || s.indexOf("vorstrafe") !== -1 || s.indexOf("sudimost") !== -1) return "2";
      return "0";
    }
      const effectiveKey = (tabIdx === 0 && !isMainHub) ? getSpokeTopicTab() : String(tabIdx);
      const tf = d.tabs[effectiveKey] || d.tabs["0"];
      sec.innerHTML = buildFaqSectionHtml(d, tf, tabIdx === 0);
    });

    // 2. /app/ Module-Specific FAQ (#gat-faq-pricing-legal)
    const appFaqSec = document.getElementById("gat-faq-pricing-legal");
    if (appFaqSec) {
      let activeMod = forcedMod || window.currentMod || "";
      if (!activeMod) {
        const sp = new URLSearchParams(window.location.search);
        activeMod = sp.get("module") || sp.get("mod") || "";
      }
      if (!activeMod) {
        const visibleMod = document.querySelector('.mod-view[style*="block"], .mod-view.active');
        if (visibleMod && visibleMod.id) activeMod = visibleMod.id.replace(/^mod-/, "");
      }
      const mappedTabKey = (d.mods && d.mods[activeMod]) || "4";
      const tfApp = d.tabs[mappedTabKey] || d.tabs["0"];
      appFaqSec.innerHTML = buildFaqSectionHtml(d, tfApp, true);
    }
  };

  // Hook into openMod and language switches so /app/ FAQ updates immediately on tab or language change
  if (!window._gatFaqHooked) {
    window._gatFaqHooked = true;
    document.addEventListener("click", function(e) {
      const modBtn = e.target && e.target.closest && e.target.closest("[data-mod], .mod-tab, .gat-ld-item, .lang-opt, #lang-btn");
      if (modBtn) {
        setTimeout(function() { window.renderTabSpecificFaqs(); }, 60);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.renderTabSpecificFaqs);
  } else {
    window.renderTabSpecificFaqs();
  }
  setTimeout(window.renderTabSpecificFaqs, 250);
})();


/* === GAT_VIRAL_SHARE_ENGINE_START === */
window.GAT_SHARE_I18N = {
  en: {
    btn_playbook: "📤 Share This Case Playbook with Partner / Friend",
    btn_decoder: "📤 Share Free Clerk Sheet Decoder",
    btn_forms: "📤 Share Official Hebrew PIBA Form Stamper",
    btn_bd: "📤 Share 700-Q Beit Din Simulator",
    btn_couples: "📤 Invite Partner to 300-Q 2-Phone Sync",
    btn_songs: "📤 Share 56 Shabbat Songs & Brachot Trainer",
    btn_drawer: "📤 Share Giyur Aliyah Track",
    copied: "✅ Link & statutory summary copied! Paste it in WhatsApp, Telegram, or Reddit/Facebook groups.",
    modal_title: "📤 Share with Your Partner or Community",
    modal_sub: "Help a partner, friend, or fellow applicant escape the Misrad HaPanim & Rabbanut loop:",
    wa_btn: "💬 Send via WhatsApp",
    copy_btn: "📋 Copy Link & Summary",
    close_btn: "Close",
    msg: {
      playbook: "🕍✈️ Here is our exact Israeli Ministry of Interior (PIBA) & Rabbanut step-by-step case playbook on Giyur Aliyah Track:",
      decoder: "🔍 This free AI Clerk Sheet Decoder translates Misrad HaPanim 'Drishat Mismachim' rejection sheets and checks the 180-day Apostille clock:",
      forms: "📄 Auto-fill all 8 official Hebrew PIBA / Misrad HaPanim forms (Ash/1, Ash/3, Ash/6, Ash/456, Nespach Alef) in English/French/Spanish/German/Russian -> outputs stamped Hebrew PDFs:",
      bd: "🕍 Practice the 700 real Orthodox Beit Din tribunal questions (Core + Curveballs + Men's/Women's packs) in 6 languages:",
      couples: "💑 Let's practice our 300-Question Misrad HaPanim Separated-Room Couples Interview together on 2 phones:",
      songs: "🎵 Word-by-word karaoke trainer for all 56 Shabbat Songs, Shacharit Morning Prayers & Essential Brachot (Sephardi & Ashkenazi):",
      drawer: "🛡️ Giyur Aliyah Track — The 6-Language Anti-Loop Command Center for Conversion (Giyur), Aliyah & Spousal Visas in Israel:"
    }
  },
  he: {
    btn_playbook: "📤 שתף את תיק המסלול עם בן/בת הזוג או חבר",
    btn_decoder: "📤 שתף את מפענח דרישת המסמכים (חינם)",
    btn_forms: "📤 שתף את ממלא 8 טפסי רשות האוכלוסין בעברית",
    btn_bd: "📤 שתף את סימולטור 700 שאלות בית הדין",
    btn_couples: "📤 הזמן את בן/בת הזוג לסנכרון 300 שאלות השימוע",
    btn_songs: "📤 שתף את מאמן 56 שירי שבת, תפילות וברכות",
    btn_drawer: "📤 שתף את Giyur Aliyah Track",
    copied: "✅ הקישור והתקציר הועתקו! הדביקו בוואטסאפ או בקבוצות.",
    modal_title: "📤 שתף עם בן/בת הזוג או בקהילה",
    modal_sub: "עזרו לבן/בת הזוג או לחברים במסלול לחסוך חודשים של טרטור במשרד הפנים וברבנות:",
    wa_btn: "💬 שלח בוואטסאפ",
    copy_btn: "📋 העתק קישור ותקציר",
    close_btn: "סגור",
    msg: {
      playbook: "🕍✈️ הנה תוכנית הפעולה המדויקת שלנו מול רשות האוכלוסין (PIBA) והרבנות ב-Giyur Aliyah Track:",
      decoder: "🔍 מפענח דרישות המסמכים של משרד הפנים ובודק שעון 180 יום לאפוסטיל:",
      forms: "📄 מילוי אוטומטי של 8 טפסי משרד הפנים הרשמיים בעברית תקנית מכל שפה:",
      bd: "🕍 סימולטור 700 שאלות אמיתיות של בית הדין לגיור ב-6 שפות:",
      couples: "💑 בוא/י נתרגל יחד את 300 שאלות השימוע הזוגי של משרד הפנים ב-2 טלפונים:",
      songs: "🎵 מאמן קריוקי מילה-במילה ל-56 שירי שבת, תפילות שחרית וברכות (ספרדי ואשכנזי):",
      drawer: "🛡️ Giyur Aliyah Track — מרכז השליטה ב-6 שפות לגיור, עלייה והליך מדורג בישראל:"
    }
  },
  fr: {
    btn_playbook: "📤 Partager ce Plan d'Action avec Conjoint / Ami",
    btn_decoder: "📤 Partager le Décodeur de Fiche PIBA",
    btn_forms: "📤 Partager le Générateur des 8 Formulaires PIBA",
    btn_bd: "📤 Partager le Simulateur 700 Questions Beit Din",
    btn_couples: "📤 Inviter mon Conjoint (Synchro 300 Q. sur 2 Tél.)",
    btn_songs: "📤 Partager les 56 Chants de Chabbat & Brakhot",
    btn_drawer: "📤 Partager Giyur Aliyah Track",
    copied: "✅ Lien et résumé copiés ! Collez-les sur WhatsApp ou dans vos groupes.",
    modal_title: "📤 Partager avec votre Conjoint ou Communauté",
    modal_sub: "Aidez votre conjoint ou un ami à éviter les pièges du Misrad HaPanim et du Rabbinat :",
    wa_btn: "💬 Envoyer sur WhatsApp",
    copy_btn: "📋 Copier le Lien",
    close_btn: "Fermer",
    msg: {
      playbook: "🕍✈️ Voici notre plan d'action exact pour le Misrad HaPanim (PIBA) et le Rabbinat sur Giyur Aliyah Track :",
      decoder: "🔍 Ce décodeur gratuit traduit les fiches d'exigences du Misrad HaPanim et vérifie l'horloge des 180 jours d'Apostille :",
      forms: "📄 Remplissez les 8 formulaires officiels PIBA en français -> génère les PDF officiels en hébreu :",
      bd: "🕍 Révisez les 700 vraies questions du Beit Din orthodoxe en 6 langues :",
      couples: "💑 Entraînons-nous ensemble aux 300 questions de l'entretien de couple PIBA sur 2 téléphones :",
      songs: "🎵 Karaoké mot-à-mot des 56 chants de Chabbat, prières du matin et Brakhot (Séfarade & Achkénaze) :",
      drawer: "🛡️ Giyur Aliyah Track — Le Centre de Commande en 6 langues pour Giyur, Aliyah et Visa Conjoint en Israël :"
    }
  },
  es: {
    btn_playbook: "📤 Compartir este Plan de Caso con Pareja / Amigo",
    btn_decoder: "📤 Compartir Decodificador de Hoja PIBA",
    btn_forms: "📤 Compartir Generador de 8 Formularios PIBA",
    btn_bd: "📤 Compartir Simulador 700 Preguntas Beit Din",
    btn_couples: "📤 Invitar a mi Pareja (Sincro 300 P. en 2 Teléfonos)",
    btn_songs: "📤 Compartir 56 Canciones de Shabat y Brajot",
    btn_drawer: "📤 Compartir Giyur Aliyah Track",
    copied: "✅ ¡Enlace y resumen copiados! Pégalo en WhatsApp o en tus grupos.",
    modal_title: "📤 Compartir con tu Pareja o Comunidad",
    modal_sub: "Ayuda a tu pareja o a un amigo a evitar el bucle del Misrad HaPanim y del Rabinato:",
    wa_btn: "💬 Enviar por WhatsApp",
    copy_btn: "📋 Copiar Enlace",
    close_btn: "Cerrar",
    msg: {
      playbook: "🕍✈️ Aquí está nuestro plan paso a paso para el Misrad HaPanim (PIBA) y el Rabinato en Giyur Aliyah Track:",
      decoder: "🔍 Este decodificador gratuito traduce las hojas de requisitos del Misrad HaPanim y verifica el reloj de 180 días de Apostilla:",
      forms: "📄 Completa los 8 formularios oficiales de PIBA en español -> genera los PDF oficiales en hebreo:",
      bd: "🕍 Practica las 700 preguntas reales del Beit Din ortodoxo en 6 idiomas:",
      couples: "💑 Practiquemos juntos las 300 preguntas de la entrevista de pareja en cuartos separados desde 2 teléfonos:",
      songs: "🎵 Karaoke palabra por palabra de las 56 canciones de Shabat, rezos matutinos y Brajot (Sefardí y Ashkenazí):",
      drawer: "🛡️ Giyur Aliyah Track — El Centro de Comando en 6 idiomas para Conversión, Aliyá y Visa de Pareja en Israel:"
    }
  },
  de: {
    btn_playbook: "📤 Diesen Fall-Fahrplan mit Partner / Freund teilen",
    btn_decoder: "📤 Kostenlosen PIBA-Blatt-Decoder teilen",
    btn_forms: "📤 8 Hebräische PIBA-Formular-Generator teilen",
    btn_bd: "📤 700-Fragen Beit-Din-Simulator teilen",
    btn_couples: "📤 Partner einladen (300-Fragen 2-Handy-Sync)",
    btn_songs: "📤 56 Schabbat-Lieder & Brachot Trainer teilen",
    btn_drawer: "📤 Giyur Aliyah Track teilen",
    copied: "✅ Link & Zusammenfassung kopiert! In WhatsApp oder Gruppen einfügen.",
    modal_title: "📤 Mit Partner oder Community teilen",
    modal_sub: "Helfen Sie Ihrem Partner oder Freunden, die Misrad HaPanim & Rabbinat-Schleife zu durchbrechen:",
    wa_btn: "💬 Per WhatsApp senden",
    copy_btn: "📋 Link kopieren",
    close_btn: "Schließen",
    msg: {
      playbook: "🕍✈️ Hier ist unser genauer Schritt-für-Schritt-Fahrplan für Misrad HaPanim (PIBA) & Rabbinat auf Giyur Aliyah Track:",
      decoder: "🔍 Dieser kostenlose Decoder übersetzt Anforderungsblätter des Misrad HaPanim und prüft die 180-Tage-Apostille-Frist:",
      forms: "📄 Alle 8 offiziellen PIBA-Formulare auf Deutsch ausfüllen -> druckfertige hebräische PDFs:",
      bd: "🕍 Alle 700 echten Fragen des orthodoxen Beit Din in 6 Sprachen üben:",
      couples: "💑 Lass uns gemeinsam die 300 Fragen des getrennten Paar-Interviews auf 2 Smartphones üben:",
      songs: "🎵 Wort-für-Wort-Karaoke für alle 56 Schabbat-Lieder, Morgengebete & Brachot (Sephardisch & Aschkenasisch):",
      drawer: "🛡️ Giyur Aliyah Track — Das 6-sprachige Kontrollzentrum für Giur, Alija & Ehepartner-Visum in Israel:"
    }
  },
  ru: {
    btn_playbook: "📤 Поделиться Планом Действий с Партнёром / Другом",
    btn_decoder: "📤 Поделиться Декодером Листа МВД (PIBA)",
    btn_forms: "📤 Поделиться Генератором 8 Бланков МВД на Иврите",
    btn_bd: "📤 Поделиться Симулятором 700 Вопросов Бейт-Дина",
    btn_couples: "📤 Пригласить Партнёра (300 Вопросов Собеседования)",
    btn_songs: "📤 Поделиться Тренажёром 56 Песен Шаббата и Брахот",
    btn_drawer: "📤 Поделиться Giyur Aliyah Track",
    copied: "✅ Ссылка и описание скопированы! Отправьте в WhatsApp, Telegram или группу.",
    modal_title: "📤 Поделиться с Партнёром или Друзьями",
    modal_sub: "Помогите партнёру или друзьям избежать бюрократической петли МВД (PIBA) и Раввината:",
    wa_btn: "💬 Отправить в WhatsApp",
    copy_btn: "📋 Скопировать Ссылку",
    close_btn: "Закрыть",
    msg: {
      playbook: "🕍✈️ Вот наш точный пошаговый план для МВД Израиля (PIBA) и Раввината на Giyur Aliyah Track:",
      decoder: "🔍 Бесплатный Авто-декодер переводит листы требований МВД («Дришат Мисмахим») и проверяет таймер 180 дней для апостиля:",
      forms: "📄 Автозаполнение всех 8 официальных бланков МВД (PIBA) на русском -> готовые PDF на иврите:",
      bd: "🕍 Тренажёр 700 реальных вопросов ортодоксального Бейт-Дина на 6 языках:",
      couples: "💑 Давай вместе потренируем 300 вопросов перекрёстного собеседования МВД (СтуПро) с двух телефонов:",
      songs: "🎵 Пословное караоке для 56 песен Шаббата, утренних молитв и благословений (сефардский и ашкеназский нусах):",
      drawer: "🛡️ Giyur Aliyah Track — Центр управления на 6 языках для гиюра, алии и визы супругов (СтуПро) в Израиле:"
    }
  }
};

window.getGatShareLang = function() {
  const raw = (window.curLang || localStorage.getItem('gat_lang') || localStorage.getItem('zehut_lang') || document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  return window.GAT_SHARE_I18N[raw] ? raw : 'en';
};

window.shareGatRelief = function(contextKey, customUrl) {
  const lang = window.getGatShareLang();
  const pack = window.GAT_SHARE_I18N[lang] || window.GAT_SHARE_I18N.en;
  const baseOrigin = "https://giyuraliyahtrack.com";
  const langPrefix = (lang === 'en') ? '' : ('/' + lang);
  const urlMap = {
    playbook: window.location.href.startsWith('http') ? window.location.href : (baseOrigin + langPrefix + '/'),
    decoder: baseOrigin + "/app/?module=clerk-auditor" + (lang === "en" ? "" : "&lang=" + lang),
    forms: baseOrigin + "/app/?module=hebrew-engine" + (lang === "en" ? "" : "&lang=" + lang),
    bd: baseOrigin + "/app/?module=beit-din-150" + (lang === "en" ? "" : "&lang=" + lang),
    couples: baseOrigin + "/app/?module=couples-sync" + (lang === "en" ? "" : "&lang=" + lang),
    songs: baseOrigin + "/app/?module=songs-prayers" + (lang === "en" ? "" : "&lang=" + lang),
    drawer: baseOrigin + langPrefix + "/"
  };
  const targetUrl = customUrl || urlMap[contextKey] || (baseOrigin + langPrefix + "/");
  const shareText = (pack.msg[contextKey] || pack.msg.drawer) + " " + targetUrl;

  if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '')) {
    navigator.share({
      title: "Giyur Aliyah Track",
      text: pack.msg[contextKey] || pack.msg.drawer,
      url: targetUrl
    }).catch(function(){});
    return;
  }

  // Show clean 1-tap Share Modal (WhatsApp + Copy Link)
  let modal = document.getElementById('gat-viral-share-modal');
  if (modal) modal.remove();
  modal = document.createElement('div');
  modal.id = 'gat-viral-share-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,25,47,0.82);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;';
  const waHref = 'https://wa.me/?text=' + encodeURIComponent(shareText);
  modal.innerHTML = `
    <div style="background:#112240;border:1px solid rgba(2,136,232,0.45);border-radius:20px;max-width:440px;width:100%;padding:24px;color:#F8FAFC;box-shadow:0 20px 50px rgba(0,0,0,0.6);text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" dir="${lang==='he'?'rtl':'ltr'}">
      <div style="font-size:1.2rem;font-weight:800;margin-bottom:8px;color:#FFFFFF;">${pack.modal_title}</div>
      <div style="font-size:0.9rem;color:#94A3B8;line-height:1.45;margin-bottom:16px;">${pack.modal_sub}</div>
      <div style="background:#0A192F;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px;font-size:0.82rem;color:#CBD5E1;text-align:${lang==='he'?'right':'left'};margin-bottom:18px;word-break:break-word;">${shareText}</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <a href="${waHref}" target="_blank" rel="noopener" style="display:block;background:#25D366;color:#062010;font-weight:800;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:0.95rem;">${pack.wa_btn}</a>
        <button id="gat-viral-copy-btn" style="background:linear-gradient(135deg,#0A96FA 0%,#0277D0 100%);color:#FFFFFF;font-weight:700;border:none;padding:13px 16px;border-radius:12px;font-size:0.95rem;cursor:pointer;">${pack.copy_btn}</button>
        <button onclick="document.getElementById('gat-viral-share-modal').remove()" style="background:transparent;color:#94A3B8;border:1px solid rgba(255,255,255,0.15);padding:10px 16px;border-radius:12px;font-size:0.88rem;cursor:pointer;">${pack.close_btn}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('gat-viral-copy-btn').onclick = function() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText);
    }
    this.textContent = pack.copied;
    this.style.background = '#10B981';
  };
};

window.syncGatShareButtonsI18n = function() {
  const lang = window.getGatShareLang ? window.getGatShareLang() : 'en';
  const pack = (window.GAT_SHARE_I18N && window.GAT_SHARE_I18N[lang]) || (window.GAT_SHARE_I18N && window.GAT_SHARE_I18N.en);
  if (!pack) return;
  document.querySelectorAll('.gat-share-ctx-btn').forEach(function(btn) {
    const ctx = btn.getAttribute('data-share-ctx');
    if (ctx && pack['btn_' + ctx]) btn.textContent = pack['btn_' + ctx];
  });
};
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() { setTimeout(window.syncGatShareButtonsI18n, 150); });
  document.addEventListener('click', function() { setTimeout(window.syncGatShareButtonsI18n, 80); });
}
/* === GAT_VIRAL_SHARE_ENGINE_END === */



// Auto-open Sync Devices Modal when arriving via ?sync=1
(function checkSyncUrlParam() {
  try {
    var sp = new URLSearchParams(window.location.search);
    if (sp.get("sync") === "1") {
      var cleanUrl = window.location.pathname + (sp.get("lang") ? "?lang=" + sp.get("lang") : "");
      window.history.replaceState({}, document.title, cleanUrl);
      var tries = 0;
      var tmr = setInterval(function() {
        tries++;
        var m = document.getElementById("device-sync-modal");
        if (m && typeof window.openDeviceSyncModal === "function") {
          clearInterval(tmr);
          window.openDeviceSyncModal();
        } else if (tries > 25) {
          clearInterval(tmr);
        }
      }, 120);
    }
  } catch (e) {}
})();


// ============================================================================
// UNIFIED PROFILE ICON (🟢/🟠), CLOUD DOCUMENT VAULT, 18-ITEM HAMBURGER MENU
// & 5-TAB BOTTOM NAVIGATION BAR ACROSS ALL PAGES
// ============================================================================
(function initUnifiedGatShellAndProfileVault() {
  const SHELL_I18N = {
    en: {
      profBtnTitle: "My Profile, Uploaded Docs & Settings",
      profModalTitle: "👤 My Profile, Document Vault & Settings",
      statusSynced: "🟢 Cloud Synced Across Devices",
      statusGuest: "🟠 Guest Device (Tap to Link WhatsApp / Pass Code)",
      secDocs: "📂 1. My Uploaded Documents Vault (View & Download)",
      secDocsSub: "Your scanned Passports, Israeli TZ + Sefach, Birth & Marriage Certificates are stored in your encrypted Cloud + Device Vault:",
      uploadNewBtn: "➕ Upload / Scan New Document to Vault",
      noDocsYet: "No documents uploaded yet. Upload your Passport, Israeli TZ + Sefach, Birth Certificate, or Marriage Certificate to auto-fill your 8 PIBA forms and keep them ready for inspection.",
      btnView: "👁️ View",
      btnDownload: "⬇️ Download",
      btnAddPage: "➕ Add Page",
      btnDelete: "🗑️",
      ownerMe: "Primary Applicant (Me)",
      ownerPartner: "Partner / Spouse",
      secForms: "📄 2. My 8 Official Stamped Hebrew PIBA Forms",
      secFormsSub: "Tap any form to open or download your stamped PDF:",
      openFormsBtn: "📄 Open PIBA Forms Engine & PDF Stamper →",
      secAccount: "🔑 3. Account, Pass Tier & Device Sync",
      tierLbl: "Current Pass Status:",
      passCodeLbl: "Permanent 6-Char Pass Code:",
      syncBtn: "📲 Sync Devices / Log In / Recovery",
      upgradeBtn: "💎 View All 23 Passes & Concierge Pricing",
      secSettings: "⚙️ 4. Settings, Language & Support",
      langLbl: "Interface & Form Explanation Language:",
      reportBtn: "🛠️ Report a Problem / Bug",
      waSupportBtn: "💬 Direct WhatsApp Support (+972-52-582-2005)",
      resetDraftsBtn: "🧹 Reset Local Form Inputs",
      resetConfirm: "Reset local form inputs on this device?",
      nav0: "Start", nav1: "Tracks", nav2: "Savings", nav3: "Rabbi", nav4: "Tracker",
      hamProfile: "👤 My Profile & Uploaded Docs",
      hamSync: "📲 Sync Devices & Pass Code",
      hamPricing: "💎 All 23 Services & Pricing",
      hamSec1: "🛠️ INTERACTIVE COMMAND CENTER (/APP)",
      hamHome: "🏠 Home & 3-Track Diagnostic Playbook",
      hamForms: "📸 Statutory Hebrew & 8 PIBA Forms",
      hamBd: "🕍 700 Beit Din Exam Flashcards",
      hamCouples: "📱 300-Q 2-Phone Couples Sync",
      hamSongs: "🎵 56 Shabbat Songs, Prayers & Brachot",
      hamLetters: "✍️ Rabbi & Host Family Reference Logger",
      hamTracker: "📊 Live 180-Day & 30-Day Deadline Tracker",
      hamSec2: "🤝 VETTED CONCIERGE & PARTNER SHIELDS",
      hamVetted: "🤝 Vetted Notary, Rabbi, Kallah & Lawyer Desk",
      hamFx: "💸 Pay Rent in ₪ & Save ~2.5% on Currency Wires",
      hamHealth: "🏥 60–90 Day Bridge Health Insurance (No TZ)",
      hamSec3: "🚨 STATUTORY PLAYBOOKS & SURVIVAL GUIDES",
      hamGoBag: "🚨 Pre-Flight Go-Bag & Emergency Aliyah",
      hamFiveDocs: "✈️ 5 Apostilled Docs & 24-Mo Sal Klita Rules",
      hamVc: "⚖️ Va'adat Charigim (Form Ash/1) Guide",
      hamSurvival: "💼 Tourist Survival: Remote Work & Housing",
      hamAbout: "ℹ️ What We Are — And What We Are NOT",
      hamShare: "🔗 Share This Exact Page",
      hamInstall: "📲 Install App to Home Screen"
    },
    he: {
      profBtnTitle: "הפרופיל שלי, מסמכים שהועלו והגדרות",
      profModalTitle: "👤 הפרופיל שלי, כספת מסמכים והגדרות",
      statusSynced: "🟢 מסונכרן בענן בין המכשירים",
      statusGuest: "🟠 מכשיר אורח (לחצו לחיבור וואטסאפ / קוד גישה)",
      secDocs: "📂 1. המסמכים שהעליתי (צפייה והורדה)",
      secDocsSub: "הדרכונים, ת״ז + ספח, תעודות הלידה והנישואין שהעליתם שמורים בכספת האישית שלכם לצפייה ולהורדה מכל מכשיר:",
      uploadNewBtn: "➕ העלאת / סריקת מסמך חדש לכספת",
      noDocsYet: "טרם הועלו מסמכים. העלו דרכון, ת״ז + ספח, תעודת לידה או תעודת נישואין למילוי אוטומטי של 8 טפסי משרד הפנים ולשמירה בכספת.",
      btnView: "👁️ צפייה",
      btnDownload: "⬇️ הורדה",
      btnAddPage: "➕ הוסף עמוד",
      btnDelete: "🗑️",
      ownerMe: "מבקש/ת ראשי/ת (אני)",
      ownerPartner: "בן/בת זוג / מזמין",
      secForms: "📄 2. שמונת טפסי משרד הפנים (PIBA) המוכנים שלי",
      secFormsSub: "לחצו לפתיחה או הורדה של כל טופס מוחתם בעברית:",
      openFormsBtn: "📄 פתיחת מנוע 8 טפסי משרד הפנים ←",
      secAccount: "🔑 3. חשבון, סוג מנוי וסנכרון מכשירים",
      tierLbl: "סטטוס גישה נוכחי:",
      passCodeLbl: "קוד גישה קבוע (6 תווים):",
      syncBtn: "📲 סנכרון מכשירים / התחברות / שחזור",
      upgradeBtn: "💎 כל 23 המסלולים והמחירים",
      secSettings: "⚙️ 4. הגדרות, שפה ותמיכה",
      langLbl: "שפת ממשק והסברים:",
      reportBtn: "🛠️ דיווח על תקלה טכנית",
      waSupportBtn: "💬 תמיכה ישירה בוואטסאפ (052-582-2005)",
      resetDraftsBtn: "🧹 איפוס נתוני טפסים במכשיר זה",
      resetConfirm: "האם לאפס את נתוני הטפסים השמורים במכשיר זה?",
      nav0: "התחלה", nav1: "מסלולים", nav2: "חיסכון", nav3: "רבנים", nav4: "מעקב",
      hamProfile: "👤 הפרופיל שלי והמסמכים שהועלו",
      hamSync: "📲 סנכרון מכשירים וקוד גישה",
      hamPricing: "💎 כל 23 השירותים והמחירים",
      hamSec1: "🛠️ מרכז השליטה והכלים (/APP)",
      hamHome: "🏠 דף הבית ואבחון מסלול אישי",
      hamForms: "📸 מנוע עברית ו-8 טפסי משרד הפנים",
      hamBd: "🕍 700 כרטיסיות הכנה לבית הדין",
      hamCouples: "📱 300 שאלות שימוע זוגי ב-2 טלפונים",
      hamSongs: "🎵 56 שירי שבת, תפילות וברכות",
      hamLetters: "✍️ יומן פעילות ומכתבי המלצה מרב וקהילה",
      hamTracker: "📊 מחשבון 180 יום ומעקב זמנים",
      hamSec2: "🤝 ליווי אנושי מאומת והגנות פיננסיות",
      hamVetted: "🤝 נוטריון סרט אדום, רב מלווה, מדריכת כלה ועו״ד",
      hamFx: "💸 תשלום שכ״ד ב-₪ וחיסכון 2.5% בהעברות מט״ח",
      hamHealth: "🏥 ביטוח בריאות גישור ל-60–90 יום (ללא ת״ז)",
      hamSec3: "🚨 מדריכי חוק ונהלי משרד הפנים",
      hamGoBag: "🚨 תיק חירום לטיסה ועלייה מתוך ישראל",
      hamFiveDocs: "✈️ 5 מסמכי האפוסטיל וכלל 24 חודשי סל קליטה",
      hamVc: "⚖️ מדריך ועדת חריגים (טופס אש/1)",
      hamSurvival: "💼 הישרדות כתייר: עבודה מרחוק ומגורים",
      hamAbout: "ℹ️ מי אנחנו — ומה אנחנו לא",
      hamShare: "🔗 שיתוף עמוד זה",
      hamInstall: "📲 התקנת האפליקציה למסך הבית"
    },
    fr: {
      profBtnTitle: "Mon Profil, Documents Importés & Paramètres",
      profModalTitle: "👤 Mon Profil, Coffre de Documents & Paramètres",
      statusSynced: "🟢 Synchronisé dans le Cloud",
      statusGuest: "🟠 Appareil Invité (Appuyez pour lier WhatsApp / Code)",
      secDocs: "📂 1. Mes Documents Importés (Voir & Télécharger)",
      secDocsSub: "Vos passeports, TZ + Sefach, actes de naissance et de mariage scannés sont sauvegardés ici :",
      uploadNewBtn: "➕ Importer / Scanner un Nouveau Document",
      noDocsYet: "Aucun document importé pour l'instant. Importez votre passeport, TZ + Sefach, acte de naissance ou de mariage pour pré-remplir vos 8 formulaires PIBA.",
      btnView: "👁️ Voir",
      btnDownload: "⬇️ Télécharger",
      btnAddPage: "➕ Page",
      btnDelete: "🗑️",
      ownerMe: "Demandeur Principal (Moi)",
      ownerPartner: "Conjoint / Partenaire",
      secForms: "📄 2. Mes 8 Formulaires Officiels PIBA en Hébreu",
      secFormsSub: "Ouvrez ou téléchargez vos formulaires PDF pré-remplis :",
      openFormsBtn: "📄 Ouvrir le Moteur des 8 Formulaires PIBA →",
      secAccount: "🔑 3. Compte, Pass & Synchronisation",
      tierLbl: "Statut du Pass :",
      passCodeLbl: "Code Permanent (6 caractères) :",
      syncBtn: "📲 Synchroniser les Appareils / Connexion",
      upgradeBtn: "💎 Voir les 23 Services & Tarifs",
      secSettings: "⚙️ 4. Paramètres, Langue & Support",
      langLbl: "Langue de l'interface :",
      reportBtn: "🛠️ Signaler un problème technique",
      waSupportBtn: "💬 Support WhatsApp Direct (+972-52-582-2005)",
      resetDraftsBtn: "🧹 Réinitialiser le brouillon local",
      resetConfirm: "Réinitialiser les champs de formulaire sur cet appareil ?",
      nav0: "Début", nav1: "Parcours", nav2: "Économies", nav3: "Rabbin", nav4: "Suivi",
      hamProfile: "👤 Mon Profil & Mes Documents",
      hamSync: "📲 Synchroniser Appareils & Code",
      hamPricing: "💎 Les 23 Services & Tarifs",
      hamSec1: "🛠️ CENTRE DE COMMANDE (/APP)",
      hamHome: "🏠 Accueil & Diagnostic des 3 Parcours",
      hamForms: "📸 Moteur Hébreu & 8 Formulaires PIBA",
      hamBd: "🕍 700 Cartes d'Examen Beit Din",
      hamCouples: "📱 300 Questions Couples sur 2 Téléphones",
      hamSongs: "🎵 56 Chants de Chabbat, Prières & Brakhot",
      hamLetters: "✍️ Journal d'Activités & Lettres du Rabbin",
      hamTracker: "📊 Suivi des Délais 180 Jours & 30 Jours",
      hamSec2: "🤝 CONCIERGERIE VÉRIFIÉE & BOUCLIERS",
      hamVetted: "🤝 Notaire Ruban Rouge, Rabbin, Kallah & Avocat",
      hamFx: "💸 Payer le Loyer en ₪ & Économiser ~2,5% (Change)",
      hamHealth: "🏥 Assurance Santé Pont 60–90 Jours (Sans TZ)",
      hamSec3: "🚨 GUIDES LÉGAUX & SURVIE EN ISRAËL",
      hamGoBag: "🚨 Sac d'Urgence Pré-Vol & Aliyah sur Place",
      hamFiveDocs: "✈️ Les 5 Actes Apostillés & Règle des 24 Mois",
      hamVc: "⚖️ Guide Va'adat Charigim (Formulaire Ash/1)",
      hamSurvival: "💼 Survie Touriste : Télétravail & Logement",
      hamAbout: "ℹ️ Qui Nous Sommes — Et Ce Que Nous Ne Sommes PAS",
      hamShare: "🔗 Partager Cette Page",
      hamInstall: "📲 Installer l'Application"
    },
    es: {
      profBtnTitle: "Mi Perfil, Documentos Subidos y Ajustes",
      profModalTitle: "👤 Mi Perfil, Bóveda de Documentos y Ajustes",
      statusSynced: "🟢 Sincronizado en la Nube",
      statusGuest: "🟠 Dispositivo Invitado (Toque para vincular WhatsApp)",
      secDocs: "📂 1. Mis Documentos Subidos (Ver y Descargar)",
      secDocsSub: "Sus pasaportes, TZ + Sefach, partidas de nacimiento y matrimonio escaneados se guardan aquí:",
      uploadNewBtn: "➕ Subir / Escanear Nuevo Documento",
      noDocsYet: "Aún no ha subido documentos. Suba su pasaporte, TZ + Sefach, partida de nacimiento o matrimonio para autocompletar los 8 formularios PIBA.",
      btnView: "👁️ Ver",
      btnDownload: "⬇️ Descargar",
      btnAddPage: "➕ Página",
      btnDelete: "🗑️",
      ownerMe: "Solicitante Principal (Yo)",
      ownerPartner: "Pareja / Cónyuge",
      secForms: "📄 2. Mis 8 Formularios Oficiales PIBA en Hebreo",
      secFormsSub: "Abra o descargue sus PDFs oficiales sellados:",
      openFormsBtn: "📄 Abrir Motor de 8 Formularios PIBA →",
      secAccount: "🔑 3. Cuenta, Pase y Sincronización",
      tierLbl: "Estado de su Pase:",
      passCodeLbl: "Código Permanente (6 caracteres):",
      syncBtn: "📲 Sincronizar Dispositivos / Iniciar Sesión",
      upgradeBtn: "💎 Ver los 23 Servicios y Precios",
      secSettings: "⚙️ 4. Ajustes, Idioma y Soporte",
      langLbl: "Idioma de la interfaz:",
      reportBtn: "🛠️ Reportar un problema técnico",
      waSupportBtn: "💬 Soporte WhatsApp Directo (+972-52-582-2005)",
      resetDraftsBtn: "🧹 Borrar borrador local",
      resetConfirm: "¿Borrar los datos del formulario en este dispositivo?",
      nav0: "Inicio", nav1: "Vías", nav2: "Ahorro", nav3: "Rabino", nav4: "Plazos",
      hamProfile: "👤 Mi Perfil y Documentos Subidos",
      hamSync: "📲 Sincronizar Dispositivos y Código",
      hamPricing: "💎 Los 23 Servicios y Precios",
      hamSec1: "🛠️ CENTRO DE MANDO INTERACTIVO (/APP)",
      hamHome: "🏠 Inicio y Diagnóstico de las 3 Vías",
      hamForms: "📸 Motor Hebreo y 8 Formularios PIBA",
      hamBd: "🕍 700 Tarjetas de Examen Beit Din",
      hamCouples: "📱 300 Preguntas de Pareja en 2 Teléfonos",
      hamSongs: "🎵 56 Canciones de Shabat, Rezos y Berajot",
      hamLetters: "✍️ Registro de Actividades y Cartas Rabínicas",
      hamTracker: "📊 Reloj de 180 Días y 30 Días",
      hamSec2: "🤝 CONSERJERÍA VERIFICADA Y ESCUDOS",
      hamVetted: "🤝 Notario Cinta Roja, Rabino, Kalá y Abogado",
      hamFx: "💸 Pagar Alquiler en ₪ y Ahorrar ~2.5% en Divisas",
      hamHealth: "🏥 Seguro Médico Puente 60–90 Días (Sin TZ)",
      hamSec3: "🚨 GUÍAS LEGALES Y SUPERVIVENCIA",
      hamGoBag: "🚨 Maleta de Emergencia Pre-Vuelo y Aliyá",
      hamFiveDocs: "✈️ Los 5 Documentos Apostillados y Regla 24 Meses",
      hamVc: "⚖️ Guía Va'adat Jariguim (Formulario Ash/1)",
      hamSurvival: "💼 Supervivencia Turista: Trabajo Remoto y Vivienda",
      hamAbout: "ℹ️ Qué Somos — Y Qué NO Somos",
      hamShare: "🔗 Compartir Esta Página",
      hamInstall: "📲 Instalar Aplicación"
    },
    de: {
      profBtnTitle: "Mein Profil, Hochgeladene Dokumente & Einstellungen",
      profModalTitle: "👤 Mein Profil, Dokumenten-Tresor & Einstellungen",
      statusSynced: "🟢 In der Cloud synchronisiert",
      statusGuest: "🟠 Gastgerät (Tippen zum Verknüpfen mit WhatsApp)",
      secDocs: "📂 1. Meine Hochgeladenen Dokumente (Ansehen & Download)",
      secDocsSub: "Ihre gescannten Reisepässe, TZ + Sefach, Geburts- und Heiratsurkunden sind hier gespeichert:",
      uploadNewBtn: "➕ Neues Dokument Hochladen / Scannen",
      noDocsYet: "Noch keine Dokumente hochgeladen. Laden Sie Reisepass, TZ + Sefach, Geburts- oder Heiratsurkunde hoch, um alle 8 PIBA-Formulare vorauszufüllen.",
      btnView: "👁️ Ansehen",
      btnDownload: "⬇️ Download",
      btnAddPage: "➕ Seite",
      btnDelete: "🗑️",
      ownerMe: "Hauptantragsteller (Ich)",
      ownerPartner: "Partner / Ehepartner",
      secForms: "📄 2. Meine 8 Offiziellen PIBA-Formulare",
      secFormsSub: "Öffnen oder laden Sie Ihre ausgefüllten PDFs herunter:",
      openFormsBtn: "📄 8-Formulare-Engine & PDF-Stamper öffnen →",
      secAccount: "🔑 3. Konto, Pass-Status & Geräte-Sync",
      tierLbl: "Aktueller Pass-Status:",
      passCodeLbl: "Permanenter 6-stelliger Pass-Code:",
      syncBtn: "📲 Geräte synchronisieren / Login",
      upgradeBtn: "💎 Alle 23 Services & Preise ansehen",
      secSettings: "⚙️ 4. Einstellungen, Sprache & Support",
      langLbl: "Sprache der Oberfläche:",
      reportBtn: "🛠️ Technisches Problem melden",
      waSupportBtn: "💬 Direkter WhatsApp-Support (+972-52-582-2005)",
      resetDraftsBtn: "🧹 Lokale Formulardaten zurücksetzen",
      resetConfirm: "Lokale Formulardaten auf diesem Gerät zurücksetzen?",
      nav0: "Start", nav1: "Wege", nav2: "Sparen", nav3: "Rabbiner", nav4: "Fristen",
      hamProfile: "👤 Mein Profil & Dokumente",
      hamSync: "📲 Geräte synchronisieren & Code",
      hamPricing: "💎 Alle 23 Services & Preise",
      hamSec1: "🛠️ INTERAKTIVES KOMMANDOZENTRUM (/APP)",
      hamHome: "🏠 Startseite & 3-Wege-Diagnose",
      hamForms: "📸 Hebräisch-Engine & 8 PIBA-Formulare",
      hamBd: "🕍 700 Beit-Din-Prüfungskarten",
      hamCouples: "📱 300 Paar-Fragen (2-Handy-Sync)",
      hamSongs: "🎵 56 Schabbat-Lieder, Gebete & Brachot",
      hamLetters: "✍️ Aktivitäts-Logger & Rabbiner-Empfehlungen",
      hamTracker: "📊 180-Tage- & 30-Tage-Fristen-Tracker",
      hamSec2: "🤝 GEPRÜFTE CONCIERGE & SCHUTZSCHILDE",
      hamVetted: "🤝 Rotband-Notar, Rabbiner, Kallah & Anwalt",
      hamFx: "💸 Miete in ₪ zahlen & ~2,5% Wechselkurs sparen",
      hamHealth: "🏥 60–90 Tage Überbrückungs-Krankenversicherung",
      hamSec3: "🚨 GESETZLICHE LEITFÄDEN & ÜBERLEBEN",
      hamGoBag: "🚨 Notfall-Handgepäck & In-Israel-Alija",
      hamFiveDocs: "✈️ Die 5 Apostille-Urkunden & 24-Monate-Regel",
      hamVc: "⚖️ Va'adat Charigim (Formular Asch/1) Guide",
      hamSurvival: "💼 Touristen-Survival: Remote-Arbeit & Wohnen",
      hamAbout: "ℹ️ Was Wir Sind — Und Was Wir NICHT Sind",
      hamShare: "🔗 Diese Seite teilen",
      hamInstall: "📲 App zum Startbildschirm hinzufügen"
    },
    ru: {
      profBtnTitle: "Мой профиль, загруженные документы и настройки",
      profModalTitle: "👤 Мой профиль, сейф документов и настройки",
      statusSynced: "🟢 Синхронизировано в облаке",
      statusGuest: "🟠 Гостевое устройство (нажмите для привязки WhatsApp)",
      secDocs: "📂 1. Мои загруженные документы (Просмотр и скачивание)",
      secDocsSub: "Ваши паспорта, Теудат Зеут + Сефах, свидетельства о рождении и браке сохранены здесь для доступа с любого устройства:",
      uploadNewBtn: "➕ Загрузить / сканировать новый документ",
      noDocsYet: "Документы ещё не загружены. Загрузите загранпаспорт, ТЗ + Сефах, свидетельство о рождении или браке для автозаполнения 8 анкет МВД.",
      btnView: "👁️ Открыть",
      btnDownload: "⬇️ Скачать",
      btnAddPage: "➕ Стр.",
      btnDelete: "🗑️",
      ownerMe: "Основной заявитель (Я)",
      ownerPartner: "Партнёр / Супруг(а)",
      secForms: "📄 2. Мои 8 официальных анкет МВД (PIBA) на иврите",
      secFormsSub: "Откройте или скачайте заполненные PDF-бланки:",
      openFormsBtn: "📄 Открыть генератор 8 анкет МВД →",
      secAccount: "🔑 3. Аккаунт, тариф и синхронизация устройств",
      tierLbl: "Текущий статус доступа:",
      passCodeLbl: "Постоянный 6-значный код доступа:",
      syncBtn: "📲 Синхронизация устройств / Вход",
      upgradeBtn: "💎 Все 23 сервиса и тарифы",
      secSettings: "⚙️ 4. Настройки, язык и поддержка",
      langLbl: "Язык интерфейса и подсказок:",
      reportBtn: "🛠️ Сообщить о технической проблеме",
      waSupportBtn: "💬 Прямая поддержка в WhatsApp (+972-52-582-2005)",
      resetDraftsBtn: "🧹 Сбросить черновик анкет на устройстве",
      resetConfirm: "Сбросить введённые данные анкет на этом устройстве?",
      nav0: "Старт", nav1: "Пути", nav2: "Экономия", nav3: "Раввин", nav4: "Сроки",
      hamProfile: "👤 Мой профиль и загруженные документы",
      hamSync: "📲 Синхронизация устройств и Код",
      hamPricing: "💎 Все 23 сервиса и тарифы",
      hamSec1: "🛠️ ИНТЕРАКТИВНЫЙ ЦЕНТР УПРАВЛЕНИЯ (/APP)",
      hamHome: "🏠 Главная и диагностика 3 маршрутов",
      hamForms: "📸 Генератор иврита и 8 анкет МВД (PIBA)",
      hamBd: "🕍 700 карточек экзамена Бейт-Дина",
      hamCouples: "📱 300 вопросов для пар (синхронизация 2 телефонов)",
      hamSongs: "🎵 56 субботних песен, молитв и благословений",
      hamLetters: "✍️ Дневник общины и письма от раввина",
      hamTracker: "📊 Трекер сроков 180 дней и 30 дней",
      hamSec2: "🤝 ПРОВЕРЕННЫЕ СПЕЦИАЛИСТЫ И ЗАЩИТА",
      hamVetted: "🤝 Нотариус, раввин-куратор, мадрихат калла и адвокат",
      hamFx: "💸 Оплата аренды в ₪ и экономия ~2.5% на переводах",
      hamHealth: "🏥 Временная медстраховка на 60–90 дней (без ТЗ)",
      hamSec3: "🚨 ПРАВОВЫЕ ГИДЫ И ВЫЖИВАНИЕ В ИЗРАИЛЕ",
      hamGoBag: "🚨 Тревожный чемоданчик до вылета и репатриация",
      hamFiveDocs: "✈️ 5 документов с апостилем и правило 24 месяцев",
      hamVc: "⚖️ Гид по Ваадат Харигим (форма Аш/1)",
      hamSurvival: "💼 Выживание по турвизе: удалённая работа и жильё",
      hamAbout: "ℹ️ Кто мы — и чем мы НЕ являемся",
      hamShare: "🔗 Поделиться этой страницей",
      hamInstall: "📲 Установить приложение на экран"
    }
  };

  function curLang() {
    const qL = (new URLSearchParams(window.location.search).get("lang") || "").toLowerCase();
    if (SHELL_I18N[qL]) return qL;
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (SHELL_I18N[pathLang]) return pathLang;
    const savedL = String(localStorage.getItem("gat_lang") || localStorage.getItem("zehut_lang") || window.appLang || window.gatLang || window.lang || "en").slice(0, 2).toLowerCase();
    return SHELL_I18N[savedL] ? savedL : "en";
  }

  window.goToLocalizedPricing = function(e, optionalSku) {
    if (e && e.preventDefault) e.preventDefault();
    const lg = curLang();
    localStorage.setItem("gat_lang", lg);
    localStorage.setItem("zehut_lang", lg);
    const base = (lg === "en") ? "/pricing/" : ("/" + lg + "/pricing/");
    const qs = optionalSku ? ("?sku=" + encodeURIComponent(optionalSku) + "&lang=" + lg) : ("?lang=" + lg);
    window.location.href = base + qs;
    return false;
  };

  window.goToLocalizedConcierge = function(e, optionalSku) {
    if (e && e.preventDefault) e.preventDefault();
    const lg = curLang();
    localStorage.setItem("gat_lang", lg);
    localStorage.setItem("zehut_lang", lg);
    const base = (lg === "en") ? "/concierge-booking/" : ("/" + lg + "/concierge-booking/");
    const qs = optionalSku ? ("?sku=" + encodeURIComponent(optionalSku) + "&lang=" + lg) : ("?lang=" + lg);
    window.location.href = base + qs;
    return false;
  };

  function getApiUrl() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  function getCurrentUid() {
    if (window.gatUid) return window.gatUid;
    try {
      if (typeof firebase !== "undefined" && firebase.auth && firebase.auth().currentUser) {
        return firebase.auth().currentUser.uid;
      }
    } catch (e) {}
    return localStorage.getItem("gat_uid") || "";
  }

  function isUserCloudSynced() {
    if (typeof window.isGatUserLoggedIn === "function") return window.isGatUserLoggedIn();
    return Boolean(localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone"));
  }

  // ==========================================================================
  // LOCAL INDEXEDDB CACHE + FIRESTORE CLOUD DOCUMENT VAULT
  // ==========================================================================
  const IDB_NAME = "gat_doc_vault_db";
  const IDB_STORE = "uploaded_docs";

  function openVaultIdb() {
    return new Promise(function(resolve, reject) {
      if (!window.indexedDB) return resolve(null);
      const req = window.indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: "docId" });
        }
      };
      req.onsuccess = function(e) { resolve(e.target.result); };
      req.onerror = function() { resolve(null); };
    });
  }

  async function idbPutDoc(record) {
    const db = await openVaultIdb();
    if (!db) return;
    return new Promise(function(resolve) {
      try {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(record);
        tx.oncomplete = function() { resolve(true); };
        tx.onerror = function() { resolve(false); };
      } catch (e) { resolve(false); }
    });
  }

  async function idbGetAllDocs() {
    const db = await openVaultIdb();
    if (!db) return [];
    return new Promise(function(resolve) {
      try {
        const tx = db.transaction(IDB_STORE, "readonly");
        const req = tx.objectStore(IDB_STORE).getAll();
        req.onsuccess = function() { resolve(req.result || []); };
        req.onerror = function() { resolve([]); };
      } catch (e) { resolve([]); }
    });
  }

  async function idbGetDoc(docId) {
    const db = await openVaultIdb();
    if (!db) return null;
    return new Promise(function(resolve) {
      try {
        const tx = db.transaction(IDB_STORE, "readonly");
        const req = tx.objectStore(IDB_STORE).get(docId);
        req.onsuccess = function() { resolve(req.result || null); };
        req.onerror = function() { resolve(null); };
      } catch (e) { resolve(null); }
    });
  }

  async function idbDeleteDoc(docId) {
    const db = await openVaultIdb();
    if (!db) return;
    return new Promise(function(resolve) {
      try {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete(docId);
        tx.oncomplete = function() { resolve(true); };
        tx.onerror = function() { resolve(false); };
      } catch (e) { resolve(false); }
    });
  }

  window.saveDocToGatVault = async function(opts) {
    if (!opts) return null;
    const ownerParty = opts.ownerParty || "me";
    const slotKey = opts.slotKey || "doc";
    const docId = String(opts.docId || (ownerParty + "_" + slotKey)).replace(/[^a-zA-Z0-9_:-]/g, "");
    const files = Array.isArray(opts.files) ? opts.files : [];
    const existing = await idbGetDoc(docId);
    const mergedPages = (opts.appendPages && existing && Array.isArray(existing.pages))
      ? existing.pages.concat(files)
      : files;

    const record = {
      docId: docId,
      slotKey: slotKey,
      ownerParty: ownerParty,
      docType: opts.docType || (existing && existing.docType) || slotKey,
      docTitle: opts.docTitle || (existing && existing.docTitle) || "Uploaded Document",
      issuingCountry: opts.issuingCountry || (existing && existing.issuingCountry) || "",
      pageCount: mergedPages.length || 1,
      hasApostille: opts.hasApostille !== undefined ? opts.hasApostille : (existing ? existing.hasApostille : true),
      hasSefach: opts.hasSefach !== undefined ? opts.hasSefach : (existing ? existing.hasSefach : false),
      isLongForm: opts.isLongForm !== undefined ? opts.isLongForm : (existing ? existing.isLongForm : true),
      expiryDateIso: opts.expiryDateIso || (existing && existing.expiryDateIso) || "",
      updatedAt: Date.now(),
      pages: mergedPages
    };

    await idbPutDoc(record);
    window.refreshGatProfileBadge();

    const uid = getCurrentUid();
    if (uid && uid !== "anon" && !opts.alreadySavedOnServer && files.length > 0) {
      try {
        await fetch(getApiUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "save_uploaded_doc",
            uid: uid,
            docId: docId,
            slotKey: slotKey,
            ownerParty: ownerParty,
            docType: record.docType,
            docTitle: record.docTitle,
            issuingCountry: record.issuingCountry,
            hasApostille: record.hasApostille,
            hasSefach: record.hasSefach,
            isLongForm: record.isLongForm,
            expiryDateIso: record.expiryDateIso,
            appendPages: Boolean(opts.appendPages),
            files: files
          })
        });
      } catch (e) {}
    }
    return record;
  };

  window.fetchMergedVaultDocsList = async function() {
    const localList = await idbGetAllDocs();
    const map = {};
    localList.forEach(function(item) {
      if (item && item.docId) map[item.docId] = item;
    });

    const uid = getCurrentUid();
    if (uid && uid !== "anon") {
      try {
        const res = await fetch(getApiUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "list_uploaded_docs", uid: uid })
        });
        const data = await res.json();
        if (data && data.ok && Array.isArray(data.items)) {
          data.items.forEach(function(remoteItem) {
            if (!remoteItem || !remoteItem.docId) return;
            const loc = map[remoteItem.docId];
            if (!loc || (remoteItem.updatedAt || 0) > (loc.updatedAt || 0)) {
              map[remoteItem.docId] = Object.assign({}, loc || {}, remoteItem);
            }
          });
        }
      } catch (e) {}
    }

    // Also include metadata entries from gat_scanned_docs if any were scanned before Vault was added
    try {
      const legacyScans = JSON.parse(localStorage.getItem("gat_scanned_docs") || "[]");
      if (Array.isArray(legacyScans)) {
        legacyScans.forEach(function(sc, idx) {
          if (!sc) return;
          const lid = (sc.ownerParty || "me") + "_" + (sc.docType || ("scan_" + idx));
          if (!map[lid]) {
            map[lid] = {
              docId: lid,
              slotKey: sc.docType || "doc",
              ownerParty: sc.ownerParty || "me",
              docType: sc.docType || "certificate",
              docTitle: sc.docTitle || sc.docType || "Scanned Document",
              pageCount: 1,
              hasApostille: sc.hasApostille !== false,
              hasSefach: Boolean(sc.hasSefach || sc.israeliAddrHe),
              isLongForm: sc.isLongFormBothParents !== false,
              expiryDateIso: sc.expiryDateIso || "",
              updatedAt: sc.ts ? new Date(sc.ts).getTime() : Date.now(),
              metadataOnly: true
            };
          }
        });
      }
    } catch (e) {}

    return Object.values(map).sort(function(a, b) {
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });
  };

  async function ensureVaultDocPagesLoaded(docId) {
    const loc = await idbGetDoc(docId);
    if (loc && Array.isArray(loc.pages) && loc.pages.length > 0) {
      return loc;
    }
    const uid = getCurrentUid();
    if (uid && uid !== "anon") {
      try {
        const res = await fetch(getApiUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "get_uploaded_doc", uid: uid, docId: docId })
        });
        const data = await res.json();
        if (data && data.ok && Array.isArray(data.pages) && data.pages.length > 0) {
          const fullRec = Object.assign({}, data.meta || {}, { docId: docId, pages: data.pages });
          await idbPutDoc(fullRec);
          return fullRec;
        }
      } catch (e) {}
    }
    return loc;
  }

  window.viewGatVaultDoc = async function(docId) {
    const rec = await ensureVaultDocPagesLoaded(docId);
    if (!rec || !Array.isArray(rec.pages) || rec.pages.length === 0) {
      alert("This document's fields were extracted earlier before file storage was active. Tap '➕ Add Page' to attach the image/PDF file to your vault.");
      return;
    }
    let viewer = document.getElementById("gat-vault-lightbox");
    if (viewer) viewer.remove();
    viewer = document.createElement("div");
    viewer.id = "gat-vault-lightbox";
    viewer.style.cssText = "position:fixed;inset:0;z-index:100005;background:rgba(8,37,72,0.92);display:flex;flex-direction:column;align-items:center;padding:16px;overflow-y:auto;";
    const pagesHtml = rec.pages.map(function(pg, idx) {
      const mime = pg.mimeType || "image/jpeg";
      const src = "data:" + mime + ";base64," + pg.base64Data;
      if (mime === "application/pdf") {
        return '<div style="width:100%;max-width:680px;background:#fff;border-radius:12px;padding:14px;margin-bottom:14px;text-align:center;">' +
          '<div style="font-weight:900;color:#082548;margin-bottom:8px;">📄 Page ' + (idx + 1) + ' (PDF)</div>' +
          '<a href="' + src + '" download="' + (rec.docTitle || 'document').replace(/[^a-zA-Z0-9_-]/g, '_') + '_p' + (idx + 1) + '.pdf" style="display:inline-block;background:#0284c7;color:#fff;padding:10px 18px;border-radius:10px;font-weight:900;text-decoration:none;">⬇️ Download PDF</a>' +
        '</div>';
      }
      return '<div style="width:100%;max-width:680px;background:#0f172a;border:1.5px solid #334155;border-radius:14px;padding:10px;margin-bottom:14px;text-align:center;">' +
        '<div style="font-size:0.78rem;font-weight:800;color:#38bdf8;margin-bottom:6px;">Page ' + (idx + 1) + ' of ' + rec.pages.length + ' — ' + (rec.docTitle || '') + '</div>' +
        '<img src="' + src + '" alt="Document Page ' + (idx + 1) + '" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;" />' +
      '</div>';
    }).join("");

    viewer.innerHTML =
      '<div style="width:100%;max-width:680px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;color:#fff;">' +
        '<div style="font-weight:900;font-size:1rem;">📂 ' + (rec.docTitle || "Document Preview") + ' (' + rec.pages.length + 'p)</div>' +
        '<button type="button" onclick="document.getElementById(\'gat-vault-lightbox\').remove()" style="background:#ef4444;color:#fff;border:none;border-radius:999px;padding:6px 14px;font-weight:900;cursor:pointer;">✕ Close</button>' +
      '</div>' +
      pagesHtml;
    document.body.appendChild(viewer);
  };

  window.downloadGatVaultDoc = async function(docId) {
    const rec = await ensureVaultDocPagesLoaded(docId);
    if (!rec || !Array.isArray(rec.pages) || rec.pages.length === 0) {
      alert("Tap '➕ Add Page' to attach the image/PDF file first.");
      return;
    }
    rec.pages.forEach(function(pg, idx) {
      const mime = pg.mimeType || "image/jpeg";
      const ext = mime === "application/pdf" ? "pdf" : "jpg";
      const a = document.createElement("a");
      a.href = "data:" + mime + ";base64," + pg.base64Data;
      const safeName = String(rec.docTitle || rec.docId || "gat_document").replace(/[^a-zA-Z0-9_\u0590-\u05FF-]/g, "_");
      a.download = safeName + (rec.pages.length > 1 ? ("_page" + (idx + 1)) : "") + "." + ext;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  window.deleteGatVaultDoc = async function(docId) {
    if (!confirm("Delete this document from your vault?")) return;
    await idbDeleteDoc(docId);
    const uid = getCurrentUid();
    if (uid && uid !== "anon") {
      try {
        await fetch(getApiUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "delete_uploaded_doc", uid: uid, docId: docId })
        });
      } catch (e) {}
    }
    window.renderGatProfileVaultList();
  };

  window.triggerGatVaultUpload = function(existingDocId, appendPages) {
    let inp = document.getElementById("gat-profile-vault-file-inp");
    if (!inp) {
      inp = document.createElement("input");
      inp.type = "file";
      inp.id = "gat-profile-vault-file-inp";
      inp.accept = "image/*,.pdf";
      inp.multiple = true;
      inp.style.display = "none";
      document.body.appendChild(inp);
    }
    inp.onchange = async function() {
      if (!inp.files || !inp.files.length) return;
      const listBox = document.getElementById("gat-prof-docs-list");
      if (listBox) {
        listBox.innerHTML = '<div style="padding:14px;background:#f0f9ff;border:1.5px solid #0284c7;border-radius:10px;text-align:center;font-weight:800;color:#0369a1;">⏳ Uploading, scanning & syncing to your Cloud Vault...</div>';
      }
      try {
        const filesArr = [];
        for (let i = 0; i < Math.min(inp.files.length, 6); i++) {
          const f = inp.files[i];
          if (typeof window.fileToCompressedBase64 === "function") {
            filesArr.push(await window.fileToCompressedBase64(f));
          } else {
            const b64 = await new Promise(function(res, rej) {
              const r = new FileReader();
              r.onload = function() { res(String(r.result).split(",")[1] || ""); };
              r.onerror = rej;
              r.readAsDataURL(f);
            });
            filesArr.push({ mimeType: f.type || "image/jpeg", base64Data: b64 });
          }
        }
        if (existingDocId && appendPages) {
          await window.saveDocToGatVault({
            docId: existingDocId,
            files: filesArr,
            appendPages: true
          });
        } else {
          const primary = filesArr[0];
          const uid = getCurrentUid();
          const resp = await fetch(getApiUrl(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "audit_and_autofill",
              mimeType: primary.mimeType,
              base64Data: primary.base64Data,
              files: filesArr,
              uid: uid,
              lang: curLang()
            })
          });
          const data = await resp.json();
          const r = (data && data.result) || {};
          await window.saveDocToGatVault({
            docId: (data && data.savedDocId) || ("me_" + (r.doc_type || "doc") + "_" + Date.now()),
            slotKey: r.doc_type || "doc",
            ownerParty: "me",
            docType: r.doc_type || "certificate",
            docTitle: r.doc_title_detected || r.doc_type || inp.files[0].name || "Uploaded Document",
            issuingCountry: r.issuing_country || "",
            hasApostille: r.has_apostille_visible !== false,
            hasSefach: Boolean(r.has_full_sefach_visible || r.israeli_address_he),
            isLongForm: r.is_long_form_both_parents !== false,
            expiryDateIso: r.expiry_date_iso || "",
            files: filesArr,
            alreadySavedOnServer: Boolean(data && data.savedDocId)
          });
        }
      } catch (e) {
        console.warn("Vault upload error:", e);
      }
      inp.value = "";
      window.renderGatProfileVaultList();
    };
    inp.click();
  };

  window.renderGatProfileVaultList = async function() {
    const listBox = document.getElementById("gat-prof-docs-list");
    if (!listBox) return;
    const l = curLang();
    const t = SHELL_I18N[l] || SHELL_I18N.en;
    const docs = await window.fetchMergedVaultDocsList();
    if (!docs.length) {
      listBox.innerHTML = '<div style="background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:11px;padding:13px;font-size:0.8rem;color:#475569;font-weight:700;text-align:center;line-height:1.45;">' + t.noDocsYet + '</div>';
      return;
    }
    listBox.innerHTML = docs.map(function(d) {
      const isPartner = d.ownerParty === "partner";
      const ownerBadge = isPartner ? t.ownerPartner : t.ownerMe;
      const statusPills = [];
      statusPills.push('<span style="background:#e0f2fe;color:#0369a1;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;">' + (d.pageCount || 1) + 'p</span>');
      if (/birth|marriage|police|single/i.test(String(d.docType))) {
        if (d.hasApostille === false) {
          statusPills.push('<span style="background:#fef2f2;color:#b91c1c;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;">⚠️ Missing Apostille</span>');
        } else {
          statusPills.push('<span style="background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;">✅ Apostille OK</span>');
        }
      }
      if (/teudat|zehut|israeli_id|tz/i.test(String(d.docType))) {
        if (!d.hasSefach) {
          statusPills.push('<span style="background:#fffbeb;color:#b45309;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;">⚠️ Add Unfolded Sefach</span>');
        } else {
          statusPills.push('<span style="background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:999px;font-size:0.68rem;font-weight:800;">✅ Full Sefach</span>');
        }
      }
      return '<div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:11px 12px;margin-bottom:8px;box-shadow:0 2px 6px rgba(8,37,72,0.04);">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">' +
          '<div>' +
            '<div style="font-weight:900;font-size:0.86rem;color:#082548;">📄 ' + (d.docTitle || d.docType || "Document") + '</div>' +
            '<div style="font-size:0.72rem;color:#64748b;font-weight:700;">👤 ' + ownerBadge + (d.expiryDateIso ? (' • Exp: ' + d.expiryDateIso) : '') + '</div>' +
          '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:4px;">' + statusPills.join("") + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">' +
          '<button type="button" onclick="window.viewGatVaultDoc(\'' + d.docId + '\')" style="flex:1;background:#082548;color:#fff;border:none;border-radius:8px;padding:7px 10px;font-size:0.76rem;font-weight:800;cursor:pointer;">' + t.btnView + '</button>' +
          '<button type="button" onclick="window.downloadGatVaultDoc(\'' + d.docId + '\')" style="flex:1;background:#0284c7;color:#fff;border:none;border-radius:8px;padding:7px 10px;font-size:0.76rem;font-weight:800;cursor:pointer;">' + t.btnDownload + '</button>' +
          '<button type="button" onclick="window.triggerGatVaultUpload(\'' + d.docId + '\', true)" style="background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:8px;padding:7px 9px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + t.btnAddPage + '</button>' +
          '<button type="button" onclick="window.deleteGatVaultDoc(\'' + d.docId + '\')" style="background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:8px;padding:7px 9px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + t.btnDelete + '</button>' +
        '</div>' +
      '</div>';
    }).join("");
  };

  // ==========================================================================
  // OPEN PROFILE, CLOUD DOCUMENT VAULT & SETTINGS MODAL
  // ==========================================================================
  window.openGatProfileModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const appDr = document.getElementById("app-drawer");
    if (appDr) appDr.classList.remove("open");

    let modal = document.getElementById("gat-profile-modal");
    if (modal) modal.remove();

    const l = curLang();
    const t = SHELL_I18N[l] || SHELL_I18N.en;
    const isRtl = l === "he";
    const synced = isUserCloudSynced();
    const passCode = localStorage.getItem("gat_permanent_pass_code") || "—";
    const tierKey = localStorage.getItem("gat_tier") || (localStorage.getItem("gat_pro_unlocked") === "1" ? "pro" : "free");
    const tierLabel = tierKey === "free" ? "Free Preview Mode" : tierKey.toUpperCase().replace(/_/g, " ");

    const pibaForms = [
      ["ash1", "טופס אש/1 (Va'adat Charigim)"],
      ["ash3", "טופס אש/3 (Visa Extension / A/2)"],
      ["ash6", "טופס אש/6 (Spousal Status 6p)"],
      ["ash456", "טופס אש/456 (In-Israel Aliyah)"],
      ["mr14a", "טופס מר/14א׳ (First Teudat Zehut)"],
      ["mr14b", "טופס מר/14ב׳ (Passport Declaration)"],
      ["nespach_alef", "נספח א׳ (13-Clause Affidavit)"],
      ["sec_cv", "קורות חיים (11p Security CV)"]
    ];

    const formsGridHtml = pibaForms.map(function(pf) {
      return '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove(); if(window.location.pathname.indexOf(\'/app\')===0 && typeof window.openMod===\'function\'){ window.openMod(\'hebrew-engine\'); if(typeof window.selectPibaForm===\'function\') window.selectPibaForm(\'' + pf[0] + '\'); } else { window.location.href=\'/app/?module=hebrew-engine&form=' + pf[0] + '\'; }" style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:9px;padding:8px 9px;font-size:0.75rem;font-weight:800;color:#082548;text-align:start;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:4px;">' +
        '<span>' + pf[1] + '</span><span style="color:#0284c7;">→</span>' +
      '</button>';
    }).join("");

    const langBtnsHtml = ["en", "he", "fr", "es", "de", "ru"].map(function(lg) {
      const active = lg === l;
      return '<button type="button" onclick="if(typeof window.selectLangDirect===\'function\') window.selectLangDirect(\'' + lg + '\'); else if(typeof window.setLang===\'function\') window.setLang(\'' + lg + '\'); setTimeout(window.openGatProfileModal, 80);" style="padding:7px 10px;border-radius:8px;border:1.5px solid ' + (active ? '#0284c7' : '#cbd5e1') + ';background:' + (active ? '#0284c7' : '#fff') + ';color:' + (active ? '#fff' : '#082548') + ';font-weight:900;font-size:0.78rem;cursor:pointer;">' + lg.toUpperCase() + '</button>';
    }).join("");

    modal = document.createElement("div");
    modal.id = "gat-profile-modal";
    modal.dir = isRtl ? "rtl" : "ltr";
    modal.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(8,37,72,0.72);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;padding:0;";
    modal.onclick = function(ev) { if (ev.target === modal) modal.remove(); };

    modal.innerHTML =
      '<div style="width:100%;max-width:540px;max-height:90dvh;background:#ffffff;border-radius:22px 22px 0 0;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -12px 40px rgba(8,37,72,0.35);">' +
        '<div style="background:linear-gradient(135deg,#082548 0%,#0b3b59 100%);color:#ffffff;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0;">' +
          '<div>' +
            '<div style="font-size:1.02rem;font-weight:900;">' + t.profModalTitle + '</div>' +
            '<div onclick="document.getElementById(\'gat-profile-modal\').remove(); if(typeof window.openDeviceSyncModal===\'function\') window.openDeviceSyncModal(); else window.location.href=\'/app/?sync=1\';" style="font-size:0.75rem;font-weight:800;color:' + (synced ? '#4ade80' : '#fbbf24') + ';cursor:pointer;margin-top:2px;">' + (synced ? t.statusSynced : t.statusGuest) + '</div>' +
          '</div>' +
          '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove()" style="background:rgba(255,255,255,0.14);color:#ffffff;border:none;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;cursor:pointer;">✕</button>' +
        '</div>' +
        '<div style="padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:16px;-webkit-overflow-scrolling:touch;">' +
          // Section 1: Uploaded Documents Vault
          '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:13px;">' +
            '<div style="font-weight:900;font-size:0.92rem;color:#082548;margin-bottom:4px;">' + t.secDocs + '</div>' +
            '<div style="font-size:0.76rem;color:#475569;margin-bottom:10px;line-height:1.4;">' + t.secDocsSub + '</div>' +
            '<div id="gat-prof-docs-list"></div>' +
            '<button type="button" onclick="window.triggerGatVaultUpload(null, false)" style="margin-top:8px;width:100%;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#ffffff;border:none;border-radius:10px;padding:10px 14px;font-size:0.83rem;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(2,132,199,0.25);">' + t.uploadNewBtn + '</button>' +
          '</div>' +

          // Section 2: 8 Stamped PIBA Forms
          '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:13px;">' +
            '<div style="font-weight:900;font-size:0.92rem;color:#082548;margin-bottom:4px;">' + t.secForms + '</div>' +
            '<div style="font-size:0.76rem;color:#475569;margin-bottom:9px;">' + t.secFormsSub + '</div>' +
            '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:9px;">' + formsGridHtml + '</div>' +
            '<a href="/app/?module=hebrew-engine" style="display:block;text-align:center;background:#082548;color:#ffffff;text-decoration:none;padding:10px 14px;border-radius:10px;font-size:0.82rem;font-weight:900;">' + t.openFormsBtn + '</a>' +
          '</div>' +

          // Section 3: Account, Pass Tier & Sync
          '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:13px;">' +
            '<div style="font-weight:900;font-size:0.92rem;color:#082548;margin-bottom:8px;">' + t.secAccount + '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:8px 11px;margin-bottom:7px;font-size:0.8rem;">' +
              '<span style="color:#475569;font-weight:700;">' + t.tierLbl + '</span>' +
              '<span style="font-weight:900;color:#059669;">' + tierLabel + '</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:8px 11px;margin-bottom:10px;font-size:0.8rem;">' +
              '<span style="color:#475569;font-weight:700;">' + t.passCodeLbl + '</span>' +
              '<span style="font-family:monospace;font-weight:900;font-size:0.9rem;color:#082548;letter-spacing:0.08em;">' + passCode + '</span>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr;gap:7px;">' +
              '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove(); if(typeof window.openDeviceSyncModal===\'function\') window.openDeviceSyncModal(); else window.location.href=\'/app/?sync=1\';" style="width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#ffffff;border:none;border-radius:10px;padding:10px 14px;font-size:0.83rem;font-weight:900;cursor:pointer;">' + t.syncBtn + '</button>' +
              '<a href="' + (l === "en" ? "/pricing/" : ("/" + l + "/pricing/")) + '" style="display:block;text-align:center;background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;text-decoration:none;border-radius:10px;padding:10px 14px;font-size:0.83rem;font-weight:900;">' + t.upgradeBtn + '</a>' +
            '</div>' +
          '</div>' +

          // Section 4: Settings & Guided Navigator (No redundant language bar or direct phone links)
          '<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:13px;">' +
            '<div style="font-weight:900;font-size:0.92rem;color:#082548;margin-bottom:8px;">⚙️ 4. Settings & Smart Navigator</div>' +
            '<div style="display:grid;grid-template-columns:1fr;gap:7px;">' +
              '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove(); if(typeof window.toggleGatHelpdesk===\'function\') window.toggleGatHelpdesk(true);" style="width:100%;background:#f0f9ff;color:#0369a1;border:1.5px solid #7dd3fc;border-radius:9px;padding:9px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">✨ Ask 24/7 Smart Site Navigator & Helpdesk</button>' +
              '<button type="button" onclick="if(confirm(\'' + t.resetConfirm.replace(/'/g, "\\'") + '\')){ if(typeof window.resetAllFormsAsNewVisitor===\'function\') window.resetAllFormsAsNewVisitor(true); else { localStorage.removeItem(\'gat_forms_draft_v1\'); window.location.reload(); } }" style="width:100%;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:9px;padding:8px 12px;font-size:0.76rem;font-weight:800;cursor:pointer;">' + t.resetDraftsBtn + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);
    window.renderGatProfileVaultList();
  };

  // ==========================================================================
  // TOP APPBAR `👤 PROFILE` ICON WITH LIVE `🟢 / 🟠` BADGE DOT
  // ==========================================================================
  window.refreshGatProfileBadge = function() {
    const dot = document.getElementById("appbar-profile-dot");
    if (!dot) return;
    const synced = isUserCloudSynced();
    dot.style.background = synced ? "#22c55e" : "#f59e0b";
    dot.title = synced ? "Cloud Synced" : "Guest Device";
  };

  function ensureTopAppbarProfileBtn() {
    const shareBtn = document.getElementById("appbar-share-btn") || document.querySelector(".appbar-share-btn");
    const rightContainer = (shareBtn && shareBtn.parentElement) || document.querySelector(".app-header > div:last-child, header.topbar > div:last-child");
    if (!rightContainer) return;

    rightContainer.style.display = "flex";
    rightContainer.style.alignItems = "center";
    rightContainer.style.gap = "5px";

    let profBtn = document.getElementById("appbar-profile-btn");
    if (!profBtn) {
      profBtn = document.createElement("button");
      profBtn.type = "button";
      profBtn.id = "appbar-profile-btn";
      profBtn.className = "appbar-profile-btn";
      profBtn.setAttribute("aria-label", "Profile, Uploaded Docs & Settings");
      profBtn.style.cssText = "position:relative;background:transparent !important;border:none !important;box-shadow:none !important;color:#ffffff !important;width:36px;height:36px;padding:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;";
      profBtn.innerHTML =
        '<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:#ffffff;stroke-width:2.1;fill:none;stroke-linecap:round;stroke-linejoin:round;">' +
          '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>' +
          '<circle cx="12" cy="7" r="4"></circle>' +
        '</svg>' +
        '<span id="appbar-profile-dot" style="position:absolute;top:4px;right:4px;width:9px;height:9px;border-radius:50%;background:#f59e0b;border:1.5px solid #082548;"></span>';
      profBtn.onclick = function(e) { window.openGatProfileModal(e); };
      if (shareBtn) {
        rightContainer.insertBefore(profBtn, shareBtn);
      } else {
        rightContainer.insertBefore(profBtn, rightContainer.firstChild);
      }
    }
    window.refreshGatProfileBadge();
  }

  // ==========================================================================
  // UNIFIED 18-ITEM HAMBURGER MENU (`#app-drawer`) + RETIRE LEFT `❯` PULL-TAB
  // ==========================================================================
  window.gatNavAction = function(type, val) {
    const appDr = document.getElementById("app-drawer");
    if (appDr) appDr.classList.remove("open");
    const leftDr = document.getElementById("left-drawer");
    if (leftDr) leftDr.classList.remove("open");

    const l = curLang();
    const homeUrl = l === "en" ? "/" : ("/" + l + "/");

    if (type === "tab") {
      const tabIdx = Number(val) || 0;
      if (typeof window.switchTab === "function" && document.getElementById("view-" + tabIdx)) {
        window.switchTab(tabIdx);
      } else {
        window.location.href = homeUrl + "?tab=" + tabIdx;
      }
      return;
    }
    if (type === "term") {
      if (typeof window.openTerm === "function" && document.getElementById("obstacle-sheet")) {
        window.openTerm(val);
      } else {
        window.location.href = homeUrl + "?term=" + encodeURIComponent(val);
      }
      return;
    }
    if (type === "obs") {
      if (typeof window.openObstacle === "function" && document.getElementById("obstacle-sheet")) {
        window.openObstacle(Number(val) || 0);
      } else {
        window.location.href = homeUrl + "?obs=" + encodeURIComponent(val);
      }
      return;
    }
    if (type === "mod") {
      if (window.location.pathname.indexOf("/app") === 0 && typeof window.openMod === "function") {
        window.openMod(val);
      } else {
        window.location.href = "/app/?module=" + encodeURIComponent(val);
      }
      return;
    }
  };

  window.renderUnifiedHamburgerDrawer = function() {
    // 1. Retire the duplicate left-edge `❯` pull-tab and left drawer
    const leftHandle = document.getElementById("left-edge-handle");
    if (leftHandle) leftHandle.style.setProperty("display", "none", "important");
    const leftDr = document.getElementById("left-drawer");
    if (leftDr) leftDr.style.setProperty("display", "none", "important");

    // 2. Ensure `#app-drawer` exists on every page
    let appDr = document.getElementById("app-drawer");
    if (!appDr) {
      appDr = document.createElement("div");
      appDr.id = "app-drawer";
      appDr.className = "drawer-backdrop";
      appDr.onclick = function(e) { if (e.target === appDr) window.toggleDrawer(false); };
      appDr.innerHTML = '<aside class="drawer-panel"></aside>';
      document.body.appendChild(appDr);
    }
    let panel = appDr.querySelector(".drawer-panel, nav.drawer-panel, aside");
    if (!panel) {
      panel = document.createElement("aside");
      panel.className = "drawer-panel";
      appDr.appendChild(panel);
    }

    const l = curLang();
    const t = SHELL_I18N[l] || SHELL_I18N.en;
    const synced = isUserCloudSynced();
    const rowStyle = "display:flex;align-items:center;gap:9px;width:100%;padding:10px 11px;border:none;border-bottom:1px solid #f1f5f9;background:transparent;color:#082548;font-size:0.86rem;font-weight:800;text-align:start;cursor:pointer;border-radius:9px;text-decoration:none;";
    const secHeadStyle = "font-size:0.7rem;font-weight:900;color:#0284c7;letter-spacing:0.05em;padding:10px 8px 4px;text-transform:uppercase;";

    panel.innerHTML =
      '<div>' +
        '<div class="drawer-brand-center" style="margin:0 0 10px 0;padding:4px 10px 12px 10px;border-bottom:1.5px solid #e2e8f0;text-align:center;display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="font-size:1.22rem;font-weight:900;color:#082548;direction:ltr;">Giyur<span style="color:#03A9F4;">Aliyah</span>Track</div>' +
          '<button type="button" onclick="window.toggleDrawer(false)" style="background:#f1f5f9;color:#082548;border:none;width:30px;height:30px;border-radius:50%;font-weight:900;cursor:pointer;">✕</button>' +
        '</div>' +

        // Top 3 Action Pills: Profile & Docs Vault, Sync Devices, All 23 Services & Pricing
        '<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:10px;">' +
          '<button type="button" onclick="window.openGatProfileModal(event)" style="width:100%;background:#082548;color:#ffffff;border:2px solid ' + (synced ? '#22c55e' : '#f59e0b') + ';padding:11px 13px;border-radius:11px;font-size:0.86rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
            '<span>' + t.hamProfile + '</span>' +
            '<span style="font-size:0.75rem;">' + (synced ? '🟢' : '🟠') + ' →</span>' +
          '</button>' +
          '<button type="button" onclick="window.toggleDrawer(false); if(typeof window.openDeviceSyncModal===\'function\') window.openDeviceSyncModal(); else window.location.href=\'/app/?sync=1\';" style="width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#ffffff;border:2px solid #4FC3F7;padding:11px 13px;border-radius:11px;font-size:0.86rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">' +
            '<span>' + t.hamSync + '</span>' +
          '</button>' +
          '<a href="' + (l === "en" ? "/pricing/" : ("/" + l + "/pricing/")) + '" style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:11px 13px;border-radius:11px;background:linear-gradient(135deg,#0284c7,#2563eb);color:#ffffff !important;font-weight:900;font-size:0.86rem;text-decoration:none;">' +
            '<span>' + t.hamPricing + '</span><span>→</span>' +
          '</a>' +
        '</div>' +

        // Section 1: Interactive Command Center (/app/)
        '<div style="' + secHeadStyle + '">' + t.hamSec1 + '</div>' +
        '<div class="drawer-list" style="display:flex;flex-direction:column;gap:1px;">' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'tab\', 0)">' + t.hamHome + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'mod\', \'hebrew-engine\')">' + t.hamForms + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'mod\', \'beit-din-150\')">' + t.hamBd + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'mod\', \'couples-sync\')">' + t.hamCouples + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'mod\', \'songs-prayers\')">' + t.hamSongs + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'mod\', \'rabbi-letters\')">' + t.hamLetters + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'tab\', 4)">' + t.hamTracker + '</button>' +
        '</div>' +

        // Section 2: Vetted Concierge & Partner Shields
        '<div style="' + secHeadStyle + '">' + t.hamSec2 + '</div>' +
        '<div class="drawer-list" style="display:flex;flex-direction:column;gap:1px;">' +
          '<a href="' + (l === "en" ? "/concierge-booking/" : ("/" + l + "/concierge-booking/")) + '" style="' + rowStyle + '">' + t.hamVetted + '</a>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'term\', \'fx_shield\')">' + t.hamFx + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'term\', \'bridge_health\')">' + t.hamHealth + '</button>' +
        '</div>' +

        // Section 3: Statutory Playbooks & Survival Guides
        '<div style="' + secHeadStyle + '">' + t.hamSec3 + '</div>' +
        '<div class="drawer-list" style="display:flex;flex-direction:column;gap:1px;">' +
          '<button type="button" style="' + rowStyle + ';color:#b91c1c;" onclick="window.gatNavAction(\'term\', \'go_bag\')">' + t.hamGoBag + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'term\', \'five_docs\')">' + t.hamFiveDocs + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'term\', \'vaadat_charigim\')">' + t.hamVc + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'obs\', 8)">' + t.hamSurvival + '</button>' +
          '<button type="button" style="' + rowStyle + '" onclick="window.gatNavAction(\'tab\', 3)">' + t.hamAbout + '</button>' +
        '</div>' +
      '</div>' +

      '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;display:flex;flex-direction:column;gap:7px;">' +
        '<button type="button" onclick="window.toggleDrawer(false); if(typeof window.shareExactCurrentPage===\'function\') window.shareExactCurrentPage(event);" style="width:100%;background:#f0f9ff;color:#0369a1;border:1.5px solid #bae6fd;border-radius:10px;padding:9px 12px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + t.hamShare + '</button>' +
        '<button type="button" class="btn-install-navy" onclick="alert(\'To install GiyurAliyahTrack on your phone: Tap Share in Safari/Chrome and select Add to Home Screen.\')" style="width:100%;background:#082548;color:#fff;border:none;border-radius:10px;padding:10px 12px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + t.hamInstall + '</button>' +
      '</div>';
  };

  window.toggleDrawer = function(forceOpen) {
    window.renderUnifiedHamburgerDrawer();
    const drw = document.getElementById("app-drawer");
    if (!drw) return false;
    const next = typeof forceOpen === "boolean" ? forceOpen : !drw.classList.contains("open");
    drw.classList.toggle("open", next);
    return false;
  };
  window.toggleLeftDrawer = window.toggleDrawer;

  // ==========================================================================
  // UNIFIED 5-TAB BOTTOM NAVIGATION BAR ACROSS /APP/, /PRICING/, /CONCIERGE-BOOKING/
  // ==========================================================================
  function ensureUniversalBottomNav() {
    const l = curLang();
    const t = SHELL_I18N[l] || SHELL_I18N.en;
    let bNav = document.querySelector("nav.bottom-nav");

    if (!document.getElementById("gat-universal-bottom-nav-css")) {
      const st = document.createElement("style");
      st.id = "gat-universal-bottom-nav-css";
      st.textContent = `
        #left-edge-handle, #left-drawer { display: none !important; }
        nav.bottom-nav,
        .bottom-nav,
        nav.gat-injected-bottom-nav {
          position: fixed !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
          padding: 6px 8px calc(6px + env(safe-area-inset-bottom, 0px)) !important;
          background: #082548 !important;
          background-color: #082548 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.14) !important;
          display: flex !important;
          justify-content: space-around !important;
          align-items: center !important;
          z-index: 9500 !important;
          box-shadow: 0 -6px 24px rgba(4, 18, 38, 0.45), 0 80px 0 80px #082548 !important;
          transform: translate3d(0, 0, 0) !important;
          -webkit-transform: translate3d(0, 0, 0) !important;
        }
        nav.bottom-nav .nav-tab,
        .bottom-nav .nav-tab,
        nav.gat-injected-bottom-nav .nav-tab {
          flex: 1 !important;
          background: transparent !important;
          border: none !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 4px !important;
          padding: 4px 2px !important;
          color: rgba(255, 255, 255, 0.72) !important;
          font-size: 0.71rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
        }
        nav.bottom-nav .nav-tab.active,
        .bottom-nav .nav-tab.active,
        nav.gat-injected-bottom-nav .nav-tab.active {
          color: #38bdf8 !important;
          font-weight: 800 !important;
        }
        nav.bottom-nav .nt-pill,
        .bottom-nav .nt-pill,
        nav.gat-injected-bottom-nav .nt-pill {
          width: 56px !important;
          height: 34px !important;
          border-radius: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
        }
        nav.bottom-nav .nav-tab.active .nt-pill,
        .bottom-nav .nav-tab.active .nt-pill,
        nav.gat-injected-bottom-nav .nav-tab.active .nt-pill {
          background: #ffffff !important;
          background-color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
        }
        nav.bottom-nav .nt-pill svg,
        .bottom-nav .nt-pill svg,
        nav.gat-injected-bottom-nav .nt-pill svg {
          width: 20px !important;
          height: 20px !important;
          fill: rgba(255, 255, 255, 0.78) !important;
        }
        nav.bottom-nav .nav-tab.active .nt-pill svg,
        .bottom-nav .nav-tab.active .nt-pill svg,
        nav.gat-injected-bottom-nav .nav-tab.active .nt-pill svg {
          fill: #0288E8 !important;
        }
        body.gat-has-injected-bottom-nav {
          padding-bottom: calc(82px + env(safe-area-inset-bottom, 0px)) !important;
        }
        body.gat-has-injected-bottom-nav #gat-hd-fab {
          bottom: calc(76px + env(safe-area-inset-bottom, 0px)) !important;
        }
      `;
      document.head.appendChild(st);
    }

    if (!bNav) {
      bNav = document.createElement("nav");
      bNav.className = "bottom-nav gat-injected-bottom-nav";
      bNav.setAttribute("aria-label", "Primary App Navigation");
      document.body.classList.add("gat-has-injected-bottom-nav");
      const p = window.location.pathname;
      const isSavings = p.indexOf("/pricing") === 0;
      const isRabbi = p.indexOf("/concierge") === 0;
      const isApp = p.indexOf("/app") === 0;

      bNav.innerHTML =
        '<button type="button" class="nav-tab" onclick="window.gatNavAction(\'tab\', 0)">' +
          '<div class="nt-pill"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg></div>' +
          '<span class="nt-label" data-gat-bnav="0">' + t.nav0 + '</span>' +
        '</button>' +
        '<button type="button" class="nav-tab" onclick="window.gatNavAction(\'tab\', 1)">' +
          '<div class="nt-pill"><svg viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="2"/><rect x="2" y="6" width="3" height="12" rx="1"/><rect x="19" y="6" width="3" height="12" rx="1"/></svg></div>' +
          '<span class="nt-label" data-gat-bnav="1">' + t.nav1 + '</span>' +
        '</button>' +
        '<button type="button" class="nav-tab' + (isSavings ? ' active' : '') + '" onclick="if(window.location.pathname.indexOf(\'/pricing\')!==-1){window.scrollTo({top:0,behavior:\'smooth\'});}else{window.gatNavAction(\'tab\', 2);}">' +
          '<div class="nt-pill"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div>' +
          '<span class="nt-label" data-gat-bnav="2">' + t.nav2 + '</span>' +
        '</button>' +
        '<button type="button" class="nav-tab' + (isRabbi ? ' active' : '') + '" onclick="window.gatNavAction(\'tab\', 3)">' +
          '<div class="nt-pill"><svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>' +
          '<span class="nt-label" data-gat-bnav="3">' + t.nav3 + '</span>' +
        '</button>' +
        '<button type="button" class="nav-tab' + (isApp ? ' active' : '') + '" onclick="window.gatNavAction(\'tab\', 4)">' +
          '<div class="nt-pill"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 5.5l1.4 2.4h2.8l-1.4 2.4 1.4 2.4h-2.8L12 18.1l-1.4-2.4H7.8l1.4-2.4-1.4-2.4h2.8L12 8.5z"/></svg></div>' +
          '<span class="nt-label" data-gat-bnav="4">' + t.nav4 + '</span>' +
        '</button>';
      document.body.appendChild(bNav);
    } else {
      [0, 1, 2, 3, 4].forEach(function(idx) {
        const sp = bNav.querySelector('[data-gat-bnav="' + idx + '"]');
        if (sp) sp.textContent = t["nav" + idx];
      });
    }
  }

  function handleUrlQueryDeepLinks() {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabP = params.get("tab");
      const termP = params.get("term");
      const obsP = params.get("obs");
      if (tabP !== null && typeof window.switchTab === "function") {
        setTimeout(function() { window.switchTab(Number(tabP) || 0); }, 120);
      }
      if (termP && typeof window.openTerm === "function") {
        setTimeout(function() { window.openTerm(termP); }, 180);
      }
      if (obsP !== null && typeof window.openObstacle === "function") {
        setTimeout(function() { window.openObstacle(Number(obsP) || 0); }, 180);
      }
    } catch (e) {}
  }

  function bootUnifiedShell() {
    ensureTopAppbarProfileBtn();
    window.renderUnifiedHamburgerDrawer();
    ensureUniversalBottomNav();
    handleUrlQueryDeepLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootUnifiedShell);
  } else {
    bootUnifiedShell();
  }
  setTimeout(bootUnifiedShell, 350);
  setTimeout(bootUnifiedShell, 1200);
})();


// ============================================================================
// SMART 22-INTENT PRE-AI SITE NAVIGATOR, AUTO-ROUTER & "CRY FOR HELP" CATCHER
// ============================================================================
(function initSmartPreAiNavigatorAndCryCatcher() {
  function getLangCode() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (["en", "he", "fr", "es", "de", "ru"].includes(pathLang)) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return ["en", "he", "fr", "es", "de", "ru"].includes(l) ? l : "en";
  }

  function getApiEndpoint() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  // 1. Remove direct WhatsApp icon from Helpdesk header so users go through Pre-AI first
  function hideDirectWaHeaderBtn() {
    const waLink = document.getElementById("gat-hd-wa");
    if (waLink) waLink.style.setProperty("display", "none", "important");
  }
  setInterval(hideDirectWaHeaderBtn, 800);

  // 2. Universal Cross-Page & Same-Page Navigator (Popups, Tabs, Forms, Modules, Pages)
  window.gatExecuteSmartNav = function(targetSpec, shouldMinimizeDrawer) {
    if (!targetSpec) return;
    const parts = String(targetSpec).split("|");
    const kind = (parts[0] || "").trim();
    const arg = (parts[1] || "").trim();
    const l = getLangCode();
    const homeBase = l === "en" ? "/" : ("/" + l + "/");
    const isOnHomeHub = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
    const isOnAppPage = window.location.pathname.indexOf("/app") === 0 && typeof window.openMod === "function";

    if (shouldMinimizeDrawer && typeof window.toggleGatHelpdesk === "function") {
      window.toggleGatHelpdesk(false, true);
    }

    if (kind === "obs") {
      if (isOnHomeHub && typeof window.openObstacle === "function") {
        window.openObstacle(Number(arg) || 0);
      } else {
        window.location.href = homeBase + "?obs=" + encodeURIComponent(arg || "0");
      }
      return;
    }
    if (kind === "term") {
      if (isOnHomeHub && typeof window.openTerm === "function") {
        window.openTerm(arg || "go_bag");
      } else {
        window.location.href = homeBase + "?term=" + encodeURIComponent(arg || "go_bag");
      }
      return;
    }
    if (kind === "tab") {
      const tIdx = Number(arg) || 0;
      if (isOnHomeHub && typeof window.switchTab === "function") {
        window.switchTab(tIdx);
      } else {
        window.location.href = homeBase + "?tab=" + tIdx;
      }
      return;
    }
    if (kind === "profile") {
      if (typeof window.openGatProfileModal === "function") {
        window.openGatProfileModal();
      }
      return;
    }
    if (kind === "sync") {
      if (typeof window.openDeviceSyncModal === "function") {
        window.openDeviceSyncModal();
      } else {
        window.location.href = "/app/?sync=1";
      }
      return;
    }
    if (kind === "pricing") {
      const targetUrl = (l === "en" ? "/pricing/" : ("/" + l + "/pricing/")) + (arg ? ("?sku=" + encodeURIComponent(arg) + "&lang=" + l) : ("?lang=" + l));
      if (window.location.pathname.indexOf("/pricing") === 0 && !arg) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = targetUrl;
      }
      return;
    }
    if (kind === "concierge") {
      const targetUrl = (l === "en" ? "/concierge-booking/" : ("/" + l + "/concierge-booking/")) + (arg ? ("?sku=" + encodeURIComponent(arg) + "&lang=" + l) : ("?lang=" + l));
      if (window.location.pathname.indexOf("/concierge-booking") === 0 && !arg) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = targetUrl;
      }
      return;
    }

    // Otherwise `kind` is an /app/ module (`hebrew-engine`, `beit-din-150`, `couples-sync`, `songs-prayers`, `rabbi-letters`, `vetted-team`)
    let modName = kind;
    if (modName === "beit-din") modName = "beit-din-150";
    if (modName === "couples-sim") modName = "couples-sync";

    if (isOnAppPage) {
      window.openMod(modName);
      if (arg) {
        window.activePibaFormKey = arg;
        setTimeout(function() {
          if (typeof window.selectPibaForm === "function") window.selectPibaForm(arg);
          else if (typeof window.switchActivePibaForm === "function") window.switchActivePibaForm(arg);
          else {
            const btn = document.querySelector('[data-form-key="' + arg + '"], button[onclick*="\'' + arg + '\'"]');
            if (btn && typeof btn.click === "function") btn.click();
          }
        }, 80);
      }
    } else {
      window.location.href = "/app/?module=" + encodeURIComponent(modName) + (arg ? ("&form=" + encodeURIComponent(arg)) : "");
    }
  };

  // Override gatNavigateAndMinimize globally so all [[NAV:mod|form|label]] buttons & welcome cards use gatExecuteSmartNav
  window.gatNavigateAndMinimize = function(modName, formKey, shouldMinimize) {
    window.gatExecuteSmartNav((modName || "hebrew-engine") + "|" + (formKey || ""), shouldMinimize !== false);
  };

  // Check URL on load for ?module= or ?mod= and ?form= on /app/
  setTimeout(function() {
    try {
      const sp = new URLSearchParams(window.location.search);
      const mParam = sp.get("module") || sp.get("mod");
      const fParam = sp.get("form");
      if (window.location.pathname.indexOf("/app") === 0 && mParam && typeof window.openMod === "function") {
        window.openMod(mParam);
        if (fParam) {
          setTimeout(function() {
            if (typeof window.selectPibaForm === "function") window.selectPibaForm(fParam);
            else {
              const btn = document.querySelector('[data-form-key="' + fParam + '"], button[onclick*="\'' + fParam + '\'"]');
              if (btn && typeof btn.click === "function") btn.click();
            }
          }, 180);
        }
      }
    } catch (e) {}
  }, 250);

  // 3. Complete Catalog of Site Destinations & Localized Labels for Primary + Ranked Backup Links
  const NAV_LABELS = {
    "hebrew-engine|ash6": {
      en: "📄 Open Form Ash/6 Spousal Dossier Engine (6p)",
      he: "📄 פתיחת מנוע טופס אש/6 לבני זוג (6 עמ׳)",
      fr: "📄 Ouvrir le Formulaire Conjoint Ash/6 (6p)",
      es: "📄 Abrir Formulario Cónyuges Ash/6 (6p)",
      de: "📄 Ehepartner-Formular Asch/6 öffnen (6S.)",
      ru: "📄 Открыть генератор анкеты ССТ Аш/6 (6 стр.)"
    },
    "hebrew-engine|ash1": {
      en: "📄 Open Form Ash/1 (Va'adat Charigim Entry Visa)",
      he: "📄 פתיחת טופס אש/1 (ועדת חריגים)",
      fr: "📄 Ouvrir le Formulaire Ash/1 (Va'adat Charigim)",
      es: "📄 Abrir Formulario Ash/1 (Va'adat Jariguim)",
      de: "📄 Formular Asch/1 (Ausnahmeausschuss) öffnen",
      ru: "📄 Открыть анкету Аш/1 (Ваадат Харигим)"
    },
    "hebrew-engine|ash3": {
      en: "📄 Open Form Ash/3 (Visa Extension / A/2 Student)",
      he: "📄 פתיחת טופס אש/3 (הארכת אשרה / א/2)",
      fr: "📄 Ouvrir le Formulaire Ash/3 (Prolongation Visa)",
      es: "📄 Abrir Formulario Ash/3 (Prórroga de Visa)",
      de: "📄 Formular Asch/3 (Visumverlängerung) öffnen",
      ru: "📄 Открыть анкету Аш/3 (Продление визы)"
    },
    "hebrew-engine|ash456": {
      en: "📄 Open Form Ash/456 (In-Israel Aliyah / Shinui Ma'amad)",
      he: "📄 פתיחת טופס אש/456 (עלייה מתוך ישראל)",
      fr: "📄 Ouvrir le Formulaire Ash/456 (Aliyah en Israël)",
      es: "📄 Abrir Formulario Ash/456 (Aliyá en Israel)",
      de: "📄 Formular Asch/456 (In-Israel-Alija) öffnen",
      ru: "📄 Открыть анкету Аш/456 (Репатриация в Израиле)"
    },
    "hebrew-engine|mr14a": {
      en: "🪪 Open Form MR/14a (First Teudat Zehut & Sefach)",
      he: "🪪 פתיחת טופס מר/14א׳ (תעודת זהות ראשונה וספח)",
      fr: "🪪 Ouvrir le Formulaire MR/14a (Première Teudat Zehut)",
      es: "🪪 Abrir Formulario MR/14a (Primera Teudat Zehut)",
      de: "🪪 Formular MR/14a (Erste Teudat Zehut) öffnen",
      ru: "🪪 Открыть анкету МР/14а (Первый Теудат Зеут)"
    },
    "hebrew-engine|nespach_alef": {
      en: "⚖️ Open Nespach Alef (13-Clause Partner Affidavit)",
      he: "⚖️ פתיחת תצהיר נספח א׳ לבני זוג",
      fr: "⚖️ Ouvrir Nespach Alef (Affidavit 13 Clauses)",
      es: "⚖️ Abrir Nespach Alef (Declaración 13 Cláusulas)",
      de: "⚖️ Nespach Alef (13-Klausel-Affidavit) öffnen",
      ru: "⚖️ Открыть Неспах Алеф (Декларация партнёров)"
    },
    "hebrew-engine|sec_cv": {
      en: "🛡️ Open 11-Page Nativ / Security CV Auto-Filler",
      he: "🛡️ פתיחת שאלון קורות חיים (11 עמ׳)",
      fr: "🛡️ Ouvrir le CV de Sécurité Nativ (11 pages)",
      es: "🛡️ Abrir CV de Seguridad Nativ (11 páginas)",
      de: "🛡️ Sicherheits-Lebenslauf (11 Seiten) öffnen",
      ru: "🛡️ Открыть анкету безопасности Натив (11 стр.)"
    },
    "beit-din-150|": {
      en: "🕍 Open 700 Beit Din Tribunal Flashcards & Simulator",
      he: "🕍 פתיחת סימולטור 700 שאלות בית הדין",
      fr: "🕍 Ouvrir les 700 Cartes d'Examen Beit Din",
      es: "🕍 Abrir las 700 Tarjetas del Tribunal Beit Din",
      de: "🕍 700 Beit-Din-Prüfungskarten öffnen",
      ru: "🕍 Открыть 700 карточек экзамена Бейт-Дина"
    },
    "couples-sync|": {
      en: "📱 Open 300-Question 2-Phone Couples Interrogation Sync",
      he: "📱 פתיחת סימולטור 300 שאלות שימוע זוגי ב-2 טלפונים",
      fr: "📱 Ouvrir les 300 Questions Couples (Sync 2 Téléphones)",
      es: "📱 Abrir 300 Preguntas de Pareja (Sync 2 Teléfonos)",
      de: "📱 300 Paar-Fragen (2-Handy-Sync) öffnen",
      ru: "📱 Открыть 300 вопросов СТУПРО (2 телефона)"
    },
    "songs-prayers|": {
      en: "🎵 Open 56 Shabbat Songs, Prayers & Brachot Karaoke",
      he: "🎵 פתיחת 56 שירי שבת, תפילות וברכות",
      fr: "🎵 Ouvrir les 56 Chants de Chabbat & Prières",
      es: "🎵 Abrir 56 Canciones de Shabat y Rezos",
      de: "🎵 56 Schabbat-Lieder & Gebete öffnen",
      ru: "🎵 Открыть 56 субботних песен и молитв"
    },
    "rabbi-letters|": {
      en: "✍️ Open Activity Logger & Rabbi Reference Letter Builder",
      he: "✍️ פתיחת יומן פעילות ומחולל מכתבי המלצה מרב",
      fr: "✍️ Ouvrir le Journal d'Activités & Lettres du Rabbin",
      es: "✍️ Abrir Registro de Actividades y Cartas Rabínicas",
      de: "✍️ Aktivitäts-Logger & Rabbiner-Empfehlungen öffnen",
      ru: "✍️ Открыть дневник общины и письма от раввина"
    },
    "profile|vault": {
      en: "📂 Open My Profile & Uploaded Documents Vault",
      he: "📂 פתיחת הפרופיל שלי וכספת המסמכים שהועלו",
      fr: "📂 Ouvrir Mon Profil & Coffre de Documents",
      es: "📂 Abrir Mi Perfil y Bóveda de Documentos",
      de: "📂 Mein Profil & Dokumenten-Tresor öffnen",
      ru: "📂 Открыть мой профиль и сейф документов"
    },
    "sync|modal": {
      en: "📲 Open Device Sync, Pass Code & Account Recovery",
      he: "📲 פתיחת סנכרון מכשירים ושחזור קוד גישה",
      fr: "📲 Ouvrir Synchronisation & Récupération de Code",
      es: "📲 Abrir Sincronización y Recuperación de Código",
      de: "📲 Geräte-Sync & Pass-Code-Wiederherstellung öffnen",
      ru: "📲 Открыть синхронизацию устройств и код доступа"
    },
    "concierge|": {
      en: "🤝 Open Vetted Notary, Rabbi, Kallah & Lawyer Desk ($0 Quote)",
      he: "🤝 פתיחת מוקד נוטריון, רב מלווה, מדריכת כלה ועו״ד",
      fr: "🤝 Ouvrir Conciergerie Notaire, Rabbin, Kallah & Avocat",
      es: "🤝 Abrir Conserjería Notario, Rabino, Kalá y Abogado",
      de: "🤝 Notar-, Rabbiner-, Kallah- & Anwalts-Desk öffnen",
      ru: "🤝 Открыть запись к нотариусу, раввину, калле и адвокату"
    },
    "pricing|": {
      en: "💎 View All 23 Digital Passes & Concierge Pricing",
      he: "💎 צפייה בכל 23 המסלולים והמחירים",
      fr: "💎 Voir les 23 Pass Numériques & Tarifs",
      es: "💎 Ver los 23 Pases Digitales y Precios",
      de: "💎 Alle 23 Digital-Pässe & Preise ansehen",
      ru: "💎 Посмотреть все 23 тарифа и услуги"
    },
    "obs|0": {
      en: "📖 Guide: Private Beit Din (Gush Etzion / Bnei Brak) Trap",
      he: "📖 מדריך: מלכודת גיור פרטי (גוש עציון / בני ברק)",
      fr: "📖 Guide : Le Piège des Beit Din Privés (Gush Etzion)",
      es: "📖 Guía: La Trampa del Beit Din Privado (Gush Etzion)",
      de: "📖 Leitfaden: Privat-Beit-Din-Falle (Gush Etzion)",
      ru: "📖 Гид: Ловушка частных Бейт-Динов (Гуш-Эцион)"
    },
    "obs|1": {
      en: "📖 Guide: The 5 Mandatory Apostilled Docs & 180-Day Clock",
      he: "📖 מדריך: 5 מסמכי האפוסטיל ושעון 180 הימים",
      fr: "📖 Guide : Les 5 Actes Apostillés & Horloge de 180 Jours",
      es: "📖 Guía: Los 5 Documentos Apostillados y Reloj de 180 Días",
      de: "📖 Leitfaden: Die 5 Apostille-Dokumente & 180-Tage-Frist",
      ru: "📖 Гид: 5 документов с апостилем и часы 180 дней"
    },
    "obs|2": {
      en: "📖 Guide: Post-Mikvah 9-Month Community Rule & Ishur Giyur",
      he: "📖 מדריך: כלל 9 חודשי קהילה ואישור גיור ברבנות",
      fr: "📖 Guide : Règle des 9 Mois post-Mikvé & Ishur Giyur",
      es: "📖 Guía: Regla de 9 Meses tras la Mikve e Ishur Giyur",
      de: "📖 Leitfaden: 9-Monate-Gemeinderegel & Ishur Giyur",
      ru: "📖 Гид: Правило 9 месяцев после миквы и Ишур Гиюр"
    },
    "obs|3": {
      en: "📖 Guide: Passing Va'adat Charigim Before Your 90-Day Visa Ends",
      he: "📖 מדריך: מעבר ועדת חריגים לפני תום 90 ימי אשרת תייר",
      fr: "📖 Guide : Réussir la Va'adat Charigim avant 90 Jours",
      es: "📖 Guía: Aprobar Va'adat Jariguim antes de 90 Días",
      de: "📖 Leitfaden: Va'adat Charigim vor 90 Tagen bestehen",
      ru: "📖 Гид: Прохождение Ваадат Харигим до истечения 90 дней"
    },
    "obs|4": {
      en: "📖 Guide: Snap & Decode Any Hebrew Clerk Deficiency Sheet",
      he: "📖 מדריך: פענוח דרישת מסמכים של פקיד משרד הפנים",
      fr: "📖 Guide : Décoder Toute Lettre Hébraïque du Guichet",
      es: "📖 Guía: Decodificar Cualquier Carta Hebrea del Funcionario",
      de: "📖 Leitfaden: Jedes hebräische Sachbearbeiter-Schreiben dekodieren",
      ru: "📖 Гид: Расшифровка любого письма чиновника МВД"
    },
    "obs|5": {
      en: "📖 Guide: Why BOTH Partners Must Study (Rabbi & Madrichat Kallah)",
      he: "📖 מדריך: חובת לימוד לשני בני הזוג (רב מלווה ומדריכת כלה)",
      fr: "📖 Guide : Pourquoi les DEUX Conjoints Doivent Étudier",
      es: "📖 Guía: Por Qué AMBOS Miembros de la Pareja Deben Estudiar",
      de: "📖 Leitfaden: Warum BEIDE Partner lernen müssen",
      ru: "📖 Гид: Почему учиться обязаны ОБА партнёра"
    },
    "obs|6": {
      en: "📖 Guide: How Misrad HaPanim's Separated-Room Interview Works",
      he: "📖 מדריך: כיצד עובד השימוע הזוגי הנפרד במשרד הפנים",
      fr: "📖 Guide : L'Interrogatoire Séparé des Couples au Misrad HaPanim",
      es: "📖 Guía: Cómo Funciona el Interrogatorio en Salas Separadas",
      de: "📖 Leitfaden: Das getrennte Paar-Interview im Misrad HaPanim",
      ru: "📖 Гид: Как проходит перекрёстный допрос в разных кабинетах"
    },
    "obs|7": {
      en: "📖 Guide: Applying With an Old Arrest / Criminal Record Rehab",
      he: "📖 מדריך: הגשת בקשה עם רישום פלילי ישן / שיקום",
      fr: "📖 Guide : Dossier de Réhabilitation (Casier / Antécédents)",
      es: "📖 Guía: Dossier de Rehabilitación (Antecedentes Penales)",
      de: "📖 Leitfaden: Rehabilitations-Dossier bei Vorstrafen",
      ru: "📖 Гид: Досье реабилитации при наличии старой судимости"
    },
    "obs|8": {
      en: "📖 Guide: Tourist Financial & Housing Survival (Legal Remote Work)",
      he: "📖 מדריך: הישרדות כלכלית ומגורים כתייר (עבודה מרחוק כחוק)",
      fr: "📖 Guide : Survie Financière & Logement sous Visa Touriste",
      es: "📖 Guía: Supervivencia Financiera y Vivienda como Turista",
      de: "📖 Leitfaden: Finanz- & Wohn-Survival mit Touristenvisum",
      ru: "📖 Гид: Финансовое выживание и жильё по турвизе B/2"
    },
    "term|go_bag": {
      en: "🚨 Guide: 7-Day Pre-Flight Go-Bag & Emergency Aliyah Checklist",
      he: "🚨 מדריך: תיק מסמכי חירום לטיסה (Go-Bag) ועלייה מהירה",
      fr: "🚨 Guide : Sac d'Urgence Pré-Vol (Go-Bag) & Aliyah",
      es: "🚨 Guía: Maleta de Emergencia Pre-Vuelo (Go-Bag) y Aliyá",
      de: "🚨 Leitfaden: Pre-Flight Go-Bag & Notfall-Alija",
      ru: "🚨 Гид: Тревожная папка Go-Bag перед вылетом"
    },
    "term|five_docs": {
      en: "✈️ Guide: 5 Apostilled Docs, 180d Clock & 24-Mo Sal Klita Rule",
      he: "✈️ מדריך: 5 מסמכי האפוסטיל וכלל 24 חודשי סל קליטה",
      fr: "✈️ Guide : Les 5 Actes Apostillés & Règle Sal Klita 24 Mois",
      es: "✈️ Guía: 5 Documentos Apostillados y Regla Sal Klita 24 Meses",
      de: "✈️ Leitfaden: 5 Apostille-Urkunden & 24-Monate-Sal-Klita-Regel",
      ru: "✈️ Гид: 5 документов с апостилем и правило 24 мес. Саль Клита"
    },
    "term|spousal_deep_dive": {
      en: "💍 Guide: Nohal 5.2.0008 / 5.2.0009 5-Year Graduated Spousal Playbook",
      he: "💍 מדריך: נוהל 5.2.0008 / 5.2.0009 — ההליך המדורג לבני זוג",
      fr: "💍 Guide : Procédure Graduée Conjoints Nohal 5.2.0008 / 5.2.0009",
      es: "💍 Guía: Procedimiento Gradual de Parejas Nohal 5.2.0008 / 5.2.0009",
      de: "💍 Leitfaden: Stufenverfahren für Paare Nohal 5.2.0008 / 5.2.0009",
      ru: "💍 Гид: Полный план СТУПРО (Ноаль 5.2.0008 / 5.2.0009)"
    },
    "term|newborn_sefach": {
      en: "👶 Guide: Newborn Baby Teudat Zehut Sefach & 300-Day DNA Rule",
      he: "👶 מדריך: רישום יילוד בספח תעודת הזהות וכלל 300 הימים",
      fr: "👶 Guide : Inscrire Votre Bébé sur le Sefach & Règle des 300 Jours",
      es: "👶 Guía: Inscribir a su Bebé en el Sefach y Regla de 300 Días",
      de: "👶 Leitfaden: Neugeborenes im TZ-Sefach & 300-Tage-Regel",
      ru: "👶 Гид: Внесение новорождённого в Сефах ТЗ и правило 300 дней"
    },
    "term|fx_shield": {
      en: "💸 Guide: Pay Israeli Landlords in ₪ & Save ~2.5% Without a TZ",
      he: "💸 מדריך: תשלום שכר דירה ב-₪ וחיסכון 2.5% בהעברת מט״ח ללא ת״ז",
      fr: "💸 Guide : Payer Votre Loyer en ₪ & Économiser ~2,5% Sans TZ",
      es: "💸 Guía: Pagar Alquiler en ₪ y Ahorrar ~2.5% Sin TZ",
      de: "💸 Leitfaden: Miete in ₪ zahlen & ~2,5% sparen ohne TZ",
      ru: "💸 Гид: Оплата аренды в ₪ и экономия ~2.5% без Теудат Зеута"
    },
    "term|bridge_health": {
      en: "🏥 Guide: 60–90 Day Tourist-to-Oleh Medical Insurance Bridge",
      he: "🏥 מדריך: ביטוח בריאות גישור ל-60–90 יום (מכבי / כללית)",
      fr: "🏥 Guide : Assurance Santé Pont 60–90 Jours (Maccabi / Clalit)",
      es: "🏥 Guía: Seguro Médico Puente de 60–90 Días (Maccabi / Clalit)",
      de: "🏥 Leitfaden: 60–90 Tage Überbrückungs-Krankenversicherung",
      ru: "🏥 Гид: Мостовая медстраховка на 60–90 дней (Маккаби / Клалит)"
    },
    "term|dahan_truth": {
      en: "⚖️ Guide: Non-Orthodox 'Dahan Ruling' vs. Chief Rabbinate Marriage",
      he: "⚖️ מדריך: פסק דין דהן מול הכרה לנישואין ברבנות הראשית",
      fr: "⚖️ Guide : Arrêt Dahan vs. Mariage au Grand Rabbinat",
      es: "⚖️ Guía: Fallo Dahan vs. Matrimonio en el Gran Rabinato",
      de: "⚖️ Leitfaden: Dahan-Urteil vs. Hochzeit über das Oberrabbinat",
      ru: "⚖️ Гид: Решение Дахан против брака в Главном раввинате"
    },
    "term|overseas_giyur": {
      en: "🌍 Guide: Overseas Conversions (RCA / Consistoire / London) & Ishur Giyur",
      he: "🌍 מדריך: גיור בחו״ל (RCA / קונסיסטואר / לונדון) ואישור גיור",
      fr: "🌍 Guide : Conversions à l'Étranger (Consistoire / RCA) & Ishur Giyur",
      es: "🌍 Guía: Conversiones en el Extranjero (RCA) e Ishur Giyur",
      de: "🌍 Leitfaden: Auslandskonversionen (ORD / RCA) & Ishur Giyur",
      ru: "🌍 Гид: Зарубежный гиюр (RCA / ФЕОР) и Ишур Гиюр"
    },
    "term|community_letters": {
      en: "✍️ Guide: Getting 5–8+ Orthodox Rabbi & Host Family Reference Letters",
      he: "✍️ מדריך: השגת 5–8+ מכתבי המלצה מרב וקהילה אורתודוקסית",
      fr: "✍️ Guide : Obtenir 5 à 8+ Lettres de Recommandation (Rabbin & Famille)",
      es: "✍️ Guía: Conseguir 5–8+ Cartas de Recomendación de Rabino y Familia",
      de: "✍️ Leitfaden: 5–8+ Empfehlungsschreiben von Rabbiner & Gastfamilie",
      ru: "✍️ Гид: Как собрать 5–8+ писем от раввина и принимающих семей"
    }
  };

  function getNavLabel(spec, l) {
    const entry = NAV_LABELS[spec];
    if (!entry) return spec;
    return entry[l] || entry.en;
  }

  // 4. 22-Intent Weighted Knowledge & Routing Matrix
  const INTENTS = [
    {
      id: "vault_upload_docs",
      rx: /(upload|uploaded|my doc|view doc|download doc|where are my doc|sefach|ספח|תעודת זהות|ת"ז|marr?iage cert|תעודת נישואין|birth cert|תעודת לידה|partner.?s? passport|auto.?fill|scan doc|איפה המסמכים|העלאת מסמכים|להוריד מסמך|mes documents|acte de mariage|partidas? de nacimiento|certificado de matrimonio|meine dokumente|heiratsurkunde|мои документы|свидетельство о браке|сефах)/i,
      weight: 10,
      primary: "profile|vault",
      backups: ["hebrew-engine|ash6", "obs|1", "hebrew-engine|mr14a"],
      reply: {
        en: "📂 **Opening Your Document Vault & Auto-Fill Scanner!**\n\n• **View / Download Uploaded Docs:** Tap your **👤 Profile** icon in the top bar anytime to view, download, or add pages to your uploaded Passports, Israeli TZ + unfolded Sefach (`ספח`), Birth Certificates, and Marriage Certificate.\n• **Multi-Page & Apostille Check:** You can select multiple pages at once (e.g., Marriage Certificate + separate Apostille page, or front TZ + unfolded Sefach) and they auto-populate across all 8 PIBA forms.",
        he: "📂 **פותח את כספת המסמכים ומנוע המילוי האוטומטי שלך!**\n\n• **צפייה והורדה של מסמכים שהועלו:** דרך אייקון **👤 הפרופיל** בסרגל העליון תוכלו לצפות, להוריד או להוסיף עמודים לדרכונים, ת״ז + ספח פתוח, תעודות לידה ותעודת נישואין.\n• **בדיקת אפוסטיל ומסמכים מרובי עמודים:** ניתן לבחור מספר עמודים יחד והנתונים יוזנו אוטומטית לכל 8 טפסי משרד הפנים."
      }
    },
    {
      id: "form_ash6_spousal",
      rx: /(ash\s*\/?\s*6|אש\s*\/?\s*6|аш\s*\/?\s*6|5\.2\.0008|5\.2\.0009|spousal visa|spouse visa|stupro|ступро|הליך מדורג|מעמד לבן זוג|married to israeli|israeli husband|israeli wife|common.?law|ידועים בציבור|utah marriage|utah zoom|חתונת יוטה|נישואי יוטה|visa conjoint|visa cónyuge|ehepartner visum|виза супруг)/i,
      weight: 9,
      primary: "hebrew-engine|ash6",
      backups: ["term|spousal_deep_dive", "couples-sync|", "hebrew-engine|nespach_alef"],
      reply: {
        en: "💍 **Opening the Spousal Residency Track (*Nohal 5.2.0008 / 5.2.0009* — Form Ash/6)!**\n\n• **Married Couples (*Nohal 5.2.0008*):** File the 6-page **Form Ash/6** (includes Utah Zoom civil marriages under Supreme Court ruling *AAA 7368/22*). Note: Under **Sec. ד.2.ה**, if your Apostilled Marriage Certificate lists your prior status as *Single*, you are exempt from a separate Single-Status certificate!\n• **Unmarried Couples (*Nohal 5.2.0009*):** Also sign the 13-clause **Nespach Alef** affidavit.\n• **Dual-Track Right (Sec. ג.10):** You can run your Spousal Visa AND State Rabbanut Conversion simultaneously!",
        he: "💍 **פותח את מסלול בני זוג ומנוע טופס אש/6 (נוהל 5.2.0008 / 5.2.0009)!**\n\n• **זוגות נשואים (נוהל 5.2.0008):** מגישים את **טופס אש/6** (כולל נישואי יוטה בזום לפי פס״ד עע״מ 7368/22). לפי **סעיף ד.2.ה**, אם בתעודת הנישואין המאומתת באפוסטיל מצוין מצב קודם 'רווק/ה', יש פטור מתעודת רווקות נפרדת!\n• **ידועים בציבור (נוהל 5.2.0009):** חותמים גם על תצהיר **נספח א׳**.\n• **הליכים במקביל (סעיף ג.10):** ניתן לנהל תיק חיים משותפים ותיק גיור ממלכתי במקביל!"
      }
    },
    {
      id: "form_ash456_shinui",
      rx: /(ash\s*\/?\s*456|אש\s*\/?\s*456|аш\s*\/?\s*456|shinui ma.?amad|שינוי מעמד|5\.2\.0001|aliyah from inside israel|in.?israel aliyah|sal klita|סל קליטה|24 month|24 חודשים|עלייה מתוך הארץ|репатриация в израиле|шинуй маамад|саль клита)/i,
      weight: 9,
      primary: "hebrew-engine|ash456",
      backups: ["term|five_docs", "hebrew-engine|mr14a", "term|bridge_health"],
      reply: {
        en: "✈️ **Opening In-Israel Aliyah (*Shinui Ma'amad* • *Nohal 5.2.0001* — Form Ash/456)!**\n\n• **Zero Fee Exemption:** Under *Nohal 5.2.0001 Sec. ג.7*, tourists changing status to *Oleh* are **exempt** from the 955₪ fee.\n• **🚨 The 24-Month *Sal Klita* Trap:** Exceeding **24 cumulative months** inside Israel in the 3 years prior to receiving your *Teudat Oleh* permanently disqualifies you from the ~21,700₪ *Sal Klita* cash grant!",
        he: "✈️ **פותח את מסלול עלייה מתוך ישראל (שינוי מעמד • נוהל 5.2.0001 — טופס אש/456)!**\n\n• **פטור מאגרה:** לפי סעיף ג.7 לנוהל 5.2.0001, מבקשי מעמד עולה פטורים מאגרת 955 ₪.\n• **🚨 מלכודת 24 החודשים של סל קליטה:** שהייה מצטברת של מעל 24 חודשים בישראל ב-3 השנים שקדמו לקבלת מעמד עולה שוללת לצמיתות את מענק סל הקליטה (~21,700 ₪)!"
      }
    },
    {
      id: "form_ash1_vc",
      rx: /(ash\s*\/?\s*1|אש\s*\/?\s*1|аш\s*\/?\s*1|va.?adat charigim|va.?adat jariguim|וועדת חריגים|ועדת חריגים|ваадат харигим|exceptions committee|commission des exceptions|comité de excepciones|convert on a tourist visa|b\/2 visa conversion)/i,
      weight: 9,
      primary: "obs|3",
      backups: ["hebrew-engine|ash1", "hebrew-engine|ash3", "obs|1"],
      reply: {
        en: "🏛️ **Opening the *Va'adat Charigim* (Exceptions Committee — Form Ash/1) Playbook!**\n\nTourists on a B/2 visa must clear the Exceptions Committee before their 90-day visa expires by submitting **Form Ash/1**, **Form Ash/3**, a Hebrew *Michtav Hesber* (Explanation Letter), **5–8+ Orthodox Rabbi & Host Family letters**, and all **5 Apostilled homeland documents**.",
        he: "🏛️ **פותח את מדריך ועדת חריגים (טופס אש/1) למבקשי גיור באשרת תייר!**\n\nתיירים באשרת ב/2 חייבים לעבור את ועדת החריגים לפני תום 90 הימים באמצעות הגשת **טופס אש/1**, **טופס אש/3**, מכתב הסבר מנומק בעברית, **5–8+ מכתבי המלצה מרבנים ומשפחות מארחות**, וכל **5 תעודות האפוסטיל**."
      }
    },
    {
      id: "form_ash3_ext",
      rx: /(ash\s*\/?\s*3|אש\s*\/?\s*3|аш\s*\/?\s*3|extend visa|visa extension|הארכת אשרה|הארכת ויזה|a\/2 visa|א\/2|student visa|prolonger visa|prórroga de visa|продление визы|b\/2 extension)/i,
      weight: 8,
      primary: "hebrew-engine|ash3",
      backups: ["obs|3", "hebrew-engine|ash1", "obs|8"],
      reply: {
        en: "📄 **Opening Form Ash/3 (Visa Extension / Change to A/2 Student or B/1 Visa)!**\n\nUse our bilingual Hebrew/English **Form Ash/3** engine to extend your B/2 tourist permit or switch to an **A/2 Conversion Ulpan Student Visa** without overstaying your 90-day clock.",
        he: "📄 **פותח את מנוע טופס אש/3 (הארכת אשרת שהייה / החלפה לאשרת תלמיד א/2 או ב/1)!**\n\nמלאו והורידו את **טופס אש/3** המוחתם בעברית ובאנגלית להארכת אשרת תייר ב/2 או מעבר לאשרת לימודי גיור א/2."
      }
    },
    {
      id: "form_mr14_tz",
      rx: /(mr\s*\/?\s*14|מר\s*\/?\s*14|мр\s*\/?\s*14|first teudat zehut|תעודת זהות ראשונה|biometric tz|ת"ז ביומטרית|dual citizenship declaration|mr14a|mr14b)/i,
      weight: 8,
      primary: "hebrew-engine|mr14a",
      backups: ["term|newborn_sefach", "hebrew-engine|ash456", "profile|vault"],
      reply: {
        en: "🪪 **Opening Form MR/14a & MR/14b (First Biometric Teudat Zehut & Passport Declaration)!**\n\nRemember: Leave the Clerk Remarks box on **MR/14a** and the Specimen Signature box on **MR/14b** blank until you are sitting directly in front of the Misrad HaPanim clerk!",
        he: "🪪 **פותח את טופס מר/14א׳ ומר/14ב׳ (רישום לתעודת זהות ראשונה והצהרת דרכון)!**\n\nחשוב: השאירו את משבצת הערות הפקיד במר/14א׳ ואת משבצת דוגמת החתימה במר/14ב׳ ריקות עד למעמד החתימה מול הפקיד בלשכה!"
      }
    },
    {
      id: "form_sec_cv",
      rx: /(security cv|nativ cv|11.?page|קורות חיים|שאלון נתיב|שאלון ביטחוני|анкета безопасности|натив)/i,
      weight: 8,
      primary: "hebrew-engine|sec_cv",
      backups: ["hebrew-engine|ash6", "hebrew-engine|ash456", "obs|1"],
      reply: {
        en: "🛡️ **Opening the 11-Page Nativ / Misrad HaPanim Security CV Auto-Filler!**\n\nOur engine populates all 11 pages of the Hebrew Security & Biography questionnaire (including landscape family tables, travel history, and employment lines) from your single dossier.",
        he: "🛡️ **פותח את מנוע שאלון קורות חיים (11 עמודים) של נתיב ומשרד הפנים!**\n\nהמערכת ממלאת עבורכם את כל 11 עמודי השאלון בעברית תקנית (כולל טבלאות בני משפחה, היסטוריית נסיעות ותעסוקה)."
      }
    },
    {
      id: "apostille_5docs_180d",
      rx: /(apostill?e|אפוסטיל|апостил|180.?day|180 ימים|180 дней|6.?month clock|5 doc|five doc|long.?form birth|תעודת לידה מורחבת|fbi check|acro|police check|תעודת יושר|single status|תמצית רווקות|fe de solter|capacité à mariage|führungszeugnis|справка о несудимости)/i,
      weight: 9,
      primary: "obs|1",
      backups: ["term|five_docs", "term|go_bag", "concierge|"],
      reply: {
        en: "📜 **Opening the 5 Mandatory Apostilled Documents & 180-Day Clock Guide!**\n\n1. **The 5 Required Originals:** (1) Long-Form Birth Cert listing **both parents**, (2) Single-Status Proof (or Marriage Cert listing prior status as *Single* under *Nohal 5.2.0008 Sec. ד.2.ה*), (3) Prior Divorce/Death certs, (4) Name-Change certs, and (5) Federal Fingerprint Criminal Check (US FBI w/ Federal Dept of State Apostille, UK ACRO, FR Bulletin n°3, etc.).\n2. **Strict 180-Day Expiry:** Police and marital certificates expire **180 days** from issue!\n3. **Never Surrender Originals:** Show originals at the window only for visual inspection and hand the clerk a photocopy or **Red-Ribbon Notarial Translation**.",
        he: "📜 **פותח את מדריך 5 תעודות האפוסטיל ושעון 180 הימים!**\n\n1. **5 תעודות המקור הנדרשות:** (1) תעודת לידה מורחבת עם שמות שני ההורים, (2) תעודת רווקות (או תעודת נישואין המציינת מצב קודם 'רווק/ה' לפי סעיף ד.2.ה), (3) תעודות גירושין/פטירה קודמות, (4) תעודות שינוי שם, (5) תעודת יושר פדרלית (כגון FBI עם אפוסטיל פדרלי) מכל מדינת אזרחות ומגורים מעל שנה מגיל 14.\n2. **תוקף 180 יום:** תעודות יושר ורווקות פגות תוקף לאחר 180 יום בדיוק!\n3. **לעולם אל תמסרו תעודת מקור לפקיד:** הציגו מקור לעיון בלבד ומסרו העתק או אישור תרגום נוטריוני בסרט אדום."
      }
    },
    {
      id: "go_bag_pre_flight",
      rx: /(go.?bag|pre.?flight|before flying|emergency aliyah|תיק חירום|לפני טיסה|тревожный чемоданчик|перед вылетом)/i,
      weight: 9,
      primary: "term|go_bag",
      backups: ["obs|1", "term|fx_shield", "term|bridge_health"],
      reply: {
        en: "🚨 **Opening the 7-Day Pre-Flight Go-Bag & Emergency Aliyah Checklist!**\n\nNever board your flight to Israel without pulling **double-original, double-Apostilled** copies of your Birth Certificate, Police Check (<180d), Marital Proof, and Orthodox *Ishur Yahadut* into your carry-on bag.",
        he: "🚨 **פותח את רשימת תיק החירום לטיסה (Go-Bag) ועלייה מתוך ישראל!**\n\nאל תעלו על טיסה לישראל לפני שהוצאתם ידנית 2 עותקים מקוריים ומאומתים באפוסטיל של תעודת הלידה המורחבת, תעודת היושר (<180 יום), תמצית הרווקות/נישואין ואישור היהדות."
      }
    },
    {
      id: "beit_din_700_cards",
      rx: /(beit din question|beit din exam|700 card|700 question|curveball|ma.?amad beit din|שאלות בית הדין|מבחן בית הדין|כרטיסיות בית דין|вопросы бейт.?дина|экзамен бейт)/i,
      weight: 9,
      primary: "beit-din-150|",
      backups: ["songs-prayers|", "obs|5", "rabbi-letters|"],
      reply: {
        en: "🕍 **Opening the 700-Card Ma'amad Beit Din Simulator!**\n\nPractice all 4 packs (200 Core Halacha, 200 Dayanim Curveballs, 150 Men's Pack, and 150 Women's Pack) with native Hebrew audio pronunciation and exact answers Dayanim expect to hear.",
        he: "🕍 **פותח את סימולטור 700 השאלות למעמד בית הדין!**\n\nתרגלו את כל 4 החבילות (200 שאלות ליבה, 200 שאלות מתקילות של דיינים, 150 לגברים ו-150 לנשים) עם הגייה קולית בעברית."
      }
    },
    {
      id: "songs_prayers_56",
      rx: /(shabbat song|karaoke|prayer|shacharit|brachot|blessings|shema|שירי שבת|תפילות|ברכות|שחרית|שמע ישראל|субботние песни|молитвы|брахот|chants de chabbat)/i,
      weight: 9,
      primary: "songs-prayers|",
      backups: ["beit-din-150|", "obs|5", "rabbi-letters|"],
      reply: {
        en: "🎵 **Opening the 56 Shabbat Songs, Morning Prayers & Essential Brachot Karaoke Trainer!**\n\nFollow word-by-word highlighted Hebrew + 6-language phonetic transliteration so you can sing and recite every blessing fluently at the Beit Din.",
        he: "🎵 **פותח את מאמן הקריוקי ל-56 שירי שבת, תפילות שחרית וברכות!**\n\nתרגלו מילה-במילה עם הדגשה מסונכרנת והגייה מדויקת למעמד בית הדין."
      }
    },
    {
      id: "couples_300_sync",
      rx: /(300 question|80 question|couples? interview|separated? room|two phone|2 phone|שימוע זוגי|ראיון זוגי|חדרים נפרדים|300 שאלות|допрос для пар|разных кабинетах|300 вопросов|interrogatoire couple)/i,
      weight: 9,
      primary: "couples-sync|",
      backups: ["obs|6", "hebrew-engine|ash6", "term|spousal_deep_dive"],
      reply: {
        en: "📱 **Opening the 300-Question Separated-Room Couples Interrogation Sync!**\n\nBefore Misrad HaPanim puts you and your partner in separate rooms to ask 80 daily-life questions, practice on 2 phones and instantly spot any mismatched answers.",
        he: "📱 **פותח את סימולטור 300 השאלות לשימוע זוגי בחדרים נפרדים (סנכרון 2 טלפונים)!**\n\nתרגלו יחד משני טלפונים וגלו כל אי-התאמה בתשובות לפני הראיון במשרד הפנים."
      }
    },
    {
      id: "rabbi_community_letters",
      rx: /(rabbi letter|host family letter|community letter|reference letter|activity log|michtav|מכתב רב|מכתבי המלצה|משפחה מארחת|יומן פעילות|письмо от раввина|рекомендательн|lettre du rabbin)/i,
      weight: 8,
      primary: "rabbi-letters|",
      backups: ["term|community_letters", "obs|5", "concierge|"],
      reply: {
        en: "✍️ **Opening the Activity Logger & Orthodox Rabbi / Host Family Letter Builder!**\n\nLog your Shabbat meals, classes, and synagogue attendance with the iPhone-wheel logger to generate custom Hebrew recommendation letters on official formatting (including mandatory passport & ID numbers).",
        he: "✍️ **פותח את יומן הפעילות הקהילתי ומחולל מכתבי ההמלצה מרב ומשפחה מארחת!**\n\nתעדו סעודות שבת, שיעורים ותפילות והפיקו טיוטות מכתבים תקניות בעברית הכוללות מספרי דרכון ות״ז כנדרש."
      }
    },
    {
      id: "vetted_concierge_team",
      rx: /(notary|red.?ribbon|נוטריון|סרט אדום|sponsoring rabbi|רב מלווה|madrichat kallah|מדריכת כלה|lawyer escort|immigration lawyer|עורך דין|עו"ד|ליווי ללשכה|notaire|avocat|нотариус|адвокат|раввин)/i,
      weight: 8,
      primary: "concierge|",
      backups: ["obs|5", "pricing|", "obs|1"],
      reply: {
        en: "🤝 **Opening the Vetted Concierge Desk ($0 Upfront Quote)!**\n\nRequest regional matching (Jerusalem, Tel Aviv, Center, Haifa/Safed/North, South) for:\n• **🎀 Red-Ribbon Israeli Notarial Hebrew Translations** ($249–$799)\n• **🕍 Vetted Rabbanut Sponsoring Rabbi** ($349) & **🕯️ Madrichat Kallah** ($249)\n• **⚖️ 1-Hour Licensed Lawyer Day-Of Appointment Escort** ($649–$799)",
        he: "🤝 **פותח את מוקד הליווי האנושי המאומת (הצעת מחיר ללא עלות מראש)!**\n\nתיאום אזורי (ירושלים, תל אביב והמרכז, חיפה/צפת והצפון, דרום) עבור:\n• **🎀 תרגום נוטריוני בעברית בסרט אדום** ($249–$799)\n• **🕍 רב מלווה מוכר ע״י הרבנות** ($349) ו-**🕯️ מדריכת כלה מוסמכת** ($249)\n• **⚖️ ליווי עורך דין מומחה לדיני הגירה לשעה בלשכת משרד הפנים** ($649–$799)"
      }
    },
    {
      id: "criminal_record_rehab",
      rx: /(criminal record|arrest|dui|expunged|felony|misdemeanor|רישום פלילי|עבר פלילי|מעצר|судимость|casier judiciaire|antecedentes penales|vorstrafe)/i,
      weight: 9,
      primary: "obs|7",
      backups: ["concierge|", "obs|1", "hebrew-engine|ash456"],
      reply: {
        en: "🛡️ **Opening the Criminal Record Rehabilitation Playbook!**\n\nNever check 'Clean Record' if you have an old, minor, or expunged arrest—Misrad HaPanim rejections for 'concealment' freeze files for 2+ years. Disclose upfront with our statutory Hebrew Rehabilitation Dossier.",
        he: "🛡️ **פותח את מדריך השיקום והגשת בקשה עם רישום פלילי ישן!**\n\nלעולם אל תסמנו 'ללא עבר פלילי' אם קיים רישום ישן או שנמחק — דחייה בגין 'הסתרת מידע' מקפיאה תיקים לשנתיים. הגישו גילוי נאות ומכתב הסבר שיקומי בעברית."
      }
    },
    {
      id: "newborn_baby_sefach",
      rx: /(newborn|baby|pregnant|pregnancy|birth in israel|300.?day|dna test|רישום יילוד|תינוק|לידה בישראל|בדיקת רקמות|300 יום|новорожден|ребенок в сефах)/i,
      weight: 9,
      primary: "term|newborn_sefach",
      backups: ["term|spousal_deep_dive", "hebrew-engine|mr14a", "concierge|"],
      reply: {
        en: "👶 **Opening the Newborn Baby Teudat Zehut Sefach & 300-Day Rule Playbook (*Nohal 5.2.0004*)!**\n\nLearn how to register your Israeli-born baby onto the Teudat Zehut Sefach without getting trapped in a Family Court DNA order (*Tzav B'dikat Rekamot*).",
        he: "👶 **פותח את מדריך רישום יילוד בספח תעודת הזהות וכלל 300 הימים (נוהל 5.2.0004)!**\n\nכיצד לרשום תינוק שנולד בישראל בספח תעודת הזהות ללא עיכוב של צו בדיקת רקמות בבית המשפט למשפחה."
      }
    },
    {
      id: "fx_rent_and_health",
      rx: /(pay rent|transfer money|currency|isratransfer|bank account|wire transfer|שכר דירה|העברת כסף|מט"ח|חשבון בנק|health insurance|kupat cholim|maccabi|clalit|ביטוח בריאות|קופת חולים|מכבי|כללית|медстраховка|оплата аренды)/i,
      weight: 8,
      primary: "term|fx_shield",
      backups: ["term|bridge_health", "obs|8", "term|go_bag"],
      reply: {
        en: "💸🏥 **Opening the Aliyah Currency Rent Bridge & 60–90 Day Medical Insurance Shield!**\n\n• **Pay Rent in ₪ Without a TZ:** Wire funds and pay your Israeli landlord in Shekels while saving ~2.5% over bank fees.\n• **60–90 Day Medical Bridge:** Get Maccabi/Clalit-network coverage ($1.80–$3/day) while waiting for your Teudat Zehut.",
        he: "💸🏥 **פותח את גשר המט״ח לתשלום שכר דירה ב-₪ ומגן ביטוח הבריאות ל-60–90 יום!**\n\n• **תשלום שכ״ד ב-₪ ללא ת״ז:** העברת כספים לתשלום שכר דירה בשקלים בחיסכון של כ-2.5% מעמלות הבנקים.\n• **ביטוח בריאות גישור:** כיסוי רפואי ברשת מכבי/כללית בזמן ההמתנה לתעודת זהות."
      }
    },
    {
      id: "tourist_survival_work",
      rx: /(work on a tourist|remote work|sustain myself|afford rent|housing|dorm|volunteer|עבודה מרחוק|להתפרנס כתייר|מגורים|התנדבות|удаленная работа|выживание туриста)/i,
      weight: 8,
      primary: "obs|8",
      backups: ["obs|3", "term|fx_shield", "term|bridge_health"],
      reply: {
        en: "💼 **Opening the Tourist Financial & Housing Survival Guide!**\n\nWorking locally in Israel on a B/2 visa is illegal and kills your file—learn how applicants legally sustain themselves via overseas remote work and slash rent through dorm/caretaker housing.",
        he: "💼 **פותח את מדריך ההישרדות הכלכלית והמגורים לתיירים בהליך גיור/מעמד!**\n\nעבודה מקומית בישראל באשרת תייר פוסלת את התיק — גלו כיצד להתפרנס כחוק מעבודה מרחוק בחו״ל ולצמצם הוצאות דיור."
      }
    },
    {
      id: "clerk_letter_decoder",
      rx: /(clerk letter|clerk sheet|deficiency|drishat mismachim|30.?day|45.?day|hebrew letter from misrad|דרישת מסמכים|מכתב מפקיד|פענוח מכתב|письмо от чиновника|требование документов)/i,
      weight: 8,
      primary: "obs|4",
      backups: ["tab|4", "hebrew-engine|ash6", "concierge|"],
      reply: {
        en: "📸 **Opening the Hebrew Clerk Deficiency Sheet Decoder & 30/45-Day Deadline Tracker!**\n\nSnap any Hebrew printout handed to you by a Misrad HaPanim clerk to get an instant translation and start your 25-day safe countdown.",
        he: "📸 **פותח את מפענח דרישות המסמכים של פקידי משרד הפנים ומחשבון מועדי ההגשה!**\n\nצלמו כל דף דרישת מסמכים שקיבלתם בלשכה לפענוח מיידי והפעלת שעון עצר להגשה בטוחה."
      }
    },
    {
      id: "pricing_passes",
      rx: /(price|pricing|cost|how much|90.?day|lifetime pass|revolut|buy|purchase|unlock|כמה עולה|מחיר|מחירון|תשלום|רכישה|combien coûte|tarif|precio|cuánto cuesta|preis|сколько стоит|цена|тариф)/i,
      weight: 8,
      primary: "pricing|",
      backups: ["concierge|", "hebrew-engine|ash6", "beit-din-150|"],
      reply: {
        en: "💎 **Opening the Modular Pricing & 23 Services Hub!**\n\nZero monthly subscriptions—unlock only what fits your track:\n• **📄 Statutory Hebrew Forms Engine (All 8 PIBA PDFs):** $89 (90-Day) / $149 (Lifetime)\n• **🕍 Beit Din 700-Q & 56 Songs Suite:** $149 (90-Day) / $249 (Lifetime) — or individual packs from $49\n• **📱 Couples 300-Q 2-Phone Sync:** $129 (90-Day) / $229 (Lifetime)\n• **👑 Full VIP Suites:** $249–$649",
        he: "💎 **פותח את עמוד המסלולים והמחירים המודולריים (23 שירותים)!**\n\nללא מנויים חודשיים — פתחו רק את המנוע הדרוש לכם:\n• **📄 מנוע 8 טפסי משרד הפנים בעברית:** $89 (ל-90 יום) / $149 (לכל החיים)\n• **🕍 חבילת 700 שאלות בית דין ו-56 שירים:** $149 (ל-90 יום) / $249 (לכל החיים)\n• **📱 סימולטור 300 שאלות שימוע זוגי ב-2 טלפונים:** $129 (ל-90 יום) / $229 (לכל החיים)\n• **👑 חבילות VIP מלאות:** $249–$649"
      }
    },
    {
      id: "sync_pass_code",
      rx: /(sync device|pass code|6.?char|lost phone|switch phone|login|log in|restore account|סנכרון מכשירים|קוד גישה|איבדתי טלפון|התחברות|синхронизац|код доступа|потерял телефон)/i,
      weight: 9,
      primary: "sync|modal",
      backups: ["profile|vault", "pricing|", "hebrew-engine|ash6"],
      reply: {
        en: "📲 **Opening Device Sync & Pass Code Recovery!**\n\nLink your WhatsApp number or enter your 6-character Permanent Pass Code (or Passport Number) to sync your unlocked passes, form drafts, and uploaded documents across all your devices.",
        he: "📲 **פותח את חלון סנכרון המכשירים ושחזור קוד הגישה!**\n\nחברו את מספר הוואטסאפ שלכם או הזינו את קוד הגישה הקבוע בן 6 התווים (או מספר דרכון) לסנכרון מלא של הטפסים והמסמכים בין כל המכשירים."
      }
    }
  ];

  // 5. Natural-Language "Cry for Help" Detector (Catches ANY phrasing of a bug, stuck issue, or cry for help)
  const CRY_FOR_HELP_RX = /(not working|doesn.?t work|doesnt work|won.?t work|broken|bug|glitch|error|stuck|wrong field|didn.?t populate|didnt populate|doesn.?t populate|doesnt populate|can.?t upload|cant upload|won.?t upload|failed|crash|freeze|frozen|paid but|already paid|still locked|didn.?t unlock|need a human|talk to a person|speak to someone|real person|help me please|i.?m lost|im lost|so confused|frustrated|urgent help|call me|contact me|something is wrong|issue with|problem with|report a problem|תקלה|בעיה|לא עובד|לא מתמלא|לא מצליח|נתקע|שגיאה|שילמתי ו|עדיין נעול|נציג אנושי|לדבר עם מישהו|תעזרו לי|הלכתי לאיבוד|דחוף|problème|ne fonctionne pas|bloqué|erreur|payé mais|parler à quelqu|no funciona|error|bloqueado|pagué pero|hablar con alguien|funktioniert nicht|fehler|blockiert|bezahlt aber|не работает|ошибка|не загружается|не заполняется|оплатил но|заблокировано|помогите|связаться|человек)/i;

  window.submitPreAiCryForHelp = async function(encodedProblem) {
    const inpEl = document.getElementById("gat-cry-wa-inp");
    const noteEl = document.getElementById("gat-cry-extra-inp");
    const btnEl = document.getElementById("gat-cry-send-btn");
    const stEl = document.getElementById("gat-cry-status");
    const waVal = inpEl ? inpEl.value.trim() : (localStorage.getItem("gat_wa_phone") || "");
    const extraVal = noteEl ? noteEl.value.trim() : "";
    const fullDesc = [decodeURIComponent(encodedProblem || ""), extraVal].filter(Boolean).join(" | ");

    if (!waVal || waVal.replace(/\D/g, "").length < 7) {
      if (inpEl) {
        inpEl.style.borderColor = "#dc2626";
        inpEl.focus();
      }
      if (stEl) {
        stEl.style.display = "block";
        stEl.style.color = "#b91c1c";
        stEl.textContent = "⚠️ Please enter a valid WhatsApp number (with country code) so we can reach you if needed.";
      }
      return;
    }

    try { localStorage.setItem("gat_wa_phone", waVal); } catch (e) {}
    if (btnEl) {
      btnEl.disabled = true;
      btnEl.textContent = "⏳ Dispatching...";
    }
    try {
      const res = await fetch(getApiEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "report_problem",
          category: "pre_ai_cry_for_help",
          description: fullDesc || "User requested assistance in Pre-AI chat",
          contact: waVal,
          uid: window.gatUid || localStorage.getItem("gat_uid") || "anon",
          lang: getLangCode(),
          pageUrl: window.location.href,
          currentMod: window.currentMod || "landing",
          currentForm: window.activePibaFormKey || "",
          screen: window.innerWidth + "x" + window.innerHeight,
          formSnapshot: window.gatFormsState || {}
        })
      });
      const data = await res.json();
      if (stEl) {
        stEl.style.display = "block";
        stEl.style.color = "#15803d";
        stEl.innerHTML = "✅ <strong>Logged (#" + ((data && data.ticketId) || "OK") + ")!</strong> Your issue and WhatsApp (" + waVal + ") have been forwarded to our technical desk. Keep using the links above—if personal intervention is needed, we will message you on WhatsApp.";
      }
      if (btnEl) btnEl.style.display = "none";
    } catch (err) {
      if (btnEl) {
        btnEl.disabled = false;
        btnEl.textContent = "🚀 Send to Technical Desk";
      }
      if (stEl) {
        stEl.style.display = "block";
        stEl.style.color = "#b91c1c";
        stEl.textContent = "⚠️ Could not send right now—please check your connection.";
      }
    }
  };

  function buildCryForHelpWidgetTag(userText) {
    return "[[CRY_HELP:" + encodeURIComponent(String(userText || "").slice(0, 500)) + "]]";
  }

  // Upgrade matchPreAiInstantRoute with:
  // 1) Legacy Fiance & Conversion exact routes (with ranked backup links)
  // 2) 22-Intent Weighted Scorer (with #1 Primary Nav + Ordered Backup Links)
  // 3) Natural-Language "Cry for Help" Catcher
  window.matchPreAiInstantRoute = function(rawText, lang) {
    const q = String(rawText || "").trim();
    const ql = q.toLowerCase();
    if (!ql || ql.length > 500) return null;
    const l = getLangCode();
    const pack = (window.GAT_6LANG_PACK && (window.GAT_6LANG_PACK[l] || window.GAT_6LANG_PACK.en)) || {};
    const P = pack.pre_ai || {};
    const isCryForHelp = CRY_FOR_HELP_RX.test(ql);

    // A. Explicit Fiance Triage Button Taps
    if (q.indexOf("FIANCE_IL:") !== -1 || ql.indexOf("fiance_israeli") !== -1) {
      return { routeKey: "fiance_il", reply: P.fiance_il, autoNav: "hebrew-engine|ash6" };
    }
    if (q.indexOf("FIANCE_FJ:") !== -1 || ql.indexOf("fiance_foreign_jew") !== -1) {
      return { routeKey: "fiance_fj", reply: P.fiance_fj, autoNav: "term|go_bag" };
    }
    if (q.indexOf("FIANCE_OT:") !== -1 || ql.indexOf("fiance_other") !== -1) {
      return { routeKey: "fiance_ot", reply: P.fiance_ot, autoNav: "term|overseas_giyur" };
    }

    // B. Private / Overseas Conversion + Marriage Triage
    const hasPrivateOrGiyur = /(gush etzion|גוש עציון|гуш.?эцион|giyur k.?halacha|גיור כהלכה|гиюр ке.?галаха|bnei brak|בני ברק|бней.?брак|karelitz|קרליץ|карелиц|private beit din|private conversion|בית דין פרטי|גיור פרטי|частный гиюр|частный бейт|conversion privée|conversión privada|privater giur|chabad|חב"ד|хабад|badatz|בד"ץ|overseas conversion|converted abroad|rca|consistoire)/.test(ql);
    const hasMarriageOrFiance = /(marry|marriage|fiance|fiancée|finace|wedding|partner|boyfriend|girlfriend|husband|wife|going home|goinghome|חתונה|להתחתן|ארוס|ארוסה|בן זוג|בת זוג|marier|mariage|fiancé|conjoint|casar|casarme|boda|prometido|pareja|heiraten|hochzeit|verlobt|жениться|выйти замуж|свадьб|жених|невест|супруг)/.test(ql);

    if (hasPrivateOrGiyur && hasMarriageOrFiance && P.fiance_ask) {
      return {
        routeKey: "fiance_ask",
        reply: P.fiance_ask + (isCryForHelp ? ("\n\n" + buildCryForHelpWidgetTag(q)) : ""),
        autoNav: ""
      };
    }
    if (hasPrivateOrGiyur && P.priv_bd) {
      return {
        routeKey: "priv_bd",
        reply: P.priv_bd + (isCryForHelp ? ("\n\n" + buildCryForHelpWidgetTag(q)) : ""),
        autoNav: "obs|0"
      };
    }
    if (/(reform conversion|conservative conversion|masorti|non-orthodox|dahan|פסק דין דהן|פס"ד דהן|גיור רפורמי|גיור קונסרבטיבי|дахан|реформист|консервативн|réformé|massorti|reformista|conservador)/.test(ql) && P.dahan) {
      return {
        routeKey: "dahan",
        reply: P.dahan + (isCryForHelp ? ("\n\n" + buildCryForHelpWidgetTag(q)) : ""),
        autoNav: "term|dahan_truth"
      };
    }

    // C. Score All 22 Site Intents
    const scored = [];
    INTENTS.forEach(function(it) {
      const matches = ql.match(new RegExp(it.rx.source, "gi"));
      if (matches && matches.length > 0) {
        scored.push({
          intent: it,
          score: (matches.length * it.weight)
        });
      }
    });
    scored.sort(function(a, b) { return b.score - a.score; });

    if (scored.length > 0) {
      const winner = scored[0].intent;
      const replyBody = (winner.reply && (winner.reply[l] || winner.reply.en)) || "";

      // Build ordered list of Primary + Ranked Backups (excluding duplicates)
      const orderedNavSpecs = [winner.primary];
      scored.slice(1).forEach(function(sItem) {
        if (orderedNavSpecs.indexOf(sItem.intent.primary) === -1) {
          orderedNavSpecs.push(sItem.intent.primary);
        }
      });
      (winner.backups || []).forEach(function(bk) {
        if (orderedNavSpecs.indexOf(bk) === -1) {
          orderedNavSpecs.push(bk);
        }
      });

      const navTags = orderedNavSpecs.slice(0, 4).map(function(spec, idx) {
        const prefix = idx === 0 ? "🎯 Best Match: " : ("🔗 Backup #" + idx + ": ");
        return "[[NAV:" + spec + "|" + prefix + getNavLabel(spec, l) + "]]";
      }).join("\n");

      return {
        routeKey: winner.id,
        reply: replyBody + "\n\n" + navTags + (isCryForHelp ? ("\n\n" + buildCryForHelpWidgetTag(q)) : ""),
        autoNav: winner.primary
      };
    }

    // D. Pure "Cry for Help" / Stuck User / Bug Report (even if no specific module keyword was named)
    if (isCryForHelp) {
      const cryHeader = l === "he"
        ? "🛠️ **זיהינו שנתקלתם בבעיה או שאתם זקוקים לעזרה!**\n\n1. קודם כל, הנה הקישורים המהירים לכל המנועים המרכזיים באתר למקרה שחיפשתם אחד מהם.\n2. **אם עדיין משהו לא עובד או נתקע:** הזינו את מספר הוואטסאפ שלכם בתיבה למטה — המערכת תשלח מיד את פרטי הבעיה שכתבתם לצוות הפיתוח שלנו, ואם יידרש טיפול אישי נחזור אליכם בוואטסאפ:"
        : "🛠️ **I Caught Your Cry for Help!**\n\n1. First, here are quick-jump links to our core engines in case you are looking for a specific tool.\n2. **Still stuck or found a bug?** Drop your WhatsApp number below—our system will immediately dispatch what you just wrote to our engineering desk, and if human intervention is needed after our automated checks, we will reach out to you on WhatsApp:";
      const fallbackNavs = [
        "[[NAV:profile|vault|🎯 1. Open My Profile & Uploaded Docs Vault]]",
        "[[NAV:hebrew-engine|ash6|🔗 2. Open 8 PIBA Hebrew Forms Engine]]",
        "[[NAV:sync|modal|🔗 3. Sync Devices / Recover Pass Code]]"
      ].join("\n");
      return {
        routeKey: "cry_for_help",
        reply: cryHeader + "\n\n" + fallbackNavs + "\n\n" + buildCryForHelpWidgetTag(q),
        autoNav: ""
      };
    }

    // E. Lost Visitor / General "Where do I start / What do I need" Query
    if (/(where do i start|how does this work|what do i need|lost|help|guide|איפה מתחילים|איך זה עובד|מה אני צריך|comment commencer|por dónde empiezo|wie fange ich an|с чего начать)/i.test(ql)) {
      const startHeader = l === "he"
        ? "🧭 **ברוכים הבאים! כך תמצאו בדיוק את מה שאתם צריכים ב-30 שניות:**\n\nפתחנו עבורכם את אבחון 3 המסלולים בדף הבית. בחרו את המסלול שלכם או דלגו ישירות לאחד הכלים הבאים (מדורגים לפי התאמה):"
        : "🧭 **Here Is How to Find Exactly What You Need in 30 Seconds:**\n\nWe've opened the 3-Track Diagnostic Playbook for you—or tap any of our top modules below (ordered by match):";
      const startNavs = [
        "[[NAV:tab|0|🎯 1. Start: 3-Button Track Diagnostic Playbook]]",
        "[[NAV:hebrew-engine|ash6|🔗 2. Auto-Fill All 8 Hebrew PIBA Forms]]",
        "[[NAV:obs|1|🔗 3. The 5 Mandatory Apostilled Docs & 180d Clock]]",
        "[[NAV:pricing||🔗 4. View All 23 Digital Passes & Concierge Pricing]]"
      ].join("\n");
      return {
        routeKey: "general_start",
        reply: startHeader + "\n\n" + startNavs,
        autoNav: "tab|0"
      };
    }

    return null;
  };
})();


// ============================================================================
// UNIFIED PRE-AI & PAID-MEMBER ROUTER + CROSS-PAGE AUTO-NAVIGATOR (V2)
// ============================================================================
(function initUnifiedSmartRouterV2() {
  function getLangCode() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (["en", "he", "fr", "es", "de", "ru"].includes(pathLang)) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return ["en", "he", "fr", "es", "de", "ru"].includes(l) ? l : "en";
  }

  function getApiEndpoint() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  // Check if current user holds an active paid pass
  window.isGatUserPaid = function() {
    try {
      if (typeof window.isProUnlocked === "function" && window.isProUnlocked()) return true;
      if (typeof window.hasFormsEngineAccess === "function" && window.hasFormsEngineAccess()) return true;
      if (localStorage.getItem("gat_pro_unlocked") === "1") return true;
      const tier = String(localStorage.getItem("gat_tier") || "").trim();
      if (tier && tier !== "free" && tier !== "guest" && tier !== "none") return true;
    } catch (e) {}
    return false;
  };

  // Dock/peek mode so when auto-nav opens a popup or form behind the chat, the user can see BOTH!
  function ensurePeekModeStyles() {
    if (document.getElementById("gat-hd-peek-css")) return;
    const st = document.createElement("style");
    st.id = "gat-hd-peek-css";
    st.textContent = `
      #gat-hd-drawer.gat-hd-peek {
        height: min(370px, 52dvh) !important;
        box-shadow: 0 -8px 34px rgba(8, 37, 72, 0.45) !important;
      }
      #gat-hd-wa { display: none !important; }
    `;
    document.head.appendChild(st);
  }

  // Execute Same-Page OR Cross-Page Navigation
  window.gatExecuteSmartNav = function(targetSpec, shouldMinimizeDrawer, isAutoTriggered) {
    ensurePeekModeStyles();
    if (!targetSpec) return;
    const parts = String(targetSpec).split("|");
    const kind = (parts[0] || "").trim();
    const arg = (parts[1] || "").trim();
    const l = getLangCode();
    const homeBase = l === "en" ? "/" : ("/" + l + "/");
    const isOnHomeHub = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
    const isOnAppPage = window.location.pathname.indexOf("/app") === 0 && typeof window.openMod === "function";

    const drw = document.getElementById("gat-hd-drawer");
    if (shouldMinimizeDrawer && typeof window.toggleGatHelpdesk === "function") {
      window.toggleGatHelpdesk(false, true);
    } else if (isAutoTriggered && drw && drw.classList.contains("open")) {
      drw.classList.add("gat-hd-peek");
    }

    function redirectWithChatRestore(url) {
      try {
        if (isAutoTriggered) {
          sessionStorage.setItem("gat_reopen_hd_after_nav", "1");
        }
      } catch (e) {}
      setTimeout(function() {
        window.location.href = url;
      }, isAutoTriggered ? 320 : 10);
    }

    if (kind === "obs") {
      if (isOnHomeHub && typeof window.openObstacle === "function") {
        window.openObstacle(Number(arg) || 0);
      } else {
        redirectWithChatRestore(homeBase + "?obs=" + encodeURIComponent(arg || "0"));
      }
      return;
    }
    if (kind === "term") {
      if (isOnHomeHub && typeof window.openTerm === "function") {
        window.openTerm(arg || "go_bag");
      } else {
        redirectWithChatRestore(homeBase + "?term=" + encodeURIComponent(arg || "go_bag"));
      }
      return;
    }
    if (kind === "tab") {
      const tIdx = Number(arg) || 0;
      if (isOnHomeHub && typeof window.switchTab === "function") {
        window.switchTab(tIdx);
      } else {
        redirectWithChatRestore(homeBase + "?tab=" + tIdx);
      }
      return;
    }
    if (kind === "profile") {
      if (typeof window.openGatProfileModal === "function") {
        window.openGatProfileModal();
      }
      return;
    }
    if (kind === "sync") {
      if (typeof window.openDeviceSyncModal === "function") {
        window.openDeviceSyncModal();
      } else {
        redirectWithChatRestore("/app/?sync=1");
      }
      return;
    }
    if (kind === "pricing") {
      const targetUrl = (l === "en" ? "/pricing/" : ("/" + l + "/pricing/")) + (arg ? ("?sku=" + encodeURIComponent(arg) + "&lang=" + l) : ("?lang=" + l));
      if (window.location.pathname.indexOf("/pricing") === 0 && !arg) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        redirectWithChatRestore(targetUrl);
      }
      return;
    }
    if (kind === "concierge") {
      const targetUrl = (l === "en" ? "/concierge-booking/" : ("/" + l + "/concierge-booking/")) + (arg ? ("?sku=" + encodeURIComponent(arg) + "&lang=" + l) : ("?lang=" + l));
      if (window.location.pathname.indexOf("/concierge-booking") === 0 && !arg) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        redirectWithChatRestore(targetUrl);
      }
      return;
    }

    // Otherwise `kind` is an /app/ module (`hebrew-engine`, `beit-din-150`, `couples-sync`, `songs-prayers`, `rabbi-letters`, `vetted-team`)
    let modName = kind;
    if (modName === "beit-din") modName = "beit-din-150";
    if (modName === "couples-sim") modName = "couples-sync";

    if (isOnAppPage) {
      window.openMod(modName);
      if (arg) {
        window.activePibaFormKey = arg;
        setTimeout(function() {
          if (typeof window.selectPibaForm === "function") window.selectPibaForm(arg);
          else if (typeof window.switchActivePibaForm === "function") window.switchActivePibaForm(arg);
          else {
            const btn = document.querySelector('[data-form-key="' + arg + '"], button[onclick*="\'' + arg + '\'"]');
            if (btn && typeof btn.click === "function") btn.click();
          }
        }, 90);
      }
    } else {
      redirectWithChatRestore("/app/?module=" + encodeURIComponent(modName) + (arg ? ("&form=" + encodeURIComponent(arg)) : ""));
    }
  };

  window.gatNavigateAndMinimize = function(modName, formKey, shouldMinimize) {
    window.gatExecuteSmartNav((modName || "hebrew-engine") + "|" + (formKey || ""), shouldMinimize !== false, false);
  };

  // Restore chat drawer in peek mode if we just auto-navigated across pages
  setTimeout(function() {
    try {
      if (sessionStorage.getItem("gat_reopen_hd_after_nav") === "1") {
        sessionStorage.removeItem("gat_reopen_hd_after_nav");
        ensurePeekModeStyles();
        if (typeof window.toggleGatHelpdesk === "function") {
          window.toggleGatHelpdesk(true);
          const drw = document.getElementById("gat-hd-drawer");
          if (drw) drw.classList.add("gat-hd-peek");
        }
      }
    } catch (e) {}
  }, 420);

  // Build "What We Unlock for You When You Upgrade" response for Unpaid Visitors asking execution/custom questions
  function buildUnpaidUpgradeGateResponse(userQuery, l, bestNavSpec) {
    const primarySpec = bestNavSpec || (window.location.pathname.indexOf("/app") === 0 ? ("hebrew-engine|" + (window.activePibaFormKey || "ash6")) : "pricing|");
    if (l === "he") {
      const bodyHe = [
        "🔓 **שמחים לעזור! כדי שנוכל למלא איתכם את השדות, לתרגם לעברית תקנית של משרד הפנים ולהכין עבורכם ניסוחים מותאמים אישית, נדרש מנוי פעיל.**",
        "",
        "המדריכים ואבחון המסלולים באתר פתוחים ב-100% בחינם. **ברגע שתשדרגו לאחד המסלולים שלנו, אני והמערכת נלווה אתכם אישית צעד-אחר-צעד:**",
        "• 📄 **מילוי והחתמת כל 8 טפסי משרד הפנים (PIBA):** העלאת תעודות ומילוי אוטומטי בעברית תקנית בטפסי אש/1, אש/3, אש/6, אש/456, מר/14א׳, מר/14ב׳, נספח א׳ ושאלון קורות חיים ($89 ל-90 יום / $149 לכל החיים).",
        "• ✍️ **ניסוח מכתבי הסבר (מכתב הסבר / הארכת מועד / שיקום) ומכתבי רב ומשפחה מארחת:** מותאמים אישית לתיק שלכם.",
        "• 🕍 **הכנה מלאה לבית הדין:** כל 700 השאלות (כולל 200 שאלות מתקילות של דיינים) + 56 שירי שבת, תפילות וברכות ($149 ל-90 יום / $249 לכל החיים, או חבילות בודדות החל מ-$49).",
        "• 📱 **אימון שימוע זוגי ב-2 טלפונים (300 שאלות):** סנכרון חי בינכם וזיהוי סתירות לפני הראיון בלשכה ($129 ל-90 יום / $229 לכל החיים).",
        "• 🤝 **ליווי אנושי מאומת (הצעת מחיר ב-$0 מראש):** נוטריון סרט אדום, רב מלווה מוכר, מדריכת כלה, או עורך דין מלווה ללשכה.",
        "",
        "[[NAV:pricing||💎 1. צפייה בכל 23 המסלולים ושדרוג מיידי]]",
        "[[NAV:" + primarySpec + "|📄 2. פתיחת הכלי הרלוונטי לתצוגה מקדימה]]",
        "[[NAV:concierge||🤝 3. בקשת הצעת מחיר לנוטריון / רב / עו״ד]]",
        "[[NAV:sync|modal|📲 4. כבר רכשתם? לחצו לסנכרון מכשירים וקוד גישה]]"
      ].join("\n");
      return { routeKey: "unpaid_upgrade_gate", reply: bodyHe, autoNav: primarySpec };
    }

    const bodyEn = [
      "🔓 **I Can Walk You Through Every Detail of That Once You Upgrade Your Pass!**",
      "",
      "All of our statutory playbooks, track diagnostics, and preview cards are 100% free. **As soon as you unlock a pass, I step in to help you execute your file hands-on:**",
      "• 📄 **Fill, Translate & Stamp All 8 Official Hebrew PIBA Forms:** Upload your documents once to auto-fill Forms `Ash/1`, `Ash/3`, `Ash/6`, `Ash/456`, `MR/14a`, `MR/14b`, `Nespach Alef`, and the 11-page `Security CV` in official Clerk Hebrew ($89 90-Day / $149 Lifetime).",
      "• ✍️ **Draft Custom Hebrew Letters & Explanations:** Generate your formal Hebrew *Michtav Hesber* (Explanation Letter), 30-Day Extension Request, Criminal Record Rehabilitation Letter, and Orthodox Rabbi/Host Family reference drafts.",
      "• 🕍 **Master the Beit Din Tribunal (700 Questions & 56 Songs):** Unlock all 4 flashcard decks (Core 200, +200 Curveballs, Men's 150, Women's 150) + all 56 Shabbat Songs, Prayers & Brachot ($149 90-Day / $249 Lifetime, or sub-packs from $49).",
      "• 📱 **Sync on 2 Phones for the 300-Question Couples Interview:** Practice from opposite sides of the couch and catch every mismatch before Misrad HaPanim separates you ($129 90-Day / $229 5-Year Lifetime).",
      "• 👑 **Full Dual-Track VIP Suites ($249–$649) & Vetted Human Team ($0 Upfront Quote):** Red-Ribbon Israeli Notary, Sponsoring Rabbi, Madrichat Kallah, and 1-Hour Lawyer Branch Escort.",
      "",
      "[[NAV:pricing||💎 1. View All 23 Passes & Upgrade Now]]",
      "[[NAV:" + primarySpec + "|🎯 2. Open Tool Preview on Screen]]",
      "[[NAV:concierge||🤝 3. Request Vetted Notary / Rabbi / Lawyer Quote ($0 Upfront)]]",
      "[[NAV:sync|modal|📲 4. Already Upgraded? Sync Devices / Enter Pass Code]]"
    ].join("\n");
    return { routeKey: "unpaid_upgrade_gate", reply: bodyEn, autoNav: primarySpec };
  }

  // Detect broad "Which form do I need?" / "I want to make Aliyah" / "How do I start?" questions
  const WHICH_FORM_RX = /(what form|which form|all forms|8 forms|fill out|forms do i need|איזה טופס|אילו טפסים|למלא טופס|quel formulaire|qué formulario|welches formular|какую анкету|какие анкеты|какую форму)/i;
  const GENERAL_ALIYAH_RX = /(make aliyah|making aliyah|want aliyah|how to aliyah|aliyah process|לעשות עלייה|רוצה לעלות|הליך עלייה|faire son aliyah|hacer aliyá|alija machen|сделать алию|репатриироваться)/i;
  const HANDS_ON_EXECUTION_RX = /(help me fill|how do i fill|what do i put in|what should i write|translate this|translate my|write my letter|draft a letter|draft my|check my answer|in box|in field|section \d|page \d|לעזור לי למלא|מה לכתוב ב|תרגם לי|תכתוב לי מכתב|איך ממלאים את שדה|помогите заполнить|что писать в|переведи|напиши письмо)/i;

  const origMatchPreAi = window.matchPreAiInstantRoute;

  window.matchPreAiInstantRoute = function(rawText, lang) {
    const q = String(rawText || "").trim();
    const ql = q.toLowerCase();
    if (!ql) return null;
    const l = getLangCode();
    const paid = window.isGatUserPaid();

    // 1. Always catch explicit Fiance Triage button taps (FIANCE_IL:, FIANCE_FJ:, FIANCE_OT:)
    if (/^(FIANCE_IL:|FIANCE_FJ:|FIANCE_OT:)/i.test(q) && typeof origMatchPreAi === "function") {
      return origMatchPreAi(rawText, lang);
    }

    // 2. Always catch Human Escalation / Paid-Unlock / Bug / Cry for Help (for both paid and unpaid users)
    if (/(human|person|agent|representative|someone|operator|talk to|speak to|speak with|paid|unlock|still locked|didn.?t unlock|didnt unlock|can.?t unlock|cant unlock|revolut|receipt|not working|doesn.?t work|doesnt work|won.?t work|broken|bug|glitch|error|stuck|wrong field|didn.?t populate|didnt populate|doesn.?t populate|doesnt populate|can.?t upload|cant upload|won.?t upload|נציג|אנושי|בן אדם|מישהו|לדבר עם|שילמתי|נעול|לפתוח|תקלה|בעיה|לא עובד|לא מתמלא|נתקע|שגיאה|humain|personne|payé|bloqué|problème|humano|persona|pagué|bloqueado|problema|mensch|jemand|bezahlt|fehler|человек|оператор|оплатил|заблокирован|не работает|ошибка)/i.test(ql)) {
      if (typeof origMatchPreAi === "function") {
        const hit = origMatchPreAi(rawText, lang);
        if (hit) return hit;
      }
    }

    // 3. IF USER IS PAID: Step out of the way so our calibrated backend assistant answers their specific question!
    if (paid) {
      return null;
    }

    // 4. IF USER IS UNPAID:
    //    4A. If they ask for hands-on form filling, translation, or letter writing -> Show Upgrade Gate + Open Tool Preview!
    if (HANDS_ON_EXECUTION_RX.test(ql)) {
      let bestTarget = "hebrew-engine|ash6";
      if (/ash\s*\/?\s*1|charigim|חריגים/i.test(ql)) bestTarget = "hebrew-engine|ash1";
      else if (/ash\s*\/?\s*3|extension|הארכת/i.test(ql)) bestTarget = "hebrew-engine|ash3";
      else if (/456|shinui|aliyah|עלייה/i.test(ql)) bestTarget = "hebrew-engine|ash456";
      else if (/mr\s*\/?\s*14|zehut|זהות/i.test(ql)) bestTarget = "hebrew-engine|mr14a";
      else if (/nespach|נספח/i.test(ql)) bestTarget = "hebrew-engine|nespach_alef";
      else if (/security|cv|קורות חיים/i.test(ql)) bestTarget = "hebrew-engine|sec_cv";
      else if (/rabbi|letter|מכתב/i.test(ql)) bestTarget = "rabbi-letters|";
      return buildUnpaidUpgradeGateResponse(q, l, bestTarget);
    }

    //    4B. "What form do I need to fill out?" -> Complete 8-Form Breakdown + Auto-Nav to Forms Engine
    if (WHICH_FORM_RX.test(ql)) {
      const formGuideEn = [
        "📄 **Which Official Misrad HaPanim (PIBA) Form Do You Need? (Opening the 8-Form Engine for You Now):**",
        "",
        "• **💍 Married to an Israeli Citizen (*Nohal 5.2.0008*):** File **Form Ash/6** (6-page Spousal Dossier) + **11-Page Security CV**.",
        "• **💑 Unmarried Partner of an Israeli (*Nohal 5.2.0009*):** File **Form Ash/6** + **Nespach Alef** (13-Clause Affidavit) + **Security CV**.",
        "• **🏛️ Tourist Applying for State Giyur (*Va'adat Charigim*):** File **Form Ash/1** + **Form Ash/3** (Visa Extension / A/2 Student) + Hebrew *Michtav Hesber*.",
        "• **✈️ Making Aliyah from Inside Israel (*Shinui Ma'amad* • *Nohal 5.2.0001*):** File **Form Ash/456** + **Form MR/14a** (First Teudat Zehut) + **Form MR/14b** (Passport Declaration).",
        "",
        "[[NAV:hebrew-engine|ash6|🎯 1. Open Statutory Hebrew 8-Forms Engine]]",
        "[[NAV:obs|1|🔗 2. Backup: The 5 Mandatory Apostilled Homeland Docs]]",
        "[[NAV:pricing||🔗 3. Backup: Unlock 8-Forms Auto-Filler ($89 90-Day / $149 Lifetime)]]",
        "[[NAV:concierge||🔗 4. Backup: Book Red-Ribbon Notary or 1-Hr Lawyer Escort]]"
      ].join("\n");
      const formGuideHe = [
        "📄 **איזה טופס של משרד הפנים (PIBA) אתם צריכים למלא? (פותח עבורכם את מנוע 8 הטפסים):**",
        "",
        "• **💍 נשואים לאזרח/ית ישראלי/ת (נוהל 5.2.0008):** **טופס אש/6** (6 עמ׳) + **שאלון קורות חיים (11 עמ׳)**.",
        "• **💑 ידועים בציבור (נוהל 5.2.0009):** **טופס אש/6** + **תצהיר נספח א׳** + **שאלון קורות חיים**.",
        "• **🏛️ תיירים המבקשים גיור ממלכתי (ועדת חריגים):** **טופס אש/1** + **טופס אש/3** (הארכת אשרה / א/2) + מכתב הסבר.",
        "• **✈️ עלייה מתוך ישראל (שינוי מעמד • נוהל 5.2.0001):** **טופס אש/456** + **טופס מר/14א׳** (ת״ז ראשונה) + **טופס מר/14ב׳**.",
        "",
        "[[NAV:hebrew-engine|ash6|🎯 1. פתיחת מנוע 8 טפסי משרד הפנים בעברית]]",
        "[[NAV:obs|1|🔗 2. מדריך: 5 תעודות האפוסטיל ושעון 180 הימים]]",
        "[[NAV:pricing||🔗 3. פתיחת מנוי מנוע הטפסים ($89 ל-90 יום / $149 לכל החיים)]]",
        "[[NAV:concierge||🔗 4. הזמנת תרגום נוטריוני או ליווי עו״ד ללשכה]]"
      ].join("\n");
      return {
        routeKey: "which_form_guide",
        reply: l === "he" ? formGuideHe : formGuideEn,
        autoNav: "hebrew-engine|ash6"
      };
    }

    //    4C. "I want to make Aliyah" / General Aliyah Route
    if (GENERAL_ALIYAH_RX.test(ql) && !/(gush etzion|private|dahan|spousal|married)/i.test(ql)) {
      const aliyahEn = [
        "✈️ **Your Complete Aliyah Playbook (Abroad Go-Bag vs. In-Israel *Shinui Ma'amad*):**",
        "",
        "1. **Still Abroad?** Pull all **5 double-Apostilled civil documents** (Long-Form Birth Cert with both parents, FBI/Police Check <180d, Single/Marital Proof, Orthodox *Ishur Yahadut*) into your carry-on Go-Bag before boarding.",
        "2. **Already in Israel on a Tourist Visa (*Shinui Ma'amad* • *Nohal 5.2.0001*)?** File **Form Ash/456** (exempt from the 955₪ fee under Sec. ג.7) + **MR/14a & MR/14b**. Watch out for the **24-Month *Sal Klita* Cliff** (>24 cumulative months in Israel in the last 3 years forfeits ~21,700₪)!",
        "",
        "[[NAV:term|five_docs|🎯 1. Best Match: 5 Apostilled Docs & 24-Mo Sal Klita Guide]]",
        "[[NAV:hebrew-engine|ash456|🔗 2. Backup: Open Form Ash/456 & MR/14 In-Israel Aliyah Engine]]",
        "[[NAV:term|go_bag|🔗 3. Backup: 7-Day Pre-Flight Go-Bag Checklist]]",
        "[[NAV:term|fx_shield|🔗 4. Backup: Pay Rent in ₪ & 60–90d Bridge Health Insurance]]"
      ].join("\n");
      const aliyahHe = [
        "✈️ **המדריך המלא לעלייה לישראל (תיק חירום מחו״ל או שינוי מעמד מתוך ישראל):**",
        "",
        "1. **עדיין בחו״ל?** הוציאו ידנית את כל **5 תעודות המקור עם חותמת אפוסטיל** (תעודת לידה מורחבת עם שמות שני ההורים, תעודת יושר <180 יום, תמצית רווקות/נישואין ואישור יהדות אורתודוקסי) לפני הטיסה.",
        "2. **כבר בישראל (שינוי מעמד • נוהל 5.2.0001)?** הגישו **טופס אש/456** (פטור מאגרת 955 ₪ לפי סעיף ג.7) + **טופס מר/14א׳ ומר/14ב׳**. שימו לב לכלל **24 החודשים של סל קליטה**!",
        "",
        "[[NAV:term|five_docs|🎯 1. התאמה מלאה: מדריך 5 תעודות האפוסטיל וכלל 24 חודשי סל קליטה]]",
        "[[NAV:hebrew-engine|ash456|🔗 2. פתיחת מנוע טופס אש/456 ומר/14 לעלייה מתוך ישראל]]",
        "[[NAV:term|go_bag|🔗 3. רשימת תיק חירום לטיסה (Go-Bag)]]",
        "[[NAV:term|fx_shield|🔗 4. תשלום שכ״ד ב-₪ וביטוח בריאות גישור ל-60–90 יום]]"
      ].join("\n");
      return {
        routeKey: "general_aliyah_guide",
        reply: l === "he" ? aliyahHe : aliyahEn,
        autoNav: "term|five_docs"
      };
    }

    //    4D. Run the 22-Intent Weighted Scorer
    if (typeof origMatchPreAi === "function") {
      const scoredHit = origMatchPreAi(rawText, lang);
      if (scoredHit) return scoredHit;
    }

    //    4E. Catch-All for Any Other Unpaid Question (Zero Paid Backend Calls for Unpaid Visitors!)
    return buildUnpaidUpgradeGateResponse(q, l, "tab|0");
  };

  // Unified sendGatHelpdeskMsg that runs on BOTH `/` and `/app/` and executes Auto-Nav!
  window.sendGatHelpdeskMsg = async function(optionalText, overrideMod, overrideForm) {
    ensurePeekModeStyles();
    const l = getLangCode();
    const inp = document.getElementById("gat-hd-input");
    const msgs = document.getElementById("gat-hd-msgs");
    const text = (optionalText || (inp ? inp.value : "")).trim();
    if (!text || !msgs) return;
    if (!optionalText && inp) inp.value = "";

    const uBub = document.createElement("div");
    uBub.className = "gat-hd-bubble user";
    uBub.textContent = text.replace(/^(FIANCE_IL:|FIANCE_FJ:|FIANCE_OT:|\[fiance_[^\]]+\])\s*/i, "");
    msgs.appendChild(uBub);

    const loadingBub = document.createElement("div");
    loadingBub.className = "gat-hd-bubble bot";
    loadingBub.innerHTML = "⏳ <em>...</em>";
    msgs.appendChild(loadingBub);
    msgs.scrollTop = msgs.scrollHeight;

    const tObj = { jumpReadBtn: l === "he" ? "📖 מזער וצפה בעמוד (לחצו ✨ לחזרה)" : "📖 Minimize & Read Page (Tap ✨ to Resume)" };
    const preAiHit = window.matchPreAiInstantRoute(text, l);

    if (preAiHit) {
      const cleanUserText = uBub.textContent;
      const parsedPre = (window.gatParseReplyAndBuildHtml || function(r){ return { html: r }; })(preAiHit.reply, tObj);
      loadingBub.innerHTML = parsedPre.html;
      try {
        const nextHistPre = (window._gatHelpdeskHistory || []).concat([
          { role: "user", text: cleanUserText },
          { role: "model", text: preAiHit.reply, routeKey: preAiHit.routeKey || "" }
        ]).slice(-10);
        window._gatHelpdeskHistory = nextHistPre;
        localStorage.setItem("gat_helpdesk_hist_v2", JSON.stringify(nextHistPre));
      } catch (e) {}

      // Execute Auto-Navigation (Same-Page OR Cross-Page) when `autoNav` is set!
      const targetSpec = preAiHit.autoNav || (parsedPre.navMod ? (parsedPre.navMod + "|" + (parsedPre.navForm || "")) : "");
      if (targetSpec && typeof window.gatExecuteSmartNav === "function") {
        window.gatExecuteSmartNav(targetSpec, false, true);
      }
      setTimeout(function() { msgs.scrollTop = Math.max(0, loadingBub.offsetTop - 8); }, 30);
      return;
    }

    // Paid Member Backend Call
    try {
      const res = await fetch(getApiEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "helpdesk_chat",
          uid: window.gatUid || localStorage.getItem("gat_uid") || "anon",
          lang: l,
          currentMod: overrideMod || window.currentMod || "landing",
          currentForm: overrideForm || window.activePibaFormKey || "ash1",
          formSnapshot: (function() {
            const st = window.gatFormsState || {};
            return {
              activeForm: overrideForm || window.activePibaFormKey || "ash1",
              visaType: st.pf_current_visa_type || "",
              visaExpiry: st.pf_visa_expiry_date || "",
              entryDate: st.pf_entry_date_il || "",
              maritalStatus: st.pf_marital || st.pf_marital_status || "",
              countryOfBirth: st.pf_birth_country || ""
            };
          })(),
          message: text,
          history: window._gatHelpdeskHistory || []
        })
      });
      const data = await res.json();
      const rawReply = (data && data.reply) ? data.reply : "";
      const parsed = (window.gatParseReplyAndBuildHtml || function(r){ return { html: r }; })(rawReply, tObj);
      loadingBub.innerHTML = parsed.html;

      try {
        const nextHist = (window._gatHelpdeskHistory || []).concat([
          { role: "user", text: text },
          { role: "model", text: rawReply }
        ]).slice(-10);
        window._gatHelpdeskHistory = nextHist;
        localStorage.setItem("gat_helpdesk_hist_v2", JSON.stringify(nextHist));
      } catch (e) {}

      const autoSpec = (parsed.navMod && parsed.navMod !== "paywall" && parsed.navMod !== "pricing" && parsed.navMod !== "concierge")
        ? (parsed.navMod + "|" + (parsed.navForm || ""))
        : (window._lastScoredAutoNavSpec || "");
      if (autoSpec && typeof window.gatExecuteSmartNav === "function") {
        const spParts = String(autoSpec).split("|");
        const spKind = spParts[0];
        const onHome = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
        const onApp = window.location.pathname.indexOf("/app") === 0 && typeof window.openMod === "function";
        if ((onHome && ["obs", "term", "tab"].includes(spKind)) || (onApp && !["obs", "term", "tab", "pricing", "concierge"].includes(spKind))) {
          window.gatExecuteSmartNav(autoSpec, false, true);
        }
      }
    } catch (err) {
      const fallback = buildUnpaidUpgradeGateResponse(text, l, "tab|0");
      const parsedFb = (window.gatParseReplyAndBuildHtml || function(r){ return { html: r }; })(fallback.reply, tObj);
      loadingBub.innerHTML = parsedFb.html;
    }
    setTimeout(function() { msgs.scrollTop = Math.max(0, loadingBub.offsetTop - 8); }, 30);
  };
})();


// ============================================================================
// SINGLE SOURCE OF TRUTH FOR LOGIN, UID, PASS CODE & CLOUD SYNC (window.GAT_AUTH)
// ============================================================================
(function initGatUnifiedAuthAuthority() {
  function normWaDigits(raw) {
    let d = String(raw || "").replace(/\D/g, "");
    if (!d) return "";
    if (d.length === 10 && d.indexOf("05") === 0) d = "972" + d.slice(1);
    else if (d.length === 9 && d.indexOf("5") === 0) d = "972" + d;
    return d.length >= 8 ? d : "";
  }

  // Mirror all legacy & current localStorage keys so every script sees the exact same state
  window.syncAllGatAuthStorageKeys = function(opts) {
    opts = opts || {};
    try {
      // 1. WhatsApp Phone
      const rawWa = opts.waPhone || localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
      const wa = normWaDigits(rawWa);
      if (wa) {
        localStorage.setItem("gat_verified_wa_phone", wa);
        localStorage.setItem("gat_wa_phone", wa);
      }

      // 2. Pass Code
      const rawCode = String(opts.passCode || localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_pass_code") || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (rawCode && rawCode.length >= 5) {
        localStorage.setItem("gat_permanent_pass_code", rawCode);
        localStorage.setItem("gat_pass_code", rawCode);
      }

      // 3. Master UID (Never let an anonymous random UID overwrite a verified `wa_...` UID!)
      let storedUid = opts.uid || localStorage.getItem("gat_uid") || window.gatUid || "";
      if (wa && (!storedUid || storedUid.indexOf("wa_") !== 0)) {
        storedUid = "wa_" + wa;
      }
      if (storedUid && storedUid !== "anon") {
        localStorage.setItem("gat_uid", storedUid);
        window.gatUid = storedUid;
      }

      // 4. Email (if Google / backup email linked)
      const em = opts.email || localStorage.getItem("gat_user_email") || "";
      if (em && em.indexOf("@") !== -1) {
        localStorage.setItem("gat_user_email", em.trim());
      }

      // 5. Custom Token (for cross-page Firebase Auth sign-in)
      if (opts.customToken) {
        localStorage.setItem("gat_auth_custom_token", opts.customToken);
      }

      // 6. Pro Unlocked & Tier Mirroring
      const rawPro = opts.unlocked !== undefined ? Boolean(opts.unlocked) : (
        localStorage.getItem("gat_pro_unlocked") === "true" ||
        localStorage.getItem("gat_pro_unlocked") === "1"
      );
      if (rawPro) {
        localStorage.setItem("gat_pro_unlocked", "true");
      }
      const rawTier = opts.tier || localStorage.getItem("gat_pro_tier") || localStorage.getItem("gat_unlocked_tier") || localStorage.getItem("gat_tier") || "";
      if (rawTier && rawTier !== "free" && rawTier !== "guest") {
        localStorage.setItem("gat_pro_tier", rawTier);
        localStorage.setItem("gat_unlocked_tier", rawTier);
        localStorage.setItem("gat_tier", rawTier);
      }
    } catch (e) {}
  };

  // Definitive check: Is the user logged into a real account (WhatsApp, Pass Code, or Google)?
  window.isGatUserLoggedIn = function() {
    try {
      window.syncAllGatAuthStorageKeys();
      const wa = localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
      if (wa && wa.length >= 8) return true;
      const code = localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_pass_code") || "";
      if (code && code.length >= 5) return true;
      const uid = localStorage.getItem("gat_uid") || window.gatUid || "";
      if (uid && uid.indexOf("wa_") === 0) return true;
      const em = localStorage.getItem("gat_user_email") || "";
      if (em && em.indexOf("@") !== -1) return true;
      if (typeof firebase !== "undefined" && firebase.auth && firebase.auth().currentUser) {
        const u = firebase.auth().currentUser;
        if (!u.isAnonymous) return true;
        if (u.uid && u.uid.indexOf("wa_") === 0) return true;
      }
    } catch (e) {}
    return false;
  };

  window.getGatUserDisplayLabel = function() {
    try {
      window.syncAllGatAuthStorageKeys();
      const wa = localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
      const code = localStorage.getItem("gat_permanent_pass_code") || "";
      const em = localStorage.getItem("gat_user_email") || "";
      const u = (typeof firebase !== "undefined" && firebase.auth) ? firebase.auth().currentUser : null;
      const emailStr = em || (u && u.email) || "";
      const parts = [];
      if (wa) parts.push("+" + wa);
      else if (emailStr) parts.push(emailStr);
      if (code) parts.push("Pass: " + code);
      if (parts.length > 0) return parts.join(" • ");
      const uid = localStorage.getItem("gat_uid") || window.gatUid || "";
      if (uid && uid.indexOf("wa_") === 0) return "+" + uid.slice(3);
    } catch (e) {}
    return "";
  };

  // Restore full server session if the user has a Pass Code or Verified WhatsApp in localStorage
  window.restoreGatSessionFromServerIfNeeded = async function() {
    window.syncAllGatAuthStorageKeys();
    if (!window.isGatUserLoggedIn()) return;
    if (window._gatRestoringSession) return;
    window._gatRestoringSession = true;
    try {
      const uid = localStorage.getItem("gat_uid") || window.gatUid || "";
      const wa = localStorage.getItem("gat_verified_wa_phone") || "";
      const code = localStorage.getItem("gat_permanent_pass_code") || "";
      const apiUrl = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ? "https://giyuraliyahtrack.com/api/auditDoc"
        : "/api/auditDoc";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "restore_wa_session",
          uid: uid,
          waPhone: wa,
          passCode: code
        })
      });
      const data = await res.json();
      if (data && data.ok && data.masterUid) {
        window.syncAllGatAuthStorageKeys({
          uid: data.masterUid,
          waPhone: data.whatsappDigits || wa,
          passCode: data.passCode || code,
          customToken: data.customToken || "",
          unlocked: data.userData && data.userData.unlocked,
          tier: data.userData && data.userData.tier
        });
        if (data.customToken && typeof firebase !== "undefined" && firebase.auth) {
          const curU = firebase.auth().currentUser;
          if (!curU || curU.isAnonymous || curU.uid !== data.masterUid) {
            try { await firebase.auth().signInWithCustomToken(data.customToken); } catch (e) {}
          }
        }
        if (data.userData && typeof window.applyMergedServerDossierToLocal === "function") {
          window.applyMergedServerDossierToLocal(data.userData);
        }
        window.refreshAllGatAuthIndicators();
      }
    } catch (e) {}
  };

  // Refresh EVERY badge, dot, header, and banner across the page so there is ZERO contradiction!
  window.refreshAllGatAuthIndicators = function() {
    window.syncAllGatAuthStorageKeys();
    const loggedIn = window.isGatUserLoggedIn();
    const label = window.getGatUserDisplayLabel();
    const isPro = (typeof window.isGatUserPaid === "function" && window.isGatUserPaid());

    // 1. Top Appbar Profile Dot
    const dot = document.getElementById("appbar-profile-dot");
    if (dot) {
      dot.style.background = loggedIn ? "#22c55e" : "#f59e0b";
      dot.title = loggedIn ? ("Signed In: " + label) : "Guest Device (Tap to Sync)";
    }

    // 2. Sync Modal Account Badge (#sync-acct-badge & #top-sync-lbl)
    const badge = document.getElementById("sync-acct-badge");
    const topLbl = document.getElementById("top-sync-lbl");
    if (badge) {
      if (loggedIn) {
        badge.innerHTML = "✅ <strong>Signed In &amp; Cloud Synced:</strong> " + (label || "Active Account") +
          (isPro ? ' <span style="background:#059669;color:#fff;padding:2px 8px;border-radius:999px;font-size:0.72rem;margin-inline-start:6px;">PRO</span>' : '');
      } else if (typeof window.deviceHasActiveDataOrPass === "function" && window.deviceHasActiveDataOrPass()) {
        badge.innerHTML = "🟠 <strong>Saved on This Device Only</strong> — Link your WhatsApp or save your Pass Code below to sync across devices.";
      }
    }
    if (topLbl && loggedIn && label) {
      topLbl.textContent = label.split("•")[0].trim();
    }

    // 3. Hide any "Not logged in?" banners when the user IS logged in!
    document.querySelectorAll("[id*='pw-sync-banner'], .pw-sync-banner").forEach(function(el) {
      el.style.display = loggedIn ? "none" : "";
    });

    // 4. Update Master Dossier Card Title in forms_vault.js so it reflects real sync status
    const dosCard = document.getElementById("pf-master-dossier-bar");
    if (dosCard) {
      const hEl = dosCard.querySelector("h3, .dos-title-el, div[style*='font-weight:900']");
      if (hEl && /Synced to Server|מסונכרן לשרת|Synchronisé|Sincronizado|Synchronisiert|Синхронизация|Saved on This Device/i.test(hEl.textContent || "")) {
        const baseTitle = (hEl.textContent || "").replace(/\s*\((?:Synced to Server|Cloud Synced[^)]*|Saved on This Device[^)]*|מסונכרן[^)]*)\)/gi, "").trim();
        hEl.textContent = baseTitle + (loggedIn ? (" (🟢 Cloud Synced" + (label ? ": " + label.split("•")[0].trim() : "") + ")") : " (🟠 Local Device Draft — Tap 👤 to Sync)");
      }
    }
  };

  window.syncAllGatAuthStorageKeys();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      window.refreshAllGatAuthIndicators();
      setTimeout(window.restoreGatSessionFromServerIfNeeded, 250);
    });
  } else {
    window.refreshAllGatAuthIndicators();
    setTimeout(window.restoreGatSessionFromServerIfNeeded, 250);
  }
  setInterval(window.refreshAllGatAuthIndicators, 2500);
})();


// ============================================================================
// CROSS-PAGE INDEXEDDB + LOCALSTORAGE AUTH DETECTOR & GATED PROFILE MODAL (V3)
// ============================================================================
(function initCrossPageAuthAndGatedProfileV3() {
  function getLangCode() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (["en", "he", "fr", "es", "de", "ru"].includes(pathLang)) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return ["en", "he", "fr", "es", "de", "ru"].includes(l) ? l : "en";
  }

  function getApiUrl() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  function normWaDigits(raw) {
    let d = String(raw || "").replace(/\D/g, "");
    if (!d) return "";
    if (d.length === 10 && d.indexOf("05") === 0) d = "972" + d.slice(1);
    else if (d.length === 9 && d.indexOf("5") === 0) d = "972" + d;
    return d.length >= 8 ? d : "";
  }

  // Keep #gat-hd-fab above .bottom-nav on EVERY page (including / where .bottom-nav is native)
  function ensureFabAboveBottomNavCss() {
    if (document.getElementById("gat-fab-above-bnav-css")) return;
    const st = document.createElement("style");
    st.id = "gat-fab-above-bnav-css";
    st.textContent = `
      #gat-hd-fab {
        bottom: calc(76px + env(safe-area-inset-bottom, 0px)) !important;
      }
    `;
    document.head.appendChild(st);
  }
  ensureFabAboveBottomNavCss();

  // Inspect Firebase Auth's IndexedDB (`firebaseLocalStorageDb`) directly so pages like `/`
  // and `/pricing/` (which don't load firebase-auth.js) STILL see the logged-in user from `/app/`!
  window.inspectFirebaseAuthIndexedDb = function() {
    return new Promise(function(resolve) {
      if (!window.indexedDB) return resolve(null);
      try {
        const req = window.indexedDB.open("firebaseLocalStorageDb");
        req.onerror = function() { resolve(null); };
        req.onsuccess = function(e) {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("firebaseLocalStorage")) {
            db.close();
            return resolve(null);
          }
          try {
            const tx = db.transaction("firebaseLocalStorage", "readonly");
            const store = tx.objectStore("firebaseLocalStorage");
            const getAllReq = store.getAll();
            getAllReq.onsuccess = function() {
              const rows = getAllReq.result || [];
              db.close();
              for (let i = 0; i < rows.length; i++) {
                const val = rows[i] && rows[i].value;
                if (val && typeof val === "object" && val.uid) {
                  const isReal = (val.isAnonymous === false) || (String(val.uid).indexOf("wa_") === 0) || Boolean(val.email) || Boolean(val.phoneNumber);
                  if (isReal) {
                    return resolve({
                      uid: String(val.uid),
                      email: val.email || "",
                      phone: val.phoneNumber || (String(val.uid).indexOf("wa_") === 0 ? String(val.uid).slice(3) : "")
                    });
                  }
                }
              }
              resolve(null);
            };
            getAllReq.onerror = function() { db.close(); resolve(null); };
          } catch (txErr) {
            db.close();
            resolve(null);
          }
        };
      } catch (err) {
        resolve(null);
      }
    });
  };

  // Enhanced check: Is the user logged into a real account?
  window.isGatUserLoggedIn = function() {
    try {
      if (localStorage.getItem("gat_explicit_logged_out") === "1") return false;
      const wa = normWaDigits(localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "");
      if (wa && wa.length >= 8) return true;
      const code = String(localStorage.getItem("gat_permanent_pass_code") || localStorage.getItem("gat_pass_code") || "").trim();
      if (code && code.length >= 5) return true;
      const uid = String(localStorage.getItem("gat_uid") || window.gatUid || "").trim();
      if (uid && uid.indexOf("wa_") === 0) return true;
      const em = String(localStorage.getItem("gat_user_email") || "").trim();
      if (em && em.indexOf("@") !== -1) return true;
      const admTok = String(localStorage.getItem("gat_admin_session_tok") || "").trim();
      if (admTok && admTok.length > 10) return true;
      if (localStorage.getItem("gat_pro_unlocked") === "true" || localStorage.getItem("gat_pro_unlocked") === "1") return true;
      const entV2 = localStorage.getItem("gat_entitlements_v2") || localStorage.getItem("gat_entitlements_map") || "";
      if (entV2 && entV2 !== "{}" && entV2.length > 4) return true;
      if (typeof firebase !== "undefined" && firebase.auth && firebase.auth().currentUser) {
        const u = firebase.auth().currentUser;
        if (!u.isAnonymous || (u.uid && u.uid.indexOf("wa_") === 0)) return true;
      }
    } catch (e) {}
    return false;
  };

  // Boot check: Pull from Firebase Auth IndexedDB or Admin Session Token if localStorage was missing keys
  async function syncCrossPageIdentityOnBoot() {
    if (localStorage.getItem("gat_explicit_logged_out") === "1") return;
    const idbUser = await window.inspectFirebaseAuthIndexedDb();
    if (idbUser && idbUser.uid) {
      if (typeof window.syncAllGatAuthStorageKeys === "function") {
        window.syncAllGatAuthStorageKeys({
          uid: idbUser.uid,
          waPhone: idbUser.phone,
          email: idbUser.email
        });
      }
    }
    const admTok = localStorage.getItem("gat_admin_session_tok") || "";
    const wa = localStorage.getItem("gat_verified_wa_phone") || "";
    const code = localStorage.getItem("gat_permanent_pass_code") || "";
    const uid = localStorage.getItem("gat_uid") || "";

    if ((admTok || wa || code || (uid && uid.indexOf("wa_") === 0)) && (!code || !wa)) {
      try {
        const res = await fetch(getApiUrl(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "restore_wa_session",
            uid: uid,
            waPhone: wa,
            passCode: code,
            adminSessionToken: admTok
          })
        });
        const data = await res.json();
        if (data && data.ok && data.masterUid) {
          if (typeof window.syncAllGatAuthStorageKeys === "function") {
            window.syncAllGatAuthStorageKeys({
              uid: data.masterUid,
              waPhone: data.whatsappDigits || wa,
              passCode: data.passCode || code,
              customToken: data.customToken || "",
              unlocked: data.userData && data.userData.unlocked,
              tier: data.userData && data.userData.tier
            });
          }
          if (data.userData && typeof window.applyMergedServerDossierToLocal === "function") {
            window.applyMergedServerDossierToLocal(data.userData);
          }
        }
      } catch (e) {}
    }
    if (typeof window.refreshAllGatAuthIndicators === "function") {
      window.refreshAllGatAuthIndicators();
    }
  }
  syncCrossPageIdentityOnBoot();

  // Log Out helper
  window.gatLogOutUser = async function() {
    if (!confirm("Log out of your account on this device?")) return;
    try {
      localStorage.setItem("gat_explicit_logged_out", "1");
      [
        "gat_verified_wa_phone", "gat_wa_phone", "gat_permanent_pass_code", "gat_pass_code",
        "gat_uid", "gat_user_email", "gat_auth_custom_token", "gat_pro_unlocked",
        "gat_pro_tier", "gat_unlocked_tier", "gat_tier", "gat_entitlements_v2",
        "gat_entitlements_map", "gat_admin_session_tok"
      ].forEach(function(k) { localStorage.removeItem(k); });
      window.gatUid = "";
      if (typeof firebase !== "undefined" && firebase.auth) {
        await firebase.auth().signOut();
      }
    } catch (e) {}
    if (typeof window.refreshAllGatAuthIndicators === "function") window.refreshAllGatAuthIndicators();
    const m = document.getElementById("gat-profile-modal");
    if (m) window.openGatProfileModal();
  };

  // Inline WhatsApp Send OTP inside Profile Modal
  window.gatProfSendWaOtp = async function() {
    const inp = document.getElementById("gat-prof-wa-inp");
    const btn = document.getElementById("gat-prof-wa-send-btn");
    const otpBox = document.getElementById("gat-prof-wa-otp-box");
    const msg = document.getElementById("gat-prof-login-msg");
    const rawPhone = inp ? inp.value.trim() : "";
    const digits = normWaDigits(rawPhone);
    if (!digits || digits.length < 8) {
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ Please enter your WhatsApp number (e.g. 052-123-4567 or +1-...).";
      }
      if (inp) inp.focus();
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "⏳ Sending 4-Digit Code to WhatsApp..."; }
    try {
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "wa_send_login", phone: digits, lang: (typeof window.getUnifiedGatLang === "function" ? window.getUnifiedGatLang() : getLangCode()) })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error((data && data.error) || "Could not send WhatsApp code");
      if (otpBox) otpBox.style.display = "block";
      const codeInp = document.getElementById("gat-prof-wa-code-inp");
      if (codeInp) codeInp.focus();
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#047857";
        msg.innerHTML = "✅ Sent to your WhatsApp (<b>" + (data.maskedPhone || ("+" + digits)) + "</b>)! Enter the 4-digit code below (or tap the 1-Click Magic Link in your WhatsApp):";
      }
      if (btn) { btn.disabled = false; btn.textContent = "↺ Re-Send Code to WhatsApp"; }
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = "📲 Send 4-Digit Login Code to My WhatsApp →"; }
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ " + (err.message || "Error sending code");
      }
    }
  };

  // Inline WhatsApp Verify OTP inside Profile Modal
  window.gatProfVerifyWaOtp = async function() {
    const inp = document.getElementById("gat-prof-wa-inp");
    const codeInp = document.getElementById("gat-prof-wa-code-inp");
    const btn = document.getElementById("gat-prof-wa-verify-btn");
    const msg = document.getElementById("gat-prof-login-msg");
    const digits = normWaDigits(inp ? inp.value : "");
    const code = codeInp ? codeInp.value.trim().replace(/\D/g, "") : "";
    if (!digits || code.length < 4) {
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ Please enter the 4-digit code sent to your WhatsApp.";
      }
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "⏳ Verifying & Loading Your Profile..."; }
    try {
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "wa_verify_login",
          phone: digits,
          code: code,
          prevAnonUid: window.gatUid || localStorage.getItem("gat_uid") || "",
          lang: (typeof window.getUnifiedGatLang === "function" ? window.getUnifiedGatLang() : getLangCode())
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error((data && data.error) || "Invalid code");

      localStorage.removeItem("gat_explicit_logged_out");
      const uData = data.userData || {};
      if (typeof window.syncAllGatAuthStorageKeys === "function") {
        window.syncAllGatAuthStorageKeys({
          uid: data.masterUid || ("wa_" + digits),
          waPhone: data.whatsappDigits || digits,
          passCode: uData.permanentPassCode || "",
          customToken: data.customToken || "",
          unlocked: uData.unlocked,
          tier: uData.tier
        });
      }
      if (data.customToken && typeof firebase !== "undefined" && firebase.auth) {
        try { await firebase.auth().signInWithCustomToken(data.customToken); } catch (e) {}
      }
      if (uData && typeof window.applyMergedServerDossierToLocal === "function") {
        window.applyMergedServerDossierToLocal(uData);
      }
      if (typeof window.refreshAllGatAuthIndicators === "function") window.refreshAllGatAuthIndicators();
      // Immediately re-open Profile Modal in Full Logged-In Member Mode!
      window.openGatProfileModal();
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = "✅ Verify Code & Open My Profile →"; }
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ " + (err.message || "Verification failed");
      }
    }
  };

  // Inline 6-Character Pass Code Claim inside Profile Modal
  window.gatProfClaimPassCode = async function() {
    const inp = document.getElementById("gat-prof-passcode-inp");
    const btn = document.getElementById("gat-prof-passcode-btn");
    const msg = document.getElementById("gat-prof-login-msg");
    const clean = String((inp && inp.value) || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length < 5) {
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ Please enter your 6-character Pass Code.";
      }
      if (inp) inp.focus();
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = "⏳ Connecting Profile..."; }
    try {
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "claim_pass",
          passCode: clean,
          targetUid: window.gatUid || localStorage.getItem("gat_uid") || ""
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error((data && data.error) || "Invalid Pass Code");

      localStorage.removeItem("gat_explicit_logged_out");
      const uData = data.userData || data.mergedData || {};
      const mUid = data.masterUid || uData.uid || "";
      const waDig = uData.whatsappDigits || (mUid.indexOf("wa_") === 0 ? mUid.slice(3) : "");
      if (typeof window.syncAllGatAuthStorageKeys === "function") {
        window.syncAllGatAuthStorageKeys({
          uid: mUid,
          waPhone: waDig,
          passCode: clean,
          customToken: data.customToken || "",
          unlocked: uData.unlocked,
          tier: uData.tier
        });
      }
      if (data.customToken && typeof firebase !== "undefined" && firebase.auth) {
        try { await firebase.auth().signInWithCustomToken(data.customToken); } catch (e) {}
      }
      if (uData && typeof window.applyMergedServerDossierToLocal === "function") {
        window.applyMergedServerDossierToLocal(uData);
      }
      if (typeof window.refreshAllGatAuthIndicators === "function") window.refreshAllGatAuthIndicators();
      window.openGatProfileModal();
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = "🔑 Connect with Pass Code →"; }
      if (msg) {
        msg.style.display = "block";
        msg.style.color = "#b91c1c";
        msg.textContent = "⚠️ " + (err.message || "Could not verify Pass Code");
      }
    }
  };

  // Override `window.openGatProfileModal` so:
  // - If NOT logged in (`!window.isGatUserLoggedIn()`): Shows ONLY the Login / Create Profile gate!
  // - If LOGGED IN (`window.isGatUserLoggedIn() === true`): Shows the full Member Profile (Uploaded Docs Vault, 8 PIBA Forms, Pass Code, Settings)!
  const origOpenProfileModal = window.openGatProfileModal;
  window.openGatProfileModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const appDr = document.getElementById("app-drawer");
    if (appDr) appDr.classList.remove("open");

    if (typeof window.syncAllGatAuthStorageKeys === "function") window.syncAllGatAuthStorageKeys();

    // If user IS logged in, render the full Member Profile modal (and add a clean Log Out button)
    if (window.isGatUserLoggedIn()) {
      origOpenProfileModal(e);
      const modal = document.getElementById("gat-profile-modal");
      if (modal) {
        const statusLine = modal.querySelector("div[style*='#4ade80'], div[style*='#fbbf24']");
        const label = (typeof window.getGatUserDisplayLabel === "function" && window.getGatUserDisplayLabel()) || "";
        if (statusLine) {
          statusLine.style.color = "#4ade80";
          statusLine.innerHTML = "🟢 Signed In &amp; Cloud Synced" + (label ? (": <b>" + label + "</b>") : "") +
            ' • <span onclick="event.stopPropagation(); window.gatLogOutUser();" style="text-decoration:underline;color:#fca5a5;cursor:pointer;">Log Out</span>';
        }
      }
      return;
    }

    // USER IS NOT LOGGED IN -> Show ONLY the "Log In / Create Your Profile" screen (hide Vault/Forms content until logged in!)
    let existing = document.getElementById("gat-profile-modal");
    if (existing) existing.remove();

    const l = getLangCode();
    const isRtl = l === "he";
    const modal = document.createElement("div");
    modal.id = "gat-profile-modal";
    modal.dir = isRtl ? "rtl" : "ltr";
    modal.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(8,37,72,0.76);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;padding:0;";
    modal.onclick = function(ev) { if (ev.target === modal) modal.remove(); };

    const titleTxt = l === "he" ? "👤 התחברות / יצירת פרופיל אישי" : "👤 Log In or Create Your Profile";
    const subTxt = l === "he"
      ? "התחברו באמצעות וואטסאפ או קוד גישה כדי לפתוח את הפרופיל האישי, כספת המסמכים שהועלו ו-8 טפסי משרד הפנים שלכם:"
      : "Log in with your WhatsApp or 6-Character Pass Code to access your Personal Profile, Uploaded Documents Vault, and 8 Stamped PIBA Forms:";

    modal.innerHTML =
      '<div style="width:100%;max-width:500px;max-height:90dvh;background:#ffffff;border-radius:22px 22px 0 0;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -12px 40px rgba(8,37,72,0.4);">' +
        '<div style="background:linear-gradient(135deg,#082548 0%,#0b3b59 100%);color:#ffffff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0;">' +
          '<div>' +
            '<div style="font-size:1.05rem;font-weight:900;">' + titleTxt + '</div>' +
            '<div style="font-size:0.75rem;font-weight:800;color:#fbbf24;margin-top:2px;">🟠 Not Logged In — Sign in below to unlock your profile</div>' +
          '</div>' +
          '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove()" style="background:rgba(255,255,255,0.14);color:#ffffff;border:none;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;cursor:pointer;">✕</button>' +
        '</div>' +
        '<div style="padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;-webkit-overflow-scrolling:touch;">' +
          '<div style="font-size:0.84rem;color:#334155;font-weight:700;line-height:1.45;">' + subTxt + '</div>' +
          '<div id="gat-prof-login-msg" style="display:none;padding:10px 12px;border-radius:10px;background:#f8fafc;border:1.5px solid #cbd5e1;font-size:0.8rem;font-weight:800;line-height:1.4;"></div>' +

          // Option 1: WhatsApp Login / Create Profile
          '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:14px;padding:14px;">' +
            '<div style="font-weight:900;font-size:0.9rem;color:#14532d;margin-bottom:4px;">📲 1. Log In or Create Profile with WhatsApp</div>' +
            '<div style="font-size:0.76rem;color:#166534;margin-bottom:9px;font-weight:600;">We\'ll send a 4-digit code &amp; 1-Tap Magic Link to your WhatsApp to sync your forms and documents across all devices:</div>' +
            '<input type="tel" id="gat-prof-wa-inp" placeholder="e.g. 052-123-4567 or +1-555-234-5678" style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid #86efac;background:#ffffff;font-size:16px;font-weight:700;color:#0f172a;margin-bottom:8px;" />' +
            '<button type="button" id="gat-prof-wa-send-btn" onclick="window.gatProfSendWaOtp()" style="width:100%;background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);color:#ffffff;border:none;border-radius:10px;padding:11px 14px;font-size:0.85rem;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,0.25);">📲 Send 4-Digit Login Code to My WhatsApp →</button>' +
            '<div id="gat-prof-wa-otp-box" style="display:none;margin-top:10px;padding-top:10px;border-top:1.5px dashed #86efac;">' +
              '<input type="text" id="gat-prof-wa-code-inp" maxlength="6" inputmode="numeric" placeholder="Enter 4-Digit Code" style="width:100%;padding:10px 12px;border-radius:10px;border:2px solid #0284c7;background:#ffffff;font-size:1.1rem;font-weight:900;text-align:center;letter-spacing:0.25em;color:#082548;margin-bottom:8px;" />' +
              '<button type="button" id="gat-prof-wa-verify-btn" onclick="window.gatProfVerifyWaOtp()" style="width:100%;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#ffffff;border:none;border-radius:10px;padding:11px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;">✅ Verify Code &amp; Open My Profile →</button>' +
            '</div>' +
          '</div>' +

          // Option 2: 6-Character Permanent Pass Code
          '<div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:14px;">' +
            '<div style="font-weight:900;font-size:0.88rem;color:#082548;margin-bottom:4px;">🔑 2. Have a 6-Character Pass Code?</div>' +
            '<div style="font-size:0.75rem;color:#475569;margin-bottom:8px;font-weight:600;">Enter your Permanent Pass Code from your other phone or computer:</div>' +
            '<div style="display:flex;gap:7px;">' +
              '<input type="text" id="gat-prof-passcode-inp" maxlength="8" placeholder="e.g. K7M9P4" style="flex:1;padding:9px 11px;border-radius:10px;border:1.5px solid #94a3b8;background:#ffffff;font-family:monospace;font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:#082548;" />' +
              '<button type="button" id="gat-prof-passcode-btn" onclick="window.gatProfClaimPassCode()" style="background:#082548;color:#ffffff;border:none;border-radius:10px;padding:9px 14px;font-size:0.82rem;font-weight:900;cursor:pointer;white-space:nowrap;">🔑 Connect →</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);
  };
})();


// ============================================================================
// 100% 6-LANGUAGE LOCALIZATION FOR PROFILE GATE, CRY-FOR-HELP & PRE-AI ROUTER
// ============================================================================
(function initGat6LangCompleteLocalization() {
  function getLang6() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (["en", "he", "fr", "es", "de", "ru"].includes(pathLang)) return pathLang;
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return ["en", "he", "fr", "es", "de", "ru"].includes(l) ? l : "en";
  }

  const PROF_GATE_I18N = {
    en: {
      title: "👤 Log In or Create Your Profile",
      notLoggedSub: "🟠 Not Logged In — Sign in below to unlock your profile",
      lead: "Log in with your WhatsApp or 6-Character Pass Code to access your Personal Profile, Uploaded Documents Vault, and 8 Stamped PIBA Forms:",
      waHead: "📲 1. Log In or Create Profile with WhatsApp",
      waSub: "We'll send a 4-digit code & 1-Tap Magic Link to your WhatsApp to sync your forms and documents across all devices:",
      waPh: "e.g. 052-123-4567 or +1-555-234-5678",
      waBtn: "📲 Send 4-Digit Login Code to My WhatsApp →",
      waSending: "⏳ Sending 4-Digit Code to WhatsApp...",
      waResend: "↺ Re-Send Code to WhatsApp",
      otpPh: "Enter 4-Digit Code",
      otpBtn: "✅ Verify Code & Open My Profile →",
      otpVerifying: "⏳ Verifying & Loading Your Profile...",
      passHead: "🔑 2. Have a 6-Character Pass Code?",
      passSub: "Enter your Permanent Pass Code from your other phone or computer:",
      passPh: "e.g. K7M9P4",
      passBtn: "🔑 Connect →",
      passConnecting: "⏳ Connecting Profile...",
      signedInLbl: "🟢 Signed In & Cloud Synced",
      logOutLbl: "Log Out",
      logOutConfirm: "Log out of your account on this device?",
      errPhone: "⚠️ Please enter a valid WhatsApp number.",
      errOtp: "⚠️ Please enter the 4-digit code sent to your WhatsApp.",
      errPass: "⚠️ Please enter your 6-character Pass Code.",
      sentWa: "✅ Sent to your WhatsApp ({p})! Enter the 4-digit code below (or tap the 1-Click Magic Link in your WhatsApp):",
      sec4Title: "⚙️ 4. Settings & Smart Navigator",
      sec4NavBtn: "✨ Ask 24/7 Smart Site Navigator & Helpdesk"
    },
    he: {
      title: "👤 התחברות / יצירת פרופיל אישי",
      notLoggedSub: "🟠 לא מחובר — התחברו למטה לפתיחת הפרופיל האישי",
      lead: "התחברו באמצעות וואטסאפ או קוד גישה (6 תווים) כדי לפתוח את הפרופיל האישי, כספת המסמכים שהועלו ו-8 טפסי משרד הפנים שלכם:",
      waHead: "📲 1. התחברות או יצירת פרופיל באמצעות וואטסאפ",
      waSub: "נשלח קוד בן 4 ספרות וקישור מהיר לוואטסאפ שלכם לסנכרון מלא של הטפסים והמסמכים בין כל המכשירים:",
      waPh: "לדוגמה: 052-123-4567",
      waBtn: "📲 שלח קוד התחברות (4 ספרות) לוואטסאפ שלי ←",
      waSending: "⏳ שולח קוד בן 4 ספרות לוואטסאפ...",
      waResend: "↺ שלח שוב קוד לוואטסאפ",
      otpPh: "הזינו קוד בן 4 ספרות",
      otpBtn: "✅ אימות קוד ופתיחת הפרופיל שלי ←",
      otpVerifying: "⏳ מאמת וטוען את הפרופיל...",
      passHead: "🔑 2. יש לכם קוד גישה קבוע (6 תווים)?",
      passSub: "הזינו את קוד הגישה הקבוע מהטלפון או מהמחשב השני שלכם:",
      passPh: "למשל K7M9P4",
      passBtn: "🔑 התחבר ←",
      passConnecting: "⏳ מתחבר לפרופיל...",
      signedInLbl: "🟢 מחובר ומסונכרן בענן",
      logOutLbl: "התנתק",
      logOutConfirm: "האם להתנתק מהחשבון במכשיר זה?",
      errPhone: "⚠️ נא להזין מספר וואטסאפ תקין.",
      errOtp: "⚠️ נא להזין את הקוד בן 4 הספרות שנשלח לוואטסאפ.",
      errPass: "⚠️ נא להזין קוד גישה בן 6 תווים.",
      sentWa: "✅ נשלח לוואטסאפ שלך ({p})! הזינו את הקוד בן 4 הספרות למטה (או לחצו על הקישור הישיר בהודעה):",
      sec4Title: "⚙️ 4. הגדרות וניווט חכם",
      sec4NavBtn: "✨ פתיחת עוזר הניווט והתמיכה 24/7"
    },
    fr: {
      title: "👤 Connexion / Créer Votre Profil",
      notLoggedSub: "🟠 Non connecté — Connectez-vous ci-dessous pour débloquer votre profil",
      lead: "Connectez-vous avec votre WhatsApp ou votre Code Permanent (6 caractères) pour accéder à votre Profil, votre Coffre de Documents et vos 8 Formulaires PIBA :",
      waHead: "📲 1. Connexion ou Création de Profil via WhatsApp",
      waSub: "Nous vous enverrons un code à 4 chiffres et un lien direct sur WhatsApp pour synchroniser vos formulaires et documents :",
      waPh: "ex. +33-6-12-34-56-78 ou 052-123-4567",
      waBtn: "📲 Recevoir le Code à 4 Chiffres sur WhatsApp →",
      waSending: "⏳ Envoi du code sur WhatsApp...",
      waResend: "↺ Renvoyer le code sur WhatsApp",
      otpPh: "Code à 4 chiffres",
      otpBtn: "✅ Valider & Ouvrir Mon Profil →",
      otpVerifying: "⏳ Vérification en cours...",
      passHead: "🔑 2. Vous avez un Code Permanent (6 caractères) ?",
      passSub: "Entrez le code permanent depuis votre autre téléphone ou ordinateur :",
      passPh: "ex. K7M9P4",
      passBtn: "🔑 Connecter →",
      passConnecting: "⏳ Connexion...",
      signedInLbl: "🟢 Connecté & Synchronisé",
      logOutLbl: "Déconnexion",
      logOutConfirm: "Se déconnecter de cet appareil ?",
      errPhone: "⚠️ Veuillez entrer un numéro WhatsApp valide.",
      errOtp: "⚠️ Veuillez entrer le code à 4 chiffres reçu sur WhatsApp.",
      errPass: "⚠️ Veuillez entrer votre code à 6 caractères.",
      sentWa: "✅ Envoyé sur votre WhatsApp ({p}) ! Entrez le code à 4 chiffres ci-dessous :",
      sec4Title: "⚙️ 4. Paramètres & Navigateur Intelligent",
      sec4NavBtn: "✨ Ouvrir le Navigateur & Assistance 24/7"
    },
    es: {
      title: "👤 Iniciar Sesión / Crear su Perfil",
      notLoggedSub: "🟠 Sin sesión — Inicie sesión abajo para abrir su perfil",
      lead: "Inicie sesión con su WhatsApp o Código Permanente (6 caracteres) para acceder a su Perfil, Bóveda de Documentos y 8 Formularios PIBA:",
      waHead: "📲 1. Iniciar Sesión o Crear Perfil con WhatsApp",
      waSub: "Le enviaremos un código de 4 dígitos y un enlace directo a su WhatsApp para sincronizar sus formularios y documentos:",
      waPh: "ej. +34-600-000-000 o 052-123-4567",
      waBtn: "📲 Enviar Código de 4 Dígitos a mi WhatsApp →",
      waSending: "⏳ Enviando código a WhatsApp...",
      waResend: "↺ Reenviar código a WhatsApp",
      otpPh: "Código de 4 dígitos",
      otpBtn: "✅ Verificar Código y Abrir Mi Perfil →",
      otpVerifying: "⏳ Verificando...",
      passHead: "🔑 2. ¿Tiene un Código Permanente (6 caracteres)?",
      passSub: "Ingrese su Código Permanente desde su otro teléfono u ordenador:",
      passPh: "ej. K7M9P4",
      passBtn: "🔑 Conectar →",
      passConnecting: "⏳ Conectando...",
      signedInLbl: "🟢 Conectado y Sincronizado",
      logOutLbl: "Cerrar sesión",
      logOutConfirm: "¿Cerrar sesión en este dispositivo?",
      errPhone: "⚠️ Ingrese un número de WhatsApp válido.",
      errOtp: "⚠️ Ingrese el código de 4 dígitos enviado a su WhatsApp.",
      errPass: "⚠️ Ingrese su código de 6 caracteres.",
      sentWa: "✅ ¡Enviado a su WhatsApp ({p})! Ingrese el código de 4 dígitos abajo:",
      sec4Title: "⚙️ 4. Ajustes y Navegador Inteligente",
      sec4NavBtn: "✨ Abrir Navegador y Asistencia 24/7"
    },
    de: {
      title: "👤 Anmelden / Profil Erstellen",
      notLoggedSub: "🟠 Nicht angemeldet — Unten anmelden, um Ihr Profil zu öffnen",
      lead: "Melden Sie sich mit WhatsApp oder Ihrem 6-stelligen Pass-Code an, um auf Ihr Profil, Ihren Dokumenten-Tresor und alle 8 PIBA-Formulare zuzugreifen:",
      waHead: "📲 1. Mit WhatsApp Anmelden oder Profil Erstellen",
      waSub: "Wir senden Ihnen einen 4-stelligen Code & Direktlink per WhatsApp, um Ihre Formulare und Dokumente zu synchronisieren:",
      waPh: "z.B. +49-170-1234567 oder 052-123-4567",
      waBtn: "📲 4-Stelligen Code an mein WhatsApp senden →",
      waSending: "⏳ Code wird gesendet...",
      waResend: "↺ Code erneut senden",
      otpPh: "4-stelliger Code",
      otpBtn: "✅ Code bestätigen & Profil öffnen →",
      otpVerifying: "⏳ Wird überprüft...",
      passHead: "🔑 2. Haben Sie einen 6-stelligen Pass-Code?",
      passSub: "Geben Sie Ihren Pass-Code von Ihrem anderen Handy oder PC ein:",
      passPh: "z.B. K7M9P4",
      passBtn: "🔑 Verbinden →",
      passConnecting: "⏳ Verbinde...",
      signedInLbl: "🟢 Angemeldet & Cloud-Synchronisiert",
      logOutLbl: "Abmelden",
      logOutConfirm: "Auf diesem Gerät abmelden?",
      errPhone: "⚠️ Bitte geben Sie eine gültige WhatsApp-Nummer ein.",
      errOtp: "⚠️ Bitte geben Sie den 4-stelligen WhatsApp-Code ein.",
      errPass: "⚠️ Bitte geben Sie Ihren 6-stelligen Pass-Code ein.",
      sentWa: "✅ An Ihr WhatsApp ({p}) gesendet! Geben Sie unten den 4-stelligen Code ein:",
      sec4Title: "⚙️ 4. Einstellungen & Smart-Navigator",
      sec4NavBtn: "✨ 24/7 Smart-Navigator & Hilfe öffnen"
    },
    ru: {
      title: "👤 Вход / Создание личного профиля",
      notLoggedSub: "🟠 Вы не вошли — авторизуйтесь ниже для доступа к профилю",
      lead: "Войдите через WhatsApp или по 6-значному коду доступа, чтобы открыть ваш профиль, сейф загруженных документов и 8 анкет МВД (PIBA):",
      waHead: "📲 1. Войти или создать профиль через WhatsApp",
      waSub: "Мы отправим 4-значный код и быструю ссылку в ваш WhatsApp для синхронизации анкет и документов на всех устройствах:",
      waPh: "напр. 052-123-4567 или +7-...",
      waBtn: "📲 Отправить 4-значный код в мой WhatsApp →",
      waSending: "⏳ Отправка кода в WhatsApp...",
      waResend: "↺ Отправить код повторно",
      otpPh: "Введите 4-значный код",
      otpBtn: "✅ Подтвердить код и открыть профиль →",
      otpVerifying: "⏳ Проверка и загрузка...",
      passHead: "🔑 2. Есть постоянный 6-значный код доступа?",
      passSub: "Введите ваш постоянный код с другого телефона или компьютера:",
      passPh: "напр. K7M9P4",
      passBtn: "🔑 Подключить →",
      passConnecting: "⏳ Подключение...",
      signedInLbl: "🟢 Вход выполнен (Синхронизировано в облаке)",
      logOutLbl: "Выйти",
      logOutConfirm: "Выйти из аккаунта на этом устройстве?",
      errPhone: "⚠️ Пожалуйста, введите корректный номер WhatsApp.",
      errOtp: "⚠️ Введите 4-значный код, отправленный в ваш WhatsApp.",
      errPass: "⚠️ Введите ваш 6-значный код доступа.",
      sentWa: "✅ Отправлено в ваш WhatsApp ({p})! Введите 4-значный код ниже:",
      sec4Title: "⚙️ 4. Настройки и умный навигатор",
      sec4NavBtn: "✨ Открыть навигатор по сайту и помощь 24/7"
    }
  };

  window.GAT_PROF_GATE_I18N = PROF_GATE_I18N;

  // Re-bind openGatProfileModal to use 100% localized PROF_GATE_I18N in all 6 languages
  const prevOpenProf = window.openGatProfileModal;
  window.openGatProfileModal = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const appDr = document.getElementById("app-drawer");
    if (appDr) appDr.classList.remove("open");
    if (typeof window.syncAllGatAuthStorageKeys === "function") window.syncAllGatAuthStorageKeys();

    const l = getLang6();
    const pg = PROF_GATE_I18N[l] || PROF_GATE_I18N.en;
    const isRtl = l === "he";

    if (typeof window.isGatUserLoggedIn === "function" && window.isGatUserLoggedIn()) {
      prevOpenProf(e);
      const modal = document.getElementById("gat-profile-modal");
      if (modal) {
        const statusLine = modal.querySelector("div[style*='#4ade80'], div[style*='#fbbf24']");
        const label = (typeof window.getGatUserDisplayLabel === "function" && window.getGatUserDisplayLabel()) || "";
        if (statusLine) {
          statusLine.style.color = "#4ade80";
          statusLine.innerHTML = pg.signedInLbl + (label ? (": <b>" + label + "</b>") : "") +
            ' • <span onclick="event.stopPropagation(); window.gatLogOutUser();" style="text-decoration:underline;color:#fca5a5;cursor:pointer;">' + pg.logOutLbl + '</span>';
        }
        // Localize Section 4 title & button
        modal.querySelectorAll("div").forEach(function(d) {
          if (d.textContent === "⚙️ 4. Settings & Smart Navigator") d.textContent = pg.sec4Title;
        });
        modal.querySelectorAll("button").forEach(function(b) {
          if (b.textContent.indexOf("Ask 24/7 Smart Site Navigator") !== -1) b.textContent = pg.sec4NavBtn;
        });
      }
      return;
    }

    let existing = document.getElementById("gat-profile-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "gat-profile-modal";
    modal.dir = isRtl ? "rtl" : "ltr";
    modal.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(8,37,72,0.76);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;padding:0;";
    modal.onclick = function(ev) { if (ev.target === modal) modal.remove(); };

    modal.innerHTML =
      '<div style="width:100%;max-width:500px;max-height:90dvh;background:#ffffff;border-radius:22px 22px 0 0;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -12px 40px rgba(8,37,72,0.4);">' +
        '<div style="background:linear-gradient(135deg,#082548 0%,#0b3b59 100%);color:#ffffff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0;">' +
          '<div>' +
            '<div style="font-size:1.05rem;font-weight:900;">' + pg.title + '</div>' +
            '<div style="font-size:0.75rem;font-weight:800;color:#fbbf24;margin-top:2px;">' + pg.notLoggedSub + '</div>' +
          '</div>' +
          '<button type="button" onclick="document.getElementById(\'gat-profile-modal\').remove()" style="background:rgba(255,255,255,0.14);color:#ffffff;border:none;width:34px;height:34px;border-radius:50%;font-size:1rem;font-weight:900;cursor:pointer;">✕</button>' +
        '</div>' +
        '<div style="padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;-webkit-overflow-scrolling:touch;">' +
          '<div style="font-size:0.84rem;color:#334155;font-weight:700;line-height:1.45;">' + pg.lead + '</div>' +
          '<div id="gat-prof-login-msg" style="display:none;padding:10px 12px;border-radius:10px;background:#f8fafc;border:1.5px solid #cbd5e1;font-size:0.8rem;font-weight:800;line-height:1.4;"></div>' +
          '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:14px;padding:14px;">' +
            '<div style="font-weight:900;font-size:0.9rem;color:#14532d;margin-bottom:4px;">' + pg.waHead + '</div>' +
            '<div style="font-size:0.76rem;color:#166534;margin-bottom:9px;font-weight:600;">' + pg.waSub + '</div>' +
            '<input type="tel" id="gat-prof-wa-inp" placeholder="' + pg.waPh + '" style="width:100%;padding:10px 12px;border-radius:10px;border:1.5px solid #86efac;background:#ffffff;font-size:16px;font-weight:700;color:#0f172a;margin-bottom:8px;" />' +
            '<button type="button" id="gat-prof-wa-send-btn" onclick="window.gatProfSendWaOtp()" style="width:100%;background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);color:#ffffff;border:none;border-radius:10px;padding:11px 14px;font-size:0.85rem;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,0.25);">' + pg.waBtn + '</button>' +
            '<div id="gat-prof-wa-otp-box" style="display:none;margin-top:10px;padding-top:10px;border-top:1.5px dashed #86efac;">' +
              '<input type="text" id="gat-prof-wa-code-inp" maxlength="6" inputmode="numeric" placeholder="' + pg.otpPh + '" style="width:100%;padding:10px 12px;border-radius:10px;border:2px solid #0284c7;background:#ffffff;font-size:1.1rem;font-weight:900;text-align:center;letter-spacing:0.25em;color:#082548;margin-bottom:8px;" />' +
              '<button type="button" id="gat-prof-wa-verify-btn" onclick="window.gatProfVerifyWaOtp()" style="width:100%;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#ffffff;border:none;border-radius:10px;padding:11px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;">' + pg.otpBtn + '</button>' +
            '</div>' +
          '</div>' +
          '<div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:14px;">' +
            '<div style="font-weight:900;font-size:0.88rem;color:#082548;margin-bottom:4px;">' + pg.passHead + '</div>' +
            '<div style="font-size:0.75rem;color:#475569;margin-bottom:8px;font-weight:600;">' + pg.passSub + '</div>' +
            '<div style="display:flex;gap:7px;">' +
              '<input type="text" id="gat-prof-passcode-inp" maxlength="8" placeholder="' + pg.passPh + '" style="flex:1;padding:9px 11px;border-radius:10px;border:1.5px solid #94a3b8;background:#ffffff;font-family:monospace;font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:#082548;" />' +
              '<button type="button" id="gat-prof-passcode-btn" onclick="window.gatProfClaimPassCode()" style="background:#082548;color:#ffffff;border:none;border-radius:10px;padding:9px 14px;font-size:0.82rem;font-weight:900;cursor:pointer;white-space:nowrap;">' + pg.passBtn + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);
  };
})();


// ============================================================================
// UNIVERSAL CROSS-PAGE LANGUAGE SYNCHRONIZER (/, /app/, /pricing/, /concierge-booking/)
// ============================================================================
(function initUniversalCrossPageLangSync() {
  const VALID_LANGS = ["en", "he", "fr", "es", "de", "ru"];

  window.getUnifiedGatLang = function() {
    try {
      const qL = (new URLSearchParams(window.location.search).get("lang") || "").toLowerCase();
      if (VALID_LANGS.indexOf(qL) !== -1) return qL;
      const sL = (localStorage.getItem("gat_lang") || localStorage.getItem("zehut_lang") || "").toLowerCase();
      if (VALID_LANGS.indexOf(sL) !== -1) return sL;
      const m = window.location.pathname.match(/^\/(he|fr|es|de|ru)(\/|$)/i);
      if (m) return m[1].toLowerCase();
      const wL = String(window.appLang || window.gatLang || window.lang || "").slice(0, 2).toLowerCase();
      if (VALID_LANGS.indexOf(wL) !== -1) return wL;
    } catch (e) {}
    return "en";
  };

  function syncPageToUnifiedLang() {
    const lg = window.getUnifiedGatLang();
    try {
      localStorage.setItem("gat_lang", lg);
      localStorage.setItem("zehut_lang", lg);
      window.lang = lg;
      window.appLang = lg;
      window.gatLang = lg;
    } catch (e) {}

    // 1. If on /pricing/, apply setPricingLang(lg) if not already matching
    if (typeof window.setPricingLang === "function" && window.pLang !== lg) {
      try { window.setPricingLang(lg); } catch (e) {}
    }
    // 2. If on /app/, apply setAppLang(lg) if not already matching
    if (window.location.pathname.indexOf("/app") === 0 && typeof window.setAppLang === "function" && document.documentElement.lang !== lg) {
      try { document.documentElement.lang = lg; window.setAppLang(lg); } catch (e) {}
    }
    // 3. Update top Globe badge text (EN/HE/FR/ES/DE/RU) across all pages
    document.querySelectorAll("#globe-lang-btn span, #globe-lang-lbl, #appbar-lang-label, .lang-btn span").forEach(function(el) {
      if (el.textContent.trim().toUpperCase() !== lg.toUpperCase()) {
        el.textContent = lg.toUpperCase();
      }
    });
    // 4. Refresh Unified Hamburger & Bottom Nav labels
    if (typeof window.renderUnifiedHamburgerDrawer === "function") {
      window.renderUnifiedHamburgerDrawer();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncPageToUnifiedLang);
  } else {
    syncPageToUnifiedLang();
  }
  setTimeout(syncPageToUnifiedLang, 120);
})();


// ============================================================================
// EXACT HOMEPAGE DEEP-NAVY .BOTTOM-NAV STYLING & 6-LANGUAGE TAB SYNC EVERYWHERE
// ============================================================================
(function enforceHomepageBottomNavEverywhere() {
  const BNAV_LABELS_6LANG = {
    en: ["Start", "Tracks", "Savings", "Rabbi", "Tracker"],
    he: ["התחלה", "מסלולים", "חיסכון", "רבנים", "מעקב"],
    fr: ["Début", "Parcours", "Économies", "Rabbin", "Suivi"],
    es: ["Inicio", "Vías", "Ahorro", "Rabino", "Plazos"],
    de: ["Start", "Wege", "Sparen", "Rabbiner", "Fristen"],
    ru: ["Старт", "Треки", "Экономия", "Раввин", "Трекер"]
  };

  function getActiveLang() {
    if (typeof window.getUnifiedGatLang === "function") return window.getUnifiedGatLang();
    const qL = (new URLSearchParams(window.location.search).get("lang") || "").toLowerCase();
    if (BNAV_LABELS_6LANG[qL]) return qL;
    const m = window.location.pathname.match(/^\/(he|fr|es|de|ru)(\/|$)/i);
    if (m && BNAV_LABELS_6LANG[m[1].toLowerCase()]) return m[1].toLowerCase();
    const sL = (localStorage.getItem("gat_lang") || localStorage.getItem("zehut_lang") || window.appLang || window.gatLang || window.lang || "en").slice(0, 2).toLowerCase();
    return BNAV_LABELS_6LANG[sL] ? sL : "en";
  }

  function injectExactHomepageBottomNavCss() {
    let st = document.getElementById("gat-exact-homepage-bnav-css");
    if (!st) {
      st = document.createElement("style");
      st.id = "gat-exact-homepage-bnav-css";
      document.head.appendChild(st);
    }
    st.textContent = `
      nav.bottom-nav,
      .bottom-nav,
      nav.gat-injected-bottom-nav {
        position: fixed !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: calc(68px + env(safe-area-inset-bottom, 0px)) !important;
        padding: 6px 8px calc(6px + env(safe-area-inset-bottom, 0px)) !important;
        background: #082548 !important;
        background-color: #082548 !important;
        border-top: 1px solid rgba(255, 255, 255, 0.14) !important;
        display: flex !important;
        justify-content: space-around !important;
        align-items: center !important;
        z-index: 9500 !important;
        box-shadow: 0 -6px 24px rgba(4, 18, 38, 0.45), 0 80px 0 80px #082548 !important;
        transform: translate3d(0, 0, 0) !important;
        -webkit-transform: translate3d(0, 0, 0) !important;
      }
      nav.bottom-nav .nav-tab,
      .bottom-nav .nav-tab,
      nav.gat-injected-bottom-nav .nav-tab {
        flex: 1 !important;
        background: transparent !important;
        border: none !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 4px !important;
        padding: 4px 2px !important;
        color: rgba(255, 255, 255, 0.72) !important;
        font-size: 0.72rem !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        text-decoration: none !important;
        box-shadow: none !important;
      }
      nav.bottom-nav .nav-tab.active,
      .bottom-nav .nav-tab.active,
      nav.gat-injected-bottom-nav .nav-tab.active {
        color: #38bdf8 !important;
        font-weight: 800 !important;
      }
      nav.bottom-nav .nt-pill,
      .bottom-nav .nt-pill,
      nav.gat-injected-bottom-nav .nt-pill {
        width: 56px !important;
        height: 34px !important;
        border-radius: 12px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: transparent !important;
        transition: all 0.18s ease !important;
      }
      nav.bottom-nav .nav-tab.active .nt-pill,
      .bottom-nav .nav-tab.active .nt-pill,
      nav.gat-injected-bottom-nav .nav-tab.active .nt-pill {
        background: #ffffff !important;
        background-color: #ffffff !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22) !important;
      }
      nav.bottom-nav .nt-pill svg,
      .bottom-nav .nt-pill svg,
      nav.gat-injected-bottom-nav .nt-pill svg {
        width: 20px !important;
        height: 20px !important;
        fill: rgba(255, 255, 255, 0.78) !important;
      }
      nav.bottom-nav .nav-tab.active .nt-pill svg,
      .bottom-nav .nav-tab.active .nt-pill svg,
      nav.gat-injected-bottom-nav .nav-tab.active .nt-pill svg {
        fill: #0288E8 !important;
      }
      nav.bottom-nav .nt-label,
      .bottom-nav .nt-label,
      nav.gat-injected-bottom-nav .nt-label {
        color: inherit !important;
        font-size: 0.71rem !important;
        line-height: 1.1 !important;
        white-space: nowrap !important;
      }
    `;
  }

  window.syncHomepageBottomNavEverywhere = function() {
    injectExactHomepageBottomNavCss();
    const lg = getActiveLang();
    const lbls = BNAV_LABELS_6LANG[lg] || BNAV_LABELS_6LANG.en;
    const navs = document.querySelectorAll("nav.bottom-nav, .bottom-nav");
    const isHomeHub = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
    const path = window.location.pathname;

    navs.forEach(function(navEl) {
      const tabs = navEl.querySelectorAll(".nav-tab");
      tabs.forEach(function(tabBtn, idx) {
        const lblEl = tabBtn.querySelector(".nt-label, span");
        if (lblEl && lbls[idx]) {
          lblEl.textContent = lbls[idx];
        }
        // Highlight correct active tab on non-hub pages (/pricing/, /concierge-booking/, /app/)
        if (!isHomeHub) {
          const shouldBeActive =
            (idx === 2 && path.indexOf("/pricing") !== -1) ||
            (idx === 3 && path.indexOf("/concierge") !== -1) ||
            (idx === 4 && path.indexOf("/app") !== -1);
          tabBtn.classList.toggle("active", shouldBeActive);
        }
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.syncHomepageBottomNavEverywhere);
  } else {
    window.syncHomepageBottomNavEverywhere();
  }
  setTimeout(window.syncHomepageBottomNavEverywhere, 100);
  setTimeout(window.syncHomepageBottomNavEverywhere, 450);

  // Also hook language changes so bottom-nav labels update immediately when switching Globe language
  ["setPricingLang", "setLang", "setAppLang", "selectLangDirect", "pickAppbarLang"].forEach(function(fn) {
    const orig = window[fn];
    if (typeof orig === "function" && !orig._bnavHooked) {
      const wrapped = function() {
        const res = orig.apply(this, arguments);
        setTimeout(window.syncHomepageBottomNavEverywhere, 30);
        return res;
      };
      wrapped._bnavHooked = true;
      window[fn] = wrapped;
    }
  });
})();


// ============================================================================
// INLINE DOM STYLE ENFORCER FOR .BOTTOM-NAV (BEATS ALL STYLESHEETS 100%)
// ============================================================================
(function forceInlineDeepNavyBottomNav() {
  const LABELS = {
    en: ["Start", "Tracks", "Savings", "Rabbi", "Tracker"],
    he: ["התחלה", "מסלולים", "חיסכון", "רבנים", "מעקב"],
    fr: ["Début", "Parcours", "Économies", "Rabbin", "Suivi"],
    es: ["Inicio", "Vías", "Ahorro", "Rabino", "Plazos"],
    de: ["Start", "Wege", "Sparen", "Rabbiner", "Fristen"],
    ru: ["Старт", "Треки", "Экономия", "Раввин", "Трекер"]
  };

  function getLg() {
    if (typeof window.getUnifiedGatLang === "function") return window.getUnifiedGatLang();
    const s = (localStorage.getItem("gat_lang") || localStorage.getItem("zehut_lang") || "en").slice(0, 2).toLowerCase();
    return LABELS[s] ? s : "en";
  }

  window.paintBottomNavDeepNavyInline = function() {
    const lg = getLg();
    const lbls = LABELS[lg] || LABELS.en;
    const isHomeHub = Boolean(document.getElementById("view-0") && typeof window.switchTab === "function");
    const path = window.location.pathname;

    document.querySelectorAll("nav.bottom-nav, .bottom-nav, nav.gat-injected-bottom-nav").forEach(function(nav) {
      nav.style.setProperty("background", "#082548", "important");
      nav.style.setProperty("background-color", "#082548", "important");
      nav.style.setProperty("border-top", "1px solid rgba(255,255,255,0.14)", "important");
      nav.style.setProperty("box-shadow", "0 -6px 24px rgba(4,18,38,0.45), 0 80px 0 80px #082548", "important");

      const tabs = nav.querySelectorAll(".nav-tab");
      tabs.forEach(function(tab, idx) {
        if (!isHomeHub) {
          const active =
            (idx === 2 && path.indexOf("/pricing") !== -1) ||
            (idx === 3 && path.indexOf("/concierge") !== -1) ||
            (idx === 4 && path.indexOf("/app") !== -1);
          tab.classList.toggle("active", active);
        }
        const isAct = tab.classList.contains("active");
        tab.style.setProperty("background", "transparent", "important");
        tab.style.setProperty("color", isAct ? "#38bdf8" : "rgba(255,255,255,0.72)", "important");
        tab.style.setProperty("font-weight", isAct ? "800" : "700", "important");

        const pill = tab.querySelector(".nt-pill");
        if (pill) {
          pill.style.setProperty("width", "56px", "important");
          pill.style.setProperty("height", "34px", "important");
          pill.style.setProperty("border-radius", "12px", "important");
          pill.style.setProperty("background", isAct ? "#ffffff" : "transparent", "important");
          pill.style.setProperty("background-color", isAct ? "#ffffff" : "transparent", "important");
          pill.style.setProperty("box-shadow", isAct ? "0 4px 12px rgba(0,0,0,0.25)" : "none", "important");
          const svg = pill.querySelector("svg");
          if (svg) {
            svg.style.setProperty("width", "20px", "important");
            svg.style.setProperty("height", "20px", "important");
            svg.style.setProperty("fill", isAct ? "#0288E8" : "rgba(255,255,255,0.78)", "important");
            const poly = svg.querySelector("polygon");
            if (poly) poly.setAttribute("fill", isAct ? "#ffffff" : "#082548");
          }
        }
        const lblEl = tab.querySelector(".nt-label, span");
        if (lblEl && lbls[idx]) {
          lblEl.textContent = lbls[idx];
          lblEl.style.setProperty("color", isAct ? "#38bdf8" : "rgba(255,255,255,0.72)", "important");
        }
      });
    });
  };

  window.paintBottomNavDeepNavyInline();
  document.addEventListener("DOMContentLoaded", window.paintBottomNavDeepNavyInline);
  setTimeout(window.paintBottomNavDeepNavyInline, 120);
  setTimeout(window.paintBottomNavDeepNavyInline, 400);
  setTimeout(window.paintBottomNavDeepNavyInline, 1300);
  setInterval(window.paintBottomNavDeepNavyInline, 1500);
})();


// ============================================================================
// GEMINI 3.8 #1 SALES CLOSER ROUTER + INSTANT BACKGROUND AUTO-NAV (V4)
// ============================================================================
(function initSalesCloserRouterV4() {
  const prevMatchPreAi = window.matchPreAiInstantRoute;

  function getLang6() {
    if (typeof window.getUnifiedGatLang === "function") return window.getUnifiedGatLang();
    const l = String(window.appLang || window.lang || localStorage.getItem("gat_lang") || "en").slice(0, 2).toLowerCase();
    return ["en", "he", "fr", "es", "de", "ru"].includes(l) ? l : "en";
  }

  function checkAndIncrementGuestChatQuota() {
    if (typeof window.isGatUserPaid === "function" && window.isGatUserPaid()) return true;
    try {
      const today = new Date().toISOString().slice(0, 10);
      const raw = JSON.parse(localStorage.getItem("gat_closer_quota_v1") || "{}");
      const count = (raw.day === today) ? (Number(raw.count) || 0) : 0;
      if (count >= 18) return false;
      localStorage.setItem("gat_closer_quota_v1", JSON.stringify({ day: today, count: count + 1 }));
      return true;
    } catch (e) {
      return true;
    }
  }

  window.matchPreAiInstantRoute = function(rawText, lang) {
    const q = String(rawText || "").trim();
    const ql = q.toLowerCase();
    window._lastScoredAutoNavSpec = "";
    if (!ql) return null;

    // 1. Explicit Fiancé Triage Button Clicks
    if (/^(FIANCE_IL:|FIANCE_FJ:|FIANCE_OT:)/i.test(q) && typeof prevMatchPreAi === "function") {
      return prevMatchPreAi(rawText, lang);
    }

    // 2. Urgent Paid-Unlock / Technical Bug / Human Request -> Instant WhatsApp Escalation Box
    const urgentHumanOrBugRx = /(paid but|already paid|still locked|didn.?t unlock|didnt unlock|can.?t unlock|cant unlock|speak to a human|talk to a human|talk to a person|speak to someone|real person|live agent|not working|doesn.?t work|doesnt work|broken|bug|glitch|stuck|שילמתי ו|עדיין נעול|נציג אנושי|לדבר עם בן אדם|תקלה|לא עובד|payé mais|parler à un humain|pagué pero|hablar con un humano|bezahlt aber|оплатил но|поговорить с человеком|не работает)/i;
    if (urgentHumanOrBugRx.test(ql) && typeof prevMatchPreAi === "function") {
      return prevMatchPreAi(rawText, lang);
    }

    // 3. Score the #1 matching destination for instant background Auto-Nav
    if (typeof prevMatchPreAi === "function") {
      const localHit = prevMatchPreAi(rawText, lang);
      if (localHit && localHit.autoNav) {
        window._lastScoredAutoNavSpec = localHit.autoNav;
      }
    }

    // 4. Enforce 18-message/day guest quota
    if (!checkAndIncrementGuestChatQuota() && typeof prevMatchPreAi === "function") {
      return prevMatchPreAi("help me fill out this form", getLang6());
    }

    // Return null so `window.sendGatHelpdeskMsg` routes the question to Gemini 3.8 Sales Closer!
    return null;
  };
})();
