const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

exports.auditDoc = onRequest(
  {
    secrets: [GEMINI_API_KEY],
    cors: true,
    maxInstances: 10,
    timeoutSeconds: 60,
    memory: "256MiB"
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const { mimeType, base64Data, mode, lang } = req.body || {};
      if (!base64Data || !mimeType) {
        return res.status(400).json({ error: "Missing document image/PDF payload" });
      }

      const apiKey = GEMINI_API_KEY.value();
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY secret not configured" });
      }

      const todayStr = new Date().toISOString().slice(0, 10);
      const targetLang = { en: "English", he: "Hebrew", fr: "French", es: "Spanish", de: "German" }[lang || "en"] || "English";

      const systemPrompt = mode === "clerk_sheet"
        ? `You are a senior Israeli Misrad HaPanim & Rabbanut legal clerk decoder. Today is ${todayStr}.
Examine the uploaded Israeli Hebrew clerk deficiency sheet (Drishat Mismachim) or letter.
Return ONLY valid JSON with this exact schema:
{
  "hebrew_raw_text": "exact Hebrew text transcribed from the image/PDF",
  "summary_in_user_lang": "Clear, bulleted action plan in ${targetLang} explaining every document the clerk is demanding and whether a 30-day file closure warning is present."
}`
        : `You are a forensic Israeli Misrad HaPanim & Beit Din document inspector. Today is ${todayStr}.
Examine the uploaded certificate, passport, rabbinic letter, or Apostille image/PDF.
Return ONLY valid JSON with this exact schema:
{
  "doc_type": "birth_cert | police_check | single_status | rabbinic_letter | passport | apostille | other",
  "doc_title_detected": "Short title in ${targetLang}",
  "issue_date_iso": "YYYY-MM-DD or null if not visible",
  "days_since_issued": 0,
  "passport_months_remaining": 36,
  "is_long_form_both_parents": true,
  "has_apostille_visible": true,
  "is_federal_doc": false,
  "apostille_authority_correct": true,
  "detected_full_name": "Exact full name spelled on the document",
  "document_language": "hebrew | english | foreign",
  "has_israeli_red_ribbon_notary": false,
  "forensic_findings": [
    "Specific forensic observation #1 in ${targetLang} (e.g., whether both parents are listed, exact issue date, stamp/apostille authority, or any red flags)"
  ]
}`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { inline_data: { mime_type: mimeType, data: base64Data } }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      };

      const gRes = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!gRes.ok) {
        const errTxt = await gRes.text();
        return res.status(502).json({ error: "Gemini API error", details: errTxt });
      }

      const gData = await gRes.json();
      const rawJson = (((gData.candidates || [])[0] || {}).content || {}).parts?.[0]?.text || "{}";
      const parsed = JSON.parse(rawJson);
      return res.status(200).json({ ok: true, result: parsed });
    } catch (err) {
      return res.status(500).json({ error: err.message || "Audit failed" });
    }
  }
);
