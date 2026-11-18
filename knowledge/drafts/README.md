# Corpus editorial

Cada fragmento contiene una afirmación o un caso verificable. Formato propuesto: Markdown con cabecera YAML. El cuerpo Markdown es el campo `body` del registro normalizado; el lector de archivos será parte de la ingesta futura.

| Campo | Uso |
| --- | --- |
| `id`, `version` | Identificador estable y revisión entera positiva |
| `title`, `kind`, `locale` | Título editorial, tipo (`role`, `project`, `capability`, `preference`) e idioma |
| `author`, `createdAt`, `source` | Autor, fecha y referencia interna para contrastar el contenido |
| `status` | `draft` → `review` → `approved` → `published` |
| `visibility` | `private` por defecto. `public` requiere conformidad explícita |
| `approval` | Nulo, o registro con `by`, `at` y `version` exacta revisada |
| `publishedAt`, `validFrom`, `validUntil` | Instantes UTC ISO con milisegundos o nulos. El final de vigencia es exclusivo |

Pablo revisa y aprueba el texto exacto y su visibilidad. Cualquier cambio crea una nueva versión en borrador con aprobación nula. Guardar fuentes internas fuera del índice y omitir datos confidenciales del cuerpo. La ingesta futura deberá resolver la última versión publicada por ID, revisar autenticidad y permisos del editor, validar los metadatos y aplicar `toPublicEvidence`. Revocaciones y expiraciones deben retirar el fragmento del índice y de cualquier caché. Los borradores de este directorio quedan fuera de la salida de Astro.
