# Textos de la landing de cv.reflexionia.com (ES / EN)

Versión 1.0 · 18/11/2026 · Aprobada por Pablo como base (se irá puliendo). Fuente de los textos de BKL-002. Por defecto: entrevista versión A, voz y avatar con «En desarrollo», rugby como está.
Estructura y reglas: `docs/ARQUITECTURA-INFORMACION.md`. Fuentes: CV v7 ES/EN, `linkedin-en-v2.md`, `cv-maestro.md` (ficheros privados de Pablo, no están en el repo) y los datos que Pablo confirmó el 18/11/2026.

**Instrucciones para el agente que lo implementa**
- Copia los textos literalmente. Si una frase no cabe en el diseño, pide el cambio en la issue; no la reescribas.
- La versión española va en `/` y la inglesa en `/en/`. Usa los ids de sección de la tabla y guarda los textos como ficheros de contenido (p. ej. `src/content/landing/es.*` y `en.*`), no metidos dentro de los componentes. BKL-004 los migrará después a fragmentos.
- No hay email ni teléfono en ningún sitio. El contacto va por LinkedIn.
- Mantén el estilo visual actual. Las secciones nuevas reutilizan los componentes que ya existen (tarjetas, statement, topic-grid).
- `→` en un CTA indica el destino del enlace; no se muestra.

| # | Sección | id ES | id EN |
|---|---|---|---|
| 0 | Meta y OpenGraph | — | — |
| 1 | Cabecera (navegación) | — | — |
| 2 | Hero | `inicio` | `home` |
| 3 | Logros clave | `logros` | `achievements` |
| 4 | Qué hago | `areas` | `focus` |
| 5 | IA aplicada | `ia` | `ai` |
| 6 | Trayectoria | `trayectoria` | `experience` |
| 7 | Proyectos y casos | `casos` | `projects` |
| 8 | Formación y certificaciones | `formacion` | `education` |
| 9 | Charlas y comunidad | `charlas` | `talks` |
| 10 | Habilidades | `habilidades` | `skills` |
| 11 | Idiomas | `idiomas` | `languages` |
| 12 | Sobre mí | `sobre-mi` | `about` |
| 13 | Entrevista (teaser) | `entrevista` | `interview` |
| 14 | CV y contacto | `cv-contacto` | `cv-contact` |
| 15 | Pie | — | — |

---

## 0. Meta y OpenGraph

| Campo | ES (`/`) | EN (`/en/`) |
|---|---|---|
| `<title>` | Pablo Poveda · Engineering Manager · AI Engineering | Pablo Poveda · Engineering Manager · AI Engineering |
| `meta description` | Engineering Manager con más de 15 años en desarrollo de software. Lidero y escalo equipos de ingeniería, mejoro la entrega de software e incorporo la IA generativa al desarrollo. | Engineering Manager with 15+ years in software development. I lead and scale engineering teams, improve software delivery and bring generative AI into development. |
| `og:title` | Pablo Poveda · Engineering Manager | Pablo Poveda · Engineering Manager |
| `og:description` | De desarrollador web a dirigir un departamento de ingeniería de 20 personas. Liderazgo técnico, entrega de software e IA generativa. Entrevístame. | From web developer to running a 20-person engineering department. Technical leadership, software delivery and generative AI. Interview me. |
| `og:image:alt` | Pablo Poveda, Engineering Manager | Pablo Poveda, Engineering Manager |
| `og:locale` | es_ES (alternativa en_GB) | en_GB (alternativa es_ES) |
| JSON-LD `Person` | name «Pablo Poveda Ortega», jobTitle «Engineering Manager», address Madrid (ES), sameAs: https://www.linkedin.com/in/pablo-poveda-ortega/ y https://github.com/povedica | igual |

Página de entrevista:

| Campo | ES (`/interview/`) | EN (`/en/interview/`) |
|---|---|---|
| `<title>` | Entrevista · Pablo Poveda | Interview · Pablo Poveda |
| `meta description` | Haz tus preguntas a una IA de Pablo Poveda que responde solo con información profesional que él ha revisado. | Ask your questions to an AI version of Pablo Poveda that answers only from professional information he has reviewed. |

---

## 1. Cabecera (navegación)

