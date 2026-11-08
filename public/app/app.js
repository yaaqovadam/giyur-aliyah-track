const CLERK_CLAUSES = [
  { he: ["יושר", "מרשם פלילי", "משטרה"], k: "police", en: "Federal Fingerprint Police Check + Apostille (<180 Days)", fr: "Casier Judiciaire (Bulletin n°3) + Apostille (<180j)", es: "Certificado de Antecedentes Penales + Apostilla (<180d)", de: "Führungszeugnis (BfJ) + BfAA-Apostille (<180T)", he_lbl: "תעודת יושר פדרלית + אפוסטיל (בתוקף 180 יום)" },
  { he: ["לידה"], k: "birth", en: "Long-Form Vault Birth Certificate (Both Parents Named) + Apostille", fr: "Copie Intégrale d'Acte de Naissance + Apostille", es: "Partida Literal de Nacimiento + Apostilla de La Haya", de: "Beglaubigte Abschrift aus dem Geburtenregister + Apostille", he_lbl: "תעודת לידה מורחבת (כולל שמות הורים) + אפוסטיל" },
  { he: ["רווקות", "פנויות", "מצב אישי", "תמצית", "גירושין", "נישואין"], k: "single", en: "Single-Status / Marital History Proof + Apostille (<180 Days)", fr: "Certificat de Célibat / Coutume & Livret de Famille + Apostille", es: "Fe de Soltería / Estado Civil + Apostilla (<180d)", de: "Erweiterte Meldebescheinigung (Ledigkeit) + Apostille", he_lbl: "תמצית רישום / תצהיר רווקות ומעמד אישי + אפוסטיל" },
  { he: ["יהדות", "כתובה", "בית דין", "רב"], k: "rabbi", en: "Orthodox Proof of Judaism (Ishur Yahadut) & Parents' Ketubah / Rabbinic Letters", fr: "Attestation du Consistoire & Ketouba des Parents / Lettres de Rabbin", es: "Certificado de Judaísmo (Ishur Yahadut) y Ketubá de Padres", de: "Ischur Jahadut (ORD/IKG) & Ketubba der Eltern / Rabbinerbriefe", he_lbl: "אישור יהדות מרב אורתודוקסי מוכר וכתובת הורים / מכתבי רב" },
  { he: ["אפוסטיל", "מאומת"], k: "apostille", en: "Mandatory Hague Apostille Stamp on Original Document", fr: "Apostille Officielle (Notaires de France / Autorité Compétente)", es: "Apostilla de La Haya Obligatoria sobre el Original", de: "Offizielle Haager Apostille (BfAA / Landgericht)", he_lbl: "חותמת אפוסטיל רשמית על גבי המסמך המקורי" }
];

window.decodeClerkSheet = function() {
  const lang = window.appLang || 'en';
  const j = (window.JURISDICTION_DATA && window.JURISDICTION_DATA[lang]) || window.JURISDICTION_DATA.en;
  const raw = (document.getElementById('in-clerk-txt').value || '').trim();
  const box = document.getElementById('in-clerk-out');
  box.style.display = 'block';
  if (!raw) {
    box.innerHTML = '⚠️ Paste or type the Hebrew lines from your Misrad HaPanim / Rabbanut sheet above (or click Load Sample).';
    return;
  }
  const hits = CLERK_CLAUSES.filter(c => c.he.some(w => raw.includes(w)));
  const list = (hits.length ? hits : CLERK_CLAUSES).map(c =>
    `<div style="padding:8px 10px;background:#fff;border-left:4px solid #0284c7;border-radius:8px;margin-bottom:8px;">
      <div style="font-weight:900;color:#0c4a6e;">✅ ${c[lang] || c.en}</div>
      <div style="font-size:0.82rem;color:#334155;margin-top:2px;"><strong>${j.flag} Your Exact Homeland Doc:</strong> ${j[c.k]}</div>
    </div>`
  ).join('');
  box.innerHTML = `<div style="font-weight:900;color:#b91c1c;margin-bottom:8px;">🚨 30-Day Administrative File-Closure Timer Active (Drishat Mismachim)</div>${list}<div style="font-size:0.82rem;color:#0f172a;margin-top:6px;">💡 <strong>Next Step:</strong> If any homeland document above will take >21 days to arrive, generate Option #1 (30/60-Day Extension Request) below immediately!</div>`;
};

window.loadSampleClerk = function() {
  document.getElementById('in-clerk-txt').value = 'דרישת מסמכים (נוהל 5.2.0008 / אש/1): נא להמציא תוך 30 יום תעודת לידה מאומתת באפוסטיל, תעודת יושר פדרלית, תמצית רישום רווקות, ואישור יהדות / מכתב רב מלווה. אי השלמת המסמכים במועד תביא לסגירת התיק.';
  window.decodeClerkSheet();
};

window.validateHomelandDossier = function() {
  const days = parseInt(document.getElementById('chk-days').value || '0', 10);
  const c1 = document.getElementById('chk-birth').checked;
  const c2 = document.getElementById('chk-police').checked;
  const c3 = document.getElementById('chk-single').checked;
  const c4 = document.getElementById('chk-family').checked;
  const out = document.getElementById('chk-out');
  out.style.display = 'block';
  const errs = [];
  if (!c1) errs.push('❌ Missing Long-Form Vault Birth Certificate (listing both parents) + Apostille.');
  if (!c2) errs.push('❌ Missing 3-Bucket Federal Fingerprint Police Check (Birth + Citizenship + Lived >1yr since age 14) + Apostille.');
  if (!c3) errs.push('❌ Missing Single-Status / Marital History Proof + Apostille.');
  if (!c4) errs.push('❌ Missing Family/Rabbinic Proof (Orthodox Ishur Yahadut / Parents Ketubah or Sponsoring Rabbi Letters).');
  if (days > 180) errs.push(`🚨 EXPIRED CLOCK (${days} days old): Misrad HaPanim rejects Police Checks & Single-Status docs over 180 days old!`);
  else if (days > 150) errs.push(`⚠️ DANGER ZONE (${180 - days} days left): File your packet immediately before hitting Day 180!`);
  if (errs.length === 0) {
    out.style.background = '#ecfdf5'; out.style.borderColor = '#10b981';
    out.innerHTML = `<div style="font-weight:900;color:#065f46;">🟢 100% CLERK-PROOF DOSSIER (${180 - days} Days Remaining on 180-Day Clock)</div><div style="font-size:0.84rem;color:#047857;margin-top:4px;">All homeland civil, 3-Bucket police, and family/rabbinic requirements verified. Ready to generate your Hebrew Form Ash/1 or Ash/3 below!</div>`;
  } else {
    out.style.background = '#fff1f2'; out.style.borderColor = '#f43f5e';
    out.innerHTML = `<div style="font-weight:900;color:#9f1239;margin-bottom:6px;">🛑 clerk Rejection Risk Detected (${errs.length} Issue${errs.length>1?'s':''}):</div>` + errs.map(e => `<div style="font-size:0.84rem;color:#881337;margin-bottom:4px;">${e}</div>`).join('');
  }
};

