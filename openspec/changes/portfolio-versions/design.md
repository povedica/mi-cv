## Context

The existing portfolio renders Spanish and English static documents from a shared public profile module. Both versions use this source.

## Goals / Non-Goals

- Provide a predictable return to the current portfolio from each style.
- Support the terminal with keyboard and touch controls and retain profile links without JavaScript.
- Start the retro game on explicit user action and allow it to pause at any time.

## Decisions

- Use a dedicated index in each locale so both versions have independently shareable URLs.
- Render curated terminal outputs in inert HTML templates. Clone an output after a recognized command and display a fixed message for unknown commands. The opening exchange is a labelled demonstration.
- Use a single fixed-width retro document with internal anchors in this increment. Native marquee markup supplies the brief movement and a media query provides a static greeting for reduced motion.
- Mark experimental documents `noindex` and continue to identify the main profile as the public search entry point.

## Risks / Trade-offs

- The fixed canvas requires zoom on narrow displays as requested in issue #35. The terminal and index reflow on narrow screens.
- The terminal has a fixed vocabulary. Each prompt exposes the available commands and the resulting content links back to its public source where applicable.
