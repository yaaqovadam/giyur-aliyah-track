#!/usr/bin/env python3
"""
Giyur Aliyah Track — 23-SKU Signed Lemon Squeezy Checkout Generator & Auto-Wirer
Generates all 23 cryptographically signed checkout URLs on Store #524305 (Variant #2377975)
with exact prices, titles, descriptions, and custom tier metadata, and writes them to public/app/app.js.
"""
import os, sys, re, json, time, subprocess, urllib.request, urllib.error

API_KEY = os.environ.get("LEMON_API_KEY", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiI5ZjVhNzVhMmRiNTJjZjUzNjMyMjY4ODI1OTczNTk0YzU1YTdlZDE5NDZjMWQwYjg1ZTJiZTljZGM0MmFkNDgyZDE5NTg0MjgyMzQ2MTI3YiIsImlhdCI6MTc5NDczNzM2MC4yMDEzNjMsIm5iZiI6MTc5NDczNzM2MC4yMDEzNjYsImV4cCI6MTgxMDMzOTIwMC4wMjU5ODYsInN1YiI6IjgzNzc2MzgiLCJzY29wZXMiOltdfQ.cbei6sBZ1pUm8Lx2CHsUx_1boBO_cHjtzLfDmH4rcWeovGMjogA3GcWphkjKr4-KDdhiw0Y3iQeoKYkxJJ5ms30CtJkhADG0Pj-LB63N3CDdtl4N6xbv0j-UnEWIGHO_F8bMDWH9mxB2qfcq1Dg12Qmi2N4gox6KTnldTTibSUdLVdx0f-tmBNMiE9JwDTYCszTcchSFNz2XhNAQdox1yadfhXKO5xfpNJQTTTvF3vbIyBZLADOmf_cNj9VXkHsv5SsccpPE-8XdIaDPYr5fgP4eXGWvYvLcAEaMeAxv5WeyfLaFP9kf2g8CEuGb3lWL_cpaBim9QWSkLUBO6aqR2sWTxVtzxxlHjAL0Mfq-XPs735c-5fdept-sTSD4PxrwqV1Z9tTv0EM4stIV1fQN-Gu03itd2SSS3LEEBvHw_XlfoTjWBQoOAyheOghucfZ_G6I5pEsn3LR0T8OH6b3JpdnKGinsFvnzASi3_4BXRre2Awr96ZffA4XEypWK8jHLxfyDsduN0gaq41TBpX5HBh7MVLxfFPjuMDs71KzrZgpTADWzK4zz_U0k2x8hCM--EIFgft5gdL64-o0N9Mmdp8KfoFabyJNBjs38fA1F03BSZiq6AbYCw3jeeDigiC2KCL6iWmRjCsvMeoVx8L0JQ-9LKhPP2XrLY2ibmGu06DI").strip()
STORE_ID = os.environ.get("LEMON_STORE_ID", "524305").strip()
VARIANT_ID = os.environ.get("LEMON_VARIANT_ID", "2377975").strip()

SKUS = [
  ("forms_90d_89",        "Statutory Hebrew Forms & Clerk Engine — 90-Day Pass", "90-Day Unlimited Edits & Prints for all 8 official PIBA Hebrew dossiers (Ash/1, Ash/3, Ash/6, Ash/456, MR/14a, MR/14b, Nespach Alef, Security CV) + Clerk Deficiency Sheet Decoder. Instant digital access; all sales final.", 8900),
  ("forms_life_149",      "Statutory Hebrew Forms & Clerk Engine — Lifetime Pass", "Lifetime All-Filings & 5-Year Annual Renewals Pass for all 8 official PIBA Hebrew dossiers + formal Hebrew Michtav Hesber generator + Clerk Sheet Decoder. Instant digital access; all sales final.", 14900),
  ("bd_suite_90d_149",    "Beit Din 700-Q & 56 Songs Suite — 90-Day Cram Pass", "90-Day access to all 700 curated Beit Din tribunal questions across 6 languages + all 56 Shabbat Songs, Morning Prayers & Brachot with Live AI Pronunciation Grader. Instant digital access; all sales final.", 14900),
  ("bd_suite_life_249",   "Beit Din 700-Q & 56 Songs Suite — Lifetime Mastery Pass", "Lifetime access until Mikvah & Ishur Giyur: all 700 Beit Din tribunal questions + all 56 Shabbat Songs, Shacharit Prayers & Brachot (Sephardi & Ashkenazi) + AI Grader. Instant digital access; all sales final.", 24900),
  ("bd_pack1_65",         "Beit Din Tribunal — Core 200 Deck", "Lifetime access to the Core 200 Beit Din Tribunal flashcard deck across 6 languages. Instant digital access; all sales final.", 6500),
  ("bd_pack2_65",         "Beit Din Tribunal — +200 Curveballs Deck", "Lifetime access to the +200 Dayanim Curveballs & Halachic Traps deck across 6 languages. Instant digital access; all sales final.", 6500),
  ("bd_pack3_49",         "Beit Din Tribunal — Men's 150 Deck", "Lifetime access to the Men's 150 Beit Din Honours, Synagogue & Halacha deck across 6 languages. Instant digital access; all sales final.", 4900),
  ("bd_pack4_49",         "Beit Din Tribunal — Women's 150 Deck", "Lifetime access to the Women's 150 Taharat HaMishpacha, Mikvah & Shabbat Home deck across 6 languages. Instant digital access; all sales final.", 4900),
  ("bd_all700_179",       "Beit Din Tribunal — All 700 Questions Complete Deck", "Lifetime access to all 700 Beit Din Tribunal flashcards (Core 200 + 200 Curveballs + Men's 150 + Women's 150) across 6 languages. Instant digital access; all sales final.", 17900),
  ("songs_65",            "56 Shabbat Songs, Prayers & Brachot + Live AI Grader", "Lifetime access to all 56 Shabbat Zemirot, Shacharit Morning Prayers & Essential Brachot (Sephardi & Ashkenazi audio) with 1:1 karaoke sync and AI pronunciation grading. Instant digital access; all sales final.", 6500),
  ("couples_sync_75",     "Spousal Visa 300-Q 2-Phone Couples Sync Pass", "90-Day access to the 300-question separated-room Misrad HaPanim interrogation vault across 2 phones with live contradiction detection. Instant digital access; all sales final.", 7500),
  ("couples_90d_129",     "Spousal Visa 300-Q + AI Packet Audit — 90-Day Pass", "1 Annual Interview Pass (90-Day, 2 Phones): 300-question separated-room interrogation vault + 80-question live clerk exam mode + automated AI Apostille & packet inspector. Instant digital access; all sales final.", 12900),
  ("couples_life_229",    "Spousal Visa 300-Q + AI Packet Audit — 5-Year Lifetime Pass", "Lifetime 5-Year Graduated Residency Pass (B/1 to A/5 to Citizenship): unlimited annual interview prep on 2 phones + AI document & Apostille pre-flight inspector. Instant digital access; all sales final.", 22900),
  ("suite_solo_90d_249",  "Full Dual-Track Solo Suite — 90-Day Sprint Pass", "90-Day access to all 3 digital engines (8 PIBA Hebrew Forms + 700 Beit Din Questions + 56 Songs/Prayers + 300 Couples Questions + AI Packet Inspector). Instant digital access; all sales final.", 24900),
  ("suite_solo_life_399", "Full Dual-Track Solo Suite — Complete Lifetime Shield", "Lifetime access to all 3 digital engines (8 PIBA Hebrew Forms + 700 Beit Din Questions + 56 Songs/Prayers + 300 Couples Questions + AI Packet Inspector). Instant digital access; all sales final.", 39900),
  ("vip_couple_649",      "VIP Couple 2-Phone Lifetime Suite + AI Pre-Flight Packet Audit", "Complete 2-Phone Lifetime Suite unlocking all 8 PIBA Hebrew Forms, 700 Beit Din Cards, 56 Liturgical Audio Tracks, 300 Couples Sync Vault, and automated AI Pre-Flight Dossier & Apostille Audit. Instant digital access; all sales final.", 64900),
  ("concierge_notary_249","Red-Ribbon Notarial Translation — 1-Page Standard Certificate", "Statutory Israeli Ministry of Justice notarial Hebrew translation + red-ribbon certification for 1 standard single-page civil certificate (Birth, Marriage, Criminal Record, or Single Status).", 24900),
  ("concierge_notary_349","Red-Ribbon Notarial Translation — Multi-Page Decree / Judgment", "Statutory Israeli Ministry of Justice notarial Hebrew translation + red-ribbon certification for a multi-page divorce decree, court judgment, or adoption file.", 34900),
  ("concierge_bundle_799","Red-Ribbon Notarial Translation — 4-Document Homeland Bundle", "Complete 4-document statutory Israeli Ministry of Justice notarial Hebrew translation bundle (Birth + FBI/Police Check + Marital Status + Marriage/Divorce).", 79900),
  ("concierge_kallah_249","Vetted Madrichat Kallah Placement & Rabbanut Track Setup", "Priority placement with a Rabbanut-vetted Madrichat Kallah in your language and region, curriculum pacing, and official bridal attestation setup.", 24900),
  ("concierge_rabbi_349", "Vetted Sponsoring Rabbi (Rav Melaveh) Placement & Dossier Setup", "Guaranteed Beit Din-recognized Orthodox Sponsoring Rabbi match, initial intake & study-plan interview, and stamped Hebrew recommendation letter setup.", 34900),
  ("concierge_couple_499","Couple Placement Package: Sponsoring Rabbi + Madrichat Kallah", "Complete couple's placement matching both a Beit Din-recognized Sponsoring Rabbi (Rav Melaveh) and a Rabbanut-certified Madrichat Kallah, including initial intake and Hebrew dossier templates.", 49900),
  ("concierge_escort_649","1-Hour Day-Of Appointment Israeli Immigration Lawyer Escort (PIBA)", "A licensed Israeli immigration lawyer walks into your Misrad HaPanim (PIBA) branch appointment with you for 1 hour to ensure clerks respect the Nohal and open your file on the spot.", 64900),
]

headers = {
    "Accept": "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "Authorization": f"Bearer {API_KEY}"
}

def create_signed_checkout(sku, title, desc, cents):
    payload = {
        "data": {
            "type": "checkouts",
            "attributes": {
                "custom_price": cents,
                "product_options": {
                    "name": title,
                    "description": desc,
                    "redirect_url": f"https://giyuraliyahtrack.com/app/?payment=success&tier={sku}",
                    "receipt_button_text": "Open Unlocked Dossier",
                    "receipt_link_url": f"https://giyuraliyahtrack.com/app/?payment=success&tier={sku}"
                },
                "checkout_data": {
                    "custom": {
                        "tier": sku
                    }
                }
            },
            "relationships": {
                "store": {"data": {"type": "stores", "id": STORE_ID}},
                "variant": {"data": {"type": "variants", "id": VARIANT_ID}}
            }
        }
    }
    req = urllib.request.Request(
        "https://api.lemonsqueezy.com/v1/checkouts",
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        return body["data"]["attributes"]["url"]

url_map = {}
print(f"🚀 Generating 23 cryptographically signed Lemon Squeezy Checkout URLs on Store #{STORE_ID}...")
for sku, title, desc, cents in SKUS:
    url = create_signed_checkout(sku, title, desc, cents)
    url_map[sku] = url
    print(f"  ✅ {sku:22s} (${cents//100:<3d}) -> {url[:72]}...")
    time.sleep(0.15)

with open("public/app/app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

lines = ["window.LEMON_CHECKOUT_URLS = {"]
for i, (sku, _, _, _) in enumerate(SKUS):
    comma = "," if i < len(SKUS) - 1 else ""
    lines.append(f'  {sku}: "{url_map[sku]}"{comma}')
lines.append("};")
new_block = "\n".join(lines)

if re.search(r"window\.LEMON_CHECKOUT_URLS\s*=\s*\{[\s\S]*?\};", app_js):
    app_js = re.sub(r"window\.LEMON_CHECKOUT_URLS\s*=\s*\{[\s\S]*?\};", new_block, app_js, count=1)
    with open("public/app/app.js", "w", encoding="utf-8") as f:
        f.write(app_js)
    print("\n✅ Updated window.LEMON_CHECKOUT_URLS in public/app/app.js with all 23 signed checkout URLs!")
else:
    print("❌ Could not find window.LEMON_CHECKOUT_URLS block in public/app/app.js")
    sys.exit(1)

subprocess.run(["node", "--check", "public/app/app.js"], check=True)
print("✅ node --check public/app/app.js passed!")