| Elemento | ES | EN |
|---|---|---|
| Marca | Pablo Poveda | Pablo Poveda |
| Enlaces | Trayectoria · Proyectos · IA · Charlas · CV y contacto | Experience · Projects · AI · Talks · CV & contact |
| Botón | Entrevístame | Interview me |
| Selector de idioma | EN (aria-label «Read in English») | ES (aria-label «Leer en español») |
| Saltar al contenido | Saltar al contenido | Skip to content |

---

## 2. Hero (`inicio` / `home`)

**ES**

- Eyebrow: ENGINEERING MANAGEMENT · SOFTWARE DELIVERY · AI ENGINEERING
- H1: Pablo Poveda
- H1 (segunda línea, `em`): Engineering Manager · AI Engineering
- Descripción: Lidero, gestiono y escalo equipos técnicos, mejoro la entrega de software e incorporo la IA generativa al desarrollo. Más de 15 años en el sector, del desarrollo web a dirigir un departamento de ingeniería.
- Ubicación: Madrid, España · Remoto
- CTA principal: Entrevístame → `/interview/`
- CTA secundarios: Descargar CV → `/cv/Pablo-Poveda-Ortega-CV-ES.pdf` · LinkedIn → https://www.linkedin.com/in/pablo-poveda-ortega/ · Contacto → `#cv-contacto`
- Retrato (alt): Retrato de Pablo Poveda
- Etiqueta del retrato: Pablo Poveda · Engineering Manager

**EN**

- Eyebrow: ENGINEERING MANAGEMENT · SOFTWARE DELIVERY · AI ENGINEERING
- H1: Pablo Poveda
- H1 (second line, `em`): Engineering Manager · AI Engineering
- Description: I lead, manage and scale technical teams, improve software delivery and bring generative AI into development. 15+ years in the industry, from web development to running an engineering department.
- Location: Madrid, Spain · Remote
- Primary CTA: Interview me → `/en/interview/`
- Secondary CTAs: Download CV → `/cv/Pablo-Poveda-Ortega-CV-EN.pdf` · LinkedIn → https://www.linkedin.com/in/pablo-poveda-ortega/ · Contact → `#cv-contact`
- Portrait (alt): Portrait of Pablo Poveda
- Portrait label: Pablo Poveda · Engineering Manager

---

## 3. Logros clave (`logros` / `achievements`)

| | ES | EN |
|---|---|---|
| Título | Logros clave | Key achievements |
| Cifra 1 | **1 → 20** · Escalé un departamento de ingeniería de 1 a 20 profesionales. | **1 → 20** · Scaled an engineering department from 1 to 20 people. |
| Cifra 2 | **~30** · Lideré una cartera de unos 30 proyectos tecnológicos. | **~30** · Led a portfolio of around 30 technology projects. |
| Cifra 3 | **Miles** · Desplegué soluciones corporativas para miles de usuarios. | **Thousands** · Delivered enterprise solutions for thousands of users. |
| Cifra 4 | **~30 %** · Incorporé la IA generativa al desarrollo, con alrededor de un 30 % más de valor entregado. | **~30%** · Brought generative AI into development, increasing delivered value by roughly 30%. |

---

## 4. Qué hago (`areas` / `focus`)

| | ES | EN |
|---|---|---|
| Título | Qué hago | What I do |
| Entradilla | Las áreas donde más aporto y de las que puedes preguntarme en la entrevista. | Where I add the most value, and what you can ask me about in the interview. |
| Tarjeta 1 | **Liderazgo y equipos.** Construyo y hago crecer equipos de ingeniería: selección, onboarding, mentoría y evaluación por objetivos, con autonomía y buena cultura de ingeniería. | **Leadership and teams.** I build and grow engineering teams: hiring, onboarding, mentoring and objective-based reviews, with autonomy and a healthy engineering culture. |
| Tarjeta 2 | **Entrega de software y calidad.** Prácticas ágiles (Scrum, XP, Kanban), estándares de calidad, revisión automática del código, CI/CD y métricas para entregar más valor con menos incidencias. | **Software delivery and quality.** Agile practices (Scrum, XP, Kanban), quality standards, automated code review, CI/CD and metrics to deliver more value with fewer incidents. |
| Tarjeta 3 | **IA aplicada al desarrollo.** Llevo la IA generativa al trabajo diario de los equipos con un uso práctico, seguro y responsable, y construyo aplicaciones con LLM, RAG y agentes. | **AI applied to development.** I bring generative AI into teams' daily work in a practical, safe and responsible way, and build applications with LLMs, RAG and agents. |
| Tarjeta 4 | **Negocio y entrega.** Responsabilidad sobre resultados económicos, cartera de proyectos, preventas y relación con clientes y dirección. | **Business and delivery.** Ownership of financial results, project portfolio, pre-sales and relationships with clients and leadership. |

