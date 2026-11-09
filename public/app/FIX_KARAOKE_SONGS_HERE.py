#!/usr/bin/env python3
"""
================================================================================
🎯 FIX_KARAOKE_SONGS_HERE.py — 2-STAGE STANZA-BOXED KARAOKE FORCED ALIGNER
================================================================================
AI DIRECTIVE FOR FUTURE GEMINI SESSIONS:
  When the user uploads or references `public/app/FIX_KARAOKE_SONGS_HERE.py`:
  1. DO NOT change the sequential 2-Stage Stanza-Boxed alignment logic below, and
     NEVER revert to whole-file float arrays (`timestamps_sec: [...]`). Whole-file
     alignment fails on 3-to-7 min cantorial MP3s due to Gemini MSS.cc encoding
     (121.0 for 1:21 = 81.0s), clock drift after 90s, and Chassidic niggun vocables.
  2. Always use this exact sequential 2-Stage Stanza-Boxed pipeline:
     - Stage 1 (`locate_stanzas_in_50s_windows`): Splits lyrics into complete
       liturgical stanzas (7–17 words) and locates each complete stanza's exact
       `[start_sec, end_sec]` inside 50-second FFmpeg windows (<60s = zero MSS.cc
       or clock drift, and never cuts a stanza in half).
     - Stage 2 (`align_words_inside_stanza_box`): Sequentially slices each stanza's
       isolated `[start_sec, end_sec]` clip via FFmpeg, maps 50ms vocal-energy
       islands (220Hz–3200Hz), ignores niggun vocables ("oy-oy", "yai-dai-dai"),
       and aligns only that stanza's words inside its box.

TERMINAL COMMANDS (works from project root OR inside public/app/):
  • Patch specific song(s) with current card lyrics:
    python3 public/app/FIX_KARAOKE_SONGS_HERE.py s_2 a_2 s_4

  • Patch a swapped MP3 AND auto-transcribe lyrics + 1:1 5-lang transliterations:
    python3 public/app/FIX_KARAOKE_SONGS_HERE.py a_1 --rewrite-lyrics

  • Patch all remaining tracks (skips already-verified s_1, a_1, s_3, a_3):
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

ALREADY_LOCKED = {"s_1", "a_1", "s_3", "a_3"}


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
    )


def save_vault_js(timestamps, durations, songs_vault, brachot_vault):
    out_lines = [
        f"window.SONG_TIMESTAMPS = {json.dumps(timestamps, ensure_ascii=False)};",
        f"window.SONG_DURATIONS = {json.dumps(durations, ensure_ascii=False)};",
        f"window.SONGS_VAULT12 = {json.dumps(songs_vault, ensure_ascii=False)};",
        f"window.BRACHOT_VAULT8 = {json.dumps(brachot_vault, ensure_ascii=False)};",
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


def extract_vocal_mask(mp3_path):
    """Returns 50ms (20Hz) boolean mask of active vocal energy (220Hz-3200Hz) via FFmpeg."""
    p = subprocess.run(
        [FFMPEG_BIN, "-i", str(mp3_path), "-f", "s16le", "-ac", "1", "-ar", "8000", "-af", "highpass=f=220,lowpass=f=3200", "-", "-loglevel", "error"],
        capture_output=True,
    )
    raw = p.stdout
    if len(raw) < 400:
        return [], 0.2
    samples = struct.unpack(f"<{len(raw)//2}h", raw[: (len(raw) // 2) * 2])
    hop = 400  # 0.05s
    rms = [math.sqrt(sum(x * x for x in samples[i : i + hop]) / hop) for i in range(0, len(samples) - hop, hop)]
    if not rms:
        return [], 0.2
    s_rms = sorted(rms)
    thresh = max(180.0, s_rms[int(len(s_rms) * 0.20)] + (s_rms[int(len(s_rms) * 0.85)] - s_rms[int(len(s_rms) * 0.20)]) * 0.15)
    mask = [r >= thresh for r in rms]
    first_v = next((round(i * 0.05, 2) for i, m in enumerate(mask) if m), 0.2)
    return mask, first_v


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
    return ", ".join(islands[:18]) if islands else f"0.10s-{clip_dur-0.10:.2f}s"


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


def call_gemini_json(api_key, prompt, mp3_bytes):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_ID}:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inline_data": {"mime_type": "audio/mp3", "data": base64.b64encode(mp3_bytes).decode("ascii")}},
            ]
        }],
        "generationConfig": {"temperature": 0.0, "responseMimeType": "application/json"},
    }
    body = json.dumps(payload).encode("utf-8")
    for attempt in range(1, 4):
        try:
            req = urllib.request.Request(
                url, data=body,
                headers={"Content-Type": "application/json", "Referer": "https://giyuraliyahtrack.com/", "Origin": "https://giyuraliyahtrack.com"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
            raw_txt = resp_data["candidates"][0]["content"]["parts"][0]["text"].strip()
            raw_txt = re.sub(r"^```json\s*|\s*```$", "", raw_txt).strip()
            return json.loads(raw_txt)
        except Exception as e:
            print(f"      ⚠️ Gemini attempt {attempt} error: {e}")
            time.sleep(1.5 * attempt)
    return None


def norm_he_token(w):
    return re.sub(r"[\u0591-\u05C7.,:;!?'\-״׳()]", "", w).strip()


def partition_words_into_stanzas(words):
    n = len(words)
    if n <= 16:
        return [(0, n)]

    norm = [norm_he_token(w) for w in words]
    trigram_pos = {}
    for i in range(n - 2):
        tg = (norm[i], norm[i + 1], norm[i + 2])
        trigram_pos.setdefault(tg, []).append(i)

    refrain_spans = []
    used = [False] * n
    for tg, pos_list in sorted(trigram_pos.items(), key=lambda x: (-len(x[1]), x[1][0])):
        if len(pos_list) < 3 and not (len(pos_list) == 2 and pos_list[0] == 0):
            continue
        if any(used[p] for p in pos_list):
            continue
        lengths = []
        for idx_a in range(len(pos_list) - 1):
            p1, p2 = pos_list[idx_a], pos_list[idx_a + 1]
            ml = 0
            while p1 + ml < p2 and p2 + ml < n and norm[p1 + ml] == norm[p2 + ml] and ml < 15:
                ml += 1
            if ml >= 5:
                lengths.append(ml)
        if not lengths:
            continue
        ref_len = min(lengths)
        if 5 <= ref_len <= 14:
            for p in pos_list:
                if p + ref_len <= n and not any(used[p : p + ref_len]):
                    refrain_spans.append((p, p + ref_len))
                    for k in range(p, p + ref_len):
                        used[k] = True
            break

    refrain_spans.sort()

    def split_non_refrain_range(s_idx, e_idx):
        length = e_idx - s_idx
        if length <= 0:
            return []
        if length <= 17:
            return [(s_idx, e_idx)]
        num_chunks = math.ceil(length / 12.0)
        step = length / num_chunks
        out = []
        for c in range(num_chunks):
            cs = s_idx + round(c * step)
            ce = s_idx + round((c + 1) * step) if c < num_chunks - 1 else e_idx
            if ce > cs:
                out.append((cs, ce))
        return out

    stanzas = []
    cur = 0
    for r_start, r_end in refrain_spans:
        if r_start > cur:
            stanzas.extend(split_non_refrain_range(cur, r_start))
        stanzas.append((r_start, r_end))
        cur = r_end
    if cur < n:
        stanzas.extend(split_non_refrain_range(cur, n))

    return stanzas


def locate_stanzas_in_50s_windows(api_key, key, title, words, stanzas, mp3_path, real_dur, mask, first_v):
    is_ashkenaz = key.startswith("a_")
    n_stanzas = len(stanzas)
    stanza_boxes = [None] * n_stanzas

    win_start = max(0.0, first_v - 0.30)
    st_cursor = 0
    WIN_DUR = 50.0

    print(f"\n🔍 Stage 1: Locating {n_stanzas} Complete Stanzas in 50s FFmpeg Windows for {key} ({real_dur}s)...")

    ashkenaz_note = (
        "- Vocalist uses Ashkenazi/Carlebach pronunciation (Kamatz='o' as in 'L'cho Doydi likras kalo', Tav='s' as in 'Shabbos') and inserts wordless niggun syllables ('oy-oy', 'yai-dai-dai').\n"
        if is_ashkenaz
        else ""
    )

    safety = 0
    while st_cursor < n_stanzas and win_start < (real_dur - 1.0) and safety < 40:
        safety += 1
        win_start = next_vocal_sec(mask, win_start, real_dur - 1.5)
        clip_dur = min(WIN_DUR, real_dur - win_start)
        if clip_dur < 2.0:
            break

        cand_stanzas = stanzas[st_cursor : min(n_stanzas, st_cursor + 5)]
        st_lines = []
        for local_s, (w_lo, w_hi) in enumerate(cand_stanzas):
            st_txt = " ".join(words[w_lo:w_hi])
            st_lines.append(f'  Stanza [{local_s}] ({w_hi - w_lo} words, "{words[w_lo]} ... {words[w_hi-1]}"): {st_txt}')
        st_block = "\n".join(st_lines)
        vocal_islands = get_clip_vocal_islands(mask, win_start, clip_dur)

        prompt = f"""You are a precision Hebrew liturgical audio structure analyzer.
