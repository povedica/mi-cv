# Instrucciones para Codex y Cursor

## Objetivo
Construir una identidad profesional interactiva: web navegable + entrevista conversacional futura basada en conocimiento editorial aprobado, voz y avatar propios. La portada y la vista previa local de entrevista funcionan. El agente de IA está pendiente.

## Restricciones
1. No inventar biografía, empleos, métricas, logros, preferencias actuales, correos ni URLs.
2. No exponer documentos privados. Todo conocimiento visible o recuperable debe tener aprobación explícita y `visibility=public`.
3. No presentar foto estática como vídeo-avatar en funcionamiento.
4. Nunca decir que Pablo está conectado en directo cuando habla una IA.
5. No desplegar API keys permanentes en el navegador.
6. Separar conocimiento, agente, voz y motor de avatar mediante interfaces.
7. No añadir proveedores de pago sin validar coste, API, consentimiento y sustitución.
8. Mantener fallback a web estática/chat si los servicios de IA fallan.
9. Respetar accesibilidad (WCAG 2.2 AA como objetivo), mobile first y reducción de movimiento.
10. Crear tests para cada comportamiento significativo, especialmente grounding y privacidad.

## Modo de trabajo
- Leer `README.md`, `docs/ARCHITECTURE.md` y `docs/BACKLOG.md` antes de modificar.
- Entregar cambios pequeños, verificables y con descripción de decisiones.
- Ejecutar `npm run build` antes de concluir una iteración.
- Mantener explícito qué funciona de verdad y qué es una demo.
- Pedir confirmación humana antes de publicar contenidos biográficos o activar costes recurrentes.
- No incorporar simultáneamente RAG, voz y avatar sin validar cada capa.

## Primera prioridad
Continuar según el backlog. El siguiente hito conecta el chat de texto a un BFF con corpus aprobado. Ejecutar `npm run check` y `npm test` además de la compilación.

## Continuidad local

- Consultar `docs/HANDOFF.md` para el estado actual y `docs/WORKFLOWS.md` para elegir una skill.
- Ejecutar `npm run verify` como comprobación común de la entrega.

## Backlog en GitHub Projects

- Consulta el [tablero mi-cv · backlog](https://github.com/users/povedica/projects/3) y el [protocolo](docs/backlog/PROTOCOLO-BACKLOG.md) al retomar una tarea, reclamarla o abrir o fusionar una PR. Lee la [skill compartida](.agents/skills/backlog-github-projects/SKILL.md).
- El tablero lleva el estado operativo. `docs/BACKLOG.md` conserva el roadmap. Actualiza `docs/HANDOFF.md` y registra las decisiones publicables en `docs/backlog/DECISIONES.md`.
- Revisa el diff y los adjuntos antes de subir cualquier rama. Los borradores, las fuentes privadas y las credenciales quedan fuera del historial. La publicación inicial requiere aprobación expresa del texto biográfico y del retrato.

## Trazabilidad de Git

- Divide cada entrega en commits por propósito. Cada commit debe explicar qué cambia y dejar juntas la implementación y las pruebas que la verifican.
- Prepara solo los archivos o fragmentos del cambio, revisa `git diff --cached` y escribe un mensaje concreto. Mantén el orden de dependencias entre commits.
- Enlaza la issue con `Refs #N` en el cuerpo del commit cuando exista. Usa `Closes #N` en la PR que completa la tarea.

- Crea los worktrees con `./scripts/worktree.sh <rama> [base]`. En este equipo quedan bajo `~/Projects/mi-cv-worktrees`. Usa [el flujo local](docs/WORKFLOWS.md#worktrees) para iniciar Docker en cada checkout.
