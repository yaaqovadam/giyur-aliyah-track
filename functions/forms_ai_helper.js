"use strict";

async function handleFormsAi(req, res, secretObj, primaryModel) {
  try {
    const apiKey = (secretObj && typeof secretObj.value === "function")
      ? secretObj.value()
      : (process.env.GEMINI_API_KEY || "");
    if (!apiKey) {
      return res.status(500).json({ ok: false, error: "Missing GEMINI_API_KEY" });
    }

    const mode = req.body && req.body.mode;
    const parts = [];

    if (mode === "translate_form_hebrew") {
      const hasEnReq = req.body.enFields && Object.keys(req.body.enFields).length > 0;
      const hasKidsReq = Array.isArray(req.body.childrenRows) && req.body.childrenRows.length > 0;
      const prompt = [
        "You are an official Israeli Misrad HaPanim (PIBA) bilingual form processor.",
        "TASK 1 ('translated' — OFFICIAL CLERK HEBREW):",
        "Convert every field value in `fields_for_hebrew` into clean, official Israeli Misrad HaPanim Clerk Hebrew (עברית תקנית לרשות האוכלוסין):",
        "- Transliterate proper names phonetically into Hebrew script.",
        "- Translate countries, cities, streets, professions, religions/nationalities, relationship/settlement details, and explanations into natural, formal Israeli Hebrew.",
        "- Keep numbers, house/apt numbers, phone numbers, email addresses, and dates intact.",
        "",
        "TASK 2 ('translated_en' — OFFICIAL UPPERCASE ENGLISH / LATIN A-Z FOR 'In English' FORM BOXES):",
        "Convert every field value in `fields_for_english` into clean UPPERCASE English / Latin letters (ASCII A-Z, 0-9, spaces, hyphens, commas ONLY — ZERO Hebrew characters!):",
        "- Transliterate personal names (e.g. Father, Mother, Maiden/Prior names, Rabbi/Contact) accurately into UPPERCASE Latin letters (e.g. 'חואן פיגילם גרסיה' -> 'JUAN PIGUILLEM GARCIA', 'לונה' -> 'LUNA', 'ללא' -> 'NONE').",
        "- Translate countries, cities, citizenships, and religions into standard English in UPPERCASE (e.g. 'הולנדית' -> 'DUTCH', 'פלמה דה מיורקה, ספרד' -> 'PALMA DE MALLORCA, SPAIN', 'יהודי / יהודייה' -> 'JEWISH', 'צפת' -> 'SAFED').",
        "- For Israeli addresses: output `pf_il_street_en` as ONLY the street, house number, and apartment in UPPERCASE English (e.g. 'HARAV LEVI BISTRITZKY 221 APT 39' — NO city or zip code!), and `pf_il_city_en` as ONLY the city name in UPPERCASE English (e.g. 'SAFED' — NO apartment or zip code!).",
        "",
        "TASK 3 ('children_bilingual'):",
        "If `children_rows` is non-empty, return an array of objects in the exact same order with keys `given_he` (Hebrew script), `given_en` (UPPERCASE Latin A-Z), `country_he` (Hebrew country name), `country_en` (UPPERCASE English country name).",
        "",
        'Return ONLY valid JSON matching: { "translated": {...}, "translated_en": {...}, "children_bilingual": [...] }',
        "",
        "fields_for_hebrew: " + JSON.stringify(req.body.fields || {}),
        "fields_for_english: " + JSON.stringify(hasEnReq ? req.body.enFields : {}),
        "children_rows: " + JSON.stringify(hasKidsReq ? req.body.childrenRows : [])
      ].join("\n");
      parts.push({ text: prompt });
    } else if (mode === "translate_form_mother") {
      const targetLangCode = String(req.body.targetLang || "en").toLowerCase().slice(0, 2);
      const langMap = { en: "English", es: "Spanish (Español)", fr: "French (Français)", de: "German (Deutsch)", ru: "Russian (Русский)" };
      const targetLangName = langMap[targetLangCode] || "English";
      const prompt = [
        "You are translating user-filled Israeli Misrad HaPanim (PIBA) form field values from Hebrew/mixed script into clean, natural " + targetLangName + " so the user can verify every box on a visual replica of their form in their own mother tongue.",
        "RULES:",
        "1. Translate countries, cities, citizenships, religions, marital statuses, visa types, street addresses, professions, institutions, and explanation texts naturally into " + targetLangName + " (e.g., for Spanish: 'פלמה דה מיורקה, ספרד' -> 'Palma de Mallorca, España', 'הולנדית' -> 'Neerlandesa', 'יהודייה • יהודייה' -> 'Judía • Judía', 'הרב לוי ביסטריצקי 221, דירה 39, צפת' -> 'Calle HaRav Levi Bistritzky 221, Apto 39, Safed', 'ללא' -> 'Ninguno').",
        "2. Transliterate Hebrew personal names accurately into " + (targetLangCode === "ru" ? "Cyrillic (Russian)" : "Latin script") + " (preserving exact passport spelling if obvious, e.g. 'חואן פיגילם גרסיה' -> 'Juan Piguillem García').",
        "3. Keep dates, ID/passport numbers, phone numbers, and emails intact. Output ZERO Hebrew characters!",
        "4. If `children_rows` is non-empty, translate each child object's `surname_he`, `given_he`, `other_parent_he`, and `country` into " + targetLangName + " in `children_translated` (same array order).",
        'Return ONLY valid JSON: { "translated": { ... }, "children_translated": [ ... ] }',
        "",
        "fields: " + JSON.stringify(req.body.fields || {}),
        "children_rows: " + JSON.stringify(req.body.childrenRows || [])
      ].join("\n");
      parts.push({ text: prompt });
    } else if (mode === "batch_translate_pdf_labels") {
      const items = Array.isArray(req.body.items) ? req.body.items : [];
      const prompt = [
        "You are translating official printed labels, headers, checkbox captions, and legal declarations from Israeli Ministry of Interior (Misrad HaPanim / PIBA) forms into 5 languages: English (en), Spanish (es), French (fr), German (de), and Russian (ru).",
        "RULES:",
        "- Keep each translation concise so it fits inside the exact original form box/header cell.",
        "- If an input label contains BOTH Hebrew and English together (e.g. 'שם משפחהLast Name' or 'רווק/ה- Single'), translate its single clean meaning into each language (e.g. en: 'Last Name', es: 'Apellido', fr: 'Nom de famille', de: 'Nachname', ru: 'Фамилия').",
        "- For 'בעברית' ('In Hebrew' row indicator on the form), translate concisely as: en: 'Primary', es: 'Principal', fr: 'Principal', de: 'Primär', ru: 'Осн.'.",
        "- For 'In English' / 'באנגלית' (Latin passport row indicator), translate concisely as: en: 'Passport Latin', es: 'Latín Pasaporte', fr: 'Latin Passeport', de: 'Pass-Latein', ru: 'Латиницей'.",
        "- Preserve form codes cleanly (e.g. 'טופס אש/3' -> en: 'Form Ash/3', es: 'Form. Ash/3', fr: 'Form. Ash/3', de: 'Form. Asch/3', ru: 'Форма Аш/3').",
        "- Return ONLY valid JSON: an object `translations` mapping each exact input index string ('0', '1', ...) to `{ \"en\": \"...\", \"es\": \"...\", \"fr\": \"...\", \"de\": \"...\", \"ru\": \"...\" }`.",
        "",
        "INPUT_ARRAY: " + JSON.stringify(items)
      ].join("\n");
      parts.push({ text: prompt });
    } else {
      parts.push({
        inline_data: {
          mime_type: req.body.mimeType || "image/jpeg",
          data: req.body.base64Data || ""
        }
      });
      const prompt = [
        "Read this handwritten or printed immigration worksheet carefully.",
        "For each key in expectedFields:",
        "- If script === 'he', translate or transliterate the user's answer into clean, official Israeli Misrad HaPanim Clerk Hebrew.",
        "- If script === 'latin', output exact uppercase Latin letters.",
        "- For date fields, output YYYY-MM-DD.",
        "- Omit keys that were left blank.",
        "- Return ONLY valid JSON with top-level key 'worksheet_fields' mapping fieldId to value.",
        "",
        "expectedFields:",
        JSON.stringify(req.body.expectedFields || {})
      ].join("\n");
      parts.push({ text: prompt });
    }

    const models = Array.from(new Set([primaryModel || "gemini-3.8-flash", "gemini-3.8-flash"]));
    let parsed = null;
    let lastErr = "";

    for (const mdl of models) {
      const gUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + mdl + ":generateContent?key=" + apiKey;
      const gRes = await fetch(gUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
        })
      });
      const gJson = await gRes.json();
      if (!gRes.ok || !gJson.candidates || !gJson.candidates[0]) {
        lastErr = JSON.stringify(gJson.error || gJson);
        continue;
      }
      const rawOut = ((gJson.candidates[0].content && gJson.candidates[0].content.parts) || [])
        .filter((p) => !p.thought && typeof p.text === "string")
        .map((p) => p.text)
        .join("")
        .trim()
        .replace(/^```(?:json)?\s*|\s*```$/gi, "");
      parsed = JSON.parse(rawOut);
      break;
    }

    if (!parsed) throw new Error("Gemini call failed: " + lastErr);
    return res.status(200).json({ ok: true, result: parsed });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
}

module.exports = { handleFormsAi };
