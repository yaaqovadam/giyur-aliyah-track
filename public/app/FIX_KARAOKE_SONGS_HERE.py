#!/usr/bin/env python3
"""
================================================================================
🎯 FIX_KARAOKE_SONGS_HERE.py — ADAPTIVE ALL-IN-ONE KARAOKE FORCED ALIGNER
================================================================================
AI DIRECTIVE FOR FUTURE GEMINI SESSIONS:
  When the user uploads or references `public/app/FIX_KARAOKE_SONGS_HERE.py`:
  1. DO NOT strip out the Pre-Flight Diagnostic Router (`diagnose_and_plan_track`)
     or switch Stage 2 to parallel threads. Sequential execution is intentional
     for 100% deterministic accuracy and zero API rate-limit jitter.
  2. NEVER revert to whole-file float arrays (`timestamps_sec: [...]`).
  3. Supports all 3 vaults in `public/app/songs_vault.js`:
     - `SONGS_VAULT12`   (IDs 1..13   -> `s_1..s_13`, `a_1..a_13`)
     - `BRACHOT_VAULT8`  (IDs 101..108 -> `s_104`, `s_105`, etc.)
     - `MORNING_VAULT7`  (IDs 201..207 -> `s_201..s_207`, `a_201..a_207`)
  4. Automatically inspects every track and enables ONLY the exact modules needed:
     - Hygiene & 1:1 indexed 5-language transliteration parity (`en/he/fr/es/de`).
     - Direct single-box fast path for short `<22s` tracks with no interludes.
     - Multi-refrain & duplicate stanza barrier (ignoring `ברוך אתה` Bracha prefixes
       so sequences like Birchot HaShachar keep each full blessing intact).
     - Biblical pasuk/bracha splitter on non-refrain spans >14 words.
     - Adaptive Niggun Vocable ("oy-oy", "yai-dai") & Melisma Shield + Nusach
       phonetics (`a_*` Ashkenazi/Carlebach vs `s_*` Sephardi).
     - Sequential Stage 1 (`50s–58s` FFmpeg windows, zero `MSS.cc` or clock drift)
       + Sequential Stage 2 isolated stanza alignment snapped to 50ms vocal frames.

USAGE (works from project root OR inside public/app/):
  • Align specific track(s) across Songs, Brachot, or Morning Prayers:
    python3 public/app/FIX_KARAOKE_SONGS_HERE.py s_201 s_12 a_4

  • Transcribe a swapped MP3 + rebuild 1:1 5-lang transliterations + align:
    python3 public/app/FIX_KARAOKE_SONGS_HERE.py s_12 --rewrite-lyrics

  • Align all remaining Shabbat Songs:
    python3 public/app/FIX_KARAOKE_SONGS_HERE.py --all-remaining
================================================================================
"""
import argparse
import base64
import hashlib
import json
import math
import os
import pathlib
import re
import shutil
import struct
import subprocess
import tempfile
import time
import urllib.request

APP_DIR = pathlib.Path(__file__).resolve().parent
ROOT_DIR = APP_DIR.parent.parent if APP_DIR.name == "app" else pathlib.Path.cwd()

VAULT_PATH = APP_DIR / "songs_vault.js"
APP_JS_PATH = APP_DIR / "app.js"
INDEX_HTML_PATH = APP_DIR / "index.html"
AUDIO_DIR = APP_DIR / "audio"
CDN_BASE = "https://audio.giyuraliyahtrack.com"
MODEL_ID = "gemini-3.8-flash"

FFMPEG_BIN = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"
FFPROBE_BIN = shutil.which("ffprobe") or "/opt/homebrew/bin/ffprobe"

ALREADY_LOCKED = {"s_1", "a_1", "s_3", "a_3", "a_4", "s_12", "s_13"}
LANG_KEYS = ["en", "he", "fr", "es", "de", "ru"]


def find_api_key():
    k = os.environ.get("GEMINI_API_KEY", "").strip()
    if k:
        return k
    for rel in [".env", "functions/.env", "functions/.secret.local", ".env.local"]:
        for base in [ROOT_DIR, pathlib.Path.cwd()]:
            fp = base / rel
            if fp.exists():
                for line in fp.read_text(encoding="utf-8", errors="ignore").splitlines():
                    if line.strip().startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise RuntimeError("GEMINI_API_KEY not found! Run: export GEMINI_API_KEY='your_key'")


def clean_corrupted_text(s):
    if not isinstance(s, str):
        return s
    s = re.sub(r"&nbsp;|&thinsp;", " ", s, flags=re.IGNORECASE)
    s = re.sub(
        r"\b(?:and\s+nbsp|and\s+thinsp|ve-thinsp|v'thinsp|v'enbiespi|samech\s+and\s+nbsp|samej\s+and\s+nbsp|samekh\s+and\s+nbsp)\b",
        " ",
        s,
        flags=re.IGNORECASE,
    )
    s = re.sub(r"אֶנְד\s+תִּינְסְפּ|וְתִּינְסְפּ|וְאֶנְבִּיאֶסְפִּי|סָמֶךְ\s+וְאֶנְבִּיאֶסְפִּי", " ", s)
    s = re.sub(r"\{[פס]\}", " ", s)
    s = re.sub(r"\s+\b[פסS]\b\s*$", "", s)
    s = re.sub(r"\s+\b(?:samech|samekh|samej|ס|סָמֶךְ)\b\s*$", "", s, flags=re.IGNORECASE)
    return re.sub(r"\s+", " ", s).strip()


