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
if (require.main === module) {
  (async function() {
    var fs = require('fs');
    var path = require('path');
    var PDFLib = require('../vendor/pdf-lib.min.js');
    var fontkit = require('../vendor/fontkit.umd.min.js');
    var root = path.resolve(__dirname, '../../..');
    var outDir = '/Users/shaliach/Desktop/PIBA_Filled_Proofs';
    var persona = core.buildRandomStressPersona();
    persona._stressAllCheckboxes = true;

    var bytes = await stampAsh3(persona, {
      PDFLib: PDFLib,
      fontkit: fontkit,
      loadPdfBytes: function(f) { return fs.readFileSync(path.join(root, 'public/forms/gov-pdfs', f)); },
      loadFontBytes: function(f) { return fs.readFileSync(path.join("/Users/shaliach/development/data/giyur_aliyah_track/public/app/vendor", f)); }
    });

    fs.mkdirSync(outDir, { recursive: true });
    var outPath = path.join(outDir, 'ash3_extension_change_visa_FILLED.pdf');
    fs.writeFileSync(outPath, bytes);
    console.log('✅ Stamped with stamper_core.js:', outPath);
  })().catch(function(e) { console.error(e); process.exit(1); });
}