Listen to this {clip_dur:.2f}-second audio slice (0.00s to {clip_dur:.2f}s) from "{title}".
FFmpeg detected active vocal energy in this slice at: [{vocal_islands}]
{ashkenaz_note}
Below are the next sequential Stanzas of the prayer/song starting at Stanza [0]:
{st_block}

TASK:
Identify the exact decimal second (`start_sec` and `end_sec`, between 0.00 and {clip_dur:.2f}) when each Stanza [0], [1], ... is sung in this audio slice:
1. `start_sec`: exact second when the FIRST Hebrew word of that stanza begins being sung (ignore any preceding instrumental music or wordless "oy-oy / yai-dai" niggun intro).
2. `end_sec`: exact second when the LAST Hebrew word of that stanza finishes being sung (stop BEFORE any trailing instrumental interlude or wordless niggun!).
3. `complete`: set to `true` ONLY if the singer finishes singing the LAST Hebrew word of that stanza before the clip ends at {clip_dur:.2f}s. If a stanza is cut off by the end of the {clip_dur:.2f}s clip, set `complete: false`.
4. If the singer repeats a stanza that was ALREADY locked before Stanza [0], skip that repeat and start `Stanza [0]` when Stanza [0] is genuinely sung.
5. If this entire {clip_dur:.2f}s clip is purely instrumental or wordless niggun with Stanza [0] not starting yet, return `"stanzas": []` and `"skip_sec": 25.0`.

