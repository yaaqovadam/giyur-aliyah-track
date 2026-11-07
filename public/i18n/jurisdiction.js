(function() {
  window.JURISDICTION_DATA = {
    en: {
      flag: "🇺🇸/🇬🇧", label: "EN", name: "English (US/UK/CA)",
      police: "FBI Identity History Summary / UK ACRO / RCMP Fingerprint Check",
      birth: "Long-Form 'Vault' Birth Certificate (listing both parents)",
      single: "Apostilled Single-Status / No-Impediment Affidavit",
      rabbi: "Orthodox Proof of Judaism (Ishur Yahadut) on Official Letterhead",
      apostille: "State Secretary of State / FCDO / Global Affairs Apostille"
    },
    he: {
      flag: "🇮🇱", label: "עב", name: "עברית (ישראל)",
      police: "תעודת יושר פדרלית (FBI / ACRO / ק.פ.ל) עם חותמת אפוסטיל",
      birth: "תעודת לידה מקורית מלאה (Long-Form) הכוללת שמות הורים",
      single: "תמצית רישום / תצהיר רווקות או פנויות מאומת באפוסטיל",
      rabbi: "אישור יהדות מרב אורתודוקסי מוכר על נייר לוגו רשמי",
      apostille: "חותמת אפוסטיל רשמית (משרד החוץ / מזכיר המדינה)"
    },
    fr: {
      flag: "🇫🇷", label: "FR", name: "Français (France/BE/CH)",
      police: "Bulletin n°3 du Casier Judiciaire National (JAMAIS le Bulletin n°2)",
      birth: "Copie Intégrale d'Acte de Naissance (Attention : un Extrait est refusé !)",
      single: "Certificat de Célibat / Coutume + Livret de Famille apostillé",
      rabbi: "Attestation de Judaïté officielle du Consistoire (Beth Din de Paris/Lyon)",
      apostille: "Apostille de la Cour d'Appel / Téléprocédure Notaires de France"
    },
    es: {
      flag: "🇪🇸/🇦🇷", label: "ES", name: "Español (España/LatAm)",
      police: "Certificado de Antecedentes Penales (Ministerio de Justicia / RNR Argentina)",
      birth: "Partida / Acta de Nacimiento Literal (Copia Fiel del Libro — NO en extracto)",
      single: "Fe de Soltería / Declaración Jurada de Estado Civil apostillada",
      rabbi: "Certificado de Judaísmo (Ishur Yahadut) de Rabinato Ortodoxo reconocido",
      apostille: "Apostilla de La Haya (Ministerio de Relaciones Exteriores / Colegios Notariales)"
    },
    de: {
      flag: "🇩🇪/🇦🇹", label: "DE", name: "Deutsch (DACH)",
      police: "Erweitertes Führungszeugnis / Führungszeugnis (Bundesamt für Justiz)",
      birth: "Beglaubigte Abschrift aus dem Geburtenregister (NICHT einfache Geburtsurkunde)",
      single: "Erweiterte Meldebescheinigung (Ledigkeitsbescheinigung) / Ehefähigkeitszeugnis",
      rabbi: "Ischur Jahadut einer anerkannten orthodoxen Rabbinatskonferenz (ORD)",
      apostille: "Apostille des Bundesamts für Auswärtige Angelegenheiten (BfAA) / Landgericht"
    }
  };

  window.OBSTACLE_I18N = {
    fr: [
      {
        tag: "Voie 1 • Départ d'Urgence & Shinui Ma'amad",
        title: "Le Dossier « Go-Bag » : 7 Originaux Doublement Apostillés Avant le Vol",
        body: "En France, les délais consulaires prennent 6 à 9 mois. Vous pouvez entrer en Israël comme touriste (B/2) et faire votre Aliyah sur place (Shinui Ma'amad) si vous emportez ces originaux apostillés.",
        badTitle: "❌ Le Piège Classique des Francophones :",
        badText: "• Apporter un simple <em>Extrait d'acte de naissance</em> au lieu d'une <strong>Copie Intégrale d'Acte de Naissance</strong>.<br>• Oublier d'apostiller le <strong>Bulletin n°3 du Casier Judiciaire National</strong> (valable strictement 180 jours).",
        goodTitle: "✅ Le Protocole Go-Bag Francophone :",
        goodText: "• Commandez 2 exemplaires de votre <strong>Copie Intégrale d'Acte de Naissance</strong>, votre <strong>Bulletin n°3</strong> apostillé, votre <strong>Livret de Famille / Certificat de Célibat</strong>, et l'<strong>Attestation du Consistoire</strong>.",
        time: "⏱️ Délai de préparation : 7 à 14 jours avant le vol"
      },
      {
        tag: "Horloge de 180 Jours • Misrad HaPanim",
        title: "Les 5 Documents Obligatoires & La Règle des 3 Paniers de Police",
        body: "Le Misrad HaPanim applique une validité stricte de 180 jours sur votre Casier Judiciaire Bulletin n°3 et votre Certificat de Célibat.",
        badTitle: "❌ Pourquoi les Dossiers Français Expirent :",
        badText: "• Les guichetiers demandent les pièces au compte-gouttes. Pendant que vous attendez un nouveau RDV, votre Bulletin n°3 dépasse 180 jours.",
        goodTitle: "✅ Notre Bouclier Anti-Expiration :",
        goodText: "• Copie Intégrale d'Acte de Naissance + Bulletin n°3 apostillé pour chaque pays vécu >1 an depuis l'âge de 14 ans.",
        time: "⏱️ Validité stricte : 180 jours maximum"
      },
      {
        tag: "Voie 2 • Conversion Orthodoxe Privée (Gush Etzion / Bnei Brak)",
        title: "Validation du Grand Rabbinat (Ishur Giyur) & Protection du Sal Klita",
        body: "Les tribunaux orthodoxes privés (Gush Etzion, Bnei Brak R' Karelitz) sont reconnus pour la Loi du Retour (arrêt Dahan), mais le mariage au Rabbinat exige l'Ishur Giyur du Beit HaDin HaGadol.",
        badTitle: "❌ Le Piège des 24 Mois (Perte de 21 700 ₪) :",
        badText: "• Dépasser 24 mois cumulés en Israël comme touriste/étudiant sur 3 ans annule votre prime d'intégration Sal Klita.",
        goodTitle: "✅ Sécuriser l'Aliyah et le Mariage :",
        goodText: "• Déposez votre dossier de validation au Beit HaDin HaGadol dès l'immersion au Mikvé.",
        time: "⏱️ Économie : 21 700+ ₪ de Sal Klita préservés"
      },
      {
        tag: "Voie 3 • Comité des Exceptions (Va'adat Charigim - Formulaire Ash/1)",
        title: "Franchir le Mur Touristique pour la Conversion d'État (Nativ)",
        body: "Les touristes (B/2) sont bloqués de la conversion d'État sans l'accord préalable de la Va'adat Charigim (Formulaire Ash/1).",
        badTitle: "❌ Pourquoi 70% des Demandes Échouent :",
        badText: "• Soumettre une lettre émotionnelle en français ou en anglais au lieu d'un <em>Michtav Hesber</em> juridique en hébreu.",
        goodTitle: "✅ Dossier Juridique en Hébreu :",
        goodText: "• Utilisez notre générateur dans l'application pour imprimer votre Formulaire Ash/1 et votre Michtav Hesber en hébreu.",
        time: "⏱️ Délai du comité : 6 à 10 semaines"
      },
      {
        tag: "Moteur Hébreu • Traducteur & Formulaires Ash/1 / Ash/3",
        title: "Traduire les Lettres du Misrad HaPanim & Bloquer la Fermeture à 30 Jours",
        body: "Chaque feuille de demande de pièces (Drishat Mismachim) déclenche un compte à rebours de 30 jours avant fermeture du dossier.",
        badTitle: "❌ Ignorer une Ligne en Hébreu :",
        badText: "• Si vous ne déposez pas une demande formelle de prolongation en hébreu avant le 30e jour, votre dossier est archivé.",
        goodTitle: "✅ Générateur d'Extension de 30 Jours :",
        goodText: "• Générez instantanément votre lettre officielle de prolongation en hébreu dans notre Centre de Commande.",
        time: "⏱️ Protection immédiate contre la fermeture"
      },
      {
        tag: "Communauté & Rabbin • 5 à 8+ Lettres Tamponnées",
        title: "Obtenir vos Lettres de Recommandation de Rabbin & Famille d'Accueil",
        body: "Le Beit Din exige 5 à 8 lettres en hébreu sur papier à en-tête officiel de votre rabbin de synagogue et de votre famille hôte.",
        badTitle: "❌ « Écris-la en hébreu et je la signerai ! » :",
        badText: "• Les rabbins de quartier n'ont pas le temps de rédiger des lettres juridiques de zéro.",
        goodTitle: "✅ Modèles Prêts à Signer sur WhatsApp :",
        goodText: "• Générez le brouillon parfait en hébreu en 1 clic et envoyez-le sur WhatsApp à votre rabbin.",
        time: "⏱️ Gain de temps : 3 à 6 mois"
      },
      {
        tag: "Voie 4 • Visa Conjoint Misrad HaPanim (Nohal 5.2.0008)",
        title: "La Procédure Graduée (Tahalich Medurag) & L'Interrogatoire de 80 Questions",
        body: "Pour les couples mariés ou concubins (Yeduim BeTzibur) : obtenez le permis de travail B/1 puis la Teudat Zehut A/5.",
        badTitle: "❌ L'Interrogatoire Séparé (80 Questions) :",
        badText: "• Les deux conjoints sont interrogés séparément sur leur quotidien. 3 contradictions bloquent le visa d'un an.",
        goodTitle: "✅ Simulateur de Synchronisation Couples :",
        goodText: "• Entraînez-vous sur les 80 questions réelles du Misrad HaPanim dans l'application.",
        time: "⏱️ Parcours complet : B/1 ➔ A/5 ➔ Citoyenneté"
      },
      {
        tag: "Casier Judiciaire • Réhabilitation & Transparence",
        title: "Faire son Aliyah ou Demander un Visa avec un Ancien Antécédent",
        body: "Ne cachez jamais une ancienne garde à vue ou mention effacée : la dissimulation (Choser Tom Lev) entraîne un refus immédiat.",
        badTitle: "❌ Cocher « Non » par Erreur :",
        badText: "• Si une mention apparaît ou si l'administration croise les fichiers, l'omission est fatale.",
        goodTitle: "✅ Dossier de Réhabilitation en Hébreu :",
        goodText: "• Soumettez d'emblée un Michtav Hesber de réhabilitation en hébreu avec 3 lettres de moralité.",
        time: "⏱️ Prévention des refus administratifs"
      },
      {
        tag: "Survie Visa B/2 • Travail à Distance & Logement",
        title: "Vivre Légalement en Israël Pendant sa Conversion Sans Permis de Travail",
        body: "Travailler au noir pour un employeur israélien entraîne l'expulsion immédiate et l'exclusion du Beit Din.",
        badTitle: "❌ Petits Boulots Locaux Non Déclarés :",
        badText: "• Même payé en espèces, tout travail local en Israël sous visa B/2 est illégal.",
        goodTitle: "✅ Télétravail Étranger 100% Légal & Échanges :",
        goodText: "• Travaillez à distance pour des clients/entreprises hors d'Israël (payé sur votre compte étranger) ou logez en programme d'étude.",
        time: "⏱️ Autonomie financière 100% légale"
      }
    ],
    es: [
      {
        tag: "Vía 1 • Salida de Emergencia y Shinui Ma'amad",
        title: "La Carpeta «Go-Bag»: 7 Originales con Doble Apostilla Antes de Volar",
        body: "Evite la espera consular de 9 meses. Entre a Israel como turista (B/2) y tramite su Aliyá desde adentro (Shinui Ma'amad) llevando estos originales apostillados.",
        badTitle: "❌ El Error Fatal de España y Latinoamérica :",
        badText: "• Llevar un <em>Certificado en Extracto</em> en lugar de la <strong>Partida / Acta de Nacimiento Literal (Copia Fiel del Libro)</strong>.<br>• Dejar vencer los 180 días del <strong>Certificado de Antecedentes Penales (RNR / Ministerio de Justicia)</strong>.",
        goodTitle: "✅ Protocolo Go-Bag en Español :",
        goodText: "• Lleve 2 originales con Apostilla de La Haya de su Partida Literal de Nacimiento, Antecedentes Penales Federales, Fe de Soltería / Matrimonio y Certificado de Judaísmo (Ishur Yahadut).",
        time: "⏱️ Preparación rápida: 7 a 14 días"
      },
      {
        tag: "Reloj de 180 Días • Misrad HaPanim",
        title: "Los 5 Documentos Apostillados y la Regla de los 3 Países de Policía",
        body: "El Misrad HaPanim exige que los Antecedentes Penales y la Fe de Soltería tengan menos de 180 días desde su emisión.",
        badTitle: "❌ Por Qué Caducan los Documentos :",
        badText: "• Los funcionarios piden requisitos en cuotas. Cuando consigue nueva cita, su Apostilla de La Haya ya superó los 180 días.",
        goodTitle: "✅ Escudo Contra el Vencimiento :",
        goodText: "• Antecedentes Penales Federales apostillados de país de nacimiento, ciudadanía y cualquier país donde vivió >1 año desde los 14 años.",
        time: "⏱️ Validez estricta: 180 días"
      },
      {
        tag: "Vía 2 • Conversión Ortodoxa Privada (Gush Etzion / Bnei Brak)",
        title: "Validación del Gran Rabinato (Ishur Guiur) y Cesta Sal Klitá",
        body: "Las cortes ortodoxas privadas (Gush Etzion, Bnei Brak R' Karelitz) otorgan derecho a Aliyá por la Ley del Retorno, pero para casarse por la Rabanut necesita el Ishur Guiur del Beit HaDin HaGadol.",
        badTitle: "❌ La Trampa de los 24 Meses (21.700 ₪) :",
        badText: "• Acumular más de 24 meses como turista en Israel en los 3 años previos a la Aliyá anula la ayuda económica Sal Klitá.",
        goodTitle: "✅ Proteja su Boda y su Sal Klitá :",
        goodText: "• Tramite el Ishur Guiur en Jerusalén apenas salga de la Mikve y controle su contador de días.",
        time: "⏱️ Ahorro: 21.700+ ₪ protegidos"
      },
      {
        tag: "Vía 3 • Comité de Excepciones (Va'adat Jariguim - Formulario Ash/1)",
        title: "Cómo Pasar el Comité de Excepciones para Guiur Estatal como Turista",
        body: "Los turistas (B/2) tienen bloqueado el Guiur estatal hasta obtener permiso de la Va'adat Jariguim mediante el Formulario Ash/1.",
        badTitle: "❌ Por Qué Rechazan el 70% de Solicitudes :",
        badText: "• Presentar una carta emocional en español o inglés en vez de un <em>Mijtav Hesber</em> legal en hebreo.",
        goodTitle: "✅ Dossier Legal en Hebreo :",
        goodText: "• Genere su Formulario Ash/1 y su Mijtav Hesber en hebreo listos para imprimir desde nuestra aplicación.",
        time: "⏱️ Aprobación: 6 a 10 semanas"
      },
      {
        tag: "Motor Hebreo • Traductor y Formularios Ash/1 y Ash/3",
        title: "Traduzca Cartas del Misrad HaPanim y Frene el Cierre de 30 Días",
        body: "Toda hoja de requisitos (Drishat Mismajim) activa una cuenta regresiva de 30 días antes de que cierren su expediente.",
        badTitle: "❌ No Responder en Hebreo a Tiempo :",
        badText: "• Si no presenta una prórroga formal en hebreo antes del día 30, archivan su caso.",
        goodTitle: "✅ Solicitud de Prórroga en 1 Clic :",
        goodText: "• Imprima al instante su carta de extensión de 30/60 días en hebreo en nuestro Centro de Comando.",
        time: "⏱️ Escudo inmediato de expediente"
      },
      {
        tag: "Comunidad y Rabino • 5 a 8+ Cartas Selladas",
        title: "Cómo Conseguir las Cartas de Recomendación de Rabino y Familia Anfitriona",
        body: "El Beit Din exige entre 5 y 8 cartas en hebreo firmadas y selladas por el rabino de su sinagoga y su familia acompañante.",
        badTitle: "❌ «¡Escríbela en hebreo y yo la firmo!» :",
        badText: "• Los rabinos comunitarios están ocupados y no redactan cartas desde cero.",
        goodTitle: "✅ Generador de Cartas para WhatsApp :",
        goodText: "• Genere el borrador hebreo perfecto en 1 clic y envíelo por WhatsApp a su rabino para firmar.",
        time: "⏱️ Ahorra de 3 a 6 meses"
      },
      {
        tag: "Vía 4 • Visa de Pareja Misrad HaPanim (Nohal 5.2.0008)",
        title: "Residencia Gradual (Tahalij Medurag) y las 80 Preguntas Separadas",
        body: "Para matrimonios y parejas de hecho (Yeduim BeTzibur): avance del permiso de trabajo B/1 a la Teudat Zehut A/5.",
        badTitle: "❌ El Interrogatorio en Salas Separadas :",
        badText: "• Separan a la pareja y hacen 80 preguntas íntimas de la rutina diaria. 3 contradicciones congelan su visa.",
        goodTitle: "✅ Simulador de 80 Preguntas :",
        goodText: "• Practique las 80 preguntas reales con su pareja en nuestra aplicación antes de la cita.",
        time: "⏱️ Ruta segura hacia B/1 y A/5"
      },
      {
        tag: "Antecedentes Penales • Rehabilitación Legal",
        title: "Aliyá o Visa de Pareja con un Arresto o Antecedente Pasado",
        body: "Jamás oculte un antecedente antiguo o sobreseído: marcar «No» se considera ocultamiento doloso (Joser Tom Lev).",
        badTitle: "❌ Ocultar un Registro Antiguo :",
        badText: "• Genera un rechazo inmediato mucho más difícil de revertir que la falta original.",
        goodTitle: "✅ Dossier de Rehabilitación en Hebreo :",
        goodText: "• Presente desde el primer día una carta legal de explicación en hebreo junto con el fallo de cierre y 3 avales.",
        time: "⏱️ Prevención total de rechazos"
      },
      {
        tag: "Supervivencia Visa B/2 • Trabajo Remoto y Vivienda",
        title: "Cómo Mantenerse Legalmente en Israel Durante su Conversión",
        body: "Trabajar sin permiso para un empleador israelí causa deportación inmediata y expulsión del Beit Din.",
        badTitle: "❌ Trabajos Locales en Efectivo :",
        badText: "• Cualquier empleo local en Israel con visa B/2 viola la ley migratoria.",
        goodTitle: "✅ Trabajo Remoto Extranjero 100% Legal :",
        goodText: "• Trabaje en línea para clientes o empresas fuera de Israel (cobrando en su banco extranjero) o mediante becas de alojamiento.",
        time: "⏱️ Ingresos 100% legales"
      }
    ],
    de: [
      {
        tag: "Weg 1 • Notfall-Alija & Schinui Ma'amad",
        title: "Der „Go-Bag“-Ordner: 7 Doppelt Apostillierte Originale Vor dem Abflug",
        body: "Überspringen Sie 9 Monate Konsulats-Wartezeit. Reisen Sie als Tourist (B/2) ein und beantragen Sie Alija direkt in Israel (Schinui Ma'amad) mit diesen apostillierten Originalen.",
        badTitle: "❌ Die Häufigste Falle für DACH-Bürger :",
        badText: "• Eine einfache <em>Geburtsurkunde</em> statt einer <strong>Beglaubigten Abschrift aus dem Geburtenregister</strong> mitbringen.<br>• Das <strong>Erweiterte Führungszeugnis (Bundesamt für Justiz)</strong> ohne BfAA-Apostille oder älter als 180 Tage einreichen.",
        goodTitle: "✅ Das DACH Go-Bag-Protokoll :",
        goodText: "• Bringen Sie je 2 apostillierte Originale mit: Beglaubigte Abschrift aus dem Geburtenregister, Führungszeugnis + BfAA-Apostille, Erweiterte Meldebescheinigung (Ledigkeit) und Ischur Jahadut (ORD/Rabbinat).",
        time: "⏱️ Vorbereitungszeit: 7 bis 14 Tage"
      },
      {
        tag: "180-Tage-Frist • Misrad HaPanim",
        title: "Die 5 Apostillierten Pflichtdokumente & Die 3-Länder-Polizeiregel",
        body: "Das Misrad HaPanim akzeptiert Führungszeugnisse und Ledigkeitsbescheinigungen nur innerhalb von 180 Tagen ab Ausstellung.",
        badTitle: "❌ Warum Deutsche Dokumente Ablaufen :",
        badText: "• Sachbearbeiter fordern Unterlagen scheibchenweise nach. Bis zum Folgetermin ist die 180-Tage-Frist Ihres Führungszeugnisses abgelaufen.",
        goodTitle: "✅ Unser Fristen-Schutzschild :",
        goodText: "• Apostillierte Führungszeugnisse für Geburtsland, alle Staatsangehörigkeiten und jedes Land mit >1 Jahr Aufenthalt seit dem 14. Lebensjahr.",
        time: "⏱️ Strikte Gültigkeit: 180 Tage"
      },
      {
        tag: "Weg 2 • Private Orthodoxe Konversion (Gush Etzion / Bnei Brak)",
        title: "Oberrabbinats-Bestätigung (Ischur Giur) & Sal Klita Schutz",
        body: "Private orthodoxe Gerichte (Gush Etzion, Bnei Brak R' Karelitz) berechtigen zur Alija, aber für eine Hochzeit über das Rabbinat ist der Ischur Giur des Beit HaDin HaGadol Pflicht.",
        badTitle: "❌ Die 24-Monats-Falle (21.700 ₪ Verlust) :",
        badText: "• Wer in den 3 Jahren vor der Alija über 24 Monate als Tourist/Student in Israel war, verliert den Sal Klita Eingliederungszuschuss.",
        goodTitle: "✅ Heirat & Sal Klita Absichern :",
        goodText: "• Beantragen Sie direkt nach der Mikwe den Ischur Giur beim Obersten Rabbinatsgericht in Jerusalem.",
        time: "⏱️ Ersparnis: 21.700+ ₪ Sal Klita gesichert"
      },
      {
        tag: "Weg 3 • Ausnahmekomitee (Va'adat Charigim - Formular Asch/1)",
        title: "Als Tourist oder Student zur Staatlichen Konversion (Nativ) Zugelassen Werden",
        body: "Touristen (B/2) sind für den staatlichen Giur gesperrt, bis sie die Genehmigung der Va'adat Charigim (Formular Asch/1) erhalten.",
        badTitle: "❌ Warum 70% der Anträge Scheitern :",
        badText: "• Ein emotionales Schreiben auf Deutsch oder Englisch statt eines juristischen <em>Michtav Hesber</em> auf Hebräisch einzureichen.",
        goodTitle: "✅ Juristisches Hebräisches Dossier :",
        goodText: "• Erstellen Sie Ihr Formular Asch/1 und Ihren hebräischen Michtav Hesber druckfertig in unserem App-Kommandozentrum.",
        time: "⏱️ Komitee-Dauer: 6 bis 10 Wochen"
      },
      {
        tag: "Hebräisch-Engine • Übersetzer & Formulare Asch/1 / Asch/3",
        title: "Misrad HaPanim Schreiben Übersetzen & 30-Tage-Aktenschließung Stoppen",
        body: "Jede Nachforderungsliste (Drischat Mismachim) startet einen 30-Tage-Countdown bis zur automatischen Schließung Ihrer Akte.",
        badTitle: "❌ Eine Hebräische Zeile Übersehen :",
        badText: "• Ohne fristgerechten hebräischen Verlängerungsantrag vor Tag 30 wird Ihre Akte geschlossen.",
        goodTitle: "✅ 30-Tage-Fristverlängerung auf Knopfdruck :",
        goodText: "• Generieren Sie in Sekunden ein offizielles hebräisches Verlängerungsschreiben in unserer App.",
        time: "⏱️ Sofortiger Schutz vor Aktenschließung"
      },
      {
        tag: "Gemeinde & Rabbiner • 5 bis 8+ Gestempelte Briefe",
        title: "Gestempelte Hebräische Empfehlungsbriefe von Rabbiner & Gastfamilie",
        body: "Das Beit Din verlangt 5 bis 8 gestempelte hebräische Briefe Ihres Gemeindesynagogen-Rabbiners und Ihrer Schabbat-Gastfamilie.",
        badTitle: "❌ „Schreib es auf Hebräisch, ich unterschreibe!“ :",
        badText: "• Vielbeschäftigte Rabbiner haben keine Zeit, lange hebräische Gutachten selbst zu tippen.",
        goodTitle: "✅ 1-Klick WhatsApp-Vorlagen auf Hebräisch :",
        goodText: "• Erstellen Sie den fertigen hebräischen Entwurf in der App und senden Sie ihn per WhatsApp an Ihren Rabbiner.",
        time: "⏱️ Zeitersparnis: 3 bis 6 Monate"
      },
      {
        tag: "Weg 4 • Ehepartner-Visum Misrad HaPanim (Nohal 5.2.0008)",
        title: "Das Stufenverfahren (Tachalich Medurag) & Das 80-Fragen-Interview",
        body: "Für Verheiratete und Lebenspartner (Jeduim BeTzibur): vom B/1 Arbeitsvisum zur A/5 Teudat Zehut.",
        badTitle: "❌ Das Getrennte 80-Fragen-Verhör :",
        badText: "• Beide Partner werden in getrennten Räumen zu 80 Alltagsdetails befragt. 3 Widersprüche blockieren das Visum.",
        goodTitle: "✅ 80-Fragen-Paar-Simulator :",
        goodText: "• Trainieren Sie alle 80 echten Interviewfragen vorab gemeinsam in unserer App.",
        time: "⏱️ Sicherer Weg zu B/1 & A/5"
      },
      {
        tag: "Führungszeugnis • Rehabilitation & Offenlegung",
        title: "Alija oder Partner-Visum trotz Früherer Vorstrafe oder Ermittlung",
        body: "Verschweigen Sie niemals alte Einträge im Führungszeugnis: Täuschung (Choser Tom Lev) führt zur sofortigen Ablehnung.",
        badTitle: "❌ Fälschlicherweise „Nein“ Ankreuzen :",
        badText: "• Selbst getilgte oder eingestellte Verfahren können bei Sicherheitsabfragen auftauchen.",
        goodTitle: "✅ Hebräisches Rehabilitations-Dossier :",
        goodText: "• Reichen Sie proaktiv einen hebräischen Michtav Hesber samt Einstellungsbeschluss und 3 Leumundszeugnissen ein.",
        time: "⏱️ Schutz vor Antragsablehnung"
      },
      {
        tag: "B/2 Touristen-Guide • Remote-Arbeit & Wohnen",
        title: "Finanzierung Ihres Jahres in Israel ohne Illegale Lokale Arbeit",
        body: "Schwarzarbeit für israelische Arbeitgeber führt zur sofortigen Ausweisung und zum Ausschluss vom Beit Din.",
        badTitle: "❌ Lokale Gelegenheitsjobs gegen Bargeld :",
        badText: "• Jede Arbeit für israelische Auftraggeber mit B/2-Visum ist illegal.",
        goodTitle: "✅ 100% Legale Auslands-Remote-Arbeit :",
        goodText: "• Arbeiten Sie online für Arbeitgeber/Kunden außerhalb Israels (Auszahlung auf Ihr Auslandskonto) oder nutzen Sie Wohn-Stipendien.",
        time: "⏱️ 100% legale Finanzierung"
      }
    ]
  };

  window.TRACKS_I18N = {
    fr: {
      '#track-0': `<span class="tc-pill">Voie 1 • Départ d'Urgence & Shinui Ma'amad (Depuis Israël)</span>
        <h2>Aliyah d'Urgence Depuis Israël & Dossier « Go-Bag » (Francophones)</h2>
        <p class="tc-lead">Évitez les 9 mois d'attente consulaire. Entrez avec un visa B/2 et faites votre changement de statut (<em>Shinui Ma'amad</em>) directement au Misrad HaPanim grâce à vos originaux apostillés :</p>
        <ul class="tc-list">
          <li><strong>📋 Spécificités France / Belgique / Suisse :</strong> Emportez 2 originaux de votre <strong>Copie Intégrale d'Acte de Naissance</strong> (jamais un simple <em>Extrait</em> !), votre <strong>Bulletin n°3 du Casier Judiciaire National</strong> apostillé (<180 jours), votre <strong>Livret de Famille / Certificat de Célibat</strong> apostillé, et votre <strong>Attestation de Judaïté du Consistoire</strong>.</li>
          <li><strong>🏥 Survivre vos 60–90 Premiers Jours Sans Teudat Zehut :</strong> Avant l'obtention de votre numéro d'identité, activez votre <span class="term-link" onclick="openTerm('bridge_health')">Assurance Santé Privée Transitoire 60–90 Jours (Accès Maccabi/Clalit) ⓘ</span>.</li>
          <li><strong>💸 Payer un Propriétaire en Shekels (₪) Sans Compte Israélien :</strong> Les banques prélèvent ~3,2% de frais et bloquent les virements. Utilisez notre <span class="term-link" onclick="openTerm('fx_shield')">Pont de Paiement en Shekels & Change Aliyah Sans Teudat Zehut ⓘ</span> pour payer votre loyer directement en ₪ et économiser ~2 500 $ par 100 000 $.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 1 dans Mon Suivi en Direct →</button>`,
      '#track-1': `<span class="tc-pill">Voie 2 • Tribunaux Orthodoxes Privés (Gush Etzion, Bnei Brak)</span>
        <h2>Conversion Orthodoxe Indépendante, Mariage Rabbanut & Aliyah</h2>
        <p class="tc-lead">Reconnue pour la Loi du Retour (arrêt Dahan), mais nécessite une stratégie précise pour le Grand Rabbinat et le Sal Klita :</p>
        <ul class="tc-list">
          <li><strong>🕍 Validation du Grand Rabbinat (Beit HaDin HaGadol) :</strong> Indispensable pour obtenir l'<em>Ishur Giyur</em> permettant de se marier au Rabbinat en Israël.</li>
          <li><strong>💰 Protection du Sal Klita (21 700+ ₪) :</strong> Ne dépassez pas 24 mois cumulés en Israël comme touriste sur les 3 dernières années.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 2 dans Mon Suivi en Direct →</button>`,
      '#track-2': `<span class="tc-pill">Voie 3 • Conversion d'État (Nativ) & Comité des Exceptions</span>
        <h2>Passer la Va'adat Charigim (Formulaire Ash/1) depuis un Visa Touriste</h2>
        <p class="tc-lead">Comment franchir le blocage légal des touristes B/2 pour intégrer le programme officiel d'État :</p>
        <ul class="tc-list">
          <li><strong>⚖️ Le Dossier Ash/1 en Hébreu :</strong> Soumettez un <em>Michtav Hesber</em> juridique en hébreu, vos lettres de rabbin tamponnées et vos preuves d'autonomie financière avant l'expiration des 180 jours de votre Bulletin n°3.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 3 dans Mon Suivi en Direct →</button>`,
      '#track-3': `<span class="tc-pill">Voie 4 • Visa Conjoint Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009)</span>
        <h2>Procédure Graduée (Tahalich Medurag), Permis B/1 & Teudat Zehut A/5</h2>
        <p class="tc-lead">Pour les citoyens israéliens parrainant un conjoint étranger (marié ou concubin / Yeduim BeTzibur) :</p>
        <ul class="tc-list">
          <li><strong>📱 L'Interrogatoire Séparé de 80 Questions :</strong> Préparez votre entretien de sincérité grâce à notre simulateur de synchronisation dans l'application.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 4 dans Mon Suivi en Direct →</button>`
    },
    es: {
      '#track-0': `<span class="tc-pill">Vía 1 • Salida de Emergencia y Shinui Ma'amad (En Israel)</span>
        <h2>Aliyá de Emergencia Desde Israel y Carpeta «Go-Bag» (Hispanoablantes)</h2>
        <p class="tc-lead">Saltee los 9 meses de espera consular. Entre con visa B/2 y tramite su cambio de estatus (<em>Shinui Ma'amad</em>) en el Misrad HaPanim con sus originales apostillados:</p>
        <ul class="tc-list">
          <li><strong>📋 Requisitos España y Latinoamérica :</strong> Traiga 2 originales con <strong>Apostilla de La Haya</strong> de su <strong>Partida / Acta de Nacimiento Literal (Copia Fiel del Libro)</strong>, su <strong>Certificado de Antecedentes Penales Federal (Ministerio de Justicia / RNR)</strong> (<180 días), su <strong>Fe de Soltería / Acta de Matrimonio</strong>, y su <strong>Ishur Yahadut</strong> ortodoxo.</li>
          <li><strong>🏥 Primeros 60–90 Días Sin Teudat Zehut :</strong> Active de inmediato su <span class="term-link" onclick="openTerm('bridge_health')">Seguro Médico Privado Puente de 60–90 Días (Maccabi/Clalit) ⓘ</span> con su pasaporte extranjero.</li>
          <li><strong>💸 Pagar Alquiler en Shekels (₪) Sin Cuenta Bancaria Israelí :</strong> Evite el recargo bancario del 3,2% y los bloqueos usando nuestro <span class="term-link" onclick="openTerm('fx_shield')">Puente de Pago en Shekels y Divisas para Aliyá Sin Teudat Zehut ⓘ</span>.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 1 en Mi Rastreador en Vivo →</button>`,
      '#track-1': `<span class="tc-pill">Vía 2 • Cortes Ortodoxas Privadas (Gush Etzion, Bnei Brak)</span>
        <h2>Conversión Ortodoxa Independiente, Rabanut y Aliyá</h2>
        <p class="tc-lead">Válida para Aliyá bajo la Ley del Retorno (fallo Dahan), con pasos clave para casarse por la Rabanut y cuidar su Sal Klitá:</p>
        <ul class="tc-list">
          <li><strong>🕍 Validación del Beit HaDin HaGadol (Ishur Guiur) :</strong> Requisito indispensable para registrar matrimonios en la Rabanut.</li>
          <li><strong>💰 Proteja los 21.700+ ₪ del Sal Klitá :</strong> No supere 24 meses acumulados en Israel como turista en los últimos 3 años.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 2 en Mi Rastreador en Vivo →</button>`,
      '#track-2': `<span class="tc-pill">Vía 3 • Conversión Estatal (Nativ) y Comité de Excepciones</span>
        <h2>Aprobar la Va'adat Jariguim (Formulario Ash/1) desde Visa de Turista</h2>
        <p class="tc-lead">Cómo superar la barrera legal para turistas B/2 e ingresar al Guiur estatal oficial:</p>
        <ul class="tc-list">
          <li><strong>⚖️ Dossier Ash/1 en Hebreo :</strong> Presente su <em>Mijtav Hesber</em> legal en hebreo y cartas rabínicas selladas antes de que venzan los 180 días de sus Antecedentes Penales.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 3 en Mi Rastreador en Vivo →</button>`,
      '#track-3': `<span class="tc-pill">Vía 4 • Visa de Pareja Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009)</span>
        <h2>Residencia Gradual (Tahalij Medurag), Permiso B/1 y Teudat Zehut A/5</h2>
        <p class="tc-lead">Para ciudadanos israelíes en pareja con extranjeros (casados o convivencia / Yeduim BeTzibur):</p>
        <ul class="tc-list">
          <li><strong>📱 Interrogatorio Separado de 80 Preguntas :</strong> Entrene con nuestro simulador de pareja para aprobar la entrevista de sinceridad.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 4 en Mi Rastreador en Vivo →</button>`
    },
    de: {
      '#track-0': `<span class="tc-pill">Weg 1 • Notfall-Alija & Schinui Ma'amad (In Israel)</span>
        <h2>Notfall-Alija in Israel & „Go-Bag“-Ordner (Deutschland / Österreich / Schweiz)</h2>
        <p class="tc-lead">Überspringen Sie 9 Monate Konsulats-Wartezeit. Reisen Sie mit B/2-Visum ein und beantragen Sie den Statuswechsel (<em>Schinui Ma'amad</em>) direkt im Misrad HaPanim:</p>
        <ul class="tc-list">
          <li><strong>📋 DACH-Dokumenten-Spezifika :</strong> Bringen Sie je 2 Originale mit: <strong>Beglaubigte Abschrift aus dem Geburtenregister</strong> (keine einfache Geburtsurkunde!), <strong>Erweitertes Führungszeugnis</strong> mit <strong>BfAA-Apostille</strong> (<180 Tage), <strong>Erweiterte Meldebescheinigung / Ehefähigkeitszeugnis</strong> mit Apostille und Ihren orthodoxen <strong>Ischur Jahadut</strong>.</li>
          <li><strong>🏥 Die Ersten 60–90 Tage Ohne Teudat Zehut :</strong> Aktivieren Sie sofort Ihre <span class="term-link" onclick="openTerm('bridge_health')">Private 60–90 Tage Überbrückungs-Krankenversicherung (Maccabi/Clalit) ⓘ</span>.</li>
          <li><strong>💸 Miete in Schekel (₪) Zahlen Ohne Israelisches Bankkonto :</strong> Sparen Sie ~3,2% Bankgebühren mit unserer <span class="term-link" onclick="openTerm('fx_shield')">Schekel-Mietzahlungs- & Währungsbrücke Ohne Teudat Zehut ⓘ</span>.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 1 in Meinen Live-Tracker Laden →</button>`,
      '#track-1': `<span class="tc-pill">Weg 2 • Private Orthodoxe Rabbinatsgerichte (Gush Etzion, Bnei Brak)</span>
        <h2>Unabhängiger Orthodoxer Giur, Rabbinats-Hochzeit & Alija</h2>
        <p class="tc-lead">Anerkannt für das Rückkehrgesetz (Dahan-Urteil), mit klarem Fahrplan für Oberrabbinat und Sal Klita:</p>
        <ul class="tc-list">
          <li><strong>🕍 Validierung durch das Beit HaDin HaGadol (Ischur Giur) :</strong> Pflicht für die spätere Eheschließung über das israelische Rabbinat.</li>
          <li><strong>💰 Schutz des Sal Klita (21.700+ ₪) :</strong> Nicht mehr als 24 kumulierte Monate als Tourist in Israel in den letzten 3 Jahren verbringen.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 2 in Meinen Live-Tracker Laden →</button>`,
      '#track-2': `<span class="tc-pill">Weg 3 • Staatlicher Giur (Nativ) & Ausnahmekomitee</span>
        <h2>Va'adat Charigim (Formular Asch/1) mit Touristenvisum Bestehen</h2>
        <p class="tc-lead">So überwinden B/2-Touristen und Studenten die gesetzliche Sperre für das staatliche Konversionsprogramm:</p>
        <ul class="tc-list">
          <li><strong>⚖️ Das Hebräische Asch/1-Dossier :</strong> Reichen Sie Ihren juristischen <em>Michtav Hesber</em> auf Hebräisch vor Ablauf der 180-Tage-Frist Ihres Führungszeugnisses ein.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 3 in Meinen Live-Tracker Laden →</button>`,
      '#track-3': `<span class="tc-pill">Weg 4 • Ehepartner-Visum Misrad HaPanim (Nohal 5.2.0008 / 5.2.0009)</span>
        <h2>Stufenverfahren (Tachalich Medurag), B/1 Arbeitserlaubnis & A/5 Teudat Zehut</h2>
        <p class="tc-lead">Für israelische Staatsbürger mit ausländischem Ehepartner oder Lebensgefährten (Jeduim BeTzibur):</p>
        <ul class="tc-list">
          <li><strong>📱 Das Getrennte 80-Fragen-Interview :</strong> Üben Sie alle 80 Fragen vorab mit unserem Paar-Simulator in der App.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 4 in Meinen Live-Tracker Laden →</button>`
    }
  };
})();