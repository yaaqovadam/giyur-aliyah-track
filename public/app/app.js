const BD_CARDS = [
  {c:"Shabbat (39 Melachot)", q:"What do you do if you accidentally forget to turn on the hot water urn (Meicham) before candle lighting?", a:"You may NOT turn it on or ask a Jewish neighbor to do so. Keep cold/room-temperature food & drinks ready; under specific rabbinic conditions a non-Jew (Amira LeNochri) may only help for the sick or small children."},
  {c:"Kashrut & Kitchen", q:"If a dairy spoon falls into a pot of boiling meat soup on the stove, what happens?", a:"Wait 24 hours before using the spoon, and consult a Rabbi immediately—if the soup volume is 60x the volume of the spoon (Batel BeShishim), the soup remains kosher, though the spoon requires Hag'alah (koshering in boiling water)."},
  {c:"Taharat HaMishpacha", q:"What are the minimum days before beginning the 7 Clean Days (Shiva Nekiyim)?", a:"According to Ashkenazi custom, a minimum of 5 days (and Sephardic custom, 4–5 days depending on community practice) before performing the Hefsek Tahara check just before sunset."},
  {c:"Sincerity & Identity", q:"If your relationship ended tomorrow, or you had to live outside Israel, would you still complete your conversion and keep Shabbat & Mitzvot?", a:"Trap check: The Dayanim must hear 100% unconditional commitment to Hashem, Torah, and the Jewish people (Kabbalat Ol Mitzvot)—completely independent of any partner or visa."},
  {c:"Brachot & Daily Halacha", q:"What Bracha do you recite on rice (Orez) vs. quinoa vs. bread?", a:"Rice: Borei Minei Mezonot (after-bracha: Borei Nefashot!). Quinoa: Borei Pri Ha'Adama. Bread: HaMotzi Lechem Min Ha'Aretz (after: Birkat HaMazon)."},
  {c:"Jewish History & Holidays", q:"Why do we fast on the 17th of Tammuz and the 9th of Av (Tisha B'Av)?", a:"17th of Tammuz marks the breaching of Jerusalem's walls (beginning the Three Weeks / Bein HaMetzarim), and Tisha B'Av mourns the destruction of both the First and Second Temples."}
];

const COUPLE_QS = [
  {c:"Bedroom & Morning Routine", q:"Which side of the bed does each partner sleep on (facing the headboard), and how many pillows does each use?"},
  {c:"Finances & Bills", q:"Which bank account pays the electric bill (Chevrat HaChashmal) and Arnona, and what was the approximate amount last month?"},
  {c:"Family & Holidays", q:"Where did you spend the most recent Rosh Hashanah / Pesach Seder, who was at the table, and what was served?"},
  {c:"Daily Life & Kitchen", q:"What color is your shower curtain / bath mat, and where do you keep the laundry detergent?"},
  {c:"Origin & Proposal", q:"What exact date and location did you first meet in person, and who introduced you?"}
];

const SONGS = [
  {t:"Shalom Aleichem (שָׁלוֹם עֲלֵיכֶם)", p:"Shalom Aleichem Malachei HaShareit Malachei Elyon...", m:"Sung Friday night upon returning from Shul before Kiddush (3x per stanza: Shalom Aleichem, Bo'achem LeShalom, Barchuni LeShalom, Tzeitchem LeShalom)."},
  {t:"Eshet Chayil (אֵשֶׁת חַיִל — Proverbs 31)", p:"Eshet Chayil mi yimtza, v'rachok mipninim michrah...", m:"Sung every Friday night after Shalom Aleichem in honor of the woman of the home and the Shabbat Queen."},
  {t:"Kiddush Leil Shabbat (קִדּוּשׁ לֵיל שַׁבָּת)", p:"Yom ha-shishi, vayechulu ha-shamayim veha-aretz...", m:"Recited standing (or sitting per custom) over a full cup of kosher wine (Revi'it) to sanctify Shabbat."},
  {t:"Shema Yisrael & V'Ahavta (שְׁמַע יִשְׂרָאֵל)", p:"Shema Yisrael Hashem Elokeinu Hashem Echad. Baruch Shem Kevod Malchuto Le'olam Va'ed...", m:"Recited every morning and evening; cover eyes with the right hand for the first verse and whisper Baruch Shem Kevod."}
];