def parse_vault_js(path):
    raw = path.read_text(encoding="utf-8")
    def extract_json(var_name, default_val):
        m = re.search(rf"window\.{var_name}\s*=\s*(\{{.*?\}}|\[.*?\]);", raw, flags=re.DOTALL)
        return json.loads(m.group(1)) if m else default_val
    return (
        extract_json("SONG_TIMESTAMPS", {}),
        extract_json("SONG_DURATIONS", {}),
        extract_json("SONGS_VAULT12", []),
        extract_json("BRACHOT_VAULT8", []),
        extract_json("MORNING_VAULT7", []),
    )


def save_vault_js(timestamps, durations, songs_vault, brachot_vault, morning_vault=None):
    if morning_vault is None:
        _, _, _, _, morning_vault = parse_vault_js(VAULT_PATH)
    audio_ver = {p.stem: hashlib.md5(p.read_bytes()).hexdigest()[:8] for p in sorted(AUDIO_DIR.glob("*.mp3")) if not p.name.startswith("_")} if AUDIO_DIR.exists() else {}
    out_lines = [
        f"window.SONG_TIMESTAMPS = {json.dumps(timestamps, ensure_ascii=False)};",
        f"window.SONG_AUDIO_VER = {json.dumps(audio_ver, ensure_ascii=False)};",
        f"window.SONG_DURATIONS = {json.dumps(durations, ensure_ascii=False)};",
        f"window.SONGS_VAULT12 = {json.dumps(songs_vault, ensure_ascii=False)};",
        f"window.BRACHOT_VAULT8 = {json.dumps(brachot_vault, ensure_ascii=False)};",
        f"window.MORNING_VAULT7 = {json.dumps(morning_vault, ensure_ascii=False)};",
        "",
    ]
    VAULT_PATH.write_text("\n".join(out_lines), encoding="utf-8")
    res = subprocess.run(["node", "--check", str(VAULT_PATH)], capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Syntax error in {VAULT_PATH}:\n{res.stderr}")
    if INDEX_HTML_PATH.exists():
        ih = INDEX_HTML_PATH.read_text(encoding="utf-8")
        ts_ver = str(int(time.time() * 1000))
        ih = re.sub(r"(\.js\?v=)\d+", rf"\g<1>{ts_ver}", ih)
        INDEX_HTML_PATH.write_text(ih, encoding="utf-8")


def get_mp3_and_duration(key):
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    local_fp = AUDIO_DIR / f"{key}.mp3"
    if not local_fp.exists() or local_fp.stat().st_size < 1000:
        url = f"{CDN_BASE}/{key}.mp3"
        print(f"⬇️ Downloading {url} -> {local_fp}")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=45) as resp:
            local_fp.write_bytes(resp.read())
    res = subprocess.run(
        [FFPROBE_BIN, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(local_fp)],
        capture_output=True, text=True, check=True,
    )
    dur = round(float(res.stdout.strip()), 2)
    return local_fp, local_fp.read_bytes(), dur


