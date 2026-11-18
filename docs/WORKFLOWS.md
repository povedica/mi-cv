# Flujos de trabajo para Codex y Cursor

## Arranque local

1. Abre `mi-cv` como carpeta raíz en Codex local o Cursor. Usa Node.js 22.20 o superior de la serie 22 para coincidir con CI y ejecutar OpenSpec.
2. Ejecuta `npm ci` la primera vez y luego `npm run verify`. Inicia la web con `npm run dev -- --host 127.0.0.1` y abre http://localhost:4321/.
3. Usa el remoto `povedica/mi-cv` y consulta el tablero antes de empezar una iteración. Guarda los borradores fuera del historial público.

## Worktrees

Crea una rama de trabajo con un checkout independiente desde la raíz:

```bash
worktree="$(./scripts/worktree.sh feat/chat-texto)" && cd "$worktree"
docker compose up --build -d --wait
docker compose port web 4321
```

El script crea el checkout en `~/Projects/mi-cv-worktrees` cuando el repositorio principal está en `~/Projects/mi-cv`. Usa `main` local como base para ramas nuevas. Puedes indicar otra base como segundo argumento, por ejemplo `origin/main` después de un fetch. Para abrir una rama existente, indica solo la rama. El script también funciona desde otro worktree.

Cada checkout recibe un `.env` ignorado por Git con un nombre Compose propio y un puerto loopback asignado por Docker. Usa la dirección que devuelve `docker compose port` después de cada creación del contenedor. Para recarga durante el desarrollo, ejecuta `docker compose watch --no-up` con el servicio ya iniciado, o arráncalo directamente con `docker compose up --build --watch`. También puedes ejecutar `npm ci` dentro del checkout si necesitas las herramientas de Node en el host.

Usa `git worktree list` para localizar los checkouts. Para retirar uno, detén su Compose con `docker compose down` dentro del worktree y conserva cualquier configuración local que necesites. Desde otro checkout ejecuta `git worktree remove <ruta>` tras comprobar que los cambios están guardados. La rama se conserva.

## Variables de entorno y secretos

| Nombre | Tipo | Dónde se configura | Uso |
| --- | --- | --- | --- |
| `MI_CV_HOST_PORT` | Variable local, no sensible | Shell o `.env` local de Compose | Puerto del equipo. El valor por defecto es `4321`. |
| `COMPOSE_PROJECT_NAME` | Variable local, no sensible | `.env` generado en cada worktree | Aísla los servicios y la red de Compose por checkout. |
| `ASTRO_TELEMETRY_DISABLED` | Variable del contenedor, no sensible | Dockerfile (`1`) | Desactiva la telemetría de Astro. |
| `PROJECT_NUMBER` | Variable de GitHub Actions | Settings → Secrets and variables → Actions → Variables | Identifica el tablero para el workflow de backlog. |
| `PROJECT_TOKEN` | Secreto de GitHub Actions | Valor maestro en 1Password y copia operativa en Settings → Secrets and variables → Actions → Secrets | Autoriza la actualización del tablero después de fusionar una PR. |

`.env.example` solo contiene configuración local pública. Compose usa `.env` para interpolar el puerto y no lo inyecta en el contenedor. El desarrollo local actual no necesita secretos. Para futuras credenciales, guarda el valor en 1Password e inyéctalo únicamente en el proceso que lo consuma. Usa `vars` de Actions para configuración no sensible y `secrets` para credenciales. Mantén las credenciales fuera de variables `PUBLIC_*`, argumentos de build, imágenes, commits y logs.

El contexto Docker incluye una lista explícita de archivos de la aplicación. Los borradores editoriales, los archivos de entorno locales y el historial Git quedan fuera.

## Logs locales

Ejecuta `docker compose logs -f web` para ver Astro y los eventos JSON del módulo de trazabilidad. En desarrollo, la portada y la entrevista devuelven `X-Request-Id`; busca ese valor como `trace_id` para relacionar la respuesta con su ruta lógica, estado HTTP y duración. Las comprobaciones de salud usan HEAD. La compilación registra inicio y fin bajo el mismo identificador.

Los eventos propios excluyen URLs completas, consultas, IP, cabeceras y cuerpos. El despliegue actual es estático. Los logs de acceso tras el despliegue corresponden al alojamiento, según su configuración.

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