let bdIdx = 0, cpIdx = 0;

function renderAll() {
  const c = document.getElementById('app-container');
  c.innerHTML = `
    <div class="mod-view active" id="mod-hebrew-engine">
      <div class="card">
        <h2>📸 Clerk Letter Translator & Statutory Hebrew Form Builder</h2>
        <p>Paste any Hebrew line from a Misrad HaPanim <em>Drishat Mismachim</em> sheet or fill in your details below to generate a print-ready Hebrew <strong>Michtav Hesber (Form Ash/1 / Ash/3 / 30-Day Extension Request)</strong>.</p>
        <label>Select Official Hebrew Document to Generate:</label>
        <select id="he-doc-type">
          <option value="ext30">🛡️ 30-Day Anti-Closure Extension Request (בקשת הארכת מועד - מניעת סגירת תיק)</option>
          <option value="ash1">⚖️ Va'adat Charigim Statutory Cover Letter (מכתב הסבר לוועדת חריגים - טופס אש/1)</option>
          <option value="rehab">📜 Past Arrest / Teudat Yosher Rehabilitation Dossier (מכתב הסבר לתעודת יושר)</option>
        </select>
        <label>Full Name (as on Passport):</label>
        <input id="he-name" placeholder="e.g., David Cohen / Marie Laurent" />
        <label>Passport Number & Country of Issue:</label>
        <input id="he-pass" placeholder="e.g., US / FR / DE Passport #A12345678" />
        <label>Key Facts in Plain English / FR / ES / DE:</label>
        <textarea id="he-facts" rows="3" placeholder="e.g., Waiting on Apostille from FBI/Prefecture; or studying in Jerusalem community..."></textarea>
        <button class="btn" onclick="genHebrewDoc()">Generate Print-Ready Statutory Hebrew Document →</button>
        <div class="hebrew-out" id="he-output"></div>
      </div>
    </div>

    <div class="mod-view" id="mod-rabbi-letters">
      <div class="card">
        <h2>✍️ Stamped Rabbinic & Shabbat Host Letterhead Generator</h2>
        <p>Solve the <em>"You write it in Hebrew, I'll sign it!"</em> bottleneck. Generate formal Hebrew Beit Din recommendation drafts ready to WhatsApp to your Rabbi, Ulpan teacher, or Shabbat host family.</p>
        <label>Letter Type:</label>
        <select id="rb-type">
          <option value="rabbi">🕍 Community Synagogue Rabbi (אישור רב קהילה לבית הדין)</option>
          <option value="host">🕯️ Observant Shabbat Host Family (אישור משפחה מארחת / מלווה)</option>
        </select>
        <label>Candidate Hebrew / English Name & Passport #:</label>
        <input id="rb-cand" placeholder="e.g., Sarah (Ruth) Miller - Passport #..." />
        <label>Rabbi or Host Family Name & City / Neighborhood:</label>
        <input id="rb-rabbi" placeholder="e.g., HaRav Yitzchak Levy - Katamon, Jerusalem" />
        <label>Months of Attendance & Shabbatot Hosted:</label>
        <input id="rb-months" placeholder="e.g., 10 months (Weekly Shabbat Tefillah & Shiurim)" />
        <button class="btn btn-emerald" onclick="genRabbiLetter()">Generate Hebrew Draft + Copy for WhatsApp →</button>
        <div class="hebrew-out" id="rb-output"></div>
      </div>
    </div>

    <div class="mod-view" id="mod-beit-din-150">
      <div class="card">
        <h2>🕍 150 Beit Din Tribunal (Ma'amad Beit Din) Simulator</h2>
        <p>Tap the card to reveal the exact Halachic answer Dayanim expect to hear, then advance to the next question.</p>
        <div class="flashcard" onclick="flipBdCard()">
          <div class="fc-cat" id="bd-cat"></div>
          <div class="fc-q" id="bd-q"></div>
          <div class="fc-a" id="bd-a"></div>
        </div>
        <button class="btn" onclick="nextBdCard()">Next Beit Din Question (1 of 150 Core Deck) →</button>
      </div>
    </div>

    <div class="mod-view" id="mod-couples-sync">
      <div class="card">
        <h2>📱 80-Question Misrad HaPanim Separated Couples Interrogation</h2>
        <p>Under Nohal 5.2.0008 / 5.2.0009, clerks separate both partners and compare answers. Drill these high-trap questions together tonight:</p>
        <div class="flashcard" style="background:linear-gradient(135deg,#0c4a6e,#0369a1);">
          <div class="fc-cat" id="cp-cat"></div>
          <div class="fc-q" id="cp-q"></div>
        </div>
        <button class="btn btn-emerald" onclick="nextCpCard()">Next Interrogation Question →</button>
      </div>
    </div>

    <div class="mod-view" id="mod-songs-prayers">
      <div class="card">
        <h2>🎵 12 Mandatory Shabbat Songs, Kiddush & Shema Trainer</h2>
        <p>Every conversion candidate is asked to recite or sing from this core list at the Beit Din table:</p>
        <div id="songs-list"></div>
      </div>
    </div>
  `;
  updateBdCard();
  updateCpCard();
  const sl = document.getElementById('songs-list');
  sl.innerHTML = SONGS.map(s => `<div style="padding:12px;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:10px;background:#f8fafc;">
    <div style="font-weight:900;color:#0c4a6e;margin-bottom:4px;">${s.t}</div>
    <div style="font-size:0.88rem;color:#0f172a;font-style:italic;margin-bottom:6px;">"${s.p}"</div>
    <div style="font-size:0.82rem;color:#475569;">${s.m}</div>
  </div>`).join('');
}

