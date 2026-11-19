## Context

Both locales already render to independent HTML with canonical and alternate URLs. Analytics uses a finite event allowlist. Cloudflare currently preserves HTML with no-transform.

## Goals / Non-Goals

Keep the static routes and current consent storage. Preserve keyboard access and avoid motion in the dock interaction.

## Decisions

Render profile and interview content in the same portfolio layout. Keep canonical metadata, alternate language URLs and analytics page identity specific to the route.

Use the prototype own-property check for analytics. Keep the dock visible while it has focus and switch visibility without animation. Reserve the dock footprint for the notice so it stays clear of the dock as it reappears.

Preload both existing Geist files. Keep the full Latin glyph coverage because Spanish and English labels include accents and punctuation and the unused range was a minor audit finding.

Use the host-scoped Cloudflare Email Obfuscation override before removing no-transform at the origin. Keep the MP4 initialization MIME type and give fMP4 media fragments their own MIME type. Keep current image references until both approved JPEGs are available and accepted by the release receiver.

## Risks / Trade-offs

Changing the edge header before disabling Email Obfuscation can alter HTML and break release byte comparisons. Production validation must use the approved release and a fresh cache entry.
