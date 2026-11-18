# Engineering handoff

## Current state

The static profile and local interview preview are the running product. The source portrait is a still image. The interview clears its own DOM history when closed. Astro emits two static routes with responsive WebP images. The dashboard event contract runs in the browser. The Umami integration was verified against the self-hosted dashboard from a local build. Production verification awaits release approval.

Colima serves the optimized static preview by default on loopback. The explicit development override enables Docker Watch. Independent worktree environments are documented in [engineering workflows](WORKFLOWS.md). Build and local access logs are correlated. Optional Sentry remains disabled by default; a synthetic DSN and local receiver verified scrubbed browser delivery.

The private [GitHub Project](https://github.com/users/povedica/projects/3) is linked to the [public remote](https://github.com/povedica/mi-cv). The repository is prepared locally. On November 18, 2026, Pablo approved publishing the versioned portrait, professional copy and screenshots. See the [deployment runbook](DEPLOYMENT.md) for production provisioning and acceptance checks. Drafts remain outside Git. Historical [home](screenshots/portada.jpg) and [interview](screenshots/entrevista.jpg) screenshots show the original preview, before the current performance changes.

The [latest DevTools audit](QUALITY.md#november-18-2026-devtools-comparison) verified the default optimized mode on port 4321 with 100 for performance, 1.07 s FCP and 1.22 s LCP. Use the explicit development override for hot reload.

The production dependency audit previously reported one critical, three high and one low finding. npm proposed a major Astro upgrade. That migration is a separate task. See [quality verification](QUALITY.md) for the current build and browser checks.

## Bilingual portfolio preview

The #5 worktree serves the Spanish and English portfolios at `/` and `/en/`, with local interview previews at `/interview/` and `/en/interview/`. Both portfolios use locale-specific static copy with shared components. Canonicals, alternate-language links, the sitemap, structured person data and localized social metadata are in the local branch. The release receiver accepted the bilingual archive in a local dry run.

The private Compose preview at `http://127.0.0.1:32773/` serves the owner-authorized CV originals through local read-only mounts. Normal builds omit the local download controls. Certificates, final release review and receiver installation on the VPS remain open. See [the landing copy](LANDING-COPY.md) and [information architecture](ARQUITECTURA-INFORMACION.md).

## Next bounded change

Implement a local text-chat session, one question and close using synthetic content. Verify citation ownership, abstention without evidence, session access and exclusion of private records before connecting the interface. The live corpus requires approval of each version. See [analytics rollout](ANALYTICS.md) for the pending production verification.