---

## 5. IA aplicada (`ia` / `ai`)

**ES**

- Título: IA aplicada
- Entradilla: La IA generativa está cambiando cómo desarrollamos software. La he llevado a equipos reales y la estudio y la uso a fondo.
- Bloque 1 · **Adopción en equipos de desarrollo (VASS).** Impulsé, junto con otros responsables, la adopción de IA generativa en los equipos de desarrollo del área, con un flujo de trabajo y un harness asistidos por IA en proyectos reales. Pequeñas funcionalidades y correcciones que podían llevar unos dos días se entregaban de forma autónoma en menos tiempo y con criterios de calidad más objetivos: alrededor de un 30 % más de valor entregado (estimación propia).
- Bloque 2 · **Máster en AI Engineering (LIDR, 2026).** Aplicaciones con LLM, RAG y CAG, agentes y sistemas agénticos, y evaluación de soluciones de IA.
- Bloque 3 · **tick-tack-done.** Mi proyecto personal: una aplicación de tareas y productividad con servidor MCP, para que los agentes de IA trabajen con ella. Lo desarrollo con agentes de IA y un flujo de backlog en GitHub. → https://todo.reflexionia.com
- Bloque 4 · **Esta web.** Una entrevista con una IA que responde solo con información que he revisado y citando la fuente. Es mi caso práctico de RAG, guardrails y control de coste. → `#entrevista`

**EN**

- Title: Applied AI
- Intro: Generative AI is changing how we build software. I have brought it into real teams, and I study it and use it in depth.
- Block 1 · **Adoption in development teams (VASS).** Together with other leaders, I drove the adoption of generative AI across the area's development teams, with an AI-assisted workflow and harness on live projects. Small features and fixes that could take around two days were delivered autonomously in less time and against more objective quality criteria: roughly 30% more delivered value (my own estimate).
- Block 2 · **Master's in AI Engineering (LIDR, 2026).** LLM applications, RAG and CAG, agents and agentic systems, and AI evaluation.
- Block 3 · **tick-tack-done.** My personal project: a task and productivity app with an MCP server, so AI agents can work with it. I build it with AI agents and a GitHub backlog workflow. → https://todo.reflexionia.com
- Block 4 · **This website.** An interview with an AI that answers only from information I have reviewed, citing its sources. It is my hands-on case study in RAG, guardrails and cost control. → `#interview`

---

## 6. Trayectoria (`trayectoria` / `experience`)

Título ES: **Trayectoria** · Entradilla: Del desarrollo web a dirigir un departamento de ingeniería.
Title EN: **Experience** · Intro: From web development to running an engineering department.

Cada rol muestra 2–3 puntos visibles; el resto va en «Ver más» / «Show more».

### 6.1. VASS · Manager de departamento / Department Manager

| | ES | EN |
|---|---|---|
| Cargo | Manager de departamento · Digital Experience (Open Source PHP) | Department Manager · Digital Experience (Open Source PHP) |
| Empresa y fechas | VASS · Madrid · may 2024 – nov 2026 | VASS · Madrid · May 2024 – Nov 2026 |
| Visible 1 | Dirigí el departamento con autonomía sobre las decisiones organizativas y responsabilidad sobre sus resultados económicos, la cartera de proyectos y las oportunidades de negocio. | Led the department with full ownership of organizational decisions and responsibility for its financial results, project portfolio and business opportunities. |
| Visible 2 | Organicé los equipos de ingeniería, de entre 15 y 20 personas: estructura, prioridades y asignación a proyectos. | Organized engineering teams of 15–20 people: structure, priorities and project assignments. |
| Visible 3 | Impulsé con otros responsables la adopción de IA generativa en los equipos de desarrollo: alrededor de un 30 % más de valor entregado. | Together with other leaders, drove the adoption of generative AI across development teams: roughly 30% more delivered value. |
| Ver más | Abrí nuevos clientes con pequeños proyectos iniciales que después hicieron crecer el negocio con ellos. · Coordiné proyectos transversales entre departamentos, alineando prioridades, plazos, dependencias y entregas. · Supervisé proyectos de alcance nacional, como la plataforma de loyalty de una de las principales operadoras de telecomunicaciones. | Opened new clients through small initial projects that later grew into larger business. · Coordinated cross-departmental projects, aligning priorities, deadlines, dependencies and delivery. · Oversaw nationwide projects, such as the loyalty platform of one of the country's leading telecom operators. |

