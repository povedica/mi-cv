---
name: twin-verification
description: Verify a change to AI Professional Twin before handoff, including build, tests, browser behavior and editorial boundaries.
---

1. Run `npm run verify` from the project root. Report the exact failing command if any check fails.
2. For UI changes, run `npm run dev -- --host 127.0.0.1` and exercise the changed flow on desktop and at a narrow viewport. Verify keyboard focus, visible state and any relevant privacy behavior.
3. For interview changes, check the landing CTA, session start, suggestion, history and closure. Confirm the UI advertises only capabilities that work.
4. For publication or server changes, confirm that drafts and internal metadata are absent from static output and public responses. Test denied and failed cases alongside success.
5. Record executed commands and observed results, distinguish automated tests from manual checks, and link screenshots when they are part of the deliverable.
