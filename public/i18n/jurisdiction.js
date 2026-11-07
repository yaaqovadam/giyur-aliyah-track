(function() {
  window.JURISDICTION_DATA = {
    en: {
      flag: "🇺🇸/🇬🇧/🇨🇦", label: "EN", name: "English (US / UK / Canada)",
      police: "US: FBI Identity History Summary (180d) | UK: ACRO Police Certificate | CA: RCMP Certified Criminal Record Check",
      birth: "Long-Form 'Vault' Birth Certificate listing both parents (No short-form abstracts)",
      single: "US: Notarized Single-Status Affidavit / County Clerk No-Record Search | UK: CNI / Solicitor Statutory Declaration | CA: Provincial Marriage Search",
      rabbi: "Orthodox Proof of Judaism (Ishur Yahadut — RCA / London Beth Din / COR) on Official Letterhead",
      apostille: "US: State Secretary of State / US Dept of State (for FBI) | UK: FCDO Legalisation Office | CA: Global Affairs / Provincial Competent Authority"
    },
    he: {
      flag: "🇮🇱", label: "עב", name: "עברית (ישראל וחו״ל)",
      police: "תעודת יושר פדרלית (FBI בארה״ב / ACRO בבריטניה / RCMP בקנדה / מרשם פלילי אירופאי) בתוקף 180 יום",
      birth: "תעודת לידה מקורית מורחבת (Long-Form Vault) הכוללת את שמות שני ההורים",
      single: "תמצית רישום / תצהיר רווקות או פנויות נוטריוני מאומת בחותמת אפוסטיל",
      rabbi: "אישור יהדות מרב אורתודוקסי מוכר (RCA / בד״ץ לונדון / קונסיסטואר) על נייר לוגו רשמי",
      apostille: "חותמת אפוסטיל רשמית (מזכיר המדינה / משרד החוץ הפדרלי לחתימת FBI / FCDO / נוטריונים בצרפת)"
    },
    fr: {
      flag: "🇫🇷/🇧🇪/🇨🇭", label: "FR", name: "Français (France / Belgique / Suisse)",
      police: "FR : Bulletin n°3 du Casier Judiciaire National (Nantes, <180j) | BE : Extrait Modèle 595 | CH : Extrait du Casier Judiciaire (VOSTRA)",
      birth: "Copie Intégrale d'Acte de Naissance (Mairie — Attention : un simple Extrait est systématiquement refusé !)",
      single: "Certificat de Célibat / Capacité à Mariage / Coutume + Livret de Famille apostillé",
      rabbi: "Attestation de Judaïté officielle du Consistoire (Beth Din de Paris/Lyon / CIB Bruxelles / CIG Genève)",
      apostille: "FR : Chambres des Notaires de France (Téléprocédure APOSTILLE 2025/2026) | BE : SPF Affaires étrangères | CH : Chancellerie fédérale"
    },
    es: {
      flag: "🇪🇸/🇦🇷/🇲🇽", label: "ES", name: "Español (España y Latinoamérica)",
      police: "ES : Certificado de Antecedentes Penales (Min. de Justicia) | AR : Certificado RNR (Reincidencia) | MX : Constancia Federal (OADPRS)",
      birth: "Partida / Acta de Nacimiento Literal (Registro Civil / RENAPER — Copia Fiel del Libro, NUNCA en extracto)",
      single: "Fe de Soltería / Certificación Negativa de Matrimonio / Declaración Jurada de Estado Civil apostillada",
      rabbi: "Certificado de Judaísmo (Ishur Yahadut) de Rabinato Ortodoxo reconocido (FCJE / AMIA Buenos Aires / Maguén David)",
      apostille: "Apostilla de La Haya (ES : Apostilla Electrónica Min. Justicia / Notarios | AR : Cancillería TAD | MX : SEGOB Federal)"
    },
    de: {
      flag: "🇩🇪/🇦🇹/🇨🇭", label: "DE", name: "Deutsch (Deutschland / Österreich / Schweiz)",
      police: "DE : Führungszeugnis (Bundesamt für Justiz Bonn, <180T) | AT : Strafregisterbescheinigung | CH : Privatauszug aus dem Strafregister",
      birth: "Beglaubigte Abschrift aus dem Geburtenregister (Standesamt — NICHT einfache Geburtsurkunde!)",
      single: "DE : Erweiterte Meldebescheinigung (mit Familienstand: ledig) / Ehefähigkeitszeugnis | AT : Ledigkeitsbescheinigung",
      rabbi: "Ischur Jahadut einer anerkannten orthodoxen Rabbinatskonferenz (ORD Deutschland / IKG Wien / IRG Zürich)",
      apostille: "DE : BfAA (Bundesamt für Auswärtige Angelegenheiten für Führungszeugnis) & Landgericht/Regierungspräsidium | AT : BMEIA | CH : Bundeskanzlei"
    }
  };

  window.OBSTACLE_I18N = {
    fr: [
      {
        tag: "CASE 1 SUR 9 • LA VUE D'ENSEMBLE DE A À Z",
        title: "Comment Conversion (Giyur), Aliyah, Rabbanut & Misrad HaPanim S'articulent.",
        body: "Sous l'arrêt Dahan de la Cour Suprême, un tribunal orthodoxe privé (Gush Etzion, Bnei Brak) est reconnu pour la Loi du Retour si le candidat détenait un visa de résident/étudiant longue durée — mais un touriste (B/2) converti en privé est bloqué au Misrad HaPanim sans procédure conjoint (Nohal 5.2.0008), 9 mois en communauté à l'étranger, ou validation du Grand Rabbinat (Ishur Giyur).",
        badTitle: "🛡️ La Vérité des Deux Gardiens (Rabbanut + Misrad HaPanim) :",
        badText: "• Le Grand Rabbinat et le Misrad HaPanim agissent comme deux filtres de sécurité indépendants. Se tromper de voie dès le départ fait perdre 3 à 4 ans.",
        goodTitle: "⚡ Choisissez Votre Voie Dès le Jour 1 (Les 4 Voies) :",
        goodText: "• Voie 1 : Aliyah d'Urgence en Israël (Shinui Ma'amad + Dossier Go-Bag).<br>• Voie 2 : Beit Din Privé (Gush Etzion) + Ishur Giyur.<br>• Voie 3 : Giyur d'État (Nativ) via Va'adat Charigim (Formulaire Ash/1).<br>• Voie 4 : Visa Conjoint (Nohal 5.2.0008 / 5.2.0009).",
        time: "⏱️ Économise 3 à 4+ ans de labyrinthe"
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
        tag: "GUÍA 1 DE 9 • EL PANORAMA COMPLETO DE A A Z",
        title: "Cómo se Conectan Conversión (Guiur), Aliyá, la Rabanut y el Misrad HaPanim.",
        body: "Bajo el fallo Dahan de la Corte Suprema, un Beit Din ortodoxo privado (Gush Etzion, Bnei Brak) califica para la Ley del Retorno con visa de larga duración — pero un turista (B/2) convertido en privado enfrenta el bloqueo del Misrad HaPanim salvo que articule Residencia de Pareja (Nohal 5.2.0008), 9 meses en comunidad en el exterior, o validación del Gran Rabinato (Ishur Guiur).",
        badTitle: "🛡️ La Verdad del Doble Filtro (Rabanut + Misrad HaPanim) :",
        badText: "• La Rabanut y el Misrad HaPanim operan como dos filtros de seguridad separados. Elegir la vía equivocada cuesta de 3 a 4 años.",
        goodTitle: "⚡ Elija la Vía Correcta Desde el Día 1 (Las 4 Vías) :",
        goodText: "• Vía 1: Aliyá de Emergencia en Israel (Shinui Ma'amad + Carpeta Go-Bag).<br>• Vía 2: Beit Din Privado (Gush Etzion) + Ishur Guiur.<br>• Vía 3: Guiur Estatal (Nativ) vía Va'adat Jariguim (Formulario Ash/1).<br>• Vía 4: Visa de Pareja (Nohal 5.2.0008 / 5.2.0009).",
        time: "⏱️ Ahorra de 3 a 4+ años de trámites"
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
        tag: "BOX 1 VON 9 • DER A-BIS-Z GESAMTÜBERBLICK",
        title: "Wie Konversion (Giur), Alija, Rabbinat & Misrad HaPanim Zusammenhängen.",
        body: "Nach dem Dahan-Urteil des Obersten Gerichtshofs berechtigen anerkannte private orthodoxe Gerichte (Gush Etzion, Bnei Brak) zur Alija bei regulärem Langzeitvisum — doch B/2-Touristen stoßen beim Misrad HaPanim auf Sicherheitsblockaden, sofern sie nicht über das Partnerverfahren (Nohal 5.2.0008), 9 Monate Auslands-Gemeinde oder die Oberrabbinats-Validierung (Ischur Giur) gehen.",
        badTitle: "🛡️ Die Wahrheit der Doppelten Sicherheitsprüfung :",
        badText: "• Oberrabbinat und Misrad HaPanim prüfen getrennt. Wer auf dem falschen Weg startet, verliert 3 bis 4 Jahre.",
        goodTitle: "⚡ Wählen Sie ab Tag 1 den Richtigen der 4 Wege :",
        goodText: "• Weg 1: Notfall-Alija in Israel (Schinui Ma'amad + Go-Bag-Ordner).<br>• Weg 2: Privates Beit Din (Gush Etzion) + Ischur Giur.<br>• Weg 3: Staatlicher Giur (Nativ) über Va'adat Charigim (Formular Asch/1).<br>• Weg 4: Ehepartner-Visum (Nohal 5.2.0008 / 5.2.0009).",
        time: "⏱️ Spart 3 bis 4+ Jahre Bürokratie"
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
        <p class="tc-lead"><strong>Les Juifs de naissance n'ont AUCUN délai d'attente légal — uniquement l'embouteillage administratif consulaire !</strong> Entrez avec un visa B/2 et faites votre changement de statut (<em>Shinui Ma'amad</em>) directement au Misrad HaPanim grâce à vos originaux apostillés :</p>
        <ul class="tc-list">
          <li><strong>🎒 La Règle du « Pont Sans Retour » (2 Originaux Apostillés) :</strong> Emportez 2 originaux de chacune des <span class="term-link" onclick="openTerm('go_bag')">7 Pièces Obligatoires du Dossier Go-Bag ⓘ</span> : <strong>Copie Intégrale d'Acte de Naissance</strong> (jamais un simple <em>Extrait</em> !), <strong>Bulletin n°3 du Casier Judiciaire National</strong> apostillé (<180j), <strong>Livret de Famille / Célibat</strong> apostillé, et <strong>Attestation du Consistoire</strong>.</li>
          <li><strong>✈️ Franchir le Contrôle Frontière à Ben Gourion (Bikoret Gvulot) :</strong> Ne vous présentez jamais avec un billet aller simple sans visa. Suivez notre protocole légal billet retour, ETA-IL et entrée couple mixte.</li>
          <li><strong>🏥 Survivre vos 60–90 Premiers Jours Sans Teudat Zehut :</strong> Avant l'obtention de votre numéro d'identité, activez votre <span class="term-link" onclick="openTerm('bridge_health')">Assurance Santé Privée Transitoire 60–90 Jours (Accès Maccabi/Clalit) ⓘ</span>.</li>
          <li><strong>💸 Payer un Propriétaire en Shekels (₪) Sans Compte Israélien :</strong> Les banques prélèvent ~3,2% de frais et bloquent les virements. Utilisez notre <span class="term-link" onclick="openTerm('fx_shield')">Pont de Paiement en Shekels & Change Aliyah Sans Teudat Zehut ⓘ</span> pour payer directement en ₪ et économiser ~2 500 $ par 100 000 $.</li>
          <li><strong>🛡️ Protocole d'Urgence Antisémitisme & Dérogation aux 9 Mois :</strong> Forcé de partir tôt face à l'antisémitisme ? Demandez une dérogation humanitaire aux 9 mois post-Mikvé ou un <strong>Dossier de Transfert Beit Din (Tik Ha'avarah)</strong> + <em>Va'adat Charigim</em> accélérée.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 1 dans Mon Suivi en Direct →</button>`,
      '#track-1': `<span class="tc-pill">Voie 2 • Devenir 100% Juif Halakhique Plus Vite (Gush Etzion, Bnei Brak)</span>
        <h2>Beit Din Orthodoxe Privé (Gush Etzion, Bnei Brak & Validation Rabbanut)</h2>
        <p class="tc-lead"><strong>Idéal pour devenir 100% juif selon la Halakha sans attendre des années les guichetiers !</strong> Excellent pour les étudiants ou les couples souhaitant une Houppa casher maintenant avant de valider au Grand Rabbinat :</p>
        <ul class="tc-list">
          <li><strong>💸 Le Piège des 24 Mois du Sal Klita (~21 700 ₪ en Jeu !) :</strong> Dépasser <strong>24 mois cumulés en Israël</strong> sur les 3 ans précédant la Teudat Oleh annule votre prime d'intégration Sal Klita !</li>
          <li><strong>🛡️ L'Arrêt Dahan vs Le Mur Touristique B/2 :</strong> Si l'arrêt Dahan reconnaît les tribunaux privés (Gush Etzion / Bnei Brak) avec un visa résident/étudiant longue durée, un touriste B/2 reste bloqué au Misrad HaPanim sans procédure conjoint (Nohal 5.2.0008), 9 mois en communauté ou validation Rabbanut.</li>
          <li><strong>⚡ Zéro Apostille Requise à l'Ouverture :</strong> Aucun Bulletin n°3 ou Apostille n'est requis pour ouvrir un dossier privé ! Vous n'aurez besoin des <span class="term-link" onclick="openTerm('five_docs')">5 Pièces Apostillées Obligatoires ⓘ</span> que pour le pont vers le Rabbinat ou le Misrad HaPanim.</li>
          <li><strong>💣 Ne Laissez Jamais la Validation Inachevée :</strong> S'arrêter après le Mikvé sans <span class="term-link" onclick="openTerm('ishur_giyur')">Validation du Grand Rabbinat (Ishur Giyur) ⓘ</span> bloque le mariage au Rabbinat pour vous et vos futurs enfants.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 2 dans Mon Suivi en Direct →</button>`,
      '#track-2': `<span class="tc-pill">Voie 3 • Conversion d'État Officielle & Aliyah Loi du Retour</span>
        <h2>Giyur d'État (Nativ / Ma'arach HaGiyur) & Grand Rabbinat</h2>
        <p class="tc-lead">La voie gouvernementale officielle qui ouvre droit à la citoyenneté israélienne (Aliyah) dès l'immersion au Mikvé :</p>
        <ul class="tc-list">
          <li><strong>✈️ Faut-il Rentrer Chercher ses Pièces ? (Horloge 180j & 3 Profils) :</strong> Si vous avez déjà vos 5 pièces apostillées, restez en Israël ! Sinon, vérifiez les <span class="term-link" onclick="openTerm('five_docs')">5 Pièces Apostillées & les 3 Profils Aliyah/Giyur ⓘ</span> avant l'expiration des <strong>180 jours</strong>.</li>
          <li><strong>⚠️ Le Mur Touristique/Étudiant (Va'adat Charigim) :</strong> Les non-citoyens doivent d'abord obtenir l'accord du <span class="term-link" onclick="openTerm('vaadat_charigim')">Comité des Exceptions (Formulaire Ash/1) ⓘ</span>.</li>
          <li><strong>Pourquoi 70% des Demandes Échouent :</strong> Soumettre un récit émotionnel en français au lieu d'un <em>Michtav Hesber</em> juridique en hébreu + <span class="term-link" onclick="openTerm('community_letters')">5 à 8+ Lettres Tamponnées de Rabbin & Communauté ⓘ</span>.</li>
          <li><strong>L'Obstacle de l'Examen Final :</strong> Réussir l'audience devant les 3 Dayanim sur les 150 questions de Halakha et les 12 chants de Chabbat.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 3 dans Mon Suivi en Direct →</button>`,
      '#track-3': `<span class="tc-pill">Voie 4 • Résidence Conjoint (Tahalich Medurag) & Changement de Statut</span>
        <h2>Visa Civil Misrad HaPanim, Teudat Zehut A/5 & Citoyenneté</h2>
        <p class="tc-lead">Géré par le Ministère de l'Intérieur pour les conjoints/partenaires d'Israéliens (Formulaire Ash/3 — Nohal 5.2.0008 / 5.2.0009) :</p>
        <ul class="tc-list">
          <li><strong>🪤 La Boucle des Guichetiers de 2 Ans :</strong> Votre compteur de 4,5 à 7 ans ne démarre que lorsque le dossier est déclaré « Complet ». Les guichetiers réclament les pièces au compte-gouttes jusqu'à l'expiration de vos Apostilles à <strong>180 jours</strong>.</li>
          <li><strong>🌍 La Règle Universelle des « 3 Paniers » de Police :</strong> Exige un Casier Judiciaire apostillé (Bulletin n°3) pour (1) le pays de naissance, (2) chaque nationalité, et (3) tout pays vécu >12 mois depuis l'âge de 14 ans.</li>
          <li><strong>🕵️‍♂️ L'Interrogatoire Séparé de 80 Questions :</strong> Organisé chaque année dans deux pièces séparées avant le renouvellement du permis B/1 ou de la Teudat Zehut A/5.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Charger la Voie 4 dans Mon Suivi en Direct →</button>`
    },
    es: {
      '#track-0': `<span class="tc-pill">Vía 1 • Salida de Emergencia y Shinui Ma'amad (En Israel)</span>
        <h2>Aliyá de Emergencia Desde Israel y Carpeta «Go-Bag» (Hispanoablantes)</h2>
        <p class="tc-lead"><strong>¡Los judíos de nacimiento tienen CERO período de espera legal — solo demoras consulares!</strong> Entre con visa B/2 y tramite su cambio de estatus (<em>Shinui Ma'amad</em>) en el Misrad HaPanim con sus originales apostillados:</p>
        <ul class="tc-list">
          <li><strong>🎒 La Regla del «Puente Sin Retorno» (2 Originales Apostillados) :</strong> Traiga 2 originales con <strong>Apostilla de La Haya</strong> de los <span class="term-link" onclick="openTerm('go_bag')">7 Documentos Obligatorios Go-Bag ⓘ</span>: <strong>Partida Literal de Nacimiento</strong> (nunca en extracto), <strong>Antecedentes Penales Federales (Justicia / RNR)</strong> (<180d), <strong>Fe de Soltería / Matrimonio</strong>, e <strong>Ishur Yahadut</strong>.</li>
          <li><strong>✈️ Cruzar Control Fronterizo en Ben Gurión (Bikoret Gvulot) :</strong> Nunca viaje con pasaje solo de ida sin visa. Siga nuestro protocolo legal de pasaje de regreso, ETA-IL e ingreso de parejas mixtas.</li>
          <li><strong>🏥 Primeros 60–90 Días Sin Teudat Zehut :</strong> Active de inmediato su <span class="term-link" onclick="openTerm('bridge_health')">Seguro Médico Privado Puente de 60–90 Días (Maccabi/Clalit) ⓘ</span> con su pasaporte extranjero.</li>
          <li><strong>💸 Pagar Alquiler en Shekels (₪) Sin Cuenta Bancaria Israelí :</strong> Evite el recargo bancario del 3,2% usando nuestro <span class="term-link" onclick="openTerm('fx_shield')">Puente de Pago en Shekels y Divisas para Aliyá Sin Teudat Zehut ⓘ</span>.</li>
          <li><strong>🛡️ Protocolo de Emergencia por Antisemitismo y Exención de 9 Meses :</strong> ¿Obligado a salir antes por antisemitismo? Solicite una exención humanitaria a los 9 meses post-Mikve o traiga una <strong>Carpeta de Transferencia Beit Din (Tik Ha'avará)</strong> + <em>Va'adat Jariguim</em> (Ash/1).</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 1 en Mi Rastreador en Vivo →</button>`,
      '#track-1': `<span class="tc-pill">Vía 2 • Ser 100% Judío Halájico Más Rápido (Gush Etzion, Bnei Brak)</span>
        <h2>Beit Din Ortodoxo Privado (Gush Etzion, Bnei Brak y Validación Rabanut)</h2>
        <p class="tc-lead"><strong>¡Ideal para ser 100% judío según la Halajá sin esperar años a los funcionarios!</strong> Excelente para estudiantes o parejas que buscan una Jupá kasher ahora y validar ante el Gran Rabinato después:</p>
        <ul class="tc-list">
          <li><strong>💸 El Abismo de 24 Meses del Sal Klitá (~21.700 ₪ en Juego!) :</strong> Superar <strong>24 meses acumulados en Israel</strong> en los 3 años previos a la Teudat Olé cancela su beca económica Sal Klitá.</li>
          <li><strong>🛡️ El Fallo Dahan vs. La Barrera de Turista B/2 :</strong> Mientras el fallo Dahan reconoce cortes privadas con visa de larga duración, los turistas B/2 enfrentan bloqueos en el Misrad HaPanim salvo que articulen Residencia de Pareja (Nohal 5.2.0008), 9 meses en comunidad o validación Rabanut.</li>
          <li><strong>⚡ Cero Apostillas Para Empezar :</strong> Abrir expediente en un Beit Din privado no requiere Antecedentes Penales ni Apostillas. Solo necesitará los <span class="term-link" onclick="openTerm('five_docs')">5 Documentos Apostillados Obligatorios ⓘ</span> al pasar a la Rabanut o al Misrad HaPanim.</li>
          <li><strong>💣 Nunca Deje la Validación a Medias :</strong> Detenerse tras la Mikve sin la <span class="term-link" onclick="openTerm('ishur_giyur')">Validación del Gran Rabinato (Ishur Guiur) ⓘ</span> bloquea las bodas por la Rabanut para usted y sus futuros hijos.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 2 en Mi Rastreador en Vivo →</button>`,
      '#track-2': `<span class="tc-pill">Vía 3 • Conversión Estatal Oficial y Aliyá por Ley del Retorno</span>
        <h2>Guiur Estatal (Nativ / Ma'araj HaGuiur) y Gran Rabinato</h2>
        <p class="tc-lead">La vía oficial del gobierno que otorga ciudadanía por la Ley del Retorno inmediatamente al finalizar:</p>
        <ul class="tc-list">
          <li><strong>✈️ ¿Necesita Volar a Casa por Documentos? (Reloj 180d y 3 Perfiles) :</strong> Si ya trajo sus 5 documentos apostillados, ¡está listo! Si no, revise los <span class="term-link" onclick="openTerm('five_docs')">5 Documentos Apostillados y los 3 Perfiles de Aliyá/Guiur ⓘ</span> antes de que venzan los <strong>180 días</strong>.</li>
          <li><strong>⚠️ La Barrera de Turista/Estudiante (Va'adat Jariguim) :</strong> Los no ciudadanos deben aprobar primero el <span class="term-link" onclick="openTerm('vaadat_charigim')">Comité de Excepciones (Formulario Ash/1) ⓘ</span>.</li>
          <li><strong>Por Qué Fracasa el 70% de Solicitudes :</strong> Presentar una historia emocional en vez de un <em>Mijtav Hesber</em> legal en hebreo + <span class="term-link" onclick="openTerm('community_letters')">5 a 8+ Cartas Selladas de Rabino y Comunidad ⓘ</span>.</li>
          <li><strong>El Examen del Tribunal :</strong> Aprobar ante los 3 Dayanim las 150 preguntas de Halajá y los 12 cantos de Shabat.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 3 en Mi Rastreador en Vivo →</button>`,
      '#track-3': `<span class="tc-pill">Vía 4 • Residencia de Pareja (Tahalij Medurag) y Cambio de Estatus</span>
        <h2>Visa Civil Misrad HaPanim, Teudat Zehut A/5 y Ciudadanía</h2>
        <p class="tc-lead">Gestionado por el Ministerio del Interior para cónyuges/parejas de israelíes (Formulario Ash/3 — Nohal 5.2.0008 / 5.2.0009):</p>
        <ul class="tc-list">
          <li><strong>🪤 El Bucle de 2 Años de los Funcionarios :</strong> Su reloj de 4,5 a 7 años no empieza hasta que el funcionario marca el expediente como «Completo». Piden documentos en cuotas hasta que sus Apostillas caducan a los <strong>180 días</strong>.</li>
          <li><strong>🌍 La Regla de los «3 Países» de Antecedentes Penales :</strong> Exige Antecedentes Penales Federales apostillados de (1) País de nacimiento, (2) Toda ciudadanía, y (3) Todo país donde vivió >12 meses desde los 14 años.</li>
          <li><strong>🕵️‍♂️ Interrogatorio Separado de 80 Preguntas :</strong> Realizado cada año en salas separadas antes de renovar su visa B/1 o Teudat Zehut A/5.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Cargar Vía 4 en Mi Rastreador en Vivo →</button>`
    },
    de: {
      '#track-0': `<span class="tc-pill">Weg 1 • Notfall-Alija & Schinui Ma'amad (In Israel)</span>
        <h2>Notfall-Alija in Israel & „Go-Bag“-Ordner (Deutschland / Österreich / Schweiz)</h2>
        <p class="tc-lead"><strong>Geborene Juden haben NULL gesetzliche Wartezeit — nur den bürokratischen Konsulats-Stau!</strong> Reisen Sie mit B/2-Visum ein und beantragen Sie den Statuswechsel (<em>Schinui Ma'amad</em>) direkt im Misrad HaPanim:</p>
        <ul class="tc-list">
          <li><strong>🎒 Die „Einbahnstraßen-Regel“ (Je 2 Apostillierte Originale) :</strong> Bringen Sie je 2 Originale aller <span class="term-link" onclick="openTerm('go_bag')">7 Pflichtdokumente im Go-Bag ⓘ</span> mit: <strong>Beglaubigte Abschrift aus dem Geburtenregister</strong> (keine einfache Geburtsurkunde!), <strong>Führungszeugnis (BfJ Bonn) + BfAA-Apostille</strong> (<180T), <strong>Erweiterte Meldebescheinigung (Ledigkeit)</strong> und <strong>Ischur Jahadut (ORD/IKG/SIG)</strong>.</li>
          <li><strong>✈️ Grenzkontrolle am Flughafen Ben Gurion (Bikoret Gvulot) :</strong> Niemals ohne Visum mit One-Way-Ticket reisen. Nutzen Sie unser Rückflug-, ETA-IL- und Paar-Einreiseprotokoll.</li>
          <li><strong>🏥 Die Ersten 60–90 Tage Ohne Teudat Zehut :</strong> Aktivieren Sie sofort Ihre <span class="term-link" onclick="openTerm('bridge_health')">Private 60–90 Tage Überbrückungs-Krankenversicherung (Maccabi/Clalit) ⓘ</span>.</li>
          <li><strong>💸 Miete in Schekel (₪) Zahlen Ohne Israelisches Bankkonto :</strong> Sparen Sie ~3,2% Bankgebühren mit unserer <span class="term-link" onclick="openTerm('fx_shield')">Schekel-Mietzahlungs- & Währungsbrücke Ohne Teudat Zehut ⓘ</span>.</li>
          <li><strong>🛡️ Antisemitismus-Notfallprotokoll & 9-Monats-Ausnahme :</strong> Wegen Antisemitismus zur vorzeitigen Ausreise gezwungen? Beantragen Sie eine humanitäre Ausnahme von der 9-Monats-Regel nach der Mikwe oder bringen Sie ein <strong>Beit-Din-Übertragungsdossier (Tik Ha'awara)</strong> mit.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 1 in Meinen Live-Tracker Laden →</button>`,
      '#track-1': `<span class="tc-pill">Weg 2 • Schneller 100% Halachisch Jüdisch Werden (Gush Etzion, Bnei Brak)</span>
        <h2>Privates Orthodoxes Beit Din (Gush Etzion, Bnei Brak & Rabbinats-Validierung)</h2>
        <p class="tc-lead"><strong>Ideal, um ohne jahrelange Behörden-Wartezeit 100% halachisch jüdisch zu werden!</strong> Perfekt für Studenten oder Paare, die jetzt eine koschere Chuppa wünschen und später die Oberrabbinats-Validierung ergänzen:</p>
        <ul class="tc-list">
          <li><strong>💸 Die 24-Monats-Falle beim Sal Klita (~21.700 ₪ auf dem Spiel!) :</strong> Wer in den 3 Jahren vor der Teudat Oleh über <strong>24 kumulierte Monate in Israel</strong> verbringt, verliert den Sal-Klita-Zuschuss komplett!</li>
          <li><strong>🛡️ Das Dahan-Urteil vs. Die B/2-Touristen-Sperre :</strong> Während das Dahan-Urteil private Gerichte mit Langzeitvisum für die Alija anerkennt, werden B/2-Touristen beim Misrad HaPanim ohne Partnerverfahren (Nohal 5.2.0008), 9 Monate Auslands-Gemeinde oder Rabbinats-Validierung blockiert.</li>
          <li><strong>⚡ Null Apostillen-Bürokratie beim Start :</strong> Für die Eröffnung beim privaten Beit Din sind keine Führungszeugnisse oder Apostillen nötig! Sie benötigen die <span class="term-link" onclick="openTerm('five_docs')">5 Apostillierten Pflichtdokumente ⓘ</span> erst für das Rabbinat oder Misrad HaPanim.</li>
          <li><strong>💣 Validierung Niemals Halbfertig Lassen :</strong> Wer nach der Mikwe ohne <span class="term-link" onclick="openTerm('ishur_giyur')">Oberrabbinats-Validierung (Ischur Giur) ⓘ</span> stoppt, blockiert Rabbinats-Hochzeiten für sich und zukünftige Kinder.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 2 in Meinen Live-Tracker Laden →</button>`,
      '#track-2': `<span class="tc-pill">Weg 3 • Offizieller Staatlicher Giur & Rückkehrgesetz-Alija</span>
        <h2>Staatlicher Giur (Nativ / Ma'arach HaGiur) & Oberrabbinat</h2>
        <p class="tc-lead">Der offizielle staatliche Konversionsweg, der sofort nach Abschluss die israelische Staatsbürgerschaft (Alija) verleiht:</p>
        <ul class="tc-list">
          <li><strong>✈️ Nach Hause Fliegen für Dokumente? (180-Tage-Uhr & 3 Profile) :</strong> Haben Sie alle 5 apostillierten Dokumente dabei, sind Sie startklar! Prüfen Sie sonst die <span class="term-link" onclick="openTerm('five_docs')">5 Apostillierten Dokumente & 3 Alija-/Giur-Profile ⓘ</span> vor Ablauf der <strong>180-Tage-Frist</strong>.</li>
          <li><strong>⚠️ Die Touristen-/Studenten-Sperre (Va'adat Charigim) :</strong> Nicht-Staatsbürger benötigen zuerst die Zulassung durch das <span class="term-link" onclick="openTerm('vaadat_charigim')">Ausnahmekomitee (Formular Asch/1) ⓘ</span>.</li>
          <li><strong>Warum 70% der Anträge Scheitern :</strong> Ein emotionaler Brief auf Deutsch/Englisch statt eines juristischen <em>Michtav Hesber</em> auf Hebräisch + <span class="term-link" onclick="openTerm('community_letters')">5 bis 8+ Gestempelte Rabbiner- & Gemeindebriefe ⓘ</span>.</li>
          <li><strong>Die Prüfungs-Hürde :</strong> Bestehen vor den 3 Dayanim bei 150 Halacha-Fragen + 12 Schabbat-Liedern.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 3 in Meinen Live-Tracker Laden →</button>`,
      '#track-3': `<span class="tc-pill">Weg 4 • Ehepartner-Aufenthalt (Tachalich Medurag) & Statuswechsel</span>
        <h2>Misrad HaPanim Partner-Visum, A/5 Teudat Zehut & Staatsbürgerschaft</h2>
        <p class="tc-lead">Vom Innenministerium geführt für Ehepartner/Lebensgefährten von Israelis (Formular Asch/3 — Nohal 5.2.0008 / 5.2.0009):</p>
        <ul class="tc-list">
          <li><strong>🪤 Die 2-Jahres-Nachforderungsschleife :</strong> Ihre 4,5-bis-7-Jahres-Uhr startet erst, wenn die Akte als „Vollständig“ markiert wird. Sachbearbeiter fordern Dokumente einzeln nach, bis Ihre Apostillen nach <strong>180 Tagen</strong> ablaufen.</li>
          <li><strong>🌍 Die „3-Länder-Regel“ für Führungszeugnisse :</strong> Erfordert apostillierte Führungszeugnisse (BfAA) aus (1) Geburtsland, (2) jeder Staatsbürgerschaft und (3) jedem Land mit >12 Monaten Aufenthalt seit dem 14. Lebensjahr.</li>
          <li><strong>🕵️‍♂️ Getrenntes 80-Fragen-Verhör :</strong> Findet jährlich in getrennten Räumen vor der Verlängerung von B/1 oder A/5 Teudat Zehut statt.</li>
        </ul>
        <button class="btn-sky" onclick="switchTab(4)">Weg 4 in Meinen Live-Tracker Laden →</button>`
    }
  };

  window.TERM_DETAILS_I18N = {
    fr: {
      go_bag: {
        tag: "URGENCE ANTISÉMITISME • DOSSIER GO-BAG & SHINUI MA'AMAD",
        title: "Départ d'Urgence ? Emportez 2 Originaux Apostillés en Bagage Cabine",
        body: "Face à la montée de l'antisémitisme ou aux blocages consulaires, voici le protocole pour faire votre Aliyah ou transfert de Giyur directement en Israël (Shinui Ma'amad) :",
        badTitle: "🎒 Les 7 Pièces Obligatoires en Cabine (2 Exemplaires Apostillés !)",
        badText: "<ul><li><strong>1. Deux Copies Intégrales d'Acte de Naissance + Apostille</strong> (jamais un Extrait).</li><li><strong>2. Bulletin n°3 du Casier Judiciaire + Apostille</strong> (<180 jours).</li><li><strong>3. Certificat de Célibat / Livret de Famille + Apostille.</strong></li><li><strong>4. Attestation de Judaïté du Consistoire</strong> + Ketouba des parents.</li><li><strong>5. Procuration Notariée (Yipui Koach)</strong> laissée en France/BE/CH.</li><li><strong>6. Enfants & Animaux :</strong> Bulletins scolaires apostillés, carnets de vaccination et titrage antirabique.</li><li><strong>7. Changement de Nom & Dossier de Transfert Beit Din (Tik Ha'avarah) :</strong> Pour les convertis ou candidats fuyant l'antisémitisme (dérogation aux 9 mois).</li></ul>",
        goodTitle: "🛬 Protocole d'Urgence Antisémitisme & Dérogation aux 9 Mois",
        goodText: "<ul><li><strong>1. Juifs de naissance :</strong> Changement de statut (<em>Shinui Ma'amad</em>) immédiat en Israël.</li><li><strong>2. Nouveaux convertis & Candidats en cours :</strong> En cas d'insécurité ou d'antisémitisme aigu, demandez une <strong>Attestation d'Urgence & Dossier de Transfert (Tik Ha'avarah)</strong> sur papier à en-tête de votre Beit Din (Consistoire) pour solliciter une dérogation humanitaire à la règle des 9 mois post-Mikvé ou un passage accéléré devant la <em>Va'adat Charigim</em> (Formulaire Ash/1).</li></ul>",
        time: "⏱️ Sprint 7 Jours • 2x Originaux Apostillés • Dérogation d'Urgence"
      },
      five_docs: {
        tag: "LES 5 PIÈCES APOSTILLÉES, HORLOGE 180 JOURS & 3 PROFILS",
        title: "Vos 5 Pièces Francophones, la Règle des 24 Mois (Sal Klita) & Dérogation d'Urgence",
        body: "Le Misrad HaPanim applique une validité stricte de 180 jours sur votre Bulletin n°3 et votre Certificat de Célibat.",
        badTitle: "⏰ Les Pièces qui Expirent à 180 Jours",
        badText: "<ul><li><strong>Copie Intégrale, Bulletin n°3, Célibat/Mariage, Changement de nom.</strong> Si le Bulletin n°3 dépasse 180 jours, le guichetier refuse d'ouvrir le dossier.</li></ul>",
        goodTitle: "🧭 Les 3 Profils & Exception d'Urgence Antisémitisme",
        goodText: "<ul><li><strong>Profil 1 (Juif de naissance) :</strong> Gardez moins de 24 mois en Israël sur 3 ans avant l'Aliyah pour protéger vos ~21 700 ₪ de Sal Klita.</li><li><strong>Profil 2 (Converti à l'étranger) :</strong> Règle normale de 9 mois en communauté après le Mikvé — <strong>SAUF</strong> urgence sécuritaire/antisémitisme documentée par une lettre officielle de transfert de votre Beit Din pour demander une dérogation humanitaire.</li><li><strong>Profil 3 (Conversion en Israël via Va'adat Charigim) :</strong> Aucune obligation de séjour à l'étranger.</li></ul>",
        time: "⏱️ Bouclier 180 Jours • Protection Sal Klita • Dérogation 9 Mois"
      },
      fx_shield: {
        tag: "💸 Pont de Change Aliyah & Loyer en ₪ • Zéro Blocage Bancaire",
        title: "Payer votre Propriétaire en Shekels (₪) Sans Teudat Zehut",
        body: "Pendant vos 60–90 premiers jours en Israël sans Teudat Zehut, les banques prennent ~3,2% de frais et bloquent les virements.",
        badTitle: "❌ Le Piège des Banques Classiques (3,2% de Frais) :",
        badText: "• 3 200 € perdus par 100 000 € transférés + blocages de conformité.",
        goodTitle: "✅ Solution Escrow FX Israélienne Agréée (Économisez ~2,5%) :",
        goodText: "• Ouvrez un compte avec votre passeport étranger et payez directement votre propriétaire en ₪.<br><br><button class='btn-sky' style='background:#059669; margin-top:6px;' onclick='openFxPartner()'>Ouvrir le Pont Devises Aliyah & Économiser ~2,5% →</button>",
        time: "⏱️ Ouverture en 10 min • Passeport Étranger Uniquement"
      },
      bridge_health: {
        tag: "🏥 Assurance Santé Transitoire 60–90 Jours • Accès Maccabi / Clalit",
        title: "Couverture Médicale en Israël Sans Teudat Zehut",
        body: "Sans Teudat Zehut, une urgence à l'hôpital coûte 4 500 à 25 000+ ₪.",
        badTitle: "❌ Pourquoi l'Assurance Voyage Échoue :",
        badText: "• Ne couvre que le rapatriement et s'annule en cas d'installation.",
        goodTitle: "✅ Assurance Transitoire Touriste-vers-Oleh (Maccabi/Clalit) :",
        goodText: "• Carte magnétique médicale sur passeport étranger avec accès direct aux médecins Maccabi/Clalit.<br><br><button class='btn-sky' style='background:#0284c7; margin-top:6px;' onclick='openHealthPartner()'>Activer l'Assurance Transitoire 60–90 Jours →</button>",
        time: "⏱️ Police PDF Immédiate • Accès Direct Maccabi/Clalit"
      },
      vaadat_charigim: {
        tag: "COMITÉ DES EXCEPTIONS • VA'ADAT CHARIGIM (FORMULAIRE ASH/1)",
        title: "Passer le Comité des Exceptions comme Touriste ou Étudiant",
        body: "Débloquez l'accès au Giyur d'État avec vos 5 pièces apostillées, votre Michtav Hesber en hébreu et vos lettres de rabbin.",
        badTitle: "📋 Pièces Requises",
        badText: "<ul><li>5 pièces apostillées (<180j), Michtav Hesber en hébreu, lettres du Rav Melaveh et famille d'accueil avec n° de Teudat Zehut.</li></ul>",
        goodTitle: "⚡ Les 2 Étapes",
        goodText: "<ul><li>1) Filtre de sécurité Misrad HaPanim. 2) Entretien de sincérité à Jérusalem.</li></ul>",
        time: "⏱️ Débloque la Voie d'État (Nativ)"
      },
      ishur_giyur: {
        tag: "CONVERSION PRIVÉE (GUSH ETZION) & VALIDATION RABBANUT",
        title: "Devenir 100% Juif Halakhique Rapidement + Protéger Vos Futurs Mariages",
        body: "Les tribunaux privés sont 100% casher, mais nécessitent l'Ishur Giyur du Beit HaDin HaGadol pour le mariage au Rabbinat.",
        badTitle: "💣 Les 3 Réalités à Connaître",
        badText: "<ul><li>Sans Ishur Giyur ou procédure graduée (Nohal 5.2.0008), un touriste B/2 reste bloqué pour l'Aliyah directe et le mariage au Rabbinat.</li></ul>",
        goodTitle: "⚡ Sécuriser l'Ishur Giyur",
        goodText: "<ul><li>Complétez la validation du Grand Rabbinat pour protéger votre mariage et vos futurs enfants.</li></ul>",
        time: "⏱️ Protégez Votre Avenir"
      },
      community_letters: {
        tag: "COMMUNAUTÉ & 5 À 8+ LETTRES TAMPONNÉES",
        title: "Obtenir 5 à 8+ Lettres de Recommandation en Hébreu avec Tampon",
        body: "Le Beit Din attend un dossier solide de lettres en hébreu avec numéros de Teudat Zehut et tampon officiel.",
        badTitle: "📋 « Écris-la pour moi et je la signe ! »",
        badText: "<ul><li>La plupart des rabbins et hôtes vous demanderont de préparer le brouillon en hébreu.</li></ul>",
        goodTitle: "⚡ Générateur de Lettres & En-tête Rabbinique",
        goodText: "<ul><li>Utilisez notre générateur WhatsApp en 1 clic avec en-tête rabbinique officiel.</li></ul>",
        time: "⏱️ 5–8+ Lettres Tamponnées"
      }
    },
    es: {
      go_bag: {
        tag: "EMERGENCIA ANTISEMITISMO • CARPETA GO-BAG Y SHINUI MA'AMAD",
        title: "¿Salida de Urgencia? Lleve 2 Originales Apostillados en Mano",
        body: "Ante el aumento del antisemitismo global o demoras consulares, así se tramita la Aliyá o transferencia de Guiur dentro de Israel (Shinui Ma'amad):",
        badTitle: "🎒 Los 7 Documentos Obligatorios en Mano (¡2 Originales Apostillados!)",
        badText: "<ul><li><strong>1. Dos Partidas Literales de Nacimiento + Apostilla de La Haya.</strong></li><li><strong>2. Antecedentes Penales Federales (RNR / Justicia) + Apostilla</strong> (<180 días).</li><li><strong>3. Fe de Soltería / Actas de Matrimonio o Divorcio + Apostilla.</strong></li><li><strong>4. Certificado de Judaísmo (Ishur Yahadut)</strong> + Ketubá de los padres.</li><li><strong>5. Poder Notarial (Yipui Koaj)</strong> dejado en su país.</li><li><strong>6. Niños y Mascotas:</strong> Certificados escolares apostillados, vacunas y serología antirrábica.</li><li><strong>7. Cambio de Nombre y Carpeta de Transferencia Beit Din (Tik Ha'avará):</strong> Para convertidos o candidatos que salen por antisemitismo (exención de 9 meses).</li></ul>",
        goodTitle: "🛬 Protocolo de Emergencia por Antisemitismo y Exención de 9 Meses",
        goodText: "<ul><li><strong>1. Judíos de nacimiento:</strong> Cambio de estatus (<em>Shinui Ma'amad</em>) inmediato en Israel.</li><li><strong>2. Recién convertidos y candidatos a mitad de proceso:</strong> Si debe salir de urgencia por antisemitismo antes de cumplir los 9 meses post-Mikve (o en medio del curso), traiga una <strong>Carta Oficial de Emergencia y Carpeta de Transferencia (Tik Ha'avará)</strong> de su Beit Din para solicitar una exención humanitaria ante el Misrad HaPanim y la <em>Va'adat Jariguim</em> (Formulario Ash/1).</li></ul>",
        time: "⏱️ Sprint de 7 Días • 2x Originales Apostillados • Exención de Emergencia"
      },
      five_docs: {
        tag: "LOS 5 DOCUMENTOS APOSTILLADOS, RELOJ 180 DÍAS Y 3 PERFILES",
        title: "Sus 5 Documentos, la Regla de 24 Meses (Sal Klitá) y Exención por Antisemitismo",
        body: "El Misrad HaPanim aplica un vencimiento estricto de 180 días a sus Antecedentes Penales y Fe de Soltería.",
        badTitle: "⏰ Documentos que Caducan a los 180 Días",
        badText: "<ul><li><strong>Partida Literal, Antecedentes Penales, Fe de Soltería, Divorcio/Cambio de Nombre.</strong> Al día 181 el funcionario rechaza abrir el expediente.</li></ul>",
        goodTitle: "🧭 Los 3 Perfiles y Excepción de Emergencia por Antisemitismo",
        goodText: "<ul><li><strong>Perfil 1 (Judío de nacimiento):</strong> No supere 24 meses en Israel en los 3 años previos para proteger sus ~21.700 ₪ de Sal Klitá.</li><li><strong>Perfil 2 (Convertido en el extranjero):</strong> Regla normal de 9 meses en la comunidad tras la Mikve — <strong>EXCEPTO</strong> en casos de antisemitismo agudo o emergencia respaldados por una Carta de Transferencia de su Beit Din para pedir exención humanitaria en Israel.</li><li><strong>Perfil 3 (Conversión en Israel vía Va'adat Jariguim):</strong> Sin requisito de estadía en el exterior.</li></ul>",
        time: "⏱️ Escudo 180 Días • Protección Sal Klitá • Exención 9 Meses"
      },
      fx_shield: {
        tag: "💸 Puente de Divisas y Alquiler en ₪ • Cero Bloqueo Bancario",
        title: "Pague a Propietarios en Shekels (₪) Sin Teudat Zehut",
        body: "En sus primeros 60–90 días sin Teudat Zehut, los bancos cobran ~3,2% de comisión oculta.",
        badTitle: "❌ La Trampa Bancaria (3,2% de Recargo) :",
        badText: "• Pierde $3.200 por cada $100.000 transferidos.",
        goodTitle: "✅ Puente FX Israelí Autorizado (Ahorre ~2,5%) :",
        goodText: "• Abra cuenta con su pasaporte extranjero y pague el alquiler directamente en ₪.<br><br><button class='btn-sky' style='background:#059669; margin-top:6px;' onclick='openFxPartner()'>Abrir Puente de Divisas Aliyá y Ahorrar ~2,5% →</button>",
        time: "⏱️ Alta Online en 10 Min • Solo Pasaporte Extranjero"
      },
      bridge_health: {
        tag: "🏥 Seguro Médico Puente 60–90 Días • Acceso Maccabi / Clalit",
        title: "Cobertura Médica en Israel Sin Teudat Zehut",
        body: "Sin Teudat Zehut, una urgencia hospitalaria cuesta entre 4.500 y 25.000+ ₪.",
        badTitle: "❌ Por Qué Falla el Seguro de Viaje :",
        badText: "• Solo cubre repatriación y se anula al mudarse a Israel.",
        goodTitle: "✅ Seguro Puente Turista-a-Olé (Maccabi/Clalit) :",
        goodText: "• Tarjeta magnética médica con su pasaporte extranjero para clínicas Maccabi/Clalit.<br><br><button class='btn-sky' style='background:#0284c7; margin-top:6px;' onclick='openHealthPartner()'>Activar Seguro Médico Puente 60–90 Días →</button>",
        time: "⏱️ Póliza PDF Inmediata • Acceso Maccabi/Clalit"
      },
      vaadat_charigim: {
        tag: "COMITÉ DE EXCEPCIONES • VA'ADAT JARIGUIM (FORMULARIO ASH/1)",
        title: "Cómo Aprobar el Comité de Excepciones como Turista o Estudiante",
        body: "Destrabe el Guiur estatal con sus 5 documentos apostillados, su Mijtav Hesber en hebreo y cartas rabínicas.",
        badTitle: "📋 Requisitos del Expediente",
        badText: "<ul><li>5 documentos apostillados (<180d), Mijtav Hesber en hebreo, cartas de Rav Melavé y familia anfitriona con Teudat Zehut.</li></ul>",
        goodTitle: "⚡ Las 2 Etapas",
        goodText: "<ul><li>1) Filtro de seguridad Misrad HaPanim. 2) Entrevista en Jerusalén.</li></ul>",
        time: "⏱️ Habilita la Vía Estatal (Nativ)"
      },
      ishur_giyur: {
        tag: "CONVERSIÓN PRIVADA (GUSH ETZION) Y VALIDACIÓN RABANUT",
        title: "Ser 100% Judío Halájico Ahora + Proteger su Futuro Matrimonio",
        body: "Las cortes privadas son 100% kasher, pero requieren el Ishur Guiur del Beit HaDin HaGadol para bodas en la Rabanut.",
        badTitle: "💣 Las 3 Realidades Clave",
        badText: "<ul><li>Un turista B/2 necesita Ishur Guiur o residencia gradual (Nohal 5.2.0008) para Aliyá y matrimonio en la Rabanut.</li></ul>",
        goodTitle: "⚡ Asegure el Ishur Guiur",
        goodText: "<ul><li>Complete la validación del Gran Rabinato para proteger su boda y a sus futuros hijos.</li></ul>",
        time: "⏱️ Proteja su Futuro"
      },
      community_letters: {
        tag: "COMUNIDAD Y 5 A 8+ CARTAS SELLADAS",
        title: "Cómo Conseguir 5 a 8+ Cartas en Hebreo con Sello Oficial",
        body: "El Beit Din espera de 5 a 8 cartas en hebreo con número de Teudat Zehut y sello oficial.",
        badTitle: "📋 «¡Escríbela por mí y yo la firmo!»",
        badText: "<ul><li>La mayoría de rabinos y anfitriones le pedirán el borrador listo en hebreo.</li></ul>",
        goodTitle: "⚡ Generador de Cartas y Membrete Rabínico",
        goodText: "<ul><li>Use nuestro generador por WhatsApp con membrete rabínico oficial.</li></ul>",
        time: "⏱️ 5–8+ Cartas Selladas"
      }
    },
    de: {
      go_bag: {
        tag: "ANTISEMITISMUS-NOTFALL • GO-BAG-ORDNER & SCHINUI MA'AMAD",
        title: "Notfall-Ausreise? 2 Apostillierte Originale ins Handgepäck!",
        body: "Bei steigendem Antisemitismus oder Konsulats-Stau: So beantragen Sie Notfall-Alija oder Giur-Transfer direkt in Israel (Schinui Ma'amad):",
        badTitle: "🎒 Die 7 Pflichtdokumente im Handgepäck (Je 2 Apostillierte Originale!)",
        badText: "<ul><li><strong>1. Zwei Beglaubigte Abschriften aus dem Geburtenregister + Apostille.</strong></li><li><strong>2. Erweitertes Führungszeugnis + BfAA-Apostille</strong> (<180 Tage).</li><li><strong>3. Erweiterte Meldebescheinigung (Ledigkeit) / Heirats- & Scheidungsurkunden + Apostille.</strong></li><li><strong>4. Orthodoxer Ischur Jahadut</strong> + Ketubba der Eltern.</li><li><strong>5. Notarielle Vollmacht (Jipui Koach)</strong> im Heimatland.</li><li><strong>6. Kinder & Haustiere:</strong> Apostillierte Zeugnisse, Impfpässe und Tollwut-Titertest.</li><li><strong>7. Namensänderung & Beit-Din-Übertragungsdossier (Tik Ha'awara):</strong> Für Konvertiten/Kandidaten bei Notfall-Ausreise wegen Antisemitismus.</li></ul>",
        goodTitle: "🛬 Antisemitismus-Notfallprotokoll & Ausnahmegenehmigung (9-Monats-Regel)",
        goodText: "<ul><li><strong>1. Geborene Juden:</strong> Sofortiger Statuswechsel (<em>Schinui Ma'amad</em>) im Misrad HaPanim.</li><li><strong>2. Frisch Konvertierte & Kandidaten mitten im Giur:</strong> Wenn Sie wegen akutem Antisemitismus vor Ablauf der 9 Monate nach der Mikwe (oder während des Kurses) ausreisen müssen, bringen Sie ein offizielles <strong>Notfall- & Übertragungsschreiben (Tik Ha'awara)</strong> Ihres Beit Din mit, um beim Misrad HaPanim und der <em>Va'adat Charigim</em> (Formular Asch/1) eine humanitäre Ausnahmegenehmigung zu beantragen.</li></ul>",
        time: "⏱️ 7-Tage-Sprint • 2x Apostillierte Originale • Notfall-Ausnahme"
      },
      five_docs: {
        tag: "DIE 5 APOSTILLIERTEN DOKUMENTE, 180-TAGE-UHR & 3 PROFILE",
        title: "Ihre 5 DACH-Dokumente, die 24-Monats-Regel (Sal Klita) & Antisemitismus-Ausnahme",
        body: "Das Misrad HaPanim setzt eine strikte 180-Tage-Frist auf Ihr Führungszeugnis und Ihre Ledigkeitsbescheinigung.",
        badTitle: "⏰ Dokumente mit 180-Tage-Ablaufuhr",
        badText: "<ul><li><strong>Geburtenregister-Abschrift, Führungszeugnis (BfAA), Ledigkeit, Scheidung/Namensänderung.</strong> Ab Tag 181 verweigert der Beamte die Akteneröffnung.</li></ul>",
        goodTitle: "🧭 Die 3 Profile & Notfall-Ausnahme bei Steigendem Antisemitismus",
        goodText: "<ul><li><strong>Profil 1 (Geborener Jude):</strong> Nicht über 24 Monate in 3 Jahren vor der Alija in Israel bleiben, um ~21.700 ₪ Sal Klita zu sichern.</li><li><strong>Profil 2 (Im Ausland konvertiert):</strong> Regulär 9 Monate Gemeindeleben nach der Mikwe — <strong>AUSSER</strong> bei akutem Antisemitismus/Sicherheitsnotfall mit offiziellem Beit-Din-Übertragungsdossier für eine humanitäre Ausnahmegenehmigung.</li><li><strong>Profil 3 (Giur in Israel über Va'adat Charigim):</strong> Kein Auslandsaufenthalt nötig.</li></ul>",
        time: "⏱️ 180-Tage-Schutz • Sal Klita Sicherung • 9-Monats-Ausnahme"
      },
      fx_shield: {
        tag: "💸 Alija-Währungs- & Miet-Treuhandbrücke • Keine Banksperre",
        title: "Vermieter in Schekel (₪) Zahlen Ohne Teudat Zehut",
        body: "In den ersten 60–90 Tagen ohne Teudat Zehut verlangen Banken ~3,2% Aufschlag.",
        badTitle: "❌ Die Hausbank-Falle (3,2% Gebühren) :",
        badText: "• 3.200 € Verlust pro 100.000 € Überweisung + Geldwäsche-Sperren.",
        goodTitle: "✅ Lizenzierte Israelische FX-Brücke (~2,5% Sparen) :",
        goodText: "• Konto mit Reisepass eröffnen und Miete direkt in ₪ an den Vermieter überweisen.<br><br><button class='btn-sky' style='background:#059669; margin-top:6px;' onclick='openFxPartner()'>Alija-Währungsbrücke Öffnen & ~2,5% Sparen →</button>",
        time: "⏱️ In 10 Min Online • Nur Ausländischer Reisepass"
      },
      bridge_health: {
        tag: "🏥 60–90 Tage Überbrückungs-Krankenversicherung • Maccabi / Clalit",
        title: "Voller Krankenversicherungsschutz Ohne Teudat Zehut",
        body: "Ohne Teudat Zehut kostet ein Krankenhausaufenthalt 4.500 bis 25.000+ ₪.",
        badTitle: "❌ Warum Reiseversicherungen Versagen :",
        badText: "• Decken nur Rücktransport und erlöschen bei Einwanderungsabsicht.",
        goodTitle: "✅ Tourist-zu-Oleh Überbrückungsschutz (Maccabi/Clalit) :",
        goodText: "• Israelische Magnetkarte mit Reisepass für direkten Zugang zu Maccabi/Clalit-Ärzten.<br><br><button class='btn-sky' style='background:#0284c7; margin-top:6px;' onclick='openHealthPartner()'>60–90 Tage Überbrückungsschutz Aktivieren →</button>",
        time: "⏱️ Sofort-Police per PDF • Direkter Maccabi/Clalit-Zugang"
      },
      vaadat_charigim: {
        tag: "AUSNAHMEKOMITEE • VA'ADAT CHARIGIM (FORMULAR ASCH/1)",
        title: "Als Tourist oder Student das Ausnahmekomitee Bestehen",
        body: "Zulassung zum staatlichen Giur mit allen 5 apostillierten Dokumenten, hebräischem Michtav Hesber und Rabbinerbriefen.",
        badTitle: "📋 Pflichtunterlagen",
        badText: "<ul><li>5 apostillierte Dokumente (<180T), hebräischer Michtav Hesber, Briefe von Rav Melaveh & Gastfamilie mit Teudat-Zehut-Nr.</li></ul>",
        goodTitle: "⚡ Die 2 Stufen",
        goodText: "<ul><li>1) Sicherheitsprüfung Misrad HaPanim. 2) Interview in Jerusalem.</li></ul>",
        time: "⏱️ Öffnet den Staatlichen Giur (Nativ)"
      },
      ishur_giyur: {
        tag: "PRIVATER GIUR (GUSH ETZION) & RABBINATS-VALIDIERUNG",
        title: "Schnell 100% Halachisch Jüdisch Werden + Zukunft Schützen",
        body: "Private Gerichte sind 100% koscher, erfordern aber den Ischur Giur des Beit HaDin HaGadol für Rabbinats-Hochzeiten.",
        badTitle: "💣 Die 3 Realitäten",
        badText: "<ul><li>B/2-Touristen benötigen Ischur Giur oder das Stufenverfahren (Nohal 5.2.0008) für Alija und Rabbinats-Heirat.</li></ul>",
        goodTitle: "⚡ Ischur Giur Sichern",
        goodText: "<ul><li>Oberrabbinats-Validierung abschließen, um Ehe und zukünftige Kinder abzusichern.</li></ul>",
        time: "⏱️ Zukunft Weltweit Schützen"
      },
      community_letters: {
        tag: "GEMEINDE & 5 BIS 8+ GESTEMPELTE BRIEFE",
        title: "5 bis 8+ Gestempelte Hebräische Empfehlungsbriefe Erhalten",
        body: "Das Beit Din erwartet 5 bis 8 hebräische Briefe mit Teudat-Zehut-Nummer und Stempel.",
        badTitle: "📋 „Schreib es mir vor und ich unterschreibe!“",
        badText: "<ul><li>Rabbiner und Gastfamilien bitten fast immer um einen fertigen hebräischen Entwurf.</li></ul>",
        goodTitle: "⚡ Brief- & Rabbinats-Briefkopf-Generator",
        goodText: "<ul><li>Nutzen Sie unseren 1-Klick WhatsApp-Generator inkl. rabbinischem Briefkopf.</li></ul>",
        time: "⏱️ 5–8+ Gestempelte Briefe"
      }
    }
  };


  window.UI_BLOCKS_I18N = {
    fr: {
      "#left-drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.3rem;\">🛠️ Dossiers & <span>Conciergerie</span></div></div><div class=\"drawer-dark-stats\" style=\"border-color:#38bdf8;\"><div class=\"dds-head\" style=\"color:#38bdf8;\"><span>🛡️ Bouclier Bureaucratie 1-Coup</span><span>✓</span></div><div class=\"dds-grid\"><div><span class=\"dds-num\">5 Pièces</span><span class=\"dds-lbl\">Horloge 180j</span></div><div><span class=\"dds-num\">2-Sens</span><span class=\"dds-lbl\">PDF Hébreu</span></div><div><span class=\"dds-num\">5–8+</span><span class=\"dds-lbl\">Lettres Rabbin</span></div></div></div><div class=\"drawer-list\"><button class=\"drawer-row\" onclick=\"openTerm('go_bag'); toggleLeftDrawer(false);\">🚨 Dossier Go-Bag & Aliyah d'Urgence</button><button class=\"drawer-row\" onclick=\"openTerm('bridge_health'); toggleLeftDrawer(false);\">🏥 Assurance Santé 60–90 Jours (Sans TZ)</button><button class=\"drawer-row\" onclick=\"openTerm('fx_shield'); toggleLeftDrawer(false);\">💸 Payer Loyer en ₪ & Économiser 2,5% FX</button><button class=\"drawer-row\" onclick=\"switchTab(4); toggleLeftDrawer(false);\">📸 Traducteur Guichetier & PDF Hébreu</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">🕍 Rabbin Accompagnateur & Madrichat Kallah</button><button class=\"drawer-row\" onclick=\"openObstacle(8); toggleLeftDrawer(false);\">💼 Survie Touriste : Télétravail & Logement</button><button class=\"drawer-row\" onclick=\"openTerm('community_letters'); toggleLeftDrawer(false);\">✍️ Générateur de Lettres & En-tête Rabbin</button><button class=\"drawer-row\" onclick=\"openTerm('five_docs'); toggleLeftDrawer(false);\">✈️ 5 Pièces Apostillées & Règle 24 Mois</button><button class=\"drawer-row\" onclick=\"openTerm('vaadat_charigim'); toggleLeftDrawer(false);\">⚖️ Guide Va'adat Charigim (Formulaire Ash/1)</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">ℹ️ Ce Que Nous Sommes — Et Ne Sommes PAS</button></div></div><div><button class=\"btn-install-navy\" onclick=\"switchTab(2); toggleLeftDrawer(false);\">⏱️ Calculer Temps & Argent Économisés →</button></div>",
      "#app-drawer .drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.4rem;\">Giyur<span>Aliyah</span>Track</div></div><div class=\"drawer-dark-stats\"><div class=\"dds-head\"><span>⚡ Bouclier Anti-Boucle</span><span>↻</span></div><div class=\"dds-grid\"><div><span class=\"dds-num green\">3,5 Ans</span><span class=\"dds-lbl\">Économisés</span></div><div><span class=\"dds-num\">150 Q.</span><span class=\"dds-lbl\">Beit Din</span></div><div><span class=\"dds-num\">80 Q.</span><span class=\"dds-lbl\">Synchro Couple</span></div></div></div><div class=\"drawer-list\"><a href=\"/app?module=beit-din-150\" class=\"drawer-row\">🕍 150 Questions Beit Din (Simulateur)</a><a href=\"/app?module=songs-prayers\" class=\"drawer-row\">🎵 12 Chants de Chabbat, Prières & Chema</a><a href=\"/app?module=couples-sync\" class=\"drawer-row\">📱 Synchro 80 Questions sur 2 Téléphones</a><button class=\"drawer-row\" onclick=\"switchTab(4); toggleDrawer(false);\">📊 Suivi en Direct : Horloges 180j & 30j</button><a href=\"/app\" class=\"drawer-row\" style=\"color:var(--sky);\">🔐 Portail Complet des Membres (/app)</a></div></div><div><button class=\"btn-install-navy\" onclick=\"alert('Pour installer l\\'application : touchez Partager dans Safari/Chrome puis Sur l\\'écran d\\'accueil.')\">📲 Installer l'Application</button></div>",
      '#mesh-title': '📚 Guides Statutaires Officiels & Procédures Misrad HaPanim / Rabbanut',
      '#view-2 .hero-center p': 'Les guichetiers et les Apostilles expirées font perdre 2 à 4 ans. Calculez combien de temps notre méthode vous fait gagner :',
      '#view-2 .zehut-select-label': 'Sélectionnez Votre Situation / Voie Cible :',
      '#z-track': `<option value="dual">Couple (Israélien + Conjoint) : Rabbanut + Misrad HaPanim (Double Voie)</option>
        <option value="shinui">Aliyah d'Urgence en Israël (Shinui Ma'amad + Dossier Go-Bag — Voie 1)</option>
        <option value="gush">Étudiant / Visiteur / Couple : Beit Din Privé (Gush Etzion) + Ishur Giyur (Voie 2)</option>
        <option value="state">Touriste / Étudiant : Giyur d'État & Aliyah via Va'adat Charigim (Voie 3)</option>
        <option value="spousal">Visa Conjoint Uniquement : Permis B/1 & Teudat Zehut A/5 (Voie 4)</option>`,
      '#lbl-countries': 'Pays Vécus (>1 An Depuis l\'Âge de 14 Ans) :',
      '#lbl-months': 'Mois Déjà Perdus à Attendre les Guichetiers :',
      '#view-2 .emerald-label': 'Temps économisé grâce à notre Dossier 1-Coup :',
      '#view-2 > .btn-sky': 'Verrouiller Ma Voie & Mon Bouclier de Délais →',
      '#fx-h2': '💸 Bouclier Devises Aliyah & Paiement de Loyer en ₪',
      '#fx-lead': 'Vous transférez des fonds pour un loyer ou un achat ? Les banques prélèvent ~3,2% de frais cachés. Voyez combien vous gardez via un pont FX israélien agréé :',
      '#lbl-fx-amt': 'Montant Transféré vers Israël (Loyer / Auto / Logement) :',
      '#fx-card-lbl': 'Argent Gardé dans Votre Poche (Hors Frais Bancaires) :',
      '#fx-cta-btn': 'Bloquer un Taux Préférentiel Aliyah & Payer en ₪ →',
      '#hlth-pill': '🏥 60–90 Premiers Jours Sans Teudat Zehut',
      '#hlth-title': 'Assurance Santé Privée Transitoire « Touriste-vers-Oleh »',
      '#hlth-desc': 'En attente de <em>Shinui Ma\'amad</em>, Giyur ou visa A/5 ? Aucune couverture Bituach Leumi tant que la Teudat Zehut n\'est pas émise. Accédez immédiatement aux cliniques Maccabi/Clalit avec votre passeport étranger (1,80–3 $/jour).',
      '#hlth-cta-btn': 'Voir les Tarifs Assurance Transitoire 60–90 Jours →',
      '#view-3 .hero-center p': 'Les deux partenaires doivent suivre le cours. Choisissez ce dont vous avez besoin pour une mise en relation directe :',
      '#rabbi-radios': `<div class="radio-row active" onclick="selectRabbiOption(0, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Les Deux : Rabbin Accompagnateur (Rav Melaveh) + Madrichat Kallah</div><span class="radio-sub">Forfait couple complet reconnu par le Beit Din & le Rabbinat (1-à-1 et à distance).</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(1, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Rabbin Accompagnateur Reconnu par le Rabbinat (Rav Melaveh)</div><span class="radio-sub">Étude officielle et lettre de recommandation au Beit Din.</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(2, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Madrichat Kallah Certifiée par le Rabbinat (Pureté Familiale)</div><span class="radio-sub">Attestation officielle Taharat HaMishpacha requise par le Beit Din et le Rabbinat.</span></div></div>`,
      '#view-3 .vetted-card': `<h3>🛡️ Ce Que Nous Sommes — Et Ce Que Nous Ne Sommes PAS</h3>
        <p style="margin-bottom:8px;"><strong>Ce que nous ne sommes PAS :</strong> Nous ne sommes <strong>PAS avocats</strong>, <strong>PAS rabbins ni un Beit Din</strong>, et <strong>PAS un organisme gouvernemental</strong>.</p>
        <p style="margin-bottom:0;"><strong>Ce que nous SOMMES :</strong> Des couples ayant traversé ce labyrinthe de 5 ans qui ont créé le moteur d'ordonnancement des pièces, le traducteur de lettres guichetier, le générateur PDF en hébreu et le simulateur <em>Ma'amad Beit Din</em>.</p>`,
      '#view-4 .shield-banner': `<div class="sb-top"><span class="sb-tag">🟢 Synchronisé Gov.il (Nohal 5.2.0008 Éd. 16)</span><span class="sb-live" id="tracker-progress-badge">2 / 9 Terminés • 2 En attente</span></div>
        <h3>Ne Perdez Jamais un An à Cause d'une Apostille Expirée ou d'un Dossier Fermé</h3>
        <p>Touchez le statut de chaque étape (<strong>Non commencé ➔ En attente ➔ Terminé</strong>) pour ancrer vos horloges de 180 jours (Apostille) et 30 jours (Misrad HaPanim).</p>
        <div class="timer-strip"><div class="timer-box"><div class="tb-label">Validité Apostille</div><div class="tb-val" id="timer-apostille">148 Jours Restants</div></div><div class="timer-box"><div class="tb-label">Bouclier 30 Jours</div><div class="tb-val" id="timer-clerk" style="color:#3b82f6;">Protégé (29j)</div></div></div>`,
      '#view-4 .two-way-bar': `<a href="/app?module=songs-prayers" class="btn-action-tile"><div class="bat-top">🎵 Audio + Coach IA</div><div class="bat-title">12 Chants de Chabbat, Prières & Chema</div></a>
        <a href="/app?module=beit-din-150" class="btn-action-tile"><div class="bat-top">🕍 Simulation Ma'amad Beit Din</div><div class="bat-title">150 Questions du Beit Din</div></a>
        <a href="/app?module=couples-sync" class="btn-action-tile"><div class="bat-top">📱 Synchro 2 Téléphones en Direct</div><div class="bat-title">Interrogatoire Couples 80 Questions</div></a>
        <a href="/app?module=hebrew-engine" class="btn-action-tile"><div class="bat-top">📸 Traducteur + 📝 PDF Hébreu</div><div class="bat-title">Scanner Lettre / Formulaires Ash/1 & Ash/3</div></a>`
    },
    es: {
      "#left-drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.3rem;\">🛠️ Trámites y <span>Concierge</span></div></div><div class=\"drawer-dark-stats\" style=\"border-color:#38bdf8;\"><div class=\"dds-head\" style=\"color:#38bdf8;\"><span>🛡️ Escudo Burocrático en 1 Paso</span><span>✓</span></div><div class=\"dds-grid\"><div><span class=\"dds-num\">5 Docs</span><span class=\"dds-lbl\">Reloj 180d</span></div><div><span class=\"dds-num\">2-Vías</span><span class=\"dds-lbl\">PDF Hebreo</span></div><div><span class=\"dds-num\">5–8+</span><span class=\"dds-lbl\">Cartas Rabino</span></div></div></div><div class=\"drawer-list\"><button class=\"drawer-row\" onclick=\"openTerm('go_bag'); toggleLeftDrawer(false);\">🚨 Carpeta Go-Bag y Aliyá de Emergencia</button><button class=\"drawer-row\" onclick=\"openTerm('bridge_health'); toggleLeftDrawer(false);\">🏥 Seguro Médico Puente 60–90 Días (Sin TZ)</button><button class=\"drawer-row\" onclick=\"openTerm('fx_shield'); toggleLeftDrawer(false);\">💸 Pagar Alquiler en ₪ y Ahorrar 2,5% FX</button><button class=\"drawer-row\" onclick=\"switchTab(4); toggleLeftDrawer(false);\">📸 Traductor de Cartas y PDF en Hebreo</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">🕍 Rabino Patrocinador y Madrijat Kalá</button><button class=\"drawer-row\" onclick=\"openObstacle(8); toggleLeftDrawer(false);\">💼 Supervivencia Turista: Trabajo Remoto</button><button class=\"drawer-row\" onclick=\"openTerm('community_letters'); toggleLeftDrawer(false);\">✍️ Generador de Cartas y Membrete Rabínico</button><button class=\"drawer-row\" onclick=\"openTerm('five_docs'); toggleLeftDrawer(false);\">✈️ 5 Docs Apostillados y Regla 24 Meses</button><button class=\"drawer-row\" onclick=\"openTerm('vaadat_charigim'); toggleLeftDrawer(false);\">⚖️ Guía Va'adat Jariguim (Formulario Ash/1)</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">ℹ️ Qué Somos — Y Qué NO Somos</button></div></div><div><button class=\"btn-install-navy\" onclick=\"switchTab(2); toggleLeftDrawer(false);\">⏱️ Calcular Años y Dinero Ahorrados →</button></div>",
      "#app-drawer .drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.4rem;\">Giyur<span>Aliyah</span>Track</div></div><div class=\"drawer-dark-stats\"><div class=\"dds-head\"><span>⚡ Escudo Anti-Bucle</span><span>↻</span></div><div class=\"dds-grid\"><div><span class=\"dds-num green\">3,5 Años</span><span class=\"dds-lbl\">Ahorrados</span></div><div><span class=\"dds-num\">150 P.</span><span class=\"dds-lbl\">Beit Din</span></div><div><span class=\"dds-num\">80 P.</span><span class=\"dds-lbl\">Sincro Pareja</span></div></div></div><div class=\"drawer-list\"><a href=\"/app?module=beit-din-150\" class=\"drawer-row\">🕍 150 Preguntas del Beit Din (Simulador)</a><a href=\"/app?module=songs-prayers\" class=\"drawer-row\">🎵 12 Canciones de Shabat, Rezos y Shemá</a><a href=\"/app?module=couples-sync\" class=\"drawer-row\">📱 Sincronización 80 Preguntas en 2 Teléfonos</a><button class=\"drawer-row\" onclick=\"switchTab(4); toggleDrawer(false);\">📊 Rastreador en Vivo: Relojes 180d y 30d</button><a href=\"/app\" class=\"drawer-row\" style=\"color:var(--sky);\">🔐 Portal Completo de Miembros (/app)</a></div></div><div><button class=\"btn-install-navy\" onclick=\"alert('Para instalar la app: toque Compartir en Safari/Chrome y elija Agregar a la pantalla de inicio.')\">📲 Instalar Aplicación</button></div>",
      '#mesh-title': '📚 Guías Legales Oficiales y Procedimientos Misrad HaPanim / Rabanut',
      '#view-2 .hero-center p': 'Los funcionarios y las Apostillas vencidas roban de 2 a 4 años. Calcule cuánto tiempo ahorra nuestro sistema:',
      '#view-2 .zehut-select-label': 'Seleccione Su Situación / Vía Objetivo :',
      '#z-track': `<option value="dual">Pareja (Israelí + Pareja) : Rabanut + Misrad HaPanim (Doble Vía)</option>
        <option value="shinui">Aliyá de Emergencia en Israel (Shinui Ma'amad + Carpeta Go-Bag — Vía 1)</option>
        <option value="gush">Estudiante / Visitante / Pareja : Beit Din Privado (Gush Etzion) + Ishur Guiur (Vía 2)</option>
        <option value="state">Turista / Estudiante : Guiur Estatal y Aliyá vía Va'adat Jariguim (Vía 3)</option>
        <option value="spousal">Solo Visa de Pareja : Permiso B/1 y Teudat Zehut A/5 (Vía 4)</option>`,
      '#lbl-countries': 'Países Donde Vivió (>1 Año Desde los 14 Años) :',
      '#lbl-months': 'Meses Ya Perdidos Esperando a Funcionarios :',
      '#view-2 .emerald-label': 'Tiempo que nuestra Guía le ahorra en su proceso:',
      '#view-2 > .btn-sky': 'Asegurar Mi Vía y Escudo de Plazos →',
      '#fx-h2': '💸 Escudo de Divisas Aliyá y Pago de Alquiler en ₪',
      '#fx-lead': '¿Transfiere dinero para alquiler o vivienda? Los bancos cobran ~3,2% de comisión oculta. Vea cuánto ahorra con un puente FX israelí autorizado:',
      '#lbl-fx-amt': 'Monto a Transferir a Israel (Alquiler / Auto / Casa) :',
      '#fx-card-lbl': 'Dinero que Queda en Su Bolsillo (Sin Comisiones Bancarias) :',
      '#fx-cta-btn': 'Asegurar Tasa Preferencial Aliyá y Pagar en ₪ →',
      '#hlth-pill': '🏥 Primeros 60–90 Días Sin Teudat Zehut',
      '#hlth-title': 'Seguro Médico Privado Puente «Turista-a-Olé»',
      '#hlth-desc': '¿Esperando <em>Shinui Ma\'amad</em>, Guiur o visa A/5? No tiene cobertura de Bituaj Leumí hasta recibir su Teudat Zehut. Obtenga acceso inmediato a clínicas Maccabi/Clalit con su pasaporte extranjero ($1.80–$3/día).',
      '#hlth-cta-btn': 'Ver Planes de Seguro Puente de 60–90 Días →',
      '#view-3 .hero-center p': 'Ambos miembros de la pareja deben completar el curso. Seleccione lo que necesita para una presentación directa:',
      '#rabbi-radios': `<div class="radio-row active" onclick="selectRabbiOption(0, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Ambos: Rabino Patrocinador (Rav Melavé) + Madrijat Kalá Certificada</div><span class="radio-sub">Paquete completo para parejas reconocido por el Beit Din y la Rabanut (1-a-1 y remoto).</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(1, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Rabino Patrocinador Reconocido por la Rabanut (Rav Melavé)</div><span class="radio-sub">Estudio oficial de conversión y carta de recomendación para el Beit Din.</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(2, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Madrijat Kalá Certificada por la Rabanut (Pureza Familiar)</div><span class="radio-sub">Certificación oficial de Taharat HaMishpajá exigida por el Beit Din y la Rabanut.</span></div></div>`,
      '#view-3 .vetted-card': `<h3>🛡️ Qué Somos — Y Qué NO Somos</h3>
        <p style="margin-bottom:8px;"><strong>Qué NO somos:</strong> <strong>NO somos abogados</strong>, <strong>NO somos rabinos ni un Beit Din</strong>, y <strong>NO somos una agencia gubernamental</strong>.</p>
        <p style="margin-bottom:0;"><strong>Qué SÍ somos:</strong> Parejas que superaron este laberinto de 5 años y crearon el motor de documentos, el traductor de cartas, el generador PDF en hebreo y el simulador <em>Ma'amad Beit Din</em>.</p>`,
      '#view-4 .shield-banner': `<div class="sb-top"><span class="sb-tag">🟢 Sincronizado Gov.il (Nohal 5.2.0008 Ed. 16)</span><span class="sb-live" id="tracker-progress-badge">2 / 9 Completados • 2 En espera</span></div>
        <h3>Nunca Pierda un Año por un Documento Vencido o un Expediente Cerrado</h3>
        <p>Toque el estado de cada tarea (<strong>No iniciado ➔ En espera ➔ Completado</strong>) para activar su reloj de 180 días (Apostilla) y 30 días (Misrad HaPanim).</p>
        <div class="timer-strip"><div class="timer-box"><div class="tb-label">Vigencia Apostilla</div><div class="tb-val" id="timer-apostille">148 Días Restantes</div></div><div class="timer-box"><div class="tb-label">Escudo 30 Días</div><div class="tb-val" id="timer-clerk" style="color:#3b82f6;">Protegido (29d)</div></div></div>`,
      '#view-4 .two-way-bar': `<a href="/app?module=songs-prayers" class="btn-action-tile"><div class="bat-top">🎵 Audio + Entrenador IA</div><div class="bat-title">12 Canciones de Shabat, Rezos y Shemá</div></a>
        <a href="/app?module=beit-din-150" class="btn-action-tile"><div class="bat-top">🕍 Simulador Ma'amad Beit Din</div><div class="bat-title">150 Preguntas del Beit Din</div></a>
        <a href="/app?module=couples-sync" class="btn-action-tile"><div class="bat-top">📱 Sincronización en 2 Teléfonos</div><div class="bat-title">Interrogatorio de Parejas (80 Preguntas)</div></a>
        <a href="/app?module=hebrew-engine" class="btn-action-tile"><div class="bat-top">📸 Traductor + 📝 PDF Hebreo</div><div class="bat-title">Traducir Carta / Formularios Ash/1 y Ash/3</div></a>`
    },
    de: {
      "#left-drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.3rem;\">🛠️ Dokumente & <span>Concierge</span></div></div><div class=\"drawer-dark-stats\" style=\"border-color:#38bdf8;\"><div class=\"dds-head\" style=\"color:#38bdf8;\"><span>🛡️ 1-Schritt Bürokratie-Schutz</span><span>✓</span></div><div class=\"dds-grid\"><div><span class=\"dds-num\">5 Dok.</span><span class=\"dds-lbl\">180T-Uhr</span></div><div><span class=\"dds-num\">2-Wege</span><span class=\"dds-lbl\">Hebr. PDF</span></div><div><span class=\"dds-num\">5–8+</span><span class=\"dds-lbl\">Rabbinerbriefe</span></div></div></div><div class=\"drawer-list\"><button class=\"drawer-row\" onclick=\"openTerm('go_bag'); toggleLeftDrawer(false);\">🚨 Go-Bag-Ordner & Notfall-Alija</button><button class=\"drawer-row\" onclick=\"openTerm('bridge_health'); toggleLeftDrawer(false);\">🏥 60–90 Tage Krankenversicherung (Ohne TZ)</button><button class=\"drawer-row\" onclick=\"openTerm('fx_shield'); toggleLeftDrawer(false);\">💸 Miete in ₪ Zahlen & 2,5% FX Sparen</button><button class=\"drawer-row\" onclick=\"switchTab(4); toggleLeftDrawer(false);\">📸 Behörden-Übersetzer & Hebräisch-PDF</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">🕍 Betreuender Rabbiner & Madrichat Kallah</button><button class=\"drawer-row\" onclick=\"openObstacle(8); toggleLeftDrawer(false);\">💼 Touristen-Guide: Remote-Arbeit & Wohnen</button><button class=\"drawer-row\" onclick=\"openTerm('community_letters'); toggleLeftDrawer(false);\">✍️ Gemeindebrief- & Briefkopf-Generator</button><button class=\"drawer-row\" onclick=\"openTerm('five_docs'); toggleLeftDrawer(false);\">✈️ 5 Apostille-Dokumente & 24-Monats-Regel</button><button class=\"drawer-row\" onclick=\"openTerm('vaadat_charigim'); toggleLeftDrawer(false);\">⚖️ Va'adat Charigim (Formular Asch/1) Guide</button><button class=\"drawer-row\" onclick=\"switchTab(3); toggleLeftDrawer(false);\">ℹ️ Wer Wir Sind — Und Wer Wir NICHT Sind</button></div></div><div><button class=\"btn-install-navy\" onclick=\"switchTab(2); toggleLeftDrawer(false);\">⏱️ Zeit- & Geldersparnis Berechnen →</button></div>",
      "#app-drawer .drawer-panel": "<div><div class=\"drawer-brand-center\"><div class=\"brand-title\" style=\"font-size:1.4rem;\">Giyur<span>Aliyah</span>Track</div></div><div class=\"drawer-dark-stats\"><div class=\"dds-head\"><span>⚡ Anti-Schleifen-Schutzschild</span><span>↻</span></div><div class=\"dds-grid\"><div><span class=\"dds-num green\">3,5 J.</span><span class=\"dds-lbl\">Gespart</span></div><div><span class=\"dds-num\">150 Fr.</span><span class=\"dds-lbl\">Beit Din</span></div><div><span class=\"dds-num\">80 Fr.</span><span class=\"dds-lbl\">Paar-Sync</span></div></div></div><div class=\"drawer-list\"><a href=\"/app?module=beit-din-150\" class=\"drawer-row\">🕍 150 Beit-Din-Prüfungsfragen (Simulator)</a><a href=\"/app?module=songs-prayers\" class=\"drawer-row\">🎵 12 Schabbat-Lieder, Gebete & Schema</a><a href=\"/app?module=couples-sync\" class=\"drawer-row\">📱 80-Fragen-Paar-Sync auf 2 Handys</a><button class=\"drawer-row\" onclick=\"switchTab(4); toggleDrawer(false);\">📊 Live-Tracker: 180-Tage- & 30-Tage-Uhr</button><a href=\"/app\" class=\"drawer-row\" style=\"color:var(--sky);\">🔐 Vollständiges Mitgliederportal (/app)</a></div></div><div><button class=\"btn-install-navy\" onclick=\"alert('App installieren: Tippen Sie in Safari/Chrome auf Teilen und wählen Sie Zum Home-Bildschirm.')\">📲 App Installieren</button></div>",
      '#mesh-title': '📚 Offizielle Gesetzliche Leitfäden & Misrad HaPanim / Rabbinats-Verfahren',
      '#view-2 .hero-center p': 'Sachbearbeiter und abgelaufene Apostillen kosten 2 bis 4 Jahre. Berechnen Sie, wie viel Zeit unser System Ihnen spart:',
      '#view-2 .zehut-select-label': 'Wählen Sie Ihre Situation / Ihren Ziel-Weg :',
      '#z-track': `<option value="dual">Paar (Israeli + Partner) : Rabbinat + Misrad HaPanim (Doppel-Weg)</option>
        <option value="shinui">Notfall-Alija in Israel (Schinui Ma'amad + Go-Bag-Ordner — Weg 1)</option>
        <option value="gush">Student / Besucher / Paar : Privates Beit Din (Gush Etzion) + Ischur Giur (Weg 2)</option>
        <option value="state">Tourist / Student : Staatlicher Giur & Alija über Va'adat Charigim (Weg 3)</option>
        <option value="spousal">Nur Partner-Visum : B/1 Arbeitserlaubnis & A/5 Teudat Zehut (Weg 4)</option>`,
      '#lbl-countries': 'Wohnländer (>1 Jahr Seit dem 14. Lebensjahr) :',
      '#lbl-months': 'Bereits Verlorene Wartezeit bei Behörden :',
      '#view-2 .emerald-label': 'Zeitersparnis durch unser 1-Schritt-Playbook:',
      '#view-2 > .btn-sky': 'Meinen Weg & Fristen-Schutzschild Aktivieren →',
      '#fx-h2': '💸 Alija-Währungs- & Miet-Treuhandbrücke (₪)',
      '#fx-lead': 'Überweisen Sie Geld für Miete oder Immobilien? Banken verlangen ~3,2% versteckte Gebühren. Sehen Sie Ihre Ersparnis über eine lizenzierte israelische FX-Brücke:',
      '#lbl-fx-amt': 'Überweisungsbetrag nach Israel (Miete / Auto / Kauf) :',
      '#fx-card-lbl': 'Geld, das in Ihrer Tasche Bleibt (Keine Bankgebühren) :',
      '#fx-cta-btn': 'Alija-Vorzugskurs Sichern & Direkt in ₪ Zahlen →',
      '#hlth-pill': '🏥 Die Ersten 60–90 Tage Ohne Teudat Zehut',
      '#hlth-title': 'Private „Tourist-zu-Oleh“ Überbrückungs-Krankenversicherung',
      '#hlth-desc': 'Warten Sie auf <em>Schinui Ma\'amad</em>, Giur oder A/5-Visum? Ohne Teudat Zehut besteht kein Bituach-Leumi-Schutz. Sofortiger Zugang zu Maccabi/Clalit-Kliniken mit Ihrem Reisepass ($1.80–$3/Tag).',
      '#hlth-cta-btn': '60–90 Tage Überbrückungstarife Ansehen →',
      '#view-3 .hero-center p': 'Beide Partner müssen den Kurs absolvieren. Wählen Sie Ihre Option für eine persönliche Vermittlung:',
      '#rabbi-radios': `<div class="radio-row active" onclick="selectRabbiOption(0, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Beides: Betreuender Rabbiner (Rav Melaveh) + Zertifizierte Madrichat Kallah</div><span class="radio-sub">Komplettpaket für Paare, anerkannt von Beit Din & Rabbinat (1-zu-1 & online).</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(1, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Vom Rabbinat Anerkannter Betreuender Rabbiner (Rav Melaveh)</div><span class="radio-sub">Offizieller Konversionsunterricht & Empfehlungsschreiben für das Beit Din.</span></div></div>
        <div class="radio-row" onclick="selectRabbiOption(2, this)"><div class="radio-dot"><div class="radio-dot-inner"></div></div><div><div class="radio-text">Vom Rabbinat Zertifizierte Madrichat Kallah (Taharat HaMischpacha)</div><span class="radio-sub">Offizielle Bestätigung für Beit Din und Rabbinats-Eheregistrierung.</span></div></div>`,
      '#view-3 .vetted-card': `<h3>🛡️ Wer Wir Sind — Und Wer Wir NICHT Sind</h3>
        <p style="margin-bottom:8px;"><strong>Wer wir NICHT sind:</strong> Wir sind <strong>KEINE Anwälte</strong>, <strong>KEINE Rabbiner oder Beit Din</strong> und <strong>KEINE Regierungsbehörde</strong>.</p>
        <p style="margin-bottom:0;"><strong>Wer wir SIND:</strong> Paare, die dieses 5-Jahres-Labyrinth selbst gemeistert und den Dokumenten-Planer, Behördenbrief-Übersetzer, hebräischen PDF-Generator und <em>Ma'amad Beit Din</em> Simulator gebaut haben.</p>`,
      '#view-4 .shield-banner': `<div class="sb-top"><span class="sb-tag">🟢 Synchronisiert mit Gov.il (Nohal 5.2.0008 Ausg. 16)</span><span class="sb-live" id="tracker-progress-badge">2 / 9 Erledigt • 2 Wartend</span></div>
        <h3>Verlieren Sie Nie Wieder ein Jahr durch Abgelaufene Apostillen oder Geschlossene Akten</h3>
        <p>Tippen Sie unten auf den Status (<strong>Nicht begonnen ➔ Wartend ➔ Erledigt</strong>), um Ihre 180-Tage-Apostillen- und 30-Tage-Behördenuhr zu verankern.</p>
        <div class="timer-strip"><div class="timer-box"><div class="tb-label">Apostillen-Frist</div><div class="tb-val" id="timer-apostille">148 Tage Übrig</div></div><div class="timer-box"><div class="tb-label">30-Tage-Akten-Schutz</div><div class="tb-val" id="timer-clerk" style="color:#3b82f6;">Geschützt (29T)</div></div></div>`,
      '#view-4 .two-way-bar': `<a href="/app?module=songs-prayers" class="btn-action-tile"><div class="bat-top">🎵 Audio + KI-Trainer</div><div class="bat-title">12 Schabbat-Lieder, Gebete & Schema</div></a>
        <a href="/app?module=beit-din-150" class="btn-action-tile"><div class="bat-top">🕍 Ma'amad Beit Din Simulator</div><div class="bat-title">150 Beit-Din-Prüfungsfragen</div></a>
        <a href="/app?module=couples-sync" class="btn-action-tile"><div class="bat-top">📱 Live 2-Handy-Paar-Sync</div><div class="bat-title">80-Fragen-Paar-Befragung</div></a>
        <a href="/app?module=hebrew-engine" class="btn-action-tile"><div class="bat-top">📸 Übersetzer + 📝 Hebräisch-PDF</div><div class="bat-title">Behördenbrief / Formulare Asch/1 & Asch/3</div></a>`
    }
  };

})();