### 6.2. VASS · Team Lead / Tech Lead

| | ES | EN |
|---|---|---|
| Cargo | Team Lead / Tech Lead · Digital Experience (Open Source PHP) | Team Lead / Tech Lead · Digital Experience (Open Source PHP) |
| Empresa y fechas | VASS · Madrid · sep 2020 – abr 2024 | VASS · Madrid · Sep 2020 – Apr 2024 |
| Visible 1 | Hice crecer el departamento de 1 a 20 profesionales: diseñé el proceso de selección y las pruebas técnicas, entrevisté con Talent Acquisition y preparé la incorporación. | Grew the department from 1 to 20 people: designed the hiring process and technical challenges, interviewed with Talent Acquisition and prepared onboarding. |
| Visible 2 | Dirigí una cartera de unos 30 proyectos, entre ellos una intranet web y móvil para miles de empleados de una cadena nacional de supermercados. | Managed a portfolio of around 30 projects, including a web and mobile intranet for thousands of employees of a national supermarket chain. |
| Visible 3 | Impulsé el desarrollo del equipo con mentoría, seguimiento individual y evaluaciones por objetivos: tres personas promocionaron a puestos de más responsabilidad. | Supported the team's growth through mentoring, one-to-ones and objective-based reviews: three team members were promoted to more senior roles. |
| Ver más | Incorporé Scrum y XP, estándares de calidad y revisión automática del código, además de logs, monitorización y métricas que redujeron las incidencias y mejoraron su seguimiento. · Automaticé parte de los procesos de entrega para entregar más valor con mayor calidad. · Asumí la responsabilidad económica del departamento, con una rentabilidad superior a la prevista, y lideré preventas hasta la propuesta y la estimación. | Introduced Scrum and XP, quality standards and automated code review, plus logging, monitoring and metrics that reduced incidents and improved how they were tracked. · Automated key delivery processes to deliver more value with higher quality. · Held financial responsibility for the department, achieving higher profitability than planned, and led pre-sales through to proposal and estimation. |

### 6.3. UNIR · Senior PHP Developer

| | ES | EN |
|---|---|---|
| Cargo | Senior PHP Developer | Senior PHP Developer |
| Empresa y fechas | UNIR · Madrid · abr 2017 – may 2020 | UNIR · Madrid · Apr 2017 – May 2020 |
| Visible 1 | Colideré técnicamente la plataforma de contenidos propia, basada en WordPress, de los portales de UNIR en España, México, Colombia, Perú, Ecuador y Estados Unidos. | Co-led the engineering of the in-house WordPress-based content platform powering UNIR's websites in Spain, Mexico, Colombia, Peru, Ecuador and the United States. |
| Visible 2 | Cuando el equipo creció de 4 a 10 personas, impulsé CI/CD y contenedores: más autonomía para los equipos, mejor calidad y tiempos de entrega alrededor de un 40 % más cortos. | As the team grew from 4 to 10 people, introduced CI/CD and containers: more team autonomy, better quality and delivery times around 40% shorter. |
| Ver más | Hice de enlace entre desarrollo y Sistemas, Marketing, Contenidos, SEO y Legal. · Para hacerlo con criterio, cursé el Máster en DevOps y Cloud en la propia universidad. | Worked as the link between development and Systems, Marketing, Content, SEO and Legal. · Completed a Master's in DevOps and Cloud at UNIR to support this work. |

### 6.4. Evolufarma · Senior Web Developer

