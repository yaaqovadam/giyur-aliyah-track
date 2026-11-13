/* ==========================================================================
 * Giyur Aliyah Track — 100% 5-Language (EN/FR/ES/DE/HE) Hebrew-First PIBA
 * Forms, Worksheet Scanner & Master Dossier Cross-Checker (forms_vault.js)
 * ========================================================================== */
(function() {
  'use strict';

  var DRAFT_KEY = 'gat_form_draft_v1';
  var SCANNED_KEY = 'gat_scanned_docs_v1';

  window.PIBA_OFFICIAL_PDFS = [
    { code: 'אש/3', file: '/forms/gov-pdfs/ash3_extension_change_visa.pdf',
      t: { en: 'Extend / Switch Visa (2p)', fr: 'Prolonger / Changer Visa (2p)', es: 'Prorrogar / Cambiar Visa (2p)', de: 'Visum Verlängern / Wechseln (2S)', he: 'הארכת / החלפת אשרה (2 עמ׳)' } },
    { code: 'אש/1', file: '/forms/gov-pdfs/ash1_entry_visa.pdf',
      t: { en: 'Entry Visa & Inviter (2p)', fr: 'Visa d\'Entrée & Invitant (2p)', es: 'Visa de Entrada e Invitante (2p)', de: 'Einreisevisum & Einlader (2S)', he: 'אשרת כניסה ומזמין (2 עמ׳)' } },
    { code: 'אש/6', file: '/forms/gov-pdfs/ash6_spousal_status.pdf',
      t: { en: 'Married Spousal + Lease Affidavit (6p)', fr: 'Conjoint Marié + Bail (6p)', es: 'Cónyuge Casado + Contrato (6p)', de: 'Ehepartner + Miet-Affidavit (6S)', he: 'בני זוג נשואים + תצהיר שכ"ד (6 עמ׳)' } },
    { code: 'נספח א׳', file: '/forms/gov-pdfs/nespach_alef_affidavit.pdf',
      t: { en: '13-Clause Partner Affidavit (1p)', fr: 'Affidavit 13 Clauses Concubins (1p)', es: 'Declaración 13 Cláusulas Pareja (1p)', de: '13-Punkte Partner-Erklärung (1S)', he: 'תצהיר 13 סעיפים ידועים בציבור (1 עמ׳)' } },
    { code: 'אש/456', file: '/forms/gov-pdfs/ash456_in_israel_oleh.pdf',
      t: { en: 'In-Israel Aliyah / Oleh (3p)', fr: 'Aliyah en Israël / Oleh (3p)', es: 'Aliyá en Israel / Olé (3p)', de: 'Alija in Israel / Oleh (3S)', he: 'בקשת מעמד עולה בארץ (3 עמ׳)' } },
    { code: 'מר/14 א׳', file: '/forms/gov-pdfs/mr14a_registry.pdf',
      t: { en: 'First Teudat Zehut Registry (1p)', fr: 'Inscription 1ère Teudat Zehut (1p)', es: 'Registro 1ª Teudat Zehut (1p)', de: 'Erste Teudat Zehut Register (1S)', he: 'שאלון רישום ת"ז ראשונה (1 עמ׳)' } },
    { code: 'מר/14 ב׳', file: '/forms/gov-pdfs/mr14b_registry_notice.pdf',
      t: { en: 'Dual Citizenship Notice (1p)', fr: 'Avis Double Nationalité (1p)', es: 'Aviso Doble Ciudadanía (1p)', de: 'Doppelstaatsbürgerschaft (1S)', he: 'הודעה לעולה אזרח חוץ (1 עמ׳)' } },
    { code: 'קורות חיים', file: '/forms/gov-pdfs/security_cv_form.pdf',
      t: { en: 'Security CV — If Ordered (11p)', fr: 'CV Sécurité — Si Demandé (11p)', es: 'CV Seguridad — Si lo Piden (11p)', de: 'Sicherheits-CV — Bei Bedarf (11S)', he: 'קורות חיים לאבחון — לפי דרישה (11 עמ׳)' } }
  ];

  window.PIBA_BRANCHES = [
    { v: 'צפת / טבריה', l: { en: 'Safed / Tiberias (Upper Galilee)', fr: 'Safed / Tibériade (Haute Galilée)', es: 'Safed / Tiberíades (Galilea)', de: 'Safed / Tiberias (Galiläa)', he: 'צפת / טבריה (גליל עליון)' } },
    { v: 'ירושלים', l: { en: 'Jerusalem (Shlomtzion / Har Hotzvim)', fr: 'Jérusalem (Shlomtzion / Har Hotzvim)', es: 'Jerusalén (Shlomtzion / Har Hotzvim)', de: 'Jerusalem (Schlomzion / Har Chozwim)', he: 'ירושלים (שלומציון / הר חוצבים)' } },
    { v: 'תל אביב והמרכז', l: { en: 'Tel Aviv / Ramat Gan / Center', fr: 'Tel Aviv / Ramat Gan / Centre', es: 'Tel Aviv / Ramat Gan / Centro', de: 'Tel Aviv / Ramat Gan / Zentrum', he: 'תל אביב / רמת גן / המרכז' } },
    { v: 'חיפה והצפון', l: { en: 'Haifa / Karmiel / Nahariya / Afula', fr: 'Haïfa / Karmiel / Nahariya / Afoula', es: 'Haifa / Karmiel / Nahariya / Afula', de: 'Haifa / Karmiel / Nahariya / Afula', he: 'חיפה / כרמיאל / נהריה / עפולה' } },
    { v: 'נתניה / פתח תקווה / רחובות', l: { en: 'Netanya / Petah Tikva / Herzliya / Rehovot', fr: 'Netanya / Petah Tikva / Herzliya / Rehovot', es: 'Netanya / Petaj Tikva / Herzliya / Rejovot', de: 'Netanya / Petach Tikwa / Herzliya / Rechowot', he: 'נתניה / פתח תקווה / הרצליה / רחובות' } },
    { v: 'אשדוד / באר שבע / דרום', l: { en: 'Ashdod / Be\'er Sheva / South', fr: 'Ashdod / Beer-Sheva / Sud', es: 'Ashdod / Beer Sheva / Sur', de: 'Aschdod / Beer Scheva / Süden', he: 'אשדוד / באר שבע / דרום' } }
  ];

  var UI = {
    en: {
      dosTitle: '✈️ Flight-Readiness & Cross-Document Master Dossier (Synced to Server)',
      dosSub: 'Every certificate you scan and form you complete is cross-checked automatically so zero name, date, or clerk-bias traps slip through:',
      noScans: '📸 0 Scans Yet (Scan Certs in Card #2)',
      hebReady: '100% Hebrew Ready',
      tapConvert: 'Tap Convert → Hebrew',
      rawDrawer: '📂 Reference Only: View Raw Blank Hebrew Gov.il PDFs (Optional)',
      timerTitle: '⏱️ Clerk Deficiency Clock & "Law vs. Clerk Bias" Shield',
      timerLead: '2026 procedures grant 45 days on paper (21d for appeals) and Utah Zoom marriages (AAA 7368/22) are binding law—yet clerks still enforce old 30-day habits and personal bias. Target <25 days, submit in HEBREW so no clerk stalls on foreign text, and demand a Written Refusal if stonewalled!',
      timerDateLbl: 'Date Clerk Issued Demand / Refusal Slip:',
      timerCalBtn: '🔔 Add Day-24 & Day-38 Alarms (.ics)',
      timerEmpty: 'Select the date on your clerk\'s slip above to start your live 25-Day Clerk-Safe & 45-Day Law countdown.',
      t30Left: '🎯 30d Clerk Habit: {d}d left',
      t30Over: '🚨 {d}d past 30d — FILE EXTENSION NOW!',
      t45Left: '⚖️ 45d 2026 Law: {d}d left',
      t45Exp: '🛑 45d Law EXPIRED',
      t21Left: '🛡️ 21d Appeal: {d}d left',
      t21Over: 'Past 21d appeal',
      ics14: 'Misrad HaPanim Check-In (Day 14): Verify Apostilles & Red-Ribbon Translations',
      ics24: 'URGENT Misrad HaPanim Target (Day 24): Submit Packet or Extension BEFORE Clerk 30d Habit!',
      ics38: 'CRITICAL 45-Day Statutory Ceiling (Day 38): Must File Written Extension Today!',
      modeForms: '📋 1. Guided PIBA Forms (Your Language → Clerk Hebrew)',
      modeLetters: '🛡️ 2. Statutory Hebrew Letters & Clerk Escalation',
      selForm: '1. Select Official Misrad HaPanim Form:',
      selLetter: '1. Select Statutory Hebrew Letter / Escalation:',
      selBranch: '2. Target Misrad HaPanim Branch:',
      btnPrintBlank: '🖨️ Print Blank Worksheet (English)',
      btnScanWs: '📸 Scan Handwritten Worksheet (AI → Hebrew)',
      btnAiHeb: '🌐 Convert My Answers → Clerk Hebrew (AI)',
      btnConverting: '⏳ Converting to Clerk Hebrew...',
      btnSave: '💾 Save',
      btnAudit: '🔍 Cross-Check All Docs & Verify',
      btnPrintFinal: '🖨️ Stamp & Print Official Hebrew Packet (PDF)',
      autoSaveNote: '☁️ Auto-saves on field blur/change • Foreign answers auto-convert to Clerk Hebrew before printing.',
      wsIntro: 'Fill out clearly in your own language, then snap a photo using "Scan Handwritten Worksheet" in GiyurAliyahTrack—our AI converts your answers directly into official Clerk Hebrew.',
      wsYes: '☐ Yes / Confirmed',
      alreadyHeb: '✅ All Clerk-Hebrew fields are already in Hebrew!',
      scanningWs: '🔍 Scanning your handwritten worksheet & converting answers into Clerk Hebrew...',
      audErrHead: '🛑 {n} Clerk Rejection Risk(s) Caught Before Your Appointment:',
      audOkHead: '✅ 100% Clerk-Proof Packet — All Cross-Checks Passed!',
      errMissing: '🚨 <strong>Missing Mandatory {code} Fields ({n}):</strong> {list}',
      okAllFilled: '✅ All mandatory {code} fields are completed.',
      errNonHeb: '🌐 <strong>Clerk-Bias Trap — Non-Hebrew Text in {n} Field(s):</strong> Clerks routinely stall forms filled in English/foreign text. Tap <strong>"Convert My Answers → Clerk Hebrew"</strong> (or click Print to auto-convert)!',
      okHebFirst: '✅ 100% Hebrew-First Compliance: Every narrative field is in Clerk Hebrew and passport boxes match Latin format.',
      errDecl: '🚨 <strong>Unchecked Statutory Declaration:</strong> Confirm the legal declaration checkbox before printing.',
      errTz: '🚨 <strong>Invalid 9-Digit Israeli Teudat Zehut (`{tz}`):</strong> Check-digit math failed—fix this 1-digit typo!',
      errPassShort: '🚨 <strong>Passport Validity Too Short ({m}m left):</strong> {code} requires at least {req} months.',
      warnPassBuf: '⚠️ <strong>Clerk Passport Buffer ({m}m left):</strong> {code} requires {req}m by law, though spousal clerks expect 24m.',
      okPass: '✅ Passport validity ({m} months left) clears all thresholds.',
      errPolExp: '🚨 <strong>Expired 180-Day Police/Status Certificate ({d}d old):</strong> Must be issued within the last 180 days.',
      okPol: '✅ 180-day certificate clock valid ({left} days remaining).',
      errNameTrap: '🚨 <strong>2026 Name-Change Trap (`{p}`):</strong> Prior/maiden names MUST appear on your Police Check AND be bridged by an Apostilled Name-Change/Marriage Cert or Lawyer Affidavit.',
      errCrossScan: '🚨 <strong>Name Mismatch Between Your Own Scanned Docs:</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}")! Add prior name + attach certified Name-Change doc.',
      errScanVsForm: '🚨 <strong>Scanned Doc vs. Form Spelling Mismatch:</strong> `{doc}` reads "{sn}" vs. form "{fn}".',
      errDobFlip: '🚨 <strong>Birth Date Discrepancy (`DD/MM` vs `MM/DD`):</strong> `{doc}` shows `{sd}` vs. form `{fd}`.',
      okScansChecked: '✅ Cross-verified against {n} scanned certificate(s).',
      btnFixLegal: '🎀 Need Red-Ribbon Notary Translation or Name-Change Affidavit? Book Legal Desk →',
      pwBtnUnlock: '🔓 Unlock Clean Watermark-Free Official Hebrew PDF ($89 Sprint / $149 Lifetime) →',
      pwPrompt: '📄 Unlock clean, watermark-free Official Hebrew PIBA PDFs & Statutory Letters ($89 90-Day Sprint or $149 Lifetime Pass):'
    },
    fr: {
      dosTitle: '✈️ Dossier Maître & Vérification Croisée Anti-Rejet (Synchronisé Serveur)',
      dosSub: 'Chaque acte scanné et formulaire rempli en français est croisé automatiquement et converti en hébreu administratif :',
      noScans: '📸 0 Acte Scanné (Scannez vos actes dans la Carte #2)',
      hebReady: '100% Prêt en Hébreu',
      tapConvert: 'Cliquez Traduire → Hébreu',
      rawDrawer: '📂 Référence : Voir les PDF Gouvernementaux Vierges en Hébreu (Optionnel)',
      timerTitle: '⏱️ Chronomètre 25/30 vs 45 Jours & Bouclier Réalité Guichet',
      timerLead: 'Les procédures 2026 accordent 45 jours sur papier (21j d\'appel), mais les agents appliquent souvent 30 jours et bloquent les formulaires remplis en anglais/français. Déposez avant J+25 en HÉBREU et exigez toujours un refus écrit motivé !',
      timerDateLbl: 'Date de la demande du guichet (Drishat Mismachim) :',
      timerCalBtn: '🔔 Rappels Calendrier J+24 & J+38 (.ics)',
      timerEmpty: 'Sélectionnez la date de votre feuille ci-dessus pour lancer le compte à rebours J+25 / J+45.',
      t30Left: '🎯 Habitude Guichet 30j : {d}j restants',
      t30Over: '🚨 +{d}j au-delà de 30j — DÉPOSEZ PROLONGATION !',
      t45Left: '⚖️ Loi 2026 (45j) : {d}j restants',
      t45Exp: '🛑 Délai 45j EXPIRÉ',
      t21Left: '🛡️ Appel 21j : {d}j restants',
      t21Over: 'Délai 21j dépassé',
      ics14: 'Suivi Misrad HaPanim (Jour 14) : Vérifier Apostilles & Traductions Ruban Rouge',
      ics24: 'URGENT Misrad HaPanim (Jour 24) : Déposer Dossier ou Prolongation AVANT les 30 jours !',
      ics38: 'CRITIQUE Plafond Légal 45 Jours (Jour 38) : Déposer Demande Écrite Aujourd\'hui !',
      modeForms: '📋 1. Formulaires PIBA Guidés (Français → Hébreu Guichet)',
      modeLetters: '🛡️ 2. Lettres Légales en Hébreu & Escalade Directeur',
      selForm: '1. Choisissez le Formulaire Officiel Misrad HaPanim :',
      selLetter: '1. Choisissez la Lettre Statutaire / Escalade :',
      selBranch: '2. Bureau Misrad HaPanim Cible :',
      btnPrintBlank: '🖨️ Imprimer Questionnaire Vierge (en Français)',
      btnScanWs: '📸 Scanner Feuille Manuscrite (IA → Hébreu)',
      btnAiHeb: '🌐 Traduire Mes Réponses → Hébreu Administratif (IA)',
      btnConverting: '⏳ Conversion en hébreu administratif...',
      btnSave: '💾 Sauvegarder',
      btnAudit: '🔍 Vérifier & Croiser Tous Mes Documents',
      btnPrintFinal: '🖨️ Générer le Dossier Officiel en Hébreu (PDF)',
      autoSaveNote: '☁️ Sauvegarde auto à chaque champ quitté • Conversion auto en hébreu avant impression.',
      wsIntro: 'Remplissez clairement en français, puis prenez une photo via « Scanner Feuille Manuscrite » dans GiyurAliyahTrack — l\'IA convertira tout en hébreu officiel.',
      wsYes: '☐ Oui / Confirmé',
      alreadyHeb: '✅ Tous les champs destinés au guichet sont déjà en hébreu !',
      scanningWs: '🔍 Lecture de votre feuille manuscrite et conversion en hébreu administratif...',
      audErrHead: '🛑 {n} Risque(s) de Rejet Détecté(s) Avant Votre Rendez-vous :',
      audOkHead: '✅ Dossier 100% Blindé — Toutes les Vérifications Croisées Sont Validées !',
      errMissing: '🚨 <strong>Champs Obligatoires {code} Manquants ({n}) :</strong> {list}',
      okAllFilled: '✅ Tous les champs obligatoires de {code} sont remplis.',
      errNonHeb: '🌐 <strong>Piège Guichet — Texte Non-Hébreu dans {n} Champ(s) :</strong> Cliquez sur <strong>« Traduire Mes Réponses → Hébreu »</strong> (ou sur Générer PDF pour convertir automatiquement) !',
      okHebFirst: '✅ Conformité 100% Hébreu : Tous les champs descriptifs sont en hébreu et les champs passeport en lettres latines.',
      errDecl: '🚨 <strong>Déclaration Légale Non Cochée :</strong> Veuillez cocher la déclaration légale en bas du formulaire.',
      errTz: '🚨 <strong>N° Teudat Zehut Israélien Invalide (`{tz}`) :</strong> Clé de contrôle à 9 chiffres incorrecte — corrigez cette faute de frappe !',
      errPassShort: '🚨 <strong>Validité Passeport Trop Courte ({m} mois) :</strong> {code} exige au moins {req} mois.',
      warnPassBuf: '⚠️ <strong>Marge Passeport ({m} mois) :</strong> {code} exige {req}m par la loi, mais 24m est recommandé.',
      okPass: '✅ Validité du passeport ({m} mois restants) conforme.',
      errPolExp: '🚨 <strong>Casier / Célibat Expiré ({d} jours) :</strong> Doit dater de moins de 180 jours.',
      okPol: '✅ Délai de 180 jours valide ({left} jours restants).',
      errNameTrap: '🚨 <strong>Piège Changement de Nom 2026 (`{p}`) :</strong> Vos noms antérieurs/de jeune fille DOIVENT figurer sur le casier judiciaire ET être justifiés par un acte apostillé ou Affidavit d\'avocat.',
      errCrossScan: '🚨 <strong>Divergence de Nom Entre Vos Actes Scannés :</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}") ! Ajoutez un acte de changement de nom apostillé.',
      errScanVsForm: '🚨 <strong>Écart d\'Orthographe Acte Scanné vs Formulaire :</strong> `{doc}` indique "{sn}" alors que le formulaire indique "{fn}".',
      errDobFlip: '🚨 <strong>Écart Date de Naissance (`JJ/MM` vs `MM/JJ`) :</strong> `{doc}` indique `{sd}` vs formulaire `{fd}`.',
      okScansChecked: '✅ Croisé avec succès contre {n} acte(s) scanné(s).',
      btnFixLegal: '🎀 Besoin d\'une Traduction Notariée Ruban Rouge ou Affidavit de Nom ? Réserver Notre Bureau Juridique →',
      pwBtnUnlock: '🔓 Débloquer le PDF Officiel en Hébreu Sans Filigrane (89$ Pass 90j / 149$ à Vie) →',
      pwPrompt: '📄 Débloquez vos formulaires officiels PIBA en hébreu sans filigrane (89$ Pass 90 Jours ou 149$ à Vie) :'
    },
    es: {
      dosTitle: '✈️ Expediente Maestro y Cruce Forense Sin Errores (Sincronizado)',
      dosSub: 'Cada acta escaneada y formulario completado en español se cruza automáticamente y se convierte al hebreo oficial:',
      noScans: '📸 0 Actas Escaneadas (Escanee sus actas en la Tarjeta #2)',
      hebReady: '100% Listo en Hebreo',
      tapConvert: 'Pulse Convertir → Hebreo',
      rawDrawer: '📂 Referencia: Ver PDFs Originales en Blanco de Gov.il en Hebreo (Opcional)',
      timerTitle: '⏱️ Reloj 25/30 vs 45 Días y Escudo contra Sesgo de Ventanilla',
      timerLead: 'Las normas 2026 dan 45 días en papel (21d apelación), pero muchos funcionarios cierran expedientes a los 30 días o frenan formularios sin hebreo. ¡Entregue antes del día 25 en HEBREO y exija decisión escrita!',
      timerDateLbl: 'Fecha del requerimiento del funcionario:',
      timerCalBtn: '🔔 Recordatorios Día 24 y 38 (.ics)',
      timerEmpty: 'Seleccione arriba la fecha de su hoja para activar el reloj en vivo de 25 y 45 días.',
      t30Left: '🎯 Hábito Ventanilla 30d: quedan {d}d',
      t30Over: '🚨 +{d}d sobre 30d — ¡PIDA PRÓRROGA YA!',
      t45Left: '⚖️ Ley 2026 (45d): quedan {d}d',
      t45Exp: '🛑 Plazo 45d VENCIDO',
      t21Left: '🛡️ Apelación 21d: quedan {d}d',
      t21Over: 'Pasó plazo 21d',
      ics14: 'Control Misrad HaPanim (Día 14): Verificar Apostillas y Traducciones Cinta Roja',
      ics24: 'URGENTE Misrad HaPanim (Día 24): ¡Presentar Carpeta o Prórroga ANTES del Día 30!',
      ics38: 'CRÍTICO Tope Legal 45 Días (Día 38): ¡Presentar Prórroga Escrita Hoy!',
      modeForms: '📋 1. Formularios PIBA Guiados (Español → Hebreo Oficial)',
      modeLetters: '🛡️ 2. Cartas Legales en Hebreo y Escalada al Director',
      selForm: '1. Seleccione el Formulario Oficial de Misrad HaPanim:',
      selLetter: '1. Seleccione Carta Legal / Escalada al Director:',
      selBranch: '2. Sucursal de Misrad HaPanim:',
      btnPrintBlank: '🖨️ Imprimir Hoja en Blanco (en Español)',
      btnScanWs: '📸 Escanear Hoja Manuscrita (IA → Hebreo)',
      btnAiHeb: '🌐 Convertir Mis Respuestas → Hebreo Oficial (IA)',
      btnConverting: '⏳ Convirtiendo al hebreo oficial...',
      btnSave: '💾 Guardar',
      btnAudit: '🔍 Revisar y Cruzar Todos Mis Documentos',
      btnPrintFinal: '🖨️ Generar Paquete Oficial en Hebreo (PDF)',
      autoSaveNote: '☁️ Guardado automático al salir de cada campo • Conversión automática al hebreo al imprimir.',
      wsIntro: 'Complete claramente en español y tome una foto con «Escanear Hoja Manuscrita» en GiyurAliyahTrack — nuestra IA pasará todo al hebreo oficial.',
      wsYes: '☐ Sí / Confirmado',
      alreadyHeb: '✅ ¡Todos los campos para el funcionario ya están en hebreo!',
      scanningWs: '🔍 Escaneando su hoja manuscrita y convirtiendo respuestas al hebreo oficial...',
      audErrHead: '🛑 {n} Riesgo(s) de Rechazo Detectado(s) Antes de su Cita:',
      audOkHead: '✅ ¡Carpeta 100% Blindada — Todos los Cruces Documentales Aprobados!',
      errMissing: '🚨 <strong>Campos Obligatorios de {code} Faltantes ({n}):</strong> {list}',
      okAllFilled: '✅ Todos los campos obligatorios de {code} están completos.',
      errNonHeb: '🌐 <strong>Trampa de Ventanilla — Texto sin Traducir en {n} Campo(s):</strong> Pulse <strong>«Convertir Mis Respuestas → Hebreo»</strong> (o Generar PDF para conversión automática).',
      okHebFirst: '✅ Cumplimiento 100% Hebreo: Todos los textos están en hebreo oficial y los datos de pasaporte en letras latinas.',
      errDecl: '🚨 <strong>Declaración Jurada sin Marcar:</strong> Marque la casilla de declaración legal antes de imprimir.',
      errTz: '🚨 <strong>N.º Teudat Zehut Israelí Inválido (`{tz}`):</strong> Falló el dígito verificador — ¡corrija el número!',
      errPassShort: '🚨 <strong>Vigencia de Pasaporte Insuficiente ({m}m):</strong> {code} exige mínimo {req} meses.',
      warnPassBuf: '⚠️ <strong>Margen de Pasaporte ({m}m):</strong> {code} exige {req}m por ley, pero se recomiendan 24m.',
      okPass: '✅ Vigencia del pasaporte ({m} meses restantes) verificada.',
      errPolExp: '🚨 <strong>Certificado Penal / Soltería Vencido ({d} días):</strong> Debe tener menos de 180 días.',
      okPol: '✅ Reloj de 180 días vigente (quedan {left} días).',
      errNameTrap: '🚨 <strong>Trampa Cambio de Nombre 2026 (`{p}`):</strong> Todo apellido de soltera o nombre previo DEBE figurar en Antecedentes Penales Y contar con Certificado de Cambio de Nombre/Matrimonio Apostillado o Declaración Notarial.',
      errCrossScan: '🚨 <strong>Diferencia de Nombre Entre sus Actas Escaneadas:</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}")! Adjunte certificado de cambio de nombre apostillado.',
      errScanVsForm: '🚨 <strong>Diferencia Ortográfica Acta Escaneada vs Formulario:</strong> `{doc}` dice "{sn}" vs formulario "{fn}".',
      errDobFlip: '🚨 <strong>Diferencia en Fecha de Nacimiento (`DD/MM` vs `MM/DD`):</strong> `{doc}` muestra `{sd}` vs formulario `{fd}`.',
      okScansChecked: '✅ Cruzado correctamente con {n} certificado(s) escaneado(s).',
      btnFixLegal: '🎀 ¿Necesita Traducción Notarial Cinta Roja o Declaración de Nombres? Reserve Escritorio Legal →',
      pwBtnUnlock: '🔓 Desbloquear PDF Oficial en Hebreo Sin Marca de Agua ($89 Pase 90d / $149 de por Vida) →',
      pwPrompt: '📄 Desbloquee los formularios oficiales PIBA en hebreo sin marca de agua ($89 Pase 90 Días o $149 de por Vida):'
    },
    de: {
      dosTitle: '✈️ Flugbereitschafts- & Dokumenten-Kreuzprüfung (Server-Synchronisiert)',
      dosSub: 'Jede gescannte Urkunde und jedes auf Deutsch ausgefüllte Formular wird automatisch abgeglichen und in Behörden-Hebräisch übertragen:',
      noScans: '📸 Noch 0 Urkunden Gescannt (Urkunden in Karte #2 scannen)',
      hebReady: '100% Hebräisch Bereit',
      tapConvert: 'Klicken: → Hebräisch',
      rawDrawer: '📂 Referenz: Originale Hebräische Gov.il Blanko-PDFs Anzeigen (Optional)',
      timerTitle: '⏱️ 25/30- vs. 45-Tage-Uhr & Schalter-Realitätsschutz',
      timerLead: 'Die Regeln 2026 geben 45 Tage auf dem Papier (21T Beschwerde), aber Beamte schließen oft nach 30 Tagen oder blockieren nicht-hebräische Formulare. Vor Tag 25 auf HEBRÄISCH einreichen und schriftlichen Bescheid verlangen!',
      timerDateLbl: 'Datum der Nachforderung am Schalter:',
      timerCalBtn: '🔔 Kalender-Alarme Tag 24 & 38 (.ics)',
      timerEmpty: 'Datum oben auswählen, um den Live-Countdown (25-Tage-Ziel / 45-Tage-Gesetz) zu starten.',
      t30Left: '🎯 30T Schalter-Praxis: noch {d}T',
      t30Over: '🚨 {d}T über 30T — FRISTVERLÄNGERUNG EINREICHEN!',
      t45Left: '⚖️ 45T Gesetz 2026: noch {d}T',
      t45Exp: '🛑 45T Frist ABGELAUFEN',
      t21Left: '🛡️ 21T Beschwerde: noch {d}T',
      t21Over: '21T Frist vorbei',
      ics14: 'Misrad HaPanim Check (Tag 14): Apostillen & Rotes-Band-Übersetzungen prüfen',
      ics24: 'DRINGEND Misrad HaPanim (Tag 24): Paket oder Verlängerung VOR Tag 30 einreichen!',
      ics38: 'KRITISCH 45-Tage-Höchstfrist (Tag 38): Heute schriftliche Fristverlängerung einreichen!',
      modeForms: '📋 1. Geführte PIBA-Formulare (Deutsch → Behörden-Hebräisch)',
      modeLetters: '🛡️ 2. Hebräische Rechtsschreiben & Amtsleiter-Eskalation',
      selForm: '1. Offizielles Misrad HaPanim Formular wählen:',
      selLetter: '1. Gesetzliches Schreiben / Eskalation wählen:',
      selBranch: '2. Zuständige Zweigstelle:',
      btnPrintBlank: '🖨️ Arbeitsblatt Leer Drucken (auf Deutsch)',
      btnScanWs: '📸 Handschriftliches Blatt Scannen (KI → Hebräisch)',
      btnAiHeb: '🌐 Meine Antworten → Behörden-Hebräisch Übersetzen (KI)',
      btnConverting: '⏳ Übersetze in Behörden-Hebräisch...',
      btnSave: '💾 Speichern',
      btnAudit: '🔍 Alle Dokumente Abgleichen & Prüfen',
      btnPrintFinal: '🖨️ Offizielles Hebräisches Paket Erstellen (PDF)',
      autoSaveNote: '☁️ Speichert automatisch beim Verlassen jedes Feldes • Automatische Hebräisch-Konvertierung vor dem Druck.',
      wsIntro: 'Füllen Sie das Blatt auf Deutsch aus und fotografieren Sie es mit „Handschriftliches Blatt Scannen“ in GiyurAliyahTrack — unsere KI überträgt alles ins offizielle Hebräisch.',
      wsYes: '☐ Ja / Bestätigt',
      alreadyHeb: '✅ Alle hebräischen Pflichtfelder sind bereits auf Hebräisch!',
      scanningWs: '🔍 Handschriftliches Arbeitsblatt wird gescannt und in Behörden-Hebräisch übersetzt...',
      audErrHead: '🛑 {n} Ablehnungsrisiko/-risiken Vor Ihrem Termin Erkannt:',
      audOkHead: '✅ 100% Schalter-Sicheres Paket — Alle Dokumenten-Abgleiche Bestanden!',
      errMissing: '🚨 <strong>Fehlende Pflichtfelder in {code} ({n}):</strong> {list}',
      okAllFilled: '✅ Alle Pflichtfelder in {code} sind ausgefüllt.',
      errNonHeb: '🌐 <strong>Schalter-Falle — Nicht-Hebräischer Text in {n} Feld(ern):</strong> Klicken Sie auf <strong>„Meine Antworten → Behörden-Hebräisch“</strong> (oder auf PDF Erstellen zur Auto-Übersetzung)!',
      okHebFirst: '✅ 100% Hebräisch-Konformität: Alle Sachbearbeiter-Felder sind auf Hebräisch und Pass-Felder in Lateinschrift.',
      errDecl: '🚨 <strong>Gesetzliche Erklärung Nicht Angekreuzt:</strong> Bitte bestätigen Sie unten die gesetzliche Erklärung.',
      errTz: '🚨 <strong>Ungültige 9-Stellige Israelische Teudat Zehut (`{tz}`):</strong> Prüfziffer falsch — Tippfehler korrigieren!',
      errPassShort: '🚨 <strong>Reisepass-Gültigkeit Zu Kurz ({m}M übrig):</strong> {code} erfordert mindestens {req} Monate.',
      warnPassBuf: '⚠️ <strong>Reisepass-Puffer ({m}M übrig):</strong> Gesetzlich {req}M für {code}, aber 24M empfohlen.',
      okPass: '✅ Reisepass-Gültigkeit ({m} Monate übrig) erfüllt alle Vorgaben.',
      errPolExp: '🚨 <strong>180-Tage-Frist Abgelaufen ({d}T alt):</strong> Führungszeugnis/Ledigkeit darf max. 180 Tage alt sein.',
      okPol: '✅ 180-Tage-Uhr gültig (noch {left} Tage übrig).',
      errNameTrap: '🚨 <strong>Namensänderungs-Falle 2026 (`{p}`):</strong> Frühere/Geburtsnamen MÜSSEN im Führungszeugnis stehen UND durch apostillierte Urkunde oder Anwalts-Affidavit belegt sein.',
      errCrossScan: '🚨 <strong>Namensabweichung Zwischen Gescannten Urkunden:</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}")! Apostillierte Namensänderungsurkunde beifügen.',
      errScanVsForm: '🚨 <strong>Schreibweisen-Abweichung Scan vs. Formular:</strong> `{doc}` lautet "{sn}" vs. Formular "{fn}".',
      errDobFlip: '🚨 <strong>Geburtsdatum-Abweichung (`TT/MM` vs `MM/TT`):</strong> `{doc}` zeigt `{sd}` vs. Formular `{fd}`.',
      okScansChecked: '✅ Erfolgreich mit {n} gescannter/n Urkunde(n) abgeglichen.',
      btnFixLegal: '🎀 Rotes-Band-Notarübersetzung oder Namens-Affidavit benötigt? Rechtsbüro Buchen →',
      pwBtnUnlock: '🔓 Offizielles Hebräisches PDF Ohne Wasserzeichen Freischalten ($89 90T / $149 Lebenslang) →',
      pwPrompt: '📄 Schalten Sie offizielle hebräische PIBA-Formulare ohne Wasserzeichen frei ($89 90-Tage-Pass oder $149 Lebenslang):'
    },
    he: {
      dosTitle: '✈️ תיק אב מסונכרן והצלבת מסמכים אוטומטית (אפס טעויות לפני הטיסה והלשכה)',
      dosSub: 'כל תעודה שנסרקה וכל טופס שמולא מוצלבים אוטומטית (שמות, הורים, סבים, תאריכים ותוקף דרכון/יושר) ונשמרים בעברית תקנית:',
      noScans: '📸 טרם נסרקו תעודות (סרקו בכרטיסייה #2)',
      hebReady: '100% מוכן בעברית',
      tapConvert: 'לחצו תרגום ← עברית',
      rawDrawer: '📂 לעיון: פתיחת טפסי המקור הריקים של רשות האוכלוסין (אופציונלי)',
      timerTitle: '⏱️ שעון עצר 25/30 מול 45 ימים ומגן הטיות פקידים',
      timerLead: 'נהלי 2026 מקנים 45 יום (ו-21 יום לערר), אך בשטח פקידים פועלים לפי הרגל של 30 יום או מתעלמים מפסיקה (נישואי יוטה עע"מ 7368/22). הגישו בעברית מלאה עד יום 25 ובכל סירוב דרשו החלטה בכתב!',
      timerDateLbl: 'תאריך קבלת דרישת המסמכים / הסירוב:',
      timerCalBtn: '🔔 תזכורות ליומן יום 24 ו-38 (.ics)',
      timerEmpty: 'בחרו למעלה את תאריך הדרישה להפעלת שעון העצר החי (יעד 25 יום / 45 יום בחוק).',
      t30Left: '🎯 הרגל פקיד 30 יום: נותרו {d} ימים',
      t30Over: '🚨 חריגה של {d} ימים מ-30 יום — הגישו הארכה מיד!',
      t45Left: '⚖️ תקרת חוק 2026 (45 יום): נותרו {d} ימים',
      t45Exp: '🛑 פג מועד 45 הימים',
      t21Left: '🛡️ מועד ערר 21 יום: נותרו {d} ימים',
      t21Over: 'חלפו 21 ימי הערר',
      ics14: 'בדיקת מעקב משרד הפנים (יום 14): וידוא אפוסטיל ותרגומים נוטריוניים',
      ics24: 'דחוף משרד הפנים (יום 24): הגשת התיק או בקשת הארכה לפני יום ה-30!',
      ics38: 'קריטי תקרת 45 יום בחוק (יום 38): חובה להגיש בקשת הארכה בכתב היום!',
      modeForms: '📋 1. מילוי מונחה של טפסי משרד הפנים (עברית תקנית מלאה)',
      modeLetters: '🛡️ 2. מכתבי הסבר ודרישת החלטה בכתב ממנהל הלשכה',
      selForm: '1. בחרו טופס רשמי של משרד הפנים:',
      selLetter: '1. בחרו מכתב הסבר / דרישת החלטה בכתב:',
      selBranch: '2. לשכת רשות האוכלוסין המטפלת:',
      btnPrintBlank: '🖨️ הדפסת דף עבודה ריק למילוי ידני',
      btnScanWs: '📸 סריקת דף עבודה ממולא בכתב יד (AI)',
      btnAiHeb: '🌐 תרגום אוטומטי של כל התשובות לעברית תקנית (AI)',
      btnConverting: '⏳ מתרגם לעברית תקנית לרשות האוכלוסין...',
      btnSave: '💾 שמירה',
      btnAudit: '🔍 בדיקת הצלבת מסמכים מלאה',
      btnPrintFinal: '🖨️ הפקת תיק רשמי בעברית להדפסה (PDF)',
      autoSaveNote: '☁️ שמירה אוטומטית בענן בכל מעבר שדה • המרה אוטומטית לעברית תקנית לפני הדפסה.',
      wsIntro: 'מלאו בכתב ברור וצלמו דרך כפתור "סריקת דף עבודה ממולא בכתב יד" במערכת — ה-AI יעביר הכל לעברית תקנית.',
      wsYes: '☐ כן / מאושר',
      alreadyHeb: '✅ כל שדות העברית כבר ממולאים בעברית תקנית!',
      scanningWs: '🔍 סורק את דף העבודה בכתב יד וממיר לעברית תקנית...',
      audErrHead: '🛑 אותרו {n} מוקשים לעצירת התיק בלשכה לפני התור:',
      audOkHead: '✅ תיק חסין פקידים ב-100% — כל הצלבות המסמכים עברו בהצלחה!',
      errMissing: '🚨 <strong>שדות חובה חסרים ב-{code} ({n}):</strong> {list}',
      okAllFilled: '✅ כל שדות החובה ב-{code} מלאים.',
      errNonHeb: '🌐 <strong>מלכודת פקידים — אותיות לועזיות ב-{n} שדות עברית:</strong> לחצו על <strong>"תרגום אוטומטי לעברית תקנית"</strong> (או על הפקת PDF להמרה אוטומטית)!',
      okHebFirst: '✅ עמידה מלאה בעברית תקנית: כל שדות הפקיד בעברית ושדות הדרכון בלועזית.',
      errDecl: '🚨 <strong>הצהרה חוקית לא סומנה:</strong> חובה לסמן את תיבת ההצהרה בתחתית הטופס.',
      errTz: '🚨 <strong>מספר תעודת זהות ישראלית שגוי (`{tz}`):</strong> ספרת הביקורת אינה תקינה — תקנו את שגיאת ההקלדה!',
      errPassShort: '🚨 <strong>תוקף דרכון קצר מדי ({m} חודשים):</strong> {code} מחייב לפחות {req} חודשים.',
      warnPassBuf: '⚠️ <strong>מרווח ביטחון לדרכון ({m} חודשים):</strong> החוק דורש {req} חודשים ל-{code}, אך מומלץ 24 חודשים.',
      okPass: '✅ תוקף הדרכון הזר ({m} חודשים) תקין.',
      errPolExp: '🚨 <strong>פג תוקף 180 יום לתעודת יושר/מצב אישי ({d} ימים):</strong> חייב להיות מתחת ל-180 יום.',
      okPol: '✅ שעון 180 הימים לתעודות תקין (נותרו {left} ימים).',
      errNameTrap: '🚨 <strong>מלכודת שינוי שם 2026 (`{p}`):</strong> חובה שכל שם קודם/נעורים יופיע בתעודת היושר ושיצורף אישור שינוי שם/נישואין מאומת באפוסטיל או תצהיר עו"ד.',
      errCrossScan: '🚨 <strong>אי-התאמת שמות בין התעודות שנסרקו:</strong> `{a}` ("{na}") ≠ `{b}` ("{nb}")! צרפו תעודת שינוי שם מאומתת.',
      errScanVsForm: '🚨 <strong>פער באיות השם בין התעודה לטופס:</strong> ב-`{doc}` מופיע "{sn}" לעומת "{fn}" בטופס.',
      errDobFlip: '🚨 <strong>סתירה בתאריך לידה (`יום/חודש` מול `חודש/יום`):</strong> ב-`{doc}` רשום `{sd}` לעומת `{fd}` בטופס.',
      okScansChecked: '✅ בוצעה הצלבה מלאה מול {n} תעודות שנסרקו.',
      btnFixLegal: '🎀 זקוקים לתרגום נוטריוני (סרט אדום) או תצהיר שמות? תאמו מול המחלקה המשפטית ←',
      pwBtnUnlock: '🔓 פתיחת PDF רשמי נקי ללא סימן מים ($89 ל-90 יום / $149 לכל החיים) ←',
      pwPrompt: '📄 פתחו הפקת טפסי רשות האוכלוסין ומכתבים רשמיים בעברית ללא סימן מים ($89 ל-90 יום או $149 לכל החיים):'
    }
  };

  var F = {
    pf_surname_he: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Family / Last Name (in Hebrew for Clerk)', fr: 'Nom de Famille (en Hébreu pour le guichet)', es: 'Apellido(s) (en Hebreo para ventanilla)', de: 'Familienname (auf Hebräisch für den Schalter)', he: 'שם משפחה (בעברית)' },
      h: { en: 'Type in your language—tapping Convert or Print automatically converts it into Clerk Hebrew.', fr: 'Écrivez en français — sera automatiquement converti en hébreu.', es: 'Escriba en español — se convertirá automáticamente al hebreo.', de: 'Einfach eingeben — wird automatisch ins Hebräische übertragen.', he: 'כפי שיופיע במרשם האוכלוסין.' } },
    pf_surname_en: { req: 1, script: 'latin',
      l: { en: 'Surname — Exact Passport Latin Letters', fr: 'Nom de Famille — Lettres Latines Exactes du Passeport', es: 'Apellido — Letras Latinas Exactas del Pasaporte', de: 'Nachname — Exakte Lateinische Pass-Schreibweise', he: 'שם משפחה בלועזית (בדיוק כמו בדרכון)' },
      h: { en: 'Must match your passport machine-readable zone letter-for-letter.', fr: 'Doit correspondre lettre pour lettre au passeport.', es: 'Debe coincidir letra por letra con su pasaporte.', de: 'Muss Buchstabe für Buchstabe mit dem Reisepass übereinstimmen.', he: 'להתאמה למערכת ביקורת הגבולות.' } },
    pf_given_he: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Given Name(s) (in Hebrew)', fr: 'Prénom(s) (en Hébreu)', es: 'Nombre(s) de Pila (en Hebreo)', de: 'Vorname(n) (auf Hebräisch)', he: 'שם פרטי (בעברית)' },
      h: { en: 'Include middle names if printed on your passport/birth certificate.', fr: 'Incluez tous les prénoms figurant sur le passeport.', es: 'Incluya segundo nombre si aparece en su pasaporte/partida.', de: 'Alle Vornamen laut Pass/Geburtsurkunde angeben.', he: 'כולל שם שני / שם גיור אם מופיע בתעודות.' } },
    pf_given_en: { req: 1, script: 'latin',
      l: { en: 'Given Name(s) — Exact Passport Latin Letters', fr: 'Prénom(s) — Lettres Latines du Passeport', es: 'Nombre(s) — Letras Latinas del Pasaporte', de: 'Vorname(n) — Lateinische Pass-Schreibweise', he: 'שם פרטי בלועזית (כמו בדרכון)' },
      h: { en: 'Never drop a middle name that appears on your Birth Certificate!', fr: 'N\'omettez aucun deuxième prénom présent sur l\'acte de naissance !', es: '¡No omita ningún segundo nombre que figure en su partida de nacimiento!', de: 'Keinen Zweitnamen weglassen, der auf der Geburtsurkunde steht!', he: 'אל תשמיטו שם אמצעי שמופיע בתעודת הלידה!' } },
    pf_prior_names: { req: 0, script: 'he', rtl: 1,
      l: { en: 'All Maiden / Prior Legal Names (or "ללא")', fr: 'Nom de Jeune Fille / Tous Noms Antérieurs (ou « ללא »)', es: 'Apellido de Soltera / Nombres Anteriores (o «ללא»)', de: 'Geburtsname / Alle Früheren Namen (oder „ללא“)', he: 'כל השמות הקודמים / שם נעורים (או "ללא")' },
      h: { en: 'CRITICAL 2026 TRAP: Any difference between Birth Cert & Passport requires an Apostilled Name-Change Cert AND must appear on your Police Check!', fr: 'PIÈGE 2026 : Tout changement de nom exige un acte apostillé ET doit figurer sur votre casier judiciaire !', es: 'TRAMPA 2026: Cualquier cambio entre Partida y Pasaporte exige acta apostillada Y figurar en Antecedentes Penales.', de: 'FALLE 2026: Jede Namensänderung erfordert eine apostillierte Urkunde UND muss im Führungszeugnis stehen!', he: 'חובה שהשם הקודם יופיע בתעודת היושר + תעודת שינוי שם מאומתת באפוסטיל!' } },
    pf_dob: { req: 1, t: 'date', script: 'any',
      l: { en: 'Date of Birth', fr: 'Date de Naissance', es: 'Fecha de Nacimiento', de: 'Geburtsdatum', he: 'תאריך לידה לועזי' },
      h: { en: 'Printed automatically as Israeli DD/MM/YYYY so clerks never confuse month and day.', fr: 'Formaté automatiquement en JJ/MM/AAAA pour Israël.', es: 'Se formatea automáticamente en DD/MM/AAAA para Israel.', de: 'Wird automatisch im israelischen Format TT/MM/JJJJ gedruckt.', he: 'יודפס בפורמט ישראלי תקני יום/חודש/שנה.' } },
    pf_hebrew_dob: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Hebrew Date of Birth (Required on MR/14)', fr: 'Date de Naissance Hébraïque (pour MR/14)', es: 'Fecha de Nacimiento Hebrea (para MR/14)', de: 'Hebräisches Geburtsdatum (für MR/14)', he: 'תאריך לידה עברי (לשאלון מר/14)' } },
    pf_gender: { req: 1, t: 'select', script: 'he',
      opts: [
        { v: 'נקבה', en: 'Female (נקבה)', fr: 'Femme (נקבה)', es: 'Femenino (נקבה)', de: 'Weiblich (נקבה)', he: 'נקבה' },
        { v: 'זכר', en: 'Male (זכר)', fr: 'Homme (זכר)', es: 'Masculino (זכר)', de: 'Männlich (זכר)', he: 'זכר' }
      ],
      l: { en: 'Gender', fr: 'Sexe', es: 'Sexo', de: 'Geschlecht', he: 'מגדר / מין' } },
    pf_marital: { req: 1, t: 'select', script: 'he',
      opts: [
        { v: 'רווק/ה', en: 'Single (רווק/ה)', fr: 'Célibataire (רווק/ה)', es: 'Soltero/a (רווק/ה)', de: 'Ledig (רווק/ה)', he: 'רווק/ה' },
        { v: 'נשוי/אה', en: 'Married (נשוי/אה)', fr: 'Marié(e) (נשוי/אה)', es: 'Casado/a (נשוי/אה)', de: 'Verheiratet (נשוי/אה)', he: 'נשוי/אה' },
        { v: 'גרוש/ה', en: 'Divorced (גרוש/ה)', fr: 'Divorcé(e) (גרוש/ה)', es: 'Divorciado/a (גרוש/ה)', de: 'Geschieden (גרוש/ה)', he: 'גרוש/ה' },
        { v: 'אלמן/ה', en: 'Widowed (אלמן/ה)', fr: 'Veuf/Veuve (אלמן/ה)', es: 'Viudo/a (אלמן/ה)', de: 'Verwitwet (אלמן/ה)', he: 'אלמן/ה' },
        { v: 'ידוע/ה בציבור', en: 'Common-Law Partner (ידוע/ה בציבור)', fr: 'Concubin / Pacsé (ידוע/ה בציבור)', es: 'Pareja de Hecho (ידוע/ה בציבור)', de: 'Lebenspartner (ידוע/ה בציבור)', he: 'ידוע/ה בציבור' }
      ],
      l: { en: 'Current Marital Status', fr: 'État Civil Actuel', es: 'Estado Civil Actual', de: 'Aktueller Familienstand', he: 'מצב משפחתי נוכחי' } },
    pf_birth_country: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Country & City of Birth (in Hebrew)', fr: 'Pays & Ville de Naissance (en Hébreu)', es: 'País y Ciudad de Nacimiento (en Hebreo)', de: 'Geburtsland & Geburtsort (auf Hebräisch)', he: 'ארץ ועיר לידה (בעברית)' } },
    pf_citizenship: { req: 1, script: 'he', rtl: 1,
      l: { en: 'All Current Citizenships (in Hebrew)', fr: 'Toutes Nationalités Actuelles (en Hébreu)', es: 'Todas las Ciudadanías Actuales (en Hebreo)', de: 'Alle Staatsangehörigkeiten (auf Hebräisch)', he: 'אזרחויות נוכחיות (בעברית)' },
      h: { en: 'List dual citizenships too—you need a Police Check from each citizenship country.', fr: 'Indiquez toute double nationalité (casier requis pour chacune).', es: 'Indique doble ciudadanía (se exige antecedentes de cada país).', de: 'Auch Doppelstaatsbürgerschaften angeben (jeweils Führungszeugnis nötig).', he: 'ציינו גם אזרחות כפולה — נדרשת תעודת יושר מכל מדינת אזרחות.' } },
    pf_religion_nat: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Religion & Nationality (in Hebrew)', fr: 'Religion & Nationalité (en Hébreu)', es: 'Religión y Nacionalidad (en Hebreo)', de: 'Religion & Nationalität (auf Hebräisch)', he: 'דת ולאום (בעברית)' } },
    pf_father_he: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Father\'s Full Name (in Hebrew — Match Birth Cert)', fr: 'Nom Complet du Père (en Hébreu — selon Acte de Naissance)', es: 'Nombre Completo del Padre (en Hebreo — según Partida)', de: 'Vollständiger Name des Vaters (auf Hebräisch)', he: 'שם האב המלא (בעברית — כמו בתעודת הלידה)' } },
    pf_father_dob: { req: 0, t: 'date', script: 'any',
      l: { en: 'Father\'s Date of Birth (Form Ash/3)', fr: 'Date de Naissance du Père (Formulaire Ash/3)', es: 'Fecha de Nacimiento del Padre (Formulario Ash/3)', de: 'Geburtsdatum des Vaters (Formular Asch/3)', he: 'תאריך לידה של האב (טופס אש/3)' } },
    pf_mother_he: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Mother\'s Full Name (in Hebrew — Match Birth Cert)', fr: 'Nom Complet de la Mère (en Hébreu — selon Acte)', es: 'Nombre Completo de la Madre (en Hebreo — según Partida)', de: 'Vollständiger Name der Mutter (auf Hebräisch)', he: 'שם האם המלא (בעברית — כמו בתעודת הלידה)' } },
    pf_mother_maiden: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Mother\'s Maiden Name (Mandatory on Ash/1 & Ash/3)', fr: 'Nom de Jeune Fille de la Mère (Obligatoire sur Ash/1 & Ash/3)', es: 'Apellido de Soltera de la Madre (Obligatorio en Ash/1 y Ash/3)', de: 'Geburtsname der Mutter (Pflichtfeld auf Asch/1 & Asch/3)', he: 'שם נעורים של האם (חובה באש/1 ובאש/3)' } },
    pf_mother_dob: { req: 0, t: 'date', script: 'any',
      l: { en: 'Mother\'s Date of Birth (Form Ash/3)', fr: 'Date de Naissance de la Mère (Formulaire Ash/3)', es: 'Fecha de Nacimiento de la Madre (Formulario Ash/3)', de: 'Geburtsdatum der Mutter (Formular Asch/3)', he: 'תאריך לידה של האם (טופס אש/3)' } },
    pf_foreign_grandfather: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Paternal Grandfather\'s Name (Mandatory on Ash/6 & MR/14!)', fr: 'Prénom du Grand-Père Paternel (Obligatoire sur Ash/6 & MR/14 !)', es: 'Nombre del Abuelo Paterno (¡Obligatorio en Ash/6 y MR/14!)', de: 'Name des Großvaters väterlicherseits (Pflicht auf Asch/6 & MR/14!)', he: 'שם הסב (אבי האב — שדה חובה באש/6 ובמר/14!)' } },
    pf_pass_num: { req: 1, script: 'latin',
      l: { en: 'Foreign Passport Number', fr: 'Numéro de Passeport Étranger', es: 'Número de Pasaporte Extranjero', de: 'Reisepassnummer', he: 'מספר דרכון זר' } },
    pf_pass_issue_date: { req: 1, t: 'date', script: 'any',
      l: { en: 'Passport Issue Date', fr: 'Date de Délivrance du Passeport', es: 'Fecha de Emisión del Pasaporte', de: 'Ausstellungsdatum des Passes', he: 'תאריך הנפקת דרכון' } },
    pf_pass_exp_date: { req: 1, t: 'date', script: 'any',
      l: { en: 'Passport Expiry Date', fr: 'Date d\'Expiration du Passeport', es: 'Fecha de Vencimiento del Pasaporte', de: 'Ablaufdatum des Passes', he: 'תוקף דרכון עד תאריך' },
      h: { en: 'Min. 24 months left for Spousal (Ash/6, Nespach Alef) or 12 months for Aliyah (Ash/456).', fr: 'Min. 24 mois pour conjoint (Ash/6) ou 12 mois pour Aliyah (Ash/456).', es: 'Mín. 24 meses para pareja (Ash/6) o 12 meses para Aliyá (Ash/456).', de: 'Mind. 24 Monate für Partner (Asch/6) bzw. 12 Monate für Alija (Asch/456).', he: 'מינימום 24 חודשים להליך זוגי או 12 חודשים לעלייה בארץ.' } },
    pf_police_issue_date: { req: 1, t: 'date', script: 'any',
      l: { en: 'Police Check & Single-Status Issue Date (<180 Days!)', fr: 'Date d\'Émission du Casier & Célibat (<180 Jours !)', es: 'Fecha de Emisión de Antecedentes y Soltería (<180 Días!)', de: 'Ausstellungsdatum Führungszeugnis & Ledigkeit (<180 Tage!)', he: 'תאריך הנפקת תעודת יושר ותמצית מצב אישי (עד 180 יום!)' } },
    pf_countries_over_1yr: { req: 1, script: 'he', rtl: 1,
      l: { en: 'All Countries Lived >1 Year Since Age 14', fr: 'Tous Pays Habités >1 An Depuis l\'Âge de 14 Ans', es: 'Todos los Países Vividos >1 Año Desde los 14 Años', de: 'Alle Länder >1 Jahr Wohnsitz Seit dem 14. Lebensjahr', he: 'כל המדינות בהן התגוררת מעל שנה מגיל 14' },
      h: { en: 'Every country listed here requires its own Apostilled Police Check!', fr: 'Chaque pays mentionné exige son propre casier judiciaire apostillé !', es: '¡Cada país listado aquí requiere su propio Certificado Penal Apostillado!', de: 'Für jedes hier genannte Land ist ein eigenes apostilliertes Führungszeugnis Pflicht!', he: 'חובה לצרף תעודת יושר מאומתת באפוסטיל מכל מדינה ברשימה זו!' } },
    pf_entry_date_port: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Last Entry Date to Israel, Border Port & Current Visa', fr: 'Dernière Entrée en Israël, Point d\'Entrée & Visa Actuel', es: 'Última Entrada a Israel, Frontera y Visa Actual', de: 'Letzte Einreise nach Israel, Grenzübergang & Visum', he: 'תאריך כניסה אחרון לישראל, מעבר גבול ואשרה נוכחית' } },
    pf_abroad_addr: { req: 1, script: 'latin',
      l: { en: 'Permanent Address Abroad (Latin Letters: Street, City, Country)', fr: 'Adresse Permanente à l\'Étranger (Rue, Ville, Pays)', es: 'Dirección Permanente en el Extranjero (Calle, Ciudad, País)', de: 'Feste Adresse im Ausland (Straße, Ort, Land)', he: 'המען הקבוע בחו"ל (בלועזית: רחוב, עיר, מדינה)' } },
    pf_il_addr_he: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Full Israeli Address (in Hebrew: City, Street, House/Apt, Zip)', fr: 'Adresse Complète en Israël (en Hébreu : Ville, Rue, N°, Appt)', es: 'Dirección Completa en Israel (en Hebreo: Ciudad, Calle, N.º, Dpto)', de: 'Vollständige Adresse in Israel (auf Hebräisch: Stadt, Straße, Nr.)', he: 'כתובת מלאה בישראל (בעברית: יישוב, רחוב, בית, דירה, מיקוד)' } },
    pf_phone_il: { req: 1, script: 'any',
      l: { en: 'Israeli Mobile Phone Number(s)', fr: 'Numéro(s) Mobile Israélien', es: 'Teléfono(s) Móvil en Israel', de: 'Israelische Handynummer(n)', he: 'מספר טלפון נייד בישראל' } },
    pf_email: { req: 1, script: 'latin',
      l: { en: 'Email Address (Used by PIBA for Official Legal Notices!)', fr: 'Adresse Email (Utilisée pour les notifications officielles !)', es: 'Correo Electrónico (¡Usado para notificaciones oficiales!)', de: 'E-Mail-Adresse (Wird für amtliche Fristbescheide genutzt!)', he: 'כתובת דוא"ל (משמשת להמצאה רשמית של החלטות הרשות!)' } },
    pf_ash3_action: { req: 1, script: 'he', rtl: 1,
      l: { en: 'Requested Extension Months & Target Visa (in Hebrew)', fr: 'Durée Demandée & Catégorie de Visa (en Hébreu)', es: 'Meses Solicitados y Categoría de Visa (en Hebreo)', de: 'Gewünschte Monate & Visakategorie (auf Hebräisch)', he: 'הארכת רישיון (מס׳ חודשים) / החלפת סוג אשרה ל-' } },
    pf_inst_details: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Studying Institution / Yeshiva / Ulpan, Amuta # & Rabbi Phone (in Hebrew)', fr: 'Institution d\'Étude / Oulpan, N° Amuta & Téléphone du Rabbin (en Hébreu)', es: 'Institución / Yeshivá / Ulpán, N.º Amutá y Teléfono (en Hebreo)', de: 'Lehrinstitut / Jeschiwa / Ulpan, Amuta-Nr. & Telefon (auf Hebräisch)', he: 'שם המוסד בו המבקש לומד, מספר עמותה, כתובת ואיש קשר' } },
    pf_sp_name_he: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Israeli Spouse / Partner / Inviter Full Name (in Hebrew)', fr: 'Nom Complet du Conjoint / Invitant Israélien (en Hébreu)', es: 'Nombre Completo del Cónyuge / Invitante Israelí (en Hebreo)', de: 'Vollständiger Name des Israelischen Partners / Einladers (Hebräisch)', he: 'שם מלא של בן/בת הזוג או המזמין הישראלי (בעברית)' } },
    pf_sp_tz: { req: 0, script: 'any',
      l: { en: 'Israeli 9-Digit Teudat Zehut Number (Auto Check-Digit Verified)', fr: 'N° Teudat Zehut Israélien à 9 Chiffres (Vérification Auto)', es: 'N.º Teudat Zehut Israelí de 9 Dígitos (Verificación Automática)', de: '9-Stellige Israelische Teudat-Zehut-Nr. (Prüfziffer-Check)', he: 'מספר תעודת זהות ישראלית (9 ספרות — בדיקת ספרת ביקורת)' } },
    pf_sp_parents_grand: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Israeli Sponsor\'s DOB, Father, Mother & Grandfather Names (in Hebrew — Ash/6 p.2)', fr: 'Date Naiss., Père, Mère & Grand-Père du Conjoint Israélien (en Hébreu)', es: 'Fecha Nac., Padre, Madre y Abuelo del Cónyuge Israelí (en Hebreo)', de: 'Geburtsdatum, Vater, Mutter & Großvater des Israelis (Hebräisch)', he: 'תאריך לידה, שם האב, שם האם ושם הסב של בן הזוג הישראלי (אש/6 עמ׳ 2)' } },
    pf_marriage_details: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Marriage Date & Place + Sponsor Occupation (in Hebrew)', fr: 'Date & Lieu de Mariage + Profession du Conjoint (en Hébreu)', es: 'Fecha y Lugar de Boda + Profesión del Cónyuge (en Hebreo)', de: 'Heiratsdatum & -ort + Beruf des Partners (auf Hebräisch)', he: 'תאריך ומקום הנישואין (כולל יוטה/חו"ל) ומשלח יד המזמין' } },
    pf_ash6_refs: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: { en: '2 Israeli References: Full Name, 9-Digit TZ, Relation, Address & Phone (in Hebrew)', fr: '2 Témoins Israéliens : Nom, TZ 9 chiffres, Lien, Adresse & Tél. (en Hébreu)', es: '2 Testigos Israelíes: Nombre, TZ 9 dígitos, Vínculo, Dirección y Tel. (en Hebreo)', de: '2 Israelische Referenzen: Name, 9-stellige TZ, Beziehung, Adresse & Tel. (Hebräisch)', he: 'שני ממליצים ישראלים (עמ׳ 3 באש/6): שם מלא, ת"ז, קירבה, כתובת וטלפון (+ צילום ת"ז!)' } },
    pf_ll_affidavit: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: { en: 'Page 6 Landlord Lease Affidavit: Owner Name, TZ, SQM (מ"ר), Floors, Rooms & Utility Payers (in Hebrew)', fr: 'Page 6 Affidavit Propriétaire : Nom, TZ, Surface (m²), Étages, Pièces & Factures (en Hébreu)', es: 'Pág. 6 Declaración del Propietario: Nombre, TZ, m², Pisos, Habitaciones y Cuentas (en Hebreo)', de: 'Seite 6 Vermieter-Erklärung: Name, TZ, m², Etagen, Zimmer & Nebenkosten (Hebräisch)', he: 'תצהיר משכיר (עמ׳ 6 באש/6): שם ות"ז בעל הנכס, מ"ר, קומות, חדרים ומי משלם חשבונות' } },
    pf_456_settlement: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: { en: 'Page 2 Ash/456 + MR/14: Prior Israel Stays, Severing Abroad Ties, Israeli Bank, Housing, Community & Schooling Years (in Hebrew)', fr: 'Page 2 Ash/456 + MR/14 : Séjours passés, Fin d\'activité à l\'étranger, Banque, Logement, Communauté & Années d\'études (en Hébreu)', es: 'Pág. 2 Ash/456 + MR/14: Estadías previas, Fin de lazos afuera, Banco israelí, Vivienda, Comunidad y Años de estudio (en Hebreo)', de: 'Seite 2 Asch/456 + MR/14: Frühere Aufenthalte, Aufgabe Auslandswohnsitz, Bankkonto, Gemeinde & Schuljahre (Hebräisch)', he: 'עמ׳ 2 באש/456 + מר/14: שהיות קודמות, ניתוק מרכז חיים בחו"ל, בנק ודיור בארץ, קהילה ושנות לימוד' } },
    pf_456_shvut: { req: 0, t: 'select', script: 'he',
      opts: [
        { v: 'סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר', en: 'Law of Return §4B — Jewish by Birth or Recognized Conversion', fr: 'Loi du Retour §4B — Juif de naissance ou Conversion reconnue', es: 'Ley del Retorno §4B — Judío de nacimiento o Conversión reconocida', de: 'Rückkehrgesetz §4B — Jüdisch geboren oder anerkannte Konversion', he: 'סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר' },
        { v: 'סעיף 4א לחוק השבות — בן/בת זוג, ילד או נכד של יהודי', en: 'Law of Return §4A — Spouse / Child / Grandchild of a Jew', fr: 'Loi du Retour §4A — Conjoint / Enfant / Petit-enfant de Juif', es: 'Ley del Retorno §4A — Cónyuge / Hijo / Nieto de Judío', de: 'Rückkehrgesetz §4A — Ehepartner / Kind / Enkel eines Juden', he: 'סעיף 4א לחוק השבות — בן/בת זוג, ילד או נכד של יהודי' }
      ],
      l: { en: 'Law of Return Eligibility Clause (Page 3 Ash/456)', fr: 'Clause d\'Éligibilité Loi du Retour (Page 3 Ash/456)', es: 'Cláusula de Ley del Retorno (Pág. 3 Ash/456)', de: 'Anspruchsgrundlage Rückkehrgesetz (Seite 3 Asch/456)', he: 'סעיף זכאות בחוק השבות (עמ׳ 3 באש/456)' } },
    pf_ash1_consulate: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Purpose of Entry & Israeli Consulate Abroad to Notify (in Hebrew)', fr: 'Motif d\'Entrée & Consulat d\'Israël à Notifier (en Hébreu)', es: 'Motivo de Entrada y Consulado Israelí a Notificar (en Hebreo)', de: 'Einreisezweck & zu benachrichtigendes Konsulat (auf Hebräisch)', he: 'מטרת הכניסה לישראל ונציגות ישראל בחו"ל להעברת האישור' } },
    pf_cv_details: { req: 0, script: 'he', rtl: 1, t: 'textarea',
      l: { en: 'Security CV (Pages 1–11): Universities/Scholarships, Past/Present Jobs, First-Degree Family (+ Spouses) & Contacts (in Hebrew)', fr: 'CV Sécurité (p.1–11) : Universités/Bourses, Emplois, Famille 1er degré (+ Conjoints) & Contacts (en Hébreu)', es: 'CV Seguridad (p.1–11): Universidades/Becas, Empleos, Familia 1er grado (+ Cónyuges) y Contactos (en Hebreo)', de: 'Sicherheits-CV (S.1–11): Universitäten/Stipendien, Berufe, Familie 1. Grades (+ Ehepartner) & Kontakte (Hebräisch)', he: 'קורות חיים (עמ׳ 1–11): השכלה ומלגות, תעסוקה, בני משפחה מדרגה ראשונה (+ בני זוגם) ומכרים' } },
    pf_children_table: { req: 0, script: 'he', rtl: 1,
      l: { en: 'Accompanying Children Under 18 (Hebrew + Latin Name, Birth Country, DOB — or "ללא")', fr: 'Enfants Mineurs <18 Ans (Nom Hébreu + Latin, Pays, Date Naiss. — ou « ללא »)', es: 'Hijos Menores de 18 Años (Nombre Hebreo + Latino, País, Fecha Nac. — o «ללא»)', de: 'Begleitende Kinder unter 18 (Name Hebräisch + Latein, Land, Geburtsdatum — oder „ללא“)', he: 'ילדים נלווים מתחת לגיל 18 (שם בעברית ובלועזית, ארץ לידה ותאריך לידה — או "ללא")' } },
    pf_rel_story: { req: 1, script: 'he', rtl: 1, t: 'textarea',
      l: { en: 'Mandatory Statutory Explanation Letter — Michtav Hesber (Write in your language — auto-converts to Hebrew!)', fr: 'Lettre d\'Explication Obligatoire — Michtav Hesber (Écrivez en français — conversion auto en hébreu !)', es: 'Carta Explicativa Obligatoria — Mijtav Hesber (¡Escriba en español — se convierte sola al hebreo!)', de: 'Pflicht-Begleitschreiben — Michtav Hesber (Auf Deutsch schreiben — wird automatisch Hebräisch!)', he: 'מכתב הסבר מנומק החובה לצירוף לטופס (בעברית תקנית)' } },
    pf_decl_clean_record: { t: 'checkbox', def: true,
      l: { en: 'I confirm all statutory declarations (clean criminal/health/security record, no boycott/§2d bar, sincere Israeli center of life & address-update duty)', fr: 'Je confirme toutes les déclarations légales (casier/santé/sécurité vierges, centre de vie sincère en Israël et obligation de signaler tout changement d\'adresse)', es: 'Confirmo todas las declaraciones legales (sin antecedentes penales/salud/seguridad, centro de vida sincero en Israel y deber de informar cambios de domicilio)', de: 'Ich bestätige alle gesetzlichen Erklärungen (keine Vorstrafen/Gesundheits-/Sicherheitsrisiken, Lebensmittelpunkt in Israel & Adressmeldepflicht)', he: 'אני מאשר/ת את כלל ההצהרות החוקיות בטופס (היעדר עבר פלילי/ביטחוני/בריאותי, מרכז חיים כן בישראל וחובת עדכון כתובת)' } },
    pf_police_covers_prior: { t: 'checkbox', def: true,
      l: { en: 'My Apostilled Police Certificate (<180d) explicitly covers ALL prior/maiden names', fr: 'Mon casier judiciaire apostillé (<180j) mentionne explicitement TOUS mes noms antérieurs / de jeune fille', es: 'Mi Certificado de Antecedentes Apostillado (<180d) cubre TODOS mis nombres/apellidos anteriores', de: 'Mein apostilliertes Führungszeugnis (<180T) deckt ALLE früheren Namen / Geburtsnamen ab', he: 'תעודת היושר המאומתת שלי (<180 יום) כוללת במפורש את כל השמות הקודמים / שם הנעורים' } },
    pf_has_name_change_cert: { t: 'checkbox', def: true,
      l: { en: 'If any name differs across Birth Cert / Passport / Letters, I hold an Apostilled Name-Change / Marriage Cert or Lawyer Affidavit', fr: 'En cas de différence de nom entre mes actes, je joins un Acte de Changement de Nom / Mariage Apostillé ou Affidavit d\'Avocat', es: 'Si algún nombre difiere entre mis documentos, adjunto Certificado de Cambio de Nombre / Matrimonio Apostillado o Declaración Notarial', de: 'Bei Namensabweichungen zwischen Urkunden liegt eine apostillierte Namensänderungs-/Heiratsurkunde oder ein Anwalts-Affidavit bei', he: 'בכל שינוי או הבדל בשם בין התעודות, מצורפת תעודה ציבורית מאומתת על שינוי שם או תצהיר עו"ד' } }
  };

  var FORMS = {
    ash3: {
      code: 'טופס אש/3', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash3_extension_change_visa.pdf',
      t: {
        en: 'טופס אש/3 (Ash/3 — 2p): Visa Extension / Change Visa Category (B/2, Conversion A/2, B/1, A/5)',
        fr: 'טופס אש/3 (Ash/3 — 2p) : Prolongation de Permis / Changement de Visa (B/2, Conversion A/2, B/1, A/5)',
        es: 'טופס אש/3 (Ash/3 — 2p): Prórroga de Permiso / Cambio de Categoría de Visa (B/2, Conversión A/2, B/1, A/5)',
        de: 'טופס אש/3 (Asch/3 — 2S): Aufenthaltsverlängerung / Visumwechsel (B/2, Konversion A/2, B/1, A/5)',
        he: 'טופס אש/3 (2 עמ׳): בקשה להארכת רישיון ישיבה / החלפת סוג אשרה (ב/2, א/2 גיור, ב/1, א/5)'
      },
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
      t: {
        en: 'טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008): Married Spousal Graduated Track + Lease Affidavit',
        fr: 'טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008) : Dossier Conjoint Marié + Affidavit Propriétaire',
        es: 'טופס אש/6 (Ash/6 — 6p, Nohal 5.2.0008): Trámite Escalonado Cónyuge Casado + Alquiler',
        de: 'טופס אש/6 (Asch/6 — 6S, Nohal 5.2.0008): Ehepartner-Stufenverfahren + Vermieter-Affidavit',
        he: 'טופס אש/6 (6 עמ׳, נוהל 5.2.0008 יולי 2026): מתן מעמד לבן זוג זר הנשוי לישראלי + תצהיר שכ"ד'
      },
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
      t: {
        en: 'נספח א׳ (Nohal 5.2.0009 — 1p): 13-Clause Common-Law / Cohabitation Partners Affidavit',
        fr: 'נספח א׳ (Nohal 5.2.0009 — 1p) : Affidavit 13 Clauses Vie Commune / Concubins',
        es: 'נספח א׳ (Nohal 5.2.0009 — 1p): Declaración Jurada 13 Cláusulas Pareja de Hecho',
        de: 'נספח א׳ (Nohal 5.2.0009 — 1S): 13-Punkte-Erklärung für Unverheiratete Lebenspartner',
        he: 'נספח א׳ (נוהל 5.2.0009 יולי 2026): תצהיר 13 סעיפים לבני זוג בחיים משותפים (ידועים בציבור)'
      },
      fields: [
        'pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en',
        'pf_prior_names', 'pf_pass_num', 'pf_pass_exp_date', 'pf_police_issue_date', 'pf_countries_over_1yr',
        'pf_il_addr_he', 'pf_phone_il', 'pf_email', 'pf_rel_story',
        'pf_decl_clean_record', 'pf_police_covers_prior', 'pf_has_name_change_cert'
      ]
    },
    ash456: {
      code: 'טופס אש/456 + מר/14', minPassM: 12, warnPassM: 24, blankPdf: '/forms/gov-pdfs/ash456_in_israel_oleh.pdf',
      t: {
        en: 'טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p): In-Israel Aliyah ("Oleh") & First Teudat Zehut',
        fr: 'טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p) : Aliyah en Israël (« Oleh ») & 1ère Teudat Zehut',
        es: 'טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4p): Aliyá en Israel («Olé») y 1ª Teudat Zehut',
        de: 'טופס אש/456 + מר/14 (Nohal 5.2.0001 — 4S): Alija in Israel („Oleh“) & Erste Teudat Zehut',
        he: 'טופס אש/456 + מר/14 (נוהל 5.2.0001 מאי 2026): שינוי מעמד לעולה בישראל ורישום ת"ז ראשונה'
      },
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
      t: {
        en: 'טופס אש/1 (Ash/1 — 2p): Entry Visa Application & Israeli Inviter Undertaking',
        fr: 'טופס אש/1 (Ash/1 — 2p) : Demande de Visa d\'Entrée & Engagement de l\'Invitant',
        es: 'טופס אש/1 (Ash/1 — 2p): Solicitud de Visa de Entrada y Compromiso del Invitante',
        de: 'טופס אש/1 (Asch/1 — 2S): Antrag auf Einreisevisum & Verpflichtung des Einladers',
        he: 'טופס אש/1 (2 עמ׳): בקשה למתן אשרת כניסה לישראל והתחייבות המזמין'
      },
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
      t: {
        en: 'טופס קורות חיים (11p Security CV — Only When Explicitly Ordered by Clerk)',
        fr: 'טופס קורות חיים (CV Sécurité 11p — Uniquement sur Demande Expresse)',
        es: 'טופס קורות חיים (CV Seguridad 11p — Solo si el Funcionario lo Exige)',
        de: 'טופס קורות חיים (11S Sicherheits-CV — Nur auf Ausdrückliche Anforderung)',
        he: 'טופס קורות חיים לאבחון (11 עמ׳ — למילוי רק במקרה של דרישה מפורשת מהלשכה)'
      },
      fields: [
        'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en', 'pf_pass_num',
        'pf_dob', 'pf_birth_country', 'pf_il_addr_he', 'pf_phone_il', 'pf_cv_details', 'pf_rel_story'
      ]
    }
  };

  var LETTERS = {
    ext45: {
      t: {
        en: '⏳ 25/45-Day Anti-Closure Extension Request (Nohal §ה.7 / §ה.2(8))',
        fr: '⏳ Demande de Prolongation 25/45 Jours Anti-Fermeture (Nohal §ה.7)',
        es: '⏳ Solicitud de Prórroga 25/45 Días Anti-Cierre (Nohal §ה.7)',
        de: '⏳ 25/45-Tage Fristverlängerungsantrag gegen Aktenschließung (§ה.7)',
        he: '⏳ בקשה דחופה להארכת מועד (45 יום) ומניעת סגירת תיק מנהלית'
      }
    },
    utah_refusal: {
      t: {
        en: '⚖️ Clerk Refusal Shield: Demand Written Decision & Branch Manager Review (Utah AAA 7368/22)',
        fr: '⚖️ Bouclier Refus Guichet : Exiger Décision Écrite & Chef d\'Agence (Mariage Utah)',
        es: '⚖️ Escudo Ante Negativa Verbal: Exigir Decisión Escrita y Director (Boda Utah)',
        de: '⚖️ Schalter-Ablehnungsschutz: Schriftlichen Bescheid & Amtsleiter verlangen (Utah-Ehe)',
        he: '⚖️ מגן סירוב בעל-פה: דרישת החלטה מנומקת בכתב והעברה למנהל הלשכה (נישואי יוטה / נוהל 1.6.0001)'
      }
    },
    charigim: {
      t: {
        en: '🕍 Va\'adat Charigim Tourist-to-State-Conversion Petition',
        fr: '🕍 Requête Va\'adat Charigim (Autorisation Conversion d\'État depuis Statut Touriste)',
        es: '🕍 Petición a Va\'adat Jariguim (Conversión Estatal desde Visa de Turista)',
        de: '🕍 Antrag an Va\'adat Charigim (Staatlicher Giur aus Touristenstatus)',
        he: '🕍 בקשה מנומקת לוועדת חריגים — היתר לימודי גיור ממלכתי ממעמד תייר'
      }
    },
    rehab: {
      t: {
        en: '📋 Prior Record Rehabilitation Legal Memo (7 Criteria — Nohal 5.2.0001 §ה.12.ב)',
        fr: '📋 Mémoire de Réhabilitation Casier Judiciaire (7 Critères — Nohal 5.2.0001)',
        es: '📋 Memorial de Rehabilitación de Antecedentes (7 Criterios — Nohal 5.2.0001)',
        de: '📋 Rehabilitations-Schriftsatz Führungszeugnis (7 Kriterien — Nohal 5.2.0001)',
        he: '📋 תזכיר שיקום והיעדר מסוכנות לשלום הציבור (7 אמות המידה בסעיף ה.12.ב)'
      }
    },
    emerg_antisem: {
      t: {
        en: '🚨 Emergency Antisemitism Waiver & Beit Din File Transfer',
        fr: '🚨 Dérogation Humanitaire d\'Urgence Antisémitisme & Transfert Beit Din',
        es: '🚨 Exención Humanitaria de Emergencia por Antisemitismo y Traslado Beit Din',
        de: '🚨 Humanitärer Notfallantrag Antisemitismus & Beit-Din-Aktenübertragung',
        he: '🚨 בקשת חריג הומניטרי דחוף מפאת אנטישמיות והעברת תיק גיור לישראל'
      }
    }
  };

  window.GAT_FORMS_META = { F: F, FORMS: FORMS, UI: UI };

  function lang() { return window.appLang || localStorage.getItem('gat_lang') || 'en'; }
  function ui() { return UI[lang()] || UI.en; }
  function tr(obj) { var l = lang(); return (obj && (obj[l] || obj.en)) || ''; }
  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function loadDraft() { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function loadScans() { try { return JSON.parse(localStorage.getItem(SCANNED_KEY) || '[]') || []; } catch (e) { return []; } }

  window.gatFormsState = loadDraft();
  function val(id, defVal) {
    var d = loadDraft();
    if (d[id] !== undefined && d[id] !== null && d[id] !== '') return d[id];
    if (window.gatFormsState[id] !== undefined && window.gatFormsState[id] !== '') return window.gatFormsState[id];
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

  function renderMasterDossierBar() {
    var box = document.getElementById('pf-master-dossier-bar');
    if (!box) return;
    var c = ui();
    var s = Object.assign({}, loadDraft(), window.gatFormsState || {});
    var sum = computeMasterDossierSummary(s);
    var pills = [];

    var scans = loadScans();
    if (scans.length === 0) {
      pills.push('<span style="background:#f1f5f9;border:1px solid #cbd5e1;color:#475569;padding:4px 9px;border-radius:999px;font-size:0.74rem;font-weight:800;">' + esc(c.noScans) + '</span>');
    } else {
            scans.forEach(function(sc) {
        var sN = norm(sc.fullName);
        if (sN && formFull && sN !== formFull && sN !== formRev && !hasPrior) {
          errors.push(c.errScanVsForm.replace('{doc}', esc(sc.docTitle)).replace('{sn}', esc(sc.fullName)).replace('{fn}', esc((s.pf_given_en || '') + ' ' + (s.pf_surname_en || ''))));
        }
        if (sc.dob && s.pf_dob && sc.dob !== s.pf_dob) {
          errors.push(c.errDobFlip.replace('{doc}', esc(sc.docTitle)).replace('{sd}', esc(sc.dob)).replace('{fd}', esc(s.pf_dob)));
        }
        if (sc.docType === 'birth_cert' && sc.isLongFormBothParents === false) {
          errors.push('🛑 <strong>Short-Form Birth Certificate Detected (' + esc(sc.docTitle) + '):</strong> Missing both parents\' full names! Misrad HaPanim strictly rejects short-form abstracts—you MUST present a Long-Form Vault Birth Certificate listing both Father and Mother.');
        }
        if ((sc.docType === 'birth_cert' || sc.docType === 'police_check' || sc.docType === 'single_status' || sc.docType === 'marriage_cert') && sc.hasApostille === false) {
          warnings.push('⚠️ <strong>No Apostille Visible on `' + esc(sc.docTitle) + '`:</strong> Make sure the original Hague Apostille stamp is attached before your Misrad HaPanim window appointment.');
        }
        if (sc.apostilleAuthorityOk === false) {
          errors.push('🚨 <strong>Wrong Apostille Authority on `' + esc(sc.docTitle) + '`:</strong> Federal police checks (e.g. FBI) require a Federal Department of State Apostille—not a state notary apostille!');
        }
        if (sc.docLang && sc.docLang !== 'hebrew' && !sc.hasRedRibbon && sc.docType !== 'passport' && sc.docType !== 'entry_slip') {
          warnings.push('🎀 <strong>Un-Translated Foreign Certificate (`' + esc(sc.docTitle) + '`):</strong> Clerks routinely refuse non-Hebrew certificates unless accompanied by a Red-Ribbon Israeli Notarial Hebrew Translation.');
        }
      });
    }

    Object.keys(sum.forms).forEach(function(fk) {
      var st = sum.forms[fk];
      if (st.state === 'empty') {
        pills.push('<span onclick="window.gatFormsState.pf_active_form=\'' + fk + '\';window.mountUnifiedPibaFormsEngine();" style="cursor:pointer;background:#fff;border:1px dashed #94a3b8;color:#475569;padding:4px 9px;border-radius:999px;font-size:0.74rem;font-weight:700;">⬜ ' + esc(st.code) + '</span>');
      } else if (st.state === 'verified_hebrew') {
        pills.push('<span onclick="window.gatFormsState.pf_active_form=\'' + fk + '\';window.mountUnifiedPibaFormsEngine();" style="cursor:pointer;background:#dcfce7;border:1.5px solid #059669;color:#065f46;padding:4px 9px;border-radius:999px;font-size:0.74rem;font-weight:900;">✅ ' + esc(st.code) + ' (' + esc(c.hebReady) + ')</span>');
      } else if (st.state === 'needs_hebrew_convert') {
        pills.push('<span onclick="window.gatFormsState.pf_active_form=\'' + fk + '\';window.mountUnifiedPibaFormsEngine();" style="cursor:pointer;background:#fef3c7;border:1.5px solid #d97706;color:#92400e;padding:4px 9px;border-radius:999px;font-size:0.74rem;font-weight:800;">🌐 ' + esc(st.code) + ' (' + esc(c.tapConvert) + ')</span>');
      } else {
        pills.push('<span onclick="window.gatFormsState.pf_active_form=\'' + fk + '\';window.mountUnifiedPibaFormsEngine();" style="cursor:pointer;background:#e0f2fe;border:1px solid #0284c7;color:#0c4a6e;padding:4px 9px;border-radius:999px;font-size:0.74rem;font-weight:800;">📝 ' + esc(st.code) + ' (' + st.pct + '%)</span>');
      }
    });

    box.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + pills.join('') + '</div>';
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
    if (window.gatDb && window.gatUid) {
      window.gatDb.collection('users').doc(window.gatUid).set({
        uid: window.gatUid,
        masterDossier: base._masterDossier,
        scannedDocs: loadScans(),
        updatedAtMs: Date.now()
      }, { merge: true }).catch(function(){});
    }
    return base;
  };

  var origRestore = window.restoreSavedFormDraft;
  window.restoreSavedFormDraft = function(draft) {
    var inc = draft || loadDraft();
    if (inc && typeof inc === 'object') window.gatFormsState = Object.assign({}, window.gatFormsState || {}, inc);
    if (typeof origRestore === 'function') origRestore(window.gatFormsState);
    document.querySelectorAll('.pf-bound-input').forEach(function(el) {
      if (!el.id || !(el.id in window.gatFormsState) || document.activeElement === el) return;
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
            var scans = loadScans();
            scans.unshift({
              ts: new Date().toISOString(),
              docType: r.doc_type || 'certificate',
              docTitle: r.doc_title_detected || r.doc_type || 'Certificate',
              fullName: r.person_full_name || r.detected_full_name || '',
              surnameEn: r.surname_en || '',
              givenEn: r.given_en || '',
              surnameHe: r.surname_he || '',
              givenHe: r.given_he || '',
              priorNames: r.prior_or_maiden_names || '',
              dob: r.date_of_birth || '',
              passportNumber: r.passport_number || '',
              fatherName: r.father_full_name || '',
              motherName: r.mother_full_name || '',
              isLongFormBothParents: r.is_long_form_both_parents !== false,
              hasApostille: r.has_apostille_visible !== false,
              apostilleAuthorityOk: r.apostille_authority_correct !== false,
              docLang: r.document_language || 'english',
              hasRedRibbon: !!r.has_israeli_red_ribbon_notary,
              issueDateIso: r.issue_date_iso || '',
              findings: Array.isArray(r.forensic_findings) ? r.forensic_findings : []
            });
            localStorage.setItem(SCANNED_KEY, JSON.stringify(scans.slice(0, 15)));

            // Auto-populate all matching intake fields (preferring Hebrew for Hebrew-script fields)
            var autoFilled = false;
            var setFieldVal = function(fid, valStr, overwriteExisting) {
              if (!valStr) return;
              var cleanVal = String(valStr).trim();
              if (!cleanVal || cleanVal === 'null' || cleanVal === 'undefined') return;
              var cur = String((window.gatFormsState && window.gatFormsState[fid]) || '').trim();
              if (overwriteExisting || !cur || cur === 'ללא') {
                window.gatFormsState[fid] = cleanVal;
                var el = document.getElementById(fid);
                if (el && document.activeElement !== el) el.value = cleanVal;
                autoFilled = true;
              }
            };

            if (r.surname_en) setFieldVal('pf_surname_en', r.surname_en.toUpperCase());
            if (r.given_en) setFieldVal('pf_given_en', r.given_en.toUpperCase());
            if (r.surname_he) setFieldVal('pf_surname_he', r.surname_he);
            if (r.given_he) setFieldVal('pf_given_he', r.given_he);

            if (!r.surname_en && !r.given_en && r.person_full_name) {
              var np = String(r.person_full_name).trim().split(/\s+/);
              if (np.length >= 2) {
                var isHebName = /[\u0590-\u05FF]/.test(r.person_full_name);
                setFieldVal(isHebName ? 'pf_given_he' : 'pf_given_en', np.slice(0, -1).join(' '));
                setFieldVal(isHebName ? 'pf_surname_he' : 'pf_surname_en', np[np.length - 1]);
              }
            }
            if (r.date_of_birth && /^\d{4}-\d{2}-\d{2}$/.test(r.date_of_birth)) {
              setFieldVal('pf_dob', r.date_of_birth);
            }
            if (r.gender_he && (r.gender_he === 'נקבה' || r.gender_he === 'זכר')) {
              setFieldVal('pf_gender', r.gender_he);
            }
            if (r.marital_he) setFieldVal('pf_marital', r.marital_he);
            if (r.birth_country_city_he) setFieldVal('pf_birth_country', r.birth_country_city_he);
            if (r.citizenship_he) setFieldVal('pf_citizenship', r.citizenship_he);
            if (r.passport_number) setFieldVal('pf_pass_num', r.passport_number.toUpperCase());
            if (r.passport_issue_date && /^\d{4}-\d{2}-\d{2}$/.test(r.passport_issue_date)) {
              setFieldVal('pf_pass_issue_date', r.passport_issue_date);
            }
            if (r.passport_expiry_date && /^\d{4}-\d{2}-\d{2}$/.test(r.passport_expiry_date)) {
              setFieldVal('pf_pass_exp_date', r.passport_expiry_date);
            }
            if (r.father_full_name) setFieldVal('pf_father_he', r.father_full_name);
            if (r.mother_full_name) setFieldVal('pf_mother_he', r.mother_full_name);
            if (r.mother_maiden_name_he) setFieldVal('pf_mother_maiden', r.mother_maiden_name_he);
            if (r.paternal_grandfather_he) setFieldVal('pf_foreign_grandfather', r.paternal_grandfather_he);
            if (r.spouse_full_name_he) setFieldVal('pf_sp_name_he', r.spouse_full_name_he);
            if (r.spouse_tz) setFieldVal('pf_sp_tz', r.spouse_tz);
            if (r.marriage_date_place_he) setFieldVal('pf_marriage_details', r.marriage_date_place_he);
            if (r.entry_date_port_he) setFieldVal('pf_entry_date_port', r.entry_date_port_he);
            if (r.prior_or_maiden_names) setFieldVal('pf_prior_names', r.prior_or_maiden_names);
            if (r.issue_date_iso && /^\d{4}-\d{2}-\d{2}$/.test(r.issue_date_iso) && (r.doc_type === 'police_check' || r.doc_type === 'single_status')) {
              setFieldVal('pf_police_issue_date', r.issue_date_iso);
            }

            if (autoFilled && window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
            renderMasterDossierBar();
            if (typeof window.runPibaForensicCheck === 'function') window.runPibaForensicCheck(false);
          }).catch(function() {});
        }
        return resp;
      });
    };
  }

  window.convertFormAnswersToClerkHebrew = async function(silentIfAlreadyHeb) {
    var c = ui();
    var mode = val('pf_builder_mode', 'forms');
    var fieldList = (mode === 'letters')
      ? ['pf_given_he', 'pf_surname_he', 'pf_sp_name_he', 'pf_rel_story']
      : (FORMS[val('pf_active_form', 'ash3')] || FORMS.ash3).fields;

    var toTranslate = {};
    fieldList.forEach(function(fid) {
      var meta = F[fid];
      if (!meta || meta.script !== 'he' || meta.t === 'select' || meta.t === 'checkbox') return;
      var v = String(val(fid, '')).trim();
      if (v && (!/[\u0590-\u05FF]/.test(v) || /[A-Za-z\u00C0-\u024F\u0400-\u04FF]/.test(v))) {
        toTranslate[fid] = v;
      }
    });

    if (Object.keys(toTranslate).length === 0) {
      if (!silentIfAlreadyHeb && window.showDraftSavedBadge) {
        window.showDraftSavedBadge(c.alreadyHeb, false);
      }
      return true;
    }

    var btn = document.getElementById('pf-btn-ai-heb');
    var origTxt = btn ? btn.innerText : '';
    if (btn) { btn.disabled = true; btn.innerText = c.btnConverting; }

    try {
      var res = await fetch('/api/auditDoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'translate_form_hebrew', fields: toTranslate, lang: lang() })
      });
      var data = await res.json();
      if (!res.ok || !data.ok || !data.result || !data.result.translated) {
        throw new Error((data && data.error) || 'Translation error');
      }
      var map = data.result.translated;
      Object.keys(map).forEach(function(fid) {
        if (!map[fid]) return;
        window.gatFormsState[fid] = map[fid];
        var el = document.getElementById(fid);
        if (el) el.value = map[fid];
      });
      if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
      renderMasterDossierBar();
      return true;
    } catch (err) {
      if (!silentIfAlreadyHeb) alert('AI Hebrew conversion error: ' + (err.message || err));
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
      var hintHtml = meta.h ? '<div style="font-size:11px;color:#475569;margin-top:2px;">💡 ' + esc(tr(meta.h)) + '</div>' : '';
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
      var res = await fetch('/api/auditDoc', {
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
      var res = await fetch('/api/auditDoc', {
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
      if (meta.req && meta.t !== 'checkbox' && !fv) missing.push(tr(meta.l));
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

    // If unlocked and real-PDF stamper is loaded for forms mode, stamp exact Gov.il PDF directly!
    if (unlocked && mode === 'forms' && typeof window.stampOfficialGovPdf === 'function') {
      await window.stampOfficialGovPdf(curForm, s, !!window.stamperCalibrationMode);
      return;
    }

    var branch = val('pf_target_branch', window.PIBA_BRANCHES[0].v);
    var todayHe = new Date().toLocaleDateString('he-IL');

    var htmlOut = '';
    if (mode === 'letters') {
      htmlOut = window.buildStatutoryHebrewLetterHtml();
    } else {
      var fDef = FORMS[curForm] || FORMS.ash3;
      var rows = fDef.fields.map(function(fid) {
        var meta = F[fid];
        if (!meta) return '';
        var rawV = s[fid];
        var disp = meta.t === 'checkbox' ? (rawV ? '☑ מוצהר ומאושר' : '☐ לא סומן') : (meta.t === 'date' ? fmtIsraeliDate(rawV) : (rawV || '—'));
        return '<tr><td style="width:42%;font-weight:700;background:#f8fafc;padding:6px 8px;border:1px solid #cbd5e1;">' + esc(meta.l.he) + '</td>' +
          '<td dir="auto" style="padding:6px 8px;border:1px solid #cbd5e1;font-weight:700;">' + esc(disp) + '</td></tr>';
      }).join('');
      htmlOut = '<div dir="rtl" style="text-align:right;font-family:Arial,sans-serif;color:#0f172a;background:#fff;padding:14px;">' +
        '<div style="display:flex;justify-content:space-between;border-bottom:3px solid #0f172a;padding-bottom:8px;margin-bottom:12px;">' +
          '<div><div style="font-size:17px;font-weight:900;">מדינת ישראל — רשות האוכלוסין וההגירה (' + esc(fDef.code) + ')</div>' +
          '<div style="font-size:13px;color:#0369a1;font-weight:700;">' + esc(fDef.t.he) + '</div></div>' +
          '<div style="font-size:12px;"><strong>לשכה:</strong> ' + esc(branch) + '<br><strong>תאריך:</strong> ' + todayHe + '</div></div>' +
        '<table style="width:100%;border-collapse:collapse;font-size:12.5px;">' + rows + '</table>' +
        '<div style="margin-top:22px;display:flex;justify-content:space-between;border-top:1px solid #334155;padding-top:12px;font-size:12.5px;">' +
          '<div>תאריך: _____________</div><div>חתימת המבקש/ת: _____________________</div><div>חתימת המזמין/בן הזוג: _____________________</div></div></div>';
    }

    var prev = document.getElementById('pf-live-packet-preview');
    if (prev) {
      prev.style.display = 'block';
      if (!unlocked) {
        prev.innerHTML = '<div class="hebrew-out watermarked" style="padding:12px;">' + htmlOut + '</div>' +
          '<button type="button" class="btn btn-gold" style="margin-top:10px;" onclick="openProPaywall(' + JSON.stringify(c.pwPrompt) + ')">' + esc(c.pwBtnUnlock) + '</button>';
        prev.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }
      prev.innerHTML = htmlOut;
    }
    if (!unlocked) { if (window.openProPaywall) window.openProPaywall(c.pwPrompt); return; }
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
      if (el.dataset.pfBound === '1') return;
      el.dataset.pfBound = '1';
      var handler = function() {
        if (!el.id) return;
        window.gatFormsState[el.id] = el.type === 'checkbox' ? !!el.checked : el.value;
        if (el.id === 'pf_demand_date') updateClerkTimerDisplay();
        renderMasterDossierBar();
        if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
      };
      el.addEventListener('blur', handler);
      el.addEventListener('change', handler);
    });
  }

  function renderField(fid) {
    var meta = F[fid];
    if (!meta) return '';
    var v = val(fid, meta.def === true ? true : '');
    var hint = meta.h ? '<div style="font-size:0.74rem;color:#475569;line-height:1.35;">💡 ' + esc(tr(meta.h)) + '</div>' : '';
    if (meta.t === 'checkbox') {
      var chk = (v === true || v === 'true' || (v === '' && meta.def));
      return '<label style="display:flex;align-items:flex-start;gap:9px;font-weight:700;background:#f8fafc;padding:9px 11px;border:1px solid #cbd5e1;border-radius:9px;cursor:pointer;margin-top:6px;">' +
        '<input type="checkbox" class="pf-bound-input" id="' + fid + '" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;"' + (chk ? ' checked' : '') + ' />' +
        '<span style="font-size:0.83rem;line-height:1.45;">' + esc(tr(meta.l)) + '</span></label>';
    }
    var scriptBadge = meta.script === 'he'
      ? '<span style="background:#e0f2fe;color:#0369a1;font-size:0.68rem;padding:1px 6px;border-radius:999px;margin-inline-start:5px;">עברית</span>'
      : (meta.script === 'latin' ? '<span style="background:#f1f5f9;color:#334155;font-size:0.68rem;padding:1px 6px;border-radius:999px;margin-inline-start:5px;">LATIN</span>' : '');
    var html = '<div style="display:flex;flex-direction:column;gap:4px;">' +
      '<label for="' + fid + '" style="margin:0;font-size:0.79rem;font-weight:800;color:#1e293b;">' + esc(tr(meta.l)) + (meta.req ? ' *' : '') + scriptBadge + '</label>';
    if (meta.t === 'select') {
      html += '<select class="pf-bound-input" id="' + fid + '" style="margin:0;">' +
        meta.opts.map(function(o) { return '<option value="' + esc(o.v) + '"' + (String(v) === o.v ? ' selected' : '') + '>' + esc(tr(o)) + '</option>'; }).join('') +
        '</select>';
    } else if (meta.t === 'textarea') {
      html += '<textarea class="pf-bound-input" id="' + fid + '" rows="3" dir="auto" style="margin:0;">' + esc(v) + '</textarea>';
    } else {
      html += '<input type="' + (meta.t === 'date' ? 'date' : 'text') + '" class="pf-bound-input" id="' + fid + '" dir="auto" value="' + esc(v) + '" style="margin:0;" />';
    }
    return html + hint + '</div>';
  }

  function renderBody() {
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
      host.innerHTML = modeTabs +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:10px;margin-bottom:10px;">' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selLetter) + '</label><select id="pf_active_letter" class="pf-bound-input" style="margin:0;" onchange="window.gatFormsState.pf_active_letter=this.value;window.mountUnifiedPibaFormsEngine();">' + lOpts + '</select></div>' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selBranch) + '</label><select id="pf_target_branch" class="pf-bound-input" style="margin:0;">' + brOpts + '</select></div></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;">' +
          renderField('pf_given_he') + renderField('pf_surname_he') + renderField('pf_pass_num') + renderField('pf_sp_name_he') + renderField('pf_sp_tz') +
        '</div>' +
        '<div style="margin-top:10px;">' + renderField('pf_rel_story') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">' +
          '<button type="button" id="pf-btn-ai-heb" class="btn" style="margin:0;flex:1;min-width:190px;background:#0369a1;" onclick="convertFormAnswersToClerkHebrew(false)">' + esc(c.btnAiHeb) + '</button>' +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#0f766e;" onclick="window.stampDemoPersonaPdf()">' + esc(c.calBtn || '🧪 Sample Filled PDF') + '</button>' +
          '<button type="button" class="btn btn-emerald" style="margin:0;flex:1;min-width:190px;" onclick="printOfficialPibaPacket()">' + esc(c.btnPrintFinal) + '</button></div>' +
        '<div id="pf-live-packet-preview" style="margin-top:12px;">' + window.buildStatutoryHebrewLetterHtml() + '</div>';
    } else {
      var curF = val('pf_active_form', 'ash3');
      var fDef = FORMS[curF] || FORMS.ash3;
      var fOpts = Object.keys(FORMS).map(function(k) {
        return '<option value="' + k + '"' + (curF === k ? ' selected' : '') + '>' + esc(tr(FORMS[k].t)) + '</option>';
      }).join('');

      var gridFields = fDef.fields.filter(function(fid) { return F[fid] && F[fid].t !== 'textarea' && F[fid].t !== 'checkbox'; });
      var wideFields = fDef.fields.filter(function(fid) { return F[fid] && (F[fid].t === 'textarea' || F[fid].t === 'checkbox'); });

      host.innerHTML = modeTabs +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:10px;margin-bottom:10px;">' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selForm) + '</label><select id="pf_active_form" class="pf-bound-input" style="margin:0;" onchange="window.gatFormsState.pf_active_form=this.value;window.mountUnifiedPibaFormsEngine();">' + fOpts + '</select></div>' +
          '<div><label style="margin:0 0 4px;font-weight:800;">' + esc(c.selBranch) + '</label><select id="pf_target_branch" class="pf-bound-input" style="margin:0;">' + brOpts + '</select></div></div>' +
        '<div style="background:#f0f9ff;border:2px dashed #0284c7;border-radius:12px;padding:10px 12px;margin-bottom:10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;">' +
          '<div style="flex:1;min-width:210px;"><div style="font-size:0.82rem;font-weight:900;color:#0c4a6e;">' + esc(c.afTitle || '📸 1-Tap Document Auto-Fill') + '</div><div style="font-size:0.74rem;color:#334155;">' + esc(c.afSub || '') + '</div></div>' +
          '<input type="file" id="pf-cert-autofill-inp" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="window.scanCertIntoFormsEngine(this)" />' +
          '<button type="button" class="btn" style="margin:0;padding:10px 14px;font-size:0.8rem;width:auto;background:#0284c7;color:#fff;" onclick="document.getElementById(\'pf-cert-autofill-inp\').click()">' + esc(c.afBtn || '📸 Auto-Fill') + '</button>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px;">' +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#334155;" onclick="printBlankNativeWorksheet()">' + esc(c.btnPrintBlank) + '</button>' +
          '<input type="file" id="pf-ws-scan-inp" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="scanHandwrittenWorksheet(this)" />' +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#0f172a;border:1.5px dashed #38bdf8;color:#38bdf8;" onclick="document.getElementById(\'pf-ws-scan-inp\').click()">' + esc(c.btnScanWs) + '</button>' +
          '<button type="button" id="pf-btn-ai-heb" class="btn" style="margin:0;padding:9px 12px;font-size:0.78rem;width:auto;background:#0369a1;" onclick="convertFormAnswersToClerkHebrew(false)">' + esc(c.btnAiHeb) + '</button>' +
          '<button type="button" id="pf-calib-mode-btn" class="btn" style="margin:0;padding:9px 12px;font-size:0.75rem;width:auto;background:' + (window.stamperCalibrationMode ? '#7c3aed' : '#0f766e') + ';" onclick="window.toggleStamperCalibrationMode()">' + (window.stamperCalibrationMode ? esc(c.calOn || '🎯 Full Calibration') : esc(c.calOff || '👤 Real User Input')) + '</button>' +
          '<button type="button" class="btn" style="margin:0;padding:9px 12px;font-size:0.75rem;width:auto;background:#4f46e5;" onclick="window.stampDemoPersonaPdf()">' + esc(c.calBtn || '🧪 Calibration PDF') + '</button>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:11px;">' + gridFields.map(renderField).join('') + '</div>' +
        '<div style="margin-top:10px;display:flex;flex-direction:column;gap:8px;">' + wideFields.map(renderField).join('') + '</div>' +
        '<div id="pf-forensic-out" style="display:none;margin-top:14px;padding:12px 14px;border-radius:11px;font-size:0.84rem;line-height:1.5;"></div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">' +
          '<button type="button" class="btn" style="margin:0;flex:1;min-width:110px;background:#334155;" onclick="if(window.syncFormDraftIfChanged)window.syncFormDraftIfChanged();if(window.showDraftSavedBadge)window.showDraftSavedBadge();">' + esc(c.btnSave) + '</button>' +
          '<button type="button" class="btn" style="margin:0;flex:2;min-width:190px;background:#0f766e;" onclick="runPibaForensicCheck(false)">' + esc(c.btnAudit) + '</button>' +
          '<button type="button" class="btn btn-emerald" style="margin:0;flex:2;min-width:210px;" onclick="printOfficialPibaPacket()">' + esc(c.btnPrintFinal) + '</button></div>' +
        '<div id="pf-live-packet-preview" style="display:none;margin-top:12px;"></div>' +
        '<div style="margin-top:8px;font-size:0.76rem;color:#475569;text-align:center;font-weight:700;">' + esc(c.autoSaveNote) + '</div>';
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

    renderBody();
    renderMasterDossierBar();
    updateClerkTimerDisplay();
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
      btnAiHeb: '🌐 Перевести Мои Ответы → Официальный Иврит (ИИ)',
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
      pf_surname_he: ['Фамилия (на иврите для МВД)', 'Можно ввести по-русски и нажать «Перевести → Иврит».'],
      pf_surname_en: ['Фамилия — Латиницей точно как в загранпаспорте', 'Должна буква в букву совпадать с машиночитаемой строкой паспорта.'],
      pf_given_he: ['Имя / Имена (на иврите)', 'Укажите второе имя или еврейское имя после гиюра, если оно есть в документах.'],
      pf_given_en: ['Имя / Имена — Латиницей точно как в загранпаспорте', 'Не пропускайте отчество/второе имя, если оно вписано в латинскую строку или свидетельство о рождении!'],
      pf_prior_names: ['Девичья фамилия / Все прежние имена и фамилии (или «ללא»)', 'ВАЖНО (Ловушка 2026): Любая смена фамилии требует апостилированного свидетельства О ПЕРЕМЕНЕ ИМЕНИ и обязана быть вписана в справку о несудимости!'],
      pf_dob: ['Дата рождения', 'Печатается в израильском формате ДД/ММ/ГГГГ.'],
      pf_hebrew_dob: ['Еврейская дата рождения (для анкеты МР/14)', 'Например: כ״ה באייר תשנ״ו (кнопка ИИ переведёт автоматически).'],
      pf_gender: ['Пол', ''],
      pf_marital: ['Семейное положение', ''],
      pf_birth_country: ['Страна и город рождения (на иврите)', 'Должны совпадать со свидетельством о рождении.'],
      pf_citizenship: ['Все текущие гражданства (на иврите)', 'При двойном гражданстве требуется справка о несудимости из каждой страны гражданства.'],
      pf_religion_nat: ['Вероисповедание и Национальность (на иврите)', 'После гиюра / по Закону о возвращении: יהודי / יהודייה.'],
      pf_father_he: ['Полное имя отца (на иврите — как в свидетельстве о рождении)', 'Сверяется напрямую со свидетельством о рождении.'],
      pf_father_dob: ['Дата рождения отца (для анкеты Аш/3)', ''],
      pf_mother_he: ['Полное имя матери (на иврите — как в свидетельстве о рождении)', ''],
      pf_mother_maiden: ['Девичья фамилия матери (Обязательно в Аш/1 и Аш/3)', ''],
      pf_mother_dob: ['Дата рождения матери (для анкеты Аш/3)', ''],
      pf_foreign_grandfather: ['Имя дедушки по отцу (Обязательное поле в Аш/6 и МР/14!)', 'Частое «неожиданное» поле на стр. 2 Аш/6 и в анкете МР/14.'],
      pf_pass_num: ['Номер загранпаспорта', ''],
      pf_pass_issue_date: ['Дата выдачи загранпаспорта', ''],
      pf_pass_exp_date: ['Срок действия загранпаспорта до', 'Минимум 24 мес. для СТУПРО (Аш/6) или 12 мес. для репатриации (Аш/456).'],
      pf_police_issue_date: ['Дата выдачи справки о несудимости и семейном положении (<180 дней!)', 'Строгий срок годности 6 месяцев (180 дней).'],
      pf_countries_over_1yr: ['Все страны проживания >1 года с 14 лет', 'Из каждой указанной страны нужна апостилированная справка о несудимости!'],
      pf_entry_date_port: ['Дата последнего въезда в Израиль, КПП и текущая виза', 'Например: 01/09/2026 • נתב״ג • ב/2'],
      pf_abroad_addr: ['Постоянный адрес за границей (Латиницей: улица, город, страна)', ''],
      pf_il_addr_he: ['Полный адрес в Израиле (на иврите: город, улица, дом, кв., индекс)', 'Должен совпадать с договором аренды и счётом Арноны.'],
      pf_phone_il: ['Мобильный телефон в Израиле', ''],
      pf_email: ['E-mail (Используется МВД для официальных уведомлений и отсчёта сроков!)', 'Отправка письма на этот адрес официально запускает 45/21-дневный таймер!'],
      pf_ash3_action: ['Запрашиваемый срок продления (мес.) и категория визы (на иврите)', ''],
      pf_inst_details: ['Учебное заведение / Ульпан / Ешива, № Амуты и телефон раввина (на иврите)', ''],
      pf_sp_name_he: ['Полное имя израильского супруга / партнёра / приглашающего (на иврите)', ''],
      pf_sp_tz: ['9-значный номер Теудат Зеут супруга/приглашающего (Автопроверка)', ''],
      pf_sp_parents_grand: ['Дата рожд., имя отца, матери и дедушки израильского супруга (Аш/6 стр. 2)', ''],
      pf_marriage_details: ['Дата и место брака (вкл. Юту/за рубежом) и профессия супруга (на иврите)', ''],
      pf_ash6_refs: ['2 израильских поручителя (Аш/6 стр. 3): Имя, ТЗ, кем приходится, адрес и телефон (+ копии ТЗ!)', ''],
      pf_ll_affidavit: ['Декларация арендодателя (Аш/6 стр. 6): Имя и ТЗ владельца, кв.м (מ״ר), этажи, комнаты и оплата счетов', ''],
      pf_456_settlement: ['Стр. 2 Аш/456 + МР/14: Прошлые визиты, закрытие работы за рубежом, банк в Израиле, жильё, община и годы учёбы', ''],
      pf_456_shvut: ['Статья Закона о возвращении (Стр. 3 Аш/456)', ''],
      pf_ash1_consulate: ['Цель въезда и консульство Израиля за рубежом для уведомления (на иврите)', ''],
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
      afTitle: '' + esc(c.afTitle || '📸 1-Tap Document Auto-Fill') + '',
      afSub: '' + esc(c.afSub || '') + '',
      afBtn: '' + esc(c.afBtn || '📸 Auto-Fill') + '',
      calOn: '🎯 Mode: FULL CALIBRATION PROOF (All Checkboxes ON)',
      calOff: '👤 Mode: REAL USER INPUT (Hebrew-First)',
      calBtn: '' + esc(c.calBtn || '🧪 Calibration PDF') + ''
    },
    he: {
      afTitle: '📸 מילוי אוטומטי מהיר מתעודה או דרכון (סריקת AI)',
      afSub: 'העלו דרכון, תעודת לידה, נישואין, תעודת יושר או אשרת כניסה למילוי אוטומטי של הטופס בעברית תקנית:',
      afBtn: '📸 צילום / העלאת תעודה ← מילוי הטופס',
      calOn: '🎯 מצב: בדיקת כיול מלאה (כל המשבצות מסומנות)',
      calOff: '👤 מצב: נתוני מבקש אמיתיים (עברית תקנית)',
      calBtn: '🧪 הפקת PDF בדיקת כיול מלאה'
    },
    fr: {
      afTitle: '📸 Remplissage Auto 1-Clic depuis Vos Actes (IA Vision)',
      afSub: 'Téléversez Passeport, Acte de Naissance, Mariage ou Casier pour pré-remplir le formulaire en hébreu :',
      afBtn: '📸 Scanner un Acte → Pré-remplir',
      calOn: '🎯 Mode : CALIBRAGE COMPLET (Toutes Cases)',
      calOff: '👤 Mode : DONNÉES RÉELLES (Hébreu)',
      calBtn: '🧪 Générer PDF Test Calibrage'
    },
    es: {
      afTitle: '📸 Autocompletado en 1 Clic desde Sus Documentos (IA)',
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
      calOff: '👤 Modus: ECHTE NUTZERDATEN (Hebräisch)',
      calBtn: '🧪 Kalibrierungs-PDF Erstellen'
    },
    ru: {
      afTitle: '📸 Автозаполнение Анкеты по Фото Документа в 1 Клик (ИИ)',
      afSub: 'Загрузите загранпаспорт, свидетельство о рождении, браке или справку о несудимости для автозаполнения на иврите:',
      afBtn: '📸 Сфотографировать Документ → Заполнить Анкету',
      calOn: '🎯 Режим: ПОЛНАЯ КАЛИБРОВКА (Все Поля и Галочки)',
      calOff: '👤 Режим: ДАННЫЕ ЗАЯВИТЕЛЯ (На Иврите)',
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
