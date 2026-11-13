const CLERK_CLAUSES = [
  { he: ["יושר", "מרשם פלילי", "משטרה"], k: "police", en: "Federal Fingerprint Police Check + Apostille (<180 Days)", fr: "Casier Judiciaire (Bulletin n°3) + Apostille (<180j)", es: "Certificado de Antecedentes Penales + Apostilla (<180d)", de: "Führungszeugnis (BfJ) + BfAA-Apostille (<180T)", ru: "Справка об отсутствии судимости МВД + Апостиль (<180 дней)", he_lbl: "תעודת יושר פדרלית + אפוסטיל (בתוקף 180 יום)" },
  { he: ["לידה"], k: "birth", en: "Long-Form Vault Birth Certificate (Both Parents Named) + Apostille", fr: "Copie Intégrale d'Acte de Naissance + Apostille", es: "Partida Literal de Nacimiento + Apostilla de La Haya", de: "Beglaubigte Abschrift aus dem Geburtenregister + Apostille", ru: "Полное свидетельство о рождении ЗАГС (оба родителя) + Апостиль", he_lbl: "תעודת לידה מורחבת (כולל שמות הורים) + אפוסטיל" },
  { he: ["רווקות", "פנויות", "מצב אישי", "תמצית", "גירושין", "נישואין"], k: "single", en: "Single-Status / Marital History Proof + Apostille (<180 Days)", fr: "Certificat de Célibat / Coutume & Livret de Famille + Apostille", es: "Fe de Soltería / Estado Civil + Apostilla (<180d)", de: "Erweiterte Meldebescheinigung (Ledigkeit) + Apostille", ru: "Справка ЗАГС о семейном положении (Форма №15) + Апостиль (<180 дней)", he_lbl: "תמצית רישום / תצהיר רווקות ומעמד אישי + אפוסטיל" },
  { he: ["יהדות", "כתובה", "בית דין", "רב"], k: "rabbi", en: "Orthodox Proof of Judaism (Ishur Yahadut) & Parents' Ketubah / Rabbinic Letters", fr: "Attestation du Consistoire & Ketouba des Parents / Lettres de Rabbin", es: "Certificado de Judaísmo (Ishur Yahadut) y Ketubá de Padres", de: "Ischur Jahadut (ORD/IKG) & Ketubba der Eltern / Rabbinerbriefe", ru: "Подтверждение еврейства (Ишур Яадут), Ктуба родителей / Письма раввина", he_lbl: "אישור יהדות מרב אורתודוקסי מוכר וכתובת הורים / מכתבי רב" },
  { he: ["אפוסטיל", "מאומת"], k: "apostille", en: "Mandatory Hague Apostille Stamp on Original Document", fr: "Apostille Officielle (Notaires de France / Autorité Compétente)", es: "Apostilla de La Haya Obligatoria sobre el Original", de: "Offizielle Haager Apostille (BfAA / Landgericht)", ru: "Обязательный штамп Гаагского Апостиля на оригинале документа", he_lbl: "חותמת אפוסטיל רשמית על גבי המסמך המקורי" }
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
  box.innerHTML = `<div style="font-weight:900;color:#b91c1c;margin-bottom:8px;">🚨 Clerk Deficiency Clock Active — Target <25 Days (Beat Old 30d Clerk Habit; 45d Max by 2026 Law)</div>${list}<div style="font-size:0.82rem;color:#0f172a;margin-top:6px;">💡 <strong>Next Step:</strong> If any homeland document above will take >21 days to arrive, generate Option #1 (30/60-Day Extension Request) below immediately!</div>`;
};

window.loadSampleClerk = function() {
  document.getElementById('in-clerk-txt').value = 'דרישת מסמכים (נוהל 5.2.0008 / אש/1): נא להמציא תוך 30 יום תעודת לידה מאומתת באפוסטיל, תעודת יושר פדרלית, תמצית רישום רווקות, ואישור יהדות / מכתב רב מלווה. אי השלמת המסמכים במועד תביא לסגירת התיק.';
  window.decodeClerkSheet();
};

window.AUDIT_I18N = {
  en: {
    pill: "🛡️ Pre-Flight Packet, Apostille & Real-World Clerk Audit",
    h2: "🛡️ 2. Homeland Dossier, Name-Match & Originals Protection Inspector",
    lead: "Run this pre-flight check on your <strong>{j}</strong> packet before stepping up to the window so a hostile clerk cannot freeze your file:",
    warn_title: "🚨 REAL-WORLD FIELD WARNING: NEVER SURRENDER AN ORIGINAL DOCUMENT!",
    warn_1: "1. <strong>Stand Your Ground on Originals:</strong> Clerks frequently demand your physical original Birth Certificate, Marriage Certificate, or Apostille and keep it in their drawer—where it goes MIA in the system. <strong>UNDER NO CIRCUMSTANCES hand over an original to be kept!</strong> You will need those exact originals for other things in life (such as the Rabbanut, the Beit Din, marriage registration, or future renewals). Show the original at the window <em>only</em> so they can see the stamp, and insist on handing them a photocopy or a <strong>Red-Ribbon Notarial Certified True Copy</strong>. (If you order duplicate originals from home, keep them strictly in your personal vault—never as throwaways for a clerk!).",
    warn_2: "2. <strong>The 'English Is OK' Trap:</strong> While the law on paper says English documents are accepted, in real life clerks routinely refuse un-translated English documents anyway. Having <strong>Red-Ribbon Notarial Hebrew Translations</strong> removes their #1 excuse to turn you away.",
    c1_sub: "<em>(Long-Form Vault listing BOTH parents—never a short-form abstract)</em>",
    c2_sub: "<em>(All 3 Buckets: Birth Country + Citizenship + Lived >1yr since age 14)</em>",
    c3_sub: "<em>(Covers current single/married status + any prior divorce decrees)</em>",
    c4_sub: "<em>(On official letterhead with wet stamp & your exact passport #)</em>",
    c5_txt: "<strong>Correct Apostille Authority:</strong> Federal Apostille on Federal Police Check (e.g. US Dept of State, not a state notary!) & State/Ministry Apostille on Vital Records",
    lbl_days: "Days Since Police/Single Docs Issued (Max 180):",
    lbl_pass: "Months Left on Foreign Passport (Min 24m):",
    lbl_name: "Do All Names Match Character-for-Character Across Birth Cert, Passport & Letters?",
    nm_exact: "✅ Yes — Exact same spelling on every document",
    nm_bridged: "🛡️ Different (Name Change / Hebrew Name / Marriage), WITH Apostilled Name-Change Doc or Lawyer Affidavit",
    nm_unbridged: "⚠️ Different (e.g. Birth Cert says 'Adam' & Passport says 'Yakov') — No Bridging Affidavit Yet",
    lbl_trans: "Translation Status of Your Foreign Certificates:",
    tr_notarized: "🎀 All Translated into Hebrew with Israeli Red-Ribbon Notary Seal (Clerk-Proof)",
    tr_english: "⚠️ In Raw English Only (Legal on paper, but high risk of clerk pushback in practice!)",
    tr_foreign: "🛑 In French / Spanish / German / Russian / Other without Hebrew Notarial Translation",
    lbl_orig: "Originals Protection (Photocopies / Certified Copies Ready to Hand In):",
    or_ready: "✅ I have full copies to hand the clerk & will NEVER surrender my physical originals",
    or_only: "🚨 I only have my 1 set of originals right now (Need copies / Notarial Certified Copies!)",
    btn_run: "✅ Run Full Pre-Flight Packet & X-Factor Audit →",
    err_c1: "❌ <strong>Missing Long-Form Vault Birth Certificate:</strong> Must explicitly list both parents' names + carry an original Apostille (short-form abstracts are rejected on sight).",
    err_c2: "❌ <strong>Missing 3-Bucket Federal Fingerprint Police Check:</strong> Required from (1) Country of Birth, (2) Country of Citizenship, and (3) Every country lived in >12 months since age 14.",
    err_c3: "❌ <strong>Missing Single-Status / Complete Marital History Proof:</strong> Must cover current status and every prior marriage/divorce + Apostille.",
    err_c4: "❌ <strong>Missing Proof of Judaism / Rabbinic Dossier:</strong> Must include Orthodox Ishur Yahadut / Parents' Ketubah (for Aliyah) or Sponsoring Rabbi & Beit Din letters on official letterhead listing your exact passport number.",
    err_c5: "🚨 <strong>Wrong Apostille Authority (Federal vs. State Trap):</strong> Federal documents (like an FBI check) MUST carry a Federal Department of State Apostille—clerks reject state-level notary apostilles on federal checks!",
    err_days_exp: "🚨 <strong>EXPIRED 180-DAY CLOCK ({d} days old):</strong> Misrad HaPanim strictly rejects Police Checks and Single-Status certificates older than 180 days from issue!",
    adv_days_warn: "⚠️ <strong>180-Day Clock Danger Zone ({left} days remaining):</strong> File immediately or generate the 30/60-Day Extension Request in Card #3 below so your clock does not expire while waiting!",
    err_pass: "🚨 <strong>Passport Validity Trap ({m} months left):</strong> Misrad HaPanim procedures require foreign passports to be valid for at least 24 months (2 full years) to issue B/1, A/5, or status stamps. Renew your passport now!",
    adv_name_bridged: "🛡️ <strong>Name Change / Discrepancy Protected:</strong> Since your Birth Certificate and Passport names differ, bring your <strong>Apostilled Name-Change Certificate</strong> + a <strong>Lawyer-Stamped 'One-and-the-Same Person' Affidavit (Tatzhir)</strong> so the clerk links both names without freezing your file.",
    err_name_unbridged: "🚨 <strong>Unbridged Name Mismatch (Birth Cert vs. Passport):</strong> You are NOT disqualified if your name changed (e.g. first/last name change, Hebrew name, or marriage), but you MUST attach an official <strong>Apostilled Name-Change Certificate</strong> OR book our <strong>Partner Legal Desk below to draft a Red-Ribbon 'One-and-the-Same Person' Sworn Affidavit (Tatzhir)</strong> before your appointment!",
    adv_trans_eng: "🚨 <strong>Real-World Clerk Warning (Un-Translated English Docs):</strong> Even though written regulations claim English is accepted, in reality Misrad HaPanim clerks routinely refuse English birth, marriage, and police certificates and demand <strong>Red-Ribbon Israeli Notarial Hebrew Translations</strong>. Do not give a hostile clerk an excuse to send you home—get them translated & notarized in advance!",
    err_trans_for: "🛑 <strong>Mandatory Hebrew Notarial Translation Missing:</strong> Any document in French, Spanish, German, Russian, or Portuguese MUST have a Red-Ribbon Certified Israeli Notarial Hebrew translation.",
    err_orig: "🛑 <strong>CRITICAL ORIGINALS TRAP:</strong> NEVER walk in with only your 1 original! If you hand a clerk your original Birth Certificate, Marriage Certificate, or Apostille, they will file it away and you may NEVER get it back—leaving you stranded when you need that exact original for other things in life (such as the Rabbanut, Beit Din, marriage registration, or future visa renewals). Prepare full photocopies (or Red-Ribbon Certified True Copies) right now!",
    ok_head: "🟢 100% CLERK-PROOF PRE-FLIGHT DOSSIER ({left} Days Left on 180-Day Clock • Passport Valid {m}m)",
    ok_body: "All 5 core certificates, Federal/State Apostille authorities, name alignments, Hebrew translations, and duplicate copy protections verified. <strong>Remember at the window:</strong> show originals ONLY for visual inspection, hand the clerk the copies, and walk out with every original in your hand!",
    blk_head: "🛑 Clerk Rejection / File-Freeze Risks Detected ({n} Critical):",
    adv_head: "⚠️ Real-World Field Advisories ({n}):",
    btn_fix: "🎀 Fix Translation, Certified Copy, or Name-Affidavit Issues with Our Legal Desk →"
  },
  he: {
    pill: "🛡️ ביקורת תיק, אפוסטיל והגנה מפני מלכודות פקידים",
    h2: "🛡️ 2. מבקר מסמכי מקור, התאמת שמות ואפוסטיל לפני התור",
    lead: "הריצו בדיקת מוכנות מלאה לתיק <strong>{j}</strong> שלכם לפני ההגעה לדלפק כדי שאף פקיד לא יוכל להקפיא את התיק:",
    warn_title: "🚨 אזהרת שטח קריטית: לעולם אל תמסרו מסמך מקורי לפקיד!",
    warn_1: "1. <strong>עמדו על שלכם בנוגע למסמכי מקור:</strong> פקידים רבים דורשים להשאיר אצלם את תעודת הלידה, הנישואין או האפוסטיל המקוריים — ואז המסמכים נעלמים במערכת לנצח. <strong>בשום פנים ואופן אל תמסרו מסמך מקורי שיישאר בלשכה!</strong> אתם תזדקקו למקור עבור דברים אחרים בחיים (כגון הרבנות, בית הדין, רישום נישואין או הארכות אשרה). הציגו את המקור בחלון <em>אך ורק</em> לעיון, והגישו לפקיד צילום או <strong>העתק נאמן למקור נוטריוני (סרט אדום)</strong>. (גם אם הזמנתם עותקים מקוריים נוספים מחו״ל, שמרו אותם בכספת האישית שלכם — לעולם לא למסירה!).",
    warn_2: "2. <strong>מלכודת ״אנגלית זה קביל״:</strong> למרות שעל הנייר הנוהל מתיר מסמכים באנגלית, במציאות בשטח פקידים מסרבים לא פעם לקבל מסמכים באנגלית ודורשים <strong>תרגום נוטריוני לעברית (סרט אדום)</strong>. אל תתנו לפקיד עוין תירוץ להחזיר אתכם הביתה.",
    c1_sub: "<em>(נוסח מלא / Long-Form הכולל את שמות שני ההורים — לעולם לא תמצית מקוצרת)</em>",
    c2_sub: "<em>(מכל 3 הקטגוריות: ארץ לידה + אזרחות + כל מדינה שגרתם בה מעל שנה מגיל 14)</em>",
    c3_sub: "<em>(מכסה מצב אישי נוכחי + כל גירושין/נישואין קודמים)</em>",
    c4_sub: "<em>(על נייר לוגו רשמי עם חותמת חיה ומספר הדרכון המדויק שלכם)</em>",
    c5_txt: "<strong>סמכות אפוסטיל נכונה:</strong> אפוסטיל פדרלי לתעודת יושר פדרלית (כגון מחלקת המדינה בוושינגטון ל-FBI, ולא נוטריון מדינתי!) ואפוסטיל מתאים לתעודות מרשם",
    lbl_days: "מספר הימים שחלפו מהנפקת תעודת היושר/רווקות (מקסימום 180):",
    lbl_pass: "חודשי תוקף שנותרו בדרכון הזר (מינימום 24 חודשים):",
    lbl_name: "האם כל השמות תואמים אות-באות בין תעודת הלידה, הדרכון והמכתבים?",
    nm_exact: "✅ כן — איות זהה לחלוטין בכל המסמכים",
    nm_bridged: "🛡️ שונה (שינוי שם / שם עברי / נישואין), אך מצורפת תעודת שינוי שם עם אפוסטיל או תצהיר עו״ד",
    nm_unbridged: "⚠️ שונה (למשל בתעודת הלידה כתוב 'אדם' ובדרכון 'יעקב') — עדיין ללא תצהיר גישור",
    lbl_trans: "מצב תרגום המסמכים הזרים שלכם:",
    tr_notarized: "🎀 הכל מתורגם לעברית עם אישור נוטריוני וסרט אדום (חסינות מלאה מול פקידים)",
    tr_english: "⚠️ באנגלית בלבד ללא תרגום (חוקי על הנייר, אך סיכון גבוה לסירוב פקידים בפועל!)",
    tr_foreign: "🛑 בצרפתית / ספרדית / גרמנית / רוסית / אחר ללא תרגום נוטריוני לעברית",
    lbl_orig: "הגנה על מסמכי המקור (צילומים / העתקים נאמנים למקור מוכנים למסירה):",
    or_ready: "✅ יש לי צילומים/העתקים מלאים למסירה לפקיד ולעולם לא אמסור את המקור הפיזי",
    or_only: "🚨 יש לי כרגע רק את עותק המקור היחיד (נדרש להכין העתקים / נאמן למקור נוטריוני!)",
    btn_run: "✅ הרץ ביקורת תיק מלאה ובדיקת מוקשים ←",
    err_c1: "❌ <strong>חסרה תעודת לידה בנוסח מלא (Long-Form):</strong> חייבת לכלול את שמות שני ההורים + חותמת אפוסטיל מקורית.",
    err_c2: "❌ <strong>חסרה תעודת יושר פדרלית מכל 3 הקטגוריות:</strong> נדרש מ-(1) ארץ לידה, (2) ארץ אזרחות, ו-(3) כל מדינה בה התגוררתם מעל שנה מגיל 14.",
    err_c3: "❌ <strong>חסרה תעודת רווקות / תמצית רישום מצב אישי מלאה:</strong> חייבת לכסות מצב נוכחי וכל נישואין/גירושין קודמים + אפוסטיל.",
    err_c4: "❌ <strong>חסרה הוכחת יהדות / תיק רבני:</strong> אישור יהדות אורתודוקסי / כתובת הורים (לעלייה) או מכתבי רב מלווה ובית דין עם מספר דרכון מדויק.",
    err_c5: "🚨 <strong>סמכות אפוסטיל שגויה (מלכודת פדרלי מול מדינתי):</strong> מסמך פדרלי (כגון FBI) חייב לשאת אפוסטיל פדרלי של משרד החוץ/המדינה!",
    err_days_exp: "🚨 <strong>פג תוקף שעון 180 הימים ({d} ימים):</strong> משרד הפנים פוסל על הסף תעודות יושר ורווקות שעברו מעל 180 יום מהנפקתן!",
    adv_days_warn: "⚠️ <strong>אזור סכנה לשעון 180 הימים (נותרו {left} ימים):</strong> הגישו מיד או הפיקו מכתב בקשת הארכת 30/60 יום בכרטיסייה #3 למטה!",
    err_pass: "🚨 <strong>מלכודת תוקף דרכון (נותרו {m} חודשים):</strong> נהלי משרד הפנים מחייבים תוקף דרכון זר של 24 חודשים לפחות (שנתיים) להנפקת אשרות B/1 או A/5. חדש/י דרכון כעת!",
    adv_name_bridged: "🛡️ <strong>שינוי שם / אי-התאמה מגושרת:</strong> מאחר שהשמות בתעודת הלידה ובדרכון שונים, הביאו <strong>תעודת שינוי שם עם אפוסטיל</strong> + <strong>תצהיר עו״ד 'אותו אדם' (One-and-the-Same)</strong> כדי שהפקיד יקשר בין השמות ללא עיכוב.",
    err_name_unbridged: "🚨 <strong>אי-התאמת שמות לא מגושרת (תעודת לידה מול דרכון):</strong> אינכם פסולים אם שיניתם שם, אך חובה לצרף <strong>תעודת שינוי שם עם אפוסטיל</strong> או להזמין דרך <strong>המחלקה המשפטית שלנו למטה תצהיר נוטריוני 'אותו אדם' (תצהיר זהות כפולה)</strong> לפני התור!",
    adv_trans_eng: "🚨 <strong>אזהרת שטח (מסמכים באנגלית ללא תרגום):</strong> למרות שהנוהל היבש מתיר אנגלית, פקידים בלשכות מסרבים באופן קבוע למסמכים באנגלית ודורשים <strong>תרגום נוטריוני לעברית (סרט אדום)</strong>. מומלץ לתרגם מראש!",
    err_trans_for: "🛑 <strong>חסר תרגום נוטריוני חובה לעברית:</strong> כל מסמך בשפה זרה (צרפתית, ספרדית, גרמנית, רוסית וכו׳) חייב בתרגום נוטריוני ישראלי עם סרט אדום.",
    err_orig: "🛑 <strong>מלכודת מסירת מסמכי מקור:</strong> לעולם אל תיכנסו לתור רק עם עותק המקור היחיד! אם תמסרו לפקיד את המקור, הוא יתויק בארכיון ולא יחזור אליכם — ותיתקעו כשתזדקקו למקור עבור דברים אחרים בחיים (כגון הרבנות, בית הדין, רישום נישואין או חידוש אשרה). הכינו צילומים או העתקים נוטריוניים נאמנים למקור כעת!",
    ok_head: "🟢 תיק מוכן ב-100% נגד מוקשי פקידים (נותרו {left} ימים לשעון ה-180 • דרכון בתוקף ל-{m} חודשים)",
    ok_body: "כל 5 תעודות החובה, סמכויות האפוסטיל, התאמת השמות, התרגומים וההגנה על מסמכי המקור אומתו בהצלחה. <strong>זכרו בדלפק:</strong> הציגו מקור לעיון בלבד, מסרו לפקיד רק את ההעתקים, וצאו עם כל מסמך מקורי בידכם!",
    blk_head: "🛑 זוהו סיכונים קריטיים לסירוב פקיד / הקפאת תיק ({n}):",
    adv_head: "⚠️ התראות שטח חשובות לפני התור ({n}):",
    btn_fix: "🎀 לתיקון תרגום נוטריוני, העתק נאמן למקור או תצהיר שמות מול הצוות המשפטי שלנו ←"
  },
  fr: {
    pill: "🛡️ Audit Pré-Vol de Dossier, Apostilles & Réalité Terrain",
    h2: "🛡️ 2. Inspecteur de Dossier, Concordance des Noms & Protection des Originaux",
    lead: "Vérifiez votre dossier <strong>{j}</strong> avant de vous présenter au guichet pour éviter tout blocage administratif :",
    warn_title: "🚨 ALERTE TERRAIN CRITIQUE : NE REMETTEZ JAMAIS UN DOCUMENT ORIGINAL !",
    warn_1: "1. <strong>Ne Cédez Jamais Vos Originaux :</strong> Les agents réclament souvent vos actes de naissance, de mariage ou apostilles originaux et les gardent dans leur tiroir — où ils disparaissent définitivement. <strong>NE LAISSEZ SOUS AUCUN PRÉTEXTE un original au guichet !</strong> Vous aurez besoin de ces originaux pour d'autres démarches (Grand Rabbinat, Beit Din, mariage, renouvellements de visa). Montrez l'original à travers la vitre <em>uniquement</em> pour vérification visuelle, et remettez une photocopie ou une <strong>Copie Certifiée Conforme par Notaire (Ruban Rouge)</strong>.",
    warn_2: "2. <strong>Le Piège de « L'Anglais Suffit » :</strong> Même si la loi écrite autorise l'anglais, en pratique les agents refusent très souvent les actes non traduits en hébreu. Une <strong>Traduction Notariée en Hébreu (Ruban Rouge)</strong> supprime tout prétexte de refus.",
    c1_sub: "<em>(Copie intégrale / Long-Form mentionnant LES DEUX parents)</em>",
    c2_sub: "<em>(Les 3 catégories : Pays de naissance + Nationalité + Tout pays habité >1 an depuis 14 ans)</em>",
    c3_sub: "<em>(Couvre le célibat/mariage actuel + tout jugement de divorce antérieur)</em>",
    c4_sub: "<em>(Sur papier à en-tête officiel avec tampon humide et n° de passeport exact)</em>",
    c5_txt: "<strong>Autorité d'Apostille Correcte :</strong> Apostille fédérale sur casier fédéral & Apostille Cour d'Appel/Ministère sur l'état civil",
    lbl_days: "Jours Écoulés Depuis l'Émission du Casier/Célibat (Max 180) :",
    lbl_pass: "Mois de Validité Restants sur le Passeport (Min 24m) :",
    lbl_name: "Tous les Noms Correspondent-ils Lettre pour Lettre (Naissance, Passeport, Lettres) ?",
    nm_exact: "✅ Oui — Orthographe strictement identique sur chaque document",
    nm_bridged: "🛡️ Différent (Changement de nom / Nom hébraïque / Mariage), AVEC Acte Apostillé ou Affidavit d'Avocat",
    nm_unbridged: "⚠️ Différent (ex: Acte dit 'Adam' & Passeport dit 'Yakov') — Sans Affidavit de Concordance",
    lbl_trans: "Statut de Traduction de Vos Actes Étrangers :",
    tr_notarized: "🎀 Tout est Traduit en Hébreu avec Sceau Notarié Ruban Rouge (Anti-Rejet)",
    tr_english: "⚠️ En Anglais Brut Uniquement (Légal sur le papier, mais fort risque de refus au guichet !)",
    tr_foreign: "🛑 En Français / Espagnol / Allemand / Russe sans Traduction Notariée en Hébreu",
    lbl_orig: "Protection des Originaux (Photocopies / Copies Certifiées Prêtes à Remettre) :",
    or_ready: "✅ J'ai des copies complètes à remettre et je ne laisserai JAMAIS mes originaux physiques",
    or_only: "🚨 Je n'ai que mon exemplaire original unique (Besoin de copies / Copies Certifiées Notariées !)",
    btn_run: "✅ Lancer l'Audit Complet du Dossier & des Pièges →",
    err_c1: "❌ <strong>Copie Intégrale de l'Acte de Naissance Manquante :</strong> Doit indiquer les deux parents + Apostille originale.",
    err_c2: "❌ <strong>Casier Judiciaire des 3 Catégories Manquant :</strong> Requis pour (1) Naissance, (2) Nationalité, et (3) Tout pays habité >12 mois depuis l'âge de 14 ans.",
    err_c3: "❌ <strong>Certificat de Célibat / État Civil Complet Manquant :</strong> Doit couvrir l'état actuel et tout divorce antérieur + Apostille.",
    err_c4: "❌ <strong>Preuve de Judaïsme / Dossier Rabbinique Manquant :</strong> Attestation orthodoxe ou lettres du Rabbin & Beit Din avec n° de passeport exact.",
    err_c5: "🚨 <strong>Mauvaise Autorité d'Apostille (Piège Fédéral vs État) :</strong> Les actes fédéraux exigent une Apostille fédérale !",
    err_days_exp: "🚨 <strong>DÉLAI DE 180 JOURS EXPIRÉ ({d} jours) :</strong> Le Misrad HaPanim rejette tout casier ou certificat de célibat de plus de 180 jours !",
    adv_days_warn: "⚠️ <strong>Zone Critique des 180 Jours ({left} jours restants) :</strong> Déposez immédiatement ou générez la Demande d'Extension de 30/60 Jours ci-dessous !",
    err_pass: "🚨 <strong>Piège de Validité du Passeport ({m} mois restants) :</strong> Le passeport étranger doit être valide au moins 24 mois (2 ans). Renouvelez-le maintenant !",
    adv_name_bridged: "🛡️ <strong>Concordance de Nom Protégée :</strong> Apportez votre <strong>Acte de Changement de Nom Apostillé</strong> + un <strong>Affidavit d'Avocat « Même Personne » (Tatzhir)</strong>.",
    err_name_unbridged: "🚨 <strong>Différence de Nom Non Justifiée (Naissance vs Passeport) :</strong> Vous n'êtes PAS disqualifié, mais vous DEVEZ joindre un <strong>Acte de Changement de Nom Apostillé</strong> OU commander un <strong>Affidavit Notarié « Même Personne » (Tatzhir)</strong> via notre Bureau Juridique ci-dessous !",
    adv_trans_eng: "🚨 <strong>Alerte Terrain (Documents en Anglais Non Traduits) :</strong> En réalité, les guichets refusent fréquemment les actes en anglais et exigent une <strong>Traduction Notariée en Hébreu (Ruban Rouge)</strong>.",
    err_trans_for: "🛑 <strong>Traduction Notariée en Hébreu Manquante :</strong> Tout acte en français, espagnol, allemand ou russe DOIT être traduit en hébreu par un notaire israélien (Ruban Rouge).",
    err_orig: "🛑 <strong>PIÈGE CRITIQUE DES ORIGINAUX :</strong> Ne donnez JAMAIS votre original unique au guichet ! Il disparaîtra dans les archives alors que vous en aurez besoin pour d'autres démarches (Rabbinat, Beit Din, mariage, renouvellements). Préparez des copies ou Copies Certifiées Conformes dès maintenant !",
    ok_head: "🟢 DOSSIER 100% BLINDÉ ({left} Jours Restants sur 180 • Passeport Valide {m}m)",
    ok_body: "Les 5 actes, autorités d'Apostille, concordances de noms, traductions et copies de protection sont validés. <strong>Rappel au guichet :</strong> montrez les originaux UNIQUEMENT à vue, remettez les copies et repartez avec vos originaux en main !",
    blk_head: "🛑 Risques Critiques de Rejet / Blocage Détectés ({n}) :",
    adv_head: "⚠️ Avertissements Terrain Importants ({n}) :",
    btn_fix: "🎀 Régler les Traductions, Copies Certifiées ou Affidavit de Nom avec Notre Bureau Juridique →"
  },
  es: {
    pill: "🛡️ Auditoría Pre-Vuelo de Carpeta, Apostillas y Realidad de Ventanilla",
    h2: "🛡️ 2. Inspector de Documentos, Coincidencia de Nombres y Protección de Originales",
    lead: "Ejecute esta revisión de su carpeta de <strong>{j}</strong> antes de acercarse a la ventanilla para que ningún funcionario congele su expediente:",
    warn_title: "🚨 ADVERTENCIA REAL DE CAMPO: ¡NUNCA ENTREGUE UN DOCUMENTO ORIGINAL!",
    warn_1: "1. <strong>Defienda sus Originales a Toda Costa:</strong> Los funcionarios suelen pedir su Partida de Nacimiento, Matrimonio o Apostilla original y guardarla en su cajón, donde se pierde para siempre en el sistema. <strong>¡BAJO NINGUNA CIRCUNSTANCIA entregue un original para que se lo queden!</strong> Necesitará esos mismos originales para otras cosas en la vida (como la Rabanut, el Beit Din, registro de matrimonio o renovaciones de visa). Muestre el original en ventanilla <em>solo</em> para inspección visual, y entregue una fotocopia o <strong>Copia Certificada Notarial con Cinta Roja</strong>.",
    warn_2: "2. <strong>La Trampa de «En Inglés Está Bien»:</strong> Aunque en papel la norma acepta inglés, en la vida real los funcionarios rechazan rutinariamente documentos en inglés sin traducir. Llevar <strong>Traducciones Notariales al Hebreo (Cinta Roja)</strong> elimina su excusa #1 para rechazarlo.",
    c1_sub: "<em>(Partida Literal / Long-Form con AMBOS padres — nunca un extracto corto)</em>",
    c2_sub: "<em>(Las 3 categorías: País de nacimiento + Ciudadanía + Todo país vivido >1 año desde los 14 años)</em>",
    c3_sub: "<em>(Cubre soltería/estado actual + cualquier sentencia de divorcio previa)</em>",
    c4_sub: "<em>(En membrete oficial con sello húmedo y su n.º exacto de pasaporte)</em>",
    c5_txt: "<strong>Autoridad de Apostilla Correcta:</strong> Apostilla Federal en Antecedentes Federales (ej. Depto. de Estado en EE.UU., ¡no notario estatal!) y Apostilla correspondiente en Registros Civiles",
    lbl_days: "Días Desde la Emisión de Antecedentes/Soltería (Máx. 180):",
    lbl_pass: "Meses de Validez Restantes en su Pasaporte (Mín. 24m):",
    lbl_name: "¿Coinciden Todos los Nombres Letra por Letra en Partida, Pasaporte y Cartas?",
    nm_exact: "✅ Sí — Exactamente la misma ortografía en cada documento",
    nm_bridged: "🛡️ Diferente (Cambio de Nombre / Nombre Hebreo / Matrimonio), CON Acta Apostillada o Declaración Jurada de Abogado",
    nm_unbridged: "⚠️ Diferente (ej. Partida dice 'Adam' y Pasaporte dice 'Yakov') — Sin Declaración Jurada Aún",
    lbl_trans: "Estado de Traducción de sus Certificados Extranjeros:",
    tr_notarized: "🎀 Todo Traducido al Hebreo con Sello Notarial de Cinta Roja (A Prueba de Funcionarios)",
    tr_english: "⚠️ Solo en Inglés Sin Traducir (Legal en papel, ¡pero alto riesgo de rechazo en ventanilla!)",
    tr_foreign: "🛑 En Español / Francés / Alemán / Ruso sin Traducción Notarial al Hebreo",
    lbl_orig: "Protección de Originales (Fotocopias / Copias Certificadas Listas para Entregar):",
    or_ready: "✅ Tengo copias completas para entregar al funcionario y NUNCA entregaré mis originales físicos",
    or_only: "🚨 Solo tengo mi único juego de originales ahora mismo (¡Necesito copias / Copias Certificadas Notariales!)",
    btn_run: "✅ Ejecutar Auditoría Completa de Carpeta y Factores X →",
    err_c1: "❌ <strong>Falta Partida de Nacimiento Literal (Long-Form):</strong> Debe incluir los nombres de ambos padres + Apostilla original.",
    err_c2: "❌ <strong>Faltan Antecedentes Penales de las 3 Categorías:</strong> Requerido de (1) Nacimiento, (2) Ciudadanía y (3) Todo país donde vivió >12 meses desde los 14 años.",
    err_c3: "❌ <strong>Falta Certificado de Soltería / Historial Civil Completo:</strong> Debe cubrir estado actual y todo divorcio previo + Apostilla.",
    err_c4: "❌ <strong>Falta Prueba de Judaísmo / Carpeta Rabínica:</strong> Certificado ortodoxo o cartas del Rabino y Beit Din con n.º exacto de pasaporte.",
    err_c5: "🚨 <strong>Autoridad de Apostilla Incorrecta (Trampa Federal vs. Estatal):</strong> ¡Los antecedentes federales exigen Apostilla Federal del Ministerio/Depto. de Estado!",
    err_days_exp: "🚨 <strong>RELOJ DE 180 DÍAS VENCIDO ({d} días):</strong> ¡El Misrad HaPanim rechaza antecedentes y soltería con más de 180 días de emisión!",
    adv_days_warn: "⚠️ <strong>Zona de Peligro de 180 Días (quedan {left} días):</strong> ¡Presente de inmediato o genere la Solicitud de Prórroga de 30/60 Días en la Tarjeta #3 abajo!",
    err_pass: "🚨 <strong>Trampa de Validez del Pasaporte (quedan {m} meses):</strong> El pasaporte extranjero debe tener al menos 24 meses (2 años) de vigencia para estampar visas B/1 o A/5. ¡Renuévelo ya!",
    adv_name_bridged: "🛡️ <strong>Cambio/Diferencia de Nombre Protegida:</strong> Lleve su <strong>Certificado de Cambio de Nombre Apostillado</strong> + <strong>Declaración Jurada de Abogado «Misma Persona» (Tatzhir)</strong>.",
    err_name_unbridged: "🚨 <strong>Diferencia de Nombre Sin Vincular (Partida vs. Pasaporte):</strong> NO está descalificado si cambió su nombre, ¡pero DEBE adjuntar un <strong>Certificado de Cambio de Nombre Apostillado</strong> O solicitar una <strong>Declaración Jurada Notarial «Misma Persona» (Tatzhir)</strong> con nuestro Escritorio Legal abajo!",
    adv_trans_eng: "🚨 <strong>Advertencia de Ventanilla (Documentos en Inglés Sin Traducir):</strong> Aunque la ley escrita acepta inglés, en la práctica los funcionarios suelen exigir <strong>Traducción Notarial al Hebreo con Cinta Roja</strong>.",
    err_trans_for: "🛑 <strong>Falta Traducción Notarial Obligatoria al Hebreo:</strong> Todo documento en español, francés, alemán o ruso DEBE llevar traducción notarial israelí con Cinta Roja.",
    err_orig: "🛑 <strong>TRAMPA CRÍTICA DE ORIGINALES:</strong> ¡NUNCA entregue su único original! Si el funcionario lo archiva, no lo recuperará jamás y lo necesitará para otras etapas de su vida (Rabanut, Beit Din, matrimonio, renovaciones). ¡Prepare fotocopias o Copias Certificadas Notariales ahora!",
    ok_head: "🟢 CARPETA 100% BLINDADA ({left} Días Restantes del Reloj de 180 • Pasaporte Válido {m}m)",
    ok_body: "Los 5 certificados clave, autoridades de Apostilla, nombres, traducciones y copias de resguardo están verificados. <strong>Recuerde en ventanilla:</strong> muestre los originales SOLO a la vista, entregue las copias y ¡salga con todos sus originales en la mano!",
    blk_head: "🛑 Riesgos Críticos de Rechazo / Congelación Detectados ({n}):",
    adv_head: "⚠️ Advertencias Reales de Campo ({n}):",
    btn_fix: "🎀 Resolver Traducción, Copia Certificada o Declaración de Nombres con Nuestro Equipo Legal →"
  },
  de: {
    pill: "🛡️ Vorab-Akten-, Apostillen- & Schalter-Realitäts-Audit",
    h2: "🛡️ 2. Heimat-Dossier-, Namensabgleich- & Original-Schutz-Prüfer",
    lead: "Prüfen Sie Ihr <strong>{j}</strong>-Paket vor dem Schaltertermin, damit kein Sachbearbeiter Ihre Akte blockieren kann:",
    warn_title: "🚨 WICHTIGE PRAXIS-WARNUNG: GEBEN SIE NIEMALS EIN ORIGINALDOKUMENT AB!",
    warn_1: "1. <strong>Behalten Sie Immer Ihre Originale:</strong> Sachbearbeiter verlangen oft Ihre originale Geburtsurkunde, Heiratsurkunde oder Apostille und behalten sie ein — wo sie im System auf Nimmerwiedersehen verschwindet. <strong>Geben Sie UNTER KEINEN UMSTÄNDEN ein Original zum Verbleib ab!</strong> Sie benötigen genau diese Originale noch für andere Dinge im Leben (wie das Rabbinat, das Beit Din, die Eheschließung oder Visaverlängerungen). Zeigen Sie das Original am Schalter <em>nur</em> zur Sichtprüfung vor und übergeben Sie eine Kopie oder eine <strong>Notariell Beglaubigte Kopie (Rotes Band)</strong>.",
    warn_2: "2. <strong>Die «Englisch Reicht Aus»-Falle:</strong> Obwohl das Gesetz auf dem Papier englische Dokumente erlaubt, lehnen Schalterbeamte unübersetzte englische Urkunden in der Praxis regelmäßig ab. Eine <strong>Hebräische Notar-Übersetzung (Rotes Band)</strong> nimmt ihnen jede Ausrede.",
    c1_sub: "<em>(Vollständiger Registerauszug / Long-Form mit BEIDEN Eltern)</em>",
    c2_sub: "<em>(Alle 3 Kategorien: Geburtsland + Staatsbürgerschaft + Jedes Land >1 Jahr seit dem 14. Lebensjahr)</em>",
    c3_sub: "<em>(Deckt aktuellen Familienstand + alle früheren Scheidungsurteile ab)</em>",
    c4_sub: "<em>(Auf offiziellem Briefkopf mit Originalstempel & exakter Passnummer)</em>",
    c5_txt: "<strong>Korrekte Apostillen-Behörde:</strong> Bundes-Apostille auf Bundes-Führungszeugnis (z.B. US Dept. of State / BfAA, kein Landesnotar!) & Landes-Apostille auf Personenstandsurkunden",
    lbl_days: "Tage Seit Ausstellung von Führungszeugnis/Ledigkeit (Max. 180):",
    lbl_pass: "Restgültigkeit des Reisepasses in Monaten (Min. 24m):",
    lbl_name: "Stimmen Alle Namen Buchstabe für Buchstabe Überein (Geburtsurkunde, Pass, Briefe)?",
    nm_exact: "✅ Ja — Exakt dieselbe Schreibweise auf jedem Dokument",
    nm_bridged: "🛡️ Abweichend (Namensänderung / Hebr. Name / Heirat), MIT Apostillierter Urkunde oder Anwalts-Affidavit",
    nm_unbridged: "⚠️ Abweichend (z.B. Geburtsurkunde sagt 'Adam' & Pass sagt 'Yakov') — Noch Ohne Überbrückungs-Affidavit",
    lbl_trans: "Übersetzungsstatus Ihrer Ausländischen Urkunden:",
    tr_notarized: "🎀 Alles ins Hebräische Übersetzt mit Israelischem Rotes-Band-Notarsiegel (Schalter-Sicher)",
    tr_english: "⚠️ Nur auf Englisch Ohne Übersetzung (Auf dem Papier legal, aber hohes Ablehnungsrisiko am Schalter!)",
    tr_foreign: "🛑 Auf Deutsch / Französisch / Spanisch / Russisch ohne Hebräische Notar-Übersetzung",
    lbl_orig: "Original-Schutz (Fotokopien / Beglaubigte Kopien zur Abgabe Bereit):",
    or_ready: "✅ Ich habe vollständige Kopien zur Abgabe und gebe NIEMALS meine physischen Originale aus der Hand",
    or_only: "🚨 Ich habe derzeit nur mein einziges Original-Set (Kopien / Notariell Beglaubigte Kopien nötig!)",
    btn_run: "✅ Vollständiges Dossier- & X-Faktor-Audit Starten →",
    err_c1: "❌ <strong>Vollständige Geburtsurkunde (Long-Form) Fehlt:</strong> Muss beide Eltern nennen + Original-Apostille tragen.",
    err_c2: "❌ <strong>Führungszeugnis Aller 3 Kategorien Fehlt:</strong> Erforderlich aus (1) Geburtsland, (2) Staatsbürgerschaft und (3) Jedem Land >12 Monate seit dem 14. Lebensjahr.",
    err_c3: "❌ <strong>Ledigkeits- / Familienstandsnachweis Fehlt:</strong> Muss aktuellen Stand und jede frühere Scheidung + Apostille abdecken.",
    err_c4: "❌ <strong>Judentumsnachweis / Rabbinisches Dossier Fehlt:</strong> Orthodoxer Nachweis oder Rabbiner- & Beit-Din-Briefe mit exakter Passnummer.",
    err_c5: "🚨 <strong>Falsche Apostillen-Behörde (Bundes- vs. Landes-Falle):</strong> Bundesdokumente benötigen zwingend eine Bundes-Apostille!",
    err_days_exp: "🚨 <strong>180-TAGE-FRIST ABGELAUFEN ({d} Tage alt):</strong> Das Misrad HaPanim lehnt Führungszeugnisse und Ledigkeitsbescheinigungen über 180 Tage strikt ab!",
    adv_days_warn: "⚠️ <strong>180-Tage-Gefahrenzone (noch {left} Tage):</strong> Sofort einreichen oder unten in Karte #3 den 30/60-Tage-Fristverlängerungsantrag erstellen!",
    err_pass: "🚨 <strong>Reisepass-Gültigkeits-Falle (noch {m} Monate):</strong> Ausländische Pässe müssen für B/1- oder A/5-Visa mindestens 24 Monate (2 Jahre) gültig sein. Pass jetzt erneuern!",
    adv_name_bridged: "🛡️ <strong>Namensabweichung Abgesichert:</strong> Bringen Sie Ihre <strong>Apostillierte Namensänderungsurkunde</strong> + ein <strong>Anwaltliches «Personenidentitäts-Affidavit» (Tatzhir)</strong> mit.",
    err_name_unbridged: "🚨 <strong>Ungeklärte Namensabweichung (Geburtsurkunde vs. Pass):</strong> Sie sind NICHT disqualifiziert, müssen aber eine <strong>Apostillierte Namensänderungsurkunde</strong> ODER über unser <strong>Anwaltsbüro unten ein Notarielles Personenidentitäts-Affidavit (Tatzhir)</strong> beifügen!",
    adv_trans_eng: "🚨 <strong>Praxis-Warnung (Unübersetzte Englische Dokumente):</strong> Schalterbeamte lehnen englische Urkunden in der Praxis häufig ab und verlangen <strong>Hebräische Notar-Übersetzungen mit Rotem Band</strong>.",
    err_trans_for: "🛑 <strong>Pflicht-Notarübersetzung ins Hebräische Fehlt:</strong> Jedes Dokument auf Deutsch, Französisch, Spanisch oder Russisch MUSS von einem israelischen Notar (Rotes Band) übersetzt sein.",
    err_orig: "🛑 <strong>KRITISCHE ORIGINAL-FALLE:</strong> Gehen Sie NIEMALS nur mit Ihrem einzigen Original zum Termin! Wenn der Schalterbeamte Ihr Original einbehält, bekommen Sie es oft nie zurück — und es fehlt Ihnen für andere wichtige Dinge im Leben (Rabbinat, Beit Din, Heirat, Verlängerungen). Fertigen Sie jetzt Kopien oder Beglaubigte Kopien an!",
    ok_head: "🟢 100% SCHALTER-SICHERES DOSSIER ({left} Tage auf der 180-Tage-Uhr • Pass Gültig {m}m)",
    ok_body: "Alle 5 Kernurkunden, Apostillen-Behörden, Namensabgleiche, Übersetzungen und Kopien-Schutzmaßnahmen sind bestätigt. <strong>Am Schalter gilt:</strong> Originale NUR zur Ansicht zeigen, Kopien abgeben und jedes Original wieder mitnehmen!",
    blk_head: "🛑 Kritische Ablehnungs- / Akten-Stopp-Risiken Erkannt ({n}):",
    adv_head: "⚠️ Wichtige Praxis-Hinweise ({n}):",
    btn_fix: "🎀 Übersetzung, Beglaubigte Kopien oder Namens-Affidavit Jetzt über Unser Anwaltsbüro Lösen →"
  }
  ,
  ru: {
    "pill": "🛡️ Предполётный аудит пакета документов, Апостиля и защита от чиновников",
    "h2": "🛡️ 2. Инспектор досье страны исхода, совпадения имён и защиты оригиналов",
    "lead": "Проведите эту проверку вашего пакета документов (<strong>{j}</strong>) перед походом к окну МВД, чтобы чиновник не смог заморозить ваше дело:",
    "warn_title": "🚨 ВАЖНОЕ ПОЛЕВОЕ ПРАВИЛО: НИКОГДА НЕ ОТДАВАЙТЕ ОРИГИНАЛЫ ДОКУМЕНТОВ!",
    "warn_1": "1. <strong>Защищайте свои оригиналы:</strong> Инспекторы МВД часто требуют оригинал свидетельства о рождении, браке или Апостиля и оставляют его в папке — где он навсегда теряется в архивах. <strong>НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ не отдавайте оригиналы на хранение!</strong> Эти оригиналы понадобятся вам для Раввината, Бейт-Дина, регистрации брака и продления виз. Покажите оригинал в окне <em>только</em> для визуальной сверки штампа и отдайте в руки инспектору ксерокопию или <strong>нотариально заверенную копию с красной лентой</strong>.",
    "warn_2": "2. <strong>Ловушка «Документы на английском принимаются»:</strong> Хотя формально правила разрешают английский язык, на практике инспекторы МВД регулярно отказываются принимать непереведённые документы. Наличие <strong>нотариального перевода на иврит с красной лентой</strong> лишает их главного повода развернуть вас домой.",
    "c1_sub": "<em>(Полное свидетельство ЗАГС / архивная справка с указанием ОБОИХ родителей)</em>",
    "c2_sub": "<em>(Все 3 категории: Страна рождения + Гражданство + Проживание >1 года с 14 лет)</em>",
    "c3_sub": "<em>(Подтверждение текущего статуса + все предыдущие свидетельства о разводе)</em>",
    "c4_sub": "<em>(На официальном бланке с мокрой печатью и точным номером вашего паспорта)</em>",
    "c5_txt": "<strong>Правильный орган Апостиля:</strong> Федеральный/МВД Апостиль на справке о несудимости и Апостиль ЗАГС/Минюста на свидетельствах",
    "lbl_days": "Сколько дней прошло с даты выдачи справок о несудимости/браке (Макс. 180):",
    "lbl_pass": "Сколько месяцев действует ваш загранпаспорт (Мин. 24 мес.):",
    "lbl_name": "Совпадают ли все имена буква в букву в свидетельстве о рождении, паспорте и письмах?",
    "nm_exact": "✅ Да — абсолютно одинаковое написание во всех документах",
    "nm_bridged": "🛡️ Различаются (смена имени / еврейское имя / брак), НО есть свидетельство о перемене имени с Апостилем или аффидевит адвоката",
    "nm_unbridged": "⚠️ Различаются (напр., в метрике одно имя, а в паспорте другое) — пока нет связующего документа",
    "lbl_trans": "Статус перевода ваших иностранных свидетельств:",
    "tr_notarized": "🎀 Все переведены на иврит с печатью израильского нотариуса и красной лентой (100% защита)",
    "tr_english": "⚠️ Только на английском без перевода (по закону можно, но высокий риск отказа на практике!)",
    "tr_foreign": "🛑 На русском / французском / испанском / немецком без нотариального перевода на иврит",
    "lbl_orig": "Защита оригиналов (готовы ли копии / нотариальные копии для сдачи в окно):",
    "or_ready": "✅ У меня готовы полные копии для инспектора, и я НИКОГДА не отдам физические оригиналы",
    "or_only": "🚨 У меня на руках только 1 комплект оригиналов (нужны копии / нотариальные копии!)",
    "btn_run": "✅ Запустить полную проверку пакета документов →",
    "err_c1": "❌ <strong>Отсутствует полное свидетельство о рождении:</strong> Должны быть указаны имена обоих родителей + оригинальный Апостиль.",
    "err_c2": "❌ <strong>Отсутствует справка о несудимости по 3 категориям:</strong> Требуется из (1) страны рождения, (2) страны гражданства и (3) каждой страны проживания >12 месяцев с 14 лет.",
    "err_c3": "❌ <strong>Отсутствует справка о семейном положении / истории браков:</strong> Должна охватывать текущий статус и все прошлые браки/разводы + Апостиль.",
    "err_c4": "❌ <strong>Отсутствует подтверждение еврейства / раввинское досье:</strong> Требуется Ишур Яадут / Ктуба родителей (для Алии) или письма сопровождающего раввина и Бейт-Дина с номером паспорта.",
    "err_c5": "🚨 <strong>Неверный орган Апостиля:</strong> Справка МВД/ФБР должна иметь профильный государственный Апостиль — инспекторы отклоняют обычные нотариальные заверения без штампа компетентного органа!",
    "err_days_exp": "🚨 <strong>ИСТЁК СРОК 180 ДНЕЙ ({d} дн.):</strong> МВД строго отклоняет справки о несудимости и семейном положении старше 180 дней с даты выдачи!",
    "adv_days_warn": "⚠️ <strong>Опасная зона 180-дневного таймера (осталось {left} дн.):</strong> Подавайте немедленно или сгенерируйте запрос на 30-дневную отсрочку ниже!",
    "err_pass": "🚨 <strong>Ловушка срока действия паспорта (осталось {m} мес.):</strong> Правила МВД требуют, чтобы загранпаспорт был действителен минимум 24 месяца (2 полных года) для выдачи виз B/1, A/5 или смены статуса. Срочно обновите паспорт!",
    "adv_name_bridged": "🛡️ <strong>Расхождение имён защищено:</strong> Возьмите с собой <strong>свидетельство о перемене имени с Апостилем</strong> + <strong>декларацию адвоката об одноимённости (Тацхир «Отo же самое лицо»)</strong>.",
    "err_name_unbridged": "🚨 <strong>Незакрытое расхождение имён (Метрика vs Паспорт):</strong> Вы НЕ дисквалифицированы, если меняли имя или фамилию, но вы ОБЯЗАНЫ приложить <strong>свидетельство о перемене имени с Апостилем</strong> ИЛИ заказать у нашего <strong>партнёрского юридического отдела декларацию об одноимённости (Тацхир)</strong> до визита в МВД!",
    "adv_trans_eng": "🚨 <strong>Предупреждение по документам на английском:</strong> Инспекторы МВД регулярно отказываются принимать английские свидетельства и требуют <strong>нотариальный перевод на иврит с красной лентой</strong>.",
    "err_trans_for": "🛑 <strong>Отсутствует обязательный нотариальный перевод на иврит:</strong> Любой документ на русском, украинском, французском, испанском или немецком ОБЯЗАН иметь заверенный перевод израильского нотариуса с красной лентой.",
    "err_orig": "🛑 <strong>КРИТИЧЕСКАЯ ЛОВУШКА С ОРИГИНАЛАМИ:</strong> НИКОГДА не идите в МВД только с одним оригиналом! Если вы отдадите инспектору оригинал свидетельства о рождении или Апостиля, его подошьют в дело и не вернут — а он понадобится вам для Раввината и Бейт-Дина. Сделайте копии или нотариальные копии прямо сейчас!",
    "ok_head": "🟢 ПАКЕТ ДОКУМЕНТОВ 100% ГОТОВ К ПРОВЕРКЕ МВД (Осталось {left} дн. из 180 • Паспорт: {m} мес.)",
    "ok_body": "Все 5 ключевых справок, штампы Апостиля, совпадение имён, переводы на иврит и защита оригиналов подтверждены. <strong>Помните у окна МВД:</strong> показывайте оригиналы ТОЛЬКО из своих рук для осмотра, отдавайте копии и уходите со всеми оригиналами!",
    "blk_head": "🛑 Обнаружены критические риски отказа / заморозки дела ({n}):",
    "adv_head": "⚠️ Важные практические рекомендации ({n}):",
    "btn_fix": "🎀 Оформить нотариальный перевод, заверенную копию или декларацию об имени с нашим юр. отделом →"
}
};