| | ES | EN |
|---|---|---|
| Cargo | Senior Web Developer | Senior Web Developer |
| Empresa y fechas | Evolufarma · Madrid · abr 2014 – jun 2017 · Startup de marketing 360 para farmacias | Evolufarma · Madrid · Apr 2014 – Jun 2017 · 360° marketing startup for pharmacies |
| Visible 1 | Desarrollé con el equipo el núcleo de la plataforma SaaS que generaba las webs de las farmacias: panel de control, API de datos, campañas de email segmentadas y backend de una app móvil. | Built with the team the core of the SaaS platform that generated pharmacy websites: admin dashboard, data APIs, segmented email campaigns and a mobile app backend. |
| Visible 2 | Lideré a tres desarrolladores junior: trabajo en iteraciones, revisión de código y acompañamiento técnico. | Led three junior developers: iterative work, code review and technical mentoring. |
| Ver más | Organicé las incidencias y el mantenimiento con Kanban, con visibilidad y trazabilidad para toda la empresa. | Introduced Kanban for incidents and maintenance, giving the whole company visibility and traceability. |

### 6.5. Logiqo · Desarrollador web → Senior PHP Developer

| | ES | EN |
|---|---|---|
| Cargo | Desarrollador web → Senior PHP Developer | Web Developer → Senior PHP Developer |
| Empresa y fechas | Logiqo · Madrid · oct 2008 – mar 2014 | Logiqo · Madrid · Oct 2008 – Mar 2014 |
| Visible 1 | Desarrollé webs y aplicaciones para empresas de telecomunicaciones, educación y seguros, con retargeting y test A/B para mejorar la conversión. | Built websites and web apps for telecom, education and insurance companies, using retargeting and A/B testing to improve conversion. |
| Visible 2 | Ascendí a Senior PHP Developer en el primer año y llegué a liderar proyectos web de gran tamaño. | Promoted to Senior PHP Developer within the first year, going on to lead large web projects. |

Botones: «Ver más» / «Ver menos» · «Show more» / «Show less».

---

## 7. Proyectos y casos (`casos` / `projects`)

| | ES | EN |
|---|---|---|
| Título | Proyectos y casos | Featured projects |
| Entradilla | Algunos proyectos que explican cómo trabajo. | A few projects that show how I work. |
| Caso 1 | **Intranet para miles de empleados.** Intranet web y móvil para una cadena nacional de supermercados (VASS). Dirigí el proyecto de principio a fin, coordiné los equipos y definí las API REST y los requisitos de seguridad con el IT del cliente. | **Intranet for thousands of employees.** Web and mobile intranet for a national supermarket chain (VASS). I led the project end to end, coordinated the teams and defined the REST APIs and security requirements with the client's IT department. |
| Caso 2 | **Plataforma de contenidos internacional.** El producto interno de UNIR sobre el que funcionaban sus portales en seis países. Lo construimos desde cero; con el equipo creciendo de 4 a 10 personas, CI/CD y contenedores acortaron las entregas alrededor de un 40 %. | **International content platform.** UNIR's in-house product powering its websites in six countries. We built it from scratch; as the team grew from 4 to 10 people, CI/CD and containers shortened delivery by around 40%. |
| Caso 3 | **SaaS de marketing para farmacias.** Plataforma de Evolufarma que generaba y gestionaba las webs de las farmacias, con tienda online, catálogo común, panel, API y campañas de email. | **Marketing SaaS for pharmacies.** Evolufarma's platform for generating and managing pharmacy websites, with e-commerce, a shared catalog, dashboard, APIs and email campaigns. |
| Caso 4 | **tick-tack-done.** Proyecto personal de tareas y productividad con servidor MCP para agentes de IA, construido con agentes y un flujo de backlog en GitHub. → https://todo.reflexionia.com | **tick-tack-done.** Personal task and productivity app with an MCP server for AI agents, built with agents and a GitHub backlog workflow. → https://todo.reflexionia.com |
| Caso 5 | **Esta entrevista con IA.** Una IA que responde sobre mi trayectoria solo con información que he revisado, citando la fuente: RAG, guardrails, evaluación y control de coste. → `/interview/` | **This AI interview.** An AI that answers questions about my career only from information I have reviewed, citing its sources: RAG, guardrails, evaluation and cost control. → `/en/interview/` |

---

## 8. Formación y certificaciones (`formacion` / `education`)

