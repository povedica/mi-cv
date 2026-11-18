import assert from 'node:assert/strict';
import test from 'node:test';
import { toPublicEvidence } from '../knowledge/publication.mjs';

const now = new Date('2026-11-17T12:00:00.000Z');
const entry = {
  id: 'synthetic',
  version: 2,
  title: 'Synthetic editorial record',
  body: 'Synthetic text for publication tests.',
  locale: 'es',
  author: 'editor',
  source: 'internal source',
  approval: { by: 'owner', at: '2026-11-16T10:00:00.000Z', version: 2 },
  publishedAt: '2026-11-16T12:00:00.000Z',
  validFrom: null,
  validUntil: null,
  status: 'published',
  visibility: 'public',
};

test('projects only public evidence fields', () => {
  assert.deepEqual(toPublicEvidence(entry, now), {
    id: entry.id, version: entry.version, title: entry.title, body: entry.body, locale: entry.locale,
  });
});

test('excludes private records and all unpublished editorial states', () => {
  assert.equal(toPublicEvidence({ ...entry, visibility: 'private' }, now), null);
  for (const status of ['draft', 'review', 'approved']) {
    assert.equal(toPublicEvidence({ ...entry, status }, now), null);
  }
});

test('requires approval of the exact published revision before publication', () => {
  for (const overrides of [
    { approval: null },
    { version: 3 },
    { publishedAt: entry.approval.at.replace('10:00', '09:00') },
  ]) {
    assert.equal(toPublicEvidence({ ...entry, ...overrides }, now), null);
  }
});

test('excludes future, expired and malformed dates', () => {
  for (const overrides of [
    { publishedAt: '2026-11-18T00:00:00.000Z' },
    { validFrom: '2026-11-18T00:00:00.000Z' },
    { validUntil: now.toISOString() },
    { validUntil: '2026-11-31T12:00:00.000Z' },
  ]) {
    assert.equal(toPublicEvidence({ ...entry, ...overrides }, now), null);
  }
});