const RB_LABELS = {
  en: { lblType: "Letter Type:", opts: ["🕍 Community Synagogue Rabbi (אישור רב קהילה לבית הדין)", "🕯️ Observant Shabbat Host Family (אישור משפחה מארחת / מלווה)", "🚨 Diaspora Beit Din Emergency Transfer & Safety Attestation (אישור העברת תיק בחירום)"], lblRabbi: "Rabbi or Host Family Name & City:", lblMonths: "Months of Attendance & Shabbatot Hosted:" },
  he: { lblType: "סוג מכתב ההמלצה:", opts: ["🕍 רב בית כנסת / קהילה (אישור רב קהילה לבית הדין)", "🕯️ משפחה מלווה / מארחת בשבתות (אישור משפחה מלווה)", "🚨 אישור חירום מבית דין בחו״ל להעברת תיק / קיצור 9 חודשים"], lblRabbi: "שם הרב או המשפחה המארחת והעיר:", lblMonths: "חודשי השתתפות ושבתות אירוח:" },
  fr: { lblType: "Type de Lettre :", opts: ["🕍 Rabbin de Synagogue / Communauté (אישור רב קהילה)", "🕯️ Famille d'Accueil de Chabbat (אישור משפחה מלווה)", "🚨 Attestation d'Urgence Beit Din Diaspora & Transfert (אישור העברת תיק בחירום)"], lblRabbi: "Nom du Rabbin ou de la Famille Hôte & Ville :", lblMonths: "Mois de Présence & Chabbatot Accueillis :" },
  es: { lblType: "Tipo de Carta:", opts: ["🕍 Rabino de Sinagoga / Comunidad (אישור רב קהילה)", "🕯️ Familia Anfitriona de Shabat (אישור משפחה מלווה)", "🚨 Certificado de Emergencia Beit Din Diáspora y Transferencia (אישור העברת תיק בחירום)"], lblRabbi: "Nombre del Rabino o Familia Anfitriona y Ciudad:", lblMonths: "Meses de Asistencia y Shabatot Compartidos:" },
  de: { lblType: "Art des Schreibens:", opts: ["🕍 Gemeindesynagogen-Rabbiner (אישור רב קהילה)", "🕯️ Schabbat-Gastfamilie (אישור משפחה מלווה)", "🚨 Notfall-Bestätigung Auslands-Beit-Din & Aktenübertragung (אישור העברת תיק בחירום)"], lblRabbi: "Name des Rabbiners oder der Gastfamilie & Stadt:", lblMonths: "Monate der Teilnahme & Schabbat-Besuche:" }
};
const APP_UI = {
  en: {
    back: "← Back to Guide",
    tabs: ["📸 Hebrew & Forms", "✍️ Rabbi Letters", "🕍 200 Beit Din Deck", "📱 80 Couples Sync", "🎵 12 Shabbat Songs"],
    m1_h2: "📸 Clerk Letter Translator & Statutory Hebrew Form Builder",
    m1_p: "Select your official Hebrew document below. Your active country's exact police & civil certificate names are automatically mapped into your statutory Hebrew letter:",
    m1_lbl_type: "Select Official Hebrew Document to Generate:",
    m1_opts: [
      "🛡️ 30-Day Anti-Closure Extension Request (בקשת הארכת מועד - מניעת סגירת תיק)",
      "⚖️ Va'adat Charigim Statutory Cover Letter (מכתב הסבר לוועדת חריגים - טופס אש/1)",
      "📜 Past Arrest / Teudat Yosher Rehabilitation Dossier (מכתב הסבר לתעודת יושר)",
      "🚨 Emergency Antisemitism Waiver: 9-Month Rule & Beit Din Transfer (בקשת חירום - אנטישמיות)"
    ],
    m1_name: "Full Name (as on Passport):",
    m1_pass: "Passport Number & Country of Issue:",
    m1_facts: "Key Facts (Your country's police/birth doc names are auto-included):",
    m1_btn: "Generate Print-Ready Statutory Hebrew Document →",
    m2_h2: "✍️ Stamped Rabbinic & Shabbat Host Letterhead Generator",
    m2_p: "Solve the 'You write it in Hebrew, I'll sign it!' bottleneck. Generate formal Hebrew Beit Din recommendation drafts ready to send on WhatsApp:",
    m2_btn: "Generate Hebrew Draft + Copy for WhatsApp →",
    m3_h2: "🕍 200 Beit Din Tribunal (Ma'amad Beit Din) Simulator",
    m3_p: "Tap the card to reveal the exact Halachic answer Dayanim expect to hear:",
    m3_btn: "Next Beit Din Question (200 Core Deck) →",
    m4_h2: "📱 80-Question Misrad HaPanim Separated Couples Interrogation",
    m4_p: "Under Nohal 5.2.0008 / 5.2.0009, clerks separate both partners into two rooms. Drill these high-trap questions together:",
    m4_btn: "Next Couples Interrogation Question →",
    m5_h2: "🎵 12 Mandatory Shabbat Songs, Kiddush & Shema Trainer",
    m5_p: "Every conversion candidate is asked to recite or sing from this core list at the Beit Din table:"
  },
  he: {
    back: "→ חזרה למדריך הראשי",
    tabs: ["📸 מנוע עברית וטפסים", "✍️ מכתבי רב וקהילה", "🕍 200 שאלות בית דין (+200 הרחבה)", "📱 80 שאלות לזוגות", "🎵 12 שירי שבת וברכות"],
    m1_h2: "📸 מחולל מכתבי הסבר משפטיים וטפסי אש/1 ואש/3 בעברית",
    m1_p: "בחרו את המסמך הרשמי להפקה. שמות תעודות היושר והלידה של מדינת המקור שלכם משולבים אוטומטית בנוסח המשפטי:",
    m1_lbl_type: "בחרו מסמך רשמי להפקה:",
    m1_opts: [
      "🛡️ בקשת הארכת מועד של 30/60 יום ומניעת סגירת תיק מנהלית",
      "⚖️ מכתב הסבר מנומק לוועדת חריגים (טופס אש/1 - גיור ממלכתי)",
      "📜 מכתב הסבר ושיקום לתעודת יושר (גילוי נאות מלא)",
      "🚨 בקשת חירום עקב אנטישמיות: פטור מ-9 חודשים / העברת תיק בית דין"
    ],
    m1_name: "שם מלא (כפי שמופיע בדרכון):",
    m1_pass: "מספר דרכון ומדינת הנפקה:",
    m1_facts: "פרטים נוספים לשילוב במכתב:",
    m1_btn: "הפק מסמך משפטי בעברית מוכן להדפסה ←",
    m2_h2: "✍️ מחולל מכתבי המלצה מרב קהילה ומשפחה מארחת",
    m2_p: "הפיקו טיוטה הלכתית רשמית בעברית מוכנה לחתימה וחותמת לשליחה בוואטסאפ לרב הקהילה או למשפחה המלווה:",
    m2_btn: "הפק מכתב המלצה בעברית והעתק לוואטסאפ ←",
    m3_h2: "🕍 סימולטור 150 שאלות מעמד בית דין",
    m3_p: "לחצו על הכרטיסייה כדי לחשוף את התשובה ההלכתית המדויקת שהדיינים מצפים לשמוע:",
    m3_btn: "לשאלה הבאה בבית הדין ←",
    m4_h2: "📱 סימולטור 80 שאלות שימוע זוגי נפרד במשרד הפנים",
    m4_p: "לפי נוהל 5.2.0008 / 5.2.0009, בני הזוג נחקרים בנפרד. תרגלו יחד כדי למנוע סתירות:",
    m4_btn: "לשאלת השימוע הבאה ←",
    m5_h2: "🎵 12 שירי שבת, קידוש וקריאת שמע לבית הדין",
    m5_p: "כל מועמד לגיור מתבקש לדקלם או לשיר מתוך רשימת החובה הזו במעמד בית הדין:"
  },
  fr: {
    back: "← Retour au Guide",
    tabs: ["📸 Hébreu & Ash/1", "✍️ Lettres Rabbin", "🕍 200 Q. Beit Din", "📱 80 Q. Couples", "🎵 12 Chants Shabbat"],
    m1_h2: "📸 Générateur de Lettres Juridiques en Hébreu (Spécial France/BE/CH)",
    m1_p: "Vos documents francophones (Copie Intégrale d'Acte de Naissance, Casier Judiciaire Bulletin n°3, Apostille Cour d'Appel) sont automatiquement intégrés en hébreu :",
    m1_lbl_type: "Choisissez le Document Officiel en Hébreu :",
    m1_opts: [
      "🛡️ Demande de Prolongation de 30/60 Jours (Bloquer la Fermeture du Dossier)",
      "⚖️ Michtav Hesber Juridique pour Va'adat Charigim (Formulaire Ash/1)",
      "📜 Dossier de Réhabilitation Casier Judiciaire Bulletin n°3",
      "🚨 Dérogation d'Urgence Antisémitisme : Règle des 9 Mois & Transfert Beit Din"
    ],
    m1_name: "Nom Complet (comme sur le Passeport) :",
    m1_pass: "Numéro de Passeport & Pays :",
    m1_facts: "Détails (ex: attente d'Apostille sur Bulletin n°3 / Copie Intégrale) :",
    m1_btn: "Générer le Document Officiel en Hébreu Prêt à Imprimer →",
    m2_h2: "✍️ Générateur de Lettres Tamponnées (Rabbin & Famille Hôte)",
    m2_p: "Générez en 1 clic le brouillon officiel en hébreu prêt à envoyer sur WhatsApp à votre rabbin ou famille d'accueil :",
    m2_btn: "Générer en Hébreu + Copier pour WhatsApp →",
    m3_h2: "🕍 Simulateur des 150 Questions du Beit Din",
    m3_p: "Touchez la carte pour révéler la réponse halakhique attendue par les Dayanim :",
    m3_btn: "Question Beit Din Suivante →",
    m4_h2: "📱 Simulateur des 80 Questions Séparées (Misrad HaPanim)",
    m4_p: "Sous la procédure Nohal 5.2.0008, les conjoints sont interrogés dans deux pièces séparées :",
    m4_btn: "Question Couple Suivante →",
    m5_h2: "🎵 Les 12 Chants de Shabbat, Kiddoush & Shema",
    m5_p: "Chants et prières demandés lors de l'audience finale au Beit Din :"
  },
  es: {
    back: "← Volver a la Guía",
    tabs: ["📸 Hebreo y Ash/1", "✍️ Cartas Rabino", "🕍 200 P. Beit Din", "📱 80 P. Parejas", "🎵 12 Cantos Shabat"],
    m1_h2: "📸 Generador de Cartas Legales en Hebreo (España y Latinoamérica)",
    m1_p: "Sus documentos (Partida de Nacimiento Literal, Certificado de Antecedentes Penales / RNR, Apostilla de La Haya) se integran automáticamente en hebreo:",
    m1_lbl_type: "Seleccione el Documento Oficial en Hebreo:",
    m1_opts: [
      "🛡️ Solicitud de Prórroga de 30/60 Días (Frenar Cierre de Expediente)",
      "⚖️ Mijtav Hesber Legal para Va'adat Jariguim (Formulario Ash/1)",
      "📜 Dossier de Rehabilitación de Antecedentes Penales",
      "🚨 Exención de Emergencia por Antisemitismo: Regla de 9 Meses y Transferencia Beit Din"
    ],
    m1_name: "Nombre Completo (según Pasaporte):",
    m1_pass: "Número de Pasaporte y País:",
    m1_facts: "Detalles (ej. esperando Apostilla de La Haya en Antecedentes Penales):",
    m1_btn: "Generar Documento Legal en Hebreo Listo para Imprimir →",
    m2_h2: "✍️ Generador de Cartas Selladas de Rabino y Familia Anfitriona",
    m2_p: "Genere en 1 clic el borrador formal en hebreo listo para enviar por WhatsApp a su rabino o familia:",
    m2_btn: "Generar en Hebreo + Copiar para WhatsApp →",
    m3_h2: "🕍 Simulador de 150 Preguntas del Beit Din",
    m3_p: "Toque la tarjeta para ver la respuesta halájica exacta que esperan los Dayanim:",
    m3_btn: "Siguiente Pregunta del Beit Din →",
    m4_h2: "📱 Simulador de 80 Preguntas en Salas Separadas (Misrad HaPanim)",
    m4_p: "Bajo el Nohal 5.2.0008, los funcionarios interrogan a cada miembro de la pareja por separado:",
    m4_btn: "Siguiente Pregunta de Pareja →",
    m5_h2: "🎵 Los 12 Cantos de Shabat, Kidush y Shemá",
    m5_p: "Cantos y bendiciones requeridos en la entrevista final del Beit Din:"
  },
  de: {
    back: "← Zurück zum Leitfaden",
    tabs: ["📸 Hebräisch & Asch/1", "✍️ Rabbiner-Briefe", "🕍 200 Beit Din Fragen", "📱 80 Paar-Fragen", "🎵 12 Schabbat-Lieder"],
    m1_h2: "📸 Hebräischer Rechtsbrief-Generator (Deutschland / Österreich / Schweiz)",
    m1_p: "Ihre DACH-Dokumente (Beglaubigte Abschrift aus dem Geburtenregister, Erweitertes Führungszeugnis, BfAA-Apostille) werden automatisch auf Hebräisch eingefügt:",
    m1_lbl_type: "Offizielles Hebräisches Dokument Auswählen:",
    m1_opts: [
      "🛡️ 30/60-Tage Fristverlängerungsantrag (Aktenschließung Stoppen)",
      "⚖️ Juristischer Michtav Hesber für Va'adat Charigim (Formular Asch/1)",
      "📜 Rehabilitations-Dossier für das Führungszeugnis",
      "🚨 Notfall-Ausnahme Antisemitismus: 9-Monats-Regel & Beit-Din-Transfer"
    ],
    m1_name: "Vollständiger Name (laut Reisepass):",
    m1_pass: "Reisepassnummer & Ausstellungsland:",
    m1_facts: "Details (z.B. Warten auf BfAA-Apostille für Führungszeugnis):",
    m1_btn: "Druckfertiges Hebräisches Dokument Erstellen →",
    m2_h2: "✍️ Generator für Gestempelte Rabbiner- & Gastfamilienbriefe",
    m2_p: "Erstellen Sie mit 1 Klick den hebräischen Empfehlungsbrief zum Senden per WhatsApp an Ihren Rabbiner:",
    m2_btn: "Hebräischen Entwurf Erstellen & für WhatsApp Kopieren →",
    m3_h2: "🕍 200 Beit Din Fragen Simulator (Ma'amad Beit Din)",
    m3_p: "Tippen Sie auf die Karte, um die halachische Antwort der Dayanim anzuzeigen:",
    m3_btn: "Nächste Beit Din Frage →",
    m4_h2: "📱 80-Fragen Paar-Interview Simulator (Misrad HaPanim)",
    m4_p: "Gemäß Nohal 5.2.0008 werden beide Partner getrennt befragt. Üben Sie gemeinsam:",
    m4_btn: "Nächste Interview-Frage →",
    m5_h2: "🎵 12 Pflicht-Schabbatlieder, Kiddusch & Schema-Trainer",
    m5_p: "Diese Lieder und Segenssprüche werden beim Beit Din abgefragt:"
  }
};

const _GAT_VAULT_D = (s) => (new Function("return " + new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0)))))();
const BD_CARDS = _GAT_VAULT_D("WwogIHtjOiJTaGFiYmF0ICgzOSBNZWxhY2hvdCkiLCBxOiJXaGF0IGRvIHlvdSBkbyBpZiB5b3UgYWNjaWRlbnRhbGx5IGZvcmdldCB0byB0dXJuIG9uIHRoZSBob3Qgd2F0ZXIgdXJuIChNZWljaGFtKSBiZWZvcmUgY2FuZGxlIGxpZ2h0aW5nPyIsIGE6IllvdSBtYXkgTk9UIHR1cm4gaXQgb24gb3IgYXNrIGEgSmV3aXNoIG5laWdoYm9yIHRvIGRvIHNvLiBLZWVwIGNvbGQvcm9vbS10ZW1wZXJhdHVyZSBmb29kICYgZHJpbmtzIHJlYWR5OyB1bmRlciBzcGVjaWZpYyByYWJiaW5pYyBjb25kaXRpb25zIGEgbm9uLUpldyAoQW1pcmEgTGVOb2NocmkpIG1heSBvbmx5IGhlbHAgZm9yIHRoZSBzaWNrIG9yIHNtYWxsIGNoaWxkcmVuLiJ9LAogIHtjOiJLYXNocnV0ICYgS2l0Y2hlbiIsIHE6IklmIGEgZGFpcnkgc3Bvb24gZmFsbHMgaW50byBhIHBvdCBvZiBib2lsaW5nIG1lYXQgc291cCBvbiB0aGUgc3RvdmUsIHdoYXQgaGFwcGVucz8iLCBhOiJXYWl0IDI0IGhvdXJzIGJlZm9yZSB1c2luZyB0aGUgc3Bvb24sIGFuZCBjb25zdWx0IGEgUmFiYmkgaW1tZWRpYXRlbHnigJRpZiB0aGUgc291cCB2b2x1bWUgaXMgNjB4IHRoZSB2b2x1bWUgb2YgdGhlIHNwb29uIChCYXRlbCBCZVNoaXNoaW0pLCB0aGUgc291cCByZW1haW5zIGtvc2hlciwgdGhvdWdoIHRoZSBzcG9vbiByZXF1aXJlcyBIYWcnYWxhaCAoa29zaGVyaW5nIGluIGJvaWxpbmcgd2F0ZXIpLiJ9LAogIHtjOiJUYWhhcmF0IEhhTWlzaHBhY2hhIiwgcToiV2hhdCBhcmUgdGhlIG1pbmltdW0gZGF5cyBiZWZvcmUgYmVnaW5uaW5nIHRoZSA3IENsZWFuIERheXMgKFNoaXZhIE5la2l5aW0pPyIsIGE6IkFjY29yZGluZyB0byBBc2hrZW5hemkgY3VzdG9tLCBhIG1pbmltdW0gb2YgNSBkYXlzIChhbmQgU2VwaGFyZGljIGN1c3RvbSwgNOKAkzUgZGF5cyBkZXBlbmRpbmcgb24gY29tbXVuaXR5IHByYWN0aWNlKSBiZWZvcmUgcGVyZm9ybWluZyB0aGUgSGVmc2VrIFRhaGFyYSBjaGVjayBqdXN0IGJlZm9yZSBzdW5zZXQuIn0sCiAge2M6IlNpbmNlcml0eSAmIElkZW50aXR5IiwgcToiSWYgeW91ciByZWxhdGlvbnNoaXAgZW5kZWQgdG9tb3Jyb3csIG9yIHlvdSBoYWQgdG8gbGl2ZSBvdXRzaWRlIElzcmFlbCwgd291bGQgeW91IHN0aWxsIGNvbXBsZXRlIHlvdXIgY29udmVyc2lvbiBhbmQga2VlcCBTaGFiYmF0ICYgTWl0enZvdD8iLCBhOiJUcmFwIGNoZWNrOiBUaGUgRGF5YW5pbSBtdXN0IGhlYXIgMTAwJSB1bmNvbmRpdGlvbmFsIGNvbW1pdG1lbnQgdG8gSGFzaGVtLCBUb3JhaCwgYW5kIHRoZSBKZXdpc2ggcGVvcGxlIChLYWJiYWxhdCBPbCBNaXR6dm90KeKAlGNvbXBsZXRlbHkgaW5kZXBlbmRlbnQgb2YgYW55IHBhcnRuZXIgb3IgdmlzYS4ifSwKICB7YzoiQnJhY2hvdCAmIERhaWx5IEhhbGFjaGEiLCBxOiJXaGF0IEJyYWNoYSBkbyB5b3UgcmVjaXRlIG9uIHJpY2UgKE9yZXopIHZzLiBxdWlub2EgdnMuIGJyZWFkPyIsIGE6IlJpY2U6IEJvcmVpIE1pbmVpIE1lem9ub3QgKGFmdGVyLWJyYWNoYTogQm9yZWkgTmVmYXNob3QhKS4gUXVpbm9hOiBCb3JlaSBQcmkgSGEnQWRhbWEuIEJyZWFkOiBIYU1vdHppIExlY2hlbSBNaW4gSGEnQXJldHogKGFmdGVyOiBCaXJrYXQgSGFNYXpvbikuIn0sCiAge2M6Ikpld2lzaCBIaXN0b3J5ICYgSG9saWRheXMiLCBxOiJXaHkgZG8gd2UgZmFzdCBvbiB0aGUgMTd0aCBvZiBUYW1tdXogYW5kIHRoZSA5dGggb2YgQXYgKFRpc2hhIEInQXYpPyIsIGE6IjE3dGggb2YgVGFtbXV6IG1hcmtzIHRoZSBicmVhY2hpbmcgb2YgSmVydXNhbGVtJ3Mgd2FsbHMgKGJlZ2lubmluZyB0aGUgVGhyZWUgV2Vla3MgLyBCZWluIEhhTWV0emFyaW0pLCBhbmQgVGlzaGEgQidBdiBtb3VybnMgdGhlIGRlc3RydWN0aW9uIG9mIGJvdGggdGhlIEZpcnN0IGFuZCBTZWNvbmQgVGVtcGxlcy4ifQpd");
const COUPLE_QS = _GAT_VAULT_D("WwogIHtjOiJCZWRyb29tICYgTW9ybmluZyBSb3V0aW5lIiwgcToiV2hpY2ggc2lkZSBvZiB0aGUgYmVkIGRvZXMgZWFjaCBwYXJ0bmVyIHNsZWVwIG9uIChmYWNpbmcgdGhlIGhlYWRib2FyZCksIGFuZCBob3cgbWFueSBwaWxsb3dzIGRvZXMgZWFjaCB1c2U/In0sCiAge2M6IkZpbmFuY2VzICYgQmlsbHMiLCBxOiJXaGljaCBiYW5rIGFjY291bnQgcGF5cyB0aGUgZWxlY3RyaWMgYmlsbCAoQ2hldnJhdCBIYUNoYXNobWFsKSBhbmQgQXJub25hLCBhbmQgd2hhdCB3YXMgdGhlIGFwcHJveGltYXRlIGFtb3VudCBsYXN0IG1vbnRoPyJ9LAogIHtjOiJGYW1pbHkgJiBIb2xpZGF5cyIsIHE6IldoZXJlIGRpZCB5b3Ugc3BlbmQgdGhlIG1vc3QgcmVjZW50IFJvc2ggSGFzaGFuYWggLyBQZXNhY2ggU2VkZXIsIHdobyB3YXMgYXQgdGhlIHRhYmxlLCBhbmQgd2hhdCB3YXMgc2VydmVkPyJ9LAogIHtjOiJEYWlseSBMaWZlICYgS2l0Y2hlbiIsIHE6IldoYXQgY29sb3IgaXMgeW91ciBzaG93ZXIgY3VydGFpbiAvIGJhdGggbWF0LCBhbmQgd2hlcmUgZG8geW91IGtlZXAgdGhlIGxhdW5kcnkgZGV0ZXJnZW50PyJ9LAogIHtjOiJPcmlnaW4gJiBQcm9wb3NhbCIsIHE6IldoYXQgZXhhY3QgZGF0ZSBhbmQgbG9jYXRpb24gZGlkIHlvdSBmaXJzdCBtZWV0IGluIHBlcnNvbiwgYW5kIHdobyBpbnRyb2R1Y2VkIHlvdT8ifQpd");



