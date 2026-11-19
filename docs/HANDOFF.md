# Engineering handoff

## Current state

The static profile and local interview preview are the running product. The source portrait is a still image. The interview clears its own DOM history when closed. Astro emits six localized static routes with responsive AVIF and WebP images. The landing and interview show a labelled AI-generated recording on demand, with a poster fallback. The dashboard event contract runs in the browser. The Umami integration was verified against the self-hosted dashboard from a local build. Production verification awaits release approval.

Colima serves the optimized static preview by default on loopback. The explicit development override enables Docker Watch. Independent worktree environments are documented in [engineering workflows](WORKFLOWS.md). Build and local access logs are correlated. Optional Sentry remains disabled by default; a synthetic DSN and local receiver verified scrubbed browser delivery.

The private [GitHub Project](https://github.com/users/povedica/projects/3) is linked to the [public remote](https://github.com/povedica/mi-cv). The repository is prepared locally. On November 18, 2026, Pablo approved publishing the versioned portrait, professional copy and screenshots. See the [deployment runbook](DEPLOYMENT.md) for production provisioning and acceptance checks. Drafts remain outside Git. Historical [home](screenshots/portada.jpg) and [interview](screenshots/entrevista.jpg) screenshots show the original preview, before the current performance changes.

The [latest DevTools audit](QUALITY.md#november-18-2026-devtools-comparison) verified the default optimized mode on port 4321 with 100 for performance, 1.07 s FCP and 1.22 s LCP. Use the explicit development override for hot reload.

The production dependency audit previously reported one critical, three high and one low finding. npm proposed a major Astro upgrade. That migration is a separate task. See [quality verification](QUALITY.md) for the current build and browser checks.

## Bilingual portfolio release

Version 0.2.0 includes the Spanish and English portfolios, both local interview
previews, and bilingual cookie policies. The landing presents all roles in a
visible timeline, with self-hosted Geist fonts and localized discovery metadata.
The two original CVs are approved for public download with their contact details.
Certificate PDFs still depend on supplied and approved files. See the [landing
copy](LANDING-COPY.md) and [information architecture](ARQUITECTURA-INFORMACION.md).

## Production QA follow-up

[Issue #33](https://github.com/povedica/mi-cv/issues/33) tracks the post-release changes. Local verification passed with `npm run verify` (16 tests), the release receiver tests, and strict OpenSpec validation. Headless Chrome loaded both static localizations with `Object.hasOwn` absent and recorded a page view in each. The mobile notice measured approximately 147 px at 360 px in Spanish and 129 px at 390 px in English, with an 11 px gap above the dock. Reduced-motion emulation confirmed that the dock hides on descent and returns on ascent, including focus retention and notice dismissal. Both Geist preloads matched the actual font requests.

Both localized interview routes now use the shared portfolio layout and remain outside the sitemap. Chrome verified the shared frame, responsive dock, cookie notice and locale switch at 360 and 1440 px. The preview accepted a suggested question and literal test input, cleared history on close, restored focus and emitted the expected local analytics events.

The supplied social JPEGs are 1200×630. Both static landing pages reference the locale-specific image and declare matching Open Graph and Twitter metadata. The release receiver accepts both image paths. HTML compression remains pending the hostname-scoped Cloudflare rule and production validation described in the [deployment runbook](DEPLOYMENT.md). YellowLab, historical browsers, HLS response types, and social crawler previews remain production acceptance checks.

The discovery follow-up adds static Markdown in both languages, a discovery index, dated sitemap entries for the home pages and CVs, and `noindex` on cookie and interview pages. JSON-LD now carries the public timeline and speaking activity. Metadata-only changes to the CV PDFs preserve the extracted text, document tags and rendered pixels. Direct production probes using GPTBot, ClaudeBot and PerplexityBot identifiers returned HTTP 200 for both home pages from the test network.

IndexNow workflow activation is deferred. Search console ownership, backlinks and production validator checks are pending.

## Next bounded change

Implement a local text-chat session, one question and close using synthetic content. Verify citation ownership, abstention without evidence, session access and exclusion of private records before connecting the interface. The live corpus requires approval of each version. See [analytics rollout](ANALYTICS.md) for the pending production verification.

## Recorded avatar release

Issue #27 adds a recorded HLS demonstration to the landing hero and interview and keeps the live
avatar capability planned. The media is provisioned independently of the
static release. See [deployment and service rationale](DEPLOYMENT.md#avatar-video).

The bilingual cookie policy documents theme and language preferences and
notice acknowledgement. See the [storage inventory](COOKIE-INVENTORY.md).
