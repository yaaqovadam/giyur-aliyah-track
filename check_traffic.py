#!/usr/bin/env python3
import ssl, json, time, datetime, urllib.request
from collections import Counter

SSL_CTX = ssl._create_unverified_context()
ADMIN_VIDS = {"u_mwu2hbfa_4ij28z", "wa_972534742332", "wa_972539332613"}
# Known desktop window heights/widths from owner MacBook / Mac mini dev sessions
OWNER_MAC_HEIGHTS = {"1263", "1024", "853", "986"}

def parse_ts(val):
    if not val:
        return 0.0
    if isinstance(val, (int, float)):
        return float(val) / 1000.0 if val > 1e11 else float(val)
    if isinstance(val, dict):
        for k in ("_seconds", "seconds"):
            if k in val:
                return float(val[k])
    if isinstance(val, str):
        try:
            return float(val) / 1000.0 if float(val) > 1e11 else float(val)
        except Exception:
            try:
                dt = datetime.datetime.fromisoformat(val.replace("Z", "+00:00"))
                return dt.timestamp()
            except Exception:
                return 0.0
    return 0.0

def fmt_ago(ts_sec, now_sec):
    if ts_sec <= 0:
        return "recent"
    diff = max(0, int(now_sec - ts_sec))
    if diff < 60:
        return f"{diff}s ago"
    if diff < 3600:
        return f"{diff // 60}m ago"
    if diff < 86400:
        return f"{diff // 3600}h {(diff % 3600) // 60}m ago"
    return f"{diff // 86400}d {(diff % 86400) // 3600}h ago"

def fmt_dwell(sec):
    try:
        s = int(float(sec or 0))
    except Exception:
        s = 0
    if s < 60:
        return f"{s}s"
    if s < 3600:
        return f"{s // 60}m {s % 60:02d}s"
    return f"{s // 3600}h {(s % 3600) // 60}m"

