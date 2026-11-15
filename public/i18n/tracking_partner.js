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
      navMatches.forEach(function(nm) {
        const btnLbl = nm.label || t.jumpReadBtn;
        html += '<button type="button" class="gat-hd-jump-btn" onclick="window.gatNavigateAndMinimize(\'' + nm.mod + '\', \'' + nm.form + '\', true)">' + btnLbl + '</button>';
      });
      return { html, navMod: navMatches[0].mod, navForm: navMatches[0].form };
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
        overflow-x: hidden !important;
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

  function buildWelcomeBubble(t) {
    const wrap = document.createElement("div");
    wrap.className = "gat-hd-bubble bot";
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


  const GAT_6LANG_PACK = {"en": {"cat1": "🕍 CATEGORY 1: CONVERSION, PRIVATE BEIT DINS & RABBANUT", "cat2": "🛂 CATEGORY 2: VISA CLOCKS, 5 APOSTILLED DOCS & TOURIST SURVIVAL", "cat3": "💍 CATEGORY 3: SPOUSAL VISA (5.2.0008), CLERK SHEETS & PAST RECORDS", "freeTag": "Free Playbooks", "f_h": "🧭 Tell Us What Track You Are Interested In:", "f_s": "Tap your track below to open your step-by-step Case Playbook:", "f_b1": "🕍 1) Giyur — I Want to Convert (or Validate My Conversion)", "f_b2": "✈️ 2) Aliyah — I Want to Make Aliyah to Israel (or Spousal Visa)", "f_b3": "✡️ 3) Both — I Want to Convert AND Make Aliyah / Marry", "q1_t": "Step 1 of 2: Where are you in your conversion journey right now?", "q1_opts": [["🏛️ Converted / converting at a Private Beit Din (Gush Etzion, Bnei Brak, Chabad, or Overseas)", "priv_bd"], ["💔 Considering / completed a Non-Orthodox conversion (Reform / Conservative 'Dahan' ruling)", "dahan_bd"], ["🛂 In Israel on a 90-Day B/2 Tourist Visa & want State Giyur (Va'adat Charigim)", "tourist_vc"], ["📚 Need a Vetted Sponsoring Rabbi, Madrichat Kallah & 700-Q Beit Din Prep", "state_prep"]], "q2_t": "Step 1 of 2: Which Aliyah or Residency situation fits you?", "q2_opts": [["🚨 Still Abroad / Emergency Exit: What 5 Apostilled Docs must be in my Go-Bag before flying?", "go_bag"], ["✈️ In Israel: Making Aliyah from inside Israel (Shinui Ma'amad Form Ash/456 & 24-Mo Sal Klita)", "shinui"], ["💍 Married or Unmarried Partner of an Israeli Citizen (Spousal Visa Nohal 5.2.0008 / Form Ash/6)", "spousal"], ["🛡️ Applying for Aliyah or Spousal Visa with an Old / Expunged Record (Teudat Yosher)", "crim"]], "q3_t": "Step 1 of 2: What is your current situation for Converting + Making Aliyah?", "q3_opts": [["⚠️ Converted / converting via Gush Etzion / Bnei Brak / Private or Overseas Beit Din & want Aliyah / Marriage", "priv_bd"], ["💑 With an Israeli Partner: Need BOTH Spousal Visa (Nohal 5.2.0008) + Rabbanut Conversion (Sec. ג.10)", "dual"], ["🛂 On a B/2 Tourist Visa (No Israeli partner) & need Va'adat Charigim (Form Ash/1) + Survival Guide", "tourist_vc"], ["✈️ Still Abroad: Planning to come to Israel to convert & make Aliyah (5 Apostilled Docs first!)", "go_bag"]], "res": {"priv_bd": ["🚨 PRIVATE / OVERSEAS BEIT DIN PLAYBOOK", "Why Misrad HaPanim & the Rabbanut Block Gush Etzion / Private Conversions", "Misrad HaPanim stalls tourist private conversions for 2–5+ years, and the Chief Rabbinate 100% blocks marriage registration unless you complete State Rabbanut validation ('Ishur Giyur' / Giyur L'Chumra) or run the Spousal Track (Nohal 5.2.0008) in parallel.", [["1️⃣ Read First: Private Conversion & Gush Etzion Trap", "obs:0"], ["2️⃣ Read Next: Post-Mikvah & 9-Month Community Rule", "obs:2"], ["3️⃣ Read Next: Pulling All 5 Apostilled Docs (180d Clock)", "obs:1"]]], "dahan_bd": ["⚠️ NON-ORTHODOX ('DAHAN') PLAYBOOK", "Why the Rabbanut Blocks 'Dahan' Conversions from Marriage in Israel", "A non-Orthodox conversion permanently bars you and your future children from marrying through the Israeli Rabbanut. You can complete a 100% Halachic, Rabbanut-recognized track in the exact same timeframe.", [["1️⃣ Read First: The Unfiltered Dahan vs. Rabbanut Truth", "term:dahan_truth"], ["2️⃣ Read Next: Vetted Rabbanut Rabbi & Madrichat Kallah", "obs:5"], ["3️⃣ Read Next: Passing Va'adat Charigim (Form Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ B/2 TOURIST TO STATE GIYUR PLAYBOOK", "How to Pass Va'adat Charigim (Form Ash/1) Before Your 90-Day Clock Expires", "Tourists must pass the Exceptions Committee with Form Ash/1, a Hebrew Michtav Hesber, 5–8+ Israeli Rabbi/Host Family letters, and 5 Apostilled Homeland Docs.", [["1️⃣ Read First: Va'adat Charigim & Freezing Your 90d Clock", "obs:3"], ["2️⃣ Read Next: The 5 Mandatory Apostilled Docs", "obs:1"], ["3️⃣ Read Next: Legal Remote Work & Housing on B/2 Visa", "obs:8"]]], "state_prep": ["🕍 BEIT DIN & RABBANUT PREP PLAYBOOK", "Both Partners Must Study! Vetted Rabbi, Kallah & 700-Q Beit Din Exam", "Even when one spouse is a born-Jewish Israeli citizen, BOTH partners must study with a Rabbanut-recognized Rabbi and Madrichat Kallah.", [["1️⃣ Read First: Vetted Rabbi, Kallah & Exam Guide", "obs:5"], ["2️⃣ Read Next: 5–8+ Israeli Rabbi & Host Family Letters", "term:community_letters"], ["3️⃣ Launch 700 Beit Din Deck & 56 Songs Karaoke →", "app:beit-din-150|"]]], "go_bag": ["🚨 PRE-FLIGHT GO-BAG PLAYBOOK", "Do NOT Board a Plane Without All 5 Double-Apostilled Originals", "Ordering foreign Birth Certificates, Single Status Proofs, and FBI/ACRO/RCMP Police Checks remotely from Israel takes months while your 180-day clock runs out.", [["1️⃣ Read First: Pre-Flight Go-Bag Checklist", "term:go_bag"], ["2️⃣ Read Next: The 5 Apostilled Docs & 180-Day Clock", "obs:1"], ["3️⃣ Read Next: Moving Funds & Paying Rent in ₪ Without TZ", "term:fx_shield"]]], "shinui": ["✈️ IN-ISRAEL ALIYAH (SHINUI MA'AMAD)", "Form Ash/456, MR/14a/b & The 24-Month Sal Klita Cliff", "Requires Form Ash/456 (fee-exempt per Sec. ג.7), MR/14a/b, Nativ Security CV, and fresh <180d Apostilles. Warning: >24 cumulative months in Israel in the prior 3 years cancels the ~21,700 NIS Sal Klita!", [["1️⃣ Read First: 5 Apostilled Docs & 24-Mo Sal Klita Rules", "term:five_docs"], ["2️⃣ Read Next: 60–90 Day Bridge Health Insurance", "term:bridge_health"], ["3️⃣ Open Form Ash/456 & MR/14a Hebrew Filler →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 SPOUSAL VISA PLAYBOOK (NOHAL 5.2.0008)", "Passing the Graduated Spousal Process & 300-Question Separated-Room Interview", "Clerks audit every date on your 6-page Form Ash/6 (or 13-clause Nespach Alef) and separate you into two rooms for 80 daily-life questions.", [["1️⃣ Read First: 300-Question Separated-Room Interrogation", "obs:6"], ["2️⃣ Read Next: The 5 Apostilled Docs & Sec. ד.2.ה Exemption", "obs:1"], ["3️⃣ Open Form Ash/6 Hebrew Engine →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DUAL-TRACK COUPLE PLAYBOOK (SEC. ג.10)", "Run Spousal Residency AND Rabbanut Conversion Simultaneously!", "Under Nohal 5.2.0008 Sec. ג.10, you have the statutory right to lock in your Spousal B/1 work permit AND complete Rabbanut conversion at the same time—and BOTH partners must study!", [["1️⃣ Read First: Both Partners Must Study (Rabbi & Kallah)", "obs:5"], ["2️⃣ Read Next: 300-Question Separated-Room Interview", "obs:6"], ["3️⃣ Read Next: Why Private Conversions Block Rabbanut Weddings", "obs:2"]]], "crim": ["🛡️ REHABILITATION PLAYBOOK", "Never Hide an Old or Expunged Arrest — Use a Rehabilitation Dossier", "Checking 'No Criminal Record' when an expunged arrest shows on an FBI/ACRO/RCMP check causes instant rejection. Upfront disclosure with a Hebrew Rehabilitation Michtav Hesber prevents 2-year appeals.", [["1️⃣ Read First: Applying With a Criminal Record Guide", "obs:7"], ["2️⃣ Read Next: The 5 Apostilled Docs & 3-Bucket Check", "obs:1"], ["3️⃣ Request Vetted Lawyer Review / Escort →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **HOLD ON — Before You Fly Home & Back, Your Track Depends on ONE Critical Question!**\n\nMisrad HaPanim **refuses** immediate Aliyah on a tourist Private Beit Din conversion (Gush Etzion, Bnei Brak, etc.), and the Chief Rabbinate **100% blocks** private conversions for marriage in Israel.\n\n**Golden Rule While You Are Home:** Do NOT board your return flight without pulling all **5 double-Apostilled Homeland Docs** in person (Long-Form Birth Cert, Police Check <180d, Single Status Proof) + your **double-Apostilled Marriage Certificate**!\n\n👇 **To give you the exact track for you and your fiancé, tap who your fiancé is below:**\n\n[[ASK:FIANCE_IL: My fiancé is an Israeli Citizen|🇮🇱 A) My Fiancé Is an Israeli Citizen]]\n[[ASK:FIANCE_FJ: My fiancé is a Born Jew from abroad|✡️ B) My Fiancé Is a Born Jew from Abroad]]\n[[ASK:FIANCE_OT: My fiancé is also converting / not Jewish|🌍 C) My Fiancé Is Converting / Not an Israeli or Born Jew]]\n[[NAV:obs|0|📖 Or Minimize & Read: Private Beit Din Truth Popup]]", "fiance_il": "🇮🇱 **Your Fiancé Is an Israeli Citizen — Your Exact Dual-Track Playbook:**\n\n1. **While Home Getting Married:** Pull all **5 double-Apostilled Homeland Docs** in person + get an **Apostille on your Marriage Certificate** (listing prior status as 'Single' for the Sec. ד.2.ה exemption!).\n2. **Enter Spousal Track (*Nohal 5.2.0008* / Form Ash/6):** Locks in your legal residency & B/1 work visa immediately.\n3. **Run Rabbanut Conversion Simultaneously (Sec. ג.10):** Under Sec. ג.10, you can complete your **State Rabbanut validation (*Giyur L'Chumra* / *Ishur Giyur*)** in parallel! Both you and your Israeli spouse must study with a Rabbanut-recognized Rabbi & Madrichat Kallah.\n\n[[NAV:obs|1|1️⃣ Read First: Pull All 5 Apostilled Docs While Home]]\n[[NAV:obs|5|2️⃣ Read Next: Both Partners Must Study (Rabbi & Kallah)]]\n[[NAV:hebrew-engine|ash6|3️⃣ Open Form Ash/6 Spousal Dossier Engine]]", "fiance_fj": "✡️ **Your Fiancé Is a Born Jew from Abroad (Making Aliyah Together):**\n\n1. **Why Your Private Conversion Alone Won't Work:** Misrad HaPanim does not recognize a tourist's private Israeli conversion for independent Aliyah.\n2. **Before Flying Back:** Pull **both partners' 5 double-Apostilled civil documents**, your fiancé's Orthodox **Proof of Judaism (*Ishur Yahadut*)**, and your **Apostilled Marriage Certificate** into your Carry-On Go-Bag, then complete **Rabbanut Validation (*Ishur Giyur*)** in Israel so you and your future kids have 100% recognized status!\n\n[[NAV:term|go_bag|1️⃣ Read First: Pre-Flight Go-Bag (Bring All 5 Docs!)]]\n[[NAV:obs|2|2️⃣ Read Next: Rabbanut Validation (Ishur Giyur) for Future Kids]]\n[[NAV:obs|5|3️⃣ Read Next: Vetted Rabbanut Rabbi & Madrichat Kallah Guide]]", "fiance_ot": "🚨 **STOP — Danger Zone If Neither Partner Is an Israeli Citizen or Born Jew:**\n\nA private Israeli conversion done on a tourist visa does **not** grant Law of Return rights to you or your spouse! If you fly home, marry a partner who is not an Israeli or born Jew, and fly back expecting Aliyah, **Misrad HaPanim will block you both.**\n\n**Your 2 Legal Paths:**\n• **Option A (Overseas Recognized Community):** Validate/complete conversion for BOTH partners at a Rabbanut-recognized overseas Beit Din (RCA, London, Consistoire) + live in that community **9–12 full months AFTER the Mikvah**.\n• **Option B (In-Israel *Va'adat Charigim*):** Pull all **5 double-Apostilled Homeland Docs** while home, return to Israel, and file **Form Ash/1** to enter official State Conversion.\n\n[[NAV:term|overseas_giyur|1️⃣ Read First: Overseas 9–12 Month Community Rule]]\n[[NAV:obs|3|2️⃣ Read Next: Passing Va'adat Charigim (Form Ash/1) in Israel]]\n[[NAV:obs|1|3️⃣ Read Next: Pulling All 5 Apostilled Docs While Home]]", "priv_bd": "⚠️ **CRITICAL WARNING — Read This Before Going to Misrad HaPanim!**\n\nA conversion through **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), Jerusalem private courts, Chabad, or an unvalidated overseas Beit Din** is a **Private Beit Din** conversion—**NOT** the State Rabbanut (*Ma'arach HaGiyur*).\n\n1. **Misrad HaPanim Blocks Aliyah:** Misrad HaPanim **refuses** immediate Aliyah on a tourist private conversion and stalls *Bagatz* files for **2 to 5+ years**.\n2. **The Rabbanut Blocks Marriage:** The Chief Rabbinate **100% rejects** Gush Etzion and private conversions for marriage in Israel.\n3. **Your 2 Real Paths:** Complete **State Rabbanut Conversion / Validation (*Ishur Giyur* + 5 Apostilled Docs + 9-Mo Community)** OR file the **Spousal Track (*Nohal 5.2.0008 / Form Ash/6*)**.\n\n[[NAV:obs|0|1️⃣ Read First: Private Beit Din & Gush Etzion Trap]]\n[[NAV:obs|2|2️⃣ Read Next: 9-Month Community & Ishur Giyur Rule]]\n[[NAV:obs|1|3️⃣ Read Next: The 5 Mandatory Apostilled Homeland Docs]]", "dahan": "⚠️ **STOP — The Truth About Non-Orthodox ('Dahan Ruling') Conversions:**\n\n1. **The Chief Rabbinate 100% rejects non-Orthodox conversions**—permanently blocking you and your future children from marrying a Jewish citizen through the Rabbanut.\n2. **Misrad HaPanim drags *Dahan* files out for years**, whereas you can complete a **100% Halachic, Rabbanut-recognized conversion** in the same timeframe with our Vetted Sponsoring Rabbi & Madrichat Kallah!\n\n[[NAV:term|dahan_truth|1️⃣ Read First: The Unfiltered Dahan vs. Rabbanut Truth]]\n[[NAV:obs|5|2️⃣ Read Next: Vetted Rabbanut Sponsoring Rabbi & Kallah Guide]]", "vc": "🏛️ **Passing *Va'adat Charigim* (Form Ash/1) on a B/2 Tourist Visa:**\n\nTourists are blocked from State Conversion unless they first pass **Va'adat Charigim** with Form Ash/1, Ash/3, a Hebrew *Michtav Hesber*, 5–8+ Israeli Rabbi/Host Family letters, and 5 Apostilled Homeland Docs before their 90-day visa expires.\n\n[[NAV:obs|3|1️⃣ Read First: Passing Va'adat Charigim & Freezing Your Clock]]\n[[NAV:obs|1|2️⃣ Read Next: The 5 Mandatory Apostilled Docs]]\n[[NAV:hebrew-engine|ash1|3️⃣ Open Form Ash/1 & Ash/3 Guided Hebrew Engine]]"}}, "he": {"cat1": "🕍 קטגוריה 1: גיור, בתי דין פרטיים והרבנות הראשית", "cat2": "🛂 קטגוריה 2: שעון אשרת תייר, 5 מסמכי אפוסטיל והישרדות בארץ", "cat3": "💍 קטגוריה 3: הליך מדורג (5.2.0008), דרישות מסמכים ועבר פלילי", "freeTag": "מדריכים בחינם", "f_h": "🧭 באיזה מסלול אתם מתעניינים?", "f_s": "לחצו על המסלול שלכם לפתיחת תוכנית העבודה המדויקת צעד אחר צעד:", "f_b1": "🕍 1) גיור — אני רוצה להתגייר (או לאמת גיור קיים)", "f_b2": "✈️ 2) עלייה — אני רוצה לעשות עלייה לישראל (או אשרת בני זוג)", "f_b3": "✡️ 3) שניהם — אני רוצה גם להתגייר וגם לעשות עלייה / להינשא", "q1_t": "שלב 1 מתוך 2: היכן אתם נמצאים בתהליך הגיור כרגע?", "q1_opts": [["🏛️ התגיירתי / מתגייר בבית דין פרטי (גוש עציון, בני ברק, חב״ד או בחו״ל)", "priv_bd"], ["💔 שוקל / עברתי גיור לא-אורתודוקסי (רפורמי / קונסרבטיבי — פס״ד דהן)", "dahan_bd"], ["🛂 נמצא בישראל באשרת תייר B/2 ורוצה גיור ממלכתי (וועדת חריגים)", "tourist_vc"], ["📚 זקוק לרב מלווה מוכר ברבנות, מדריכת כלה והכנה ל-700 שאלות בית הדין", "state_prep"]], "q2_t": "שלב 1 מתוך 2: איזה מסלול עלייה או הסדרת מעמד מתאים לכם?", "q2_opts": [["🚨 עדיין בחו״ל / עליית חירום: אילו 5 מסמכי אפוסטיל חובה להביא בתיק היד לפני הטיסה?", "go_bag"], ["✈️ נמצא בישראל: שינוי מעמד לעולה בארץ (טופס אש/456 ומלכודת 24 חודשי סל קליטה)", "shinui"], ["💍 נשוי או ידוע בציבור של אזרח/ית ישראלי/ת (הליך מדורג נוהל 5.2.0008 / טופס אש/6)", "spousal"], ["🛡️ בקשת עלייה או אשרת בני זוג עם רישום / עבר פלילי ישן (תעודת יושר)", "crim"]], "q3_t": "שלב 1 מתוך 2: מה המצב הנוכחי שלכם לשילוב גיור ועלייה?", "q3_opts": [["⚠️ התגיירתי בגוש עציון / בני ברק / גיור פרטי או בחו״ל ורוצה עלייה / נישואין", "priv_bd"], ["💑 בזוגיות עם אזרח/ית ישראלי/ת: צריך גם הליך מדורג (5.2.0008) וגם גיור ברבנות (סעיף ג.10)", "dual"], ["🛂 באשרת תייר B/2 (ללא בן זוג ישראלי) וצריך וועדת חריגים (אש/1) + מדריך מחייה", "tourist_vc"], ["✈️ עדיין בחו״ל: מתכנן להגיע לישראל לגיור ועלייה (5 מסמכי אפוסטיל תחילה!)", "go_bag"]], "res": {"priv_bd": ["🚨 תוכנית עבודה • גיור פרטי / גוש עציון / חו״ל", "מדוע משרד הפנים והרבנות חוסמים גיור פרטי (וכיצד פותרים זאת)", "משרד הפנים מקפיא תיקי גיור פרטי של תיירים ל-2–5+ שנים, והרבנות הראשית חוסמת ב-100% רישום נישואין ללא אימות ברבנות הראשית (׳אישור גיור׳ / גיור לחומרא) או פתיחת הליך מדורג (נוהל 5.2.0008) במקביל.", [["1️⃣ קראו תחילה: מלכודת הגיור הפרטי וגוש עציון", "obs:0"], ["2️⃣ השלב הבא: חוק 9 חודשי קהילה ואישור גיור", "obs:2"], ["3️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל (180 יום)", "obs:1"]]], "dahan_bd": ["⚠️ תוכנית עבודה • גיור לא-אורתודוקסי (פס״ד דהן)", "מדוע הרבנות הראשית חוסמת בוגרי גיור ׳דהן׳ מנישואין בישראל", "גיור לא-אורתודוקסי חוסם לצמיתות אתכם ואת ילדיכם העתידיים מנישואין כדת משה וישראל ברבנות. ניתן להשלים גיור הלכתי המוכר ב-100% ברבנות באותו פרק זמן.", [["1️⃣ קראו תחילה: האמת על פס״ד דהן מול הרבנות", "term:dahan_truth"], ["2️⃣ השלב הבא: רב מלווה ומדריכת כלה מוכרים ברבנות", "obs:5"], ["3️⃣ השלב הבא: מעבר וועדת חריגים (טופס אש/1)", "obs:3"]]], "tourist_vc": ["🏛️ תוכנית עבודה • מתייר B/2 לגיור ממלכתי", "כיצד לעבור וועדת חריגים (טופס אש/1) לפני פקיעת 90 ימי האשרה", "תיירים חייבים לעבור את וועדת החריגים עם טופס אש/1, מכתב הסבר חוקי בעברית, 5–8+ מכתבי רב וקהילה ו-5 מסמכי אפוסטיל.", [["1️⃣ קראו תחילה: וועדת חריגים והקפאת שעון 90 היום", "obs:3"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל", "obs:1"], ["3️⃣ השלב הבא: עבודה מרחוק ומגורים חוקיים לתייר", "obs:8"]]], "state_prep": ["🕍 תוכנית עבודה • הכנה לבית הדין והרבנות", "שני בני הזוג חייבים ללמוד! רב מלווה, מדריכת כלה ומבחן 700 השאלות", "גם כאשר אחד מבני הזוג הוא אזרח ישראלי יהודי מלידה, בית הדין מחייב את שני בני הזוג בלימוד עם רב מלווה ומדריכת כלה מוסמכת.", [["1️⃣ קראו תחילה: מדריך רב מלווה, מדריכת כלה ומבחן בית הדין", "obs:5"], ["2️⃣ השלב הבא: 5–8+ מכתבי המלצה מרב ומשפחה מארחת", "term:community_letters"], ["3️⃣ פתיחת מאגר 700 שאלות בית הדין ו-56 שירי שבת →", "app:beit-din-150|"]]], "go_bag": ["🚨 פרוטוקול תיק-יד (GO-BAG) לפני טיסה", "אל תעלו על מטוס ללא 5 מסמכי המקור המאומתים באפוסטיל כפול", "הזמנת תעודת לידה מורחבת, תמצית רווקות ותעודת יושר פדרלית מרחוק מתוך ישראל אורכת חודשים בזמן ששעון 180 הימים פוקע.", [["1️⃣ קראו תחילה: רשימת החובה לתיק היד לפני טיסה", "term:go_bag"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ושעון 180 הימים", "obs:1"], ["3️⃣ השלב הבא: העברת כספים ותשלום שכ״ד ב-₪ ללא ת״ז", "term:fx_shield"]]], "shinui": ["✈️ עלייה מתוך ישראל (שינוי מעמד • נוהל 5.2.0001)", "טופס אש/456, מר/14 ומלכודת 24 החודשים של סל הקליטה", "מחייב טופס אש/456 (פטור מאגרה לפי סעיף ג.7), מר/14 ואפוסטיל בתוקף <180 יום. אזהרה: שהייה של מעל 24 חודשים מצטברים ב-3 השנים האחרונות שוללת את מענק סל הקליטה (~21,700 ₪)!", [["1️⃣ קראו תחילה: 5 מסמכי האפוסטיל וכללי סל קליטה", "term:five_docs"], ["2️⃣ השלב הבא: ביטוח רפואי גישור ל-60–90 יום", "term:bridge_health"], ["3️⃣ פתיחת ממלא טופס אש/456 ומר/14 בעברית →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 תוכנית עבודה • הליך מדורג (נוהל 5.2.0008)", "מעבר ההליך המדורג לבני זוג וראיון 80 השאלות בחדרים נפרדים", "פקידי משרד הפנים בוחנים כל תאריך בטופס אש/6 (או תצהיר נספח א׳) ומפרידים ביניכם לשני חדרים ל-300 שאלות טריוויה על חיי היום-יום.", [["1️⃣ קראו תחילה: ראיון 80 השאלות בחדרים נפרדים", "obs:6"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ופטור סעיף ד.2.ה", "obs:1"], ["3️⃣ פתיחת ממלא טופס אש/6 בעברית →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 מסלול כפול לבני זוג (סעיף ג.10)", "זכותכם החוקית לנהל הליך מדורג וגיור ממלכתי במקביל!", "לפי נוהל 5.2.0008 סעיף ג.10, זכותכם החוקית לקבל אשרת עבודה B/1 בהליך המדורג ולהשלים גיור ברבנות במקביל ללא סגירת תיק!", [["1️⃣ קראו תחילה: שני בני הזוג חייבים ללמוד (רב ומדריכת כלה)", "obs:5"], ["2️⃣ השלב הבא: ראיון 80 השאלות בחדרים נפרדים", "obs:6"], ["3️⃣ השלב הבא: מדוע גיור פרטי חוסם חתונה ברבנות", "obs:2"]]], "crim": ["🛡️ תוכנית שיקום • עלייה / אשרה עם רישום פלילי", "לעולם אל תסתירו מעצר ישן או מחוק — הגישו אוגדן שיקום חוקי", "סימון ׳אין עבר פלילי׳ כשמעצר ישן מופיע בבדיקת טביעות אצבע פדרלית גורם לדחייה מיידית. גילוי נאות מראש עם מכתב הסבר בעברית מונע ערעורים של שנתיים.", [["1️⃣ קראו תחילה: מדריך עלייה ואשרה עם עבר פלילי", "obs:7"], ["2️⃣ השלב הבא: 5 מסמכי האפוסטיל ובדיקת 3 המדינות", "obs:1"], ["3️⃣ בקשת ליווי עו״ד / בדיקת תיק →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **רגע לפני שאתם טסים — המסלול שלכם תלוי בשאלה קריטית אחת!**\n\nמשרד הפנים **אינו מאשר** עלייה מיידית על סמך גיור פרטי באשרת תייר (גוש עציון, בני ברק וכו׳), והרבנות הראשית **חוסמת ב-100%** גיור פרטי לנישואין בישראל.\n\n**כלל ברזל בזמן שאתם בחו״ל:** אל תעלו על טיסת החזור בלי להוציא ידנית את **5 מסמכי האפוסטיל מחו״ל** (תעודת לידה מורחבת, תעודת יושר <180 יום, תמצית רווקות) + **תעודת נישואין מאומתת באפוסטיל**!\n\n👇 **כדי להתאים לכם את המסלול המדויק, לחצו מיהו בן/בת הזוג שלכם:**\n\n[[ASK:FIANCE_IL: בן/בת הזוג אזרח/ית ישראלי/ת|🇮🇱 א) בן/בת הזוג שלי אזרח/ית ישראלי/ת]]\n[[ASK:FIANCE_FJ: בן/בת הזוג יהודי/יה מלידה מחו״ל|✡️ ב) בן/בת הזוג יהודי/יה מלידה מחו״ל (עולים יחד)]]\n[[ASK:FIANCE_OT: בן/בת הזוג מתגייר/ת או לא ישראלי/יה|🌍 ג) בן/בת הזוג מתגייר/ת / לא אזרח ישראלי או יהודי מלידה]]\n[[NAV:obs|0|📖 או מזערו וקראו: מלכודת הגיור הפרטי]]", "fiance_il": "🇮🇱 **בן/בת הזוג אזרח/ית ישראלי/ת — המסלול הכפול שלכם (סעיף ג.10):**\n\n1. **בזמן שאתם בחו״ל לחתונה:** הוציאו ידנית את **5 מסמכי האפוסטיל** + החתימו **אפוסטיל על תעודת הנישואין** (וודאו שמצבכם הקודם רשום כ׳רווק/ה׳ לקבלת פטור סעיף ד.2.ה!).\n2. **פתחו הליך מדורג (נוהל 5.2.0008 / טופס אש/6):** מעניק אשרת עבודה B/1 ומעמד חוקי מיידי.\n3. **השלימו גיור ברבנות במקביל (סעיף ג.10):** לפי סעיף ג.10 זכותכם להשלים **אימות ברבנות הראשית (גיור לחומרא / אישור גיור)** במקביל להליך המדורג!\n\n[[NAV:obs|1|1️⃣ קראו תחילה: 5 מסמכי האפוסטיל מחו״ל]]\n[[NAV:obs|5|2️⃣ השלב הבא: שני בני הזוג חייבים ללמוד (רב ומדריכת כלה)]]\n[[NAV:hebrew-engine|ash6|3️⃣ פתיחת טופס אש/6 להליך מדורג]]", "fiance_fj": "✡️ **בן/בת הזוג יהודי/יה מלידה מחו״ל (עולים יחד לישראל):**\n\n1. **מדוע הגיור הפרטי לבדו לא יספיק:** משרד הפנים אינו מכיר בגיור פרטי של תייר בישראל לעלייה עצמאית.\n2. **לפני טיסת החזור:** הביאו בתיק היד את **5 מסמכי האפוסטיל של שניכם**, **אישור יהדות אורתודוקסי** של בן/בת הזוג, ו**תעודת נישואין עם אפוסטיל**, ובארץ השלימו **אישור גיור ברבנות הראשית**!\n\n[[NAV:term|go_bag|1️⃣ קראו תחילה: תיק-יד (Go-Bag) לפני טיסה]]\n[[NAV:obs|2|2️⃣ השלב הבא: אישור גיור ברבנות למען הילדים]]\n[[NAV:obs|5|3️⃣ השלב הבא: רב מלווה ומדריכת כלה מוכרים]]", "fiance_ot": "🚨 **עצרו — אזור סכנה כאשר שני בני הזוג אינם אזרחים ישראלים או יהודים מלידה:**\n\nגיור פרטי שנעשה בישראל באשרת תייר **אינו מקנה זכות שבות** לכם או לבן/בת זוגכם! אם תטוסו להתחתן ותחזרו בציפייה לעלייה, **משרד הפנים יסרב לשניכם.**\n\n**2 האפשרויות החוקיות שלכם:**\n• **אפשרות א׳ (קהילה מוכרת בחו״ל):** השלמת גיור בבית דין מוכר בחו״ל (RCA, בד״ץ לונדון, קונסיסטואר) + **9–12 חודשי מגורים בקהילה לאחר המקווה**.\n• **אפשרות ב׳ (וועדת חריגים בישראל):** איסוף **5 מסמכי האפוסטיל** בחו״ל והגשת **טופס אש/1** לוועדת חריגים לגיור ממלכתי.\n\n[[NAV:term|overseas_giyur|1️⃣ קראו תחילה: חוק 9–12 חודשי קהילה בחו״ל]]\n[[NAV:obs|3|2️⃣ השלב הבא: מעבר וועדת חריגים (טופס אש/1)]]\n[[NAV:obs|1|3️⃣ השלב הבא: 5 מסמכי האפוסטיל מחו״ל]]", "priv_bd": "⚠️ **עצרו — קראו זאת לפני שתפנו למשרד הפנים או לרבנות!**\n\nגיור דרך **גוש עציון (׳גיור כהלכה׳), בני ברק (ר׳ קרליץ), בתי דין פרטיים או גיור בחו״ל ללא אישור** נחשב **גיור פרטי** ולא גיור ממלכתי של הרבנות הראשית.\n1. **משרד הפנים:** פקידי משרד הפנים **אינם מאשרים עלייה** למי שהתגייר בגיור פרטי באשרת תייר ומקפיאים תיקים ל-2–5+ שנים.\n2. **הרבנות הראשית:** הרבנות **מסרבת ב-100%** לרשום לנישואין בוגרי גיור פרטי ללא השלמת **מסלול הרבנות הראשית (׳אישור גיור׳ / גיור לחומרא)** או **הליך מדורג (נוהל 5.2.0008 / טופס אש/6)**.\n\n[[NAV:obs|0|1️⃣ קראו תחילה: מלכודת הגיור הפרטי וגוש עציון]]\n[[NAV:obs|2|2️⃣ קראו כעת: חוק 9 חודשי קהילה ואישור גיור]]\n[[NAV:obs|1|3️⃣ קראו כעת: 5 מסמכי האפוסטיל מחו״ל (שעון 180 יום)]]", "dahan": "⚠️ **עצרו — האמת על גיור לא-אורתודוקסי (פסק דין דהן):**\n\n1. **הרבנות הראשית פוסלת ב-100% גיור לא-אורתודוקסי**—וחוסמת לצמיתות אתכם ואת ילדיכם מנישואין כדת משה וישראל.\n2. **משרד הפנים גורר תיקי דהן במשך שנים**, בעוד שניתן להשלים **גיור הלכתי המוכר ב-100% ברבנות** באותו פרק זמן עם הרב המלווה ומדריכת הכלה שלנו!\n\n[[NAV:term|dahan_truth|1️⃣ קראו תחילה: האמת על פס״ד דהן מול הרבנות]]\n[[NAV:obs|5|2️⃣ קראו כעת: רב מלווה ומדריכת כלה מוכרים ברבנות]]", "vc": "🏛️ **מעבר וועדת חריגים (טופס אש/1) באשרת תייר B/2:**\n\nתיירים חסומים מכניסה לגיור ממלכתי ללא מעבר **וועדת חריגים** עם טופס אש/1, אש/3, מכתב הסבר בעברית, 5–8+ מכתבי רב וקהילה ו-5 מסמכי אפוסטיל לפני פקיעת 90 ימי האשרה.\n\n[[NAV:obs|3|1️⃣ קראו תחילה: מעבר וועדת חריגים והקפאת השעון]]\n[[NAV:obs|1|2️⃣ קראו כעת: 5 מסמכי האפוסטיל מחו״ל]]\n[[NAV:hebrew-engine|ash1|3️⃣ פתיחת ממלא טופס אש/1 ואש/3 בעברית]]"}}, "fr": {"cat1": "🕍 CATÉGORIE 1 : CONVERSION, BEIT DIN PRIVÉS & GRAND RABBINAT", "cat2": "🛂 CATÉGORIE 2 : DÉLAIS VISA, 5 DOCUMENTS APOSTILLÉS & SURVIE TOURISTE", "cat3": "💍 CATÉGORIE 3 : VISA CONJOINT (5.2.0008), LETTRES PIBA & CASIER", "freeTag": "Guides Gratuits", "f_h": "🧭 Quel parcours vous intéresse ?", "f_s": "Touchez votre parcours ci-dessous pour ouvrir votre guide étape par étape :", "f_b1": "🕍 1) Giyur — Je veux me convertir (ou valider ma conversion)", "f_b2": "✈️ 2) Aliyah — Je veux faire mon Aliyah en Israël (ou Visa Conjoint)", "f_b3": "✡️ 3) Les Deux — Je veux me convertir ET faire mon Aliyah / me marier", "q1_t": "Étape 1 sur 2 : Où en êtes-vous dans votre parcours de conversion ?", "q1_opts": [["🏛️ Converti(e) / en cours dans un Beit Din Privé (Gush Etzion, Bnei Brak, Chabad ou Étranger)", "priv_bd"], ["💔 Conversion non-orthodoxe envisagée / effectuée (Réformée / Massorti — arrêt Dahan)", "dahan_bd"], ["🛂 En Israël sous visa touriste B/2 (90j) & souhaite le Giyur d'État (Va'adat Charigim)", "tourist_vc"], ["📚 Besoin d'un Rabbin accompagnateur reconnu, Madrichat Kallah & préparation 700 questions", "state_prep"]], "q2_t": "Étape 1 sur 2 : Quelle situation d'Aliyah ou de statut vous correspond ?", "q2_opts": [["🚨 Encore à l'étranger / Départ d'urgence : Quels 5 documents apostillés mettre dans mon Go-Bag ?", "go_bag"], ["✈️ Déjà en Israël : Aliyah en Israël (Shinui Ma'amad Formulaire Ash/456 & Sal Klita 24 mois)", "shinui"], ["💍 Conjoint marié ou concubin d'un citoyen israélien (Procédure Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Demande d'Aliyah ou Visa Conjoint avec un ancien antécédent / Casier (Bulletin n°3)", "crim"]], "q3_t": "Étape 1 sur 2 : Quelle est votre situation actuelle pour Conversion + Aliyah ?", "q3_opts": [["⚠️ Converti(e) via Gush Etzion / Bnei Brak / Beit Din privé ou étranger & souhaite Aliyah / Mariage", "priv_bd"], ["💑 En couple avec un(e) Israélien(ne) : Besoin Visa Conjoint (5.2.0008) + Conversion Rabbinat (Art. ג.10)", "dual"], ["🛂 Sous visa touriste B/2 (sans conjoint israélien) : Besoin Va'adat Charigim (Ash/1) + Guide Survie", "tourist_vc"], ["✈️ Encore à l'étranger : Prévoit de venir en Israël pour conversion & Aliyah (5 docs apostillés d'abord !)", "go_bag"]], "res": {"priv_bd": ["🚨 GUIDE BEIT DIN PRIVÉ / ÉTRANGER", "Pourquoi le Misrad HaPanim et le Grand Rabbinat bloquent Gush Etzion / les conversions privées", "Le Misrad HaPanim bloque les conversions privées touristes pendant 2 à 5+ ans, et le Grand Rabbinat refuse à 100% d'enregistrer le mariage sans validation d'État ('Ishur Giyur' / Giyur L'Chumra) ou dossier Conjoint (Nohal 5.2.0008) en parallèle.", [["1️⃣ À lire d'abord : Piège Gush Etzion & Beit Din Privé", "obs:0"], ["2️⃣ Étape 2 : Règle des 9 mois en communauté & Ishur Giyur", "obs:2"], ["3️⃣ Étape 3 : Les 5 documents apostillés (Délai 180j)", "obs:1"]]], "dahan_bd": ["⚠️ GUIDE CONVERSION NON-ORTHODOXE ('DAHAN')", "Pourquoi le Grand Rabbinat bloque les conversions 'Dahan' pour le mariage en Israël", "Une conversion non-orthodoxe vous interdit définitivement (ainsi qu'à vos futurs enfants) de vous marier via le Rabbinat israélien. Vous pouvez accomplir un parcours 100% Halakhique reconnu dans le même délai.", [["1️⃣ À lire d'abord : La vérité sur l'arrêt Dahan vs Rabbinat", "term:dahan_truth"], ["2️⃣ Étape 2 : Rabbin accompagnateur & Madrichat Kallah reconnus", "obs:5"], ["3️⃣ Étape 3 : Passer la Va'adat Charigim (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ GUIDE TOURISTE B/2 VERS GIYUR D'ÉTAT", "Comment passer la Va'adat Charigim (Form. Ash/1) avant la fin des 90 jours", "Les touristes doivent obtenir l'accord de la Commission des Exceptions avec le formulaire Ash/1, une lettre explicative en hébreu (Michtav Hesber), 5–8+ lettres de rabbins et les 5 documents apostillés.", [["1️⃣ À lire d'abord : Va'adat Charigim & gel du délai de 90j", "obs:3"], ["2️⃣ Étape 2 : Les 5 documents apostillés obligatoires", "obs:1"], ["3️⃣ Étape 3 : Télétravail légal & logement sous visa B/2", "obs:8"]]], "state_prep": ["🕍 PRÉPARATION BEIT DIN & RABBINAT", "Les deux partenaires doivent étudier ! Rabbin, Kallah & Examen 700 Questions", "Même si l'un des conjoints est citoyen israélien juif de naissance, le Beit Din exige que les DEUX partenaires étudient avec un rabbin reconnu et une Madrichat Kallah certifiée.", [["1️⃣ À lire d'abord : Guide Rabbin, Kallah & Examen Beit Din", "obs:5"], ["2️⃣ Étape 2 : 5–8+ lettres de recommandation rabbiniques", "term:community_letters"], ["3️⃣ Ouvrir les 700 Questions Beit Din & 56 Chants →", "app:beit-din-150|"]]], "go_bag": ["🚨 PROTOCOLE GO-BAG AVANT LE VOL", "Ne montez PAS dans l'avion sans vos 5 originaux doublement apostillés", "Commander une Copie Intégrale de Naissance, un Certificat de Célibat et un Bulletin n°3 depuis Israël prend des mois pendant que le délai de 180 jours expire.", [["1️⃣ À lire d'abord : Check-list Go-Bag avant départ", "term:go_bag"], ["2️⃣ Étape 2 : Les 5 documents apostillés & l'horloge des 180j", "obs:1"], ["3️⃣ Étape 3 : Transférer des fonds & payer son loyer en ₪ sans TZ", "term:fx_shield"]]], "shinui": ["✈️ ALIYAH EN ISRAËL (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formulaire Ash/456, MR/14a/b & le piège des 24 mois du Sal Klita", "Exige le formulaire Ash/456 (exonéré de frais art. ג.7), MR/14a/b et des apostilles <180j. Attention : >24 mois cumulés en Israël durant les 3 dernières années annule la prime Sal Klita (~21 700 ₪) !", [["1️⃣ À lire d'abord : 5 documents apostillés & règles Sal Klita", "term:five_docs"], ["2️⃣ Étape 2 : Assurance santé pont de 60–90 jours", "term:bridge_health"], ["3️⃣ Ouvrir le générateur hébreu Ash/456 & MR/14a →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 GUIDE VISA CONJOINT (NOHAL 5.2.0008)", "Réussir la procédure graduée et l'interrogatoire des 80 questions en salles séparées", "Les agents vérifient chaque date du formulaire Ash/6 (6 pages) et vous séparent dans deux pièces pour 80 questions sur votre vie quotidienne.", [["1️⃣ À lire d'abord : L'interrogatoire des 80 questions en salles séparées", "obs:6"], ["2️⃣ Étape 2 : Les 5 documents apostillés & dispense art. ד.2.ה", "obs:1"], ["3️⃣ Ouvrir le moteur hébreu Formulaire Ash/6 →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 GUIDE DOUBLE PARCOURS COUPLE (ART. ג.10)", "Menez simultanément votre résidence conjoint ET votre conversion au Rabbinat !", "Selon le Nohal 5.2.0008 art. ג.10, vous avez le droit légal d'obtenir votre permis de travail B/1 conjoint ET de compléter votre conversion au Rabbinat en parallèle !", [["1️⃣ À lire d'abord : Les deux partenaires doivent étudier", "obs:5"], ["2️⃣ Étape 2 : L'interrogatoire des 80 questions", "obs:6"], ["3️⃣ Étape 3 : Pourquoi les conversions privées bloquent les mariages", "obs:2"]]], "crim": ["🛡️ GUIDE RÉHABILITATION • CASIER JUDICIAIRE", "Ne cachez jamais une ancienne arrestation — Utilisez un dossier de réhabilitation", "Cocher 'Aucun antécédent' lorsqu'une mention figure sur le casier judiciaire entraîne un refus immédiat. Une déclaration transparente avec lettre explicative en hébreu évite 2 ans de recours.", [["1️⃣ À lire d'abord : Guide Aliyah / Visa avec antécédents", "obs:7"], ["2️⃣ Étape 2 : Les 5 documents apostillés & vérification 3 pays", "obs:1"], ["3️⃣ Demander l'assistance d'un avocat vérifié →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ATTENTION — Avant de voyager pour vous marier, votre parcours dépend d'UNE question clé !**\n\nLe Misrad HaPanim **refuse** l'Aliyah immédiate après une conversion privée sous visa touriste (Gush Etzion, Bnei Brak, etc.), et le Grand Rabbinat **bloque à 100%** ces conversions pour le mariage en Israël.\n\n**Règle d'or pendant votre séjour au pays :** Ne reprenez PAS l'avion sans récupérer en personne vos **5 documents originaux apostillés** + votre **Acte de Mariage apostillé** !\n\n👇 **Pour connaître votre parcours exact, indiquez le statut de votre fiancé(e) :**\n\n[[ASK:FIANCE_IL: Mon/ma fiancé(e) est citoyen(ne) israélien(ne)|🇮🇱 A) Mon/ma fiancé(e) est citoyen(ne) israélien(ne)]]\n[[ASK:FIANCE_FJ: Mon/ma fiancé(e) est Juif/Juive de naissance à l'étranger|✡️ B) Mon/ma fiancé(e) est Juif/Juive de naissance (Aliyah ensemble)]]\n[[ASK:FIANCE_OT: Mon/ma fiancé(e) est aussi en conversion / non-Israélien|🌍 C) Mon/ma fiancé(e) se convertit / n'est ni Israélien ni Juif de naissance]]\n[[NAV:obs|0|📖 Ou réduire & lire : Piège des Beit Din Privés]]", "fiance_il": "🇮🇱 **Votre fiancé(e) est citoyen(ne) israélien(ne) — Votre Double Parcours (Art. ג.10) :**\n\n1. **Pendant votre séjour au pays :** Récupérez vos **5 documents apostillés** + faites apostiller votre **Acte de Mariage** (mentionnant votre état antérieur 'Célibataire' pour la dispense art. ד.2.ה !).\n2. **Ouvrez le dossier Conjoint (*Nohal 5.2.0008* / Form. Ash/6) :** Vous donne immédiatement un visa de travail B/1.\n3. **Validation au Grand Rabbinat en parallèle (Art. ג.10) :** Vous avez le droit légal de mener simultanément votre dossier Conjoint et votre conversion d'État (*Ishur Giyur* / *Giyur L'Chumra*) !\n\n[[NAV:obs|1|1️⃣ À lire d'abord : Les 5 documents apostillés]]\n[[NAV:obs|5|2️⃣ Étape 2 : Les deux partenaires doivent étudier]]\n[[NAV:hebrew-engine|ash6|3️⃣ Ouvrir le générateur hébreu Formulaire Ash/6]]", "fiance_fj": "✡️ **Votre fiancé(e) est Juif/Juive de naissance à l'étranger (Aliyah ensemble) :**\n\n1. **Pourquoi votre conversion privée seule ne suffit pas :** Le Misrad HaPanim ne reconnaît pas une conversion privée touriste pour une Aliyah indépendante.\n2. **Avant de revenir en Israël :** Mettez dans votre Go-Bag les **5 documents apostillés des deux conjoints**, l'**Attestation de Judaïté (*Ishur Yahadut*)** du Consistoire de votre fiancé(e) et votre **Acte de Mariage apostillé**, puis validez votre conversion auprès du Grand Rabbinat !\n\n[[NAV:term|go_bag|1️⃣ À lire d'abord : Check-list Go-Bag avant le vol]]\n[[NAV:obs|2|2️⃣ Étape 2 : Validation Rabbinat (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Étape 3 : Rabbin accompagnateur & Madrichat Kallah]]", "fiance_ot": "🚨 **STOP — Danger si aucun des deux partenaires n'est citoyen israélien ou Juif de naissance :**\n\nUne conversion privée effectuée en Israël sous visa touriste **ne donne pas droit à la Loi du Retour** ! Si vous rentrez vous marier avec un partenaire non-israélien et revenez demander l'Aliyah, **le Misrad HaPanim vous refusera tous les deux.**\n\n**Vos 2 options légales :**\n• **Option A (Communauté reconnue à l'étranger) :** Valider la conversion des deux conjoints via le Consistoire/Beit Din reconnu + résider **9 à 12 mois complets APRÈS le Mikvé** dans cette communauté.\n• **Option B (*Va'adat Charigim* en Israël) :** Récupérer vos **5 documents apostillés** au pays et déposer le **Formulaire Ash/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ À lire d'abord : Règle des 9–12 mois à l'étranger]]\n[[NAV:obs|3|2️⃣ Étape 2 : Passer la Va'adat Charigim (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Étape 3 : Les 5 documents apostillés]]", "priv_bd": "⚠️ **AVERTISSEMENT CRITIQUE — Lisez ceci avant d'aller au Misrad HaPanim !**\n\nUne conversion via **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), un Beit Din privé ou à l'étranger sans validation** est une **conversion privée**—et **NON** le Giyur d'État du Grand Rabbinat.\n\n1. **Le Misrad HaPanim bloque l'Aliyah :** Refus d'Aliyah immédiate sous visa touriste et dossiers gelés pendant **2 à 5+ ans**.\n2. **Le Grand Rabbinat bloque le mariage :** Refus à **100%** d'enregistrer votre mariage sans validation officielle du Rabbinat (*Ishur Giyur*) ou procédure Conjoint (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ À lire d'abord : Piège Gush Etzion & Beit Din Privé]]\n[[NAV:obs|2|2️⃣ Étape 2 : Règle des 9 mois & Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Étape 3 : Les 5 documents apostillés obligatoires]]", "dahan": "⚠️ **STOP — La vérité sur les conversions non-orthodoxes ('Arrêt Dahan') :**\n\n1. **Le Grand Rabbinat rejette à 100% les conversions non-orthodoxes**—vous empêchant définitivement (ainsi que vos enfants) de vous marier via le Rabbinat en Israël.\n2. **Vous pouvez accomplir une conversion 100% Halakhique reconnue par le Rabbinat** dans le même délai avec notre Rabbin accompagnateur et Madrichat Kallah !\n\n[[NAV:term|dahan_truth|1️⃣ À lire d'abord : Vérité arrêt Dahan vs Rabbinat]]\n[[NAV:obs|5|2️⃣ Étape 2 : Rabbin accompagnateur & Madrichat Kallah]]", "vc": "🏛️ **Passer la *Va'adat Charigim* (Formulaire Ash/1) sous visa touriste B/2 :**\n\nLes touristes doivent obtenir l'autorisation de la Commission des Exceptions avec les formulaires Ash/1 et Ash/3, un *Michtav Hesber* en hébreu, 5–8+ lettres rabbiniques et les 5 documents apostillés avant l'expiration des 90 jours.\n\n[[NAV:obs|3|1️⃣ À lire d'abord : Va'adat Charigim & gel du délai]]\n[[NAV:obs|1|2️⃣ Étape 2 : Les 5 documents apostillés]]\n[[NAV:hebrew-engine|ash1|3️⃣ Ouvrir le moteur hébreu Formulaires Ash/1 & Ash/3]]"}}, "es": {"cat1": "🕍 CATEGORÍA 1: CONVERSIÓN, BEIT DIN PRIVADOS Y GRAN RABINATO", "cat2": "🛂 CATEGORÍA 2: RELOJES DE VISA, 5 DOCS APOSTILLADOS Y SUPERVIVENCIA", "cat3": "💍 CATEGORÍA 3: VISA DE PAREJA (5.2.0008), CARTAS PIBA Y ANTECEDENTES", "freeTag": "Guías Gratis", "f_h": "🧭 ¿En qué vía estás interesado?", "f_s": "Toca tu vía abajo para abrir tu plan de acción paso a paso:", "f_b1": "🕍 1) Giyur — Quiero convertirme (o validar mi conversión)", "f_b2": "✈️ 2) Aliyá — Quiero hacer Aliyá a Israel (o Visa Conyugal)", "f_b3": "✡️ 3) Ambos — Quiero convertirme Y hacer Aliyá / Casarme", "q1_t": "Paso 1 de 2: ¿Dónde te encuentras en tu proceso de conversión ahora mismo?", "q1_opts": [["🏛️ Me convertí / estoy convirtiéndome en un Beit Din Privado (Gush Etzion, Bnei Brak, Jabad o Exterior)", "priv_bd"], ["💔 Considerando / completé una conversión No-Ortodoxa (Reformista / Conservadora — fallo Dahan)", "dahan_bd"], ["🛂 En Israel con visa de turista B/2 (90d) y quiero Giyur Estatal (Va'adat Jariguim)", "tourist_vc"], ["📚 Necesito Rabino Patrocinador reconocido, Madrijat Kalá y preparación de 700 preguntas", "state_prep"]], "q2_t": "Paso 1 de 2: ¿Qué situación de Aliyá o residencia se ajusta a ti?", "q2_opts": [["🚨 Aún en el extranjero / Salida de emergencia: ¿Qué 5 docs apostillados llevar en mi Go-Bag?", "go_bag"], ["✈️ Ya en Israel: Aliyá desde dentro de Israel (Shinui Ma'amad Form. Ash/456 y Sal Klita 24 meses)", "shinui"], ["💍 Cónyuge casado o pareja de hecho de un ciudadano israelí (Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Solicitud de Aliyá o Visa de Pareja con antecedentes penales antiguos / cancelados", "crim"]], "q3_t": "Paso 1 de 2: ¿Cuál es tu situación actual para Conversión + Aliyá?", "q3_opts": [["⚠️ Convertido vía Gush Etzion / Bnei Brak / Beit Din privado o exterior y quiero Aliyá / Matrimonio", "priv_bd"], ["💑 En pareja con ciudadano(a) israelí: Necesito Visa Conyugal (5.2.0008) + Conversión Rabinato (Sec. ג.10)", "dual"], ["🛂 Con visa de turista B/2 (sin pareja israelí): Necesito Va'adat Jariguim (Ash/1) + Guía Supervivencia", "tourist_vc"], ["✈️ Aún en el extranjero: Planeo ir a Israel para convertir y hacer Aliyá (¡5 docs apostillados primero!)", "go_bag"]], "res": {"priv_bd": ["🚨 PLAN DE ACCIÓN • BEIT DIN PRIVADO / EXTERIOR", "Por qué Misrad HaPanim y el Gran Rabinato bloquean Gush Etzion / conversiones privadas", "Misrad HaPanim congela las conversiones privadas de turistas durante 2 a 5+ años, y el Gran Rabinato rechaza al 100% registrar matrimonios sin validación estatal ('Ishur Giyur' / Giyur L'Jumra) o trámite Conyugal (Nohal 5.2.0008) en paralelo.", [["1️⃣ Leer primero: Trampa de Gush Etzion y Beit Din Privado", "obs:0"], ["2️⃣ Paso 2: Regla de 9 meses en comunidad e Ishur Giyur", "obs:2"], ["3️⃣ Paso 3: Los 5 documentos apostillados (Reloj 180d)", "obs:1"]]], "dahan_bd": ["⚠️ PLAN DE ACCIÓN • CONVERSIÓN NO-ORTODOXA ('DAHAN')", "Por qué el Gran Rabinato bloquea las conversiones 'Dahan' para casarse en Israel", "Una conversión no-ortodoxa te impide permanentemente a ti y a tus futuros hijos casarse por el Rabinato israelí. Puedes completar una vía 100% Halájica reconocida en el mismo plazo.", [["1️⃣ Leer primero: La verdad sobre el fallo Dahan vs. Rabinato", "term:dahan_truth"], ["2️⃣ Paso 2: Rabino Patrocinador y Madrijat Kalá reconocidos", "obs:5"], ["3️⃣ Paso 3: Aprobar Va'adat Jariguim (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ PLAN DE ACCIÓN • TURISTA B/2 A GIYUR ESTATAL", "Cómo aprobar Va'adat Jariguim (Form. Ash/1) antes de que venzan tus 90 días", "Los turistas deben aprobar el Comité de Excepciones con el Formulario Ash/1, una carta legal en hebreo (Mijtav Hesber), 5–8+ cartas rabínicas y los 5 documentos apostillados.", [["1️⃣ Leer primero: Va'adat Jariguim y congelar el reloj de 90d", "obs:3"], ["2️⃣ Paso 2: Los 5 documentos apostillados obligatorios", "obs:1"], ["3️⃣ Paso 3: Trabajo remoto legal y vivienda con visa B/2", "obs:8"]]], "state_prep": ["🕍 PREPARACIÓN BEIT DIN Y RABINATO", "¡Ambos miembros de la pareja deben estudiar! Rabino, Kalá y Examen de 700 Preguntas", "Incluso cuando uno de los cónyuges es ciudadano israelí judío de nacimiento, el Beit Din exige que AMBOS estudien con un Rabino reconocido y una Madrijat Kalá certificada.", [["1️⃣ Leer primero: Guía de Rabino, Kalá y Examen Beit Din", "obs:5"], ["2️⃣ Paso 2: 5–8+ cartas de recomendación rabínicas", "term:community_letters"], ["3️⃣ Abrir 700 Preguntas Beit Din y 56 Canciones →", "app:beit-din-150|"]]], "go_bag": ["🚨 PROTOCOLO GO-BAG ANTES DEL VUELO", "NO subas al avión sin tus 5 originales doblemente apostillados", "Pedir Partida Literal de Nacimiento, Fe de Soltería y Antecedentes Penales a distancia desde Israel tarda meses mientras vence el plazo de 180 días.", [["1️⃣ Leer primero: Lista Go-Bag antes de volar", "term:go_bag"], ["2️⃣ Paso 2: Los 5 documentos apostillados y el reloj de 180d", "obs:1"], ["3️⃣ Paso 3: Transferir fondos y pagar alquiler en ₪ sin TZ", "term:fx_shield"]]], "shinui": ["✈️ ALIYÁ EN ISRAEL (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formulario Ash/456, MR/14a/b y el límite de 24 meses de la Sal Klita", "Requiere Formulario Ash/456 (exento de tasa art. ג.7), MR/14a/b y apostillas <180d. ¡Atención: >24 meses acumulados en Israel en los 3 años previos cancela la beca Sal Klita (~21.700 ₪)!", [["1️⃣ Leer primero: 5 documentos apostillados y reglas Sal Klita", "term:five_docs"], ["2️⃣ Paso 2: Seguro médico puente de 60–90 días", "term:bridge_health"], ["3️⃣ Abrir generador hebreo Ash/456 y MR/14a →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 PLAN VISA CONYUGAL (NOHAL 5.2.0008)", "Superar el proceso gradual y el interrogatorio de 80 preguntas en salas separadas", "Los funcionarios revisan cada fecha del Formulario Ash/6 (6 páginas) y los separan en dos salas para hacerles 80 preguntas de la vida diaria.", [["1️⃣ Leer primero: Interrogatorio de 80 preguntas en salas separadas", "obs:6"], ["2️⃣ Paso 2: Los 5 documentos apostillados y exención art. ד.2.ה", "obs:1"], ["3️⃣ Abrir motor hebreo Formulario Ash/6 →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DOBLE VÍA PARA PAREJAS (SEC. ג.10)", "¡Tramita tu Residencia Conyugal Y tu Conversión en el Rabinato simultáneamente!", "Según el Nohal 5.2.0008 sec. ג.10, tienes el derecho legal de asegurar tu permiso de trabajo B/1 conyugal Y completar tu conversión en el Rabinato al mismo tiempo.", [["1️⃣ Leer primero: Ambos miembros de la pareja deben estudiar", "obs:5"], ["2️⃣ Paso 2: Interrogatorio de 80 preguntas", "obs:6"], ["3️⃣ Paso 3: Por qué las conversiones privadas bloquean bodas", "obs:2"]]], "crim": ["🛡️ PLAN DE REHABILITACIÓN • ANTECEDENTES PENALES", "Nunca ocultes un arresto antiguo o cancelado — Usa un Dossier de Rehabilitación", "Marcar 'Sin antecedentes' cuando un registro antiguo aparece en el informe federal causa rechazo inmediato. La declaración previa con carta legal en hebreo evita apelaciones de 2 años.", [["1️⃣ Leer primero: Guía Aliyá / Visa con antecedentes", "obs:7"], ["2️⃣ Paso 2: Los 5 documentos apostillados y regla de 3 países", "obs:1"], ["3️⃣ Solicitar revisión o acompañamiento de abogado →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ALTO — Antes de viajar para casarte, ¡tu vía depende de UNA pregunta crítica!**\n\nMisrad HaPanim **rechaza** la Aliyá inmediata con una conversión privada de turista (Gush Etzion, Bnei Brak, etc.), y el Gran Rabinato **bloquea al 100%** las conversiones privadas para casarse en Israel.\n\n**Regla de Oro mientras estás en tu país:** ¡NO abordes tu vuelo de regreso sin sacar en persona tus **5 documentos originales doblemente apostillados** + tu **Acta de Matrimonio apostillada**!\n\n👇 **Para darte la vía exacta para ti y tu prometido(a), toca quién es tu pareja abajo:**\n\n[[ASK:FIANCE_IL: Mi prometido(a) es ciudadano(a) israelí|🇮🇱 A) Mi prometido(a) es ciudadano(a) israelí]]\n[[ASK:FIANCE_FJ: Mi prometido(a) es judío(a) de nacimiento del extranjero|✡️ B) Mi prometido(a) es judío(a) de nacimiento (hacemos Aliyá juntos)]]\n[[ASK:FIANCE_OT: Mi prometido(a) también se convierte / no es israelí|🌍 C) Mi prometido(a) se convierte / no es ciudadano israelí ni judío de nacimiento]]\n[[NAV:obs|0|📖 O minimizar y leer: Trampa de Beit Din Privados]]", "fiance_il": "🇮🇱 **Tu prometido(a) es ciudadano(a) israelí — Tu Doble Vía Exacta (Sec. ג.10):**\n\n1. **Mientras estás en tu país casándote:** Saca en persona tus **5 documentos apostillados** + apostilla tu **Acta de Matrimonio** (asegúrate de que indique tu estado previo 'Soltero/a' para la exención de la Sec. ד.2.ה).\n2. **Abre el Trámite Conyugal (*Nohal 5.2.0008* / Form. Ash/6):** Asegura tu visa de trabajo B/1 de inmediato.\n3. **Completa la conversión del Rabinato en paralelo (Sec. ג.10):** ¡Tienes el derecho legal de tramitar tu residencia conyugal y la validación estatal del Rabinato (*Ishur Giyur* / *Giyur L'Jumra*) simultáneamente!\n\n[[NAV:obs|1|1️⃣ Leer primero: Los 5 documentos apostillados]]\n[[NAV:obs|5|2️⃣ Paso 2: Ambos deben estudiar (Rabino y Kalá)]]\n[[NAV:hebrew-engine|ash6|3️⃣ Abrir motor hebreo Formulario Ash/6]]", "fiance_fj": "✡️ **Tu prometido(a) es judío(a) de nacimiento del extranjero (Aliyá juntos):**\n\n1. **Por qué tu conversión privada sola no basta:** Misrad HaPanim no reconoce una conversión privada de turista para Aliyá independiente.\n2. **Antes de volar de regreso:** Lleva en tu Go-Bag los **5 documentos apostillados de ambos**, el **Certificado de Judaísmo (*Ishur Yahadut*)** ortodoxo de tu pareja y su **Acta de Matrimonio apostillada**, ¡y valida tu conversión en el Gran Rabinato en Israel!\n\n[[NAV:term|go_bag|1️⃣ Leer primero: Lista Go-Bag antes del vuelo]]\n[[NAV:obs|2|2️⃣ Paso 2: Validación del Rabinato (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Paso 3: Rabino Patrocinador y Madrijat Kalá]]", "fiance_ot": "🚨 **ALTO — Zona de Peligro si ninguno de los dos es ciudadano israelí o judío de nacimiento:**\n\n¡Una conversión privada hecha en Israel con visa de turista **no otorga derechos de la Ley del Retorno** ni a ti ni a tu cónyuge! Si vuelas a casarte y regresan esperando hacer Aliyá, **Misrad HaPanim los rechazará a ambos.**\n\n**Tus 2 opciones legales:**\n• **Opción A (Comunidad reconocida en el exterior):** Validar la conversión de ambos en un Beit Din reconocido (AMIA, FCJE, RCA) + vivir **9 a 12 meses completos DESPUÉS de la Mikve** en esa comunidad.\n• **Opción B (*Va'adat Jariguim* en Israel):** Traer tus **5 documentos apostillados** y presentar el **Formulario Ash/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ Leer primero: Regla de 9–12 meses en el exterior]]\n[[NAV:obs|3|2️⃣ Paso 2: Aprobar Va'adat Jariguim (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Paso 3: Los 5 documentos apostillados]]", "priv_bd": "⚠️ **ADVERTENCIA CRÍTICA — ¡Lee esto antes de ir a Misrad HaPanim!**\n\nUna conversión a través de **Gush Etzion (*Giyur K'Halaja*), Bnei Brak (Rabino Karelitz), cortes privadas o en el exterior sin validar** es una **conversión privada**—**NO** el Giyur Estatal del Gran Rabinato.\n\n1. **Misrad HaPanim bloquea la Aliyá:** Rechaza la Aliyá inmediata de turistas y congela expedientes durante **2 a 5+ años**.\n2. **El Gran Rabinato bloquea el matrimonio:** Rechaza al **100%** las conversiones privadas para casarse en Israel sin validación estatal (*Ishur Giyur*) o trámite Conyugal (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ Leer primero: Trampa de Gush Etzion y Beit Din Privado]]\n[[NAV:obs|2|2️⃣ Paso 2: Regla de 9 meses e Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Paso 3: Los 5 documentos apostillados obligatorios]]", "dahan": "⚠️ **ALTO — La verdad sobre las conversiones no-ortodoxas ('Fallo Dahan'):**\n\n1. **El Gran Rabinato rechaza al 100% las conversiones no-ortodoxas**—impidiéndote permanentemente a ti y a tus futuros hijos casarse por el Rabinato en Israel.\n2. ¡Puedes completar una **conversión 100% Halájica reconocida por el Rabinato** en el mismo tiempo con nuestro Rabino Patrocinador y Madrijat Kalá!\n\n[[NAV:term|dahan_truth|1️⃣ Leer primero: Verdad fallo Dahan vs. Rabinato]]\n[[NAV:obs|5|2️⃣ Paso 2: Rabino Patrocinador y Madrijat Kalá]]", "vc": "🏛️ **Cómo aprobar *Va'adat Jariguim* (Formulario Ash/1) con visa de turista B/2:**\n\nLos turistas deben aprobar el Comité de Excepciones con los Formularios Ash/1 y Ash/3, un *Mijtav Hesber* en hebreo, 5–8+ cartas rabínicas y los 5 documentos apostillados antes de que venzan sus 90 días.\n\n[[NAV:obs|3|1️⃣ Leer primero: Aprobar Va'adat Jariguim y congelar reloj]]\n[[NAV:obs|1|2️⃣ Paso 2: Los 5 documentos apostillados]]\n[[NAV:hebrew-engine|ash1|3️⃣ Abrir motor hebreo Formularios Ash/1 y Ash/3]]"}}, "de": {"cat1": "🕍 KATEGORIE 1: GIUR, PRIVATE BEIT DINS & OBERRABBINAT", "cat2": "🛂 KATEGORIE 2: VISA-FRISTEN, 5 APOSTILLE-DOKUMENTE & TOURISTEN-SURVIVAL", "cat3": "💍 KATEGORIE 3: EHEPARTNER-VISUM (5.2.0008), PIBA-BRIEFE & VORSTRAFEN", "freeTag": "Gratis-Guides", "f_h": "🧭 Welcher Track interessiert Sie?", "f_s": "Tippen Sie unten auf Ihren Track, um Ihren Schritt-für-Schritt-Plan zu öffnen:", "f_b1": "🕍 1) Giur — Ich möchte konvertieren (oder meinen Giur bestätigen)", "f_b2": "✈️ 2) Alija — Ich möchte Alija nach Israel machen (oder Partner-Visum)", "f_b3": "✡️ 3) Beides — Ich möchte konvertieren UND Alija machen / Heiraten", "q1_t": "Schritt 1 von 2: Wo stehen Sie gerade bei Ihrem Giur?", "q1_opts": [["🏛️ Konvertiert / in Vorbereitung bei einem privaten Beit Din (Gush Etzion, Bnei Brak, Chabad oder Ausland)", "priv_bd"], ["💔 Nicht-orthodoxer Giur geplant / abgeschlossen (Reform / Konservativ — Dahan-Urteil)", "dahan_bd"], ["🛂 In Israel mit 90-Tage B/2 Touristenvisum & möchte staatlichen Giur (Va'adat Charigim)", "tourist_vc"], ["📚 Suche anerkannten Begleitrabbiner, Madrichat Kallah & 700-Fragen Beit-Din-Training", "state_prep"]], "q2_t": "Schritt 1 von 2: Welche Alija- oder Aufenthaltssituation trifft auf Sie zu?", "q2_opts": [["🚨 Noch im Ausland / Notfall-Ausreise: Welche 5 Apostille-Dokumente gehören ins Go-Bag?", "go_bag"], ["✈️ Bereits in Israel: Alija im Inland (Shinui Ma'amad Formular Ash/456 & 24-Monate Sal Klita)", "shinui"], ["💍 Verheiratet oder Lebenspartner eines israelischen Staatsbürgers (Nohal 5.2.0008 / Form. Ash/6)", "spousal"], ["🛡️ Antrag auf Alija oder Partner-Visum mit altem / gelöschtem Eintrag im Führungszeugnis", "crim"]], "q3_t": "Schritt 1 von 2: Wie ist Ihre aktuelle Situation für Giur + Alija?", "q3_opts": [["⚠️ Konvertiert über Gush Etzion / Bnei Brak / privates oder ausländisches Beit Din & möchte Alija / Heirat", "priv_bd"], ["💑 Mit israelischem Partner: Brauche Partner-Visum (5.2.0008) + Rabbinats-Giur gleichzeitig (Abs. ג.10)", "dual"], ["🛂 Mit B/2 Touristenvisum (ohne israelischen Partner): Brauche Va'adat Charigim (Ash/1) + Survival-Guide", "tourist_vc"], ["✈️ Noch im Ausland: Plane Einreise nach Israel für Giur & Alija (zuerst 5 Apostille-Dokumente sichern!)", "go_bag"]], "res": {"priv_bd": ["🚨 LEITFADEN • PRIVATES / AUSLÄNDISCHES BEIT DIN", "Warum Misrad HaPanim und das Oberrabbinat Gush Etzion / private Konversionen blockieren", "Misrad HaPanim friert private Touristen-Konversionen für 2–5+ Jahre ein, und das Oberrabbinat lehnt die Heiratsregistrierung zu 100% ab, sofern Sie keine staatliche Rabbinatsbestätigung ('Ishur Giyur') oder das Ehepartner-Verfahren (Nohal 5.2.0008) durchlaufen.", [["1️⃣ Zuerst lesen: Gush-Etzion- & Privat-Beit-Din-Falle", "obs:0"], ["2️⃣ Schritt 2: 9-Monate-Gemeinderegel & Ishur Giyur", "obs:2"], ["3️⃣ Schritt 3: Die 5 Apostille-Dokumente (180-Tage-Frist)", "obs:1"]]], "dahan_bd": ["⚠️ LEITFADEN • NICHT-ORTHODOXER GIUR ('DAHAN')", "Warum das Oberrabbinat 'Dahan'-Konversionen für Hochzeiten in Israel sperrt", "Ein nicht-orthodoxer Giur schließt Sie und Ihre zukünftigen Kinder dauerhaft von einer Heirat über das israelische Rabbinat aus. Sie können im gleichen Zeitraum einen 100% halachischen, vom Rabbinat anerkannten Weg absolvieren.", [["1️⃣ Zuerst lesen: Die Wahrheit über Dahan vs. Rabbinat", "term:dahan_truth"], ["2️⃣ Schritt 2: Anerkannter Rabbiner & Madrichat Kallah", "obs:5"], ["3️⃣ Schritt 3: Va'adat Charigim bestehen (Form. Ash/1)", "obs:3"]]], "tourist_vc": ["🏛️ LEITFADEN • B/2 TOURIST ZUM STAATLICHEN GIUR", "Wie Sie die Va'adat Charigim (Form. Ash/1) vor Ablauf der 90 Tage bestehen", "Touristen müssen den Ausnahmeausschuss mit Formular Ash/1, einem hebräischen Erklärungsschreiben (Michtav Hesber), 5–8+ Rabbinerbriefen und 5 Apostille-Dokumenten passieren.", [["1️⃣ Zuerst lesen: Va'adat Charigim & 90-Tage-Uhr stoppen", "obs:3"], ["2️⃣ Schritt 2: Die 5 Pflichtdokumente mit Apostille", "obs:1"], ["3️⃣ Schritt 3: Legale Fernarbeit & Wohnen mit B/2 Visum", "obs:8"]]], "state_prep": ["🕍 BEIT-DIN- & RABBINATS-VORBEREITUNG", "Beide Partner müssen lernen! Rabbiner, Kallah & 700-Fragen-Prüfung", "Selbst wenn ein Partner gebürtiger jüdischer Israeli ist, verlangt das Beit Din, dass BEIDE Partner bei einem anerkannten Rabbiner und einer zertifizierten Madrichat Kallah lernen.", [["1️⃣ Zuerst lesen: Rabbiner-, Kallah- & Prüfungs-Guide", "obs:5"], ["2️⃣ Schritt 2: 5–8+ Empfehlungsbriefe von Rabbiner & Gastfamilie", "term:community_letters"], ["3️⃣ 700 Beit-Din-Fragen & 56 Schabbat-Lieder starten →", "app:beit-din-150|"]]], "go_bag": ["🚨 GO-BAG-PROTOKOLL VOR DEM ABFLUG", "Steigen Sie NICHT ohne alle 5 doppelt apostillierten Originale ins Flugzeug", "Geburtenregisterauszug, Erweiterte Meldebescheinigung und Führungszeugnis aus Israel zu bestellen dauert Monate, während Ihre 180-Tage-Frist abläuft.", [["1️⃣ Zuerst lesen: Pre-Flight Go-Bag Checkliste", "term:go_bag"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & 180-Tage-Frist", "obs:1"], ["3️⃣ Schritt 3: Geldtransfer & Miete in ₪ zahlen ohne TZ", "term:fx_shield"]]], "shinui": ["✈️ INLANDS-ALIJA (SHINUI MA'AMAD • NOHAL 5.2.0001)", "Formular Ash/456, MR/14a/b & die 24-Monate-Klippe beim Sal Klita", "Erfordert Formular Ash/456 (gebührenfrei gem. Abs. ג.7), MR/14a/b und frische Apostillen (<180T). Achtung: >24 kumulierte Monate in Israel in den letzten 3 Jahren streichen den Sal Klita (~21.700 ₪)!", [["1️⃣ Zuerst lesen: 5 Apostille-Dokumente & Sal-Klita-Regeln", "term:five_docs"], ["2️⃣ Schritt 2: 60–90 Tage Überbrückungs-Krankenversicherung", "term:bridge_health"], ["3️⃣ Hebräischen Formular-Generator Ash/456 öffnen →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 EHEPARTNER-VISUM LEITFADEN (NOHAL 5.2.0008)", "Stufenverfahren & das 300-Fragen-Interview in getrennten Räumen bestehen", "Beamte prüfen jedes Datum auf Ihrem 6-seitigen Formular Ash/6 und trennen Sie in zwei Räume für 80 Alltagsfragen.", [["1️⃣ Zuerst lesen: Das 300-Fragen-Interview in getrennten Räumen", "obs:6"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & Befreiung Abs. ד.2.ה", "obs:1"], ["3️⃣ Hebräische Engine für Formular Ash/6 öffnen →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 DOPPEL-TRACK FÜR PAARE (ABS. ג.10)", "Ehepartner-Aufenthalt UND Rabbinats-Giur gleichzeitig führen!", "Gemäß Nohal 5.2.0008 Abs. ג.10 haben Sie das gesetzliche Recht, Ihre B/1-Arbeitserlaubnis zu sichern UND gleichzeitig den Rabbinats-Giur zu absolvieren!", [["1️⃣ Zuerst lesen: Beide Partner müssen lernen (Rabbiner & Kallah)", "obs:5"], ["2️⃣ Schritt 2: 300-Fragen-Interview in getrennten Räumen", "obs:6"], ["3️⃣ Schritt 3: Warum private Giurim Rabbinats-Hochzeiten sperren", "obs:2"]]], "crim": ["🛡️ REHABILITATIONS-LEITFADEN • FÜHRUNGSZEUGNIS", "Verschweigen Sie niemals alte Einträge — Nutzen Sie ein Rehabilitations-Dossier", "'Keine Vorstrafen' anzukreuzen, wenn ein alter Eintrag im Bundeszentralregister erscheint, führt zur sofortigen Ablehnung. Offene Darlegung mit hebräischem Erklärungsschreiben verhindert 2 Jahre Berufung.", [["1️⃣ Zuerst lesen: Alija / Visum mit Vorstrafe", "obs:7"], ["2️⃣ Schritt 2: Die 5 Apostille-Dokumente & 3-Länder-Prüfung", "obs:1"], ["3️⃣ Geprüften Anwalt / Begleitung anfordern →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **STOPP — Bevor Sie zur Hochzeit heimfliegen, hängt Ihr Weg von EINER entscheidenden Frage ab!**\n\nMisrad HaPanim **verweigert** die sofortige Alija nach einem privaten Touristen-Giur (Gush Etzion, Bnei Brak usw.), und das Oberrabbinat **blockiert private Konversionen zu 100%** für Hochzeiten in Israel.\n\n**Goldene Regel während Sie zu Hause sind:** Fliegen Sie NICHT zurück, ohne persönlich alle **5 doppelt apostillierten Heimatdokumente** + Ihre **apostillierte Heiratsurkunde** mitzunehmen!\n\n👇 **Tippen Sie unten an, wer Ihr(e) Verlobte(r) ist:**\n\n[[ASK:FIANCE_IL: Mein(e) Verlobte(r) ist israelische(r) Staatsbürger(in)|🇮🇱 A) Mein(e) Verlobte(r) ist israelische(r) Staatsbürger(in)]]\n[[ASK:FIANCE_FJ: Mein(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin aus dem Ausland|✡️ B) Mein(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin (Alija gemeinsam)]]\n[[ASK:FIANCE_OT: Mein(e) Verlobte(r) konvertiert ebenfalls / nicht israelisch|🌍 C) Mein(e) Verlobte(r) konvertiert / ist weder Israeli noch gebürtige(r) Jude/Jüdin]]\n[[NAV:obs|0|📖 Oder minimieren & lesen: Privat-Beit-Din-Falle]]", "fiance_il": "🇮🇱 **Ihr(e) Verlobte(r) ist israelische(r) Staatsbürger(in) — Ihr Doppel-Track (Abs. ג.10):**\n\n1. **Während Sie zur Hochzeit zu Hause sind:** Holen Sie persönlich alle **5 Apostille-Dokumente** + die **Apostille auf Ihrer Heiratsurkunde** (mit Vermerk des vorherigen Familienstands 'ledig' für die Befreiung nach Abs. ד.2.ה!).\n2. **Starten Sie das Ehepartner-Verfahren (*Nohal 5.2.0008* / Form. Ash/6):** Sichert sofort Ihr B/1-Arbeitsvisum.\n3. **Rabbinats-Giur parallel abschließen (Abs. ג.10):** Sie haben das gesetzliche Recht, Ihr Partner-Verfahren und die staatliche Rabbinatsbestätigung (*Ishur Giyur* / *Giyur L'Chumra*) gleichzeitig zu führen!\n\n[[NAV:obs|1|1️⃣ Zuerst lesen: Die 5 Apostille-Dokumente]]\n[[NAV:obs|5|2️⃣ Schritt 2: Beide Partner müssen lernen]]\n[[NAV:hebrew-engine|ash6|3️⃣ Hebräische Engine für Formular Ash/6 öffnen]]", "fiance_fj": "✡️ **Ihr(e) Verlobte(r) ist gebürtige(r) Jude/Jüdin aus dem Ausland (Gemeinsame Alija):**\n\n1. **Warum Ihr privater Giur allein nicht reicht:** Misrad HaPanim erkennt private Touristen-Konversionen nicht für eine eigenständige Alija an.\n2. **Vor dem Rückflug:** Packen Sie die **5 Apostille-Dokumente beider Partner**, den orthodoxen **Judentumsnachweis (*Ischur Jahadut*)** Ihres Partners und Ihre **apostillierte Heiratsurkunde** ins Handgepäck (Go-Bag) und lassen Sie Ihren Giur beim Oberrabbinat in Israel bestätigen!\n\n[[NAV:term|go_bag|1️⃣ Zuerst lesen: Pre-Flight Go-Bag Checkliste]]\n[[NAV:obs|2|2️⃣ Schritt 2: Rabbinats-Bestätigung (Ishur Giyur)]]\n[[NAV:obs|5|3️⃣ Schritt 3: Begleitrabbiner & Madrichat Kallah]]", "fiance_ot": "🚨 **STOPP — Gefahrenzone, wenn keiner der Partner israelischer Staatsbürger oder gebürtiger Jude ist:**\n\nEin privater Giur in Israel mit Touristenvisum **verleiht kein Rückkehrrecht**! Wenn Sie heimfliegen, heiraten und gemeinsam Alija beantragen wollen, **lehnt Misrad HaPanim Sie beide ab.**\n\n**Ihre 2 legalen Wege:**\n• **Option A (Anerkannte Auslandsgemeinde):** Giur beider Partner bei einem vom Oberrabbinat anerkannten Beit Din (ORD, IKG, IRG, RCA) + **9–12 volle Monate Gemeindemitgliedschaft NACH der Mikwe**.\n• **Option B (*Va'adat Charigim* in Israel):** Alle **5 Apostille-Dokumente** mitbringen und **Formular Ash/1** einreichen.\n\n[[NAV:term|overseas_giyur|1️⃣ Zuerst lesen: 9–12-Monate-Regel im Ausland]]\n[[NAV:obs|3|2️⃣ Schritt 2: Va'adat Charigim bestehen (Form. Ash/1)]]\n[[NAV:obs|1|3️⃣ Schritt 3: Die 5 Apostille-Dokumente]]", "priv_bd": "⚠️ **KRITISCHE WARNUNG — Lesen Sie dies vor dem Gang zum Misrad HaPanim!**\n\nEine Konversion über **Gush Etzion (*Giyur K'Halacha*), Bnei Brak (Rabbi Karelitz), private Gerichte oder im Ausland ohne Bestätigung** ist ein **privater Giur**—**NICHT** der staatliche Giur des Oberrabbinats.\n\n1. **Misrad HaPanim blockiert Alija:** Keine sofortige Alija für Touristen und 2 bis 5+ Jahre eingefrorene Akten.\n2. **Das Oberrabbinat blockiert Hochzeiten:** **100% Ablehnung** privater Konversionen für Eheschließungen ohne staatliche Bestätigung (*Ishur Giyur*) oder Ehepartner-Track (*Nohal 5.2.0008 / Form. Ash/6*).\n\n[[NAV:obs|0|1️⃣ Zuerst lesen: Gush-Etzion- & Privat-Beit-Din-Falle]]\n[[NAV:obs|2|2️⃣ Schritt 2: 9-Monate-Regel & Ishur Giyur]]\n[[NAV:obs|1|3️⃣ Schritt 3: Die 5 Pflichtdokumente mit Apostille]]", "dahan": "⚠️ **STOPP — Die Wahrheit über nicht-orthodoxe Konversionen ('Dahan-Urteil'):**\n\n1. **Das Oberrabbinat lehnt nicht-orthodoxe Konversionen zu 100% ab**—wodurch Sie und Ihre zukünftigen Kinder niemals über das Rabbinat in Israel heiraten können.\n2. Sie können im gleichen Zeitraum einen **100% halachischen, vom Rabbinat anerkannten Giur** mit unserem Begleitrabbiner und unserer Madrichat Kallah absolvieren!\n\n[[NAV:term|dahan_truth|1️⃣ Zuerst lesen: Dahan-Urteil vs. Oberrabbinat]]\n[[NAV:obs|5|2️⃣ Schritt 2: Begleitrabbiner & Madrichat Kallah]]", "vc": "🏛️ **Die *Va'adat Charigim* (Formular Ash/1) mit B/2 Touristenvisum bestehen:**\n\nTouristen müssen vor Ablauf der 90 Tage den Ausnahmeausschuss mit Formular Ash/1, Ash/3, einem hebräischen *Michtav Hesber*, 5–8+ Rabbinerbriefen und 5 Apostille-Dokumenten passieren.\n\n[[NAV:obs|3|1️⃣ Zuerst lesen: Va'adat Charigim & Frist-Stopp]]\n[[NAV:obs|1|2️⃣ Schritt 2: Die 5 Apostille-Dokumente]]\n[[NAV:hebrew-engine|ash1|3️⃣ Hebräische Engine für Formular Ash/1 & Ash/3 öffnen]]"}}, "ru": {"cat1": "🕍 КАТЕГОРИЯ 1: ГИЮР, ЧАСТНЫЕ БЕЙТ-ДИНЫ И ГЛАВНЫЙ РАВВИНАТ", "cat2": "🛂 КАТЕГОРИЯ 2: СРОКИ ВИЗ, 5 ДОКУМЕНТОВ С АПОСТИЛЕМ И ВЫЖИВАНИЕ ТУРИСТА", "cat3": "💍 КАТЕГОРИЯ 3: ВИЗА СУПРУГОВ ССТ (5.2.0008), ПИСЬМА МВД И СУДИМОСТЬ", "freeTag": "Бесплатные гиды", "f_h": "🧭 Какой трек вас интересует?", "f_s": "Выберите ваш маршрут ниже, чтобы открыть пошаговый план действий:", "f_b1": "🕍 1) Гиюр — Я хочу пройти гиюр (или подтвердить мой гиюр)", "f_b2": "✈️ 2) Алия — Я хочу репатриироваться в Израиль (или виза ССТ)", "f_b3": "✡️ 3) Оба — Я хочу пройти гиюр И репатриироваться / вступить в брак", "q1_t": "Шаг 1 из 2: На каком этапе гиюра вы находитесь сейчас?", "q1_opts": [["🏛️ Прошёл / прохожу гиюр в частном Бейт-Дине (Гуш-Эцион, Бней-Брак, Хабад или за рубежом)", "priv_bd"], ["💔 Рассматриваю / прошёл неортодоксальный гиюр (Реформистский / Консервативный — решение Дахан)", "dahan_bd"], ["🛂 В Израиле по турвизе B/2 (90 дней) и хочу государственный гиюр (Ваадат Харигим)", "tourist_vc"], ["📚 Нужен признанный раввин (Рав Мелаве), Мадрихат Калла и подготовка к 700 вопросам Бейт-Дина", "state_prep"]], "q2_t": "Шаг 1 из 2: Какая ситуация репатриации или резидентства вам подходит?", "q2_opts": [["🚨 Ещё за границей / Экстренный выезд: Какие 5 документов с апостилем должны быть в папке Go-Bag?", "go_bag"], ["✈️ Уже в Израиле: Репатриация внутри Израиля (Шинуй Маамад анкета Аш/456 и лимит 24 мес. Саль Клита)", "shinui"], ["💍 Официальный супруг(а) или гражданский партнёр израильтянина (ССТ Ноаль 5.2.0008 / анкета Аш/6)", "spousal"], ["🛡️ Заявление на Алию или ССТ при наличии старой / погашенной судимости (Справка МВД)", "crim"]], "q3_t": "Шаг 1 из 2: Какова ваша ситуация для прохождения гиюра и репатриации?", "q3_opts": [["⚠️ Прошёл гиюр через Гуш-Эцион / Бней-Брак / частный или зарубежный Бейт-Дин и хочу Алию / брак", "priv_bd"], ["💑 В паре с гражданином Израиля: Нужны И виза ССТ (5.2.0008), И гиюр Раввината одновременно (п. ג.10)", "dual"], ["🛂 По турвизе B/2 (без партнёра-израильтянина): Нужна Ваадат Харигим (Аш/1) + гид по выживанию", "tourist_vc"], ["✈️ Ещё за границей: Планирую приехать в Израиль для гиюра и Алии (сначала 5 документов с апостилем!)", "go_bag"]], "res": {"priv_bd": ["🚨 ПЛАН ДЕЙСТВИЙ • ЧАСТНЫЙ / ЗАРУБЕЖНЫЙ БЕЙТ-ДИН", "Почему МВД и Главный раввинат блокируют Гуш-Эцион и частные гиюры", "МВД замораживает дела туристов с частным гиюром на 2–5+ лет, а Главный раввинат на 100% отказывает в регистрации брака без государственного подтверждения («Ишур Гиюр» / Гиюр ле-Хумра) или параллельного открытия ССТ (Ноаль 5.2.0008).", [["1️⃣ Читать сначала: Ловушка Гуш-Эцион и частных Бейт-Динов", "obs:0"], ["2️⃣ Шаг 2: Правило 9 месяцев в общине и Ишур Гиюр", "obs:2"], ["3️⃣ Шаг 3: 5 документов с апостилем (часы 180 дней)", "obs:1"]]], "dahan_bd": ["⚠️ ПЛАН ДЕЙСТВИЙ • НЕОРТОДОКСАЛЬНЫЙ ГИЮР («ДАХАН»)", "Почему Главный раввинат блокирует гиюр «Дахан» для брака в Израиле", "Неортодоксальный гиюр навсегда лишает вас и ваших будущих детей права вступить в брак через Раввинат Израиля. Вы можете пройти 100% галахический, признанный Раввинатом гиюр за тот же срок.", [["1️⃣ Читать сначала: Вся правда о решении Дахан и Раввинате", "term:dahan_truth"], ["2️⃣ Шаг 2: Признанный раввин и Мадрихат Калла", "obs:5"], ["3️⃣ Шаг 3: Прохождение Ваадат Харигим (анкета Аш/1)", "obs:3"]]], "tourist_vc": ["🏛️ ПЛАН ДЕЙСТВИЙ • ОТ ТУРВИЗЫ B/2 К ГОСГИЮРУ", "Как пройти Ваадат Харигим (анкета Аш/1) до истечения 90 дней визы", "Туристы обязаны пройти Комиссию по исключениям с анкетой Аш/1, письмом-объяснением на иврите (Михтав Эсбер), 5–8+ письмами от раввинов и 5 документами с апостилем.", [["1️⃣ Читать сначала: Ваадат Харигим и заморозка 90 дней", "obs:3"], ["2️⃣ Шаг 2: 5 обязательных документов с апостилем", "obs:1"], ["3️⃣ Шаг 3: Легальная удалённая работа и жильё по визе B/2", "obs:8"]]], "state_prep": ["🕍 ПОДГОТОВКА К БЕЙТ-ДИНУ И РАВВИНАТУ", "Учиться обязаны ОБА партнёра! Раввин, Мадрихат Калла и экзамен из 700 вопросов", "Даже если один из супругов — урождённый еврей и гражданин Израиля, Бейт-Дин требует, чтобы ОБА партнёра прошли обучение у признанного раввина и сертифицированной Мадрихат Калла.", [["1️⃣ Читать сначала: Гид по раввину, Калле и экзамену", "obs:5"], ["2️⃣ Шаг 2: 5–8+ рекомендательных писем от раввина и семьи", "term:community_letters"], ["3️⃣ Открыть 700 вопросов Бейт-Дина и 56 песен Шаббата →", "app:beit-din-150|"]]], "go_bag": ["🚨 ПРОТОКОЛ GO-BAG ПЕРЕД ВЫЛЕТОМ", "НЕ садитесь в самолёт без всех 5 оригиналов с двойным апостилем", "Дистанционный заказ свидетельства о рождении ЗАГС, справки о незамужестве (Форма №15) и справки о несудимости МВД из Израиля занимает месяцы, пока истекают 180 дней.", [["1️⃣ Читать сначала: Чек-лист папки Go-Bag перед вылетом", "term:go_bag"], ["2️⃣ Шаг 2: 5 документов с апостилем и часы 180 дней", "obs:1"], ["3️⃣ Шаг 3: Перевод средств и оплата аренды в ₪ без ТЗ", "term:fx_shield"]]], "shinui": ["✈️ АЛИЯ ВНУТРИ ИЗРАИЛЯ (ШИНУЙ МААМАД • НОАЛЬ 5.2.0001)", "Анкета Аш/456, МР/14а/б и ловушка 24 месяцев корзины абсорбции (Саль Клита)", "Требуется анкета Аш/456 (без пошлины по п. ג.7), МР/14 и свежие апостили (<180 дн.). Внимание: >24 суммарных месяцев в Израиле за последние 3 года лишают вас выплаты Саль Клита (~21 700 ₪)!", [["1️⃣ Читать сначала: 5 документов с апостилем и правила Саль Клита", "term:five_docs"], ["2️⃣ Шаг 2: Мостовая медстраховка на 60–90 дней", "term:bridge_health"], ["3️⃣ Открыть заполнение анкет Аш/456 и МР/14 на иврите →", "app:hebrew-engine|ash456"]]], "spousal": ["💍 ПЛАН ДЕЙСТВИЙ • ВИЗА СУПРУГОВ ССТ (НОАЛЬ 5.2.0008)", "Прохождение ступенчатой процедуры (СТУПРО) и перекрёстного допроса из 300 вопросов", "Чиновники МВД проверяют каждую дату в 6-страничной анкете Аш/6 и разводят вас по разным кабинетам для 80 бытовых вопросов.", [["1️⃣ Читать сначала: Перекрёстный допрос из 300 вопросов", "obs:6"], ["2️⃣ Шаг 2: 5 документов с апостилем и льгота п. ד.2.ה", "obs:1"], ["3️⃣ Открыть генератор анкеты Аш/6 на иврите →", "app:hebrew-engine|ash6"]]], "dual": ["✡️💍 ДВОЙНОЙ ТРЕК ДЛЯ ПАР (П. ג.10)", "Ведите ступенчатую процедуру ССТ И гиюр в Раввинате одновременно!", "Согласно Ноаль 5.2.0008 п. ג.10, вы имеете законное право получить рабочую визу B/1 по ССТ И параллельно проходить государственный гиюр без закрытия дела!", [["1️⃣ Читать сначала: Учиться обязаны оба партнёра", "obs:5"], ["2️⃣ Шаг 2: Перекрёстный допрос из 300 вопросов", "obs:6"], ["3️⃣ Шаг 3: Почему частный гиюр блокирует свадьбу в Раввинате", "obs:2"]]], "crim": ["🛡️ ПЛАН РЕАБИЛИТАЦИИ • СПРАВКА О НЕСУДИМОСТИ", "Никогда не скрывайте старую или погашенную судимость — подавайте досье реабилитации", "Отметка «Не судим» при наличии старой записи в базе МВД приводит к немедленному отказу за сокрытие. Честное раскрытие с юридическим письмом на иврите спасает от 2 лет апелляций.", [["1️⃣ Читать сначала: Гид по Алии и ССТ при наличии судимости", "obs:7"], ["2️⃣ Шаг 2: 5 документов с апостилем и правило 3 стран", "obs:1"], ["3️⃣ Запросить проверку дела / сопровождение адвоката →", "app:vetted-team|"]]]}, "pre_ai": {"fiance_ask": "⚠️ **ВНИМАНИЕ — Прежде чем лететь домой на свадьбу, ваш маршрут зависит от ОДНОГО ключевого вопроса!**\n\nМВД Израиля **отказывает** в немедленной репатриации после частного гиюра по турвизе (Гуш-Эцион, Бней-Брак и др.), а Главный раввинат **на 100% блокирует** частные гиюры для брака в Израиле.\n\n**Золотое правило, пока вы дома:** НЕ садитесь на обратный рейс, пока лично не получите все **5 оригиналов документов с двойным апостилем** + **свидетельство о браке с апостилем**!\n\n👇 **Чтобы получить точный план для вас и вашего жениха/невесты, выберите статус вашего партнёра:**\n\n[[ASK:FIANCE_IL: Мой жених / невеста — гражданин(ка) Израиля|🇮🇱 А) Мой жених / невеста — гражданин(ка) Израиля]]\n[[ASK:FIANCE_FJ: Мой жених / невеста — еврей(ка) по рождению из-за рубежа|✡️ Б) Мой жених / невеста — еврей(ка) по рождению (репатриируемся вместе)]]\n[[ASK:FIANCE_OT: Мой жених / невеста тоже проходит гиюр / не израильтянин|🌍 В) Мой партнёр проходит гиюр / не гражданин Израиля и не еврей по рождению]]\n[[NAV:obs|0|📖 Или свернуть и прочесть: Ловушка частных Бейт-Динов]]", "fiance_il": "🇮🇱 **Ваш партнёр — гражданин(ка) Израиля (Ваш двойной трек по п. ג.10):**\n\n1. **Пока вы дома на свадьбе:** Лично получите все **5 документов с апостилем** + поставьте **апостиль на свидетельство о браке** (убедитесь, что указан добрачный статус «холост / не замужем» для льготы п. ד.2.ה!).\n2. **Откройте ступенчатую процедуру ССТ (*Ноаль 5.2.0008* / анкета Аш/6):** Это сразу даст вам легальный статус и рабочую визу B/1.\n3. **Проходите гиюр Раввината параллельно (п. ג.10):** По закону вы имеете право вести дело ССТ и государственное подтверждение гиюра (*Ишур Гиюр* / *Гиюр ле-Хумра*) одновременно!\n\n[[NAV:obs|1|1️⃣ Читать сначала: 5 документов с апостилем]]\n[[NAV:obs|5|2️⃣ Шаг 2: Учиться обязаны оба партнёра]]\n[[NAV:hebrew-engine|ash6|3️⃣ Открыть генератор анкеты Аш/6 на иврите]]", "fiance_fj": "✡️ **Ваш партнёр — еврей(ка) по рождению из-за рубежа (Репатриация вместе):**\n\n1. **Почему вашего частного гиюра недостаточно:** МВД не признаёт частный гиюр туриста в Израиле для самостоятельной Алии.\n2. **Перед обратным вылетом:** Соберите в ручную кладь (Go-Bag) **5 документов с апостилем обоих супругов**, ортодоксальное **подтверждение еврейства (*Ишур Яадут*)** партнёра и **свидетельство о браке с апостилем**, а в Израиле пройдите подтверждение гиюра в Главном раввинате!\n\n[[NAV:term|go_bag|1️⃣ Читать сначала: Чек-лист Go-Bag перед вылетом]]\n[[NAV:obs|2|2️⃣ Шаг 2: Подтверждение Раввината (Ишур Гиюр)]]\n[[NAV:obs|5|3️⃣ Шаг 3: Сопровождающий раввин и Мадрихат Калла]]", "fiance_ot": "🚨 **СТОП — Опасная зона, если ни один из партнёров не гражданин Израиля и не еврей по рождению:**\n\nЧастный гиюр, пройденный в Израиле по турвизе, **не даёт права на Закон о возвращении** ни вам, ни вашему супругу! Если вы улетите пожениться и вернётесь подавать на Алию, **МВД откажет вам обоим.**\n\n**Ваши 2 законных пути:**\n• **Вариант А (Признанная община за рубежом):** Пройти/подтвердить гиюр обоих партнёров в признанном Главным раввинатом Бейт-Дине (ФЕОР, КЕРООР, RCA) + прожить **9–12 полных месяцев в этой общине ПОСЛЕ миквы**.\n• **Вариант Б (*Ваадат Харигим* в Израиле):** Привезти все **5 документов с апостилем** и подать **анкету Аш/1**.\n\n[[NAV:term|overseas_giyur|1️⃣ Читать сначала: Правило 9–12 месяцев в общине за рубежом]]\n[[NAV:obs|3|2️⃣ Шаг 2: Прохождение Ваадат Харигим (анкета Аш/1)]]\n[[NAV:obs|1|3️⃣ Шаг 3: 5 документов с апостилем]]", "priv_bd": "⚠️ **КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ — Прочтите перед походом в МВД!**\n\nГиюр через **Гуш-Эцион (*Гиюр ке-Галаха*), Бней-Брак (р. Карелиц), частные суды или за рубежом без подтверждения** — это **частный гиюр**, а **НЕ** государственный гиюр Главного раввината (*Маарах ха-Гиюр*).\n\n1. **МВД блокирует Алию:** Отказ в репатриации туристам и заморозка дел на **2–5+ лет**.\n2. **Главный раввинат блокирует брак:** **100% отказ** в регистрации брака без подтверждения Главного раввината (*Ишур Гиюр*) или ступенчатой процедуры ССТ (*Ноаль 5.2.0008 / анкета Аш/6*).\n\n[[NAV:obs|0|1️⃣ Читать сначала: Ловушка Гуш-Эцион и частных Бейт-Динов]]\n[[NAV:obs|2|2️⃣ Шаг 2: Правило 9 месяцев в общине и Ишур Гиюр]]\n[[NAV:obs|1|3️⃣ Шаг 3: 5 обязательных документов с апостилем]]", "dahan": "⚠️ **СТОП — Вся правда о неортодоксальном гиюре («Решение Дахан»):**\n\n1. **Главный раввинат на 100% отвергает неортодоксальные гиюры** — навсегда блокируя вам и вашим будущим детям брак через Раввинат в Израиле.\n2. Вы можете пройти **100% галахический, признанный Раввинатом гиюр** за тот же срок с нашим сопровождающим раввином и Мадрихат Калла!\n\n[[NAV:term|dahan_truth|1️⃣ Читать сначала: Правда о решении Дахан и Раввинате]]\n[[NAV:obs|5|2️⃣ Шаг 2: Признанный раввин и Мадрихат Калла]]", "vc": "🏛️ **Прохождение *Ваадат Харигим* (анкета Аш/1) по турвизе B/2:**\n\nТуристы обязаны пройти Комиссию по исключениям с анкетами Аш/1 и Аш/3, письмом на иврите (*Михтав Эсбер*), 5–8+ письмами раввинов и 5 документами с апостилем до истечения 90 дней визы.\n\n[[NAV:obs|3|1️⃣ Читать сначала: Ваадат Харигим и заморозка срока]]\n[[NAV:obs|1|2️⃣ Шаг 2: 5 обязательных документов с апостилем]]\n[[NAV:hebrew-engine|ash1|3️⃣ Открыть генератор анкет Аш/1 и Аш/3 на иврите]]"}}};

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

    const preAiHit = matchPreAiInstantRoute(text, getLang());
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
        #left-edge-handle {
          position: fixed; left: 0; top: 50%; transform: translate3d(0, -50%, 0);
          z-index: 9991; width: 24px; height: 82px; background: #082548;
          border: 2px solid #03A9F4; border-left: none; border-radius: 0 12px 12px 0;
          box-shadow: 3px 0 14px rgba(8, 37, 72, 0.35);
          display: flex; align-items: center; justify-content: center;
          color: #4FC3F7; font-weight: 900; font-size: 0.95rem; cursor: pointer;
        }
        html[dir="rtl"] #left-edge-handle {
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
            <div style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;white-space:nowrap;font-size:1.58rem;font-weight:900;letter-spacing:-0.02em;color:#082548;line-height:1.1;">
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

      window.toggleLeftDrawer = function(open) {
        const d = document.getElementById("left-drawer");
        if (d) d.classList.toggle("open", typeof open === "boolean" ? open : !d.classList.contains("open"));
        const oldD = document.getElementById("app-drawer");
        if (oldD) oldD.classList.remove("open");
      };
      window.toggleDrawer = window.toggleLeftDrawer;
    }

    // 3. On landing pages (or /app/), upgrade the top .drawer-brand-center inside #left-drawer-panel
    //    so it shows the full-width GiyurAliyahTrack logo+title with 10px horizontal padding,
    //    and place #drawer-top-sync-btn IMMEDIATELY BELOW the divider as the #1 first option!
    window.toggleDrawer = function(open) { if (typeof window.toggleLeftDrawer === 'function') window.toggleLeftDrawer(open); }; const oldAppDrw = document.getElementById('app-drawer'); if (oldAppDrw) oldAppDrw.style.display = 'none';
    const panel = document.getElementById("left-drawer-panel");
    if (panel) {
      const brandBox = panel.querySelector(".drawer-brand-center");
      if (brandBox && !brandBox.getAttribute("data-gat-maxed")) {
        brandBox.setAttribute("data-gat-maxed", "1");
        brandBox.style.cssText = "margin: 0 -8px 14px -8px !important; padding: 4px 10px 14px 10px !important; border-bottom: 1.5px solid #e2e8f0 !important; text-align: center !important;";
        brandBox.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;white-space:nowrap;font-size:1.56rem;font-weight:900;letter-spacing:-0.02em;color:#082548;line-height:1.1;direction:ltr;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px;background:#0288E8;color:#fff;flex-shrink:0;box-shadow:0 4px 10px rgba(2,136,232,0.3);">
              <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#ffffff;"><path d="M12 1.5L15.1 6.9H21.3L18.2 12L21.3 17.1H15.1L12 22.5L8.9 17.1H2.7L5.8 12L2.7 6.9H8.9L12 1.5Z"/></svg>
            </span>
            <span>Giyur<span style="color:#03A9F4;">Aliyah</span>Track</span>
          </div>
        `;
      }

      let btn = document.getElementById("drawer-top-sync-btn");
      if (!btn) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.id = "drawer-top-sync-btn";
        btn.style.cssText = "width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#ffffff;border:2.5px solid #4FC3F7;padding:13px 14px;border-radius:12px;font-size:0.92rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0 12px 0;box-shadow:0 6px 18px rgba(3,169,244,0.42);";
        btn.onclick = function() {
          if (typeof window.toggleLeftDrawer === "function") window.toggleLeftDrawer(false);
          if (typeof window.openDeviceSyncModal === "function") {
            window.openDeviceSyncModal();
          } else {
            window.location.href = "/app/?sync=1";
          }
        };
      }

      // Ensure btn is placed RIGHT AFTER .drawer-brand-center (below the divider line!)
      if (brandBox && brandBox.parentNode) {
        if (brandBox.nextElementSibling !== btn) {
          brandBox.parentNode.insertBefore(btn, brandBox.nextElementSibling);
        }
      }
      btn.innerHTML = '<span>' + (SYNC_LABELS[curLang()] || SYNC_LABELS.en) + '</span>';
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
  function getFunnelLang() {
    const pathLang = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (GAT_6LANG_PACK[pathLang]) return pathLang;
    const docLang = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
    if (GAT_6LANG_PACK[docLang]) return docLang;
    return "en";
  }

  window.selectGatMainTrack = function(n) {
    const l = getFunnelLang();
    const L = GAT_6LANG_PACK[l] || GAT_6LANG_PACK.en;
    const box = document.getElementById("gat-3track-diag-box");
    if (!box) return;
    const titleStr = n === 1 ? L.q1_t : (n === 2 ? L.q2_t : L.q3_t);
    const listArr = n === 1 ? L.q1_opts : (n === 2 ? L.q2_opts : L.q3_opts);
    box.innerHTML = '<div style="background:#f0f9ff;border:2px solid #03A9F4;border-radius:16px;padding:15px;margin-top:12px;"><div style="font-size:0.94rem;font-weight:900;color:#082548;margin-bottom:10px;">' + titleStr + '</div><div style="display:flex;flex-direction:column;gap:8px;">' +
      listArr.map(function(x) { return '<button type="button" onclick="window.showGatDiagResult(\'' + x[1] + '\')" style="width:100%;background:#fff;color:#082548;border:1.5px solid #4FC3F7;border-radius:12px;padding:11px 13px;font-size:0.85rem;font-weight:800;text-align:start;cursor:pointer;">' + x[0] + '</button>'; }).join("") + '</div></div>';
  };

  window.showGatDiagResult = function(k) {
    const l = getFunnelLang();
    const L = GAT_6LANG_PACK[l] || GAT_6LANG_PACK.en;
    const r = L.res[k], box = document.getElementById("gat-3track-diag-box");
    if (!r || !box) return;
    box.innerHTML = '<div style="background:#082548;color:#fff;border:2.5px solid #03A9F4;border-radius:18px;padding:16px;margin-top:12px;"><div style="display:inline-block;background:rgba(3,169,244,0.22);border:1px solid #4FC3F7;color:#81D4FA;font-size:0.68rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;">' + r[0] + '</div><h3 style="font-size:1.04rem;font-weight:900;color:#fff;margin:0 0 8px 0;">' + r[1] + '</h3><p style="font-size:0.84rem;color:#e2e8f0;line-height:1.48;margin:0 0 12px 0;">' + r[2] + '</p><div style="display:flex;flex-direction:column;gap:8px;">' +
      r[3].map(function(s) { return '<button type="button" onclick="window.runGatPlaybookStep(\'' + s[1] + '\')" style="width:100%;background:linear-gradient(135deg,#0288D1 0%,#03A9F4 100%);color:#fff;border:1.5px solid #81D4FA;border-radius:11px;padding:11px 13px;font-size:0.83rem;font-weight:900;text-align:start;cursor:pointer;">' + s[0] + '</button>'; }).join("") + '</div></div>';
  };

  window.runGatPlaybookStep = function(act) {
    const p = String(act || "").split(":"), k = p[0], v = p[1] || "";
    if (k === "obs" && typeof window.openObstacle === "function") window.openObstacle(Number(v));
    else if (k === "term" && typeof window.openTerm === "function") window.openTerm(v);
    else if (k === "tab" && typeof window.switchTab === "function") window.switchTab(Number(v));
    else if (k === "app") { const m = v.split("|"); window.location.href = "/app/?mod=" + encodeURIComponent(m[0] || "hebrew-engine") + (m[1] ? "&form=" + encodeURIComponent(m[1]) : ""); }
  };

  window.syncFunnelAndCatHeadersI18n = function() {
    const l = getFunnelLang();
    const u = GAT_6LANG_PACK[l] || GAT_6LANG_PACK.en;
    const c1 = document.getElementById("gat-cat-hdr-1");
    if (c1) c1.innerHTML = '<span>' + u.cat1 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';
    const c2 = document.getElementById("gat-cat-hdr-2");
    if (c2) c2.innerHTML = '<span>' + u.cat2 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';
    const c3 = document.getElementById("gat-cat-hdr-3");
    if (c3) c3.innerHTML = '<span>' + u.cat3 + '</span><span style="color:#4FC3F7;font-size:0.75rem;">' + u.freeTag + '</span>';

    const sec = document.getElementById("gat-3track-funnel-card");
    if (sec) {
      const bCss = "width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#fff;border:2.5px solid #4FC3F7;padding:14px 16px;border-radius:14px;font-size:0.94rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 6px 18px rgba(3,169,244,0.35);text-align:start;";
      sec.innerHTML = '<div style="font-size:1.1rem;font-weight:900;color:#082548;margin-bottom:4px;">' + u.f_h + '</div><div style="font-size:0.82rem;color:#475569;font-weight:700;margin-bottom:12px;">' + u.f_s + '</div><div style="display:flex;flex-direction:column;gap:10px;">' +
        '<button type="button" style="' + bCss + '" onclick="window.selectGatMainTrack(1)"><span>' + u.f_b1 + '</span><span>❯</span></button>' +
        '<button type="button" style="' + bCss + '" onclick="window.selectGatMainTrack(2)"><span>' + u.f_b2 + '</span><span>❯</span></button>' +
        '<button type="button" style="' + bCss + '" onclick="window.selectGatMainTrack(3)"><span>' + u.f_b3 + '</span><span>❯</span></button>' +
        '</div><div id="gat-3track-diag-box"></div>';
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
      sec.style.cssText = "background:#fff;border:2.5px solid #03A9F4;border-radius:20px;padding:18px 16px;margin:16px 0 22px 0;box-shadow:0 12px 32px rgba(3,169,244,0.16);";
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
          if (typeof window.syncFunnelAndCatHeadersI18n === "function") window.syncFunnelAndCatHeadersI18n();
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
    if (window.scrollX !== 0 || window.scrollY !== 0) {
      window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
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

  let lastTapMs = 0;
  document.addEventListener("touchend", function(e) {
    const now = Date.now();
    if (now - lastTapMs <= 320 && (!e.touches || e.touches.length === 0)) {
      if (e.cancelable) e.preventDefault();
    }
    lastTapMs = now;
  }, { passive: false });
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setTimeout(function() { window.switchHebrewEngineSubTab("forms"); }, 60);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupHebrewEngineSubTabs);
  } else {
    setupHebrewEngineSubTabs();
  }
})();


// === UNIFIED HAMBURGER + LEFT DRAWER CONTROLLER & LIVE HUMAN VISITOR TRACKER ===
(function initUnifiedDrawerAndVisitorPulse() {
  const DRAWER_I18N = {
    en: {
      sync: "📲 Sync Devices & Pass Code",
      home: "🏠 Home & Track Playbooks",
      hebrew: "📸 Statutory Hebrew & 8 Forms",
      bd: "🕍 700 Beit Din Flashcards",
      couples: "📱 300 Couples 2-Phone Sync",
      songs: "🎵 56 Songs, Prayers & Brachot",
      rabbi: "✍️ Rabbi & Host Family Letters",
      vetted: "🤝 Vetted Notary, Rabbi & Lawyer",
      paywall: "🔓 View Passes & Pricing ($89–$649)",
      faq: "❓ FAQ, Pricing & Refund Policy"
    },
    he: {
      sync: "📲 סנכרון מכשירים וקוד גישה",
      home: "🏠 דף הבית ומדריכי המסלולים",
      hebrew: "📸 8 טפסי משרד הפנים ופענוח AI",
      bd: "🕍 מאגר 700 שאלות בית הדין",
      couples: "📱 סימולטור 300 שאלות לזוגות (2 טלפונים)",
      songs: "🎵 56 שירי שבת, תפילות וברכות",
      rabbi: "✍️ מכתבי רב מלווה ומשפחה מארחת",
      vetted: "🤝 נוטריון סרט אדום, רב מלווה ועו״ד",
      paywall: "🔓 מחירון וחבילות גישה ($89–$649)",
      faq: "❓ שאלות נפוצות, מחירון ותנאי ביטול"
    },
    fr: {
      sync: "📲 Synchroniser Appareils & Code",
      home: "🏠 Accueil & Guides des Parcours",
      hebrew: "📸 8 Formulaires PIBA & IA Hébreu",
      bd: "🕍 700 Questions du Beit Din",
      couples: "📱 300 Questions Couple (Sync 2 Tél.)",
      songs: "🎵 56 Chants, Prières & Brakhot",
      rabbi: "✍️ Lettres Rabbin & Famille d'Accueil",
      vetted: "🤝 Notaire Ruban Rouge, Rabbin & Avocat",
      paywall: "🔓 Tarifs & Pass d'Accès (89$–649$)",
      faq: "❓ FAQ, Tarifs & Politique de Remboursement"
    },
    es: {
      sync: "📲 Sincronizar Dispositivos y Código",
      home: "🏠 Inicio y Guías de Vías",
      hebrew: "📸 8 Formularios PIBA e IA en Hebreo",
      bd: "🕍 700 Preguntas del Beit Din",
      couples: "📱 300 Preguntas Parejas (Sync 2 Tel.)",
      songs: "🎵 56 Canciones, Rezos y Brajot",
      rabbi: "✍️ Cartas de Rabino y Familia Anfitriona",
      vetted: "🤝 Notario Cinta Roja, Rabino y Abogado",
      paywall: "🔓 Planes y Precios ($89–$649)",
      faq: "❓ Preguntas Frecuentes, Precios y Reembolsos"
    },
    de: {
      sync: "📲 Geräte synchronisieren & Code",
      home: "🏠 Startseite & Track-Leitfäden",
      hebrew: "📸 8 PIBA-Formulare & Hebräisch-KI",
      bd: "🕍 700 Beit-Din-Prüfungsfragen",
      couples: "📱 300 Paar-Fragen (2-Handy-Sync)",
      songs: "🎵 56 Schabbat-Lieder, Gebete & Brachot",
      rabbi: "✍️ Rabbiner- & Gastfamilien-Briefe",
      vetted: "🤝 Rotband-Notar, Rabbiner & Anwalt",
      paywall: "🔓 Pässe & Preise ($89–$649)",
      faq: "❓ FAQ, Preise & Rückerstattungsrichtlinie"
    },
    ru: {
      sync: "📲 Синхронизация устройств и Код",
      home: "🏠 Главная и гиды по маршрутам",
      hebrew: "📸 8 анкет МВД и ИИ-переводчик",
      bd: "🕍 700 вопросов суда Бейт-Дин",
      couples: "📱 300 вопросов МВД для пар (2 тел.)",
      songs: "🎵 56 песен Шаббата, молитв и брахот",
      rabbi: "✍️ Письма раввина и принимающей семьи",
      vetted: "🤝 Нотариус, раввин и адвокат в МВД",
      paywall: "🔓 Тарифы и доступ ($89–$649)",
      faq: "❓ Частые вопросы, цены и условия возврата"
    }
  };

  function getActiveLang() {
    const p = (window.location.pathname.split("/")[1] || "").toLowerCase();
    if (DRAWER_I18N[p]) return p;
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && DRAWER_I18N[q.toLowerCase()]) return q.toLowerCase();
    const l = String(window.appLang || window.gatLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return DRAWER_I18N[l] ? l : "en";
  }

  window.gatDrawerNav = function(target) {
    window.toggleLeftDrawer(false);
    const l = getActiveLang();
    const langPrefix = (l && l !== "en") ? ("/" + l + "/") : "/";
    const langQuery = (l && l !== "en") ? ("&lang=" + l) : "";
    const isApp = window.location.pathname.indexOf("/app") === 0;

    if (target === "sync") {
      if (typeof window.openDeviceSyncModal === "function") window.openDeviceSyncModal();
      else window.location.href = "/app/?sync=1" + langQuery;
      return;
    }
    if (target === "home") {
      if (isApp) window.location.href = langPrefix;
      else if (typeof window.switchTab === "function") { window.switchTab(0); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else window.location.href = langPrefix;
      return;
    }
    if (target === "paywall") {
      if (typeof window.openProPaywall === "function") window.openProPaywall();
      else window.location.href = "/app/?paywall=1" + langQuery;
      return;
    }
    if (target === "faq") {
      const faqEl = document.getElementById("gat-faq-pricing-legal");
      if (faqEl) {
        if (typeof window.switchTab === "function" && !isApp) window.switchTab(0, true, true);
        setTimeout(function() { faqEl.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
      } else {
        window.location.href = langPrefix + "#gat-faq-pricing-legal";
      }
      return;
    }
    // Otherwise target is an /app/ module name
    if (isApp && typeof window.openMod === "function") {
      window.openMod(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/app/?module=" + encodeURIComponent(target) + langQuery;
    }
  };

  function rebuildUnifiedLeftDrawerDom() {
    const l = getActiveLang();
    const d = DRAWER_I18N[l] || DRAWER_I18N.en;

    // Hide any legacy #app-drawer
    const legacy = document.getElementById("app-drawer");
    if (legacy) {
      legacy.classList.remove("open");
      legacy.style.display = "none";
    }

    let bd = document.getElementById("left-drawer");
    if (!bd) {
      bd = document.createElement("div");
      bd.id = "left-drawer";
      document.body.appendChild(bd);
    }
    bd.dir = (l === "he") ? "rtl" : "ltr";
    bd.onclick = function(e) { if (e.target === bd) window.toggleLeftDrawer(false); };

    let panel = document.getElementById("left-drawer-panel") || bd.querySelector(".drawer-panel");
    if (!panel) {
      panel = document.createElement("aside");
      panel.id = "left-drawer-panel";
      bd.appendChild(panel);
    } else {
      panel.id = "left-drawer-panel";
    }

    panel.innerHTML = `
      <div class="drawer-brand-center" style="margin:0 -4px 10px -4px;padding:4px 10px 14px 10px;border-bottom:1.5px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div style="display:flex;align-items:center;gap:8px;white-space:nowrap;font-size:1.38rem;font-weight:900;letter-spacing:-0.02em;color:#082548;line-height:1.1;direction:ltr;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:#0288E8;color:#fff;flex-shrink:0;box-shadow:0 4px 10px rgba(2,136,232,0.3);">
            <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#ffffff;"><path d="M12 1.5L15.1 6.9H21.3L18.2 12L21.3 17.1H15.1L12 22.5L8.9 17.1H2.7L5.8 12L2.7 6.9H8.9L12 1.5Z"/></svg>
          </span>
          <span>Giyur<span style="color:#03A9F4;">Aliyah</span>Track</span>
        </div>
        <button type="button" onclick="window.toggleLeftDrawer(false)" style="background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;width:32px;height:32px;border-radius:8px;font-weight:900;cursor:pointer;flex-shrink:0;">✕</button>
      </div>
      <button type="button" id="drawer-top-sync-btn" onclick="window.gatDrawerNav('sync')" style="width:100%;background:linear-gradient(135deg,#082548 0%,#03A9F4 100%);color:#ffffff;border:2.5px solid #4FC3F7;padding:12px 14px;border-radius:12px;font-size:0.9rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0 10px 0;box-shadow:0 6px 18px rgba(3,169,244,0.35);">${d.sync}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('home')">${d.home}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('hebrew-engine')">${d.hebrew}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('beit-din-150')">${d.bd}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('couples-sync')">${d.couples}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('songs-prayers')">${d.songs}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('rabbi-letters')">${d.rabbi}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('vetted-team')">${d.vetted}</button>
      <button type="button" class="gat-ld-item" onclick="window.gatDrawerNav('faq')">${d.faq}</button>
      <button type="button" class="gat-ld-item" style="color:#0288D1;border-bottom:none;" onclick="window.gatDrawerNav('paywall')">${d.paywall}</button>
    `;

    // Wire every .hamburger-btn on the page directly to window.toggleLeftDrawer
    document.querySelectorAll(".hamburger-btn").forEach(function(hb) {
      hb.onclick = function(ev) {
        if (ev) { ev.preventDefault(); ev.stopPropagation(); }
        window.toggleLeftDrawer();
      };
    });
  }

  window.toggleLeftDrawer = function(open) {
    rebuildUnifiedLeftDrawerDom();
    const bd = document.getElementById("left-drawer");
    if (!bd) return;
    const nextState = typeof open === "boolean" ? open : !bd.classList.contains("open");
    bd.classList.toggle("open", nextState);
  };
  window.toggleDrawer = window.toggleLeftDrawer;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rebuildUnifiedLeftDrawerDom);
  } else {
    rebuildUnifiedLeftDrawerDom();
  }

  // Handle ?paywall=1 or ?sync=1 URL triggers on /app/
  setTimeout(function() {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("paywall") === "1" && typeof window.openProPaywall === "function") window.openProPaywall();
    if (sp.get("sync") === "1" && typeof window.openDeviceSyncModal === "function") window.openDeviceSyncModal();
  }, 400);

  // ==========================================================================
  // REAL HUMAN VISITOR & PAGE DWELL-TIME PULSE TRACKER (FIREBASE)
  // ==========================================================================
  (function initFirebaseHumanVisitorPulse() {
    try {
      const ua = navigator.userAgent || "";
      if (navigator.webdriver || /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|gtmetrix/i.test(ua)) {
        return; // Ignore bots & crawlers
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

      // Send initial arrival pulse after 3 seconds of real human presence
      setTimeout(function() {
        if (document.visibilityState === "visible") {
          initialSent = true;
          sendPulse(3, true);
        }
      }, 3000);

      // Count active foreground seconds
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
})();
