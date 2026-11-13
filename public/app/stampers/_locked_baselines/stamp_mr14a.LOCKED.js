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
  check(0, 528.9, 458.2, 7.1, 7.1, 'blue');
  check(0, 528.9, 446.5, 7.1, 7.1, 'blue');
  check(0, 481.7, 458.2, 7.1, 7.1, 'blue');
  check(0, 481.7, 446.1, 7.1, 7.1, 'blue');
  check(0, 434.5, 458.2, 7.1, 7.1, 'blue');
  check(0, 434.5, 446.1, 7.1, 7.1, 'blue');
  check(0, 376.9, 469.6, 7.1, 7.1, 'blue');
  check(0, 376.9, 458.7, 7.1, 7.1, 'blue');
  check(0, 376.9, 447.8, 7.1, 7.1, 'blue');

  put(0, s.pf_edu_years || '16', 250.6, 311.6, 449.4, { align: 'center', size: 8.2, bold: true, noWrap: true });
  put(0, s.pf_occupation_he || 'אדריכלית נוף בכירה', 145.6, 250.6, 449.4, { align: 'center', size: 7.5, wrapSize: 6.8, yWrapCenter: 454.5, lineShift: 3.6 });
  put(0, s.pf_foreign_grandfather || 'אליעזר מנחם מונטפיורי', 22.9, 145.6, 449.4, { align: 'center', size: 7.4, wrapSize: 6.6, yWrapCenter: 454.5, lineShift: 3.6 });

  // =========================================================================
  // 8. MARRIAGE DETAILS, PRIOR STATUS & FOREIGN MILITARY (y = 423.5 / 412.5, 385.6)
  // =========================================================================
  putDateYMD_RTL(0, s.pf_marriage_date, '14/08/2022', 430.0, 464.0, 500.0, 538.0, 423.5);
  put(0, (s.pf_marriage_place_he || abr.city || 'ליון - צרפת').replace(/,/g, ''), 297.1, 420.2, 412.5, { align: 'center', size: 7.8, noWrap: true });
  put(0, s.pf_prev_status_il_he || 'ב/2 תייר', 120.9, 297.1, 412.5, { align: 'center', size: 8.0, noWrap: true });

  check(0, 105.9, 422.8, 7.1, 7.1, 'blue');
  check(0, 105.9, 411.1, 7.1, 7.1, 'blue');

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
    var kId = (kids[k] && (kids[k].tz || kids[k].id || kids[k].pass_num)) || kidCoords[k].fallback;
    putIdGrid9(0, kId, kidCoords[k].col, kidCoords[k].y);
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

  // הערות (sitting 2.5pt above dotted lines 2, 3, 4: y=215.5, 196.5, 177.5) & חותמת הלשכה (y=118.0)
  put(0, 'ללא הסתייגויות — כל הפרטים לעיל נכונים ומדויקים.', 22.9, 250.6, 215.5, { align: 'center', size: 7.4, noWrap: true });
  put(0, 'נבדקו מסמכי מקור בלשכת רשות האוכלוסין.', 22.9, 250.6, 196.5, { align: 'center', size: 7.4, noWrap: true });
  put(0, 'תיק גיור / מעמד אושר לרישום.', 22.9, 250.6, 181.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, 'לשכת חיפה — רשות האוכלוסין', 22.9, 250.6, 118.0, { align: 'center', size: 7.8, bold: true, noWrap: true });

  // מספר הזהות (minor parent ID box: x=182.3..250.6, y=63.0)
  put(0, s.pf_sp_tz || '034567890', 22.9, 145.6, 82.0, { align: 'center', size: 8.4, bold: true, noWrap: true });

  // =========================================================================
  // 11. BOTTOM ROW: REGISTRATION DATE & 3 SIGNATURE BOXES (y = 51.0 / 43.0)
  // =========================================================================
  putDateYMD_RTL(0, s.pf_reg_date || (today && today.todayFull), '12/11/2026', 415.0, 449.0, 484.0, 528.0, 51.0);
  put(0, 'אביגיל גולדשמיט', 270.5, 393.6, 43.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, 'שמואל גולדשמיט', 145.6, 270.5, 43.0, { align: 'center', size: 8.0, bold: true, noWrap: true });
  put(0, 'פקידי מרשם — חיפה', 22.9, 145.6, 43.0, { align: 'center', size: 7.8, bold: true, noWrap: true });

  return await ctx.pdfDoc.save();
}

module.exports = { stampMr14a: stampMr14a, stampAuto: stampMr14a };
