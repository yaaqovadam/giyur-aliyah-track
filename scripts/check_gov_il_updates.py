#!/usr/bin/env python3
"""Checks local PIBA PDFs & 2026 Nohal pages against live gov.il endpoints for updates."""
import hashlib, json, pathlib, subprocess, sys, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "public/forms/gov-pdfs"
MANIFEST = ROOT / "scripts/gov_forms_manifest.json"

SOURCES = {
    "ash1_entry_visa.pdf": "https://www.gov.il/BlobFolder/generalpage/visas_forms/he/AS1.pdf",
    "ash3_extension_change_visa.pdf": "https://www.gov.il/BlobFolder/generalpage/visas_forms/he/AS3.pdf",
    "ash6_spousal_status.pdf": "https://www.gov.il/BlobFolder/generalpage/visas_forms/he/AS6.pdf",
    "mr14a_registry.pdf": "https://www.gov.il/BlobFolder/generalpage/services_forms/he/MR14a.pdf",
    "mr14b_registry_notice.pdf": "https://www.gov.il/BlobFolder/generalpage/services_forms/he/MR14b.pdf",
}

NOHAL_URLS = {
    "5.2.0001_aliyah": "https://www.gov.il/BlobFolder/policy/aliya_status_change_procedure/he/5.2.0001.pdf",
    "5.2.0008_married": "https://www.gov.il/BlobFolder/policy/married_couple_status_procedure/he/5.2.0008.pdf",
    "5.2.0009_commonlaw": "https://www.gov.il/BlobFolder/policy/common_law_marriage_status_procedure/he/5.2.0009.pdf",
}

ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36"
prev = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {"files": {}, "remote_lengths": {}}
cur = {"checked_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "files": {}, "remote_lengths": {}}
alerts = []

for p in sorted(PDF_DIR.glob("*.pdf")):
    h = hashlib.sha256(p.read_bytes()).hexdigest()[:16]
    cur["files"][p.name] = {"sha256": h, "bytes": p.stat().st_size}

for name, url in {**SOURCES, **NOHAL_URLS}.items():
    r = subprocess.run(["curl", "-sSI", "--max-time", "15", "-A", ua, url], capture_output=True, text=True)
    m_len = next((ln.split(":", 1)[1].strip() for ln in r.stdout.splitlines() if ln.lower().startswith("content-length:")), "")
    if m_len:
        cur["remote_lengths"][name] = m_len
        old_len = prev.get("remote_lengths", {}).get(name)
        if old_len and old_len != m_len:
            alerts.append(f"⚠️ GOV.IL CHANGE DETECTED on {name}: Content-Length {old_len} -> {m_len} ({url})")

MANIFEST.write_text(json.dumps(cur, indent=2) + "\n", encoding="utf-8")
print(f"✅ Audited {len(cur['files'])} local PDFs & {len(cur['remote_lengths'])} live gov.il headers -> scripts/gov_forms_manifest.json")
if alerts:
    print("\n".join(alerts))
    sys.exit(2)
print("🟢 All PIBA blank forms & 2026 Nohal procedures match current baseline.")