| | ES | EN |
|---|---|---|
| Título | Formación y certificaciones | Education and certifications |
| 1 | **Máster en AI Engineering** · LIDR · finalizado en septiembre de 2026 · [Ver certificado (PDF)](/certificados/LIDR-AI-Engineering.pdf) | **Master's in AI Engineering** · LIDR · completed September 2026 · [View certificate (PDF)](/certificados/LIDR-AI-Engineering.pdf) |
| 2 | **Programa de liderazgo técnico LIDR Ignite** · LIDR · 2022 · [Ver certificado (PDF)](/certificados/LIDR-Ignite.pdf) | **LIDR Ignite technical leadership program** · LIDR · 2022 · [View certificate (PDF)](/certificados/LIDR-Ignite.pdf) |
| 3 | **Máster en DevOps y Cloud** · UNIR · 2019 · [Ver título (PDF)](/certificados/UNIR-DevOps-Cloud.pdf) | **Master's in DevOps and Cloud** · UNIR · 2019 · [View degree (PDF)](/certificados/UNIR-DevOps-Cloud.pdf) |
| 4 | **Ingeniería Técnica en Informática de Gestión** · Universidad de Alicante · 2003–2008 | **Technical Engineering Degree in Computer Science (Management Information Systems)** · University of Alicante · 2003–2008 |

Nota para el agente: los PDF (LIDR-AI-Engineering-certificate.pdf, LIDR-Ignite-certificate.pdf, UNIR-DevOps-master-title.pdf) no están en el repo: Pablo los aporta en el momento. Antes de publicarlos, comprueba que no llevan DNI, nota ni otros datos personales; el título de UNIR se publica sin nota. Si alguno los lleva, publica solo el texto y avisa en la issue.

---

## 9. Charlas y comunidad (`charlas` / `talks`)

**ES**

- Título: Charlas y comunidad
- Destacado · **Organizador principal de WordCamp Madrid 2019** (ago 2018 – abr 2019). En La Nave, con 600 asistentes, fue el WordCamp más grande de España hasta entonces; las entradas se agotaron tres semanas antes. El Contributor Day se celebró en Google for Startups.
- Charlas en WordPress.tv:
  - «El factor humano» · 2017
  - «KISS: cultura de plugins, buenas prácticas» · 2017
  - «Trabajo en equipo: cuando cada maestrillo tiene su librillo», con Pablo López · 2018
  - Clausura de WordCamp Madrid 2019 · 2019
  - «Hablemos de rendimiento» · 2022
- Webinar · **«Ecosistemas Digitales Interconectados: La Nueva Frontera de la Competitividad Empresarial»** · 24 de septiembre de 2025 · Ibexa, Infinitum Digital y VASS, junto a José Cuenca (Ibexa) y Alex Net (Infinitum).

**EN**

