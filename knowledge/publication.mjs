// Server-side editorial gate. Returns only fields an index may retain.
export function toPublicEvidence(entry, now = new Date()) {
  const { id, version, title, body, locale, status, visibility, author, source,
    approval, publishedAt, validFrom, validUntil } = entry;

  if (status !== 'published' || visibility !== 'public') return null;
  if (![id, title, body, locale, author, source, approval?.by].every(nonEmpty)) return null;
  if (!Number.isSafeInteger(version) || version < 1 || approval.version !== version) return null;

  const approved = timestamp(approval.at);
  const published = timestamp(publishedAt);
  const starts = validFrom === null ? published : timestamp(validFrom);
  const expires = validUntil === null ? Infinity : timestamp(validUntil);
  const current = now.getTime();
  if (![approved, published, starts, current].every(Number.isFinite)) return null;
  if (!(approved <= published && published <= current && starts <= current && current < expires)) {
    return null;
  }

  return { id, version, title, body, locale };
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function timestamp(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return NaN;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString() === value ? date.getTime() : NaN;
}