window.validateHomelandDossier = function() {
  if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged('ran_packet_audit');
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  const a = window.AUDIT_I18N[l] || window.AUDIT_I18N.en;

  const days = parseInt((document.getElementById('chk-days') || {}).value || '0', 10);
  const passMonths = parseInt((document.getElementById('chk-pass-months') || {}).value || '36', 10);
  const nameStatus = ((document.getElementById('chk-name-match') || {}).value) || 'exact';
  const transStatus = ((document.getElementById('chk-hebrew-trans') || {}).value) || 'notarized';
  const origStatus = ((document.getElementById('chk-orig-copies') || {}).value) || 'copies_ready';

  const c1 = (document.getElementById('chk-birth') || {}).checked;
  const c2 = (document.getElementById('chk-police') || {}).checked;
  const c3 = (document.getElementById('chk-single') || {}).checked;
  const c4 = (document.getElementById('chk-family') || {}).checked;
  const c5 = (document.getElementById('chk-apostille-auth') || {}).checked;

  const out = document.getElementById('chk-out');
  if (!out) return;
  out.style.display = 'block';

  const blockers = [];
  const advisories = [];

  if (!c1) blockers.push(a.err_c1);
  if (!c2) blockers.push(a.err_c2);
  if (!c3) blockers.push(a.err_c3);
  if (!c4) blockers.push(a.err_c4);
  if (!c5) blockers.push(a.err_c5);

  if (days > 180) {
    blockers.push(a.err_days_exp.replace('{d}', days));
  } else if (days > 145) {
    advisories.push(a.adv_days_warn.replace('{left}', (180 - days)));
  }

  if (passMonths < 24) {
    blockers.push(a.err_pass.replace('{m}', passMonths));
  }

  if (nameStatus === 'bridged') {
    advisories.push(a.adv_name_bridged);
  } else if (nameStatus === 'unbridged') {
    blockers.push(a.err_name_unbridged);
  }

  if (transStatus === 'english_raw') {
    advisories.push(a.adv_trans_eng);
  } else if (transStatus === 'foreign_lang') {
    blockers.push(a.err_trans_for);
  }

  if (origStatus !== 'copies_ready') {
    blockers.push(a.err_orig);
  }

  const borderSide = (l === 'he') ? 'border-right' : 'border-left';
  let html = '';
  if (blockers.length === 0 && advisories.length === 0) {
    out.style.background = '#ecfdf5'; out.style.borderColor = '#10b981';
    html = '<div style="font-weight:900;color:#065f46;font-size:0.95rem;">' + a.ok_head.replace('{left}', (180 - days)).replace('{m}', passMonths) + '</div>' +
           '<div style="font-size:0.84rem;color:#047857;margin-top:6px;line-height:1.5;">' + a.ok_body + '</div>';
  } else {
    out.style.background = blockers.length ? '#fff1f2' : '#fffbeb';
    out.style.borderColor = blockers.length ? '#f43f5e' : '#f59e0b';
    if (blockers.length) {
      html += '<div style="font-weight:900;color:#9f1239;font-size:0.94rem;margin-bottom:8px;">' + a.blk_head.replace('{n}', blockers.length) + '</div>' +
              blockers.map(b => '<div style="font-size:0.84rem;color:#881337;margin-bottom:7px;line-height:1.45;padding:7px 10px;background:#fff;' + borderSide + ':3.5px solid #e11d48;border-radius:6px;">' + b + '</div>').join('');
    }
    if (advisories.length) {
      html += '<div style="font-weight:900;color:#92400e;font-size:0.9rem;margin:10px 0 6px;">' + a.adv_head.replace('{n}', advisories.length) + '</div>' +
              advisories.map(adv => '<div style="font-size:0.83rem;color:#78350f;margin-bottom:7px;line-height:1.45;padding:7px 10px;background:#fff;' + borderSide + ':3.5px solid #f59e0b;border-radius:6px;">' + adv + '</div>').join('');
    }
    html += '<button type="button" class="btn" style="margin-top:10px;background:#0b3b59;padding:12px;" onclick="openMod(\'vetted-team\'); selectConciergeSvc(3);">' + a.btn_fix + '</button>';
  }
  out.innerHTML = html;
};

