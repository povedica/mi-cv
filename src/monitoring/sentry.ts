import { globalHandlersIntegration, init } from '@sentry/browser';
import type { ErrorEvent, StackFrame } from '@sentry/browser';

const errorTypes = new Set([
  'Error', 'TypeError', 'ReferenceError', 'RangeError', 'SyntaxError',
  'EvalError', 'URIError', 'AggregateError',
]);

function cleanFrame(frame: StackFrame, origin: string): StackFrame[] {
  if (!frame.filename) return [];

  let url: URL;
  try {
    url = new URL(frame.filename, origin);
  } catch {
    return [];
  }
  const appScript = /^\/_astro\/[\w.-]+\.js$/.test(url.pathname);
  const devScript = /^\/src\/(?:pages|components)\/[\w.-]+\.(?:astro|js|ts)$/.test(url.pathname);
  if (url.origin !== origin || !(appScript || devScript)) return [];

  return [{
    filename: `app://${url.pathname}`,
    lineno: Number.isSafeInteger(frame.lineno) ? frame.lineno : undefined,
    colno: Number.isSafeInteger(frame.colno) ? frame.colno : undefined,
    in_app: true,
  }];
}

export function sanitizeSentryError(event: ErrorEvent, origin: string): ErrorEvent | null {
  const values = (event.exception?.values ?? []).flatMap((exception) => {
    const frames = (exception.stacktrace?.frames ?? []).flatMap((frame) => cleanFrame(frame, origin));
    if (!frames.length) return [];

    return [{
      type: exception.type && errorTypes.has(exception.type) ? exception.type : 'Error',
      value: 'Browser runtime error',
      stacktrace: { frames },
    }];
  });

  if (!values.length) return null;

  return {
    type: undefined,
    event_id: event.event_id,
    timestamp: event.timestamp,
    platform: 'javascript',
    level: 'error',
    environment: event.environment === 'development' ? 'development' : 'production',
    exception: { values },
  };
}

export function startSentry(dsn: string, development: boolean) {
  init({
    dsn,
    environment: development ? 'development' : 'production',
    defaultIntegrations: false,
    integrations: [globalHandlersIntegration()],
    sendClientReports: false,
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
      stackFrameVariables: false,
      frameContextLines: 0,
    },
    transportOptions: {
      fetchOptions: { credentials: 'omit', referrerPolicy: 'no-referrer' },
    },
    beforeSend: (event) => sanitizeSentryError(event, window.location.origin),
  });
}
