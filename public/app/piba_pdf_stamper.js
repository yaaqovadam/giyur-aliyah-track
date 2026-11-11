/* ==========================================================================
 * Giyur Aliyah Track — Production Official PIBA PDF Stamper (piba_pdf_stamper.js)
 * Complete 6-Form / 15-Page Engine (Ash/3, Ash/456, MR/14a, Nespach Alef, Ash/1, Ash/6)
 * Strict Hebrew-Only Rule • Exact Extracted Vector Checkbox & Comb Coordinates
 * ========================================================================== */
(function(root) {
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

    var tokenRe = /[אב][\/][1-5]|4[אב][׳']?|[\u0590-\u05FF\u05F3\u05F4]+(?:-[\u0590-\u05FF\u05F3\u05F4]+)+|[\u0590-\u05FF\u05F3\u05F4]+|[A-Za-z\u00C0-\u024F]+(?:\s+[A-Za-z\u00C0-\u024F\-]+)*|\d+(?:[\/\.\-:]\d+)*|\s+|[^\s]/g;
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
    var words = String(str || '').trim().split(/\s+/);
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

  async function generateStampedPdfBytes(formKey, rawState, loaderOpts) {
    var PDFLib = loaderOpts.PDFLib;
    var fontkit = loaderOpts.fontkit;
    var s = Object.assign({}, rawState || {});

    var fileMap = {
      ash3: 'ash3_extension_change_visa.pdf',
      ash456: 'ash456_in_israel_oleh.pdf',
      mr14: 'mr14a_registry.pdf',
      nespach_alef: 'nespach_alef_affidavit.pdf',
      ash1: 'ash1_entry_visa.pdf',
      ash6: 'ash6_spousal_status.pdf'
    };
    var pdfBytes = await loaderOpts.loadPdfBytes(fileMap[formKey] || fileMap.ash3);
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
      var fHeb = o.bold ? fontHebBold : fontHebReg;
      var fLat = o.bold ? fontLatBold : fontLatReg;

      var runs = buildVisualRuns(raw, fHeb, fLat);
      if (!runs.length) return;

      var availW = Math.max(10, (x1 - x0) - 4.5);
      var sz = Math.min(o.size || 7.8, 8.4);
      var minSingleLineSz = o.minSize || 6.4;
      var w = measureRunsWidth(runs, sz);

      if (w > availW) {
        var scaledSz = sz * (availW / w);
        var twoLines = (o.noWrap !== true) ? splitTextIntoTwoBalancedLines(raw) : null;
        if (twoLines && scaledSz < minSingleLineSz) {
          var runs1 = buildVisualRuns(twoLines[0], fHeb, fLat);
          var runs2 = buildVisualRuns(twoLines[1], fHeb, fLat);
          var baseWrapSz = o.wrapSize || 6.2;
          var w1 = measureRunsWidth(runs1, baseWrapSz);
          var w2 = measureRunsWidth(runs2, baseWrapSz);
          var maxW = Math.max(w1, w2);
          var lineSz = maxW > availW ? Math.max(4.2, baseWrapSz * (availW / maxW)) : baseWrapSz;
          var vShift = o.lineShift || 3.4;
          var yCenter = (o.yWrapCenter !== undefined) ? o.yWrapCenter : (y + 1.2);
          drawSingleLineRuns(pg, runs1, x0, x1, yCenter + vShift, lineSz, isHeb, o.align);
          drawSingleLineRuns(pg, runs2, x0, x1, yCenter - vShift, lineSz, isHeb, o.align);
          return;
        }
        sz = Math.max(4.0, scaledSz);
      }

      drawSingleLineRuns(pg, runs, x0, x1, y, sz, isHeb, o.align);
    }

    function check(pageIdx, xLeft, yBase, boxW, boxH) {
      var pages = pdfDoc.getPages();
      if (pageIdx < 0 || pageIdx >= pages.length) return;
      var pg = pages[pageIdx];
      var bw = boxW || 7.1;
      var bh = boxH || 7.1;
      var cx = xLeft + (bw / 2);
      var cy = yBase + (bh / 2);
      pg.drawLine({ start: { x: cx - 2.5, y: cy + 0.2 }, end: { x: cx - 0.5, y: cy - 2.0 }, thickness: 1.8, color: chkColor });
      pg.drawLine({ start: { x: cx - 0.5, y: cy - 2.0 }, end: { x: cx + 3.2, y: cy + 2.8 }, thickness: 1.8, color: chkColor });
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
    var spFullHe = sp.full;
    var spGivenHe = sp.given;
    var spSurHe = sp.surname;

    var bcPartsHe = String(s.pf_birth_country || '').split(',').map(function(x){ return x.trim(); });
    var abrCityHe = bcPartsHe[0] || '';
    var abrCountryHe = bcPartsHe[bcPartsHe.length - 1] || '';

    var spPG = String(s.pf_sp_parents_grand || '');
    var spDobM = spPG.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    var spDobFull = spDobM ? spDobM[0] : (s.pf_sp_dob || '');
    var spAb = ((spPG.match(/אב:\s*([^•|]+)/) || [])[1] || '').trim();
    var spIm = ((spPG.match(/אם:\s*([^•|]+)/) || [])[1] || '').trim();
    var spSb = ((spPG.match(/סב:\s*([^•|]+)/) || [])[1] || '').trim();

    // =========================================================================
    // 1. טופס אש/3 (ash3_extension_change_visa.pdf — 2 Pages)
    // =========================================================================
    if (formKey === 'ash3') {
      var actStr = String(s.pf_ash3_action || '');
      var mMonths = actStr.match(/(\d+)\s*(?:חודש|month)/i);
      var extMonths = s.pf_ash3_months || (mMonths ? mMonths[1] : '');
      var mVisaHe = actStr.match(/([אב]\/[1-5])/);
      var targetVisaHe = s.pf_ash3_target_visa_he || (mVisaHe ? mVisaHe[1] : '');
      var visaHeToEn = { 'א/1': 'A/1', 'א/2': 'A/2', 'א/3': 'A/3', 'א/4': 'A/4', 'א/5': 'A/5', 'ב/1': 'B/1', 'ב/2': 'B/2', 'ב/3': 'B/3', 'ב/4': 'B/4' };
      var targetVisaEn = s.pf_ash3_target_visa_en || visaHeToEn[targetVisaHe] || '';

      if (extMonths) {
        check(0, 552.5, 696.7); check(0, 125.9, 697.8);
        put(0, extMonths, 456, 492, 686.5, { align: 'center', bold: true, noWrap: true });
        put(0, extMonths, 235, 297, 687.5, { align: 'center', bold: true, noWrap: true });
      }
      if (targetVisaHe || targetVisaEn) {
        check(0, 552.5, 673.4); check(0, 125.9, 674.5);
        put(0, targetVisaHe, 365, 422, 674.8, { align: 'center', bold: true, noWrap: true });
        put(0, targetVisaEn, 290, 353, 674.8, { align: 'center', bold: true, noWrap: true });
      }

      put(0, s.pf_surname_he, 389, 503, 559.0, { align: 'right', bold: true, yWrapCenter: 560.5, lineShift: 3.1, wrapSize: 6.0 });
      put(0, s.pf_given_he, 290, 383, 559.0, { align: 'right', bold: true, yWrapCenter: 560.5, lineShift: 3.1, wrapSize: 6.0 });
      put(0, s.pf_prior_names, 212, 284, 559.0, { align: 'right', yWrapCenter: 560.5, lineShift: 3.0, wrapSize: 5.8 });
      put(0, s.pf_surname_en, 389, 503, 542.0, { align: 'left', bold: true, size: 6.8, yWrapCenter: 543.5, lineShift: 3.1, wrapSize: 5.8 });
      put(0, s.pf_given_en, 290, 383, 542.0, { align: 'left', bold: true, size: 6.8, yWrapCenter: 543.5, lineShift: 3.1, wrapSize: 5.8 });
      put(0, s.pf_prior_names_en, 212, 284, 542.0, { align: 'left', size: 6.5, yWrapCenter: 543.5, lineShift: 3.0, wrapSize: 5.5 });

      if (isMarried) check(0, 114.4, 560.1);
      else if (isDiv) check(0, 196.6, 544.9);
      else if (isWid) check(0, 114.4, 544.9);
      else if (mar) check(0, 196.6, 560.1);

      var birthEn = s.pf_birth_country_en || ((abr.city ? abr.city.toUpperCase() + ', ' : '') + (abr.country ? abr.country.toUpperCase() : ''));
      var natEn = s.pf_nationality_en || (/יהוד/.test(natHe) ? 'JEWISH' : '');
      var relEn = s.pf_religion_en || (/יהוד/.test(relHe) ? 'JEWISH' : '');
      var citEn = s.pf_citizenship_en || '';

      put(0, s.pf_birth_country, 391, 506, 499.0, { align: 'right', noWrap: true });
      put(0, dob.full, 292, 386, 497.5, { align: 'center', noWrap: true });
      put(0, natHe, 205, 286, 499.0, { align: 'right', noWrap: true });
      put(0, relHe, 135, 200, 499.0, { align: 'right', noWrap: true });
      put(0, s.pf_citizenship, 37, 130, 499.0, { align: 'right', noWrap: true });
      put(0, birthEn, 391, 506, 482.0, { align: 'left', size: 6.8, noWrap: true });
      put(0, natEn, 205, 286, 482.0, { align: 'left', size: 6.8, noWrap: true });
      put(0, relEn, 135, 200, 482.0, { align: 'left', size: 6.8, noWrap: true });
      put(0, citEn, 37, 130, 482.0, { align: 'left', size: 6.8, noWrap: true });

      put(0, s.pf_father_he, 431, 507, 438.5, { align: 'right', yWrapCenter: 440.0, lineShift: 3.0, wrapSize: 5.8 });
      put(0, fDob.full, 339, 426, 437.0, { align: 'center', noWrap: true });
      put(0, s.pf_mother_he, 240, 334, 438.5, { align: 'right', yWrapCenter: 440.0, lineShift: 3.0, wrapSize: 5.8 });
      put(0, mDob.full, 141, 234, 437.0, { align: 'center', noWrap: true });
      put(0, s.pf_mother_maiden, 37, 135, 438.5, { align: 'right', yWrapCenter: 440.0, lineShift: 3.0, wrapSize: 5.8 });
      put(0, s.pf_father_en, 430, 508, 421.5, { align: 'left', size: 6.2, yWrapCenter: 423.0, lineShift: 3.0, wrapSize: 5.5 });
      put(0, s.pf_mother_en, 239, 335, 421.5, { align: 'left', size: 6.2, yWrapCenter: 423.0, lineShift: 3.0, wrapSize: 5.5 });
      put(0, s.pf_mother_maiden_en, 37, 135, 421.5, { align: 'left', size: 6.5, yWrapCenter: 423.0, lineShift: 3.0, wrapSize: 5.5 });

      put(0, s.pf_email, 395, 558, 368.0, { align: 'left', size: 7.4, noWrap: true });
      if (s.pf_pass_num) check(0, 353.5, 396.2);
      put(0, s.pf_pass_num, 276, 389, 358.0, { align: 'center', bold: true, noWrap: true });
      put(0, pIss.full, 157, 270, 358.0, { align: 'center', noWrap: true });
      put(0, pExp.full, 38, 151, 358.0, { align: 'center', noWrap: true });

      var abrHeParts = String(s.pf_abroad_addr_he || '').split(',').map(function(x){ return x.trim(); }).filter(Boolean);
      var abrStreetHe = abrHeParts.length >= 3 ? abrHeParts.slice(0, -2).join(', ') : (abrHeParts[0] || '');
      var abrTownHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 2] : (abrHeParts[1] || abrCityHe);
      var abrLandHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 1] : abrCountryHe;

      put(0, abrLandHe, 389, 504, 303.0, { align: 'right', noWrap: true });
      put(0, abrTownHe, 267, 384, 303.0, { align: 'right', noWrap: true });
      put(0, abrStreetHe, 146, 262, 303.0, { align: 'right', noWrap: true });
      put(0, abr.country, 389, 504, 284.0, { align: 'left', size: 7.0, noWrap: true });
      put(0, abr.city, 267, 384, 284.0, { align: 'left', size: 7.0, noWrap: true });
      put(0, abr.street, 146, 262, 284.0, { align: 'left', size: 6.8, noWrap: true });
      put(0, s.pf_phone_abroad || s.pf_phone_il, 36, 141, 295.0, { align: 'center', noWrap: true });

      put(0, il.city, 389, 504, 235.5, { align: 'right', bold: true, noWrap: true });
      put(0, il.streetWithNum, 147, 383, 235.5, { align: 'right', bold: true, noWrap: true });
      put(0, s.pf_il_city_en, 389, 504, 215.5, { align: 'left', size: 7.0, noWrap: true });
      put(0, s.pf_il_street_en, 147, 383, 215.5, { align: 'left', size: 7.0, noWrap: true });
      put(0, s.pf_phone_il, 36, 141, 226.0, { align: 'center', noWrap: true });

      if (s.pf_inst_details) {
        var instP = String(s.pf_inst_details).split(/[•|]/).map(function(x){ return x.trim(); });
        put(0, instP[0] || '', 438, 504, 143.5, { align: 'right', size: 7.0, noWrap: true });
        put(0, il.city, 311, 433, 143.5, { align: 'right', size: 7.0, noWrap: true });
        put(0, instP[1] || '', 219, 305, 143.5, { align: 'center', size: 7.0, noWrap: true });
        put(0, instP[2] || '', 134, 213, 143.5, { align: 'right', size: 7.0, noWrap: true });
        put(0, instP[3] || '', 39, 128, 143.5, { align: 'center', size: 7.0, noWrap: true });
      }

      put(1, s.pf_surname_he, 446, 554, 665.5, { align: 'right', bold: true, yWrapCenter: 666.5, lineShift: 3.6, wrapSize: 6.2 });
      put(1, s.pf_surname_en, 354, 440, 665.5, { align: 'left', size: 6.5, yWrapCenter: 666.5, lineShift: 3.6, wrapSize: 5.8 });
      put(1, s.pf_given_he, 262, 348, 665.5, { align: 'right', bold: true, yWrapCenter: 666.5, lineShift: 3.6, wrapSize: 6.2 });
      put(1, s.pf_given_en, 169, 256, 665.5, { align: 'left', size: 6.5, yWrapCenter: 666.5, lineShift: 3.6, wrapSize: 5.8 });
      put(1, s.pf_pass_num, 46, 164, 665.5, { align: 'center', bold: true, noWrap: true });

      if (spFullHe) {
        put(1, spSurHe, 495, 567, 594.0, { align: 'right', bold: true, yWrapCenter: 595.0, lineShift: 3.6, wrapSize: 6.2 });
        put(1, spGivenHe, 413, 489, 594.0, { align: 'right', bold: true, yWrapCenter: 595.0, lineShift: 3.6, wrapSize: 6.2 });
        check(1, 389.8, 597.7);
        check(1, 330.4, 583.8);
        putComb(1, s.pf_sp_tz, 108.2, 12.75, 584.5, 9, true);
        put(1, s.pf_sp_citizenship_he, 48, 105, 594.0, { align: 'right', bold: true, noWrap: true });
      }
      put(1, branchCity, 415, 555, 263.0, { align: 'right', bold: true, noWrap: true });
      put(1, today.todayFull, 235, 365, 263.0, { align: 'center', bold: true, noWrap: true });
    }

    // =========================================================================
    // 2. טופס אש/456 (ash456_in_israel_oleh.pdf — 3 Pages)
    // =========================================================================
    else if (formKey === 'ash456') {
      // Page 1: STRICT HEBREW-ONLY for single-cell fields (no stacked English)
      put(0, s.pf_surname_he, 480, 556, 609.5, { align: 'right', bold: true, size: 7.6, yWrapCenter: 611.0, lineShift: 3.2, wrapSize: 6.0 });
      put(0, s.pf_given_he, 392, 476, 609.5, { align: 'right', bold: true, size: 7.6, yWrapCenter: 611.0, lineShift: 3.2, wrapSize: 6.0 });
      put(0, s.pf_father_he, 312, 387, 604.5, { align: 'right', size: 7.4, minSize: 7.0, yWrapCenter: 606.0, lineShift: 3.4, wrapSize: 5.8 });
      put(0, s.pf_mother_he, 224, 306, 604.5, { align: 'right', size: 7.4, minSize: 7.0, yWrapCenter: 606.0, lineShift: 3.4, wrapSize: 5.8 });
      put(0, s.pf_birth_country, 128, 217, 604.5, { align: 'right', size: 7.8, noWrap: true });
      put(0, dob.full, 38, 122, 604.5, { align: 'center', size: 8.0, noWrap: true });

      put(0, s.pf_citizenship, 476, 556, 544.5, { align: 'right', noWrap: true });
      put(0, relHe, 396, 471, 544.5, { align: 'right', noWrap: true });
      if (s.pf_pass_num) check(0, 343.8, 576.7);
      putComb(0, s.pf_pass_num, 250.8, 15.4, 544.5, 9, false);
      put(0, pIss.full, 138, 206, 544.5, { align: 'center', size: 8.0, noWrap: true });
      put(0, pExp.full, 38, 132, 544.5, { align: 'center', size: 8.0, noWrap: true });

      if (isMarried) check(0, 516.9, 504.9);
      check(0, 190.6, 504.9);

      put(0, abr.country, 464, 555, 426.5, { align: 'left', size: 8.0, noWrap: true });
      put(0, abr.city, 368, 458, 426.5, { align: 'left', size: 8.0, noWrap: true });
      put(0, abr.street, 242, 362, 426.5, { align: 'left', size: 7.6, noWrap: true });
      put(0, s.pf_email, 38, 206, 426.5, { align: 'left', size: 7.6, noWrap: true });

      put(0, il.city, 438, 555, 378.0, { align: 'right', bold: true, noWrap: true });
      put(0, il.streetWithNum, 216, 432, 378.0, { align: 'right', bold: true, noWrap: true });
      put(0, s.pf_phone_il, 38, 206, 378.0, { align: 'center', noWrap: true });

      var entP = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
      var entDate = entP[0] || '';
      var entPort = entP[1] || '';
      var entVisa = entP[2] || '';
      var entExp = (entP[3] || '').replace(/^עד\s*/, '');
      put(0, entVisa, 435, 495, 253.0, { align: 'center', size: 8.0, noWrap: true });
      put(0, entPort, 348, 430, 253.0, { align: 'center', size: 8.0, noWrap: true });
      put(0, entDate, 265, 344, 253.0, { align: 'center', size: 7.8, noWrap: true });
      put(0, entDate, 198, 260, 253.0, { align: 'center', size: 7.8, noWrap: true });
      put(0, entPort, 135, 194, 253.0, { align: 'center', size: 8.0, noWrap: true });
      put(0, entExp, 38, 130, 253.0, { align: 'center', size: 8.0, noWrap: true });

      check(0, 551.8, 188.0);
      if (spFullHe) {
        check(0, 290.0, 188.0);
        put(0, spSurHe, 484, 555, 82.5, { align: 'right', bold: true, yWrapCenter: 84.0, lineShift: 3.2, wrapSize: 5.8 });
        put(0, spGivenHe, 398, 479, 82.5, { align: 'right', bold: true, yWrapCenter: 84.0, lineShift: 3.2, wrapSize: 5.8 });
        putComb(0, s.pf_sp_tz, 264.0, 14.3, 82.5, 9, true);
        put(0, s.pf_sp_citizenship_he, 110, 178, 82.5, { align: 'right', bold: true, noWrap: true });
        put(0, spDobFull, 38, 105, 82.5, { align: 'center', size: 8.0, noWrap: true });
      }
      put(0, branchCity, 452, 536, 53.5, { align: 'right', bold: true, noWrap: true });
      put(0, today.todayFull, 282, 370, 53.5, { align: 'center', bold: true, noWrap: true });

      // Page 2 Header Summary Bar (Hebrew Only: Family Name [408..493], Given Name [284..394], Passport Comb [90.0, stepW=19.3])
      put(1, s.pf_surname_he, 408, 493, 705.5, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(1, s.pf_given_he, 284, 394, 705.5, { align: 'center', size: 7.2, bold: true, noWrap: true });
      putComb(1, s.pf_pass_num, 90.0, 19.3, 703.5, 9, false);

      // Page 2 Section 1 & 2 Checkboxes (Exact vector coords from PDF dump)
      check(1, 341.9, 672.0); put(1, today.todayFull, 195, 290, 672.0, { align: 'center', size: 8.0, noWrap: true });
      check(1, 205.8, 650.4);
      check(1, 306.6, 627.5); put(1, s.pf_citizenship, 175, 265, 627.5, { align: 'right', size: 8.0, noWrap: true });
      check(1, 342.6, 607.4);
      check(1, 342.6, 587.7);
      check(1, 540.0, 537.0);
      check(1, 376.5, 487.6);

      var setP = String(s.pf_456_settlement || '').split(/[•|]/).map(function(x){ return x.trim(); });
      check(1, 296.5, 430.4);
      check(1, 351.0, 414.1); put(1, setP[1] || s.pf_occupation_he, 208, 292, 414.1, { align: 'right', size: 6.8, noWrap: true });
      check(1, 322.7, 395.6); put(1, setP[2] || '', 45, 180, 395.6, { align: 'right', size: 7.6, noWrap: true });
      check(1, 322.7, 379.3); put(1, setP[0] || '', 45, 272, 379.3, { align: 'right', size: 7.6, noWrap: true });
      check(1, 327.0, 304.9);
      check(1, 305.2, 272.2); put(1, setP[3] || (il.streetWithNum + ', ' + il.city), 45, 248, 272.2, { align: 'right', size: 7.8, noWrap: true });
      check(1, 132.8, 245.4);
      check(1, 327.7, 201.9); put(1, setP[4] || '', 45, 268, 201.9, { align: 'right', size: 7.8, noWrap: true });
      if (spFullHe) { check(1, 330.1, 180.3); put(1, spFullHe, 45, 285, 180.3, { align: 'right', size: 7.8, noWrap: true }); }
      else check(1, 361.1, 180.3);
      check(1, 361.1, 153.4);
      check(1, 332.3, 123.1); put(1, setP[5] || '', 45, 280, 123.1, { align: 'right', size: 7.8, noWrap: true });
      put(1, branchCity, 450, 535, 48.7, { align: 'right', bold: true, noWrap: true });
      put(1, today.todayFull, 280, 370, 48.7, { align: 'center', bold: true, noWrap: true });

      // Page 3 Header Summary Bar (Hebrew Only)
      put(2, s.pf_surname_he, 408, 493, 703.5, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(2, s.pf_given_he, 284, 394, 703.5, { align: 'center', size: 7.2, bold: true, noWrap: true });
      putComb(2, s.pf_pass_num, 90.0, 19.3, 701.5, 9, false);

      check(2, 529.5, 646.2, 10.5, 9.0);
      put(2, relHe, 335, 468, 511.0, { align: 'right', bold: true, noWrap: true });
      put(2, natHe, 110, 235, 511.0, { align: 'right', bold: true, noWrap: true });

      if (s.pf_decl_clean_record !== false) {
        [374.5, 346.4, 329.4, 301.5, 284.7, 267.7, 250.9, 233.8, 217.0].forEach(function(cy) {
          check(2, 542.8, cy);
        });
      }
      put(2, branchCity, 450, 534, 124.1, { align: 'right', bold: true, noWrap: true });
      put(2, today.todayFull, 278, 368, 124.1, { align: 'center', bold: true, noWrap: true });
    }

    // =========================================================================
    // 3. טופס מר/14 א׳ (mr14a_registry.pdf — 1 Page)
    // =========================================================================
    else if (formKey === 'mr14') {
      var entM = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
      put(0, entM[0] || today.todayFull, 412, 536, 704.5, { align: 'center', noWrap: true });
      put(0, today.todayFull, 286, 405, 704.5, { align: 'center', noWrap: true });
      put(0, s.pf_456_shvut ? 'חוק השבות (4ב)' : '', 166, 280, 704.5, { align: 'right', size: 8.0, noWrap: true });
      put(0, entM[1] || '', 26, 160, 704.5, { align: 'right', noWrap: true });

      put(0, s.pf_surname_he, 375, 538, 676.0, { align: 'right', bold: true, yWrapCenter: 677.5, lineShift: 3.4, wrapSize: 6.4 });
      put(0, s.pf_surname_en, 202, 368, 676.0, { align: 'center', bold: true, size: 7.0, yWrapCenter: 677.5, lineShift: 3.4, wrapSize: 6.0 });
      put(0, s.pf_father_he, 26, 194, 676.0, { align: 'right', yWrapCenter: 677.5, lineShift: 3.4, wrapSize: 6.4 });

      put(0, s.pf_given_he, 375, 538, 647.5, { align: 'right', bold: true, yWrapCenter: 649.0, lineShift: 3.4, wrapSize: 6.4 });
      put(0, s.pf_given_en, 202, 368, 647.5, { align: 'center', bold: true, size: 7.2, yWrapCenter: 649.0, lineShift: 3.4, wrapSize: 6.0 });
      put(0, s.pf_mother_he, 26, 194, 647.5, { align: 'right', yWrapCenter: 649.0, lineShift: 3.4, wrapSize: 6.4 });

      put(0, s.pf_prior_names, 375, 538, 619.5, { align: 'right', noWrap: true });
      put(0, s.pf_prior_names, 202, 368, 619.5, { align: 'right', noWrap: true });
      put(0, s.pf_prior_given_he || 'ללא', 26, 194, 619.5, { align: 'right', noWrap: true });

      put(0, s.pf_countries_over_1yr, 375, 538, 591.0, { align: 'right', noWrap: true });
      put(0, s.pf_citizenship, 202, 368, 591.0, { align: 'right', noWrap: true });
      put(0, s.pf_pass_num, 26, 194, 591.0, { align: 'center', bold: true, noWrap: true });

      put(0, dob.y, 484, 532, 561.5, { align: 'center', bold: true, noWrap: true });
      put(0, dob.m, 450, 481, 561.5, { align: 'center', bold: true, noWrap: true });
      put(0, dob.d, 416, 447, 561.5, { align: 'center', bold: true, noWrap: true });

      if (s.pf_hebrew_dob) {
        var hbP = String(s.pf_hebrew_dob).trim().split(/\s+/);
        put(0, hbP[0] || '', 362, 392, 561.5, { align: 'center', size: 7.4, noWrap: true });
        put(0, hbP.slice(1, -1).join(' ') || '', 324, 358, 561.5, { align: 'center', size: 7.0, noWrap: true });
        put(0, hbP[hbP.length - 1] || '', 272, 320, 561.5, { align: 'center', size: 7.4, noWrap: true });
      }
      var bcParts = String(s.pf_birth_country || '').split(',').map(function(x){ return x.trim(); });
      put(0, bcParts[0] || '', 159, 255, 564.5, { align: 'right', size: 8.0, noWrap: true });
      put(0, bcParts[bcParts.length - 1] || '', 42, 138, 564.5, { align: 'right', size: 8.0, noWrap: true });

      put(0, natHe, 368, 538, 523.0, { align: 'right', bold: true, noWrap: true });
      put(0, relHe, 185, 362, 523.0, { align: 'right', bold: true, noWrap: true });
      put(0, s.pf_456_shvut ? '4ב' : '', 115, 179, 523.0, { align: 'center', bold: true, noWrap: true });
      put(0, s.pf_456_shvut ? 'עצמי' : '', 26, 109, 523.0, { align: 'right', noWrap: true });

      put(0, il.city, 434, 538, 483.5, { align: 'right', bold: true, noWrap: true });
      put(0, il.street, 261, 428, 483.5, { align: 'right', bold: true, noWrap: true });
      put(0, il.house, 209, 248, 483.5, { align: 'center', noWrap: true });
      put(0, il.apt, 104, 143, 483.5, { align: 'center', noWrap: true });
      put(0, il.zip, 26, 99, 483.5, { align: 'center', size: 7.8, noWrap: true });

      check(0, 528.9, isFemale ? 446.5 : 458.2);
      if (isMarried) check(0, 481.7, 446.1);
      else if (isDiv) check(0, 434.5, 458.2);
      else if (isWid) check(0, 434.5, 446.1);
      else if (mar) check(0, 481.7, 458.2);
      check(0, 376.9, spFullHe ? 469.6 : 447.8);

      put(0, s.pf_edu_years || '', 253, 309, 448.5, { align: 'center', noWrap: true });
      put(0, s.pf_occupation_he, 148, 248, 448.5, { align: 'right', size: 7.6, noWrap: true });
      put(0, s.pf_foreign_grandfather, 26, 143, 448.5, { align: 'right', size: 7.6, noWrap: true });

      put(0, entM[2] || '', 124, 294, 413.5, { align: 'right', size: 8.0, noWrap: true });
      put(0, (abr.city ? abr.city + ', ' : '') + abr.country, 410, 538, 384.0, { align: 'left', size: 7.6, noWrap: true });

      if (s.pf_sp_tz) putComb(0, s.pf_sp_tz, 37.5, 16.55, 353.0, 9, true);

      put(0, today.todayY, 479, 527, 50.5, { align: 'center', bold: true, noWrap: true });
      put(0, today.todayM, 445, 476, 50.5, { align: 'center', bold: true, noWrap: true });
      put(0, today.todayD, 411, 442, 50.5, { align: 'center', bold: true, noWrap: true });
    }

    // =========================================================================
    // 4. נספח א׳ (nespach_alef_affidavit.pdf — 1 Page)
    // =========================================================================
    else if (formKey === 'nespach_alef') {
      put(0, spFullHe, 242, 430, 186.5, { align: 'center', bold: true, yWrapCenter: 189.0, lineShift: 3.5, wrapSize: 6.4 });
      put(0, s.pf_sp_tz, 165, 238, 186.5, { align: 'center', bold: true, noWrap: true });
      put(0, today.todayFull, 60, 145, 186.5, { align: 'center', noWrap: true });

      var forFull = ((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim();
      put(0, forFull, 242, 430, 147.5, { align: 'center', bold: true, yWrapCenter: 150.0, lineShift: 3.5, wrapSize: 6.4 });
      put(0, s.pf_pass_num, 165, 238, 147.5, { align: 'center', bold: true, noWrap: true });
      put(0, today.todayFull, 60, 145, 147.5, { align: 'center', noWrap: true });
    }

    // =========================================================================
    // 5. טופס אש/1 (ash1_entry_visa.pdf — 2 Pages)
    // =========================================================================
    else if (formKey === 'ash1') {
      var ash1CatHe = s.pf_ash1_cat_he || (s.pf_ash1_consulate ? String(s.pf_ash1_consulate).split(/[•|]/)[0].trim() : '');
      var ash1CatEn = s.pf_ash1_cat_en || s.pf_ash3_target_visa_en || '';
      put(0, ash1CatHe, 124, 268, 764.0, { align: 'right', bold: true, noWrap: true });
      put(0, ash1CatEn, 300, 420, 751.0, { align: 'left', bold: true, noWrap: true });

      put(0, s.pf_sp_tz, 375, 475, 605.5, { align: 'center', bold: true, noWrap: true });
      put(0, spFullHe, 254, 369, 605.5, { align: 'right', bold: true, yWrapCenter: 605.5, lineShift: 3.5, wrapSize: 6.2 });
      put(0, s.pf_sp_relation_he || (spFullHe ? 'בן/בת זוג' : ''), 148, 248, 605.5, { align: 'right', noWrap: true });
      put(0, s.pf_phone_il, 40, 142, 605.5, { align: 'center', noWrap: true });

      put(0, s.pf_surname_he, 388, 501, 542.2, { align: 'right', bold: true, size: 7.0, noWrap: true });
      put(0, s.pf_surname_en, 388, 501, 533.8, { align: 'left', size: 5.8, noWrap: true });
      put(0, s.pf_given_he, 270, 383, 542.2, { align: 'right', bold: true, size: 7.0, noWrap: true });
      put(0, s.pf_given_en, 270, 383, 533.8, { align: 'left', size: 5.8, noWrap: true });
      put(0, s.pf_father_he, 155, 264, 538.0, { align: 'right', yWrapCenter: 539.5, lineShift: 3.4, wrapSize: 6.0 });
      put(0, s.pf_mother_he, 40, 149, 538.0, { align: 'right', yWrapCenter: 539.5, lineShift: 3.4, wrapSize: 6.0 });

      put(0, s.pf_mother_maiden, 438, 558, 493.0, { align: 'right', noWrap: true });
      put(0, s.pf_prior_names, 304, 433, 493.0, { align: 'right', noWrap: true });
      put(0, natHe, 169, 298, 493.0, { align: 'right', noWrap: true });
      put(0, relHe, 39, 163, 493.0, { align: 'right', noWrap: true });

      put(0, s.pf_birth_country, 438, 557, 450.5, { align: 'right', noWrap: true });
      put(0, dob.full, 304, 433, 450.5, { align: 'center', noWrap: true });
      put(0, s.pf_citizenship, 169, 298, 450.5, { align: 'right', noWrap: true });
      put(0, s.pf_occupation_he, 40, 163, 450.5, { align: 'right', noWrap: true });

      if (isMarried) check(0, 466.5, 406.7);
      else if (isWid) check(0, 466.5, 391.6);
      else if (isDiv) check(0, 548.7, 391.6);
      else if (mar) check(0, 548.7, 406.7);

      if (s.pf_pass_num) check(0, 369.9, 432.3);
      put(0, s.pf_pass_num, 296, 389, 389.0, { align: 'center', bold: true, noWrap: true });
      put(0, pIss.full, 197, 291, 389.0, { align: 'center', noWrap: true });
      put(0, pExp.full, 112, 192, 389.0, { align: 'center', noWrap: true });
      if (s.pf_gender) check(0, isFemale ? 71.3 : 71.7, isFemale ? 390.5 : 410.0);

      if (spFullHe) {
        put(0, spSurHe, 474, 556, 325.5, { align: 'right', yWrapCenter: 327.0, lineShift: 3.4, wrapSize: 5.8 });
        put(0, spGivenHe, 388, 469, 325.5, { align: 'right', yWrapCenter: 327.0, lineShift: 3.4, wrapSize: 5.8 });
        put(0, s.pf_sp_prior_he || 'ללא', 301, 382, 325.5, { align: 'right', noWrap: true });
        put(0, spAb, 214, 296, 325.5, { align: 'right', noWrap: true });
        put(0, s.pf_sp_birth_country_he, 127, 209, 325.5, { align: 'right', noWrap: true });
        put(0, spDobFull, 40, 122, 325.5, { align: 'center', noWrap: true });
      }

      var ash1ConsParts = String(s.pf_ash1_consulate || '').split(/[•|]/).map(function(x){ return x.trim(); });
      var purp1 = ash1ConsParts[0] || '';
      var consulateHe = ash1ConsParts[1] || '';
      put(0, purp1, 162, 470, 209.5, { align: 'right', bold: true, noWrap: true });
      put(0, s.pf_entry_date_port || '', 305, 486, 164.5, { align: 'right', size: 7.2, noWrap: true });
      put(0, 'לא', 305, 425, 127.5, { align: 'right', noWrap: true });

      check(0, 230.0, 105.7);
      check(0, 76.9, 75.0);
      check(0, 217.1, 55.9);
      check(0, 506.1, 42.7);

      put(1, s.pf_surname_en, 388, 501, 658.5, { align: 'center', bold: true, yWrapCenter: 660.0, lineShift: 3.5, wrapSize: 6.0 });
      put(1, s.pf_given_en, 270, 383, 658.5, { align: 'center', bold: true, yWrapCenter: 660.0, lineShift: 3.5, wrapSize: 6.0 });
      put(1, s.pf_pass_num, 155, 264, 658.5, { align: 'center', bold: true, noWrap: true });
      put(1, s.pf_citizenship, 34, 149, 658.5, { align: 'right', noWrap: true });

      put(1, abr.country, 388, 503, 587.0, { align: 'left', size: 7.4, noWrap: true });
      put(1, abr.city, 266, 383, 587.0, { align: 'left', size: 7.4, noWrap: true });
      put(1, abr.street, 146, 261, 587.0, { align: 'left', size: 7.0, noWrap: true });
      put(1, s.pf_phone_abroad || s.pf_phone_il, 35, 140, 587.0, { align: 'center', noWrap: true });

      put(1, s.pf_email, 399, 558, 520.0, { align: 'left', size: 7.2, noWrap: true });
      put(1, il.city, 215, 388, 515.5, { align: 'center', bold: true, noWrap: true });
      put(1, il.streetWithNum, 38, 208, 515.5, { align: 'right', bold: true, noWrap: true });
      put(1, consulateHe, 268, 363, 494.7, { align: 'center', bold: true, noWrap: true });

      put(1, today.todayFull, 345, 440, 327.5, { align: 'center', noWrap: true });
      put(1, branchCity, 465, 560, 327.5, { align: 'right', noWrap: true });
      put(1, today.todayFull, 290, 385, 162.0, { align: 'center', noWrap: true });
      put(1, branchCity, 412, 508, 162.0, { align: 'right', noWrap: true });
    }

    // =========================================================================
    // 6. טופס אש/6 (ash6_spousal_status.pdf — All 6 Pages)
    // =========================================================================
    else if (formKey === 'ash6') {
      put(0, today.todayFull, 95, 180, 713.0, { align: 'center', bold: true, noWrap: true });
      var appFullHe = ((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim();
      if (spFullHe) {
        put(0, spFullHe, 240, 492, 663.1, { align: 'right', bold: true, size: 7.6, noWrap: true });
        put(0, appFullHe, 240, 492, 646.5, { align: 'right', bold: true, size: 7.6, noWrap: true });
      } else {
        put(0, appFullHe, 240, 492, 663.1, { align: 'right', bold: true, size: 7.6, noWrap: true });
      }

      check(1, 277.9, 650.6); check(1, 318.4, 612.5);
      putComb(1, s.pf_sp_tz, 456.8, 12.1, 564.5, 9, true);

      put(1, spSurHe, 376, 444, 566.0, { align: 'center', bold: true, yWrapCenter: 567.0, lineShift: 3.0, wrapSize: 5.8 });
      put(1, spGivenHe, 292, 366, 566.0, { align: 'center', bold: true, yWrapCenter: 567.0, lineShift: 3.0, wrapSize: 5.8 });
      put(1, spAb, 208, 280, 566.0, { align: 'center', noWrap: true });
      put(1, spSb, 124, 196, 566.0, { align: 'center', noWrap: true });
      put(1, spIm, 40, 112, 566.0, { align: 'center', noWrap: true });

      if (spDobM) {
        put(1, spDobM[1], 478, 500, 524.5, { align: 'center', size: 8.0, noWrap: true });
        put(1, spDobM[2], 506, 532, 524.5, { align: 'center', size: 8.0, noWrap: true });
        put(1, spDobM[3], 536, 562, 524.5, { align: 'center', size: 8.0, noWrap: true });
      }
      check(1, 460.5, isFemale ? 535.3 : 524.8); check(1, 416.8, 524.8);

      var marP = String(s.pf_marriage_details || '').split(/[•|]/).map(function(x){ return x.trim(); });
      put(1, (marP[0] || '').slice(0, 10), 262, 350, 525.0, { align: 'center', size: 8.0, noWrap: true });
      put(1, relHe, 142, 232, 525.0, { align: 'center', size: 8.0, noWrap: true });
      put(1, natHe, 42, 132, 525.0, { align: 'center', size: 8.0, noWrap: true });

      put(1, s.pf_sp_prior_he || 'ללא', 485, 558, 486.5, { align: 'right', size: 8.0, noWrap: true });
      put(1, 'ללא', 396, 474, 486.5, { align: 'right', size: 8.0, noWrap: true });
      put(1, s.pf_sp_citizenship_he, 216, 294, 486.5, { align: 'right', size: 8.0, noWrap: true });
      put(1, marP[1] || '', 40, 116, 486.5, { align: 'right', size: 7.8, noWrap: true });

      put(1, il.city, 492, 560, 439.0, { align: 'right', bold: true, noWrap: true });
      put(1, il.street, 345, 488, 439.0, { align: 'right', bold: true, noWrap: true });
      put(1, il.house, 292, 340, 439.0, { align: 'center', noWrap: true });
      put(1, il.apt, 242, 288, 439.0, { align: 'center', noWrap: true });
      put(1, il.zip, 192, 238, 439.0, { align: 'center', size: 7.6, noWrap: true });
      put(1, s.pf_phone_il, 40, 108, 439.0, { align: 'center', size: 7.8, noWrap: true });

      putComb(1, s.pf_pass_num, 349.4, 15.08, 394.0, 9, false);
      put(1, pExp.full, 212, 300, 394.0, { align: 'center', noWrap: true });

      put(1, s.pf_surname_he, 488, 558, 354.5, { align: 'right', bold: true, yWrapCenter: 356.0, lineShift: 3.0, wrapSize: 5.8 });
      put(1, s.pf_given_he, 398, 480, 354.5, { align: 'right', bold: true, yWrapCenter: 356.0, lineShift: 3.0, wrapSize: 5.8 });
      put(1, s.pf_father_he, 312, 390, 354.5, { align: 'right', size: 7.6, yWrapCenter: 356.0, lineShift: 3.0, wrapSize: 5.6 });
      put(1, s.pf_foreign_grandfather, 232, 305, 354.5, { align: 'right', size: 7.6, yWrapCenter: 356.0, lineShift: 3.0, wrapSize: 5.6 });
      put(1, s.pf_mother_he, 162, 225, 354.5, { align: 'right', size: 7.6, yWrapCenter: 356.0, lineShift: 3.0, wrapSize: 5.6 });
      put(1, dob.d, 78, 98, 354.5, { align: 'center', size: 7.8, noWrap: true });
      put(1, dob.m, 104, 130, 354.5, { align: 'center', size: 7.8, noWrap: true });
      put(1, dob.y, 134, 158, 354.5, { align: 'center', size: 7.8, noWrap: true });
      if (s.pf_gender) check(1, 57.7, isFemale ? 352.3 : 362.7);

      if (isMarried) check(1, 551.0, 310.9);
      put(1, relHe, 432, 482, 313.5, { align: 'center', size: 7.8, noWrap: true });
      put(1, natHe, 366, 420, 313.5, { align: 'center', size: 7.8, noWrap: true });
      put(1, s.pf_citizenship, 304, 360, 313.5, { align: 'center', size: 7.8, noWrap: true });
      var ent6 = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
      put(1, ent6[0] || '', 226, 298, 313.5, { align: 'center', size: 7.6, noWrap: true });
      put(1, ent6[1] || '', 165, 220, 313.5, { align: 'right', size: 7.8, noWrap: true });
      put(1, ent6[2] || '', 98, 158, 313.5, { align: 'right', size: 7.8, noWrap: true });
      put(1, (ent6[3] || '').replace(/^עד\s*/, ''), 38, 92, 313.5, { align: 'center', size: 7.4, noWrap: true });

      put(1, abr.country, 495, 558, 265.5, { align: 'left', size: 7.8, noWrap: true });
      put(1, abr.city, 412, 488, 265.5, { align: 'left', size: 7.8, noWrap: true });
      put(1, abr.street, 320, 406, 265.5, { align: 'left', size: 7.2, noWrap: true });
      var abrNum = (abr.street.match(/\b(\d+)\b/) || [])[1] || '';
      put(1, abrNum, 272, 314, 265.5, { align: 'center', size: 7.8, noWrap: true });
      put(1, s.pf_sp_relation_he || (isMarried ? 'בת זוג נשואה' : ''), 198, 265, 265.5, { align: 'right', size: 7.6, noWrap: true });
      put(1, s.pf_phone_il, 38, 108, 265.5, { align: 'center', size: 7.8, noWrap: true });

      var refLines = String(s.pf_ash6_refs || '').split(/\n+/).filter(Boolean);
      [673.0, 647.0].forEach(function(ry, rIdx) {
        if (!refLines[rIdx]) return;
        var cols = refLines[rIdx].split(/[|•,]/).map(function(x){ return x.trim(); });
        var nmP = (cols[0] || '').split(/\s+/);
        var rGiven = nmP.slice(0, -1).join(' ') || cols[0] || '';
        var rSur = nmP.length > 1 ? nmP[nmP.length - 1] : '';
        putComb(2, cols[1] || '', 445.6, 12.35, ry, 9, true);
        put(2, rSur, 376, 440, ry, { align: 'right', size: 8.0, noWrap: true });
        put(2, rGiven, 305, 370, ry, { align: 'right', size: 8.0, noWrap: true });
        put(2, cols[2] || '', 240, 298, ry, { align: 'right', size: 7.8, noWrap: true });
        put(2, cols[3] || il.city, 118, 232, ry, { align: 'center', size: 7.4, noWrap: true });
        put(2, cols[4] || '', 38, 111, ry, { align: 'center', size: 7.6, noWrap: true });
      });

      put(2, spFullHe, 250, 395, 275.5, { align: 'center', bold: true, yWrapCenter: 277.0, lineShift: 3.2, wrapSize: 6.2 });
      put(2, s.pf_sp_tz, 155, 240, 275.5, { align: 'center', bold: true, noWrap: true });
      put(2, today.todayFull, 65, 130, 275.5, { align: 'center', noWrap: true });

      put(2, ((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim(), 250, 395, 223.0, { align: 'center', bold: true, yWrapCenter: 224.5, lineShift: 3.2, wrapSize: 6.2 });
      put(2, s.pf_pass_num, 155, 240, 223.0, { align: 'center', bold: true, noWrap: true });
      put(2, today.todayFull, 65, 130, 223.0, { align: 'center', noWrap: true });

      [654.7, 624.7, 594.7, 546.7, 516.7].forEach(function(cy) { check(3, 532.2, cy); });
      put(3, branchCity, 385, 455, 270.5, { align: 'right', bold: true, noWrap: true });
      put(3, today.todayFull, 265, 330, 270.5, { align: 'center', bold: true, noWrap: true });

      put(4, s.pf_given_he, 402, 485, 688.5, { align: 'right', bold: true, noWrap: true });
      put(4, s.pf_surname_he, 245, 344, 688.5, { align: 'right', bold: true, noWrap: true });
      put(4, s.pf_pass_num, 125, 221, 688.5, { align: 'center', bold: true, noWrap: true });
      [665.2, 621.3, 602.6, 583.9, 565.4, 533.9, 515.4, 484.0, 460.0, 436.0, 412.0, 393.2, 374.7].forEach(function(cy) {
        check(4, 534.8, cy);
      });
      put(4, branchCity, 395, 470, 214.0, { align: 'right', bold: true, noWrap: true });
      put(4, today.todayFull, 255, 325, 214.0, { align: 'center', bold: true, noWrap: true });

      if (s.pf_ll_affidavit) {
        var ll = String(s.pf_ll_affidavit).split(/[|•]/).map(function(x){ return x.trim(); });
        var llNm = (ll[0] || '').split(/\s+/);
        put(5, llNm[0] || '', 376, 456, 702.0, { align: 'right', bold: true, noWrap: true });
        put(5, llNm.slice(1).join(' ') || '', 200, 312, 702.0, { align: 'right', bold: true, noWrap: true });
        put(5, ll[1] || '', 60, 165, 702.0, { align: 'center', bold: true, noWrap: true });
        check(5, 197.5, 654.5); put(5, 'שוכרים', 118, 170, 656.5, { align: 'right', size: 8.0, noWrap: true });
        put(5, spFullHe, 412, 538, 638.0, { align: 'center', size: 7.2, bold: true, yWrapCenter: 640.5, lineShift: 3.2, wrapSize: 5.8 });
        put(5, s.pf_sp_tz, 325, 405, 638.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
        put(5, today.todayFull, 85, 160, 638.0, { align: 'center', size: 8.0, noWrap: true });
        put(5, ((s.pf_given_he || '') + ' ' + (s.pf_surname_he || '')).trim(), 345, 462, 611.0, { align: 'center', size: 7.2, bold: true, yWrapCenter: 613.5, lineShift: 3.2, wrapSize: 5.8 });
        put(5, s.pf_pass_num, 135, 245, 611.0, { align: 'center', size: 8.2, bold: true, noWrap: true });
        put(5, il.city, 260, 325, 590.5, { align: 'center', size: 8.0, bold: true, noWrap: true });
        put(5, ll[2] || (il.streetWithNum + ', ' + il.city), 105, 200, 590.5, { align: 'center', size: 7.6, noWrap: true });
        put(5, ll[3] || '', 362, 408, 558.5, { align: 'center', bold: true, noWrap: true });
        put(5, ll[4] || '', 292, 330, 558.5, { align: 'center', bold: true, noWrap: true });
        put(5, ll[5] || '', 212, 248, 558.5, { align: 'center', bold: true, noWrap: true });
        [313.0, 297.0, 281.0, 265.0].forEach(function(uy) { check(5, 276.0, uy); });
        put(5, ll[6] || '', 220, 400, 245.5, { align: 'right', size: 8.0, noWrap: true });
        put(5, today.todayFull, 418, 505, 158.5, { align: 'center', noWrap: true });
      }
    }

    return await pdfDoc.save();
  }

  var _fontCache = {};
  async function browserLoadBytes(url) {
    if (_fontCache[url]) return _fontCache[url];
    var r = await fetch(url);
    if (!r.ok) throw new Error('Failed to load ' + url);
    var buf = new Uint8Array(await r.arrayBuffer());
    _fontCache[url] = buf;
    return buf;
  }

  async function stampInBrowser(formKey, stateObj, filenamePrefix) {
    if (!root.PDFLib || !root.fontkit) throw new Error('PDF engine still loading—try again in 1 second.');
    var bytes = await generateStampedPdfBytes(formKey, stateObj, {
      PDFLib: root.PDFLib,
      fontkit: root.fontkit,
      loadPdfBytes: function(fname) { return browserLoadBytes('/forms/gov-pdfs/' + fname); },
      loadFontBytes: function(fname) { return browserLoadBytes('/app/vendor/' + fname); }
    });
    var blob = new Blob([bytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    var win = root.open(url, '_blank');
    if (!win) {
      var a = document.createElement('a');
      a.href = url;
      a.download = (filenamePrefix || 'Official_PIBA_') + formKey + '.pdf';
      document.body.appendChild(a); a.click(); a.remove();
    }
    if (formKey === 'ash456') {
      var mrBytes = await generateStampedPdfBytes('mr14', stateObj, {
        PDFLib: root.PDFLib,
        fontkit: root.fontkit,
        loadPdfBytes: function(fname) { return browserLoadBytes('/forms/gov-pdfs/' + fname); },
        loadFontBytes: function(fname) { return browserLoadBytes('/app/vendor/' + fname); }
      });
      var mrBlob = new Blob([mrBytes], { type: 'application/pdf' });
      var dl = document.createElement('a');
      dl.href = URL.createObjectURL(mrBlob);
      dl.download = 'Official_PIBA_MR14a_Registry.pdf';
      document.body.appendChild(dl); dl.click(); dl.remove();
    }
  }

  root.buildRandomStressPersona = buildRandomStressPersona;
  root.DEMO_PERSONA = buildRandomStressPersona();
  root.generateStampedPdfBytes = generateStampedPdfBytes;
  root.stampOfficialGovPdf = function(formKey, stateObj) {
    return stampInBrowser(formKey, stateObj, 'Official_PIBA_');
  };
  root.stampDemoPersonaPdf = function(optFormKey) {
    var fk = optFormKey || (root.gatFormsState && root.gatFormsState.pf_active_form) || 'ash3';
    return stampInBrowser(fk, buildRandomStressPersona(), 'SAMPLE_FILLED_PIBA_');
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      buildRandomStressPersona: buildRandomStressPersona,
      DEMO_PERSONA: buildRandomStressPersona(),
      generateStampedPdfBytes: generateStampedPdfBytes
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
