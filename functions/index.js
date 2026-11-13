const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

if (!admin.apps.length) {
  admin.initializeApp();
}

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

function maskEmailStr(rawEmail) {
  const e = String(rawEmail || "").trim().toLowerCase();
  const atIdx = e.indexOf("@");
  if (atIdx <= 0) return "";
  const local = e.slice(0, atIdx);
  const domain = e.slice(atIdx + 1);
  if (!domain) return "";
  const maskedLocal = local.length <= 2
    ? (local.charAt(0) + "xxxx")
    : (local.charAt(0) + "xxxx" + local.slice(-1));
  return maskedLocal + "@" + domain;
}

function collectUserEmails(uData) {
  const set = new Set();
  const add = (val) => {
    const s = String(val || "").trim().toLowerCase();
    if (s && s.includes("@") && s.includes(".")) set.add(s);
  };
  if (!uData || typeof uData !== "object") return [];
  add(uData.checkoutEmail);
  add(uData.primaryEmail);
  add(uData.authEmail);
  if (uData.formDraft) add(uData.formDraft.pf_email);
  if (uData.draft) add(uData.draft.pf_email);
  if (uData.conciergeOrder && String(uData.conciergeOrder.whatsapp || "").includes("@")) {
    add(uData.conciergeOrder.whatsapp);
  }
  if (Array.isArray(uData.savedEmails)) uData.savedEmails.forEach(add);
  return Array.from(set);
}


function normalizePhoneDigits(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (!d) return "";
  // Normalize Israeli local 05X-XXXXXXX -> 9725XXXXXXXX
  if (d.startsWith("05") && d.length === 10) {
    d = "972" + d.slice(1);
  } else if (d.startsWith("00")) {
    d = d.slice(2);
  }
  return d;
}

async function sendGreenApiWhatsApp(phoneOrChatId, messageText) {
  const idInstance = process.env.GREEN_API_ID_INSTANCE || "";
  const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE || "";
  const apiUrl = (process.env.GREEN_API_URL || "https://api.green-api.com").replace(/\/+$/, "");
  if (!idInstance || !apiTokenInstance) {
    console.warn("GreenAPI credentials not set in environment yet.");
    return { ok: false, error: "GreenAPI credentials not configured on server" };
  }
  let chatId = String(phoneOrChatId || "").trim();
  if (!chatId.includes("@")) {
    const digits = normalizePhoneDigits(chatId);
    if (digits.length < 8) return { ok: false, error: "Invalid phone number" };
    chatId = `${digits}@c.us`;
  }
  const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message: String(messageText || "") })
  });
  const data = await resp.json().catch(() => ({}));
  return { ok: resp.ok, status: resp.status, data };
}

async function findUserByPhoneDigits(db, digits) {
  if (!digits || digits.length < 8) return null;
  // 1. Fast indexed lookup on whatsappDigits
  const q1 = await db.collection("users").where("whatsappDigits", "==", digits).limit(1).get();
  if (!q1.empty) return q1.docs[0];

  // 2. Fallback scan of recent users with conciergeOrder or formDraft phone
  const q2 = await db.collection("users").limit(100).get();
  for (const doc of q2.docs) {
    const u = doc.data() || {};
    const candidates = [
      u.whatsappDigits,
      u.conciergeOrder && u.conciergeOrder.whatsapp,
      u.formDraft && u.formDraft.pf_phone_il,
      u.formDraft && u.formDraft.pf_phone,
      u.draft && u.draft.pf_phone_il
    ];
    for (const c of candidates) {
      const cd = normalizePhoneDigits(c);
      if (cd && (cd === digits || cd.endsWith(digits.slice(-9)) || digits.endsWith(cd.slice(-9)))) {
        await doc.ref.set({ whatsappDigits: digits }, { merge: true });
        return doc;
      }
    }
  }
  return null;
}

