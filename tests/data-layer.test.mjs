import assert from 'node:assert/strict';
import test from 'node:test';
import { createAnalyticsEvent, track } from '../src/analytics/data-layer.ts';

test('page views and interview interactions have a finite versioned schema', () => {
  assert.deepEqual(createAnalyticsEvent('page_view', 'home'),
    { event: 'page_view', schema_version: 1, page_id: 'home' });
  assert.deepEqual(createAnalyticsEvent('interview_link_click', 'portrait'),
    { event: 'interview_link_click', schema_version: 1, page_id: 'home', placement: 'portrait' });
  for (const event of ['interview_preview_open', 'interview_preview_question_added', 'interview_preview_close']) {
    assert.deepEqual(createAnalyticsEvent(event, 'interview'),
      { event, schema_version: 1, page_id: 'interview' });
  }
});

test('rejects arbitrary dimensions, unknown events and prototype keys', () => {
  for (const [event, value] of [
    ['page_view', '/interview/?question=private'], ['interview_preview_question_added', 'free text'],
    ['unknown', 'home'], ['__proto__', 'home'],
  ]) assert.equal(createAnalyticsEvent(event, value), null);
});

test('reuses the queue and bounds memory without eviction', () => {
  const layer = [{ event: 'other' }];
  globalThis.window = { dataLayer: layer };
  try {
    for (let index = 0; index < 100; index++) track('page_view', 'home');
    assert.equal(window.dataLayer, layer);
    assert.equal(layer.length, 64);
    assert.equal(layer[0].event, 'other');
    assert.equal(layer[63].event, 'page_view');
  } finally {
    delete globalThis.window;
  }
});

test('a failing downstream consumer cannot interrupt the interface', () => {
  const layer = [];
  layer.push = () => { throw new Error('consumer unavailable'); };
  globalThis.window = { dataLayer: layer };
  try {
    assert.doesNotThrow(() => track('page_view', 'home'));
  } finally {
    delete globalThis.window;
  }
});

test('forwards only approved Umami names and dimensions without a duplicate page view', () => {
  const calls = [];
  globalThis.window = {
    umami: { track: (...args) => calls.push(args) },
  };
  try {
    track('page_view', 'home');
    track('cv_download', 'en');
    track('cv_download', 'es');
    track('cv_download', 'private.pdf');
    track('linkedin_click', 'home');
    track('language_change', 'es-en');
    track('language_change', 'en-es');
    track('language_change', 'es-es');
    track('interview_preview_open', 'interview');
    track('interview_preview_question_added', 'interview');
    track('interview_preview_question_added', 'synthetic question text');
    track('contact_click', 'home');

    assert.deepEqual(calls, [
      ['cv-download', { lang: 'en' }],
      ['cv-download', { lang: 'es' }],
      ['linkedin-click'],
      ['language-change', { from: 'es', to: 'en' }],
      ['language-change', { from: 'en', to: 'es' }],
      ['interview-open'],
      ['interview-question-sent'],
      ['contact-click'],
    ]);
  } finally {
    delete globalThis.window;
  }
});

test('keeps the local event when the Umami script is blocked or tracking fails', async () => {
  globalThis.window = {};
  try {
    track('interview_preview_open', 'interview');
    window.umami = { track() { throw new Error('tracker failed'); } };
    track('interview_preview_open', 'interview');
    window.umami = { track: () => Promise.reject(new Error('collector unavailable')) };
    track('interview_preview_open', 'interview');
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(window.dataLayer.length, 3);
  } finally {
    delete globalThis.window;
  }
});
