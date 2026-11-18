const values = {
  page_view: ['home', 'interview'],
  interview_link_click: ['navigation', 'hero', 'portrait', 'project'],
  interview_preview_open: ['interview'],
  interview_preview_question_added: ['interview'],
  interview_preview_close: ['interview'],
} as const;

type EventName = keyof typeof values;
export type AnalyticsEvent = {
  [Name in EventName]: {
    event: Name;
    schema_version: 1;
  } & (Name extends 'interview_link_click'
    ? { page_id: 'home'; placement: (typeof values)[Name][number] }
    : { page_id: (typeof values)[Name][number] });
}[EventName];

export function createAnalyticsEvent(name: string, dimension: string): AnalyticsEvent | null {
  if (!Object.hasOwn(values, name)) return null;
  const event = name as EventName;
  if (!(values[event] as readonly string[]).includes(dimension)) return null;
  if (event === 'interview_link_click') {
    return { event, schema_version: 1, page_id: 'home', placement: dimension } as AnalyticsEvent;
  }
  return { event, schema_version: 1, page_id: dimension } as AnalyticsEvent;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(name: string, dimension: string) {
  const event = createAnalyticsEvent(name, dimension);
  if (!event) return;

  try {
    const layer = (window.dataLayer ??= []);
    if (Array.isArray(layer) && layer.length < 64) layer.push(event);
  } catch {
    // Analytics must never interrupt navigation or the preview.
  }
}
