## Why

The versioned browser data layer needs aggregate reporting in the approved self-hosted Umami instance.

## What Changes

- Configure the tracker in the shared page head for the production hostname.
- Forward allowlisted interaction events with finite dimensions.
- Disclose cookie-free analytics and verify traffic and events with a local static build.

## Capabilities

### Modified Capabilities

- `web-analytics`: add Umami delivery and CV, LinkedIn, language and contact action contracts.

## Impact

Astro page head, browser data layer and analytics documentation.