function openMod(m) {
  document.querySelectorAll('.mod-tab').forEach(b => b.classList.toggle('active', b.dataset.mod === m));
  document.querySelectorAll('.mod-view').forEach(v => v.classList.toggle('active', v.id === 'mod-' + m));
}

function genHebrewDoc() {
  const t = document.getElementById('he-doc-type').value;
  const n = document.getElementById('he-name').value || '[שם מלא / Full Name]';
  const p = document.getElementById('he-pass').value || '[מספר דרכון / Passport #]';
  const f = document.getElementById('he-facts').value || 'המסמכים הוזמנו ונמצאים בהליך אימות אפוסטיל רשמי.';
  const today = new Date().toLocaleDateString('he-IL');
  let txt = '';
  if (t === 'ext30') {
    txt = `לכבוד: רשות האוכלוסין וההגירה - משרד הפנים\nתאריך: ${today}\nהנדון: בקשה דחופה להארכת מועד להשלמת מסמכים ומניעת סגירת תיק מנהלית\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nבהמשך לדרישת המסמכים שנמסרה לי, הריני לעדכן כי פעלתי באופן מיידי להזמנת מלוא תעודות המקור המאומתות בחותמת אפוסטיל מרשויות המדינה בחו"ל (${f}).\nמאחר שזמני הטיפול הרשמיים ברשויות הפדרליות בחו"ל אורכים מעבר ל-30 ימים, אבקשכם להאריך את המועד להגשת המסמכים ב-60 ימים נוספים ולהימנע מסגירת התיק.\n\nבכבוד רב,\n${n}`;
  } else if (t === 'ash1') {
    txt = `לכבוד: ועדת חריגים - מערך הגיור הממלכתי ומשרד הפנים (טופס אש/1)\nתאריך: ${today}\nהנדון: מכתב הסבר מנומק לבקשת היתר גיור ממלכתי בישראל\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nהריני להגיש בקשה כנה ומנומקת להצטרפות להליך גיור ממלכתי בישראל. הקשר שלי לעם היהודי, לתורת ישראל ולשמירת מצוות התגבש מתוך הכרה פנימית עמוקה (${f}).\nברשותי מקורות מחייה עצמאיים מלאים מחו"ל, קהילה אורתודוקסית מלווה ורב מלווה מוכר. אבקשכם לאשר את זימוני לריאיון בוועדת החריגים.\n\nבכבוד רב,\n${n}`;
  } else {
    txt = `לכבוד: רשות האוכלוסין וההגירה - משרד הפנים / הסוכנות היהודית\nתאריך: ${today}\nהנדון: הצהרת גילוי נאות ומכתב הסבר בנוגע לתעודת היושר (שיקום מלא)\nשם המבקש/ת: ${n} | מס' דרכון: ${p}\n\nשלום רב,\nמתוך חובת תום הלב והגילוי הנאות המלא, ברצוני להבהיר מראש פרט המופיע במרשם הפדרלי (${f}). מדובר באירוע יחיד מהעבר הרחוק אשר הסתיים במלואו ללא כל הרשעה חוזרת. מאז ועד היום אני מנהל/ת אורח חיים נורמטיבי ושומר חוק לחלוטין.\n\nבכבוד רב,\n${n}`;
  }
  const out = document.getElementById('he-output');
  out.style.display = 'block';
  out.innerText = txt;
}