const SONGS = [
  {t:"Shalom Aleichem (שָׁלוֹם עֲלֵיכֶם)", p:"Shalom Aleichem Malachei HaShareit Malachei Elyon...", m:"Sung Friday night upon returning from Shul before Kiddush (3x per stanza: Shalom Aleichem, Bo'achem LeShalom, Barchuni LeShalom, Tzeitchem LeShalom)."},
  {t:"Eshet Chayil (אֵשֶׁת חַיִל — Proverbs 31)", p:"Eshet Chayil mi yimtza, v'rachok mipninim michrah...", m:"Sung every Friday night after Shalom Aleichem in honor of the woman of the home and the Shabbat Queen."},
  {t:"Kiddush Leil Shabbat (קִדּוּשׁ לֵיל שַׁבָּת)", p:"Yom ha-shishi, vayechulu ha-shamayim veha-aretz...", m:"Recited standing (or sitting per custom) over a full cup of kosher wine (Revi'it) to sanctify Shabbat."},
  {t:"Shema Yisrael & V'Ahavta (שְׁמַע יִשְׂרָאֵל)", p:"Shema Yisrael Hashem Elokeinu Hashem Echad. Baruch Shem Kevod Malchuto Le'olam Va'ed...", m:"Recited every morning and evening; cover eyes with the right hand for the first verse and whisper Baruch Shem Kevod."}
];


const SONGS_I18N = {
  en: SONGS,
  he: [
    {t:"שָׁלוֹם עֲלֵיכֶם (פיוט ליל שבת)", p:"שָׁלוֹם עֲלֵיכֶם מַלְאֲכֵי הַשָּׁרֵת מַלְאֲכֵי עֶלְיוֹן...", m:"שרים בליל שבת עם החזרה מבית הכנסת לפני הקידוש (3 פעמים כל בית: שלום עליכם, בואכם לשלום, ברכוני לשלום, צאתכם לשלום)."},
    {t:"אֵשֶׁת חַיִל (משלי ל״א)", p:"אֵשֶׁת חַיִל מִי יִמְצָא וְרָחֹק מִפְּנִינִים מִכְרָהּ...", m:"נאמר בליל שבת אחרי שלום עליכם לכבוד עקרת הבית ולכבוד שבת המלכה."},
    {t:"קִדּוּשׁ לֵיל שַׁבָּת", p:"יוֹם הַשִּׁשִּׁי, וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ וְכָל צְבָאָם...", m:"נאמר על כוס יין כשר מלאה (רביעית) לקידוש השבת בכניסתה."},
    {t:"שְׁמַע יִשְׂרָאֵל וְאָהַבְתָּ", p:"שְׁמַע יִשְׂרָאֵל ה' אֱלֹהֵינוּ ה' אֶחָד. בָּרוּךְ שֵׁם כְּבוֹד מַלְכוּתוֹ לְעוֹלָם וָעֶד...", m:"נאמר שחרית וערבית; מכסים את העיניים ביד ימין בפסוק הראשון ואומרים בלחש 'ברוך שם כבוד מלכותו'."}
  ],
  fr: [
    {t:"Shalom Aleichem (שָׁלוֹם עֲלֵיכֶם)", p:"Shalom Aleichem Malachei HaShareit Malachei Elyon...", m:"Chanté le vendredi soir au retour de la synagogue avant le Kiddoush (3x par strophe : Shalom Aleichem, Bo'achem LeShalom, Barchuni LeShalom, Tzeitchem LeShalom)."},
    {t:"Eshet Chayil (אֵשֶׁת חַיִל — Proverbes 31)", p:"Eshet Chayil mi yimtza, v'rachok mipninim michrah...", m:"Chanté chaque vendredi soir après Shalom Aleichem en l'honneur de l'épouse et de la Reine Shabbat."},
    {t:"Kiddoush du Vendredi Soir (קִדּוּשׁ לֵיל שַׁבָּת)", p:"Yom ha-shishi, vayechulu ha-shamayim veha-aretz...", m:"Récité sur une coupe pleine de vin casher (Revi'it) pour sanctifier l'entrée du Shabbat."},
    {t:"Shema Yisrael & V'Ahavta (שְׁמַע יִשְׂרָאֵל)", p:"Shema Yisrael Hashem Elokeinu Hashem Echad. Baruch Shem Kevod Malchuto Le'olam Va'ed...", m:"Récité matin et soir en couvrant les yeux de la main droite au premier verset, puis en murmurant Baruch Shem Kevod."}
  ],
  es: [
    {t:"Shalom Aleijem (שָׁלוֹם עֲלֵיכֶם)", p:"Shalom Aleichem Malachei HaShareit Malachei Elyon...", m:"Se canta el viernes por la noche al regresar de la sinagoga antes del Kidush (3 veces por estrofa)."},
    {t:"Eshet Jayil (אֵשֶׁת חַיִל — Proverbios 31)", p:"Eshet Chayil mi yimtza, v'rachok mipninim michrah...", m:"Se canta cada viernes por la noche después de Shalom Aleijem en honor a la mujer del hogar y la Reina de Shabat."},
    {t:"Kidush de Noche de Shabat (קִדּוּשׁ לֵיל שַׁבָּת)", p:"Yom ha-shishi, vayechulu ha-shamayim veha-aretz...", m:"Se recita sobre una copa llena de vino casher (Revi'it) para santificar el Shabat."},
    {t:"Shemá Yisrael y V'Ahavta (שְׁמַע יִשְׂרָאֵל)", p:"Shema Yisrael Hashem Elokeinu Hashem Echad. Baruch Shem Kevod Malchuto Le'olam Va'ed...", m:"Se recita mañana y noche cubriendo los ojos con la mano derecha en el primer versículo y susurrando Baruj Shem Kevod."}
  ],
  de: [
    {t:"Schalom Alejchem (שָׁלוֹם עֲלֵיכֶם)", p:"Shalom Aleichem Malachei HaShareit Malachei Elyon...", m:"Wird am Freitagabend nach der Rückkehr aus der Synagoge vor dem Kiddusch gesungen (3x pro Strophe)."},
    {t:"Eschet Chajil (אֵשֶׁת חַיִל — Sprüche 31)", p:"Eshet Chayil mi yimtza, v'rachok mipninim michrah...", m:"Wird jeden Freitagabend nach Schalom Alejchem zu Ehren der Frau des Hauses und der Schabbat-Königin gesungen."},
    {t:"Kiddusch für Freitagabend (קִדּוּשׁ לֵיל שַׁבָּת)", p:"Yom ha-shishi, vayechulu ha-shamayim veha-aretz...", m:"Wird über einem vollen Becher koscheren Weins (Revi'it) gesprochen, um den Schabbat zu heiligen."},
    {t:"Schema Jisrael & Ve'Ahavta (שְׁמַע יִשְׂרָאֵל)", p:"Shema Yisrael Hashem Elokeinu Hashem Echad. Baruch Shem Kevod Malchuto Le'olam Va'ed...", m:"Morgens und abends gesprochen; beim ersten Vers die Augen mit der rechten Hand bedecken und Baruch Schem Kevod flüstern."}
  ]
};

window.toggleLang = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  let m = document.getElementById('lang-pop-menu');
  if (!m) {
    m = document.createElement('div');
    m.id = 'lang-pop-menu';
    m.style.cssText = 'position:fixed;top:56px;right:12px;background:#0f172a;border:2px solid #38bdf8;border-radius:14px;padding:8px;display:flex;flex-direction:column;gap:6px;z-index:2147483647;box-shadow:0 16px 36px rgba(0,0,0,0.65);direction:ltr;min-width:205px;';
    const opts = [
      ['en', '🇺🇸/🇬🇧 English (US/UK)'],
      ['he', '🇮🇱 עברית (ישראל)'],
      ['fr', '🇫🇷 Français (FR/BE/CH)'],
      ['es', '🇪🇸/🇦🇷 Español (ES/LatAm)'],
      ['de', '🇩🇪/🇦🇹 Deutsch (DACH)']
    ];
    m.innerHTML = opts.map(([k, lbl]) =>
      `<button type="button" onclick="setAppLang('${k}'); document.getElementById('lang-pop-menu').style.display='none';" style="background:#1e293b;color:#fff;border:1px solid #334155;border-radius:10px;padding:10px 12px;font-weight:800;font-size:13.5px;cursor:pointer;text-align:left;display:flex;align-items:center;justify-content:space-between;width:100%;"><span>${lbl}</span><span style="color:#38bdf8;font-size:11px;margin-left:8px;">${k.toUpperCase()}</span></button>`
    ).join('');
    document.body.appendChild(m);
    document.addEventListener('click', function(ev) {
      if (m && !m.contains(ev.target)) m.style.display = 'none';
    });
  } else {
    m.style.display = (m.style.display === 'none') ? 'flex' : 'none';
  }
};

let bdIdx = 0, cpIdx = 0;
window.appLang = localStorage.getItem('gat_lang') || 'en';

