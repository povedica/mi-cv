#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Uso: %s <rama> [base]\n' "${0##*/}" >&2
}

if [ "${1:-}" = --help ] || [ "${1:-}" = -h ]; then
  usage
  exit 0
fi
if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage
  exit 2
fi

branch="$1"
if ! checked_branch="$(git check-ref-format --branch "$branch" 2>/dev/null)" ||
   [ "$checked_branch" != "$branch" ] || [ "$branch" = HEAD ]; then
  printf 'Nombre de rama inválido: %s\n' "$branch" >&2
  exit 2
fi

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
common_dir="$(git -C "$script_dir" rev-parse --path-format=absolute --git-common-dir)"
repo_dir="$(dirname -- "$common_dir")"
worktree_root="$(dirname -- "$repo_dir")/mi-cv-worktrees"
slug="$(printf '%s' "$branch" | LC_ALL=C tr '[:upper:]' '[:lower:]' |
  LC_ALL=C sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' | cut -c 1-40)"
suffix="$(printf '%s' "$branch" | git -C "$repo_dir" hash-object --stdin | cut -c 1-10)"
name="${slug:-rama}-$suffix"
destination="$worktree_root/$name"

if [ -e "$destination" ] || [ -L "$destination" ]; then
  printf 'La ruta ya existe: %s\n' "$destination" >&2
  exit 1
fi

if git -C "$repo_dir" show-ref --verify --quiet "refs/heads/$branch"; then
  if [ "$#" -eq 2 ]; then
    printf 'La rama %s ya existe. Vuelve a ejecutar el comando sin indicar una base.\n' "$branch" >&2
    exit 1
  fi
  mkdir -p -- "$worktree_root"
  git -C "$repo_dir" worktree add -- "$destination" "$branch" >&2
else
  base="$(git -C "$repo_dir" rev-parse --verify --end-of-options "${2:-refs/heads/main}^{commit}")"
  mkdir -p -- "$worktree_root"
  git -C "$repo_dir" worktree add -b "$branch" -- "$destination" "$base" >&2
fi

if ! git -C "$destination" check-ignore -q -- .env; then
  printf 'Worktree creado en %s. Git debe ignorar .env antes de generar la configuración local.\n' "$destination" >&2
  exit 1
fi

(
  set -o noclobber
  printf 'COMPOSE_PROJECT_NAME=mi-cv-%s\nMI_CV_HOST_PORT=0\n' "$name" > "$destination/.env"
)
printf '%s\n' "$destination"
