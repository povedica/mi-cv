# Engineering handoff

## Current state

The static profile and local interview preview are the running product. The source portrait is a still image. The interview clears its own DOM history when closed. Astro emits two static routes with responsive WebP images. The dashboard event contract runs in the browser. No collector or dashboard is connected.

Colima serves the optimized static preview by default on loopback. The explicit development override enables Docker Watch. Independent worktree environments are documented in [engineering workflows](WORKFLOWS.md). Build and local access logs are correlated. Optional Sentry remains disabled by default; a synthetic DSN and local receiver verified scrubbed browser delivery.

The private [GitHub Project](https://github.com/users/povedica/projects/3) is linked to the [public remote](https://github.com/povedica/mi-cv). The repository is prepared locally. The first public push still requires approval of the portrait, professional copy and screenshots. Drafts remain outside Git. Historical [home](screenshots/portada.jpg) and [interview](screenshots/entrevista.jpg) screenshots show the original preview, before the current performance changes.

The [latest DevTools audit](QUALITY.md#november-18-2026-devtools-comparison) verified the default optimized mode on port 4321 with 100 for performance, 1.07 s FCP and 1.22 s LCP. Use the explicit development override for hot reload.

The production dependency audit previously reported one critical, three high and one low finding. npm proposed a major Astro upgrade. That migration is a separate task. See [quality verification](QUALITY.md) for the current build and browser checks.

## Next bounded change

Implement a local text-chat session, one question and close using synthetic content. Verify citation ownership, abstention without evidence, session access and exclusion of private records before connecting the interface. The live corpus requires approval of each version. An analytics deployment requires a separately approved collector and consent policy.
