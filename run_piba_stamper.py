#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

def find_file(filename, search_roots):
    for root in search_roots:
        if not root.exists():
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            # skip heavy/irrelevant folders for speed
            dirnames[:] = [d for d in dirnames if d not in ('node_modules', '.git', 'Library', '.Trash', '__pycache__')]
            if filename in filenames:
                return Path(dirpath) / filename
    return None

search_Order = [Path.cwd(), Path.home() / "Desktop", Path.home() / "Documents", Path.home()]

print("🔍 Locating project files...")
stamper_path = find_file("piba_pdf_stamper.js", search_Order)
pdflib_path = find_file("pdf-lib.min.js", search_Order)
fontkit_path = find_file("fontkit.umd.min.js", search_Order)
sample_pdf = find_file("ash3_extension_change_visa.pdf", search_Order)

if not stamper_path or not pdflib_path or not sample_pdf:
    print(f"❌ Could not auto-locate files:\n  stamper: {stamper_path}\n  pdf-lib: {pdflib_path}\n  gov-pdfs: {sample_pdf}")
    raise SystemExit(1)

PROJECT_ROOT = stamper_path.parent.parent.parent
VENDOR_DIR = pdflib_path.parent
PDF_DIR = sample_pdf.parent
OUT_DIR = PROJECT_ROOT / "_stamped_proofs_out"
OUT_DIR.mkdir(exist_ok=True)

print(f"✅ Found Stamper:  {stamper_path}")
print(f"✅ Found Vendor:   {VENDOR_DIR}")
print(f"✅ Found Gov PDFs: {PDF_DIR}")

NODE_SCRIPT = f"""
const fs = require('fs');
const path = require('path');

const vendorDir = {repr(str(VENDOR_DIR))};
const pdfDir = {repr(str(PDF_DIR))};
const outDir = {repr(str(OUT_DIR))};
const stamperPath = {repr(str(stamper_path))};

const PDFLib = require(path.join(vendorDir, 'pdf-lib.min.js'));
const fontkit = require(path.join(vendorDir, 'fontkit.umd.min.js'));
const stamper = require(stamperPath);

const fileMap = {{
  ash3: 'ash3_extension_change_visa.pdf',
  ash456: 'ash456_in_israel_oleh.pdf',
  mr14a: 'mr14a_registry.pdf',
  nespach_alef: 'nespach_alef_affidavit.pdf',
  ash1: 'ash1_entry_visa.pdf',
  ash6: 'ash6_spousal_status.pdf',
  mr14b: 'mr14b_registry_notice.pdf',
  security_cv: 'security_cv_form.pdf'
}};

(async () => {{
  let state = stamper.DEMO_PERSONA;
  const customJson = process.env.PIBA_STATE_JSON;
  if (customJson && fs.existsSync(customJson)) {{
    state = Object.assign({{}}, state, JSON.parse(fs.readFileSync(customJson, 'utf8')));
    console.log('Loaded custom state payload:', customJson);
  }} else {{
    console.log('Stamping with DEMO_PERSONA:', state.pf_given_he, state.pf_surname_he);
  }}

  const loaderOpts = {{
    PDFLib,
    fontkit,
    loadPdfBytes: async (fname) => new Uint8Array(fs.readFileSync(path.join(pdfDir, fname))),
    loadFontBytes: async (fname) => new Uint8Array(fs.readFileSync(path.join(vendorDir, fname)))
  }};

  for (const [formKey, pdfFile] of Object.entries(fileMap)) {{
    const fullPdfPath = path.join(pdfDir, pdfFile);
    if (!fs.existsSync(fullPdfPath)) {{
      console.warn('⚠️  Skipping ' + formKey + ' (missing ' + pdfFile + ')');
      continue;
    }}
    const stampedBytes = await stamper.generateStampedPdfBytes(formKey, state, loaderOpts);
    const outPath = path.join(outDir, 'STAMPED_' + formKey + '_' + pdfFile);
    fs.writeFileSync(outPath, Buffer.from(stampedBytes));
    console.log('✅ Stamped -> ' + outPath);
  }}
}})().catch(err => {{
  console.error('❌ Stamper error:', err);
  process.exit(1);
}});
"""

print("🚀 Stamping all PIBA forms...")
res = subprocess.run(["node", "-e", NODE_SCRIPT])
if res.returncode == 0:
    print(f"\n🎯 Done! Opening {OUT_DIR}")
    subprocess.run(["open", str(OUT_DIR)], check=False)
