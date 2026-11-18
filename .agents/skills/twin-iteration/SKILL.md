---
name: twin-iteration
description: Start or resume a development iteration in AI Professional Twin. Use for handoffs, backlog items and scoped implementation.
---

1. Read AGENTS.md, docs/HANDOFF.md and the relevant backlog and architecture sections.
2. Inspect the worktree with `git status --short` when Git metadata exists. Preserve local work. Read the files involved before editing.
3. Identify the current behavior and write down the expected outcome and how you will verify it. Use the smallest vertical slice that achieves it.
4. Reuse installed dependencies. On a fresh copy use `npm ci` with the supplied lockfile.
5. Implement and run the verification skill. Exercise the feature through its normal entry point.
6. Update handoff and backlog when the implementation state changes. Record proof, open decisions and the next bounded task.
