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

if (require.main === module) {
  (async function() {
    var fs = require('fs');
    var path = require('path');
    var PDFLib = require('../vendor/pdf-lib.min.js');
    var fontkit = require('../vendor/fontkit.umd.min.js');
    var root = path.resolve(__dirname, '../../..');
    var outDir = '/Users/shaliach/Desktop/PIBA_Filled_Proofs';
    var persona = Object.assign(core.buildRandomStressPersona(), { _stressAllCheckboxes: true });

    var bytes = await stampMr14b(persona, {
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
    var outPath = path.join(outDir, 'mr14b_registry_notice_FILLED.pdf');
    fs.writeFileSync(outPath, bytes);
    console.log('✅ Saved FILLED:', outPath);
  })().catch(function(e) { console.error(e); process.exit(1); });
}
