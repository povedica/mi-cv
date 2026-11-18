# GitHub Projects protocol

The [Project](https://github.com/users/povedica/projects/3) holds task status. The [roadmap](../BACKLOG.md) holds milestone acceptance criteria. [Decisions](DECISIONES.md) records decisions approved for publication.

1. Create an issue with scope, acceptance criteria and a zone. Add it to the Project in **Ideas**.
2. Move it to **Listo para hacer** once it meets the [definition of ready](DOR.md). Check paused work and overlapping zones before claiming it.
3. Set **Agente**, **Rama** and **En curso** when starting. Use an isolated worktree as described in [engineering workflows](../WORKFLOWS.md#worktrees).
4. Start the PR description with `Closes #N`. Use **En revisión** when the PR is ready. Record how to resume blocked work in **Pausada**.
5. Apply the [definition of done](DOD.md) before merging. The trusted merge workflow moves closed issues to **Hecho**, preserving paused items. Record applicable product decisions in the same PR.

The native `Status` field uses the Spanish values above. Keep `Prioridad` at P1, P2 or P3. `Zona` identifies web, chat, editorial, infra or docs. `Area`, `Tipo` and `Referencia` provide classification and context.

Keep sensitive data outside GitHub. The PR check is read-only. The Project write job reads `PROJECT_NUMBER` and `PROJECT_TOKEN` after a qualifying merge. Make focused commits in dependency order, include relevant tests and use `Refs #N` in commit bodies where useful.
