# Backlog y plan de ejecución

## Hito 0 — Portada y entrevista estática
- [x] Crear proyecto Astro.
- [x] Home responsive alineada con el boceto.
- [x] Incorporar fotografía original como placeholder.
- [x] Ruta propia de entrevista con chat de demostración claramente identificado.
- [x] Añadir documentación y guía para agente.
- [x] Añadir modalidades, historial local y cierre accesible de la vista previa.
- [ ] Revisar copy y composición en Mac y móvil con propietario.
- [ ] Aprobar publicación de fotografía y textos.

## Hito 1 — Contenido profesional
- [x] Esquema editorial, borradores iniciales, filtro de publicación y pruebas.
- [ ] Crear/validar 30–50 fragmentos en `knowledge/drafts`.
- [ ] Revisar qué hechos son públicos; evitar datos personales y confidenciales.
- [ ] Cronología verificada en landing, enlaces y CV.
- [ ] SEO, OpenGraph y sitemap cuando se decida dominio.

**Aceptación:** los hechos visibles son aprobados, se puede navegar sin IA, no hay enlaces ficticios.

## Hito 2 — Agente chat real
- [x] Contrato de sesión, mensajes, citas y cierre.
- [ ] BFF protegido con rate limiting y variables de entorno.
- [ ] Ingesta pública versionada y búsqueda FTS + embeddings si hace falta.
- [ ] Agente con evidencia, respuesta/abstención y trazabilidad.
- [ ] Persistencia de sesión temporal sin almacenar mensajes por defecto.
- [ ] Conectar la vista previa de chat a la API real.
- [ ] Suite de evaluación: preguntas conocidas, sin respuesta, sensibles, ataques.

**Aceptación:** respuestas fundamentadas, sin fugas, con límites de coste.

## Hito 3 — Voz
- [ ] Comparar modelo realtime vs pipeline STT/LLM/TTS.
- [ ] Implementar WebRTC, permisos, turnos, interrupción y subtítulos.
- [ ] Reutilizar agente/RAG del chat, con Fallback al texto.
- [ ] Pruebas de latencia, español/inglés, accesibilidad y errores.

## Hito 4 — Avatar
- [ ] Obtener material de vídeo y consentimientos.
- [ ] Prueba de dos proveedores con *la imagen de Pablo* y voz propia/sintética.
- [ ] Comprobar API, coste, lipsync, latencia, contrato y apagado de sesión.
- [ ] Elegir proveedor y conectar adaptador audiovisual.
- [ ] Mantener etiqueta permanente «Avatar generado por IA».

## Hito 5 — Backoffice y despliegue
- [ ] Login con MFA y roles.
- [ ] Workflow draft/review/approved/published y rollback.
- [ ] Métricas agregadas, budget guard, kill switch, retención.
- [ ] Privacidad, legal, revisión de accesibilidad.
- [ ] CI/CD y entorno staging/producción.
