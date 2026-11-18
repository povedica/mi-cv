# Pablo Poveda — AI Professional Twin (starter)

Web personal en Astro y vista previa de la entrevista profesional.

## Estado real

- ✅ Home responsive, navegación y secciones de contenido.
- ✅ Fotografía propia como imagen provisional (no avatar animado).
- ✅ Ruta `/interview/` y prototipo interactivo de interfaz de chat.
- ✅ Avisos de transparencia: **no hay IA, micrófono ni vídeo conectados**.
- ✅ Base de estructura y documentación para agentes de desarrollo.
- ⏳ Agente conversacional, RAG, voz, avatar y backoffice: **pendientes**.

**El prototipo de chat funciona únicamente en el navegador:** permite abrir una vista previa, añadir preguntas al historial y borrarlo al cerrar. Las preguntas se quedan en la página y el agente está pendiente.

## Continuar en Codex local o Cursor

Abre la carpeta raíz del proyecto y consulta [los flujos de trabajo](docs/WORKFLOWS.md) y [el traspaso](docs/HANDOFF.md).

## Desarrollo local con Docker

Con Docker Engine y Compose 2.22 o posterior:

```bash
docker compose up --build --watch
```

Abre `http://127.0.0.1:4321/`. Compose sincroniza el código con Astro y reconstruye la imagen al cambiar las dependencias. Si necesitas otro puerto, copia `.env.example` a `.env` y cambia `MI_CV_HOST_PORT`. Para ejecutar las comprobaciones dentro de la imagen, usa `docker compose run --rm web npm run verify`. Para retirar los contenedores de este entorno, usa `docker compose down`.

Consulta [la configuración y los secretos](docs/WORKFLOWS.md#variables-de-entorno-y-secretos).

## Arrancar en el Mac sin Docker

Requisitos: Node.js 22.20+ y npm para la aplicación y las herramientas de desarrollo.

```bash
npm run dev
```

En un entorno nuevo, instalar primero con `npm ci`. Abrir `http://localhost:4321`. Para generar la versión estática:

```bash
npm run build
npm run check
npm test
npm run preview
```

## Estructura

- `src/pages/index.astro`: landing principal.
- `src/pages/interview.astro`: prototipo de entrevista.
- `src/styles/global.css`: estilos responsive y diseño.
- `src/data/site.ts`: textos públicos editables.
- `public/images/pablo-portrait.jpg`: foto original proporcionada para este prototipo.
- `knowledge/drafts/`: esquema editorial y ubicación local de borradores excluidos de Git.
- `knowledge/publication.mjs`: filtro editorial para una futura ingesta pública.
- `src/data/chat-contract.ts`: tipos para el contrato HTTP descrito en arquitectura.
- `docs/ARCHITECTURE.md`: arquitectura objetivo y contratos.
- `docs/BACKLOG.md`: trabajo siguiente por entregas.
- `AGENTS.md`: instrucciones para Codex y otros agentes.

## Contribuir

Consulta la [guía de contribución](CONTRIBUTING.md) y el [protocolo de GitHub Projects](docs/backlog/PROTOCOLO-BACKLOG.md). Los avisos de seguridad se gestionan por el [canal privado](SECURITY.md).

## Seguridad y publicación

El despliegue actual es estático. No contiene secretos ni llamadas a LLM, avatar o servicios de voz. No se debe publicar información privada o de clientes sin autorización. Se recomienda revisar tanto textos como el uso público de la fotografía antes de desplegar la web.

## Próxima decisión

Validar diseño y texto de la landing; luego implementar servicio conversacional y corpus aprobado. La grabación para crear el avatar puede hacerse después, sin bloquear la web.

## Verificación de la primera iteración

- Astro generó dos rutas estáticas y `astro check` finalizó sin errores ni advertencias.
- Las pruebas del filtro editorial cubren la proyección pública, los estados y visibilidades excluidos, la versión de aprobación y la vigencia. La salida estática no contiene los borradores.
- En Chrome se comprobó que «Entrevístame» abre la entrevista, una sugerencia rellena el campo, la pregunta aparece en el historial y cerrar y reabrir deja el historial vacío.
- Se conserva Astro estático y se reutiliza el retrato disponible. Las modalidades de voz y avatar quedan pendientes.
