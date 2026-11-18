## Context

The portfolio ships two static pages. The preview stores typed questions only in the current DOM. Sentry is a separate, optional error channel.

## Goals / Non-Goals

- Provide a stable event vocabulary for aggregate traffic and preview engagement.
- Keep navigation and preview usable if the queue consumer fails.
- Leave provider, consent, retention, and dashboard provisioning to a separate decision.

## Decisions

Use `window.dataLayer` as an in-memory transport-neutral array. Construct each event from predefined names and dimensions. Retain up to 64 entries per document and preserve entries already in the queue. Match the four home interview links by explicit placement markers. Emit preview events after the corresponding UI action.

## Risks / Trade-offs

A full queue drops new events. The contract measures event totals and page-level ratios. It does not correlate individual people or visits across pages.
