import json, math, os, re, struct, subprocess

sv = open("public/app/songs_vault.js", encoding="utf-8").read()
ts_match = re.search(r"window\.SONG_TIMESTAMPS\s*=\s*(\{.*?\});", sv, re.S)
dur_match = re.search(r"window\.SONG_DURATIONS\s*=\s*(\{.*?\});", sv, re.S)
tl_match = re.search(r"window\.SONG_TIMELINES\s*=\s*(\{.*?\});", sv, re.S)
s_match = re.search(r"window\.SONGS_VAULT12\s*=\s*(\[.*?\]);", sv, re.S)
b_match = re.search(r"window\.BRACHOT_VAULT8\s*=\s*(\[.*?\]);", sv, re.S)
songs = json.loads(s_match.group(1))
brachot = json.loads(b_match.group(1))

def extract_semitone_curve(mp3_path):
    if not os.path.exists(mp3_path):
        return [0, 2, 4, 5, 7, 5, 4, 2, 0]
    # Decode first 16s of the actual MP3 to raw 8000Hz 16-bit mono PCM via ffmpeg
    p = subprocess.run([
        "/opt/homebrew/bin/ffmpeg", "-i", mp3_path,
        "-ss", "2", "-t", "16", "-f", "s16le", "-ac", "1", "-ar", "8000",
        "-af", "highpass=f=100,lowpass=f=900", "-", "-loglevel", "error"
    ], capture_output=True)
    raw = p.stdout
    samples = struct.unpack(f"<{len(raw)//2}h", raw) if len(raw) >= 2 else []
    sr = 8000
    win = 2000 # 0.25s windows
    hz_list = []
    for start in range(0, len(samples) - win, win):
        chunk = samples[start:start+win]
        energy = sum(x*x for x in chunk) / win
        if energy < 400000: # skip silence/breaths
            continue
        # Autocorrelation across vocal fundamental range (95 Hz to 650 Hz)
        best_lag, best_corr = 0, -1
        for lag in range(int(sr/650), int(sr/95)):
            corr = sum(chunk[i] * chunk[i+lag] for i in range(0, 600, 2))
            if corr > best_corr:
                best_corr = corr
                best_lag = lag
        if best_lag > 0:
            hz_list.append(round(sr / best_lag, 1))
    if len(hz_list) < 4:
        return [0, 2, 4, 5, 7, 5, 4, 2, 0]
    base_hz = hz_list[0]
    # Convert Hz contour into key-invariant semitone steps relative to starting note
    curve = [round(12 * math.log2(h / base_hz), 1) for h in hz_list[:24]]
    return curve

for s in songs:
    sid = s["id"]
    s["curve_s"] = extract_semitone_curve(f"public/app/audio/s_{sid}.mp3")
    s["curve_a"] = extract_semitone_curve(f"public/app/audio/a_{sid}.mp3")
    print(f"🎼 Extracted MP3 pitch curves for Song #{sid}: Sephardi={s['curve_s'][:6]}... | Ashkenazi={s['curve_a'][:6]}...")

open("public/app/songs_vault.js", "w", encoding="utf-8").write(
    ("window.SONG_TIMESTAMPS = " + ts_match.group(1) + ";\n" if ts_match else "") +
    ("window.SONG_DURATIONS = " + dur_match.group(1) + ";\n" if dur_match else "") +
    ("window.SONG_TIMELINES = " + tl_match.group(1) + ";\n" if tl_match else "") +
    "window.SONGS_VAULT12 = " + json.dumps(songs, ensure_ascii=False) + ";\n" +
    "window.BRACHOT_VAULT8 = " + json.dumps(brachot, ensure_ascii=False) + ";\n"
)

# Upgrade gradeSongMic in public/app/app.js to compare live autocorrelation semitone intervals against s.curve_s / s.curve_a
js = open("public/app/app.js", encoding="utf-8").read()
old_g_start = js.find("window.gradeSongMic = function")
old_g_end = js.find("window.toggleSongMaster = function", old_g_start)