function renderAll() {
  const lang = window.appLang || 'en';
  const u = APP_UI[lang] || APP_UI.en;
  const j = (window.JURISDICTION_DATA && window.JURISDICTION_DATA[lang]) || window.JURISDICTION_DATA.en;

  const backEl = document.querySelector('.back-btn');
  if (backEl) backEl.innerText = u.back;

  const tabEls = document.querySelectorAll('.mod-tab:not(.concierge-pill)');
  u.tabs.forEach((lbl, i) => { if (tabEls[i]) tabEls[i].innerText = lbl; });

  const c = document.getElementById('app-container');
  c.innerHTML = `
    <div style="background:#e0f2fe;border:1px solid #38bdf8;border-radius:12px;padding:11px 14px;margin-bottom:14px;font-size:0.83rem;color:#0c4a6e;">
      <strong>${j.flag} ${j.name}:</strong> ${j.police} • ${j.birth}
    </div>

    <div class="mod-view active" id="mod-hebrew-engine">
      <div class="card" style="border:2px solid #0284c7;background:#f0f9ff;">
        <h2>📥 1. "IN" Translator: Decode Clerk Deficiency Sheet (Drishat Mismachim)</h2>
        <p>Handed a mystery Hebrew checklist by a clerk? Paste the Hebrew text below (or load a real sample) to see the exact homeland & family documents required and activate your 30-day file-closure shield:</p>
        <textarea id="in-clerk-txt" rows="3" dir="rtl" placeholder="הדביקו כאן את טקסט דרישת המסמכים בעברית ממשרד הפנים או הרבנות..."></textarea>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn" style="margin-top:0;flex:2;" onclick="decodeClerkSheet()">🔍 Translate Hebrew Clerk Sheet →</button>
          <button class="btn" style="margin-top:0;flex:1;background:#334155;" onclick="loadSampleClerk()">📄 Sample</button>
        </div>
        <div id="in-clerk-out" style="display:none;margin-top:12px;padding:12px;background:#fef2f2;border:1.5px solid #ef4444;border-radius:12px;font-size:0.86rem;"></div>
      </div>

      <div class="card" style="border:2px solid #059669;">
        <h2>🛡️ 2. Homeland & Family Document Completeness Validator</h2>
        <p>Verify your <strong>${j.name}</strong> civil & family dossier before stepping up to the clerk's window:</p>
        <label style="display:flex;align-items:center;gap:8px;font-weight:700;"><input type="checkbox" id="chk-birth" style="width:18px;height:18px;" checked /> ${j.birth}</label>
        <label style="display:flex;align-items:center;gap:8px;font-weight:700;"><input type="checkbox" id="chk-police" style="width:18px;height:18px;" checked /> ${j.police}</label>
        <label style="display:flex;align-items:center;gap:8px;font-weight:700;"><input type="checkbox" id="chk-single" style="width:18px;height:18px;" checked /> ${j.single}</label>
        <label style="display:flex;align-items:center;gap:8px;font-weight:700;"><input type="checkbox" id="chk-family" style="width:18px;height:18px;" checked /> ${j.rabbi}</label>
        <label>Days Since Police Check & Single-Status Were Issued (Max 180 Days):</label>
        <input type="number" id="chk-days" value="32" min="0" max="365" />
        <button class="btn btn-emerald" onclick="validateHomelandDossier()">✅ Audit My Homeland & Family Dossier →</button>
        <div id="chk-out" style="display:none;margin-top:12px;padding:12px;border:2px solid #10b981;border-radius:12px;"></div>
      </div>

      <div class="card">
        <h2>📤 3. "OUT" Auto-Filler: ${u.m1_h2}</h2>
        <p>${u.m1_p}</p>
        <label>${u.m1_lbl_type}</label>
        <select id="he-doc-type">
          <option value="ext30">${u.m1_opts[0]}</option>
          <option value="ash1">${u.m1_opts[1]}</option>
          <option value="rehab">${u.m1_opts[2]}</option>
          <option value="emerg">${u.m1_opts[3]}</option>
        </select>
        <label>${u.m1_name}</label>
        <input id="he-name" placeholder="Avraham Levi / Marie Laurent / Lukas Müller" />
        <label>${u.m1_pass}</label>
        <input id="he-pass" placeholder="${j.flag} Passport #..." />
        <label>${u.m1_facts}</label>
        <textarea id="he-facts" rows="3" placeholder="${j.police} + ${j.birth} (${j.apostille})"></textarea>
        <button class="btn" onclick="genHebrewDoc()">${u.m1_btn}</button>
        <div class="hebrew-out" id="he-output"></div>
      </div>
    </div>

    <div class="mod-view" id="mod-rabbi-letters">
      <div class="card">
        <h2>${u.m2_h2}</h2>
        <p>${u.m2_p}</p>
        <label>${(RB_LABELS[lang]||RB_LABELS.en).lblType}</label>
        <select id="rb-type">
          <option value="rabbi">${(RB_LABELS[lang]||RB_LABELS.en).opts[0]}</option>
          <option value="host">${(RB_LABELS[lang]||RB_LABELS.en).opts[1]}</option>
          <option value="transfer">${(RB_LABELS[lang]||RB_LABELS.en).opts[2]}</option>
        </select>
        <label>${u.m1_name}</label>
        <input id="rb-cand" placeholder="Sarah (Ruth) Miller - Passport #..." />
        <label>${(RB_LABELS[lang]||RB_LABELS.en).lblRabbi}</label>
        <input id="rb-rabbi" placeholder="HaRav Yitzchak Levy - Jerusalem / Safed" />
        <label>${(RB_LABELS[lang]||RB_LABELS.en).lblMonths}</label>
        <input id="rb-months" placeholder="9 months (Weekly Shabbat Tefillah & Shiurim)" />
        <button class="btn btn-emerald" onclick="genRabbiLetter()">${u.m2_btn}</button>
        <div class="hebrew-out" id="rb-output"></div>
      </div>
    </div>

    <div class="mod-view" id="mod-beit-din-150">
      <div class="card">
        <h2>${u.m3_h2}</h2>
        <p>${u.m3_p}</p>
        <div class="flashcard" onclick="flipBdCard()">
          <div class="fc-cat" id="bd-cat"></div>
          <div class="fc-q" id="bd-q"></div>
          <div class="fc-a" id="bd-a"></div>
        </div>
        <button class="btn" onclick="nextBdCard()">${u.m3_btn}</button>
      </div>
    </div>

    <div class="mod-view" id="mod-couples-sync">
      <div class="card">
        <h2>${u.m4_h2}</h2>
        <p>${u.m4_p}</p>
        <div id="cp-room-bar" style="display:flex;justify-content:space-between;align-items:center;gap:8px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:8px 12px;margin-bottom:10px;font-size:0.8rem;font-weight:800;color:#065f46;flex-wrap:wrap;"></div>
        <div id="cp-cat-bar" style="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:10px;"></div>
        <div class="flashcard" style="background:linear-gradient(135deg,#0c4a6e,#0369a1);">
          <div class="fc-cat" id="cp-cat"></div>
          <div class="fc-q" id="cp-q"></div>
          <div id="cp-tip" style="margin-top:12px;padding:8px 10px;background:rgba(255,255,255,0.12);border-left:3px solid #38bdf8;border-radius:6px;font-size:0.8rem;color:#e0f2fe;"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
          <input id="cp-ans-a" placeholder="Partner A Answer (Room 1)..." oninput="saveCpAns()" style="margin:0;" />
          <input id="cp-ans-b" placeholder="Partner B Answer (Room 2)..." oninput="saveCpAns()" style="margin:0;" />
        </div>
        <div id="cp-match-out" style="margin-top:8px;padding:8px 12px;border-radius:8px;font-size:0.82rem;font-weight:800;display:none;"></div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button type="button" class="btn" style="margin-top:0;flex:1;background:#334155;" onclick="prevCpCard()">←</button>
          <button type="button" class="btn btn-emerald" style="margin-top:0;flex:4;" onclick="nextCpCard()">${u.m4_btn}</button>
        </div>
      </div>
    </div>

    <div class="mod-view" id="mod-songs-prayers">
      <div class="card">
        <h2>${u.m5_h2}</h2>
        <p>${u.m5_p}</p>
        <div id="songs-list"></div>
      </div>
    </div>
  `;
  updateBdCard();
  updateCpCard();
  window.renderSongs12();
}

function openMod(m) {
  if (m === 'songs-prayers' && typeof window.renderSongs12 === 'function') window.renderSongs12();
  if (m === 'beit-din-150' && typeof updateBdCard === 'function') updateBdCard();
  if (m === 'couples-sync' && typeof updateCpCard === 'function') updateCpCard();
  window.currentMod = m;
  document.querySelectorAll('.mod-tab').forEach(b => b.classList.toggle('active', b.dataset.mod === m));
  document.querySelectorAll('.mod-view').forEach(v => v.classList.toggle('active', v.id === 'mod-' + m));
}

function genHebrewDoc() {
  const lang = window.appLang || 'en';
  const j = (window.JURISDICTION_DATA && window.JURISDICTION_DATA[lang]) || window.JURISDICTION_DATA.en;
  const t = document.getElementById('he-doc-type').value;
  const n = document.getElementById('he-name').value || '[שם מלא / Full Name]';
  const p = document.getElementById('he-pass').value || '[מספר דרכון / Passport #]';
  const f = document.getElementById('he-facts').value || `${j.police} + ${j.birth} (${j.apostille})`;
  const today = new Date().toLocaleDateString('he-IL');
  let txt = '';
  if (t === 'ext30') {
    txt = `לכבוד: רשות האוכלוסין וההגירה - משרד הפנים\nתאריך: ${today}\nהנדון: בקשה דחופה להארכת מועד להשלמת מסמכים ומניעת סגירת תיק מנהלית\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nבהמשך לדרישת המסמכים שנמסרה לי, הריני לעדכן כי פעלתי באופן מיידי להזמנת מלוא תעודות המקור המאומתות בחותמת אפוסטיל מרשויות המדינה בחו"ל (${f}).\nמאחר שזמני הטיפול הרשמיים ברשויות הפדרליות בחו"ל אורכים מעבר ל-30 ימים, אבקשכם להאריך את המועד להגשת המסמכים ב-60 ימים נוספים ולהימנע מסגירת התיק.\n\nבכבוד רב,\n${n}`;
  } else if (t === 'ash1') {
    txt = `לכבוד: ועדת חריגים - מערך הגיור הממלכתי ומשרד הפנים (טופס אש/1)\nתאריך: ${today}\nהנדון: מכתב הסבר מנומק לבקשת היתר גיור ממלכתי בישראל\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nהריני להגיש בקשה כנה ומנומקת להצטרפות להליך גיור ממלכתי בישראל. הקשר שלי לעם היהודי, לתורת ישראל ולשמירת מצוות התגבש מתוך הכרה פנימית עמוקה. כלל מסמכי המקור המאומתים באפוסטיל (${f}) מצורפים בזאת.\nברשותי מקורות מחייה עצמאיים מלאים מחו"ל, קהילה אורתודוקסית מלווה ורב מלווה מוכר. אבקשכם לאשר את זימוני לריאיון בוועדת החריגים.\n\nבכבוד רב,\n${n}`;
  } else if (t === 'emerg') {
    txt = `לכבוד: ועדת חריגים - משרד הפנים / מחלקת אשרות ומעמד / מערך הגיור (טופס אש/1)
תאריך: ${today}
הנדון: בקשת חירום הומניטרית לקיצור תקופת 9 החודשים בקהילה / העברת תיק גיור מחו"ל עקב החרפת האנטישמיות
שם המבקש/ת: ${n} | מס' דרכון: ${p}

שלום רב,
הריני לפנות אליכם בבקשה דחופה לאישור מעמד / המשך הליך בישראל מטעמים הומניטריים וביטחוניים כבדי משקל, לנוכח החרפה חמורה באירועי האנטישמיות והאיומים הביטחוניים כלפי הקהילה היהודית בארץ מוצאי.
כלל מסמכי המקור המאומתים בחותמת אפוסטיל (${f}) וכן מכתב האישור וההעברה הרשמי מבית הדין / רב הקהילה בחו"ל מצורפים בזאת. אבקשכם לאשר באופן חריג פטור מהשלמת מניין 9 החודשים בחו"ל ו/או קליטת תיק הגיור ומתן אשרת שהייה חוקית בישראל.

בכבוד רב,
${n}`;
  } else {
    txt = `לכבוד: רשות האוכלוסין וההגירה - משרד הפנים / הסוכנות היהודית\nתאריך: ${today}\nהנדון: הצהרת גילוי נאות ומכתב הסבר בנוגע לתעודת היושר (שיקום מלא)\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nמתוך חובת תום הלב והגילוי הנאות המלא בהגשת תעודת היושר (${f}), ברצוני להבהיר מראש פרט המופיע במרשם. מדובר באירוע יחיד מהעבר הרחוק אשר הסתיים במלואו ללא כל הרשעה חוזרת. מאז ועד היום אני מנהל/ת אורח חיים נורמטיבי ושומר חוק לחלוטין.\n\nבכבוד רב,\n${n}`;
  }
  const headerForm = (t === 'ash1' || t === 'emerg')
    ? `[טופס אש/1 מובנה - בקשה למתן אשרה / ועדת חריגים | שם: ${n} | דרכון: ${p} | מסמכי מקור מאומתים: ${f}]\n--------------------------------------------------\n`
    : `[טופס אש/3 / נוהל 5.2.0008 מובנה - רשות האוכלוסין וההגירה | שם: ${n} | דרכון: ${p} | ארץ מוצא ומסמכים: ${f}]\n--------------------------------------------------\n`;
  const out = document.getElementById('he-output');
  out.style.display = 'block';
  out.innerText = headerForm + txt;
  if (navigator.clipboard) navigator.clipboard.writeText(headerForm + txt);
}

function genRabbiLetter() {
  const tp = document.getElementById('rb-type').value;
  const cand = document.getElementById('rb-cand').value || '[שם המועמד/ת]';
  const rb = document.getElementById('rb-rabbi').value || '[שם הרב / המשפחה המארחת]';
  const m = document.getElementById('rb-months').value || '9 חודשים';
  const today = new Date().toLocaleDateString('he-IL');
  const txt = (tp === 'transfer')
    ? `בס"ד | תאריך: ${today}\nלכבוד: הרבנות הראשית לישראל / בית הדין המיוחד לגיור / משרד הפנים - ועדת חריגים\nהנדון: אישור חירום להעברת תיק גיור / קיצור תקופת 9 חודשי קהילה עבור ${cand}\n\nהנני לאשר בחתימתי ובחותמת בית הדין / הקהילה כי ${cand} למד/ה והשתתף/ה באופן פעיל ורצוף בקהילתנו האורתודוקסית מזה כ-${m}, תוך הקפדה מלאה על שמירת שבת, כשרות ותפילה.\nבשל החרפת האנטישמיות והמצב הביטחוני באזורנו, נאלץ/ה המועמד/ת לצאת לישראל בדחיפות. אנו מאשרים את כנות ההליך במלואו ומבקשים מכבוד בית הדין ומשרד הפנים לקלוט את התיק ולאשר הקלה הומניטרית בדרישת השהייה בחו"ל.\n\nבברכת התורה,\n${rb}\nחתימה וחותמת רשמית: _______________`
    : (tp === 'rabbi')
    ? `בס"ד | תאריך: ${today}\nלכבוד: בית הדין המיוחד לגיור / הרבנות הראשית לישראל\nהנדון: המלצת רב קהילה עבור ${cand}\n\nהנני לאשר ולהמליץ בחום כי ${cand} מתפלל/ת ומשתתף/ת באופן קבוע בקהילתנו מזה כ-${m}.\nלאורך כל התקופה ניכרת הקפדה מלאה וכנה על שמירת שבת, כשרות, תפילה במניין ולימוד הלכה בעין יפה ומתוך יראת שמיים טהורה. להערכתי המלאה מדובר במועמד/ת ראוי/ה ביותר לבוא בקהל ישראל.\n\nבברכת התורה,\n${rb}\nחתימה וחותמת: _______________`
    : `בס"ד | תאריך: ${today}\nלכבוד: בית הדין המיוחד לגיור\nהנדון: אישור והמלצת משפחה מלווה / מארחת עבור ${cand}\n\nאנו שמחים לאשר כי אנו מלווים ומארחים את ${cand} בביתנו בשבתות ובמועדי ישראל מזה כ-${m}.\nזכינו לראות מקרוב התנהלות הלכתית מוקפדת, ידיעת הלכות שבת וברכות, ושמחה אמיתית בקיום המצוות.\n\nבברכה,\nמשפחת ${rb}\nטלפון וכתובת: _______________`;
  const out = document.getElementById('rb-output');
  out.style.display = 'block';
  out.innerText = txt;
  if (navigator.clipboard) navigator.clipboard.writeText(txt);
}