- Title: Talks and community
- Highlight · **Lead Organizer of WordCamp Madrid 2019** (Aug 2018 – Apr 2019). Held at La Nave with 600 attendees, it was the largest WordCamp in Spain at the time; tickets sold out three weeks ahead. The Contributor Day was hosted at Google for Startups.
- Talks on WordPress.tv (in Spanish):
  - "El factor humano" (The human factor) · 2017
  - "KISS: cultura de plugins, buenas prácticas" (KISS: plugin culture and good practices) · 2017
  - "Trabajo en equipo: cuando cada maestrillo tiene su librillo" (Teamwork when everyone has their own way of doing things), with Pablo López · 2018
  - Closing session of WordCamp Madrid 2019 · 2019
  - "Hablemos de rendimiento" (Let's talk about performance) · 2022
- Webinar · **"Ecosistemas Digitales Interconectados: La Nueva Frontera de la Competitividad Empresarial"** (Interconnected digital ecosystems: the new frontier of business competitiveness) · 24 September 2025 · Ibexa, Infinitum Digital and VASS, alongside José Cuenca (Ibexa) and Alex Net (Infinitum).

Nota para el agente: cada charla enlaza a su página en wordpress.tv. Comprueba cada URL al implementar y no inventes ninguna; si una no aparece, deja la charla sin enlace. La imagen del webinar es `webinar-ibexa-vass.jpg`, que Pablo aporta en el momento (opcional; alt: «Cartel del webinar de Ibexa, Infinitum Digital y VASS» / "Ibexa, Infinitum Digital and VASS webinar poster").

---

## 10. Habilidades (`habilidades` / `skills`)

| | ES | EN |
|---|---|---|
| Título | Habilidades | Skills |
| Artificial Intelligence & GenAI (va primero) | AI Engineering · Generative AI · LLM Applications · Retrieval-Augmented Generation (RAG) · Cache-Augmented Generation (CAG) · AI Agents & Agentic Systems · AI-assisted Software Development · Prompt Engineering · AI Evaluation · AI Adoption & Governance | igual |
| Liderazgo | **Liderazgo y gestión de ingeniería:** construcción y desarrollo de equipos, selección y mentoría, gestión del desempeño por objetivos, cultura de ingeniería, metodologías ágiles y responsabilidad sobre la entrega de software. | **Engineering leadership and management:** building and developing teams, hiring and mentoring, objective-based performance management, engineering culture, agile methodologies and ownership of software delivery. |
| Entrega y calidad | **Entrega y calidad de software:** Scrum, XP y Kanban, CI/CD (GitLab), contenedores (Docker), estándares de ingeniería, revisión de código y controles de calidad automatizados. | **Software delivery and quality:** Scrum, XP and Kanban, CI/CD (GitLab), containers (Docker), engineering standards, code review and automated quality checks. |
| Tecnología | **Tecnologías:** PHP (a medida y WordPress), Drupal, Laravel y Symfony; API, bases de datos SQL y NoSQL, seguridad web, rendimiento e integración de sistemas. Proyectos personales recientes con TypeScript, Python y FastAPI. | **Technology:** PHP (custom and WordPress), Drupal, Laravel and Symfony; APIs, SQL and NoSQL databases, web security, performance and systems integration. Recent personal projects with TypeScript, Python and FastAPI. |

---

## 11. Idiomas (`idiomas` / `languages`)

| | ES | EN |
|---|---|---|
| Título | Idiomas | Languages |
| Español | Español · nativo | Spanish · native |
| Inglés | Inglés · nivel profesional (B2 acreditado, Cambridge First Certificate) | English · professional working proficiency (B2, Cambridge First Certificate in English) |

---

## 12. Sobre mí (`sobre-mi` / `about`)

**ES**

- Título: Sobre mí
- Texto: Empecé programando web y, con los años, aprendí que los buenos proyectos salen de buenos equipos. He pasado de diseñar y construir software a formar y liderar equipos de desarrollo, sin perder el interés por entender cómo funcionan las cosas y cómo mejorarlas. Me gusta estar cerca de la tecnología, conectar lo que el negocio necesita con lo que realmente podemos construir y crear entornos donde las personas tengan autonomía, crezcan y hagan buen software.
- Texto 2: Hoy me interesa especialmente cómo la IA está cambiando nuestra forma de desarrollar, aprender y trabajar. Busco una nueva etapa donde seguir combinando ingeniería y liderazgo.
- Fuera del trabajo: Soy padre de mellizos. Me encontrarás en la montaña, en un campo de rugby o de viaje.

**EN**

- Title: About me
- Text: I started out as a web developer and, over the years, learned that good projects come from good teams. I have moved from designing and building software to growing and leading development teams, without losing my curiosity about how things work and how to make them better. I like staying close to technology, connecting what the business needs with what we can realistically build, and creating environments where people have autonomy, grow and build good software.
- Text 2: Today I am especially interested in how AI is changing the way we build software, learn and work. I am looking for a new role where I can keep combining engineering and leadership.
- Outside work: I am a father of twins. You will find me in the mountains, on a rugby pitch or travelling.

---

## 13. Entrevista (`entrevista` / `interview`)

Hay dos variantes. Mientras el chat con IA no esté en producción (BKL-008 a BKL-011), se usa la A; cuando funcione, la B. Ninguna dice «pendiente» ni «próximamente».

**ES · A (vista previa)**
- Título: Entrevístame
- Texto: Estoy construyendo una entrevista con una IA que responderá sobre mi trayectoria solo con información que he revisado, citando de dónde sale cada respuesta. Ya puedes probar la interfaz.
- CTA: Probar la entrevista → `/interview/`

**ES · B (chat activo)**
- Título: Entrevístame
- Texto: Pregunta lo que quieras sobre mi trayectoria, cómo lidero equipos o cómo uso la IA. Responde una IA, no yo: solo usa información que he revisado y te enseña la fuente de cada respuesta.
- CTA: Empezar la entrevista → `/interview/`
- Aviso: Estás hablando con una IA de Pablo, no con Pablo. Puede equivocarse; para cualquier decisión, confírmalo conmigo.

**EN · A (preview)**
- Title: Interview me
- Text: I am building an interview with an AI that will answer questions about my career only from information I have reviewed, showing where each answer comes from. You can already try the interface.
- CTA: Try the interview → `/en/interview/`

**EN · B (chat live)**
- Title: Interview me
- Text: Ask anything about my career, how I lead teams or how I use AI. An AI answers, not me: it only uses information I have reviewed and shows the source of every answer.
- CTA: Start the interview → `/en/interview/`
- Notice: You are talking to an AI version of Pablo, not Pablo. It can make mistakes; please confirm anything important with me.

Preguntas sugeridas (en `/interview/` y como chips):

| ES | EN |
|---|---|
| ¿Cómo organizas un equipo de ingeniería? | How do you organize an engineering team? |
| ¿Cómo has incorporado la IA generativa al desarrollo? | How have you brought generative AI into development? |
| ¿Qué prácticas usas para mejorar la entrega y la calidad del software? | What practices do you use to improve software delivery and quality? |

Etiquetas de modos en `/interview/`: «Chat» (activo) · «Voz» y «Avatar» con la etiqueta neutra «En desarrollo» / "In development", sin fechas. Es la única etiqueta de estado de la web; si Pablo prefiere, se ocultan estos dos modos.

---

## 14. CV y contacto (`cv-contacto` / `cv-contact`)

**ES**

- Título: CV y contacto
- Texto: Si encajo con lo que buscas, hablemos. LinkedIn es la forma más rápida de contactar conmigo.
- Botones: Descargar CV en PDF (español) → `/cv/Pablo-Poveda-Ortega-CV-ES.pdf` · Download CV in PDF (English) → `/cv/Pablo-Poveda-Ortega-CV-EN.pdf` · Escríbeme por LinkedIn → https://www.linkedin.com/in/pablo-poveda-ortega/
- Nota: Busco roles de Engineering Manager y liderazgo técnico, en remoto desde España o en híbrido en Madrid.

**EN**

- Title: CV & contact
- Text: If I am a good fit for what you are looking for, let's talk. LinkedIn is the fastest way to reach me.
- Buttons: Download CV in PDF (English) → `/cv/Pablo-Poveda-Ortega-CV-EN.pdf` · Descargar CV en PDF (español) → `/cv/Pablo-Poveda-Ortega-CV-ES.pdf` · Message me on LinkedIn → https://www.linkedin.com/in/pablo-poveda-ortega/
- Note: I am looking for Engineering Manager and technical leadership roles, remote from Spain or hybrid in Madrid.

---

## 15. Pie

| | ES | EN |
|---|---|---|
| Línea 1 | © {año} Pablo Poveda | © {year} Pablo Poveda |
| Enlaces | LinkedIn · GitHub · CV (ES) · CV (EN) · English | LinkedIn · GitHub · CV (EN) · CV (ES) · Español |
| Línea 2 | Web hecha con Astro. La entrevista usa IA y responde solo con información que he revisado. | Built with Astro. The interview uses AI and answers only from information I have reviewed. |
| Privacidad | Privacidad (cuando exista `/privacidad/`, BKL-011) | Privacy (once `/en/privacy/` exists, BKL-011) |

GitHub → https://github.com/povedica

---

## Comprobaciones de los textos

- Cifras usadas: 1 → 20, 15–20 personas, ~30 proyectos, miles de usuarios, ~30 % con IA (estimación propia), ~40 % en UNIR, de 4 a 10 en UNIR, 3 promociones, 6 países de UNIR, 3 desarrolladores junior en Evolufarma y 600 asistentes en WordCamp. Ninguna más.
- «Arquitectura» no aparece como área, titular ni pregunta sugerida.
- Ni «pendiente» ni «próximamente». La única etiqueta de estado es «En desarrollo» en los modos de voz y avatar de `/interview/`.
- Sin email, teléfono ni dirección. Sin nombres de clientes: solo «cadena nacional de supermercados» y «operadora de telecomunicaciones». UNIR, Evolufarma y Logiqo son empleadores y ya salen en el CV.
- Primera persona en toda la web y logros en pasado.