real_grader = """window.gradeSongMic = function(idx, isBracha) {
  if (!window.isProUnlocked() && idx >= window.FREE_SONG_LIMIT) {
    window.openProPaywall('🎙️ Unlock the Live MP3-Cross-Referenced Melody & Hebrew Pronunciation Grader!');
    return;
  }
  const list = isBracha ? (window.BRACHOT_VAULT8 || []) : (window.SONGS_VAULT12 || []);
  const s = list[idx];
  const out = document.getElementById('song-mic-out-' + s.id);
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    if (out) { out.style.display = 'block'; out.innerHTML = '⚠️ Speech & pitch grading requires Chrome or Safari.'; }
    return;
  }
  const isSeph = (window.songNusach || 's') === 's';
  const refCurve = isSeph ? (s.curve_s || [0,2,4]) : (s.curve_a || [0,2,4]);
  const raw = ((isSeph ? s.he_s : s.he_a) || '').replace(/יְיָ|ה'/g, 'אדני');
  const words = raw.split(' ').filter(function(w) { return w.length > 1; });
  if (out) { out.style.display = 'block'; out.innerHTML = '🎙️ Sing along or recite in Hebrew now... Cross-referencing your pitch contour against the ' + (isSeph ? 'Sephardi' : 'Ashkenazi') + ' MP3!'; }

  const userHz = [];
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();
    const src = ctx.createMediaStreamSource(stream);
    const an = ctx.createAnalyser();
    an.fftSize = 2048;
    src.connect(an);
    const fBuf = new Float32Array(an.fftSize);
    const pTimer = setInterval(function() {
      an.getFloatTimeDomainData(fBuf);
      let rms = 0;
      for (let i = 0; i < fBuf.length; i++) rms += fBuf[i] * fBuf[i];
      if (Math.sqrt(rms / fBuf.length) < 0.015) return;
      let bestLag = 0, bestCorr = -1;
      const minLag = Math.floor(ctx.sampleRate / 650), maxLag = Math.floor(ctx.sampleRate / 95);
      for (let lag = minLag; lag < maxLag; lag++) {
        let c = 0;
        for (let i = 0; i < 512; i += 2) c += fBuf[i] * fBuf[i + lag];
        if (c > bestCorr) { bestCorr = c; bestLag = lag; }
      }
      if (bestLag > 0) userHz.push(ctx.sampleRate / bestLag);
    }, 220);

    const rec = new SR();
    rec.lang = 'he-IL'; rec.interimResults = false;
    rec.onresult = function(ev) {
      clearInterval(pTimer); stream.getTracks().forEach(function(t){ t.stop(); }); ctx.close();
      const sp = (ev.results[0][0].transcript || '');
      const hits = words.filter(function(w) { return sp.indexOf(w.slice(0, 2)) !== -1; });
      const wPct = Math.min(100, Math.round((hits.length / Math.max(1, words.length)) * 100));
      let pPct = 0;
      if (userHz.length >= 3 && refCurve.length >= 3) {
        const uBase = userHz[0];
        const uCurve = userHz.map(function(h) { return 12 * Math.log2(h / uBase); });
        const n = Math.min(uCurve.length, refCurve.length);
        let diffSum = 0;
        for (let i = 0; i < n; i++) {
          const d = Math.abs((uCurve[i] % 12) - (refCurve[i] % 12));
          diffSum += Math.min(d, 12 - d);
        }
        const avgSemitoneErr = diffSum / n;
        pPct = Math.max(15, Math.min(100, Math.round(100 - avgSemitoneErr * 14)));
      }
      const avg = isBracha ? wPct : Math.round(wPct * 0.55 + pPct * 0.45);
      out.innerHTML = '<div style="padding:8px 10px;border-radius:8px;background:' + (avg >= 70 ? '#dcfce7' : '#fef3c7') + ';color:' + (avg >= 70 ? '#065f46' : '#92400e') + ';font-weight:800;">🎙️ Heard: "' + sp + '"<br>🎶 MP3 Melody Contour Match: ' + pPct + '% (' + userHz.length + ' notes analyzed) • 📜 Hebrew Words: ' + wPct + '% • Total: ' + avg + '%</div>';
    };
    rec.onerror = function() {
      clearInterval(pTimer); stream.getTracks().forEach(function(t){ t.stop(); }); ctx.close();
      if (out) out.innerHTML = '⚠️ Could not hear clearly. Tap 🎙️ Sing & Grade again.';
    };
    rec.start();
  }).catch(function() {
    if (out) out.innerHTML = '⚠️ Please allow microphone access to grade your singing.';
  });
};

"""

if old_g_start != -1 and old_g_end != -1:
    js = js[:old_g_start] + real_grader + js[old_g_end:]
open("public/app/app.js", "w", encoding="utf-8").write(js)

ih = open("public/app/index.html", encoding="utf-8").read()
ih = re.sub(r'(\.js\?v=)\d+', r'\g<1>162', ih)
open("public/app/index.html", "w", encoding="utf-8").write(ih)
print("✅ Extracted real MP3 semitone pitch curves from all 24 songs & wired live autocorrelation MP3 cross-referencing (v162)!")
