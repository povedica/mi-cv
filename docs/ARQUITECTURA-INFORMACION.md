# Arquitectura de información de cv.reflexionia.com

Guía para organizar toda la información del CV de Pablo en la web y en el chat. Borrador para que Pablo lo revise. La usan las tarjetas BKL-002 (landing completa, con textos en `docs/LANDING-COPY.md`), BKL-004 (corpus de contenido), BKL-011 (interfaz del chat) y BKL-014 («Cómo está hecho»).

Fuentes: CV v7 ES/EN, `cv-maestro.md`, `linkedin-en-v2.md` y el CV público EN `Pablo-Poveda-Ortega-CV-EN.pdf` (ficheros privados de Pablo, que los aporta en el momento), la [spec del avatar](https://github.com/povedica/mi-cv/issues/7#issuecomment-6993523286) y el [banco de 412 preguntas](https://github.com/povedica/mi-cv/issues/7#issuecomment-6993522403) (adjuntos en #7). Los datos que no estaban en esas fuentes (charlas, webinar, WordCamp, aficiones y fechas de formación) los confirmó Pablo el 18/11/2026. Los textos finales están en `docs/LANDING-COPY.md`.

---

## 1. Principios

1. **Una sola fuente de verdad.** Cada hecho vive en un fragmento editorial aprobado. La web estática y el chat leen esos mismos fragmentos, así que nada se escribe dos veces (ver §6).
2. **Sin IA también funciona.** La web tiene que contar la historia completa sin abrir el chat. El chat profundiza y nunca es la única puerta.
3. **Lo importante, primero.** En 10 segundos tiene que quedar claro quién es, qué rol busca, qué ha conseguido y cómo contactarle.
4. **Nada a medias a la vista.** No se enseñan textos «pendiente» ni «próximamente». Lo que no está listo, no se muestra. La única excepción son los modos de voz y avatar dentro de `/interview/`, con una etiqueta neutra y sin prometer fechas.
5. **Honestidad.** Ni métricas inventadas ni hechos sin fuente. La divulgación de IA siempre visible en el chat.

---

## 2. Audiencias y qué necesitan en los primeros 10 segundos

| Audiencia | Su objetivo | Lo que tiene que ver en 10 s | Acción que buscamos |
|---|---|---|---|
| **Recruiter técnico** | Filtrar rápido: rol, seniority, modalidad, palabras clave | Titular «Engineering Manager», palabras clave (Technical Leadership, Software Delivery, AI Engineering), Madrid/remoto, botón **Descargar CV** | Descargar CV, LinkedIn, contacto |
| **Hiring manager / CTO** | Saber si puede liderar equipos y entregar, y cómo piensa | Logros clave (de 1 a 20 personas, unos 30 proyectos, IA generativa en el desarrollo), botón **Entrevístame** | Entrevista (chat), trayectoria, casos |
| **Headhunter** | Encaje con perfiles que tiene abiertos y disponibilidad | Rol objetivo, sectores y tamaño de equipos, enlace a LinkedIn | LinkedIn, contacto |
| **Colegas y comunidad** | Ver qué hace, proyectos y charlas | Sección IA, proyectos (tick-tack-done, este avatar), WordCamp | GitHub, «Cómo está hecho», contacto |

---

## 3. Mapa de páginas y orden de secciones

### 3.1. Portada (`/` y `/en/`)

| # | Sección | Contenido (solo hechos de las fuentes) | Profundidad |
|---|---|---|---|
| 1 | **Hero** | Nombre · titular: «Engineering Manager · Technical Leadership · Software Delivery · AI Engineering» (versión corta del titular de LinkedIn) · una frase: lidera, gestiona y escala equipos técnicos, mejora la entrega de software e incorpora la IA generativa al desarrollo · Madrid (remoto) · CTA: **Entrevístame**, **Descargar CV** (ES/EN), **LinkedIn**, **Contacto** · retrato | Por encima del pliegue |
| 2 | **Logros clave** | Los 4 del CV: escaló un departamento de ingeniería de 1 a 20 profesionales · lideró una cartera de unos 30 proyectos · desplegó soluciones corporativas para miles de usuarios · incorporó la IA generativa al desarrollo, con alrededor de un 30 % más de valor entregado | Por encima del pliegue en escritorio; justo debajo en móvil |
| 3 | **Qué hago** (áreas) | 4 tarjetas: Liderazgo y equipos · Entrega de software y calidad · IA aplicada al desarrollo · Trayectoria técnica (PHP, plataformas web, CI/CD). La arquitectura no va como tarjeta propia | Primer scroll |
| 4 | **IA aplicada** | Máster en AI Engineering (LIDR, 2026: aplicaciones con LLM, RAG, CAG, agentes y evaluación) · adopción de IA generativa en VASS, junto con otros responsables, con un flujo y un harness asistidos por IA y alrededor de un 30 % más de valor entregado · tick-tack-done con su servidor MCP · este avatar como demo (solo cuando el chat funcione) | Primer o segundo scroll |
| 5 | **Trayectoria** | Línea de tiempo con 5 etapas (§3.2), 2–3 logros por rol | Segundo scroll; detalle desplegable |
| 6 | **Proyectos y casos** | 5 tarjetas (§3.3) | Segundo scroll |
| 7 | **Formación y certificaciones** | §3.4, con PDF donde lo haya | Profundo |
| 8 | **Charlas y comunidad** | §3.5 | Profundo |
| 9 | **Habilidades** | Bloque «Artificial Intelligence & GenAI» primero, luego liderazgo, tecnologías y calidad (textos del CV v7) | Profundo |
| 10 | **Idiomas** | Español nativo · Inglés profesional (B2 acreditado, First Certificate) | Profundo |
| 11 | **Sobre mí** | Frase del perfil: «Empecé programando web y, con los años, aprendí que los buenos proyectos salen de buenos equipos», qué le motiva hoy (cómo la IA cambia la forma de desarrollar). Fuera del trabajo: padre de gemelos (sin nombres); deportes de montaña, rugby y viajar | Profundo |
| 12 | **CV y contacto** | Descargar CV ES/EN · LinkedIn · canal de contacto (§3.6) | Final, y repetido en el pie |

Pie: LinkedIn, GitHub (`github.com/povedica`), CV, privacidad y aviso de IA cuando el chat esté activo.

### 3.2. Trayectoria: roles, fechas y métricas aprobadas

| Etapa | Fechas | Logros y métricas que se pueden usar |
|---|---|---|
| VASS · Manager de departamento Digital Experience (Open Source PHP) | may 2024 – nov 2026 | Dirección del departamento con responsabilidad sobre resultados económicos y cartera · equipos de 15–20 personas · adopción de IA generativa con alrededor de un 30 % más de valor entregado · nuevos clientes a partir de proyectos iniciales · proyectos transversales · plataforma de loyalty de una operadora de telecomunicaciones (sin nombre) |
| VASS · Team Lead / Tech Lead del departamento | sep 2020 – abr 2024 | De 1 a 20 profesionales (proceso de selección y pruebas técnicas) · Scrum y XP, estándares de calidad, revisión automática, logs y métricas de incidencias · unos 30 proyectos · intranet para miles de empleados · 3 promociones · rentabilidad superior a la prevista · preventas |
| UNIR · Senior PHP Developer | abr 2017 – may 2020 | Colideró el núcleo de la plataforma de contenidos (WordPress) de los portales en 6 países · equipo de 4 a 10 personas · CI/CD y contenedores, entregas alrededor de un 40 % más rápidas · Máster en DevOps y Cloud |
| Evolufarma · Senior Web Developer | abr 2014 – jun 2017 | Plataforma SaaS de marketing para farmacias (webs, tienda, panel, API, campañas de email, backend de app) · lideró a 3 desarrolladores junior · Kanban para incidencias y mantenimiento |
| Logiqo · Desarrollador web → Senior PHP Developer | oct 2008 – mar 2014 | Webs para telecomunicaciones, educación y seguros, con retargeting y test A/B · ascenso a Senior en el primer año |

Cifras que **no** se usan (acordado en el CV): margen en puntos, % sobre objetivo, % de reducción de incidencias, presupuestos, nº de farmacias o de visitas. En la web se dice «miles de usuarios/empleados» y no 12.000.

### 3.3. Proyectos y casos destacados

| Caso | Qué contar | Fuente |
|---|---|---|
| Intranet web y móvil para miles de empleados de una cadena nacional de supermercados | Dirección de principio a fin, coordinación de equipos, API REST y requisitos de seguridad con el IT del cliente. Sin nombre del cliente | CV v7 (VASS) |
| Plataforma de contenidos de los portales internacionales de UNIR | Producto interno desde cero sobre WordPress, 6 países, equipo de 4 a 10, CI/CD y contenedores, ~40 % | CV v7 (UNIR) |
| SaaS de marketing para farmacias (Evolufarma) | Plataforma que generaba las webs de las farmacias, con tienda y catálogo común, panel, API, campañas y app | CV v7 |
| tick-tack-done | Proyecto personal (`todo.reflexionia.com`) con servidor MCP para agentes. Sin más detalle técnico que el de `docs/LANDING-COPY.md` | Spec del avatar, conversación con Pablo |
| Este avatar | La propia web como caso de RAG con citas, guardrails, evals y control de coste. Se publica cuando el chat funcione y enlaza a «Cómo está hecho» | Spec del avatar |

En el CV no se nombra tick-tack-done; en la web sí, como proyecto personal.

### 3.4. Formación y certificaciones

| Título | Centro | Año | PDF |
|---|---|---|---|
| Máster en AI Engineering | LIDR | Finalizado en septiembre de 2026 | `LIDR-AI-Engineering-certificate.pdf` |
| Programa de liderazgo técnico LIDR Ignite | LIDR | 2022 | `LIDR-Ignite-certificate.pdf` |
| Máster en DevOps y Cloud | UNIR | 2019 | `UNIR-DevOps-master-title.pdf` |
| Ingeniería Técnica en Informática de Gestión | Universidad de Alicante | 2003–2008 | — |

Antes de publicar los PDF, revisar que no lleven DNI ni otros datos personales. El máster de UNIR se muestra sin nota.

### 3.5. Charlas y comunidad

- Organizador principal de WordCamp Madrid 2019 (ago 2018 – abr 2019): en La Nave, el WordCamp más grande de España hasta entonces, 600 asistentes, entradas agotadas tres semanas antes y Contributor Day en Google for Startups.
- Charlas en WordPress.tv: «El factor humano» (2017), «KISS: cultura de plugins, buenas prácticas» (2017), «Trabajo en equipo: cuando cada maestrillo tiene su librillo» con Pablo López (2018), clausura de WordCamp Madrid 2019 y «Hablemos de rendimiento» (2022). Las URL se comprueban en wordpress.tv al implementar.
- Webinar «Ecosistemas Digitales Interconectados: La Nueva Frontera de la Competitividad Empresarial» (24/09/2025) con Ibexa, Infinitum Digital y VASS, junto a José Cuenca (Ibexa) y Alex Net (Infinitum).

### 3.6. Contacto

LinkedIn como canal principal desde el primer día. El email y el teléfono no se publican. Un formulario de contacto vendrá con el BFF (spec §34.1) y necesita la decisión de qué se guarda (DEC-010).

### 3.7. Otras rutas

| Ruta | Para qué |
|---|---|
| `/interview/` · `/en/interview/` | Entrevista: chat; voz y avatar cuando existan |
| `/como-esta-hecho/` · `/en/how-its-built/` | Caso técnico del avatar (BKL-014) |
| `/privacidad/` · `/en/privacy/` | Aviso de privacidad y de IA (BKL-011) |
| `/cv/Pablo-Poveda-Ortega-CV-ES.pdf` · `/cv/Pablo-Poveda-Ortega-CV-EN.pdf` | CV público sin email ni teléfono |
| `/certificados/*.pdf` | Títulos (§3.4) |

---

## 4. Qué va por encima del pliegue y qué va más abajo

- **Por encima del pliegue (móvil y escritorio):** nombre, titular, frase de valor, los 4 CTA y el retrato. En escritorio también los 4 logros.
- **Primer scroll:** logros (en móvil), áreas e IA.
- **Más abajo:** trayectoria con detalle desplegable por rol, casos, formación, charlas, habilidades, idiomas y sobre mí.
- **Solo en el chat:** el detalle largo (historias, opiniones, respuestas canónicas). El chat cita los fragmentos y enlaza a la sección de la web correspondiente.

---

## 5. Español e inglés

- El español es la versión por defecto en `/`; el inglés vive en `/en/` con las mismas secciones y anclas traducidas.
- Selector de idioma visible en la cabecera. Enlaces `hreflang` (`es`, `en`, `x-default` → `/`) y `<html lang>` correcto en cada página.
- El CV se ofrece en los dos idiomas desde cualquier versión.
- Cada fragmento existe en ES y EN con el mismo `id` y `locale` distinto. El chat responde en el idioma de la pregunta (spec §25), pendiente de DEC-008.
- Los términos de IA se mantienen en inglés también en español («AI Engineering», «RAG», «LLM Applications»), igual que en el CV, porque los ATS y los recruiters los buscan así.

---

## 6. Fragmentos: la misma fuente para la web y el chat

Esquema basado en el formato editorial que ya tiene el repo (`knowledge/drafts/README.md`), con tres campos más (`topic`, `period`, `section`):

| Campo | Uso |
|---|---|
| `id`, `version` | Identificador estable y revisión |
| `locale` | `es` o `en` |
| `kind` | `role`, `project`, `capability`, `preference`, más `achievement`, `education`, `talk`, `canonical` (respuesta fija) y `deflection` (desvío) |
| `topic` | trayectoria, liderazgo, entrega, ia, proyectos, formacion, comunidad, motivacion, sensible |
| `period` | Fechas del rol o del hecho (`2020-09/2024-04`) |
| `section` | Dónde se pinta en la web (`hero`, `logros`, `areas`, `ia`, `trayectoria`, `casos`, `formacion`, `charlas`, `habilidades`, `idiomas`, `sobre-mi`) o `chat-only` |
| `status`, `visibility`, `approval` | `draft → review → approved → published`; `private` por defecto; aprobación con versión exacta |
| `validFrom`, `validUntil` | Vigencia |
| `source` | Referencia interna (CV v7, LinkedIn v2). No se publica |

Reglas:
- La web estática lee en el build los fragmentos `published` + `public` y los pinta según `section`. El chat indexa esos mismos fragmentos y cita `id` + `version`.
- Si un fragmento se revoca o caduca, desaparece de la web en el siguiente build y del índice y la caché del chat.
- Los borradores viven fuera de Git. En el repo solo entran fragmentos aprobados por Pablo.
- Objetivo inicial: entre 30 y 50 fragmentos por idioma, repartidos por `topic`.

---

## 7. Reglas de estilo

1. Primera persona y pasado («lideré», «hice crecer»), con plural cuando lo hizo el equipo. Pendiente de confirmar en DEC-007.
2. Solo métricas de las fuentes: de 1 a 20, 15–20 personas, unos 30 proyectos, miles de usuarios, de 4 a 10, 6 países, ~40 % (UNIR), ~30 % (IA, estimación de Pablo), 3 promociones, 3 desarrolladores, 600 asistentes. Con «alrededor de» cuando es una estimación.
3. La arquitectura no se presenta como especialidad: puede aparecer como parte de un rol («participé en el diseño de…»), pero no en titulares, tarjetas de áreas ni preguntas sugeridas.
4. Sin nombres de clientes; solo el sector («una cadena nacional de supermercados»).
5. Sin «pendiente», «próximamente» ni «en desarrollo» en la portada.
6. Sin datos personales: ni email, ni teléfono, ni dirección.
7. Frases cortas, sin jerga de consultora («transformación digital»).
8. «Open Source PHP» con espacio; «Engineering Manager» como titular, nunca «IT Manager».

---

## 8. Accesibilidad y SEO básicos

- WCAG 2.2 AA, como ya pide AGENTS.md: jerarquía de encabezados (un `h1` por página), contraste, foco visible, navegación por teclado, `prefers-reduced-motion` y texto alternativo en el retrato.
- La línea de tiempo usa una lista semántica (`ol`), y los desplegables usan `details/summary` o botones con `aria-expanded`.
- Enlaces de descarga con el formato y el idioma en el texto («Descargar CV en PDF (español)»).
- SEO: `title` y `description` por página e idioma, URL canónica, OpenGraph y Twitter card con imagen, `sitemap.xml`, `robots.txt`, `hreflang`, y datos estructurados `Person` (nombre, cargo, `sameAs` LinkedIn y GitHub).
- Rendimiento: mantener los 100 de Lighthouse que tiene hoy (docs/QUALITY.md) y no cargar el JS del chat en la portada.
