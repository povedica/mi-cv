#!/usr/bin/env bash
set -euo pipefail

: "${INDEXNOW_KEY:?}"
[[ "$INDEXNOW_KEY" =~ ^[a-f0-9]{32}$ ]]
[[ "$(cat "dist/$INDEXNOW_KEY.txt")" == "$INDEXNOW_KEY" ]]

python3 - <<'PY' | curl --silent --show-error --fail --max-time 15 \
  --output /dev/null --write-out 'IndexNow response: %{http_code}\n' \
  -H 'Content-Type: application/json; charset=utf-8' --data-binary @- \
  'https://api.indexnow.org/indexnow'
import json
import os
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

host = "cv.reflexionia.com"
urls = [node.text for node in ET.parse("dist/sitemap.xml").iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
if not urls or any(urlsplit(url).scheme != "https" or urlsplit(url).netloc != host for url in urls):
    raise ValueError("Expected HTTPS sitemap URLs on the CV host")
print(json.dumps({"host": host, "key": os.environ["INDEXNOW_KEY"], "urlList": urls}))
PY
