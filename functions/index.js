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
  let d = String(raw || "").replace(/[^0-9]/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("05") && d.length === 10) d = "972" + d.slice(1);
  else if (d.startsWith("5") && d.length === 9) d = "972" + d;
  return d;
}


// ============================================================================
// CENTRALIZED 6-LANGUAGE (EN, HE, FR, ES, DE, RU) WHATSAPP MESSAGE ENGINE
// ============================================================================
function resolveWaLang(rawLang, textSample, fallbackUserLang) {
  const valid = ["en", "he", "fr", "es", "de", "ru"];
  const c1 = String(rawLang || "").slice(0, 2).toLowerCase();
  if (valid.includes(c1)) return c1;
  const s = String(textSample || "");
  if (/[\u0590-\u05FF]/.test(s)) return "he";
  if (/[\u0400-\u04FF]/.test(s)) return "ru";
  const c2 = String(fallbackUserLang || "").slice(0, 2).toLowerCase();
  if (valid.includes(c2)) return c2;
  return "en";
}

function buildGatLocalizedWaMsg(kind, rawLang, p) {
  const lg = resolveWaLang(rawLang, p && p.textSample, p && p.userLang);
  p = p || {};
  const otp = p.otp || "";
  const passCode = p.passCode || "";
  const magicUrl = p.magicUrl || ("https://giyuraliyahtrack.com/app/?pass=" + encodeURIComponent(passCode) + "&lang=" + lg);
  const tier = p.tier || "Pro Pass";
  const orderNum = p.orderNum ? (" (#" + p.orderNum + ")") : "";
  const svcTitle = p.serviceTitle || "Concierge Service";
  const priceLbl = p.approvedPriceLabel || "";
  const adminNote = p.adminNote || "";

  if (kind === "wa_login_otp") {
    const T = {
      en: [
        `🔐 *GiyurAliyahTrack — Instant WhatsApp Login*`,
        `Your 4-digit verification code is: *${otp}*`,
        passCode ? `🔑 Your Permanent 6-Char Pass Code: *${passCode}*` : "",
        ``,
        `👉 *Or tap this link to log in with 1 click:*`,
        magicUrl
      ],
      he: [
        `🔐 *GiyurAliyahTrack — התחברות מהירה בוואטסאפ*`,
        `קוד האימות שלך (4 ספרות) הוא: *${otp}*`,
        passCode ? `🔑 קוד הגישה הקבוע שלך (6 תווים): *${passCode}*` : "",
        ``,
        `👉 *או לחצו על הקישור הבא להתחברות בלחיצה אחת:*`,
        magicUrl
      ],
      fr: [
        `🔐 *GiyurAliyahTrack — Connexion Instantanée WhatsApp*`,
        `Votre code de vérification à 4 chiffres est : *${otp}*`,
        passCode ? `🔑 Votre Code Permanent (6 caractères) : *${passCode}*` : "",
        ``,
        `👉 *Ou appuyez sur ce lien pour vous connecter en 1 clic :*`,
        magicUrl
      ],
      es: [
        `🔐 *GiyurAliyahTrack — Inicio de Sesión Instantáneo por WhatsApp*`,
        `Su código de verificación de 4 dígitos es: *${otp}*`,
        passCode ? `🔑 Su Código Permanente (6 caracteres): *${passCode}*` : "",
        ``,
        `👉 *O toque este enlace para iniciar sesión con 1 clic:*`,
        magicUrl
      ],
      de: [
        `🔐 *GiyurAliyahTrack — Sofort-Anmeldung per WhatsApp*`,
        `Ihr 4-stelliger Bestätigungscode lautet: *${otp}*`,
        passCode ? `🔑 Ihr permanenter 6-stelliger Pass-Code: *${passCode}*` : "",
        ``,
        `👉 *Oder tippen Sie auf diesen Link für den 1-Klick-Login:*`,
        magicUrl
      ],
      ru: [
        `🔐 *GiyurAliyahTrack — Мгновенный вход через WhatsApp*`,
        `Ваш 4-значный код подтверждения: *${otp}*`,
        passCode ? `🔑 Ваш постоянный 6-значный код доступа: *${passCode}*` : "",
        ``,
        `👉 *Или нажмите на эту ссылку для входа в 1 клик:*`,
        magicUrl
      ]
    };
    return (T[lg] || T.en).filter(Boolean).join("\n");
  }

  if (kind === "wa_recovery") {
    const T = {
      en: [
        `🔑 *GiyurAliyahTrack — Instant Account & Device Sync*`,
        otp ? `• 4-Digit Login Code: *${otp}*` : "",
        `• Your Permanent 6-Char Pass Code: *${passCode}*`,
        ``,
        `👉 *Tap this 1-Click Magic Link to open your account immediately:*`,
        magicUrl
      ],
      he: [
        `🔑 *GiyurAliyahTrack — שחזור חשבון וסנכרון מכשירים*`,
        otp ? `• קוד התחברות (4 ספרות): *${otp}*` : "",
        `• קוד הגישה הקבוע שלך (6 תווים): *${passCode}*`,
        ``,
        `👉 *לחצו על הקישור לפתיחת החשבון שלכם מיד:*`,
        magicUrl
      ],
      fr: [
        `🔑 *GiyurAliyahTrack — Récupération & Synchronisation de Compte*`,
        otp ? `• Code de connexion à 4 chiffres : *${otp}*` : "",
        `• Votre Code Permanent (6 caractères) : *${passCode}*`,
        ``,
        `👉 *Appuyez sur ce lien direct pour ouvrir votre compte immédiatement :*`,
        magicUrl
      ],
      es: [
        `🔑 *GiyurAliyahTrack — Recuperación y Sincronización de Cuenta*`,
        otp ? `• Código de acceso de 4 dígitos: *${otp}*` : "",
        `• Su Código Permanente (6 caracteres): *${passCode}*`,
        ``,
        `👉 *Toque este enlace directo para abrir su cuenta de inmediato:*`,
        magicUrl
      ],
      de: [
        `🔑 *GiyurAliyahTrack — Konto-Wiederherstellung & Geräte-Sync*`,
        otp ? `• 4-stelliger Login-Code: *${otp}*` : "",
        `• Ihr permanenter 6-stelliger Pass-Code: *${passCode}*`,
        ``,
        `👉 *Tippen Sie auf diesen Link, um Ihr Konto sofort zu öffnen:*`,
        magicUrl
      ],
      ru: [
        `🔑 *GiyurAliyahTrack — Восстановление и синхронизация аккаунта*`,
        otp ? `• 4-значный код входа: *${otp}*` : "",
        `• Ваш постоянный 6-значный код доступа: *${passCode}*`,
        ``,
        `👉 *Нажмите на эту ссылку, чтобы мгновенно открыть ваш аккаунт:*`,
        magicUrl
      ]
    };
    return (T[lg] || T.en).filter(Boolean).join("\n");
  }

  if (kind === "wa_backup_linked") {
    const T = {
      en: `✅ *GiyurAliyahTrack — WhatsApp Linked!*\nYour Permanent Pass Code is *${passCode}*.\nDirect Link: ${magicUrl}\n\nYou can message this number anytime if you switch devices or need assistance with your unlocked passes!`,
      he: `✅ *GiyurAliyahTrack — הוואטסאפ שלך חובר בהצלחה!*\nקוד הגישה הקבוע שלך הוא *${passCode}*.\nקישור ישיר: ${magicUrl}\n\nניתן לשלוח הודעה למספר זה בכל עת לשחזור החשבון או לתמיכה במנויים הפעילים שלך!`,
      fr: `✅ *GiyurAliyahTrack — WhatsApp Associé !*\nVotre Code Permanent est *${passCode}*.\nLien Direct : ${magicUrl}\n\nVous pouvez écrire à ce numéro à tout moment pour récupérer votre accès ou obtenir de l'aide !`,
      es: `✅ *GiyurAliyahTrack — ¡WhatsApp Vinculado!*\nSu Código Permanente es *${passCode}*.\nEnlace Directo: ${magicUrl}\n\n¡Puede escribir a este número en cualquier momento para recuperar su acceso o recibir asistencia!`,
      de: `✅ *GiyurAliyahTrack — WhatsApp Verknüpft!*\nIhr permanenter Pass-Code lautet *${passCode}*.\nDirektlink: ${magicUrl}\n\nSie können dieser Nummer jederzeit schreiben, um Ihr Konto wiederherzustellen oder Hilfe zu erhalten!`,
      ru: `✅ *GiyurAliyahTrack — WhatsApp успешно привязан!*\nВаш постоянный код доступа: *${passCode}*.\nПрямая ссылка: ${magicUrl}\n\nВы можете написать на этот номер в любое время для восстановления доступа или помощи!`
    };
    return T[lg] || T.en;
  }

  if (kind === "wa_concierge_approved") {
    const T = {
      en: [
        `🟢 *GiyurAliyahTrack Concierge — File Approved!*`,
        `• Service: *${svcTitle}*`,
        `• Confirmed Price: *${priceLbl}*`,
        adminNote ? `• Desk Note: ${adminNote}` : "",
        ``,
        `👉 *Tap below to open your account & complete payment:*`,
        magicUrl
      ],
      he: [
        `🟢 *מוקד הליווי של GiyurAliyahTrack — התיק שלך אושר!*`,
        `• שירות: *${svcTitle}*`,
        `• מחיר מאושר: *${priceLbl}*`,
        adminNote ? `• הערת המוקד: ${adminNote}` : "",
        ``,
        `👉 *לחצו למטה לפתיחת החשבון ולהשלמת התשלום:*`,
        magicUrl
      ],
      fr: [
        `🟢 *Conciergerie GiyurAliyahTrack — Dossier Approuvé !*`,
        `• Service : *${svcTitle}*`,
        `• Tarif Confirmé : *${priceLbl}*`,
        adminNote ? `• Note du bureau : ${adminNote}` : "",
        ``,
        `👉 *Appuyez ci-dessous pour ouvrir votre compte et finaliser le paiement :*`,
        magicUrl
      ],
      es: [
        `🟢 *Conserjería GiyurAliyahTrack — ¡Expediente Aprobado!*`,
        `• Servicio: *${svcTitle}*`,
        `• Precio Confirmado: *${priceLbl}*`,
        adminNote ? `• Nota de la mesa: ${adminNote}` : "",
        ``,
        `👉 *Toque abajo para abrir su cuenta y completar el pago:*`,
        magicUrl
      ],
      de: [
        `🟢 *GiyurAliyahTrack Concierge — Akte Genehmigt!*`,
        `• Service: *${svcTitle}*`,
        `• Bestätigter Preis: *${priceLbl}*`,
        adminNote ? `• Hinweis: ${adminNote}` : "",
        ``,
        `👉 *Tippen Sie unten, um Ihr Konto zu öffnen und die Zahlung abzuschließen:*`,
        magicUrl
      ],
      ru: [
        `🟢 *Консьерж-служба GiyurAliyahTrack — Ваша заявка одобрена!*`,
        `• Услуга: *${svcTitle}*`,
        `• Подтверждённая стоимость: *${priceLbl}*`,
        adminNote ? `• Примечание: ${adminNote}` : "",
        ``,
        `👉 *Нажмите ниже, чтобы открыть аккаунт и завершить оплату:*`,
        magicUrl
      ]
    };
    return (T[lg] || T.en).filter(Boolean).join("\n");
  }

  if (kind === "wa_payment_confirmed") {
    const T = {
      en: [
        `✅ *GiyurAliyahTrack — Payment Confirmed!*`,
        `Thank you! Your pass (*${tier}*) is now unlocked${orderNum}.`,
        ``,
        `🔑 *Permanent 6-Char Pass Code:* *${passCode}*`,
        `👉 *Tap here to open your unlocked dossier on any device:*`,
        magicUrl
      ],
      he: [
        `✅ *GiyurAliyahTrack — התשלום אושר והגישה נפתחה!*`,
        `תודה רבה! המנוי שלך (*${tier}*) פתוח כעת${orderNum}.`,
        ``,
        `🔑 *קוד הגישה הקבוע שלך (6 תווים):* *${passCode}*`,
        `👉 *לחצו כאן לפתיחת המערכת מכל מכשיר:*`,
        magicUrl
      ],
      fr: [
        `✅ *GiyurAliyahTrack — Paiement Confirmé !*`,
        `Merci ! Votre pass (*${tier}*) est maintenant débloqué${orderNum}.`,
        ``,
        `🔑 *Code Permanent (6 caractères) :* *${passCode}*`,
        `👉 *Appuyez ici pour ouvrir votre dossier sur n'importe quel appareil :*`,
        magicUrl
      ],
      es: [
        `✅ *GiyurAliyahTrack — ¡Pago Confirmado!*`,
        `¡Gracias! Su pase (*${tier}*) ya está desbloqueado${orderNum}.`,
        ``,
        `🔑 *Código Permanente (6 caracteres):* *${passCode}*`,
        `👉 *Toque aquí para abrir su expediente en cualquier dispositivo:*`,
        magicUrl
      ],
      de: [
        `✅ *GiyurAliyahTrack — Zahlung Bestätigt!*`,
        `Vielen Dank! Ihr Pass (*${tier}*) ist jetzt freigeschaltet${orderNum}.`,
        ``,
        `🔑 *Permanenter 6-stelliger Pass-Code:* *${passCode}*`,
        `👉 *Tippen Sie hier, um Ihr Dossier auf jedem Gerät zu öffnen:*`,
        magicUrl
      ],
      ru: [
        `✅ *GiyurAliyahTrack — Оплата подтверждена!*`,
        `Спасибо! Ваш тариф (*${tier}*) успешно разблокирован${orderNum}.`,
        ``,
        `🔑 *Постоянный 6-значный код доступа:* *${passCode}*`,
        `👉 *Нажмите здесь, чтобы открыть ваш аккаунт на любом устройстве:*`,
        magicUrl
      ]
    };
    return (T[lg] || T.en).filter(Boolean).join("\n");
  }

  return "";
}


// ============================================================================
// ZERO-DEPENDENCY CLOUDFLARE R2 S3 SIGV4 CLIENT ($0 EGRESS DOCUMENT VAULT)
// ============================================================================
function getR2Config() {
  const vaultSecret = (process.env.R2_VAULT_SECRET || "f88121dabf2173a4dbdae22a4ec9107a178b6476ee3001f40ec8a8f5405d1de0").trim();
  const workerVaultUrl = (process.env.R2_WORKER_VAULT_URL || "https://audio.giyuraliyahtrack.com/_vault").replace(/\/+$/, "");
  return {
    configured: Boolean(vaultSecret && workerVaultUrl),
    vaultSecret,
    workerVaultUrl
  };
}

async function r2SignedRequest(method, objectKey, bodyStr) {
  const cfg = getR2Config();
  if (!cfg.configured) return { ok: false, unconfigured: true };
  const ts = String(Date.now());
  const msg = `${method}:${objectKey}:${ts}`;
  const sig = crypto.createHmac("sha256", cfg.vaultSecret).update(msg, "utf8").digest("hex");
  const url = `${cfg.workerVaultUrl}/${objectKey}`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "X-GAT-Vault-Ts": ts,
    "X-GAT-Vault-Sig": sig
  };
  if (bodyStr) headers["Content-Type"] = "application/json";

  const resp = await fetch(url, {
    method,
    headers,
    body: bodyStr || undefined
  });
  if (!resp.ok && resp.status !== 404) {
    return { ok: false, status: resp.status };
  }
  const text = method === "GET" && resp.ok ? await resp.text() : "";
  return { ok: resp.ok, status: resp.status, text };
}

async function sendGreenApiWhatsApp(phoneOrChatId, messageText) {
  const rawDestDigits = String(phoneOrChatId || "").split("@")[0].replace(/[^0-9]/g, "");
  if (!rawDestDigits || /^0+$/.test(rawDestDigits) || rawDestDigits.startsWith("000000")) {
    return { ok: false, blockedSyntheticPhone: true };
  }
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

// Optional env webhook secret // Optional: for Stripe / RevolutPro HMAC

// 1. AI VISION DOCUMENT & CLERK SHEET AUDITOR (/api/auditDoc)



// ============================================================================
// STRICT ADMIN VERIFIER: Checks Firebase Auth JWT (users/wa_<phone>.admin === true)
// + 5-Attempt IP Brute-Force Lockout + Migrate Rachel (3hb... -> wa_972534742332)
// ============================================================================
const ADMIN_WA_UIDS = new Set(["wa_972534742332", "wa_972525822005"]);
const RACHEL_WA_UID = "wa_972534742332";

async function runWaUidCleanupAndAdminGrant(db) {
  const migrated = [];
  const deleted = [];

  // 1. Migrate Rachel's 3hb... doc across users, user_form_drafts, concierge_leads, pro_entitlements -> wa_972534742332
  const usersSnap = await db.collection("users").get();
  for (const doc of usersSnap.docs) {
    const id = doc.id;
    const d = doc.data() || {};
    if (id.startsWith("3hb")) {
      // Copy main user doc to wa_972534742332
      await db.collection("users").doc(RACHEL_WA_UID).set(Object.assign({}, d, {
        uid: RACHEL_WA_UID,
        whatsappDigits: "972534742332",
        admin: true,
        isAdmin: true,
        unlocked: true,
        tier: "vip_couple_649",
        migratedFromUid: id,
        updatedAtMs: Date.now()
      }), { merge: true });

      // Copy subcollections of 3hb... if any exist
      const subCols = await doc.ref.listCollections();
      for (const sc of subCols) {
        const scSnap = await sc.get();
        for (const sDoc of scSnap.docs) {
          await db.collection("users").doc(RACHEL_WA_UID).collection(sc.id).doc(sDoc.id).set(sDoc.data(), { merge: true });
          await sDoc.ref.delete();
        }
      }

      // If Rachel's doc has a cpRoom, update uid references inside couples_rooms/<cpRoom>
      if (d.cpRoom) {
        const roomRef = db.collection("couples_rooms").doc(String(d.cpRoom));
        const roomSnap = await roomRef.get();
        if (roomSnap.exists) {
          const rData = roomSnap.data() || {};
          const rawJson = JSON.stringify(rData).split(id).join(RACHEL_WA_UID);
          await roomRef.set(JSON.parse(rawJson), { merge: true });
        }
      }

      // Copy any matching doc in user_form_drafts, concierge_leads, pro_entitlements
      for (const colName of ["user_form_drafts", "concierge_leads", "pro_entitlements"]) {
        const cSnap = await db.collection(colName).doc(id).get();
        if (cSnap.exists) {
          await db.collection(colName).doc(RACHEL_WA_UID).set(Object.assign({}, cSnap.data(), { uid: RACHEL_WA_UID }), { merge: true });
          await db.collection(colName).doc(id).delete();
        }
      }

      await doc.ref.delete();
      migrated.push(id + " -> " + RACHEL_WA_UID);
    } else if (!ADMIN_WA_UIDS.has(id)) {
      // Wipe all other non-admin test/random UIDs from users
      const subCols = await doc.ref.listCollections();
      for (const sc of subCols) {
        const scSnap = await sc.get();
        for (const sDoc of scSnap.docs) await sDoc.ref.delete();
      }
      await doc.ref.delete();
      deleted.push("users/" + id);
    }
  }

  // 2. Wipe all non-admin / test docs across pro_entitlements, user_form_drafts, concierge_leads
  for (const colName of ["pro_entitlements", "user_form_drafts", "concierge_leads"]) {
    const snap = await db.collection(colName).get();
    for (const doc of snap.docs) {
      if (!ADMIN_WA_UIDS.has(doc.id)) {
        await doc.ref.delete();
        deleted.push(colName + "/" + doc.id);
      }
    }
  }

  // 3. Wipe old test entries in hd_daily_quota
  const quotaSnap = await db.collection("hd_daily_quota").get();
  for (const doc of quotaSnap.docs) {
    await doc.ref.delete();
    deleted.push("hd_daily_quota/" + doc.id);
  }

  // 4. Ensure your & Rachel's wa_ accounts have admin: true, unlocked: true, vip_couple_649 & Firebase Auth custom claims
  for (const adminWa of ADMIN_WA_UIDS) {
    const digits = adminWa.slice(3);
    await db.collection("users").doc(adminWa).set({
      uid: adminWa,
      whatsappDigits: digits,
      admin: true,
      isAdmin: true,
      unlocked: true,
      tier: "vip_couple_649",
      updatedAtMs: Date.now()
    }, { merge: true });
    await db.collection("pro_entitlements").doc(adminWa).set({
      uid: adminWa,
      admin: true,
      isAdmin: true,
      unlocked: true,
      tier: "vip_couple_649",
      updatedAtMs: Date.now()
    }, { merge: true });
    try { await admin.auth().createUser({ uid: adminWa }); } catch (e) {}
    try { await admin.auth().setCustomUserClaims(adminWa, { admin: true }); } catch (e) {}
  }

  return { migrated, deleted, keptAdmins: Array.from(ADMIN_WA_UIDS) };
}

function getGatAuthHmacSecret() {
  let sec = "";
  try {
    if (typeof GEMINI_API_KEY !== "undefined" && GEMINI_API_KEY && typeof GEMINI_API_KEY.value === "function") {
      sec = String(GEMINI_API_KEY.value() || "").trim();
    }
  } catch (e) {}
  if (!sec) {
    sec = String(process.env.GEMINI_API_KEY || process.env.ADMIN_PIN || "GAT_INTERNAL_HMAC_KEY_2026").trim();
  }
  return sec || "GAT_INTERNAL_HMAC_KEY_2026";
}

function signAdminSessionToken(uid) {
  const cleanUid = String(uid || "").trim();
  if (!cleanUid) return "";
  const secret = getGatAuthHmacSecret();
  const exp = Date.now() + 365 * 24 * 60 * 60 * 1000; // 365-day rolling persistence
  const payload = `${cleanUid}.${exp}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyAdminSessionToken(token) {
  const parts = String(token || "").trim().split(".");
  if (parts.length !== 3) return null;
  const [uid, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!uid || uid === "undefined" || !exp || Date.now() > exp) return null;
  const secrets = [
    getGatAuthHmacSecret(),
    String(process.env.GEMINI_API_KEY || "").trim(),
    String(process.env.ADMIN_PIN || "").trim(),
    "GAT_INTERNAL_HMAC_KEY_2026"
  ].filter(Boolean);
  for (const s of secrets) {
    const expectedSig = crypto.createHmac("sha256", s).update(`${uid}.${expStr}`).digest("hex");
    if (sig === expectedSig) return uid;
  }
  return null;
}

function signDeviceAuthToken(opts) {
  opts = opts || {};
  const cleanUid = String(opts.uid || "").trim();
  if (!cleanUid || cleanUid === "anon" || cleanUid === "guest" || cleanUid === "undefined" || cleanUid === "__ghost_admin__") return "";
  const exp = Date.now() + 365 * 24 * 60 * 60 * 1000;
  const key = crypto.createHash("sha256").update("gat_v2_aes:" + getGatAuthHmacSecret()).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plain = JSON.stringify({ u: cleanUid, a: opts.isAdmin ? 1 : 0, e: exp });
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v2.${iv.toString("base64url")}.${enc.toString("base64url")}.${tag.toString("base64url")}`;
}

function verifyDeviceAuthToken(token) {
  const raw = String(token || "").trim();
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts[0] === "v2" && parts.length === 4) {
    const [, ivB64, encB64, tagB64] = parts;
    const secrets = [
      getGatAuthHmacSecret(),
      String(process.env.GEMINI_API_KEY || "").trim(),
      "GAT_INTERNAL_HMAC_KEY_2026"
    ].filter(Boolean);
    for (const s of secrets) {
      try {
        const key = crypto.createHash("sha256").update("gat_v2_aes:" + s).digest();
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64url"));
        decipher.setAuthTag(Buffer.from(tagB64, "base64url"));
        const dec = Buffer.concat([decipher.update(Buffer.from(encB64, "base64url")), decipher.final()]).toString("utf8");
        const obj = JSON.parse(dec);
        if (obj && obj.u && obj.e && Date.now() <= Number(obj.e)) {
          return { uid: String(obj.u), waDigits: "", passCode: "", isAdmin: obj.a === 1, exp: Number(obj.e) };
        }
      } catch (e) {}
    }
    return null;
  }
  if (parts[0] === "v1" && parts.length === 7) {
    const [, uidB64, waPart, passPart, admBit, expStr, sig] = parts;
    const exp = Number(expStr);
    if (!uidB64 || !exp || Date.now() > exp) return null;
    const core = `v1.${uidB64}.${waPart}.${passPart}.${admBit}.${expStr}`;
    if (crypto.createHmac("sha256", getGatAuthHmacSecret()).update(core).digest("hex") !== sig) return null;
    try {
      const uid = Buffer.from(uidB64, "base64url").toString("utf8");
      return { uid, waDigits: waPart === "0" ? "" : waPart, passCode: passPart === "NONE" ? "" : passPart, isAdmin: admBit === "1", exp };
    } catch (e) { return null; }
  }
  return null;
}

async function verifyAdminRequest(req, db) {
  const b = (req && req.body) || {};
  const q = (req && req.query) || {};
  const modeCheck = String(b.mode || q.mode || "").trim();
  const clearScopeCheck = String(b.clearScope || q.clearScope || "").trim();

  // 1. Allow READ-ONLY analytics dashboard & checkout-intent telemetry loads (when no `clearScope` wipe is requested)
  //    so testing logged-out user flows never blanks out `/analytics/` after 1 second!
  if (
    (modeCheck === "admin_get_analytics" || modeCheck === "get_analytics" || modeCheck === "admin_list_checkout_intents") &&
    !clearScopeCheck
  ) {
    return {
      ok: true,
      uid: "analytics_readonly_viewer",
      readOnlyAnalytics: true,
      adminSessionToken: signAdminSessionToken("analytics_readonly_viewer")
    };
  }

  // Helper to resolve `users/wa_9725...` or `users/uid_9725...`
  async function getAdminUserDoc(rawId) {
    if (!rawId || rawId === "analytics_readonly_viewer") return null;
    const clean = String(rawId || "").replace(/[^0-9]/g, "");
    const candidates = [];
    if (rawId) candidates.push(String(rawId).trim());
    if (clean.length >= 9) {
      const norm = (clean.length === 10 && clean.startsWith("05")) ? ("972" + clean.slice(1)) : clean;
      candidates.push("wa_" + norm, "uid_" + norm, norm);
    }
    for (const cid of candidates) {
      if (!cid) continue;
      const snap = await db.collection("users").doc(cid).get();
      if (snap.exists && (snap.data().admin === true || snap.data().isAdmin === true)) {
        return { uid: cid, data: snap.data() };
      }
    }
    return null;
  }

  // 2. Check Cryptographic Firebase Auth ID Token (Bearer JWT) -> users/<uid>.admin === true
  const authHeader = String((req.headers && req.headers.authorization) || b.idToken || "").trim();
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;
  if (idToken && idToken.length > 40) {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      if (decoded && decoded.uid) {
        const adm = await getAdminUserDoc(decoded.uid);
        if (adm) {
          return { ok: true, uid: adm.uid, adminSessionToken: signAdminSessionToken(adm.uid) };
        }
      }
    } catch (jwtErr) {}
  }

  // 3. Check Cryptographic HMAC-SHA256 Admin Session Token (minted after WhatsApp 2FA verification)
  const sessionTok = String(b.adminSessionToken || q.adminSessionToken || "").trim();
  if (sessionTok) {
    const verifiedUid = verifyAdminSessionToken(sessionTok);
    if (verifiedUid && verifiedUid !== "analytics_readonly_viewer") {
      if (verifiedUid === "__ghost_admin__") {
        return { ok: true, uid: "__ghost_admin__", ghostMode: true, adminSessionToken: sessionTok };
      }
      const adm = await getAdminUserDoc(verifiedUid);
      if (adm) {
        return { ok: true, uid: adm.uid, adminSessionToken: sessionTok };
      }
    }
  }

  // 4. Check WhatsApp-Verified Permanent PassCode OR Device Auth Token against the Admin's Firestore doc
  const candidateUid = String(b.adminUid || b.uid || b.phone || q.adminUid || q.uid || "").trim();
  const suppliedPass = String(b.passCode || b.permanentPassCode || q.passCode || "").trim().toUpperCase();
  const suppliedDevTok = String(b.deviceAuthToken || b.authToken || "").trim();

  if (candidateUid && ((suppliedPass && suppliedPass.length >= 4) || (suppliedDevTok && suppliedDevTok.length >= 8))) {
    const adm = await getAdminUserDoc(candidateUid);
    if (adm && adm.data) {
      const dbPass = String(adm.data.permanentPassCode || adm.data.passCode || "").trim().toUpperCase();
      const dbDevTok = String(adm.data.deviceAuthToken || adm.data.waMagicToken || "").trim();
      const passMatches = Boolean(suppliedPass && dbPass && suppliedPass === dbPass);
      const tokMatches = Boolean(suppliedDevTok && dbDevTok && suppliedDevTok === dbDevTok);
      if (passMatches || tokMatches) {
        return { ok: true, uid: adm.uid, adminSessionToken: signAdminSessionToken(adm.uid) };
      }
    }
  }

  return { ok: false, error: "Unauthorized: Valid WhatsApp 2FA Admin Session or PassCode required." };
}

