# Module reference

| Module | How it works | Boundaries and checks |
| --- | --- | --- |
| [Public profile data](../src/data/public-profile.ts) and [Markdown renderer](../src/data/profile-markdown.ts) | The build generates both Markdown profiles, an agent discovery index and an alternate-linked sitemap. JSON-LD adds employment roles and public speaking activity. | The renderer selects public landing fields explicitly and excludes demo credentials and unpublished sources. |
| [Portfolio layout](../src/components/PortfolioLayout.astro) | Shares the document head, header, footer, cookie notice, and mobile dock across the home and interview routes in both languages. | Routes provide the main content and page identity. Canonical URLs and language links target the current route. |
| [Landing](../src/components/Landing.astro) and [localized copy](../src/content/landing/) | Renders the Spanish and English portfolios with a sticky header, a visible career timeline and local Geist fonts. Link placement markers identify each interview entry point. | The theme selector stores the visitor’s preferred color scheme locally. The header exposes contact actions, language and theme controls. Section IDs support direct links. |
| [Interview](../src/pages/interview.astro) | Native DOM listeners open the preview, populate suggested questions, append valid text to an ordered list, and clear history on close. | Chat questions stay in the DOM. The preview requests neither camera nor microphone access. The recorded avatar can be played separately. The form and preview use labelled controls, focus management and live status. |
| [Styles](../src/styles/global.css) and [portrait](../src/assets/pablo-portrait-v2.jpg) | One stylesheet controls layouts, states and reduced motion. Astro generates responsive WebP candidates with intrinsic dimensions. | The portrait is a still source image. Astro generates derivatives for the bilingual landing and interview. |
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

`src/components/AvatarVideo.astro` renders a 9:16 crop of the approved portrait as a responsive AVIF poster with WebP fallback and labels the recording as AI-generated. Both localized landing and interview pages request the
versioned HLS manifest only after the visitor activates the player. Spanish routes use `v2` and English routes use `v3`. The player
uses native HLS when reported by the browser and loads the bundled hls.js light
build dynamically for Media Source Extensions. Unsupported browsers keep the portrait visible. Playback failures return to the portrait and offer a retry. Media files live outside the static release and are
served by Caddy. Version-matched WebVTT caption tracks are bundled with the static release. See [conversion and deployment](DEPLOYMENT.md#avatar-video).

### Profile structured data

Both landing routes render one Schema.org graph through
`src/components/ProfileSchema.astro`. The site and person identifiers are shared
across locales. Each profile page has its own canonical URL, language and
localised credential text. The graph omits contact details and refers to the
approved portrait at the stable `/pablo-poveda.jpg` URL. The responsive hero
poster remains a separate build asset. The release receiver admits the portrait
by its exact path.

## Alternate portfolio versions

The Spanish and English portfolio headers link to `/versiones/` and `/en/versions/` respectively. Both indexes expose `tui/` and `90s/`. The Astro components read the localized public profile, PDF paths and links from `src/data/public-profile.ts`. Alternate documents use `noindex`.

The terminal opens with a labelled example and clones pre-rendered HTML templates for recognized commands. Commands stay in the browser and the demo uses no conversational API. The retro document uses a fixed 800 px viewport, in-page navigation and a native marquee with a CSS reduced-motion fallback. Both load the existing website analytics integration without collecting terminal input. See the [OpenSpec change](../openspec/changes/portfolio-versions/).

`npm run verify` passed Astro checking, 16 tests and the static build. Chrome headless exercised the Spanish desktop and English mobile routes (320 px emulated viewport), including header keyboard focus, terminal projects and CV commands, unknown input, retro anchors, reduced motion and PDF HTTP responses. Physical device zoom and assistive technology were outside the browser check.

On the home page, the desktop Konami sequence and seven consecutive touch taps on the header brand open the localized Versions index with a discovery message. Keyboard matching excludes editable fields and modified shortcuts. Chrome verified the final key, editable-field exclusion, and the touch timeout and countdown on an emulated mobile viewport.

The retro page ends with an original canvas brick breaker. Its JavaScript animation starts on explicit Play and stops on pause, when the tab becomes hidden, or when the round ends. Arrow keys and touch buttons move the paddle. Clearing rows reveals three entries from the approved public experience section. Game state remains in the document and is discarded when the visitor leaves.
