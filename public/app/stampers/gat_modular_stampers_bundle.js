/* Auto-generated browser bundle of GAT modular PIBA stampers */
(function(window) {
  'use strict';
  var __modules = {};
  var __cache = {};
  function __define(name, fn) { __modules[name] = fn; }
  function __require(name) {
    var k = String(name || '').replace(/^\.\//, '');
    if (__cache[k]) return __cache[k].exports;
    var m = { exports: {} };
    __cache[k] = m;
    if (__modules[k]) __modules[k](m, m.exports, __require);
    return m.exports;
  }

  __define('stamper_core.js', function(module, exports, require) {
'use strict';

function buildRandomStressPersona() {
  var pick = function(arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  var sur1 = [
    ['אלכסנדרוביץ-מונטפיורי', 'ALEXANDROVICH-MONTEFIORE'],
    ['רוזנצוייג-שטרנברג', 'ROSENZWEIG-STERNBERG'],
    ['ליכטנשטיין-מנדלסון', 'LIECHTENSTEIN-MENDELSSOHN'],
    ['גולדשמיט-ברנשטיין', 'GOLDSCHMIDT-BERNSTEIN']
  ];
  var sur2 = [
    ['אברמוביץ', 'ABRAMOVICH'],
    ['רבינוביץ', 'RABINOWITZ'],
    ['שפירא', 'SHAPIRO'],
    ['הורוביץ', 'HOROWITZ']
  ];
  var femGiven = [
    ['חנה אלישבע גבריאלה', 'CHANAH ELISHEVA GABRIELLA'],
    ['אביגיל רבקה מרגלית', 'AVIGAIL RIVKA MARGALIT'],
    ['דבורה לאה עמנואלה', 'DEVORAH LEAH EMMANUELLA'],
    ['שושנה תמר ויקטוריה', 'SHOSHANA TAMAR VICTORIA']
  ];
  var fatherGiven = [
    ['שמואל בנימין אלכסנדר', 'SHMUEL BENJAMIN ALEXANDER'],
    ['מתתיהו יחזקאל נתנאל', 'MATITYAHU YECHEZKEL NETANEL'],
    ['ירמיהו זכריה שלמה', 'YERMIYAHU ZECHARIAH SHLOMO']
  ];
  var motherGiven = [
    ['מרים אסתר ויקטוריה', 'MIRIAM ESTHER VICTORIA'],
    ['ברכה צפורה אלישבע', 'BRACHA TZIPORAH ELISHEVA'],
    ['נעמי יהודית גבריאלה', 'NAOMI YEHUDIT GABRIELLA']
  ];
  var spouseGiven = [
    'יונתן מתתיהו רפאל',
    'עמנואל אברהם ישעיהו',
    'בנימין אלעזר נחמיה'
  ];
  var spouseSur = [
    'לוי-צדק ירושלמי',
    'לוי-אפשטיין אשכנזי',
    'מזרחי-טולידאנו'
  ];

  var s1 = pick(sur1), s2 = pick(sur2);
  var fg = pick(femGiven), fa = pick(fatherGiven), mo = pick(motherGiven);
  var spG = pick(spouseGiven), spS = pick(spouseSur);

  
  // Universal split-date helper for app/AI-scanned dates (DD/MM/YYYY, YYYY-MM-DD, Date, or {d,m,y})
  function parseAnyDateParts(raw, fallbackObj) {
    if (raw && typeof raw === "object" && (raw.d || raw.day || raw.full)) {
      if (raw.d && raw.m && raw.y) return { dd: String(raw.d).padStart(2,"0"), mm: String(raw.m).padStart(2,"0"), yyyy: String(raw.y) };
      raw = raw.full || "";
    }
    var sVal = String(raw || (fallbackObj && fallbackObj.full) || "23/11/1994").trim();
    var mIso = sVal.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (mIso) return { dd: mIso[3].padStart(2,"0"), mm: mIso[2].padStart(2,"0"), yyyy: mIso[1] };
    var mIl = sVal.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/);
    if (mIl) {
      var yr = mIl[3].length === 2 ? ("20" + mIl[3]) : mIl[3];
      return { dd: mIl[1].padStart(2,"0"), mm: mIl[2].padStart(2,"0"), yyyy: yr };
    }
    return {
      dd: (fallbackObj && fallbackObj.d) || "23",
      mm: (fallbackObj && fallbackObj.m) || "11",
      yyyy: (fallbackObj && fallbackObj.y) || "1994"
    };
  }

  return {
    parseAnyDateParts: parseAnyDateParts,
    pf_ash3_action: 'הארכה ל-12 חודשים • החלפה לאשרת א/2 לימודי גיור',
    pf_ash3_months: '12',
    pf_ash3_target_visa_he: 'א/2',
    pf_ash3_target_visa_en: 'A/2',
    pf_surname_he: s1[0] + ' ' + s2[0],
    pf_surname_en: s1[1] + ' ' + s2[1],
    pf_given_he: fg[0],
    pf_given_en: fg[1],
    pf_prior_names: 'גולדשטיין-לוי שלזינגר',
    pf_prior_names_en: 'GOLDSTEIN-LEVY SCHLESINGER',
    pf_marital: 'נשוי/אה',
    pf_dob: '1994-11-23',
    pf_hebrew_dob: 'כ״ו בכסלו תשנ״ה',
    pf_gender: 'נקבה',
    pf_birth_country: 'ליון, צרפת',
    pf_birth_country_en: 'LYON, FRANCE',
    pf_citizenship: 'צרפתית',
    pf_citizenship_en: 'FRENCH',
    pf_religion_nat: 'יהודית • יהודייה',
    pf_religion_en: 'JEWISH',
    pf_nationality_en: 'JEWISH',
    pf_occupation_he: 'אדריכלית נוף בכירה',
    pf_edu_years: '16',
    pf_father_he: fa[0] + ' ' + s2[0],
    pf_father_en: fa[1] + ' ' + s2[1],
    pf_father_dob: '1962-04-19',
    pf_mother_he: mo[0] + ' ' + s2[0],
    pf_mother_en: mo[1] + ' ' + s2[1],
    pf_mother_maiden: 'רוטשילד-לוי הלפרין',
    pf_mother_maiden_en: 'ROTHSCHILD-LEVY HALPERIN',
    pf_mother_dob: '1965-09-08',
    pf_foreign_grandfather: 'אליעזר מנחם מונטפיורי',
    pf_pass_num: 'FR98765432',
    pf_pass_issue_date: '2024-03-10',
    pf_pass_exp_date: '2034-03-09',
    pf_police_issue_date: '2026-09-20',
    pf_countries_over_1yr: 'צרפת, שווייץ',
    pf_entry_date_port: '01/09/2026 • נתב״ג • ב/2 • 01/12/2026',
    pf_abroad_addr: '25 Rue de la Republique, Lyon, France',
    pf_abroad_addr_he: 'רחוב דה לה רפובליק 25, ליון, צרפת',
    pf_il_addr_he: 'רחוב הרצל 42, דירה 9, חיפה, 3321400',
    pf_il_city_en: 'HAIFA',
    pf_il_street_en: '42 HERZL ST, APT 9',
    pf_phone_il: '058-765-4321',
    pf_email: 'chanah.montefiore@example.com',
    pf_inst_details: 'מכון גיור חיפה • 580998877 • הרב דוד אלעזר • 054-111-2233',
    pf_inst_name_en: 'UNIVERSITY OF MASSACHUSETTS',
    pf_inst_addr_en: '42 HERZL ST, HAIFA',
    pf_inst_contact_en: 'RABBI DAVID LEVY',
    pf_sp_name_he: spG + ' ' + spS,
    pf_sp_surname_he: spS,
    pf_sp_given_he: spG,
    pf_sp_tz: '012345674',
    pf_sp_citizenship_he: 'ישראלית',
    pf_sp_birth_country_he: 'ישראל',
    pf_sp_prior_he: 'ללא',
    pf_sp_parents_grand: '15/07/1991 • אב: אברהם משה • אם: לאה רבקה • סב: יעקב שלמה',
    pf_marriage_details: '14/06/2026 ליון, צרפת • מהנדס מערכות מידע',
    pf_ash6_refs: 'דוד אלעזר לוי | 023456782 | חבר קהילה | רח׳ האר״י 10 חיפה | 052-765-4321\nנועה אביגיל מזרחי | 034567891 | שכנה ומכרה | רח׳ הרצל 44 חיפה | 050-987-6543',
    pf_ll_affidavit: 'משה אהרן אלון | 045678909 | רח׳ הרצל 42 חיפה | 84 | 2 | 3.5 | העברה בנקאית חודשית',
    pf_456_shvut: 'סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר',
    pf_456_settlement: 'שהות 2025–2026 באשרת ב/2 • אדריכלית נוף בכירה • סיימתי עבודה בחו״ל • דירה שכורה בחיפה • חשבון בנק לאומי פעיל • קהילת חיפה • 16 שנות לימוד',
    pf_ash1_consulate: 'איחוד משפחות ולימודי גיור • פריז',
    pf_children_table: 'ללא',
    pf_children_rows: [
      { id_num: "FR1122334", surname_he: "גולדשמיט", given: "ARIEL ALEXANDER BENJAMIN", given_he: "אריאל אלכסנדר בנימין", other_parent_he: "עמנואל אברהם לוי", country: "ליון, צרפת", country_en: "LYON, FRANCE", dob: "14/05/2018", gender: "זכר", entry_date: "01/09/2026" },
      { id_num: "FR2233445", surname_he: "גולדשמיט", given: "NOA GABRIELLA ESTHER", given_he: "נועה גבריאלה אסתר", other_parent_he: "עמנואל אברהם לוי", country: "פריז, צרפת", country_en: "PARIS, FRANCE", dob: "22/09/2020", gender: "נקבה", entry_date: "01/09/2026" },
      { id_num: "FR3344556", surname_he: "גולדשמיט", given: "DANIEL MATITYAHU SHLOMO", given_he: "דניאל מתתיהו שלמה", other_parent_he: "עמנואל אברהם לוי", country: "ז׳נבה, שווייץ", country_en: "GENEVA, SWITZERLAND", dob: "03/11/2023", gender: "זכר", entry_date: "01/09/2026" }
    ],
    pf_ash6_minor_consent_reason: "אפוטרופסות משותפת של שני ההורים המבקשים",
    pf_ash6_decl_exception_he: "ללא הסתייגויות — כל סעיפי ההצהרה לעיל מתקיימים במלואם וללא יוצא מן הכלל.",
    pf_ll_marital: "נשוי",
    pf_ll_children_count: "3",
    pf_ll_occupation: "מהנדס אזרחי ובעל נכסים",
    pf_ll_floor_a_rows: [
      { name: "עמנואל ואביגיל לוי-גולדשמיט", father: "מתתיהו", id: "012345674", rel: "שוכרים ראשיים", date: "01/09/2026", paid_by: "העברה בנקאית" }
    ],
    pf_ll_floor_b_rows: [
      { name: "ללא דיירים נוספים", father: "—", id: "—", rel: "—", date: "—", paid_by: "—" }
    ],
    pf_target_branch: 'חיפה והצפון',
    pf_phone_abroad: "+33-4-7890-1234",
    pf_sp_phone_home: "04-812-3456",
    pf_sp_prior_given_he: "עמנואל",
    pf_sp_entry_date: "15/07/1991",
    pf_sp_status_date: "15/07/1991",
    pf_sp_pass_num: "IL9988776",
    pf_sp_pass_exp: "14/07/2031",
    pf_sp_area_id: "3321400",
    pf_ash6_refs: "דוד אלעזר לוי | 023456782 | חבר קהילה | רח׳ האר״י 10 חיפה | 052-765-4321\nנועה אביגיל מזרחי | 034567891 | שכנה ומכרה | רח׳ הרצל 44 חיפה | 050-987-6543\nשמואל בנימין שפירא | 045678912 | עמית לעבודה | רח׳ החלוץ 18 חיפה | 054-321-9876\nמרים אסתר הורוביץ | 056789123 | קרובת משפחה | רח׳ הנשיא 55 חיפה | 053-246-8135",
    pf_decl_clean_record: true,
    pf_police_covers_prior: true,
    pf_has_name_change_cert: true
  };
}

function normalizeHebrewQuotes(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/([\u0590-\u05FF])"([\u0590-\u05FF])/g, '$1\u05F4$2')
    .replace(/([\u0590-\u05FF])'/g, '$1\u05F3')
    .replace(/\s+/g, ' ')
    .trim();
}

var MIRROR_PARENS = { '(': ')', ')': '(', '[': ']', ']': '[' };

function buildVisualRuns(rawText, fontHeb, fontLat) {
  var clean = normalizeHebrewQuotes(rawText);
  if (!clean) return [];
  if (!/[\u0590-\u05FF]/.test(clean)) {
    return [{ text: clean, font: fontLat }];
  }

  var tokenRe = /[אב][\/][1-5]|4[אב][׳']?|[\u0590-\u05FF\u05F3\u05F4]+(?:-[\u0590-\u05FF\u05F3\u05F4]+)+|[\u0590-\u05FF\u05F3\u05F4]+|\d+(?:[\/\.\-:]\d+)+|[A-Za-z]+[0-9A-Za-z\-]*|[A-Za-z\u00C0-\u024F]+(?:\s+[A-Za-z\u00C0-\u024F\-]+)*|\d+|\s+|[^\s]/g;
  var rawTokens = clean.match(tokenRe) || [];
  var runs = [];

  for (var i = rawTokens.length - 1; i >= 0; i--) {
    var tok = rawTokens[i];
    var mVisa = tok.match(/^([אב])([\/][1-5])$/);
    var mLaw = tok.match(/^(4)([אב][׳']?)$/);
    if (mVisa) {
      runs.push({ text: mVisa[2].slice(1), font: fontLat });
      runs.push({ text: '/', font: fontLat });
      runs.push({ text: mVisa[1], font: fontHeb });
    } else if (mLaw) {
      runs.push({ text: mLaw[2], font: fontHeb });
      runs.push({ text: mLaw[1], font: fontLat });
    } else if (/^[\u0590-\u05FF\u05F3\u05F4]+(?:-[\u0590-\u05FF\u05F3\u05F4]+)+$/.test(tok)) {
      var hParts = tok.split('-');
      for (var hp = hParts.length - 1; hp >= 0; hp--) {
        runs.push({ text: hParts[hp], font: fontHeb });
        if (hp > 0) runs.push({ text: '-', font: fontLat });
      }
    } else if (/^[\u0590-\u05FF\u05F3\u05F4]+$/.test(tok)) {
      runs.push({ text: tok, font: fontHeb });
    } else {
      var outTok = tok.length === 1 && MIRROR_PARENS[tok] ? MIRROR_PARENS[tok] : tok;
      runs.push({ text: outTok, font: fontLat });
    }
  }
  return runs;
}

function measureRunsWidth(runs, size) {
  var total = 0;
  for (var i = 0; i < runs.length; i++) {
    total += runs[i].font.widthOfTextAtSize(runs[i].text, size);
  }
  return total;
}

function splitTextIntoTwoBalancedLines(str) {
  var normalized = String(str || '').trim().replace(/([A-Za-z\u0590-\u05FF]{7,})-/g, '$1- ');
  var words = normalized.split(/\s+/);
  if (words.length < 2) return null;
  var bestIdx = 1, bestDiff = 9999;
  var totalLen = str.length;
  var running = 0;
  for (var i = 0; i < words.length - 1; i++) {
    running += words[i].length + (i > 0 ? 1 : 0);
    var diff = Math.abs((totalLen / 2) - running);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i + 1;
    }
  }
  return [words.slice(0, bestIdx).join(' '), words.slice(bestIdx).join(' ')];
}

function numToGematria(n) {
  n = parseInt(n, 10);
  if (!n || n <= 0) return "";
  if (n >= 5000) n -= 5000;
  var ones = ["","א","ב","ג","ד","ה","ו","ז","ח","ט"];
  var tens = ["","י","כ","ל","מ","נ","ס","ע","פ","צ"];
  var hundreds = ["","ק","ר","ש","ת","תק","תר","תש","תת","תתק"];
  var out = "";
  if (n >= 100) { out += hundreds[Math.floor(n / 100)] || ""; n %= 100; }
  if (n === 15) out += "טו";
  else if (n === 16) out += "טז";
  else {
    if (n >= 10) { out += tens[Math.floor(n / 10)] || ""; n %= 10; }
    if (n > 0) out += ones[n] || "";
  }
  if (out.length === 1) return out + "׳";
  return out.slice(0, -1) + "״" + out.slice(-1);
}

function toHebrewDateStr(y, m, d) {
  try {
    var dt = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10), 12, 0, 0));
    if (isNaN(dt.getTime())) return "";
    var parts = new Intl.DateTimeFormat("he-IL-u-ca-hebrew", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).formatToParts(dt);
    var hd = "", hm = "", hy = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === "day") hd = parts[i].value;
      if (parts[i].type === "month") hm = parts[i].value;
      if (parts[i].type === "year") hy = parts[i].value;
    }
    if (!hd || !hm || !hy) return "";
    var prefixM = /^ב/.test(hm) ? hm : ("ב" + hm);
    return numToGematria(hd) + " " + prefixM + " " + numToGematria(hy);
  } catch (e) { return ""; }
}

function splitIsoDate(val, explicitHeb) {
  var m = String(val || "").trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return { d: m[3], m: m[2], y: m[1], full: m[3] + "/" + m[2] + "/" + m[1], heb: explicitHeb || toHebrewDateStr(m[1], m[2], m[3]) };
  var m2 = String(val || "").trim().match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/);
  if (m2) {
    var dd = m2[1].padStart(2, "0"), mm = m2[2].padStart(2, "0"), yy = m2[3];
    return { d: dd, m: mm, y: yy, full: dd + "/" + mm + "/" + yy, heb: explicitHeb || toHebrewDateStr(yy, mm, dd) };
  }
  var now = new Date();
  var td = String(now.getDate()).padStart(2, "0"), tm = String(now.getMonth() + 1).padStart(2, "0"), ty = String(now.getFullYear());
  return { d: "", m: "", y: "", full: String(val || ""), heb: explicitHeb || "", todayD: td, todayM: tm, todayY: ty, todayFull: td + "/" + tm + "/" + ty, todayHeb: toHebrewDateStr(ty, tm, td) };
}

function parseCityStreet(ilAddr) {
  var s = normalizeHebrewQuotes(ilAddr);
  if (!s) return { city: '', street: '', streetWithNum: '', house: '', apt: '', zip: '' };
  var zipM = s.match(/\b(\d{7}|\d{5})\b/);
  var zip = zipM ? zipM[1] : '';
  var parts = s.replace(/\b(\d{7}|\d{5})\b/g, '').split(',').map(function(p) { return p.trim(); }).filter(Boolean);
  var city = parts.length >= 2 ? parts[parts.length - 1] : '';
  var streetPart = parts[0] || s;
  var aptM = s.match(/דירה\s*(\d+)/);
  var apt = aptM ? aptM[1] : '';
  var cleanStreetPart = streetPart.replace(/דירה\s*\d+/g, '').trim();
  var numM = cleanStreetPart.match(/(\d+)/);
  var house = numM ? numM[1] : '';
  var streetOnly = cleanStreetPart.replace(/\s*\d+\s*$/, '').trim();
  return {
    city: city,
    street: streetOnly || cleanStreetPart,
    streetWithNum: (streetOnly || cleanStreetPart) + (house ? ' ' + house : '') + (apt ? ', דירה ' + apt : ''),
    house: house,
    apt: apt,
    zip: zip
  };
}

function parseAbroadAddr(abroad) {
  var parts = String(abroad || '').split(',').map(function(p) { return p.trim(); }).filter(Boolean);
  if (parts.length >= 3) return { street: parts.slice(0, -2).join(', '), city: parts[parts.length - 2], country: parts[parts.length - 1] };
  if (parts.length === 2) return { street: parts[0], city: parts[1], country: '' };
  return { street: parts[0] || '', city: '', country: '' };
}

function splitSpouseFullName(s) {
  if (s.pf_sp_surname_he || s.pf_sp_given_he) {
    return {
      full: String(s.pf_sp_name_he || ((s.pf_sp_given_he || '') + ' ' + (s.pf_sp_surname_he || ''))).trim(),
      given: String(s.pf_sp_given_he || '').trim(),
      surname: String(s.pf_sp_surname_he || '').trim()
    };
  }
  var full = String(s.pf_sp_name_he || '').trim();
  if (!full) return { full: '', given: '', surname: '' };
  var p = full.split(/\s+/);
  if (p.length <= 2) return { full: full, given: p[0] || '', surname: p.slice(1).join(' ') };
  var splitAt = p.length >= 4 ? p.length - 2 : p.length - 1;
  return { full: full, given: p.slice(0, splitAt).join(' '), surname: p.slice(splitAt).join(' ') };
}

async function createStamperContext(pdfFilename, rawState, loaderOpts) {
  var PDFLib = loaderOpts.PDFLib;
  var fontkit = loaderOpts.fontkit;
  var s = (rawState && rawState._isRealUser) ? rawState : Object.assign({}, rawState || {});

  var pdfBytes = await loaderOpts.loadPdfBytes(pdfFilename);
  var regFontBytes = await loaderOpts.loadFontBytes('NotoSansHebrew-Regular.ttf');
  var boldFontBytes = await loaderOpts.loadFontBytes('NotoSansHebrew-Bold.ttf');

  var pdfDoc = await PDFLib.PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  pdfDoc.registerFontkit(fontkit);
  var fontHebReg = await pdfDoc.embedFont(regFontBytes, { subset: false });
  var fontHebBold = await pdfDoc.embedFont(boldFontBytes, { subset: false });
  var fontLatReg = await pdfDoc.embedStandardFont(PDFLib.StandardFonts.Helvetica);
  var fontLatBold = await pdfDoc.embedStandardFont(PDFLib.StandardFonts.HelveticaBold);

  var ink = PDFLib.rgb(0.0, 0.28, 0.76);

  function drawSingleLineRuns(pg, runs, x0, x1, y, sz, isHeb, align) {
    var availW = Math.max(8, (x1 - x0) - 4);
    var w = measureRunsWidth(runs, sz);
    if (w > availW) {
      sz = Math.max(3.8, sz * (availW / w));
      w = measureRunsWidth(runs, sz);
    }
    var startX = x0 + 2.0;
    if (align === 'center') startX = x0 + ((x1 - x0) - w) / 2;
    else if (isHeb || align === 'right') startX = Math.max(x0 + 1.5, x1 - 2.5 - w);

    var curX = startX;
    for (var ri = 0; ri < runs.length; ri++) {
      var r = runs[ri];
      var rw = r.font.widthOfTextAtSize(r.text, sz);
      pg.drawText(r.text, { x: curX, y: y, size: sz, font: r.font, color: ink });
      curX += rw;
    }
  }

  function put(pageIdx, text, x0, x1, y, opts) {
    var raw = normalizeHebrewQuotes(text);
    if (!raw || raw === '—') return;
    var pages = pdfDoc.getPages();
    if (pageIdx < 0 || pageIdx >= pages.length) return;
    var pg = pages[pageIdx];
    var o = opts || {};
    var isHeb = /[\u0590-\u05FF]/.test(raw);
    var fHeb = (o.bold !== false) ? fontHebBold : fontHebReg;
    var fLat = (o.bold !== false) ? fontLatBold : fontLatReg;

    var runs = buildVisualRuns(raw, fHeb, fLat);
    if (!runs.length) return;

    var availW = Math.max(10, (x1 - x0) - 4.0);
    var sz = Math.min(o.size || 8.6, 12.0);
    var minSingleLineSz = o.minSize || (sz - 0.3);
    var w = measureRunsWidth(runs, sz);

    if (w > availW) {
      var fullCellW = Math.max(10, (x1 - x0) - 1.5);
      var scaledSz = sz * (availW / w);
      var twoLines = (o.noWrap !== true) ? splitTextIntoTwoBalancedLines(raw) : null;
      if (twoLines && scaledSz < minSingleLineSz) {
        var baseWrapSz = Math.max(o.wrapSize || 7.6, 7.2);
        var runs1 = buildVisualRuns(twoLines[0], fHeb, fLat);
        var runs2 = buildVisualRuns(twoLines[1], fHeb, fLat);
        var maxW = Math.max(measureRunsWidth(runs1, baseWrapSz), measureRunsWidth(runs2, baseWrapSz));
        var lineSz = maxW > fullCellW ? (baseWrapSz * (fullCellW / maxW)) : baseWrapSz;

        var normWords = String(raw || '').trim().replace(/([A-Za-z\u0590-\u05FF]{6,})-/g, '$1- ').split(/\s+/);
        if (lineSz < 6.8 && normWords.length >= 3 && (o.allowThreeLines !== false)) {
          var l1 = normWords[0];
          var l2 = normWords.slice(1, -1).join(' ');
          var l3 = normWords[normWords.length - 1];
          var r1 = buildVisualRuns(l1, fHeb, fLat), r2 = buildVisualRuns(l2, fHeb, fLat), r3 = buildVisualRuns(l3, fHeb, fLat);
          var m3 = Math.max(measureRunsWidth(r1, baseWrapSz), measureRunsWidth(r2, baseWrapSz), measureRunsWidth(r3, baseWrapSz));
          var sz3 = m3 > fullCellW ? Math.max(6.8, baseWrapSz * (fullCellW / m3)) : baseWrapSz;
          var yc3 = (o.yWrapCenter !== undefined) ? o.yWrapCenter : (y + 1.5);
          drawSingleLineRuns(pg, r1, x0, x1, yc3 + 6.2, sz3, isHeb, o.align);
          drawSingleLineRuns(pg, r2, x0, x1, yc3,       sz3, isHeb, o.align);
          drawSingleLineRuns(pg, r3, x0, x1, yc3 - 6.2, sz3, isHeb, o.align);
          return;
        }

        lineSz = Math.max(6.8, lineSz);
        var vShift = o.lineShift || 4.0;
        var yCenter = (o.yWrapCenter !== undefined) ? o.yWrapCenter : (y + 1.5);
        drawSingleLineRuns(pg, runs1, x0, x1, yCenter + vShift, lineSz, isHeb, o.align);
        drawSingleLineRuns(pg, runs2, x0, x1, yCenter - vShift, lineSz, isHeb, o.align);
        return;
      }
      sz = Math.max(o.noWrap ? 5.8 : 6.5, scaledSz);
    }

    drawSingleLineRuns(pg, runs, x0, x1, y, sz, isHeb, o.align);
  }

  function check(pageIdx, xLeft, yBase, boxW, boxH, colorMode) {
    var pages = pdfDoc.getPages();
    if (pageIdx < 0 || pageIdx >= pages.length) return;
    var pg = pages[pageIdx];
    var bw = boxW || 7.1;
    var bh = boxH || 7.1;
    var cx = xLeft + (bw / 2) + 1.2;
    var cy = yBase + (bh / 2);
    var c = PDFLib.rgb(0.0, 0.28, 0.76); // Default ALL checks to Royal Blue
    if (colorMode === 'red' || colorMode === false) c = PDFLib.rgb(0.62, 0.04, 0.04); // Red ONLY for NO / לא
    else if (colorMode === 'temp_green') c = PDFLib.rgb(0.0, 0.65, 0.18); // Temporary Green for newly added check calibration
    pg.drawLine({ start: { x: cx - 5.1, y: cy + 0.6 }, end: { x: cx - 0.9, y: cy - 4.0 }, thickness: 3.2, color: c });
    pg.drawLine({ start: { x: cx - 0.9, y: cy - 4.0 }, end: { x: cx + 6.6, y: cy + 5.7 }, thickness: 3.2, color: c });
  }

  function putComb(pageIdx, strVal, xStart, stepW, y, numCells, padNine) {
    var raw = padNine
      ? String(strVal || '').replace(/\D/g, '').padStart(9, '0').slice(0, 9)
      : String(strVal || '').replace(/[^A-Za-z0-9]/g, '').slice(0, numCells || 9);
    if (!raw) return;
    for (var i = 0; i < raw.length; i++) {
      var cx0 = xStart + i * stepW;
      put(pageIdx, raw.charAt(i), cx0 - 2, cx0 + stepW + 2, y, { align: 'center', size: 8.2, bold: true, noWrap: true });
    }
  }

  var dob = splitIsoDate(s.pf_dob, s.pf_hebrew_dob);
  var fDob = splitIsoDate(s.pf_father_dob, s.pf_father_hebrew_dob);
  var mDob = splitIsoDate(s.pf_mother_dob, s.pf_mother_hebrew_dob);
  var pIss = splitIsoDate(s.pf_pass_issue_date);
  var pExp = splitIsoDate(s.pf_pass_exp_date);
  var today = splitIsoDate('');
  var il = parseCityStreet(s.pf_il_addr_he);
  var abr = parseAbroadAddr(s.pf_abroad_addr);
  var branchCity = String(s.pf_target_branch || '').split('/')[0].trim();
  var isFemale = /נקבה|Female/i.test(String(s.pf_gender || ''));
  var mar = String(s.pf_marital || '');
  var isMarried = /נשוי|Married/i.test(mar);
  var isDiv = /גרוש|Divorced/i.test(mar);
  var isWid = /אלמן|Widowed/i.test(mar);
  var relParts = String(s.pf_religion_nat || '').split(/[•\/,]/).map(function(x){ return x.trim(); });
  var relHe = relParts[0] || '';
  var natHe = relParts[1] || relParts[0] || '';
  var sp = splitSpouseFullName(s);

  var bcPartsHe = String(s.pf_birth_country || '').split(',').map(function(x){ return x.trim(); });
  var abrCityHe = bcPartsHe[0] || '';
  var abrCountryHe = bcPartsHe[bcPartsHe.length - 1] || '';

  var spPG = String(s.pf_sp_parents_grand || '');
  var spDobM = spPG.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  var spDobFull = spDobM ? spDobM[0] : (s.pf_sp_dob || '');
  var spAb = ((spPG.match(/אב:\s*([^•|]+)/) || [])[1] || '').trim();
  var spIm = ((spPG.match(/אם:\s*([^•|]+)/) || [])[1] || '').trim();
  var spSb = ((spPG.match(/סב:\s*([^•|]+)/) || [])[1] || '').trim();

  return {
    pdfDoc: pdfDoc,
    s: s,
    put: put,
    check: check,
    putComb: putComb,
    dob: dob,
    fDob: fDob,
    mDob: mDob,
    pIss: pIss,
    pExp: pExp,
    today: today,
    il: il,
    abr: abr,
    branchCity: branchCity,
    isFemale: isFemale,
    mar: mar,
    isMarried: isMarried,
    isDiv: isDiv,
    isWid: isWid,
    relHe: relHe,
    natHe: natHe,
    spFullHe: sp.full,
    spGivenHe: sp.given,
    spSurHe: sp.surname,
    abrCityHe: abrCityHe,
    abrCountryHe: abrCountryHe,
    spDobM: spDobM,
    spDobFull: spDobFull,
    spAb: spAb,
    spIm: spIm,
    spSb: spSb,
    kids: Array.isArray(s.pf_children_rows) ? s.pf_children_rows : []
  };
}

module.exports = {
  buildRandomStressPersona: buildRandomStressPersona,
  createStamperContext: createStamperContext,
  splitIsoDate: splitIsoDate
};

  });

  __define('stamp_ash1.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampAsh1(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('ash1_entry_visa.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check;
  var dob = ctx.dob, pIss = ctx.pIss, pExp = ctx.pExp, today = ctx.today;
  var il = ctx.il, abr = ctx.abr, branchCity = ctx.branchCity;
  var isFemale = ctx.isFemale, mar = ctx.mar, isMarried = ctx.isMarried, isDiv = ctx.isDiv, isWid = ctx.isWid;
  var relHe = ctx.relHe, natHe = ctx.natHe;
  var spFullHe = ctx.spFullHe, spGivenHe = ctx.spGivenHe, spSurHe = ctx.spSurHe;
  var spAb = ctx.spAb, spDobFull = ctx.spDobFull;

  // Header Category (Hebrew on top underline + English on bottom underline)
  var ash1CatHe = s.pf_ash1_cat_he || s.pf_ash3_target_visa_he || 'א/2';
  var ash1CatEn = s.pf_ash1_cat_en || s.pf_ash3_target_visa_en || 'A/2';
  put(0, ash1CatHe, 160, 265, 765.5, { align: 'center', size: 9.8, bold: true, noWrap: true });
  put(0, ash1CatEn, 330, 435, 752.5, { align: 'center', size: 9.8, bold: true, noWrap: true });

  // Details of the Israeli Applicant (Sponsor) — 100% Hebrew, Bold, 2-line wrap at 7.6pt
  put(0, s.pf_company_name_he || 'מכון גיור חיפה (ע״ר)', 480, 558, 605.5, { align: 'center', size: 7.6, yWrapCenter: 605.5, lineShift: 4.0, wrapSize: 7.4 });
  put(0, s.pf_sp_tz, 375, 475, 605.5, { align: 'center', size: 8.8, noWrap: true });
  put(0, spFullHe, 254, 369, 605.5, { align: 'center', size: 7.6, yWrapCenter: 605.5, lineShift: 4.0, wrapSize: 7.4 });
  put(0, s.pf_sp_relation_he || (spFullHe ? 'בן/בת זוג' : ''), 148, 248, 605.5, { align: 'center', size: 7.6, yWrapCenter: 605.5, lineShift: 4.0, wrapSize: 7.4 });
  put(0, s.pf_phone_il, 40, 142, 605.5, { align: 'center', size: 8.4, noWrap: true });

  // Particulars of the Applicant — Row 1 (Uniform 7.4pt bold with 2-line wrap)
  put(0, s.pf_surname_en, 388, 501, 538.0, { align: 'center', size: 7.4, yWrapCenter: 539.5, lineShift: 4.0, wrapSize: 7.2 });
  put(0, s.pf_given_en, 270, 383, 538.0, { align: 'center', size: 7.4, yWrapCenter: 539.5, lineShift: 4.0, wrapSize: 7.2 });
  put(0, s.pf_father_en || s.pf_father_he, 155, 264, 538.0, { align: 'center', size: 7.4, yWrapCenter: 539.5, lineShift: 4.0, wrapSize: 7.2 });
  put(0, s.pf_mother_en || s.pf_mother_he, 40, 149, 538.0, { align: 'center', size: 7.4, yWrapCenter: 539.5, lineShift: 4.0, wrapSize: 7.2 });

  // Row 2: Mother's maiden name, Previous family name, Nationality, Religion
  put(0, s.pf_mother_maiden || s.pf_mother_maiden_en, 438, 558, 493.0, { align: 'center', size: 7.4, yWrapCenter: 494.5, lineShift: 4.0, wrapSize: 7.2 });
  put(0, s.pf_prior_names || s.pf_prior_names_en, 304, 433, 493.0, { align: 'center', size: 7.4, yWrapCenter: 494.5, lineShift: 4.0, wrapSize: 7.2 });
  put(0, natHe, 169, 298, 493.0, { align: 'center', size: 8.0, noWrap: true });
  put(0, relHe, 39, 163, 493.0, { align: 'center', size: 8.0, noWrap: true });

  // Row 3: Country of birth, Date of birth, Citizenship, Occupation (2-line wrap enabled!)
  put(0, s.pf_birth_country, 438, 557, 450.5, { align: 'center', size: 7.6, yWrapCenter: 451.5, lineShift: 4.0, wrapSize: 7.4 });
  put(0, dob.full, 304, 433, 450.5, { align: 'center', size: 9.4, noWrap: true });
  put(0, s.pf_citizenship, 169, 298, 450.5, { align: 'center', size: 7.6, yWrapCenter: 451.5, lineShift: 4.0, wrapSize: 7.4 });
  put(0, s.pf_occupation_he, 40, 163, 450.5, { align: 'center', size: 7.6, yWrapCenter: 451.5, lineShift: 4.0, wrapSize: 7.4 });

  // Row 4: Family Status, Passport, Gender (ALL Green — non-Yes/No selection boxes)
  if (s._stressAllCheckboxes) {
    check(0, 548.7, 406.7, 7.1, 7.1, 'green'); // רווק/ה Single
    check(0, 466.5, 406.7, 7.1, 7.1, 'green'); // נשוי/אה Married
    check(0, 548.7, 391.6, 7.1, 7.1, 'green'); // גרוש/ה Divorced
    check(0, 466.5, 391.6, 7.1, 7.1, 'green'); // אלמן/ה Widowed
    check(0, 369.9, 432.3, 7.1, 7.1, 'green'); // דרכון Passport
    check(0, 281.4, 432.3, 7.1, 7.1, 'green'); // תעודת מעבר Laissez-passer
    check(0, 71.7, 410.0, 7.1, 7.1, 'green');  // זכר Male
    check(0, 71.3, 390.5, 7.1, 7.1, 'green');  // נקבה Female
  } else {
    if (isMarried) check(0, 466.5, 406.7);
    else if (isWid) check(0, 466.5, 391.6);
    else if (isDiv) check(0, 548.7, 391.6);
    else if (mar) check(0, 548.7, 406.7);
    if (s.pf_pass_num) check(0, 369.9, 432.3);
    if (s.pf_gender) check(0, isFemale ? 71.3 : 71.7, isFemale ? 390.5 : 410.0);
  }
  put(0, s.pf_pass_num, 296, 389, 389.0, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, pIss.full, 197, 291, 389.0, { align: 'center', size: 9.4, noWrap: true });
  put(0, pExp.full, 112, 192, 389.0, { align: 'center', size: 9.4, noWrap: true });

  // Spouse of the invitee — 100% Hebrew (+1.5px on Family Name -> size: 9.3, wrapSize: 7.3)
  if (spFullHe) {
    put(0, spSurHe, 474, 556, 325.5, { align: 'right', size: 9.3, yWrapCenter: 327.0, lineShift: 3.8, wrapSize: 7.3 });
    put(0, spGivenHe, 388, 469, 325.5, { align: 'center', size: 7.6, yWrapCenter: 327.0, lineShift: 4.0, wrapSize: 7.4 });
    put(0, s.pf_sp_prior_he || 'ללא', 301, 382, 325.5, { align: 'center', size: 7.6, yWrapCenter: 327.0, lineShift: 4.0, wrapSize: 7.4 });
    put(0, spAb, 214, 296, 325.5, { align: 'center', size: 7.6, yWrapCenter: 327.0, lineShift: 4.0, wrapSize: 7.4 });
    put(0, s.pf_sp_birth_country_he, 127, 209, 325.5, { align: 'center', size: 7.6, yWrapCenter: 327.0, lineShift: 4.0, wrapSize: 7.4 });
    put(0, spDobFull, 40, 122, 325.5, { align: 'center', size: 9.4, noWrap: true });
  }

  // Children of the invitee (Rows 1, 2, 3 — centered vertically & horizontally in each cell)
  var kids = Array.isArray(s.pf_children_rows) ? s.pf_children_rows : [];
  var kidY = [265.2, 252.8, 237.5];
  for (var ki = 0; ki < 3; ki++) {
    if (kids[ki]) {
      put(0, kids[ki].given_he || kids[ki].given, 376, 540, kidY[ki], { align: 'center', size: 7.0, bold: true, noWrap: true });
      put(0, kids[ki].country, 204, 370, kidY[ki], { align: 'center', size: 7.4, noWrap: true });
      put(0, kids[ki].dob, 38, 198, kidY[ki], { align: 'center', size: 9.4, noWrap: true });
    }
  }

  // Purpose of entry & Previous stays — sitting cleanly above their exact Hebrew underlines
  var ash1ConsParts = String(s.pf_ash1_consulate || '').split(/[•|]/).map(function(x){ return x.trim(); });
  var purp1 = ash1ConsParts[0] || '';
  var consulateHe = ash1ConsParts[1] || '';
  put(0, purp1, 285, 462, 210.5, { align: 'right', bold: true, noWrap: true });
  var rawStay = String(s.pf_entry_date_port || '').replace(/•\s*([אב]\/[1-5])\s*•\s*(\d{2}\/\d{2}\/\d{4})/, '• אשרת $1 עד $2');
  put(0, rawStay, 298, 475, 166.0, { align: 'center', size: 7.0, noWrap: true });
  put(0, s.pf_prev_il_id || 'ללא', 298, 490, 153.5, { align: 'center', size: 7.2, noWrap: true });
  put(0, s.pf_prev_pass_num || 'ללא', 298, 478, 141.2, { align: 'center', size: 8.8, noWrap: true });
  put(0, s.pf_status_cancelled_reason || 'לא — מעולם לא בוטל מעמד בישראל', 298, 416, 129.0, { align: 'center', size: 7.0, noWrap: true });

  // Bottom Yes/No Checkboxes & Explanations (GREEN = YES / כן, RED = NO / לא)
  if (s._stressAllCheckboxes) {
    check(0, 250.2, 105.7, 7.1, 7.1, 'green'); // Q1 HE כן (YES = GREEN)
    check(0, 230.0, 105.7, 7.1, 7.1, 'red');   // Q1 HE לא (NO = RED)
    check(0, 41.0, 75.0, 7.1, 7.1, 'green');   // Q1 EN YES (YES = GREEN)
    check(0, 76.9, 75.0, 7.1, 7.1, 'red');     // Q1 EN NO (NO = RED)
    check(0, 237.4, 55.9, 7.1, 7.1, 'green');  // Q2 HE כן (YES = GREEN)
    check(0, 217.1, 55.9, 7.1, 7.1, 'red');    // Q2 HE לא (NO = RED)
    check(0, 470.3, 42.7, 7.1, 7.1, 'green');  // Q2 EN YES (YES = GREEN)
    check(0, 506.1, 42.7, 7.1, 7.1, 'red');    // Q2 EN NO (NO = RED)
  } else {
    check(0, 230.0, 105.7, 7.1, 7.1, 'red');
    check(0, 76.9, 75.0, 7.1, 7.1, 'red');
    check(0, 217.1, 55.9, 7.1, 7.1, 'red');
    check(0, 506.1, 42.7, 7.1, 7.1, 'red');
  }
  put(0, s.pf_prev_rejected_details || 'ללא — מעולם לא נדחתה בקשה', 38, 128, 106.5, { align: 'center', size: 6.8, noWrap: true });
  put(0, s.pf_prev_rejected_details_en || 'N/A — Never rejected', 218, 378, 80.2, { align: 'center', size: 8.2, noWrap: true });
  put(0, s.pf_parallel_req_details || 'ללא — אין בקשה במקביל', 38, 118, 56.8, { align: 'center', size: 6.8, noWrap: true });
  put(0, s.pf_parallel_req_details_en || 'N/A — No parallel request', 135, 290, 31.0, { align: 'center', size: 8.2, noWrap: true });

  // =========================================================================
  // Page 2 (index 1)
  // =========================================================================
  put(1, ash1CatHe, 158, 252, 768.0, { align: 'center', size: 9.8, bold: true, noWrap: true });
  put(1, ash1CatEn, 338, 442, 755.0, { align: 'center', size: 9.8, bold: true, noWrap: true });

  // Particulars of the Applicant — "In English" row:
  // Family name & Given name in English ONLY; Passport No. & Citizenship in Hebrew
  put(1, s.pf_surname_en, 388, 501, 658.5, { align: 'center', size: 7.4, yWrapCenter: 660.0, lineShift: 4.0, wrapSize: 7.2 });
  put(1, s.pf_given_en, 270, 383, 658.5, { align: 'center', size: 7.4, yWrapCenter: 660.0, lineShift: 4.0, wrapSize: 7.2 });
  put(1, s.pf_pass_num, 155, 264, 658.5, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(1, s.pf_citizenship, 34, 149, 658.5, { align: 'center', size: 7.6, yWrapCenter: 660.0, lineShift: 4.0, wrapSize: 7.4 });

  // Permanent address abroad — Marked "In English" on right:
  // Country, Town, Street & House No. in clean English ONLY, nicely centered vertically at y=589.5
  put(1, abr.country, 388, 503, 589.5, { align: 'center', size: 7.6, noWrap: true });
  put(1, abr.city, 266, 383, 589.5, { align: 'center', size: 7.6, noWrap: true });
  put(1, abr.street, 146, 261, 589.5, { align: 'center', size: 7.4, yWrapCenter: 591.0, lineShift: 4.0, wrapSize: 7.2 });
  put(1, s.pf_phone_abroad || s.pf_phone_il, 35, 140, 589.5, { align: 'center', noWrap: true });

  // Permanent address in Israel & Email — Hebrew for Israeli address, Latin for Email
  put(1, s.pf_email, 399, 558, 520.0, { align: 'left', size: 8.2, noWrap: true });
  put(1, il.city, 215, 388, 515.5, { align: 'center', bold: true, noWrap: true });
  put(1, il.street + (il.house ? ' ' + il.house : '') + (il.apt ? ' דירה ' + il.apt : ''), 38, 208, 515.5, { align: 'right', bold: true, noWrap: true });
  put(1, consulateHe, 268, 363, 494.7, { align: 'center', bold: true, noWrap: true });

  // Declarations Date & Place — 100% Hebrew
  put(1, today.todayFull, 345, 440, 327.5, { align: 'center', size: 9.4, noWrap: true });
  put(1, branchCity, 465, 560, 327.5, { align: 'right', noWrap: true });
  put(1, today.todayFull, 290, 385, 162.0, { align: 'center', size: 9.4, noWrap: true });
  put(1, branchCity, 412, 508, 162.0, { align: 'right', noWrap: true });

  return await ctx.pdfDoc.save();
}

module.exports = { stampAsh1: stampAsh1 };

  });

  __define('stamp_ash3.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampAsh3(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('ash3_extension_change_visa.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check, putComb = ctx.putComb;
  var dob = ctx.dob, fDob = ctx.fDob, mDob = ctx.mDob, pIss = ctx.pIss, pExp = ctx.pExp, today = ctx.today;
  var il = ctx.il, abr = ctx.abr, branchCity = ctx.branchCity;
  var mar = ctx.mar, isMarried = ctx.isMarried, isDiv = ctx.isDiv, isWid = ctx.isWid;
  var relHe = ctx.relHe, natHe = ctx.natHe;
  var spFullHe = ctx.spFullHe, spGivenHe = ctx.spGivenHe, spSurHe = ctx.spSurHe;
  var abrCityHe = ctx.abrCityHe, abrCountryHe = ctx.abrCountryHe;

  // =========================================================================
  // Page 1 (index 0)
  // =========================================================================

  // Top Header Section: Extension of Permit / Change of Visa Category
  var months = s.pf_ash3_months || '12';
  var targetVisaHe = s.pf_ash3_target_visa_he || 'א/2';
  var targetVisaEn = s.pf_ash3_target_visa_en || 'A/2';
  var actionStr = String(s.pf_ash3_action || '');
  var wantExtend = /הארכה|extend/i.test(actionStr) || Boolean(s.pf_ash3_months);
  var wantChange = /החלפה|change/i.test(actionStr) || Boolean(s.pf_ash3_target_visa_he || s.pf_ash3_target_visa_en);

  if (s._stressAllCheckboxes) {
    check(0, 552.5, 694.7, 8.9, 10.0, 'green'); // HE: בקשה להארכת תוקף רשיון ישיבה
    check(0, 125.9, 695.7, 8.9, 10.0, 'green'); // EN: Application to extend present permit
    check(0, 552.5, 671.4, 8.9, 10.0, 'green'); // HE: בקשה להחלפת סוג האשרה ל:
    check(0, 125.9, 672.5, 8.9, 10.0, 'green'); // EN: Application to change visa category to:
  } else {
    if (wantExtend) {
      check(0, 552.5, 694.7, 8.9, 10.0, 'green');
      check(0, 125.9, 695.7, 8.9, 10.0, 'green');
    }
    if (wantChange) {
      check(0, 552.5, 671.4, 8.9, 10.0, 'green');
      check(0, 125.9, 672.5, 8.9, 10.0, 'green');
    }
  }

  // Top Underlines: Months (HE & EN) + Target Visa Category (HE & EN)
  put(0, months,       456, 506, 688.0, { align: 'center', size: 9.4, bold: true, noWrap: true });
  put(0, months,       235, 298, 689.2, { align: 'center', size: 9.4, bold: true, noWrap: true });
  put(0, String(targetVisaHe).replace(/^([אב])\/([1-5])$/, '$2/$1'), 370, 448, 674.2, { align: 'center', size: 9.4, bold: true, noWrap: true });
  put(0, targetVisaEn, 291, 353, 675.2, { align: 'center', size: 9.4, bold: true, noWrap: true });

  // Table 1: Details of the Applicant — Row 1 (בעברית y=560.5 | In English y=543.5)
  // Cols: FamilyStatus (35..208.7), PrevNames (209.2..286.6), FirstName (287.1..385.9), LastName (386.4..505.3)
  put(0, s.pf_surname_he,                  388, 503, 560.5, { align: 'center', size: 7.6, yWrapCenter: 562.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_surname_en,                  388, 503, 543.5, { align: 'center', size: 7.4, yWrapCenter: 545.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_given_he,                    289, 384, 560.5, { align: 'center', size: 7.6, yWrapCenter: 562.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_given_en,                    289, 384, 543.5, { align: 'center', size: 7.4, yWrapCenter: 545.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_prior_names || 'ללא',        211, 285, 560.5, { align: 'center', size: 7.4, yWrapCenter: 562.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_prior_names_en || 'NONE',    211, 285, 543.5, { align: 'center', size: 7.2, yWrapCenter: 545.0, lineShift: 3.8, wrapSize: 7.0 });

  // Family Status Checkboxes (Wingdings 7.2 x 8.0 boxes)
  if (s._stressAllCheckboxes) {
    check(0, 196.6, 558.5, 7.2, 8.0, 'green'); // רווק/ה - Single
    check(0, 114.4, 558.5, 7.2, 8.0, 'green'); // נשוי/אה - Married
    check(0, 196.6, 543.2, 7.2, 8.0, 'green'); // גרוש/ה - Divorced
    check(0, 114.4, 543.2, 7.2, 8.0, 'green'); // אלמן/ה - Widowed
  } else {
    if (isMarried)  check(0, 114.4, 558.5, 7.2, 8.0, 'green');
    else if (isWid) check(0, 114.4, 543.2, 7.2, 8.0, 'green');
    else if (isDiv) check(0, 196.6, 543.2, 7.2, 8.0, 'green');
    else if (mar)   check(0, 196.6, 558.5, 7.2, 8.0, 'green');
  }

  // Table 2: Country of Birth, DOB, Nationality, Religion, Citizenship (בעברית y=499.8 | In English y=482.8)
  // Cols: Citizenship (34.3..132.6), Religion (133.1..202.2), Nationality (202.7..289.1), DOB (289.6..388.4), CountryOfBirth (388.9..508.9)
  put(0, String(s.pf_birth_country || '').replace(/,/g, ' -'), 391, 507, 499.8, { align: 'center', size: 7.6, yWrapCenter: 501.3, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_birth_country_en || abr.country, 391, 507, 482.8, { align: 'center', size: 7.4, yWrapCenter: 484.3, lineShift: 3.8, wrapSize: 7.2 });
  put(0, dob.heb || dob.full,              292, 386, 499.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, dob.full,                         292, 386, 482.8, { align: 'center', size: 9.0, noWrap: true });
  put(0, natHe,                            205, 287, 499.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_nationality_en || 'JEWISH',  205, 287, 482.8, { align: 'center', size: 7.6, noWrap: true });
  put(0, relHe,                            135, 200, 499.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_religion_en || 'JEWISH',     135, 200, 482.8, { align: 'center', size: 7.6, noWrap: true });
  put(0, s.pf_citizenship,                 36,  131, 499.8, { align: 'center', size: 7.6, yWrapCenter: 501.3, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_citizenship_en || 'FRENCH',  36,  131, 482.8, { align: 'center', size: 7.4, yWrapCenter: 484.3, lineShift: 3.8, wrapSize: 7.2 });

  // Table 3: Parents' Names & DOBs (בעברית y=439.2 | In English y=422.2)
  // Cols: MotherMaiden (34.9..137.8), MotherDOB (138.3..237.0), MotherName (237.5..336.3), FatherDOB (336.8..428.5), FatherName (429.0..509.4)
  put(0, s.pf_father_he,                   431, 507, 439.2, { align: 'center', size: 7.4, yWrapCenter: 440.7, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_father_en,                   431, 507, 422.2, { align: 'center', size: 7.2, yWrapCenter: 423.7, lineShift: 3.8, wrapSize: 7.0 });
  put(0, fDob.heb || fDob.full,            339, 426, 439.2, { align: 'center', size: 7.8, noWrap: true });
  put(0, fDob.full,                        339, 426, 422.2, { align: 'center', size: 8.8, noWrap: true });
  put(0, s.pf_mother_he,                   239, 334, 439.2, { align: 'center', size: 7.4, yWrapCenter: 440.7, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_mother_en,                   239, 334, 422.2, { align: 'center', size: 7.2, yWrapCenter: 423.7, lineShift: 3.8, wrapSize: 7.0 });
  put(0, mDob.heb || mDob.full,            140, 235, 439.2, { align: 'center', size: 7.8, noWrap: true });
  put(0, mDob.full,                        140, 235, 422.2, { align: 'center', size: 8.8, noWrap: true });
  put(0, s.pf_mother_maiden || 'ללא',      37,  136, 439.2, { align: 'center', size: 7.4, yWrapCenter: 440.7, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_mother_maiden_en || 'NONE',  37,  136, 422.2, { align: 'center', size: 7.2, yWrapCenter: 423.7, lineShift: 3.8, wrapSize: 7.0 });

  // Table 4: E-mail & Passport / Laissez-Passer
  // Checkboxes: Passport (353.5, 394.5) | Laissez-Passer (260.7, 394.5)
  if (s._stressAllCheckboxes) {
    check(0, 353.5, 394.5, 7.2, 8.0, 'green'); // דרכון Passport
    check(0, 260.7, 394.5, 7.2, 8.0, 'red');   // תעודת מעבר Laissez-Passer
  } else {
    if (s.pf_laissez_passer) check(0, 260.7, 394.5, 7.2, 8.0, 'red');
    else if (s.pf_pass_num)  check(0, 353.5, 394.5, 7.2, 8.0, 'green');
  }
  put(0, s.pf_email,    395, 559, 368.0, { align: 'center', size: 8.2, noWrap: true });
  put(0, s.pf_pass_num, 275, 390, 359.8, { align: 'center', size: 9.0, bold: true, noWrap: true });
  put(0, pIss.full,     156, 271, 359.8, { align: 'center', size: 9.2, noWrap: true });
  put(0, pExp.full,     37,  152, 359.8, { align: 'center', size: 9.2, noWrap: true });

  // Table 5: Permanent Address Abroad (בעברית y=304.8 | In English y=284.5 | Phone spans 277.4..318.1)
  // Cols: Phone (33.5..143.7), Street (144.1..264.2), Town (264.7..386.2), Country (386.7..506.7)
  var abrHe = core. parseAbroadAddr ? null : null;
  var abrPartsHe = String(s.pf_abroad_addr_he || '').split(',').map(function(x){ return x.trim(); }).filter(Boolean);
  var abrStreetHe = abrPartsHe[0] || abr.street;
  var abrTownHe   = abrPartsHe[1] || abrCityHe || abr.city;
  var abrCtryHe   = abrPartsHe[2] || abrCountryHe || abr.country;

  put(0, abrCtryHe,                        389, 505, 304.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, abr.country,                      389, 505, 284.5, { align: 'center', size: 8.0, noWrap: true });
  put(0, abrTownHe,                        267, 384, 304.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, abr.city,                         267, 384, 284.5, { align: 'center', size: 8.0, noWrap: true });
  put(0, abrStreetHe,                      146, 262, 304.8, { align: 'center', size: 7.4, yWrapCenter: 306.3, lineShift: 3.8, wrapSize: 7.2 });
  put(0, abr.street,                       146, 262, 284.5, { align: 'center', size: 7.4, yWrapCenter: 286.0, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_phone_abroad || s.pf_phone_il, 36, 141, 295.0, { align: 'center', size: 8.4, noWrap: true });

  // Table 6: Address in Israel (בעברית y=236.0 | In English y=215.8 | Phone spans 208.7..249.4)
  // Cols: Phone (33.5..143.7), Street (144.1..386.2), Town (386.7..506.7)
  put(0, il.city,                          389, 505, 236.0, { align: 'center', size: 8.4, noWrap: true });
  put(0, s.pf_il_city_en || 'HAIFA',       389, 505, 215.8, { align: 'center', size: 8.2, noWrap: true });
  put(0, String(il.streetWithNum || '').replace(/,/g, ''), 146, 384, 236.0, { align: 'center', size: 8.2, noWrap: true });
  put(0, s.pf_il_street_en || '42 HERZL ST, APT 9', 146, 384, 215.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_phone_il,                    36,  141, 226.0, { align: 'center', size: 8.8, noWrap: true });

  // Table 7: Institution Where Applicant is Studying (בעברית y=144.2 | In English y=127.2)
  // Cols: ContactPhone (36.8..130.7), ContactName (131.2..215.8), AmutaNo (216.3..308.0), Address (308.5..435.6), Name (436.0..506.5)
  var instParts = String(s.pf_inst_details || '').split(/[•|]/).map(function(x){ return x.trim(); });
  var instNameHe    = instParts[0] || '';
  var instAmuta     = instParts[1] || '';
  var instContactHe = instParts[2] || '';
  var instPhone     = instParts[3] || s.pf_phone_il || '';
  var instAddrHe    = (s.pf_inst_addr_he || (il.streetWithNum ? (il.streetWithNum + ' ' + il.city) : '' )).replace(/,/g, '');

  put(0, instNameHe,                                438, 505, 144.2, { align: 'center', size: 7.4, yWrapCenter: 145.7, lineShift: 3.6, wrapSize: 7.0 });
  put(0, s.pf_inst_name_en || 'CONVERSION INST.',   438, 505, 127.2, { align: 'center', size: 7.2, yWrapCenter: 128.7, lineShift: 3.6, wrapSize: 6.8 });
  put(0, instAddrHe,                                310, 434, 144.2, { align: 'center', size: 7.4, yWrapCenter: 145.7, lineShift: 3.6, wrapSize: 7.0 });
  put(0, s.pf_inst_addr_en || '42 HERZL ST, HAIFA', 310, 434, 127.2, { align: 'center', size: 7.2, yWrapCenter: 128.7, lineShift: 3.6, wrapSize: 6.8 });
  put(0, instAmuta,                                 218, 306, 144.2, { align: 'center', size: 8.4, noWrap: true });
  put(0, instAmuta,                                 218, 306, 127.2, { align: 'center', size: 8.4, noWrap: true });
  put(0, instContactHe,                             133, 214, 144.2, { align: 'center', size: 7.4, yWrapCenter: 145.7, lineShift: 3.6, wrapSize: 7.0 });
  put(0, s.pf_inst_contact_en || 'RABBI DAVID LEVY',133, 214, 127.2, { align: 'center', size: 7.2, yWrapCenter: 128.7, lineShift: 3.6, wrapSize: 6.8 });
  put(0, instPhone,                                 39,  129, 144.2, { align: 'center', size: 8.4, noWrap: true });
  put(0, instPhone,                                 39,  129, 127.2, { align: 'center', size: 8.4, noWrap: true });

  // =========================================================================
  // Page 2 (index 1)
  // =========================================================================

  // Table 1: Details of the Applicant (Header Repeat, y=664.2)
  // Cols: PassportNo (43.0..166.5), FirstNameEn (166.9..258.6), FirstNameHe (259.1..350.8), LastNameEn (351.3..443.0), LastNameHe (443.5..557.1)
  put(1, s.pf_surname_he, 445, 555, 664.2, { align: 'center', size: 7.6, yWrapCenter: 665.7, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_surname_en, 353, 441, 664.2, { align: 'center', size: 7.4, yWrapCenter: 665.7, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_given_he,   261, 349, 664.2, { align: 'center', size: 7.6, yWrapCenter: 665.7, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_given_en,   169, 257, 664.2, { align: 'center', size: 7.4, yWrapCenter: 665.7, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_pass_num,   45,  164, 664.2, { align: 'center', size: 9.0, bold: true, noWrap: true });

  // Table 2: Details of Spouse (y=581.3..609.7)
  // Cols: Citizenship (45.4..107.2), ID Comb (107.7..222.4), Status (222.9..344.4), InIsrael (344.8..409.5), FirstName (410.0..491.7), LastName (492.2..573.9)
  put(1, spSurHe,                          494, 572, 593.0, { align: 'center', size: 7.6, yWrapCenter: 594.5, lineShift: 3.8, wrapSize: 7.2 });
  put(1, spGivenHe,                        412, 490, 593.0, { align: 'center', size: 7.6, yWrapCenter: 594.5, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_sp_citizenship_he || 'ישראלית', 47, 105, 593.0, { align: 'center', size: 8.0, noWrap: true });

  // Spouse Checkboxes: In Israel (Yes / No) + Status (Visitor / Temporary / Permanent)
  if (s._stressAllCheckboxes) {
    check(1, 389.8, 595.7, 8.9, 10.0, 'green'); // נמצא/ת בישראל: כן - Yes
    check(1, 389.8, 584.5, 8.9, 10.0, 'red');   // נמצא/ת בישראל: לא - No (RED)
    check(1, 330.4, 599.7, 8.9, 10.0, 'green'); // מבקר - Visitor
    check(1, 330.4, 590.7, 8.9, 10.0, 'green'); // ארעי - Temporary Resident
    check(1, 330.4, 581.7, 8.9, 10.0, 'green'); // קבע - Permanent Resident
  } else if (spFullHe || s.pf_sp_tz) {
    var spNotInIl = s.pf_sp_in_israel === false || /לא|no/i.test(String(s.pf_sp_in_israel || ''));
    if (spNotInIl) {
      check(1, 389.8, 584.5, 8.9, 10.0, 'red');
    } else {
      check(1, 389.8, 595.7, 8.9, 10.0, 'green');
    }
    var spSt = String(s.pf_sp_status || 'קבע').toLowerCase();
    if (/מבקר|visitor/.test(spSt))        check(1, 330.4, 599.7, 8.9, 10.0, 'green');
    else if (/ארעי|temp/.test(spSt))      check(1, 330.4, 590.7, 8.9, 10.0, 'green');
    else                                  check(1, 330.4, 581.7, 8.9, 10.0, 'green');
  }

  // Spouse 9-Digit Identity / Passport Comb (9 cells from x=107.66 to 222.41, step=12.75pt, y=585.2)
  if (s.pf_sp_tz) {
    putComb(1, s.pf_sp_tz, 107.66, 12.75, 585.2, 9, true);
  }

  // Table 3: Children Under the Age of 18 (3 rows: y = 505.3, 491.1, 476.9)
  // Cols: DobEn (45.5..130.1), DobHe (130.6..215.2), CountryEn (215.7..300.3), CountryHe (300.8..385.3), NameEn (385.8..470.4), NameHe (470.9..555.5)
  var kids = Array.isArray(s.pf_children_rows) ? s.pf_children_rows : [];
  var kidY = [505.3, 491.1, 476.9];
  for (var ki = 0; ki < 3; ki++) {
    var k = kids[ki];
    if (!k) continue;
    var ky = kidY[ki];
    var kDob = core.splitIsoDate(k.dob);
    put(1, k.given_he || k.given,          472, 554, ky, { align: 'center', size: 7.4, noWrap: true });
    put(1, k.given,                        387, 469, ky, { align: 'center', size: 7.0, noWrap: true });
    put(1, String(k.country || '').replace(/,/g, ' -'), 302, 384, ky, { align: 'center', size: 7.4, noWrap: true });
    put(1, k.country_en || 'FRANCE',       217, 299, ky, { align: 'center', size: 7.2, noWrap: true });
    put(1, kDob.heb || kDob.full || k.dob, 132, 214, ky, { align: 'center', size: 7.4, noWrap: true });
    put(1, kDob.full || k.dob,             47,  129, ky, { align: 'center', size: 8.4, noWrap: true });
  }

  // Declaration Date & Place (Line Y=259.5: Place 406.4..562.3 | Date 222.1..378.0 | Signature 37.7..193.7)
  put(1, branchCity,      409, 559, 263.5, { align: 'center', size: 9.0, noWrap: true });
  put(1, today.todayFull, 225, 375, 263.5, { align: 'center', size: 9.4, noWrap: true });

  return await ctx.pdfDoc.save();
}

module.exports = { stampAsh3: stampAsh3 };

// Allow direct CLI execution for instant proof & ruler generation
  });

  __define('stamp_ash456.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

var VECTOR_BOXES = {"0": [[178.4, 576.6, 7.1, 7.1], [343.8, 576.6, 7.1, 7.1], [94.8, 504.9, 7.1, 7.1], [190.6, 504.9, 7.1, 7.1], [354.4, 504.9, 7.1, 7.1], [479.7, 504.9, 7.1, 7.1], [516.9, 504.9, 7.1, 7.1], [554.4, 504.9, 7.1, 7.1], [92.9, 492.6, 7.1, 7.1], [190.6, 492.6, 7.1, 7.1], [354.4, 492.6, 7.1, 7.1], [479.2, 492.6, 7.1, 7.1], [516.9, 492.6, 7.1, 7.1], [554.4, 492.6, 7.1, 7.1], [190.6, 480.4, 7.1, 7.1], [354.4, 480.4, 7.1, 7.1], [554.4, 480.4, 7.1, 7.1], [102.8, 323.9, 7.1, 7.1], [160.9, 323.9, 7.1, 7.1], [214.4, 323.9, 7.1, 7.1], [212.7, 313.5, 7.1, 7.1], [174.6, 206.4, 7.1, 7.1], [216.3, 206.4, 7.1, 7.1], [173.8, 197.3, 7.1, 7.1], [216.3, 197.3, 7.1, 7.1], [482.4, 197.3, 7.1, 7.1], [551.8, 197.3, 7.1, 7.1], [360.1, 190.4, 7.1, 7.1], [216.3, 188.0, 7.1, 7.1], [290.0, 188.0, 7.1, 7.1], [482.4, 188.0, 7.1, 7.1], [551.8, 188.0, 7.1, 7.1], [360.1, 181.2, 7.1, 7.1], [63.1, 178.8, 7.1, 7.1], [114.1, 178.8, 7.1, 7.1], [290.0, 178.8, 7.1, 7.1], [391.9, 166.6, 7.1, 7.1], [418.3, 166.6, 7.1, 7.1], [385.5, 121.0, 7.1, 7.1], [313.5, 121.0, 7.1, 7.1], [385.5, 110.5, 7.1, 7.1]], "1": [[162.6, 672.0, 7.1, 7.1], [341.9, 672.0, 7.1, 7.1], [117.7, 650.4, 7.1, 7.1], [162.6, 650.4, 7.1, 7.1], [205.8, 650.4, 7.1, 7.1], [306.6, 650.4, 7.1, 7.1], [342.6, 650.4, 7.1, 7.1], [306.6, 627.5, 7.1, 7.1], [342.6, 627.5, 7.1, 7.1], [306.6, 607.4, 7.1, 7.1], [342.6, 607.4, 7.1, 7.1], [306.6, 587.7, 7.1, 7.1], [342.6, 587.7, 7.1, 7.1], [540.0, 537.0, 7.1, 7.1], [540.0, 520.5, 7.1, 7.1], [540.0, 504.1, 7.1, 7.1], [376.5, 487.6, 7.1, 7.1], [411.5, 487.6, 7.1, 7.1], [540.0, 487.6, 7.1, 7.1], [296.5, 430.4, 7.1, 7.1], [320.8, 430.4, 7.1, 7.1], [351.5, 430.4, 7.1, 7.1], [72.7, 414.1, 7.1, 7.1], [237.0, 414.1, 7.1, 7.1], [351.0, 414.1, 7.1, 7.1], [322.7, 395.6, 7.1, 7.1], [350.5, 394.7, 7.1, 7.1], [322.7, 379.3, 7.1, 7.1], [351.5, 379.3, 7.1, 7.1], [327.0, 304.9, 7.1, 7.1], [360.1, 304.9, 7.1, 7.1], [305.2, 272.2, 7.1, 7.1], [329.4, 272.2, 7.1, 7.1], [360.1, 272.2, 7.1, 7.1], [132.8, 245.3, 7.1, 7.1], [325.6, 245.3, 7.1, 7.1], [360.4, 245.3, 7.1, 7.1], [328.2, 223.7, 7.1, 7.1], [360.9, 223.7, 7.1, 7.1], [303.5, 201.9, 7.1, 7.1], [327.7, 201.9, 7.1, 7.1], [360.9, 201.9, 7.1, 7.1], [305.9, 180.3, 7.1, 7.1], [330.1, 180.3, 7.1, 7.1], [361.8, 180.3, 7.1, 7.1], [332.3, 153.4, 7.1, 7.1], [361.1, 153.4, 7.1, 7.1], [332.3, 123.1, 7.1, 7.1], [361.8, 123.1, 7.1, 7.1], [259.0, 735.2, 7.1, 7.1], [259.0, 724.2, 7.1, 7.1], [163.5, 735.2, 7.1, 7.1]], "2": [[529.5, 646.2, 7.1, 7.1], [530.3, 625.9, 7.1, 7.1], [165.4, 604.5, 7.1, 7.1], [356.8, 604.5, 7.1, 7.1], [491.7, 604.5, 7.1, 7.1], [165.4, 590.6, 7.1, 7.1], [356.8, 590.6, 7.1, 7.1], [491.7, 590.6, 7.1, 7.1], [542.4, 374.5, 7.1, 7.1], [542.9, 346.4, 7.1, 7.1], [542.6, 329.4, 7.1, 7.1], [542.9, 301.5, 7.1, 7.1], [542.9, 284.7, 7.1, 7.1], [542.9, 267.7, 7.1, 7.1], [318.6, 250.9, 7.1, 7.1], [542.9, 250.9, 7.1, 7.1], [542.9, 233.8, 7.1, 7.1], [542.9, 217.0, 7.1, 7.1], [193.2, 560.5, 7.1, 7.1], [92.0, 560.5, 7.1, 7.1], [259.0, 733.2, 7.1, 7.1], [259.0, 722.2, 7.1, 7.1], [163.5, 733.2, 7.1, 7.1]]};

function drawClassifiedBoxes(pageIdx, check, fallbackList, sObj) {
  if (sObj && !sObj._stressAllCheckboxes) {
    var mar = String(sObj.pf_marital || '');
    var isMar = /נשוי|Married/i.test(mar), isDiv = /גרוש|Divorced/i.test(mar), isWid = /אלמן|Widowed/i.test(mar), isYad = /ידוע|Common/i.test(mar);
    var hasKids = Array.isArray(sObj.pf_children_rows) && sObj.pf_children_rows.length > 0 && String(sObj.pf_children_table || '') !== 'ללא';
    var hasSpouse = Boolean(sObj.pf_sp_name_he || sObj.pf_sp_tz);
    if (pageIdx === 0) {
      check(0, 343.8, 576.6, 7.1, 7.1, 'blue'); // Passport
      if (isMar) check(0, 516.9, 504.9, 7.1, 7.1, 'blue');
      else if (isDiv) check(0, 554.4, 492.6, 7.1, 7.1, 'blue');
      else if (isWid) check(0, 516.9, 492.6, 7.1, 7.1, 'blue');
      else if (isYad) check(0, 479.2, 492.6, 7.1, 7.1, 'blue');
      else check(0, 554.4, 504.9, 7.1, 7.1, 'blue'); // Single
      if (hasSpouse) check(0, 354.4, 504.9, 7.1, 7.1, 'blue');
      if (hasKids) check(0, 354.4, 492.6, 7.1, 7.1, 'blue');
      check(0, 190.6, 504.9, 7.1, 7.1, 'blue'); // Aliyah for permanent residence
      check(0, 214.4, 323.9, 7.1, 7.1, 'blue'); // Mail recipient
      check(0, 551.8, hasKids ? 197.3 : 188.0, 7.1, 7.1, hasKids ? 'blue' : 'red');
      check(0, 482.4, hasKids ? 197.3 : 188.0, 7.1, 7.1, hasKids ? 'blue' : 'red');
      check(0, 360.1, hasSpouse ? 190.4 : 181.2, 7.1, 7.1, hasSpouse ? 'blue' : 'red');
      check(0, 290.0, hasSpouse ? 188.0 : 178.8, 7.1, 7.1, hasSpouse ? 'blue' : 'red');
      if (hasSpouse) {
        check(0, 216.3, 206.4, 7.1, 7.1, 'blue'); // Israeli citizen spouse
        check(0, 385.5, 121.0, 7.1, 7.1, 'blue'); // Spouse Israeli TZ
      }
    } else if (pageIdx === 1) {
      check(1, 259.0, 735.2, 7.1, 7.1, 'blue'); // Passport top bar
      check(1, 341.9, 672.0, 7.1, 7.1, 'blue');
      check(1, 540.0, 537.0, 7.1, 7.1, 'blue'); // Previous stay in Israel
    } else if (pageIdx === 2) {
      check(2, 259.0, 733.2, 7.1, 7.1, 'blue'); // Passport top bar
      var is4A = /4א|4A/i.test(String(sObj.pf_456_shvut || ''));
      check(2, is4A ? 530.3 : 529.5, is4A ? 625.9 : 646.2, 7.1, 7.1, 'blue');
      [374.5, 346.4, 329.4, 301.5, 284.7, 267.7, 250.9, 233.8, 217.0].forEach(function(cy) {
        check(2, 542.9, cy, 7.1, 7.1, 'blue');
      });
    }
    return;
  }

  var boxes = VECTOR_BOXES[pageIdx] || [];
  var bluePts = {
    0: [[343.8, 576.7], [250.8, 576.7], [551.8, 504.9], [516.9, 504.9], [480.5, 504.9], [444.0, 504.9], [190.6, 504.9], [551.8, 188.0], [290.0, 188.0], [385.5, 121.0], [313.5, 121.0], [385.5, 110.5]],
    1: [[259.5, 737.0], [259.5, 726.0], [154.2, 737.0], [341.9, 672.0], [205.8, 650.4], [306.6, 627.5], [540.0, 537.0], [296.5, 430.4], [351.0, 414.1], [322.7, 395.6], [322.7, 379.3], [327.0, 304.9], [305.2, 272.2], [132.8, 245.4], [327.7, 201.9], [330.1, 180.3], [332.3, 123.1]],
    2: [[259.5, 735.0], [259.5, 724.0], [154.2, 735.0], [529.5, 646.2], [542.8, 374.5], [542.8, 346.4], [542.8, 329.4], [542.8, 301.5], [542.8, 284.7], [542.8, 267.7], [542.8, 250.9], [355.0, 250.9], [376.0, 250.9], [542.8, 233.8], [542.8, 217.0]]
  }[pageIdx] || [];

  var sec1a = boxes.filter(function(b) { return pageIdx === 0 && b[1] >= 145 && b[1] <= 205; });

  function isRedNoBox(p, x, y) {
    if (p === 0 && y >= 145 && y <= 205) {
      if (x >= 135 && x <= 230) return false;
      if (x >= 370 && x <= 434) {
        var col3 = sec1a.filter(function(b) { return b[0] >= 370 && b[0] <= 434; });
        var minX3 = Math.min.apply(null, col3.map(function(b) { return b[0]; }));
        return Math.abs(x - minX3) < 4.0;
      }
      if (x < 135) {
        var col7 = sec1a.filter(function(b) { return b[0] < 135; });
        var minX7 = Math.min.apply(null, col7.map(function(b) { return b[0]; }));
        return Math.abs(x - minX7) < 4.0;
      }
      var sameCol = sec1a.filter(function(b) { return Math.abs(b[0] - x) < 12.0; });
      if (sameCol.length >= 2) {
        var minY = Math.min.apply(null, sameCol.map(function(b) { return b[1]; }));
        return Math.abs(y - minY) < 4.0;
      }
    }
    if (p === 1) {
      if (y > 580 && y < 635 && x > 335) return true;
      if (y > 480 && y < 495 && x > 365 && x < 395) return true;
      if (y > 425 && y < 436 && x > 345) return true;
      if (y > 372 && y < 402 && x > 345) return true;
      if (y > 115 && y < 315 && x > 345) return true;
    }
    return false;
  }

  boxes.forEach(function(b) {
    var bx = Number(b[0]), by = Number(b[1]), bw = Number(b[2]), bh = Number(b[3]);
    if (!Number.isFinite(bx) || !Number.isFinite(by)) return;
    var color = 'blue';
    if (isRedNoBox(pageIdx, bx, by)) {
      color = 'red';
    } else if (bluePts.some(function(pt) { return Math.hypot(pt[0] - bx, pt[1] - by) < 5.5; })) {
      color = 'blue';
    }
    check(pageIdx, bx, by, bw, bh, color);
  });
}

async function stampAsh456(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('ash456_in_israel_oleh.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check, putComb = ctx.putComb;
  var dob = ctx.dob, pIss = ctx.pIss, pExp = ctx.pExp, today = ctx.today;
  var il = ctx.il, branchCity = ctx.branchCity;
  var relHe = ctx.relHe, natHe = ctx.natHe;
  var spFullHe = ctx.spFullHe, spGivenHe = ctx.spGivenHe, spSurHe = ctx.spSurHe;
  var spDobFull = ctx.spDobFull, abrCityHe = ctx.abrCityHe, abrCountryHe = ctx.abrCountryHe;

  // =========================================================================
  // PAGE 1 (index 0): 1. פרטי המבקש
  // =========================================================================
  // Row 1: Surname, Given Name, Father, Mother, Country of Birth, DOB
  put(0, s.pf_surname_he, 480, 556, 609.5, { align: 'right', bold: true, size: 7.6, yWrapCenter: 611.0, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_given_he, 392, 476, 609.5, { align: 'right', bold: true, size: 7.6, yWrapCenter: 611.0, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_father_he, 312, 387, 604.5, { align: 'right', size: 7.4, minSize: 7.0, yWrapCenter: 606.0, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_mother_he, 224, 306, 604.5, { align: 'right', size: 7.4, minSize: 7.0, yWrapCenter: 606.0, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_birth_country, 128, 217, 604.5, { align: 'center', size: 7.8, noWrap: true });
  put(0, dob.full, 38, 122, 604.5, { align: 'center', size: 8.8, noWrap: true });

  // Row 2: Citizenship, Religion, Comb, Issue & Expiry Dates
  put(0, s.pf_citizenship, 476, 556, 544.5, { align: 'center', size: 8.0, noWrap: true });
  put(0, relHe, 396, 471, 544.5, { align: 'center', size: 8.0, noWrap: true });
  putComb(0, s.pf_pass_num, 258.4, 13.68, 544.5, 10, false);
  put(0, pIss.full, 138, 206, 544.5, { align: 'center', size: 8.4, noWrap: true });
  put(0, pExp.full, 38, 132, 544.5, { align: 'center', size: 8.4, noWrap: true });

  // Row 3 "אחר נא לפרט" explanations right-aligned on their exact underlines (y=481.0)
  put(0, s.pf_marital_other_he || 'נישואין אזרחיים', 400, 474, 481.0, { align: 'right', size: 8.0, bold: true, yWrapCenter: 482.5, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_family_accompanying_other_he || 'ללא נוספים', 212, 286, 481.0, { align: 'right', size: 8.0, bold: true, yWrapCenter: 482.5, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_arrival_purpose_other_he || 'איחוד משפחות', 38, 112, 481.0, { align: 'right', size: 8.0, bold: true, yWrapCenter: 482.5, lineShift: 3.6, wrapSize: 7.2 });

  // Row 4: המען בחו"ל & Email (multi-line wrapping enabled)
  var abrHeParts = String(s.pf_abroad_addr_he || '').split(',').map(function(x){ return x.trim(); }).filter(Boolean);
  var abrStreetHe = abrHeParts.length >= 3 ? abrHeParts.slice(0, -2).join(', ') : (abrHeParts[0] || 'רחוב דה לה רפובליק 25');
  var abrTownHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 2] : (abrHeParts[1] || abrCityHe || 'ליון');
  var abrLandHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 1] : (abrCountryHe || 'צרפת');

  put(0, abrLandHe, 464, 555, 426.5, { align: 'center', size: 8.4, bold: true, yWrapCenter: 428.0, lineShift: 3.8, wrapSize: 7.4 });
  put(0, abrTownHe, 368, 458, 426.5, { align: 'center', size: 8.4, bold: true, yWrapCenter: 428.0, lineShift: 3.8, wrapSize: 7.4 });
  put(0, abrStreetHe, 212, 354, 426.5, { align: 'center', size: 8.0, bold: true, yWrapCenter: 428.0, lineShift: 3.8, wrapSize: 7.4 });
  put(0, s.pf_email, 38, 206, 426.5, { align: 'center', size: 8.0, bold: true, noWrap: true });

  // Row 5: המען הצפוי בישראל & Phone
  put(0, il.city, 438, 555, 378.0, { align: 'center', bold: true, size: 8.6, yWrapCenter: 379.5, lineShift: 3.8, wrapSize: 7.6 });
  put(0, il.streetWithNum, 216, 432, 378.0, { align: 'center', bold: true, size: 8.4, yWrapCenter: 379.5, lineShift: 3.8, wrapSize: 7.6 });
  put(0, s.pf_phone_il, 38, 206, 378.0, { align: 'center', size: 8.6, bold: true, noWrap: true });

  // Row 5B: מען למשלוח מכתבים בישראל (strict cell bounds + multi-line wrapping)
  put(0, s.pf_mail_city_he || il.city, 456, 555, 318.5, { align: 'center', size: 8.4, bold: true, yWrapCenter: 320.5, lineShift: 3.8, wrapSize: 7.6 });
  put(0, s.pf_mail_street_he || il.streetWithNum, 354, 450, 318.5, { align: 'center', size: 8.0, bold: true, yWrapCenter: 320.5, lineShift: 3.8, wrapSize: 7.4 });
  put(0, s.pf_mail_recipient_he || spFullHe, 254, 348, 318.5, { align: 'center', size: 8.0, bold: true, yWrapCenter: 320.5, lineShift: 3.8, wrapSize: 7.2 });
  put(0, s.pf_mail_proxy_he || 'עו״ד דוד כהן, חיפה', 42, 162, 316.5, { align: 'right', size: 7.8, bold: true, yWrapCenter: 318.0, lineShift: 3.6, wrapSize: 7.0 });

  // Row 6: הכניסה לישראל | אשרת כניסה לישראל שהונפקה בחו"ל או בגבול
  var entP = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
  var entDate = entP[0] || '01/09/2026';
  var entPort = entP[1] || 'נתב״ג';
  var entVisa = 'ב/2';
  var entExp = (entP[3] || '01/12/2026').replace(/^עד\s*/, '');
  var visaNum = s.pf_visa_num || '2026-98412';

  put(0, entDate, 498, 556, 253.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, entPort, 435, 495, 253.0, { align: 'center', size: 8.2, bold: true, yWrapCenter: 254.5, lineShift: 3.6, wrapSize: 7.4 });
  put(0, entDate, 348, 430, 253.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, entPort, 265, 344, 253.0, { align: 'center', size: 8.2, bold: true, yWrapCenter: 254.5, lineShift: 3.6, wrapSize: 7.4 });
  put(0, entVisa, 198, 260, 253.0, { align: 'center', size: 8.6, bold: true, yWrapCenter: 254.5, lineShift: 3.6, wrapSize: 7.4 });
  put(0, visaNum, 135, 194, 253.0, { align: 'center', size: 7.8, bold: true, noWrap: true });
  put(0, entExp,  38,  130, 253.0, { align: 'center', size: 8.0, bold: true, noWrap: true });

  // Row 7: 1.א ילדים עד גיל 18 & בן/בת זוג (Images 3 & 4)
  var kidsCount = String((Array.isArray(s.pf_children_rows) && s.pf_children_rows.length) || 3);
  put(0, kidsCount, 496, 512, 180.0, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, kidsCount, 433, 449, 180.0, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, s.pf_sp_foreign_cit_details_he || 'צרפתית מלידה', 38, 86, 168.0, { align: 'center', size: 7.2, bold: true, yWrapCenter: 169.5, lineShift: 3.4, wrapSize: 6.4 });

  // Section 1.ב: פרטי בן הזוג
  put(0, spSurHe || s.pf_sp_surname_en, 484, 556, 82.5, { align: 'center', bold: true, size: 8.2, yWrapCenter: 84.0, lineShift: 3.8, wrapSize: 7.4 });
  put(0, spGivenHe || s.pf_sp_given_en, 398, 479, 82.5, { align: 'center', bold: true, size: 8.2, yWrapCenter: 84.0, lineShift: 3.8, wrapSize: 7.4 });
  putComb(0, s.pf_sp_tz || '012345674', 269.2, 14.35, 82.5, 9, true);
  put(0, s.pf_sp_pass_exp || '14/07/2031', 182, 260, 82.5, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, s.pf_sp_citizenship_he || 'ישראלית', 110, 178, 82.5, { align: 'center', bold: true, size: 8.2, yWrapCenter: 84.0, lineShift: 3.6, wrapSize: 7.4 });
  put(0, spDobFull || '15/07/1991', 38, 105, 82.5, { align: 'center', size: 8.0, bold: true, noWrap: true });

  // Page 1 Bottom Date & Place
  put(0, branchCity, 452, 536, 53.5, { align: 'center', bold: true, size: 8.4, yWrapCenter: 55.0, lineShift: 3.6, wrapSize: 7.6 });
  put(0, today.todayFull, 282, 370, 53.5, { align: 'center', bold: true, size: 8.6, noWrap: true });

  // Stamp all Page 1 Checkboxes at their exact vector coordinates
  drawClassifiedBoxes(0, check, [], s);

  // =========================================================================
  // PAGE 2 (index 1): Header Summary Bar + Sections 2, 3, 4
  // =========================================================================
  // Top Summary Bar: Surname (418..495) | Given Name (328..412) | 9-digit TZ Comb (197.2, step 14.0) | Passport No (40..158)
  put(1, s.pf_surname_en || s.pf_surname_he, 396, 506, 715.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 717.0, lineShift: 4.2, wrapSize: 7.6 });
  put(1, s.pf_given_en || s.pf_given_he, 278, 384, 715.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 717.0, lineShift: 4.2, wrapSize: 7.6 });
  putComb(1, s.pf_pass_num, 87.25, 17.5, 708.0, 10, false);

  // Expected Aliyah Date & Foreign Citizenships
  put(1, today.todayFull, 195, 290, 672.0, { align: 'center', size: 8.2, noWrap: true });
  put(1, s.pf_citizenship, 185, 268, 627.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, dob.full, 62, 142, 627.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, 'שווייצרית', 185, 268, 607.4, { align: 'center', size: 8.0, noWrap: true });
  put(1, '01/01/2020', 62, 142, 607.4, { align: 'center', size: 8.0, noWrap: true });
  put(1, 'בקשה קודמת לאשרת לימודים א/2 בחיפה', 62, 262, 587.7, { align: 'right', size: 7.4, noWrap: true });

  // Section 2: שהות קודמת בישראל
  put(1, '2025-2026', 355, 438, 520.5, { align: 'center', size: 7.8, noWrap: true });
  put(1, 'תייר ב/2', 242, 312, 520.5, { align: 'right', size: 8.2, bold: true, yWrapCenter: 522.0, lineShift: 3.6, wrapSize: 7.0 });
  put(1, s.pf_pass_num, 65, 165, 520.5, { align: 'center', size: 7.8, noWrap: true });

  put(1, '1991-2026', 336, 396, 504.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, 'אזרח ישראלי', 248, 294, 504.0, { align: 'right', size: 8.0, bold: true, yWrapCenter: 505.5, lineShift: 3.6, wrapSize: 7.0 });
  put(1, s.pf_sp_tz, 88, 175, 504.0, { align: 'center', size: 8.0, noWrap: true });

  // Section 3: פרטים אודות ניתוק הקשר עם חו"ל
  put(1, s.pf_occupation_he, 246, 312, 417.0, { align: 'right', size: 7.6, bold: true, yWrapCenter: 419.5, lineShift: 3.8, wrapSize: 6.8 });
  put(1, 'תכנון נוף', 92, 152, 414.1, { align: 'right', size: 7.8, bold: true, yWrapCenter: 415.5, lineShift: 3.5, wrapSize: 7.0 });
  put(1, 'סיימתי עבודה בחו״ל והתפטרתי כדין', 45, 165, 395.6, { align: 'right', size: 7.0, noWrap: true });
  put(1, 'סגירת חשבונות בנק ומכירת רכוש בצרפת', 45, 255, 379.3, { align: 'right', size: 7.4, noWrap: true });

  // Section 4: פרטים אודות השתקעות בישראל
  put(1, 'מכולת תכולת בית מלאה ומטלטלין אישיים', 45, 275, 304.9, { align: 'right', size: 7.4, noWrap: true });
  put(1, 'דירה שכורה בחוזה ארוך טווח ברחוב הרצל 42 חיפה', 45, 245, 272.2, { align: 'right', size: 7.2, noWrap: true });
  put(1, 'בתי ספר וגני ילדים בחיפה', 150, 275, 245.4, { align: 'right', size: 7.0, noWrap: true });
  put(1, 'משרד אדריכלים חיפה בע״מ', 45, 275, 223.5, { align: 'right', size: 7.4, noWrap: true });
  put(1, 'בנק לאומי סניף חיפה 802 חשבון משותף פעיל', 45, 270, 201.9, { align: 'right', size: 7.2, noWrap: true });
  put(1, spFullHe + ' (בן זוג ישראלי ומשפחתו בחיפה)', 45, 268, 180.3, { align: 'right', size: 7.2, noWrap: true });
  put(1, 'ללא צורך בטיפול רפואי מיוחד — מבוטחת קופ״ח מכבי', 45, 275, 153.4, { align: 'right', size: 7.2, noWrap: true });
  put(1, 'קהילת בית הכנסת המרכזי נווה שאנן חיפה ומכון הגיור', 45, 275, 123.1, { align: 'right', size: 7.2, noWrap: true });
  put(1, 'מגורים משותפים בחיפה, לימודי גיור סדירים, ותמיכה משפחתית וקהילתית מלאה בישראל', 45, 335, 86.5, { align: 'right', size: 7.2, noWrap: true });

  // Page 2 Bottom Date & Place
  put(1, branchCity, 450, 535, 48.7, { align: 'center', bold: true, size: 8.2, noWrap: true });
  put(1, today.todayFull, 280, 370, 48.7, { align: 'center', bold: true, size: 8.6, noWrap: true });

  // Stamp all Page 2 Checkboxes at their exact vector coordinates
  drawClassifiedBoxes(1, check, [], s);

  // =========================================================================
  // PAGE 3 (index 2): Header Summary Bar + Section 5 & Declarations
  // =========================================================================
  // Top Summary Bar: Surname (418..495) | Given Name (328..412) | 9-digit TZ Comb (197.2, step 14.0) | Passport No (40..158)
  put(2, s.pf_surname_en || s.pf_surname_he, 396, 506, 713.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 715.0, lineShift: 4.2, wrapSize: 7.6 });
  put(2, s.pf_given_en || s.pf_given_he, 278, 384, 713.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 715.0, lineShift: 4.2, wrapSize: 7.6 });
  putComb(2, s.pf_pass_num, 87.25, 17.5, 706.0, 10, false);

  // 5.2 "אחר" text & "פרטי קרוב המשפחה"
  put(2, 'נשואה לישראלי', 135, 242, 583.5, { align: 'center', size: 7.6, bold: true, noWrap: true });
  put(2, spSurHe || s.pf_sp_surname_en, 362, 485, 556.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 558.5, lineShift: 4.0, wrapSize: 7.6 });
  put(2, spGivenHe || s.pf_sp_given_en, 218, 355, 556.5, { align: 'center', size: 8.6, bold: true, yWrapCenter: 558.5, lineShift: 4.0, wrapSize: 7.6 });
  put(2, branchCity, 102, 168, 561.5, { align: 'center', size: 7.8, bold: true, noWrap: true });

  // 5.3 אני מבקש להירשם במרשם האוכלוסין
  put(2, relHe, 335, 468, 511.0, { align: 'center', bold: true, size: 8.4, noWrap: true });
  put(2, natHe, 110, 235, 511.0, { align: 'center', bold: true, size: 8.4, noWrap: true });

  // Bottom Declaration Box ("אני הח"מ ___ נושא ת.ז. ___") at y=124.1 & Date/Place
  put(2, branchCity, 450, 534, 124.1, { align: 'center', bold: true, size: 8.2, noWrap: true });
  put(2, today.todayFull, 278, 368, 124.1, { align: 'center', bold: true, size: 8.6, noWrap: true });

  // Stamp all Page 3 Checkboxes at their exact vector coordinates
  drawClassifiedBoxes(2, check, [], s);

  return await ctx.pdfDoc.save();
}

module.exports = { stampAsh456: stampAsh456 };

  });

  __define('stamp_mr14a.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampMr14a(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('mr14a_registry.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check;
  var dob = ctx.dob, pIss = ctx.pIss, pExp = ctx.pExp, today = ctx.today;
  var il = ctx.il, abr = ctx.abr;

  // Exact 9-cell comb helper for MR/14a ID grids
  // Layout on form: 2 left prefix cells (wider) + 6 middle cells (exact vector lines) + 1 check-digit cell on right
  function putIdGrid9(pageIdx, strVal, v10, y) {
    var digits = String(strVal || '').replace(/\D/g, '');
    if (!digits) return;
    var clean = digits.padStart(9, '0').slice(-9);
    for (var i = 0; i < 9; i++) {
      put(pageIdx, clean.charAt(i), v10[i], v10[i + 1], y, {
        align: 'center',
        size: 8.5,
        bold: true,
        noWrap: true
      });
    }
  }

  // Exact 3-part Gregorian date helper matching MR/14a sub-boxes:
  // Left sub-box = יום (DD) | Middle sub-box = חודש (MM) | Right sub-box = שנה (YYYY)
  function putDateYMD_RTL(pageIdx, rawDate, fallbackStr, xLeft0, xDayMon, xMonYear, xRight1, y) {
    var val = rawDate || fallbackStr || '23/11/1994';
    if (typeof val === 'object') val = val.full || val.todayFull || fallbackStr || '23/11/1994';
    var parts = String(val).trim().split(/[-/.]/);
    var dd = (parts[0] && parts[0].length <= 2) ? parts[0].padStart(2, '0') : '23';
    var mm = (parts[1] && parts[1].length <= 2) ? parts[1].padStart(2, '0') : '11';
    var yyyy = (parts[2] && parts[2].length === 4) ? parts[2] : (parts[0] && parts[0].length === 4 ? parts[0] : '1994');
    put(pageIdx, dd,   xLeft0,   xDayMon,  y, { align: 'center', size: 9.6, bold: true, noWrap: true });
    put(pageIdx, mm,   xDayMon,  xMonYear, y, { align: 'center', size: 9.6, bold: true, noWrap: true });
    put(pageIdx, yyyy, xMonYear, xRight1,  y, { align: 'center', size: 9.6, bold: true, noWrap: true });
  }

  // Exact 10 vertical boundaries (9 cells: 2 left + 6 middle + 1 right check-digit) for each ID comb column
  var COL_RIGHT_9 = [380.75, 397.71, 414.67, 431.11, 448.15, 465.22, 482.14, 499.18, 515.74, 534.50];
  var COL_MID_9   = [207.93, 224.89, 241.85, 258.41, 275.33, 292.37, 309.41, 326.33, 342.91, 361.60];
  var COL_LEFT_9  = [34.74,  51.70,  68.66,  85.22,  102.26, 119.18, 136.22, 153.26, 169.70, 188.40];

  // =========================================================================
  // 1. TOP-LEFT BARCODE / ID BOXES & ROW 1 ENTRY DETAILS (y = 780.5, 734.1, 705.8)
  // =========================================================================
  put(0, '*345678912*', 22.9, 163.1, 780.5, { align: 'center', size: 8.5, bold: true, noWrap: true });
  put(0, s.pf_id_num || '345678912', 22.9, 163.1, 734.1, { align: 'center', size: 8.8, bold: true, noWrap: true });

  put(0, s.pf_entry_date || '01/09/2025', 408.7, 544.1, 705.8, { align: 'center', size: 8.4, bold: true, noWrap: true });
  put(0, today.todayFull || '12/11/2026', 282.8, 408.7, 705.8, { align: 'center', size: 8.4, bold: true, noWrap: true });
  put(0, s.pf_status_reason_he || 'גיור / איחוד משפחות', 163.1, 282.8, 705.8, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 711.0, lineShift: 3.6 });
  put(0, s.pf_border_station_he || 'נתב"ג', 22.9, 163.1, 705.8, { align: 'center', size: 8.2, noWrap: true });

  // =========================================================================
  // 2. NAMES & PARENTS (y = 677.4, 649.1, 620.7)
  // =========================================================================
  put(0, s.pf_surname_he || 'ליכטנשטיין-מנדלסון הורוביץ', 371.5, 544.1, 677.4, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 682.5, lineShift: 3.6 });
  put(0, s.pf_surname_en || 'LIECHTENSTEIN-MENDELSSOHN', 198.3, 371.5, 677.4, { align: 'center', size: 7.2, wrapSize: 6.5, yWrapCenter: 682.5, lineShift: 3.6 });
  put(0, s.pf_father_he  || 'מתתיהו יחזקאל נתנאל הורוביץ', 22.9, 198.3, 677.4, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 682.5, lineShift: 3.6 });

  put(0, s.pf_given_he  || 'דבורה לאה עמנואלה', 371.5, 544.1, 649.1, { align: 'center', size: 7.6, wrapSize: 6.8, yWrapCenter: 654.0, lineShift: 3.6 });
  put(0, s.pf_given_en  || 'DEVORAH LEAH EMMANUELLA', 198.3, 371.5, 649.1, { align: 'center', size: 7.2, wrapSize: 6.5, yWrapCenter: 654.0, lineShift: 3.6 });
  put(0, s.pf_mother_he || 'ברכה צפורה אלישבע הורוביץ', 22.9, 198.3, 649.1, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 654.0, lineShift: 3.6 });

  put(0, s.pf_maiden_surname_he || 'כהן-צדיק', 371.5, 544.1, 620.7, { align: 'center', size: 7.8, noWrap: true });
  put(0, s.pf_prev_surname_he   || 'כהן-צדיק', 198.3, 371.5, 620.7, { align: 'center', size: 7.8, noWrap: true });
  put(0, s.pf_prev_given_he     || 'ללא', 22.9, 198.3, 620.7, { align: 'center', size: 7.8, noWrap: true });

  // =========================================================================
  // 3. ORIGIN, CITIZENSHIP & FOREIGN PASSPORT (y = 592.4)
  // =========================================================================
  put(0, (abr.country || 'צרפת').replace(/,/g, ''), 371.5, 544.1, 592.4, { align: 'center', size: 8.0, noWrap: true });
  put(0, (s.pf_citizenship || 'צרפתית').replace(/,/g, ''), 198.3, 371.5, 592.4, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_pass_num || 'FR9876543', 22.9, 198.3, 592.4, { align: 'center', size: 8.5, bold: true, noWrap: true });

  // =========================================================================
  // 4. BIRTH DATES & BIRTH PLACE (y = 561.5 / 562.5)
  // =========================================================================
  // תאריך לידה לועזי (Left=יום 388..426 | Mid=חודש 426..468 | Right=שנה 468..528)
  putDateYMD_RTL(0, s.pf_dob || (dob && dob.full), '23/11/1994', 415.0, 447.0, 482.0, 532.0, 561.5);

  // תאריך לידה עברי (Left=שנה 242..282 | Mid=חודש 282..320 | Right=יום 320..356)
  var hebParts = String((dob && dob.heb) || 'כ״ז בכסלו תשנ״ה').split(/\s+/);
  put(0, s.pf_dob_heb_day || hebParts[0] || 'כ״ז',   356.0, 390.0, 561.5, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, s.pf_dob_heb_mon || hebParts[1] || 'בכסלו', 319.0, 356.0, 561.5, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, s.pf_dob_heb_yr  || hebParts.slice(2).join(' ') || 'תשנ״ה', 276.0, 319.0, 561.5, { align: 'center', size: 8.8, bold: true, noWrap: true });

  // מקום הלידה: הישוב (128..218) | המדינה (26..116) sitting above the underlines
  put(0, (s.pf_birth_city_he || abr.city || 'ליון').replace(/,/g, ''), 145.0, 248.0, 562.5, { align: 'center', size: 8.0, noWrap: true });
  put(0, (s.pf_birth_country_he || abr.country || 'צרפת').replace(/,/g, ''), 28.0, 132.0, 562.5, { align: 'center', size: 8.0, noWrap: true });

  // =========================================================================
  // 5. NATIONALITY, RELIGION & LAW OF RETURN (y = 524.4)
  // =========================================================================
  put(0, ctx.natHe || 'יהודייה', 364.9, 544.1, 524.4, { align: 'center', size: 8.0, noWrap: true });
  put(0, ctx.relHe || 'יהודית', 212.0, 364.9, 524.4, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_shvut_clause_he || 'סעיף 1 (גיור)', 112.0, 212.0, 524.4, { align: 'center', size: 7.4, noWrap: true });
  put(0, s.pf_shvut_rel_he || 'עצמי (זכאי)', 22.9, 112.0, 524.4, { align: 'center', size: 7.4, noWrap: true });

  // =========================================================================
  // 6. ADDRESS IN ISRAEL (y = 479.5)
  // =========================================================================
  put(0, (il.city || 'חיפה').replace(/,/g, ''), 420.2, 544.1, 484.0, { align: 'center', size: 8.0, noWrap: true });
  put(0, (il.street || 'רחוב הרצל').replace(/,/g, ''), 250.6, 420.2, 484.0, { align: 'center', size: 8.0, noWrap: true });
  put(0, il.houseNum || '42', 198.3, 250.6, 484.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, il.entrance || 'א', 145.6, 198.3, 484.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, il.apt || '9', 88.0, 145.6, 484.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, il.zip || '3321400', 22.9, 88.0, 484.0, { align: 'center', size: 8.0, bold: true, noWrap: true });

  // =========================================================================
  // 7. ALL 11 CHECKBOXES + EDUCATION / OCCUPATION / GRANDFATHER (y = 449.4)
  // =========================================================================
  if (s._stressAllCheckboxes) {
    check(0, 528.9, 458.2, 7.1, 7.1, 'blue');
    check(0, 528.9, 446.5, 7.1, 7.1, 'blue');
    check(0, 481.7, 458.2, 7.1, 7.1, 'blue');
    check(0, 481.7, 446.1, 7.1, 7.1, 'blue');
    check(0, 434.5, 458.2, 7.1, 7.1, 'blue');
    check(0, 434.5, 446.1, 7.1, 7.1, 'blue');
    check(0, 376.9, 469.6, 7.1, 7.1, 'blue');
    check(0, 376.9, 458.7, 7.1, 7.1, 'blue');
    check(0, 376.9, 447.8, 7.1, 7.1, 'blue');
  } else {
    check(0, 528.9, ctx.isFemale ? 446.5 : 458.2, 7.1, 7.1, 'blue');
    if (ctx.isMarried) check(0, 481.7, 446.1, 7.1, 7.1, 'blue');
    else if (ctx.isDiv) check(0, 434.5, 458.2, 7.1, 7.1, 'blue');
    else if (ctx.isWid) check(0, 434.5, 446.1, 7.1, 7.1, 'blue');
    else check(0, 481.7, 458.2, 7.1, 7.1, 'blue');
    check(0, 376.9, ctx.isMarried ? 469.6 : 447.8, 7.1, 7.1, 'blue');
  }

  put(0, s.pf_edu_years || '16', 250.6, 311.6, 449.4, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, s.pf_occupation_he || 'אדריכלית נוף בכירה', 145.6, 250.6, 449.4, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 454.5, lineShift: 3.6 });
  put(0, s.pf_foreign_grandfather || 'אליעזר מנחם מונטפיורי', 22.9, 145.6, 449.4, { align: 'center', size: 7.4, wrapSize: 6.6, yWrapCenter: 454.5, lineShift: 3.6 });

  // =========================================================================
  // 8. MARRIAGE DETAILS, PRIOR STATUS & FOREIGN MILITARY (y = 423.5 / 412.5, 385.6)
  // =========================================================================
  putDateYMD_RTL(0, s.pf_marriage_date, '14/08/2022', 430.0, 464.0, 500.0, 538.0, 423.5);
  put(0, (s.pf_marriage_place_he || abr.city || 'ליון - צרפת').replace(/,/g, ''), 297.1, 420.2, 412.5, { align: 'center', size: 7.8, noWrap: true });
  put(0, s.pf_prev_status_il_he || 'ב/2 תייר', 120.9, 297.1, 412.5, { align: 'center', size: 8.0, noWrap: true });

  if (s._stressAllCheckboxes) {
    check(0, 105.9, 422.8, 7.1, 7.1, 'blue');
    check(0, 105.9, 411.1, 7.1, 7.1, 'blue');
  }

  put(0, ((abr.city || 'ליון') + ' - ' + (abr.country || 'צרפת')).replace(/,/g, ''), 399.3, 544.1, 385.6, { align: 'center', size: 7.8, noWrap: true });
  put(0, s.pf_requested_status_he || 'עולה / א/5', 268.0, 399.3, 385.6, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_req_num || '2026-98412', 94.7, 268.0, 385.6, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, s.pf_citizenship_code || '314', 22.9, 94.7, 385.6, { align: 'center', size: 8.2, bold: true, noWrap: true });

  // =========================================================================
  // 9. ALL 12 FAMILY ID COMB GRIDS (y = 354.2, 314.1, 284.9, 256.6)
  // =========================================================================
  putIdGrid9(0, s.pf_father_tz || '012345674', COL_RIGHT_9, 354.2);
  putIdGrid9(0, s.pf_mother_tz || '023456782', COL_MID_9,   354.2);
  putIdGrid9(0, s.pf_sp_tz     || '034567890', COL_LEFT_9,  354.2);

  var kidCoords = [
    { col: COL_RIGHT_9, y: 314.1, fallback: '301111119' },
    { col: COL_MID_9,   y: 314.1, fallback: '302222227' },
    { col: COL_LEFT_9,  y: 314.1, fallback: '303333335' },
    { col: COL_RIGHT_9, y: 284.9, fallback: '304444443' },
    { col: COL_MID_9,   y: 284.9, fallback: '305555550' },
    { col: COL_LEFT_9,  y: 284.9, fallback: '306666668' },
    { col: COL_RIGHT_9, y: 256.6, fallback: '307777776' },
    { col: COL_MID_9,   y: 256.6, fallback: '308888884' },
    { col: COL_LEFT_9,  y: 256.6, fallback: '309999992' }
  ];
  var kids = Array.isArray(ctx.kids) ? ctx.kids : [];
  for (var k = 0; k < 9; k++) {
    var kId = (kids[k] && (kids[k].tz || kids[k].id || kids[k].id_num || kids[k].pass_num)) || (s._stressAllCheckboxes ? kidCoords[k].fallback : '');
    if (kId && /^\d+$/.test(String(kId).trim())) putIdGrid9(0, kId, kidCoords[k].col, kidCoords[k].y);
  }

  // =========================================================================
  // 10. PASSPORT, VISA & REMARKS TABLE (y = 230.7, 204.4, 178.1, 151.8, 125.7)
  // =========================================================================
  put(0, s.pf_border_station_he || 'נתב"ג', 399.3, 544.1, 230.7, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_pass_num || 'FR9876543', 399.3, 544.1, 204.4, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, ((abr.city || 'ליון') + ' - ' + (abr.country || 'צרפת')).replace(/,/g, ''), 399.3, 544.1, 178.1, { align: 'center', size: 7.8, noWrap: true });
  put(0, pIss.full || '10/03/2024', 399.3, 544.1, 151.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, pExp.full || '09/03/2034', 399.3, 544.1, 125.7, { align: 'center', size: 8.0, noWrap: true });

  put(0, s.pf_visa_num || s.pf_req_num || '2026-98412', 250.6, 399.3, 230.7, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, 'ב/2 תייר', 250.6, 399.3, 204.4, { align: 'center', size: 8.0, noWrap: true });
  put(0, (ctx.branchCity || il.city || 'חיפה').replace(/,/g, ''), 250.6, 399.3, 178.1, { align: 'center', size: 8.0, noWrap: true });
  put(0, s.pf_entry_date || '01/09/2025', 250.6, 399.3, 151.8, { align: 'center', size: 8.0, noWrap: true });
  put(0, today.todayFull || '12/11/2026', 250.6, 399.3, 125.7, { align: 'center', size: 8.0, noWrap: true });

  // הערות & חותמת הלשכה (Clerk-only in Real User Mode)
  if (s._stressAllCheckboxes) {
    put(0, 'ללא הסתייגויות — כל הפרטים לעיל נכונים ומדויקים.', 22.9, 250.6, 215.5, { align: 'center', size: 7.4, noWrap: true });
    put(0, 'נבדקו מסמכי מקור בלשכת רשות האוכלוסין.', 22.9, 250.6, 196.5, { align: 'center', size: 7.4, noWrap: true });
    put(0, 'תיק גיור / מעמד אושר לרישום.', 22.9, 250.6, 181.0, { align: 'center', size: 7.4, noWrap: true });
    put(0, 'לשכת חיפה — רשות האוכלוסין', 22.9, 250.6, 118.0, { align: 'center', size: 7.8, bold: true, noWrap: true });
  }

  // מספר הזהות (minor parent ID box: x=182.3..250.6, y=63.0)
  if (s._stressAllCheckboxes) put(0, s.pf_sp_tz || '034567890', 22.9, 145.6, 82.0, { align: 'center', size: 8.4, bold: true, noWrap: true });

  // =========================================================================
  // 11. BOTTOM ROW: REGISTRATION DATE & 3 SIGNATURE BOXES (y = 51.0 / 43.0)
  // =========================================================================
  putDateYMD_RTL(0, (s.pf_reg_date && String(s.pf_reg_date).trim()) || (today && today.todayFull), '12/11/2026', 415.0, 449.0, 484.0, 528.0, 51.0);
  if (s._stressAllCheckboxes) {
    put(0, 'אביגיל גולדשמיט', 270.5, 393.6, 43.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
    put(0, 'שמואל גולדשמיט', 145.6, 270.5, 43.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
    put(0, 'פקידי מרשם — חיפה', 22.9, 145.6, 43.0, { align: 'center', size: 7.8, bold: true, noWrap: true });
  }

  return await ctx.pdfDoc.save();
}

module.exports = { stampMr14a: stampMr14a, stampAuto: stampMr14a };

  });

  __define('stamp_mr14b.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampMr14b(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('mr14b_registry_notice.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put;
  var today = ctx.today, il = ctx.il, branchCity = ctx.branchCity;
  var relHe = ctx.relHe, natHe = ctx.natHe;

  var surHe = (s.pf_surname_he || 'לוי-אפשטיין').replace(/,/g, '');
  var givHe = (s.pf_given_he   || 'יונתן מתתיהו').replace(/,/g, '');
  var sigHe = givHe.split(/\s+/)[0] + ' ' + surHe.split(/\s+/)[0];
  var tzNum = s.pf_tz || s.pf_sp_tz || '012345674';
  var dateStr = (today && today.todayFull) || '12/11/2026';

  // =========================================================================
  // 1. Top Declaration Underlines (אני מאשר שהוסבר לי תוכן הודעה זאת)
  // =========================================================================
  var yUnderline = 484.5;
  put(0, surHe,   452.7, 553.5, yUnderline, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, givHe,   342.0, 448.1, yUnderline, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, dateStr, 245.3, 336.7, yUnderline, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, tzNum,   139.9, 240.0, yUnderline, { align: 'center', size: 9.0, bold: true, noWrap: true });
  put(0, sigHe,    31.8, 132.6, yUnderline, { align: 'center', size: 8.6, bold: true, noWrap: true });

  // =========================================================================
  // 2. Table 1: תיקונים ושינויים בפרטי המרשם (5 Data Rows — Lifted +7.5pt)
  //    Columns RTL: הפרט (428.6..558.9) | מ- (286.4..428.6) | ל- (143.9..286.4) | תאריך (31.8..143.9)
  // =========================================================================
  var changes = [
    { item: 'המצב האישי',   from: 'רווק',                to: 'נשוי',                                                    date: '14/08/2022' },
    { item: 'שם המשפחה',    from: 'גולדשטיין-לוי',        to: surHe,                                                     date: '14/08/2022' },
    { item: 'המען בישראל',  from: 'רחוב יפו 18 ירושלים',  to: ((il.streetWithNum || 'רחוב הרצל 42') + ' ' + (il.city || 'חיפה')).replace(/,/g, ''), date: '01/09/2025' },
    { item: 'הדת והלאום',   from: 'ללא סיווג',            to: (relHe || 'יהודית') + ' - ' + (natHe || 'יהודייה'),          date: dateStr },
    { item: 'המעמד בישראל', from: 'א/2 תייר בהליך גיור',  to: 'עולה לפי חוק השבות',                                      date: dateStr }
  ];
  var rowYs = [395.7, 372.9, 350.1, 327.3, 304.5];

  for (var i = 0; i < (s._stressAllCheckboxes ? changes.length : 0); i++) {
    var row = changes[i];
    var y = rowYs[i];
    put(0, row.item, 430.6, 556.9, y, { align: 'center', size: 8.2, bold: true, noWrap: true });
    put(0, row.from, 288.4, 426.6, y, { align: 'center', size: 8.0, noWrap: true });
    put(0, row.to,   145.9, 284.4, y, { align: 'center', size: 8.0, noWrap: true });
    put(0, row.date,  33.8, 141.9, y, { align: 'center', size: 8.2, noWrap: true });
  }

  // =========================================================================
  // 3. Table 2: רישומים קודמים (9 Dotted Lines on Right + Clerk Box on Left)
  // =========================================================================
  var prevNotes = [
    '1. תיק כניסה ושהייה מס׳ 2024-88319 - אשרת ב/2 תייר (נתב״ג 01/09/2024).',
    '2. תיק הארכת מעמד מס׳ 2025-44102 - מעבר לאשרת א/2 לימודי גיור (לשכת חיפה).',
    '3. תיק בית הדין המיוחד לגיור מס׳ 55920/26 - תעודת גיור רשמית מיום 15/10/2026.',
    '4. בדיקת דרכונים קודמים: דרכון זר מס׳ ' + (s.pf_pass_num || 'FR9876543') + ' - אומת במלואו.',
    '5. רישום מצב אישי ואיחוד תיקים עם בן/בת הזוג ת״ז ' + tzNum + ' (לשכת ' + (branchCity || 'חיפה') + ').',
    '6. הצהרת שמירת/ויתור אזרחות זרה הוסברה לנרשם בהתאם לסעיף 2 לחוק האזרחות.',
    '7. אימות תעודות ציבוריות מארץ המוצא (אפוסטיל) - הושלם ואושר בחתימת פקיד רישום.',
    '8. סריקת מסמכי מקור לתיק הממוחשב במערכת אביב - אסמכתא מס׳ 9948120.',
    '9. ללא הסתייגויות נוספות - כלל פרטי המרשם לעיל נבדקו אומתו ונמצאו מדויקים.'
  ];
  var dotYs = [246.3, 223.6, 200.8, 178.1, 155.3, 132.6, 109.9, 87.1, 64.4];

  for (var j = 0; j < (s._stressAllCheckboxes ? prevNotes.length : 0); j++) {
    put(0, prevNotes[j], 230.1, 550.9, dotYs[j], { align: 'right', size: 7.8, noWrap: true });
  }

  // Left clerk verification block inside רישומים קודמים (Calibration Mode only)
  if (s._stressAllCheckboxes) {
    put(0, 'לשכת רשות האוכלוסין והגירה',             37.8, 216.1, dotYs[1], { align: 'center', size: 8.2, bold: true, noWrap: true });
    put(0, 'סניף: ' + (branchCity || 'חיפה והצפון'),  37.8, 216.1, dotYs[2], { align: 'center', size: 8.0, noWrap: true });
    put(0, 'מספר תיק: ' + (s.pf_req_num || '2026-98412'), 37.8, 216.1, dotYs[4], { align: 'center', size: 8.0, bold: true, noWrap: true });
    put(0, 'תאריך אימות: ' + dateStr,                 37.8, 216.1, dotYs[5], { align: 'center', size: 8.0, noWrap: true });
    put(0, 'אומת ונבדק ע״י פקיד הרישום',              37.8, 216.1, dotYs[7], { align: 'center', size: 7.8, noWrap: true });
  }

  return await ctx.pdfDoc.save();
}

module.exports = { stampMr14b: stampMr14b };
  });

  __define('stamp_nespach_alef.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampNespachAlef(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('nespach_alef_affidavit.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put;
  var today = ctx.today, branchCity = ctx.branchCity;

  var spGivenHe = (ctx.spGivenHe || 'בנימין אלעזר').replace(/,/g, '');
  var spSurHe   = (ctx.spSurHe   || 'לוי-צדק').replace(/,/g, '');
  var spFullHe  = (ctx.spFullHe  || (spGivenHe + ' ' + spSurHe)).replace(/,/g, '');

  var apGivenHe = (s.pf_given_he   || 'דבורה לאה').replace(/,/g, '');
  var apSurHe   = (s.pf_surname_he || 'גולדשמיט-ברנשטיין').replace(/,/g, '');
  var apFullHe  = (apGivenHe + ' ' + apSurHe).trim();

  var tzNum   = s.pf_sp_tz || s.pf_tz || '012345674';
  var passNum = s.pf_pass_num || 'FR9876543';
  var dateStr = (today && today.todayFull) || '12/11/2026';

  put(0, 'ללא הסתייגויות — כל הפרטים לעיל נכונים ומדויקים במלואם, ואנו עומדים בכל תנאי התצהיר.', 43.2, 546.1, 263.7, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, 'מצורפים כלל מסמכי הסף והראיות לחיים משותפים ולכנות הקשר בהתאם לנוהל רשות האוכלוסין.', 43.2, 545.4, 249.1, { align: 'center', size: 8.2, noWrap: true });

  // Row 1: הישראלי (חתימה left blank; שם ומשפחה size 9.7; תעודת זהות; תאריך)
  put(0, spFullHe, 241.5, 410.8, 187.9, { align: 'center', size: 9.7, bold: true, noWrap: true });
  put(0, tzNum,    166.7, 238.9, 187.9, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, dateStr,   58.9, 147.3, 187.9, { align: 'center', size: 8.6, noWrap: true });

  // Row 2: הזר (חתימה left blank; שם ומשפחה size 9.7; מספר דרכון; תאריך)
  put(0, apFullHe, 241.5, 410.8, 148.7, { align: 'center', size: 9.7, bold: true, noWrap: true });
  put(0, passNum,  166.7, 238.9, 148.7, { align: 'center', size: 8.8, bold: true, noWrap: true });
  put(0, dateStr,   58.9, 147.3, 148.7, { align: 'center', size: 8.6, noWrap: true });

  // Row 3: מאשר החתימה (Clerk/Lawyer attestation — stamped only in Calibration Mode)
  if (s._stressAllCheckboxes) {
    put(0, 'עו״ד רותם אברהמי',                                  440.7, 550.7, 78.5, { align: 'center', size: 9.7, bold: true, noWrap: true });
    put(0, 'רכזת מעמד ואשרות - לשכת ' + (branchCity || 'חיפה'), 305.5, 418.8, 78.5, { align: 'center', size: 8.0, noWrap: true });
    put(0, dateStr,                                              203.2, 275.4, 78.5, { align: 'center', size: 8.6, noWrap: true });
  }

  return await ctx.pdfDoc.save();
}

module.exports = { stampNespachAlef: stampNespachAlef };
  });

  __define('stamp_ash6.js', function(module, exports, require) {
'use strict';

var core = require('./stamper_core.js');

async function stampAsh6(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('ash6_spousal_status.pdf', rawState, loaderOpts);
  var s = ctx.s;
  var put = ctx.put;
  var check = ctx.check;
  var dob = ctx.dob;
  var pExp = ctx.pExp;
  var today = ctx.today;
  var il = ctx.il;
  var abr = ctx.abr;
  var branchCity = ctx.branchCity;
  var relHe = ctx.relHe;
  var natHe = ctx.natHe;
  var spFullHe = ctx.spFullHe;
  var spDobM = ctx.spDobM;

  // Exact cell-by-cell comb helper using true PDF vertical divider coordinates
  function putExactComb(pageIdx, strVal, vLines, y, padZeros) {
    var numCells = vLines.length - 1;
    var clean = padZeros
      ? String(strVal || '').replace(/\D/g, '').padStart(numCells, '0').slice(0, numCells)
      : String(strVal || '').replace(/[^A-Za-z0-9]/g, '').slice(0, numCells);
    if (!clean) return;
    var offset = numCells - clean.length;
    for (var i = 0; i < clean.length; i++) {
      var cIdx = offset + i;
      put(pageIdx, clean.charAt(i), vLines[cIdx], vLines[cIdx + 1], y, { align: 'center', size: 8.2, bold: true, noWrap: true });
    }
  }

  var p2InviterTzLines = [456.31, 468.46, 480.58, 492.82, 504.94, 517.06, 529.30, 541.42, 553.66, 565.78];
  var p2PassportLines  = [301.37, 316.61, 331.87, 347.23, 362.47, 377.83, 393.07, 408.31, 423.67, 438.91, 454.27, 469.54, 484.90];
  var p2AreaIdLines    = [29.28, 44.52, 59.88, 75.26, 90.62, 105.98, 121.34, 136.70, 152.06, 167.42];
  var p3WitnessTzLines = [444.67, 457.27, 469.78, 482.38, 494.98, 507.58, 520.06, 532.66, 545.14, 557.74];

  // =========================================================================
  // Page 1 (index 0) — LOCKED (נספח אש 6 דף 1)
  // =========================================================================
  put(0, today.todayFull, 90, 150, 714.0, { align: 'center', size: 10.5, bold: true, noWrap: true });
  put(0, s.pf_req_num || '2026-98412', 70, 132, 694.5, { align: 'center', size: 10.5, bold: true, noWrap: true });

  var appFullHe = ((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim();
  if (spFullHe) {
    put(0, spFullHe, 340, 500, 664.0, { align: 'right', size: 9.0, bold: true, noWrap: true });
    put(0, appFullHe, 340, 536, 642.5, { align: 'right', size: 9.0, bold: true, noWrap: true });
  } else {
    put(0, appFullHe, 340, 500, 664.0, { align: 'right', size: 9.0, bold: true, noWrap: true });
  }

  put(0, '1,020', 255, 285, 504.0, { align: 'center', size: 9.8, bold: true, noWrap: true });
  put(0, '1,020', 510, 538, 504.0, { align: 'center', size: 9.2, bold: true, noWrap: true });
  put(0, '1,020', 461, 489, 504.0, { align: 'center', size: 9.2, bold: true, noWrap: true });

  var p1RowsY = [487.5, 467.0, 446.5, 426.0, 405.5, 385.0, 364.5, 344.5, 324.0, 303.5, 283.0, 262.5, 242.0, 221.5, 201.0, 180.5];
  var p1LeftBoxSkip = { 446.5: true, 385.0: true, 364.5: true, 324.0: true };
  p1RowsY.forEach(function(ry) {
    check(0, 509.5, ry, 7.1, 7.1, 'green');
    if (!p1LeftBoxSkip[ry]) check(0, 461.2, ry, 7.1, 7.1, 'green');
  });

  put(0, '01/09/2025', 106, 152, 281.5, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, '01/09/2026', 44, 83, 281.5, { align: 'center', size: 7.4, bold: true, noWrap: true });

  // =========================================================================
  // Page 2 (index 1) — נספח אש 6 דף 2 (5pt Grid Calibrated & Multi-Row Stress)
  // =========================================================================
  // Top-left Request Number (מספר בקשה)
  put(1, s.pf_req_num || '2026-98412', 37.7, 109.9, 692.0, { align: 'center', size: 8.4, bold: true, noWrap: true });

  // Top Request Type Checkboxes
  check(1, 495.7, 650.6, 7.1, 7.1, 'green');
  if (s._stressAllCheckboxes) check(1, 277.9, 650.6, 7.1, 7.1, 'green');

  // Inviter Status Checkboxes
  check(1, 318.4, 612.5, 7.1, 7.1, 'green');
  if (s._stressAllCheckboxes) check(1, 265.4, 612.5, 7.1, 7.1, 'green');

  // Inviter Row 1: 9-Cell ID Comb + 5 Multi-Row Name Boxes (Y = 561.0 .. 585.0)
  putExactComb(1, s.pf_sp_tz || '012345674', p2InviterTzLines, 565.0, true);
  put(1, ctx.spSurHe || 'לוי-אפשטיין אשכנזי ירושלמי', 371.2, 456.3, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, ctx.spGivenHe || 'יונתן מתתיהו רפאל שלמה', 286.1, 371.2, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, ctx.spAb || 'אברהם משה בנימין אלעזר', 201.2, 286.1, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, ctx.spSb || 'יעקב שלמה יצחק מנחם', 116.1, 201.2, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, ctx.spIm || 'לאה רבקה שרה רחל', 31.0, 116.1, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });

  // Inviter Row 2: DOB, Gender, Marital Status, Marriage Date, Religion, Nationality (Y = 520.9 .. 543.7)
  put(1, spDobM ? spDobM[3] : '1991', 535.1, 564.8, 524.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, spDobM ? spDobM[2] : '07',   505.3, 535.1, 524.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, spDobM ? spDobM[1] : '15',   475.4, 505.3, 524.5, { align: 'center', size: 8.0, noWrap: true });

  if (s._stressAllCheckboxes) {
    check(1, 460.5, 535.3, 7.1, 7.1, 'green');
    check(1, 460.5, 524.9, 7.1, 7.1, 'green');
    check(1, 416.8, 535.3, 7.1, 7.1, 'green');
    check(1, 416.8, 524.9, 7.1, 7.1, 'green');
    check(1, 380.8, 535.3, 7.1, 7.1, 'green');
    check(1, 380.8, 524.9, 7.1, 7.1, 'green');
  } else {
    check(1, 460.5, ctx.isFemale ? 535.3 : 524.9, 7.1, 7.1, 'green');
    check(1, 416.8, 524.9, 7.1, 7.1, 'green');
  }

  var marDateFmt = core.splitIsoDate(s.pf_marriage_date || (String(s.pf_marriage_details || '').split(/[•|]/)[0] || '').trim()).full;
  var spOccHe = s.pf_sp_occupation_he || (String(s.pf_marriage_details || '').split(/[•|]/)[2] || '').trim();
  put(1, marDateFmt || (s._stressAllCheckboxes ? '14/06/2026' : ''), 244.4, 350.7, 528.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, relHe || 'יהודית', 138.1, 244.4, 528.5, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 530.5, lineShift: 4.0 });
  put(1, natHe || 'יהודייה', 31.9, 138.1, 528.5, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 530.5, lineShift: 4.0 });

  // Inviter Row 3: Prior Family Name, Prior Given Name, Entry Date, Citizenship, Status Date, Occupation (Y = 481.5 .. 503.6)
  put(1, s.pf_sp_prior_he || (s._stressAllCheckboxes ? 'כהן-שוורצמן אלכסנדרוני' : ''), 476.7, 565.9, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, s.pf_sp_prior_given_he || (s._stressAllCheckboxes ? 'עמנואל יהונתן אלעזר' : ''), 387.6, 476.7, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, core.splitIsoDate(s.pf_sp_entry_date).full || (s._stressAllCheckboxes ? '15/07/1991' : ''), 298.4, 387.6, 488.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, s.pf_sp_citizenship_he || (s._stressAllCheckboxes ? 'ישראלית ואמריקאית' : ''), 209.2, 298.4, 488.5, { align: 'center', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, core.splitIsoDate(s.pf_sp_status_date).full || (s._stressAllCheckboxes ? '15/07/1991' : ''), 120.0, 209.2, 488.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, spOccHe || (s._stressAllCheckboxes ? 'מהנדס מערכות מידע ותוכנה' : ''), 30.8, 120.0, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });

  // Inviter Row 4: Address & Phones (Y = 433.8 .. 453.3 / 464.2)
  put(1, il.city || 'חיפה', 489.9, 565.9, 440.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 442.5, lineShift: 3.8 });
  put(1, il.street || 'שדרות הרצל', 336.9, 489.9, 440.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 442.5, lineShift: 3.8 });
  put(1, il.house || '42', 282.9, 336.9, 440.0, { align: 'center', size: 8.0, noWrap: true });
  put(1, il.apt || '9', 237.9, 282.9, 440.0, { align: 'center', size: 8.0, noWrap: true });
  put(1, il.zip || '3321400', 183.9, 237.9, 440.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, s.pf_sp_phone_home || '04-812-3456', 102.9, 183.9, 444.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, s.pf_phone_il || '058-765-4321', 30.8, 102.9, 444.0, { align: 'center', size: 7.8, noWrap: true });

  // Invited Top Bar: 12-Cell Passport Comb, Valid Until, 9-Cell Area ID Comb (Y = 390.3 .. 412.0)
  putExactComb(1, s.pf_pass_num || 'FR9876543', p2PassportLines, 394.5, false);
  put(1, pExp.full || '09/03/2034', 194.2, 301.4, 396.5, { align: 'center', size: 8.0, noWrap: true });
  putExactComb(1, '033214009', p2AreaIdLines, 394.5, true);

  // Invited Row 1: 5 Multi-Row Name Boxes, DOB, Gender (Y = 349.0 .. 373.0)
  put(1, s.pf_surname_he || 'רוזנצוייג-שטרנברג אברמוביץ', 482.5, 565.8, 357.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 359.5, lineShift: 4.2 });
  put(1, s.pf_given_he || 'אביגיל רבקה מרגלית', 392.5, 482.5, 357.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 359.5, lineShift: 4.2 });
  put(1, s.pf_father_he || 'ירמיהו זכריה שלמה אברמוביץ', 310.0, 392.5, 357.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 359.5, lineShift: 4.2 });
  put(1, s.pf_foreign_grandfather || 'אליעזר מנחם מונטפיורי', 231.5, 310.0, 357.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 359.5, lineShift: 4.2 });
  put(1, s.pf_mother_he || 'ברכה צפורה אלישבע אברמוביץ', 161.7, 231.5, 357.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 359.5, lineShift: 4.2 });

  put(1, dob.y || '1994', 132.0, 161.7, 353.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, dob.m || '11',   101.9, 132.0, 353.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, dob.d || '23',    72.6, 101.9, 353.0, { align: 'center', size: 7.8, noWrap: true });

  if (s._stressAllCheckboxes) {
    check(1, 57.7, 362.7, 7.1, 7.1, 'green');
    check(1, 57.7, 352.3, 7.1, 7.1, 'green');
    check(1, 551.0, 321.3, 7.1, 7.1, 'green');
    check(1, 551.0, 310.9, 7.1, 7.1, 'green');
    check(1, 519.8, 321.3, 7.1, 7.1, 'green');
    check(1, 519.8, 310.9, 7.1, 7.1, 'green');
  } else {
    check(1, 57.7, ctx.isFemale ? 352.3 : 362.7, 7.1, 7.1, 'green');
    if (ctx.isMarried) check(1, 551.0, 310.9, 7.1, 7.1, 'green');
    else if (ctx.isDiv) check(1, 519.8, 321.3, 7.1, 7.1, 'green');
    else if (ctx.isWid) check(1, 519.8, 310.9, 7.1, 7.1, 'green');
    else check(1, 551.0, 321.3, 7.1, 7.1, 'green');
  }

  var ent6 = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
  put(1, relHe || 'יהודית', 428.5, 489.9, 316.0, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, natHe || 'יהודייה', 365.5, 428.5, 316.0, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, s.pf_citizenship || 'צרפתית ושוויצרית', 302.4, 365.5, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, ent6[0] || '01/09/2026', 221.4, 302.4, 316.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, ent6[1] || 'נתב״ג טרמינל 3', 158.4, 221.4, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, ent6[2] || 'ב/2 תייר בהליך', 95.4, 158.4, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, (ent6[3] || '01/12/2026').replace(/^עד\s*/, ''), 30.8, 95.4, 316.0, { align: 'center', size: 7.6, noWrap: true });

  // Invited Row 3: Abroad Address, Relation to Inviter, Home Phone, Mobile Phone (Y = 260.6 .. 280.2 / 291.1)
  put(1, abr.country || 'France', 489.9, 565.9, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
  put(1, abr.city || 'Lyon', 401.5, 489.9, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
  put(1, abr.street || 'Rue de la Republique', 320.4, 401.5, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
  put(1, '25', 266.4, 320.4, 266.5, { align: 'center', size: 7.8, noWrap: true });
  put(1, 'בת זוג נשואה כדין', 183.9, 266.4, 271.5, { align: 'center', size: 7.6, wrapSize: 7.2, yWrapCenter: 274.5, lineShift: 4.0 });
  put(1, s.pf_phone_abroad || '+33-4-7890-1234', 102.9, 183.9, 271.5, { align: 'center', size: 7.2, noWrap: true });
  put(1, s.pf_phone_il || '058-765-4321', 30.8, 102.9, 271.5, { align: 'center', size: 7.8, noWrap: true });

  // Accompanying Minors Table (קטינים נלווים — 3 Rows in Y = 137.8 .. 207.4, All 6 Gender Boxes Checked)
  var cRows = Array.isArray(s.pf_children_rows) ? s.pf_children_rows : [];
  var minorRowBands = [
    { y: 192.5, yc: 194.5, chkM: 197.2, chkF: 186.7 },
    { y: 169.3, yc: 171.3, chkM: 173.8, chkF: 163.4 },
    { y: 146.1, yc: 148.1, chkM: 150.7, chkF: 140.2 }
  ];
  minorRowBands.forEach(function(band, idx) {
    if (!s._stressAllCheckboxes && !cRows[idx]) return;
    var cr = cRows[idx] || {};
    var cDob = core.splitIsoDate(cr.dob || (s._stressAllCheckboxes ? '14/05/2018' : ''));
    put(1, cr.id_num || (s._stressAllCheckboxes ? 'FR1122334' : ''), 496.7, 563.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, cr.surname_he || s.pf_surname_he || (s._stressAllCheckboxes ? 'גולדשמיט-מונטפיורי' : ''), 424.6, 496.7, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cr.given_he || (s._stressAllCheckboxes ? 'אריאל אלכסנדר בנימין' : ''), 352.6, 424.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cr.other_parent_he || ctx.spFullHe || (s._stressAllCheckboxes ? 'עמנואל אברהם לוי-צדק' : ''), 280.6, 352.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cr.country || (s._stressAllCheckboxes ? 'ליון, צרפת' : ''), 216.7, 280.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cDob.y || (s._stressAllCheckboxes ? '2018' : ''), 189.6, 216.7, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, cDob.m || (s._stressAllCheckboxes ? '05' : ''),   162.6, 189.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, cDob.d || (s._stressAllCheckboxes ? '14' : ''),   135.6, 162.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    if (s._stressAllCheckboxes) {
      check(1, 120.7, band.chkM, 7.1, 7.1, 'green');
      check(1, 120.7, band.chkF, 7.1, 7.1, 'green');
    } else if (/נקבה|F/i.test(String(cr.gender || ''))) {
      check(1, 120.7, band.chkF, 7.1, 7.1, 'green');
    } else {
      check(1, 120.7, band.chkM, 7.1, 7.1, 'green');
    }
    put(1, cr.entry_date || ent6[0] || (s._stressAllCheckboxes ? '01/09/2026' : ''), 31.7, 86.5, band.y, { align: 'center', size: 7.4, noWrap: true });
  });

  // Bottom Consent Line (הוצגה הסכמת הורה שני — Y = 72.7 .. 81.7, All 3 Checkboxes Checked)
  check(1, 423.3, 74.6, 7.1, 7.1, 'green');
  check(1, 204.7, 74.6, 7.1, 7.1, 'green');
  check(1, 171.9, 74.6, 7.1, 7.1, 'red');
  put(1, s.pf_ash6_minor_consent_reason || 'אפוטרופסות משותפת של שני ההורים המבקשים', 32.5, 142.8, 75.5, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: 78.5, lineShift: 3.8 });

  // =========================================================================
  // Page 3 (index 2) — נספח אש 6 דף 3
  // =========================================================================
  var refLines = String(s.pf_ash6_refs || '').split(/\n+/).filter(Boolean);
  [673.0, 647.0, 621.0].forEach(function(ry, rIdx) {
    if (!refLines[rIdx]) return;
    var cols = refLines[rIdx].split(/[|•,]/).map(function(x){ return x.trim(); });
    var nmP = (cols[0] || '').split(/\s+/);
    var rGiven = nmP.slice(0, -1).join(' ') || cols[0] || '';
    var rSur = nmP.length > 1 ? nmP[nmP.length - 1] : '';
    putExactComb(2, cols[1] || '', p3WitnessTzLines, ry, true);
    put(2, rSur, 376, 440, ry, { align: 'right', size: 8.0, noWrap: true });
    put(2, rGiven, 305, 370, ry, { align: 'right', size: 8.0, noWrap: true });
    put(2, cols[2] || '', 240, 298, ry, { align: 'right', size: 7.8, noWrap: true });
    put(2, cols[3] || il.city, 118, 232, ry, { align: 'center', size: 7.4, noWrap: true });
    put(2, cols[4] || '', 38, 111, ry, { align: 'center', size: 7.6, noWrap: true });
  });

  put(2, spFullHe, 250, 395, 275.5, { align: 'center', bold: true, yWrapCenter: 277.0, lineShift: 3.2, wrapSize: 6.2 });
  put(2, s.pf_sp_tz, 155, 240, 275.5, { align: 'center', size: 9.0, bold: true, noWrap: true });
  put(2, today.todayFull, 65, 130, 275.5, { align: 'center', size: 9.0, noWrap: true });

  put(2, appFullHe, 250, 395, 223.0, { align: 'center', bold: true, yWrapCenter: 224.5, lineShift: 3.2, wrapSize: 6.2 });
  put(2, s.pf_pass_num, 155, 240, 223.0, { align: 'center', size: 9.0, bold: true, noWrap: true });
  put(2, today.todayFull, 65, 130, 223.0, { align: 'center', size: 9.0, noWrap: true });

  // =========================================================================
  // Page 4 (index 3) — נספח אש 6 דף 4
  // =========================================================================
  put(3, s.pf_req_num || '2026-98412', 55, 135, 664.0, { align: 'center', size: 8.4, bold: true, noWrap: true });
  [654.7, 624.7, 594.7, 546.7, 516.7].forEach(function(cy) { check(3, 532.2, cy, 7.1, 7.1, 'green'); });
  put(3, s.pf_ash6_decl_exception_he || 'ללא הסתייגויות — כל סעיפי ההצהרה לעיל מתקיימים במלואם וללא יוצא מן הכלל.', 60, 535, 472.5, { align: 'right', size: 7.6, noWrap: true });
  put(3, branchCity, 385, 455, 270.5, { align: 'right', size: 9.0, bold: true, noWrap: true });
  put(3, today.todayFull, 265, 330, 270.5, { align: 'center', size: 9.0, bold: true, noWrap: true });

  // =========================================================================
  // Page 5 (index 4) — נספח אש 6 דף 5
  // =========================================================================
  put(4, s.pf_given_he, 402, 485, 688.5, { align: 'right', size: 8.6, bold: true, noWrap: true });
  put(4, s.pf_surname_he, 245, 344, 688.5, { align: 'right', size: 7.6, bold: true, noWrap: true });
  put(4, s.pf_pass_num, 125, 221, 688.5, { align: 'center', size: 9.0, bold: true, noWrap: true });
  [665.2, 621.3, 602.6, 583.9, 565.4, 533.9, 515.4, 484.0, 460.0, 436.0, 412.0, 393.2, 374.7].forEach(function(cy) {
    check(4, 534.8, cy, 7.1, 7.1, 'green');
  });
  put(4, s.pf_ash6_decl_exception_he || 'ללא הסתייגויות — כל סעיפי ההצהרה לעיל מתקיימים במלואם וללא יוצא מן הכלל.', 60, 535, 341.0, { align: 'right', size: 7.6, noWrap: true });
  put(4, branchCity, 395, 470, 214.0, { align: 'right', size: 9.0, bold: true, noWrap: true });
  put(4, today.todayFull, 255, 325, 214.0, { align: 'center', size: 9.0, bold: true, noWrap: true });

  // =========================================================================
  // Page 6 (index 5) — נספח אש 6 דף 6 (100% Populated & 5pt-Ruler Calibrated)
  // =========================================================================
  if (s.pf_ll_affidavit) {
    var ll = String(s.pf_ll_affidavit).split(/[|•]/).map(function(x){ return x.trim(); });
    var llNm = (ll[0] || '').split(/\s+/);
    put(5, llNm[0] || 'משה', 376, 456, 702.0, { align: 'center', size: 9.0, bold: true, noWrap: true });
    put(5, llNm.slice(1).join(' ') || 'אהרן אלון', 200, 312, 702.0, { align: 'center', size: 9.0, bold: true, noWrap: true });
    put(5, ll[1] || '045678909', 60, 165, 702.0, { align: 'center', size: 9.0, bold: true, noWrap: true });

    // Section א: Checkboxes בני (251.0), בתי (214.0), אחר (197.5) + text on line
    if (s._stressAllCheckboxes) {
      check(5, 260.9, 654.5, 7.1, 7.1, 'blue');
      check(5, 229.4, 654.5, 7.1, 7.1, 'blue');
    }
    check(5, 197.5, 654.5, 7.1, 7.1, 'blue');
    put(5, 'שוכרים', 85, 175, 656.5, { align: 'center', size: 8.2, bold: true, noWrap: true });

    // Row 1 of Section א: שם השוכר | מס' ת"ז | מס' הבקשה | ת. הגשת הבקשה
    put(5, spFullHe, 412, 538, 638.0, { align: 'center', size: 7.2, bold: true, yWrapCenter: 640.5, lineShift: 3.2, wrapSize: 5.8 });
    put(5, s.pf_sp_tz || '012345674', 318, 402, 638.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
    put(5, s.pf_req_num || '2026-98412', 195, 288, 638.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
    put(5, today.todayFull, 72, 165, 638.0, { align: 'center', size: 8.0, bold: true, noWrap: true });

    // Row 2 of Section א: עבור רעייתו/בעלה | מספר זהות/דרכון
    put(5, appFullHe, 338, 456, 611.0, { align: 'center', size: 7.2, bold: true, yWrapCenter: 613.5, lineShift: 3.2, wrapSize: 5.8 });
    put(5, s.pf_pass_num || 'FR9876543', 135, 245, 611.0, { align: 'center', size: 8.2, bold: true, noWrap: true });

    // Section ב: בעל/ת הנכס אשר נמצא ב | בכתובתי | והנכס רשום על שמי (יחידות דיור)
    put(5, il.city || 'חיפה', 245, 345, 590.5, { align: 'center', size: 8.2, bold: true, noWrap: true });
    put(5, ll[2] || (il.streetWithNum + ', ' + il.city), 45, 195, 590.5, { align: 'center', size: 7.8, bold: true, noWrap: true });
    put(5, 'יחידת דיור אחת רשומה בטאבו', 65, 295, 574.0, { align: 'center', size: 7.8, bold: true, noWrap: true });

    // Section ג: בגודל (מ"ר) | קומות | חדרים
    put(5, ll[3] || '84', 362, 408, 558.5, { align: 'center', size: 9.0, bold: true, noWrap: true });
    put(5, ll[4] || '2', 282, 325, 558.5, { align: 'center', size: 9.0, bold: true, noWrap: true });
    put(5, ll[5] || '3.5', 195, 238, 558.5, { align: 'center', size: 9.0, bold: true, noWrap: true });

    // Section ה: בקומה א (Y = 478.0, 461.0, 444.0)
    var floorARows = s._stressAllCheckboxes ? [
      { name: 'עמנואל ואביגיל לוי-גולדשמיט', father: 'מתתיהו', id: '012345674', rel: 'שוכרים ראשיים', date: '01/09/2026', paid_by: 'העברה בנקאית' },
      { name: 'אריאל אלכסנדר גולדשמיט', father: 'עמנואל', id: 'FR1122334', rel: 'בן השוכרת', date: '01/09/2026', paid_by: 'כלול בשכ״ד' },
      { name: 'נועה גבריאלה גולדשמיט', father: 'עמנואל', id: 'FR2233445', rel: 'בת השוכרת', date: '01/09/2026', paid_by: 'כלול בשכ״ד' }
    ] : (Array.isArray(s.pf_ll_floor_a_rows) && s.pf_ll_floor_a_rows.length ? s.pf_ll_floor_a_rows : []);
    [478.0, 461.0, 444.0].forEach(function(fy, rIdx) {
      var r = floorARows[rIdx];
      if (!r) return;
      put(5, r.name,    438, 554, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
      put(5, r.father,  366, 434, fy, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(5, r.id,      286, 362, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.rel,     206, 282, fy, { align: 'center', size: 7.0, bold: true, noWrap: true });
      put(5, r.date,    128, 202, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.paid_by,  36, 124, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
    });

    // Section ה: בקומה ב (Y = 398.0, 381.0, 364.0)
    var floorBRows = s._stressAllCheckboxes ? [
      { name: 'משה ושרה אהרן אלון', father: 'אהרן', id: '045678909', rel: 'בעלי הנכס', date: '01/01/2015', paid_by: 'בעלים' },
      { name: 'יוסף חיים אהרן אלון', father: 'משה', id: '312456780', rel: 'בן המשכיר', date: '01/01/2015', paid_by: 'סמוך על שולחנו' },
      { name: 'ללא דיירים נוספים', father: 'ללא', id: '000000000', rel: 'ללא', date: '01/09/2026', paid_by: 'ללא' }
    ] : (Array.isArray(s.pf_ll_floor_b_rows) ? s.pf_ll_floor_b_rows : []);
    [398.0, 381.0, 364.0].forEach(function(fy, rIdx) {
      var r = floorBRows[rIdx];
      if (!r) return;
      put(5, r.name,    438, 554, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
      put(5, r.father,  366, 434, fy, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(5, r.id,      286, 362, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.rel,     206, 282, fy, { align: 'center', size: 7.0, bold: true, noWrap: true });
      put(5, r.date,    128, 202, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.paid_by,  36, 124, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
    });

    // Section ו: Utility Checkboxes (חשמל, מים, טלפון, ארנונה)
    [313.0, 297.0, 281.0, 265.0].forEach(function(uy) {
      if (s._stressAllCheckboxes) check(5, 391.85, uy, 7.1, 7.1, 'green');
      check(5, 276.0,  uy, 7.1, 7.1, 'green');
    });

    // Section ז: התשלום מתבצע כדלקמן
    put(5, ll[6] || 'העברה בנקאית חודשית', 180, 405, 244.5, { align: 'center', size: 8.2, bold: true, noWrap: true });

    // Section ח: מצב משפחתי: רווק (458.5), נשוי (426.5), גרוש (392.5), אלמן (356.5) at exact Y = 223.5
    if (s._stressAllCheckboxes) {
      [464, 434.7, 405.7, 373.4].forEach(function(mx) { check(5, mx, 223.4, 7.1, 7.1, 'blue'); });
    } else {
      check(5, 434.7, 223.4, 7.1, 7.1, 'blue');
    }
    // מספר הילדים מתחת לגיל 18
    put(5, s.pf_ll_children_count || '3', 200, 232, 224.5, { align: 'center', size: 8.6, bold: true, noWrap: true });
    // המקצוע / העיסוק שלי
    put(5, s.pf_ll_occupation || 'מהנדס אזרחי ובעל נכסים', 38, 84, 233.0, { align: 'center', size: 6.5, bold: true });

    // Bottom Date (תאריך) — leave signature line blank
    put(5, today.todayFull, 418, 505, 158.5, { align: 'center', size: 9.0, bold: true, noWrap: true });
  }

  return await ctx.pdfDoc.save();
}

module.exports = {
  stampAsh6: stampAsh6,
  buildRandomStressPersona: core.buildRandomStressPersona
};

  });

  __define('stamp_security_cv.js', function(module, exports, require) {
'use strict';
var core = require('./stamper_core.js');

async function stampSecurityCv(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('security_cv_form.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check;
  var today = ctx.today, dob = ctx.dob, il = ctx.il, abr = ctx.abr, branchCity = ctx.branchCity || 'חיפה';

  var spGivenHe = (ctx.spGivenHe || 'בנימין אלעזר נחמיה').replace(/,/g, '');
  var spSurHe   = (ctx.spSurHe   || 'לוי-אפשטיין אשכנזי').replace(/,/g, '');
  var spFullHe  = (ctx.spFullHe  || (spGivenHe + ' ' + spSurHe)).replace(/,/g, '');

  var apGivenHe = (s.pf_given_he   || 'דבורה לאה עמנואלה').replace(/,/g, '');
  var apSurHe   = (s.pf_surname_he || 'גולדשמיט-ברנשטיין רבינוביץ').replace(/,/g, '');
  var apFullHe  = (apGivenHe + ' ' + apSurHe).trim();
  var apGivenEn = (s.pf_given_en   || 'DEVORAH LEAH EMMANUELLA').replace(/,/g, '');
  var apSurEn   = (s.pf_surname_en || 'GOLDSCHMIDT-BERNSTEIN').replace(/,/g, '');
  var fatherHe  = (s.pf_father_he  || 'שמואל בנימין אלכסנדר').replace(/,/g, '');
  var motherHe  = (s.pf_mother_he  || 'מרים אסתר ויקטוריה').replace(/,/g, '');
  var maidenHe  = (s.pf_maiden_he  || 'גולדשטיין-לוי').replace(/,/g, '');

  var tzNum     = s.pf_sp_tz || s.pf_tz || '012345674';
  var passNum   = s.pf_pass_num || 'FR9876543';
  var dobStr    = (dob && dob.full) || '23/11/1994';
  var spDobStr = core.splitIsoDate(ctx.spDobFull || s.pf_sp_dob).full || '15/07/1991';
  var marDate = core.splitIsoDate(s.pf_marriage_date).full || '14/06/2025';
  var dateStr   = (today && today.todayFull) || '12/11/2026';

  var ilCity     = (il.city || 'חיפה').replace(/,/g, '');
  var ilStreet   = (il.street || 'שדרות הרצל').replace(/,/g, '');
  var ilHouse    = (il.houseNum || '42') + ' דירה ' + (il.apt || '9');
  var ilZip      = il.zip || '3321400';
  var abrCountry = (ctx.abrCountryHe || ( ctx.abr && ctx.abr.country ) || 'צרפת').replace(/,/g, '');
  var abrCity = (ctx.abrCityHe || ( ctx.abr && ctx.abr.city ) || 'ליון').replace(/,/g, '');

  function estWidth(str, fontSize) {
    var sVal = String(str || '');
    var w = 0;
    for (var i = 0; i < sVal.length; i++) {
      var c = sVal.charCodeAt(i);
      if (c === 32) w += fontSize * 0.28;
      else if (c >= 65 && c <= 90) w += fontSize * 0.65; // Uppercase English is wider
      else if (c >= 48 && c <= 57) w += fontSize * 0.55;
      else w += fontSize * 0.53;
    }
    return w;
  }

  function wrapTextToLines(text, availW, fontSize, maxLines) {
    var raw = String(text || '').trim();
    if (!raw) return [];
    if (estWidth(raw, fontSize) <= availW || maxLines <= 1) return [raw];

    var words = raw.split(/\s+/);
    var lines = [];
    var cur = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var test = cur ? (cur + ' ' + w) : w;
      if (estWidth(test, fontSize) <= availW || !cur) {
        cur = test;
      } else {
        lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);

    if (lines.length > maxLines) {
      var balanced = [];
      var perLine = Math.ceil(words.length / maxLines);
      for (var k = 0; k < maxLines; k++) {
        var slice = words.slice(k * perLine, (k + 1) * perLine).join(' ');
        if (slice) balanced.push(slice);
      }
      return balanced;
    }
    return lines;
  }

  // STRICT BOX-CLAMPED HELPER: Never merges distinct array items (so Hebrew & English never mix on one line!)
  function putBox(p, textOrLines, x0, x1, yBottom, yTop, opts) {
    opts = opts || {};
    var inset = opts.inset !== undefined ? opts.inset : 2.0;
    var bx0 = +(x0 + inset).toFixed(1);
    var bx1 = +(x1 - inset).toFixed(1);
    var availW = Math.max(20, bx1 - bx0);
    var boxH = Math.max(10, yTop - yBottom);
    var baseSize = opts.size || 9.4;

    var lines = [];
    if (Array.isArray(textOrLines)) {
      var subMax = opts.subMaxLines || 2;
      for (var i = 0; i < textOrLines.length; i++) {
        var item = String(textOrLines[i] || '').trim();
        if (!item) continue;
        var sub = wrapTextToLines(item, availW, baseSize, subMax);
        for (var j = 0; j < sub.length; j++) lines.push(sub[j]);
      }
    } else {
      var maxL = opts.maxLines || (boxH >= 55 ? 4 : (boxH >= 34 ? 3 : (boxH >= 16 ? 2 : 1)));
      lines = wrapTextToLines(textOrLines, availW, baseSize, maxL);
    }

    var n = lines.length;
    if (!n) return;

    var fSize = baseSize;
    if (n === 2 && boxH < 21) fSize = Math.min(fSize, 8.5);
    if (n === 3 && boxH < 32) fSize = Math.min(fSize, 8.5);
    if (n >= 4 && boxH < 44) fSize = Math.min(fSize, 8.4);

    var gap = opts.gap || Math.min(fSize + 1.6, (boxH - 4) / Math.max(1, n));
    if (n > 1 && gap < fSize * 0.90) gap = fSize * 0.90;

    var yMid = (yBottom + yTop) / 2 - 2.4;
    var startY = yMid + ((n - 1) * gap) / 2;

    for (var idx = 0; idx < n; idx++) {
      put(p, lines[idx], bx0, bx1, +(startY - idx * gap).toFixed(1), {
        align: opts.align || 'center',
        size: fSize,
        bold: true,
        noWrap: true
      });
    }
  }

  function putUnderline(p, textOrLines, x0, x1, yLine, opts) {
    opts = opts || {};
    var inset = opts.inset !== undefined ? opts.inset : 1.5;
    var bx0 = +(x0 + inset).toFixed(1);
    var bx1 = +(x1 - inset).toFixed(1);
    var availW = Math.max(20, bx1 - bx0);
    var fSize = opts.size || 9.2;
    var maxLines = opts.maxLines || 2;

    var lines = Array.isArray(textOrLines)
      ? textOrLines.filter(Boolean)
      : wrapTextToLines(textOrLines, availW, fSize, maxLines);

    var n = lines.length;
    if (!n) return;
    var gap = opts.gap || (fSize - 0.2);
    var baseOffset = opts.lift !== undefined ? opts.lift : 2.6;

    for (var i = 0; i < n; i++) {
      var lineY = yLine + baseOffset + (n - 1 - i) * gap;
      put(p, lines[i], bx0, bx1, +lineY.toFixed(1), {
        align: opts.align || 'center',
        size: fSize,
        bold: true,
        noWrap: true
      });
    }
  }

  function putComb(p, val, vL, y, pad) {
    var n = vL.length - 1;
    var cl = pad ? String(val || '').replace(/\D/g, '').padStart(n, '0').slice(0, n) : String(val || '').replace(/[^A-Za-z0-9]/g, '').slice(0, n);
    var off = n - cl.length;
    for (var i = 0; i < cl.length; i++) {
      put(p, cl.charAt(i), vL[off + i], vL[off + i + 1], y, { align: 'center', size: 9.6, bold: true, noWrap: true });
    }
  }

  function fillLines(p, ys, arr) {
    for (var i = 0; i < ys.length; i++) {
      var txt = arr[i] || arr[arr.length - 1];
      put(p, txt, 58.0, 536.0, +(ys[i] + 3.0).toFixed(1), { align: 'right', size: 9.0, bold: true, noWrap: true });
    }
  }

  // =========================================================================
  // PAGE 1 (index 0): Attachment Checkboxes + Invitee Items 1 to 5
  //   Cell 1 is 96.1pt tall (y = 299.1..395.2)!
  //   We pass 5 distinct lines so Hebrew & English NEVER mix and English is 2 full-size 9.5pt BOLD rows!
  // =========================================================================
  [623.8, 590.2, 556.5, 522.9].forEach(function(y) { check(0, 524.7, y, 7.1, 7.1, 'green'); });

  putBox(0, [
    apGivenHe + ' ' + apSurHe,
    'בת ' + fatherHe,
    'אם: ' + motherHe,
    apGivenEn,
    apSurEn
  ], 58.0, 327.0, 299.1, 395.2, { size: 9.5, subMaxLines: 1, gap: 15.5 });

  putBox(0, maidenHe,                                              58.0, 327.0, 256.6, 299.1, { size: 9.6 });
  putBox(0, 'בן/בת זוג נשוי/אה כחוק של המזמין הישראלי',             58.0, 327.0, 211.8, 256.6, { size: 9.4, maxLines: 2 });
  putBox(0, dobStr,                                                58.0, 327.0, 170.2, 211.8, { size: 9.8 });
  putBox(0, ['דרכון זר בתוקף מס׳: ' + passNum, '(ללא ת״ז אזור)'],  58.0, 327.0,  70.1, 170.2, { size: 9.5, gap: 13.0 });

  // =========================================================================
  // PAGE 2 (index 1): Invitee Items 6 to 19
  // =========================================================================
  putBox(1, abrCity + ' — ' + abrCountry,                          58.0, 327.0, 745.1, 796.4, { size: 9.5 });
  putBox(1, 'ללא — נישואין ראשונים',                                58.0, 327.0, 700.3, 745.1, { size: 9.4 });
  putBox(1, marDate + ' — ' + abrCity + ' ' + abrCountry,          58.0, 327.0, 655.4, 700.3, { size: 9.4 });
  putBox(1, '3 ילדים משותפים',                                      58.0, 327.0, 607.4, 655.4, { size: 9.5 });
  putBox(1, '2 אחים ואחיות (ללא אחים חורגים)',                      58.0, 327.0, 546.5, 607.4, { size: 9.4 });
  putBox(1, [
    'אזרחות ' + (s.pf_citizenship || 'צרפתית'),
    'דרכון נוכחי: ' + passNum + ' | קודם: FR1122334'
  ], 58.0, 327.0, 468.9, 546.5, { size: 9.4, gap: 12.5 });

  // 12. Current address in Israel
  putBox(1, 'ישראל',   260.4, 327.6, 426.4, 455.2, { size: 9.4 });
  putBox(1, ilCity,    193.1, 259.5, 426.4, 455.2, { size: 9.4 });
  putBox(1, ilStreet,  125.0, 192.2, 426.4, 455.2, { size: 9.2, maxLines: 2 });
  putBox(1, ilHouse,    57.7, 124.2, 426.4, 455.2, { size: 9.2, maxLines: 2 });

  // 13. Address in country of origin
  putBox(1, abrCountry, 260.4, 327.6, 376.0, 410.4, { size: 9.4 });
  putBox(1, abrCity,    193.1, 259.5, 376.0, 410.4, { size: 9.4 });
  putBox(1, 'רפובליק',   125.0, 192.2, 376.0, 410.4, { size: 9.2, maxLines: 2 });
  putBox(1, '18 דירה 4',  57.7, 124.2, 376.0, 410.4, { size: 9.2, maxLines: 2 });

  // 14 & 15. Phones
  putBox(1, ['04-8223344 (ישראל)', '+33-4-72112233 (חו״ל)'],        58.0, 327.0, 331.1, 376.0, { size: 9.4 });
  putBox(1, [s.pf_phone_il || '058-765-4321', '+33-6-12345678'],   58.0, 327.0, 286.3, 331.1, { size: 9.5 });
  putBox(1, s.pf_email || 'devorah.applicant@example.com',         58.0, 327.0, 241.4, 286.3, { size: 9.2 });
  putBox(1, s._stressAllCheckboxes ? ['facebook.com/devorah.profile', '(ללא חשבונות נוספים)'] : ['ללא חשבון פייסבוק פעיל'], 58.0, 327.0, 174.2, 241.4, { size: 9.4 });
  putBox(1, ['אדריכלית נוף בכירה', 'ומתכננת ערים'],                 58.0, 327.0, 101.3, 174.2, { size: 9.5 });

  // 19. Workplace in Israel
  putBox(1, 'ישראל',        260.4, 327.6, 62.9, 87.7, { size: 9.2 });
  putBox(1, ilCity,         193.1, 259.5, 62.9, 87.7, { size: 9.2 });
  putBox(1, 'שד׳ המגינים',   125.0, 192.2, 62.9, 87.7, { size: 9.0, maxLines: 2 });
  putBox(1, '55 (סטודיו)',    57.7, 124.2, 62.9, 87.7, { size: 9.0, maxLines: 2 });

  // =========================================================================
  // PAGE 3 (index 2): Invitee Items 19 (cont.) to 26 + Israeli Inviter Items 1 to 5
  // =========================================================================
  putBox(2, abrCountry,     260.4, 327.6, 758.7, 796.4, { size: 9.2 });
  putBox(2, abrCity,        193.1, 259.5, 758.7, 796.4, { size: 9.2 });
  putBox(2, 'אדריכלות ליון',  125.0, 192.2, 758.7, 796.4, { size: 9.0, maxLines: 2 });
  putBox(2, '12 (סניף)',      57.7, 124.2, 758.7, 796.4, { size: 9.0, maxLines: 2 });

  putBox(2, '04-8556677',                                 58.0, 327.0, 719.5, 758.7, { size: 9.6 });
  putBox(2, '054-9988776',                                58.0, 327.0, 655.4, 719.5, { size: 9.6 });
  putBox(2, 'studio.design@example.co.il',                58.0, 327.0, 591.4, 655.4, { size: 9.2 });
  putBox(2, ['כן — שהייה כחוק', 'באשרת ב/2 ואשרת א/2'],    58.0, 275.0, 546.5, 591.4, { size: 9.2 });

  putUnderline(2, '01/09/2024 (כניסה בנתב״ג ב/2)',         63.3, 246.0, 530.1, { size: 9.0, maxLines: 1 });
  putUnderline(2, '01/12/2026 (מעבר לאשרת א/2)',           63.3, 302.0, 510.9, { size: 9.0, maxLines: 1 });
  putUnderline(2, '01/09/2024',                           65.7, 254.0, 492.5, { size: 9.4, maxLines: 1 });
  putUnderline(2, '01/12/2026 — שהייה רציפה כחוק',         64.1, 295.0, 473.2, { size: 9.0, maxLines: 1 });

  putBox(2, [
    'רישיון נהיגה צרפתי ובינלאומי בתוקף',
    'מס׳ 998877 — הונפק ב' + abrCity + ' ' + abrCountry
  ], 58.0, 327.0, 384.0, 464.0, { size: 9.4, gap: 12.5 });

  putBox(2, ilCity,   237.9, 327.6, 322.3, 368.0, { size: 9.4 });
  putBox(2, ilStreet, 148.2, 237.1, 322.3, 368.0, { size: 9.2, maxLines: 2 });
  putBox(2, ilHouse,   57.7, 147.4, 322.3, 368.0, { size: 9.2, maxLines: 2 });

  putBox(2, [spGivenHe + ' ' + spSurHe, 'בן אברהם משה ויצחק'], 56.0, 327.0, 225.4, 271.0, { size: 9.4 });
  putBox(2, spDobStr,                                          56.0, 327.0, 180.6, 225.4, { size: 9.6 });
  putBox(2, 'ישראל',    191.5, 327.6, 135.7, 167.0, { size: 9.4 });
  putBox(2, 'ירושלים',   55.3, 190.7, 135.7, 167.0, { size: 9.4 });
  putBox(2, ['בן/בת זוג נשוי/אה כחוק', '(בעל/אישה)'],           56.0, 327.0,  90.9, 135.7, { size: 9.4 });
  putBox(2, 'אזרחות ישראלית בלבד — ת״ז ' + tzNum,               56.0, 327.0,  65.3,  90.9, { size: 9.2 });

  // =========================================================================
  // PAGE 4 (index 3): Israeli Inviter Items 5 (cont.) to 15
  // =========================================================================
  putBox(3, ['דרכון ישראלי מס׳ 34567891', '(ללא אזרחות זרה נוספת)'], 56.0, 327.0, 719.5, 796.4, { size: 9.4 });
  putBox(3, ilCity,   237.1, 327.6, 637.0, 697.1, { size: 9.4 });
  putBox(3, ilStreet, 145.8, 236.3, 637.0, 697.1, { size: 9.2, maxLines: 2 });
  putBox(3, ilHouse,   55.3, 145.0, 637.0, 697.1, { size: 9.2, maxLines: 2 });

  putBox(3, '04-8223344',                                 56.0, 327.0, 592.2, 637.0, { size: 9.6 });
  putBox(3, s.pf_phone_il || '058-765-4321',               56.0, 327.0, 547.3, 592.2, { size: 9.6 });
  putBox(3, marDate,                                      56.0, 327.0, 502.5, 547.3, { size: 9.6 });
  putBox(3, 'binyamin.inviter@example.co.il',             56.0, 327.0, 457.6, 502.5, { size: 9.2 });
  putBox(3, 'facebook.com/binyamin.inviter',              56.0, 327.0, 406.4, 457.6, { size: 9.2 });
  putBox(3, ['מהנדס מערכות מידע', 'ומנהל פרויקטים בכיר'],  56.0, 327.0, 361.5, 406.4, { size: 9.4 });

  putBox(3, 'אלביט מערכות בע״מ — פארק מת״מ חיפה',         56.0, 327.0, 336.7, 361.5, { size: 9.2 });
  putBox(3, 'אזור תעשייה עתירת מדע מת״מ דרום חיפה',       56.0, 327.0, 311.1, 336.7, { size: 9.0 });
  putBox(3, 'דרך הפלי״ם',                                  237.1, 327.6, 268.6, 299.1, { size: 9.2 });
  putBox(3, '12 בניין ב׳',                                145.8, 236.3, 268.6, 299.1, { size: 9.2 });
  putBox(3, ilZip,                                         55.3, 145.0, 268.6, 299.1, { size: 9.4 });

  putBox(3, '04-8315500',                                 56.0, 327.0, 223.8, 268.6, { size: 9.6 });
  putBox(3, 'hr.haifa@elbitsystems.co.il',                56.0, 327.0, 179.8, 223.8, { size: 9.2 });

  // =========================================================================
  // PAGES 5, 6, 7 (indices 4, 5, 6): Ruled Biography & Security Lines
  // =========================================================================
  fillLines(4, [766.7, 747.5, 729.1, 709.9, 690.6, 672.2, 653.0], [
    '1. שנות ילדות ונעורים (1994–2012): נולדה וגדלה בעיר ' + abrCity + ' (' + abrCountry + '), רחוב רפובליק 18.',
    '2. לימודי תיכון (2009–2012): תיכון עירוני מרכזי ב' + abrCity + ' — סיום תעודת בגרות מלאה בהצטיינות.',
    '3. לימודים אקדמיים (2012–2017): מגורים בשדרות ז׳אן ז׳ורס 45 ב' + abrCity + ' (' + abrCountry + ').',
    '4. עבודה מקצועית (2017–2021): מגורים ברחוב ויקטור הוגו 29 ב' + abrCity + ', משרד אדריכלות נוף.',
    '5. היכרות ונישואין (2021–2024): מגורים משותפים ב' + abrCity + ' וביקורים סדירים בישראל.',
    '6. כניסה לישראל ומגורים בחיפה (2024–2026): מגורים משותפים ב' + ilStreet + ' ' + ilHouse + ', ' + ilCity + '.',
    '7. כלל המעברים תועדו במלואם במרשם האוכלוסין המקומי וללא כל שהייה בלתי חוקית.'
  ]);
  fillLines(4, [577.0, 558.5, 539.3, 520.1, 501.7, 482.5], [
    '1. 2012–2015: האוניברסיטה הלאומית ב' + abrCity + ' — תואר ראשון (B.A) באדריכלות ותכנון עירוני.',
    '2. 2015–2017: המכון הגבוה לאדריכלות נוף ב' + abrCity + ' — תואר שני (M.A) בתכנון סביבתי.',
    '3. 2019–2020: קורס הסמכה במערכות מידע גיאוגרפיות (GIS) ותכנון בר-קיימא — לשכת האדריכלים.',
    '4. 2024–2025: לימודי שפה עברית (אולפן מתקדמים) ולימודי יהדות וגיור במסגרת מוכרת ב' + ilCity + '.',
    '5. 2025–2026: השלמת בחינות רישוי מקצועיות והתאמת תעודות אקדמיות מול משרד החינוך בישראל.',
    '6. מצורפים העתקים מאומתים (אפוסטיל) של כלל התעודות האקדמיות וגיליונות הציונים.'
  ]);
  fillLines(4, [407.2, 388.0, 368.8, 349.5, 331.1, 311.9, 292.7, 274.3], [
    '1. שנת 2014: מלגת הצטיינות אקדמית שנתית מטעם הפקולטה לאדריכלות באוניברסיטת ' + abrCity + '.',
    '2. שנת 2016: מענק מחקר לתזה לתואר שני מטעם משרד החינוך והמחקר ב' + abrCountry + '.',
    '3. מעבר לשתי מלגות הצטיינות אלו, המוזמנת לא קיבלה מלגות מכל קרן זרה או ממשלתית אחרת.',
    '4. המוזמנת מעולם לא קיבלה מימון או סיוע מגוף פוליטי, דתי או ארגון בינלאומי כלשהו.',
    '5. כלל שכר הלימוד והוצאות המחיה מומנו מחסכונות אישיים ומסיוע הוריה של המוזמנת בלבד.',
    '6. אין ולא היו התחייבויות כספיות או תעסוקתיות כלפי שום קרן או מוסד מממן בחו״ל.',
    '7. אישורי המלגות האקדמיות מהאוניברסיטה שמורים וזמינים להצגה לפי דרישה.',
    '8. ללא הערות או מלגות נוספות.'
  ]);
  fillLines(4, [198.2, 179.0, 160.6, 141.3, 122.1, 103.7, 84.5, 65.3], [
    '1. שווייץ (ז׳נבה וציריך) — יולי 2018 (10 ימים): חופשה משפחתית וטיול תיירותי.',
    '2. איטליה (רומא ופירנצה) — אפריל 2019 (7 ימים): סיור לימודי אדריכלי וחופשה.',
    '3. ספרד (ברצלונה ומדריד) — אוגוסט 2021 (8 ימים): חופשה שנתית משותפת.',
    '4. יוון (אתונה וכרתים) — אוגוסט 2022 (6 ימים): ירח דבש לאחר הנישואין.',
    '5. קפריסין (לרנקה) — מאי 2023 (4 ימים): חופשה קצרה.',
    '6. ישראל — דצמבר 2023 (14 ימים): ביקור משפחתי ראשון בישראל באשרת תייר ב/2.',
    '7. ישראל — ספטמבר 2024 ועד היום: כניסה כחוק בנתב״ג ומגורים משותפים עם בן הזוג ב' + ilCity + '.',
    '8. המוזמנת מעולם לא ביקרה או שהתה במדינות ערב או במדינות עוינות.'
  ]);

  fillLines(5, [786.0], ['9. כל הכניסות והיציאות מתועדות במלואן בדרכון הזר מס׳ ' + passNum + ' המצורף לבקשה זו.']);
  fillLines(5, [717.1, 697.9, 679.5, 660.2, 641.0], [
    '1. 2017–2020: אדריכלית נוף זוטרה במשרד תכנון עירוני ב' + abrCity + ' (' + abrCountry + ').',
    '2. 2020–2024: אדריכלית נוף בכירה ומנהלת פרויקטים במשרד אדריכלות ב' + abrCity + '.',
    '3. 2024–2025: לימודי אולפן עברית וגיור בישראל (ללא עבודה בשכר בתקופת הלימודים).',
    '4. 2025–2026: יועצת תכנון ואדריכלות נוף בסטודיו תכנון בשדרות המגינים 55, ' + ilCity + '.',
    '5. המוזמנת מעולם לא עבדה בשירות ממשלתי, צבאי, משטרתי או ביטחוני כלשהו.'
  ]);
  fillLines(5, [548.9, 530.5, 511.3, 492.1, 472.9, 454.4], [
    'לא קיים כל קשר — המוזמנת מעולם לא הייתה בקשר עם ארגוני מודיעין זרים או גורמי מודיעין ברש״פ.',
    'המוזמנת מעולם לא נעצרה, לא נחקרה, לא עוכבה ולא זומנה לחקירה על ידי גורם מודיעין כלשהו.',
    'אין ולא הייתה למוזמנת כל היכרות אישית או מקצועית עם גורמי מודיעין בארץ המוצא או מחוצה לה.',
    'המוזמנת לא התבקשה מעולם למסור מידע או לשתף פעולה עם שום גוף מודיעיני זר.',
    'כלל פעילותה של המוזמנת בארץ המוצא ובישראל הייתה אזרחית, לימודית ומשפחתית בלבד.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(5, [382.4, 363.1, 344.7, 325.5, 306.3, 287.9], [
    'לא קיים כל קשר — למוזמנת אין ולא היה כל קשר עם פעילים במנגנוני המודיעין או הביטחון של הרש״פ.',
    'המוזמנת אינה מכירה פעילים או עובדים במנגנוני הביטחון של הרשות הפלסטינית.',
    'המוזמנת לא שהתה בשטחי הרשות הפלסטינית ולא קיימה קשרים עסקיים או חברתיים עם גורמים אלו.',
    'גם לבן הזוג הישראלי ולבני משפחתו אין כל קשר לפעילים במנגנונים אלו.',
    'כלל הפרטים נבדקו ואומתו במלואם.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(5, [215.8, 196.6, 178.2, 158.9, 139.8, 120.5], [
    'אין — אף אחד מבני משפחתה של המוזמנת אינו עובד ולא עבד במנגנוני מודיעין או ביטחון כלשהם.',
    'הורי המוזמנת ואחיה עובדים במקצועות אזרחיים לחלוטין (הנדסה, חינוך, רפואה וניהול) בארץ המוצא.',
    'אף בן משפחה מדרגה ראשונה או שנייה אינו מועסק בארגוני מודיעין זרים או ברשות הפלסטינית.',
    'אין במשפחת המוזמנת או במשפחת המזמין מי ששירת בגופי מודיעין זרים.',
    'פרטי העיסוק של כלל בני המשפחה מפורטים בטבלת בני המשפחה בעמודים 8–9 לטופס זה.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);

  fillLines(6, [786.0, 766.7, 747.5, 729.1, 709.9, 690.6, 672.2, 653.0], [
    'אין — אף אחד מבני משפחת המוזמנת אינו עובד במוסדות הרשות הפלסטינית.',
    'אף אחד מבני המשפחה אינו נושא תפקיד ממשלתי, פוליטי או דיפלומטי במדינת המוצא.',
    'אבי המוזמנת (' + fatherHe + ') עבד כמהנדס אזרחי במגזר הפרטי ב' + abrCity + ' ופרש לגמלאות.',
    'אם המוזמנת (' + motherHe + ') עבדה כמורה בבית ספר תיכון ב' + abrCity + '.',
    'אחי המוזמנת ואחותה מועסקים בחברות מסחריות פרטיות ב' + abrCountry + ' בלבד.',
    'אין לבני המשפחה כל זיקה למוסדות שלטון זרים או לגופים ציבוריים ברש״פ.',
    'כלל הפרטים התעסוקתיים של המשפחה גלויים ומתועדים במלואם.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [560.9, 541.7, 522.5, 504.1, 484.9, 465.6], [
    'לא קיים כל קשר — למוזמנת אין ולא היה מעולם קשר לאנשים או לארגונים הקשורים לטרור.',
    'המוזמנת מעולם לא הייתה חברה, תומכת או פעילה בארגון שהוכרז כבלתי חוקי בישראל או בעולם.',
    'המוזמנת לא תרמה כספים ולא סייעה במישרין או בעקיפין לשום התארגנות אסורה או עוינת.',
    'הצהרה מלאה בעניין זה נחתמה גם במסגרת תצהיר נספח א׳ המצורף לבקשה.',
    'רקע המוזמנת נקי לחלוטין כעולה מתעודת היושר הרשמית מארץ המוצא.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [373.5, 355.1, 335.9, 316.7, 297.5, 279.1], [
    'לא — המוזמנת מעולם לא עוכבה, לא נחקרה, לא נעצרה, לא הואשמה ולא הורשעה בעבירה כלשהי.',
    'למוזמנת אין כל רישום פלילי או ביטחוני בישראל או במדינת המוצא (' + abrCountry + ').',
    'מצורפת תעודת יושר מקורית ומתורגמת מאומתת בחותמת אפוסטיל.',
    'מעולם לא הוצא נגד המוזמנת צו הרחקה, צו מניעת כניסה או צו מעצר כלשהו.',
    'כל כניסותיה של המוזמנת לישראל דרך מעברי הגבול עברו באופן תקין וחוקי.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [184.6, 165.4, 146.2, 126.9, 108.5, 89.3], [
    'לא קיים כל קשר — למוזמנת אין קשר ישיר או עקיף עם מדינות ערב.',
    'למוזמנת אין בני משפחה המתגוררים במדינות ערב.',
    'למוזמנת אין נכסים, חשבונות בנק או קשרים עסקיים במדינות ערב.',
    'המוזמנת לא ביקרה במדינות ערב ולא קיימה קשרים טלפוניים או מסחריים עמן.',
    'כלל קשריה המשפחתיים של המוזמנת נמצאים בישראל וב' + abrCountry + ' בלבד.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);

  // =========================================================================
  // PAGE 8 (index 7): Landscape Family Table Part 1 (8 Rows)
  // =========================================================================
  var p8Bounds = [
    [334.5, 376.9], [292.0, 334.5], [251.9, 292.0], [212.7, 251.9],
    [183.1, 212.7], [147.8, 183.1], [115.8, 147.8], [ 77.3, 115.8]
  ];
  var p8Rows = [
    { name: [fatherHe, (s.pf_father_en || 'SAMUEL').split(' ')[0]],   dob: '12/04/1965', id: 'FR4455661', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223344', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [motherHe, (s.pf_mother_en || 'MIRIAM').split(' ')[0]],      dob: '08/09/1968', id: 'FR4455662', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223355', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [motherHe, (s.pf_mother_en || 'MIRIAM').split(' ')[0]],      dob: '08/09/1968', id: 'FR4455662', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223355', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [fatherHe, (s.pf_father_en || 'SAMUEL').split(' ')[0]],   dob: '12/04/1965', id: 'FR4455661', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223344', freq: ['גבוהה', 'נשואים זה לזו'] },
    { name: ['דוד שמואל ' + maidenHe, 'DAVID'],  dob: '19/03/1992', id: 'FR7788991', addr: [abrCountry + ' פריז', 'ויקטור הוגו 10'],        tel: '+33-1445566', mob: '+33-677889900', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['שרה לאה ' + maidenHe, 'SARAH'],    dob: '25/06/1993', id: 'FR7788992', addr: [abrCountry + ' פריז', 'ויקטור הוגו 10'],        tel: '+33-1445566', mob: '+33-677889911', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['חנה רחל ' + maidenHe, 'HANNAH'],   dob: '04/11/1998', id: 'FR7788993', addr: [abrCountry + ' ' + abrCity, 'שד׳ ז׳ורס 22'],   tel: '+33-4729988', mob: '+33-688990011', freq: ['גבוהה', 'קשר חודשי'] },
    { name: ['מיכאל אהרן כהן', 'MICHAEL COHEN'], dob: '17/01/1997', id: 'FR7788994', addr: [abrCountry + ' ' + abrCity, 'שד׳ ז׳ורס 22'],   tel: '+33-4729988', mob: '+33-688990022', freq: ['בינונית', 'חגים ומועדים'] }
  ];
  for (var r8 = 0; r8 < p8Rows.length; r8++) {
    var d8 = p8Rows[r8], b8 = p8Bounds[r8];
    putBox(7, d8.name, 571.8, 687.8, b8[0], b8[1], { size: 9.2, subMaxLines: 1 });
    putBox(7, d8.dob,  510.9, 570.9, b8[0], b8[1], { size: 9.4, maxLines: 1 });
    putBox(7, d8.id,   418.8, 510.0, b8[0], b8[1], { size: 9.5, maxLines: 1 });
    putBox(7, d8.addr, 319.5, 418.0, b8[0], b8[1], { size: 9.0, subMaxLines: 1 });
    putBox(7, d8.tel,  261.0, 318.7, b8[0], b8[1], { size: 9.2, maxLines: 1 });
    putBox(7, d8.mob,  189.0, 260.2, b8[0], b8[1], { size: 9.2, maxLines: 1 });
    putBox(7, d8.freq,  97.0, 188.1, b8[0], b8[1], { size: 9.2, subMaxLines: 1 });
  }

  // =========================================================================
  // PAGE 9 (index 8): Landscape Family Table Part 2 (8 Rows)
  // =========================================================================
  var p9Bounds = [
    [372.1, 411.4], [333.6, 372.1], [295.2, 333.6], [256.0, 295.2],
    [217.5, 256.0], [176.7, 217.5], [138.2, 176.7], [ 98.1, 138.2]
  ];
  var p9Rows = [
    { name: ['נתנאל יוסף ' + maidenHe, 'NATHANIEL'], dob: '11/02/1996', id: 'FR7788995', addr: [abrCountry + ' מרסיי', 'שד׳ פראדו 14'],     tel: '+33-4912233', mob: '+33-699112233', freq: ['בינונית', 'קשר חודשי'] },
    { name: ['רבקה אסתר לוי', 'REBECCA LEVY'],       dob: '29/08/1997', id: 'FR7788996', addr: [abrCountry + ' מרסיי', 'שד׳ פראדו 14'],     tel: '+33-4912233', mob: '+33-699112244', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['עמנואל דניאל ' + maidenHe, 'EMMANUEL'], dob: '03/05/2000', id: 'FR7788997', addr: [abrCountry + ' ' + abrCity, 'רח׳ לפאייט 9'], tel: '+33-4724455', mob: '+33-699112255', freq: ['גבוהה', 'קשר שבועי'] },
    { name: ['נעמי חווה מרטין', 'NAOMI MARTIN'],     dob: '18/12/2001', id: 'FR7788998', addr: [abrCountry + ' ' + abrCity, 'רח׳ לפאייט 9'], tel: '+33-4724455', mob: '+33-699112266', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['אריאל אלכסנדר', spSurHe, 'ARIEL'],     dob: '14/05/2018', id: '334455661', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['ללא בן/בת זוג', '(קטין סמוך להוריו)'],  dob: '14/05/2018', id: '334455661', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['נועה גבריאלה', spSurHe, 'NOA'],        dob: '22/09/2020', id: '334455662', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['ללא בן/בת זוג', '(קטינה סמוכה להוריה)'], dob: '22/09/2020', id: '334455662', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] }
  ];
  for (var r9 = 0; r9 < p9Rows.length; r9++) {
    var d9 = p9Rows[r9], b9 = p9Bounds[r9];
    putBox(8, d9.name, 577.4, 690.2, b9[0], b9[1], { size: 9.2, subMaxLines: 1 });
    putBox(8, d9.dob,  519.7, 576.5, b9[0], b9[1], { size: 9.4, maxLines: 1 });
    putBox(8, d9.id,   427.6, 518.9, b9[0], b9[1], { size: 9.5, maxLines: 1 });
    putBox(8, d9.addr, 340.3, 426.8, b9[0], b9[1], { size: 9.0, subMaxLines: 1 });
    putBox(8, d9.tel,  261.0, 339.5, b9[0], b9[1], { size: 9.2, maxLines: 1 });
    putBox(8, d9.mob,  189.8, 260.2, b9[0], b9[1], { size: 9.2, maxLines: 1 });
    putBox(8, d9.freq,  84.9, 188.9, b9[0], b9[1], { size: 9.2, subMaxLines: 1 });
  }

  // =========================================================================
  // PAGE 10 (index 9): Friends Table, Relationship, Visits & Permits
  // =========================================================================
  var frBounds = [
    [601.0, 619.4], [582.5, 601.0], [564.1, 582.5],
    [545.7, 564.1], [527.3, 545.7], [508.9, 527.3]
  ];
  var friends = [
    { name: 'יעל מרים כהן',     dob: '10/02/1993', id: '034455667', addr: ['ישראל, חיפה', 'שד׳ הנשיא 88 דירה 4'],   tel: '04-8112233', mob: '052-4455661',   freq: 'גבוהה — שבועי' },
    { name: 'אביגיל רות לוי',    dob: '18/07/1994', id: '035566778', addr: ['ישראל, חיפה', 'רח׳ מוריה 15 דירה 2'],   tel: '04-8112244', mob: '054-5566772',   freq: 'גבוהה — שבועי' },
    { name: 'דניאל יוסף פרידמן', dob: '05/11/1990', id: '036677889', addr: ['ישראל, ירושלים', 'רח׳ הפלמ״ח 9 דירה 7'], tel: '02-6334455', mob: '050-6677883',   freq: 'בינונית — חודשי' },
    { name: 'נועה אסתר רוזנברג', dob: '29/04/1995', id: '037788990', addr: ['ישראל, תל אביב', 'אבן גבירול 40 דירה 5'], tel: '03-5223344', mob: '058-7788994',   freq: 'בינונית — חודשי' },
    { name: 'קלייר סופי מרטין',  dob: '12/09/1994', id: 'FR8899001', addr: [abrCountry + ', ' + abrCity, 'שד׳ ז׳ורס 14'], tel: '+33-4723344', mob: '+33-612340011', freq: 'בינונית — חגים' },
    { name: 'מארק אנרי ברנרד',   dob: '21/01/1992', id: 'FR8899002', addr: [abrCountry + ', פריז', 'רח׳ ריבולי 30'],  tel: '+33-1423344', mob: '+33-612340022', freq: 'נמוכה — שנתי' }
  ];
  for (var fIdx = 0; fIdx < friends.length; fIdx++) {
    var fr = friends[fIdx], fb = frBounds[fIdx];
    putBox(9, fr.name, 469.4, 544.7, fb[0], fb[1], { size: 8.8, maxLines: 2 });
    putBox(9, fr.dob,  408.5, 468.6, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.id,   333.2, 407.7, fb[0], fb[1], { size: 9.0, maxLines: 1 });
    putBox(9, fr.addr, 235.5, 332.4, fb[0], fb[1], { size: 8.4, subMaxLines: 1, gap: 7.4 });
    putBox(9, fr.tel,  178.6, 234.7, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.mob,  100.1, 177.8, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.freq,  22.4,  99.3, fb[0], fb[1], { size: 8.6, maxLines: 2 });
  }

  fillLines(9, [418.4, 400.0, 382.4, 364.0, 344.7], [
    '1. בני הזוג הכירו בחודש מרץ 2021 באמצעות חברים משותפים בקהילה היהודית ב' + abrCity + ' (' + abrCountry + ').',
    '2. לאחר קשר זוגי רציף ומגורים משותפים, בני הזוג נישאו כדת וכדין ביום ' + marDate + ' ב' + abrCity + '.',
    '3. מאז הנישואין בני הזוג מקיימים משק בית משותף ומגדלים יחד את ילדיהם המשותפים.',
    '4. בשנת 2024 נכנסו לישראל כחוק ועברו להתגורר בדירתם הקבועה ב' + ilStreet + ' ' + ilHouse + ', ' + ilCity + '.',
    '5. מצורפים לבקשה תצהירים, תמונות משותפות, חוזה שכירות, חשבונות משותפים ואישורי קהילה.'
  ]);

  putUnderline(9, '1) 10/12/2023 – 24/12/2023 (ביקור משפחתי ב/2)',              56.9, 346.9, 282.3, { size: 9.0, maxLines: 1 });
  putUnderline(9, '2) 01/09/2024 – הווה (שהייה רציפה ב' + ilCity + ' ב/2 וא/2)', 56.9, 369.3, 264.6, { size: 9.0, maxLines: 1 });

  var pmBounds = [[150.2, 175.8], [124.5, 150.2], [98.9, 124.5], [74.1, 98.9]];
  var permits = [
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['ביקור משפחתי', 'ואיחוד משפחות (ב/2)'], from: '10/12/2023', to: '24/12/2023' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['כניסה לחיים', 'משותפים (ב/2)'],         from: '01/09/2024', to: '01/03/2025' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['אשרת א/2 לימודי', 'גיור מוכרים'],       from: '01/03/2025', to: '01/03/2026' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['הארכת אשרת א/2', 'והליך מעמד'],         from: '01/03/2026', to: '01/03/2027' }
  ];
  for (var pIdx = 0; pIdx < permits.length; pIdx++) {
    var pm = permits[pIdx], pb = pmBounds[pIdx];
    putBox(9, pm.inv,    391.7, 509.5, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.place,  278.8, 390.9, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.reason, 165.0, 278.0, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.from,   109.0, 164.2, pb[0], pb[1], { size: 9.0, maxLines: 1 });
    putBox(9, pm.to,      52.1, 108.1, pb[0], pb[1], { size: 9.0, maxLines: 1 });
  }

  // =========================================================================
  // PAGE 11 (index 10): Item 13, Declaration, Comb Grids & Lawyer Attestation
  // =========================================================================
  fillLines(10, [747.5, 729.1, 709.9, 690.6, 672.2], [
    '1. כלל הפרטים והתאריכים בטופס קורות חיים זה נבדקו ואומתו אל מול מסמכי המקור הרשמיים.',
    '2. בני הזוג מנהלים מרכז חיים משותף, קבוע ובלעדי ב' + ilCity + ' ומציגים תשתית ראייתית מלאה.',
    '3. לבקשה מצורפים: תעודות לידה, תעודת נישואין, תעודת יושר (כולן עם אפוסטיל) וצילומי דרכונים.',
    '4. כמו כן מצורפות 3 תמונות פספורט של המוזמנת ו-3 תמונות פספורט של המזמין הישראלי כנדרש.',
    '5. אנו עומדים לרשות לשכת רשות האוכלוסין ב' + branchCity + ' להמצאת כל מסמך נוסף שיידרש.'
  ]);

  putUnderline(10, 'א/5 / מעמד קבע', 56.9, 171.4, 544.9, { size: 9.4, maxLines: 1 });
  putUnderline(10, 'א/5',            56.9, 193.8, 491.3, { size: 9.6, maxLines: 1 });

  var combV = [403.34, 419.35, 434.58, 450.6, 466.63, 481.85, 497.88, 513.88, 529.1, 545.13];
  putComb(10, tzNum, combV, 403.1, true);
  putUnderline(10, [spGivenHe, spSurHe], 215.5, 386.1, 399.2, { size: 9.2, gap: 8.6, lift: 2.2 });

  putComb(10, passNum, combV, 343.8, false);
  putUnderline(10, [apGivenHe, apSurHe], 215.5, 386.1, 339.9, { size: 9.2, gap: 8.6, lift: 2.2 });

  if (s._stressAllCheckboxes) {
    putUnderline(10, 'רותם אברהמי',                 394.9, 503.1, 259.9, { size: 9.4, maxLines: 1 });
    putUnderline(10, '88412',                       250.7, 346.9, 259.9, { size: 9.6, maxLines: 1 });
    putUnderline(10, 'שד׳ הפלי״ם 15 ' + branchCity, 106.5, 235.5, 259.9, { size: 9.0, maxLines: 1 });
  }

  // מר/גב' [322.8..508.7]: Single declarant name (spFullHe) fits on 1 crisp 9.5pt BOLD line!
  putUnderline(10, spFullHe, 322.8, 508.7, 237.4, { size: 9.5, maxLines: 1 });
  putUnderline(10, dateStr,  106.5, 224.3, 237.4, { size: 9.5, maxLines: 1 });

  // ע"י ע"פ ת"ז [394.9..488.6]: Only the 9-digit ID number (tzNum) since "ת״ז" is already printed!
  putUnderline(10, tzNum,    394.9, 488.6, 215.8, { size: 9.6, maxLines: 1 });

  // Bottom row: תאריך החתימה [397.3..539.1]
  putUnderline(10, dateStr,  397.3, 539.1, 152.6, { size: 9.6, maxLines: 1 });

  return await ctx.pdfDoc.save();
}

module.exports = { stampSecurityCv: stampSecurityCv };
  });

  var core = __require('stamper_core.js');
  var sAsh1 = __require('stamp_ash1.js');
  var sAsh3 = __require('stamp_ash3.js');
  var sAsh456 = __require('stamp_ash456.js');
  var sMr14a = __require('stamp_mr14a.js');
  var sMr14b = __require('stamp_mr14b.js');
  var sNespach = __require('stamp_nespach_alef.js');
  var sAsh6 = __require('stamp_ash6.js');
  var sSecCv = __require('stamp_security_cv.js');

  window.GAT_MODULAR_STAMPERS = {
    core: core,
    ash1: sAsh1.stampAsh1 || sAsh1.stampAuto,
    ash3: sAsh3.stampAsh3 || sAsh3.stampAuto,
    ash456: sAsh456.stampAsh456 || sAsh456.stampAuto,
    mr14a: sMr14a.stampMr14a || sMr14a.stampAuto,
    mr14b: sMr14b.stampMr14b || sMr14b.stampAuto,
    nespach_alef: sNespach.stampNespachAlef || sNespach.stampAuto,
    ash6: sAsh6.stampAsh6 || sAsh6.stampAuto,
    sec_cv: sSecCv.stampSecurityCv || sSecCv.stampAuto,
    security_cv: sSecCv.stampSecurityCv || sSecCv.stampAuto
  };

  var __byteCache = {};
  async function fetchBytesCached(url) {
    if (__byteCache[url]) return __byteCache[url].slice(0);
    var res = await fetch(url + '?v=20261113');
    if (!res.ok) throw new Error('Failed to load ' + url + ' (' + res.status + ')');
    var buf = await res.arrayBuffer();
    __byteCache[url] = buf;
    return buf.slice(0);
  }

  function makeBrowserLoaderOpts() {
    return {
      PDFLib: window.PDFLib,
      fontkit: window.fontkit,
      loadPdfBytes: function(f) { return fetchBytesCached('/forms/gov-pdfs/' + f); },
      loadFontBytes: function(f) { return fetchBytesCached('/app/vendor/' + f); }
    };
  }

  function prepareUserStamperState(rawDraft, isDemoStress) {
    var basePersona = core.buildRandomStressPersona();
    if (isDemoStress) {
      basePersona._stressAllCheckboxes = true;
      return basePersona;
    }

    var d = {};
    var src = rawDraft || {};
    Object.keys(src).forEach(function(k) {
      var v = src[k];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        d[k] = v;
      }
    });

    d.parseAnyDateParts = function(raw, fallbackObj) {
      var sVal = String(raw || '').trim();
      if (!sVal) return { dd: '', mm: '', yyyy: '' };
      return basePersona.parseAnyDateParts(sVal, { d: '', m: '', y: '', full: '' });
    };
    d._stressAllCheckboxes = false;
    d._isRealUser = true;

    if (!d.pf_tz && d.pf_id_num) d.pf_tz = d.pf_id_num;
    if (!d.pf_id_num && d.pf_tz) d.pf_id_num = d.pf_tz;
    if (!d.pf_maiden_he && d.pf_prior_names) d.pf_maiden_he = d.pf_prior_names;
    if (!d.pf_maiden_surname_he && d.pf_prior_names) d.pf_maiden_surname_he = d.pf_prior_names;
    if (!d.pf_prev_surname_he && d.pf_prior_names) d.pf_prev_surname_he = d.pf_prior_names;
    if (!d.pf_abroad_addr_he && d.pf_abroad_addr) d.pf_abroad_addr_he = d.pf_abroad_addr;
    if (!d.pf_birth_city_he && d.pf_birth_country) d.pf_birth_city_he = d.pf_birth_country;
    if (!d.pf_birth_country_he && d.pf_birth_country) d.pf_birth_country_he = d.pf_birth_country;

    if (d.pf_sp_name_he && (!d.pf_sp_given_he || !d.pf_sp_surname_he)) {
      var spParts = String(d.pf_sp_name_he).trim().split(/\s+/);
      if (!d.pf_sp_given_he) d.pf_sp_given_he = spParts[0] || '';
      if (!d.pf_sp_surname_he) d.pf_sp_surname_he = spParts.slice(1).join(' ') || spParts[0] || '';
    }

    if (d.pf_hebrew_dob && (!d.pf_dob_heb_day || !d.pf_dob_heb_mon || !d.pf_dob_heb_yr)) {
      var hParts = String(d.pf_hebrew_dob).trim().split(/\s+/);
      if (hParts.length >= 3) {
        if (!d.pf_dob_heb_day) d.pf_dob_heb_day = hParts[0];
        if (!d.pf_dob_heb_mon) d.pf_dob_heb_mon = hParts.slice(1, -1).join(' ');
        if (!d.pf_dob_heb_yr) d.pf_dob_heb_yr = hParts[hParts.length - 1];
      } else {
        if (!d.pf_dob_heb_day) d.pf_dob_heb_day = d.pf_hebrew_dob;
      }
    }

    if (d.pf_entry_date_port) {
      var epParts = String(d.pf_entry_date_port).split(/[•|,\-]+/).map(function(x) { return x.trim(); }).filter(Boolean);
      if (!d.pf_entry_date && epParts[0]) d.pf_entry_date = epParts[0];
      if (!d.pf_border_station_he && epParts[1]) d.pf_border_station_he = epParts[1];
      if (!d.pf_prev_status_il_he && epParts[2]) d.pf_prev_status_il_he = epParts[2];
    }

    if (d.pf_marriage_details) {
      var mParts = String(d.pf_marriage_details).split(/[•|]+/).map(function(x) { return x.trim(); }).filter(Boolean);
      if (!d.pf_marriage_date && mParts[0]) d.pf_marriage_date = mParts[0];
      if (!d.pf_marriage_place_he && mParts[1]) d.pf_marriage_place_he = mParts[1];
    }

    // Format ISO dates (YYYY-MM-DD -> DD/MM/YYYY) for fields that stampers print directly
    ['pf_sp_entry_date', 'pf_sp_status_date', 'pf_sp_pass_exp'].forEach(function(dk) {
      if (d[dk] && /^\d{4}-\d{2}-\d{2}$/.test(String(d[dk]).trim())) {
        var dp = String(d[dk]).trim().split('-');
        d[dk] = dp[2] + '/' + dp[1] + '/' + dp[0];
      }
    });

    // Parse accompanying children table strictly on pipe `|` or bullet `•` (never on commas!)
    var ct = String(d.pf_children_table || '').trim();
    if (!ct || /^(ללא|אין|none|n\/a|no|-)$/i.test(ct)) {
      d.pf_children_rows = [];
    } else if (!Array.isArray(d.pf_children_rows)) {
      d.pf_children_rows = ct.split(/\n+/).map(function(line) {
        var cols = line.split(/[|•]+/).map(function(c) { return c.trim(); });
        return {
          id_num: cols[0] || '',
          surname_he: cols[1] || d.pf_surname_he || '',
          given_he: cols[2] || '',
          given: cols[3] || cols[2] || '',
          country: cols[4] || d.pf_birth_country || '',
          country_en: cols[5] || d.pf_birth_country_en || '',
          dob: cols[6] || '',
          gender: cols[7] || '',
          other_parent_he: cols[8] || d.pf_sp_name_he || '',
          entry_date: cols[9] || d.pf_entry_date || ''
        };
      }).filter(function(r) { return r.id_num || r.given_he || r.given; });
    }

    // Build Landlord Floor A rows from user + actual children if landlord affidavit is filled
    if (!Array.isArray(d.pf_ll_floor_a_rows)) {
      if (d.pf_ll_affidavit) {
        var llCols = String(d.pf_ll_affidavit).split(/[|•]+/).map(function(x){ return x.trim(); });
        var payMode = llCols[6] || 'העברה בנקאית';
        var rowsA = [{
          name: ((d.pf_sp_name_he || '') + (d.pf_given_he ? ' ו' + d.pf_given_he : '')).trim(),
          father: (d.pf_father_he || '').split(/\s+/)[0] || '',
          id: d.pf_sp_tz || d.pf_pass_num || '',
          rel: 'שוכרים ראשיים',
          date: d.pf_entry_date || '01/09/2026',
          paid_by: payMode
        }];
        (Array.isArray(d.pf_children_rows) ? d.pf_children_rows : []).slice(0, 2).forEach(function(cr) {
          rowsA.push({
            name: ((cr.given_he || '') + ' ' + (cr.surname_he || '')).trim(),
            father: (d.pf_sp_given_he || '').split(/\s+/)[0] || '',
            id: cr.id_num || '',
            rel: /נקבה|F/i.test(String(cr.gender || '')) ? 'בת השוכרים' : 'בן השוכרים',
            date: cr.entry_date || d.pf_entry_date || '01/09/2026',
            paid_by: 'כלול בשכ״ד'
          });
        });
        d.pf_ll_floor_a_rows = rowsA;
      } else {
        d.pf_ll_floor_a_rows = [];
      }
    }
    if (!Array.isArray(d.pf_ll_floor_b_rows)) {
      d.pf_ll_floor_b_rows = [];
    }

    if (typeof Proxy === 'function') {
      return new Proxy(d, {
        get: function(target, prop) {
          if (prop in target) return target[prop];
          if (typeof prop === 'symbol') return target[prop];
          if (prop === '_stressAllCheckboxes' || prop === 'pf_laissez_passer') return false;
          if (prop === '_isRealUser') return true;
          if (String(prop).endsWith('_rows')) return [];
          return ' ';
        }
      });
    }
    return d;
  }

  window.stampOfficialGovPdf = async function(formKey, rawState, isDemoStress) {
    var fk = formKey || (window.gatFormsState && window.gatFormsState.pf_active_form) || 'ash3';
    if (fk === 'security_cv' && !window.GAT_MODULAR_STAMPERS.security_cv) fk = 'sec_cv';
    var opts = makeBrowserLoaderOpts();
    var state = prepareUserStamperState(rawState || (window.collectCurrentFormDraft && window.collectCurrentFormDraft()) || {}, !!isDemoStress);

    var outBytes = null;
    var outName = 'PIBA_' + fk.toUpperCase() + '_Official_Hebrew.pdf';

    if (fk === 'ash456') {
      var b456 = await window.GAT_MODULAR_STAMPERS.ash456(state, opts);
      var b14a = await window.GAT_MODULAR_STAMPERS.mr14a(state, opts);
      var b14b = await window.GAT_MODULAR_STAMPERS.mr14b(state, opts);
      var mergedDoc = await window.PDFLib.PDFDocument.create();
      for (var arr of [b456, b14a, b14b]) {
        var srcDoc = await window.PDFLib.PDFDocument.load(arr);
        var copied = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices());
        copied.forEach(function(p) { mergedDoc.addPage(p); });
      }
      outBytes = await mergedDoc.save();
      outName = 'PIBA_Ash456_MR14A_MR14B_In_Israel_Oleh_Packet.pdf';
    } else {
      var fn = window.GAT_MODULAR_STAMPERS[fk] || window.GAT_MODULAR_STAMPERS.ash3;
      outBytes = await fn(state, opts);
    }

    var blob = new Blob([outBytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    var w = window.open(url, '_blank');
    if (!w) {
      var a = document.createElement('a');
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    return outBytes;
  };

  window.stampDemoPersonaPdf = async function() {
    var fk = (window.gatFormsState && window.gatFormsState.pf_active_form) || 'ash3';
    return await window.stampOfficialGovPdf(fk, {}, true);
  };
})(window);
