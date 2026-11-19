## Why

Issue #35 introduces alternate ways to browse the public CV. The first increment gives visitors a visible entry point and two distinct, localized presentations of approved profile content.

## What Changes

- Add a Versions link to the Spanish and English portfolio headers.
- Add a localized versions index, a command-driven terminal and a fixed-width 90s homepage.
- Add keyboard and touch shortcuts to the versions index.
- Keep the game and retro frame navigation pending in issue #35.

## Capabilities

### New Capabilities

- `portfolio-versions` provides direct links to alternate CV presentations.

## Impact

Static Astro routes reuse public profile copy, published PDFs and existing contact links. The terminal handles predefined commands locally. The existing Umami page-view integration also loads on the alternate routes.
