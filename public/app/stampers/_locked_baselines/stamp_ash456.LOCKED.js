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
