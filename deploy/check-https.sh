#!/usr/bin/env bash
set -euo pipefail

response=$(mktemp)
trap 'rm -f "$response"' EXIT
while IFS= read -r -d '' route; do
  file="dist/$route"
  route=${route%index.html}
  url="https://cv.reflexionia.com/$route"
  # Keep release verification independent of the cached public HTML URLs.
  if [[ "$file" == *.html && -n "${GITHUB_SHA:-}" ]]; then
    url+="?release=$GITHUB_SHA"
  fi
  status=$(curl --silent --show-error --fail --max-time 15 --retry 3 \
    --compressed --output "$response" --write-out '%{http_code}' \
    "$url")
  [[ "$status" == 200 ]]
  cmp "$file" "$response"
  printf 'Verified /%s\n' "$route"
done < <(cd dist && find * -type f -print0)
