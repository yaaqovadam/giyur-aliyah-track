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
      "#mg-0": "<div class=\"mg-header\"><span class=\"mg-title\">0. 9 Mois de Communauté en Israël & Lettres</span><span class=\"mg-badge\">100% en Israël</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Lettres du Rabbin & Famille d'Accueil (Mishpacha Melavah)</div><div class=\"si-meta\">Brouillons en hébreu sur WhatsApp • <a href=\"javascript:void(0)\" onclick=\"openTerm('community_letters')\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Envoyer →</a></div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En attente</button></div>",
      "#mg-1": "<div class=\"mg-header\"><span class=\"mg-title\">1. Dossier Étranger & Casier Judiciaire B3 (3 Paniers)</span><span class=\"mg-badge\">Horloge 180j</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Copie Intégrale d'Acte de Naissance + Apostille</div><div class=\"si-meta\">Original intégral avec noms des deux parents</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Terminé</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Certificat de Célibat, Mariage/Divorce & Apostilles</div><div class=\"si-meta\">Moins de 180 jours avant l'ouverture du dossier</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En attente</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Bulletin n°3 / Casier Judiciaire (3 Paniers) + Apostille</div><div class=\"si-meta\">Naissance + Nationalités + Pays vécus >1 an depuis 14 ans</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En attente</button></div>",
      "#mg-2": "<div class=\"mg-header\"><span class=\"mg-title\">2. Cours Reconnu Rabbanut & Examen Beit Din</span><span class=\"mg-badge\">Voies 2 & 3</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Cours avec Rabbin Accompagnateur (Couple Inscrit)</div><div class=\"si-meta\">Rav Melaveh reconnu par le Rabbinat</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Terminé</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Madrichat Kallah Certifiée (Pureté Familiale)</div><div class=\"si-meta\">Attestation officielle pour le Beit Din</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Non commencé</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">150 Questions du Beit Din & 12 Chants de Chabbat</div><div class=\"si-meta\">Simulateur Ma'amad Beit Din • <a href=\"/app?module=beit-din-150\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">S'entraîner →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Non commencé</button></div>",
      "#mg-3": "<div class=\"mg-header\"><span class=\"mg-title\">3. Validation Grand Rabbinat & Misrad HaPanim</span><span class=\"mg-badge\">Protection Famille</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Validation Beit HaDin HaGadol (Ishur Giyur)</div><div class=\"si-meta\">Protège le mariage au Rabbinat des futurs enfants</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Non commencé</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Formulaire Hébreu Ash/1 ou Ash/3 + Michtav Hesber</div><div class=\"si-meta\">Ouvrir le dossier dès le 1er RDV</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Non commencé</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Synchro 80 Questions sur 2 Téléphones</div><div class=\"si-meta\">Test d'entretien séparé • <a href=\"/app?module=couples-sync\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Synchroniser →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Non commencé</button></div>",
      flag: "🇫🇷", label: "FR", name: "Français (France/BE/CH)",
      police: "Bulletin n°3 du Casier Judiciaire National (JAMAIS le Bulletin n°2)",
      birth: "Copie Intégrale d'Acte de Naissance (Attention : un Extrait est refusé !)",
      single: "Certificat de Célibat / Coutume + Livret de Famille apostillé",
      rabbi: "Attestation de Judaïté officielle du Consistoire (Beth Din de Paris/Lyon)",
      apostille: "Apostille de la Cour d'Appel / Téléprocédure Notaires de France"
    },
    es: {
      "#mg-0": "<div class=\"mg-header\"><span class=\"mg-title\">0. 9 Meses de Comunidad en Israel y Cartas</span><span class=\"mg-badge\">100% en Israel</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Cartas de Rabino y Familia Anfitriona (Mishpajá Melavá)</div><div class=\"si-meta\">Borradores en hebreo por WhatsApp • <a href=\"javascript:void(0)\" onclick=\"openTerm('community_letters')\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Enviar →</a></div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En espera</button></div>",
      "#mg-1": "<div class=\"mg-header\"><span class=\"mg-title\">1. Carpeta Extranjera y Antecedentes Penales</span><span class=\"mg-badge\">Reloj 180d</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Partida Literal de Nacimiento + Apostilla de La Haya</div><div class=\"si-meta\">Copia fiel del libro con nombres de los padres</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Completado</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Fe de Soltería, Matrimonio/Divorcio + Apostillas</div><div class=\"si-meta\">Menos de 180 días al abrir el expediente</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En espera</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Antecedentes Penales Federales (3 Países) + Apostilla</div><div class=\"si-meta\">Nacimiento + Ciudadanías + Residencia >1 año desde los 14</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ En espera</button></div>",
      "#mg-2": "<div class=\"mg-header\"><span class=\"mg-title\">2. Curso Reconocido Rabanut y Examen Beit Din</span><span class=\"mg-badge\">Vías 2 y 3</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Curso con Rabino Patrocinador (Pareja Inscrita)</div><div class=\"si-meta\">Rav Melavé reconocido por la Rabanut</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Completado</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Madrijat Kalá Certificada (Pureza Familiar)</div><div class=\"si-meta\">Certificado oficial para el Beit Din</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ No iniciado</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">150 Preguntas del Beit Din y 12 Canciones de Shabat</div><div class=\"si-meta\">Simulador Ma'amad Beit Din • <a href=\"/app?module=beit-din-150\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Practicar →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ No iniciado</button></div>",
      "#mg-3": "<div class=\"mg-header\"><span class=\"mg-title\">3. Validación Gran Rabinato y Misrad HaPanim</span><span class=\"mg-badge\">Protección Familiar</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Validación Beit HaDin HaGadol (Ishur Guiur)</div><div class=\"si-meta\">Protege las bodas por la Rabanut de futuros hijos</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ No iniciado</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Formulario Hebreo Ash/1 o Ash/3 + Mijtav Hesber</div><div class=\"si-meta\">Abrir expediente en la Cita #1</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ No iniciado</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Sincronización de 80 Preguntas en 2 Teléfonos</div><div class=\"si-meta\">Prueba de entrevista separada • <a href=\"/app?module=couples-sync\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Sincronizar →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ No iniciado</button></div>",
      flag: "🇪🇸/🇦🇷", label: "ES", name: "Español (España/LatAm)",
      police: "Certificado de Antecedentes Penales (Ministerio de Justicia / RNR Argentina)",
      birth: "Partida / Acta de Nacimiento Literal (Copia Fiel del Libro — NO en extracto)",
      single: "Fe de Soltería / Declaración Jurada de Estado Civil apostillada",
      rabbi: "Certificado de Judaísmo (Ishur Yahadut) de Rabinato Ortodoxo reconocido",
      apostille: "Apostilla de La Haya (Ministerio de Relaciones Exteriores / Colegios Notariales)"
    },
    de: {
      "#mg-0": "<div class=\"mg-header\"><span class=\"mg-title\">0. 9 Monate Gemeinde in Israel & Empfehlungsbriefe</span><span class=\"mg-badge\">100% in Israel</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Briefe von Rabbiner & Gastfamilie (Mischpacha Melava)</div><div class=\"si-meta\">Hebräische Entwürfe per WhatsApp • <a href=\"javascript:void(0)\" onclick=\"openTerm('community_letters')\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Senden →</a></div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ Wartend</button></div>",
      "#mg-1": "<div class=\"mg-header\"><span class=\"mg-title\">1. Auslands-Dossier & Führungszeugnisse (BfAA)</span><span class=\"mg-badge\">180-Tage-Frist</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Beglaubigte Abschrift aus dem Geburtenregister + Apostille</div><div class=\"si-meta\">Original mit Namen beider Eltern</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Erledigt</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Erweiterte Meldebescheinigung (Ledigkeit), Scheidung + Apostille</div><div class=\"si-meta\">Jünger als 180 Tage bei Akteneröffnung</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ Wartend</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Führungszeugnisse (3-Länder-Regel) + BfAA-Apostille</div><div class=\"si-meta\">Geburtsland + Staatsbürgerschaften + Wohnländer >1J ab 14</div></div><button class=\"status-pill\" data-state=\"waiting\" onclick=\"cycleStatus(this)\">⏳ Wartend</button></div>",
      "#mg-2": "<div class=\"mg-header\"><span class=\"mg-title\">2. Anerkannter Rabbinatskurs & Beit-Din-Prüfung</span><span class=\"mg-badge\">Weg 2 & 3</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Kurs mit Betreuendem Rabbiner (Beide Partner)</div><div class=\"si-meta\">Vom Rabbinat anerkannter Rav Melaveh</div></div><button class=\"status-pill\" data-state=\"complete\" onclick=\"cycleStatus(this)\">✅ Erledigt</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Zertifizierte Madrichat Kallah (Taharat HaMischpacha)</div><div class=\"si-meta\">Offizielles Zertifikat für das Beit Din</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Nicht begonnen</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">150 Beit-Din-Fragen & 12 Schabbat-Lieder</div><div class=\"si-meta\">Ma'amad Beit Din Simulator • <a href=\"/app?module=beit-din-150\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">Jetzt üben →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Nicht begonnen</button></div>",
      "#mg-3": "<div class=\"mg-header\"><span class=\"mg-title\">3. Oberrabbinats-Validierung & Misrad HaPanim</span><span class=\"mg-badge\">Familienschutz</span></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Beit HaDin HaGadol Validierung (Ischur Giur)</div><div class=\"si-meta\">Schützt Rabbinats-Hochzeiten zukünftiger Kinder</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Nicht begonnen</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">Hebräisches Formular Asch/1 oder Asch/3 + Michtav Hesber</div><div class=\"si-meta\">Akte direkt beim 1. Termin eröffnen</div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Nicht begonnen</button></div><div class=\"sub-item\"><div class=\"si-info\"><div class=\"si-name\">80-Fragen-Paar-Sync auf 2 Handys</div><div class=\"si-meta\">Getrenntes Interview-Training • <a href=\"/app?module=couples-sync\" style=\"color:var(--sky);font-weight:800;text-decoration:none;\">2 Handys Synchronisieren →</a></div></div><button class=\"status-pill\" data-state=\"not-started\" onclick=\"cycleStatus(this)\">⚪ Nicht begonnen</button></div>",
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
        body: "Bei steigendem Antisemitismus oder 9 Monaten Konsulats-Stau: Nutzen Sie das Notfall-Protokoll (inkl. humanitärer Ausnahmegenehmigung für die 9-Monats-Regel oder Beit-Din-Aktenübertragung). Reisen Sie als Tourist (B/2) ein und beantragen Sie Alija direkt in Israel (Schinui Ma'amad) mit diesen apostillierten Originalen.",
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
        <p class="tc-lead">Face à la montée de l'antisémitisme ou aux 9 mois d'attente consulaire, activez le protocole d'urgence (y compris dérogation aux 9 mois post-Mikvé ou transfert de dossier Beit Din). Entrez avec un visa B/2 et faites votre changement de statut (<em>Shinui Ma'amad</em>) directement au Misrad HaPanim grâce à vos originaux apostillés :</p>
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
        <p class="tc-lead">Ante el aumento del antisemitismo global o los 9 meses de espera consular, active el protocolo de emergencia (incluyendo exención humanitaria de 9 meses post-Mikve o transferencia de Beit Din). Entre con visa B/2 y tramite su cambio de estatus (<em>Shinui Ma'amad</em>) en el Misrad HaPanim con sus originales apostillados:</p>
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
        <p class="tc-lead">Bei steigendem Antisemitismus oder 9 Monaten Konsulats-Stau: Nutzen Sie das Notfall-Protokoll (inkl. humanitärer Ausnahmegenehmigung für die 9-Monats-Regel oder Beit-Din-Aktenübertragung). Reisen Sie mit B/2-Visum ein und beantragen Sie den Statuswechsel (<em>Schinui Ma'amad</em>) direkt im Misrad HaPanim:</p>
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

  window.TERM_DETAILS_I18N = {
    fr: {
      go_bag: {
        tag: "URGENCE ANTISÉMITISME • DOSSIER GO-BAG & SHINUI MA'AMAD",
        title: "Départ d'Urgence ? Emportez 2 Originaux Apostillés en Bagage Cabine",
        body: "Face à la montée de l'antisémitisme ou aux blocages consulaires, voici le protocole pour faire votre Aliyah ou transfert de Giyur directement en Israël (Shinui Ma'amad) :",
        badTitle: "🎒 Les 7 Pièces Obligatoires en Cabine (2 Exemplaires Apostillés !)",
        badText: "<ul><li><strong>1. Deux Copies Intégrales d'Acte de Naissance + Apostille</strong> (jamais un Extrait).</li><li><strong>2. Bulletin n°3 du Casier Judiciaire + Apostille</strong> (<180 jours).</li><li><strong>3. Certificat de Célibat / Livret de Famille + Apostille.</strong></li><li><strong>4. Attestation de Judaïté du Consistoire</strong> + Ketouba des parents.</li><li><strong>5. Procuration Notariée (Yipui Koach)</strong> laissée en France/BE/CH.</li></ul>",
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
        badText: "<ul><li><strong>1. Dos Partidas Literales de Nacimiento + Apostilla de La Haya.</strong></li><li><strong>2. Antecedentes Penales Federales (RNR / Justicia) + Apostilla</strong> (<180 días).</li><li><strong>3. Fe de Soltería / Actas de Matrimonio o Divorcio + Apostilla.</strong></li><li><strong>4. Certificado de Judaísmo (Ishur Yahadut)</strong> + Ketubá de los padres.</li><li><strong>5. Poder Notarial (Yipui Koaj)</strong> dejado en su país.</li></ul>",
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
        badText: "<ul><li><strong>1. Zwei Beglaubigte Abschriften aus dem Geburtenregister + Apostille.</strong></li><li><strong>2. Erweitertes Führungszeugnis + BfAA-Apostille</strong> (<180 Tage).</li><li><strong>3. Erweiterte Meldebescheinigung (Ledigkeit) / Heirats- & Scheidungsurkunden + Apostille.</strong></li><li><strong>4. Orthodoxer Ischur Jahadut</strong> + Ketubba der Eltern.</li><li><strong>5. Notarielle Vollmacht (Jipui Koach)</strong> im Heimatland.</li></ul>",
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