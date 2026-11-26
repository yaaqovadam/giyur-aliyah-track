/* Giyur Aliyah Track — PIBA 8-Form Profile Dossier, Per-Form Discrepancy Engine & Bilingual Interleaved PDF Generator */
(function() {
  'use strict';

  var DRAFT_KEY = 'gat_unified_forms_draft_v1';
  var SCANNED_KEY = 'gat_scanned_certs_v1';
  var PRE_HEB_KEY = 'gat_pre_hebrew_backup_v1';

  var FORM_ORDER = ['ash3', 'ash6', 'nespach_alef', 'ash456', 'ash1', 'mr14a', 'mr14b', 'sec_cv'];

  var FORM_META = {
    ash3: {
      codeHe: 'אש/3', codeEn: 'Ash/3', pages: 2,
      names: {
        en: 'Form Ash/3 — Visa Extension / Change Category (2p)',
        he: 'טופס אש/3 — הארכת רישיון / החלפת אשרה (2 עמ׳)',
        fr: 'Form. Ash/3 — Prolongation / Changement de Visa (2p)',
        es: 'Form. Ash/3 — Prórroga / Cambio de Visa (2p)',
        de: 'Form. Asch/3 — Visaverlängerung / Wechsel (2S)',
        ru: 'Анкета Аш/3 — Продление / смена визы (2 стр.)'
      }
    },
    ash6: {
      codeHe: 'אש/6', codeEn: 'Ash/6', pages: 6,
      names: {
        en: 'Form Ash/6 — Married Spousal Status & Lease (6p)',
        he: 'טופס אש/6 — מעמד לבן זוג נשוי + תצהיר שכ״ד (6 עמ׳)',
        fr: 'Form. Ash/6 — Statut Conjoint Marié + Bail (6p)',
        es: 'Form. Ash/6 — Residencia Cónyuge Casado (6p)',
        de: 'Form. Asch/6 — Ehepartner-Stufenverfahren (6S)',
        ru: 'Анкета Аш/6 — СТУПРО для супругов в браке (6 стр.)'
      }
    },
    nespach_alef: {
      codeHe: 'נספח א׳', codeEn: 'Nespach Alef', pages: 1,
      names: {
        en: 'Nespach Alef — 13-Clause Couples Affidavit (1p)',
        he: 'נספח א׳ — תצהיר 13 סעיפים לבני זוג (1 עמ׳)',
        fr: 'Nespach Alef — Affidavit 13 Clauses Couple (1p)',
        es: 'Nespaj Alef — Declaración 13 Cláusulas Pareja (1p)',
        de: 'Nespach Alef — 13-Punkte-Paarerklärung (1S)',
        ru: 'Неспах Алеф — Декларация 13 пунктов пары (1 стр.)'
      }
    },
    ash456: {
      codeHe: 'אש/456', codeEn: 'Ash/456', pages: 6,
      names: {
        en: 'Form Ash/456 + MR/14 — In-Israel Aliyah Packet (6p)',
        he: 'טופס אש/456 + מר/14 — עלייה מתוך ישראל (6 עמ׳)',
        fr: 'Form. Ash/456 + MR/14 — Aliyah en Israël (6p)',
        es: 'Form. Ash/456 + MR/14 — Aliyá en Israel (6p)',
        de: 'Form. Asch/456 + MR/14 — Inlands-Alija (6S)',
        ru: 'Анкета Аш/456 + МР/14 — Алия внутри Израиля (6 стр.)'
      }
    },
    ash1: {
      codeHe: 'אש/1', codeEn: 'Ash/1', pages: 2,
      names: {
        en: 'Form Ash/1 — Entry Visa Application / Inviter (2p)',
        he: 'טופס אש/1 — בקשה לאשרת כניסה לישראל (2 עמ׳)',
        fr: 'Form. Ash/1 — Demande de Visa d’Entrée (2p)',
        es: 'Form. Ash/1 — Solicitud Visa de Entrada (2p)',
        de: 'Form. Asch/1 — Einreisevisum-Antrag (2S)',
        ru: 'Анкета Аш/1 — Заявление на въездную визу (2 стр.)'
      }
    },
    mr14a: {
      codeHe: 'מר/14א׳', codeEn: 'MR/14a', pages: 1,
      names: {
        en: 'Form MR/14a — First Israeli Biometric ID (1p)',
        he: 'טופס מר/14 א׳ — רישום ותעודת זהות ראשונה (1 עמ׳)',
        fr: 'Form. MR/14a — Première Teudat Zehut (1p)',
        es: 'Form. MR/14a — Primera Teudat Zehut (1p)',
        de: 'Form. MR/14a — Erste Teudat Zehut (1S)',
        ru: 'Анкета МР/14а — Первый Теудат-Зеут (1 стр.)'
      }
    },
    mr14b: {
      codeHe: 'מר/14ב׳', codeEn: 'MR/14b', pages: 1,
      names: {
        en: 'Form MR/14b — Foreign Passports Declaration (1p)',
        he: 'טופס מר/14 ב׳ — הצהרת אזרחויות ודרכונים זרים (1 עמ׳)',
        fr: 'Form. MR/14b — Déclaration Passeports Étrangers (1p)',
        es: 'Form. MR/14b — Declaración Pasaportes Extranjeros (1p)',
        de: 'Form. MR/14b — Erklärung Ausländische Pässe (1S)',
        ru: 'Анкета МР/14б — Декларация загранпаспортов (1 стр.)'
      }
    },
    sec_cv: {
      codeHe: 'קורות חיים', codeEn: 'Security CV', pages: 11,
      names: {
        en: 'Security CV — 11-Page Biographical Questionnaire',
        he: 'שאלון קורות חיים — 11 עמודים (לשכת הקשר / אשרות)',
        fr: 'CV Sécurité — Questionnaire Biographique (11p)',
        es: 'CV Seguridad — Cuestionario Biográfico (11p)',
        de: 'Sicherheits-CV — Biografischer Fragebogen (11S)',
        ru: 'Анкета безопасности — Биография (11 стр.)'
      }
    }
  };

  // Canonical field definitions & labels across all 8 forms (for native mirror PDF + discrepancy alerts)
  var FIELD_LABELS_6L = {
    pf_surname_he: { cat: 'name', en: 'Applicant Surname (Hebrew Row)', he: 'שם משפחה (בעברית)', fr: 'Nom de famille (ligne hébreu)', es: 'Apellido (fila en hebreo)', de: 'Nachname (Hebräisch)', ru: 'Фамилия (строка на иврите)' },
    pf_surname_en: { cat: 'name', en: 'Applicant Surname (Passport Latin)', he: 'שם משפחה (בלועזית כמו בדרכון)', fr: 'Nom de famille (Latin Passeport)', es: 'Apellido (Latín Pasaporte)', de: 'Nachname (Pass-Latein)', ru: 'Фамилия (латиницей по паспорту)' },
    pf_given_he: { cat: 'name', en: 'Applicant Given Name(s) (Hebrew Row)', he: 'שם פרטי (בעברית)', fr: 'Prénom(s) (ligne hébreu)', es: 'Nombre(s) (fila en hebreo)', de: 'Vorname(n) (Hebräisch)', ru: 'Имя (строка на иврите)' },
    pf_given_en: { cat: 'name', en: 'Applicant Given Name(s) (Passport Latin)', he: 'שם פרטי (בלועזית כמו בדרכון)', fr: 'Prénom(s) (Latin Passeport)', es: 'Nombre(s) (Latín Pasaporte)', de: 'Vorname(n) (Pass-Latein)', ru: 'Имя (латиницей по паспорту)' },
    pf_prior_names: { cat: 'name', en: 'Prior / Maiden Surname(s)', he: 'שמות משפחה קודמים / נעורים', fr: 'Noms antérieurs / jeune fille', es: 'Apellidos anteriores / soltera', de: 'Frühere Namen / Geburtsname', ru: 'Прежние / девичья фамилия' },
    pf_marital: { cat: 'status', en: 'Marital Status', he: 'מצב משפחתי', fr: 'État civil', es: 'Estado civil', de: 'Familienstand', ru: 'Семейное положение' },
    pf_gender: { cat: 'status', en: 'Gender', he: 'מין', fr: 'Sexe', es: 'Sexo', de: 'Geschlecht', ru: 'Пол' },
    pf_dob: { cat: 'date', en: 'Date of Birth', he: 'תאריך לידה', fr: 'Date de naissance', es: 'Fecha de nacimiento', de: 'Geburtsdatum', ru: 'Дата рождения' },
    pf_hebrew_dob: { cat: 'date', en: 'Hebrew Birth Date', he: 'תאריך לידה עברי', fr: 'Date de naissance hébraïque', es: 'Fecha de nacimiento hebrea', de: 'Hebräisches Geburtsdatum', ru: 'Еврейская дата рождения' },
    pf_birth_country: { cat: 'place', en: 'City & Country of Birth', he: 'עיר וארץ לידה', fr: 'Ville et pays de naissance', es: 'Ciudad y país de nacimiento', de: 'Geburtsort & Geburtsland', ru: 'Город и страна рождения' },
    pf_citizenship: { cat: 'place', en: 'Current Citizenship(s)', he: 'אזרחות נוכחית', fr: 'Nationalité(s)', es: 'Ciudadanía(s)', de: 'Staatsangehörigkeit', ru: 'Гражданство' },
    pf_religion_nat: { cat: 'status', en: 'Religion & Nationality (Leom)', he: 'דת ולאום', fr: 'Religion et nationalité', es: 'Religión y nacionalidad', de: 'Religion & Nationalität', ru: 'Вероисповедание и национальность' },
    pf_father_he: { cat: 'parent_name', en: 'Father\'s Full Name', he: 'שם האב המלא', fr: 'Nom complet du père', es: 'Nombre completo del padre', de: 'Vollständiger Name des Vaters', ru: 'Полное имя отца' },
    pf_father_dob: { cat: 'date', en: 'Father\'s Date of Birth', he: 'תאריך לידת האב', fr: 'Date de naissance du père', es: 'Fecha nac. del padre', de: 'Geburtsdatum des Vaters', ru: 'Дата рождения отца' },
    pf_mother_he: { cat: 'parent_name', en: 'Mother\'s Full Name', he: 'שם האם המלא', fr: 'Nom complet de la mère', es: 'Nombre completo de la madre', de: 'Vollständiger Name der Mutter', ru: 'Полное имя матери' },
    pf_mother_dob: { cat: 'date', en: 'Mother\'s Date of Birth', he: 'תאריך לידת האם', fr: 'Date de naissance de la mère', es: 'Fecha nac. de la madre', de: 'Geburtsdatum der Mutter', ru: 'Дата рождения матери' },
    pf_mother_maiden: { cat: 'parent_name', en: 'Mother\'s Maiden Surname', he: 'שם נעורים של האם', fr: 'Nom de jeune fille de la mère', es: 'Apellido de soltera de la madre', de: 'Geburtsname der Mutter', ru: 'Девичья фамилия матери' },
    pf_foreign_grandfather: { cat: 'parent_name', en: 'Paternal Grandfather\'s Name', he: 'שם הסב מצד האב', fr: 'Nom du grand-père paternel', es: 'Nombre del abuelo paterno', de: 'Name des Großvaters (väterl.)', ru: 'Имя дедушки по отцу' },
    pf_pass_num: { cat: 'id', en: 'Foreign Passport Number', he: 'מספר דרכון זר', fr: 'Numéro de passeport', es: 'Número de pasaporte', de: 'Reisepassnummer', ru: 'Номер загранпаспорта' },
    pf_pass_issue_date: { cat: 'date', en: 'Passport Issue Date', he: 'תאריך הוצאת דרכון', fr: 'Date de délivrance passeport', es: 'Fecha emisión pasaporte', de: 'Ausstellungsdatum Pass', ru: 'Дата выдачи паспорта' },
    pf_pass_exp_date: { cat: 'date', en: 'Passport Expiry Date', he: 'תוקף דרכון עד', fr: 'Date d’expiration passeport', es: 'Vencimiento pasaporte', de: 'Gültig bis (Pass)', ru: 'Срок действия паспорта' },
    pf_tz: { cat: 'id', en: 'Applicant Israeli ID (Teudat Zehut)', he: 'מספר ת״ז מבקש/ת', fr: 'Teudat Zehut du demandeur', es: 'Teudat Zehut del solicitante', de: 'Teudat Zehut Antragsteller', ru: 'Теудат-Зеут заявителя' },
    pf_abroad_addr: { cat: 'address', en: 'Permanent Address Abroad', he: 'מען קבוע בחו״ל', fr: 'Adresse permanente à l’étranger', es: 'Dirección permanente en el exterior', de: 'Ständige Adresse im Ausland', ru: 'Постоянный адрес за рубежом' },
    pf_il_addr_he: { cat: 'address', en: 'Full Registered Address in Israel', he: 'כתובת מגורים בישראל', fr: 'Adresse complète en Israël', es: 'Dirección completa en Israel', de: 'Adresse in Israel', ru: 'Адрес проживания в Израиле' },
    pf_phone_il: { cat: 'contact', en: 'Israeli Mobile Phone', he: 'טלפון נייד בישראל', fr: 'Téléphone en Israël', es: 'Teléfono en Israel', de: 'Telefon in Israel', ru: 'Телефон в Израиле' },
    pf_email: { cat: 'contact', en: 'Email Address', he: 'כתובת אימייל', fr: 'Adresse e-mail', es: 'Correo electrónico', de: 'E-Mail-Adresse', ru: 'Электронная почта' },
    pf_inst_details: { cat: 'text', en: 'Studying Institution / Ulpan / Yeshiva', he: 'פרטי מוסד הלימודים / אולפן', fr: 'Établissement d’études / Oulpan', es: 'Institución de estudios / Ulpán', de: 'Studieninstitut / Ulpan', ru: 'Учебное заведение / Ульпан' },
    pf_sp_name_he: { cat: 'spouse_name', en: 'Israeli Spouse / Partner Full Name', he: 'שם מלא של בן/בת הזוג', fr: 'Nom complet du conjoint', es: 'Nombre completo del cónyuge', de: 'Name des Ehepartners', ru: 'Полное имя супруга(и)' },
    pf_sp_tz: { cat: 'id', en: 'Spouse 9-Digit Israeli Teudat Zehut', he: 'מספר ת״ז של בן/בת הזוג', fr: 'Teudat Zehut du conjoint', es: 'Teudat Zehut del cónyuge', de: 'Teudat Zehut Ehepartner', ru: 'Теудат-Зеут супруга(и)' },
    pf_sp_parents_grand: { cat: 'text', en: 'Spouse DOB, Father, Mother & Grandfather', he: 'ת. לידה, אב, אם וסב של בן הזוג', fr: 'Date naiss., parents & grand-père conjoint', es: 'Fecha nac., padres y abuelo cónyuge', de: 'Geburtsdatum & Eltern Ehepartner', ru: 'Дата рожд., родители и дед супруга' },
    pf_marriage_details: { cat: 'text', en: 'Marriage Date & City/Country', he: 'תאריך ומקום נישואין', fr: 'Date et lieu de mariage', es: 'Fecha y lugar de matrimonio', de: 'Heiratsdatum & -ort', ru: 'Дата и место брака' },
    pf_entry_date_port: { cat: 'text', en: 'Israel Entry Date & Border Port', he: 'תאריך ושער כניסה לישראל', fr: 'Date et point d’entrée en Israël', es: 'Fecha y puerto de entrada a Israel', de: 'Einreisedatum & Grenzübergang', ru: 'Дата и пункт въезда в Израиль' },
    pf_children_table: { cat: 'text', en: 'Accompanying Children Under 18', he: 'ילדים נלווים מתחת לגיל 18', fr: 'Enfants mineurs <18 ans', es: 'Hijos menores de 18 años', de: 'Kinder unter 18 Jahren', ru: 'Дети до 18 лет' },
    pf_ash3_action: { cat: 'text', en: 'Requested Visa Extension / Category', he: 'סוג הארכה / החלפת אשרה מבוקשת', fr: 'Prolongation / catégorie demandée', es: 'Prórroga / categoría solicitada', de: 'Gewünschte Verlängerung / Visum', ru: 'Запрашиваемое продление / виза' },
    pf_456_shvut: { cat: 'text', en: 'Law of Return Eligibility Clause', he: 'סעיף זכאות בחוק השבות', fr: 'Clause Loi du Retour', es: 'Cláusula Ley del Retorno', de: 'Anspruch Rückkehrgesetz', ru: 'Статья Закона о возвращении' },
    pf_456_settlement: { cat: 'text', en: 'Prior Stays, Bank, Housing & Schooling', he: 'שהיות קודמות, בנק, דיור והשכלה', fr: 'Séjours, banque, logement & études', es: 'Estadías, banco, vivienda y estudios', de: 'Aufenthalte, Bank, Wohnung & Bildung', ru: 'Пребывания, банк, жилье и учеба' },
    pf_ash1_consulate: { cat: 'text', en: 'Purpose of Entry & Consulate Abroad', he: 'מטרת הכניסה ונציגות ישראל בחו״ל', fr: 'Motif d’entrée & Consulat', es: 'Motivo de entrada y Consulado', de: 'Einreisezweck & Konsulat', ru: 'Цель въезда и консульство' },
    pf_ash6_refs: { cat: 'text', en: 'Israeli Acquaintances / Witnesses', he: 'מכרים ועדים בישראל', fr: 'Témoins en Israël', es: 'Testigos en Israel', de: 'Zeugen in Israel', ru: 'Свидетели в Израиле' },
    pf_ll_affidavit: { cat: 'text', en: 'Landlord & Lease Details (Page 5)', he: 'פרטי משכיר וחוזה שכירות (עמ׳ 5)', fr: 'Propriétaire et bail (Page 5)', es: 'Propietario y alquiler (Pág. 5)', de: 'Vermieter & Mietvertrag (S. 5)', ru: 'Арендодатель и договор (стр. 5)' },
    pf_cv_details: { cat: 'text', en: 'Education, Employment & Family CV', he: 'השכלה, תעסוקה ובני משפחה', fr: 'Études, emplois & famille', es: 'Estudios, empleos y familia', de: 'Bildung, Beruf & Familie', ru: 'Учеба, работа и родственники' },
    pf_rel_story: { cat: 'text', en: 'Statutory Explanation Letter (Michtav Hesber)', he: 'מכתב הסבר מנומק לפקיד', fr: 'Lettre d’explication (Michtav Hesber)', es: 'Carta explicativa (Mijtav Hesber)', de: 'Begleitschreiben (Michtav Hesber)', ru: 'Пояснительное письмо (Михтав Эсбер)' }
  };

  // Exact Page-by-Page field map so Page N of the Native Mirror PDF matches Page N of the Official Hebrew PDF!
  var FORM_PAGE_FIELDS = {
    ash3: [
      ['pf_ash3_action', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names', 'pf_marital', 'pf_birth_country', 'pf_dob', 'pf_religion_nat', 'pf_citizenship', 'pf_father_he', 'pf_father_dob', 'pf_mother_he', 'pf_mother_dob', 'pf_mother_maiden', 'pf_email', 'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_abroad_addr', 'pf_il_addr_he', 'pf_phone_il', 'pf_inst_details'],
      ['pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_pass_num', 'pf_sp_name_he', 'pf_sp_tz', 'pf_children_table', 'pf_rel_story']
    ],
    ash1: [
      ['pf_ash3_action', 'pf_sp_name_he', 'pf_sp_tz', 'pf_il_addr_he', 'pf_phone_il', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_father_he', 'pf_mother_he', 'pf_mother_maiden', 'pf_prior_names', 'pf_dob', 'pf_gender', 'pf_marital', 'pf_birth_country', 'pf_citizenship', 'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_ash1_consulate'],
      ['pf_surname_en', 'pf_given_en', 'pf_pass_num', 'pf_citizenship', 'pf_abroad_addr', 'pf_il_addr_he', 'pf_email', 'pf_children_table', 'pf_rel_story']
    ],
    nespach_alef: [
      ['pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_given_he', 'pf_surname_en', 'pf_given_en', 'pf_prior_names', 'pf_pass_num', 'pf_pass_exp_date', 'pf_il_addr_he', 'pf_phone_il', 'pf_email', 'pf_rel_story']
    ],
    mr14a: [
      ['pf_tz', 'pf_entry_date_port', 'pf_surname_he', 'pf_surname_en', 'pf_father_he', 'pf_given_he', 'pf_given_en', 'pf_mother_he', 'pf_prior_names', 'pf_citizenship', 'pf_pass_num', 'pf_dob', 'pf_hebrew_dob', 'pf_birth_country', 'pf_religion_nat', 'pf_il_addr_he', 'pf_gender', 'pf_marital', 'pf_foreign_grandfather', 'pf_marriage_details', 'pf_sp_tz', 'pf_children_table', 'pf_pass_issue_date', 'pf_pass_exp_date']
    ],
    mr14b: [
      ['pf_tz', 'pf_surname_he', 'pf_given_he', 'pf_citizenship', 'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_phone_il', 'pf_email']
    ],
    ash456: [
      ['pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names', 'pf_father_he', 'pf_mother_he', 'pf_mother_maiden', 'pf_foreign_grandfather', 'pf_dob', 'pf_hebrew_dob', 'pf_gender', 'pf_marital', 'pf_birth_country', 'pf_citizenship', 'pf_religion_nat', 'pf_pass_num', 'pf_pass_issue_date', 'pf_pass_exp_date', 'pf_il_addr_he', 'pf_phone_il', 'pf_sp_name_he', 'pf_sp_tz'],
      ['pf_surname_en', 'pf_given_en', 'pf_pass_num', 'pf_entry_date_port', 'pf_abroad_addr', 'pf_456_settlement', 'pf_children_table'],
      ['pf_surname_en', 'pf_given_en', 'pf_pass_num', 'pf_456_shvut', 'pf_sp_name_he', 'pf_sp_tz', 'pf_rel_story'],
      ['pf_surname_he', 'pf_given_he', 'pf_pass_num', 'pf_il_addr_he'],
      ['pf_tz', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_father_he', 'pf_mother_he', 'pf_dob', 'pf_birth_country', 'pf_il_addr_he'],
      ['pf_tz', 'pf_surname_he', 'pf_given_he', 'pf_citizenship', 'pf_pass_num', 'pf_pass_exp_date']
    ],
    ash6: [
      ['pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_given_he', 'pf_pass_num', 'pf_il_addr_he', 'pf_phone_il', 'pf_email'],
      ['pf_sp_name_he', 'pf_sp_tz', 'pf_sp_parents_grand', 'pf_marriage_details', 'pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names', 'pf_dob', 'pf_gender', 'pf_father_he', 'pf_foreign_grandfather', 'pf_mother_he', 'pf_mother_maiden', 'pf_birth_country', 'pf_citizenship', 'pf_pass_num', 'pf_pass_exp_date', 'pf_entry_date_port', 'pf_abroad_addr'],
      ['pf_children_table', 'pf_ash6_refs', 'pf_rel_story'],
      ['pf_sp_name_he', 'pf_sp_tz', 'pf_surname_he', 'pf_given_he', 'pf_pass_num'],
      ['pf_ll_affidavit', 'pf_il_addr_he', 'pf_children_table'],
      ['pf_sp_name_he', 'pf_surname_he', 'pf_given_he', 'pf_il_addr_he']
    ],
    sec_cv: [
      ['pf_surname_he', 'pf_surname_en', 'pf_given_he', 'pf_given_en', 'pf_prior_names', 'pf_dob', 'pf_birth_country', 'pf_citizenship', 'pf_pass_num', 'pf_il_addr_he', 'pf_phone_il', 'pf_email'],
      ['pf_father_he', 'pf_mother_he', 'pf_sp_name_he', 'pf_sp_tz', 'pf_children_table', 'pf_cv_details']
    ]
  };

  var I18N_PRO = {
    en: {
      hubTitle: '📂 Your 8 Official Misrad HaPanim Forms (Live Auto-Fill & PDF Downloads)',
      hubSub: 'Every certificate you scan auto-fills all 8 forms below. Download the Official Hebrew PDF (even partial progress!) or the Page-by-Page English + Hebrew Cross-Reference PDF anytime:',
      btnOpen: '✏️ Edit',
      btnDlHe: '⬇ Official Hebrew PDF',
      btnDlBi: '⬇ Page-by-Page EN + HE PDF',
      readyPct: '{pct}% Filled',
      notStarted: 'Auto-fills on scan',
      conflictBadge: '🔴 {n} Conflict(s) — Tap to Inspect',
      fieldConflictPill: '🔴 Differs from Master Dossier ("{master}") — Tap for Details',
      pwRichReason: '🔒 Paid Service Required — Here is everything your Statutory Hebrew Forms Pass ($89 Sprint / $149 Lifetime) unlocks immediately:\n• 📸 1-Scan Document Auto-Fill (Passport, Birth/Marriage Certs & Israeli TZ Sefach populate all 8 PIBA forms automatically)\n• 🖨️ Pixel-Calibrated Royal-Blue Clerk-Hebrew PDF Stamping (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef & 11p Security CV)\n• 📖 Page-by-Page Bilingual Cross-Reference PDF (Every Hebrew page paired side-by-side with an English mirror page showing your exact inputs & translations)\n• 🛡️ 180-Day Apostille Auditor, Name-Mismatch Detector & Statutory Refusal/Extension Letters',
      mirrorWarnBanner: 'DO NOT HAND THIS PAGE TO THE CLERK! PERSONAL CROSS-REFERENCE MIRROR FOR PAGE {p} OF {tot}',
      mirrorSubBanner: 'Compare this page directly against Official Hebrew Page {p} (immediately preceding this sheet). Sign ONLY the Hebrew pages in front of the clerk.',
      colField: 'OFFICIAL BOX ON PAGE {p}',
      colYourLang: 'YOUR INPUT / MEANING',
      colStamped: 'STAMPED ON OFFICIAL PDF',
      emptyBox: '(Blank so far — fill in intake or scan doc)',
      generatingToast: '⏳ Generating {mode} PDF for {form}...',
      doneToast: '✅ Downloaded {file}!',
      modalTitle: '🚨 Data Discrepancy Detected on {form}',
      modalSub: 'You customized {n} field(s) on {form} so they no longer match your Master Dossier / Scanned Certificates. That custom value is saved on {form}, but review the clerk risk below:',
      typoHead: '⚠️ Likely 1–2 Letter Spelling Typo Detected',
      typoBody: '"{cur}" on {form} differs by only 1–2 letters from "{master}" in your Master Dossier / Scanned Docs. Misrad HaPanim clerks routinely stall files when a name has even a 1-letter spelling discrepancy!',
      diffNameHead: '🛑 Completely Different Name Detected — Name-Change Trap!',
      diffNameBody: '"{cur}" on {form} is completely different from "{master}". If you changed your legal or Hebrew name (via Marriage, Conversion/Giyur, or Deed Poll) and have NOT uploaded your Apostilled Name-Change / Marriage Certificate or Lawyer Same-Person Affidavit, the clerk will freeze your file!',
      diffDataHead: '⚠️ Conflicting Date / ID / Address Across Forms',
      diffDataBody: '"{cur}" on {form} differs from your Master Dossier value "{master}". Clerks cross-check every form in your packet for 100% consistency.',
      btnFixTypo: '↺ Revert {form} to "{master}"',
      btnUploadProof: '📸 Upload Name-Change / Marriage Certificate',
      btnMakeMaster: '✓ Make "{cur}" My New Master Value Across All Forms',
      btnKeepOverride: 'Keep "{cur}" on {form} Only (Close)'
    },
    he: {
      hubTitle: '📂 8 טפסי משרד הפנים שלך (מילוי אוטומטי והורדת PDF בכל שלב)',
      hubSub: 'כל תעודה שנסרקת ממלאת אוטומטית את כלל 8 הטפסים. ניתן להוריד את הטופס הרשמי בעברית (גם באמצע העבודה!) או קובץ השוואה עמוד-מול-עמוד:',
      btnOpen: '✏️ עריכה',
      btnDlHe: '⬇ טופס רשמי (עברית)',
      btnDlBi: '⬇ PDF השוואה עמוד-מול-עמוד',
      readyPct: '{pct}% מולא',
      notStarted: 'מתמלא בסריקה',
      conflictBadge: '🔴 {n} אי-התאמות — לחצו לבדיקה',
      fieldConflictPill: '🔴 שונה מתיק המקור ("{master}") — לחצו להסבר',
      pwRichReason: '🔒 שירות זה פתוח למנויים — הנה כל מה שהמנוי פותח עבורכם מיידית ($89 ל-90 יום / $149 לכל החיים):\n• 📸 סריקה חכמה ומילוי אוטומטי של כל 8 טפסי משרד הפנים מתעודות לידה, נישואין, דרכון וספח ת״ז\n• 🖨️ הטבעת PDF רשמי בדיו כחול תקני בעברית ובאותיות לטיניות (אש/1, אש/3, אש/6, אש/456, מר/14א׳, מר/14ב׳, נספח א׳ וקורות חיים)\n• 📖 קובץ PDF משולב עמוד-אחר-עמוד לבקרה אישית מלאה לפני ההגשה לפקיד\n• 🛡️ בדיקת אפוסטיל 180 יום, גילוי סתירות בשמות והפקת מכתבי התראה והארכה',
      mirrorWarnBanner: 'אין להגיש דף זה לפקיד! דף בקרה והשוואה אישי עבור עמוד {p} מתוך {tot}',
      mirrorSubBanner: 'השוו דף זה מול עמוד {p} הרשמי בעברית המופיע מיד לפניו. יש לחתום אך ורק על הדפים הרשמיים בפני הפקיד.',
      colField: 'שדה בטופס הרשמי (עמ׳ {p})',
      colYourLang: 'הקלט שלך / משמעות',
      colStamped: 'הערך שהוטבע ב-PDF',
      emptyBox: '(טרם מולא)',
      generatingToast: '⏳ מפיק קובץ PDF עבור {form}...',
      doneToast: '✅ הקובץ {file} ירד בהצלחה!',
      modalTitle: '🚨 זוהתה אי-התאמה בטופס {form}',
      modalSub: 'שיניתם {n} שדות בטופס {form} כך שאינם תואמים לנתוני המקור בתיק. הערך נשמר עבור {form}, אך שימו לב לסיכון מול הפקיד:',
      typoHead: '⚠️ חשד לשגיאת כתיב של אות אחת או שתיים',
      typoBody: 'הערך "{cur}" בטופס {form} שונה באותיות בודדות מהערך "{master}" בתעודות הסרוקות. פקידי משרד הפנים מעכבים תיקים אפילו על אות חסרה!',
      diffNameHead: '🛑 זוהה שם שונה לחלוטין — מלכודת שינוי שם!',
      diffNameBody: 'הערך "{cur}" בטופס {form} שונה לחלוטין מ-"{master}". אם שיניתם שם (נישואין, גיור או שינוי שם) ולא צירפתם תעודת שינוי שם מאומתת באפוסטיל או תצהיר עו״ד ("אותו אדם"), הפקיד יקפיא את התיק!',
      diffDataHead: '⚠️ סתירה בתאריך / מספר זהות / כתובת בין הטפסים',
      diffDataBody: 'הערך "{cur}" בטופס {form} סותר את ערך המקור "{master}".',
      btnFixTypo: '↺ החזר ב-{form} לערך "{master}"',
      btnUploadProof: '📸 העלאת תעודת נישואין / שינוי שם',
      btnMakeMaster: '✓ עדכן את "{cur}" כערך הקבוע בכל הטפסים',
      btnKeepOverride: 'השאר את "{cur}" בטופס {form} בלבד (סגור)'
    },
    fr: {
      hubTitle: '📂 Vos 8 Formulaires Officiels Misrad HaPanim (Auto-Fill & Téléchargements PDF)',
      hubSub: 'Chaque acte scanné pré-remplit les 8 formulaires ci-dessous. Téléchargez le PDF Officiel en Hébreu ou le PDF Miroir Page-par-Page (Français + Hébreu) à tout moment :',
      btnOpen: '✏️ Éditer',
      btnDlHe: '⬇ PDF Officiel Hébreu',
      btnDlBi: '⬇ PDF Page-par-Page FR + HE',
      readyPct: '{pct}% Rempli',
      notStarted: 'Auto-rempli au scan',
      conflictBadge: '🔴 {n} Écart(s) — Voir détail',
      fieldConflictPill: '🔴 Diffère du dossier maître (« {master} ») — Cliquez ici',
      pwRichReason: '🔒 Pass Requis — Voici tout ce que débloque immédiatement le Moteur des 8 Formulaires PIBA ($89 90j / $149 À vie) :\n• 📸 Scan Intelligent & Pré-remplissage des 8 formulaires depuis Passeport, Acte de naissance/mariage et Sefach TZ\n• 🖨️ PDF Officiels en Hébreu Administratif & Latin Passeport (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef & CV 11p)\n• 📖 PDF Miroir Page-par-Page Français ↔ Hébreu (chaque page officielle suivie de sa traduction exacte en français)\n• 🛡️ Audit Apostille 180j, Détecteur de changement de nom & Lettres légales',
      mirrorWarnBanner: 'NE REMETTEZ PAS CETTE PAGE À L’AGENT ! MIROIR EN FRANÇAIS — PAGE {p} SUR {tot}',
      mirrorSubBanner: 'Comparez cette fiche avec la Page {p} officielle en hébreu juste avant. Ne signez que les pages en hébreu devant l’agent.',
      colField: 'CASE OFFICIELLE (PAGE {p})',
      colYourLang: 'VOTRE SAISIE EN FRANÇAIS',
      colStamped: 'IMPRIMÉ SUR LE PDF HÉBREU',
      emptyBox: '(Vide pour l’instant)',
      generatingToast: '⏳ Génération du PDF pour {form}...',
      doneToast: '✅ {file} téléchargé !',
      modalTitle: '🚨 Incohérence détectée sur {form}',
      modalSub: 'Vous avez modifié {n} champ(s) sur {form}. Cette valeur reste enregistrée sur {form}, mais vérifiez le risque au guichet :',
      typoHead: '⚠️ Faute de frappe probable (1–2 lettres d’écart)',
      typoBody: '« {cur} » sur {form} diffère de 1–2 lettres de « {master} » dans votre dossier maître. Le guichet bloque tout écart d’orthographe !',
      diffNameHead: '🛑 Nom complètement différent — Piège du changement de nom !',
      diffNameBody: '« {cur} » sur {form} diffère totalement de « {master} ». Si vous avez changé de nom (mariage, conversion, etc.) sans joindre un acte apostillé ou affidavit d’avocat, le dossier sera gelé !',
      diffDataHead: '⚠️ Date / Numéro / Adresse contradictoire',
      diffDataBody: '« {cur} » sur {form} diffère de la valeur maître « {master} ».',
      btnFixTypo: '↺ Rétablir « {master} » sur {form}',
      btnUploadProof: '📸 Importer Acte de Mariage / Changement de Nom',
      btnMakeMaster: '✓ Appliquer « {cur} » à tous mes formulaires',
      btnKeepOverride: 'Garder « {cur} » uniquement sur {form}'
    },
    es: {
      hubTitle: '📂 Tus 8 Formularios Oficiales de Misrad HaPanim (Autocompletado y Descargas PDF)',
      hubSub: 'Cada documento escaneado completa los 8 formularios abajo. Descarga el PDF Oficial en Hebreo o el PDF Espejo Página por Página (Español + Hebreo) en cualquier momento:',
      btnOpen: '✏️ Editar',
      btnDlHe: '⬇ PDF Oficial Hebreo',
      btnDlBi: '⬇ PDF Página a Página ES + HE',
      readyPct: '{pct}% Completado',
      notStarted: 'Se llena al escanear',
      conflictBadge: '🔴 {n} Conflicto(s) — Toca para ver',
      fieldConflictPill: '🔴 Difiere del expediente maestro («{master}») — Toca aquí',
      pwRichReason: '🔒 Pase Requerido — Esto es todo lo que desbloquea al instante el Motor de 8 Formularios PIBA ($89 90 días / $149 Vitalicio):\n• 📸 Escaneo Inteligente y Autocompletado de los 8 formularios desde Pasaporte, Partidas y Sefaj TZ\n• 🖨️ Estampado PDF Oficial en Hebreo y Latín (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespaj Alef y CV 11p)\n• 📖 PDF Espejo Página por Página Español ↔ Hebreo para verificar todo tu avance antes de ir a la cita\n• 🛡️ Auditoría de Apostilla 180 días, Detector de discrepancias de nombres y Cartas legales',
      mirrorWarnBanner: '¡NO ENTREGUES ESTA PÁGINA AL FUNCIONARIO! ESPEJO EN ESPAÑOL — PÁGINA {p} DE {tot}',
      mirrorSubBanner: 'Compara esta hoja con la Página {p} oficial en hebreo anterior. Firma únicamente las hojas en hebreo frente al funcionario.',
      colField: 'CASILLA OFICIAL (PÁG. {p})',
      colYourLang: 'TU VALOR EN ESPAÑOL',
      colStamped: 'ESTAMPADO EN EL PDF HEBREO',
      emptyBox: '(En blanco por ahora)',
      generatingToast: '⏳ Generando PDF de {form}...',
      doneToast: '✅ ¡{file} descargado!',
      modalTitle: '🚨 Discrepancia detectada en {form}',
      modalSub: 'Cambiaste {n} campo(s) en {form}. Ese valor se mantiene en {form}, pero revisa esta alerta antes de tu cita:',
      typoHead: '⚠️ Posible error tipográfico de 1–2 letras',
      typoBody: '«{cur}» en {form} varía solo por 1–2 letras respecto a «{master}». ¡Misrad HaPanim frena trámites por errores de una sola letra!',
      diffNameHead: '🛑 Nombre completamente distinto — ¡Trampa de cambio de nombre!',
      diffNameBody: '«{cur}» en {form} es distinto de «{master}». Si cambiaste de apellido/nombre (matrimonio, conversión o cambio legal), debes subir el Certificado Apostillado o Declaración Jurada de abogado.',
      diffDataHead: '⚠️ Fecha / Documento / Dirección en conflicto',
      diffDataBody: '«{cur}» en {form} no coincide con «{master}» de tu expediente maestro.',
      btnFixTypo: '↺ Restaurar «{master}» en {form}',
      btnUploadProof: '📸 Subir Acta de Matrimonio / Cambio de Nombre',
      btnMakeMaster: '✓ Usar «{cur}» como valor maestro en todos los formularios',
      btnKeepOverride: 'Mantener «{cur}» solo en {form}'
    },
    de: {
      hubTitle: '📂 Ihre 8 Offiziellen Misrad-HaPanim-Formulare (Auto-Fill & PDF-Downloads)',
      hubSub: 'Jede gescannte Urkunde füllt alle 8 Formulare voraus. Laden Sie jederzeit das offizielle hebräische PDF oder das Seite-für-Seite-Spiegel-PDF (Deutsch + Hebräisch) herunter:',
      btnOpen: '✏️ Öffnen',
      btnDlHe: '⬇ Offizielles Hebräisch-PDF',
      btnDlBi: '⬇ Seite-für-Seite DE + HE PDF',
      readyPct: '{pct}% Ausgefüllt',
      notStarted: 'Auto-Fill beim Scan',
      conflictBadge: '🔴 {n} Abweichung(en) — Prüfen',
      fieldConflictPill: '🔴 Weicht von Hauptakte („{master}“) ab — Details',
      pwRichReason: '🔒 Pass erforderlich — Das schaltet der PIBA-8-Formulare-Pass ($89 90 Tage / $149 Lifetime) sofort frei:\n• 📸 1-Scan Auto-Fill aller 8 Formulare aus Reisepass, Geburts-/Heiratsurkunde & TZ-Sefach\n• 🖨️ Pixelgenaue königsblaue Hebräisch- & Pass-Latein-PDFs (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef & 11S Sicherheits-CV)\n• 📖 Seite-für-Seite-Spiegel-PDF (Deutsch ↔ Offizielles Hebräisch) zur vollen Kontrolle Ihres Fortschritts\n• 🛡️ 180-Tage-Apostillen-Prüfer, Namensabweichungs-Alarm & Behördenbriefe',
      mirrorWarnBanner: 'DIESE SEITE NICHT ABGEBEN! DEUTSCHES KONTROLLBLATT FÜR SEITE {p} VON {tot}',
      mirrorSubBanner: 'Vergleichen Sie dieses Blatt direkt mit der vorhergehenden hebräischen Seite {p}. Nur die hebräischen Seiten vor dem Beamten unterschreiben.',
      colField: 'FELD AUF SEITE {p}',
      colYourLang: 'IHRE EINGABE (DEUTSCH)',
      colStamped: 'EINTRAG IM HEBRÄISCHEN PDF',
      emptyBox: '(Noch leer)',
      generatingToast: '⏳ PDF für {form} wird erstellt...',
      doneToast: '✅ {file} heruntergeladen!',
      modalTitle: '🚨 Abweichung in {form} erkannt',
      modalSub: 'Sie haben {n} Feld(er) in {form} geändert. Der Wert bleibt für {form} gespeichert — beachten Sie jedoch diesen Hinweis:',
      typoHead: '⚠️ Wahrscheinlicher Tippfehler (1–2 Buchstaben)',
      typoBody: '„{cur}“ in {form} weicht nur um 1–2 Buchstaben von „{master}“ ab. Schalterbeamte lehnen Anträge schon bei kleinen Buchstabendrehern ab!',
      diffNameHead: '🛑 Komplett anderer Name — Namensänderungs-Falle!',
      diffNameBody: '„{cur}“ in {form} unterscheidet sich komplett von „{master}“. Bei Namensänderung (Heirat, Giur usw.) müssen Sie eine apostillierte Urkunde oder ein Anwalts-Affidavit hochladen!',
      diffDataHead: '⚠️ Abweichendes Datum / Ausweisnr. / Adresse',
      diffDataBody: '„{cur}“ in {form} widerspricht dem Hauptwert „{master}“.',
      btnFixTypo: '↺ In {form} auf „{master}“ zurücksetzen',
      btnUploadProof: '📸 Heirats- / Namensänderungsurkunde hochladen',
      btnMakeMaster: '✓ „{cur}“ für alle Formulare übernehmen',
      btnKeepOverride: '„{cur}“ nur für {form} behalten'
    },
    ru: {
      hubTitle: '📂 Ваши 8 официальных анкет МВД Израиля (Автозаполнение и скачивание PDF)',
      hubSub: 'Каждый загруженный документ автоматически заполняет все 8 анкет ниже. Скачивайте официальный PDF на иврите (даже в процессе заполнения!) или постраничный PDF-перевод (Русский + Иврит):',
      btnOpen: '✏️ Открыть',
      btnDlHe: '⬇ Офиц. PDF (Иврит)',
      btnDlBi: '⬇ Постраничный RU + HE PDF',
      readyPct: '{pct}% заполнено',
      notStarted: 'Автозаполнение при скане',
      conflictBadge: '🔴 Несовпадений: {n} — Проверить',
      fieldConflictPill: '🔴 Отличается от основного досье («{master}») — Нажмите',
      pwRichReason: '🔒 Требуется доступ — Вот что мгновенно открывает пакет 8 анкет МВД ($89 на 90 дней / $149 бессрочно):\n• 📸 Умное сканирование паспорта, свидетельств о рождении/браке и Сефаха ТЗ с автозаполнением всех 8 анкет\n• 🖨️ Точное заполнение официальных бланков МВД синими чернилами на иврите и латинице (Аш/1, Аш/3, Аш/6, Аш/456, МР/14а, МР/14б, Неспах Алеф и анкета 11 стр.)\n• 📖 Постраничный двуязычный PDF (каждая страница на иврите + зеркальная страница с переводом всех полей и ваших ответов на русский)\n• 🛡️ Проверка 180 дней апостиля, контроль смены фамилий и юридические письма',
      mirrorWarnBanner: 'НЕ ПОДАВАТЬ ЧИНОВНИКУ! ЛИСТ СВЕРКИ НА РУССКОМ К СТРАНИЦЕ {p} ИЗ {tot}',
      mirrorSubBanner: 'Сверьте этот лист с предыдущей официальной страницей {p} на иврите. Подписывайте только бланки на иврите перед инспектором МВД.',
      colField: 'ГРАФА БЛАНКА (СТР. {p})',
      colYourLang: 'ВАШ ОТВЕТ / ЗНАЧЕНИЕ',
      colStamped: 'ВПИСАНО В БЛАНК МВД',
      emptyBox: '(Пока не заполнено)',
      generatingToast: '⏳ Создаём PDF для {form}...',
      doneToast: '✅ Файл {file} скачан!',
      modalTitle: '🚨 Обнаружено расхождение в анкете {form}',
      modalSub: 'Вы изменили поле в анкете {form}. Это значение сохранено для {form}, но обратите внимание на риск в МВД:',
      typoHead: '⚠️ Похоже на опечатку в 1–2 буквы',
      typoBody: '«{cur}» в анкете {form} отличается на 1–2 буквы от «{master}» в ваших документах. Чиновники МВД разворачивают анкеты из-за любой опечатки!',
      diffNameHead: '🛑 Совершенно другое имя / фамилия — Ловушка смены имени!',
      diffNameBody: '«{cur}» в анкете {form} полностью отличается от «{master}». Если вы меняли имя/фамилию (брак, гиюр и т.д.), необходимо загрузить апостилированное свидетельство о перемене имени/браке или аффидевит адвоката!',
      diffDataHead: '⚠️ Расхождение в дате / номере / адресе между анкетами',
      diffDataBody: '«{cur}» в анкете {form} отличается от основного значения «{master}».',
      btnFixTypo: '↺ Вернуть «{master}» в анкете {form}',
      btnUploadProof: '📸 Загрузить св-во о браке / перемене имени',
      btnMakeMaster: '✓ Сделать «{cur}» основным для всех анкет',
      btnKeepOverride: 'Оставить «{cur}» только для {form}'
    }
  };

  function getLang() {
    var cands = [
      typeof window.getUnifiedGatLang === 'function' ? window.getUnifiedGatLang() : '',
      localStorage.getItem('gat_lang'),
      localStorage.getItem('giyur_lang'),
      localStorage.getItem('selectedLang'),
      window.gatLang,
      window.appLang,
      (document.getElementById('globe-lang-lbl') && document.getElementById('globe-lang-lbl').textContent) || '',
      document.documentElement.lang
    ];
    for (var i = 0; i < cands.length; i++) {
      var c = String(cands[i] || '').toLowerCase().trim().slice(0, 2);
      if (I18N_PRO[c]) return c;
    }
    return 'en';
  }
  function t() { return I18N_PRO[getLang()] || I18N_PRO.en; }
  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function loadDraftSafe() {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveDraftSafe(obj) {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(obj || {})); } catch (e) {}
  }
  function loadScansSafe() {
    try {
      var a = JSON.parse(localStorage.getItem('gat_scanned_docs_v1') || '[]') || [];
      var b = JSON.parse(localStorage.getItem(SCANNED_KEY) || '[]') || [];
      return a.length >= b.length ? a : b;
    } catch (e) { return []; }
  }
  function loadPreHebSafe() {
    try { return JSON.parse(localStorage.getItem(PRE_HEB_KEY) || '{}') || {}; } catch (e) { return {}; }
  }

  // =========================================================================
  // 1. STRICT PAYWALL ENFORCEMENT WITH FULL VALUE BREAKDOWN
  // =========================================================================
  window.ensurePaidFormsAccessOrPaywall = async function(contextTag) {
    if (typeof window.hasFormsEngineAccess === 'function' && window.hasFormsEngineAccess()) {
      return true;
    }
    if (typeof window.verifyServerEntitlementBeforePaywall === 'function') {
      try {
        var liveOk = await window.verifyServerEntitlementBeforePaywall(window.hasFormsEngineAccess);
        if (liveOk) return true;
      } catch (e) {}
    }
    var copy = t();
    var docModal = document.getElementById('gat-new-user-doc-modal');
    if (docModal) docModal.remove();
    var syncModal = document.getElementById('device-sync-modal');
    if (syncModal) syncModal.classList.remove('open');
    if (typeof window.openProPaywall === 'function') {
      window.openProPaywall(copy.pwRichReason, 'forms');
    } else if (typeof window.redirectToFormsPayment === 'function') {
      window.redirectToFormsPayment(copy.pwRichReason);
    }
    return false;
  };

  window.gatedTriggerFileInput = async function(inputId) {
    var ok = await window.ensurePaidFormsAccessOrPaywall('upload');
    if (!ok) return false;
    var el = document.getElementById(inputId);
    if (el) el.click();
    return true;
  };

  // =========================================================================
  // 2. PER-FORM OVERRIDE & SMART FORENSIC DISCREPANCY ENGINE
  // =========================================================================
  function levenshtein(a, b) {
    a = String(a || '').toLowerCase().trim();
    b = String(b || '').toLowerCase().trim();
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var matrix = [];
    for (var i = 0; i <= b.length; i++) matrix[i] = [i];
    for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  }

  function classifyConflictKind(fid, curVal, masterVal) {
    var meta = FIELD_LABELS_6L[fid] || { cat: 'text' };
    var dist = levenshtein(curVal, masterVal);
    var isNameField = (meta.cat === 'name' || meta.cat === 'parent_name' || meta.cat === 'spouse_name');
    if (dist > 0 && dist <= 2) return 'typo';
    if (isNameField) return 'diff_name';
    return 'diff_data';
  }

  // Extract canonical baseline STRICTLY from scanned official certificates (NEVER lock half-typed / iOS date-wheel intermediate values!)
  function getMasterBaseline(state) {
    var base = {};
    var scans = loadScansSafe();
    scans.forEach(function(sc) {
      if (!sc) return;
      var isPartner = (sc.ownerParty === 'partner' || sc.tzRole === 'spouse');
      if (isPartner) {
        if (sc.israeliIdNumber && !base.pf_sp_tz) base.pf_sp_tz = sc.israeliIdNumber;
        var spFull = [sc.givenHe, sc.surnameHe].filter(Boolean).join(' ').trim();
        if (spFull && !base.pf_sp_name_he) base.pf_sp_name_he = spFull;
      } else if (sc.ownerParty !== 'both') {
        if (sc.surnameEn && !base.pf_surname_en) base.pf_surname_en = sc.surnameEn;
        if (sc.givenEn && !base.pf_given_en) base.pf_given_en = sc.givenEn;
        if (sc.surnameHe && !base.pf_surname_he) base.pf_surname_he = sc.surnameHe;
        if (sc.givenHe && !base.pf_given_he) base.pf_given_he = sc.givenHe;
        if (sc.passportNumber && !base.pf_pass_num) base.pf_pass_num = sc.passportNumber;
        if (sc.dob && !base.pf_dob) base.pf_dob = sc.dob;
        if (sc.fatherName && !base.pf_father_he) base.pf_father_he = sc.fatherName;
        if (sc.motherName && !base.pf_mother_he) base.pf_mother_he = sc.motherName;
        if (sc.israeliAddrHe && !base.pf_il_addr_he) base.pf_il_addr_he = sc.israeliAddrHe;
        if (sc.birthCountry && !base.pf_birth_country) base.pf_birth_country = sc.birthCountry;
        if (sc.citizenship && !base.pf_citizenship) base.pf_citizenship = sc.citizenship;
      }
    });
    return base;
  }

  // Build effective form state for a specific formKey (merging Master Dossier + that form's overrides!)
  window.getEffectiveFormState = function(formKey, rawDraft) {
    var base = Object.assign({}, loadDraftSafe(), window.gatFormsState || {}, rawDraft || {});
    var fk = formKey || base.pf_active_form || 'ash3';
    var master = getMasterBaseline(base);
    Object.keys(master).forEach(function(mk) {
      if (master[mk] && (!base[mk] || String(base[mk]).trim() === '')) {
        base[mk] = master[mk];
      }
    });
    var ovAll = (base.pf_form_overrides && typeof base.pf_form_overrides === 'object') ? base.pf_form_overrides : {};
    var ovForm = (ovAll[fk] && typeof ovAll[fk] === 'object') ? ovAll[fk] : {};
    Object.keys(ovForm).forEach(function(ok) {
      if (ovForm[ok] !== undefined && ovForm[ok] !== null && String(ovForm[ok]).trim() !== '') {
        base[ok] = ovForm[ok];
      }
    });
    base.pf_active_form = fk;
    return base;
  };

  window.getFormDiscrepancies = function(formKey, rawDraft) {
    var base = Object.assign({}, loadDraftSafe(), window.gatFormsState || {}, rawDraft || {});
    var fk = formKey || base.pf_active_form || 'ash3';
    var master = getMasterBaseline(base);
    var ovAll = (base.pf_form_overrides && typeof base.pf_form_overrides === 'object') ? base.pf_form_overrides : {};
    var ovForm = (ovAll[fk] && typeof ovAll[fk] === 'object') ? ovAll[fk] : {};
    var pageLists = FORM_PAGE_FIELDS[fk] || [];
    var allowedFields = new Set();
    pageLists.forEach(function(arr) { arr.forEach(function(id) { allowedFields.add(id); }); });

    var list = [];
    Object.keys(ovForm).forEach(function(fid) {
      if (allowedFields.size && !allowedFields.has(fid)) return;
      var curV = String(ovForm[fid] || '').trim();
      var masV = String(master[fid] || '').trim();
      if (!curV || !masV || curV === masV) return;
      list.push({
        fieldId: fid,
        label: ((FIELD_LABELS_6L[fid] && (FIELD_LABELS_6L[fid][getLang()] || FIELD_LABELS_6L[fid].en)) || fid),
        currentVal: curV,
        masterVal: masV,
        kind: classifyConflictKind(fid, curV, masV)
      });
    });
    return list;
  };

  // Capture per-form user edits without clobbering other forms when a Master Baseline already exists!
  var FORM_SPECIFIC_ONLY_KEYS = {
    pf_ash3_action: 1, pf_ash3_months: 1, pf_inst_details: 1,
    pf_456_shvut: 1, pf_456_settlement: 1, pf_ash1_consulate: 1,
    pf_ash6_refs: 1, pf_ll_affidavit: 1, pf_cv_details: 1, pf_rel_story: 1,
    pf_active_form: 1, pf_target_branch: 1, pf_active_letter: 1, pf_demand_date: 1
  };

  // One-time cleanup of any false iOS date-picker overrides saved from pf_canonical_baseline
  (function purgeFalseNonScanOverridesOnce() {
    try {
      [DRAFT_KEY, 'gat_form_draft_v1'].forEach(function(dk) {
        var d = JSON.parse(localStorage.getItem(dk) || '{}') || {};
        var dirty = false;
        if (d.pf_canonical_baseline) { delete d.pf_canonical_baseline; dirty = true; }
        if (d.pf_form_overrides && typeof d.pf_form_overrides === 'object') {
          var scanMaster = getMasterBaseline(d);
          Object.keys(d.pf_form_overrides).forEach(function(fk) {
            var fmap = d.pf_form_overrides[fk] || {};
            Object.keys(fmap).forEach(function(fid) {
              // If this field has NO scanned-document truth (e.g. pf_father_dob, pf_mother_dob), promote user's latest value & remove false conflict!
              if (!scanMaster[fid]) {
                d[fid] = fmap[fid];
                if (window.gatFormsState) window.gatFormsState[fid] = fmap[fid];
                delete fmap[fid];
                dirty = true;
              }
            });
          });
        }
        if (dirty) localStorage.setItem(dk, JSON.stringify(d));
      });
    } catch (e) {}
  })();

  function attachPerFormOverrideListeners() {
    var host = document.getElementById('mod-hebrew-engine');
    if (!host || host._gatOverrideDelegated) return;
    host._gatOverrideDelegated = true;

    // Use `blur` for date inputs so iOS Safari wheel scrolling never fires mid-scroll with today's day!
    var handleCommittedFieldEdit = function(el) {
      if (!el || !el.classList || !el.classList.contains('pf-bound-input') || !el.id) return;
      if (FORM_SPECIFIC_ONLY_KEYS[el.id] || el.type === 'checkbox' || el.tagName === 'SELECT') return;

      setTimeout(function() {
        var st = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
        var curF = st.pf_active_form || 'ash3';
        var newVal = String(el.value || '').trim();
        var master = getMasterBaseline(st);
        var masterVal = String(master[el.id] || '').trim();

        if (masterVal && newVal && newVal !== masterVal) {
          // Scanned document has an official value (`masterVal`), and user intentionally customized `curF` -> isolate to `curF` + show red indicator!
          st.pf_form_overrides = st.pf_form_overrides || {};
          st.pf_form_overrides[curF] = st.pf_form_overrides[curF] || {};
          st.pf_form_overrides[curF][el.id] = newVal;
          st[el.id] = masterVal;
          el.value = newVal;
          el.dataset.lastSavedVal = newVal;
        } else {
          // Normal field edit (not contradicting a scanned certificate): save cleanly across draft with zero false red warning!
          if (st.pf_form_overrides && st.pf_form_overrides[curF] && st.pf_form_overrides[curF][el.id]) {
            delete st.pf_form_overrides[curF][el.id];
          }
          st[el.id] = newVal;
        }

        window.gatFormsState = st;
        saveDraftSafe(st);
        try {
          var dAlt = JSON.parse(localStorage.getItem('gat_form_draft_v1') || '{}') || {};
          Object.assign(dAlt, st);
          localStorage.setItem('gat_form_draft_v1', JSON.stringify(dAlt));
        } catch (e) {}
        if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
        hydrateActiveFormInputsWithOverrides();
        renderInlineFieldRedIndicators();
        renderAllFormsHubEverywhere();
      }, 40);
    };

    host.addEventListener('blur', function(e) {
      var el = e.target;
      if (el && el.classList && el.classList.contains('pf-bound-input')) {
        handleCommittedFieldEdit(el);
      }
    }, true);
  }

  function hydrateActiveFormInputsWithOverrides() {
    var st = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
    var curF = st.pf_active_form || 'ash3';
    var eff = window.getEffectiveFormState(curF, st);
    document.querySelectorAll('#mod-hebrew-engine .pf-bound-input').forEach(function(el) {
      if (!el.id || el.type === 'checkbox' || document.activeElement === el) return;
      if (eff[el.id] !== undefined && eff[el.id] !== null && String(eff[el.id]) !== String(el.value)) {
        el.value = eff[el.id];
        el.dataset.lastSavedVal = String(eff[el.id]);
      }
    });
  }

  function renderInlineFieldRedIndicators() {
    document.querySelectorAll('.gat-inline-discrepancy-pill').forEach(function(n) { n.remove(); });
    document.querySelectorAll('#mod-hebrew-engine .pf-bound-input').forEach(function(el) {
      el.style.borderColor = '';
      el.style.backgroundColor = '';
    });
    var st = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
    var curF = st.pf_active_form || 'ash3';
    var diffs = window.getFormDiscrepancies(curF, st);
    var copy = t();

    diffs.forEach(function(item) {
      var inp = document.getElementById(item.fieldId);
      if (!inp || !inp.parentNode) return;
      inp.style.borderColor = '#dc2626';
      inp.style.backgroundColor = '#fef2f2';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gat-inline-discrepancy-pill';
      btn.style.cssText = 'margin-top:5px;width:100%;text-align:start;background:#fef2f2;border:1.5px solid #dc2626;color:#b91c1c;border-radius:8px;padding:6px 9px;font-size:0.74rem;font-weight:900;cursor:pointer;line-height:1.35;';
      btn.textContent = copy.fieldConflictPill.replace('{master}', item.masterVal);
      btn.onclick = function() { window.openFormDiscrepancyModal(curF, item.fieldId); };
      inp.parentNode.appendChild(btn);
    });
  }

  window.openFormDiscrepancyModal = function(formKey, focusFieldId) {
    var old = document.getElementById('gat-discrepancy-modal');
    if (old) old.remove();
    var fk = formKey || (window.gatFormsState && window.gatFormsState.pf_active_form) || 'ash3';
    var diffs = window.getFormDiscrepancies(fk);
    if (!diffs.length) return;
    if (focusFieldId) {
      diffs.sort(function(a, b) { return a.fieldId === focusFieldId ? -1 : (b.fieldId === focusFieldId ? 1 : 0); });
    }

    var l = getLang();
    var copy = t();
    var fMeta = FORM_META[fk] || FORM_META.ash3;
    var fTitle = fMeta.names[l] || fMeta.names.en;

    var cardsHtml = diffs.map(function(d) {
      var head = d.kind === 'typo' ? copy.typoHead : (d.kind === 'diff_name' ? copy.diffNameHead : copy.diffDataHead);
      var body = (d.kind === 'typo' ? copy.typoBody : (d.kind === 'diff_name' ? copy.diffNameBody : copy.diffDataBody))
        .replace(/\{cur\}/g, d.currentVal)
        .replace(/\{master\}/g, d.masterVal)
        .replace(/\{form\}/g, fMeta.codeEn);

      var uploadBtn = d.kind === 'diff_name'
        ? '<button type="button" onclick="document.getElementById(\'gat-discrepancy-modal\').remove();window.showNewUserDocUploadModal(\'' + esc(fk) + '\', null, true);" style="width:100%;background:#0284c7;color:#fff;border:none;border-radius:9px;padding:9px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(copy.btnUploadProof) + '</button>'
        : '';

      return '<div style="background:#fef2f2;border:2px solid #dc2626;border-radius:12px;padding:13px;margin-bottom:10px;">' +
        '<div style="font-size:0.76rem;font-weight:900;color:#64748b;text-transform:uppercase;margin-bottom:3px;">' + esc(d.label) + '</div>' +
        '<div style="font-size:0.9rem;font-weight:900;color:#991b1b;margin-bottom:5px;">' + esc(head) + '</div>' +
        '<div style="font-size:0.81rem;color:#1e293b;line-height:1.48;margin-bottom:10px;font-weight:600;">' + esc(body) + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px;">' +
          '<button type="button" onclick="window.resolveFormDiscrepancy(\'' + esc(fk) + '\',\'' + esc(d.fieldId) + '\',\'revert\')" style="width:100%;background:#059669;color:#fff;border:none;border-radius:9px;padding:9px 12px;font-size:0.8rem;font-weight:900;cursor:pointer;">' + esc(copy.btnFixTypo.replace('{form}', fMeta.codeEn).replace('{master}', d.masterVal)) + '</button>' +
          uploadBtn +
          '<button type="button" onclick="window.resolveFormDiscrepancy(\'' + esc(fk) + '\',\'' + esc(d.fieldId) + '\',\'make_master\')" style="width:100%;background:#334155;color:#fff;border:none;border-radius:9px;padding:8px 12px;font-size:0.78rem;font-weight:800;cursor:pointer;">' + esc(copy.btnMakeMaster.replace('{cur}', d.currentVal)) + '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var ov = document.createElement('div');
    ov.id = 'gat-discrepancy-modal';
    ov.dir = (l === 'he') ? 'rtl' : 'ltr';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(15,23,42,0.78);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px;';
    ov.innerHTML =
      '<div style="background:#ffffff;border:3px solid #dc2626;border-radius:18px;max-width:520px;width:100%;max-height:88vh;overflow-y:auto;padding:20px;box-shadow:0 25px 50px rgba(0,0,0,0.45);color:#0f172a;">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px;">' +
          '<h3 style="margin:0;font-size:1.05rem;color:#991b1b;font-weight:900;">' + esc(copy.modalTitle.replace('{form}', fTitle)) + '</h3>' +
          '<button type="button" onclick="document.getElementById(\'gat-discrepancy-modal\').remove()" style="background:#f1f5f9;border:none;border-radius:8px;width:32px;height:32px;font-weight:900;cursor:pointer;">✕</button>' +
        '</div>' +
        '<p style="margin:0 0 12px;font-size:0.82rem;color:#475569;line-height:1.45;font-weight:600;">' + esc(copy.modalSub.replace(/\{n\}/g, String(diffs.length)).replace(/\{form\}/g, fMeta.codeEn)) + '</p>' +
        cardsHtml +
        '<button type="button" onclick="document.getElementById(\'gat-discrepancy-modal\').remove()" style="width:100%;background:#e2e8f0;color:#0f172a;border:none;border-radius:10px;padding:10px;font-size:0.82rem;font-weight:800;cursor:pointer;">' + esc(copy.btnKeepOverride.replace('{cur}', diffs[0].currentVal).replace('{form}', fMeta.codeEn)) + '</button>' +
      '</div>';
    ov.onclick = function(e) { if (e.target === ov) ov.remove(); };
    document.body.appendChild(ov);
  };

  window.resolveFormDiscrepancy = function(formKey, fieldId, action) {
    var st = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
    st.pf_form_overrides = st.pf_form_overrides || {};
    st.pf_canonical_baseline = st.pf_canonical_baseline || {};
    var curOv = (st.pf_form_overrides[formKey] || {})[fieldId];

    if (action === 'revert') {
      if (st.pf_form_overrides[formKey]) delete st.pf_form_overrides[formKey][fieldId];
    } else if (action === 'make_master' && curOv) {
      st.pf_canonical_baseline[fieldId] = curOv;
      st[fieldId] = curOv;
      if (st.pf_form_overrides[formKey]) delete st.pf_form_overrides[formKey][fieldId];
    }
    window.gatFormsState = st;
    saveDraftSafe(st);
    if (window.syncFormDraftIfChanged) window.syncFormDraftIfChanged();
    var m = document.getElementById('gat-discrepancy-modal');
    if (m) m.remove();
    if (typeof window.mountUnifiedPibaFormsEngine === 'function') window.mountUnifiedPibaFormsEngine();
    hydrateActiveFormInputsWithOverrides();
    renderInlineFieldRedIndicators();
    renderAllFormsHubEverywhere();
  };

  // =========================================================================
  // 3. DUAL PDF DOWNLOADER:
  //    Mode 'official': Clean Official Hebrew Submission PDF (works at any %)
  //    Mode 'bilingual': Interleaved Page 1 HE -> Page 1 User-Lang -> Page 2 HE -> Page 2 User-Lang
  // =========================================================================
  var __fontCache = {};
  async function loadVendorFont(name) {
    if (__fontCache[name]) return __fontCache[name].slice(0);
    var res = await fetch('/app/vendor/' + name + '?v=20261126');
    var buf = await res.arrayBuffer();
    __fontCache[name] = buf;
    return buf.slice(0);
  }

  function triggerPdfDownload(bytes, filename) {
    var blob = new Blob([bytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { a.remove(); setTimeout(function(){ try { URL.revokeObjectURL(url); } catch(_e){} }, 60000); }, 1500);
  }

  function reverseVisualHebrewSegment(str) {
    // Simple bidi helper for pdf-lib Hebrew text drawing on reference sheets
    var s = String(str || '');
    if (!/[\u0590-\u05FF]/.test(s)) return s;
    var tokens = s.match(/[\u0590-\u05FF״׳"'\-]+|[^\u0590-\u05FF]+/g) || [s];
    return tokens.slice().reverse().map(function(tok) {
      if (/[\u0590-\u05FF]/.test(tok)) return tok.split('').reverse().join('');
      return tok;
    }).join('');
  }

  function truncateToWidth(text, font, size, maxW) {
    var clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    if (font.widthOfTextAtSize(clean, size) <= maxW) return clean;
    var out = clean;
    while (out.length > 3 && font.widthOfTextAtSize(out + '...', size) > maxW) {
      out = out.slice(0, -1);
    }
    return out + '...';
  }

  window.buildMotherTongueStateForReplica = buildMotherTongueStateForReplica;
async function buildMotherTongueStateForReplica(effState, l) {
    var mState = Object.assign({}, effState);
    var backup = {};
    try { backup = JSON.parse(localStorage.getItem(PRE_HE_BACKUP_KEY) || '{}') || {}; } catch (e) {}

    Object.keys(backup).forEach(function(k) {
      if (backup[k] && !/[\u0590-\u05FF]/.test(String(backup[k]))) {
        mState[k] = backup[k];
      }
    });

    var SKIP_TRANSLATE_KEYS = { pf_gender: 1, pf_marital: 1, pf_active_form: 1, pf_form_overrides: 1 };
    var toTranslate = {};
    Object.keys(mState).forEach(function(k) {
      if (SKIP_TRANSLATE_KEYS[k] || k.indexOf('pf_') !== 0) return;
      var v = mState[k];
      if (typeof v === 'string' && /[\u0590-\u05FF]/.test(v)) {
        var enKey = k.replace(/_he$/, '_en');
        if (l === 'en' && enKey !== k && mState[enKey] && !/[\u0590-\u05FF]/.test(String(mState[enKey]))) {
          mState[k] = mState[enKey];
        } else {
          toTranslate[k] = v;
        }
      }
    });

    var kidsIn = Array.isArray(mState.pf_children_rows) ? mState.pf_children_rows : [];
    var hasHebKids = kidsIn.some(function(kr) {
      return kr && /[\u0590-\u05FF]/.test([kr.surname_he, kr.given_he, kr.other_parent_he, kr.country].join(' '));
    });

    if (Object.keys(toTranslate).length > 0 || hasHebKids) {
      try {
        var apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'https://giyuraliyahtrack.com/api/auditDoc'
          : '/api/auditDoc';
        var res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'translate_form_mother',
            targetLang: l,
            fields: toTranslate,
            childrenRows: hasHebKids ? kidsIn : []
          })
        });
        var data = await res.json();
        var tr = (data && data.result && data.result.translated) || {};
        Object.keys(tr).forEach(function(k) {
          if (tr[k] && !/[\u0590-\u05FF]/.test(String(tr[k]))) {
            mState[k] = String(tr[k]).trim();
          }
        });
        var trKids = (data && data.result && data.result.children_translated) || [];
        if (Array.isArray(trKids) && trKids.length === kidsIn.length) {
          mState.pf_children_rows = kidsIn.map(function(origK, idx) {
            var tk = trKids[idx] || {};
            return Object.assign({}, origK, {
              surname_he: tk.surname_he || origK.surname_he || '',
              given_he: tk.given_he || origK.given || '',
              given: origK.given || tk.given_he || '',
              other_parent_he: tk.other_parent_he || origK.other_parent_he || '',
              country: tk.country || origK.country_en || origK.country || '',
              country_en: origK.country_en || tk.country || ''
            });
          });
        }
      } catch (err) {
        console.warn('Mother-tongue replica translation fallback:', err);
      }
    }

    Object.keys(mState).forEach(function(k) {
      if (SKIP_TRANSLATE_KEYS[k] || typeof mState[k] !== 'string') return;
      if (/[\u0590-\u05FF]/.test(mState[k])) {
        var enPair = mState[k + '_en'] || mState[k.replace(/_he$/, '_en')];
        mState[k] = (enPair && !/[\u0590-\u05FF]/.test(enPair)) ? enPair : mState[k].replace(/[\u0590-\u05FF]+/g, '').trim();
      }
    });
    return mState;
  }

  function getFormMetaByKey(fk) {
    var k = String(fk || 'ash3').trim().toLowerCase();
    return FORM_META[k] || FORM_META.ash3 || { codeHe: k, codeEn: k, pages: 1, names: { en: k, he: k } };
  }

  function getEffectiveStateForForm(fk) {
    var raw = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
    if (typeof window.getEffectiveFormState === 'function') {
      try {
        var eff = window.getEffectiveFormState(fk, raw);
        if (eff && typeof eff === 'object') return eff;
      } catch (_eEff) {}
    }
    return raw;
  }

  window.downloadGatPibaFormPdf = async function(formKey, mode, ev) {
    var fk = formKey || (window.gatFormsState && window.gatFormsState.pf_active_form) || 'ash3';
    var l = getLang();
    var copy = I18N_PRO[l] || I18N_PRO.en;
    var fMeta = getFormMetaByKey(fk);

    var unlocked = (typeof window.hasFormsEngineAccess === 'function') ? window.hasFormsEngineAccess() : true;
    if (!unlocked && typeof window.verifyServerEntitlementBeforePaywall === 'function') {
      try {
        unlocked = await window.verifyServerEntitlementBeforePaywall(window.hasFormsEngineAccess);
      } catch (_eEnt) {}
    }
    if (!unlocked) {
      if (typeof window.showDraftSavedBadge === 'function') {
        try { window.showDraftSavedBadge('Forms access required — opening unlock options...', true); } catch (_eBdg) {}
      }
      if (typeof window.openProPaywall === 'function') {
        window.openProPaywall('', 'forms');
      } else if (typeof window.redirectToFormsPayment === 'function') {
        window.redirectToFormsPayment('');
      } else {
        alert('Forms access is locked on this session. Please unlock Forms access or verify your session first.');
      }
      return;
    }

    // Visual button feedback so user immediately sees PDF is compiling
    var clickedBtn = (ev && ev.currentTarget) || document.activeElement;
    var origBtnHtml = null;
    if (clickedBtn && clickedBtn.tagName === 'BUTTON') {
      origBtnHtml = clickedBtn.innerHTML;
      clickedBtn.disabled = true;
      clickedBtn.style.opacity = '0.78';
      clickedBtn.innerHTML = '⏳ ' + (mode === 'bilingual' ? 'Building Exact Replica PDF...' : 'Stamping Official PDF...');
    }

    // Open preview tab SYNCHRONOUSLY inside user gesture tick so macOS Safari/Chrome NEVER blocks it after async awaits!
    var preWin = null;
    try {
      preWin = window.open('about:blank', '_blank');
      if (preWin && preWin.document) {
        var WAIT_I18N = {
          en: {
            title: 'Generating PIBA PDF...',
            biHead: 'Compiling Official Hebrew + Exact EN Replica PDF...',
            heHead: 'מפיק PDF עברי רשמי של רשות האוכלוסין...',
            otherHead: 'Compiling Official Hebrew + Exact {LANG} Replica PDF...',
            sub: 'Embedding high-precision vector grids & Unicode fonts. Please be patient — this can take a little while.',
            dir: 'ltr'
          },
          he: {
            title: 'מכין קובץ PDF...',
            biHead: 'מפיק PDF עברי רשמי + עותק עיון מראה...',
            heHead: 'מפיק PDF עברי רשמי של רשות האוכלוסין...',
            otherHead: 'מפיק PDF עברי רשמי + עותק עיון ({LANG})...',
            sub: 'מטמיע רשתות וקטוריות וגופני יוניקוד. אנא התאזרו בסבלנות — הדבר עשוי להימשך מעט זמן.',
            dir: 'rtl'
          },
          fr: {
            title: 'Génération du PDF PIBA...',
            biHead: 'Compilation du PDF Hébreu Officiel + Réplique FR...',
            heHead: 'Compilation du PDF Hébreu Officiel PIBA...',
            otherHead: 'Compilation du PDF Hébreu Officiel + Réplique {LANG}...',
            sub: 'Intégration des grilles vectorielles et polices Unicode. Veuillez patienter — cela peut prendre un certain temps.',
            dir: 'ltr'
          },
          es: {
            title: 'Generando PDF de PIBA...',
            biHead: 'Compilando PDF Hebreo Oficial + Réplica ES...',
            heHead: 'Compilando PDF Hebreo Oficial de PIBA...',
            otherHead: 'Compilando PDF Hebreo Oficial + Réplica {LANG}...',
            sub: 'Incrustando cuadrículas vectoriales y fuentes Unicode. Por favor, tenga paciencia; puede tardar un poco.',
            dir: 'ltr'
          },
          de: {
            title: 'PIBA-PDF wird erstellt...',
            biHead: 'Erstelle offizielles Hebräisch-PDF + DE-Replik...',
            heHead: 'Erstelle offizielles Hebräisch-PDF von PIBA...',
            otherHead: 'Erstelle offizielles Hebräisch-PDF + {LANG}-Replik...',
            sub: 'Vektorraster und Unicode-Schriften werden eingebettet. Bitte haben Sie etwas Geduld — es kann einen Moment dauern.',
            dir: 'ltr'
          },
          ru: {
            title: 'Формирование PDF PIBA...',
            biHead: 'Сборка официального PDF на иврите + точной копии RU...',
            heHead: 'Сборка официального PDF на иврите PIBA...',
            otherHead: 'Сборка официального PDF на иврите + копии {LANG}...',
            sub: 'Встраивание векторных сеток и шрифтов Unicode. Пожалуйста, наберитесь терпения — это может занять некоторое время.',
            dir: 'ltr'
          }
        };
        var wLang = WAIT_I18N[l] ? l : 'en';
        var wCopy = WAIT_I18N[wLang];
        var wHead = (mode !== 'bilingual' || l === 'he')
          ? wCopy.heHead
          : (wLang === 'en' ? wCopy.biHead : wCopy.otherHead.replace('{LANG}', String(l || '').toUpperCase()));
        preWin.document.write(
          '<!doctype html><html lang="' + esc(wLang) + '" dir="' + wCopy.dir + '"><head><meta charset="utf-8"><title>' + esc(wCopy.title) + '</title></head>' +
          '<body style="margin:0;background:#082548;color:#fff;font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center;padding:24px;">' +
          '<div style="font-size:2.4rem;margin-bottom:14px;">⏳</div>' +
          '<div style="font-size:1.15rem;font-weight:900;margin-bottom:8px;">' + esc(wHead) + '</div>' +
          '<div style="font-size:0.88rem;color:#93c5fd;max-width:460px;line-height:1.55;">' + esc(wCopy.sub) + '</div>' +
          '</body></html>'
        );
        preWin.document.close();
      }
    } catch (eWin) {}

    try {
      if (typeof window.showDraftSavedBadge === 'function') {
        window.showDraftSavedBadge(copy.generatingToast.replace('{mode}', mode === 'bilingual' ? 'Bilingual Replica' : 'Official').replace('{form}', fMeta.codeEn), false);
      }

      if (typeof window.autoTranslateDraftToClerkHebrew === 'function') {
        try { await window.autoTranslateDraftToClerkHebrew(fk); } catch (eTr) { console.warn('autoTranslate skipped:', eTr); }
      }
      var effState = getEffectiveStateForForm(fk);

      var finalBytes = null;
      var outName = 'PIBA_' + fk.toUpperCase() + '_Official_Hebrew.pdf';

      if (mode !== 'bilingual' || l === 'he') {
        finalBytes = await window.generateOfficialPdfBytesOnly(fk, effState);
        if (fk === 'ash456') outName = 'PIBA_Ash456_MR14A_MR14B_In_Israel_Oleh_Packet.pdf';
      } else {
        var officialBytes = await window.generateOfficialPdfBytesOnly(fk, effState);
        var motherState = await buildMotherTongueStateForReplica(effState, l);
        var replicaBytes = await window.generateVisualMirrorPdfBytes(fk, motherState, l);

        var PDFLib = window.PDFLib;
        var offDoc = await PDFLib.PDFDocument.load(officialBytes);
        var repDoc = await PDFLib.PDFDocument.load(replicaBytes);
        var outDoc = await PDFLib.PDFDocument.create();

        var totalPages = offDoc.getPageCount();
        var repCount = repDoc.getPageCount();

        for (var pIdx = 0; pIdx < totalPages; pIdx++) {
          var copiedOff = await outDoc.copyPages(offDoc, [pIdx]);
          outDoc.addPage(copiedOff[0]);
          if (pIdx < repCount) {
            var copiedRep = await outDoc.copyPages(repDoc, [pIdx]);
            outDoc.addPage(copiedRep[0]);
          }
        }

        finalBytes = await outDoc.save();
        outName = 'PIBA_' + fk.toUpperCase() + '_Official_Hebrew_Plus_' + l.toUpperCase() + '_Exact_Replica.pdf';
      }

      var blob = new Blob([finalBytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);

      if (preWin && !preWin.closed) {
        preWin.location.href = url;
      } else {
        triggerPdfDownload(finalBytes, outName);
      }

      // Also trigger direct file save so it lands cleanly in Downloads folder as well
      triggerPdfDownload(finalBytes, outName);
      return finalBytes;
    } catch (err) {
      console.error('GAT PDF generation error:', err);
      if (preWin && !preWin.closed) {
        try { preWin.close(); } catch (e2) {}
      }
      alert('PDF Generation Error: ' + ((err && err.message) || String(err)));
    } finally {
      if (clickedBtn && origBtnHtml !== null) {
        clickedBtn.disabled = false;
        clickedBtn.style.opacity = '1';
        clickedBtn.innerHTML = origBtnHtml;
      }
    }
  };

  // =========================================================================
  // 4. ALL-8-FORMS HUB IN PROFILE MODAL (#device-sync-modal) & MASTER DOSSIER BAR
  // =========================================================================
  function computeFormProgressPct(fk, rawState) {
    var eff = window.getEffectiveFormState(fk, rawState);
    var buckets = FORM_PAGE_FIELDS[fk] || [];
    var uniq = Array.from(new Set([].concat.apply([], buckets)));
    if (!uniq.length) return 0;
    var filled = uniq.filter(function(fid) {
      return eff[fid] !== undefined && eff[fid] !== null && String(eff[fid]).trim() !== '';
    }).length;
    return Math.round((filled / uniq.length) * 100);
  }

  function buildAll8FormsHubHtml(compact) {
    var l = getLang();
    var copy = t();
    var st = Object.assign({}, loadDraftSafe(), window.gatFormsState || {});
    var curF = st.pf_active_form || 'ash3';

    var rowsHtml = FORM_ORDER.map(function(fk) {
      var fm = FORM_META[fk];
      var pct = computeFormProgressPct(fk, st);
      var diffs = window.getFormDiscrepancies(fk, st);
      var isCur = (fk === curF);
      var bdr = diffs.length > 0 ? '#dc2626' : (isCur ? '#0284c7' : '#cbd5e1');
      var bg = diffs.length > 0 ? '#fff5f5' : (isCur ? '#f0f9ff' : '#ffffff');
      var pctBadge = pct > 0
        ? '<span style="background:' + (pct >= 80 ? '#dcfce7' : '#e0f2fe') + ';color:' + (pct >= 80 ? '#166534' : '#0c4a6e') + ';padding:2px 8px;border-radius:999px;font-size:0.7rem;font-weight:900;">' + esc(copy.readyPct.replace('{pct}', String(pct))) + '</span>'
        : '<span style="background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:999px;font-size:0.7rem;font-weight:800;">' + esc(copy.notStarted) + '</span>';

      var conflictBtn = diffs.length > 0
        ? '<button type="button" onclick="window.openFormDiscrepancyModal(\'' + esc(fk) + '\')" style="background:#dc2626;color:#fff;border:none;border-radius:999px;padding:3px 9px;font-size:0.71rem;font-weight:900;cursor:pointer;box-shadow:0 2px 6px rgba(220,38,38,0.35);">' + esc(copy.conflictBadge.replace('{n}', String(diffs.length))) + '</button>'
        : '';

      return '<div style="border:1.8px solid ' + bdr + ';background:' + bg + ';border-radius:11px;padding:9px 11px;margin-bottom:7px;">' +
        '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:6px;">' +
          '<div style="font-size:0.81rem;font-weight:900;color:#082548;">' + esc(fm.names[l] || fm.names.en) + '</div>' +
          '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">' + conflictBtn + pctBadge + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
          '<button type="button" onclick="window.jumpToGatFormFromProfile(\'' + esc(fk) + '\')" style="background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;font-size:0.73rem;font-weight:800;cursor:pointer;">' + esc(copy.btnOpen) + '</button>' +
          '<button type="button" onclick="window.downloadGatPibaFormPdf(\'' + esc(fk) + '\',\'official\')" style="flex:1;min-width:130px;background:#082548;color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:0.73rem;font-weight:900;cursor:pointer;">' + esc(copy.btnDlHe) + '</button>' +
          '<button type="button" onclick="window.downloadGatPibaFormPdf(\'' + esc(fk) + '\',\'bilingual\')" style="flex:1;min-width:145px;background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:0.73rem;font-weight:900;cursor:pointer;">' + esc(copy.btnDlBi) + '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    if (compact) {
      var totalDiffs = FORM_ORDER.reduce(function(acc, k) { return acc + window.getFormDiscrepancies(k, st).length; }, 0);
      var redAlertTag = totalDiffs > 0
        ? ' <span style="background:#dc2626;color:#fff;padding:2px 8px;border-radius:999px;font-size:0.72rem;font-weight:900;margin-inline-start:6px;">🔴 ' + totalDiffs + '</span>'
        : '';
      return '<details id="gat-dossier-8forms-drawer" style="margin-top:8px;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:11px;padding:8px 11px;">' +
        '<summary style="cursor:pointer;font-size:0.81rem;font-weight:900;color:#082548;list-style:none;display:flex;align-items:center;justify-content:space-between;">' +
          '<span>' + esc(copy.hubTitle) + redAlertTag + '</span>' +
          '<span style="color:#0284c7;font-size:0.76rem;">▼</span>' +
        '</summary>' +
        '<p style="margin:6px 0 9px;font-size:0.76rem;color:#475569;line-height:1.42;font-weight:600;">' + esc(copy.hubSub) + '</p>' +
        rowsHtml +
      '</details>';
    }

    return '<div id="gat-profile-8forms-hub" style="margin-top:14px;padding-top:14px;border-top:2px solid #e2e8f0;" dir="' + (l === 'he' ? 'rtl' : 'ltr') + '">' +
      '<div style="font-size:0.9rem;font-weight:900;color:#082548;margin-bottom:4px;">' + esc(copy.hubTitle) + '</div>' +
      '<div style="font-size:0.77rem;color:#475569;line-height:1.42;margin-bottom:10px;font-weight:600;">' + esc(copy.hubSub) + '</div>' +
      rowsHtml +
    '</div>';
  }

  window.buildGatAll8FormsProfileHtml = function() {
    return buildAll8FormsHubHtml(false);
  };

  window.jumpToGatFormFromProfile = function(fk) {
    var profM = document.getElementById('gat-profile-modal');
    if (profM) profM.remove();
    if (typeof window.closeDeviceSyncModal === 'function') window.closeDeviceSyncModal();
    var appDr = document.getElementById('app-drawer');
    if (appDr) appDr.classList.remove('open');
    if (typeof window.openMod === 'function') window.openMod('hebrew-engine');
    if (typeof window.setGatFormOption === 'function') window.setGatFormOption('pf_active_form', fk);
  };

  function renderAllFormsHubEverywhere() {
    // A. Inside Profile / Sync Modal (#device-sync-modal .pw-body)
    var syncModal = document.getElementById('device-sync-modal');
    if (syncModal) {
      var pwBody = syncModal.querySelector('.pw-body');
      if (pwBody) {
        var existingHub = document.getElementById('gat-profile-8forms-hub');
        var newHtml = buildAll8FormsHubHtml(false);
        if (existingHub) existingHub.outerHTML = newHtml;
        else pwBody.insertAdjacentHTML('beforeend', newHtml);
      }
    }

    // B. Inside Master Dossier Bar at top of Forms module (#pf-master-dossier-bar)
    var dosBar = document.getElementById('pf-master-dossier-bar');
    if (dosBar) {
      var oldDrawer = document.getElementById('gat-dossier-8forms-drawer');
      var wasOpen = oldDrawer ? oldDrawer.open : false;
      if (oldDrawer) oldDrawer.remove();
      dosBar.insertAdjacentHTML('beforeend', buildAll8FormsHubHtml(true));
      var newDrawer = document.getElementById('gat-dossier-8forms-drawer');
      if (newDrawer && wasOpen) newDrawer.open = true;
    }

    // C. Also add Dual Download buttons right next to the active form's bottom action bar if not present
    var printBtn = document.querySelector('#mod-hebrew-engine button[onclick*="printOfficialPibaPacket"]');
    if (printBtn && printBtn.parentNode && !document.getElementById('gat-active-dual-dl-row')) {
      var curF = (window.gatFormsState && window.gatFormsState.pf_active_form) || 'ash3';
      var copy = t();
      var bar = document.createElement('div');
      bar.id = 'gat-active-dual-dl-row';
      bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;';
      bar.innerHTML =
        '<button type="button" class="btn" style="margin:0;flex:1;min-width:190px;background:#082548;color:#fff;font-weight:900;" onclick="window.downloadGatPibaFormPdf(\'' + esc(curF) + '\',\'official\')">' + esc(copy.btnDlHe) + '</button>' +
        '<button type="button" class="btn" style="margin:0;flex:1;min-width:210px;background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;font-weight:900;" onclick="window.downloadGatPibaFormPdf(\'' + esc(curF) + '\',\'bilingual\')">' + esc(copy.btnDlBi) + '</button>';
      printBtn.parentNode.insertAdjacentElement('afterend', bar);
    }
  }

  // Hook into mountUnifiedPibaFormsEngine & openDeviceSyncModal cleanly
  function hookLifecycle() {
    if (typeof window.mountUnifiedPibaFormsEngine === 'function' && !window.mountUnifiedPibaFormsEngine._gatProWrapped) {
      var origMount = window.mountUnifiedPibaFormsEngine;
      var wrappedMount = function() {
        var r = origMount.apply(this, arguments);
        attachPerFormOverrideListeners();
        hydrateActiveFormInputsWithOverrides();
        renderInlineFieldRedIndicators();
        renderAllFormsHubEverywhere();
        return r;
      };
      wrappedMount._gatProWrapped = true;
      window.mountUnifiedPibaFormsEngine = wrappedMount;
    }

    if (typeof window.openDeviceSyncModal === 'function' && !window.openDeviceSyncModal._gatProWrapped) {
      var origSyncOpen = window.openDeviceSyncModal;
      var wrappedSync = function() {
        var r = origSyncOpen.apply(this, arguments);
        renderAllFormsHubEverywhere();
        return r;
      };
      wrappedSync._gatProWrapped = true;
      window.openDeviceSyncModal = wrappedSync;
    }

    if (typeof window.printOfficialPibaPacket === 'function' && !window.printOfficialPibaPacket._gatProWrapped) {
      var origPrintPacket = window.printOfficialPibaPacket;
      var wrappedPrint = async function() {
        var ok = await window.ensurePaidFormsAccessOrPaywall('print');
        if (!ok) return false;
        return await origPrintPacket.apply(this, arguments);
      };
      wrappedPrint._gatProWrapped = true;
      window.printOfficialPibaPacket = wrappedPrint;
    }

    attachPerFormOverrideListeners();
    hydrateActiveFormInputsWithOverrides();
    renderInlineFieldRedIndicators();
    renderAllFormsHubEverywhere();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(hookLifecycle, 80); });
  } else {
    setTimeout(hookLifecycle, 80);
  }
})();

/* GAT_DIRECT_BILINGUAL_BUTTON_WIRE_V3 */
(function() {
  if (window.__gatDirectBilingualWireV3) return;
  window.__gatDirectBilingualWireV3 = true;

  var FORM_KEY_MAP = {
    "ash1": "ash1", "ash1_entry_visa": "ash1", "form_ash1": "ash1",
    "ash3": "ash3", "ash3_extension_change_visa": "ash3", "form_ash3": "ash3",
    "ash6": "ash6", "ash6_spousal_status": "ash6", "form_ash6": "ash6",
    "ash456": "ash456", "ash456_in_israel_oleh": "ash456", "form_ash456": "ash456",
    "mr14a": "mr14a", "mr14a_registry": "mr14a",
    "mr14b": "mr14b", "mr14b_registry_notice": "mr14b",
    "nespach_alef": "nespach_alef", "nespach_alef_affidavit": "nespach_alef",
    "security_cv": "security_cv", "security_cv_form": "security_cv", "sec_cv": "security_cv"
  };

  function resolveFormKeyFromBtn(btn) {
    var raw = "";
    if (btn && typeof btn.getAttribute === "function") {
      raw = btn.getAttribute("data-form-id") ||
            btn.getAttribute("data-form-key") ||
            btn.getAttribute("data-form") ||
            (btn.dataset && (btn.dataset.formId || btn.dataset.formKey || btn.dataset.form)) ||
            "";
      if (!raw) {
        var oc = btn.getAttribute("onclick") || "";
        var m = oc.match(/['"]([a-zA-Z0-9_-]+)['"]/);
        if (m && m[1]) raw = m[1];
      }
      if (!raw && typeof btn.closest === "function") {
        var host = btn.closest("[data-form-id],[data-form-key],[data-form]");
        if (host) {
          raw = host.getAttribute("data-form-id") || host.getAttribute("data-form-key") || host.getAttribute("data-form") || "";
        }
      }
    }
    if (!raw) {
      raw = (window.gatFormsState && window.gatFormsState.pf_active_form) ||
            window.currentFormId ||
            window.activeFormId ||
            "ash3";
    }
    var low = String(raw || "ash3").trim().toLowerCase();
    return FORM_KEY_MAP[low] || low || "ash3";
  }

  function findTargetBtn(target) {
    if (!target) return null;
    if (typeof target.closest === "function") {
      var el = target.closest("button, a, [role='button'], div, span");
      var cur = el;
      for (var i = 0; i < 4 && cur && cur !== document.body; i++) {
        var txt = (cur.textContent || "").replace(/\s+/g, " ").trim();
        var meta = ((cur.id || "") + " " + (cur.className || "") + " " + (cur.getAttribute && cur.getAttribute("onclick") || "")).toLowerCase();
        var match =
          txt.indexOf("Page-by-Page") !== -1 ||
          (txt.indexOf("EN + HE") !== -1 && txt.indexOf("PDF") !== -1) ||
          (meta.indexOf("downloadgatpibaformpdf") !== -1 && meta.indexOf("bilingual") !== -1);
        if (match && cur.offsetHeight > 0 && cur.offsetHeight <= 140) {
          return cur.closest("button, a, [role='button']") || cur;
        }
        cur = cur.parentElement;
      }
    }
    return null;
  }

  function onBtnTrigger(ev) {
    var btn = findTargetBtn(ev && ev.target);
    if (!btn) return;

    // Deduplicate rapid click + pointerup within 400ms
    var now = Date.now();
    if (btn._gatLastTriggerMs && (now - btn._gatLastTriggerMs) < 400) return;
    btn._gatLastTriggerMs = now;

    if (typeof ev.preventDefault === "function") ev.preventDefault();
    if (typeof ev.stopPropagation === "function") ev.stopPropagation();
    if (typeof ev.stopImmediatePropagation === "function") ev.stopImmediatePropagation();

    var origHtml = btn.innerHTML;
    btn.innerHTML = "⏳ Building EN + HE PDF...";
    btn.style.opacity = "0.82";

    var fk = resolveFormKeyFromBtn(btn);
    if (typeof window.downloadGatPibaFormPdf === "function") {
      Promise.resolve()
        .then(function() {
          return window.downloadGatPibaFormPdf(fk, "bilingual", { currentTarget: btn });
        })
        .catch(function(err) {
          console.error("[GAT EN+HE PDF click failed]:", err);
          alert("EN + HE PDF error: " + (err && err.message ? err.message : String(err)));
        })
        .finally(function() {
          setTimeout(function() {
            btn.style.opacity = "";
            if (btn.innerHTML.indexOf("⏳") === 0) btn.innerHTML = origHtml;
          }, 1200);
        });
    } else {
      btn.innerHTML = origHtml;
      btn.style.opacity = "";
      alert("PDF handler not loaded yet. Please refresh the page.");
    }
  }

  document.addEventListener("click", onBtnTrigger, true);
})();
