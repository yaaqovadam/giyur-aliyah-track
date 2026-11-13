'use strict';
var core = require('./stamper_core.js');

async function stampSecurityCv(rawState, loaderOpts) {
  var ctx = await core.createStamperContext('security_cv_form.pdf', rawState, loaderOpts);
  var s = ctx.s, put = ctx.put, check = ctx.check;
  var today = ctx.today, dob = ctx.dob, il = ctx.il, abr = ctx.abr, branchCity = ctx.branchCity || 'חיפה';

  var spGivenHe = (ctx.spGivenHe || 'בנימין אלעזר נחמיה').replace(/,/g, '');
  var spSurHe   = (ctx.spSurHe   || 'לוי-אפשטיין אשכנזי').replace(/,/g, '');
  var spFullHe  = (ctx.spFullHe  || (spGivenHe + ' ' + spSurHe)).replace(/,/g, '');

  var apGivenHe = (s.pf_given_he   || 'דבורה לאה עמנואלה').replace(/,/g, '');
  var apSurHe   = (s.pf_surname_he || 'גולדשמיט-ברנשטיין רבינוביץ').replace(/,/g, '');
  var apFullHe  = (apGivenHe + ' ' + apSurHe).trim();
  var apGivenEn = (s.pf_given_en   || 'DEVORAH LEAH EMMANUELLA').replace(/,/g, '');
  var apSurEn   = (s.pf_surname_en || 'GOLDSCHMIDT-BERNSTEIN').replace(/,/g, '');
  var fatherHe  = (s.pf_father_he  || 'שמואל בנימין אלכסנדר').replace(/,/g, '');
  var motherHe  = (s.pf_mother_he  || 'מרים אסתר ויקטוריה').replace(/,/g, '');
  var maidenHe  = (s.pf_maiden_he  || 'גולדשטיין-לוי').replace(/,/g, '');

  var tzNum     = s.pf_sp_tz || s.pf_tz || '012345674';
  var passNum   = s.pf_pass_num || 'FR9876543';
  var dobStr    = (dob && dob.full) || '23/11/1994';
  var spDobStr  = s.pf_sp_dob || '15/07/1991';
  var marDate   = s.pf_marriage_date || '14/08/2022';
  var dateStr   = (today && today.todayFull) || '12/11/2026';

  var ilCity     = (il.city || 'חיפה').replace(/,/g, '');
  var ilStreet   = (il.street || 'שדרות הרצל').replace(/,/g, '');
  var ilHouse    = (il.houseNum || '42') + ' דירה ' + (il.apt || '9');
  var ilZip      = il.zip || '3321400';
  var abrCountry = (abr.country || 'צרפת').replace(/,/g, '');
  var abrCity    = (abr.city || 'ליון').replace(/,/g, '');

  function estWidth(str, fontSize) {
    var sVal = String(str || '');
    var w = 0;
    for (var i = 0; i < sVal.length; i++) {
      var c = sVal.charCodeAt(i);
      if (c === 32) w += fontSize * 0.28;
      else if (c >= 65 && c <= 90) w += fontSize * 0.65; // Uppercase English is wider
      else if (c >= 48 && c <= 57) w += fontSize * 0.55;
      else w += fontSize * 0.53;
    }
    return w;
  }

  function wrapTextToLines(text, availW, fontSize, maxLines) {
    var raw = String(text || '').trim();
    if (!raw) return [];
    if (estWidth(raw, fontSize) <= availW || maxLines <= 1) return [raw];

    var words = raw.split(/\s+/);
    var lines = [];
    var cur = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var test = cur ? (cur + ' ' + w) : w;
      if (estWidth(test, fontSize) <= availW || !cur) {
        cur = test;
      } else {
        lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);

    if (lines.length > maxLines) {
      var balanced = [];
      var perLine = Math.ceil(words.length / maxLines);
      for (var k = 0; k < maxLines; k++) {
        var slice = words.slice(k * perLine, (k + 1) * perLine).join(' ');
        if (slice) balanced.push(slice);
      }
      return balanced;
    }
    return lines;
  }

  // STRICT BOX-CLAMPED HELPER: Never merges distinct array items (so Hebrew & English never mix on one line!)
  function putBox(p, textOrLines, x0, x1, yBottom, yTop, opts) {
    opts = opts || {};
    var inset = opts.inset !== undefined ? opts.inset : 2.0;
    var bx0 = +(x0 + inset).toFixed(1);
    var bx1 = +(x1 - inset).toFixed(1);
    var availW = Math.max(20, bx1 - bx0);
    var boxH = Math.max(10, yTop - yBottom);
    var baseSize = opts.size || 9.4;

    var lines = [];
    if (Array.isArray(textOrLines)) {
      var subMax = opts.subMaxLines || 2;
      for (var i = 0; i < textOrLines.length; i++) {
        var item = String(textOrLines[i] || '').trim();
        if (!item) continue;
        var sub = wrapTextToLines(item, availW, baseSize, subMax);
        for (var j = 0; j < sub.length; j++) lines.push(sub[j]);
      }
    } else {
      var maxL = opts.maxLines || (boxH >= 55 ? 4 : (boxH >= 34 ? 3 : (boxH >= 16 ? 2 : 1)));
      lines = wrapTextToLines(textOrLines, availW, baseSize, maxL);
    }

    var n = lines.length;
    if (!n) return;

    var fSize = baseSize;
    if (n === 2 && boxH < 21) fSize = Math.min(fSize, 8.5);
    if (n === 3 && boxH < 32) fSize = Math.min(fSize, 8.5);
    if (n >= 4 && boxH < 44) fSize = Math.min(fSize, 8.4);

    var gap = opts.gap || Math.min(fSize + 1.6, (boxH - 4) / Math.max(1, n));
    if (n > 1 && gap < fSize * 0.90) gap = fSize * 0.90;

    var yMid = (yBottom + yTop) / 2 - 2.4;
    var startY = yMid + ((n - 1) * gap) / 2;

    for (var idx = 0; idx < n; idx++) {
      put(p, lines[idx], bx0, bx1, +(startY - idx * gap).toFixed(1), {
        align: opts.align || 'center',
        size: fSize,
        bold: true,
        noWrap: true
      });
    }
  }

  function putUnderline(p, textOrLines, x0, x1, yLine, opts) {
    opts = opts || {};
    var inset = opts.inset !== undefined ? opts.inset : 1.5;
    var bx0 = +(x0 + inset).toFixed(1);
    var bx1 = +(x1 - inset).toFixed(1);
    var availW = Math.max(20, bx1 - bx0);
    var fSize = opts.size || 9.2;
    var maxLines = opts.maxLines || 2;

    var lines = Array.isArray(textOrLines)
      ? textOrLines.filter(Boolean)
      : wrapTextToLines(textOrLines, availW, fSize, maxLines);

    var n = lines.length;
    if (!n) return;
    var gap = opts.gap || (fSize - 0.2);
    var baseOffset = opts.lift !== undefined ? opts.lift : 2.6;

    for (var i = 0; i < n; i++) {
      var lineY = yLine + baseOffset + (n - 1 - i) * gap;
      put(p, lines[i], bx0, bx1, +lineY.toFixed(1), {
        align: opts.align || 'center',
        size: fSize,
        bold: true,
        noWrap: true
      });
    }
  }

  function putComb(p, val, vL, y, pad) {
    var n = vL.length - 1;
    var cl = pad ? String(val || '').replace(/\D/g, '').padStart(n, '0').slice(0, n) : String(val || '').replace(/[^A-Za-z0-9]/g, '').slice(0, n);
    var off = n - cl.length;
    for (var i = 0; i < cl.length; i++) {
      put(p, cl.charAt(i), vL[off + i], vL[off + i + 1], y, { align: 'center', size: 9.6, bold: true, noWrap: true });
    }
  }

  function fillLines(p, ys, arr) {
    for (var i = 0; i < ys.length; i++) {
      var txt = arr[i] || arr[arr.length - 1];
      put(p, txt, 58.0, 536.0, +(ys[i] + 3.0).toFixed(1), { align: 'right', size: 9.0, bold: true, noWrap: true });
    }
  }

  // =========================================================================
  // PAGE 1 (index 0): Attachment Checkboxes + Invitee Items 1 to 5
  //   Cell 1 is 96.1pt tall (y = 299.1..395.2)!
  //   We pass 5 distinct lines so Hebrew & English NEVER mix and English is 2 full-size 9.5pt BOLD rows!
  // =========================================================================
  [623.8, 590.2, 556.5, 522.9].forEach(function(y) { check(0, 524.7, y, 7.1, 7.1, 'green'); });

  putBox(0, [
    apGivenHe + ' ' + apSurHe,
    'בת ' + fatherHe,
    'אם: ' + motherHe,
    apGivenEn,
    apSurEn
  ], 58.0, 327.0, 299.1, 395.2, { size: 9.5, subMaxLines: 1, gap: 15.5 });

  putBox(0, maidenHe,                                              58.0, 327.0, 256.6, 299.1, { size: 9.6 });
  putBox(0, 'בן/בת זוג נשוי/אה כחוק של המזמין הישראלי',             58.0, 327.0, 211.8, 256.6, { size: 9.4, maxLines: 2 });
  putBox(0, dobStr,                                                58.0, 327.0, 170.2, 211.8, { size: 9.8 });
  putBox(0, ['דרכון זר בתוקף מס׳: ' + passNum, '(ללא ת״ז אזור)'],  58.0, 327.0,  70.1, 170.2, { size: 9.5, gap: 13.0 });

  // =========================================================================
  // PAGE 2 (index 1): Invitee Items 6 to 19
  // =========================================================================
  putBox(1, abrCity + ' — ' + abrCountry,                          58.0, 327.0, 745.1, 796.4, { size: 9.5 });
  putBox(1, 'ללא — נישואין ראשונים',                                58.0, 327.0, 700.3, 745.1, { size: 9.4 });
  putBox(1, marDate + ' — ' + abrCity + ' ' + abrCountry,          58.0, 327.0, 655.4, 700.3, { size: 9.4 });
  putBox(1, '3 ילדים משותפים',                                      58.0, 327.0, 607.4, 655.4, { size: 9.5 });
  putBox(1, '2 אחים ואחיות (ללא אחים חורגים)',                      58.0, 327.0, 546.5, 607.4, { size: 9.4 });
  putBox(1, [
    'אזרחות ' + (s.pf_citizenship || 'צרפתית'),
    'דרכון נוכחי: ' + passNum + ' | קודם: FR1122334'
  ], 58.0, 327.0, 468.9, 546.5, { size: 9.4, gap: 12.5 });

  // 12. Current address in Israel
  putBox(1, 'ישראל',   260.4, 327.6, 426.4, 455.2, { size: 9.4 });
  putBox(1, ilCity,    193.1, 259.5, 426.4, 455.2, { size: 9.4 });
  putBox(1, ilStreet,  125.0, 192.2, 426.4, 455.2, { size: 9.2, maxLines: 2 });
  putBox(1, ilHouse,    57.7, 124.2, 426.4, 455.2, { size: 9.2, maxLines: 2 });

  // 13. Address in country of origin
  putBox(1, abrCountry, 260.4, 327.6, 376.0, 410.4, { size: 9.4 });
  putBox(1, abrCity,    193.1, 259.5, 376.0, 410.4, { size: 9.4 });
  putBox(1, 'רפובליק',   125.0, 192.2, 376.0, 410.4, { size: 9.2, maxLines: 2 });
  putBox(1, '18 דירה 4',  57.7, 124.2, 376.0, 410.4, { size: 9.2, maxLines: 2 });

  // 14 & 15. Phones
  putBox(1, ['04-8223344 (ישראל)', '+33-4-72112233 (חו״ל)'],        58.0, 327.0, 331.1, 376.0, { size: 9.4 });
  putBox(1, [s.pf_phone_il || '058-765-4321', '+33-6-12345678'],   58.0, 327.0, 286.3, 331.1, { size: 9.5 });
  putBox(1, s.pf_email || 'devorah.applicant@example.com',         58.0, 327.0, 241.4, 286.3, { size: 9.2 });
  putBox(1, ['facebook.com/devorah.profile', '(ללא חשבונות נוספים)'], 58.0, 327.0, 174.2, 241.4, { size: 9.4 });
  putBox(1, ['אדריכלית נוף בכירה', 'ומתכננת ערים'],                 58.0, 327.0, 101.3, 174.2, { size: 9.5 });

  // 19. Workplace in Israel
  putBox(1, 'ישראל',        260.4, 327.6, 62.9, 87.7, { size: 9.2 });
  putBox(1, ilCity,         193.1, 259.5, 62.9, 87.7, { size: 9.2 });
  putBox(1, 'שד׳ המגינים',   125.0, 192.2, 62.9, 87.7, { size: 9.0, maxLines: 2 });
  putBox(1, '55 (סטודיו)',    57.7, 124.2, 62.9, 87.7, { size: 9.0, maxLines: 2 });

  // =========================================================================
  // PAGE 3 (index 2): Invitee Items 19 (cont.) to 26 + Israeli Inviter Items 1 to 5
  // =========================================================================
  putBox(2, abrCountry,     260.4, 327.6, 758.7, 796.4, { size: 9.2 });
  putBox(2, abrCity,        193.1, 259.5, 758.7, 796.4, { size: 9.2 });
  putBox(2, 'אדריכלות ליון',  125.0, 192.2, 758.7, 796.4, { size: 9.0, maxLines: 2 });
  putBox(2, '12 (סניף)',      57.7, 124.2, 758.7, 796.4, { size: 9.0, maxLines: 2 });

  putBox(2, '04-8556677',                                 58.0, 327.0, 719.5, 758.7, { size: 9.6 });
  putBox(2, '054-9988776',                                58.0, 327.0, 655.4, 719.5, { size: 9.6 });
  putBox(2, 'studio.design@example.co.il',                58.0, 327.0, 591.4, 655.4, { size: 9.2 });
  putBox(2, ['כן — שהייה כחוק', 'באשרת ב/2 ואשרת א/2'],    58.0, 275.0, 546.5, 591.4, { size: 9.2 });

  putUnderline(2, '01/09/2024 (כניסה בנתב״ג ב/2)',         63.3, 246.0, 530.1, { size: 9.0, maxLines: 1 });
  putUnderline(2, '01/12/2026 (מעבר לאשרת א/2)',           63.3, 302.0, 510.9, { size: 9.0, maxLines: 1 });
  putUnderline(2, '01/09/2024',                           65.7, 254.0, 492.5, { size: 9.4, maxLines: 1 });
  putUnderline(2, '01/12/2026 — שהייה רציפה כחוק',         64.1, 295.0, 473.2, { size: 9.0, maxLines: 1 });

  putBox(2, [
    'רישיון נהיגה צרפתי ובינלאומי בתוקף',
    'מס׳ 998877 — הונפק ב' + abrCity + ' ' + abrCountry
  ], 58.0, 327.0, 384.0, 464.0, { size: 9.4, gap: 12.5 });

  putBox(2, ilCity,   237.9, 327.6, 322.3, 368.0, { size: 9.4 });
  putBox(2, ilStreet, 148.2, 237.1, 322.3, 368.0, { size: 9.2, maxLines: 2 });
  putBox(2, ilHouse,   57.7, 147.4, 322.3, 368.0, { size: 9.2, maxLines: 2 });

  putBox(2, [spGivenHe + ' ' + spSurHe, 'בן אברהם משה ויצחק'], 56.0, 327.0, 225.4, 271.0, { size: 9.4 });
  putBox(2, spDobStr,                                          56.0, 327.0, 180.6, 225.4, { size: 9.6 });
  putBox(2, 'ישראל',    191.5, 327.6, 135.7, 167.0, { size: 9.4 });
  putBox(2, 'ירושלים',   55.3, 190.7, 135.7, 167.0, { size: 9.4 });
  putBox(2, ['בן/בת זוג נשוי/אה כחוק', '(בעל/אישה)'],           56.0, 327.0,  90.9, 135.7, { size: 9.4 });
  putBox(2, 'אזרחות ישראלית בלבד — ת״ז ' + tzNum,               56.0, 327.0,  65.3,  90.9, { size: 9.2 });

  // =========================================================================
  // PAGE 4 (index 3): Israeli Inviter Items 5 (cont.) to 15
  // =========================================================================
  putBox(3, ['דרכון ישראלי מס׳ 34567891', '(ללא אזרחות זרה נוספת)'], 56.0, 327.0, 719.5, 796.4, { size: 9.4 });
  putBox(3, ilCity,   237.1, 327.6, 637.0, 697.1, { size: 9.4 });
  putBox(3, ilStreet, 145.8, 236.3, 637.0, 697.1, { size: 9.2, maxLines: 2 });
  putBox(3, ilHouse,   55.3, 145.0, 637.0, 697.1, { size: 9.2, maxLines: 2 });

  putBox(3, '04-8223344',                                 56.0, 327.0, 592.2, 637.0, { size: 9.6 });
  putBox(3, s.pf_phone_il || '058-765-4321',               56.0, 327.0, 547.3, 592.2, { size: 9.6 });
  putBox(3, marDate,                                      56.0, 327.0, 502.5, 547.3, { size: 9.6 });
  putBox(3, 'binyamin.inviter@example.co.il',             56.0, 327.0, 457.6, 502.5, { size: 9.2 });
  putBox(3, 'facebook.com/binyamin.inviter',              56.0, 327.0, 406.4, 457.6, { size: 9.2 });
  putBox(3, ['מהנדס מערכות מידע', 'ומנהל פרויקטים בכיר'],  56.0, 327.0, 361.5, 406.4, { size: 9.4 });

  putBox(3, 'אלביט מערכות בע״מ — פארק מת״מ חיפה',         56.0, 327.0, 336.7, 361.5, { size: 9.2 });
  putBox(3, 'אזור תעשייה עתירת מדע מת״מ דרום חיפה',       56.0, 327.0, 311.1, 336.7, { size: 9.0 });
  putBox(3, 'דרך הפלי״ם',                                  237.1, 327.6, 268.6, 299.1, { size: 9.2 });
  putBox(3, '12 בניין ב׳',                                145.8, 236.3, 268.6, 299.1, { size: 9.2 });
  putBox(3, ilZip,                                         55.3, 145.0, 268.6, 299.1, { size: 9.4 });

  putBox(3, '04-8315500',                                 56.0, 327.0, 223.8, 268.6, { size: 9.6 });
  putBox(3, 'hr.haifa@elbitsystems.co.il',                56.0, 327.0, 179.8, 223.8, { size: 9.2 });

  // =========================================================================
  // PAGES 5, 6, 7 (indices 4, 5, 6): Ruled Biography & Security Lines
  // =========================================================================
  fillLines(4, [766.7, 747.5, 729.1, 709.9, 690.6, 672.2, 653.0], [
    '1. שנות ילדות ונעורים (1994–2012): נולדה וגדלה בעיר ' + abrCity + ' (' + abrCountry + '), רחוב רפובליק 18.',
    '2. לימודי תיכון (2009–2012): תיכון עירוני מרכזי ב' + abrCity + ' — סיום תעודת בגרות מלאה בהצטיינות.',
    '3. לימודים אקדמיים (2012–2017): מגורים בשדרות ז׳אן ז׳ורס 45 ב' + abrCity + ' (' + abrCountry + ').',
    '4. עבודה מקצועית (2017–2021): מגורים ברחוב ויקטור הוגו 29 ב' + abrCity + ', משרד אדריכלות נוף.',
    '5. היכרות ונישואין (2021–2024): מגורים משותפים ב' + abrCity + ' וביקורים סדירים בישראל.',
    '6. כניסה לישראל ומגורים בחיפה (2024–2026): מגורים משותפים ב' + ilStreet + ' ' + ilHouse + ', ' + ilCity + '.',
    '7. כלל המעברים תועדו במלואם במרשם האוכלוסין המקומי וללא כל שהייה בלתי חוקית.'
  ]);
  fillLines(4, [577.0, 558.5, 539.3, 520.1, 501.7, 482.5], [
    '1. 2012–2015: האוניברסיטה הלאומית ב' + abrCity + ' — תואר ראשון (B.A) באדריכלות ותכנון עירוני.',
    '2. 2015–2017: המכון הגבוה לאדריכלות נוף ב' + abrCity + ' — תואר שני (M.A) בתכנון סביבתי.',
    '3. 2019–2020: קורס הסמכה במערכות מידע גיאוגרפיות (GIS) ותכנון בר-קיימא — לשכת האדריכלים.',
    '4. 2024–2025: לימודי שפה עברית (אולפן מתקדמים) ולימודי יהדות וגיור במסגרת מוכרת ב' + ilCity + '.',
    '5. 2025–2026: השלמת בחינות רישוי מקצועיות והתאמת תעודות אקדמיות מול משרד החינוך בישראל.',
    '6. מצורפים העתקים מאומתים (אפוסטיל) של כלל התעודות האקדמיות וגיליונות הציונים.'
  ]);
  fillLines(4, [407.2, 388.0, 368.8, 349.5, 331.1, 311.9, 292.7, 274.3], [
    '1. שנת 2014: מלגת הצטיינות אקדמית שנתית מטעם הפקולטה לאדריכלות באוניברסיטת ' + abrCity + '.',
    '2. שנת 2016: מענק מחקר לתזה לתואר שני מטעם משרד החינוך והמחקר ב' + abrCountry + '.',
    '3. מעבר לשתי מלגות הצטיינות אלו, המוזמנת לא קיבלה מלגות מכל קרן זרה או ממשלתית אחרת.',
    '4. המוזמנת מעולם לא קיבלה מימון או סיוע מגוף פוליטי, דתי או ארגון בינלאומי כלשהו.',
    '5. כלל שכר הלימוד והוצאות המחיה מומנו מחסכונות אישיים ומסיוע הוריה של המוזמנת בלבד.',
    '6. אין ולא היו התחייבויות כספיות או תעסוקתיות כלפי שום קרן או מוסד מממן בחו״ל.',
    '7. אישורי המלגות האקדמיות מהאוניברסיטה שמורים וזמינים להצגה לפי דרישה.',
    '8. ללא הערות או מלגות נוספות.'
  ]);
  fillLines(4, [198.2, 179.0, 160.6, 141.3, 122.1, 103.7, 84.5, 65.3], [
    '1. שווייץ (ז׳נבה וציריך) — יולי 2018 (10 ימים): חופשה משפחתית וטיול תיירותי.',
    '2. איטליה (רומא ופירנצה) — אפריל 2019 (7 ימים): סיור לימודי אדריכלי וחופשה.',
    '3. ספרד (ברצלונה ומדריד) — אוגוסט 2021 (8 ימים): חופשה שנתית משותפת.',
    '4. יוון (אתונה וכרתים) — אוגוסט 2022 (6 ימים): ירח דבש לאחר הנישואין.',
    '5. קפריסין (לרנקה) — מאי 2023 (4 ימים): חופשה קצרה.',
    '6. ישראל — דצמבר 2023 (14 ימים): ביקור משפחתי ראשון בישראל באשרת תייר ב/2.',
    '7. ישראל — ספטמבר 2024 ועד היום: כניסה כחוק בנתב״ג ומגורים משותפים עם בן הזוג ב' + ilCity + '.',
    '8. המוזמנת מעולם לא ביקרה או שהתה במדינות ערב או במדינות עוינות.'
  ]);

  fillLines(5, [786.0], ['9. כל הכניסות והיציאות מתועדות במלואן בדרכון הזר מס׳ ' + passNum + ' המצורף לבקשה זו.']);
  fillLines(5, [717.1, 697.9, 679.5, 660.2, 641.0], [
    '1. 2017–2020: אדריכלית נוף זוטרה במשרד תכנון עירוני ב' + abrCity + ' (' + abrCountry + ').',
    '2. 2020–2024: אדריכלית נוף בכירה ומנהלת פרויקטים במשרד אדריכלות ב' + abrCity + '.',
    '3. 2024–2025: לימודי אולפן עברית וגיור בישראל (ללא עבודה בשכר בתקופת הלימודים).',
    '4. 2025–2026: יועצת תכנון ואדריכלות נוף בסטודיו תכנון בשדרות המגינים 55, ' + ilCity + '.',
    '5. המוזמנת מעולם לא עבדה בשירות ממשלתי, צבאי, משטרתי או ביטחוני כלשהו.'
  ]);
  fillLines(5, [548.9, 530.5, 511.3, 492.1, 472.9, 454.4], [
    'לא קיים כל קשר — המוזמנת מעולם לא הייתה בקשר עם ארגוני מודיעין זרים או גורמי מודיעין ברש״פ.',
    'המוזמנת מעולם לא נעצרה, לא נחקרה, לא עוכבה ולא זומנה לחקירה על ידי גורם מודיעין כלשהו.',
    'אין ולא הייתה למוזמנת כל היכרות אישית או מקצועית עם גורמי מודיעין בארץ המוצא או מחוצה לה.',
    'המוזמנת לא התבקשה מעולם למסור מידע או לשתף פעולה עם שום גוף מודיעיני זר.',
    'כלל פעילותה של המוזמנת בארץ המוצא ובישראל הייתה אזרחית, לימודית ומשפחתית בלבד.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(5, [382.4, 363.1, 344.7, 325.5, 306.3, 287.9], [
    'לא קיים כל קשר — למוזמנת אין ולא היה כל קשר עם פעילים במנגנוני המודיעין או הביטחון של הרש״פ.',
    'המוזמנת אינה מכירה פעילים או עובדים במנגנוני הביטחון של הרשות הפלסטינית.',
    'המוזמנת לא שהתה בשטחי הרשות הפלסטינית ולא קיימה קשרים עסקיים או חברתיים עם גורמים אלו.',
    'גם לבן הזוג הישראלי ולבני משפחתו אין כל קשר לפעילים במנגנונים אלו.',
    'כלל הפרטים נבדקו ואומתו במלואם.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(5, [215.8, 196.6, 178.2, 158.9, 139.8, 120.5], [
    'אין — אף אחד מבני משפחתה של המוזמנת אינו עובד ולא עבד במנגנוני מודיעין או ביטחון כלשהם.',
    'הורי המוזמנת ואחיה עובדים במקצועות אזרחיים לחלוטין (הנדסה, חינוך, רפואה וניהול) בארץ המוצא.',
    'אף בן משפחה מדרגה ראשונה או שנייה אינו מועסק בארגוני מודיעין זרים או ברשות הפלסטינית.',
    'אין במשפחת המוזמנת או במשפחת המזמין מי ששירת בגופי מודיעין זרים.',
    'פרטי העיסוק של כלל בני המשפחה מפורטים בטבלת בני המשפחה בעמודים 8–9 לטופס זה.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);

  fillLines(6, [786.0, 766.7, 747.5, 729.1, 709.9, 690.6, 672.2, 653.0], [
    'אין — אף אחד מבני משפחת המוזמנת אינו עובד במוסדות הרשות הפלסטינית.',
    'אף אחד מבני המשפחה אינו נושא תפקיד ממשלתי, פוליטי או דיפלומטי במדינת המוצא.',
    'אבי המוזמנת (' + fatherHe + ') עבד כמהנדס אזרחי במגזר הפרטי ב' + abrCity + ' ופרש לגמלאות.',
    'אם המוזמנת (' + motherHe + ') עבדה כמורה בבית ספר תיכון ב' + abrCity + '.',
    'אחי המוזמנת ואחותה מועסקים בחברות מסחריות פרטיות ב' + abrCountry + ' בלבד.',
    'אין לבני המשפחה כל זיקה למוסדות שלטון זרים או לגופים ציבוריים ברש״פ.',
    'כלל הפרטים התעסוקתיים של המשפחה גלויים ומתועדים במלואם.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [560.9, 541.7, 522.5, 504.1, 484.9, 465.6], [
    'לא קיים כל קשר — למוזמנת אין ולא היה מעולם קשר לאנשים או לארגונים הקשורים לטרור.',
    'המוזמנת מעולם לא הייתה חברה, תומכת או פעילה בארגון שהוכרז כבלתי חוקי בישראל או בעולם.',
    'המוזמנת לא תרמה כספים ולא סייעה במישרין או בעקיפין לשום התארגנות אסורה או עוינת.',
    'הצהרה מלאה בעניין זה נחתמה גם במסגרת תצהיר נספח א׳ המצורף לבקשה.',
    'רקע המוזמנת נקי לחלוטין כעולה מתעודת היושר הרשמית מארץ המוצא.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [373.5, 355.1, 335.9, 316.7, 297.5, 279.1], [
    'לא — המוזמנת מעולם לא עוכבה, לא נחקרה, לא נעצרה, לא הואשמה ולא הורשעה בעבירה כלשהי.',
    'למוזמנת אין כל רישום פלילי או ביטחוני בישראל או במדינת המוצא (' + abrCountry + ').',
    'מצורפת תעודת יושר מקורית ומתורגמת מאומתת בחותמת אפוסטיל.',
    'מעולם לא הוצא נגד המוזמנת צו הרחקה, צו מניעת כניסה או צו מעצר כלשהו.',
    'כל כניסותיה של המוזמנת לישראל דרך מעברי הגבול עברו באופן תקין וחוקי.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);
  fillLines(6, [184.6, 165.4, 146.2, 126.9, 108.5, 89.3], [
    'לא קיים כל קשר — למוזמנת אין קשר ישיר או עקיף עם מדינות ערב.',
    'למוזמנת אין בני משפחה המתגוררים במדינות ערב.',
    'למוזמנת אין נכסים, חשבונות בנק או קשרים עסקיים במדינות ערב.',
    'המוזמנת לא ביקרה במדינות ערב ולא קיימה קשרים טלפוניים או מסחריים עמן.',
    'כלל קשריה המשפחתיים של המוזמנת נמצאים בישראל וב' + abrCountry + ' בלבד.',
    'ללא אירועים או חריגים כלשהם בסעיף זה.'
  ]);

  // =========================================================================
  // PAGE 8 (index 7): Landscape Family Table Part 1 (8 Rows)
  // =========================================================================
  var p8Bounds = [
    [334.5, 376.9], [292.0, 334.5], [251.9, 292.0], [212.7, 251.9],
    [183.1, 212.7], [147.8, 183.1], [115.8, 147.8], [ 77.3, 115.8]
  ];
  var p8Rows = [
    { name: [fatherHe, maidenHe, 'YERMIYAHU'],   dob: '12/04/1965', id: 'FR4455661', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223344', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [motherHe, maidenHe, 'MIRIAM'],      dob: '08/09/1968', id: 'FR4455662', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223355', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [motherHe, maidenHe, 'MIRIAM'],      dob: '08/09/1968', id: 'FR4455662', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223355', freq: ['גבוהה', 'קשר שבועי'] },
    { name: [fatherHe, maidenHe, 'YERMIYAHU'],   dob: '12/04/1965', id: 'FR4455661', addr: [abrCountry + ' ' + abrCity, 'רח׳ רפובליק 18'], tel: '+33-4721122', mob: '+33-611223344', freq: ['גבוהה', 'נשואים זה לזו'] },
    { name: ['דוד שמואל ' + maidenHe, 'DAVID'],  dob: '19/03/1992', id: 'FR7788991', addr: [abrCountry + ' פריז', 'ויקטור הוגו 10'],        tel: '+33-1445566', mob: '+33-677889900', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['שרה לאה ' + maidenHe, 'SARAH'],    dob: '25/06/1993', id: 'FR7788992', addr: [abrCountry + ' פריז', 'ויקטור הוגו 10'],        tel: '+33-1445566', mob: '+33-677889911', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['חנה רחל ' + maidenHe, 'HANNAH'],   dob: '04/11/1998', id: 'FR7788993', addr: [abrCountry + ' ' + abrCity, 'שד׳ ז׳ורס 22'],   tel: '+33-4729988', mob: '+33-688990011', freq: ['גבוהה', 'קשר חודשי'] },
    { name: ['מיכאל אהרן כהן', 'MICHAEL COHEN'], dob: '17/01/1997', id: 'FR7788994', addr: [abrCountry + ' ' + abrCity, 'שד׳ ז׳ורס 22'],   tel: '+33-4729988', mob: '+33-688990022', freq: ['בינונית', 'חגים ומועדים'] }
  ];
  for (var r8 = 0; r8 < p8Rows.length; r8++) {
    var d8 = p8Rows[r8], b8 = p8Bounds[r8];
    putBox(7, d8.name, 571.8, 687.8, b8[0], b8[1], { size: 9.2, subMaxLines: 1 });
    putBox(7, d8.dob,  510.9, 570.9, b8[0], b8[1], { size: 9.4, maxLines: 1 });
    putBox(7, d8.id,   418.8, 510.0, b8[0], b8[1], { size: 9.5, maxLines: 1 });
    putBox(7, d8.addr, 319.5, 418.0, b8[0], b8[1], { size: 9.0, subMaxLines: 1 });
    putBox(7, d8.tel,  261.0, 318.7, b8[0], b8[1], { size: 9.2, maxLines: 1 });
    putBox(7, d8.mob,  189.0, 260.2, b8[0], b8[1], { size: 9.2, maxLines: 1 });
    putBox(7, d8.freq,  97.0, 188.1, b8[0], b8[1], { size: 9.2, subMaxLines: 1 });
  }

  // =========================================================================
  // PAGE 9 (index 8): Landscape Family Table Part 2 (8 Rows)
  // =========================================================================
  var p9Bounds = [
    [372.1, 411.4], [333.6, 372.1], [295.2, 333.6], [256.0, 295.2],
    [217.5, 256.0], [176.7, 217.5], [138.2, 176.7], [ 98.1, 138.2]
  ];
  var p9Rows = [
    { name: ['נתנאל יוסף ' + maidenHe, 'NATHANIEL'], dob: '11/02/1996', id: 'FR7788995', addr: [abrCountry + ' מרסיי', 'שד׳ פראדו 14'],     tel: '+33-4912233', mob: '+33-699112233', freq: ['בינונית', 'קשר חודשי'] },
    { name: ['רבקה אסתר לוי', 'REBECCA LEVY'],       dob: '29/08/1997', id: 'FR7788996', addr: [abrCountry + ' מרסיי', 'שד׳ פראדו 14'],     tel: '+33-4912233', mob: '+33-699112244', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['עמנואל דניאל ' + maidenHe, 'EMMANUEL'], dob: '03/05/2000', id: 'FR7788997', addr: [abrCountry + ' ' + abrCity, 'רח׳ לפאייט 9'], tel: '+33-4724455', mob: '+33-699112255', freq: ['גבוהה', 'קשר שבועי'] },
    { name: ['נעמי חווה מרטין', 'NAOMI MARTIN'],     dob: '18/12/2001', id: 'FR7788998', addr: [abrCountry + ' ' + abrCity, 'רח׳ לפאייט 9'], tel: '+33-4724455', mob: '+33-699112266', freq: ['בינונית', 'חגים ומועדים'] },
    { name: ['אריאל אלכסנדר', spSurHe, 'ARIEL'],     dob: '14/05/2018', id: '334455661', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['ללא בן/בת זוג', '(קטין סמוך להוריו)'],  dob: '14/05/2018', id: '334455661', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['נועה גבריאלה', spSurHe, 'NOA'],        dob: '22/09/2020', id: '334455662', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] },
    { name: ['ללא בן/בת זוג', '(קטינה סמוכה להוריה)'], dob: '22/09/2020', id: '334455662', addr: ['ישראל ' + ilCity, ilStreet + ' 42'],         tel: '04-8223344',  mob: '058-765-4321',  freq: ['גבוהה מאוד', 'מגורים בבית'] }
  ];
  for (var r9 = 0; r9 < p9Rows.length; r9++) {
    var d9 = p9Rows[r9], b9 = p9Bounds[r9];
    putBox(8, d9.name, 577.4, 690.2, b9[0], b9[1], { size: 9.2, subMaxLines: 1 });
    putBox(8, d9.dob,  519.7, 576.5, b9[0], b9[1], { size: 9.4, maxLines: 1 });
    putBox(8, d9.id,   427.6, 518.9, b9[0], b9[1], { size: 9.5, maxLines: 1 });
    putBox(8, d9.addr, 340.3, 426.8, b9[0], b9[1], { size: 9.0, subMaxLines: 1 });
    putBox(8, d9.tel,  261.0, 339.5, b9[0], b9[1], { size: 9.2, maxLines: 1 });
    putBox(8, d9.mob,  189.8, 260.2, b9[0], b9[1], { size: 9.2, maxLines: 1 });
    putBox(8, d9.freq,  84.9, 188.9, b9[0], b9[1], { size: 9.2, subMaxLines: 1 });
  }

  // =========================================================================
  // PAGE 10 (index 9): Friends Table, Relationship, Visits & Permits
  // =========================================================================
  var frBounds = [
    [601.0, 619.4], [582.5, 601.0], [564.1, 582.5],
    [545.7, 564.1], [527.3, 545.7], [508.9, 527.3]
  ];
  var friends = [
    { name: 'יעל מרים כהן',     dob: '10/02/1993', id: '034455667', addr: ['ישראל, חיפה', 'שד׳ הנשיא 88 דירה 4'],   tel: '04-8112233', mob: '052-4455661',   freq: 'גבוהה — שבועי' },
    { name: 'אביגיל רות לוי',    dob: '18/07/1994', id: '035566778', addr: ['ישראל, חיפה', 'רח׳ מוריה 15 דירה 2'],   tel: '04-8112244', mob: '054-5566772',   freq: 'גבוהה — שבועי' },
    { name: 'דניאל יוסף פרידמן', dob: '05/11/1990', id: '036677889', addr: ['ישראל, ירושלים', 'רח׳ הפלמ״ח 9 דירה 7'], tel: '02-6334455', mob: '050-6677883',   freq: 'בינונית — חודשי' },
    { name: 'נועה אסתר רוזנברג', dob: '29/04/1995', id: '037788990', addr: ['ישראל, תל אביב', 'אבן גבירול 40 דירה 5'], tel: '03-5223344', mob: '058-7788994',   freq: 'בינונית — חודשי' },
    { name: 'קלייר סופי מרטין',  dob: '12/09/1994', id: 'FR8899001', addr: [abrCountry + ', ' + abrCity, 'שד׳ ז׳ורס 14'], tel: '+33-4723344', mob: '+33-612340011', freq: 'בינונית — חגים' },
    { name: 'מארק אנרי ברנרד',   dob: '21/01/1992', id: 'FR8899002', addr: [abrCountry + ', פריז', 'רח׳ ריבולי 30'],  tel: '+33-1423344', mob: '+33-612340022', freq: 'נמוכה — שנתי' }
  ];
  for (var fIdx = 0; fIdx < friends.length; fIdx++) {
    var fr = friends[fIdx], fb = frBounds[fIdx];
    putBox(9, fr.name, 469.4, 544.7, fb[0], fb[1], { size: 8.8, maxLines: 2 });
    putBox(9, fr.dob,  408.5, 468.6, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.id,   333.2, 407.7, fb[0], fb[1], { size: 9.0, maxLines: 1 });
    putBox(9, fr.addr, 235.5, 332.4, fb[0], fb[1], { size: 8.4, subMaxLines: 1, gap: 7.4 });
    putBox(9, fr.tel,  178.6, 234.7, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.mob,  100.1, 177.8, fb[0], fb[1], { size: 8.8, maxLines: 1 });
    putBox(9, fr.freq,  22.4,  99.3, fb[0], fb[1], { size: 8.6, maxLines: 2 });
  }

  fillLines(9, [418.4, 400.0, 382.4, 364.0, 344.7], [
    '1. בני הזוג הכירו בחודש מרץ 2021 באמצעות חברים משותפים בקהילה היהודית ב' + abrCity + ' (' + abrCountry + ').',
    '2. לאחר קשר זוגי רציף ומגורים משותפים, בני הזוג נישאו כדת וכדין ביום ' + marDate + ' ב' + abrCity + '.',
    '3. מאז הנישואין בני הזוג מקיימים משק בית משותף ומגדלים יחד את ילדיהם המשותפים.',
    '4. בשנת 2024 נכנסו לישראל כחוק ועברו להתגורר בדירתם הקבועה ב' + ilStreet + ' ' + ilHouse + ', ' + ilCity + '.',
    '5. מצורפים לבקשה תצהירים, תמונות משותפות, חוזה שכירות, חשבונות משותפים ואישורי קהילה.'
  ]);

  putUnderline(9, '1) 10/12/2023 – 24/12/2023 (ביקור משפחתי ב/2)',              56.9, 346.9, 282.3, { size: 9.0, maxLines: 1 });
  putUnderline(9, '2) 01/09/2024 – הווה (שהייה רציפה ב' + ilCity + ' ב/2 וא/2)', 56.9, 369.3, 264.6, { size: 9.0, maxLines: 1 });

  var pmBounds = [[150.2, 175.8], [124.5, 150.2], [98.9, 124.5], [74.1, 98.9]];
  var permits = [
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['ביקור משפחתי', 'ואיחוד משפחות (ב/2)'], from: '10/12/2023', to: '24/12/2023' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['כניסה לחיים', 'משותפים (ב/2)'],         from: '01/09/2024', to: '01/03/2025' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['אשרת א/2 לימודי', 'גיור מוכרים'],       from: '01/03/2025', to: '01/03/2026' },
    { inv: [spGivenHe, spSurHe], place: [ilCity, ilStreet + ' 42'], reason: ['הארכת אשרת א/2', 'והליך מעמד'],         from: '01/03/2026', to: '01/03/2027' }
  ];
  for (var pIdx = 0; pIdx < permits.length; pIdx++) {
    var pm = permits[pIdx], pb = pmBounds[pIdx];
    putBox(9, pm.inv,    391.7, 509.5, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.place,  278.8, 390.9, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.reason, 165.0, 278.0, pb[0], pb[1], { size: 8.8, subMaxLines: 1 });
    putBox(9, pm.from,   109.0, 164.2, pb[0], pb[1], { size: 9.0, maxLines: 1 });
    putBox(9, pm.to,      52.1, 108.1, pb[0], pb[1], { size: 9.0, maxLines: 1 });
  }

  // =========================================================================
  // PAGE 11 (index 10): Item 13, Declaration, Comb Grids & Lawyer Attestation
  // =========================================================================
  fillLines(10, [747.5, 729.1, 709.9, 690.6, 672.2], [
    '1. כלל הפרטים והתאריכים בטופס קורות חיים זה נבדקו ואומתו אל מול מסמכי המקור הרשמיים.',
    '2. בני הזוג מנהלים מרכז חיים משותף, קבוע ובלעדי ב' + ilCity + ' ומציגים תשתית ראייתית מלאה.',
    '3. לבקשה מצורפים: תעודות לידה, תעודת נישואין, תעודת יושר (כולן עם אפוסטיל) וצילומי דרכונים.',
    '4. כמו כן מצורפות 3 תמונות פספורט של המוזמנת ו-3 תמונות פספורט של המזמין הישראלי כנדרש.',
    '5. אנו עומדים לרשות לשכת רשות האוכלוסין ב' + branchCity + ' להמצאת כל מסמך נוסף שיידרש.'
  ]);

  putUnderline(10, 'א/5 / מעמד קבע', 56.9, 171.4, 544.9, { size: 9.4, maxLines: 1 });
  putUnderline(10, 'א/5',            56.9, 193.8, 491.3, { size: 9.6, maxLines: 1 });

  var combV = [403.34, 419.35, 434.58, 450.6, 466.63, 481.85, 497.88, 513.88, 529.1, 545.13];
  putComb(10, tzNum, combV, 403.1, true);
  putUnderline(10, [spGivenHe, spSurHe], 215.5, 386.1, 399.2, { size: 9.2, gap: 8.6, lift: 2.2 });

  putComb(10, passNum, combV, 343.8, false);
  putUnderline(10, [apGivenHe, apSurHe], 215.5, 386.1, 339.9, { size: 9.2, gap: 8.6, lift: 2.2 });

  // Lawyer Attestation (אשור קבלת הצהרה) — Single Declarant (spFullHe) & 9-digit Israeli ID (tzNum)
  putUnderline(10, 'רותם אברהמי',                 394.9, 503.1, 259.9, { size: 9.4, maxLines: 1 });
  putUnderline(10, '88412',                       250.7, 346.9, 259.9, { size: 9.6, maxLines: 1 });
  putUnderline(10, 'שד׳ הפלי״ם 15 ' + branchCity, 106.5, 235.5, 259.9, { size: 9.0, maxLines: 1 });

  // מר/גב' [322.8..508.7]: Single declarant name (spFullHe) fits on 1 crisp 9.5pt BOLD line!
  putUnderline(10, spFullHe, 322.8, 508.7, 237.4, { size: 9.5, maxLines: 1 });
  putUnderline(10, dateStr,  106.5, 224.3, 237.4, { size: 9.5, maxLines: 1 });

  // ע"י ע"פ ת"ז [394.9..488.6]: Only the 9-digit ID number (tzNum) since "ת״ז" is already printed!
  putUnderline(10, tzNum,    394.9, 488.6, 215.8, { size: 9.6, maxLines: 1 });

  // Bottom row: תאריך החתימה [397.3..539.1]
  putUnderline(10, dateStr,  397.3, 539.1, 152.6, { size: 9.6, maxLines: 1 });

  return await ctx.pdfDoc.save();
}

module.exports = { stampSecurityCv: stampSecurityCv };

if (require.main === module) {
  (async function() {
    var fs = require('fs'), path = require('path'), PDFLib = require('../vendor/pdf-lib.min.js'), fontkit = require('../vendor/fontkit.umd.min.js');
    var root = path.resolve(__dirname, '../../..'), outDir = '/Users/shaliach/Desktop/PIBA_Filled_Proofs';
    var persona = Object.assign(core.buildRandomStressPersona(), { _stressAllCheckboxes: true });
    var bytes = await stampSecurityCv(persona, {
      PDFLib: PDFLib, fontkit: fontkit,
      loadPdfBytes: function(f) { return fs.readFileSync(path.join(root, 'public/forms/gov-pdfs', f)); },
      loadFontBytes: function(f) { return fs.readFileSync([path.join(root, 'public/app/vendor', f), path.join(root, 'public/app/fonts', f), path.join(root, 'public/fonts', f)].find(function(p) { return fs.existsSync(p); })); }
    });
    fs.mkdirSync(outDir, { recursive: true });
    var outPath = path.join(outDir, 'security_cv_form_FILLED.pdf');
    fs.writeFileSync(outPath, bytes);
    console.log('Saved FILLED:', outPath);
  })().catch(function(e) { console.error(e); process.exit(1); });
}