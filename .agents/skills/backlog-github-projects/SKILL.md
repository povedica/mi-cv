---
name: backlog-github-projects
description: Gestionar el tablero mi-cv · backlog en GitHub Projects, desde la selección de una issue hasta la fusión de su PR.
---

# GitHub Projects

Lee el protocolo de `docs/backlog/PROTOCOLO-BACKLOG.md`, la DoR y la DoD. El tablero es el Project 3 de povedica. Antes de empezar, revisa las tarjetas pausadas, los bloqueos y la Zona. Si vas a retomar una pausa, coordina la decisión con Pablo.

## Acceso local

En una sesión Bash en el equipo de Pablo, usa credenciales distintas por operación. Lee los archivos al ejecutar el comando. Mantén el trazado de shell desactivado.

```bash
repo=povedica/mi-cv
project=3
ghr() { GH_TOKEN="$(cat /Users/pablo/Projects/tokens/airbook13m5_gh.txt)" gh "$@"; }
ghp() { GH_TOKEN="$(cat /Users/pablo/Projects/tokens/grokbot_classic.txt)" gh "$@"; }
ghp project item-list "$project" --owner @me --limit 100 --format json
fields="$(ghp project field-list "$project" --owner @me --format json --limit 100)"
pid="$(ghp project view "$project" --owner @me --format json --jq .id)"
```

## Operaciones

- Para una idea, crea la issue con `ghr issue create --repo "$repo" --body-file <archivo>`. Añádela con `ghp project item-add "$project" --owner @me --url <url>` y selecciona Ideas.
- Para editar estados y campos, usa la interfaz del tablero o `ghp project item-edit --id <item-id> --project-id "$pid" --field-id <field-id>` con `--single-select-option-id <option-id>` o `--text <valor>`. Obtén los IDs de los listados anteriores. Verifica el repositorio y número de issue antes de mutar.
- Reclama una tarjeta de Listo para hacer, registra Agente, Rama y Zona y pásala a En curso. Crea la rama desde la base actualizada. Usa un worktree cuando haga falta aislar el trabajo.
- Abre la PR en borrador con `Closes #N` como primera línea. Usa En revisión cuando esté lista. Una fusión mueve a Hecho las issues asociadas de este repositorio, salvo las pausadas.
- Si cambió una decisión, actualiza `docs/backlog/DECISIONES.md` en la misma PR. Si se pausa una tarjeta, registra el motivo y la condición para retomarla.
- Aplica `sin-backlog` a cambios operativos que no requieren una issue. Publica solo material autorizado.
