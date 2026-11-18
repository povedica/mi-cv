# Instructions for Codex and Cursor

## Objective

Build an interactive professional identity with a navigable profile and a future conversation grounded in approved editorial knowledge, with the owner's voice and avatar. The profile and browser-only interview preview are live in the local build. The AI agent is planned.

## Constraints

1. Never invent biography, employment, metrics, achievements, current preferences, email addresses or URLs.
2. Keep private documents outside public surfaces. Visible or retrievable knowledge requires explicit approval and `visibility=public`.
3. Describe the still portrait accurately. A working video avatar is a separate capability.
4. Make AI-generated interactions explicit. Never claim that Pablo is live when an AI is speaking.
5. Keep permanent API keys out of the browser.
6. Separate knowledge, the agent, voice and the avatar engine through interfaces.
7. Validate cost, API, consent and replaceability before adding a paid provider.
8. Keep a static or text fallback when AI services fail.
9. Target WCAG 2.2 AA, mobile-first design and reduced-motion support.
10. Test significant behavior, especially grounding and privacy.

## Working agreement

- Read `README.md`, `docs/ARCHITECTURE.md` and `docs/BACKLOG.md` before changing the project. Consult `docs/HANDOFF.md` and `docs/WORKFLOWS.md` for context and skill selection.
- Use small, verifiable changes. Record decisions and distinguish current behavior, demonstrations and planned interfaces.
- Run `npm run verify`, which includes check, test and build. Verify the affected flow directly.
- Obtain human approval before publishing biographical content or enabling recurring costs.
- Validate retrieval, voice and avatar one layer at a time. The next product milestone is an approved-corpus text-chat BFF.
- Keep technical documentation in English. Use the [documentation skill](.agents/skills/twin-documentation/SKILL.md) when modules, interfaces or architecture change.

## GitHub Projects and traceability

- Use the [backlog Project](https://github.com/users/povedica/projects/3), [protocol](docs/backlog/PROTOCOLO-BACKLOG.md) and [shared skill](.agents/skills/backlog-github-projects/SKILL.md) when resuming, claiming or reviewing work.
- The Project holds task state. Keep the roadmap, handoff and approved decision record current.
- Review diffs and attachments before pushing any branch. Keep drafts, private sources and credentials outside history. The initial publication requires explicit approval of the portrait and biographical copy.
- Make focused commits in dependency order, stage only the intended changes, and keep relevant tests with their implementation. Use `Refs #N` in commits and `Closes #N` in the PR when an issue exists.
- Create linked checkouts with `./scripts/worktree.sh <branch> [base]`. On this machine, they live under `~/Projects/mi-cv-worktrees`. See the [local worktree workflow](docs/WORKFLOWS.md#worktrees).
