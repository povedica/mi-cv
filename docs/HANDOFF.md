# Traspaso de AI Professional Twin

## Estado a 18 de noviembre de 2026

Astro sirve el perfil y la entrevista con la fotografía original. La vista previa permite añadir preguntas al historial de la página y borrarlas al cerrar. El contrato TypeScript de chat define sesiones, citas y abstención, y el filtro editorial tiene pruebas unitarias. Los dos ejemplos de conocimiento siguen siendo borradores privados. El BFF, la ingesta, el índice, el proveedor conversacional, la voz y el avatar siguen pendientes.

La iteración visual se comprobó en Chrome. Las [capturas de portada](screenshots/portada.jpg) y [entrevista](screenshots/entrevista.jpg) recogen el estado entregado. La compilación generó dos rutas y la inspección de la salida confirmó que los borradores quedaron fuera. Consulta [README](../README.md), [arquitectura](ARCHITECTURE.md) y [backlog](BACKLOG.md).

## Siguiente cambio acotado

Implementar un primer flujo de texto con sesión, pregunta y cierre siguiendo el contrato HTTP. Empezar por pruebas locales con contenido sintético aislado. Verificar atribución de citas, abstención sin evidencia, acceso a sesión y exclusión de registros privados. Conectar la interfaz al API cuando el flujo funcione y mantener la vista estática disponible si el servicio falla.

La activación con información profesional depende de la aprobación de Pablo para cada versión del corpus. Las decisiones sobre proveedor real, coste, voz y avatar quedan para sus etapas correspondientes.

## Git y tablero

El remoto público es [povedica/mi-cv](https://github.com/povedica/mi-cv) y el [tablero operativo](https://github.com/users/povedica/projects/3) es privado. El [protocolo](backlog/PROTOCOLO-BACKLOG.md) describe las transiciones y la automatización de PR. La primera subida de la aplicación queda pendiente de aprobación del retrato, los textos biográficos y las capturas que los muestran. Los ejemplos de conocimiento permanecen en el checkout local, excluidos de Git.

La configuración remota de Actions usa `PROJECT_NUMBER=3` y el secreto `PROJECT_TOKEN`. Están habilitados el escaneo de secretos, la protección de push y los avisos privados de vulnerabilidades. Comprueba una PR de prueba tras la primera subida para validar el workflow en GitHub.

La auditoría de producción del lockfile actual devuelve una alerta crítica en Astro, tres altas y una baja. npm propone una actualización mayor de Astro. La migración queda como tarea de mantenimiento separada.

OpenSpec 2.1.0 está fijado como dependencia de desarrollo e inicializado para Codex y Cursor. El [flujo de OpenSpec](WORKFLOWS.md#openspec) explica cómo proponer un cambio y enlazarlo con su issue.

El entorno de desarrollo Docker usa Compose Watch y publica Astro solo en loopback. El archivo `.env.example` documenta el puerto local. El [inventario de configuración](WORKFLOWS.md#variables-de-entorno-y-secretos) distingue los valores locales, las variables de Actions y el secreto de Projects.
Verificado en Colima: la portada y la entrevista respondieron por HTTP, `npm run verify` pasó dentro del contenedor y Compose Watch sincronizó un archivo nuevo. Una prueba con datos simulados confirmó que el contenedor excluye `.env`, el token de Projects y los borradores.