function updateBdCard() {
  const item = BD_CARDS[bdIdx % BD_CARDS.length];
  document.getElementById('bd-cat').innerText = item.c;
  document.getElementById('bd-q').innerText = item.q;
  const a = document.getElementById('bd-a');
  a.style.display = 'none';
  a.innerText = '✅ ' + item.a;
}
function flipBdCard() {
  const a = document.getElementById('bd-a');
  a.style.display = (a.style.display === 'block') ? 'none' : 'block';
}
function nextBdCard() { bdIdx++; updateBdCard(); }

function updateCpCard() {
  const item = COUPLE_QS[cpIdx % COUPLE_QS.length];
  document.getElementById('cp-cat').innerText = 'Nohal 5.2.0008 • ' + item.c;
  document.getElementById('cp-q').innerText = item.q;
}
function nextCpCard() { cpIdx++; updateCpCard(); }

function setAppLang(lang, btn) {
  window.appLang = lang;
  localStorage.setItem('gat_lang', lang);
  document.querySelectorAll('.lang-pill').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === (lang === 'he' ? 'עב' : lang));
  });
  document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
  const gl = document.getElementById('globe-lang-lbl');
  const badge = {en:'EN', he:'HE', fr:'FR', es:'ES', de:'DE'};
  if (gl) gl.textContent = badge[lang] || 'EN';
  const activeMod = window.currentMod || 'hebrew-engine';
  renderAll();
  openMod(activeMod);
}




// ============================================================================
// STEP 2 & STEP 3: VETTED CONCIERGE / NOTARY INTAKE + PRO PAYWALL GATE
// ============================================================================

window.LEMON_CHECKOUT_URLS = {
  single_39: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=single_39",
  monthly_29: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=monthly_29",
  lifetime_199: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=lifetime_199",
  vip_449: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=vip_449"
};

// Direct WhatsApp Concierge Dispatch Number (Receives client intake leads)
window.CONCIERGE_WHATSAPP = "972559664357";
window.CONCIERGE_EMAIL = "concierge@giyuraliyahtrack.com";

window.isProUnlocked = function() {
  return localStorage.getItem('gat_pro_unlocked') === '1';
};

window.openProPaywall = function(reasonText) {
  const modal = document.getElementById('pro-paywall-modal');
  const rEl = document.getElementById('pw-reason');
  if (rEl && reasonText) rEl.innerText = reasonText;
  if (modal) modal.classList.add('open');
};

window.closeProPaywall = function() {
  const modal = document.getElementById('pro-paywall-modal');
  if (modal) modal.classList.remove('open');
};

window.redeemProCode = function() {
  const inp = document.getElementById('pro-code-input');
  const msg = document.getElementById('pro-code-msg');
  const code = (inp ? inp.value : '').trim().toUpperCase();
  if (msg) msg.style.display = 'block';
  if (['PRO2026', 'SHALIACH770', 'SAFED2026', 'VIP2026'].includes(code)) {
    localStorage.setItem('gat_pro_unlocked', '1');
    if (msg) {
      msg.style.color = '#059669';
      msg.innerText = '✅ Pro Shield Unlocked! All 150/80 decks and watermark-free Hebrew PDFs are now active.';
    }
    document.querySelectorAll('.hebrew-out').forEach(el => el.classList.remove('watermarked'));
    setTimeout(() => { window.closeProPaywall(); renderAll(); openMod(window.currentMod || 'hebrew-engine'); }, 900);
  } else {
    if (msg) {
      msg.style.color = '#e11d48';
      msg.innerText = '❌ Invalid code. Choose a pass above or enter a valid VIP code.';
    }
  }
};

window.startCheckout = function(tierKey) {
  const url = window.LEMON_CHECKOUT_URLS[tierKey];
  try { localStorage.setItem('gat_pending_tier', tierKey); } catch(e){}
  window.open(url, '_blank', 'noopener,noreferrer');
};

