# Engineering workflows

## Local development and worktrees

Use Node.js 22.20+ (CI uses Node 22) for the native workflow, or run `docker compose up --build`. The default builds and serves the optimized static preview. Use `npm run dev` or the explicit Compose override for unminified modules and hot reload. Docker exposes the site on loopback and runs Node as a non-root user. The [README](../README.md) contains the start and verification commands.

Create a branch checkout with its own Compose project:

```bash
worktree="$(./scripts/worktree.sh feat/text-chat)" && cd "$worktree"
docker compose up --build -d --wait
docker compose port web 4321
```

On this machine, linked checkouts are siblings of the main repo under `~/Projects/mi-cv-worktrees`. New branches start from local `main`; an optional second argument selects a different base. Omit the base to reuse an existing branch. The script generates only a local Compose name and an ephemeral loopback port. For hot reload, start with `docker compose -f compose.yaml -f compose.dev.yaml up --build --watch`. Query the port again after recreating the container.

Use `git worktree list` to locate checkouts. To retire one, stop its Compose project, preserve any needed local configuration and commit your changes, then use `git worktree remove <path>` from another checkout. The branch remains available.

## Configuration and secrets

| Name | Location | Purpose |
| --- | --- | --- |
| `MI_CV_HOST_PORT` | Public local setting in the shell or `.env` | Defaults to 4321; generated worktrees use 0 for an ephemeral loopback port. |
| `COMPOSE_PROJECT_NAME` | Public local setting generated in worktree `.env` | Isolates services and networking per checkout. |
| `ASTRO_TELEMETRY_DISABLED` | Public container setting in the Dockerfile | Disables Astro telemetry at value 1. |
| `PUBLIC_SENTRY_DSN` | Optional local setting or GitHub Actions variable in the `production` environment | Browser DSN. Empty by default. The production verification step reads it while building the static release. |
| `PROJECT_NUMBER` | GitHub Actions variable | Identifies the backlog Project. |
| `PROJECT_TOKEN` | GitHub Actions secret, master value in 1Password | Allows the trusted merge job to update the private Project. |

`.env.example` contains public configuration only. Compose reads local `.env` and explicitly passes the public DSN to the application. The Docker build context excludes local environment files, credentials, the Git history and private drafts. Keep future credentials in 1Password and inject them only into the process that needs them. Use Actions `vars` for public configuration and `secrets` for credentials. Astro values prefixed with `PUBLIC_` are browser-visible.

## Local logs

Run `docker compose logs -f web`. In explicit development mode, GET requests for the two pages return `X-Request-Id`. Match it to the JSON `trace_id` for logical route, status and duration. Build start and completion share a separate trace ID. Health checks use HEAD. Custom logs exclude query strings, headers, IP addresses and bodies. A production static host controls its own access logs.

## Sentry

Leave the DSN empty for zero reporting. For an authorized test, set the public browser DSN in local configuration and recreate the container. Static deployment requires the value during the deployment build. Any future administrative or source map upload token is a separate secret.

After approval, set `PUBLIC_SENTRY_DSN` under **Settings → Environments → production → Environment variables** in GitHub. Run **Deploy production** from a new commit SHA when changing or clearing the DSN. The release receiver reuses the first artifact accepted for a SHA, so rerunning the same SHA may keep the previous configuration. Production error frames refer to bundled JavaScript positions.

The browser adapter keeps a fixed error message, known error type, environment and sanitized first-party frames. It excludes original messages, user context, request data, session replay, breadcrumbs and performance traces. Validate cost, the public privacy notice and IP storage settings before enabling collection for visitors.

On November 18, 2026, the `mi-cv` project was created on the free Sentry plan. A headless Chrome run against a temporary local production build sent one event. Sentry accepted it with HTTP 200 and recorded issue `MI-CV-1` as `Error: Browser runtime error`. The stored event had the synthetic first-party frame, no request entry, no stored IP, and a geolocation object added by Sentry. Project-side IP scrubbing is enabled. The test trigger existed only in temporary output. Visitor collection remains pending privacy notice review and approval.

## Change workflow

1. Read [the handoff](HANDOFF.md), [roadmap](BACKLOG.md) and relevant [module](MODULES.md). Consult the [Project protocol](backlog/PROTOCOLO-BACKLOG.md).
2. Write requirements and scenarios with OpenSpec when behavior or contracts need review. Use `$openspec-propose` in Codex or `/openspec-propose` in Cursor. The proposal, design, spec delta and tasks live in `openspec/changes/`. Validate with `npx --no-install openspec validate <change> --strict`.
3. Implement and verify in focused commits. Capture evidence in the relevant docs. Archive completed OpenSpec changes to update the canonical specifications under `openspec/specs/`.
4. Keep the architecture, module reference and handoff aligned with the running system. The repository skill [twin-documentation](../.agents/skills/twin-documentation/SKILL.md) defines when and how to update each artifact.

| Task | Repository skill |
| --- | --- |
| Resume an iteration | [twin-iteration](../.agents/skills/twin-iteration/SKILL.md) |
| Change chat and evidence | [twin-chat](../.agents/skills/twin-chat/SKILL.md) |
| Review professional content | [twin-editorial](../.agents/skills/twin-editorial/SKILL.md) |
| Verify a change | [twin-verification](../.agents/skills/twin-verification/SKILL.md) |
| Update GitHub Projects | [backlog-github-projects](../.agents/skills/backlog-github-projects/SKILL.md) |

Cursor also provides project commands for resuming, verifying and editorial review. Skills can be opened by file path in either editor.
