
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
    tabs: ["📸 Hebrew & Forms", "✍️ Rabbi Letters", "🕍 150 Beit Din Deck", "📱 80 Couples Sync", "🎵 12 Shabbat Songs"],
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
    m3_h2: "🕍 150 Beit Din Tribunal (Ma'amad Beit Din) Simulator",
    m3_p: "Tap the card to reveal the exact Halachic answer Dayanim expect to hear:",
    m3_btn: "Next Beit Din Question (150 Core Deck) →",
    m4_h2: "📱 80-Question Misrad HaPanim Separated Couples Interrogation",
    m4_p: "Under Nohal 5.2.0008 / 5.2.0009, clerks separate both partners into two rooms. Drill these high-trap questions together:",
    m4_btn: "Next Couples Interrogation Question →",
    m5_h2: "🎵 12 Mandatory Shabbat Songs, Kiddush & Shema Trainer",
    m5_p: "Every conversion candidate is asked to recite or sing from this core list at the Beit Din table:"
  },
  he: {
    back: "→ חזרה למדריך הראשי",
    tabs: ["📸 מנוע עברית וטפסים", "✍️ מכתבי רב וקהילה", "🕍 150 שאלות בית דין", "📱 80 שאלות לזוגות", "🎵 12 שירי שבת וברכות"],
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
    tabs: ["📸 Hébreu & Ash/1", "✍️ Lettres Rabbin", "🕍 150 Q. Beit Din", "📱 80 Q. Couples", "🎵 12 Chants Shabbat"],
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
    tabs: ["📸 Hebreo y Ash/1", "✍️ Cartas Rabino", "🕍 150 P. Beit Din", "📱 80 P. Parejas", "🎵 12 Cantos Shabat"],
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
    tabs: ["📸 Hebräisch & Asch/1", "✍️ Rabbiner-Briefe", "🕍 150 Beit Din Fragen", "📱 80 Paar-Fragen", "🎵 12 Schabbat-Lieder"],
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
    m3_h2: "🕍 150 Beit Din Fragen Simulator (Ma'amad Beit Din)",
    m3_p: "Tippen Sie auf die Karte, um die halachische Antwort der Dayanim anzuzeigen:",
    m3_btn: "Nächste Beit Din Frage →",
    m4_h2: "📱 80-Fragen Paar-Interview Simulator (Misrad HaPanim)",
    m4_p: "Gemäß Nohal 5.2.0008 werden beide Partner getrennt befragt. Üben Sie gemeinsam:",
    m4_btn: "Nächste Interview-Frage →",
    m5_h2: "🎵 12 Pflicht-Schabbatlieder, Kiddusch & Schema-Trainer",
    m5_p: "Diese Lieder und Segenssprüche werden beim Beit Din abgefragt:"
  }
};

const BD_CARDS = [
  {c:"Shabbat (39 Melachot)", q:"What do you do if you accidentally forget to turn on the hot water urn (Meicham) before candle lighting?", a:"You may NOT turn it on or ask a Jewish neighbor to do so. Keep cold/room-temperature food & drinks ready; under specific rabbinic conditions a non-Jew (Amira LeNochri) may only help for the sick or small children."},
  {c:"Kashrut & Kitchen", q:"If a dairy spoon falls into a pot of boiling meat soup on the stove, what happens?", a:"Wait 24 hours before using the spoon, and consult a Rabbi immediately—if the soup volume is 60x the volume of the spoon (Batel BeShishim), the soup remains kosher, though the spoon requires Hag'alah (koshering in boiling water)."},
  {c:"Taharat HaMishpacha", q:"What are the minimum days before beginning the 7 Clean Days (Shiva Nekiyim)?", a:"According to Ashkenazi custom, a minimum of 5 days (and Sephardic custom, 4–5 days depending on community practice) before performing the Hefsek Tahara check just before sunset."},
  {c:"Sincerity & Identity", q:"If your relationship ended tomorrow, or you had to live outside Israel, would you still complete your conversion and keep Shabbat & Mitzvot?", a:"Trap check: The Dayanim must hear 100% unconditional commitment to Hashem, Torah, and the Jewish people (Kabbalat Ol Mitzvot)—completely independent of any partner or visa."},
  {c:"Brachot & Daily Halacha", q:"What Bracha do you recite on rice (Orez) vs. quinoa vs. bread?", a:"Rice: Borei Minei Mezonot (after-bracha: Borei Nefashot!). Quinoa: Borei Pri Ha'Adama. Bread: HaMotzi Lechem Min Ha'Aretz (after: Birkat HaMazon)."},
  {c:"Jewish History & Holidays", q:"Why do we fast on the 17th of Tammuz and the 9th of Av (Tisha B'Av)?", a:"17th of Tammuz marks the breaching of Jerusalem's walls (beginning the Three Weeks / Bein HaMetzarim), and Tisha B'Av mourns the destruction of both the First and Second Temples."}
];

const COUPLE_QS = [
  {c:"Bedroom & Morning Routine", q:"Which side of the bed does each partner sleep on (facing the headboard), and how many pillows does each use?"},
  {c:"Finances & Bills", q:"Which bank account pays the electric bill (Chevrat HaChashmal) and Arnona, and what was the approximate amount last month?"},
  {c:"Family & Holidays", q:"Where did you spend the most recent Rosh Hashanah / Pesach Seder, who was at the table, and what was served?"},
  {c:"Daily Life & Kitchen", q:"What color is your shower curtain / bath mat, and where do you keep the laundry detergent?"},
  {c:"Origin & Proposal", q:"What exact date and location did you first meet in person, and who introduced you?"}
];

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

  const tabEls = document.querySelectorAll('.mod-tab');
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
        <input id="he-name" placeholder="David Cohen / Marie Laurent / Lukas Müller" />
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
        <div class="flashcard" style="background:linear-gradient(135deg,#0c4a6e,#0369a1);">
          <div class="fc-cat" id="cp-cat"></div>
          <div class="fc-q" id="cp-q"></div>
        </div>
        <button class="btn btn-emerald" onclick="nextCpCard()">${u.m4_btn}</button>
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
  const sl = document.getElementById('songs-list');
  sl.innerHTML = (SONGS_I18N[lang] || SONGS).map(s => `<div style="padding:12px;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:10px;background:#f8fafc;">
    <div style="font-weight:900;color:#0c4a6e;margin-bottom:4px;">${s.t}</div>
    <div style="font-size:0.88rem;color:#0f172a;font-style:italic;margin-bottom:6px;">"${s.p}"</div>
    <div style="font-size:0.82rem;color:#475569;">${s.m}</div>
  </div>`).join('');
}

function openMod(m) {
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

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('gat_lang') || 'en';
  const params = new URLSearchParams(location.search);
  const mod = params.get('module');
  const intent = params.get('intent');
  if (mod) window.currentMod = mod;
  else if (intent === 'vetted-team') window.currentMod = 'rabbi-letters';
  else window.currentMod = 'hebrew-engine';
  setAppLang(saved);
});