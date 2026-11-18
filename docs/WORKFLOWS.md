# Flujos de trabajo para Codex y Cursor

## Arranque local

1. Abre `mi-cv` como carpeta raíz en Codex local o Cursor. Usa Node.js 22.20 o superior de la serie 22 para coincidir con CI y ejecutar OpenSpec.
2. Ejecuta `npm ci` la primera vez y luego `npm run verify`. Inicia la web con `npm run dev -- --host 127.0.0.1` y abre http://localhost:4321/.
3. Usa el remoto `povedica/mi-cv` y consulta el tablero antes de empezar una iteración. Guarda los borradores fuera del historial público.

## Codex local

Las reglas del proyecto están en `AGENTS.md`. Las skills de proyecto están en `.agents/skills`. Invoca `$twin-iteration` para retomar, `$twin-chat` para implementar el chat, `$twin-editorial` para trabajar el corpus o `$twin-verification` para verificar una entrega.

Mensaje para abrir la primera sesión:

> Lee AGENTS.md y docs/HANDOFF.md. Usa $twin-iteration para implementar el siguiente cambio acotado. Verifica el resultado y actualiza el traspaso.

## Cursor

Las reglas están en `.cursor/rules`. En el chat del agente puedes usar `/twin-resume`, `/twin-verify` o `/twin-editorial-review` si la versión de Cursor ofrece comandos de proyecto. Si un comando o skill no aparece, referencia su Markdown directamente con `@` o pide al agente que lo lea por ruta. Ambos editores comparten los mismos criterios en `AGENTS.md`.

## OpenSpec

Para un cambio que necesite acordar requisitos antes de implementarlo, usa `$openspec-propose` en Codex o `/openspec-propose` en Cursor. La propuesta, el diseño, los cambios de especificación y las tareas quedan en `openspec/changes/`. Si existe una issue, enlázala en la propuesta. GitHub Projects conserva el estado de la tarea.

Tras `npm ci`, ejecuta `npx --no-install openspec list` para consultar cambios y `npx --no-install openspec validate <cambio> --strict` para validar uno. Aplica y verifica el cambio antes de archivarlo. Las especificaciones vigentes quedan en `openspec/specs/`.

## Selección y cierre

| Trabajo | Flujo |
| --- | --- |
| Gestionar issues, ramas y PR | [Backlog en GitHub Projects](../.agents/skills/backlog-github-projects/SKILL.md) |
| Retomar una sesión o una tarea de backlog | [Iteración](../.agents/skills/twin-iteration/SKILL.md) |
| API, sesiones, retrieval, respuestas y citas | [Chat](../.agents/skills/twin-chat/SKILL.md) |
| Borrador, revisión, aprobación y vigencia | [Editorial](../.agents/skills/twin-editorial/SKILL.md) |
| Tests, compilación, navegador y evidencia | [Verificación](../.agents/skills/twin-verification/SKILL.md) |

Al terminar, registra alcance, decisiones, archivos, comandos y resultados en el traspaso si cambió el estado del proyecto. Actualiza el backlog cuando se cumpla un criterio de aceptación. Verifica primero el flujo afectado y luego ejecuta `npm run verify`.
