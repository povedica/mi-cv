# Protocolo del backlog de mi-cv

GitHub Projects refleja el estado de las tareas. [El roadmap](../BACKLOG.md) conserva hitos y criterios de aceptación. [Decisiones](DECISIONES.md) recoge las decisiones aprobadas que se puedan publicar.

1. Crea una issue pública con la plantilla de backlog y añádela a «mi-cv · backlog» en Ideas. Recoge decisiones pendientes en la issue si se pueden compartir.
2. Pasa la tarjeta a Listo para hacer cuando cumpla la [DoR](DOR.md). Antes de reclamarla, revisa Pausada y comprueba que ninguna tarjeta activa de la misma Zona vaya a solapar el cambio.
3. Al reclamar, indica Agente y Rama, y pasa a En curso. Al preparar la PR para revisión, usa `Closes #N` en la primera línea y pasa a En revisión. Si hay un bloqueo, pasa a Pausada y registra cuándo se puede retomar.
4. Aplica la [DoD](DOD.md) antes de fusionar. El workflow mueve a Hecho las issues del repositorio cerradas por una fusión, conservando Pausada.
5. Registra las decisiones aprobadas en la PR correspondiente. Las propuestas descartadas cierran su issue con el motivo y pasan a Hecho.

Los estados del campo nativo `Status` son Ideas, Listo para hacer, En curso, Pausada, En revisión y Hecho. Prioridad usa P1, P2 y P3. Zona identifica web, chat, editorial, infra o docs. Area y Tipo clasifican la tarea. Agente, Rama y Referencia enlazan el trabajo con su responsable y su especificación.

Los datos sensibles permanecen fuera del tablero y de las issues. La sincronización de escritura usa el secreto de Actions `PROJECT_TOKEN` y la variable `PROJECT_NUMBER`. La validación de PR es de solo lectura. La escritura en Projects se ejecuta únicamente tras una fusión y usa los scripts de la rama base del evento.

En una misma PR, usa commits parciales por propósito y en orden de dependencias. Revisa el diff preparado antes de cada commit y conserva junto a cada cambio las pruebas que lo cubren. Si existe una issue, puedes enlazarla con `Refs #N` en el cuerpo del commit.