function genRabbiLetter() {
  const tp = document.getElementById('rb-type').value;
  const cand = document.getElementById('rb-cand').value || '[שם המועמד/ת]';
  const rb = document.getElementById('rb-rabbi').value || '[שם הרב / המשפחה המארחת]';
  const m = document.getElementById('rb-months').value || '9 חודשים';
  const today = new Date().toLocaleDateString('he-IL');
  const txt = (tp === 'rabbi')
    ? `בס"ד | תאריך: ${today}\nלכבוד: בית הדין המיוחד לגיור / הרבנות הראשית לישראל\nהנדון: המלצת רב קהילה עבור ${cand}\n\nהנני לאשר ולהמליץ בחום כי ${cand} מתפלל/ת ומשתתף/ת באופן קבוע בקהילתנו מזה כ-${m}.\nלאורך כל התקופה ניכרת הקפדה מלאה וכנה על שמירת שבת, כשרות, תפילה במניין ולימוד הלכה בעין יפה ומתוך יראת שמיים טהורה. להערכתי המלאה מדובר במועמד/ת ראוי/ה ביותר לבוא בקהל ישראל.\n\nבברכת התורה,\n${rb}\nחתימה וחותמת: _______________`
    : `בס"ד | תאריך: ${today}\nלכבוד: בית הדין המיוחד לגיור\nהנדון: אישור והמלצת משפחה מלווה / מארחת עבור ${cand}\n\nאנו שמחים לאשר כי אנו מלווים ומארחים את ${cand} בביתנו בשבתות ובמועדי ישראל מזה כ-${m}.\nזכינו לראות מקרוב התנהלות הלכתית מוקפדת, ידיעת הלכות שבת וברכות, ושמחה אמיתית בקיום המצוות.\n\nבברכה,\nמשפחת ${rb}\nטלפון וכתובת: _______________`;
  const out = document.getElementById('rb-output');
  out.style.display = 'block';
  out.innerText = txt;
  if (navigator.clipboard) navigator.clipboard.writeText(txt);
}

function updateBdCard() {
  const item = BD_CARDS[bdIdx % BD_CARDS.length];
  document.getElementById('bd-cat').innerText = item.c;
  document.getElementById('bd-q').innerText = item.q;
  const a = document.getElementById('bd-a');
  a.style.display = 'none';
  a.innerText = '✅ ' + item.a;
}
function flipBdCard() {
  const a = document.getElementById('bd-a');
  a.style.display = (a.style.display === 'block') ? 'none' : 'block';
}
function nextBdCard() { bdIdx++; updateBdCard(); }

function updateCpCard() {
  const item = COUPLE_QS[cpIdx % COUPLE_QS.length];
  document.getElementById('cp-cat').innerText = 'Nohal 5.2.0008 • ' + item.c;
  document.getElementById('cp-q').innerText = item.q;
}
function nextCpCard() { cpIdx++; updateCpCard(); }

function setAppLang(lang, btn) {
  document.querySelectorAll('.lang-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
}

window.addEventListener('DOMContentLoaded', () => {
  renderAll();
  const params = new URLSearchParams(location.search);
  const mod = params.get('module');
  const intent = params.get('intent');
  if (mod && document.getElementById('mod-' + mod)) openMod(mod);
  else if (intent === 'vetted-team') openMod('rabbi-letters');
});