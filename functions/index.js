const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

if (!admin.apps.length) {
  admin.initializeApp();
}

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
// Optional env webhook secret // Optional: for Stripe / LemonSqueezy HMAC

// 1. AI VISION DOCUMENT & CLERK SHEET AUDITOR (/api/auditDoc)
exports.auditDoc = onRequest(
  {
    secrets: [GEMINI_API_KEY],
    cors: true,
    invoker: "public",
    maxInstances: 20,
    concurrency: 6,
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (req.body && (req.body.mode === "translate_form_hebrew" || req.body.mode === "scan_worksheet")) {
      return require("./forms_ai_helper").handleFormsAi(req, res, typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : null, "gemini-3.8-flash");
    }


    try {
      const { mimeType, base64Data, mode, lang } = req.body || {};
      if (!base64Data || !mimeType) {
        return res.status(400).json({ error: "Missing document image/PDF payload" });
      }

      const apiKey = (GEMINI_API_KEY.value() || '').trim();
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY secret not configured" });
      }

      // Strip data URL prefix if accidentally sent by client
      const cleanBase64 = String(base64Data).replace(/^data:[^;]+;base64,/, "");

      const todayStr = new Date().toISOString().slice(0, 10);
      const targetLang = { en: "English", he: "Hebrew", fr: "French", es: "Spanish", de: "German", ru: "Russian" }[lang || "en"] || "English";

      const systemPrompt = mode === "align_audio"
        ? `You are a precision Hebrew liturgical audio-to-karaoke forced alignment engine.
Listen carefully to this Hebrew Shabbat song recording (${lang || "Song"}).
Transcribe the exact Hebrew words sung in chronological order (including any repeated chorus/stanzas actually sung in the audio), provide the matching 1:1 Latin phonetic transliteration (must have the EXACT same number of space-separated words as the Hebrew text), and provide the start timestamp in seconds (e.g. 4.2) for each word.
Return ONLY valid JSON with this exact schema:
{
  "hebrew_lyrics": "word1 word2 word3 ...",
  "transliteration": "word1 word2 word3 ...",
  "timestamps_sec": [4.2, 5.1, 6.0]
}`
        : mode === "clerk_sheet" 
        ? `You are a senior Israeli Misrad HaPanim & Rabbanut legal clerk decoder. Today is ${todayStr}.
Examine the uploaded Israeli Hebrew clerk deficiency sheet (Drishat Mismachim) or letter.
Return ONLY valid JSON with this exact schema:
{
  "hebrew_raw_text": "exact Hebrew text transcribed from the image/PDF",
  "summary_in_user_lang": "Clear, bulleted action plan in ${targetLang} explaining every document the clerk is demanding and whether a 30-day or 45-day file closure warning is present."
}`
        : `You are a forensic Israeli Misrad HaPanim & Beit Din document inspector. Today is ${todayStr}.
Examine the uploaded certificate, passport, rabbinic letter, or Apostille image/PDF.
Return ONLY valid JSON with this exact schema:
{
  "doc_type": "birth_cert | police_check | single_status | rabbinic_letter | passport | apostille | other",
  "person_full_name": "exact full name on document", "prior_or_maiden_names": "any maiden or prior names", "date_of_birth": "YYYY-MM-DD", "passport_number": "passport number", "father_full_name": "father full name", "mother_full_name": "mother full name", "doc_title_detected": "Short title in ${targetLang}",
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

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { inline_data: { mime_type: mimeType, data: cleanBase64 } }
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
        headers: { "Content-Type": "application/json", "Referer": "https://giyuraliyahtrack.com/", "Origin": "https://giyuraliyahtrack.com" },
        body: JSON.stringify(payload)
      });

      if (!gRes.ok) {
        const errTxt = await gRes.text();
        return res.status(502).json({ error: "Gemini API error", details: errTxt });
      }

      const gData = await gRes.json();
      let rawJson = (((gData.candidates || [])[0] || {}).content || {}).parts?.[0]?.text || "{}";
      rawJson = rawJson.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

      const parsed = JSON.parse(rawJson);
      return res.status(200).json({ ok: true, result: parsed });
    } catch (err) {
      return res.status(500).json({ error: err.message || "Audit failed" });
    }
  }
);

// 2. SERVER-SIDE PAYMENT WEBHOOK (/api/paymentWebhook)
const TIER_DAYS = {
  forms_90d_89: 90,
  forms_life_149: 0,
  bd_pack1_65: 0,
  bd_pack2_65: 0,
  bd_pack3_49: 0,
  bd_pack4_49: 0,
  bd_all700_179: 0,
  songs_65: 0,
  bd_suite_90d_149: 90,
  bd_suite_life_249: 0,
  couples_sync_75: 90,
  couples_90d_129: 90,
  couples_life_229: 0,
  suite_solo_90d_249: 90,
  suite_solo_life_399: 0,
  vip_couple_649: 0
};

exports.paymentWebhook = onRequest(
  {
    
    cors: true,
    invoker: "public",
    maxInstances: 10
  },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    try {
      const secret = process.env.WEBHOOK_SECRET || "";
      const sig = req.get("X-Signature") || req.get("Stripe-Signature") || "";
      if (secret && sig && !sig.includes("t=")) {
        // LemonSqueezy HMAC-SHA256 verification
        const hmac = crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex");
        if (hmac !== sig) {
          return res.status(401).json({ error: "Invalid webhook signature" });
        }
      }

      const body = req.body || {};
      // Supports both LemonSqueezy (meta.custom_data) and Stripe (data.object.metadata)
      const custom = (body.meta && body.meta.custom_data) || (body.data && body.data.object && body.data.object.metadata) || {};
      const uid = custom.uid;
      const tier = custom.tier || "suite_solo_life_399";
      const room = custom.room || "";

      if (!uid || uid === "anon") {
        return res.status(200).json({ ok: true, warning: "No UID attached to order" });
      }

      const days = TIER_DAYS[tier] !== undefined ? TIER_DAYS[tier] : 0;
      const expMs = days > 0 ? Date.now() + days * 24 * 60 * 60 * 1000 : 0;

      const db = admin.firestore();
      const docRef = db.collection("pro_entitlements").doc(uid);
      const snap = await docRef.get();
      const existingMap = (snap.exists && snap.data().entitlementsMap) ? snap.data().entitlementsMap : {};
      existingMap[tier] = { exp: expMs, ts: Date.now() };

      await docRef.set({
        uid,
        unlocked: true,
        tier,
        entitlementsMap: existingMap,
        source: "verified_webhook",
        unlockedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      if (room && ["couples_sync_75", "couples_90d_129", "couples_life_229", "vip_couple_649"].includes(tier)) {
        await db.collection("couples_rooms").doc(room).set({ vipCoupleUnlocked: true }, { merge: true });
      }

      return res.status(200).json({ ok: true, uid, tier });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);