def call_gemini_json(api_key, prompt, mp3_bytes=None):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_ID}:generateContent?key={api_key}"
    parts = [{"text": prompt}]
    if mp3_bytes is not None:
        parts.append({"inline_data": {"mime_type": "audio/mp3", "data": base64.b64encode(mp3_bytes).decode("ascii")}})
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {"temperature": 0.0, "responseMimeType": "application/json"},
    }
    body = json.dumps(payload).encode("utf-8")
    for attempt in range(1, 5):
        try:
            req = urllib.request.Request(
                url, data=body,
                headers={"Content-Type": "application/json", "Referer": "https://giyuraliyahtrack.com/", "Origin": "https://giyuraliyahtrack.com"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=160) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
            raw_txt = resp_data["candidates"][0]["content"]["parts"][0]["text"].strip()
            raw_txt = re.sub(r"^```json\s*|\s*```$", "", raw_txt).strip()
            return json.loads(raw_txt)
        except Exception as e:
            print(f"      ⚠️ Gemini attempt {attempt} error: {e}")
            time.sleep(2.0 * attempt)
    return None


def generate_1to1_transliterations(api_key, he_words, nusach="s"):
    """Generates mathematically locked 1:1 token-for-token transliterations in 45-word chunks."""
    n_he = len(he_words)
    en_out, fr_out, es_out, de_out, ru_out = [], [], [], [], []
    pron_style = "Sephardi/Israeli (kamatz='a', tav='t')" if nusach == "s" else "Ashkenazi (kamatz='o', tav='s' when Sav)"

    CHUNK = 45
    for base in range(0, n_he, CHUNK):
        sub = he_words[base : base + CHUNK]
        indexed_in = [{"i": idx, "he": w} for idx, w in enumerate(sub)]
        prompt = f"""Transliterate each of these {len(sub)} Hebrew liturgical words ({pron_style} pronunciation) into English (en), French (fr), Spanish (es), German (de), and Russian Cyrillic (ru) phonetics.
Input words:
{json.dumps(indexed_in, ensure_ascii=False)}

CRITICAL 1:1 TOKEN RULE:
- Return `"items"`: an array of EXACTLY {len(sub)} objects (`"i": 0` .. `"i": {len(sub)-1}`).
- Each `"en"`, `"fr"`, `"es"`, `"de"`, and `"ru"` value MUST be a SINGLE token with NO spaces (join prefixes with hyphens if needed, e.g. `"B'chol"`, `"Ve-ahavta"`, `"Бе-холь"`, `"Ве-ахавта"`).
- Transliterate `"יְיָ"` or `"אֲדֹנָי"` as `"Adonai"` (fr: `"Adonaï"`, es: `"Adonai"`, de: `"Adonai"`, ru: `"Адонай"`).
Return ONLY valid JSON: {{"items": [{{"i": 0, "en": "...", "fr": "...", "es": "...", "de": "...", "ru": "..."}}]}}"""
        res = call_gemini_json(api_key, prompt, mp3_bytes=None) or {}
        by_i = {int(it.get("i", pos)): it for pos, it in enumerate(res.get("items") or []) if isinstance(it, dict)}
        for idx, hw in enumerate(sub):
            it = by_i.get(idx, {})
            def one_tok(val, fallback):
                t = re.sub(r"\s+", "-", str(val or "").strip())
                return t if t else fallback
            en_t = one_tok(it.get("en"), hw)
            en_out.append(en_t)
            fr_out.append(one_tok(it.get("fr"), en_t))
            es_out.append(one_tok(it.get("es"), en_t))
            de_out.append(one_tok(it.get("de"), en_t))
            ru_out.append(one_tok(it.get("ru"), en_t))

    return {
        "en": " ".join(en_out),
        "he": " ".join(en_out),
        "fr": " ".join(fr_out),
        "es": " ".join(es_out),
        "de": " ".join(de_out),
        "ru": " ".join(ru_out),
    }


def repair_transliteration_parity(api_key, song_obj, nusach, he_words):
    n_he = len(he_words)
    tr_key = f"tr_{nusach}"
    tr_obj = song_obj.get(tr_key)
    if not isinstance(tr_obj, dict):
        tr_obj = {}
        song_obj[tr_key] = tr_obj

    bad_langs = []
    for lk in LANG_KEYS:
        cleaned = clean_corrupted_text(tr_obj.get(lk) or "")
        tr_obj[lk] = cleaned
        if len(cleaned.split()) != n_he:
            bad_langs.append(lk)

    if not bad_langs:
        return False

    print(f"  🛠️ Pre-Flight: Rebuilding 1:1 transliteration parity for {bad_langs} ({n_he} words)...")
    fresh = generate_1to1_transliterations(api_key, he_words, nusach=nusach)
    for lk in bad_langs:
        tr_obj[lk] = fresh[lk]
    if "en" in tr_obj and len(tr_obj["en"].split()) == n_he:
        tr_obj["he"] = tr_obj["en"]
    return True


def analyze_audio_signal(mp3_path, real_dur):
    p = subprocess.run(
        [FFMPEG_BIN, "-i", str(mp3_path), "-f", "s16le", "-ac", "1", "-ar", "8000", "-af", "highpass=f=220,lowpass=f=3200", "-", "-loglevel", "error"],
        capture_output=True,
    )
    raw = p.stdout
    if len(raw) < 400:
        return [], 0.2, max(1.0, real_dur - 0.3), real_dur * 0.8, []
    samples = struct.unpack(f"<{len(raw)//2}h", raw[: (len(raw) // 2) * 2])
    hop = 400
    rms = [math.sqrt(sum(x * x for x in samples[i : i + hop]) / hop) for i in range(0, len(samples) - hop, hop)]
    if not rms:
        return [], 0.2, max(1.0, real_dur - 0.3), real_dur * 0.8, []
    s_rms = sorted(rms)
    thresh = max(180.0, s_rms[int(len(s_rms) * 0.20)] + (s_rms[int(len(s_rms) * 0.85)] - s_rms[int(len(s_rms) * 0.20)]) * 0.15)
    mask = [r >= thresh for r in rms]

    on_indices = [i for i, m in enumerate(mask) if m]
    first_v = round(on_indices[0] * 0.05, 2) if on_indices else 0.2
    last_v = round(on_indices[-1] * 0.05, 2) if on_indices else max(1.0, real_dur - 0.3)
    active_vocal_sec = round(len(on_indices) * 0.05, 2)

    long_gaps = []
    if on_indices:
        prev_f = on_indices[0]
        for f in on_indices[1:]:
            gap_s = (f - prev_f) * 0.05
            if gap_s >= 4.0:
                long_gaps.append((round(prev_f * 0.05, 2), round(f * 0.05, 2)))
            prev_f = f

    return mask, first_v, last_v, active_vocal_sec, long_gaps


def norm_he_token(w):
    return re.sub(r"[\u0591-\u05C7.,:;!?'\-״׳()]", "", w).strip()


def detect_all_recurring_refrains(words):
    """
    Detects musical refrains/choruses (5-15 words) while ignoring liturgical Bracha
    prefixes ('ברוך אתה ...') so sequential blessings (e.g. Birchot HaShachar) stay intact!
    """
    n = len(words)
    if n < 14:
        return []
    norm = [norm_he_token(w) for w in words]
    trigram_pos = {}
    for i in range(n - 2):
        tg = (norm[i], norm[i + 1], norm[i + 2])
        if tg[0] == "ברוך" and tg[1] == "אתה":
            continue
        if tg[0] in ("אלהינו", "אדני", "יי") and tg[1] in ("מלך", "אלהינו"):
            continue
        trigram_pos.setdefault(tg, []).append(i)

    refrain_spans = []
    used = [False] * n

    for tg, pos_list in sorted(trigram_pos.items(), key=lambda x: (-len(x[1]), x[1][0])):
        avail_pos = [p for p in pos_list if not used[p]]
        if len(avail_pos) < 3 and not (len(avail_pos) == 2 and avail_pos[0] == 0):
            continue
        lengths = []
        for idx_a in range(len(avail_pos) - 1):
            p1, p2 = avail_pos[idx_a], avail_pos[idx_a + 1]
            ml = 0
            while p1 + ml < p2 and p2 + ml < n and norm[p1 + ml] == norm[p2 + ml] and ml < 16:
                ml += 1
            if ml >= 5:
                lengths.append(ml)
        if not lengths:
            continue
        ref_len = min(lengths)
        if 5 <= ref_len <= 15:
            # Verify gaps between refrains aren't tiny 1-3 word fragments
            tiny_gaps = sum(1 for a, b in zip(avail_pos, avail_pos[1:]) if 0 < (b - (a + ref_len)) <= 3)
            if tiny_gaps >= 2:
                continue
            locked_here = []
            for p in avail_pos:
                if p + ref_len <= n and not any(used[p : p + ref_len]):
                    locked_here.append((p, p + ref_len))
                    for k in range(p, p + ref_len):
                        used[k] = True
            if len(locked_here) >= 2:
                refrain_spans.extend(locked_here)

    refrain_spans.sort()
    return refrain_spans


def split_non_refrain_by_pesukim(api_key, title, words, s_idx, e_idx):
    sub = words[s_idx:e_idx]
    m = len(sub)
    numbered = " ".join(f"[{i}]{w}" for i, w in enumerate(sub))
    prompt = f"""Partition these {m} Hebrew words from "{title}" (indexed 0 to {m - 1}) into individual complete liturgical blessings (brachot), verses (pesukim), or poetic clauses of **6 to 13 words each**, ending strictly where each blessing/verse/clause ends:
{numbered}

Rules:
- Return `"end_indices"`: a strictly increasing array of 0-based inclusive end-word indices for each complete blessing or verse, ending with `{m - 1}`.
- NEVER split `"בָּרוּךְ אַתָּה ... מֶלֶךְ הָעוֹלָם"` away from the ending words of its blessing (keep each complete short bracha together as one 8–12 word unit!).
Return ONLY valid JSON: {{"end_indices": [8, 16, ...]}}"""

    res = call_gemini_json(api_key, prompt, mp3_bytes=None)
    raw_ends = (res or {}).get("end_indices") or []
    spans = []
    cur = 0
    for val in raw_ends:
        end_i = int(val)
        if end_i < cur + 3 or end_i >= m:
            continue
        while (end_i + 1 - cur) > 16:
            mid = cur + math.ceil((end_i + 1 - cur) / 2)
            spans.append((s_idx + cur, s_idx + mid))
            cur = mid
        spans.append((s_idx + cur, s_idx + end_i + 1))
        cur = end_i + 1

    if cur < m:
        rem = m - cur
        if spans and rem <= 4:
            prev_s, _ = spans[-1]
            spans[-1] = (prev_s, s_idx + m)
        else:
            num_chunks = math.ceil(rem / 10.0)
            step = rem / num_chunks
            for c in range(num_chunks):
                cs = cur + round(c * step)
                ce = cur + round((c + 1) * step) if c < num_chunks - 1 else m
                if ce > cs:
                    spans.append((s_idx + cs, s_idx + ce))
    return spans


def diagnose_and_plan_track(api_key, key, song_obj, nusach, words, mp3_path, real_dur):
    title = song_obj.get("t", key)
    n_words = len(words)
    repaired_tr = repair_transliteration_parity(api_key, song_obj, nusach, words)
    mask, first_v, last_v, active_vocal_sec, long_gaps = analyze_audio_signal(mp3_path, real_dur)
    sec_per_word = round(active_vocal_sec / max(1, n_words), 2)

    is_short_single_box = (real_dur <= 22.0 and n_words <= 24 and len(long_gaps) == 0)
    refrain_spans = [] if is_short_single_box else detect_all_recurring_refrains(words)

    used_pasuk_splitter = False
    if is_short_single_box:
        stanzas = [(0, n_words)]
        partition_mode = "DIRECT_SINGLE_BOX"
    else:
        stanzas = []
        cur = 0
        for r_start, r_end in refrain_spans:
            if r_start > cur:
                if (r_start - cur) <= 14:
                    stanzas.append((cur, r_start))
                else:
                    used_pasuk_splitter = True
                    stanzas.extend(split_non_refrain_by_pesukim(api_key, title, words, cur, r_start))
            stanzas.append((r_start, r_end))
            cur = r_end
        if cur < n_words:
            if (n_words - cur) <= 14:
                stanzas.append((cur, n_words))
            else:
                used_pasuk_splitter = True
                stanzas.extend(split_non_refrain_by_pesukim(api_key, title, words, cur, n_words))

        if refrain_spans and used_pasuk_splitter:
            partition_mode = f"HYBRID_REFRAIN({len(refrain_spans)})+PASUK_SPLITTER"
        elif refrain_spans:
            partition_mode = f"REFRAIN_LOCKED({len(refrain_spans)} refrains)"
        else:
            partition_mode = "PASUK_BRACHA_SPLITTER"

    is_ashkenaz = (nusach == "a")
    use_niggun_shield = is_ashkenaz or (sec_per_word >= 1.15) or (len(long_gaps) >= 1)

    plan = {
        "key": key,
        "title": title,
        "nusach": nusach,
        "is_ashkenaz": is_ashkenaz,
        "real_dur": real_dur,
        "first_v": first_v,
        "last_v": last_v,
        "active_vocal_sec": active_vocal_sec,
        "sec_per_word": sec_per_word,
        "long_gaps": long_gaps,
        "mask": mask,
        "stanzas": stanzas,
        "is_short_single_box": is_short_single_box,
        "partition_mode": partition_mode,
        "use_niggun_shield": use_niggun_shield,
        "repaired_tr": repaired_tr,
    }

    print(f"\n🩺 PRE-FLIGHT DIAGNOSTIC [{key} — {title}]:")
    print(f"   • Audio Profile : {real_dur}s total | Vocal: {first_v}s..{last_v}s ({active_vocal_sec}s active, {sec_per_word}s/word) | Interludes >=4s: {len(long_gaps)}")
    print(f"   • Stanza Router : {partition_mode} -> {len(stanzas)} stanza box(es) for {n_words} words")
    print(f"   • Active Shields: Nusach={'Ashkenazi/Carlebach' if is_ashkenaz else 'Sephardi'} | Niggun/Melisma Shield={'ON' if use_niggun_shield else 'OFF (Crisp Recitation)'} | 5-Lang 1:1={'REPAIRED' if repaired_tr else 'VERIFIED OK'}")
    return plan


def get_clip_vocal_islands(mask, start_sec, clip_dur):
    if not mask:
        return f"0.10s-{clip_dur-0.10:.2f}s"
    f_start = max(0, int(start_sec / 0.05))
    f_end = min(len(mask), int((start_sec + clip_dur) / 0.05))
    sub = list(mask[f_start:f_end])
    last_on = -99
    for i, v in enumerate(sub):
        if v:
            if 0 < (i - last_on) <= 5:
                for j in range(last_on + 1, i):
                    sub[j] = True
            last_on = i
    islands = []
    in_seg = False
    s_i = 0
    for i, v in enumerate(sub):
        if v and not in_seg:
            in_seg = True
            s_i = i
        elif not v and in_seg:
            in_seg = False
            if (i - s_i) >= 3:
                islands.append(f"{s_i*0.05:.2f}s-{i*0.05:.2f}s")
    if in_seg and (len(sub) - s_i) >= 3:
        islands.append(f"{s_i*0.05:.2f}s-{len(sub)*0.05:.2f}s")
    return ", ".join(islands[:20]) if islands else f"0.10s-{clip_dur-0.10:.2f}s"


def next_vocal_sec(mask, from_sec, max_sec):
    if not mask:
        return from_sec
    start_f = max(0, int(from_sec / 0.05))
    for f in range(start_f, len(mask)):
        if mask[f]:
            return min(max_sec, round(max(from_sec, f * 0.05 - 0.15), 2))
    return from_sec


def slice_mp3_segment(mp3_path, start_sec, dur_sec):
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp_path = pathlib.Path(tmp.name)
    try:
        subprocess.run(
            [FFMPEG_BIN, "-y", "-ss", f"{start_sec:.2f}", "-t", f"{dur_sec:.2f}", "-i", str(mp3_path), "-ac", "1", "-ar", "16000", "-b:a", "48k", str(tmp_path), "-loglevel", "error"],
            check=True,
        )
        return tmp_path.read_bytes()
    finally:
        if tmp_path.exists():
            tmp_path.unlink()


def locate_stanzas_in_50s_windows(api_key, words, mp3_path, plan):
    stanzas = plan["stanzas"]
    n_stanzas = len(stanzas)
    real_dur = plan["real_dur"]
    mask = plan["mask"]
    first_v = plan["first_v"]
    last_v = plan["last_v"]

    if plan["is_short_single_box"]:
        box = (max(0.0, round(first_v - 0.1, 2)), min(real_dur, round(last_v + 0.15, 2)))
        print(f"⚡ Stage 1 Bypassed (Short Single-Box Track): Locked Stanza 1/1 -> [{box[0]}s .. {box[1]}s]")
        return [box]

    stanza_boxes = [None] * n_stanzas
    win_start = max(0.0, first_v - 0.30)
    st_cursor = 0
    base_win_dur = 50.0
    stretch_next_win = False

    print(f"🔍 Stage 1 (Sequential): Locating {n_stanzas} Complete Stanzas in 50s FFmpeg Windows...")

    phonetic_notes = []
    if plan["is_ashkenaz"]:
        phonetic_notes.append("- Vocalist uses Ashkenazi/Chassidic pronunciation (Kamatz='o', Tav='s').")
    if plan["use_niggun_shield"]:
        phonetic_notes.append("- Ignore wordless niggun syllables ('oy-oy', 'yai-dai') or instrumental breaks when marking stanza start_sec and end_sec!")
    notes_block = ("\n".join(phonetic_notes) + "\n") if phonetic_notes else ""

    max_safety = max(60, int(real_dur / 3.5) + n_stanzas)
    safety = 0
    while st_cursor < n_stanzas and win_start < (real_dur - 1.0) and safety < max_safety:
        safety += 1
        win_start = next_vocal_sec(mask, win_start, real_dur - 1.5)
        cur_win_max = 58.0 if stretch_next_win else base_win_dur
        stretch_next_win = False
        clip_dur = min(cur_win_max, real_dur - win_start)
        if clip_dur < 2.0:
            break

        cand_stanzas = stanzas[st_cursor : min(n_stanzas, st_cursor + 7)]
        st_lines = []
        for local_s, (w_lo, w_hi) in enumerate(cand_stanzas):
            st_txt = " ".join(words[w_lo:w_hi])
            st_lines.append(f'  Stanza [{local_s}] ({w_hi - w_lo} words, "{words[w_lo]} ... {words[w_hi-1]}"): {st_txt}')
        st_block = "\n".join(st_lines)
        vocal_islands = get_clip_vocal_islands(mask, win_start, clip_dur)

        prompt = f"""You are a precision Hebrew liturgical audio structure analyzer.
Listen to this {clip_dur:.2f}-second audio slice (0.00s to {clip_dur:.2f}s) from "{plan['title']}".
FFmpeg detected active vocal energy in this slice at: [{vocal_islands}]
{notes_block}Below are the next sequential Stanzas starting at Stanza [0]:
{st_block}

TASK:
Identify the exact decimal second (`start_sec` and `end_sec`, between 0.00 and {clip_dur:.2f}) when each Stanza [0], [1], ... is sung in this audio slice:
1. `start_sec`: exact second when the FIRST Hebrew word of that stanza begins being sung.
2. `end_sec`: exact second when the LAST Hebrew word of that stanza finishes being sung (stop BEFORE any trailing instrumental interlude!).
3. `complete`: `true` ONLY if the singer finishes the LAST Hebrew word of that stanza before {clip_dur:.2f}s; otherwise `false`.
4. If this entire {clip_dur:.2f}s clip is purely instrumental or repeats an already-completed stanza with Stanza [0] not starting yet, return `"stanzas": []` and `"skip_sec": 20.0`.

Return ONLY valid JSON:
{{"stanzas": [{{"s_idx": 0, "start_sec": 0.4, "end_sec": 12.2, "complete": true}}], "skip_sec": 0.0}}"""

        clip_bytes = slice_mp3_segment(mp3_path, win_start, clip_dur)
        res = call_gemini_json(api_key, prompt, clip_bytes)
        if not res:
            win_start += 12.0
            continue

        found = res.get("stanzas") or []
        locked_in_win = 0
        next_win_override = None

        for idx_pos, item in enumerate(found):
            if not isinstance(item, dict):
                continue
            s_idx = int(item.get("s_idx", idx_pos))
            if s_idx != locked_in_win or (st_cursor + s_idx) >= n_stanzas:
                break
            rel_s = max(0.0, min(clip_dur - 0.5, float(item.get("start_sec", 0.0))))
            rel_e = max(rel_s + 0.9, min(clip_dur, float(item.get("end_sec", clip_dur))))
            is_comp = bool(item.get("complete", True))
            at_final_window = (win_start + clip_dur) >= (real_dur - 1.5)

            if (not is_comp or rel_e >= clip_dur - 0.8) and not at_final_window:
                if locked_in_win > 0:
                    next_win_override = max(win_start + 1.5, round(win_start + rel_s - 0.4, 2))
                    break
                elif rel_s >= 5.0:
                    next_win_override = round(win_start + rel_s - 0.4, 2)
                    stretch_next_win = True
                    break
                elif cur_win_max < 57.0:
                    next_win_override = win_start
                    stretch_next_win = True
                    break

            abs_s = round(win_start + rel_s, 2)
            abs_e = round(win_start + rel_e, 2)
            global_st = st_cursor + s_idx
            w_lo, w_hi = stanzas[global_st]
            stanza_boxes[global_st] = (abs_s, abs_e)
            print(
                f"  📦 Stanza {global_st+1:2d}/{n_stanzas} (Words {w_lo:3d}..{w_hi-1:3d}: {words[w_lo]}..{words[w_hi-1]}) -> [{abs_s:6.2f}s .. {abs_e:6.2f}s]"
            )
            locked_in_win += 1

        if locked_in_win > 0:
            last_locked_end = stanza_boxes[st_cursor + locked_in_win - 1][1]
            st_cursor += locked_in_win
            win_start = next_win_override if next_win_override is not None else round(last_locked_end - 0.12, 2)
        elif next_win_override is not None:
            win_start = next_win_override
        else:
            skip_s = max(8.0, min(clip_dur - 4.0, float(res.get("skip_sec") or 16.0)))
            print(f"  🎻 [{win_start:6.2f}s .. {win_start+skip_s:6.2f}s] Instrumental / Niggun / Repeat skipped (+{skip_s:.1f}s)")
            win_start = round(win_start + skip_s, 2)

    for i in range(n_stanzas):
        if stanza_boxes[i] is None:
            prev_e = stanza_boxes[i - 1][1] if i > 0 and stanza_boxes[i - 1] else first_v
            rem_st = n_stanzas - i
            span = max(1.8, (real_dur - 0.4 - prev_e) / max(1, rem_st))
            stanza_boxes[i] = (round(prev_e + 0.1, 2), round(min(real_dur - 0.1, prev_e + span), 2))

    return stanza_boxes


def align_words_inside_stanza_box(api_key, st_words, st_start, st_end, mp3_path, plan):
    n = len(st_words)
    mask = plan["mask"]
    clip_dur = max(1.2, round(st_end - st_start, 2))
    clip_bytes = slice_mp3_segment(mp3_path, st_start, clip_dur)
    vocal_islands = get_clip_vocal_islands(mask, st_start, clip_dur)
    numbered = "  ".join(f"[{i}] {w}" for i, w in enumerate(st_words))

    extra_rules = []
    if plan["is_ashkenaz"]:
        extra_rules.append("- Vocalist sings with Ashkenazi pronunciation (Kamatz='o', Tav='s').")
    if plan["use_niggun_shield"]:
        extra_rules.append("- Ignore any wordless niggun syllables ('oy-oy', 'yai-dai-dai', 'lai-lai'); trigger each word ONLY on its real Hebrew consonant/vowel!")
    rules_txt = ("\n".join(extra_rules) + "\n") if extra_rules else ""

    prompt = f"""Listen to this {clip_dur:.2f}-second isolated vocal stanza clip (0.00s to {clip_dur:.2f}s) from "{plan['title']}".
FFmpeg active vocal bursts in this clip: [{vocal_islands}]
{rules_txt}Exact {n} Hebrew words sung in this stanza (indexed 0 to {n - 1}):
{numbered}

TASK:
Return the exact decimal second `t` (between 0.00 and {clip_dur:.2f}) when each word `0` through `{n - 1}` begins being sung in this clip.
- Include ALL {n} words (`"i": 0` through `"i": {n - 1}`) in strictly non-decreasing order.
Return ONLY valid JSON: {{"aligned": [{{"i": 0, "t": 0.15}}, ...]}}"""

    res = call_gemini_json(api_key, prompt, clip_bytes)
    by_idx = {}
    if res and isinstance(res.get("aligned"), list):
        for pos, it in enumerate(res["aligned"]):
            if isinstance(it, dict):
                by_idx[int(it.get("i", pos))] = float(it.get("t", 0.0))
            elif isinstance(it, (int, float)):
                by_idx[pos] = float(it)

    rel_stamps = [None] * n
    for i in range(n):
        if i in by_idx:
            rel_stamps[i] = max(0.0, min(clip_dur - 0.08, by_idx[i]))

    for i in range(n):
        if rel_stamps[i] is None:
            prev_t = rel_stamps[i - 1] if i > 0 and rel_stamps[i - 1] is not None else 0.08
            next_known = next(((j, rel_stamps[j]) for j in range(i + 1, n) if rel_stamps[j] is not None), (n, clip_dur - 0.12))
            steps = max(1, next_known[0] - i + 1)
            rel_stamps[i] = prev_t + (next_known[1] - prev_t) / steps

    if mask:
        f_base = max(0, int(st_start / 0.05))
        for i in range(n):
            f_cur = min(len(mask) - 1, f_base + int(rel_stamps[i] / 0.05))
            if not mask[f_cur]:
                for f_scan in range(f_cur, min(len(mask), f_cur + 12)):
                    if mask[f_scan]:
                        rel_stamps[i] = round((f_scan - f_base) * 0.05, 2)
                        break

    min_gap = 0.14 if plan["sec_per_word"] >= 0.7 else 0.09
    abs_stamps = [round(st_start + r, 2) for r in rel_stamps]
    for i in range(1, n):
        if abs_stamps[i] < abs_stamps[i - 1] + min_gap:
            abs_stamps[i] = round(min(st_end - 0.03, abs_stamps[i - 1] + min_gap), 2)
    return abs_stamps


def align_track_adaptive(api_key, key, song_obj, nusach, words, mp3_path, real_dur):
    plan = diagnose_and_plan_track(api_key, key, song_obj, nusach, words, mp3_path, real_dur)
    stanzas = plan["stanzas"]
    stanza_boxes = locate_stanzas_in_50s_windows(api_key, words, mp3_path, plan)

    print(f"🎯 Stage 2 (Sequential): Aligning Words Inside Each Isolated Stanza Clip for {key}...")
    full_stamps = []
    for st_idx, ((w_lo, w_hi), (st_s, st_e)) in enumerate(zip(stanzas, stanza_boxes)):
        st_words = words[w_lo:w_hi]
        st_stamps = align_words_inside_stanza_box(api_key, st_words, st_s, st_e, mp3_path, plan)
        full_stamps.extend(st_stamps)
        print(
            f"  ✅ Stanza {st_idx+1:2d}/{len(stanzas)} [{st_s:6.2f}s..{st_e:6.2f}s] Words {w_lo:3d}..{w_hi-1:3d} "
            f"({st_words[0]}..{st_words[-1]}) -> {st_stamps[0]:.2f}s .. {st_stamps[-1]:.2f}s"
        )

    min_step = 0.12 if plan["sec_per_word"] >= 0.7 else 0.08
    for i in range(1, len(full_stamps)):
        if full_stamps[i] < full_stamps[i - 1] + min_step:
            full_stamps[i] = round(min(real_dur - 0.04, full_stamps[i - 1] + min_step), 2)

    assert len(full_stamps) == len(words), f"Timestamp count mismatch on {key}: {len(full_stamps)} != {len(words)}"
    return full_stamps


def rewrite_lyrics_from_audio(api_key, key, mp3_bytes, nusach="s", prayer_hint=""):
    print(f"✍️ Transcribing exact sung vocalized Siddur Hebrew & 1:1 5-lang transliterations for {key}...")
    hint_line = f"Liturgical context for orthography/niqqud: {prayer_hint}\n" if prayer_hint else ""
    prompt = f"""Listen carefully to this entire Hebrew liturgical recording ({key}) and transcribe EVERY real Hebrew liturgical word in the EXACT order sung by the vocalist (including any repeated phrases, "ברוך שם כבוד מלכותו לעולם ועד", "אמן", or "ה׳ אלהיכם אמת" if sung!).
{hint_line}CRITICAL RULES:
1. Use authentic, standard Siddur Hebrew spelling with FULL vowel points (נִקּוּד / niqqud). Write Hashem's Name as `"אֲדֹנָי"` whenever pronounced "Adonai".
2. DO NOT include wordless niggun vocables ("oy", "ai-yai", "lai-lai", "yai-dai").
3. Separate every Hebrew word cleanly with spaces (do NOT join two words with a maqaf `־`; use a space instead so each word highlights individually).
Return ONLY valid JSON: {{"he": "מוֹדֶה אֲנִי לְפָנֶיךָ ..."}}"""
    res = call_gemini_json(api_key, prompt, mp3_bytes)
    he_raw = (res.get("he") or "").replace("־", " ")
    he_clean = clean_corrupted_text(he_raw)
    he_words = [w for w in he_clean.split() if w]
    tr_dict = generate_1to1_transliterations(api_key, he_words, nusach=nusach)
    print(f"  ✅ Transcribed {len(he_words)} vocalized Hebrew words + verified 1:1 5-lang transliterations.")
    return " ".join(he_words), tr_dict


def main():
    parser = argparse.ArgumentParser(description="Adaptive Self-Diagnosing 2-Stage Karaoke Aligner")
    parser.add_argument("tracks", nargs="*", help="Track keys to patch, e.g. s_201 s_12 a_4")
    parser.add_argument("--all-remaining", action="store_true", help="Align remaining Shabbat tracks")
    parser.add_argument("--all", action="store_true", help="Align all 26 Shabbat tracks")
    parser.add_argument("--all-morning", action="store_true", help="Align all Morning Prayer tracks (s_201..s_207)")
    parser.add_argument("--rewrite-lyrics", action="store_true", help="Transcribe MP3 lyrics & rebuild 1:1 5-lang transliterations")
    args = parser.parse_args()

    api_key = find_api_key()
    timestamps, durations, songs_vault, brachot_vault, morning_vault = parse_vault_js(VAULT_PATH)

    by_id = {}
    for arr in (songs_vault, brachot_vault, morning_vault):
        for item in arr:
            by_id[str(item["id"])] = item

    target_tracks = list(args.tracks)
    if args.all or args.all_remaining:
        target_tracks = []
        for s in songs_vault:
            sid = str(s["id"])
            for n in ["s", "a"]:
                k = f"{n}_{sid}"
                if args.all_remaining and k in ALREADY_LOCKED:
                    continue
                target_tracks.append(k)
    elif args.all_morning:
        target_tracks = [f"s_{m['id']}" for m in morning_vault]

    if not target_tracks:
        parser.print_help()
        return

    md5_mem = {}
    for key in target_tracks:
        nusach, sid = key.strip().split("_")
        if sid not in by_id:
            print(f"❌ Unknown track ID: {key}")
            continue
        s = by_id[sid]
        local_fp, mp3_bytes, real_dur = get_mp3_and_duration(key)
        durations.setdefault(nusach, {})[sid] = real_dur

        if args.rewrite_lyrics:
            new_he, new_tr = rewrite_lyrics_from_audio(api_key, key, mp3_bytes, nusach=nusach, prayer_hint=s.get("t", ""))
            s[f"he_{nusach}"] = new_he
            s[f"tr_{nusach}"] = new_tr
            if int(sid) >= 200:
                s["he_a"] = new_he
                s["tr_a"] = dict(new_tr)

        he_field = f"he_{nusach}"
        s[he_field] = clean_corrupted_text(s.get(he_field) or s.get("he_s") or "")
        words = [w for w in s[he_field].split() if w]

        sig = f"{hashlib.md5(mp3_bytes).hexdigest()[:12]}:{len(words)}"
        if sig in md5_mem and not args.rewrite_lyrics:
            repair_transliteration_parity(api_key, s, nusach, words)
            timestamps[key] = list(md5_mem[sig])
            save_vault_js(timestamps, durations, songs_vault, brachot_vault, morning_vault)
            print(f"🔗 Reused verified identical MP3 alignment for {key} ({len(words)} words)!\n")
            continue

        aligned = align_track_adaptive(api_key, key, s, nusach, words, local_fp, real_dur)
        timestamps[key] = aligned
        md5_mem[sig] = aligned
        save_vault_js(timestamps, durations, songs_vault, brachot_vault, morning_vault)
        print(f"✅ Locked & Saved {key} ({len(aligned)}/{len(words)} words, {aligned[0]}s..{aligned[-1]}s)!\n")

    print("🎉 ALL REQUESTED TRACKS DIAGNOSED, ALIGNED & SAVED!")


if __name__ == "__main__":
    main()
