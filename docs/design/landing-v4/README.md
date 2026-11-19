# Diseño aprobado de la landing · v4 (19/11/2026)

Maqueta estática (HTML + CSS, sin framework) aprobada por Pablo para la landing de cv.reflexionia.com. Es la **referencia visual** de la issue #5. No es código de producción: el agente que implemente debe trasladarla a Astro (`src/pages/index.astro`, `src/styles/global.css`) usando los textos de `docs/LANDING-COPY.md`.

- `index.html`: tema automático (claro por defecto, oscuro con `prefers-color-scheme: dark`).
- Temas forzados para revisar: añade al `<html>` la clase `theme-light`, `theme-dark` (azul noche, por defecto en oscuro) o `theme-dark-black` (negro, alternativa).
- `template.html` + `build.sh`: `index.html` se genera desde la plantilla.
- `assets/styles.css`: todos los tokens de color están al principio (sección *themes*).
- `assets/fonts/`: Geist y Geist Mono (woff2, subconjunto latin), licencia SIL OFL 1.1 (`OFL-Geist.txt`).
- `shots/`: capturas de referencia (1280×800, 1440×900, 390×844; claro, oscuro azul noche y oscuro negro).

Ábrelo en local con cualquier servidor estático, por ejemplo `npx serve docs/design/landing-v4`.
