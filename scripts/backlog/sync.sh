#!/usr/bin/env bash
set -euo pipefail

mode="${1:?modo check o merged}"
pr="${2:?número de PR}"
repo="${REPO:?repositorio propietario/nombre}"
[[ "$pr" =~ ^[0-9]+$ ]] || exit 2

case "$mode" in
  check)
    data="$(gh pr view "$pr" --repo "$repo" --json body,labels)"
    if jq -e '.labels | any(.name == "sin-backlog")' >/dev/null <<<"$data"; then
      exit 0
    fi
    if ! jq -er '.body // "" | split("\n")[0]' <<<"$data" | grep -Eiq '^Closes #[0-9]+([[:space:]]|$)'; then
      echo '::error::Empieza la descripción con Closes #N o aplica sin-backlog.'
      exit 1
    fi
    ;;
  merged)
    project_number="${PROJECT_NUMBER:?número del Project}"
    numbers="$(gh api graphql --paginate -f owner="${repo%%/*}" -f name="${repo#*/}" \
      -F pr="$pr" -f query='query($owner:String!, $name:String!, $pr:Int!, $endCursor:String) {
        repository(owner:$owner,name:$name) {
          pullRequest(number:$pr) {
            merged
            closingIssuesReferences(first:100,after:$endCursor) {
              nodes { number repository { nameWithOwner } }
              pageInfo { hasNextPage endCursor }
            }
          }
        }
      }' | jq -r --arg repo "$repo" '
        .data.repository.pullRequest | select(.merged) | .closingIssuesReferences.nodes[]
        | select(.repository.nameWithOwner == $repo) | .number
      ')"
    [ -n "$numbers" ] || exit 0
    export GH_TOKEN="${PROJECT_TOKEN:?credencial de Projects}"
    owner="${repo%%/*}"
    if [ "$(gh api user --jq .login)" = "$owner" ]; then owner="@me"; fi
    project_id="$(gh project view "$project_number" --owner "$owner" --format json --jq .id)"
    fields="$(gh project field-list "$project_number" --owner "$owner" --format json --limit 100)"
    field_id="$(jq -er '.fields[] | select(.name == "Status") | .id' <<<"$fields")"
    done_id="$(jq -er '.fields[] | select(.name == "Status") | .options[] | select(.name == "Hecho") | .id' <<<"$fields")"
    items="$(gh project item-list "$project_number" --owner "$owner" --format json --limit 500)"
    for number in $numbers; do
      item_id="$(jq -r --arg repo "$repo" --argjson number "$number" '
        .items[] | select(.content.type == "Issue" and .content.repository == $repo
          and .content.number == $number and .status != "Pausada" and .status != "Hecho") | .id
      ' <<<"$items")"
      if [ -n "$item_id" ]; then
        gh project item-edit --id "$item_id" --project-id "$project_id" \
          --field-id "$field_id" --single-select-option-id "$done_id"
      fi
    done
    ;;
  *) exit 2 ;;
esac
