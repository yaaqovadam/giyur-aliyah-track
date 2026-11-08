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
  window.OBSTACLE_I18N = window.OBSTACLE_I18N || {};
  window.TRACKS_I18N = window.TRACKS_I18N || {};
  window.TERM_DETAILS_I18N = window.TERM_DETAILS_I18N || {};
  window.UI_BLOCKS_I18N = window.UI_BLOCKS_I18N || {};
})();