def main():
    now_sec = time.time()
    print("=" * 92)
    print("📊 GIYURALIYAHTRACK.COM — LIVE HUMAN TRAFFIC, SPOKE VIEWS & CRAWLER TELEMETRY")
    print("=" * 92)

    body_bytes = json.dumps({"mode": "admin_get_analytics"}).encode("utf-8")
    req = urllib.request.Request(
        "https://giyuraliyahtrack.com/api/auditDoc",
        data=body_bytes,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"},
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=25, context=SSL_CTX) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    raw_visitors = data.get("visitors") or []

    owner_sessions = []
    headless_sessions = []
    external_humans = []

    for v in raw_visitors:
        vid = str(v.get("vid") or v.get("uid") or v.get("id") or "anon")
        tz = str(v.get("tz") or v.get("timezone") or "Unknown")
        vp = str(v.get("screen") or v.get("viewport") or "")
        ua = str(v.get("ua") or v.get("userAgent") or "")
        path = str(v.get("currentPath") or v.get("lastPath") or v.get("path") or "/")
        lang = str(v.get("lang") or "en").upper()
        ref = str(v.get("ref") or v.get("referrer") or "Direct / Social").strip() or "Direct / Social"
        dwell = float(v.get("dwellSeconds") or v.get("totalSeconds") or v.get("seconds") or v.get("dwell") or 0)
        pulses = int(v.get("pulses") or v.get("hits") or 1)

        vp_h = vp.split("x")[1] if "x" in vp else ""
        is_owner = (
            vid in ADMIN_VIDS
            or v.get("isAdmin")
            or (tz == "Asia/Jerusalem" and (dwell > 1800 or vp_h in OWNER_MAC_HEIGHTS))
        )
        if is_owner:
            owner_sessions.append((vid, tz, vp, dwell, pulses, path, lang, ref, v))
            continue

        is_headless = (
            any(hvp in vp for hvp in ("412x732", "1024x1024", "800x600", "1600x1200", "1280x1280"))
            or any(b in ua.lower() for b in ("bot", "crawl", "spider", "headless", "facebookexternalhit", "whatsapp", "inspectiontool"))
            or (dwell <= 10 and pulses <= 1 and tz in ("America/Los_Angeles", "UTC", "Etc/UTC", "Unknown"))
        )
        if is_headless:
            headless_sessions.append((vid, tz, vp, dwell, pulses, path, lang, ref, v))
        else:
            external_humans.append((vid, tz, vp, dwell, pulses, path, lang, ref, v))

    print("👥 VISITOR BREAKDOWN (SEPARATING YOUR MAC DEV TABS FROM EXTERNAL VISITORS):")
    print(f"   • External Human Visitors:     {len(external_humans):4d} sessions | Total Dwell: {fmt_dwell(sum(x[3] for x in external_humans))}")
    print(f"   • Your Mac Dev/Test Sessions:  {len(owner_sessions):4d} sessions | Total Dwell: {fmt_dwell(sum(x[3] for x in owner_sessions))}")
    print(f"   • Headless Bot JS Renders:     {len(headless_sessions):4d} sessions | Total Dwell: {fmt_dwell(sum(x[3] for x in headless_sessions))}")

    # Parse per-page and per-language counters from `today` and `dailyHistory`
    page_views = Counter()
    page_seconds = Counter()
    lang_views = Counter()

    history_list = data.get("dailyHistory") or ([data["today"]] if isinstance(data.get("today"), dict) else [])
    for day_obj in history_list:
        if not isinstance(day_obj, dict):
            continue
        for k, val in day_obj.items():
            if k.startswith("pageViews."):
                slug = "/" + k[len("pageViews."):].strip("_").replace("_", "/") + "/"
                slug = slug.replace("//", "/")
                page_views[slug] += int(val or 0)
            elif k.startswith("pageSeconds."):
                slug = "/" + k[len("pageSeconds."):].strip("_").replace("_", "/") + "/"
                slug = slug.replace("//", "/")
                page_seconds[slug] += int(val or 0)
            elif k.startswith("langViews."):
                lg = k[len("langViews."):].upper()
                lang_views[lg] += int(val or 0)

    # Also tally `currentPath`, `lang`, `tz`, `ref` across external_humans
    ext_pages = Counter(x[5] for x in external_humans)
    ext_langs = Counter(x[6] for x in external_humans)
    ext_tz = Counter(x[1] for x in external_humans)
    ext_ref = Counter(x[7] for x in external_humans)

    print("\n🌍 EXTERNAL VISITORS BY LANGUAGE & TIMEZONE:")
    print("   • By Language:  " + ("  |  ".join(f"{k}: {c}" for k, c in ext_langs.most_common(6)) or "None"))
    print("   • By Timezone:  " + ("  |  ".join(f"{k} ({c})" for k, c in ext_tz.most_common(6)) or "None"))

    print("\n🔗 TOP EXTERNAL REFERRERS / TRAFFIC SOURCES:")
    for r_str, cnt in ext_ref.most_common(6):
        print(f"   • {cnt:4d} sessions  ←  {r_str}")

    print("\n📄 TOP ACTIVE PAGES Across All Languages (Views & Dwell Time):")
    all_tracked_pages = set(page_views.keys()) | set(ext_pages.keys())
    scored_pages = sorted(
        all_tracked_pages,
        key=lambda p: (ext_pages[p], page_views[p], page_seconds[p]),
        reverse=True
    )
    for pg in scored_pages[:15]:
        v_cnt = max(ext_pages[pg], page_views[pg])
        d_str = fmt_dwell(page_seconds[pg])
        print(f"   • {v_cnt:4d} views | Dwell: {d_str:8s} →  {pg}")

    print("\n🕒 TOP 20 EXTERNAL HUMAN SESSIONS (Sorted by Dwell Time):")
    for idx, (vid, tz, vp, dwell, pulses, path, lang, ref, raw) in enumerate(sorted(external_humans, key=lambda x: x[3], reverse=True)[:20], 1):
        short_ref = (ref[:22] + "..") if len(ref) > 24 else ref
        print(f"   #{idx:02d} | {fmt_dwell(dwell):7s} ({pulses:2d}p) | {lang:2s} | {tz:17s} | {vp:10s} | {path:30s} | {vid[:16]} ({short_ref})")

    crawlers = data.get("crawlers") or []
    print(f"\n🤖 SEARCH ENGINE & AI CRAWLER TELEMETRY ({len(crawlers)} Bot Profiles):")
    for c in sorted(crawlers, key=lambda x: int(x.get("hits") or 0), reverse=True)[:10]:
        bname = str(c.get("botName") or "Bot")
        hits = int(c.get("hits") or 0)
        last_p = str(c.get("lastPath") or "/")
        c_ts = parse_ts(c.get("lastSeen") or c.get("updatedAt") or c.get("timestamp"))
        c_ago = fmt_ago(c_ts, now_sec)
        print(f"   • {bname:30s} | {hits:4d} hits | {c_ago:11s} | Last: {last_p}")

    print("=" * 92)

if __name__ == "__main__":
    main()
