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
      minBtn: "⎯ Minimize",
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
      minBtn: "⎯ מזער",
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
      minBtn: "⎯ Réduire",
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
      minBtn: "⎯ Minimizar",
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
      minBtn: "⎯ Minimieren",
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
      minBtn: "⎯ Свернуть",
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
  window.gatNavigateAndMinimize = function(modName, formKey, shouldMinimize) {
    try {
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

  function parseReplyAndBuildHtml(rawReply, t) {
    let clean = String(rawReply || "");
    let navMod = "";
    let navForm = "";
    const navMatch = clean.match(/\[\[NAV:([a-z0-9_-]+)\|([a-z0-9_-]*)\]\]/i);
    if (navMatch) {
      navMod = navMatch[1] || "";
      navForm = navMatch[2] || "";
      clean = clean.replace(navMatch[0], "").trim();
    }
    let html = '<div>' + formatMd(clean) + '</div>';
    const targetMod = navMod || window.currentMod || "hebrew-engine";
    const targetForm = navForm || window.activePibaFormKey || "";
    html += '<button type="button" class="gat-hd-jump-btn" onclick="window.gatNavigateAndMinimize(\'' + targetMod + '\', \'' + targetForm + '\', true)">' + t.jumpReadBtn + '</button>';
    return { html, navMod, navForm };
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
      #gat-hd-drawer {
        position: fixed;
        left: 10px;
        right: 10px;
        bottom: 12px;
        width: auto;
        max-width: 400px;
        margin: 0 auto;
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
        border: 1px solid #81D4FA;
        padding: 6px 10px;
        border-radius: 8px;
        font-size: 0.76rem;
        font-weight: 900;
        cursor: pointer;
        white-space: nowrap;
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
        font-size: 0.86rem !important;
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
    syncLeftDrawerTopBtn();
    const t = HD_I18N[getLang()] || HD_I18N.en;
    const badge = document.getElementById("gat-hd-badge");
    if (badge) {
      const turnCount = (window._gatHelpdeskHistory ? window._gatHelpdeskHistory.length : 0) / 2 | 0;
      if (turnCount > 0) {
        badge.style.display = "flex";
        badge.textContent = String(turnCount);
      } else {
        badge.style.display = "none";
      }
    }
    const title = document.getElementById("gat-hd-title");
    if (title) title.textContent = t.title;
    const clr = document.getElementById("gat-hd-clear");
    if (clr) clr.textContent = t.clearBtn;
    const minB = document.getElementById("gat-hd-min");
    if (minB) minB.textContent = t.minBtn;
    const wa = document.getElementById("gat-hd-wa");
    if (wa) wa.textContent = t.waBtn;
    const inp = document.getElementById("gat-hd-input");
    if (inp) inp.placeholder = t.placeholder;
    const send = document.getElementById("gat-hd-send");
    if (send) send.textContent = t.send;

    const msgs = document.getElementById("gat-hd-msgs");
    if (msgs && (rebuildHistory || msgs.children.length === 0)) {
      msgs.innerHTML = "";
      msgs.appendChild(buildWelcomeBubble(t));
      (window._gatHelpdeskHistory || []).forEach(function(item) {
        if (!item || !item.text) return;
        const b = document.createElement("div");
        if (item.role === "user") {
          b.className = "gat-hd-bubble user";
          b.textContent = item.text;
        } else {
          b.className = "gat-hd-bubble bot";
          b.innerHTML = parseReplyAndBuildHtml(item.text, t).html;
        }
        msgs.appendChild(b);
      });
      msgs.scrollTop = msgs.scrollHeight;
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
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
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
    msgs.scrollTop = msgs.scrollHeight;
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
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('vetted-team');">🤝 Vetted Team, Notary & Lawyer</button>
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('hebrew-engine');">📸 Statutory Hebrew & Forms</button>
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('rabbi-letters');">✍️ Rabbi & Clerk Letters</button>
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('beit-din-150');">🕍 700 Beit Din Deck</button>
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('couples-sync');">📱 80 Couples Sync</button>
          <button type="button" class="gat-ld-item" onclick="window.toggleLeftDrawer(false); if(typeof openMod==='function') openMod('songs-prayers');">🎵 56 Songs & Prayers</button>
          <button type="button" class="gat-ld-item" style="color:#0288D1;" onclick="window.toggleLeftDrawer(false); if(typeof window.openProPaywall==='function') window.openProPaywall();">🔓 View Passes & Pricing</button>
        </aside>
      `;
      document.body.appendChild(bd);

      window.toggleLeftDrawer = function(open) {
        const d = document.getElementById("left-drawer");
        if (d) d.classList.toggle("open", open);
      };
    }

    // 3. On landing pages (or /app/), upgrade the top .drawer-brand-center inside #left-drawer-panel
    //    so it shows the full-width GiyurAliyahTrack logo+title with 10px horizontal padding,
    //    and place #drawer-top-sync-btn IMMEDIATELY BELOW the divider as the #1 first option!
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