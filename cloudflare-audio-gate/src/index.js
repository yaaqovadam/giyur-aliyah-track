const FIREBASE_PROJECT_ID = "giyur-aliyah-track";
const ALWAYS_FREE_TRACKS = new Set(["s_1", "a_1", "s_2", "a_2", "s_3", "a_3", "s_101", "a_101", "s_102", "a_102", "s_103", "a_103", "s_201", "a_201", "s_202", "a_202", "s_203", "a_203"]);
const SONGS_ENABLED_TIERS = new Set(["songs_65", "bd_suite_90d_149", "bd_suite_life_249", "suite_solo_90d_249", "suite_solo_life_399", "vip_couple_649"]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Range, Authorization, Content-Type",
  "Access-Control-Expose-Headers": "Content-Length, Content-Range, Accept-Ranges, X-GAT-Stream-Tier"
};

function decodeJwtUid(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const payload = JSON.parse(atob(b64));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.sub || payload.aud !== FIREBASE_PROJECT_ID || (payload.exp && payload.exp < now)) {
      return null;
    }
    return payload.sub;
  } catch {
    return null;
  }
}

function readFirestoreInt(valObj) {
  if (!valObj) return 0;
  if (valObj.integerValue !== undefined) return Number(valObj.integerValue) || 0;
  if (valObj.doubleValue !== undefined) return Number(valObj.doubleValue) || 0;
  return 0;
}

async function verifySongsEntitlement(idToken) {
  if (!idToken) return false;
  const uid = decodeJwtUid(idToken);
  if (!uid) return false;

  const cache = caches.default;
  const hashBuf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(idToken));
  const tokHash = Array.from(new Uint8Array(hashBuf)).slice(0, 12).map(b => b.toString(16).padStart(2, "0")).join("");
  const cacheReq = new Request("https://gat-auth-cache.internal/songs/" + uid + "/" + tokHash);
  const hit = await cache.match(cacheReq);
  if (hit) return (await hit.text()) === "1";

  const fsUrl = "https://firestore.googleapis.com/v1/projects/" + FIREBASE_PROJECT_ID +
    "/databases/(default)/documents/pro_entitlements/" + encodeURIComponent(uid);
  const resp = await fetch(fsUrl, {
    headers: { "Authorization": "Bearer " + idToken }
  });

  let allowed = false;
  if (resp.ok) {
    const doc = await resp.json();
    const f = doc.fields || {};
    const nowMs = Date.now();

    const emap = f.entitlementsMap && f.entitlementsMap.mapValue && f.entitlementsMap.mapValue.fields;
    if (emap) {
      for (const [tierKey, entryVal] of Object.entries(emap)) {
        if (!SONGS_ENABLED_TIERS.has(tierKey)) continue;
        const ef = (entryVal && entryVal.mapValue && entryVal.mapValue.fields) || {};
        const expMs = readFirestoreInt(ef.exp);
        if (expMs === 0 || expMs > nowMs) {
          allowed = true;
          break;
        }
      }
    }

    if (!allowed && f.tier && f.tier.stringValue && SONGS_ENABLED_TIERS.has(f.tier.stringValue)) {
      const topExp = readFirestoreInt(f.exp);
      if (topExp === 0 || topExp > nowMs) allowed = true;
    }
    if (!allowed && ((f.allAccess && f.allAccess.booleanValue) || (f.songsUnlocked && f.songsUnlocked.booleanValue))) {
      allowed = true;
    }
  }

  await cache.put(cacheReq, new Response(allowed ? "1" : "0", {
    headers: { "Cache-Control": "public, max-age=120" }
  }));
  return allowed;
}

function parseByteRange(rangeHeader, totalSize) {
  if (!rangeHeader || !rangeHeader.startsWith("bytes=")) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!m) return null;
  let start = m[1] ? parseInt(m[1], 10) : 0;
  let end = m[2] ? parseInt(m[2], 10) : totalSize - 1;
  if (!m[1] && m[2]) {
    start = Math.max(0, totalSize - parseInt(m[2], 10));
    end = totalSize - 1;
  }
  if (isNaN(start) || isNaN(end) || start > end || start >= totalSize) return null;
  end = Math.min(end, totalSize - 1);
  return { offset: start, length: end - start + 1, end };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const cleanPath = url.pathname.replace(/^\/+/, "");
    if (cleanPath === "__ping") {
      return new Response("ok", { status: 200, headers: CORS_HEADERS });
    }

    const m = /^([sa]_\d+)\.mp3$/i.exec(cleanPath);
    if (!m) {
      return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
    }

    const trackKey = m[1].toLowerCase();
    const authHeader = request.headers.get("Authorization") || "";
    const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
    const token = bearer || url.searchParams.get("token") || "";

    const QA_OPEN_ALL_AUDIO = true; // QA_OPEN_MODE: flip to false when song QA is done
    let allowFull = QA_OPEN_ALL_AUDIO || ALWAYS_FREE_TRACKS.has(trackKey);
    if (!allowFull && token) {
      allowFull = await verifySongsEntitlement(token);
    }

    const tier = allowFull ? "full" : "preview";
    let r2Key = tier + "/" + trackKey + ".mp3";
    let headObj = await env.AUDIO_BUCKET.head(r2Key);
    if (!headObj && allowFull) {
      r2Key = trackKey + ".mp3";
      headObj = await env.AUDIO_BUCKET.head(r2Key);
    }
    if (!headObj) {
      return new Response("Audio Not Found: " + r2Key, { status: 404, headers: CORS_HEADERS });
    }

    const totalSize = headObj.size;
    const rangeSpec = parseByteRange(request.headers.get("Range"), totalSize);

    const headers = new Headers(CORS_HEADERS);
    headers.set("Content-Type", "audio/mpeg");
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", "private, max-age=3600");
    headers.set("Vary", "Authorization, Range");
    if (headObj.httpEtag) headers.set("ETag", headObj.httpEtag);
    headers.set("X-GAT-Stream-Tier", tier);

    if (request.method === "HEAD") {
      headers.set("Content-Length", String(totalSize));
      return new Response(null, { status: 200, headers });
    }

    if (rangeSpec) {
      const obj = await env.AUDIO_BUCKET.get(r2Key, {
        range: { offset: rangeSpec.offset, length: rangeSpec.length }
      });
      headers.set("Content-Range", "bytes " + rangeSpec.offset + "-" + rangeSpec.end + "/" + totalSize);
      headers.set("Content-Length", String(rangeSpec.length));
      return new Response(obj.body, { status: 206, headers });
    }

    const obj = await env.AUDIO_BUCKET.get(r2Key);
    headers.set("Content-Length", String(totalSize));
    return new Response(obj.body, { status: 200, headers });
  }
};