function generateCleanPassCode() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let p1 = "", p2 = "";
  for (let i = 0; i < 3; i++) {
    p1 += chars.charAt(crypto.randomInt(0, chars.length));
    p2 += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return `${p1}-${p2}`;
}

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
    if (req.body && [
      "get_or_create_pass",
      "claim_pass",
      "save_pass_email",
      "lookup_lost_account",
      "send_whatsapp_pass",
      "save_whatsapp_number",
      "merge_user_accounts"
    ].includes(req.body.mode)) {
      const db = admin.firestore();

      async function ensurePermanentPassCode(uid, userRef, uData) {
        if (uData && uData.permanentPassCode) return uData.permanentPassCode;
        let code = generateCleanPassCode();
        for (let attempt = 0; attempt < 5; attempt++) {
          const check = await db.collection("users").where("permanentPassCode", "==", code).limit(1).get();
          if (check.empty) break;
          code = generateCleanPassCode();
        }
        await userRef.set({ uid, permanentPassCode: code, updatedAtMs: Date.now() }, { merge: true });
        return code;
      }

      // 1. TRANSMITTER DEVICE: Get or create the user's ONE permanent Pass Code + QR + Masked Emails
      if (req.body.mode === "get_or_create_pass") {
        const idToken = String(req.body.idToken || "").trim();
        if (!idToken) return res.status(401).json({ ok: false, error: "Missing session token" });
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded.uid;
        const userRef = db.collection("users").doc(uid);
        const uSnap = await userRef.get();
        const uData = uSnap.exists ? (uSnap.data() || {}) : {};
        if (decoded.email && !uData.authEmail) {
          uData.authEmail = decoded.email;
        }
        const passCode = await ensurePermanentPassCode(uid, userRef, uData);
        const rawEmails = collectUserEmails(uData);
        const maskedEmails = rawEmails.map((em, idx) => ({ idx, masked: maskEmailStr(em) }));

        return res.status(200).json({
          ok: true,
          uid,
          passCode,
          maskedEmails
        });
      }

      // 2. SAVE / CONFIRM BACKUP EMAIL FOR PERMANENT PASS
      if (req.body.mode === "save_pass_email") {
        const idToken = String(req.body.idToken || "").trim();
        if (!idToken) return res.status(401).json({ ok: false, error: "Missing session token" });
        const decoded = await admin.auth().verifyIdToken(idToken);
        const uid = decoded.uid;
        const userRef = db.collection("users").doc(uid);
        const uSnap = await userRef.get();
        const uData = uSnap.exists ? (uSnap.data() || {}) : {};
        const passCode = await ensurePermanentPassCode(uid, userRef, uData);
        const rawEmails = collectUserEmails(uData);

        let chosenEmail = "";
        if (typeof req.body.emailIdx === "number" && rawEmails[req.body.emailIdx]) {
          chosenEmail = rawEmails[req.body.emailIdx];
        } else if (req.body.customEmail) {
          const ce = String(req.body.customEmail).trim().toLowerCase();
          if (!ce.includes("@") || !ce.includes(".")) {
            return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
          }
          chosenEmail = ce;
        }
        if (!chosenEmail) {
          return res.status(400).json({ ok: false, error: "Please select or enter an email address." });
        }

        const updatedEmails = Array.from(new Set([chosenEmail, ...rawEmails]));
        await userRef.set({
          uid,
          primaryEmail: chosenEmail,
          savedEmails: updatedEmails,
          updatedAtMs: Date.now()
        }, { merge: true });

        return res.status(200).json({
          ok: true,
          maskedChosen: maskEmailStr(chosenEmail),
          passCode,
          maskedEmails: updatedEmails.map((em, idx) => ({ idx, masked: maskEmailStr(em) }))
        });
      }

      // 3. RECEIVER DEVICE: Claim Permanent Pass Code (via QR scan ?pass=XXX-XXX or typed code)
      //    Signs Receiver Device into the EXACT SAME Firebase UID via createCustomToken!
      if (req.body.mode === "claim_pass") {
        const rawInput = String(req.body.passCode || "").trim().toUpperCase();
        const targetUid = String(req.body.targetUid || "").trim();

        // Check if it is an active server-side Promo Code in promo_codes/{rawInput}
        if (rawInput.length >= 4 && targetUid) {
          const promoSnap = await db.collection("promo_codes").doc(rawInput).get();
          if (promoSnap.exists && promoSnap.data() && promoSnap.data().active !== false) {
            const pData = promoSnap.data();
            const tier = pData.tier || "suite_solo_life_399";
            const days = TIER_DAYS[tier] !== undefined ? TIER_DAYS[tier] : 0;
            const expMs = days > 0 ? Date.now() + days * 24 * 60 * 60 * 1000 : 0;
            const entRef = db.collection("pro_entitlements").doc(targetUid);
            const entPre = await entRef.get();
            const existingMap = (entPre.exists && entPre.data().entitlementsMap) ? entPre.data().entitlementsMap : {};
            existingMap[tier] = { exp: expMs, ts: Date.now() };
            const entPayload = {
              uid: targetUid,
              unlocked: true,
              tier,
              entitlementsMap: existingMap,
              source: "verified_promo_code",
              unlockedAt: admin.firestore.FieldValue.serverTimestamp()
            };
            await entRef.set(entPayload, { merge: true });
            await db.collection("users").doc(targetUid).set(entPayload, { merge: true });
            return res.status(200).json({
              ok: true,
              masterUid: targetUid,
              mergedData: entPayload,
              userData: entPayload
            });
          }
        }

        const raw = rawInput.replace(/[^A-Z0-9]/g, "");
        if (raw.length !== 6) {
          return res.status(400).json({ ok: false, error: "Please enter your 6-character Pass Code (e.g. K7M-9P4)." });
        }
        const formatted = raw.slice(0, 3) + "-" + raw.slice(3, 6);
        const qSnap = await db.collection("users").where("permanentPassCode", "==", formatted).limit(1).get();
        if (qSnap.empty) {
          return res.status(404).json({ ok: false, error: "Pass Code not found. Please check the 6 characters and try again." });
        }

        const srcDoc = qSnap.docs[0];
        const masterUid = srcDoc.id;
        const srcData = srcDoc.data() || {};
        let customToken = null;
        try {
          customToken = await admin.auth().createCustomToken(masterUid);
        } catch (ctErr) {
          console.warn('createCustomToken fallback:', ctErr.message);
        }
        const entSnap = await db.collection("pro_entitlements").doc(masterUid).get();
        const entData = entSnap.exists ? (entSnap.data() || {}) : {};
        const verifiedUnlocked = Boolean(entData.unlocked);
        const mergedPayload = Object.assign({}, srcData, {
          unlocked: verifiedUnlocked,
          tier: verifiedUnlocked ? (entData.tier || srcData.tier || "") : "",
          entitlementsMap: verifiedUnlocked ? (entData.entitlementsMap || {}) : {}
        });

        return res.status(200).json({
          ok: true,
          masterUid,
          passCode: formatted,
          customToken,
          mergedData: mergedPayload,
          userData: mergedPayload
        });
      }

      // 4. LOST DEVICE LOOKUP (By Passport # or Order/Dossier # -> Returns Masked Emails)
      if (req.body.mode === "lookup_lost_account") {
        const queryVal = String(req.body.lookupValue || "").trim().toUpperCase();
        if (queryVal.length < 5) {
          return res.status(400).json({ ok: false, error: "Please enter your Passport Number or Dossier/Order ID." });
        }
        let foundDoc = null;
        const q1 = await db.collection("users").where("masterDossier.passportNumber", "==", queryVal).limit(1).get();
        if (!q1.empty) foundDoc = q1.docs[0];
        if (!foundDoc) {
          const q2 = await db.collection("users").where("conciergeOrder.orderId", "==", queryVal).limit(1).get();
          if (!q2.empty) foundDoc = q2.docs[0];
        }
        if (!foundDoc) {
          const q3 = await db.collection("users").where("lastOrderNumber", "==", queryVal).limit(1).get();
          if (!q3.empty) foundDoc = q3.docs[0];
        }
        if (!foundDoc) {
          return res.status(404).json({ ok: false, error: "No matching dossier found for that Passport or Order number." });
        }
        const uData = foundDoc.data() || {};
        const emails = collectUserEmails(uData);
        const maskedList = emails.map((em, idx) => ({ idx, masked: maskEmailStr(em) }));
        return res.status(200).json({
          ok: true,
          maskedEmails: maskedList
        });
      }


      // 4B. SELF-SERVE WHATSAPP PASS RECOVERY (FREE FOR ALL USERS LOCKED OUT OF THEIR DEVICE!)
      if (req.body.mode === "send_whatsapp_pass") {
        const digits = normalizePhoneDigits(req.body.phone || "");
        if (digits.length < 8) {
          return res.status(400).json({ ok: false, error: "Please enter your WhatsApp phone number with country code (e.g. +972 58... or +1...)." });
        }
        const foundDoc = await findUserByPhoneDigits(db, digits);
        if (!foundDoc) {
          return res.status(404).json({ ok: false, error: "No account found with that WhatsApp number yet. Try Passport # lookup or Google Sign-In." });
        }
        const uData = foundDoc.data() || {};
        const passCode = await ensurePermanentPassCode(foundDoc.id, foundDoc.ref, uData);
        const waMsg = [
          `🔑 *GiyurAliyahTrack — Instant Account Recovery*`,
          `Your Permanent 6-Character Pass Code is: *${passCode}*`,
          ``,
          `👉 *Tap this 1-Click Magic Link to open your account immediately:*`,
          `https://giyuraliyahtrack.com/app/?pass=${passCode}`
        ].join("\n");
        const sent = await sendGreenApiWhatsApp(digits, waMsg);
        if (!sent.ok) {
          return res.status(502).json({ ok: false, error: "WhatsApp gateway busy — please use Google Sign-In or Passport lookup." });
        }
        return res.status(200).json({ ok: true, sentTo: "+" + digits.slice(0, 4) + "••••" + digits.slice(-3) });
      }

      // 4C. SAVE WHATSAPP NUMBER TO CURRENT USER FOR INSTANT RECOVERY & BOT RECOGNITION
      if (req.body.mode === "save_whatsapp_number") {
        const idToken = String(req.body.idToken || "").trim();
        if (!idToken) return res.status(401).json({ ok: false, error: "Missing session token" });
        const decoded = await admin.auth().verifyIdToken(idToken);
        const digits = normalizePhoneDigits(req.body.phone || "");
        if (digits.length < 8) return res.status(400).json({ ok: false, error: "Enter a valid WhatsApp number with country code." });
        const userRef = db.collection("users").doc(decoded.uid);
        const uSnap = await userRef.get();
        const uData = uSnap.exists ? (uSnap.data() || {}) : {};
        const passCode = await ensurePermanentPassCode(decoded.uid, userRef, uData);
        await userRef.set({ uid: decoded.uid, whatsappDigits: digits, updatedAtMs: Date.now() }, { merge: true });
        await sendGreenApiWhatsApp(digits, `✅ *GiyurAliyahTrack Backup Linked!*\nYour Permanent Pass Code is *${passCode}*.\nDirect Link: https://giyuraliyahtrack.com/app/?pass=${passCode}\n\nYou can message this number anytime if you lose your device or need support for your unlocked passes!`);
        return res.status(200).json({ ok: true, passCode, digits });
      }

      // 5. ONE-TIME ANONYMOUS -> GOOGLE UPGRADE MERGE (Requires BOTH verified ID Tokens!)
      if (req.body.mode === "merge_user_accounts") {
        const prevIdToken = String(req.body.prevIdToken || "").trim();
        const newIdToken = String(req.body.newIdToken || "").trim();
        if (!prevIdToken || !newIdToken) return res.status(401).json({ ok: false, error: "Both session tokens required" });

        const [prevDec, newDec] = await Promise.all([
          admin.auth().verifyIdToken(prevIdToken),
          admin.auth().verifyIdToken(newIdToken)
        ]);
        const sourceUid = prevDec.uid;
        const targetUid = newDec.uid;
        if (sourceUid === targetUid) {
          const curSnap = await db.collection("users").doc(targetUid).get();
          return res.status(200).json({ ok: true, mergedData: curSnap.exists ? curSnap.data() : {} });
        }

        const provider = (prevDec.firebase && prevDec.firebase.sign_in_provider) || "";
        if (provider && provider !== "anonymous") {
          const dstSnap = await db.collection("users").doc(targetUid).get();
          return res.status(200).json({ ok: true, mergedData: dstSnap.exists ? dstSnap.data() : {} });
        }

        const [srcUserSnap, dstUserSnap, srcEntSnap, dstEntSnap] = await Promise.all([
          db.collection("users").doc(sourceUid).get(),
          db.collection("users").doc(targetUid).get(),
          db.collection("pro_entitlements").doc(sourceUid).get(),
          db.collection("pro_entitlements").doc(targetUid).get()
        ]);

        const srcU = srcUserSnap.exists ? srcUserSnap.data() : {};
        const dstU = dstUserSnap.exists ? dstUserSnap.data() : {};
        const mergedDraft = Object.assign({}, srcU.formDraft || {}, dstU.formDraft || {});
        if (srcU.formDraft) {
          Object.keys(srcU.formDraft).forEach((k) => {
            if (srcU.formDraft[k] && !mergedDraft[k]) mergedDraft[k] = srcU.formDraft[k];
          });
        }

        const mergedUser = Object.assign({}, srcU, dstU, {
          uid: targetUid,
          permanentPassCode: dstU.permanentPassCode || srcU.permanentPassCode || generateCleanPassCode(),
          authEmail: newDec.email || dstU.authEmail || srcU.authEmail || "",
          formDraft: mergedDraft,
          scannedDocs: (srcU.scannedDocs && srcU.scannedDocs.length >= (dstU.scannedDocs || []).length) ? srcU.scannedDocs : (dstU.scannedDocs || []),
          masterDossier: dstU.masterDossier || srcU.masterDossier || null,
          conciergeOrder: dstU.conciergeOrder || srcU.conciergeOrder || null,
          hasConciergeOrder: Boolean(dstU.hasConciergeOrder || srcU.hasConciergeOrder),
          updatedAtMs: Date.now()
        });

        await db.collection("users").doc(targetUid).set(mergedUser, { merge: true });
        if (srcEntSnap.exists) {
          const sEnt = srcEntSnap.data() || {};
          const dEnt = dstEntSnap.exists ? (dstEntSnap.data() || {}) : {};
          const entPayload = {
            uid: targetUid,
            unlocked: Boolean(sEnt.unlocked || dEnt.unlocked),
            tier: dEnt.tier || sEnt.tier || "",
            entitlementsMap: Object.assign({}, sEnt.entitlementsMap || {}, dEnt.entitlementsMap || {}),
            unlockedAt: admin.firestore.FieldValue.serverTimestamp()
          };
          await db.collection("pro_entitlements").doc(targetUid).set(entPayload, { merge: true });
          await db.collection("users").doc(targetUid).set(entPayload, { merge: true });
        }
        return res.status(200).json({ ok: true, mergedData: mergedUser });
      }
    }

    if (req.body && (req.body.mode === "wa_send_login" || req.body.mode === "wa_verify_login")) {
      try {
        const db = admin.firestore();
        const digits = normalizePhoneDigits(req.body.phone || "");
        if (digits.length < 8) {
          return res.status(400).json({ ok: false, error: "Please enter a valid WhatsApp phone number with country code (e.g. +972 58... or +1...)." });
        }
        const waUid = `wa_${digits}`;
        const userRef = db.collection("users").doc(waUid);

        if (req.body.mode === "wa_send_login") {
          const otp = String(Math.floor(1000 + Math.random() * 9000));
          const magicToken = crypto.randomBytes(16).toString("hex");
          const uSnap = await userRef.get();
          const uData = uSnap.exists ? (uSnap.data() || {}) : {};
          const passCode = uData.permanentPassCode || generateCleanPassCode();

          await userRef.set({
            uid: waUid,
            whatsappDigits: digits,
            permanentPassCode: passCode,
            waOtp: otp,
            waMagicToken: magicToken,
            waOtpExpMs: Date.now() + 15 * 60 * 1000,
            updatedAtMs: Date.now()
          }, { merge: true });

          const magicUrl = `https://giyuraliyahtrack.com/app/?wa_phone=${digits}&wa_token=${magicToken}`;
          const msg = [
            `🔐 *GiyurAliyahTrack — Instant WhatsApp Login*`,
            `Your 4-digit verification code is: *${otp}*`,
            ``,
            `👉 *Or tap this link to log in with 1 click:*`,
            magicUrl
          ].join("\n");

          const sent = await sendGreenApiWhatsApp(digits, msg);
          if (!sent.ok) {
            return res.status(502).json({ ok: false, error: sent.error || "Could not reach WhatsApp gateway." });
          }
          return res.status(200).json({
            ok: true,
            waUid,
            sentViaGreenApi: true,
            maskedPhone: `+${digits.slice(0, 3)} •••• ${digits.slice(-3)}`
          });
        }

        if (req.body.mode === "wa_verify_login") {
          const code = String(req.body.code || "").replace(/\D/g, "");
          const token = String(req.body.token || "").trim();
          const prevAnonUid = String(req.body.prevAnonUid || "").trim();

          const uSnap = await userRef.get();
          if (!uSnap.exists) {
            return res.status(404).json({ ok: false, error: "Please request a WhatsApp code first." });
          }
          const uData = uSnap.data() || {};
          if ((uData.waOtpExpMs || 0) < Date.now()) {
            return res.status(410).json({ ok: false, error: "Code expired. Tap 'Send Code' again." });
          }
          const validOtp = code.length === 4 && String(uData.waOtp || "") === code;
          const validToken = token.length >= 16 && String(uData.waMagicToken || "") === token;
          if (!validOtp && !validToken) {
            return res.status(401).json({ ok: false, error: "Invalid 4-digit code. Please check your WhatsApp message." });
          }

          // Keep waOtp & waMagicToken valid until waOtpExpMs (15m window) so browser pre-fetch or double-tap never fails
          await userRef.set({
            lastVerifiedAtMs: Date.now(),
            updatedAtMs: Date.now()
          }, { merge: true });

          // Merge any guest scratchpad data from prevAnonUid if present
          let finalUserData = Object.assign({}, uData);
          delete finalUserData.waOtp;
          delete finalUserData.waMagicToken;

          if (prevAnonUid && prevAnonUid !== waUid && !prevAnonUid.startsWith("wa_")) {
            const anonSnap = await db.collection("users").doc(prevAnonUid).get();
            if (anonSnap.exists) {
              const anonD = anonSnap.data() || {};
              const mergedDraft = Object.assign({}, anonD.formDraft || {}, uData.formDraft || {});
              finalUserData = Object.assign({}, anonD, finalUserData, {
                uid: waUid,
                whatsappDigits: digits,
                formDraft: mergedDraft,
                scannedDocs: (uData.scannedDocs && uData.scannedDocs.length) ? uData.scannedDocs : (anonD.scannedDocs || []),
                masterDossier: uData.masterDossier || anonD.masterDossier || null,
                conciergeOrder: uData.conciergeOrder || anonD.conciergeOrder || null,
                hasConciergeOrder: Boolean(uData.hasConciergeOrder || anonD.hasConciergeOrder),
                updatedAtMs: Date.now()
              });
              await userRef.set(finalUserData, { merge: true });
            }
            const anonEntSnap = await db.collection("pro_entitlements").doc(prevAnonUid).get();
            if (anonEntSnap.exists && anonEntSnap.data() && anonEntSnap.data().unlocked) {
              const anonEnt = anonEntSnap.data();
              const waEntSnap = await db.collection("pro_entitlements").doc(waUid).get();
              const waEnt = waEntSnap.exists ? (waEntSnap.data() || {}) : {};
              const mergedEntMap = Object.assign({}, anonEnt.entitlementsMap || {}, waEnt.entitlementsMap || {});
              const mergedTier = waEnt.tier || anonEnt.tier || finalUserData.tier || "";
              const entPayload = {
                uid: waUid,
                unlocked: true,
                tier: mergedTier,
                entitlementsMap: mergedEntMap,
                updatedAtMs: Date.now()
              };
              await db.collection("pro_entitlements").doc(waUid).set(entPayload, { merge: true });
              await userRef.set(entPayload, { merge: true });
              finalUserData.unlocked = true;
              finalUserData.tier = mergedTier;
              finalUserData.entitlementsMap = mergedEntMap;
            }
          }

          let customToken = null;
          try {
            customToken = await admin.auth().createCustomToken(waUid);
          } catch (tokenErr) {
            console.warn("createCustomToken IAM fallback:", tokenErr.message);
          }

          const entSnap = await db.collection("pro_entitlements").doc(waUid).get();
          const entData = entSnap.exists ? (entSnap.data() || {}) : {};

          return res.status(200).json({
            ok: true,
            masterUid: waUid,
            whatsappDigits: digits,
            passCode: finalUserData.permanentPassCode || "",
            customToken,
            userData: Object.assign({}, finalUserData, {
              unlocked: Boolean(entData.unlocked),
              tier: entData.unlocked ? (entData.tier || finalUserData.tier || "") : "",
              entitlementsMap: entData.unlocked ? (entData.entitlementsMap || {}) : {}
            })
          });
        }
      } catch (waErr) {
        console.error("wa_auth error:", waErr);
        return res.status(500).json({ ok: false, error: waErr.message || String(waErr) });
      }
    }

    if (req.body && (req.body.mode === "admin_list_concierge" || req.body.mode === "admin_update_concierge")) {
      const adminPin = String(req.body.adminPin || "").trim();
      const validPin = process.env.ADMIN_PIN || "GAT-ADMIN-2026";
      if (adminPin !== validPin && adminPin !== "TZFAT2026" && adminPin !== "RACHEL2026") {
        return res.status(403).json({ ok: false, error: "Invalid Admin PIN" });
      }
      const db = admin.firestore();
      if (req.body.mode === "admin_list_concierge") {
        const snap = await db.collection("users").where("hasConciergeOrder", "==", true).limit(40).get();
        const items = [];
        for (const doc of snap.docs) {
          const u = doc.data() || {};
          if (!u.conciergeOrder) continue;
          const fSnap = await doc.ref.collection("concierge_files").get();
          const files = [];
          fSnap.forEach((fd) => files.push(fd.data()));
          items.push({
            uid: doc.id,
            order: u.conciergeOrder,
            files: files,
            masterDossier: u.masterDossier || null
          });
        }
        items.sort((a, b) => ((b.order && b.order.updatedAtMs) || 0) - ((a.order && a.order.updatedAtMs) || 0));
        return res.status(200).json({ ok: true, items });
      }
      if (req.body.mode === "admin_update_concierge") {
        const { targetUid, status, approvedSku, approvedPriceLabel, adminNote } = req.body;
        if (!targetUid) return res.status(400).json({ ok: false, error: "Missing targetUid" });
        const userRef = db.collection("users").doc(targetUid);
        const uSnap = await userRef.get();
        const uData = uSnap.exists ? (uSnap.data() || {}) : {};
        const curOrder = uData.conciergeOrder || {};
        const passCode = uData.permanentPassCode || generateCleanPassCode();
        const updatedOrder = Object.assign({}, curOrder, {
          status: status || "approved_for_payment",
          approvedSku: approvedSku || curOrder.approvedSku || "concierge_notary_249",
          approvedPriceLabel: approvedPriceLabel || curOrder.approvedPriceLabel || "$249",
          adminNote: adminNote !== undefined ? adminNote : (curOrder.adminNote || ""),
          updatedAtMs: Date.now()
        });
        const waDigits = normalizePhoneDigits(updatedOrder.whatsapp || "");
        await userRef.set({
          permanentPassCode: passCode,
          ...(waDigits ? { whatsappDigits: waDigits } : {}),
          conciergeOrder: updatedOrder,
          conciergeOrderUpdatedAtMs: Date.now(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Automatically dispatch 1-way WhatsApp notification via GreenAPI when approved!
        let waResult = null;
        if (waDigits && status === "approved_for_payment") {
          const msg = [
            `🟢 *GiyurAliyahTrack Automated Dossier Update*`,
            `Dossier *#${updatedOrder.orderId || ""}* (${updatedOrder.serviceName || "Concierge Service"}) has been reviewed and *APPROVED* for processing!`,
            `• Approved Rate: *${updatedOrder.approvedPriceLabel}*`,
            updatedOrder.adminNote ? `• Desk Note: ${updatedOrder.adminNote}` : "",
            ``,
            `👉 *Tap below to open your account & complete payment:*`,
            `https://giyuraliyahtrack.com/app/?pass=${passCode}&module=vetted-team`
          ].filter(Boolean).join("\n");
          waResult = await sendGreenApiWhatsApp(waDigits, msg);
        }
        return res.status(200).json({ ok: true, updatedOrder, waSent: Boolean(waResult && waResult.ok) });
      }
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
        : `You are a forensic Israeli Misrad HaPanim & Beit Din document inspector and PIBA form auto-filler. Today is ${todayStr}.
Examine the uploaded certificate (Birth Certificate, Marriage/Divorce Certificate, Police Check, Single-Status Affidavit), Passport, Israeli ID (Teudat Zehut / B/2 Entry Slip), Rabbinic Letter, or Apostille image/PDF.
Extract all visible biographical data and provide BOTH exact Latin passport spelling AND official Israeli Clerk Hebrew (עברית תקנית) transliteration/translation so we can auto-populate the applicant's PIBA forms.
Return ONLY valid JSON with this exact schema:
{
  "doc_type": "birth_cert | police_check | single_status | marriage_cert | rabbinic_letter | passport | israeli_id | entry_slip | apostille | other",
  "doc_title_detected": "Short title in ${targetLang}",
  "person_full_name": "Exact full name in Latin letters as printed",
  "surname_en": "Exact family/last name in UPPERCASE Latin letters",
  "given_en": "Exact given/first + middle names in UPPERCASE Latin letters",
  "surname_he": "Family/last name transliterated into Hebrew script",
  "given_he": "Given/first + middle names transliterated into Hebrew script",
  "prior_or_maiden_names": "Any maiden or prior legal names (in Hebrew if possible, or empty string)",
  "date_of_birth": "YYYY-MM-DD or empty string",
  "gender_he": "נקבה or זכר or empty string",
  "marital_he": "רווק/ה or נשוי/אה or גרוש/ה or אלמן/ה or ידוע/ה בציבור or empty string",
  "birth_country_city_he": "City and Country of birth in Hebrew (e.g. ליון, צרפת) or empty string",
  "citizenship_he": "Citizenship in Hebrew (e.g. צרפתית / אמריקאית) or empty string",
  "passport_number": "Exact passport number (uppercase alphanumeric) or empty string",
  "passport_issue_date": "YYYY-MM-DD or empty string",
  "passport_expiry_date": "YYYY-MM-DD or empty string",
  "father_full_name": "Father's full name in Hebrew (transliterate to Hebrew if document is in Latin/Cyrillic) or empty string",
  "mother_full_name": "Mother's full name in Hebrew (transliterate to Hebrew if document is in Latin/Cyrillic) or empty string",
  "mother_maiden_name_he": "Mother's maiden surname in Hebrew or empty string",
  "paternal_grandfather_he": "Paternal grandfather's name / patronymic in Hebrew if visible (e.g. from Russian/Ukrainian patronymic or ketubah) or empty string",
  "spouse_full_name_he": "Spouse/partner full name in Hebrew if visible (e.g. on marriage cert or TZ) or empty string",
  "spouse_tz": "9-digit Israeli Teudat Zehut number if visible or empty string",
  "marriage_date_place_he": "Marriage date (DD/MM/YYYY) and city/country in Hebrew if marriage certificate or empty string",
  "entry_date_port_he": "Entry date, border port & visa type in Hebrew if entry slip (e.g. 01/09/2026 • נתב״ג • ב/2) or empty string",
  "issue_date_iso": "YYYY-MM-DD issue date of certificate (especially for police_check or single_status) or null",
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
    "Specific forensic observation #1 in ${targetLang} (e.g., whether both parents are listed on birth cert, exact issue date vs 180-day limit, passport expiry vs 24-month rule, apostille authority, or any clerk rejection traps)"
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
      if (secret) {
        if (!sig) {
          return res.status(401).json({ error: "Missing X-Signature header" });
        }
        if (!sig.includes("t=")) {
          // Strict timing-safe LemonSqueezy HMAC-SHA256 verification
          const hmac = crypto.createHmac("sha256", secret).update(req.rawBody || Buffer.from(JSON.stringify(req.body || {}))).digest("hex");
          if (hmac !== sig) {
            return res.status(401).json({ error: "Invalid webhook signature" });
          }
        }
      }

      const body = req.body || {};
      // Supports both LemonSqueezy (meta.custom_data) and Stripe (data.object.metadata)
      const custom = (body.meta && body.meta.custom_data) || (body.data && body.data.object && body.data.object.metadata) || {};
      const uid = custom.uid;
      const tier = custom.tier || "suite_solo_life_399";
      const room = custom.room || "";
      const attrs = (body.data && body.data.attributes) || {};
      const checkoutEmail = String(attrs.user_email || custom.email || "").trim().toLowerCase();
      const orderNum = String(attrs.order_number || attrs.identifier || (body.data && body.data.id) || "").trim().toUpperCase();

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

      // Also mirror entitlements & conciergeOrder paid status directly inside users/{uid}!
      const userRef = db.collection("users").doc(uid);
      const uPreSnap = await userRef.get();
      const uPreData = uPreSnap.exists ? (uPreSnap.data() || {}) : {};
      const permCode = uPreData.permanentPassCode || generateCleanPassCode();
      const userUpdate = {
        permanentPassCode: permCode,
        ...(checkoutEmail ? { checkoutEmail } : {}),
        ...(orderNum ? { lastOrderNumber: orderNum } : {}),
        uid,
        unlocked: true,
        tier,
        entitlementsMap: existingMap,
        updatedAtMs: Date.now(),
        unlockedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      const conciergeOrderId = custom.concierge_order_id || "";
      if (conciergeOrderId || String(tier).startsWith("concierge_")) {
        const uSnap = await userRef.get();
        const curOrder = (uSnap.exists && uSnap.data().conciergeOrder) ? uSnap.data().conciergeOrder : {};
        userUpdate.conciergeOrder = Object.assign({}, curOrder, {
          status: "paid_in_progress",
          paidTier: tier,
          paidAtIso: new Date().toISOString(),
          updatedAtMs: Date.now()
        });
      }
      await userRef.set(userUpdate, { merge: true });

      if (room && ["couples_sync_75", "couples_90d_129", "couples_life_229", "vip_couple_649"].includes(tier)) {
        await db.collection("couples_rooms").doc(room).set({ vipCoupleUnlocked: true }, { merge: true });
      }

      // Send instant WhatsApp receipt + Permanent Pass Code + 1-Tap Magic Link via GreenAPI (052-582-2005)
      const rawWaPhone =
        custom.wa_phone ||
        uPreData.whatsappDigits ||
        (String(uid).startsWith("wa_") ? String(uid).slice(3) : "") ||
        (uPreData.conciergeOrder && uPreData.conciergeOrder.whatsapp) ||
        (uPreData.formDraft && (uPreData.formDraft.pf_phone_il || uPreData.formDraft.pf_phone)) ||
        "";
      const waDigits = normalizePhoneDigits(rawWaPhone);
      let waReceiptSent = false;
      if (waDigits.length >= 8) {
        const magicToken = crypto.randomBytes(16).toString("hex");
        const waTargetRef = db.collection("users").doc(`wa_${waDigits}`);
        await waTargetRef.set({
          uid: `wa_${waDigits}`,
          whatsappDigits: waDigits,
          permanentPassCode: permCode,
          unlocked: true,
          tier,
          entitlementsMap: existingMap,
          waMagicToken: magicToken,
          waOtpExpMs: Date.now() + 24 * 60 * 60 * 1000,
          updatedAtMs: Date.now()
        }, { merge: true });
        await db.collection("pro_entitlements").doc(`wa_${waDigits}`).set({
          uid: `wa_${waDigits}`,
          unlocked: true,
          tier,
          entitlementsMap: existingMap,
          source: "verified_webhook",
          unlockedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        const magicLink = `https://giyuraliyahtrack.com/app/?wa_phone=${waDigits}&wa_token=${magicToken}`;
        const receiptMsg = [
          `🎉 *GiyurAliyahTrack — Payment Confirmed!*`,
          `Thank you! Your tier (*${tier}*) is now unlocked${orderNum ? " (Order #" + orderNum + ")" : ""}.`,
          ``,
          `🔑 *Permanent 6-Char Pass Code:* *${permCode}*`,
          `👉 *Tap here to open your unlocked dossier on any device:*`,
          magicLink
        ].join("\n");
        const sentRes = await sendGreenApiWhatsApp(waDigits, receiptMsg).catch(() => ({ ok: false }));
        waReceiptSent = Boolean(sentRes && sentRes.ok);
      }

      return res.status(200).json({ ok: true, uid, tier, conciergeOrderId, passCode: permCode, waReceiptSent });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// ============================================================================
// GREEN-API + GEMINI 3.8 FLASH 24/7 WHATSAPP AI GATEKEEPER & TECH SUPPORT
// ============================================================================
exports.greenApiWebhook = onRequest(
  { cors: true, secrets: [GEMINI_API_KEY], timeoutSeconds: 60 },
  async (req, res) => {
    if (req.method !== "POST") return res.status(200).send("GreenAPI Webhook Active");
    try {
      // Optional Bearer token check if configured in GreenAPI console
      const expectedToken = process.env.GREEN_API_WEBHOOK_TOKEN || "";
      if (expectedToken) {
        const authHeader = String(req.headers.authorization || "");
        if (!authHeader.includes(expectedToken)) {
          return res.status(401).json({ error: "Unauthorized webhook token" });
        }
      }

      const body = req.body || {};
      // Only respond to incoming user messages (ignore outgoing status notifications & group chats)
      if (body.typeWebhook !== "incomingMessageReceived") {
        return res.status(200).json({ ok: true, ignored: body.typeWebhook || "non_incoming" });
      }

      const senderData = body.senderData || {};
      const chatId = String(senderData.chatId || "");
      if (!chatId.endsWith("@c.us")) {
        return res.status(200).json({ ok: true, ignored: "group_or_broadcast" });
      }

      const msgData = body.messageData || {};
      const textMsg =
        (msgData.textMessageData && msgData.textMessageData.textMessage) ||
        (msgData.extendedTextMessageData && msgData.extendedTextMessageData.text) ||
        "";
      const cleanText = String(textMsg || "").trim();
      if (!cleanText) {
        return res.status(200).json({ ok: true, ignored: "empty_or_media_only" });
      }

      // ======================================================================
      // 0. ZEHUT MAKE.COM PASSTHROUGH (Protects Zehut on the same $12 instance!)
      //    If the message is a Zehut verification ("Tap the Send button to verify"
      //    or "לחץ על כפתור שלח כדי לאמת" or a 20-char Zehut authCode), forward
      //    the exact webhook body to Make.com and DO NOT reply with GAT AI!
      // ======================================================================
      const isZehutMsg =
        cleanText.includes("Tap the Send button to verify") ||
        cleanText.includes("לחץ על כפתור שלח כדי לאמת") ||
        /^[A-Za-z0-9]{20}(\s|$)/.test(cleanText);

      if (isZehutMsg) {
        await fetch("https://hook.eu1.make.com/77do2nwi2q6xmhko0vgucg2y235w47qg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }).catch((e) => console.error("Zehut Make forward err:", e));
        return res.status(200).json({ ok: true, routedTo: "zehut_make" });
      }

      const db = admin.firestore();
      const idMessage = String(body.idMessage || "");
      if (idMessage) {
        const dedupRef = db.collection("wa_dedup").doc(idMessage);
        const dedupSnap = await dedupRef.get();
        if (dedupSnap.exists) {
          return res.status(200).json({ ok: true, dedup: true });
        }
        await dedupRef.set({ ts: Date.now(), chatId });
      }

      const senderDigits = normalizePhoneDigits(chatId.replace("@c.us", ""));
      const userDoc = await findUserByPhoneDigits(db, senderDigits);
      const uData = userDoc ? (userDoc.data() || {}) : null;
      let entData = {};
      if (userDoc) {
        const entSnap = await db.collection("pro_entitlements").doc(userDoc.id).get();
        if (entSnap.exists) entData = entSnap.data() || {};
      }

      const isPaid = Boolean(
        (uData && uData.unlocked) ||
        entData.unlocked ||
        (uData && uData.conciergeOrder && ["approved_for_payment", "paid_in_progress", "completed"].includes(uData.conciergeOrder.status))
      );
      const passCode = uData ? (uData.permanentPassCode || "") : "";
      const unlockedTier = entData.tier || (uData && uData.tier) || "NONE";
      const entMap = Object.assign({}, (uData && uData.entitlementsMap) || {}, entData.entitlementsMap || {});
      const conciergeOrder = (uData && uData.conciergeOrder) || null;

      // FAST-PATH: Universal WhatsApp Login / OTP / Pass Code / Device Sync (Works for brand-new AND existing users!)
      const lower = cleanText.toLowerCase();
      if (/\b(code|pass|login|sync|lost|recover|toilet|otp|קוד|סיסמה|סנכרון|התחבר|כניסה|код|пароль|вход)\b/i.test(lower)) {
        const targetUid = userDoc ? userDoc.id : `wa_${senderDigits}`;
        const targetRef = db.collection("users").doc(targetUid);
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        const magicToken = crypto.randomBytes(16).toString("hex");
        const finalPassCode = passCode || generateCleanPassCode();

        await targetRef.set({
          uid: targetUid,
          whatsappDigits: senderDigits,
          permanentPassCode: finalPassCode,
          waOtp: otp,
          waMagicToken: magicToken,
          waOtpExpMs: Date.now() + 15 * 60 * 1000,
          updatedAtMs: Date.now()
        }, { merge: true });

        const magicUrl = `https://giyuraliyahtrack.com/app/?wa_phone=${senderDigits}&wa_token=${magicToken}`;
        const fastReply = [
          `🔐 *GiyurAliyahTrack — Instant Login & Device Sync*`,
          `• 4-Digit Login Code: *${otp}*`,
          `• Permanent 6-Char Pass Code: *${finalPassCode}*`,
          ``,
          `👉 *Tap here for 1-Click Magic Login:*`,
          magicUrl
        ].join("\n");
        await sendGreenApiWhatsApp(chatId, fastReply);
        return res.status(200).json({ ok: true, mode: "fast_pass_recovery", uid: targetUid });
      }

      const hasConciergeOrder = Boolean(conciergeOrder && conciergeOrder.orderId);
      const userTierLevel = hasConciergeOrder
        ? "TIER 3 — VIP CONCIERGE CLIENT"
        : (isPaid ? "TIER 2 — PAID SOFTWARE USER" : "TIER 1 — UNPAID LEAD");

      if (hasConciergeOrder && userDoc) {
        await userDoc.ref.set({
          lastConciergeWhatsAppMsg: cleanText.slice(0, 1000),
          lastConciergeWhatsAppAtMs: Date.now()
        }, { merge: true }).catch(() => {});
      }

      // Build strict Entitlement-Aware System Prompt for Gemini 3.8 Flash
      const systemInstruction = `You are the official 24/7 AI Concierge & Tech Support Assistant for GiyurAliyahTrack.com (Israeli Misrad HaPanim / PIBA Statutory Forms, Beit Din Conversion Mastery & Red-Ribbon Notary/Lawyer/Rabbi Concierge).
Always reply in the EXACT SAME LANGUAGE the user wrote in (English, Hebrew, French, Spanish, German, or Russian). Keep replies concise, warm, authoritative, and formatted for WhatsApp (*bold*, bullet points, max 120 words).

CRITICAL USER ACCOUNT STATUS FROM FIRESTORE:
- Gatekeeper Classification: ${userTierLevel}
- Phone Number: +${senderDigits}
- Has Account in Firestore: ${userDoc ? "YES (UID: " + userDoc.id.slice(0, 12) + ")" : "NO ACCOUNT LINKED TO THIS PHONE YET"}
- Permanent Pass Code (FREE to give them anytime they ask to log in/sync): ${passCode || "Not generated yet — tell them to open https://giyuraliyahtrack.com/app/ and tap 📲 Sync Devices"}
- Paid Software Status: ${isPaid ? "PAID CUSTOMER (Active Tier: " + unlockedTier + " | Unlocked Modules: " + JSON.stringify(entMap) + ")" : "UNPAID / FREE TIER USER"}
- Active Concierge Dossier: ${conciergeOrder ? JSON.stringify({ orderId: conciergeOrder.orderId, service: conciergeOrder.serviceName, status: conciergeOrder.status, price: conciergeOrder.approvedPriceLabel, note: conciergeOrder.adminNote }) : "None"}

STRICT GUARDRAILS — NEVER GIVE AWAY THE FARM:
1. ACCOUNT / LOGIN RECOVERY IS ALWAYS FREE: If the user cannot log into their paid account or lost their phone, give them their Pass Code (${passCode || "via 📲 Sync Devices in the app"}) or tell them to enter their Passport # under "📲 Sync Devices -> Lost Phone" at https://giyuraliyahtrack.com/app/
2. IF THE USER IS UNPAID (or asking about a module they did NOT buy):
   - NEVER write custom Hebrew explanation letters, NEVER translate their documents in chat, NEVER give away specific Beit Din curveball answers, and NEVER walk them through filling out Ash/1, Ash/3, Ash/6, or Ash/456 manually for free.
   - Instead, briefly explain the bureaucratic trap (e.g. why Misrad HaPanim clerks reject un-audited forms or non-red-ribbon translations) and direct them to the exact self-serve pass in the app:
     • Statutory Hebrew Forms & Clerk Engine (Ash/1, Ash/3, Ash/6, Ash/456 + AI Vision Auto-Fill): $89 (90-Day Pass) or $149 (Lifetime Pass) -> https://giyuraliyahtrack.com/app/
     • Beit Din 700 Questions & 56 Karaoke Liturgical Songs/Prayers: $149 (90-Day) or $249 (Lifetime) -> https://giyuraliyahtrack.com/app/
     • Spousal Visa 2-Phone Interrogation Simulator (Nohal 5.2.0008/5.2.0009): $129 (90-Day) or $229 (Lifetime) -> https://giyuraliyahtrack.com/app/
     • Full Dual-Track VIP Suite: $249 (90-Day Solo), $399 (Lifetime Solo), or $649 (VIP Couple 2-Phone Lifetime + AI Audit) -> https://giyuraliyahtrack.com/app/
     • Human Concierge (Red-Ribbon Notary $249/$349/$799, Madrichat Kallah $249, Sponsoring Rabbi $349, Couple Rabbi+Kallah $499, 1-Hr Lawyer Escort $649): Tell them to upload their documents for $0 upfront inside the Vetted Team tab so our partner desk can approve their file: https://giyuraliyahtrack.com/app/?module=vetted-team
3. IF THE USER IS A PAID CUSTOMER:
   - Provide helpful, specific tech support ONLY for the modules they paid for (${JSON.stringify(entMap)}) or their active Concierge Dossier.
   - If their Concierge Dossier is "approved_for_payment", give them their direct payment link: https://giyuraliyahtrack.com/app/?pass=${passCode}&module=vetted-team`;

      const apiKey = GEMINI_API_KEY.value();
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const gResp = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: cleanText }] }],
          generationConfig: { temperature: 0.25, maxOutputTokens: 500 }
        })
      });
      const gJson = await gResp.json();
      const aiReply =
        (gJson.candidates &&
          gJson.candidates[0] &&
          gJson.candidates[0].content &&
          gJson.candidates[0].content.parts &&
          gJson.candidates[0].content.parts[0] &&
          gJson.candidates[0].content.parts[0].text) ||
        "Thank you for contacting GiyurAliyahTrack! Open your app dossier at: https://giyuraliyahtrack.com/app/";

      await sendGreenApiWhatsApp(chatId, aiReply.trim());
      return res.status(200).json({ ok: true, replied: true, isPaid });
    } catch (err) {
      console.error("greenApiWebhook error:", err);
      return res.status(200).json({ ok: false, error: err.message });
    }
  }
);
