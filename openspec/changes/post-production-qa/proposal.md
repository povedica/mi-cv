## Why

Production QA found a legacy analytics error, crowded mobile overlays, stale share previews, and uncompressed HTML. See [issue #33](https://github.com/povedica/mi-cv/issues/33).

## What Changes

- Preserve analytics validation in browsers without Object.hasOwn.
- Compact the mobile cookie notice and hide the action dock on downward scroll.
- Refresh bilingual share descriptions and use the approved locale-specific JPEGs when supplied.
- Allow compressed HTML at the edge while preserving the published demo address.

## Capabilities

### New Capabilities

- `portfolio-qa`: Public landing page compatibility, mobile overlays, sharing, and edge delivery.

### Modified Capabilities

None.

## Impact

Astro landing routes, analytics, shared cookie notice, release receiver, Caddy, and Cloudflare.