Return ONLY valid JSON:
{{
  "stanzas": [
    {{"s_idx": 0, "start_sec": 0.4, "end_sec": 18.2, "complete": true}}
  ],
  "skip_sec": 0.0
}}"""

        clip_bytes = slice_mp3_segment(mp3_path, win_start, clip_dur)
        res = call_gemini_json(api_key, prompt, clip_bytes)
        if not res:
            win_start += 15.0
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
            rel_e = max(rel_s + 1.2, min(clip_dur, float(item.get("end_sec", clip_dur))))
            is_comp = bool(item.get("complete", True))
            at_final_window = (win_start + clip_dur) >= (real_dur - 1.5)

            if (not is_comp or rel_e >= clip_dur - 0.8) and not at_final_window:
                if locked_in_win > 0:
                    next_win_override = max(win_start + 2.0, round(win_start + rel_s - 0.4, 2))
                    break
                elif rel_s >= 6.0:
                    next_win_override = round(win_start + rel_s - 0.4, 2)
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
            win_start = next_win_override if next_win_override is not None else round(last_locked_end - 0.15, 2)
        elif next_win_override is not None:
            win_start = next_win_override
        else:
            skip_s = max(10.0, min(clip_dur - 4.0, float(res.get("skip_sec") or 18.0)))
            print(f"  🎻 [{win_start:6.2f}s .. {win_start+skip_s:6.2f}s] Instrumental / Niggun Interlude skipped (+{skip_s:.1f}s)")
            win_start = round(win_start + skip_s, 2)

    for i in range(n_stanzas):
        if stanza_boxes[i] is None:
            prev_e = stanza_boxes[i - 1][1] if i > 0 and stanza_boxes[i - 1] else first_v
            rem_st = n_stanzas - i
            span = max(2.0, (real_dur - 0.5 - prev_e) / max(1, rem_st))
            stanza_boxes[i] = (round(prev_e + 0.1, 2), round(min(real_dur - 0.1, prev_e + span), 2))

    return stanza_boxes


def align_words_inside_stanza_box(api_key, key, title, st_words, st_start, st_end, mp3_path, mask):
    is_ashkenaz = key.startswith("a_")
    n = len(st_words)
    clip_dur = max(1.5, round(st_end - st_start, 2))
    clip_bytes = slice_mp3_segment(mp3_path, st_start, clip_dur)
    vocal_islands = get_clip_vocal_islands(mask, st_start, clip_dur)
    numbered = "  ".join(f"[{i}] {w}" for i, w in enumerate(st_words))

    ashkenaz_rule = (
        "- Vocalist sings in Ashkenazi/Carlebach style (Kamatz='o', Tav='s') and may insert emotional sighs or wordless niggun syllables ('oy-oy', 'yai-dai-dai') between words. Trigger each word ONLY on its real Hebrew consonant/vowel!\n"
        if is_ashkenaz
        else ""
    )

    prompt = f"""Listen to this {clip_dur:.2f}-second isolated vocal stanza clip (0.00s to {clip_dur:.2f}s) from "{title}".
