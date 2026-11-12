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
    'כהן-צדק ירושלמי',
    'לוי-אפשטיין אשכנזי',
    'מזרחי-טולידאנו'
  ];

  var s1 = pick(sur1), s2 = pick(sur2);
  var fg = pick(femGiven), fa = pick(fatherGiven), mo = pick(motherGiven);
  var spG = pick(spouseGiven), spS = pick(spouseSur);

  return {
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
    pf_mother_maiden: 'רוטשילד-כהן הלפרין',
    pf_mother_maiden_en: 'ROTHSCHILD-COHEN HALPERIN',
    pf_mother_dob: '1965-09-08',
    pf_foreign_grandfather: 'אליעזר מנחם מונטפיורי',
    pf_pass_num: 'FR9876543',
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
    pf_inst_details: 'מכון גיור חיפה • 580998877 • הרב דוד כהן • 054-111-2233',
    pf_sp_name_he: spG + ' ' + spS,
    pf_sp_surname_he: spS,
    pf_sp_given_he: spG,
    pf_sp_tz: '012345674',
    pf_sp_citizenship_he: 'ישראלית',
    pf_sp_birth_country_he: 'ישראל',
    pf_sp_prior_he: 'ללא',
    pf_sp_parents_grand: '15/07/1991 • אב: אברהם משה • אם: שרה רבקה • סב: יעקב שלמה',
    pf_marriage_details: '14/06/2026 ליון, צרפת • מהנדס מערכות מידע',
    pf_ash6_refs: 'דוד אלעזר כהן | 023456782 | חבר קהילה | רח׳ האר״י 10 חיפה | 052-765-4321\nרחל הדסה מזרחי | 034567891 | שכנה ומכרה | רח׳ הרצל 44 חיפה | 050-987-6543',
    pf_ll_affidavit: 'משה אהרן אלון | 045678909 | רח׳ הרצל 42 חיפה | 84 | 2 | 3.5 | העברה בנקאית חודשית',
    pf_456_shvut: 'סעיף 4ב לחוק השבות — יהודי מלידה או גיור מוכר',
    pf_456_settlement: 'שהות 2025–2026 באשרת ב/2 • אדריכלית נוף בכירה • סיימתי עבודה בחו״ל • דירה שכורה בחיפה • חשבון בנק לאומי פעיל • קהילת חיפה • 16 שנות לימוד',
    pf_ash1_consulate: 'איחוד משפחות ולימודי גיור • פריז',
    pf_children_table: 'ללא',
    pf_target_branch: 'חיפה והצפון',
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

function splitIsoDate(val) {
  var m = String(val || '').trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return { d: m[3], m: m[2], y: m[1], full: m[3] + '/' + m[2] + '/' + m[1] };
  var m2 = String(val || '').trim().match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/);
  if (m2) return { d: m2[1].padStart(2, '0'), m: m2[2].padStart(2, '0'), y: m2[3], full: m2[1].padStart(2, '0') + '/' + m2[2].padStart(2, '0') + '/' + m2[3] };
  var now = new Date();
  var td = String(now.getDate()).padStart(2, '0'), tm = String(now.getMonth() + 1).padStart(2, '0'), ty = String(now.getFullYear());
  return { d: '', m: '', y: '', full: String(val || ''), todayD: td, todayM: tm, todayY: ty, todayFull: td + '/' + tm + '/' + ty };
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
  var s = Object.assign({}, rawState || {});

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
  var chkColor = PDFLib.rgb(0.0, 0.28, 0.76);

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
    var sz = Math.min(o.size || 7.6, 12.0);
    var minSingleLineSz = o.minSize || (sz - 0.3);
    var w = measureRunsWidth(runs, sz);

    if (w > availW) {
      var fullCellW = Math.max(10, (x1 - x0) - 1.5);
      var scaledSz = sz * (availW / w);
      var twoLines = (o.noWrap !== true) ? splitTextIntoTwoBalancedLines(raw) : null;
      if (twoLines && scaledSz < minSingleLineSz) {
        var baseWrapSz = Math.max(o.wrapSize || 7.4, 7.2);
        var runs1 = buildVisualRuns(twoLines[0], fHeb, fLat);
        var runs2 = buildVisualRuns(twoLines[1], fHeb, fLat);
        var maxW = Math.max(measureRunsWidth(runs1, baseWrapSz), measureRunsWidth(runs2, baseWrapSz));
        var lineSz = maxW > fullCellW ? (baseWrapSz * (fullCellW / maxW)) : baseWrapSz;

        // If 2 lines still shrink below 6.8pt and we have 3+ words/parts, split into 3 bold lines at full size!
        var normWords = String(raw || '').trim().replace(/([A-Za-z\u0590-\u05FF]{6,})-/g, '$1- ').split(/\s+/);
        if (lineSz < 6.8 && normWords.length >= 3 && (o.allowThreeLines !== false)) {
          var l1 = normWords[0];
          var l2 = normWords.slice(1, -1).join(' ');
          var l3 = normWords[normWords.length - 1];
          var r1 = buildVisualRuns(l1, fHeb, fLat), r2 = buildVisualRuns(l2, fHeb, fLat), r3 = buildVisualRuns(l3, fHeb, fLat);
          var m3 = Math.max(measureRunsWidth(r1, baseWrapSz), measureRunsWidth(r2, baseWrapSz), measureRunsWidth(r3, baseWrapSz));
          var sz3 = m3 > fullCellW ? Math.max(6.8, baseWrapSz * (fullCellW / m3)) : baseWrapSz;
          var yc3 = (o.yWrapCenter !== undefined) ? o.yWrapCenter : (y + 1.5);
          drawSingleLineRuns(pg, r1, x0, x1, yc3 + 5.6, sz3, isHeb, o.align);
          drawSingleLineRuns(pg, r2, x0, x1, yc3,       sz3, isHeb, o.align);
          drawSingleLineRuns(pg, r3, x0, x1, yc3 - 5.6, sz3, isHeb, o.align);
          return;
        }

        lineSz = Math.max(6.8, lineSz);
        var vShift = o.lineShift || 4.0;
        var yCenter = (o.yWrapCenter !== undefined) ? o.yWrapCenter : (y + 1.5);
        drawSingleLineRuns(pg, runs1, x0, x1, yCenter + vShift, lineSz, isHeb, o.align);
        drawSingleLineRuns(pg, runs2, x0, x1, yCenter - vShift, lineSz, isHeb, o.align);
        return;
      }
      sz = Math.max(6.5, scaledSz);
    }

    drawSingleLineRuns(pg, runs, x0, x1, y, sz, isHeb, o.align);
  }

  function check(pageIdx, xLeft, yBase, boxW, boxH, colorMode) {
    var pages = pdfDoc.getPages();
    if (pageIdx < 0 || pageIdx >= pages.length) return;
    var pg = pages[pageIdx];
    var bw = boxW || 7.1;
    var bh = boxH || 7.1;
    var cx = xLeft + (bw / 2);
    var cy = yBase + (bh / 2);
    var c = PDFLib.rgb(0.0, 0.42, 0.12); // Default ALL checked boxes to Dark Green
    if (colorMode === 'red' || colorMode === false) c = PDFLib.rgb(0.62, 0.04, 0.04); // Red ONLY for NO / לא
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

  var dob = splitIsoDate(s.pf_dob);
  var fDob = splitIsoDate(s.pf_father_dob);
  var mDob = splitIsoDate(s.pf_mother_dob);
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
    spSb: spSb
  };
}

module.exports = {
  buildRandomStressPersona: buildRandomStressPersona,
  createStamperContext: createStamperContext
};
