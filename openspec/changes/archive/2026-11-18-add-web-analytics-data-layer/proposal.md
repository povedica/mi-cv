## Why

Define which page views and preview interactions a future analytics dashboard can measure without sending interview content or committing to a vendor.

## What Changes

- Add a versioned browser event queue for the two static pages and the local interview flow.
- Record page and link placement using a fixed vocabulary.
- Keep dashboard transport and consent policy outside this change.

## Capabilities

### New Capabilities
- `web-analytics`: Versioned, bounded browser events with no built-in transport.

### Modified Capabilities

## Impact

A small JavaScript module and event hooks in the two Astro routes. No service or deployment credentials are required.
