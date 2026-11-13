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

  // Top Request Type Checkboxes (Both Checked)
  check(1, 495.7, 650.6, 7.1, 7.1, 'green');
  check(1, 277.9, 650.6, 7.1, 7.1, 'green');

  // Inviter Status Checkboxes (Both Checked)
  check(1, 318.4, 612.5, 7.1, 7.1, 'green');
  check(1, 265.4, 612.5, 7.1, 7.1, 'green');

  // Inviter Row 1: 9-Cell ID Comb + 5 Multi-Row Name Boxes (Y = 561.0 .. 585.0)
  putExactComb(1, s.pf_sp_tz || '012345674', p2InviterTzLines, 565.0, true);
  put(1, 'לוי-אפשטיין אשכנזי ירושלמי', 371.2, 456.3, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, 'יונתן מתתיהו רפאל שלמה', 286.1, 371.2, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, 'אברהם משה בנימין אלעזר', 201.2, 286.1, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, 'יעקב שלמה יצחק מנחם', 116.1, 201.2, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });
  put(1, 'לאה רבקה שרה רחל', 31.0, 116.1, 568.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 571.0, lineShift: 4.2 });

  // Inviter Row 2: DOB, Gender, Marital Status, Marriage Date, Religion, Nationality (Y = 520.9 .. 543.7)
  put(1, spDobM ? spDobM[3] : '1991', 535.1, 564.8, 524.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, spDobM ? spDobM[2] : '07',   505.3, 535.1, 524.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, spDobM ? spDobM[1] : '15',   475.4, 505.3, 524.5, { align: 'center', size: 8.0, noWrap: true });

  check(1, 460.5, 535.3, 7.1, 7.1, 'green');
  check(1, 460.5, 524.9, 7.1, 7.1, 'green');
  check(1, 416.8, 535.3, 7.1, 7.1, 'green');
  check(1, 416.8, 524.9, 7.1, 7.1, 'green');
  check(1, 380.8, 535.3, 7.1, 7.1, 'green');
  check(1, 380.8, 524.9, 7.1, 7.1, 'green');

  put(1, '14/06/2026', 244.4, 350.7, 528.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, relHe || 'יהודית', 138.1, 244.4, 528.5, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 530.5, lineShift: 4.0 });
  put(1, natHe || 'יהודייה', 31.9, 138.1, 528.5, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 530.5, lineShift: 4.0 });

  // Inviter Row 3: Prior Family Name, Prior Given Name, Entry Date, Citizenship, Status Date, Occupation (Y = 481.5 .. 503.6)
  put(1, 'כהן-שוורצמן אלכסנדרוני', 476.7, 565.9, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, 'עמנואל יהונתן אלעזר', 387.6, 476.7, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, s.pf_sp_entry_date || '15/07/1991', 298.4, 387.6, 488.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, 'ישראלית ואמריקאית', 209.2, 298.4, 488.5, { align: 'center', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });
  put(1, s.pf_sp_status_date || '15/07/1991', 120.0, 209.2, 488.5, { align: 'center', size: 8.0, noWrap: true });
  put(1, 'מהנדס מערכות מידע ותוכנה', 30.8, 120.0, 488.5, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 491.0, lineShift: 4.0 });

  // Inviter Row 4: Address & Phones (Y = 433.8 .. 453.3 / 464.2)
  put(1, 'חיפה נווה שאנן', 489.9, 565.9, 440.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 442.5, lineShift: 3.8 });
  put(1, 'שדרות הרצל המייסדים', 336.9, 489.9, 440.0, { align: 'right', size: 7.6, wrapSize: 7.2, yWrapCenter: 442.5, lineShift: 3.8 });
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

  check(1, 57.7, 362.7, 7.1, 7.1, 'green');
  check(1, 57.7, 352.3, 7.1, 7.1, 'green');

  // Invited Row 2: Marital Status (All 4 Checked), Religion, Nationality, Citizenship, Entry Date, Port, Status, Visa Expiry (Y = 308.4 .. 331.6)
  check(1, 551.0, 321.3, 7.1, 7.1, 'green');
  check(1, 551.0, 310.9, 7.1, 7.1, 'green');
  check(1, 519.8, 321.3, 7.1, 7.1, 'green');
  check(1, 519.8, 310.9, 7.1, 7.1, 'green');

  var ent6 = String(s.pf_entry_date_port || '').split(/[•|]/).map(function(x){ return x.trim(); });
  put(1, relHe || 'יהודית', 428.5, 489.9, 316.0, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, natHe || 'יהודייה', 365.5, 428.5, 316.0, { align: 'center', size: 7.8, wrapSize: 7.2, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, 'צרפתית ושוויצרית', 302.4, 365.5, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, ent6[0] || '01/09/2026', 221.4, 302.4, 316.0, { align: 'center', size: 7.8, noWrap: true });
  put(1, 'נתב״ג טרמינל 3', 158.4, 221.4, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, 'ב/2 תייר בהליך', 95.4, 158.4, 316.0, { align: 'center', size: 7.6, wrapSize: 7.0, yWrapCenter: 318.5, lineShift: 4.0 });
  put(1, (ent6[3] || '01/12/2026').replace(/^עד\s*/, ''), 30.8, 95.4, 316.0, { align: 'center', size: 7.6, noWrap: true });

  // Invited Row 3: Abroad Address, Relation to Inviter, Home Phone, Mobile Phone (Y = 260.6 .. 280.2 / 291.1)
  put(1, 'France Rhone-Alpes', 489.9, 565.9, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
  put(1, 'Lyon Metropolis', 401.5, 489.9, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
  put(1, 'Rue de la Republique', 320.4, 401.5, 266.5, { align: 'center', size: 7.4, wrapSize: 7.0, yWrapCenter: 269.0, lineShift: 3.8 });
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
    var cr = cRows[idx] || {};
    var cDob = core.splitIsoDate(cr.dob || '14/05/2018');
    put(1, cr.id_num || 'FR1122334', 496.7, 563.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, 'גולדשמיט-מונטפיורי', 424.6, 496.7, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cr.given_he || 'אריאל אלכסנדר בנימין', 352.6, 424.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, 'עמנואל אברהם לוי-צדק', 280.6, 352.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cr.country || 'ליון, צרפת', 216.7, 280.6, band.y, { align: 'right', size: 7.4, wrapSize: 7.0, yWrapCenter: band.yc, lineShift: 3.8 });
    put(1, cDob.y || '2018', 189.6, 216.7, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, cDob.m || '05',   162.6, 189.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    put(1, cDob.d || '14',   135.6, 162.6, band.y, { align: 'center', size: 7.6, noWrap: true });
    check(1, 120.7, band.chkM, 7.1, 7.1, 'green');
    check(1, 120.7, band.chkF, 7.1, 7.1, 'green');
    put(1, cr.entry_date || '01/09/2026', 31.7, 86.5, band.y, { align: 'center', size: 7.4, noWrap: true });
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
    check(5, 260.9, 654.5, 7.1, 7.1, 'blue');
    check(5, 229.4, 654.5, 7.1, 7.1, 'blue');
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

    // Section ה: בקומה א (All 3 data rows populated: Y = 478.0, 461.0, 444.0)
    var floorARows = [
      { name: 'עמנואל ואביגיל לוי-גולדשמיט', father: 'מתתיהו', id: '012345674', rel: 'שוכרים ראשיים', date: '01/09/2026', paid_by: 'העברה בנקאית' },
      { name: 'אריאל אלכסנדר גולדשמיט', father: 'עמנואל', id: 'FR1122334', rel: 'בן השוכרת', date: '01/09/2026', paid_by: 'כלול בשכ״ד' },
      { name: 'נועה גבריאלה גולדשמיט', father: 'עמנואל', id: 'FR2233445', rel: 'בת השוכרת', date: '01/09/2026', paid_by: 'כלול בשכ״ד' }
    ];
    [478.0, 461.0, 444.0].forEach(function(fy, rIdx) {
      var r = floorARows[rIdx];
      put(5, r.name,    438, 554, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
      put(5, r.father,  366, 434, fy, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(5, r.id,      286, 362, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.rel,     206, 282, fy, { align: 'center', size: 7.0, bold: true, noWrap: true });
      put(5, r.date,    128, 202, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.paid_by,  36, 124, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
    });

    // Section ה: בקומה ב (All 3 data rows populated: Y = 398.0, 381.0, 364.0)
    var floorBRows = [
      { name: 'משה ושרה אהרן אלון', father: 'אהרן', id: '045678909', rel: 'בעלי הנכס', date: '01/01/2015', paid_by: 'בעלים' },
      { name: 'יוסף חיים אהרן אלון', father: 'משה', id: '312456780', rel: 'בן המשכיר', date: '01/01/2015', paid_by: 'סמוך על שולחנו' },
      { name: 'ללא דיירים נוספים', father: 'ללא', id: '000000000', rel: 'ללא', date: '01/09/2026', paid_by: 'ללא' }
    ];
    [398.0, 381.0, 364.0].forEach(function(fy, rIdx) {
      var r = floorBRows[rIdx];
      put(5, r.name,    438, 554, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
      put(5, r.father,  366, 434, fy, { align: 'center', size: 7.2, bold: true, noWrap: true });
      put(5, r.id,      286, 362, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.rel,     206, 282, fy, { align: 'center', size: 7.0, bold: true, noWrap: true });
      put(5, r.date,    128, 202, fy, { align: 'center', size: 7.6, bold: true, noWrap: true });
      put(5, r.paid_by,  36, 124, fy, { align: 'center', size: 6.8, bold: true, noWrap: true });
    });

    // Section ו: Utility Checkboxes (חשמל, מים, טלפון, ארנונה)
    [313.0, 297.0, 281.0, 265.0].forEach(function(uy) {
      check(5, 391.85, uy, 7.1, 7.1, 'green');
      check(5, 276.0,  uy, 7.1, 7.1, 'green');
    });

    // Section ז: התשלום מתבצע כדלקמן
    put(5, ll[6] || 'העברה בנקאית חודשית', 180, 405, 244.5, { align: 'center', size: 8.2, bold: true, noWrap: true });

    // Section ח: מצב משפחתי: רווק (458.5), נשוי (426.5), גרוש (392.5), אלמן (356.5) at exact Y = 223.5
    [464, 434.7, 405.7, 373.4].forEach(function(mx) { check(5, mx, 223.4, 7.1, 7.1, 'blue'); });
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
