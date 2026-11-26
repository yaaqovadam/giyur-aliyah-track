
(function lockExplicitUrlFormParamOnBoot() {
  try {
    var sp = new URLSearchParams(window.location.search);
    var rawF = (sp.get("form") || "").trim().toLowerCase();
    if (!rawF) return;
    var ALIASES = {
      "ash1": "ash1",
      "ash3": "ash3",
      "ash6": "ash6",
      "ash456": "ash456",
      "mr14a": "mr14a",
      "mr14b": "mr14b",
      "nespach_alef": "nespach_alef",
      "nespach-alef": "nespach_alef",
      "nespachalef": "nespach_alef",
      "sec_cv": "security_cv",
      "security_cv": "security_cv",
      "security-cv": "security_cv"
    };
    var targetForm = ALIASES[rawF] || rawF;
    window.__gatUrlRequestedForm = targetForm;
    window.activePibaFormKey = targetForm;
    window.gatFormsState = window.gatFormsState || {};
    window.gatFormsState.activeForm = targetForm;

    function enforceRequestedFormSelection() {
      var reqF = window.__gatUrlRequestedForm;
      if (!reqF) return;
      window.activePibaFormKey = reqF;
      if (window.gatFormsState) window.gatFormsState.activeForm = reqF;
      var sel = document.getElementById("piba-form-select") || document.querySelector("select[onchange*='PibaForm'], select[id*='form-select']");
      if (sel) {
        // Check if option exists as reqF or sec_cv/security_cv alias
        var matchVal = "";
        for (var i = 0; i < sel.options.length; i++) {
          var v = sel.options[i].value;
          if (v === reqF || (reqF === "security_cv" && v === "sec_cv") || (reqF === "sec_cv" && v === "security_cv")) {
            matchVal = v;
            break;
          }
        }
        if (matchVal && sel.value !== matchVal) {
          sel.value = matchVal;
          window.activePibaFormKey = matchVal;
          if (window.gatFormsState) window.gatFormsState.activeForm = matchVal;
          if (typeof window.switchPibaForm === "function") window.switchPibaForm(matchVal);
          else if (typeof window.onPibaFormChange === "function") window.onPibaFormChange(matchVal);
          else if (typeof window.renderPibaFormFields === "function") window.renderPibaFormFields(matchVal);
          else sel.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      // Clear lock once user manually interacts with the form dropdown
      if (sel && !sel._gatUserChangeHooked) {
        sel._gatUserChangeHooked = true;
        sel.addEventListener("pointerdown", function() { window.__gatUrlRequestedForm = ""; }, true);
        sel.addEventListener("keydown", function() { window.__gatUrlRequestedForm = ""; }, true);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function() {
        setTimeout(enforceRequestedFormSelection, 40);
        setTimeout(enforceRequestedFormSelection, 250);
        setTimeout(enforceRequestedFormSelection, 850);
      });
    } else {
      setTimeout(enforceRequestedFormSelection, 40);
      setTimeout(enforceRequestedFormSelection, 250);
      setTimeout(enforceRequestedFormSelection, 850);
    }
  } catch (e) {}
})();

/* ==========================================================================
 * Giyur Aliyah Track — 100% 5-Language (EN/FR/ES/DE/HE) Hebrew-First PIBA
 * Forms, Worksheet Scanner & Master Dossier Cross-Checker (forms_vault.js)
 * ========================================================================== */
(function() {
  'use strict';



  var FV_EXTRA_ALERTS_I18N = {
    en: {
      spinDefault: "🔍 Scanning document, auto-filling fields & verifying PIBA rules...",
      spinCountdown: "⏱️ Processing ({s}s remaining)...",
      spinTimeout: "⏱️ Document scan timed out after 120 s (2 minutes) — please try a clearer photo or stable connection.",
      pagesSuffix: " ({n} pages)",
      sefachTitle: "⚠️ Front TZ Card Scanned — Unfolded Paper Sefach (ספח) Missing!",
      sefachBody: "Misrad HaPanim strictly requires the unfolded paper Sefach (ספח) showing your registered Israeli address, marital status, parents, and children. Tap below to upload the unfolded Sefach page so we auto-fill all remaining fields across all 8 forms:",
      sefachBtn: "➕ Upload Unfolded Sefach Page Now (Auto-Fill Address, Parents & Kids)",
      aposAddBtn: "➕ Upload Apostille / Back Page Now",
      mpTitle: "📄 Multi-Page Marriage Certificate Detected — Ensure All Pages Are Uploaded!",
      mpBody: "Misrad HaPanim rejects partial or cut-off marriage certificates. You can select all pages at once or tap below to upload the remaining page(s):",
      mpBtn: "➕ Upload Additional Marriage Cert Page(s)",
      marAposTitle: "🚨 MANDATORY MISRAD HAPANIM REQUIREMENT: No Apostille Stamp Detected on Marriage Certificate!",
      marAposBtn: "➕ Upload Apostille Page / Back of Certificate Now (If on Separate Page)"
    },
    he: {
      spinDefault: "🔍 סורק את המסמך, ממלא שדות אוטומטית ובודק תקינות מול נהלי משרד הפנים...",
      spinCountdown: "⏱️ מעבד נתונים (נותרו עד {s} שניות)...",
      spinTimeout: "⏱️ סריקת המסמך ארכה מעל 120 שניות — אנא נסו תמונה ברורה יותר או בדקו את החיבור.",
      pagesSuffix: " ({n} עמודים)",
      sefachTitle: "⚠️ נסרק כרטיס ת״ז בלבד — חסר ספח תעודת זהות פתוח ומלא!",
      sefachBody: "משרד הפנים מחייב צילום של ספח תעודת הזהות פתוח במלואו (הכולל כתובת מעודכנת, מצב אישי, שמות הורים/בן זוג וילדים). לחצו למטה להעלאת צילום הספח כדי שנשלים אוטומטית את כל השדות בכל 8 הטפסים:",
      sefachBtn: "➕ העלאת צילום הספח הפתוח (השלמת כתובת, הורים וילדים)",
      aposAddBtn: "➕ העלאת עמוד האפוסטיל / גב התעודה כעת",
      mpTitle: "📄 זוהתה תעודת נישואין מרובת עמודים — ודאו שכל העמודים הועלו!",
      mpBody: "משרד הפנים דוחה תעודות חתוכות או חלקיות. ניתן לבחור מספר עמודים יחד או ללחוץ כאן להוספת העמוד הבא:",
      mpBtn: "➕ העלאת עמודים נוספים של תעודת הנישואין",
      marAposTitle: "🚨 דרישת חובה במשרד הפנים: לא זוהתה חותמת אפוסטיל (Apostille) על תעודת הנישואין!",
      marAposBtn: "➕ העלאת עמוד האפוסטיל / גב התעודה (אם נמצא בעמוד נפרד)"
    },
    fr: {
      spinDefault: "🔍 Analyse du document, pré-remplissage et vérification PIBA en cours...",
      spinCountdown: "⏱️ Traitement en cours ({s}s restantes)...",
      spinTimeout: "⏱️ Délai d'analyse dépassé (120 s) — veuillez réessayer avec une photo plus nette.",
      pagesSuffix: " ({n} pages)",
      sefachTitle: "⚠️ Carte TZ scannée seule — Il manque le Sefach papier déplié (ספח) !",
      sefachBody: "Le Misrad HaPanim exige le Sefach papier entièrement déplié (adresse en Israël, état civil, parents et enfants). Appuyez ci-dessous pour importer le Sefach déplié et pré-remplir les 8 formulaires :",
      sefachBtn: "➕ Importer le Sefach déplié maintenant (Adresse, Parents & Enfants)",
      aposAddBtn: "➕ Importer la page d'Apostille / le verso maintenant",
      mpTitle: "📄 Acte de mariage multi-pages détecté — Vérifiez que toutes les pages sont importées !",
      mpBody: "Le Misrad HaPanim refuse les actes incomplets ou coupés. Sélectionnez toutes les pages ou ajoutez les pages suivantes ci-dessous :",
      mpBtn: "➕ Ajouter une page supplémentaire de l'acte de mariage",
      marAposTitle: "🚨 EXIGENCE OBLIGATOIRE DU MISRAD HAPANIM : Aucune Apostille détectée sur l'acte de mariage !",
      marAposBtn: "➕ Importer la page d'Apostille / verso de l'acte maintenant"
    },
    es: {
      spinDefault: "🔍 Escaneando documento, autocompletando campos y verificando reglas de PIBA...",
      spinCountdown: "⏱️ Procesando ({s}s restantes)...",
      spinTimeout: "⏱️ El escaneo tardó más de 120 s — intente con una foto más clara o mejor conexión.",
      pagesSuffix: " ({n} páginas)",
      sefachTitle: "⚠️ Solo se escaneó la tarjeta TZ — ¡Falta el Sefach de papel desplegado (ספח)!",
      sefachBody: "Misrad HaPanim exige el Sefach de papel desplegado (dirección en Israel, estado civil, padres e hijos). Toque abajo para subir el Sefach desplegado y autocompletar los 8 formularios:",
      sefachBtn: "➕ Subir el Sefach desplegado ahora (Dirección, Padres e Hijos)",
      aposAddBtn: "➕ Subir página de Apostilla / reverso ahora",
      mpTitle: "📄 Certificado de matrimonio de varias páginas — ¡Asegúrese de subir todas las páginas!",
      mpBody: "Misrad HaPanim rechaza certificados incompletos o cortados. Suba las páginas restantes abajo:",
      mpBtn: "➕ Subir página(s) adicional(es) del certificado de matrimonio",
      marAposTitle: "🚨 REQUISITO OBLIGATORIO DE MISRAD HAPANIM: ¡No se detectó sello de Apostilla en el Certificado de Matrimonio!",
      marAposBtn: "➕ Subir página de Apostilla / reverso del certificado ahora"
    },
    de: {
      spinDefault: "🔍 Dokument wird gescannt, Felder ausgefüllt & PIBA-Regeln geprüft...",
      spinCountdown: "⏱️ Verarbeitung läuft (noch max. {s}s)...",
      spinTimeout: "⏱️ Zeitüberschreitung nach 120 s — bitte versuchen Sie es mit einem schärferen Foto erneut.",
      pagesSuffix: " ({n} Seiten)",
      sefachTitle: "⚠️ Nur TZ-Karte gescannt — Aufgeklappter Papier-Sefach (ספח) fehlt!",
      sefachBody: "Misrad HaPanim verlangt zwingend den aufgeklappten Papier-Sefach (Adresse in Israel, Familienstand, Eltern & Kinder). Tippen Sie unten, um den Sefach hochzuladen:",
      sefachBtn: "➕ Aufgeklappten Sefach jetzt hochladen (Adresse, Eltern & Kinder)",
      aposAddBtn: "➕ Apostille-Seite / Rückseite jetzt hochladen",
      mpTitle: "📄 Mehrseitige Heiratsurkunde erkannt — Bitte alle Seiten hochladen!",
      mpBody: "Misrad HaPanim lehnt unvollständige Urkunden ab. Laden Sie unten die weiteren Seiten hoch:",
      mpBtn: "➕ Weitere Seite(n) der Heiratsurkunde hochladen",
      marAposTitle: "🚨 PFLICHTANFORDERUNG IM MISRAD HAPANIM: Keine Apostille auf der Heiratsurkunde erkannt!",
      marAposBtn: "➕ Apostille-Seite / Rückseite der Urkunde jetzt hochladen"
    },
    ru: {
      spinDefault: "🔍 Сканируем документ, заполняем поля и проверяем по правилам МВД...",
      spinCountdown: "⏱️ Обработка (осталось до {s} сек.)...",
      spinTimeout: "⏱️ Превышено время ожидания (35 сек.) — попробуйте более чёткое фото.",
      pagesSuffix: " ({n} стр.)",
      sefachTitle: "⚠️ Отсканирована только пластиковая карта ТЗ — отсутствует развёрнутый бумажный Сефах (ספח)!",
      sefachBody: "МВД Израиля требует полностью развёрнутый бумажный вкладыш Сефах (адрес в Израиле, семейное положение, родители и дети). Нажмите ниже, чтобы загрузить Сефах и заполнить все 8 анкет:",
      sefachBtn: "➕ Загрузить развёрнутый Сефах (Адрес, родители и дети)",
      aposAddBtn: "➕ Загрузить страницу с Апостилем / оборотную сторону",
      mpTitle: "📄 Обнаружено многостраничное свидетельство о браке — убедитесь, что загружены все страницы!",
      mpBody: "МВД не принимает неполные или обрезанные свидетельства. Нажмите ниже, чтобы добавить остальные страницы:",
      mpBtn: "➕ Добавить ещё страницу(ы) свидетельства о браке",
      marAposTitle: "🚨 ОБЯЗАТЕЛЬНОЕ ТРЕБОВАНИЕ МВД ИЗРАИЛЯ: На свидетельстве о браке не обнаружен штамп Апостиль!",
      marAposBtn: "➕ Загрузить страницу с Апостилем / оборот свидетельства"
    }
  };

  // === FULL-SCREEN DARKENED 35-SECOND UPLOAD SPINNER & TIMEOUT GUARD ===
  var _gatSpinnerTimer = null;
  var _gatSpinnerTick = null;
  window.showGatUploadSpinner = function(customMsg, timeoutSec) {
    window.hideGatUploadSpinner(true);
    var l = lang();
    var xTxt = FV_EXTRA_ALERTS_I18N[l] || FV_EXTRA_ALERTS_I18N.en;
    var totalMs = (Number(timeoutSec) || 90) * 1000;
    var startMs = Date.now();
    var ov = document.createElement('div');
    ov.id = 'gat-fullscreen-upload-spinner';
    ov.dir = (l === 'he') ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(4,18,38,0.86);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;pointer-events:all;user-select:none;';
    ov.innerHTML =
      '<style>@keyframes gatSpin360{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>' +
      '<div style="background:#ffffff;border:3px solid #0284c7;border-radius:18px;max-width:430px;width:100%;padding:24px 22px;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,0.55);color:#0f172a;">' +
        '<div style="width:52px;height:52px;border:5px solid #e0f2fe;border-top-color:#0284c7;border-radius:50%;margin:0 auto 14px;animation:gatSpin360 0.85s linear infinite;"></div>' +
        '<div style="font-size:0.96rem;font-weight:900;color:#082548;margin-bottom:14px;line-height:1.36;">' + (customMsg || xTxt.spinDefault) + '</div>' +
        '<div style="width:100%;height:14px;background:#e2e8f0;border-radius:999px;overflow:hidden;border:1px solid #cbd5e1;margin-bottom:7px;">' +
          '<div id="gat-fv-prog-fill" style="width:10%;height:100%;border-radius:999px;background:linear-gradient(90deg,#0284c7 0%,#0ea5e9 55%,#10b981 100%);transition:width 0.3s ease-out;"></div>' +
        '</div>' +
        '<div id="gat-fv-prog-pct" style="font-size:0.82rem;font-weight:900;color:#0284c7;font-variant-numeric:tabular-nums;">10%</div>' +
      '</div>';
    document.body.appendChild(ov);

    _gatSpinnerTick = setInterval(function() {
      var ratio = Math.min(1, (Date.now() - startMs) / totalMs);
      var pct = Math.min(98, Math.round((1 - Math.pow(1 - ratio, 2.4)) * 98));
      var fill = document.getElementById('gat-fv-prog-fill');
      var lbl = document.getElementById('gat-fv-prog-pct');
      if (fill) fill.style.width = pct + '%';
      if (lbl) lbl.textContent = pct + '%';
    }, 250);

    _gatSpinnerTimer = setTimeout(function() {
      window.hideGatUploadSpinner(true);
    }, totalMs + 2000);
  };

  window.hideGatUploadSpinner = function(immediate) {
    if (_gatSpinnerTimer) { clearTimeout(_gatSpinnerTimer); _gatSpinnerTimer = null; }
    if (_gatSpinnerTick) { clearInterval(_gatSpinnerTick); _gatSpinnerTick = null; }
    var existing = document.getElementById('gat-fullscreen-upload-spinner');
    var existing2 = document.getElementById('gat-upload-spinner-overlay');
    if (immediate) {
      if (existing) existing.remove();
      if (existing2) existing2.remove();
      return;
    }
    var fill = document.getElementById('gat-fv-prog-fill') || document.getElementById('gat-spin-prog-bar');
    var lbl = document.getElementById('gat-fv-prog-pct') || document.getElementById('gat-spin-pct-txt');
    if (fill) fill.style.width = '100%';
    if (lbl) lbl.textContent = '100%';
    setTimeout(function() {
      if (existing && existing.parentNode) existing.remove();
      if (existing2 && existing2.parentNode) existing2.remove();
    }, 180);
  };


  window.handleManualFormSaveClick = function() {
    window.gatLastSavedSnapshot = "";
    if (typeof window.syncFormDraftIfChanged === "function") {
      window.syncFormDraftIfChanged("manual_save");
    }
    if (typeof window.showDraftSavedBadge === "function") {
      window.showDraftSavedBadge();
    }
    if (typeof window.refreshAllGatAuthIndicators === "function") {
      window.refreshAllGatAuthIndicators();
    }
  };

  var DRAFT_KEY = 'gat_form_draft_v1';
  var SCANNED_KEY = 'gat_scanned_docs_v1';

  window.PIBA_OFFICIAL_PDFS = [
    { code: 'אש/3', file: '/forms/gov-pdfs/ash3_extension_change_visa.pdf',
      t: {"en": "Extend / Switch Visa (2p)", "fr": "Prolonger / Changer Visa (2p)", "es": "Prorrogar / Cambiar Visa (2p)", "de": "Visum Verlängern / Wechseln (2S)", "he": "הארכת / החלפת אשרה (2 עמ׳)", "ru": "Продление / смена визы (2 стр.)"} },
    { code: 'אש/1', file: '/forms/gov-pdfs/ash1_entry_visa.pdf',
      t: {"en": "Entry Visa & Inviter (2p)", "fr": "Visa d'Entrée & Invitant (2p)", "es": "Visa de Entrada e Invitante (2p)", "de": "Einreisevisum & Einlader (2S)", "he": "אשרת כניסה ומזמין (2 עמ׳)", "ru": "Въездная виза и приглашающее лицо (2 стр.)"} },
    { code: 'אש/6', file: '/forms/gov-pdfs/ash6_spousal_status.pdf',
      t: {"en": "Married Spousal + Lease Affidavit (6p)", "fr": "Conjoint Marié + Bail (6p)", "es": "Cónyuge Casado + Contrato (6p)", "de": "Ehepartner + Miet-Affidavit (6S)", "he": "בני זוג נשואים + תצהיר שכ\"ד (6 עמ׳)", "ru": "Супруги в браке + декларация об аренде жилья (6 стр.)"} },
    { code: 'נספח א׳', file: '/forms/gov-pdfs/nespach_alef_affidavit.pdf',
      t: {"en": "13-Clause Partner Affidavit (1p)", "fr": "Affidavit 13 Clauses Concubins (1p)", "es": "Declaración 13 Cláusulas Pareja (1p)", "de": "13-Punkte Partner-Erklärung (1S)", "he": "תצהיר 13 סעיפים ידועים בציבור (1 עמ׳)", "ru": "Декларация из 13 пунктов для гражданского брака (едуим бэ-цибур) (1 стр.)"} },
    { code: 'אש/456', file: '/forms/gov-pdfs/ash456_in_israel_oleh.pdf',
      t: {"en": "In-Israel Aliyah / Oleh (3p)", "fr": "Aliyah en Israël / Oleh (3p)", "es": "Aliyá en Israel / Olé (3p)", "de": "Alija in Israel / Oleh (3S)", "he": "בקשת מעמד עולה בארץ (3 עמ׳)", "ru": "Смена статуса на репатрианта (оле) внутри Израиля (3 стр.)"} },
    { code: 'מר/14 א׳', file: '/forms/gov-pdfs/mr14a_registry.pdf',
      t: {"en": "First Teudat Zehut Registry (1p)", "fr": "Inscription 1ère Teudat Zehut (1p)", "es": "Registro 1ª Teudat Zehut (1p)", "de": "Erste Teudat Zehut Register (1S)", "he": "שאלון רישום ת\"ז ראשונה (1 עמ׳)", "ru": "Бланк регистрации на первый теудат-зеут (1 стр.)"} },
    { code: 'מר/14 ב׳', file: '/forms/gov-pdfs/mr14b_registry_notice.pdf',
      t: {"en": "Dual Citizenship Notice (1p)", "fr": "Avis Double Nationalité (1p)", "es": "Aviso Doble Ciudadanía (1p)", "de": "Doppelstaatsbürgerschaft (1S)", "he": "הודעה לעולה אזרח חוץ (1 עמ׳)", "ru": "Уведомление для репатрианта с иностранным гражданством (1 стр.)"} },
    { code: 'קורות חיים', file: '/forms/gov-pdfs/security_cv_form.pdf',
      t: {"en": "Security CV — If Ordered (11p)", "fr": "CV Sécurité — Si Demandé (11p)", "es": "CV Seguridad — Si lo Piden (11p)", "de": "Sicherheits-CV — Bei Bedarf (11S)", "he": "קורות חיים לאבחון — לפי דרישה (11 עמ׳)", "ru": "Расширенная анкета безопасности (резюме) — по требованию (11 стр.)"} }
  ];

  window.PIBA_BRANCHES = [
    { v: 'צפת / טבריה', l: {"en": "Safed / Tiberias (Upper Galilee)", "fr": "Safed / Tibériade (Haute Galilée)", "es": "Safed / Tiberíades (Galilea)", "de": "Safed / Tiberias (Galiläa)", "he": "צפת / טבריה (גליל עליון)", "ru": "Цфат / Тверия (Верхняя Галилея)"} },
    { v: 'ירושלים', l: {"en": "Jerusalem (Shlomtzion / Har Hotzvim)", "fr": "Jérusalem (Shlomtzion / Har Hotzvim)", "es": "Jerusalén (Shlomtzion / Har Hotzvim)", "de": "Jerusalem (Schlomzion / Har Chozwim)", "he": "ירושלים (שלומציון / הר חוצבים)", "ru": "Иерусалим (Шломцион / Хар Хоцвим)"} },
    { v: 'תל אביב והמרכז', l: {"en": "Tel Aviv / Ramat Gan / Center", "fr": "Tel Aviv / Ramat Gan / Centre", "es": "Tel Aviv / Ramat Gan / Centro", "de": "Tel Aviv / Ramat Gan / Zentrum", "he": "תל אביב / רמת גן / המרכז", "ru": "Тель-Авив / Рамат-Ган / Центр"} },
    { v: 'חיפה והצפון', l: {"en": "Haifa / Karmiel / Nahariya / Afula", "fr": "Haïfa / Karmiel / Nahariya / Afoula", "es": "Haifa / Karmiel / Nahariya / Afula", "de": "Haifa / Karmiel / Nahariya / Afula", "he": "חיפה / כרמיאל / נהריה / עפולה", "ru": "Хайфа / Кармиэль / Нагария / Афула"} },
    { v: 'נתניה / פתח תקווה / רחובות', l: {"en": "Netanya / Petah Tikva / Herzliya / Rehovot", "fr": "Netanya / Petah Tikva / Herzliya / Rehovot", "es": "Netanya / Petaj Tikva / Herzliya / Rejovot", "de": "Netanya / Petach Tikwa / Herzliya / Rechowot", "he": "נתניה / פתח תקווה / הרצליה / רחובות", "ru": "Нетания / Петах-Тиква / Герцлия / Реховот"} },
    { v: 'אשדוד / באר שבע / דרום', l: {"en": "Ashdod / Be'er Sheva / South", "fr": "Ashdod / Beer-Sheva / Sud", "es": "Ashdod / Beer Sheva / Sur", "de": "Aschdod / Beer Scheva / Süden", "he": "אשדוד / באר שבע / דרום", "ru": "Ашдод / Беэр-Шева / Юг"} }
  ];

  var UI = {
    "en": {
        "dosTitle": "✈️ Flight-Readiness & Cross-Document Master Dossier (Synced to Server)",
        "dosSub": "Every certificate you scan and form you complete is cross-checked automatically so zero name, date, or clerk-bias traps slip through:",
        "noScans": "📸 0 Scans Yet (Scan Certs in Card #2)",
        "hebReady": "100% Hebrew Ready",
        "tapConvert": "Tap Convert → Hebrew",
        "rawDrawer": "📂 Reference Only: View Raw Blank Hebrew Gov.il PDFs (Optional)",
        "timerTitle": "⏱️ Clerk Deficiency Clock & \"Law vs. Clerk Bias\" Shield",
        "timerLead": "2026 procedures grant 45 days on paper (21d for appeals) and Utah Zoom marriages (AAA 7368/22) are binding law—yet clerks still enforce old 30-day habits and personal bias. Target <25 days, submit in HEBREW so no clerk stalls on foreign text, and demand a Written Refusal if stonewalled!",
        "timerDateLbl": "Date Clerk Issued Demand / Refusal Slip:",
        "timerCalBtn": "🔔 Add Day-24 & Day-38 Alarms (.ics)",
        "timerEmpty": "Select the date on your clerk's slip above to start your live 25-Day Clerk-Safe & 45-Day Law countdown.",
        "t30Left": "🎯 30d Clerk Habit: {d}d left",
        "t30Over": "🚨 {d}d past 30d — FILE EXTENSION NOW!",
        "t45Left": "⚖️ 45d 2026 Law: {d}d left",
        "t45Exp": "🛑 45d Law EXPIRED",
        "t21Left": "🛡️ 21d Appeal: {d}d left",
        "t21Over": "Past 21d appeal",
        "ics14": "Misrad HaPanim Check-In (Day 14): Verify Apostilles & Red-Ribbon Translations",
        "ics24": "URGENT Misrad HaPanim Target (Day 24): Submit Packet or Extension BEFORE Clerk 30d Habit!",
        "ics38": "CRITICAL 45-Day Statutory Ceiling (Day 38): Must File Written Extension Today!",
        "modeForms": "📋 1. Guided PIBA Forms (Your Language → Clerk Hebrew)",
        "modeLetters": "🛡️ 2. Statutory Hebrew Letters & Clerk Escalation",
        "selForm": "1. Select Official Misrad HaPanim Form:",
        "selLetter": "1. Select Statutory Hebrew Letter / Escalation:",
        "selBranch": "2. Target Misrad HaPanim Branch:",
        "btnPrintBlank": "🖨️ Print Blank Worksheet (English)",
        "btnScanWs": "📸 Scan Handwritten Worksheet (Auto → Hebrew)",
        "btnAiHeb": "🌐 Translate to Hebrew",
        "btnConverting": "⏳ Converting to Clerk Hebrew...",
        "btnSave": "💾 Save",
        "btnAudit": "🔍 Cross-Check All Docs & Verify",
        "btnPrintFinal": "🖨️ Stamp & Print Official Hebrew Packet (PDF)",
        "autoSaveNote": "☁️ Auto-saves on field blur/change • Foreign answers auto-convert to Clerk Hebrew before printing.",
        "wsIntro": "Fill out clearly in your own language, then snap a photo using \"Scan Handwritten Worksheet\" in GiyurAliyahTrack—our AI converts your answers directly into official Clerk Hebrew.",
        "wsYes": "☐ Yes / Confirmed",
        "alreadyHeb": "✅ All Clerk-Hebrew fields are already in Hebrew!",
        "scanningWs": "🔍 Scanning your handwritten worksheet & converting answers into Clerk Hebrew...",
        "audErrHead": "🛑 {n} Clerk Rejection Risk(s) Caught Before Your Appointment:",
        "audOkHead": "✅ 100% Clerk-Proof Packet — All Cross-Checks Passed!",
        "errMissing": "🚨 <strong>Missing Mandatory {code} Fields ({n}):</strong> {list}",
        "okAllFilled": "✅ All mandatory {code} fields are completed.",
        "errNonHeb": "🌐 <strong>Clerk-Bias Trap — Non-Hebrew Text in {n} Field(s):</strong> Clerks routinely stall forms filled in English/foreign text. Tap <strong>\"Convert My Answers → Clerk Hebrew\"</strong> (or click Print to auto-convert)!",
        "okHebFirst": "✅ 100% Hebrew-First Compliance: Every narrative field is in Clerk Hebrew and passport boxes match Latin format.",
        "errDecl": "🚨 <strong>Unchecked Statutory Declaration:</strong> Confirm the legal declaration checkbox before printing.",
        "errTz": "🚨 <strong>Invalid 9-Digit Israeli Teudat Zehut (`{tz}`):</strong> Check-digit math failed—fix this 1-digit typo!",
        "errPassShort": "🚨 <strong>Passport Validity Too Short ({m}m left):</strong> {code} requires at least {req} months.",
        "warnPassBuf": "⚠️ <strong>Clerk Passport Buffer ({m}m left):</strong> {code} requires {req}m by law, though spousal clerks expect 24m.",
        "okPass": "✅ Passport validity ({m} months left) clears all thresholds.",
        "errPolExp": "🚨 <strong>Expired 180-Day Police/Status Certificate ({d}d old):</strong> Must be issued within the last 180 days.",
        "okPol": "✅ 180-day certificate clock valid ({left} days remaining).",
        "errNameTrap": "🚨 <strong>2026 Name-Change Trap (`{p}`):</strong> Prior/maiden names MUST appear on your Police Check AND be bridged by an Apostilled Name-Change/Marriage Cert or Lawyer Affidavit.",
        "errCrossScan": "🚨 <strong>Name Mismatch Between Your Own Scanned Docs:</strong> `{a}` (\"{na}\") ≠ `{b}` (\"{nb}\")! Add prior name + attach certified Name-Change doc.",
        "errScanVsForm": "🚨 <strong>Scanned Doc vs. Form Spelling Mismatch:</strong> `{doc}` reads \"{sn}\" vs. form \"{fn}\".",
        "errDobFlip": "🚨 <strong>Birth Date Discrepancy (`DD/MM` vs `MM/DD`):</strong> `{doc}` shows `{sd}` vs. form `{fd}`.",
        "okScansChecked": "✅ Cross-verified against {n} scanned certificate(s).",
        "btnFixLegal": "🎀 Need Red-Ribbon Notary Translation or Name-Change Affidavit? Book Legal Desk →",
        "pwBtnUnlock": "🔓 Unlock Clean Watermark-Free Official Hebrew PDF ($89 Sprint / $149 Lifetime) →",
        "pwPrompt": "📄 Unlock clean, watermark-free Official Hebrew PIBA PDFs & Statutory Letters ($89 90-Day Sprint or $149 Lifetime Pass):"
    },
    "fr": {
        "dosTitle": "✈️ Dossier Maître & Vérification Croisée Anti-Rejet (Synchronisé Serveur)",
        "dosSub": "Chaque acte scanné et formulaire rempli en français est croisé automatiquement et converti en hébreu administratif :",
        "noScans": "📸 0 Acte Scanné (Scannez vos actes dans la Carte #2)",
        "hebReady": "100% Prêt en Hébreu",
        "tapConvert": "Cliquez Traduire → Hébreu",
        "rawDrawer": "📂 Référence : Voir les PDF Gouvernementaux Vierges en Hébreu (Optionnel)",
        "timerTitle": "⏱️ Chronomètre 25/30 vs 45 Jours & Bouclier Réalité Guichet",
        "timerLead": "Les procédures 2026 accordent 45 jours sur papier (21j d'appel), mais les agents appliquent souvent 30 jours et bloquent les formulaires remplis en anglais/français. Déposez avant J+25 en HÉBREU et exigez toujours un refus écrit motivé !",
        "timerDateLbl": "Date de la demande du guichet (Drishat Mismachim) :",
        "timerCalBtn": "🔔 Rappels Calendrier J+24 & J+38 (.ics)",
        "timerEmpty": "Sélectionnez la date de votre feuille ci-dessus pour lancer le compte à rebours J+25 / J+45.",
        "t30Left": "🎯 Habitude Guichet 30j : {d}j restants",
        "t30Over": "🚨 +{d}j au-delà de 30j — DÉPOSEZ PROLONGATION !",
        "t45Left": "⚖️ Loi 2026 (45j) : {d}j restants",
        "t45Exp": "🛑 Délai 45j EXPIRÉ",
        "t21Left": "🛡️ Appel 21j : {d}j restants",
        "t21Over": "Délai 21j dépassé",
        "ics14": "Suivi Misrad HaPanim (Jour 14) : Vérifier Apostilles & Traductions Ruban Rouge",
        "ics24": "URGENT Misrad HaPanim (Jour 24) : Déposer Dossier ou Prolongation AVANT les 30 jours !",
        "ics38": "CRITIQUE Plafond Légal 45 Jours (Jour 38) : Déposer Demande Écrite Aujourd'hui !",
        "modeForms": "📋 1. Formulaires PIBA Guidés (Français → Hébreu Guichet)",
        "modeLetters": "🛡️ 2. Lettres Légales en Hébreu & Escalade Directeur",
        "selForm": "1. Choisissez le Formulaire Officiel Misrad HaPanim :",
        "selLetter": "1. Choisissez la Lettre Statutaire / Escalade :",
        "selBranch": "2. Bureau Misrad HaPanim Cible :",
        "btnPrintBlank": "🖨️ Imprimer Questionnaire Vierge (en Français)",
        "btnScanWs": "📸 Scanner Feuille Manuscrite (IA → Hébreu)",
        "btnAiHeb": "🌐 Traduire en hébreu",
        "btnConverting": "⏳ Conversion en hébreu administratif...",
        "btnSave": "💾 Sauvegarder",
        "btnAudit": "🔍 Vérifier & Croiser Tous Mes Documents",
        "btnPrintFinal": "🖨️ Générer le Dossier Officiel en Hébreu (PDF)",
        "autoSaveNote": "☁️ Sauvegarde auto à chaque champ quitté • Conversion auto en hébreu avant impression.",
        "wsIntro": "Remplissez clairement en français, puis prenez une photo via « Scanner Feuille Manuscrite » dans GiyurAliyahTrack — l'IA convertira tout en hébreu officiel.",
        "wsYes": "☐ Oui / Confirmé",
        "alreadyHeb": "✅ Tous les champs destinés au guichet sont déjà en hébreu !",
        "scanningWs": "🔍 Lecture de votre feuille manuscrite et conversion en hébreu administratif...",
        "audErrHead": "🛑 {n} Risque(s) de Rejet Détecté(s) Avant Votre Rendez-vous :",
        "audOkHead": "✅ Dossier 100% Blindé — Toutes les Vérifications Croisées Sont Validées !",
        "errMissing": "🚨 <strong>Champs Obligatoires {code} Manquants ({n}) :</strong> {list}",
        "okAllFilled": "✅ Tous les champs obligatoires de {code} sont remplis.",
        "errNonHeb": "🌐 <strong>Piège Guichet — Texte Non-Hébreu dans {n} Champ(s) :</strong> Cliquez sur <strong>« Traduire Mes Réponses → Hébreu »</strong> (ou sur Générer PDF pour convertir automatiquement) !",
        "okHebFirst": "✅ Conformité 100% Hébreu : Tous les champs descriptifs sont en hébreu et les champs passeport en lettres latines.",
        "errDecl": "🚨 <strong>Déclaration Légale Non Cochée :</strong> Veuillez cocher la déclaration légale en bas du formulaire.",
        "errTz": "🚨 <strong>N° Teudat Zehut Israélien Invalide (`{tz}`) :</strong> Clé de contrôle à 9 chiffres incorrecte — corrigez cette faute de frappe !",
        "errPassShort": "🚨 <strong>Validité Passeport Trop Courte ({m} mois) :</strong> {code} exige au moins {req} mois.",
        "warnPassBuf": "⚠️ <strong>Marge Passeport ({m} mois) :</strong> {code} exige {req}m par la loi, mais 24m est recommandé.",
        "okPass": "✅ Validité du passeport ({m} mois restants) conforme.",
        "errPolExp": "🚨 <strong>Casier / Célibat Expiré ({d} jours) :</strong> Doit dater de moins de 180 jours.",
        "okPol": "✅ Délai de 180 jours valide ({left} jours restants).",
        "errNameTrap": "🚨 <strong>Piège Changement de Nom 2026 (`{p}`) :</strong> Vos noms antérieurs/de jeune fille DOIVENT figurer sur le casier judiciaire ET être justifiés par un acte apostillé ou Affidavit d'avocat.",
        "errCrossScan": "🚨 <strong>Divergence de Nom Entre Vos Actes Scannés :</strong> `{a}` (\"{na}\") ≠ `{b}` (\"{nb}\") ! Ajoutez un acte de changement de nom apostillé.",
        "errScanVsForm": "🚨 <strong>Écart d'Orthographe Acte Scanné vs Formulaire :</strong> `{doc}` indique \"{sn}\" alors que le formulaire indique \"{fn}\".",
        "errDobFlip": "🚨 <strong>Écart Date de Naissance (`JJ/MM` vs `MM/JJ`) :</strong> `{doc}` indique `{sd}` vs formulaire `{fd}`.",
        "okScansChecked": "✅ Croisé avec succès contre {n} acte(s) scanné(s).",
        "btnFixLegal": "🎀 Besoin d'une Traduction Notariée Ruban Rouge ou Affidavit de Nom ? Réserver Notre Bureau Juridique →",
        "pwBtnUnlock": "🔓 Débloquer le PDF Officiel en Hébreu Sans Filigrane (89$ Pass 90j / 149$ à Vie) →",
        "pwPrompt": "📄 Débloquez vos formulaires officiels PIBA en hébreu sans filigrane (89$ Pass 90 Jours ou 149$ à Vie) :"
    },
    "es": {
        "dosTitle": "✈️ Expediente Maestro y Cruce Forense Sin Errores (Sincronizado)",
        "dosSub": "Cada acta escaneada y formulario completado en español se cruza automáticamente y se convierte al hebreo oficial:",
        "noScans": "📸 0 Actas Escaneadas (Escanee sus actas en la Tarjeta #2)",
        "hebReady": "100% Listo en Hebreo",
        "tapConvert": "Pulse Convertir → Hebreo",
        "rawDrawer": "📂 Referencia: Ver PDFs Originales en Blanco de Gov.il en Hebreo (Opcional)",
        "timerTitle": "⏱️ Reloj 25/30 vs 45 Días y Escudo contra Sesgo de Ventanilla",
        "timerLead": "Las normas 2026 dan 45 días en papel (21d apelación), pero muchos funcionarios cierran expedientes a los 30 días o frenan formularios sin hebreo. ¡Entregue antes del día 25 en HEBREO y exija decisión escrita!",
        "timerDateLbl": "Fecha del requerimiento del funcionario:",
        "timerCalBtn": "🔔 Recordatorios Día 24 y 38 (.ics)",
        "timerEmpty": "Seleccione arriba la fecha de su hoja para activar el reloj en vivo de 25 y 45 días.",
        "t30Left": "🎯 Hábito Ventanilla 30d: quedan {d}d",
        "t30Over": "🚨 +{d}d sobre 30d — ¡PIDA PRÓRROGA YA!",
        "t45Left": "⚖️ Ley 2026 (45d): quedan {d}d",
        "t45Exp": "🛑 Plazo 45d VENCIDO",
        "t21Left": "🛡️ Apelación 21d: quedan {d}d",
        "t21Over": "Pasó plazo 21d",
        "ics14": "Control Misrad HaPanim (Día 14): Verificar Apostillas y Traducciones Cinta Roja",
        "ics24": "URGENTE Misrad HaPanim (Día 24): ¡Presentar Carpeta o Prórroga ANTES del Día 30!",
        "ics38": "CRÍTICO Tope Legal 45 Días (Día 38): ¡Presentar Prórroga Escrita Hoy!",
        "modeForms": "📋 1. Formularios PIBA Guiados (Español → Hebreo Oficial)",
        "modeLetters": "🛡️ 2. Cartas Legales en Hebreo y Escalada al Director",
        "selForm": "1. Seleccione el Formulario Oficial de Misrad HaPanim:",
        "selLetter": "1. Seleccione Carta Legal / Escalada al Director:",
        "selBranch": "2. Sucursal de Misrad HaPanim:",
        "btnPrintBlank": "🖨️ Imprimir Hoja en Blanco (en Español)",
        "btnScanWs": "📸 Escanear Hoja Manuscrita (IA → Hebreo)",
        "btnAiHeb": "🌐 Traducir al hebreo",
        "btnConverting": "⏳ Convirtiendo al hebreo oficial...",
        "btnSave": "💾 Guardar",
        "btnAudit": "🔍 Revisar y Cruzar Todos Mis Documentos",
        "btnPrintFinal": "🖨️ Generar Paquete Oficial en Hebreo (PDF)",
        "autoSaveNote": "☁️ Guardado automático al salir de cada campo • Conversión automática al hebreo al imprimir.",
        "wsIntro": "Complete claramente en español y tome una foto con «Escanear Hoja Manuscrita» en GiyurAliyahTrack — nuestra IA pasará todo al hebreo oficial.",
        "wsYes": "☐ Sí / Confirmado",
        "alreadyHeb": "✅ ¡Todos los campos para el funcionario ya están en hebreo!",
        "scanningWs": "🔍 Escaneando su hoja manuscrita y convirtiendo respuestas al hebreo oficial...",
        "audErrHead": "🛑 {n} Riesgo(s) de Rechazo Detectado(s) Antes de su Cita:",
        "audOkHead": "✅ ¡Carpeta 100% Blindada — Todos los Cruces Documentales Aprobados!",
        "errMissing": "🚨 <strong>Campos Obligatorios de {code} Faltantes ({n}):</strong> {list}",
        "okAllFilled": "✅ Todos los campos obligatorios de {code} están completos.",
        "errNonHeb": "🌐 <strong>Trampa de Ventanilla — Texto sin Traducir en {n} Campo(s):</strong> Pulse <strong>«Convertir Mis Respuestas → Hebreo»</strong> (o Generar PDF para conversión automática).",
        "okHebFirst": "✅ Cumplimiento 100% Hebreo: Todos los textos están en hebreo oficial y los datos de pasaporte en letras latinas.",
        "errDecl": "🚨 <strong>Declaración Jurada sin Marcar:</strong> Marque la casilla de declaración legal antes de imprimir.",
        "errTz": "🚨 <strong>N.º Teudat Zehut Israelí Inválido (`{tz}`):</strong> Falló el dígito verificador — ¡corrija el número!",
        "errPassShort": "🚨 <strong>Vigencia de Pasaporte Insuficiente ({m}m):</strong> {code} exige mínimo {req} meses.",
        "warnPassBuf": "⚠️ <strong>Margen de Pasaporte ({m}m):</strong> {code} exige {req}m por ley, pero se recomiendan 24m.",
        "okPass": "✅ Vigencia del pasaporte ({m} meses restantes) verificada.",
        "errPolExp": "🚨 <strong>Certificado Penal / Soltería Vencido ({d} días):</strong> Debe tener menos de 180 días.",
        "okPol": "✅ Reloj de 180 días vigente (quedan {left} días).",
        "errNameTrap": "🚨 <strong>Trampa Cambio de Nombre 2026 (`{p}`):</strong> Todo apellido de soltera o nombre previo DEBE figurar en Antecedentes Penales Y contar con Certificado de Cambio de Nombre/Matrimonio Apostillado o Declaración Notarial.",
        "errCrossScan": "🚨 <strong>Diferencia de Nombre Entre sus Actas Escaneadas:</strong> `{a}` (\"{na}\") ≠ `{b}` (\"{nb}\")! Adjunte certificado de cambio de nombre apostillado.",
        "errScanVsForm": "🚨 <strong>Diferencia Ortográfica Acta Escaneada vs Formulario:</strong> `{doc}` dice \"{sn}\" vs formulario \"{fn}\".",
        "errDobFlip": "🚨 <strong>Diferencia en Fecha de Nacimiento (`DD/MM` vs `MM/DD`):</strong> `{doc}` muestra `{sd}` vs formulario `{fd}`.",
        "okScansChecked": "✅ Cruzado correctamente con {n} certificado(s) escaneado(s).",
        "btnFixLegal": "🎀 ¿Necesita Traducción Notarial Cinta Roja o Declaración de Nombres? Reserve Escritorio Legal →",
        "pwBtnUnlock": "🔓 Desbloquear PDF Oficial en Hebreo Sin Marca de Agua ($89 Pase 90d / $149 de por Vida) →",
        "pwPrompt": "📄 Desbloquee los formularios oficiales PIBA en hebreo sin marca de agua ($89 Pase 90 Días o $149 de por Vida):"
    },
    "de": {
        "dosTitle": "✈️ Flugbereitschafts- & Dokumenten-Kreuzprüfung (Server-Synchronisiert)",
        "dosSub": "Jede gescannte Urkunde und jedes auf Deutsch ausgefüllte Formular wird automatisch abgeglichen und in Behörden-Hebräisch übertragen:",
        "noScans": "📸 Noch 0 Urkunden Gescannt (Urkunden in Karte #2 scannen)",
        "hebReady": "100% Hebräisch Bereit",
        "tapConvert": "Klicken: → Hebräisch",
        "rawDrawer": "📂 Referenz: Originale Hebräische Gov.il Blanko-PDFs Anzeigen (Optional)",
        "timerTitle": "⏱️ 25/30- vs. 45-Tage-Uhr & Schalter-Realitätsschutz",
        "timerLead": "Die Regeln 2026 geben 45 Tage auf dem Papier (21T Beschwerde), aber Beamte schließen oft nach 30 Tagen oder blockieren nicht-hebräische Formulare. Vor Tag 25 auf HEBRÄISCH einreichen und schriftlichen Bescheid verlangen!",
        "timerDateLbl": "Datum der Nachforderung am Schalter:",
        "timerCalBtn": "🔔 Kalender-Alarme Tag 24 & 38 (.ics)",
        "timerEmpty": "Datum oben auswählen, um den Live-Countdown (25-Tage-Ziel / 45-Tage-Gesetz) zu starten.",
        "t30Left": "🎯 30T Schalter-Praxis: noch {d}T",
        "t30Over": "🚨 {d}T über 30T — FRISTVERLÄNGERUNG EINREICHEN!",
        "t45Left": "⚖️ 45T Gesetz 2026: noch {d}T",
        "t45Exp": "🛑 45T Frist ABGELAUFEN",
        "t21Left": "🛡️ 21T Beschwerde: noch {d}T",
        "t21Over": "21T Frist vorbei",
        "ics14": "Misrad HaPanim Check (Tag 14): Apostillen & Rotes-Band-Übersetzungen prüfen",
        "ics24": "DRINGEND Misrad HaPanim (Tag 24): Paket oder Verlängerung VOR Tag 30 einreichen!",
        "ics38": "KRITISCH 45-Tage-Höchstfrist (Tag 38): Heute schriftliche Fristverlängerung einreichen!",
        "modeForms": "📋 1. Geführte PIBA-Formulare (Deutsch → Behörden-Hebräisch)",
        "modeLetters": "🛡️ 2. Hebräische Rechtsschreiben & Amtsleiter-Eskalation",
        "selForm": "1. Offizielles Misrad HaPanim Formular wählen:",
        "selLetter": "1. Gesetzliches Schreiben / Eskalation wählen:",
        "selBranch": "2. Zuständige Zweigstelle:",
        "btnPrintBlank": "🖨️ Arbeitsblatt Leer Drucken (auf Deutsch)",
        "btnScanWs": "📸 Handschriftliches Blatt Scannen (KI → Hebräisch)",
        "btnAiHeb": "🌐 Ins Hebräische übersetzen",
        "btnConverting": "⏳ Übersetze in Behörden-Hebräisch...",
        "btnSave": "💾 Speichern",
        "btnAudit": "🔍 Alle Dokumente Abgleichen & Prüfen",
        "btnPrintFinal": "🖨️ Offizielles Hebräisches Paket Erstellen (PDF)",
        "autoSaveNote": "☁️ Speichert automatisch beim Verlassen jedes Feldes • Automatische Hebräisch-Konvertierung vor dem Druck.",
        "wsIntro": "Füllen Sie das Blatt auf Deutsch aus und fotografieren Sie es mit „Handschriftliches Blatt Scannen“ in GiyurAliyahTrack — unsere KI überträgt alles ins offizielle Hebräisch.",
        "wsYes": "☐ Ja / Bestätigt",
        "alreadyHeb": "✅ Alle hebräischen Pflichtfelder sind bereits auf Hebräisch!",
        "scanningWs": "🔍 Handschriftliches Arbeitsblatt wird gescannt und in Behörden-Hebräisch übersetzt...",
        "audErrHead": "🛑 {n} Ablehnungsrisiko/-risiken Vor Ihrem Termin Erkannt:",
        "audOkHead": "✅ 100% Schalter-Sicheres Paket — Alle Dokumenten-Abgleiche Bestanden!",
        "errMissing": "🚨 <strong>Fehlende Pflichtfelder in {code} ({n}):</strong> {list}",
        "okAllFilled": "✅ Alle Pflichtfelder in {code} sind ausgefüllt.",
        "errNonHeb": "🌐 <strong>Schalter-Falle — Nicht-Hebräischer Text in {n} Feld(ern):</strong> Klicken Sie auf <strong>„Meine Antworten → Behörden-Hebräisch“</strong> (oder auf PDF Erstellen zur Auto-Übersetzung)!",
        "okHebFirst": "✅ 100% Hebräisch-Konformität: Alle Sachbearbeiter-Felder sind auf Hebräisch und Pass-Felder in Lateinschrift.",
        "errDecl": "🚨 <strong>Gesetzliche Erklärung Nicht Angekreuzt:</strong> Bitte bestätigen Sie unten die gesetzliche Erklärung.",
        "errTz": "🚨 <strong>Ungültige 9-Stellige Israelische Teudat Zehut (`{tz}`):</strong> Prüfziffer falsch — Tippfehler korrigieren!",
        "errPassShort": "🚨 <strong>Reisepass-Gültigkeit Zu Kurz ({m}M übrig):</strong> {code} erfordert mindestens {req} Monate.",
        "warnPassBuf": "⚠️ <strong>Reisepass-Puffer ({m}M übrig):</strong> Gesetzlich {req}M für {code}, aber 24M empfohlen.",
        "okPass": "✅ Reisepass-Gültigkeit ({m} Monate übrig) erfüllt alle Vorgaben.",
        "errPolExp": "🚨 <strong>180-Tage-Frist Abgelaufen ({d}T alt):</strong> Führungszeugnis/Ledigkeit darf max. 180 Tage alt sein.",
        "okPol": "✅ 180-Tage-Uhr gültig (noch {left} Tage übrig).",
        "errNameTrap": "🚨 <strong>Namensänderungs-Falle 2026 (`{p}`):</strong> Frühere/Geburtsnamen MÜSSEN im Führungszeugnis stehen UND durch apostillierte Urkunde oder Anwalts-Affidavit belegt sein.",
        "errCrossScan": "🚨 <strong>Namensabweichung Zwischen Gescannten Urkunden:</strong> `{a}` (\"{na}\") ≠ `{b}` (\"{nb}\")! Apostillierte Namensänderungsurkunde beifügen.",
        "errScanVsForm": "🚨 <strong>Schreibweisen-Abweichung Scan vs. Formular:</strong> `{doc}` lautet \"{sn}\" vs. Formular \"{fn}\".",
        "errDobFlip": "🚨 <strong>Geburtsdatum-Abweichung (`TT/MM` vs `MM/TT`):</strong> `{doc}` zeigt `{sd}` vs. Formular `{fd}`.",
        "okScansChecked": "✅ Erfolgreich mit {n} gescannter/n Urkunde(n) abgeglichen.",
        "btnFixLegal": "🎀 Rotes-Band-Notarübersetzung oder Namens-Affidavit benötigt? Rechtsbüro Buchen →",
        "pwBtnUnlock": "🔓 Offizielles Hebräisches PDF Ohne Wasserzeichen Freischalten ($89 90T / $149 Lebenslang) →",
        "pwPrompt": "📄 Schalten Sie offizielle hebräische PIBA-Formulare ohne Wasserzeichen frei ($89 90-Tage-Pass oder $149 Lebenslang):"
    },
    "he": {
        "dosTitle": "✈️ תיק אב מסונכרן והצלבת מסמכים אוטומטית (אפס טעויות לפני הטיסה והלשכה)",
        "dosSub": "כל תעודה שנסרקה וכל טופס שמולא מוצלבים אוטומטית (שמות, הורים, סבים, תאריכים ותוקף דרכון/יושר) ונשמרים בעברית תקנית:",
        "noScans": "📸 טרם נסרקו תעודות (סרקו בכרטיסייה #2)",
        "hebReady": "100% מוכן בעברית",
        "tapConvert": "לחצו תרגום ← עברית",
        "rawDrawer": "📂 לעיון: פתיחת טפסי המקור הריקים של רשות האוכלוסין (אופציונלי)",
        "timerTitle": "⏱️ שעון עצר 25/30 מול 45 ימים ומגן הטיות פקידים",
        "timerLead": "נהלי 2026 מקנים 45 יום (ו-21 יום לערר), אך בשטח פקידים פועלים לפי הרגל של 30 יום או מתעלמים מפסיקה (נישואי יוטה עע\"מ 7368/22). הגישו בעברית מלאה עד יום 25 ובכל סירוב דרשו החלטה בכתב!",
        "timerDateLbl": "תאריך קבלת דרישת המסמכים / הסירוב:",
        "timerCalBtn": "🔔 תזכורות ליומן יום 24 ו-38 (.ics)",
        "timerEmpty": "בחרו למעלה את תאריך הדרישה להפעלת שעון העצר החי (יעד 25 יום / 45 יום בחוק).",
        "t30Left": "🎯 הרגל פקיד 30 יום: נותרו {d} ימים",
        "t30Over": "🚨 חריגה של {d} ימים מ-30 יום — הגישו הארכה מיד!",
        "t45Left": "⚖️ תקרת חוק 2026 (45 יום): נותרו {d} ימים",
        "t45Exp": "🛑 פג מועד 45 הימים",
        "t21Left": "🛡️ מועד ערר 21 יום: נותרו {d} ימים",
        "t21Over": "חלפו 21 ימי הערר",
        "ics14": "בדיקת מעקב משרד הפנים (יום 14): וידוא אפוסטיל ותרגומים נוטריוניים",
        "ics24": "דחוף משרד הפנים (יום 24): הגשת התיק או בקשת הארכה לפני יום ה-30!",
        "ics38": "קריטי תקרת 45 יום בחוק (יום 38): חובה להגיש בקשת הארכה בכתב היום!",
        "modeForms": "📋 1. מילוי מונחה של טפסי משרד הפנים (עברית תקנית מלאה)",
        "modeLetters": "🛡️ 2. מכתבי הסבר ודרישת החלטה בכתב ממנהל הלשכה",
        "selForm": "1. בחרו טופס רשמי של משרד הפנים:",
        "selLetter": "1. בחרו מכתב הסבר / דרישת החלטה בכתב:",
        "selBranch": "2. לשכת רשות האוכלוסין המטפלת:",
        "btnPrintBlank": "🖨️ הדפסת דף עבודה ריק למילוי ידני",
        "btnScanWs": "📸 סריקת דף עבודה ממולא בכתב יד",
        "btnAiHeb": "🌐 תרגם לעברית",
        "btnConverting": "⏳ מתרגם לעברית תקנית לרשות האוכלוסין...",
        "btnSave": "💾 שמירה",
        "btnAudit": "🔍 בדיקת הצלבת מסמכים מלאה",
        "btnPrintFinal": "🖨️ הפקת תיק רשמי בעברית להדפסה (PDF)",
        "autoSaveNote": "☁️ שמירה אוטומטית בענן בכל מעבר שדה • המרה אוטומטית לעברית תקנית לפני הדפסה.",
        "wsIntro": "מלאו בכתב ברור וצלמו דרך כפתור \"סריקת דף עבודה ממולא בכתב יד\" במערכת — המערכת תעביר הכל לעברית תקנית.",
        "wsYes": "☐ כן / מאושר",
        "alreadyHeb": "✅ כל שדות העברית כבר ממולאים בעברית תקנית!",
        "scanningWs": "🔍 סורק את דף העבודה בכתב יד וממיר לעברית תקנית...",
        "audErrHead": "🛑 אותרו {n} מוקשים לעצירת התיק בלשכה לפני התור:",
        "audOkHead": "✅ תיק חסין פקידים ב-100% — כל הצלבות המסמכים עברו בהצלחה!",
        "errMissing": "🚨 <strong>שדות חובה חסרים ב-{code} ({n}):</strong> {list}",
        "okAllFilled": "✅ כל שדות החובה ב-{code} מלאים.",
        "errNonHeb": "🌐 <strong>מלכודת פקידים — אותיות לועזיות ב-{n} שדות עברית:</strong> לחצו על <strong>\"תרגום אוטומטי לעברית תקנית\"</strong> (או על הפקת PDF להמרה אוטומטית)!",
        "okHebFirst": "✅ עמידה מלאה בעברית תקנית: כל שדות הפקיד בעברית ושדות הדרכון בלועזית.",
        "errDecl": "🚨 <strong>הצהרה חוקית לא סומנה:</strong> חובה לסמן את תיבת ההצהרה בתחתית הטופס.",
        "errTz": "🚨 <strong>מספר תעודת זהות ישראלית שגוי (`{tz}`):</strong> ספרת הביקורת אינה תקינה — תקנו את שגיאת ההקלדה!",
        "errPassShort": "🚨 <strong>תוקף דרכון קצר מדי ({m} חודשים):</strong> {code} מחייב לפחות {req} חודשים.",
        "warnPassBuf": "⚠️ <strong>מרווח ביטחון לדרכון ({m} חודשים):</strong> החוק דורש {req} חודשים ל-{code}, אך מומלץ 24 חודשים.",
        "okPass": "✅ תוקף הדרכון הזר ({m} חודשים) תקין.",
        "errPolExp": "🚨 <strong>פג תוקף 180 יום לתעודת יושר/מצב אישי ({d} ימים):</strong> חייב להיות מתחת ל-180 יום.",
        "okPol": "✅ שעון 180 הימים לתעודות תקין (נותרו {left} ימים).",
        "errNameTrap": "🚨 <strong>מלכודת שינוי שם 2026 (`{p}`):</strong> חובה שכל שם קודם/נעורים יופיע בתעודת היושר ושיצורף אישור שינוי שם/נישואין מאומת באפוסטיל או תצהיר עו\"ד.",
        "errCrossScan": "🚨 <strong>אי-התאמת שמות בין התעודות שנסרקו:</strong> `{a}` (\"{na}\") ≠ `{b}` (\"{nb}\")! צרפו תעודת שינוי שם מאומתת.",
        "errScanVsForm": "🚨 <strong>פער באיות השם בין התעודה לטופס:</strong> ב-`{doc}` מופיע \"{sn}\" לעומת \"{fn}\" בטופס.",
        "errDobFlip": "🚨 <strong>סתירה בתאריך לידה (`יום/חודש` מול `חודש/יום`):</strong> ב-`{doc}` רשום `{sd}` לעומת `{fd}` בטופס.",
        "okScansChecked": "✅ בוצעה הצלבה מלאה מול {n} תעודות שנסרקו.",
        "btnFixLegal": "🎀 זקוקים לתרגום נוטריוני (סרט אדום) או תצהיר שמות? תאמו מול המחלקה המשפטית ←",
        "pwBtnUnlock": "🔓 פתיחת PDF רשמי נקי ללא סימן מים ($89 ל-90 יום / $149 לכל החיים) ←",
        "pwPrompt": "📄 פתחו הפקת טפסי רשות האוכלוסין ומכתבים רשמיים בעברית ללא סימן מים ($89 ל-90 יום או $149 לכל החיים):"
    },
    "ru": {
        "dosTitle": "✈️ Мастер-досье и автоматическая перекрёстная сверка документов (синхронизировано с сервером)",
        "dosSub": "Каждое отсканированное свидетельство и заполненная форма сверяются автоматически, исключая расхождения в именах, датах и субъективный фактор пкидим:",
        "noScans": "📸 Нет отсканированных документов (загрузите во вкладке № 2)",
        "hebReady": "100% готово на иврите",
        "tapConvert": "Перевести на иврит",
        "rawDrawer": "📂 Для справки: оригинальные пустые бланки МВД / Gov.il (PDF)",
        "timerTitle": "⏱️ Таймер дедлайнов МВД и защита от субъективных отказов пкидим",
        "timerLead": "По регламенту 2026 года на исправление даётся 45 дней (21 день на апелляцию), а брак в Юте через Zoom (прецедент Багац 7368/22) обязателен к признанию. Тем не менее, пкидим часто требуют всё за 30 дней. Подавайте документы строго до 25-го дня, заполняйте на иврите и всегда требуйте письменный отказ («Одцаат серав»)!",
        "timerDateLbl": "Дата выдачи требования / отказа от пкида:",
        "timerCalBtn": "🔔 Добавить напоминания на 24-й и 38-й день (.ics)",
        "timerEmpty": "Укажите дату с бланка пкида выше, чтобы запустить таймер (цель — 25 дней против 45 дней по закону).",
        "t30Left": "🎯 Стандартная практика пкида (30 дн.): осталось {d} дн.",
        "t30Over": "🚨 Превышен срок в 30 дн. на {d} дн. — СРОЧНО ПРОСИТЕ ПРОДЛЕНИЕ!",
        "t45Left": "⚖️ Законный срок (45 дн. по регламенту): осталось {d} дн.",
        "t45Exp": "🛑 Законный срок 45 дней ИСТЁК",
        "t21Left": "🛡️ Срок на апелляцию (21 дн.): осталось {d} дн.",
        "t21Over": "Срок апелляции (21 день) истёк",
        "ics14": "Промежуточный контроль МВД (День 14): проверка апостилей и нотариальных переводов с красной лентой",
        "ics24": "СРОЧНО: Контрольный срок МВД (День 24): подать пакет или заявление на продление ДО 30 дней!",
        "ics38": "КРИТИЧЕСКИЙ ДЕДЛАЙН (День 38): крайний срок подачи ходатайства о продлении законных 45 дней!",
        "modeForms": "📋 1. Пошаговые бланки МВД / PIBA (перевод на официальный иврит)",
        "modeLetters": "🛡️ 2. Официальные письма, пояснения и требования письменного решения",
        "selForm": "1. Выберите официальный бланк МВД (Мисрад ха-Паним):",
        "selLetter": "1. Выберите юридическое письмо / обжалование:",
        "selBranch": "2. Отделение МВД (Лишкат Мисрад ха-Паним):",
        "btnPrintBlank": "🖨️ Распечатать пустой черновик для ручного заполнения",
        "btnScanWs": "📸 Сканировать рукописный черновик (автоперевод на иврит)",
        "btnAiHeb": "🌐 Перевести на иврит",
        "btnConverting": "⏳ Перевод на бюрократический иврит для МВД...",
        "btnSave": "💾 Сохранить",
        "btnAudit": "🔍 Сверить все документы и проверить риски",
        "btnPrintFinal": "🖨️ Сформировать и распечатать официальный пакет на иврите (PDF)",
        "autoSaveNote": "☁️ Автосохранение при изменении полей • Иностранный текст автоматически переводится на иврит перед печатью.",
        "wsIntro": "Заполните черновик разборчиво на родном языке и сфотографируйте через «Сканировать рукописный черновик» — ИИ переведёт ответы на юридический иврит для МВД.",
        "wsYes": "☐ Да / Подтверждаю",
        "alreadyHeb": "✅ Все обязательные поля уже заполнены на иврите!",
        "scanningWs": "🔍 Сканирование черновика и перевод данных на официальный иврит...",
        "audErrHead": "🛑 Обнаружено {n} критических несоответствий перед визитом в МВД:",
        "audOkHead": "✅ Пакет на 100% готов к подаче — все перекрёстные проверки пройдены!",
        "errMissing": "🚨 <strong>Не заполнены обязательные поля формы {code} ({n}):</strong> {list}",
        "okAllFilled": "✅ Все обязательные поля формы {code} успешно заполнены.",
        "errNonHeb": "🌐 <strong>Риск придирок пкида — неивритский текст в полях ({n}):</strong> Пкидим часто затягивают процесс при наличии латиницы. Нажмите <strong>«Перевести на иврит»</strong> (или сформируйте PDF для автоперевода)!",
        "okHebFirst": "✅ Полное соответствие языковым нормам: все описательные поля на иврите, данные загранпаспорта — на латинице.",
        "errDecl": "🚨 <strong>Не подтверждена декларация:</strong> отметьте галочкой обязательное заявление перед печатью.",
        "errTz": "🚨 <strong>Неверный 9-значный номер Теудат-Зеут (`{tz}`):</strong> ошибка контрольной цифры — проверьте опечатку!",
        "errPassShort": "🚨 <strong>Срок действия загранпаспорта слишком мал ({m} мес.):</strong> для {code} требуется минимум {req} мес.",
        "warnPassBuf": "⚠️ <strong>Запас срока паспорта ({m} мес.):</strong> по закону для {code} нужно {req} мес., но для СТУПРО пкидим требуют не менее 24 мес.",
        "okPass": "✅ Срок действия загранпаспорта ({m} мес.) соответствует всем требованиям.",
        "errPolExp": "🚨 <strong>Истёк 180-дневный срок справки о несудимости / семейном положении ({d} дн.):</strong> документ должен быть не старше 180 дней.",
        "okPol": "✅ Справки действительны по правилу 180 дней (осталось {left} дн.).",
        "errNameTrap": "🚨 <strong>Ловушка со сменой фамилии 2026 года (`{p}`):</strong> все предыдущие/девичьи фамилии ДОЛЖНЫ быть указаны в справке о несудимости и подтверждены апостилированным свидетельством или адвокатским аффидевитом (Тацхир).",
        "errCrossScan": "🚨 <strong>Расхождение имён между загруженными документами:</strong> `{a}` («{na}») ≠ `{b}` («{nb}»)! Укажите предыдущее имя и приложите свидетельство с апостилем.",
        "errScanVsForm": "🚨 <strong>Несовпадение написания имени в документе и форме:</strong> в `{doc}` указано «{sn}», а в форме — «{fn}».",
        "errDobFlip": "🚨 <strong>Несовпадение даты рождения (`ДД/ММ` и `ММ/ДД`):</strong> в `{doc}` указано `{sd}`, а в форме — `{fd}`.",
        "okScansChecked": "✅ Успешно сверено с {n} отсканированным(и) документом(ами).",
        "btnFixLegal": "🎀 Нужен нотариальный перевод с красной лентой или аффидевит о смене имени? Запись к адвокату →",
        "pwBtnUnlock": "🔓 Скачать официальный PDF на иврите без водяных знаков ($89 на 90 дней / $149 бессрочно) →",
        "pwPrompt": "📄 Получите доступ к чистым официальным бланкам МВД и юридическим письмам на иврите без водяных знаков ($89 на 90 дней или $149 бессрочно):"
    }
};

  var F = {
    pf_surname_he: { req: 1, script: 'he', rtl: 1,
      l: {
        en: 'Applicant Family / Last Name',
        fr: 'Nom de Famille du Demandeur',
        es: 'Apellido del Solicitante',
        de: 'Familienname des Antragstellers',
        he: 'שם משפחה של המבקש/ת',
        ru: 'Фамилия заявителя'
      },
      h: {
        en: 'For the Hebrew row on the official form: type in your language or Hebrew (tapping Translate or Print converts it to official Clerk Hebrew automatically).',
        fr: 'Pour la ligne en hébreu du formulaire : tapez dans votre langue ou en hébreu (converti automatiquement en hébreu officiel).',
        es: 'Para la fila en hebreo del formulario: escriba en su idioma o en hebreo (se convierte automáticamente al hebreo oficial).',
        de: 'Für die hebräische Zeile im Formular: in Ihrer Sprache oder auf Hebräisch eingeben (wird automatisch in Behörden-Hebräisch übersetzt).',
        he: 'עבור השורה בעברית בטופס הרשמי של משרד הפנים.',
        ru: 'Для строки на иврите в официальном бланке: пишите на русском или иврите (автоматически переводится на иврит МВД).'
      }
    },
    pf_surname_en: { req: 1, script: 'latin',
      l: {
        en: 'Applicant Surname (As in Passport)',
        fr: 'Nom de Famille (Selon Passeport)',
        es: 'Apellido (Según Pasaporte)',
        de: 'Nachname (Laut Reisepass)',
        he: 'שם משפחה של המבקש/ת בלועזית (בדיוק כמו בדרכון הזר) *',
        ru: 'Фамилия заявителя — Латиницей строго по загранпаспорту *'
      },
      h: {
        en: 'Populated ONLY from your Foreign Passport (never from an Israeli ID). Must match your passport machine-readable zone letter-for-letter (A–Z).',
        fr: 'Rempli UNIQUEMENT depuis votre passeport étranger. Doit correspondre lettre pour lettre à votre passeport (A–Z).',
        es: 'Completado SOLO desde su pasaporte extranjero. Debe coincidir letra por letra con su pasaporte (A–Z).',
        de: 'Nur aus Ihrem ausländischen Reisepass. Muss Buchstabe für Buchstabe mit dem Reisepass übereinstimmen (A–Z).',
        he: 'מאוכלס אך ורק מהדרכון הזר (באותיות לטיניות A–Z בדיוק כפי שמופיע בדרכון).',
        ru: 'Заполняется ТОЛЬКО из загранпаспорта (буква в букву латиницей A–Z).'
      }
    },
    pf_given_he: { req: 1, script: 'he', rtl: 1,
      l: {
        en: 'Applicant Given Name(s)',
        fr: 'Prénom(s) du Demandeur',
        es: 'Nombre(s) del Solicitante',
        de: 'Vorname(n) des Antragstellers',
        he: 'שם פרטי של המבקש/ת',
        ru: 'Имя (имена) заявителя'
      },
      h: {
        en: 'For the Hebrew row on the official form: include middle names if printed on your passport/birth certificate.',
        fr: 'Pour la ligne en hébreu du formulaire : incluez les deuxièmes prénoms s’ils figurent sur votre passeport/acte.',
        es: 'Para la fila en hebreo del formulario: incluya segundos nombres si aparecen en su pasaporte/partida.',
        de: 'Für die hebräische Zeile im Formular: Zweitnamen einschließen, falls im Pass/Geburtsurkunde angegeben.',
        he: 'עבור השורה בעברית בטופס: יש לכלול שמות אמצעיים אם מופיעים בדרכון או בתעודת הלידה.',
        ru: 'Для строки на иврите: укажите второе имя, если оно есть в паспорте/свидетельстве о рождении.'
      }
    },
    pf_given_en: { req: 1, script: 'latin',
      l: {
        en: 'Applicant Given Name(s) (As in Passport)',
        fr: 'Prénom(s) (Selon Passeport)',
        es: 'Nombre(s) (Según Pasaporte)',
        de: 'Vorname(n) (Laut Reisepass)',
        he: 'שם פרטי של המבקש/ת בלועזית (בדיוק כמו בדרכון הזר) *',
        ru: 'Имя заявителя — Латиницей строго по загранпаспорту *'
      },
      h: {
        en: 'Populated ONLY from your Foreign Passport (never from an Israeli ID). Must match your passport letter-for-letter (A–Z).',
        fr: 'Rempli UNIQUEMENT depuis votre passeport étranger. Doit correspondre lettre pour lettre à votre passeport (A–Z).',
        es: 'Completado SOLO desde su pasaporte extranjero. Debe coincidir letra por letra con su pasaporte (A–Z).',
        de: 'Nur aus Ihrem ausländischen Reisepass. Muss Buchstabe für Buchstabe mit dem Reisepass übereinstimmen (A–Z).',
        he: 'מאוכלס אך ורק מהדרכון הזר (באותיות לטיניות A–Z בדיוק כפי שמופיע בדרכון).',
        ru: 'Заполняется ТОЛЬКО из загранпаспорта (буква в букву латиницей A–Z).'
      }
    },
    pf_prior_names: { req: 0, script: 'he', rtl: 1,
      l: {"en": "All Maiden / Prior Legal Names (or \"None\")", "fr": "Nom de Jeune Fille / Tous Noms Antérieurs (ou « ללא »)", "es": "Apellido de Soltera / Nombres Anteriores (o «ללא»)", "de": "Geburtsname / Alle Früheren Namen (oder „ללא“)", "he": "כל השמות הקודמים / שם נעורים (או \"ללא\")", "ru": "Все девичьи / предыдущие официальные имена и фамилии (или «Нет»)"},
      h: {"en": "CRITICAL 2026 TRAP: Any difference between Birth Cert & Passport requires an Apostilled Name-Change Cert AND must appear on your Police Check!", "fr": "PIÈGE 2026 : Tout changement de nom exige un acte apostillé ET doit figurer sur votre casier judiciaire !", "es": "TRAMPA 2026: Cualquier cambio entre Partida y Pasaporte exige acta apostillada Y figurar en Antecedentes Penales.", "de": "FALLE 2026: Jede Namensänderung erfordert eine apostillierte Urkunde UND muss im Führungszeugnis stehen!", "he": "חובה שהשם הקודם יופיע בתעודת היושר + תעודת שינוי שם מאומתת באפוסטיל!", "ru": "КРИТИЧЕСКИ ВАЖНО: при любом расхождении между свидетельством о рождении и загранпаспортом требуется свидетельство о перемене имени с апостилем, и все предыдущие фамилии ДОЛЖНЫ быть указаны в справке о несудимости!"} },
    pf_dob: { req: 1, t: 'date', script: 'any',
      l: {"en": "Date of Birth", "fr": "Date de Naissance", "es": "Fecha de Nacimiento", "de": "Geburtsdatum", "he": "תאריך לידה לועזי", "ru": "Дата рождения (по григорианскому календарю)"},
      h: {"en": "Printed automatically as Israeli DD/MM/YYYY so clerks never confuse month and day.", "fr": "Formaté automatiquement en JJ/MM/AAAA pour Israël.", "es": "Se formatea automáticamente en DD/MM/AAAA para Israel.", "de": "Wird automatisch im israelischen Format TT/MM/JJJJ gedruckt.", "he": "יודפס בפורמט ישראלי תקני יום/חודש/שנה.", "ru": "Формируется автоматически в стандартном израильском формате ДД/ММ/ГГГГ, чтобы сотрудники не путали день и месяц."} },
    pf_hebrew_dob: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Hebrew Date of Birth (Required on MR/14)", "fr": "Date de Naissance Hébraïque (pour MR/14)", "es": "Fecha de Nacimiento Hebrea (para MR/14)", "de": "Hebräisches Geburtsdatum (für MR/14)", "he": "תאריך לידה עברי (לשאלון מר/14)", "ru": "Дата рождения по еврейскому календарю (обязательно для формы מר/14)"} },
    pf_gender: { req: 1, t: 'select', script: 'he',
      opts: [
        {"v": "נקבה", "en": "Female (נקבה)", "fr": "Femme (נקבה)", "es": "Femenino (נקבה)", "de": "Weiblich (נקבה)", "he": "נקבה", "ru": "Женский (נקבה)"},
        {"v": "זכר", "en": "Male (זכר)", "fr": "Homme (זכר)", "es": "Masculino (זכר)", "de": "Männlich (זכר)", "he": "זכר", "ru": "Мужской (זכר)"}
      ],
      l: {"en": "Gender", "fr": "Sexe", "es": "Sexo", "de": "Geschlecht", "he": "מגדר / מין", "ru": "Пол"} },
    pf_marital: { req: 1, t: 'select', script: 'he',
      opts: [
        {"v": "רווק/ה", "en": "Single (רווק/ה)", "fr": "Célibataire (רווק/ה)", "es": "Soltero/a (רווק/ה)", "de": "Ledig (רווק/ה)", "he": "רווק/ה", "ru": "Холост / Не замужем (רווק/ה)"},
        {"v": "נשוי/אה", "en": "Married (נשוי/אה)", "fr": "Marié(e) (נשוי/אה)", "es": "Casado/a (נשוי/אה)", "de": "Verheiratet (נשוי/אה)", "he": "נשוי/אה", "ru": "Женат / Замужем (נשוי/אה)"},
        {"v": "גרוש/ה", "en": "Divorced (גרוש/ה)", "fr": "Divorcé(e) (גרוש/ה)", "es": "Divorciado/a (גרוש/ה)", "de": "Geschieden (גרוש/ה)", "he": "גרוש/ה", "ru": "Разведен / Разведена (גרוש/ה)"},
        {"v": "אלמן/ה", "en": "Widowed (אלמן/ה)", "fr": "Veuf/Veuve (אלמן/ה)", "es": "Viudo/a (אלמן/ה)", "de": "Verwitwet (אלמן/ה)", "he": "אלמן/ה", "ru": "Вдовец / Вдова (אלמן/ה)"},
        {"v": "ידוע/ה בציבור", "en": "Common-Law Partner (ידוע/ה בציבור)", "fr": "Concubin / Pacsé (ידוע/ה בציבור)", "es": "Pareja de Hecho (ידוע/ה בציבור)", "de": "Lebenspartner (ידוע/ה בציבור)", "he": "ידוע/ה בציבור", "ru": "Фактический брак / Сожитель (ידוע/ה בציבור)"}
      ],
      l: {"en": "Current Marital Status", "fr": "État Civil Actuel", "es": "Estado Civil Actual", "de": "Aktueller Familienstand", "he": "מצב משפחתי נוכחי", "ru": "Текущее семейное положение"} },
    pf_birth_country: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Country & City of Birth", "fr": "Pays & Ville de Naissance", "es": "País y Ciudad de Nacimiento", "de": "Geburtsland & Geburtsort", "he": "ארץ ועיר לידה", "ru": "Страна и город рождения"} },
    pf_citizenship: { req: 1, script: 'he', rtl: 1,
      l: {"en": "All Current Citizenships", "fr": "Toutes Nationalités Actuelles", "es": "Todas las Ciudadanías Actuales", "de": "Alle Staatsangehörigkeiten", "he": "אזרחויות נוכחיות", "ru": "Все имеющиеся гражданства"},
      h: {"en": "List dual citizenships too—you need a Police Check from each citizenship country.", "fr": "Indiquez toute double nationalité (casier requis pour chacune).", "es": "Indique doble ciudadanía (se exige antecedentes de cada país).", "de": "Auch Doppelstaatsbürgerschaften angeben (jeweils Führungszeugnis nötig).", "he": "ציינו גם אזרחות כפולה — נדרשת תעודת יושר מכל מדינת אזרחות.", "ru": "Укажите также двойное гражданство — справка о несудимости требуется из каждой страны гражданства."} },
    pf_religion_nat: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Religion & Nationality", "fr": "Religion & Nationalité", "es": "Religión y Nacionalidad", "de": "Religion & Nationalität", "he": "דת ולאום", "ru": "Вероисповедание и национальность"} },
    pf_father_he: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Father's Full Name (Match Birth Cert)", "fr": "Nom Complet du Père (selon Acte de Naissance)", "es": "Nombre Completo del Padre (según Partida)", "de": "Vollständiger Name des Vaters", "he": "שם האב המלא (כמו בתעודת הלידה)", "ru": "Полное имя отца (в точности как в свидетельстве о рождении)"} },
    pf_father_dob: { req: 0, t: 'date', script: 'any',
      l: {"en": "Father's Date of Birth (Form Ash/3)", "fr": "Date de Naissance du Père (Formulaire Ash/3)", "es": "Fecha de Nacimiento del Padre (Formulario Ash/3)", "de": "Geburtsdatum des Vaters (Formular Asch/3)", "he": "תאריך לידה של האב (טופס אש/3)", "ru": "Дата рождения отца (форма טופס אש/3)"} },
    pf_mother_he: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Mother's Full Name (Match Birth Cert)", "fr": "Nom Complet de la Mère (selon Acte)", "es": "Nombre Completo de la Madre (según Partida)", "de": "Vollständiger Name der Mutter", "he": "שם האם המלא (כמו בתעודת הלידה)", "ru": "Полное имя матери (в точности как в свидетельстве о рождении)"} },
    pf_mother_maiden: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Mother's Maiden Name (Mandatory on Ash/1 & Ash/3)", "fr": "Nom de Jeune Fille de la Mère (Obligatoire sur Ash/1 & Ash/3)", "es": "Apellido de Soltera de la Madre (Obligatorio en Ash/1 y Ash/3)", "de": "Geburtsname der Mutter (Pflichtfeld auf Asch/1 & Asch/3)", "he": "שם נעורים של האם (חובה באש/1 ובאש/3)", "ru": "Девичья фамилия матери (обязательно для форм אש/1 и אש/3)"} },
    pf_mother_dob: { req: 0, t: 'date', script: 'any',
      l: {"en": "Mother's Date of Birth (Form Ash/3)", "fr": "Date de Naissance de la Mère (Formulaire Ash/3)", "es": "Fecha de Nacimiento de la Madre (Formulario Ash/3)", "de": "Geburtsdatum der Mutter (Formular Asch/3)", "he": "תאריך לידה של האם (טופס אש/3)", "ru": "Дата рождения матери (форма טופס אש/3)"} },
    pf_foreign_grandfather: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Paternal Grandfather's Name (Mandatory on Ash/6 & MR/14!)", "fr": "Prénom du Grand-Père Paternel (Obligatoire sur Ash/6 & MR/14 !)", "es": "Nombre del Abuelo Paterno (¡Obligatorio en Ash/6 y MR/14!)", "de": "Name des Großvaters väterlicherseits (Pflicht auf Asch/6 & MR/14!)", "he": "שם הסב (אבי האב — שדה חובה באש/6 ובמר/14!)", "ru": "Имя дедушки по отцовской линии (обязательно для форм אש/6 и מר/14!)"} },
    pf_pass_num: { req: 1, script: 'latin',
      l: {
        en: 'Foreign Passport / Travel Doc Number',
        fr: 'N° de Passeport / Titre de Voyage (ou Teudat Zehut si détenue)',
        es: 'N.º de Pasaporte / Doc. de Viaje (o Teudat Zehut si posee)',
        de: 'Reisepass- / Reiseausweis-Nr. (oder Teudat Zehut falls vorhanden)',
        he: 'מספר דרכון זר / תעודת מעבר (או ת"ז ישראלית למי שכבר מחזיק)',
        ru: 'Номер загранпаспорта / проездного документа (или Теудат Зеут, если есть)'
      },
      h: {
        en: 'Enter your foreign passport (or Laissez-Passer) number. If you already hold an Israeli Teudat Zehut (e.g., A/5 or Israeli citizen), your 9-digit Israeli ID also suffices in the Israeli ID field.',
        fr: 'Indiquez votre numéro de passeport étranger (ou Laissez-Passer). Si vous possédez déjà une Teudat Zehut israélienne (ex. A/5), votre N° Teudat Zehut à 9 chiffres suffit.',
        es: 'Ingrese su número de pasaporte extranjero (o Laissez-Passer). Si ya posee Teudat Zehut israelí (ej. A/5), su número de 9 dígitos es suficiente.',
        de: 'Geben Sie Ihre Reisepassnummer (oder Laissez-Passer) ein. Falls Sie bereits eine israelische Teudat Zehut (z.B. A/5) besitzen, genügt diese 9-stellige ID.',
        he: 'הזינו מספר דרכון זר (או תעודת מעבר). אם כבר יש ברשותכם תעודת זהות ישראלית (כגון א/5 או אזרח), ניתן להזין את מספר ת"ז (9 ספרות) בשדה תעודת הזהות.',
        ru: 'Введите номер загранпаспорта (или Лессе-Пассе). Если у вас уже есть израильский Теудат Зеут (например, А/5), достаточно указать 9 цифр Теудат Зеут.'
      }
    },
    pf_pass_issue_date: { req: 1, t: 'date', script: 'any',
      l: {"en": "Passport Issue Date", "fr": "Date de Délivrance du Passeport", "es": "Fecha de Emisión del Pasaporte", "de": "Ausstellungsdatum des Passes", "he": "תאריך הנפקת דרכון", "ru": "Дата выдачи загранпаспорта"} },
    pf_pass_exp_date: { req: 1, t: 'date', script: 'any',
      l: {"en": "Passport Expiry Date", "fr": "Date d'Expiration du Passeport", "es": "Fecha de Vencimiento del Pasaporte", "de": "Ablaufdatum des Passes", "he": "תוקף דרכון עד תאריך", "ru": "Срок действия загранпаспорта"},
      h: {"en": "Min. 24 months left for Spousal (Ash/6, Nespach Alef) or 12 months for Aliyah (Ash/456).", "fr": "Min. 24 mois pour conjoint (Ash/6) ou 12 mois pour Aliyah (Ash/456).", "es": "Mín. 24 meses para pareja (Ash/6) o 12 meses para Aliyá (Ash/456).", "de": "Mind. 24 Monate für Partner (Asch/6) bzw. 12 Monate für Alija (Asch/456).", "he": "מינימום 24 חודשים להליך זוגי או 12 חודשים לעלייה בארץ.", "ru": "Остаточный срок действия паспорта не менее 24 месяцев для СТУПРО (טופס אש/6, נספח א׳) или 12 месяцев для смены статуса на репатриацию (טופס אש/456)."} },
    pf_police_issue_date: { req: 1, t: 'date', script: 'any',
      l: {"en": "Police Check & Single-Status Issue Date (<180 Days!)", "fr": "Date d'Émission du Casier & Célibat (<180 Jours !)", "es": "Fecha de Emisión de Antecedentes y Soltería (<180 Días!)", "de": "Ausstellungsdatum Führungszeugnis & Ledigkeit (<180 Tage!)", "he": "תאריך הנפקת תעודת יושר ותמצית מצב אישי (עד 180 יום!)", "ru": "Дата выдачи справки о несудимости и справки о семейном положении (не старше 180 дней!)"} },
    pf_countries_over_1yr: { req: 1, script: 'he', rtl: 1,
      l: {"en": "All Countries Lived >1 Year Since Age 14", "fr": "Tous Pays Habités >1 An Depuis l'Âge de 14 Ans", "es": "Todos los Países Vividos >1 Año Desde los 14 Años", "de": "Alle Länder >1 Jahr Wohnsitz Seit dem 14. Lebensjahr", "he": "כל המדינות בהן התגוררת מעל שנה מגיל 14", "ru": "Все страны, в которых вы проживали более одного года начиная с 14-летнего возраста"},
      h: {"en": "Every country listed here requires its own Apostilled Police Check!", "fr": "Chaque pays mentionné exige son propre casier judiciaire apostillé !", "es": "¡Cada país listado aquí requiere su propio Certificado Penal Apostillado!", "de": "Für jedes hier genannte Land ist ein eigenes apostilliertes Führungszeugnis Pflicht!", "he": "חובה לצרף תעודת יושר מאומתת באפוסטיל מכל מדינה ברשימה זו!", "ru": "По каждой из указанных стран необходимо предоставить отдельную справку о несудимости с апостилем!"} },
    pf_entry_date_port: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Last Entry Date to Israel, Border Port & Current Visa", "fr": "Dernière Entrée en Israël, Point d'Entrée & Visa Actuel", "es": "Última Entrada a Israel, Frontera y Visa Actual", "de": "Letzte Einreise nach Israel, Grenzübergang & Visum", "he": "תאריך כניסה אחרון לישראל, מעבר גבול ואשרה נוכחית", "ru": "Дата последнего въезда в Израиль, пограничный пункт и текущая виза"} },
    pf_abroad_addr: { req: 1, script: 'latin',
      l: {"en": "Permanent Address Abroad (Latin Letters: Street, City, Country)", "fr": "Adresse Permanente à l'Étranger (Rue, Ville, Pays)", "es": "Dirección Permanente en el Extranjero (Calle, Ciudad, País)", "de": "Feste Adresse im Ausland (Straße, Ort, Land)", "he": "המען הקבוע בחו\"ל (בלועזית: רחוב, עיר, מדינה)", "ru": "Постоянный адрес за границей (латиницей: улица, город, страна)"} },
    pf_il_addr_he: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Full Israeli Address (City, Street, House/Apt, Zip)", "fr": "Adresse Complète en Israël (Ville, Rue, N°, Appt)", "es": "Dirección Completa en Israel (Ciudad, Calle, N.º, Dpto)", "de": "Vollständige Adresse in Israel (Stadt, Straße, Nr.)", "he": "כתובת מלאה בישראל (יישוב, רחוב, בית, דירה, מיקוד)", "ru": "Полный адрес в Израиле (город, улица, номер дома/квартиры, индекс)"} },
    pf_phone_il: { req: 1, script: 'any',
      l: {"en": "Israeli Mobile Phone Number(s)", "fr": "Numéro(s) Mobile Israélien", "es": "Teléfono(s) Móvil en Israel", "de": "Israelische Handynummer(n)", "he": "מספר טלפון נייד בישראל", "ru": "Номер(а) израильского мобильного телефона"} },
    pf_email: { req: 1, script: 'latin',
      l: {"en": "Email Address (Used by PIBA for Official Legal Notices!)", "fr": "Adresse Email (Utilisée pour les notifications officielles !)", "es": "Correo Electrónico (¡Usado para notificaciones oficiales!)", "de": "E-Mail-Adresse (Wird für amtliche Fristbescheide genutzt!)", "he": "כתובת דוא\"ל (משמשת להמצאה רשמית של החלטות הרשות!)", "ru": "Адрес электронной почты (используется Управлением народонаселения и иммиграции для официальных судебных и административных уведомлений!)"} },
    pf_ash3_action: { req: 1, script: 'he', rtl: 1,
      l: {"en": "Requested Extension Months & Target Visa", "fr": "Durée Demandée & Catégorie de Visa", "es": "Meses Solicitados y Categoría de Visa", "de": "Gewünschte Monate & Visakategorie", "he": "הארכת רישיון (מס׳ חודשים) / החלפת סוג אשרה ל-", "ru": "Запрашиваемый срок продления (в месяцах) и требуемый тип визы"} },
    pf_inst_details: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Studying Institution / Yeshiva / Ulpan, Amuta # & Rabbi Phone", "fr": "Institution d'Étude / Oulpan, N° Amuta & Téléphone du Rabbin", "es": "Institución / Yeshivá / Ulpán, N.º Amutá y Teléfono", "de": "Lehrinstitut / Jeschiwa / Ulpan, Amuta-Nr. & Telefon", "he": "שם המוסד בו המבקש לומד, מספר עמותה, כתובת ואיש קשר", "ru": "Учебное заведение / Иешива / Ульпан, номер амуты (НКО) и контактный телефон раввина/представителя"} },
    pf_sp_name_he: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Israeli Spouse / Partner / Inviter Full Name", "fr": "Nom Complet du Conjoint / Invitant Israélien", "es": "Nombre Completo del Cónyuge / Invitante Israelí", "de": "Vollständiger Name des Israelischen Partners / Einladers", "he": "שם מלא של בן/בת הזוג או המזמין הישראלי", "ru": "Полное имя израильского супруга / партнера / приглашающего лица"} },
    pf_sp_tz: { req: 0, script: 'any',
      l: {"en": "Israeli 9-Digit Teudat Zehut Number (Auto Check-Digit Verified)", "fr": "N° Teudat Zehut Israélien à 9 Chiffres (Vérification Auto)", "es": "N.º Teudat Zehut Israelí de 9 Dígitos (Verificación Automática)", "de": "9-Stellige Israelische Teudat-Zehut-Nr. (Prüfziffer-Check)", "he": "מספר תעודת זהות ישראלית (9 ספרות — בדיקת ספרת ביקורת)", "ru": "9-значный номер израильского удостоверения личности (теудат-зеут с автоматической проверкой контрольной цифры)"} },
    pf_sp_parents_grand: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Israeli Sponsor's DOB, Father, Mother & Grandfather Names (Ash/6 p.2)", "fr": "Date Naiss., Père, Mère & Grand-Père du Conjoint Israélien", "es": "Fecha Nac., Padre, Madre y Abuelo del Cónyuge Israelí", "de": "Geburtsdatum, Vater, Mutter & Großvater des Israelis", "he": "תאריך לידה, שם האב, שם האם ושם הסב של בן הזוג הישראלי (אש/6 עמ׳ 2)", "ru": "Дата рождения, имя отца, имя матери и имя деда израильского супруга/партнера (טופס אש/6, стр. 2)"} },
    pf_marriage_details: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Marriage Date & Place + Sponsor Occupation", "fr": "Date & Lieu de Mariage + Profession du Conjoint", "es": "Fecha y Lugar de Boda + Profesión del Cónyuge", "de": "Heiratsdatum & -ort + Beruf des Partners", "he": "תאריך ומקום הנישואין (כולל יוטה/חו\"ל) ומשלח יד המזמין", "ru": "Дата и место заключения брака (включая штат Юта / за границей) и род занятий приглашающего супруга"} },
    pf_ash6_refs: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: {"en": "2 Israeli References: Full Name, 9-Digit TZ, Relation, Address & Phone", "fr": "2 Témoins Israéliens : Nom, TZ 9 chiffres, Lien, Adresse & Tél.", "es": "2 Testigos Israelíes: Nombre, TZ 9 dígitos, Vínculo, Dirección y Tel.", "de": "2 Israelische Referenzen: Name, 9-stellige TZ, Beziehung, Adresse & Tel.", "he": "שני ממליצים ישראלים (עמ׳ 3 באש/6): שם מלא, ת\"ז, קירבה, כתובת וטלפון (+ צילום ת\"ז!)", "ru": "2 израильских поручителя/рекомендателя: ФИО, 9-значный номер теудат-зеут, степень родства/знакомства, адрес и телефон (+ копия теудат-зеут!)"} },
    pf_ll_affidavit: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: {"en": "Page 6 Landlord Lease Affidavit: Owner Name, TZ, SQM (מ\"ר), Floors, Rooms & Utility Payers", "fr": "Page 6 Affidavit Propriétaire : Nom, TZ, Surface (m²), Étages, Pièces & Factures", "es": "Pág. 6 Declaración del Propietario: Nombre, TZ, m², Pisos, Habitaciones y Cuentas", "de": "Seite 6 Vermieter-Erklärung: Name, TZ, m², Etagen, Zimmer & Nebenkosten", "he": "תצהיר משכיר (עמ׳ 6 באש/6): שם ות\"ז בעל הנכס, מ\"ר, קומות, חדרים ומי משלם חשבונות", "ru": "Декларация арендодателя (стр. 6 в טופס אש/6): ФИО владельца, номер теудат-зеут, площадь (кв. м), этажи, количество комнат и плательщики коммунальных счетов"} },
    pf_456_settlement: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: {"en": "Page 2 Ash/456 + MR/14: Prior Israel Stays, Severing Abroad Ties, Israeli Bank, Housing, Community & Schooling Years", "fr": "Page 2 Ash/456 + MR/14 : Séjours passés, Fin d'activité à l'étranger, Banque, Logement, Communauté & Années d'études", "es": "Pág. 2 Ash/456 + MR/14: Estadías previas, Fin de lazos afuera, Banco israelí, Vivienda, Comunidad y Años de estudio", "de": "Seite 2 Asch/456 + MR/14: Frühere Aufenthalte, Aufgabe Auslandswohnsitz, Bankkonto, Gemeinde & Schuljahre", "he": "עמ׳ 2 באש/456 + מר/14: שהיות קודמות, ניתוק מרכז חיים בחו\"ל, בנק ודיור בארץ, קהילה ושנות לימוד", "ru": "Стр. 2 טופס אש/456 + מר/14: Предыдущие периоды пребывания в Израиле, перенос центра жизни из-за рубежа, израильский банковский счет, жилье, община и годы обучения"} },
    pf_456_shvut: { req: 0, t: 'select', script: 'he',
      opts: [
        {"v": "סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר", "en": "Law of Return §4B — Jewish by Birth or Recognized Conversion", "fr": "Loi du Retour §4B — Juif de naissance ou Conversion reconnue", "es": "Ley del Retorno §4B — Judío de nacimiento o Conversión reconocida", "de": "Rückkehrgesetz §4B — Jüdisch geboren oder anerkannte Konversion", "he": "סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר", "ru": "Статья 4(бет) Закона о возвращении — еврей по рождению или прошедший признанный гиюр"},
        { v: 'סעיף 4א לחוק השבות — בן/בת זוג, ילד או נכד של יהודי', en: 'Law of Return §4A — Spouse / Child / Grandchild of a Jew', fr: 'Loi du Retour §4A — Conjoint / Enfant / Petit-enfant de Juif', es: 'Ley del Retorno §4A — Cónyuge / Hijo / Nieto de Judío', de: 'Rückkehrgesetz §4A — Ehepartner / Kind / Enkel eines Juden', he: 'סעיף 4א לחוק השבות — בן/בת זוג, ילד או נכד של יהודי', ru: 'Статья 4(алеф) Закона о возвращении — супруг(а) / ребенок / внук еврея' }
      ],
      l: {"en": "Law of Return Eligibility Clause (Page 3 Ash/456)", "fr": "Clause d'Éligibilité Loi du Retour (Page 3 Ash/456)", "es": "Cláusula de Ley del Retorno (Pág. 3 Ash/456)", "de": "Anspruchsgrundlage Rückkehrgesetz (Seite 3 Asch/456)", "he": "סעיף זכאות בחוק השבות (עמ׳ 3 באש/456)", "ru": "Пункт права на репатриацию по Закону о возвращении (стр. 3 טופס אש/456)"} },
    pf_ash1_consulate: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Purpose of Entry & Israeli Consulate Abroad to Notify", "fr": "Motif d'Entrée & Consulat d'Israël à Notifier", "es": "Motivo de Entrada y Consulado Israelí a Notificar", "de": "Einreisezweck & zu benachrichtigendes Konsulat", "he": "מטרת הכניסה לישראל ונציגות ישראל בחו\"ל להעברת האישור", "ru": "Цель въезда и израильское представительство за рубежом для передачи разрешения"} },
    pf_cv_details: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: {"en": "Security CV (Pages 1–11): Universities/Scholarships, Past/Present Jobs, First-Degree Family (+ Spouses) & Contacts", "fr": "CV Sécurité (p.1–11) : Universités/Bourses, Emplois, Famille 1er degré (+ Conjoints) & Contacts", "es": "CV Seguridad (p.1–11): Universidades/Becas, Empleos, Familia 1er grado (+ Cónyuges) y Contactos", "de": "Sicherheits-CV (S.1–11): Universitäten/Stipendien, Berufe, Familie 1. Grades (+ Ehepartner) & Kontakte", "he": "קורות חיים (עמ׳ 1–11): השכלה ומלגות, תעסוקה, בני משפחה מדרגה ראשונה (+ בני זוגם) ומכרים", "ru": "Анкета безопасности / резюме (стр. 1–11): вузы/стипендии, прошлая и текущая работа, близкие родственники (+ их супруги) и контакты"} },
    pf_children_table: { req: 0, script: 'he', rtl: 1,
      l: {"en": "Accompanying Children Under 18 (Hebrew + Latin Name, Birth Country, DOB — or \"ללא\")", "fr": "Enfants Mineurs <18 Ans (Nom Hébreu + Latin, Pays, Date Naiss. — ou « ללא »)", "es": "Hijos Menores de 18 Años (Nombre Hebreo + Latino, País, Fecha Nac. — o «ללא»)", "de": "Begleitende Kinder unter 18 (Name Hebräisch + Latein, Land, Geburtsdatum — oder „ללא“)", "he": "ילדים נלווים מתחת לגיל 18 (שם בעברית ובלועזית, ארץ לידה ותאריך לידה — או \"ללא\")", "ru": "Сопровождающие несовершеннолетние дети до 18 лет (имя на иврите и латинице, страна и дата рождения — или «ללא»)"} },
    pf_rel_story: { req: 1, script: 'he', rtl: 1, t: 'textarea',
      l: {"en": "Mandatory Statutory Explanation Letter — Michtav Hesber (Write in your language — auto-converts to Hebrew!)", "fr": "Lettre d'Explication Obligatoire — Michtav Hesber (Écrivez en français — conversion auto en hébreu !)", "es": "Carta Explicativa Obligatoria — Mijtav Hesber (¡Escriba en español — se convierte sola al hebreo!)", "de": "Pflicht-Begleitschreiben — Michtav Hesber (Auf Deutsch schreiben — wird automatisch Hebräisch!)", "he": "מכתב הסבר מנומק החובה לצירוף לטופס (בעברית תקנית)", "ru": "Обязательное мотивированное пояснительное письмо («Михтав эсбер») — пишите на своем языке, автоперевод на иврит!"} },
    pf_decl_clean_record: { t: 'checkbox', def: false,
      l: {"en": "I confirm all statutory declarations (clean criminal/health/security record, no boycott/§2d bar, sincere Israeli center of life & address-update duty)", "fr": "Je confirme toutes les déclarations légales (casier/santé/sécurité vierges, centre de vie sincère en Israël et obligation de signaler tout changement d'adresse)", "es": "Confirmo todas las declaraciones legales (sin antecedentes penales/salud/seguridad, centro de vida sincero en Israel y deber de informar cambios de domicilio)", "de": "Ich bestätige alle gesetzlichen Erklärungen (keine Vorstrafen/Gesundheits-/Sicherheitsrisiken, Lebensmittelpunkt in Israel & Adressmeldepflicht)", "he": "אני מאשר/ת את כלל ההצהרות החוקיות בטופס (היעדר עבר פלילי/ביטחוני/בריאותי, מרכז חיים כן בישראל וחובת עדכון כתובת)", "ru": "Подтверждаю все установленные законом декларации (отсутствие судимости, медицинских и угроз безопасности, запрета по ст. 2(далет), подлинный центр жизни в Израиле и обязанность обновлять адрес)"} },
    pf_police_covers_prior: { t: 'checkbox', def: false,
      l: {"en": "My Apostilled Police Certificate (<180d) explicitly covers ALL prior/maiden names", "fr": "Mon casier judiciaire apostillé (<180j) mentionne explicitement TOUS mes noms antérieurs / de jeune fille", "es": "Mi Certificado de Antecedentes Apostillado (<180d) cubre TODOS mis nombres/apellidos anteriores", "de": "Mein apostilliertes Führungszeugnis (<180T) deckt ALLE früheren Namen / Geburtsnamen ab", "he": "תעודת היושר המאומתת שלי (<180 יום) כוללת במפורש את כל השמות הקודמים / שם הנעורים", "ru": "Моя апостилированная справка о несудимости (<180 дней) явно покрывает ВСЕ предыдущие фамилии и девичью фамилию"} },
    pf_has_name_change_cert: { t: 'checkbox', def: false,
      l: {"en": "If any name differs across Birth Cert / Passport / Letters, I hold an Apostilled Name-Change / Marriage Cert or Lawyer Affidavit", "fr": "En cas de différence de nom entre mes actes, je joins un Acte de Changement de Nom / Mariage Apostillé ou Affidavit d'Avocat", "es": "Si algún nombre difiere entre mis documentos, adjunto Certificado de Cambio de Nombre / Matrimonio Apostillado o Declaración Notarial", "de": "Bei Namensabweichungen zwischen Urkunden liegt eine apostillierte Namensänderungs-/Heiratsurkunde oder ein Anwalts-Affidavit bei", "he": "בכל שינוי או הבדל בשם בין התעודות, מצורפת תעודה ציבורית מאומתת על שינוי שם או תצהיר עו\"ד", "ru": "В случае расхождений в написании ФИО в свидетельстве о рождении, загранпаспорте или справках приложено апостилированное свидетельство о перемене имени/браке или нотариальный аффидевит"} }
  };

  var FORMS = {
    ash3: {
      code: 'טופס אש/3', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash3_extension_change_visa.pdf',
      t: {"en": "טופס אש/3 (Ash/3 — 2p): Visa Extension / Change Visa Category (B/2, Conversion A/2, B/1, A/5)", "fr": "טופס אש/3 (Ash/3 — 2p) : Prolongation de Permis / Changement de Visa (B/2, Conversion A/2, B/1, A/5)", "es": "טופס אש/3 (Ash/3 — 2p): Prórroga de Permiso / Cambio de Categoría de Visa (B/2, Conversión A/2, B/1, A/5)", "de": "טופס אש/3 (Asch/3 — 2S): Aufenthaltsverlängerung / Visumwechsel (B/2, Konversion A/2, B/1, A/5)", "he": "טופס אש/3 (2 עמ׳): בקשה להארכת רישיון ישיבה / החלפת סוג אשרה (ב/2, א/2 גיור, ב/1, א/5)", "ru": "Бланк Аш/3 (טופס אש/3 — 2 стр.): Продление визы / смена категории визы (B/2, прохождение гиюра A/2, B/1, A/5)"},
      fields: [
        'pf_ash3_action', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names',
        'pf_marital', 'pf_dob', 'pf_gender', 'pf_birth_country', 'pf_citizenship', 'pf_religion_nat',
        'pf_father_he', 'pf_father_dob', 'pf_mother_he', 'pf_mother_maiden', 'pf_mother_dob',
        'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_police_issue_date', 'pf_countries_over_1yr',
        'pf_abroad_addr', 'pf_il_addr_he', 'pf_phone_il', 'pf_email', 'pf_inst_details',
        'pf_sp_name_he', 'pf_sp_tz', 'pf_children_table', 'pf_rel_story',
        'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'
      ]
    },
    ash6: {
      code: 'טופס אש/6', minPassM: 24, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash6_spousal_status.pdf',
      t: {"en": "טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008): Married Spousal Graduated Track + Lease Affidavit", "fr": "טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008) : Dossier Conjoint Marié + Affidavit Propriétaire", "es": "טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008): Trámite Escalonado Cónyuge Casado + Alquiler", "de": "טופס אש/6 (Asch/6 — 6S, Nohal 5.2.0008): Ehepartner-Stufenverfahren + Vermieter-Affidavit", "he": "טופס אש/6 (6 עמ׳, נוהל 5.2.0008 יולי 2026): מתן מעמד לבן זוג זר הנשוי לישראלי + תצהיר שכ\"ד", "ru": "Бланк Аш/6 (טופס אש/6 — 6 стр., Нохаль 5.2.0008): СТУПРО для супругов в официальном браке + аффидевит об аренде жилья"},
      fields: [
        'pf_sp_name_he', 'pf_sp_tz', 'pf_sp_parents_grand', 'pf_marriage_details',
        'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names',
        'pf_dob', 'pf_gender', 'pf_father_he', 'pf_foreign_grandfather', 'pf_mother_he', 'pf_mother_maiden',
        'pf_birth_country', 'pf_citizenship', 'pf_pass_num', 'pf_pass_exp_date', 'pf_police_issue_date',
        'pf_countries_over_1yr', 'pf_entry_date_port', 'pf_abroad_addr', 'pf_il_addr_he', 'pf_phone_il', 'pf_email',
        'pf_children_table', 'pf_ash6_refs', 'pf_ll_affidavit', 'pf_rel_story',
        'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'
      ]
    },
    nespach_alef: {
      code: 'נספח א׳', minPassM: 24, warnPassM: 24, blankPdf: '/forms/gov-pdfs/nespach_alef_affidavit.pdf',
      t: {"en": "נספח א׳ (Nohal 5.2.0009 — 1p): 13-Clause Common-Law / Cohabitation Partners Affidavit", "fr": "נספח א׳ (Nohal 5.2.0009 — 1p) : Affidavit 13 Clauses Vie Commune / Concubins", "es": "נספח א׳ (Nohal 5.2.0009 — 1p): Declaración Jurada 13 Cláusulas Pareja de Hecho", "de": "נספח א׳ (Nohal 5.2.0009 — 1S): 13-Punkte-Erklärung für Unverheiratete Lebenspartner", "he": "נספח א׳ (נוהל 5.2.0009 יולי 2026): תצהיר 13 סעיפים לבני זוג בחיים משותפים (ידועים בציבור)", "ru": "Приложение Алеф (נספח א׳, Нохаль 5.2.0009 — 1 стр.): Декларация из 13 пунктов для гражданских супругов (ядуим бе-цибур)"},
      fields: [
        'pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en',
        'pf_prior_names', 'pf_pass_num', 'pf_pass_exp_date', 'pf_police_issue_date', 'pf_countries_over_1yr',
        'pf_il_addr_he', 'pf_phone_il', 'pf_email', 'pf_rel_story',
        'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'
      ]
    },
    ash456: {
      code: 'טופס אש/456 + מר/14', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash456_in_israel_oleh.pdf',
      t: {"en": "טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p): In-Israel Aliyah (\"Oleh\") & First Teudat Zehut", "fr": "טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p) : Aliyah en Israël (« Oleh ») & 1ère Teudat Zehut", "es": "טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p): Aliyá en Israel («Olé») y 1ª Teudat Zehut", "de": "טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4S): Alija in Israel („Oleh“) & Erste Teudat Zehut", "he": "טופס אש/456 + מר/14 (נוהל 5.2.0001 מאי 2026): שינוי מעמד לעולה בישראל ורישום ת\"ז ראשונה", "ru": "Бланк Аш/456 + Мар/14 (טופס אש/456 + מר/14, Нохаль 5.2.0001 — 4 стр.): Смена статуса на репатрианта («оле») внутри Израиля и оформление первого теудат-зеута"},
      fields: [
        'pf_456_shvut', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names',
        'pf_father_he', 'pf_mother_he', 'pf_mother_maiden', 'pf_foreign_grandfather',
        'pf_dob', 'pf_hebrew_dob', 'pf_gender', 'pf_marital', 'pf_birth_country', 'pf_citizenship', 'pf_religion_nat',
        'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_police_issue_date', 'pf_countries_over_1yr',
        'pf_entry_date_port', 'pf_abroad_addr', 'pf_il_addr_he', 'pf_phone_il', 'pf_email',
        'pf_456_settlement', 'pf_sp_name_he', 'pf_sp_tz', 'pf_children_table', 'pf_rel_story',
        'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'
      ]
    },
    ash1: {
      code: 'טופס אש/1', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash1_entry_visa.pdf',
      t: {"en": "טופס אש/1 (Ash/1 — 2p): Entry Visa Application & Israeli Inviter Undertaking", "fr": "טופס אש/1 (Ash/1 — 2p) : Demande de Visa d'Entrée & Engagement de l'Invitant", "es": "טופס אש/1 (Ash/1 — 2p): Solicitud de Visa de Entrada y Compromiso del Invitante", "de": "טופס אש/1 (Asch/1 — 2S): Antrag auf Einreisevisum & Verpflichtung des Einladers", "he": "טופס אש/1 (2 עמ׳): בקשה למתן אשרת כניסה לישראל והתחייבות המזמין", "ru": "Бланк Аш/1 (טופס אש/1 — 2 стр.): Заявление на получение въездной визы и обязательство приглашающей стороны"},
      fields: [
        'pf_ash1_consulate', 'pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_surname_en',
        'pf_given_he', 'pf_given_en', 'pf_prior_names', 'pf_father_he', 'pf_mother_he', 'pf_mother_maiden',
        'pf_dob', 'pf_gender', 'pf_marital', 'pf_birth_country', 'pf_citizenship',
        'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_abroad_addr', 'pf_il_addr_he',
        'pf_phone_il', 'pf_email', 'pf_rel_story', 'pf_decl_clean_record'
      ]
    },
    sec_cv: {
      code: 'קורות חיים', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/security_cv_form.pdf',
      t: {"en": "טופס קורות חיים (11p Security CV — Only When Explicitly Ordered by Clerk)", "fr": "טופס קורות חיים (CV Sécurité 11p — Uniquement sur Demande Expresse)", "es": "טופס קורות חיים (CV Seguridad 11p — Solo si el Funcionario lo Exige)", "de": "טופס קורות חיים (11S Sicherheits-CV — Nur auf Ausdrückliche Anforderung)", "he": "טופס קורות חיים לאבחון (11 עמ׳ — למילוי רק במקרה של דרישה מפורשת מהלשכה)", "ru": "Бланк резюме (טופס קורות חיים, анкета безопасности 11 стр. — заполняется строго по прямому требованию МВД)"},
      fields: [
        'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en', 'pf_pass_num',
        'pf_dob', 'pf_birth_country', 'pf_il_addr_he', 'pf_phone_il', 'pf_cv_details', 'pf_rel_story'
      ]
    }
  };

  var LETTERS = {
    ext45: {
      t: {"en": "⏳ 25/45-Day Anti-Closure Extension Request (Nohal §ה.7 / §ה.2(8))", "fr": "⏳ Demande de Prolongation 25/45 Jours Anti-Fermeture (Nohal §ה.7)", "es": "⏳ Solicitud de Prórroga 25/45 Días Anti-Cierre (Nohal §ה.7)", "de": "⏳ 25/45-Tage Fristverlängerungsantrag gegen Aktenschließung (§ה.7)", "he": "⏳ בקשה דחופה להארכת מועד (45 יום) ומניעת סגירת תיק מנהלית", "ru": "⏳ Ходатайство о продлении срока на 25/45 дней для предотвращения закрытия дела (Нохаль §ה.7 / §ה.2(8))"}
    },
    utah_refusal: {
      t: {"en": "⚖️ Clerk Refusal Shield: Demand Written Decision & Branch Manager Review (Utah AAA 7368/22)", "fr": "⚖️ Bouclier Refus Guichet : Exiger Décision Écrite & Chef d'Agence (Mariage Utah)", "es": "⚖️ Escudo Ante Negativa Verbal: Exigir Decisión Escrita y Director (Boda Utah)", "de": "⚖️ Schalter-Ablehnungsschutz: Schriftlichen Bescheid & Amtsleiter verlangen (Utah-Ehe)", "he": "⚖️ מגן סירוב בעל-פה: דרישת החלטה מנומקת בכתב והעברה למנהל הלשכה (נישואי יוטה / נוהל 1.6.0001)", "ru": "⚖️ Защита от устного отказа служащего: требование письменного мотивированного решения и передачи дела начальнику отделения (браки в Юте / Нохаль 1.6.0001)"}
    },
    charigim: {
      t: {"en": "🕍 Va'adat Charigim Tourist-to-State-Conversion Petition", "fr": "🕍 Requête Va'adat Charigim (Autorisation Conversion d'État depuis Statut Touriste)", "es": "🕍 Petición a Va'adat Jariguim (Conversión Estatal desde Visa de Turista)", "de": "🕍 Antrag an Va'adat Charigim (Staatlicher Giur aus Touristenstatus)", "he": "🕍 בקשה מנומקת לוועדת חריגים — היתר לימודי גיור ממלכתי ממעמד תייר", "ru": "🕍 Заявление в Комиссию по исключительным случаям (Ваадат харигим): разрешение на прохождение государственного гиюра из статуса туриста"}
    },
    rehab: {
      t: {"en": "📋 Prior Record Rehabilitation Legal Memo (7 Criteria — Nohal 5.2.0001 §ה.12.ב)", "fr": "📋 Mémoire de Réhabilitation Casier Judiciaire (7 Critères — Nohal 5.2.0001)", "es": "📋 Memorial de Rehabilitación de Antecedentes (7 Criterios — Nohal 5.2.0001)", "de": "📋 Rehabilitations-Schriftsatz Führungszeugnis (7 Kriterien — Nohal 5.2.0001)", "he": "📋 תזכיר שיקום והיעדר מסוכנות לשלום הציבור (7 אמות המידה בסעיף ה.12.ב)", "ru": "📋 Юридический меморандум о реабилитации и отсутствии общественной опасности (7 критериев — Нохаль 5.2.0001 §ה.12.ב)"}
    },
    emerg_antisem: {
      t: {"en": "🚨 Emergency Antisemitism Waiver & Beit Din File Transfer", "fr": "🚨 Dérogation Humanitaire d'Urgence Antisémitisme & Transfert Beit Din", "es": "🚨 Exención Humanitaria de Emergencia por Antisemitismo y Traslado Beit Din", "de": "🚨 Humanitärer Notfallantrag Antisemitismus & Beit-Din-Aktenübertragung", "he": "🚨 בקשת חריג הומניטרי דחוף מפאת אנטישמיות והעברת תיק גיור לישראל", "ru": "🚨 Срочный гуманитарный запрос в связи с антисемитизмом и перевод дела по гиюру в раввинатский суд Израиля"}
    }
  };


  // ============================================================================
  // 100% 1:1 GRANULAR FIELD DEFINITIONS FOR ALL 8 PIBA FORMS (EN/FR/ES/DE/HE/RU)
  // ============================================================================
  var GRANULAR_1TO1_FIELDS = {
    pf_tz: { req: 0, script: 'any',
      l: {
        en: 'Applicant Israeli ID / Teudat Zehut (If Held)',
        fr: 'N° Teudat Zehut Israélienne du Demandeur (9 chiffres — si déjà attribué / A/5)',
        es: 'N.º Teudat Zehut Israelí del Solicitante (9 dígitos — si ya fue emitido / A/5)',
        de: 'Israelische Teudat-Zehut-Nr. des Antragstellers (9 Ziffern — falls vorhanden / A/5)',
        he: 'מספר תעודת זהות ישראלית של המבקש/ת (9 ספרות — אם כבר הונפקה / א/5 / עולה)',
        ru: 'Номер израильского Теудат Зеут заявителя (9 цифр — если уже выдан / А/5)'
      },
      h: {
        en: 'If you already hold a 9-digit Israeli ID (Teudat Zehut / A/5 temporary resident), enter it here—it suffices for ID fields on Nespach Alef, MR/14a, Security CV, and status renewals.',
        fr: 'Si vous possédez déjà une Teudat Zehut à 9 chiffres (ex. résident temporaire A/5), saisissez-la ici — elle suffit pour les champs d’identité.',
        es: 'Si ya tiene un Teudat Zehut de 9 dígitos (ej. residente temporal A/5), ingréselo aquí; es suficiente para los campos de identidad.',
        de: 'Falls Sie bereits eine 9-stellige Teudat Zehut (z.B. A/5) besitzen, hier eingeben — sie genügt für die Ausweisfelder.',
        he: 'אם כבר הונפקה לכם תעודת זהות ישראלית (9 ספרות, למשל רישיון א/5), הזינו אותה כאן — היא מספקת בשדות הזיהוי הרלוונטיים.',
        ru: 'Если у вас уже есть 9-значный Теудат Зеут (например, статус А/5), укажите его здесь — этого достаточно для полей удостоверения личности.'
      }
    },
    pf_req_num: { req: 0, script: 'any',
      l: { en: 'PIBA Application / File Number (if assigned by clerk)', fr: 'N° de Dossier / Demande PIBA (si attribué)', es: 'N.º de Expediente / Solicitud PIBA (si fue asignado)', de: 'PIBA Antrags- / Aktennummer (falls vergeben)', he: 'מספר בקשה / תיק ברשות האוכלוסין (אם קיים)', ru: 'Номер заявления / дела в МВД (если присвоен)' } },
    pf_visa_num: { req: 0, script: 'any',
      l: { en: 'Current Israeli Visa / Sticker Number', fr: 'Numéro de Visa Israélien Actuel', es: 'Número de Visa Israelí Actual', de: 'Aktuelle Israelische Visumnummer', he: 'מספר אשרה נוכחית בדרכון', ru: 'Номер текущей израильской визы' } },
    pf_prior_names_en: { req: 0, script: 'latin',
      l: { en: 'Maiden / Prior Legal Names — Latin Letters (Ash/1 & Ash/3)', fr: 'Nom de Jeune Fille / Noms Antérieurs — Lettres Latines (Ash/1 & Ash/3)', es: 'Apellido de Soltera / Nombres Anteriores — Letras Latinas (Ash/1 y Ash/3)', de: 'Geburtsname / Frühere Namen — Lateinische Buchstaben (Asch/1 & Asch/3)', he: 'שמות קודמים / שם נעורים בלועזית (אש/1 ואש/3)', ru: 'Девичья фамилия / прежние имена — Латиницей (Аш/1 и Аш/3)' } },
    pf_birth_country_en: { req: 0, script: 'latin',
      l: { en: 'Country & City of Birth — Latin Letters (Ash/3)', fr: 'Pays & Ville de Naissance — Lettres Latines (Ash/3)', es: 'País y Ciudad de Nacimiento — Letras Latinas (Ash/3)', de: 'Geburtsland & Geburtsort — Lateinische Buchstaben (Asch/3)', he: 'ארץ ועיר לידה בלועזית (אש/3)', ru: 'Страна и город рождения — Латиницей (Аш/3)' } },
    pf_citizenship_en: { req: 0, script: 'latin',
      l: { en: 'Current Citizenship(s) — Latin Letters (Ash/3)', fr: 'Nationalité(s) Actuelle(s) — Lettres Latines (Ash/3)', es: 'Ciudadanía(s) Actual(es) — Letras Latinas (Ash/3)', de: 'Staatsangehörigkeit(en) — Lateinische Buchstaben (Asch/3)', he: 'אזרחות בלועזית (אש/3)', ru: 'Гражданство — Латиницей (Аш/3)' } },
    pf_citizenship_code: { req: 0, script: 'any',
      l: { en: 'Additional Foreign Citizenship (for MR/14a Dual-Citizenship Notice)', fr: 'Autre Nationalité Étrangère (pour MR/14a)', es: 'Otra Ciudadanía Extranjera (para MR/14a)', de: 'Weitere Ausländische Staatsbürgerschaft (für MR/14a)', he: 'אזרחות זרה נוספת (לשאלון מר/14א)', ru: 'Дополнительное иностранное гражданство (для МР/14а)' } },
    pf_religion_en: { req: 0, script: 'latin',
      l: { en: 'Religion — Latin Letters (Ash/3, e.g. JEWISH)', fr: 'Religion — Lettres Latines (Ash/3, ex. JEWISH)', es: 'Religión — Letras Latinas (Ash/3, ej. JEWISH)', de: 'Religion — Lateinische Buchstaben (Asch/3, z.B. JEWISH)', he: 'דת בלועזית (אש/3, כגון JEWISH)', ru: 'Вероисповедание — Латиницей (Аш/3, напр. JEWISH)' } },
    pf_nationality_en: { req: 0, script: 'latin',
      l: { en: 'Nationality / Leom — Latin Letters (Ash/3, e.g. JEWISH)', fr: 'Nationalité / Leom — Lettres Latines (Ash/3)', es: 'Nacionalidad / Leom — Letras Latinas (Ash/3)', de: 'Nationalität / Leom — Lateinische Buchstaben (Asch/3)', he: 'לאום בלועזית (אש/3, כגון JEWISH)', ru: 'Национальность / Леом — Латиницей (Аш/3)' } },
    pf_occupation_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Applicant Occupation / Profession', fr: 'Profession / Métier du Demandeur', es: 'Profesión / Ocupación del Solicitante', de: 'Beruf / Tätigkeit des Antragstellers', he: 'משלח יד / מקצוע של המבקש/ת', ru: 'Профессия / род занятий заявителя' } },
    pf_edu_years: { req: 0, script: 'any',
      l: { en: 'Total Years of Schooling / Higher Education (e.g. 16)', fr: 'Nombre Total d\'Années d\'Études (ex. 16)', es: 'Total de Años de Estudio / Educación (ej. 16)', de: 'Gesamtzahl der Schul- und Studienjahre (z.B. 16)', he: 'מספר שנות לימוד (למשל 16)', ru: 'Общее количество лет обучения (напр. 16)' } },
    pf_father_en: { req: 0, script: 'latin',
      l: { en: 'Father\'s Full Name — Latin Letters (Ash/1 & Ash/3)', fr: 'Nom Complet du Père — Lettres Latines (Ash/1 & Ash/3)', es: 'Nombre Completo del Padre — Letras Latinas (Ash/1 y Ash/3)', de: 'Vollständiger Name des Vaters — Latein (Asch/1 & Asch/3)', he: 'שם האב בלועזית (אש/1 ואש/3)', ru: 'Полное имя отца — Латиницей (Аш/1 и Аш/3)' } },
    pf_father_tz: { req: 0, script: 'any',
      l: { en: 'Father\'s Israeli Teudat Zehut (if Israeli citizen — MR/14a)', fr: 'Teudat Zehut Israélienne du Père (si Israélien — MR/14a)', es: 'Teudat Zehut Israelí del Padre (si es israelí — MR/14a)', de: 'Israelische Teudat Zehut des Vaters (falls Israeli — MR/14a)', he: 'מספר ת"ז של האב (אם אזרח ישראלי — מר/14א)', ru: 'Теудат Зеут отца (если гражданин Израиля — МР/14а)' } },
    pf_mother_en: { req: 0, script: 'latin',
      l: { en: 'Mother\'s Full Name — Latin Letters (Ash/1 & Ash/3)', fr: 'Nom Complet de la Mère — Lettres Latines (Ash/1 & Ash/3)', es: 'Nombre Completo de la Madre — Letras Latinas (Ash/1 y Ash/3)', de: 'Vollständiger Name der Mutter — Latein (Asch/1 & Asch/3)', he: 'שם האם בלועזית (אש/1 ואש/3)', ru: 'Полное имя матери — Латиницей (Аш/1 и Аш/3)' } },
    pf_mother_maiden_en: { req: 0, script: 'latin',
      l: { en: 'Mother\'s Maiden Surname — Latin Letters (Ash/1 & Ash/3)', fr: 'Nom de Jeune Fille de la Mère — Lettres Latines (Ash/1 & Ash/3)', es: 'Apellido de Soltera de la Madre — Letras Latinas (Ash/1 y Ash/3)', de: 'Geburtsname der Mutter — Latein (Asch/1 & Asch/3)', he: 'שם נעורים של האם בלועזית (אש/1 ואש/3)', ru: 'Девичья фамилия матери — Латиницей (Аш/1 и Аш/3)' } },
    pf_mother_tz: { req: 0, script: 'any',
      l: { en: 'Mother\'s Israeli Teudat Zehut (if Israeli citizen — MR/14a)', fr: 'Teudat Zehut Israélienne de la Mère (si Israélienne — MR/14a)', es: 'Teudat Zehut Israelí de la Madre (si es israelí — MR/14a)', de: 'Israelische Teudat Zehut der Mutter (falls Israeli — MR/14a)', he: 'מספר ת"ז של האם (אם אזרחית ישראלית — מר/14א)', ru: 'Теудат Зеут матери (если гражданка Израиля — МР/14а)' } },
    pf_il_city_en: { req: 0, script: 'latin',
      l: { en: 'Israeli City — Latin Letters (Ash/3, e.g. HAIFA / JERUSALEM)', fr: 'Ville en Israël — Lettres Latines (Ash/3)', es: 'Ciudad en Israel — Letras Latinas (Ash/3)', de: 'Stadt in Israel — Lateinische Buchstaben (Asch/3)', he: 'עיר מגורים בישראל בלועזית (אש/3)', ru: 'Город в Израиле — Латиницей (Аш/3)' } },
    pf_il_street_en: { req: 0, script: 'latin',
      l: { en: 'Israeli Street, House & Apt — Latin Letters (Ash/3)', fr: 'Rue, N° & Appt en Israël — Lettres Latines (Ash/3)', es: 'Calle, Número y Dpto en Israel — Letras Latinas (Ash/3)', de: 'Straße, Haus- & Wohnungsnr. in Israel — Latein (Asch/3)', he: 'רחוב ומספר בית בישראל בלועזית (אש/3)', ru: 'Улица, дом и кв. в Израиле — Латиницей (Аш/3)' } },
    pf_phone_abroad: { req: 0, script: 'any',
      l: { en: 'Phone Number Abroad (with Country Code)', fr: 'Numéro de Téléphone à l\'Étranger (avec indicatif)', es: 'Teléfono en el Extranjero (con código de país)', de: 'Telefonnummer im Ausland (mit Ländervorwahl)', he: 'מספר טלפון בחו"ל (כולל קידומת מדינה)', ru: 'Телефон за границей (с кодом страны)' } },
    pf_ash3_months: { req: 0, script: 'any',
      l: { en: 'Requested Extension Duration in Months (e.g. 12)', fr: 'Durée de Prolongation Demandée en Mois (ex. 12)', es: 'Duración de Prórroga Solicitada en Meses (ej. 12)', de: 'Gewünschte Verlängerungsdauer in Monaten (z.B. 12)', he: 'מספר חודשי הארכה מבוקשים (למשל 12)', ru: 'Запрашиваемый срок продления в месяцах (напр. 12)' } },
    pf_ash3_target_visa_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Target Visa Category (e.g. A/2, B/1, A/5, B/2)', fr: 'Catégorie de Visa Demandée (ex. A/2, B/1, A/5)', es: 'Categoría de Visa Solicitada (ej. A/2, B/1, A/5)', de: 'Gewünschte Visakategorie (z.B. A/2, B/1, A/5)', he: 'סוג האשרה המבוקשת בעברית (א/2, ב/1, א/5, ב/2)', ru: 'Запрашиваемая категория визы (A/2, B/1, A/5)' } },
    pf_ash3_target_visa_en: { req: 0, script: 'latin',
      l: { en: 'Target Visa Category in Latin Letters (e.g. A/2, B/1, A/5, B/2)', fr: 'Catégorie de Visa Demandée en Latin (ex. A/2, B/1, A/5)', es: 'Categoría de Visa en Letras Latinas (ej. A/2, B/1, A/5)', de: 'Visakategorie in Lateinschrift (z.B. A/2, B/1, A/5)', he: 'סוג האשרה המבוקשת בלועזית (A/2, B/1, A/5)', ru: 'Категория визы латиницей (A/2, B/1, A/5)' } },
    pf_laissez_passer: { req: 0, t: 'checkbox', def: false,
      l: { en: 'Check ONLY if using a Laissez-Passer / Travel Document instead of a regular National Passport (Ash/3)', fr: 'Cocher UNIQUEMENT si vous utilisez un Laissez-Passer au lieu d\'un passeport national (Ash/3)', es: 'Marque SOLO si usa Laissez-Passer / Documento de Viaje en lugar de pasaporte nacional (Ash/3)', de: 'NUR ankreuzen bei Laissez-Passer / Reiseausweis statt Nationalpass (Asch/3)', he: 'סמנו רק אם המסמך הוא תעודת מעבר (לסה-פסה) במקום דרכון לאומי (אש/3)', ru: 'Отметьте ТОЛЬКО если используется Лессе-Пассе / проездной документ вместо обычного паспорта (Аш/3)' } },
    pf_inst_name_en: { req: 0, script: 'latin',
      l: { en: 'Studying Institution / Yeshiva / Ulpan Name — Latin Letters (Ash/3)', fr: 'Nom de l\'Institution / Oulpan — Lettres Latines (Ash/3)', es: 'Nombre de la Institución / Yeshivá / Ulpán — Letras Latinas (Ash/3)', de: 'Name des Lehrinstituts / Jeschiwa / Ulpan — Latein (Asch/3)', he: 'שם מוסד הלימודים בלועזית (אש/3)', ru: 'Название учебного заведения / ульпана / ешивы — Латиницей (Аш/3)' } },
    pf_inst_addr_en: { req: 0, script: 'latin',
      l: { en: 'Institution Address — Latin Letters (Ash/3)', fr: 'Adresse de l\'Institution — Lettres Latines (Ash/3)', es: 'Dirección de la Institución — Letras Latinas (Ash/3)', de: 'Adresse des Lehrinstituts — Latein (Asch/3)', he: 'כתובת מוסד הלימודים בלועזית (אש/3)', ru: 'Адрес учебного заведения — Латиницей (Аш/3)' } },
    pf_inst_contact_en: { req: 0, script: 'latin',
      l: { en: 'Institution Contact / Rabbi Name — Latin Letters (Ash/3)', fr: 'Personne de Contact / Rabbin — Lettres Latines (Ash/3)', es: 'Persona de Contacto / Rabino — Letras Latinas (Ash/3)', de: 'Ansprechpartner / Rabbiner — Latein (Asch/3)', he: 'איש קשר במוסד הלימודים בלועזית (אש/3)', ru: 'Контактное лицо / раввин — Латиницей (Аш/3)' } },
    pf_sp_surname_en: { req: 0, script: 'latin',
      l: { en: 'Spouse / Partner Surname — Passport Latin Letters (Ash/456)', fr: 'Nom de Famille du Conjoint — Lettres Latines (Ash/456)', es: 'Apellido del Cónyuge — Letras Latinas (Ash/456)', de: 'Nachname des Ehepartners — Latein (Asch/456)', he: 'שם משפחה של בן/בת הזוג בלועזית (אש/456)', ru: 'Фамилия супруга(и) — Латиницей (Аш/456)' } },
    pf_sp_given_en: { req: 0, script: 'latin',
      l: { en: 'Spouse / Partner Given Name(s) — Passport Latin Letters (Ash/456)', fr: 'Prénom(s) du Conjoint — Lettres Latines (Ash/456)', es: 'Nombre(s) del Cónyuge — Letras Latinas (Ash/456)', de: 'Vorname(n) des Ehepartners — Latein (Asch/456)', he: 'שם פרטי של בן/בת הזוג בלועזית (אש/456)', ru: 'Имя супруга(и) — Латиницей (Аш/456)' } },
    pf_sp_dob: { req: 0, t: 'date', script: 'any',
      l: { en: 'Spouse / Partner Date of Birth', fr: 'Date de Naissance du Conjoint / Partenaire', es: 'Fecha de Nacimiento del Cónyuge / Pareja', de: 'Geburtsdatum des Ehepartners / Partners', he: 'תאריך לידה של בן/בת הזוג', ru: 'Дата рождения супруга(и) / партнёра' } },
    pf_sp_citizenship_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Spouse / Partner Citizenship(s)', fr: 'Nationalité(s) du Conjoint', es: 'Ciudadanía(s) del Cónyuge', de: 'Staatsangehörigkeit(en) des Partners', he: 'אזרחות בן/בת הזוג', ru: 'Гражданство супруга(и)' } },
    pf_sp_birth_country_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Spouse / Inviter Country of Birth', fr: 'Pays de Naissance du Conjoint / Invitant', es: 'País de Nacimiento del Cónyuge / Invitante', de: 'Geburtsland des Partners / Einladers', he: 'ארץ לידה של בן הזוג / המזמין', ru: 'Страна рождения супруга / приглашающего' } },
    pf_sp_prior_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Spouse / Inviter Prior Surname (or "None")', fr: 'Nom Antérieur du Conjoint / Invitant (ou « Aucun »)', es: 'Apellido Anterior del Cónyuge / Invitante (o «Ninguno»)', de: 'Früherer Name des Partners / Einladers (oder „Keine“)', he: 'שם משפחה קודם של בן הזוג / המזמין (או "ללא")', ru: 'Прежняя фамилия супруга / приглашающего (или «Нет»)' } },
    pf_sp_entry_date: { req: 0, t: 'date', script: 'any',
      l: { en: 'Israeli Sponsor Date of Aliyah / Entry (if born abroad — Ash/6)', fr: 'Date d\'Aliyah / Entrée du Conjoint Israélien (Ash/6)', es: 'Fecha de Aliyá / Entrada del Cónyuge Israelí (Ash/6)', de: 'Alija- / Einreisedatum des israelischen Partners (Asch/6)', he: 'תאריך עלייה / כניסה לישראל של בן הזוג הישראלי (אש/6)', ru: 'Дата репатриации / въезда израильского супруга (Аш/6)' } },
    pf_sp_status_date: { req: 0, t: 'date', script: 'any',
      l: { en: 'Date Israeli Sponsor Received Israeli Status (Ash/6)', fr: 'Date d\'Obtention du Statut Israélien du Conjoint (Ash/6)', es: 'Fecha de Obtención del Estatus Israelí del Cónyuge (Ash/6)', de: 'Datum des Erhalts des israelischen Status des Partners (Asch/6)', he: 'תאריך קבלת המעמד של בן הזוג הישראלי (אש/6)', ru: 'Дата получения статуса израильским супругом (Аш/6)' } },
    pf_sp_pass_exp: { req: 0, t: 'date', script: 'any',
      l: { en: 'Spouse Passport Expiry Date (Ash/456)', fr: 'Date d\'Expiration du Passeport du Conjoint (Ash/456)', es: 'Fecha de Vencimiento del Pasaporte del Cónyuge (Ash/456)', de: 'Ablaufdatum des Reisepasses des Partners (Asch/456)', he: 'תוקף דרכון של בן/בת הזוג (אש/456)', ru: 'Срок действия паспорта супруга(и) (Аш/456)' } },
    pf_sp_phone_home: { req: 0, script: 'any',
      l: { en: 'Spouse / Home Landline Phone (if any — Ash/6)', fr: 'Téléphone Fixe du Domicile / Conjoint (Ash/6)', es: 'Teléfono Fijo de Casa / Cónyuge (Ash/6)', de: 'Festnetztelefon des Partners / Haushalts (Asch/6)', he: 'טלפון קווי בבית (אם קיים — אש/6)', ru: 'Домашний телефон супруга (если есть — Аш/6)' } },
    pf_marriage_date: { req: 0, t: 'date', script: 'any',
      l: { en: 'Date of Marriage (if Married — MR/14a, Ash/6, Security CV)', fr: 'Date de Mariage (si Marié — MR/14a, Ash/6, CV)', es: 'Fecha de Matrimonio (si es Casado — MR/14a, Ash/6, CV)', de: 'Heiratsdatum (falls verheiratet — MR/14a, Asch/6, CV)', he: 'תאריך נישואין (לנשואים — מר/14א, אש/6, קורות חיים)', ru: 'Дата брака (если в браке — МР/14а, Аш/6, Анкета безопасности)' } },
    pf_marriage_place_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Place / Country of Marriage (MR/14a & Ash/6)', fr: 'Lieu / Pays de Mariage (MR/14a & Ash/6)', es: 'Lugar / País de Matrimonio (MR/14a y Ash/6)', de: 'Heiratsort / -land (MR/14a & Asch/6)', he: 'מקום / מדינת הנישואין (מר/14א ואש/6)', ru: 'Место / страна заключения брака (МР/14а и Аш/6)' } },
    pf_ash6_minor_consent_reason: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/6 Page 4: Reason if Other Parent Does Not Sign Minor Child Consent', fr: 'Ash/6 Page 4 : Motif si l\'autre parent ne signe pas pour l\'enfant mineur', es: 'Ash/6 Pág. 4: Motivo si el otro progenitor no firma por el menor', de: 'Asch/6 Seite 4: Grund, falls der andere Elternteil nicht unterschreibt', he: 'אש/6 עמ׳ 4: סיבה לאי-חתימת ההורה הנוסף לקטין (אם רלוונטי)', ru: 'Аш/6 стр. 4: Причина отсутствия подписи второго родителя несовершеннолетнего' } },
    pf_ash6_decl_exception_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/6 Page 4: Exceptions to Clean-Record Declaration (or "ללא הסתייגויות")', fr: 'Ash/6 Page 4 : Réserves éventuelles à la déclaration (ou « ללא הסתייגויות »)', es: 'Ash/6 Pág. 4: Excepciones a la declaración jurada (o «ללא הסתייגויות»)', de: 'Asch/6 Seite 4: Ausnahmen zur Erklärung (oder „ללא הסתייגויות“)', he: 'אש/6 עמ׳ 4: פירוט הסתייגויות להצהרה (או "ללא הסתייגויות")', ru: 'Аш/6 стр. 4: Исключения к декларации (или «ללא הסתייגויות»)' } },
    pf_ll_children_count: { req: 0, script: 'any',
      l: { en: 'Ash/6 Page 6 Landlord Affidavit: Number of Landlord\'s Children', fr: 'Ash/6 Page 6 Affidavit Propriétaire : Nombre d\'enfants du propriétaire', es: 'Ash/6 Pág. 6 Declaración Propietario: N.º de hijos del propietario', de: 'Asch/6 Seite 6 Vermieter-Affidavit: Anzahl der Kinder des Vermieters', he: 'אש/6 עמ׳ 6 (תצהיר משכיר): מספר ילדים של המשכיר', ru: 'Аш/6 стр. 6 (Декларация арендодателя): Количество детей арендодателя' } },
    pf_ll_occupation: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/6 Page 6 Landlord Affidavit: Landlord\'s Occupation', fr: 'Ash/6 Page 6 Affidavit Propriétaire : Profession du propriétaire', es: 'Ash/6 Pág. 6 Declaración Propietario: Profesión del propietario', de: 'Asch/6 Seite 6 Vermieter-Affidavit: Beruf des Vermieters', he: 'אש/6 עמ׳ 6 (תצהיר משכיר): עיסוקו של המשכיר', ru: 'Аш/6 стр. 6 (Декларация арендодателя): Профессия арендодателя' } },
    pf_mail_recipient_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/456 Page 1: Mailing Recipient Name in Israel (if different from residential address)', fr: 'Ash/456 Page 1 : Destinataire du courrier en Israël (si différent)', es: 'Ash/456 Pág. 1: Destinatario de correo en Israel (si es distinto)', de: 'Asch/456 Seite 1: Postempfänger in Israel (falls abweichend)', he: 'אש/456 עמ׳ 1: שם מקבל הדואר בישראל (אם שונה מכתובת המגורים)', ru: 'Аш/456 стр. 1: Имя получателя почты в Израиле (если отличается от адреса)' } },
    pf_mail_street_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/456 Page 1: Mailing Street & House # in Israel', fr: 'Ash/456 Page 1 : Rue & N° pour le courrier', es: 'Ash/456 Pág. 1: Calle y N.º para correo', de: 'Asch/456 Seite 1: Postanschrift Straße & Hausnr.', he: 'אש/456 עמ׳ 1: רחוב ומס׳ בית למשלוח דואר', ru: 'Аш/456 стр. 1: Улица и дом для почты' } },
    pf_mail_city_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/456 Page 1: Mailing City & Zip in Israel', fr: 'Ash/456 Page 1 : Ville & Code Postal pour le courrier', es: 'Ash/456 Pág. 1: Ciudad y Código Postal para correo', de: 'Asch/456 Seite 1: Postanschrift Ort & PLZ', he: 'אש/456 עמ׳ 1: יישוב ומיקוד למשלוח דואר', ru: 'Аш/456 стр. 1: Город и индекс для почты' } },
    pf_mail_proxy_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/456 Page 1: Authorized Representative / Proxy Name', fr: 'Ash/456 Page 1 : Nom du Mandataire / Représentant Autorisé', es: 'Ash/456 Pág. 1: Nombre del Apoderado / Representante', de: 'Asch/456 Seite 1: Bevollmächtigter / Vertreter', he: 'אש/456 עמ׳ 1: שם מיופה כוח לקבלת דואר (אם קיים)', ru: 'Аш/456 стр. 1: Имя доверенного лица' } },
    pf_prev_pass_num: { req: 0, script: 'latin',
      l: { en: 'Ash/1: Previous Passport Number (if held)', fr: 'Ash/1 : Numéro de Passeport Précédent (le cas échéant)', es: 'Ash/1: Número de Pasaporte Anterior (si tuvo)', de: 'Asch/1: Frühere Reisepassnummer (falls vorhanden)', he: 'אש/1: מספר דרכון קודם (אם היה)', ru: 'Аш/1: Номер предыдущего загранпаспорта (если был)' } },
    pf_prev_il_id: { req: 0, script: 'any',
      l: { en: 'Ash/1: Previous Israeli ID / Visa Number (if ever held)', fr: 'Ash/1 : Ancien N° d\'Identité / Visa Israélien (le cas échéant)', es: 'Ash/1: N.º de Identidad / Visa Israelí Previo (si tuvo)', de: 'Asch/1: Frühere israelische ID- / Visumnummer (falls vorhanden)', he: 'אש/1: מספר זהות / אשרה קודם בישראל (אם היה)', ru: 'Аш/1: Прежний израильский номер удостоверения / визы (если был)' } },
    pf_parallel_req_details: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/1: Parallel Application Details in Israel or Abroad', fr: 'Ash/1 : Détails d\'une Demande Parallèle', es: 'Ash/1: Detalles de Solicitud Paralela', de: 'Asch/1: Details zu einem Parallelantrag', he: 'אש/1: פירוט בקשה מקבילה שהוגשה בארץ או בחו"ל (אם קיימת)', ru: 'Аш/1: Подробности параллельного заявления' } },
    pf_prev_rejected_details: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/1: Prior Entry Denial / Deportation Details', fr: 'Ash/1 : Détails d\'un Refus d\'Entrée / Expulsion Antérieur', es: 'Ash/1: Detalles de Rechazo de Entrada / Deportación Previa', de: 'Asch/1: Details zu früherer Einreiseverweigerung / Ausweisung', he: 'אש/1: פירוט סירוב כניסה או הרחקה מישראל בעבר (אם היה)', ru: 'Аш/1: Подробности прошлых отказов во въезде / депортации' } },
    pf_status_cancelled_reason: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/1: Reason if Israeli Status Was Ever Cancelled', fr: 'Ash/1 : Motif si un Statut Israélien a été Annulé', es: 'Ash/1: Motivo si su Estatus Israelí Fue Cancelado', de: 'Asch/1: Grund, falls ein israelischer Status widerrufen wurde', he: 'אש/1: סיבת ביטול מעמד בישראל בעבר (אם רלוונטי)', ru: 'Аш/1: Причина отмены статуса в Израиле в прошлом' } },
    pf_company_name_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Ash/1: Inviting Organization / Institution / Company Name in Israel', fr: 'Ash/1 : Nom de l\'Institution / Organisation Invitante en Israël', es: 'Ash/1: Nombre de la Institución / Organización Invitante en Israel', de: 'Asch/1: Name der einladenden Institution / Organisation in Israel', he: 'אש/1: שם תאגיד / מוסד מזמין בישראל (אם רלוונטי)', ru: 'Аш/1: Название приглашающей организации / учреждения в Израиле' } }
  };

  Object.keys(GRANULAR_1TO1_FIELDS).forEach(function(fid) {
    F[fid] = GRANULAR_1TO1_FIELDS[fid];
  });

  // Append granular fields to each form's field list (preserving existing order + adding 1:1 fields)
  var FORM_EXTRA_FIELDS = {
    ash3: [
      'pf_tz', 'pf_ash3_months', 'pf_laissez_passer', 'pf_phone_abroad', 'pf_sp_citizenship_he'
    ],
    ash6: [
      'pf_tz', 'pf_req_num', 'pf_marriage_date', 'pf_marriage_place_he',
      'pf_sp_entry_date', 'pf_sp_status_date', 'pf_sp_phone_home', 'pf_phone_abroad',
      'pf_ash6_minor_consent_reason', 'pf_ash6_decl_exception_he',
      'pf_ll_children_count', 'pf_ll_occupation'
    ],
    nespach_alef: [
      'pf_tz', 'pf_req_num'
    ],
    ash456: [
      'pf_tz', 'pf_visa_num', 'pf_occupation_he', 'pf_edu_years',
      'pf_sp_surname_en', 'pf_sp_given_en', 'pf_sp_citizenship_he', 'pf_sp_pass_exp',
      'pf_mail_proxy_he',
      'pf_father_tz', 'pf_mother_tz', 'pf_marriage_date', 'pf_marriage_place_he', 'pf_citizenship_code'
    ],
    ash1: [
      'pf_occupation_he', 'pf_phone_abroad', 'pf_company_name_he',
      'pf_sp_birth_country_he', 'pf_sp_prior_he',
      'pf_prev_pass_num', 'pf_prev_il_id', 'pf_parallel_req_details', 'pf_prev_rejected_details', 'pf_status_cancelled_reason',
      'pf_children_table'
    ],
    sec_cv: [
      'pf_tz', 'pf_prior_names', 'pf_marital', 'pf_marriage_date', 'pf_sp_name_he', 'pf_sp_dob',
      'pf_father_he', 'pf_mother_he', 'pf_occupation_he', 'pf_edu_years', 'pf_email'
    ]
  };

  Object.keys(FORM_EXTRA_FIELDS).forEach(function(fk) {
    if (!FORMS[fk]) return;
    var tailCheckboxes = ['pf_rel_story', 'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'];
    var baseList = FORMS[fk].fields.filter(function(x) { return tailCheckboxes.indexOf(x) === -1; });
    var tailList = FORMS[fk].fields.filter(function(x) { return tailCheckboxes.indexOf(x) !== -1; });
    FORM_EXTRA_FIELDS[fk].forEach(function(nf) {
      if (baseList.indexOf(nf) === -1 && tailList.indexOf(nf) === -1) baseList.push(nf);
    });
    FORMS[fk].fields = baseList.concat(tailList);
  });

  // Also add standalone MR/14a and MR/14b form tabs so users can fill/print them individually if needed
  FORMS.mr14a = {
    code: 'טופס מר/14 א׳', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/mr14a_registry.pdf',
    t: {
      en: 'טופס מר/14 א׳ (MR/14a — 1p): First Teudat Zehut Population Registry Questionnaire',
      fr: 'טופס מר/14 א׳ (MR/14a — 1p) : Questionnaire d\'Inscription 1ère Teudat Zehut',
      es: 'טופס מר/14 א׳ (MR/14a — 1p): Cuestionario de Registro para 1ª Teudat Zehut',
      de: 'טופס מר/14 א׳ (MR/14a — 1S): Melderegister-Fragebogen für Erste Teudat Zehut',
      he: 'טופס מר/14 א׳ (1 עמ׳): שאלון רישום למרשם האוכלוסין ותעודת זהות ראשונה',
      ru: 'טופס מר/14 א׳ (МР/14а — 1 стр.): Анкета регистрации в реестре населения для первого Теудат Зеут'
    },
    fields: [
      'pf_tz', 'pf_req_num', 'pf_visa_num',
      'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en', 'pf_prior_names',
      'pf_father_he', 'pf_father_tz', 'pf_mother_he', 'pf_mother_tz', 'pf_foreign_grandfather',
      'pf_dob', 'pf_hebrew_dob', 'pf_gender', 'pf_marital', 'pf_marriage_date', 'pf_marriage_place_he',
      'pf_birth_country', 'pf_citizenship', 'pf_citizenship_code', 'pf_religion_nat',
      'pf_occupation_he', 'pf_edu_years', 'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date',
      'pf_entry_date_port', 'pf_il_addr_he', 'pf_phone_il', 'pf_email', 'pf_456_shvut',
      'pf_decl_clean_record'
    ]
  };

  FORMS.mr14b = {
    code: 'טופס מר/14 ב׳', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/mr14b_registry_notice.pdf',
    t: {
      en: 'טופס מר/14 ב׳ (MR/14b — 1p): Foreign Citizenship & Passport Declaration',
      fr: 'טופס מר/14 ב׳ (MR/14b — 1p) : Déclaration de Nationalité & Passeport Étrangers',
      es: 'טופס מר/14 ב׳ (MR/14b — 1p): Declaración de Ciudadanía y Pasaporte Extranjeros',
      de: 'טופס מר/14 ב׳ (MR/14b — 1S): Erklärung über Ausländische Staatsbürgerschaft & Reisepass',
      he: 'טופס מר/14 ב׳ (1 עמ׳): הודעה על אזרחות זרה ודרכון זר',
      ru: 'טופס מר/14 ב׳ (МР/14б — 1 стр.): Уведомление об иностранном гражданстве и паспорте'
    },
    fields: [
      'pf_tz', 'pf_req_num', 'pf_surname_he', 'pf_given_he',
      'pf_citizenship', 'pf_pass_num', 'pf_pass_exp_date', 'pf_decl_clean_record'
    ]
  };

  window.GAT_FORMS_META = { F: F, FORMS: FORMS, UI: UI };

  function lang() {
    var candidates = [
      typeof window.getUnifiedGatLang === 'function' ? window.getUnifiedGatLang() : '',
      localStorage.getItem('gat_lang'),
      localStorage.getItem('giyur_lang'),
      localStorage.getItem('selectedLang'),
      window.gatLang,
      window.appLang,
      (document.getElementById('globe-lang-lbl') && document.getElementById('globe-lang-lbl').textContent) || '',
      document.documentElement.lang
    ];
    for (var i = 0; i < candidates.length; i++) {
      var c = String(candidates[i] || '').toLowerCase().trim().slice(0, 2);
      if (['en', 'he', 'fr', 'es', 'de', 'ru'].indexOf(c) !== -1) return c;
    }
    return 'en';
  }
  function ui() { return UI[lang()] || UI.en; }
  function tr(obj) { var l = lang(); return (obj && (obj[l] || obj.en)) || ''; }
  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Automatically inflects Hebrew citizenship/nationality adjectives when Gender switches between Male (זכר) and Female (נקבה)
  var HEBREW_GENDER_PAIRS = [
    ['ישראלית', 'ישראלי'],
    ['אמריקאית', 'אמריקאי'],
    ['צרפתייה', 'צרפתי'],
    ['צרפתית', 'צרפתי'],
    ['בריטית', 'בריטי'],
    ['אנגלייה', 'אנגלי'],
    ['רוסייה', 'רוסי'],
    ['אוקראינית', 'אוקראיני'],
    ['קנדית', 'קנדי'],
    ['גרמנייה', 'גרמני'],
    ['גרמנית', 'גרמני'],
    ['ספרדייה', 'ספרדי'],
    ['ספרדית', 'ספרדי'],
    ['איטלקייה', 'איטלקי'],
    ['ארגנטינאית', 'ארגנטינאי'],
    ['ברזילאית', 'ברזילאי'],
    ['אוסטרלית', 'אוסטרלי'],
    ['דרום אפריקאית', 'דרום אפריקאי'],
    ['הולנדית', 'הולנדי'],
    ['בלגית', 'בלגי'],
    ['שווייצרית', 'שווייצרי'],
    ['מקסיקנית', 'מקסיקני'],
    ['קולומביאנית', 'קולומביאני'],
    ['יהודייה', 'יהודי'],
    ['גיורת', 'גר']
  ];

  window.inflectHebrewTextForGender = function(str, genderVal) {
    if (!str) return str;
    var isMale = /זכר|male/i.test(String(genderVal || '')) && !/נקבה|female/i.test(String(genderVal || ''));
    var out = String(str);
    HEBREW_GENDER_PAIRS.forEach(function(pair) {
      var fem = pair[0], masc = pair[1];
      if (isMale) {
        out = out.replace(new RegExp(fem, 'g'), masc);
      } else {
        out = out.replace(new RegExp(masc + '(?![א-ת])', 'g'), fem);
      }
    });
    return out;
  };

  window.applyGenderInflectionToState = function(stateObj) {
    var s = stateObj || window.gatFormsState || {};
    var g = s.pf_gender || 'נקבה';
    var changed = false;
    ['pf_citizenship', 'pf_citizenship_en', 'pf_religion_nat', 'pf_religion_en', 'pf_nationality_en'].forEach(function(k) {
      if (s[k]) {
        var inflected = window.inflectHebrewTextForGender(s[k], g);
        if (inflected !== s[k]) {
          s[k] = inflected;
          changed = true;
        }
      }
    });
    return changed;
  };

  function norm(x) {
    var str = String(x || '');
    if (str.normalize) str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return str.toLowerCase().replace(/[^a-z0-9\u0590-\u05ff]/g, '');
  }
  function loadDraft() { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function loadScans() { try { return JSON.parse(localStorage.getItem(SCANNED_KEY) || '[]') || []; } catch (e) { return []; } }

  window.gatFormsState = loadDraft();


  var PRE_HEB_BACKUP_KEY = 'gat_pre_hebrew_backup_v1';
  var FORM_INTRO_SEEN_KEY = 'gat_form_intro_seen_v1';

  var FORM_GUIDE_I18N = {
    "en": {
        "title": "✍️ How to Fill Out This Form (Zero Hebrew Required!)",
        "p1Title": "1. Fields Marked [PASSPORT LATIN (A–Z)]:",
        "p1Body": "Must be typed in exact English/Latin letters matching the machine-readable zone of your passport letter-for-letter.",
        "p2Title": "2. All Other Fields — Write in Your Own Language!",
        "p2Body": "Type naturally in English (or your native language). You do NOT need to write in Hebrew!",
        "p3Title": "3. Automatic Clerk-Hebrew Conversion + 1-Tap Undo (↺):",
        "p3Body": "When you tap \"Stamp & Print Official Hebrew Packet (PDF)\" at the bottom, our system automatically translates all your answers into official Misrad HaPanim Clerk Hebrew—or tap \"Convert My Answers → Clerk Hebrew (AI)\" at the top to translate them on the spot. Want to edit your original English text after converting? Just tap the ↺ Undo button to switch right back!",
        "btnOk": "Got It — Start Filling Form →",
        "undoBtn": "↺ Undo Hebrew (Restore My Original Text)",
        "restoredMsg": "↺ Restored your original pre-Hebrew text!"
    },
    "fr": {
        "title": "✍️ Comment remplir ce formulaire (Aucun hébreu requis !)",
        "p1Title": "1. Champs marqués [LATIN PASSEPORT (A–Z)] :",
        "p1Body": "Doivent être saisis exactement en lettres latines comme sur la zone lisible par machine de votre passeport.",
        "p2Title": "2. Tous les autres champs — Écrivez en français !",
        "p2Body": "Remplissez tous les autres champs dans votre propre langue. Vous n’avez PAS besoin d’écrire en hébreu !",
        "p3Title": "3. Conversion automatique en hébreu + Annuler (↺) :",
        "p3Body": "Lorsque vous cliquez sur « Générer le Dossier Officiel en Hébreu (PDF) », tout est automatiquement traduit en hébreu administratif—ou cliquez sur « Traduire Mes Réponses → Hébreu (Auto-Scan) » pour traduire immédiatement. Un bouton ↺ Annuler apparaîtra si vous souhaitez revenir à votre texte français d’origine !",
        "btnOk": "Compris — Commencer à remplir →",
        "undoBtn": "↺ Annuler l’hébreu (Restaurer mon texte original)",
        "restoredMsg": "↺ Votre texte original a été restauré !"
    },
    "es": {
        "title": "✍️ Cómo completar este formulario (¡No necesita saber hebreo!)",
        "p1Title": "1. Campos marcados con [LATÍN PASAPORTE (A–Z)]:",
        "p1Body": "Deben escribirse exactamente en letras latinas tal como aparecen en su pasaporte letra por letra.",
        "p2Title": "2. Todos los demás campos — ¡Escriba en su idioma!",
        "p2Body": "Complete el resto del formulario en español. ¡NO necesita escribir en hebreo!",
        "p3Title": "3. Conversión automática al hebreo + Deshacer (↺):",
        "p3Body": "Al pulsar «Generar Paquete Oficial en Hebreo (PDF)», el sistema traduce automáticamente todo al hebreo oficial de Misrad HaPanim—o pulse «Convertir Mis Respuestas → Hebreo Oficial (Auto-Scan)» para traducirlo al instante. ¡Después de convertir, aparecerá el botón ↺ Deshacer para volver a su texto original cuando quiera!",
        "btnOk": "Entendido — Empezar a completar →",
        "undoBtn": "↺ Deshacer hebreo (Restaurar mi texto original)",
        "restoredMsg": "↺ ¡Texto original restaurado!"
    },
    "de": {
        "title": "✍️ So füllen Sie dieses Formular aus (Kein Hebräisch nötig!)",
        "p1Title": "1. Felder mit [PASS-LATEIN (A–Z)]:",
        "p1Body": "Müssen exakt in lateinischen Buchstaben wie in der maschinenlesbaren Zone Ihres Reisepasses eingegeben werden.",
        "p2Title": "2. Alle anderen Felder — Schreiben Sie auf Deutsch!",
        "p2Body": "Füllen Sie alle übrigen Felder ganz normal in Ihrer Muttersprache aus. Sie müssen NICHT auf Hebräisch schreiben!",
        "p3Title": "3. Automatische Hebräisch-Übersetzung + Rückgängig (↺):",
        "p3Body": "Beim Klick auf „Offizielles Hebräisches Paket Erstellen (PDF)“ wird alles automatisch in Behörden-Hebräisch übersetzt—oder klicken Sie oben auf „Meine Antworten → Behörden-Hebräisch Übersetzen (KI)“ für eine sofortige Umwandlung. Mit dem ↺ Rückgängig-Button kehren Sie jederzeit zu Ihrem Originaltext zurück!",
        "btnOk": "Verstanden — Jetzt ausfüllen →",
        "undoBtn": "↺ Hebräisch rückgängig (Originaltext wiederherstellen)",
        "restoredMsg": "↺ Originaltext wiederhergestellt!"
    },
    "ru": {
        "title": "✍️ Как заполнять эту анкету (Иврит знать не нужно!)",
        "p1Title": "1. Поля с пометкой [ЛАТИНИЦА ПАСПОРТА (A–Z)]:",
        "p1Body": "Заполняются строго латинскими буквами (A–Z) буква в букву как в вашем загранпаспорте.",
        "p2Title": "2. Все остальные поля — пишите на русском языке!",
        "p2Body": "Заполняйте все остальные поля на русском (или вашем родном) языке. Писать на иврите НЕ нужно!",
        "p3Title": "3. Авто-перевод на иврит + Кнопка возврата (↺):",
        "p3Body": "При нажатии «Создать Официальный Пакет на Иврите (PDF)» система автоматически переведёт все ответы на официальный иврит МВД—или нажмите «Перевести Мои Ответы → Официальный Иврит (ИИ)» для мгновенного перевода прямо в полях. После перевода появится кнопка ↺ Вернуть, чтобы в один клик восстановить ваш исходный текст!",
        "btnOk": "Понятно — Начать заполнение →",
        "undoBtn": "↺ Отменить иврит (Вернуть исходный текст)",
        "restoredMsg": "↺ Ваш исходный текст восстановлен!"
    },
    "he": {
        "title": "✍️ הנחיות למילוי הטופס (ניתן למלא בכל שפה!)",
        "p1Title": "1. שדות המסומנים ב-[אותיות לטיניות (כמו בדרכון)]:",
        "p1Body": "חובה להקליד באותיות לטיניות (A–Z) בדיוק כפי שמופיע בדרכון הזר.",
        "p2Title": "2. כל שאר השדות — ניתן להקליד בעברית או בשפת האם שלכם!",
        "p2Body": "אם נח לכם יותר להקליד באנגלית, צרפתית, ספרדית, גרמנית או רוסית — כתבו בשפתכם החופשית.",
        "p3Title": "3. המרה אוטומטית לעברית תקנית + כפתור ביטול (↺):",
        "p3Body": "בעת לחיצה על הפקת ה-PDF (או על כפתור התרגום לעברית), המערכת תמיר הכל לעברית תקנית של משרד הפנים. לאחר התרגום יופיע כפתור ↺ שיאפשר לכם לחזור לטקסט המקורי בלחיצה אחת!",
        "btnOk": "הבנתי — המשך למילוי הטופס ←",
        "undoBtn": "↺ ביטול תרגום (שחזור הטקסט המקורי שלי)",
        "restoredMsg": "↺ הטקסט המקורי שוחזר בהצלחה!"
    }
};


  var TRANSLATE_OVERLAY_I18N = {
    en: {
      spinTitle: 'Translating Your Form to Hebrew...',
      spinSub: 'Converting your answers into official Misrad HaPanim Clerk Hebrew. Please wait a few seconds and do not refresh the page.',
      doneToast: '✅ All fields translated to Hebrew! (Tap ↺ Undo anytime to revert)',
      errTitle: '⏳ Translation Server Is Busy',
      errBody: 'The AI translation server took too long or is temporarily busy. Your answers are 100% saved—please wait a moment and try again.',
      errRetry: '🔄 Try Again Now',
      errClose: 'Close'
    },
    fr: {
      spinTitle: 'Traduction en hébreu en cours...',
      spinSub: 'Conversion de vos réponses en hébreu administratif officiel. Veuillez patienter quelques secondes sans rafraîchir la page.',
      doneToast: '✅ Traduit en hébreu ! (Cliquez sur ↺ Annuler pour revenir)',
      errTitle: '⏳ Serveur de traduction occupé',
      errBody: 'Le serveur est momentanément occupé ou la connexion a expiré. Vos réponses sont sauvegardées — veuillez réessayer dans un instant.',
      errRetry: '🔄 Réessayer maintenant',
      errClose: 'Fermer'
    },
    es: {
      spinTitle: 'Traduciendo su formulario al hebreo...',
      spinSub: 'Convirtiendo sus respuestas al hebreo oficial de Misrad HaPanim. Espere unos segundos y no recargue la página.',
      doneToast: '✅ ¡Traducido al hebreo! (Pulse ↺ Deshacer cuando quiera)',
      errTitle: '⏳ El servidor de traducción está ocupado',
      errBody: 'El servidor tardó demasiado o está temporalmente ocupado. Sus respuestas están guardadas — por favor intente de nuevo en un momento.',
      errRetry: '🔄 Intentar de nuevo',
      errClose: 'Cerrar'
    },
    de: {
      spinTitle: 'Übersetzung ins Hebräische läuft...',
      spinSub: 'Ihre Antworten werden in offizielles Behörden-Hebräisch übersetzt. Bitte warten Sie einige Sekunden und laden Sie die Seite nicht neu.',
      doneToast: '✅ Ins Hebräische übersetzt! (Jederzeit mit ↺ Rückgängig umkehrbar)',
      errTitle: '⏳ Übersetzungsserver ist ausgelastet',
      errBody: 'Der Server ist momentan ausgelastet oder hat zu lange gebraucht. Ihre Eingaben sind gespeichert — bitte versuchen Sie es gleich noch einmal.',
      errRetry: '🔄 Jetzt erneut versuchen',
      errClose: 'Schließen'
    },
    ru: {
      spinTitle: 'Переводим анкету на иврит...',
      spinSub: 'Конвертируем ваши ответы на официальный иврит МВД. Пожалуйста, подождите несколько секунд и не обновляйте страницу.',
      doneToast: '✅ Переведено на иврит! (Кнопка ↺ вернёт исходный текст)',
      errTitle: '⏳ Сервер перевода сейчас перегружен',
      errBody: 'Сервер временно занят или превышено время ожидания. Ваши данные сохранены — пожалуйста, попробуйте ещё раз через несколько секунд.',
      errRetry: '🔄 Попробовать снова',
      errClose: 'Закрыть'
    },
    he: {
      spinTitle: 'מתרגם את הטופס לעברית תקנית...',
      spinSub: 'ממיר את התשובות לעברית תקנית של משרד הפנים. אנא המתינו מספר שניות ואל תרעננו את העמוד.',
      doneToast: '✅ כל השדות תורגמו לעברית! (ניתן ללחוץ על ↺ לביטול)',
      errTitle: '⏳ שרת התרגום עמוס כעת',
      errBody: 'השרת עמוס זמנית או שהבקשה ארכה זמן רב מדי. הנתונים שלכם שמורים — אנא נסו שוב בעוד מספר שניות.',
      errRetry: '🔄 נסה שוב כעת',
      errClose: 'סגור'
    }
  };

  window.showGatTranslateSpinner = function() {
    var old = document.getElementById('gat-translate-spinner-overlay');
    if (old) old.remove();
    if (!document.getElementById('gat-spin-keyframes')) {
      var st = document.createElement('style');
      st.id = 'gat-spin-keyframes';
      st.textContent = '@keyframes gatSpin360 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(st);
    }
    var l = lang();
    var t = TRANSLATE_OVERLAY_I18N[l] || TRANSLATE_OVERLAY_I18N.en;
    var ov = document.createElement('div');
    ov.id = 'gat-translate-spinner-overlay';
    ov.dir = (l === 'he') ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,0.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;cursor:wait;';
    ov.innerHTML =
      '<div style="background:#ffffff;border:3px solid #0284c7;border-radius:18px;max-width:420px;width:100%;padding:28px 24px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.45);color:#0f172a;">' +
        '<div style="width:54px;height:54px;margin:0 auto 16px;border:5px solid #e0f2fe;border-top-color:#0284c7;border-radius:50%;animation:gatSpin360 0.85s linear infinite;"></div>' +
        '<h3 style="margin:0 0 8px;font-size:1.12rem;color:#082548;font-weight:900;">' + esc(t.spinTitle) + '</h3>' +
        '<p style="margin:0;font-size:0.86rem;color:#475569;line-height:1.5;font-weight:600;">' + esc(t.spinSub) + '</p>' +
      '</div>';
    document.body.appendChild(ov);
  };

  window.hideGatTranslateSpinner = function() {
    var old = document.getElementById('gat-translate-spinner-overlay');
    if (old) old.remove();
  };

  window.showGatTranslateErrorModal = function(detailMsg) {
    window.hideGatTranslateSpinner();
    var old = document.getElementById('gat-translate-err-modal');
    if (old) old.remove();
    var l = lang();
    var t = TRANSLATE_OVERLAY_I18N[l] || TRANSLATE_OVERLAY_I18N.en;
    var ov = document.createElement('div');
    ov.id = 'gat-translate-err-modal';
    ov.dir = (l === 'he') ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;z-index:1000001;background:rgba(15,23,42,0.75);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;';
    ov.innerHTML =
      '<div style="background:#ffffff;border:3px solid #dc2626;border-radius:18px;max-width:440px;width:100%;padding:24px;text-align:center;box-shadow:0 25px 50px rgba(0,0,0,0.45);color:#0f172a;">' +
        '<h3 style="margin:0 0 10px;font-size:1.12rem;color:#b91c1c;font-weight:900;">' + esc(t.errTitle) + '</h3>' +
        '<p style="margin:0 0 16px;font-size:0.86rem;color:#334155;line-height:1.5;font-weight:600;">' + esc(t.errBody) + '</p>' +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
          '<button type="button" id="gat-tr-retry-btn" style="flex:1;min-width:150px;background:#0284c7;color:#fff;border:none;border-radius:10px;padding:11px 16px;font-size:0.88rem;font-weight:900;cursor:pointer;">' + esc(t.errRetry) + '</button>' +
          '<button type="button" id="gat-tr-close-btn" style="background:#e2e8f0;color:#1e293b;border:none;border-radius:10px;padding:11px 16px;font-size:0.88rem;font-weight:800;cursor:pointer;">' + esc(t.errClose) + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    var rBtn = document.getElementById('gat-tr-retry-btn');
    var cBtn = document.getElementById('gat-tr-close-btn');
    if (rBtn) rBtn.onclick = function() { ov.remove(); window.convertFormAnswersToClerkHebrew(false); };
    if (cBtn) cBtn.onclick = function() { ov.remove(); };
    ov.onclick = function(e) { if (e.target === ov) ov.remove(); };
  };

  window.hasPreHebrewBackup = function() {
    try {
      var b = JSON.parse(localStorage.getItem(PRE_HEB_BACKUP_KEY) || '{}') || {};
      return Object.keys(b).length > 0;
    } catch (e) { return false; }
  };

  window.savePreHebrewBackup = function(fieldsMap) {
    try {
      var existing = JSON.parse(localStorage.getItem(PRE_HEB_BACKUP_KEY) || '{}') || {};
      Object.keys(fieldsMap || {}).forEach(function(k) {
        if (fieldsMap[k]) existing[k] = fieldsMap[k];
      });
      localStorage.setItem(PRE_HEB_BACKUP_KEY, JSON.stringify(existing));
    } catch (e) {}
  };

  window.undoClerkHebrewConversion = function() {
    try {
      var b = JSON.parse(localStorage.getItem(PRE_HEB_BACKUP_KEY) || '{}') || {};
      var keys = Object.keys(b);
      if (!keys.length) return;
      var d = loadDraft();
      keys.forEach(function(fid) {
        window.gatFormsState[fid] = b[fid];
        d[fid] = b[fid];
      });
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
      localStorage.removeItem(PRE_HEB_BACKUP_KEY);
      window.mountUnifiedPibaFormsEngine();
      if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
      var g = FORM_GUIDE_I18N[lang()] || FORM_GUIDE_I18N.en;
      if (window.showDraftSavedBadge) window.showDraftSavedBadge(g.restoredMsg, false);
    } catch (e) {}
  };


  var DOC_ONBOARD_SEEN_KEY = 'gat_doc_onboard_seen_v4';
  var DOC_ONBOARD_I18N = {
    "en": {
        "badge": "⚡ SPOK • 2-PARTY FORM ASSISTANT",
        "titleAllMissing": "Stop Drowning in Paperwork on {form}: Let Spok Auto-Fill & Audit Your File in Seconds!",
        "titleSomeMissing": "Complete Your {form} Dossier! You Still Need to Upload: {missingList}",
        "lead": "Filling out Misrad HaPanim forms manually is overwhelming—and a single typo, wrong date format, or document flaw can get your file rejected at the clerk's window. Uploading your documents here saves you hours and protects your application:",
        "whoLabel": "👤 1. Whose Document Is This? (Step 1 = Foreign Visa/Aliyah Applicant • Step 3 = Israeli Spouse/Sponsor):",
        "forMe": "🌍 Foreign Visa / Aliyah Applicant (Step 1)",
        "forPartner": "🇮🇱 Israeli Citizen Spouse / Sponsor (Step 3)",
        "alreadyHaveLabel": "✅ Uploaded so far:",
        "stillNeedLabel": "📌 2. Upload Documents for Selected Person:",
        "sharedMarriageLabel": "💍 3. Shared Couple Document (One Upload Only):",
        "docName_my_passport": "My Foreign Passport",
        "docName_my_tz": "My Israeli TZ + Sefach",
        "docName_my_birth": "My Birth Certificate",
        "docName_partner_tz": "Partner's Israeli TZ + Sefach",
        "docName_partner_passport": "Partner's Foreign Passport",
        "docName_partner_birth": "Partner's Birth Certificate",
        "docName_marriage": "Marriage Certificate",
        "btn_passport_me": "🛂 Upload MY Foreign Passport (Auto-Fill My Latin & Check Expiry)",
        "btn_passport_partner": "🛂 Upload PARTNER'S Foreign Passport (Auto-Fill Partner's Details)",
        "btn_tz_me": "🪪 Upload MY Israeli TZ + Sefach (Auto-Fill My ID & Address)",
        "btn_tz_partner": "🪪 Upload PARTNER'S Israeli TZ + Sefach (Auto-Fill Spouse/Inviter ID & Address)",
        "btn_birth_me": "📜 Upload MY Birth Certificate (Auto-Fill My Parents & Check Long-Form)",
        "btn_birth_partner": "📜 Upload PARTNER'S Birth Certificate (Verify Partner's Long-Form & Details)",
        "btn_marriage": "💍 Upload Marriage Certificate (1 Shared Upload — Auto-Fill Date, Place & Spouse)",
        "allDoneForForm": "🎉 All recommended documents for {form} are uploaded and auto-filled!",
        "skipReminder": "💡 If you skip for now, you can re-open this uploader anytime using the blue \"📸 Scan Document → Auto-Fill\" button at the top-right of the form (or in Card #2 above)!",
        "btnSkip": "Skip for Now — I'll Type Manually →",
        "scanning": "🔍 Scanning document, auto-filling fields & running forensic PIBA validation...",
        "passOk": "✅ Foreign Passport Validated & Auto-Filled ({who})!",
        "passExpErr": "🚨 CRITICAL TRAP ({who}): This passport expires in {m} months ({exp})! Misrad HaPanim requires at least {reqM} months validity. Action Required: Renew the passport immediately before your clerk appointment.",
        "passGuide": "📖 Read Our Passport Validity & Emergency Renewal Guide →",
        "tzWrongFormErr": "🚨 WRONG ID TYPE FOR {form} (Primary Applicant): You uploaded an Israeli TZ ({tz}) for 'Me (Applicant)', but on {form} the Primary Applicant must use a FOREIGN PASSPORT! Tip: If this TZ belongs to your Israeli Spouse/Inviter, tick '☑️ For My Partner / Spouse' above and upload it again!",
        "tzOk": "✅ Israeli TZ + Sefach ({tz}) Validated & Auto-Filled ({role})!",
        "tzExpErr": "🚨 CRITICAL TRAP — EXPIRED ISRAELI TZ ({role}): Biometric TZ ({tz}) expired on {exp}! (We still auto-filled the details & Sefach address: {addr}). Misrad HaPanim requires a valid, unexpired TZ. Action Required: Renew the biometric TZ before submitting your file.",
        "roleSpouse": "Partner / Spouse / Inviter + Shared Address",
        "roleApplicant": "Primary Applicant + Sefach Address",
        "birthOk": "✅ Full Long-Form Birth Certificate Validated & Auto-Filled ({who})!",
        "birthHalfErr": "🚨 CRITICAL TRAP ({who}): Half / Short-Form Birth Certificate Detected! Both parents' full names do not appear clearly on this certificate. Misrad HaPanim strictly rejects short-form certificates. Action Required: Order a Long-Form Birth Certificate listing both Father and Mother + Apostille.",
        "marriageOk": "✅ Marriage Certificate Validated! Marriage Date, Place, Marital Status & Spouse Details Auto-Filled!",
        "marriageGuide": "📖 Read Our Marriage Certificate Apostille & Translation Guide →",
        "aposWarn": "⚠️ Authentication Stamp Not Detected on This Scan ({country}): If {country} is in the Hague Convention, attach an official Hague Apostille stamp. If {country} is a Non-Hague country, Misrad HaPanim requires 2-Step Consular Chain Legalization (Foreign Ministry + Israeli Embassy/Consulate stamp in {country}).",
        "birthGuide": "📖 Read Our Long-Form Birth Certificate & Apostille Guide →",
        "continueBtn": "✅ Done Uploading — Continue to My Pre-Filled Form →",
        "why1": "⚡ Zero Overwhelm — Write Once, Fill All 8 Forms: Extracts your details from 1 scan and populates every matching Hebrew & Passport-Latin box across all 8 official PIBA forms automatically.",
        "why2": "🎯 Eliminate Human Typing & Translation Mistakes: Prevents transposed ID/passport numbers, wrong DD/MM/YYYY date formats, and non-standard Hebrew phrasings that clerks reject.",
        "why3": "🛡️ Instant Forensic Rejection-Trap Audit: Automatically checks your Passport's 12/24-month validity rule, verifies your Birth Certificate is a Full Long-Form (with both parents' names), checks that your Israeli TZ Sefach is completely unfolded (to auto-list your kids & marital status), and verifies Hague Apostilles or Non-Hague Israeli Embassy Consular Legalization!",
        "b2": "🔍 Run a forensic validation check on your documents (Passport/ID expiration date, Full Long-Form vs. Short-Form Birth Certificate parent check, and Hague Apostille or Non-Hague Israeli Embassy Consular Legalization).",
        "consularWarn": "⚠️ Non-Hague Country Detected ({country}) — Consular Chain Required: Because {country} is not a Hague Apostille country, Misrad HaPanim requires 2-Step Diplomatic Chain Legalization (1. Ministry of Foreign Affairs of {country} + 2. Israeli Embassy/Consulate stamp) on the original certificate!"
    },
    "fr": {
        "badge": "⚡ ASSISTANT INTELLIGENT 2 PARTIES",
        "titleAllMissing": "Ne vous noyez plus dans la paperasse sur {form} : Pré-remplissage et audit IA en quelques secondes !",
        "titleSomeMissing": "Complétez votre dossier {form} ! Document(s) encore requis : {missingList}",
        "lead": "Remplir les formulaires du Misrad HaPanim à la main est épuisant — et une seule faute de frappe, une mauvaise date ou un acte incomplet entraîne un refus immédiat au guichet. Notre moteur intelligent vous protège :",
        "whoLabel": "👤 1. À qui appartient ce document ? (Étape 1 = Demandeur Étranger • Étape 3 = Conjoint/Garant Israélien) :",
        "forMe": "🌍 Demandeur Étranger — Visa / Aliyah (Étape 1)",
        "forPartner": "🇮🇱 Conjoint / Garant Israélien (Étape 3)",
        "alreadyHaveLabel": "✅ Déjà importé :",
        "stillNeedLabel": "📌 2. Importer les documents pour la personne cochée :",
        "sharedMarriageLabel": "💍 3. Document commun du couple (1 seul envoi) :",
        "docName_my_passport": "Mon Passeport Étranger",
        "docName_my_tz": "Ma TZ Israélienne + Sefach",
        "docName_my_birth": "Mon Acte de Naissance",
        "docName_partner_tz": "TZ + Sefach du Conjoint",
        "docName_partner_passport": "Passeport du Conjoint",
        "docName_partner_birth": "Acte de Naissance du Conjoint",
        "docName_marriage": "Acte de Mariage",
        "btn_passport_me": "🛂 Importer MON Passeport Étranger (Pré-remplir & Vérifier Validité)",
        "btn_passport_partner": "🛂 Importer le Passeport Étranger de MON CONJOINT",
        "btn_tz_me": "🪪 Importer MA TZ Israélienne + Sefach (Si déjà détenue)",
        "btn_tz_partner": "🪪 Importer la TZ + Sefach de MON CONJOINT / INVITANT Israélien",
        "btn_birth_me": "📜 Importer MON Acte de Naissance (Vérifier Copie Intégrale & Parents)",
        "btn_birth_partner": "📜 Importer l’Acte de Naissance de MON CONJOINT",
        "btn_marriage": "💍 Importer l’Acte de Mariage (1 seul envoi — Date, Lieu & Conjoint)",
        "allDoneForForm": "🎉 Tous les documents recommandés pour {form} sont importés et pré-remplis !",
        "skipReminder": "💡 Si vous passez cette étape, vous pourrez toujours importer vos documents plus tard via le bouton bleu « 📸 Scanner un Acte → Pré-remplir » en haut à droite du formulaire !",
        "btnSkip": "Passer pour l’instant — Remplir manuellement →",
        "scanning": "🔍 Analyse du document, pré-remplissage des formulaires et contrôle PIBA...",
        "passOk": "✅ Passeport étranger validé et pré-rempli ({who}) !",
        "passExpErr": "🚨 PIÈGE CRITIQUE ({who}) : Ce passeport expire dans {m} mois ({exp}) ! Misrad HaPanim exige au moins {reqM} mois de validité. Renouvelez le passeport immédiatement.",
        "passGuide": "📖 Lire notre guide sur la validité du passeport et le renouvellement →",
        "tzWrongFormErr": "🚨 MAUVAIS DOCUMENT POUR {form} (Demandeur) : Vous avez importé une TZ israélienne ({tz}) « Pour Moi », mais sur {form} le demandeur principal doit utiliser un PASSEPORT ÉTRANGER ! Astuce : Si cette TZ appartient à votre conjoint/invitant israélien, cochez « ☑️ Pour Mon Conjoint » ci-dessus et réimportez-la !",
        "tzOk": "✅ TZ israélienne + Sefach ({tz}) validée et pré-remplie ({role}) !",
        "tzExpErr": "🚨 PIÈGE CRITIQUE — TZ EXPIRÉE ({role}) : La TZ biométrique ({tz}) a expiré le {exp} ! (Coordonnées et adresse Sefach {addr} pré-remplies). Renouvelez la TZ avant le rendez-vous.",
        "roleSpouse": "Conjoint / Invitant Israélien + Adresse",
        "roleApplicant": "Demandeur Principal + Adresse Sefach",
        "birthOk": "✅ Copie intégrale de l’acte de naissance validée ({who}) !",
        "birthHalfErr": "🚨 PIÈGE CRITIQUE ({who}) : Extrait court détecté (sans les noms complets des deux parents) ! Commandez une Copie Intégrale + Apostille.",
        "marriageOk": "✅ Acte de mariage validé ! Date, lieu de mariage, statut matrimonial et conjoint pré-remplis !",
        "marriageGuide": "📖 Lire notre guide Acte de Mariage & Apostille →",
        "aposWarn": "⚠️ Cachet d’authentification non détecté sur ce scan ({country}) : Si {country} est membre de La Haye, apposez l’Apostille. Si {country} est hors Convention de La Haye, Misrad HaPanim exige la légalisation consulaire en 2 étapes (Ministère des Affaires Étrangères + Ambassade/Consulat d’Israël).",
        "birthGuide": "📖 Lire notre guide Copie Intégrale & Apostille →",
        "continueBtn": "✅ Terminé — Continuer vers mon formulaire pré-rempli →",
        "why1": "⚡ Zéro stress — 1 scan remplit les 8 formulaires : Extrait vos données et remplit automatiquement toutes les cases en hébreu officiel et en lettres latines sur les 8 formulaires PIBA.",
        "why2": "🎯 Zéro erreur de saisie ou de traduction : Évite les inversions de chiffres, les erreurs de format de date JJ/MM/AAAA et les mauvaises traductions en hébreu administratif.",
        "why3": "🛡️ Audit forensique anti-rejet immédiat : Vérifie la validité de 12/24 mois du passeport, contrôle que l’acte de naissance est une Copie Intégrale (avec les deux parents), vérifie que le Sefach israélien est entièrement déplié (pour ajouter automatiquement vos enfants) et contrôle l’Apostille de La Haye ou la Légalisation Consulaire (pays hors-La Haye) !",
        "b2": "🔍 Vérifier la validité de vos documents (date d’expiration 12/24 mois, acte de naissance copie intégrale avec filiation, et Apostille de La Haye ou Légalisation Consulaire pour les pays hors-La Haye).",
        "consularWarn": "⚠️ Pays hors Convention de La Haye ({country}) — Légalisation Consulaire requise : Misrad HaPanim exige le tampon du Ministère des Affaires Étrangères de {country} + le tampon du Consulat/Ambassade d’Israël sur l’original !"
    },
    "es": {
        "badge": "⚡ ASISTENTE INTELIGENTE PIBA (2 PARTES)",
        "titleAllMissing": "No se abrume con el papeleo en {form}: ¡Autocompletado y auditoría forense con IA en segundos!",
        "titleSomeMissing": "¡Complete su expediente {form}! Aún falta subir: {missingList}",
        "lead": "Llenar los formularios de Misrad HaPanim a mano es abrumador, y un solo error de tipeo, fecha mal escrita o documento incompleto causa el rechazo inmediato en ventanilla. Subir sus documentos aquí le ahorra horas y blinda su trámite:",
        "whoLabel": "👤 1. ¿De quién es este documento? (Paso 1 = Solicitante Extranjero • Paso 3 = Cónyuge/Garante Israelí):",
        "forMe": "🌍 Solicitante Extranjero — Visa / Aliyá (Paso 1)",
        "forPartner": "🇮🇱 Cónyuge / Garante Israelí (Paso 3)",
        "alreadyHaveLabel": "✅ Ya subido:",
        "stillNeedLabel": "📌 2. Subir documentos de la persona seleccionada:",
        "sharedMarriageLabel": "💍 3. Documento compartido de la pareja (1 sola carga):",
        "docName_my_passport": "Mi Pasaporte Extranjero",
        "docName_my_tz": "Mi TZ Israelí + Sefach",
        "docName_my_birth": "Mi Partida de Nacimiento",
        "docName_partner_tz": "TZ + Sefach de Mi Pareja",
        "docName_partner_passport": "Pasaporte de Mi Pareja",
        "docName_partner_birth": "Partida de Nacimiento de Mi Pareja",
        "docName_marriage": "Certificado de Matrimonio",
        "btn_passport_me": "🛂 Subir MI Pasaporte Extranjero (Autocompletar y Validar Vigencia)",
        "btn_passport_partner": "🛂 Subir Pasaporte Extranjero de MI PAREJA / CÓNYUGE",
        "btn_tz_me": "🪪 Subir MI TZ Israelí + Sefach (Si posee)",
        "btn_tz_partner": "🪪 Subir TZ + Sefach de MI PAREJA / INVITANTE Israelí",
        "btn_birth_me": "📜 Subir MI Partida de Nacimiento (Validar Acta Literal y Padres)",
        "btn_birth_partner": "📜 Subir Partida de Nacimiento de MI PAREJA",
        "btn_marriage": "💍 Subir Certificado de Matrimonio (1 sola carga — Fecha, Lugar y Cónyuge)",
        "allDoneForForm": "🎉 ¡Todos los documentos recomendados para {form} están subidos y autocompletados!",
        "skipReminder": "💡 Si omite esto ahora, puede subir sus documentos en cualquier momento usando el botón azul «📸 Escanear Documento → Autocompletar» arriba a la derecha del formulario.",
        "btnSkip": "Omitir por ahora — Escribir manualmente →",
        "scanning": "🔍 Escaneando documento, autocompletando formularios y validando requisitos...",
        "passOk": "✅ ¡Pasaporte extranjero validado y autocompletado ({who})!",
        "passExpErr": "🚨 ALERTA CRÍTICA ({who}): ¡Este pasaporte vence en {m} meses ({exp})! Misrad HaPanim exige al menos {reqM} meses de vigencia. Renueve el pasaporte de inmediato.",
        "passGuide": "📖 Ver guía de vigencia de pasaporte y renovación →",
        "tzWrongFormErr": "🚨 DOCUMENTO INCORRECTO PARA {form} (Solicitante): Subió una TZ israelí ({tz}) marcada «Para Mí», ¡pero en {form} el solicitante principal debe usar un PASAPORTE EXTRANJERO! Consejo: Si esta TZ es de su cónyuge/invitante israelí, marque «☑️ Para Mi Pareja / Cónyuge» arriba y vuelva a subirla.",
        "tzOk": "✅ ¡TZ israelí + Sefach ({tz}) validada y autocompletada ({role})!",
        "tzExpErr": "🚨 ALERTA CRÍTICA — TZ VENCIDA ({role}): ¡La TZ biométrica ({tz}) venció el {exp}! (Igualmente autocompletamos los datos y dirección del Sefach: {addr}). Renueve la TZ antes de la cita.",
        "roleSpouse": "Cónyuge / Invitante Israelí + Dirección",
        "roleApplicant": "Solicitante Principal + Dirección Sefach",
        "birthOk": "✅ ¡Partida de Nacimiento Literal validada ({who})!",
        "birthHalfErr": "🚨 ALERTA CRÍTICA ({who}): ¡Se detectó un certificado corto/parcial sin los nombres completos de ambos padres! Misrad HaPanim exige Partida Literal + Apostilla.",
        "marriageOk": "✅ ¡Certificado de Matrimonio validado! Fecha, lugar de matrimonio, estado civil y datos del cónyuge autocompletados.",
        "marriageGuide": "📖 Ver guía de Certificado de Matrimonio y Apostilla →",
        "aposWarn": "⚠️ Sello de autenticación no visible en esta imagen ({country}): Si {country} es parte del Convenio de La Haya, adjunte la Apostilla. Si {country} NO es parte de La Haya, Misrad HaPanim exige Legalización Consular en cadena (Cancillería local + Consulado/Embajada de Israel).",
        "birthGuide": "📖 Ver guía de Partida Literal y Apostilla →",
        "continueBtn": "✅ Listo — Ir a mi formulario autocompletado →",
        "why1": "⚡ Cero estrés — Escriba una vez, llene los 8 formularios: Extrae sus datos de una sola imagen y autocompleta automáticamente las filas en hebreo oficial y latín de pasaporte en los 8 formularios PIBA.",
        "why2": "🎯 Elimine errores humanos de tipeo y traducción: Evita números invertidos, formatos de fecha incorrectos (DD/MM/AAAA) y traducciones caseras al hebreo que los funcionarios rechazan.",
        "why3": "🛡️ Auditoría forense contra rechazos: Verifica la vigencia de 12/24 meses de su pasaporte, comprueba que su Partida de Nacimiento sea Literal/Completa (con ambos padres), verifica que el Sefach israelí esté totalmente desplegado (autocompletando a sus hijos) y revisa la Apostilla de La Haya o Legalización Consular en Embajada de Israel (países no miembros).",
        "b2": "🔍 Verificará sus documentos (vigencia de 12/24 meses, Partida Literal con nombres de ambos padres, y Apostilla de La Haya o Legalización Consular para países fuera de La Haya).",
        "consularWarn": "⚠️ País fuera del Convenio de La Haya ({country}) — Legalización Consular requerida: Misrad HaPanim exige doble sello en cadena (1. Ministerio de Relaciones Exteriores de {country} + 2. Embajada/Consulado de Israel) en el documento original."
    },
    "de": {
        "badge": "⚡ INTELLIGENTER 2-PERSONEN-ASSISTENT",
        "titleAllMissing": "Kein Formular-Chaos mehr bei {form}: KI-Auto-Fill & Dokumenten-Prüfung in Sekunden!",
        "titleSomeMissing": "Vervollständigen Sie {form}! Es fehlen noch: {missingList}",
        "lead": "Misrad-HaPanim-Formulare manuell auszufüllen ist überwältigend — und ein einziger Tippfehler, ein falsches Datumsformat oder ein Dokumentenfehler führt am Schalter sofort zur Ablehnung. Unser KI-Assistent schützt Sie:",
        "whoLabel": "👤 1. Wessen Dokument ist das? (Schritt 1 = Ausländischer Antragsteller • Schritt 3 = Israelischer Partner) :",
        "forMe": "🌍 Ausländischer Antragsteller — Visum / Alija (Schritt 1)",
        "forPartner": "🇮🇱 Israelischer Ehepartner / Einlader (Schritt 3)",
        "alreadyHaveLabel": "✅ Bereits hochgeladen:",
        "stillNeedLabel": "📌 2. Dokumente für die ausgewählte Person hochladen:",
        "sharedMarriageLabel": "💍 3. Gemeinsames Paardokument (Nur 1 Upload nötig):",
        "docName_my_passport": "Mein Ausländischer Reisepass",
        "docName_my_tz": "Meine Israelische TZ + Sefach",
        "docName_my_birth": "Meine Geburtsurkunde",
        "docName_partner_tz": "TZ + Sefach des Partners",
        "docName_partner_passport": "Reisepass des Partners",
        "docName_partner_birth": "Geburtsurkunde des Partners",
        "docName_marriage": "Heiratsurkunde",
        "btn_passport_me": "🛂 MEINEN Ausländischen Reisepass hochladen (Auto-Fill & Gültigkeit)",
        "btn_passport_partner": "🛂 Ausländischen Reisepass MEINES PARTNERS hochladen",
        "btn_tz_me": "🪪 MEINE Israelische TZ + Sefach hochladen (falls vorhanden)",
        "btn_tz_partner": "🪪 Israelische TZ + Sefach MEINES PARTNERS / EINLADERS hochladen",
        "btn_birth_me": "📜 MEINE Geburtsurkunde hochladen (Vollform & Eltern prüfen)",
        "btn_birth_partner": "📜 Geburtsurkunde MEINES PARTNERS hochladen",
        "btn_marriage": "💍 Heiratsurkunde hochladen (1 Upload für beide — Datum, Ort & Partner)",
        "allDoneForForm": "🎉 Alle empfohlenen Dokumente für {form} wurden hochgeladen und vorausgefüllt!",
        "skipReminder": "💡 Wenn Sie jetzt überspringen, können Sie Ihre Dokumente jederzeit später über den blauen Button „📸 Dokument Scannen → Auto-Ausfüllen“ oben rechts im Formular hochladen!",
        "btnSkip": "Jetzt überspringen — Manuell tippen →",
        "scanning": "🔍 Dokument wird gescannt, Formulare ausgefüllt & geprüft...",
        "passOk": "✅ Ausländischer Reisepass bestätigt & vorausgefüllt ({who})!",
        "passExpErr": "🚨 KRITISCHE WARNUNG ({who}): Dieser Reisepass läuft in {m} Monaten ({exp}) ab! Misrad HaPanim verlangt mindestens {reqM} Monate Gültigkeit. Bitte Pass sofort verlängern.",
        "passGuide": "📖 Leitfaden zur Passgültigkeit & Verlängerung lesen →",
        "tzWrongFormErr": "🚨 FALSCHER AUSWEISTYP FÜR {form} (Antragsteller): Sie haben eine israelische TZ ({tz}) „Für Mich“ hochgeladen, aber in {form} benötigt der Hauptantragsteller einen AUSLÄNDISCHEN REISEPASS! Tipp: Wenn diese TZ Ihrem israelischen Partner gehört, kreuzen Sie oben „☑️ Für Meinen Partner“ an und laden Sie sie erneut hoch!",
        "tzOk": "✅ Israelische TZ + Sefach ({tz}) bestätigt & vorausgefüllt ({role})!",
        "tzExpErr": "🚨 KRITISCHE WARNUNG — TZ ABGELAUFEN ({role}): Biometrische TZ ({tz}) ist am {exp} abgelaufen! (Daten & Sefach-Adresse {addr} wurden dennoch vorausgefüllt). Bitte TZ vor dem Termin erneuern.",
        "roleSpouse": "Israelischer Partner / Einlader + Adresse",
        "roleApplicant": "Hauptantragsteller + Sefach-Adresse",
        "birthOk": "✅ Vollständige Geburtsurkunde bestätigt ({who})!",
        "birthHalfErr": "🚨 KRITISCHE WARNUNG ({who}): Kurzform-Geburtsurkunde erkannt (Elternnamen fehlen)! Misrad HaPanim verlangt eine vollständige Geburtsurkunde + Apostille.",
        "marriageOk": "✅ Heiratsurkunde bestätigt! Heiratsdatum, Heiratsort, Familienstand & Ehepartner vorausgefüllt!",
        "marriageGuide": "📖 Leitfaden zu Heiratsurkunde & Apostille lesen →",
        "aposWarn": "⚠️ Keine Beglaubigung auf diesem Scan erkannt ({country}): Für Haager-Vertragsstaaten ist eine Apostille erforderlich; für Nicht-Haager-Staaten verlangt Misrad HaPanim die diplomatische Kettenbeglaubigung (Außenministerium + Israelische Botschaft/Konsulat).",
        "birthGuide": "📖 Leitfaden zu Geburtsurkunde & Apostille lesen →",
        "continueBtn": "✅ Fertig — Weiter zum vorausgefüllten Formular →",
        "why1": "⚡ Null Überforderung — 1 Scan füllt alle 8 Formulare: Liest Ihre Daten aus und füllt automatisch alle passenden Felder in Behörden-Hebräisch und Pass-Latein in allen 8 PIBA-Formularen aus.",
        "why2": "🎯 Keine Tipp- oder Übersetzungsfehler: Verhindert Zahlendreher, falsche Datumsformate (TT/MM/JJJJ) und fehlerhafte Hebräisch-Übersetzungen.",
        "why3": "🛡️ Sofortige forensische Dokumentenprüfung: Prüft die 12/24-Monate-Passgültigkeit, erkennt Kurzform-Geburtsurkunden (ohne Elternnamen), prüft ob der israelische TZ-Sefach komplett aufgeklappt ist (inkl. automatischer Kinder-Eintragung) und kontrolliert die Haager Apostille bzw. Konsularische Legalisation der israelischen Botschaft (für Nicht-Haager-Länder)!",
        "b2": "🔍 Prüft Ihre Dokumente (Gültigkeit, vollständige Geburtsurkunde mit beiden Eltern, sowie Haager Apostille oder Konsularische Legalisation für Nicht-Haager-Staaten).",
        "consularWarn": "⚠️ Nicht-Haager-Vertragsstaat ({country}) — Konsularische Kettenbeglaubigung erforderlich: Misrad HaPanim verlangt den Stempel des Außenministeriums von {country} + den Stempel der Israelischen Botschaft auf dem Original!"
    },
    "ru": {
        "badge": "⚡ УМНЫЙ ПОМОЩНИК (ДЛЯ ОБОИХ ПАРТНЁРОВ)",
        "titleAllMissing": "Забудьте о бумажном хаосе в {form}: Автозаполнение и проверка документов за секунды!",
        "titleSomeMissing": "Завершите заполнение {form}! Осталось загрузить: {missingList}",
        "lead": "Заполнять анкеты МВД Израиля вручную — огромный стресс, а любая опечатка, неверный формат даты или ошибка в документе приводят к отказу чиновника на месте. Загрузка документов здесь экономит часы времени и защищает ваше дело:",
        "whoLabel": "👤 1. Чей это документ? (Шаг 1 = Иностранный заявитель • Шаг 3 = Израильский супруг / приглашающий):",
        "forMe": "🌍 Иностранный заявитель — Виза / Алия (Шаг 1)",
        "forPartner": "🇮🇱 Израильский супруг(а) / Приглашающий (Шаг 3)",
        "alreadyHaveLabel": "✅ Уже загружено:",
        "stillNeedLabel": "📌 2. Загрузить документы для выбранного человека:",
        "sharedMarriageLabel": "💍 3. Общий документ пары (достаточно 1 загрузки):",
        "docName_my_passport": "Мой Загранпаспорт",
        "docName_my_tz": "Мой Теудат Зеут + Сефах",
        "docName_my_birth": "Моё Свидетельство о рождении",
        "docName_partner_tz": "Теудат Зеут + Сефах партнёра",
        "docName_partner_passport": "Загранпаспорт партнёра",
        "docName_partner_birth": "Свидетельство о рождении партнёра",
        "docName_marriage": "Свидетельство о браке",
        "btn_passport_me": "🛂 Загрузить МОЙ Загранпаспорт (Автозаполнение + Проверка срока)",
        "btn_passport_partner": "🛂 Загрузить Загранпаспорт ПАРТНЁРА / СУПРУГА(И)",
        "btn_tz_me": "🪪 Загрузить МОЙ Теудат Зеут + Сефах (если есть)",
        "btn_tz_partner": "🪪 Загрузить Теудат Зеут + Сефах ПАРТНЁРА / ПРИГЛАШАЮЩЕГО",
        "btn_birth_me": "📜 Загрузить МОЁ Свидетельство о рождении (Проверка полной формы и родителей)",
        "btn_birth_partner": "📜 Загрузить Свидетельство о рождении ПАРТНЁРА",
        "btn_marriage": "💍 Загрузить Свидетельство о браке (1 раз для обоих — Дата, место и супруг)",
        "allDoneForForm": "🎉 Все необходимые документы для {form} загружены и внесены в анкету!",
        "skipReminder": "💡 Если вы пропустите этот шаг сейчас, вы всегда сможете загрузить документы позже с помощью синей кнопки «📸 Сфотографировать Документ → Заполнить Анкету» в правом верхнем углу формы!",
        "btnSkip": "Пропустить — Заполнить вручную →",
        "scanning": "🔍 Сканируем документ, заполняем анкеты и проверяем по правилам МВД...",
        "passOk": "✅ Загранпаспорт проверен и внесён в анкету ({who})!",
        "passExpErr": "🚨 КРИТИЧЕСКАЯ ОШИБКА ({who}): Срок действия паспорта истекает через {m} мес. ({exp})! МВД требует минимум {reqM} мес. запаса. Необходимо срочно продлить паспорт.",
        "passGuide": "📖 Читать инструкцию по продлению паспорта и правилам МВД →",
        "tzWrongFormErr": "🚨 НЕВЕРНЫЙ ДОКУМЕНТ ДЛЯ {form} (Заявитель): Вы загрузили израильский ТЗ ({tz}) с отметкой «Для меня», но в анкете {form} основной заявитель должен указать ЗАГРАНПАСПОРТ! Подсказка: Если этот ТЗ принадлежит вашему израильскому супругу/приглашающему, отметьте сверху «☑️ Для моего партнёра / супруга(и)» и загрузите его снова!",
        "tzOk": "✅ Израильский Теудат Зеут + Сефах ({tz}) проверен и внесён ({role})!",
        "tzExpErr": "🚨 КРИТИЧЕСКАЯ ОШИБКА — ТЕУДАТ ЗЕУТ ПРОСРОЧЕН ({role}): Срок действия биометрического ТЗ ({tz}) истёк {exp}! (Данные и адрес из Сефаха {addr} всё равно внесены). Необходимо продлить ТЗ до подачи.",
        "roleSpouse": "Израильский супруг / приглашающий + Адрес",
        "roleApplicant": "Основной заявитель + Адрес из Сефаха",
        "birthOk": "✅ Полное свидетельство о рождении проверено ({who})!",
        "birthHalfErr": "🚨 КРИТИЧЕСКАЯ ОШИБКА ({who}): Обнаружена краткая форма свидетельства (без полных имён обоих родителей)! МВД принимает только полное свидетельство о рождении + Апостиль.",
        "marriageOk": "✅ Свидетельство о браке проверено! Дата и место брака, семейное положение и данные супруга(и) внесены!",
        "marriageGuide": "📖 Читать инструкцию по свидетельству о браке и апостилю →",
        "aposWarn": "⚠️ Штамп легализации не виден на этом фото ({country}): Для стран Гаагской конвенции необходим Апостиль; для стран вне конвенции МВД требует двойную консульскую легализацию (МИД страны выдачи + Консульство Израиля).",
        "birthGuide": "📖 Читать инструкцию по свидетельствам о рождении и апостилю →",
        "continueBtn": "✅ Готово — Перейти к заполненной анкете →",
        "why1": "⚡ Без стресса — 1 скан заполняет все 8 анкет: Система считывает ваши данные и автоматически вносит их на официальном иврите и латиницей во все 8 бланков МВД.",
        "why2": "🎯 Защита от опечаток и ошибок перевода: Исключает путаницу в цифрах паспорта/ТЗ, форматах дат (ДД/ММ/ГГГГ) и неточности перевода на иврит МВД.",
        "why3": "🛡️ Мгновенный аудит ловушек МВД: Проверяет запас срока действия паспорта (12/24 мес.), отличает краткое свидетельство о рождении от полного (с обоими родителями), проверяет полностью ли развёрнут Сефах ТЗ (автоматически внося детей) и проверяет Апостиль либо Консульскую легализацию посольства Израиля (для стран вне Гаагской конвенции)!",
        "b2": "🔍 Проведёт проверку документов (срок действия, полное свидетельство о рождении с обоими родителями, а также штамп Апостиль или Консульская легализация для стран вне Гаагской конвенции).",
        "consularWarn": "⚠️ Страна вне Гаагской конвенции ({country}) — Требуется Консульская легализация: МВД требует цепочку печатей на оригинале (1. МИД страны выдачи + 2. Посольство/Консульство Израиля)!"
    },
    "he": {
        "badge": "⚡ העוזר החכם לטפסים (עבור שני בני הזוג)",
        "titleAllMissing": "אל תלכו לאיבוד בניירת של {form}: מילוי אוטומטי ובדיקת תקינות מסמכים בשניות!",
        "titleSomeMissing": "השלימו את תיק {form}! טרם העליתם: {missingList}",
        "lead": "מילוי ידני של טפסי משרד הפנים הוא מתיש ומבלבל — וטעות הקלדה אחת, תאריך שגוי או מסמך חסר עלולים לגרום לדחיית התיק על הסף בלשכה. העלאת המסמכים כאן חוסכת שעות של תסכול ומגנה על הבקשה שלכם:",
        "whoLabel": "👤 1. של מי המסמך? (שלב 1 = המבקש/ת הזר/ה לאשרה או עלייה • שלב 3 = בן/בת הזוג הישראלי/ת):",
        "forMe": "🌍 המבקש/ת הזר/ה לאשרה / עלייה (שלב 1)",
        "forPartner": "🇮🇱 בן/בת הזוג / המזמין הישראלי (שלב 3)",
        "alreadyHaveLabel": "✅ כבר הועלו והוזנו:",
        "stillNeedLabel": "📌 2. העלאת מסמכים עבור האדם שסומן:",
        "sharedMarriageLabel": "💍 3. מסמך משותף לזוג (העלאה אחת בלבד):",
        "docName_my_passport": "הדרכון הזר שלי",
        "docName_my_tz": "ת\"ז + ספח שלי",
        "docName_my_birth": "תעודת הלידה שלי",
        "docName_partner_tz": "ת\"ז + ספח של בן/בת הזוג",
        "docName_partner_passport": "דרכון זר של בן/בת הזוג",
        "docName_partner_birth": "תעודת לידה של בן/בת הזוג",
        "docName_marriage": "תעודת נישואין",
        "btn_passport_me": "🛂 העלאת הדרכון הזר שלי (מילוי אוטומטי בלועזית ובדיקת תוקף)",
        "btn_passport_partner": "🛂 העלאת דרכון זר של בן/בת הזוג",
        "btn_tz_me": "🪪 העלאת ת\"ז + ספח שלי (למחזיקי ת\"ז ישראלית)",
        "btn_tz_partner": "🪪 העלאת ת\"ז + ספח של בן/בת הזוג / המזמין הישראלי",
        "btn_birth_me": "📜 העלאת תעודת הלידה שלי (בדיקת תעודה מלאה ושמות הורים)",
        "btn_birth_partner": "📜 העלאת תעודת לידה של בן/בת הזוג",
        "btn_marriage": "💍 העלאת תעודת נישואין (העלאה אחת לשניכם — תאריך, מקום ובן/בת זוג)",
        "allDoneForForm": "🎉 כל המסמכים המומלצים עבור {form} הועלו והוזנו בהצלחה!",
        "skipReminder": "💡 אם תבחרו לדלג כעת, תוכלו להעלות מסמכים בכל עת דרך הכפתור הכחול \"📸 צילום / העלאת תעודה ← מילוי הטופס\" בראש הטופס!",
        "btnSkip": "דלג כעת — אמלא ידנית ←",
        "scanning": "🔍 סורק את המסמך, ממלא את כל הטפסים ובודק תקינות מול נהלי משרד הפנים...",
        "passOk": "✅ הדרכון הזר אומת והשדות מולאו אוטומטית ({who})!",
        "passExpErr": "🚨 התראה קריטית ({who}): תוקף הדרכון פג בעוד {m} חודשים ({exp})! משרד הפנים דורש תוקף של לפחות {reqM} חודשים קדימה. יש לחדש את הדרכון בהקדם.",
        "passGuide": "📖 למדריך חידוש דרכון ודרישות תוקף משרד הפנים ←",
        "tzWrongFormErr": "🚨 סוג תעודה שגוי עבור {form} (המבקש הראשי): העליתם תעודת זהות ישראלית ({tz}) תחת 'עבורי', אך בטופס {form} המבקש הראשי חייב להזין דרכון זר! טיפ: אם תעודת הזהות שייכת לבן/בת הזוג או למזמין הישראלי, סמנו למעלה '☑️ עבור בן/בת הזוג / המזמין' והעלו אותה שוב!",
        "tzOk": "✅ תעודת זהות ישראלית + ספח ({tz}) אומתה והנתונים הוזנו ({role})!",
        "tzExpErr": "🚨 התראה קריטית — פג תוקף תעודת הזהות ({role}): תוקף ת\"ז הביומטרית ({tz}) פג בתאריך {exp}! (עם זאת, מילאנו אוטומטית את הפרטים והכתובת מהספח: {addr}). יש לחדש את תעודת הזהות הביומטרית לפני הגשת התיק.",
        "roleSpouse": "בן/בת זוג או מזמין ישראלי + כתובת מגורים",
        "roleApplicant": "המבקש הראשי + כתובת מהספח",
        "birthOk": "✅ תעודת לידה מלאה אומתה והנתונים הוזנו ({who})!",
        "birthHalfErr": "🚨 התראה קריטית ({who}): זוהתה תעודת לידה חלקית / מקוצרת ללא שמות מלאים של שני ההורים! חובה להזמין תעודת לידה מלאה הכוללת שם אב ושם אם + אפוסטיל.",
        "marriageOk": "✅ תעודת הנישואין אומתה! תאריך ומקום הנישואין, המצב האישי ופרטי בן/בת הזוג הוזנו לטפסים!",
        "marriageGuide": "📖 למדריך תעודת נישואין וחותמת אפוסטיל ←",
        "aposWarn": "⚠️ לא זוהתה חותמת אימות בצילום זה ({country}): למדינות אמנת האג חובה לצרף חותמת אפוסטיל; למדינות שאינן חברות באמנת האג משרד הפנים מחייב אימות שרשרת דיפלומטי (משרד החוץ המקומי + קונסוליית/שגרירות ישראל במדינת המקור).",
        "birthGuide": "📖 למדריך תעודת לידה מלאה ואפוסטיל ←",
        "continueBtn": "✅ סיימתי להעלות — המשך לטופס הממולא ←",
        "why1": "⚡ אפס הצפה — מעלים פעם אחת וממלאים את כל 8 הטפסים: המערכת מחלצת את הנתונים ומזינה אותם אוטומטית בעברית תקנית ובאותיות לטיניות בכל 8 טפסי משרד הפנים.",
        "why2": "🎯 מניעת טעויות הקלדה ותרגום: מונע סיכולי ספרות במספרי דרכון/ת\"ז, שגיאות בפורמט תאריכים וניסוחים לא תקניים בעברית.",
        "why3": "🛡️ בדיקת תקינות מונעת דחייה בלשכה: בודקת אוטומטית תוקף דרכון (12/24 חודשים), מוודאת שתעודת הלידה מלאה וכוללת שמות הורים, בודקת שהספח לת\"ז פתוח במלואו (ומזינה אוטומטית את הילדים!) ובודקת חותמת אפוסטיל או אימות קונסולרי בנציגות ישראל (למדינות מחוץ לאמנת האג)!",
        "b2": "🔍 בדיקת תקינות למסמכים (תוקף דרכון/ת\"ז, תעודת לידה מלאה הכוללת את שמות שני ההורים, ובדיקת חותמת אפוסטיל או אימות שרשרת קונסולרי למדינות שאינן חברות באמנת האג).",
        "consularWarn": "⚠️ מדינה שאינה חברה באמנת האג ({country}) — חובת אימות שרשרת קונסולרי: מאחר ש-{country} אינה חתומה על אמנת האג, משרד הפנים מחייב אימות שרשרת (חותמת משרד החוץ המקומי + חותמת נציגות ישראל) על התעודה המקורית!"
    }
};

  var FORMS_SUPPORTING_ISRAELI_TZ = {
    ash6: 'spouse',
    nespach_alef: 'spouse',
    ash1: 'spouse',
    mr14a: 'applicant',
    sec_cv: 'applicant'
  };

  // Determines per-form capabilities for 'Me' and 'Partner' + what is already uploaded vs missing!

  window.hasFormsEngineAccess = function() {
    try {
      if (sessionStorage.getItem('gat_simulate_guest_paywall') === '1') return false;
      if (typeof window.canUnlockForms === 'function' && window.canUnlockForms()) return true;
      var entMap = {};
      try {
        entMap = Object.assign(
          {},
          JSON.parse(localStorage.getItem('gat_entitlements_v2') || '{}') || {},
          JSON.parse(localStorage.getItem('gat_entitlements_map') || '{}') || {}
        );
      } catch (e) {}
      var now = Date.now();
      var FORMS_ALLOWED_SKUS = [
        'admin', 'vip_couple_649', 'suite_solo_life_399', 'suite_solo_90d_249',
        'couples_life_229', 'couples_90d_129', 'forms_life_149', 'forms_90d_89'
      ];
      for (var i = 0; i < FORMS_ALLOWED_SKUS.length; i++) {
        var k = FORMS_ALLOWED_SKUS[i];
        var entry = entMap[k];
        if (entry === true || (entry && typeof entry === 'object' && (!entry.exp || entry.exp > now))) {
          return true;
        }
      }
      if (localStorage.getItem('gat_pro_unlocked') === 'true' || localStorage.getItem('gat_pro_unlocked') === '1') {
        var pTier = String(localStorage.getItem('gat_pro_tier') || localStorage.getItem('gat_unlocked_tier') || localStorage.getItem('gat_tier') || '').trim();
        if (FORMS_ALLOWED_SKUS.indexOf(pTier) !== -1) return true;
      }
      return false;
    } catch (e) { return false; }
  };

  window.redirectToFormsPayment = function(reasonText) {
    var existing = document.getElementById('gat-new-user-doc-modal');
    if (existing) existing.remove();
    var l = lang();
    if (typeof window.openProPaywall === 'function') {
      window.openProPaywall(reasonText || (UI[l] || UI.en).pwPrompt, 'forms');
    } else {
      window.location.href = '/pricing/?sku=forms_life_149&lang=' + encodeURIComponent(l);
    }
  };

  window.triggerSmartPopupOnFormSwap = function(newFormKey) {
    setTimeout(function() {
      try {
        var fKey = newFormKey || val('pf_active_form', 'ash3');
        var isPaidUser = typeof window.hasFormsEngineAccess === 'function' && window.hasFormsEngineAccess();
        var docSt = window.getFormDocumentStatus ? window.getFormDocumentStatus(fKey) : { missing: [] };
        if (!isPaidUser) {
          window.showNewUserDocUploadModal(fKey, null, true);
        } else if (docSt.missing && docSt.missing.length > 0) {
          window.showNewUserDocUploadModal(fKey, null, false);
        }
      } catch (e) {}
    }, 60);
  };

  window.getFormDocumentStatus = function(formKey) {
    var curFKey = formKey || val('pf_active_form', 'ash3');
    var s = Object.assign({}, loadDraft(), window.gatFormsState || {});
    var scans = loadScans() || [];
    var isMarried = /נשוי|married/i.test(String(s.pf_marital || '')) || curFKey === 'ash6';

    var hasMyPassport = scans.some(function(sc) {
      return sc && sc.ownerParty !== 'partner' && !sc.isIsraeliTz && (/passport/i.test(String(sc.docType)) || !!sc.passportNumber);
    });
    var hasMyTzCard = scans.some(function(sc) {
      return sc && sc.ownerParty !== 'partner' && sc.isIsraeliTz;
    });
    var hasMySefach = scans.some(function(sc) {
      return sc && sc.ownerParty !== 'partner' && sc.isIsraeliTz && (sc.hasSefach || !!sc.israeliAddrHe);
    });
    var hasMyTz = hasMyTzCard && hasMySefach;

    var hasMyBirth = scans.some(function(sc) {
      return sc && sc.ownerParty !== 'partner' && (/birth/i.test(String(sc.docType)) || (!!sc.fatherName && !!sc.motherName));
    });

    var hasPartnerTzCard = scans.some(function(sc) {
      return sc && (sc.ownerParty === 'partner' || sc.tzRole === 'spouse') && sc.isIsraeliTz;
    });
    var hasPartnerSefach = scans.some(function(sc) {
      return sc && (sc.ownerParty === 'partner' || sc.tzRole === 'spouse') && sc.isIsraeliTz && (sc.hasSefach || !!sc.israeliAddrHe);
    });
    var hasPartnerTz = hasPartnerTzCard && hasPartnerSefach;

    var hasPartnerPassport = scans.some(function(sc) {
      return sc && sc.ownerParty === 'partner' && !sc.isIsraeliTz && (/passport/i.test(String(sc.docType)) || !!sc.passportNumber);
    });
    var hasPartnerBirth = scans.some(function(sc) {
      return sc && sc.ownerParty === 'partner' && (/birth/i.test(String(sc.docType)) || (!!sc.fatherName && !!sc.motherName));
    });

    var hasMarriage = scans.some(function(sc) {
      return sc && (/marriage/i.test(String(sc.docType)) || !!sc.marriageDate);
    });
    // Does this form involve a Partner / Spouse / Inviter? (All except mr14b have partner/spouse/inviter fields!)
    var hasPartnerOnForm = (curFKey !== 'mr14b');
    // Can "Me (Primary Applicant)" upload an Israeli TZ on this form? (Yes on mr14a, sec_cv, or if they hold an A/5 TZ on ash3/ash6/nespach_alef)
    var meCanHaveTz = (curFKey === 'mr14a' || curFKey === 'sec_cv' || curFKey === 'ash6' || curFKey === 'nespach_alef' || curFKey === 'ash3');

    var needed = [];
    if (curFKey === 'mr14b') {
      needed = ['my_passport'];
    } else if (curFKey === 'ash6') {
      needed = ['my_passport', 'my_birth', 'partner_tz', 'marriage'];
    } else if (curFKey === 'nespach_alef') {
      needed = ['my_passport', 'my_birth', 'partner_tz'];
    } else if (curFKey === 'ash1') {
      needed = ['my_passport', 'my_birth', 'partner_tz'];
      if (isMarried) needed.push('marriage');
    } else if (curFKey === 'ash456') {
      needed = ['my_passport', 'my_birth'];
      if (isMarried) { needed.push('partner_passport'); needed.push('marriage'); }
    } else if (curFKey === 'mr14a' || curFKey === 'sec_cv') {
      needed = ['my_passport', 'my_birth'];
      if (isMarried) needed.push('marriage');
    } else {
      // ash3
      needed = ['my_passport', 'my_birth'];
      if (isMarried) needed.push('marriage');
    }

    var mapHas = {
      my_passport: hasMyPassport,
      my_tz: hasMyTz,
      my_birth: hasMyBirth,
      partner_tz: hasPartnerTz || hasPartnerPassport,
      partner_passport: hasPartnerPassport || hasPartnerTz,
      partner_birth: hasPartnerBirth,
      marriage: hasMarriage
    };

    var uploaded = Object.keys(mapHas).filter(function(k) { return !!mapHas[k]; });
    var missing = needed.filter(function(k) { return !mapHas[k]; });

    return {
      needed: needed,
      uploaded: uploaded,
      missing: missing,
      mapHas: mapHas,
      hasPartnerOnForm: hasPartnerOnForm,
      meCanHaveTz: meCanHaveTz
    };
  };

  window.openGatChecklistsGuide = function() {
    var m = document.getElementById("gat-new-user-doc-modal");
    if (m) m.remove();
    if (typeof window.switchTab === "function") window.switchTab("mod-checklists");
  };

  window.showNewUserDocUploadModal = function(formKey, focusElId, forceShowAll) {
    if (window._gatUploadInProgress) return;
    var existing = document.getElementById('gat-new-user-doc-modal');
    if (existing) {
      if (!forceShowAll) return;
      existing.remove();
    }
    var l = lang();
    var dTxt = DOC_ONBOARD_I18N[l] || DOC_ONBOARD_I18N.en;
    var curFKey = formKey || val('pf_active_form', 'ash3');
    var fDef = FORMS[curFKey] || FORMS.ash3;
    var docStatus = window.getFormDocumentStatus(curFKey);

    if (!forceShowAll && docStatus.missing.length === 0) return;

    // Default selected party: if "Me" already has Passport & Birth Cert uploaded, and Partner is still missing TZ/Passport, auto-select "partner"!
    var selectedParty = 'me';
    if (docStatus.hasPartnerOnForm && docStatus.mapHas.my_passport && docStatus.mapHas.my_birth && (!docStatus.mapHas.partner_tz && !docStatus.mapHas.partner_passport)) {
      selectedParty = 'partner';
    }
    window._gatActiveUploadOwner = selectedParty;

    var isRtl = (l === 'he');
    var missingNames = docStatus.missing.map(function(k) { return dTxt['docName_' + k] || k; }).join(', ');
    var dynamicTitle = (docStatus.uploaded.length > 0 && docStatus.missing.length > 0)
      ? dTxt.titleSomeMissing.replace(/\{form\}/g, fDef.code).replace('{missingList}', missingNames)
      : dTxt.titleAllMissing.replace(/\{form\}/g, fDef.code);
    var dynamicLead = dTxt.lead.replace(/\{form\}/g, fDef.code);

    var ov = document.createElement('div');
    ov.id = 'gat-new-user-doc-modal';
    ov.dir = isRtl ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;z-index:999998;background:rgba(15,23,42,0.78);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:12px;overflow:hidden;';
    ov.innerHTML =
      '<div id="gat-nu-scroll-card" style="background:#ffffff;border:3px solid #059669;border-radius:18px;max-width:560px;width:100%;max-height:calc(100dvh - 28px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.45);color:#0f172a;font-family:inherit;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px;background:#ffffff;border-bottom:1.5px solid #e2e8f0;flex-shrink:0;">' +
          '<span style="background:#dcfce7;color:#166534;border:1px solid #86efac;font-weight:900;font-size:0.74rem;padding:4px 10px;border-radius:999px;">' + esc(dTxt.badge) + ' • ' + esc(fDef.code) + '</span>' +
          '<button type="button" id="gat-nu-close-x" style="background:#f1f5f9;border:1.5px solid #cbd5e1;width:34px;height:34px;border-radius:50%;font-size:1.05rem;cursor:pointer;color:#0f172a;font-weight:900;display:flex;align-items:center;justify-content:center;">✕</button>' +
        '</div>' +
        '<div id="gat-nu-scroll-body" style="padding:14px 16px;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;flex:1;">' +
          '<h3 id="gat-nu-dyn-title" style="margin:0 0 6px;font-size:1.02rem;color:#064e3b;font-weight:900;line-height:1.34;">' + esc(dynamicTitle) + '</h3>' +
          '<p style="margin:0 0 8px;font-size:0.8rem;color:#334155;line-height:1.4;font-weight:600;">' + esc(dynamicLead) + '</p>' +
          '<div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:11px;padding:9px 11px;margin-bottom:10px;display:flex;flex-direction:column;gap:5px;font-size:0.75rem;color:#14532d;line-height:1.38;font-weight:700;">' +
            '<div>' + esc(dTxt.why1 || dTxt.b1) + '</div>' +
            '<div>' + esc(dTxt.why2 || dTxt.b2) + '</div>' +
            '<div>' + esc(dTxt.why3 || dTxt.b3) + '</div>' +
          '</div>' +
          '<div id="gat-nu-already-banner" style="display:none;margin-bottom:10px;"></div>' +
          '<div id="gat-nu-party-selector-wrap" style="margin-bottom:11px;"></div>' +
          '<input type="file" id="gat-nu-shared-file-input" accept="image/*,application/pdf,.pdf,.heic,.heif" multiple style="display:none;" />' +
          '<div id="gat-nu-buttons-wrap" style="display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:11px;"></div>' +
          '<div id="gat-nu-marriage-wrap" style="margin-bottom:11px;"></div>' +
          '<div id="gat-nu-scan-results" style="display:none;margin-bottom:11px;"></div>' +
          '<div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:8px 11px;margin-bottom:4px;font-size:0.75rem;color:#1e3a8a;font-weight:700;line-height:1.38;">' +
            esc(dTxt.skipReminder) +
          '</div>' +
        '</div>' +
        '<div style="padding:10px 16px;background:#f8fafc;border-top:1.5px solid #e2e8f0;flex-shrink:0;">' +
          '<button type="button" id="gat-nu-skip-btn" style="width:100%;background:#ffffff;color:#0f172a;border:1.5px solid #94a3b8;border-radius:10px;padding:10px 14px;font-size:0.84rem;font-weight:900;cursor:pointer;">' + esc(dTxt.btnSkip) + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(ov);

    var closeModal = function() {
      ov.remove();
      if (typeof window.ensureVaultAutofillAppliedNow === 'function') {
        window.ensureVaultAutofillAppliedNow(true);
      }
      if (focusElId) {
        var target = document.getElementById(focusElId);
        if (target && typeof target.focus === 'function') {
          try { target.focus({ preventScroll: true }); } catch (e) {}
        }
      }
    };

    document.getElementById('gat-nu-close-x').onclick = closeModal;
    document.getElementById('gat-nu-skip-btn').onclick = closeModal;
    ov.onclick = function(e) { if (e.target === ov) closeModal(); };

    var sharedInput = document.getElementById('gat-nu-shared-file-input');
    var activeSlot = 'passport';

    var renderInteractiveSections = function() {
      var st = window.getFormDocumentStatus(curFKey);

      // 1. Render "Uploaded so far" summary bar
      var alBanner = document.getElementById('gat-nu-already-banner');
      if (alBanner) {
        if (st.uploaded.length > 0) {
          var upNames = st.uploaded.map(function(k) { return dTxt['docName_' + k] || k; }).join(' • ');
          alBanner.style.display = 'block';
          alBanner.style.cssText = 'background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:8px 11px;margin-bottom:10px;font-size:0.78rem;color:#166534;font-weight:800;';
          alBanner.innerHTML = esc(dTxt.alreadyHaveLabel) + ' <span style="font-weight:900;">' + esc(upNames) + '</span>';
        } else {
          alBanner.style.display = 'none';
        }
        if (typeof window.renderModalVaultListIfOpen === 'function') {
          setTimeout(window.renderModalVaultListIfOpen, 40);
        }
        if (typeof window.lockUploadedDocButtonsInModal === 'function') {
          setTimeout(function() { window.lockUploadedDocButtonsInModal(selectedParty); }, 50);
        }
      }

      // 2. Render Two-Party Checkbox Toggle Bar ("☑️ For Me" vs "☑️ For My Partner / Spouse")
      var partyWrap = document.getElementById('gat-nu-party-selector-wrap');
      if (partyWrap) {
        if (!st.hasPartnerOnForm) {
          partyWrap.innerHTML = '';
        } else {
          var meChecked = selectedParty === 'me';
          var partnerChecked = selectedParty === 'partner';
          var meDoneBadges = [
            st.mapHas.my_passport ? '✅ Passport' : '',
            st.mapHas.my_tz ? '✅ TZ' : '',
            st.mapHas.my_birth ? '✅ Birth' : ''
          ].filter(Boolean).join(' ');
          var partnerDoneBadges = [
            st.mapHas.partner_tz ? '✅ TZ' : '',
            st.mapHas.partner_passport ? '✅ Passport' : '',
            st.mapHas.partner_birth ? '✅ Birth' : ''
          ].filter(Boolean).join(' ');

          partyWrap.innerHTML =
            '<div style="font-size:0.78rem;font-weight:900;color:#0f172a;margin-bottom:6px;">' + esc(dTxt.whoLabel) + '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
              '<label id="gat-party-lbl-me" style="display:flex;flex-direction:column;gap:3px;padding:10px 11px;border-radius:11px;cursor:pointer;border:2.5px solid ' + (meChecked ? '#0284c7' : '#cbd5e1') + ';background:' + (meChecked ? '#e0f2fe' : '#f8fafc') + ';transition:all 0.15s;">' +
                '<div style="display:flex;align-items:center;gap:7px;font-size:0.83rem;font-weight:900;color:' + (meChecked ? '#0369a1' : '#334155') + ';">' +
                  '<input type="checkbox" id="gat-party-cb-me" ' + (meChecked ? 'checked' : '') + ' style="width:17px;height:17px;accent-color:#0284c7;cursor:pointer;margin:0;" />' +
                  '<span>' + esc(dTxt.forMe) + '</span>' +
                '</div>' +
                (meDoneBadges ? '<div style="font-size:0.7rem;color:#15803d;font-weight:800;padding-inline-start:24px;">' + esc(meDoneBadges) + '</div>' : '') +
              '</label>' +
              '<label id="gat-party-lbl-partner" style="display:flex;flex-direction:column;gap:3px;padding:10px 11px;border-radius:11px;cursor:pointer;border:2.5px solid ' + (partnerChecked ? '#0f766e' : '#cbd5e1') + ';background:' + (partnerChecked ? '#ccfbf1' : '#f8fafc') + ';transition:all 0.15s;">' +
                '<div style="display:flex;align-items:center;gap:7px;font-size:0.83rem;font-weight:900;color:' + (partnerChecked ? '#0f766e' : '#334155') + ';">' +
                  '<input type="checkbox" id="gat-party-cb-partner" ' + (partnerChecked ? 'checked' : '') + ' style="width:17px;height:17px;accent-color:#0f766e;cursor:pointer;margin:0;" />' +
                  '<span>' + esc(dTxt.forPartner) + '</span>' +
                '</div>' +
                (partnerDoneBadges ? '<div style="font-size:0.7rem;color:#15803d;font-weight:800;padding-inline-start:24px;">' + esc(partnerDoneBadges) + '</div>' : '') +
              '</label>' +
            '</div>';

          var cbMe = document.getElementById('gat-party-cb-me');
          var cbPartner = document.getElementById('gat-party-cb-partner');
          if (cbMe) {
            cbMe.onchange = function() {
              selectedParty = 'me';
              window._gatActiveUploadOwner = 'me';
              renderInteractiveSections();
            };
          }
          if (cbPartner) {
            cbPartner.onchange = function() {
              selectedParty = 'partner';
              window._gatActiveUploadOwner = 'partner';
              renderInteractiveSections();
            };
          }
        }
      }

      // 3. Render Person-Specific Upload Buttons (Passport, TZ + Sefach, Birth Certificate) for the Selected Party!
      var btnWrap = document.getElementById('gat-nu-buttons-wrap');
      if (btnWrap) {
        var personBtns = [];
        if (selectedParty === 'me') {
          if (true) {
            personBtns.push({ slot: 'passport', label: dTxt.btn_passport_me, bg: 'linear-gradient(135deg,#0284c7 0%,#0369a1 100%)', done: st.mapHas.my_passport });
          }
          if (st.meCanHaveTz) {
            personBtns.push({ slot: 'tz', label: dTxt.btn_tz_me, bg: 'linear-gradient(135deg,#0f766e 0%,#115e59 100%)', done: st.mapHas.my_tz });
          }
          if (curFKey !== 'mr14b') {
            personBtns.push({ slot: 'birth', label: dTxt.btn_birth_me, bg: 'linear-gradient(135deg,#059669 0%,#047857 100%)', done: st.mapHas.my_birth });
          }
        } else {
          // Selected Party === 'partner' (Partner can have an Israeli TZ + Sefach OR a Foreign Passport + Birth Certificate!)
          if (true) {
            personBtns.push({ slot: 'tz', label: dTxt.btn_tz_partner, bg: 'linear-gradient(135deg,#0f766e 0%,#115e59 100%)', done: st.mapHas.partner_tz });
          }
          if (true) {
            personBtns.push({ slot: 'passport', label: dTxt.btn_passport_partner, bg: 'linear-gradient(135deg,#0284c7 0%,#0369a1 100%)', done: st.mapHas.partner_passport });
          }
          if (true) {
            personBtns.push({ slot: 'birth', label: dTxt.btn_birth_partner, bg: 'linear-gradient(135deg,#059669 0%,#047857 100%)', done: st.mapHas.partner_birth });
          }
        }

        if (personBtns.length === 0) {
          btnWrap.innerHTML = '<div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:10px;color:#166534;font-weight:900;font-size:0.82rem;text-align:center;">✅ ' + esc(selectedParty === 'me' ? dTxt.forMe : dTxt.forPartner) + ' — ' + esc(dTxt.allDoneForForm.replace(/\{form\}/g, fDef.code)) + '</div>';
        } else {
          btnWrap.innerHTML =
            '<div style="font-size:0.77rem;font-weight:900;color:#0f172a;margin-bottom:2px;">' + esc(dTxt.stillNeedLabel) + '</div>' +
            personBtns.map(function(b) {
              return '<button type="button" class="gat-nu-dyn-upload-btn" data-doc-slot="' + esc(b.slot) + '" style="width:100%;background:' + b.bg + ';color:#fff;border:none;border-radius:11px;padding:11px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.16);text-align:center;">' +
                esc(b.label) + (b.done ? ' ✓' : '') +
              '</button>';
            }).join('');
        }
      }

      // 4. Render Shared Marriage Certificate Button (1 Upload Only for Both!)
      var marWrap = document.getElementById('gat-nu-marriage-wrap');
      if (marWrap) {
        if (curFKey === 'mr14b' || curFKey === 'nespach_alef' || (st.mapHas.marriage && !forceShowAll)) {
          marWrap.innerHTML = '';
        } else {
          marWrap.innerHTML =
            '<div style="font-size:0.77rem;font-weight:900;color:#4c1d95;margin-bottom:5px;">' + esc(dTxt.sharedMarriageLabel) + '</div>' +
            '<button type="button" class="gat-nu-dyn-upload-btn" data-doc-slot="marriage" style="width:100%;background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%);color:#fff;border:none;border-radius:11px;padding:11px 14px;font-size:0.86rem;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(124,58,237,0.25);text-align:center;">' +
              esc(dTxt.btn_marriage) + (st.mapHas.marriage ? ' ✓' : '') +
            '</button>';
        }
      }

      // Bind click events to all upload buttons (Redirect unpaid/guest users immediately to payment!)
      ov.querySelectorAll('.gat-nu-dyn-upload-btn').forEach(function(btn) {
        btn.onclick = async function() {
          if (typeof window.hasFormsEngineAccess === 'function' && !window.hasFormsEngineAccess()) {
            if (typeof window.verifyServerEntitlementBeforePaywall === 'function') {
              var unlockedLive = await window.verifyServerEntitlementBeforePaywall(window.hasFormsEngineAccess);
              if (unlockedLive) {
                activeSlot = btn.getAttribute('data-doc-slot') || 'passport';
                window._gatActiveUploadOwner = selectedParty;
                sharedInput.value = '';
                sharedInput.click();
                return;
              }
            }
            window.redirectToFormsPayment(dTxt.titleAllMissing.replace(/\{form\}/g, fDef.code));
            return;
          }
          activeSlot = btn.getAttribute('data-doc-slot') || 'passport';
          window._gatActiveUploadOwner = selectedParty;
          window._gatFilePickerOpenAt = Date.now();
          sharedInput.value = '';
          sharedInput.click();
        };
      });
    };

    renderInteractiveSections();

    var handleDocUpload = async function(fileOrList, slotKey, isAppendPage) {
      var fileArr = [];
      if (fileOrList && typeof fileOrList.length === 'number' && !fileOrList.name) {
        for (var fi = 0; fi < fileOrList.length; fi++) fileArr.push(fileOrList[fi]);
      } else if (fileOrList) {
        fileArr.push(fileOrList);
      }
      if (!fileArr.length) return;

      var targetOwner = selectedParty; // 'me' or 'partner'
      window._gatActiveUploadOwner = targetOwner;
      var whoLabel = targetOwner === 'partner' ? dTxt.forPartner : dTxt.forMe;

      var resBox = document.getElementById('gat-nu-scan-results');
      if (resBox) {
        resBox.style.display = 'block';
        resBox.innerHTML = '<div style="background:#f0f9ff;border:2px solid #0284c7;border-radius:10px;padding:12px;font-size:0.84rem;font-weight:800;color:#0369a1;text-align:center;">' +
          esc(dTxt.scanning) + (fileArr.length > 1 ? ' (' + fileArr.length + ' pages)' : '') +
        '</div>';
      }
      window._gatUploadInProgress = true;
      window.showGatUploadSpinner(dTxt.scanning + (fileArr.length > 1 ? ' (' + fileArr.length + ' pages)' : ''), 120);
      var abortCtrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var abortTimer = setTimeout(function() { if (abortCtrl) abortCtrl.abort(); }, 120000);
      try {
        var encodedFiles = [];
        if (typeof window.getExistingVaultPagesForSlot === 'function') {
          var prevPages = await window.getExistingVaultPagesForSlot(targetOwner, slotKey, isAppendPage);
          if (Array.isArray(prevPages) && prevPages.length > 0) {
            encodedFiles = prevPages.slice();
          }
        }
        var maxF = Math.min(fileArr.length, 6);
        for (var i = 0; i < maxF; i++) {
          var pItem = await window.fileToCompressedBase64(fileArr[i]);
          if (pItem && pItem.base64Data) encodedFiles.push(pItem);
          if (typeof window.updateGatUploadProgress === 'function') window.updateGatUploadProgress(10 + Math.round(((i + 1) / maxF) * 14));
        }
        if (typeof window.updateGatUploadProgress === 'function') window.updateGatUploadProgress(30);
        if (!encodedFiles.length) throw new Error('Could not read uploaded file(s).');

        var primaryPayload = encodedFiles[0];
        var fetchOpts = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mimeType: primaryPayload.mimeType,
            base64Data: primaryPayload.base64Data,
            files: encodedFiles,
            mode: 'audit_and_autofill',
            slotKey: slotKey,
            ownerParty: targetOwner,
            uid: window.gatUid || localStorage.getItem('gat_uid') || '',
            waPhone: localStorage.getItem('gat_verified_wa_phone') || localStorage.getItem('gat_wa_phone') || '',
            deviceAuthToken: localStorage.getItem('gat_device_auth_tok') || '',
            lang: l
          })
        };
        if (abortCtrl) fetchOpts.signal = abortCtrl.signal;
        var resp = await fetch((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://giyuraliyahtrack.com/api/auditDoc" : "/api/auditDoc"), fetchOpts);
        var data = await resp.json();
        if (typeof window.updateGatUploadProgress === 'function') window.updateGatUploadProgress(94);
        if (!resp.ok || !data || !data.ok || !data.result) {
          throw new Error((data && data.error) || 'Could not analyze document');
        }
        var r = data.result;
        if (typeof window.dedupeScannedDocsForOwnerSlot === 'function') {
          window.dedupeScannedDocsForOwnerSlot(targetOwner, slotKey || r.doc_type || '');
        }
        /* Vault save runs once with full contributedFields below */
        var d = loadDraft();
        var docContributedFields = {};
        var setField = function(k, v) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            var cleanV = String(v).trim();
            window.gatFormsState[k] = cleanV; d[k] = cleanV; docContributedFields[k] = cleanV;
          }
        };
        var setFieldIfEmpty = function(k, v) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            var cleanV = String(v).trim();
            var cur = window.gatFormsState[k] || d[k] || '';
            if (!String(cur).trim()) { window.gatFormsState[k] = cleanV; d[k] = cleanV; }
            docContributedFields[k] = cleanV;
          }
        };

        // Normalize AI response keys across all document types
        var normExpIso = r.expiry_date_iso || r.passport_expiry_date || '';
        var normIssIso = r.issue_date_iso || r.passport_issue_date || '';
        var normBirthPlaceHe = r.birth_country_city_he || r.country_or_city_of_birth || '';
        var normBirthPlaceEn = r.birth_country_city_en || '';
        var normCitHe = r.citizenship_he || r.citizenship || '';
        var normCitEn = r.citizenship_en || '';

        var rawDocType = String(r.doc_type || '') + ' ' + String(r.doc_title_detected || '') + ' ' + String(r.issuing_country || '');
        var rawIdDigits = String(r.israeli_id_number || r.teudat_zehut || r.id_number || '').replace(/\D/g, '');
        var passDigits = String(r.passport_number || '').replace(/\D/g, '');
        var isMarriageSlotOrDoc = slotKey === 'marriage' || /marriage|נישואין|mariage|matrimonio|heirat|брак/i.test(rawDocType) || !!r.marriage_date_iso || !!r.marriage_date_place_he;
        var isIsraeliTzDoc = !isMarriageSlotOrDoc && (
          slotKey === 'tz' ||
          /teudat|zehut|תעודת זהות|ספח|sefach|israeli_id|israeli id/i.test(rawDocType) ||
          (rawIdDigits.length === 9 && slotKey !== 'passport') ||
          (/israel|ישראל/i.test(rawDocType) && passDigits.length === 9 && !/passport|דרכון/i.test(rawDocType))
        );
        var detectedTzNum = rawIdDigits || (isIsraeliTzDoc ? passDigits : '');

        var alertsHtml = '';

        // ====================================================================
        // CASE 1: ISRAELI TEUDAT ZEHUT + UNFOLDED SEFACH (ת"ז + ספח מלא)
        // ====================================================================
        if (isIsraeliTzDoc) {
          var fullNameHe = [r.given_he, r.surname_he].filter(Boolean).join(' ').trim() || r.person_full_name || '';
          var isVisaSponsorForm = (curFKey === 'ash1' || curFKey === 'ash6' || curFKey === 'nespach_alef' || curFKey === 'ash3' || curFKey === 'ash456' || curFKey === 'sec_cv');
          var existingMePass = String((window.gatFormsState && window.gatFormsState.pf_pass_num) || d.pf_pass_num || '').trim();
          var existingMeDob = String((window.gatFormsState && window.gatFormsState.pf_dob) || d.pf_dob || '').trim();
          var tzLooksIsraeliCitizen = !/ארעי|א\/5|a\/5/i.test(rawDocType);
          if (targetOwner === 'me' && isVisaSponsorForm && tzLooksIsraeliCitizen && (curFKey === 'ash1' || curFKey === 'ash6' || curFKey === 'nespach_alef' || (existingMePass && existingMeDob && r.date_of_birth && existingMeDob !== r.date_of_birth))) {
            targetOwner = 'partner';
            window._gatActiveUploadOwner = 'partner';
          }
          var sefachAddr = r.israeli_address_he || '';
          var tzTitleL = String(r.doc_title_detected || '').toLowerCase(); var hasFullSefach = Boolean(!/\bfolded\b|partial|מקופל|חלקי/.test(tzTitleL) && sefachAddr && (r.has_full_sefach_visible === true || /\bunfolded\b|ספח פתוח|ספח מלא/.test(tzTitleL) || (Array.isArray(r.sefach_children) && r.sefach_children.length > 0)));
          var meAllowsTzHere = (curFKey === 'mr14a' || curFKey === 'sec_cv' || curFKey === 'mr14b' || curFKey === 'nespach_alef' || curFKey === 'ash6' || curFKey === 'ash3');

          if (targetOwner === 'me' && !meAllowsTzHere && slotKey === 'passport') {
            var wrongFormMsg = dTxt.tzWrongFormErr
              .replace(/\{form\}/g, fDef.code)
              .replace('{tz}', (detectedTzNum ? detectedTzNum + (fullNameHe ? ' — ' + fullNameHe : '') : fullNameHe || 'תעודת זהות'));
            alertsHtml += '<div style="background:#fef2f2;border:2.5px solid #dc2626;border-radius:11px;padding:12px 14px;margin-bottom:8px;color:#991b1b;font-size:0.82rem;font-weight:800;line-height:1.46;">' +
              esc(wrongFormMsg) +
            '</div>';
          } else {
            if (targetOwner === 'partner') {
              // Israeli Spouse / Inviter TZ + Sefach -> Populate ALL Partner & Shared Household fields across all 8 forms!
              setField('pf_sp_name_he', fullNameHe);
              setField('pf_sp_surname_he', r.surname_he);
              setField('pf_sp_given_he', r.given_he);
              setField('pf_sp_tz', detectedTzNum);
              setField('pf_sp_dob', r.date_of_birth);
              setField('pf_sp_citizenship_he', 'ישראלית');
              setField('pf_sp_birth_country_he', normBirthPlaceHe || 'ישראל');
              if (r.prior_or_maiden_names) setField('pf_sp_prior_he', r.prior_or_maiden_names);
              if (r.sefach_prior_given_he) setField('pf_sp_prior_given_he', r.sefach_prior_given_he);
              if (r.sefach_aliyah_date_iso || r.date_of_birth) {
                setFieldIfEmpty('pf_sp_entry_date', r.sefach_aliyah_date_iso || r.date_of_birth);
                setFieldIfEmpty('pf_sp_status_date', r.sefach_aliyah_date_iso || r.date_of_birth);
              }
              if (r.father_full_name) setField('pf_sp_father_he', r.father_full_name);
              if (r.mother_full_name) setField('pf_sp_mother_he', r.mother_full_name);
              if (r.paternal_grandfather_he) setField('pf_sp_grandfather_he', r.paternal_grandfather_he);
              if (r.date_of_birth || r.father_full_name || r.mother_full_name || r.paternal_grandfather_he) {
                var pgParts = [];
                if (r.date_of_birth) pgParts.push(fmtIsraeliDate(r.date_of_birth));
                if (r.father_full_name) pgParts.push('אב: ' + r.father_full_name);
                if (r.mother_full_name) pgParts.push('אם: ' + r.mother_full_name);
                if (r.paternal_grandfather_he) pgParts.push('סב: ' + r.paternal_grandfather_he);
                if (pgParts.length) setField('pf_sp_parents_grand', pgParts.join(' • '));
              }
              if (sefachAddr) {
                setField('pf_il_addr_he', sefachAddr);
                var addrP = sefachAddr.split(',').map(function(x){ return x.trim(); }).filter(Boolean);
                if (addrP.length >= 2) {
                  setFieldIfEmpty('pf_mail_city_he', addrP[addrP.length - 1].replace(/\b\d{5,7}\b/g, '').trim());
                  setFieldIfEmpty('pf_mail_street_he', addrP[0]);
                }
                setFieldIfEmpty('pf_mail_recipient_he', fullNameHe);
              }
              if (r.marriage_date_iso) {
                setFieldIfEmpty('pf_marriage_date', r.marriage_date_iso);
                setFieldIfEmpty('pf_marital', 'נשוי/אה');
              } else if (r.marital_he && /נשוי|נשואה/.test(r.marital_he)) {
                setFieldIfEmpty('pf_marital', 'נשוי/אה');
              }
            } else {
              // Primary Applicant Israeli TZ + Sefach (e.g. MR/14a, MR/14b, Security CV, A/5 renewal)
              setField('pf_tz', detectedTzNum);
              setField('pf_id_num', detectedTzNum);
              setField('pf_surname_he', r.surname_he);
              setField('pf_given_he', r.given_he);
              setField('pf_dob', r.date_of_birth);
              if (r.hebrew_date_of_birth) setField('pf_hebrew_dob', r.hebrew_date_of_birth);
              if (r.gender_he) setField('pf_gender', r.gender_he);
              if (r.marital_he) setField('pf_marital', r.marital_he);
              if (r.father_full_name) setField('pf_father_he', r.father_full_name);
              if (r.mother_full_name) setField('pf_mother_he', r.mother_full_name);
              if (r.paternal_grandfather_he) setField('pf_foreign_grandfather', r.paternal_grandfather_he);
              if (r.prior_or_maiden_names) {
                setField('pf_prior_names', r.prior_or_maiden_names);
                setField('pf_maiden_he', r.prior_or_maiden_names);
                setField('pf_maiden_surname_he', r.prior_or_maiden_names);
                setField('pf_prev_surname_he', r.prior_or_maiden_names);
              }
              if (r.sefach_prior_given_he) setField('pf_prev_given_he', r.sefach_prior_given_he);
              if (normBirthPlaceHe) {
                setFieldIfEmpty('pf_birth_country', normBirthPlaceHe);
                var bp = normBirthPlaceHe.split(',').map(function(x){ return x.trim(); }).filter(Boolean);
                if (bp.length >= 2) {
                  setFieldIfEmpty('pf_birth_city_he', bp[0]);
                  setFieldIfEmpty('pf_birth_country_he', bp[bp.length - 1]);
                } else {
                  setFieldIfEmpty('pf_birth_country_he', normBirthPlaceHe);
                }
              }
              if (sefachAddr) { setField('pf_il_addr_he', sefachAddr); setField('pf_address_il', sefachAddr); }
              if (r.marriage_date_iso) setField('pf_marriage_date', r.marriage_date_iso);
              if (curFKey === 'ash6' || curFKey === 'ash1' || curFKey === 'nespach_alef' || curFKey === 'ash3') {
                setFieldIfEmpty('pf_sp_tz', detectedTzNum); setFieldIfEmpty('pf_sp_name_he', fullNameHe);
                setFieldIfEmpty('pf_sp_surname_he', r.surname_he); setFieldIfEmpty('pf_sp_given_he', r.given_he);
                setFieldIfEmpty('pf_sp_dob', r.date_of_birth); setFieldIfEmpty('pf_sp_citizenship_he', 'ישראלית');
                if (r.father_full_name) setFieldIfEmpty('pf_sp_father_he', r.father_full_name);
                if (r.mother_full_name) setFieldIfEmpty('pf_sp_mother_he', r.mother_full_name);
              }
              if (r.spouse_full_name_he && r.spouse_full_name_he !== fullNameHe) setFieldIfEmpty('pf_sp_name_he', r.spouse_full_name_he);
              if (r.spouse_surname_he) setFieldIfEmpty('pf_sp_surname_he', r.spouse_surname_he);
              if (r.spouse_given_he) setFieldIfEmpty('pf_sp_given_he', r.spouse_given_he);
              if (r.spouse_tz && /^\d{5,9}$/.test(String(r.spouse_tz).replace(/\D/g, ''))) setFieldIfEmpty('pf_sp_tz', String(r.spouse_tz).replace(/\D/g, ''));
              if (r.spouse_dob_iso) setFieldIfEmpty('pf_sp_dob', r.spouse_dob_iso);
            }

            // Populate Children from Sefach across all forms (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a)
            if (Array.isArray(r.sefach_children) && r.sefach_children.length > 0) {
              var mappedKids = r.sefach_children.map(function(ch) {
                return {
                  id_num: String(ch.tz || '').replace(/\D/g, ''),
                  tz: String(ch.tz || '').replace(/\D/g, ''),
                  surname_he: ch.surname_he || r.surname_he || '',
                  given_he: ch.given_he || '',
                  given: (ch.given_en && !/[\u0590-\u05FF]/.test(ch.given_en)) ? String(ch.given_en).toUpperCase().trim() : '',
                  other_parent_he: fullNameHe,
                  country: 'ישראל',
                  country_en: 'ISRAEL',
                  dob: ch.dob_iso || '',
                  gender: ch.gender_he || 'זכר'
                };
              }).filter(function(ch) { return ch.given_he || ch.id_num; });
              if (mappedKids.length > 0) {
                window.gatFormsState.pf_children_rows = mappedKids;
                d.pf_children_rows = mappedKids;
                var kidSummaryLines = mappedKids.map(function(k) {
                  return [k.given_he, k.surname_he, k.id_num, k.dob ? fmtIsraeliDate(k.dob) : ''].filter(Boolean).join(' • ');
                }).join('\n');
                setField('pf_children_table', kidSummaryLines);
                setField('pf_ll_children_count', String(mappedKids.length));
              }
            }

            var tzExpIso = normExpIso;
            var isTzExpired = false;
            if (/^\d{4}-\d{2}-\d{2}$/.test(tzExpIso)) {
              isTzExpired = new Date(tzExpIso).getTime() < Date.now();
            }
            var roleLbl = targetOwner === 'partner' ? dTxt.roleSpouse : dTxt.roleApplicant;
            if (isTzExpired) {
              var tzExpMsg = dTxt.tzExpErr
                .replace('{role}', roleLbl)
                .replace('{tz}', detectedTzNum + (fullNameHe ? ' — ' + fullNameHe : ''))
                .replace('{exp}', fmtIsraeliDate(tzExpIso))
                .replace('{addr}', sefachAddr || '—');
              alertsHtml += '<div style="background:#fef2f2;border:2.5px solid #dc2626;border-radius:11px;padding:12px 14px;margin-bottom:8px;color:#991b1b;font-size:0.82rem;font-weight:800;line-height:1.46;">' +
                esc(tzExpMsg) +
              '</div>';
            } else {
              var tzOkMsg = dTxt.tzOk
                .replace('{tz}', detectedTzNum + (fullNameHe ? ' — ' + fullNameHe : ''))
                .replace('{role}', roleLbl + (sefachAddr ? ': ' + sefachAddr : ''));
              alertsHtml += '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#166534;font-size:0.83rem;font-weight:900;">' +
                esc(tzOkMsg) +
              '</div>';
            }

            // Warn if the unfolded paper Sefach (ספח) was not included in the upload!
            if (!hasFullSefach || !sefachAddr) {
              var xAl = FV_EXTRA_ALERTS_I18N[l] || FV_EXTRA_ALERTS_I18N.en;
              var sefachWarnTitle = xAl.sefachTitle;
              var sefachWarnBody = xAl.sefachBody;
              var sefachBtnLbl = xAl.sefachBtn;
              alertsHtml += '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:11px;padding:11px 13px;margin-bottom:8px;color:#92400e;font-size:0.81rem;font-weight:800;line-height:1.45;">' +
                '<div style="font-weight:900;color:#b45309;margin-bottom:4px;">' + esc(sefachWarnTitle) + '</div>' +
                '<div>' + esc(sefachWarnBody) + '</div>' +
                '<button type="button" onclick="document.getElementById(\'gat-nu-file-inp\').click()" style="margin-top:8px;width:100%;background:#d97706;color:#fff;border:none;border-radius:8px;padding:8px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(sefachBtnLbl) + '</button>' +
              '</div>';
            }
          }
        } else {
          // ====================================================================
          // CASE 2: FOREIGN PASSPORT, BIRTH CERTIFICATE, OR MARRIAGE CERTIFICATE
          // ====================================================================
          var isMarriage = isMarriageSlotOrDoc;
          var isBirth = !isMarriage && (slotKey === 'birth' || (r.doc_type && /birth/i.test(r.doc_type)));
          var isPassport = !isMarriage && !isBirth && (slotKey === 'passport' || (r.doc_type && /passport/i.test(r.doc_type)) || !!r.passport_number);

          // ------------------------------------------------------------------
          // 2A. FOREIGN PASSPORT (MY PASSPORT vs. PARTNER'S PASSPORT)
          // ------------------------------------------------------------------
          if (isPassport) {
            var cleanPassNum = String(r.passport_number || '').trim().toUpperCase();
            if (targetOwner === 'partner') {
              // Strictly populate Partner / Spouse (`pf_sp_*`) fields and NEVER write Partner's passport into `pf_pass_num` ("Me")!
              setField('pf_sp_surname_en', r.surname_en); setField('pf_sp_given_en', r.given_en);
              setField('pf_sp_surname_he', r.surname_he); setField('pf_sp_given_he', r.given_he);
              var spFullHe = [r.given_he, r.surname_he].filter(Boolean).join(' ').trim() || [r.given_en, r.surname_en].filter(Boolean).join(' ').trim();
              setField('pf_sp_name_he', spFullHe); setField('pf_sp_dob', r.date_of_birth);
              setField('pf_sp_pass_num', cleanPassNum); setField('pf_sp_pass_issue', normIssIso); setField('pf_sp_pass_exp', normExpIso);
              setField('pf_sp_citizenship_he', normCitHe); setField('pf_sp_foreign_cit_details_he', normCitHe);
              setField('pf_sp_birth_country_he', normBirthPlaceHe);
              if (r.prior_or_maiden_names) setFieldIfEmpty('pf_sp_prior_he', r.prior_or_maiden_names);
              if (window.gatFormsState.pf_sp_tz && !/^\d{5,9}$/.test(String(window.gatFormsState.pf_sp_tz).trim())) {
                delete window.gatFormsState.pf_sp_tz; delete d.pf_sp_tz;
              }
            } else {
              // MY FOREIGN PASSPORT (PRIMARY APPLICANT)
              setField('pf_surname_en', r.surname_en);
              setField('pf_given_en', r.given_en);
              setField('pf_surname_he', r.surname_he || r.surname_en);
              setField('pf_given_he', r.given_he || r.given_en);
              setField('pf_dob', r.date_of_birth);
              setField('pf_pass_num', cleanPassNum);
              setField('pf_pass_issue_date', normIssIso);
              setField('pf_pass_exp_date', normExpIso);
              setField('pf_birth_country', normBirthPlaceHe);
              if (normBirthPlaceEn) setField('pf_birth_country_en', normBirthPlaceEn);
              if (normBirthPlaceHe) {
                var bPartsP = normBirthPlaceHe.split(',').map(function(x){ return x.trim(); }).filter(Boolean);
                if (bPartsP.length >= 2) {
                  setFieldIfEmpty('pf_birth_city_he', bPartsP[0]);
                  setFieldIfEmpty('pf_birth_country_he', bPartsP[bPartsP.length - 1]);
                } else {
                  setFieldIfEmpty('pf_birth_country_he', normBirthPlaceHe);
                }
              }
              setField('pf_citizenship', normCitHe);
              if (normCitEn) setField('pf_citizenship_en', normCitEn);
              if (r.gender_he) setFieldIfEmpty('pf_gender', r.gender_he);
            }

            var expIso = normExpIso;
            var reqMonths = (fDef && fDef.minPassM) ? fDef.minPassM : 12;
            var monthsLeft = null;
            if (/^\d{4}-\d{2}-\d{2}$/.test(expIso)) {
              monthsLeft = Math.round(((new Date(expIso).getTime() - Date.now()) / (86400000 * 30.44)) * 10) / 10;
            }
            if (monthsLeft !== null && monthsLeft < reqMonths) {
              var errMsg = dTxt.passExpErr.replace('{who}', whoLabel).replace('{m}', Math.max(0, Math.floor(monthsLeft))).replace('{exp}', fmtIsraeliDate(expIso)).replace('{reqM}', reqMonths);
              alertsHtml += '<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#991b1b;font-size:0.82rem;font-weight:800;line-height:1.45;">' +
                esc(errMsg) +
                '<div style="margin-top:7px;"><a href="#mod-checklists" onclick="window.openGatChecklistsGuide()" style="color:#b91c1c;text-decoration:underline;font-weight:900;">' + esc(dTxt.passGuide) + '</a></div>' +
              '</div>';
            } else {
              alertsHtml += '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#166534;font-size:0.83rem;font-weight:900;">' + esc(dTxt.passOk.replace('{who}', whoLabel)) + '</div>';
            }
          }

          // ------------------------------------------------------------------
          // 2B. BIRTH CERTIFICATE (MY BIRTH CERT vs. PARTNER'S BIRTH CERT)
          // ------------------------------------------------------------------
          if (isBirth) {
            if (targetOwner === 'partner') {
              var spBirthNameHe = [r.given_he, r.surname_he].filter(Boolean).join(' ').trim();
              if (spBirthNameHe && !window.gatFormsState.pf_sp_name_he) setField('pf_sp_name_he', spBirthNameHe);
              setFieldIfEmpty('pf_sp_surname_he', r.surname_he);
              setFieldIfEmpty('pf_sp_given_he', r.given_he);
              setFieldIfEmpty('pf_sp_surname_en', r.surname_en);
              setFieldIfEmpty('pf_sp_given_en', r.given_en);
              setField('pf_sp_dob', r.date_of_birth);
              setField('pf_sp_birth_country_he', normBirthPlaceHe);
              setField('pf_sp_prior_he', r.prior_or_maiden_names);
              if (r.father_full_name) setField('pf_sp_father_he', r.father_full_name);
              if (r.mother_full_name) setField('pf_sp_mother_he', r.mother_full_name);
              if (r.paternal_grandfather_he) setField('pf_sp_grandfather_he', r.paternal_grandfather_he);
              if (r.date_of_birth || r.father_full_name || r.mother_full_name || r.paternal_grandfather_he) {
                var spPgB = [];
                if (r.date_of_birth) spPgB.push(fmtIsraeliDate(r.date_of_birth));
                if (r.father_full_name) spPgB.push('אב: ' + r.father_full_name);
                if (r.mother_full_name) spPgB.push('אם: ' + r.mother_full_name);
                if (r.paternal_grandfather_he) spPgB.push('סב: ' + r.paternal_grandfather_he);
                if (spPgB.length) setField('pf_sp_parents_grand', spPgB.join(' • '));
              }
            } else {
              setField('pf_surname_he', r.surname_he || window.gatFormsState.pf_surname_he);
              setField('pf_given_he', r.given_he || window.gatFormsState.pf_given_he);
              setFieldIfEmpty('pf_surname_en', r.surname_en);
              setFieldIfEmpty('pf_given_en', r.given_en);
              setField('pf_prior_names', r.prior_or_maiden_names);
              if (r.prior_names_en) setField('pf_prior_names_en', r.prior_names_en);
              if (r.prior_or_maiden_names) {
                setFieldIfEmpty('pf_maiden_he', r.prior_or_maiden_names);
                setFieldIfEmpty('pf_maiden_surname_he', r.prior_or_maiden_names);
                setFieldIfEmpty('pf_prev_surname_he', r.prior_or_maiden_names);
              }
              setField('pf_dob', r.date_of_birth);
              setField('pf_father_he', r.father_full_name);
              if (r.father_full_name_en) setField('pf_father_en', r.father_full_name_en);
              if (r.father_dob_iso) setFieldIfEmpty('pf_father_dob', r.father_dob_iso);
              setField('pf_mother_he', r.mother_full_name);
              if (r.mother_full_name_en) setField('pf_mother_en', r.mother_full_name_en);
              if (r.mother_dob_iso) setFieldIfEmpty('pf_mother_dob', r.mother_dob_iso);
              if (r.mother_maiden_name_he) setField('pf_mother_maiden', r.mother_maiden_name_he);
              if (r.paternal_grandfather_he) setField('pf_foreign_grandfather', r.paternal_grandfather_he);
              setField('pf_birth_country', normBirthPlaceHe);
            }

            var hasBothParents = (r.is_long_form_both_parents !== false) && (!!r.father_full_name && !!r.mother_full_name);
            if (!hasBothParents) {
              alertsHtml += '<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#991b1b;font-size:0.82rem;font-weight:800;line-height:1.45;">' +
                esc(dTxt.birthHalfErr.replace('{who}', whoLabel)) +
                '<div style="margin-top:7px;"><a href="#mod-checklists" onclick="window.openGatChecklistsGuide()" style="color:#b91c1c;text-decoration:underline;font-weight:900;">' + esc(dTxt.birthGuide) + '</a></div>' +
              '</div>';
            } else {
              alertsHtml += '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#166534;font-size:0.83rem;font-weight:900;">' + esc(dTxt.birthOk.replace('{who}', whoLabel)) + '</div>';
            }
            if (r.has_apostille_visible === false) {
              var countryName = r.issuing_country || 'Issuing Country';
              var authMsgTpl = (r.authentication_regime === 'consular_chain' && dTxt.consularWarn) ? dTxt.consularWarn : dTxt.aposWarn;
              var authMsg = authMsgTpl.replace(/\{country\}/g, countryName);
              alertsHtml += '<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:10px;padding:10px 12px;margin-bottom:8px;color:#92400e;font-size:0.8rem;font-weight:800;line-height:1.42;">' +
                esc(authMsg) +
                '<button type="button" onclick="document.getElementById(\'gat-nu-file-inp\').click()" style="margin-top:7px;width:100%;background:#d97706;color:#fff;border:none;border-radius:8px;padding:7px 11px;font-size:0.79rem;font-weight:900;cursor:pointer;">➕ Upload Apostille / Back Page Now</button>' +
                '<div style="margin-top:5px;"><a href="#mod-checklists" onclick="window.openGatChecklistsGuide()" style="color:#b45309;text-decoration:underline;font-weight:900;">' + esc(dTxt.birthGuide) + '</a></div>' +
              '</div>';
            }
          }

          // ------------------------------------------------------------------
          // 2B-2. POLICE / CRIMINAL RECORD OR SINGLE-STATUS CERTIFICATE (<180d)
          // ------------------------------------------------------------------
          var isPoliceOrSingle = !isMarriage && !isBirth && !isPassport && (/police|criminal|fbi|acro|rcmp|יושר|פלילי|single|רווקות|פנויות/i.test(rawDocType) || slotKey === 'police' || slotKey === 'single');
          if (isPoliceOrSingle && targetOwner !== 'partner' && normIssIso) {
            setField('pf_police_issue_date', normIssIso);
          }
          var isConversionOrJewishDoc = !isMarriage && (/conversion|hamara|hamará|תעודת המרה|אישור גיור|גיור|rabbinic|יהדות|conversión|konversion|гиюр/i.test(rawDocType + ' ' + String(r.doc_title_detected || '')) || slotKey === 'conversion');
          if (isConversionOrJewishDoc && targetOwner !== 'partner') {
            var isFemC = /נקבה|female/i.test(String(window.gatFormsState.pf_gender || r.gender_he || 'נקבה'));
            var jewStrHe = isFemC ? 'יהודייה' : 'יהודי';
            setField('pf_religion_nat', jewStrHe + ' • ' + jewStrHe);
            setField('pf_religion_en', 'JEWISH');
            setField('pf_nationality_en', 'JEWISH');
            setFieldIfEmpty('pf_456_shvut', 'סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר');
          }

          // ------------------------------------------------------------------
          // 2C. MARRIAGE CERTIFICATE (AUTO-FILLS BOTH PARTIES + MULTI-PAGE & APOSTILLE GATE)
          // ------------------------------------------------------------------
          if (isMarriage) {
            setField('pf_marital', 'נשוי/אה');
            var marDateIso = r.marriage_date_iso || '';
            if (!marDateIso && r.marriage_date_place_he) {
              var mDateMatch = String(r.marriage_date_place_he).match(/(\d{2})[\/.\-](\d{2})[\/.\-](\d{4})/);
              if (mDateMatch) marDateIso = mDateMatch[3] + '-' + mDateMatch[2] + '-' + mDateMatch[1];
            }
            var marPlaceHe = r.marriage_place_he || String(r.marriage_date_place_he || '').replace(/\d{1,4}[\/.\-]\d{1,2}[\/.\-]\d{1,4}/g, '').replace(/^[•\-\s,]+|[•\-\s,]+$/g, '').trim() || '';

            if (marDateIso) setField('pf_marriage_date', marDateIso);
            if (marPlaceHe) setField('pf_marriage_place_he', marPlaceHe);
            var combinedMar = [marDateIso ? fmtIsraeliDate(marDateIso) : '', marPlaceHe].filter(Boolean).join(' • ');
            if (combinedMar) setField('pf_marriage_details', combinedMar);

            // Smart-match Party 1 & Party 2 between Primary Applicant (pf_*) and Spouse/Partner (pf_sp_*)
            var p1 = r.marriage_party1 || {};
            var p2 = r.marriage_party2 || {};
            var hasP1 = Boolean(p1.surname_he || p1.given_he || p1.surname_en || p1.given_en);
            var hasP2 = Boolean(p2.surname_he || p2.given_he || p2.surname_en || p2.given_en);
            if (!hasP1 && (r.surname_he || r.given_he || r.surname_en || r.given_en)) {
              p1 = {
                surname_en: r.surname_en || '',
                given_en: r.given_en || '',
                surname_he: r.surname_he || '',
                given_he: r.given_he || '',
                prior_surname_he: r.prior_or_maiden_names || '',
                dob_iso: r.date_of_birth || '',
                father_he: r.father_full_name || '',
                mother_he: r.mother_full_name || '',
                israeli_tz: rawIdDigits.length === 9 ? rawIdDigits : '',
                passport_number: r.passport_number || '',
                citizenship_he: normCitHe,
                birth_place_he: normBirthPlaceHe
              };
              hasP1 = true;
            }
            if (!hasP2 && (r.spouse_full_name_he || r.spouse_surname_he || r.spouse_given_he || r.spouse_surname_en || r.spouse_given_en)) {
              var spSplit = String(r.spouse_full_name_he || '').trim().split(/\s+/);
              p2 = {
                surname_en: r.spouse_surname_en || '',
                given_en: r.spouse_given_en || '',
                surname_he: r.spouse_surname_he || (spSplit.length > 1 ? spSplit.slice(-1).join(' ') : ''),
                given_he: r.spouse_given_he || (spSplit.length > 1 ? spSplit.slice(0, -1).join(' ') : (r.spouse_full_name_he || '')),
                prior_surname_he: r.spouse_prior_surname_he || '',
                dob_iso: r.spouse_dob_iso || '',
                father_he: r.spouse_father_he || '',
                mother_he: r.spouse_mother_he || '',
                israeli_tz: (r.spouse_tz && /^\d{5,9}$/.test(String(r.spouse_tz).replace(/\D/g, ''))) ? String(r.spouse_tz).replace(/\D/g, '') : '',
                passport_number: r.spouse_passport_number || ''
              };
              hasP2 = true;
            }

            // Decide which party is Applicant (`appParty`) and which is Spouse (`spParty`)
            var appParty = p1, spParty = p2;
            var curAppName = ([window.gatFormsState.pf_given_en, window.gatFormsState.pf_surname_en, window.gatFormsState.pf_given_he, window.gatFormsState.pf_surname_he].filter(Boolean).join(' ')).toLowerCase();
            var curSpName = ([window.gatFormsState.pf_sp_name_he, window.gatFormsState.pf_sp_given_en, window.gatFormsState.pf_sp_surname_en].filter(Boolean).join(' ')).toLowerCase();
            var p1Str = ([p1.given_en, p1.surname_en, p1.given_he, p1.surname_he].filter(Boolean).join(' ')).toLowerCase();
            var p2Str = ([p2.given_en, p2.surname_en, p2.given_he, p2.surname_he].filter(Boolean).join(' ')).toLowerCase();

            var p1Cit = String(p1.citizenship_he || '').toLowerCase();
            var p2Cit = String(p2.citizenship_he || '').toLowerCase();
            var p1IsIl = Boolean(p1.israeli_tz || /ישראל|israel/.test(p1Cit));
            var p2IsIl = Boolean(p2.israeli_tz || /ישראל|israel/.test(p2Cit));
            if (
              (p1IsIl && !p2IsIl && curFKey !== 'mr14a' && curFKey !== 'mr14b') ||
              (curAppName && p2.given_en && curAppName.indexOf(p2.given_en.toLowerCase()) !== -1) ||
              (curAppName && p2.given_he && curAppName.indexOf(p2.given_he.toLowerCase()) !== -1) ||
              (curSpName && p1.given_he && curSpName.indexOf(p1.given_he.toLowerCase()) !== -1) ||
              (curSpName && p1.given_en && curSpName.indexOf(p1.given_en.toLowerCase()) !== -1)
            ) {
              appParty = p2;
              spParty = p1;
            }

            var appOverwrite = Boolean(spParty && spParty.surname_he && window.gatFormsState.pf_surname_he === spParty.surname_he && !window.gatFormsState.pf_pass_num);
            var setAppFn = appOverwrite ? setField : setFieldIfEmpty;
            if (appParty) {
              if (appParty.surname_en) setAppFn('pf_surname_en', appParty.surname_en);
              if (appParty.given_en) setAppFn('pf_given_en', appParty.given_en);
              if (appParty.surname_he) setAppFn('pf_surname_he', appParty.surname_he);
              if (appParty.given_he) setAppFn('pf_given_he', appParty.given_he);
              if (appParty.dob_iso) setAppFn('pf_dob', appParty.dob_iso);
              if (appParty.father_he) setField('pf_father_he', appParty.father_he);
              if (appParty.mother_he) setField('pf_mother_he', appParty.mother_he);
              if (appParty.passport_number) setAppFn('pf_pass_num', appParty.passport_number);
              if (appParty.citizenship_he) setAppFn('pf_citizenship', appParty.citizenship_he);
              if (appParty.birth_place_he) setAppFn('pf_birth_country', appParty.birth_place_he);
              if (appParty.prior_surname_he || r.prior_or_maiden_names) {
                var prName = appParty.prior_surname_he || r.prior_or_maiden_names;
                setField('pf_prior_names', prName); setField('pf_maiden_he', prName);
                setField('pf_maiden_surname_he', prName); setField('pf_prev_surname_he', prName);
              }
            }

            // Populate Spouse / Partner fields from `spParty`
            if (spParty) {
              var spCombinedHe = [spParty.given_he, spParty.surname_he].filter(Boolean).join(' ').trim() || r.spouse_full_name_he || [spParty.given_en, spParty.surname_en].filter(Boolean).join(' ').trim();
              if (spCombinedHe) setField('pf_sp_name_he', spCombinedHe);
              if (spParty.surname_he) setField('pf_sp_surname_he', spParty.surname_he);
              if (spParty.given_he) setField('pf_sp_given_he', spParty.given_he);
              if (spParty.surname_en) setField('pf_sp_surname_en', spParty.surname_en);
              if (spParty.given_en) setField('pf_sp_given_en', spParty.given_en);
              if (spParty.dob_iso) setField('pf_sp_dob', spParty.dob_iso);
              if (spParty.prior_surname_he) setField('pf_sp_prior_he', spParty.prior_surname_he);
              if (spParty.israeli_tz && /^\d{5,9}$/.test(String(spParty.israeli_tz).replace(/\D/g, ''))) {
                setField('pf_sp_tz', String(spParty.israeli_tz).replace(/\D/g, ''));
              }
              if (spParty.passport_number) setField('pf_sp_pass_num', spParty.passport_number);
              if (spParty.citizenship_he) setFieldIfEmpty('pf_sp_citizenship_he', spParty.citizenship_he);
              if (spParty.birth_place_he) setFieldIfEmpty('pf_sp_birth_country_he', spParty.birth_place_he);
              if (spParty.father_he) setFieldIfEmpty('pf_sp_father_he', spParty.father_he);
              if (spParty.mother_he) setFieldIfEmpty('pf_sp_mother_he', spParty.mother_he);
            }

            if (r.is_complete !== false && r.has_underlying_certificate_body !== false && marDateIso && (isIsraeliMarriage || r.has_apostille_visible === true)) {
              alertsHtml += '<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:11px 13px;margin-bottom:8px;color:#166534;font-size:0.83rem;font-weight:900;">' +
                esc(dTxt.marriageOk) +
                (combinedMar ? '<div style="margin-top:4px;font-size:0.78rem;color:#15803d;">💍 ' + esc(combinedMar) + '</div>' : '') +
              '</div>';
            }

            // Check 1: Multi-Page Marriage Certificate Completeness Warning
            var xAlM = FV_EXTRA_ALERTS_I18N[l] || FV_EXTRA_ALERTS_I18N.en;
            if (r.looks_incomplete_multipage) {
              var mpTitle = xAlM.mpTitle;
              var mpBody = xAlM.mpBody;
              alertsHtml += '<div style="background:#eff6ff;border:2px solid #0284c7;border-radius:10px;padding:10px 12px;margin-bottom:8px;color:#1e3a8a;font-size:0.8rem;font-weight:800;line-height:1.42;">' +
                '<div style="font-weight:900;margin-bottom:3px;">' + esc(mpTitle) + '</div>' +
                '<div>' + esc(mpBody) + '</div>' +
                '<button type="button" onclick="document.getElementById(\'gat-nu-shared-file-input\').click()" style="margin-top:7px;width:100%;background:#0284c7;color:#fff;border:none;border-radius:8px;padding:8px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(xAlM.mpBtn) + '</button>' +
              '</div>';
            }

            // Check 2: Mandatory Misrad HaPanim Apostille / Consular Chain Verification
            var isIsraeliMarriage = /israel|ישראל|רבנות/i.test(String(r.issuing_country || '') + ' ' + marPlaceHe);
            if (!isIsraeliMarriage && r.has_apostille_visible !== true) {
              var marCountryName = r.issuing_country || marPlaceHe || '';
              var marAuthTpl = (r.authentication_regime === 'consular_chain' && dTxt.consularWarn) ? dTxt.consularWarn : dTxt.aposWarn;
              var marAuthMsg = marAuthTpl.replace(/\{country\}/g, marCountryName);
              var aposBannerTitle = xAlM.marAposTitle;
              var aposBtnText = xAlM.marAposBtn;
              alertsHtml += '<div style="background:#fef2f2;border:2.5px solid #dc2626;border-radius:11px;padding:11px 13px;margin-bottom:8px;color:#991b1b;font-size:0.81rem;font-weight:800;line-height:1.45;">' +
                '<div style="font-weight:900;color:#b91c1c;margin-bottom:4px;">' + esc(aposBannerTitle) + '</div>' +
                '<div>' + esc(marAuthMsg) + '</div>' +
                '<button type="button" onclick="document.getElementById(\'gat-nu-file-inp\').click()" style="margin-top:8px;width:100%;background:#dc2626;color:#fff;border:none;border-radius:8px;padding:8px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(aposBtnText) + '</button>' +
                '<div style="margin-top:6px;"><a href="#mod-checklists" onclick="window.openGatChecklistsGuide()" style="color:#b91c1c;text-decoration:underline;font-weight:900;">' + esc(dTxt.marriageGuide || dTxt.birthGuide) + '</a></div>' +
              '</div>';
            }
          }
        }

        var INC_BANNER_I18N = {
          en: {
            sefachFallback: 'Folded / Partial Sefach (ספח): Only part of the paper Sefach is visible. Misrad HaPanim requires all 6–8 unfolded squares (Address, Marital Status, Spouse Name/ID, and the unfolded Children grid) + the main ID card.',
            hdr: '🛑 FLAGGED INCOMPLETE IN VAULT — CLERK REJECTION RISK:',
            sub: '💾 Saved to your Vault as ⚠️ INCOMPLETE. Upload the unfolded/missing page below to clear this warning:',
            btn: '➕ Add Missing Page / Unfolded Sefach Now'
          },
          he: {
            sefachFallback: 'ספח תעודת זהות מקופל או חלקי: רק חלק מהספח גלוי. משרד הפנים דורש צילום של כל 6–8 המשבצות בספח פתוח לחלוטין (כתובת, מצב אישי, בן/בת זוג וילדים) + תעודת הזהות.',
            hdr: '🛑 סומן כמסמך חסר / חלקי בכספת — סיכון לדחייה על הסף בלשכה:',
            sub: '💾 נשמר בכספת המסמכים שלכם תחת אזהרת ⚠️ חסר/חלקי. העלו את העמוד החסר או הספח הפתוח כעת כדי להסיר את האזהרה:',
            btn: '➕ הוספת עמוד חסר / ספח פתוח כעת'
          },
          fr: {
            sefachFallback: 'Sefach plié ou partiel (ספח) : Seule une partie du Sefach est visible. Le Misrad HaPanim exige les 6 à 8 cases entièrement dépliées + la carte d’identité.',
            hdr: '🛑 DOCUMENT SIGNALÉ INCOMPLET — RISQUE DE REJET AU GUICHET :',
            sub: '💾 Enregistré dans votre Coffre comme ⚠️ INCOMPLET. Téléversez la page manquante ou le Sefach déplié ci-dessous :',
            btn: '➕ Ajouter la Page Manquante / Sefach Déplié'
          },
          es: {
            sefachFallback: 'Sefaj doblado o parcial (ספח): Solo una parte del Sefaj es visible. Misrad HaPanim exige las 6–8 casillas completamente desplegadas + el documento de identidad.',
            hdr: '🛑 MARCADO COMO INCOMPLETO EN LA BÓVEDA — RIESGO DE RECHAZO:',
            sub: '💾 Guardado en su Bóveda como ⚠️ INCOMPLETO. Suba la página faltante o el Sefaj desplegado a continuación:',
            btn: '➕ Añadir Página Faltante / Sefaj Desplegado'
          },
          de: {
            sefachFallback: 'Gefalteter / unvollständiger Sefach (ספח): Nur ein Teil des Sefach ist sichtbar. Misrad HaPanim verlangt alle 6–8 aufgeklappten Felder + den Hauptausweis.',
            hdr: '🛑 IM TRESOR ALS UNVOLLSTÄNDIG MARKIERT — ABLEHNUNGSRISIKO:',
            sub: '💾 In Ihrem Tresor als ⚠️ UNVOLLSTÄNDIG gespeichert. Laden Sie unten die fehlende Seite oder den aufgeklappten Sefach hoch:',
            btn: '➕ Fehlende Seite / Aufgeklappten Sefach Hinzufügen'
          },
          ru: {
            sefachFallback: 'Сложенный / неполный Сефах (ספח): Видна только часть вкладыша. МВД требует полностью развернутый Сефах (все 6–8 секций) + основное удостоверение.',
            hdr: '🛑 ДОКУМЕНТ ПОМЕЧЕН КАК НЕПОЛНЫЙ — РИСК ОТКАЗА В МВД:',
            sub: '💾 Сохранено в Хранилище со статусом ⚠️ НЕПОЛНЫЙ. Загрузите недостающую страницу или развернутый Сефах ниже:',
            btn: '➕ Добавить недостающую страницу / развернутый Сефах'
          }
        };
        var ibTxt = INC_BANNER_I18N[l] || INC_BANNER_I18N.en;
        var incompleteReasonsList = Array.isArray(r && r.incomplete_reasons) ? r.incomplete_reasons.slice() : [];
        if (isIsraeliTzDoc && (!hasFullSefach || !sefachAddr) && !incompleteReasonsList.length) {
          incompleteReasonsList.push(ibTxt.sefachFallback);
        }
        var docIsComplete = (r && r.is_complete === false) ? false : (incompleteReasonsList.length === 0);
        if (incompleteReasonsList.length > 0) {
          alertsHtml = '<div style="background:#fef2f2;border:2.5px solid #dc2626;border-radius:12px;padding:12px 14px;margin-bottom:10px;color:#991b1b;font-size:0.82rem;font-weight:800;line-height:1.45;">' +
            '<div style="font-size:0.9rem;font-weight:900;color:#b91c1c;margin-bottom:6px;">' + esc(ibTxt.hdr) + '</div>' +
            '<ul style="margin:0 0 8px 18px;padding:0;">' + incompleteReasonsList.map(function(rsn) { return '<li style="margin-bottom:4px;">' + esc(rsn) + '</li>'; }).join('') + '</ul>' +
            '<div style="font-size:0.76rem;color:#7f1d1d;background:#fee2e2;padding:7px 10px;border-radius:8px;margin-bottom:8px;">' + esc(ibTxt.sub) + '</div>' +
            '<button type="button" onclick="window.triggerGatVaultUpload(\'' + esc((targetOwner || 'me') + '_' + (slotKey || 'doc')) + '\', true)" style="width:100%;background:#dc2626;color:#fff;border:none;border-radius:8px;padding:9px 12px;font-size:0.81rem;font-weight:900;cursor:pointer;">' + esc(ibTxt.btn) + '</button>' +
          '</div>' + alertsHtml;
        }
        try {
          if (typeof window.saveScannedDocToVault === 'function' && encodedFiles && encodedFiles.length) {
            await window.saveScannedDocToVault({
              docId: (targetOwner || 'me') + '_' + (slotKey || 'doc'),
              slotKey: slotKey || 'doc',
              ownerParty: targetOwner || 'me',
              docType: (r && r.doc_type) || slotKey || 'certificate',
              docTitle: (r && r.doc_title_detected) || ((targetOwner === 'partner' ? 'Partner ' : 'My ') + String(slotKey || 'Document').toUpperCase()),
              issuingCountry: (r && r.issuing_country) || '',
              isComplete: docIsComplete,
              incompleteReasons: incompleteReasonsList,
              hasApostille: Boolean(r && r.has_apostille_visible === true),
              hasSefach: Boolean(isIsraeliTzDoc ? hasFullSefach : true),
              isLongForm: Boolean(r && r.is_long_form_both_parents !== false),
              expiryDateIso: (r && (r.expiry_date_iso || r.passport_expiry_date)) || '',
              contributedFields: docContributedFields,
              rawScanResult: r
            }, encodedFiles, isAppendPage);
          }
        } catch (vErr) {}
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) {}
        if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);
        if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
        renderBody();
        renderMasterDossierBar();
        renderInteractiveSections();

        clearTimeout(abortTimer);
        window._gatUploadInProgress = false;
        window.hideGatUploadSpinner();
        if (resBox) {
          resBox.innerHTML = alertsHtml;
          setTimeout(function() {
            try { resBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
          }, 60);
        }
        var skipBtn = document.getElementById('gat-nu-skip-btn');
        if (skipBtn) {
          skipBtn.style.background = '#059669';
          skipBtn.style.color = '#ffffff';
          skipBtn.style.borderColor = '#047857';
          skipBtn.textContent = dTxt.continueBtn;
        }
      } catch (err) {
        clearTimeout(abortTimer);
        window._gatUploadInProgress = false;
        window.hideGatUploadSpinner();
        var isTimeout = err && (err.name === 'AbortError' || /aborted|timeout/i.test(String(err.message)));
        var errMsg = isTimeout ? (FV_EXTRA_ALERTS_I18N[l] || FV_EXTRA_ALERTS_I18N.en).spinTimeout : ((err && err.message) || dTxt.scanning);
        if (resBox) {
          resBox.innerHTML = '<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:10px;padding:12px;color:#991b1b;font-size:0.83rem;font-weight:800;">⚠️ ' + esc(errMsg) + '</div>';
          setTimeout(function() {
            try { resBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
          }, 60);
        }
      }
    };

    sharedInput.onchange = function() {
      if (sharedInput.files && sharedInput.files.length > 0) {
        handleDocUpload(sharedInput.files, activeSlot);
      }
    };
  };

  window.showFormFirstFocusGuideModal = function(formKey, focusElId) {
    var existing = document.getElementById('gat-form-first-focus-modal');
    if (existing) existing.remove();
    var l = lang();
    var g = FORM_GUIDE_I18N[l] || FORM_GUIDE_I18N.en;
    var fDef = FORMS[formKey] || FORMS.ash3;
    var isRtl = (l === 'he');

    var overlay = document.createElement('div');
    overlay.id = 'gat-form-first-focus-modal';
    overlay.dir = isRtl ? 'rtl' : 'ltr';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(15,23,42,0.72);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;';
    overlay.innerHTML =
      '<div style="background:#ffffff;border:3px solid #0284c7;border-radius:16px;max-width:520px;width:100%;padding:22px 24px;box-shadow:0 24px 48px rgba(0,0,0,0.35);color:#0f172a;font-family:inherit;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">' +
          '<span style="background:#e0f2fe;color:#0369a1;font-weight:900;font-size:0.78rem;padding:4px 10px;border-radius:999px;">📋 ' + esc(fDef.code) + '</span>' +
          '<button type="button" id="gat-ff-close-x" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b;font-weight:900;">✕</button>' +
        '</div>' +
        '<h3 style="margin:0 0 14px;font-size:1.12rem;color:#082548;font-weight:900;line-height:1.35;">' + esc(g.title) + '</h3>' +
        '<div style="background:#fffbeb;border:1.5px solid #f59e0b;border-radius:10px;padding:11px 13px;margin-bottom:10px;">' +
          '<div style="font-weight:900;font-size:0.86rem;color:#92400e;margin-bottom:3px;">' + esc(g.p1Title) + '</div>' +
          '<div style="font-size:0.82rem;color:#78350f;line-height:1.45;">' + esc(g.p1Body) + '</div>' +
        '</div>' +
        '<div style="background:#f0fdf4;border:1.5px solid #22c55e;border-radius:10px;padding:11px 13px;margin-bottom:10px;">' +
          '<div style="font-weight:900;font-size:0.86rem;color:#166534;margin-bottom:3px;">' + esc(g.p2Title) + '</div>' +
          '<div style="font-size:0.82rem;color:#14532d;line-height:1.45;">' + esc(g.p2Body) + '</div>' +
        '</div>' +
        '<div style="background:#fef2f2;border:1.5px solid #ef4444;border-radius:10px;padding:11px 13px;margin-bottom:16px;">' +
          '<div style="font-weight:900;font-size:0.86rem;color:#b91c1c;margin-bottom:3px;">' + esc(g.p3Title) + '</div>' +
          '<div style="font-size:0.82rem;color:#991b1b;line-height:1.45;">' + esc(g.p3Body) + '</div>' +
        '</div>' +
        '<button type="button" id="gat-ff-ok-btn" style="width:100%;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#fff;border:none;border-radius:11px;padding:13px 16px;font-size:0.95rem;font-weight:900;cursor:pointer;box-shadow:0 6px 16px rgba(2,132,199,0.35);">' + esc(g.btnOk) + '</button>' +
      '</div>';

    document.body.appendChild(overlay);
    var closeAndRefocus = function() {
      overlay.remove();
      if (focusElId) {
        var target = document.getElementById(focusElId);
        if (target && typeof target.focus === 'function') { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }
      }
    };
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeAndRefocus(); });
    var btnOk = document.getElementById('gat-ff-ok-btn');
    var btnX = document.getElementById('gat-ff-close-x');
    if (btnOk) btnOk.addEventListener('click', closeAndRefocus);
    if (btnX) btnX.addEventListener('click', closeAndRefocus);
  };

  // One-time automatic wipe so your browser starts 100% fresh like a brand-new first-time visitor!
  window.resetAllFormsAsNewVisitor = function(reloadUi) {
    try {
      localStorage.removeItem(DRAFT_KEY);
      localStorage.removeItem(SCANNED_KEY);
      localStorage.removeItem('gat_pre_hebrew_backup_v1');
      sessionStorage.removeItem('gat_doc_onboard_seen_v1');
      sessionStorage.removeItem('gat_doc_onboard_seen_v2');
      sessionStorage.removeItem('gat_doc_onboard_seen_v3');
      sessionStorage.removeItem('gat_doc_onboard_seen_v4');
      sessionStorage.removeItem('gat_form_intro_seen_v1');
      Object.keys(sessionStorage).forEach(function(k){ if(k.indexOf('gat_scroll_popup_seen_')===0) sessionStorage.removeItem(k); });
      window.gatFormsState = {};
      if (reloadUi && typeof window.mountUnifiedPibaFormsEngine === 'function') {
        window.mountUnifiedPibaFormsEngine();
      }
    } catch (e) {}
  };

  try {
    if (!localStorage.getItem('gat_fresh_arrival_reset_v8')) {
      localStorage.setItem('gat_fresh_arrival_reset_v8', '1');
      window.resetAllFormsAsNewVisitor(false);
    }
  } catch (e) {}

  window.syncCrossFormFields = function(persist) {
    if (!window.gatFormsState) window.gatFormsState = loadDraft();
    var s = window.gatFormsState;
    var d = loadDraft();
    Object.keys(d).forEach(function(k) {
      if ((s[k] === undefined || s[k] === '') && d[k] !== undefined && d[k] !== '') {
        s[k] = d[k];
      }
    });

    var changed = false;
    function setIfEmpty(targetKey, valToUse) {
      if (valToUse === undefined || valToUse === null) return;
      var clean = String(valToUse).trim();
      if (!clean) return;
      var cur = s[targetKey];
      if (cur === undefined || cur === null || String(cur).trim() === '') {
        s[targetKey] = clean;
        changed = true;
      }
    }
    function mirrorAlways(targetKey, valToUse) {
      if (valToUse === undefined || valToUse === null) return;
      var clean = String(valToUse).trim();
      if (!clean) return;
      if (s[targetKey] !== clean) {
        s[targetKey] = clean;
        changed = true;
      }
    }

    // Self-heal Safari Autofill contamination:
    var appFullHe = [s.pf_given_he, s.pf_surname_he].filter(Boolean).join(' ').trim();
    var appFullEn = [s.pf_given_en, s.pf_surname_en].filter(Boolean).join(' ').trim().toLowerCase();
    ['pf_father_he', 'pf_mother_he'].forEach(function(parentKey) {
      var curP = String(s[parentKey] || '').trim();
      if (curP && ((appFullHe && curP === appFullHe) || (appFullEn && curP.toLowerCase() === appFullEn) || curP === 'רחל עיני')) {
        var backupEnKey = parentKey === 'pf_father_he' ? 'pf_father_en' : 'pf_mother_en';
        var realParent = String(s[backupEnKey] || '').trim();
        if (realParent && realParent.toLowerCase() !== appFullEn && realParent !== appFullHe) {
          s[parentKey] = realParent;
        } else {
          s[parentKey] = '';
        }
        changed = true;
      }
    });

    // A. Hydrate from Scanned Documents with Strict 5-Type Field Fences (Zero Cross-Doc Bleed!)
    var scans = loadScans();
    if (Array.isArray(scans) && scans.length > 0) {
      scans.slice().reverse().forEach(function(sc) {
        if (!sc) return;
        var rawT = String(sc.slotKey || '') + ' ' + String(sc.docType || '') + ' ' + String(sc.docTitle || '');
        var nSlot = sc.isIsraeliTz || /teudat|zehut|תעודת זהות|ספח|\btz\b/i.test(rawT) ? 'tz'
          : (/marriage|נישואין|mariage|matrimonio|heirat|брак/i.test(rawT) || (sc.marriageDate && !sc.passportNumber) ? 'marriage'
          : (/birth|לידה|naissance|nacimiento|geburt/i.test(rawT) ? 'birth'
          : (/police|criminal|fbi|acro|rcmp|יושר|פלילי|single|רווקות/i.test(rawT) ? 'police'
          : (/passport|דרכון|passeport|pasaporte|reisepass|паспорт/i.test(rawT) || sc.passportNumber ? 'passport' : 'other'))));

        var isPartnerDoc = (sc.ownerParty === 'partner' || sc.tzRole === 'spouse');
        var fullHe = [sc.givenHe, sc.surnameHe].filter(Boolean).join(' ').trim() || sc.fullName || '';

        if (nSlot === 'marriage') {
          if (sc.marriageDate) { setIfEmpty('pf_marriage_date', sc.marriageDate); setIfEmpty('pf_marital', 'נשוי/אה'); }
          if (sc.marriagePlaceHe) setIfEmpty('pf_marriage_place_he', sc.marriagePlaceHe);
          if (sc.marriageDate || sc.marriagePlaceHe) {
            setIfEmpty('pf_marriage_details', [sc.marriageDate ? fmtIsraeliDate(sc.marriageDate) : '', sc.marriagePlaceHe || ''].filter(Boolean).join(' • '));
          }
          return;
        }
        if (nSlot === 'tz') {
          if (isPartnerDoc) {
            setIfEmpty('pf_sp_name_he', fullHe);
            setIfEmpty('pf_sp_surname_he', sc.surnameHe);
            setIfEmpty('pf_sp_given_he', sc.givenHe);
            setIfEmpty('pf_sp_tz', sc.israeliIdNumber);
            setIfEmpty('pf_sp_dob', sc.dob);
            setIfEmpty('pf_sp_citizenship_he', 'ישראלית');
            setIfEmpty('pf_il_addr_he', sc.israeliAddrHe);
          } else {
            setIfEmpty('pf_tz', sc.israeliIdNumber);
            setIfEmpty('pf_surname_he', sc.surnameHe);
            setIfEmpty('pf_given_he', sc.givenHe);
            setIfEmpty('pf_dob', sc.dob);
            setIfEmpty('pf_hebrew_dob', sc.hebrewDob);
            setIfEmpty('pf_il_addr_he', sc.israeliAddrHe);
          }
          return;
        }
        if (nSlot === 'passport') {
          if (isPartnerDoc) {
            setIfEmpty('pf_sp_surname_en', sc.surnameEn);
            setIfEmpty('pf_sp_given_en', sc.givenEn);
            setIfEmpty('pf_sp_name_he', fullHe || [sc.givenEn, sc.surnameEn].filter(Boolean).join(' '));
            setIfEmpty('pf_sp_dob', sc.dob);
            if (sc.passportNumber) setIfEmpty('pf_sp_pass_num', sc.passportNumber);
            setIfEmpty('pf_sp_pass_exp', sc.expiryDateIso);
            setIfEmpty('pf_sp_citizenship_he', sc.citizenship);
            setIfEmpty('pf_sp_birth_country_he', sc.birthCountry);
          } else {
            setIfEmpty('pf_surname_en', sc.surnameEn);
            setIfEmpty('pf_given_en', sc.givenEn);
            setIfEmpty('pf_surname_he', sc.surnameHe);
            setIfEmpty('pf_given_he', sc.givenHe);
            setIfEmpty('pf_dob', sc.dob);
            if (sc.passportNumber) setIfEmpty('pf_pass_num', sc.passportNumber);
            setIfEmpty('pf_pass_issue_date', sc.issueDateIso);
            setIfEmpty('pf_pass_exp_date', sc.expiryDateIso);
            setIfEmpty('pf_birth_country', sc.birthCountry);
            setIfEmpty('pf_citizenship', sc.citizenship);
          }
          return;
        }
        if (nSlot === 'birth') {
          if (isPartnerDoc) {
            setIfEmpty('pf_sp_dob', sc.dob);
            setIfEmpty('pf_sp_birth_country_he', sc.birthCountry);
            setIfEmpty('pf_sp_father_he', sc.fatherName);
            setIfEmpty('pf_sp_mother_he', sc.motherName);
          } else {
            setIfEmpty('pf_dob', sc.dob);
            setIfEmpty('pf_birth_country', sc.birthCountry);
            setIfEmpty('pf_father_he', sc.fatherName);
            setIfEmpty('pf_mother_he', sc.motherName);
            setIfEmpty('pf_prior_names', sc.priorNames);
          }
          return;
        }
        if (nSlot === 'police' && !isPartnerDoc) {
          setIfEmpty('pf_police_issue_date', sc.issueDateIso);
        }
      });
    }

    if (window.applyGenderInflectionToState && window.applyGenderInflectionToState(s)) { changed = true; }
    // B. Self-heal any previously contaminated *_en fields that contain Hebrew/Cyrillic characters!
    var STRICT_LATIN_EN_KEYS = [
      'pf_surname_en', 'pf_given_en', 'pf_prior_names_en', 'pf_birth_country_en',
      'pf_citizenship_en', 'pf_religion_en', 'pf_nationality_en',
      'pf_father_en', 'pf_mother_en', 'pf_mother_maiden_en',
      'pf_il_street_en', 'pf_il_city_en',
      'pf_inst_name_en', 'pf_inst_addr_en', 'pf_inst_contact_en',
      'pf_ash3_target_visa_en', 'pf_ash1_cat_en',
      'pf_sp_surname_en', 'pf_sp_given_en',
      'pf_prev_rejected_details_en', 'pf_parallel_req_details_en'
    ];
    STRICT_LATIN_EN_KEYS.forEach(function(enKey) {
      if (s[enKey] && /[\u0590-\u05FF\u0400-\u04FF]/.test(String(s[enKey]))) {
        s[enKey] = '';
        if (d[enKey]) delete d[enKey];
        changed = true;
      }
    });
    if (Array.isArray(s.pf_children_rows)) {
      s.pf_children_rows.forEach(function(kr) {
        if (kr && kr.given && /[\u0590-\u05FF\u0400-\u04FF]/.test(String(kr.given))) {
          kr.given = '';
          changed = true;
        }
        if (kr && kr.country_en && /[\u0590-\u05FF\u0400-\u04FF]/.test(String(kr.country_en))) {
          kr.country_en = '';
          changed = true;
        }
      });
    }

    function setLatinIfPureAscii(targetEnKey, candidateVal) {
      if (!candidateVal) return;
      var cStr = String(candidateVal).trim();
      if (!cStr || /[\u0590-\u05FF\u0400-\u04FF]/.test(cStr)) return;
      if (/^[A-Za-z0-9\s.,'\-\/()]+$/.test(cStr)) {
        setIfEmpty(targetEnKey, cStr.toUpperCase());
      }
    }

    // Also pull clean Latin birthPlaceEn / citizenshipEn / fatherEn / motherEn from scanned foreign docs if present
    if (Array.isArray(scans) && scans.length > 0) {
      scans.slice().reverse().forEach(function(sc) {
        if (!sc || sc.ownerParty === 'partner' || sc.tzRole === 'spouse' || sc.isIsraeliTz) return;
        if (sc.birthCountryEn) setLatinIfPureAscii('pf_birth_country_en', sc.birthCountryEn);
        if (sc.citizenshipEn) setLatinIfPureAscii('pf_citizenship_en', sc.citizenshipEn);
        if (sc.fatherNameEn) setLatinIfPureAscii('pf_father_en', sc.fatherNameEn);
        if (sc.motherNameEn) setLatinIfPureAscii('pf_mother_en', sc.motherNameEn);
        if (sc.priorNamesEn) setLatinIfPureAscii('pf_prior_names_en', sc.priorNamesEn);
      });
    }

    // C. Canonical -> All 8 PDF Stampers 1:1 Bridge (NEVER copy Hebrew into *_en!)
    if (s.pf_prior_names) {
      if (/^(ללא|אין|none|n\/a|-)$/i.test(String(s.pf_prior_names).trim())) {
        setIfEmpty('pf_prior_names_en', 'NONE');
      } else {
        setLatinIfPureAscii('pf_prior_names_en', s.pf_prior_names);
      }
      mirrorAlways('pf_maiden_he', s.pf_prior_names);
      mirrorAlways('pf_maiden_surname_he', s.pf_prior_names);
      mirrorAlways('pf_prev_surname_he', s.pf_prior_names);
    }
    if (s.pf_father_he) setLatinIfPureAscii('pf_father_en', s.pf_father_he);
    if (s.pf_mother_he) setLatinIfPureAscii('pf_mother_en', s.pf_mother_he);
    if (s.pf_mother_maiden) {
      if (/^(ללא|אין|none|n\/a|-)$/i.test(String(s.pf_mother_maiden).trim())) {
        setIfEmpty('pf_mother_maiden_en', 'NONE');
      } else {
        setLatinIfPureAscii('pf_mother_maiden_en', s.pf_mother_maiden);
      }
    }

    if (s.pf_birth_country) {
      setLatinIfPureAscii('pf_birth_country_en', s.pf_birth_country);
      var bParts = String(s.pf_birth_country).split(/[\/,\-]/);
      if (/[\u0590-\u05FF]/.test(s.pf_birth_country)) {
        mirrorAlways('pf_birth_country_he', bParts[bParts.length - 1].trim());
        if (bParts.length >= 2) mirrorAlways('pf_birth_city_he', bParts[0].trim());
        else mirrorAlways('pf_birth_city_he', s.pf_birth_country);
      }
    }
    if (s.pf_citizenship) {
      setLatinIfPureAscii('pf_citizenship_en', s.pf_citizenship);
      setIfEmpty('pf_citizenship_code', s.pf_citizenship);
    }
    if (s.pf_religion_nat) {
      var rnStr = String(s.pf_religion_nat).trim();
      if (/יהוד|jewish/i.test(rnStr)) {
        setIfEmpty('pf_religion_en', 'JEWISH');
        setIfEmpty('pf_nationality_en', 'JEWISH');
      } else if (/נוצר|christ/i.test(rnStr)) {
        setIfEmpty('pf_religion_en', 'CHRISTIAN');
      } else if (/מוסלמ|muslim|islam/i.test(rnStr)) {
        setIfEmpty('pf_religion_en', 'MUSLIM');
      } else if (/חסר דת|no religion|none/i.test(rnStr)) {
        setIfEmpty('pf_religion_en', 'NONE');
      } else {
        setLatinIfPureAscii('pf_religion_en', rnStr);
        setLatinIfPureAscii('pf_nationality_en', rnStr);
      }
    }
    if (s.pf_abroad_addr && /[\u0590-\u05FF]/.test(String(s.pf_abroad_addr))) {
      mirrorAlways('pf_abroad_addr_he', s.pf_abroad_addr);
    }
    if (s.pf_il_addr_he) {
      var addrParts = String(s.pf_il_addr_he).split(',').map(function(p){ return p.trim(); }).filter(Boolean);
      if (!/[\u0590-\u05FF\u0400-\u04FF]/.test(String(s.pf_il_addr_he))) {
        var noZipParts = String(s.pf_il_addr_he).replace(/\b\d{5,7}\b/g, '').split(',').map(function(p){ return p.trim(); }).filter(Boolean);
        if (noZipParts.length >= 2) {
          setLatinIfPureAscii('pf_il_street_en', noZipParts.slice(0, -1).join(', '));
          setLatinIfPureAscii('pf_il_city_en', noZipParts[noZipParts.length - 1]);
        }
      } else if (addrParts.length >= 2) {
        setIfEmpty('pf_mail_street_he', addrParts[0]);
        setIfEmpty('pf_mail_city_he', addrParts.slice(1).join(', '));
        setIfEmpty('pf_456_settlement', addrParts.slice(1).join(', '));
      } else {
        setIfEmpty('pf_456_settlement', s.pf_il_addr_he);
        setIfEmpty('pf_mail_city_he', s.pf_il_addr_he);
      }
    }
    if (s.pf_given_he || s.pf_surname_he) {
      setIfEmpty('pf_mail_recipient_he', [s.pf_given_he, s.pf_surname_he].filter(Boolean).join(' '));
    }
    if (s.pf_inst_details) {
      if (/[\u0590-\u05FF]/.test(String(s.pf_inst_details))) {
        setIfEmpty('pf_inst_addr_he', s.pf_inst_details);
      } else {
        var iPts = String(s.pf_inst_details).split(/[•|]/).map(function(x){ return x.trim(); });
        if (iPts[0]) setLatinIfPureAscii('pf_inst_name_en', iPts[0]);
        if (iPts[2]) setLatinIfPureAscii('pf_inst_contact_en', iPts[2]);
      }
    }
    if (s.pf_tz) mirrorAlways('pf_id_num', s.pf_tz);
    if (s.pf_entry_date_port) {
      var mIso = String(s.pf_entry_date_port).match(/(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})/);
      if (mIso) mirrorAlways('pf_entry_date', mIso[1]);
      var portTxt = String(s.pf_entry_date_port).replace(/(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})/, '').replace(/^[\s,\-\/]+|[\s,\-\/]+$/g, '');
      if (/[\u0590-\u05FF]/.test(portTxt)) mirrorAlways('pf_border_station_he', portTxt);
    }
    if (s.pf_hebrew_dob) {
      var hParts = String(s.pf_hebrew_dob).trim().split(/\s+/);
      if (hParts.length >= 3) {
        mirrorAlways('pf_dob_heb_day', hParts[0]);
        mirrorAlways('pf_dob_heb_mon', hParts.slice(1, -1).join(' '));
        mirrorAlways('pf_dob_heb_yr', hParts[hParts.length - 1]);
      } else {
        mirrorAlways('pf_dob_heb_day', s.pf_hebrew_dob);
      }
    }
    if (s.pf_456_shvut) {
      mirrorAlways('pf_shvut_clause_he', s.pf_456_shvut);
      mirrorAlways('pf_status_reason_he', s.pf_456_shvut);
      mirrorAlways('pf_requested_status_he', 'עולה (לפי חוק השבות)');
    }
    if (s.pf_ash3_action) {
      var actRaw = String(s.pf_ash3_action).trim();
      var visaCodeM = actRaw.match(/([AB]\/[1-5]|[אב]\/[1-5])/i);
      if (visaCodeM) {
        var rawVc = visaCodeM[1].toUpperCase();
        var vcEn = rawVc.replace('א', 'A').replace('ב', 'B');
        var vcHe = vcEn.replace('A', 'א').replace('B', 'ב');
        if (/החלפה|שינוי|change|switch/i.test(actRaw)) {
          mirrorAlways('pf_ash3_target_visa_he', vcHe);
          mirrorAlways('pf_ash3_target_visa_en', vcEn);
        }
        mirrorAlways('pf_ash1_cat_he', vcHe);
        mirrorAlways('pf_ash1_cat_en', vcEn);
      }
      var mMonths = actRaw.match(/\b(\d{1,2})\s*(?:חודשים|חודש|months?|mo)\b/i);
      if (mMonths && !s.pf_ash3_months) {
        s.pf_ash3_months = mMonths[1];
      }
    }
    if (s.pf_prev_rejected_details) setLatinIfPureAscii('pf_prev_rejected_details_en', s.pf_prev_rejected_details);
    if (s.pf_parallel_req_details) setLatinIfPureAscii('pf_parallel_req_details_en', s.pf_parallel_req_details);

    if (changed && persist !== false) {
      try {
        var merged = Object.assign({}, d, s);
        localStorage.setItem(DRAFT_KEY, JSON.stringify(merged));
      } catch (e) {}
    }
    return changed;
  };

  window.setGatFormOption = function(key, v) {
    window.gatFormsState[key] = v;
    try {
      var d = loadDraft();
      d[key] = v;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    } catch (e) {}
    window.mountUnifiedPibaFormsEngine();
  };
  function val(id, defVal) {
    if (window.gatFormsState && window.gatFormsState[id] !== undefined && window.gatFormsState[id] !== null && window.gatFormsState[id] !== '') {
      return window.gatFormsState[id];
    }
    var d = loadDraft();
    if (d[id] !== undefined && d[id] !== null && d[id] !== '') {
      window.gatFormsState[id] = d[id];
      return d[id];
    }
    return defVal !== undefined ? defVal : '';
  }

  function fmtIsraeliDate(iso) {
    var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return m ? (m[3] + '/' + m[2] + '/' + m[1]) : String(iso || '');
  }

  window.isValidIsraeliTZ = function(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (!digits || digits.length < 5 || digits.length > 9) return false;
    digits = digits.padStart(9, '0');
    if (digits === '000000000') return false;
    var sum = 0;
    for (var i = 0; i < 9; i++) {
      var n = Number(digits.charAt(i)) * ((i % 2) + 1);
      sum += n > 9 ? n - 9 : n;
    }
    return sum % 10 === 0;
  };

  function computeMasterDossierSummary(state) {
    var scans = loadScans();
    var formStatus = {};
    Object.keys(FORMS).forEach(function(fk) {
      if (fk === 'sec_cv' && !state.pf_cv_details) return;
      var fDef = FORMS[fk];
      var reqIds = fDef.fields.filter(function(fid) { return F[fid] && F[fid].req; });
      var filledCnt = reqIds.filter(function(fid) { return !!String(state[fid] || '').trim(); }).length;
      if (filledCnt === 0) {
        formStatus[fk] = { code: fDef.code, pct: 0, state: 'empty' };
      } else {
        var nonHeLeft = fDef.fields.filter(function(fid) {
          var meta = F[fid];
          var fv = String(state[fid] || '').trim();
          return meta && meta.script === 'he' && meta.t !== 'select' && meta.t !== 'checkbox' && fv && !/[\u0590-\u05FF]/.test(fv);
        }).length;
        var pct = Math.round((filledCnt / Math.max(1, reqIds.length)) * 100);
        formStatus[fk] = {
          code: fDef.code,
          pct: pct,
          nonHebrewFields: nonHeLeft,
          state: (pct === 100 && nonHeLeft === 0) ? 'verified_hebrew' : (pct === 100 ? 'needs_hebrew_convert' : 'in_progress')
        };
      }
    });
    return {
      scannedCount: scans.length,
      canonicalApplicantEn: ((state.pf_given_en || '') + ' ' + (state.pf_surname_en || '')).trim(),
      canonicalApplicantHe: ((state.pf_given_he || '') + ' ' + (state.pf_surname_he || '')).trim(),
      passportNumber: state.pf_pass_num || '',
      forms: formStatus
    };
  }


  var SHORT_FORM_PILL_LABELS = {
    ash3:         { en: 'Form Ash/3 (Visa Extension)', fr: 'Form. Ash/3 (Prolongation Visa)', es: 'Form. Ash/3 (Prórroga Visa)', de: 'Form. Asch/3 (Visaverlängerung)', ru: 'Анкета Аш/3 (Продление визы)', he: 'טופס אש/3 (הארכת אשרה)' },
    ash6:         { en: 'Form Ash/6 (Spousal Track)', fr: 'Form. Ash/6 (Conjoint)', es: 'Form. Ash/6 (Cónyuge)', de: 'Form. Asch/6 (Ehepartner)', ru: 'Анкета Аш/6 (Супружеская виза)', he: 'טופס אש/6 (בני זוג)' },
    nespach_alef: { en: 'Nespach Alef (Couples Affidavit)', fr: 'Nespach Alef (Affidavit Couple)', es: 'Nespach Alef (Declaración Pareja)', de: 'Nespach Alef (Paar-Erklärung)', ru: 'Неспах Алеф (Декларация пары)', he: 'נספח א׳ (תצהיר זוגיות)' },
    ash456:       { en: 'Form Ash/456 (In-Israel Aliyah)', fr: 'Form. Ash/456 (Aliyah en Israël)', es: 'Form. Ash/456 (Aliyá en Israel)', de: 'Form. Asch/456 (Alija in Israel)', ru: 'Анкета Аш/456 (Алия в Израиле)', he: 'טופס אש/456 (עלייה בארץ)' },
    ash1:         { en: 'Form Ash/1 (Entry Visa Inviter)', fr: 'Form. Ash/1 (Visa d’Entrée)', es: 'Form. Ash/1 (Visa de Entrada)', de: 'Form. Asch/1 (Einreisevisum)', ru: 'Анкета Аш/1 (Въездная виза)', he: 'טופס אש/1 (אשרת כניסה)' },
    mr14a:        { en: 'Form MR/14a (First Israeli ID)', fr: 'Form. MR/14a (1re Teudat Zehut)', es: 'Form. MR/14a (1ra Teudat Zehut)', de: 'Form. MR/14a (Erste Teudat Zehut)', ru: 'Анкета МР/14а (Первый Теудат Зеут)', he: 'טופס מר/14 א׳ (ת"ז ראשונה)' },
    mr14b:        { en: 'Form MR/14b (Foreign Passports)', fr: 'Form. MR/14b (Passeports Étrangers)', es: 'Form. MR/14b (Pasaportes Extranjeros)', de: 'Form. MR/14b (Ausländische Pässe)', ru: 'Анкета МР/14б (Иностранные паспорта)', he: 'טופס מר/14 ב׳ (דרכונים זרים)' },
    sec_cv:       { en: 'Security CV (11-Page Biographical)', fr: 'CV Sécurité (11 pages)', es: 'CV de Seguridad (11 págs.)', de: 'Sicherheits-CV (11 Seiten)', ru: 'Анкета безопасности (11 стр.)', he: 'טופס קורות חיים (11 עמ׳)' }
  };

  var DOSSIER_CLEAN_I18N = {
    en: { activeTag: 'ACTIVE FORM', scanBtn: '📸 Scan & Auto-Fill Docs', scansDone: '✅ {n} Doc(s) Scanned & Applied', switchOther: '➕ Jump to Another Form...' },
    fr: { activeTag: 'FORMULAIRE ACTIF', scanBtn: '📸 Scanner & Pré-remplir', scansDone: '✅ {n} Doc(s) Scanné(s)', switchOther: '➕ Changer de formulaire...' },
    es: { activeTag: 'FORMULARIO ACTIVO', scanBtn: '📸 Escanear y Autocompletar', scansDone: '✅ {n} Doc(s) Escaneado(s)', switchOther: '➕ Cambiar a otro formulario...' },
    de: { activeTag: 'AKTIVES FORMULAR', scanBtn: '📸 Scannen & Auto-Fill', scansDone: '✅ {n} Dok. gescannt', switchOther: '➕ Zu anderem Formular wechseln...' },
    ru: { activeTag: 'АКТИВНАЯ АНКЕТА', scanBtn: '📸 Сканировать документы', scansDone: '✅ Загружено док.: {n}', switchOther: '➕ Переключить анкету...' },
    he: { activeTag: 'טופס פעיל כעת', scanBtn: '📸 סריקת תעודות ומילוי אוטומטי', scansDone: '✅ {n} תעודות נסרקו והוזנו', switchOther: '➕ מעבר לטופס אחר...' }
  };

  function renderMasterDossierBar() {
    var host = document.getElementById('pf-master-dossier-bar');
    if (!host) return;
    var c = ui();
    var l = lang();
    var dClean = DOSSIER_CLEAN_I18N[l] || DOSSIER_CLEAN_I18N.en;
    var curState = Object.assign({}, loadDraft(), window.gatFormsState || {});
    var d = computeMasterDossierSummary(curState);
    var curF = val('pf_active_form', 'ash3');
    var scans = loadScans() || [];

    var scanPillHtml = scans.length === 0
      ? '<button type="button" onclick="window.showNewUserDocUploadModal(\'' + esc(curF) + '\', null, true)" style="cursor:pointer;background:linear-gradient(135deg,#0284c7,#0369a1);border:none;color:#fff;padding:6px 13px;border-radius:999px;font-size:0.77rem;font-weight:900;box-shadow:0 3px 10px rgba(2,132,199,0.28);">' + esc(dClean.scanBtn) + '</button>'
      : '<button type="button" onclick="window.showNewUserDocUploadModal(\'' + esc(curF) + '\', null, true)" style="cursor:pointer;background:#dcfce7;border:1.5px solid #16a34a;color:#166534;padding:5px 12px;border-radius:999px;font-size:0.76rem;font-weight:900;">' + esc(dClean.scansDone.replace('{n}', String(scans.length))) + ' (➕)</button>';

    var pills = [scanPillHtml];
    var otherOptions = ['<option value="">' + esc(dClean.switchOther) + '</option>'];

    Object.keys(d.forms).forEach(function(fk) {
      var st = d.forms[fk];
      var lblObj = SHORT_FORM_PILL_LABELS[fk] || { en: st.code };
      var localName = lblObj[l] || lblObj.en || st.code;
      var isCurrent = (fk === curF);

      if (isCurrent) {
        var bg = st.state === 'verified_hebrew' ? '#dcfce7' : '#e0f2fe';
        var bdr = st.state === 'verified_hebrew' ? '#059669' : '#0284c7';
        var col = st.state === 'verified_hebrew' ? '#065f46' : '#0c4a6e';
        var icon = st.state === 'verified_hebrew' ? '✅ ' : '📄 ';
        pills.push(
          '<span style="background:' + bg + ';border:2px solid ' + bdr + ';color:' + col + ';padding:5px 12px;border-radius:999px;font-size:0.77rem;font-weight:900;">' +
            icon + esc(localName) + ' • ' + st.pct + '%' +
          '</span>'
        );
      } else {
        otherOptions.push('<option value="' + esc(fk) + '">' + esc(localName) + (st.pct > 0 ? ' (' + st.pct + '%)' : '') + '</option>');
      }
    });

    var quickJumpSelect = '<select onchange="if(this.value){window.setGatFormOption(\'pf_active_form\',this.value);if(window.triggerSmartPopupOnFormSwap)window.triggerSmartPopupOnFormSwap(this.value);}" style="width:auto;max-width:250px;margin:0;padding:5px 10px;border-radius:999px;border:1.5px dashed #0284c7;background:#fff;color:#0f172a;font-size:0.75rem;font-weight:800;cursor:pointer;">' +
      otherOptions.join('') +
    '</select>';
    pills.push(quickJumpSelect);

    host.innerHTML =
      '<div style="background:#ffffff;border:1.5px solid #86efac;border-radius:12px;padding:10px 12px;margin-bottom:6px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;width:100%;justify-content:space-between;">' + pills.join('') + '</div>' +
        '</div>' +
      '</div>';
  }

  var origCollect = window.collectCurrentFormDraft;
  window.collectCurrentFormDraft = function() {
    var base = loadDraft();
    Object.assign(base, window.gatFormsState || {});
    if (typeof origCollect === 'function') {
      var leg = origCollect() || {};
      Object.keys(leg).forEach(function(k) { base[k] = leg[k]; });
    }
    document.querySelectorAll('.pf-bound-input').forEach(function(el) {
      if (!el.id) return;
      base[el.id] = el.type === 'checkbox' ? !!el.checked : el.value;
    });
    if (base.pf_police_issue_date) {
      var pMs = Date.parse(base.pf_police_issue_date);
      if (!isNaN(pMs)) base['chk-days'] = String(Math.max(0, Math.floor((Date.now() - pMs) / 86400000)));
    }
    if (base.pf_pass_exp_date) {
      var eMs = Date.parse(base.pf_pass_exp_date);
      if (!isNaN(eMs)) base['chk-pass-months'] = String(Math.max(0, Math.floor((eMs - Date.now()) / (86400000 * 30.4375))));
    }
    base._masterDossier = computeMasterDossierSummary(base);
    window.gatFormsState = base;
    // Dirty-checked cloud sync is handled strictly by window.syncFormDraftIfChanged() when values actually change
    return base;
  };

  var origRestore = window.restoreSavedFormDraft;
  window.restoreSavedFormDraft = function(draft, forceActiveAlso) {
    var inc = draft || loadDraft();
    if (inc && typeof inc === 'object') window.gatFormsState = Object.assign({}, window.gatFormsState || {}, inc);
    if (typeof origRestore === 'function') origRestore(window.gatFormsState);
    document.querySelectorAll('.pf-bound-input').forEach(function(el) {
      if (!el.id || !(el.id in window.gatFormsState) || (!forceActiveAlso && document.activeElement === el)) return;
      if (el.type === 'checkbox') el.checked = !!window.gatFormsState[el.id];
      else if (window.gatFormsState[el.id] !== undefined && window.gatFormsState[el.id] !== null) el.value = window.gatFormsState[el.id];
    });
    updateClerkTimerDisplay();
    renderMasterDossierBar();
  };

  function hookAuditDocInterceptor() {
    if (window._gatFetchHooked || typeof window.fetch !== 'function') return;
    window._gatFetchHooked = true;
    var origFetch = window.fetch;
    window.fetch = function(input) {
      var urlStr = typeof input === 'string' ? input : (input && input.url) || '';
      return origFetch.apply(this, arguments).then(function(resp) {
        if (urlStr.indexOf('auditDoc') !== -1 && resp && resp.clone) {
          resp.clone().json().then(function(data) {
            if (!data || !data.ok || !data.result) return;
            var r = data.result;
            if (r.translated || r.worksheet_fields || (r.hebrew_raw_text && !r.doc_type)) return;

            var rawDocType = String(r.doc_type || '') + ' ' + String(r.doc_title_detected || '') + ' ' + String(r.issuing_country || '');
            var rawIdDigits = String(r.israeli_id_number || r.teudat_zehut || r.id_number || '').replace(/\D/g, '');
            var passDigits = String(r.passport_number || '').replace(/\D/g, '');
            var isMarriageDoc = /marriage|נישואין|mariage|matrimonio|heirat|брак/i.test(rawDocType) || !!r.marriage_date_iso || !!r.marriage_place_he;
            var isIsraeliTz = !isMarriageDoc && (
              /teudat|zehut|תעודת זהות|ספח|sefach|israeli_id|israeli id/i.test(rawDocType) ||
              (rawIdDigits.length === 9 && !/passport|דרכון|birth|לידה/i.test(rawDocType)) ||
              (/israel|ישראל/i.test(rawDocType) && passDigits.length === 9 && !/passport|דרכון/i.test(rawDocType))
            );
            var curFKey = val('pf_active_form', 'ash3');
            var ownerParty = window._gatActiveUploadOwner || 'me';

            var detectedSlot = isMarriageDoc ? 'marriage' : (isIsraeliTz ? 'tz' : (/birth|לידה/i.test(rawDocType) ? 'birth' : (/police|criminal|fbi|acro|rcmp|יושר|פלילי/i.test(rawDocType) ? 'police' : (/single|רווקות/i.test(rawDocType) ? 'single' : (/passport|דרכון|passeport|pasaporte|reisepass|паспорт/i.test(rawDocType) || r.passport_number ? 'passport' : 'doc')))));
            if (detectedSlot === 'marriage') ownerParty = 'both';
            var scans = loadScans().filter(function(oldSc) {
              if (!oldSc) return false;
              var oldS = oldSc.slotKey || (oldSc.isIsraeliTz ? 'tz' : (oldSc.marriageDate ? 'marriage' : (oldSc.passportNumber ? 'passport' : 'doc')));
              if (detectedSlot === 'marriage' && oldS === 'marriage') return false;
              return !(oldS === detectedSlot && oldSc.ownerParty === ownerParty);
            });
            scans.unshift({
              ts: new Date().toISOString(),
              slotKey: detectedSlot,
              docType: isIsraeliTz ? 'teudat_zehut' : (r.doc_type || detectedSlot),
              isIsraeliTz: !!isIsraeliTz,
              ownerParty: ownerParty,
              tzRole: ownerParty === 'partner' ? 'spouse' : (ownerParty === 'both' ? 'both' : 'applicant'),
              docTitle: r.doc_title_detected || r.doc_type || 'Certificate',
              fullName: r.person_full_name || r.detected_full_name || '',
              surnameEn: isIsraeliTz ? '' : (r.surname_en || ''),
              givenEn: isIsraeliTz ? '' : (r.given_en || ''),
              surnameHe: r.surname_he || '',
              givenHe: r.given_he || '',
              hebrewDob: r.hebrew_date_of_birth || '',
              israeliAddrHe: r.israeli_address_he || '',
              marriageDate: r.marriage_date_iso || '',
              marriagePlaceHe: r.marriage_place_he || '',
              spouseNameHe: r.spouse_full_name_he || '',
              spouseSurnameEn: r.spouse_surname_en || '',
              spouseGivenEn: r.spouse_given_en || '',
              spouseDob: r.spouse_dob_iso || '',
              priorNames: isIsraeliTz ? '' : (r.prior_or_maiden_names || ''),
              dob: r.date_of_birth || '',
              passportNumber: isIsraeliTz ? '' : (r.passport_number || ''),
              israeliIdNumber: isIsraeliTz ? (rawIdDigits || passDigits) : '',
              fatherName: r.father_full_name || '',
              motherName: r.mother_full_name || '',
              birthCountry: r.birth_country_city_he || r.country_or_city_of_birth || '',
              citizenship: r.citizenship_he || r.citizenship || '',
              hasSefach: Boolean(r.has_full_sefach_visible === true && r.sefach_unfolded_all_squares !== false),
              isComplete: r.is_complete !== false,
              incompleteReasons: Array.isArray(r.incomplete_reasons) ? r.incomplete_reasons : [],
              isLongFormBothParents: r.is_long_form_both_parents !== false,
              hasApostille: r.has_apostille_visible !== false,
              apostilleAuthorityOk: r.apostille_authority_correct !== false,
              docLang: r.document_language || 'english',
              hasRedRibbon: !!r.has_israeli_red_ribbon_notary,
              issueDateIso: r.issue_date_iso || '',
              expiryDateIso: r.expiry_date_iso || '',
              summary: r.summary_in_user_lang || ''
            });
            try {
              localStorage.setItem(SCANNED_KEY, JSON.stringify(scans.slice(0, 16)));
              if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);
              if (typeof window.forceRefreshLivePibaFormDom === 'function') { window.forceRefreshLivePibaFormDom(); } else if (typeof window.mountUnifiedPibaFormsEngine === 'function') { var _sy = window.scrollY || 0; window.mountUnifiedPibaFormsEngine(); if (_sy > 0) window.scrollTo(0, _sy); }
            } catch (e) {}
          }).catch(function() {});
        }
        return resp;
      });
    };
  }

  window.convertFormAnswersToClerkHebrew = async function(silentIfAlreadyHeb) {
    var c = ui();
    if (!silentIfAlreadyHeb && typeof window.hasFormsEngineAccess === 'function' && !window.hasFormsEngineAccess()) {
      window.redirectToFormsPayment(c.pwPrompt);
      return false;
    }
    // 1. Flush any active/focused DOM inputs into window.gatFormsState right now so newly typed fields are never missed!
    document.querySelectorAll('.pf-bound-input').forEach(function(el) {
      if (!el.id) return;
      var curVal = el.type === 'checkbox' ? !!el.checked : el.value;
      window.gatFormsState[el.id] = curVal;
      el.dataset.lastSavedVal = String(curVal);
    });
    if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);

    // 2. Collect all non-Hebrew fields across the active form + global state AND missing companion In-English fields
    var curForm = val('pf_active_form', 'ash3');
    var activeFields = (FORMS[curForm] || FORMS.ash3).fields || [];
    var allFieldKeys = Array.from(new Set(activeFields.concat(Object.keys(F))));
    var toTranslate = {};
    allFieldKeys.forEach(function(fid) {
      var meta = F[fid];
      if (!meta || meta.script === 'latin' || meta.t === 'select' || meta.t === 'checkbox' || meta.t === 'date') return;
      if (['pf_pass_num', 'pf_prev_pass_num', 'pf_email', 'pf_phone_il', 'pf_phone_abroad', 'pf_sp_phone_home', 'pf_tz', 'pf_sp_tz', 'pf_father_tz', 'pf_mother_tz', 'pf_req_num', 'pf_visa_num', 'pf_edu_years', 'pf_ash3_months', 'pf_ll_children_count'].indexOf(fid) !== -1) return;
      var v = String(val(fid, '')).trim();
      if (v && (!/[\u0590-\u05FF]/.test(v) || /[A-Za-z\u00C0-\u024F\u0400-\u04FF]/.test(v))) {
        toTranslate[fid] = v;
      }
    });

    // Also translate Latin pf_abroad_addr into pf_abroad_addr_he if pf_abroad_addr_he lacks Hebrew
    var abrRaw = String(val('pf_abroad_addr', '')).trim();
    var abrHeCur = String(val('pf_abroad_addr_he', '')).trim();
    if (abrRaw && (!abrHeCur || !/[\u0590-\u05FF]/.test(abrHeCur) || /[A-Za-z]/.test(abrHeCur))) {
      toTranslate.pf_abroad_addr_he = abrRaw;
    }

    // Companion In-English fields needed by Ash/3, Ash/1, Security CV (NEVER touch Passport pf_surname_en / pf_given_en!)
    var enPairs = [
      ['pf_prior_names_en',   val('pf_prior_names', '')],
      ['pf_birth_country_en', val('pf_birth_country', '')],
      ['pf_citizenship_en',   val('pf_citizenship', '')],
      ['pf_religion_en',      val('pf_religion_nat', '')],
      ['pf_nationality_en',   val('pf_religion_nat', '')],
      ['pf_father_en',        val('pf_father_he', '')],
      ['pf_mother_en',        val('pf_mother_he', '')],
      ['pf_mother_maiden_en', val('pf_mother_maiden', '')],
      ['pf_il_street_en',     val('pf_il_addr_he', '')],
      ['pf_il_city_en',       val('pf_il_addr_he', '')]
    ];
    var instRaw = String(val('pf_inst_details', '')).trim();
    if (instRaw) {
      var instPts = instRaw.split(/[•|]/).map(function(x){ return x.trim(); });
      if (instPts[0]) enPairs.push(['pf_inst_name_en', instPts[0]]);
      if (instPts[2]) enPairs.push(['pf_inst_contact_en', instPts[2]]);
      var instAddrSrc = val('pf_inst_addr_he', '') || val('pf_il_addr_he', '');
      if (instAddrSrc) enPairs.push(['pf_inst_addr_en', instAddrSrc]);
    }

    var toTranslateEn = {};
    enPairs.forEach(function(pair) {
      var enKey = pair[0];
      var srcVal = String(pair[1] || '').trim();
      if (!srcVal) return;
      var curEn = String(val(enKey, '')).trim();
      if (!curEn || /[\u0590-\u05FF\u0400-\u04FF]/.test(curEn)) {
        toTranslateEn[enKey] = srcVal;
      }
    });

    var kidsArr = Array.isArray(window.gatFormsState && window.gatFormsState.pf_children_rows)
      ? window.gatFormsState.pf_children_rows
      : [];
    var kidsNeedBilingual = kidsArr.some(function(k) {
      if (!k) return false;
      var gEn = String(k.given || '').trim();
      var gHe = String(k.given_he || '').trim();
      var cEn = String(k.country_en || '').trim();
      return (gHe && (!gEn || /[\u0590-\u05FF]/.test(gEn))) || (gEn && !gHe) || (k.country && (!cEn || /[\u0590-\u05FF]/.test(cEn)));
    });

    if (Object.keys(toTranslate).length === 0 && Object.keys(toTranslateEn).length === 0 && !kidsNeedBilingual) {
      if (!silentIfAlreadyHeb && window.showDraftSavedBadge) {
        window.showDraftSavedBadge(c.alreadyHeb, false);
      }
      return true;
    }

    var btn = document.getElementById('pf-btn-ai-heb');
    var origTxt = btn ? btn.innerText : '';
    if (btn) { btn.disabled = true; btn.innerText = c.btnConverting; }
    window.showGatTranslateSpinner();

    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timerId = setTimeout(function() {
      if (ctrl) ctrl.abort();
    }, 25000);

    try {
      var fetchOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'translate_form_hebrew',
          fields: toTranslate,
          enFields: toTranslateEn,
          childrenRows: kidsNeedBilingual ? kidsArr : [],
          lang: lang()
        })
      };
      if (ctrl) fetchOpts.signal = ctrl.signal;

      var res = await fetch((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://giyuraliyahtrack.com/api/auditDoc" : "/api/auditDoc"), fetchOpts);
      clearTimeout(timerId);
      var data = await res.json();
      if (!res.ok || !data.ok || !data.result || (!data.result.translated && !data.result.translated_en)) {
        throw new Error((data && data.error) || 'Translation server busy');
      }
      var map = data.result.translated || {};
      var mapEn = data.result.translated_en || {};
      var kidsBi = Array.isArray(data.result.children_bilingual) ? data.result.children_bilingual : [];

      var uiBackup = Object.assign({}, toTranslate);
      delete uiBackup.pf_abroad_addr_he;
      if (Object.keys(uiBackup).length > 0 && typeof window.savePreHebrewBackup === 'function') {
        window.savePreHebrewBackup(uiBackup);
      }
      var d = loadDraft();
      Object.keys(map).forEach(function(fid) {
        if (!map[fid]) return;
        window.gatFormsState[fid] = map[fid];
        d[fid] = map[fid];
        var el = document.getElementById(fid);
        if (el) {
          el.value = map[fid];
          el.dataset.lastSavedVal = String(map[fid]);
        }
      });
      Object.keys(mapEn).forEach(function(enFid) {
        if (!mapEn[enFid] || enFid === 'pf_surname_en' || enFid === 'pf_given_en') return;
        var cleanLatin = String(mapEn[enFid]).replace(/[\u0590-\u05FF\u0400-\u04FF]/g, '').trim().toUpperCase();
        if (!cleanLatin) return;
        window.gatFormsState[enFid] = cleanLatin;
        d[enFid] = cleanLatin;
      });
      if (kidsBi.length > 0 && Array.isArray(window.gatFormsState.pf_children_rows)) {
        window.gatFormsState.pf_children_rows.forEach(function(kr, idx) {
          var kb = kidsBi[idx];
          if (!kr || !kb) return;
          if (kb.given_he) kr.given_he = String(kb.given_he).trim();
          if (kb.given_en && !/[\u0590-\u05FF]/.test(kb.given_en)) kr.given = String(kb.given_en).trim().toUpperCase();
          if (kb.country_he) kr.country = String(kb.country_he).trim();
          if (kb.country_en && !/[\u0590-\u05FF]/.test(kb.country_en)) kr.country_en = String(kb.country_en).trim().toUpperCase();
        });
        d.pf_children_rows = window.gatFormsState.pf_children_rows;
      }
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) {}
      if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);
      if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
      window.hideGatTranslateSpinner();
      renderBody();
      renderMasterDossierBar();
      var tMsg = (TRANSLATE_OVERLAY_I18N[lang()] || TRANSLATE_OVERLAY_I18N.en).doneToast;
      if (window.showDraftSavedBadge) window.showDraftSavedBadge(tMsg, false);
      return true;
    } catch (err) {
      clearTimeout(timerId);
      window.hideGatTranslateSpinner();
      if (!silentIfAlreadyHeb && typeof window.showGatTranslateErrorModal === 'function') {
        window.showGatTranslateErrorModal(err && err.message ? err.message : '');
      }
      return false;
    } finally {
      if (btn) { btn.disabled = false; btn.innerText = origTxt; }
    }
  };

  window.printBlankNativeWorksheet = function() {
    var c = ui();
    var l = lang();
    var curForm = val('pf_active_form', 'ash3');
    var fDef = FORMS[curForm] || FORMS.ash3;
    var rows = fDef.fields.map(function(fid, idx) {
      var meta = F[fid];
      if (!meta) return '';
      var hintHtml = meta.h
      ? '<div class="gat-field-focus-hint" id="hint_' + fid + '" style="display:none;font-size:0.73rem;color:#1e3a8a;background:#f8fafc;border-inline-start:3px solid #0284c7;padding:6px 9px;border-radius:6px;margin-top:5px;line-height:1.35;font-weight:700;">💡 ' + esc(tr(meta.h)) + '</div>'
      : '';
      var curV = val(fid, '');
      return '<tr>' +
        '<td style="width:45%;padding:8px;border:1px solid #94a3b8;background:#f8fafc;">' +
          '<div style="font-size:10px;color:#0284c7;font-weight:800;">[' + fid + ']</div>' +
          '<div style="font-weight:800;font-size:12.5px;">' + (idx + 1) + '. ' + esc(tr(meta.l)) + '</div>' + hintHtml +
        '</td>' +
        '<td style="width:55%;padding:12px 10px;border:1px solid #94a3b8;min-height:38px;font-size:13px;">' +
          (meta.t === 'checkbox' ? esc(c.wsYes) : esc(curV === true ? '' : curV)) +
        '</td></tr>';
    }).join('');

    var w = window.open('', '_blank');
    if (!w) return;
    w.document.write('<!doctype html><html lang="' + esc(l) + '" dir="' + (l === 'he' ? 'rtl' : 'ltr') + '"><head><meta charset="utf-8"><title>' + esc(fDef.code) + '</title>' +
      '<style>body{font-family:Arial,sans-serif;max-width:820px;margin:18px auto;padding:0 14px;color:#0f172a;} table{width:100%;border-collapse:collapse;}</style></head><body>' +
      '<h2 style="margin:0 0 4px;">' + esc(tr(fDef.t)) + '</h2>' +
      '<p style="font-size:12px;color:#334155;margin:0 0 12px;">' + esc(c.wsIntro) + '</p>' +
      '<table>' + rows + '</table>' +
      '<script>setTimeout(function(){window.print();},300);<\/script></body></html>');
    w.document.close();
  };


  window.stamperCalibrationMode = false;
  window.toggleStamperCalibrationMode = function(valBool) {
    var c = ui();
    window.stamperCalibrationMode = (valBool !== undefined) ? !!valBool : !window.stamperCalibrationMode;
    var badge = document.getElementById('pf-calib-mode-btn');
    if (badge) {
      badge.style.background = window.stamperCalibrationMode ? '#7c3aed' : '#0f766e';
      badge.innerHTML = window.stamperCalibrationMode ? esc(c.calOn) : esc(c.calOff);
    }
  };

  window.scanCertIntoFormsEngine = async function(inputEl) {
    if (typeof window.ensurePaidFormsAccessOrPaywall === 'function') {
      var okAccess = await window.ensurePaidFormsAccessOrPaywall('upload');
      if (!okAccess) { if (inputEl) inputEl.value = ''; return; }
    } else if (typeof window.hasFormsEngineAccess === 'function' && !window.hasFormsEngineAccess()) {
      if (inputEl) inputEl.value = '';
      window.redirectToFormsPayment();
      return;
    }
    var file = inputEl && inputEl.files && inputEl.files[0];
    if (!file) return;
    var outEl = document.getElementById('pf-forensic-out');
    if (outEl) {
      outEl.style.display = 'block';
      outEl.style.border = '2px solid #0284c7';
      outEl.style.background = '#f0f9ff';
      outEl.innerHTML = '<strong>🔍 Gemini 3.8 Flash Vision extracting fields from your document & checking for clerk traps...</strong>';
    }
    try {
      var payload = await window.fileToCompressedBase64(file);
      var res = await fetch((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://giyuraliyahtrack.com/api/auditDoc" : "/api/auditDoc"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'dossier_doc',
          mimeType: payload.mimeType,
          base64Data: payload.base64Data,
          lang: lang()
        })
      });
      var data = await res.json();
      if (!res.ok || !data.ok || !data.result) {
        throw new Error((data && data.error) || 'Document scan failed');
      }
      var r = data.result;
      var findingsHtml = (Array.isArray(r.forensic_findings) ? r.forensic_findings : []).map(function(f) {
        return '<li style="margin-top:4px;">' + esc(f) + '</li>';
      }).join('');
      if (outEl) {
        outEl.style.border = '2px solid #059669';
        outEl.style.background = '#ecfdf5';
        outEl.innerHTML = '<div style="font-weight:900;color:#065f46;margin-bottom:4px;">✅ Auto-Populated Form Fields from: ' + esc(r.doc_title_detected || r.doc_type || 'Document') + '</div>' +
          (findingsHtml ? '<ul style="padding-left:18px;margin:6px 0;color:#0f172a;font-size:0.82rem;">' + findingsHtml + '</ul>' : '');
      }
      setTimeout(function() { window.runPibaForensicCheck(false); }, 350);
    } catch (err) {
      if (outEl) {
        outEl.style.border = '2px solid #dc2626';
        outEl.style.background = '#fef2f2';
        outEl.innerHTML = '<span style="color:#b91c1c;font-weight:800;">⚠️ ' + esc(err.message || err) + '</span>';
      }
    } finally {
      inputEl.value = '';
    }
  };

  window.scanHandwrittenWorksheet = async function(inputEl) {
    if (typeof window.ensurePaidFormsAccessOrPaywall === 'function') {
      var okWs = await window.ensurePaidFormsAccessOrPaywall('worksheet');
      if (!okWs) { if (inputEl) inputEl.value = ''; return; }
    } else if (typeof window.hasFormsEngineAccess === 'function' && !window.hasFormsEngineAccess()) {
      if (inputEl) inputEl.value = '';
      window.redirectToFormsPayment();
      return;
    }
    var file = inputEl && inputEl.files && inputEl.files[0];
    if (!file) return;
    var c = ui();
    var curForm = val('pf_active_form', 'ash3');
    var fDef = FORMS[curForm] || FORMS.ash3;
    var expected = {};
    fDef.fields.forEach(function(fid) {
      if (F[fid]) expected[fid] = { label: F[fid].l.en, script: F[fid].script || 'he' };
    });

    var outEl = document.getElementById('pf-forensic-out');
    if (outEl) {
      outEl.style.display = 'block';
      outEl.style.border = '2px solid #0284c7';
      outEl.style.background = '#f0f9ff';
      outEl.innerHTML = '<strong>' + esc(c.scanningWs) + '</strong>';
    }

    try {
      var payload = await window.fileToCompressedBase64(file);
      var res = await fetch((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "https://giyuraliyahtrack.com/api/auditDoc" : "/api/auditDoc"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'scan_worksheet',
          mimeType: payload.mimeType,
          base64Data: payload.base64Data,
          expectedFields: expected,
          lang: lang()
        })
      });
      var data = await res.json();
      if (!res.ok || !data.ok || !data.result || !data.result.worksheet_fields) {
        throw new Error((data && data.error) || 'Worksheet scan failed');
      }
      var wf = data.result.worksheet_fields;
      Object.keys(wf).forEach(function(fid) {
        if (wf[fid] === undefined || wf[fid] === null || wf[fid] === '') return;
        window.gatFormsState[fid] = wf[fid];
        var el = document.getElementById(fid);
        if (el) {
          if (el.type === 'checkbox') el.checked = !!wf[fid];
          else el.value = wf[fid];
        }
      });
      if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
      renderMasterDossierBar();
      window.runPibaForensicCheck(false);
    } catch (err) {
      if (outEl) outEl.innerHTML = '<span style="color:#b91c1c;font-weight:800;">⚠️ ' + esc(err.message || err) + '</span>';
    } finally {
      inputEl.value = '';
    }
  };

  window.runPibaForensicCheck = function(silent) {
    if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
    renderMasterDossierBar();
    var c = ui();
    var s = window.collectCurrentFormDraft();
    var curForm = val('pf_active_form', 'ash3');
    var fDef = FORMS[curForm] || FORMS.ash3;
    var errors = [], warnings = [], passes = [];

    var missing = [], nonHebrew = [];
    fDef.fields.forEach(function(fid) {
      var meta = F[fid];
      if (!meta) return;
      var fv = String(s[fid] || '').trim();
      var hasValidIlId = /^\d{7,9}$/.test(String(s.pf_tz || '').replace(/\D/g, ''));
      var ilIdSufficesHere = hasValidIlId && ['nespach_alef', 'mr14a', 'sec_cv', 'ash3', 'ash6'].indexOf(curForm) !== -1 && ['pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date'].indexOf(fid) !== -1;
      if (meta.req && meta.t !== 'checkbox' && !fv && !ilIdSufficesHere) missing.push(tr(meta.l));
      if (meta.script === 'he' && meta.t !== 'select' && meta.t !== 'checkbox' && fv && !/[\u0590-\u05FF]/.test(fv)) {
        nonHebrew.push(tr(meta.l));
      }
    });

    if (missing.length) {
      var mList = missing.slice(0, 5).map(esc).join(' • ') + (missing.length > 5 ? ' (+' + (missing.length - 5) + ')' : '');
      errors.push(c.errMissing.replace('{code}', esc(fDef.code)).replace('{n}', missing.length).replace('{list}', mList));
    } else {
      passes.push(c.okAllFilled.replace('{code}', esc(fDef.code)));
    }

    if (nonHebrew.length) {
      errors.push(c.errNonHeb.replace('{n}', nonHebrew.length));
    } else if (!missing.length) {
      passes.push(c.okHebFirst);
    }

    if (!s.pf_decl_clean_record) errors.push(c.errDecl);

    ['pf_sp_tz', 'pf_ash6_refs', 'pf_ll_affidavit'].forEach(function(k) {
      var matches = String(s[k] || '').match(/\b\d{8,9}\b/g) || [];
      matches.forEach(function(num) {
        if (!window.isValidIsraeliTZ(num)) errors.push(c.errTz.replace('{tz}', esc(num)));
      });
    });

    if (s.pf_pass_exp_date) {
      var mLeft = Math.floor((Date.parse(s.pf_pass_exp_date) - Date.now()) / (86400000 * 30.4375));
      if (mLeft < fDef.minPassM) errors.push(c.errPassShort.replace('{m}', mLeft).replace('{code}', esc(fDef.code)).replace('{req}', fDef.minPassM));
      else if (mLeft < fDef.warnPassM) warnings.push(c.warnPassBuf.replace('{m}', mLeft).replace('{code}', esc(fDef.code)).replace('{req}', fDef.minPassM));
      else passes.push(c.okPass.replace('{m}', mLeft));
    }

    if (s.pf_police_issue_date) {
      var pDays = Math.floor((Date.now() - Date.parse(s.pf_police_issue_date)) / 86400000);
      if (pDays > 180) errors.push(c.errPolExp.replace('{d}', pDays));
      else if (pDays >= 0) passes.push(c.okPol.replace('{left}', 180 - pDays));
    }

    var priorVal = String(s.pf_prior_names || '').trim();
    var hasPrior = priorVal && !/^(none|n\/a|no|non|ninguno|keine|ללא|אין|-)$/i.test(priorVal);
    if (hasPrior && (!s.pf_police_covers_prior || !s.pf_has_name_change_cert)) {
      errors.push(c.errNameTrap.replace('{p}', esc(priorVal)));
    }

    // Unicode-diacritic-insensitive normalization so French/Spanish/German accents compare cleanly
    var norm = function(x) {
      var str = String(x || '');
      if (str.normalize) str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    var scans = loadScans();
    if (scans.length) {
      var formFull = norm((s.pf_given_en || '') + (s.pf_surname_en || ''));
      var formRev = norm((s.pf_surname_en || '') + (s.pf_given_en || ''));
      for (var i = 0; i < scans.length; i++) {
        for (var j = i + 1; j < scans.length; j++) {
          var aN = norm(scans[i].fullName), bN = norm(scans[j].fullName);
          if (aN && bN && aN !== bN && !hasPrior) {
            errors.push(c.errCrossScan.replace('{a}', esc(scans[i].docTitle)).replace('{na}', esc(scans[i].fullName)).replace('{b}', esc(scans[j].docTitle)).replace('{nb}', esc(scans[j].fullName)));
          }
        }
      }
      scans.forEach(function(sc) {
        var sN = norm(sc.fullName);
        if (sN && formFull && sN !== formFull && sN !== formRev && !hasPrior) {
          errors.push(c.errScanVsForm.replace('{doc}', esc(sc.docTitle)).replace('{sn}', esc(sc.fullName)).replace('{fn}', esc((s.pf_given_en || '') + ' ' + (s.pf_surname_en || ''))));
        }
        if (sc.dob && s.pf_dob && sc.dob !== s.pf_dob) {
          errors.push(c.errDobFlip.replace('{doc}', esc(sc.docTitle)).replace('{sd}', esc(sc.dob)).replace('{fd}', esc(s.pf_dob)));
        }
      });
      passes.push(c.okScansChecked.replace('{n}', scans.length));
    }

    var outEl = document.getElementById('pf-forensic-out');
    if (outEl && !silent) {
      outEl.style.display = 'block';
      outEl.style.border = '2px solid ' + (errors.length ? '#dc2626' : (warnings.length ? '#d97706' : '#059669'));
      outEl.style.background = errors.length ? '#fef2f2' : (warnings.length ? '#fffbeb' : '#ecfdf5');
      var fixBtn = errors.length
        ? '<button type="button" class="btn" style="margin-top:10px;padding:10px 14px;font-size:0.81rem;background:#0b3b59;" onclick="openMod(\'vetted-team\'); selectConciergeSvc(3);">' + esc(c.btnFixLegal) + '</button>'
        : '';
      outEl.innerHTML = '<div style="font-weight:900;margin-bottom:5px;">' +
        (errors.length ? esc(c.audErrHead.replace('{n}', errors.length)) : esc(c.audOkHead)) + '</div>' +
        errors.map(function(x) { return '<div style="margin-top:5px;color:#991b1b;">' + x + '</div>'; }).join('') +
        warnings.map(function(x) { return '<div style="margin-top:5px;color:#92400e;">' + x + '</div>'; }).join('') +
        passes.map(function(x) { return '<div style="margin-top:4px;color:#065f46;">' + x + '</div>'; }).join('') +
        fixBtn;
    }
    return { errors: errors, warnings: warnings };
  };

  window.buildStatutoryHebrewLetterHtml = function() {
    var s = window.collectCurrentFormDraft();
    var lKey = val('pf_active_letter', 'ext45');
    var branch = val('pf_target_branch', window.PIBA_BRANCHES[0].v);
    var todayHe = new Date().toLocaleDateString('he-IL');
    var nameHe = esc(((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim() || ((s.pf_given_en || '') + ' ' + (s.pf_surname_en || '')).trim() || 'המבקש/ת');
    var passNo = esc(s.pf_pass_num || '—');
    var sp = esc(s.pf_sp_name_he ? (s.pf_sp_name_he + (s.pf_sp_tz ? ' (ת"ז ' + s.pf_sp_tz + ')' : '')) : '');
    var extra = esc(s.pf_rel_story || '');

    var subj = '', body = '';
    if (lKey === 'ext45') {
      subj = 'בקשה דחופה להארכת מועד להמצאת מסמכים ב-45 ימים ומניעת סגירת תיק מנהלית (סעיף ה.7 לנוהל 5.2.0001 / סעיף ה.2(8) לנוהלי 5.2.0008 ו-5.2.0009)';
      body = '<p>1. בהמשך לדרישת המסמכים מיום <strong>' + esc(fmtIsraeliDate(s.pf_demand_date) || todayHe) + '</strong>, פעלנו באופן מיידי להזמנת תעודות המקור ואימותן בחותמת אפוסטיל כדין.</p>' +
        (extra ? '<p>2. פירוט המסמכים שבהנפקה: <strong>' + extra + '</strong>.</p>' : '') +
        '<p>3. בהתאם לנהלי הרשות לשנת 2026, מוגשת בקשה זו מבעוד מועד ובטרם חלוף 30 ימים להארכת המועד ב-45 ימים נוספים ולהימנעות מסגירת התיק על הסף.</p>';
    } else if (lKey === 'utah_refusal') {
      subj = 'בקשה לקליטת מסמכים מאומתים כדין, העברה לבחינת מנהל/ת הלשכה, או מתן החלטה מנומקת בכתב (נוהל 1.6.0001 ועע"מ 7368/22)';
      body = '<p>1. כלל התעודות המוגשות על ידינו הינן מקוריות ומאומתות כדין באפוסטיל בהתאם לנוהל 1.3.0001 ולנהלי 2026 (לרבות הלכת ביהמ"ש העליון בעע"מ 7368/22 המחייבת רישום נישואין אזרחיים מקוונים ממדינת יוטה ונוהל 5.2.0008 מהדורה 16).</p>' +
        (extra ? '<p>2. פירוט נסיבות הפנייה: ' + extra + '</p>' : '') +
        '<p>3. בהתאם לנוהל 1.6.0001 ולכללי המשפט המנהלי, אין לסרב לקליטת בקשה בעל-פה. ככל שקיימת הסתייגות, מתבקשת העברת העניין ל<strong>ראש צוות אשרות / מנהל הלשכה</strong> או מסירת <strong>החלטה מנומקת בכתב</strong> למימוש זכות הערר הפנימי בתוך 21 ימים. מסמכי המקור מוצגים לעיון בלבד לצד מסירת העתקים מלאים לסריקה.</p>';
    } else if (lKey === 'charigim') {
      subj = 'בקשה מנומקת לוועדת חריגים — מתן היתר ללימודי גיור ממלכתי בישראל ממעמד תייר (ב/2)';
      body = '<p>1. הח"מ שוהה בישראל כדין (' + esc(s.pf_entry_date_port || '') + ') ומבקש/ת להצטרף בכנות ובניקיון כפיים למערך הגיור הממלכתי בליווי רב וקהילה בישראל.</p>' +
        (extra ? '<p>2. רקע, כנות הכוונה ויכולת כלכלית עצמאית: ' + extra + '</p>' : '') +
        '<p>3. מצורפות תעודות לידה ויושר מאומתות באפוסטיל. מתבקש אישור ועדת החריגים והארכת אשרת השהייה.</p>';
    } else if (lKey === 'rehab') {
      subj = 'תזכיר שיקום והיעדר מסוכנות לשלום הציבור — 7 אמות המידה בסעיף ה.12.ב לנוהל 5.2.0001 (מאי 2026)';
      body = '<p>1. בגילוי נאות מלא ובהתאם ל-7 אמות המידה בסעיף ה.12.ב לנוהל 5.2.0001, מובא בזאת פירוט המוכיח שיקום מלא וחלוף שנים רבות ללא כל רבב: ' + extra + '</p>';
    } else {
      subj = 'בקשת חריג הומניטרי דחוף — הכרה בתקופת הכנה לגיור בחו"ל ופתיחת תיק בישראל עקב אנטישמיות';
      body = '<p>1. מפאת החרפת אירועי האנטישמיות והפגיעה בביטחון האישי בחו"ל, נאלץ/ה הח"מ להעתיק מגוריו/ה לישראל להמשך רציף של הליך הגיור האורתודוקסי. ' + extra + '</p>';
    }

    return '<div dir="rtl" style="text-align:right;font-family:\'David\',Arial,sans-serif;background:#fff;border:2px solid #0284c7;border-radius:12px;padding:18px;color:#0f172a;line-height:1.7;">' +
      '<div style="display:flex;justify-content:space-between;border-bottom:2px solid #0f172a;padding-bottom:8px;margin-bottom:10px;font-size:0.9rem;">' +
        '<div><strong>לכבוד:</strong> רשות האוכלוסין וההגירה — לשכת ' + esc(branch) + '</div><div><strong>תאריך:</strong> ' + todayHe + '</div></div>' +
      '<div style="font-weight:900;text-decoration:underline;margin-bottom:10px;">הנדון: ' + subj + '</div>' +
      '<div style="background:#f8fafc;border:1px solid #cbd5e1;padding:7px 11px;border-radius:7px;margin-bottom:10px;font-size:0.88rem;">' +
        '<strong>שם המבקש/ת:</strong> ' + nameHe + ' &nbsp;|&nbsp; <strong>מס׳ דרכון:</strong> ' + passNo + (sp ? ' &nbsp;|&nbsp; <strong>מזמין/בן זוג:</strong> ' + sp : '') + '</div>' +
      body +
      '<div style="margin-top:20px;display:flex;justify-content:space-between;border-top:1px dashed #94a3b8;padding-top:10px;font-size:0.88rem;">' +
        '<div>חתימת המבקש/ת: ____________________</div><div>חתימת המזמין/בן הזוג: ____________________</div></div></div>';
  };

  window.printOfficialPibaPacket = async function() {
    var c = ui();
    // Auto-convert any FR/ES/DE/EN answers sitting in Hebrew-target boxes into Clerk Hebrew BEFORE stamping!
    await window.convertFormAnswersToClerkHebrew(true);

    var check = window.runPibaForensicCheck(false);
    var mode = val('pf_builder_mode', 'forms');
    var curForm = val('pf_active_form', 'ash3');
    var s = window.collectCurrentFormDraft();
    var unlocked = (typeof window.canUnlockForms === 'function' && window.canUnlockForms());

    var branch = val('pf_target_branch', window.PIBA_BRANCHES[0].v);
    var todayHe = new Date().toLocaleDateString('he-IL');
    var uLang = (window.appLang || 'en').toLowerCase();
    var langNames = { en: 'ENGLISH', es: 'ESPAÑOL', fr: 'FRANÇAIS', de: 'DEUTSCH', ru: 'РУССКИЙ', he: 'עברית' };
    var guideBannerI18n = {
    "en": {
        "hdr": "🔍 SIDE-BY-SIDE CROSS-REFERENCE & SIGNING GUIDE (ENGLISH ↔ OFFICIAL HEBREW)",
        "sub": "Compare every field in your language on the left with the exact Hebrew stamped into your official Misrad HaPanim PDF on the right. DO NOT hand this reference sheet to the clerk — hand only the Official Royal-Blue Hebrew PDF!",
        "colMother": "1. YOUR LANGUAGE (ENGLISH FIELD & MEANING)",
        "colHeField": "2. OFFICIAL HEBREW BOX ON PDF (עברית)",
        "colHeVal": "3. EXACT STAMPED HEBREW VALUE (ROYAL BLUE INK)",
        "signWarn": "✍️ WET-INK SIGNING RULE: Sign in blue pen ONLY in the applicant/spouse signature boxes when standing in front of the Misrad HaPanim clerk or Israeli lawyer. Leave all \"לשימוש המשרד\" (Official Clerk Use Only) boxes 100% blank!",
        "btnDownloadPdf": "📥 Download Official Royal-Blue Hebrew PDF (Submit to Misrad HaPanim)",
        "btnPrintGuide": "🖨️ Print / Save Side-by-Side Reference Guide (For Your Verification Only)"
    },
    "es": {
        "hdr": "🔍 GUÍA DE REFERENCIA CRUZADA LADO A LADO (ESPAÑOL ↔ HEBREO OFICIAL)",
        "sub": "Compare cada campo en español a la izquierda con el texto exacto en hebreo estampado en su PDF oficial de Misrad HaPanim a la derecha. ¡NO entregue esta hoja guía al funcionario; entregue únicamente el PDF Oficial en Hebreo!",
        "colMother": "1. TU IDIOMA (CAMPO Y SIGNIFICADO EN ESPAÑOL)",
        "colHeField": "2. CASILLA OFICIAL EN EL PDF HEBREO (עברית)",
        "colHeVal": "3. VALOR EXACTO ESTAMPADO EN HEBREO (TINTA AZUL)",
        "signWarn": "✍️ REGLA DE FIRMA EN TINTA AZUL: Firme con bolígrafo azul ÚNICAMENTE en las casillas de firma del solicitante/pareja frente al funcionario de Misrad HaPanim o abogado israelí. ¡Deje todas las casillas \"לשימוש המשרד\" (Uso Oficial) 100% en blanco!",
        "btnDownloadPdf": "📥 Descargar PDF Oficial en Hebreo (Para Entregar en Misrad HaPanim)",
        "btnPrintGuide": "🖨️ Imprimir / Guardar Guía Lado a Lado Español ↔ Hebreo (Solo Para Tu Control)"
    },
    "fr": {
        "hdr": "🔍 GUIDE DE RÉFÉRENCE CROISÉE CÔTE À CÔTE (FRANÇAIS ↔ HÉBREU OFFICIEL)",
        "sub": "Comparez chaque champ en français à gauche avec l’hébreu exact imprimé sur votre PDF officiel du Misrad HaPanim à droite. NE remettez PAS cette feuille guide à l’agent — remettez uniquement le PDF Officiel en Hébreu !",
        "colMother": "1. VOTRE LANGUE (CHAMP EN FRANÇAIS)",
        "colHeField": "2. CASE OFFICIELLE SUR LE PDF HÉBREU (עברית)",
        "colHeVal": "3. VALEUR EXACTE IMPRIMÉE EN HÉBREU (ENCRE BLEUE)",
        "signWarn": "✍️ RÈGLE DE SIGNATURE : Signez au stylo bleu UNIQUEMENT devant l’agent du Misrad HaPanim ou l’avocat israélien. Laissez toutes les cases \"לשימוש המשרד\" (Réservé à l’Administration) 100% vierges !",
        "btnDownloadPdf": "📥 Télécharger le PDF Officiel en Hébreu (À Remettre au Misrad HaPanim)",
        "btnPrintGuide": "🖨️ Imprimer / Enregistrer le Guide Côte à Côte Français ↔ Hébreu"
    },
    "de": {
        "hdr": "🔍 SEITE-AN-SEITE ABGLEICH & UNTERSCHRIFTEN-GUIDE (DEUTSCH ↔ OFFIZIELLES HEBRÄISCH)",
        "sub": "Vergleichen Sie jedes Feld auf Deutsch (links) mit dem exakten hebräischen Eintrag in Ihrem offiziellen Misrad HaPanim PDF (rechts). Geben Sie dieses Kontrollblatt NICHT beim Beamten ab — reichen Sie nur das offizielle hebräische PDF ein!",
        "colMother": "1. IHRE SPRACHE (FELD AUF DEUTSCH)",
        "colHeField": "2. OFFIZIELLES FELD IM HEBRÄISCHEN PDF (עברית)",
        "colHeVal": "3. EXAKTER EINTRAG AUF HEBRÄISCH (BLAUE TINTE)",
        "signWarn": "✍️ UNTERSCHRIFTEN-REGEL: Unterschreiben Sie mit blauem Stift NUR vor dem Misrad HaPanim Beamten oder Anwalt. Lassen Sie alle \"לשימוש המשרד\" (Nur für den Dienstgebrauch) Felder 100% leer!",
        "btnDownloadPdf": "📥 Offizielles Hebräisches PDF Herunterladen (Für Misrad HaPanim)",
        "btnPrintGuide": "🖨️ Seite-an-Seite Kontrollblatt Drucken / Speichern (Deutsch ↔ Hebräisch)"
    },
    "ru": {
        "hdr": "🔍 ПОСТРОЧНАЯ СВЕРКА НА ДВУХ ЯЗЫКАХ (РУССКИЙ ↔ ОФИЦИАЛЬНЫЙ ИВРИТ)",
        "sub": "Сверьте каждое поле на русском языке слева с точным текстом на иврите, вписанным в ваш официальный бланк МВД Израиля справа. НЕ подавайте этот проверочный лист чиновнику — подавайте только официальный PDF на иврите!",
        "colMother": "1. ВАШ ЯЗЫК (ПОЛЕ И ЗНАЧЕНИЕ НА РУССКОМ)",
        "colHeField": "2. ГРАФА В ОФИЦИАЛЬНОМ БЛАНКЕ НА ИВРИТЕ (עברית)",
        "colHeVal": "3. ТОЧНОЕ ЗНАЧЕНИЕ НА ИВРИТЕ В БЛАНКЕ (СИНИЕ ЧЕРНИЛА)",
        "signWarn": "✍️ ПРАВИЛО ПОДПИСИ: Подписывайте синей ручкой ТОЛЬКО в присутствии чиновника МВД или адвоката. Все блоки \"לשימוש המשרד\" (Только для служебного пользования) оставляйте на 100% пустыми!",
        "btnDownloadPdf": "📥 Скачать официальный PDF на иврите (Для подачи в МВД Израиля)",
        "btnPrintGuide": "🖨️ Распечатать / Сохранить двуязычную сверку (Русский ↔ Иврит)"
    },
    "he": {
        "hdr": "🔍 מדריך הצלבה וחתימה במקביל (אנגלית ↔ עברית רשמית)",
        "sub": "השוו בין כל שדה בשפתכם משמאל לבין הנוסח המדויק בעברית המוטבע בטופס ה-PDF הרשמי של משרד הפנים מימין. אין להגיש דף עזר זה לפקיד — יש להגיש אך ורק את טופס ה-PDF הרשמי בעברית (בכחול-רויאל)!",
        "colMother": "1. שפת המקור (שדה ומשמעות באנגלית)",
        "colHeField": "2. משבצת רשמית בטופס ה-PDF (עברית)",
        "colHeVal": "3. ערך מדויק מוטבע בעברית (דיו כחול-רויאל)",
        "signWarn": "✍️ הנחיות לחתימה בעט (דיו רטוב): יש לחתום בעט כחול בלבד במשבצות המיועדות לחתימת המבקש/ת או בן/בת הזוג, אך ורק בנוכחות פקיד משרד הפנים או עורך דין ישראלי. יש להשאיר את כל המשבצות המסומנות \"לשימוש המשרד\" ריקות לחלוטין!",
        "btnDownloadPdf": "📥 הורדת טופס PDF רשמי בעברית בכחול-רויאל (להגשה למשרד הפנים)",
        "btnPrintGuide": "🖨️ הדפסה / שמירה של דף ההצלבה וההשוואה (לצורכי בקרה עצמית בלבד)"
    }
};
    var gb = guideBannerI18n[uLang] || guideBannerI18n.en;

    var htmlOut = '';
    if (mode === 'letters') {
      htmlOut = window.buildStatutoryHebrewLetterHtml();
    } else {
      var fDef = FORMS[curForm] || FORMS.ash3;
      var rows = fDef.fields.map(function(fid, idx) {
        var meta = F[fid];
        if (!meta) return '';
        var rawV = s[fid];
        var motherLabel = (meta.l && (meta.l[uLang] || meta.l.en || meta.l.he)) || fid;
        var heLabel = (meta.l && meta.l.he) || fid;
        var dispHe = meta.t === 'checkbox' ? (rawV ? '☑ כן / מוצהר ומאושר' : '☐ לא סומן') : (meta.t === 'date' ? fmtIsraeliDate(rawV) : (rawV || '—'));
        var dispMother = meta.t === 'checkbox' ? (rawV ? '☑ YES / CHECKED' : '☐ Unchecked') : (meta.t === 'date' ? fmtIsraeliDate(rawV) : (rawV || '—'));
        return '<tr>' +
          '<td dir="ltr" style="width:36%;text-align:left;font-weight:700;background:#f0f9ff;color:#082548;padding:7px 9px;border:1px solid #94a3b8;">' +
            '<span style="color:#0284c7;font-weight:900;">#' + (idx + 1) + '</span> ' + esc(motherLabel) +
            '<div style="font-size:11px;color:#475569;font-weight:600;margin-top:2px;">Input: ' + esc(dispMother) + '</div>' +
          '</td>' +
          '<td dir="rtl" style="width:32%;text-align:right;font-weight:800;background:#f8fafc;color:#0f172a;padding:7px 9px;border:1px solid #94a3b8;">' + esc(heLabel) + '</td>' +
          '<td dir="rtl" style="width:32%;text-align:right;padding:7px 9px;border:1px solid #94a3b8;font-weight:900;color:#0047c2;background:#fff;">' + esc(dispHe) + '</td>' +
        '</tr>';
      }).join('');

      var topActionBtns = unlocked
        ? '<div class="no-print" style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px;">' +
            '<button type="button" class="btn" style="flex:1;min-width:210px;background:#082548;color:#fff;font-weight:900;padding:12px 16px;border-radius:12px;border:2px solid #4FC3F7;cursor:pointer;" onclick="window.downloadGatPibaFormPdf(\'' + esc(curForm) + '\', \'official\')">' + esc(gb.btnDownloadPdf) + '</button>' +
            '<button type="button" class="btn" style="flex:1;min-width:220px;background:linear-gradient(135deg,#0284c7 0%,#0369a1 100%);color:#fff;font-weight:900;padding:12px 16px;border-radius:12px;border:2px solid #7dd3fc;cursor:pointer;" onclick="window.downloadGatPibaFormPdf(\'' + esc(curForm) + '\', \'bilingual\')">📖 ' + esc(gb.btnPrintGuide) + ' (PDF)</button>' +
          '</div>'
        : '';

      htmlOut = topActionBtns +
        '<div style="font-family:Arial,sans-serif;color:#0f172a;background:#fff;padding:14px;border:2px solid #0284c7;border-radius:12px;">' +
          '<div style="background:#fffbeb;border:2px solid #f59e0b;color:#92400e;padding:10px 12px;border-radius:10px;margin-bottom:12px;text-align:left;" dir="ltr">' +
            '<div style="font-size:14px;font-weight:900;margin-bottom:3px;">' + esc(gb.hdr) + '</div>' +
            '<div style="font-size:12px;font-weight:700;line-height:1.4;">' + esc(gb.sub) + '</div>' +
            '<div style="font-size:12px;font-weight:900;color:#b91c1c;margin-top:6px;">' + esc(gb.signWarn) + '</div>' +
          '</div>' +
          '<div dir="rtl" style="display:flex;justify-content:space-between;border-bottom:3px solid #0f172a;padding-bottom:8px;margin-bottom:12px;text-align:right;">' +
            '<div><div style="font-size:17px;font-weight:900;">מדינת ישראל — רשות האוכלוסין וההגירה (' + esc(fDef.code) + ')</div>' +
            '<div style="font-size:13px;color:#0369a1;font-weight:700;">' + esc((fDef.t && (fDef.t[uLang] || fDef.t.en)) || '') + ' &nbsp;|&nbsp; ' + esc(fDef.t.he) + '</div></div>' +
            '<div style="font-size:12px;"><strong>לשכה:</strong> ' + esc(branch) + '<br><strong>תאריך:</strong> ' + todayHe + '</div>' +
          '</div>' +
          '<table style="width:100%;border-collapse:collapse;font-size:12.5px;">' +
            '<thead><tr>' +
              '<th dir="ltr" style="background:#082548;color:#fff;padding:8px;text-align:left;border:1px solid #082548;">' + esc(gb.colMother) + '</th>' +
              '<th dir="rtl" style="background:#082548;color:#fff;padding:8px;text-align:right;border:1px solid #082548;">' + esc(gb.colHeField) + '</th>' +
              '<th dir="rtl" style="background:#0284c7;color:#fff;padding:8px;text-align:right;border:1px solid #0284c7;">' + esc(gb.colHeVal) + '</th>' +
            '</tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table>' +
          '<div dir="rtl" style="margin-top:22px;display:flex;justify-content:space-between;border-top:2px solid #dc2626;padding-top:12px;font-size:12.5px;color:#b91c1c;font-weight:900;">' +
            '<div>❌ [X] תאריך (בפני הפקיד): _____________</div><div>❌ [X] חתימת המבקש/ת (דיו כחול): _____________________</div><div>❌ [X] חתימת בן/בת הזוג: _____________________</div>' +
          '</div>' +
        '</div>';
    }

    // If unlocked and in forms mode, ALSO trigger the Official Royal-Blue Hebrew PDF download automatically!
    if (unlocked && mode === 'forms' && typeof window.stampOfficialGovPdf === 'function') {
      window.stampOfficialGovPdf(curForm, s, !!window.stamperCalibrationMode);
    }

    var prev = document.getElementById('pf-live-packet-preview');
    if (prev) {
      prev.style.display = 'block';
      if (!unlocked) {
        prev.innerHTML = '<div class="hebrew-out watermarked" style="padding:12px;">' + htmlOut + '</div>' +
          '<button type="button" class="btn btn-gold" style="margin-top:10px;" onclick="openProPaywall(' + JSON.stringify(c.pwPrompt) + ', \'forms\')">' + esc(c.pwBtnUnlock) + '</button>';
        prev.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }
      prev.innerHTML = htmlOut;
    }
    if (!unlocked) { if (window.openProPaywall) window.openProPaywall(c.pwPrompt, 'forms'); return; }
    var w = window.open('', '_blank');
    if (!w) return;
    w.document.write('<!doctype html><html lang="he"><head><meta charset="utf-8"><title>' + esc(curForm) + '</title><style>body{max-width:820px;margin:18px auto;padding:0 14px;}@media print{body{margin:0;}}</style></head><body>' + htmlOut + '<script>setTimeout(function(){window.print();},350);<\/script></body></html>');
    w.document.close();
  };

  function updateClerkTimerDisplay() {
    var box = document.getElementById('pf-timer-status');
    if (!box) return;
    var c = ui();
    var dtStr = val('pf_demand_date', '');
    if (!dtStr) {
      box.innerHTML = '<span style="color:#475569;font-size:0.8rem;">' + esc(c.timerEmpty) + '</span>';
      return;
    }
    var elapsed = Math.max(0, Math.floor((Date.now() - Date.parse(dtStr)) / 86400000));
    var l30 = 30 - elapsed, l45 = 45 - elapsed, l21 = 21 - elapsed;
    var pct = Math.min(100, Math.round((elapsed / 45) * 100));
    var col = elapsed >= 30 ? '#dc2626' : (elapsed >= 22 ? '#d97706' : '#0284c7');
    box.innerHTML = '<div style="background:#e2e8f0;height:8px;border-radius:999px;overflow:hidden;margin-bottom:7px;"><div style="width:' + pct + '%;background:' + col + ';height:100%;"></div></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;font-size:0.79rem;font-weight:800;">' +
      '<span style="color:' + (l30 <= 5 ? '#b91c1c' : '#0c4a6e') + ';">' + esc(l30 >= 0 ? c.t30Left.replace('{d}', l30) : c.t30Over.replace('{d}', Math.abs(l30))) + '</span>' +
      '<span style="color:#065f46;">' + esc(l45 >= 0 ? c.t45Left.replace('{d}', l45) : c.t45Exp) + '</span>' +
      '<span style="color:#7c2d12;">' + esc(l21 >= 0 ? c.t21Left.replace('{d}', l21) : c.t21Over) + '</span></div>';
  }

  window.exportClerkDeadlineIcs = function() {
    var c = ui();
    var dtStr = val('pf_demand_date', '') || new Date().toISOString().slice(0, 10);
    var baseMs = Date.parse(dtStr);
    var fmt = function(ms) { return new Date(ms).toISOString().slice(0, 10).replace(/-/g, ''); };
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GiyurAliyahTrack//ClerkShield//EN'];
    [[14, c.ics14], [24, c.ics24], [38, c.ics38]].forEach(function(a, i) {
      lines.push('BEGIN:VEVENT', 'UID:gat-' + fmt(baseMs + a[0] * 86400000) + '-' + i + '@gat', 'DTSTART;VALUE=DATE:' + fmt(baseMs + a[0] * 86400000), 'DTEND;VALUE=DATE:' + fmt(baseMs + (a[0] + 1) * 86400000), 'SUMMARY:' + a[1], 'BEGIN:VALARM', 'TRIGGER:-PT9H', 'ACTION:DISPLAY', 'DESCRIPTION:' + a[1], 'END:VALARM', 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    var link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
    link.download = 'Misrad_HaPanim_Deadlines.ics';
    document.body.appendChild(link); link.click(); link.remove();
  };

  function bindInputs() {
    document.querySelectorAll('.pf-bound-input').forEach(function(el) {
      var initVal = el.type === 'checkbox' ? !!el.checked : el.value;
      el.dataset.lastSavedVal = String(initVal);

      var commitIfChanged = function() {
        var newVal = el.type === 'checkbox' ? !!el.checked : el.value;
        if (String(newVal) === el.dataset.lastSavedVal) return;
        el.dataset.lastSavedVal = String(newVal);
        window.gatFormsState[el.id] = newVal;
        if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);
        var d = loadDraft();
        d[el.id] = newVal;
        try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch (e) {}
        if (el.id === 'pf_gender' && window.applyGenderInflectionToState) {
          if (window.applyGenderInflectionToState(window.gatFormsState)) {
            var dG = loadDraft();
            Object.assign(dG, window.gatFormsState);
            try { localStorage.setItem(DRAFT_KEY, JSON.stringify(dG)); } catch (e) {}
            renderBody();
          }
        }
        if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
        renderMasterDossierBar();
      };

      el.addEventListener('focus', function() {
        var hEl = document.getElementById('hint_' + el.id);
        if (hEl) hEl.style.display = 'block';
      });
      el.addEventListener('blur', function() {
        var hEl = document.getElementById('hint_' + el.id);
        if (hEl) hEl.style.display = 'none';
      });
      if (el.id !== 'pf_active_form' && el.id !== 'pf_target_branch' && el.id !== 'pf_active_letter' && el.id !== 'pf_demand_date' && el.type !== 'checkbox' && el.tagName !== 'SELECT') {
        // When the user starts typing into any field, pop up the Per-Form Typing & Translation Guide Modal (once per form)!
        el.addEventListener('input', function() {
          try {
            var curFormKey = val('pf_active_form', 'ash3');
            var seenMap = JSON.parse(sessionStorage.getItem(FORM_INTRO_SEEN_KEY) || '{}') || {};
            if (!seenMap[curFormKey]) {
              seenMap[curFormKey] = 1;
              sessionStorage.setItem(FORM_INTRO_SEEN_KEY, JSON.stringify(seenMap));
              window.showFormFirstFocusGuideModal(curFormKey, el.id);
            }
          } catch (e) {}
        });
      }

      if (el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'date') {
        el.addEventListener('change', commitIfChanged);
      } else {
        el.addEventListener('change', commitIfChanged);
        el.addEventListener('blur', commitIfChanged);
      }
    });

    // Automatically pop up the Smart Document Upload Modal when the user scrolls down to see #pf_active_form!
    var checkFormDropdownInViewport = function() {
      try {
        var dd = document.getElementById('pf_active_form');
        if (!dd || dd.offsetParent === null) return;
        if (document.getElementById('gat-new-user-doc-modal')) return;
        var rect = dd.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight || 800;
        var isVisible = (rect.top >= 0 && rect.top <= vh * 0.85) || (rect.bottom >= 80 && rect.bottom <= vh);
        if (!isVisible) return;

        var curF = val('pf_active_form', 'ash3');
        var scrollSeenKey = 'gat_scroll_popup_seen_v3_' + curF;
        if (!sessionStorage.getItem(scrollSeenKey)) {
          sessionStorage.setItem(scrollSeenKey, '1');
          if (typeof window.triggerSmartPopupOnFormSwap === 'function') {
            window.triggerSmartPopupOnFormSwap(curF);
          }
        }
      } catch (e) {}
    };

    var formDropdownEl = document.getElementById('pf_active_form');
    if (formDropdownEl && typeof IntersectionObserver !== 'undefined') {
      if (window._gatFormScrollObsInstance) {
        try { window._gatFormScrollObsInstance.disconnect(); } catch (e) {}
      }
      window._gatFormScrollObsInstance = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            checkFormDropdownInViewport();
          }
        });
      }, { threshold: [0.15, 0.5] });
      window._gatFormScrollObsInstance.observe(formDropdownEl);
    }

    if (!window._gatFormWindowScrollBound) {
      window._gatFormWindowScrollBound = true;
      window.addEventListener('scroll', checkFormDropdownInViewport, { passive: true });
    }
    setTimeout(checkFormDropdownInViewport, 250);
  }

  var STEP_ACCORDION_I18N = {
    en: {
      s1: 'Step 1: Primary Applicant Identity & Passport',
      s2: 'Step 2: Parents, Family Registry & Marital Details',
      s3: 'Step 3: Partner / Israeli Sponsor, Housing & Track Details',
      s4: 'Step 4: Declarations, Background & Additional Fields',
      nextBtn: 'Continue to Next Step ↓',
      fieldsCount: '{done}/{total} filled',
      dockTitle: '🧭 ALL SERVICES:',
      dForms: '📄 1. Forms & Letters',
      dCouples: '💑 2. 300-Q Couples Sync',
      dBd: '🕍 3. 700 Beit Din Qs',
      dSongs: '🎵 4. 56 Songs & Brachot',
      dConcierge: '⚖️ 5. Notary / Rabbi / Lawyer'
    },
    fr: {
      s1: 'Étape 1 : Identité du Demandeur & Passeport',
      s2: 'Étape 2 : Parents, État Civil & Famille',
      s3: 'Étape 3 : Conjoint / Invitant Israélien, Logement & Statut',
      s4: 'Étape 4 : Déclarations, Antécédents & Détails Complémentaires',
      nextBtn: 'Passer à l’étape suivante ↓',
      fieldsCount: '{done}/{total} remplis',
      dockTitle: '🧭 TOUS LES SERVICES :',
      dForms: '📄 1. Formulaires & Lettres',
      dCouples: '💑 2. 300-Q Sync Couple',
      dBd: '🕍 3. 700 Qs Beit Din',
      dSongs: '🎵 4. 56 Chants & Brachot',
      dConcierge: '⚖️ 5. Notaire / Rabbin / Avocat'
    },
    es: {
      s1: 'Paso 1: Identidad del Solicitante y Pasaporte',
      s2: 'Paso 2: Padres, Estado Civil y Familia',
      s3: 'Paso 3: Pareja / Invitante Israelí, Vivienda y Trámite',
      s4: 'Paso 4: Declaraciones, Antecedentes y Campos Adicionales',
      nextBtn: 'Continuar al siguiente paso ↓',
      fieldsCount: '{done}/{total} completados',
      dockTitle: '🧭 TODOS LOS SERVICIOS:',
      dForms: '📄 1. Formularios y Cartas',
      dCouples: '💑 2. 300-P Sync Parejas',
      dBd: '🕍 3. 700 Preg. Beit Din',
      dSongs: '🎵 4. 56 Canciones y Brajot',
      dConcierge: '⚖️ 5. Notario / Rabino / Abogado'
    },
    de: {
      s1: 'Schritt 1: Antragsteller-Identität & Reisepass',
      s2: 'Schritt 2: Eltern, Familienstand & Kinder',
      s3: 'Schritt 3: Partner / Einlader, Wohnung & Antragsdetails',
      s4: 'Schritt 4: Erklärungen, Hintergrund & Weitere Angaben',
      nextBtn: 'Weiter zum nächsten Schritt ↓',
      fieldsCount: '{done}/{total} ausgefüllt',
      dockTitle: '🧭 ALLE SERVICES:',
      dForms: '📄 1. Formulare & Briefe',
      dCouples: '💑 2. 300-F Paar-Sync',
      dBd: '🕍 3. 700 Beit-Din-Fragen',
      dSongs: '🎵 4. 56 Lieder & Brachot',
      dConcierge: '⚖️ 5. Notar / Rabbiner / Anwalt'
    },
    ru: {
      s1: 'Шаг 1: Личные данные заявителя и Паспорт',
      s2: 'Шаг 2: Родители, семейное положение и дети',
      s3: 'Шаг 3: Супруг / Приглашающий, жильё и детали статуса',
      s4: 'Шаг 4: Декларации, биография и дополнительные поля',
      nextBtn: 'Перейти к следующему шагу ↓',
      fieldsCount: 'Заполнено {done} из {total}',
      dockTitle: '🧭 ВСЕ СЕРВИСЫ:',
      dForms: '📄 1. Анкеты и Письма',
      dCouples: '💑 2. 300 вопр. для пар',
      dBd: '🕍 3. 700 вопр. Бейт-Дина',
      dSongs: '🎵 4. 56 Песен и Брахот',
      dConcierge: '⚖️ 5. Нотариус / Раввин / Адвокат'
    },
    he: {
      s1: 'שלב 1: פרטי המבקש/ת ודרכון',
      s2: 'שלב 2: שמות הורים, מצב אישי וילדים',
      s3: 'שלב 3: בן/בת זוג או מזמין ישראלי, כתובת ופרטי הבקשה',
      s4: 'שלב 4: הצהרות, רקע ושדות משלימים',
      nextBtn: 'המשך לשלב הבא ↓',
      fieldsCount: '{done}/{total} מולאו',
      dockTitle: '🧭 כל השירותים במערכת:',
      dForms: '📄 1. טפסים ומכתבים',
      dCouples: '💑 2. סימולטור זוגות (300)',
      dBd: '🕍 3. מאגר בית הדין (700)',
      dSongs: '🎵 4. שירי שבת וברכות (56)',
      dConcierge: '⚖️ 5. נוטריון / רב מלווה / עו"ד'
    }
  };

  window.toggleGatFormAccordionStep = function(stepIdx) {
    window._gatActiveAccordionStep = stepIdx;
    for (var i = 1; i <= 4; i++) {
      var bodyEl = document.getElementById('gat-acc-step-body-' + i);
      var chevEl = document.getElementById('gat-acc-step-chev-' + i);
      var hdrEl = document.getElementById('gat-acc-step-hdr-' + i);
      if (bodyEl) {
        var isOpen = (i === stepIdx);
        bodyEl.style.display = isOpen ? 'block' : 'none';
        if (chevEl) chevEl.textContent = isOpen ? '▼' : '▶';
        if (hdrEl) {
          hdrEl.style.background = isOpen ? 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)' : '#f8fafc';
          hdrEl.style.color = isOpen ? '#ffffff' : '#0f172a';
          hdrEl.style.borderColor = isOpen ? '#0284c7' : '#cbd5e1';
        }
      }
    }
    var targetCard = document.getElementById('gat-acc-step-card-' + stepIdx);
    if (targetCard && typeof targetCard.scrollIntoView === 'function') {
      try { targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
    }
  };

  function classifyFieldIntoStep(fid) {
    if (/^(pf_surname_he|pf_surname_en|pf_given_he|pf_given_en|pf_prior_names|pf_dob|pf_hebrew_dob|pf_gender|pf_pass_num|pf_pass_issue_date|pf_pass_exp_date|pf_tz|pf_laissez_passer|pf_entry_date_port)$/.test(fid)) {
      return 1;
    }
    if (/^(pf_father_he|pf_mother_he|pf_mother_maiden|pf_birth_country|pf_citizenship|pf_religion_nat|pf_marital|pf_marriage_date|pf_marriage_place_he|pf_marriage_details|pf_children_table|pf_ll_children_count)$/.test(fid)) {
      return 2;
    }
    if (/^(pf_sp_|pf_il_addr_he|pf_abroad_addr|pf_phone_il|pf_email|pf_ash3_|pf_456_|pf_ash1_|pf_couple_|pf_aff_|pf_ll_|pf_inst_|pf_rabbi_)/.test(fid)) {
      return 3;
    }
    return 4;
  }

  function buildStickyServiceDockHtml() {
    var l = lang();
    var stTxt = STEP_ACCORDION_I18N[l] || STEP_ACCORDION_I18N.en;
    var btnStyle = 'padding:6px 11px;border-radius:999px;font-size:0.74rem;font-weight:800;cursor:pointer;border:1.5px solid #cbd5e1;background:#ffffff;color:#1e293b;white-space:nowrap;transition:all 0.15s;';
    var activeStyle = 'padding:6px 12px;border-radius:999px;font-size:0.74rem;font-weight:900;cursor:pointer;border:2px solid #0284c7;background:#e0f2fe;color:#0369a1;white-space:nowrap;';
    return '<div id="gat-sticky-service-dock" style="position:sticky;top:8px;z-index:90;background:rgba(255,255,255,0.96);backdrop-filter:blur(6px);border:2px solid #cbd5e1;border-radius:14px;padding:8px 12px;margin-bottom:12px;box-shadow:0 6px 18px rgba(15,23,42,0.08);display:flex;align-items:center;justify-content:space-between;gap:8px;overflow-x:auto;">' +
      '<span style="font-size:0.73rem;font-weight:900;color:#475569;white-space:nowrap;">' + esc(stTxt.dockTitle) + '</span>' +
      '<div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;">' +
        '<button type="button" style="' + activeStyle + '">' + esc(stTxt.dForms) + '</button>' +
        '<button type="button" onclick="if(window.openMod){window.openMod(\'couples-300\');window.scrollTo({top:0,behavior:\'smooth\'});}" style="' + btnStyle + '">' + esc(stTxt.dCouples) + '</button>' +
        '<button type="button" onclick="if(window.openMod){window.openMod(\'beit-din-150\');window.scrollTo({top:0,behavior:\'smooth\'});}" style="' + btnStyle + '">' + esc(stTxt.dBd) + '</button>' +
        '<button type="button" onclick="if(window.openMod){window.openMod(\'mod-songs-prayers\');window.scrollTo({top:0,behavior:\'smooth\'});}" style="' + btnStyle + '">' + esc(stTxt.dSongs) + '</button>' +
        '<a href="/concierge-booking/?lang=' + encodeURIComponent(l) + '" style="' + btnStyle + 'text-decoration:none;border-color:#f59e0b;background:#fffbeb;color:#92400e;">' + esc(stTxt.dConcierge) + '</a>' +
      '</div>' +
    '</div>';
  }

  function renderField(fid) {
    var meta = F[fid];
    if (!meta) return '';
    var c = ui();
    var curLang = lang();
    var fType = meta.t || meta.type || 'text';
    var scriptType = meta.script || 'he';

    // 1. NEVER show a 'Hebrew / עברית' badge (users type in their own language and we translate!).
    //    For Passport Latin fields, place the blue 'PASSPORT LATIN (A–Z)' pill DIRECTLY BELOW the input field!
    var badgeTextLatin = c.badgeEn || 'PASSPORT LATIN (A–Z)';
    var belowInputBadgeHtml = '';
    if ((scriptType === 'latin' || scriptType === 'en') && fType !== 'checkbox') {
      belowInputBadgeHtml = '<div style="margin-top:4px;display:flex;align-items:center;">' +
        '<span style="background:#e0f2fe;color:#0369a1;border:1px solid #7dd3fc;font-size:0.65rem;padding:2px 8px;border-radius:6px;font-weight:800;letter-spacing:0.02em;white-space:nowrap;display:inline-block;">' + esc(badgeTextLatin) + '</span>' +
      '</div>';
    }

    var rawLabel = String(tr(meta.l) || '').replace(/\s*\*+\s*$/, '').trim();
    var reqStar = meta.req ? ' <span style="color:#dc2626;font-weight:900;">*</span>' : '';
    var curV = val(fid, meta.def !== undefined ? meta.def : '');
    var hasHebChars = /[\u0590-\u05FF]/.test(String(curV || ''));
    var dirAttr = (scriptType === 'latin' || scriptType === 'en')
      ? 'ltr'
      : ((curLang === 'he' || hasHebChars) ? 'rtl' : 'ltr');

    var hintText = meta.h ? tr(meta.h) : '';
    var hintHtml = hintText
      ? '<div id="hint_' + fid + '" style="display:none;margin-top:4px;font-size:0.73rem;color:#0369a1;background:#f0f9ff;border-left:3px solid #0284c7;padding:5px 8px;border-radius:5px;line-height:1.35;font-weight:600;">💡 ' + esc(hintText) + '</div>'
      : '';

    var commonStyle = 'margin:0;width:100%;height:42px;box-sizing:border-box;font-size:0.88rem;padding:8px 11px;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f172a;font-weight:700;';

    if (fType === 'checkbox') {
      var checked = (curV === true || curV === 'true' || curV === '1');
      return '<div style="grid-column:1 / -1;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:10px;padding:10px 12px;">' +
        '<label style="display:flex;align-items:flex-start;gap:9px;cursor:pointer;margin:0;font-weight:800;font-size:0.84rem;color:#0f172a;">' +
          '<input type="checkbox" id="' + fid + '" class="pf-bound-input" ' + (checked ? 'checked' : '') + ' style="width:18px;height:18px;margin-top:2px;accent-color:#059669;cursor:pointer;" />' +
          '<span>' + esc(rawLabel) + reqStar + '</span>' +
        '</label>' +
        hintHtml +
      '</div>';
    }

    var cleanPh = String(tr(meta.ph || meta.l) || '').replace(/\s*\*+\s*$/, '').trim();
    var inputHtml = '';
    if (fType === 'select' && Array.isArray(meta.opts)) {
      var optsHtml = meta.opts.map(function(o) {
        var isSel = String(curV) === String(o.v);
        var optLabel = tr(o.t || o);
        return '<option value="' + esc(o.v) + '"' + (isSel ? ' selected' : '') + '>' + esc(optLabel) + '</option>';
      }).join('');
      inputHtml = '<select id="' + fid + '" class="pf-bound-input" style="' + commonStyle + '">' + optsHtml + '</select>';
    } else if (fType === 'textarea') {
      inputHtml = '<textarea id="' + fid + '" class="pf-bound-input" rows="2" dir="' + dirAttr + '" placeholder="' + esc(cleanPh) + '" style="' + commonStyle + 'height:auto;min-height:68px;resize:vertical;">' + esc(curV) + '</textarea>';
    } else {
      var inpType = (fType === 'date') ? 'date' : 'text';
      inputHtml = '<input type="' + inpType + '" id="' + fid + '" class="pf-bound-input" dir="' + dirAttr + '" value="' + esc(curV) + '" placeholder="' + esc(cleanPh) + '" style="' + commonStyle + '" />';
    }

    return '<div style="display:flex;flex-direction:column;justify-content:flex-start;' + (fType === 'textarea' ? 'grid-column:1 / -1;' : '') + '">' +
      '<div style="min-height:34px;display:flex;align-items:flex-end;justify-content:space-between;gap:6px;margin-bottom:5px;">' +
        '<label for="' + fid + '" style="margin:0;font-size:0.79rem;font-weight:800;color:#1e293b;line-height:1.22;">' + esc(rawLabel) + reqStar + '</label>' +
      '</div>' +
      inputHtml +
      belowInputBadgeHtml +
      hintHtml +
    '</div>';
  }
  function renderBody() {
    var savedScrollY = window.scrollY || window.pageYOffset || 0;
    var activeEl = document.activeElement;
    var activeId = (activeEl && activeEl.id) ? activeEl.id : null;
    if (typeof window.syncCrossFormFields === 'function') window.syncCrossFormFields(true);
    var host = document.getElementById('pf-dynamic-body');
    if (!host) return;
    var c = ui();
    var mode = val('pf_builder_mode', 'forms');
    var curBr = val('pf_target_branch', window.PIBA_BRANCHES[0].v);
    var brOpts = window.PIBA_BRANCHES.map(function(b) {
      return '<option value="' + esc(b.v) + '"' + (curBr === b.v ? ' selected' : '') + '>' + esc(tr(b.l)) + '</option>';
    }).join('');

    var modeTabs = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">' +
      '<button type="button" class="btn" style="margin:0;padding:11px;font-size:0.83rem;background:' + (mode === 'forms' ? '#0284c7' : '#475569') + ';" onclick="window.gatFormsState.pf_builder_mode=\'forms\';window.mountUnifiedPibaFormsEngine();">' + esc(c.modeForms) + '</button>' +
      '<button type="button" class="btn" style="margin:0;padding:11px;font-size:0.83rem;background:' + (mode === 'letters' ? '#0284c7' : '#475569') + ';" onclick="window.gatFormsState.pf_builder_mode=\'letters\';window.mountUnifiedPibaFormsEngine();">' + esc(c.modeLetters) + '</button></div>';

    if (mode === 'letters') {
      var curL = val('pf_active_letter', 'ext45');
      var lOpts = Object.keys(LETTERS).map(function(k) {
        return '<option value="' + k + '"' + (curL === k ? ' selected' : '') + '>' + esc(tr(LETTERS[k].t)) + '</option>';
      }).join('');
      host.innerHTML =
        buildStickyServiceDockHtml() +
        modeTabs +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:10px;margin-bottom:10px;">' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selLetter) + '</label><select id="pf_active_letter" class="pf-bound-input" style="margin:0;" onchange="window.setGatFormOption(this.id, this.value);">' + lOpts + '</select></div>' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selBranch) + '</label><select id="pf_target_branch" class="pf-bound-input" style="margin:0;">' + brOpts + '</select></div></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;">' +
          renderField('pf_given_he') + renderField('pf_surname_he') + renderField('pf_pass_num') + renderField('pf_sp_name_he') + renderField('pf_sp_tz') +
        '</div>' +
        '<div style="margin-top:10px;">' + renderField('pf_rel_story') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">' +
          '<button type="button" id="pf-btn-ai-heb" class="btn" style="margin:0;flex:1;min-width:190px;background:#0369a1;" onclick="convertFormAnswersToClerkHebrew(false)">' + esc(c.btnAiHeb) + '</button>' + (window.hasPreHebrewBackup && window.hasPreHebrewBackup() ? '<button type="button" id="pf-btn-undo-heb" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#dc2626;color:#fff;display:inline-flex;align-items:center;gap:5px;font-weight:900;box-shadow:0 3px 10px rgba(220,38,38,0.3);" onclick="window.undoClerkHebrewConversion()" title="Restore original pre-Hebrew text"><span style="font-size:1.05rem;line-height:1;">↺</span> ' + esc((FORM_GUIDE_I18N[lang()] || FORM_GUIDE_I18N.en).undoBtn.replace(/^↺\s*/, '')) + '</button>' : '') +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#0f766e;" onclick="window.stampDemoPersonaPdf()">' + esc(c.calBtn || '🧪 Sample Filled PDF') + '</button>' +
          '<button type="button" class="btn btn-emerald" style="margin:0;flex:1;min-width:190px;" onclick="printOfficialPibaPacket()">' + esc(c.btnPrintFinal) + '</button></div>' +
        '<div id="pf-live-packet-preview" style="margin-top:12px;">' + window.buildStatutoryHebrewLetterHtml() + '</div>';
    } else {
      var curF = val('pf_active_form', 'ash3');
      var fDef = FORMS[curF] || FORMS.ash3;
      var fOpts = Object.keys(FORMS).map(function(k) {
        return '<option value="' + k + '"' + (curF === k ? ' selected' : '') + '>' + esc(tr(FORMS[k].t)) + '</option>';
      }).join('');

      var lStep = lang();
      var stTxt = STEP_ACCORDION_I18N[lStep] || STEP_ACCORDION_I18N.en;
      var activeStep = window._gatActiveAccordionStep || 1;
      var stepBuckets = { 1: [], 2: [], 3: [], 4: [] };
      fDef.fields.forEach(function(fid) {
        if (!F[fid]) return;
        var sIdx = classifyFieldIntoStep(fid);
        stepBuckets[sIdx].push(fid);
      });

      var accordionCardsHtml = [1, 2, 3, 4].map(function(sIdx) {
        var fList = stepBuckets[sIdx] || [];
        if (!fList.length) return '';
        var filledCnt = fList.filter(function(fid) {
          var v = val(fid, F[fid] && F[fid].def !== undefined ? F[fid].def : '');
          return v !== undefined && v !== null && String(v).trim() !== '' && v !== false;
        }).length;
        var isOpen = (sIdx === activeStep);
        var hdrBg = isOpen ? 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)' : '#f8fafc';
        var hdrCol = isOpen ? '#ffffff' : '#0f172a';
        var hdrBdr = isOpen ? '#0284c7' : '#cbd5e1';
        var badgeBg = (filledCnt === fList.length) ? '#16a34a' : (isOpen ? '#0284c7' : '#e2e8f0');
        var badgeCol = (filledCnt === fList.length || isOpen) ? '#ffffff' : '#334155';
        var nextStepBtn = (sIdx < 4 && stepBuckets[sIdx + 1] && stepBuckets[sIdx + 1].length > 0)
          ? '<div style="margin-top:12px;text-align:end;"><button type="button" onclick="window.toggleGatFormAccordionStep(' + (sIdx + 1) + ')" style="background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;border:none;border-radius:9px;padding:9px 16px;font-size:0.82rem;font-weight:900;cursor:pointer;box-shadow:0 3px 10px rgba(2,132,199,0.25);">' + esc(stTxt.nextBtn) + '</button></div>'
          : '';

        return '<div id="gat-acc-step-card-' + sIdx + '" style="border:2px solid ' + hdrBdr + ';border-radius:13px;margin-bottom:10px;background:#ffffff;overflow:hidden;box-shadow:0 2px 8px rgba(15,23,42,0.04);">' +
          '<div id="gat-acc-step-hdr-' + sIdx + '" onclick="window.toggleGatFormAccordionStep(' + sIdx + ')" style="background:' + hdrBg + ';color:' + hdrCol + ';padding:12px 15px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;user-select:none;">' +
            '<div style="display:flex;align-items:center;gap:9px;font-weight:900;font-size:0.9rem;">' +
              '<span id="gat-acc-step-chev-' + sIdx + '" style="font-size:0.8rem;color:#38bdf8;">' + (isOpen ? '▼' : '▶') + '</span>' +
              '<span>' + esc(stTxt['s' + sIdx]) + '</span>' +
            '</div>' +
            '<span style="background:' + badgeBg + ';color:' + badgeCol + ';padding:3px 10px;border-radius:999px;font-size:0.73rem;font-weight:900;white-space:nowrap;">' +
              esc(stTxt.fieldsCount.replace('{done}', String(filledCnt)).replace('{total}', String(fList.length))) +
            '</span>' +
          '</div>' +
          '<div id="gat-acc-step-body-' + sIdx + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding:14px;">' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px;">' +
              fList.map(renderField).join('') +
            '</div>' +
            nextStepBtn +
          '</div>' +
        '</div>';
      }).join('');

      host.innerHTML =
        buildStickyServiceDockHtml() +
        modeTabs +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:10px;margin-bottom:10px;">' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selForm) + '</label><select id="pf_active_form" class="pf-bound-input" style="margin:0;" onchange="window.setGatFormOption(this.id, this.value);if(window.triggerSmartPopupOnFormSwap)window.triggerSmartPopupOnFormSwap(this.value);">' + fOpts + '</select></div>' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selBranch) + '</label><select id="pf_target_branch" class="pf-bound-input" style="margin:0;">' + brOpts + '</select></div></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px;">' +
          '<input type="file" id="pf-cert-autofill-inp" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="window.scanCertIntoFormsEngine(this)" />' +
          '<button type="button" class="btn" style="margin:0;padding:9px 13px;font-size:0.79rem;width:auto;background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;font-weight:900;" onclick="window.showNewUserDocUploadModal(\'' + esc(curF) + '\', null, true)">' + esc(c.afBtn || '📸 Scan Document → Auto-Fill') + '</button>' +
          '<button type="button" id="pf-btn-ai-heb" class="btn" style="margin:0;padding:9px 13px;font-size:0.79rem;width:auto;background:#0369a1;font-weight:900;" onclick="convertFormAnswersToClerkHebrew(false)">' + esc(c.btnAiHeb) + '</button>' + (window.hasPreHebrewBackup && window.hasPreHebrewBackup() ? '<button type="button" id="pf-btn-undo-heb" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#dc2626;color:#fff;display:inline-flex;align-items:center;gap:5px;font-weight:900;box-shadow:0 3px 10px rgba(220,38,38,0.3);" onclick="window.undoClerkHebrewConversion()" title="Restore original pre-Hebrew text"><span style="font-size:1.05rem;line-height:1;">↺</span> ' + esc((FORM_GUIDE_I18N[lang()] || FORM_GUIDE_I18N.en).undoBtn.replace(/^↺\s*/, '')) + '</button>' : '') +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.76rem;width:auto;background:#334155;" onclick="printBlankNativeWorksheet()">' + esc(c.btnPrintBlank) + '</button>' +
          '<input type="file" id="pf-ws-scan-inp" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="scanHandwrittenWorksheet(this)" />' +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.76rem;width:auto;background:#0f172a;border:1.5px dashed #38bdf8;color:#38bdf8;" onclick="document.getElementById(\'pf-ws-scan-inp\').click()">' + esc(c.btnScanWs) + '</button>' +
        '</div>' +
        '<div style="display:block;">' + accordionCardsHtml + '</div>' +
        '<div id="pf-forensic-out" style="display:none;margin-top:14px;padding:12px 14px;border-radius:11px;font-size:0.84rem;line-height:1.5;"></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">' +
          '<button type="button" class="btn" style="margin:0;flex:1;min-width:110px;background:#334155;" onclick="if(window.handleManualFormSaveClick)window.handleManualFormSaveClick();">' + esc(c.btnSave) + '</button>' +
          '<button type="button" class="btn" style="margin:0;flex:2;min-width:190px;background:#0f766e;" onclick="runPibaForensicCheck(false)">' + esc(c.btnAudit) + '</button>' +
          '<button type="button" class="btn btn-emerald" style="margin:0;flex:2;min-width:210px;" onclick="printOfficialPibaPacket()">' + esc(c.btnPrintFinal) + '</button></div>' +
        '<div id="pf-live-packet-preview" style="display:none;margin-top:12px;"></div>' +
        '<div style="margin-top:10px;font-size:0.82rem;color:#dc2626;background:#fef2f2;border:1.5px solid #fecaca;padding:8px 12px;border-radius:8px;text-align:center;font-weight:900;">🚨 ' + esc(c.autoSaveNote) + '</div>';
    }
    bindInputs();
  }
  window.mountUnifiedPibaFormsEngine = function() {
    hookAuditDocInterceptor();
    var mod = document.getElementById('mod-hebrew-engine');
    if (!mod) return;
    var c = ui();

    var rawBtns = window.PIBA_OFFICIAL_PDFS.map(function(p) {
      return '<a href="' + p.file + '" target="_blank" rel="noopener" download style="display:inline-flex;align-items:center;gap:5px;background:#334155;color:#fff;text-decoration:none;font-size:0.74rem;font-weight:800;padding:6px 10px;border-radius:7px;">📄 ' + esc(p.code) + ' — ' + esc(tr(p.t)) + ' ⬇</a>';
    }).join('');

    var topCard = document.getElementById('pf-top-vault-card');
    if (!topCard) {
      topCard = document.createElement('div');
      topCard.id = 'pf-top-vault-card';
      var firstCard = mod.querySelector('.card');
      if (firstCard) mod.insertBefore(topCard, firstCard);
      else mod.appendChild(topCard);
    }

    topCard.innerHTML =
      '<div class="card" style="border:2px solid #059669;background:#f0fdf4;margin-bottom:14px;">' +
        '<h2 style="font-size:1.03rem;color:#065f46;margin-bottom:4px;">' + esc(c.dosTitle) + '</h2>' +
        '<p style="font-size:0.81rem;color:#064e3b;margin-bottom:9px;">' + esc(c.dosSub) + '</p>' +
        '<div id="pf-master-dossier-bar"></div>' +
        '<details style="margin-top:10px;border-top:1px dashed #86efac;padding-top:8px;">' +
          '<summary style="font-size:0.78rem;font-weight:800;color:#0369a1;cursor:pointer;">' + esc(c.rawDrawer) + '</summary>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">' + rawBtns + '</div>' +
        '</details>' +
      '</div>' +
      '<div class="card" style="border:2px solid #f59e0b;background:#fffbeb;margin-bottom:14px;">' +
        '<h2 style="font-size:1.01rem;color:#92400e;margin-bottom:4px;">' + esc(c.timerTitle) + '</h2>' +
        '<p style="font-size:0.81rem;color:#78350f;line-height:1.48;margin-bottom:9px;">' + esc(c.timerLead) + '</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin-bottom:9px;">' +
          '<div style="flex:1;min-width:200px;"><label for="pf_demand_date" style="margin:0 0 4px;font-size:0.78rem;font-weight:800;color:#78350f;">' + esc(c.timerDateLbl) + '</label>' +
          '<input type="date" id="pf_demand_date" class="pf-bound-input" value="' + esc(val('pf_demand_date', '')) + '" style="margin:0;background:#fff;" /></div>' +
          '<button type="button" class="btn" style="margin:0;width:auto;padding:10px 13px;background:#b45309;font-size:0.8rem;" onclick="exportClerkDeadlineIcs()">' + esc(c.timerCalBtn) + '</button></div>' +
        '<div id="pf-timer-status" style="background:#fff;border:1px solid #fcd34d;border-radius:9px;padding:8px 11px;"></div></div>';

    var legacySelect = document.getElementById('he-doc-type');
    if (legacySelect) {
      var card3 = legacySelect.closest('.card');
      if (card3) {
        card3.style.border = '2px solid #0284c7';
        card3.innerHTML = '<div id="pf-dynamic-body"></div>';
      }
    }

    var mountScrollY = window.scrollY || window.pageYOffset || 0;
    renderBody();
    renderMasterDossierBar();
    updateClerkTimerDisplay();
    if (Math.abs((window.scrollY || window.pageYOffset || 0) - mountScrollY) > 5) {
      window.scrollTo(0, mountScrollY);
    }
  };


  // Inject full Russian (RU) support across UI, Forms, Fields, Branches & Letters
  if (window.GAT_FORMS_META && window.GAT_FORMS_META.UI) {
    window.GAT_FORMS_META.UI.ru = {
      dosTitle: '✈️ Мастер-Досье и Перекрёстная Проверка Документов (Синхронизация с Сервером)',
      dosSub: 'Каждое отсканированное свидетельство и анкета на русском автоматически сверяются и переводятся на официальный иврит МВД:',
      noScans: '📸 Пока 0 сканов (Отсканируйте документы в Карточке #2)',
      hebReady: '100% Готово на Иврите',
      tapConvert: 'Нажмите: Перевести → Иврит',
      rawDrawer: '📂 Справка: Пустые Оригинальные Бланки Gov.il на Иврите (Опционально)',
      timerTitle: '⏱️ Таймер 25/30 против 45 Дней и Защита от Произвола Чиновников',
      timerLead: 'Процедуры 2026 года дают 45 дней по закону (21 день на апелляцию), но на практике служащие часто закрывают дела через 30 дней или тормозят анкеты не на иврите. Подавайте до 25-го дня НА ИВРИТЕ и требуйте письменный отказ!',
      timerDateLbl: 'Дата выдачи списка недостающих документов (Дришат Мисмахим):',
      timerCalBtn: '🔔 Напоминания на 24-й и 38-й День (.ics)',
      timerEmpty: 'Выберите дату выше, чтобы запустить живой отсчёт 25 и 45 дней.',
      t30Left: '🎯 Привычка МВД 30д: осталось {d}д',
      t30Over: '🚨 +{d}д сверх 30д — ПОДАЙТЕ ПРОДЛЕНИЕ!',
      t45Left: '⚖️ Закон 2026 (45д): осталось {d}д',
      t45Exp: '🛑 Срок 45д ИСТЁК',
      t21Left: '🛡️ Апелляция 21д: осталось {d}д',
      t21Over: 'Срок 21д прошёл',
      ics14: 'Проверка МВД (День 14): Проверить апостили и нотариальные переводы',
      ics24: 'СРОЧНО МВД (День 24): Подать пакет или запрос на продление ДО 30-го дня!',
      ics38: 'КРИТИЧЕСКИЙ СРОК 45 Дней (День 38): Обязательно подать письменное продление сегодня!',
      modeForms: '📋 1. Анкеты МВД PIBA (На Русском → Иврит для МВД)',
      modeLetters: '🛡️ 2. Официальные Письма на Иврите и Эскалация Директору',
      selForm: '1. Выберите Официальный Бланк МВД (Мисрад ха-Паним):',
      selLetter: '1. Выберите Юридическое Письмо / Эскалацию:',
      selBranch: '2. Отделение МВД (Мисрад ха-Паним):',
      btnPrintBlank: '🖨️ Распечатать Пустую Анкету (на Русском)',
      btnScanWs: '📸 Сканировать Заполненный Лист от Руки (ИИ → Иврит)',
      btnAiHeb: '🌐 Перевести на иврит',
      btnConverting: '⏳ Переводим на официальный иврит МВД...',
      btnSave: '💾 Сохранить',
      btnAudit: '🔍 Сверить и Проверить Все Документы',
      btnPrintFinal: '🖨️ Создать Официальный Пакет на Иврите (PDF)',
      autoSaveNote: '☁️ Автосохранение каждого поля • Ответы на русском автоматически конвертируются в иврит перед печатью.',
      wsIntro: 'Заполните разборчиво на русском языке и сфотографируйте через кнопку «Сканировать Заполненный Лист» — ИИ переведёт всё на официальный иврит МВД.',
      wsYes: '☐ Да / Подтверждаю',
      alreadyHeb: '✅ Все поля для чиновника уже заполнены на иврите!',
      scanningWs: '🔍 Сканируем ваш рукописный лист и переводим ответы на иврит МВД...',
      audErrHead: '🛑 Обнаружено рисков отказа ({n}) перед вашим визитом:',
      audOkHead: '✅ 100% Защищённое Досье — Все Перекрёстные Проверки Пройдены!',
      errMissing: '🚨 <strong>Не заполнены обязательные поля {code} ({n}):</strong> {list}',
      okAllFilled: '✅ Все обязательные поля {code} заполнены.',
      errNonHeb: '🌐 <strong>Ловушка МВД — Текст не на иврите в {n} полях:</strong> Нажмите <strong>«Перевести Мои Ответы → Иврит»</strong> (или кнопку PDF для автоперевода)!',
      okHebFirst: '✅ 100% Соответствие: Все поля для чиновника на иврите, а паспортные поля — латиницей.',
      errDecl: '🚨 <strong>Не отмечена обязательная декларация:</strong> Отметьте галочкой юридическую декларацию внизу анкеты.',
      errTz: '🚨 <strong>Неверный 9-значный Теудат Зеут (`{tz}`):</strong> Ошибка контрольной цифры — проверьте опечатку!',
      errPassShort: '🚨 <strong>Срок действия загранпаспорта слишком мал ({m} мес.):</strong> Для {code} требуется минимум {req} мес.',
      warnPassBuf: '⚠️ <strong>Запас срока паспорта ({m} мес.):</strong> По закону {req} мес., но рекомендуется 24 мес.',
      okPass: '✅ Срок действия паспорта ({m} мес. в запасе) соответствует требованиям.',
      errPolExp: '🚨 <strong>Истёк 180-дневный срок справки о несудимости/семейном положении ({d} дн.):</strong> Должна быть не старше 180 дней.',
      okPol: '✅ Срок 180 дней для справок в норме (осталось {left} дн.).',
      errNameTrap: '🚨 <strong>Ловушка смены фамилии/имени 2026 (`{p}`):</strong> Все девичьи и прежние фамилии ДОЛЖНЫ быть указаны в справке о несудимости И подтверждены апостилированным свидетельством о перемене имени/браке или аффидевитом адвоката.',
      errCrossScan: '🚨 <strong>Расхождение имён между отсканированными документами:</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}")! Приложите документ о смене имени с апостилем.',
      errScanVsForm: '🚨 <strong>Разное написание имени в скане и анкете:</strong> В `{doc}` указано "{sn}", а в анкете "{fn}".',
      errDobFlip: '🚨 <strong>Несовпадение даты рождения (`ДД/ММ` и `ММ/ДД`):</strong> В `{doc}` указано `{sd}`, а в анкете `{fd}`.',
      okScansChecked: '✅ Успешно сверено с отсканированными документами ({n}).',
      btnFixLegal: '🎀 Нужен нотариальный перевод с красной лентой или аффидевит об именах? Записаться в Юридический Отдел →',
      pwBtnUnlock: '🔓 Разблокировать Чистый Официальный PDF на Иврите без Водяных Знаков ($89 на 90д / $149 Навсегда) →',
      pwPrompt: '📄 Разблокируйте чистые официальные бланки МВД PIBA и юридические письма на иврите без водяных знаков ($89 на 90 дней или $149 навсегда):'
    };

    var ruFieldLabels = {
      pf_surname_he: ['Фамилия', 'Можно ввести по-русски и нажать «Перевести → Иврит».'],
      pf_surname_en: ['Фамилия — Латиницей точно как в загранпаспорте', 'Должна буква в букву совпадать с машиночитаемой строкой паспорта.'],
      pf_given_he: ['Имя / Имена', 'Укажите второе имя или еврейское имя после гиюра, если оно есть в документах.'],
      pf_given_en: ['Имя / Имена — Латиницей точно как в загранпаспорте', 'Не пропускайте отчество/второе имя, если оно вписано в латинскую строку или свидетельство о рождении!'],
      pf_prior_names: ['Девичья фамилия / Все прежние имена и фамилии (или «ללא»)', 'ВАЖНО (Ловушка 2026): Любая смена фамилии требует апостилированного свидетельства О ПЕРЕМЕНЕ ИМЕНИ и обязана быть вписана в справку о несудимости!'],
      pf_dob: ['Дата рождения', 'Печатается в израильском формате ДД/ММ/ГГГГ.'],
      pf_hebrew_dob: ['Еврейская дата рождения (для анкеты МР/14)', 'Например: כ״ה באייר תשנ״ו (кнопка ИИ переведёт автоматически).'],
      pf_gender: ['Пол', ''],
      pf_marital: ['Семейное положение', ''],
      pf_birth_country: ['Страна и город рождения', 'Должны совпадать со свидетельством о рождении.'],
      pf_citizenship: ['Все текущие гражданства', 'При двойном гражданстве требуется справка о несудимости из каждой страны гражданства.'],
      pf_religion_nat: ['Вероисповедание и Национальность', 'После гиюра / по Закону о возвращении: יהודי / יהודייה.'],
      pf_father_he: ['Полное имя отца (как в свидетельстве о рождении)', 'Сверяется напрямую со свидетельством о рождении.'],
      pf_father_dob: ['Дата рождения отца (для анкеты Аш/3)', ''],
      pf_mother_he: ['Полное имя матери (как в свидетельстве о рождении)', ''],
      pf_mother_maiden: ['Девичья фамилия матери (Обязательно в Аш/1 и Аш/3)', ''],
      pf_mother_dob: ['Дата рождения матери (для анкеты Аш/3)', ''],
      pf_foreign_grandfather: ['Имя дедушки по отцу (Обязательное поле в Аш/6 и МР/14!)', 'Частое «неожиданное» поле на стр. 2 Аш/6 и в анкете МР/14.'],
      pf_pass_num: ['Номер загранпаспорта / проездного документа (или Теудат Зеут, если есть)', 'Введите номер загранпаспорта (или Лессе-Пассе). Если у вас уже есть израильский Теудат Зеут (например, А/5), достаточно указать его.'],
      pf_pass_issue_date: ['Дата выдачи загранпаспорта', ''],
      pf_pass_exp_date: ['Срок действия загранпаспорта до', 'Минимум 24 мес. для СТУПРО (Аш/6) или 12 мес. для репатриации (Аш/456).'],
      pf_police_issue_date: ['Дата выдачи справки о несудимости и семейном положении (<180 дней!)', 'Строгий срок годности 6 месяцев (180 дней).'],
      pf_countries_over_1yr: ['Все страны проживания >1 года с 14 лет', 'Из каждой указанной страны нужна апостилированная справка о несудимости!'],
      pf_entry_date_port: ['Дата последнего въезда в Израиль, КПП и текущая виза', 'Например: 01/09/2026 • נתב״ג • ב/2'],
      pf_abroad_addr: ['Постоянный адрес за границей (Латиницей: улица, город, страна)', ''],
      pf_il_addr_he: ['Полный адрес в Израиле (на иврите: город, улица, дом, кв., индекс)', 'Должен совпадать с договором аренды и счётом Арноны.'],
      pf_phone_il: ['Мобильный телефон в Израиле', ''],
      pf_email: ['E-mail (Используется МВД для официальных уведомлений и отсчёта сроков!)', 'Отправка письма на этот адрес официально запускает 45/21-дневный таймер!'],
      pf_ash3_action: ['Запрашиваемый срок продления (мес.) и категория визы', ''],
      pf_inst_details: ['Учебное заведение / Ульпан / Ешива, № Амуты и телефон раввина', ''],
      pf_sp_name_he: ['Полное имя израильского супруга / партнёра / приглашающего', ''],
      pf_sp_tz: ['9-значный номер Теудат Зеут супруга/приглашающего (Автопроверка)', ''],
      pf_sp_parents_grand: ['Дата рожд., имя отца, матери и дедушки израильского супруга (Аш/6 стр. 2)', ''],
      pf_marriage_details: ['Дата и место брака (вкл. Юту/за рубежом) и профессия супруга', ''],
      pf_ash6_refs: ['2 израильских поручителя (Аш/6 стр. 3): Имя, ТЗ, кем приходится, адрес и телефон (+ копии ТЗ!)', ''],
      pf_ll_affidavit: ['Декларация арендодателя (Аш/6 стр. 6): Имя и ТЗ владельца, кв.м (מ״ר), этажи, комнаты и оплата счетов', ''],
      pf_456_settlement: ['Стр. 2 Аш/456 + МР/14: Прошлые визиты, закрытие работы за рубежом, банк в Израиле, жильё, община и годы учёбы', ''],
      pf_456_shvut: ['Статья Закона о возвращении (Стр. 3 Аш/456)', ''],
      pf_ash1_consulate: ['Цель въезда и консульство Израиля за рубежом для уведомления', ''],
      pf_cv_details: ['Анкета безопасности (стр. 1–11): ВУЗы/стипендии, работы, близкие родственники (+ супруги) и контакты', ''],
      pf_children_table: ['Сопровождающие дети до 18 лет (Имя на иврите и латиницей, страна, дата рожд. — или «ללא»)', ''],
      pf_rel_story: ['Обязательное объяснительное письмо — Михтав Хесбер (Пишите по-русски — автоперевод на иврит!)', ''],
      pf_decl_clean_record: ['Подтверждаю все законные декларации (отсутствие судимостей/угроз безопасности и здоровью, центр жизни в Израиле и обязанность сообщать о смене адреса)', ''],
      pf_police_covers_prior: ['Моя апостилированная справка о несудимости (<180д) включает ВСЕ девичьи и прежние фамилии/имена', ''],
      pf_has_name_change_cert: ['При любом расхождении фамилий/имён между документами приложено апостилированное свидетельство о перемене имени/браке или аффидевит адвоката', '']
    };
    Object.keys(ruFieldLabels).forEach(function(fid) {
      var meta = window.GAT_FORMS_META.F[fid];
      if (!meta) return;
      meta.l.ru = ruFieldLabels[fid][0];
      if (ruFieldLabels[fid][1] && meta.h) meta.h.ru = ruFieldLabels[fid][1];
    });
    var ruForms = {
      ash3: 'טופס אש/3 (Аш/3 — 2 стр.): Продление визы / Смена категории визы (B/2, Гиюр A/2, B/1, A/5)',
      ash6: 'טופס אש/6 (Аш/6 — 6 стр., Ноhаль 5.2.0008): Ступенчатая процедура СТУПРО (Брак) + Декларация арендодателя',
      nespach_alef: 'נספח א׳ (Ноhаль 5.2.0009 — 1 стр.): Декларация 13 пунктов для фактических супругов (Ядуим бе-Цибур)',
      ash456: 'טופס אש/456 + מר/14 (Ноhаль 5.2.0001 — 4 стр.): Репатриация в Израиле («Оле») и Первый Теудат Зеут',
      ash1: 'טופס אש/1 (Аш/1 — 2 стр.): Заявление на въездную визу и Обязательство приглашающего',
      sec_cv: 'טופס קורות חיים (Анкета 11 стр. для Натив/Безопасности — только по требованию чиновника)'
    };
    Object.keys(ruForms).forEach(function(fk) {
      if (window.GAT_FORMS_META.FORMS[fk]) window.GAT_FORMS_META.FORMS[fk].t.ru = ruForms[fk];
    });
    if (F.pf_gender && F.pf_gender.opts) {
      F.pf_gender.opts[0].ru = 'Женский (נקבה)';
      F.pf_gender.opts[1].ru = 'Мужской (זכר)';
    }
    if (F.pf_marital && F.pf_marital.opts) {
      var ruMar = ['Холост / Не замужем (רווק/ה)', 'Женат / Замужем (נשוי/אה)', 'Разведён(а) (גרוש/ה)', 'Вдовец / Вдова (אלמן/ה)', 'Фактический брак (ידוע/ה בציבור)'];
      F.pf_marital.opts.forEach(function(o, i) { if (ruMar[i]) o.ru = ruMar[i]; });
    }
    if (F.pf_456_shvut && F.pf_456_shvut.opts) {
      F.pf_456_shvut.opts[0].ru = 'Статья 4Б Закона о возвращении — Еврей по рождению или признанному гиюру';
      F.pf_456_shvut.opts[1].ru = 'Статья 4А Закона о возвращении — Супруг(а), ребёнок или внук(чка) еврея';
    }
    var ruBr = [
      'Цфат / Тверия (Верхняя Галилея)',
      'Иерусалим (Шломцион / Хар Хоцвим)',
      'Тель-Авив / Рамат-Ган / Центр',
      'Хайфа / Кармиэль / Нагария / Афула',
      'Нетания / Петах-Тиква / Герцлия / Реховот',
      'Ашдод / Беэр-Шева / Юг'
    ];
    if (window.PIBA_BRANCHES) {
      window.PIBA_BRANCHES.forEach(function(b, i) { if (ruBr[i]) b.l.ru = ruBr[i]; });
    }
    var ruPdfs = [
      'Продление / Смена визы (2 стр.)',
      'Въездная виза и Приглашающий (2 стр.)',
      'Брак СТУПРО + Декларация аренды (6 стр.)',
      'Декларация 13 пунктов для партнёров (1 стр.)',
      'Репатриация в Израиле / Оле (3 стр.)',
      'Регистрация первого Теудат Зеут (1 стр.)',
      'Уведомление о втором гражданстве (1 стр.)',
      'Анкета безопасности — по требованию (11 стр.)'
    ];
    if (window.PIBA_OFFICIAL_PDFS) {
      window.PIBA_OFFICIAL_PDFS.forEach(function(p, i) { if (ruPdfs[i]) p.t.ru = ruPdfs[i]; });
    }
    var ruLet = {
      ext45: '⏳ Запрос на продление срока 25/45 дней против закрытия дела (Ноhаль §ה.7)',
      utah_refusal: '⚖️ Защита от устного отказа: Требование письменного решения и передачи директору (Брак в Юте AAA 7368/22)',
      charigim: '🕍 Петиция в Комиссию по исключениям (Ваадат Харигим — государственный гиюр из статуса туриста)',
      rehab: '📋 Юридический меморандум о реабилитации (7 критериев — Ноhаль 5.2.0001 §ה.12.ב)',
      emerg_antisem: '🚨 Экстренное гуманитарное прошение из-за антисемитизма и перевод дела בית דין'
    };
    Object.keys(ruLet).forEach(function(lk) {
      if (LETTERS[lk] && LETTERS[lk].t) LETTERS[lk].t.ru = ruLet[lk];
    });
  }


  var EXTRA_FV_I18N = {
    en: {
      afTitle: '📸 1-Tap Document Auto-Fill (Smart Scan)',
      afSub: 'Upload Passport, Birth Cert, Marriage Cert, or Police Check to pre-fill your form in Clerk Hebrew:',
      afBtn: '📸 Scan Document → Auto-Fill',
      calOn: '🎯 Mode: FULL CALIBRATION PROOF (All Checkboxes ON)',
      calOff: '👤 Mode: REAL USER INPUT (Hebrew-First)',
      calBtn: '🧪 Calibration PDF'
    },
    he: {
      afTitle: '📸 מילוי אוטומטי מהיר מתעודה או דרכון (סריקה אוטומטית)',
      afSub: 'העלו דרכון, תעודת לידה, נישואין, תעודת יושר או אשרת כניסה למילוי אוטומטי של הטופס בעברית תקנית:',
      afBtn: '📸 צילום / העלאת תעודה ← מילוי הטופס',
      calOn: '🎯 מצב: בדיקת כיול מלאה (כל המשבצות מסומנות)',
      calOff: '👤 מצב: נתוני מבקש אמיתיים (עברית תקנית)',
      calBtn: '🧪 הפקת PDF בדיקת כיול מלאה'
    },
    fr: {
      afTitle: '📸 Remplissage Auto 1-Clic depuis Vos Actes (Auto-Scan)',
      afSub: 'Téléversez Passeport, Acte de Naissance, Mariage ou Casier pour pré-remplir le formulaire en hébreu :',
      afBtn: '📸 Scanner un Acte → Pré-remplir',
      calOn: '🎯 Mode : CALIBRAGE COMPLET (Toutes Cases)',
      calOff: '👤 Mode : DONNÉES RÉELLES (Hébreu)',
      calBtn: '🧪 Générer PDF Test Calibrage'
    },
    es: {
      afTitle: '📸 Autocompletado en 1 Clic desde Sus Documentos (Auto-Scan)',
      afSub: 'Suba Pasaporte, Partida de Nacimiento, Matrimonio o Antecedentes para autocompletar en hebreo:',
      afBtn: '📸 Escanear Documento → Autocompletar',
      calOn: '🎯 Modo: CALIBRACIÓN COMPLETA (Todas las Casillas)',
      calOff: '👤 Modo: DATOS REALES (Hebreo)',
      calBtn: '🧪 Generar PDF de Calibración'
    },
    de: {
      afTitle: '📸 1-Klick Formular-Ausfüllung per Dokumenten-Scan (KI)',
      afSub: 'Reisepass, Geburts-, Heiratsurkunde oder Führungszeugnis hochladen und automatisch auf Hebräisch ausfüllen:',
      afBtn: '📸 Dokument Scannen → Auto-Ausfüllen',
      calOn: '🎯 Modus: VOLL-KALIBRIERUNG (Alle Kästchen)',
      calOff: '👤 Modus: ECHTE NUTZERDATEN',
      calBtn: '🧪 Kalibrierungs-PDF Erstellen'
    },
    ru: {
      afTitle: '📸 Автозаполнение Анкеты по Фото Документа в 1 Клик (ИИ)',
      afSub: 'Загрузите загранпаспорт, свидетельство о рождении, браке или справку о несудимости для автозаполнения на иврите:',
      afBtn: '📸 Сфотографировать Документ → Заполнить Анкету',
      calOn: '🎯 Режим: ПОЛНАЯ КАЛИБРОВКА (Все Поля и Галочки)',
      calOff: '👤 Режим: ДАННЫЕ ЗАЯВИТЕЛЯ',
      calBtn: '🧪 Тестовый PDF (Все Поля)'
    }
  };
  Object.keys(EXTRA_FV_I18N).forEach(function(k) {
    if (window.GAT_FORMS_META && window.GAT_FORMS_META.UI && window.GAT_FORMS_META.UI[k]) {
      Object.assign(window.GAT_FORMS_META.UI[k], EXTRA_FV_I18N[k]);
    }
  });

  window.mountUnifiedPibaFormsEngine();
})();
