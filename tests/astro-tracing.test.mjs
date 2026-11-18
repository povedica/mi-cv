import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import test from 'node:test';

import { createTraceLogger } from '../src/server/astro-tracing.mjs';

test('correlates the two events of an Astro build', () => {
  const events = [];
  const logger = createTraceLogger((line) => events.push(JSON.parse(line)));

  logger.startBuild()();

  assert.deepEqual(events.map(({ event }) => event), ['astro.build.started', 'astro.build.completed']);
  assert.match(events[0].trace_id, /^[0-9a-f-]{36}$/);
  assert.equal(events[1].trace_id, events[0].trace_id);
  assert.ok(events[1].duration_ms >= 0);
});

test('logs only page metadata with a server-generated correlation ID', () => {
  const lines = [];
  const logger = createTraceLogger((line) => lines.push(line));
  const headers = new Map();
  const response = Object.assign(new EventEmitter(), {
    statusCode: 503,
    setHeader: (name, value) => headers.set(name, value),
  });

  logger.logPageRequest({
    method: 'GET',
    url: '/interview/?question=synthetic-sensitive-value',
    headers: { 'x-request-id': 'synthetic-client-id' },
  }, response, () => response.emit('finish'));

  const event = JSON.parse(lines[0]);
  assert.equal(lines.length, 1);
  assert.deepEqual(Object.keys(event).sort(),
    ['duration_ms', 'event', 'level', 'route', 'status_code', 'timestamp', 'trace_id']);
  assert.equal(event.route, 'interview');
  assert.equal(event.status_code, 503);
  assert.equal(event.level, 'error');
  assert.equal(event.trace_id, headers.get('X-Request-Id'));
  assert.doesNotMatch(lines[0], /synthetic/);
});

test('skips health probes and asset requests', () => {
  const logger = createTraceLogger(() => assert.fail('Unexpected log'));
  let calls = 0;
  for (const request of [{ method: 'HEAD', url: '/' }, { method: 'GET', url: '/images/photo.jpg' }]) {
    logger.logPageRequest(request, {}, () => { calls++; });
  }
  assert.equal(calls, 2);
});
