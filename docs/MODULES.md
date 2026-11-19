# Module reference

| Module | How it works | Boundaries and checks |
| --- | --- | --- |
| [Profile](../src/pages/index.astro) and [public copy](../src/data/site.ts) | Astro renders the profile, section anchors and four native interview links. Link placement markers identify the entry point. | No visitor state on this route. Keyboard navigation, landmarks and usable narrow layout are checked in the browser. |
| [Interview](../src/pages/interview.astro) | Native DOM listeners open the preview, populate suggested questions, append valid text to an ordered list, and clear history on close. | No chat request, microphone, video, storage or provider call. The form and preview use labelled controls, focus management and live status. |
| [Styles](../src/styles/global.css) and [portrait](../src/assets/pablo-portrait.jpg) | One stylesheet controls layouts, states and reduced motion. Astro generates responsive WebP candidates with intrinsic dimensions. | The portrait is a still source image. Build output includes only the derivatives used by the two routes. |
| [Analytics](../src/analytics/data-layer.ts) and [page bootstrap](../src/components/WebAnalytics.astro) | The shared page head loads Umami and a validator projects events into a bounded queue and an allowlisted adapter. | No tracking cookies or question content. Schema, mapping, bounds and collector failure have [unit coverage](../tests/data-layer.test.mjs). |
| [Sentry bootstrap](../src/components/BrowserMonitoring.astro) and [adapter](../src/monitoring/sentry.ts) | A configured public DSN enables a dynamic browser import. A send hook rebuilds errors from an allowlist of first-party frames and safe metadata. | Disabled by default. No replay or user data. [Tests](../tests/sentry.test.mjs) cover filtering, and a local receiver previously verified delivery. |
| [Astro tracing](../src/server/astro-tracing.mjs) | Astro hooks emit build start and completion with a shared ID. A dev middleware emits a JSON event for each completed GET to either page and sets `X-Request-Id`. | Server-side only. Fixed route labels, status and duration. No raw request data. [Trace tests](../tests/astro-tracing.test.mjs) verify correlation and exclusion. |
| [Editorial gate](../knowledge/publication.mjs) | Accepts a normalized record only when it is public and published, the exact version is approved, and the validity dates allow it. Projects only `id`, `version`, `title`, `body` and `locale`. | No Markdown reader, index or public API yet. [Tests](../tests/publication.test.mjs) use synthetic data. |
| [Chat contract](../src/data/chat-contract.ts) | Defines the target session, question, citation, answer, abstention and error types. | Type-only. API deployment, authentication, quotas, and citation validation remain planned. |
| [Docker](../compose.yaml) and [worktrees](../scripts/worktree.sh) | A non-root Node container installs the lockfile and serves Astro on loopback. Compose Watch syncs source. The worktree script creates a branch checkout and generates a local Compose name and port configuration. | The image context excludes local credentials and private drafts. [Worktree tests](../tests/worktree.test.sh) exercise isolation and invalid input. |
| [Verification](../.github/workflows/build.yml) and [backlog automation](../.github/workflows/backlog-sync.yml) | CI checks the npm build and local tooling. The backlog workflow validates PR references and updates the private Project after eligible merges. | The PR check is read-only. The merge workflow uses the trusted base and keeps paused items unchanged. [Tests](../scripts/backlog/test_sync.py) mock GitHub operations. |
| [Static deployment](DEPLOYMENT.md) | A manual production-branch Actions workflow verifies Astro output and streams it to a dedicated SSH receiver under the existing deploy account. The receiver switches the release symlink and Caddy handles HTTPS. | The receiver allows only the two routes and expected file types. Actions compare both routes and all build assets over verified HTTPS. |

## Planned chat HTTP interface

| Operation | Contract |
| --- | --- |
| `POST /api/v1/chat/sessions` | 201 with an opaque expiring session. Bind it to the browser with a secure, HttpOnly, SameSite cookie. |
| `POST /api/v1/chat/sessions/{id}/messages` | Accept Spanish questions of 1–500 characters after trimming. Return a cited answer or an abstention. |
| `DELETE /api/v1/chat/sessions/{id}` | 204 for idempotent close by the owner of the session. Release transient state. |

Target errors are 400 for invalid input, 404 for an inaccessible session, 429 for quota, and 503 when the service is unavailable. Validate origins and citation ownership server-side. Keep visitor questions out of logs. Future interfaces for voice sessions, avatar sessions and publication are separate from this contract.

## Recorded avatar

`src/components/AvatarVideo.astro` renders the supplied poster as a responsive WebP
fallback and labels the recording as AI-generated. The landing hero and interview request the
versioned HLS manifest only after the visitor activates the player. The player
uses native HLS when reported by the browser and loads the bundled hls.js light
build dynamically for Media Source Extensions. Unsupported browsers keep the portrait visible. Playback failures return to the portrait and offer a retry. Media files live outside the static release and are
served by Caddy. See [conversion and deployment](DEPLOYMENT.md#avatar-video).
