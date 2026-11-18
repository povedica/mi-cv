# AI Professional Twin

An Astro portfolio and a browser-only interview preview. Visitors can read the profile and try the interview interface. The preview keeps questions in the current page and clears them when closed. The photo is a still portrait. The conversational agent, voice, and avatar are planned capabilities.

## Run locally

```bash
docker compose up --build
```

Open [the local site](http://127.0.0.1:4321/) or [the interview preview](http://127.0.0.1:4321/interview/). With Node.js 22.20+ and npm, the native equivalent is `npm ci` followed by `npm start`. The default serves a fresh, minified static build with gzip. Run `npm run verify` for type checking, tests, and a static build.

For development with hot reload, use `npm run dev` or:

```bash
docker compose -f compose.yaml -f compose.dev.yaml up --build --watch
```

## Technical documentation

| Start here | What it covers |
| --- | --- |
| [Changelog](CHANGELOG.md) | Versioned release notes and release procedure |

| [Architecture](docs/ARCHITECTURE.md) | System context, component map, functional flows, and stack rationale |
| [Modules](docs/MODULES.md) | Entry points, internals, data boundaries, and tests |
| [Web analytics](docs/ANALYTICS.md) | Versioned data layer, integration contract, and dashboard measures |
| [Performance and accessibility](docs/QUALITY.md) | Design constraints, verification, and measured results |
| [Production deployment](docs/DEPLOYMENT.md) | GitHub Actions, shared Caddy edge, HTTPS checks and rollback |
| [Engineering workflows](docs/WORKFLOWS.md) | Docker, worktrees, CI, secrets, logs, and OpenSpec |
| [Roadmap](docs/BACKLOG.md) and [handoff](docs/HANDOFF.md) | Implementation status and the next milestone |

Publishing the portfolio copy and portrait requires explicit owner approval. Keep private drafts outside Git. See [contribution guidance](CONTRIBUTING.md) and [private security reporting](SECURITY.md).