const VETTED_I18N = {
  en: {
    pill: "🤝 Vetted Team, Notary & Lawyer",
    h2: "Book Our Vetted Team: Sponsoring Rabbi, Madrichat Kallah, Red-Ribbon Notary & 1-Hr Lawyer Escort",
    lead: "Skip the 25,000 NIS law firm retainer. Select your service below—we route Nationwide Remote Red-Ribbon Notary translations and 1-Hour Misrad HaPanim Escorts directly to our licensed Partner Notary & Legal Desk, and match you with our Rabbanut-recognized Sponsoring Rabbis & Madrichot Kallah:",
    svc_lbl: "1. Select Service Needed (Tap One):",
    svcs: [
      { t: "🕍 Both: Vetted Sponsoring Rabbi (Rav Melaveh) + Certified Madrichat Kallah", s: "Complete couple's package plugged into the Beit Din & Rabbanut (1-on-1 & Zoom friendly).", p: "$349 Couple's Package (Save $49)" },
      { t: "📜 Vetted, Rabbanut-Recognized Sponsoring Rabbi (Rav Melaveh)", s: "Official conversion study & stamped Beit Din recommendation letter for singles or couples.", p: "$249 Placement & Beit Din Dossier Setup" },
      { t: "🕯️ Vetted, Rabbanut-Certified Madrichat Kallah (Taharat HaMishpacha)", s: "Mandatory certification required by the Beit Din & Rabbanut marriage registrar.", p: "$149 Placement & Official Certification Track" },
      { t: "🎀 Red-Ribbon Certified Notarial Translation & Affidavit Stamp (Remote Nationwide)", s: "Official Hebrew notarial translation (Birth Certificate, Police Check, Divorce/Single Status) + Lawyer-Stamped Joint Affidavits.", p: "$149–$249 / doc • Done Remotely in 24–48h" },
      { t: "⚖️ 1-Hour 'Day-Of Appointment' Lawyer Escort at Misrad HaPanim", s: "A licensed Israeli lawyer walks into your Misrad HaPanim appointment with you for 1 hour so clerks treat you with respect and open your file on the spot.", p: "$499–$699 (vs. 25,000₪ Retainer)" }
    ],
    reg_lbl: "2. Your Misrad HaPanim / Beit Din Region:",
    regs: [
      "🏔️ North / Galilee / Haifa (Safed, Tiberias, Karmiel, Nahariya, Haifa, Afula)",
      "🏛️ Jerusalem & Gush Etzion",
      "🏙️ Tel Aviv & Center (Tel Aviv, Ramat Gan, Petah Tikva, Netanya, Herzliya, Rehovot)",
      "🌴 South (Ashdod, Be'er Sheva, Ashkelon)",
      "✈️ Currently Abroad (Pre-Flight Go-Bag / Remote Red-Ribbon Notary Only)"
    ],
    trk_lbl: "3. Your Current Track:",
    trks: [
      "Track 1: Emergency Relocation / In-Israel Aliyah (Shinui Ma'amad)",
      "Track 2: Private Orthodox Beit Din (Gush Etzion / Bnei Brak) + Ishur Giyur",
      "Track 3: State Conversion (Nativ) via Exceptions Committee (Va'adat Charigim Ash/1)",
      "Track 4: Misrad HaPanim Spousal / Partner Visa (Nohal 5.2.0008 / 5.2.0009 Ash/3)",
      "Dual-Track: Need Both Rabbanut Validation + Misrad HaPanim Spousal Visa"
    ],
    name_lbl: "4. Your Full Name (and Partner's Name if applying as a couple):",
    wa_lbl: "5. Your WhatsApp Number (with Country Code, e.g. +1 / +972 / +33):",
    date_lbl: "6. Target Appointment Date or Urgency (Optional):",
    notes_lbl: "7. Documents to Translate or Brief Situation Summary:",
    btn_wa: "💬 Lock In My Booking via WhatsApp Now →",
    btn_em: "✉️ Or Submit via Email",
    ok_msg: "✅ Request prepared! Your priority booking has been logged and opened in WhatsApp."
  },
  he: {
    pill: "🤝 רב מלווה, נוטריון ועו״ד",
    h2: "תיאום מהיר: רב מלווה, מדריכת כלה, תרגום נוטריוני (סרט אדום) וליווי עו״ד לשעה",
    lead: "חסכו ריטיינר של 25,000 ₪ למשרדי עו״ד. בחרו את השירות הנדרש — תרגומים נוטריוניים מרחוק בכל הארץ, ליווי עו״ד לשעה בלשכת משרד הפנים, וחיבור ישיר לצוות הרבנים המלווים ומדריכות הכלה המוכרים שלנו:",
    svc_lbl: "1. בחרו את השירות המבוקש:",
    svcs: [
      { t: "🕍 חבילה זוגית: רב מלווה מוכר + מדריכת כלה מוסמכת רבנות", s: "ליווי מלא לזוגות המוכר בבית הדין וברבנות (גמישות ב-1-על-1 ומרחוק).", p: "$349 חבילה זוגית מלאה (חיסכון $49)" },
      { t: "📜 רב מלווה מוכר על ידי הרבנות הראשית", s: "לימודי גיור רשמיים ומכתב המלצה חתום לבית הדין ליחידים או לזוגות.", p: "$249 שיבוץ ופתיחת תיק ליווי לבית הדין" },
      { t: "🕯️ מדריכת כלה מוסמכת רבנות (טהרת המשפחה)", s: "אישור הדרכת כלה רשמי הנדרש בבית הדין וברישום נישואין ברבנות.", p: "$149 שיבוץ ומסלול הסמכה רשמי לרבנות" },
      { t: "🎀 תרגום נוטריוני מוסמך (סרט אדום) ואימות תצהיר עו״ד (מרחוק בכל הארץ)", s: "תרגום נוטריוני לעברית (תעודת לידה, תעודת יושר, רווקות/גירושין) ואימות תצהיר זוגי ע״י עו״ד ונוטריון.", p: "$149–$249 למסמך • תוך 24–48 שעות" },
      { t: "⚖️ ליווי עורך דין לשעה אחת בלבד בלשכת משרד הפנים", s: "עורך דין ישראלי נכנס איתכם לפגישה לשעה אחת כדי שהפקידים יתייחסו אליכם בכבוד ויפתחו את התיק במקום.", p: "$499–$699 (במקום 25,000₪ ריטיינר)" }
    ],
    reg_lbl: "2. אזור לשכת משרד הפנים / בית הדין:",
    regs: [
      "🏔️ צפון / גליל / חיפה (צפת, טבריה, כרמיאל, נהריה, חיפה, עפולה)",
      "🏛️ ירושלים וגוש עציון",
      "🏙️ תל אביב והמרכז (ת״א, רמת גן, פתח תקווה, נתניה, הרצליה, רחובות)",
      "🌴 דרום (אשדוד, באר שבע, אשקלון)",
      "✈️ נמצאים כעת בחו״ל (תיק חירום לטיסה / תרגום נוטריוני מרחוק)"
    ],
    trk_lbl: "3. המסלול שלכם:",
    trks: [
      "מסלול 1: עליית חירום / שינוי מעמד מתוך ישראל",
      "מסלול 2: בית דין אורתודוקסי פרטי (גוש עציון / בני ברק) + אישור גיור",
      "מסלול 3: גיור ממלכתי (נתיב) דרך ועדת חריגים (טופס אש/1)",
      "מסלול 4: הליך מדורג זוגי במשרד הפנים (נוהל 5.2.0008 / 5.2.0009 טופס אש/3)",
      "מסלול כפול: רבנות + משרד הפנים (הליך מדורג)"
    ],
    name_lbl: "4. שם מלא (ושם בן/בת הזוג):",
    wa_lbl: "5. מספר וואטסאפ ליצירת קשר מהירה:",
    date_lbl: "6. תאריך התור הקרוב או רמת דחיפות:",
    notes_lbl: "7. אילו מסמכים נדרשים לתרגום או פירוט קצר:",
    btn_wa: "💬 שלחו בקשת תיאום מיידית בוואטסאפ ←",
    btn_em: "✉️ או שלחו באימייל",
    ok_msg: "✅ הפנייה נשמרה ונפתחה בוואטסאפ לטיפול מהיר!"
  },
  fr: {
    pill: "🤝 Rabbin, Notaire & Avocat",
    h2: "Réserver Notre Équipe : Rabbin, Madrichat Kallah, Traduction Notariée (Ruban Rouge) & Avocat 1h",
    lead: "Évitez les forfaits d'avocats à 25 000 ₪. Sélectionnez votre besoin ci-dessous — traductions notariées à distance dans tout Israël, accompagnement d'avocat d'1 heure au Misrad HaPanim, et rabbins/madrichot reconnus par la Rabbanut :",
    svc_lbl: "1. Choisissez le Service Souhaité :",
    svcs: [
      { t: "🕍 Forfait Couple : Rabbin Accompagnateur (Rav Melaveh) + Madrichat Kallah", s: "Reconnu par le Beit Din & le Grand Rabbinat (1-à-1 et visio).", p: "349$ Forfait Couple Complet (Économisez 49$)" },
      { t: "📜 Rabbin Accompagnateur Reconnu par le Rabbinat (Rav Melaveh)", s: "Étude officielle et lettre tamponnée pour le Beit Din.", p: "249$ Mise en Relation & Dossier Beit Din" },
      { t: "🕯️ Madrichat Kallah Certifiée par le Rabbinat (Pureté Familiale)", s: "Attestation officielle Taharat HaMishpacha requise par le Beit Din.", p: "149$ Mise en Relation & Certification Officielle" },
      { t: "🎀 Traduction Notariée Certifiée (Ruban Rouge) & Tampon d'Avocat (À Distance)", s: "Traduction notariée en hébreu (Copie Intégrale, Bulletin n°3, Célibat/Divorce) & déclaration sous serment.", p: "149$–249$ / doc • En 24–48h" },
      { t: "⚖️ Accompagnement d'Avocat d'1 Heure au Rendez-Vous Misrad HaPanim", s: "Un avocat israélien vous accompagne 1 heure au guichet pour faire ouvrir votre dossier immédiatement.", p: "499$–699$ (vs 25 000₪)" }
    ],
    reg_lbl: "2. Votre Région Misrad HaPanim / Beit Din :",
    regs: [
      "🏔️ Nord / Galilée / Haïfa (Safed, Tibériade, Karmiel, Nahariya, Haïfa)",
      "🏛️ Jérusalem & Gush Etzion",
      "🏙️ Tel Aviv & Centre (Tel Aviv, Netanya, Ramat Gan, Petah Tikva, Herzliya)",
      "🌴 Sud (Ashdod, Be'er Sheva, Ashkelon)",
      "✈️ Actuellement à l'Étranger (Dossier Go-Bag / Traduction Notariée à Distance)"
    ],
    trk_lbl: "3. Votre Voie Actuelle :",
    trks: [
      "Voie 1 : Aliyah d'Urgence en Israël (Shinui Ma'amad)",
      "Voie 2 : Beit Din Orthodoxe Privé (Gush Etzion / Bnei Brak) + Ishur Giyur",
      "Voie 3 : Giyur d'État (Nativ) via Va'adat Charigim (Formulaire Ash/1)",
      "Voie 4 : Visa Conjoint Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009 Ash/3)",
      "Double Voie : Validation Rabbanut + Visa Conjoint Misrad HaPanim"
    ],
    name_lbl: "4. Nom Complet (et Nom du Conjoint) :",
    wa_lbl: "5. Numéro WhatsApp (avec indicatif +33 / +972 / +32 / +41) :",
    date_lbl: "6. Date du Rendez-Vous ou Urgence :",
    notes_lbl: "7. Documents à Traduire ou Résumé de Votre Situation :",
    btn_wa: "💬 Envoyer Ma Demande Prioritaire sur WhatsApp →",
    btn_em: "✉️ Ou Envoyer par Email",
    ok_msg: "✅ Demande enregistrée et ouverte dans WhatsApp !"
  },
  es: {
    pill: "🤝 Rabino, Notario y Abogado",
    h2: "Reservar Equipo: Rabino, Madrijá, Traducción Notarial (Cinta Roja) y Abogado 1h",
    lead: "Ahorre los 25.000 ₪ de los bufetes. Seleccione lo que necesita: traducciones notariales al hebreo a distancia en todo Israel, acompañamiento de abogado por 1 hora en el Misrad HaPanim, y rabinos/madrijot reconocidos por la Rabanut:",
    svc_lbl: "1. Seleccione el Servicio que Necesita:",
    svcs: [
      { t: "🕍 Ambos: Rabino Patrocinador (Rav Melavé) + Madrijat Kalá Certificada", s: "Paquete completo reconocido por el Beit Din y la Rabanut (1-a-1 y Zoom).", p: "$349 Paquete Completo de Pareja (Ahorre $49)" },
      { t: "📜 Rabino Patrocinador Reconocido por la Rabanut (Rav Melavé)", s: "Estudio oficial y carta sellada de recomendación para el Beit Din.", p: "$249 Asignación y Apertura de Dossier Beit Din" },
      { t: "🕯️ Madrijat Kalá Certificada por la Rabanut (Pureza Familiar)", s: "Certificación oficial Taharat HaMishpajá exigida por el Beit Din.", p: "$149 Asignación y Certificación Oficial" },
      { t: "🎀 Traducción Notarial Certificada (Cinta Roja) y Sello de Abogado (Remoto)", s: "Traducción notarial al hebreo (Partida Literal, Antecedentes Penales, Soltería/Divorcio) y declaración jurada.", p: "$149–$249 / doc • En 24–48h" },
      { t: "⚖️ Acompañamiento de Abogado por 1 Hora en su Cita del Misrad HaPanim", s: "Un abogado israelí entra con usted por 1 hora para que abran su expediente con respeto en el acto.", p: "$499–$699 (vs. 25.000₪)" }
    ],
    reg_lbl: "2. Su Región de Misrad HaPanim / Beit Din:",
    regs: [
      "🏔️ Norte / Galilea / Haifa (Safed, Tiberíades, Karmiel, Nahariya, Haifa)",
      "🏛️ Jerusalén y Gush Etzion",
      "🏙️ Tel Aviv y Centro (Tel Aviv, Ramat Gan, Petaj Tikva, Netanya, Herzliya)",
      "🌴 Sur (Ashdod, Be'er Sheva, Ashkelon)",
      "✈️ Actualmente en el Extranjero (Carpeta Go-Bag / Traducción Notarial Remota)"
    ],
    trk_lbl: "3. Su Vía Actual:",
    trks: [
      "Vía 1: Aliyá de Emergencia en Israel (Shinui Ma'amad)",
      "Vía 2: Beit Din Ortodoxo Privado (Gush Etzion / Bnei Brak) + Ishur Guiur",
      "Vía 3: Guiur Estatal (Nativ) vía Comité de Excepciones (Formulario Ash/1)",
      "Vía 4: Visa de Pareja Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009 Ash/3)",
      "Doble Vía: Validación Rabanut + Visa de Pareja Misrad HaPanim"
    ],
    name_lbl: "4. Nombre Completo (y de su Pareja):",
    wa_lbl: "5. Número de WhatsApp (con código de país, ej. +34 / +54 / +52 / +972):",
    date_lbl: "6. Fecha de su Cita o Nivel de Urgencia:",
    notes_lbl: "7. Documentos para Traducir o Resumen de su Caso:",
    btn_wa: "💬 Enviar Solicitud Prioritaria por WhatsApp →",
    btn_em: "✉️ O Enviar por Correo",
    ok_msg: "✅ ¡Solicitud lista y abierta en WhatsApp!"
  },
  de: {
    pill: "🤝 Rabbiner, Notar & Anwalt",
    h2: "Team Buchen: Rabbiner, Madricha, Notar-Übersetzung (Rotes Band) & 1-Std.-Anwalt",
    lead: "Sparen Sie sich 25.000 ₪ Kanzlei-Honorar. Wählen Sie Ihren Bedarf — landesweite hebräische Notar-Übersetzungen per Fernauftrag, 1-Stunden-Anwaltsbegleitung zum Misrad HaPanim sowie vom Rabbinat anerkannte Rabbiner & Madrichot:",
    svc_lbl: "1. Gewünschten Service Auswählen:",
    svcs: [
      { t: "🕍 Beides: Betreuender Rabbiner (Rav Melaveh) + Zertifizierte Madrichat Kallah", s: "Komplettpaket anerkannt von Beit Din & Rabbinat (1-zu-1 & Zoom).", p: "$349 Paar-Komplettpaket ($49 Sparen)" },
      { t: "📜 Vom Rabbinat Anerkannter Betreuender Rabbiner (Rav Melaveh)", s: "Offizieller Unterricht & gestempeltes Empfehlungsschreiben für das Beit Din.", p: "$249 Vermittlung & Beit-Din-Dossier" },
      { t: "🕯️ Vom Rabbinat Zertifizierte Madrichat Kallah (Taharat HaMischpacha)", s: "Offizielle Bestätigung für Beit Din und Rabbinats-Hochzeit.", p: "$149 Vermittlung & Offizielle Zertifizierung" },
      { t: "🎀 Beglaubigte Notar-Übersetzung (Rotes Band) & Anwalts-Eid (Landesweit Online)", s: "Hebräische Notar-Übersetzung (Geburtenregister, Führungszeugnis, Ledigkeit/Scheidung) & gestempelte Erklärung.", p: "$149–$249 / Dok. • In 24–48h" },
      { t: "⚖️ 1-Stunden Anwalts-Begleitung zum Misrad HaPanim Termin", s: "Ein zugelassener israelischer Anwalt begleitet Sie für 1 Stunde zum Schalter, damit Ihre Akte sofort geöffnet wird.", p: "$499–$699 (statt 25.000₪)" }
    ],
    reg_lbl: "2. Ihre Misrad HaPanim / Beit Din Region:",
    regs: [
      "🏔️ Norden / Galiläa / Haifa (Safed, Tiberias, Karmiel, Nahariya, Haifa)",
      "🏛️ Jerusalem & Gush Etzion",
      "🏙️ Tel Aviv & Zentrum (Tel Aviv, Ramat Gan, Petach Tikwa, Netanya, Herzliya)",
      "🌴 Süden (Aschdod, Be'er Scheva, Aschkelon)",
      "✈️ Derzeit im Ausland (Go-Bag-Ordner / Fern-Notarübersetzung)"
    ],
    trk_lbl: "3. Ihr Aktueller Weg:",
    trks: [
      "Weg 1: Notfall-Alija in Israel (Schinui Ma'amad)",
      "Weg 2: Privates Orthodoxes Beit Din (Gush Etzion / Bnei Brak) + Ischur Giur",
      "Weg 3: Staatlicher Giur (Nativ) über Ausnahmekomitee (Formular Asch/1)",
      "Weg 4: Partner-Visum Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009 Asch/3)",
      "Doppel-Weg: Rabbinats-Validierung + Partner-Visum Misrad HaPanim"
    ],
    name_lbl: "4. Vollständiger Name (und Name des Partners):",
    wa_lbl: "5. WhatsApp-Nummer (mit Ländervorwahl, z.B. +49 / +43 / +41 / +972):",
    date_lbl: "6. Geplanter Behördentermin oder Dringlichkeit:",
    notes_lbl: "7. Zu Übersetzende Dokumente oder Kurze Fallbeschreibung:",
    btn_wa: "💬 Prioritäts-Anfrage Jetzt per WhatsApp Senden →",
    btn_em: "✉️ Oder per E-Mail Senden",
    ok_msg: "✅ Anfrage gespeichert und in WhatsApp geöffnet!"
  }
};

window.selectedConciergeChoice = 0;

window.selectConciergeSvc = function(idx) {
  window.selectedConciergeChoice = idx;
  document.querySelectorAll('#vt-svc-grid .svc-row').forEach((r, i) => r.classList.toggle('active', i === idx));
};

window.submitConciergeLead = function(via) {
  const lang = window.appLang || 'en';
  const v = VETTED_I18N[lang] || VETTED_I18N.en;
  const choice = window.selectedConciergeChoice || 0;
  const svcObj = v.svcs[choice] || v.svcs[0];
  const region = (document.getElementById('vt-region') || {}).value || '';
  const track = (document.getElementById('vt-track') || {}).value || '';
  const name = ((document.getElementById('vt-name') || {}).value || '').trim();
  const wa = ((document.getElementById('vt-wa') || {}).value || '').trim();
  const dt = ((document.getElementById('vt-date') || {}).value || '').trim();
  const notes = ((document.getElementById('vt-notes') || {}).value || '').trim();

  if (!name || !wa) {
    alert(lang === 'he' ? 'נא להזין שם מלא ומספר וואטסאפ ליצירת קשר.' : 'Please enter your Full Name and WhatsApp number so we can reach you.');
    return;
  }

  const isLegalOrNorth = (choice === 3 || choice === 4 || region.includes('Safed') || region.includes('צפת'));
  const routeTag = isLegalOrNorth ? '[🔥 PRIORITY NOTARY / LAWYER ESCORT DESK]' : '[🕍 VETTED RABBI / KALLAH BOOKING]';

  const leadObj = {
    ts: new Date().toISOString(),
    lang: lang,
    routeTag: routeTag,
    serviceIdx: choice,
    serviceName: svcObj.t,
    priceTier: svcObj.p,
    region: region,
    track: track,
    name: name,
    whatsapp: wa,
    targetDate: dt || 'Flexible / ASAP',
    notes: notes
  };

  try {
    const leads = JSON.parse(localStorage.getItem('gat_concierge_leads') || '[]');
    leads.push(leadObj);
    localStorage.setItem('gat_concierge_leads', JSON.stringify(leads));
  } catch(e){}

  const msgLines = [
    `${routeTag} — GiyurAliyahTrack.com`,
    `• Client Name: ${name}`,
    `• Client WhatsApp: ${wa}`,
    `• Service: ${svcObj.t}`,
    `• Rate / Tier: ${svcObj.p}`,
    `• Region: ${region}`,
    `• Track: ${track}`,
    `• Target Date: ${dt || 'ASAP'}`,
    notes ? `• Notes/Docs: ${notes}` : ''
  ].filter(Boolean).join('\n');

  const okEl = document.getElementById('vt-ok-banner');
  if (okEl) {
    okEl.style.display = 'block';
    okEl.innerText = v.ok_msg;
  }

  if (via === 'email') {
    location.href = `mailto:${window.CONCIERGE_EMAIL}?subject=${encodeURIComponent(routeTag + ' - ' + name)}&body=${encodeURIComponent(msgLines)}`;
  } else {
    window.open(`https://wa.me/${window.CONCIERGE_WHATSAPP}?text=${encodeURIComponent(msgLines)}`, '_blank', 'noopener,noreferrer');
  }
};

