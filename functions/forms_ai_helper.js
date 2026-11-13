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
      const prompt = [
        "Convert every field value in the JSON below into clean, official Israeli Misrad HaPanim Clerk Hebrew (עברית תקנית לרשות האוכלוסין).",
        "- Transliterate proper names phonetically into Hebrew script.",
        "- Translate countries, cities, professions, relationship/settlement details, and explanations into natural, formal Israeli Hebrew.",
        "- Keep numbers, phone numbers, email addresses, and dates intact.",
        "- Return ONLY valid JSON with exact key 'translated' mapping the same keys to Hebrew strings.",
        "",
        JSON.stringify(req.body.fields || {})
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