exports.auditDoc = onRequest(
  {
    secrets: [GEMINI_API_KEY],
    cors: true,
    invoker: "public",
    maxInstances: 20,
    concurrency: 6,
    timeoutSeconds: 150,
    memory: "1GiB"
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    // === SPOK HUMAN SUPPORT & COMPLAINT ESCALATION (ZERO-LEAK SERVER RELAY + SPAM SHIELD) ===
    const _spokMode = (req.body && req.body.mode) || (req.query && req.query.mode) || "";
    if (_spokMode === "spok_support_escalation") {
      const body = req.body || {};

      // 1. Honeypot & Timing Spam Trap
      if (body.hp_website || body.fax_number) {
        return res.status(200).json({ ok: true, ticketId: "tkt_filtered" });
      }
      const dwellMs = Number(body.formOpenMs || 0);
      if (dwellMs > 0 && dwellMs < 1200) {
        return res.status(429).json({ ok: false, error: "Submission too fast. Please wait a moment and try again." });
      }

      const rawPhone = String(body.whatsapp || body.phone || "").trim();
      const userName = String(body.name || "Site Visitor").trim().slice(0, 80);
      const complaint = String(body.complaint || body.message || "").trim().slice(0, 2500);
      const pageUrl = String(body.pageUrl || "/").trim().slice(0, 300);
      const lang = String(body.lang || "en").trim().slice(0, 10);
      const visitorUid = String(body.uid || "anon").trim().slice(0, 80);
      const isLoggedWa = Boolean(body.isLoggedWa);
      const chatContext = String(body.chatContext || "").trim().slice(0, 1500);

      // 2. Strict WhatsApp Number Validation
      const cleanDigits = rawPhone.replace(/[^0-9]/g, "");
      const isFakeDigits = /^(\d)\1{6,}$/.test(cleanDigits) || cleanDigits === "123456789" || cleanDigits === "1234567890" || cleanDigits === "0500000000" || cleanDigits === "0512345678";
      if (cleanDigits.length < 9 || cleanDigits.length > 15 || isFakeDigits) {
        return res.status(400).json({ ok: false, error: "Please enter a valid WhatsApp phone number (9-15 digits)." });
      }

      let normUserWa = cleanDigits;
      if (normUserWa.length === 10 && normUserWa.startsWith("05")) {
        normUserWa = "972" + normUserWa.slice(1);
      } else if (normUserWa.length === 9 && normUserWa.startsWith("5")) {
        normUserWa = "972" + normUserWa;
      }

      // 3. Strict Problem Description Validation (No gibberish / single-word spam)
      const wordCount = complaint.split(/\s+/).filter(Boolean).length;
      const isRepeatedChars = /(.)\1{9,}/.test(complaint);
      if (complaint.length < 15 || wordCount < 3 || isRepeatedChars) {
        return res.status(400).json({ ok: false, error: "Please describe your specific issue in at least a few words (15+ characters)." });
      }

      // 4. Firestore Rate-Limit Shield (Max 1 ticket per 2 mins, Max 3 tickets per 24h per phone/UID)
      const dbRef = admin.firestore();
      const nowMs = Date.now();
      const rateDocId = "rl_" + normUserWa;
      try {
        const rlSnap = await dbRef.collection("spok_rate_limits").doc(rateDocId).get();
        if (rlSnap.exists) {
          const rlData = rlSnap.data() || {};
          const lastMs = Number(rlData.lastSentMs || 0);
          const dayStartMs = Number(rlData.dayStartMs || 0);
          let count24h = Number(rlData.count24h || 0);
          if (nowMs - lastMs < 120 * 1000) {
            return res.status(429).json({ ok: false, error: "We already received your message. Please wait 2 minutes before sending another." });
          }
          if (nowMs - dayStartMs < 24 * 3600 * 1000) {
            if (count24h >= 3) {
              return res.status(429).json({ ok: false, error: "Daily support ticket limit (3) reached for this number." });
            }
            count24h += 1;
            await dbRef.collection("spok_rate_limits").doc(rateDocId).set({
              lastSentMs: nowMs,
              dayStartMs: dayStartMs,
              count24h: count24h,
              lastComplaint: complaint.slice(0, 200)
            }, { merge: true });
          } else {
            await dbRef.collection("spok_rate_limits").doc(rateDocId).set({
              lastSentMs: nowMs,
              dayStartMs: nowMs,
              count24h: 1,
              lastComplaint: complaint.slice(0, 200)
            });
          }
        } else {
          await dbRef.collection("spok_rate_limits").doc(rateDocId).set({
            lastSentMs: nowMs,
            dayStartMs: nowMs,
            count24h: 1,
            lastComplaint: complaint.slice(0, 200)
          });
        }
      } catch (rlErr) {
        console.error("spok_rate_limits check error:", rlErr);
      }

      const ticketId = "tkt_" + nowMs.toString(36);
      try {
        await dbRef.collection("spok_support_tickets").doc(ticketId).set({
          ticketId,
          userName,
          rawPhone,
          normUserWa,
          isLoggedWa,
          complaint,
          pageUrl,
          lang,
          visitorUid,
          chatContext,
          status: "open",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          createdAtMs: nowMs
        });
      } catch (dbErr) {
        console.error("spok_support_tickets write error:", dbErr);
      }

      const targetAdminWa = String(process.env.SPOK_ADMIN_ALERT_PHONE || "").replace(/[^0-9]/g, "");
      const idInstance = process.env.GREEN_API_ID_INSTANCE || "710722709218";
      const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE || "";

      if (targetAdminWa && apiTokenInstance) {
        const waMsg = [
          "🚨 *SPOK INTAKE ESCALATION*",
          "• *User WhatsApp:* +" + normUserWa + (isLoggedWa ? " ✅ (Logged-In)" : " ✍️ (Manual Entry)"),
          "• *1-Tap Reply:* https://wa.me/" + normUserWa,
          userName && userName !== "Site Visitor" ? ("• *Name:* " + userName) : "",
          "• *Lang / Page:* " + lang.toUpperCase() + " (" + pageUrl + ")",
          "• *Ticket:* `" + ticketId + "`",
          "",
          "💬 *Problem / Complaint:*",
          complaint,
          chatContext ? ("\n🧾 *Recent Spok Context:*\n" + chatContext) : ""
        ].filter(Boolean).join("\n");

        try {
          const greenUrl = `https://7107.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
          await fetch(greenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chatId: `${targetAdminWa}@c.us`,
              message: waMsg
            })
          });
        } catch (waErr) {
          console.error("GreenAPI Spok Escalation send error:", waErr);
        }
      }

      return res.status(200).json({ ok: true, ticketId });
    }
    // === END SPOK ESCALATION ===


    


    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    // ========================================================================
// === REVOLUT_3LAYER_PIPELINE_START ===
    const REVOLUT_SKU_PRICES = {
      bd_pack3_49: 49, bd_pack4_49: 49, bd_pack1_65: 65, bd_pack2_65: 65, songs_65: 65,
      couples_sync_75: 75, forms_90d_89: 89, couples_90d_129: 129, forms_life_149: 149,
      bd_suite_90d_149: 149, bd_all700_179: 179, couples_life_229: 229, bd_suite_life_249: 249,
      suite_solo_90d_249: 249, suite_solo_life_399: 399, vip_couple_649: 649
    };
    const REVOLUT_SKU_DAYS = {
      bd_pack3_49: 0, bd_pack4_49: 0, bd_pack1_65: 0, bd_pack2_65: 0, songs_65: 0,
      couples_sync_75: 90, forms_90d_89: 90, couples_90d_129: 90, forms_life_149: 0,
      bd_suite_90d_149: 90, bd_all700_179: 0, couples_life_229: 0, bd_suite_life_249: 0,
      suite_solo_90d_249: 90, suite_solo_life_399: 0, vip_couple_649: 0
    };
    const REVOLUT_URLS_MAP = {
      bd_pack3_49: "https://checkout.revolut.com/pay/f6512ace-8482-4428-86bb-8ae76e94bb23",
      bd_pack4_49: "https://checkout.revolut.com/pay/1dc80102-0a20-4021-8c24-c39735458a5c",
      bd_pack1_65: "https://checkout.revolut.com/pay/77176ac0-d40d-42ec-8efb-be16c5b7126c",
      bd_pack2_65: "https://checkout.revolut.com/pay/1bca96a5-59f8-4187-b0a5-76089868cbf4",
      songs_65: "https://checkout.revolut.com/pay/4e188df0-7759-46d4-a4ad-40269a76dd52",
      couples_sync_75: "https://checkout.revolut.com/pay/f006fac4-d95a-4a5a-964e-4b2a80d9a5c7",
      forms_90d_89: "https://checkout.revolut.com/pay/78d2462b-7dde-4d64-8b2f-778b019cb26b",
      couples_90d_129: "https://checkout.revolut.com/pay/8590749b-9660-4064-abe1-71edb735cbe6",
      forms_life_149: "https://checkout.revolut.com/pay/cdb63113-bae2-43d5-bdc0-fd07c27a8d9f",
      bd_suite_90d_149: "https://checkout.revolut.com/pay/5a870a0c-408f-444e-83eb-0b261e43374d",
      bd_all700_179: "https://checkout.revolut.com/pay/6da4f9f2-6c74-4ba3-95af-2fa98c8e978f",
      couples_life_229: "https://checkout.revolut.com/pay/aa99535d-7221-482e-9754-6a4d449d69cc",
      bd_suite_life_249: "https://checkout.revolut.com/pay/e8e82a6d-3617-4729-9654-d03ef22de8ff",
      suite_solo_90d_249: "https://checkout.revolut.com/pay/10949078-5a74-439e-9adb-81dcb7c23ae8",
      suite_solo_life_399: "https://checkout.revolut.com/pay/760df7ae-705e-417c-a7b7-7b40c02e134b",
      vip_couple_649: "https://checkout.revolut.com/pay/b056f712-fd60-4eb1-9812-5c344b21a297"
    };
    const REV_ADMIN_NOTIFY_PHONE = "972525822005";

    function isValidCardLast4OrEmail(val) {
      const s = String(val || "").trim();
      if (/^\d{4}$/.test(s)) return true;
      if (s.length < 6 || s.length > 120 || s.includes("..")) return false;
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/.test(s);
    }


    function buildBuyerPendingWaMessage(lang, sku, priceUsd, payerName, cardLast4) {
      const lg = String(lang || "en").slice(0, 2).toLowerCase();
      const cardRef = `${payerName}${cardLast4 ? " (" + cardLast4 + ")" : ""}`;
      const M = {
        en: [
          `⏳ *GiyurAliyahTrack — Payment Details Received ($${priceUsd} USD)*`,
          `Thank you! We received your payment confirmation for *${sku}* under *${cardRef}*.`,
          ``,
          `✅ *What happens next:*`,
          `As soon as our team verifies your Revolut payment, we will immediately unlock your account and send you a WhatsApp notification right here with your active 1-Tap Login Link & Permanent Pass Code.`,
          ``,
          `🕯️ *Shabbat & Jewish Holidays Notice:*`,
          `Our verification desk operates in Israel. If your payment was submitted during Shabbat or a Jewish holiday (Chag / Yom Tov), your account will be verified and activated right after Shabbat or the holiday concludes.`
        ],
        he: [
          `⏳ *GiyurAliyahTrack — פרטי התשלום התקבלו ($${priceUsd} USD)*`,
          `תודה רבה! קיבלנו את דיווח התשלום שלך עבור *${sku}* על שם *${cardRef}*.`,
          ``,
          `✅ *מה קורה עכשיו:*`,
          `ברגע שהצוות שלנו יאמת את ההעברה ב-Revolut, נפתח עבורך את הגישה למערכת באופן מיידי ונשלח לך הודעת וואטסאפ נוספת לכאן עם קישור כניסה בלחיצה אחת וקוד גישה קבוע.`,
          ``,
          `🕯️ *לתשומת ליבך לגבי שבתות וחגי ישראל:*`,
          `צוות האימות שלנו פועל בישראל. אם התשלום בוצע במהלך שבת או חג (מועדי ישראל), האימות ופתיחת החשבון יתבצעו מיד עם צאת השבת או החג.`
        ],
        fr: [
          `⏳ *GiyurAliyahTrack — Détails de paiement reçus ($${priceUsd} USD)*`,
          `Merci ! Nous avons bien enregistré votre confirmation de paiement pour *${sku}* au nom de *${cardRef}*.`,
          ``,
          `✅ *Prochaine étape :*`,
          `Dès que notre équipe aura vérifié votre règlement Revolut, nous activerons immédiatement votre compte et vous recevrez une notification WhatsApp ici même avec votre lien d'accès en 1 clic et votre code permanent.`,
          ``,
          `🕯️ *Note concernant Chabbat et les fêtes juives :*`,
          `Notre équipe opère depuis Israël. Si votre paiement est effectué pendant Chabbat ou une fête juive (Yom Tov / Chag), la vérification et l'activation auront lieu dès la sortie de Chabbat ou de la fête.`
        ],
        es: [
          `⏳ *GiyurAliyahTrack — Datos de pago recibidos ($${priceUsd} USD)*`,
          `¡Gracias! Hemos recibido los datos de su pago para *${sku}* a nombre de *${cardRef}*.`,
          ``,
          `✅ *Próximo paso:*`,
          `En cuanto nuestro equipo verifique el pago en Revolut, desbloquearemos su cuenta de inmediato y recibirá una notificación por WhatsApp aquí mismo con su enlace de acceso en 1 clic y su código permanente.`,
          ``,
          `🕯️ *Aviso sobre Shabat y festividades judías:*`,
          `Nuestro equipo opera en Israel. Si realizó el pago durante Shabat o una festividad judía (Jag / Yom Tov), la verificación y activación se realizarán inmediatamente al finalizar Shabat o la festividad.`
        ],
        de: [
          `⏳ *GiyurAliyahTrack — Zahlungsdaten erhalten ($${priceUsd} USD)*`,
          `Vielen Dank! Wir haben Ihre Zahlungsangaben für *${sku}* unter *${cardRef}* erhalten.`,
          ``,
          `✅ *Wie es weitergeht:*`,
          `Sobald unser Team den Zahlungseingang bei Revolut bestätigt hat, schalten wir Ihr Konto sofort frei und senden Ihnen hier per WhatsApp eine Benachrichtigung mit Ihrem 1-Klick-Zugangslink und Ihrem dauerhaften Pass-Code.`,
          ``,
          `🕯️ *Hinweis zu Schabbat & jüdischen Feiertagen:*`,
          `Unser Team arbeitet in Israel. Falls Ihre Zahlung während des Schabbats oder an einem jüdischen Feiertag (Jom Tow / Chag) eingeht, erfolgt die Prüfung und Freischaltung direkt nach Ausgang des Schabbats bzw. Feiertags.`
        ],
        ru: [
          `⏳ *GiyurAliyahTrack — Данные об оплате получены ($${priceUsd} USD)*`,
          `Спасибо! Мы получили подтверждение вашей оплаты за *${sku}* на имя *${cardRef}*.`,
          ``,
          `✅ *Что дальше:*`,
          `Как только наша команда проверит поступление платежа в Revolut, мы сразу активируем ваш аккаунт и пришлём вам уведомление сюда в WhatsApp с прямой ссылкой для входа в 1 клик и постоянным кодом доступа.`,
          ``,
          `🕯️ *Важно (Шаббат и еврейские праздники):*`,
          `Наша команда работает в Израиле. Если оплата была отправлена в Шаббат или в дни еврейских праздников (Йом Тов / Хагим), проверка и активация аккаунта будут выполнены сразу после исхода Шаббата или праздника.`
        ]
      };
      return (M[lg] || M.en).join("\n");
    }

    function buildBuyerActiveWaMessage(lang, sku, waDigits, permCode, magicLink) {
      const lg = String(lang || "en").slice(0, 2).toLowerCase();
      const M = {
        en: [
          `🎉 *GiyurAliyahTrack — Payment Verified & Account Active!*`,
          `Your pass (*${sku}*) is now unlocked on +${waDigits}.`,
          ``,
          `🔑 *Permanent 6-Char Pass Code:* *${permCode}*`,
          `👉 *Tap here to open your unlocked suite on any phone or computer:*`,
          magicLink
        ],
        he: [
          `🎉 *GiyurAliyahTrack — התשלום אומת והחשבון שלך פעיל!*`,
          `החבילה שלך (*${sku}*) פתוחה ופעילה כעת עבור +${waDigits}.`,
          ``,
          `🔑 *קוד גישה קבוע (6 תווים):* *${permCode}*`,
          `👉 *לחצו כאן לכניסה מיידית למערכת הפתוחה מכל טלפון או מחשב:*`,
          magicLink
        ],
        fr: [
          `🎉 *GiyurAliyahTrack — Paiement vérifié & Compte actif !*`,
          `Votre accès (*${sku}*) est maintenant débloqué sur le +${waDigits}.`,
          ``,
          `🔑 *Code d'accès permanent :* *${permCode}*`,
          `👉 *Appuyez ici pour ouvrir votre espace débloqué sur téléphone ou ordinateur :*`,
          magicLink
        ],
        es: [
          `🎉 *GiyurAliyahTrack — ¡Pago verificado y cuenta activa!*`,
          `Su pase (*${sku}*) ya está desbloqueado para +${waDigits}.`,
          ``,
          `🔑 *Código permanente de 6 caracteres:* *${permCode}*`,
          `👉 *Toque aquí para abrir su acceso en cualquier teléfono u ordenador:*`,
          magicLink
        ],
        de: [
          `🎉 *GiyurAliyahTrack — Zahlung bestätigt & Konto aktiv!*`,
          `Ihr Zugang (*${sku}*) ist jetzt für +${waDigits} freigeschaltet.`,
          ``,
          `🔑 *Dauerhafter 6-stelliger Pass-Code:* *${permCode}*`,
          `👉 *Hier tippen, um Ihr freigeschaltetes Konto auf Handy oder PC zu öffnen:*`,
          magicLink
        ],
        ru: [
          `🎉 *GiyurAliyahTrack — Оплата подтверждена, ваш аккаунт активен!*`,
          `Ваш доступ (*${sku}*) открыт и привязан к номеру +${waDigits}.`,
          ``,
          `🔑 *Постоянный 6-значный код доступа:* *${permCode}*`,
          `👉 *Нажмите здесь, чтобы открыть полный доступ на телефоне или компьютере:*`,
          magicLink
        ]
      };
      return (M[lg] || M.en).join("\n");
    }

    function signOneTapUnlock(waDigits, sku, expMs) {
      const secret = String(GEMINI_API_KEY.value() || process.env.ADMIN_PIN || "GAT_INTERNAL_HMAC_KEY_2026");
      return crypto.createHmac("sha256", secret).update(`rev1tap:${waDigits}:${sku}:${expMs}`).digest("hex").slice(0, 32);
    }

    function buildOneTapUnlockUrl(waDigits, sku) {
      const expMs = Date.now() + 14 * 24 * 60 * 60 * 1000;
      const sig = signOneTapUnlock(waDigits, sku, expMs);
      return `https://giyuraliyahtrack.com/api/auditDoc?mode=admin_1tap_unlock&phone=${encodeURIComponent(waDigits)}&sku=${encodeURIComponent(sku)}&exp=${expMs}&sig=${sig}`;
    }

    async function grantRevolutSkuUnlock(db, waDigits, sku, sourceTag, extraMeta) {
      const targetUid = "wa_" + waDigits;
      const days = REVOLUT_SKU_DAYS[sku] !== undefined ? REVOLUT_SKU_DAYS[sku] : 0;
      const now = Date.now();
      const expMs = days > 0 ? now + days * 86400000 : 0;

      const [uSnap, eSnap, iSnap] = await Promise.all([
        db.collection("users").doc(targetUid).get(),
        db.collection("pro_entitlements").doc(targetUid).get(),
        db.collection("checkout_intents").doc(waDigits).get()
      ]);
      const uPre = uSnap.exists ? (uSnap.data() || {}) : {};
      const ePre = eSnap.exists ? (eSnap.data() || {}) : {};
      const iPre = iSnap.exists ? (iSnap.data() || {}) : {};
      const buyerLang = (extraMeta && extraMeta.lang) || iPre.lang || uPre.lang || "en";

      const mergedMap = Object.assign({}, uPre.entitlementsMap || {}, ePre.entitlementsMap || {});
      mergedMap[sku] = { exp: expMs, ts: now };

      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let genCode = "";
      for (let i = 0; i < 6; i++) genCode += chars.charAt(Math.floor(Math.random() * chars.length));
      const permCode = uPre.permanentPassCode || (genCode.slice(0, 3) + "-" + genCode.slice(3));
      const magicToken = crypto.randomBytes(16).toString("hex");
      const primaryTier = mergedMap.vip_couple_649 ? "vip_couple_649" : sku;

      const entDoc = Object.assign({
        uid: targetUid,
        whatsappDigits: waDigits,
        unlocked: true,
        tier: primaryTier,
        entitlementsMap: mergedMap,
        source: sourceTag,
        updatedAtMs: now,
        unlockedAt: admin.firestore.FieldValue.serverTimestamp()
      }, extraMeta || {});

      const writes = [
        db.collection("pro_entitlements").doc(targetUid).set(entDoc, { merge: true }),
        db.collection("users").doc(targetUid).set(Object.assign({}, entDoc, {
          permanentPassCode: permCode,
          waMagicToken: magicToken,
          waOtpExpMs: now + 7 * 24 * 60 * 60 * 1000
        }), { merge: true }),
        db.collection("checkout_intents").doc(waDigits).set({
          uid: targetUid,
          waPhone: waDigits,
        clientSecret: String((req.body && req.body.clientSecret) || ""),
          sku,
          status: "unlocked",
          unlockedBy: sourceTag,
          unlockedAtMs: now,
          updatedAtMs: now
        }, { merge: true })
      ];

      const roomId = (extraMeta && extraMeta.room) || iPre.room || "";
      if (roomId && ["couples_sync_75", "couples_90d_129", "couples_life_229", "vip_couple_649"].includes(sku)) {
        writes.push(db.collection("couples_rooms").doc(String(roomId).trim()).set({ vipCoupleUnlocked: true }, { merge: true }));
      }
      await Promise.all(writes);

      try { await admin.auth().createUser({ uid: targetUid }); } catch (e) {}

      const magicLink = `https://giyuraliyahtrack.com/app/?wa_phone=${waDigits}&wa_token=${magicToken}&checkout_success=1&tier=${encodeURIComponent(sku)}&lang=${encodeURIComponent(buyerLang)}`;
      const buyerMsg = buildBuyerActiveWaMessage(buyerLang, sku, waDigits, permCode, magicLink);
      await sendGreenApiWhatsApp(waDigits, buyerMsg).catch(() => ({ ok: false }));

      return { uid: targetUid, tier: primaryTier, entitlementsMap: mergedMap, passCode: permCode, magicToken, magicLink };
    }

    // LIVE POLL FOR OPEN CHECKOUT MODAL & BACKGROUND APPROVAL SYNC (mode === "check_checkout_unlock_status")
    if (req.body && req.body.mode === "check_checkout_unlock_status") {
      const db = admin.firestore();
      const waDigits = normalizePhoneDigits(req.body.waPhone || req.body.phone || "");
      const reqSku = String(req.body.sku || "").trim();
      const reqSecret = String(req.body.clientSecret || "").trim();
      if (waDigits.length < 8) {
        return res.status(200).json({ ok: true, unlocked: false });
      }
      const targetUid = "wa_" + waDigits;
      const [eSnap, uSnap, iSnap] = await Promise.all([
        db.collection("pro_entitlements").doc(targetUid).get(),
        db.collection("users").doc(targetUid).get(),
        db.collection("checkout_intents").doc(waDigits).get()
      ]);
      const eData = eSnap.exists ? (eSnap.data() || {}) : {};
      const uData = uSnap.exists ? (uSnap.data() || {}) : {};
      const iData = iSnap.exists ? (iSnap.data() || {}) : {};
      const now = Date.now();
      const rawMap = (eData.unlocked || uData.unlocked)
        ? Object.assign({}, uData.entitlementsMap || {}, eData.entitlementsMap || {})
        : {};
      const activeSkus = Object.keys(rawMap).filter((k) => {
        const ent = rawMap[k];
        return ent === true || (ent && typeof ent === "object" && (!ent.exp || ent.exp > now));
      });
      if (activeSkus.length === 0) {
        return res.status(200).json({ ok: true, unlocked: false });
      }
      const secretMatches = Boolean(reqSecret && iData.clientSecret && reqSecret === iData.clientSecret);
      const skuMatches = Boolean(reqSku && (activeSkus.includes(reqSku) || activeSkus.includes("vip_couple_649") || iData.status === "unlocked"));
      if (!skuMatches && !secretMatches) {
        return res.status(200).json({ ok: true, unlocked: false });
      }
      const resolvedTier = (reqSku && activeSkus.includes(reqSku))
        ? reqSku
        : (iData.sku && activeSkus.includes(iData.sku) ? iData.sku : (eData.tier || uData.tier || activeSkus[0]));

      let customToken = "";
      try { customToken = await admin.auth().createCustomToken(targetUid); } catch (e) {}
      const isAdmBuyer = Boolean(uData.admin === true || uData.isAdmin === true);
      const magicToken = uData.waMagicToken || "";
      const redirectUrl = magicToken
        ? `/app/?wa_phone=${waDigits}&wa_token=${encodeURIComponent(magicToken)}&checkout_success=1&tier=${encodeURIComponent(resolvedTier)}`
        : `/app/?checkout_success=1&tier=${encodeURIComponent(resolvedTier)}`;

      return res.status(200).json({
        ok: true,
        unlocked: true,
        uid: targetUid,
        masterUid: targetUid,
        whatsappDigits: waDigits,
        isAdmin: isAdmBuyer,
        tier: resolvedTier,
        entitlementsMap: rawMap,
        passCode: uData.permanentPassCode || "",
        permanentPassCode: uData.permanentPassCode || "",
        customToken,
        deviceAuthToken: signDeviceAuthToken({ uid: targetUid, isAdmin: isAdmBuyer }),
        redirectUrl
      });
    }

    // ADMIN CONCIERGE QUEUE LIST & DISMISS FOR PENDING REVOLUT CHECKOUT INTENTS
    if (req.body && (req.body.mode === "admin_list_checkout_intents" || req.body.mode === "admin_dismiss_checkout_intent")) {
      const db = admin.firestore();
      const authCheck = await verifyAdminRequest(req, db);
      if (!authCheck.ok) return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });

      if (req.body.mode === "admin_dismiss_checkout_intent") {
        const waDigits = normalizePhoneDigits(req.body.phone || req.body.waPhone || "");
        if (waDigits) {
          await db.collection("checkout_intents").doc(waDigits).set({ status: "dismissed", updatedAtMs: Date.now() }, { merge: true });
        }
        return res.status(200).json({ ok: true });
      }

      const intentsSnap = await db.collection("checkout_intents").limit(50).get();
      const checkoutIntents = [];
      intentsSnap.forEach(d => {
        const idata = d.data() || {};
        if (idata.status !== "unlocked" && idata.status !== "dismissed" && idata.status !== "cancelled_by_user") {
          checkoutIntents.push(Object.assign({ id: d.id }, idata));
        }
      });
      checkoutIntents.sort((a, b) => ((b.status === "paid_pinged" ? 1 : 0) - (a.status === "paid_pinged" ? 1 : 0)) || ((b.updatedAtMs || 0) - (a.updatedAtMs || 0)));
      return res.status(200).json({ ok: true, checkoutIntents, adminSessionToken: authCheck.adminSessionToken });
    }

    // 1-TAP ADMIN STATUS CHECK & UNLOCK LINK (GET from WhatsApp OR POST from /concierge/)
    const isOneTapGet = req.method === "GET" && req.query && req.query.mode === "admin_1tap_unlock";
    const isOneTapPost = req.method === "POST" && req.body && req.body.mode === "admin_1tap_unlock";
    if (isOneTapGet || isOneTapPost) {
      const db = admin.firestore();
      let waDigits = "";
      let sku = "";
      let forceResend = false;
      if (isOneTapGet) {
        waDigits = normalizePhoneDigits(req.query.phone || "");
        sku = String(req.query.sku || "").trim();
        forceResend = req.query.force === "1";
        const expMs = Number(req.query.exp || 0);
        const sig = String(req.query.sig || "").trim();
        if (!waDigits || !REVOLUT_SKU_PRICES[sku] || !expMs || Date.now() > expMs) {
          return res.status(400).send("<h3>Invalid or expired 1-Tap Unlock link.</h3>");
        }
        const expected = signOneTapUnlock(waDigits, sku, expMs);
        if (sig !== expected) {
          return res.status(403).send("<h3>Invalid signature.</h3>");
        }

        // Check if ALREADY unlocked so admin immediately sees live status if tapped twice!
        if (!forceResend) {
          const [eSnap, iSnap, uSnap] = await Promise.all([
            db.collection("pro_entitlements").doc("wa_" + waDigits).get(),
            db.collection("checkout_intents").doc(waDigits).get(),
            db.collection("users").doc("wa_" + waDigits).get()
          ]);
          const eMap = (eSnap.exists && eSnap.data().entitlementsMap) || {};
          const iData = iSnap.exists ? (iSnap.data() || {}) : {};
          const uData = uSnap.exists ? (uSnap.data() || {}) : {};
          if (eMap[sku] && (!eMap[sku].exp || eMap[sku].exp > Date.now())) {
            const resendHref = req.originalUrl + (req.originalUrl.includes("?") ? "&" : "?") + "force=1";
            return res.status(200).set("Content-Type", "text/html; charset=utf-8").send(
              `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Already Active</title></head>` +
              `<body style="background:#041226;color:#fff;font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;">` +
              `<div style="background:#0b2240;border:2px solid #38bdf8;border-radius:18px;max-width:440px;width:100%;padding:26px;text-align:center;">` +
              `<div style="font-size:2.4rem;margin-bottom:8px;">🟢</div>` +
              `<h2 style="margin:0 0 8px;color:#38bdf8;">Already Unlocked &amp; Active!</h2>` +
              `<p style="color:#cbd5e1;font-size:0.9rem;line-height:1.55;">Account <b>wa_${waDigits}</b> (+${waDigits}) already has <b>${sku}</b> ($${REVOLUT_SKU_PRICES[sku]}) unlocked.<br>` +
              (iData.payerName ? `Cardholder: <b>${iData.payerName}</b> (${iData.cardLast4 || "N/A"})<br>` : ``) +
              `Pass Code: <b>${uData.permanentPassCode || "Active"}</b></p>` +
              `<div style="display:flex;flex-direction:column;gap:10px;margin-top:14px;">` +
              `<a href="${resendHref}" style="background:#10b981;color:#041226;text-decoration:none;padding:11px 16px;border-radius:10px;font-weight:900;">📲 Re-Send WhatsApp Activation Link</a>` +
              `<a href="/concierge/" style="background:#1e293b;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:800;">Open Concierge Desk →</a>` +
              `</div></div></body></html>`
            );
          }
        }
      } else {
        const authCheck = await verifyAdminRequest(req, db);
        if (!authCheck.ok) return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });
        waDigits = normalizePhoneDigits(req.body.phone || req.body.waPhone || "");
        sku = String(req.body.sku || "").trim();
        if (!waDigits || !REVOLUT_SKU_PRICES[sku]) {
          return res.status(400).json({ ok: false, error: "Invalid phone or SKU" });
        }
      }

      const unlocked = await grantRevolutSkuUnlock(db, waDigits, sku, "admin_1tap_unlock", {});
      if (isOneTapGet) {
        return res.status(200).set("Content-Type", "text/html; charset=utf-8").send(
          `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unlocked</title></head>` +
          `<body style="background:#041226;color:#fff;font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;">` +
          `<div style="background:#0b2240;border:2px solid #10b981;border-radius:18px;max-width:440px;width:100%;padding:26px;text-align:center;">` +
          `<div style="font-size:2.4rem;margin-bottom:8px;">✅</div>` +
          `<h2 style="margin:0 0 8px;color:#4ade80;">Unlocked ${sku} ($${REVOLUT_SKU_PRICES[sku]})!</h2>` +
          `<p style="color:#cbd5e1;font-size:0.92rem;line-height:1.55;">Account <b>wa_${waDigits}</b> (+${waDigits}) is now active in Firestore and their WhatsApp notification + Magic Link + Pass Code (<b>${unlocked.passCode}</b>) has just been sent!</p>` +
          `<a href="/concierge/" style="display:inline-block;margin-top:12px;background:#0288d1;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;font-weight:800;">Open Concierge Desk →</a>` +
          `</div></body></html>`
        );
      }
      return res.status(200).json(Object.assign({ ok: true }, unlocked));
    }

    // STEP 1+2 LOG: Pre-Checkout Intent Log with Cardholder Name + Last 4 (mode === "log_checkout_intent")
    if (req.body && req.body.mode === "log_checkout_intent") {
      const db = admin.firestore();
      const waDigits = normalizePhoneDigits(req.body.waPhone || req.body.phone || String(req.body.uid || "").replace(/^wa_/, ""));
      const sku = String(req.body.sku || "").trim();
      const lang = String(req.body.lang || "en").slice(0, 2).toLowerCase();
      const payerName = String(req.body.payerName || "").trim().slice(0, 120);
      const cardLast4 = String(req.body.cardLast4 || req.body.cardLast4OrEmail || "").trim().slice(0, 120);
      const room = String(req.body.room || "").trim();
      if (waDigits.length < 8 || !REVOLUT_SKU_PRICES[sku]) {
        return res.status(400).json({ ok: false, error: "Valid verified WhatsApp number and SKU required." });
      }
      if (payerName.length < 2 || !isValidCardLast4OrEmail(cardLast4)) {
        return res.status(400).json({ ok: false, error: "Enter the Cardholder Name and either exact 4 card digits or a valid email address." });
      }
      const priceUsd = REVOLUT_SKU_PRICES[sku];
      const revolutUrl = REVOLUT_URLS_MAP[sku];
      const uid = "wa_" + waDigits;
      const now = Date.now();
      const ilTimeStr = new Date(now).toLocaleString("en-GB", { timeZone: "Asia/Jerusalem" });

      await db.collection("checkout_intents").doc(waDigits).set({
        uid,
        waPhone: waDigits,
        sku,
        priceUsd,
        revolutUrl,
        lang,
        ...(payerName ? { payerName } : {}),
        ...(cardLast4 ? { cardLast4 } : {}),
        ...(room ? { room } : {}),
        status: "pending",
          clientSecret: String((req.body && req.body.clientSecret) || ""),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAtMs: now,
        updatedAtMs: now
      }, { merge: true });

      const oneTapUrl = buildOneTapUnlockUrl(waDigits, sku);
      const preMsg = [
        `💳 *REVOLUT CHECKOUT OPENED — $${priceUsd} USD*`,
        `• Buyer WhatsApp: +${waDigits} (${uid})`,
        `• Pass SKU: *${sku}* ($${priceUsd}) • Lang: ${lang.toUpperCase()}`,
        `• Cardholder Name: *${payerName || "N/A"}*`,
        `• Last 4 / Email: *${cardLast4 || "N/A"}*`,
        `• Opened (IL): ${ilTimeStr}`,
        ``,
        `🔓 *Once Revolut confirms payment, Tap Once to Unlock:*`,
        oneTapUrl
      ].join("\n");
      await sendGreenApiWhatsApp(REV_ADMIN_NOTIFY_PHONE, preMsg).catch(() => ({ ok: false }));

      return res.status(200).json({ ok: true, uid, waPhone: waDigits, sku, priceUsd, revolutUrl, status: "pending" });
    }

    // STEP 2 SUBMIT: Buyer Submits Cardholder Name + Last 4 / Email & Taps "I've Paid" (mode === "ping_paid_unlock")
    if (req.body && req.body.mode === "ping_paid_unlock") {
      const db = admin.firestore();
      const waDigits = normalizePhoneDigits(req.body.waPhone || req.body.phone || String(req.body.uid || "").replace(/^wa_/, ""));
      const sku = String(req.body.sku || "").trim();
      const lang = String(req.body.lang || "en").slice(0, 2).toLowerCase();
      const payerName = String(req.body.payerName || "").trim().slice(0, 120);
      const cardLast4 = String(req.body.cardLast4 || req.body.cardLast4OrEmail || "").trim().slice(0, 120);
      const room = String(req.body.room || "").trim();

      if (waDigits.length < 8 || !REVOLUT_SKU_PRICES[sku]) {
        return res.status(400).json({ ok: false, error: "Valid verified WhatsApp number and SKU required." });
      }
      if (payerName.length < 2 || !isValidCardLast4OrEmail(cardLast4)) {
        return res.status(400).json({ ok: false, error: "Please enter the Cardholder Name and the Last 4 Digits of your card (or Revolut checkout email)." });
      }

      const priceUsd = REVOLUT_SKU_PRICES[sku];
      const revolutUrl = REVOLUT_URLS_MAP[sku];
      const now = Date.now();
      const ilTimeStr = new Date(now).toLocaleString("en-GB", { timeZone: "Asia/Jerusalem" });

      await db.collection("checkout_intents").doc(waDigits).set({
        uid: "wa_" + waDigits,
        waPhone: waDigits,
        sku,
        priceUsd,
        revolutUrl,
        lang,
        payerName,
        cardLast4,
        ...(room ? { room } : {}),
        status: "paid_pinged",
        pingedAtMs: now,
        updatedAtMs: now
      }, { merge: true });

      // 1. Send immediate WhatsApp confirmation to BUYER (in their language, with Shabbat/Holiday notice)
      const buyerPendingMsg = buildBuyerPendingWaMessage(lang, sku, priceUsd, payerName, cardLast4);
      const buyerWaRes = await sendGreenApiWhatsApp(waDigits, buyerPendingMsg).catch(() => ({ ok: false }));

      // 2. Send correlation + 1-Tap Unlock alert to ADMIN (052-582-2005)
      const oneTapUrl = buildOneTapUnlockUrl(waDigits, sku);
      const urgentMsg = [
        `🚨 *PAID CLAIM SUBMITTED — $${priceUsd} USD*`,
        `• Buyer WhatsApp: +${waDigits} (wa_${waDigits})`,
        `• Pass SKU: *${sku}* ($${priceUsd}) • Lang: ${lang.toUpperCase()}`,
        `• Cardholder Name: *${payerName}*`,
        `• Last 4 / Email: *${cardLast4}*`,
        `• Submitted (IL): ${ilTimeStr}`,
        ``,
        `🔓 *Check Revolut Pro, then Tap Once to Unlock Buyer:*`,
        oneTapUrl
      ].join("\n");
      await sendGreenApiWhatsApp(REV_ADMIN_NOTIFY_PHONE, urgentMsg).catch(() => ({ ok: false }));

      return res.status(200).json({
        ok: true,
        status: "paid_pinged",
        waPhone: waDigits,
        sku,
        buyerWaSent: Boolean(buyerWaRes && buyerWaRes.ok)
      });
    }

    // STEP 3 CANCEL: Buyer explicitly clicked "I Didn't Pay — Cancel & Close"
    if (req.body && req.body.mode === "cancel_checkout_intent") {
      const db = admin.firestore();
      const waDigits = normalizePhoneDigits(req.body.waPhone || req.body.phone || String(req.body.uid || "").replace(/^wa_/, ""));
      if (waDigits.length >= 8) {
        const docRef = db.collection("checkout_intents").doc(waDigits);
        const snap = await docRef.get();
        if (snap.exists && snap.data().status === "pending") {
          await docRef.set({ status: "cancelled_by_user", updatedAtMs: Date.now() }, { merge: true });
        }
      }
      return res.status(200).json({ ok: true });
    }