const _origRenderAll = renderAll;
renderAll = function() {
  _origRenderAll();
  const lang = window.appLang || 'en';
  const v = VETTED_I18N[lang] || VETTED_I18N.en;

  const u = APP_UI[lang] || APP_UI.en;
  const tabBtns = document.querySelectorAll('.mod-tab');
  if (tabBtns.length === 6) {
    tabBtns[0].innerText = v.pill;
    u.tabs.forEach((lbl, i) => { if (tabBtns[i + 1]) tabBtns[i + 1].innerText = lbl; });
  }

  const c = document.getElementById('app-container');
  if (!c) return;

  const choice = typeof window.selectedConciergeChoice === 'number' ? window.selectedConciergeChoice : 0;
  const svcRowsHtml = v.svcs.map((s, idx) => `
    <div class="svc-row ${idx === choice ? 'active' : ''}" onclick="selectConciergeSvc(${idx})">
      <div class="svc-dot"><div class="svc-dot-in"></div></div>
      <div style="flex:1;">
        <div class="svc-title">${s.t}</div>
        <span class="svc-sub">${s.s}</span>
        <span class="svc-price">${s.p}</span>
      </div>
    </div>
  `).join('');

  const vettedHtml = `
    <div class="mod-view" id="mod-vetted-team">
      <div class="card" style="border:2px solid #0288E8;">
        <div style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:0.74rem;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:8px;text-transform:uppercase;">⚡ Nationwide Notary Desk & Regional Misrad HaPanim Routing</div>
        <h2>${v.h2}</h2>
        <p>${v.lead}</p>

        <label>${v.svc_lbl}</label>
        <div class="svc-grid" id="vt-svc-grid">${svcRowsHtml}</div>

        <label for="vt-region">${v.reg_lbl}</label>
        <select id="vt-region">
          ${v.regs.map(r => `<option value="${r.replace(/"/g, '&quot;')}">${r}</option>`).join('')}
        </select>

        <label for="vt-track">${v.trk_lbl}</label>
        <select id="vt-track">
          ${v.trks.map(t => `<option value="${t.replace(/"/g, '&quot;')}">${t}</option>`).join('')}
        </select>

        <label for="vt-name">${v.name_lbl}</label>
        <input id="vt-name" placeholder="Avraham & Sarah..." />

        <label for="vt-wa">${v.wa_lbl}</label>
        <input id="vt-wa" type="tel" placeholder="+972 58-... / +1 ... / +33 ..." />

        <label for="vt-date">${v.date_lbl}</label>
        <input id="vt-date" placeholder="e.g., Next Month / Need Notary Translation within 48h" />

        <label for="vt-notes">${v.notes_lbl}</label>
        <textarea id="vt-notes" rows="3" placeholder="e.g., Need Red-Ribbon Notary translation of Birth Certificate + FBI Police Check, or 1-hr lawyer escort at Misrad HaPanim..."></textarea>

        <button type="button" class="btn btn-emerald" onclick="submitConciergeLead('whatsapp')">${v.btn_wa}</button>
        <button type="button" class="btn" style="background:#334155;margin-top:8px;padding:11px;" onclick="submitConciergeLead('email')">${v.btn_em}</button>
        <div id="vt-ok-banner" style="display:none;margin-top:12px;padding:12px;background:#ecfdf5;border:1.5px solid #10b981;border-radius:11px;color:#065f46;font-weight:800;font-size:0.88rem;text-align:center;"></div>
      </div>
    </div>
  `;

  c.insertAdjacentHTML('afterbegin', vettedHtml);
  updateBdCard();
  updateCpCard();
};

const FREE_CARD_LIMIT = 4;

window.bdPack = 1;
window.bdCat = 'all';
window.bdScores = JSON.parse(localStorage.getItem('gat_bd_scores') || '{}');

const BD_UI_L = {
  en: { p1:"📚 Pack 1: Core 200", p2:"🔥 Pack 2: +200 Curveballs", m:"Mastered", r:"Needs Review", tip:"🧠 What Dayanim Expect:", free:"Free Preview", unl:"Unlocked" },
  he: { p1:"📚 חבילה 1: 200 שאלות ליבה", p2:"🔥 חבילה 2: +200 שאלות התקלה", m:"שולט/ת", r:"לחזרה", tip:"🧠 מה הדיינים מחפשים:", free:"דוגמה חינם", unl:"פתוח" },
  fr: { p1:"📚 Pack 1 : 200 Base", p2:"🔥 Pack 2 : +200 Pièges", m:"Maîtrisé", r:"À revoir", tip:"🧠 Ce qu'attendent les Dayanim :", free:"Essai gratuit", unl:"Débloqué" },
  es: { p1:"📚 Pack 1: 200 Base", p2:"🔥 Pack 2: +200 Trampas", m:"Dominado", r:"Repasar", tip:"🧠 Qué esperan los Dayanim:", free:"Prueba gratis", unl:"Desbloqueado" },
  de: { p1:"📚 Paket 1: 200 Kern", p2:"🔥 Paket 2: +200 Fangfragen", m:"Gemeistert", r:"Wiederholen", tip:"🧠 Was die Dayanim erwarten:", free:"Gratis-Vorschau", unl:"Freigeschaltet" }
};

window.getFilteredBdList = function() {
  const raw = (window.bdPack === 4 ? window.BD_PACK4 : window.bdPack === 3 ? window.BD_PACK3 : window.bdPack === 2 ? window.BD_PACK2 : window.BD_PACK1) || [];
  if (!raw.length) return BD_CARDS;
  return window.bdCat === 'all' ? raw : raw.filter(x => x.cat === window.bdCat);
};

window.setBdPack = function(p) {
  if (p > 1 && !window.isProUnlocked() && localStorage.getItem('gat_pack2_unlocked') !== '1') {
    window.openProPaywall('🔥 Unlock the +200 Advanced Dayanim Curveballs & Beit HaDin HaGadol Expansion Pack (Cards 201–400)!');
    return;
  }
  window.bdPack = p; bdIdx = 0; updateBdCard();
};

window.setBdCat = function(c) { window.bdCat = c; bdIdx = 0; updateBdCard(); };

window.markBdScore = function(val) {
  const list = window.getFilteredBdList();
  const item = list[bdIdx % list.length];
  if (item && item.id) {
    window.bdScores[item.id] = val;
    localStorage.setItem('gat_bd_scores', JSON.stringify(window.bdScores));
  }
  nextBdCard();
};

window.prevBdCard = function() { bdIdx = Math.max(0, bdIdx - 1); updateBdCard(); };

window.speakBdTerm = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const list = window.getFilteredBdList();
  const item = list[bdIdx % list.length];
  if (!item || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(item.he || item.q.he || '');
  u.lang = 'he-IL'; u.rate = 0.88;
  window.speechSynthesis.speak(u);
};

updateBdCard = function() {
  const catEl = document.getElementById('bd-cat'), qEl = document.getElementById('bd-q'), aEl = document.getElementById('bd-a');
  if (!catEl || !qEl || !aEl) return;
  const l = window.appLang || 'en';
  const ui = BD_UI_L[l] || BD_UI_L.en;
  const list = window.getFilteredBdList();
  const item = list[bdIdx % list.length];
  const pro = window.isProUnlocked();

  const pb = document.getElementById('bd-pack-bar');
  if (pb) pb.innerHTML = `<button type="button" onclick="setBdPack(1)" style="flex:1;padding:7px 10px;border-radius:8px;border:1.5px solid #0284c7;font-weight:800;font-size:0.78rem;cursor:pointer;background:${window.bdPack===1?'#0284c7':'#fff'};color:${window.bdPack===1?'#fff':'#0284c7'};">${ui.p1}</button><button type="button" onclick="setBdPack(2)" style="flex:1;padding:7px 10px;border-radius:8px;border:1.5px solid #d97706;font-weight:800;font-size:0.78rem;cursor:pointer;background:${window.bdPack===2?'#d97706':'#fffbeb'};color:${window.bdPack===2?'#fff':'#92400e'};">${ui.p2}</button><button type="button" onclick="setBdPack(3)" style="flex:1;padding:7px 10px;border-radius:8px;border:1.5px solid #0f766e;font-weight:800;font-size:0.76rem;cursor:pointer;background:${window.bdPack===3?'#0f766e':'#f0fdfa'};color:${window.bdPack===3?'#fff':'#0f766e'};">🧔 Men's 150</button><button type="button" onclick="setBdPack(4)" style="flex:1;padding:7px 10px;border-radius:8px;border:1.5px solid #be185d;font-weight:800;font-size:0.76rem;cursor:pointer;background:${window.bdPack===4?'#be185d':'#fdf2f8'};color:${window.bdPack===4?'#fff':'#be185d'};">👩 Women's 150</button>`;

  const cb = document.getElementById('bd-cat-bar');
  if (cb && window.BD_CATS_I18N) {
    cb.innerHTML = Object.keys(window.BD_CATS_I18N).map(k => `<button type="button" onclick="setBdCat('${k}')" style="flex:0 0 auto;padding:5px 10px;border-radius:999px;border:1px solid #cbd5e1;font-size:0.75rem;font-weight:800;cursor:pointer;background:${window.bdCat===k?'#0f172a':'#f8fafc'};color:${window.bdCat===k?'#fff':'#334155'};">${window.BD_CATS_I18N[k][l]||window.BD_CATS_I18N[k].en}</button>`).join('');
  }

  const vals = Object.values(window.bdScores);
  const mCnt = vals.filter(v => v === 1).length, rCnt = vals.filter(v => v === 0).length;
  const sb = document.getElementById('bd-score-bar');
  if (sb) sb.innerHTML = `<span>✅ ${ui.m}: ${mCnt}</span><span>🔁 ${ui.r}: ${rCnt}</span><span>📊 ${pro ? ((bdIdx % list.length)+1)+'/'+list.length+' ('+ui.unl+')' : ((bdIdx % FREE_CARD_LIMIT)+1)+'/'+FREE_CARD_LIMIT+' ('+ui.free+')'}</span>`;

  const bm = document.getElementById('bd-btn-master'), br = document.getElementById('bd-btn-review'), pl = document.getElementById('bd-pron-lbl');
  if (bm) bm.innerText = ui.m; if (br) br.innerText = ui.r; if (pl) pl.innerText = item.he || 'HE';

  const catLbl = (window.BD_CATS_I18N && window.BD_CATS_I18N[item.cat]) ? (window.BD_CATS_I18N[item.cat][l] || item.cat) : (item.c || '');
  catEl.innerText = `${catLbl} • ${item.he || ''}`;
  qEl.innerText = (item.q && item.q[l]) ? item.q[l] : (item.q || '');
  aEl.style.display = 'none';
  const ansTxt = (item.a && item.a[l]) ? item.a[l] : (item.a || '');
  const tipTxt = (item.tip && item.tip[l]) ? `<div style="margin-top:8px;padding:8px 10px;background:rgba(245,158,11,0.18);border-left:3px solid #f59e0b;border-radius:6px;font-size:0.8rem;color:#fef3c7;"><strong>${ui.tip}</strong> ${item.tip[l]}</div>` : '';
  aEl.innerHTML = `<div>✅ ${ansTxt}</div>${tipTxt}`;
};

nextBdCard = function() {
  if (!window.isProUnlocked() && bdIdx + 1 >= FREE_CARD_LIMIT) {
    window.openProPaywall('🕍 You just finished the 4 free Ma\'amad Beit Din sample flashcards! Unlock all 150 real Dayanim questions, 80 Couples Sync questions, and clean Hebrew PDFs:');
    return;
  }
  bdIdx++;
  updateBdCard();
};

window.cpCat = 'all';
window.cpRoom = localStorage.getItem('gat_cp_room') || String(Math.floor(1000 + Math.random() * 9000));
localStorage.setItem('gat_cp_room', window.cpRoom);
window.cpAnswers = JSON.parse(localStorage.getItem('gat_cp_ans') || '{}');

window.getFilteredCpList = function() {
  const raw = window.CP_DECK80 || COUPLE_QS;
  return (window.cpCat === 'all' || !window.CP_DECK80) ? raw : raw.filter(x => x.cat === window.cpCat);
};

window.setCpCat = function(c) { window.cpCat = c; cpIdx = 0; updateCpCard(); };
window.prevCpCard = function() { cpIdx = Math.max(0, cpIdx - 1); updateCpCard(); };

window.saveCpAns = function() {
  const list = window.getFilteredCpList(), item = list[cpIdx % list.length];
  if (!item) return;
  const id = item.id || (cpIdx + 1);
  const a = (document.getElementById('cp-ans-a')||{}).value || '';
  const b = (document.getElementById('cp-ans-b')||{}).value || '';
  window.cpAnswers[id] = { a: a.trim(), b: b.trim() };
  localStorage.setItem('gat_cp_ans', JSON.stringify(window.cpAnswers));
  renderCpMatch(id);
};

window.renderCpMatch = function(id) {
  const box = document.getElementById('cp-match-out');
  if (!box) return;
  const rec = window.cpAnswers[id] || { a:'', b:'' };
  if (!rec.a && !rec.b) { box.style.display = 'none'; return; }
  box.style.display = 'block';
  if (rec.a && rec.b) {
    const same = rec.a.toLowerCase() === rec.b.toLowerCase() || rec.a.toLowerCase().includes(rec.b.toLowerCase()) || rec.b.toLowerCase().includes(rec.a.toLowerCase());
    box.style.background = same ? '#dcfce7' : '#fee2e2';
    box.style.color = same ? '#065f46' : '#991b1b';
    box.innerHTML = same ? `🟢 SYNC MATCH: "${rec.a}" ↔ "${rec.b}"` : `🚨 CLERK CONTRADICTION DETECTED: Partner A said "${rec.a}" vs. Partner B "${rec.b}"! Align before your interview!`;
  } else {
    box.style.background = '#fef3c7'; box.style.color = '#92400e';
    box.innerHTML = `⏳ Waiting for second partner's answer in Room #${window.cpRoom}...`;
  }
};