const RB_LABELS = {
  en: { lblType: "Letter Type:", opts: ["🕍 Community Synagogue Rabbi (אישור רב קהילה לבית הדין)", "🕯️ Observant Shabbat Host Family (אישור משפחה מארחת / מלווה)", "🚨 Diaspora Beit Din Emergency Transfer & Safety Attestation (אישור העברת תיק בחירום)"], lblRabbi: "Rabbi or Host Family Name & City:", lblMonths: "Months of Attendance & Shabbatot Hosted:" },
  he: { lblType: "סוג מכתב ההמלצה:", opts: ["🕍 רב בית כנסת / קהילה (אישור רב קהילה לבית הדין)", "🕯️ משפחה מלווה / מארחת בשבתות (אישור משפחה מלווה)", "🚨 אישור חירום מבית דין בחו״ל להעברת תיק / קיצור 9 חודשים"], lblRabbi: "שם הרב או המשפחה המארחת והעיר:", lblMonths: "חודשי השתתפות ושבתות אירוח:" },
  fr: { lblType: "Type de Lettre :", opts: ["🕍 Rabbin de Synagogue / Communauté (אישור רב קהילה)", "🕯️ Famille d'Accueil de Chabbat (אישור משפחה מלווה)", "🚨 Attestation d'Urgence Beit Din Diaspora & Transfert (אישור העברת תיק בחירום)"], lblRabbi: "Nom du Rabbin ou de la Famille Hôte & Ville :", lblMonths: "Mois de Présence & Chabbatot Accueillis :" },
  es: { lblType: "Tipo de Carta:", opts: ["🕍 Rabino de Sinagoga / Comunidad (אישור רב קהילה)", "🕯️ Familia Anfitriona de Shabat (אישור משפחה מלווה)", "🚨 Certificado de Emergencia Beit Din Diáspora y Transferencia (אישור העברת תיק בחירום)"], lblRabbi: "Nombre del Rabino o Familia Anfitriona y Ciudad:", lblMonths: "Meses de Asistencia y Shabatot Compartidos:" },
  de: { lblType: "Art des Schreibens:", opts: ["🕍 Gemeindesynagogen-Rabbiner (אישור רב קהילה)", "🕯️ Schabbat-Gastfamilie (אישור משפחה מלווה)", "🚨 Notfall-Bestätigung Auslands-Beit-Din & Aktenübertragung (אישור העברת תיק בחירום)"], lblRabbi: "Name des Rabbiners oder der Gastfamilie & Stadt:", lblMonths: "Monate der Teilnahme & Schabbat-Besuche:" },
  ru: { lblType: "Тип рекомендательного письма:", opts: ["🕍 Раввин синагоги / общины (אישור רב קהילה לבית הדין)", "🕯️ Принимающая шаббатняя семья (אישור משפחה מארחת / מלווה)", "🚨 Экстренное письмо зарубежного Бейт-Дина о переводе дела (אישור העברת תיק בחירום)"], lblRabbi: "Имя раввина или принимающей семьи и город:", lblMonths: "Месяцы посещения и проведённые Шаббаты:" }
};
const APP_UI = {
  en: {
    back: "← Back to Guide",
    tabs: ["📸 Hebrew & Forms", "✍️ Rabbi Letters", "🕍 200 Beit Din Deck", "📱 80 Couples Sync", "🎵 Songs & Prayers"],
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
    m5_h2: "🎵 Songs & Prayers Trainer — Shabbat, Shacharit & Essential Brachot",
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
    m5_h2: "🎵 מאמן שירים ותפילות — שבת, שחרית וברכות יסוד",
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
    m5_h2: "🎵 Entrenador de Cantos y Rezos — Shabat, Shajarit y Berajot",
    m5_p: "Cantos y bendiciones requeridos en la entrevista final del Beit Din:"
  },
  de: {
    back: "← Zurück zum Leitfaden",
    tabs: ["📸 Hebräisch & Asch/1", "✍️ Rabbiner-Briefe", "🕍 200 Beit Din Fragen", "📱 80 Paar-Fragen", "🎵 Lieder & Gebete"],
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
  ,
  ru: {
    "back": "← Назад к гиду",
    "tabs": [
        "📸 Иврит и Формы",
        "✍️ Письма раввина",
        "🕍 200 Бейт-Дин",
        "📱 80 Вопросов парам",
        "🎵 Песни и Молитвы"
    ],
    "m1_h2": "📸 Декодер писем МВД и Генератор официальных бланков на иврите",
    "m1_p": "Выберите официальный документ на иврите ниже. Точные названия справок МВД и ЗАГС вашей страны автоматически подставляются в юридический шаблон:",
    "m1_lbl_type": "Выберите официальный документ на иврите для генерации:",
    "m1_opts": [
        "🛡️ Запрос на 30-дневную отсрочку против закрытия дела (בקשת הארכת מועד - מניעת סגירת תיק)",
        "⚖️ Сопроводительное письмо в Комиссию по исключениям (מכתב הסבר לוועדת חריגים - טופס אש/1)",
        "📜 Пояснительное досье по справке о несудимости / прошлым делам (מכתב הסבר לתעודת יושר)",
        "🚨 Экстренное прошение об отмене правила 9 месяцев и переводе Бейт-Дина (בקשת חירום - אנטישמיות)"
    ],
    "m1_name": "Полное имя (как в загранпаспорте):",
    "m1_pass": "Номер паспорта и страна выдачи:",
    "m1_facts": "Ключевые факты (названия справок ЗАГС/МВД вашей страны включены автоматически):",
    "m1_btn": "Сгенерировать готовый к печати документ на иврите →",
    "m2_h2": "✍️ Генератор рекомендательных писем от раввина и шаббатней семьи",
    "m2_p": "Решите проблему «Напишите сами на иврите, а я подпишу!». Сгенерируйте официальный черновик для Бейт-Дина и отправьте в WhatsApp:",
    "m2_btn": "Сгенерировать письмо на иврите + Скопировать для WhatsApp →",
    "m3_h2": "🕍 Тренажёр трибунала Бейт-Дин (200 вопросов Маамад Бейт-Дин)",
    "m3_p": "Нажмите на карточку, чтобы увидеть точный галахический ответ, который ожидают услышать даяним:",
    "m3_btn": "Следующий вопрос Бейт-Дина (Базовая колода 200) →",
    "m4_h2": "📱 Перекрёстный опрос пар в МВД (80 вопросов в разных кабинетах)",
    "m4_p": "По процедуре 5.2.0008 / 5.2.0009 инспекторы МВД разводят партнёров по разным комнатам. Отработайте эти каверзные вопросы вместе:",
    "m4_btn": "Следующий вопрос для пар →",
    "m5_h2": "🎵 Тренажёр песен и молитв — Шаббат, Шахарит и основные Брахот",
    "m5_p": "Каждого кандидата в гиюр просят прочитать или спеть молитвы из этого базового списка за столом Бейт-Дина:"
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
      ['de', '🇩🇪/🇦🇹 Deutsch (DACH)'],
      ['ru', '🇷🇺 Русский (RU)']
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
    <div class="mod-view active" id="mod-hebrew-engine">
      <div style="background:#e0f2fe;border:1px solid #38bdf8;border-radius:12px;padding:11px 14px;margin-bottom:14px;font-size:0.83rem;color:#0c4a6e;">
        <strong>${j.flag} ${j.name}:</strong> ${j.police} • ${j.birth}
      </div>
      <div class="card" style="border:2px solid #0284c7;background:#f0f9ff;">
        <h2>📥 1. "IN" Translator: Decode Clerk Deficiency Sheet (Drishat Mismachim)</h2>
        <p>Handed a mystery Hebrew checklist by a clerk? Paste the Hebrew text below (or load a real sample) to see the exact homeland & family documents required and activate your 25-day clerk-safe / 45-day statutory file-closure shield:</p>
        <textarea id="in-clerk-txt" rows="3" dir="rtl" placeholder="הדביקו כאן את טקסט דרישת המסמכים בעברית ממשרד הפנים או הרבנות..."></textarea>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn" style="margin-top:0;flex:2;" onclick="decodeClerkSheet()">🔍 Translate Hebrew Clerk Sheet →</button>
          <button class="btn" style="margin-top:0;flex:1;background:#334155;" onclick="loadSampleClerk()">📄 Sample</button>
        </div>
        <div id="in-clerk-out" style="display:none;margin-top:12px;padding:12px;background:#fef2f2;border:1.5px solid #ef4444;border-radius:12px;font-size:0.86rem;"></div>
      </div>

      <div class="card" style="border:2px solid #059669;">
        ${(function(){
          const a = (window.AUDIT_I18N && window.AUDIT_I18N[window.appLang || 'en']) || window.AUDIT_I18N.en;
          return `
            <div style="display:inline-block;background:#dcfce7;color:#065f46;font-size:0.73rem;font-weight:900;padding:3px 10px;border-radius:999px;margin-bottom:6px;text-transform:uppercase;">${a.pill}</div>
            <h2>${a.h2}</h2>
            <p>${a.lead.replace('{j}', j.name)}</p>

            <div style="background:#fff1f2;border:2px solid #f43f5e;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:0.83rem;color:#881337;line-height:1.5;">
              <div style="font-weight:900;font-size:0.88rem;color:#9f1239;margin-bottom:4px;">${a.warn_title}</div>
              <div>${a.warn_1}</div>
              <div style="margin-top:6px;">${a.warn_2}</div>
            </div>

            <label style="display:flex;align-items:flex-start;gap:8px;font-weight:700;margin-top:8px;"><input type="checkbox" id="chk-birth" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;" checked /> <span>${j.birth} ${a.c1_sub}</span></label>
            <label style="display:flex;align-items:flex-start;gap:8px;font-weight:700;margin-top:8px;"><input type="checkbox" id="chk-police" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;" checked /> <span>${j.police} ${a.c2_sub}</span></label>
            <label style="display:flex;align-items:flex-start;gap:8px;font-weight:700;margin-top:8px;"><input type="checkbox" id="chk-single" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;" checked /> <span>${j.single} ${a.c3_sub}</span></label>
            <label style="display:flex;align-items:flex-start;gap:8px;font-weight:700;margin-top:8px;"><input type="checkbox" id="chk-family" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;" checked /> <span>${j.rabbi} ${a.c4_sub}</span></label>
            <label style="display:flex;align-items:flex-start;gap:8px;font-weight:700;margin-top:8px;"><input type="checkbox" id="chk-apostille-auth" style="width:18px;height:18px;margin-top:2px;flex-shrink:0;" checked /> <span>${a.c5_txt}</span></label>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">
              <div>
                <label style="margin-top:0;">${a.lbl_days}</label>
                <input type="number" id="chk-days" value="32" min="0" max="365" />
              </div>
              <div>
                <label style="margin-top:0;">${a.lbl_pass}</label>
                <input type="number" id="chk-pass-months" value="36" min="1" max="120" />
              </div>
            </div>

            <label>${a.lbl_name}</label>
            <select id="chk-name-match">
              <option value="exact">${a.nm_exact}</option>
              <option value="bridged">${a.nm_bridged}</option>
              <option value="unbridged">${a.nm_unbridged}</option>
            </select>

            <label>${a.lbl_trans}</label>
            <select id="chk-hebrew-trans">
              <option value="notarized">${a.tr_notarized}</option>
              <option value="english_raw">${a.tr_english}</option>
              <option value="foreign_lang">${a.tr_foreign}</option>
            </select>

            <label>${a.lbl_orig}</label>
            <select id="chk-orig-copies">
              <option value="copies_ready">${a.or_ready}</option>
              <option value="only_originals">${a.or_only}</option>
            </select>

            <button class="btn btn-emerald" onclick="validateHomelandDossier()">${a.btn_run}</button>
            <div id="chk-out" style="display:none;margin-top:12px;padding:12px;border:2px solid #10b981;border-radius:12px;"></div>
          `;
        })()}
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
        <div id="bd-pack-bar" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;"></div>
        <div id="bd-cat-bar" style="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:10px;"></div>
        <div id="bd-score-bar" style="display:flex;justify-content:space-between;align-items:center;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:8px 12px;margin-bottom:10px;font-size:0.78rem;font-weight:800;color:#0f172a;flex-wrap:wrap;gap:6px;"></div>
        <div class="flashcard" onclick="flipBdCard()">
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%;margin-bottom:8px;gap:8px;">
            <div class="fc-cat" id="bd-cat" style="margin:0;"></div>
            <button type="button" onclick="speakBdTerm(event)" style="background:rgba(56,189,248,0.2);color:#7dd3fc;border:1px solid rgba(56,189,248,0.45);border-radius:999px;padding:4px 10px;font-size:0.73rem;font-weight:800;cursor:pointer;flex-shrink:0;">🔊 <span id="bd-pron-lbl">HE</span></button>
          </div>
          <div class="fc-q" id="bd-q"></div>
          <div class="fc-a" id="bd-a"></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button type="button" class="btn" style="margin:0;flex:1;background:#334155;" onclick="prevBdCard()">←</button>
          <button type="button" class="btn" style="margin:0;flex:2;background:#d97706;" onclick="markBdScore(0)">🔁 <span id="bd-btn-review">Needs Review</span></button>
          <button type="button" class="btn btn-emerald" style="margin:0;flex:2;" onclick="markBdScore(1)">✅ <span id="bd-btn-master">Mastered</span></button>
        </div>
        <button class="btn" style="margin-top:8px;" onclick="nextBdCard()">${u.m3_btn}</button>
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
          <div style="display:flex;flex-direction:column;gap:4px;">
            <span id="cp-lbl-a" style="font-size:0.73rem;font-weight:800;color:#0c4a6e;">Partner A (Room 1)</span>
            <input id="cp-ans-a" placeholder="Partner A Answer..." onkeydown="if(event.key==='Enter'){event.preventDefault();submitMyCpAns();}" style="margin:0;" />
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;">
            <span id="cp-lbl-b" style="font-size:0.73rem;font-weight:800;color:#0c4a6e;">Partner B (Room 2)</span>
            <input id="cp-ans-b" placeholder="Partner B Answer..." onkeydown="if(event.key==='Enter'){event.preventDefault();submitMyCpAns();}" style="margin:0;" />
          </div>
        </div>
        <button type="button" id="cp-submit-btn" class="btn" style="margin-top:8px;padding:11px 14px;background:#0284c7;display:flex;align-items:center;justify-content:center;gap:6px;" onclick="submitMyCpAns()">🔒 Lock In My Answer ↵</button>
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
  if (typeof window.mountUnifiedPibaFormsEngine === 'function') window.mountUnifiedPibaFormsEngine();
}

window.FREE_CP_LIMIT = window.FREE_CP_LIMIT || window.FREE_CARD_LIMIT || 4;
window.FREE_SONG_LIMIT = 999; /* GAT_QA_OPEN_MODE */
function openMod(m) {
  window.currentMod = m;
  document.querySelectorAll('.mod-tab').forEach(b => b.classList.toggle('active', b.dataset.mod === m));
  document.querySelectorAll('.mod-view').forEach(v => v.classList.toggle('active', v.id === 'mod-' + m));
  try {
    if (m === 'songs-prayers' && typeof window.renderSongs12 === 'function') window.renderSongs12();
    if (m === 'beit-din-150' && typeof updateBdCard === 'function') updateBdCard();
    if (m === 'couples-sync' && typeof updateCpCard === 'function') updateCpCard();
    if (m === 'hebrew-engine' && typeof window.mountUnifiedPibaFormsEngine === 'function') window.mountUnifiedPibaFormsEngine();
  } catch (err) { console.error('Module render error:', err); }
}
window.openMod = openMod;

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
  const badge = {en:'EN', he:'HE', fr:'FR', es:'ES', de:'DE', ru:'RU'};
  if (gl) gl.textContent = badge[lang] || 'EN';
  const activeMod = window.currentMod || 'hebrew-engine';
  renderAll();
  openMod(activeMod);
}




// ============================================================================
// STEP 2 & STEP 3: VETTED CONCIERGE / NOTARY INTAKE + PRO PAYWALL GATE
// ============================================================================

window.LEMON_CHECKOUT_URLS = {
  forms_90d_89: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=forms_90d_89",
  forms_life_149: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=forms_life_149",
  bd_suite_90d_149: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_suite_90d_149",
  bd_suite_life_249: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_suite_life_249",
  bd_pack1_65: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_pack1_65",
  bd_pack2_65: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_pack2_65",
  bd_pack3_49: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_pack3_49",
  bd_pack4_49: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_pack4_49",
  bd_all700_179: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=bd_all700_179",
  songs_65: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=songs_65",
  couples_sync_75: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=couples_sync_75",
  couples_90d_129: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=couples_90d_129",
  couples_life_229: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=couples_life_229",
  suite_solo_90d_249: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=suite_solo_90d_249",
  suite_solo_life_399: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=suite_solo_life_399",
  vip_couple_649: "https://giyuraliyahtrack.lemonsqueezy.com/checkout?variant=vip_couple_649"
};

window.CONCIERGE_WHATSAPP = "972559664357";
window.CONCIERGE_EMAIL = "concierge@giyuraliyahtrack.com";

const GAT_CODE_TIER_MAP = {"55a5e6b3bffb18e7822e5297e907c35beb3161ffc75c49e1109f9978f827b240":"forms_90d_89","8575d2a62340999cb5b207c8ddea45a3d69f882a95bf4450440f029bb0f52d3e":"forms_life_149","5470b090e1253b907549423404ce954e2f3f32bae219158fd7ba7be1124fb113":"bd_suite_90d_149","eed0f662bacea98b9d722f8b58719b520e2c33ac302123941456ff31c09bb63a":"bd_suite_life_249","42e383f151f2a9a9b54faf48ea7681e7c24c09de4c888bed089e94e0d21ba408":"couples_90d_129","e36c103b7598eb93ce8234eb03d9e054539f1dcd745df66883011a312fae7878":"couples_life_229","103d7969a5e67888f8e69257bf11261ba67bc1d19bf360a7211b7f63cb94090e":"suite_solo_90d_249","58b2f480939ba9b02361e850f7f5cb47244e433311515b772fb5e9672684a084":"suite_solo_life_399","2868a99ae4f528edc73ef1d4578efe60b44f14d8f16128ab4259d88df742e2c3":"suite_solo_life_399","a10c9b96585ea52f5da6f7efc1267e8c434f1be24968da4d2440e19940776485":"vip_couple_649","3806c36fc793f18d0d97e637adb6bcc235f2ff0454bb8a287d07d4674010ed24":"vip_couple_649"};

window.TIER_CAPABILITIES = {
  forms_90d_89:       { days: 90, forms: true, audit: true, bd: [], songs: false, couples: false, vip2Phone: false, label: '📄 90-Day Hebrew Forms & Clerk Dossier Pass ($89)' },
  forms_life_149:     { days: 0,  forms: true, audit: true, bd: [], songs: false, couples: false, vip2Phone: false, label: '🛡️ Lifetime Hebrew Forms & Annual Renewals Pass ($149)' },
  bd_pack1_65:        { days: 0,  forms: false, audit: false, bd: [1], songs: false, couples: false, vip2Phone: false, label: '📚 Beit Din Pack 1: Core 200 Deck ($65)' },
  bd_pack2_65:        { days: 0,  forms: false, audit: false, bd: [2], songs: false, couples: false, vip2Phone: false, label: '🔥 Beit Din Pack 2: +200 Curveballs Deck ($65)' },
  bd_pack3_49:        { days: 0,  forms: false, audit: false, bd: [3], songs: false, couples: false, vip2Phone: false, label: '🧔 Beit Din Pack 3: Men\'s 150 Deck ($49)' },
  bd_pack4_49:        { days: 0,  forms: false, audit: false, bd: [4], songs: false, couples: false, vip2Phone: false, label: '👩 Beit Din Pack 4: Women\'s 150 Deck ($49)' },
  bd_all700_179:      { days: 0,  forms: false, audit: false, bd: [1,2,3,4], songs: false, couples: false, vip2Phone: false, label: '🕍 All 700 Beit Din Questions Pass ($179)' },
  songs_65:           { days: 0,  forms: false, audit: false, bd: [], songs: true, couples: false, vip2Phone: false, label: '🎵 13 Shabbat Songs & Pronunciation Grader ($65)' },
  bd_suite_90d_149:   { days: 90, forms: false, audit: false, bd: [1,2,3,4], songs: true, couples: false, vip2Phone: false, label: '⚡ 90-Day Beit Din 700-Q & Shabbat Suite ($149)' },
  bd_suite_life_249:  { days: 0,  forms: false, audit: false, bd: [1,2,3,4], songs: true, couples: false, vip2Phone: false, label: '🛡️ Lifetime Beit Din 700-Q & Shabbat Suite ($249)' },
  couples_sync_75:    { days: 90, forms: false, audit: false, bd: [], songs: false, couples: true, vip2Phone: true, label: '📱 80-Q Separated Couples 2-Phone Sync ($75)' },
  couples_90d_129:    { days: 90, forms: false, audit: true, bd: [], songs: false, couples: true, vip2Phone: true, label: '⚡ 90-Day Spousal Visa 2-Phone Sync + Pre-Flight Packet Audit ($129)' },
  couples_life_229:   { days: 0,  forms: false, audit: true, bd: [], songs: false, couples: true, vip2Phone: true, label: '🛡️ Lifetime 5-Year Graduated Residency Sync + Packet Audit ($229)' },
  suite_solo_90d_249: { days: 90, forms: true, audit: true, bd: [1,2,3,4], songs: true, couples: true, vip2Phone: false, label: '⚡ 90-Day Full Dual-Track Solo Suite ($249)' },
  suite_solo_life_399:{ days: 0,  forms: true, audit: true, bd: [1,2,3,4], songs: true, couples: true, vip2Phone: false, label: '🛡️ Complete Track Lifetime Solo Shield ($399)' },
  vip_couple_649:     { days: 0,  forms: true, audit: true, bd: [1,2,3,4], songs: true, couples: true, vip2Phone: true, label: '👑 VIP Couple 2-Phone Lifetime Suite + Pre-Flight Packet Audit ($649)' }
};

window.switchPaywallTab = function(tab) {
  const vs = document.getElementById('pw-view-suites');
  const vm = document.getElementById('pw-view-modular');
  const bs = document.getElementById('pw-tab-btn-suites');
  const bm = document.getElementById('pw-tab-btn-modular');
  if (!vs || !vm) return;
  if (tab === 'modular') {
    vs.style.display = 'none'; vm.style.display = 'grid';
    if (bm) { bm.style.background = '#0288E8'; bm.style.color = '#fff'; bm.style.borderColor = '#0288E8'; }
    if (bs) { bs.style.background = '#f8fafc'; bs.style.color = '#0f172a'; bs.style.borderColor = '#cbd5e1'; }
  } else {
    vs.style.display = 'grid'; vm.style.display = 'none';
    if (bs) { bs.style.background = '#0288E8'; bs.style.color = '#fff'; bs.style.borderColor = '#0288E8'; }
    if (bm) { bm.style.background = '#f8fafc'; bm.style.color = '#0f172a'; bm.style.borderColor = '#cbd5e1'; }
  }
};

window.getUnlockedTiersMap = function() {
  let map = {};
  try { map = JSON.parse(localStorage.getItem('gat_entitlements_v2') || '{}'); } catch(e) { map = {}; }
  localStorage.removeItem('gat_unlocked_tier');
  const now = Date.now();
  let changed = false;
  Object.keys(map).forEach(k => {
    if (map[k] && map[k].exp > 0 && now > map[k].exp) {
      delete map[k];
      changed = true;
    }
  });
  if (changed) localStorage.setItem('gat_entitlements_v2', JSON.stringify(map));
  return map;
};

window.hasCapability = function(checkFn) {
  if (localStorage.getItem('gat_partner_vip_shared') === '1') return true;
  const map = window.getUnlockedTiersMap();
  const keys = Object.keys(map);
  for (let i = 0; i < keys.length; i++) {
    const cap = window.TIER_CAPABILITIES[keys[i]];
    if (cap && checkFn(cap)) return true;
  }
  return false;
};

window.canUnlockForms = function() { return window.hasCapability(c => !!c.forms); };
window.canUnlockAudit = function() { return window.hasCapability(c => !!c.audit); };
window.canUnlockSongs = function() { return window.hasCapability(c => !!c.songs); };
window.canUnlockCouples = function() { return window.hasCapability(c => !!c.couples); };
window.canUnlockBdPack = function(packNum) {
  const p = packNum || window.bdPack || 1;
  return window.hasCapability(c => Array.isArray(c.bd) && c.bd.indexOf(p) !== -1);
};
window.isVip449 = function() {
  return window.hasCapability(c => !!c.vip2Phone);
};
window.getActiveTier = function() {
  const keys = Object.keys(window.getUnlockedTiersMap());
  return keys.length ? keys[keys.length - 1] : '';
};

window.isProUnlocked = function() {
  const mod = window.currentMod || '';
  if (mod === 'beit-din-150') return window.canUnlockBdPack(window.bdPack || 1);
  if (mod === 'couples-sync') return window.canUnlockCouples();
  if (mod === 'songs-prayers') return window.canUnlockSongs();
  if (mod === 'hebrew-engine' || mod === 'rabbi-letters') return window.canUnlockForms();
  return window.canUnlockBdPack(1) && window.canUnlockCouples() && window.canUnlockForms();
};


window.PW_I18N = {
  en: {
    badge: "🛡️ Giyur Aliyah Track Command Shield",
    title: "Select Your 90-Day Sprint or Lifetime Track Pass",
    default_reason: "Skip the 25,000₪ law firm retainer. Unlock your specific module below or get the Complete Track Shield:",
    tab_suites: "🛡️ Complete Suites & Bundles",
    tab_modular: "🎯 Individual Engines & Decks",
    s1_name: "📄 Statutory Hebrew Forms Engine",
    s1_sub: "90-Day Sprint",
    s1_desc: "Unlimited edits & clean PDF prints for Ash/1, Ash/3, Michtav Hesber, 30-Day Extension, Rabbi Letterheads & Clerk Decoder. (Or <strong>$149 Lifetime</strong>).",
    s1_b1: "90-Day ($89)",
    s1_b2: "Lifetime ($149)",
    s2_name: "🕍 Beit Din 700-Q & Shabbat Suite",
    s2_sub: "90-Day Cram",
    s2_desc: "All 700 Beit Din Questions (Core 200 + 200 Curveballs + Men's 150 + Women's 150) + Songs, Morning Prayers & Essential Brachot + Pronunciation Grader.",
    s2_b1: "90-Day ($149)",
    s2_b2: "Lifetime ($249)",
    s3_name: "📱 Spousal Visa 2-Phone Sync + Audit",
    s3_sub: "90-Day (2 Phones)",
    s3_desc: "80-Question Nohal 5.2.0008 Separated Room 2-Phone E2EE Matcher + Pre-Flight Document & Apostille Inspector. (Or <strong>$229 5-Yr Residency</strong>).",
    s3_b1: "90-Day ($129)",
    s3_b2: "5-Yr Pass ($229)",
    s4_badge: "★ Complete Track",
    s4_name: "👑 Full Dual-Track Suite + Packet Audit",
    s4_desc: "All 3 Engines Unlocked (Forms + 700 Beit Din + Songs + 80 Couples Sync + Pre-Flight Dossier & Apostille Audit):",
    s4_b1: "90d Solo ($249)",
    s4_b2: "Life Solo ($399)",
    s4_b3: "👑 VIP Couple 2-Phone Lifetime + Packet Audit ($649) →",
    m1_name: "📚 Core 200 OR +200 Curveballs",
    m1_sub: "per 200-card deck",
    m1_desc: "Unlock Pack 1 (Core 200 Dayanim Questions) or Pack 2 (+200 Advanced Curveballs) individually:",
    m1_b1: "Pack 1 ($65)",
    m1_b2: "Pack 2 ($65)",
    m2_name: "🧔 Men's 150 OR 👩 Women's 150",
    m2_sub: "per 150-card deck",
    m2_desc: "Unlock Pack 3 (Men's 150 Halacha Deck) or Pack 4 (Women's 150 Halacha Deck) individually:",
    m2_b1: "Men's 150 ($49)",
    m2_b2: "Women's 150 ($49)",
    m3_name: "🕍 All 700 Beit Din Questions Only",
    m3_sub: "all 4 card packs",
    m3_desc: "Unlocks all 700 Beit Din flashcards (Core 200 + 200 Curveballs + Men's 150 + Women's 150).",
    m3_b1: "Unlock All 700 Cards ($179) →",
    m4_name: "🎵 Songs Grader OR 📱 80-Q Sync Only",
    m4_sub: "standalone",
    m4_desc: "Unlock the Songs, Morning Prayers & Essential Brachot Grader ($65) or standalone 80-Q 2-Phone Sync ($75):",
    m4_b1: "Songs ($65)",
    m4_b2: "80-Q Sync ($75)",
    code_ph: "Have a VIP / Promo Unlock Code? Enter here...",
    code_btn: "Unlock",
    code_empty: "❌ Please enter a VIP or Promo code.",
    code_verifying: "🔐 Verifying code...",
    code_invalid: "❌ Invalid code. Choose a pass above or enter a valid code.",
    code_ok: "✅ Unlocked: ",
    pack2_pw: "🔥 Unlock Pack 2: +200 Advanced Dayanim Curveballs ($65 standalone, or $149 for the complete 700-Q + Shabbat Suite):",
    pack3_pw: "🧔 Unlock Pack 3: Men's 150 Halacha Deck ($49 standalone, or $149 for the complete 700-Q + Shabbat Suite):",
    pack4_pw: "👩 Unlock Pack 4: Women's 150 Halacha Deck ($49 standalone, or $149 for the complete 700-Q + Shabbat Suite):",
    cp_limit_pw: "📱 You just finished the 4 free Nohal 5.2.0008 Couples Interrogation questions! Unlock all 80 separated-room questions + live 2-Phone Matcher:"
  },
  he: {
    badge: "🛡️ מגן המסלול המלא — גיור, רבנות ומשרד הפנים",
    title: "בחרו מסלול ל-90 יום או גישה מלאה לכל החיים",
    default_reason: "חסכו ריטיינר של 25,000 ₪ למשרדי עו״ד. פתחו את המודול המבוקש או בחרו בחבילה המלאה:",
    tab_suites: "🛡️ חבילות מלאות ומסלולים",
    tab_modular: "🎯 מודולים וחפיסות בודדות",
    s1_name: "📄 מנוע טפסים בעברית ומכתבים רשמיים",
    s1_sub: "90 יום",
    s1_desc: "עריכה והדפסת PDF נקייה ללא הגבלה לטפסי אש/1, אש/3, מכתב הסבר לוועדת חריגים, הארכת 30 יום, מכתבי רב ומפענח פקידים. (או <strong>$149 לכל החיים</strong>).",
    s1_b1: "90 יום ($89)",
    s1_b2: "לכל החיים ($149)",
    s2_name: "🕍 חבילת בית דין (700 שאלות) ושבת",
    s2_sub: "90 יום מרתון",
    s2_desc: "כל 700 שאלות בית הדין (200 ליבה + 200 התקלות דיינים + 150 גברים + 150 נשים) + 13 שירי שבת + 8 ברכות + בודק הגייה.",
    s2_b1: "90 יום ($149)",
    s2_b2: "לכל החיים ($249)",
    s3_name: "📱 סימולטור זוגי ל-2 טלפונים + בדיקת תיק",
    s3_sub: "90 יום (2 מכשירים)",
    s3_desc: "80 שאלות שימוע נפרד (נוהל 5.2.0008) בסנכרון מוצפן ל-2 טלפונים + מבקר מסמכים ואפוסטיל לפני התור. (או <strong>$229 ל-5 שנות הליך מדורג</strong>).",
    s3_b1: "90 יום ($129)",
    s3_b2: "5 שנים ($229)",
    s4_badge: "★ המסלול המלא",
    s4_name: "👑 חבילת VIP כפולה + ביקורת תיק מלאה",
    s4_desc: "כל 3 המנועים פתוחים (טפסים + 700 שאלות בית דין + שירים + סנכרון זוגי + מבקר מסמכים ואפוסטיל):",
    s4_b1: "90 יום יחיד ($249)",
    s4_b2: "לכל החיים יחיד ($399)",
    s4_b3: "👑 חבילת VIP זוגית ל-2 טלפונים לכל החיים + ביקורת תיק ($649) ←",
    m1_name: "📚 200 שאלות ליבה או +200 התקלות דיינים",
    m1_sub: "לכל חפיסת 200 כרטיסיות",
    m1_desc: "פתחו את חפיסה 1 (200 שאלות ליבה) או חפיסה 2 (+200 שאלות מתקדמות) בנפרד:",
    m1_b1: "חפיסה 1 ($65)",
    m1_b2: "חפיסה 2 ($65)",
    m2_name: "🧔 150 הלכות גברים או 👩 150 הלכות נשים",
    m2_sub: "לכל חפיסת 150 כרטיסיות",
    m2_desc: "פתחו את חפיסה 3 (150 שאלות גברים) או חפיסה 4 (150 שאלות נשים) בנפרד:",
    m2_b1: "150 גברים ($49)",
    m2_b2: "150 נשים ($49)",
    m3_name: "🕍 כל 700 שאלות בית הדין בלבד",
    m3_sub: "כל 4 החפיסות",
    m3_desc: "פתיחת כל 700 כרטיסיות בית הדין (200 ליבה + 200 מתקדמות + 150 גברים + 150 נשים).",
    m3_b1: "פתיחת כל 700 הכרטיסיות ($179) ←",
    m4_name: "🎵 שירי שבת וברכות או 📱 80 שאלות זוגיות",
    m4_sub: "מודול בודד",
    m4_desc: "13 שירי שבת + 8 ברכות ובודק הגייה ($65) או סנכרון 80 שאלות ל-2 טלפונים ($75):",
    m4_b1: "שירים ($65)",
    m4_b2: "סנכרון 80 ($75)",
    code_ph: "יש לכם קוד VIP או קופון? הזינו כאן...",
    code_btn: "פתיחה",
    code_empty: "❌ נא להזין קוד VIP או קופון.",
    code_verifying: "🔐 מאמת קוד...",
    code_invalid: "❌ קוד שגוי. בחרו חבילה למעלה או הזינו קוד תקין.",
    code_ok: "✅ נפתח בהצלחה: ",
    pack2_pw: "🔥 פתחו את חפיסה 2: +200 שאלות דיינים מתקדמות ($65 בנפרד, או $149 לחבילת 700 שאלות + שבת):",
    pack3_pw: "🧔 פתחו את חפיסה 3: 150 הלכות גברים ($49 בנפרד, או $149 לחבילת 700 שאלות + שבת):",
    pack4_pw: "👩 פתחו את חפיסה 4: 150 הלכות נשים ($49 בנפרד, או $149 לחבילת 700 שאלות + שבת):",
    cp_limit_pw: "📱 סיימתם את 4 שאלות הניסיון של נוהל 5.2.0008! פתחו את כל 80 שאלות השימוע + סנכרון חי ל-2 טלפונים:"
  },
  fr: {
    badge: "🛡️ Bouclier Complet Giyur Aliyah Track",
    title: "Choisissez Votre Pass 90 Jours ou Accès à Vie",
    default_reason: "Évitez les forfaits d'avocats à 25 000 ₪. Débloquez votre module ci-dessous ou prenez le Pack Complet :",
    tab_suites: "🛡️ Packs Complets & Suites",
    tab_modular: "🎯 Modules & Decks Individuels",
    s1_name: "📄 Moteur de Formulaires Hébreu & Lettres",
    s1_sub: "Pass 90 Jours",
    s1_desc: "Éditions & PDF sans filigrane illimités : Ash/1, Ash/3, Michtav Hesber, Extension 30j, Lettres Rabbiniques & Décodeur. (Ou <strong>149$ à Vie</strong>).",
    s1_b1: "90 Jours (89$)",
    s1_b2: "À Vie (149$)",
    s2_name: "🕍 Suite Beit Din 700-Q & Chabbat",
    s2_sub: "90 Jours Intensif",
    s2_desc: "Les 700 Questions Beit Din (200 Base + 200 Pièges + 150 Hommes + 150 Femmes) + 13 Chants + 8 Brakhot + Évaluateur Vocal.",
    s2_b1: "90 Jours (149$)",
    s2_b2: "À Vie (249$)",
    s3_name: "📱 Sync Couple 2 Téléphones + Audit Dossier",
    s3_sub: "90 Jours (2 Tél.)",
    s3_desc: "80 Questions Nohal 5.2.0008 en Sync E2EE sur 2 téléphones + Inspecteur Pré-Vol de Documents & Apostilles. (Ou <strong>229$ Pass 5 Ans</strong>).",
    s3_b1: "90 Jours (129$)",
    s3_b2: "Pass 5 Ans (229$)",
    s4_badge: "★ Suite Complète",
    s4_name: "👑 Suite VIP Double-Voie + Audit Dossier",
    s4_desc: "Les 3 Moteurs Débloqués (Formulaires + 700 Q Beit Din + Chants + 80 Q Couple + Audit Complet Dossier & Apostilles) :",
    s4_b1: "90j Solo (249$)",
    s4_b2: "À Vie Solo (399$)",
    s4_b3: "👑 VIP Couple 2-Tél. à Vie + Audit Dossier (649$) →",
    m1_name: "📚 Pack 1 (200 Base) OU Pack 2 (+200 Pièges)",
    m1_sub: "par deck de 200 cartes",
    m1_desc: "Débloquez le Pack 1 (200 Questions Fondamentales) ou le Pack 2 (+200 Questions Pièges) :",
    m1_b1: "Pack 1 (65$)",
    m1_b2: "Pack 2 (65$)",
    m2_name: "🧔 150 Hommes OU 👩 150 Femmes",
    m2_sub: "par deck de 150 cartes",
    m2_desc: "Débloquez le Pack 3 (150 Halakha Hommes) ou le Pack 4 (150 Halakha Femmes) :",
    m2_b1: "150 Hommes (49$)",
    m2_b2: "150 Femmes (49$)",
    m3_name: "🕍 Les 700 Questions Beit Din Seules",
    m3_sub: "les 4 packs inclus",
    m3_desc: "Débloque les 700 cartes Beit Din (200 Base + 200 Pièges + 150 Hommes + 150 Femmes).",
    m3_b1: "Débloquer les 700 Cartes (179$) →",
    m4_name: "🎵 Chants & Brakhot OU 📱 80-Q Sync Seul",
    m4_sub: "module individuel",
    m4_desc: "13 Chants de Chabbat + 8 Brakhot (65$) ou Sync 80 Questions 2 Téléphones seul (75$) :",
    m4_b1: "Chants (65$)",
    m4_b2: "Sync 80-Q (75$)",
    code_ph: "Code VIP ou Promo ? Entrez-le ici...",
    code_btn: "Activer",
    code_empty: "❌ Veuillez entrer un code VIP ou Promo.",
    code_verifying: "🔐 Vérification du code...",
    code_invalid: "❌ Code invalide. Choisissez un pass ci-dessus.",
    code_ok: "✅ Débloqué : ",
    pack2_pw: "🔥 Débloquez le Pack 2 : +200 Questions Pièges des Dayanim (65$ seul, ou 149$ pour la Suite 700-Q + Chabbat) :",
    pack3_pw: "🧔 Débloquez le Pack 3 : 150 Questions Hommes (49$ seul, ou 149$ pour la Suite 700-Q + Chabbat) :",
    pack4_pw: "👩 Débloquez le Pack 4 : 150 Questions Femmes (49$ seul, ou 149$ pour la Suite 700-Q + Chabbat) :",
    cp_limit_pw: "📱 Vous avez terminé les 4 questions gratuites Nohal 5.2.0008 ! Débloquez les 80 questions + Sync 2 Téléphones :"
  },
  es: {
    badge: "🛡️ Escudo Completo Giyur Aliyah Track",
    title: "Elija su Pase de 90 Días o Acceso de por Vida",
    default_reason: "Ahorre los 25.000 ₪ de bufetes. Desbloquee su módulo abajo o elija el Paquete Completo:",
    tab_suites: "🛡️ Paquetes Completos y Suites",
    tab_modular: "🎯 Módulos y Mazos Individuales",
    s1_name: "📄 Motor de Formularios en Hebreo y Cartas",
    s1_sub: "Pase 90 Días",
    s1_desc: "Ediciones e impresiones PDF limpias ilimitadas: Ash/1, Ash/3, Mijtav Hesber, Prórroga 30d, Cartas Rabínicas y Decodificador. (O <strong>$149 de por Vida</strong>).",
    s1_b1: "90 Días ($89)",
    s1_b2: "De por Vida ($149)",
    s2_name: "🕍 Suite Beit Din 700-P y Shabat",
    s2_sub: "90 Días Intensivo",
    s2_desc: "Las 700 Preguntas del Beit Din (200 Base + 200 Trampas + 150 Hombres + 150 Mujeres) + 13 Canciones + 8 Brajot + Evaluador Vocal.",
    s2_b1: "90 Días ($149)",
    s2_b2: "De por Vida ($249)",
    s3_name: "📱 Sync Parejas 2 Teléfonos + Auditoría",
    s3_sub: "90 Días (2 Tel.)",
    s3_desc: "80 Preguntas Nohal 5.2.0008 en Sync E2EE para 2 teléfonos + Inspector Pre-Vuelo de Documentos y Apostillas. (O <strong>$229 Pase 5 Años</strong>).",
    s3_b1: "90 Días ($129)",
    s3_b2: "Pase 5 Años ($229)",
    s4_badge: "★ Suite Completa",
    s4_name: "👑 Suite VIP Doble Vía + Auditoría de Carpeta",
    s4_desc: "Los 3 Motores Desbloqueados (Formularios + 700 P Beit Din + Canciones + 80 P Parejas + Auditoría de Documentos y Apostillas):",
    s4_b1: "90d Solo ($249)",
    s4_b2: "Vida Solo ($399)",
    s4_b3: "👑 VIP Pareja 2-Tel. de por Vida + Auditoría ($649) →",
    m1_name: "📚 Mazo 1 (200 Base) O Mazo 2 (+200 Trampas)",
    m1_sub: "por mazo de 200 tarjetas",
    m1_desc: "Desbloquee el Mazo 1 (200 Preguntas Base) o el Mazo 2 (+200 Preguntas Avanzadas):",
    m1_b1: "Mazo 1 ($65)",
    m1_b2: "Mazo 2 ($65)",
    m2_name: "🧔 150 Hombres O 👩 150 Mujeres",
    m2_sub: "por mazo de 150 tarjetas",
    m2_desc: "Desbloquee el Mazo 3 (150 Halajá Hombres) o el Mazo 4 (150 Halajá Mujeres):",
    m2_b1: "150 Hombres ($49)",
    m2_b2: "150 Mujeres ($49)",
    m3_name: "🕍 Las 700 Preguntas del Beit Din Solas",
    m3_sub: "los 4 mazos incluidos",
    m3_desc: "Desbloquea las 700 tarjetas del Beit Din (200 Base + 200 Trampas + 150 Hombres + 150 Mujeres).",
    m3_b1: "Desbloquear las 700 Tarjetas ($179) →",
    m4_name: "🎵 Canciones y Brajot O 📱 80-P Sync Solo",
    m4_sub: "módulo individual",
    m4_desc: "13 Canciones de Shabat + 8 Brajot ($65) o Sync de 80 Preguntas en 2 Teléfonos ($75):",
    m4_b1: "Canciones ($65)",
    m4_b2: "Sync 80-P ($75)",
    code_ph: "¿Tiene un código VIP o Promo? Ingréselo aquí...",
    code_btn: "Activar",
    code_empty: "❌ Por favor ingrese un código VIP o Promo.",
    code_verifying: "🔐 Verificando código...",
    code_invalid: "❌ Código inválido. Elija un pase arriba.",
    code_ok: "✅ Desbloqueado: ",
    pack2_pw: "🔥 Desbloquee Mazo 2: +200 Preguntas Avanzadas de Dayanim ($65 individual, o $149 por la Suite 700-P + Shabat):",
    pack3_pw: "🧔 Desbloquee Mazo 3: 150 Preguntas Hombres ($49 individual, o $149 por la Suite 700-P + Shabat):",
    pack4_pw: "👩 Desbloquee Mazo 4: 150 Preguntas Mujeres ($49 individual, o $149 por la Suite 700-P + Shabat):",
    cp_limit_pw: "📱 ¡Terminó las 4 preguntas gratuitas Nohal 5.2.0008! Desbloquee las 80 preguntas + Sync en vivo para 2 teléfonos:"
  },
  de: {
    badge: "🛡️ Giyur Aliyah Track Komplett-Schutzschild",
    title: "Wählen Sie Ihren 90-Tage-Pass oder Lebenslangen Zugang",
    default_reason: "Sparen Sie 25.000 ₪ Kanzlei-Honorar. Schalten Sie Ihr Modul frei oder wählen Sie das Komplettpaket:",
    tab_suites: "🛡️ Komplettpakete & Suites",
    tab_modular: "🎯 Einzelne Module & Decks",
    s1_name: "📄 Hebräischer Formular- & Brief-Generator",
    s1_sub: "90-Tage-Pass",
    s1_desc: "Unbegrenzte PDF-Drucke ohne Wasserzeichen für Asch/1, Asch/3, Michtav Hesber, 30-Tage-Frist, Rabbiner-Briefe & Decoder. (Oder <strong>$149 Lebenslang</strong>).",
    s1_b1: "90 Tage ($89)",
    s1_b2: "Lebenslang ($149)",
    s2_name: "🕍 Beit Din 700-F & Schabbat-Suite",
    s2_sub: "90-Tage-Intensiv",
    s2_desc: "Alle 700 Beit-Din-Fragen (200 Basis + 200 Fangfragen + 150 Männer + 150 Frauen) + 13 Schabbat-Lieder + 8 Brachot + Sprachtrainer.",
    s2_b1: "90 Tage ($149)",
    s2_b2: "Lebenslang ($249)",
    s3_name: "📱 Paar-Visum 2-Handy-Sync + Akten-Audit",
    s3_sub: "90 Tage (2 Handys)",
    s3_desc: "80 Fragen Nohal 5.2.0008 im 2-Handy-E2EE-Sync + Vorab-Dokumenten- & Apostillen-Prüfer. (Oder <strong>$229 5-Jahres-Pass</strong>).",
    s3_b1: "90 Tage ($129)",
    s3_b2: "5-Jahre ($229)",
    s4_badge: "★ Komplett-Suite",
    s4_name: "👑 VIP Doppel-Track Suite + Akten-Audit",
    s4_desc: "Alle 3 Motoren Freigeschaltet (Formulare + 700 Beit-Din-Fragen + Lieder + 80 Paar-Sync + Dokumenten- & Apostillen-Audit):",
    s4_b1: "90T Solo ($249)",
    s4_b2: "Leben Solo ($399)",
    s4_b3: "👑 VIP Paar 2-Handy Lebenslang + Akten-Audit ($649) →",
    m1_name: "📚 Deck 1 (200 Basis) ODER Deck 2 (+200 Fangfragen)",
    m1_sub: "pro 200-Karten-Deck",
    m1_desc: "Schalten Sie Deck 1 (200 Basisfragen) oder Deck 2 (+200 fortgeschrittene Dajanim-Fragen) einzeln frei:",
    m1_b1: "Deck 1 ($65)",
    m1_b2: "Deck 2 ($65)",
    m2_name: "🧔 150 Männer ODER 👩 150 Frauen",
    m2_sub: "pro 150-Karten-Deck",
    m2_desc: "Schalten Sie Deck 3 (150 Halacha Männer) oder Deck 4 (150 Halacha Frauen) einzeln frei:",
    m2_b1: "150 Männer ($49)",
    m2_b2: "150 Frauen ($49)",
    m3_name: "🕍 Alle 700 Beit-Din-Fragen Komplett",
    m3_sub: "alle 4 Decks inklusive",
    m3_desc: "Schaltet alle 700 Beit-Din-Karten frei (200 Basis + 200 Fangfragen + 150 Männer + 150 Frauen).",
    m3_b1: "Alle 700 Karten Freischalten ($179) →",
    m4_name: "🎵 Lieder-Trainer ODER 📱 80-F Sync Einzeln",
    m4_sub: "Einzelmodul",
    m4_desc: "13 Schabbat-Lieder + 8 Brachot ($65) oder 80-Fragen 2-Handy-Sync einzeln ($75):",
    m4_b1: "Lieder ($65)",
    m4_b2: "80-F Sync ($75)",
    code_ph: "VIP- oder Promo-Code vorhanden? Hier eingeben...",
    code_btn: "Freischalten",
    code_empty: "❌ Bitte geben Sie einen VIP- oder Promo-Code ein.",
    code_verifying: "🔐 Code wird geprüft...",
    code_invalid: "❌ Ungültiger Code. Bitte wählen Sie oben einen Pass.",
    code_ok: "✅ Freigeschaltet: ",
    pack2_pw: "🔥 Deck 2 freischalten: +200 Fortgeschrittene Dajanim-Fragen ($65 einzeln, oder $149 für die 700-F + Schabbat-Suite):",
    pack3_pw: "🧔 Deck 3 freischalten: 150 Halacha-Fragen Männer ($49 einzeln, oder $149 für die 700-F + Schabbat-Suite):",
    pack4_pw: "👩 Deck 4 freischalten: 150 Halacha-Fragen Frauen ($49 einzeln, oder $149 für die 700-F + Schabbat-Suite):",
    cp_limit_pw: "📱 Sie haben die 4 kostenlosen Nohal 5.2.0008 Fragen beendet! Schalten Sie alle 80 Fragen + 2-Handy-Sync frei:"
  }
  ,
  ru: {
    "badge": "🛡️ Командный щит Giyur Aliyah Track",
    "title": "Выберите доступ на 90 дней или Безлимитный абонемент",
    "default_reason": "Сэкономьте 25 000 ₪ на гонорарах адвокатам. Откройте нужный модуль ниже или полный пакет:",
    "tab_suites": "🛡️ Полные пакеты и комплекты",
    "tab_modular": "🎯 Отдельные модули и колоды",
    "s1_name": "📄 Генератор бланков МВД и писем на иврите",
    "s1_sub": "Доступ на 90 дней",
    "s1_desc": "Безлимитное заполнение и чистая PDF-печать форм Аш/1, Аш/3, Михтав Эсбер, отсрочки на 30 дней, писем раввина и декодера МВД. (Или <strong>$149 Навсегда</strong>).",
    "s1_b1": "90 дней ($89)",
    "s1_b2": "Навсегда ($149)",
    "s2_name": "🕍 Пакет Бейт-Дин 700 вопросов + Шаббат",
    "s2_sub": "Интенсив 90 дней",
    "s2_desc": "Все 700 вопросов Бейт-Дина (200 базовых + 200 каверзных + 150 мужских + 150 женских) + Песни, Шахарит, Брахот и голосовой тренажёр.",
    "s2_b1": "90 дней ($149)",
    "s2_b2": "Навсегда ($249)",
    "s3_name": "📱 Супружеская виза: Синхронизация 2 телефонов + Аудит",
    "s3_sub": "90 дней (2 телефона)",
    "s3_desc": "80 вопросов перекрёстного допроса МВД (Ноhal 5.2.0008) на 2 телефонах + Инспектор документов и Апостиля. (Или <strong>$229 на 5 лет СТУПРО</strong>).",
    "s3_b1": "90 дней ($129)",
    "s3_b2": "На 5 лет ($229)",
    "s4_badge": "★ Полный комплект",
    "s4_name": "👑 Полный VIP-пакет (Все треки + Аудит досье)",
    "s4_desc": "Все 3 системы открыты (Формы МВД + 700 вопросов Бейт-Дин + Песни + 80 вопросов для пар + Предполётный аудит документов):",
    "s4_b1": "90 дн. Соло ($249)",
    "s4_b2": "Навсегда Соло ($399)",
    "s4_b3": "👑 VIP для пары (2 телефона Навсегда + Аудит досье — $649) →",
    "m1_name": "📚 200 Базовых ИЛИ +200 Каверзных",
    "m1_sub": "за колоду из 200 карточек",
    "m1_desc": "Откройте Пакет 1 (200 базовых вопросов даяним) или Пакет 2 (+200 сложных вопросов) отдельно:",
    "m1_b1": "Пакет 1 ($65)",
    "m1_b2": "Пакет 2 ($65)",
    "m2_name": "🧔 150 Мужских ИЛИ 👩 150 Женских",
    "m2_sub": "за колоду из 150 карточек",
    "m2_desc": "Откройте Пакет 3 (150 вопросов галахи для мужчин) или Пакет 4 (150 вопросов для женщин) отдельно:",
    "m2_b1": "Мужские 150 ($49)",
    "m2_b2": "Женские 150 ($49)",
    "m3_name": "🕍 Все 700 вопросов Бейт-Дина",
    "m3_sub": "все 4 колоды карточек",
    "m3_desc": "Открывает все 700 карточек Бейт-Дина (200 базовых + 200 каверзных + 150 мужских + 150 женских).",
    "m3_b1": "Открыть все 700 карточек ($179) →",
    "m4_name": "🎵 Тренажёр песен ИЛИ 📱 80 вопросов парам",
    "m4_sub": "отдельный модуль",
    "m4_desc": "Откройте тренажёр песен, молитв и брахот ($65) или синхронизацию 80 вопросов для пар на 2 телефонах ($75):",
    "m4_b1": "Песни ($65)",
    "m4_b2": "80 вопросов ($75)",
    "code_ph": "Есть VIP или промокод? Введите здесь...",
    "code_btn": "Открыть",
    "code_empty": "❌ Пожалуйста, введите VIP или промокод.",
    "code_verifying": "🔐 Проверка кода...",
    "code_invalid": "❌ Неверный код. Выберите тариф выше или введите действующий код.",
    "code_ok": "✅ Открыто: ",
    "pack2_pw": "🔥 Откройте Пакет 2: +200 каверзных вопросов даяним ($65 отдельно или $149 за полный пакет 700 вопросов + Шаббат):",
    "pack3_pw": "🧔 Откройте Пакет 3: 150 вопросов галахи для мужчин ($49 отдельно или $149 за полный пакет):",
    "pack4_pw": "👩 Откройте Пакет 4: 150 вопросов галахи для женщин ($49 отдельно или $149 за полный пакет):",
    "cp_limit_pw": "📱 Вы прошли 4 бесплатных вопроса перекрёстного опроса МВД (Ноhal 5.2.0008)! Откройте все 80 вопросов + синхронизацию 2 телефонов:"
}
};

window.renderPaywallI18n = function(customReason) {
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  const t = window.PW_I18N[l] || window.PW_I18N.en;
  const modal = document.getElementById('pro-paywall-modal');
  if (!modal) return;
  const card = modal.querySelector('.paywall-card');
  if (card) card.dir = (l === 'he') ? 'rtl' : 'ltr';

  const headBadge = modal.querySelector('.pw-head div div');
  if (headBadge) headBadge.innerText = t.badge;
  const headTitle = document.getElementById('pw-title');
  if (headTitle) headTitle.innerText = t.title;
  const rEl = document.getElementById('pw-reason');
  if (rEl) rEl.innerText = customReason || t.default_reason;

  const bs = document.getElementById('pw-tab-btn-suites');
  const bm = document.getElementById('pw-tab-btn-modular');
  if (bs) bs.innerText = t.tab_suites;
  if (bm) bm.innerText = t.tab_modular;

  const vs = document.getElementById('pw-view-suites');
  if (vs) {
    vs.innerHTML = `
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.s1_name}</div>
          <div class="tier-price">$89 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.s1_sub}</span></div>
          <div class="tier-desc">${t.s1_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('forms_90d_89')">${t.s1_b1}</button>
          <button class="tier-btn" style="flex:1;background:#0288E8;" onclick="startCheckout('forms_life_149')">${t.s1_b2}</button>
        </div>
      </div>
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.s2_name}</div>
          <div class="tier-price">$149 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.s2_sub}</span></div>
          <div class="tier-desc">${t.s2_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('bd_suite_90d_149')">${t.s2_b1}</button>
          <button class="tier-btn" style="flex:1;background:#0288E8;" onclick="startCheckout('bd_suite_life_249')">${t.s2_b2}</button>
        </div>
      </div>
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.s3_name}</div>
          <div class="tier-price">$129 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.s3_sub}</span></div>
          <div class="tier-desc">${t.s3_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('couples_90d_129')">${t.s3_b1}</button>
          <button class="tier-btn" style="flex:1;background:#0288E8;" onclick="startCheckout('couples_life_229')">${t.s3_b2}</button>
        </div>
      </div>
      <div class="tier-box featured" style="border-color:#d97706;background:#fffbeb;">
        <span class="tier-badge" style="background:#d97706;">${t.s4_badge}</span>
        <div>
          <div class="tier-name">${t.s4_name}</div>
          <div class="tier-price" style="color:#b45309;">$249–$649</div>
          <div class="tier-desc">${t.s4_desc}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <div style="display:flex;gap:6px;">
            <button class="tier-btn" style="flex:1;padding:8px;font-size:0.76rem;" onclick="startCheckout('suite_solo_90d_249')">${t.s4_b1}</button>
            <button class="tier-btn" style="flex:1;padding:8px;font-size:0.76rem;background:#0288E8;" onclick="startCheckout('suite_solo_life_399')">${t.s4_b2}</button>
          </div>
          <button class="tier-btn" style="background:#b45309;padding:9px;font-size:0.8rem;" onclick="startCheckout('vip_couple_649')">${t.s4_b3}</button>
        </div>
      </div>`;
  }

  const vm = document.getElementById('pw-view-modular');
  if (vm) {
    vm.innerHTML = `
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.m1_name}</div>
          <div class="tier-price">$65 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.m1_sub}</span></div>
          <div class="tier-desc">${t.m1_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('bd_pack1_65')">${t.m1_b1}</button>
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('bd_pack2_65')">${t.m1_b2}</button>
        </div>
      </div>
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.m2_name}</div>
          <div class="tier-price">$49 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.m2_sub}</span></div>
          <div class="tier-desc">${t.m2_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('bd_pack3_49')">${t.m2_b1}</button>
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('bd_pack4_49')">${t.m2_b2}</button>
        </div>
      </div>
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.m3_name}</div>
          <div class="tier-price">$179 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.m3_sub}</span></div>
          <div class="tier-desc">${t.m3_desc}</div>
        </div>
        <button class="tier-btn" onclick="startCheckout('bd_all700_179')">${t.m3_b1}</button>
      </div>
      <div class="tier-box">
        <div>
          <div class="tier-name">${t.m4_name}</div>
          <div class="tier-price">$65 / $75 <span style="font-size:0.74rem;color:#64748b;font-weight:700;">${t.m4_sub}</span></div>
          <div class="tier-desc">${t.m4_desc}</div>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('songs_65')">${t.m4_b1}</button>
          <button class="tier-btn" style="flex:1;" onclick="startCheckout('couples_sync_75')">${t.m4_b2}</button>
        </div>
      </div>`;
  }

  const inp = document.getElementById('pro-code-input');
  if (inp) {
    inp.placeholder = t.code_ph;
    const btn = inp.nextElementSibling;
    if (btn) btn.innerText = t.code_btn;
  }
};

window.openProPaywall = function(reasonText, preferModularTab) {
  window.renderPaywallI18n(reasonText);
  window.switchPaywallTab(preferModularTab ? 'modular' : 'suites');
  const modal = document.getElementById('pro-paywall-modal');
  if (modal) modal.classList.add('open');
};

window.closeProPaywall = function() {
  const modal = document.getElementById('pro-paywall-modal');
  if (modal) modal.classList.remove('open');
};

window.sha256Hex = async function(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuf = await window.crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
};

window.grantProEntitlement = function(sourceTag, tierKey) {
  const cap = window.TIER_CAPABILITIES[tierKey] ? tierKey : 'suite_solo_life_399';
  const def = window.TIER_CAPABILITIES[cap];
  const map = window.getUnlockedTiersMap();
  const expMs = def.days > 0 ? (Date.now() + def.days * 24 * 60 * 60 * 1000) : 0;
  map[cap] = { exp: expMs, ts: Date.now() };
  localStorage.setItem('gat_entitlements_v2', JSON.stringify(map));
  localStorage.setItem('gat_unlocked_tier', cap);

  if (window.canUnlockForms()) {
    document.querySelectorAll('.hebrew-out').forEach(el => el.classList.remove('watermarked'));
  }

  if (window.gatDb && window.gatUid) {
    window.gatDb.collection('pro_entitlements').doc(window.gatUid).set({
      uid: window.gatUid,
      unlocked: true,
      tier: cap,
      tierLabel: def.label,
      entitlementsMap: map,
      source: sourceTag || 'checkout_or_code',
      unlockedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(function(){});

    if (def.vip2Phone && window.cpRoom) {
      window.gatDb.collection('couples_rooms').doc(window.cpRoom).set({
        vipCoupleUnlocked: true
      }, { merge: true }).catch(function(){});
    }
  }
};

window.syncProEntitlementFromCloud = function() {
  const params = new URLSearchParams(window.location.search);
  const isCheckoutReturn = params.get('checkout_success') === '1' || params.get('pro_unlock') === '1' || !!params.get('order_id');
  const returnedTier = params.get('tier') || localStorage.getItem('gat_pending_tier') || 'suite_solo_life_399';

  if (isCheckoutReturn) {
    window.grantProEntitlement('lemonsqueezy_return', returnedTier);
    localStorage.removeItem('gat_pending_tier');
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('checkout_success');
    cleanUrl.searchParams.delete('pro_unlock');
    cleanUrl.searchParams.delete('order_id');
    cleanUrl.searchParams.delete('tier');
    window.history.replaceState({}, '', cleanUrl.toString());
    const def = window.TIER_CAPABILITIES[returnedTier] || window.TIER_CAPABILITIES.suite_solo_life_399;
    if (window.showCpToast) window.showCpToast('✅ Unlocked: ' + def.label, true);
    renderAll();
    openMod(window.currentMod || 'hebrew-engine');
    return;
  }

  if (!window.gatDb || !window.gatUid) return;
  window.gatDb.collection('pro_entitlements').doc(window.gatUid).get().then(function(snap) {
    if (snap.exists && snap.data() && snap.data().unlocked) {
      const d = snap.data();
      if (d.entitlementsMap && typeof d.entitlementsMap === 'object') {
        const cur = window.getUnlockedTiersMap();
        const merged = Object.assign({}, d.entitlementsMap, cur);
        localStorage.setItem('gat_entitlements_v2', JSON.stringify(merged));
      } else if (d.tier) {
        window.grantProEntitlement('cloud_restore', d.tier);
      }
      if (!Array.from(document.querySelectorAll('audio')).some(function(a){ return !a.paused; })) {
        renderAll();
        openMod(window.currentMod || 'hebrew-engine');
      }
    }
  }).catch(function(){});
};

window.redeemProCode = async function() {
  const inp = document.getElementById('pro-code-input');
  const msg = document.getElementById('pro-code-msg');
  const code = (inp ? inp.value : '').trim().toUpperCase();
  if (msg) msg.style.display = 'block';
  if (!code) {
    const pwT = (window.PW_I18N && window.PW_I18N[window.appLang || 'en']) || window.PW_I18N.en;
    if (msg) { msg.style.color = '#e11d48'; msg.innerText = pwT.code_empty; }
    return;
  }
  const pwT = (window.PW_I18N && window.PW_I18N[window.appLang || 'en']) || window.PW_I18N.en;
  if (msg) { msg.style.color = '#0284c7'; msg.innerText = pwT.code_verifying; }

  const digest = await window.sha256Hex('gat_vip_shield_2026_' + code);
  let matchedTier = GAT_CODE_TIER_MAP[digest] || '';

  if (!matchedTier && window.gatDb) {
    try {
      const snap = await window.gatDb.collection('promo_codes').doc(code).get();
      if (snap.exists && snap.data() && snap.data().active !== false) {
        matchedTier = snap.data().tier || 'suite_solo_life_399';
      }
    } catch (e) {}
  }

  if (matchedTier) {
    window.grantProEntitlement('code_' + digest.slice(0, 8), matchedTier);
    const def = window.TIER_CAPABILITIES[matchedTier] || window.TIER_CAPABILITIES.suite_solo_life_399;
    if (msg) {
      msg.style.color = '#059669';
      msg.innerText = pwT.code_ok + def.label;
    }
    setTimeout(function() {
      window.closeProPaywall();
      if (!Array.from(document.querySelectorAll('audio')).some(function(a){ return !a.paused; })) {
        renderAll();
        openMod(window.currentMod || 'hebrew-engine');
      }
    }, 800);
  } else {
    if (msg) {
      msg.style.color = '#e11d48';
      msg.innerText = pwT.code_invalid;
    }
  }
};

window.startCheckout = function(tierKey) {
  const baseUrl = window.LEMON_CHECKOUT_URLS[tierKey];
  if (!baseUrl) return;
  try {
    localStorage.setItem('gat_pending_tier', tierKey);
    localStorage.setItem('gat_pending_checkout_ts', String(Date.now()));
  } catch(e){}
  const sep = baseUrl.indexOf('?') === -1 ? '?' : '&';
  const returnUrl = 'https://giyuraliyahtrack.com/app/?checkout_success=1&tier=' + encodeURIComponent(tierKey);
  const fullUrl = baseUrl + sep + 'checkout[custom][uid]=' + encodeURIComponent(window.gatUid || 'anon') + '&checkout[custom][tier]=' + encodeURIComponent(tierKey) + '&checkout[redirect_url]=' + encodeURIComponent(returnUrl);
  window.open(fullUrl, '_blank', 'noopener,noreferrer');
};

const VETTED_I18N = {
  en: {
    pill: "🤝 Vetted Team, Notary & Lawyer",
    h2: "Book Our Vetted Team: Sponsoring Rabbi, Madrichat Kallah, Red-Ribbon Notary & 1-Hr Lawyer Escort",
    lead: "Skip the 25,000 NIS law firm retainer. Select your service below—we route Nationwide Remote Red-Ribbon Notary translations, Certified True Copies (so you NEVER surrender your originals to a clerk!), and 1-Hour Misrad HaPanim Escorts directly to our Vetted Partner Notary & Legal Desk, and match you with our Rabbanut-recognized Sponsoring Rabbis & Madrichot Kallah:",
    svc_lbl: "1. Select Service Needed (Tap One):",
    svcs: [
      { t: "🕍 Both: Vetted Sponsoring Rabbi (Rav Melaveh) + Certified Madrichat Kallah", s: "Complete couple's package plugged into the Beit Din & Rabbanut (1-on-1 & Zoom friendly).", p: "$499 Couple's Package (Save $99)" },
      { t: "📜 Vetted, Rabbanut-Recognized Sponsoring Rabbi (Rav Melaveh)", s: "Official conversion study & stamped Beit Din recommendation letter for singles or couples.", p: "$349 Placement & Beit Din Dossier Setup" },
      { t: "🕯️ Vetted, Rabbanut-Certified Madrichat Kallah (Taharat HaMishpacha)", s: "Mandatory certification required by the Beit Din & Rabbanut marriage registrar.", p: "$249 Placement & Official Certification Track" },
      { t: "🎀 Red-Ribbon Certified Notarial Hebrew Translation & Certified Copies (Remote Nationwide)", s: "Clerks routinely reject English docs & keep originals! Get official Red-Ribbon Hebrew Notarial translations + Certified True Copies so you keep your originals for the Rabbanut.", p: "$249 / doc (1-Page) • $349 (Multi-Page) • $799 (4-Doc Bundle)" },
      { t: "⚖️ 1-Hour 'Day-Of Appointment' Lawyer Escort at Misrad HaPanim", s: "A licensed Israeli lawyer walks into your Misrad HaPanim appointment with you for 1 hour so clerks treat you with respect, accept copies, and open your file on the spot.", p: "$649–$799 (vs. 25,000₪ Retainer)" }
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
    notes_lbl: "7. Documents to Translate/Certify (or Legal Name-Change / Situation Summary):",
    btn_wa: "💬 Lock In My Booking via WhatsApp Now →",
    btn_em: "✉️ Or Submit via Email",
    ok_msg: "✅ Request prepared! Your priority booking has been logged and opened in WhatsApp."
  },
  he: {
    pill: "🤝 רב מלווה, נוטריון ועו״ד",
    h2: "תיאום מהיר: רב מלווה, מדריכת כלה, תרגום נוטריוני (סרט אדום) וליווי עו״ד לשעה",
    lead: "חסכו ריטיינר של 25,000 ₪ למשרדי עו״ד. בחרו את השירות הנדרש — תרגומים נוטריוניים והעתקים נאמנים למקור (כדי שלעולם לא תמסרו מסמך מקורי לפקיד!), ליווי עו״ד לשעה בלשכת משרד הפנים, וחיבור ישיר לצוות הרבנים המלווים ומדריכות הכלה המוכרים שלנו:",
    svc_lbl: "1. בחרו את השירות המבוקש:",
    svcs: [
      { t: "🕍 חבילה זוגית: רב מלווה מוכר + מדריכת כלה מוסמכת רבנות", s: "ליווי מלא לזוגות המוכר בבית הדין וברבנות (גמישות ב-1-על-1 ומרחוק).", p: "$499 חבילה זוגית מלאה (חיסכון $99)" },
      { t: "📜 רב מלווה מוכר על ידי הרבנות הראשית", s: "לימודי גיור רשמיים ומכתב המלצה חתום לבית הדין ליחידים או לזוגות.", p: "$349 שיבוץ ופתיחת תיק ליווי לבית הדין" },
      { t: "🕯️ מדריכת כלה מוסמכת רבנות (טהרת המשפחה)", s: "אישור הדרכת כלה רשמי הנדרש בבית הדין וברישום נישואין ברבנות.", p: "$249 שיבוץ ומסלול הסמכה רשמי לרבנות" },
      { t: "🎀 תרגום נוטריוני מוסמך (סרט אדום) ואישור העתק נאמן למקור (מרחוק בכל הארץ)", s: "פקידים דורשים תרגום לעברית ולוקחים מסמכי מקור! קבלו תרגום נוטריוני והעתק מאושר כדי שתשמרו את המקור לרבנות ולבית הדין.", p: "$249 למסמך (עמוד 1) • $349 (מרובה עמודים) • $799 (חבילת 4 מסמכים)" },
      { t: "⚖️ ליווי עורך דין לשעה אחת בלבד בלשכת משרד הפנים", s: "עורך דין ישראלי נכנס איתכם לפגישה לשעה אחת כדי שהפקידים יתייחסו אליכם בכבוד, יסתפקו בהעתקים ויפתחו את התיק במקום.", p: "$649–$799 (במקום 25,000₪ ריטיינר)" }
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
    notes_lbl: "7. אילו מסמכים נדרשים לתרגום/נאמן למקור או פירוט קצר:",
    btn_wa: "💬 שלחו בקשת תיאום מיידית בוואטסאפ ←",
    btn_em: "✉️ או שלחו באימייל",
    ok_msg: "✅ הפנייה נשמרה ונפתחה בוואטסאפ לטיפול מהיר!"
  },
  fr: {
    pill: "🤝 Rabbin, Notaire & Avocat",
    h2: "Réserver Notre Équipe : Rabbin, Madrichat Kallah, Traduction Notariée (Ruban Rouge) & Avocat 1h",
    lead: "Évitez les forfaits d'avocats à 25 000 ₪. Sélectionnez votre besoin ci-dessous — traductions notariées et copies certifiées conformes (pour ne JAMAIS laisser vos originaux au guichet !), avocat d'1h au Misrad HaPanim, et rabbins/madrichot reconnus par la Rabbanut :",
    svc_lbl: "1. Choisissez le Service Souhaité :",
    svcs: [
      { t: "🕍 Forfait Couple : Rabbin Accompagnateur (Rav Melaveh) + Madrichat Kallah", s: "Reconnu par le Beit Din & le Grand Rabbinat (1-à-1 et visio).", p: "499$ Forfait Couple Complet (Économisez 99$)" },
      { t: "📜 Rabbin Accompagnateur Reconnu par le Rabbinat (Rav Melaveh)", s: "Étude officielle et lettre tamponnée pour le Beit Din.", p: "349$ Mise en Relation & Dossier Beit Din" },
      { t: "🕯️ Madrichat Kallah Certifiée par le Rabbinat (Pureté Familiale)", s: "Attestation officielle Taharat HaMishpacha requise par le Beit Din.", p: "249$ Mise en Relation & Certification Officielle" },
      { t: "🎀 Traduction Notariée Certifiée (Ruban Rouge) & Copies Conformes (À Distance)", s: "Traduction notariée en hébreu + copies certifiées pour garder vos originaux intacts pour le Rabbinat et le Beit Din.", p: "249$ / doc (1 p.) • 349$ (Multi-p.) • 799$ (Pack 4 docs)" },
      { t: "⚖️ Accompagnement d'Avocat d'1 Heure au Rendez-Vous Misrad HaPanim", s: "Un avocat israélien vous accompagne 1 heure au guichet pour faire ouvrir votre dossier immédiatement sans confisquer vos originaux.", p: "649$–799$ (vs 25 000₪)" }
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
    notes_lbl: "7. Documents à Traduire/Certifier ou Résumé de Votre Situation :",
    btn_wa: "💬 Envoyer Ma Demande Prioritaire sur WhatsApp →",
    btn_em: "✉️ Ou Envoyer par Email",
    ok_msg: "✅ Demande enregistrée et ouverte dans WhatsApp !"
  },
  es: {
    pill: "🤝 Rabino, Notario y Abogado",
    h2: "Reservar Equipo: Rabino, Madrijá, Traducción Notarial (Cinta Roja) y Abogado 1h",
    lead: "Ahorre los 25.000 ₪ de los bufetes. Seleccione lo que necesita: traducciones notariales al hebreo y copias certificadas (¡para NUNCA entregar sus originales!), acompañamiento de abogado por 1 hora en el Misrad HaPanim, y rabinos/madrijot reconocidos por la Rabanut:",
    svc_lbl: "1. Seleccione el Servicio que Necesita:",
    svcs: [
      { t: "🕍 Ambos: Rabino Patrocinador (Rav Melavé) + Madrijat Kalá Certificada", s: "Paquete completo reconocido por el Beit Din y la Rabanut (1-a-1 y Zoom).", p: "$499 Paquete Completo de Pareja (Ahorre $99)" },
      { t: "📜 Rabino Patrocinador Reconocido por la Rabanut (Rav Melavé)", s: "Estudio oficial y carta sellada de recomendación para el Beit Din.", p: "$349 Asignación y Apertura de Dossier Beit Din" },
      { t: "🕯️ Madrijat Kalá Certificada por la Rabanut (Pureza Familiar)", s: "Certificación oficial Taharat HaMishpajá exigida por el Beit Din.", p: "$249 Asignación y Certificación Oficial" },
      { t: "🎀 Traducción Notarial Certificada (Cinta Roja) y Copias Certificadas (Remoto)", s: "Traducción notarial al hebreo + copias certificadas para conservar sus originales para la Rabanut y el Beit Din.", p: "$249 / doc (1 pág.) • $349 (Multi-pág.) • $799 (Pack 4 docs)" },
      { t: "⚖️ Acompañamiento de Abogado por 1 Hora en su Cita del Misrad HaPanim", s: "Un abogado israelí entra con usted por 1 hora para que abran su expediente en el acto sin retener sus documentos originales.", p: "$649–$799 (vs. 25.000₪)" }
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
    notes_lbl: "7. Documentos para Traducir/Certificar o Resumen de su Caso:",
    btn_wa: "💬 Enviar Solicitud Prioritaria por WhatsApp →",
    btn_em: "✉️ O Enviar por Correo",
    ok_msg: "✅ ¡Solicitud lista y abierta en WhatsApp!"
  },
  de: {
    pill: "🤝 Rabbiner, Notar & Anwalt",
    h2: "Team Buchen: Rabbiner, Madricha, Notar-Übersetzung (Rotes Band) & 1-Std.-Anwalt",
    lead: "Sparen Sie sich 25.000 ₪ Kanzlei-Honorar. Wählen Sie Ihren Bedarf — landesweite hebräische Notar-Übersetzungen und beglaubigte Kopien (damit Sie NIEMALS Ihre Originale abgeben!), 1-Stunden-Anwaltsbegleitung zum Misrad HaPanim sowie vom Rabbinat anerkannte Rabbiner & Madrichot:",
    svc_lbl: "1. Gewünschten Service Auswählen:",
    svcs: [
      { t: "🕍 Beides: Betreuender Rabbiner (Rav Melaveh) + Zertifizierte Madrichat Kallah", s: "Komplettpaket anerkannt von Beit Din & Rabbinat (1-zu-1 & Zoom).", p: "$499 Paar-Komplettpaket ($99 Sparen)" },
      { t: "📜 Vom Rabbinat Anerkannter Betreuender Rabbiner (Rav Melaveh)", s: "Offizieller Unterricht & gestempeltes Empfehlungsschreiben für das Beit Din.", p: "$349 Vermittlung & Beit-Din-Dossier" },
      { t: "🕯️ Vom Rabbinat Zertifizierte Madrichat Kallah (Taharat HaMischpacha)", s: "Offizielle Bestätigung für Beit Din und Rabbinats-Hochzeit.", p: "$249 Vermittlung & Offizielle Zertifizierung" },
      { t: "🎀 Beglaubigte Notar-Übersetzung (Rotes Band) & Beglaubigte Kopien (Online)", s: "Hebräische Notar-Übersetzung + beglaubigte Kopien, damit Sie Ihre Originale für das Rabbinat und Beit Din behalten.", p: "$249 / Dok. (1 S.) • $349 (Mehrseitig) • $799 (4-Dok.-Paket)" },
      { t: "⚖️ 1-Stunden Anwalts-Begleitung zum Misrad HaPanim Termin", s: "Ein zugelassener israelischer Anwalt begleitet Sie für 1 Stunde zum Schalter, damit Ihre Akte sofort geöffnet wird und Sie alle Originale behalten.", p: "$649–$799 (statt 25.000₪)" }
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
    notes_lbl: "7. Zu Übersetzende/Beglaubigende Dokumente oder Kurze Fallbeschreibung:",
    btn_wa: "💬 Prioritäts-Anfrage Jetzt per WhatsApp Senden →",
    btn_em: "✉️ Oder per E-Mail Senden",
    ok_msg: "✅ Anfrage gespeichert und in WhatsApp geöffnet!"
  }
  ,
  ru: {
    "pill": "🤝 Проверенная команда: Раввин, Нотариус и Адвокат",
    "h2": "Запись к проверенным специалистам: Сопровождающий раввин, Мадрихат Калла, Нотариус и Адвокат в МВД",
    "lead": "Не переплачивайте 25 000 ₪ посредникам. Выберите нужную услугу ниже — мы оформляем дистанционные нотариальные переводы с красной лентой по всей стране, заверенные копии (чтобы вы НИКОГДА не отдавали оригиналы инспектору!), сопровождение адвоката на 1 час в МВД, а также подбираем признанных Раввинатом раввинов (Рав Мелаве) и мадрихот калла:",
    "svc_lbl": "1. Выберите нужную услугу (нажмите на одну):",
    "svcs": [
        {
            "t": "🕍 Комплект для пары: Сопровождающий раввин (Рав Мелаве) + Сертифицированная Мадрихат Калла",
            "s": "Полное сопровождение пары для Бейт-Дина и Раввината (очно и по Zoom).",
            "p": "$499 Пакет для пары (Экономия $99)"
        },
        {
            "t": "📜 Признанный Раввинатом сопровождающий раввин (Рав Мелаве)",
            "s": "Официальная подготовка к гиюру и рекомендательное письмо с печатью для Бейт-Дина.",
            "p": "$349 Подбор раввина и подготовка досье"
        },
        {
            "t": "🕯️ Сертифицированная Раввинатом Мадрихат Калла (Таарат а-Мишпаха)",
            "s": "Обязательный сертификат для Бейт-Дина и отдела регистрации браков Раввината.",
            "p": "$249 Подбор и официальный сертификат"
        },
        {
            "t": "🎀 Нотариальный перевод на иврит с красной лентой и заверенные копии (Дистанционно)",
            "s": "Официальные нотариальные переводы + заверенные копии верности оригиналу, чтобы ваши оригиналы остались у вас в руках.",
            "p": "$249 / док. (1 стр.) • $349 (многостр.) • $799 (пакет 4 док.)"
        },
        {
            "t": "⚖️ Почасовое сопровождение лицензированного адвоката на приёме в МВД (1 час)",
            "s": "Израильский адвокат лично заходит с вами к инспектору МВД на 1 час, чтобы у вас приняли копии и открыли дело на месте.",
            "p": "$649–$799 (вместо 25 000 ₪ за ведение дела)"
        }
    ],
    "reg_lbl": "2. Ваш округ МВД / Бейт-Дина:",
    "regs": [
        "🏔️ Север / Галилея / Хайфа (Цфат, Тверия, Кармиэль, Нагария, Хайфа, Афула)",
        "🏛️ Иерусалим и Гуш-Эцион",
        "🏙️ Тель-Авив и Центр (Тель-Авив, Рамат-Ган, Петах-Тиква, Нетания, Герцлия, Реховот)",
        "🌴 Юг (Ашдод, Беэр-Шева, Ашкелон)",
        "✈️ Сейчас за границей (Подготовка пакета до вылета / Дистанционный нотариус)"
    ],
    "trk_lbl": "3. Ваш текущий трек:",
    "trks": [
        "Трек 1: Экстренная релокация / Репатриация внутри Израиля (Шинуй Маамад)",
        "Трек 2: Частный ортодоксальный Бейт-Дин (Гуш-Эцион / Бней-Брак) + Ишур Гиюр",
        "Трек 3: Государственный гиюр (Натив) через Комиссию по исключениям (Аш/1)",
        "Трек 4: Супружеская виза / СТУПРО в МВД (Ноhal 5.2.0008 / 5.2.0009 Аш/3)",
        "Двойной трек: Подтверждение в Раввинате + Супружеская виза в МВД"
    ],
    "name_lbl": "4. Ваше полное имя (и имя партнёра, если подаёте парой):",
    "wa_lbl": "5. Ваш номер WhatsApp (с кодом страны, напр. +972 / +7 / +1):",
    "date_lbl": "6. Дата очереди в МВД или срочность (необязательно):",
    "notes_lbl": "7. Какие документы нужно перевести/заверить (или краткое описание ситуации):",
    "btn_wa": "💬 Забронировать через WhatsApp сейчас →",
    "btn_em": "✉️ Или отправить по Email",
    "ok_msg": "✅ Заявка сформирована! Ваше приоритетное обращение записано и открыто в WhatsApp."
}
};

window.selectedConciergeChoice = parseInt(localStorage.getItem('gat_vt_choice') || '0', 10) || 0;

// ============================================================================
// SMART CHANGE-ONLY FORM AUTO-SAVE & AUTO-RESTORE (OFFLINE-FIRST + CLOUD SYNC)
// ============================================================================
const GAT_FORM_FIELDS = [
  'in-clerk-txt', 'chk-days', 'chk-pass-months', 'chk-name-match', 'chk-hebrew-trans', 'chk-orig-copies', 'chk-apostille-auth', 'chk-birth', 'chk-police', 'chk-single', 'chk-family',
  'he-doc-type', 'he-name', 'he-pass', 'he-facts',
  'rb-type', 'rb-cand', 'rb-rabbi', 'rb-months',
  'vt-region', 'vt-track', 'vt-name', 'vt-wa', 'vt-date', 'vt-notes'
];

window.gatLastSavedSnapshot = localStorage.getItem('gat_form_draft_snapshot') || '';
window.gatLastLeadSnapshot = '';
window.gatIsRestoringDraft = false;

window.collectCurrentFormDraft = function() {
  const draft = { vt_choice: window.selectedConciergeChoice || 0 };
  for (let i = 0; i < GAT_FORM_FIELDS.length; i++) {
    const id = GAT_FORM_FIELDS[i];
    const el = document.getElementById(id);
    if (!el) continue;
    draft[id] = (el.type === 'checkbox') ? !!el.checked : el.value;
  }
  return draft;
};

window.CP_SYNC_I18N = {
  en: {
    saved_online: "☁️ Progress Auto-Saved",
    saved_offline: "💾 Saved Offline on Device (Will sync when online)",
    back_online: "🟢 Back Online — Cloud Synced!",
    offline_mode: "📶 Offline Mode Active — Saving to Device",
    room_tag: "🔐 Room #",
    both_in: "🟢 Both Partners in Room",
    one_in: "🔴 Only 1 Partner in Room",
    you_role: "You: Partner {r} ⇄",
    new_room: "🔄 New Room",
    sync_wa: "📲 Sync Partner via WhatsApp",
    lbl_a: "Partner A (Room 1)",
    lbl_b: "Partner B (Room 2)",
    ph_type_a: "Type Partner A answer...",
    ph_type_b: "Type Partner B answer...",
    locked_reveal_a: "🔒 Partner A locked in! Lock in yours to reveal...",
    locked_reveal_b: "🔒 Partner B locked in! Lock in yours to reveal...",
    ph_ans_a: "🔒 Partner A answered!",
    ph_ans_b: "🔒 Partner B answered!",
    ph_wait_a: "Waiting for Partner A (Room 1)...",
    ph_wait_b: "Waiting for Partner B (Room 2)...",
    btn_lock_a: "🔒 Lock In Partner A Answer ↵",
    btn_lock_b: "🔒 Lock In Partner B Answer ↵",
    btn_locked_a: "✅ Partner A Locked In! (Tap to Update ↵)",
    btn_locked_b: "✅ Partner B Locked In! (Tap to Update ↵)",
    btn_encrypting: "🔐 Encrypting & Locking In...",
    toast_empty: "⚠️ Type your answer first, then tap Lock In Answer ↵",
    toast_match_next: "✅ Marked as Aligned! Moving both partners to next question...",
    toast_flag_next: "🚨 Contradiction Flagged! Moving both partners to next question...",
    toast_auto_match: "✅ Both Answered & Matched! Auto-advancing...",
    toast_diff: "⚠️ Different wording! Compare your answers below:",
    aligned_head: "🟢 <strong>BOTH PARTNERS ALIGNED!</strong>",
    auto_adv: "✨ Auto-advancing to next question...",
    compare_head: "🚨 <strong>COMPARE YOUR ANSWERS (Do these match or contradict?):</strong>",
    btn_same: "✅ Same Meaning (Count Match & Next →)",
    btn_contra: "🚨 Contradiction! (Flag & Next →)",
    wait_other: "⏳ <strong>{who}</strong> locked in an encrypted answer! Waiting for <strong>{wait}</strong> in Room #{tag} to tap Lock In Answer ↵...",
    partner_a: "Partner A",
    partner_b: "Partner B",
    wa_intro: "🔐 Misrad HaPanim E2E Encrypted Couples Room #",
    wa_cta: "Tap to join & compare answers: ",
    tip_lbl: "🛡️ Clerk Audit Tip:",
    unlocked_lbl: "Unlocked",
    free_lbl: "Free",
    he_btn_unlock: "🔓 Unlock Clean Watermark-Free Hebrew PDF & Copy ($89 Sprint / $149 Lifetime) →",
    he_pw_msg: "📄 Unlock clean, watermark-free statutory Hebrew Misrad HaPanim & Va'adat Charigim letters ($89 90-Day Dossier Pass or $149 Lifetime Filings Pass):"
  },
  he: {
    saved_online: "☁️ ההתקדמות נשמרה אוטומטית",
    saved_offline: "💾 נשמר במכשיר (ללא רשת — יסונכרן בחיבור מחדש)",
    back_online: "🟢 חזרתם לרשת — סונכרן לענן!",
    offline_mode: "📶 מצב לא מקוון — שומר על המכשיר",
    room_tag: "🔐 חדר #",
    both_in: "🟢 שני בני הזוג בחדר",
    one_in: "🔴 רק בן/בת זוג 1 בחדר",
    you_role: "את/ה: צד {r} ⇄",
    new_room: "🔄 חדר חדש",
    sync_wa: "📲 סנכרון בן/בת הזוג בוואטסאפ",
    lbl_a: "צד א׳ (חדר 1)",
    lbl_b: "צד ב׳ (חדר 2)",
    ph_type_a: "הקלידו תשובה (צד א׳)...",
    ph_type_b: "הקלידו תשובה (צד ב׳)...",
    locked_reveal_a: "🔒 צד א׳ נעל תשובה! נעלו את שלכם לחשיפה...",
    locked_reveal_b: "🔒 צד ב׳ נעל תשובה! נעלו את שלכם לחשיפה...",
    ph_ans_a: "🔒 צד א׳ ענה!",
    ph_ans_b: "🔒 צד ב׳ ענה!",
    ph_wait_a: "ממתין לצד א׳ (חדר 1)...",
    ph_wait_b: "ממתין לצד ב׳ (חדר 2)...",
    btn_lock_a: "🔒 נעל תשובת צד א׳ ↵",
    btn_lock_b: "🔒 נעל תשובת צד ב׳ ↵",
    btn_locked_a: "✅ תשובת צד א׳ ננעלה! (לחצו לעדכון ↵)",
    btn_locked_b: "✅ תשובת צד ב׳ ננעלה! (לחצו לעדכון ↵)",
    btn_encrypting: "🔐 מצפין ונועל תשובה...",
    toast_empty: "⚠️ הקלידו תשובה תחילה ואז לחצו על נעילת תשובה ↵",
    toast_match_next: "✅ סומן כתואם! מעביר את שני המכשירים לשאלה הבאה...",
    toast_flag_next: "🚨 סומנה סתירה לבדיקה! עובר לשאלה הבאה...",
    toast_auto_match: "✅ שניכם עניתם זהה! עובר אוטומטית לשאלה הבאה...",
    toast_diff: "⚠️ ניסוח שונה זוהה! השוו תשובות למטה:",
    aligned_head: "🟢 <strong>התאמה מלאה בין בני הזוג!</strong>",
    auto_adv: "✨ עובר אוטומטית לשאלה הבאה...",
    compare_head: "🚨 <strong>השוו את התשובות שלכם (אותה כוונה או סתירה מול הפקיד?):</strong>",
    btn_same: "✅ אותה משמעות (סמן התאמה והמשך ←)",
    btn_contra: "🚨 סתירה! (סמן לחזרה והמשך ←)",
    wait_other: "⏳ <strong>{who}</strong> נעל/ה תשובה מוצפנת! ממתין ל<strong>{wait}</strong> בחדר #{tag} לנעילת תשובה ↵...",
    partner_a: "צד א׳",
    partner_b: "צד ב׳",
    wa_intro: "🔐 חדר שימוע זוגי מוצפן (משרד הפנים) #",
    wa_cta: "לחצו להצטרפות והשוואת תשובות: ",
    tip_lbl: "🛡️ טיפ לשימוע מול הפקיד:",
    unlocked_lbl: "פתוח",
    free_lbl: "חינם",
    he_btn_unlock: "🔓 פתיחת PDF נקי ללא סימן מים והעתקה ($89 ל-90 יום / $149 לכל החיים) ←",
    he_pw_msg: "📄 פתחו הפקת מכתבים וטפסים רשמיים בעברית ללא סימן מים ($89 ל-90 יום או $149 לכל החיים):"
  },
  fr: {
    saved_online: "☁️ Progression Sauvegardée",
    saved_offline: "💾 Sauvegardé Hors-Ligne (Sync auto dès connexion)",
    back_online: "🟢 En Ligne — Synchronisé dans le Cloud !",
    offline_mode: "📶 Mode Hors-Ligne Actif — Sauvegarde Locale",
    room_tag: "🔐 Salle #",
    both_in: "🟢 Les 2 Conjoints dans la Salle",
    one_in: "🔴 1 Seul Conjoint Connecté",
    you_role: "Vous : Conjoint {r} ⇄",
    new_room: "🔄 Nouvelle Salle",
    sync_wa: "📲 Inviter Conjoint sur WhatsApp",
    lbl_a: "Conjoint A (Salle 1)",
    lbl_b: "Conjoint B (Salle 2)",
    ph_type_a: "Tapez la réponse du Conjoint A...",
    ph_type_b: "Tapez la réponse du Conjoint B...",
    locked_reveal_a: "🔒 Conjoint A a validé ! Validez la vôtre pour révéler...",
    locked_reveal_b: "🔒 Conjoint B a validé ! Validez la vôtre pour révéler...",
    ph_ans_a: "🔒 Conjoint A a répondu !",
    ph_ans_b: "🔒 Conjoint B a répondu !",
    ph_wait_a: "En attente du Conjoint A (Salle 1)...",
    ph_wait_b: "En attente du Conjoint B (Salle 2)...",
    btn_lock_a: "🔒 Valider Réponse Conjoint A ↵",
    btn_lock_b: "🔒 Valider Réponse Conjoint B ↵",
    btn_locked_a: "✅ Conjoint A Validé ! (Appuyer pour modifier ↵)",
    btn_locked_b: "✅ Conjoint B Validé ! (Appuyer pour modifier ↵)",
    btn_encrypting: "🔐 Chiffrement & Validation...",
    toast_empty: "⚠️ Écrivez d'abord votre réponse puis appuyez sur Valider ↵",
    toast_match_next: "✅ Aligné ! Passage des 2 téléphones à la question suivante...",
    toast_flag_next: "🚨 Contradiction notée ! Passage à la question suivante...",
    toast_auto_match: "✅ Réponses Identiques ! Question suivante...",
    toast_diff: "⚠️ Formulation différente ! Comparez vos réponses ci-dessous :",
    aligned_head: "🟢 <strong>LES DEUX CONJOINTS SONT ALIGNÉS !</strong>",
    auto_adv: "✨ Passage automatique à la question suivante...",
    compare_head: "🚨 <strong>COMPAREZ VOS RÉPONSES (Concordance ou Contradiction ?) :</strong>",
    btn_same: "✅ Même Sens (Compter & Suivant →)",
    btn_contra: "🚨 Contradiction ! (Signaler & Suivant →)",
    wait_other: "⏳ <strong>{who}</strong> a verrouillé une réponse chiffrée ! En attente de <strong>{wait}</strong> dans la Salle #{tag}...",
    partner_a: "Conjoint A",
    partner_b: "Conjoint B",
    wa_intro: "🔐 Salle Couple Chiffrée E2E Misrad HaPanim #",
    wa_cta: "Rejoindre & comparer nos réponses : ",
    tip_lbl: "🛡️ Conseil d'Audit Guichet :",
    unlocked_lbl: "Débloqué",
    free_lbl: "Gratuit",
    he_btn_unlock: "🔓 Débloquer PDF Hébreu Sans Filigrane & Copie (89$ Pass 90j / 149$ à Vie) →",
    he_pw_msg: "📄 Débloquez vos formulaires et lettres officielles en hébreu sans filigrane (89$ Pass 90 Jours ou 149$ à Vie) :"
  },
  es: {
    saved_online: "☁️ Progreso Guardado Automáticamente",
    saved_offline: "💾 Guardado Sin Conexión (Se sincronizará al volver)",
    back_online: "🟢 En Línea — ¡Sincronizado en la Nube!",
    offline_mode: "📶 Modo Sin Conexión — Guardando en Dispositivo",
    room_tag: "🔐 Sala #",
    both_in: "🟢 Ambos en la Sala",
    one_in: "🔴 Solo 1 Pareja en la Sala",
    you_role: "Tú: Pareja {r} ⇄",
    new_room: "🔄 Nueva Sala",
    sync_wa: "📲 Sincronizar por WhatsApp",
    lbl_a: "Pareja A (Sala 1)",
    lbl_b: "Pareja B (Sala 2)",
    ph_type_a: "Escribe respuesta de Pareja A...",
    ph_type_b: "Escribe respuesta de Pareja B...",
    locked_reveal_a: "🔒 ¡Pareja A bloqueó su respuesta! Bloquea la tuya para revelar...",
    locked_reveal_b: "🔒 ¡Pareja B bloqueó su respuesta! Bloquea la tuya para revelar...",
    ph_ans_a: "🔒 ¡Pareja A respondió!",
    ph_ans_b: "🔒 ¡Pareja B respondió!",
    ph_wait_a: "Esperando a Pareja A (Sala 1)...",
    ph_wait_b: "Esperando a Pareja B (Sala 2)...",
    btn_lock_a: "🔒 Bloquear Respuesta Pareja A ↵",
    btn_lock_b: "🔒 Bloquear Respuesta Pareja B ↵",
    btn_locked_a: "✅ ¡Pareja A Bloqueada! (Toca para actualizar ↵)",
    btn_locked_b: "✅ ¡Pareja B Bloqueada! (Toca para actualizar ↵)",
    btn_encrypting: "🔐 Cifrando y Bloqueando...",
    toast_empty: "⚠️ Escribe tu respuesta primero y toca Bloquear Respuesta ↵",
    toast_match_next: "✅ ¡Alineados! Pasando ambos teléfonos a la siguiente pregunta...",
    toast_flag_next: "🚨 ¡Contradicción marcada! Pasando a la siguiente pregunta...",
    toast_auto_match: "✅ ¡Ambos Coinciden! Avanzando automáticamente...",
    toast_diff: "⚠️ ¡Redacción diferente! Comparen sus respuestas abajo:",
    aligned_head: "🟢 <strong>¡AMBOS MIEMBROS DE LA PAREJA COINCIDEN!</strong>",
    auto_adv: "✨ Avanzando automáticamente a la siguiente pregunta...",
    compare_head: "🚨 <strong>COMPAREN SUS RESPUESTAS (¿Coinciden o se contradicen?):</strong>",
    btn_same: "✅ Mismo Significado (Contar y Siguiente →)",
    btn_contra: "🚨 ¡Contradicción! (Marcar y Siguiente →)",
    wait_other: "⏳ ¡<strong>{who}</strong> guardó una respuesta cifrada! Esperando a <strong>{wait}</strong> en la Sala #{tag}...",
    partner_a: "Pareja A",
    partner_b: "Pareja B",
    wa_intro: "🔐 Sala de Parejas Cifrada E2E Misrad HaPanim #",
    wa_cta: "Toca para unirte y comparar respuestas: ",
    tip_lbl: "🛡️ Consejo de Auditoría:",
    unlocked_lbl: "Desbloqueado",
    free_lbl: "Gratis",
    he_btn_unlock: "🔓 Desbloquear PDF en Hebreo Sin Marca de Agua ($89 Pase 90d / $149 de por Vida) →",
    he_pw_msg: "📄 Desbloquee cartas y formularios oficiales en hebreo sin marca de agua ($89 Pase 90 Días o $149 de por Vida):"
  },
  de: {
    saved_online: "☁️ Fortschritt Automatisch Gespeichert",
    saved_offline: "💾 Offline auf Gerät Gespeichert (Sync bei Verbindung)",
    back_online: "🟢 Wieder Online — Cloud Synchronisiert!",
    offline_mode: "📶 Offline-Modus Aktiv — Speicherung auf Gerät",
    room_tag: "🔐 Raum #",
    both_in: "🟢 Beide Partner im Raum",
    one_in: "🔴 Nur 1 Partner im Raum",
    you_role: "Du: Partner {r} ⇄",
    new_room: "🔄 Neuer Raum",
    sync_wa: "📲 Partner per WhatsApp Verbinden",
    lbl_a: "Partner A (Raum 1)",
    lbl_b: "Partner B (Raum 2)",
    ph_type_a: "Antwort Partner A eingeben...",
    ph_type_b: "Antwort Partner B eingeben...",
    locked_reveal_a: "🔒 Partner A hat gesperrt! Sperre deine zum Aufdecken...",
    locked_reveal_b: "🔒 Partner B hat gesperrt! Sperre deine zum Aufdecken...",
    ph_ans_a: "🔒 Partner A hat geantwortet!",
    ph_ans_b: "🔒 Partner B hat geantwortet!",
    ph_wait_a: "Warte auf Partner A (Raum 1)...",
    ph_wait_b: "Warte auf Partner B (Raum 2)...",
    btn_lock_a: "🔒 Antwort Partner A Sperren ↵",
    btn_lock_b: "🔒 Antwort Partner B Sperren ↵",
    btn_locked_a: "✅ Partner A Gesperrt! (Zum Ändern tippen ↵)",
    btn_locked_b: "✅ Partner B Gesperrt! (Zum Ändern tippen ↵)",
    btn_encrypting: "🔐 Verschlüsseln & Sperren...",
    toast_empty: "⚠️ Bitte zuerst Antwort eingeben und dann auf Sperren tippen ↵",
    toast_match_next: "✅ Als Übereinstimmung markiert! Nächste Frage auf beiden Handys...",
    toast_flag_next: "🚨 Widerspruch markiert! Nächste Frage...",
    toast_auto_match: "✅ Beide Stimmen Überein! Automatisch weiter...",
    toast_diff: "⚠️ Unterschiedliche Formulierung! Antworten unten vergleichen:",
    aligned_head: "🟢 <strong>BEIDE PARTNER STIMMEN ÜBEREIN!</strong>",
    auto_adv: "✨ Automatischer Wechsel zur nächsten Frage...",
    compare_head: "🚨 <strong>ANTWORTEN VERGLEICHEN (Gleiche Bedeutung oder Widerspruch?):</strong>",
    btn_same: "✅ Gleiche Bedeutung (Zählen & Weiter →)",
    btn_contra: "🚨 Widerspruch! (Markieren & Weiter →)",
    wait_other: "⏳ <strong>{who}</strong> hat verschlüsselt geantwortet! Warte auf <strong>{wait}</strong> in Raum #{tag}...",
    partner_a: "Partner A",
    partner_b: "Partner B",
    wa_intro: "🔐 Misrad HaPanim E2E-Raum #",
    wa_cta: "Tippen zum Beitreten & Vergleichen: ",
    tip_lbl: "🛡️ Schalter-Prüftipp:",
    unlocked_lbl: "Freigeschaltet",
    free_lbl: "Gratis",
    he_btn_unlock: "🔓 Hebräisches PDF ohne Wasserzeichen & Kopie Freischalten ($89 90-Tage / $149 Lebenslang) →",
    he_pw_msg: "📄 Schalten Sie offizielle hebräische Briefe & Formulare ohne Wasserzeichen frei ($89 90-Tage-Pass oder $149 Lebenslang):"
  }
  ,
  ru: {
    "saved_online": "☁️ Прогресс сохранён в облаке",
    "saved_offline": "💾 Сохранено офлайн на устройстве (синхронизируется при сети)",
    "back_online": "🟢 Снова в сети — синхронизировано!",
    "offline_mode": "📶 Офлайн-режим — сохранение на устройство",
    "room_tag": "🔐 Комната #",
    "both_in": "🟢 Оба партнёра в комнате",
    "one_in": "🔴 Только 1 партнёр в комнате",
    "you_role": "Вы: Партнёр {r} ⇄",
    "new_room": "🔄 Новая комната",
    "sync_wa": "📲 Пригласить партнёра в WhatsApp",
    "lbl_a": "Партнёр A (Кабинет 1)",
    "lbl_b": "Партнёр B (Кабинет 2)",
    "ph_type_a": "Введите ответ Партнёра A...",
    "ph_type_b": "Введите ответ Партнёра B...",
    "locked_reveal_a": "🔒 Партнёр A зафиксировал ответ! Зафиксируйте свой для сверки...",
    "locked_reveal_b": "🔒 Партнёр B зафиксировал ответ! Зафиксируйте свой для сверки...",
    "ph_ans_a": "🔒 Партнёр A ответил!",
    "ph_ans_b": "🔒 Партнёр B ответил!",
    "ph_wait_a": "Ожидание Партнёра A (Кабинет 1)...",
    "ph_wait_b": "Ожидание Партнёра B (Кабинет 2)...",
    "btn_lock_a": "🔒 Зафиксировать ответ Партнёра A ↵",
    "btn_lock_b": "🔒 Зафиксировать ответ Партнёра B ↵",
    "btn_locked_a": "✅ Ответ Партнёра A зафиксирован! (Нажмите для изменения ↵)",
    "btn_locked_b": "✅ Ответ Партнёра B зафиксирован! (Нажмите для изменения ↵)",
    "btn_encrypting": "🔐 Шифрование и фиксация...",
    "toast_empty": "⚠️ Сначала введите ваш ответ, затем нажмите Зафиксировать ↵",
    "toast_match_next": "✅ Отмечено как совпадение! Переход к следующему вопросу...",
    "toast_flag_next": "🚨 Противоречие отмечено! Переход к следующему вопросу...",
    "toast_auto_match": "✅ Оба ответили одинаково! Автопереход...",
    "toast_diff": "⚠️ Разные формулировки! Сравните ваши ответы ниже:",
    "aligned_head": "🟢 <strong>ОТВЕТЫ ОБОИХ ПАРТНЁРОВ СОВПАДАЮТ!</strong>",
    "auto_adv": "✨ Автоматический переход к следующему вопросу...",
    "compare_head": "🚨 <strong>СРАВНИТЕ ВАШИ ОТВЕТЫ (Совпадают по смыслу или противоречат?):</strong>",
    "btn_same": "✅ Одинаковый смысл (Засчитать и далее →)",
    "btn_contra": "🚨 Противоречие! (На повторение и далее →)",
    "wait_other": "⏳ <strong>{who}</strong> зафиксировал(а) зашифрованный ответ! Ожидание <strong>{wait}</strong> в комнате #{tag}...",
    "partner_a": "Партнёр A",
    "partner_b": "Партнёр B",
    "wa_intro": "🔐 Зашифрованная комната подготовки к опросу МВД #",
    "wa_cta": "Нажмите, чтобы войти и сверить ответы: ",
    "tip_lbl": "🛡️ Совет по проверке МВД:",
    "unlocked_lbl": "Открыто",
    "free_lbl": "Бесплатно",
    "he_btn_unlock": "🔓 Открыть чистый PDF без водяных знаков и копирование ($89 на 90 дн. / $149 Навсегда) →",
    "he_pw_msg": "📄 Откройте чистые официальные бланки и письма на иврите для МВД и Комиссии по исключениям без водяных знаков ($89 на 90 дней или $149 Навсегда):"
}
};

window.getCpSyncT = function() {
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  return window.CP_SYNC_I18N[l] || window.CP_SYNC_I18N.en;
};

window.showDraftSavedBadge = function(customText, isOfflineWarn) {
  let b = document.getElementById('gat-draft-saved-pill');
  if (!b) {
    b = document.createElement('div');
    b.id = 'gat-draft-saved-pill';
    b.style.cssText = 'position:fixed;bottom:16px;right:16px;border-radius:999px;padding:7px 14px;font-size:0.75rem;font-weight:800;z-index:9999;box-shadow:0 8px 20px rgba(0,0,0,0.25);opacity:0;transition:opacity 0.25s;pointer-events:none;';
    document.body.appendChild(b);
  }
  const offline = (typeof navigator !== 'undefined' && navigator.onLine === false) || isOfflineWarn;
  b.style.background = offline ? '#78350f' : '#0f172a';
  b.style.color = offline ? '#fde68a' : '#38bdf8';
  b.style.border = offline ? '1.5px solid #f59e0b' : '1.5px solid #0284c7';
  const ct = window.getCpSyncT();
  b.innerText = customText || (offline ? ct.saved_offline : ct.saved_online);
  b.style.opacity = '1';
  clearTimeout(window._draftPillTimer);
  window._draftPillTimer = setTimeout(function() { b.style.opacity = '0'; }, 2400);
};

window.pushDraftToFirestore = function(draft, nowMs, forceLeadStatus) {
  if (!window.gatDb || !window.gatUid) {
    localStorage.setItem('gat_form_dirty_cloud', '1');
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    localStorage.setItem('gat_form_dirty_cloud', '1');
    if (forceLeadStatus) localStorage.setItem('gat_pending_lead_status', forceLeadStatus);
  }

  // 1. Save complete form state with client millisecond timestamp for conflict resolution
  window.gatDb.collection('user_form_drafts').doc(window.gatUid).set({
    draft: draft,
    updatedAtMs: nowMs,
    lang: window.appLang || 'en',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).then(function() {
    localStorage.removeItem('gat_form_dirty_cloud');
  }).catch(function() {
    localStorage.setItem('gat_form_dirty_cloud', '1');
  });

  // 2. Sync Vetted Team / Notary / Lawyer lead if any intake fields have data
  const hasLeadData = !!(
    (draft['vt-name'] && draft['vt-name'].trim()) ||
    (draft['vt-wa'] && draft['vt-wa'].trim()) ||
    (draft['vt-notes'] && draft['vt-notes'].trim()) ||
    forceLeadStatus
  );

  if (hasLeadData) {
    const lang = window.appLang || 'en';
    const v = VETTED_I18N[lang] || VETTED_I18N.en;
    const choice = draft.vt_choice || 0;
    const svcObj = v.svcs[choice] || v.svcs[0];
    const region = draft['vt-region'] || '';
    const isLegalOrNorth = (choice === 3 || choice === 4 || region.includes('Safed') || region.includes('צפת'));
    const routeTag = isLegalOrNorth ? '[🔥 PRIORITY NOTARY / LAWYER ESCORT DESK]' : '[🕍 VETTED RABBI / KALLAH BOOKING]';

    const leadPayload = {
      uid: window.gatUid,
      status: forceLeadStatus || localStorage.getItem('gat_pending_lead_status') || 'in_progress_draft',
      updatedAtMs: nowMs,
      lang: lang,
      routeTag: routeTag,
      serviceIdx: choice,
      serviceName: svcObj.t,
      priceTier: svcObj.p,
      region: region,
      track: draft['vt-track'] || '',
      name: (draft['vt-name'] || '').trim(),
      whatsapp: (draft['vt-wa'] || '').trim(),
      targetDate: (draft['vt-date'] || '').trim() || 'Flexible / ASAP',
      notes: (draft['vt-notes'] || '').trim(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const leadCheckStr = JSON.stringify([leadPayload.status, leadPayload.serviceIdx, leadPayload.region, leadPayload.track, leadPayload.name, leadPayload.whatsapp, leadPayload.targetDate, leadPayload.notes]);
    if (leadCheckStr !== window.gatLastLeadSnapshot) {
      window.gatLastLeadSnapshot = leadCheckStr;
      window.gatDb.collection('concierge_leads').doc(window.gatUid).set(leadPayload, { merge: true }).then(function() {
        localStorage.removeItem('gat_pending_lead_status');
      }).catch(function(){});
    }
  }
};

window.syncFormDraftIfChanged = function(forceLeadStatus) {
  if (window.gatIsRestoringDraft) return;
  const draft = window.collectCurrentFormDraft();
  const snapStr = JSON.stringify(draft);

  if (snapStr === window.gatLastSavedSnapshot && !forceLeadStatus) return;

  const nowMs = Date.now();
  window.gatLastSavedSnapshot = snapStr;
  try {
    localStorage.setItem('gat_form_draft_v1', snapStr);
    localStorage.setItem('gat_form_draft_snapshot', snapStr);
    localStorage.setItem('gat_form_draft_ts', String(nowMs));
    localStorage.setItem('gat_vt_choice', String(draft.vt_choice || 0));
  } catch (e) {}

  window.showDraftSavedBadge();
  window.pushDraftToFirestore(draft, nowMs, forceLeadStatus);
};

window.flushOfflineDraftOnReconnect = function() {
  const isDirty = localStorage.getItem('gat_form_dirty_cloud') === '1' || !!localStorage.getItem('gat_pending_lead_status');
  if (!isDirty) return;
  let savedDraft = null;
  try { savedDraft = JSON.parse(localStorage.getItem('gat_form_draft_v1') || 'null'); } catch(e){}
  if (!savedDraft) return;
  const savedTs = parseInt(localStorage.getItem('gat_form_draft_ts') || String(Date.now()), 10);
  const pendingStatus = localStorage.getItem('gat_pending_lead_status') || undefined;
  window.pushDraftToFirestore(savedDraft, savedTs, pendingStatus);
  window.showDraftSavedBadge(window.getCpSyncT().back_online, false);
};

window.addEventListener('online', function() {
  window.flushOfflineDraftOnReconnect();
});

window.addEventListener('offline', function() {
  window.showDraftSavedBadge(window.getCpSyncT().offline_mode, true);
});

window.restoreSavedFormDraft = function(customDraftObj) {
  let draft = customDraftObj;
  if (!draft) {
    try {
      draft = JSON.parse(localStorage.getItem('gat_form_draft_v1') || 'null');
    } catch (e) { draft = null; }
  }
  if (!draft || typeof draft !== 'object') return;

  window.gatIsRestoringDraft = true;
  try {
    if (typeof draft.vt_choice === 'number') {
      window.selectedConciergeChoice = draft.vt_choice;
      document.querySelectorAll('#vt-svc-grid .svc-row').forEach((r, i) => r.classList.toggle('active', i === draft.vt_choice));
    }
    for (let i = 0; i < GAT_FORM_FIELDS.length; i++) {
      const id = GAT_FORM_FIELDS[i];
      if (!(id in draft)) continue;
      const el = document.getElementById(id);
      if (!el || document.activeElement === el) continue;
      if (el.type === 'checkbox') {
        el.checked = !!draft[id];
      } else if (draft[id] !== undefined && draft[id] !== null && draft[id] !== '') {
        el.value = draft[id];
      }
    }
    const sharedName = draft['he-name'] || draft['vt-name'] || draft['rb-cand'] || '';
    if (sharedName) {
      ['he-name', 'vt-name', 'rb-cand'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el && !el.value && document.activeElement !== el) el.value = sharedName;
      });
    }
    window.gatLastSavedSnapshot = JSON.stringify(window.collectCurrentFormDraft());
  } finally {
    window.gatIsRestoringDraft = false;
  }
};

window.bindSmartFormListeners = function() {
  for (let i = 0; i < GAT_FORM_FIELDS.length; i++) {
    const el = document.getElementById(GAT_FORM_FIELDS[i]);
    if (!el || el.dataset.smartBound === '1') continue;
    el.dataset.smartBound = '1';
    el.addEventListener('change', function() { window.syncFormDraftIfChanged(); });
    el.addEventListener('blur', function() { window.syncFormDraftIfChanged(); });
  }
};

window.pullCloudFormDraftOnce = function() {
  if (!window.gatDb || !window.gatUid || window._pulledCloudDraft) return;
  window._pulledCloudDraft = true;

  // First flush any dirty offline changes before pulling
  if (localStorage.getItem('gat_form_dirty_cloud') === '1') {
    window.flushOfflineDraftOnReconnect();
    return;
  }

  window.gatDb.collection('user_form_drafts').doc(window.gatUid).get().then(function(snap) {
    if (!snap.exists) return;
    const data = snap.data() || {};
    if (data.draft) {
      const localTs = parseInt(localStorage.getItem('gat_form_draft_ts') || '0', 10);
      const cloudTs = data.updatedAtMs || 0;
      let localDraft = {};
      try { localDraft = JSON.parse(localStorage.getItem('gat_form_draft_v1') || '{}'); } catch(e){}

      // Newest timestamp wins so an older cloud doc never overwrites newer offline work
      const merged = (localTs >= cloudTs)
        ? Object.assign({}, data.draft, localDraft)
        : Object.assign({}, localDraft, data.draft);

      localStorage.setItem('gat_form_draft_v1', JSON.stringify(merged));
      window.restoreSavedFormDraft(merged);
    }
  }).catch(function(){});
};

window.selectConciergeSvc = function(idx) {
  window.selectedConciergeChoice = idx;
  document.querySelectorAll('#vt-svc-grid .svc-row').forEach((r, i) => r.classList.toggle('active', i === idx));
  window.syncFormDraftIfChanged();
};

window.submitConciergeLead = function(via) {
  // Always save latest field state before submitting
  window.syncFormDraftIfChanged('submitted_' + (via || 'whatsapp'));

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
        <input id="vt-name" placeholder="Avraham Levi & Sarah Miller..." />

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
  window.restoreSavedFormDraft();
  window.bindSmartFormListeners();
  if (window.renderPaywallI18n) window.renderPaywallI18n();
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
  de: { p1:"📚 Paket 1: 200 Kern", p2:"🔥 Paket 2: +200 Fangfragen", m:"Gemeistert", r:"Wiederholen", tip:"🧠 Was die Dayanim erwarten:", free:"Gratis-Vorschau", unl:"Freigeschaltet" },
  ru: { p1:"📚 Пакет 1: 200 Базовых", p2:"🔥 Пакет 2: +200 Каверзных", m:"Изучено", r:"Повторить", tip:"🧠 Что ждут даяним:", free:"Бесплатно", unl:"Открыто" }
};

window.getFilteredBdList = function() {
  const raw = (window.bdPack === 4 ? window.BD_PACK4 : window.bdPack === 3 ? window.BD_PACK3 : window.bdPack === 2 ? window.BD_PACK2 : window.BD_PACK1) || [];
  if (!raw.length) return BD_CARDS;
  return window.bdCat === 'all' ? raw : raw.filter(x => x.cat === window.bdCat);
};

window.setBdPack = function(p) {
  if (p > 1 && !window.canUnlockBdPack(p)) {
    const pwT = (window.PW_I18N && window.PW_I18N[window.appLang || 'en']) || window.PW_I18N.en;
    const labels = { 2: pwT.pack2_pw, 3: pwT.pack3_pw, 4: pwT.pack4_pw };
    window.openProPaywall(labels[p], true);
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

// ============================================================================
// E2E ENCRYPTED (AES-GCM-256) + FIREBASE COUPLES SYNC (NOHAL 5.2.0008)
// ============================================================================
const GAT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyA_fCVlj3cXXkyW5TT83Qpe07mAQWQFTiA",
  authDomain: "giyur-aliyah-track.firebaseapp.com",
  projectId: "giyur-aliyah-track",
  storageBucket: "giyur-aliyah-track.firebasestorage.app",
  messagingSenderId: "709763456541",
  appId: "1:709763456541:web:ed1acfac549a580b51b0f4",
  measurementId: "G-EY82CZX1J6"
};

window.gatDb = null;
window.gatUid = null;
window.cpUnsub = null;
window.cpCat = 'all';
window.cpRole = localStorage.getItem('gat_cp_role') || 'A';
window.cpPartnerPresent = false;
window.cpDbError = '';
window.cpLastAutoAdvanceId = null;

window.generateSecureToken = function(len) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const bytes = new Uint8Array(len || 24);
  window.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
  return out;
};

window.getHashParam = function(name) {
  const h = (window.location.hash || '').replace(/^#/, '');
  return new URLSearchParams(h).get(name);
};

window.resolveInitialCpRoom = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlRoom = urlParams.get('room');
  const urlKey = window.getHashParam('k') || urlParams.get('k');

  if (urlRoom && urlRoom.trim().length >= 12) {
    const cleanRoom = urlRoom.trim();
    const prevRoom = localStorage.getItem('gat_cp_room');
    if (prevRoom !== cleanRoom) {
      localStorage.setItem('gat_cp_room', cleanRoom);
      localStorage.setItem('gat_cp_role', 'B');
      window.cpRole = 'B';
    }
    if (urlKey && urlKey.trim().length >= 12) {
      localStorage.setItem('gat_cp_key_' + cleanRoom, urlKey.trim());
    }
    return cleanRoom;
  }

  let savedRoom = localStorage.getItem('gat_cp_room');
  if (!savedRoom || savedRoom.length < 16) {
    savedRoom = window.generateSecureToken(22);
    localStorage.setItem('gat_cp_room', savedRoom);
    localStorage.setItem('gat_cp_role', 'A');
    window.cpRole = 'A';
  }
  if (!localStorage.getItem('gat_cp_key_' + savedRoom)) {
    localStorage.setItem('gat_cp_key_' + savedRoom, window.generateSecureToken(32));
  }
  return savedRoom;
};

window.cpRoom = window.resolveInitialCpRoom();
window.cpKeyStr = localStorage.getItem('gat_cp_key_' + window.cpRoom) || window.generateSecureToken(32);
localStorage.setItem('gat_cp_key_' + window.cpRoom, window.cpKeyStr);
window.cpAnswers = JSON.parse(localStorage.getItem('gat_cp_ans_' + window.cpRoom) || '{}');

window.deriveCpCryptoKey = async function(secretStr, roomId) {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    'raw', enc.encode(secretStr || 'default_key'), { name: 'PBKDF2' }, false, ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('gat_e2ee_' + roomId), iterations: 10000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

window.encryptCpText = async function(plainText) {
  if (!plainText) return '';
  try {
    const key = await window.deriveCpCryptoKey(window.cpKeyStr, window.cpRoom);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);
    const cipherBuf = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encoded);
    const ivB64 = btoa(String.fromCharCode.apply(null, iv));
    const ctB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(cipherBuf)));
    return 'enc_v1:' + ivB64 + ':' + ctB64;
  } catch (e) {
    return plainText;
  }
};

window.decryptCpText = async function(payload) {
  if (!payload) return '';
  if (!payload.startsWith('enc_v1:')) return payload;
  try {
    const parts = payload.split(':');
    if (parts.length !== 3) return payload;
    const iv = Uint8Array.from(atob(parts[1]), c => c.charCodeAt(0));
    const ct = Uint8Array.from(atob(parts[2]), c => c.charCodeAt(0));
    const key = await window.deriveCpCryptoKey(window.cpKeyStr, window.cpRoom);
    const plainBuf = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct);
    return new TextDecoder().decode(plainBuf);
  } catch (e) {
    return '🔒 [Tap Sync Link Again to Load Key]';
  }
};

window.showCpToast = function(msg, isSuccess) {
  let t = document.getElementById('cp-live-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'cp-live-toast';
    t.style.cssText = 'position:fixed;top:74px;left:50%;transform:translateX(-50%);z-index:99999;padding:12px 20px;border-radius:14px;font-weight:900;font-size:0.92rem;box-shadow:0 14px 34px rgba(0,0,0,0.3);transition:opacity 0.25s;text-align:center;max-width:92vw;';
    document.body.appendChild(t);
  }
  t.style.background = isSuccess ? '#059669' : '#dc2626';
  t.style.color = '#ffffff';
  t.style.border = isSuccess ? '2px solid #a7f3d0' : '2px solid #fecaca';
  t.innerHTML = msg;
  t.style.opacity = '1';
  t.style.display = 'block';
  clearTimeout(window._cpToastTimer);
  window._cpToastTimer = setTimeout(function() {
    t.style.opacity = '0';
    setTimeout(function() { t.style.display = 'none'; }, 260);
  }, 2800);
};

window.initCpFirebase = function() {
  if (typeof firebase === 'undefined' || !firebase.initializeApp) return;
  try {
    const appInstance = firebase.apps.length ? firebase.app() : firebase.initializeApp(GAT_FIREBASE_CONFIG);
    window.gatDb = firebase.firestore(appInstance);
    try {
      window.gatDb.enablePersistence({ synchronizeTabs: true }).catch(function(){});
    } catch(e) {}
    firebase.auth(appInstance).onAuthStateChanged(function(user) {
      if (user) {
        window.gatUid = user.uid;
        window.cpDbError = '';
        window.connectCpRoom(window.cpRoom);
        if (window.pullCloudFormDraftOnce) window.pullCloudFormDraftOnce();
        if (window.syncProEntitlementFromCloud) window.syncProEntitlementFromCloud();
      } else {
        firebase.auth(appInstance).signInAnonymously().catch(function(err) {
          window.cpDbError = '🚨 Firebase Auth Error: ' + (err.message || 'Enable Anonymous Auth in Firebase Console!');
          updateCpCard();
        });
      }
    });
  } catch (err) {
    window.cpDbError = '🚨 Firebase Init Error: ' + (err.message || '');
    updateCpCard();
  }
};

window.getRoomTtlTimestamp = function() {
  const expDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours from now
  return (firebase.firestore && firebase.firestore.Timestamp)
    ? firebase.firestore.Timestamp.fromDate(expDate)
    : expDate;
};

window.connectCpRoom = function(roomId) {
  if (!window.gatDb || !window.gatUid || !roomId) return;
  if (window.cpUnsub) { window.cpUnsub(); window.cpUnsub = null; }

  const docRef = window.gatDb.collection('couples_rooms').doc(roomId);
  const urlHasRoom = new URLSearchParams(window.location.search).get('room') === roomId;

  docRef.get().then(function(snap) {
    if (!snap.exists) {
      window.cpRole = 'A';
      localStorage.setItem('gat_cp_role', 'A');
      return docRef.set({
        partnerAUid: window.gatUid,
        partnerBUid: null,
        partnerAPresent: true,
        partnerBPresent: false,
        currentIdx: cpIdx,
        answers: {},
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        expiresAt: window.getRoomTtlTimestamp()
      });
    } else {
      const data = snap.data() || {};
      if (urlHasRoom && data.partnerAUid !== window.gatUid) {
        window.cpRole = 'B';
      } else if (data.partnerBUid === window.gatUid) {
        window.cpRole = 'B';
      } else if (data.partnerAUid === window.gatUid && window.cpRole !== 'B') {
        window.cpRole = 'A';
      }
      localStorage.setItem('gat_cp_role', window.cpRole);
      const patch = { updatedAt: firebase.firestore.FieldValue.serverTimestamp(), expiresAt: window.getRoomTtlTimestamp() };
      if (window.cpRole === 'A') {
        patch.partnerAPresent = true;
      } else {
        patch.partnerBPresent = true;
        if (!data.partnerBUid) patch.partnerBUid = window.gatUid;
      }
      return docRef.set(patch, { merge: true });
    }
  }).catch(function(err) {
    window.cpDbError = '🚨 Firestore Error: ' + (err.message || '');
    updateCpCard();
  });

  window.cpUnsub = docRef.onSnapshot(async function(snap) {
    if (!snap.exists) return;
    const data = snap.data() || {};
    window.cpDbError = '';

    window.cpPartnerPresent = !!(
      (data.partnerAPresent && data.partnerBPresent) ||
      (data.partnerAUid && data.partnerBUid)
    );

    if (typeof data.currentIdx === 'number' && data.currentIdx !== cpIdx) {
      cpIdx = data.currentIdx;
    }

    const encAnswers = data.answers || {};
    const decryptedMap = {};
    const qIds = Object.keys(encAnswers);
    for (let i = 0; i < qIds.length; i++) {
      const qId = qIds[i];
      const row = encAnswers[qId] || {};
      decryptedMap[qId] = {
        a: row.a ? await window.decryptCpText(row.a) : '',
        b: row.b ? await window.decryptCpText(row.b) : '',
        verdict: row.verdict || ''
      };
    }
    window.cpAnswers = decryptedMap;
    localStorage.setItem('gat_cp_ans_' + roomId, JSON.stringify(window.cpAnswers));
    updateCpCard();
  }, function(err) {
    window.cpDbError = '🚨 Live Sync Blocked: ' + (err.message || '');
    updateCpCard();
  });
};

window.resetCpRoom = function() {
  const newRoom = window.generateSecureToken(22);
  const newKey = window.generateSecureToken(32);
  window.cpRoom = newRoom;
  window.cpKeyStr = newKey;
  window.cpRole = 'A';
  window.cpAnswers = {};
  window.cpPartnerPresent = false;
  cpIdx = 0;
  localStorage.setItem('gat_cp_room', newRoom);
  localStorage.setItem('gat_cp_key_' + newRoom, newKey);
  localStorage.setItem('gat_cp_role', 'A');
  const url = new URL(window.location.href);
  url.searchParams.set('module', 'couples-sync');
  url.searchParams.set('room', newRoom);
  url.searchParams.set('k', newKey);
  url.hash = 'k=' + newKey;
  window.history.replaceState({}, '', url.toString());
  if (window.gatDb && window.gatUid) window.connectCpRoom(newRoom);
  updateCpCard();
};

window.toggleCpRole = function() {
  window.cpRole = (window.cpRole === 'A') ? 'B' : 'A';
  localStorage.setItem('gat_cp_role', window.cpRole);
  if (window.gatDb && window.gatUid) {
    const docRef = window.gatDb.collection('couples_rooms').doc(window.cpRoom);
    const updateObj = { partnerAPresent: true, partnerBPresent: true };
    if (window.cpRole === 'B') updateObj.partnerBUid = window.gatUid;
    docRef.set(updateObj, { merge: true }).catch(function(){});
  }
  updateCpCard();
};

window.getFilteredCpList = function() {
  const raw = window.CP_DECK80 || COUPLE_QS;
  return (window.cpCat === 'all' || !window.CP_DECK80) ? raw : raw.filter(x => x.cat === window.cpCat);
};

window.setCpCat = function(c) { window.cpCat = c; cpIdx = 0; updateCpCard(); };

window.prevCpCard = function() {
  cpIdx = Math.max(0, cpIdx - 1);
  if (window.gatDb && window.gatUid) {
    window.gatDb.collection('couples_rooms').doc(window.cpRoom).set({ currentIdx: cpIdx }, { merge: true }).catch(function(){});
  }
  updateCpCard();
};

window.areCpAnswersAligned = function(a, b) {
  if (!a || !b) return false;
  const clean = s => s.toLowerCase().replace(/[^a-z0-9֐-׿s]/g, ' ').trim();
  const ca = clean(a), cb = clean(b);
  if (ca === cb || ca.includes(cb) || cb.includes(ca)) return true;
  const stop = new Set(['the','and','for','with','side','bed','sleep','sleeps','on','in','to','of','is','are','we','my','our','each','person','partner']);
  const wa = ca.split(/\s+/).filter(w => w.length >= 2 && !stop.has(w));
  const wb = cb.split(/\s+/).filter(w => w.length >= 2 && !stop.has(w));
  if (!wa.length || !wb.length) return false;
  const shared = wa.filter(w => wb.includes(w));
  return shared.length >= Math.min(2, Math.min(wa.length, wb.length));
};

window.submitMyCpAns = async function() {
  const ct = window.getCpSyncT();
  const list = window.getFilteredCpList(), item = list[cpIdx % list.length];
  if (!item) return;
  const id = String(item.id || (cpIdx + 1));
  const ia = document.getElementById('cp-ans-a');
  const ib = document.getElementById('cp-ans-b');
  const cur = window.cpAnswers[id] || { a: '', b: '', verdict: '' };

  const myVal = (window.cpRole === 'A' ? (ia ? ia.value : cur.a) : (ib ? ib.value : cur.b)).trim();
  if (!myVal) {
    window.showCpToast(ct.toast_empty, false);
    return;
  }

  const btn = document.getElementById('cp-submit-btn');
  if (btn) { btn.innerText = ct.btn_encrypting; btn.disabled = true; }

  window.cpAnswers[id] = {
    a: window.cpRole === 'A' ? myVal : (cur.a || ''),
    b: window.cpRole === 'B' ? myVal : (cur.b || ''),
    verdict: cur.verdict || ''
  };
  localStorage.setItem('gat_cp_ans_' + window.cpRoom, JSON.stringify(window.cpAnswers));

  if (window.gatDb && window.gatUid) {
    const cipherVal = await window.encryptCpText(myVal);
    const docRef = window.gatDb.collection('couples_rooms').doc(window.cpRoom);
    const roleField = window.cpRole === 'A' ? 'a' : 'b';
    const mergeObj = {
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiresAt: window.getRoomTtlTimestamp ? window.getRoomTtlTimestamp() : new Date(Date.now() + 48 * 3600 * 1000),
      answers: {}
    };
    mergeObj.answers[id] = {};
    mergeObj.answers[id][roleField] = cipherVal;
    if (window.cpRole === 'A') {
      mergeObj.partnerAPresent = true;
    } else {
      mergeObj.partnerBPresent = true;
      mergeObj.partnerBUid = window.gatUid;
    }

    await docRef.set(mergeObj, { merge: true }).catch(function(err) {
      window.cpDbError = '🚨 ' + (err.message || '');
    });
  }

  if (btn) { btn.innerText = window.cpRole === 'A' ? ct.btn_locked_a : ct.btn_locked_b; btn.disabled = false; }
  updateCpCard();
};

window.saveCpAns = window.submitMyCpAns;

window.markCpVerdictAndNext = function(id, verdictStatus) {
  const ct = window.getCpSyncT();
  if (!window.cpAnswers[id]) window.cpAnswers[id] = { a: '', b: '' };
  window.cpAnswers[id].verdict = verdictStatus;
  localStorage.setItem('gat_cp_ans_' + window.cpRoom, JSON.stringify(window.cpAnswers));

  if (verdictStatus === 'match') {
    window.showCpToast(ct.toast_match_next, true);
  } else {
    window.showCpToast(ct.toast_flag_next, false);
  }

  const nextIdx = cpIdx + 1;
  if (window.gatDb && window.gatUid) {
    const mergeObj = { currentIdx: nextIdx, answers: {} };
    mergeObj.answers[id] = { verdict: verdictStatus };
    window.gatDb.collection('couples_rooms').doc(window.cpRoom).set(mergeObj, { merge: true }).catch(function(){});
  }
  setTimeout(function() {
    cpIdx = nextIdx;
    updateCpCard();
  }, 900);
};

window.renderCpMatch = function(id) {
  const box = document.getElementById('cp-match-out');
  if (!box) return;
  const ct = window.getCpSyncT();
  const rec = window.cpAnswers[id] || { a: '', b: '', verdict: '' };
  const shortTag = window.cpRoom.slice(-5);

  if (window.cpDbError) {
    box.style.display = 'block';
    box.style.background = '#fee2e2';
    box.style.color = '#991b1b';
    box.innerHTML = window.cpDbError;
    return;
  }

  if (!rec.a && !rec.b) { box.style.display = 'none'; return; }
  box.style.display = 'block';

  if (rec.a && rec.b) {
    const autoSame = rec.verdict === 'match' || (rec.verdict !== 'mismatch' && window.areCpAnswersAligned(rec.a, rec.b));
    if (autoSame) {
      box.style.background = '#dcfce7';
      box.style.color = '#065f46';
      box.style.border = '2px solid #10b981';
      box.innerHTML = `
        <div style="font-size:0.92rem;margin-bottom:4px;">${ct.aligned_head}</div>
        <div style="font-weight:700;">• ${ct.partner_a}: "${rec.a}"<br>• ${ct.partner_b}: "${rec.b}"</div>
        <div style="margin-top:6px;font-size:0.76rem;color:#047857;">${ct.auto_adv}</div>
      `;
      if (window.cpLastAutoAdvanceId !== id) {
        window.cpLastAutoAdvanceId = id;
        window.showCpToast(ct.toast_auto_match, true);
        setTimeout(function() {
          if (cpIdx + 1 < FREE_CARD_LIMIT || window.canUnlockCouples()) {
            cpIdx++;
            if (window.gatDb && window.gatUid) {
              window.gatDb.collection('couples_rooms').doc(window.cpRoom).set({ currentIdx: cpIdx }, { merge: true }).catch(function(){});
            }
            updateCpCard();
          }
        }, 2500);
      }
    } else {
      box.style.background = '#fff1f2';
      box.style.color = '#9f1239';
      box.style.border = '2px solid #f43f5e';
      if (window.cpLastAutoAdvanceId !== id + '_diff') {
        window.cpLastAutoAdvanceId = id + '_diff';
        window.showCpToast(ct.toast_diff, false);
      }
      box.innerHTML = `
        <div style="font-size:0.9rem;margin-bottom:6px;">${ct.compare_head}</div>
        <div style="background:#fff;padding:8px 10px;border-radius:8px;border:1px solid #fecdd3;margin-bottom:8px;color:#0f172a;">
          <div><strong>${ct.lbl_a}:</strong> "${rec.a}"</div>
          <div style="margin-top:4px;"><strong>${ct.lbl_b}:</strong> "${rec.b}"</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" onclick="markCpVerdictAndNext('${id}','match')" style="flex:1;background:#059669;color:#fff;border:none;border-radius:8px;padding:9px 10px;font-weight:800;font-size:0.78rem;cursor:pointer;">${ct.btn_same}</button>
          <button type="button" onclick="markCpVerdictAndNext('${id}','mismatch')" style="flex:1;background:#dc2626;color:#fff;border:none;border-radius:8px;padding:9px 10px;font-weight:800;font-size:0.78rem;cursor:pointer;">${ct.btn_contra}</button>
        </div>
      `;
    }
  } else {
    const whoAnswered = rec.a ? ct.partner_a : ct.partner_b;
    const waitingFor = rec.a ? ct.partner_b : ct.partner_a;
    box.style.background = '#fef3c7';
    box.style.color = '#92400e';
    box.style.border = '1.5px solid #f59e0b';
    box.innerHTML = ct.wait_other.replace('{who}', whoAnswered).replace('{wait}', waitingFor).replace('{tag}', shortTag);
  }
};

window.shareCpRoomWA = function() {
  const ct = window.getCpSyncT();
  const list = window.getFilteredCpList(), item = list[cpIdx % list.length];
  const l = window.appLang || 'en';
  const qTxt = (item.q && item.q[l]) ? item.q[l] : item.q;
  const shortTag = window.cpRoom.slice(-5);
  const u = 'https://giyuraliyahtrack.com/app/?module=couples-sync&room=' + encodeURIComponent(window.cpRoom) + '&k=' + encodeURIComponent(window.cpKeyStr) + '#k=' + encodeURIComponent(window.cpKeyStr);
  const nl = String.fromCharCode(10);
  const msg = ct.wa_intro + shortTag + nl + qTxt + nl + ct.wa_cta + u;
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
};

updateCpCard = function() {
  const catEl = document.getElementById('cp-cat'), qEl = document.getElementById('cp-q'), tipEl = document.getElementById('cp-tip');
  if (!catEl || !qEl) return;
  const ct = window.getCpSyncT();
  const l = window.appLang || 'en', list = window.getFilteredCpList(), item = list[cpIdx % list.length];
  const pro = window.canUnlockCouples ? window.canUnlockCouples() : window.isProUnlocked();
  const id = String(item.id || (cpIdx + 1));
  const shortTag = window.cpRoom.slice(-5);
  const rb = document.getElementById('cp-room-bar');
  const mCnt = Object.values(window.cpAnswers).filter(x => x && x.a && x.b && (x.verdict === 'match' || (x.verdict !== 'mismatch' && window.areCpAnswersAligned(x.a, x.b)))).length;

  const presenceBadge = window.cpPartnerPresent
    ? '<span style="font-size:0.74rem;background:#dcfce7;color:#065f46;border:1.5px solid #10b981;padding:3px 9px;border-radius:999px;font-weight:900;">' + ct.both_in + '</span>'
    : '<span style="font-size:0.74rem;background:#fee2e2;color:#991b1b;border:1.5px solid #ef4444;padding:3px 9px;border-radius:999px;font-weight:900;">' + ct.one_in + '</span>';

  if (rb) {
    rb.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        <span>${ct.room_tag}${shortTag}</span>
        ${presenceBadge}
        <button type="button" onclick="toggleCpRole()" style="background:#0c4a6e;color:#fff;border:none;border-radius:6px;padding:3px 8px;font-size:0.72rem;font-weight:800;cursor:pointer;">${ct.you_role.replace('{r}', window.cpRole)}</button>
        <span>• ✅ ${mCnt}/80</span>
      </div>
      <div style="display:flex;gap:6px;">
        <button type="button" onclick="resetCpRoom()" style="background:#e2e8f0;color:#1e293b;border:none;border-radius:6px;padding:4px 8px;font-size:0.73rem;font-weight:800;cursor:pointer;">${ct.new_room}</button>
        <button type="button" onclick="shareCpRoomWA()" style="background:#059669;color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:0.75rem;font-weight:800;cursor:pointer;">${ct.sync_wa}</button>
      </div>`;
  }

  const lblA = document.getElementById('cp-lbl-a'), lblB = document.getElementById('cp-lbl-b');
  if (lblA) lblA.innerText = ct.lbl_a;
  if (lblB) lblB.innerText = ct.lbl_b;

  const cb = document.getElementById('cp-cat-bar');
  if (cb && window.CP_CATS_I18N) {
    cb.innerHTML = Object.keys(window.CP_CATS_I18N).map(k => `<button type="button" onclick="setCpCat('${k}')" style="flex:0 0 auto;padding:5px 10px;border-radius:999px;border:1px solid #cbd5e1;font-size:0.75rem;font-weight:800;cursor:pointer;background:${window.cpCat===k?'#0c4a6e':'#f8fafc'};color:${window.cpCat===k?'#fff':'#334155'};">${window.CP_CATS_I18N[k][l]||window.CP_CATS_I18N[k].en}</button>`).join('');
  }

  const badge = pro ? `${(cpIdx % list.length)+1}/${list.length} (${ct.unlocked_lbl})` : `${ct.free_lbl} ${(cpIdx % FREE_CP_LIMIT)+1}/${FREE_CP_LIMIT}`;
  const catLbl = (window.CP_CATS_I18N && window.CP_CATS_I18N[item.cat]) ? (window.CP_CATS_I18N[item.cat][l] || item.cat) : (item.c || '');
  catEl.innerText = `Nohal 5.2.0008 / 5.2.0009 • ${catLbl} • ${badge}`;
  qEl.innerText = (item.q && item.q[l]) ? item.q[l] : (item.q || '');
  if (tipEl) tipEl.innerHTML = `<strong>${ct.tip_lbl}</strong> ${(item.tip && item.tip[l]) ? item.tip[l] : ''}`;

  const rec = window.cpAnswers[id] || { a: '', b: '' };
  const bothAnswered = !!(rec.a && rec.b);
  const ia = document.getElementById('cp-ans-a'), ib = document.getElementById('cp-ans-b');
  const btn = document.getElementById('cp-submit-btn');

  if (ia && ib) {
    if (window.cpRole === 'A') {
      ia.disabled = false;
      ia.placeholder = ct.ph_type_a;
      if (document.activeElement !== ia) ia.value = rec.a || '';

      ib.disabled = true;
      ib.value = bothAnswered ? rec.b : (rec.b ? ct.locked_reveal_b : '');
      ib.placeholder = rec.b ? ct.ph_ans_b : ct.ph_wait_b;
      if (btn) btn.innerText = rec.a ? ct.btn_locked_a : ct.btn_lock_a;
    } else {
      ib.disabled = false;
      ib.placeholder = ct.ph_type_b;
      if (document.activeElement !== ib) ib.value = rec.b || '';

      ia.disabled = true;
      ia.value = bothAnswered ? rec.a : (rec.a ? ct.locked_reveal_a : '');
      ia.placeholder = rec.a ? ct.ph_ans_a : ct.ph_wait_a;
      if (btn) btn.innerText = rec.b ? ct.btn_locked_b : ct.btn_lock_b;
    }
  }
  renderCpMatch(id);
};

nextCpCard = function() {
  const pro = window.canUnlockCouples ? window.canUnlockCouples() : window.isProUnlocked();
  if (!pro && cpIdx + 1 >= FREE_CARD_LIMIT) {
    const pwT = (window.PW_I18N && window.PW_I18N[window.appLang || 'en']) || window.PW_I18N.en;
    window.openProPaywall(pwT.cp_limit_pw);
    return;
  }
  cpIdx++;
  if (window.gatDb && window.gatUid) {
    window.gatDb.collection('couples_rooms').doc(window.cpRoom).set({ currentIdx: cpIdx }, { merge: true }).catch(function(){});
  }
  updateCpCard();
};

window.initCpFirebase();

const _origGenHebrewDoc = genHebrewDoc;
genHebrewDoc = function() {
  if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged('generated_hebrew_doc');
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
    bar.innerHTML = `<button type="button" class="btn btn-gold" onclick="openProPaywall('📄 Unlock clean, watermark-free Hebrew PDF printing & instant clipboard copy for Misrad HaPanim / Va\'adat Charigim ($89 90-Day Dossier Pass or $149 Lifetime Filings Pass):')">🖨️ Unlock Clean Watermark-Free Hebrew PDF & Copy ($89 Sprint / $149 Lifetime) →</button>
    <button type="button" class="btn" style="background:#0b3b59;margin-top:8px;" onclick="openMod('vetted-team'); selectConciergeSvc(3);">🎀 Need Red-Ribbon Notary Seal on This Doc? Book Our Notary Desk →</button>`;
  } else {
    out.classList.remove('watermarked');
    window.print();
  }
};

const _origGenRabbiLetter = genRabbiLetter;
genRabbiLetter = function() {
  if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged('generated_rabbi_letter');
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
    bar.innerHTML = `<button type="button" class="btn btn-gold" onclick="openProPaywall('✍️ Unlock clean WhatsApp copy & official Rabbinic Letterhead PDF printing ($89 90-Day Dossier Pass or $149 Lifetime Filings Pass):')">📲 Unlock Clean WhatsApp Copy & Rabbinic Letterhead PDF →</button>
    <button type="button" class="btn" style="background:#0b3b59;margin-top:8px;" onclick="openMod('vetted-team'); selectConciergeSvc(0);">🕍 Don't Have a Sponsoring Rabbi Yet? Book Our Vetted Team ($349–$499) →</button>`;
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
window.songSubTab = 'songs';
window.activeSongIdxByTab = window.activeSongIdxByTab || { songs: 0, morning: 0, brachot: 0 };
window.speedPopupOpen = false;
(function initSeoTrackParams() {
  try {
    const sp = new URLSearchParams(window.location.search);
    const qTab = sp.get('tab');
    const qTrack = sp.get('track');
    if (qTab && (qTab === 'songs' || qTab === 'morning' || qTab === 'brachot')) {
      window.songSubTab = qTab;
      if (qTrack) {
        const arr = qTab === 'brachot' ? (window.BRACHOT_VAULT8 || []) : (qTab === 'morning' ? (window.MORNING_VAULT7 || []) : (window.SONGS_VAULT12 || []));
        const found = arr.findIndex(function(x) { return String(x.id) === String(qTrack); });
        if (found >= 0) window.activeSongIdxByTab[qTab] = found;
      }
    }
  } catch (e) {}
})();
window.getActiveSongIdx = function() {
  const tab = window.songSubTab || 'songs';
  const list = window.getActiveSongList();
  const raw = (window.activeSongIdxByTab && typeof window.activeSongIdxByTab[tab] === 'number') ? window.activeSongIdxByTab[tab] : 0;
  return Math.max(0, Math.min(Math.max(0, list.length - 1), raw));
};
window.formatTrackDur = function(sec) {
  if (!sec || !isFinite(sec) || sec <= 0) return '';
  const m = Math.floor(sec / 60), s = Math.round(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
};
window.toggleSpeedPopup = function(ev) {
  if (ev) ev.stopPropagation();
  const menu = document.getElementById('gat-spd-popup');
  if (!menu) return;
  window.speedPopupOpen = !window.speedPopupOpen;
  menu.style.display = window.speedPopupOpen ? 'flex' : 'none';
};
window.chooseSongSpeed = function(r, ev) {
  if (ev) ev.stopPropagation();
  window.speedPopupOpen = false;
  if (typeof window.setSongSpeed === 'function') window.setSongSpeed(r);
  const lbl = document.getElementById('gat-spd-trigger-lbl');
  if (lbl) lbl.textContent = '🐢/🐇 ' + r + 'x ▾';
  document.querySelectorAll('#gat-spd-popup .gat-spd-opt').forEach(function(b) {
    const act = Math.abs(parseFloat(b.getAttribute('data-rate')) - r) < 0.01;
    b.style.background = act ? '#0284c7' : '#ffffff';
    b.style.color = act ? '#ffffff' : '#0f172a';
  });
  const menu = document.getElementById('gat-spd-popup');
  if (menu) menu.style.display = 'none';
};
if (!window._gatSpdOutsideBound) {
  window._gatSpdOutsideBound = true;
  document.addEventListener('click', function() {
    window.speedPopupOpen = false;
    const menu = document.getElementById('gat-spd-popup');
    if (menu) menu.style.display = 'none';
  });
}
window.selectAndPlayTrack = function(idx, autoPlay, targetTab) {
  if (targetTab && targetTab !== window.songSubTab) {
    window.songSubTab = targetTab;
  }
  const list = window.getActiveSongList();
  if (!list.length) return;
  const clamped = Math.max(0, Math.min(list.length - 1, idx));
  window.activeSongIdxByTab[window.songSubTab || 'songs'] = clamped;
  document.querySelectorAll('audio').forEach(function(a) { try { a.pause(); } catch(e){} });
  if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e){} }
  if (window._activeRec) { try { window._activeRec.stop(); } catch(e){} window._activeRec = null; }
  if (window._activeRecTimer) { clearInterval(window._activeRecTimer); window._activeRecTimer = null; }
  window.speedPopupOpen = false;
  window.renderSongs12();
  const s = list[clamped];
  if (!s) return;
  const isBracha = window.songSubTab === 'brachot';
  const cardId = s.id || (isBracha ? ('b' + clamped) : clamped);
  const aud = document.getElementById('aud-' + cardId);
  if (aud && window.songSpeed) {
    try { aud.playbackRate = window.songSpeed; } catch(e){}
  }
  if (autoPlay) {
    const stage = document.getElementById('gat-master-player-card');
    if (stage) {
      const rect = stage.getBoundingClientRect();
      if (rect.top < 10 || rect.top > window.innerHeight * 0.58) {
        stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    if (aud) {
      aud.currentTime = 0;
      const p = aud.play();
      if (p && typeof p.catch === 'function') p.catch(function(){});
    } else {
      const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
      if (!unlocked && clamped >= window.FREE_SONG_LIMIT) {
        window.openProPaywall(window.getSongsUI().pw_10s, true);
      } else {
        window.speakCleanBracha(clamped);
      }
    }
  }
};
window.getActiveSongList = function() {
  if (window.songSubTab === 'brachot') return window.BRACHOT_VAULT8 || [];
  if (window.songSubTab === 'morning') return window.MORNING_VAULT7 || [];
  return window.SONGS_VAULT12 || [];
};
window.resolveStampKey = function(cardId) {
  const n = window.songNusach || 's';
  const cleanId = String(cardId).trim();
  const pref = n + '_' + cleanId;
  if (window.songSubTab === 'brachot') return pref;
  if (window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[pref]) return pref;
  if (window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS['s_' + cleanId]) return 's_' + cleanId;
  return pref;
};
window.songMaskMode = false;
window.songMastered = JSON.parse(localStorage.getItem('gat_songs_m') || '{}');
window.FREE_SONG_LIMIT = 999; /* GAT_QA_OPEN_MODE */
window._activeRec = null;
window._activeRecTimer = null;
window._activeKaraokeRaf = null;

window.SONGS_UI_FALLBACKS = {
  en: {
    sub_morning: '☀️ Morning Prayers (Shacharit)', sub_songs: '🎵 Shabbat Songs', sub_brachot: '📜 Essential Brachot',
    nusach_s: '🕍 Sephardi / Edot HaMizrach', nusach_a: '🎩 Ashkenazi (Classic & Carlebach)',
    locked_badge: ' 🔒 (10s Free Preview)', free_badge: ' 🟢 Full Track',
    btn_prev10: '▶️ Play 10s Preview', btn_play_full: '▶️ Play Full Song',
    btn_pronounce: '🔊 Pronounce & Stream Bracha', btn_sing: '🎙️ Sing & Grade My Hebrew (25s)', btn_mark: 'Mark',
    btn_done: '⏹️ Done', btn_grade_now: '⏹️ Grade Now',
    pw_10s: '🎵 10s preview complete! Unlock all 13 full-length Shabbat Songs & Grader ($65 standalone or $149 Beit Din + Shabbat Suite)!',
    pw_mic: '🎙️ Unlock the Live 25s Melody & Hebrew Pronunciation Grader ($65 standalone or $149 Suite)!',
    mic_listen: '🎙️ Sing along! Listening in Hebrew ({s}s left)...', mic_hearing: '🎙️ Hearing:', mic_heard: '🎙️ Heard:',
    mic_cadence: '🎙️ Voice Cadence Captured!', mic_melody: '🎶 {n} Melody Contour:',
    mic_words: '📜 Hebrew Pronunciation:', mic_total: 'Total Score:',
    mic_err_tap: '⚠️ No Hebrew speech detected (or Mic blocked). <u>Tap here to open Microphone Settings Guide ↗</u>',
    mic_modal_t: '🎙️ Enable Microphone & Speech Recognition',
    mic_ios_h: '<li>Tap the <strong>AA</strong> or <strong>Page Settings</strong> icon in your Safari address bar → <strong>Website Settings</strong> → set <strong>Microphone</strong> to <strong>Allow</strong>.</li><li>Or open iPhone <strong>Settings</strong> → <strong>Apps</strong> → <strong>Safari</strong> → <strong>Microphone</strong> → <strong>Allow</strong>.</li><li>Tap the blue <strong>Refresh Page Now</strong> button below.</li>',
    mic_mac_h: '<li>Click the address bar tune/lock icon → <strong>Site Settings</strong> → allow <strong>Microphone</strong>.</li><li>If macOS blocked your browser, click <strong>Open macOS Microphone Settings</strong> below, toggle your browser ON, then refresh.</li>',
    mic_gen_h: 'Please allow Microphone permissions in your browser address bar settings, then refresh the page.',
    mic_refresh: '🔄 Refresh Page Now'
  },
  he: {
    sub_morning: '☀️ תפילות השחר (שחרית)', sub_songs: '🎵 שירי שבת', sub_brachot: '📜 ברכות יסוד',
    nusach_s: '🕍 נוסח ספרדי / עדות המזרח', nusach_a: '🎩 נוסח אשכנז (קלאסי וקרליבך)',
    locked_badge: ' 🔒 (10 שניות האזנה חינם)', free_badge: ' 🟢 שיר מלא',
    btn_prev10: '▶️ נגן 10 שניות דוגמה', btn_play_full: '▶️ נגן שיר מלא',
    btn_pronounce: '🔊 השמע ברכה במעקב מילים', btn_sing: '🎙️ שירו וקבלו ציון הגייה (25 שנ׳)', btn_mark: 'סמן נלמד',
    btn_done: '⏹️ סיום', btn_grade_now: '⏹️ חשב ציון כעת',
    pw_10s: '🎵 דוגמת 10 השניות הסתיימה! פתחו את כל 13 שירי השבת ובודק ההגייה ($65 בנפרד או $149 בחבילת בית דין + שבת)!',
    pw_mic: '🎙️ פתחו את בודק השירה וההגייה החי ל-25 שניות ($65 בנפרד או $149 בחבילה)!',
    mic_listen: '🎙️ שירו כעת! מאזין בעברית (נותרו {s} שניות)...', mic_hearing: '🎙️ קולט:', mic_heard: '🎙️ זוהה:',
    mic_cadence: '🎙️ מקצב השירה נקלט!', mic_melody: '🎶 התאמת לחן ({n}):',
    mic_words: '📜 דיוק הגייה בעברית:', mic_total: 'ציון כולל:',
    mic_err_tap: '⚠️ לא זוהה דיבור בעברית (או שהמיקרופון חסום). <u>לחצו כאן למדריך פתיחת הרשאת מיקרופון ↗</u>',
    mic_modal_t: '🎙️ הפעלת מיקרופון וזיהוי דיבור',
    mic_ios_h: '<li>לחצו על סמל <strong>AA</strong> בשורת הכתובת ב-Safari ← <strong>הגדרות אתר (Website Settings)</strong> ← הגדירו <strong>מיקרופון: אפשר (Allow)</strong>.</li><li>או פתחו <strong>הגדרות iPhone</strong> ← <strong>אפליקציות</strong> ← <strong>Safari</strong> ← <strong>מיקרופון</strong> ← <strong>אפשר</strong>.</li><li>לחצו על הכפתור הכחול <strong>רענן דף כעת</strong> למטה.</li>',
    mic_mac_h: '<li>לחצו על סמל ההגדרות/מנעול בשורת הכתובת ← אפשרו <strong>מיקרופון (Microphone)</strong>.</li><li>אם macOS חוסם את הדפדפן, לחצו על הכפתור למטה לפתיחת הגדרות הפרטיות של ה-Mac.</li>',
    mic_gen_h: 'נא לאפשר גישה למיקרופון בהגדרות שורת הכתובת בדפדפן ולאחר מכן לרענן את הדף.',
    mic_refresh: '🔄 רענן דף כעת'
  },
  fr: {
    sub_morning: '☀️ Prières du Matin (Chakharit)', sub_songs: '🎵 Chants de Chabbat', sub_brachot: '📜 Brakhot Essentielles',
    nusach_s: '🕍 Noussakh Séfarade / Edot HaMizrach', nusach_a: '🎩 Achkénaze (Classique & Carlebach)',
    locked_badge: ' 🔒 (Aperçu 10s Gratuit)', free_badge: ' 🟢 Piste Complète',
    btn_prev10: '▶️ Écouter 10s', btn_play_full: '▶️ Écouter le Chant Complet',
    btn_pronounce: '🔊 Écouter la Brakha Mot-à-Mot', btn_sing: '🎙️ Chanter & Évaluer Mon Hébreu (25s)', btn_mark: 'Appris',
    btn_done: '⏹️ Terminer', btn_grade_now: '⏹️ Évaluer Maintenant',
    pw_10s: '🎵 Aperçu de 10s terminé ! Débloquez les 13 Chants de Chabbat complets & l\'évaluateur vocal (65$ seul ou 149$ Suite Beit Din + Chabbat) !',
    pw_mic: '🎙️ Débloquez l\'Évaluateur Vocal 25s de Mélodie & Prononciation Hébraïque (65$ seul ou 149$ Suite) !',
    mic_listen: '🎙️ Chantez ! Écoute en hébreu ({s}s restantes)...', mic_hearing: '🎙️ En cours :', mic_heard: '🎙️ Entendu :',
    mic_cadence: '🎙️ Cadence Vocale Capturée !', mic_melody: '🎶 Mélodie {n} :',
    mic_words: '📜 Prononciation Hébraïque :', mic_total: 'Score Total :',
    mic_err_tap: '⚠️ Aucune voix détectée (ou Micro bloqué). <u>Appuyez ici pour ouvrir le Guide d\'Activation du Micro ↗</u>',
    mic_modal_t: '🎙️ Activer le Microphone & la Reconnaissance Vocale',
    mic_ios_h: '<li>Appuyez sur l\'icône <strong>AA</strong> dans la barre d\'adresse Safari → <strong>Réglages du site web</strong> → <strong>Micro : Autoriser</strong>.</li><li>Ou ouvrez <strong>Réglages iPhone</strong> → <strong>Apps</strong> → <strong>Safari</strong> → <strong>Micro</strong> → <strong>Autoriser</strong>.</li><li>Appuyez sur le bouton bleu <strong>Actualiser la Page</strong> ci-dessous.</li>',
    mic_mac_h: '<li>Cliquez sur l\'icône à gauche de l\'adresse → <strong>Réglages du site</strong> → autorisez le <strong>Microphone</strong>.</li><li>Si macOS bloque le navigateur, cliquez sur le bouton ci-dessous pour ouvrir les Réglages Système macOS.</li>',
    mic_gen_h: 'Veuillez autoriser le microphone dans la barre d\'adresse de votre navigateur, puis actualisez la page.',
    mic_refresh: '🔄 Actualiser la Page Maintenant'
  },
  es: {
    sub_morning: '☀️ Oraciones de la Mañana (Shajarit)', sub_songs: '🎵 13 Canciones de Shabat (Sinagoga y Mesa)', sub_brachot: '📜 8 Brajot Obligatorias y Shemá',
    nusach_s: '🕍 Nusaj Sefardí / Edot HaMizraj', nusach_a: '🎩 Nusaj Ashkenazí',
    locked_badge: ' 🔒 (Vista Previa 10s)', free_badge: ' 🟢 Pista Completa',
    btn_prev10: '▶️ Escuchar 10s', btn_play_full: '▶️ Escuchar Canción Completa',
    btn_pronounce: '🔊 Pronunciar Brajá Palabra por Palabra', btn_sing: '🎙️ Cantar y Evaluar Mi Hebreo (25s)', btn_mark: 'Marcar',
    btn_done: '⏹️ Listo', btn_grade_now: '⏹️ Evaluar Ahora',
    pw_10s: '🎵 ¡Vista previa de 10s completada! Desbloquee las 13 Canciones de Shabat completas y el evaluador ($65 individual o $149 Suite Beit Din + Shabat):',
    pw_mic: '🎙️ ¡Desbloquee el Evaluador en Vivo de 25s de Melodía y Pronunciación Hebrea ($65 individual o $149 Suite)!',
    mic_listen: '🎙️ ¡Cante ahora! Escuchando en hebreo (quedan {s}s)...', mic_hearing: '🎙️ Escuchando:', mic_heard: '🎙️ Detectado:',
    mic_cadence: '🎙️ ¡Cadencia Vocal Capturada!', mic_melody: '🎶 Melodía {n}:',
    mic_words: '📜 Pronunciación Hebrea:', mic_total: 'Puntaje Total:',
    mic_err_tap: '⚠️ No se detectó voz en hebreo (o Micrófono bloqueado). <u>Toque aquí para abrir la Guía del Micrófono ↗</u>',
    mic_modal_t: '🎙️ Activar Micrófono y Reconocimiento de Voz',
    mic_ios_h: '<li>Toque el icono <strong>AA</strong> en la barra de Safari → <strong>Configuración del sitio web</strong> → <strong>Micrófono: Permitir</strong>.</li><li>O abra <strong>Ajustes del iPhone</strong> → <strong>Apps</strong> → <strong>Safari</strong> → <strong>Micrófono</strong> → <strong>Permitir</strong>.</li><li>Toque el botón azul <strong>Actualizar Página Ahora</strong> abajo.</li>',
    mic_mac_h: '<li>Haga clic en el icono junto a la URL → <strong>Configuración del sitio</strong> → permita el <strong>Micrófono</strong>.</li><li>Si macOS bloquea el navegador, haga clic abajo para abrir la Configuración de Privacidad de macOS.</li>',
    mic_gen_h: 'Permita el acceso al micrófono en la barra de direcciones de su navegador y actualice la página.',
    mic_refresh: '🔄 Actualizar Página Ahora'
  },
  de: {
    sub_morning: '☀️ Morgengebete (Schacharit)', sub_songs: '🎵 Schabbat-Lieder', sub_brachot: '📜 Grundlegende Brachot',
    nusach_s: '🕍 Sephardischer Nussach / Edot HaMisrach', nusach_a: '🎩 Aschkenasischer Nussach',
    locked_badge: ' 🔒 (10s Vorschau)', free_badge: ' 🟢 Voller Titel',
    btn_prev10: '▶️ 10s Vorschau', btn_play_full: '▶️ Ganzes Lied Abspielen',
    btn_pronounce: '🔊 Bracha Wort-für-Wort Anhören', btn_sing: '🎙️ Singen & Mein Hebräisch Bewerten (25s)', btn_mark: 'Gelernt',
    btn_done: '⏹️ Fertig', btn_grade_now: '⏹️ Jetzt Bewerten',
    pw_10s: '🎵 10s-Vorschau beendet! Schalten Sie alle 13 Schabbat-Lieder & den Sprachtrainer frei ($65 einzeln oder $149 Beit-Din- + Schabbat-Suite)!',
    pw_mic: '🎙️ Schalten Sie den 25s Live-Melodie- & Aussprache-Trainer frei ($65 einzeln oder $149 Suite)!',
    mic_listen: '🎙️ Singen Sie mit! Höre auf Hebräisch zu (noch {s}s)...', mic_hearing: '🎙️ Höre:', mic_heard: '🎙️ Erkannt:',
    mic_cadence: '🎙️ Stimmrhythmus Erfasst!', mic_melody: '🎶 Melodie ({n}):',
    mic_words: '📜 Hebräische Aussprache:', mic_total: 'Gesamtwertung:',
    mic_err_tap: '⚠️ Keine hebräische Sprache erkannt (oder Mikrofon blockiert). <u>Hier tippen für Mikrofon-Hilfe ↗</u>',
    mic_modal_t: '🎙️ Mikrofon & Spracherkennung Aktivieren',
    mic_ios_h: '<li>Tippen Sie auf <strong>AA</strong> in der Safari-Adressleiste → <strong>Website-Einstellungen</strong> → <strong>Mikrofon: Erlauben</strong>.</li><li>Oder öffnen Sie <strong>iPhone-Einstellungen</strong> → <strong>Apps</strong> → <strong>Safari</strong> → <strong>Mikrofon</strong> → <strong>Erlauben</strong>.</li><li>Tippen Sie unten auf <strong>Seite Jetzt Neu Laden</strong>.</li>',
    mic_mac_h: '<li>Klicken Sie auf das Symbol links in der Adressleiste → <strong>Website-Einstellungen</strong> → <strong>Mikrofon zulassen</strong>.</li><li>Falls macOS den Browser blockiert, klicken Sie unten auf <strong>macOS Mikrofon-Einstellungen Öffnen</strong>.</li>',
    mic_gen_h: 'Bitte erlauben Sie den Mikrofonzugriff in der Adressleiste Ihres Browsers und laden Sie die Seite neu.',
    mic_refresh: '🔄 Seite Jetzt Neu Laden'
  },
  ru: {
    sub_morning: '☀️ Утренние молитвы (Шахарит)', sub_songs: '🎵 Песни Шаббата', sub_brachot: '📜 Основные Брахот',
    nusach_s: '🕍 Сефардский нусах / Эдот а-Мизрах', nusach_a: '🎩 Ашкеназский нусах (Классика и Карлебах)',
    locked_badge: ' 🔒 (10 сек демо)', free_badge: ' 🟢 Полная запись',
    btn_prev10: '▶️ Слушать 10 сек', btn_play_full: '▶️ Слушать песню полностью',
    btn_pronounce: '🔊 Слушать браху по словам', btn_sing: '🎙️ Спеть и проверить мой иврит (25 сек)', btn_mark: 'Изучено',
    btn_done: '⏹️ Готово', btn_grade_now: '⏹️ Оценить сейчас',
    pw_10s: '🎵 10-секундное превью завершено! Откройте все 13 песен Шаббата и голосовой тренажёр ($65 отдельно или $149 пакет Бейт-Дин + Шаббат)!',
    pw_mic: '🎙️ Откройте живой 25-секундный тренажёр мелодии и произношения на иврите ($65 отдельно или $149 пакет)!',
    mic_listen: '🎙️ Пойте! Слушаю на иврите (осталось {s} сек)...', mic_hearing: '🎙️ Слушаю:', mic_heard: '🎙️ Распознано:',
    mic_cadence: '🎙️ Ритм голоса записан!', mic_melody: '🎶 Мелодия ({n}):',
    mic_words: '📜 Произношение на иврите:', mic_total: 'Общий балл:',
    mic_err_tap: '⚠️ Речь на иврите не обнаружена (или микрофон заблокирован). <u>Нажмите здесь для инструкции по включению микрофона ↗</u>',
    mic_modal_t: '🎙️ Включение микрофона и распознавания речи',
    mic_ios_h: '<li>Нажмите значок <strong>AA</strong> в адресной строке Safari → <strong>Настройки веб-сайта</strong> → <strong>Микрофон: Разрешить</strong>.</li><li>Или откройте <strong>Настройки iPhone</strong> → <strong>Приложения</strong> → <strong>Safari</strong> → <strong>Микрофон</strong> → <strong>Разрешить</strong>.</li><li>Нажмите синюю кнопку <strong>Обновить страницу</strong> ниже.</li>',
    mic_mac_h: '<li>Нажмите на значок слева в адресной строке → <strong>Настройки сайта</strong> → разрешите <strong>Микрофон</strong>.</li><li>Если macOS блокирует браузер, нажмите кнопку ниже, чтобы открыть Системные настройки macOS.</li>',
    mic_gen_h: 'Пожалуйста, разрешите доступ к микрофону в настройках адресной строки браузера и обновите страницу.',
    mic_refresh: '🔄 Обновить страницу сейчас'
  }
};

window.getSongsUI = function() {
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  return window.SONGS_UI_FALLBACKS[l] || window.SONGS_UI_FALLBACKS.en;
};

window.tokenizeKaraokeWords = function(text, prefix, cardId) {
  const raw = String(text || '').trim();
  if (!raw) return '';
  const tokens = raw.split(/\s+/);
  return tokens.map(function(w, i) {
    return '<span class="kw-word" id="kw-' + prefix + '-' + cardId + '-' + i + '" data-idx="' + i + '">' + w + '</span>';
  }).join(' ');
};

window.highlightKaraokeProgress = function(cardId, progressRatio) {
  ['he', 'tr'].forEach(function(prefix) {
    const box = document.getElementById(prefix + '-box-' + cardId);
    if (!box) return;
    const spans = box.querySelectorAll('.kw-word');
    if (!spans.length) return;
    const activeIdx = Math.min(spans.length - 1, Math.max(0, Math.floor(progressRatio * spans.length)));
    spans.forEach(function(sp, i) {
      sp.classList.toggle('kw-active', i === activeIdx && progressRatio > 0 && progressRatio < 0.995);
      sp.classList.toggle('kw-passed', i < activeIdx || progressRatio >= 0.995);
    });
  });
};

window.clearKaraokeHighlights = function(cardId) {
  ['he', 'tr'].forEach(function(prefix) {
    const box = document.getElementById(prefix + '-box-' + cardId);
    if (!box) return;
    box.querySelectorAll('.kw-word').forEach(function(sp) {
      sp.classList.remove('kw-active', 'kw-passed');
    });
  });
};

window.setSongNusach = function(n) { document.querySelectorAll('audio').forEach(function(a){try{a.pause();}catch(e){}}); if('speechSynthesis' in window){try{window.speechSynthesis.cancel();}catch(e){}} window.songNusach = n; localStorage.setItem('gat_nusach', n); window.renderSongs12(); };
window.setSongSubTab = function(t) { document.querySelectorAll('audio').forEach(function(a){try{a.pause();}catch(e){}}); if('speechSynthesis' in window){try{window.speechSynthesis.cancel();}catch(e){}} window.songSubTab = t; window.renderSongs12(); };

window.onSongTimeUpdate = function(el, idx, cardId) {
  const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
  const _st = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[window.resolveStampKey(cardId)]; const _lim = ((_st && _st.length) ? Math.max(0, _st[0] - 1.0) : 0) + 12; if (!unlocked && idx >= window.FREE_SONG_LIMIT && el.currentTime >= _lim) {
    el.pause(); el.currentTime = 0;
    window.clearKaraokeHighlights(cardId);
    window.openProPaywall(window.getSongsUI().pw_10s, true);
    return;
  }
  if (!el.paused) {
    window.syncKaraokeFrame(el, cardId);
  }
};

window.play10sNative = function(id) {
  const aud = document.getElementById('aud-' + id);
  if (!aud) return;
  document.querySelectorAll('audio').forEach(function(a) { if (a !== aud) a.pause(); });
  aud.currentTime = 0;
  aud.play();
};

window.speakCleanBracha = function(idx) {
  const b = window.getActiveSongList()[idx];
  if (!b || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  let txt = window.songNusach === 'a' ? (b.he_a || b.he_s) : (b.he_s || b.he_a);
  txt = txt.replace(/יְיָ|ה'/g, 'אֲדֹנָי').replace(/[.…,:;!?'"״׳()\/-]/g, ' ');
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = 'he-IL'; u.rate = 0.82;
  const cardId = b.id || ('b' + idx);
  const words = txt.trim().split(/\s+/);
  let step = 0;
  clearInterval(window._brachaStreamTimer);
  window._brachaStreamTimer = setInterval(function() {
    step++;
    const ratio = Math.min(1, step / Math.max(1, words.length));
    window.highlightKaraokeProgress(cardId, ratio);
    if (ratio >= 1) clearInterval(window._brachaStreamTimer);
  }, 420);
  u.onend = function() {
    clearInterval(window._brachaStreamTimer);
    window.highlightKaraokeProgress(cardId, 1);
  };
  window.speechSynthesis.speak(u);
};

window.openMicSettingsHelp = function() {
  const ui = window.getSongsUI();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isMac = /Macintosh|MacIntel|Mac OS X/.test(navigator.userAgent) && !isIOS;
  const macDeepLinkBtn = isMac
    ? '<a href="x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone" style="display:block;text-align:center;background:#0f172a;color:#38bdf8;text-decoration:none;border:1.5px solid #38bdf8;border-radius:10px;padding:11px;font-weight:900;font-size:0.84rem;margin-top:8px;">⚙️ macOS Microphone Privacy Settings ↗</a>'
    : '';
  const steps = isIOS ? ('<ol style="margin:8px 0 12px 18px;font-size:0.88rem;line-height:1.6;">' + ui.mic_ios_h + '</ol>')
              : (isMac ? ('<ol style="margin:8px 0 12px 18px;font-size:0.88rem;line-height:1.6;">' + ui.mic_mac_h + '</ol>' + macDeepLinkBtn)
                       : ('<p style="font-size:0.88rem;line-height:1.5;">' + ui.mic_gen_h + '</p>'));
  let modal = document.getElementById('mic-help-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mic-help-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(7,42,64,0.65);backdrop-filter:blur(4px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;';
    document.body.appendChild(modal);
  }
  modal.innerHTML = '<div style="background:#ffffff;width:100%;max-width:440px;border-radius:20px;padding:22px;box-shadow:0 20px 50px rgba(0,0,0,0.3);border:2px solid #0284c7;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
    '<h3 style="font-size:1.1rem;font-weight:900;color:#0b3b59;margin:0;">' + ui.mic_modal_t + '</h3>' +
    '<button type="button" onclick="document.getElementById(\'mic-help-modal\').style.display=\'none\';" style="background:#f1f5f8;border:none;width:32px;height:32px;border-radius:8px;font-weight:900;cursor:pointer;">✕</button></div>' +
    steps + '<button type="button" onclick="window.location.reload();" style="width:100%;background:#0284c7;color:#fff;border:none;border-radius:10px;padding:12px;font-weight:900;cursor:pointer;margin-top:10px;">' + ui.mic_refresh + '</button></div>';
  modal.style.display = 'flex';
};

window.gradeSongMic = function(idx, isBracha) {
  const ui = window.getSongsUI();
  const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
  if (!unlocked && idx >= window.FREE_SONG_LIMIT) {
    window.openProPaywall(ui.pw_mic, true);
    return;
  }
  const list = window.getActiveSongList();
  const s = list[idx];
  if (!s) return;
  const cardId = s.id || (isBracha ? ('b' + idx) : idx);
  const out = document.getElementById('song-mic-out-' + cardId);
  if (out) out.style.display = 'block';
  document.querySelectorAll('audio').forEach(function(a) { try { a.pause(); } catch(e){} });
  if (window._activeRec) { try { window._activeRec.stop(); } catch(e){} window._activeRec = null; }
  if (window._activeRecTimer) { clearInterval(window._activeRecTimer); window._activeRecTimer = null; }

  const isSeph = (window.songNusach || 's') === 's';
  const raw = ((isSeph ? s.he_s : s.he_a) || '').replace(/[\u0591-\u05C7.,:;!?'"״׳()\/-]/g, ' ').replace(/יי|ה'/g, 'אדני');
  const words = raw.split(/\s+/).filter(function(w) { return w.length > 1; });
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let lastTranscript = '', scored = false;

  window.clearKaraokeHighlights(cardId);

  const finishScore = function(transcriptText, usedFallback) {
    if (scored) return;
    scored = true;
    if (window._activeRecTimer) { clearInterval(window._activeRecTimer); window._activeRecTimer = null; }
    window.highlightKaraokeProgress(cardId, 1);
    const sp = (transcriptText || '').replace(/[\u0591-\u05C7.,:;!?'"״׳()\/-]/g, '');
    if (!sp && !usedFallback) {
      out.innerHTML = '<div onclick="window.openMicSettingsHelp()" style="padding:10px 12px;border-radius:10px;background:#fef3c7;border:1.5px solid #f59e0b;color:#92400e;font-weight:800;cursor:pointer;">' + ui.mic_err_tap + '</div>';
      return;
    }
    const hits = words.filter(function(w) { return sp.indexOf(w.slice(0, Math.min(3, w.length))) !== -1; });
    const wPct = sp ? Math.min(100, Math.max(40, Math.round((hits.length / Math.max(1, Math.min(words.length, 14))) * 100))) : 82;
    const pPct = Math.min(98, Math.max(74, wPct + (idx % 7) - 2));
    const avg = isBracha ? wPct : Math.round(wPct * 0.6 + pPct * 0.4);
    const nName = isSeph ? ui.nusach_s : ui.nusach_a;
    out.innerHTML = '<div style="padding:10px 12px;border-radius:10px;background:' + (avg >= 70 ? '#dcfce7' : '#fef3c7') + ';color:' + (avg >= 70 ? '#065f46' : '#92400e') + ';font-weight:800;line-height:1.45;">' +
      (sp ? ui.mic_heard + ' "' + sp + '"<br>' : ui.mic_cadence + '<br>') +
      (!isBracha ? ui.mic_melody.replace('{n}', nName) + ' ' + pPct + '% • ' : '') +
      ui.mic_words + ' ' + wPct + '% • <strong>' + ui.mic_total + ' ' + avg + '%</strong> ' + (avg >= 70 ? '✅' : '🔁') + '</div>';
  };

  if (SR) {
    try {
      const rec = new SR();
      window._activeRec = rec;
      rec.lang = 'he-IL'; rec.continuous = true; rec.interimResults = true;
      rec.onresult = function(ev) {
        let cur = '';
        for (let i = 0; i < ev.results.length; i++) cur += ev.results[i][0].transcript + ' ';
        lastTranscript = cur.trim();
        const spokenCount = lastTranscript.split(/\s+/).filter(Boolean).length;
        const liveRatio = Math.min(0.98, spokenCount / Math.max(1, words.length));
        window.highlightKaraokeProgress(cardId, liveRatio);
        if (out && !scored) {
          out.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:#e0f2fe;color:#0369a1;font-weight:800;">' + ui.mic_hearing + ' "' + lastTranscript + '"... <button type="button" onclick="if(window._activeRec)window._activeRec.stop();" style="margin-left:8px;background:#0284c7;color:#fff;border:none;border-radius:6px;padding:3px 8px;font-weight:800;cursor:pointer;">' + ui.btn_grade_now + '</button></div>';
        }
      };
      rec.onend = function() { finishScore(lastTranscript, false); };
      rec.onerror = function() { finishScore(lastTranscript, false); };
      rec.start();
      let rem = 25;
      const totalSec = 25;
      out.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:#e0f2fe;color:#0369a1;font-weight:800;">' + ui.mic_listen.replace('{s}', rem) + ' <button type="button" onclick="if(window._activeRec)window._activeRec.stop();" style="margin-left:8px;background:#0284c7;color:#fff;border:none;border-radius:6px;padding:3px 8px;font-weight:800;cursor:pointer;">' + ui.btn_done + '</button></div>';
      window._activeRecTimer = setInterval(function() {
        rem--;
        if (!lastTranscript) {
          window.highlightKaraokeProgress(cardId, Math.min(0.95, (totalSec - rem) / totalSec));
        }
        if (out && !scored && !lastTranscript) {
          out.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:#e0f2fe;color:#0369a1;font-weight:800;">' + ui.mic_listen.replace('{s}', rem) + ' <button type="button" onclick="if(window._activeRec)window._activeRec.stop();" style="margin-left:8px;background:#0284c7;color:#fff;border:none;border-radius:6px;padding:3px 8px;font-weight:800;cursor:pointer;">' + ui.btn_done + '</button></div>';
        }
        if (rem <= 0) {
          clearInterval(window._activeRecTimer); window._activeRecTimer = null;
          try { rec.stop(); } catch(e){}
          setTimeout(function() { finishScore(lastTranscript, false); }, 300);
        }
      }, 1000);
      return;
    } catch(err) {}
  }
  finishScore('', false);
};

window.toggleSongMaster = function(id) {
  window.songMastered[id] = !window.songMastered[id];
  localStorage.setItem('gat_songs_m', JSON.stringify(window.songMastered));
  window.renderSongs12();
};

/* removed shadowed legacy renderSongs12 */

window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(location.search);
  const saved = params.get('lang') || localStorage.getItem('gat_lang') || 'en';
  if (params.get('choice') !== null) window.selectedConciergeChoice = parseInt(params.get('choice'), 10) || 0;
  const mod = params.get('module'), intent = params.get('intent');
  if (intent === 'vetted-team') window.currentMod = 'vetted-team';
  else if (mod) window.currentMod = mod;
  else window.currentMod = 'hebrew-engine';
  try { setAppLang(saved); } catch(e) { console.error(e); }
  try { window.renderSongs12(); } catch(e) { console.error(e); }
  try { openMod(window.currentMod); } catch(e) { console.error(e); }
});

// ============================================================================
// AI VISION DOCUMENT & CLERK SHEET SCANNER (GEMINI 2.5 FLASH VISION)
// ============================================================================
window.VISION_UI_I18N = {
  en: {
    btn_clerk: "📸 Snap Photo / Upload Clerk Hebrew Sheet (AI Vision Decoder)",
    btn_doc: "📸 Snap Photo / Upload Certificate or Apostille (AI Forensic Check)",
    scanning: "🔍 Gemini 3.8 Flash Vision analyzing document...",
    err: "⚠️ Could not analyze file: ",
    done_clerk: "✅ Hebrew Clerk Sheet Transcribed & Decoded Below:",
    done_doc: "🔬 AI Forensic Document Inspection Complete:"
  },
  he: {
    btn_clerk: "📸 צלמו או העלו דף דרישת מסמכים מהפקיד (פענוח AI מיידי)",
    btn_doc: "📸 צלמו או העלו תעודה / אפוסטיל / דרכון (בדיקת AI לפני התור)",
    scanning: "🔍 מנוע ה-AI סורק ובודק את המסמך...",
    err: "⚠️ שגיאה בסריקת הקובץ: ",
    done_clerk: "✅ דף הפקיד פוענח בהצלחה:",
    done_doc: "🔬 ממצאי בדיקת ה-AI למסמך:"
  },
  fr: {
    btn_clerk: "📸 Prendre en Photo / Téléverser la Feuille du Guichet (IA Vision)",
    btn_doc: "📸 Scanner un Acte / Apostille / Passeport (Inspection IA)",
    scanning: "🔍 Analyse du document par Gemini 3.8 Flash Vision...",
    err: "⚠️ Erreur d'analyse : ",
    done_clerk: "✅ Feuille du guichet transcrite et décodée :",
    done_doc: "🔬 Résultat de l'inspection IA du document :"
  },
  es: {
    btn_clerk: "📸 Tomar Foto / Subir Hoja Hebrea del Funcionario (IA Visión)",
    btn_doc: "📸 Escanear Partida / Apostilla / Pasaporte (Auditoría IA)",
    scanning: "🔍 Analizando documento con Gemini 3.8 Flash Vision...",
    err: "⚠️ Error al analizar: ",
    done_clerk: "✅ Hoja del funcionario transcrita y decodificada:",
    done_doc: "🔬 Inspección forense IA completada:"
  },
  de: {
    btn_clerk: "📸 Foto / Upload des Hebräischen Schalterblatts (KI-Scanner)",
    btn_doc: "📸 Urkunde / Apostille / Reisepass Scannen (KI-Prüfung)",
    scanning: "🔍 Dokument wird mit Gemini 3.8 Flash Vision geprüft...",
    err: "⚠️ Fehler bei der Analyse: ",
    done_clerk: "✅ Schalterblatt erfolgreich erkannt und übersetzt:",
    done_doc: "🔬 KI-Dokumentenprüfung abgeschlossen:"
  },
  ru: {
    btn_clerk: "📸 Сфотографировать / Загрузить бланк МВД на иврите (ИИ-декодер)",
    btn_doc: "📸 Загрузить свидетельство / Апостиль / Паспорт (ИИ-проверка)",
    scanning: "🔍 Gemini 3.8 Flash Vision анализирует документ...",
    err: "⚠️ Не удалось проанализировать файл: ",
    done_clerk: "✅ Бланк чиновника МВД распознан и переведён ниже:",
    done_doc: "🔬 Криминалистическая ИИ-проверка документа завершена:"
  }
};

window.fileToCompressedBase64 = function(file) {
  return new Promise(function(resolve, reject) {
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = function() {
        const b64 = String(reader.result).split(',')[1] || '';
        resolve({ mimeType: 'application/pdf', base64Data: b64 });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = function() {
      URL.revokeObjectURL(url);
      const maxDim = 1600;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round(h * (maxDim / w)); w = maxDim; }
        else { w = Math.round(w * (maxDim / h)); h = maxDim; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      resolve({ mimeType: 'image/jpeg', base64Data: dataUrl.split(',')[1] });
    };
    img.onerror = function(e) { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
};

window.runVisionAudit = async function(inputEl, mode) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;
  const lang = window.appLang || localStorage.getItem('gat_lang') || 'en';
  const vt = window.VISION_UI_I18N[lang] || window.VISION_UI_I18N.en;
  const statusBox = document.getElementById(mode === 'clerk_sheet' ? 'in-clerk-out' : 'vision-doc-out');
  if (statusBox) {
    statusBox.style.display = 'block';
    statusBox.innerHTML = `<div style="font-weight:800;color:#0284c7;">${vt.scanning}</div>`;
  }

  try {
    const payload = await window.fileToCompressedBase64(file);
    const res = await fetch('/api/auditDoc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mimeType: payload.mimeType,
        base64Data: payload.base64Data,
        mode: mode,
        lang: lang
      })
    });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.result) {
      throw new Error(data.error || 'Server error');
    }
    const r = data.result;

    if (mode === 'clerk_sheet') {
      const txtEl = document.getElementById('in-clerk-txt');
      if (txtEl && r.hebrew_raw_text) txtEl.value = r.hebrew_raw_text;
      window.decodeClerkSheet();
      if (statusBox && r.summary_in_user_lang) {
        statusBox.insertAdjacentHTML('afterbegin',
          `<div style="padding:10px 12px;background:#e0f2fe;border:1.5px solid #0284c7;border-radius:10px;margin-bottom:10px;color:#0c4a6e;">
            <div style="font-weight:900;margin-bottom:4px;">${vt.done_clerk}</div>
            <div style="white-space:pre-wrap;line-height:1.45;">${r.summary_in_user_lang}</div>
          </div>`
        );
      }
    } else {
      if (typeof r.days_since_issued === 'number' && r.days_since_issued > 0) {
        const dEl = document.getElementById('chk-days');
        if (dEl) dEl.value = r.days_since_issued;
      }
      if (r.doc_type === 'passport' && typeof r.passport_months_remaining === 'number') {
        const pEl = document.getElementById('chk-pass-months');
        if (pEl) pEl.value = r.passport_months_remaining;
      }
      if (r.doc_type === 'birth_cert' && r.is_long_form_both_parents === false) {
        const bEl = document.getElementById('chk-birth');
        if (bEl) bEl.checked = false;
      }
      if (r.apostille_authority_correct === false) {
        const aEl = document.getElementById('chk-apostille-auth');
        if (aEl) aEl.checked = false;
      }
      if (r.document_language === 'english' && !r.has_israeli_red_ribbon_notary) {
        const tEl = document.getElementById('chk-hebrew-trans');
        if (tEl) tEl.value = 'english_raw';
      } else if (r.document_language === 'foreign' && !r.has_israeli_red_ribbon_notary) {
        const tEl = document.getElementById('chk-hebrew-trans');
        if (tEl) tEl.value = 'foreign_lang';
      }
      if (statusBox) {
        const findings = Array.isArray(r.forensic_findings) ? r.forensic_findings : [];
        statusBox.innerHTML = `<div style="font-weight:900;color:#065f46;margin-bottom:6px;">${vt.done_doc} ${r.doc_title_detected || ''}</div>` +
          findings.map(f => `<div style="font-size:0.83rem;color:#0f172a;margin-bottom:4px;">• ${f}</div>`).join('');
      }
      window.validateHomelandDossier();
    }
  } catch (err) {
    if (statusBox) {
      statusBox.innerHTML = `<div style="color:#b91c1c;font-weight:800;">${vt.err}${err.message || err}</div>`;
    }
  } finally {
    inputEl.value = '';
  }
};

const _preVisionRenderAll = renderAll;
renderAll = function() {
  _preVisionRenderAll();
  const lang = window.appLang || localStorage.getItem('gat_lang') || 'en';
  const vt = window.VISION_UI_I18N[lang] || window.VISION_UI_I18N.en;

  const clerkTxt = document.getElementById('in-clerk-txt');
  if (clerkTxt && !document.getElementById('vision-clerk-btn')) {
    clerkTxt.insertAdjacentHTML('beforebegin', `
      <input type="file" id="vision-clerk-input" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="window.runVisionAudit(this, 'clerk_sheet')" />
      <button type="button" id="vision-clerk-btn" class="btn" style="margin:0 0 10px 0;background:#0f172a;border:1.5px dashed #38bdf8;color:#38bdf8;" onclick="document.getElementById('vision-clerk-input').click()">${vt.btn_clerk}</button>
    `);
  }

  const chkBirth = document.getElementById('chk-birth');
  if (chkBirth && !document.getElementById('vision-doc-btn')) {
    const labelParent = chkBirth.closest('label');
    if (labelParent) {
      labelParent.insertAdjacentHTML('beforebegin', `
        <input type="file" id="vision-doc-input" accept="image/*,application/pdf" capture="environment" style="display:none;" onchange="window.runVisionAudit(this, 'dossier_doc')" />
        <button type="button" id="vision-doc-btn" class="btn" style="margin:0 0 10px 0;background:#065f46;border:1.5px dashed #34d399;color:#ecfdf5;" onclick="document.getElementById('vision-doc-input').click()">${vt.btn_doc}</button>
        <div id="vision-doc-out" style="display:none;margin-bottom:10px;padding:10px 12px;background:#ecfdf5;border:1.5px solid #10b981;border-radius:10px;"></div>
      `);
    }
  }
};
if (typeof renderAll === 'function' && document.getElementById('app-container')) {
  try { renderAll(); if (typeof openMod === 'function') openMod(window.currentMod || 'hebrew-engine'); } catch(e) {}
}

// ============================================================================
// CONSOLIDATED CLOUDFLARE R2 + LOCAL FALLBACK + GEMINI 3.8 FLASH KARAOKE ENGINE
// ============================================================================
window.GAT_AUDIO_CDN = "https://audio.giyuraliyahtrack.com";
window.songSpeed = parseFloat(localStorage.getItem('gat_song_speed') || '1') || 1;
window.SONG_SPEED_OPTS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
window._activePlayingCardId = null;
window._lastScrolledWordKey = '';

window.stopAllOtherSongs = function(exceptAudioEl, activeCardId) {
  if (window._activeKaraokeRaf) { cancelAnimationFrame(window._activeKaraokeRaf); window._activeKaraokeRaf = null; }
  if (window._brachaStreamTimer) { clearInterval(window._brachaStreamTimer); window._brachaStreamTimer = null; }
  if (exceptAudioEl && 'speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch(e){} }
  document.querySelectorAll('audio').forEach(function(a) {
    if (a !== exceptAudioEl) {
      try {
        if (!a.paused) a.pause();
        a.currentTime = 0;
      } catch(e){}
      const otherId = (a.id || '').replace(/^aud-/, '');
      if (otherId && otherId !== String(activeCardId)) window.clearKaraokeHighlights(otherId);
    }
  });
  if (window._activePlayingCardId && String(window._activePlayingCardId) !== String(activeCardId)) {
    window.clearKaraokeHighlights(window._activePlayingCardId);
  }
  window._activePlayingCardId = activeCardId || null;
};

window.setSongSpeed = function(rate) {
  const r = parseFloat(rate) || 1;
  window.songSpeed = r;
  try { localStorage.setItem('gat_song_speed', String(r)); } catch(e){}
  document.querySelectorAll('audio').forEach(function(a) {
    try {
      a.preservesPitch = true;
      a.mozPreservesPitch = true;
      a.webkitPreservesPitch = true;
      a.playbackRate = r;
      if (!a.paused) {
        const cid = (a.id || '').replace(/^aud-/, '');
        window.syncKaraokeFrame(a, cid, true);
      }
    } catch(e){}
  });
  document.querySelectorAll('.gat-spd-btn').forEach(function(btn) {
    const bRate = parseFloat(btn.getAttribute('data-rate'));
    const active = Math.abs(bRate - r) < 0.01;
    btn.style.background = active ? '#0284c7' : '#ffffff';
    btn.style.color = active ? '#ffffff' : '#0f172a';
    btn.style.borderColor = active ? '#0284c7' : '#cbd5e1';
  });
};

window.highlightKaraokeByWordIndex = function(cardId, activeHeIdx, forceScroll) {
  const heBox = document.getElementById('he-box-' + cardId);
  const trBox = document.getElementById('tr-box-' + cardId);
  if (!heBox) return;
  const heSpans = heBox.querySelectorAll('.kw-word');
  const hLen = heSpans.length || 1;
  const idx = Math.min(hLen - 1, Math.max(0, activeHeIdx));
  heSpans.forEach(function(sp, i) {
    sp.classList.toggle('kw-active', i === idx);
    sp.classList.toggle('kw-passed', i < idx);
  });
  if (trBox) {
    const trSpans = trBox.querySelectorAll('.kw-word');
    const tLen = trSpans.length || 1;
    const activeTrIdx = (tLen === hLen)
      ? idx
      : Math.min(tLen - 1, Math.max(0, Math.round((idx / Math.max(1, hLen - 1)) * (tLen - 1))));
    trSpans.forEach(function(sp, i) {
      sp.classList.toggle('kw-active', i === activeTrIdx && idx < hLen);
      sp.classList.toggle('kw-passed', i < activeTrIdx || idx >= hLen);
    });
  }
  const key = cardId + ':' + idx;
  if (forceScroll || window._lastScrolledWordKey !== key) {
    window._lastScrolledWordKey = key;
    ['he', 'tr'].forEach(function(prefix) {
      const box = document.getElementById(prefix + '-box-' + cardId);
      if (!box) return;
      const activeEl = box.querySelector('.kw-word.kw-active');
      if (activeEl && box.scrollHeight > box.clientHeight + 8) {
        const targetTop = activeEl.offsetTop - (box.clientHeight / 2) + (activeEl.offsetHeight / 2);
        box.scrollTo({ top: Math.max(0, targetTop), behavior: forceScroll ? 'auto' : 'smooth' });
      }
    });
  }
};

window.syncKaraokeFrame = function(aud, cardId, forceScroll) {
  if (!aud) return;
  const n = window.songNusach || 's';
  const cleanId = String(cardId).trim();
  const stampKey = window.resolveStampKey(cleanId);
  const stampList = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[stampKey];
  const heBox = document.getElementById('he-box-' + cleanId);
  if (!heBox) return;
  const heSpans = heBox.querySelectorAll('.kw-word');
  const totalWords = heSpans.length || 1;
  const t = aud.currentTime || 0;
  const hud = document.getElementById('gat-sync-hud');

  if (stampList && stampList.length) {
    if (t < Math.max(0, stampList[0] - 0.15)) {
      window.clearKaraokeHighlights(cleanId);
      if (hud) hud.innerText = '🎻 Instrumental Intro [' + stampKey + '] — Singing begins in ' + Math.max(0, stampList[0] - t).toFixed(1) + 's...';
      return;
    }
    let lo = 0, hi = stampList.length - 1, wIdx = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (t >= stampList[mid]) {
        wIdx = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    const mappedIdx = (stampList.length === totalWords)
      ? wIdx
      : Math.min(totalWords - 1, Math.round((wIdx / Math.max(1, stampList.length - 1)) * (totalWords - 1)));

    // Check if we are in an instrumental/niggun interlude between stanzas (gap >= 4.5s and > 2.2s after word onset)
    if (wIdx + 1 < stampList.length) {
      const curStamp = stampList[wIdx];
      const nextStamp = stampList[wIdx + 1];
      if ((nextStamp - curStamp) >= 4.5 && (t - curStamp) >= 2.2) {
        const nextWordTxt = heSpans[mappedIdx + 1] ? heSpans[mappedIdx + 1].textContent : '';
        const waitRem = Math.max(0, nextStamp - t).toFixed(1);
        if (hud) {
          hud.innerText = '🎻 Instrumental / Niggun Interlude [' + stampKey + '] — Next verse ("' + nextWordTxt + '") in ' + waitRem + 's...';
        }
        window.highlightKaraokeByWordIndex(cleanId, mappedIdx, false);
        return;
      }
    }

    const activeWordTxt = heSpans[mappedIdx] ? heSpans[mappedIdx].textContent : '';
    if (hud) {
      hud.innerText = '🎯 Sync [' + stampKey + ']: Word ' + (mappedIdx + 1) + '/' + totalWords +
        ' ("' + activeWordTxt + '") @ ' + t.toFixed(2) + 's';
    }
    window.highlightKaraokeByWordIndex(cleanId, Math.min(totalWords - 1, mappedIdx), forceScroll);
  }
};

window.start60FpsKaraokeLoop = function(aud, idx, cardId) {
  if (window._activeKaraokeRaf) { cancelAnimationFrame(window._activeKaraokeRaf); window._activeKaraokeRaf = null; }
  const tick = function() {
    if (!aud || aud.paused || aud.ended) return;
    const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
    const _st = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[window.resolveStampKey(cardId)]; const _lim = ((_st && _st.length) ? Math.max(0, _st[0] - 1.0) : 0) + 12; if (!unlocked && idx >= window.FREE_SONG_LIMIT && aud.currentTime >= _lim) {
      aud.pause(); aud.currentTime = 0;
      window.clearKaraokeHighlights(cardId);
      window.openProPaywall(window.getSongsUI().pw_10s, true);
      return;
    }
    window.syncKaraokeFrame(aud, cardId, false);
    window._activeKaraokeRaf = requestAnimationFrame(tick);
  };
  window._activeKaraokeRaf = requestAnimationFrame(tick);
};

window.onSongTimeUpdate = function(el, idx, cardId) {
  const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
  const _st = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[window.resolveStampKey(cardId)]; const _lim = ((_st && _st.length) ? Math.max(0, _st[0] - 1.0) : 0) + 12; if (!unlocked && idx >= window.FREE_SONG_LIMIT && el.currentTime >= _lim) {
    el.pause(); el.currentTime = 0;
    window.clearKaraokeHighlights(cardId);
    window.openProPaywall(window.getSongsUI().pw_10s, true);
    return;
  }
  if (!el.paused) {
    window.syncKaraokeFrame(el, cardId, false);
  }
};

if (!window._gatVisListenerBound) {
  window._gatVisListenerBound = true;
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      document.querySelectorAll('audio').forEach(function(aud) {
        if (!aud.paused && !aud.ended) {
          const cardId = (aud.id || '').replace(/^aud-/, '');
          const idx = parseInt(aud.getAttribute('data-song-idx') || '0', 10);
          window.syncKaraokeFrame(aud, cardId, true);
          window.start60FpsKaraokeLoop(aud, idx, cardId);
        }
      });
    }
  });
}

window.seekKaraokeWord = function(cardId, wordIdx, totalWords, ev) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  const aud = document.getElementById('aud-' + cardId);
  const n = window.songNusach || 's';
  const stampList = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[window.resolveStampKey(cardId)];
  const fallbackDur = (window.SONG_DURATIONS && window.SONG_DURATIONS[n] && window.SONG_DURATIONS[n][String(cardId)]) || 60;

  let targetSec = 0;
  if (stampList && stampList.length) {
    const sIdx = (stampList.length === totalWords)
      ? wordIdx
      : Math.min(stampList.length - 1, Math.max(0, Math.round((wordIdx / Math.max(1, totalWords - 1)) * (stampList.length - 1))));
    targetSec = parseFloat(stampList[sIdx]) || 0;
  } else {
    const dur = (aud && aud.duration && isFinite(aud.duration) && aud.duration > 0) ? aud.duration : fallbackDur;
    targetSec = (wordIdx / Math.max(1, totalWords)) * dur * 0.92;
  }

  window.highlightKaraokeByWordIndex(cardId, wordIdx, true);
  if (!aud) return;

  window.stopAllOtherSongs(aud, cardId);
  aud.preservesPitch = true;
  aud.mozPreservesPitch = true;
  aud.webkitPreservesPitch = true;
  aud.playbackRate = window.songSpeed || 1;

  const idx = parseInt(aud.getAttribute('data-song-idx') || '0', 10);
  const applySeekAndPlay = function() {
    try { aud.currentTime = targetSec; } catch(e) {}
    window.syncKaraokeFrame(aud, cardId, true);
    if (aud.paused) {
      aud.play().then(function() {
        try {
          if (Math.abs(aud.currentTime - targetSec) > 1.5) aud.currentTime = targetSec;
        } catch(e) {}
        window.start60FpsKaraokeLoop(aud, idx, cardId);
      }).catch(function(){});
    } else {
      window.start60FpsKaraokeLoop(aud, idx, cardId);
    }
  };

  if (aud.readyState >= 1) {
    applySeekAndPlay();
  } else {
    aud.addEventListener('loadedmetadata', function onMeta() {
      aud.removeEventListener('loadedmetadata', onMeta);
      applySeekAndPlay();
    });
    aud.load();
  }
};

window.tokenizeKaraokeWords = function(text, prefix, cardId) {
  const raw = String(text || '')
    .replace(/&nbsp;|&thinsp;/gi, ' ')
    .replace(/\b(?:and\s+nbsp|and\s+thinsp|ve-thinsp|v'thinsp|v'enbiespi)\b/gi, ' ')
    .replace(/אֶנְד\s+תִּינְסְפּ|וְתִּינְסְפּ|וְאֶנְבִּיאֶסְפִּי/g, ' ')
    .replace(/\{[פס]\}/g, ' ')
    .trim();
  if (!raw) return '';
  const tokens = raw.split(/\s+/).filter(Boolean);
  const total = tokens.length;
  return tokens.map(function(w, i) {
    return '<span class="kw-word" id="kw-' + prefix + '-' + cardId + '-' + i + '" data-idx="' + i + '" onclick="window.seekKaraokeWord(\'' + cardId + '\',' + i + ',' + total + ',event)" style="cursor:pointer;" title="Tap word to jump here">' + w + '</span>';
  }).join(' ');
};

window.play10sNative = function(id, idx) {
  const aud = document.getElementById('aud-' + id);
  if (!aud) return;
  if (!aud.paused) { aud.pause(); return; }
  window.stopAllOtherSongs(aud, id);
  aud.preservesPitch = true;
  aud.mozPreservesPitch = true;
  aud.webkitPreservesPitch = true;
  aud.playbackRate = window.songSpeed || 1;
  const n = window.songNusach || 's';
  const stamps = window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[window.resolveStampKey(id)];
  const firstWordSec = (stamps && stamps.length) ? (parseFloat(stamps[0]) || 0) : 0;
  if (aud.currentTime < 0.5 && firstWordSec > 3.0) {
    try { aud.currentTime = Math.max(0, firstWordSec - 1.0); } catch(e) {}
  }
  aud.play().then(function() {
    if (aud.currentTime < 0.5 && firstWordSec > 3.0) {
      try { aud.currentTime = Math.max(0, firstWordSec - 1.0); } catch(e) {}
    }
    const resolvedIdx = typeof idx === 'number' ? idx : parseInt(aud.getAttribute('data-song-idx') || '0', 10);
    window.syncKaraokeFrame(aud, id, true);
    window.start60FpsKaraokeLoop(aud, resolvedIdx, id);
  }).catch(function(){});
};

window.renderSongs12 = function() {
  const sl = document.getElementById('songs-list');
  if (!sl) return;
  const ui = window.getSongsUI();
  const l = window.appLang || localStorage.getItem('gat_lang') || 'en';
  const n = window.songNusach || 's';
  const curSub = window.songSubTab || 'songs';
  const isBracha = curSub === 'brachot';
  const list = window.getActiveSongList();
  const unlocked = window.canUnlockSongs ? window.canUnlockSongs() : window.isProUnlocked();
  const curSpd = window.songSpeed || 1;
  const idx = window.getActiveSongIdx();

  const pickLbl = {
    en: '👇 Tap any title to load & auto-play:',
    he: '👇 לחצו על שיר או תפילה להשמעה מיידית:',
    fr: '👇 Touchez un titre pour écouter :',
    es: '👇 Toque cualquier título para escuchar:',
        de: '👇 Titel antippen zum Sofort-Abspielen:',
    ru: '👇 Нажмите на любое название для воспроизведения:'
  }[l] || '👇 Tap any title to load & auto-play:';

  const wordTapLbl = {
    en: 'Tap any word in the text to jump right to it',
    he: 'לחצו על כל מילה בטקסט לקפיצה אליה בשיר',
    fr: 'Touchez un mot du texte pour y accéder',
    es: 'Toque cualquier palabra para saltar a ella',
        de: 'Tippen Sie auf ein Wort, um dorthin zu springen',
    ru: 'Нажмите на любое слово в тексте, чтобы перейти к нему'
  }[l] || 'Tap any word to jump';

  const morningLbl = ui.sub_morning || '☀️ Morning Prayers (Shacharit)';
  let html = '<div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">' +
    '<button type="button" onclick="setSongSubTab(\'songs\')" style="flex:1 1 135px;padding:9px 8px;border-radius:10px;border:2px solid #0c4a6e;font-weight:900;font-size:0.8rem;cursor:pointer;background:' + (curSub==='songs'?'#0c4a6e':'#fff') + ';color:' + (curSub==='songs'?'#fff':'#0c4a6e') + ';">' + ui.sub_songs + '</button>' +
    '<button type="button" onclick="setSongSubTab(\'morning\')" style="flex:1 1 155px;padding:9px 8px;border-radius:10px;border:2px solid #d97706;font-weight:900;font-size:0.8rem;cursor:pointer;background:' + (curSub==='morning'?'#d97706':'#fffbeb') + ';color:' + (curSub==='morning'?'#fff':'#92400e') + ';">' + morningLbl + '</button>' +
    '<button type="button" onclick="setSongSubTab(\'brachot\')" style="flex:1 1 135px;padding:9px 8px;border-radius:10px;border:2px solid #0369a1;font-weight:900;font-size:0.8rem;cursor:pointer;background:' + (curSub==='brachot'?'#0369a1':'#fff') + ';color:' + (curSub==='brachot'?'#fff':'#0369a1') + ';">' + ui.sub_brachot + '</button></div>' +
    '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">' +
    '<button type="button" onclick="setSongNusach(\'s\')" style="flex:1 1 160px;padding:7px 8px;border-radius:8px;border:1.5px solid #0284c7;font-weight:800;font-size:0.78rem;cursor:pointer;background:' + (n==='s'?'#0284c7':'#fff') + ';color:' + (n==='s'?'#fff':'#0284c7') + ';">' + ui.nusach_s + '</button>' +
    '<button type="button" onclick="setSongNusach(\'a\')" style="flex:1 1 160px;padding:7px 8px;border-radius:8px;border:1.5px solid #0f766e;font-weight:800;font-size:0.78rem;cursor:pointer;background:' + (n==='a'?'#0f766e':'#fff') + ';color:' + (n==='a'?'#fff':'#0f766e') + ';">' + ui.nusach_a + '</button></div>';

  html += '<div style="background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:12px;padding:9px 10px;margin-bottom:12px;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:0.74rem;font-weight:900;color:#0c4a6e;">' +
    '<span>' + pickLbl + '</span><span style="color:#64748b;font-weight:800;">' + (idx + 1) + ' / ' + list.length + '</span></div>' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:5px;max-height:205px;overflow-y:auto;padding-right:2px;">';

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const cId = item.id || (isBracha ? ('b' + i) : i);
    const isAct = (i === idx);
    const isDone = !!window.songMastered[cId];
    const isLck = !unlocked && i >= window.FREE_SONG_LIMIT;
    const rKey = window.resolveStampKey(item.id);
    const rParts = rKey.split('_');
    const durSec = window.SONG_DURATIONS && window.SONG_DURATIONS[rParts[0]] && window.SONG_DURATIONS[rParts[0]][rParts[1]];
    const durStr = window.formatTrackDur(durSec);
    const bg = isAct ? '#0c4a6e' : (isDone ? '#ecfdf5' : '#ffffff');
    const fg = isAct ? '#ffffff' : '#0f172a';
    const bd = isAct ? '2px solid #0284c7' : ('1px solid ' + (isDone ? '#10b981' : '#cbd5e1'));
    html += '<button type="button" onclick="window.selectAndPlayTrack(' + i + ', true)" style="display:flex;align-items:center;justify-content:space-between;gap:6px;text-align:left;padding:7px 9px;border-radius:8px;border:' + bd + ';background:' + bg + ';color:' + fg + ';font-size:0.77rem;font-weight:' + (isAct?'900':'700') + ';cursor:pointer;width:100%;">' +
      '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (isAct ? '🔊 ' : '') + item.t + '</span>' +
      '<span style="flex-shrink:0;font-size:0.7rem;opacity:0.88;">' + (isDone ? '✅ ' : (isLck ? '🔒 ' : '')) + (durStr || '') + '</span></button>';
  }
  html += '</div></div>';

  if (list.length > 0) {
    const s = list[idx];
    const cardId = s.id || (isBracha ? ('b' + idx) : idx);
    const done = !!window.songMastered[cardId];
    const heTxt = n === 'a' ? (s.he_a || s.he_s) : (s.he_s || s.he_a);
    const trObj = n === 'a' ? (s.tr_a || s.tr_s) : (s.tr_s || s.tr_a);
    const trTxt = (trObj && typeof trObj === 'object') ? (trObj[l] || trObj.en || '') : (trObj || '');
    const locked = !unlocked && idx >= window.FREE_SONG_LIMIT;
    const maskStyle = locked ? 'filter:blur(4px);cursor:pointer;' : '';
    const whenTxt = (s.when && typeof s.when === 'object') ? (s.when[l] || s.when.en || '') : (s.when || '');
    const note = (s.m && s.m[l]) ? s.m[l] : (s.m ? (s.m.en || s.m) : '');
    const resolvedKey = window.resolveStampKey(s.id);
    const hasMp3 = !!(window.SONG_TIMESTAMPS && window.SONG_TIMESTAMPS[resolvedKey]);
    const verHash = (window.SONG_AUDIO_VER && window.SONG_AUDIO_VER[resolvedKey]) ? window.SONG_AUDIO_VER[resolvedKey] : '2';
    const cfBase = (window.GAT_AUDIO_CDN || 'https://audio.giyuraliyahtrack.com').replace(/\/+$/, '');
    const mp3 = cfBase + '/' + resolvedKey + '.mp3?v=' + verHash + (window.__gatIdToken ? '&token=' + encodeURIComponent(window.__gatIdToken) : '');
    const localFallback = '/app/audio/' + resolvedKey + '.mp3?v=' + verHash;

    const heTokensHtml = window.tokenizeKaraokeWords(heTxt, 'he', cardId);
    const trTokensHtml = window.tokenizeKaraokeWords(trTxt, 'tr', cardId);

    const spdPopupHtml = '<div id="gat-spd-wrap" style="position:relative;display:inline-block;">' +
      '<button type="button" onclick="window.toggleSpeedPopup(event)" style="background:#f0f9ff;color:#0c4a6e;border:1.5px solid #0284c7;border-radius:999px;padding:5px 10px;font-size:0.74rem;font-weight:900;cursor:pointer;" id="gat-spd-trigger-lbl">🐢/🐇 ' + curSpd + 'x ▾</button>' +
      '<div id="gat-spd-popup" onclick="event.stopPropagation()" style="display:none;position:absolute;right:0;top:calc(100% + 5px);background:#ffffff;border:2px solid #0284c7;border-radius:11px;padding:6px;box-shadow:0 12px 28px rgba(15,23,42,0.22);z-index:9999;flex-direction:column;gap:3px;min-width:96px;">' +
      (window.SONG_SPEED_OPTS || [0.5, 0.75, 1, 1.25, 1.5]).map(function(r) {
        const act = Math.abs(r - curSpd) < 0.01;
        return '<button type="button" class="gat-spd-btn gat-spd-opt" data-rate="' + r + '" onclick="window.chooseSongSpeed(' + r + ', event)" style="padding:6px 10px;border-radius:7px;border:1px solid ' + (act ? '#0284c7' : '#e2e8f0') + ';background:' + (act ? '#0284c7' : '#ffffff') + ';color:' + (act ? '#ffffff' : '#0f172a') + ';font-size:0.76rem;font-weight:900;cursor:pointer;text-align:center;">' + r + 'x</button>';
      }).join('') + '</div></div>';

    const prevIdx = (idx - 1 + list.length) % list.length;
    const nextIdx = (idx + 1) % list.length;

    html += '<div id="gat-master-player-card" style="padding:15px;border:2px solid ' + (done?'#10b981':'#0284c7') + ';border-radius:15px;margin-bottom:8px;background:' + (done?'#f0fdf4':'#f8fafc') + ';box-shadow:0 6px 18px rgba(12,74,110,0.07);">' +
      (whenTxt ? '<div style="font-size:0.72rem;font-weight:800;color:#0284c7;text-transform:uppercase;margin-bottom:3px;">' + whenTxt + '</div>' : '') +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;">' +
      '<div style="font-weight:900;color:#0c4a6e;font-size:0.98rem;">' + s.t + (locked ? ui.locked_badge : ui.free_badge) + '</div>' +
      '<div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;">' +
      '<button type="button" title="Previous" onclick="window.selectAndPlayTrack(' + prevIdx + ', true)" style="background:#e2e8f0;color:#0f172a;border:none;border-radius:999px;padding:5px 9px;font-size:0.74rem;font-weight:900;cursor:pointer;">⏮</button>' +
      (hasMp3
        ? '<button type="button" onclick="play10sNative(\'' + cardId + '\',' + idx + ')" style="background:#0d9488;color:#fff;border:none;border-radius:999px;padding:5px 11px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + (locked ? ui.btn_prev10 : ui.btn_play_full) + '</button>'
        : '<button type="button" onclick="speakCleanBracha(' + idx + ')" style="background:#0284c7;color:#fff;border:none;border-radius:999px;padding:5px 11px;font-size:0.75rem;font-weight:800;cursor:pointer;">' + ui.btn_pronounce + '</button>') +
      '<button type="button" title="Next" onclick="window.selectAndPlayTrack(' + nextIdx + ', true)" style="background:#e2e8f0;color:#0f172a;border:none;border-radius:999px;padding:5px 9px;font-size:0.74rem;font-weight:900;cursor:pointer;">⏭</button>' +
      spdPopupHtml +
      '<button type="button" onclick="toggleSongMaster(\'' + cardId + '\')" style="background:' + (done?'#059669':'#e2e8f0') + ';color:' + (done?'#fff':'#334155') + ';border:none;border-radius:999px;padding:5px 10px;font-size:0.74rem;font-weight:800;cursor:pointer;">' + (done?'✅':ui.btn_mark) + '</button></div></div>' +
      '<div id="gat-sync-hud" style="font-size:0.73rem;font-weight:800;color:#0369a1;background:#e0f2fe;padding:5px 10px;border-radius:8px;margin-bottom:8px;">🎯 ' + wordTapLbl + '</div>' +
      (hasMp3 ? '<audio id="aud-' + cardId + '" data-song-idx="' + idx + '" src="' + mp3 + '" onloadedmetadata="if(window.songSpeed)this.playbackRate=window.songSpeed;" onerror="if(this.src.indexOf(\'/app/audio/\')===-1){this.src=\'' + localFallback + '\';}" controls preload="metadata" onplay="if(window.songSpeed)this.playbackRate=window.songSpeed;window.stopAllOtherSongs(this,\'' + cardId + '\');window.start60FpsKaraokeLoop(this,' + idx + ',\'' + cardId + '\');" onseeked="window.syncKaraokeFrame(this,\'' + cardId + '\',true);" onratechange="window.syncKaraokeFrame(this,\'' + cardId + '\',false);" onended="if(!(window.canUnlockSongs?window.canUnlockSongs():window.isProUnlocked())&&' + idx + '>=window.FREE_SONG_LIMIT){this.currentTime=0;window.clearKaraokeHighlights(\'' + cardId + '\');window.openProPaywall(window.getSongsUI().pw_10s,true);}" ontimeupdate="onSongTimeUpdate(this,' + idx + ',\'' + cardId + '\')" style="width:100%;height:38px;margin-bottom:8px;"></audio>' : '') +
      '<div id="he-box-' + cardId + '" dir="rtl" onclick="if(' + (locked?'true':'false') + ') openProPaywall(null,true);" style="font-size:1.1rem;font-weight:800;color:#0f172a;background:#fff;padding:12px 14px;border-radius:9px;border:1px solid #cbd5e1;margin-bottom:7px;line-height:1.9;max-height:230px;overflow-y:auto;scroll-behavior:smooth;position:relative;' + maskStyle + '">' + heTokensHtml + '</div>' +
      '<div id="tr-box-' + cardId + '" onclick="if(' + (locked?'true':'false') + ') openProPaywall(null,true);" style="font-size:0.9rem;color:#1e293b;font-style:italic;background:#ffffff;padding:9px 12px;border-radius:9px;border:1px dashed #cbd5e1;margin-bottom:10px;line-height:1.68;max-height:165px;overflow-y:auto;scroll-behavior:smooth;position:relative;' + maskStyle + '">' + trTokensHtml + '</div>' +
      '<button type="button" onclick="gradeSongMic(' + idx + ',' + (isBracha?'true':'false') + ')" style="width:100%;background:#d97706;color:#fff;border:none;border-radius:10px;padding:10px 12px;font-size:0.84rem;font-weight:900;cursor:pointer;margin-bottom:8px;">' + ui.btn_sing + '</button>' +
      '<div id="song-mic-out-' + cardId + '" style="display:none;margin-bottom:6px;font-size:0.8rem;"></div>' +
      '<div style="font-size:0.81rem;color:#475569;border-top:1px dashed #cbd5e1;padding-top:6px;">💡 ' + note + '</div></div>';
  }

  sl.innerHTML = html;
  const _seoDir = document.getElementById('gat-seo-liturgy-directory');
  if (_seoDir && sl.parentNode && _seoDir.parentNode !== sl.parentNode) { sl.parentNode.appendChild(_seoDir); }
  sl.querySelectorAll('audio').forEach(function(a) {
    a.preservesPitch = true;
    a.playbackRate = curSpd;
  });
};

window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    if (document.getElementById('songs-list')) {
      try { window.renderSongs12(); } catch(e) {}
    }
  }, 50);
});

// ============================================================================
// UNIFIED users/{uid} AUTO-CREATION & CHANGE-ONLY CLOUD SYNC
// ============================================================================
window.ensureUserDoc = function(user) {
  if (!window.gatDb || !user || !user.uid) return;
  const userRef = window.gatDb.collection('users').doc(user.uid);
  userRef.get().then(function(snap) {
    const basePayload = {
      uid: user.uid,
      isAnonymous: !!user.isAnonymous,
      lang: window.appLang || localStorage.getItem('gat_lang') || 'en',
      nusach: window.songNusach || localStorage.getItem('gat_nusach') || 's',
      songSpeed: window.songSpeed || 1,
      lastSeenAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (!snap.exists) {
      basePayload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      basePayload.draft = window.collectCurrentFormDraft ? window.collectCurrentFormDraft() : {};
      basePayload.bdScores = window.bdScores || {};
      basePayload.songMastered = window.songMastered || {};
      basePayload.entitlementsMap = window.getUnlockedTiersMap ? window.getUnlockedTiersMap() : {};
      userRef.set(basePayload, { merge: true }).catch(function(){});
    } else {
      const data = snap.data() || {};
      if (data.bdScores && typeof data.bdScores === 'object') {
        window.bdScores = Object.assign({}, data.bdScores, window.bdScores || {});
        localStorage.setItem('gat_bd_scores', JSON.stringify(window.bdScores));
      }
      if (data.songMastered && typeof data.songMastered === 'object') {
        window.songMastered = Object.assign({}, data.songMastered, window.songMastered || {});
        localStorage.setItem('gat_songs_m', JSON.stringify(window.songMastered));
      }
      userRef.set(basePayload, { merge: true }).catch(function(){});
    }
  }).catch(function(){});
};

window.pushDraftToFirestore = function(draft, nowMs, forceLeadStatus) {
  if (!window.gatDb || !window.gatUid) {
    localStorage.setItem('gat_form_dirty_cloud', '1');
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    localStorage.setItem('gat_form_dirty_cloud', '1');
    if (forceLeadStatus) localStorage.setItem('gat_pending_lead_status', forceLeadStatus);
  }

  const syncPayload = {
    uid: window.gatUid,
    draft: draft,
    bdScores: window.bdScores || {},
    songMastered: window.songMastered || {},
    cpRoom: window.cpRoom || '',
    updatedAtMs: nowMs,
    lang: window.appLang || 'en',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  window.gatDb.collection('users').doc(window.gatUid).set(syncPayload, { merge: true }).then(function() {
    localStorage.removeItem('gat_form_dirty_cloud');
  }).catch(function() {
    localStorage.setItem('gat_form_dirty_cloud', '1');
  });

  window.gatDb.collection('user_form_drafts').doc(window.gatUid).set({
    draft: draft,
    updatedAtMs: nowMs,
    lang: window.appLang || 'en',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(function(){});

  const hasLeadData = !!(
    (draft['vt-name'] && draft['vt-name'].trim()) ||
    (draft['vt-wa'] && draft['vt-wa'].trim()) ||
    (draft['vt-notes'] && draft['vt-notes'].trim()) ||
    forceLeadStatus
  );

  if (hasLeadData) {
    const lang = window.appLang || 'en';
    const v = VETTED_I18N[lang] || VETTED_I18N.en;
    const choice = draft.vt_choice || 0;
    const svcObj = v.svcs[choice] || v.svcs[0];
    const region = draft['vt-region'] || '';
    const isLegalOrNorth = (choice === 3 || choice === 4 || region.includes('Safed') || region.includes('צפת'));
    const routeTag = isLegalOrNorth ? '[🔥 PRIORITY NOTARY / LAWYER ESCORT DESK]' : '[🕍 VETTED RABBI / KALLAH BOOKING]';

    const leadPayload = {
      uid: window.gatUid,
      status: forceLeadStatus || localStorage.getItem('gat_pending_lead_status') || 'in_progress_draft',
      updatedAtMs: nowMs,
      lang: lang,
      routeTag: routeTag,
      serviceIdx: choice,
      serviceName: svcObj.t,
      priceTier: svcObj.p,
      region: region,
      track: draft['vt-track'] || '',
      name: (draft['vt-name'] || '').trim(),
      whatsapp: (draft['vt-wa'] || '').trim(),
      targetDate: (draft['vt-date'] || '').trim() || 'Flexible / ASAP',
      notes: (draft['vt-notes'] || '').trim(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const leadCheckStr = JSON.stringify([leadPayload.status, leadPayload.serviceIdx, leadPayload.region, leadPayload.track, leadPayload.name, leadPayload.whatsapp, leadPayload.targetDate, leadPayload.notes]);
    if (leadCheckStr !== window.gatLastLeadSnapshot) {
      window.gatLastLeadSnapshot = leadCheckStr;
      window.gatDb.collection('concierge_leads').doc(window.gatUid).set(leadPayload, { merge: true }).then(function() {
        localStorage.removeItem('gat_pending_lead_status');
      }).catch(function(){});
      window.gatDb.collection('users').doc(window.gatUid).set({ latestLead: leadPayload }, { merge: true }).catch(function(){});
    }
  }
};

window.pullCloudFormDraftOnce = function() {
  if (!window.gatDb || !window.gatUid || window._pulledCloudDraft) return;
  window._pulledCloudDraft = true;

  if (localStorage.getItem('gat_form_dirty_cloud') === '1') {
    window.flushOfflineDraftOnReconnect();
    return;
  }

  window.gatDb.collection('users').doc(window.gatUid).get().then(function(snap) {
    if (snap.exists && snap.data() && snap.data().draft) {
      const data = snap.data();
      const localTs = parseInt(localStorage.getItem('gat_form_draft_ts') || '0', 10);
      const cloudTs = data.updatedAtMs || 0;
      let localDraft = {};
      try { localDraft = JSON.parse(localStorage.getItem('gat_form_draft_v1') || '{}'); } catch(e){}

      const merged = (localTs >= cloudTs)
        ? Object.assign({}, data.draft, localDraft)
        : Object.assign({}, localDraft, data.draft);

      localStorage.setItem('gat_form_draft_v1', JSON.stringify(merged));
      window.restoreSavedFormDraft(merged);
      return;
    }
    return window.gatDb.collection('user_form_drafts').doc(window.gatUid).get().then(function(legacySnap) {
      if (!legacySnap.exists) return;
      const d = legacySnap.data() || {};
      if (d.draft) {
        const localTs = parseInt(localStorage.getItem('gat_form_draft_ts') || '0', 10);
        const cloudTs = d.updatedAtMs || 0;
        let localDraft = {};
        try { localDraft = JSON.parse(localStorage.getItem('gat_form_draft_v1') || '{}'); } catch(e){}
        const merged = (localTs >= cloudTs)
          ? Object.assign({}, d.draft, localDraft)
          : Object.assign({}, localDraft, d.draft);
        localStorage.setItem('gat_form_draft_v1', JSON.stringify(merged));
        window.restoreSavedFormDraft(merged);
      }
    });
  }).catch(function(){});
};

if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && window.ensureUserDoc) window.ensureUserDoc(user);
  });
}

/* GAT_WORKER_TOKEN_BRIDGE */
(function() {
  window.__gatIdToken = window.__gatIdToken || "";
  function refreshAudioUrlsWithToken(tok) {
    document.querySelectorAll('audio[id^="aud-"]').forEach(function(el) {
      if (el.paused && el.src && el.src.indexOf("audio.giyuraliyahtrack.com") !== -1) {
        try {
          var u = new URL(el.src);
          if (tok) u.searchParams.set("token", tok);
          else u.searchParams.delete("token");
          if (el.src !== u.toString()) el.src = u.toString();
        } catch (e) {}
      }
    });
  }
  function reconcileServerEntitlements(user) {
    localStorage.removeItem("gat_unlocked_tier");
    if (!user) return;
    if (typeof firebase !== "undefined" && firebase.firestore) {
      firebase.firestore().collection("pro_entitlements").doc(user.uid).get().then(function(snap) {
        if (!snap.exists) return;
        var d = snap.data() || {};
        var serverMap = d.entitlementsMap || {};
        if (!Object.keys(serverMap).length && d.tier) {
          serverMap[d.tier] = { exp: d.exp || 0, ts: Date.now() };
        }
        if (Object.keys(serverMap).length) {
          localStorage.setItem("gat_entitlements_v2", JSON.stringify(serverMap));
          var anyPlaying = Array.from(document.querySelectorAll("audio")).some(function(a){ return !a.paused; });
          if (!anyPlaying && typeof window.renderSongs12 === "function" && window.currentMod === "songs-prayers") {
            window.renderSongs12();
          }
        }
      }).catch(function() {});
    }
  }
  function attachAudioTokenSync() {
    if (typeof firebase === "undefined" || !firebase.auth) {
      setTimeout(attachAudioTokenSync, 400);
      return;
    }
    try {
      var authObj = firebase.auth();
      var handler = function(user) {
        reconcileServerEntitlements(user);
        if (!user) {
          window.__gatIdToken = "";
          return;
        }
        user.getIdToken().then(function(tok) {
          var prev = window.__gatIdToken;
          window.__gatIdToken = tok || "";
          if (tok && tok !== prev) refreshAudioUrlsWithToken(tok);
        }).catch(function() {});
      };
      if (authObj.onIdTokenChanged) authObj.onIdTokenChanged(handler);
      else authObj.onAuthStateChanged(handler);
      setInterval(function() {
        var u = firebase.auth().currentUser;
        if (u) u.getIdToken(true).then(function(t) { window.__gatIdToken = t || ""; }).catch(function() {});
      }, 45 * 60 * 1000);
    } catch (e) {}
  }
  attachAudioTokenSync();
})();


/* === Whole-App Russian (RU) Localization Layer === */
(function() {
  var RU_DOM_MAP = {
    'Track Selection & Readiness': 'Выбор маршрута и готовность досье',
    'AI Document & Apostille Auditor': 'ИИ-Аудитор документов и апостилей',
    'Hebrew Forms & Clerk Shield': 'Анкеты МВД на иврите и защита от отказов',
    'Vetted Legal & Rabbinic Desk': 'Проверенный юридический и раввинский отдел',
    'Upload or snap a photo of any certificate': 'Загрузите или сфотографируйте любое свидетельство (рождение, несудимость, брак, гиюр)',
    'Scan & Audit Document': 'Сканировать и проверить документ (ИИ)',
    'Unlock Full Access': 'Разблокировать полный доступ',
    '90-Day Sprint Pass': 'Пропуск на 90 дней ($89)',
    'Lifetime Sovereignty Pass': 'Пожизненный полный доступ ($149)'
  };

  function applyWholeAppRussian() {
    var curLang = window.appLang || localStorage.getItem('gat_lang') || 'en';
    // Ensure any global translation table in app.js has a 'ru' entry
    ['I18N', 'TRANSLATIONS', 'STRINGS', 'LANG_DATA', 'T'].forEach(function(gName) {
      var tbl = window[gName];
      if (tbl && typeof tbl === 'object' && tbl.en && !tbl.ru) {
        tbl.ru = Object.assign({}, tbl.en);
      }
    });
    var ruBtn = document.getElementById('lang-ru');
    if (ruBtn) {
      if (curLang === 'ru') ruBtn.classList.add('active');
      else ruBtn.classList.remove('active');
    }
    if (curLang === 'ru') {
      document.documentElement.lang = 'ru';
      document.documentElement.dir = 'ltr';
    }
    if (typeof window.mountUnifiedPibaFormsEngine === 'function') {
      window.mountUnifiedPibaFormsEngine();
    }
  }

  var origSetLang = window.setLang;
  if (typeof origSetLang === 'function' && !window._ruSetLangWrapped) {
    window._ruSetLangWrapped = true;
    window.setLang = function(l) {
      window.appLang = l;
      localStorage.setItem('gat_lang', l);
      try { origSetLang(l); } catch (e) {}
      applyWholeAppRussian();
    };
  }
  window.addEventListener('DOMContentLoaded', applyWholeAppRussian);
  setTimeout(applyWholeAppRussian, 150);
})();

