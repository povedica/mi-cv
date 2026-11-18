#!/usr/bin/env bash
set -euo pipefail

script="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../scripts" && pwd -P)/worktree.sh"
fixture="$(mktemp -d)"
fixture="$(cd -- "$fixture" && pwd -P)"
trap 'rm -rf -- "$fixture"' EXIT
repo="$fixture/mi-cv"

git init -q -b main "$repo"
mkdir -p "$repo/scripts"
cp "$script" "$repo/scripts/"
printf '.env\n' > "$repo/.gitignore"
git -C "$repo" add -- .gitignore scripts
git -C "$repo" -c user.name=Test -c user.email=test@example.invalid commit -qm 'Initial fixture'
printf 'PROJECT_TOKEN=synthetic-fixture\n' > "$repo/.env"

first="$("$repo/scripts/worktree.sh" feature/chat)"
second="$("$first/scripts/worktree.sh" feature-chat)"
[[ "$first" == "$fixture/mi-cv-worktrees/"* ]]
[[ "$second" == "$fixture/mi-cv-worktrees/"* ]]
test "$first" != "$second"
test "$(git -C "$first" branch --show-current)" = feature/chat
test "$(git -C "$second" branch --show-current)" = feature-chat
test "$(git -C "$first" rev-parse HEAD)" = "$(git -C "$repo" rev-parse main)"
test "$(git -C "$repo" branch --show-current)" = main

for path in "$first" "$second"; do
  git -C "$path" check-ignore -q -- .env
  grep -qx 'MI_CV_HOST_PORT=0' "$path/.env"
  test "$(wc -l < "$path/.env" | tr -d ' ')" = 2
  test -z "$(git -C "$path" status --porcelain)"
done
test "$(sed -n '1p' "$first/.env")" != "$(sed -n '1p' "$second/.env")"
grep -qx 'PROJECT_TOKEN=synthetic-fixture' "$repo/.env"

git -C "$repo" branch existing main
existing="$("$repo/scripts/worktree.sh" existing)"
test "$(git -C "$existing" branch --show-current)" = existing

if "$repo/scripts/worktree.sh" feature/chat ||
   "$repo/scripts/worktree.sh" ../invalid ||
   "$repo/scripts/worktree.sh" missing-base no-such-ref; then
  printf 'El script aceptó una entrada inválida.\n' >&2
  exit 1
fi

printf 'Worktrees verificados.\n'