window.shareCpRoomWA = function() {
  const list = window.getFilteredCpList(), item = list[cpIdx % list.length];
  const l = window.appLang || 'en';
  const qTxt = (item.q && item.q[l]) ? item.q[l] : item.q;
  const u = 'https://giyuraliyahtrack.com/app/?module=couples-sync&room=' + window.cpRoom;
  const nl = String.fromCharCode(10);
  const msg = '📱 Misrad HaPanim Couples Sync Room #' + window.cpRoom + nl + qTxt + nl + 'Reply & compare here: ' + u;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
};

updateCpCard = function() {
  const catEl = document.getElementById('cp-cat'), qEl = document.getElementById('cp-q'), tipEl = document.getElementById('cp-tip');
  if (!catEl || !qEl) return;
  const l = window.appLang || 'en', list = window.getFilteredCpList(), item = list[cpIdx % list.length], pro = window.isProUnlocked();
  const id = item.id || (cpIdx + 1);
  const rb = document.getElementById('cp-room-bar');
  const mCnt = Object.values(window.cpAnswers).filter(x => x.a && x.b && (x.a.toLowerCase()===x.b.toLowerCase())).length;
  if (rb) rb.innerHTML = `<span>🔐 Room #${window.cpRoom} • ✅ Synced: ${mCnt}/80</span><button type="button" onclick="shareCpRoomWA()" style="background:#059669;color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">📲 Sync Partner via WhatsApp</button>`;
  const cb = document.getElementById('cp-cat-bar');
  if (cb && window.CP_CATS_I18N) {
    cb.innerHTML = Object.keys(window.CP_CATS_I18N).map(k => `<button type="button" onclick="setCpCat('${k}')" style="flex:0 0 auto;padding:5px 10px;border-radius:999px;border:1px solid #cbd5e1;font-size:0.75rem;font-weight:800;cursor:pointer;background:${window.cpCat===k?'#0c4a6e':'#f8fafc'};color:${window.cpCat===k?'#fff':'#334155'};">${window.CP_CATS_I18N[k][l]||window.CP_CATS_I18N[k].en}</button>`).join('');
  }
  const badge = pro ? `${(cpIdx % list.length)+1}/${list.length} (Unlocked)` : `Free ${(cpIdx % FREE_CP_LIMIT)+1}/${FREE_CP_LIMIT}`;
  const catLbl = (window.CP_CATS_I18N && window.CP_CATS_I18N[item.cat]) ? (window.CP_CATS_I18N[item.cat][l] || item.cat) : (item.c || '');
  catEl.innerText = `Nohal 5.2.0008 / 5.2.0009 • ${catLbl} • ${badge}`;
  qEl.innerText = (item.q && item.q[l]) ? item.q[l] : (item.q || '');
  if (tipEl) tipEl.innerHTML = `<strong>🛡️ Clerk Audit Tip:</strong> ${(item.tip && item.tip[l]) ? item.tip[l] : ''}`;
  const rec = window.cpAnswers[id] || { a:'', b:'' };
  const ia = document.getElementById('cp-ans-a'), ib = document.getElementById('cp-ans-b');
  if (ia) ia.value = rec.a; if (ib) ib.value = rec.b;
  renderCpMatch(id);
};

nextCpCard = function() {
  if (!window.isProUnlocked() && cpIdx + 1 >= FREE_CARD_LIMIT) {
    window.openProPaywall('📱 You just finished the 4 free Nohal 5.2.0008 Couples Interrogation questions! Unlock all 80 separated-room questions + live 2-Phone Matcher:');
    return;
  }
  cpIdx++;
  updateCpCard();
};

const _origGenHebrewDoc = genHebrewDoc;
genHebrewDoc = function() {
  _origGenHebrewDoc();
  const out = document.getElementById('he-output');
  if (!out) return;
  if (!window.isProUnlocked()) {
    out.classList.add('watermarked');
    let bar = document.getElementById('he-pro-action-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'he-pro-action-bar';
      out.insertAdjacentElement('afterend', bar);
    }
    bar.innerHTML = `<button type="button" class="btn btn-gold" onclick="openProPaywall('📄 Unlock clean, watermark-free Hebrew PDF printing & instant clipboard copy for Misrad HaPanim / Va\'adat Charigim ($39 Single Pass or $199 Lifetime Shield):')">🖨️ Unlock Clean Watermark-Free Hebrew PDF & Copy ($39 / $199) →</button>
    <button type="button" class="btn" style="background:#0b3b59;margin-top:8px;" onclick="openMod('vetted-team'); selectConciergeSvc(3);">🎀 Need Red-Ribbon Notary Seal on This Doc? Book Our Notary Desk →</button>`;
  } else {
    out.classList.remove('watermarked');
    window.print();
  }
};

const _origGenRabbiLetter = genRabbiLetter;
genRabbiLetter = function() {
  _origGenRabbiLetter();
  const out = document.getElementById('rb-output');
  if (!out) return;
  if (!window.isProUnlocked()) {
    out.classList.add('watermarked');
    let bar = document.getElementById('rb-pro-action-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'rb-pro-action-bar';
      out.insertAdjacentElement('afterend', bar);
    }
    bar.innerHTML = `<button type="button" class="btn btn-gold" onclick="openProPaywall('✍️ Unlock clean WhatsApp copy & official Rabbinic Letterhead PDF printing ($39 Single Pass or $199 Lifetime Shield):')">📲 Unlock Clean WhatsApp Copy & Rabbinic Letterhead PDF →</button>
    <button type="button" class="btn" style="background:#0b3b59;margin-top:8px;" onclick="openMod('vetted-team'); selectConciergeSvc(0);">🕍 Don't Have a Sponsoring Rabbi Yet? Book Our Vetted Team ($249–$349) →</button>`;
  } else {
    out.classList.remove('watermarked');
  }
};

window.handleAppBack = function(e) {
  if (e) e.preventDefault();
  try { sessionStorage.setItem('gat_skip_intro_once', '1'); } catch(err){}
  try {
    const st = JSON.parse(sessionStorage.getItem('gat_nav_stack_v2') || '[]');
    if (st.length > 0) {
      const prev = st.pop();
      sessionStorage.setItem('gat_nav_stack_v2', JSON.stringify(st));
      sessionStorage.setItem('gat_pending_restore', JSON.stringify(prev));
      location.href = prev.path === '/' ? '/' : (prev.path + '/');
      return false;
    }
  } catch(err){}
  if (document.referrer && document.referrer.indexOf(location.host) !== -1 && history.length > 1) {
    history.back();
    return false;
  }
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  location.href = (l === 'en' ? '/' : '/' + l + '/');
  return false;
};

window.handleAppBrand = function(e) {
  if (e) e.preventDefault();
  try { sessionStorage.setItem('gat_skip_intro_once', '1'); sessionStorage.removeItem('gat_pending_restore'); sessionStorage.removeItem('gat_nav_stack_v2'); } catch(err){}
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  location.href = (l === 'en' ? '/' : '/' + l + '/');
  return false;
};




window.songNusach = localStorage.getItem('gat_nusach') || 's';
window.songMaskMode = false;
window.songMastered = JSON.parse(localStorage.getItem('gat_songs_m') || '{}');

window.setSongNusach = function(n) {
  window.songNusach = n;
  localStorage.setItem('gat_nusach', n);
  window.renderSongs12();
};

window.speakSongGate = function(idx) {
  if (!window.isProUnlocked() && idx >= (window.FREE_SONG_LIMIT || 3)) {
    window.openProPaywall('🎵 Unlock all 12 Shabbat Songs, Audio Pronunciations & Live Mic Grader!');
    return;
  }
  window.speakSongHe(idx);
};
window.speakSongHe = function(idx) {
  const s = (window.SONGS_VAULT12 || [])[idx];
  if (!s || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const txt = window.songNusach === 'a' ? (s.he_a || s.he_s) : (s.he_s || s.he_a);
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = 'he-IL'; u.rate = 0.84;
  window.speechSynthesis.speak(u);
};

window.openSongMelody = function(idx) {
  const s = (window.SONGS_VAULT12 || [])[idx];
  if (!s) return;
  const q = window.songNusach === 'a' ? s.yt_a : s.yt_s;
  window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), '_blank');
};

window.gradeSongMic = function(idx) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const out = document.getElementById('song-mic-out-' + idx);
  if (!SR) {
    if (out) { out.style.display='block'; out.innerHTML='⚠️ Speech recognition requires Chrome/Safari with mic permissions.'; }
    return;
  }
  const s = (window.SONGS_VAULT12 || [])[idx];
  const targetRaw = (window.songNusach === 'a' ? s.he_a : s.he_s).replace(/[\u0591-\u05C7.,:;!?'"״׳()-]/g, '').replace(/ה/g,'').split(/\s+/).filter(w => w.length > 1);
  const rec = new SR();
  rec.lang = 'he-IL'; rec.interimResults = false;
  if (out) { out.style.display='block'; out.innerHTML='🎙️ Listening in Hebrew... Recite or sing the text aloud now!'; }
  rec.onresult = function(ev) {
    const spoken = (ev.results[0][0].transcript || '').replace(/[\u0591-\u05C7.,:;!?'"״׳()-]/g, '');
    const hits = targetRaw.filter(w => spoken.includes(w.slice(0, Math.min(3, w.length))));
    const pct = Math.min(100, Math.round((hits.length / Math.max(1, targetRaw.length)) * 100));
    out.innerHTML = `<div style="padding:8px;border-radius:8px;background:${pct>=70?'#dcfce7':'#fef3c7'};color:${pct>=70?'#065f46':'#92400e'};font-weight:800;">🎙️ You recited: "${ev.results[0][0].transcript}" — Match Score: ${pct}% ${pct>=70?'✅ Great Beit Din Readiness!':'🔁 Keep Practicing!'}</div>`;
  };
  rec.onerror = function() { if (out) out.innerHTML = '⚠️ Could not hear audio clearly. Tap 🎙️ Mic Test again and speak closer to the mic.'; };
  rec.start();
};

window.toggleSongMaster = function(id) {
  window.songMastered[id] = !window.songMastered[id];
  localStorage.setItem('gat_songs_m', JSON.stringify(window.songMastered));
  window.renderSongs12();
};

window.FREE_SONG_LIMIT = 3;
window._songAudioCtx = null;
window._songTimer = null;

window.play10sSongPreview = function(idx) {
  if (window._songTimer) { clearInterval(window._songTimer); window._songTimer = null; }
  if (window._songAudioCtx) { try { window._songAudioCtx.close(); } catch(e){} window._songAudioCtx = null; }
  const btn = document.getElementById('song-prev-btn-' + idx);
  const bar = document.getElementById('song-prev-bar-' + idx);
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  window._songAudioCtx = ctx;
  const isSeph = (window.songNusach || 's') === 's';
  // Traditional Sephardi Hijaz/Bayat vs Ashkenazi Shalom Aleichem / Shabbat minor intervals (Hz)
  const scale = isSeph
    ? [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 554.37, 587.33, 554.37, 466.16, 440.00, 392.00, 369.99, 311.13, 293.66]
    : [293.66, 349.23, 440.00, 440.00, 392.00, 349.23, 329.63, 293.66, 329.63, 349.23, 392.00, 440.00, 466.16, 440.00, 293.66];
  const now = ctx.currentTime;
  for (let i = 0; i < 20; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = isSeph ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(scale[(i + idx) % scale.length], now + i * 0.5);
    gain.gain.setValueAtTime(0.001, now + i * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.5 + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.5 + 0.46);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now + i * 0.5); osc.stop(now + i * 0.5 + 0.48);
  }
  let rem = 10;
  if (bar) bar.style.display = 'block';
  if (btn) btn.innerText = '⏸️ 10s...';
  window._songTimer = setInterval(() => {
    rem--;
    if (btn) btn.innerText = rem > 0 ? `⏸️ ${rem}s...` : '▶️ 10s Preview';
    if (bar) bar.innerHTML = rem > 0
      ? `<div style="background:#e0f2fe;border-radius:6px;padding:6px 10px;font-size:0.76rem;font-weight:800;color:#0369a1;">🎶 Playing 10s ${isSeph?'Sephardi Maqam':'Ashkenazi Niggun'} Sample (${rem}s left)... <a href="#" onclick="openSongMelody(${idx});return false;" style="color:#7c3aed;margin-left:6px;">Open Full Cantor Audio ↗</a></div>`
      : '';
    if (rem <= 0) {
      clearInterval(window._songTimer);
      window._songTimer = null;
      if (bar) bar.style.display = 'none';
      if (!window.isProUnlocked() && idx >= window.FREE_SONG_LIMIT) {
        window.openProPaywall('🎵 Liked the 10-second Shabbat melody preview? Unlock all 12 full Sephardi & Ashkenazi Shabbat Songs, Pointed Hebrew Texts, and the Live Microphone Recitation Grader!');
      }
    }
  }, 1000);
};

window.renderSongs12 = function() {
  if (typeof window.renderSongs12 === 'function') window.renderSongs12();
};

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const qLang = params.get('lang');
  const saved = qLang || localStorage.getItem('gat_lang') || 'en';
  const choiceParam = params.get('choice');
  if (choiceParam !== null) {
    window.selectedConciergeChoice = parseInt(choiceParam, 10) || 0;
  }
  const mod = params.get('module');
  const intent = params.get('intent');
  if (intent === 'vetted-team') window.currentMod = 'vetted-team';
  else if (mod) window.currentMod = mod;
  else window.currentMod = 'hebrew-engine';
  setAppLang(saved);
  if (typeof window.renderSongs12 === 'function') window.renderSongs12();
  openMod(window.currentMod);
});