FFmpeg active vocal bursts in this clip: [{vocal_islands}]
{ashkenaz_rule}
Exact {n} Hebrew words sung in this stanza (indexed 0 to {n - 1}):
{numbered}

TASK:
Return the exact decimal second `t` (between 0.00 and {clip_dur:.2f}) when each word `0` through `{n - 1}` begins being sung in this clip.
- Include ALL {n} words (`"i": 0` through `"i": {n - 1}`) in strictly non-decreasing order.
- Place each word onset inside the active vocal bursts above, never during breath pauses or wordless niggunim.
Return ONLY valid JSON:
{{"aligned": [{{"i": 0, "t": 0.15}}, ...]}}"""

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
            rel_stamps[i] = max(0.0, min(clip_dur - 0.10, by_idx[i]))

    for i in range(n):
        if rel_stamps[i] is None:
            prev_t = rel_stamps[i - 1] if i > 0 and rel_stamps[i - 1] is not None else 0.10
            next_known = next(((j, rel_stamps[j]) for j in range(i + 1, n) if rel_stamps[j] is not None), (n, clip_dur - 0.15))
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

    abs_stamps = [round(st_start + r, 2) for r in rel_stamps]
    for i in range(1, n):
        if abs_stamps[i] < abs_stamps[i - 1] + 0.14:
            abs_stamps[i] = round(min(st_end - 0.04, abs_stamps[i - 1] + 0.14), 2)
    return abs_stamps


def align_song_two_stage_stanza_boxed(api_key, key, title, words, mp3_path, real_dur):
    mask, first_v = extract_vocal_mask(mp3_path)
    stanzas = partition_words_into_stanzas(words)
    stanza_boxes = locate_stanzas_in_50s_windows(api_key, key, title, words, stanzas, mp3_path, real_dur, mask, first_v)

    print(f"🎯 Stage 2: Aligning Words Inside Each Isolated Stanza Clip for {key}...")
    full_stamps = []
    for st_idx, ((w_lo, w_hi), (st_s, st_e)) in enumerate(zip(stanzas, stanza_boxes)):
        st_words = words[w_lo:w_hi]
        st_stamps = align_words_inside_stanza_box(api_key, key, title, st_words, st_s, st_e, mp3_path, mask)
        full_stamps.extend(st_stamps)
        print(
            f"  ✅ Stanza {st_idx+1:2d}/{len(stanzas)} [{st_s:6.2f}s..{st_e:6.2f}s] Words {w_lo:3d}..{w_hi-1:3d} "
            f"({st_words[0]}..{st_words[-1]}) -> {st_stamps[0]:.2f}s .. {st_stamps[-1]:.2f}s"
        )

    for i in range(1, len(full_stamps)):
        if full_stamps[i] < full_stamps[i - 1] + 0.12:
            full_stamps[i] = round(min(real_dur - 0.05, full_stamps[i - 1] + 0.12), 2)

    return full_stamps


def rewrite_lyrics_from_audio(api_key, key, mp3_bytes):
    print(f"✍️ Transcribing exact sung Hebrew (ignoring niggun vocables) & building 1:1 5-lang transliterations for {key}...")
    prompt = """Listen to this entire Hebrew liturgical recording and transcribe EVERY real Hebrew liturgical word in the exact order sung.
