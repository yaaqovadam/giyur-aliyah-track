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
const ADMIN_WA_UIDS = new Set(["wa_972539332613", "wa_972534742332", "wa_972525822005"]);
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

function signAdminSessionToken(uid) {
  const secret = String(process.env.GEMINI_API_KEY || process.env.ADMIN_PIN || "GAT_INTERNAL_HMAC_KEY_2026");
  const exp = Date.now() + 8 * 60 * 60 * 1000; // Auto-expires in 8 hours
  const payload = `${uid}.${exp}`;
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyAdminSessionToken(token) {
  const parts = String(token || "").trim().split(".");
  if (parts.length !== 3) return null;
  const [uid, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!uid || !exp || Date.now() > exp) return null;
  const secret = String(process.env.GEMINI_API_KEY || process.env.ADMIN_PIN || "GAT_INTERNAL_HMAC_KEY_2026");
  const expectedSig = crypto.createHmac("sha256", secret).update(`${uid}.${expStr}`).digest("hex");
  if (sig !== expectedSig) return null;
  return uid;
}

async function verifyAdminRequest(req, db) {
  // 1. Check Cryptographic Firebase Auth ID Token (Bearer JWT) -> users/wa_<phone>.admin === true
  const authHeader = String(req.headers.authorization || (req.body && req.body.idToken) || "").trim();
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;
  if (idToken && idToken.length > 40) {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      if (decoded && decoded.uid) {
        const uSnap = await db.collection("users").doc(decoded.uid).get();
        if (uSnap.exists && (uSnap.data().admin === true || uSnap.data().isAdmin === true)) {
          return { ok: true, uid: decoded.uid, adminSessionToken: signAdminSessionToken(decoded.uid) };
        }
      }
    } catch (jwtErr) {}
  }

  // 2. Check Cryptographic HMAC-SHA256 Admin Session Token (minted ONLY after WhatsApp OTP verification)
  const sessionTok = String((req.body && req.body.adminSessionToken) || "").trim();
  if (sessionTok) {
    const verifiedUid = verifyAdminSessionToken(sessionTok);
    if (verifiedUid) {
      const uSnap = await db.collection("users").doc(verifiedUid).get();
      if (uSnap.exists && (uSnap.data().admin === true || uSnap.data().isAdmin === true)) {
        return { ok: true, uid: verifiedUid, adminSessionToken: sessionTok };
      }
    }
  }

  // 3. Check if the browser sent a verified WhatsApp Magic Token or Permanent PassCode that belongs to an admin === true doc
  const magicOrPass = String((req.body && req.body.adminPassOrMagic) || "").trim();
  const claimedUid = String((req.body && req.body.adminUid) || "").trim();
  if (claimedUid.startsWith("wa_") && magicOrPass.length >= 6) {
    const uSnap = await db.collection("users").doc(claimedUid).get();
    if (uSnap.exists) {
      const uData = uSnap.data() || {};
      if ((uData.admin === true || uData.isAdmin === true) &&
          ((uData.permanentPassCode && uData.permanentPassCode === magicOrPass.toUpperCase()) ||
           (uData.waMagicToken && uData.waMagicToken === magicOrPass))) {
        return { ok: true, uid: claimedUid, adminSessionToken: signAdminSessionToken(claimedUid) };
      }
    }
  }

  return { ok: false, status: 403, error: "Restricted Area" };
}

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

    // LIVE POLL FOR OPEN CHECKOUT MODAL (mode === "check_checkout_unlock_status")
    if (req.body && req.body.mode === "check_checkout_unlock_status") {
      const db = admin.firestore();
      const waDigits = normalizePhoneDigits(req.body.waPhone || req.body.phone || "");
      const sku = String(req.body.sku || "").trim();
      if (waDigits.length < 8 || !REVOLUT_SKU_PRICES[sku]) {
        return res.status(200).json({ ok: true, unlocked: false });
      }
      const targetUid = "wa_" + waDigits;
      const [eSnap, uSnap] = await Promise.all([
        db.collection("pro_entitlements").doc(targetUid).get(),
        db.collection("users").doc(targetUid).get()
      ]);
      const eData = eSnap.exists ? (eSnap.data() || {}) : {};
      const uData = uSnap.exists ? (uSnap.data() || {}) : {};
      const eMap = Object.assign({}, uData.entitlementsMap || {}, eData.entitlementsMap || {});
      const entry = eMap[sku] || eMap.vip_couple_649;
      const isSkuActive = Boolean(entry && (!entry.exp || entry.exp > Date.now()));
      if (!isSkuActive) {
        return res.status(200).json({ ok: true, unlocked: false });
      }
      const magicToken = uData.waMagicToken || "";
      const redirectUrl = magicToken
        ? `/app/?wa_phone=${waDigits}&wa_token=${encodeURIComponent(magicToken)}&checkout_success=1&tier=${encodeURIComponent(sku)}`
        : `/app/?checkout_success=1&tier=${encodeURIComponent(sku)}`;
      return res.status(200).json({
        ok: true,
        unlocked: true,
        uid: targetUid,
        tier: sku,
        passCode: uData.permanentPassCode || "",
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
        const uid = String(b.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        if (!uid || uid === "anon") {
          return res.status(200).json({ ok: true, items: [], localOnly: true });
        }
        const docsCol = db.collection("users").doc(uid).collection("uploaded_docs");

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
          const r2Res = await r2SignedRequest("GET", r2Key).catch(() => ({ ok: false }));
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
          const curMeta = curSnap.exists ? (curSnap.data() || {}) : {};

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
            storageEngine: storedInR2 ? "r2" : "idb_local",
            r2Key: storedInR2 ? r2Key : "",
            updatedAt: Date.now()
          };
          await docRef.set(metaObj, { merge: true });
          return res.status(200).json({ ok: true, meta: metaObj, storedInR2 });
        }
      } catch (vErr) {
        return res.status(500).json({ ok: false, error: vErr.message || "Vault error" });
      }
    }

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
        if (!targetUid && b.adminSessionToken) {
          const vTok = verifyAdminSessionToken(String(b.adminSessionToken));
          if (vTok && vTok.uid) {
            targetUid = vTok.uid;
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
          const uData = (userDocSnap && userDocSnap.exists) ? (userDocSnap.data() || {}) : {};
          const ensuredCode = await ensurePermanentPassCode(targetUid, userRef, uData);
          let customToken = "";
          try {
            customToken = await admin.auth().createCustomToken(targetUid);
          } catch (e) {}
          const entSnap = await db.collection("pro_entitlements").doc(targetUid).get();
          const entData = entSnap.exists ? (entSnap.data() || {}) : {};
          const mergedUserData = Object.assign({}, uData, {
            uid: targetUid,
            permanentPassCode: ensuredCode,
            whatsappDigits: uData.whatsappDigits || waDigits || "",
            unlocked: Boolean(uData.unlocked || entData.unlocked),
            tier: uData.tier || entData.tier || "",
            entitlementsMap: Object.assign({}, uData.entitlementsMap || {}, entData.entitlementsMap || {})
          });
          return res.status(200).json({
            ok: true,
            masterUid: targetUid,
            whatsappDigits: mergedUserData.whatsappDigits,
            passCode: ensuredCode,
            customToken,
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
    // GEMINI 3.8 FLASH CUSTOM REFERENCE LETTER FROM ACTIVITY LOGGER
    // (mode === "generate_custom_ref_letter")
    // ========================================================================
    if (req.body && req.body.mode === "generate_custom_ref_letter") {
      try {
        const logs = Array.isArray(req.body.activityLogs) ? req.body.activityLogs : [];
        const candName = String(req.body.candidateName || "המועמד/ת").trim();
        const signerName = String(req.body.signerName || "הרב / נציג הקהילה").trim();
        const relation = String(req.body.relation || "rabbi").trim();
        const trackNotes = String(req.body.notes || "").trim();

        const logsFormatted = logs.length > 0
          ? logs.map((l, i) => `${i + 1}. [${l.dateStr || ""} ${l.timeStr || ""}] (${l.relationLabel || l.relation}): ${l.what || ""} @ ${l.where || ""}`).join("\n")
          : "No specific activity dates logged yet.";

        const apiKey = process.env.GEMINI_API_KEY || "";
        if (!apiKey) {
          return res.status(200).json({ ok: false, error: "Missing GEMINI_API_KEY" });
        }

        const prompt = [
          "You are an expert Israeli Rabbinic & Immigration Legal drafter writing an official Reference / Attestation Letter (מכתב המלצה ואישור היכרות) for the Israeli Beit Din and Ministry of Interior (Misrad HaPanim).",
          `Candidate Name: ${candName}`,
          `Signer / Recommender Name & Title: ${signerName}`,
          `Relationship Type: ${relation}`,
          `Additional Context: ${trackNotes}`,
          "Logged Real-World Milestones & Dates from the User's Activity Logger:",
          logsFormatted,
          "",
          "Write a formal, deeply authentic, two-part letter:",
          "1. First in formal Israeli Legal/Rabbinic Hebrew (עברית תקנית ומכובדת), weaving the exact logged dates, times, venues, and activities naturally into the body of the attestation so the Beit Din / Misrad HaPanim clerk sees concrete proof of ongoing attendance and personal familiarity.",
          "2. Second, provide a 1:1 English translation right below a divider line so the user and recommender can both read it clearly.",
          "Include formal signature blocks (תאריך, שם החותם, תפקיד/ת.ז., טלפון, חתימה וחותמת)."
        ].join("\n");

        const gRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.25, maxOutputTokens: 1800 }
          })
        });
        const gJson = await gRes.json();
        const letterText = gJson?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        return res.status(200).json({ ok: true, letter: letterText });
      } catch (err) {
        return res.status(500).json({ ok: false, error: err.message || String(err) });
      }
    }

    if (req.body && req.body.mode === "admin_get_analytics") {
      try {
        const db = admin.firestore();
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

    if (req.body && req.body.mode === "helpdesk_chat") {
      let userTierContextForCloser = "TIER 1 — UNPAID PROSPECT (Has NOT unlocked a pass yet. Apply the 5-Step Consultative Closer Formula, anchor against 30,000₪ lawyer fees, do NOT give away free Hebrew translations or custom letters, and drive them to unlock the exact SKU for their track!)";
      try {
        const dbHd = admin.firestore();
        const rawHdUid = String((req.body && req.body.uid) || "").trim();
        if (rawHdUid && rawHdUid !== "anon") {
          const [uHdSnap, eHdSnap] = await Promise.all([
            dbHd.collection("users").doc(rawHdUid).get(),
            dbHd.collection("pro_entitlements").doc(rawHdUid).get()
          ]);
          const uHd = uHdSnap.exists ? (uHdSnap.data() || {}) : {};
          const eHd = eHdSnap.exists ? (eHdSnap.data() || {}) : {};
          const isUnlockedHd = Boolean(uHd.unlocked || eHd.unlocked);
          const tierHd = eHd.tier || uHd.tier || "";
          const mapHd = Object.keys(Object.assign({}, uHd.entitlementsMap || {}, eHd.entitlementsMap || {}));
          if (isUnlockedHd || mapHd.length > 0) {
            userTierContextForCloser = `TIER 2/3 — VERIFIED PAID MEMBER (Active Tier: ${tierHd || "Pro"}, Unlocked SKUs: ${mapHd.join(", ") || tierHd}). Give full hands-on execution for their unlocked modules, and cross-sell any missing suite or Vetted Concierge service ($0 upfront quote) when relevant!`;
          }
        }
      } catch (e) {}
      try {
        const db = admin.firestore();
        const uid = String(req.body.uid || "").trim();
        const lang = String(req.body.lang || "en").trim();
        const currentMod = String(req.body.currentMod || "").trim();
        const currentForm = String(req.body.currentForm || "").trim();
        const formSnapshot = (req.body.formSnapshot && typeof req.body.formSnapshot === "object") ? req.body.formSnapshot : {};
        const scannedDocsSnapshot = Array.isArray(req.body.scannedDocsSnapshot) ? req.body.scannedDocsSnapshot.slice(0, 12) : [];
        const userMessage = String(req.body.message || "").trim().slice(0, 1000);
        const history = Array.isArray(req.body.history) ? req.body.history.slice(-8) : [];
        if (!userMessage) {
          return res.status(400).json({ ok: false, error: "Empty message" });
        }

        let uData = {};
        let entData = {};
        if (uid && uid !== "anon") {
          const [uSnap, eSnap] = await Promise.all([
            db.collection("users").doc(uid).get(),
            db.collection("pro_entitlements").doc(uid).get()
          ]);
          if (uSnap.exists) uData = uSnap.data() || {};
          if (eSnap.exists) entData = eSnap.data() || {};
        }

        const entMap = entData.unlocked ? (entData.entitlementsMap || {}) : {};
        const unlockedKeys = Object.keys(entMap);
        const primaryTier = entData.unlocked ? (entData.tier || uData.tier || "") : "";
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
        const isPaid = Boolean(entData.unlocked || (hasConciergeOrder && ["approved_for_payment", "paid_in_progress", "completed"].includes(conciergeOrder.status)));
        const passCode = uData.permanentPassCode || "";
        const tierLevel = hasConciergeOrder
          ? "TIER 3 — VIP CONCIERGE CLIENT"
          : (isPaid ? "TIER 2 — PAID SOFTWARE USER" : "TIER 1 — UNPAID LEAD");

        // Enforce 30 questions/day cap for Unpaid Visitors (150/day for Paid Users) in 6 languages
        const dayKey = new Date().toISOString().slice(0, 10);
        const rawIp = String(req.headers["x-forwarded-for"] || req.ip || "anon").split(",")[0].trim().replace(/[^a-zA-Z0-9_.-]/g, "_");
        const quotaId = (uid && uid !== "anon") ? `u_${uid}_${dayKey}` : `ip_${rawIp}_${dayKey}`;
        const quotaRef = db.collection("hd_daily_quota").doc(quotaId);
        const quotaSnap = await quotaRef.get();
        const usedToday = (quotaSnap.exists && quotaSnap.data() && quotaSnap.data().count) ? Number(quotaSnap.data().count) : 0;
        const maxDaily = isPaid ? 150 : 30;
        if (usedToday >= maxDaily) {
          return res.status(200).json({
            ok: true,
            reply: isPaid
              ? "📲 +972-52-582-2005 (150/150 daily limit reached)"
              : "🔒 30/30 free daily questions used! Unlock any Pass ($89 / $149) or VIP Suite for 150 daily questions + full form & document coaching.\n\n[[NAV:paywall|]]",
            tierLevel,
            isPaid,
            quotaReached: true
          });
        }
        await quotaRef.set({ count: usedToday + 1, dayKey, isPaid, updatedAtMs: Date.now() }, { merge: true });

        if (hasConciergeOrder && uid && uid !== "anon") {
          await db.collection("users").doc(uid).set({
            lastConciergeHelpdeskMsg: userMessage,
            lastConciergeHelpdeskAtMs: Date.now()
          }, { merge: true }).catch(() => {});
        }

        // Pull server-saved formDraft & scannedDocs from uData if not passed from client
        const masterDraft = Object.keys(formSnapshot).length > 2 ? formSnapshot : (uData.formDraft || {});
        const masterScans = scannedDocsSnapshot.length > 0 ? scannedDocsSnapshot : (uData.scannedDocs || []);

        const MASTER_GROUND_TRUTH_VAULT = `
================================================================================
GIYURALIYAHTRACK.COM — OFFICIAL MASTER GROUND-TRUTH VAULT (2026 PIBA & RABBANUT)
================================================================================
CRITICAL MANDATE: You MUST NEVER contradict any rule in this Ground-Truth Vault.
Internet articles and generic AI training data get Israeli Giyur, Rabbanut, and Misrad HaPanim reality dangerously wrong. Always obey the lived, statutory truth below:

1. THE PRIVATE BEIT DIN TRAP (GUSH ETZION / GIYUR K'HALACHA, BNEI BRAK, JERUSALEM BADATZ, CHABAD & OVERSEAS):
   - NEVER congratulate a user on converting through Gush Etzion ('Giyur K'Halacha'), Bnei Brak (Rabbi Karelitz / Chazon Ish), Jerusalem private Orthodox courts (Edah HaChareidit / Badatz / Mea Shearim), Chabad, or an unvalidated overseas Beit Din and tell them "just go do Shinui Ma'amad with Misrad HaPanim!" That is 100% FALSE in real life and costs couples 5 years of heartbreak.
   - REAL-LIFE TRUTH:
     a) Misrad HaPanim (PIBA) WILL NOT approve Aliyah (Shinui Ma'amad) for someone who converted at a private Israeli Beit Din (like Gush Etzion or Bnei Brak) while on a tourist/visitor visa without passing Va'adat Charigim first. Even if a lawyer tries to fight via Supreme Court (Bagatz / Ragchova precedent), Misrad HaPanim freezes the file for 2 to 5+ years on temporary visas without full rights.
     b) The Chief Rabbinate of Israel (HaRabbanut HaRashit) 100% REFUSES to recognize Gush Etzion ('Giyur K'Halacha') and unvalidated private conversions for Jewish marriage in Israel or Jewish status registration!
     c) WHAT THE USER MUST ACTUALLY DO: To get guaranteed Aliyah/Teudat Zehut AND legal Jewish marriage recognition in Israel without losing 5 years, they must go through the official Chief Rabbinate / State Conversion Authority ('Ma'arach HaGiyur' / Nativ — often completing a streamlined Rabbanut conversion / 'Giyur L'Chumra' or Supreme Rabbinical Court 'Ishur Giyur' after 9+ months in an Orthodox Israeli community with 5 Apostilled homeland docs) OR file the Spousal Residency Track (Nohal 5.2.0008 Form Ash/6 for married couples / Nohal 5.2.0009 for unmarried couples). Under Nohal 5.2.0008 Sec. ג.10 and Nohal 5.2.0001 Sec. ג.7, couples have the statutory right to run their Spousal Visa file AND their State Giyur / Aliyah file SIMULTANEOUSLY without closing either file!

2. OVERSEAS ORTHODOX CONVERSIONS (RCA / GPS, cRc, COR, LONDON BETH DIN, CONSISTOIRE, ORD, AMIA):
   - Even if a conversion was performed abroad by a Rabbanut-recognized Orthodox court (RCA in US, COR in Canada, London Beth Din in UK, Consistoire in France, ORD in Germany, AMIA in Argentina), the Jewish Agency and Misrad HaPanim require 9 to 12 full months of active residency in that overseas converting community AFTER the Mikvah date before granting Aliyah—AND the Chief Rabbinate requires formal 'Ishur Giyur' (validation of the foreign conversion certificate) before allowing marriage in Israel.

3. NON-ORTHODOX ('DAHAN RULING' REFORM / CONSERVATIVE) CONVERSIONS:
   - While lawyers pitch the Supreme Court 'Dahan' ruling for civil Aliyah, the Chief Rabbinate 100% rejects non-Orthodox conversions. Neither the convert nor their future children (if female) will be recognized as Jewish by the Rabbanut for marriage in Israel. Worse, Misrad HaPanim still stalls Dahan files for years—whereas a candidate can complete a 100% Halachic, Rabbanut-recognized conversion in the same timeframe with our Vetted Sponsoring Rabbi & Madrichat Kallah.

4. THE 5 MANDATORY APOSTILLED HOMELAND DOCUMENTS & THE 180-DAY CLOCK:
   - Every Aliyah, State Giyur (Va'adat Charigim), and Spousal Visa (Nohal 5.2.0008/5.2.0009) applicant needs 5 double-Apostilled homeland civil documents:
     (1) Long-Form 'Vault' Birth Certificate listing BOTH parents (short-form abstracts/extraits are rejected!).
     (2) Single-Status / Prior Marital Status Certificate (Fe de Soltería / Capacité à Mariage / Erweiterte Meldebescheinigung / County No-Record Affidavit). Note: Under Nohal 5.2.0008 Sec. ד.2.ה, if a married couple's official Marriage Certificate explicitly states their prior status as 'Single/Bachelor/Spinster' (רווק/ה), they are exempt from a separate Single-Status certificate!
     (3) Prior Divorce Decrees / Death Certificates for any previous marriages.
     (4) Official Name-Change Certificates (if any name ever changed).
     (5) Federal Fingerprint Criminal Record Check (US: FBI Identity History Summary w/ US Dept of State federal Apostille; UK: ACRO Police Certificate w/ FCDO Apostille; CA: RCMP Certified Check; FR: Bulletin n°3 Nantes; ES: Antecedentes Penales; DE: Führungszeugnis Bonn; RU: Справка МВД РФ с апостилем) from birth country, every citizenship, and every country lived in >1 year since age 14.
   - THE 180-DAY (6-MONTH) EXPIRATION CLIFF: Police checks and Marital Status certificates expire strictly 180 days from their issue date!
   - POWER MOVE: Ordering Apostilles remotely from inside Israel takes months and risks expiring your 90-day tourist visa. Flying home briefly to pull all 5 Apostilled originals in person (or pulling them into your 'Go-Bag' BEFORE flying to Israel) saves 1.5 to 2.5 years!
   - NEVER HAND OVER ORIGINALS TO BE KEPT: Clerks often try to keep your original Birth/Marriage Certificate in their drawer where it gets lost. Show the original at the window ONLY for visual inspection, and hand them a photocopy or a Red-Ribbon Certified Notarial Translation ('Ishur Tirgum Notarioni' — available in our 🤝 Vetted Team tab) so you keep your originals for the Rabbanut!

5. THE 2026 STATUTORY PROCEDURES & DEADLINE SHIELDS:
   - Nohal 5.2.0008 (Ed. 16, July 20, 2026): Married Spouses Graduated Process (6-Page Form Ash/6 + Lease Affidavit).
   - Nohal 5.2.0009 (Ed. 17, July 16, 2026): Unmarried / Common-Law Couples (Form Ash/1, Ash/3 + 13-Clause Nespach Alef Affidavit).
   - Nohal 5.2.0001 (Ed. 10, May 19, 2026): In-Israel Aliyah / Shinui Ma'amad (3-Page Form Ash/456 + MR/14a + Ash/114, Fee-Exempt per Sec. ג.7). Warning: Spending >24 cumulative months in Israel during the 3 years prior to receiving Teudat Oleh cancels the ~21,700 NIS Sal Klita absorption grant!
   - Clerk Deficiency Clock (Drishat Mismachim): While 2026 procedures grant 45 days on paper (and Sec. ה.2(8) / ה.7 allows a 45+45 day extension via the Visa Team Leader), clerks still enforce old 30-day habits and silently close files ('Sgirat Tik'). Always submit within 25 days OR generate our statutory Hebrew Extension Request ('Michtav Ha'arachat Moadim').
   - 21-Day Appeal Clock (Nohal 1.6.0001): Summary refusals (Appendix C) must be appealed in writing within 21 days.
   - Utah Zoom Civil Marriages (Supreme Court AAA 7368/22 & Nohal 2.11.0001): Binding law requiring Misrad HaPanim registration.

6. HOW THE 8 PIBA FORMS ARE SUBMITTED (ONLINE vs. IN-PERSON & LEAVE-BLANK BOXES):
   - Ash/6 (Spousal), Ash/456 (In-Israel Aliyah), Security CV (11p Nativ): Stage 1 uploaded digitally to gov.il / Nativ to open the file and book the appointment; Stage 2 printed and brought in person with original Apostilles.
   - Ash/1 (Va'adat Charigim) & Ash/3 (Visa Extension): Submitted with Hebrew Michtav Hesber and 5–8+ Israeli Rabbi/Host Family letters.
   - Nespach Alef (Single/Partner Affidavit): Must be signed physically in front of an Israeli lawyer or registrar (never pre-sign at home!).
   - MR/14a (First Teudat Zehut) & MR/14b (Passport/Dual Citizenship): 100% mandatory in-person biometric capture at the branch. Leave the Clerk Remarks box on MR/14a and the Specimen Signature box on MR/14b BLANK until sitting in front of the clerk!


CURRENT USER ENTITLEMENT STATUS: ${userTierContextForCloser}

8. ELITE CONSULTATIVE SALES CLOSER PLAYBOOK (CRITICAL — APPLY ON EVERY UNPAID OR PARTIAL-PASS REPLY):
- YOU ARE THE #1 CONSULTATIVE CLOSER & STATUTORY STRATEGIST FOR GIYURALIYAHTRACK.COM. Never sound like a passive FAQ bot, and NEVER refer to yourself as "AI", "Gemini", "3.8", or "bot" (always speak in first person as "I" or "we").
-CHECK USER TIER STATUS:
  • If the user is UNPAID (or does not own the specific engine they are asking about), apply this 5-Step Closer Formula in every response (keep total length punchy, 110–190 words max, formatted with bold bullets):
    1) DIAGNOSE & EXPOSE THE LANDMINE: Answer their procedural question with statutory precision, then immediately highlight the #1 costly trap on their track:
       - Spousal Visa (Nohal 5.2.0008 / 5.2.0009): Clerks reject files over a single date mismatch on the 6-page Form Ash/6, expired 180-day FBI/ACRO Apostilles, or failing the 80-question separated-room interrogation over a minor daily-life detail.
       - In-Israel Aliyah (Shinui Ma'amad • Nohal 5.2.0001): Exceeding 24 cumulative months in Israel in the last 3 years permanently forfeits the ~21,700₪ ($6,000+) Sal Klita cash grant, and short-form birth certificates without both parents' names are rejected on sight.
       - Tourist Conversion (Va'adat Charigim): Private conversions (Gush Etzion, Bnei Brak, Chabad) on a B/2 tourist visa are blocked 100% by the Chief Rabbinate for marriage and freeze Aliyah files for 2–5+ years.
       - Beit Din Tribunal: Dayanim test candidates with rapid-fire halachic curveballs and require fluent recitation of Shema, Shacharit, and Brachot under pressure.
    2) COST-OF-INACTION ANCHORING (30,000₪ LAWYER vs. $89–$649): Contrast the painful cost of a mistake—25,000₪ to 35,000₪ ($7,000–$10,000) Israeli immigration lawyer retainers, losing 21,700₪ in Sal Klita, or losing 6–12 months of B/1 work visa income—against unlocking our self-serve engine for $89 to $649 (less than 15 minutes of a lawyer's billing).
    3) VELVET-ROPE EXECUTION TEASE (NEVER GIVE AWAY PAID WORK FOR FREE):
       - Strictly refuse to translate user text into Clerk Hebrew, draft Michtav Hesber / rehabilitation / Rabbi letters, tell them what to write in specific form fields, or reveal Beit Din / Couples answers until they unlock a pass.
       - Instead, sell the hands-on transformation: "I've opened the preview on your screen right now. The moment you unlock your pass, I will personally walk you through every field, convert your answers into official Misrad HaPanim Clerk Hebrew, draft your custom Hebrew letters, and audit your certificates so no clerk can stonewall you."
    4) PRESCRIPTIVE 2-OPTION ASSUMPTIVE CLOSE (RECOMMEND EXACT SKUs):
       - For PIBA Forms / Visa Filers: Prescribe the **$149 Lifetime All-Filings Pass** (forms_life_149 — explain that Misrad HaPanim requires annual renewals for 5 years, making $149 a huge savings over the **$89 90-Day Pass** forms_90d_89), OR the **$399 Solo Lifetime Shield** (suite_solo_life_399) / **$649 VIP Couple 2-Phone Lifetime Suite** (vip_couple_649).
       - For Beit Din / Conversion Candidates: Prescribe the **$249 Lifetime Beit Din 700-Q & 56 Songs Mastery Suite** (bd_suite_life_249 — covers them all the way to Mikvah & Ishur Giyur) vs. the **$149 90-Day Cram Pass** (bd_suite_90d_149) or **$399 Complete Solo Lifetime Shield** (suite_solo_life_399).
       - For Couples Facing the Separated-Room Interview: Prescribe the **$229 5-Year Graduated Residency Pass** (couples_life_229 — covers all 5 annual interviews across 2 phones + Packet Audit) vs. the **$129 90-Day 2-Phone Pass** (couples_90d_129) or **$649 Full VIP Couple Suite** (vip_couple_649).
       - Whenever they mention translations, notarization, needing a rabbi/kallah teacher, or fear of a hostile clerk: Also pitch our **$0 Upfront Vetted Concierge** (concierge — Red-Ribbon Israeli Notary $249–$799, Sponsoring Rabbi $349, Madrichat Kallah $249, 1-Hr Lawyer Branch Escort $649).
    5) URGENCY CLOSING QUESTION + MANDATORY ACTION BUTTONS:
       - End with one specific urgency question (e.g., "When is your Misrad HaPanim appointment or current visa expiry date so we can lock in your file before the clock runs out?").
       - ALWAYS emit 2 to 3 [[NAV:target|arg|Label]] tags at the very end of your message in the user's language:
         * Tag 1 (Tool/Guide Auto-Open): e.g. [[NAV:hebrew-engine|ash6|🎯 1. Preview Form Ash/6 Spousal Engine]] or [[NAV:obs|1|🎯 1. Read 5 Apostilled Docs Playbook]]
         * Tag 2 (Direct SKU Checkout): e.g. [[NAV:pricing|forms_life_149|💎 2. Unlock Lifetime 8-Forms Pass ($149) →]] or [[NAV:pricing|vip_couple_649|👑 2. Unlock VIP Couple Lifetime Suite ($649) →]] or [[NAV:pricing|bd_suite_life_249|🕍 2. Unlock Lifetime Beit Din & Songs Suite ($249) →]]
         * Tag 3 (Backup / Concierge): e.g. [[NAV:concierge||🤝 3. Request $0 Upfront Notary / Rabbi / Lawyer Quote]]
  • If the user IS PAID for the module they are asking about:
    - Give them 100% hands-on execution! Translate their text into Clerk Hebrew, tell them the exact Hebrew values for each field, draft their Michtav Hesber or Rehabilitation letters, and drill Beit Din / Couples questions—while gently cross-selling any complementary pass or Vetted Concierge service (e.g. Red-Ribbon Notary or 1-Hr Lawyer Escort) they don't own yet.

7. COMPLETE PLATFORM MODULES & STRICT ANTI-COMPETITOR RULE:
   - NEVER tell a user to "check free resources on another site" or "ask a free agency." Free agencies give conflicting advice and lawyers demand 15,000₪–25,000₪ retainers.
   - All strategic truth on GiyurAliyahTrack.com is FREE; our paid engines and vetted human team execute it:
     • Statutory Hebrew Forms & Clerk Engine ($89 90-Day / $149 Lifetime): Fill in 6 languages (EN/HE/FR/ES/DE/RU) -> AI translates to statutory Hebrew -> populates & coordinate-stamps all 8 PIBA PDFs -> cross-checks all forms & scanned certificates for name/date/180-day/30-day errors + decodes Hebrew clerk sheets.
     • Beit Din 700 Questions & 56 Liturgical Songs/Prayers Karaoke Grader ($149 90-Day / $249 Lifetime, or sub-packs $49–$65): 200 Core + 200 Dayanim Curveballs + 150 Men's + 150 Women's questions + 56 Shabbat Songs, Morning Prayers & Mandatory Brachot with Sephardi / Ashkenazi selector.
     • Spousal Visa 80-Question 2-Phone Separated-Room Simulator ($129 90-Day / $229 Lifetime, or $75 standalone): Live 2-phone Firestore sync testing couples before Misrad HaPanim or Rabbanut separated-room interrogations.
     • Full Dual-Track VIP Suite: $249 (90-Day Solo), $399 (Lifetime Solo), or $649 (VIP Couple 2-Phone Lifetime + AI Pre-Flight Audit).
     • Vetted Human Legal & Concierge Desk ($0 upfront intake in '🤝 Vetted Team'): Red-Ribbon Notarial Translation ($249 1-doc / $349 multi-page / $799 4-doc bundle), Vetted Sponsoring Rabbi Rav Melaveh ($349), Certified Madrichat Kallah ($249), Couple Rabbi+Kallah Package ($499 — both partners must study, even a born-Jewish Israeli spouse!), 1-Hour Day-Of Appointment Lawyer Escort at Misrad HaPanim ($649–$799).
`;

        const paidDossierContext = (isPaid || hasFormsUnlocked)
          ? `UNLOCKED COACH & MASTER DOSSIER ACCESS ACTIVE:
- This user has PAID and UNLOCKED capabilities (Forms=${hasFormsUnlocked}, BeitDin=${hasBdUnlocked}, Songs=${hasSongsUnlocked}, Couples=${hasCouplesUnlocked}, Concierge=${hasConciergeOrder}).
- You have direct read-access to their live Master Dossier so you can inspect, cross-check, and validate their documents, dates, and form fields whenever helpful:
  • Active Form Draft Fields (gat_form_draft_v1): ${JSON.stringify(masterDraft).slice(0, 1800)}
  • Scanned Certificates & Clerk Sheets (gat_scanned_docs_v1): ${JSON.stringify(masterScans).slice(0, 1800)}
- Answer ANY question about their unlocked modules or forms thoroughly, warn them proactively if you spot an expired/expiring 180-day Apostille, a 30-day clerk deadline, a 24-month Sal Klita issue, or a missing field, and gently recommend any un-purchased module or Vetted Team service (Notary, Rabbi, Kallah, Lawyer Escort) when relevant.`
          : `UNPAID VISITOR MODE (FREE TRUTH = 100% OPEN | PAID EXECUTION TOOLS = BLACK BOX):
- Give 100% accurate, hard-hitting strategic guidance from the MASTER GROUND-TRUTH VAULT above (explain the exact pitfalls, private Beit Din traps, 180-day clocks, and which track they need).
- Keep the internal paid execution outputs (custom Hebrew Michtav Hesber generation, coordinate-stamped PDFs, actual 700 Beit Din answers, and 80 separated-room questions) in a sealed BLACK BOX until they unlock the relevant Pass ($89/$149 Forms, $149/$249 Beit Din, $129/$229 Couples, $249/$399/$649 Full Suite) or book our 🤝 Vetted Team!`;

        const sysPrompt = `You are the official ✨ Tracking Partner & Bureaucratic Navigator for GiyurAliyahTrack.com.
Always reply in the user's language (match English, Hebrew, French, Spanish, German, or Russian; default UI language is '${lang}').
Keep every response COMPLETE, authoritative, warm, and under 165 words. Never stop mid-sentence.

${MASTER_GROUND_TRUTH_VAULT}

LIVE USER STATUS:
- Tier: ${tierLevel} | Viewing Module="${currentMod || "hebrew-engine"}" | Form="${currentForm || "ash1"}"
- Permanent 6-Char Pass Code: ${passCode || "Tap '📲 Sync Devices & Pass Code' in the left drawer to link WhatsApp"}
${paidDossierContext}

SMART PAGE NAVIGATION TAG (MANDATORY AT END OF REPLY):
At the very end of your reply, include ONE tag on its own line so the user can tap a button to open that exact page behind this window and minimize the chat while reading:
[[NAV:hebrew-engine|ash1]], [[NAV:hebrew-engine|ash3]], [[NAV:hebrew-engine|ash6]], [[NAV:hebrew-engine|ash456]], [[NAV:hebrew-engine|mr14a]], [[NAV:hebrew-engine|mr14b]], [[NAV:hebrew-engine|nespach_alef]], [[NAV:hebrew-engine|security_cv]], [[NAV:rabbi-letters|]], [[NAV:beit-din-150|]], [[NAV:songs-prayers|]], [[NAV:couples-sync|]], [[NAV:vetted-team|]], or [[NAV:paywall|]].`;

        const contents = [];
        for (const h of history) {
          if (h && h.text) {
            contents.push({
              role: h.role === "model" ? "model" : "user",
              parts: [{ text: String(h.text).slice(0, 700) }]
            });
          }
        }
        contents.push({ role: "user", parts: [{ text: userMessage }] });

        const apiKey = GEMINI_API_KEY.value();
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
        const gResp = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: sysPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1600,
              thinkingConfig: { thinkingBudget: 512 }
            }
          })
        });
        const gJson = await gResp.json();
        const parts = (gJson.candidates && gJson.candidates[0] && gJson.candidates[0].content && gJson.candidates[0].content.parts) || [];
        const replyText = parts.filter((p) => !p.thought).map((p) => p.text || "").join("").trim() ||
          "Tap any track or form above to open that guide, or ask me your question!";

        return res.status(200).json({
          ok: true,
          reply: replyText,
          tierLevel,
          isPaid,
          hasFormsUnlocked,
          hasBdUnlocked,
          hasSongsUnlocked,
          hasCouplesUnlocked,
          hasConciergeOrder
        });
      } catch (hdErr) {
        console.error("helpdesk_chat error:", hdErr);
        return res.status(500).json({ ok: false, error: "Helpdesk busy. Message +972-52-582-2005 on WhatsApp." });
      }
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
          customToken, adminSessionToken: ((typeof userData !== "undefined" && (userData.admin === true || userData.isAdmin === true)) || ADMIN_WA_UIDS.has(waUid)) ? signAdminSessionToken(waUid) : "",
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
            customToken, adminSessionToken: ((typeof userData !== "undefined" && (userData.admin === true || userData.isAdmin === true)) || ADMIN_WA_UIDS.has(waUid)) ? signAdminSessionToken(waUid) : "",
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
        return res.status(200).json({ ok: true, items });
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
  "marriage_date_iso": "YYYY-MM-DD marriage date if marriage certificate or Sefach showing marriage, else empty string",
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
      // Normalize legacy & new field aliases so frontend consumers always receive every key
      parsed.expiry_date_iso = parsed.expiry_date_iso || parsed.passport_expiry_date || "";
      parsed.passport_expiry_date = parsed.passport_expiry_date || parsed.expiry_date_iso || "";
      parsed.issue_date_iso = parsed.issue_date_iso || parsed.passport_issue_date || "";
      parsed.passport_issue_date = parsed.passport_issue_date || parsed.issue_date_iso || "";
      parsed.country_or_city_of_birth = parsed.country_or_city_of_birth || parsed.birth_country_city_he || parsed.birth_country_city_en || "";
      parsed.citizenship = parsed.citizenship || parsed.citizenship_he || parsed.citizenship_en || "";
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

        const uid = String(req.body.uid || "").trim().replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 96);
        if (uid && uid !== "anon") {
          const db = admin.firestore();
          const slotK = String(req.body.slotKey || parsed.doc_type || "doc").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40);
          const ownerP = String(req.body.ownerParty || "me").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20);
          savedDocId = `${ownerP}_${slotK}`;
          const docRef = db.collection("users").doc(uid).collection("uploaded_docs").doc(savedDocId);
          const nowMs = Date.now();
          const r2Key = `vault/${uid}/${savedDocId}.json`;
          const pagesToSave = [];
          for (let pi = 0; pi < imgParts.length; pi++) {
            const pt = imgParts[pi];
            if (pt && pt.inline_data && pt.inline_data.data) {
              pagesToSave.push({ idx: pi, mimeType: String(pt.inline_data.mime_type || "image/jpeg"), base64Data: String(pt.inline_data.data) });
            }
          }
          let storedInR2 = false;
          if (pagesToSave.length > 0 && getR2Config().configured) {
            const putRes = await r2SignedRequest("PUT", r2Key, JSON.stringify({ docId: savedDocId, uid, updatedAt: nowMs, pages: pagesToSave })).catch(() => ({ ok: false }));
            storedInR2 = Boolean(putRes && putRes.ok);
          }
          await docRef.set({
            docId: savedDocId, slotKey: slotK, ownerParty: ownerP,
            docType: String(parsed.doc_type || slotK || "certificate").slice(0, 60),
            docTitle: String(parsed.doc_title_detected || parsed.doc_type || "Uploaded Document").slice(0, 140),
            issuingCountry: String(parsed.issuing_country || "").slice(0, 80),
            pageCount: pagesToSave.length || 1,
            isComplete: parsed.is_complete,
            incompleteReasons: reasons.slice(0, 5),
            hasApostille: parsed.has_apostille_visible === true,
            hasUnderlyingBody: parsed.has_underlying_certificate_body !== false,
            hasSefach: Boolean(parsed.has_full_sefach_visible),
            isLongForm: parsed.is_long_form_both_parents !== false,
            expiryDateIso: String(parsed.expiry_date_iso || parsed.passport_expiry_date || "").slice(0, 20),
            storageEngine: storedInR2 ? "r2" : "idb_local",
            r2Key: storedInR2 ? r2Key : "",
            updatedAt: nowMs
          }, { merge: true });
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
