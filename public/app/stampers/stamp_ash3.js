'use strict';
var core = require('./stamper_core.js');

async function stampAsh3(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('ash3_extension_change_visa.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check, putComb = ctx.putComb;
  var dob = ctx.dob, fDob = ctx.fDob, mDob = ctx.mDob, pIss = ctx.pIss, pExp = ctx.pExp, today = ctx.today;
  var il = ctx.il, abr = ctx.abr, branchCity = ctx.branchCity;
  var isFemale = ctx.isFemale, mar = ctx.mar, isMarried = ctx.isMarried, isDiv = ctx.isDiv, isWid = ctx.isWid;
  var relHe = ctx.relHe, natHe = ctx.natHe;
  var spFullHe = ctx.spFullHe, spGivenHe = ctx.spGivenHe, spSurHe = ctx.spSurHe;
  var abrCityHe = ctx.abrCityHe, abrCountryHe = ctx.abrCountryHe;

  var actStr = String(s.pf_ash3_action || '');
  var mMonths = actStr.match(/(\d+)\s*(?:חודש|month)/i);
  var extMonths = s.pf_ash3_months || (mMonths ? mMonths[1] : '');
  var mVisaHe = actStr.match(/([אב]\/[1-5])/);
  var targetVisaHe = s.pf_ash3_target_visa_he || (mVisaHe ? mVisaHe[1] : '');
  var visaHeToEn = { 'א/1': 'A/1', 'א/2': 'A/2', 'א/3': 'A/3', 'א/4': 'A/4', 'א/5': 'A/5', 'ב/1': 'B/1', 'ב/2': 'B/2', 'ב/3': 'B/3', 'ב/4': 'B/4' };
  var targetVisaEn = s.pf_ash3_target_visa_en || visaHeToEn[targetVisaHe] || '';

  if (extMonths) {
    check(0, 552.5, 696.7, 7.1, 7.1, 'green');
    check(0, 125.9, 697.8, 7.1, 7.1, 'green');
    put(0, extMonths, 456, 492, 686.5, { align: 'center', size: 9.4, noWrap: true });
    put(0, extMonths, 235, 297, 687.5, { align: 'center', size: 9.4, noWrap: true });
  }
  if (targetVisaHe || targetVisaEn) {
    check(0, 552.5, 673.4, 7.1, 7.1, 'green');
    check(0, 125.9, 674.5, 7.1, 7.1, 'green');
    put(0, targetVisaHe, 365, 422, 674.8, { align: 'center', size: 9.4, noWrap: true });
    put(0, targetVisaEn, 290, 353, 674.8, { align: 'center', size: 9.4, noWrap: true });
  }

  // Row 1: Applicant Names & Family Status
  put(0, s.pf_surname_he, 389, 503, 559.0, { align: 'center', size: 7.6, yWrapCenter: 560.5, lineShift: 3.6, wrapSize: 7.4 });
  put(0, s.pf_given_he, 290, 383, 559.0, { align: 'center', size: 7.6, yWrapCenter: 560.5, lineShift: 3.6, wrapSize: 7.4 });
  put(0, s.pf_prior_names, 212, 284, 559.0, { align: 'center', size: 7.4, yWrapCenter: 560.5, lineShift: 3.6, wrapSize: 7.2 });

  put(0, s.pf_surname_en, 389, 503, 542.0, { align: 'center', size: 7.4, yWrapCenter: 543.5, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_given_en, 290, 383, 542.0, { align: 'center', size: 7.4, yWrapCenter: 543.5, lineShift: 3.6, wrapSize: 7.2 });
  put(0, s.pf_prior_names_en, 212, 284, 542.0, { align: 'center', size: 7.2, yWrapCenter: 543.5, lineShift: 3.6, wrapSize: 7.0 });

  if (s._stressAllCheckboxes) {
    check(0, 196.6, 560.1, 7.1, 7.1, 'green');
    check(0, 114.4, 560.1, 7.1, 7.1, 'green');
    check(0, 196.6, 544.9, 7.1, 7.1, 'green');
    check(0, 114.4, 544.9, 7.1, 7.1, 'green');
  } else {
    if (isMarried) check(0, 114.4, 560.1, 7.1, 7.1, 'green');
    else if (isDiv) check(0, 196.6, 544.9, 7.1, 7.1, 'green');
    else if (isWid) check(0, 114.4, 544.9, 7.1, 7.1, 'green');
    else if (mar) check(0, 196.6, 560.1, 7.1, 7.1, 'green');
  }

  // Row 2: Birth Country, DOB, Nationality, Religion, Citizenship
  var birthEn = s.pf_birth_country_en || ((abr.city ? abr.city.toUpperCase() + ', ' : '') + (abr.country ? abr.country.toUpperCase() : ''));
  var natEn = s.pf_nationality_en || (/יהוד/.test(natHe) ? 'JEWISH' : '');
  var relEn = s.pf_religion_en || (/יהוד/.test(relHe) ? 'JEWISH' : '');
  var citEn = s.pf_citizenship_en || '';

  put(0, s.pf_birth_country, 391, 506, 499.0, { align: 'center', size: 7.6, noWrap: true });
  put(0, dob.full, 292, 386, 489.0, { align: 'center', size: 11.4, noWrap: true });
  put(0, natHe, 205, 286, 499.0, { align: 'center', size: 7.6, noWrap: true });
  put(0, relHe, 135, 200, 499.0, { align: 'center', size: 7.6, noWrap: true });
  put(0, s.pf_citizenship, 37, 130, 499.0, { align: 'center', size: 7.6, noWrap: true });

  put(0, birthEn, 391, 506, 482.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, natEn, 205, 286, 482.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, relEn, 135, 200, 482.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, citEn, 37, 130, 482.0, { align: 'center', size: 7.4, noWrap: true });

  // Row 3: Parents & Mother's Maiden Name + Parents DOB
  put(0, s.pf_father_he, 431, 507, 438.5, { align: 'center', size: 7.4, yWrapCenter: 440.0, lineShift: 3.5, wrapSize: 7.0 });
  put(0, fDob.full, 339, 426, 429.0, { align: 'center', size: 11.4, noWrap: true });
  put(0, s.pf_mother_he, 240, 334, 438.5, { align: 'center', size: 7.4, yWrapCenter: 440.0, lineShift: 3.5, wrapSize: 7.0 });
  put(0, mDob.full, 141, 234, 429.0, { align: 'center', size: 11.4, noWrap: true });
  put(0, s.pf_mother_maiden, 37, 135, 438.5, { align: 'center', size: 7.4, yWrapCenter: 440.0, lineShift: 3.5, wrapSize: 7.0 });

  put(0, s.pf_father_en, 430, 508, 421.5, { align: 'center', size: 7.2, yWrapCenter: 423.0, lineShift: 3.4, wrapSize: 6.8 });
  put(0, s.pf_mother_en, 239, 335, 421.5, { align: 'center', size: 7.2, yWrapCenter: 423.0, lineShift: 3.4, wrapSize: 6.8 });
  put(0, s.pf_mother_maiden_en, 37, 135, 421.5, { align: 'center', size: 7.2, yWrapCenter: 423.0, lineShift: 3.4, wrapSize: 6.8 });

  // Row 4: Email & Travel Document
  put(0, s.pf_email, 395, 558, 368.0, { align: 'left', size: 8.2, noWrap: true });
  if (s._stressAllCheckboxes) {
    check(0, 353.5, 396.2, 7.1, 7.1, 'green');
    check(0, 352.0, 396.2, 7.1, 7.1, 'green');
  } else if (s.pf_pass_num) {
    check(0, 353.5, 396.2, 7.1, 7.1, 'green');
  }
  put(0, s.pf_pass_num, 276, 389, 358.0, { align: 'center', size: 8.8, noWrap: true });
  put(0, pIss.full, 157, 270, 358.0, { align: 'center', size: 9.4, noWrap: true });
  put(0, pExp.full, 38, 151, 358.0, { align: 'center', size: 9.4, noWrap: true });

  // Row 5: Permanent Address Abroad
  var abrHeParts = String(s.pf_abroad_addr_he || '').split(',').map(function(x){ return x.trim(); }).filter(Boolean);
  var abrStreetHe = abrHeParts.length >= 3 ? abrHeParts.slice(0, -2).join(', ') : (abrHeParts[0] || '');
  var abrTownHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 2] : (abrHeParts[1] || abrCityHe);
  var abrLandHe = abrHeParts.length >= 3 ? abrHeParts[abrHeParts.length - 1] : abrCountryHe;

  put(0, abrLandHe, 389, 504, 303.0, { align: 'center', size: 7.6, noWrap: true });
  put(0, abrTownHe, 267, 384, 303.0, { align: 'center', size: 7.6, noWrap: true });
  put(0, abrStreetHe, 146, 262, 303.0, { align: 'center', size: 7.4, yWrapCenter: 304.0, lineShift: 3.5, wrapSize: 7.0 });

  put(0, abr.country, 389, 504, 284.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, abr.city, 267, 384, 284.0, { align: 'center', size: 7.4, noWrap: true });
  put(0, abr.street, 146, 262, 284.0, { align: 'center', size: 7.2, yWrapCenter: 285.0, lineShift: 3.5, wrapSize: 6.8 });
  put(0, s.pf_phone_abroad || s.pf_phone_il, 36, 141, 295.0, { align: 'center', size: 8.4, noWrap: true });

  // Row 6: Address in Israel
  var cleanIlStreetHe = String(il.streetWithNum || '').replace(/,/g, ' •');
  put(0, il.city, 389, 504, 235.5, { align: 'center', size: 7.6, noWrap: true });
  put(0, cleanIlStreetHe, 147, 383, 235.5, { align: 'center', size: 7.6, noWrap: true });
  put(0, s.pf_il_city_en, 389, 504, 215.5, { align: 'center', size: 7.4, noWrap: true });
  put(0, s.pf_il_street_en, 147, 383, 215.5, { align: 'center', size: 7.4, noWrap: true });
  put(0, s.pf_phone_il, 36, 141, 226.0, { align: 'center', size: 8.4, noWrap: true });

  // Row 7: Institution Where Applicant is Studying (Top row: בעברית y=143.5, Bottom row: In English y=124.5)
  if (s.pf_inst_details) {
    var instP = String(s.pf_inst_details).split(/[•|]/).map(function(x){ return x.trim(); });
    put(0, instP[0] || '', 438, 504, 143.5, { align: 'center', size: 7.4, yWrapCenter: 144.5, lineShift: 3.5, wrapSize: 7.0 });
    put(0, il.city, 311, 433, 143.5, { align: 'center', size: 7.6, noWrap: true });
    put(0, instP[1] || '', 219, 305, 143.5, { align: 'center', size: 8.4, noWrap: true });
    put(0, instP[2] || '', 134, 213, 143.5, { align: 'center', size: 7.4, yWrapCenter: 144.5, lineShift: 3.5, wrapSize: 7.0 });
    put(0, instP[3] || '', 39, 128, 143.5, { align: 'center', size: 8.0, noWrap: true });

    // Bottom "In English" row of Institution table
    put(0, s.pf_inst_name_en || 'UNIVERSITY OF MASSACHUSETTS', 438, 504, 131.0, { align: 'center', size: 7.2, yWrapCenter: 125.5, lineShift: 3.5, wrapSize: 6.8 });
    put(0, s.pf_inst_addr_en || (s.pf_il_street_en ? s.pf_il_street_en + ', ' + s.pf_il_city_en : 'HAIFA'), 311, 433, 127.5, { align: 'center', size: 7.2, yWrapCenter: 125.5, lineShift: 3.5, wrapSize: 6.8 });
    put(0, instP[1] || '', 219, 305, 127.5, { align: 'center', size: 8.4, noWrap: true });
    put(0, s.pf_inst_contact_en || 'RABBI DAVID COHEN', 134, 213, 127.5, { align: 'center', size: 7.2, yWrapCenter: 125.5, lineShift: 3.5, wrapSize: 6.8 });
    put(0, instP[3] || '', 39, 128, 127.5, { align: 'center', size: 8.0, noWrap: true });
  }

  // =========================================================================
  // Page 2 (index 1) — Applicant Summary, Spouse Row, Children, & Declaration
  // =========================================================================
  put(1, s.pf_surname_he, 446, 554, 665.5, { align: 'center', size: 7.6, yWrapCenter: 666.5, lineShift: 3.8, wrapSize: 7.4 });
  put(1, s.pf_surname_en, 354, 440, 665.5, { align: 'center', size: 7.4, yWrapCenter: 666.5, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_given_he, 262, 348, 665.5, { align: 'center', size: 7.6, yWrapCenter: 666.5, lineShift: 3.8, wrapSize: 7.4 });
  put(1, s.pf_given_en, 169, 256, 665.5, { align: 'center', size: 7.4, yWrapCenter: 666.5, lineShift: 3.8, wrapSize: 7.2 });
  put(1, s.pf_pass_num, 46, 164, 665.5, { align: 'center', size: 8.8, noWrap: true });

  if (spFullHe) {
    put(1, spSurHe, 495, 567, 594.0, { align: 'center', size: 7.6, yWrapCenter: 595.0, lineShift: 3.8, wrapSize: 7.4 });
    put(1, spGivenHe, 413, 489, 594.0, { align: 'center', size: 7.6, yWrapCenter: 595.0, lineShift: 3.8, wrapSize: 7.4 });
    if (s._stressAllCheckboxes) {
      // In Israel: Yes - כן (Green) / No - לא (Red)
      check(1, 389.8, 597.7, 7.1, 7.1, 'green');
      check(1, 389.8, 583.8, 7.1, 7.1, 'red');
      // Status (If Present In Israel): 3 boxes (Visitor = 602.5, Temporary Resident = 593.2, Permanent Resident = 584.0)
      check(1, 331.6, 602.5, 7.1, 7.1, 'green');
      check(1, 331.6, 593.2, 7.1, 7.1, 'green');
      check(1, 331.6, 584.0, 7.1, 7.1, 'green');
    } else {
      check(1, 389.8, 597.7, 7.1, 7.1, 'green');
      check(1, 331.6, 584.0, 7.1, 7.1, 'green');
    }
    putComb(1, s.pf_sp_tz, 108.2, 12.75, 584.5, 9, true);
    put(1, s.pf_sp_citizenship_he, 48, 105, 594.0, { align: 'center', size: 7.6, noWrap: true });
  }

  // Children Under the Age of 18 (Page 2: Strict separate bounds for English vs Hebrew sub-columns)
  var kids = Array.isArray(s.pf_children_rows) ? s.pf_children_rows : [];
  var kidY = [513.5, 496.5, 479.5];
  for (var ki = 0; ki < 3; ki++) {
    if (kids[ki]) {
      // Given Name: English sub-col (x: 303..365), Hebrew sub-col (x: 432..495)
      put(1, kids[ki].given || '', 303, 365, kidY[ki], { align: 'center', size: 6.8, allowThreeLines: false, yWrapCenter: kidY[ki]+0.8, lineShift: 3.4, wrapSize: 6.4 });
      put(1, kids[ki].given_he || '', 432, 495, kidY[ki], { align: 'center', size: 7.0, allowThreeLines: false, yWrapCenter: kidY[ki]+0.8, lineShift: 3.4, wrapSize: 6.8 });
      // Country of Birth: English sub-col (x: 173..235), Hebrew sub-col (x: 239..300)
      put(1, kids[ki].country_en || '', 173, 235, kidY[ki], { align: 'center', size: 6.4, noWrap: true });
      put(1, kids[ki].country || '', 239, 300, kidY[ki], { align: 'center', size: 6.8, noWrap: true });
      // Date of Birth: English sub-col (x: 106..171), Hebrew sub-col (x: 37..106)
      put(1, kids[ki].dob || '', 106, 171, kidY[ki], { align: 'center', size: 8.2, noWrap: true });
      put(1, kids[ki].dob || '', 37, 106, kidY[ki], { align: 'center', size: 8.2, noWrap: true });
    }
  }

  put(1, branchCity, 415, 555, 263.0, { align: 'center', size: 8.4, noWrap: true });
  put(1, today.todayFull, 235, 365, 263.0, { align: 'center', size: 9.4, noWrap: true });

  return await ctx.pdfDoc.save();
}

module.exports = { stampAsh3: stampAsh3 };