CRITICAL: DO NOT include wordless Chassidic/cantorial niggun vocables ("oy", "ai-yai-yai", "lai-lai", "yai-dai", "ba-ba", "bim-bam"). Transcribe ONLY the actual Hebrew prayer/song words!
Then generate a strict 1:1 word-for-word transliteration in English (en), French (fr), Spanish (es), and German (de).
If the Hebrew transcript has N space-separated words, then en, fr, es, and de MUST each have EXACTLY N space-separated words.
Return ONLY valid JSON:
{"he": "...", "en": "...", "fr": "...", "es": "...", "de": "..."}"""
    res = call_gemini_json(api_key, prompt, mp3_bytes)
    he_words = res["he"].split()
    n_he = len(he_words)
    tr_dict = {}
    for lang in ["en", "fr", "es", "de"]:
        lw = (res.get(lang) or res["en"]).split()
        if len(lw) > n_he:
            lw = lw[:n_he]
        elif len(lw) < n_he:
            lw.extend(res["en"].split()[len(lw):n_he])
            while len(lw) < n_he:
                lw.append(he_words[len(lw)])
        tr_dict[lang] = " ".join(lw)
    tr_dict["he"] = tr_dict["en"]
    return " ".join(he_words), tr_dict


def main():
    parser = argparse.ArgumentParser(description="2-Stage Stanza-Boxed Karaoke Forced Aligner")
    parser.add_argument("tracks", nargs="*", help="Track keys to patch, e.g. a_1 s_1")
    parser.add_argument("--all-remaining", action="store_true", help="Align all tracks except s_1, a_1, s_3, a_3")
    parser.add_argument("--all", action="store_true", help="Align all 26 tracks (s_1..s_13 and a_1..a_13)")
    parser.add_argument("--rewrite-lyrics", action="store_true", help="Transcribe MP3 lyrics (ignoring niggunim) & rebuild 1:1 5-lang transliterations")
    args = parser.parse_args()

    api_key = find_api_key()
    timestamps, durations, songs_vault, brachot_vault = parse_vault_js(VAULT_PATH)
    by_id = {str(s["id"]): s for s in songs_vault}

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

    if not target_tracks:
        parser.print_help()
        return

    md5_mem = {}
    for key in target_tracks:
        nusach, sid = key.strip().split("_")
        if sid not in by_id:
            print(f"❌ Unknown song ID: {key}")
            continue
        s = by_id[sid]
        local_fp, mp3_bytes, real_dur = get_mp3_and_duration(key)
        durations.setdefault(nusach, {})[sid] = real_dur

        if args.rewrite_lyrics:
            new_he, new_tr = rewrite_lyrics_from_audio(api_key, key, mp3_bytes)
            s[f"he_{nusach}"] = new_he
            s[f"tr_{nusach}"] = new_tr

        he_txt = (s.get(f"he_{nusach}") or s.get("he_s") or "").strip()
        words = [w for w in he_txt.split() if w]

        sig = f"{hashlib.md5(mp3_bytes).hexdigest()[:12]}:{len(words)}"
        if sig in md5_mem and not args.rewrite_lyrics:
            timestamps[key] = list(md5_mem[sig])
            save_vault_js(timestamps, durations, songs_vault, brachot_vault)
            print(f"🔗 Reused identical MP3 alignment for {key} ({len(words)} words)!\n")
            continue

        aligned = align_song_two_stage_stanza_boxed(api_key, key, s["t"], words, local_fp, real_dur)
        timestamps[key] = aligned
        md5_mem[sig] = aligned
        save_vault_js(timestamps, durations, songs_vault, brachot_vault)
        print(f"✅ Saved {key} ({len(aligned)} words, {aligned[0]}s..{aligned[-1]}s) to {VAULT_PATH}!\n")

    print("🎉 ALL REQUESTED TRACKS ALIGNED & SAVED!")


if __name__ == "__main__":
    main()
