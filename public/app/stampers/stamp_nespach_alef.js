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

  // Row 3: מאשר החתימה (שם ומשפחה size 9.7; תפקיד; תאריך; חתימה left blank)
  put(0, 'עו״ד רותם אברהמי',                                  440.7, 550.7, 78.5, { align: 'center', size: 9.7, bold: true, noWrap: true });
  put(0, 'רכזת מעמד ואשרות - לשכת ' + (branchCity || 'חיפה'), 305.5, 418.8, 78.5, { align: 'center', size: 8.0, noWrap: true });
  put(0, dateStr,                                             203.2, 275.4, 78.5, { align: 'center', size: 8.6, noWrap: true });

  return await ctx.pdfDoc.save();
}

module.exports = { stampNespachAlef: stampNespachAlef };

if (require.main === module) {
  (async function() {
    var fs = require('fs');
    var path = require('path');
    var PDFLib = require('../vendor/pdf-lib.min.js');
    var fontkit = require('../vendor/fontkit.umd.min.js');
    var root = path.resolve(__dirname, '../../..');
    var outDir = '/Users/shaliach/Desktop/PIBA_Filled_Proofs';
    var persona = Object.assign(core.buildRandomStressPersona(), { _stressAllCheckboxes: true });

    var bytes = await stampNespachAlef(persona, {
      PDFLib: PDFLib,
      fontkit: fontkit,
      loadPdfBytes: function(f) { return fs.readFileSync(path.join(root, 'public/forms/gov-pdfs', f)); },
      loadFontBytes: function(f) {
        var candidates = [
          path.join(root, 'public/app/vendor', f),
          path.join(root, 'public/app/fonts', f),
          path.join(root, 'public/fonts', f)
        ];
        return fs.readFileSync(candidates.find(function(p) { return fs.existsSync(p); }));
      }
    });

    fs.mkdirSync(outDir, { recursive: true });
    var outPath = path.join(outDir, 'nespach_alef_affidavit_FILLED.pdf');
    fs.writeFileSync(outPath, bytes);
    console.log('Saved FILLED:', outPath);
  })().catch(function(e) { console.error(e); process.exit(1); });
}