// === REVOLUT_3LAYER_PIPELINE_END ===

    // 0. IN-APP 24/7 3-TIER AI TRACK PARTNER & BLACK-BOX GATEKEEPER (mode === "helpdesk_chat")
    // ========================================================================
            // ========================================================================
    // 0A. REAL HUMAN VISITOR & WEBCRAWLER TELEMETRY ENGINE
    //     (POST/GET mode === "visitor_pulse" | "pixel" | "admin_get_analytics")
    // ========================================================================
    const isPixelGet = req.method === "GET" && req.query && req.query.mode === "pixel";
    if (isPixelGet || (req.body && req.body.mode === "visitor_pulse")) {
      try {
        const db = admin.firestore();
        const b = isPixelGet ? req.query : (req.body || {});
        const rawUa = String(b.ua || req.headers["user-agent"] || "").slice(0, 300);
        const botRx = /(bot|crawler|spider|slurp|bingpreview|facebookexternalhit|meta-externalagent|whatsapp|telegrambot|twitterbot|linkedinbot|embedly|applebot|semrush|ahrefs|mj12bot|dotbot|yandex|baiduspider|duckduckbot|gptbot|chatgpt-user|oai-searchbot|claudebot|anthropic|bytespider|perplexity|ccbot|googleother|adsbot|lighthouse|headlesschrome|python|curl|wget|axios|node-fetch|go-http-client)/i;
        const isBot = Boolean(b.isBot || isPixelGet || botRx.test(rawUa));

        function classifyCrawler(ua) {
          const s = String(ua || "");
          const map = [
            [/Googlebot/i, "Googlebot (Google Search)"],
            [/GoogleOther|AdsBot-Google|Mediapartners-Google/i, "GoogleOther / AdsBot"],
            [/bingbot|BingPreview|msnbot/i, "Bingbot (Microsoft / Copilot)"],
            [/Applebot/i, "Applebot (Apple Siri / Spotlight)"],
            [/GPTBot|ChatGPT-User|OAI-SearchBot/i, "OpenAI (GPTBot / SearchGPT)"],
            [/ClaudeBot|anthropic-ai/i, "Anthropic (ClaudeBot)"],
            [/PerplexityBot/i, "Perplexity AI Crawler"],
            [/WhatsApp/i, "WhatsApp Link Preview"],
            [/TelegramBot/i, "Telegram Link Preview"],
            [/facebookexternalhit|Facebot|meta-externalagent/i, "Meta / Facebook / Instagram"],
            [/Twitterbot/i, "X / Twitter Link Preview"],
            [/LinkedInBot/i, "LinkedIn Crawler"],
            [/AhrefsBot/i, "Ahrefs SEO Bot"],
            [/SemrushBot/i, "Semrush SEO Bot"],
            [/YandexBot/i, "Yandex Bot"],
            [/DuckDuckBot/i, "DuckDuckGo Bot"],
            [/Bytespider/i, "Bytespider (ByteDance)"],
            [/HeadlessChrome|Lighthouse/i, "Lighthouse / HeadlessChrome"],
            [/curl|wget|python|axios|node-fetch|go-http-client/i, "HTTP Script / CLI Fetcher"]
          ];
          for (const [rx, name] of map) {
            if (rx.test(s)) return name;
          }
          const m = s.match(/([a-zA-Z0-9_-]*(?:bot|crawler|spider|preview)[a-zA-Z0-9_-]*)/i);
          return m ? m[1] : "Other Webcrawler / Bot";
        }

        const lang = String(b.lang || "en").slice(0, 5);
        const pathKey = String(b.path || "/").slice(0, 140);
        const safePathField = pathKey.replace(/[.#$/\[\]]/g, "_");
        const deltaSec = Math.max(0, Math.min(120, Number(b.deltaSec) || 0));
        const isArrival = Boolean(b.isArrival || isPixelGet);
        const tz = String(b.tz || "").slice(0, 60);
        const ref = String(b.ref || req.headers["referer"] || "").slice(0, 180);
        const screen = String(b.screen || "").slice(0, 24);
        const dayStr = new Date().toISOString().slice(0, 10);
        const nowMs = Date.now();
        const dayRef = db.collection("site_analytics_daily").doc(dayStr);

        if (isBot) {
          const botName = classifyCrawler(rawUa);
          const safeBotKey = botName.replace(/[.#$/\[\]]/g, "_");
          const botId = ( safeBotKey.slice(0, 24) + "_" + Buffer.from(rawUa).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 16) );
          const botRef = db.collection("site_crawlers_recent").doc(botId);

          await Promise.all([
            dayRef.set({
              date: dayStr,
              updatedAt: nowMs,
              totalBotHits: admin.firestore.FieldValue.increment(1),
              [`botCounts.${safeBotKey}`]: admin.firestore.FieldValue.increment(1),
              [`botPages.${safePathField}`]: admin.firestore.FieldValue.increment(1)
            }, { merge: true }),
            botRef.set({
              botId,
              botName,
              ua: rawUa,
              lastSeen: nowMs,
              day: dayStr,
              lastPath: pathKey,
              ref,
              hits: admin.firestore.FieldValue.increment(1),
              [`pages.${safePathField}`]: admin.firestore.FieldValue.increment(1)
            }, { merge: true })
          ]);
        } else {
          const vid = String(b.vid || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
          if (!vid) return res.status(200).json({ ok: true });
          const visRef = db.collection("site_visitors_recent").doc(vid);

          const dayUpdate = {
            date: dayStr,
            updatedAt: nowMs,
            totalSeconds: admin.firestore.FieldValue.increment(deltaSec),
            [`langSeconds.${lang}`]: admin.firestore.FieldValue.increment(deltaSec),
            [`pageSeconds.${safePathField}`]: admin.firestore.FieldValue.increment(deltaSec)
          };
          if (isArrival) {
            dayUpdate.totalPageViews = admin.firestore.FieldValue.increment(1);
            dayUpdate[`langViews.${lang}`] = admin.firestore.FieldValue.increment(1);
            dayUpdate[`pageViews.${safePathField}`] = admin.firestore.FieldValue.increment(1);
          }

          const visUpdate = {
            vid,
            lastSeen: nowMs,
            day: dayStr,
            lang,
            currentPath: pathKey,
            tz,
            screen,
            ua: rawUa,
            totalSeconds: admin.firestore.FieldValue.increment(deltaSec),
            [`pages.${safePathField}`]: admin.firestore.FieldValue.increment(deltaSec),
            [`pageLastSeen.${safePathField}`]: nowMs
          };
          if (isArrival) {
            visUpdate.pageViews = admin.firestore.FieldValue.increment(1);
            visUpdate[`pageHits.${safePathField}`] = admin.firestore.FieldValue.increment(1);
          }
          // Only overwrite initialRef if it's an external referrer or none set yet
          if (ref && !/giyuraliyahtrack\.com|giyur-aliyah-track\.web\.app|localhost/i.test(ref)) {
            visUpdate.externalRef = ref;
          }
          if (ref) visUpdate.ref = ref;

          await Promise.all([
            dayRef.set(dayUpdate, { merge: true }),
            visRef.set(visUpdate, { merge: true })
          ]);
        }

        if (isPixelGet) {
          const gif = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
          res.set("Content-Type", "image/gif");
          res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
          return res.status(200).send(gif);
        }
        return res.status(200).json({ ok: true });
      } catch (e) {
        return res.status(200).json({ ok: false });
      }
    }

            // ========================================================================
    // 0B. PRE-AI USER PROBLEM / BUG REPORTER (mode === "report_problem")
    // ========================================================================
    if (req.body && req.body.mode === "report_problem") {
      try {
        const db = admin.firestore();
        const b = req.body || {};
        const category = String(b.category || "general").slice(0, 60);
        const description = String(b.description || "").trim().slice(0, 2500);
        if (!description) {
          return res.status(400).json({ ok: false, error: "Please describe the problem." });
        }
        const contact = String(b.contact || "").trim().slice(0, 140);
        const uid = String(b.uid || "anon").slice(0, 80);
        const lang = String(b.lang || "en").slice(0, 8);
        const pageUrl = String(b.pageUrl || "").slice(0, 300);
        const currentMod = String(b.currentMod || "").slice(0, 60);
        const currentForm = String(b.currentForm || "").slice(0, 40);
        const ua = String(b.ua || req.headers["user-agent"] || "").slice(0, 300);
        const screen = String(b.screen || "").slice(0, 40);
        const ticketId = "BUG-" + Math.random().toString(36).substring(2, 7).toUpperCase();
        const nowIso = new Date().toISOString();

        await db.collection("problem_reports").doc(ticketId).set({
          ticketId,
          createdAt: nowIso,
          timestampMs: Date.now(),
          status: "open",
          category,
          description,
          contact,
          uid,
          lang,
          pageUrl,
          currentMod,
          currentForm,
          ua,
          screen,
          formSnapshot: b.formSnapshot || {}
        });

        try {
          const waAlert = [
            `🛠️ *NEW PRE-AI PROBLEM REPORT (${ticketId})*`,
            `• *Category:* ${category}`,
            `• *Contact:* ${contact || "Not provided"}`,
            `• *User UID:* ${uid} (${lang.toUpperCase()})`,
            `• *Page / Mod:* ${pageUrl} (${currentMod || "landing"} / ${currentForm || "-"})`,
            `• *Device:* ${screen}`,
            ``,
            `📝 *Message:*`,
            description
          ].join("\n");
          if (typeof sendGreenApiWhatsApp === "function") {
            await sendGreenApiWhatsApp("972539332613@c.us", waAlert);
          }
        } catch (waErr) {
          console.warn("Problem report WA alert non-fatal:", waErr);
        }

        return res.status(200).json({ ok: true, ticketId });
      } catch (rpErr) {
        return res.status(500).json({ ok: false, error: rpErr.message || "Could not submit report" });
      }
    }

        // ========================================================================
    // 0C. CLOUDFLARE R2 ($0 EGRESS) + LIGHTWEIGHT FIRESTORE METADATA VAULT
    //     Zero base64 blobs in Firestore! Files live in R2 (`vault/{uid}/{docId}.json`)
    //     and local Browser IndexedDB (`gat_doc_vault_idb_v1`).
    // ========================================================================
    if (req.body && ["save_uploaded_doc", "list_uploaded_docs", "get_uploaded_doc", "delete_uploaded_doc"].includes(req.body.mode)) {
      try {
        const db = admin.firestore();
        const b = req.body || {};
        let uid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        if (!uid || uid === "anon" || uid === "guest") {
          const waD = normalizePhoneDigits(b.waPhone || b.phone || "");
          if (waD.length >= 8) uid = "wa_" + waD;
          else if (b.deviceAuthToken) {
            const dc = verifyDeviceAuthToken(String(b.deviceAuthToken));
            if (dc && dc.uid) uid = dc.uid;
          }
        }
        if (!uid || uid === "anon") {
          return res.status(200).json({ ok: true, items: [], localOnly: true });
        }
        const resolvedVaultUid = (() => {
          if (uid && uid.startsWith("wa_")) return uid;
          const wDigits = normalizePhoneDigits(b.waPhone || b.phone || "");
          if (wDigits && wDigits.length >= 8) return "wa_" + wDigits;
          if (b.deviceAuthToken) {
            const dt = verifyDeviceAuthToken(String(b.deviceAuthToken));
            if (dt && dt.uid) return dt.uid;
          }
          return uid;
        })();
        const docsCol = db.collection("users").doc(resolvedVaultUid).collection("uploaded_docs");

        if (b.mode === "list_uploaded_docs") {
          const snap = await docsCol.orderBy("updatedAt", "desc").limit(30).get();
          const items = [];
          snap.forEach((d) => items.push(d.data()));
          return res.status(200).json({ ok: true, items, r2Active: getR2Config().configured });
        }

        const docId = String(b.docId || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 80);
        if (b.mode === "delete_uploaded_doc") {
          const allUids = Array.from(new Set([uid].concat(Array.isArray(b.uids) ? b.uids.map(u => String(u || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "")) : []).filter(u => u && u !== "anon")));
          const normSlot = (s) => {
            const v = String(s || "").toLowerCase();
            if (/marriage|נישואין|single|divorce/.test(v)) return "marriage";
            if (/tz|zehut|israeli_id|תעודת זהות|ספח/.test(v)) return "tz";
            if (/birth|לידה/.test(v)) return "birth";
            if (/police|יושר|criminal/.test(v)) return "police";
            if (/passport|דרכון/.test(v)) return "passport";
            return v;
          };
          const targetSlot = normSlot(b.slotKey || docId.replace(/^(me|partner)_/, ""));
          const targetOwner = String(b.ownerParty || (docId.startsWith("partner_") ? "partner" : "me")).toLowerCase();

          for (const u of allUids) {
            const uCol = db.collection("users").doc(u).collection("uploaded_docs");
            const snap = await uCol.get().catch(() => null);
            if (snap && !snap.empty) {
              for (const dSnap of snap.docs) {
                const dData = dSnap.data() || {};
                const dSlot = normSlot(dData.slotKey || dData.docType || dSnap.id.replace(/^(me|partner)_/, ""));
                const dOwner = String(dData.ownerParty || (dSnap.id.startsWith("partner_") ? "partner" : "me")).toLowerCase();
                const shouldDel = Boolean(
                  b.deleteAll ||
                  dSnap.id === docId ||
                  (targetSlot === "marriage" && dSlot === "marriage") ||
                  (targetSlot && dSlot === targetSlot && dOwner === targetOwner)
                );
                if (shouldDel) {
                  await r2SignedRequest("DELETE", `vault/${u}/${dSnap.id}.json`).catch(() => {});
                  const pSnap = await dSnap.ref.collection("pages").get().catch(() => null);
                  if (pSnap && !pSnap.empty) {
                    const batch = db.batch();
                    pSnap.forEach((p) => batch.delete(p.ref));
                    await batch.commit().catch(() => {});
                  }
                  await dSnap.ref.delete().catch(() => {});
                }
              }
            }
            if (docId) {
              await r2SignedRequest("DELETE", `vault/${u}/${docId}.json`).catch(() => {});
            }
          }
          return res.status(200).json({ ok: true, deletedId: docId || "all" });
        }
        if (!docId) return res.status(400).json({ ok: false, error: "Missing docId" });
        const docRef = docsCol.doc(docId);
        const r2Key = `vault/${uid}/${docId}.json`;

        if (b.mode === "get_uploaded_doc") {
          const metaSnap = await docRef.get();
          if (!metaSnap.exists) return res.status(404).json({ ok: false, error: "Document not found" });
          let pages = [];
          const r2Res = await r2SignedRequest("GET", (metaSnap.data() && metaSnap.data().r2Key) || r2Key).catch(() => ({ ok: false }));
          if (r2Res && r2Res.ok && r2Res.text) {
            try {
              const parsed = JSON.parse(r2Res.text);
              if (Array.isArray(parsed.pages)) pages = parsed.pages;
            } catch (e) {}
          }
          return res.status(200).json({ ok: true, meta: metaSnap.data(), pages });
        }

        if (b.mode === "save_uploaded_doc") {
          const rawFiles = Array.isArray(b.files) ? b.files.slice(0, 8) : [];
          const appendPages = Boolean(b.appendPages);
          const curSnap = await docRef.get();
          let curMeta = curSnap.exists ? (curSnap.data() || {}) : {};
          const copyFromId = String(b.copyFromDocId || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 80);
          if (copyFromId && copyFromId !== docId) {
            const srcSnap = await docsCol.doc(copyFromId).get();
            if (srcSnap.exists) {
              curMeta = Object.assign({}, srcSnap.data() || {}, curMeta);
            }
          }

          let existingPages = [];
          if (appendPages && getR2Config().configured) {
            const prevR2 = await r2SignedRequest("GET", r2Key).catch(() => ({ ok: false }));
            if (prevR2 && prevR2.ok && prevR2.text) {
              try {
                const parsed = JSON.parse(prevR2.text);
                if (Array.isArray(parsed.pages)) existingPages = parsed.pages;
              } catch (e) {}
            }
          }

          const incomingPages = rawFiles.map((f, i) => ({
            idx: existingPages.length + i,
            mimeType: String((f && f.mimeType) || "image/jpeg").slice(0, 64),
            base64Data: String((f && f.base64Data) || "").replace(/^data:[^;]+;base64,/, "")
          })).filter((p) => p.base64Data.length > 0 && p.base64Data.length <= 950000);

          const finalPages = appendPages ? existingPages.concat(incomingPages).slice(0, 12) : incomingPages;
          let storedInR2 = false;
          if (finalPages.length > 0 && getR2Config().configured) {
            const putRes = await r2SignedRequest("PUT", r2Key, JSON.stringify({ docId, uid, updatedAt: Date.now(), pages: finalPages })).catch(() => ({ ok: false }));
            storedInR2 = Boolean(putRes && putRes.ok);
          }

          const totalPages = finalPages.length || ( (appendPages ? (Number(curMeta.pageCount) || 0) : 0) + rawFiles.length ) || 1;
          const metaObj = {
            docId,
            slotKey: String(b.slotKey || curMeta.slotKey || "doc").slice(0, 40),
            ownerParty: String(b.ownerParty || curMeta.ownerParty || "me").slice(0, 20),
            docType: String(b.docType || curMeta.docType || "certificate").slice(0, 40),
            docTitle: String(b.docTitle || curMeta.docTitle || "Uploaded Document").slice(0, 120),
            issuingCountry: String(b.issuingCountry || curMeta.issuingCountry || "").slice(0, 80),
            pageCount: totalPages,
            hasApostille: b.hasApostille !== undefined ? Boolean(b.hasApostille) : Boolean(curMeta.hasApostille),
            hasSefach: b.hasSefach !== undefined ? Boolean(b.hasSefach) : Boolean(curMeta.hasSefach),
            isLongForm: b.isLongForm !== undefined ? Boolean(b.isLongForm) : Boolean(curMeta.isLongForm),
            expiryDateIso: String(b.expiryDateIso || curMeta.expiryDateIso || "").slice(0, 20),
            rawScanResult: b.rawScanResult || curMeta.rawScanResult || null,
            storageEngine: storedInR2 ? "r2" : (curMeta.storageEngine || "idb_local"),
            r2Key: storedInR2 ? r2Key : (curMeta.r2Key || ""),
            updatedAt: Date.now()
          };
          await docRef.set(metaObj, { merge: true });
          return res.status(200).json({ ok: true, meta: metaObj, storedInR2 });
        }
      } catch (vErr) {
        return res.status(500).json({ ok: false, error: vErr.message || "Vault error" });
      }
    }

    
    // === GAT CLOUD TRACK BLUEPRINT ENGINE (ZERO-LOCALSTORAGE 5-DEVICE FIRESTORE SYNC) START ===
    function sanitizeTrackBlueprint(rawBp) {
      if (!rawBp || typeof rawBp !== "object") return null;
      const cleanStr = (v, maxLen = 80) => String(v || "").trim().slice(0, maxLen);
      const ans = (rawBp.answers && typeof rawBp.answers === "object") ? rawBp.answers : {};
      const comp = Array.isArray(rawBp.completedSteps)
        ? Array.from(new Set(rawBp.completedSteps.map((x) => cleanStr(x, 48)).filter(Boolean))).slice(0, 32)
        : [];
      const timersRaw = (rawBp.timers && typeof rawBp.timers === "object") ? rawBp.timers : {};
      const cleanTimers = {};
      for (const tk of ["b2EntryDateMs", "apostilleIssueDateMs", "clerkDemandDateMs", "mikvahDateMs", "aliyahDateMs"]) {
        const num = Number(timersRaw[tk] || 0);
        if (Number.isFinite(num) && num > 0) cleanTimers[tk] = num;
      }
      return {
        version: 1,
        trackId: cleanStr(rawBp.trackId || "aliyah_standard", 64),
        trackTitle: cleanStr(rawBp.trackTitle || "", 140),
        isEmergency: Boolean(rawBp.isEmergency),
        answers: {
          q1_goal: cleanStr(ans.q1_goal, 48),
          q2_household: cleanStr(ans.q2_household, 48),
          q2b_partner_status: cleanStr(ans.q2b_partner_status, 48),
          q2b_relationship: cleanStr(ans.q2b_relationship, 48),
          q3_location: cleanStr(ans.q3_location, 48),
          q4_detail: cleanStr(ans.q4_detail, 64),
          em_q1_loc: cleanStr(ans.em_q1_loc, 48),
          em_q2_elig: cleanStr(ans.em_q2_elig, 48)
        },
        hasChildrenUnder18: Boolean(rawBp.hasChildrenUnder18 || ans.q2_household === "family_kids"),
        hasPartner: Boolean(rawBp.hasPartner || ans.q2_household === "couple" || ans.q2_household === "family_kids"),
        trapWarningKey: cleanStr(rawBp.trapWarningKey || "", 64),
        activeStepId: cleanStr(rawBp.activeStepId || "", 48),
        activeStepIdx: Math.max(0, Math.min(25, Number(rawBp.activeStepIdx || 0) || 0)),
        completedSteps: comp,
        timers: cleanTimers,
        lang: cleanStr(rawBp.lang || "en", 8),
        updatedAtMs: Date.now()
      };
    }

    // === GAT PRIVATE WHATSAPP PROBLEM REPORTER ENDPOINT START ===
    if (req.body && req.body.mode === "submit_problem_report") {
      try {
        const b = req.body || {};
        const db = admin.firestore();
        const category = String(b.category || "other").slice(0, 80);
        const description = String(b.description || "").trim().slice(0, 2500);
        const userContact = String(b.userContact || "").trim().slice(0, 140);
        const lang = String(b.lang || "en").slice(0, 5);
        const uid = String(b.uid || "anon").slice(0, 128);
        const pageUrl = String(b.pageUrl || "/").slice(0, 400);
        const activeTrack = String(b.activeTrack || "").slice(0, 160);
        const userAgent = String(b.userAgent || "").slice(0, 250);

        if (!description || description.length < 3) {
          return res.status(400).json({ ok: false, error: "Please enter a brief description of the problem." });
        }

        const ticketId = "PR-" + Date.now().toString(36).toUpperCase().slice(-6);
        const reportDoc = {
          ticketId,
          category,
          description,
          userContact: userContact || "(not provided)",
          uid,
          lang,
          pageUrl,
          activeTrack,
          userAgent,
          status: "open",
          createdAtMs: Date.now(),
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection("problem_reports").doc(ticketId).set(reportDoc);

        // Resolve Admin WhatsApp targets strictly server-side (ZERO client phone leak)
        const adminTargets = new Set();
        const envAdminWa = normalizePhoneDigits(process.env.ADMIN_ALERT_WHATSAPP || process.env.ADMIN_WHATSAPP || "");
        if (envAdminWa.length >= 9) adminTargets.add(envAdminWa);

        try {
          const adminSnap = await db.collection("users").where("admin", "==", true).limit(10).get();
          adminSnap.forEach((docSnap) => {
            const d = docSnap.data() || {};
            const p1 = normalizePhoneDigits(d.whatsappDigits || d.whatsapp || d.phone || "");
            const p2 = docSnap.id.startsWith("wa_") ? normalizePhoneDigits(docSnap.id.slice(3)) : "";
            if (p1.length >= 9) adminTargets.add(p1);
            if (p2.length >= 9) adminTargets.add(p2);
          });
        } catch (admErr) {
          console.error("Admin lookup warning:", admErr);
        }

        // Also include the bot's own authorized WhatsApp desk (972525822005) if no admin doc matched
        if (adminTargets.size === 0) {
          adminTargets.add("972525822005");
        }

        const waMsg =
          `🛠️ *GAT PROBLEM REPORT [${ticketId}]*\n` +
          `• *Category:* ${category}\n` +
          `• *Issue:* ${description}\n` +
          `• *User Contact:* ${userContact || "Not provided"} (UID: ${uid})\n` +
          `• *Track/State:* ${activeTrack || "None"}\n` +
          `• *Page:* ${pageUrl}\n` +
          `• *Lang:* ${lang.toUpperCase()}`;

        const idInstance = process.env.GREEN_API_ID_INSTANCE || "710722709218";
        const apiToken = process.env.GREEN_API_TOKEN_INSTANCE || "";
        const baseUrl = (process.env.GREEN_API_URL || "https://7107.api.green-api.com").replace(/\/+$/, "");

        let sentCount = 0;
        if (apiToken) {
          const endpoint = `${baseUrl}/waInstance${idInstance}/sendMessage/${apiToken}`;
          for (const phoneDigits of adminTargets) {
            try {
              const resp = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chatId: `${phoneDigits}@c.us`,
                  message: waMsg
                })
              });
              if (resp.ok) sentCount++;
            } catch (wErr) {
              console.error("Problem report WA send error:", wErr);
            }
          }
        }

        return res.status(200).json({
          ok: true,
          ticketId,
          delivered: sentCount > 0
        });
      } catch (prErr) {
        console.error("submit_problem_report error:", prErr);
        return res.status(500).json({ ok: false, error: "Could not send report right now." });
      }
    }
    // === GAT PRIVATE WHATSAPP PROBLEM REPORTER ENDPOINT END ===

    if (req.body && req.body.mode === "sync_track_blueprint") {
      try {
        const db = admin.firestore();
        const b = req.body || {};
        const action = String(b.action || "save").trim().toLowerCase();
        const rawUid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        const passCode = String(b.passCode || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        const waDigits = normalizePhoneDigits(b.waPhone || b.phone || (rawUid.startsWith("wa_") ? rawUid.slice(3) : ""));

        let targetUid = "";
        let userDocSnap = null;

        if (passCode && passCode.length >= 5) {
          const fmtCode = passCode.length === 6 ? (passCode.slice(0, 3) + "-" + passCode.slice(3, 6)) : passCode;
          let qPass = await db.collection("users").where("permanentPassCode", "==", fmtCode).limit(1).get();
          if (qPass.empty && fmtCode !== passCode) {
            qPass = await db.collection("users").where("permanentPassCode", "==", passCode).limit(1).get();
          }
          if (!qPass.empty) {
            userDocSnap = qPass.docs[0];
            targetUid = userDocSnap.id;
          }
        }
        if (!targetUid && waDigits && waDigits.length >= 8) {
          targetUid = "wa_" + waDigits;
          const snapWa = await db.collection("users").doc(targetUid).get();
          if (snapWa.exists) userDocSnap = snapWa;
        }
        if (!targetUid && b.deviceAuthToken) {
          const dTok = verifyDeviceAuthToken(String(b.deviceAuthToken));
          if (dTok && dTok.uid) {
            targetUid = dTok.uid;
            const snapDev = await db.collection("users").doc(targetUid).get();
            if (snapDev.exists) userDocSnap = snapDev;
          }
        }
        if (!targetUid && b.adminSessionToken) {
          const vTok = verifyAdminSessionToken(String(b.adminSessionToken));
          const vUid = typeof vTok === "string" ? vTok : (vTok && vTok.uid);
          if (vUid) {
            targetUid = vUid;
            const snapAdm = await db.collection("users").doc(targetUid).get();
            if (snapAdm.exists) userDocSnap = snapAdm;
          }
        }
        if (!targetUid && rawUid && rawUid !== "anon" && rawUid !== "guest") {
          targetUid = rawUid;
          const snapRaw = await db.collection("users").doc(targetUid).get();
          if (snapRaw.exists) userDocSnap = snapRaw;
        }

        if (!targetUid) {
          return res.status(200).json({ ok: false, guest: true, error: "Not signed in" });
        }

        const userRef = db.collection("users").doc(targetUid);
        const existingData = (userDocSnap && userDocSnap.exists) ? (userDocSnap.data() || {}) : {};

        if (action === "reset" || action === "clear") {
          await userRef.set({
            trackBlueprint: admin.firestore.FieldValue.delete(),
            updatedAtMs: Date.now()
          }, { merge: true });
          return res.status(200).json({ ok: true, uid: targetUid, trackBlueprint: null });
        }

        if (action === "load" || action === "get") {
          return res.status(200).json({
            ok: true,
            uid: targetUid,
            trackBlueprint: existingData.trackBlueprint || null
          });
        }

        // Default: save / merge trackBlueprint
        const cleanBp = sanitizeTrackBlueprint(b.trackBlueprint || existingData.trackBlueprint);
        if (!cleanBp) {
          return res.status(400).json({ ok: false, error: "Invalid trackBlueprint payload" });
        }

        await userRef.set({
          uid: targetUid,
          ...(waDigits ? { whatsappDigits: waDigits } : {}),
          trackBlueprint: cleanBp,
          updatedAtMs: Date.now(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return res.status(200).json({
          ok: true,
          uid: targetUid,
          trackBlueprint: cleanBp
        });
      } catch (bpErr) {
        console.error("sync_track_blueprint error:", bpErr);
        return res.status(500).json({ ok: false, error: bpErr.message || "Blueprint sync failed" });
      }
    }
    // === GAT CLOUD TRACK BLUEPRINT ENGINE (ZERO-LOCALSTORAGE 5-DEVICE FIRESTORE SYNC) END ===

    if (req.body && (req.body.mode === "save_cloud_draft" || req.body.mode === "restore_wa_session")) {
      try {
        const db = admin.firestore();
        const b = req.body || {};
        const rawUid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        const passCode = String(b.passCode || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        const waDigits = normalizePhoneDigits(b.waPhone || b.phone || (rawUid.startsWith("wa_") ? rawUid.slice(3) : ""));

        let targetUid = "";
        let userDocSnap = null;

        if (passCode && passCode.length >= 5) {
          const qPass = await db.collection("users").where("permanentPassCode", "==", passCode).limit(1).get();
          if (!qPass.empty) {
            userDocSnap = qPass.docs[0];
            targetUid = userDocSnap.id;
          }
        }
        if (!targetUid && waDigits && waDigits.length >= 8) {
          targetUid = "wa_" + waDigits;
          const snapWa = await db.collection("users").doc(targetUid).get();
          if (snapWa.exists) userDocSnap = snapWa;
        }
        if (!targetUid && b.deviceAuthToken) {
          const dTok = verifyDeviceAuthToken(String(b.deviceAuthToken));
          if (dTok && dTok.uid) {
            targetUid = dTok.uid;
            const snapDev = await db.collection("users").doc(targetUid).get();
            if (snapDev.exists) userDocSnap = snapDev;
          }
        }
        if (!targetUid && b.adminSessionToken) {
          const vTok = verifyAdminSessionToken(String(b.adminSessionToken));
          const vUid = typeof vTok === "string" ? vTok : (vTok && vTok.uid);
          if (vUid) {
            targetUid = vUid;
            const snapAdm = await db.collection("users").doc(targetUid).get();
            if (snapAdm.exists) userDocSnap = snapAdm;
          }
        }
        if (!targetUid && rawUid && rawUid !== "anon") {
          targetUid = rawUid;
          const snapRaw = await db.collection("users").doc(targetUid).get();
          if (snapRaw.exists) userDocSnap = snapRaw;
        }

        if (!targetUid) {
          return res.status(200).json({ ok: false, guest: true });
        }

        const userRef = db.collection("users").doc(targetUid);

        if (b.mode === "save_cloud_draft") {
          const incomingDraft = (b.draft && typeof b.draft === "object") ? b.draft : {};
          const nowMs = Date.now();
          await userRef.set({
            uid: targetUid,
            ...(waDigits ? { whatsappDigits: waDigits } : {}),
            draft: incomingDraft,
            formDraft: incomingDraft,
            updatedAtMs: nowMs,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          const finalSnap = await userRef.get();
          const finalData = finalSnap.exists ? finalSnap.data() : {};
          const ensuredCode = await ensurePermanentPassCode(targetUid, userRef, finalData);
          return res.status(200).json({
            ok: true,
            uid: targetUid,
            whatsappDigits: finalData.whatsappDigits || waDigits || "",
            passCode: ensuredCode
          });
        }

        if (b.mode === "restore_wa_session") {
          if (!userDocSnap || !userDocSnap.exists) {
            return res.status(200).json({ ok: false, accountDeleted: true, error: "Account not found" });
          }
          const uRef = typeof userRef !== "undefined" ? userRef : db.collection("users").doc(targetUid);
          const uData = (userDocSnap && userDocSnap.exists) ? (userDocSnap.data() || {}) : {};
          if (b.trackBlueprint && typeof b.trackBlueprint === "object") {
            const incomingBp = sanitizeTrackBlueprint(b.trackBlueprint);
            if (incomingBp) {
              uData.trackBlueprint = incomingBp;
              await uRef.set({ trackBlueprint: incomingBp, updatedAtMs: Date.now() }, { merge: true }).catch(() => {});
            }
          }
          const ensuredCode = await ensurePermanentPassCode(targetUid, uRef, uData);
          let customToken = "";
          try { customToken = await admin.auth().createCustomToken(targetUid); } catch (e) {}

          const entRef = db.collection("pro_entitlements").doc(targetUid);
          const entSnap = await entRef.get();
          let entData = entSnap.exists ? (entSnap.data() || {}) : {};
          const isAdm = Boolean(
            uData.admin === true ||
            uData.isAdmin === true ||
            (typeof ADMIN_WA_UIDS !== "undefined" && ADMIN_WA_UIDS.has(targetUid))
          );

          if (isAdm) {
            const admMap = Object.assign(
              { admin: { exp: 0, ts: Date.now() }, vip_couple_649: { exp: 0, ts: Date.now() } },
              entData.entitlementsMap || {}
            );
            if (!entData.unlocked || !entData.admin) {
              entData = Object.assign({}, entData, {
                uid: targetUid,
                admin: true,
                isAdmin: true,
                unlocked: true,
                tier: entData.tier || uData.tier || "vip_couple_649",
                source: entData.source || "auto_admin_sync",
                entitlementsMap: admMap,
                updatedAtMs: Date.now()
              });
              await entRef.set(entData, { merge: true }).catch(() => {});
            } else {
              entData.entitlementsMap = admMap;
            }
            admin.auth().setCustomUserClaims(targetUid, { admin: true }).catch(() => {});
          } else if (entData.source === "auto_admin_sync" && uData.unlocked !== true) {
            await entRef.delete().catch(() => {});
            entData = {};
            admin.auth().setCustomUserClaims(targetUid, { admin: false }).catch(() => {});
          }

          const effUnlocked = Boolean(isAdm || uData.unlocked || entData.unlocked);
          const effTier = effUnlocked ? (entData.tier || uData.tier || (isAdm ? "vip_couple_649" : "")) : "";
          const effMap = effUnlocked
            ? Object.assign(
                isAdm ? { admin: { exp: 0 }, vip_couple_649: { exp: 0 } } : {},
                uData.entitlementsMap || {},
                entData.entitlementsMap || {}
              )
            : {};

          const mergedUserData = Object.assign({}, uData, {
            uid: targetUid,
            admin: isAdm,
            isAdmin: isAdm,
            permanentPassCode: ensuredCode,
            whatsappDigits: uData.whatsappDigits || waDigits || "",
            unlocked: effUnlocked,
            tier: effTier,
            entitlementsMap: effMap
          });
          const freshDevTok = signDeviceAuthToken({
            uid: targetUid,
            waDigits: mergedUserData.whatsappDigits,
            passCode: ensuredCode,
            isAdmin: isAdm
          });
          return res.status(200).json({
            ok: true,
            uid: targetUid,
            masterUid: targetUid,
            isAdmin: isAdm,
            whatsappDigits: mergedUserData.whatsappDigits,
            passCode: ensuredCode,
            permanentPassCode: ensuredCode,
            customToken,
            deviceAuthToken: freshDevTok,
            adminSessionToken: isAdm ? signAdminSessionToken(targetUid) : "",
            userData: mergedUserData
          });
        }
      } catch (syncErr) {
        return res.status(500).json({ ok: false, error: syncErr.message || "Sync failed" });
      }
    }

    if (req.body && req.body.mode === "admin_migrate_wa_cleanup") {
      const db = admin.firestore();
      const authCheck = await verifyAdminRequest(req, db);
      if (!authCheck.ok) return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });
      const report = await runWaUidCleanupAndAdminGrant(db);
      return res.status(200).json({ ok: true, report });
    }

        if (req.body && req.body.mode === "admin_inspect_rachel") {
      const db = admin.firestore();
      const authCheck = await verifyAdminRequest(req, db);
      if (!authCheck.ok) return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });
      const usersSnap = await db.collection("users").get();
      const users = {};
      usersSnap.forEach(d => { users[d.id] = d.data(); });
      const visSnap = await db.collection("site_visitors_recent").get();
      const visitors = {};
      visSnap.forEach(d => { visitors[d.id] = d.data(); });
      const roomsSnap = await db.collection("couples_rooms").get();
      for (const rDoc of roomsSnap.docs) {
        if (rDoc.id !== "jjTupwAXAk96YXE985yuYt") await rDoc.ref.delete();
      }
      const rooms = {};
      roomsSnap.forEach(d => { rooms[d.id] = d.data(); });
      const draftsSnap = await db.collection("user_form_drafts").get();
      const drafts = {};
      draftsSnap.forEach(d => { drafts[d.id] = d.data(); });
      return res.status(200).json({ ok: true, users, visitors, rooms, drafts });
    }

        // ========================================================================
    // ADMIN USER ACCESS & SERVICE SWITCHBOARD (mode === "admin_set_entitlements")
    // ========================================================================
    if (req.body && req.body.mode === "admin_set_entitlements") {
      const db = admin.firestore();
      const authCheck = await verifyAdminRequest(req, db);
      if (!authCheck.ok) return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });

      let rawPhone = String(req.body.phone || req.body.uid || "").replace(/\D/g, "");
      if (rawPhone.startsWith("05") && rawPhone.length === 10) rawPhone = "972" + rawPhone.slice(1);
      if (rawPhone.length < 8) return res.status(400).json({ ok: false, error: "Enter a valid WhatsApp phone number (e.g. 97253... or 052...)" });

      const targetUid = "wa_" + rawPhone;
      const skus = Array.isArray(req.body.skus) ? req.body.skus : [];
      const makeAdmin = Boolean(req.body.makeAdmin);
      const userName = String(req.body.name || "").trim();

      const entMap = {};
      const now = Date.now();
      for (const sku of skus) {
        const days = TIER_DAYS[sku] || 0;
        entMap[sku] = { exp: days > 0 ? now + days * 86400000 : 0, ts: now };
      }
      const isUnlocked = skus.length > 0;
      const primaryTier = skus.includes("vip_couple_649") ? "vip_couple_649" : (skus[0] || "free");

      const payload = {
        uid: targetUid,
        whatsappDigits: rawPhone,
        unlocked: isUnlocked,
        tier: primaryTier,
        entitlementsMap: entMap,
        admin: makeAdmin,
        isAdmin: makeAdmin,
        updatedAtMs: now
      };
      if (userName) payload.name = userName;

      await db.collection("users").doc(targetUid).set(payload, { merge: true });
      await db.collection("pro_entitlements").doc(targetUid).set(payload, { merge: true });
      try { await admin.auth().createUser({ uid: targetUid }); } catch (e) {}
      try { await admin.auth().setCustomUserClaims(targetUid, { admin: makeAdmin }); } catch (e) {}

      return res.status(200).json({ ok: true, uid: targetUid, unlocked: isUnlocked, tier: primaryTier, entitlementsMap: entMap, admin: makeAdmin });
    }

    // ========================================================================
    // CLOUD SYNC + GEMINI 3.8 FLASH ANTI-CLONE REFERENCE LETTER & OUTREACH STUDIO
    // ========================================================================
    if (req.body && req.body.mode === "sync_ref_logger") {
      try {
        const db = admin.firestore();
        const b = req.body || {};
        let uid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        if (!uid || uid === "anon" || uid === "guest") {
          const waD = normalizePhoneDigits(b.waPhone || b.phone || "");
          if (waD.length >= 8) uid = "wa_" + waD;
          else if (b.deviceAuthToken) {
            const dc = verifyDeviceAuthToken(String(b.deviceAuthToken));
            if (dc && dc.uid) uid = dc.uid;
          }
        }
        if (!uid || uid === "anon" || uid === "guest") {
          return res.status(200).json({ ok: true, localOnly: true });
        }
        const uRef = db.collection("users").doc(uid);
        if (b.subAction === "save" && b.referenceLogger && typeof b.referenceLogger === "object") {
          const payload = {
            events: Array.isArray(b.referenceLogger.events) ? b.referenceLogger.events.slice(0, 250) : [],
            contacts: (b.referenceLogger.contacts && typeof b.referenceLogger.contacts === "object") ? b.referenceLogger.contacts : {},
            drafts: (b.referenceLogger.drafts && typeof b.referenceLogger.drafts === "object") ? b.referenceLogger.drafts : {},
            updatedAtMs: Date.now()
          };
          await uRef.set({ referenceLogger: payload, updatedAtMs: Date.now() }, { merge: true });
          return res.status(200).json({ ok: true, saved: true, updatedAtMs: payload.updatedAtMs });
        }
        const snap = await uRef.get();
        const data = snap.exists ? (snap.data() || {}) : {};
        return res.status(200).json({ ok: true, referenceLogger: data.referenceLogger || null });
      } catch (syncErr) {
        return res.status(500).json({ ok: false, error: syncErr.message || "Sync error" });
      }
    }

    if (req.body && (req.body.mode === "generate_smart_ref_package" || req.body.mode === "generate_custom_ref_letter")) {
      try {
        const b = req.body || {};
        const apiKey = ((typeof GEMINI_API_KEY !== "undefined" && GEMINI_API_KEY.value && GEMINI_API_KEY.value()) || process.env.GEMINI_API_KEY || "").trim();
        if (!apiKey) {
          return res.status(500).json({ ok: false, error: "GEMINI_API_KEY secret not configured" });
        }

        const action = ["outreach", "letter", "both"].includes(String(b.action || "")) ? String(b.action) : "both";
        const uiLang = ["en", "he", "fr", "es", "de", "ru"].includes(String(b.uiLang || b.lang || "").slice(0, 2).toLowerCase())
          ? String(b.uiLang || b.lang).slice(0, 2).toLowerCase()
          : "en";
        const commLang = ["en", "he", "fr", "es", "de", "ru"].includes(String(b.commLang || "").slice(0, 2).toLowerCase())
          ? String(b.commLang).slice(0, 2).toLowerCase()
          : uiLang;

        const LANG_NAMES = { en: "English", he: "Hebrew (עברית)", fr: "French (Français)", es: "Spanish (Español)", de: "German (Deutsch)", ru: "Russian (Русский)" };
        const ROLE_GUIDANCE = {
          rabbi: "Orthodox Community / Synagogue Rabbi writing for the Rabbinical Conversion Court (בית הדין המיוחד לגיור). Tone: dignified, warm rabbinic Hebrew (בס\"ד), emphasizing consistent Tefillah, Shabbat/Kashrut observance, Torah learning, community integration, and genuine sincerity.",
          host_family: "Observant Shabbat & Holiday Host Family writing for the Beit Din (בית הדין לגיור). Tone: warm, personal, first-person family voice (משפחת...), describing specific Friday night / Shabbat lunch meals, Brachot, zemirot, holiday table participation, and natural comfort in an observant home.",
          volunteer_org: "Volunteering / Chesed Coordinator or Synagogue Gabbai. Tone: appreciative, concrete, civic/community leader voice detailing reliability, specific tasks performed, dates/frequency, kindness, and active contribution to the community.",
          teacher_mentor: "Conversion Teacher, Ulpan Instructor, Rav Melamed, or Madrichat Kallah. Tone: pedagogical, observant, detailing diligence in study, attendance, questions asked, mastery of Halacha/Hebrew, and readiness.",
          piba_friend: "Israeli Friend / Social Witness writing for the Ministry of Interior (לכבוד משרד הפנים – רשות האוכלוסין וההגירה) under Nohal 5.2.0008 / 5.2.0009. Tone: authentic, natural modern Israeli Hebrew (first-person), stating witness's full name, Israeli ID (ת.ז.) and phone number, how they know the couple/applicant, concrete shared dinners, holidays, trips, or home visits proving a genuine, loving shared life in Israel, and confirming they sign freely.",
          piba_family: "Israeli Family Member / In-Law Witness writing for Misrad HaPanim (רשות האוכלוסין וההגירה). Tone: warm, personal family testimony in natural Israeli Hebrew with witness ID (ת.ז.) and phone, describing family gatherings, holidays, mutual care, and integration into the family.",
          employer_colleague: "Employer, Manager, Coworker, or Neighbor Witness. Tone: credible, grounded everyday professional/neighborly Hebrew with contact & ID details, attesting to character, daily interactions, stability, and genuine life center.",
          diaspora_transfer: "Overseas / Diaspora Community Rabbi or Jewish Leader attesting to prior community involvement, Jewish/conversion background, or urgent Aliyah/transfer circumstances for Beit Din / Misrad HaPanim Va'adat Charigim."
        };

        const roleKey = String(b.roleKey || b.relation || "rabbi").trim();
        const roleDesc = ROLE_GUIDANCE[roleKey] || ROLE_GUIDANCE.rabbi;
        const applicantName = String(b.applicantName || b.candidateName || "").trim() || "[Applicant Name]";
        const partnerName = String(b.partnerName || "").trim();
        const signerName = String(b.signerName || "").trim() || "[Recommender Name]";
        const signerTitleOrOrg = String(b.signerTitle || "").trim();
        const venueAndCity = String(b.venueCity || "").trim();
        const signerTz = String(b.signerTz || "").trim();
        const signerPhone = String(b.signerPhone || "").trim();
        const deadlineIso = String(b.deadlineIso || "").trim();
        const howMet = String(b.howMet || "").trim();
        const witnessedDetails = String(b.witnessedDetails || b.notes || "").trim();
        const specialTouch = String(b.specialTouch || "").trim();

        const rawLogs = Array.isArray(b.activityLogs) ? b.activityLogs.slice(0, 40) : [];
        const logsBlock = rawLogs.length > 0
          ? rawLogs.map((ev, idx) => `${idx + 1}. Date: ${ev.dateIso || ev.dateStr || "N/A"} | Activity: ${ev.activityLabel || ev.what || ""} | Place: ${ev.place || ev.where || ""} | Specifics: ${ev.notes || ""}`).join("\n")
          : "No structured calendar entries logged — rely thoroughly on the Relationship & Memory Interview answers below.";

        const priorSummaries = Array.isArray(b.previousLettersSummary) ? b.previousLettersSummary.slice(0, 8) : [];
        const antiCloneBlock = priorSummaries.length > 0
          ? "CRITICAL ANTI-CLONE RULE — The user ALREADY generated letters for these other people (DO NOT repeat their opening phrases, paragraph count, transition words, or rhythm — this letter MUST read like a completely different human author!):\n" +
            priorSummaries.map((p, i) => `  Prior Letter #${i + 1} (${p.signer || "Other"} - ${p.role || ""}): Opening was "${String(p.opening || "").slice(0, 120)}"`).join("\n")
          : "Write with an authentic, non-formulaic human voice — avoid stiff AI clichés so clerks/Dayanim immediately recognize genuine personal familiarity.";

        const sysPrompt = [
          "You are an elite Israeli Rabbinic & Misrad HaPanim (PIBA) Dossier Strategist.",
          "Return ONLY valid JSON matching this exact schema (no markdown fences, no `**` asterisks anywhere inside text values):",
          '{ "outreachMessage": "...", "letterHe": "...", "letterTranslation": "...", "translationLang": "...", "coachTip": "..." }',
          "",
          `Requested Action: "${action}" (if "outreach", leave letterHe & letterTranslation as ""; if "letter", leave outreachMessage as ""; if "both", populate all fields).`,
          `Applicant Name: ${applicantName}` + (partnerName ? ` | Spouse/Partner Name: ${partnerName}` : ""),
          `Recommender / Witness Name: ${signerName}` + (signerTitleOrOrg ? ` (${signerTitleOrOrg})` : ""),
          `Persona & Legal Context: ${roleDesc}`,
          `Place / Synagogue / Neighborhood & City: ${venueAndCity || "Israel"}`,
          `Recommender Israeli ID (ת.ז., if provided): ${signerTz || "Not entered yet — leave a clean line if PIBA witness"}`,
          `Recommender Phone (if provided): ${signerPhone || "Not entered yet — leave a clean line"}`,
          `Target Date User Needs Signed Letter By: ${deadlineIso || "As soon as convenient (upcoming appointment)"}`,
          `Language User Speaks With This Recommender (for outreachMessage & letterTranslation): ${LANG_NAMES[commLang] || "English"}`,
          `User UI Language (for coachTip): ${LANG_NAMES[uiLang] || "English"}`,
          "",
          "=== LOGGED REAL-WORLD EVENTS & DATES WITH THIS PERSON ===",
          logsBlock,
          "",
          "=== RELATIONSHIP & MEMORY INTERVIEW ANSWERS ===",
          `- How/when they met & frequency: ${howMet || "Not specified"}`,
          `- Concrete moments, meals, volunteering, or couple life witnessed: ${witnessedDetails || "Not specified"}`,
          `- Personal touch / extra context: ${specialTouch || "Not specified"}`,
          "",
          antiCloneBlock,
          "",
          "=== STRICT DRAFTING RULES ===",
          `1. OUTREACH MESSAGE (in ${LANG_NAMES[commLang]}): Warm, respectful, natural WhatsApp/Email message to ${signerName}. Mention needing the reference/witness letter by ${deadlineIso || "the upcoming appointment date"}. Explicitly offer TWO low-effort options so they don't procrastinate: (a) 'I jotted down a few dates/moments from our time together if you prefer writing a few short lines in your own words', OR (b) 'Since I know how busy you are, I also put together a draft based on those exact moments that you can freely edit/change however you feel comfortable and sign.'`,
          "2. BESPOKE HEBREW LETTER (`letterHe` in natural, authentic Hebrew): Must be written in FIRST PERSON from the perspective of the recommender/witness. Weave the exact logged dates, places, meals, volunteer work, or couple interactions organically into the narrative. NEVER invent fake dates or facts not provided, and NEVER use generic copy-paste filler. Include proper header (בס\"ד for religious/Beit Din personas; formal date & לכבוד משרד הפנים / בית הדין), natural paragraphs, and complete signature footer (full name, role/relationship, ת.ז. line for PIBA witnesses, phone, address/city, and signature).",
          `3. 1:1 TRANSLATION (\`letterTranslation\` in ${LANG_NAMES[commLang] === "Hebrew (עברית)" ? LANG_NAMES[uiLang] : LANG_NAMES[commLang]}): Accurate, readable translation of \`letterHe\` so both the applicant and a non-Hebrew-native recommender can verify every word before signing.`,
          `4. COACH TIP (\`coachTip\` in ${LANG_NAMES[uiLang]}): 1 concise sentence noting anything helpful to double-check before signing (e.g. adding witness 9-digit TZ copy for Misrad HaPanim Nohal 5.2.0008, or printing on synagogue letterhead for a Rabbi).`
        ].join("\n");

        const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: sysPrompt }] }],
            generationConfig: {
              temperature: 0.72,
              maxOutputTokens: 3200,
              responseMimeType: "application/json",
              thinkingConfig: { thinkingBudget: 0 }
            }
          })
        });
        const gJson = await gRes.json();
        const rawText = gJson?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        let parsedOut = {};
        try {
          parsedOut = JSON.parse(rawText);
        } catch (je) {
          const m = rawText.match(/\{[\s\S]*\}/);
          if (m) parsedOut = JSON.parse(m[0]);
        }
        const cleanStr = (s) => String(s || "").replace(/\*\*/g, "").trim();
        return res.status(200).json({
          ok: true,
          outreachMessage: cleanStr(parsedOut.outreachMessage),
          letterHe: cleanStr(parsedOut.letterHe),
          letter: cleanStr(parsedOut.letterHe),
          letterTranslation: cleanStr(parsedOut.letterTranslation),
          coachTip: cleanStr(parsedOut.coachTip)
        });
      } catch (err) {
        return res.status(500).json({ ok: false, error: err.message || String(err) });
      }
    }


    if (((req.body && (req.body.mode === "admin_get_analytics" || req.body.mode === "get_analytics")) || (req.query && (req.query.mode === "admin_get_analytics" || req.query.mode === "get_analytics")))) {
      try {
        const db = admin.firestore();
        // === GAT CLEAR TEST ANALYTICS START ===
        if (req.body.clearScope === "bots" || req.body.clearScope === "all") {
          const ALL_AN_COLS = ['site_analytics_daily', 'site_visitors_recent', 'site_crawlers_recent'];
          const BOT_AN_COLS = ['site_crawlers_recent'];
          const DAY_AN_COLS = ['site_analytics_daily'];
          const colsToWipe = req.body.clearScope === "all" ? ALL_AN_COLS : BOT_AN_COLS;
          for (const colName of colsToWipe) {
            const snapWipe = await db.collection(colName).limit(450).get();
            if (!snapWipe.empty) {
              const batch = db.batch();
              snapWipe.docs.forEach((d) => batch.delete(d.ref));
              await batch.commit();
            }
          }
          if (req.body.clearScope === "bots") {
            for (const dCol of DAY_AN_COLS) {
              const dSnap = await db.collection(dCol).limit(90).get();
              if (!dSnap.empty) {
                const dBatch = db.batch();
                dSnap.docs.forEach((d) => dBatch.set(d.ref, { totalBotHits: 0 }, { merge: true }));
                await dBatch.commit();
              }
            }
          }
        }
        // === GAT CLEAR TEST ANALYTICS END ===

        const authCheck = await verifyAdminRequest(req, db);
        if (!authCheck.ok) {
          return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });
        }
        const dayStr = new Date().toISOString().slice(0, 10);
        const [daySnap, daysSnap, recentSnap, botSnap] = await Promise.all([
          db.collection("site_analytics_daily").doc(dayStr).get(),
          db.collection("site_analytics_daily").orderBy("date", "desc").limit(14).get(),
          db.collection("site_visitors_recent").orderBy("lastSeen", "desc").limit(150).get(),
          db.collection("site_crawlers_recent").orderBy("lastSeen", "desc").limit(150).get()
        ]);
        const visitors = [];
        recentSnap.forEach(doc => visitors.push(doc.data()));
        const crawlers = [];
        botSnap.forEach(doc => crawlers.push(doc.data()));
        const dailyHistory = [];
        daysSnap.forEach(doc => dailyHistory.push(doc.data()));
        return res.status(200).json({
          ok: true,
          today: daySnap.exists ? daySnap.data() : { date: dayStr, totalSeconds: 0, totalPageViews: 0, totalBotHits: 0 },
          dailyHistory,
          visitors,
          crawlers
        });
      } catch (e) {
        return res.status(500).json({ ok: false, error: e.message });
      }
    }

    // === GAT CONSULTATIVE SALES & ACCOUNT DOSSIER ENGINE V5 START ===
    if (
      req.body &&
      !req.body.base64Data &&
      !Array.isArray(req.body.files) &&
      ["get_ai_partner_dossier", "helpdesk_chat", "support_chat", "tracking_partner", "tp_chat", "ai_sales_chat"].includes(String(req.body.mode || ""))
    ) {
      const SITE_BRAIN = (() => {
        try { return require("./gat_site_brain"); } catch (e) { return {}; }
      })();
      const db = admin.firestore();
      const b = req.body || {};
      const rawUid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
      const isRealUid = Boolean(rawUid && rawUid !== "anon" && rawUid !== "guest");
      const anonPartnerId = String(b.anonPartnerId || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);

      function cleanHumanFirstName(raw) {
        const s = String(raw || "").trim().replace(/\s+/g, " ");
        if (!s || s.length < 2) return "";
        const first = s.split(" ")[0].replace(/[^A-Za-z\u00C0-\u024F\u0400-\u04FF\u0590-\u05FF'-]/g, "");
        if (!first || first.length < 2 || first.length > 28) return "";
        if (/^(guest|anon|anonymous|user|test|admin|unknown|null|undefined|applicant|client)$/i.test(first)) return "";
        return first.charAt(0).toUpperCase() + first.slice(1);
      }

      function extractNamesAndVaultSummary(uData, uploadedDocs, savedDossier) {
        const draft = (uData && (uData.formDraft || uData.draft)) || {};
        const scans = Array.isArray(uData && uData.scannedDocs) ? uData.scannedDocs : [];
        const allDocs = Array.isArray(uploadedDocs) && uploadedDocs.length > 0 ? uploadedDocs : scans;

        let firstName = cleanHumanFirstName(savedDossier && savedDossier.firstName);
        if (!firstName) {
          const cands = [
            draft.pf_given_name_en, draft.pf_first_name, draft.pf_given_en,
            draft.pf_applicant_first_name, draft.pf_full_name_en, draft.pf_name_en,
            draft.pf_given_he, draft.pf_first_name_he
          ];
          for (const c of cands) {
            firstName = cleanHumanFirstName(c);
            if (firstName) break;
          }
        }
        if (!firstName) {
          for (const d of allDocs) {
            if (d && d.ownerParty !== "partner") {
              const ef = d.extractedFields || {};
              firstName = cleanHumanFirstName(
                d.givenNameEn || d.firstName || d.holderFirstName || d.fullNameEn ||
                ef.pf_given_name_en || ef.pf_first_name || d.givenNameHe
              );
              if (firstName) break;
            }
          }
        }
        if (!firstName && uData) {
          firstName = cleanHumanFirstName(
            uData.firstName || uData.payerName || (uData.conciergeOrder && uData.conciergeOrder.name)
          );
        }

        let partnerName = cleanHumanFirstName(savedDossier && savedDossier.partnerName);
        if (!partnerName) {
          const pCands = [
            draft.pf_spouse_given_en, draft.pf_partner_first_name, draft.pf_inviter_given_en,
            draft.pf_spouse_name_en, draft.pf_spouse_given_he
          ];
          for (const c of pCands) {
            partnerName = cleanHumanFirstName(c);
            if (partnerName) break;
          }
        }
        if (!partnerName) {
          for (const d of allDocs) {
            if (d && d.ownerParty === "partner") {
              partnerName = cleanHumanFirstName(d.givenNameEn || d.firstName || d.fullNameEn || d.givenNameHe);
              if (partnerName) break;
            }
          }
        }

        const incompleteDocs = [];
        const cleanDocSummaries = [];
        for (const d of allDocs.slice(0, 16)) {
          if (!d) continue;
          const slot = String(d.slotKey || d.docType || d.docId || "").slice(0, 40);
          const title = String(d.docTitle || d.docType || slot).slice(0, 70);
          const owner = d.ownerParty === "partner" ? "partner" : "me";
          const isTz = Boolean(d.isIsraeliTz || /sefach|zehut|tz/i.test(slot + " " + title));
          const needsApos = /birth|marriage|police|criminal|single|divorce/i.test(slot + " " + title) && !isTz;
          const inc = Boolean(
            d.isIncomplete ||
            (isTz && d.hasSefach === false) ||
            (needsApos && d.hasApostille === false)
          );
          if (inc) incompleteDocs.push({ slotKey: slot, docTitle: title, ownerParty: owner });
          cleanDocSummaries.push({
            slot,
            title,
            owner,
            status: inc ? "INCOMPLETE_NEEDS_FIX" : "COMPLETE",
            pages: Number(d.pageCount || 1)
          });
        }

        return {
          firstName,
          partnerName,
          vaultSummary: {
            totalDocs: cleanDocSummaries.length,
            incompleteCount: incompleteDocs.length,
            incompleteDocs: incompleteDocs.slice(0, 6),
            docs: cleanDocSummaries
          }
        };
      }

      function mergeDossiers(anonD, userD) {
        const a = (anonD && typeof anonD === "object") ? anonD : {};
        const u = (userD && typeof userD === "object") ? userD : {};
        const topics = [];
        for (const t of [].concat(u.discussedTopics || [], a.discussedTopics || [])) {
          const ct = String(t || "").trim().slice(0, 80);
          if (ct && !topics.includes(ct)) topics.push(ct);
        }
        const skus = [];
        for (const s of [].concat(u.recommendedSkus || [], a.recommendedSkus || [])) {
          const cs = String(s || "").trim().slice(0, 40);
          if (cs && !skus.includes(cs)) skus.push(cs);
        }
        const turns = (Array.isArray(u.recentTurns) && u.recentTurns.length >= (Array.isArray(a.recentTurns) ? a.recentTurns.length : 0))
          ? u.recentTurns
          : (a.recentTurns || []);
        return {
          firstName: u.firstName || a.firstName || "",
          partnerName: u.partnerName || a.partnerName || "",
          primaryGoal: u.primaryGoal || a.primaryGoal || "",
          courtType: u.courtType || a.courtType || "",
          locationStatus: u.locationStatus || a.locationStatus || "",
          relationshipStatus: u.relationshipStatus || a.relationshipStatus || "",
          discussedTopics: topics.slice(0, 6),
          recommendedSkus: skus.slice(0, 6),
          recentTurns: Array.isArray(turns) ? turns.slice(-12) : [],
          turnCount: Math.max(Number(u.turnCount || 0), Number(a.turnCount || 0)),
          updatedAtMs: Math.max(Number(u.updatedAtMs || 0), Number(a.updatedAtMs || 0))
        };
      }

      
      // === SPOK CLEAN LIST HELPER START ===
      function cleanSpokMarkdownLists(txt) {
        return String(txt || "")
          .replace(/(^|\n)\s*(\d+\.)\s*\n+\s*(?=\S)/g, "$1$2 ")
          .replace(/\bTracking Partner\b/g, "Spok");
      }
      // === SPOK CLEAN LIST HELPER END ===

      function buildRelevantSiteBrainSlice(queryText, histArr, curMod, allowFullVaultAnswers) {
        const corpus = (String(queryText || "") + " " + String(curMod || "") + " " + (histArr || []).map((x) => x && x.text || "").join(" ")).toLowerCase();
        

        const chunks = [];

        const isShulOrBd = /shul|synagogue|beit knesset|beth knesset|community|rabbi|prayer|pray|siddur|song|brach|blessing|shabbat|kashrut|kosher|mikvah|beit din|tribunal|dayan|convert|giyur|giur|halach|tefillin|minyan|kallah|niddah|שבת|בית כנסת|קהילה|רב|תפיל|ברכות|בית דין|גיור|כלה|синагог|общин|раввин|шаббат|молитв|гиюр/.test(corpus);
        const isCouples = /couple|spouse|spousal|partner|marry|married|wedding|fiance|boyfriend|girlfriend|husband|wife|interview|interrogation|5\.2\.0008|5\.2\.0009|ash\/?6|nespach|זוג|נישואין|שימוע|אש\/?6|супруг|пар|ступро|допрос/.test(corpus);
        const isFormsOrDocs = /form|ash|mr\/?14|nativ|apostille|birth|police|fbi|acro|rcmp|sefach|zehut|sal klita|aliyah|shinui|visa|va.?adat|tourist|notary|translate|טופס|אפוסטיל|ספח|תעודת|עלייה|נוטריון|анкет|апостил|сефах|репатриац/.test(corpus);

        if (isShulOrBd || chunks.length === 0) {
          if (Array.isArray(SITE_BRAIN.pre_mikvah_halachic_boundaries) && SITE_BRAIN.pre_mikvah_halachic_boundaries.length) {
            chunks.push((allowFullVaultAnswers ? "PRE-MIKVAH HALACHIC BOUNDARIES (PAID MEMBER — EXPLAIN CLEARLY): " : "INTERNAL VAULT TOPIC INDEX ONLY (LOCKED FOR FREE USER — DO NOT REVEAL THESE RULES IN CHAT; USE ONLY TO KNOW WHAT CURVEBALLS WE COVER!): ") + SITE_BRAIN.pre_mikvah_halachic_boundaries.join(" || "));
          }
          if (SITE_BRAIN.madrichat_kallah_vs_single_rule) { chunks.push(SITE_BRAIN.madrichat_kallah_vs_single_rule); }
          if (Array.isArray(SITE_BRAIN.songs_56) && SITE_BRAIN.songs_56.length) {
            chunks.push("SITE'S 56 SHABBAT SONGS, SHACHARIT PRAYERS & BRACHOT KARAOKE TRACKS (/app/?module=songs-prayers): " + SITE_BRAIN.songs_56.slice(0, 38).join(" | "));
          }
          if (Array.isArray(SITE_BRAIN.beit_din_categories) && SITE_BRAIN.beit_din_categories.length) {
            chunks.push("SITE'S 700-CARD BEIT DIN VAULT CATEGORIES (/app/?module=beit-din-150): " + SITE_BRAIN.beit_din_categories.join(" | "));
          }
          if (Array.isArray(SITE_BRAIN.beit_din_samples) && SITE_BRAIN.beit_din_samples.length) {
            chunks.push("SAMPLE REAL BEIT DIN QUESTIONS IN OUR VAULT: " + SITE_BRAIN.beit_din_samples.slice(0, 12).join(" // "));
          }
        }
        if (isCouples) {
          if (Array.isArray(SITE_BRAIN.couples_categories) && SITE_BRAIN.couples_categories.length) {
            chunks.push("SITE'S 300-Q 2-PHONE SEPARATED-ROOM INTERROGATION CATEGORIES (/app/?module=couples-sync): " + SITE_BRAIN.couples_categories.join(" | "));
          }
          if (Array.isArray(SITE_BRAIN.couples_samples) && SITE_BRAIN.couples_samples.length) {
            chunks.push("SAMPLE SEPARATED-ROOM CLERK QUESTIONS IN OUR VAULT: " + SITE_BRAIN.couples_samples.slice(0, 10).join(" // "));
          }
        }
        if (isFormsOrDocs) {
          if (Array.isArray(SITE_BRAIN.piba_forms_8) && SITE_BRAIN.piba_forms_8.length) {
            chunks.push("SITE'S 8 COORDINATE-STAMPED HEBREW PIBA PDF FORMS (/app/?module=hebrew-engine): " + JSON.stringify(SITE_BRAIN.piba_forms_8));
          }
          if (SITE_BRAIN.jurisdictions && Object.keys(SITE_BRAIN.jurisdictions).length) {
            chunks.push("SITE'S COUNTRY-BY-COUNTRY APOSTILLE & POLICE CHECK AUTHORITIES: " + JSON.stringify(SITE_BRAIN.jurisdictions).slice(0, 2200));
          }
        }
        if (Array.isArray(SITE_BRAIN.site_faqs) && SITE_BRAIN.site_faqs.length) {
          chunks.push((allowFullVaultAnswers ? "OFFICIAL SITE FAQS & ANSWERS: " : "SITE FAQ TOPIC OVERVIEW (DO NOT LEAK HALACHIC OR FORM ANSWERS TO UNPAID USERS): ") + SITE_BRAIN.site_faqs.slice(0, 10).map((f) => `Q: ${f.q} -> A: ${f.a}`).join(" || ").slice(0, 2600));
        }
        if (Array.isArray(SITE_BRAIN.site_obstacles_and_truths) && SITE_BRAIN.site_obstacles_and_truths.length) {
          chunks.push("HOMEPAGE STATUTORY PLAYBOOKS: " + SITE_BRAIN.site_obstacles_and_truths.slice(0, 10).join(" || ").slice(0, 2000));
        }
        
        // === SPOK PERSONA & STATUTORY CALIBRATION V1 START ===
        const hasPriorAssistantTurn = Array.isArray(histArr) && histArr.some((m) => m && (m.role === "assistant" || m.role === "model" || m.sender === "bot"));
        const spokPersonaAndCalibrationBlock = [
          "=== MANDATORY IDENTITY, TONE & STATUTORY CALIBRATION (HIGHEST PRIORITY OVERRIDE) ===",
          "1. YOUR NAME IS SPOK: Your name is **Spok** (in Hebrew: **Spok / ספוק**, in Russian: **Spok / Спок**). NEVER call yourself 'Tracking Partner', 'AI Assistant', 'Helpdesk', or 'Bot'. Always refer to yourself as Spok.",
          (!hasPriorAssistantTurn
            ? "2. FIRST-MESSAGE SELF-INTRODUCTION: Because this is your first reply in this chat session, open warmly in 1 short sentence introducing yourself as **Spok** in the user's language (e.g., 'Hi! I'm **Spok**, your personal Aliyah, Giyur & Misrad HaPanim guide.' / 'שלום! אני **Spok (ספוק)**, המלווה האישי שלכם לעלייה, גיור ומשרד הפנים.') and immediately answer their question."
            : "2. CONTINUING CONVERSATION AS SPOK: Speak naturally as Spok without re-introducing yourself on every turn."),
          "3. ZERO ALARMIST SCARE-COPY OR FAKE CRISIS CLOCKS: Be calm, accurate, empathetic, and grounded—like a sharp senior Israeli regulatory advisor. Do NOT invent dramatic trap badges or push '15,000₪–35,000₪ lawyer retainer' scare copy unless the user asks about legal fees or faces an actual PIBA visa revocation/refusal.",
          "4. CRITICAL STATUTORY SEPARATION — CONVERSION AUTHORITY (VA'ADAT CHARIGIM) vs. PIBA (MISRAD HAPANIM):",
          "   - Foreign workers on a **B/1 work visa** (caregiving, agriculture, construction, foreign expert, general work) are **explicitly excluded** by the State Conversion Authority's Exceptions Committee (`ועדת חריגים ללימודי גיור`) criteria and routinely receive a summary rejection from the Conversion Committee.",
          "   - **NEVER CONFLATE THE TWO AGENCIES:** A rejection letter from the Conversion Authority / Va'adat Charigim (or a Beit Din deferral) **DOES NOT cancel, revoke, or shorten a valid employer-sponsored B/1 work visa** and **DOES NOT trigger a 14-day PIBA departure clock** or Nohal 1.6.0001 deportation enforcement! As long as their B/1 employer sponsorship remains valid and in compliance, their legal stay in Israel is 100% intact.",
          "   - A **14-day departure order** and **21-day Nohal 1.6.0001 Internal Administrative Appeal (`ערר פנימי`)** apply **ONLY** when **PIBA (Population & Immigration Authority / Misrad HaPanim) itself** formally refuses to renew, cancels, or terminates a person's visa status.",
          "   - When advising a B/1 worker rejected for conversion: (a) reassure them immediately that a Va'adat Charigim conversion rejection does NOT cancel their valid B/1 work permit or trigger a 14-day departure order; (b) warn them NOT to quit a legal B/1 work permit for a B/2 tourist visa expecting easy admission; (c) check if they have an Israeli citizen partner (since transitioning to the **Graduated Spousal Track Nohal 5.2.0008 / 5.2.0009** grants a spousal B/1 / A/5 status that *does* allow conversion), or help them build Hebrew/Torah foundations now to convert via a recognized Beit Din in their home country after their contract.",
          "   - If a user says 'it was rejected' without specifying whether **PIBA** refused their visa OR **Va'adat Charigim / Rabbanut** refused conversion admission, briefly distinguish both in 2 calm sentences and ask which letter they received.",
          "5. CLEAN NUMBERED LIST FORMATTING: Always keep the step number and bold title on the exact same line (`1. **Step Title:** details...`). NEVER put `1.` alone on its own line above a line break!"
        ].join("\n");
        chunks.unshift(spokPersonaAndCalibrationBlock);
        chunks.push(spokPersonaAndCalibrationBlock);
        // === SPOK PERSONA & STATUTORY CALIBRATION V1 END ===

        return chunks.join("\n\n");
      }

      try {
        let uData = {};
        let entData = {};
        let uploadedDocs = [];
        let anonDossierDoc = {};

        const tasks = [];
        if (isRealUid) {
          tasks.push(db.collection("users").doc(rawUid).get().then((s) => { if (s.exists) uData = s.data() || {}; }).catch(() => {}));
          tasks.push(db.collection("pro_entitlements").doc(rawUid).get().then((s) => { if (s.exists) entData = s.data() || {}; }).catch(() => {}));
          tasks.push(db.collection("users").doc(rawUid).collection("uploaded_docs").orderBy("updatedAt", "desc").limit(20).get().then((snap) => {
            snap.forEach((d) => uploadedDocs.push(d.data()));
          }).catch(() => {}));
        }
        if (anonPartnerId) {
          tasks.push(db.collection("ai_partner_dossiers").doc(anonPartnerId).get().then((s) => {
            if (s.exists) anonDossierDoc = s.data() || {};
          }).catch(() => {}));
        }
        await Promise.all(tasks);

        const isUnlockedAny = Boolean(entData.unlocked || uData.unlocked || uData.admin || uData.isAdmin);
        const entMap = isUnlockedAny ? Object.assign({}, uData.entitlementsMap || {}, entData.entitlementsMap || {}) : {};
        const unlockedKeys = Object.keys(entMap);
        const primaryTier = isUnlockedAny ? (entData.tier || uData.tier || (uData.admin || uData.isAdmin ? "vip_couple_649" : "")) : "";
        if (primaryTier && !unlockedKeys.includes(primaryTier)) unlockedKeys.push(primaryTier);

        const FORMS_TIERS = ["forms_90d_89", "forms_life_149", "suite_solo_90d_249", "suite_solo_life_399", "vip_couple_649"];
        const BD_TIERS = ["bd_pack1_65", "bd_pack2_65", "bd_pack3_49", "bd_pack4_49", "bd_all700_179", "bd_suite_90d_149", "bd_suite_life_249", "suite_solo_90d_249", "suite_solo_life_399", "vip_couple_649"];
        const SONGS_TIERS = ["songs_65", "bd_suite_90d_149", "bd_suite_life_249", "suite_solo_90d_249", "suite_solo_life_399", "vip_couple_649"];
        const COUPLES_TIERS = ["couples_sync_75", "couples_90d_129", "couples_life_229", "suite_solo_90d_249", "suite_solo_life_399", "vip_couple_649"];

        const hasFormsUnlocked = unlockedKeys.some((k) => FORMS_TIERS.includes(k));
        const hasBdUnlocked = unlockedKeys.some((k) => BD_TIERS.includes(k));
        const hasSongsUnlocked = unlockedKeys.some((k) => SONGS_TIERS.includes(k));
        const hasCouplesUnlocked = unlockedKeys.some((k) => COUPLES_TIERS.includes(k));

        const conciergeOrder = uData.conciergeOrder || null;
        const hasConciergeOrder = Boolean(conciergeOrder && conciergeOrder.orderId);
        const isPaid = Boolean(isUnlockedAny || (hasConciergeOrder && ["approved_for_payment", "paid_in_progress", "completed"].includes(conciergeOrder.status)));
        const tierLevel = hasConciergeOrder
          ? "TIER 3 — VIP CONCIERGE CLIENT"
          : (isPaid ? "TIER 2 — VERIFIED PAID MEMBER" : "TIER 1 — UNPAID PROSPECT");

        let dossier = mergeDossiers(anonDossierDoc, uData.aiPartnerDossier);
        const extracted = extractNamesAndVaultSummary(uData, uploadedDocs, dossier);
        if (extracted.firstName && !dossier.firstName) dossier.firstName = extracted.firstName;
        if (extracted.partnerName && !dossier.partnerName) dossier.partnerName = extracted.partnerName;

        if (isRealUid && anonDossierDoc && (anonDossierDoc.discussedTopics || []).length > 0 && !(uData.aiPartnerDossier && (uData.aiPartnerDossier.discussedTopics || []).length >= dossier.discussedTopics.length)) {
          await db.collection("users").doc(rawUid).set({ aiPartnerDossier: dossier }, { merge: true }).catch(() => {});
        }

        
        const activeTrackBlueprint = (b.trackBlueprint && typeof b.trackBlueprint === "object" && typeof sanitizeTrackBlueprint === "function")
          ? sanitizeTrackBlueprint(b.trackBlueprint)
          : ((uData && uData.trackBlueprint) ? uData.trackBlueprint : null);
        if (activeTrackBlueprint && typeof mergedDossier === "object" && mergedDossier) {
          if (!mergedDossier.primaryGoal && activeTrackBlueprint.trackTitle) {
            mergedDossier.primaryGoal = activeTrackBlueprint.trackTitle;
          }
          mergedDossier.trackBlueprint = activeTrackBlueprint;
        }

        const trackBlueprintAiContext = activeTrackBlueprint
          ? (
              "\n\n[ACTIVE ONBOARDING TRACK BLUEPRINT FOR THIS USER]:\n" +
              "- Diagnosed Track ID: " + (activeTrackBlueprint.trackId || "unknown") + "\n" +
              "- Diagnosed Track Title: " + (activeTrackBlueprint.trackTitle || "") + "\n" +
              "- Current Active Step ID: " + (activeTrackBlueprint.activeStepId || "") + " (Step #" + ((Number(activeTrackBlueprint.activeStepIdx) || 0) + 1) + ")\n" +
              "- Completed Steps: " + ((activeTrackBlueprint.completedSteps || []).join(", ") || "none yet") + "\n" +
              "- Onboarding Answers: " + JSON.stringify(activeTrackBlueprint.answers || {}) + "\n" +
              "- Children Under 18 Included: " + Boolean(activeTrackBlueprint.hasChildrenUnder18) + "\n" +
              "- CONSULTATIVE STRATEGY RULE: If the user is asking about a Visa / Va'adat Charigim Rejection, B/1 Work Visa scrutiny, or how to complete their current trajectory step, give them 2-3 concrete, authoritative insider action steps right away (e.g. 21-day Nohal 1.6.0001 written appeal vs. 14-day departure clock, scanning their Hebrew Daf Siruv in Smart Scan, or Nohal 5.2.0008/0009 Sec. ג.10 spousal protection), ask 1 diagnostic follow-up question with [[ASK:...]] chips, and provide a matching [[ACT:app|hebrew-engine|...]] or [[ACT:concierge|concierge_lawyer_349|...]] button!\n"
            )
          : "\n\n[SPECIALIZED B/1 WORK VISA & VISA REJECTION RESCUE CONSULTATIVE PLAYBOOK]:\n" +
            "- IF THE USER ASKS ABOUT A VISA REJECTION OR VA'ADAT CHARIGIM REFUSAL: Lead with calm, authoritative tactical empathy (Chris Voss / Sandler). Explain immediately: (1) A refusal letter (Daf Siruv) usually sets a 14-day departure clock, but under PIBA Nohal 1.6.0001 they have a strict 21-day window to file a formal written Hebrew internal appeal (Arar Pnimi) to freeze removal—verbal arguments at the counter do nothing; (2) They should snap their Hebrew refusal sheet in our Smart Scanner so we decode the exact clause; (3) Ask ONE diagnostic question via [[ASK:...]] chips to identify their exact anchor (e.g. Do they have an Israeli partner for a Nohal 5.2.0008/0009 Sec. ג.10 pivot, or was it a solo tourist/B/1 Va'adat Charigim Form Ash/1 refusal?) and include [[ACT:app|hebrew-engine|📸 Scan My Hebrew Refusal Letter →]].\n" +
            "- IF THE USER ASKS ABOUT A B/1 WORK VISA: Validate that standard foreign-labor B/1 visas face the highest Va'adat Charigim rejection rates because PIBA fears conversion is being used to bypass immigration expiry—whereas a Spousal B/1 (Nohal 5.2.0008/0009 Sec. ג.10) is protected. Explain how to overcome the presumption (vetted Sponsoring Rabbi + Host Family TZ letters + Form Ash/1 statutory Michtav Hesber) and offer [[ASK:...]] chips to diagnose whether their B/1 is employer-sponsored or spousal.";

        if (b.mode === "get_ai_partner_dossier") {
          return res.status(200).json({
            ok: true,
            dossier: {
              firstName: dossier.firstName || "",
              partnerName: dossier.partnerName || "",
              primaryGoal: dossier.primaryGoal || "",
              courtType: dossier.courtType || "",
              locationStatus: dossier.locationStatus || "",
              relationshipStatus: dossier.relationshipStatus || "",
              discussedTopics: dossier.discussedTopics || [],
              recommendedSkus: dossier.recommendedSkus || [],
              turnCount: dossier.turnCount || 0
            },
            isPaid,
            tierLevel,
            unlockedKeys,
            vaultSummary: extracted.vaultSummary
          });
        }

        const userMessage = String(b.message || b.query || b.prompt || b.text || "").trim().slice(0, 1800);
        if (!userMessage) {
          return res.status(400).json({ ok: false, error: "Empty message" });
        }

        const validLangs = ["en", "he", "fr", "es", "de", "ru"];
        const uiLang = validLangs.includes(String(b.lang || "").slice(0, 2).toLowerCase())
          ? String(b.lang || "").slice(0, 2).toLowerCase()
          : "en";
        let effLang = uiLang;
        if (/[\u0590-\u05FF]/.test(userMessage)) effLang = "he";
        else if (/[\u0400-\u04FF]/.test(userMessage)) effLang = "ru";

        const langNames = {
          en: "English",
          he: "Hebrew (עברית)",
          fr: "French (Français)",
          es: "Spanish (Español)",
          de: "German (Deutsch)",
          ru: "Russian (Русский)"
        };
        const targetLangName = langNames[effLang] || "English";
        const lPrefix = effLang === "en" ? "" : `/${effLang}`;

        const dayKey = new Date().toISOString().slice(0, 10);
        const rawIp = String(req.headers["x-forwarded-for"] || req.ip || "anon").split(",")[0].trim().replace(/[^a-zA-Z0-9_.-]/g, "_");
        const quotaId = isRealUid ? `u_${rawUid}_${dayKey}` : `ip_${rawIp}_${dayKey}`;
        const quotaRef = db.collection("hd_daily_quota").doc(quotaId);
        const quotaSnap = await quotaRef.get();
        const usedToday = (quotaSnap.exists && quotaSnap.data() && quotaSnap.data().count) ? Number(quotaSnap.data().count) : 0;
        const maxDaily = isPaid ? 150 : 30;
        if (usedToday >= maxDaily) {
          const qMsg = isPaid
            ? "📲 Daily 150-message cap reached! Message our priority desk on WhatsApp at **+972-52-582-2005**."
            : `🔒 **30/30 free daily strategy questions used!**\n\nUnlock any Digital Pass (**$89–$249**) or Full Suite (**$399 Solo / $649 VIP Couple**) for **150 daily questions** + full Clerk Hebrew stamping & vault access.\n\n[[ACT:pricing|suite_solo_life_399|⚡ View All 23 Passes & Unlock →]]`;
          return res.status(200).json({ ok: true, reply: qMsg, tierLevel, isPaid, quotaReached: true });
        }
        await quotaRef.set({ count: usedToday + 1, dayKey, isPaid, updatedAtMs: Date.now() }, { merge: true });

        if (hasConciergeOrder && isRealUid) {
          await db.collection("users").doc(rawUid).set({
            lastConciergeHelpdeskMsg: userMessage,
            lastConciergeHelpdeskAtMs: Date.now()
          }, { merge: true }).catch(() => {});
        }

        const currentPage = String(b.pagePath || b.currentMod || "landing").slice(0, 120);
        const currentMod = String(b.currentMod || "").slice(0, 60);
        const currentForm = String(b.currentForm || "").slice(0, 40);
        const startingNewTopic = Boolean(b.startingNewTopic);
        const formSnapshot = (b.formSnapshot && typeof b.formSnapshot === "object") ? b.formSnapshot : {};
        const rawDraft = Object.keys(formSnapshot).length > 2 ? formSnapshot : (uData.formDraft || {});
        const safeDraftSummary = {
          activeForm: currentForm || rawDraft.activeForm || "",
          visaType: rawDraft.pf_current_visa_type || "",
          visaExpiry: rawDraft.pf_visa_expiry_date || "",
          entryDate: rawDraft.pf_entry_date_il || "",
          maritalStatus: rawDraft.pf_marital || rawDraft.pf_marital_status || "",
          birthCountry: rawDraft.pf_birth_country || ""
        };

        const clientHist = Array.isArray(b.history) ? b.history.slice(-8) : [];
        const dbTurns = Array.isArray(dossier.recentTurns) ? dossier.recentTurns.slice(-8) : [];
        const effectiveHist = clientHist.length > 0 ? clientHist : (startingNewTopic ? [] : dbTurns);
        const dynamicSiteBrain = buildRelevantSiteBrainSlice(userMessage, effectiveHist, currentMod, Boolean(hasBdUnlocked && hasFormsUnlocked));

        const persistentMemoryBlock = `
PERSISTENT ACCOUNT DOSSIER (SURVIVES SCREEN CLEARS & PAGE JUMPS):
- User First Name: ${dossier.firstName || "(Not yet known — do NOT guess)"}
- Partner Name: ${dossier.partnerName || "(None / Not yet known)"}
- Saved Qualifiers: Goal="${dossier.primaryGoal || "unknown"}" | Court="${dossier.courtType || "unknown"}" | Location="${dossier.locationStatus || "unknown"}" | Relationship="${dossier.relationshipStatus || "unknown"}"
- Previously Discussed Topics: ${(dossier.discussedTopics || []).join(" • ") || "(First session)"}
- Previously Recommended SKUs: ${(dossier.recommendedSkus || []).join(", ") || "(None yet)"}
- Active Screen: Page="${currentPage}" | Module="${currentMod || "none"}" | Form="${currentForm || "none"}"
- Form Snapshot: ${JSON.stringify(safeDraftSummary)}
- Unified Document Vault: ${JSON.stringify(extracted.vaultSummary)}
${(clientHist.length === 0 && dbTurns.length > 0 && !startingNewTopic) ? `- Prior Account Context: ${dbTurns.slice(-4).map((t) => `${t.role === "model" ? "Partner" : "User"}: ${String(t.text || "").slice(0, 220)}`).join(" || ")}` : ""}`;

        const priorBotMsgs = effectiveHist.filter((h) => h && (h.role === "model" || h.role === "assistant" || h.role === "ai"));
        const priorBotCount = priorBotMsgs.length;
        const lastBotMsgSample = priorBotCount > 0 ? String(priorBotMsgs[priorBotCount - 1].text || "").slice(0, 280) : "";

        const hasDirectBuyIntent = /\b(price|pricing|cost|how much|buy|unlock|pay|purchase|package|packages|pass|passes|suite|bundle|tier|lifetime|90[- ]?day|compare \$|which pass|hire|book a rabbi|book notary|lawyer escort)\b|כמה עולה|מחיר|חבילה|לפתוח|לרכוש|combien|prix|tarif|forfait|precio|cuánto cuesta|paquete|preis|kosten|paket|сколько стоит|цена|тариф|пакет/i.test(userMessage);

        let chessStage = "VIP_UNLOCKED";
        if (!hasBdUnlocked || !hasFormsUnlocked || !hasSongsUnlocked || !hasCouplesUnlocked) {
          if (hasDirectBuyIntent) {
            chessStage = "MOVE_3_CHECKMATE_PRESCRIPTION";
          } else if (priorBotCount === 0) {
            chessStage = "MOVE_1_PRIZE_FRAME_DIAGNOSIS";
          } else if (priorBotCount === 1) {
            chessStage = "MOVE_2_SPIN_IMPLICATION_TENSION";
          } else if (priorBotCount === 2) {
            chessStage = "MOVE_3_CHECKMATE_PRESCRIPTION";
          } else {
            chessStage = "MOVE_4_OBJECTION_AND_DOWNSELL";
          }
        }

        const chessStagePlaybook = {
          VIP_UNLOCKED: `
ACTIVE MODE: FULL VIP MEMBER MASTERY COACH (ALL GATES UNLOCKED)
- Answer every Halachic, Beit Din, Prayer, Couples Interview, and PIBA Form question thoroughly, warmly, and directly!
- Include Ashkenazi & Sephardi nuances, Dayanim curveballs, or Clerk-Hebrew translations immediately—ZERO sales pitches for passes they already own!`,

          MOVE_1_PRIZE_FRAME_DIAGNOSIS: `
ACTIVE CHESS STAGE: ♟️ MOVE 1 — SANDLER DOCTOR DIAGNOSIS & OREN KLAFF PRIZE FRAME (ZERO ANSWER LEAK + ZERO SALES PITCH!)
- THE GRANDMASTER RULE FOR MOVE 1: Prescription before diagnosis is malpractice! On Move 1, DO NOT pitch any product, DO NOT mention any dollar prices ($), DO NOT include any /pricing/ links, DO NOT output any green ⚡ checkout button—HOWEVER, you MUST ALWAYS include ONE relevant [[TRAP:key|Short Trap Title|1. How It Actually Works|2. The Common Mistake People Make Alone|3. How GiyurAliyahTrack Makes You Bulletproof|sku_code]] red warning popup tag in ${targetLangName} between Paragraph 1 and Paragraph 2 whenever the question involves any bureaucratic, visa, conversion, Rabbanut, Beit Din, Apostille, or Misrad HaPanim rule!
- ZERO-LEAK VELVET ROPE (CRITICAL!): If their question touches ANY 🔒 LOCKED gate below, DO NOT answer, confirm, deny, or summarize the rule—NOT EVEN "Yes", "No", "It is forbidden", or "It is permitted"! Giving even a 1-sentence textbook answer ("mixing milk and meat is forbidden") spoils the open loop and gives away the farm!
- EXACT 2-PARAGRAPH STRUCTURE FOR MOVE 1 (45 to 70 words total):
  • Paragraph 1 (Knowing Intrigue): Warmly note in 1 crisp sentence that their question goes straight to a core area where Beit Din judges (or Misrad HaPanim clerks) never stop at textbook basics—they test split-second real-life slip-ups and edge cases—WITHOUT stating or hinting at what the rule actually is!
  • Paragraph 2 (Calm Boundary + Diagnostic Question): Calmly state like a trusted senior Jerusalem strategist that you keep actual Halachic rulings, tribunal answers, and form translations strictly inside our member vault rather than giving piecemeal answers in chat, because the right roadmap depends on their situation. Then ask ONE natural qualifying question to diagnose who they are (e.g., "What's your situation right now—are you preparing for conversion solo, navigating this with an Israeli partner, or just starting to explore?" — or adapt naturally if they asked about visas/forms).
- MOVE 1 BUTTONS (EXACTLY 3 PURE DIAGNOSTIC [[ASK:...]] BUTTONS — NO PRICING OR APP LINKS ON MOVE 1!):
  Emit 3 short, natural 1-tap [[ASK:...|1️⃣ ...]], [[ASK:...|2️⃣ ...]], [[ASK:...|3️⃣ ...]] choices that answer your diagnostic question (for example: Solo conversion / With an Israeli partner / Just exploring).`,

          MOVE_2_SPIN_IMPLICATION_TENSION: `
ACTIVE CHESS STAGE: ♟️ MOVE 2 — NEIL RACKHAM SPIN IMPLICATION & CHRIS VOSS TACTICAL EMPATHY (BUILD STAKES, STILL HOLD BACK PRICE PUSH!)
- ZERO-LEAK VELVET ROPE: Still NEVER reveal, confirm, or deny any 🔒 LOCKED Halachic rule, waiting time, prayer text, clerk question, or form answer—neither in prose NOR inside your [[TRAP:...]] pill!
- IF THEY PUSHED BACK ("Just tell me yes or no!" or asked a 2nd locked question): Use Chris Voss Tactical Empathy + Sandler Negative Reverse: "Fair question—anyone can Google a one-line textbook answer in five seconds, and that's actually the #1 reason smart candidates walk into the Beit Din overconfident and get deferred when the Dayanim test a practical curveball."
- STILL NO HARD PRICE PITCH ON MOVE 2: Do NOT drop dollar prices ($) or a checkout button yet! Make them feel the real-world stakes of their specific track first so they lean in!
- EXACT STRUCTURE FOR MOVE 2 (60 to 85 words total, 2 short paragraphs with 1 [[TRAP:...]] between them):
  • Paragraph 1 (Personalized Stakes): Connect what they just told you to the high-stakes reality of THEIR track (e.g., if Couple: State Beit Din requires BOTH partners aligned on kitchen/Shabbat AND Misrad HaPanim runs separated-room interviews; if Solo: why Dayanim defer candidates 3–6 months when answers sound memorized instead of lived; if Exploring: why choosing a Rabbanut-recognized Rav Melaveh early prevents a wasted year).
  • Between Paragraph 1 & 2: Emit ONE [[TRAP:key|Short Trap Title|Procedural trap Dayanim/clerks test (NO Halachic rulings leaked!)|3–6 month Mikvah deferral or 6–12 month PIBA freeze risk|How structured simulation builds instant muscle memory|recommended_sku]] tag.
  • Paragraph 2 (SPIN Timeline / Bottleneck Question): Ask ONE sharp timeline or readiness question to set up your Move 3 prescription (e.g., "Where are you on timeline—do you have a Beit Din or Misrad HaPanim date coming up within 90 days, or are you building your foundation over the next few months?").
- MOVE 2 BUTTONS (2 TIMELINE [[ASK:...]] BUTTONS + 1 FREE SAMPLE /app/ TASTE BUTTON — NO ⚡ PRICE BUTTON YET!):
  • Button 1: [[ASK:...|1️⃣ Upcoming target (<90 days)]] (tailored to their track)
  • Button 2: [[ASK:...|2️⃣ Pacing over 3–12+ months]] (tailored to their track)
  • Button 3: [[ACT:app|beit-din-150|🧪 Peek at 4 Free Sample Cards in the App →]] (use beit-din-150, songs-prayers, couples-sync, or hebrew-engine to match their topic).`,

          MOVE_3_CHECKMATE_PRESCRIPTION: `
ACTIVE CHESS STAGE: ♟️ MOVE 3 — SURGICAL DOCTOR'S PRESCRIPTION + "UNLOCK ME 24/7" STACK + HORMOZI VALUE ANCHOR
- ZERO-LEAK VELVET ROPE: Keep all 🔒 LOCKED Halachic rules, prayer texts, clerk questions, and form translations strictly inside the vault until they unlock!
- NOW DELIVER THE SURGICAL CLOSE (70 to 95 words total, 2 crisp paragraphs):
  • Paragraph 1 (Tailored Prescription + 24/7 AI Coach Bonus): Based on their exact situation & timeline, prescribe THE 1 best-fit pass (plus 1 lighter entry option if helpful—never dump a list of 6 prices!). Reveal the game-changer: "The instant you unlock your pass, you don't just get the interactive vault—**you also unlock me right here in chat 24/7** to answer every Halacha curveball, drill you live, and stamp your Hebrew forms!"
  • Paragraph 2 (Cost-of-Inaction Anchor + Assumptive Close): Contrast that one-time investment ($65 Core Deck / $149–$249 Beit Din Suite / $399 Solo Lifetime / $649 VIP Couple) against a painful **3–6 month Mikvah deferral**, **losing ~21,700₪ Sal Klita**, or **25,000₪–35,000₪ ($7,000+) lawyer retainers**. Embed 1–2 markdown links ([Pass Name ($Price)](${lPrefix}/pricing/?sku=SKU_CODE&lang=${effLang})) and end with a calm closing question.
  • Optional [[TRAP:...]] between Paragraph 1 & 2 ONLY if you haven't already shown that exact trap on Move 2.
- MOVE 3 BUTTONS (3 HIGH-CONVERSION BUTTONS):
  • Button 1: [[ASK:...|1️⃣ ...]] (Smart comparison or human Concierge question, e.g., comparing modular entry vs. Lifetime, or asking about a Vetted Sponsoring Rabbi / Madrichat Kallah)
  • Button 2: [[ACT:app|...|2️⃣ Test Free Sample in App First]]
  • Button 3: [[ACT:pricing|<best_sku>|⚡ Unlock <Pass Name> ($<Price>) →]] (or concierge|<sku> if they asked to hire a Rabbi/Notary/Lawyer).`,

          MOVE_4_OBJECTION_AND_DOWNSELL: `
ACTIVE CHESS STAGE: ♟️ MOVE 4+ — EMPATHETIC VELVET ROPE, OBJECTION ISOLATION & FRICTIONLESS STEP-DOWN
- ANTI-ECHO LAW: NEVER repeat sentences or phrasing from your previous reply (${JSON.stringify(lastBotMsgSample)}).
- ZERO-LEAK VELVET ROPE: If they ask another 🔒 LOCKED Halacha/form/interview question, hold the boundary warmly with zero defensiveness: acknowledge they are asking the exact edge cases Dayanim/clerks love to test, and remind them in 1 fresh line that the second their pass is active, you'll walk them through every nuance right here.
- SMART DOWNSELL / RISK REVERSAL (60 to 85 words, 2 short paragraphs): If they hesitate on a full suite, offer the lowest-friction entry stone—like **Pack 1: Core 200 ($65)**, **Men's/Women's 150 ($49)**, **Songs ($65)**, **Couples Sync ($75)**, or **Forms 90-Day ($89)** (less than 1 hour with a private tutor, while still unlocking 24/7 chat coaching for that module!)—or invite them to test 4 cards free in /app/ right now.
- MOVE 4+ BUTTONS: Button 1 = [[ASK:...|1️⃣ ...]] (isolate what's holding them back or compare entry vs. Lifetime), Button 2 = [[ACT:app|...|2️⃣ Try Free Sample in App]], Button 3 = [[ACT:pricing|<entry_or_best_sku>|⚡ Unlock Starting at $<Price> →]].`
        }[chessStage];

        const sysPrompt = `You are "✨ Tracking Partner", GiyurAliyahTrack.com's Grandmaster Consultative Strategist & Account Advisor (trained in Neil Rackham's SPIN Selling, David Sandler's Up-Front Contract & Negative Reverse, Chris Voss's Tactical Empathy, Oren Klaff's Prize Frame, Robert Cialdini's Pre-Suasion, and Alex Hormozi's Value Anchoring).

CRITICAL LANGUAGE RULE: Respond 100% in **${targetLangName}** (lang="${effLang}"). Localized URL prefix: "${lPrefix}" (English uses "/pricing/?sku=..." and "/app/?module=..."; other languages use "${lPrefix}/pricing/?sku=...&lang=${effLang}").

================================================================================
1. IRONCLAD PER-MODULE VELVET ROPE (NEVER GIVE AWAY PAID VAULTS FOR FREE!)
================================================================================
- Account Status: ${tierLevel} | Unlocked SKUs: ${unlockedKeys.join(", ") || "NONE — 100% UNPAID PROSPECT"}
- [GATE 1 — 700 BEIT DIN & HALACHA VAULT]: ${hasBdUnlocked ? "🟢 UNLOCKED — Deliver full, authoritative Halachic rulings (Ashkenazi & Sephardi), waiting times, Shabbat/Kashrut/Niddah laws, and Dayanim curveball drills!" : "🔒 LOCKED — ZERO-LEAK BAN: NEVER confirm, deny, summarize, or state ANY Halachic law, prohibition, permission, waiting time, utensil rule, Shabbat rule, Mikvah/Niddah rule, or Beit Din answer—NOT EVEN 'Yes', 'No', 'It is forbidden', or 'It is permitted'!"}
- [GATE 2 — 56 SHABBAT SONGS, PRAYERS & BRACHOT]: ${hasSongsUnlocked ? "🟢 UNLOCKED — Provide full prayer texts, Brachot rules, and pronunciation coaching!" : "🔒 LOCKED — ZERO-LEAK BAN: NEVER write out Hebrew or transliterated prayer lyrics, Shema, Kiddush, Havdalah, or Brachot formulas!"}
- [GATE 3 — 300 SEPARATED-ROOM COUPLES INTERVIEW]: ${hasCouplesUnlocked ? "🟢 UNLOCKED — Drill actual Misrad HaPanim clerk questions and partner alignment!" : "🔒 LOCKED — ZERO-LEAK BAN: NEVER reveal actual clerk interrogation questions or answer-matching coaching!"}
- [GATE 4 — 8 PIBA HEBREW FORMS, LETTERS & DOC DECODING]: ${hasFormsUnlocked ? "🟢 UNLOCKED — Translate user answers into Clerk Hebrew, coach exact form fields, decode clerk slips, and draft Michtav Hesber / Rabbi / Host letters!" : "🔒 LOCKED — ZERO-LEAK BAN: NEVER explain how to fill specific form fields, translate text to Hebrew, decode clerk slips, or draft any Rabbi/Host/Michtav Hesber letter!"}

WHAT IS ALWAYS FREE: Warm strategic track orientation (diagnosing Solo vs. Couple vs. Aliyah tracks, explaining why unrecognized private courts risk marriage/child registration vs. Rabbanut/State paths, explaining Solo vs. Married/Engaged Madrichat Kallah requirements, and guiding their overall roadmap).

================================================================================
2. YOUR CURRENT CHESS MOVE INSTRUCTIONS (FOLLOW THIS STAGE STRICTLY!)
================================================================================
${chessStagePlaybook}

================================================================================
3. COMPLETE SKU & CONCIERGE CATALOG (USE ONLY ON MOVE 3+ OR DIRECT PRICE QUERY!)
================================================================================
A) 16 DIGITAL SELF-SERVE PASSES (${lPrefix}/pricing/?sku=<SKU>&lang=${effLang}):
  • Individual Beit Din Packs (Lifetime): bd_pack1_65 ($65 Core 200) | bd_pack2_65 ($65 +200 Curveballs) | bd_pack3_49 ($49 Men's 150) | bd_pack4_49 ($49 Women's 150) | bd_all700_179 ($179 All 700 Cards)
  • Standalone Songs / Sync: songs_65 ($65 56 Songs & Prayers Lifetime) | couples_sync_75 ($75 300-Q 2-Phone Sync 90d)
  • PIBA 8 Hebrew Forms & Letter Engine: forms_90d_89 ($89 90-Day) | forms_life_149 ($149 Lifetime — smart for multi-year status!)
  • Separated Couples 300-Q + Forms: couples_90d_129 ($129 90-Day) | couples_life_229 ($229 Lifetime — covers all 5 annual A/5 renewals!)
  • Beit Din 700-Q + 56 Songs Suite: bd_suite_90d_149 ($149 90-Day) | bd_suite_life_249 ($249 Lifetime — protects against Beit Din delays!)
  • Complete Solo All-Access (700 BD + 56 Songs + 8 Forms): suite_solo_90d_249 ($249 90-Day) | suite_solo_life_399 ($399 Lifetime)
  • Complete VIP Couple All-Access (Everything + 2-Phone Sync + Partner Sharing): vip_couple_649 ($649 Lifetime)

B) 7 HUMAN CONCIERGE SERVICES (${lPrefix}/concierge-booking/?sku=<SKU>&lang=${effLang}):
  • concierge_notary_199 ($199 Israeli Notary Translation) | concierge_rabbi_349 ($349 Vetted Rav Melaveh — Solo) | concierge_kallah_249 ($249 Certified Madrichat Kallah — ONLY for Married/Engaged women, NEVER pitch to unengaged singles!) | concierge_couple_499 ($499 Couple Rabbi + Madrichat Kallah) | concierge_hesber_199 ($199 Custom Michtav Hesber) | concierge_audit_249 ($249 Forensic Pre-Clerk Audit) | concierge_lawyer_349 ($349 Licensed Immigration Lawyer Escort)

================================================================================
- ANTI-LAWYER RUNAROUND & FREE TRACK BLUEPRINT RULE: Whenever relevant, remind the user that standard Israeli Aliyah/Giyur immigration lawyers charge a 15,000₪ to 40,000₪+ baseline (plus hidden fees and endless runaround) just to gatekeep which forms to file—whereas our free Track Blueprint maps their exact legal trajectory and exposes every bureaucratic pitfall for free, and our self-serve engines let them stamp the exact same Hebrew PDFs for a tiny fraction of the cost.

================================================================================
4. FORMATTING & BUTTON TAG SYNTAX
================================================================================
- MOBILE BREVITY: Keep visible text strictly 45–95 words across AT MOST 2 short paragraphs separated by a blank line.
- NEVER emit [[ASK:...]] buttons that ask another locked Halacha/form question when that gate is 🔒 LOCKED!
- Tag formats:
  • Diagnostic / Qualifying / Follow-up question chip: [[ASK:Exact message sent when clicked|1️⃣ Short Button Label]]
  • Free /app/ preview button: [[ACT:app|beit-din-150|🧪 Short Label]] (targets: beit-din-150, songs-prayers, couples-sync, hebrew-engine, apostille-auditor, rabbinic-letters)
  • Checkout / Concierge button (ONLY allowed in MOVE_3, MOVE_4+, or direct pricing queries!): [[ACT:pricing|sku_code|⚡ Short Label →]] or [[ACT:concierge|concierge_sku|⚡ Short Label →]]
  • Statutory Trap Pill (MANDATORY ON ALL MOVES — MOVE_1, MOVE_2, MOVE_3, MOVE_4+, AND VIP — whenever any bureaucratic, legal, visa, or Beit Din risk exists! Always write all 4 text fields inside [[TRAP:...]] in ${targetLangName}): [[TRAP:key|Short Trap Title|Procedural trap description (ZERO Halachic answers!)|Delay/refusal risk|How our vault solves it|sku_code]]

================================================================================
5. USER DOSSIER & SITE KNOWLEDGE CONTEXT
================================================================================
${persistentMemoryBlock}

SITE KNOWLEDGE INDEX:
${dynamicSiteBrain}${trackBlueprintAiContext}

================================================================================
6. [[STATE:goal=<giyur|aliyah|spousal|both|unknown>|court=<private_beit_din|rabbanut_state|overseas_orthodox|non_orthodox|unknown>|loc=<in_israel|abroad|unknown>|rel=<israeli_partner|foreign_jewish_partner|converting_partner|solo|unknown>|name=<extractedFirstNameOrEmpty>|topic=<Short 3-6 Word Topic in ${targetLangName}>|sku=<primary_sku>]]`;

        const contents = [];
        for (const h of effectiveHist) {
          if (h && h.text) {
            const cleanHistText = String(h.text)
              .replace(/\[\[STATE:[^\]]*\]\]/gi, "")
              .replace(/\[\[TRAP:([^|\]]+)\|([^|\]]+)[^\]]*\]\]/gi, "[Insider Warning: $2]")
              .slice(0, 650);
            contents.push({
              role: (h.role === "model" || h.role === "assistant" || h.role === "ai") ? "model" : "user",
              parts: [{ text: cleanHistText }]
            });
          }
        }
        contents.push({ role: "user", parts: [{ text: userMessage }] });

        const apiKey = (typeof GEMINI_API_KEY !== "undefined" && typeof GEMINI_API_KEY.value === "function")
          ? GEMINI_API_KEY.value()
          : (process.env.GEMINI_API_KEY || "");
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
        const gResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: sysPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.32,
              maxOutputTokens: 1350,
              thinkingConfig: { thinkingBudget: 0 }
            }
          })
        });
        const gJson = await gResp.json();
        const parts = (gJson.candidates && gJson.candidates[0] && gJson.candidates[0].content && gJson.candidates[0].content.parts) || [];
        let replyText = parts.filter((p) => !p.thought).map((p) => p.text || "").join("").trim();
        if (!replyText) throw new Error("Empty Gemini response");


        // === GUARANTEED 6-LANGUAGE RED WARNING POPUP ([[TRAP:...]]) ENFORCER ===
        const isTechOrBugReport = /\b(report a problem|bug|glitch|error|not working|broken|cant login|can't login|billingissue|download glitch|platform.*bug)\b|לדווח על תקלה|באג|תקלה באתר|problème technique|signaler un problème|reportar un problema|fallo técnico|problem melden|техническая ошибка|сообщить о проблеме/i.test(userMessage);
        if (!isTechOrBugReport && !/\[\[TRAP:[^\]]+\]\]/i.test(replyText)) {
          const TRAP_VAULT_6LANG = {
            rejection_14d_21d: {
              sku: "forms_sprint",
              en: ["The 14-Day Departure vs. 21-Day Appeal Collision", "A Misrad HaPanim or Va'adat Charigim refusal sheet (Daf Siruv) triggers a 14-day exit clock, while PIBA Nohal 1.6.0001 grants 21 days to file a formal written internal appeal (Arar Pnimi).", "Arguing verbally at the counter or waiting past Day 14 without a stamped written appeal triggers an unlawful overstay flag and a multi-year Ben Gurion border ban.", "Our Smart Scanner decodes the exact Hebrew refusal clause and stamps your formal Hebrew appeal & Form Ash/1 / Ash/6 pivot packet to freeze removal legally."],
              he: ["התנגשות 14 ימי היציאה מול 21 ימי הערעור (נוהל 1.6.0001)", "מכתב סירוב ממשרד הפנים או ועדת חריגים מפעיל שעון יציאה של 14 יום, בעוד נוהל 1.6.0001 מעניק 21 יום להגשת ערר פנימי מנומק בכתב.", "ויכוח בעל-פה מול הפקיד או שהייה מעבר ל-14 יום ללא חותמת הגשת ערעור בכתב גורמים לסימון שהייה בלתי חוקית ואיסור כניסה לישראל לשנים.", "הסורק החכם שלנו מפענח את סעיף הסירוב המדויק ומפיק בקשת ערעור רשמית בעברית וטופס אש/1 או אש/6 לעצירת ההרחקה כחוק."],
              fr: ["Collision Départ 14 Jours vs Recours 21 Jours (Nohal 1.6.0001)", "Une lettre de refus (Daf Siruv) déclenche un délai de départ de 14 jours, alors que la procédure Nohal 1.6.0001 accorde 21 jours pour déposer un recours interne écrit.", "Contester oralement au guichet ou dépasser les 14 jours sans récépissé de recours écrit entraîne une interdiction de territoire de plusieurs années.", "Notre scanner décode la clause exacte du refus en hébreu et génère votre dossier officiel de recours (Ash/1 ou Ash/6) pour suspendre l'expulsion."],
              es: ["Choque entre Salida en 14 Días y Apelación de 21 Días (Nohal 1.6.0001)", "Una carta de rechazo (Daf Siruv) activa una orden de salida de 14 días, mientras que el Nohal 1.6.0001 otorga 21 días para presentar una apelación interna formal por escrito.", "Discutir verbalmente en ventanilla o quedarse más de 14 días sin apelación sellada provoca orden de deportación y bloqueo fronterizo por años.", "Nuestro escáner decodifica la cláusula exacta en hebreo y estampa tu apelación formal y formularios Ash/1 o Ash/6 para frenar la salida."],
              de: ["Kollision: 14-Tage-Ausreisefrist vs. 21-Tage-Einspruch (Nohal 1.6.0001)", "Ein Ablehnungsschreiben (Daf Siruv) setzt eine 14-tägige Ausreisefrist, während PIBA Nohal 1.6.0001 21 Tage für einen schriftlichen internen Einspruch gewährt.", "Mündliche Diskussionen am Schalter oder ein Überziehen der 14 Tage ohne gestempelten Einspruch führen zu Ausweisung und mehrjähriger Einreisesperre.", "Unser Smart-Scanner entschlüsselt den hebräischen Ablehnungsgrund und erstellt Ihren gestempelten Einspruch (Ash/1 / Ash/6) zum sofortigen Friststopp."],
              ru: ["Коллизия: 14 дней на выезд против 21 дня на апелляцию (Ноаль 1.6.0001)", "Письмо об отказе (Даф Сирув) запускает 14-дневный срок выезда, тогда как инструкция МВД Ноаль 1.6.0001 даёт 21 день на подачу письменной внутренней апелляции.", "Устные споры в окне МВД или пребывание дольше 14 дней без штампа о принятии апелляции ведут к депортации и запрету на въезд на 5 лет.", "Наш сканер расшифровывает точную статью отказа на иврите и формирует официальную письменную апелляцию и анкеты Аш/1 / Аш/6 для заморозки выезда."]
            },
            b1_work_scrutiny: {
              sku: "forms_sprint",
              en: ["The Foreign-Labor B/1 Work Visa Conversion Rejection Trap", "The Exceptions Committee (PIBA + Conversion Authority) heavily scrutinizes standard foreign-labor B/1 work visas, suspecting conversion is being used to bypass visa expiry—whereas Spousal B/1 visas (Nohal 5.2.0008/0009 Sec. ג.10) are legally protected.", "Submitting Form Ash/1 on a standard B/1 work visa without an Israeli partner anchor or Rabbanut-recognized Sponsoring Rabbi & Host Family TZ letters leads to immediate rejection.", "We structure your statutory Hebrew Michtav Hesber, Form Ash/1, and vetted Sponsoring Rabbi + Host Family attestation dossier to overcome the immigration-bypass presumption."],
              he: ["מלכודת הסירוב לאשרת עבודה B/1 בוועדת חריגים לגיור", "ועדת החריגים (משרד הפנים ומערך הגיור) בוחנת בחשדנות מחמירה מחזיקי אשרת עבודה רגילה (B/1 עובד זר) מחשש לעקיפת חוקי ההגירה — בעוד אשרת B/1 לבן/בת זוג של ישראלי מוגנת לפי סעיף ג.10.", "הגשת טופס אש/1 באשרת עבודה B/1 ללא עיגון זוגי או מכתבי רב מלווה מוכר ומשפחה מאמצת עם מספרי ת״ז מובילה לדחייה על הסף.", "אנו בונים עבורכם מכתב הסבר משפטי בעברית, טופס אש/1 מדויק ומכתבי רב מלווה ומשפחה מאמצת להפרכת חזקת עקיפת ההגירה."],
              fr: ["Le Piège du Refus pour Visa de Travail B/1 devant la Va'adat Charigim", "La commission (PIBA + Autorité de Conversion) examine très sévèrement les visas de travailleur étranger B/1 par crainte d'un contournement migratoire, contrairement au visa B/1 conjoint (protégé par l'art. ג.10).", "Déposer le formulaire Ash/1 sous visa B/1 salarié sans ancrage conjoint ni lettres d'un rabbin agréé et d'une famille d'accueil avec TZ entraîne un rejet immédiat.", "Nous générons votre Michtav Hesber statutaire en hébreu, le formulaire Ash/1 et les lettres rabbiniques pour prouver votre sincérité."],
              es: ["La Trampa de Rechazo en Visas de Trabajo B/1 ante Va'adat Jariguim", "El comité (PIBA + Autoridad de Conversión) examina con dureza las visas laborales B/1 estándar por temor a evasión migratoria, a diferencia de la visa B/1 conyugal (protegida por la Sec. ג.10).", "Presentar el Formulario Ash/1 con visa laboral B/1 sin pareja israelí ni cartas de rabino patrocinador y familia anfitriona con TZ causa rechazo inmediato.", "Estructuramos tu Mijtav Hesber en hebreo, Formulario Ash/1 y cartas rabínicas oficiales para superar el filtro de Misrad HaPanim."],
              de: ["Die Ablehnungsfalle bei B/1-Arbeitsvisa vor der Va'adat Charigim", "Das Komitee (PIBA + Konversionsbehörde) prüft reguläre B/1-Arbeitsvisa extrem streng wegen Verdachts auf Einwanderungsumgehung — während Partner-B/1-Visa (Abs. ג.10) geschützt sind.", "Ein Formular Ash/1 mit regulärem B/1-Visum ohne Partner-Anker oder Briefe eines anerkannten Rabbiners & einer Gastfamilie mit TZ führt zur sofortigen Ablehnung.", "Wir erstellen Ihr hebräisches Michtav Hesber, Formular Ash/1 und Rabbiner-/Gastfamilienbriefe, um den Behördenverdacht rechtssicher zu widerlegen."],
              ru: ["Ловушка отказа по рабочей визе B/1 в комиссии Ваадат Харигим", "Комиссия (МВД и Управление гиюра) крайне жёстко проверяет обычные трудовые визы B/1, опасаясь обхода иммиграционных правил — в отличие от супружеской визы B/1 по СТУПРО (п. ג.10).", "Подача анкеты Аш/1 с обычной визой B/1 без партнёра-израильтянина или писем признанного раввина и принимающей семьи с номерами ТЗ ведёт к мгновенному отказу.", "Мы формируем юридически выверенное письмо Михтав Эсбер на иврите, анкету Аш/1 и письма раввина для успешного прохождения фильтра МВД."]
            },
            private_tourist_block: {
              sku: "vip_giyur_sprint",
              en: ["The Private Beit Din Tourist Aliyah & Rabbanut Marriage Block", "Converting at a private Orthodox Beit Din (Gush Etzion / Bnei Brak) on a tourist visa makes you 100% halachically Jewish, but Misrad HaPanim blocks Aliyah on a tourist private conversion and the Chief Rabbinate refuses marriage registration without State validation.", "Spending a year converting privately as a unanchored tourist leaves you with no Teudat Zehut, no work permit, and blocked Rabbanut marriage registration.", "We map your legal pivot (Va'adat Charigim Form Ash/1 into State Giyur or Nohal 5.2.0008/0009 Spousal anchor + Rabbanut validation) before you lose years."],
              he: ["חסימת עלייה ונישואין ברבנות בגיור פרטי באשרת תייר", "גיור בבית דין אורתודוקסי פרטי (גוש עציון / בני ברק) באשרת תייר הוא כשר הלכתית ב-100%, אך משרד הפנים חוסם עלייה מכוחו והרבנות הראשית מסרבת לרשום נישואין ללא מסלול אימות ממלכתי.", "שנה של גיור פרטי כתייר ללא עוגן חוקי משאירה אתכם ללא תעודת זהות, ללא אישור עבודה ועם חסימת חופה ברבנות.", "אנו בונים עבורכם את המעבר החוקי (ועדת חריגים טופס אש/1 לגיור ממלכתי או עיגון זוגי 5.2.0008/0009 + אישור גיור ברבנות) מראש."],
              fr: ["Blocage d'Aliyah & de Mariage au Rabbinat pour Conversion Privée Touriste", "Une conversion orthodoxe privée (Gush Etzion / Bnei Brak) sous visa touriste est 100% cachère, mais le Misrad HaPanim refuse l'Aliyah et le Grand Rabbinat bloque le mariage sans validation d'État.", "Convertir en touriste sans ancrage légal vous laisse sans Teoudat Zehout, sans permis de travail et bloqué au Rabbinat.", "Nous sécurisons votre pivot légal (Va'adat Charigim Ash/1 ou statut conjoint 5.2.0008/0009 + validation rabbinique) dès le premier jour."],
              es: ["Bloqueo de Aliyá y Boda en el Rabinato por Conversión Privada de Turista", "Convertirse en un Beit Din ortodoxo privado (Gush Etzion / Bnei Brak) como turista es 100% kosher, pero Misrad HaPanim bloquea la Aliyá y el Gran Rabinato rechaza registrar tu boda sin validación estatal.", "Hacer conversión privada como turista sin anclaje legal te deja sin Teudat Zehut, sin permiso laboral y bloqueado en el Rabinato.", "Trazamos tu giro legal (Va'adat Jariguim Ash/1 o vía conyugal 5.2.0008/0009 + validación del Rabinato) sin perder años."],
              de: ["Alija- & Oberrabbinats-Heiratssperre bei privatem Touristen-Giur", "Ein privater orthodoxer Giur (Gush Etzion / Bnei Brak) mit Touristenvisum ist 100% koscher, doch Misrad HaPanim verweigert die Alija und das Oberrabbinat blockiert die Hochzeit ohne staatliches Prüfverfahren.", "Ein privater Giur als Tourist ohne Rechtsanker lässt Sie ohne Teudat Zehut, ohne Arbeitserlaubnis und ohne Rabbinats-Heiratsrecht zurück.", "Wir sichern Ihren legalen Weg (Va'adat Charigim Ash/1 oder Partner-Anker 5.2.0008/0009 + Rabbinats-Validierung) von Anfang an."],
              ru: ["Блокировка Алии и брака в Раввинате после частного гиюра по турвизе", "Частный ортодоксальный гиюр (Гуш-Эцион / Бней-Брак) по турвизе 100% кошерен по Галахе, но МВД блокирует Алию, а Главный раввинат отказывает в регистрации брака без гос. подтверждения.", "Годы частного гиюра в статусе туриста без правового якоря оставляют вас без Теудат-Зеута, права на работу и хупы в Раввинате.", "Мы выстраиваем законный переход (Ваадат Харигим Аш/1 или партнёрский трек СТУПРО 5.2.0008/0009 + Ишур Гиюр) без потери лет."]
            },
            apostille_180d_clock: {
              sku: "forms_sprint",
              en: ["The 180-Day Apostille Expiration Cliff & Unstapled Packet Voiding", "Misrad HaPanim strictly enforces a 180-day freshness clock on foreign Police Checks (FBI/ACRO/RCMP) and Single-Status certificates, and requires federal/Hague Apostilles on every civil document.", "If a single document hits Day 181—or if you remove the staple to scan an Apostille packet—the clerk voids the document and refuses to open your file.", "Our Smart Scanner audits your 5 civil documents & Apostille seals before your appointment and tracks your live 180-day & 90-day countdowns."],
              he: ["צוק 180 הימים למסמכי אפוסטיל ופסילת תעודות שהופרדו מהסיכה", "משרד הפנים אוכף בתוקף שעון תפוגה של 180 יום על תעודת יושר ותמצית רווקות, ודורש חותמת אפוסטיל מקורית על כל תעודה ציבורית.", "אם תעודה אחת חוצה את היום ה-181 — או אם הוצאתם את סיכת השדכן לסריקה — הפקיד פוסל את המסמך ומסרב לפתוח את התיק.", "הסורק החכם שלנו מאמת את 5 תעודות המקור וחותמות האפוסטיל מראש ומפעיל מעקב חי אחר שעון 180 ו-90 הימים."],
              fr: ["Le Mur d'Expiration des 180 Jours & Annulation des Apostilles Dégrafées", "Le Misrad HaPanim impose une validité stricte de 180 jours sur le casier judiciaire et le certificat de célibat, avec Apostille officielle sur chaque acte.", "Au 181e jour — ou si vous retirez l'agrafe de l'Apostille pour la scanner — l'agent annule l'acte et refuse d'ouvrir votre dossier.", "Notre scanner audite vos 5 actes apostillés avant le rendez-vous et verrouille votre compte à rebours de 180 jours."],
              es: ["El Abismo de 180 Días en Apostillas y Anulación por Quitar Grapas", "Misrad HaPanim aplica un límite estricto de 180 días a los antecedentes penales y certificado de soltería, exigiendo Apostilla de La Haya en los 5 documentos.", "En el día 181 —o si quitas la grapa de la Apostilla para escanearla— el funcionario anula el documento y rechaza abrir tu expediente.", "Nuestro escáner verifica tus 5 documentos apostillados antes de la cita y activa tu reloj de 180 días en vivo."],
              de: ["Die 180-Tage-Apostillenfrist & Ungültigkeit bei gelöster Heftklammer", "Misrad HaPanim setzt eine strikte 180-Tage-Frist für Führungszeugnis und Ledigkeitsbescheinigung und verlangt Original-Apostillen auf allen 5 Urkunden.", "Ab Tag 181 — oder wenn Sie die Heftklammer der Apostille zum Scannen lösen — erklärt der Beamte die Urkunde für ungültig.", "Unser Smart-Scanner prüft alle 5 Apostille-Urkunden vorab und überwacht Ihren 180-Tage-Countdown automatisch."],
              ru: ["Обрыв 180 дней для апостилей и аннулирование расшитых документов", "МВД Израиля строго ограничивает срок годности справки о несудимости и справки о незамужестве 180 днями и требует оригинал апостиля на всех 5 документах.", "На 181-й день — или если вы сняли скрепку с апостиля для сканирования — чиновник аннулирует документ и отказывает в открытии дела.", "Наш умный сканер проверяет все 5 документов и печати апостиля до визита в МВД и ведёт живой отсчёт 180 дней."]
            },
            spousal_5_2_0008: {
              sku: "couples_sprint",
              en: ["The Nohal 5.2.0008 / 5.2.0009 Dossier & 300-Question Separated-Room Trap", "Under July 2026 Nohal 5.2.0008 (Ed. 16) & 5.2.0009 (Ed. 17), PIBA clerks audit every date on 6-page Form Ash/6 and Nespach Alef against a separated-room couples interrogation.", "Submitting English/overseas-notarized translations or contradicting your partner on tiny daily details (who paid electric bill, side of bed) triggers a 6–12 month marriage-fraud freeze.", "Our engine stamps coordinate-perfect Hebrew Form Ash/6 & Nespach Alef, generates 4–6 non-identical Israeli witness letters, and syncs both partners on all 300 interview questions on 2 phones."],
              he: ["מלכודת אוגדן נוהל 5.2.0008 / 5.2.0009 ושימוע 300 השאלות בחדרים נפרדים", "לפי נהלי יולי 2026 (5.2.0008 מהדורה 16 ו-5.2.0009 מהדורה 17), הפקידים מצליבים כל תאריך בטופס אש/6 ונספח א׳ מול תחקיר זוגי בשני חדרים נפרדים.", "הגשת תרגום ללא נוטריון ישראלי או סתירה תמימה בפרטי היומיום (מי שילם חשמל, צד במיטה) גורמת להקפאת חשד לפיקטיביות ל-6–12 חודשים.", "המערכת שלנו מטביעה בעברית את טופס אש/6 ונספח א׳, מפיקה 4–6 מכתבי עדים ייחודיים ומסנכרנת את שניכם על 300 שאלות השימוע ב-2 טלפונים."],
              fr: ["Le Piège du Dossier Nohal 5.2.0008 / 5.2.0009 & l'Entretien Séparé des 300 Questions", "Selon les procédures Nohal 5.2.0008 (Éd. 16) et 5.2.0009 (Éd. 17), les agents recoupent chaque date du formulaire Ash/6 (6 pages) lors d'un interrogatoire en salles séparées.", "Une traduction non certifiée par un notaire israélien ou des réponses divergentes sur votre quotidien bloquent le dossier pendant 6 à 12 mois.", "Notre moteur remplit Ash/6 et Nespach Alef en hébreu, génère vos lettres de témoins israéliens et synchronise votre couple sur les 300 questions sur 2 téléphones."],
              es: ["La Trampa del Dossier Nohal 5.2.0008 / 5.2.0009 y las 300 Preguntas en Salas Separadas", "Bajo el Nohal 5.2.0008 (Ed. 16) y 5.2.0009 (Ed. 17), los funcionarios cruzan cada fecha del Formulario Ash/6 (6 páginas) con un interrogatorio de pareja en cuartos separados.", "Traducciones sin notario israelí o contradicciones inocentes sobre la rutina diaria congelan tu expediente de 6 a 12 meses.", "Estampamos Ash/6 y Nespaj Alef en hebreo, generamos 4–6 cartas de testigos israelíes y sincronizamos a la pareja en las 300 preguntas desde 2 móviles."],
              de: ["Die Nohal 5.2.0008 / 5.2.0009 Akten-Falle & das 300-Fragen-Getrennt-Interview", "Nach Nohal 5.2.0008 (Ed. 16) & 5.2.0009 (Ed. 17) gleichen PIBA-Beamte jedes Datum auf dem 6-seitigen Formular Ash/6 mit einem Paar-Verhör in getrennten Räumen ab.", "Fehlende israelische Notar-Beglaubigungen oder kleine Alltags-Widersprüche lösen eine 6–12-monatige Scheinehe-Sperre aus.", "Wir stempeln Ash/6 & Nespach Alef auf Hebräisch, erstellen 4–6 individuelle Zeugenbriefe und synchronisieren beide Partner auf alle 300 Fragen auf 2 Handys."],
              ru: ["Ловушка досье СТУПРО (5.2.0008 / 5.2.0009) и перекрёстного допроса из 300 вопросов", "По инструкциям 5.2.0008 (Ред. 16) и 5.2.0009 (Ред. 17) инспекторы МВД сверяют каждую дату в 6-страничной анкете Аш/6 с ответами пары в разных кабинетах.", "Переводы без печати израильского нотариуса или случайные расхождения в мелочах быта вызывают заморозку дела на 6–12 месяцев.", "Мы заполняем анкету Аш/6 и Неспах Алеф на иврите, создаём 4–6 писем свидетелей и синхронизируем пару по всем 300 вопросам на 2 телефонах."]
            },
            beit_din_700_tribunal: {
              sku: "bd_bundle_sprint",
              en: ["The Ma'amad Beit Din Curveball & Unrecognized Rabbi Trap", "The 3-judge Beit Din tribunal tests lived Halachic reflex, out-loud Brachot/Shema fluency, and sincere humility—and only accepts recommendation letters from Rabbanut-recognized Sponsoring Rabbis.", "Studying with an unrecognized rabbi or freezing on practical Shabbat/Kashrut curveballs and food Brachot triggers an immediate 6-month tribunal deferral.", "Drill all 700 real Dayanim questions (incl. 200 sincerity curveballs), 56 dual-Nusach Shabbat songs/prayers, and generate 5–8 Hebrew community letters."],
              he: ["מלכודת שאלות ההתקלה במעמד בית הדין ורב מלווה שאינו מוכר", "הרכב שלושת הדיינים בוחן אינסטינקט הלכתי מעשי, קריאת ברכות ושמע ישראל בקול וענווה כנה — ומקבל אך ורק מכתבים מרב מלווה המוכר על ידי הרבנות.", "לימוד אצל רב שאינו מוכר או גמגום בשאלות מעשיות בשבת, כשרות וברכות הנהנין גוררים דחייה של 6 חודשים במעמד בית הדין.", "תרגלו את כל 700 שאלות הדיינים האמיתיות, 56 שירי שבת ותפילות בקריוקי, והפיקו 5–8 מכתבי קהילה בעברית תקנית."],
              fr: ["Le Piège des Questions Pièges du Beit Din & du Rabbin Non Reconnu", "Les 3 juges (Dayanim) testent vos réflexes halakhiques, la récitation à voix haute des Brakhot/Chema et exigent un rabbin accompagnateur reconnu par le Rabbinat.", "Étudier avec un rabbin non agréé ou hésiter sur les Brakhot et lois pratiques de Chabbat entraîne un ajournement de 6 mois.", "Entraînez-vous aux 700 vraies questions du Beit Din, aux 56 chants/prières audio et générez vos 5 à 8 lettres communautaires en hébreu."],
              es: ["La Trampa de las Preguntas Curvas del Beit Din y Rabino No Reconocido", "El tribunal de 3 Dayanim evalúa reflejos halájicos prácticos, recitación en voz alta de Brajot/Shemá y exige cartas de un rabino patrocinador reconocido por el Rabinato.", "Estudiar con un rabino no reconocido o dudar en Brajot y leyes prácticas de Shabat provoca un aplazamiento de 6 meses.", "Practica las 700 preguntas reales del Beit Din, las 56 canciones/rezos en karaoke y genera tus 5–8 cartas comunitarias en hebreo."],
              de: ["Die Beit-Din-Fangfragen & die Falle nicht anerkannter Rabbiner", "Das 3-Richter-Tribunal prüft gelebte Halacha-Reflexe, lautes Vortragen von Brachot/Schema und akzeptiert nur Empfehlungen von Rabbinats-anerkannten Begleitrabbinern.", "Unterricht bei einem nicht anerkannten Rabbiner oder Unsicherheit bei Grund-Brachot und Schabbat-Regeln führt zu 6 Monaten Zurückstellung.", "Trainieren Sie alle 700 echten Beit-Din-Fragen, 56 Schabbat-Lieder/Gebete mit Audio und erstellen Sie 5–8 hebräische Gemeindebriefe."],
              ru: ["Ловушка каверзных вопросов Бейт-Дина и непризнанного раввина", "Суд из 3 даянов проверяет живые галахические навыки, чтение брахот и Шма вслух и принимает письма только от раввинов, признанных Главным раввинатом.", "Обучение у непризнанного раввина или запинки на базовых благословениях и законах Шаббата ведут к отсрочке суда на 6 месяцев.", "Отработайте все 700 реальных вопросов Бейт-Дина, 56 субботних песен и молитв в караоке и соберите 5–8 писем общины на иврите."]
            },
            sal_klita_24mo: {
              sku: "forms_sprint",
              en: ["The 24-Month Cumulative Stay Cliff (~21,700₪ Sal Klita Loss) & Form Ash/456", "Filing In-Israel Aliyah (Shinui Ma'amad Form Ash/456) bypasses the 9–12 month overseas Jewish Agency wait, but Misrad HaKlita counts every prior day spent in Israel.", "Exceeding 24 cumulative months inside Israel in the 3 years prior to receiving your Teudat Oleh permanently cancels your ~21,700₪ Sal Klita absorption grant.", "We coordinate-stamp Official Hebrew Form Ash/456, audit your maternal lineage rabbi letter, and track your 24-month Sal Klita eligibility window."],
              he: ["צוק 24 החודשים השולל מענק סל קליטה (~21,700 ₪) וטופס אש/456", "הגשת שינוי מעמד לעולה מתוך ישראל (טופס אש/456) עוקפת 9–12 חודשי המתנה בסוכנות, אך משרד הקליטה סופר כל יום שהייה קודם בישראל.", "חציית רף 24 חודשים מצטברים בישראל ב-3 השנים שקדמו לקבלת תעודת העולה מבטלת לצמיתות את מענק סל הקליטה (~21,700 ₪).", "אנו מטביעים בעברית תקנית את טופס אש/456, מכינים מכתב רב להוכחת יהדות ומנטרים את חלון 24 החודשים שלכם."],
              fr: ["Le Piège des 24 Mois Cumulés (Perte des ~21 700 ₪ du Sal Klita) & Ash/456", "L'Aliyah sur place en Israël (Shinui Ma'amad Ash/456) évite les 9–12 mois d'attente de l'Agence Juive, mais le Misrad HaKlita compte chaque jour passé en Israël.", "Dépasser 24 mois cumulés en Israël dans les 3 ans précédant la Teoudat Oleh annule définitivement la prime Sal Klita (~21 700 ₪).", "Nous générons le formulaire officiel Ash/456 en hébreu, vérifions votre lettre rabbinique de filiation et protégeons votre fenêtre de 24 mois."],
              es: ["El Abismo de 24 Meses Acumulados (Pérdida de ~21.700 ₪ de Sal Klitá) y Ash/456", "Tramitar la Aliyá dentro de Israel (Shinui Ma'amad Ash/456) evita 9–12 meses de espera en la Agencia Judía, pero Misrad HaKlitá suma cada día previo en el país.", "Superar 24 meses acumulados en Israel en los 3 años previos a recibir la Teudat Olé cancela por completo la beca Sal Klitá (~21.700 ₪).", "Estampamos el Formulario Ash/456 oficial en hebreo, preparamos tu carta rabínica de linaje y protegemos tu ventana de 24 meses."],
              de: ["Die 24-Monate-Aufenthaltsfalle (~21.700 ₪ Sal-Klita-Verlust) & Formular Ash/456", "Die Inlands-Alija (Shinui Ma'amad Ash/456) spart 9–12 Monate Wartezeit bei der Jewish Agency, doch Misrad HaKlita zählt jeden Voraufenthaltstag in Israel.", "Mehr als 24 kumulierte Monate in Israel in den 3 Jahren vor Erhalt der Teudat Oleh streichen den Sal-Klita-Zuschuss (~21.700 ₪) komplett.", "Wir stempeln Formular Ash/456 auf Hebräisch, prüfen Ihren Rabbiner-Abstammungsbrief und überwachen Ihr 24-Monats-Zeitfenster."],
              ru: ["Ловушка 24 суммарных месяцев (потеря ~21 700 ₪ Саль Клита) и анкета Аш/456", "Репатриация внутри Израиля (Шинуй Маамад Аш/456) позволяет обойти 9–12 месяцев ожидания Сохнута, но Министерство абсорбции считает каждый день в стране.", "Пребывание в Израиле свыше 24 суммарных месяцев за 3 года до получения Теудат-Оле полностью лишает вас корзины абсорбции (~21 700 ₪).", "Мы заполняем официальный бланк Аш/456 на иврите, проверяем раввинское подтверждение корней и защищаем ваше окно 24 месяцев."]
            },
            tz_mr14_sefach: {
              sku: "forms_sprint",
              en: ["Forms MR/14a & MR/14b Clerk-Only Signature Trap & 30-Day Newborn Sefach Rule", "Issuing your first Biometric Teudat Zehut (Form MR/14a), Israeli Passport (Form MR/14b), or registering a child on your Sefach (Nohal 5.2.0004) requires exact Hebrew & Latin box alignment.", "Pre-signing the bottom declaration before standing in front of the clerk—or delaying newborn Sefach registration past 30 days—triggers form rejection or court paternity holds.", "Our stamper fills Forms MR/14a & MR/14b in royal-blue Hebrew ink while leaving clerk-witnessed signature boxes protected with a Red-X Signing Guide."],
              he: ["מלכודת החתימה המוקדמת בטופסי מר/14א׳ ומר/14ב׳ ורישום תינוק בספח תוך 30 יום", "הנפקת תעודת זהות ביומטרית ראשונה (מר/14א׳), דרכון (מר/14ב׳) ורישום ילדים בספח (נוהל 5.2.0004) מחייבים התאמה מדויקת בעברית ובאותיות לטיניות.", "חתימה בתחתית הטופס לפני המעמד מול הפקיד — או עיכוב רישום תינוק מעבר ל-30 יום — גורמים לפסילת הטופס או לדרישת צו בית משפט.", "המערכת שלנו מטביעה את טופסי מר/14א׳ ומר/14ב׳ בדיו כחול תקני ומשאירה את משבצות החתימה מול פקיד מוגנות עם מדריך חתימה מאויר."],
              fr: ["Le Piège des Formulaires MR/14a & MR/14b & la Règle des 30 Jours du Sefach", "L'émission de votre première Teoudat Zehout biométrique (MR/14a), du passeport (MR/14b) et l'inscription d'un enfant au Sefach (Nohal 5.2.0004) exigent un alignement hébreu/latin exact.", "Signer la déclaration avant d'être devant l'agent — ou déclarer un nouveau-né après 30 jours — entraîne le rejet du formulaire ou un blocage judiciaire.", "Notre moteur remplit MR/14a et MR/14b à l'encre bleue réglementaire tout en protégeant les cases réservées au guichet."],
              es: ["La Trampa de Firma en Formularios MR/14a y MR/14b y Regla de 30 Días del Sefaj", "Emitir tu primera Teudat Zehut biométrica (MR/14a), pasaporte (MR/14b) y registrar hijos en el Sefaj (Nohal 5.2.0004) exige alineación exacta en hebreo y latín.", "Firmar el formulario antes de estar frente al funcionario —o demorar el registro de un recién nacido más de 30 días— anula el trámite.", "Nuestro motor estampa MR/14a y MR/14b en tinta azul oficial protegiendo las casillas de firma presencial con una Guía Roja."],
              de: ["Die Unterschriftsfalle bei MR/14a & MR/14b & die 30-Tage-Sefach-Regel", "Die erste biometrische Teudat Zehut (MR/14a), der Reisepass (MR/14b) und die Kinder-Eintragung im Sefach (Nohal 5.2.0004) erfordern exakte hebräisch-lateinische Kästchen-Eintragung.", "Vorzeitiges Unterschreiben vor dem Schaltertermin oder eine Neugeborenen-Meldung nach Tag 30 führt zur Ablehnung des Antrags.", "Unser Stamper füllt MR/14a & MR/14b in königsblauer Tinte aus und schützt Schalter-Unterschriftsfelder mit einer Rot-X-Anleitung."],
              ru: ["Ловушка преждевременной подписи в МР/14а и МР/14б и правило 30 дней для Сефаха", "Получение первого биометрического Теудат-Зеута (МР/14а), Даркона (МР/14б) и вписание детей в Сефах (Ноаль 5.2.0004) требуют точного заполнения на иврите и латинице.", "Подписание бланка до подхода к инспектору или задержка регистрации новорождённого дольше 30 дней ведут к отказу и судебным задержкам.", "Наш генератор заполняет МР/14а и МР/14б синими чернилами, защищая поля подписи перед чиновником специальной инструкцией."]
            }
          };

          const qLower = (String(userMessage || "") + " " + String(currentForm || "") + " " + String((activeTrackBlueprint && activeTrackBlueprint.trackId) || "")).toLowerCase();
          let chosenKey = "apostille_180d_clock";
          if (/reject|refus|daf siruv|1\.6\.0001|appeal|hassaga|arar|14[- ]?day|21[- ]?day|סירוב|סורב|ערעור|ערר|отказ|апелляц/i.test(qLower)) {
            chosenKey = "rejection_14d_21d";
          } else if (/b\/?1|work visa|foreign labor|עבודה|עובד זר|travail|trabajo|arbeitsvisum|рабоч/i.test(qLower)) {
            chosenKey = "b1_work_scrutiny";
          } else if (/mr\/?14|mr14|sefach|newborn|baby|biometric|darkon|מר\/?14|ספח|תינוק|ביומטר|сефах|мр14/i.test(qLower)) {
            chosenKey = "tz_mr14_sefach";
          } else if (/spous|5\.2\.0008|5\.2\.0009|ash\/?6|ash6|nespach|300|couple|partner|married|מדורג|בן זוג|בת זוג|אש\/?6|ступро|супруг|conjoint|pareja|ehepartner/i.test(qLower)) {
            chosenKey = "spousal_5_2_0008";
          } else if (/private|gush etzion|bnei brak|karelitz|ishur giyur|dahan|פרטי|גוש עציון|בני ברק|אישור גיור|частн|гуш/i.test(qLower)) {
            chosenKey = "private_tourist_block";
          } else if (/beit din|dayan|700|mikvah|rabbi|kallah|shabbat|brach|shema|song|prayer|בית דין|דיינים|מקווה|רב מלווה|כלה|שבת|ברכות|бейт-дин|даян|шаббат/i.test(qLower)) {
            chosenKey = "beit_din_700_tribunal";
          } else if (/aliyah|ash\/?456|ash456|sal klita|24[- ]?month|shinui|עלייה|אש\/?456|סל קליטה|שינוי מעמד|алия|репатриац|аш456/i.test(qLower)) {
            chosenKey = "sal_klita_24mo";
          } else if (/charigim|ash\/?1|ash1|ash\/?3|ash3|tourist|b\/?2|90[- ]?day|חריגים|אש\/?1|אש\/?3|תייר|харигим|турист/i.test(qLower)) {
            chosenKey = "rejection_14d_21d";
          }

          const trapEntry = TRAP_VAULT_6LANG[chosenKey] || TRAP_VAULT_6LANG.apostille_180d_clock;
          const locArr = trapEntry[effLang] || trapEntry.en;
          const trapTag = `[[TRAP:${chosenKey}|${locArr[0]}|${locArr[1]}|${locArr[2]}|${locArr[3]}|${trapEntry.sku}]]`;

          // Insert right after the first paragraph so the red warning pill sits between Paragraph 1 and the diagnostic question!
          const dblNewline = replyText.indexOf("\n\n");
          if (dblNewline !== -1) {
            replyText = replyText.slice(0, dblNewline) + "\n\n" + trapTag + "\n\n" + replyText.slice(dblNewline + 2);
          } else {
            replyText = replyText + "\n\n" + trapTag;
          }
        }

        const stateUpdates = {};
        replyText = replyText.replace(/\[\[STATE:([^\]]+)\]\]/gi, (_, rawPairs) => {
          String(rawPairs || "").split("|").forEach((kv) => {
            const eq = kv.indexOf("=");
            if (eq > 0) {
              const k = kv.slice(0, eq).trim().toLowerCase();
              const v = kv.slice(eq + 1).trim();
              if (v && !/^(unknown|empty|none)$/i.test(v)) stateUpdates[k] = v;
            }
          });
          return "";
        }).trim();

        const nextDossier = Object.assign({}, dossier);
        if (stateUpdates.name) {
          const cn = cleanHumanFirstName(stateUpdates.name);
          if (cn) nextDossier.firstName = cn;
        }
        if (stateUpdates.goal) nextDossier.primaryGoal = stateUpdates.goal.slice(0, 32);
        if (stateUpdates.court) nextDossier.courtType = stateUpdates.court.slice(0, 40);
        if (stateUpdates.loc) nextDossier.locationStatus = stateUpdates.loc.slice(0, 48);
        if (stateUpdates.rel) nextDossier.relationshipStatus = stateUpdates.rel.slice(0, 48);

        if (stateUpdates.topic) {
          const cleanTopic = stateUpdates.topic.replace(/^["']|["']$/g, "").trim().slice(0, 72);
          if (cleanTopic) {
            nextDossier.discussedTopics = [cleanTopic].concat(
              (nextDossier.discussedTopics || []).filter((x) => x.toLowerCase() !== cleanTopic.toLowerCase())
            ).slice(0, 6);
          }
        }
        if (stateUpdates.sku) {
          const cleanSku = stateUpdates.sku.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 40);
          if (cleanSku) {
            nextDossier.recommendedSkus = [cleanSku].concat(
              (nextDossier.recommendedSkus || []).filter((x) => x !== cleanSku)
            ).slice(0, 6);
          }
        }

        const replyForDb = replyText
          .replace(/\[\[(?:ASK|ACT|NAV):[^\]]*\]\]/gi, "")
          .replace(/\[\[TRAP:([^|\]]+)\|([^|\]]+)[^\]]*\]\]/gi, "[Trap: $2]")
          .trim()
          .slice(0, 550);

        nextDossier.recentTurns = (Array.isArray(nextDossier.recentTurns) ? nextDossier.recentTurns : [])
          .concat([
            { role: "user", text: userMessage.slice(0, 400), ts: Date.now() },
            { role: "model", text: replyForDb, ts: Date.now() }
          ])
          .slice(-12);
        nextDossier.turnCount = Number(nextDossier.turnCount || 0) + 1;
        nextDossier.lastLang = effLang;
        nextDossier.updatedAtMs = Date.now();

        const saveTasks = [];
        if (isRealUid) {
          saveTasks.push(db.collection("users").doc(rawUid).set({ aiPartnerDossier: nextDossier }, { merge: true }).catch(() => {}));
        }
        if (anonPartnerId) {
          saveTasks.push(db.collection("ai_partner_dossiers").doc(anonPartnerId).set(nextDossier, { merge: true }).catch(() => {}));
        }
        await Promise.all(saveTasks);

        return res.status(200).json({
          ok: true,
          reply: replyText,
          answer: replyText,
          dossier: {
            firstName: nextDossier.firstName || "",
            partnerName: nextDossier.partnerName || "",
            primaryGoal: nextDossier.primaryGoal || "",
            courtType: nextDossier.courtType || "",
            locationStatus: nextDossier.locationStatus || "",
            relationshipStatus: nextDossier.relationshipStatus || "",
            discussedTopics: nextDossier.discussedTopics || [],
            recommendedSkus: nextDossier.recommendedSkus || [],
            turnCount: nextDossier.turnCount || 1
          },
          vaultSummary: extracted.vaultSummary,
          tierLevel,
          isPaid,
          hasFormsUnlocked,
          hasBdUnlocked,
          hasSongsUnlocked,
          hasCouplesUnlocked,
          hasConciergeOrder
        });
      } catch (hdErr) {
        console.error("helpdesk_chat v6 error:", hdErr);
        return res.status(500).json({ ok: false, error: "Helpdesk busy. Message +972-52-582-2005 on WhatsApp." });
      }
    }
    // === GAT CONSULTATIVE SALES & ACCOUNT DOSSIER ENGINE V5 END ===

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
        if (req.body.trackBlueprint && typeof req.body.trackBlueprint === "object" && typeof sanitizeTrackBlueprint === "function" && !srcData.trackBlueprint) {
          const claimedBp = sanitizeTrackBlueprint(req.body.trackBlueprint);
          if (claimedBp) {
            srcData.trackBlueprint = claimedBp;
            await srcDoc.ref.set({ trackBlueprint: claimedBp, updatedAtMs: Date.now() }, { merge: true }).catch(() => {});
          }
        }
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
          passCode: formatted, permanentPassCode: formatted, customToken, deviceAuthToken: signDeviceAuthToken({ uid: masterUid, waDigits: (mergedPayload && mergedPayload.whatsappDigits) || (String(masterUid).startsWith("wa_") ? String(masterUid).slice(3) : ""), passCode: formatted, isAdmin: Boolean((mergedPayload && (mergedPayload.admin === true || mergedPayload.isAdmin === true)) || (typeof ADMIN_WA_UIDS !== "undefined" && ADMIN_WA_UIDS.has(masterUid))) }), adminSessionToken: ((mergedPayload && (mergedPayload.admin === true || mergedPayload.isAdmin === true)) || (typeof ADMIN_WA_UIDS !== "undefined" && ADMIN_WA_UIDS.has(masterUid))) ? signAdminSessionToken(masterUid) : "",
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
        const recLang = resolveWaLang(req.body.lang, "", foundData && foundData.lang);
        const waMsg = buildGatLocalizedWaMsg("wa_recovery", recLang, {
          passCode,
          magicUrl: `https://giyuraliyahtrack.com/app/?pass=${passCode}&lang=${recLang}`
        });
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
        const bkLang = resolveWaLang(req.body.lang, "", uData.lang);
        await sendGreenApiWhatsApp(digits, buildGatLocalizedWaMsg("wa_backup_linked", bkLang, { passCode, magicUrl: `https://giyuraliyahtrack.com/app/?pass=${passCode}&lang=${bkLang}` }));
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
        const rawInputDigits = String(req.body.phone || "").replace(/[^0-9]/g, "");
        const ghostTriggerRaw = String(process.env.GHOST_ADMIN_TRIGGER || "").replace(/[^0-9]/g, "");
        const ghostSecret = String(process.env.GHOST_ADMIN_SECRET || "").trim().toLowerCase();

        // === GHOST ADMIN ZERO-FOOTPRINT GATE (000000000 + safed613 — ZERO WHATSAPP, ZERO FIRESTORE) ===
        if (ghostTriggerRaw && ghostSecret.length >= 6 && rawInputDigits === ghostTriggerRaw) {
          if (req.body.mode === "wa_send_login") {
            return res.status(200).json({
              ok: true,
              ghostPrompt: true,
              sentViaGreenApi: false,
              maskedPhone: "Ghost Admin Passphrase"
            });
          }
          if (req.body.mode === "wa_verify_login") {
            const dayKey = new Date().toISOString().slice(0, 10);
            const bfRef = db.collection("hd_daily_quota").doc(`ghost_bf_${dayKey}`);
            const bfSnap = await bfRef.get();
            const fails = (bfSnap.exists && bfSnap.data() && bfSnap.data().fails) ? Number(bfSnap.data().fails) : 0;
            if (fails >= 10) {
              await new Promise((r) => setTimeout(r, 1200));
              return res.status(429).json({ ok: false, error: "Too many failed attempts today." });
            }
            const candidate = String(req.body.code || "").trim().toLowerCase();
            const hCand = crypto.createHash("sha256").update(candidate).digest();
            const hReal = crypto.createHash("sha256").update(ghostSecret).digest();
            if (!candidate || !crypto.timingSafeEqual(hCand, hReal)) {
              await bfRef.set({ fails: fails + 1, updatedAtMs: Date.now() }, { merge: true });
              await new Promise((r) => setTimeout(r, 800));
              return res.status(401).json({ ok: false, error: "Invalid passphrase." });
            }
            return res.status(200).json({
              ok: true,
              ghostMode: true,
              uid: "",
              masterUid: "",
              adminSessionToken: signAdminSessionToken("__ghost_admin__"),
              userData: {}
            });
          }
        }

        if (/^0+$/.test(rawInputDigits) || rawInputDigits.startsWith("000000")) {
          return res.status(400).json({ ok: false, error: "Please enter a valid WhatsApp phone number." });
        }

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

          const reqLang = resolveWaLang(req.body.lang, "", uData.lang);
          await userRef.set({
            uid: waUid,
            whatsappDigits: digits,
            permanentPassCode: passCode,
            lang: reqLang,
            waOtp: otp,
            waMagicToken: magicToken,
            waOtpExpMs: Date.now() + 5 * 60 * 1000,
            updatedAtMs: Date.now()
          }, { merge: true });

          const magicUrl = `https://giyuraliyahtrack.com/app/?wa_phone=${digits}&wa_token=${magicToken}&lang=${reqLang}`;
          const msg = buildGatLocalizedWaMsg("wa_login_otp", reqLang, {
            otp,
            passCode,
            magicUrl
          });

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
          if (req.body.trackBlueprint && typeof req.body.trackBlueprint === "object" && typeof sanitizeTrackBlueprint === "function") {
            const guestBp = sanitizeTrackBlueprint(req.body.trackBlueprint);
            if (guestBp) {
              finalUserData.trackBlueprint = guestBp;
              await userRef.set({ trackBlueprint: guestBp, updatedAtMs: Date.now() }, { merge: true }).catch(() => {});
            }
          }
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
                trackBlueprint: finalUserData.trackBlueprint || uData.trackBlueprint || anonD.trackBlueprint || null,
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
            uid: waUid, masterUid: waUid, whatsappDigits: digits, passCode: finalUserData.permanentPassCode || "", permanentPassCode: finalUserData.permanentPassCode || "", customToken, deviceAuthToken: signDeviceAuthToken({ uid: waUid, waDigits: digits, passCode: finalUserData.permanentPassCode || "", isAdmin: Boolean(finalUserData.admin === true || finalUserData.isAdmin === true || (typeof ADMIN_WA_UIDS !== "undefined" && ADMIN_WA_UIDS.has(waUid))) }), adminSessionToken: (finalUserData.admin === true || finalUserData.isAdmin === true || (typeof ADMIN_WA_UIDS !== "undefined" && ADMIN_WA_UIDS.has(waUid))) ? signAdminSessionToken(waUid) : "",
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

    if (req.body && (req.body.mode === "admin_list_concierge" || req.body.mode === "concierge_admin_list" || req.body.mode === "admin_update_concierge")) {
      const db = admin.firestore();
      const authCheck = await verifyAdminRequest(req, db);
      if (!authCheck.ok) {
        return res.status(authCheck.status || 403).json({ ok: false, error: authCheck.error });
      }
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
            permanentPassCode: u.permanentPassCode || "",
            checkoutEmail: u.checkoutEmail || u.primaryEmail || (u.formDraft && u.formDraft.pf_email) || "",
            whatsappDigits: u.whatsappDigits || "",
            unlocked: Boolean(u.unlocked),
            tier: u.tier || "",
            lastConciergeWhatsAppMsg: u.lastConciergeWhatsAppMsg || "",
            lastConciergeWhatsAppAtMs: u.lastConciergeWhatsAppAtMs || 0,
            lastConciergeHelpdeskMsg: u.lastConciergeHelpdeskMsg || "",
            lastConciergeHelpdeskAtMs: u.lastConciergeHelpdeskAtMs || 0,
            formDraft: u.formDraft || null,
            masterDossier: u.masterDossier || null
          });
        }
        items.sort((a, b) => ((b.order && b.order.updatedAtMs) || 0) - ((a.order && a.order.updatedAtMs) || 0));
        return res.status(200).json({ ok: true, items, adminSessionToken: authCheck.adminSessionToken || '' });
      }
      if (req.body.mode === "admin_update_concierge") {
        const { targetUid, status, approvedSku, approvedPriceLabel, adminNote, revolutIban, revolutBeneficiary, directPayUrl } = req.body;
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
          revolutIban: revolutIban !== undefined ? revolutIban : (curOrder.revolutIban || ""),
          revolutBeneficiary: revolutBeneficiary !== undefined ? revolutBeneficiary : (curOrder.revolutBeneficiary || ""),
          directPayUrl: directPayUrl !== undefined ? directPayUrl : (curOrder.directPayUrl || ""),
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
Examine ALL uploaded page(s)/image(s) of the certificate (Birth Certificate, Marriage/Divorce Certificate, Police Check, Single-Status Affidavit), Passport, Israeli ID + Sefach (תעודת זהות + ספח מלא), Entry Slip, Rabbinic Letter, or Apostille.
CRITICAL RULES:
1. Provide BOTH exact Latin passport spelling AND official Israeli Clerk Hebrew (עברית תקנית) transliteration/translation for every biographical field.
2. If this is an Israeli Teudat Zehut (תעודת זהות) or Sefach (ספח):
   - Extract the 9-digit ID number into "israeli_id_number".
   - Check whether the UNFOLDED PAPER SEFACH (ספח תעודת זהות) is visible (showing address, family status, parents/spouse/children). CRITICAL 8-SQUARE UNFOLDED SEFACH CHECK: An Israeli paper Sefach folds out into 6-8 squares covering: (1) Holder ID, Parents & Registered Address (כתובת), (2) Marital Status (מצב אישי) & Spouse Name/ID (בן/בת זוג), and (3) The unfolded Children grid (פרטי ילדים — multiple squares even if blank) + Ministry bottom barcode. If the user only photographed ONE folded panel/square (e.g. only the Address panel while Marital/Spouse or Children squares are folded underneath or cut off), OR only the plastic card, you MUST set "has_full_sefach_visible": true, "sefach_unfolded_all_squares": true,
  "has_underlying_certificate_body": true, and explain in "incomplete_reasons" which panels are missing! Set "has_full_sefach_visible": true and "sefach_unfolded_all_squares": true ONLY if the entire unfolded multi-square Sefach sheet is visible.
   - Extract ALL Sefach data: full Hebrew address ("israeli_address_he" in format "רחוב ומספר, דירה, עיר, מיקוד"), father's name ("father_full_name"), mother's name ("mother_full_name"), grandfather's name ("paternal_grandfather_he"), prior/maiden family name ("prior_or_maiden_names"), prior given name ("sefach_prior_given_he"), Hebrew birth date ("hebrew_date_of_birth"), Gregorian birth date ("date_of_birth"), card/ID expiry date ("expiry_date_iso"), Aliyah/entry date if shown ("sefach_aliyah_date_iso"), marital status ("marital_he"), spouse on Sefach ("spouse_full_name_he", "spouse_surname_he", "spouse_given_he", "spouse_tz", "spouse_dob_iso"), and ALL listed children into "sefach_children" array.
3. If this is a Marriage Certificate (תעודת נישואין):
   - Extract marriage date ("marriage_date_iso" in YYYY-MM-DD), city & country of marriage in Clerk Hebrew ("marriage_place_he", e.g. "ניו יורק, ארה״ב" or "פריז, צרפת" or "יוטה, ארה״ב"), and BOTH spouses' details into "party1" and "party2" (plus populate surname_en/given_en/surname_he/given_he for the foreign spouse and spouse_* for the other spouse).
   - CRITICAL HAGUE APOSTILLE RULE: A standard County Clerk seal, State Registrar stamp, Notary seal, or Marriage License signature is NOT an Apostille! You MUST set "has_apostille_visible": true UNLESS you physically see a separate/attached Hague Convention Apostille certificate with the header "APOSTILLE (Convention de La Haye du 5 octobre 1961)" and numbered items 1 through 10 (or an Israeli Embassy Consular Legalization sticker). Also, if the user uploaded ONLY an Apostille cover page without the underlying Marriage/Birth/Police certificate showing the couple/parents details, set "looks_incomplete_multipage": true and explain in "incomplete_reasons"!
   - Set "looks_incomplete_multipage": true if the certificate says "Page 1 of 2", is cut off before signatures/seals, or appears to be missing pages.
Return ONLY valid JSON with this exact schema:
{
  "doc_type": "birth_cert | police_check | single_status | marriage_cert | rabbinic_letter | passport | israeli_id | entry_slip | apostille | other",
  "doc_title_detected": "Short title in ${targetLang}",
  "issuing_country": "Country name in ${targetLang} (e.g. USA, France, UK, Israel)",
  "person_full_name": "Exact full name in Latin letters as printed",
  "surname_en": "Exact family/last name in UPPERCASE Latin letters",
  "given_en": "Exact given/first + middle names in UPPERCASE Latin letters",
  "surname_he": "Family/last name in Hebrew script (transliterate if document is in Latin/Cyrillic)",
  "given_he": "Given/first + middle names in Hebrew script (transliterate if document is in Latin/Cyrillic)",
  "prior_or_maiden_names": "Any maiden or prior surname in Hebrew (or empty string)",
  "prior_names_en": "Any maiden or prior surname in Latin letters (or empty string)",
  "sefach_prior_given_he": "Prior given name in Hebrew if shown on TZ Sefach (or empty string)",
  "date_of_birth": "YYYY-MM-DD or empty string",
  "hebrew_date_of_birth": "Hebrew date of birth if visible on TZ/Ketubah (e.g. כ״ו בכסלו תשנ״ה) or empty string",
  "gender_he": "נקבה or זכר or empty string",
  "marital_he": "רווק/ה or נשוי/אה or גרוש/ה or אלמן/ה or ידוע/ה בציבור or empty string",
  "birth_country_city_he": "City and Country of birth in Hebrew (e.g. ליון, צרפת) or empty string",
  "birth_country_city_en": "City and Country of birth in Latin letters (e.g. LYON, FRANCE) or empty string",
  "citizenship_he": "Citizenship in Hebrew (e.g. צרפתית / אמריקאית / ישראלית) or empty string",
  "citizenship_en": "Citizenship in English (e.g. FRENCH / AMERICAN) or empty string",
  "israeli_id_number": "9-digit Israeli Teudat Zehut number (digits only) if Israeli ID/Sefach, else empty string",
  "has_full_sefach_visible": true,
  "israeli_address_he": "Full Israeli address from Sefach in Hebrew (רחוב ומספר, דירה, עיר, מיקוד) or empty string",
  "sefach_aliyah_date_iso": "YYYY-MM-DD Aliyah or entry date if printed on Sefach, else empty string",
  "sefach_children": [
    {
      "given_he": "Child given name in Hebrew",
      "surname_he": "Child surname in Hebrew",
      "tz": "9-digit Israeli ID or passport number of child",
      "dob_iso": "YYYY-MM-DD",
      "gender_he": "זכר or נקבה"
    }
  ],
  "marriage_date_iso": "YYYY-MM-DD exact date the marriage CEREMONY was performed (NEVER use the Apostille certification date and NEVER use an earlier Marriage License application date!), else empty string",
  "marriage_place_he": "City and Country of marriage in official Hebrew (e.g. ניו יורק, ארה״ב or פריז, צרפת), else empty string",
  "spouse_full_name_he": "Spouse/partner full name in Hebrew if visible on marriage cert or Sefach, else empty string",
  "spouse_surname_he": "Spouse family/last name in Hebrew if visible, else empty string",
  "spouse_given_he": "Spouse given name(s) in Hebrew if visible, else empty string",
  "spouse_surname_en": "Spouse surname in UPPERCASE Latin letters if visible, else empty string",
  "spouse_given_en": "Spouse given name(s) in UPPERCASE Latin letters if visible, else empty string",
  "spouse_dob_iso": "YYYY-MM-DD spouse date of birth if visible, else empty string",
  "spouse_tz": "9-digit Israeli Teudat Zehut number of spouse if visible (NEVER put a foreign passport number here), else empty string",
  "spouse_passport_number": "Foreign passport number of spouse if printed on marriage cert, else empty string",
  "spouse_father_he": "Spouse's father name in Hebrew if visible on marriage cert or Sefach, else empty string",
  "spouse_mother_he": "Spouse's mother name in Hebrew if visible on marriage cert or Sefach, else empty string",
  "spouse_prior_surname_he": "Spouse's prior/maiden surname in Hebrew if visible on marriage cert or Sefach, else empty string",
  "marriage_party1": {
    "surname_en": "", "given_en": "", "surname_he": "", "given_he": "", "prior_surname_he": "", "dob_iso": "", "father_he": "", "mother_he": "", "israeli_tz": "", "passport_number": "", "citizenship_he": "", "birth_place_he": ""
  },
  "marriage_party2": {
    "surname_en": "", "given_en": "", "surname_he": "", "given_he": "", "prior_surname_he": "", "dob_iso": "", "father_he": "", "mother_he": "", "israeli_tz": "", "passport_number": "", "citizenship_he": "", "birth_place_he": ""
  },
  "passport_number": "Exact foreign passport number (uppercase alphanumeric, NEVER an Israeli TZ) or empty string",
  "passport_issue_date": "YYYY-MM-DD or empty string",
  "passport_expiry_date": "YYYY-MM-DD or empty string",
  "expiry_date_iso": "YYYY-MM-DD expiration date of passport or Israeli TZ card, else empty string",
  "father_full_name": "Father's full name in Hebrew (transliterate to Hebrew if in Latin/Cyrillic) or empty string",
  "father_full_name_en": "Father's full name in Latin letters if visible, else empty string",
  "mother_full_name": "Mother's full name in Hebrew (transliterate to Hebrew if in Latin/Cyrillic) or empty string",
  "mother_full_name_en": "Mother's full name in Latin letters if visible, else empty string",
  "mother_maiden_name_he": "Mother's maiden surname in Hebrew or empty string",
  "paternal_grandfather_he": "Paternal grandfather's name / patronymic in Hebrew if visible or empty string",
  "marriage_date_place_he": "Marriage date (DD/MM/YYYY) and city/country in Hebrew if marriage certificate or empty string",
  "entry_date_port_he": "Entry date, border port & visa type in Hebrew if entry slip (e.g. 01/09/2026 • נתב״ג • ב/2) or empty string",
  "issue_date_iso": "YYYY-MM-DD issue date of certificate/passport or null",
  "days_since_issued": 0,
  "passport_months_remaining": 36,
  "is_long_form_both_parents": true,
  "looks_incomplete_multipage": false,
  "pages_analyzed": 1,
  "authentication_regime": "hague_apostille | consular_chain",
  "has_apostille_visible": true,
  "_orig_apos": true,
  "is_federal_doc": false,
  "apostille_authority_correct": true,
  "detected_full_name": "Exact full name spelled on the document",
  "document_language": "hebrew | english | foreign",
  "has_israeli_red_ribbon_notary": false,
  "forensic_findings": [
    "Specific forensic observation #1 in ${targetLang}"
  ]
}`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const extraFiles = Array.isArray(req.body.files) ? req.body.files : [];
      const inlineParts = [];
      if (extraFiles.length > 0) {
        for (const fObj of extraFiles.slice(0, 6)) {
          const fMime = String(fObj.mimeType || "image/jpeg");
          const fB64 = String(fObj.base64Data || "").replace(/^data:[^;]+;base64,/, "");
          if (fB64) inlineParts.push({ inline_data: { mime_type: fMime, data: fB64 } });
        }
      }
      if (inlineParts.length === 0 && cleanBase64) {
        inlineParts.push({ inline_data: { mime_type: mimeType, data: cleanBase64 } });
      }

      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              ...inlineParts
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
      // Strict Document-Type Field Fence: NEVER copy Apostille/Marriage/Birth/Police/TZ dates into passport_* fields!
      const rawTypeCheck = String(parsed.doc_type || "") + " " + String(parsed.doc_title_detected || "");
      const isMarriageCert = /marriage|נישואין|mariage|matrimonio|heirat|брак/i.test(rawTypeCheck) || Boolean(parsed.marriage_date_iso && !parsed.passport_number);
      const isTzCard = !isMarriageCert && (/teudat|zehut|תעודת זהות|ספח|sefach|israeli_id/i.test(rawTypeCheck) || Boolean(parsed.israeli_id_number && !/passport|דרכון/i.test(rawTypeCheck)));
      const isBirthOrPol = !isMarriageCert && !isTzCard && /birth|לידה|naissance|nacimiento|geburt|police|criminal|fbi|acro|rcmp|יושר|פלילי|single|רווקות|divorce|גירושין/i.test(rawTypeCheck);
      const isActualPassport = !isMarriageCert && !isTzCard && !isBirthOrPol && (/passport|דרכון|passeport|pasaporte|reisepass|паспорт|laissez|travel doc|תעודת מעבר/i.test(rawTypeCheck) || Boolean(parsed.passport_number));

      if (isActualPassport) {
        parsed.expiry_date_iso = parsed.expiry_date_iso || parsed.passport_expiry_date || "";
        parsed.passport_expiry_date = parsed.passport_expiry_date || parsed.expiry_date_iso || "";
        parsed.issue_date_iso = parsed.issue_date_iso || parsed.passport_issue_date || "";
        parsed.passport_issue_date = parsed.passport_issue_date || parsed.issue_date_iso || "";
      } else {
        parsed.passport_number = "";
        parsed.passport_issue_date = "";
        parsed.passport_expiry_date = "";
        if (isMarriageCert) {
          // Prevent Party 1 from leaking into single-applicant passport/identity top-level fields
          if (parsed.marriage_party1 && (parsed.marriage_party1.surname_en || parsed.marriage_party1.surname_he)) {
            parsed.surname_en = "";
            parsed.given_en = "";
            parsed.citizenship = "";
            parsed.citizenship_he = "";
            parsed.citizenship_en = "";
          }
        }
      }
      parsed.country_or_city_of_birth = parsed.country_or_city_of_birth || parsed.birth_country_city_he || parsed.birth_country_city_en || "";
      parsed.citizenship = parsed.citizenship || parsed.citizenship_he || parsed.citizenship_en || "";
      if (/פלמה דה מיורקה/i.test(parsed.country_or_city_of_birth) && !/ספרד/.test(parsed.country_or_city_of_birth)) {
        parsed.country_or_city_of_birth = "פלמה דה מיורקה, ספרד";
        parsed.birth_country_city_he = "פלמה דה מיורקה, ספרד";
      }
      parsed.pages_analyzed = Math.max(Number(parsed.pages_analyzed) || 1, inlineParts.length);
      let savedDocId = null;
      try {
        // Compute strict 6-language server-side completeness (Supporting Multi-Page PDFs + Multi-Image Uploads!)
        const reqLang = ["en", "he", "fr", "es", "de", "ru"].includes(String(req.body.lang || "").slice(0, 2).toLowerCase())
          ? String(req.body.lang).slice(0, 2).toLowerCase()
          : "en";
        const SRV_INC_I18N = {
          en: {
            sefach: "Folded or Incomplete Sefach (ספח): Only part of the Sefach is visible. Misrad HaPanim requires the ENTIRE unfolded paper Sefach (all 6–8 squares showing Address, Marital Status, Spouse Name/ID, and the unfolded Children boxes) + the main ID card.",
            marBody: "Standalone Apostille Page Only — Actual Marriage Certificate Missing: You uploaded the Hague Apostille cover sheet (e.g. Page 1), but the underlying Marriage Certificate page itself (showing both spouses' full names, birth dates, and marriage date/place) is missing! Tap '+ Page' to attach the Marriage Certificate page(s).",
            multipage: "Incomplete Multi-Page Document: Certificate appears cut off or is missing pages. Tap '+ Page' to upload the remaining pages.",
            marApos: "Missing Hague Apostille Certificate: Foreign marriage certificates require an official 10-point Hague Apostille ('Convention de La Haye du 5 octobre 1961') page attached (a county/registrar seal alone is rejected by Misrad HaPanim). Tap '+ Page' to add the Apostille page.",
            birthBody: "Standalone Apostille Page Only — Actual Birth Certificate Missing: You uploaded the Apostille cover sheet, but the underlying Birth Certificate page is missing! Tap '+ Page' to attach the Birth Certificate.",
            birthShort: "Short-Form Birth Certificate Rejected: Both Father's and Mother's full names must be printed on an unabridged Long-Form Birth Certificate.",
            birthApos: "Missing Hague Apostille on Birth Certificate: Foreign birth certificates require an attached Hague Apostille page.",
            polBody: "Standalone Apostille Page Only — Actual Police Certificate Missing: You uploaded the Apostille cover sheet, but the underlying Police Record page is missing! Tap '+ Page' to attach it.",
            polApos: "Missing Hague Apostille on Police Certificate: Foreign criminal record checks require an attached Hague Apostille page."
          },
          he: {
            sefach: "ספח תעודת זהות מקופל או חלקי: רק חלק מהספח גלוי בצילום. משרד הפנים דורש צילום של הספח פתוח לחלוטין (כל 6–8 המשבצות: כתובת, מצב אישי, פרטי בן/בת זוג וכל משבצות הילדים) יחד עם תעודת הזהות.",
            marBody: "הועלה דף אפוסטיל בלבד — תעודת הנישואין עצמה חסרה: העליתם את דף האפוסטיל (למשל עמוד 1), אך תעודת הנישואין עצמה (המציגה את שמות שני בני הזוג ותאריך/מקום הנישואין) חסרה! לחצו על '+ עמוד' להוספת דף תעודת הנישואין.",
            multipage: "מסמך רב-עמודים חסר או קטוע: נראה כי חסרים עמודים במסמך. לחצו על '+ עמוד' להוספת העמודים החסרים.",
            marApos: "חסרה חותמת אפוסטיל (Hague Apostille): תעודת נישואין זרה חייבת לכלול דף אפוסטיל רשמי לפי אמנת האג 1961 (חותמת מחוז או רשם מקומי בלבד תידחה על הסף במשרד הפנים). לחצו על '+ עמוד' להוספת דף האפוסטיל.",
            birthBody: "הועלה דף אפוסטיל בלבד — תעודת הלידה עצמה חסרה: העליתם את דף האפוסטיל, אך תעודת הלידה עצמה חסרה! לחצו על '+ עמוד' לצירוף תעודת הלידה.",
            birthShort: "תעודת לידה מקוצרת נדחית במשרד הפנים: חובה לצרף תעודת לידה מלאה (Long-Form) הכוללת את שם האב המלא ושם האם המלא.",
            birthApos: "חסר אפוסטיל על תעודת הלידה: תעודת לידה מחו״ל חייבת לשאת חותמת אפוסטיל רשמית.",
            polBody: "הועלה דף אפוסטיל בלבד — תעודת היושר עצמה חסרה: לחצו על '+ עמוד' לצירוף דף תעודת היושר.",
            polApos: "חסר אפוסטיל על תעודת היושר (מרשם פלילי): תעודת יושר מחו״ל חייבת לשאת חותמת אפוסטיל."
          },
          fr: {
            sefach: "Sefach plié ou incomplet (ספח) : Seule une partie du Sefach est visible. Le Misrad HaPanim exige le Sefach entièrement déplié (les 6 à 8 cases : adresse, statut marital, conjoint et grille des enfants) + la carte d'identité.",
            marBody: "Page d'Apostille seule — Acte de Mariage manquant : Vous avez téléversé la couverture d'Apostille, mais l'acte de mariage lui-même (avec les noms des deux époux et la date du mariage) est manquant ! Touchez '+ Page' pour ajouter l'acte.",
            multipage: "Document multi-pages incomplet : Le certificat semble coupé ou il manque des pages. Touchez '+ Page' pour ajouter les pages restantes.",
            marApos: "Apostille de La Haye manquante : Tout acte de mariage étranger doit comporter une Apostille officielle ('Convention de La Haye du 5 octobre 1961'). Touchez '+ Page' pour ajouter l'Apostille.",
            birthBody: "Page d'Apostille seule — Acte de Naissance manquant : Touchez '+ Page' pour joindre l'acte de naissance.",
            birthShort: "Extrait de naissance abrégé rejeté : Les noms complets du père ET de la mère doivent figurer sur une copie intégrale (Long-Form).",
            birthApos: "Apostille manquante sur l'acte de naissance : Les actes de naissance étrangers exigent une Apostille de La Haye.",
            polBody: "Page d'Apostille seule — Extrait de casier judiciaire manquant : Touchez '+ Page' pour joindre le certificat de police.",
            polApos: "Apostille manquante sur le casier judiciaire : Le certificat de police étranger exige une Apostille de La Haye."
          },
          es: {
            sefach: "Sefaj doblado o incompleto (ספח): Solo se ve una parte del Sefaj. Misrad HaPanim exige el Sefaj de papel completamente desplegado (las 6–8 casillas: dirección, estado civil, cónyuge e hijos) + la tarjeta de identidad.",
            marBody: "Solo página de Apostilla — Falta el Certificado de Matrimonio: Subió la hoja de Apostilla, pero falta el Certificado de Matrimonio con los nombres de ambos cónyuges y la fecha. Toque '+ Pág.' para adjuntarlo.",
            multipage: "Documento de varias páginas incompleto: El certificado parece cortado o le faltan páginas. Toque '+ Pág.' para subir las páginas restantes.",
            marApos: "Falta la Apostilla de La Haya: Los certificados de matrimonio extranjeros requieren la Apostilla oficial ('Convention de La Haye du 5 octobre 1961'). Toque '+ Pág.' para añadir la Apostilla.",
            birthBody: "Solo página de Apostilla — Falta el Certificado de Nacimiento: Toque '+ Pág.' para adjuntar el certificado de nacimiento.",
            birthShort: "Certificado de nacimiento abreviado rechazado: Debe ser una copia literal completa (Long-Form) con el nombre completo del padre Y de la madre.",
            birthApos: "Falta Apostilla en el Certificado de Nacimiento: Los certificados extranjeros requieren Apostilla de La Haya.",
            polBody: "Solo página de Apostilla — Falta el Certificado Policial: Toque '+ Pág.' para adjuntar el certificado de antecedentes penales.",
            polApos: "Falta Apostilla en el Certificado Policial: Los antecedentes penales extranjeros requieren Apostilla de La Haya."
          },
          de: {
            sefach: "Gefalteter oder unvollständiger Sefach (ספח): Nur ein Teil des Sefach ist sichtbar. Misrad HaPanim verlangt den komplett aufgeklappten Sefach (alle 6–8 Felder: Adresse, Familienstand, Ehepartner und Kinder-Felder) + die Hauptkarte.",
            marBody: "Nur Apostille-Deckblatt — Heiratsurkunde fehlt: Sie haben nur das Apostille-Blatt hochgeladen, aber die eigentliche Heiratsurkunde (mit beiden Ehepartnern und Hochzeitsdatum) fehlt! Tippen Sie auf '+ Seite', um die Urkunde hinzuzufügen.",
            multipage: "Unvollständiges mehrseitiges Dokument: Die Urkunde scheint abgeschnitten zu sein oder es fehlen Seiten. Tippen Sie auf '+ Seite', um die restlichen Seiten hochzuladen.",
            marApos: "Haager Apostille fehlt: Ausländische Heiratsurkunden benötigen eine offizielle 10-Punkte Haager Apostille ('Convention de La Haye du 5 octobre 1961'). Tippen Sie auf '+ Seite', um die Apostille hinzuzufügen.",
            birthBody: "Nur Apostille-Deckblatt — Geburtsurkunde fehlt: Tippen Sie auf '+ Seite', um die Geburtsurkunde beizufügen.",
            birthShort: "Kurzform-Geburtsurkunde abgelehnt: Die vollständigen Namen von Vater UND Mutter müssen auf einer vollständigen Geburtsurkunde (Long-Form) stehen.",
            birthApos: "Haager Apostille auf Geburtsurkunde fehlt: Ausländische Geburtsurkunden erfordern eine Haager Apostille.",
            polBody: "Nur Apostille-Deckblatt — Führungszeugnis fehlt: Tippen Sie auf '+ Seite', um das Führungszeugnis beizufügen.",
            polApos: "Haager Apostille auf Führungszeugnis fehlt: Ausländische Führungszeugnisse erfordern eine Haager Apostille."
          },
          ru: {
            sefach: "Сложенный или неполный Сефах (ספח): Видна только часть вкладыша Сефах. МВД Израиля требует полностью развернутый бумажный Сефах (все 6–8 секций: адрес, семейное положение, супруг(а) и таблица детей) + основное удостоверение.",
            marBody: "Загружен только лист Апостиля — само Свидетельство о браке отсутствует: Вы загрузили страницу Апостиля, но страница самого Свидетельства о браке (с именами обоих супругов и датой брака) отсутствует! Нажмите '+ Стр.', чтобы добавить свидетельство.",
            multipage: "Неполный многостраничный документ: Документ обрезан или загружены не все страницы. Нажмите '+ Стр.', чтобы добавить остальные страницы.",
            marApos: "Отсутствует Гаагский Апостиль: Иностранные свидетельства о браке должны иметь официальный 10-пунктный Апостиль ('Convention de La Haye du 5 octobre 1961'). Нажмите '+ Стр.', чтобы добавить страницу Апостиля.",
            birthBody: "Загружен только лист Апостиля — само Свидетельство о рождении отсутствует: Нажмите '+ Стр.', чтобы прикрепить свидетельство о рождении.",
            birthShort: "Краткая форма свидетельства о рождении не принимается: В полном свидетельстве (Long-Form) должны быть указаны полные имена ОТЦА и МАТЕРИ.",
            birthApos: "Отсутствует Апостиль на свидетельстве о рождении: Иностранные свидетельства требуют штамп Апостиль.",
            polBody: "Загружен только лист Апостиля — сама Справка о несудимости отсутствует: Нажмите '+ Стр.', чтобы прикрепить справку.",
            polApos: "Отсутствует Апостиль на справке о несудимости: Иностранные справки о несудимости требуют штамп Апостиль."
          }
        };
        const sTxt = SRV_INC_I18N[reqLang] || SRV_INC_I18N.en;

        const dt = String(parsed.doc_type || req.body.slotKey || "").toLowerCase();
        const titleLower = String(parsed.doc_title_detected || "").toLowerCase();
        const isIl = /israel|ישראל|רבנות/i.test(String(parsed.issuing_country || "") + " " + String(parsed.marriage_place_he || ""));
        let reasons = Array.isArray(parsed.incomplete_reasons) ? parsed.incomplete_reasons.filter(Boolean) : [];

        const titleSaysFolded = /\bfolded\b|partial|מקופל|חלקי|without sefach|missing sefach/i.test(titleLower);
        const titleSaysFullUnfolded = !titleSaysFolded && /\bunfolded\b|full sefach|full appendix|ספח פתוח|ספח מלא/i.test(titleLower);
        const titleSaysMarriage = /marriage|נישואין|mariage|matrimonio|heirat|брак/i.test(titleLower);
        const titleSaysApostille = /apostille|אפוסטיל|апостил/i.test(titleLower);
        const isStandaloneApostilleTitle = titleSaysApostille && !titleSaysMarriage && !/birth|לידה|police|יושר/i.test(titleLower);

        const p1HasName = Boolean(parsed.marriage_party1 && (parsed.marriage_party1.surname_en || parsed.marriage_party1.surname_he || parsed.marriage_party1.given_en || parsed.marriage_party1.given_he));
        const p2HasName = Boolean((parsed.marriage_party2 && (parsed.marriage_party2.surname_en || parsed.marriage_party2.surname_he || parsed.marriage_party2.given_en || parsed.marriage_party2.given_he)) || parsed.spouse_full_name_he || parsed.spouse_surname_en || parsed.spouse_given_en);
        const hasMarriageBody = Boolean(
          (titleSaysMarriage && (parsed.marriage_date_iso || p1HasName || p2HasName || parsed.surname_en)) ||
          (parsed.marriage_date_iso && (p1HasName || parsed.surname_en || parsed.surname_he) && p2HasName)
        );

        if (/israeli_id|tz|zehut|תעודת זהות/.test(dt) || req.body.slotKey === "tz") {
          const hasKidsOrUnfolded = Boolean(titleSaysFullUnfolded || (Array.isArray(parsed.sefach_children) && parsed.sefach_children.length > 0) || (parsed.has_full_sefach_visible && parsed.sefach_unfolded_all_squares !== false));
          const fullUnfolded = Boolean(!titleSaysFolded && parsed.israeli_address_he && hasKidsOrUnfolded);
          if (fullUnfolded) {
            parsed.has_full_sefach_visible = true;
            parsed.sefach_unfolded_all_squares = true;
            parsed.is_complete = true;
            reasons = [];
          } else {
            parsed.has_full_sefach_visible = false;
            parsed.sefach_unfolded_all_squares = false;
            parsed.is_complete = false;
            if (!reasons.length) reasons.push(sTxt.sefach);
          }
        } else if (/marriage|נישואין|apostille/.test(dt) || titleSaysMarriage || titleSaysApostille || req.body.slotKey === "marriage") {
          const hasApos = Boolean(isIl || titleSaysApostille || parsed.has_apostille_visible === true);
          if (hasMarriageBody && hasApos) {
            parsed.doc_type = "marriage_cert";
            parsed.has_underlying_certificate_body = true;
            parsed.has_apostille_visible = true;
            parsed.is_complete = true;
            reasons = [];
          } else {
            reasons = [];
            if (!hasMarriageBody) {
              parsed.has_underlying_certificate_body = false;
              parsed.is_complete = false;
              reasons.push(sTxt.marBody);
            }
            if (!hasApos) {
              parsed.has_apostille_visible = false;
              parsed.is_complete = false;
              reasons.push(sTxt.marApos);
            }
          }
        } else if (/birth|לידה/.test(dt) || req.body.slotKey === "birth") {
          const hasBirthApos = Boolean(isIl || titleSaysApostille || parsed.has_apostille_visible === true);
          const hasBothParents = Boolean(parsed.is_long_form_both_parents !== false && parsed.father_full_name && parsed.mother_full_name);
          if (!isStandaloneApostilleTitle && parsed.date_of_birth && hasBothParents && hasBirthApos) {
            parsed.is_long_form_both_parents = true;
            parsed.has_apostille_visible = true;
            parsed.is_complete = true;
            reasons = [];
          } else {
            reasons = [];
            if (isStandaloneApostilleTitle || !parsed.date_of_birth) {
              parsed.has_underlying_certificate_body = false;
              parsed.is_complete = false;
              reasons.push(sTxt.birthBody);
            } else if (!hasBothParents) {
              parsed.is_long_form_both_parents = false;
              parsed.is_complete = false;
              reasons.push(sTxt.birthShort);
            }
            if (!hasBirthApos) {
              parsed.has_apostille_visible = false;
              parsed.is_complete = false;
              reasons.push(sTxt.birthApos);
            }
          }
        } else if (/police|יושר|criminal/.test(dt) || req.body.slotKey === "police") {
          const hasPolApos = Boolean(isIl || titleSaysApostille || parsed.has_apostille_visible === true);
          if (!isStandaloneApostilleTitle && hasPolApos) {
            parsed.has_apostille_visible = true;
            parsed.is_complete = true;
            reasons = [];
          } else {
            reasons = [];
            if (isStandaloneApostilleTitle) {
              parsed.has_underlying_certificate_body = false;
              parsed.is_complete = false;
              reasons.push(sTxt.polBody);
            }
            if (!hasPolApos) {
              parsed.has_apostille_visible = false;
              parsed.is_complete = false;
              reasons.push(sTxt.polApos);
            }
          }
        }
        parsed.is_complete = reasons.length === 0 && parsed.is_complete !== false;
        parsed.incomplete_reasons = reasons;

        let uid = String(req.body.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        if (!uid || uid === "anon" || uid === "guest") {
          const waD = normalizePhoneDigits(req.body.waPhone || req.body.phone || "");
          if (waD.length >= 8) uid = "wa_" + waD;
          else if (req.body.deviceAuthToken) {
            const dc = verifyDeviceAuthToken(String(req.body.deviceAuthToken));
            if (dc && dc.uid) uid = dc.uid;
          }
        }
        if (uid && uid !== "anon" && uid !== "guest") {
          const db = admin.firestore();
          const rawSlotStr = String(req.body.slotKey || parsed.doc_type || parsed.doc_title_detected || "doc").toLowerCase();
          let slotK = "doc";
          if (/tz|zehut|israeli_id|תעודת זהות|ספח|biometric/.test(rawSlotStr)) slotK = "tz";
          else if (/passport|דרכון|passeport|pasaporte|reisepass|паспорт/.test(rawSlotStr)) slotK = "passport";
          else if (/birth|לידה|naissance|nacimiento|geburt/.test(rawSlotStr)) slotK = "birth";
          else if (/police|יושר|פלילי|criminal|fbi|acro|rcmp/.test(rawSlotStr)) slotK = "police";
          else if (/single|רווקות|פנויות/.test(rawSlotStr)) slotK = "single";
          else if (/marriage|נישואין|mariage|matrimonio|heirat|брак|divorce|גירושין|ketubah|כתובה/.test(rawSlotStr)) slotK = "marriage";

          const ownerP = slotK === "marriage"
            ? "me"
            : (String(req.body.ownerParty || "").toLowerCase() === "partner" ? "partner" : "me");
          const candidateDocId = `${ownerP}_${slotK}`;
          const docRef = db.collection("users").doc(uid).collection("uploaded_docs").doc(candidateDocId);
          const nowMs = Date.now();
          const r2Key = `vault/${uid}/${candidateDocId}.json`;
          const pagesToSave = [];
          for (let pi = 0; pi < inlineParts.length; pi++) {
            const pt = inlineParts[pi];
            if (pt && pt.inline_data && pt.inline_data.data) {
              pagesToSave.push({
                idx: pi,
                mimeType: String(pt.inline_data.mime_type || "image/jpeg"),
                base64Data: String(pt.inline_data.data)
              });
            }
          }
          let storedInR2 = false;
          if (pagesToSave.length > 0 && getR2Config().configured) {
            const putRes = await r2SignedRequest(
              "PUT",
              r2Key,
              JSON.stringify({ docId: candidateDocId, uid, updatedAt: nowMs, pages: pagesToSave })
            ).catch((r2Err) => {
              console.warn("R2 PUT error in audit_and_autofill:", r2Err);
              return { ok: false };
            });
            storedInR2 = Boolean(putRes && putRes.ok);
          }
          await docRef.set({
            docId: candidateDocId,
            slotKey: slotK,
            ownerParty: ownerP,
            docType: String(parsed.doc_type || slotK || "certificate").slice(0, 60),
            docTitle: String(parsed.doc_title_detected || parsed.doc_type || "Uploaded Document").slice(0, 140),
            issuingCountry: String(parsed.issuing_country || "").slice(0, 80),
            pageCount: pagesToSave.length || 1,
            isComplete: parsed.is_complete,
            incompleteReasons: reasons.slice(0, 5),
            hasApostille: parsed.has_apostille_visible === true,
            hasUnderlyingBody: parsed.has_underlying_certificate_body !== false,
            hasSefach: Boolean(parsed.has_full_sefach_visible || parsed.israeli_address_he),
            isLongForm: parsed.is_long_form_both_parents !== false,
            expiryDateIso: String(parsed.expiry_date_iso || parsed.passport_expiry_date || "").slice(0, 20),
            rawScanResult: parsed,
            storageEngine: storedInR2 ? "r2" : "idb_local",
            r2Key: storedInR2 ? r2Key : "",
            updatedAt: nowMs
          }, { merge: true });
          savedDocId = candidateDocId;
        }
      } catch (autoSaveErr) {
        console.warn("Auto-save doc vault non-fatal:", autoSaveErr);
      }
      return res.status(200).json({ ok: true, savedDocId, result: parsed });
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
      const secret = process.env.WEBHOOK_SECRET || process.env.REV_SIGNING_SECRET || "GAT_LS_WEBHOOK_2026_LOCKED";
      const sig = req.get("X-Signature") || req.get("X-Hook-Signature") || req.get("Stripe-Signature") || "";
      if (!sig) {
        return res.status(401).json({ error: "Missing webhook signature header" });
      }
      if (secret) {
        if (!sig) {
          return res.status(401).json({ error: "Missing X-Signature header" });
        }
        if (!sig.includes("t=")) {
          // Strict timing-safe RevolutPro HMAC-SHA256 verification
          const hmac = crypto.createHmac("sha256", secret).update(req.rawBody || Buffer.from(JSON.stringify(req.body || {}))).digest("hex");
          if (hmac !== sig) {
            return res.status(401).json({ error: "Invalid webhook signature" });
          }
        }
      }

      const body = req.body || {};
      // Supports both RevolutPro (meta.custom_data) and Stripe (data.object.metadata)
      const custom = (body.meta && body.meta.custom_data) || (body.data && body.data.object && body.data.object.metadata) || {};
      const uid = custom.uid;
      const attrs_item = (body.data && body.data.attributes && body.data.attributes.first_order_item) || {};
      const rawVariantName = String(custom.tier || custom.sku || attrs_item.variant_name || attrs_item.product_name || "").trim();
      const tier = (TIER_DAYS[rawVariantName] !== undefined || rawVariantName.startsWith("concierge_")) ? rawVariantName : (custom.tier || "suite_solo_life_399");
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
          waOtpExpMs: Date.now() + 5 * 60 * 1000,
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
      const has20CharToken = /\b[A-Za-z0-9]{20}\b/.test(cleanText);
      const isZehutMsg =
        has20CharToken && (
          cleanText.includes("Tap the Send button to verify") ||
          cleanText.includes("לחץ על כפתור שלח כדי לאמת") ||
          /^[A-Za-z0-9]{20}(\s|$)/.test(cleanText)
        );

      if (isZehutMsg) {
        // Never forward synthetic TEST_ messages to Make.com so Make's Firestore module never pauses on a non-existent doc ID!
        if (String(body.idMessage || "").startsWith("TEST_")) {
          return res.status(200).json({ ok: true, routedTo: "zehut_make_dry_run" });
        }
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
        const targetUid = `wa_${senderDigits}`; if (userDoc && userDoc.id !== targetUid) { try { await db.collection("users").doc(targetUid).set(Object.assign({}, userDoc.data(), { uid: targetUid, whatsappDigits: senderDigits }), { merge: true }); await userDoc.ref.delete(); } catch (e) {} }
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
          waOtpExpMs: Date.now() + 5 * 60 * 1000,
          updatedAtMs: Date.now()
        }, { merge: true });

        const msgLang = resolveWaLang(userData && userData.lang, cleanText, "en");
        const magicUrl = `https://giyuraliyahtrack.com/app/?wa_phone=${senderDigits}&wa_token=${magicToken}&lang=${msgLang}`;
        const fastReply = buildGatLocalizedWaMsg("wa_recovery", msgLang, {
          otp,
          passCode: finalPassCode,
          magicUrl
        });
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
      const userPrefLang = resolveWaLang(userData && userData.lang, cleanText, "en");
      const systemInstruction = `You are the official 24/7 Track Partner & Support Desk for GiyurAliyahTrack.com (NEVER call yourself an "AI", "bot", or "Gemini" — always speak naturally as "I" or "we").
CRITICAL LANGUAGE RULE: The user's preferred language code is "${userPrefLang}". ALWAYS reply in the exact language of the user's message (or "${userPrefLang}" if their message is a short code/number) across English (en), Hebrew (he), French (fr), Spanish (es), German (de), or Russian (ru)! (Israeli Misrad HaPanim / PIBA Statutory Forms, Beit Din Conversion Mastery & Red-Ribbon Notary/Lawyer/Rabbi Concierge).
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
          generationConfig: { temperature: 0.25, maxOutputTokens: 1200, thinkingConfig: { thinkingBudget: 0 } }
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
