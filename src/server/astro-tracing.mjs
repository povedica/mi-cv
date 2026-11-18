import { randomUUID } from 'node:crypto';

const routes = new Map([
  ['/', 'home'],
  ['/interview', 'interview'],
  ['/interview/', 'interview'],
]);

export function createTraceLogger(write = (line) => console.log(line)) {
  function emit(event, traceId, details = {}) {
    write(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: details.status_code >= 500 ? 'error' : 'info',
      event,
      trace_id: traceId,
      ...details,
    }));
  }

  return {
    startBuild() {
      const traceId = randomUUID();
      const startedAt = performance.now();
      emit('astro.build.started', traceId);
      return () => emit('astro.build.completed', traceId, {
        duration_ms: Math.round(performance.now() - startedAt),
      });
    },

    logPageRequest(request, response, next) {
      const route = routes.get(request.url?.split('?', 1)[0]);
      if (request.method !== 'GET' || !route) {
        next();
        return;
      }

      const traceId = randomUUID();
      const startedAt = performance.now();
      response.setHeader('X-Request-Id', traceId);
      response.once('finish', () => emit('astro.page.served', traceId, {
        route,
        status_code: response.statusCode,
        duration_ms: Math.round(performance.now() - startedAt),
      }));
      next();
    },
  };
}

export function astroTracing() {
  const logger = createTraceLogger();
  let completeBuild;

  return {
    name: 'mi-cv-tracing',
    hooks: {
      'astro:build:start': () => { completeBuild = logger.startBuild(); },
      'astro:build:done': () => { completeBuild?.(); },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(logger.logPageRequest);
      },
    },
  };
}
