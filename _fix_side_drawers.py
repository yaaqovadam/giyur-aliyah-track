import json

DRAWERS_5LANG = {
  "he": {
    "#left-drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.3rem;">🛠️ ניירת ו<span>קונסיירז׳</span></div></div>
      <div class="drawer-dark-stats" style="border-color:#38bdf8;">
        <div class="dds-head" style="color:#38bdf8;"><span>🛡️ מגן בירוקרטיה במכה אחת</span><span>✓</span></div>
        <div class="dds-grid">
          <div><span class="dds-num">5 מסמכים</span><span class="dds-lbl">שעון 180 יום</span></div>
          <div><span class="dds-num">דו-כיווני</span><span class="dds-lbl">טפסי PDF</span></div>
          <div><span class="dds-num">5–8+</span><span class="dds-lbl">מכתבי קהילה</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <button class="drawer-row" onclick="openTerm('go_bag'); toggleLeftDrawer(false);">🚨 תיק חירום לטיסה ועלייה מהארץ (שינוי מעמד)</button>
        <button class="drawer-row" onclick="openTerm('bridge_health'); toggleLeftDrawer(false);">🏥 ביטוח רפואי מגשר ל-60–90 יום (ללא ת"ז)</button>
        <button class="drawer-row" onclick="openTerm('fx_shield'); toggleLeftDrawer(false);">💸 תשלום שכר דירה ב-₪ וחיסכון של 2.5% בהמרת מט"ח</button>
        <button class="drawer-row" onclick="switchTab(4); toggleLeftDrawer(false);">📸 מתרגם דו-כיווני וממלא טפסי PDF בעברית</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">🕍 רב מלווה מוכר ומדריכת כלה מוסמכת</button>
        <button class="drawer-row" onclick="openObstacle(8); toggleLeftDrawer(false);">💼 הישרדות כתייר: עבודה מרחוק ושכירת דירה</button>
        <button class="drawer-row" onclick="openTerm('community_letters'); toggleLeftDrawer(false);">✍️ מחולל מכתבי קהילה ונייר לוגו רבני</button>
        <button class="drawer-row" onclick="openTerm('five_docs'); toggleLeftDrawer(false);">✈️ 5 מסמכי האפוסטיל וכלל 24 החודשים לסל קליטה</button>
        <button class="drawer-row" onclick="openTerm('vaadat_charigim'); toggleLeftDrawer(false);">⚖️ מדריך ועדת חריגים (טופס אש/1)</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">ℹ️ מי אנחנו — ומי אנחנו לא</button>
      </div>
    </div>
    <div><button class="btn-install-navy" onclick="switchTab(2); toggleLeftDrawer(false);">⏱️ חשבו כמה שנים וכסף תחסכו ←</button></div>""",
    "#app-drawer .drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.4rem;">Giyur<span>Aliyah</span>Track</div></div>
      <div class="drawer-dark-stats">
        <div class="dds-head"><span>⚡ מגן מפני לולאות בירוקרטיה</span><span>↻</span></div>
        <div class="dds-grid">
          <div><span class="dds-num green">3.5 שנים</span><span class="dds-lbl">חיסכון ממוצע</span></div>
          <div><span class="dds-num">150 שאלות</span><span class="dds-lbl">בית דין</span></div>
          <div><span class="dds-num">80 שאלות</span><span class="dds-lbl">סינכרון זוגי</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <a href="/app?module=beit-din-150" class="drawer-row">🕍 150 כרטיסיות ומשחק הכנה לבית דין</a>
        <a href="/app?module=songs-prayers" class="drawer-row">🎵 12 שירי שבת, תפילות ומאמן קריאת שמע</a>
        <a href="/app?module=couples-sync" class="drawer-row">📱 סימולטור 80 השאלות הזוגי ב-2 טלפונים</a>
        <button class="drawer-row" onclick="switchTab(4); toggleDrawer(false);">📊 מעקב חי: שעון 180 יום ומגן 30 יום</button>
        <a href="/app" class="drawer-row" style="color:var(--sky);">🔐 כניסה לפורטל החברים המלא (/app)</a>
      </div>
    </div>
    <div><button class="btn-install-navy" onclick="alert('להתקנת האפליקציה בטלפון: לחצו על כפתור השיתוף (Share) ב-Safari/Chrome ובחרו הוספה למסך הבית!')">📲 התקנת אפליקציה במסך הבית</button></div>"""
  },
  "fr": {
    "#left-drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.3rem;">🛠️ Dossiers & <span>Conciergerie</span></div></div>
      <div class="drawer-dark-stats" style="border-color:#38bdf8;">
        <div class="dds-head" style="color:#38bdf8;"><span>🛡️ Bouclier Bureaucratie 1-Coup</span><span>✓</span></div>
        <div class="dds-grid">
          <div><span class="dds-num">5 Pièces</span><span class="dds-lbl">Horloge 180j</span></div>
          <div><span class="dds-num">2-Sens</span><span class="dds-lbl">PDF Hébreu</span></div>
          <div><span class="dds-num">5–8+</span><span class="dds-lbl">Lettres Rabbin</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <button class="drawer-row" onclick="openTerm('go_bag'); toggleLeftDrawer(false);">🚨 Dossier Go-Bag & Aliyah d'Urgence (Shinui Ma'amad)</button>
        <button class="drawer-row" onclick="openTerm('bridge_health'); toggleLeftDrawer(false);">🏥 Assurance Santé 60–90 Jours (Sans Teudat Zehut)</button>
        <button class="drawer-row" onclick="openTerm('fx_shield'); toggleLeftDrawer(false);">💸 Payer Loyer en ₪ & Économiser 2,5% de Change</button>
        <button class="drawer-row" onclick="switchTab(4); toggleLeftDrawer(false);">📸 Traducteur Guichetier & Formulaires PDF Hébreu</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">🕍 Rabbin Accompagnateur & Madrichat Kallah</button>
        <button class="drawer-row" onclick="openObstacle(8); toggleLeftDrawer(false);">💼 Survie Touriste : Télétravail & Logement</button>
        <button class="drawer-row" onclick="openTerm('community_letters'); toggleLeftDrawer(false);">✍️ Générateur de Lettres & En-tête Rabbinique</button>
        <button class="drawer-row" onclick="openTerm('five_docs'); toggleLeftDrawer(false);">✈️ 5 Pièces Apostillées & Règle des 24 Mois Sal Klita</button>
        <button class="drawer-row" onclick="openTerm('vaadat_charigim'); toggleLeftDrawer(false);">⚖️ Guide Va'adat Charigim (Formulaire Ash/1)</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">ℹ️ Ce Que Nous Sommes — Et Ne Sommes PAS</button>
      </div>
    </div>
    <div><button class="btn-install-navy" onclick="switchTab(2); toggleLeftDrawer(false);">⏱️ Calculer Temps & Argent Économisés →</button></div>""",
    "#app-drawer .drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.4rem;">Giyur<span>Aliyah</span>Track</div></div>
      <div class="drawer-dark-stats">
        <div class="dds-head"><span>⚡ Bouclier Anti-Boucle</span><span>↻</span></div>
        <div class="dds-grid">
          <div><span class="dds-num green">3,5 Ans</span><span class="dds-lbl">Économisés</span></div>
          <div><span class="dds-num">150 Q.</span><span class="dds-lbl">Beit Din</span></div>
          <div><span class="dds-num">80 Q.</span><span class="dds-lbl">Synchro Couple</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <a href="/app?module=beit-din-150" class="drawer-row">🕍 150 Questions Beit Din (Cartes & Simulateur)</a>
        <a href="/app?module=songs-prayers" class="drawer-row">🎵 12 Chants de Chabbat, Prières & Chema IA</a>
        <a href="/app?module=couples-sync" class="drawer-row">📱 Synchro 80 Questions sur 2 Téléphones</a>
        <button class="drawer-row" onclick="switchTab(4); toggleDrawer(false);">📊 Suivi en Direct : Horloges 180j & 30j</button>
        <a href="/app" class="drawer-row" style="color:var(--sky);">🔐 Portail Complet des Membres (/app)</a>
      </div>
    </div>
    <div><button class="btn-install-navy" onclick="alert('Pour installer l\\'application : touchez Partager dans Safari/Chrome puis Sur l\\'écran d\\'accueil.')">📲 Installer l'Application</button></div>"""
  },
  "es": {
    "#left-drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.3rem;">🛠️ Trámites y <span>Concierge</span></div></div>
      <div class="drawer-dark-stats" style="border-color:#38bdf8;">
        <div class="dds-head" style="color:#38bdf8;"><span>🛡️ Escudo Burocrático en 1 Paso</span><span>✓</span></div>
        <div class="dds-grid">
          <div><span class="dds-num">5 Docs</span><span class="dds-lbl">Reloj 180d</span></div>
          <div><span class="dds-num">2-Vías</span><span class="dds-lbl">PDF Hebreo</span></div>
          <div><span class="dds-num">5–8+</span><span class="dds-lbl">Cartas Rabino</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <button class="drawer-row" onclick="openTerm('go_bag'); toggleLeftDrawer(false);">🚨 Carpeta Go-Bag y Aliyá de Emergencia (Shinui Ma'amad)</button>
        <button class="drawer-row" onclick="openTerm('bridge_health'); toggleLeftDrawer(false);">🏥 Seguro Médico Puente 60–90 Días (Sin Teudat Zehut)</button>
        <button class="drawer-row" onclick="openTerm('fx_shield'); toggleLeftDrawer(false);">💸 Pagar Alquiler en ₪ y Ahorrar 2,5% en Divisas</button>
        <button class="drawer-row" onclick="switchTab(4); toggleLeftDrawer(false);">📸 Traductor de Funcionarios y PDF en Hebreo</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">🕍 Rabino Patrocinador y Madrijat Kalá Reconocidos</button>
        <button class="drawer-row" onclick="openObstacle(8); toggleLeftDrawer(false);">💼 Supervivencia Turista: Trabajo Remoto y Vivienda</button>
        <button class="drawer-row" onclick="openTerm('community_letters'); toggleLeftDrawer(false);">✍️ Generador de Cartas y Membrete Rabínico</button>
        <button class="drawer-row" onclick="openTerm('five_docs'); toggleLeftDrawer(false);">✈️ 5 Docs Apostillados y Regla de 24 Meses Sal Klitá</button>
        <button class="drawer-row" onclick="openTerm('vaadat_charigim'); toggleLeftDrawer(false);">⚖️ Guía Va'adat Jariguim (Formulario Ash/1)</button>
        <button class="drawer-row" onclick="switchTab(3); toggleLeftDrawer(false);">ℹ️ Qué Somos — Y Qué NO Somos</button>
      </div>
    </div>
    <div><button class="btn-install-navy" onclick="switchTab(2); toggleLeftDrawer(false);">⏱️ Calcular Años y Dinero Ahorrados →</button></div>""",
    "#app-drawer .drawer-panel": """<div>
      <div class="drawer-brand-center"><div class="brand-title" style="font-size:1.4rem;">Giyur<span>Aliyah</span>Track</div></div>
      <div class="drawer-dark-stats">
        <div class="dds-head"><span>⚡ Escudo Anti-Bucle</span><span>↻</span></div>
        <div class="dds-grid">
          <div><span class="dds-num green">3,5 Años</span><span class="dds-lbl">Ahorrados</span></div>
          <div><span class="dds-num">150 P.</span><span class="dds-lbl">Beit Din</span></div>
          <div><span class="dds-num">80 P.</span><span class="dds-lbl">Sincro Pareja</span></div>
        </div>
      </div>
      <div class="drawer-list">
        <a href="/app?module=beit-din-150" class="drawer-row">🕍 150 Preguntas del Beit Din (Tarjetas y Juego)</a>
        <a href="/app?module=songs-prayers" class="drawer-row">🎵 12 Canciones de Shabat, Rezos y Shemá IA</a>
        <a href="/app?module=couples-sync" class="drawer-row">📱 Sincronización 80 Preguntas en 2 Teléfonos</a>
        <button class="drawer-row" onclick="switchTab(4); toggleDrawer(false);">📊 Rastreador en Vivo: Relojes 180d y 30d</button>
        <a href="/