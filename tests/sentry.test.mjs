import assert from 'node:assert/strict';
import test from 'node:test';

import { sanitizeSentryError } from '../src/monitoring/sentry.ts';

const origin = 'https://site.example.invalid';

test('projects a Sentry error to approved metadata and first-party frames', () => {
  const event = {
    event_id: '9e79a13ba92d4d22bd40d0cf77a91804',
    timestamp: 1795000000,
    environment: 'development',
    request: { url: `${origin}/?query=synthetic-private` },
    user: { id: 'synthetic-private' },
    breadcrumbs: [{ message: 'synthetic-private' }],
    exception: {
      values: [{
        type: 'TypeError',
        value: 'synthetic-private',
        stacktrace: {
          frames: [
            { filename: 'https://other.example.invalid/_astro/foreign.js' },
            { filename: `${origin}/src/pages/interview.astro?synthetic-private#fragment`,
              lineno: 8, colno: 12, vars: { payload: 'synthetic-private' } },
          ],
        },
      }],
    },
  };

  assert.deepEqual(sanitizeSentryError(event, origin), {
    type: undefined,
    event_id: event.event_id,
    timestamp: event.timestamp,
    platform: 'javascript',
    level: 'error',
    environment: 'development',
    exception: {
      values: [{
        type: 'TypeError',
        value: 'Browser runtime error',
        stacktrace: {
          frames: [{ filename: 'app:///src/pages/interview.astro', lineno: 8, colno: 12, in_app: true }],
        },
      }],
    },
  });
});

test('drops messages and exceptions without frames from an application script', () => {
  assert.equal(sanitizeSentryError({ message: 'synthetic-private' }, origin), null);
  assert.equal(sanitizeSentryError({
    exception: { values: [{ stacktrace: {
      frames: [
        { filename: 'chrome-extension://example/overlay.js' },
        { filename: `${origin}/interview/?query=synthetic-private` },
      ],
    } }] },
  }, origin), null);
});
