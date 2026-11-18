#!/usr/bin/env bash
set -euo pipefail

response=$(mktemp)
trap 'rm -f "$response"' EXIT
for file in dist/index.html dist/interview/index.html dist/_astro/*; do
  route=${file#dist/}
  route=${route%index.html}
  status=$(curl --silent --show-error --fail --max-time 15 --retry 3 \
    --compressed --output "$response" --write-out '%{http_code}' \
    "https://cv.reflexionia.com/$route")
  [[ "$status" == 200 ]]
  cmp "$file" "$response"
  printf 'Verified /%s\n' "$route"
done
