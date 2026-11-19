# Changelog

This file records changes to the AI Professional Twin by release.

Add changes under **Unreleased** as pull requests merge. Summarize the effect on visitors or maintainers and link the relevant issue and pull request. At release time, move those entries to a heading with the new `MAJOR.MINOR.PATCH` version and the release date (`YYYY-MM-DD`). Keep the version aligned with `package.json`, `package-lock.json` and the release tag (`vMAJOR.MINOR.PATCH`).

Use Semantic Versioning for the public interfaces and documented contracts. Once the project reaches 1.0.0, increment MAJOR for incompatible changes, MINOR for backward-compatible features, and PATCH for backward-compatible fixes. During 0.x, increment MINOR for features or incompatible changes and PATCH for backward-compatible fixes.

## Unreleased

## 0.2.0 - 2026-11-19

### Added

- Publish the Spanish and English portfolios, approved CV PDFs, local interview previews and bilingual discovery metadata. ([#5](https://github.com/povedica/mi-cv/issues/5))
- Add system-aware light and dark themes and bilingual storage notices and policies. ([#19](https://github.com/povedica/mi-cv/issues/19), [#25](https://github.com/povedica/mi-cv/issues/25))
- Play labelled, prerecorded AI avatar introductions on demand in both languages with HLS, captions and a responsive still fallback. ([#27](https://github.com/povedica/mi-cv/issues/27))

- Add release notes and a Semantic Versioning workflow. ([#23](https://github.com/povedica/mi-cv/issues/23))
- Add an opt-in integration with self-hosted Umami for page views and approved interaction events, with a privacy notice and no question text in analytics. Production activation is tracked separately. ([#15](https://github.com/povedica/mi-cv/issues/15), [PR #20](https://github.com/povedica/mi-cv/pull/20))

### Changed

- Upgrade Astro from 5.x to 7.4.13 and refresh the dependency lockfile, including sharp and zod. ([#22](https://github.com/povedica/mi-cv/issues/22), [PR #3](https://github.com/povedica/mi-cv/pull/3))

## 0.1.0

Release history starts from the repository's existing declared version.

### Added

- Spanish professional portfolio and two static routes with responsive portrait images.
- Browser-only interview preview with suggested questions, local history, and a close action that clears the session.
- Versioned browser analytics events, optional scrubbed Sentry reporting, and a manually triggered static deployment workflow.
