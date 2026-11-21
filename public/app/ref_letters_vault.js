/* ============================================================================
 * GIYUR ALIYAH TRACK — REFERENCE LETTERS & COMMUNITY / WITNESS EVENT LOGGER
 * 100% 6-Language (EN, HE, FR, ES, DE, RU) • Local + Firestore Cloud Synced
 * Supports Beit Din Recommenders + Misrad HaPanim (Nohal 5.2.0008/0009) Witnesses
 * ============================================================================ */
(function initGatReferenceLettersStudioV1() {
  if (window._gatRefLettersStudioV1) return;
  window._gatRefLettersStudioV1 = true;

  var STORAGE_KEY = "gat_ref_logger_v1";
  var VALID_LANGS = ["en", "he", "fr", "es", "de", "ru"];

  var I18N = {
    en: {
      pillLabel: "✍️ Reference Letters & Log",
      drawerLabel: "✍️ Reference Letters & Event Log",
      title: "✍️ Community & Witness Reference Letter Studio",
      subtitle: "Log Shabbat meals, volunteering, classes, or couple visits over time — OR answer 3 quick memory prompts now — so AI crafts a polite deadline request and a 100% unique, non-cookie-cutter letter per person.",
      tabLog: "📅 1. Event & Interaction Log ({n})",
      tabStudio: "✨ 2. Request & Letter Builder ({c})",
      logBoxTitle: "➕ Log a Community Event, Meal, Volunteering or Visit",
      logBoxSub: "Takes 10 seconds now — saves you from scrambling for dates and details months later!",
      quickContactsLbl: "Quick-tap an existing person:",
      personNameLbl: "Person / Family / Contact Name:",
      personNamePh: "e.g. Cohen Family, Rabbi Yitzchak Levy, Avi Mizrahi...",
      roleLbl: "Their Role / Relationship to You:",
      roles: {
        rabbi: "🕍 Community / Synagogue Rabbi (Beit Din)",
        host_family: "🕯️ Shabbat & Holiday Host Family (Beit Din)",
        volunteer_org: "🤝 Volunteering / Chesed / Gabbai Coordinator",
        teacher_mentor: "📚 Ulpan / Halacha / Kallah Teacher or Mentor",
        piba_friend: "👥 Israeli Friend Witness (Misrad HaPanim 5.2.0008)",
        piba_family: "👨‍👩‍👧 Family / In-Law Witness (Misrad HaPanim)",
        employer_colleague: "💼 Employer / Coworker / Neighbor Witness",
        diaspora_transfer: "✈️ Overseas Rabbi / Diaspora Community Attestation"
      },
      actTagLbl: "Activity Type:",
      actTags: {
        shabbat: "🕯️ Shabbat Meal",
        tefillah: "🕍 Shul / Tefillah",
        volunteer: "🤝 Volunteering / Chesed",
        shiur: "📖 Shiur / Class",
        holiday: "🍷 Holiday / Chag",
        couple_visit: "💑 Couple Visit / Outing",
        other: "📌 Other Interaction"
      },
      placeLbl: "Place / Synagogue / Home & City:",
      placePh: "e.g. Beit Knesset Ari, Safed / Cohen Home, Jerusalem",
      dateLbl: "Date:",
      noteLbl: "Specific Moment / What You Did Together:",
      notePh: "e.g. Helped set up Kiddush for 50 people; sang zemirot & discussed Parashat Vayera with Rachel...",
      addLogBtn: "➕ Save Event to My Logbook",
      savedToast: "✅ Event logged & synced!",
      timelineHdr: "📂 Your Logged Relationships & Events (Grouped by Person)",
      emptyLogs: "No events logged yet! Log your first Shabbat meal, volunteering shift, or friend visit above — OR jump straight to Tab 2 ('✨ Request & Letter Builder') even if you didn't log dates beforehand.",
      eventsCountBadge: "{n} logged event(s)",
      draftFromPersonBtn: "✍️ Request / Draft Letter →",
      delEventConfirm: "Remove this logged event?",
      studioPickHdr: "👤 Step 1: Who Are You Requesting a Reference / Witness Letter From?",
      pickExistingOpt: "➕ New Person (Not in Event Log Yet)",
      appNameLbl: "Your Full Name (Applicant):",
      appNamePh: "e.g. Sarah (Ruth) Miller",
      partnerNameLbl: "Spouse / Partner Name (Optional — recommended for Couples/PIBA):",
      partnerNamePh: "e.g. Ya'aqov Einy",
      signerNameLbl: "Recommender / Witness Full Name:",
      signerTitleLbl: "Title / Synagogue / Relationship Label (Optional):",
      signerTitlePh: "e.g. Rav Kehillah / Close Friend of 3 Years / Chesed Director",
      pibaWitnessHint: "💡 Misrad HaPanim Tip (Nohal 5.2.0008/0009): Clerks require Israeli friend/family witnesses to list their 9-digit Teudat Zehut & phone number on the letter (and attach a photo of their ID).",
      signerTzLbl: "Witness Israeli TZ # (Optional — for Misrad HaPanim):",
      signerTzPh: "9-digit Israeli ID (or leave blank for underline)",
      signerPhoneLbl: "Recommender Phone # (Optional):",
      signerPhonePh: "e.g. 052-123-4567",
      deadlineLbl: "📅 Date You Need the Signed Letter By:",
      commLangLbl: "🗣️ Language You Speak With This Person:",
      loggedSummaryBadge: "✅ Auto-importing {n} logged date(s) & venue(s) for {name}!",
      interviewHdr: "🧠 Step 2: Relationship & Memory Details (Anti-Cookie-Cutter Engine)",
      interviewSubZero: "Even if you didn't log dates in advance, give as many real details below as you remember — AI will weave them into an authentic, one-of-a-kind letter:",
      interviewSubHasLogs: "Add any extra personal context to combine with your {n} logged event(s) above:",
      qHowMetLbl: "1. How & when did you meet, and how often do you interact?",
      qHowMetPh: "e.g. Started praying at his synagogue 10 months ago every Friday night & Shabbat morning; or close friends with us in Safed since 2024...",
      qWitnessedLbl: "2. Specific meals, volunteering tasks, holidays, or moments they personally saw:",
      qWitnessedPh: "e.g. Hosted us for Sukkot & 6 Shabbat lunches, saw me lead Birkat HaMazon, volunteered packing Pesach food boxes together, visited our home...",
      qSpecialLbl: "3. One unique personal detail or tone note (so it sounds 100% like them):",
      qSpecialPh: "e.g. Very warm family with 4 kids; or concise, formal Rav; knows how dedicated we are...",
      depthThin: "⚠️ Detail Depth: Thin — add 1–2 concrete moments above so your letter doesn't sound generic!",
      depthGood: "🟢 Detail Depth: Rich — ready to craft a deeply authentic, unique letter!",
      btnGenOutreach: "💬 1. Generate Polite Request Message (WhatsApp / Email)",
      btnGenLetter: "📄 2. Generate Unique Ready-to-Sign Letter (Hebrew + Translation)",
      btnGenBoth: "✨ Generate BOTH: Polite Request + Ready Draft Letter →",
      generatingMsg: "🤖 Crafting bespoke, non-templated text from your personal history...",
      outreachCardHdr: "💬 Step 3A: Polite Request to Send {name} (Editable)",
      outreachCardSub: "States your deadline and offers to either send bullet reminders OR share your ready-to-edit draft:",
      copyOutreachBtn: "📋 Copy Request",
      waOutreachBtn: "📲 Open in WhatsApp",
      letterCardHdr: "📄 Step 3B: Bespoke Ready-to-Edit Letter for {name} (Anti-Clone Verified)",
      letterHeLbl: "Official Hebrew Letter (Editable — tweak any word before sharing/printing):",
      letterTrLbl: "1:1 Translation (For You & Your Recommender to Proofread):",
      copyLetterBtn: "📋 Copy Hebrew Letter",
      copyBothLetterBtn: "📋 Copy Hebrew + Translation",
      waLetterBtn: "📲 Send Draft on WhatsApp",
      printPdfBtn: "🖨️ Print / Save Signable PDF",
      savedLettersHdr: "🗂️ Saved Letters in Your Dossier ({n} Unique Authors)",
      pwUnlockBtn: "🔓 Unlock Clean Copy, WhatsApp Share & Signable Letterhead PDF ($89 Sprint / $149 Lifetime) →",
      pwReason: "✍️ Unlock unlimited clean Reference & Witness Letter exports, WhatsApp sharing, and signable PDF printing:",
      copiedToast: "✅ Copied to clipboard!",
      errNeedNames: "⚠️ Please enter both your name and the recommender/witness's name first."
    },
    he: {
      pillLabel: "✍️ המלצות ויומן קהילה",
      drawerLabel: "✍️ יומן קהילה ומכתבי המלצה (רב / חברים / מארחים)",
      title: "✍️ יומן אירועים ומחולל חכם למכתבי המלצה ועדות",
      subtitle: "תעדו ארוחות שבת, התנדבות, שיעורים או מפגשים חברתיים לאורך הזמן — או ענו כעת על 3 שאלות היכרות קצרות — כדי להפיק פנייה מנומסת עם תאריך יעד ומכתב אישי וייחודי לכל ממליץ (ללא תבניות משוכפלות!).",
      tabLog: "📅 1. יומן אירועים ומפגשים ({n})",
      tabStudio: "✨ 2. בקשת מכתב וטיוטה חכמה ({c})",
      logBoxTitle: "➕ תיעוד מהיר: ארוחת שבת, התנדבות, תפילה או מפגש",
      logBoxSub: "לוקח 10 שניות בזמן אמת — וחוסך לחץ ושכחה כשמגיע הזמן לאסוף מכתבים לבית הדין או למשרד הפנים!",
      quickContactsLbl: "בחירה מהירה מאנשי קשר קיימים:",
      personNameLbl: "שם הממליץ/ה / המשפחה / העד:",
      personNamePh: "למשל: משפחת כהן, הרב יצחק לוי, אבי מזרחי...",
      roleLbl: "תפקיד / סוג הקשר אליכם:",
      roles: {
        rabbi: "🕍 רב קהילה / רב בית כנסת (לבית הדין)",
        host_family: "🕯️ משפחה מארחת / מלווה בשבתות וחגים (לבית הדין)",
        volunteer_org: "🤝 רכז התנדבות / חסד / גבאי בית כנסת",
        teacher_mentor: "📚 מורה באולפן / רב מלמד / מדריכת כלה",
        piba_friend: "👥 חבר/ה ישראלי/ת — מכתב עדות לקשר (משרד הפנים נוהל 5.2.0008)",
        piba_family: "👨‍👩‍👧 בן/בת משפחה — הצהרת היכרות (משרד הפנים)",
        employer_colleague: "💼 מעסיק / עמית לעבודה / שכן",
        diaspora_transfer: "✈️ רב קהילה בחו״ל / אישור רקע והעברת תיק"
      },
      actTagLbl: "סוג הפעילות:",
      actTags: {
        shabbat: "🕯️ סעודת שבת",
        tefillah: "🕍 תפילה / בית כנסת",
        volunteer: "🤝 התנדבות / חסד",
        shiur: "📖 שיעור תורה / לימוד",
        holiday: "🍷 חג / מועד",
        couple_visit: "💑 בילוי / ביקור זוגי",
        other: "📌 מפגש אחר"
      },
      placeLbl: "מקום / בית כנסת / בית והעיר:",
      placePh: "למשל: בי״כ האר״י צפת / בית משפחת כהן, ירושלים",
      dateLbl: "תאריך:",
      noteLbl: "פרטים מהאירוע / מה עשיתם יחד:",
      notePh: "למשל: עזרה בסידור קידוש ל-50 מתפללים; סעודת ליל שבת משותפת עם רחל...",
      addLogBtn: "➕ שמירת האירוע ביומן שלי",
      savedToast: "✅ האירוע נשמר וסונכרן לענן!",
      timelineHdr: "📂 היסטוריית הקשרים והאירועים שתועדו (לפי אדם)",
      emptyLogs: "עדיין לא תועדו אירועים! הוסיפו סעודת שבת, התנדבות או מפגש למעלה — או עברו ישירות ללשונית 2 ('✨ בקשת מכתב וטיוטה חכמה') גם אם לא ניהלתם יומן מראש.",
      eventsCountBadge: "{n} אירועים מתועדים",
      draftFromPersonBtn: "✍️ בקשת מכתב / יצירת טיוטה ←",
      delEventConfirm: "למחוק אירוע זה מהיומן?",
      studioPickHdr: "👤 שלב 1: ממי תרצו לבקש מכתב המלצה או עדות?",
      pickExistingOpt: "➕ אדם חדש (ללא תיעוד קודם ביומן)",
      appNameLbl: "השם המלא שלך (המבקש/ת):",
      appNamePh: "למשל: שרה (רות) מילר",
      partnerNameLbl: "שם בן/בת הזוג (אופציונלי — מומלץ להליך זוגי/משרד הפנים):",
      partnerNamePh: "למשל: יעקב עיני",
      signerNameLbl: "שם מלא של הממליץ/ה או העד/ה:",
      signerTitleLbl: "תואר / קהילה / תיאור הקשר (אופציונלי):",
      signerTitlePh: "למשל: רב הקהילה / חבר קרוב מזה 3 שנים / רכזת חסד",
      pibaWitnessHint: "💡 דרישת משרד הפנים (נוהל 5.2.0008/0009): במכתבי חברים ובני משפחה חובה לציין מספר ת״ז (9 ספרות) וטלפון של הכותב/ת ולצרף צילום ת״ז.",
      signerTzLbl: "מספר ת״ז של העד/ה (אופציונלי — למשרד הפנים):",
      signerTzPh: "9 ספרות (או השאירו ריק לקו השלמה)",
      signerPhoneLbl: "טלפון של הממליץ/ה (אופציונלי):",
      signerPhonePh: "למשל: 052-123-4567",
      deadlineLbl: "📅 עד איזה תאריך אתם צריכים את המכתב חתום?",
      commLangLbl: "🗣️ באיזו שפה אתם מתקשרים עם אדם זה?",
      loggedSummaryBadge: "✅ שואב אוטומטית {n} אירועים ותאריכים מתועדים עבור {name}!",
      interviewHdr: "🧠 שלב 2: פרטי ההיכרות והאירועים (למכתב אותנטי וייחודי)",
      interviewSubZero: "גם אם לא תיעדתם תאריכים ביומן, כתבו כמה שיותר פרטים אמיתיים למטה — וה-AI ישזור אותם למכתב אישי שנשמע 100% אנושי:",
      interviewSubHasLogs: "הוסיפו דגשים אישיים שישתלבו עם {n} האירועים המתועדים שלכם:",
      qHowMetLbl: "1. איך ומתי הכרתם, ובאיזו תדירות אתם נפגשים?",
      qHowMetPh: "למשל: מתפללים בבית הכנסת שלו כמעט כל שבת ב-10 החודשים האחרונים; או חברים קרובים בצפת מאז 2024...",
      qWitnessedLbl: "2. סעודות, התנדבויות, חגים או רגעים ספציפיים שהוא/היא ראו מקרוב:",
      qWitnessedPh: "למשל: אירחו אותנו בסוכות וב-6 סעודות שבת, התנדבתי בחלוקת סלי מזון לפסח, ביקרו בדירתנו המשותפת...",
      qSpecialLbl: "3. פרט אישי ייחודי או סגנון הדיבור שלהם (כדי שלא יישמע כמו תבנית):",
      qSpecialPh: "למשל: משפחה חמה עם 4 ילדים; או רב תמציתי ורשמי; מכירים היטב את הזוגיות שלנו...",
      depthThin: "⚠️ עומק פרטים: דל — מומלץ להוסיף 1–2 דוגמאות אמיתיות למעלה כדי שהמכתב לא יישמע גנרי!",
      depthGood: "🟢 עומק פרטים: מצוין — מוכן ליצירת מכתב אישי, אמין וייחודי!",
      btnGenOutreach: "💬 1. הפקת הודעת פנייה מנומסת (לוואטסאפ / מייל)",
      btnGenLetter: "📄 2. הפקת מכתב המלצה ייחודי מוכן לעריכה וחתימה",
      btnGenBoth: "✨ הפק את שניהם: הודעת בקשה + טיוטת מכתב מותאמת ←",
      generatingMsg: "🤖 מנסח פנייה אישית ומכתב ייחודי מההיסטוריה שלכם...",
      outreachCardHdr: "💬 שלב 3א: הודעת בקשה מנומסת לשליחה אל {name} (ניתנת לעריכה)",
      outreachCardSub: "מציינת את תאריך היעד ומציעה לעזור בנקודות תזכורת או לשלוח טיוטה מוכנה לעריכה וחתימה:",
      copyOutreachBtn: "📋 העתק הודעת בקשה",
      waOutreachBtn: "📲 שלח בוואטסאפ",
      letterCardHdr: "📄 שלב 3ב: טיוטת מכתב ייחודית עבור {name} (מותאמת אישית ללא שכפול)",
      letterHeLbl: "נוסח המכתב בעברית (ניתן לעריכה חופשית לפני שליחה או הדפסה):",
      letterTrLbl: "תרגום מקביל (עבורכם ועבור הממליץ לבדיקה נוחה):",
      copyLetterBtn: "📋 העתק מכתב בעברית",
      copyBothLetterBtn: "📋 העתק עברית + תרגום",
      waLetterBtn: "📲 שלח טיוטה בוואטסאפ",
      printPdfBtn: "🖨️ הדפסה / שמירת PDF לחתימה",
      savedLettersHdr: "🗂️ מכתבים שמורים בתיק שלכם ({n} כותבים שונים)",
      pwUnlockBtn: "🔓 פתיחת העתקה נקייה, שיתוף וואטסאפ והדפסת PDF רשמי לחתימה ($89 / $149) ←",
      pwReason: "✍️ פתחו הפקה נקייה ללא הגבלה של מכתבי המלצה ועדות, שליחה בוואטסאפ והדפסת PDF מוכן לחתימה:",
      copiedToast: "✅ הועתק ללוח!",
      errNeedNames: "⚠️ נא להזין תחילה את שמכם ואת שם הממליץ/ה או העד/ה."
    },
    fr: {
      pillLabel: "✍️ Lettres & Journal",
      drawerLabel: "✍️ Journal Communautaire & Lettres de Référence",
      title: "✍️ Journal d'Activités & Studio Intelligent de Lettres de Référence",
      subtitle: "Notez vos repas de Chabbat, bénévolats, cours ou visites au fil du temps — OU répondez à 3 questions rapides — pour générer une demande polie avec date limite et une lettre 100 % unique par personne.",
      tabLog: "📅 1. Journal d'Événements ({n})",
      tabStudio: "✨ 2. Demande & Lettre sur Mesure ({c})",
      logBoxTitle: "➕ Noter un Repas de Chabbat, Bénévolat, Office ou Visite",
      logBoxSub: "Prend 10 secondes maintenant — et évite d'oublier des dates précieuses le jour du dossier !",
      quickContactsLbl: "Sélection rapide d'un contact existant :",
      personNameLbl: "Nom de la Personne / Famille :",
      personNamePh: "ex. Famille Cohen, Rav Yitzhak Levy, Avi Mizrahi...",
      roleLbl: "Son Rôle / Lien avec Vous :",
      roles: {
        rabbi: "🕍 Rabbin de Communauté / Synagogue (Beit Din)",
        host_family: "🕯️ Famille d'Accueil de Chabbat & Fêtes (Beit Din)",
        volunteer_org: "🤝 Responsable Bénévolat / Hessed / Gabbaï",
        teacher_mentor: "📚 Professeur d'Oulpan / Halakha / Madrichat Kallah",
        piba_friend: "👥 Ami(e) Israélien(ne) Témoin (Misrad HaPanim 5.2.0008)",
        piba_family: "👨‍👩‍👧 Membre de la Famille / Belle-Famille (Misrad HaPanim)",
        employer_colleague: "💼 Employeur / Collègue / Voisin Témoin",
        diaspora_transfer: "✈️ Rabbin de Diaspora / Attestation Communautaire"
      },
      actTagLbl: "Type d'Activité :",
      actTags: {
        shabbat: "🕯️ Repas de Chabbat",
        tefillah: "🕍 Synagogue / Tefillah",
        volunteer: "🤝 Bénévolat / Hessed",
        shiur: "📖 Cours / Chiour",
        holiday: "🍷 Fête / Hag",
        couple_visit: "💑 Sortie / Visite Couple",
        other: "📌 Autre Rencontre"
      },
      placeLbl: "Lieu / Synagogue / Domicile & Ville :",
      placePh: "ex. Synagogue Ari, Safed / Famille Cohen, Jérusalem",
      dateLbl: "Date :",
      noteLbl: "Détail concret / Ce que vous avez partagé :",
      notePh: "ex. Aide à préparer le Kiddouch pour 50 fidèles ; chants de Chabbat avec Rachel...",
      addLogBtn: "➕ Enregistrer dans Mon Journal",
      savedToast: "✅ Événement enregistré et synchronisé !",
      timelineHdr: "📂 Vos Contacts & Événements Enregistrés",
      emptyLogs: "Aucun événement noté pour l'instant ! Ajoutez-en un ci-dessus — OU passez directement à l'onglet 2 ('✨ Demande & Lettre sur Mesure') même sans historique.",
      eventsCountBadge: "{n} événement(s)",
      draftFromPersonBtn: "✍️ Demander / Rédiger Lettre →",
      delEventConfirm: "Supprimer cet événement ?",
      studioPickHdr: "👤 Étape 1 : À qui demandez-vous cette lettre ?",
      pickExistingOpt: "➕ Nouvelle Personne (Pas encore dans le journal)",
      appNameLbl: "Votre Nom Complet (Demandeur) :",
      appNamePh: "ex. Sarah (Ruth) Miller",
      partnerNameLbl: "Nom du Conjoint (Optionnel — conseillé pour PIBA) :",
      partnerNamePh: "ex. Ya'aqov Einy",
      signerNameLbl: "Nom Complet du Référent / Témoin :",
      signerTitleLbl: "Titre / Synagogue / Lien (Optionnel) :",
      signerTitlePh: "ex. Rav de la communauté / Ami proche depuis 3 ans",
      pibaWitnessHint: "💡 Conseil Misrad HaPanim (Nohal 5.2.0008) : Les témoins israéliens doivent indiquer leur n° Teoudat Zehout (9 chiffres) et téléphone.",
      signerTzLbl: "N° Teoudat Zehout du Témoin (Optionnel — PIBA) :",
      signerTzPh: "9 chiffres (ou laisser vide)",
      signerPhoneLbl: "Téléphone du Référent (Optionnel) :",
      signerPhonePh: "ex. 052-123-4567",
      deadlineLbl: "📅 Date Limite Souhaitée pour la Signature :",
      commLangLbl: "🗣️ Langue Parlée avec Cette Personne :",
      loggedSummaryBadge: "✅ {n} événement(s) importé(s) automatiquement pour {name} !",
      interviewHdr: "🧠 Étape 2 : Détails & Souvenirs Réels (Zéro Modèle Générique)",
      interviewSubZero: "Même sans dates enregistrées, donnez un maximum de détails concrets ci-dessous :",
      interviewSubHasLogs: "Ajoutez tout détail personnel complémentaire à vos {n} événements notés :",
      qHowMetLbl: "1. Comment et quand vous êtes-vous connus, et à quelle fréquence vous voyez-vous ?",
      qHowMetPh: "ex. Présent à la synagogue chaque vendredi soir depuis 10 mois ; amis proches à Safed depuis 2024...",
      qWitnessedLbl: "2. Repas, actions bénévoles, fêtes ou moments précis vécus ensemble :",
      qWitnessedPh: "ex. Invités à Souccot et 6 repas de Chabbat, bénévolat paniers de Pessah, visites chez nous...",
      qSpecialLbl: "3. Touche personnelle ou style propre à cette personne :",
      qSpecialPh: "ex. Famille chaleureuse ; ou rabbin concis et formel...",
      depthThin: "⚠️ Niveau de détail faible — ajoutez 1 ou 2 exemples concrets pour éviter un texte générique !",
      depthGood: "🟢 Niveau de détail riche — prêt pour une lettre authentique et unique !",
      btnGenOutreach: "💬 1. Générer le Message Poli de Demande (WhatsApp / Email)",
      btnGenLetter: "📄 2. Générer la Lettre Unique Prête à Signer (Hébreu + Traduction)",
      btnGenBoth: "✨ Générer LES DEUX : Message de Demande + Brouillon de Lettre →",
      generatingMsg: "🤖 Rédaction personnalisée à partir de votre vécu...",
      outreachCardHdr: "💬 Étape 3A : Message de Demande pour {name} (Modifiable)",
      outreachCardSub: "Précise votre échéance et propose soit quelques rappels, soit un brouillon modifiable :",
      copyOutreachBtn: "📋 Copier la Demande",
      waOutreachBtn: "📲 Ouvrir WhatsApp",
      letterCardHdr: "📄 Étape 3B : Lettre sur Mesure pour {name} (Anti-Copier-Coller)",
      letterHeLbl: "Lettre Officielle en Hébreu (Modifiable librement avant envoi/impression) :",
      letterTrLbl: "Traduction 1:1 (Pour relecture facile par vous et le signataire) :",
      copyLetterBtn: "📋 Copier l'Hébreu",
      copyBothLetterBtn: "📋 Copier Hébreu + Traduction",
      waLetterBtn: "📲 Envoyer sur WhatsApp",
      printPdfBtn: "🖨️ Imprimer / Enregistrer PDF",
      savedLettersHdr: "🗂️ Lettres Sauvegardées dans Votre Dossier ({n})",
      pwUnlockBtn: "🔓 Débloquer Copie Propre, Envoi WhatsApp & Impression PDF (89 $ / 149 $) →",
      pwReason: "✍️ Débloquez la copie sans filigrane, le partage WhatsApp et l'impression PDF de toutes vos lettres de référence :",
      copiedToast: "✅ Copié dans le presse-papiers !",
      errNeedNames: "⚠️ Veuillez d'abord saisir votre nom et celui du référent/témoin."
    },
    es: {
      pillLabel: "✍️ Cartas y Registro",
      drawerLabel: "✍️ Registro Comunitario y Cartas de Referencia",
      title: "✍️ Registro de Eventos y Estudio Inteligente de Cartas de Referencia",
      subtitle: "Registre cenas de Shabat, voluntariado, clases o visitas con el tiempo — O responda 3 preguntas rápidas ahora — para generar una solicitud cortés con fecha límite y una carta 100% única por persona.",
      tabLog: "📅 1. Registro de Eventos ({n})",
      tabStudio: "✨ 2. Solicitud y Carta a Medida ({c})",
      logBoxTitle: "➕ Registrar Cena de Shabat, Voluntariado, Rezo o Visita",
      logBoxSub: "Toma 10 segundos hoy — ¡y evita olvidar fechas clave cuando llegue su cita!",
      quickContactsLbl: "Contacto rápido guardado:",
      personNameLbl: "Nombre de la Persona / Familia:",
      personNamePh: "ej. Familia Cohen, Rabino Yitzjak Levy, Avi Mizraji...",
      roleLbl: "Su Rol / Relación con Usted:",
      roles: {
        rabbi: "🕍 Rabino de Comunidad / Sinagoga (Beit Din)",
        host_family: "🕯️ Familia Anfitriona de Shabat y Fiestas (Beit Din)",
        volunteer_org: "🤝 Coordinador de Voluntariado / Jésed / Gabai",
        teacher_mentor: "📚 Profesor de Ulpán / Halajá / Madrijat Kalá",
        piba_friend: "👥 Amigo(a) Israelí Testigo (Misrad HaPanim 5.2.0008)",
        piba_family: "👨‍👩‍👧 Familiar / Cuñado / Suegro Testigo (Misrad HaPanim)",
        employer_colleague: "💼 Empleador / Compañero / Vecino Testigo",
        diaspora_transfer: "✈️ Rabino en la Diáspora / Certificado Comunitario"
      },
      actTagLbl: "Tipo de Actividad:",
      actTags: {
        shabbat: "🕯️ Comida de Shabat",
        tefillah: "🕍 Sinagoga / Tefilá",
        volunteer: "🤝 Voluntariado / Jésed",
        shiur: "📖 Clase / Shiur",
        holiday: "🍷 Festividad / Jag",
        couple_visit: "💑 Visita / Salida en Pareja",
        other: "📌 Otro Encuentro"
      },
      placeLbl: "Lugar / Sinagoga / Casa y Ciudad:",
      placePh: "ej. Sinagoga Ari, Tzfat / Casa Familia Cohen, Jerusalén",
      dateLbl: "Fecha:",
      noteLbl: "Momento específico / Qué hicieron juntos:",
      notePh: "ej. Ayudé a organizar el Kidush para 50 personas; cantamos zemirot con Rajel...",
      addLogBtn: "➕ Guardar Evento en Mi Registro",
      savedToast: "✅ ¡Evento guardado y sincronizado!",
      timelineHdr: "📂 Sus Contactos y Eventos Registrados",
      emptyLogs: "Aún no hay eventos registrados. Agregue uno arriba — O pase directo a la Pestaña 2 ('✨ Solicitud y Carta a Medida') aunque no haya anotado fechas antes.",
      eventsCountBadge: "{n} evento(s)",
      draftFromPersonBtn: "✍️ Pedir / Redactar Carta →",
      delEventConfirm: "¿Eliminar este evento registrado?",
      studioPickHdr: "👤 Paso 1: ¿A quién le pedirá la carta de referencia o testimonio?",
      pickExistingOpt: "➕ Nueva Persona (Aún no está en el registro)",
      appNameLbl: "Su Nombre Completo (Solicitante):",
      appNamePh: "ej. Sarah (Ruth) Miller",
      partnerNameLbl: "Nombre de su Pareja (Opcional — recomendado para PIBA):",
      partnerNamePh: "ej. Ya'aqov Einy",
      signerNameLbl: "Nombre Completo del Recomendante / Testigo:",
      signerTitleLbl: "Título / Sinagoga / Relación (Opcional):",
      signerTitlePh: "ej. Rabino de la comunidad / Amigo cercano hace 3 años",
      pibaWitnessHint: "💡 Consejo Misrad HaPanim (Nohal 5.2.0008): Los testigos israelíes deben incluir su n.º de Teudat Zehut (9 dígitos) y teléfono.",
      signerTzLbl: "N.º Teudat Zehut del Testigo (Opcional — PIBA):",
      signerTzPh: "9 dígitos (o dejar en blanco)",
      signerPhoneLbl: "Teléfono del Recomendante (Opcional):",
      signerPhonePh: "ej. 052-123-4567",
      deadlineLbl: "📅 Fecha Límite en que Necesita la Carta Firmada:",
      commLangLbl: "🗣️ Idioma en que Habla con Esta Persona:",
      loggedSummaryBadge: "✅ ¡Importando automáticamente {n} fecha(s) registrada(s) con {name}!",
      interviewHdr: "🧠 Paso 2: Detalles y Recuerdos de la Relación (Cero Plantillas Genéricas)",
      interviewSubZero: "Aunque no haya anotado fechas antes, escriba tantos detalles reales como recuerde:",
      interviewSubHasLogs: "Agregue cualquier contexto personal extra a sus {n} eventos registrados:",
      qHowMetLbl: "1. ¿Cómo y cuándo se conocieron, y con qué frecuencia se ven?",
      qHowMetPh: "ej. Asisto a su sinagoga cada viernes desde hace 10 meses; amigos cercanos en Tzfat desde 2024...",
      qWitnessedLbl: "2. Comidas, voluntariados, fiestas o momentos concretos que presenció:",
      qWitnessedPh: "ej. Nos invitó en Sucot y 6 almuerzos de Shabat, empacamos cajas de Pésaj juntos, visitó nuestra casa...",
      qSpecialLbl: "3. Un toque personal único o nota de tono:",
      qSpecialPh: "ej. Familia muy cálida; o rabino formal y directo...",
      depthThin: "⚠️ Nivel de detalle bajo — ¡agregue 1–2 ejemplos reales arriba para que no suene genérica!",
      depthGood: "🟢 Nivel de detalle excelente — ¡listo para redactar una carta única y auténtica!",
      btnGenOutreach: "💬 1. Generar Mensaje Cortés de Solicitud (WhatsApp / Email)",
      btnGenLetter: "📄 2. Generar Carta Única Lista para Firmar (Hebreo + Traducción)",
      btnGenBoth: "✨ Generar AMBOS: Solicitud Cortés + Borrador de Carta →",
      generatingMsg: "🤖 Redactando texto único basado en su historia compartida...",
      outreachCardHdr: "💬 Paso 3A: Mensaje Cortés para Enviar a {name} (Editable)",
      outreachCardSub: "Indica su fecha límite y ofrece enviar puntos de ayuda O un borrador editable listo para firmar:",
      copyOutreachBtn: "📋 Copiar Solicitud",
      waOutreachBtn: "📲 Abrir en WhatsApp",
      letterCardHdr: "📄 Paso 3B: Carta Única Lista para Editar y Firmar — {name}",
      letterHeLbl: "Carta Oficial en Hebreo (Editable antes de enviar o imprimir):",
      letterTrLbl: "Traducción 1:1 (Para revisión suya y del firmante):",
      copyLetterBtn: "📋 Copiar Hebreo",
      copyBothLetterBtn: "📋 Copiar Hebreo + Traducción",
      waLetterBtn: "📲 Enviar por WhatsApp",
      printPdfBtn: "🖨️ Imprimir / Guardar PDF",
      savedLettersHdr: "🗂️ Cartas Guardadas en Su Expediente ({n})",
      pwUnlockBtn: "🔓 Desbloquear Copia Limpia, Envío WhatsApp y PDF Firmable ($89 / $149) →",
      pwReason: "✍️ Desbloquee copias sin marca de agua, envío por WhatsApp e impresión PDF para todas sus cartas de referencia:",
      copiedToast: "✅ ¡Copiado al portapapeles!",
      errNeedNames: "⚠️ Ingrese primero su nombre y el nombre del recomendante/testigo."
    },
    de: {
      pillLabel: "✍️ Empfehlungen & Logbuch",
      drawerLabel: "✍️ Gemeinde-Logbuch & Empfehlungsschreiben",
      title: "✍️ Ereignis-Logbuch & KI-Studio für Empfehlungs- und Zeugenbriefe",
      subtitle: "Protokollieren Sie Schabbat-Mahlzeiten, Ehrenamt, Unterricht oder Paar-Treffen laufend — ODER beantworten Sie jetzt 3 kurze Fragen — für eine höfliche Anfrage mit Frist und einen 100 % individuellen Brief pro Person.",
      tabLog: "📅 1. Ereignis-Logbuch ({n})",
      tabStudio: "✨ 2. Anfrage & Brief-Studio ({c})",
      logBoxTitle: "➕ Schabbat-Essen, Ehrenamt, Synagoge oder Treffen eintragen",
      logBoxSub: "Dauert jetzt 10 Sekunden — und spart Ihnen später langes Zusammensuchen aller Daten!",
      quickContactsLbl: "Gespeicherte Person schnell wählen:",
      personNameLbl: "Name der Person / Familie:",
      personNamePh: "z.B. Familie Cohen, Rabbiner Jitzchak Levy, Avi Mizrachi...",
      roleLbl: "Rolle / Beziehung zu Ihnen:",
      roles: {
        rabbi: "🕍 Gemeinderabbiner / Synagogenrabbiner (Beit Din)",
        host_family: "🕯️ Schabbat- & Feiertags-Gastfamilie (Beit Din)",
        volunteer_org: "🤝 Ehrenamts- / Chessed-Koordinator / Gabbai",
        teacher_mentor: "📚 Ulpan- / Halacha-Lehrer oder Madrichat Kallah",
        piba_friend: "👥 Israelischer Freund als Zeuge (Misrad HaPanim 5.2.0008)",
        piba_family: "👨‍👩‍👧 Familienmitglied / Schwiegerfamilie (Misrad HaPanim)",
        employer_colleague: "💼 Arbeitgeber / Kollege / Nachbar als Zeuge",
        diaspora_transfer: "✈️ Diaspora-Rabbiner / Gemeindebestätigung"
      },
      actTagLbl: "Art der Aktivität:",
      actTags: {
        shabbat: "🕯️ Schabbat-Mahlzeit",
        tefillah: "🕍 Synagoge / Gebet",
        volunteer: "🤝 Ehrenamt / Chessed",
        shiur: "📖 Schiur / Unterricht",
        holiday: "🍷 Feiertag / Chag",
        couple_visit: "💑 Paar-Besuch / Treffen",
        other: "📌 Sonstiges Treffen"
      },
      placeLbl: "Ort / Synagoge / Haus & Stadt:",
      placePh: "z.B. Ari-Synagoge, Safed / Haus Cohen, Jerusalem",
      dateLbl: "Datum:",
      noteLbl: "Konkretes Detail / Was Sie gemeinsam gemacht haben:",
      notePh: "z.B. Hilfe beim Kiddusch-Aufbau für 50 Gäste; gemeinsames Schabbat-Essen mit Rachel...",
      addLogBtn: "➕ Ereignis im Logbuch speichern",
      savedToast: "✅ Ereignis gespeichert & synchronisiert!",
      timelineHdr: "📂 Ihre protokollierten Kontakte & Ereignisse",
      emptyLogs: "Noch keine Einträge vorhanden! Fügen Sie oben ein Ereignis hinzu — ODER wechseln Sie direkt zu Tab 2 ('✨ Anfrage & Brief-Studio'), auch ohne vorherige Einträge.",
      eventsCountBadge: "{n} Eintrag/Einträge",
      draftFromPersonBtn: "✍️ Anfrage / Brief erstellen →",
      delEventConfirm: "Diesen Eintrag wirklich löschen?",
      studioPickHdr: "👤 Schritt 1: Von wem benötigen Sie das Empfehlungs- oder Zeugenschreiben?",
      pickExistingOpt: "➕ Neue Person (Noch nicht im Logbuch)",
      appNameLbl: "Ihr vollständiger Name (Antragsteller):",
      appNamePh: "z.B. Sarah (Ruth) Miller",
      partnerNameLbl: "Name des Ehepartners / Partners (Optional — für PIBA empfohlen):",
      partnerNamePh: "z.B. Ya'aqov Einy",
      signerNameLbl: "Vollständiger Name des Empfehlungsgebers / Zeugen:",
      signerTitleLbl: "Titel / Synagoge / Beziehung (Optional):",
      signerTitlePh: "z.B. Gemeinderabbiner / Enger Freund seit 3 Jahren",
      pibaWitnessHint: "💡 Misrad-HaPanim-Hinweis (Nohal 5.2.0008): Israelische Zeugen müssen ihre 9-stellige Teudat-Zehut-Nummer und Telefonnummer angeben.",
      signerTzLbl: "Israelische TZ-Nr. des Zeugen (Optional — PIBA):",
      signerTzPh: "9 Ziffern (oder leer lassen)",
      signerPhoneLbl: "Telefonnummer des Unterzeichners (Optional):",
      signerPhonePh: "z.B. 052-123-4567",
      deadlineLbl: "📅 Bis wann benötigen Sie den unterschriebenen Brief?",
      commLangLbl: "🗣️ Sprache, in der Sie mit dieser Person sprechen:",
      loggedSummaryBadge: "✅ {n} protokollierte(s) Ereignis(se) für {name} automatisch übernommen!",
      interviewHdr: "🧠 Schritt 2: Persönliche Details & Erinnerungen (Kein Standard-Text!)",
      interviewSubZero: "Auch ohne vorheriges Logbuch: Geben Sie unten möglichst konkrete Details ein, damit ein echter, individueller Brief entsteht:",
      interviewSubHasLogs: "Ergänzen Sie weitere persönliche Details zu Ihren {n} Logbuch-Einträgen:",
      qHowMetLbl: "1. Wie und wann haben Sie sich kennengelernt & wie oft sehen Sie sich?",
      qHowMetPh: "z.B. Seit 10 Monaten jeden Freitagabend in seiner Synagoge; enge Freunde in Safed seit 2024...",
      qWitnessedLbl: "2. Konkrete Mahlzeiten, Ehrenämter, Feiertage oder Erlebnisse miteinander:",
      qWitnessedPh: "z.B. Zu Sukkot & 6 Schabbat-Essen eingeladen, Pessach-Pakete gepackt, gemeinsame Wohnung besucht...",
      qSpecialLbl: "3. Besondere persönliche Note oder Tonfall:",
      qSpecialPh: "z.B. Herzliche Familie; oder sachlicher, formeller Rabbiner...",
      depthThin: "⚠️ Wenig Details — fügen Sie 1–2 konkrete Beispiele hinzu, damit der Brief authentisch klingt!",
      depthGood: "🟢 Detailtiefe sehr gut — bereit für einen einzigartigen, glaubwürdigen Brief!",
      btnGenOutreach: "💬 1. Höfliche Anfrage-Nachricht erstellen (WhatsApp / E-Mail)",
      btnGenLetter: "📄 2. Individuellen unterschriftsreifen Brief erstellen (Hebräisch + Übersetzung)",
      btnGenBoth: "✨ BEIDES erstellen: Höfliche Anfrage + Briefentwurf →",
      generatingMsg: "🤖 Individueller Text wird aus Ihren Angaben erstellt...",
      outreachCardHdr: "💬 Schritt 3A: Höfliche Anfrage an {name} (Bearbeitbar)",
      outreachCardSub: "Nennt Ihr Wunschdatum und bietet Stichpunkte ODER einen fertigen Entwurf zum Anpassen & Unterschreiben an:",
      copyOutreachBtn: "📋 Anfrage kopieren",
      waOutreachBtn: "📲 In WhatsApp öffnen",
      letterCardHdr: "📄 Schritt 3B: Maßgeschneiderter Brief für {name} (Anti-Kopier-Schutz)",
      letterHeLbl: "Offizieller hebräischer Brief (Vor dem Teilen/Drucken frei bearbeitbar):",
      letterTrLbl: "1:1-Übersetzung (Zur einfachen Prüfung für Sie & den Unterzeichner):",
      copyLetterBtn: "📋 Hebräisch kopieren",
      copyBothLetterBtn: "📋 Hebräisch + Übersetzung kopieren",
      waLetterBtn: "📲 Per WhatsApp senden",
      printPdfBtn: "🖨️ Drucken / Als PDF speichern",
      savedLettersHdr: "🗂️ Gespeicherte Briefe in Ihrer Akte ({n})",
      pwUnlockBtn: "🔓 Sauberes Kopieren, WhatsApp-Versand & PDF-Druck freischalten (89 $ / 149 $) →",
      pwReason: "✍️ Schalten Sie wasserzeichenfreies Kopieren, WhatsApp-Teilen und den PDF-Druck für alle Empfehlungsschreiben frei:",
      copiedToast: "✅ In die Zwischenablage kopiert!",
      errNeedNames: "⚠️ Bitte geben Sie zuerst Ihren Namen und den Namen des Unterzeichners ein."
    },
    ru: {
      pillLabel: "✍️ Рекомендации и дневник",
      drawerLabel: "✍️ Дневник событий и рекомендательные письма",
      title: "✍️ Дневник общины и умный генератор рекомендательных / свидетельских писем",
      subtitle: "Записывайте шаббатние трапезы, волонтёрство, уроки и встречи — ИЛИ ответьте на 3 коротких вопроса сейчас — чтобы ИИ создал вежливую просьбу с датой и 100% уникальное письмо без шаблонов для каждого человека.",
      tabLog: "📅 1. Дневник событий ({n})",
      tabStudio: "✨ 2. Запрос и письмо ({c})",
      logBoxTitle: "➕ Записать шаббатний ужин, волонтёрство, молитву или встречу",
      logBoxSub: "Занимает 10 секунд сейчас — и избавляет от мучительного вспоминания дат перед подачей в МВД или Бейт-Дин!",
      quickContactsLbl: "Быстрый выбор сохранённого контакта:",
      personNameLbl: "Имя человека / семьи:",
      personNamePh: "напр. Семья Коэн, раввин Ицхак Леви, Ави Мизрахи...",
      roleLbl: "Роль / кем приходится вам:",
      roles: {
        rabbi: "🕍 Раввин общины / синагоги (для Бейт-Дина)",
        host_family: "🕯️ Принимающая шаббатняя семья (для Бейт-Дина)",
        volunteer_org: "🤝 Координатор волонтёрства / хеседа / габай",
        teacher_mentor: "📚 Преподаватель ульпана / Галахи / мадрихат калла",
        piba_friend: "👥 Друг-израильтянин — свидетель отношений (МВД 5.2.0008)",
        piba_family: "👨‍👩‍👧 Родственник супруга(и) — свидетель (МВД)",
        employer_colleague: "💼 Работодатель / коллега / сосед",
        diaspora_transfer: "✈️ Раввин общины в диаспоре / перевод дела"
      },
      actTagLbl: "Тип события:",
      actTags: {
        shabbat: "🕯️ Трапеза Шаббата",
        tefillah: "🕍 Синагога / молитва",
        volunteer: "🤝 Волонтёрство / хесед",
        shiur: "📖 Урок Торы / шиур",
        holiday: "🍷 Праздник / Хаг",
        couple_visit: "💑 Совместный визит / встреча",
        other: "📌 Другое событие"
      },
      placeLbl: "Место / синагога / дом и город:",
      placePh: "напр. Синагога Ари, Цфат / дом семьи Коэн, Иерусалим",
      dateLbl: "Дата:",
      noteLbl: "Детали события / что вы делали вместе:",
      notePh: "напр. Помогал накрывать кидуш на 50 человек; пели змирот за шаббатним столом с Рахель...",
      addLogBtn: "➕ Сохранить событие в дневник",
      savedToast: "✅ Событие сохранено и синхронизировано!",
      timelineHdr: "📂 Ваши записанные контакты и история встреч",
      emptyLogs: "Пока нет записанных событий! Добавьте первую встречу выше — ИЛИ сразу перейдите на вкладку 2 ('✨ Запрос и письмо'), даже если вы не вели дневник заранее.",
      eventsCountBadge: "Событий: {n}",
      draftFromPersonBtn: "✍️ Запросить / составить письмо →",
      delEventConfirm: "Удалить эту запись из дневника?",
      studioPickHdr: "👤 Шаг 1: У кого вы просите рекомендательное или свидетельское письмо?",
      pickExistingOpt: "➕ Новый человек (ещё нет в дневнике)",
      appNameLbl: "Ваше полное имя (заявитель):",
      appNamePh: "напр. Sarah (Ruth) Miller",
      partnerNameLbl: "Имя супруга / партнёра (необязательно — важно для МВД):",
      partnerNamePh: "напр. Ya'aqov Einy",
      signerNameLbl: "Полное имя рекомендателя / свидетеля:",
      signerTitleLbl: "Должность / община / кем приходится (необязательно):",
      signerTitlePh: "напр. Раввин общины / близкий друг семьи 3 года",
      pibaWitnessHint: "💡 Правило МВД (Нохал 5.2.0008): Свидетели-израильтяне должны указать 9 цифр Теудат-Зеута, телефон и приложить фото ТЗ.",
      signerTzLbl: "Номер Теудат-Зеута свидетеля (для МВД):",
      signerTzPh: "9 цифр (или оставьте пустым)",
      signerPhoneLbl: "Телефон рекомендателя (необязательно):",
      signerPhonePh: "напр. 052-123-4567",
      deadlineLbl: "📅 К какой дате вам нужно подписанное письмо?",
      commLangLbl: "🗣️ На каком языке вы общаетесь с этим человеком?",
      loggedSummaryBadge: "✅ Автоматически подключено событий для {name}: {n}!",
      interviewHdr: "🧠 Шаг 2: Живые детали знакомства (защита от шаблонных писем)",
      interviewSubZero: "Даже если вы не вели дневник дат, напишите ниже как можно больше реальных фактов — ИИ вплетёт их в живое индивидуальное письмо:",
      interviewSubHasLogs: "Добавьте любые личные штрихи к вашим записанным событиям ({n}):",
      qHowMetLbl: "1. Как и когда вы познакомились и как часто общаетесь?",
      qHowMetPh: "напр. Молюсь в его синагоге каждую пятницу уже 10 месяцев; дружим семьями в Цфате с 2024 года...",
      qWitnessedLbl: "2. Конкретные трапезы, волонтёрство, праздники или моменты, которые человек видел лично:",
      qWitnessedPh: "напр. Принимали нас на Суккот и 6 шаббатних обедов, вместе собирали наборы на Песах, бывали у нас дома...",
      qSpecialLbl: "3. Особая деталь или стиль общения этого человека:",
      qSpecialPh: "напр. Тёплая многодетная семья; или лаконичный официальный раввин...",
      depthThin: "⚠️ Мало деталей — добавьте 1–2 конкретных примера выше, чтобы письмо не звучало общо!",
      depthGood: "🟢 Отличная детализация — всё готово для создания уникального письма!",
      btnGenOutreach: "💬 1. Создать вежливую просьбу о письме (WhatsApp / Email)",
      btnGenLetter: "📄 2. Создать уникальное готовое письмо (Иврит + Перевод)",
      btnGenBoth: "✨ Создать ОБА текста: Вежливую просьбу + Черновик письма →",
      generatingMsg: "🤖 Создаём индивидуальный текст по вашей реальной истории...",
      outreachCardHdr: "💬 Шаг 3А: Вежливое сообщение для {name} (можно редактировать)",
      outreachCardSub: "Указывает нужную дату и предлагает прислать тезисы ИЛИ готовый черновик на проверку и подпись:",
      copyOutreachBtn: "📋 Копировать просьбу",
      waOutreachBtn: "📲 Открыть в WhatsApp",
      letterCardHdr: "📄 Шаг 3Б: Индивидуальное письмо от имени {name} (без копипаста)",
      letterHeLbl: "Официальный текст на иврите (можно свободно редактировать перед отправкой/печатью):",
      letterTrLbl: "Точный перевод 1:1 (для проверки вами и подписантом):",
      copyLetterBtn: "📋 Копировать иврит",
      copyBothLetterBtn: "📋 Копировать иврит + перевод",
      waLetterBtn: "📲 Отправить в WhatsApp",
      printPdfBtn: "🖨️ Печать / Сохранить PDF",
      savedLettersHdr: "🗂️ Сохранённые письма в вашем досье ({n})",
      pwUnlockBtn: "🔓 Открыть чистое копирование, отправку в WhatsApp и печать PDF ($89 / $149) →",
      pwReason: "✍️ Откройте чистое копирование без водяных знаков, отправку в WhatsApp и печать PDF для всех рекомендательных и свидетельских писем:",
      copiedToast: "✅ Скопировано в буфер обмена!",
      errNeedNames: "⚠️ Сначала укажите ваше имя и имя рекомендателя / свидетеля."
    }
  };

  function getLang() {
    var raw = String(window.appLang || localStorage.getItem("gat_lang") || document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    return VALID_LANGS.indexOf(raw) !== -1 ? raw : "en";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normKey(name) {
    return String(name || "").trim().toLowerCase().replace(/\s+/g, " ").slice(0, 80);
  }

  function getApiUrl() {
    return (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
      ? "https://giyuraliyahtrack.com/api/auditDoc"
      : "/api/auditDoc";
  }

  // Can unlock Reference Letters if user has Forms ($89/$149), Couples ($75/$129/$229), Beit Din Suite ($149/$249), or Full Solo/VIP Suite!
  window.canUnlockReferenceLetters = function() {
    try {
      if (sessionStorage.getItem("gat_simulate_guest_paywall") === "1") return false;
      if (typeof window.hasFormsEngineAccess === "function" && window.hasFormsEngineAccess()) return true;
      if (typeof window.canUnlockCouples === "function" && window.canUnlockCouples()) return true;
      var entMap = {};
      try {
        entMap = Object.assign(
          {},
          JSON.parse(localStorage.getItem("gat_entitlements_v2") || "{}") || {},
          JSON.parse(localStorage.getItem("gat_entitlements_map") || "{}") || {}
        );
      } catch (e) {}
      var now = Date.now();
      var ALLOWED = [
        "admin", "vip_couple_649", "suite_solo_life_399", "suite_solo_90d_249",
        "forms_life_149", "forms_90d_89", "couples_life_229", "couples_90d_129", "couples_sync_75",
        "bd_suite_life_249", "bd_suite_90d_149"
      ];
      for (var i = 0; i < ALLOWED.length; i++) {
        var e = entMap[ALLOWED[i]];
        if (e === true || (e && typeof e === "object" && (!e.exp || e.exp > now))) return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  function loadStore() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
      return {
        events: Array.isArray(raw.events) ? raw.events : [],
        contacts: (raw.contacts && typeof raw.contacts === "object") ? raw.contacts : {},
        drafts: (raw.drafts && typeof raw.drafts === "object") ? raw.drafts : {},
        updatedAtMs: Number(raw.updatedAtMs || 0)
      };
    } catch (e) {
      return { events: [], contacts: {}, drafts: {}, updatedAtMs: 0 };
    }
  }

  var _cloudSaveTmr = null;
  function saveStore(st, syncCloud) {
    st.updatedAtMs = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    } catch (e) {}
    if (syncCloud !== false) {
      if (_cloudSaveTmr) clearTimeout(_cloudSaveTmr);
      _cloudSaveTmr = setTimeout(function() { pushStoreToCloud(st); }, 650);
    }
  }

  async function pushStoreToCloud(st) {
    var uid = window.gatUid || localStorage.getItem("gat_uid") || "";
    var waPh = localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
    var devTok = localStorage.getItem("gat_device_auth_tok") || "";
    if ((!uid || uid === "anon") && !waPh && !devTok) return;
    try {
      await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "sync_ref_logger",
          subAction: "save",
          uid: uid,
          waPhone: waPh,
          deviceAuthToken: devTok,
          referenceLogger: st
        })
      });
    } catch (e) {}
  }

  async function pullStoreFromCloudOnce() {
    var uid = window.gatUid || localStorage.getItem("gat_uid") || "";
    var waPh = localStorage.getItem("gat_verified_wa_phone") || localStorage.getItem("gat_wa_phone") || "";
    var devTok = localStorage.getItem("gat_device_auth_tok") || "";
    if ((!uid || uid === "anon") && !waPh && !devTok) return;
    try {
      var res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "sync_ref_logger",
          subAction: "load",
          uid: uid,
          waPhone: waPh,
          deviceAuthToken: devTok
        })
      });
      var d = await res.json();
      if (d && d.ok && d.referenceLogger) {
        var loc = loadStore();
        var rem = d.referenceLogger;
        if (Number(rem.updatedAtMs || 0) > Number(loc.updatedAtMs || 0)) {
          saveStore({
            events: Array.isArray(rem.events) ? rem.events : loc.events,
            contacts: Object.assign({}, loc.contacts, rem.contacts || {}),
            drafts: Object.assign({}, loc.drafts, rem.drafts || {}),
            updatedAtMs: rem.updatedAtMs
          }, false);
          if (document.getElementById("gat-ref-studio-root")) {
            window.mountReferenceLettersStudio();
          }
        }
      }
    } catch (e) {}
  }

  // UI Runtime State
  var uiState = {
    subTab: "log", // "log" | "studio"
    selectedContactKey: "__new__",
    applicantName: "",
    partnerName: "",
    signerName: "",
    roleKey: "rabbi",
    signerTitle: "",
    venueCity: "",
    signerTz: "",
    signerPhone: "",
    deadlineIso: "",
    commLang: "",
    howMet: "",
    witnessedDetails: "",
    specialTouch: "",
    logPerson: "",
    logRole: "rabbi",
    logTag: "shabbat",
    logPlace: "",
    logDate: new Date().toISOString().slice(0, 10),
    logNote: ""
  };

  function prefillApplicantFromFormsIfEmpty() {
    try {
      var f = window.gatFormsState || JSON.parse(localStorage.getItem("gat_form_draft_v1") || "{}") || {};
      if (!uiState.applicantName) {
        var fullEn = [f.pf_given_en, f.pf_surname_en].filter(Boolean).join(" ").trim();
        var fullHe = [f.pf_given_he, f.pf_surname_he].filter(Boolean).join(" ").trim();
        uiState.applicantName = fullEn || fullHe || "";
      }
      if (!uiState.partnerName) {
        var spHe = f.pf_sp_name_he || [f.pf_sp_given_he, f.pf_sp_surname_he].filter(Boolean).join(" ").trim();
        var spEn = [f.pf_sp_given_en, f.pf_sp_surname_en].filter(Boolean).join(" ").trim();
        uiState.partnerName = spEn || spHe || "";
      }
    } catch (e) {}
    if (!uiState.deadlineIso) {
      var dt = new Date(Date.now() + 14 * 86400000);
      uiState.deadlineIso = dt.toISOString().slice(0, 10);
    }
    if (!uiState.commLang) {
      uiState.commLang = getLang();
    }
  }

  function getGroupedContacts(st) {
    var groups = {};
    Object.keys(st.contacts || {}).forEach(function(k) {
      var c = st.contacts[k];
      if (!c || !c.name) return;
      groups[k] = Object.assign({ key: k, events: [] }, c);
    });
    (st.events || []).forEach(function(ev) {
      if (!ev || !ev.contactName) return;
      var k = normKey(ev.contactName);
      if (!groups[k]) {
        groups[k] = {
          key: k,
          name: ev.contactName,
          roleKey: ev.roleKey || "rabbi",
          venueCity: ev.place || "",
          events: []
        };
      }
      groups[k].events.push(ev);
      if (!groups[k].venueCity && ev.place) groups[k].venueCity = ev.place;
    });
    Object.keys(groups).forEach(function(k) {
      groups[k].events.sort(function(a, b) {
        return String(b.dateIso || "").localeCompare(String(a.dateIso || ""));
      });
    });
    return groups;
  }

  function showToast(msg) {
    if (typeof window.showCpToast === "function") {
      window.showCpToast(msg, true);
      return;
    }
    var t = document.createElement("div");
    t.style.cssText = "position:fixed;bottom:84px;left:50%;transform:translateX(-50%);background:#065f46;color:#fff;padding:10px 18px;border-radius:999px;font-size:0.84rem;font-weight:900;z-index:2147483647;box-shadow:0 10px 25px rgba(0,0,0,0.3);";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { if (t.parentNode) t.remove(); }, 2200);
  }

  function updateGlobalNavLabels() {
    var l = getLang();
    var t = I18N[l] || I18N.en;
    var pill = document.querySelector('.mod-tab[data-mod="rabbi-letters"]');
    if (pill) pill.textContent = t.pillLabel;
    var ldBtn = document.querySelector('.gat-ld-item[data-ld-key="rabbi"]');
    if (ldBtn) ldBtn.textContent = t.drawerLabel;
  }

  function loadContactIntoStudioState(k) {
    var st = loadStore();
    var groups = getGroupedContacts(st);
    uiState.selectedContactKey = k;
    if (k && k !== "__new__" && groups[k]) {
      var g = groups[k];
      uiState.signerName = g.name || "";
      uiState.roleKey = g.roleKey || "rabbi";
      uiState.signerTitle = g.signerTitle || "";
      uiState.venueCity = g.venueCity || "";
      uiState.signerTz = g.signerTz || "";
      uiState.signerPhone = g.signerPhone || "";
      uiState.deadlineIso = g.deadlineIso || uiState.deadlineIso;
      uiState.commLang = g.commLang || getLang();
      uiState.howMet = g.howMet || "";
      uiState.witnessedDetails = g.witnessedDetails || "";
      uiState.specialTouch = g.specialTouch || "";
    } else {
      uiState.selectedContactKey = "__new__";
      uiState.signerName = "";
      uiState.signerTitle = "";
      uiState.venueCity = "";
      uiState.signerTz = "";
      uiState.signerPhone = "";
      uiState.howMet = "";
      uiState.witnessedDetails = "";
      uiState.specialTouch = "";
    }
  }

  function syncDomInputsToUiState() {
    var mapIds = {
      "rf-log-person": "logPerson",
      "rf-log-role": "logRole",
      "rf-log-tag": "logTag",
      "rf-log-place": "logPlace",
      "rf-log-date": "logDate",
      "rf-log-note": "logNote",
      "rf-app-name": "applicantName",
      "rf-partner-name": "partnerName",
      "rf-signer-name": "signerName",
      "rf-signer-role": "roleKey",
      "rf-signer-title": "signerTitle",
      "rf-venue-city": "venueCity",
      "rf-signer-tz": "signerTz",
      "rf-signer-phone": "signerPhone",
      "rf-deadline": "deadlineIso",
      "rf-comm-lang": "commLang",
      "rf-q-howmet": "howMet",
      "rf-q-witnessed": "witnessedDetails",
      "rf-q-special": "specialTouch"
    };
    Object.keys(mapIds).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) uiState[mapIds[id]] = el.value;
    });
  }

  function persistCurrentContactProfile() {
    syncDomInputsToUiState();
    var k = normKey(uiState.signerName);
    if (!k) return "";
    var st = loadStore();
    st.contacts[k] = Object.assign({}, st.contacts[k] || {}, {
      name: uiState.signerName.trim(),
      roleKey: uiState.roleKey,
      signerTitle: uiState.signerTitle.trim(),
      venueCity: uiState.venueCity.trim(),
      signerTz: uiState.signerTz.trim(),
      signerPhone: uiState.signerPhone.trim(),
      deadlineIso: uiState.deadlineIso,
      commLang: uiState.commLang,
      howMet: uiState.howMet.trim(),
      witnessedDetails: uiState.witnessedDetails.trim(),
      specialTouch: uiState.specialTouch.trim()
    });
    uiState.selectedContactKey = k;
    saveStore(st, true);
    return k;
  }

  window.gatRefSwitchSubTab = function(tabName) {
    syncDomInputsToUiState();
    uiState.subTab = (tabName === "studio") ? "studio" : "log";
    window.mountReferenceLettersStudio();
  };

  window.gatRefQuickFillPerson = function(name) {
    syncDomInputsToUiState();
    var st = loadStore();
    var groups = getGroupedContacts(st);
    var k = normKey(name);
    uiState.logPerson = name;
    if (groups[k]) {
      uiState.logRole = groups[k].roleKey || uiState.logRole;
      if (groups[k].venueCity) uiState.logPlace = groups[k].venueCity;
    }
    window.mountReferenceLettersStudio();
  };

  window.gatRefAddEventLog = function() {
    syncDomInputsToUiState();
    var l = getLang();
    var t = I18N[l] || I18N.en;
    var person = String(uiState.logPerson || "").trim();
    if (!person) {
      var pInp = document.getElementById("rf-log-person");
      if (pInp) pInp.focus();
      return;
    }
    var st = loadStore();
    var k = normKey(person);
    var newEv = {
      id: "ev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      contactName: person,
      roleKey: uiState.logRole || "rabbi",
      activityTag: uiState.logTag || "shabbat",
      place: String(uiState.logPlace || "").trim(),
      dateIso: uiState.logDate || new Date().toISOString().slice(0, 10),
      notes: String(uiState.logNote || "").trim(),
      createdAt: Date.now()
    };
    st.events.unshift(newEv);
    st.contacts[k] = Object.assign({}, st.contacts[k] || {}, {
      name: person,
      roleKey: newEv.roleKey,
      venueCity: newEv.place || ((st.contacts[k] && st.contacts[k].venueCity) || "")
    });
    saveStore(st, true);
    uiState.logNote = "";
    showToast(t.savedToast);
    window.mountReferenceLettersStudio();
  };

  window.gatRefDeleteEvent = function(evId) {
    var l = getLang();
    var t = I18N[l] || I18N.en;
    if (!window.confirm(t.delEventConfirm)) return;
    syncDomInputsToUiState();
    var st = loadStore();
    st.events = (st.events || []).filter(function(x) { return x && x.id !== evId; });
    saveStore(st, true);
    window.mountReferenceLettersStudio();
  };

  window.gatRefOpenPersonInStudio = function(contactKey) {
    syncDomInputsToUiState();
    loadContactIntoStudioState(contactKey);
    uiState.subTab = "studio";
    window.mountReferenceLettersStudio();
    var root = document.getElementById("gat-ref-studio-root");
    if (root && root.scrollIntoView) {
      try { root.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    }
  };

  window.gatRefOnPickStudioContact = function(selVal) {
    syncDomInputsToUiState();
    loadContactIntoStudioState(selVal);
    window.mountReferenceLettersStudio();
  };

  window.gatRefUpdateLiveDraftEdit = function(contactKey, field, val) {
    if (!contactKey) return;
    var st = loadStore();
    if (!st.drafts[contactKey]) st.drafts[contactKey] = {};
    st.drafts[contactKey][field] = val;
    st.drafts[contactKey].updatedAt = Date.now();
    saveStore(st, true);
  };

  window.gatRefGenerateAi = async function(actionType) {
    syncDomInputsToUiState();
    var l = getLang();
    var t = I18N[l] || I18N.en;
    if (!String(uiState.applicantName || "").trim() || !String(uiState.signerName || "").trim()) {
      alert(t.errNeedNames);
      return;
    }
    var contactKey = persistCurrentContactProfile();
    var st = loadStore();
    var groups = getGroupedContacts(st);
    var personEvents = (groups[contactKey] && groups[contactKey].events) ? groups[contactKey].events : [];

    var activityLogs = personEvents.map(function(ev) {
      return {
        dateIso: ev.dateIso || "",
        activityLabel: (t.actTags && t.actTags[ev.activityTag]) || ev.activityTag || "",
        place: ev.place || "",
        notes: ev.notes || ""
      };
    });

    // Build Anti-Clone summaries of OTHER people's letters so every letter has a distinct authorial voice!
    var previousLettersSummary = [];
    Object.keys(st.drafts || {}).forEach(function(dk) {
      if (dk === contactKey) return;
      var dr = st.drafts[dk];
      var cInfo = st.contacts[dk] || {};
      if (dr && dr.letterHe) {
        previousLettersSummary.push({
          signer: cInfo.name || dk,
          role: cInfo.roleKey || "",
          opening: String(dr.letterHe).replace(/\s+/g, " ").slice(0, 140)
        });
      }
    });

    var statusBanner = document.getElementById("rf-ai-gen-status");
    if (statusBanner) {
      statusBanner.style.display = "block";
      statusBanner.innerHTML = '<div style="background:#f0f9ff;border:2px solid #0284c7;color:#0369a1;padding:12px 14px;border-radius:12px;font-size:0.85rem;font-weight:900;text-align:center;">' + esc(t.generatingMsg) + '</div>';
    }

    try {
      var res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "generate_smart_ref_package",
          action: actionType || "both",
          uiLang: l,
          commLang: uiState.commLang || l,
          applicantName: uiState.applicantName.trim(),
          partnerName: uiState.partnerName.trim(),
          signerName: uiState.signerName.trim(),
          roleKey: uiState.roleKey,
          signerTitle: uiState.signerTitle.trim(),
          venueCity: uiState.venueCity.trim(),
          signerTz: uiState.signerTz.trim(),
          signerPhone: uiState.signerPhone.trim(),
          deadlineIso: uiState.deadlineIso,
          howMet: uiState.howMet.trim(),
          witnessedDetails: uiState.witnessedDetails.trim(),
          specialTouch: uiState.specialTouch.trim(),
          activityLogs: activityLogs,
          previousLettersSummary: previousLettersSummary
        })
      });
      var data = await res.json();
      if (!res.ok || !data || !data.ok) {
        throw new Error((data && data.error) || "Generation failed");
      }

      var curDraft = Object.assign({}, st.drafts[contactKey] || {});
      if (data.outreachMessage) curDraft.outreachText = data.outreachMessage;
      if (data.letterHe) curDraft.letterHe = data.letterHe;
      if (data.letterTranslation) curDraft.letterTrans = data.letterTranslation;
      if (data.coachTip) curDraft.coachTip = data.coachTip;
      curDraft.commLang = uiState.commLang || l;
      curDraft.updatedAt = Date.now();

      st.drafts[contactKey] = curDraft;
      saveStore(st, true);
      window.mountReferenceLettersStudio();

      setTimeout(function() {
        var outSec = document.getElementById("rf-generated-results-anchor");
        if (outSec && outSec.scrollIntoView) {
          try { outSec.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
        }
      }, 80);
    } catch (err) {
      if (statusBanner) {
        statusBanner.style.display = "block";
        statusBanner.innerHTML = '<div style="background:#fef2f2;border:2px solid #dc2626;color:#991b1b;padding:12px 14px;border-radius:12px;font-size:0.84rem;font-weight:800;">⚠️ ' + esc(err.message || err) + '</div>';
      }
    }
  };

  function requireUnlockOrPaywall() {
    if (window.canUnlockReferenceLetters()) return true;
    var l = getLang();
    var t = I18N[l] || I18N.en;
    if (typeof window.openProPaywall === "function") {
      window.openProPaywall(t.pwReason, "forms");
    }
    return false;
  }

  window.gatRefCopyText = function(kind, contactKey) {
    if (kind !== "outreach" && !requireUnlockOrPaywall()) return;
    var l = getLang();
    var t = I18N[l] || I18N.en;
    var st = loadStore();
    var dr = (st.drafts || {})[contactKey] || {};
    var txt = "";
    if (kind === "outreach") txt = dr.outreachText || "";
    else if (kind === "he") txt = dr.letterHe || "";
    else txt = [dr.letterHe || "", dr.letterTrans ? ("\n\n---\n" + dr.letterTrans) : ""].join("");
    if (!txt) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt);
    }
    showToast(t.copiedToast);
  };

  window.gatRefShareWhatsApp = function(kind, contactKey) {
    if (kind !== "outreach" && !requireUnlockOrPaywall()) return;
    var st = loadStore();
    var dr = (st.drafts || {})[contactKey] || {};
    var c = (st.contacts || {})[contactKey] || {};
    var txt = kind === "outreach"
      ? (dr.outreachText || "")
      : ([dr.letterHe || "", dr.letterTrans ? ("\n\n---\n" + dr.letterTrans) : ""].join(""));
    if (!txt) return;
    var phDigits = String(c.signerPhone || "").replace(/\D/g, "");
    if (phDigits.indexOf("05") === 0 && phDigits.length === 10) phDigits = "972" + phDigits.slice(1);
    var waUrl = phDigits.length >= 9
      ? ("https://wa.me/" + phDigits + "?text=" + encodeURIComponent(txt))
      : ("https://wa.me/?text=" + encodeURIComponent(txt));
    window.open(waUrl, "_blank");
  };

  window.gatRefPrintLetterPdf = function(contactKey) {
    if (!requireUnlockOrPaywall()) return;
    var st = loadStore();
    var dr = (st.drafts || {})[contactKey] || {};
    var c = (st.contacts || {})[contactKey] || {};
    if (!dr.letterHe) return;
    var w = window.open("", "_blank");
    if (!w) return;
    var safeHe = esc(dr.letterHe).replace(/\n/g, "<br>");
    var safeTr = dr.letterTrans ? esc(dr.letterTrans).replace(/\n/g, "<br>") : "";
    var isRtlTr = (dr.commLang === "he");
    w.document.write(
      '<!doctype html><html lang="he"><head><meta charset="utf-8"><title>Reference Letter — ' + esc(c.name || "") + '</title>' +
      '<style>' +
        'body{font-family:"David Libre","Frank Ruhl Libre","Times New Roman",Arial,sans-serif;color:#0f172a;margin:0;padding:28px;background:#f8fafc;}' +
        '.sheet{max-width:760px;margin:0 auto;background:#fff;padding:44px 48px;border:1px solid #cbd5e1;border-radius:12px;}' +
        '.heb{direction:rtl;text-align:right;font-size:1.08rem;line-height:1.78;}' +
        '.tr{margin-top:32px;padding-top:22px;border-top:2px dashed #cbd5e1;font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;font-size:0.92rem;line-height:1.6;color:#334155;}' +
        '.no-print{max-width:760px;margin:0 auto 14px;display:flex;gap:10px;justify-content:flex-end;}' +
        '@media print{body{background:#fff;padding:0;}.sheet{border:none;padding:18mm 16mm;}.no-print{display:none!important;}.hide-tr-print .tr{display:none!important;}}' +
      '</style></head><body>' +
      '<div class="no-print">' +
        '<label style="display:inline-flex;align-items:center;gap:6px;font-family:sans-serif;font-size:0.84rem;font-weight:700;cursor:pointer;">' +
          '<input type="checkbox" checked onchange="document.body.classList.toggle(\'hide-tr-print\', !this.checked)" /> Include Translation Below Divider' +
        '</label>' +
        '<button onclick="window.print()" style="background:#0284c7;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-weight:900;cursor:pointer;">🖨️ Print / Save PDF</button>' +
      '</div>' +
      '<div class="sheet">' +
        '<div class="heb">' + safeHe + '</div>' +
        (safeTr ? ('<div class="tr" dir="' + (isRtlTr ? 'rtl' : 'ltr') + '">' + safeTr + '</div>') : '') +
      '</div>' +
      '</body></html>'
    );
    w.document.close();
  };

  window.mountReferenceLettersStudio = function() {
    updateGlobalNavLabels();
    var modBox = document.getElementById("mod-rabbi-letters");
    if (!modBox) return;

    prefillApplicantFromFormsIfEmpty();
    var l = getLang();
    var t = I18N[l] || I18N.en;
    var isRtl = (l === "he");
    var st = loadStore();
    var groups = getGroupedContacts(st);
    var groupKeys = Object.keys(groups);
    var savedDraftKeys = Object.keys(st.drafts || {}).filter(function(k) {
      return st.drafts[k] && (st.drafts[k].letterHe || st.drafts[k].outreachText);
    });

    if (uiState.selectedContactKey !== "__new__" && !groups[uiState.selectedContactKey] && groupKeys.length > 0) {
      loadContactIntoStudioState(groupKeys[0]);
    }

    var roleOptsLog = Object.keys(t.roles).map(function(rk) {
      return '<option value="' + rk + '"' + (uiState.logRole === rk ? ' selected' : '') + '>' + esc(t.roles[rk]) + '</option>';
    }).join("");

    var actTagOpts = Object.keys(t.actTags).map(function(ak) {
      return '<option value="' + ak + '"' + (uiState.logTag === ak ? ' selected' : '') + '>' + esc(t.actTags[ak]) + '</option>';
    }).join("");

    var quickChipsHtml = "";
    if (groupKeys.length > 0) {
      quickChipsHtml =
        '<div style="margin-bottom:10px;">' +
          '<div style="font-size:0.75rem;font-weight:800;color:#475569;margin-bottom:5px;">' + esc(t.quickContactsLbl) + '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
            groupKeys.map(function(gk) {
              var g = groups[gk];
              var safeJsName = String(g.name || "").replace(/\\/g, "\\\\").replace(/'/g, "\\'");
              return '<button type="button" onclick="window.gatRefQuickFillPerson(\'' + safeJsName + '\')" style="background:#e0f2fe;color:#0369a1;border:1.5px solid #7dd3fc;border-radius:999px;padding:4px 11px;font-size:0.76rem;font-weight:800;cursor:pointer;">👤 ' + esc(g.name) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';
    }

    // Build Grouped Timeline Cards for Tab 1
    var timelineCardsHtml = "";
    if (groupKeys.length === 0) {
      timelineCardsHtml =
        '<div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:14px;padding:18px;text-align:center;color:#475569;font-size:0.84rem;font-weight:700;line-height:1.5;">' +
          esc(t.emptyLogs) +
        '</div>';
    } else {
      timelineCardsHtml = groupKeys.map(function(gk) {
        var g = groups[gk];
        var safeKey = String(gk).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        var roleLabel = (t.roles && t.roles[g.roleKey]) || g.roleKey;
        var evRows = (g.events || []).map(function(ev) {
          var tagLbl = (t.actTags && t.actTags[ev.activityTag]) || ev.activityTag || "";
          var safeEvId = String(ev.id || "").replace(/'/g, "\\'");
          return '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:8px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;margin-top:6px;font-size:0.8rem;">' +
            '<div>' +
              '<span style="font-weight:900;color:#0f172a;">' + esc(ev.dateIso || "") + '</span> • ' +
              '<span style="font-weight:800;color:#0369a1;">' + esc(tagLbl) + '</span>' +
              (ev.place ? (' <span style="color:#475569;font-weight:700;">@ ' + esc(ev.place) + '</span>') : '') +
              (ev.notes ? ('<div style="color:#334155;margin-top:2px;line-height:1.4;">' + esc(ev.notes) + '</div>') : '') +
            '</div>' +
            '<button type="button" onclick="window.gatRefDeleteEvent(\'' + safeEvId + '\')" style="background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:6px;padding:2px 7px;font-size:0.74rem;font-weight:900;cursor:pointer;flex-shrink:0;">✕</button>' +
          '</div>';
        }).join("");

        return '<div style="background:#ffffff;border:2px solid #cbd5e1;border-radius:14px;padding:14px;margin-bottom:10px;box-shadow:0 3px 10px rgba(8,37,72,0.04);">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">' +
            '<div>' +
              '<div style="font-size:0.95rem;font-weight:900;color:#082548;">👤 ' + esc(g.name) + ' <span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:999px;font-size:0.72rem;">' + esc(t.eventsCountBadge.replace("{n}", String((g.events || []).length))) + '</span></div>' +
              '<div style="font-size:0.76rem;color:#475569;font-weight:700;margin-top:2px;">' + esc(roleLabel) + (g.venueCity ? (' • 📍 ' + esc(g.venueCity)) : '') + '</div>' +
            '</div>' +
            '<button type="button" onclick="window.gatRefOpenPersonInStudio(\'' + safeKey + '\')" style="background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;border:none;border-radius:10px;padding:9px 14px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(t.draftFromPersonBtn) + '</button>' +
          '</div>' +
          evRows +
        '</div>';
      }).join("");
    }

    // Studio Tab HTML
    var activeKey = normKey(uiState.signerName) || (uiState.selectedContactKey !== "__new__" ? uiState.selectedContactKey : "");
    var activeGroup = activeKey && groups[activeKey] ? groups[activeKey] : null;
    var activeLoggedCount = activeGroup && activeGroup.events ? activeGroup.events.length : 0;
    var activeDraft = activeKey && st.drafts && st.drafts[activeKey] ? st.drafts[activeKey] : null;
    var isPibaRole = (uiState.roleKey === "piba_friend" || uiState.roleKey === "piba_family" || uiState.roleKey === "employer_colleague");
    var unlocked = window.canUnlockReferenceLetters();

    var totalDetailChars = (String(uiState.howMet || "") + String(uiState.witnessedDetails || "") + String(uiState.specialTouch || "")).trim().length;
    var hasRichContext = (activeLoggedCount >= 2) || (activeLoggedCount >= 1 && totalDetailChars >= 25) || (totalDetailChars >= 55);

    var studioContactOpts = '<option value="__new__"' + (uiState.selectedContactKey === "__new__" ? ' selected' : '') + '>' + esc(t.pickExistingOpt) + '</option>' +
      groupKeys.map(function(gk) {
        var g = groups[gk];
        var cnt = (g.events || []).length;
        return '<option value="' + esc(gk) + '"' + (uiState.selectedContactKey === gk ? ' selected' : '') + '>👤 ' + esc(g.name) + ' (' + cnt + ')</option>';
      }).join("");

    var roleOptsStudio = Object.keys(t.roles).map(function(rk) {
      return '<option value="' + rk + '"' + (uiState.roleKey === rk ? ' selected' : '') + '>' + esc(t.roles[rk]) + '</option>';
    }).join("");

    var commLangOpts = [
      ["he", "🇮🇱 עברית (Hebrew)"],
      ["en", "🇺🇸 English"],
      ["fr", "🇫🇷 Français"],
      ["es", "🇪🇸 Español"],
      ["de", "🇩🇪 Deutsch"],
      ["ru", "🇷🇺 Русский"]
    ].map(function(pair) {
      return '<option value="' + pair[0] + '"' + ((uiState.commLang || l) === pair[0] ? ' selected' : '') + '>' + pair[1] + '</option>';
    }).join("");

    var resultsHtml = "";
    if (activeDraft && (activeDraft.outreachText || activeDraft.letterHe)) {
      var safeActKey = String(activeKey).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
      var whoDisp = uiState.signerName || (activeGroup && activeGroup.name) || "";

      if (activeDraft.coachTip) {
        resultsHtml += '<div style="background:#eff6ff;border:1.5px solid #60a5fa;color:#1e3a8a;border-radius:11px;padding:10px 13px;margin-top:12px;font-size:0.8rem;font-weight:800;">💡 ' + esc(activeDraft.coachTip) + '</div>';
      }

      if (activeDraft.outreachText) {
        resultsHtml +=
          '<div style="background:#f0fdf4;border:2px solid #10b981;border-radius:14px;padding:14px;margin-top:14px;">' +
            '<div style="font-size:0.92rem;font-weight:900;color:#065f46;margin-bottom:3px;">' + esc(t.outreachCardHdr.replace("{name}", whoDisp)) + '</div>' +
            '<div style="font-size:0.77rem;color:#047857;font-weight:700;margin-bottom:8px;">' + esc(t.outreachCardSub) + '</div>' +
            '<textarea rows="6" dir="' + ((uiState.commLang || l) === "he" ? "rtl" : "ltr") + '" oninput="window.gatRefUpdateLiveDraftEdit(\'' + safeActKey + '\', \'outreachText\', this.value)" style="width:100%;border:1.5px solid #6ee7b7;border-radius:10px;padding:10px 12px;font-size:0.86rem;line-height:1.5;background:#fff;color:#0f172a;margin-bottom:8px;">' + esc(activeDraft.outreachText) + '</textarea>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
              '<button type="button" onclick="window.gatRefCopyText(\'outreach\', \'' + safeActKey + '\')" style="flex:1;background:#059669;color:#fff;border:none;border-radius:9px;padding:10px 12px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + esc(t.copyOutreachBtn) + '</button>' +
              '<button type="button" onclick="window.gatRefShareWhatsApp(\'outreach\', \'' + safeActKey + '\')" style="flex:1;background:#065f46;color:#fff;border:none;border-radius:9px;padding:10px 12px;font-size:0.82rem;font-weight:900;cursor:pointer;">' + esc(t.waOutreachBtn) + '</button>' +
            '</div>' +
          '</div>';
      }

      if (activeDraft.letterHe) {
        resultsHtml +=
          '<div style="background:#ffffff;border:2.5px solid #0284c7;border-radius:14px;padding:14px;margin-top:14px;">' +
            '<div style="font-size:0.93rem;font-weight:900;color:#082548;margin-bottom:8px;">' + esc(t.letterCardHdr.replace("{name}", whoDisp)) + '</div>' +
            '<label style="font-size:0.78rem;font-weight:800;color:#334155;display:block;margin-bottom:4px;">' + esc(t.letterHeLbl) + '</label>' +
            '<div class="' + (unlocked ? '' : 'watermarked') + '" style="position:relative;">' +
              '<textarea rows="10" dir="rtl" ' + (unlocked ? '' : 'readonly ') + 'oninput="window.gatRefUpdateLiveDraftEdit(\'' + safeActKey + '\', \'letterHe\', this.value)" style="width:100%;border:1.5px solid #94a3b8;border-radius:10px;padding:12px;font-size:0.9rem;line-height:1.62;background:#fffef7;color:#0f172a;text-align:right;margin-bottom:10px;">' + esc(activeDraft.letterHe) + '</textarea>' +
            '</div>' +
            (activeDraft.letterTrans ? (
              '<label style="font-size:0.78rem;font-weight:800;color:#334155;display:block;margin-bottom:4px;">' + esc(t.letterTrLbl) + '</label>' +
              '<textarea rows="7" dir="' + ((activeDraft.commLang || l) === "he" ? "rtl" : "ltr") + '" ' + (unlocked ? '' : 'readonly ') + 'oninput="window.gatRefUpdateLiveDraftEdit(\'' + safeActKey + '\', \'letterTrans\', this.value)" style="width:100%;border:1.5px solid #cbd5e1;border-radius:10px;padding:10px 12px;font-size:0.83rem;line-height:1.52;background:#f8fafc;color:#334155;margin-bottom:10px;">' + esc(activeDraft.letterTrans) + '</textarea>'
            ) : '') +
            (unlocked ? (
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">' +
                '<button type="button" onclick="window.gatRefCopyText(\'he\', \'' + safeActKey + '\')" style="background:#082548;color:#fff;border:none;border-radius:9px;padding:10px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(t.copyLetterBtn) + '</button>' +
                '<button type="button" onclick="window.gatRefCopyText(\'both\', \'' + safeActKey + '\')" style="background:#0284c7;color:#fff;border:none;border-radius:9px;padding:10px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(t.copyBothLetterBtn) + '</button>' +
                '<button type="button" onclick="window.gatRefShareWhatsApp(\'letter\', \'' + safeActKey + '\')" style="background:#059669;color:#fff;border:none;border-radius:9px;padding:10px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(t.waLetterBtn) + '</button>' +
                '<button type="button" onclick="window.gatRefPrintLetterPdf(\'' + safeActKey + '\')" style="background:#b45309;color:#fff;border:none;border-radius:9px;padding:10px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(t.printPdfBtn) + '</button>' +
              '</div>'
            ) : (
              '<button type="button" class="btn btn-gold" onclick="window.openProPaywall(\'' + esc(t.pwReason).replace(/'/g, "\\'") + '\', \'forms\')" style="width:100%;margin-top:4px;">' + esc(t.pwUnlockBtn) + '</button>'
            )) +
          '</div>';
      }
    }

    var savedDossierBarHtml = "";
    if (savedDraftKeys.length > 0) {
      savedDossierBarHtml =
        '<div style="margin-top:14px;padding:12px;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:12px;">' +
          '<div style="font-size:0.8rem;font-weight:900;color:#082548;margin-bottom:8px;">' + esc(t.savedLettersHdr.replace("{n}", String(savedDraftKeys.length))) + '</div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
            savedDraftKeys.map(function(dk) {
              var nm = (st.contacts[dk] && st.contacts[dk].name) || dk;
              var safeDk = String(dk).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
              var isCur = (dk === activeKey);
              return '<button type="button" onclick="window.gatRefOpenPersonInStudio(\'' + safeDk + '\')" style="padding:6px 12px;border-radius:999px;border:1.5px solid ' + (isCur ? '#0284c7' : '#94a3b8') + ';background:' + (isCur ? '#0284c7' : '#fff') + ';color:' + (isCur ? '#fff' : '#0f172a') + ';font-size:0.77rem;font-weight:800;cursor:pointer;">📄 ' + esc(nm) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';
    }

    var inpCss = "width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:0.86rem;font-weight:600;background:#fff;color:#0f172a;margin:0 0 10px 0;";
    var lblCss = "display:block;font-size:0.79rem;font-weight:900;color:#0f172a;margin:0 0 4px 0;";

    modBox.innerHTML =
      '<div class="card" id="gat-ref-studio-root" dir="' + (isRtl ? 'rtl' : 'ltr') + '">' +
        '<h2 style="margin-bottom:6px;">' + esc(t.title) + '</h2>' +
        '<p style="font-size:0.85rem;color:#475569;line-height:1.48;margin-bottom:14px;">' + esc(t.subtitle) + '</p>' +

        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">' +
          '<button type="button" onclick="window.gatRefSwitchSubTab(\'log\')" style="padding:11px 12px;border-radius:12px;border:2px solid ' + (uiState.subTab === "log" ? "#0284c7" : "#cbd5e1") + ';background:' + (uiState.subTab === "log" ? "#082548" : "#f8fafc") + ';color:' + (uiState.subTab === "log" ? "#fff" : "#0f172a") + ';font-size:0.84rem;font-weight:900;cursor:pointer;">' +
            esc(t.tabLog.replace("{n}", String((st.events || []).length))) +
          '</button>' +
          '<button type="button" onclick="window.gatRefSwitchSubTab(\'studio\')" style="padding:11px 12px;border-radius:12px;border:2px solid ' + (uiState.subTab === "studio" ? "#059669" : "#cbd5e1") + ';background:' + (uiState.subTab === "studio" ? "#065f46" : "#f8fafc") + ';color:' + (uiState.subTab === "studio" ? "#fff" : "#0f172a") + ';font-size:0.84rem;font-weight:900;cursor:pointer;">' +
            esc(t.tabStudio.replace("{c}", String(savedDraftKeys.length))) +
          '</button>' +
        '</div>' +

        (uiState.subTab === "log" ? (
          '<div style="background:#f8fafc;border:2px solid #cbd5e1;border-radius:15px;padding:15px;margin-bottom:16px;">' +
            '<div style="font-size:0.94rem;font-weight:900;color:#082548;margin-bottom:3px;">' + esc(t.logBoxTitle) + '</div>' +
            '<div style="font-size:0.78rem;color:#475569;font-weight:700;margin-bottom:11px;">' + esc(t.logBoxSub) + '</div>' +
            quickChipsHtml +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;">' +
              '<div><label style="' + lblCss + '">' + esc(t.personNameLbl) + '</label><input id="rf-log-person" value="' + esc(uiState.logPerson) + '" placeholder="' + esc(t.personNamePh) + '" style="' + inpCss + '" /></div>' +
              '<div><label style="' + lblCss + '">' + esc(t.roleLbl) + '</label><select id="rf-log-role" style="' + inpCss + '">' + roleOptsLog + '</select></div>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;">' +
              '<div><label style="' + lblCss + '">' + esc(t.actTagLbl) + '</label><select id="rf-log-tag" style="' + inpCss + '">' + actTagOpts + '</select></div>' +
              '<div><label style="' + lblCss + '">' + esc(t.placeLbl) + '</label><input id="rf-log-place" value="' + esc(uiState.logPlace) + '" placeholder="' + esc(t.placePh) + '" style="' + inpCss + '" /></div>' +
              '<div><label style="' + lblCss + '">' + esc(t.dateLbl) + '</label><input id="rf-log-date" type="date" value="' + esc(uiState.logDate) + '" style="' + inpCss + '" /></div>' +
            '</div>' +
            '<label style="' + lblCss + '">' + esc(t.noteLbl) + '</label>' +
            '<textarea id="rf-log-note" rows="2" placeholder="' + esc(t.notePh) + '" style="' + inpCss + '">' + esc(uiState.logNote) + '</textarea>' +
            '<button type="button" class="btn btn-emerald" onclick="window.gatRefAddEventLog()" style="margin:2px 0 0 0;width:100%;">' + esc(t.addLogBtn) + '</button>' +
          '</div>' +
          '<div style="font-size:0.9rem;font-weight:900;color:#082548;margin-bottom:8px;">' + esc(t.timelineHdr) + '</div>' +
          timelineCardsHtml
        ) : (
          '<div>' +
            '<div style="background:#f8fafc;border:2px solid #cbd5e1;border-radius:15px;padding:15px;margin-bottom:14px;">' +
              '<div style="font-size:0.92rem;font-weight:900;color:#082548;margin-bottom:10px;">' + esc(t.studioPickHdr) + '</div>' +
              (groupKeys.length > 0 ? (
                '<select onchange="window.gatRefOnPickStudioContact(this.value)" style="' + inpCss + 'border-color:#0284c7;background:#f0f9ff;font-weight:800;">' + studioContactOpts + '</select>'
              ) : '') +
              (activeLoggedCount > 0 ? (
                '<div style="background:#dcfce7;border:1.5px solid #22c55e;color:#166534;padding:8px 12px;border-radius:10px;font-size:0.8rem;font-weight:900;margin-bottom:10px;">' +
                  esc(t.loggedSummaryBadge.replace("{n}", String(activeLoggedCount)).replace("{name}", uiState.signerName)) +
                '</div>'
              ) : '') +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">' +
                '<div><label style="' + lblCss + '">' + esc(t.appNameLbl) + '</label><input id="rf-app-name" value="' + esc(uiState.applicantName) + '" placeholder="' + esc(t.appNamePh) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.partnerNameLbl) + '</label><input id="rf-partner-name" value="' + esc(uiState.partnerName) + '" placeholder="' + esc(t.partnerNamePh) + '" style="' + inpCss + '" /></div>' +
              '</div>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">' +
                '<div><label style="' + lblCss + '">' + esc(t.signerNameLbl) + '</label><input id="rf-signer-name" value="' + esc(uiState.signerName) + '" placeholder="' + esc(t.personNamePh) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.roleLbl) + '</label><select id="rf-signer-role" onchange="window.mountReferenceLettersStudio()" style="' + inpCss + '">' + roleOptsStudio + '</select></div>' +
              '</div>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">' +
                '<div><label style="' + lblCss + '">' + esc(t.signerTitleLbl) + '</label><input id="rf-signer-title" value="' + esc(uiState.signerTitle) + '" placeholder="' + esc(t.signerTitlePh) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.placeLbl) + '</label><input id="rf-venue-city" value="' + esc(uiState.venueCity) + '" placeholder="' + esc(t.placePh) + '" style="' + inpCss + '" /></div>' +
              '</div>' +
              (isPibaRole ? (
                '<div style="background:#fffbeb;border:1.5px solid #f59e0b;color:#92400e;border-radius:10px;padding:8px 11px;font-size:0.77rem;font-weight:800;margin-bottom:10px;">' + esc(t.pibaWitnessHint) + '</div>'
              ) : '') +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px;">' +
                '<div><label style="' + lblCss + '">' + esc(t.signerTzLbl) + '</label><input id="rf-signer-tz" value="' + esc(uiState.signerTz) + '" placeholder="' + esc(t.signerTzPh) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.signerPhoneLbl) + '</label><input id="rf-signer-phone" value="' + esc(uiState.signerPhone) + '" placeholder="' + esc(t.signerPhonePh) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.deadlineLbl) + '</label><input id="rf-deadline" type="date" value="' + esc(uiState.deadlineIso) + '" style="' + inpCss + '" /></div>' +
                '<div><label style="' + lblCss + '">' + esc(t.commLangLbl) + '</label><select id="rf-comm-lang" style="' + inpCss + '">' + commLangOpts + '</select></div>' +
              '</div>' +
            '</div>' +

            '<div style="background:#ffffff;border:2px solid ' + (hasRichContext ? '#10b981' : '#f59e0b') + ';border-radius:15px;padding:15px;margin-bottom:14px;">' +
              '<div style="font-size:0.92rem;font-weight:900;color:#082548;margin-bottom:4px;">' + esc(t.interviewHdr) + '</div>' +
              '<div style="font-size:0.79rem;color:#475569;font-weight:700;margin-bottom:10px;">' +
                esc(activeLoggedCount > 0 ? t.interviewSubHasLogs.replace("{n}", String(activeLoggedCount)) : t.interviewSubZero) +
              '</div>' +
              '<label style="' + lblCss + '">' + esc(t.qHowMetLbl) + '</label>' +
              '<textarea id="rf-q-howmet" rows="2" placeholder="' + esc(t.qHowMetPh) + '" style="' + inpCss + '">' + esc(uiState.howMet) + '</textarea>' +
              '<label style="' + lblCss + '">' + esc(t.qWitnessedLbl) + '</label>' +
              '<textarea id="rf-q-witnessed" rows="3" placeholder="' + esc(t.qWitnessedPh) + '" style="' + inpCss + '">' + esc(uiState.witnessedDetails) + '</textarea>' +
              '<label style="' + lblCss + '">' + esc(t.qSpecialLbl) + '</label>' +
              '<input id="rf-q-special" value="' + esc(uiState.specialTouch) + '" placeholder="' + esc(t.qSpecialPh) + '" style="' + inpCss + '" />' +
              '<div style="font-size:0.78rem;font-weight:900;padding:7px 11px;border-radius:9px;background:' + (hasRichContext ? '#ecfdf5' : '#fffbeb') + ';color:' + (hasRichContext ? '#065f46' : '#92400e') + ';">' +
                esc(hasRichContext ? t.depthGood : t.depthThin) +
              '</div>' +
            '</div>' +

            '<div style="display:flex;flex-direction:column;gap:8px;">' +
              '<button type="button" class="btn btn-emerald" onclick="window.gatRefGenerateAi(\'both\')" style="margin:0;padding:13px 16px;font-size:0.92rem;">' + esc(t.btnGenBoth) + '</button>' +
              '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;">' +
                '<button type="button" onclick="window.gatRefGenerateAi(\'outreach\')" style="background:#0f766e;color:#fff;border:none;border-radius:10px;padding:10px 12px;font-size:0.81rem;font-weight:900;cursor:pointer;">' + esc(t.btnGenOutreach) + '</button>' +
                '<button type="button" onclick="window.gatRefGenerateAi(\'letter\')" style="background:#0284c7;color:#fff;border:none;border-radius:10px;padding:10px 12px;font-size:0.81rem;font-weight:900;cursor:pointer;">' + esc(t.btnGenLetter) + '</button>' +
              '</div>' +
            '</div>' +

            '<div id="rf-ai-gen-status" style="display:none;margin-top:12px;"></div>' +
            '<div id="rf-generated-results-anchor">' + resultsHtml + '</div>' +
            savedDossierBarHtml +
          '</div>'
        )) +
      '</div>';
  };

  // Hook `renderAll` & `openMod` so Studio stays mounted across language switches & deep links!
  function hookAppLifecycle() {
    if (typeof window.renderAll === "function" && !window.renderAll._gatRefHooked) {
      var origRender = window.renderAll;
      var wrappedRender = function() {
        var r = origRender.apply(this, arguments);
        window.mountReferenceLettersStudio();
        return r;
      };
      wrappedRender._gatRefHooked = true;
      window.renderAll = wrappedRender;
    }
    if (typeof window.openMod === "function" && !window.openMod._gatRefHooked) {
      var origOpenMod = window.openMod;
      var wrappedOpen = function(modName) {
        if (modName === "reference-letters") modName = "rabbi-letters";
        var r = origOpenMod.call(this, modName);
        if (modName === "rabbi-letters") window.mountReferenceLettersStudio();
        else updateGlobalNavLabels();
        return r;
      };
      wrappedOpen._gatRefHooked = true;
      window.openMod = wrappedOpen;
    }
    window.mountReferenceLettersStudio();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      hookAppLifecycle();
      setTimeout(pullStoreFromCloudOnce, 500);
    });
  } else {
    hookAppLifecycle();
    setTimeout(pullStoreFromCloudOnce, 500);
  }
})();
