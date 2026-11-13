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
