# Architecture

## System context

The build emits two HTML documents and hashed assets. Both pages work as documents before JavaScript runs. The interview uses progressive enhancement for a local history. The production target is the shared Caddy edge at `cv.reflexionia.com`. See the [deployment runbook](DEPLOYMENT.md) for provisioning and release activation.

```mermaid
flowchart LR
  Developer --> Git[Git repository]
  Git --> Build[Astro build in Node]
  Build --> Files[Static HTML, CSS, JS and WebP]
  Files --> Host[Shared Caddy edge]
  Host --> Browser[Visitor browser]
  Browser -->|Page views and approved events| Umami[Self-hosted Umami]
  Browser -. optional scrubbed errors .-> Sentry
  Git --> CI[GitHub Actions]
  CI -->|Manual production release over SSH| Host
  CI --> Projects[Private GitHub Project]
```

The browser executes the preview and materializes analytics events. The build configures Umami for the production hostname. The dashed Sentry connection requires an explicit browser DSN.

## Component map

```mermaid
flowchart TD
  Astro[Astro routes] --> Home[Profile and interview links]
  Astro --> Interview[Local preview]
  Astro --> Assets[Shared CSS and responsive portrait]
  Home --> Data[Versioned analytics data layer]
  Interview --> Data
  Data --> Queue[In-memory window.dataLayer]
  Data --> Adapter[Umami adapter]
  Astro --> Errors[Optional browser error monitoring]
  Errors --> Scrubber[First-party frame allowlist]
  Config[Astro integration] --> Logs[Build and dev request logs]
  Gate[Editorial publication gate] -. future ingestion .-> Evidence[Public evidence index]
  Contract[Typed HTTP chat contract] -. future integration .-> Interview
```

The editorial gate and the HTTP contract have implementation or type coverage in the repository. No current browser route imports the editorial gate or calls a chat API. See [module internals](MODULES.md).

## Functional flow

```mermaid
sequenceDiagram
  actor Visitor
  participant Page as Interview page
  participant DOM as Local history
  participant Queue as Browser data layer
  Visitor->>Page: Load interview
  Page->>Queue: page_view
  Visitor->>Page: Open preview
  Page->>Queue: interview_preview_open
  Visitor->>Page: Submit nonblank question
  Page->>DOM: Append text and restore focus
  Page->>Queue: interview_preview_question_added
  Visitor->>Page: Close preview
  Page->>DOM: Clear history and restore focus
  Page->>Queue: interview_preview_close
```

The question enters the DOM through `textContent`. The event queue receives the action name and a fixed page identifier. Closing the preview clears the DOM history. The event counts remain in memory until the document is discarded.

## Stack decisions

| Choice | Rationale and trade-off |
| --- | --- |
| Astro static output | Ships complete documents with scripts only where used. Live chat will need a separately deployed API. |
| TypeScript and native DOM APIs | Typed contracts and straightforward progressive enhancement without a UI runtime. Browser and Node verification catch different failure modes. |
| CSS and system fonts | Shared design and keyboard states with zero font requests. Typography follows the visitor's platform. |
| Astro image pipeline | Generates sized WebP derivatives and intrinsic dimensions from one source at build time. Updates to the portrait require a rebuild. |
| Node 22, npm and lockfile | Shared baseline for local work, Docker and CI. `npm ci` reproduces the dependency graph. |
| Docker Compose and worktrees | Isolated dependencies and parallel local branches with independent loopback ports. Static hosting remains independent of Docker. |
| GitHub Actions and Projects | Automated verification and PR-linked task tracking using an existing repository workflow. Project write permissions are confined to the merge workflow. |
| OpenSpec | Reviewable requirements and behavior changes alongside the commits that implement them. This documentation describes the running system. |
| Structured logs and optional Sentry | Local request and build correlation plus a separate browser error channel. The static host owns production access logging. |
| In-memory analytics data layer | A bounded versioned queue and an allowlisted adapter provide aggregate reporting without blocking visitor actions. |

## Target conversation architecture

```mermaid
flowchart LR
  UI[Static site with textual fallback] --> BFF[Session API]
  BFF --> Agent[Conversation provider]
  Agent --> Retriever[Approved evidence retriever]
  Retriever --> Index[Public index]
  Editor[Versioned editorial records] --> Gate[Publication gate]
  Gate --> Index
  BFF -. later .-> Voice[Voice session adapter]
  Voice -. later .-> Avatar[Avatar adapter]
```

The next milestone implements text first. The BFF owns origin and session validation, rate and cost limits, typed errors, and ephemeral session state. Retrieval uses approved public evidence. Responses cite the exact versions recovered or abstain. Sources are data and cannot grant instructions or permissions. Voice and avatar remain separate interfaces. See [the roadmap](BACKLOG.md) for sequencing.
